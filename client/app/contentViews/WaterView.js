const WaterView = () =>
{
    return(
        <div>Here is your water history</div>
    );
}


const CreateWaterView = () =>{
    ReactDOM.render(
       <WaterView />, document.querySelector('#dashboardContent')
    );
}

