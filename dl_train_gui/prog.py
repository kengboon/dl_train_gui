from enum import Enum
import eel

class Status(Enum):
    IDLE = 0
    TRAINING = 1
    END = 2
    ABORTING = 3
    ABORTED = 4
    ERROR = 5

class DemoProgram:
    def __init__(self):
        self.status = Status.IDLE
        self.train_params = {}
        self.abort = False

    def hook(self, callbacks):
        self.status_callback = callbacks[0]
        self.epoch_callback = callbacks[1]

    def init_train_param(self):
        self.train_params['max_epoch'] = 100
        pass

    def set_train_param(self, param_name, param_value):
        self.train_params[param_name] = param_value

    def set_status(self, status):
        self.status = status
        self.status_callback(status.name)

    def train(self):
        self.set_status(Status.TRAINING)
        # Implement your training code here
        for i in range(self.train_params['max_epoch']):
            if self.abort:
                self.abort = False
                self.set_status(Status.ABORTED)
                return
            self.epoch_callback(i+1, self.train_params['max_epoch'])
            eel.sleep(1)
        self.set_status(Status.END)

    def start_train(self):
        self.set_status(Status.TRAINING)
        eel.spawn(self.train)

    def abort_train(self):
        self.set_status(Status.ABORTING)
        self.abort = True