import { app } from "electron";
import { copyFile } from "fs";
import { basename, join } from "path";

// Función para guardar el archivo en una carpeta local
export function saveFileLocally(filePath: string) {
    const fileName = basename(filePath); // Obtiene el nombre del archivo
    const destinationPath = join(app.getPath("userData"), fileName); // Guardarlo en la carpeta 'userData'

    // Leer el archivo
    copyFile(filePath, destinationPath, (err) => {
        if (err) {
            console.error("Error al copiar el archivo:", err);
        } else {
            console.log(`Archivo guardado en: ${destinationPath}`);

            // Aquí puedes agregar la lógica para subirlo al Drive.
            // Por ejemplo, llamando a una función para manejar la carga en Drive.
            uploadToDrive(destinationPath);
        }
    });
}

function uploadToDrive(filePath: string) {
    console.log(`Subiendo archivo ${filePath} a Google Drive...`);
    // Implementar aquí la lógica de subida a Google Drive o cualquier otro servicio.
}
