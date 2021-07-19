import { Sequelize } from 'sequelize';

export const db = new Sequelize('postgres://postgres:password@db:5432/db')

export const dbAuthenticate = async () =>
{
    try
    {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error)
    {
        console.error('Unable to connect to the database:', error);
    }
}
