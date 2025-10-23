
const express = require('express');
const ConfirmarControl = require('../control/ConfirmarControl');

module.exports = class LoginRouter {
  
    constructor() {
        
        this._router = express.Router();
        this._confirmarControl =  new ConfirmarControl();
    }

    createRoutes() {

        this._router.get('/',
            this._confirmarControl.commandConfirmar
        );

        return this._router;
    }
}
