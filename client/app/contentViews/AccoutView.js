
const AccountView = (props) => {

    //Convert Mongo Dbs ISO time to a readable time string
    const readableDate = (data) => {
    let dateString = String(props.account.createdDate);
    dateString = dateString.slice(0,10);
    dateString = dateString.split("-");
    return (dateString[1] + '/' + dateString[2] + '/' + dateString[0]);
    }

    const updateZip = () =>{
        console.log('updateZip');
    }

    const updatePassword = () => {
        window.location.href = '/newPassword';
    }

    return(
        <div>
            <div>
                <h4>Username:{props.account.username}</h4>
                <p>First Name:{props.account.firstName}</p>
                <p>Last Name:{props.account.lastName}</p>
                <p>Member Since: {readableDate(props.account.createdDate)}</p>
                <p>Last Sign in:{readableDate(props.account.lastSignedIn)}</p>
                <p>Zip Code:{props.account.zip}</p>
                <p>Account Id: {props.account._id}</p>
                <button onClick={updateZip} disabled>Change Zip</button>
                <button onClick={updatePassword}>Change Password</button>
            </div>
        </div>
    );
}
