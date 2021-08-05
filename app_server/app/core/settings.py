from typing import List

from pydantic import BaseSettings


class Settings(BaseSettings):
    classification_model_weights_path: str
    classification_model_config_path: str
    unet_model_weights_path: str
    unet_model_config_path: str
    allowed_origins: List[str] = ['https://dumaevrinat.github.io']


settings = Settings()
