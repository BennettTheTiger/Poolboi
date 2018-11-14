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
            water: 'Pool',
            isCirlce: true,
            shape: React.createElement(this.CircleForm, null)
        };
        _this.makeWaterBody = _this.makeWaterBody.bind(_this);
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
                React.createElement("input", { type: "number", name: "diameter", min: "0", max: "100", id: "diameter" }),
                React.createElement(
                    "label",
                    { "for": "depth" },
                    "Depth:"
                ),
                React.createElement("input", { type: "number", name: "depth", max: "50", min: "0", id: "depth" }),
                React.createElement(
                    "label",
                    null,
                    "In feet"
                )
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
                React.createElement("input", { type: "number", name: "width", min: "0", max: "1000", id: "width" }),
                React.createElement(
                    "label",
                    { "for": "length" },
                    "Length:"
                ),
                React.createElement("input", { type: "number", name: "length", max: "1000", min: "0", id: "length" }),
                React.createElement(
                    "label",
                    { "for": "depth" },
                    "Avg Depth:"
                ),
                React.createElement("input", { type: "number", name: "depth", max: "100", min: "0", id: "depth" })
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

        //calculate area in ft squared and volume gallons for cicle and square pools

    }, {
        key: "calcArea",
        value: function calcArea() {
            if (document.querySelector('#type').value === 'circle') {
                var rad = $('#diameter').val() / 2;
                //diameter error out
                if (rad == "") {
                    window.alert('Please enter a diameter');
                    $('#diameter').focus();
                    return false;
                }
                var depth = $('#depth').val();
                //rad error out
                if (depth == "") {
                    window.alert('Please enter a radius');
                    $('#depth').focus();
                    return false;
                }
                var area = Math.round(Math.PI * (rad * rad));
                var volume = area * depth;
                volume = Math.ceil(volume * 7.48052); //convert ft3 to gallons
                return { area: area, volume: volume };
            } else {
                //validate inputs
                if ($('#width').val() == "") {
                    window.alert('Please enter a width');
                    $('#width').focus();
                    return false;
                }
                if ($('#length').val() == "") {
                    window.alert('Please enter a length');
                    $('#length').focus();
                    return false;
                }
                if ($('#depth').val() == "") {
                    window.alert('Please enter a depth');
                    $('#depth').focus();
                    return false;
                }
                //do calcs
                var _area = $('#width').val() * $('#length').val();
                var _volume = Math.round(_area * $('#depth').val());
                _volume = Math.ceil(_volume * 7.48052); //convert ft3 to gallons
                console.log('area:' + _area, 'volume:' + _volume);
                return { area: _area, volume: _volume };
            }
        }
    }, {
        key: "makeWaterBody",
        value: function makeWaterBody(e) {
            e.preventDefault();
            //get form values as a json object
            var clientData = {};
            clientData.isPool = $('#waterType').val();
            clientData.name = $('#waterName').val();
            clientData.zip = $('#zipCode').val();
            clientData.notes = $('#bodyNotes').val();
            clientData.inSun = $('#sun').is(':checked');
            clientData.owner = this.props.user._id;
            clientData._csrf = this.props.csrf;
            //validate data
            if (clientData.name == "") {
                window.alert('Please give your ' + this.state.water + ' a name.');
                $('#waterName').focus();
                return;
            }

            var fluidData = this.calcArea();
            if (fluidData === false) {
                window.alert('Please check your ' + this.state.water + 's size values.');
                return; //if a field was not in fluid data abort submiting 
            }
            clientData.gallons = fluidData.volume;
            clientData.area = fluidData.area;
            console.log(JSON.stringify(clientData));
            //make the ajax post    
            sendAjax('POST', '/addWaterBody', JSON.stringify(clientData), function () {});
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
                    { id: "waterBody",
                        onSubmit: this.makeWaterBody,
                        name: "waterBodyForm",
                        action: "/newBody",
                        method: "POST",
                        className: "waterBodyForm"
                    },
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
                            { className: "form-control", id: "waterType", onChange: function onChange(e) {
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
                        React.createElement("input", { className: "form-control", type: "text", id: "waterName", defaultValue: this.props.user.username + 's-' + this.state.water })
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { "for": "zipCode" },
                            "Water zip code:"
                        ),
                        React.createElement("input", { className: "form-control", type: "number", min: "0", max: "99999", id: "zipCode", defaultValue: this.props.user.zip })
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
                            { "for": "covered" },
                            "Is the the ",
                            this.state.water,
                            " exposed to direct sun?"
                        ),
                        React.createElement("input", { className: "form-control", type: "checkbox", name: "covered", id: "sun", defaultValue: "false" })
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { "for": "notes" },
                            "Notes:"
                        ),
                        React.createElement("textarea", { className: "form-control", id: "bodyNotes", rows: "3", defaultValue: "" })
                    ),
                    React.createElement("input", { id: "csrfToken", type: "hidden", name: "_csrf", value: this.props.csrf }),
                    React.createElement("input", { type: "submit", value: 'Add New ' + this.state.water })
                )
            );
        }
    }]);

    return AddBody;
}(React.Component);

;

var createPage = function createPage(token, user) {
    ReactDOM.render(React.createElement(AddBody, { csrf: token, user: user }), document.getElementById('newWaterBody'));
};

var getAccount = function getAccount(token) {
    sendAjax('GET', '/accountInfo', null, function (result) {
        createPage(token, result);
    });
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        getAccount(result.csrfToken);
    });
};
//get token > get account > pass as props in createPage
window.onload = getToken;
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
