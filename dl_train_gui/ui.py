import os, sys
import eel
from eel import chrome
from dl_train_gui import config, dialogs
from dl_train_gui.util import *

class UI:
    program = None

    def __init__(self, prog=None):
        eel.init(config.ASSET_FOLDER)
        UI.program = prog

    def start_ui(self):
        try:
            size = (600, 650)
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
def get_build_info():
    return 'ver ' + get_version()

@eel.expose
def get_company_info():
    return get_company_logo()

@eel.expose
def ask_file():
    return dialogs.ask_file()

@eel.expose
def ask_files():
    return dialogs.ask_files()

@eel.expose
def ask_folder():
    return dialogs.ask_folder()

@eel.expose
def does_file_exist(file_path):
    return os.path.isfile(file_path)

@eel.expose
def does_folder_exist(path):
    return os.path.isdir(path)

@eel.expose
def init():
    if UI.program is None:
        UI.program = create_default_program()
        callbacks = [status_callback, init_params_callback, epoch_callback, epoch_end_callback, vis_callback, message_callback]
        UI.program.hook(callbacks)
        UI.program.init_train_params()
    eel.JsInitCompCallback();

@eel.expose
def start_train():
    UI.program.start_train()

@eel.expose
def abort_train():
    UI.program.abort_train()

@eel.expose
def set_train_params(param_dict):
    UI.program.set_train_params(param_dict)

def init_params_callback(param_dict):
    for param_id in param_dict:
        param_info = param_dict[param_id]
        if len(param_info) < 3:
            eel.JsTrainParamCallback(param_id, param_info[0], param_info[1])
        elif param_info[2] in ['integer', 'int']:
            eel.JsTrainParamCallback(param_id, param_info[0], param_info[1], param_info[2], param_info[3], param_info[4], param_info[5] if len(param_info) > 5 else 1)
        elif param_info[2] in ['number', 'float', 'double']:
            eel.JsTrainParamCallback(param_id, param_info[0], param_info[1], param_info[2], param_info[3], param_info[4], param_info[5])
        elif param_info[2] in ['enum', 'enums', 'options', 'choices']:
            eel.JsTrainParamCallback(param_id, param_info[0], param_info[1], param_info[2], param_info[3], param_info[4], param_info[5], param_info[6])
        else:
            eel.JsTrainParamCallback(param_id, param_info[0], param_info[1], param_info[2])

def status_callback(status, idle=True):
    eel.JsStatusCallback(status, idle)

def epoch_callback(cur_epoch, max_epoch, progress=''):
    eel.JsEpochCallback(cur_epoch, max_epoch, progress)

def epoch_end_callback(i, perf_info, is_checkpoint=False, checkpoint_info=''):
    eel.JsEpochEndCallback(i, perf_info, is_checkpoint, checkpoint_info)

def vis_callback():
    eel.JsVisCallback()

def message_callback(msg, type='info'):
    eel.JsMessageCallback(msg, type)
