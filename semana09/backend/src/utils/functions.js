const { sign } = require('jsonwebtoken')

function generateAccessToken(payload) {
  return sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: "20s" })
}

function generateRefreshToken(payload) {
  return sign(payload, process.env.JWT_REFRESH_TOKEN)
}

module.exports = {generateAccessToken, generateRefreshToken}