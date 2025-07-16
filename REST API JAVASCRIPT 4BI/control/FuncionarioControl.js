const express = require('express');
const Funcionario = require('../model/Funcionario');

module.exports = class FuncionarioControl {
    
    async readAll(request, response) {
        const funcionario = new Funcionario();
        const dadosFuncionarios = await funcionario.readAll();
        const objResposta = {
            cod: 1,
            status: true,
            funcionarios: dadosFuncionarios
        };
        response.status(200).send(objResposta);
    }

    async readById(request, response) {
        const funcionario = new Funcionario();
        const idFuncionario = request.params.idFuncionario;

        const dadosFuncionario = await funcionario.readByID(idFuncionario);
        const objResposta = {
            cod: 1,
            status: true,
            funcionarios: dadosFuncionario
        };
        response.status(200).send(objResposta);
    }

    async create(request, response) {
        const funcionario = new Funcionario();

        funcionario.nomeFuncionario = request.body.funcionario.nomeFuncionario;
        funcionario.senhaFuncionario = request.body.funcionario.senhaFuncionario;

        const cadastrou = await funcionario.create();
        if (cadastrou == true) {
            const objResposta = {
                cod: 1,
                status: true,
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "nomeFuncionario": funcionario.nomeFuncionario,
                        "senhaFuncionario": funcionario.senhaFuncionario,
                    }
                }]
            };
            response.status(201).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao cadastrar funcionario",
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "nomeFuncionario": funcionario.nomeFuncionario,
                        "senhaFuncionario": funcionario.sehaFuncionario,
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }

    async update(request, response) {
        const funcionario = new Funcionario();

        funcionario.idFuncionario = request.params.idFuncionario;
        funcionario.nomeFuncionario = request.body.funcionario.nomeFuncionario;
        funcionario.senhaFuncionario = request.body.funcionario.senhaFuncionario;

        const atualizou = await funcionario.update();
        if (atualizou == true) {
            const objResposta = {
                cod: 1,
                status: true,
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "nomeFuncionario": funcionario.nomeFuncionario,
                        "senhaFuncionario": funcionario.senhaFuncionario,
                    }
                }]
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao atualizar funcionario",
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "nomeFuncionario": funcionario.nomeFuncionario,
                        "senhaFuncionario": funcionario.senhaFuncionario,
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }

    async delete(request, response) {
        const funcionario = new Funcionario();
        funcionario.idFuncionario = request.params.idFuncionario;

        const excluiu = await funcionario.delete();
        if (excluiu == true) {
            const objResposta = {
                cod: 1,
                status: true,
                msg: "Excluído com sucesso",
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "nomeFuncionario": funcionario.nomeFuncionario,
                        "senhaFuncionario": funcionario.senhaFuncionario,
                    }
                }]
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao excluir funcionario",
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "nomeFuncionario": funcionario.nomeFuncionario,
                        "senhaFuncionario": funcionario.senhaFuncionario,
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }
};
