/**
 * @api {get} /denuncia Obtener todas las denuncias
 * @apiName GetDenuncias
 * @apiGroup Denuncia
 *
 * @apiQuery {String} [post] Filtrar por ID del post relacionado con la denuncia.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/denuncia?post=post123
 *
 * @apiSuccess {Object[]} data Lista de denuncias.
 * @apiSuccess {String} data.id ID de la denuncia.
 * @apiSuccess {String} data.id_usuario ID del usuario que hizo la denuncia.
 * @apiSuccess {String} data.tipo Tipo de elemento denunciado (por ejemplo: "comentario" o "post").
 * @apiSuccess {String} data.id_elemento ID del elemento denunciado.
 * @apiSuccess {String} data.motivo Motivo de la denuncia.
 * @apiSuccess {Date} data.fecha Fecha en la que se realizó la denuncia.
 * @apiSuccess {Number} total Total de denuncias.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "denuncia1",
 *           "id_usuario": "user123",
 *           "tipo": "post",
 *           "id_elemento": "post123",
 *           "motivo": "Contenido inapropiado",
 *           "fecha": "2024-11-21T10:00:00.000Z"
 *         },
 *         {
 *           "id": "denuncia2",
 *           "id_usuario": "user456",
 *           "tipo": "comentario",
 *           "id_elemento": "comentario789",
 *           "motivo": "Spam",
 *           "fecha": "2024-11-21T11:00:00.000Z"
 *         }
 *       ],
 *       "total": 2
 *     }
 *
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {post} /denuncia Crear una nueva denuncia
 * @apiName CreateDenuncia
 * @apiGroup Denuncia
 *
 * @apiBody {String} id_usuario ID del usuario que realiza la denuncia.
 * @apiBody {String} tipo Tipo de elemento denunciado (por ejemplo: "post" o "comentario").
 * @apiBody {String} id_elemento ID del elemento denunciado.
 * @apiBody {String} motivo Motivo de la denuncia.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X POST http://localhost:3000/denuncia/
 * 
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "id_usuario": "user123",
 *       "tipo": "post",
 *       "id_elemento": "post123",
 *       "motivo": "Contenido inapropiado"
 *     }
 *
 * @apiSuccess {String} mensaje Mensaje de confirmación.
 * @apiSuccess {Object} denuncia Detalles de la denuncia registrada.
 * @apiSuccess {String} denuncia.id_usuario ID del usuario que realizó la denuncia.
 * @apiSuccess {String} denuncia.tipo Tipo de elemento denunciado.
 * @apiSuccess {String} denuncia.id_elemento ID del elemento denunciado.
 * @apiSuccess {String} denuncia.motivo Motivo de la denuncia.
 * @apiSuccess {Date} denuncia.fecha Fecha en la que se realizó la denuncia.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 201 Created
 *     {
 *       "mensaje": "Denuncia registrada con éxito",
 *       "denuncia": {
 *         "id_usuario": "user123",
 *         "tipo": "post",
 *         "id_elemento": "post123",
 *         "motivo": "Contenido inapropiado",
 *         "fecha": "2024-11-21T12:00:00.000Z"
 *       }
 *     }
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
