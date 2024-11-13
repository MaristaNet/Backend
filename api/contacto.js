const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const db = admin.firestore();

// Función para verificar si un usuario existe
async function usuarioExiste(id) {
    if (!id) {
        throw new Error("El ID del usuario es inválido o está vacío");
    }
    const usuarioDoc = await db.collection('usuario').doc(id).get();
    return usuarioDoc.exists;
}

// POST /contacto/nuevo
router.post('/nuevo', async (req, res) => {
    const { id_usuario, id_contacto } = req.body;

    // Validar que ambos IDs existen en la colección usuario
    if (!(await usuarioExiste(id_usuario)) || !(await usuarioExiste(id_contacto))) {
        return res.status(404).json({ error: 'Usuario o contacto no encontrado' });
    }

    // Validar que no sea el mismo usuario
    if (id_usuario === id_contacto) {
        return res.status(400).json({ error: 'No puedes agregarte a ti mismo como contacto' });
    }

    const usuarioRef = db.collection('usuario').doc(id_usuario);
    const contactoRef = db.collection('usuario').doc(id_contacto);

    try {
        const usuarioDoc = await usuarioRef.get();
        const usuarioData = usuarioDoc.data();

        // Validar que el contacto no esté ya en la lista
        if (usuarioData.contactos && usuarioData.contactos.includes(id_contacto)) {
            return res.status(400).json({ error: 'Este contacto ya está agregado' });
        }

        // Actualizar ambos documentos
        await usuarioRef.update({
            contactos: admin.firestore.FieldValue.arrayUnion(id_contacto)
        });
        await contactoRef.update({
            contactos: admin.firestore.FieldValue.arrayUnion(id_usuario)
        });

        res.status(200).json({ message: 'Contacto agregado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /contacto
router.get('/', async (req, res) => {
    const { id_usuario } = req.query;

    if (!(await usuarioExiste(id_usuario))) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    try {
        const usuarioDoc = await db.collection('usuario').doc(id_usuario).get();
        const usuarioData = usuarioDoc.data();

        // Obtener contactos
        const contactos = await Promise.all(
            (usuarioData.contactos || []).map(async (contactoId) => {
                const contactoDoc = await db.collection('usuario').doc(contactoId).get();
                const contactoData = contactoDoc.data();
                return {
                    id: contactoDoc.id,
                    nombre: contactoData.nombre,
                    carrera: contactoData.carrera,
                    pronombres: contactoData.pronombres,
                    foto: contactoData.foto,
                    username: contactoData.username,
                    email: contactoData.email,
                };
            })
        );

        res.status(200).json({ contactos, total: contactos.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE 
router.delete('/:id_contacto', async (req, res) => {
    const { id_usuario } = req.body;
    const { id_contacto } = req.params;

    if (!(await usuarioExiste(id_usuario)) || !(await usuarioExiste(id_contacto))) {
        return res.status(404).json({ error: 'Usuario o contacto no encontrado' });
    }

    const usuarioRef = db.collection('usuario').doc(id_usuario);
    const contactoRef = db.collection('usuario').doc(id_contacto);

    try {
        await usuarioRef.update({
            contactos: admin.firestore.FieldValue.arrayRemove(id_contacto)
        });
        await contactoRef.update({
            contactos: admin.firestore.FieldValue.arrayRemove(id_usuario)
        });

        res.status(200).json({ message: 'Contacto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
