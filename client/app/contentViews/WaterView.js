const WaterView = (props) =>
{
    let allData = [];

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

    //loop over each water body and get data
    const getAllSamples = () =>{
        let fetchWater = new Promise(function(resolve,reject){
                props.bodies.forEach(item => {
                    asyncGetData(item).then((dataReturned,error)=>{
                        console.log('done fetching water');
                        allData.push(dataReturned);
                        if(error){
                            console.log(error);
                        }
                    }).then(console.log('Done data digging'))   
                });//end for loop
                resolve();      
        });
        return fetchWater;
    }    
    
    getAllSamples().then(()=>{
        console.log('Done getting samples');
        console.dir(allData);
    });



    let allBodies =  props.bodies.map((water) => {
                        return  <WaterBodyView body={water}/>
                    });

    let allTests = props.bodies.map((sample)=>{
       
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
                    
                </div>
            </section>
        </div>
    );
}




