// Called once after initialized
function UpdateControls()
{
    UpdateCollapsible();
    UpdateFormLabelSize();
    UpdateLayouts();
    HideSpinner();
}

// Reference: https://www.w3schools.com/howto/howto_js_collapsible.asp
function UpdateCollapsible()
{
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++)
    {
        coll[i].innerHTML = '&#x21D5; ' + coll[i].innerHTML;
        coll[i].addEventListener("click", function()
        {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display == "block")
            {
                content.style.display = "none";
            }
            else
            {
                content.style.display = "block";
            }
        });
    }
}

function HideSpinner()
{
    document.getElementById("spinner-root").style.display = "none";
}

function UpdateFormLabelSize()
{
    let max_width = 120;
    let params = document.forms["train_params"].getElementsByTagName("p");
    let labels = [];
    for (let i = 0; i < params.length; i++)
    {
        let _labels = params[i].getElementsByClassName("field-label");
        for (let j = 0; j < _labels.length; j++)
        {
            if (_labels[j].offsetWidth > max_width)
            {
                max_width = _labels[j].offsetWidth;
            }
            labels.push(_labels[j]);
        }
    }
    for (let i = 0; i < labels.length; i++)
    {
        labels[i].style.width = max_width;
    }
}

// Call after initialized and window size changed
function UpdateLayouts()
{
    document.getElementById("train_param_content").style.maxHeight = window.innerHeight * .5;
}

// Create training parameter form inputs
function CreateSectionTitle(id, caption)
{
    var sec = "<p class=\"train_param_title\" id=\"" + id + "\">" + caption + "</p><hr/>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + sec;
}

function CreateDirectoryPathInput(id, caption, value)
{
    var input = "<p><label class=\"field-label\" for=\"" + id + "\">" + caption + "</label>";
    input = input + "<input type=\"text\" name=\"" + id + "\" value=\"" + value + "\"></input>";
    input = input + "<button onclick=\"BrowserFolder(\'" + id + "\')\" type=\"button\" class=\"browse_dir\">Browse</button></p>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}

function BrowserFolder(paramID)
{
    let params = document.forms["train_params"].getElementsByTagName("p");
    for (let i = 0; i < params.length; i++)
    {
        let inputs = params[i].getElementsByTagName("input");
        for (let j = 0; j < inputs.length; j++)
        {
            console.log(inputs[j]);
            if (inputs[j].type == "text" && inputs[j].name == paramID)
            {
                let promise = eel.ask_folder()();
                promise.then(
                    (folderPath) =>
                    {
                        if (folderPath != null && folderPath != "")
                        {
                            inputs[j].value = folderPath;
                        }
                    }
                );
                return;
            }
        }
    }
}

function CreateTextInput(id, caption, value)
{
    var input = "<p><label class=\"field-label\" for=\"" + id + "\">" + caption + "</label>";
    input = input + "<input type=\"text\" name=\"" + id + "\" value=\"" + value + "\"></input></p>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}

function CreateNumberInput(id, caption, value, min, max, step)
{
    var input = "<p><label class=\"field-label\" for=\"" + id + "\">" + caption + "</label>";
    input = input + "<input type=\"number\" name=\"" + id + "\" value=\"" + value
        + "\" min=\"" + min + "\" max=\"" + max +"\" step=\"" + step + "\"></input></p>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}

function CreateCheckBoxInput(id, caption, value)
{
    var input = "<p><label class=\"field-label\" for=\"" + id + "\">" + caption + "</label>";
    input = input + "<input type=\"checkbox\" name=\"" + id + "\"";
    if (value)
    {
        input = input + " checked";
    }
    input = input + "></input></p>"
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}

function CreateRadioInput(id, caption, value, choices)
{
    var input = "<p><label class=\"field-label\" for=\"" + id + "\">" + caption + "</label>";
    for (let i = 0; i < choices.length; i++)
    {
        input = input + "<input type=\"radio\" name=\"" + id + "\" value=\"" + choices[i] + "\"";
        if (value == choices[i])
        {
            input = input + " checked";
        }
        input = input + ">";
        input = input + "<label>" + choices[i] + "</label>";
        input = input + "</input>&nbsp;";
    }
    input = input + "</p>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}

// Control state helpers
function SetTrainParamsEnabled(isEnabled)
{
    let params = document.forms["train_params"].getElementsByTagName("p");
    for (let i = 0; i < params.length; i++)
    {
        let inputs = params[i].getElementsByTagName("input");
        for (let j = 0; j < inputs.length; j++)
        {
            inputs[j].disabled = !isEnabled;
        }
    }
}

function SetTrainOperationBtnState(isEnabled)
{
    let startBtn = document.getElementById("start_train_btn");
    startBtn.disabled = !isEnabled;
    let abortBtn = document.getElementById("abort_train_btn");
    abortBtn.disabled = isEnabled;
}