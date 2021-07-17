
import * as Router from "koa-router";
import { friends } from '../../../db/models';
import { v4 as uuidv4 } from 'uuid';
import { FriendsAttributes } from '../../../db/models/friends';
import * as friendsValidation from './validation'
import { ParameterizedContext } from 'koa';

export const postNewFriend = async (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>) =>
{
    const id = uuidv4();
    try
    {
        const data = ctx.request.body as unknown as FriendsAttributes;

        const validationResult = friendsValidation.validateNewFriend(data);
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

export const getAllFriends = async (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>) =>
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
