import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Definir la ruta absoluta para `uploads`
const uploadDir = path.join(process.cwd(), 'uploads');

// Si `uploads/` no existe, la crea
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Función para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error('Solo se permiten imágenes (JPG, PNG, GIF, WEBP)'));
  }
};

// Configuración de Multer con fileFilter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const user= req.user;
    const fileRoute = `${user}_${Date.now()}${path.extname(file.originalname)}`;
    req.fileRoute = fileRoute;
    cb(null, fileRoute);
  },
});

const upload = multer({ 
  storage, 
  fileFilter, // Aplica el filtro de archivos
});

export default upload;