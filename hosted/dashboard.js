"use strict";

var DashNav = function DashNav(props) {
    return React.createElement(
        "div",
        { className: "dashNavContainer" },
        React.createElement(
            "div",
            { className: "navItem" },
            React.createElement(
                "span",
                { onClick: function onClick() {
                        return props.newContent(React.createElement(MainView, null));
                    } },
                "Overview"
            )
        ),
        React.createElement(
            "div",
            { className: "navItem" },
            React.createElement(
                "span",
                { onClick: function onClick() {
                        return props.newContent(React.createElement(WaterView, null));
                    } },
                "Water"
            )
        ),
        React.createElement(
            "div",
            { className: "navItem" },
            React.createElement(
                "span",
                { onClick: function onClick() {
                        return props.newContent(React.createElement(AccountView, null));
                    } },
                "Account"
            )
        ),
        React.createElement(
            "div",
            { className: "navItem" },
            React.createElement(
                "a",
                { href: "/about" },
                "About"
            )
        ),
        React.createElement(
            "div",
            { className: "navItem" },
            React.createElement(
                "a",
                { href: "/logout" },
                "Log Out"
            )
        ),
        React.createElement("hr", null)
    );
};
/*
const createDashNav = (csrf) => {
    ReactDOM.render(
        <DashNav csrf = {csrf}/>, document.querySelector('#dashNav')
    );
};
*/
var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        createDashNav(result.csrfToken);
    });
};
/*
onload getToken > setup > show login view
window.onload = () =>{
    //getToken();
    createDashNav('fake');
}
*/
'use strict';

var AccountView = function AccountView() {
    return React.createElement(
        'div',
        null,
        'Here is your Account view'
    );
};

var CreateAccountView = function CreateAccountView() {
    ReactDOM.render(React.createElement(AccountView, null), document.querySelector('#dashboardContent'));
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dashboard = function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));

    _this.state = {
      name: 'Username',
      mainContent: React.createElement(AccountView, null)
    };
    _this.changeContent = _this.changeContent.bind(_this);

    return _this;
  }

  _createClass(Dashboard, [{
    key: 'changeContent',
    value: function changeContent(newElement) {
      this.setState({ mainContent: newElement });
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Hello ',
          this.state.name
        ),
        React.createElement(DashNav, { csrf: 'test', newContent: this.changeContent }),
        this.state.mainContent
      );
    }
  }]);

  return Dashboard;
}(React.Component);

var init = function init() {
  ReactDOM.render(React.createElement(Dashboard, null), document.getElementById('dashboard'));
};

window.onload = init;
'use strict';

var MainView = function MainView() {
    return React.createElement(
        'div',
        null,
        'Here is your overview content'
    );
};

var CreateMainView = function CreateMainView() {
    ReactDOM.render(React.createElement(MainView, null), document.querySelector('#dashboardContent'));
};
'use strict';

var WaterView = function WaterView() {
    return React.createElement(
        'div',
        null,
        'Here is your water history'
    );
};

var CreateWaterView = function CreateWaterView() {
    ReactDOM.render(React.createElement(WaterView, null), document.querySelector('#dashboardContent'));
};
"use strict";
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
