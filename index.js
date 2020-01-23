const path = require('path')
const express = require('express')
const app = express()
const port = 3000

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

const calculoJuros = (p, i, n) => p * Math.pow(1 + i, n)

app.get('/', (req,res) => res.render('home'))
app.get('/calculadora', (req,res) => {
    const p = parseFloat(req.query.valorInicial)
    const i = parseFloat(req.query.taxa)
    const n = parseInt(req.query.tempo)
    const resultado = { calculado: false }

    if(p && i && n){
        resultado.total = calculoJuros(p,i,n)
        resultado.calculado = true
    }
    res.render('calculadora', { resultado })
})

app.listen(port, 
    _ => console.log("Servidor rodando na porta " + port))