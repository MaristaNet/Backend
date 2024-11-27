const admin = require('firebase-admin')
const express = require('express')
const router = express.Router()
const db = admin.firestore()
const { TStoDate } = require('../utils/utils')

// Obtener todos los likes con filtrado opcional por usuario, id_comentario o id_post
router.get('/', async (req, res) => {
    try {
        const { usuario, id_comentario, id_post } = req.query;

        // Validar que al menos uno de los filtros esté presente
        if (!usuario && !id_comentario && !id_post) {
            return res.status(400).json({
                error: 'Se requiere al menos un parámetro de filtro: usuario, id_comentario o id_post.',
            });
        }

        let consulta = db.collection('like');

        // Aplicar filtros según los parámetros de la consulta
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
                ...doc.data(),
                fecha: TStoDate(doc.data().fecha),
            });
        });

        res.status(200).json({
            data: likes,
            total: likes.length,
        });
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
            ...doc.data(),
            fecha: TStoDate(doc.data().fecha)
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

// Crear un nuevo like (POST)
router.post('/', async (req, res) => {
    const { usuario, id_comentario, id_post } = req.body;

    // Validar que los datos obligatorios estén presentes
    if (!usuario || (!id_comentario && !id_post)) {
        return res.status(400).json({
            error: 'Faltan datos: usuario, y al menos uno de id_comentario o id_post es requerido.',
        });
    }

    try {
        // Verificar si ya existe un like de este usuario para el mismo elemento
        let consulta = db.collection('like').where('usuario', '==', usuario);
        if (id_comentario) {
            consulta = consulta.where('id_comentario', '==', id_comentario);
        }
        if (id_post) {
            consulta = consulta.where('id_post', '==', id_post);
        }

        const snapshot = await consulta.get();
        if (!snapshot.empty) {
            return res.status(400).json({ error: 'El usuario ya ha dado like a este elemento.' });
        }

        // Crear el nuevo like
        const fecha = admin.firestore.Timestamp.fromDate(new Date());
        const nuevoLike = {
            usuario,
            id_comentario: id_comentario || null,
            id_post: id_post || null,
            fecha,
        };

        const docRef = await db.collection('like').add(nuevoLike);

        res.status(201).json({
            mensaje: 'Like registrado con éxito.',
            like: {
                id: docRef.id,
                ...nuevoLike,
                fecha: fecha.toDate(),
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
