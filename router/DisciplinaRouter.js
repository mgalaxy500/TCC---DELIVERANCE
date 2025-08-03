
const express = require('express');

const DisciplinaControl = require('../control/DisciplinaControl');
const DisciplinaMiddleware = require('../middleware/DisciplinaMiddleware');
const ProfessorControl = require('../control/ProfessorControl');
const ProfessorMiddleware = require('../middleware/ProfessorMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class DisciplinaRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._disciplinaControl = new DisciplinaControl();
        this._disciplinaMiddleware = new DisciplinaMiddleware();
        this._professorControl = new ProfessorControl();
        this._professorMiddleware = new ProfessorMiddleware();
    }

    createRoutes() {
        const multer = require('multer');
        const upload = multer({ dest: 'uploads/' }); // Configura o multer para armazenar os arquivos na pasta 'uploads'
        this.router.post('/csv',
            this.jwtMiddleware.validate,
            upload.single('variavelArquivo'),//nome da variavel definida no javascript ou no insominia
            this.disciplinaControl.createByCSV
        );

        this.router.get('/',
            this.jwtMiddleware.validate,
            this.disciplinaControl.readAll
        );

        this.router.get('/:idDisciplina',
            this.jwtMiddleware.validate,
            this.disciplinaControl.realAllById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.disciplinaMiddleware.validar_NomeDisciplina,
            this.disciplinaMiddleware.isNot_disciplinaByNomeDisciplina,
            this.disciplinaControl.create
        );

        this.router.delete('/:idDisciplina',
            this.jwtMiddleware.validate,
            this.disciplinaControl.delete
        );

        this.router.put('/:idDisciplina',
            this.jwtMiddleware.validate,
            this.disciplinaControl.update
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

    get professorControl() {
        return this._professorControl;
    }

    set professorControl(newProfessorControl) {
        this._professorControl = newProfessorControl;
    }

    // Getter e Setter para _professorMiddleware
    get professorMiddleware() {
        return this._professorMiddleware;
    }

    set professorMiddleware(newProfessorMiddleware) {
        this._professorMiddleware = newProfessorMiddleware;
    }

    // Getter para _jwtMiddleware
    get jwtMiddleware() {
        return this._jwtMiddleware;
    }

    // Setter para _jwtMiddleware
    set jwtMiddleware(newJwtMiddleware) {
        this._jwtMiddleware = newJwtMiddleware;
    }

    // Getter para _disciplinaControl
    get disciplinaControl() {
        return this._disciplinaControl;
    }

    // Setter para _disciplinaControl
    set disciplinaControl(newDisciplinaControl) {
        this._disciplinaControl = newDisciplinaControl;
    }

    // Getter para _disciplinaMiddleware
    get disciplinaMiddleware() {
        return this._disciplinaMiddleware;
    }

    // Setter para _disciplinaMiddleware
    set disciplinaMiddleware(newDisciplinaMiddleware) {
        this._disciplinaMiddleware = newDisciplinaMiddleware;
    }
}
