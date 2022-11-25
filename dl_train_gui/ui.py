import os, sys
import eel
from eel import chrome
from dl_train_gui import config

class UI:
    program = None

    def __init__(self, prog=None):
        eel.init(config.ASSET_FOLDER)
        UI.program = prog

    def start_ui(self):
        try:
            # Check Chrome installed
            chrome_instance_path = chrome.find_path()
            if chrome_instance_path is not None and os.path.exists(chrome_instance_path):
                eel.start('index.html', port=0, size=(600, 400))
            elif sys.platform in ['win32', 'win64']:
                eel.start('index.html', port=0, size=(600, 400), mode='edge')
            else:
                print('Chrome is not installed.')
        except Exception as ex:
            print(ex)

@eel.expose
def init():
    callbacks = [status_callback, epoch_callback, init_params_callback]
    UI.program.hook(callbacks)
    UI.program.init_train_param()

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

def status_callback(status):
    eel.js_status_callback(status)

def epoch_callback(i, j):
    eel.js_epoch_callback(i, j)
