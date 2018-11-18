"use strict";

var DashNav = function DashNav(props) {
    return React.createElement(
        "div",
        { className: "dashNavContainer nav justify-content-center flex-column flex-sm-row" },
        React.createElement(
            "div",
            { className: "nav-item nav-link text-primary" },
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
            { className: "nav-item nav-link text-primary" },
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
            { className: "nav-item nav-link text-primary" },
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
"use strict";

var MainView = function MainView(props) {
    //console.dir(props);
    var uvWarning = void 0; //Warn the user if the UV index is above 5
    if (props.weather.currently.uvIndex > 5) uvWarning = 'Better wear some sunscreen!';
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
        ),
        React.createElement(
            "p",
            null,
            "The current UV index is ",
            props.weather.currently.uvIndex,
            ". ",
            uvWarning
        ),
        React.createElement(
            "p",
            { className: "small" },
            "Graphs and analytical data in next update."
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
            'p',
            { className: 'small' },
            'ID:',
            props.body._id
        ),
        React.createElement('hr', null)
    );
};
"use strict";

var WaterTestView = function WaterTestView(props) {

    return React.createElement(
        "table",
        { className: "table table-striped table-responsive" },
        React.createElement(
            "h3",
            null,
            props.bodyName
        ),
        React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    { scope: "col-xs-3" },
                    "Date"
                ),
                React.createElement(
                    "th",
                    { scope: "col-xs-2" },
                    "Alkalinity"
                ),
                React.createElement(
                    "th",
                    { scope: "col-xs-1" },
                    "cAcid"
                ),
                React.createElement(
                    "th",
                    { scope: "col-xs-2" },
                    "Chlorine"
                ),
                React.createElement(
                    "th",
                    { scope: "col-xs-2" },
                    "Free Chlorine"
                ),
                React.createElement(
                    "th",
                    { scope: "col-xs-1" },
                    "Hardness"
                ),
                React.createElement(
                    "th",
                    { scope: "col-xs-1" },
                    "PH"
                )
            )
        ),
        React.createElement(
            "tbody",
            null,
            props.sample.map(function (sam) {
                console.dir(sam);
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        readableDate(sam.date)
                    ),
                    React.createElement(
                        "td",
                        null,
                        sam.alkalinity
                    ),
                    React.createElement(
                        "td",
                        null,
                        sam.cAcid
                    ),
                    React.createElement(
                        "td",
                        null,
                        sam.chlorine
                    ),
                    React.createElement(
                        "td",
                        null,
                        sam.freeChlorine
                    ),
                    React.createElement(
                        "td",
                        null,
                        sam.hardness
                    ),
                    React.createElement(
                        "td",
                        null,
                        sam.ph
                    )
                );
            })
        )
    );
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WaterView = function (_React$Component) {
    _inherits(WaterView, _React$Component);

    function WaterView(props) {
        _classCallCheck(this, WaterView);

        var _this = _possibleConstructorReturn(this, (WaterView.__proto__ || Object.getPrototypeOf(WaterView)).call(this, props));

        _this.state = {
            waterTable: React.createElement(
                'h4',
                null,
                'No Data Yet'
            ),
            allBodies: React.createElement(
                'h4',
                null,
                'No'
            )
        };
        return _this;
    }

    _createClass(WaterView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            //async call to get data takes a water body object
            var asyncGetData = function asyncGetData(item) {
                var promiseObj = new Promise(function (resolve, reject) {
                    sendAjax('GET', '/addWater', item, function (data) {
                        if (data) resolve(data);else reject({ error: 'No data was found' });
                    });
                });
                return promiseObj;
            };

            var gotWater = [];
            //fill gotWater with promises for each water bodies data
            for (var i = 0; i < this.props.bodies.length; i++) {
                gotWater.push(asyncGetData(this.props.bodies[i]));
            }

            //Waits for all water sample data to be fetched
            Promise.all(gotWater).then(function (data) {
                buildTable(data);
            });

            var buildTable = function buildTable(data) {
                var index = 0;
                var subTables = [];
                data.forEach(function (sample) {
                    var name = _this2.props.bodies[index].name;
                    index++;
                    subTables.push(React.createElement(WaterTestView, { sample: sample, bodyName: name }));
                });
                _this2.setState({ waterTable: subTables });
            };

            var allBodies = this.props.bodies.map(function (water) {
                return React.createElement(WaterBodyView, { body: water });
            });
            this.setState({ allBodies: allBodies });

            if (this.props.bodies.length === 0) {
                this.setState({ allBodies: React.createElement(
                        'h5',
                        { className: 'col-sm-8 text-center' },
                        'Lets ',
                        React.createElement(
                            'a',
                            { href: '/newWaterBody' },
                            'add'
                        ),
                        ' a pool or spa.'
                    ) });
            }
        }
    }, {
        key: 'render',
        value: function render() {
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
                        this.state.allBodies
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
                    this.state.waterTable
                )
            );
        }
    }]);

    return WaterView;
}(React.Component);
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

//Convert Mongo Dbs ISO time to a readable time string
var readableDate = function readableDate(data) {
    var dateString = String(data);
    dateString = dateString.slice(0, 10);
    dateString = dateString.split("-");
    return dateString[1] + '/' + dateString[2] + '/' + dateString[0];
};
