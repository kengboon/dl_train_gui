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
            if (content.style.maxHeight)
            {
                content.style.maxHeight = null;
            }
            else
            {
                content.style.maxHeight = 99999;
            }
        });
    }
}

function createTextInput(id, caption, value)
{
    var input = "<p><label class=\"field-label\" for=\"" + id + "\">" + caption + "</label>";
    input = input + "<input type=\"text\" name=\"" + id + "\" value=\"" + value + "\"></input></p>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}

function createNumberInput(id, caption, value, min, max, d_points)
{
    var step = Math.pow(10, -d_points);
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