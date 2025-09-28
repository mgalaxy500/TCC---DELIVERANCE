
const express = require('express');

const ProfessorControl = require('../control/ProfessorControl');

const ProfessorMiddleware = require('../middleware/ProfessorMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class ProfessorRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._professorControl = new ProfessorControl();
        this._professorMiddleware = new ProfessorMiddleware();
    }

    createRoutes() {
        const multer = require('multer');
        const upload = multer({ dest: 'uploads/' }); // Configura o multer para armazenar os arquivos na pasta 'uploads'
        this.router.post('/json',
            this.jwtMiddleware.validate,
            upload.single('file'), // O campo do arquivo precisa ser 'file'
            (req, res) => this.professorControl.createByJSON(req, res)
        );

        this.router.get('/',
            this.jwtMiddleware.validate,
            this.professorControl.readAll
        );

        this.router.get('/:idProfessor',
            this.jwtMiddleware.validate,
            this.professorControl.realAllById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.professorMiddleware.validar_NomeProfessor,
            this.professorMiddleware.isNot_professorByNomeProfessor,
            this.professorControl.create
        );

        this.router.post('/csv',
            this.jwtMiddleware.validate,
            upload.single('variavelArquivo'),
            ProfessorControl.createByCSV
        );

        this.router.delete('/:idProfessor',
            this.jwtMiddleware.validate,
            this.professorControl.delete
        );

        this.router.put('/:idProfessor',
            this.jwtMiddleware.validate,
            this.professorControl.update
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

    // Getter para _professorControl
    get professorControl() {
        return this._professorControl;
    }

    // Setter para _professorControl
    set professorControl(newProfessorControl) {
        this._professorControl = newProfessorControl;
    }

    // Getter para _professorMiddleware
    get professorMiddleware() {
        return this._professorMiddleware;
    }

    // Setter para _professorMiddleware
    set professorMiddleware(newProfessorMiddleware) {
        this._professorMiddleware = newProfessorMiddleware;
    }
}
