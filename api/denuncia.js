const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const db = admin.firestore();
const { TStoDate } = require('../utils/utils');

// Ruta para obtener todas las denuncias (GET)
// Ruta para obtener todas las denuncias (GET)
router.get('/', async (req, res) => {
    try {
        const { id_elemento, tipo } = req.query;

        // Validar que al menos uno de los filtros esté presente
        if (!id_elemento && !tipo) {
            return res.status(400).json({
                error: 'Se requiere al menos un parámetro de filtro: id_elemento o tipo.',
            });
        }

        let consulta = db.collection('denuncia');

        // Aplicar filtros condicionalmente
        if (id_elemento) {
            consulta = consulta.where('id_elemento', '==', id_elemento);
        }
        if (tipo) {
            consulta = consulta.where('tipo', '==', tipo);
        }

        const snapshot = await consulta.get();

        // Convertir resultados a un array
        const denuncias = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.fecha) {
                data.fecha = TStoDate(data.fecha); // Convertir el timestamp a fecha legible
            }
            denuncias.push({
                id: doc.id,
                ...data,
            });
        });

        res.status(200).json({
            data: denuncias,
            total: denuncias.length,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Ruta para crear una denuncia (POST)
router.post('/', async (req, res) => {
    const { id_usuario, tipo, id_elemento, motivo } = req.body;

    if (!id_usuario || !tipo || !id_elemento || !motivo) {
        return res.status(400).json({ error: 'Faltan datos: id_usuario, tipo, id_elemento, motivo' });
    }

    try {
        // Obtener la fecha actual
        const fecha_denuncia = new Date();
        const timestamp = admin.firestore.Timestamp.fromDate(fecha_denuncia);

        const nuevaDenuncia = {
            id_usuario,
            tipo, // Puede ser "post", "comentario", etc.
            id_elemento, // ID genérico del elemento denunciado
            motivo,
            fecha: timestamp,
        };

        const docRef = await db.collection('denuncia').add(nuevaDenuncia);

        res.status(201).json({
            mensaje: 'Denuncia registrada con éxito',
            id: docRef.id,
            denuncia: nuevaDenuncia,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;