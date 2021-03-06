class Graph extends React.Component{
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d");

        //async call to get data takes a water body object
        const asyncGetData = (body) =>{
                sendAjax('GET', '/addWater', body, data =>{
                    if(data) cleanData(data); 
                    else {console.log('error No data was found')};
                });
        }

        asyncGetData(this.props.body);

      //make arrays for each field of data
      const cleanData = (allData) => {
          let pureData = {};
          pureData.dates = [];
          pureData.ph = [];
          pureData.cAcid = [];
          pureData.alkalinity =[];
          pureData.chlorine = [];
          pureData.freeChlorine = [];
          pureData.hardness = [];
          //push each samples data to the pure data field array
          allData.map(e => {
              pureData.dates.push(readableDate(e.date));
              pureData.ph.push(e.ph);
              pureData.cAcid.push(e.cAcid);
              pureData.alkalinity.push(e.alkalinity);
              pureData.chlorine.push(e.chlorine);
              pureData.freeChlorine.push(e.freeChlorine);
              pureData.hardness.push(e.hardness);
          });

          this.buildChart(ctx,pureData);
        }
    }
      

      buildChart(ctx,data){
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.dates.reverse(),//puts data in order from left to right
                datasets: [
                    {
                        label: 'Alkalinity',
                        fill:false,
                        data: data.alkalinity.reverse(),
                        borderColor: "#7F0F7E",
                        backgroundColor: "#7F0F7E",
                        yAxisID:'A',
                    },
                    {
                        label: 'cAcid',
                        fill:false,
                        data: data.cAcid.reverse(),
                        borderColor: '#023f7c',
                        backgroundColor: '#023f7c',
                        yAxisID:'A',
                    },
                    {
                        label: 'Free Chlorine',
                        fill:false,
                        data: data.freeChlorine.reverse(),
                        borderColor: '#83d4ea',
                        backgroundColor: '#83d4ea',
                        yAxisID:'B'
                    },
                    {
                        label: 'Chlorine',
                        fill:false,
                        data: data.chlorine.reverse(),
                        borderColor: '#3385ff',
                        backgroundColor: '#3385ff',
                        yAxisID:'B',
                    },
                    {
                        yAxisID:'B',
                        label: 'PH',
                        fill:false,
                        data: data.ph.reverse(),
                        borderColor: '#e98338',
                        backgroundColor: '#e98338',
                        
                    },
                    {
                        label: 'Hardness',
                        fill:false,
                        data: data.hardness.reverse(),
                        borderColor: 'tan',
                        backgroundColor: 'tan',
                        yAxisID:'A'
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            id:'A',
                            type: 'linear',
                            position: 'left',
                            ticks: {
                                beginAtZero:true
                            }
                        },
                        {
                            id: 'B',
                            type: 'linear',
                            position: 'right',
                            ticks:{
                                max:10,
                                min:0,
                            }
                        },
                    ],
                    xAxes: {
                        ticks:{
                            reversed: true
                        }
                    },
                },
                elements: {
                    line: {
                        tension: .1, // disables bezier curves
                    }
                },
                title:{
                    display:true,
                    text: this.props.body.name,
                    fontSize:40,
                    fontFamily:'Maven Pro',
                    fontColor:'#023f7c',
                },
            }
        });
      }

      render() {
        return(
          <div>
            <canvas ref="canvas" width={640} height={425} />
          </div>
        )
      }
}


