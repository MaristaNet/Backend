/**
 * @api {post} /contacto/nuevo Agregar un nuevo contacto
 * @apiName AddContact
 * @apiGroup Contacto
 *
 * @apiBody {String} id_usuario ID del usuario que agrega el contacto.
 * @apiBody {String} id_contacto ID del contacto que será agregado.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X POST http://localhost:3000/contacto/nuevo
 * 
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "id_usuario": "user123",
 *       "id_contacto": "contact456"
 *     }
 *
 * @apiSuccess {String} message Mensaje de confirmación.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Contacto agregado exitosamente"
 *     }
 *
 * @apiError (Error 400) BadRequest No puedes agregarte como contacto o el contacto ya existe.
 * @apiError (Error 404) NotFound Usuario o contacto no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {get} /contacto Obtener los contactos de un usuario
 * @apiName GetContacts
 * @apiGroup Contacto
 *
 * @apiQuery {String} id_usuario ID del usuario para obtener su lista de contactos.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/contacto?id_usuario=user123
 *
 * @apiSuccess {Object[]} contactos Lista de contactos del usuario.
 * @apiSuccess {String} contactos.id ID del contacto.
 * @apiSuccess {String} contactos.nombre Nombre del contacto.
 * @apiSuccess {String} contactos.carrera Carrera del contacto.
 * @apiSuccess {String} contactos.pronombres Pronombres del contacto.
 * @apiSuccess {String} contactos.foto URL de la foto del contacto.
 * @apiSuccess {String} contactos.username Nombre de usuario.
 * @apiSuccess {String} contactos.email Email del contacto.
 * @apiSuccess {Number} total Número total de contactos.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "contactos": [
 *         {
 *           "id": "contact456",
 *           "nombre": "Maria Lopez",
 *           "carrera": "Ingeniería en Sistemas",
 *           "pronombres": "ella",
 *           "foto": "https://example.com/foto.jpg",
 *           "username": "marialopez",
 *           "email": "maria@example.com"
 *         },
 *         {
 *           "id": "contact789",
 *           "nombre": "Luis Garcia",
 *           "carrera": "Derecho",
 *           "pronombres": "él",
 *           "foto": "https://example.com/foto2.jpg",
 *           "username": "luisgarcia",
 *           "email": "luis@example.com"
 *         }
 *       ],
 *       "total": 2
 *     }
 *
 * @apiError (Error 400) BadRequest ID de usuario no proporcionado.
 * @apiError (Error 404) NotFound Usuario no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {delete} /contacto/:id_contacto Eliminar un contacto
 * @apiName DeleteContact
 * @apiGroup Contacto
 *
 * @apiParam {String} id_contacto ID del contacto que será eliminado.
 * @apiBody {String} id_usuario ID del usuario que elimina el contacto.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X DELETE http://localhost:3000/contacto/contact456
 * 
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "id_usuario": "user123"
 *     }
 *
 * @apiSuccess {String} message Mensaje de confirmación.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Contacto eliminado exitosamente"
 *     }
 *
 * @apiError (Error 404) NotFound Usuario o contacto no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
