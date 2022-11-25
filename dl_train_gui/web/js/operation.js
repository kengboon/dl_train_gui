function set_train_params_enable(isEnabled)
{
    let params = document.forms["train_params"].getElementsByTagName("p");
    for (let i = 0; i < params.length; i++)
    {
        let inputs = params[i].getElementsByTagName("input");
        console.log(inputs);
        for (let j = 0; j < inputs.length; j++)
        {
            inputs[j].disabled = !isEnabled;
        }
    }
}

function start_train()
{
    set_train_params_enable(false);
    eel.start_train();
}

function abort_train()
{
    eel.abort_train();
}