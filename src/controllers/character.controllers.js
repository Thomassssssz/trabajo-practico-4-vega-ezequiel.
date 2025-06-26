import Character from "../models/character.model.js";

//esto crea los personajes en nuestra base de datos
export const CreateCharacter = async (req, res) => {
    const { name, ki, race, gender, description } = req.body;

    //Aca le sacamos los espacios a los valores que sean string 
    if (req.body) {
        for (let propiedad in req.body) { //for para recorrer los datos
            if (typeof req.body[propiedad] === "string") {
                req.body[propiedad] = req.body[propiedad].trim();
            }
        }
    }

    try {
        //Validacion para que los datos no vengan vacios.
        if (name == undefined) return res.status(400).json({ Message: "Nombre no puede estar vacio" });
        if (ki == undefined) return res.status(400).json({ Message: "Ki no puede estar vacio" });
        if (race == undefined) return res.status(400).json({ Message: "Raza no puede estar vacio" });
        if (gender == undefined) return res.status(400).json({ Message: "Genero no puede estar vacio" });

        //validacion ki
        const kiEntero = Math.floor(ki);
        if (ki != kiEntero) return res.status(400).json({ Message: "Ki tiene que ser entero" });

        //Validacion genero
        if (gender != "Female" && gender != "Male") return res.status(400).json({ Message: "gender debe ser Female o Male" });

        //descripcion validacion
        if (description && typeof description != "string") return res.status(400).json({ Message: "Descripcion debe ser texto" });

        //validacion del nombre unico
        const nombreUnico = await Character.findOne({ where: { name } });
        if (nombreUnico != null) return res.status(400).json({ Message: "Nombre existente" });

        const character = await Character.create({ name, ki, race, gender, description });
        res.status(201).json({ Message: "Se creo el personaje ", character });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//esto actualiza personajes ya creados
export const ActualizacionPersonaje = async (req, res) => {
    const { name, ki, race, gender, description } = req.body;

    if (req.body) {
        for (let propiedad in req.body) {
            if (typeof req.body[propiedad] == "string") {
                req.body[propiedad] = req.body[propiedad].trim();
            }
        }
    }

    try {
        //validacion del nombre unico
        const nombreUnico = await Character.findOne({ where: { name } });
        if (nombreUnico && nombreUnico.id != req.params.id)
            return res.status(400).json({ Message: "Nombre existente" });

        const [updated] = await Character.update(
            { name, ki, race, gender, description },
            { where: { id: req.params.id } }
        );

        if (updated === 0) return res.status(404).json({ Message: "El personaje no existe" });

        return res.status(200).json({ Message: "Se actualizo el personaje" });

    } catch (error) {
        res.status(500).json({ Message: error.message });
    }
};

//Obtener todos los personajes func
export const obtenerTodosLosPersonajes = async (req, res) => {
    try {
        const personajes = await Character.findAll();
        if (!personajes || personajes.length === 0)
            return res.json({ Message: "No existe nada en la base de datos" });

        return res.status(200).json(personajes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//esto obtiene un personaje por id
export const ObtenerPorId = async (req, res) => {
    try {
        const personaje = await Character.findByPk(req.params.id);
        if (personaje) return res.status(200).json(personaje);

        return res.status(404).json({ Message: "El personaje no existe" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//esto elimina un personaje
export const eliminarPersonaje = async (req, res) => {
    try {
        const deleted = await Character.destroy({ where: { id: req.params.id } });

        if (deleted === 0) return res.status(404).json({ Message: "Personaje no encontrado" });

        res.status(204).send(); // Se debe enviar respuesta aunque sea sin cuerpo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
