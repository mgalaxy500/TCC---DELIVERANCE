
const Funcionario = require('../model/Funcionario');

module.exports = class FuncionarioMiddleware {


    async isNotEmailCadastrado(request, response, next) {

        const email = request.body.funcionario.email;
        const funcionario = new Funcionario();
        const is = await funcionario.isFuncionarioByNome(email);

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

        const email = request.body.funcionario.email;

        // Verifica se o e-mail contém "@" e "."
        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');

        // Verifica se o "@" vem antes do ".", se ambos existem e se há caracteres suficientes antes e depois
        if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex + 2 >= email.length) {
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
