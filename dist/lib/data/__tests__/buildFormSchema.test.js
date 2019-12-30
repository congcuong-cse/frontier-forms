"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var graphql_1 = require("../graphql");
describe('buildFormSchema', function () {
    beforeEach(function () {
        jest.spyOn(global.console, 'warn');
    });
    afterEach(function () {
        jest.restoreAllMocks();
    });
    describe('given a `schema` and `mutation`, with a mutation without arguments', function () {
        it('should return `{}` and warn developer', function () {
            var mutation = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          mutation {\n            update_online_status {\n              onlineStatus\n            }\n          }\n      "], ["\n          mutation {\n            update_online_status {\n              onlineStatus\n            }\n          }\n      "])));
            var schema = require('../../../fixtures/data/tests-jsonschema.json');
            expect(graphql_1.buildFormSchema(schema, graphql_1.getMutationNameFromDocumentNode(mutation))).toEqual({});
            expect(global.console.warn).toHaveBeenCalledWith('mutation update_online_status has no arguments');
        });
    });
    describe('given a `schema` and `mutation`, with a mutation that is not defined in `schema`', function () {
        it('should return `{}` and warn developer', function () {
            var mutation = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          mutation($userId: ID!) {\n            create_online_status(userId: $userId) {\n              onlineStatus\n            }\n          }\n      "], ["\n          mutation($userId: ID!) {\n            create_online_status(userId: $userId) {\n              onlineStatus\n            }\n          }\n      "])));
            var schema = require('../../../fixtures/data/tests-jsonschema.json');
            expect(graphql_1.buildFormSchema(schema, graphql_1.getMutationNameFromDocumentNode(mutation))).toEqual({});
            expect(global.console.warn).toHaveBeenCalledWith('Unknown mutation create_online_status provided');
        });
    });
    describe('given a `schema` and `mutation`, with a schema that have an unknown $ref property value', function () {
        it('should assign `{}` to property and warn developer', function () {
            var mutation = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          mutation($id: ID!, $user: UnknowRef!) {\n            unknown_ref_mutation(id: $userId, user: $user) {\n              id\n            }\n          }\n      "], ["\n          mutation($id: ID!, $user: UnknowRef!) {\n            unknown_ref_mutation(id: $userId, user: $user) {\n              id\n            }\n          }\n      "])));
            var schema = require('../../../fixtures/data/tests-invalid-ref-jsonschema.json');
            expect(graphql_1.buildFormSchema(schema, graphql_1.getMutationNameFromDocumentNode(mutation))).toEqual({
                'properties': {
                    'id': {
                        'type': 'string',
                    },
                    'user': {},
                },
                'required': [
                    'id',
                    'user',
                ],
                'type': 'object',
            });
            expect(global.console.warn).toHaveBeenCalledWith('unknown $ref "UnknowRef" for user');
        });
    });
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=buildFormSchema.test.js.map