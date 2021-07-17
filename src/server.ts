import * as Koa from "koa";
import { dbAuthenticate } from '../config/database.config'
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser"
import friendsRouter from './api/friends/routes'




const app = new Koa();

dbAuthenticate();


app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(friendsRouter.routes()).use(friendsRouter.allowedMethods());
app.listen(3000, () =>
{
    console.log("Koa started");
});


