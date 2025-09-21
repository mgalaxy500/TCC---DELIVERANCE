
const express = require('express');

const RequisicaoControl = require('../control/RequisicaoControl');
const RequisicaoMiddleware = require('../middleware/RequisicaoMiddleware');
const AlunoControl = require('../control/AlunoControl');
const AlunoMiddleware = require('../middleware/AlunoMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class RequisicaoRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._RequisicaoControl = new RequisicaoControl();
        this._RequisicaoMiddleware = new RequisicaoMiddleware();
        this._alunoControl = new AlunoControl();
        this._alunoMiddleware = new AlunoMiddleware();
    }

    createRoutes() {
        const multer = require('multer');
        const upload = multer({ dest: 'uploads/' }); // Configura o multer para armazenar os arquivos na pasta 'uploads'
    
        this.router.get('/',
            this.jwtMiddleware.validate,
            this.RequisicaoControl.readAll
        );

        this.router.get('/:idRequisicao',
            this.jwtMiddleware.validate,
            this.RequisicaoControl.realAllById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.RequisicaoMiddleware.validar_MatriculaAluno,
            this.RequisicaoMiddleware.validar_DataProva,
            this.RequisicaoControl.create
        );

        this.router.delete('/:idRequisicao',
            this.jwtMiddleware.validate,
            this.RequisicaoControl.delete
        );

        this.router.put('/:idRequisicao',
            this.jwtMiddleware.validate,
            this.RequisicaoControl.update
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

    get alunoControl() {
        return this._alunoControl;
    }

    set alunoControl(newAlunoControl) {
        this._alunoControl = newAlunoControl;
    }

    // Getter e Setter para _alunoMiddleware
    get alunoMiddleware() {
        return this._alunoMiddleware;
    }

    set alunoMiddleware(newAlunoMiddleware) {
        this._alunoMiddleware = newAlunoMiddleware;
    }

    // Getter para _jwtMiddleware
    get jwtMiddleware() {
        return this._jwtMiddleware;
    }

    // Setter para _jwtMiddleware
    set jwtMiddleware(newJwtMiddleware) {
        this._jwtMiddleware = newJwtMiddleware;
    }

    // Getter para _RequisicaoControl
    get RequisicaoControl() {
        return this._RequisicaoControl;
    }

    // Setter para _RequisicaoControl
    set RequisicaoControl(newRequisicaoControl) {
        this._RequisicaoControl = newRequisicaoControl;
    }

    // Getter para _RequisicaoMiddleware
    get RequisicaoMiddleware() {
        return this._RequisicaoMiddleware;
    }

    // Setter para _RequisicaoMiddleware
    set RequisicaoMiddleware(newRequisicaoMiddleware) {
        this._RequisicaoMiddleware = newRequisicaoMiddleware;
    }
}
