const path = require("path");
const express =require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require("method-override")
const session = require('express-session')
const cookies = require('cookie-parser')
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")

const mainRoutes = require("./routes/mainRoutes")

app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))

app.use(methodOverride("_method")) 
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(session({secret:'SECRETO'}))
app.use(cookies())
app.use(userLoggedMiddleware)

app.use("/", mainRoutes)

app.listen(PORT, function(){console.log("Servidor corriendo 3000")});