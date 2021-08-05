from fastapi import APIRouter
from .prediction import router as predict

router = APIRouter()
router.include_router(predict, tags=['predict'])
