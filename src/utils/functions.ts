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

export const getAllKeys: any = (obj: any, prefix = '') =>
    Object.keys(obj).reduce((res:any, el) => {
        if( Array.isArray(obj[el]) ) {
            return res;
        } else if( typeof obj[el] === 'object' && obj[el] !== null ) {
            return [...res, ...getAllKeys(obj[el], prefix + el + '.')];
        }
        return [...res, prefix + el];
    }, []);


export const arrangeElementsInArray = (arr: Array<any>, old_index: number, new_index: number) => {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};