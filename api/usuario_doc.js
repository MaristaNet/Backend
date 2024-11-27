/**
 * @api {get} /usuario Obtener todos los usuarios
 * @apiName GetUsuarios
 * @apiGroup Usuario
 *
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/usuario
 *
 * @apiSuccess {Object[]} data Lista de usuarios encontrados.
 * @apiSuccess {String} data.id ID del usuario.
 * @apiSuccess {String} data.nombre Nombre del usuario.
 * @apiSuccess {String} data.email Email del usuario.
 * @apiSuccess {String} data.pronombres Pronombres del usuario.
 * @apiSuccess {String} data.username Nombre de usuario.
 * @apiSuccess {String} [data.foto] URL de la foto del usuario.
 * @apiSuccess {String} [data.presentacion] Presentación personal del usuario.
 * @apiSuccess {String} [data.post] ID del último post relacionado al usuario.
 * @apiSuccess {String} data.carrera ID de la carrera relacionada con el usuario.
 * @apiSuccess {Date} data.fecha_creacion Fecha de creación del usuario.
 * @apiSuccess {Number} total Número total de usuarios.
 *
 * @apiSuccessExample {json} Respuesta de éxito:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "user123",
 *           "nombre": "Juan Perez",
 *           "email": "juan.perez@example.com",
 *           "pronombres": "él",
 *           "username": "juanperez",
 *           "foto": "https://example.com/foto.jpg",
 *           "presentacion": "Hola, soy Juan.",
 *           "post": null,
 *           "carrera": "carrera1",
 *           "fecha_creacion": "2024-11-21T10:00:00.000Z"
 *         }
 *       ],
 *       "total": 1
 *     }
 *
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {get} /usuario/:id Obtener un usuario por ID
 * @apiName GetUsuarioById
 * @apiGroup Usuario
 *
 * @apiParam {String} id ID del usuario a buscar.
 *
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/usuario/user123
 *
 * @apiSuccess {String} id ID del usuario.
 * @apiSuccess {String} nombre Nombre del usuario.
 * @apiSuccess {String} email Email del usuario.
 * @apiSuccess {String} pronombres Pronombres del usuario.
 * @apiSuccess {String} username Nombre de usuario.
 * @apiSuccess {String} [foto] URL de la foto del usuario.
 * @apiSuccess {String} [presentacion] Presentación personal del usuario.
 * @apiSuccess {String} [post] ID del último post relacionado al usuario.
 * @apiSuccess {String} carrera ID de la carrera relacionada con el usuario.
 * @apiSuccess {Date} fecha_creacion Fecha de creación del usuario.
 *
 * @apiSuccessExample {json} Respuesta de éxito:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "user123",
 *       "nombre": "Juan Perez",
 *       "email": "juan.perez@example.com",
 *       "pronombres": "él",
 *       "username": "juanperez",
 *       "foto": "https://example.com/foto.jpg",
 *       "presentacion": "Hola, soy Juan.",
 *       "post": null,
 *       "carrera": "carrera1",
 *       "fecha_creacion": "2024-11-21T10:00:00.000Z"
 *     }
 *
 * @apiError (Error 404) NotFound Usuario no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {post} /usuario Crear un nuevo usuario
 * @apiName CreateUsuario
 * @apiGroup Usuario
 *
 * @apiBody {String} [id] ID único del usuario (si no se proporciona, se genera automáticamente).
 * @apiBody {String} nombre Nombre del usuario.
 * @apiBody {String} email Email del usuario.
 * @apiBody {String} pronombres Pronombres del usuario.
 * @apiBody {String} username Nombre de usuario.
 * @apiBody {String} carrera ID de la carrera relacionada con el usuario.
 * @apiBody {String} [foto] URL de la foto del usuario.
 * @apiBody {String} [post] ID del último post relacionado al usuario.
 * @apiBody {String} presentacion Presentación personal del usuario.
 *
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X POST http://localhost:3000/usuario
 *
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "nombre": "Juan Perez",
 *       "email": "juan.perez@example.com",
 *       "pronombres": "él",
 *       "username": "juanperez",
 *       "carrera": "carrera1",
 *       "presentacion": "Hola, soy Juan."
 *     }
 *
 * @apiSuccess {String} id ID del usuario creado.
 * @apiSuccess {String} nombre Nombre del usuario.
 * @apiSuccess {String} email Email del usuario.
 * @apiSuccess {String} pronombres Pronombres del usuario.
 * @apiSuccess {String} username Nombre de usuario.
 * @apiSuccess {String} carrera ID de la carrera relacionada con el usuario.
 * @apiSuccess {String} [foto] URL de la foto del usuario.
 * @apiSuccess {String} [post] ID del último post relacionado al usuario.
 * @apiSuccess {String} presentacion Presentación personal del usuario.
 * @apiSuccess {Date} fecha_creacion Fecha de creación del usuario.
 *
 * @apiSuccessExample {json} Respuesta de éxito:
 *     HTTP/1.1 201 Created
 *     {
 *       "id": "user123",
 *       "nombre": "Juan Perez",
 *       "email": "juan.perez@example.com",
 *       "pronombres": "él",
 *       "username": "juanperez",
 *       "carrera": "id_carrera1",
 *       "presentacion": "Hola, soy Juan.",
 *       "fecha_creacion": "2024-11-21T10:00:00.000Z"
 *     }
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {patch} /usuario/:id Actualizar un usuario
 * @apiName UpdateUsuario
 * @apiGroup Usuario
 *
 * @apiParam {String} id ID del usuario a actualizar.
 *
 * @apiBody {String} [nombre] Nombre del usuario.
 * @apiBody {String} [email] Email del usuario.
 * @apiBody {String} [pronombres] Pronombres del usuario.
 * @apiBody {String} [username] Nombre de usuario.
 * @apiBody {String} [carrera] ID de la carrera relacionada con el usuario.
 * @apiBody {String} [foto] URL de la foto del usuario.
 * @apiBody {String} [presentacion] Presentación personal del usuario.
 *
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X PATCH http://localhost:3000/usuario/user123
 *
 * @apiSuccess {String} id ID del usuario actualizado.
 *
 * @apiSuccessExample {json} Respuesta de éxito:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "user123",
 *       "nombre": "Juan Perez Actualizado"
 *     }
 *
 * @apiError (Error 404) NotFound Usuario no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {delete} /usuario/:id Eliminar un usuario
 * @apiName DeleteUsuario
 * @apiGroup Usuario
 *
 * @apiParam {String} id ID del usuario a eliminar.
 *
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X DELETE http://localhost:3000/usuario/user123
 *
 * @apiSuccess {String} message Mensaje de confirmación.
 *
 * @apiSuccessExample {json} Respuesta de éxito:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Usuario eliminado"
 *     }
 *
 * @apiError (Error 404) NotFound Usuario no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
