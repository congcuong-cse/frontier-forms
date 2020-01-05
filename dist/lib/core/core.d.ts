import * as Ajv from 'ajv';
import { Config, FieldSubscription, FormApi } from 'final-form';
import { JSONSchema7 } from 'json-schema';
export declare const allFieldSubscriptionItems: FieldSubscription;
export declare const addFormat: (formatName: string, validator: Ajv.FormatValidator) => void;
export declare function getFormFromSchema(schema: JSONSchema7, onSubmit: Config['onSubmit'], initialValues?: {}): FormApi;
export declare function visitSchema(schema: JSONSchema7, visitProperty: (path: string, definition: JSONSchema7, required: boolean) => void, requiredFields: string[], namespace?: string): void;
