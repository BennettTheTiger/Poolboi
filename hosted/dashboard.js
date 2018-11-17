"use strict";

var DashNav = function DashNav(props) {
    return React.createElement(
        "div",
        { className: "dashNavContainer nav justify-content-center flex-column flex-sm-row" },
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
                        return props.newContent(React.createElement(WaterView, { bodies: props.bodies, account: props.account }));
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
                "Log Out ",
                props.account.username
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
    var readableDate = function readableDate(data) {
        var dateString = String(props.account.createdDate);
        dateString = dateString.slice(0, 10);
        dateString = dateString.split("-");
        return dateString[1] + '/' + dateString[2] + '/' + dateString[0];
    };

    var updateZip = function updateZip() {
        console.log('updateZip');
    };

    var updatePassword = function updatePassword() {
        window.location.href = '/newPassword';
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
                readableDate(props.account.createdDate)
            ),
            React.createElement(
                'p',
                null,
                'Last Sign in:',
                readableDate(props.account.lastSignedIn)
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
                { onClick: updateZip, disabled: true },
                'Change Zip'
            ),
            React.createElement(
                'button',
                { onClick: updatePassword },
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
        React.createElement(DashNav, { account: this.props.account, weather: this.props.weather, bodies: this.props.bodies, newContent: this.changeContent }),
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
  //get water bodies too  
  var waterBodies = void 0;

  ReactDOM.render(React.createElement(Dashboard, { weather: data.weather, account: data.account, bodies: data.body }), document.getElementById('dashboard'));
};

var getWaterBodies = function getWaterBodies(account, weather) {
  sendAjax('GET', '/waterBodies', null, function (bodyData) {
    var data = {};
    data.body = bodyData.bodies;
    data.weather = weather;
    data.account = account;
    init(data);
  });
};

//want to make this use take a json 
var getWeather = function getWeather(account) {
  sendAjax('GET', '/weather', null, function (weatherData) {
    getWaterBodies(account, weatherData);
  });
};

var getAccount = function getAccount() {
  sendAjax('GET', '/accountInfo', null, function (accountData) {
    getWeather(accountData);
  });
};

//get an account > get water bodies > get weather give this to the dashboard as props
window.onload = function () {
  getAccount();
};
'use strict';

var MainView = function MainView(props) {
    console.dir(props);
    var uvWarning = void 0; //Warn the user if the UV index is above 5
    if (props.weather.currently.uvIndex > 5) uvWarning = 'Better wear some sunscreen!';
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            'The current temperature is ',
            props.weather.currently.temperature
        ),
        React.createElement(
            'p',
            null,
            'Feels like ',
            props.weather.currently.apparentTemperature
        ),
        React.createElement(
            'p',
            null,
            'The current UV index is ',
            props.weather.currently.uvIndex,
            '. ',
            uvWarning
        )
    );
};
"use strict";

var PlusIcon = function PlusIcon(props) {
    return React.createElement(
        "div",
        { style: { paddingLeft: '10px' } },
        React.createElement("i", { className: "far fa-plus-square" })
    );
};
'use strict';

var WaterBodyView = function WaterBodyView(props) {
    var delteBody = function delteBody() {
        var remove = window.confirm('Are you sure you want to delete ' + props.body.name + ' \nThis will also delete all water samples for ' + props.body.name);
        if (remove) {
            console.log('delete water body id and all samples where bodyId is this one');
        }
    };

    var type = 'Pool';
    if (!props.body.isPool) type = 'Spa';

    return React.createElement(
        'div',
        { className: 'col-sm-6' },
        React.createElement(
            'p',
            null,
            'Name:',
            props.body.name
        ),
        React.createElement(
            'p',
            null,
            'Location:',
            props.body.zipCode
        ),
        React.createElement(
            'p',
            null,
            'Type:',
            type
        ),
        React.createElement(
            'p',
            null,
            'Water Health:'
        ),
        React.createElement(
            'button',
            null,
            'View History'
        ),
        React.createElement(
            'p',
            { className: 'small' },
            'ID:',
            props.body._id
        ),
        React.createElement('hr', null),
        React.createElement(
            'button',
            { onClick: delteBody },
            'Delete'
        )
    );
};
"use strict";

var WaterTestView = function WaterTestView(props) {

    return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
            "div",
            { className: "col-xs-4" },
            "Name"
        ),
        React.createElement(
            "div",
            { className: "col-xs-4" },
            "Date"
        ),
        React.createElement(
            "div",
            { className: "col-xs-4" },
            React.createElement(
                "button",
                null,
                "View Test"
            )
        )
    );
};
'use strict';

var WaterView = function WaterView(props) {
    var allData = [];

    //async call to get data takes a water body object
    var asyncGetData = function asyncGetData(item) {
        var promiseObj = new Promise(function (resolve, reject) {
            sendAjax('GET', '/addWater', item, function (data) {
                console.dir(data);
                if (data) resolve(data);else reject({ error: 'No data was found' });
            });
        });
        return promiseObj;
    };

    //loop over each water body and get data
    var getAllSamples = function getAllSamples() {
        var fetchWater = new Promise(function (resolve, reject) {
            props.bodies.forEach(function (item) {
                asyncGetData(item).then(function (dataReturned, error) {
                    console.log('done fetching water');
                    allData.push(dataReturned);
                    if (error) {
                        console.log(error);
                    }
                }).then(console.log('Done data digging'));
            }); //end for loop
            resolve();
        });
        return fetchWater;
    };

    getAllSamples().then(function () {
        console.log('Done getting sampels');
        console.dir(allData);
    });

    var allBodies = props.bodies.map(function (water) {
        return React.createElement(WaterBodyView, { body: water });
    });

    var allTests = props.bodies.map(function (sample) {});

    if (props.bodies.length === 0) {
        allBodies = React.createElement(
            'h5',
            { className: 'col-sm-8 text-center' },
            'Lets ',
            React.createElement(
                'a',
                { href: '/newWaterBody' },
                'add'
            ),
            ' a pool or spa.'
        );
    }

    //allTests = <h5 className="col-sm-8 text-center">Lets <a href="/newWaterBody">add</a> a test.</h5>
    return React.createElement(
        'div',
        null,
        React.createElement(
            'section',
            { className: 'container-fluid' },
            React.createElement(
                'h2',
                { className: 'row' },
                'My Water',
                React.createElement(
                    'a',
                    { href: '/newWaterBody' },
                    React.createElement(PlusIcon, null)
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                allBodies
            )
        ),
        React.createElement(
            'section',
            { className: 'container-fluid' },
            React.createElement(
                'h2',
                { className: 'row' },
                'Test Results',
                React.createElement(
                    'a',
                    { href: '/newWaterTest' },
                    React.createElement(PlusIcon, null)
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                allTests
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
