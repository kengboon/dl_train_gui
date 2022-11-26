# <img src="https://github.com/kengboon/dl_train_gui/blob/dev/dl_train_gui/web/img/neural_net.png" height="36"/> Deep Learning Training GUI
Python ↔ HTML/JS GUI for deep learning training, built using [Eel](https://github.com/python-eel/Eel).

**dl_train_gui** acts as a container to the training code (no constraint on the deep learning framework), and provide a generic GUI for deep learning training task.

## Usage
Inherit from or override the [```Program```](https://github.com/kengboon/dl_train_gui/blob/dev/dl_train_gui/prog.py) class (see [sample](https://github.com/kengboon/dl_train_gui/blob/dev/dl_train_gui/demo.py)).

Create instance of program [here](https://github.com/kengboon/dl_train_gui/blob/dev/dl_train_gui/util.py).

```Python
def create_default_program():
    return YOUR_PROGRAM_CLASS()
```

Following implementations required:
- ```init_train_params``` - define a list of hyperparameters to be populated on UI form
- ```set_train_params``` - set the values of hyperparameters from UI form into training code
- ```train``` - the entry point of training code

And hooked to callbacks below:
- ```status_callback``` - to update the training status such as running, error, cancelled, etc. to UI
- ```epoch_callback``` - to update the epoch count and progress to UI
- ```epoch_end_callback``` - to indicate end of epoch and record performance
- ```vis_callback``` - to send visualization to UI (optional)
- ```message_callback``` - to send miscellaneous messages to UI

## Build as distributable binary
[PyInstaller](https://github.com/pyinstaller/pyinstaller) is included in [Eel](https://github.com/python-eel/Eel).

A sample command can be found at [this batch file](https://github.com/kengboon/dl_train_gui/blob/dev/build.bat), include all required packages with ```--hidden-import``` if intended to build as single executable.

Read the [documentation for PyInstaller](https://pyinstaller.org/en/stable/) for more options.

## Attributes
Favicon comes from [artificial intelligence icon pack](https://www.flaticon.com/packs/artificial-intelligence-261) by Freepik.

## Citation
If you use the software in your research project, please use the following citation ([view metadata](https://github.com/kengboon/dl_train_gui/blob/dev/CITATION.cff)).
### BibTex
```BibTex
@software{kengboon_dl_train_gui,
    author = {Teo, Keng Boon},
    license = {Apache-2.0},
    title = {{dl_train_gui}: Deep Learning Training GUI},
    url = {https://github.com/kengboon/dl_train_gui}
}
```
### APA
```APA
Teo, K. B. Deep Learning Training GUI (dl_train_gui) [Computer software]. https://github.com/kengboon/dl_train_gui
```

## If this is helpful, buy me a ☕
<a href="https://ko-fi.com/woolf42" target="_blank"><img src="https://user-images.githubusercontent.com/5046671/197377067-ce6016ae-6368-47b6-a4eb-903eb7b0af9c.png" width="200" alt="Support me on Ko-fi"/></a>
