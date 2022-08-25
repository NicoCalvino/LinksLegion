const path = require("path")
const fs = require("fs")
const model = require("../models/mainModel")
const {validationResult} = require('express-validator')

const controller = {
    login:(req, res) =>{
        res.render("login")
    },
    processLogin:(req, res)=>{
        let errores = validationResult(req)

        if(errores.isEmpty()){
            req.session.userLogged = req.body.user
            if (req.body.recordar == "on"){
                res.cookie("user", req.body.user,{maxAge: 50000 * 60})
            }
            res.redirect("/links")
        }else{
            res.render("login",{usuario:req.body.user, error:errores.mapped()})
        }
    },
    logOut:(req,res)=>{
        req.session.destroy()
        res.clearCookie("user")
        res.redirect("/")
    },
    index:(req, res) => {
        let links = model.filtroLinks("activo")
        res.render("links",{links, title:"LINKS MESA DE TRABAJO"})
    },
    nuevo:(req, res) => {
        res.render("edicion",{title:"NUEVO LINK"})
    },
    agregarLink:(req,res)=>{
        let errores = validationResult(req)

        if (!errores.isEmpty()){
            res.render("edicion",{title:"NUEVO LINK", errores:errores.mapped(), oldInfo:req.body})
        }else{
            model.nuevoLink(req.body)
            res.redirect("/links")
        }
    },
    edicion:(req, res) => {
        let id = req.params.id
        let link = model.findByPk(id)
        let estado = link.estado
        res.render("edicion",{title:"EDICIÓN LINKS", oldInfo:link, estado, idLink:id})
    },
    editarLink:(req,res)=>{
        let id = req.params.id
        let errores = validationResult(req)
        if (!errores.isEmpty()){
            let estado =  model.findByPk(id).estado
            res.render("edicion",{title:"EDICIÓN LINKS", errores:errores.mapped(), oldInfo:req.body, estado, idLink:id})
        }else{
            let id = req.params.id
            model.editarLink(id,req.body)
            res.redirect("/links")
        }
    },   
    eliminarLink:(req,res)=>{
        let id = req.params.id
        model.eliminarLink(id)
        res.redirect("/links")
    },
    indexEliminados:(req,res)=>{
        let links = model.filtroLinks("desactivado")
        res.render("links",{links, title:"LINKS ELIMINADOS"})
    },
    recuperarLink:(req,res)=>{
        let id = req.params.id
        model.recuperarLink(id)
        res.redirect("/links")
    }
}

module.exports = controller