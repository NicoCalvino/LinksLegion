const express = require ("express")
const app = express()
const {body} = require('express-validator')
const authMiddleware = require("../middlewares/authMiddleware")
const guestMiddleware = require("../middlewares/guestMiddleware")

const router = express.Router()

const mainController = require("../controllers/mainController")

const validaciones =[
    body('nombre').isLength({max:25}).withMessage('El nombre no puede superar los 25 caracteres').notEmpty().withMessage('Especificar un Nombre'),
    body('alias').isLength({max:10}).withMessage('El alias no puede superar los 10 caracteres').notEmpty().withMessage('Especificar un Alias'),
    body('link').notEmpty().withMessage('Completar el link'),
    body('descripcion').notEmpty().withMessage('Completar la Descripción')
]

const usuario = [
    body('user').custom((value,{req})=>{
        let usuario = req.body.user

        if(usuario != "legion"){
            throw new Error('Usuario Incorrecto ' + usuario)
        }

        return true
    }),
    body('contrasena').custom((value,{req})=>{
        let password = req.body.contrasena

        if(password != "legion"){
            throw new Error('Password Incorrecto' + password)
        }

        return true
    })
]

//Login
router.get("/login", guestMiddleware, mainController.login)
router.post("/login", usuario, mainController.processLogin)

//Logout
router.get("/logout", mainController.logOut)

//Acceder a links
router.get("/", authMiddleware, mainController.index)
router.get("/links", authMiddleware, mainController.index)

//Agregar Link
router.get("/nuevo", authMiddleware, mainController.nuevo)
router.post("/nuevo", authMiddleware, validaciones, mainController.agregarLink)

//Editar Link
router.get("/editar/:id", authMiddleware, mainController.edicion)
router.put("/editar/:id", authMiddleware, validaciones, mainController.editarLink)

//Eliminar Link
router.get("/eliminados", authMiddleware, mainController.indexEliminados)
router.delete("/eliminar/:id", authMiddleware, mainController.eliminarLink)

//Recuperar Link
router.put("/recuperar/:id", authMiddleware, mainController.recuperarLink)

module.exports=router