const WaterView = (props) =>
{
    let allData = [];
    
    const addWater = (newData) => allData.push(newData);

    const fetchWater = (bodies) => {
        return new Promise(function(resolve, reject){
            bodies.forEach(item => {
                sendAjax('GET', '/addWater', item, data =>{
                    console.dir(data);
                    addWater(data);
                });
            });//data request
            resolve
        });//promise wrapper
    }//function data call
    
    //Keeps resolving prematurely
    fetchWater(props.bodies).then(console.dir(allData));
    
    console.log(allData);

    let allBodies =  props.bodies.map((water) => {
                        return  <WaterBodyView body={water}/>
                    });

    let allTests = allData.map((sample) => {
        console.dir(sample);
    })



    if(props.bodies.length === 0){
        allBodies = <h5 className="col-sm-8 text-center">Lets <a href="/newWaterBody">add</a> a pool or spa.</h5>
    }

    //allTests = <h5 className="col-sm-8 text-center">Lets <a href="/newWaterBody">add</a> a test.</h5>
    return(
        <div>
            <section className="container-fluid">
                <h2 className="row">My Water<a href="/newWaterBody"><PlusIcon/></a></h2>
                <div className="row"> 
                   {allBodies}  
                </div>
            </section>
            <section className="container-fluid">
                <h2 className="row">Test Results<a href="/newWaterTest"><PlusIcon/></a></h2>
                <div className="row"> 
                    {allTests}
                    <WaterTestView/>
                </div>
            </section>
        </div>
    );
}




