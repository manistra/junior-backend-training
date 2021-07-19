
import Router from "koa-router";
import { friends } from '../../../db/models';
import { v4 as uuidv4 } from 'uuid';
import { FriendsAttributes } from '../../../db/models/friends';
import validate from './validation'
import { ParameterizedContext } from 'koa';

const postNewFriend = async (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>) =>
{
    const id = uuidv4();
    try
    {
        const data = ctx.request.body as unknown as FriendsAttributes;

        const validationResult = validate.NewFriend(data);
        if (validationResult.valid === false)
        {
            ctx.response.status = 400;
            ctx.body = { msg: validationResult.msg };
            return;
        }
        const record = await friends.create({ id, ...data });
        ctx.body = record;

    } catch (e)
    {
        ctx.response.status = 500;
        ctx.body = { msg: "Failed to create" };
    }
};

const getAllFriends = async (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>) =>
{
    try
    {
        const users = await friends.findAll();
        ctx.body = JSON.stringify(users, null, 2);
    } catch (e)
    {
        ctx.response.status = 500;
        ctx.body = { msg: "Server error" };
    }

};

export default { postNewFriend, getAllFriends }
