# <img src="https://github.com/kengboon/dl_train_gui/blob/dev/dl_train_gui/web/img/neural_net.png" height="36"/> Deep Learning Training GUI
Python GUI for deep learning training, built using [Eel](https://github.com/python-eel/Eel).

## Usage
**dl_train_gui** acts as a extension to the training script (hence no constraint on the deep learning framework), and provide a generic GUI for deep learning training task.

The training script should implements:
- ```set_train_params``` - assign training params from UI to your training script
- ```train``` - the entry point of training task
- ```start_train``` - starting of training tread
- ```abort_train``` - abort the training task and thread

And hooked to callbacks below:
- ```status_callback``` - to update the training status such as running, error, cancelled, etc. to UI
- ```epoch_callback``` - to update the epoch count to UI
- ```train_performance_callback``` - to update train performance info to UI
- ```train_vis_callback``` - to update live train performance visualization to UI
- ```message_callback``` - to update miscellaneous messages to UI

An dummy implementation can be found [here](https://github.com/kengboon/dl_train_gui/blob/dev/dl_train_gui/prog.py).
