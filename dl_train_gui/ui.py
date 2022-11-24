import os, sys
import eel
from eel import chrome
from dl_train_gui import config

eel.init(config.ASSET_FOLDER)

def start():
    try:
        # Check Chrome installed
        chrome_instance_path = chrome.find_path()
        if chrome_instance_path is not None and os.path.exists(chrome_instance_path):
            eel.start('index.html', port=0)
        elif sys.platform in ['win32', 'win64']:
            eel.start('index.html', port=0, mode='edge')
        else:
            print('Chrome is not installed.')
    except Exception as ex:
        print(ex)