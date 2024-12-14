export class NestedResolver {
    public static getNestedValue(obj: object, path: string) {
        // @ts-ignore
        return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
    }

    public static setNestedValue(obj: object, path: string, value: any) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        if(!lastKey) return obj;
        // @ts-ignore
        const target = keys.reduce((o, key) => (o[key] = o[key] || {}), obj);
        // @ts-ignore
        target[lastKey] = value;
    }
}