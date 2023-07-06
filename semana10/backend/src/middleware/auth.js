const { config } = require('dotenv')
const { verify } = require('jsonwebtoken')
config()

async function auth(request, response, next){
    try {
        console.log("Entramos no Middleware")
        const { authorization } = request.headers
        verify(authorization, process.env.SECRET_JWT)
        next()
    } catch (error) {
        return response.status(401).send({
            message: "Autenticação Falhou",
            cause: error.message})
    }
}

module.exports = { auth }
