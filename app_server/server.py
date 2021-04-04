import io

import numpy as np
import uvicorn
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from lungs_ml import PredictionService

from config import *
from models import PredictionResult

prediction_service = PredictionService(
    UNET_MODEL_CONFIG_PATH,
    UNET_MODEL_WEIGHTS_PATH,
    CLASSIFICATION_MODEL_CONFIG_PATH,
    CLASSIFICATION_MODEL_WEIGHTS_PATH
)

app = FastAPI()


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

    probability = prediction_service.predict(image).tolist()
    result = PredictionResult(
        probability=probability,
        labels=prediction_service.get_labels()
    )

    return result


if __name__ == '__main__':
    uvicorn.run(app, debug=True)
