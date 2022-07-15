class Chat{
    constructor(database, table){
        this.database = database;
        this.table = table;
    }

    async save(message){
        try{
            await this.database(this.table).insert(message);
            return true;
        }
        
        catch(err){
            console.log("Error", err);
            return false;
        }
    }

    async getAll(){
        try{
            const messages = await this.database.from(this.table).select("*")
            return messages;
        } catch(err){
            if (err.errno === 1) {
                const createTable = require("./db/Chats/New_Chats")
                await createTable();
                console.log(`Tabla ${this.table} creada`)
                return []
            } else {
                console.log("Error", err)
                return {error: "error"}
            }
        }
    }
}

module.exports = Chat;