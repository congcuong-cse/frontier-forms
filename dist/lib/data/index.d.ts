import { FrontierDataGraphQLProps } from './graphql';
export declare type FrontierDataProps = FrontierDataGraphQLProps;
export declare function schemaFromDataProps(props: FrontierDataProps): Promise<import("./graphql").SchemaFromGraphQLPropsReturn>;
