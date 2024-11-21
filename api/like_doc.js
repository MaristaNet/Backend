/**
 * @api {get} /like Obtener todos los likes
 * @apiName GetLikes
 * @apiGroup Like
 *
 * @apiQuery {String} [usuario] Filtrar por usuario que dio el like.
 * @apiQuery {String} [id_comentario] Filtrar por ID del comentario relacionado.
 * @apiQuery {String} [id_post] Filtrar por ID del post relacionado.
 * @apiQuery {Boolean} [total] Si se envía, retorna solo el total de likes.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/like?usuario=12345
 *
 * @apiSuccess {Object[]} data Lista de likes.
 * @apiSuccess {String} data.id ID del like.
 * @apiSuccess {String} data.usuario Usuario que dio el like.
 * @apiSuccess {String} data.id_comentario ID del comentario relacionado con el like.
 * @apiSuccess {String} data.id_post ID del post relacionado con el like.
 * @apiSuccess {Date} data.fecha Fecha en la que se dio el like.
 * @apiSuccess {Number} total Total de likes.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "like1",
 *           "usuario": "12345",
 *           "id_comentario": "comentario1",
 *           "id_post": null,
 *           "fecha": "2024-11-21T10:00:00.000Z"
 *         },
 *         {
 *           "id": "like2",
 *           "usuario": "67890",
 *           "id_comentario": null,
 *           "id_post": "post1",
 *           "fecha": "2024-11-21T10:05:00.000Z"
 *         }
 *       ],
 *       "total": 2
 *     }
 *
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
