"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var final_form_1 = require("final-form");
var lodash_1 = require("lodash");
var react_1 = require("react");
var React = require("react");
var core_1 = require("../core/core");
var data_1 = require("../data");
var graphql_1 = require("../data/graphql");
exports.allFormSubscriptionItems = final_form_1.formSubscriptionItems.reduce(function (result, key) {
    result[key] = true;
    return result;
}, {});
var MODIFIERS_KEY = ['blur', 'focus'];
var Frontier = (function (_super) {
    __extends(Frontier, _super);
    function Frontier(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.mounted = false;
        _this.onSubmit = function (formValues) {
            var save = graphql_1.saveData(_this.props, formValues);
            save.then(function (data) {
                if (_this.props.onSave) {
                    _this.props.onSave(data || {});
                }
                if (_this.props.resetOnSave === true) {
                    _this.form.reset();
                }
            });
            return save;
        };
        _this.uiKitComponentFor = lodash_1.memoize(function (path, definition, required) {
            return _this.props.uiKit.__reducer(_this.mutationName + "." + path, definition.type, required);
        }, function (path, definition, _required) { return _this.mutationName + "." + path + "-" + definition.type; });
        _this.buildForm();
        return _this;
    }
    Frontier.prototype.buildForm = function () {
        var _this = this;
        data_1.schemaFromDataProps(this.props).then(function (result) {
            if (result) {
                _this.schema = result.schema;
                _this.mutationName = result.mutationName;
                _this.form = core_1.getFormFromSchema(result.schema, _this.onSubmit, _this.props.initialValues || {});
                if (_this.mounted && !_this.unsubformSubscription) {
                    _this.subscribeToForm();
                }
                else {
                    _this.form.subscribe(function (initialState) {
                        _this.state = { formState: initialState };
                    }, exports.allFormSubscriptionItems)();
                }
            }
        });
    };
    Frontier.prototype.componentDidMount = function () {
        this.mounted = true;
        if (this.form) {
            this.subscribeToForm();
        }
    };
    Frontier.prototype.subscribeToForm = function () {
        var _this = this;
        this.unsubformSubscription = this.form.subscribe(function (formState) {
            if (_this.mounted) {
                _this.setState({ formState: formState });
            }
        }, exports.allFormSubscriptionItems);
    };
    Frontier.prototype.componentWillMount = function () {
        if (this.unsubformSubscription) {
            this.unsubformSubscription();
            this.unsubformSubscription = undefined;
        }
        this.mounted = false;
    };
    Frontier.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (this.form) {
            if (!lodash_1.isEqual(this.props.initialValues, prevProps.initialValues)) {
                this.form.initialize(this.props.initialValues || {});
            }
        }
        if (!lodash_1.isEqual(this.props.mutation, prevProps.mutation)) {
            if (this.unsubformSubscription) {
                this.unsubformSubscription();
                this.unsubformSubscription = undefined;
            }
            this.setState({ formState: undefined }, function () { return _this.buildForm(); });
        }
    };
    Frontier.prototype.renderProps = function () {
        var _this = this;
        var modifiers = {};
        var kit = {};
        var fields = this.form.getRegisteredFields();
        lodash_1.each(fields, function (fieldPath) {
            lodash_1.each(MODIFIERS_KEY, function (action) {
                lodash_1.set(modifiers, fieldPath + "." + action, function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    (_a = _this.form)[action].apply(_a, [fieldPath].concat(args));
                });
            });
            lodash_1.set(modifiers, fieldPath + ".change", function (arg) {
                if (!!arg.preventDefault) {
                    _this.form.change(fieldPath, arg.currentTarget.value);
                }
                else {
                    _this.form.change(fieldPath, arg);
                }
            });
        });
        if (this.props.uiKit) {
            core_1.visitSchema(this.schema, function (path, definition, required) {
                lodash_1.set(kit, path, function (props) {
                    var state = _this.form.getFieldState(path);
                    var fieldProps = _this.getFieldProps(path);
                    var FieldComponent = _this.uiKitComponentFor(path, definition, required);
                    return React.createElement(FieldComponent, __assign({}, state, fieldProps, props));
                });
            }, this.schema.required || []);
        }
        return {
            form: this.form,
            state: this.state.formState,
            modifiers: modifiers,
            kit: kit,
        };
    };
    Frontier.prototype.renderWithKit = function () {
        var _this = this;
        var fields = {};
        core_1.visitSchema(this.schema, function (path, definition, required) {
            var state = _this.form.getFieldState(path);
            var fieldProps = _this.getFieldProps(path);
            var FieldComponent = _this.uiKitComponentFor(path, definition, required);
            fields[path] = React.createElement(FieldComponent, __assign({}, state, fieldProps, { key: path }));
        }, this.schema.required || []);
        if (this.props.order) {
            var sortedFields_1 = {};
            lodash_1.each(this.props.order, function (orderedPath) {
                sortedFields_1[orderedPath] = fields[orderedPath];
                delete fields[orderedPath];
            });
            lodash_1.each(fields, function (comp, p) {
                sortedFields_1[p] = comp;
            });
            fields = sortedFields_1;
        }
        return this.props.uiKit.__wrapWithForm(this.form, lodash_1.values(fields));
    };
    Frontier.prototype.getFieldProps = function (path) {
        if (!this.props.fieldProps) {
            return {};
        }
        return this.props.fieldProps[path] || {};
    };
    Frontier.prototype.render = function () {
        if (!this.state.formState) {
            return null;
        }
        var child = this.props.children;
        if (child) {
            if (typeof child !== 'function') {
                console.error("Warning: Must specify a render function as children, received \"" + typeof child + "\"");
                return null;
            }
            else {
                return child(this.renderProps());
            }
        }
        else if (this.props.uiKit) {
            return this.renderWithKit();
        }
        else {
            console.error("Warning: Must specify either a render function as children or give a `uiKit=` props");
            return null;
        }
    };
    return Frontier;
}(react_1.Component));
exports.Frontier = Frontier;
//# sourceMappingURL=frontier.js.map