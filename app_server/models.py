from typing import List

from pydantic import BaseModel


class PredictionResult(BaseModel):
    probability: List[float]
    labels: List[str]
