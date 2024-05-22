export default function p(...args: any): void {
    console.log(...args);
}

export function echo() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
}