const handleLogin = (e) =>{

}

const handleSignUp = (e) =>{
    console.log('making user');
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val() == '' || $('#pass2').val() == ''){
        console.log('RAWR ALL FIELDS ARE REQUIRED!!!');
        return false;
    }

    if($('#pass').val() !== $('#pass2').val()){
        console.log('RAwR passwords dont match');
        return false;
    }

    sendAjax('POST',$('#signupForm').attr("action"),$('#signupForm').serialize(), redirect);

    return false;
}



const LoginWindow = (props) => {
    return (
        <div className="loginWrapper container-fluid">
        <form id="loginForm"
            name="loginForm"
            onSubmit = {handleLogin}
            action="/login"
            method="POST"
            className = 'mainForm'
            >
            <label htmlFor="username">Username:</label>
            <input id="user" type="text" name="username" placeholder="username"></input><br/>
            <label htmlFor="pass">Password:</label>
            <input id="pass" type="password" name="pass" placeholder="password"></input><br/>
            
            <input type="hidden" name="_csrf" value={props.csrf}></input>
            <input type="submit" className="buttonPadding" onClick={()=>{createSignupWindow((props.csrf))}} value="Sign Up"></input>
            <input type="submit" className="formSubmit buttonPadding" value="Sign in"></input>

        </form>
        
        <a href="/about">See what Poolboi can do for you!</a>
        
        </div>
    );

};

//get basic account info
const SignUpWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit = {handleSignUp}
            action="/signup"
            method="POST"
            className = 'mainForm'
            >
            
            <input id="user" type="text" name="username" placeholder="username"></input><i className="fas fa-info-circle" title="This is the user name that you will login with"></i>
           
            <input id="pass" type="password" name="pass" placeholder="password"></input>
            
            <input id="pass2" type="password" name="pass2" placeholder="retype password"></input>
            
            <h4 className="buttonPadding">Help us get to know you, so we can better help you!</h4>
            
            <input id="firstName" type="text" name="firstName" placeholder="first name"></input>
            <input id="lastName" type="text" name="lastName" placeholder="last name"></input>
            <label htmlFor="zip">Whats your zip code</label>
            <input type="number" min="0" max="99999" name="zip" placeholder="12345"/>
            
            <input type="hidden" name="_csrf" value={props.csrf}></input>

            <input type="submit" className="formSubmit buttonPadding" value="Create Account"></input>

            <p className="small" >Oops, I already have an account <a href="/">take me back to the login page.</a></p>
        </form>
    );

};


const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf = {csrf}/>, document.querySelector('#content')
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignUpWindow csrf = {csrf}/>, document.querySelector('#content')
    );
};


const getToken = () =>{
    
    sendAjax('GET','/getToken',null, (result) =>{
        createLoginWindow(result.csrfToken);
    });
}
//onload getToken > setup > show login view
window.onload = () =>{
    getToken();
    
}