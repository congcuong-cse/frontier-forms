"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var graphql_1 = require("../graphql");
describe('getMutationNameFromDocumentNode', function () {
    beforeEach(function () {
        jest.spyOn(global.console, 'warn');
    });
    afterEach(function () {
        jest.restoreAllMocks();
    });
    describe('given a invalid GraphQL query document', function () {
        it('should return an `null` and warn the developer', function () {
            var mutation = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          query getTodos {\n            getTodos {\n              id\n            }\n          }\n      "], ["\n          query getTodos {\n            getTodos {\n              id\n            }\n          }\n      "])));
            expect(graphql_1.getMutationNameFromDocumentNode(mutation)).toEqual(null);
            expect(global.console.warn).toHaveBeenCalledWith('please provide a mutation document, received a query document');
        });
    });
    describe('given a GraphQL document with an operation that define many mutations', function () {
        it('should return an `null` and warn the developer', function () {
            var mutation = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          mutation updateTodo($id: ID!, $todo: TodoInputType!) {\n            update_todo(id: $id, todo: $todo) {\n              ...Todo\n            }\n          }\n\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              ...Todo\n            }\n          }\n      "], ["\n          mutation updateTodo($id: ID!, $todo: TodoInputType!) {\n            update_todo(id: $id, todo: $todo) {\n              ...Todo\n            }\n          }\n\n          mutation createTodo($todo: TodoInputType!) {\n            create_todo(todo: $todo) {\n              ...Todo\n            }\n          }\n      "])));
            expect(graphql_1.getMutationNameFromDocumentNode(mutation)).toEqual(null);
            expect(global.console.warn).toHaveBeenCalledWith('please provide 1 mutation document');
        });
    });
    describe('given a valid GraphQL document with a mutation', function () {
        it('should return mutation\'s name', function () {
            var mutation = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        mutation createTodo($todo: TodoInputType!) {\n          create_todo(todo: $todo) {\n            ...Todo\n          }\n        }\n      "], ["\n        mutation createTodo($todo: TodoInputType!) {\n          create_todo(todo: $todo) {\n            ...Todo\n          }\n        }\n      "])));
            expect(graphql_1.getMutationNameFromDocumentNode(mutation)).toEqual('create_todo');
            expect(global.console.warn).not.toHaveBeenCalled();
        });
    });
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=getMutationNameFromDocumentNode.test.js.map