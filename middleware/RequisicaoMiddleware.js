
const Requisicao = require('../model/Requisicao');

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

        if (diffHoras > 48) {
            return response.status(400).send({
                status: false,
                msg: "Não é permitido registrar requisições de provas que ocorreram há mais de 48 horas"
            });
        }

        next();
    }

}
