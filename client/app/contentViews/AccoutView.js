const AccountView = () =>
{
    return(
        <div>Here is your Account view</div>
    );
}


const CreateAccountView = () =>{
    ReactDOM.render(
       <AccountView />, document.querySelector('#dashboardContent')
    );
}

