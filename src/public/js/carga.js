window.onload = function(e){
    if (sessionStorage.getItem("Admin") != "Si"){
        e.preventDefault()
        
        let password = prompt("Introducir Contraseña")

        if (password != "legion"){
            window.location = "http://www.google.com"
        }else{
            sessionStorage.setItem("Admin","Si")
        }
    }
}