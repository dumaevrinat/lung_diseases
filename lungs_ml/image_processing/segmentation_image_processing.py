import cv2
import numpy as np
from skimage import morphology

from .base_image_processing import BaseImageProcessing


class SegmentationImageProcessing(BaseImageProcessing):

    def __init__(self,
                 img_dims: int = 512,
                 morph_open_kernel_size: int = 12,
                 morph_close_kernel_size: int = 12,
                 clahe_clip_limit: float = 3.0,
                 clahe_tile_grid_size: int = 2):

        self._img_dims = img_dims
        self._morph_open_kernel_size = morph_open_kernel_size
        self._morph_close_kernel_size = morph_close_kernel_size
        self._clahe_clip_limit = clahe_clip_limit
        self._clahe_tile_grid_size = clahe_tile_grid_size

    def _resize(self, data: np.ndarray) -> np.ndarray:
        result = cv2.resize(data, (self._img_dims, self._img_dims))
        result = result.reshape(self._img_dims, self._img_dims, 1)

        return result

    def preprocess(self, data: np.ndarray) -> np.ndarray:
        result = data.astype(np.uint8)
        resized = self._resize(result)

        clahe = cv2.createCLAHE(
            clipLimit=self._clahe_clip_limit,
            tileGridSize=(self._clahe_tile_grid_size, self._clahe_tile_grid_size))
        result = clahe.apply(resized)

        result = result * 1. / 255
        result = result.reshape(resized.shape)

        return result

    def postprocess(self, data: np.ndarray) -> np.ndarray:
        _, result = cv2.threshold(data, 0.5, 1, 0)

        kernel_open = np.ones((self._morph_open_kernel_size, self._morph_open_kernel_size), np.uint8)
        result = cv2.morphologyEx(result, cv2.MORPH_OPEN, kernel_open)

        disk = morphology.disk(self._morph_close_kernel_size)
        result = morphology.closing(result, disk)

        result = result.reshape(data.shape)
        result = self._resize(result)

        return result
