:: Optional: Activate environment
call conda activate eel

:: Build the distributable binary
:: See PyInstaller documentation for optional argurments
:: Include modules required in --hidden-import
python -m eel run.py "dl_train_gui" --onefile --noconsole --name "dl_train_gui" --icon "dl_train_gui/web/img/neural_net.ico"^
 --hidden-import eel^
 --hidden-import tkinter^
 --hidden-import tkinter.filedialog

:: Optional: pause
pause