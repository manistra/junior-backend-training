
import { FriendsAttributes } from '../../../db/models/friends';
import { Status } from '../../validation/types';
import { ValidationStatus } from '../../validation/types';
import
{
    validate,
    required,
    length,
    nickname,

} from '../../validation/validators';


const validateName = (name: string): Status =>
{
    return validate(name, [required(), length({ min: 0, max: 20 })]);
};
const validateNickname = (name: string): Status =>
{
    return validate(name, [nickname()]);
};

const NewFriend = (newFriend: FriendsAttributes): ValidationStatus =>
{
    const firstNameValidation = validateName(newFriend.first_name);
    const lastNameValidation = validateName(newFriend.last_name);
    const nicknameValidation = validateNickname(newFriend.nickname);


    if (!firstNameValidation.valid)
    {
        return { valid: false, msg: "First name" + firstNameValidation.message };

    }
    if (!lastNameValidation.valid)
    {
        return { valid: false, msg: "Last name" + lastNameValidation.message };

    }
    if (!nicknameValidation.valid && newFriend.nickname.length)
    {
        return { valid: false, msg: "Nickname" + nicknameValidation.message };
    }
    return { valid: true, msg: "" };

}

export default { NewFriend }