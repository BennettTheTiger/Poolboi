


const DashNav = (props) =>{
    return(
        <div>
            <div className="navItem"><span onClick={() => props.newContent(<MainView/>)}>Overview</span></div>
            <div className="navItem"><span onClick={() => props.newContent(<WaterView/>)}>Water</span></div>
            <div className="navItem"><span onClick={() => props.newContent(<AccountView/>)}>Account</span></div>
            <div className="navItem"><a href="/about">About</a></div>
            <div className="navItem">Log Out</div>
        </div>
    );
}
/*
const createDashNav = (csrf) => {
    ReactDOM.render(
        <DashNav csrf = {csrf}/>, document.querySelector('#dashNav')
    );
};
*/
const getToken = () =>{
    sendAjax('GET','/getToken',null, (result) =>{
        createDashNav(result.csrfToken);
    });
}
/*
onload getToken > setup > show login view
window.onload = () =>{
    //getToken();
    createDashNav('fake');
}
*/