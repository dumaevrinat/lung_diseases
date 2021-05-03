import numpy as np
from PIL import ImageDraw, ImageFont, Image

from config import FONT_PATH

font = ImageFont.truetype(FONT_PATH, 32, encoding='UTF-8')

answer_info_by_class = [
    {
        'name': 'COVID',
        'word': 'covid-19',
        'background_image': Image.open('assets/answer_image_negative.jpg')
    },
    {
        'name': 'NORMAL',
        'word': 'все норм',
        'background_image': Image.open('assets/answer_image.jpg')
    },
    {
        'name': 'PNEUMONIA',
        'word': 'пневмония',
        'background_image': Image.open('assets/answer_image_negative.jpg')
    }
]


def add_answer_on_photo(photo: Image, answer: str) -> Image:
    result = photo.copy()
    draw = ImageDraw.Draw(result)

    draw.text((10, 365), answer, (0, 0, 0), font=font)
    draw.text((12, 367), answer, (255, 255, 255), font=font)

    return result


def get_answer_info_by_probability(probability: np.ndarray) -> dict:
    prediction = probability.argmax(axis=-1)

    return answer_info_by_class[prediction]
