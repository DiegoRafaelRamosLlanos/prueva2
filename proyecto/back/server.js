import express from "express";
import crudRoutes from './routes/crudRoutes.js';
import cors from "cors";
import { getExcelPath, ensureDirectoryExists, initializeExcelFile } from './storageService.js';

const app = express();
const port = process.env.PORT || 3001;

// Configuración de CORS más flexible
app.use(cors({
    origin: ['http://localhost:3000', process.env.FRONTEND_URL,'https://prueva2.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

app.use(express.json());

// Inicializar el archivo Excel
const excelPath = getExcelPath();
ensureDirectoryExists(excelPath);
initializeExcelFile(excelPath);

app.use('/proyecto', crudRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`Usando archivo Excel en: ${excelPath}`);
});