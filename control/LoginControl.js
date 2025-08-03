// Importa o módulo express para criação de APIs.
const express = require('express');
const path = require('path');
const MeuTokenJWT = require('../model/MeuTokenJWT');
const Funcionario = require('../model/Funcionario');

module.exports = class LoginControl {

    async login(request, response) {

        if (request.method === 'GET') {
            return response.sendFile(path.join(__dirname, '../view/login.html'));
        }

        const funcionario = new Funcionario();
        funcionario.emailFuncionario = request.body.funcionario.emailFuncionario;
        funcionario.senhaFuncionario = request.body.funcionario.senhaFuncionario;

        const logou = await funcionario.login();

        if (logou == true) {
            const payloadToken = {
                idFuncionario: funcionario.idFuncionario,
                emailFuncionario: funcionario.emailFuncionario,
                senhaFuncionario: funcionario.senhaFuncionario,
            };
            const jwt = new MeuTokenJWT();
            const token_string = jwt.gerarToken(payloadToken);

            const objResposta = {
                status: true,
                cod: 1,
                msg: 'logado com sucesso',
                funcionario: {
                    idFuncionario: funcionario.idFuncionario,
                    emailFuncionario: funcionario.emailFuncionario,
                    senhaFuncionario: funcionario.senhaFuncionario,
                },
                token: token_string,
            };
            return response.status(200).send(objResposta);
        } else {
            const objResposta = {
                status: false,
                msg: 'email do funcionario ou senha inválidos'
            };
            return response.status(401).send(objResposta);
        }
    }
};
