const WaterBodyView = (props) =>
{
    const delteBody = () =>{
        const remove = window.confirm('Are you sure you want to delete ' + props.body.name + ' \nThis will also delete all water samples for ' + props.body.name);
        if(remove){
            console.log('delete water body id and all samples where bodyId is this one');
        }
    }

    let type = 'Pool';
    if(!props.body.isPool) type = 'Spa';

    return(
            <div className="col-sm-6">
                <p>Name:{props.body.name}</p>
                <p>Location:{props.body.zipCode}</p>
                <p>Type:{type}</p>
                <p>Water Health:</p>
                <button>View History</button>
                <p className="small">ID:{props.body._id}</p>
                <hr/>
                <button onClick={delteBody}>Delete</button>
            </div>
       
    );
}