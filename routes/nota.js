import express from "express";
const router = express.Router();

// Importar el modelo nota
import Nota from "../models/nota";

// ADD note
router.post("/nueva-nota", async (req, res) => {
	const body = req.body;
	try {
		const notaDB = await Nota.create(body);
		res.status(200).json(notaDB);
	} catch (error) {
		return res.status(500).json({
			mensaje: "Ocurrió un error",
			error,
		});
	}
});

// GET
router.get("/nota/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const notaDB = await Nota.findOne({ id });
		res.json(notaDB);
	} catch (error) {
		return res.status(400).json({
			mensaje: "Ocurrió un error",
			error,
		});
	}
});

// GET all notes
router.get("/nota", async (req, res) => {
	try {
		const notaDb = await Nota.find();
		res.json(notaDb);
	} catch (error) {
		return res.status(400).json({
			mensaje: "Ocurrió un error",
			error,
		});
	}
});

// DELETE note
router.delete("/nota/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const notaDb = await Nota.findByIdAndDelete({ id });
		if (!notaDb) {
			return res.status(400).json({
				mensaje: "No se encontró el id indicado",
				error,
			});
		}
		res.json(notaDb);
	} catch (error) {
		return res.status(400).json({
			mensaje: "Ocurrió un error",
			error,
		});
	}
});

// UPDATE note
router.put("/nota/:id", async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	try {
		const notaDb = await Nota.findByIdAndUpdate(id, body, { new: true });
		res.json(notaDb);
	} catch (error) {
		return res.status(400).json({
			mensaje: "Ocurrió un error",
			error,
		});
	}
});

// Exportamos la configuración de express app
module.exports = router;
