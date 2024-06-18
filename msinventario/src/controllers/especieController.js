const { Especie } = require('../../models');

// Crear una nueva especie
const createEspecie = async (req, res) => {
    try {
        const especie = await Especie.create(req.body);
        res.status(201).json(especie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// listar todas las especies
const getEspecies = async (req, res) => {
    try {
        const especies = await Especie.findAll({
            order: [['id', 'ASC']]
          });
        res.status(200).json(especies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una especie por ID
const getEspecieById = async (req, res) => {
    try {
        const especie = await Especie.findByPk(req.params.id);
        if (!especie) {
            return res.status(404).json({ error: 'Especie no encontrada' });
        }
        res.status(200).json(especie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una especie por ID sin request
const getEspecie_By_Id = async (id) => {
    try {
        const especie = await Especie.findByPk(id);
        if (!especie) {
            throw new Error('Especie no encontrada');
        }
        return especie;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar una especie por ID
const updateEspecie = async (req, res) => {
    try {
        const [updated] = await Especie.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Especie no encontrada' });
        }
        const updatedEspecie = await Especie.findByPk(req.params.id);
        res.status(200).json(updatedEspecie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEspecie,
    getEspecies,
    getEspecieById,
    updateEspecie,
    getEspecie_By_Id
};
