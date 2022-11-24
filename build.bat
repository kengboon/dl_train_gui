:: Optional: Activate environment
call conda activate eel

:: Build the distributable binary
:: See PyInstaller documentation for optional argurments
:: Include modules required in --hidden-import
python -m eel run.py "dl_train_gui" --onefile --noconsole --name "dl_train_gui" --hidden-import eel

pause