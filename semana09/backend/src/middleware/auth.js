const { verify } = require("jsonwebtoken")

async function auth(request, response, next) {
  try {
    const { authorization } = request.headers
    request["payload"] = verify(authorization, process.env.JWT_ACCESS_TOKEN)
    next()
  } catch (error) {
    console.log(error.message)
    return response.status(401).send({ message: "Unauthorized" })
  }
}

module.exports = { auth }