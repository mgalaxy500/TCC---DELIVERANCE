// Importa o módulo express para criação de APIs.
const express = require('express');
// Importa o modelo Estado para realizar operações relacionadas à entidade Estado.
const Estado = require('../model/Estado');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// Exporta a classe EstadoControl, que controla as operações de CRUD (Create, Read, Update, Delete) para o Estado.
module.exports = class EstadoControl {
    // Método assíncrono para criar um novo estado.
    async create(request, response) {
        // Cria uma nova instância do modelo Estado.
        var estado = new Estado();
        // Atribui o nome do estado passado no corpo da requisição (request body) à instância criada.
        estado.nomeEstado = request.body.estado.nomeEstado;
        // Chama o método create() do modelo Estado para inserir o novo estado no banco de dados.
        const isCreated = await estado.create();
        // Cria um objeto de resposta contendo o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Estado criado com sucesso' : 'Erro ao criar o estado'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    async createByJSON(request, response) {
        const estados = []; // Array para armazenar os estados processados
    
        try {
            // Verifica se `request.body` é um array de estados
            if (Array.isArray(request.body)) {
                for (const item of request.body) {
                    if (item.nomeEstado && item.nomeEstado.length > 5) {
                        const estado = new Estado();
                        estado.nomeEstado = item.nomeEstado.trim();
                        const isCreated = await estado.create();
    
                        if (isCreated) {
                            estados.push(estado);
                        }
                    }
                }
    
                // Envia a resposta com sucesso
                response.status(201).send({
                    cod: 1,
                    status: true,
                    msg: 'Estados cadastrados com sucesso',
                    estados: estados
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
    // Método assíncrono para excluir um estado existente.
    async delete(request, response) {
        // Cria uma nova instância do modelo Estado.
        var estado = new Estado();
        // Atribui o ID do estado passado como parâmetro na URL (request params) à instância criada.
        estado.idEstado = request.params.idEstado;
        // Chama o método delete() do modelo Estado para excluir o estado do banco de dados.
        const isDeleted = await estado.delete();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Estado excluído com sucesso' : 'Erro ao excluir o estado'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um estado existente.
    async update(request, response) {
        // Cria uma nova instância do modelo Estado.
        var estado = new Estado();
        // Atribui o ID e o nome do estado passados na URL e no corpo da requisição, respectivamente.
        estado.idEstado = request.params.idEstado;
        estado.nomeEstado = request.body.estado.nomeEstado;
        // Chama o método update() do modelo Estado para atualizar o estado no banco de dados.
        const isUpdated = await estado.update();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Estado atualizado com sucesso' : 'Erro ao atualizar o estado'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter todos os estados.
    async readAll(request, response) {
        // Cria uma nova instância do modelo Estado.
        var estado = new Estado();
        // Chama o método readAll() para buscar todos os estados no banco de dados.
        const resultado = await estado.readAll();
        // Cria um objeto de resposta contendo o código, status, mensagem e a lista de estados.
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            estados: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um estado pelo ID.
    async realAllById(request, response) {
        // Cria uma nova instância do modelo Estado.
        var estado = new Estado();
        // Atribui o ID do estado passado como parâmetro na URL (request params) à instância criada.
        estado.idEstado = request.params.idEstado;

        // Chama o método readByID() para buscar o estado pelo ID no banco de dados.
        const resultado = await estado.readByID();
        // Cria um objeto de resposta contendo o código, status, mensagem e o estado encontrado (ou não).
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Estado encontrado' : 'Estado não encontrado',
            estado: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    
    
}
