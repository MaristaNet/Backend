const express = require('express')

const admin = require('firebase-admin')
const cors = require('cors')
require('dotenv').config()

const serviceAccount = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // Asegúrate de que el formato sea correcto
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express()
app.use(cors())
app.use(express.json())

//carrear
const carreraRouter = require('./api/carrera')
app.use('/carrera', carreraRouter)

//categoria
const categoriaRouter = require('./api/categoria')
app.use('/categoria', categoriaRouter)

//cometnario
const comentarioRouter = require('./api/comentario')
app.use('/comentario', comentarioRouter)

//like
const likeRouter = require('./api/like')
app.use('/like', likeRouter)

//post
const postRouter = require('./api/post')
app.use('/post', postRouter)

//usuario
const usuarioRouter = require('./api/usuario')
app.use('/usuario', usuarioRouter)

//contacto
const contactoRouter = require('./api/contacto')
app.use('/contacto', contactoRouter)

//denuncia
const denunciaRouter = require('./api/denuncia')
app.use('/denuncia', denunciaRouter)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hola mundo')
})


app.listen(port, () => {
  console.log(`Api rest corriendo en el puerto ${port}`)
})