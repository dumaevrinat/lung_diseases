from abc import ABCMeta, abstractmethod

import numpy as np


class BaseImageProcessing:
    __metaclass__ = ABCMeta

    @abstractmethod
    def preprocess(self, data: np.ndarray) -> np.ndarray:
        pass

    @abstractmethod
    def postprocess(self, data: np.ndarray) -> np.ndarray:
        pass
