
const express = require('express');

const GeneroControl = require('../control/GeneroControl');

const GeneroMiddleware = require('../middleware/GeneroMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class GeneroRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._generoControl = new GeneroControl();
        this._generoMiddleware = new GeneroMiddleware();
    }

    createRoutes() {
        const multer = require('multer');
        const upload = multer({ dest: 'uploads/' }); // Configura o multer para armazenar os arquivos na pasta 'uploads'
        this.router.post('/csv',
            this.jwtMiddleware.validate,
            upload.single('variavelArquivo'),//nome da variavel definida no javascript ou no insominia
            this.generoControl.createByCSV
        );

        this.router.get('/',
            this.jwtMiddleware.validate,
            this.generoControl.readAll
        );

        this.router.get('/:idGenero',
            this.jwtMiddleware.validate,
            this.generoControl.realAllById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.generoMiddleware.validar_NomeGenero,
            this.generoMiddleware.isNot_generoByNomeGenero,
            this.generoControl.create
        );

        this.router.delete('/:idGenero',
            this.jwtMiddleware.validate,
            this.generoControl.delete
        );

        this.router.put('/:idGenero',
            this.jwtMiddleware.validate,
            this.generoControl.update
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

    // Getter para _generoControl
    get generoControl() {
        return this._generoControl;
    }

    // Setter para _generoControl
    set generoControl(newGeneroControl) {
        this._generoControl = newGeneroControl;
    }

    // Getter para _generoMiddleware
    get generoMiddleware() {
        return this._generoMiddleware;
    }

    // Setter para _generoMiddleware
    set generoMiddleware(newGeneroMiddleware) {
        this._generoMiddleware = newGeneroMiddleware;
    }
}
