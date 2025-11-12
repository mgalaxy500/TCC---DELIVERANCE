// Importa o módulo express para criação de APIs.
const express = require('express');
const path = require('path');

module.exports = class EntradaControl {
 
    async commandEntrada(request, response) {
        if (request.method === 'GET') {
            return response.sendFile(path.join(__dirname, '../view/entrada.html'));
        }
    }
};
