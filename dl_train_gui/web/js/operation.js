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