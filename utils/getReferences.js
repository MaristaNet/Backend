//obtener referencia de carrera durante el POST de usuario
const getCarreraRef = async (carreraId,db) => {
    const carreraRef = db.collection('carrera').doc(carreraId);
    const carreraDoc = await carreraRef.get();
    
    if (!carreraDoc.exists) {
        throw new Error(`El id de carrera ${carreraId} no existe`);
    }
    
    return carreraRef;
};

module.exports = {
    getCarreraRef
};