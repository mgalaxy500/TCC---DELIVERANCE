// Importa o módulo express para criação de APIs.
const express = require('express');
const Dev = require('../model/Dev');
const MeuTokenJWT = require('../model/MeuTokenJWT');

module.exports = class LoginControl {

    async login(request, response) {
        const dev = new Dev();
        dev.emailDev = request.body.dev.emailDev;
        dev.senhaDev = request.body.dev.senhaDev;

        const logou = await dev.login();

        if (logou == true) {
            const payloadToken = {
                idDev: dev.idDev,
                emailDev: dev.emailDev,
                senhaDev: dev.senhaDev,
            };
            const jwt = new MeuTokenJWT();
            const token_string = jwt.gerarToken(payloadToken);

            const objResposta = {
                status: true,
                cod: 1,
                msg: 'logado com sucesso',
                dev: {
                    idDev: dev.idDev,
                    emailDev: dev.emailDev,
                    senhaDev: dev.senhaDev
                },
                token: token_string,
            };
            return response.status(200).send(objResposta);
        } else {
            const objResposta = {
                status: false,
                msg: 'email do dev ou senha inválidos'
            };
            return response.status(401).send(objResposta);
        }
    }
};
