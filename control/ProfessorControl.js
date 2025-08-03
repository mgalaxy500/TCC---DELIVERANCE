// Importa o módulo express para criação de APIs.
const express = require('express');
// Importa o modelo Professor para realizar operações relacionadas à entidade Professor.
const Professor = require('../model/Professor');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// Exporta a classe ProfessorControl, que controla as operações de CRUD (Create, Read, Update, Delete) para o Professor.
module.exports = class ProfessorControl {
    // Método assíncrono para criar um novo professor.
    async create(request, response) {
        // Cria uma nova instância do modelo Professor.
        var professor = new Professor();
        // Atribui o nome do professor passado no corpo da requisição (request body) à instância criada.
        professor.nomeProfessor = request.body.professor.nomeProfessor;
        // Chama o método create() do modelo Professor para inserir o novo professor no banco de dados.
        const isCreated = await professor.create();
        // Cria um objeto de resposta contendo o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Professor criado com sucesso' : 'Erro ao criar o professor'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    async createByJSON(request, response) {
        const professors = []; // Array para armazenar os professors processados
    
        try {
            // Verifica se `request.body` é um array de professors
            if (Array.isArray(request.body)) {
                for (const item of request.body) {
                    if (item.nomeProfessor && item.nomeProfessor.length > 5) {
                        const professor = new Professor();
                        professor.nomeProfessor = item.nomeProfessor.trim();
                        const isCreated = await professor.create();
    
                        if (isCreated) {
                            professors.push(professor);
                        }
                    }
                }
    
                // Envia a resposta com sucesso
                response.status(201).send({
                    cod: 1,
                    status: true,
                    msg: 'Professors cadastrados com sucesso',
                    professors: professors
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
    // Método assíncrono para excluir um professor existente.
    async delete(request, response) {
        // Cria uma nova instância do modelo Professor.
        var professor = new Professor();
        // Atribui o ID do professor passado como parâmetro na URL (request params) à instância criada.
        professor.idProfessor = request.params.idProfessor;
        // Chama o método delete() do modelo Professor para excluir o professor do banco de dados.
        const isDeleted = await professor.delete();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Professor excluído com sucesso' : 'Erro ao excluir o professor'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um professor existente.
    async update(request, response) {
        // Cria uma nova instância do modelo Professor.
        var professor = new Professor();
        // Atribui o ID e o nome do professor passados na URL e no corpo da requisição, respectivamente.
        professor.idProfessor = request.params.idProfessor;
        professor.nomeProfessor = request.body.professor.nomeProfessor;
        // Chama o método update() do modelo Professor para atualizar o professor no banco de dados.
        const isUpdated = await professor.update();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Professor atualizado com sucesso' : 'Erro ao atualizar o professor'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter todos os professors.
    async readAll(request, response) {
        // Cria uma nova instância do modelo Professor.
        var professor = new Professor();
        // Chama o método readAll() para buscar todos os professors no banco de dados.
        const resultado = await professor.readAll();
        // Cria um objeto de resposta contendo o código, status, mensagem e a lista de professors.
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            professors: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um professor pelo ID.
    async realAllById(request, response) {
        // Cria uma nova instância do modelo Professor.
        var professor = new Professor();
        // Atribui o ID do professor passado como parâmetro na URL (request params) à instância criada.
        professor.idProfessor = request.params.idProfessor;

        // Chama o método readByID() para buscar o professor pelo ID no banco de dados.
        const resultado = await professor.readByID();
        // Cria um objeto de resposta contendo o código, status, mensagem e o professor encontrado (ou não).
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Professor encontrado' : 'Professor não encontrado',
            professor: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }
}
