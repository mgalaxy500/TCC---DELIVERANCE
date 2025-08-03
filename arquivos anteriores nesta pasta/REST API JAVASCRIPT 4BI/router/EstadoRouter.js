
const express = require('express');

const EstadoControl = require('../control/EstadoControl');

const EstadoMiddleware = require('../middleware/EstadoMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class EstadoRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._estadoControl = new EstadoControl();
        this._estadoMiddleware = new EstadoMiddleware();
    }

    createRoutes() {
        const multer = require('multer');
        const upload = multer({ dest: 'uploads/' }); // Configura o multer para armazenar os arquivos na pasta 'uploads'
        this.router.post('/json',
            this.jwtMiddleware.validate,
            upload.single('file'), // O campo do arquivo precisa ser 'file'
            (req, res) => this.estadoControl.createByJSON(req, res)
        );

        this.router.get('/',
            this.jwtMiddleware.validate,
            this.estadoControl.readAll
        );

        this.router.get('/:idEstado',
            this.jwtMiddleware.validate,
            this.estadoControl.realAllById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.estadoMiddleware.validar_NomeEstado,
            this.estadoMiddleware.isNot_estadoByNomeEstado,
            this.estadoControl.create
        );

        this.router.delete('/:idEstado',
            this.jwtMiddleware.validate,
            this.estadoControl.delete
        );

        this.router.put('/:idEstado',
            this.jwtMiddleware.validate,
            this.estadoControl.update
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

    // Getter para _estadoControl
    get estadoControl() {
        return this._estadoControl;
    }

    // Setter para _estadoControl
    set estadoControl(newEstadoControl) {
        this._estadoControl = newEstadoControl;
    }

    // Getter para _estadoMiddleware
    get estadoMiddleware() {
        return this._estadoMiddleware;
    }

    // Setter para _estadoMiddleware
    set estadoMiddleware(newEstadoMiddleware) {
        this._estadoMiddleware = newEstadoMiddleware;
    }
}
