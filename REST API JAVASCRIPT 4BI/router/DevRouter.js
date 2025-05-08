
const express = require('express');

const DevControl = require('../control/DevControl');

const DevMiddleware = require('../middleware/DevMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class DevRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._devControl = new DevControl();
        this._devMiddleware = new DevMiddleware();
    }

    createRoutes() {
        const multer = require('multer');
        const upload = multer({ dest: 'uploads/' }); // Configura o multer para armazenar os arquivos na pasta 'uploads'

        this.router.get('/',
            this.jwtMiddleware.validate,
            this.devControl.readAll
        );

        this.router.get('/:idDev',
            this.jwtMiddleware.validate
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.devMiddleware.isNotEmailCadastrado,
            this.devMiddleware.validate_emailDev,
            this.devMiddleware.validate_emailDevLenght,
            this.devControl.create
        );

        this.router.delete('/:idDev',
            this.jwtMiddleware.validate,
            this.devControl.delete
        );

        this.router.put('/:idDev',
            this.jwtMiddleware.validate,
            this.devControl.update
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

    // Getter para _devControl
    get devControl() {
        return this._devControl;
    }

    // Setter para _devControl
    set devControl(newDevControl) {
        this._devControl = newDevControl;
    }

    // Getter para _devMiddleware
    get devMiddleware() {
        return this._devMiddleware;
    }

    // Setter para _devMiddleware
    set devMiddleware(newDevMiddleware) {
        this._devMiddleware = newDevMiddleware;
    }
}
