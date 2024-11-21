/**
 * @api {get} /like Obtener likes con filtros opcionales
 * @apiName GetLikes
 * @apiGroup Like
 *
 * @apiQuery {String} [usuario] Filtrar por usuario que dio el like.
 * @apiQuery {String} [id_comentario] Filtrar por ID del comentario relacionado con el like.
 * @apiQuery {String} [id_post] Filtrar por ID del post relacionado con el like.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/like?usuario=user123
 *
 * @apiExample {curl} Ejemplo de uso con comentario:
 *     curl -i http://localhost:3000/like?id_comentario=comentario456
 *
 * @apiExample {curl} Ejemplo de uso con post:
 *     curl -i http://localhost:3000/like?id_post=post789
 *
 * @apiSuccess {Object[]} data Lista de likes encontrados.
 * @apiSuccess {String} data.id ID del like.
 * @apiSuccess {String} data.usuario Usuario que dio el like.
 * @apiSuccess {String} data.id_comentario ID del comentario relacionado con el like.
 * @apiSuccess {String} data.id_post ID del post relacionado con el like.
 * @apiSuccess {Date} data.fecha Fecha en la que se registró el like.
 * @apiSuccess {Number} total Total de likes encontrados.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta con usuario:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "like123",
 *           "usuario": "user123",
 *           "id_comentario": "comentario456",
 *           "id_post": null,
 *           "fecha": "2024-11-21T10:00:00.000Z"
 *         }
 *       ],
 *       "total": 1
 *     }
 *
 * @apiSuccessExample {json} Ejemplo de respuesta con comentario:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "like456",
 *           "usuario": "user456",
 *           "id_comentario": "comentario789",
 *           "id_post": null,
 *           "fecha": "2024-11-21T11:00:00.000Z"
 *         },
 *         {
 *           "id": "like789",
 *           "usuario": "user789",
 *           "id_comentario": "comentario789",
 *           "id_post": null,
 *           "fecha": "2024-11-21T12:00:00.000Z"
 *         }
 *       ],
 *       "total": 2
 *     }
 *
 * @apiSuccessExample {json} Ejemplo de respuesta con post:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "like123",
 *           "usuario": "user123",
 *           "id_comentario": null,
 *           "id_post": "post789",
 *           "fecha": "2024-11-21T13:00:00.000Z"
 *         }
 *       ],
 *       "total": 1
 *     }
 *
 * @apiError (Error 400) BadRequest Se requiere al menos un parámetro de filtro: usuario, id_comentario o id_post.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {get} /like/:id Obtener un like por ID
 * @apiName GetLikeById
 * @apiGroup Like
 *
 * @apiParam {String} id ID del like.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/like/like1
 *
 * @apiSuccess {String} id ID del like.
 * @apiSuccess {String} usuario Usuario que dio el like.
 * @apiSuccess {String} id_comentario ID del comentario relacionado con el like.
 * @apiSuccess {String} id_post ID del post relacionado con el like.
 * @apiSuccess {Date} fecha Fecha en la que se dio el like.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "like1",
 *       "usuario": "12345",
 *       "id_comentario": "comentario1",
 *       "id_post": null,
 *       "fecha": "2024-11-21T10:00:00.000Z"
 *     }
 *
 * @apiError (Error 404) NotFound Like no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {delete} /like/:id Eliminar un like por ID
 * @apiName DeleteLike
 * @apiGroup Like
 *
 * @apiParam {String} id ID del like.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X DELETE http://localhost:3000/like/like1
 *
 * @apiSuccess {String} message Mensaje de confirmación de eliminación.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Like eliminado exitosamente"
 *     }
 *
 * @apiError (Error 404) NotFound Like no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
/**
 * @api {post} /like Crear un nuevo like
 * @apiName CreateLike
 * @apiGroup Like
 *
 * @apiBody {String} usuario ID del usuario que da el like.
 * @apiBody {String} [id_comentario] ID del comentario al que se da el like (opcional si se proporciona `id_post`).
 * @apiBody {String} [id_post] ID del post al que se da el like (opcional si se proporciona `id_comentario`).
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X POST http://localhost:3000/like/
 * 
 * @apiExample {json} Body de ejemplo para un comentario:
 *     {
 *       "usuario": "user123",
 *       "id_comentario": "comentario456"
 *     }
 *
 * @apiExample {json} Body de ejemplo para un post:
 *     {
 *       "usuario": "user123",
 *       "id_post": "post789"
 *     }
 *
 * @apiSuccess {String} mensaje Mensaje de confirmación.
 * @apiSuccess {Object} like Detalles del like registrado.
 * @apiSuccess {String} like.id ID del like creado.
 * @apiSuccess {String} like.usuario ID del usuario que dio el like.
 * @apiSuccess {String} [like.id_comentario] ID del comentario al que se dio el like.
 * @apiSuccess {String} [like.id_post] ID del post al que se dio el like.
 * @apiSuccess {Date} like.fecha Fecha en la que se registró el like.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 201 Created
 *     {
 *       "mensaje": "Like registrado con éxito.",
 *       "like": {
 *         "id": "like123",
 *         "usuario": "user123",
 *         "id_comentario": "comentario456",
 *         "id_post": null,
 *         "fecha": "2024-11-21T12:00:00.000Z"
 *       }
 *     }
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios o el usuario ya dio like a este elemento.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
