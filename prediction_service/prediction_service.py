import numpy as np

from lungs_ml import SegmentationImageProcessing, ClassificationImageProcessing, create_model


class PredictionService:
    def __init__(self,
                 segmentation_model_config,
                 segmentation_model_weights,
                 classification_model_config,
                 classification_model_weights
                 ):

        self._segmentation_processing = SegmentationImageProcessing()
        self._classification_processing = ClassificationImageProcessing()

        self._segmentation_model = create_model(
            segmentation_model_config,
            segmentation_model_weights
        )

        self._classification_model = create_model(
            classification_model_config,
            classification_model_weights
        )

        self._labels = [
            'NORMAL',
            'PNEUMONIA'
        ]

    def predict(self, image: np.ndarray) -> np.array:
        mask = self.segment_lungs(image)

        image_for_classification = self._classification_processing.preprocess(image)
        image_for_classification *= mask

        probability = self._classification_model.predict(np.array([image_for_classification]))[0]

        return probability

    def segment_lungs(self, image: np.ndarray) -> np.ndarray:
        image_for_segmentation = self._segmentation_processing.preprocess(image)
        mask = self._segmentation_model.predict(np.array([image_for_segmentation]))[0]
        mask = self._segmentation_processing.postprocess(mask)

        return mask

    def get_labels(self):
        return self._labels
