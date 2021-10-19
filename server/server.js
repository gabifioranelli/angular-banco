//Chamando o Express para a nossa Aplicação
const express = require('express');
const app = express();
const cors = require('cors');
const alunos_controller = require("./alunos_controller")

//Definindo a PORTA em que nosso servidor HTTP vai funcionar
const port = 3000

//Comando que adiciona o mongoose ao nosso arquivo
const mongoose = require('mongoose');


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

//Definindo a pasta em que conterá os arquivos estaticos
app.use(express.static('public'));

// Pedindo para usar uma rota
app.use("/alunos", alunos_controller);


//Função de conexão com o MongoDB Atlas
mongoose.connect("mongodb+srv://guilherme_carvalho:guilherme_carvalho@cluster0.feusb.mongodb.net/escola?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//CONEXÃO COM O SERVIDOR
app.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
});