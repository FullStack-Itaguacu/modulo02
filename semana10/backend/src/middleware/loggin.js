async function loggin(request, response, next){
    console.log("Log registrado no sistema")
    next()
}

module.exports = { loggin }