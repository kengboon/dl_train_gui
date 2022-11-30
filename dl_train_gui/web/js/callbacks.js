// The functions can be called from Python via eel.function_name()
eel.expose(JsInitCompCallback)
function JsInitCompCallback()
{
    UpdateControls();
}


eel.expose(JsStatusCallback);
function JsStatusCallback(status, idle=true)
{
    document.getElementById("curr_status").innerText = status;
    SetTrainParamsEnabled(idle);
    SetTrainOperationBtnState(idle);
}

eel.expose(JsEpochCallback);
function JsEpochCallback(curEpoch, maxEpoch, progress="")
{
    document.getElementById("curr_epoch").innerText = curEpoch;
    if (maxEpoch >= curEpoch)
    {
        document.getElementById("max_epoch").innerText = maxEpoch;
    }
    else
    {
        document.getElementById("max_epoch").innerText = curEpoch;
    }
    if (progress != "")
    {
        document.getElementById("epoch_progress").innerText = " : " + progress;
    }
    else
    {
        document.getElementById("epoch_progress").innerText = "";
    }
}

eel.expose(JsTrainParamCallback)
function JsTrainParamCallback(id, caption, value, type=null, min=0, max=1, step=1, choices=null)
{
    switch (type)
    {
        case "section":
        case "title":
            CreateSectionTitle(id, caption);
            break;

        case "int":
        case "integer":
        case "number":
        case "float":
        case "double":
            CreateNumberInput(id, caption, value, min, max, step);
            break;

        case "checkbox":
        case "bool":
        case "boolean":
            CreateCheckBoxInput(id, caption, value);
            break;

        case "choices":
        case "options":
        case "enum":
        case "enums":
            CreateRadioInput(id, caption, value, choices)
            break;

        case "folder":
        case "dir":
        case "directory":
            CreateDirectoryPathInput(id, caption, value);
            break;

        default:
            CreateTextInput(id, caption, value);
            break;
    }
}

eel.expose(JsEpochEndCallback)
function JsEpochEndCallback(epoch, perfInfo, isCheckpoint=null, checkpointInfo="")
{
    CreateTableRow(epoch, perfInfo, isCheckpoint, checkpointInfo);
}

eel.expose(JsVisCallback)
function JsVisCallback()
{

}

eel.expose(JsMessageCallback)
function JsMessageCallback(msg, type="info")
{

}