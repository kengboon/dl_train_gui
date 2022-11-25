// Reference: https://www.w3schools.com/howto/howto_js_collapsible.asp
function UpdateCollapsible()
{
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++)
    {
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

function UpdateControls()
{
    updateFormLabelSize();
    UpdateLayouts();
}

function hideSpinner()
{
    document.getElementById("spinner-root").style.display = "none";
}

function updateFormLabelSize()
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
    console.log(labels);
    for (let i = 0; i < labels.length; i++)
    {
        labels[i].style.width = max_width;
    }

}

function UpdateLayouts()
{
}


function createTextInput(id, caption, value)
{
    var input = "<p><label class=\"field-label\" for=\"" + id + "\">" + caption + "</label>";
    input = input + "<input type=\"text\" name=\"" + id + "\" value=\"" + value + "\"></input></p>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}

function createNumberInput(id, caption, value, min, max, step)
{
    var input = "<p><label class=\"field-label\" for=\"" + id + "\">" + caption + "</label>";
    input = input + "<input type=\"number\" name=\"" + id + "\" value=\"" + value
        + "\" min=\"" + min + "\" max=\"" + max +"\" step=\"" + step + "\"></input></p>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}

function createCheckBoxInput(id, caption, value)
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

function createRadioInput(id, caption, value, choices)
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
        input = input + "</input>";
    }
    input = input + "</p>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}