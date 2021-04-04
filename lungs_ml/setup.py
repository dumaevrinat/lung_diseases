import os

import pkg_resources
from setuptools import setup, find_packages

setup(
    name='lungs_ml',
    version='0.0.1',
    packages=find_packages(),
    install_requires=[
        str(r)
        for r in pkg_resources.parse_requirements(
            open(os.path.join(os.path.dirname(__file__), 'requirements.txt'))
        )
    ],
    description='lungs_ml: segmentation of lungs in chest x-ray images and lung disease prediction',
    author='Dumaev Rinat',
    url='https://github.com/dumaevrinat/lung_diseases'
)
