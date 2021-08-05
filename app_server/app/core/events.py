from fastapi import FastAPI
from lungs_ml import create_model, PredictionService, SegmentationImageProcessing, ClassificationImageProcessing

from app.core.settings import settings


def startup_handler(app: FastAPI):
    labels = ['COVID', 'NORMAL', 'PNEUMONIA']

    unet_model = create_model(
        settings.unet_model_config_path,
        settings.unet_model_weights_path
    )

    classification_model = create_model(
        settings.classification_model_config_path,
        settings.classification_model_weights_path
    )

    prediction_service = PredictionService(
        SegmentationImageProcessing(),
        ClassificationImageProcessing(),
        labels, unet_model, classification_model
    )

    app.state.prediction_service = prediction_service


def shutdown_handler(app: FastAPI):
    pass
