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
