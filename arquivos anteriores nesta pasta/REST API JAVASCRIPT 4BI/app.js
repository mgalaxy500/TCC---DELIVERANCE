const express = require('express');
const path = require('path');  // Módulo para manipular caminhos de arquivo
const EstadoRouter = require('./router/EstadoRouter');
const GeneroRouter = require('./router/GeneroRouter');
const JogoRouter = require('./router/JogoRouter');
const DevRouter = require('./router/DevRouter');
const LoginRouter = require('./router/LoginRouter');
const cors = require('cors');

const app = express();

const portaServico = 5050;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'view'))); // Configura a pasta 'view' como estática

const estadoRoteador = new EstadoRouter();
const generoRoteador = new GeneroRouter();
const jogoRouter = new JogoRouter();
const devsRouter = new DevRouter();
const loginRouter = new LoginRouter();

app.use(cors({
    origin: 'http://localhost', // permite requisições apenas do frontend específico
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // se necessário, permite cookies e headers de autenticação
}));

app.use('/login',
    loginRouter.createRoutes()
);

app.use('/estado',
    estadoRoteador.createRoutes()
);

app.use('/genero',
    generoRoteador.createRoutes()
);

app.use('/jogo',
    jogoRouter.createRoutes()
);

app.use('/dev',
    devsRouter.createRoutes()
);

// Inicia o servidor, escutando na porta definida, e exibe uma mensagem no console com a URL onde o servidor está rodando.
app.listen(portaServico, () => {
    console.log(`API rodando no endereço: http://localhost:${portaServico}/`);
});
