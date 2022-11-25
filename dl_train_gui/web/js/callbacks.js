// The functions can be called from Python via eel.function_name()
eel.expose(js_init_comp_callback)
function js_init_comp_callback()
{
    UpdateCollapsible();
    UpdateControls();
    hideSpinner();
}


eel.expose(js_status_callback);
function js_status_callback(status, idle=true)
{
    document.getElementById("curr_status").innerText = status;
    set_train_params_enable(idle);

}

eel.expose(js_epoch_callback);
function js_epoch_callback(i, j, progress="")
{
    document.getElementById("curr_epoch").innerText = i;
    if (j >= i)
    {
        document.getElementById("max_epoch").innerText = j;
    }
    else
    {
        document.getElementById("max_epoch").innerText = i;
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

eel.expose(js_train_param_callback)
function js_train_param_callback(id, caption, value, type=null, min=0, max=1, step=1, choices=null)
{
    switch (type)
    {
        case "int":
        case "integer":
        case "number":
        case "float":
        case "double":
            createNumberInput(id, caption, value, min, max, step);
            break;

        case "checkbox":
        case "bool":
        case "boolean":
            createCheckBoxInput(id, caption, value);
            break;

        case "choices":
        case "options":
        case "enum":
        case "enums":
            createRadioInput(id, caption, value, choices)
            break;

        default:
            createTextInput(id, caption, value);
            break;
    }
}

eel.expose(js_epoch_end_callback)
function js_epoch_end_callback(epoch, perf_info, is_checkpoint=false, checkpoint_info="")
{
}

eel.expose(js_vis_callback)
function js_vis_callback()
{

}

eel.expose(js_message_callback)
function js_message_callback(msg, type="info")
{

}