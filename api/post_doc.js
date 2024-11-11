
/**
 * @api {get} /post Obtener todos los posts
 * @apiName GetPosts
 * @apiGroup Post
 *
 * @apiQuery {String} [usuario] Filtrar por usuario.
 * @apiQuery {String="ayuda","convivencia","academico","empleos"} [etiqueta] Filtrar por etiqueta (opciones: ayuda, convivencia, academico, empleos). No enviar tildes ni mayúsculas.
 * @apiQuery {String="privado","publico"} [privacidad] Filtrar por privacidad (opciones: publico, privado)
 *  @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/post/
 * @apiSuccess {Object[]} data Lista de posts.
 * @apiSuccess {String} data.id ID del post.
 * @apiSuccess {String} data.contenido Contenido del post.
 * @apiSuccess {String} data.etiqueta Etiqueta del post.
 * @apiSuccess {String} data.imagen URL de la imagen del post.
 * @apiSuccess {String} data.privacidad Privacidad del post.
 * @apiSuccess {String} data.usuario Usuario que creó el post.
 * @apiSuccess {Date} data.fecha_publicacion Fecha de publicación del post.
 * @apiSuccess {Number} total Total de posts.
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
{
  "data": [
    {
      "id": 1,
      "fecha_publicacion": "2024-10-01T23:39:12.921Z",
      "imagen": "https://...",
      "privacidad": "privado",
      "usuario": "1",
      "etiqueta": "ayuda",
      "contenido": "ayuda con una tarea"
    },
    {
      "id": 2,
      "contenido": "Modificando...",
      "imagen": "null",
      "usuario": "2",
      "etiqueta": "academico",
      "privacidad": "publico",
      "fecha_publicacion": "2024-11-05T06:12:33.917Z"
}
      ],
  "total": 2
}
 *
 * @apiError (Error 400) BadRequest Etiqueta incorrecta.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
/**
 * @api {get} /post/:id Obtener un post por ID
 * @apiName GetPostById
 * @apiGroup Post
 *
 * @apiParam {String} id ID del post.
 * @apiExample {curl} Ejemplo de uso
 *     curl -i http://localhost:3000/post/fgcMadq4U4w7KXrtNFEM
 * @apiSuccess {String} id ID del post.
 * @apiSuccess {String} contenido Contenido del post.
 * @apiSuccess {String} etiqueta Etiqueta del post.
 * @apiSuccess {String} imagen URL de la imagen del post.
 * @apiSuccess {String} privacidad Privacidad del post.
 * @apiSuccess {String} usuario Usuario que creó el post.
 * @apiSuccess {Date} fecha_publicacion Fecha de publicación del post.
 * * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 * {
 
  "id": "fgcMadq4U4w7KXrtNFEM",
  "contenido": "Esta es mi primera publicacion",
  "etiqueta": "academico",
  "imagen": "",
  "privacidad": "privado",
  "usuario": "1",
  "fecha_publicacion": "2024-11-05T04:11:14.348Z"
  }
 * @apiError (Error 404) NotFound Post no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
/**
 * @api {post} /post Crear un nuevo post
 * @apiName CreatePost
 * @apiGroup Post
 *
 * @apiBody {String} contenido Contenido del post.
 * @apiBody {String="ayuda","convivencia","academico","empleos"} etiqueta Etiqueta del post.
 * @apiBody {String} imagen URL de la imagen del post.
 * @apiBody {String="publico","privado"} privacidad Privacidad del post.
 * @apiBody {String} usuario Usuario que crea el post.
 *  @apiExample {curl} Ruta de ejemplo
 *     curl -i http://localhost:3000/post/
 * @apiExample {json} Body de ejemplo
 * {
 * "contenido": "Una publicacion con mensaje de ejemplo",
 * "etiqueta": "ayuda",
 * "imagen": "",
 * "privacidad": "privado",
 * "usuario": "wisa7Eu8TfqRjDMfKUzP"
 * 
 * }

 
 * @apiSuccess {String} id ID del nuevo post.
 * @apiSuccess {String} contenido Contenido del post.
 * @apiSuccess {String} etiqueta Etiqueta del post.
 * @apiSuccess {String} imagen URL de la imagen del post.
 * @apiSuccess {String} privacidad Privacidad del post.
 * @apiSuccess {String} usuario Usuario que creó el post.
 * @apiSuccess {Date} fecha_publicacion Fecha de publicación del post.
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {patch} /post/:id Actualizar un post por ID
 * @apiName UpdatePost
 * @apiGroup Post
 *
 * @apiParam {String} id ID del post.
 * @apiBody {String} contenido Contenido del post.
 * @apiBody {String} etiqueta Etiqueta del post.
 * @apiBody {String} imagen Referencia de la nueva imagen del post (con ayuda de funcion de upload de firebase storage)
 * @apiBody {String} privacidad Privacidad del post.
 * @apiExample {curl} Ruta de ejemplo
 *   curl -X PATCH http://localhost:3000/post/fgcMadq4U4w7KXrtNFEM
 * * @apiExample {json} Body de ejemplo:
 * {
 "contenido": "Una publicacion con mensaje de ejemplo",
 "etiqueta": "ayuda",
 "imagen": "",
 "privacidad": "privado",

 }
 *
 * @apiSuccess {String} id ID del post actualizado.
 * @apiSuccess {String} contenido Contenido del post.
 * @apiSuccess {String} etiqueta Etiqueta del post.
 * @apiSuccess {String} imagen URL de la imagen del post.
 * @apiSuccess {String} privacidad Privacidad del post.
 *
 * @apiError (Error 404) NotFound Post no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
/**
 * @api {patch} /post/:id/imagen Actualizar solo la imagen de un post por ID
 * @apiName UpdatePostImage
 * @apiGroup Post
 *
 * @apiParam {String} id ID del post.
 * @apiBody {String} imagen Referencia de la nueva imagen del post (con ayuda de funcion de upload de firebase storage)
 * @apiExample {curl} Ruta de ejemplo
 *   curl -X PATCH http://localhost:3000/post/fgcMadq4U4w7KXrtNFEM
 * @apiExample {json} Body
 * {
  "imagen":"referencia-a-tu-imagen"
 }
 *
 * @apiSuccess {String} id ID del post actualizado.
 * @apiSuccess {String} imagen URL de la nueva imagen del post.
 *
 * @apiError (Error 404) NotFound Post no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {delete} /post/:id Eliminar un post por ID
 * @apiName DeletePost
 * @apiGroup Post

 * @apiParam {String} id ID del post.
 *  @apiExample {curl} Ejemplo de uso
 *    curl -X DELETE http://localhost:3000/post/fgcMadq4U4w7KXrtNFEM
 * @apiSuccess {String} message Mensaje de confirmación de eliminación.
 *
 * @apiError (Error 404) NotFound Post no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 * @apiSuccessExample {json} Respuesta
 *    HTTP/1.1 200 OK
 *   {
  "message": "Post eliminado"
}
 */
