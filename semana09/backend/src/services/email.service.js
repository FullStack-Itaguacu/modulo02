const nodemailer = require('nodemailer')

class EmailService {
  async sendMail() {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      requireTLS: true,
      auth: {
        user: 'xxxxxxxxxxxxxxxxxxx',
        pass: 'xxxxxxxxxxxxxxxxxxx'
      }
    });

    const info = await transporter.sendMail({
      from: '"Hello Foo 👻" <xxxxxxxxxxxxxxxxxxxxx>', // sender address
      to: "xxxxxxxxxxxxxxxxx", // list of receivers
      subject: "Hello ✔2 " , // Subject line
      html: '<b style="color: red; background: blue">Hello World</b>', // html body
    });

    console.log(info)
  }
}

module.exports = new EmailService()