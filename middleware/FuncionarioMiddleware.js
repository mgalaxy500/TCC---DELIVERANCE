
const Funcionario = require('../model/Funcionario');

module.exports = class FuncionarioMiddleware {


    async isNotEmailCadastrado(request, response, next) {
        if (!request.body || !request.body.funcionario) {
            return response.status(400).send({
            status: false,
            msg: "Requisição mal formatada. Objeto 'funcionario' ausente."
            });
        }
        const emailFuncionario = request.body.funcionario.emailFuncionario;
        const funcionario = new Funcionario();
        const is = await funcionario.isFuncionarioByNome(emailFuncionario);

        if (is == false) {
            next();
        } else {
            const objResposta = {
                status: false,
                msg: "Já existe um funcionario cadastrado com este email"
            }

            response.status(400).send(objResposta);
        }
    }

    async validate_emailFuncionarioLenght(request, response, next) {

        const emailFuncionario = request.body.funcionario.emailFuncionario;

        if (emailFuncionario.length < 3) {

            const objResposta = {
                status: false,
                msg: "O email deve ter mais do que 3 letras"
            }

            response.status(400).send(objResposta);
        } else {

            next();
        }
    }

    async validate_emailFuncionario(request, response, next) {

        const emailFuncionario = request.body.funcionario.emailFuncionario;

        // Verifica se o e-mail contém "@" e "."
        const atIndex = emailFuncionario.indexOf('@');
        const dotIndex = emailFuncionario.lastIndexOf('.');

        // Verifica se o "@" vem antes do ".", se ambos existem e se há caracteres suficientes antes e depois
        if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex + 2 >= emailFuncionario.length) {
            const objResposta = {
                status: false,
                msg: "E-mail inválido. Por favor, insira um e-mail válido."
            };
            return response.status(400).send(objResposta);
        }

        // Se todas as verificações passarem, o e-mail é considerado válido
        next();
    }
}
