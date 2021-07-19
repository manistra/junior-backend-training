import app from '../src/server';
import * as request from 'supertest';
import { friends } from '../db/models';


test('Get all friends', async () =>
{
    let friendsResponse = await friends.findAll();
    friendsResponse = JSON.stringify(friendsResponse)

    const response = await request(app.callback()).get('/friends');
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toStrictEqual(JSON.parse(friendsResponse));
});


test('Post a valid new friend', async () =>
{
    const friend = {
        first_name: "Mate",
        last_name: "Miso",
        nickname: "Kovac"
    };

    let friendsResponse = await friends.findAll();
    friendsResponse = JSON.stringify(friendsResponse)

    const response = await request(app.callback())
        .post('/friends')
        .send(friend);
    expect(response.status).toBe(200);
});

test('Post a new friend with invalid first name', async () =>
{
    const friend = {
        first_name: "",
        last_name: "Miso",
        nickname: ""
    };

    let friendsResponse = await friends.findAll();
    friendsResponse = JSON.stringify(friendsResponse)

    const response = await request(app.callback())
        .post('/friends')
        .send(friend);
    expect(response.status).toBe(400);
});

test('Post a new friend with invalid last name', async () =>
{
    const friend = {
        first_name: "Mate",
        last_name: "",
        nickname: ""
    };

    let friendsResponse = await friends.findAll();
    friendsResponse = JSON.stringify(friendsResponse)

    const response = await request(app.callback())
        .post('/friends')
        .send(friend);
    expect(response.status).toBe(400);
});