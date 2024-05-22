/*  */

interface IFormikValuesType {
    name: string,
    email: string;
    amount: number,
    currency: string,
    text: string,
    terms: string
}

interface IValidateValuesType {
    [key: string] : string | number;
}

const validate = (values: IFormikValuesType): IValidateValuesType => {
    const error: IValidateValuesType = {};
    if( !values.name ) {
        error.name = 'Обязательное поле!';
    } else if( values.name.length < 3 ) {
        error.name = 'Минимум 3 символа для заполнения!'
    }
    if( !values.email ) {
        error.email = 'Обязательное поле!';
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
        error.email = 'Неправильный email адрес!';
    }
    return error;
}