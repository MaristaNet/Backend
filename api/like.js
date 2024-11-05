const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const db = admin.firestore();

router.get('/', async (req, res) => {
    try {
        const { usuario } = req.query; // Filtro opcional por usuario
        let consulta = db.collection('like');

        if (usuario) {
            consulta = consulta.where('usuario', '==', usuario);
        }

        const snapshot = await consulta.get();
        const like = [];
        snapshot.forEach((doc) => {
            like.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        res.status(200).json({ data: like, total: like.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

module.exports = router;
