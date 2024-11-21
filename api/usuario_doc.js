/**
 * @api {get} /usuario Obtener todos los usuarios
 * @apiName GetUsuarios
 * @apiGroup Usuario
 *
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/usuario/
 * @apiSuccess {Object[]} data Lista de usuarios.
 * @apiSuccess {String} data.id ID del usuario.
 * @apiSuccess {String} data.nombre Nombre del usuario.
 * @apiSuccess {String} data.email Email del usuario.
 * @apiSuccess {String} data.pronombres Pronombres del usuario.
 * @apiSuccess {String} data.username Nombre de usuario.
 * @apiSuccess {Object} data.carrera Información de la carrera del usuario.
 * @apiSuccess {String} data.carrera.id ID de la carrera.
 * @apiSuccess {String} data.presentacion Presentación del usuario.
 * @apiSuccess {Object[]} data.contactos Lista de contactos del usuario.
 * @apiSuccess {Date} data.fecha_creacion Fecha de creación del usuario.
 * @apiSuccess {Number} total Total de usuarios.
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "12345",
 *           "nombre": "Juan Perez",
 *           "email": "juan.perez@example.com",
 *           "pronombres": "él",
 *           "username": "juanperez",
 *           "carrera": {
 *             "id": "carrera1",
 *             "nombre": "Ingeniería en Sistemas"
 *           },
 *           "presentacion": "Hola, soy Juan.",
 *           "contactos": [{"tipo": "email", "valor": "contacto@example.com"}],
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
 * @apiParam {String} id ID del usuario.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/usuario/12345
 * @apiSuccess {String} id ID del usuario.
 * @apiSuccess {String} nombre Nombre del usuario.
 * @apiSuccess {String} email Email del usuario.
 * @apiSuccess {String} pronombres Pronombres del usuario.
 * @apiSuccess {String} username Nombre de usuario.
 * @apiSuccess {Object} carrera Información de la carrera del usuario.
 * @apiSuccess {String} presentacion Presentación del usuario.
 * @apiSuccess {Object[]} contactos Lista de contactos del usuario.
 * @apiSuccess {Date} fecha_creacion Fecha de creación del usuario.
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "12345",
 *       "nombre": "Juan Perez",
 *       "email": "juan.perez@example.com",
 *       "pronombres": "él",
 *       "username": "juanperez",
 *       "carrera": {"id": "carrera1"},
 *       "presentacion": "Hola, soy Juan.",
 *       "contactos": [{"tipo": "email", "valor": "contacto@example.com"}],
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
 * @apiBody {String} id ID del usuario.
 * @apiBody {String} nombre Nombre del usuario.
 * @apiBody {String} email Email del usuario.
 * @apiBody {String} pronombres Pronombres del usuario.
 * @apiBody {String} username Nombre de usuario.
 * @apiBody {String} carrera ID de la carrera asociada al usuario.
 * @apiBody {String} presentacion Presentación del usuario.
 * @apiBody {Object[]} contactos Lista de contactos del usuario.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X POST http://localhost:3000/usuario/
 * @apiExample {json} Body de ejemplo:
 * {
 *   "id": "12345" (utilizar el id del usuario de firebase auth),
 *   "nombre": "Juan Perez",
 *   "email": "juan.perez@example.com" (debe ser con correo institucional),
 *   "pronombres": "él",
 *   "username": "juanperez",
 *   "carrera": "carrera1", (id de la carrera seleccionada)
 *   "presentacion": "Hola, soy Juan.",
 *   "contactos": [{"tipo": "email", "valor": "contacto@example.com"}]
 *   "foto": "ruta_firebase_storage_img.jpg",
 * 
 * }
 * @apiSuccess {String} id ID del nuevo usuario.
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 201 Created
 *     {
 *       "id": "12345"
 *     }
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {patch} /usuario/:id Actualizar un usuario por ID
 * @apiName UpdateUsuario
 * @apiGroup Usuario
 *
 * @apiParam {String} id ID del usuario.
 * @apiBody {String} nombre Nombre del usuario.
 * @apiBody {String} pronombres Pronombres del usuario.
 * @apiBody {String} username Nombre de usuario.
 * @apiBody {String} carrera ID de la carrera asociada.
 * @apiBody {String} presentacion Presentación del usuario.
 * @apiBody {String} foto URL de la foto del usuario.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X PATCH http://localhost:3000/usuario/12345
 * @apiExample {json} Body de ejemplo:
 * {
 *   "nombre": "Juan Actualizado"
 * }
 * @apiSuccess {String} id ID del usuario actualizado.
 *
 * @apiError (Error 404) NotFound Usuario no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {delete} /usuario/:id Eliminar un usuario por ID
 * @apiName DeleteUsuario
 * @apiGroup Usuario
 *
 * @apiParam {String} id ID del usuario.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X DELETE http://localhost:3000/usuario/12345
 * @apiSuccess {String} message Mensaje de confirmación.
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Usuario eliminado"
 *     }
 *
 * @apiError (Error 404) NotFound Usuario no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
