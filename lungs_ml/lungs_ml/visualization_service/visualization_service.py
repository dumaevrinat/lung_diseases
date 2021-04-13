import numpy as np
from alibi.explainers import IntegratedGradients
from tensorflow.keras.models import Model


class VisualizationService:

    def __init__(self, model: Model, explainer_kwards: dict = None):
        if explainer_kwards is None:
            explainer_kwards = {
                'n_steps': 20,
                'method': 'riemann_trapezoid',
                'internal_batch_size': 30
            }

        explainer = IntegratedGradients(
            model,
            **explainer_kwards
        )

        self._explainer = explainer
        self._model = model

    def get_attributions(self, data: np.ndarray, probability: np.ndarray) -> np.ndarray:
        instance = np.array([data])
        prediction = probability.argmax(axis=1)

        explanation = self._explainer.explain(instance, baselines=None, target=prediction)

        return explanation.attributions[0][0]

