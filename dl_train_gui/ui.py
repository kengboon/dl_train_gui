import os, sys
import eel
from eel import chrome
from dl_train_gui import config
from dl_train_gui.prog import DemoProgram

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
    callbacks = [status_callback, epoch_callback]
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

def status_callback(status):
    eel.js_status_callback(status)

def epoch_callback(i, j):
    eel.js_epoch_callback(i, j)
