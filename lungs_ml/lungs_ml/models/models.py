from tensorflow.keras.models import model_from_json
from tensorflow.keras.models import Model


def create_model(config: str, weights: str) -> Model:
    with open(config, 'r') as json_file:
        model_json = json_file.read()

    model = model_from_json(model_json)
    model.load_weights(weights)

    return model
