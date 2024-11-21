/**
 * @api {get} /categoria Obtener todas las categorías
 * @apiName GetCategorias
 * @apiGroup Categoria
 *
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/categoria
 *
 * @apiSuccess {Object[]} categorias Lista de categorías.
 * @apiSuccess {String} categorias.id ID de la categoría.
 * @apiSuccess {String} categorias.nombre Nombre de la categoría.
 * @apiSuccess {String} [categorias.descripcion] Descripción opcional de la categoría.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": "categoria1",
 *         "nombre": "Tecnología",
 *         "descripcion": "Categoría relacionada con temas de tecnología."
 *       },
 *       {
 *         "id": "categoria2",
 *         "nombre": "Ciencia"
 *       }
 *     ]
 *
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {get} /categoria/:id Obtener una categoría por ID
 * @apiName GetCategoriaById
 * @apiGroup Categoria
 *
 * @apiParam {String} id ID de la categoría.
 * 
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/categoria/categoria1
 *
 * @apiSuccess {String} id ID de la categoría.
 * @apiSuccess {String} nombre Nombre de la categoría.
 * @apiSuccess {String} [descripcion] Descripción opcional de la categoría.
 * 
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "categoria1",
 *       "nombre": "Tecnología",
 *       "descripcion": "Categoría relacionada con temas de tecnología."
 *     }
 *
 * @apiError (Error 404) NotFound Categoría no encontrada.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
