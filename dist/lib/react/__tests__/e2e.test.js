"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var graphql_tag_1 = require("graphql-tag");
var React = require("react");
require("../../../setupTests");
var frontier_1 = require("../frontier");
describe('<Frontier> usage with render props', function () {
    var schema = require('../../../fixtures/data/tests-jsonschema.json');
    var mutation = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      mutation createTodo($todo: TodoInputType!) {\n        create_todo(todo: $todo) {\n          id\n        }\n      }\n  "], ["\n      mutation createTodo($todo: TodoInputType!) {\n        create_todo(todo: $todo) {\n          id\n        }\n      }\n  "])));
    var wrapper = enzyme_1.shallow(React.createElement(frontier_1.Frontier, { mutation: mutation, schema: schema, client: null, initialValues: { todo: { name: 'Todo 1' } } }, function (_a) {
        var state = _a.state, modifiers = _a.modifiers, form = _a.form;
        return (React.createElement("form", null,
            React.createElement("h2", null, "Create a todo"),
            form.getState().errors && React.createElement("div", null, form.getState().errors),
            React.createElement("p", null,
                React.createElement("label", { htmlFor: "name" }, "Name*"),
                " ",
                React.createElement("br", null),
                React.createElement("input", { type: "text", name: "name", value: state.values.todo.name })),
            React.createElement("p", null,
                React.createElement("input", { type: "submit", value: "Save" }))));
    }));
    it.todo('should set-up the fields with proper values');
    it.todo('should set-up the display proper errors');
});
var templateObject_1;
//# sourceMappingURL=e2e.test.js.map