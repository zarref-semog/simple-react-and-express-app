const path = require('path');
const express = require('express');

const app = express();

app.use(require('cors')());
app.use(express.json());

const upload = require('multer')();
app.post('/send', upload.single('anexo'), (req, res, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    const anexo = req.file;

    require('./src/services/mailService')(nome, email, mensagem, anexo)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
});

app.use(express.static(path.join(__dirname, 'build')));

app.listen(3000, () => {
    console.log('server start');
})