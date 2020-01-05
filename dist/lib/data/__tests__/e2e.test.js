"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var graphql_1 = require("../graphql");
describe('Frontier Data GraphQl', function () {
    describe('given a valid GraphQL mutation document', function () {
        it('should return the proper Form Schema', function (done) {
            var schema = require('../../../fixtures/data/tests-jsonschema.json');
            var mutation = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              id\n            }\n          }\n      "], ["\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              id\n            }\n          }\n      "])));
            graphql_1.schemaFromGraphQLProps({
                mutation: mutation,
                schema: schema,
                client: null
            }).then(function (result) {
                expect(result.schema).toEqual({
                    'type': 'object',
                    'properties': {
                        'todo': {
                            'type': 'object',
                            'properties': {
                                'completed': {
                                    'type': 'boolean'
                                },
                                'name': {
                                    'type': 'string'
                                }
                            },
                            'required': [
                                'name'
                            ]
                        }
                    },
                    'required': [
                        'todo'
                    ]
                });
                done();
            });
        });
    });
    describe('given a invalid GraphQL query document', function () {
        beforeEach(function () {
            jest.spyOn(global.console, 'warn');
        });
        it('should return an empty Form Schema and warn the developer', function (done) {
            var schema = require('../../../fixtures/data/tests-jsonschema.json');
            var mutation = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          query getTodos {\n            getTodos {\n              id\n            }\n          }\n      "], ["\n          query getTodos {\n            getTodos {\n              id\n            }\n          }\n      "])));
            graphql_1.schemaFromGraphQLProps({
                mutation: mutation,
                schema: schema,
                client: null,
            }).then(function (result) {
                expect(result).toEqual(null);
                expect(global.console.warn).toHaveBeenCalledWith('please provide a mutation document, received a query document');
                done();
            });
        });
    });
    describe('given a unknown GraphQL mutation document', function () {
        beforeEach(function () {
            jest.spyOn(global.console, 'warn');
        });
        it('should return an empty Form Schema and warn the developer', function (done) {
            var schema = require('../../../fixtures/data/tests-jsonschema.json');
            var mutation = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          mutation updateOrCreateTodo($todo: TodoInputType!) {\n            update_or_create_todo(todo: $todo) {\n              id\n            }\n          }\n      "], ["\n          mutation updateOrCreateTodo($todo: TodoInputType!) {\n            update_or_create_todo(todo: $todo) {\n              id\n            }\n          }\n      "])));
            graphql_1.schemaFromGraphQLProps({
                mutation: mutation,
                schema: schema,
                client: null
            }).then(function (result) {
                expect(result).toEqual({ 'mutationName': 'update_or_create_todo', 'schema': {} });
                expect(global.console.warn).toHaveBeenCalledWith('Unknown mutation update_or_create_todo provided');
                done();
            });
        });
    });
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=e2e.test.js.map