
const Dev = require('../model/Dev');

module.exports = class DevMiddleware {


    async isNotEmailCadastrado(request, response, next) {

        const email = request.body.dev.email;
        const dev = new Dev();
        const is = await dev.isDevByNome(email);

        if (is == false) {
            next();
        } else {
            const objResposta = {
                status: false,
                msg: "Já existe um dev cadastrado com este email"
            }

            response.status(400).send(objResposta);
        }
    }

    async validate_emailDevLenght(request, response, next) {

        const emailDev = request.body.dev.emailDev;

        if (emailDev.length < 3) {

            const objResposta = {
                status: false,
                msg: "O email deve ter mais do que 3 letras"
            }

            response.status(400).send(objResposta);
        } else {

            next();
        }
    }

    async validate_emailDev(request, response, next) {

        const email = request.body.dev.email;

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
