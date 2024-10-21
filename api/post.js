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
module.exports = router;