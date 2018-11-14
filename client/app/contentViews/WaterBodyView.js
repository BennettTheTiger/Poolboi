const WaterBodyView = (props) =>
{
    const delteBody = () =>{
        const remove = window.confirm('Are you sure you want to delete nameHere \n It will also delete all water samples for nameHere');
        if(remove){
            console.log('delete water body id and all samples where bodyId is this one');
        }
    }
    return(
            <div className="col-sm-4">
                <p>Name:</p>
                <p>Location:</p>
                <p>Type:</p>
                <p>Water Health:</p>
                <p>View History</p>
                <p>ID:</p>
                <hr/>
                <button onClick={delteBody}>Delete</button>
            </div>
       
    );
}