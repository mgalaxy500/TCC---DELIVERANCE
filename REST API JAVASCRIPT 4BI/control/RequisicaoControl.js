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
        // Cria uma nova instância do modelo Requisicao.
        var requisicao = new Requisicao();
        // Atribui o nome do requisicao passado no corpo da requisição (request body) à instância criada.
        requisicao.nomeRequisicao = request.body.requisicao.nomeRequisicao;
        // Chama o método create() do modelo Requisicao para inserir o novo requisicao no banco de dados.
        const isCreated = await requisicao.create();
        // Cria um objeto de resposta contendo o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Requisicao criado com sucesso' : 'Erro ao criar o requisicao'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um requisicao existente.
    async delete(request, response) {
        // Cria uma nova instância do modelo Requisicao.
        var requisicao = new Requisicao();
        // Atribui o ID do requisicao passado como parâmetro na URL (request params) à instância criada.
        requisicao.idRequisicao = request.params.idRequisicao;
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
        // Cria uma nova instância do modelo Requisicao.
        var requisicao = new Requisicao();
        // Atribui o ID e o nome do requisicao passados na URL e no corpo da requisição, respectivamente.
        requisicao.idRequisicao = request.params.idRequisicao;
        requisicao.nomeRequisicao = request.body.requisicao.nomeRequisicao;
        // Chama o método update() do modelo Requisicao para atualizar o requisicao no banco de dados.
        const isUpdated = await requisicao.update();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Requisicao atualizado com sucesso' : 'Erro ao atualizar o requisicao'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
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

    async createByCSV(request, response) {
        const multer = require('multer'); //npm install multer --save
        const csv = require('csv-parser'); //npm install csv-parser --save
        const fs = require('fs');
        const upload = multer({ dest: 'uploads/' });

        // Verifica se o arquivo foi enviado
        if (!request.file) {
            return response.status(400).send({
                cod: 0,
                status: false,
                msg: "Nenhum arquivo foi enviado."
            });
        }

        //#############
        const requisicaos = [];

        fs.readFile(request.file.path, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo CSV:', err);
                return;
            }

            const linhas = data.split('\n');
            // Assumindo que a primeira linha não é um cabeçalho e contém dados
            for (let i = 0; i < linhas.length; i++) {
                const linha = linhas[i].split(',');

                if (linha.length >= 1) { // Verifica se há pelo menos uma coluna
                    const requisicao = new Requisicao();
                    linha[0] = linha[0].trim();
                    linha[0] = linha[0].replace('\n', '');
                    linha[0] = linha[0].replace('\r', '');
                    if (linha[0].length > 5) {
                        requisicao.nomeRequisicao = linha[0]; // Assumindo que a primeira coluna é 'nome'
                        requisicao.create();
                        requisicaos.push(requisicao);
                    }
                }
            }

            const objResposta = {
                cod: 1,
                status: true,
                msg: 'cadastrado com sucesso',
                requisicaos: requisicaos
            }
            response.status(201).send(objResposta);

            // console.log('Requisicaos:', requisicaos);
        });

        //########################################
        /*  const requisicaos = [];
  
          // Lê o arquivo CSV e processa linha por linha
          await fs.createReadStream(request.file.path)
              .pipe(csv())
              .on('data', (row) => {
                  // Para cada linha, cria uma instância de Requisicao e atribui os valores do CSV
                  const requisicao = new Requisicao();
                  requisicao.nomeRequisicao = row.nome;
                  requisicaos.push(requisicao);
              })
              .on('end', async () => {
                  // Após processar o CSV, faz a inserção de cada requisicao
                  try {
                      for (let i = 0; i < requisicaos.length; i++) {
                          await requisicaos[i].create();
                      }
                      // Responde com sucesso após todos os requisicaos serem cadastrados
                      return response.status(200).send({
                          cod: 1,
                          status: true,
                          msg: `${requisicaos.length} requisicaos cadastrados com sucesso`
                      });
                  } catch (error) {
                      return response.status(500).send({
                          cod: 0,
                          status: false,
                          msg: "Erro ao cadastrar requisicaos",
                          error: error.message
                      });
                  }
              });
              */
    }

};
