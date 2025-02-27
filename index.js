import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import imagenRoutes from './routes/imageRoutes.js';
import authRoutes from './routes/authRoutes.js';
import {errorHandler} from './middleware/errorHandler.js';
import { AppDataSource } from './config/databaseConfig.js';





//importamos la confirguracion de swagger
const swagg = JSON.parse(readFileSync('./config/swagger.json', 'utf-8'));

const port = 3000;
const app = express();

//middelwares
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagg));
app.use('/imagen', imagenRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);
//inicializamos el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Swagger running on http://localhost:${port}/api-docs`);
});

//pruebas de db
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized successfully!'); 
  })
  .catch((err) => {
    console.error('Error initializing Data Source:', err);
  });


