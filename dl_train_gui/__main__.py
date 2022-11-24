from dl_train_gui import __version__
from dl_train_gui.ui import UI

def run():
    print('dl_train_gui ' + __version__)
    gui = UI()
    gui.start()

if __name__ == '__main__':
    run()