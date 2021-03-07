from abc import ABCMeta, abstractmethod


class BaseImageProcessing:
    __metaclass__ = ABCMeta

    @abstractmethod
    def preprocessing(self, data):
        pass

    @abstractmethod
    def postprocessing(self, data):
        pass
