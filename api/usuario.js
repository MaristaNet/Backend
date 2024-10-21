const admin = require('firebase-admin')
const express = require('express')
const router = express.Router()
const db = admin.firestore()

router.get('/', async (req, res) => {
    try{
    const snapshot = await db.collection('usuario').get()
    const usuario = []
    snapshot.forEach((doc) => {
        usuario.push({
            id: doc.id,
            ...doc.data()
        })
    })
    res.status(200).json(usuario)
    }catch(error){
        res.status(500).json(error.message)
    }
})
module.exports = router;