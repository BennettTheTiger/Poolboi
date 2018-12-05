
const AccountView = (props) => {

    const updateZip = () =>{
        console.log('updateZip');
    }

    const updatePassword = () => {
        window.location.href = '/newPassword';
    }

    return(
        <div className="container-fluid row">
            <div className="col-sm-6">
                <h4>Username:{props.account.username}</h4>
                <p>First Name:{props.account.firstName}</p>
                <p>Last Name:{props.account.lastName}</p>
                <p>Zip Code:{props.account.zip}</p>
                <p>Account Id: {props.account._id}</p>
            </div>
            <div className="col-sm-6">
                <p>Member Since: {readableDate(props.account.createdDate)}</p>
                <p>Last Sign in:{readableDate(props.account.lastSignedIn)}</p> 
                <button onClick={updateZip} disabled className="btn btn-warning disabled">Change Zip</button><br/>
                <button onClick={updatePassword} className="btn btn-warning">Change Password</button>
            </div>
        </div>
    );
}
