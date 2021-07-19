
import * as Router from "koa-router";
import friends from './controller'

const router = new Router({ prefix: '/friends' })


router.post("/", async (ctx) => await friends.postNewFriend(ctx));

router.get("/", async (ctx) => await friends.getAllFriends(ctx));


export default router;