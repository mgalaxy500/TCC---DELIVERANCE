
const Jogo = require('../model/Jogo');

const express = require('express');
const app = express();

app.use(express.json()); // Permite o parsing de JSON no body

module.exports = class JogoMiddleware {


    async isNotNomeCadastrado(request, response, next) {

        const nomeJogo = request.body.jogo.nomeJogo;
        const jogo = new Jogo();
        const is = await jogo.isJogoByNome(nomeJogo);

        if (is == false) {
            next();
        } else {
            const objResposta = {
                status: false,
                msg: "Já existe um jogo cadastrado com este nome"
            }

            response.status(400).send(objResposta);
        }
    }

    async validate_nomeJogo(request, response, next) {

        const nomeJogo = request.body.jogo.nomeJogo;

        if (nomeJogo.length < 3) {

            const objResposta = {
                status: false,
                msg: "O nome deve ter mais do que 3 letras"
            }

            response.status(400).send(objResposta);
        } else {

            next();
        }
    }

}
