var lineChart = null;
var displayOnce = false;

function UpdateLineChart(epoch, perfInfo)
{
    let sectionButton = null;
    let container = document.getElementById("vis_content");
    if (!displayOnce && container.style.display == "none")
    {
        container.style.opacity = 0;
        sectionButton = container.previousElementSibling;
        sectionButton.click();
        displayOnce = true;
    }

    if (lineChart == null)
    {
        let columns = [];
        let data = [ "epoch"];
        data.push(epoch);
        columns.push(data);

        for (let key of Object.keys(perfInfo))
        {
            data = [ key ];
            data.push(perfInfo[key]);
            columns.push(data);
        }

        lineChart = bb.generate({
            data: 
            {
                columns: columns,
                x: "epoch"
            },
            type: "line",
            bindto: "#line-chart",
            point:
            {
                show: false
            }
        });
    }
    else
    {
        let columns = [];
        let data = [ "epoch" ];
        for (let i = 1; i <= epoch; i++)
        {
            data.push(i);
        }
        columns.push(data);

        let curData = lineChart.data();
        for (let key of Object.keys(perfInfo))
        {
            data = curData.find(x => x.id == key);
            if (data != null)
            {
                data = data.values.map(x => x.value);
                data.unshift(key);
                data.push(perfInfo[key]);
                columns.push(data);
            }
        }

        lineChart.load({
            columns: columns
        });
    }

    if (sectionButton != null)
    {
        container.style.opacity = 1;
        sectionButton.click();
    }
}