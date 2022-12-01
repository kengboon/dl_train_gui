var visSectionDisplayed = false;
var chartObjs = new Object();
var chartData = new Object();

function GetVisSection()
{
    let sectionButton = null;
    let container = document.getElementById("vis_content");
    if (!visSectionDisplayed && container.style.display == "none")
    {
        container.style.opacity = 0;
        sectionButton = container.previousElementSibling;
        sectionButton.click();
        visSectionDisplayed = true;
    }
    return { sectionButton, container };
}

function InitLineChartDisplay(count)
{
    for (let i = 0; i < count; i++)
    {
        let chartId = "line-chart-" + i;
        CreateLineChartDisplay(chartId);
    }
}

function CreateLineChartDisplay(chartId)
{
    let container = document.getElementById("line-charts-grid");
    let charts = container.getElementsByClassName("line-chart-area");
    let chartCount = charts.length;
    let chart = charts.namedItem(chartId);
    if (chart == null || chart.length == 0)
    {
        chart = document.createElement("div");
        chart.id = chartId;
        chart.className = "line-chart-area";
        container.appendChild(chart);
        chartCount = chartCount + 1;
    }

    let gridTemplateCols = "";
    let avgWidth = 100 / chartCount;
    for (let i = 0; i < chartCount; i++)
    {
        gridTemplateCols = gridTemplateCols + avgWidth + "% ";
    }
    container.style.gridTemplateColumns = gridTemplateCols;
}

function ClearLineCharts()
{
    let container = document.getElementById("line-charts-grid");
    let charts = container.getElementsByClassName("line-chart-area");
    while (charts.length > 0)
    {
        container.removeChild(charts[0]);
    }
    for (let key of Object.keys(chartObjs))
    {
        if (key.startsWith("line-chart-"))
        {
            chartObjs[key] = null;
            chartData[key] = null;
        }
    }
}

function UpdateLineChart(chartId, epoch, perfInfo)
{
    let { sectionButton, container } = GetVisSection();

    chartId = "line-chart-" + chartId;
    CreateLineChartDisplay(chartId);
    let exists = chartId in chartObjs;
    if (!exists)
    {
        chartObjs[chartId] = null;
    }

    if (chartObjs[chartId] == null)
    {
        chartData[chartId] = new Object();
        chartData[chartId]["epoch"] = ["epoch"];
        chartData[chartId]["epoch"].push(epoch);

        for (let key of Object.keys(perfInfo))
        {
            chartData[chartId][key] = [key];
            chartData[chartId][key].push(perfInfo[key]);
        }

        chartObjs[chartId] = bb.generate({
            data:
            {
                columns: Object.keys(chartData[chartId]).map(key => chartData[chartId][key]),
                x: "epoch"
            },
            type: "line",
            bindto: "#" + chartId,
            point:
            {
                show: false
            }
        });
    }
    else
    {
        chartData[chartId]["epoch"].push(epoch);
        for (let key of Object.keys(perfInfo))
        {
            if (key in chartData[chartId])
            {
                chartData[chartId][key].push(perfInfo[key]);
            }
        }

        chartObjs[chartId].load({
            columns: Object.keys(chartData[chartId]).map(key => chartData[chartId][key])
        });
    }

    if (sectionButton != null)
    {
        container.style.opacity = 1;
        sectionButton.click();
    }
}