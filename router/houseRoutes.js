const express = require('express')
const House = require('../models/house');
const router = express.Router()

// RUTA HOME
router.get('/', (req, res) => {
    res.render('home.ejs')
})

// MOSTRAR TODAS LAS PROPIEDADES
router.get('/houses', async (req, res) => {
    const houses = await House.find({})
    res.render('houses/index.ejs', {houses} )
})

// CREAR PROPIEDAD
router.get('/houses/new', (req, res) => {
    res.render('houses/houses-new.ejs')
})

router.post('/houses', async (req, res) => {
    const house = new House(req.body.house);
    await house.save();
    res.redirect(`houses/${house._id}`);
})

// MOSTRAR UNA PROPIEDAD
router.get('/houses/:id', async (req, res) => {
    const {id} = req.params
    const house = await House.findById(id)
    res.render('houses/show.ejs', {house})
})

// EDITAR PROPIEDAD
router.get('/houses/:id/edit', async (req, res) => {
    const {id} = req.params
    const house = await House.findById(id);
    res.render('houses/edit.ejs', {house})
})

router.put('/houses/:id', async (req, res) => {
    const {id} = req.params
    const house = await House.findByIdAndUpdate(id, {...req.body.house});
    res.redirect(`/houses/${house._id}`);
})

// ELIMINAR PROPIEDAD
router.delete('/houses/:id', async (req, res) => {
    const {id} = req.params;
    await House.findByIdAndDelete(id);
    res.redirect('/houses')
})

module.exports = router