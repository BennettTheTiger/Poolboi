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

        _this.state = {
            hardness: 500,
            chlorine: 5,
            freeChlorine: 5,
            ph: 7.3,
            alkalinity: 120,
            cAcid: 150,
            csrf: 'default'
        };
        _this.FormChange = _this.FormChange.bind(_this);
        return _this;
    }

    //when child sliders change they update the state and rerender


    _createClass(AddBody, [{
        key: 'FormChange',
        value: function FormChange(e) {
            var name = e.currentTarget.attributes.name.value;
            var data = new Object();
            data[name] = e.target.value;
            this.setState(data);
        }
    }, {
        key: 'SubmitData',

        //submits the water sample
        value: function SubmitData(e) {
            e.preventDefault();
            console.log($('form').serialize());

            sendAjax('POST', '/addWater', $('form').serialize(), function (result) {
                console.dir(result);
                window.location.href = '/dashboard';
            });
        }
    }, {
        key: 'ClearData',


        //reloads the page if users want to clear the form
        value: function ClearData(e) {
            if (!window.confirm('Are you sure you want to CLEAR this data?')) e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            //make a bunch of list options from the accounts bodies of water
            var allOptions = this.props.options.map(function (body) {
                return React.createElement(
                    'option',
                    { value: body._id },
                    body.name
                );
            });
            //pool test strip gradient array passed to water sliders
            var gradient = ['-webkit-linear-gradient(left, #062193 0%,#2d3cac 26%,#4a33a0 50%,#79328e 72%,#79328e 100%)', '-webkit-linear-gradient(left, #fdfeaf 0%,#fdfeaf 20%,#b8d78d 50%,#91c378 72%,#3bab5b 100%)', '-webkit-linear-gradient(left, #fdfeaf 0%,#79328e 100%)', '-webkit-linear-gradient(left, #FAAE2A 0%,#D80823 100%)', '-webkit-linear-gradient(left, #E1C32F 0%,#1F525B 100%)', '-webkit-linear-gradient(left, #E38223 0%,#79328e 100%)'];
            return React.createElement(
                'div',
                { className: 'container-fluid', style: { padding: '20px', position: 'relative' } },
                React.createElement(
                    'h2',
                    { className: 'text-center', id: 'title' },
                    'Add Water Test Results'
                ),
                React.createElement(
                    'form',
                    { id: 'waterResult' },
                    React.createElement(
                        'div',
                        { className: 'form-group sliderTitle' },
                        React.createElement(
                            'label',
                            { 'for': 'type' },
                            'Water Body:'
                        ),
                        React.createElement(
                            'select',
                            { name: 'body', className: 'form-control', id: 'type' },
                            allOptions
                        )
                    ),
                    React.createElement(WaterSlider, { title: 'Hardness', min: '0', max: '1000', step: '1', 'default': this.state.hardness, dataId: 'hardness', updateParent: this.FormChange, gradient: gradient[0] }),
                    React.createElement(WaterSlider, { title: 'Chlorine', min: '0', max: '10', step: '.1', 'default': this.state.chlorine, dataId: 'chlorine', updateParent: this.FormChange, gradient: gradient[1] }),
                    React.createElement(WaterSlider, { title: 'Free Chlorine', min: '0', max: '10', step: '.1', 'default': this.state.freeChlorine, dataId: 'freeChlorine', updateParent: this.FormChange, gradient: gradient[2] }),
                    React.createElement(WaterSlider, { title: 'PH', min: '6.2', max: '8.4', step: '.01', 'default': this.state.ph, dataId: 'ph', updateParent: this.FormChange, gradient: gradient[3] }),
                    React.createElement(WaterSlider, { title: 'Alkalinity', min: '0', max: '240', step: '1', 'default': this.state.alkalinity, dataId: 'alkalinity', updateParent: this.FormChange, gradient: gradient[4] }),
                    React.createElement(WaterSlider, { title: 'C Acid', min: '0', max: '300', step: '1', 'default': this.state.cAcid, dataId: 'cAcid', updateParent: this.FormChange, gradient: gradient[5] }),
                    React.createElement('input', { id: 'csrfToken', type: 'hidden', name: '_csrf', value: this.props.csrf }),
                    React.createElement(
                        'div',
                        { className: 'form-group sliderTitle' },
                        React.createElement(
                            'label',
                            { 'for': 'notes' },
                            'Notes:'
                        ),
                        React.createElement('textarea', { name: 'notes', className: 'form-control', id: 'notes', rows: '3', placeholder: 'Add Notes Here' })
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.ClearData, className: 'btn btn-danger' },
                        'Clear'
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.SubmitData, className: 'float-right btn-primary btn' },
                        'Save Test Results'
                    )
                )
            );
        }
    }]);

    return AddBody;
}(React.Component);

;

var buildPage = function buildPage(water, token) {

    ReactDOM.render(React.createElement(AddBody, { options: water, csrf: token }), document.getElementById('addWater'));
};

var getToken = function getToken(water) {
    sendAjax('GET', '/getToken', null, function (result) {
        buildPage(water, result.csrfToken);
    });
};

// Get water bodies for the form > get a token > make the component
window.onload = function () {
    $.getJSON("/waterBodies", function (data) {
        if (data.bodies.length > 0) getToken(data.bodies);else {
            window.location.href = '/error';
        }
    });
};
"use strict";

var WaterSlider = function WaterSlider(props) {

    return React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
            "label",
            { "for": "waterName", className: "sliderTitle" },
            props.title,
            ":",
            props.default
        ),
        React.createElement("input", { type: "range",
            min: props.min,
            max: props.max,
            step: props.step,
            className: "form-control",
            onChange: props.updateParent,
            defaultValue: props.default,
            name: props.dataId,
            style: { background: props.gradient, '-webkit-appearance': 'none', height: '25px', outline: 'none' }
        })
    );
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
