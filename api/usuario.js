const admin = require('firebase-admin');
const express = require('express');
const { mapCarrera } = require('../utils/mappings');
const { getCarreraRef } = require('../utils/getReferences');
const router = express.Router();
const db = admin.firestore();
const { TStoDate } = require('../utils/utils');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('usuario').get();
        let usuarios = [];

        // Mapear datos de cada usuario
        const mappingPromises = snapshot.docs.map(async (doc) => {
            const usuarioData = await mapCarrera(doc, db); // Mapea carreras y otros datos si es necesario
            return usuarioData;
        });

        usuarios = await Promise.all(mappingPromises);

        // Formatear fecha de creación
        usuarios.forEach((usuario) => {
            usuario.fecha_creacion = TStoDate(usuario.fecha_creacion);
        });

        res.status(200).json({ data: usuarios, total: usuarios.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('usuario').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const usuario = { id: doc.id, ...doc.data() };
        usuario.fecha_creacion = TStoDate(usuario.fecha_creacion);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un usuario
router.post('/', async (req, res) => {
    const {
        id, // Opcional: se genera automáticamente si no se proporciona
        presentacion,
        foto,
        post,
        nombre,
        email,
        pronombres,
        username,
        carrera,
    } = req.body;

    if (!presentacion || !nombre || !email || !pronombres || !username || !carrera) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    try {
        const carreraRef = await getCarreraRef(carrera, db);
        const fecha_creacion = admin.firestore.Timestamp.now();
        const usuarioId = id || db.collection('usuario').doc().id;

        await db.collection('usuario').doc(usuarioId).set({
            id: usuarioId,
            presentacion,
            foto: foto || null,
            post: post || null,
            fecha_creacion,
            nombre,
            email,
            pronombres,
            username,
            carrera: carreraRef,
        });

        res.status(201).json({
            id: usuarioId,
            presentacion,
            foto,
            post,
            fecha_creacion: fecha_creacion.toDate(),
            nombre,
            email,
            pronombres,
            username,
            carrera: carreraRef.id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un usuario
router.patch('/:id', async (req, res) => {
    const { presentacion, foto, nombre, pronombres, username, carrera } = req.body;
    try {
        const docRef = db.collection('usuario').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const updateData = {};
        if (presentacion) updateData.presentacion = presentacion;
        if (foto) updateData.foto = foto;
        if (nombre) updateData.nombre = nombre;
        if (pronombres) updateData.pronombres = pronombres;
        if (username) updateData.username = username;
        if (carrera) {
            const carreraRef = await getCarreraRef(carrera, db);
            updateData.carrera = carreraRef;
        }

        await docRef.update(updateData);
        res.status(200).json({ id: req.params.id, ...updateData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    try {
        const docRef = db.collection('usuario').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await docRef.delete();
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
