const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const db = admin.firestore();
const { TStoDate } = require('../utils/utils');

// Ruta para obtener todas las denuncias (GET)
router.get('/', async (req, res) => {
    try {
        const { post } = req.query;
        let consulta = db.collection('denuncia');

        if (post) {
            consulta = consulta.where('post', '==', post);
        }

        const snapshot = await consulta.get();
        const denuncia = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            data.fecha_denuncia = TStoDate(data.fecha_denuncia); // Convertir timestamp a fecha
            denuncia.push({
                id: doc.id,
                ...data
            });
        });

        res.status(200).json({ data: denuncia, total: denuncia.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para crear una denuncia (POST)
router.post('/', async (req, res) => {
    const { id_usuario, tipo, id_elemento, motivo } = req.body;
    if (!id_usuario || !tipo || !id_elemento || !motivo) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    try {
        // Obtenemos la fecha actual
        const fecha_denuncia = new Date();
        const timestamp = admin.firestore.Timestamp.fromDate(fecha_denuncia);

        const nuevaDenuncia = {
            id_elemento,
            tipo,
            fecha_denuncia: timestamp,
            id_usuario,
            motivo,
        };

        await db.collection('denuncia').add(nuevaDenuncia);

        res.status(201).json({
            mensaje: 'Denuncia registrada con éxito',
            denuncia: nuevaDenuncia,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;