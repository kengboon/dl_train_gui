// The functions can be called from Python via eel.function_name()
eel.expose(js_status_callback);
function js_status_callback(status)
{
    document.getElementById("curr_status").innerText = status;
}

eel.expose(js_epoch_callback);
function js_epoch_callback(i, j)
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
}

eel.expose(js_train_param_callback)
function js_train_param_callback(id, caption, value, type, min, max, decimal, choices)
{
    switch (type)
    {
        default:
            createTextInput(id, caption, value);
            break;
    }
}