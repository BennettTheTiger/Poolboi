const WaterView = (props) =>
{
    
    console.log(JSON.stringify(props.bodies));
    sendAjax('GET', '/addWater', {water:props.bodies}, (success)=>{
        console.dir(success);
    });


    let allBodies =  props.bodies.map((water) => {
                        return  <WaterBodyView body={water}/>
                    });

    let allTests = props.bodies.map((sample) => {
        return null
    })



    if(props.bodies.length === 0){
        allBodies = <h5 className="col-sm-8 text-center">Lets <a href="/newWaterBody">add</a> a pool or spa.</h5>
    }
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
                <h5 className="col-sm-8 text-center">Lets <a href="/newWaterBody">add</a> a test.</h5>
                    
                </div>
            </section>
        </div>
    );
}




