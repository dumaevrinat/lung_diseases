from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from lungs_ml import PredictionService
from starlette.status import HTTP_400_BAD_REQUEST

from app.api.dependencies.file import get_file_extension
from app.api.dependencies.prediction import get_prediction_service
from app.models.prediction import PredictionResult
from app.service.file import valid_image_extensions, read_file_as_image_array

router = APIRouter(
    dependencies=[Depends(get_prediction_service)]
)


@router.post('/predict', response_model=PredictionResult)
async def predict(
        prediction_service: PredictionService = Depends(get_prediction_service),
        file: UploadFile = File(...),
        file_extension: str = Depends(get_file_extension)
):
    if file_extension not in valid_image_extensions:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail=f'image must be in {valid_image_extensions} formats'
        )

    image = await read_file_as_image_array(file)
    probability = prediction_service.segment_predict(image)

    result = PredictionResult(
        probability=probability.tolist(),
        labels=prediction_service.get_labels()
    )

    return result
