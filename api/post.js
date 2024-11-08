const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const db = admin.firestore();

router.get('/', async (req, res) => {
    try {
        const { usuario, etiqueta, privacidad } = req.query;
        let consulta = db.collection('post');

        if (usuario) {
            consulta = consulta.where('usuario', '==', usuario);
        }
        if (etiqueta) {
            const etiquetasValidas = ['ayuda', 'convivencia', 'academico','empleos'];
            if (!etiquetasValidas.includes(etiqueta)) {
                return res.status(400).json({ error: 'Etiqueta incorrecta' });
            }
            consulta = consulta.where('etiqueta', '==', etiqueta);
        }
        if (privacidad) {
            consulta = consulta.where('privacidad', '==', privacidad);
        }

        const snapshot = await consulta.get();
        const posts = [];
        snapshot.forEach((doc) => {
            posts.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        res.status(200).json({ data: posts, total: posts.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

router.post('/', async (req, res) => {
    const { contenido, etiqueta, imagen, privacidad, usuario } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!contenido || !etiqueta || !imagen || !privacidad || !usuario) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    try {
        // Generar un timestamp en el momento de la creación del post
        const fecha_publicacion = admin.firestore.Timestamp.now();

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
    const { contenido, etiqueta, imagen, privacidad } = req.body; // Excluir `fecha_publicacion` y `usuario`
    try {
        const docRef = db.collection('post').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Creamos un objeto vacío para almacenar los cambios
        const updateData = {};

        // Condiciones para actualizar los campos
        if (contenido !== undefined) {
            updateData.contenido = contenido;
        }
        if (etiqueta !== undefined) {
            updateData.etiqueta = etiqueta;
        }
        if (imagen !== undefined) {
            // Si la imagen es null, la asignamos explícitamente como null
            updateData.imagen = imagen === null ? null : imagen;
        }
        if (privacidad !== undefined) {
            updateData.privacidad = privacidad;
        }

        // Actualiza los campos 
        await docRef.update(updateData);

        res.status(200).json({ id: req.params.id, ...updateData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar solo la imagen de un post por ID
router.patch('/:id', async (req, res) => {
    const { imagen } = req.body;  
    try {
        const docRef = db.collection('post').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Actualiza el campo de imagen
        if (imagen) {
            await docRef.update({ imagen });  
        }

        res.status(200).json({ id: req.params.id, imagen });
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