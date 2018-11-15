const WaterView = (props) =>
{

    let allBodies =  props.bodies.map((water) => {
                        return  <WaterBodyView body={water}/>
                    });

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
                <h2 className="row">Results<a href="/newWaterTest"><PlusIcon/></a></h2>
                <div className="row"> 
            
                    
                </div>
            </section>
        </div>
    );
}




