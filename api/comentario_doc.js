/**
 * @api {get} /comentario Obtener todos los comentarios
 * @apiName GetComentarios
 * @apiGroup Comentario
 *
 * @apiQuery {String} [post] Filtrar comentarios por ID del post relacionado.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/comentario?post=post123
 *
 * @apiSuccess {Object[]} data Lista de comentarios.
 * @apiSuccess {String} data.id ID del comentario.
 * @apiSuccess {String} data.autor Autor del comentario.
 * @apiSuccess {String} data.comentario Contenido del comentario.
 * @apiSuccess {Date} data.fecha_publicacion Fecha de publicación del comentario.
 * @apiSuccess {String} data.imagen URL de la imagen asociada al comentario.
 * @apiSuccess {String} data.privacidad Privacidad del comentario (ejemplo: "publico" o "privado").
 * @apiSuccess {Number} total Número total de comentarios.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "comentario1",
 *           "autor": "user123",
 *           "comentario": "Este es un comentario.",
 *           "fecha_publicacion": "2024-11-21T10:00:00.000Z",
 *           "imagen": "https://example.com/image.jpg",
 *           "privacidad": "publico"
 *         }
 *       ],
 *       "total": 1
 *     }
 *
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {get} /comentario/:id Obtener un comentario por ID
 * @apiName GetComentarioById
 * @apiGroup Comentario
 *
 * @apiParam {String} id ID del comentario.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/comentario/comentario1
 *
 * @apiSuccess {String} id ID del comentario.
 * @apiSuccess {String} autor Autor del comentario.
 * @apiSuccess {String} comentario Contenido del comentario.
 * @apiSuccess {Date} fecha_publicacion Fecha de publicación del comentario.
 * @apiSuccess {String} imagen URL de la imagen asociada al comentario.
 * @apiSuccess {String} privacidad Privacidad del comentario (ejemplo: "publico" o "privado").
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "comentario1",
 *       "autor": "user123",
 *       "comentario": "Este es un comentario.",
 *       "fecha_publicacion": "2024-11-21T10:00:00.000Z",
 *       "imagen": "https://example.com/image.jpg",
 *       "privacidad": "publico"
 *     }
 *
 * @apiError (Error 404) NotFound Comentario no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {post} /comentario Crear un nuevo comentario
 * @apiName CreateComentario
 * @apiGroup Comentario
 *
 * @apiBody {String} autor ID del autor del comentario.
 * @apiBody {String} comentario Contenido del comentario.
 * @apiBody {String} imagen URL de la imagen asociada al comentario.
 * @apiBody {String} privacidad Privacidad del comentario (ejemplo: "publico" o "privado").
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X POST http://localhost:3000/comentario/
 * 
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "autor": "user123",
 *       "comentario": "Este es un comentario.",
 *       "imagen": "https://example.com/image.jpg",
 *       "privacidad": "publico"
 *     }
 *
 * @apiSuccess {String} autor ID del autor del comentario.
 * @apiSuccess {String} comentario Contenido del comentario.
 * @apiSuccess {Date} fecha_publicacion Fecha de publicación del comentario.
 * @apiSuccess {String} imagen URL de la imagen asociada al comentario.
 * @apiSuccess {String} privacidad Privacidad del comentario.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 201 Created
 *     {
 *       "autor": "user123",
 *       "comentario": "Este es un comentario.",
 *       "fecha_publicacion": "2024-11-21T10:00:00.000Z",
 *       "imagen": "https://example.com/image.jpg",
 *       "privacidad": "publico"
 *     }
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {patch} /comentario/:id Actualizar un comentario por ID
 * @apiName UpdateComentario
 * @apiGroup Comentario
 *
 * @apiParam {String} id ID del comentario.
 * @apiBody {String} [comentario] Contenido del comentario.
 * @apiBody {String} [imagen] URL de la imagen asociada al comentario.
 * @apiBody {String} [privacidad] Privacidad del comentario.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X PATCH http://localhost:3000/comentario/comentario1
 * 
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "comentario": "Comentario actualizado.",
 *       "privacidad": "privado"
 *     }
 *
 * @apiSuccess {String} id ID del comentario actualizado.
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "comentario1",
 *       "comentario": "Comentario actualizado.",
 *       "privacidad": "privado"
 *     }
 *
 * @apiError (Error 404) NotFound Comentario no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {delete} /comentario/:id Eliminar un comentario
 * @apiName DeleteComentario
 * @apiGroup Comentario
 *
 * @apiParam {String} id ID del comentario.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X DELETE http://localhost:3000/comentario/comentario1
 *
 * @apiSuccess {String} message Mensaje de confirmación de eliminación.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comentario eliminado"
 *     }
 *
 * @apiError (Error 404) NotFound Comentario no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
