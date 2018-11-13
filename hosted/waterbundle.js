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
