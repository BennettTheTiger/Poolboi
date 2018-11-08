'use strict';

var handleLogin = function handleLogin(e) {};

var handleSignUp = function handleSignUp(e) {
    console.log('making user');
    e.preventDefault();

    if ($("#user").val() == '' || $("#pass").val() == '' || $('#pass2').val() == '') {
        console.log('RAWR ALL FIELDS ARE REQUIRED!!!');
        return false;
    }

    if ($('#pass').val() !== $('#pass2').val()) {
        console.log('RAwR passwords dont match');
        return false;
    }

    sendAjax('POST', $('#signupForm').attr("action"), $('#signupForm').serialize(), redirect);

    return false;
};

var LoginWindow = function LoginWindow(props) {
    return React.createElement(
        'div',
        null,
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
            React.createElement(
                'label',
                { htmlFor: 'pass' },
                'Password:'
            ),
            React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'password' }),
            React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
            React.createElement('input', { type: 'submit', className: 'formSubmit', value: 'Sign in' })
        ),
        React.createElement(
            'a',
            { href: '/about' },
            'About'
        ),
        React.createElement('input', { type: 'submit', onClick: function onClick() {
                createSignupWindow(props.csrf);
            }, value: 'Sign Up' }),
        React.createElement(
            'span',
            { onClick: function onClick() {
                    createSignupWindow(props.csrf);
                } },
            React.createElement(
                'h4',
                null,
                'I\'m new here, Sign Me Up!'
            )
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
        React.createElement(
            'label',
            { htmlFor: 'username' },
            'Username:'
        ),
        React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'username' }),
        React.createElement('i', { className: 'fas fa-info-circle', title: 'This is the user name that you will login with' }),
        React.createElement(
            'label',
            { htmlFor: 'pass' },
            'Password:'
        ),
        React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'password' }),
        React.createElement(
            'label',
            { htmlFor: 'pass2' },
            'Retype Password:'
        ),
        React.createElement('input', { id: 'pass2', type: 'password', name: 'pass2', placeholder: 'retype password' }),
        React.createElement(
            'h4',
            null,
            'Help us get to know you, so we can better help you!'
        ),
        React.createElement(
            'label',
            { htmlFor: 'firstName' },
            'First Name:'
        ),
        React.createElement('input', { id: 'firstName', type: 'text', name: 'firstName', placeholder: 'first name' }),
        React.createElement(
            'label',
            { htmlFor: 'lastName' },
            'Last Name:'
        ),
        React.createElement('input', { id: 'lastName', type: 'text', name: 'lastName', placeholder: 'last name' }),
        React.createElement(
            'label',
            { htmlFor: 'zip' },
            'Whats your zip code'
        ),
        React.createElement('input', { type: 'number', min: '0', max: '99999', name: 'zip', placeholder: '12345' }),
        React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
        React.createElement('input', { type: 'submit', className: 'formSubmit', value: 'Sign in' }),
        React.createElement(
            'span',
            { onClick: function onClick() {
                    return createLoginWindow(props.csrf);
                } },
            React.createElement(
                'p',
                null,
                'Oops, I already have an account take me back to the login page.'
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
