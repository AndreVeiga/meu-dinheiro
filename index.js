const path = require('path')
const express = require('express')
const app = express()
const port = 3000
const calculoJuros = (p, i, n) => p * Math.pow(1 + i, n)
const mongoose = require('mongoose')
const operacao = require('./models/operacao')
const bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://meudinheiro:meudinheiro@cluster0-stxqa.mongodb.net/meudinheiro?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.render('home'))
app.get('/calculadora', (req, res) => {
    const p = parseFloat(req.query.valorInicial)
    const i = parseFloat(req.query.taxa)
    const n = parseInt(req.query.tempo)
    const resultado = { calculado: false }

    if (p && i && n) {
        resultado.total = calculoJuros(p, i, n)
        resultado.calculado = true
    }
    res.render('calculadora', { resultado })
})

app.listen(port, () => console.log('Servidor rodando'))

app.get('/operacoes', async (req,res) => {
    const operacoes = await operacao.find({})
    res.render('operacoes', { operacoes })
})

app.get('/nova-operacao', (req,res) => res.render('novaOperacao'))
app.post('/nova-operacao', async (req,res) => {
    const op = {
        descricao: req.body.descricao,
        valor: parseFloat(req.body.valor)
    }

    await operacao.create(op)
    res.redirect('/operacoes')
})