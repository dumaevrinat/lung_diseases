import cv2
import numpy as np

from .base_image_processing import BaseImageProcessing


class ClassificationImageProcessing(BaseImageProcessing):

    def __init__(self,
                 img_dims: int = 512,
                 clahe_clip_limit: float = 1.0,
                 clahe_tile_grid_size: int = 8):

        self._img_dims = img_dims
        self._clahe_clip_limit = clahe_clip_limit
        self._clahe_tile_grid_size = clahe_tile_grid_size

    def _resize(self, data: np.ndarray) -> np.ndarray:
        result = cv2.resize(data, (self._img_dims, self._img_dims))
        result = result.reshape(self._img_dims, self._img_dims, 1)

        return result

    def preprocess(self, data: np.ndarray) -> np.ndarray:
        result = data.astype(np.uint8)
        resized = self._resize(result)

        clahe = cv2.createCLAHE(clipLimit=1.0, tileGridSize=(8, 8))
        result = clahe.apply(resized)

        result = result * 1. / 255
        result = result.reshape(resized.shape)

        return result

    def postprocess(self, data: np.ndarray) -> np.ndarray:
        return data
