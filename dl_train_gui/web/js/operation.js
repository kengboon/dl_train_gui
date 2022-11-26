function RunInit()
{
    eel.init();
}

function StartTrain()
{
    let response = confirm("Start training operation?");
    if (response)
    {
        SetTrainParamsEnabled(false);
        eel.start_train();
    }
}

function AbortTrain()
{
    let response = confirm("Abort training operation?");
    if (response)
    {
        eel.abort_train();
    }
}