"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_2_json_schema_1 = require("graphql-2-json-schema");
var lodash_1 = require("lodash");
var introspectionQuery_1 = require("./introspectionQuery");
function schemaFromGraphQLProps(props) {
    if (props.mutation) {
        var mutationName_1 = getMutationNameFromDocumentNode(props.mutation);
        if (!mutationName_1) {
            return Promise.resolve(null);
        }
        if (props.schema) {
            return Promise.resolve({
                schema: schemaWithFormats(buildFormSchema(props.schema, mutationName_1), props.formats || {}),
                mutationName: mutationName_1
            });
        }
        else if (props.client) {
            return props.client.query({ query: introspectionQuery_1.introspectionQuery }).then(function (result) {
                if (result.errors) {
                    console.log("Unable to fetch GraphQL schema: " + result.errors);
                    return null;
                }
                else {
                    var schema = graphql_2_json_schema_1.fromIntrospectionQuery(result.data);
                    schema.$schema = 'http://json-schema.org/draft-07/schema#';
                    return {
                        schema: schemaWithFormats(buildFormSchema(schema, mutationName_1), props.formats || {}),
                        mutationName: mutationName_1
                    };
                }
            });
        }
        else {
            return Promise.resolve(null);
        }
    }
    else {
        return Promise.resolve(null);
    }
}
exports.schemaFromGraphQLProps = schemaFromGraphQLProps;
function schemaWithFormats(schema, formats) {
    var newSchema = lodash_1.cloneDeep(schema);
    lodash_1.map(formats, function (format, path) {
        var name = path.replace(/\./g, '.properties.');
        lodash_1.set(newSchema.properties, name, lodash_1.merge(lodash_1.get(newSchema.properties, name), { format: format }));
    });
    return newSchema;
}
function saveData(props, values) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(!props.client && props.mutation)) return [3, 1];
                    console.log('Trying to save data with a mutation without providing an ApolloClient!');
                    return [2, Promise.reject({})];
                case 1:
                    if (!(!props.mutation && props.save)) return [3, 2];
                    return [2, props.save(values)];
                case 2: return [4, props.client.mutate({
                        mutation: props.mutation,
                        variables: values
                    })];
                case 3:
                    result = _a.sent();
                    if (result.errors) {
                        throw result.errors;
                    }
                    else {
                        return [2, result.data];
                    }
                    _a.label = 4;
                case 4: return [2];
            }
        });
    });
}
exports.saveData = saveData;
function getMutationNameFromDocumentNode(mutation) {
    if (mutation.definitions.length > 1) {
        console.warn('please provide 1 mutation document');
        return null;
    }
    else {
        var definition = mutation.definitions[0];
        if (definition.kind === 'OperationDefinition' && definition.operation === 'mutation') {
            if (definition.selectionSet.selections.length === 1 && definition.selectionSet.selections[0].kind === 'Field') {
                var selection = definition.selectionSet.selections[0];
                if (!selection.name) {
                    console.warn('please provide a named mutation');
                    return null;
                }
                else {
                    return selection.name.value;
                }
            }
            else {
                console.warn("please provide a valid mutation definition");
                return null;
            }
        }
        else {
            console.warn('please provide a mutation document, received a ' +
                (definition.kind === 'OperationDefinition' ? definition.operation : definition.kind) +
                ' document');
            return null;
        }
    }
}
exports.getMutationNameFromDocumentNode = getMutationNameFromDocumentNode;
function buildFormSchema(schema, mutationName) {
    var mutationSchema = schema.properties.Mutation.properties[mutationName];
    if (!mutationSchema) {
        console.warn("Unknown mutation " + mutationName + " provided");
        return {};
    }
    var args = mutationSchema.properties.arguments;
    if (args && args.properties && Object.keys(args.properties).length > 0) {
        return formPropertiesReducer(args, schema);
    }
    else {
        console.warn("mutation " + mutationName + " has no arguments");
        return {};
    }
}
exports.buildFormSchema = buildFormSchema;
function formPropertiesReducer(schema, referenceSchema) {
    return {
        type: 'object',
        properties: lodash_1.reduce(schema.properties, function (result, value, key) {
            if (lodash_1.get(value, '$ref')) {
                var refTypeName = lodash_1.get(value, '$ref').replace('#/definitions/', '');
                var refType = referenceSchema.definitions[refTypeName];
                if (!refType) {
                    console.warn("unknown $ref \"" + refTypeName + "\" for " + key);
                }
                result[key] = refType ? lodash_1.cloneDeep(formPropertiesReducer(refType, referenceSchema)) : {};
            }
            else if (value.type === 'array') {
                if (lodash_1.get(value.items, '$ref')) {
                    var refTypeName = lodash_1.get(value.items, '$ref').replace('#/definitions/', '');
                    var refType = referenceSchema.definitions[refTypeName];
                    if (!refType) {
                        console.warn("unknown $ref \"" + refTypeName + "\" for " + key);
                    }
                    result[key] = refType ?
                        {
                            type: 'array',
                            items: lodash_1.cloneDeep(formPropertiesReducer(refType, referenceSchema))
                        } :
                        {};
                }
                else {
                    result[key] = {
                        type: 'array',
                        items: lodash_1.has(value.items, 'properties') ? __assign({}, value.items, { properties: formPropertiesReducer(value.items, referenceSchema) }) : value.items
                    };
                }
            }
            else {
                result[key] = lodash_1.has(value, 'properties') ? __assign({}, value, { properties: formPropertiesReducer(value, referenceSchema) }) : value;
            }
            return result;
        }, {}),
        required: schema.required
    };
}
//# sourceMappingURL=graphql.js.map