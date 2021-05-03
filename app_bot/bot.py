import io

import telebot
import numpy as np
from PIL import Image
from telebot.types import Message

from answers import get_answer_info_by_probability, add_answer_on_photo
from lungs_ml import PredictionService
from lungs_ml import SegmentationImageProcessing, ClassificationImageProcessing
from lungs_ml import create_model
from config import *

labels = [
    'COVID',
    'NORMAL',
    'PNEUMONIA'
]

segmentation_processing = SegmentationImageProcessing()
classification_processing = ClassificationImageProcessing()

unet_model = create_model(UNET_MODEL_CONFIG_PATH, UNET_MODEL_WEIGHTS_PATH)
classification_model = create_model(CLASSIFICATION_MODEL_CONFIG_PATH, CLASSIFICATION_MODEL_WEIGHTS_PATH)

prediction_service = PredictionService(
    SegmentationImageProcessing(),
    ClassificationImageProcessing(),
    labels, unet_model, classification_model
)

bot = telebot.TeleBot(BOT_TOKEN, parse_mode=None)


@bot.message_handler(commands=['start'])
def send_welcome(message: Message):
    bot.reply_to(message, 'Привет, это бот для распознавания заболеваний легких по рентгеновским снимкам')


@bot.message_handler(content_types=["photo"])
def answer_to_photo(message: Message):
    file_id = message.photo[0].file_id
    file_info = bot.get_file(file_id)
    downloaded_file = bot.download_file(file_info.file_path)

    image_stream = io.BytesIO(downloaded_file)
    image = Image.open(image_stream).convert('L')
    image = np.array(image)

    probability = prediction_service.segment_predict(image)
    answer_info = get_answer_info_by_probability(probability)

    first_name_addressing = message.chat.first_name[:14] + ', ' if message.chat.first_name else ''
    answer = f'{first_name_addressing}у вас {answer_info["word"]} \nс вероятностью {probability.max() * 100:.2f}%'

    answer_image = add_answer_on_photo(answer_info["background_image"], answer)

    bot.send_photo(message.chat.id, answer_image)


if __name__ == '__main__':
    bot.polling()
