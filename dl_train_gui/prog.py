import eel
from dl_train_gui.common import Status

# You may inherit this class
class Program:
    def __init__(self):
        self.status = Status.IDLE
        self.abort = False
        self.train_params = {}

    def hook(self, callbacks):
        self.status_callback = callbacks[0]
        self.params_callback = callbacks[1]
        self.epoch_callback = callbacks[2]
        self.epoch_end_callback = callbacks[3]
        self.init_vis_callback = callbacks[4]
        self.vis_callback = callbacks[5]
        self.message_callback = callbacks[6]

    def init_train_params(self):
        self.params_callback(self.train_params)

    def set_train_params(self, param_dict):
        for param_id in param_dict:
            if param_id in self.train_params:
                self.train_params[param_id][1] = param_dict[param_id]

    def set_status(self, status):
        self.status = status
        self.status_callback(status.name, status.value % 2 == 0)

    def get_train_param(self, param_id):
        return self.train_params[param_id][1]

    def init_vis(self):
        pass

    def train(self):
        pass

    def do_abort(self):
        if self.abort:
            self.abort = False
            self.set_status(Status.ABORTED)
            return True

    def start_train(self):
        self.set_status(Status.TRAINING)
        eel.spawn(self.train)

    def abort_train(self):
        if self.status is Status.TRAINING:
            self.set_status(Status.ABORTING)
            self.abort = True