const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const db = admin.firestore();

router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('post').get();
        const posts = [];
        snapshot.forEach((doc) => {
            posts.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un post por ID
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('post').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        return res.status(200).json({
            id: doc.id,
            ...doc.data(),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo post
router.post('/', async (req, res) => {
    const { contenido, etiqueta, fecha_publicacion, imagen, privacidad, usuario } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!contenido || !etiqueta || !fecha_publicacion || !imagen || !privacidad || !usuario) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    try {
        const newPost = {
            contenido,
            etiqueta,
            fecha_publicacion,
            imagen,
            privacidad,
            usuario,
        };

        // Guardar en Firestore
        const docRef = await db.collection('post').add(newPost);
        res.status(201).json({ id: docRef.id, ...newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un post por ID
router.patch('/:id', async (req, res) => {
    const { contenido, etiqueta, fecha_publicacion, imagen, privacidad, usuario } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!contenido || !etiqueta || !fecha_publicacion || !imagen || !privacidad || !usuario) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    try {
        const docRef = db.collection('post').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        await docRef.update({
            contenido,
            etiqueta,
            fecha_publicacion,
            imagen,
            privacidad,
            usuario,
        });

        res.status(200).json({ id: req.params.id, contenido, etiqueta, fecha_publicacion, imagen, privacidad, usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un post por ID
router.delete('/:id', async (req, res) => {
    try {
        const docRef = db.collection('post').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        await docRef.delete();
        res.status(200).json({ message: 'Post eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;