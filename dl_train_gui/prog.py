from enum import Enum
from threading import Thread
import time

class Status(Enum):
    IDLE = 0
    TRAINING = 1
    END = 2
    ABORT = 3
    ERROR = 4

class DemoProgram:
    def __init__(self, callbacks):
        self.status = Status.IDLE
        self.status_callback = callbacks[0]
        self.epoch_callback = callbacks[1]
        self.thread = None

    def set_status(self, status):
        self.status = status
        self.status_callback(status.name)

    def train(self, args):
        self.set_status(Status.TRAINING)
        for i in range(100):
            self.epoch_callback(i+1, 100)
            time.sleep(1)
        self.set_status(Status.END)

    def start_train(self, args):
        self.set_status(Status.TRAINING)
        self.thread = Thread(target=self.train, args=[args])
        self.thread.start()

    def abort_train(self):
        self.set_status(Status.ABORT)
        pass