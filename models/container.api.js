class Container {
    constructor(configDB, tableName) {
        this.knex = require('knex')(configDB);
        this.tableName = tableName;
    }
    async getByPropertyAndValue(property, value) {
        const data = await this.selectAll();
        try {
            return data.where(property, '=', value)
                .then(res => console.log(res))
                .then(res => res);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getAll() {
        try {
            return this.knex(this.tableName)
                .select('*').then(res => res);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async selectAll() {
        try {
            return this.knex(this.tableName).select('*');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async saveData(new_data) {
        try {
            await this.knex(this.tableName).insert(new_data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteAll() {
        try {
            await this.knex(this.tableName).del();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Container;