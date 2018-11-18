class WaterView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            waterTable: <h4>No Data Yet</h4>,
            allBodies : <h4>No</h4>
        };
    }

    componentDidMount(){
        //async call to get data takes a water body object
        const asyncGetData = (item) =>{
            let promiseObj = new Promise(function(resolve, reject){
                sendAjax('GET', '/addWater', item, data =>{
                    if(data) resolve(data);
                    else reject({error:'No data was found'});
                });
            });
            return promiseObj;
        }

        let gotWater = [];
        //fill gotWater with promises for each water bodies data
        for(let i = 0; i < this.props.bodies.length; i++){
            gotWater.push(asyncGetData(this.props.bodies[i]));
        }

        //Waits for all water sample data to be fetched
        Promise.all(gotWater).then((data)=>{
            buildTable(data);
        });

        //builds tables from the water test data for each body of water
        const buildTable = (data) =>{
            let index = 0;
            let subTables = [] 
            data.forEach(sample => {
                const name = this.props.bodies[index].name;
                index++;
                subTables.push(<WaterTestView sample={sample} bodyName={name}/>); 
            });
            this.setState({waterTable:subTables});
        }

        let allBodies =  this.props.bodies.map((water) => {
            return  <WaterBodyView body={water}/>
        });
        this.setState({allBodies:allBodies});
        
        if(this.props.bodies.length === 0){
            this.setState({allBodies: <h5 className="col-sm-8 text-center">Lets <a href="/newWaterBody">add</a> a pool or spa.</h5>});
        }
    }

    

    render(){
    //allTests = <h5 className="col-sm-8 text-center">Lets <a href="/newWaterBody">add</a> a test.</h5>
    return(
        <div>
            <section className="container-fluid">
                <h2 className="row">My Water<a href="/newWaterBody"><PlusIcon/></a></h2>
                <div className="row"> 
                   {this.state.allBodies}  
                </div>
            </section>
            <section className="container-fluid">
                <h2 className="row">Test Results<a href="/newWaterTest"><PlusIcon/></a></h2>
                {this.state.waterTable}     
            </section>
        </div>
    );
    }
}
