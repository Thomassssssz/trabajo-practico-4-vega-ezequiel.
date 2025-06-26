import express from "express";
import { CreateCharacter, obtenerTodosLosPersonajes, ObtenerPorId, ActualizacionPersonaje, eliminarPersonaje } from "../controllers/character.controllers.js";
const router  = express.Router();

router.post("/characters", CreateCharacter);

router.get("/characters", obtenerTodosLosPersonajes);

router.get("/characters/:id", ObtenerPorId);

router.put("/characters/:id", ActualizacionPersonaje);

router.delete("/characters/:id", eliminarPersonaje);


export default router; 


