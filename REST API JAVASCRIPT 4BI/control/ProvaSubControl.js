// Importa o módulo express para criação de APIs.
const express = require('express');
// Importa o modelo ProvaSub para realizar operações relacionadas à entidade ProvaSub.
const ProvaSub = require('../model/ProvaSub');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// Exporta a classe ProvaSubControl, que controla as operações de CRUD (Create, Read, Update, Delete) para o ProvaSub.
module.exports = class ProvaSubControl {
    // Método assíncrono para criar um novo provaSub.
    async create(request, response) {
        // Cria uma nova instância do modelo ProvaSub.
        var provaSub = new ProvaSub();
        // Atribui o nome do provaSub passado no corpo da requisição (request body) à instância criada.
        provaSub.nomeProvaSub = request.body.provaSub.nomeProvaSub;
        // Chama o método create() do modelo ProvaSub para inserir o novo provaSub no banco de dados.
        const isCreated = await provaSub.create();
        // Cria um objeto de resposta contendo o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'ProvaSub criado com sucesso' : 'Erro ao criar o provaSub'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    async createByJSON(request, response) {
        const provaSubs = []; // Array para armazenar os provaSubs processados
    
        try {
            // Verifica se `request.body` é um array de provaSubs
            if (Array.isArray(request.body)) {
                for (const item of request.body) {
                    if (item.nomeProvaSub && item.nomeProvaSub.length > 5) {
                        const provaSub = new ProvaSub();
                        provaSub.nomeProvaSub = item.nomeProvaSub.trim();
                        const isCreated = await provaSub.create();
    
                        if (isCreated) {
                            provaSubs.push(provaSub);
                        }
                    }
                }
    
                // Envia a resposta com sucesso
                response.status(201).send({
                    cod: 1,
                    status: true,
                    msg: 'ProvaSubs cadastrados com sucesso',
                    provaSubs: provaSubs
                });
    
            } else {
                console.error('O conteúdo do JSON deve ser um array.');
                return response.status(400).send({
                    cod: 0,
                    status: false,
                    msg: "Formato do JSON inválido. Deve ser um array de objetos."
                });
            }
    
        } catch (error) {
            console.error('Erro ao processar o JSON:', error);
            return response.status(500).send({
                cod: 0,
                status: false,
                msg: "Erro ao processar o JSON."
            });
        }
    }
    // Método assíncrono para excluir um provaSub existente.
    async delete(request, response) {
        // Cria uma nova instância do modelo ProvaSub.
        var provaSub = new ProvaSub();
        // Atribui o ID do provaSub passado como parâmetro na URL (request params) à instância criada.
        provaSub.idProvaSub = request.params.idProvaSub;
        // Chama o método delete() do modelo ProvaSub para excluir o provaSub do banco de dados.
        const isDeleted = await provaSub.delete();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'ProvaSub excluído com sucesso' : 'Erro ao excluir o provaSub'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um provaSub existente.
    async update(request, response) {
        // Cria uma nova instância do modelo ProvaSub.
        var provaSub = new ProvaSub();
        // Atribui o ID e o nome do provaSub passados na URL e no corpo da requisição, respectivamente.
        provaSub.idProvaSub = request.params.idProvaSub;
        provaSub.nomeProvaSub = request.body.provaSub.nomeProvaSub;
        // Chama o método update() do modelo ProvaSub para atualizar o provaSub no banco de dados.
        const isUpdated = await provaSub.update();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'ProvaSub atualizado com sucesso' : 'Erro ao atualizar o provaSub'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter todos os provaSubs.
    async readAll(request, response) {
        // Cria uma nova instância do modelo ProvaSub.
        var provaSub = new ProvaSub();
        // Chama o método readAll() para buscar todos os provaSubs no banco de dados.
        const resultado = await provaSub.readAll();
        // Cria um objeto de resposta contendo o código, status, mensagem e a lista de provaSubs.
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            provaSubs: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um provaSub pelo ID.
    async realAllById(request, response) {
        // Cria uma nova instância do modelo ProvaSub.
        var provaSub = new ProvaSub();
        // Atribui o ID do provaSub passado como parâmetro na URL (request params) à instância criada.
        provaSub.idProvaSub = request.params.idProvaSub;

        // Chama o método readByID() para buscar o provaSub pelo ID no banco de dados.
        const resultado = await provaSub.readByID();
        // Cria um objeto de resposta contendo o código, status, mensagem e o provaSub encontrado (ou não).
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'ProvaSub encontrado' : 'ProvaSub não encontrado',
            provaSub: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }
}
