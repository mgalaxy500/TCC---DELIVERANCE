
const express = require('express');

const FuncionarioControl = require('../control/FuncionarioControl');
const FuncionarioMiddleware = require('../middleware/FuncionarioMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class FuncionarioRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._funcionarioControl = new FuncionarioControl();
        this._funcionarioMiddleware = new FuncionarioMiddleware();
    }

    createRoutes() {
        const multer = require('multer');
        const upload = multer({ dest: 'uploads/' }); // Configura o multer para armazenar os arquivos na pasta 'uploads'

        this.router.get('/',
            this.jwtMiddleware.validate,
            this.funcionarioControl.readAll
        );

        this.router.get('/:idFuncionario',
            this.jwtMiddleware.validate
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.funcionarioMiddleware.isNotEmailCadastrado,
            this.funcionarioMiddleware.validate_emailFuncionario,
            this.funcionarioMiddleware.validate_emailFuncionarioLenght,
            this.funcionarioControl.create
        );

        this.router.post('/csv',
            this.jwtMiddleware.validate,
            upload.single('variavelArquivo'),
            FuncionarioControl.createByCSV
        );

        this.router.delete('/:idFuncionario',
            this.jwtMiddleware.validate,
            this.funcionarioControl.delete
        );

        this.router.put('/:idFuncionario',
            this.jwtMiddleware.validate,
            this.funcionarioControl.update
        );

        this.router.put('/:idFuncionario/senha',
            this.jwtMiddleware.validate,
            this.funcionarioControl.changePassword
        );

        return this.router;
    }

    get router() {
        return this._router;
    }

    // Setter para _router
    set router(newRouter) {
        this._router = newRouter;
    }

    // Getter para _jwtMiddleware
    get jwtMiddleware() {
        return this._jwtMiddleware;
    }

    // Setter para _jwtMiddleware
    set jwtMiddleware(newJwtMiddleware) {
        this._jwtMiddleware = newJwtMiddleware;
    }

    // Getter para _funcionarioControl
    get funcionarioControl() {
        return this._funcionarioControl;
    }

    // Setter para _funcionarioControl
    set funcionarioControl(newFuncionarioControl) {
        this._funcionarioControl = newFuncionarioControl;
    }

    // Getter para _funcionarioMiddleware
    get funcionarioMiddleware() {
        return this._funcionarioMiddleware;
    }

    // Setter para _funcionarioMiddleware
    set funcionarioMiddleware(newFuncionarioMiddleware) {
        this._funcionarioMiddleware = newFuncionarioMiddleware;
    }
}
