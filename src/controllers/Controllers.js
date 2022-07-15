/* contenedor principal de productos */
const Contenedor = require("../../Container");
const productsDatabase = require("../db/database").mysqlConnection;
const productsContainer = new Contenedor(productsDatabase, "products");


const getAllProducts = async (req, res)=>{
    res.json(await productsContainer.getAll());
}

const getProductById = async (req, res)=>{
    res.json(await productsContainer.getById(Number(req.params.id)));
}

const postProduct = async (req, res)=>{
    res.json(await productsContainer.save(req.body))
}

const putProduct = async (req, res)=>{
    res.json(await productsContainer.saveById(Number(req.params.id), req.body));
}

const deleteProductById = async (req, res)=>{
    res.json(await productsContainer.deleteById(Number(req.params.id)));
}



module.exports = { productsContainer, getAllProducts, getProductById, postProduct, putProduct, deleteProductById}