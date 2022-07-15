const database = require('../database').sqliteConnection

const newChatTable = async () => {
    try{
        await database.schema.createTable("chats", chatTable=>{
            chatTable.increments("id").primary();
            chatTable.string("nombre", 50).notNullable();
            chatTable.string("mensaje", 200).notNullable();
        })
        console.log("table created")
    } catch(err){
        console.log("error: ", err);
    }
}

module.exports = newChatTable;