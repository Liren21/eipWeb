export const validationRules: any = [{type: 'required', message: 'Это поле должно быть заполнено!'}]
export const validatePhone = (params) => {
    const value = params.value;
    const phonePattern = /^(\+?\d{1,3}[- ]?)?(\(\d{1,5}\)[- ]?)?(\d{1,5}[- ]?)?\d{1,10}$/;
    return phonePattern.test(value);
}
export const validateEmail = (params) => {
    const value = params.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(value);
}
