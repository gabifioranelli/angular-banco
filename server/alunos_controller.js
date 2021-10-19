var express = require('express');
var router = express.Router();
var Alunos = require('./models/alunos-model');

router.post('/', (req, res) => {
    let al = new Alunos({
        nome: req.body.nome,
        sala: req.body.sala,
        idade: req.body.idade,
        identificacao: req.body.identificacao,
        responsavel: req.body.responsavel
    });

    al.save((err, a) => {
        if (err) {
            res.status(500).send('Erro:' + err);
        } else {
            res.status(200).send(a)
        }
    })
})

router.get('/', (req, res) => {
    Alunos.find().exec((err, deps) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(deps)
        }
    })
})

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id
        await Alunos.deleteOne({ _id: id })
        res.status(200).send({});
    }

    catch (err) {
        res.status(500).send({ msg: "Internal Error", error: err })
    }
})

router.patch('/:id', (req, res) => {
    Alunos.findById(req.params.id, (err, al) => {
        if (err) {
            res.status(500).send(err)
        }
        else if (!al) {
            res.status(404).send({})
        } else {
            al.name = req.body.name;
            al.save()
                .then((a) => res.status(200).send(a))
                .catch((e) => res.status(500).send(e))
        }
    })
})


module.exports = router;