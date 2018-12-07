'use strict';

var handleLogin = function handleLogin(e) {
    e.preventDefault();
    sendAjax('POST', $('#loginForm').attr("action"), $('#loginForm').serialize(), function (result) {
        if (result.error) window.alert(result.error);
        if (result.success) window.location.href = result.success;
    });
};

var handleSignUp = function handleSignUp(e) {
    //console.log('making user');
    e.preventDefault();

    if ($("#user").val() == '' || $("#pass").val() == '' || $('#pass2').val() == '') {
        window.alert('Oops ALL FIELDS ARE REQUIRED!!!');
        return false;
    }

    if ($('#pass').val() !== $('#pass2').val()) {
        window.alert('Darn... Your passwords dont match');
        return false;
    }

    sendAjax('POST', $('#signupForm').attr("action"), $('#signupForm').serialize(), redirect);

    return false;
};

var LoginWindow = function LoginWindow(props) {
    return React.createElement(
        'div',
        { className: 'loginWrapper container-fluid' },
        React.createElement(
            'form',
            { id: 'loginForm',
                name: 'loginForm',
                onSubmit: handleLogin,
                action: '/login',
                method: 'POST',
                className: 'mainForm'
            },
            React.createElement(
                'label',
                { htmlFor: 'username' },
                'Username:'
            ),
            React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'username' }),
            React.createElement('br', null),
            React.createElement(
                'label',
                { htmlFor: 'pass' },
                'Password:'
            ),
            React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'password' }),
            React.createElement('br', null),
            React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
            React.createElement('input', { type: 'submit', className: 'buttonPadding btn btn-primary', onClick: function onClick() {
                    createSignupWindow(props.csrf);
                }, value: 'Sign Up' }),
            React.createElement('input', { id: 'login', type: 'submit', className: 'formSubmit buttonPadding btn btn-success', value: 'Sign In' })
        ),
        React.createElement(
            'a',
            { href: '/about' },
            'See what Poolboi can do for you!'
        )
    );
};

//get basic account info
var SignUpWindow = function SignUpWindow(props) {
    return React.createElement(
        'form',
        { id: 'signupForm',
            name: 'signupForm',
            onSubmit: handleSignUp,
            action: '/signup',
            method: 'POST',
            className: 'mainForm'
        },
        React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'username' }),
        React.createElement('i', { className: 'fas fa-info-circle', title: 'This is the user name that you will login with' }),
        React.createElement('br', null),
        React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'password' }),
        React.createElement('br', null),
        React.createElement('input', { id: 'pass2', type: 'password', name: 'pass2', placeholder: 'retype password' }),
        React.createElement('br', null),
        React.createElement(
            'h4',
            { className: 'buttonPadding' },
            'Help us get to know you, so we can better help you!'
        ),
        React.createElement('input', { id: 'firstName', type: 'text', name: 'firstName', placeholder: 'first name' }),
        React.createElement('input', { id: 'lastName', type: 'text', name: 'lastName', placeholder: 'last name' }),
        React.createElement(
            'label',
            { htmlFor: 'zip' },
            'zip code'
        ),
        React.createElement('input', { type: 'number', min: '0', max: '99999', name: 'zip', placeholder: '12345' }),
        React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
        React.createElement('input', { type: 'submit', className: 'formSubmit btn buttonPadding', value: 'Create Account' }),
        React.createElement(
            'p',
            { className: 'small' },
            'Oops, I already have an account ',
            React.createElement(
                'a',
                { href: '/' },
                'take me back to the login page.'
            )
        )
    );
};

var createLoginWindow = function createLoginWindow(csrf) {
    ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector('#content'));
};

var createSignupWindow = function createSignupWindow(csrf) {
    ReactDOM.render(React.createElement(SignUpWindow, { csrf: csrf }), document.querySelector('#content'));
};

var getToken = function getToken() {

    sendAjax('GET', '/getToken', null, function (result) {
        createLoginWindow(result.csrfToken);
    });
};
//onload getToken > setup > show login view
window.onload = function () {
    getToken();
};
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $('#domoMessage').animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: function error(xhr, status, _error) {
            var msgObject = JSON.parse(xhr.responseText);
            handleError(msgObject.error);
        }
    });
};

//Convert Mongo Dbs ISO time to a readable time string
var readableDate = function readableDate(data) {
    var dateString = String(data);
    dateString = dateString.slice(0, 10);
    dateString = dateString.split("-");
    return dateString[1] + '/' + dateString[2] + '/' + dateString[0];
};
