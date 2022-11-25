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
            if (content.style.display === "block")
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

function createTextInput(id, caption, value)
{
    var input = "<p><label for=\"" + id + "\">" + caption + "</label>";
    input = input + "<input type=\"text\" name=\"" + id + "\" value=\"" + value + "\"></input>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}