from enum import Enum
from dl_train_gui import __version__ as version
from dl_train_gui.demo import DemoProgram

def get_version():
    return version

def create_default_program():
    return DemoProgram()

class Mode(Enum):
    NONE = 'none'
    ORIGINAL = 'original'
    SCALE_BY_HEIGHT = 'height'
    SCALE_BY_WIDTH = 'width'
    RESIZE = 'resize'

def get_company_logo():
    name = 'Company Name'
    path = 'company_logo.png'
    copyright = '&#169; 2022 Company Name'
    display_mode = Mode.NONE.value
    height = 24
    width = 80
    return [name, path, display_mode, height, width, copyright]