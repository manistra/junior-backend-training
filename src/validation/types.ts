interface Rule
{
    type: 'required' | 'length' | 'nickname';
}

export type Validator = Require | Length | Nickname;
export interface Status
{
    valid: boolean;
    message?: string;
}

export interface Require extends Rule
{
    type: 'required';
}

export interface MinMaxOptions
{
    min: number;
    max: number;
}

export interface Length extends Rule
{
    type: 'length';
    options: MinMaxOptions;
}
export interface Nickname extends Rule
{
    type: 'nickname';
}
export interface ValidationStatus
{
    valid: boolean,
    msg: string
}
