const WaterView = (props) =>
{
    //async call to get data takes a water body object
    const asyncGetData = (item) =>{
        let promiseObj = new Promise(function(resolve, reject){
            sendAjax('GET', '/addWater', item, data =>{
                console.dir(data);
                if(data) resolve(data);
                else reject({error:'No data was found'});
            });
        });
        return promiseObj;
    }

    let gotWater = [];
    //fill gotWater with promises for each water body from 
    for(let i = 0; i < props.bodies.length; i++){
        gotWater.push(asyncGetData(props.bodies[i]));
    }

    Promise.all(gotWater).then((data)=>{
        console.log('got all water');
        console.dir(data);
  
    });

    let allBodies =  props.bodies.map((water) => {
                        return  <WaterBodyView body={water}/>
                    });

   

    
    



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
                <section id="tableHere"></section>
                    
            </section>
        </div>
    );
}




