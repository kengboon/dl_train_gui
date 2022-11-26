function RunInit()
{
    eel.init();
}

function StartTrain()
{
    SetTrainParamsEnabled(false);
    eel.start_train();
}

function AbortTrain()
{
    eel.abort_train();
}