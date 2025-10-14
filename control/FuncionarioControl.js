const express = require('express');
const Funcionario = require('../model/Funcionario');
const csv = require('csv-parser');
const fs = require('fs');

module.exports = class FuncionarioControl {
    
    async readAll(request, response) {
        const funcionario = new Funcionario();
        const dadosFuncionarios = await funcionario.readAll();
        const objResposta = {
            cod: 1,
            status: true,
            funcionarios: dadosFuncionarios
        };
        response.status(200).send(objResposta);
    }

    async readById(request, response) {
        const funcionario = new Funcionario();
        const idFuncionario = request.params.idFuncionario;

        const dadosFuncionario = await funcionario.readByID(idFuncionario);
        const objResposta = {
            cod: 1,
            status: true,
            funcionarios: dadosFuncionario
        };
        response.status(200).send(objResposta);
    }

    async create(request, response) {
        const funcionario = new Funcionario();

        funcionario.emailFuncionario = request.body.funcionario.emailFuncionario;
        funcionario.senhaFuncionario = request.body.funcionario.senhaFuncionario;

        const cadastrou = await funcionario.create();
        if (cadastrou == true) {
            const objResposta = {
                cod: 1,
                status: true,
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "emailFuncionario": funcionario.emailFuncionario,
                        "senhaFuncionario": funcionario.senhaFuncionario,
                    }
                }]
            };
            response.status(201).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao cadastrar funcionario",
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "emailFuncionario": funcionario.emailFuncionario,
                        "senhaFuncionario": funcionario.sehaFuncionario,
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }

    static async createByCSV(request, response) {
        if (!request.file) {
            return response.status(400).json({
                cod: 0,
                status: false,
                msg: "Nenhum arquivo foi enviado."
            });
        }

        const funcionarios = [];
        fs.createReadStream(request.file.path)
            .pipe(csv({ separator: ',' })) // Usa o cabeçalho do arquivo!
            .on('data', (row) => {
                if (row.emailFuncionario && row.senhaFuncionario) {
                    const funcionario = new Funcionario();
                    funcionario.emailFuncionario = String(row.emailFuncionario).trim();
                    funcionario.senhaFuncionario = String(row.senhaFuncionario).trim();
                    funcionarios.push(funcionario);
                }
            })
            .on('end', async () => {
                const resultados = [];
                for (const funcionario of funcionarios) {
                    const isCreated = await funcionario.create();
                    if (isCreated) {
                        resultados.push({
                            emailFuncionario: funcionario.emailFuncionario,
                            senhaFuncionario: funcionario.senhaFuncionario
                        });
                    }
                }
                response.status(201).json({
                    cod: 1,
                    status: resultados.length > 0,
                    msg: resultados.length > 0 ? 'Funcionários cadastrados com sucesso' : 'Nenhum funcionário cadastrado',
                    funcionarios: resultados
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
    
    async update(request, response) {
        const funcionario = new Funcionario();

        funcionario.idFuncionario = request.params.idFuncionario;
        funcionario.emailFuncionario = request.body.funcionario.emailFuncionario;

        const atualizou = await funcionario.update();
        if (atualizou == true) {
            const objResposta = {
                cod: 1,
                status: true,
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "emailFuncionario": funcionario.emailFuncionario,
                    }
                }]
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao atualizar funcionario",
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "emailFuncionario": funcionario.emailFuncionario,
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }

    async delete(request, response) {
        const funcionario = new Funcionario();
        funcionario.idFuncionario = request.params.idFuncionario;

        const excluiu = await funcionario.delete();
        if (excluiu == true) {
            const objResposta = {
                cod: 1,
                status: true,
                msg: "Excluído com sucesso",
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "emailFuncionario": funcionario.emailFuncionario,
                        "senhaFuncionario": funcionario.senhaFuncionario,
                    }
                }]
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao excluir funcionario",
                funcionarios: [{
                    "funcionario": {
                        "idFuncionario": funcionario.idFuncionario,
                        "emailFuncionario": funcionario.emailFuncionario,
                        "senhaFuncionario": funcionario.senhaFuncionario,
                    }
                }]
            };
            response.status(200).send(objResposta);
        }
    }

    async changePassword(request, response) {
        const { idFuncionario } = request.params;
        const { senhaAtual, novaSenha } = request.body;

        if (!senhaAtual || !novaSenha) {
            return response.status(400).json({
            status: false,
            msg: "Informe a senha atual e a nova senha."
            });
        }

        const funcionario = new Funcionario();
        funcionario.idFuncionario = idFuncionario;

        // Verifica se a senha atual está correta
        const senhaCorreta = await funcionario.validarSenhaAtual(senhaAtual);
        if (!senhaCorreta) {
            return response.status(401).json({
            status: false,
            msg: "Senha atual incorreta."
            });
        }

        const sucesso = await funcionario.atualizarSenha(novaSenha);

        if (sucesso) {
            return response.status(200).json({
            status: true,
            msg: "Senha alterada com sucesso."
            });
        } else {
            return response.status(500).json({
            status: false,
            msg: "Erro ao alterar senha. Tente novamente."
            });
        }
    }
};
