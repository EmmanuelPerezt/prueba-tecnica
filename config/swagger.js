import swaggerAutogen from "swagger-autogen";



const doc = {
    info: {
        title: "API con Swagger",
        description: "Documentación generada automáticamente",
    },
    host: "localhost:3000",
    schemes: ["http"],
};

const outputFile = "./swagger.json";  // Archivo donde se guardará la documentación
const endpointsFiles = ["./index.js"]; // Archivo donde están tus rutas

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    console.log("✅ Documentación generada, ejecuta `node index.js` para ver Swagger.");
});