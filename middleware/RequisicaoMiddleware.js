
const Requisicao = require('../model/Requisicao');

const express = require('express');
const app = express();

app.use(express.json()); // Permite o parsing de JSON no body

module.exports = class RequisicaoMiddleware {


    async isNotCodigo(request, response, next) {

        const codigoComprovanteRequisicao = request.body.requisicao.codigoComprovanteRequisicao;
        const requisicao = new Requisicao();
        const is = await requisicao.isRequisicaoByCodigoComprovanteRequisicao(codigoComprovanteRequisicao);

        if (is == false) {
            next();
        } else {
            const objResposta = {
                status: false,
                msg: "Já existe um requisicao cadastrado com este pagamento"
            }

            response.status(400).send(objResposta);
        }
    }

    async validate_codigoComprovanteRequisicao(request, response, next) {

        const codigoComprovanteRequisicao = request.body.requisicao.codigoComprovanteRequisicao;

        if (codigoComprovanteRequisicao.length < 8) {

            const objResposta = {
                status: false,
                msg: "O codigo deve ter pelo menos 8 digitos"
            }

            response.status(400).send(objResposta);
        } else {

            next();
        }
    }

}
