function RunInit()
{
    GetBuildInfo();
    GetCompanyInfo();
    eel.init();
}

function GetBuildInfo()
{
    let promise = eel.get_build_info()();
    promise.then
    (
        (result) =>
        {
            document.getElementById("build-info").innerText = result;
        }
    );
}

function GetCompanyInfo()
{
    let promise = eel.get_company_info()();
    promise.then
    (
        (logoInfo) =>
        {
            if (logoInfo[2] != "none")
            {
                document.getElementById("supportlinks").style.display = "none";
                document.getElementById("company-info").style.display = "block";

                let content = "<img alt=\"" + logoInfo[0] + "\" src=\"img\/" + logoInfo[1] + "\"";
                if (logoInfo[2] == "height")
                {
                    content = content + " height=\"" + logoInfo[3] + "\"\/>";
                }
                else if (logoInfo[2] == "width")
                {
                    content = content + " width=\"" + logoInfo[4] + "\"\/>";
                }
                else if (logoInfo[2] == "resize")
                {
                    content = content + " height=\"" + logoInfo[3] + "\" width=\"" + logoInfo[4] + "\"\/>";
                }
                content = content + "<p>" + logoInfo[5] + "</p>";
                document.getElementById("company-info").innerHTML = content;
            }
        }
    );
}

function StartTrain()
{
    let response = confirm("Start training operation?");
    if (response)
    {
        SetTrainParamsEnabled(false);
        UpdateTrainParams();
        ResetHistoryDisplay();
        eel.start_train();
    }
}

function AbortTrain()
{
    let response = confirm("Abort training operation?");
    if (response)
    {
        eel.abort_train();
    }
}

function UpdateTrainParams()
{
    let paramDict = new Object();
    let params = document.forms["train_params"].getElementsByTagName("p");
    for (let i = 0; i < params.length; i++)
    {
        let param = params[i];
        let label = param.getElementsByClassName("field-label");
        if (label.length > 0)
        {
            label = label[0];
            let paramKey = label.htmlFor;
            let paramValue = null;

            let inputs = param.getElementsByTagName("input");
            if (inputs.length > 0)
            {
                let input = inputs[0];
                switch (input.type)
                {
                    case "text":
                        paramValue = input.value;
                        break;

                    case "number":
                        paramValue = +input.value;
                        break;

                    case "checkbox":
                        paramValue = input.checked;
                        break;

                    case "radio":
                        for (let j = 0; j < inputs.length; j++)
                        {
                            if (inputs[j].checked)
                            {
                                paramValue = inputs[j].value;
                                break;
                            }
                        }
                        break;
                }
                paramDict[paramKey] = paramValue;
            }
        }
    }
    eel.set_train_params(paramDict)();
}

function ExportHistories()
{
    let csvData = [];
    let table = document.getElementById("history_table");
    let header = document.getElementById("history_header");
    if (header == null)
    {
        return;
    }
    for (let i = 0; i < header.rows.length; i++)
    {
        let cols = header.rows[i].cells;
        let csvRow = [];
        for (let j = 0; j < cols.length; j++)
        {
            csvRow.push(cols[j].innerHTML);
        }
        csvData.push(csvRow.join(","));
    }

    if (table.tBodies.length == 0)
    {
        return;
    }

    let rows = table.tBodies[0].rows;
    for (let i = 0; i < rows.length; i++)
    {
        let cols = rows[i].cells;
        let csvRow = [];
        for (let j = 0; j < cols.length; j++)
        {
            if (j == cols.length - 2)
            {
                csvRow.push(cols[j].innerHTML != "" ? "true" : "false");
            }
            else if (j == cols.length - 1)
            {
                csvRow.push("\"" + cols[j].innerHTML + "\"");
            }
            else
            {
                csvRow.push(cols[j].innerHTML);
            }
        }
        csvData.push(csvRow.join(","));
    }
    csvData = csvData.join("\n");

    let csvFile = new Blob([csvData], { type:"text/csv" });
    GenerateDownloadLink(csvFile, "histories.csv");
}

function GenerateDownloadLink(obj, fileName)
{
    let url = window.URL.createObjectURL(obj);
    let tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.download = fileName;
    tempLink.style.display = "none";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
}

function SaveMessageLog()
{
    let messageLogBox = document.getElementById("messagelog-box");
    let fullLog = messageLogBox.innerText;
    let logFile = new Blob([fullLog], {type: "text/txt"});
    GenerateDownloadLink(logFile, "logfile.txt");
}

function ClearMessageLog()
{
    let messageLogBox = document.getElementById("messagelog-box");
    messageLogBox.innerHTML = "";
}