// Importa o módulo express para criação de APIs.
const express = require('express');
// Importa o modelo Disciplina para realizar operações relacionadas à entidade Disciplina.
const Disciplina = require('../model/Disciplina');
const fs = require('fs');
const csv = require('csv-parser');
// Exporta a classe DisciplinaControl, que controla as operações de CRUD (Create, Read, Update, Delete) para o Disciplina.
module.exports = class DisciplinaControl {
    // Método assíncrono para criar um novo disciplina.
    async create(request, response) {
        // Cria uma nova instância do modelo Disciplina.
        var disciplina = new Disciplina();
        // Atribui o nome do disciplina passado no corpo da requisição (request body) à instância criada.
        disciplina.nomeDisciplina = request.body.disciplina.nomeDisciplina;
        disciplina.professor_idProfessor = request.body.disciplina.professor_idProfessor;
        // Chama o método create() do modelo Disciplina para inserir o novo disciplina no banco de dados.
        console.log(disciplina);
        const isCreated = await disciplina.create();
        // Cria um objeto de resposta contendo o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Disciplina criado com sucesso' : 'Erro ao criar o disciplina'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    static async createByCSV(request, response) {
        if (!request.file) {
            return response.status(400).json({
                cod: 0,
                status: false,
                msg: "Nenhum arquivo foi enviado."
            });
        }

        const disciplinas = [];
        fs.createReadStream(request.file.path)
            .pipe(csv({ separator: ',' })) // Usa o cabeçalho do arquivo!
            .on('data', (row) => {
                if (row.nomeDisciplina && row.professor_idProfessor) {
                    const disciplina = new Disciplina();
                    disciplina.nomeDisciplina = String(row.nomeDisciplina).trim();
                    disciplina.professor_idProfessor = Number(row.professor_idProfessor);
                    disciplinas.push(disciplina);
                }
            })
            .on('end', async () => {
                const resultados = [];
                for (const disciplina of disciplinas) {
                    const isCreated = await disciplina.create();
                    if (isCreated) {
                        resultados.push({
                            nomeDisciplina: disciplina.nomeDisciplina,
                            professor_idProfessor: disciplina.professor_idProfessor
                        });
                    }
                }
                response.status(201).json({
                    cod: 1,
                    status: resultados.length > 0,
                    msg: resultados.length > 0 ? 'Disciplinas cadastradas com sucesso' : 'Nenhuma disciplina cadastrada',
                    disciplinas: resultados
                });
                fs.unlink(request.file.path, (err) => {
                    if (err) console.error("Erro ao remover o arquivo:", err);
                });
            })
            .on('error', (err) => {
                console.error("Erro ao processar o arquivo CSV:", err);
                response.status(500).json({
                    cod: 0,
                    status: false,
                    msg: "Erro ao processar o arquivo CSV."
                });
            });
    }

    // Método assíncrono para excluir um disciplina existente.
    async delete(request, response) {
        // Cria uma nova instância do modelo Disciplina.
        var disciplina = new Disciplina();
        // Atribui o ID do disciplina passado como parâmetro na URL (request params) à instância criada.
        disciplina.idDisciplina = request.params.idDisciplina;
        // Chama o método delete() do modelo Disciplina para excluir o disciplina do banco de dados.
        const isDeleted = await disciplina.delete();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Disciplina excluído com sucesso' : 'Erro ao excluir o disciplina'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um disciplina existente.
    async update(request, response) {
        // Cria uma nova instância do modelo Disciplina.
        var disciplina = new Disciplina();
        // Atribui o ID e o nome do disciplina passados na URL e no corpo da requisição, respectivamente.
        disciplina.idDisciplina = request.params.idDisciplina;
        disciplina.nomeDisciplina = request.body.disciplina.nomeDisciplina;
        disciplina.professor_idProfessor = request.body.disciplina.professor_idProfessor;
        // Chama o método update() do modelo Disciplina para atualizar o disciplina no banco de dados.
        const isUpdated = await disciplina.update();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Disciplina atualizado com sucesso' : 'Erro ao atualizar o disciplina'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter todos os disciplinas.
    async readAll(request, response) {
        // Cria uma nova instância do modelo Disciplina.
        var disciplina = new Disciplina();
        // Chama o método readAll() para buscar todos os disciplinas no banco de dados.
        const resultado = await disciplina.readAll();
        // Cria um objeto de resposta contendo o código, status, mensagem e a lista de disciplinas.
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            disciplinas: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um disciplina pelo ID.
    async realAllById(request, response) {
        // Cria uma nova instância do modelo Disciplina.
        var disciplina = new Disciplina();
        // Atribui o ID do disciplina passado como parâmetro na URL (request params) à instância criada.
        disciplina.idDisciplina = request.params.idDisciplina;

        // Chama o método readByID() para buscar o disciplina pelo ID no banco de dados.
        const resultado = await disciplina.readByID();
        // Cria um objeto de resposta contendo o código, status, mensagem e o disciplina encontrado (ou não).
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Disciplina encontrado' : 'Disciplina não encontrado',
            disciplina: resultado
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
        const disciplinas = [];

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
                    const disciplina = new Disciplina();
                    linha[0] = linha[0].trim();
                    linha[0] = linha[0].replace('\n', '');
                    linha[0] = linha[0].replace('\r', '');
                    if (linha[0].length > 5) {
                        disciplina.nomeDisciplina = linha[0]; // Assumindo que a primeira coluna é 'nome'
                        disciplina.create();
                        disciplinas.push(disciplina);
                    }
                }
            }

            const objResposta = {
                cod: 1,
                status: true,
                msg: 'cadastrado com sucesso',
                disciplinas: disciplinas
            }
            response.status(201).send(objResposta);

            // console.log('Disciplinas:', disciplinas);
        });

        //########################################
        /*  const disciplinas = [];
  
          // Lê o arquivo CSV e processa linha por linha
          await fs.createReadStream(request.file.path)
              .pipe(csv())
              .on('data', (row) => {
                  // Para cada linha, cria uma instância de Disciplina e atribui os valores do CSV
                  const disciplina = new Disciplina();
                  disciplina.nomeDisciplina = row.nome;
                  disciplinas.push(disciplina);
              })
              .on('end', async () => {
                  // Após processar o CSV, faz a inserção de cada disciplina
                  try {
                      for (let i = 0; i < disciplinas.length; i++) {
                          await disciplinas[i].create();
                      }
                      // Responde com sucesso após todos os disciplinas serem cadastrados
                      return response.status(200).send({
                          cod: 1,
                          status: true,
                          msg: `${disciplinas.length} disciplinas cadastrados com sucesso`
                      });
                  } catch (error) {
                      return response.status(500).send({
                          cod: 0,
                          status: false,
                          msg: "Erro ao cadastrar disciplinas",
                          error: error.message
                      });
                  }
              });
              */
    }

};
