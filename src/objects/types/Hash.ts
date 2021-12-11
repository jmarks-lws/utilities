/** Base type representing a tabular flat object. Most reference types in javascript can be a Hash. */
export interface Hash { [index: string]: any }
/** Base type representing a tabular flat object. Most reference types in javascript can be an Object Literal. */
export interface ObjectLiteral<T extends any> { [index: string]: T }
