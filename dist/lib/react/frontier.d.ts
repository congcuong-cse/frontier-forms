import { FormApi, FormState, FormSubscription, Unsubscribe } from 'final-form';
import { JSONSchema7 } from 'json-schema';
import { Component, ComponentType } from 'react';
import * as React from 'react';
import { FrontierDataProps } from '../data';
import { UIKitAPI, UIKITFieldProps } from '../ui-kit';
export declare const allFormSubscriptionItems: FormSubscription;
export interface Modifiers {
    change: (value: any) => void;
    focus: () => void;
    blur: () => void;
}
export interface FrontierRenderProps {
    form: FormApi;
    state: FormState;
    modifiers: any;
    kit?: any;
}
export interface FrontierProps extends FrontierDataProps {
    uiKit?: UIKitAPI;
    initialValues?: {};
    onSave?: (values: object) => void;
    resetOnSave?: boolean;
    order?: string[];
    children?: ({ modifiers, state, kit }: FrontierRenderProps) => JSX.Element;
}
export interface FrontierState {
    formState?: FormState;
}
declare type componentGetter = (path: string, definition: JSONSchema7, required: boolean) => ComponentType<UIKITFieldProps>;
export declare class Frontier extends Component<FrontierProps, FrontierState> {
    state: FrontierState;
    form?: FormApi;
    schema?: JSONSchema7;
    mutationName?: string;
    mounted: boolean;
    unsubformSubscription?: Unsubscribe;
    constructor(props: FrontierProps);
    buildForm(): void;
    componentDidMount(): void;
    subscribeToForm(): void;
    componentWillMount(): void;
    componentDidUpdate(prevProps: FrontierProps): void;
    onSubmit: (formValues: object) => Promise<object | undefined>;
    renderProps(): FrontierRenderProps;
    uiKitComponentFor: componentGetter;
    renderWithKit(): React.ReactNode;
    render(): {} | null | undefined;
}
export {};
