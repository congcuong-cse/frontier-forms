"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ajv = require("ajv");
var final_form_1 = require("final-form");
var lodash_1 = require("lodash");
var final_form_set_field_data_1 = require("final-form-set-field-data");
exports.allFieldSubscriptionItems = final_form_1.fieldSubscriptionItems.reduce(function (result, key) {
    result[key] = true;
    return result;
}, {});
var formatsRegistry = {};
exports.addFormat = function (formatName, validator) {
    formatsRegistry[formatName] = validator;
};
function getFormFromSchema(schema, onSubmit, initialValues) {
    if (initialValues === void 0) { initialValues = {}; }
    var form = final_form_1.createForm({
        validate: validateWithSchema(schema),
        onSubmit: onSubmit,
        initialValues: initialValues,
        mutators: { setFieldData: final_form_set_field_data_1.default }
    });
    registerFields(form, schema);
    return form;
}
exports.getFormFromSchema = getFormFromSchema;
function registerFields(form, schema, namespace) {
    visitSchema(schema, function (path, _definition) {
        form.registerField(path, lodash_1.noop, exports.allFieldSubscriptionItems);
    }, schema.required || []);
}
function visitSchema(schema, visitProperty, requiredFields, namespace) {
    lodash_1.each(schema.properties, function (value, key) {
        var pathKey = namespace ? namespace + "." + key : key;
        if (value.type === 'object') {
            visitSchema(value, visitProperty, value.required || [], pathKey);
        }
        else {
            visitProperty(pathKey, value, requiredFields.includes(key));
        }
    });
}
exports.visitSchema = visitSchema;
function validateWithSchema(schema) {
    var ajvCompiler = new Ajv({ allErrors: true });
    var validateFunction = ajvCompiler.compile(schema);
    lodash_1.each(formatsRegistry, function (validator, name) {
        ajvCompiler.addFormat(name, validator);
    });
    return function (values) {
        var valid = validateFunction(values);
        return valid ? {} : formatErrors(validateFunction.errors || []);
    };
}
function formatErrors(ajvErrors) {
    var errors = {};
    lodash_1.each(ajvErrors, function (value, _key) {
        if (value.keyword === 'required') {
            var path = value.dataPath ?
                [
                    value.dataPath.substr(1, value.dataPath.length),
                    value.params.missingProperty
                ].join('') :
                value.params.missingProperty;
            lodash_1.set(errors, path, value.keyword);
        }
        else {
            lodash_1.set(errors, value.dataPath.substr(1, value.dataPath.length), value.keyword);
        }
    });
    return errors;
}
//# sourceMappingURL=core.js.map