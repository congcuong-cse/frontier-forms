"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var graphql_1 = require("../graphql");
describe('schemaFromGraphQLProps', function () {
    beforeEach(function () {
        jest.spyOn(global.console, 'warn');
    });
    afterEach(function () {
        jest.restoreAllMocks();
    });
    describe('given a invalid GraphQL props', function () {
        it('should return an `null`', function (done) {
            var props = {};
            graphql_1.schemaFromGraphQLProps(props).then(function (schema) {
                expect(schema).toEqual(null);
                done();
            });
        });
    });
    describe('given a `schema` and `mutation` GraphQL props', function () {
        it('should return a valid From Schema', function (done) {
            var props = {
                mutation: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              id\n            }\n          }\n      "], ["\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              id\n            }\n          }\n      "]))),
                schema: require('../../../fixtures/data/tests-jsonschema.json'),
                client: null,
            };
            graphql_1.schemaFromGraphQLProps(props).then(function (result) {
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
});
var templateObject_1;
//# sourceMappingURL=schemaFromGraphQLProps.test.js.map