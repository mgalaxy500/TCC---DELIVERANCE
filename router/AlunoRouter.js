
const express = require('express');

const AlunoControl = require('../control/AlunoControl');
const AlunoMiddleware = require('../middleware/AlunoMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class AlunoRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._alunoControl = new AlunoControl();
        this._alunoMiddleware = new AlunoMiddleware();
    }

    createRoutes() {
        const multer = require('multer');
        const upload = multer({ dest: 'uploads/' }); // Configura o multer para armazenar os arquivos na pasta 'uploads'

        this.router.get('/',
            this.jwtMiddleware.validate,
            this.alunoControl.readAll
        );

        this.router.get('/:matriculaAluno',
            this.jwtMiddleware.validate
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.alunoMiddleware.isNot_alunoByMatriculaAluno,
            this.alunoMiddleware.validar_MatriculaAluno,
            this.alunoControl.create
        );

        this.router.delete('/:matriculaAluno',
            this.jwtMiddleware.validate,
            this.alunoControl.delete
        );

        this.router.put('/:matriculaAluno',
            this.jwtMiddleware.validate,
            this.alunoControl.update
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

    // Getter para _alunoControl
    get alunoControl() {
        return this._alunoControl;
    }

    // Setter para _alunoControl
    set alunoControl(newAlunoControl) {
        this._alunoControl = newAlunoControl;
    }

    // Getter para _alunoMiddleware
    get alunoMiddleware() {
        return this._alunoMiddleware;
    }

    // Setter para _alunoMiddleware
    set alunoMiddleware(newAlunoMiddleware) {
        this._alunoMiddleware = newAlunoMiddleware;
    }
}
