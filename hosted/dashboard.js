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
                        return props.newContent(React.createElement(MainView, null));
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
      mainContent: React.createElement(MainView, null)
    };

    _this.changeContent = _this.changeContent.bind(_this);

    return _this;
  }

  _createClass(Dashboard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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
        React.createElement(DashNav, { csrf: 'test', account: this.state.userData, newContent: this.changeContent }),
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
        'Here is your overview '
    );
};

var CreateMainView = function CreateMainView() {
    ReactDOM.render(React.createElement(MainView, null), document.querySelector('#dashboardContent'));
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

var WaterBodyView = function WaterBodyView() {
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
            null,
            "Edit"
        ),
        React.createElement(
            "button",
            null,
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
                React.createElement(WaterBodyView, null),
                React.createElement(WaterBodyView, null),
                React.createElement(PlusIcon, { size: "col-sm-4" })
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddBody = function (_React$Component) {
    _inherits(AddBody, _React$Component);

    function AddBody(props) {
        _classCallCheck(this, AddBody);

        var _this = _possibleConstructorReturn(this, (AddBody.__proto__ || Object.getPrototypeOf(AddBody)).call(this, props));

        _this.state = {
            water: 'pool',
            isCirlce: true,
            shape: React.createElement(this.CircleForm, null)
        };

        return _this;
    }
    //form for circle shaped water bodies


    _createClass(AddBody, [{
        key: "CircleForm",
        value: function CircleForm() {
            return React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "diameter" },
                    "Diameter:"
                ),
                React.createElement("input", { type: "number", name: "diameter", min: "0", max: "100" }),
                React.createElement(
                    "label",
                    { "for": "depth" },
                    "Depth:"
                ),
                React.createElement("input", { type: "number", name: "depth", max: "50", min: "0" })
            );
        }
    }, {
        key: "RectForm",

        //form for rect shape water bodies
        value: function RectForm() {
            return React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "width" },
                    "Width:"
                ),
                React.createElement("input", { type: "number", name: "width", min: "0", max: "1000" }),
                React.createElement(
                    "label",
                    { "for": "length" },
                    "Length:"
                ),
                React.createElement("input", { type: "number", name: "length", max: "50", min: "0" }),
                React.createElement(
                    "label",
                    { "for": "depth" },
                    "Avg Depth:"
                ),
                React.createElement("input", { type: "number", name: "depth", max: "50", min: "0" })
            );
        }
    }, {
        key: "changeType",


        //makes form text dynamic for pool or spa NOTE false is a string not a bool
        value: function changeType(e) {
            if (e.target.value === 'false') this.setState({ water: 'Spa' });else this.setState({ water: 'Pool' });
        }
    }, {
        key: "changeShape",
        value: function changeShape(shape) {
            shape = shape.target.value;
            if (shape === 'circle') this.setState({ shape: React.createElement(this.CircleForm, null) });
            if (shape === 'rect') this.setState({ shape: React.createElement(this.RectForm, null) });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "container-fluid" },
                React.createElement(
                    "h2",
                    null,
                    "Add a new body of water"
                ),
                React.createElement(
                    "form",
                    null,
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { "for": "type" },
                            "Water Type:"
                        ),
                        React.createElement(
                            "select",
                            { className: "form-control", id: "type", onChange: function onChange(e) {
                                    return _this2.changeType(e);
                                } },
                            React.createElement(
                                "option",
                                { selected: true, value: "true" },
                                "Pool"
                            ),
                            React.createElement(
                                "option",
                                { value: "false" },
                                "Spa"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { "for": "waterName" },
                            "Name:"
                        ),
                        React.createElement("input", { className: "form-control", type: "text", id: "waterName" })
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { "for": "zipCode" },
                            "Water zip code:"
                        ),
                        React.createElement("input", { className: "form-control", type: "number", min: "0", max: "99999", id: "zipCode" })
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { "for": "shape" },
                            "Shape:"
                        ),
                        React.createElement(
                            "select",
                            { className: "form-control", id: "type", onChange: function onChange(e) {
                                    return _this2.changeShape(e);
                                } },
                            React.createElement(
                                "option",
                                { selected: true, value: "circle" },
                                "Circle"
                            ),
                            React.createElement(
                                "option",
                                { value: "rect" },
                                "Rectangle"
                            )
                        )
                    ),
                    this.state.shape,
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { "for": "gallons" },
                            "# of Gallons:"
                        ),
                        React.createElement("input", { className: "form-control", type: "number", min: "0", max: "200000", id: "gallons" })
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { "for": "covered" },
                            "Is the the ",
                            this.state.water,
                            " exposed to direct sun?"
                        ),
                        React.createElement("input", { className: "form-control", id: "notes", type: "checkbox", name: "covered" })
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { "for": "notes" },
                            "Notes:"
                        ),
                        React.createElement("textarea", { className: "form-control", id: "notes", rows: "3" })
                    ),
                    React.createElement(
                        "button",
                        null,
                        "Add New ",
                        this.state.water
                    )
                )
            );
        }
    }]);

    return AddBody;
}(React.Component);

