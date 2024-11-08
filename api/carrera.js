const admin = require('firebase-admin')
const express = require('express')
const router = express.Router()
const db = admin.firestore()

router.get('/', async (req, res) => {
    try{
    const snapshot = await db.collection('carrera').get()
    const carrera = []
    snapshot.forEach((doc) => {
        carrera.push({
            id: doc.id,
            ...doc.data()
        })
    })
    res.status(200).json(carrera)
    }catch(error){
        res.status(500).json(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try{
    const doc = await db.collection('carrera').doc(req.params.id).get()
    if(!doc.exists){
       return res.status(404).json({message: 'Carrera no encontrada'})
    }
    return res.status(200).json({
        id: doc.id,
        ...doc.data()
    })
    }catch(error){
        res.status(500).json(error.message)
    }
})

router.post('/', async (req, res) => {
    const { nombre, clave } = req.body;

    if (!nombre || !clave) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
        const nuevoDocumento = await db.collection('carrera').add({
            nombre,
            clave
        });

        res.status(201).json({
            id: nuevoDocumento.id,
            nombre,
            clave
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    const { nombre, clave } = req.body;

    if (!nombre || !clave) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
        const docRef = db.collection('carrera').doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Carrera no encontrada' });
        }

        await docRef.update({
            nombre,
            clave
        });

        res.status(200).json({
            id: req.params.id,
            nombre,
            clave
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const docRef = db.collection('carrera').doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Carrera no encontrada' });
        }

        await docRef.delete();
        res.status(200).json({ message: 'Carrera eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;