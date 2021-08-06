FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

ARG CLASSIFICATION_MODEL_WEIGHTS_URL="https://drive.google.com/uc?id=1-o6LfhM048dMyDxhLFLXsNchFF4GCfOM"
ARG CLASSIFICATION_MODEL_CONFIG_URL="https://drive.google.com/uc?id=1KsH-Z5XjLptacug39DyBgbe8noLIdIOn"
ARG UNET_MODEL_WEIGHTS_URL="https://drive.google.com/uc?id=1-IRkf-mwXdO9KnKPmyoRy38CHmLVTp2C"
ARG UNET_MODEL_CONFIG_URL="https://drive.google.com/uc?id=1HCCDcX9Um0Iou88ZckMZKtQZ2mjJEfv6"

ENV ROOT=/usr/src/app
ENV CLASSIFICATION_MODEL_WEIGHTS_URL="${CLASSIFICATION_MODEL_WEIGHTS_URL}"
ENV CLASSIFICATION_MODEL_CONFIG_URL="${CLASSIFICATION_MODEL_CONFIG_URL}"
ENV UNET_MODEL_WEIGHTS_URL="${UNET_MODEL_WEIGHTS_URL}"
ENV UNET_MODEL_CONFIG_URL="${UNET_MODEL_CONFIG_URL}"

ENV CLASSIFICATION_MODEL_WEIGHTS_PATH="classification_model_weights.hdf5"
ENV CLASSIFICATION_MODEL_CONFIG_PATH="classification_model_config.json"
ENV UNET_MODEL_WEIGHTS_PATH="unet_model_weights.hdf5"
ENV UNET_MODEL_CONFIG_PATH="unet_model_config.json"


WORKDIR ${ROOT}

COPY . .

RUN apt-get update && rm -rf /var/cache/apt
RUN apt-get install ffmpeg libsm6 libxext6  -y && rm -rf /var/cache/apt

RUN pip install --no-cache-dir -U pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gdown

RUN gdown "${CLASSIFICATION_MODEL_WEIGHTS_URL}" -O "${CLASSIFICATION_MODEL_WEIGHTS_PATH}"
RUN gdown "${CLASSIFICATION_MODEL_CONFIG_URL}" -O "${CLASSIFICATION_MODEL_CONFIG_PATH}"
RUN gdown "${UNET_MODEL_WEIGHTS_URL}" -O "${UNET_MODEL_WEIGHTS_PATH}"
RUN gdown "${UNET_MODEL_CONFIG_URL}" -O "${UNET_MODEL_CONFIG_PATH}"

EXPOSE 8000

ENTRYPOINT ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
