const configDB = require('./db/config')
const knex = require('knex')(configDB.mariaDB);

const tableName = 'products';

(async (tName) => {
    try {
        const existTable = await knex.schema.hasTable(tName);
        if (!existTable) {
            await knex.schema.createTable(tName, table => {
                table.increments('id');
                table.string('title').notNullable();
                table.integer('price').notNullable();
                table.string('thumbnail').notNullable();
            })
            console.log('created table');
        } else console.log('table already created');
    } catch (error) {
        console.log(error);
        throw error;
    }
    finally { knex.destroy() }
})(tableName);