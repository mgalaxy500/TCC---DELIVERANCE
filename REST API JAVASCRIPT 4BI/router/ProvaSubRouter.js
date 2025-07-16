
const express = require('express');
const ProfessorControl = require('../control/ProfessorControl');
const ProfessorMiddleware = require('../middleware/ProfessorMiddleware');
const DisciplinaControl = require('../control/DisciplinaControl');
const DisciplinaMiddleware = require('../middleware/DisciplinaMiddleware');
const ProvaSubMiddleware = require('../middleware/ProvaSubMiddleware');
const ProvaSubControl = require('../control/ProvaSubControl');
const JwtMiddleware = require('../middleware/JWTMiddleware');

module.exports = class ProvaSubRouter {
    constructor() {
        this._router = express.Router();
        this._professorControl = new ProfessorControl();
        this._professorMiddleware = new ProfessorMiddleware();
        this._estadoControl = new DisciplinaControl();
        this._estadoMiddleware = new DisciplinaMiddleware();
        this._provaSubMiddleware = new ProvaSubMiddleware();
        this._provaSubControl = new ProvaSubControl();
        this._jwtMiddleware = new JwtMiddleware();
    }
    createRoutes() {
        this.router.get('/',
            this.jwtMiddleware.validate,
            this.provaSubControl.readAll
        );

        this.router.get('/:idProvaSub',
            this.jwtMiddleware.validate,
            this.provaSubControl.readById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.provaSubMiddleware.validate_nomeProvaSub,
            this.provaSubControl.create
        );

        this.router.delete('/:idProvaSub',
            this.jwtMiddleware.validate,
            this.provaSubControl.delete
        );

        this.router.put('/:idProvaSub',
            this.jwtMiddleware.validate,
            this.provaSubMiddleware.validate_nomeProvaSub,
            this.provaSubControl.update
        );

        return this._router;
    }

    get router() {
        return this._router;
    }

    set router(newRouter) {
        this._router = newRouter;
    }

    // Getter e Setter para _professorControl
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

    get disciplinaControl() {
        return this._disciplinaControl;
    }

    set disciplinaControl(newDisciplinaControl) {
        this._disciplinaControl = newDisciplinaControl;
    }

    // Getter e Setter para _professorMiddleware
    get disciplinaMiddleware() {
        return this._disciplinaMiddleware;
    }

    set disciplinaMiddleware(newDisciplinasMiddleware) {
        this._disciplinasMiddleware = newDisciplinasMiddleware;
    }

    // Getter e Setter para _provaSubMiddleware
    get provaSubMiddleware() {
        return this._provaSubMiddleware;
    }

    set provaSubMiddleware(newProvaSubMiddleware) {
        this._provaSubMiddleware = newProvaSubMiddleware;
    }

    // Getter e Setter para _provaSubControl
    get provaSubControl() {
        return this._provaSubControl;
    }

    set provaSubControl(newProvaSubControl) {
        this._provaSubControl = newProvaSubControl;
    }

    // Getter e Setter para _JWTMiddleware
    get jwtMiddleware() {
        return this._jwtMiddleware;
    }

    set jwtMiddleware(newJWTMiddleware) {
        this._jwtMiddleware = newJWTMiddleware;
    }
}
