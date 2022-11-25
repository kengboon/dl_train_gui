from enum import Enum

class Status(Enum):
    ERROR = -2
    IDLE = 0
    TRAINING = 1
    END = 2
    ABORTING = 3
    ABORTED = 4