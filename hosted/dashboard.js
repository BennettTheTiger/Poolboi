"use strict";

var DashNav = function DashNav(props) {
    return React.createElement(
        "div",
        { className: "dashNavContainer nav justify-content-center flex-column flex-sm-row" },
        React.createElement(
            "div",
            { className: "nav-item nav-link" },
            "Hello ",
            props.account.username
        ),
        React.createElement(
            "div",
            { className: "nav-item nav-link" },
            React.createElement(
                "span",
                { onClick: function onClick() {
                        return props.newContent(React.createElement(MainView, { weather: props.weather }));
                    } },
                "Overview"
            )
        ),
        React.createElement(
            "div",
            { className: "nav-item nav-link" },
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
            { className: "nav-item nav-link" },
            React.createElement(
                "span",
                { onClick: function onClick() {
                        return props.newContent(React.createElement(AccountView, { account: props.account }));
                    } },
                "Account"
            )
        ),
        React.createElement(
            "div",
            { className: "nav-item nav-link" },
            React.createElement(
                "a",
                { href: "/about" },
                "About"
            )
        ),
        React.createElement(
            "div",
            { className: "nav-item nav-link" },
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

var AccountView = function AccountView(props) {

    //Convert Mongo Dbs ISO time to a readable time string
    var dateString = String(props.account.createdDate);
    dateString = dateString.slice(0, 10);
    dateString = dateString.split("-");
    var readableDate = dateString[1] + '/' + dateString[2] + '/' + dateString[0];

    var updateZip = function updateZip() {
        console.log('updateZip');
    };

    var updatePassword = function updatePassword() {
        console.log('password clicked');
    };

    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            null,
            React.createElement(
                'h4',
                null,
                'Username:',
                props.account.username
            ),
            React.createElement(
                'p',
                null,
                'First Name:',
                props.account.firstName
            ),
            React.createElement(
                'p',
                null,
                'Last Name:',
                props.account.lastName
            ),
            React.createElement(
                'p',
                null,
                'Member Since: ',
                readableDate
            ),
            React.createElement(
                'p',
                null,
                'Zip Code:',
                props.account.zip
            ),
            React.createElement(
                'p',
                null,
                'Account Id: ',
                props.account._id
            ),
            React.createElement(
                'button',
                { onClick: function onClick() {
                        return updateZip();
                    } },
                'Change Zip'
            ),
            React.createElement(
                'button',
                { onClick: function onClick() {
                        return updatePassword();
                    } },
                'Change Password'
            )
        )
    );
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
      userData: { username: 'UserName' }, //placeholder replaced on page load
      mainContent: React.createElement(MainView, { weather: props.weather })
    };

    _this.changeContent = _this.changeContent.bind(_this);

    return _this;
  }

  _createClass(Dashboard, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      //load account info
      sendAjax('GET', '/accountInfo', null, function (data) {
        _this2.setState({ userData: data });
      });
    }
  }, {
    key: 'changeContent',
    value: function changeContent(newElement) {
      this.setState({ mainContent: newElement });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container-fluid' },
        React.createElement(DashNav, { account: this.state.userData, weather: this.props.weather, newContent: this.changeContent }),
        React.createElement(
          'section',
          null,
          this.state.mainContent
        )
      );
    }
  }]);

  return Dashboard;
}(React.Component);

var init = function init(data) {
  ReactDOM.render(React.createElement(Dashboard, { weather: data }), document.getElementById('dashboard'));
};

window.onload = function () {
  sendAjax('GET', '/weather', null, function (result) {
    console.dir(result);
    init(result);
  });
};
"use strict";

var MainView = function MainView(props) {
    console.dir(props);
    return React.createElement(
        "div",
        null,
        React.createElement(
            "p",
            null,
            "The current temperature is ",
            props.weather.currently.temperature
        ),
        React.createElement(
            "p",
            null,
            "Feels like ",
            props.weather.currently.apparentTemperature
        )
    );
};
"use strict";

var PlusIcon = function PlusIcon(props) {
    return React.createElement(
        "div",
        { className: props.size },
        React.createElement("i", { className: "far fa-plus-square" })
    );
};
"use strict";

var WaterBodyView = function WaterBodyView(props) {
    var delteBody = function delteBody() {
        window.confirm('Are you sure you want to delete nameHere \n It will also delete all water samples for nameHere');
    };
    return React.createElement(
        "div",
        { className: "col-sm-4" },
        React.createElement(
            "p",
            null,
            "Name:"
        ),
        React.createElement(
            "p",
            null,
            "Location:"
        ),
        React.createElement(
            "p",
            null,
            "Type:"
        ),
        React.createElement(
            "p",
            null,
            "Water Health:"
        ),
        React.createElement(
            "p",
            null,
            "View History"
        ),
        React.createElement(
            "p",
            null,
            "ID:"
        ),
        React.createElement("hr", null),
        React.createElement(
            "button",
            { onClick: delteBody },
            "Delete"
        )
    );
};
"use strict";

var WaterView = function WaterView(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "section",
            null,
            React.createElement(
                "h2",
                null,
                "My Water"
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(WaterBodyView, null),
                React.createElement(
                    "a",
                    { href: "/newWaterBody" },
                    React.createElement(PlusIcon, { size: "col-sm-4" })
                )
            )
        ),
        React.createElement(
            "section",
            null,
            React.createElement(
                "h2",
                null,
                "Results"
            )
        )
    );
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
