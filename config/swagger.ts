import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "'우리 결혼해요' API Docs",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"], // JSDoc 주석 경로
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Application) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
