import io

import numpy as np
from PIL import Image
from fastapi import UploadFile


valid_image_extensions = ['jpg', 'jpeg', 'png']


async def read_file_as_image_array(file: UploadFile) -> np.array:
    downloaded_file = await file.read()

    image_stream = io.BytesIO(downloaded_file)
    image = Image.open(image_stream).convert('L')

    return np.array(image)


def get_extension(file: UploadFile) -> str:
    return file.filename.split('.')[-1]
