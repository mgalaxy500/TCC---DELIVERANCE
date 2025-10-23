const express = require('express');
const path = require('path');  // Módulo para manipular caminhos de arquivo
const ProfessorRouter = require('./router/ProfessorRouter');
const DisciplinaRouter = require('./router/DisciplinaRouter');
const RequisicaoRouter = require('./router/RequisicaoRouter');
const FuncionarioRouter = require('./router/FuncionarioRouter');
const AlunoRouter = require('./router/AlunoRouter');
const LoginRouter = require('./router/LoginRouter');
const EntradaRouter = require('./router/EntradaRouter');
const ConfirmarRouter = require('./router/ConfirmarRouter');
const cors = require('cors');

const app = express();

const portaServico = 5050;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'view'))); // Configura a pasta 'view' como estática

const professorRoteador = new ProfessorRouter();
const disciplinaRoteador = new DisciplinaRouter();
const requisicaoRouter = new RequisicaoRouter();
const funcionarioRouter = new FuncionarioRouter();
const alunoRouter = new AlunoRouter();
const loginRouter = new LoginRouter();
const confirmarRouter = new ConfirmarRouter();
const entradaRouter = new EntradaRouter();


app.use(cors({
    origin: ['http://localhost:5050', 'http://127.0.0.1:5050'], // permite requisições apenas do frontend específico
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // se necessário, permite cookies e headers de autenticação
}));

app.use('/login',
    loginRouter.createRoutes()
);

app.use('/professor',
    professorRoteador.createRoutes()
);

app.use('/disciplina',
    disciplinaRoteador.createRoutes()
);

app.use('/requisicao',
    requisicaoRouter.createRoutes()
);

app.use('/funcionario',
    funcionarioRouter.createRoutes()
);

app.use('/aluno',
    alunoRouter.createRoutes()
);

app.use('/entrada',
    entradaRouter.createRoutes()
);

app.use('/confirmar',
    confirmarRouter.createRoutes()
);

// Inicia o servidor, escutando na porta definida, e exibe uma mensagem no console com a URL onde o servidor está rodando.
app.listen(portaServico, () => {
    console.log(`API rodando no endereço: http://localhost:${portaServico}/`);
});
