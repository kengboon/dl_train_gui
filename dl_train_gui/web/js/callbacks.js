// The functions can be called from Python via eel.function_name()
eel.expose(status_callback);
function status_callback(status)
{
    document.getElementById("curr_status").innerText = status;
}

eel.expose(epoch_callback);
function epoch_callback(i, j)
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