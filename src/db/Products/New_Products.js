const database = require('../database').mysqlConnection

const newProductsTable = async () => {
    try{
        await database.schema.createTable("products", productTable=>{
            productTable.increments("id").primary();
            productTable.string("title", 80).notNullable();
            productTable.integer('price').notNullable();
        })
        console.log("product table created")
    } catch(err){
        console.log("error: ", err);
    }
}

module.exports = newProductsTable;