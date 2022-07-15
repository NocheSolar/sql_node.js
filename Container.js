class Contenedor {
    constructor(database, table) {
        this.database = database
        this.table = table
    }

    async save(object) {
        try {
            const id = await this.database(this.table).insert(object)
            object.id = id[0];
            console.log("Producto guardado", object.id);
            
            return object;
        } catch (err) {
            console.log("Error", err)
            return {error: "Error"}
        }
    }

    async saveById(id, object) {
        try {
            const newId = await this.database.from(this.table).where('id', '=', id).update(object)
            if (newId === 0) {
                return { error: `Producto no encontrado` }
            } else {
                return { success: `Producto actualizado` }
            }
        } catch (err) {
            console.log("Error", err)
            return {error: "Error "}
        }
    }

    async getById(id) {
        try {
            const product = await this.database.from(this.table).where({id})
            
            if (product[0]) {
                return product[0]
            } else {
                return { error: `Producto no encontrado` }
            }
        } catch (err) {
            console.log("Error ", err)
            return {error: "Error "}
        }
    }

    async getAll() {
        try {
            const products = await this.database.from(this.table).select("*")
            return products;
        } catch (err) {
            if (error.code === "ER_NO_SUCH_TABLE") {
                const createTable = require("./db/Products/New:Products")
                await createTable();
                console.log(`Tabla ${this.table} creada`)
                return []
            } else{
                console.log("Error", err)
                return {error: "Error"}
            }
        }
    }

    async deleteById(id) {
        try {
            const newId = await this.database(this.table).where({id}).del()
            if (newId === 0) {
                return { error: `Producto no encontrado` }
            } else {
                return { success: `Producto eliminado` }
            }
        } catch (err) {
            console.log("Error ", err)
            return { error: `Error ` }
        }
    }
}
module.exports = Contenedor;