FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

ARG CLASSIFICATION_MODEL_WEIGHTS_URL="https://drive.google.com/file/d/1-o6LfhM048dMyDxhLFLXsNchFF4GCfOM/view?usp=sharing"
ARG CLASSIFICATION_MODEL_CONFIG_URL="https://drive.google.com/file/d/1KsH-Z5XjLptacug39DyBgbe8noLIdIOn/view?usp=sharing"
ARG UNET_MODEL_WEIGHTS_URL="https://drive.google.com/file/d/1-IRkf-mwXdO9KnKPmyoRy38CHmLVTp2C/view?usp=sharing"
ARG UNET_MODEL_CONFIG_URL="https://drive.google.com/file/d/1HCCDcX9Um0Iou88ZckMZKtQZ2mjJEfv6/view?usp=sharing"

ENV ROOT=/usr/src/app
ENV CLASSIFICATION_MODEL_WEIGHTS_URL="${CLASSIFICATION_MODEL_WEIGHTS_URL}"
ENV CLASSIFICATION_MODEL_CONFIG_URL="${CLASSIFICATION_MODEL_CONFIG_URL}"
ENV UNET_MODEL_WEIGHTS_URL="${UNET_MODEL_WEIGHTS_URL}"
ENV UNET_MODEL_CONFIG_URL="${UNET_MODEL_CONFIG_URL}"


WORKDIR ${ROOT}

RUN pip install --no-cache-dir -U pip

COPY . .

RUN pip install -r requirements.txt
RUN pip install gdown

RUN gdown "${CLASSIFICATION_MODEL_WEIGHTS_URL}"
RUN gdown "${CLASSIFICATION_MODEL_CONFIG_URL}"
RUN gdown "${UNET_MODEL_WEIGHTS_URL}"
RUN gdown "${UNET_MODEL_CONFIG_URL}"
RUN ls