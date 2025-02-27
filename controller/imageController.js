import { Tracking } from "../dist/models/tracking.js";
import { AppDataSource } from "../config/databaseConfig.js";
import { fileURLToPath } from "url";

import path from "path";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const trackingRepository = AppDataSource.getRepository(Tracking);

// Función para manejar la subida de imagen
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No se ha subido ninguna imagen." });
    }
    //en esta parte haremos el manejo de edicion de la imagen subida
    //por ejemplo, cambiar el tamaño, el formato, etc.
    const { width, height, grayscale, quality, rotate, crop, contrast, saturation, watermarkText, format, quality: qualityParam } = req.query;
    const uploadDir = path.join(__dirname, "../uploads");
    const rutapath = `edited_${req.user}_${Date.now()}${path.extname(
      req.file.originalname
    )}`;
    const editpath = path.join(uploadDir, rutapath);
    const originalPath = path.join(uploadDir, req.fileRoute);
    //nos aseguramos de haya querys en la url para no duplicar la imagen
    if (Object.keys(req.query).length > 0) {
      let image = sharp(originalPath);
      if (width || height) {
        image = image.resize(parseInt(width) || null, parseInt(height) || null);
      }
      if (grayscale === "true") {
        image = image.grayscale();
      }
      if (quality) {
        image = image.jpeg({ quality: parseInt(quality) });
      }
      // Rotar imagen
      if (rotate) {
        image = image.rotate(parseInt(rotate));
      }

      // Recortar imagen
      if (crop) {
        const [left, top, cropWidth, cropHeight] = crop.split(",").map(Number);
        image = image.extract({
          left,
          top,
          width: cropWidth,
          height: cropHeight,
        });
      }

      // Ajuste de contraste
      if (contrast) {
        image = image.modulate({ contrast: parseFloat(contrast) });
      }

      // Ajuste de saturación
      if (saturation) {
        image = image.modulate({ saturation: parseFloat(saturation) });
      }

      // Añadir texto como marca de agua
      if (watermarkText) {
        image = image.composite([
          {
            input: Buffer.from(
              `<svg><text x="10" y="20" font-size="24" fill="white">${watermarkText}</text></svg>`
            ),
            gravity: "southeast", // Posición de la marca de agua
          },
        ]);
      }

      // Cambiar formato (ejemplo: convertir a PNG)
      if (format) {
        if (format === "webp") {
          image = image.webp({ quality: 80 });
        } else if (format === "png") {
          image = image.png();
        }
      }

      //guardar la imagen editada en el gestor de archivos local
      await image.toFile(editpath);

      //guardar el tracking del archivo editado
      const trackingItemEdit = trackingRepository.create({
        user: req.user,
        fileName: rutapath,
      });
      await trackingRepository.save(trackingItemEdit);
    }

    //guardar el tracking del archivo original
    const trackingItem = trackingRepository.create({
      user: req.user,
      fileName: req.fileRoute,
    });
    await trackingRepository.save(trackingItem);

    res.status(200).json({
      message: "Imagen subida con éxito",
      file: {
        name: req.file.originalname,
        editedName:
          Object.keys(req.query).length > 0
            ? `edited_${req.fileRoute}`
            : "no se edito la foto",
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al subir la imagen",
      error: error.message,
    });
    console.log(error);
  }
};

// funcion para obtener todas las imagenes de un usuario

export const getImages = async (req, res) => {
  const username = req.params.username;

  try {
    // Consultar la base de datos para obtener los archivos del usuario
    const images = await trackingRepository.find({
      where: { user: username },
    });

    if (images.length === 0) {
      return res.status(404).json({ message: "No se encontraron imágenes" });
    }

    // Generar las URLs accesibles
    const userImages = images.map((image) => ({
      fileName: image.fileName,
      url: `${req.protocol}://${req.get("host")}/imagen/uploads/${
        image.fileName
      }`,
    }));

    res.status(200).json(userImages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener imágenes", error: error.message });
  }
};

// funcion para servir una imagen

export const serveImage = (req, res) => {
  res.sendFile(req.filePath);
};
