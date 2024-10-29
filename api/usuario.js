const admin = require('firebase-admin')
const express = require('express')
const { mapCarrera } = require('../utils/mappings')
const { getCarreraRef } = require('../utils/getReferences')
const router = express.Router()
const db = admin.firestore()

router.get('/', async (req, res) => {
    try{
    const snapshot = await db.collection('usuario').get()
    let usuario = []

    const mappingPromises= snapshot.docs.map(async (doc) => {
        const usuarioData= await mapCarrera(doc,db)
        return usuarioData;
    })
    usuario= await Promise.all(mappingPromises)



    res.status(200).json(usuario)
    }catch(error){
        res.status(500).json(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try{
    const doc = await db.collection('usuario').doc(req.params.id).get()
    if(!doc.exists){
       return res.status(404).json({message: 'Usuario no encontrado'})
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
    const { presentacion, foto, post, fecha_creacion, nombre, email, pronombres, username, contactos, carrera } = req.body;
//el usuario nos va a dar un id de carrera, nosotros debemos convertirlo en una referencia
    if (!presentacion || !foto || !post || !fecha_creacion || !nombre || !email || !pronombres || !username || !contactos || !carrera) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
        const carreraRef = await getCarreraRef(carrera,db);
        const timestamp = new admin.firestore.Timestamp(fecha_creacion._seconds, fecha_creacion._nanoseconds);
        await db.collection('usuario').add({
            presentacion,
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
    const { presentacion, foto, post, fecha_creacion, nombre, email, pronombres, username, contactos, carrera } = req.body;
    if (!presentacion || !foto || !post || !fecha_creacion || !nombre || !email || !pronombres || !username || !contactos || !carrera) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    try {
        const docRef = db.collection('usuario').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const timestamp = new admin.firestore.Timestamp(fecha_creacion._seconds, fecha_creacion._nanoseconds);
        await docRef.update({
            presentacion: presentacion,
            foto: foto,
            post: post, 
            fecha_creacion: timestamp, 
            nombre: nombre,
            email: email,
            pronombres: pronombres,
            username: username,
            contactos: contactos, 
            carrera: carrera, 
        });
        res.status(200).json({
            id: req.params.id,
            presentacion,
            foto,
            post,
            fecha_creacion,
            nombre,
            email,
            pronombres,
            username,
            contactos,
            carrera
        });
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