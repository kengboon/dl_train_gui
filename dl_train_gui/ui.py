import os, sys
import eel
from eel import chrome
from dl_train_gui import config
from dl_train_gui.prog import DemoProgram

class UI:
    def __init__(self):
        eel.init(config.ASSET_FOLDER)

    def start(self):
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

current_program = None

@eel.expose
def start_train():
    global current_program
    callbacks = [status_callback, epoch_callback]
    current_program = DemoProgram(callbacks)
    current_program.start_train(None)

@eel.expose
def abort_train():
    global current_program
    if current_program is not None:
        current_program.abort_train()
        current_program = None

def status_callback(status):
    eel.status_callback(status)

def epoch_callback(i, j):
    eel.epoch_callback(i, j)
