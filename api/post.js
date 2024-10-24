const admin = require('firebase-admin')
const express = require('express')
const router = express.Router()
const db = admin.firestore()

router.get('/', async (req, res) => {
    try{
    const snapshot = await db.collection('post').get()
    const post = []
    snapshot.forEach((doc) => {
        post.push({
            id: doc.id,
            ...doc.data()
        })
    })
    res.status(200).json(post)
    }catch(error){
        res.status(500).json(error.message)
    }
})

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

module.exports = router;