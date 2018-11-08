
const MainView = () =>
{
    return(
        <div>Here is your overview content</div>
    );
}


const CreateMainView = () =>{
    ReactDOM.render(
       <MainView />, document.querySelector('#dashboardContent')
    );
}
