const WaterBodyView = (props) =>
{
    const delteBody = () =>{
        const remove = window.confirm('Are you sure you want to delete ' + props.body.name + ' \nThis will also delete all water samples for ' + props.body.name);
        if(remove){
            console.log('deleted water body id and all samples for ' + props.body.name);
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
                <hr/>
                {/*
                <p className="small">Api-ID:{props.body._id}</p>
                <button onClick={delteBody}>Delete</button>
                */}
            </div>
       
    );
}