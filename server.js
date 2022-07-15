const express = require("express")
const router = require("./src/routes/index");
const ChatContainer = require("./src/chats")
const { productsContainer } = require("./src/controllers/Controllers")
const { Server: IOServer } = require("socket.io");
const chatsDatabase = require("./db/database").sqliteConnection;
const chat = new ChatContainer(chatsDatabase, "chats");
const path = require("path");
const app = express();
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../public")))

app.use("/", router)
app.use((req, res) => {
    res.status(404).json({error404: "Error"});
})

app.use(function (err, req, res, next) {
    res.status(500).json({
        error: err.message,
    });
});


const expressServer = app.listen(port, (err) => {
    if (!err) {
        console.log(`El servidor se inicio en el puerto ${port}`)
    } else {
        console.log(`Hubo un error`)
    }
})

const io = new IOServer(expressServer);

io.on("connection", async socket => {
    console.log("Nuevo usuario conectado")

    const messages = await chat.getAll();
    const products = await productsContainer.getAll();

    socket.emit("server:items", {products, messages})

    socket.on("client: producto", async producto => {
        await productsContainer.save(producto);

        io.emit("server:producto", producto);
    })

    socket.on("client:mensaje", async mensajeEnvio => {
        await chat.save(mensajeEnvio);

        io.emit("server:mensaje", mensajeEnvio);
    })
})

