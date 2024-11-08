const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const db = admin.firestore();

// Obtener todos los likes con filtrado opcional por usuario, id_comentario o id_post
router.get('/', async (req, res) => {
    try {
        const { usuario, id_comentario, id_post, total } = req.query;
        let consulta = db.collection('like');

        // Aplicar filtros de acuerdo a los parámetros de la consulta
        if (usuario) {
            consulta = consulta.where('usuario', '==', usuario);
        }
        if (id_comentario) {
            consulta = consulta.where('id_comentario', '==', id_comentario);
        }
        if (id_post) {
            consulta = consulta.where('id_post', '==', id_post);
        }

        const snapshot = await consulta.get();
        const likes = [];

        snapshot.forEach((doc) => {
            likes.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        // Si el usuario solicita el total de likes, enviar el conteo 
        if (total) {
            return res.status(200).json({ total: likes.length });
        }

        res.status(200).json({ data: likes, total: likes.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un like específico por ID
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('like').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Like no encontrado' });
        }
        return res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un like específico por ID
router.delete('/:id', async (req, res) => {
    try {
        const likeRef = db.collection('like').doc(req.params.id);
        const doc = await likeRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Like no encontrado' });
        }

        // Eliminar documento
        await likeRef.delete();
        return res.status(200).json({ message: 'Like eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
