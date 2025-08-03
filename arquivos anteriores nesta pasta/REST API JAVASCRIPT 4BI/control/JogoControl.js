const express = require('express');
const Jogo = require('../model/Jogo');

module.exports = class JogoControl {
    
    async readAll(request, response) {
        const jogo = new Jogo();
        const dadosJogos = await jogo.readAll();
        const objResposta = {
            cod: 1,
            status: true,
            jogos: dadosJogos
        };
        response.status(200).send(objResposta);
    }

    async readById(request, response) {
        const jogo = new Jogo();
        const idJogo = request.params.idJogo;

        const dadosJogo = await jogo.readByID(idJogo);
        const objResposta = {
            cod: 1,
            status: true,
            jogos: dadosJogo
        };
        response.status(200).send(objResposta);
    }

    async create(request, response) {
        const jogo = new Jogo();

        jogo.nomeJogo = request.body.jogo.nomeJogo;
        jogo.precoJogo = request.body.jogo.precoJogo;
        jogo.dataJogo = request.body.jogo.dataJogo;
        jogo.metacriticJogo = request.body.jogo.metacriticJogo;
        jogo.njogadoresJogo = request.body.jogo.njogadoresJogo;
        jogo.versaoJogo = request.body.jogo.versaoJogo;
        jogo.genero.idGenero = request.body.jogo.genero_idGenero;
        jogo.estado.idEstado = request.body.jogo.estado_idEstado;

        const cadastrou = await jogo.create();
        if (cadastrou == true) {
            const objResposta = {
                cod: 1,
                status: true,
                jogos: [{
                    "jogo": {
                        "idJogo": jogo.idJogo,
                        "nomeJogo": jogo.nomeJogo,
                        "precoJogo": jogo.precoJogo,
                        "dataJogo": jogo.dataJogo,
                        "metacriticJogo": jogo.metacriticJogo,
                        "njogadoresJogo": jogo.njogadoresJogo,
                        "versaoJogo": jogo.versaoJogo,
                        "genero_idGenero": jogo.genero.idGenero,
                        "estado_idEstado": jogo.estado.idEstado
                    }
                }]
            };
            response.status(201).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao cadastrar jogo",
                jogos: [{
                    "jogo": {
                        "idJogo": jogo.idJogo,
                        "nomeJogo": jogo.nomeJogo,
                        "precoJogo": jogo.precoJogo,
                        "dataJogo": jogo.dataJogo,
                        "metacriticJogo": jogo.metacriticJogo,
                        "njogadoresJogo": jogo.njogadoresJogo,
                        "versaoJogo": jogo.versaoJogo,
                        "genero_idGenero": jogo.genero.idGenero,
                        "estado_idEstado": jogo.estado.idEstado
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }

    async update(request, response) {
        const jogo = new Jogo();

        jogo.idJogo = request.params.idJogo;
        jogo.nomeJogo = request.body.jogo.nomeJogo;
        jogo.precoJogo = request.body.jogo.precoJogo;
        jogo.dataJogo = request.body.jogo.dataJogo;
        jogo.metacriticJogo = request.body.jogo.metacriticJogo;
        jogo.njogadoresJogo = request.body.jogo.njogadoresJogo;
        jogo.versaoJogo = request.body.jogo.versaoJogo;
        jogo.genero.idGenero = request.body.jogo.genero_idGenero;
        jogo.estado.idEstado = request.body.jogo.estado_idEstado;

        const atualizou = await jogo.update();
        if (atualizou == true) {
            const objResposta = {
                cod: 1,
                status: true,
                jogos: [{
                    "jogo": {
                        "idJogo": jogo.idJogo,
                        "nomeJogo": jogo.nomeJogo,
                        "precoJogo": jogo.precoJogo,
                        "dataJogo": jogo.dataJogo,
                        "metacriticJogo": jogo.metacriticJogo,
                        "njogadoresJogo": jogo.njogadoresJogo,
                        "versaoJogo": jogo.versaoJogo,
                        "genero_idGenero": jogo.genero.idGenero,
                        "estado_idEstado": jogo.estado.idEstado
                    }
                }]
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao atualizar jogo",
                jogos: [{
                    "jogo": {
                        "idJogo": jogo.idJogo,
                        "nomeJogo": jogo.nomeJogo,
                        "precoJogo": jogo.precoJogo,
                        "dataJogo": jogo.dataJogo,
                        "metacriticJogo": jogo.metacriticJogo,
                        "njogadoresJogo": jogo.njogadoresJogo,
                        "versaoJogo": jogo.versaoJogo,
                        "genero_idGenero": jogo.genero.idGenero,
                        "estado_idEstado": jogo.estado.idEstado
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }

    async delete(request, response) {
        const jogo = new Jogo();
        jogo.idJogo = request.params.idJogo;

        const excluiu = await jogo.delete();
        if (excluiu == true) {
            const objResposta = {
                cod: 1,
                status: true,
                msg: "Excluído com sucesso",
                jogos: [{
                    "jogo": {
                        "idJogo": jogo.idJogo,
                        "nomeJogo": jogo.nomeJogo,
                        "precoJogo": jogo.precoJogo,
                        "dataJogo": jogo.dataJogo,
                        "metacriticJogo": jogo.metacriticJogo,
                        "njogadoresJogo": jogo.njogadoresJogo,
                        "versaoJogo": jogo.versaoJogo,
                        "genero_idGenero": jogo.genero.idGenero,
                        "estado_idEstado": jogo.estado.idEstado
                    }
                }]
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao excluir jogo",
                jogos: [{
                    "jogo": {
                        "idJogo": jogo.idJogo,
                        "nomeJogo": jogo.nomeJogo,
                        "precoJogo": jogo.precoJogo,
                        "dataJogo": jogo.dataJogo,
                        "metacriticJogo": jogo.metacriticJogo,
                        "njogadoresJogo": jogo.njogadoresJogo,
                        "versaoJogo": jogo.versaoJogo,
                        "genero_idGenero": jogo.genero.idGenero,
                        "estado_idEstado": jogo.estado.idEstado
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }
};
