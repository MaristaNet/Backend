const admin = require('firebase-admin')
const express = require('express')
const { TStoDate } = require('../utils/utils')
const router = express.Router()
const db = admin.firestore()

router.get('/', async (req, res) => {
    try {
        const { post } = req.query;
        let consulta = db.collection('comentario');

        if (post) {
            consulta = consulta.where('post', '==', post);
        }

        const snapshot = await consulta.get();
        const comentario = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            data.fecha_publicacion = TStoDate(data.fecha_publicacion); // Convertir timestamp a fecha
            comentario.push({
                id: doc.id,
                ...data
            });
        });

        res.status(200).json({ data: comentario, total: comentario.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('comentario').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        return res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { autor, comentario, imagen, privacidad } = req.body;
    if (!autor || !comentario || !imagen || !privacidad) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    try {
        // Obtenemos la fecha actual
        const fecha_publicacion = new Date();
        const timestamp = admin.firestore.Timestamp.fromDate(fecha_publicacion);
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

// Actualizar un comentario por ID
router.patch('/:id', async (req, res) => {
    const { comentario, imagen, privacidad } = req.body;
    try {
        const docRef = db.collection('comentario').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        // Creamos un objeto vacío para almacenar los cambios
        const updateData = {};

        // Solo actualiza los campos que han sido proporcionados
        if (comentario !== undefined) {
            updateData.comentario = comentario;
        }
        if (imagen !== undefined) {
            // Si la imagen es null, asignamos null explícitamente
            updateData.imagen = imagen === null ? null : imagen;
        }
        if (privacidad !== undefined) {
            updateData.privacidad = privacidad;
        }

        // Realiza la actualización 
        await docRef.update(updateData);

        res.status(200).json({ id: req.params.id, ...updateData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.patch('/:id', async (req, res) => {
    const { imagen } = req.body;  // Solo obtenemos el campo de imagen
    try {
        const docRef = db.collection('comentario').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        // Actualizar el campo de imagen
        if (imagen) {
            await docRef.update({ imagen }); 
        }

        res.status(200).json({ id: req.params.id, imagen });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const docRef = db.collection('comentario').doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        await docRef.delete();
        res.status(200).json({ message: 'Comentario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;