const admin = require('firebase-admin')
const express = require('express')
const { mapCarrera } = require('../utils/mappings')
const { getCarreraRef } = require('../utils/getReferences')
const router = express.Router()
const db = admin.firestore()
const { TStoDate } = require('../utils/utils')

router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('usuario').get();
        let usuario = [];

        // Mapeo de usuarios
        const mappingPromises = snapshot.docs.map(async (doc) => {
            const usuarioData = await mapCarrera(doc, db); // Aquí se llama a mapCarrera, que incluye mapContactos
            return usuarioData;
        });
        
        // Esperar a que todas las promesas se resuelvan
        usuario = await Promise.all(mappingPromises);

        // Formatear la fecha de creación
        usuario.forEach((usuario) => {
            usuario.fecha_creacion = TStoDate(usuario.fecha_creacion);
        });

        // Enviar la respuesta
        res.status(200).json({ data: usuario, total: usuario.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('usuario').doc(req.params.id).get()
        if (!doc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        const usuario = { id: doc.id, ...doc.data(), };
        usuario.fecha_creacion = TStoDate(usuario.fecha_creacion);
        return res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/', async (req, res) => {
    const {id, presentacion, foto, post, nombre, email, pronombres, username, contactos, carrera } = req.body;
    //el usuario nos va a dar un id de carrera, nosotros debemos convertirlo en una referencia
    if (!presentacion  || !post  || !nombre || !email || !pronombres || !username || !contactos || !carrera) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
        const carreraRef = await getCarreraRef(carrera, db);
        const fecha_creacion = admin.firestore.Timestamp.now();
        const timestamp = new admin.firestore.Timestamp(fecha_creacion._seconds, fecha_creacion._nanoseconds);
        //se modifico a .set para que sea consistente la informacion y no se dupliquen los datos
        //y para efectuar consultas mas agiles
        await db.collection('usuario').doc(id).set({
            presentacion,
            id,
            foto,
            post,
            fecha_creacion: timestamp,
            nombre,
            email,
            pronombres,
            username,
            contactos,
            carrera: carreraRef //Guardamos la referencia de carrera en lugar del ID o una cadena plana
        });
        res.status(201).json({
            presentacion,
            id,
            foto,
            post,
            fecha_creacion,
            nombre,
            email,
            pronombres,
            username,
            contactos,
            carrera: carreraRef.id
        });
    } catch (error) {
        if (error.message.includes('id de carrera')) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});


router.patch('/:id', async (req, res) => {
    const { presentacion, foto, nombre, pronombres, username, carrera } = req.body;
    try {
        const docRef = db.collection('usuario').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Solo actualiza los campos permitidos
        const updateData = { presentacion, foto, nombre, pronombres, username, carrera };
        await docRef.update(updateData);

        res.status(200).json({ id: req.params.id, ...updateData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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