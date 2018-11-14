


const DashNav = (props) =>{
    return(
        <div className="dashNavContainer nav justify-content-center flex-column flex-sm-row">
            <div className="nav-item nav-link">Hello {props.account.username}</div>
            <div className="nav-item nav-link"><span onClick={() => props.newContent(<MainView weather={props.weather}/>)}>Overview</span></div>
            <div className="nav-item nav-link"><span onClick={() => props.newContent(<WaterView/>)}>Water</span></div>
            <div className="nav-item nav-link"><span onClick={() => props.newContent(<AccountView account={props.account}/>)}>Account</span></div>
            <div className="nav-item nav-link"><a href="/about">About</a></div>
            <div className="nav-item nav-link"><a href="/logout">Log Out</a></div>
            <hr/>
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