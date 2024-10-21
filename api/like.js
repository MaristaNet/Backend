const admin = require('firebase-admin')
const express = require('express')
const router = express.Router()
const db = admin.firestore()

router.get('/', async (req, res) => {
    try{
    const snapshot = await db.collection('like').get()
    const like = []
    snapshot.forEach((doc) => {
        like.push({
            id: doc.id,
            ...doc.data()
        })
    })
    res.status(200).json(like)
    }catch(error){
        res.status(500).json(error.message)
    }
})
module.exports = router;