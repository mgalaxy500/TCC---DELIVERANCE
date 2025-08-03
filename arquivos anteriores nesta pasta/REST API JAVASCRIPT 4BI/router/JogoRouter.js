
const express = require('express');
const GeneroControl = require('../control/GeneroControl');
const GeneroMiddleware = require('../middleware/GeneroMiddleware');
const EstadoControl = require('../control/EstadoControl');
const EstadoMiddleware = require('../middleware/EstadoMiddleware');
const JogoMiddleware = require('../middleware/JogoMiddleware');
const JogoControl = require('../control/JogoControl');
const JwtMiddleware = require('../middleware/JWTMiddleware');

module.exports = class JogoRouter {
    constructor() {
        this._router = express.Router();
        this._generoControl = new GeneroControl();
        this._generoMiddleware = new GeneroMiddleware();
        this._estadoControl = new EstadoControl();
        this._estadoMiddleware = new EstadoMiddleware();
        this._jogoMiddleware = new JogoMiddleware();
        this._jogoControl = new JogoControl();
        this._jwtMiddleware = new JwtMiddleware();
    }
    createRoutes() {
        this.router.get('/',
            this.jwtMiddleware.validate,
            this.jogoControl.readAll
        );

        this.router.get('/:idJogo',
            this.jwtMiddleware.validate,
            this.jogoControl.readById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.jogoMiddleware.validate_nomeJogo,
            this.jogoControl.create
        );

        this.router.delete('/:idJogo',
            this.jwtMiddleware.validate,
            this.jogoControl.delete
        );

        this.router.put('/:idJogo',
            this.jwtMiddleware.validate,
            this.jogoMiddleware.validate_nomeJogo,
            this.jogoControl.update
        );

        return this._router;
    }

    get router() {
        return this._router;
    }

    set router(newRouter) {
        this._router = newRouter;
    }

    // Getter e Setter para _generoControl
    get generoControl() {
        return this._generoControl;
    }

    set generoControl(newGeneroControl) {
        this._generoControl = newGeneroControl;
    }

    // Getter e Setter para _generoMiddleware
    get generoMiddleware() {
        return this._generoMiddleware;
    }

    set generoMiddleware(newGeneroMiddleware) {
        this._generoMiddleware = newGeneroMiddleware;
    }

    // Getter e Setter para _jogoMiddleware
    get jogoMiddleware() {
        return this._jogoMiddleware;
    }

    set jogoMiddleware(newJogoMiddleware) {
        this._jogoMiddleware = newJogoMiddleware;
    }

    // Getter e Setter para _jogoControl
    get jogoControl() {
        return this._jogoControl;
    }

    set jogoControl(newJogoControl) {
        this._jogoControl = newJogoControl;
    }

    // Getter e Setter para _JWTMiddleware
    get jwtMiddleware() {
        return this._jwtMiddleware;
    }

    set jwtMiddleware(newJWTMiddleware) {
        this._jwtMiddleware = newJWTMiddleware;
    }
}
