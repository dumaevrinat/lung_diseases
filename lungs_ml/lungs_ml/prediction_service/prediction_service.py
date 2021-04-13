import numpy as np
from tensorflow.keras.models import Model

from lungs_ml.image_processing import BaseImageProcessing


class PredictionService:

    def __init__(self,
                 segmentation_processing: BaseImageProcessing,
                 classification_processing: BaseImageProcessing,
                 labels: list,
                 segmentation_model: Model,
                 classification_model: Model,
                 ):

        self._segmentation_processing = segmentation_processing
        self._classification_processing = classification_processing

        self._segmentation_model = segmentation_model
        self._classification_model = classification_model

        self._labels = labels

    def predict(self, data: np.ndarray) -> np.array:
        probability = self._classification_model.predict(np.array([data]))[0]

        return probability

    def segment(self, image: np.ndarray) -> np.ndarray:
        image_for_segmentation = self._segmentation_processing.preprocess(image)
        mask = self._segmentation_model.predict(np.array([image_for_segmentation]))[0]
        mask = self._segmentation_processing.postprocess(mask)

        return mask

    def segment_predict(self, image: np.ndarray) -> np.ndarray:
        mask = self.segment(image)

        image_for_classification = self._classification_processing.preprocess(image)
        image_for_classification *= mask

        probability = self.predict(image_for_classification)

        return probability

    def get_labels(self):
        return self._labels
