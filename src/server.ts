import * as Koa from "koa";
import { dbAuthenticate } from '../db/database'
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser"
import friendsRouter from './api/friends/routes'

const app = new Koa();

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(friendsRouter.routes()).use(friendsRouter.allowedMethods());

app.listen(3000, () =>
{
    console.log("Koa started");
});

dbAuthenticate();

export default app;