import * as Koa from "koa";
import * as Router from "koa-router";
import { dbAuthenticate } from '../config/database.config'
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser"
import { friends } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { FriendsAttributes } from '../models/friends';
import { Status } from './validation/types';

import
{
    validate,
    required,
    length,
    nickname,

} from './validation/validators';



const app = new Koa();
const router = new Router();

dbAuthenticate();


app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () =>
{
    console.log("Koa started");
});

const validateName = (name: string): Status =>
{
    return validate(name, [required(), length({ min: 0, max: 35 })]);
};
const validateNickname = (name: string): Status =>
{
    return validate(name, [nickname()]);
};



router.post("/friend", async (ctx, next) =>
{
    const id = uuidv4();
    try
    {
        const data = ctx.request.body as unknown as FriendsAttributes;
        const firstNameValidation = validateName(data.first_name);
        const lastNameValidation = validateName(data.last_name);
        const nicknameValidation = validateNickname(data.nickname);

        console.log(firstNameValidation);


        if (!firstNameValidation.valid)
        {
            ctx.response.status = 400;
            ctx.body = { msg: "First name" + firstNameValidation.message };
            return;
        } else if (!lastNameValidation.valid)
        {
            ctx.response.status = 400;
            ctx.body = { msg: "Last name" + lastNameValidation.message };
            return;
        } else if (!nicknameValidation.valid && data.nickname.length)
        {
            ctx.response.status = 400;
            ctx.body = { msg: "Nickname" + lastNameValidation.message };
            return;
        }

        const record = await friends.create({ id, ...data });
        ctx.body = record;

    } catch (e)
    {
        ctx.response.status = 500;
        ctx.body = { msg: "Failed to create" };
    }
});

router.get("/friends", async (ctx, next) =>
{
    const users = await friends.findAll();

    ctx.body = JSON.stringify(users, null, 2);
});