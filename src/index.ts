import * as Koa from "koa";
import * as Router from "koa-router";

import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser"
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/db') // Example for postgres

const manistra = async () =>
{
    try
    {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error)
    {
        console.error('Unable to connect to the database:', error);
    }
}
manistra();

interface Friends
{
    first_name: string,
    last_name: string,
    nickname: string,
}
const Friends = sequelize.define("friends", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    nickname: DataTypes.STRING,
});
const jane = Friends.build({ first_name: "Jane", last_name: "Mate" });
console.log(jane instanceof Friends); // true
console.log(jane.getDataValue('first_name')); // "Jane"

const app = new Koa();
const router = new Router();

router.post("/friend", async (ctx, next) =>
{
    const data = ctx.request.body;
    const jane = Friends.build(data);
    await jane.save();
    ctx.body = data;

    await next();
});
router.get("/friends", async (ctx, next) =>
{
    const users = await Friends.findAll();


    ctx.body = JSON.stringify(users, null, 2);
    await next();
});

app.use(json());
app.use(logger());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () =>
{
    console.log("Koa started");
});