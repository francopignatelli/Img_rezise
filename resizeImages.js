const fs = require('fs');
const sharp = require('sharp');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.question('Por favor, ingrese la dirección de la carpeta de entrada: ', (inputFolder) => {
    rl.question('Por favor, ingrese la resolución deseada (ejemplo: 1920x1080): ', (resolution) => {
        const [width, height] = resolution.split('x').map(Number);

     // Verifica si la entrada del usuario es válida
     if (isNaN(width) || isNaN(height)) {
        console.error('La resolución ingresada no es válida.');
        rl.close();
        return;
      }

    // Crea la carpeta de salida si no existe
    const outputFolder = 'output_folder'; // Nombre de la carpeta de salida para las imágenes con resolución cambiada
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }


// Lista los archivos en la carpeta de entrada
fs.readdir(inputFolder, (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta de entrada:', err);
      return;
    }

//variable de rastreo de progreso
let processedCount = 0;

// Itera sobre cada archivo en la carpeta de entrada
files.forEach((file) => {
    // Verifica si el archivo es una imagen 
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      // Lee la imagen original
      const inputPath = `${inputFolder}/${file}`;
      const outputPath = `${outputFolder}/${file}`;

      // Cambia la resolución de la imagen y la guarda en la carpeta de salida
      sharp(inputPath)
        .resize(width, height) // Cambia la resolución aquí según tus necesidades
        .toFile(outputPath, (err) => {
          if (err) {
            console.error(`Error al procesar ${file}:`, err);
          } else {
            console.log(`Imagen ${file} procesada y guardada en ${outputPath}`);
            //Incrementa el contador
            processedCount++;
          }

          if (processedCount === files.length) {
            console.log(`Se han realizado las modificaciones. Todas las imagenes han sido ajustadas a la resolucion: ${width}x${height}`);
          }
            });
        }
    });
    rl.close(); // Cierra la interfaz de lectura después de completar el procesamiento
});
});
});
