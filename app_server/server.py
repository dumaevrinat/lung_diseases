import io

import numpy as np
import uvicorn
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from lungs_ml import SegmentationImageProcessing, ClassificationImageProcessing
from lungs_ml.prediction_service import PredictionService
from lungs_ml import create_model

from config import *
from models import PredictionResult

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

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post('/predict', response_model=PredictionResult)
async def predict(file: UploadFile = File(...)):
    valid_extensions = ['jpg', 'jpeg', 'png']
    extension = file.filename.split('.')[-1] in valid_extensions

    if not extension:
        return f'image must be in {valid_extensions} formats'

    downloaded_file = await file.read()

    image_stream = io.BytesIO(downloaded_file)
    image = Image.open(image_stream).convert('L')
    image = np.array(image)

    probability = prediction_service.segment_predict(image)

    result = PredictionResult(
        probability=probability.tolist(),
        labels=prediction_service.get_labels()
    )

    return result


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000, debug=True)
