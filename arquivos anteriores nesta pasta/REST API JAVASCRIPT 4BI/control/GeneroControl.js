// Importa o módulo express para criação de APIs.
const express = require('express');
// Importa o modelo Genero para realizar operações relacionadas à entidade Genero.
const Genero = require('../model/Genero');
const fs = require('fs');
const csv = require('csv-parser');
// Exporta a classe GeneroControl, que controla as operações de CRUD (Create, Read, Update, Delete) para o Genero.
module.exports = class GeneroControl {
    // Método assíncrono para criar um novo genero.
    async create(request, response) {
        // Cria uma nova instância do modelo Genero.
        var genero = new Genero();
        // Atribui o nome do genero passado no corpo da requisição (request body) à instância criada.
        genero.nomeGenero = request.body.genero.nomeGenero;
        // Chama o método create() do modelo Genero para inserir o novo genero no banco de dados.
        const isCreated = await genero.create();
        // Cria um objeto de resposta contendo o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Genero criado com sucesso' : 'Erro ao criar o genero'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um genero existente.
    async delete(request, response) {
        // Cria uma nova instância do modelo Genero.
        var genero = new Genero();
        // Atribui o ID do genero passado como parâmetro na URL (request params) à instância criada.
        genero.idGenero = request.params.idGenero;
        // Chama o método delete() do modelo Genero para excluir o genero do banco de dados.
        const isDeleted = await genero.delete();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Genero excluído com sucesso' : 'Erro ao excluir o genero'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um genero existente.
    async update(request, response) {
        // Cria uma nova instância do modelo Genero.
        var genero = new Genero();
        // Atribui o ID e o nome do genero passados na URL e no corpo da requisição, respectivamente.
        genero.idGenero = request.params.idGenero;
        genero.nomeGenero = request.body.genero.nomeGenero;
        // Chama o método update() do modelo Genero para atualizar o genero no banco de dados.
        const isUpdated = await genero.update();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Genero atualizado com sucesso' : 'Erro ao atualizar o genero'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter todos os generos.
    async readAll(request, response) {
        // Cria uma nova instância do modelo Genero.
        var genero = new Genero();
        // Chama o método readAll() para buscar todos os generos no banco de dados.
        const resultado = await genero.readAll();
        // Cria um objeto de resposta contendo o código, status, mensagem e a lista de generos.
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            generos: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um genero pelo ID.
    async realAllById(request, response) {
        // Cria uma nova instância do modelo Genero.
        var genero = new Genero();
        // Atribui o ID do genero passado como parâmetro na URL (request params) à instância criada.
        genero.idGenero = request.params.idGenero;

        // Chama o método readByID() para buscar o genero pelo ID no banco de dados.
        const resultado = await genero.readByID();
        // Cria um objeto de resposta contendo o código, status, mensagem e o genero encontrado (ou não).
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Genero encontrado' : 'Genero não encontrado',
            genero: resultado
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
        const generos = [];

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
                    const genero = new Genero();
                    linha[0] = linha[0].trim();
                    linha[0] = linha[0].replace('\n', '');
                    linha[0] = linha[0].replace('\r', '');
                    if (linha[0].length > 5) {
                        genero.nomeGenero = linha[0]; // Assumindo que a primeira coluna é 'nome'
                        genero.create();
                        generos.push(genero);
                    }
                }
            }

            const objResposta = {
                cod: 1,
                status: true,
                msg: 'cadastrado com sucesso',
                generos: generos
            }
            response.status(201).send(objResposta);

            // console.log('Generos:', generos);
        });

        //########################################
        /*  const generos = [];
  
          // Lê o arquivo CSV e processa linha por linha
          await fs.createReadStream(request.file.path)
              .pipe(csv())
              .on('data', (row) => {
                  // Para cada linha, cria uma instância de Genero e atribui os valores do CSV
                  const genero = new Genero();
                  genero.nomeGenero = row.nome;
                  generos.push(genero);
              })
              .on('end', async () => {
                  // Após processar o CSV, faz a inserção de cada genero
                  try {
                      for (let i = 0; i < generos.length; i++) {
                          await generos[i].create();
                      }
                      // Responde com sucesso após todos os generos serem cadastrados
                      return response.status(200).send({
                          cod: 1,
                          status: true,
                          msg: `${generos.length} generos cadastrados com sucesso`
                      });
                  } catch (error) {
                      return response.status(500).send({
                          cod: 0,
                          status: false,
                          msg: "Erro ao cadastrar generos",
                          error: error.message
                      });
                  }
              });
              */
    }

};
