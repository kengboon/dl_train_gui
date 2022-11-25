from enum import Enum
import eel

class Status(Enum):
    ERROR = -2
    IDLE = 0
    TRAINING = 1
    END = 2
    ABORTING = 3
    ABORTED = 4

def create_default_program():
    return Program()

# You may inherit this class
class Program:
    def __init__(self):
        self.status = Status.IDLE
        self.train_params = {}
        self.abort = False

    def hook(self, callbacks):
        self.status_callback = callbacks[0]
        self.params_callback = callbacks[1]
        self.epoch_callback = callbacks[2]
        self.epoch_end_callback = callbacks[3]
        self.vis_callback = callbacks[4]
        self.message_callback = callbacks[5]

    def init_train_param(self):
        # Implement initialize training paramters here
        self.train_params['train_data'] = ['Train dataset', r'd:\data\train']
        self.train_params['val_data'] = ['Validation dataset', r'd:\data\val']
        self.train_params['max_epoch'] = ['Max epoch', 100, 'int', 1, 9999999]
        self.train_params['lr'] = ['Learning rate', 0.01, 'float', 0.001, 1, 0.001]
        self.train_params['optimizer'] = ['Optimizer', 'Adam', 'choices', None, None, None, ['Adam', 'RMSProp', 'SGD']]
        self.train_params['earlystopping'] = ['Early Stopping', True, 'bool']
        self.params_callback(self.train_params)

    def set_train_param(self, param_id, param_value):
        # Implement setting training paramters here
        if param_id in self.train_params:
            self.train_params[param_id][1] = param_value

    def set_status(self, status):
        self.status = status
        self.status_callback(status.name, status.value % 2 == 0)

    def get_train_param(self, param_id):
        return self.train_params[param_id][1]

    def train(self):
        self.set_status(Status.TRAINING)
        # Implement training code here
        for i in range(self.get_train_param('max_epoch')):
            if self.do_abort():
                return
            step = 10
            for j in range(step):
                if self.do_abort():
                    return
                progress = ''
                for k in range(step):
                    if k <= j:
                        marker = '='
                    elif k == j + 1:
                        marker = '>'
                    else:
                        marker = ' . '
                    progress = progress + marker
                progress = '[' + progress + ']'
                self.epoch_callback(i+1, self.get_train_param('max_epoch'), progress)
                eel.sleep(.1)
            self.epoch_end_callback(i+1, {'Loss': 1})
        self.set_status(Status.END)

    def do_abort(self):
        if self.abort:
            self.abort = False
            self.set_status(Status.ABORTED)
            return True

    def start_train(self):
        self.set_status(Status.TRAINING)
        eel.spawn(self.train)

    def abort_train(self):
        self.set_status(Status.ABORTING)
        self.abort = True