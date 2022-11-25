from dl_train_gui import __version__
from dl_train_gui.ui import UI

def run():
    print('dl_train_gui ' + __version__)

    # Load your program implementation here
    gui = UI()
    gui.start_ui()

if __name__ == '__main__':
    run()