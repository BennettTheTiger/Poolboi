
const DashNav = (props) =>{
    return(
        <div className="dashNavContainer nav justify-content-center flex-column flex-sm-row">
            <div className="nav-item nav-link"><span onClick={() => props.newContent(<MainView weather={props.weather} bodies={props.bodies}/>)}>Overview</span></div>
            <div className="nav-item nav-link"><span onClick={() => props.newContent(<WaterView bodies={props.bodies} account={props.account}/>)}>Water</span></div>
            <div className="nav-item nav-link"><span onClick={() => props.newContent(<AccountView account={props.account}/>)}>Account</span></div>
            <div className="nav-item nav-link"><a href="/about">About</a></div>
            <div className="nav-item nav-link"><a href="/logout">Log Out {props.account.username}</a></div>
            <hr/>
        </div>
    );
}

