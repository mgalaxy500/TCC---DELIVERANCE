
const Requisicao = require('../model/Requisicao');
const Aluno = require('../model/Aluno');

const express = require('express');
const app = express();

app.use(express.json()); // Permite o parsing de JSON no body

module.exports = class RequisicaoMiddleware {

    async validar_MatriculaAluno(request, response, next) {

        const matriculaAluno = request.body.requisicao.matriculaAluno;
        if (String(matriculaAluno).length !== 8) {
            return response.status(400).send({
                status: false,
                msg: "A matrícula deve ter 8 caracteres"
            });
        }
        else {
            // Caso o nome seja válido, chama o próximo middleware ou a rota definida.
            next(); // Chama o próximo middleware ou rota
        }
    }
    
    async validar_DataProva(request, response, next) {
        const dataProvaStr = request.body.requisicao.dataRequisicao; 
        if (!dataProvaStr) {
            return response.status(400).send({
                status: false,
                msg: "A data da prova é obrigatória"
            });
        }

        const dataProva = new Date(dataProvaStr);
        const agora = new Date();

        // diferença em milissegundos -> horas
        const diffHoras = (agora - dataProva) / (1000 * 60 * 60);

        if (diffHoras > 72) {
            return response.status(400).send({
                status: false,
                msg: "Não é permitido registrar requisições de provas que ocorreram há mais de 2 dias"
            });
        }

        next();
    }

    async is_alunoByMatriculaAluno(request, response, next) {
        try {
            const matriculaAluno = request.body.requisicao.matriculaAluno;

            if (!matriculaAluno) {
                return response.status(400).send({
                    status: false,
                    msg: "Matrícula do aluno não informada."
                });
            }

            const objAluno = new Aluno();
            objAluno.matriculaAluno = matriculaAluno;

            const alunoExiste = await objAluno.isAlunoByMatricula(matriculaAluno);

            if (!alunoExiste) {
                // Se a matrícula não existe, retorna erro
                return response.status(404).send({
                    status: false,
                    msg: "Aluno não encontrado para a matrícula informada."
                });
            }

            // Se existe, segue para o próximo middleware
            next();
        } catch (err) {
            console.error("Erro interno:", err);
            return response.status(500).send({
                status: false,
                msg: "Erro interno ao verificar matrícula do aluno."
            });
        }
    }

}
