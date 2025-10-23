
const express = require('express');
const EntradaControl = require('../control/EntradaControl');


module.exports = class LoginRouter {
  
    constructor() { 
        this._router = express.Router();
        this._entradaControl =  new EntradaControl();
    }  

    createRoutes() {

        this._router.get('/',
            this._entradaControl.commandEntrada
        );

        return this._router;
    }
}
