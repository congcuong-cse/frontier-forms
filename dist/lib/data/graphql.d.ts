import { ApolloClient } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { JSONSchema7 } from 'json-schema';
export interface FrontierDataGraphQLProps {
    mutation: DocumentNode;
    client?: ApolloClient<any>;
    schema?: JSONSchema7;
    save?: (values: object) => Promise<undefined | object>;
    formats?: {
        [k: string]: string;
    };
}
export declare type SchemaFromGraphQLPropsReturn = {
    schema: JSONSchema7;
    mutationName: string;
} | null;
export declare function schemaFromGraphQLProps(props: FrontierDataGraphQLProps): Promise<SchemaFromGraphQLPropsReturn>;
export declare function saveData(props: FrontierDataGraphQLProps, values: object): Promise<undefined | object>;
export declare function getMutationNameFromDocumentNode(mutation: DocumentNode): string | null;
export declare function buildFormSchema(schema: JSONSchema7, mutationName: string): JSONSchema7;
