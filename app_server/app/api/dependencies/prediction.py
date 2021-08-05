from fastapi import Request
from lungs_ml import PredictionService


def get_prediction_service(request: Request) -> PredictionService:
    return request.app.state.prediction_service
