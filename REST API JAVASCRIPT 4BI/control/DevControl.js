const express = require('express');
const Dev = require('../model/Dev');

module.exports = class DevControl {
    
    async readAll(request, response) {
        const dev = new Dev();
        const dadosDevs = await dev.readAll();
        const objResposta = {
            cod: 1,
            status: true,
            devs: dadosDevs
        };
        response.status(200).send(objResposta);
    }

    async readById(request, response) {
        const dev = new Dev();
        const idDev = request.params.idDev;

        const dadosDev = await dev.readByID(idDev);
        const objResposta = {
            cod: 1,
            status: true,
            devs: dadosDev
        };
        response.status(200).send(objResposta);
    }

    async create(request, response) {
        const dev = new Dev();

        dev.nomeDev = request.body.dev.nomeDev;
        dev.senhaDev = request.body.dev.senhaDev;

        const cadastrou = await dev.create();
        if (cadastrou == true) {
            const objResposta = {
                cod: 1,
                status: true,
                devs: [{
                    "dev": {
                        "idDev": dev.idDev,
                        "nomeDev": dev.nomeDev,
                        "senhaDev": dev.senhaDev,
                    }
                }]
            };
            response.status(201).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao cadastrar dev",
                devs: [{
                    "dev": {
                        "idDev": dev.idDev,
                        "nomeDev": dev.nomeDev,
                        "senhaDev": dev.sehaDev,
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }

    async update(request, response) {
        const dev = new Dev();

        dev.idDev = request.params.idDev;
        dev.nomeDev = request.body.dev.nomeDev;
        dev.senhaDev = request.body.dev.senhaDev;

        const atualizou = await dev.update();
        if (atualizou == true) {
            const objResposta = {
                cod: 1,
                status: true,
                devs: [{
                    "dev": {
                        "idDev": dev.idDev,
                        "nomeDev": dev.nomeDev,
                        "senhaDev": dev.senhaDev,
                    }
                }]
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao atualizar dev",
                devs: [{
                    "dev": {
                        "idDev": dev.idDev,
                        "nomeDev": dev.nomeDev,
                        "senhaDev": dev.senhaDev,
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }

    async delete(request, response) {
        const dev = new Dev();
        dev.idDev = request.params.idDev;

        const excluiu = await dev.delete();
        if (excluiu == true) {
            const objResposta = {
                cod: 1,
                status: true,
                msg: "Excluído com sucesso",
                devs: [{
                    "dev": {
                        "idDev": dev.idDev,
                        "nomeDev": dev.nomeDev,
                        "senhaDev": dev.senhaDev,
                    }
                }]
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao excluir dev",
                devs: [{
                    "dev": {
                        "idDev": dev.idDev,
                        "nomeDev": dev.nomeDev,
                        "senhaDev": dev.senhaDev,
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }
};
