import eel
from dl_train_gui.common import Status
from dl_train_gui.prog import Program

class DemoProgram(Program):
    def init_train_param(self):
        # Implement initialize training paramters here
        self.train_params['train_data'] = ['Train dataset', r'd:\data\train']
        self.train_params['val_data'] = ['Validation dataset', r'd:\data\val']
        self.train_params['max_epoch'] = ['Max epoch', 100, 'int', 1, 9999999]
        self.train_params['lr'] = ['Learning rate', 0.01, 'float', 0.001, 1, 0.001]
        self.train_params['optimizer'] = ['Optimizer', 'Adam', 'choices', None, None, None, ['Adam', 'RMSProp', 'SGD']]
        self.train_params['earlystopping'] = ['Early Stopping', True, 'bool']
        super().init_train_param()

    def set_train_param(self, param_id, param_value):
        super().set_train_param(param_id, param_value)
        # Implement setting training paramters here

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