
const MainView = () =>
{
    return(
        <div>Here is your overview </div>
    );
}


const CreateMainView = () =>{
    ReactDOM.render(
       <MainView />, document.querySelector('#dashboardContent')
    );
}
