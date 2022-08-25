const path = require ("path")
const fs = require("fs")
const archivo = path.join(__dirname,"../database/links.json")

const model = {    
    readData: function (){
        return JSON.parse(fs.readFileSync(archivo,"utf-8"))
    },
    
    saveData: function(contenido){
        fs.writeFileSync(archivo, JSON.stringify(contenido, null, 2))    
    },

    filtroLinks:function(estado){
        let archivoLinks = this.readData()
        let linksActivos = archivoLinks.filter(function(link){
            return link.estado==estado
        })
        return linksActivos
    },

    getid:function(){
        let archivoLinks = this.readData()
        if (archivoLinks.length == 0){
            return 1
        } 
        
        let ultimoId = archivoLinks[archivoLinks.length -1].id
        return ultimoId + 1        
    },

    nuevoLink:function(info){
        let id = this.getid()
        let archivoLinks = this.readData()
        let nuevoLink = {
            "id":id,
            "estado":"activo",
            ...info
        }
        archivoLinks.push(nuevoLink)
        this.saveData(archivoLinks)
    },

    findByPk:function(id){
        let archivoLinks = this.readData()
        let link = archivoLinks.find(oneLink => oneLink.id == id)
        return link
    },

    editarLink:function(id, info){
        let archivoLinks = this.readData()
        for (let i = 0; i< archivoLinks.length; i++){
            if(archivoLinks[i].id == id){
                estado=archivoLinks[i].estado
                archivoLinks[i]={
                    "id":id,
                    "estado":estado,
                    ...info
                }
            }
        }
        this.saveData(archivoLinks)
    },

    eliminarLink:function(id){
        let archivoLinks = this.readData()
        for (let i = 0; i< archivoLinks.length; i++){
            if(archivoLinks[i].id == id){
                archivoLinks[i].estado="desactivado"
                }
        }
        this.saveData(archivoLinks)
    },

    recuperarLink:function(id){
        let archivoLinks = this.readData()
        for (let i = 0; i< archivoLinks.length; i++){
            if(archivoLinks[i].id == id){
                archivoLinks[i].estado="activo"
                }
        }
        this.saveData(archivoLinks)
    }

}

module.exports=model