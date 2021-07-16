import
{
    Validator,
    Status,
    Require,
    MinMaxOptions,
    Length,
    Nickname,

} from './types';

export function required(): Require
{
    return {
        type: 'required',
    };
}
export function length(options: MinMaxOptions): Length
{
    return {
        type: 'length',
        options,
    };
}
export function nickname(): Nickname
{
    return {
        type: 'nickname',
    };
}

export function validate(value: string, validators: Validator[]): Status
{
    for (const validator of validators)
    {
        if (validator.type === 'required' && (!value || !value.length))
        {
            return {
                valid: false,
                message: ' field is required',
            };
        }
        if (validator.type === 'length' && value.length < validator.options.min)
        {
            return {
                valid: false,
                message: `field has a minimum length of ${validator.options.min}.`,
            };
        }
        if (validator.type === 'length' && value.length > validator.options.max)
        {
            return {
                valid: false,
                message: `field has a maximum length of ${validator.options.max}.`,
            };
        }


        if (validator.type === 'nickname')
        {
            // eslint-disable-next-line no-useless-escape
            const re = /^(?=.{1,35}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

            if (!re.test(String(value).toLowerCase()))
            {
                return {
                    valid: false,
                    message: 'field can only contain letters and numbers.',
                };
            }
        }


    }
    return { valid: true };
}