// Importa o módulo express para criação de APIs.
const express = require('express');
// Importa o modelo Aluno para realizar operações relacionadas à entidade Aluno.
const Aluno = require('../model/Aluno');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// Exporta a classe AlunoControl, que controla as operações de CRUD (Create, Read, Update, Delete) para o Aluno.
module.exports = class AlunoControl {
    // Método assíncrono para criar um novo aluno.
    async create(request, response) {
        // Cria uma nova instância do modelo Aluno.
        var aluno = new Aluno();
        // Atribui o nome do aluno passado no corpo da requisição (request body) à instância criada.
        aluno.matriculaAluno = request.body.aluno.matriculaAluno;
        aluno.nomeAluno = request.body.aluno.nomeAluno;
        aluno.turmaAluno = request.body.aluno.turmaAluno;
        // Chama o método create() do modelo Aluno para inserir o novo aluno no banco de dados.
        const isCreated = await aluno.create();
        // Cria um objeto de resposta contendo o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Aluno criado com sucesso' : 'Erro ao criar o aluno'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    async createByJSON(request, response) {
        const aluno = []; // Array para armazenar os aluno processados
    
        try {
            // Verifica se `request.body` é um array de aluno
            if (Array.isArray(request.body)) {
                for (const item of request.body) {
                    if (item.nomeAluno && item.nomeAluno.length > 5) {
                        const aluno = new Aluno();
                        aluno.nomeAluno = item.nomeAluno.trim();
                        const isCreated = await aluno.create();
    
                        if (isCreated) {
                            aluno.push(aluno);
                        }
                    }
                }
    
                // Envia a resposta com sucesso
                response.status(201).send({
                    cod: 1,
                    status: true,
                    msg: 'Aluno cadastrados com sucesso',
                    aluno: aluno
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
    // Método assíncrono para excluir um aluno existente.
    async delete(request, response) {
        // Cria uma nova instância do modelo Aluno.
        var aluno = new Aluno();
        // Atribui o ID do aluno passado como parâmetro na URL (request params) à instância criada.
        aluno.matriculaAluno = request.params.matriculaAluno
        // Chama o método delete() do modelo Aluno para excluir o aluno do banco de dados.
        const isDeleted = await aluno.delete();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Aluno excluído com sucesso' : 'Erro ao excluir o aluno'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um aluno existente.
    async update(request, response) {
        // Cria uma nova instância do modelo Aluno.
        var aluno = new Aluno();
        // Atribui o ID e o nome do aluno passados na URL e no corpo da requisição, respectivamente.
        aluno.matriculaAluno = request.params.matriculaAluno;
        aluno.nomeAluno = request.body.aluno.nomeAluno;
        aluno.turmaAluno = request.body.aluno.turmaAluno;
        // Chama o método update() do modelo Aluno para atualizar o aluno no banco de dados.
        const isUpdated = await aluno.update();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Aluno atualizado com sucesso' : 'Erro ao atualizar o aluno'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter todos os aluno.
    async readAll(request, response) {
        // Cria uma nova instância do modelo Aluno.
        var aluno = new Aluno();
        // Chama o método readAll() para buscar todos os aluno no banco de dados.
        const resultado = await aluno.readAll();
        // Cria um objeto de resposta contendo o código, status, mensagem e a lista de aluno.
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            aluno: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um aluno pelo ID.
    async realAllById(request, response) {
        // Cria uma nova instância do modelo Aluno.
        var aluno = new Aluno();
        // Atribui o ID do aluno passado como parâmetro na URL (request params) à instância criada.
        aluno.matriculaAluno = request.params.matriculaAluno;

        // Chama o método readByID() para buscar o aluno pelo ID no banco de dados.
        const resultado = await aluno.readByID();
        // Cria um objeto de resposta contendo o código, status, mensagem e o aluno encontrado (ou não).
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Aluno encontrado' : 'Aluno não encontrado',
            aluno: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }
}
