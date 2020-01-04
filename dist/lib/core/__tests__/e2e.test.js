"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var graphql_1 = require("../../data/graphql");
var core_1 = require("../core");
describe('Frontier Core', function () {
    describe('when providing a valid `schema` and `mutation`', function () {
        it('should return a register proper fields', function () {
            var schema = require('../../../fixtures/data/tests-jsonschema.json');
            var mutation = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              id\n            }\n          }\n      "], ["\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              id\n            }\n          }\n      "])));
            var formSchema = graphql_1.buildFormSchema(schema, graphql_1.getMutationNameFromDocumentNode(mutation));
            var form = core_1.getFormFromSchema(formSchema, jest.fn(), jest.fn());
            expect(form.getRegisteredFields()).toContain('todo.name');
            expect(form.getRegisteredFields()).toContain('todo.completed');
        });
    });
    describe('when providing a valid `schema` and `mutation` with `initialValues`', function () {
        it('should return a register proper fields and set proper values', function () {
            var schema = require('../../../fixtures/data/tests-jsonschema.json');
            var mutation = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              id\n            }\n          }\n      "], ["\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              id\n            }\n          }\n      "])));
            var formSchema = graphql_1.buildFormSchema(schema, graphql_1.getMutationNameFromDocumentNode(mutation));
            var form = core_1.getFormFromSchema(formSchema, jest.fn(), {
                todo: {
                    name: 'Write tests for Frontier Core'
                }
            });
            expect(form.getRegisteredFields()).toContain('todo.name');
            expect(form.getRegisteredFields()).toContain('todo.completed');
            expect(form.getFieldState('todo.name').value).toEqual('Write tests for Frontier Core');
        });
    });
    describe('when providing a valid `schema` and `mutation` and updating a field with incorrect value', function () {
        it('should return a register proper fields and forward the update to `onFieldUpdate` argument and run validations', function () {
            var schema = require('../../../fixtures/data/tests-jsonschema.json');
            var mutation = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              id\n            }\n          }\n      "], ["\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              id\n            }\n          }\n      "])));
            var formSchema = graphql_1.buildFormSchema(schema, graphql_1.getMutationNameFromDocumentNode(mutation));
            var form = core_1.getFormFromSchema(formSchema, jest.fn(), {
                todo: {
                    name: 'My 1st todo',
                    completed: false
                }
            });
            expect(form.getRegisteredFields()).toContain('todo.name');
            expect(form.getRegisteredFields()).toContain('todo.completed');
            form.change('todo.completed', 'completed');
            expect(form.getFieldState('todo.completed')).toEqual(expect.objectContaining({
                value: 'completed',
                error: 'type',
                dirty: true,
                pristine: false,
                name: 'todo.completed'
            }));
        });
    });
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=e2e.test.js.map