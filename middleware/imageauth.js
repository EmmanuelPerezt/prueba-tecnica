import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { fileURLToPath } from 'url';
import { Tracking } from "../dist/models/tracking.js";
import { AppDataSource } from "../config/databaseConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_DIR = path.join(__dirname, "../uploads"); // Ruta de las imágenes

const trackingRepository = AppDataSource.getRepository(Tracking);

const verifyImageAccess = async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1]; // Obtener el token
    if (!token) {
      return res.status(401).json({ message: "Acceso no autorizado: Token requerido" });
    }
    try {
      const decoded = jwt.verify(token, 'secretoseguro'); // Usar variable de entorno para la clave
      const username = decoded.username; // Extraer el nombre de usuario del token
  
      const fileName = req.params.file;// Nombre del archivo solicitado
  
      // Verificar en la base de datos si el archivo pertenece al usuario
      const image = await trackingRepository.findOne({
        where: { fileName: fileName, user: username }, // Verificar si el archivo está asociado al usuario
      });
      if (!image) {
        return res.status(403).json({ message: "Acceso prohibido: No tienes acceso a este archivo" });
      }
  
      const filePath = path.join(UPLOADS_DIR, fileName);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Archivo no encontrado",ruta:fs.existsSync(filePath) });
        
      }
  
      req.filePath = filePath; // Guardamos la ruta en el request
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido o expirado", error: error.message });
    }
};

export default verifyImageAccess;