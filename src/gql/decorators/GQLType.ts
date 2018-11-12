import { resolverMap } from './_internal';

/**
 * Adds a class to the global GraphQL resolver map.
 *
 * All functions in the class are added as resolver functions.
 */
// tslint:disable-next-line:ban-types
export function GQLType(constructor: Function) {
    const resolver = makeResolverObject(constructor);
    resolverMap[constructor.name] = resolver;
}

// tslint:disable-next-line:ban-types
function makeResolverObject(type: Function): object {
    const resolver: { [key: string]: any } = {};

    const props = Object.getOwnPropertyDescriptors(type.prototype);
    for (const p in props) {
        if (p === 'constructor') {
            continue;
        }
        const prop = props[p];

        // properties with a value are functions
        if (prop.value != null) {
            resolver[p] = prop.value;
        }
    }

    return resolver;
}
