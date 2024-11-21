/**
 * @api {get} /carrera Obtener todas las carreras
 * @apiName GetCarreras
 * @apiGroup Carrera
 *
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/carrera
 *
 * @apiSuccess {Object[]} carreras Lista de carreras.
 * @apiSuccess {String} carreras.id ID de la carrera.
 * @apiSuccess {String} carreras.nombre Nombre de la carrera.
 * @apiSuccess {String} carreras.clave Clave única de la carrera.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": "carrera1",
 *         "nombre": "Ingeniería en Sistemas Computacionales",
 *         "clave": "ISC"
 *       },
 *       {
 *         "id": "carrera2",
 *         "nombre": "Derecho",
 *         "clave": "DER"
 *       }
 *     ]
 *
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {get} /carrera/:id Obtener una carrera por ID
 * @apiName GetCarreraById
 * @apiGroup Carrera
 *
 * @apiParam {String} id ID de la carrera.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/carrera/carrera1
 *
 * @apiSuccess {String} id ID de la carrera.
 * @apiSuccess {String} nombre Nombre de la carrera.
 * @apiSuccess {String} clave Clave única de la carrera.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "carrera1",
 *       "nombre": "Ingeniería en Sistemas Computacionales",
 *       "clave": "ISC"
 *     }
 *
 * @apiError (Error 404) NotFound Carrera no encontrada.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {post} /carrera Crear una nueva carrera
 * @apiName CreateCarrera
 * @apiGroup Carrera
 *
 * @apiBody {String} nombre Nombre de la carrera.
 * @apiBody {String} clave Clave única de la carrera.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X POST http://localhost:3000/carrera
 * 
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "nombre": "Ingeniería en Sistemas Computacionales",
 *       "clave": "ISC"
 *     }
 *
 * @apiSuccess {String} id ID de la carrera creada.
 * @apiSuccess {String} nombre Nombre de la carrera.
 * @apiSuccess {String} clave Clave única de la carrera.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 201 Created
 *     {
 *       "id": "carrera1",
 *       "nombre": "Ingeniería en Sistemas Computacionales",
 *       "clave": "ISC"
 *     }
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {patch} /carrera/:id Actualizar una carrera por ID
 * @apiName UpdateCarrera
 * @apiGroup Carrera
 *
 * @apiParam {String} id ID de la carrera.
 * @apiBody {String} nombre Nombre actualizado de la carrera.
 * @apiBody {String} clave Clave única actualizada de la carrera.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X PATCH http://localhost:3000/carrera/carrera1
 * 
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "nombre": "Ingeniería en Software",
 *       "clave": "INS"
 *     }
 *
 * @apiSuccess {String} id ID de la carrera actualizada.
 * @apiSuccess {String} nombre Nombre actualizado de la carrera.
 * @apiSuccess {String} clave Clave única actualizada de la carrera.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "carrera1",
 *       "nombre": "Ingeniería en Software",
 *       "clave": "INS"
 *     }
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios.
 * @apiError (Error 404) NotFound Carrera no encontrada.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {delete} /carrera/:id Eliminar una carrera por ID
 * @apiName DeleteCarrera
 * @apiGroup Carrera
 *
 * @apiParam {String} id ID de la carrera.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i -X DELETE http://localhost:3000/carrera/carrera1
 *
 * @apiSuccess {String} message Mensaje de confirmación de eliminación.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Carrera eliminada"
 *     }
 *
 * @apiError (Error 404) NotFound Carrera no encontrada.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
