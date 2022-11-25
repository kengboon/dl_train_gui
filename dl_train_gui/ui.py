import os, sys
import eel
from eel import chrome
from dl_train_gui import config
from dl_train_gui.util import create_default_program

class UI:
    program = None

    def __init__(self, prog=None):
        eel.init(config.ASSET_FOLDER)
        UI.program = prog

    def start_ui(self):
        try:
            size = (550, 650)
            # Check Chrome installed
            chrome_instance_path = chrome.find_path()
            if chrome_instance_path is not None and os.path.exists(chrome_instance_path):
                eel.start('index.html', port=0, size=size)
            elif sys.platform in ['win32', 'win64']:
                eel.start('index.html', port=0, size=size, mode='edge')
            else:
                print('Chrome is not installed.')
        except Exception as ex:
            print(ex)

@eel.expose
def init():
    if UI.program is None:
        UI.program = create_default_program()
    callbacks = [status_callback, init_params_callback, epoch_callback, epoch_end_callback, vis_callback, message_callback]
    UI.program.hook(callbacks)
    UI.program.init_train_param()
    eel.js_init_comp_callback();

@eel.expose
def start_train():
    UI.program.start_train()

@eel.expose
def abort_train():
    UI.program.abort_train()

@eel.expose
def set_train_param(param_name, param_value):
    UI.program.set_train_param(param_name, param_value)

def init_params_callback(param_dict):
    for param_id in param_dict:
        param_info = param_dict[param_id]
        if len(param_info) < 3:
            eel.js_train_param_callback(param_id, param_info[0], param_info[1])
        elif param_info[2] in ['integer', 'int']:
            eel.js_train_param_callback(param_id, param_info[0], param_info[1], param_info[2], param_info[3], param_info[4], param_info[5] if len(param_info) > 5 else 1)
        elif param_info[2] in ['number', 'float', 'double']:
            eel.js_train_param_callback(param_id, param_info[0], param_info[1], param_info[2], param_info[3], param_info[4], param_info[5])
        elif param_info[2] in ['enum', 'enums', 'options', 'choices']:
            eel.js_train_param_callback(param_id, param_info[0], param_info[1], param_info[2], param_info[3], param_info[4], param_info[5], param_info[6])
        elif param_info[2] in ['bool', 'boolean', 'checkbox']:
            eel.js_train_param_callback(param_id, param_info[0], param_info[1], param_info[2])
        else:
            eel.js_train_param_callback(param_id, param_info[0], param_info[1])

def status_callback(status, idle=True):
    eel.js_status_callback(status, idle)

def epoch_callback(i, j, progress=''):
    eel.js_epoch_callback(i, j, progress)

def epoch_end_callback(i, perf_info, is_checkpoint=False, checkpoint_info=''):
    eel.js_epoch_end_callback(i, perf_info, is_checkpoint, checkpoint_info)

def vis_callback():
    eel.js_vis_callback()

def message_callback(msg, type='info'):
    eel.js_message_callback(msg, type)