;

var init = function init() {
    ReactDOM.render(React.createElement(AddBody, null), document.getElementById('newWaterBody'));
};

window.onload = init;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddBody = function (_React$Component) {
    _inherits(AddBody, _React$Component);

    function AddBody(props) {
        _classCallCheck(this, AddBody);

        var _this = _possibleConstructorReturn(this, (AddBody.__proto__ || Object.getPrototypeOf(AddBody)).call(this, props));

        _this.state = {};

        return _this;
    }

    _createClass(AddBody, [{
        key: 'ComponentDidMount',
        value: function ComponentDidMount() {
            console.log('component loaded');
        }
    }, {
        key: 'GetWaterBodies',
        value: function GetWaterBodies() {
            console.log('Getting water bodies');
            //Get Water bodies so we know what water to the test was on
        }
    }, {
        key: 'SubmitData',
        value: function SubmitData() {
            console.log('adding water test data');
        }

        //reloads the page if they want to clear the data

    }, {
        key: 'ClearData',
        value: function ClearData(e) {
            if (!window.confirm('Are you sure you want to CLEAR this data?')) e.preventDefault();
        }

        //makes form text dynamic for pool or spa NOTE false is a string not a bool

    }, {
        key: 'changeType',
        value: function changeType(e) {
            if (e.target.value === 'false') this.setState({ water: 'Spa' });else this.setState({ water: 'Pool' });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { className: 'container-fluid' },
                React.createElement(
                    'h2',
                    null,
                    'Add Water Test Results'
                ),
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { 'for': 'type' },
                            'Water Type:'
                        ),
                        React.createElement(
                            'select',
                            { className: 'form-control', id: 'type', onChange: function onChange(e) {
                                    return _this2.changeType(e);
                                } },
                            React.createElement(
                                'option',
                                { selected: true, value: 'true' },
                                'Pool'
                            ),
                            React.createElement(
                                'option',
                                { value: 'false' },
                                'Spa'
                            )
                        )
                    ),
                    React.createElement(WaterSlider, { name: 'Hardness', min: '0', max: '1000', step: '1', 'default': '500' }),
                    React.createElement(WaterSlider, { name: 'Chlorine', min: '0', max: '10', step: '.1', 'default': '5' }),
                    React.createElement(WaterSlider, { name: 'Free Chlorine', min: '0', max: '10', step: '.1', 'default': '5' }),
                    React.createElement(WaterSlider, { name: 'PH', min: '6.2', max: '8.4', step: '.1', 'default': '7.3' }),
                    React.createElement(WaterSlider, { name: 'Alkalinity', min: '0', max: '240', step: '1', 'default': '120' }),
                    React.createElement(WaterSlider, { name: 'C Acid', min: '0', max: '300', step: '1', 'default': '150' }),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { 'for': 'notes' },
                            'Notes:'
                        ),
                        React.createElement('textarea', { className: 'form-control', id: 'notes', rows: '3' })
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return _this2.ClearData(e);
                            } },
                        'Clear Test Results'
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return _this2.SubmitData(e);
                            } },
                        'Save Test Results'
                    )
                )
            );
        }
    }]);

    return AddBody;
}(React.Component);

;

var init = function init() {
    ReactDOM.render(React.createElement(AddBody, null), document.getElementById('addWater'));
};

window.onload = init;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WaterSlider = function (_React$Component) {
    _inherits(WaterSlider, _React$Component);

    function WaterSlider(props) {
        _classCallCheck(this, WaterSlider);

        var _this = _possibleConstructorReturn(this, (WaterSlider.__proto__ || Object.getPrototypeOf(WaterSlider)).call(this, props));

        _this.state = {
            value: _this.props.default
        };

        _this.updateData = _this.updateData.bind(_this);
        return _this;
    }

    _createClass(WaterSlider, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "updateData",
        value: function updateData(event) {
            this.setState({ value: event.target.value });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { "for": "waterName" },
                    this.props.name,
                    ":",
                    this.state.value
                ),
                React.createElement("input", { type: "range",
                    min: this.props.min,
                    max: this.props.max,
                    step: this.props.step,
                    className: "form-control",
                    onChange: this.updateData,
                    defaultValue: this.props.default
                })
            );
        }
    }]);

    return WaterSlider;
}(React.Component);
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
