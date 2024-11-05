const admin = require('firebase-admin')
const express = require('express')
const router = express.Router()
const db = admin.firestore()
const { TStoDate } = require('../utils/utils')

router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('like').get()
        const like = []
        snapshot.forEach((doc) => {
            like.push({
                id: doc.id,
                ...doc.data()
            })
        })
        res.status(200).json(like)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('like').doc(req.params.id).get()
        if (!doc.exists) {
            return res.status(404).json({ message: 'Like no encontrado' })
        }
        return res.status(200).json({
            id: doc.id,
            ...doc.data()
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router;