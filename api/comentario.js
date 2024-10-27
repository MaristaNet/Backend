const admin = require('firebase-admin')
const express = require('express')
const router = express.Router()
const db = admin.firestore()

router.get('/', async (req, res) => {
    try{
    const snapshot = await db.collection('comentario').get()
    const comentario = []
    snapshot.forEach((doc) => {
        comentario.push({
            id: doc.id,
            ...doc.data()
        })
    })
    res.status(200).json(comentario)
    }catch(error){
        res.status(500).json(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try{
    const doc = await db.collection('comentario').doc(req.params.id).get()
    if(!doc.exists){
       return res.status(404).json({message: 'Comentario no encontrado'})
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
    const { autor, comentario, fecha_publicacion, imagen, privacidad } = req.body;
    if (!autor || !comentario || !fecha_publicacion || !imagen || !privacidad) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    try {
        const timestamp = new admin.firestore.Timestamp(fecha_publicacion._seconds, fecha_publicacion._nanoseconds);
        await db.collection('comentario').add({
            autor: autor,
            comentario: comentario,
            fecha_publicacion: timestamp, // Ahora usamos el timestamp
            imagen: imagen,
            privacidad: privacidad,
        });
        res.status(201).json({
            autor: autor,
            comentario: comentario,
            fecha_publicacion: fecha_publicacion,
            imagen: imagen,
            privacidad: privacidad
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;