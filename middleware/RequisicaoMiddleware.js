
const Requisicao = require('../model/Requisicao');

const express = require('express');
const app = express();

app.use(express.json()); // Permite o parsing de JSON no body

module.exports = class RequisicaoMiddleware {

    async validar_MatriculaAluno(request, response, next) {

        // Recupera o nome do aluno enviado no corpo da requisição (request body).
        const matriculaAluno = request.body.requisicao.matriculaAluno;
        // Verifica se o nome do aluno tem menos de 3 caracteres.
        if (matriculaAluno.length !== 8) {
            // Se o nome for inválido, cria um objeto de resposta com o status falso e a mensagem de erro.
            const objResposta = {
                status: false,
                msg: "A matricula deve ter deve ter 8 caracteres"
            }
            // Envia a resposta com status HTTP 400 e a mensagem de erro.
            response.status(400).send(objResposta);
        } else {
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
