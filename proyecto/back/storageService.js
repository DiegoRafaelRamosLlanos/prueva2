import XLSX from "xlsx";
import fs from "fs";
import path from "path";

// Configuración de la ruta del archivo Excel
const getExcelPath = () => {
    // En producción (Render), usar una ruta persistente
    if (process.env.NODE_ENV === 'production') {
        return process.env.EXCEL_PATH || '/opt/render/project/data/archivo.xlsx';
    }
    // En desarrollo, usar la ruta local
    return path.join(process.cwd(), "excel/archivo.xlsx");
};

// Asegurarse de que el directorio existe
const ensureDirectoryExists = (filePath) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Verificar si el archivo existe, si no, crear uno nuevo
const initializeExcelFile = (filePath) => {
    if (!fs.existsSync(filePath)) {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, filePath);
    }
};

export { getExcelPath, ensureDirectoryExists, initializeExcelFile };