// Importa o módulo express para criação de APIs.
const express = require('express');
// Importa o modelo Requisicao para realizar operações relacionadas à entidade Requisicao.
const Requisicao = require('../model/Requisicao');
const fs = require('fs');
const csv = require('csv-parser');
// Exporta a classe RequisicaoControl, que controla as operações de CRUD (Create, Read, Update, Delete) para o Requisicao.
module.exports = class RequisicaoControl {
    // Método assíncrono para criar um novo requisicao.
    async create(request, response) {
        var requisicao = new Requisicao();
        requisicao.nomeRequisicao = request.body.requisicao.nomeRequisicao;
        requisicao.matriculaAluno = request.body.requisicao.matriculaAluno;
        requisicao.idProfessor = request.body.requisicao.idProfessor;
        requisicao.idDisciplina = request.body.requisicao.idDisciplina;
        requisicao.justRequisicao = request.body.requisicao.justRequisicao;
        requisicao.dataRequisicao = request.body.requisicao.dataRequisicao;
        requisicao.gNRequisicao = request.body.requisicao.gNRequisicao;
        requisicao.modeloRequisicao = request.body.requisicao.modeloRequisicao;
        requisicao.statusRequisicao = request.body.requisicao.statusRequisicao;
        console.log(request.body.requisicao);
        const isCreated = await requisicao.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Requisicao criado com sucesso' : 'Erro ao criar o requisicao'
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um requisicao existente.
    async delete(request, response) {
        // Cria uma nova instância do modelo Requisicao.
        var requisicao = new Requisicao();
        // Atribui o ID do requisicao passado como parâmetro na URL (request params) à instância criada.
        requisicao.idRequisicao = Number(request.params.idRequisicao);
        // Chama o método delete() do modelo Requisicao para excluir o requisicao do banco de dados.
        const isDeleted = await requisicao.delete();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Requisicao excluído com sucesso' : 'Erro ao excluir o requisicao'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um requisicao existente.
    async update(request, response) {
        var requisicao = new Requisicao();
        requisicao.idRequisicao = Number(request.params.idRequisicao);
        requisicao.statusRequisicao = request.body.requisicao.statusRequisicao;
        console.log('params:', request.params);
        console.log('body:', request.body);
        console.log('ID requisicao no controller:', requisicao.idRequisicao);
        const isUpdated = await requisicao.update();
        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Requisicao atualizado com sucesso' : 'Erro ao atualizar o requisicao'
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter todos os requisicaos.
    async readAll(request, response) {
        // Cria uma nova instância do modelo Requisicao.
        var requisicao = new Requisicao();
        // Chama o método readAll() para buscar todos os requisicaos no banco de dados.
        const resultado = await requisicao.readAll();
        // Cria um objeto de resposta contendo o código, status, mensagem e a lista de requisicaos.
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            requisicaos: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um requisicao pelo ID.
    async realAllById(request, response) {
        // Cria uma nova instância do modelo Requisicao.
        var requisicao = new Requisicao();
        // Atribui o ID do requisicao passado como parâmetro na URL (request params) à instância criada.
        requisicao.idRequisicao = request.params.idRequisicao;

        // Chama o método readByID() para buscar o requisicao pelo ID no banco de dados.
        const resultado = await requisicao.readByID();
        // Cria um objeto de resposta contendo o código, status, mensagem e o requisicao encontrado (ou não).
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Requisicao encontrado' : 'Requisicao não encontrado',
            requisicao: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

};
