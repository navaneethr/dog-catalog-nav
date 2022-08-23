const _ = require('lodash');
export const titleCase = (s: string) =>
    s.replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())       // Initial char (after -/_)
        .replace (/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase()) // First char after each -/_

export const clean = (obj: any) => {
    for (var propName in obj) {
        if (_.isEmpty(obj[propName])) {
            delete obj[propName];
        }
    }
    return obj
}