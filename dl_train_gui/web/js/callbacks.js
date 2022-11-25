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
function js_train_param_callback(id, caption, value, type=null, min=0, max=1, d_points=0, choices=null)
{
    switch (type)
    {
        case "int":
        case "integer":
            createNumberInput(id, caption, value, min, max, 0);
            break;

        case "number":
        case "float":
        case "double":
            createNumberInput(id, caption, value, min, max, d_points);
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