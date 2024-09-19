const mailer = require('nodemailer');
module.exports = (nome, email, mensagem, anexo) => {
    const smtp = mailer.createTransport({
        host: '',
        port: 587,
        secure: false,
        auth: {
            user: 'your@email.com',
            pass: 'yourpassword'
        }
    });

    const mail = {
        from: 'your@email.com',
        to: email,
        subject: `E-mail enviado por ${nome}`,
        text: mensagem,
        // html: '<h1>Hello World</h1>',
    }

    if(anexo) {
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }

    return new Promise((resolve, reject) => {
        smtp.sendMail(mail)
            .then(response => {
                smtp.close();
                return resolve(response);
            })
            .catch(error => {
                smtp.close();
                return reject(error);
            })
    })
}