import random, timeit
import eel
from dl_train_gui.common import Status
from dl_train_gui.prog import Program

# This is a dummy program to simulate training, you should implement the real training code
class DemoProgram(Program):
    def init_train_params(self):
        # Implement initialize training parameters here
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
        # Implement setting training parameters here

    def init_vis(self):
        # Optional: initialize chart areas on UI
        self.init_vis_callback(2, 'line')

    def train(self):
        self.set_status(Status.TRAINING)
        # Implement training code here
        start_t = timeit.default_timer()
        loss = 1
        val_loss = 1
        acc = 0.2
        val_acc = 0.2
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
                # Signal progress of current epoch
                self.epoch_callback(i+1, self.get_train_param('max_epoch'), progress)
                start_t = timeit.default_timer()
                eel.sleep(.1)
            is_checkpoint = i % 5 == 4
            loss = self.random_downtrend(loss)
            acc = self.random_uptrend(acc)
            val_loss = self.random_downtrend(val_loss)
            val_acc = self.random_uptrend(val_acc)
            # Signal performance of the epoch completed
            self.epoch_end_callback(i+1, {\
                'loss': loss,\
                'accuracy': acc,\
                'val_loss': val_loss,\
                'val_accuracy': val_acc\
            }, is_checkpoint, 'Model saved' if is_checkpoint else '')
            # Signal data to be ploted on UI
            self.vis_callback('0', i+1, {\
                'loss': loss,\
                'val_loss': val_loss\
            }, 'line')
            self.vis_callback('1', i+1, {\
                'accuracy': acc,\
                'val_accuracy': val_acc\
            }, 'line')
            # Send message to UI
            rdm = random.randint(0, 200)
            if rdm % 8 == 0:
                self.message_callback('Some info message.')
            elif rdm % 10 == 0:
                self.message_callback('Some warning message.', type='warn')
            elif rdm % 13 == 0:
                self.message_callback('Some error message.', type='error')
        self.set_status(Status.END)

    def random_downtrend(self, prev, min=0):
        if prev <= min * 1.05:
            return round(prev, 3)
        while True:
            ratio = random.random() + 0.01
            if ratio > 0.7:
                return round(prev * ratio, 3)
            elif ratio < 0.1:
                return round(prev * (1 + ratio), 3)

    def random_uptrend(self, prev, max=1):
        if prev >= max *.95:
            return round(prev, 3)
        while True:
            ratio = random.random() + 0.01
            if ratio < 0.3:
                return round(prev * (1 + ratio), 3)
            elif ratio > 0.9:
                return round(prev * ratio, 3)