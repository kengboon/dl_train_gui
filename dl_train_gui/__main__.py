from dl_train_gui import __version__
from dl_train_gui import ui

def run():
    print('dl_train_gui ' + __version__)
    ui.start()

if __name__ == '__main__':
    run()