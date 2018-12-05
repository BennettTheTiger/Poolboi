
/*

const WaterGraph = (props) =>{
    // Load Charts and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    google.charts.setOnLoadCallback(drawBodyChart);
    
    let chartDiv = <div></div>
    
    const drawBodyChart = () => {
        let data = new google.visualization.DataTable();//serves as a data model
        data.addColumn('number', 'Date');
        data.addColumn('number', 'alkalinity');
        data.addColumn('number', 'cAcid');
        data.addColumn('number', 'chlorine');
        data.addColumn('number', 'freeChlorine');
        data.addColumn('number', 'hardness');
        data.addColumn('number', 'ph');

        //data.addRows([[sample data],[sample data]])
        data.addRows([
            [123,21,32,21,321,321,3221],
            [131,54,13,12,321,321,123]
        ]);
        let options = {
            chart: {
              title: 'Pool Name',
            },
            width: '100%',
            height: 500,
            axes: {
              x: {
                0: {side: 'top'}
              }
            }
        };

        let chart = new google.charts.Line(chartDiv);

        chart.draw(data, google.charts.Line.convertOptions(options));
    }
    
    
    
    return(
        <div>
            {chartDiv}
        </div>
    )
}
*/