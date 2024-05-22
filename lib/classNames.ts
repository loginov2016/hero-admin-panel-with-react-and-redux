type Mods = Record<string, boolean | string>;
 

/* export function classNames(cls:string, mods: Mods, additional: string[]): string {

    return [
        cls,
        ...Object.entries(mods).filter( ([key, value]) => value ).map( ([key, value]) => key ), 
        ...additional
    ].join(' ');
}
 */

export function classNames(...args: (string | Mods)[]): string {
    let arr: string[] = [];
    let err = null;
    args.forEach( value => {
        if( typeof value === 'string' ) {
            arr.push(value);
        } else if ( typeof value === 'object' && typeof value !== null ) {
            let newArr = Object.entries(value).filter( ([val]) => val ).map( ([key]) => key );
            arr = arr.concat(newArr); // Метод cocncat создаёт новый массив.
        } else {
            err = new Error('Тип аргумента должен быть строкой или Mods');
        }
    } );
    if( err ) {
        return err;
    }
    return arr.join(' ');
    
}

//classNames('remove-btn', {hovered: false, selectable: true, red: true}, ['btn']);

/* for(let value of args ) {
        if( typeof value === 'string' ) {
            arr.push(value);
        } else if ( typeof value === 'object' && typeof value !== null ) {
            let newArr = Object.entries(value).filter( ([val]) => val ).map( ([key]) => key );
            arr = arr.concat(newArr); // Метод cocncat создаёт новый массив.
        } else {
            err = new Error('Тип аргумента должен быть строкой или Mods');
        }
    } */