function PreventUnload()
{
    window.onbeforeunload = function(e)
    {
        let startBtn = document.getElementById("start_train_btn");
        if (startBtn.disabled)
        {
            e.preventDefault();
            e.returnValue = "";
            return false;
        }
    }
}

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
        var content = coll[i].nextElementSibling;
        if (content.style.display == "none")
        {
            coll[i].innerHTML = "&#9657; " + coll[i].innerHTML;

        }
        else
        {
            coll[i].innerHTML = "&#9662; " + coll[i].innerHTML;
        }

        coll[i].addEventListener("click", function()
        {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display == "block")
            {
                content.style.display = "none";
                this.innerHTML = "&#9657; " + this.innerHTML.substring(2);
            }
            else
            {
                content.style.display = "block";
                this.innerHTML = "&#9662; " + this.innerHTML.substring(2);
            }
        });
    }
}

function CreateResizeObserver()
{
    /*
    if (window.ResizeObserver)
    {
        let observer = new ResizeObserver(entries =>
        {
            let grid = document.getElementById("line-charts-grid");
        });
        let elem = document.getElementById("vis_content");
        observer.observe(elem);
    }
    */
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
    document.getElementById("history_content_table").style.height = window.innerHeight * .3;
    document.getElementById("history_content_table").style.overflow = "auto";
    document.getElementById("line-charts-grid").style.height = window.innerHeight * .4;
    document.getElementById("messagelog-box").style.height = window.innerHeight * .2;
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

function CreateFilePathInput(id, caption, value)
{
    var input = "<p><label class=\"field-label\" for=\"" + id + "\">" + caption + "</label>";
    input = input + "<input type=\"text\" name=\"" + id + "\" value=\"" + value + "\"></input>";
    input = input + "<button onclick=\"BrowserFile(\'" + id + "\')\" type=\"button\" class=\"browse_dir\">Browse</button></p>";
    var form = document.getElementById("train_params");
    form.innerHTML = form.innerHTML + input;
}

function BrowserFile(paramID)
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
                let promise = eel.ask_file()();
                promise.then(
                    (filePath) =>
                    {
                        if (filePath != null && filePath != "")
                        {
                            inputs[j].value = filePath;
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

function CreateTableHeader(perfInfo)
{
    let header = document.getElementById("history_header");
    if (header == null)
    {
        var table = document.getElementById("history_table");
        header = table.createTHead();
        header.id = "history_header";
    }
    if (header.rows.length == 0)
    {
        var row = header.insertRow();
        CreateTableCell(row, "Epoch");
        for (let key of Object.keys(perfInfo))
        {
            CreateTableCell(row, key);
        }
        CreateTableCell(row, "Checkpoint");
        CreateTableCell(row, "Note");
    }
}

function ClearTableRow()
{
    var table = document.getElementById("history_table");
    while (table.rows.length > 0)
    {
        table.deleteRow(0);
    }
}

function CreateTableRow(epoch, perfInfo, isCheckpoint, checkpointInfo)
{
    CreateTableHeader(perfInfo);
    var table = document.getElementById("history_table");
    var tableBody = table.getElementsByTagName("tbody");
    if (tableBody.length == 0)
    {
        tableBody = table.createTBody();
    }
    else
    {
        tableBody = tableBody[0];
    }
    var row = tableBody.insertRow();
    CreateTableCell(row, epoch);
    for (let key of Object.keys(perfInfo))
    {
        CreateTableCell(row, perfInfo[key]);
    }

    if (isCheckpoint)
    {
        let cell = CreateTableCell(row, "&#9873;");
        cell.style.color = "red";
        row.style.fontWeight = "bold";
    }
    else
    {
        CreateTableCell(row, "");
    }
    CreateTableCell(row, checkpointInfo);

    if (document.getElementById("history-table-autoscroll").checked)
    {
        let container = document.getElementById("history_content_table");
        container.scrollTop = container.scrollHeight;
    }
}

function CreateTableCell(row, content, index=null)
{
    let cell = row.insertCell();
    cell.innerHTML = content;
    return cell;
}

// Control state helpers
function SetTrainParamsEnabled(isEnabled)
{
    let params = document.forms["train_params"].getElementsByTagName("p");
    for (let i = 0; i < params.length; i++)
    {
        let elem = params[i].getElementsByTagName("input");
        for (let j = 0; j < elem.length; j++)
        {
            elem[j].disabled = !isEnabled;
        }
        elem = params[i].getElementsByTagName("button");
        for (let j = 0; j < elem.length; j++)
        {
            elem[j].disabled = !isEnabled;
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

function ResetHistoryDisplay()
{
    ClearTableRow();
    ClearLineCharts();    
    CreateResizeObserver();
    ExpandHistorySection();
    eel.init_vis();
}

function ExpandHistorySection(scrollTo=null)
{
    let contents = ["train_param_content", "history_content", "vis_content"];
    let displays = ["none", "block", "block"];
    for (let i=0; i < contents.length; i++)
    {
        let content = document.getElementById(contents[i]);
        if (content.style.display != displays[i])
        {
            let button = content.previousElementSibling;
            button.click();
        }
    }
    if (scrollTo != null)
    {
        document.getElementById(scrollTo).scrollIntoView();
    }
    else if (contents.length > 0)
    {
        document.getElementById(contents[0]).scrollIntoView();
    }
}