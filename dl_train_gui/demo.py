import random, timeit
import eel
from dl_train_gui.common import Status
from dl_train_gui.prog import Program

class DemoProgram(Program):
    def init_train_params(self):
        # Implement initialize training paramters here
        self.train_params['train_data'] = ['Train dataset', r'd:/data/train', 'dir']
        self.train_params['val_data'] = ['Validation dataset', r'd:/data/val', 'dir']
        self.train_params['max_epoch'] = ['Max epoch', 100, 'int', 1, 9999999]
        self.train_params['batch_size'] = ['Batch size', 2, 'int', 1, 9999999]
        self.train_params['lr'] = ['Learning rate', 0.01, 'float', 0.001, 1, 0.001]
        self.train_params['optimizer'] = ['Optimizer', 'Adam', 'choices', None, None, None, ['Adam', 'RMSProp', 'SGD']]
        self.train_params['num_of_classes'] = ['Number of classes', 5, 'int', 2, 9999999]
        self.train_params['output_dir'] = ['Output directory', r'd:/data/model/output', 'dir']
        self.train_params['lrdecay_section'] = ['Learning Rate Decay', None, 'title']
        self.train_params['lrdecay_enabled'] = ['Enabled', True, 'bool']
        self.train_params['lrdecay_patience_improvement'] = ['Min improvement (loss)', 0.001, 'float', 0.001, 1, 0.001]
        self.train_params['lrdecay_patience_epoch'] = ['Patience (epoch)', 20, 'int', 1, 500]
        self.train_params['lrdecay_ratio'] = ['Decay Ratio', 0.5, 'float', 0.001, 0.999, 0.001]
        self.train_params['es_section'] = ['Early Stopping', None, 'title']
        self.train_params['es_enabled'] = ['Enabled', True, 'bool']
        self.train_params['es_patience_improvement'] = ['Min improvement (loss)', 0.001, 'float', 0.001, 1, 0.001]
        self.train_params['es_patience_epoch'] = ['Patience (epoch)', 20, 'int', 1, 500]
        super().init_train_params()

    def set_train_params(self, param_dict):
        super().set_train_params(param_dict)
        # Implement setting training paramters here

    def train(self):
        self.set_status(Status.TRAINING)
        # Implement training code here
        start_t = timeit.default_timer()
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
                progress = progress + ' {:.4f}'.format(timeit.default_timer() - start_t) + 's/step'
                self.epoch_callback(i+1, self.get_train_param('max_epoch'), progress)
                start_t = timeit.default_timer()
                eel.sleep(.1)
            is_checkpoint = i % 5 == 4
            self.epoch_end_callback(i+1, {'loss': self.generate_random(), 'accuracy': self.generate_random(), 'val_loss': self.generate_random(), 'val_accuracy': self.generate_random()}, is_checkpoint, 'Model saved' if is_checkpoint else '')
        self.set_status(Status.END)

    def generate_random(self):
        return round(random.random(), 3)