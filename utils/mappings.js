const mapCarrera = async (usuarioDoc) => {
    const usuarioData = usuarioDoc.data();
    // Verifica si el campo `carrera` es una referencia de Firestore
    if (usuarioData.carrera && usuarioData.carrera.id) {
        try {
            // Consulta el documento de `carrera` y obtén sus datos
            const carreraDoc = await usuarioData.carrera.get();
            if (carreraDoc.exists) {
                usuarioData.carrera = carreraDoc.data(); // Reemplaza la referencia con los datos de `carrera`
            } else {
                usuarioData.carrera = null; // O maneja el caso en que `carrera` no existe
            }
        } catch (error) {
            console.error('Error al obtener el documento de carrera:', error);
            usuarioData.carrera = null; // Maneja el error en caso de fallo en la consulta
        }
    }
    return { id: usuarioDoc.id, ...usuarioData };
};

module.exports = {
    mapCarrera
}