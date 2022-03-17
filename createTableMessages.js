const configDB = require('./db/config')
const knex = require('knex')(configDB.sqlite3);

const tableName = 'messages';

(async (tName) => {
    try {
        const existTable = await knex.schema.hasTable(tName);
        if (!existTable) {
            await knex.schema.createTable(tName, table => {
                table.increments('id');
                table.string('author');
                table.string('message');
                table.timestamp('timestamp').defaultTo(knex.fn.now());
            })
            console.log('created table');
        } else console.log('table already created');
    } catch (error) {
        console.log(error);
        throw error;
    }
    finally { knex.destroy() }
})(tableName);