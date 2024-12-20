const express = require('express'); // Importa o Express
const mongoose = require('mongoose'); // Importa o Mongoose
const cors = require('cors'); // Importa o CORS

const app = express(); // Inicializa o servidor
app.use(express.json()); // Permite JSON no corpo das requisições
app.use(cors()); // Habilita o CORS

// Conexão com o MongoDB Atlas
mongoose.connect('mongodb+srv://yanlibni30012003:<db_password>@cluster0.fxjej.mongodb.net/estoque?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

// Schema (estrutura dos dados no banco)
const productSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  quantidade: Number,
  foto: String,
});

// Modelo do MongoDB
const Product = mongoose.model('Product', productSchema);

// Rotas CRUD (Create, Read, Update, Delete)

// 1. Buscar todos os produtos
app.get('/produtos', async (req, res) => {
  const produtos = await Product.find();
  res.json(produtos);
});

// 2. Criar um novo produto
app.post('/produtos', async (req, res) => {
  const produto = await Product.create(req.body);
  res.json(produto);
});

// 3. Atualizar um produto
app.put('/produtos/:id', async (req, res) => {
  const produto = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(produto);
});

// 4. Deletar um produto
app.delete('/produtos/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Produto deletado com sucesso' });
});

// Inicializa o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});