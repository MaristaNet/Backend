const mapCarrera = async (usuarioDoc,db) => {
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
        // Mapeo de contactos
        if (usuarioData.contactos && usuarioData.contactos.length > 0) {
            usuarioData.contactos = await mapContactos(usuarioDoc, db);
        } else {
            usuarioData.contactos = []; // Asegúrate de que sea un arreglo vacío si no hay contactos
        }
    
        return { id: usuarioDoc.id, ...usuarioData };
};
const mapContactos = async (usuarioDoc, db) => {
    const usuarioData = usuarioDoc.data();
    const contactos = usuarioData.contactos;

    if (contactos && contactos.length > 0) {
        const contactoPromises = contactos.map(async (contactoRef) => {
            // Verifica si contactoRef es una referencia de Firestore
            if (contactoRef) {
                try {
                    const contactoDoc = await contactoRef.get();
                    if (contactoDoc.exists) {
                        const contactoData = contactoDoc.data();
                        return {
                            nombre: contactoData.nombre,
                            foto: contactoData.foto,
                            email: contactoData.email,
                            username: contactoData.username,
                            pronombres: contactoData.pronombres,
                            presentacion: contactoData.presentacion,
                            carrera: {
                                id: contactoData.carrera?.id // Asegúrate de que esto sea correcto
                                // Puedes incluir el nombre de la carrera si está disponible
                            }
                        };
                    }  else {
                        return null; // O maneja el caso en que el contacto no existe
                    }
                } catch (error) {
                    console.error('Error al obtener el documento de contacto:', error);
                    return null; // Maneja el error en caso de fallo en la consulta
                }
            } else {
                // Si contactoRef no es una referencia, simplemente devuelve el objeto
                return contactoRef; // O maneja el caso según sea necesario
            }
        });

        const contactosData = await Promise.all(contactoPromises);
        return contactosData.filter(Boolean); // Filtra los nulls
    }

    return []; // Retorna un arreglo vacío si no hay contactos
};
module.exports = {
    mapCarrera, mapContactos
}