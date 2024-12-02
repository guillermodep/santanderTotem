import './apm';  // Importar APM al inicio del archivo
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import canvas from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

// Agregar middleware de APM después de crear la app
app.use((req, res, next) => {
  res.apm = apm;
  next();
});

// Crear las carpetas necesarias
const uploadDir = path.join(__dirname, '../../uploads/identity-photos');
const fotosDir = path.join(__dirname, '../../server/uploads/fotos');

[uploadDir, fotosDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Función para obtener características básicas de una imagen
async function getImageFeatures(imagePath: string) {
  try {
    const img = await canvas.loadImage(imagePath);
    const cvs = canvas.createCanvas(img.width, img.height);
    const ctx = cvs.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // Obtener datos de la imagen
    const imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
    const data = imageData.data;
    
    // Calcular promedio de colores y brillo
    let totalR = 0, totalG = 0, totalB = 0;
    for (let i = 0; i < data.length; i += 4) {
      totalR += data[i];
      totalG += data[i + 1];
      totalB += data[i + 2];
    }
    
    const pixels = data.length / 4;
    return {
      avgR: totalR / pixels,
      avgG: totalG / pixels,
      avgB: totalB / pixels,
      width: img.width,
      height: img.height
    };
  } catch (error) {
    console.error('Error al obtener características de la imagen:', error);
    return null;
  }
}

// Función para calcular similitud entre dos imágenes
function calculateSimilarity(features1: any, features2: any) {
  if (!features1 || !features2) return 0;
  
  // Calcular diferencia en proporciones
  const aspectRatio1 = features1.width / features1.height;
  const aspectRatio2 = features2.width / features2.height;
  const ratioDiff = Math.abs(aspectRatio1 - aspectRatio2);
  
  // Calcular diferencia en colores
  const colorDiff = Math.abs(features1.avgR - features2.avgR) +
                   Math.abs(features1.avgG - features2.avgG) +
                   Math.abs(features1.avgB - features2.avgB);
  
  // Normalizar diferencias
  const ratioSimilarity = Math.max(0, 100 - (ratioDiff * 100));
  const colorSimilarity = Math.max(0, 100 - (colorDiff / 7.65)); // 765 es el máximo de diferencia posible
  
  // Combinar similitudes
  return (ratioSimilarity * 0.3 + colorSimilarity * 0.7);
}

async function compareFaces(newPhotoPath: string) {
  try {
    const storedPhotos = fs.readdirSync(fotosDir);
    console.log('Fotos almacenadas:', storedPhotos);

    if (storedPhotos.length === 0) {
      console.log('No hay fotos almacenadas para comparar');
      return null;
    }

    const newPhotoFeatures = await getImageFeatures(newPhotoPath);
    if (!newPhotoFeatures) {
      console.log('No se pudieron obtener características de la nueva foto');
      return null;
    }

    let bestMatch = {
      name: '',
      similarity: 0
    };

    for (const photo of storedPhotos) {
      if (photo.startsWith('.')) continue;

      const storedPhotoPath = path.join(fotosDir, photo);
      const storedFeatures = await getImageFeatures(storedPhotoPath);
      
      if (storedFeatures) {
        const similarity = calculateSimilarity(newPhotoFeatures, storedFeatures);
        const personName = path.parse(photo).name;
        
        console.log(`Comparando con ${personName}: ${similarity.toFixed(2)}% de similitud`);

        if (similarity > bestMatch.similarity) {
          bestMatch = {
            name: personName,
            similarity: similarity
          };
        }
      }
    }

    if (bestMatch.similarity > 75) {
      console.log(`\nMejor coincidencia encontrada:`);
      console.log(`Nombre: ${bestMatch.name}`);
      console.log(`Similitud: ${bestMatch.similarity.toFixed(2)}%`);
      return bestMatch.name;
    }

    console.log('\nNo se encontraron coincidencias con suficiente similitud');
    return null;
  } catch (error) {
    console.error('Error en comparación:', error);
    return null;
  }
}

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'identity-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Función para eliminar archivo
function deleteFile(filePath: string) {
  try {
    fs.unlinkSync(filePath);
    console.log('Archivo eliminado:', filePath);
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
  }
}

// Iniciar servidor
async function startServer() {
  app.post('/api/save-photo', upload.single('photo'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ninguna imagen' });
    }

    try {
      console.log('\nNueva foto recibida:', req.file.filename);
      console.log('Iniciando proceso de comparación...');
      
      const matchedPerson = await compareFaces(req.file.path);
      
      // Eliminar la foto después de procesarla
      deleteFile(req.file.path);
      
      res.json({
        success: true,
        matched: !!matchedPerson,
        personName: matchedPerson || 'Usuario Desconocido',
        filename: req.file.filename
      });
    } catch (error) {
      // Asegurarse de eliminar la foto incluso si hay un error
      if (req.file) {
        deleteFile(req.file.path);
      }
      console.error('Error:', error);
      res.status(500).json({ error: 'Error al procesar la imagen' });
    }
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log('Directorio de uploads:', uploadDir);
    console.log('Directorio de fotos de referencia:', fotosDir);
  });
}

startServer().catch(console.error); 