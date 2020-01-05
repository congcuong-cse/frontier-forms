import { FieldState, FormApi } from 'final-form';
import { JSONSchema7TypeName } from 'json-schema';
import { ComponentType, ReactNode } from 'react';
export declare type UIKITFieldProps = FieldState & {
    children?: ReactNode;
};
export interface UIKitResolver {
    (path: string, type: JSONSchema7TypeName, required: boolean, children?: ReactNode): ComponentType<UIKITFieldProps>;
}
export declare type UIKitPathHandler = (path: string, type: JSONSchema7TypeName, required: boolean, children?: ReactNode) => ComponentType<UIKITFieldProps>;
export declare type UIKitTypeHandler = (path: string, required: boolean, children?: ReactNode) => ComponentType<UIKITFieldProps>;
export declare type UIKitUnknownHandler = (path: string, type: JSONSchema7TypeName) => ComponentType<UIKITFieldProps>;
export declare type UIKitFormHandler = (form: FormApi, children?: ReactNode) => ReactNode;
export interface UIKitAPI {
    form: (f: UIKitFormHandler) => UIKitAPI;
    unknown: (f: UIKitUnknownHandler) => UIKitAPI;
    path: (path: string | RegExp, f: UIKitPathHandler) => UIKitAPI;
    type: (type: JSONSchema7TypeName, f: UIKitTypeHandler) => UIKitAPI;
    __reducer: (path: string, type: JSONSchema7TypeName, required: boolean, children?: ReactNode) => ComponentType<UIKITFieldProps>;
    __wrapWithForm: UIKitFormHandler;
}
export declare const UIKit: () => UIKitAPI;
