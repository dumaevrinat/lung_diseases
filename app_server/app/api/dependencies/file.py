from fastapi import UploadFile, File

from app.service.file import get_extension


def get_file_extension(file: UploadFile = File(...)):
    return get_extension(file)
