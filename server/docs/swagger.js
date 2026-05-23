const swaggerJSDoc = require("swagger-jsdoc");

const port = Number(process.env.PORT || 5000);

// La spec est centralisee ici pour le moment car l'API reste petite.
// Si elle grandit, on pourra la decouper par groupes de routes.
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Trouve ton artisan API",
      version: "1.0.0",
      description:
        "Documentation de l'API backend pour la consultation des artisans et des categories.",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Serveur local",
      },
    ],
    tags: [
      {
        name: "Health",
        description: "Verification de disponibilite de l'API",
      },
      {
        name: "Artisans",
        description: "Consultation des artisans",
      },
      {
        name: "Categories",
        description: "Consultation des categories",
      },
    ],
    components: {
      schemas: {
        Category: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Bâtiment",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-05-23T10:15:30.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-05-23T10:15:30.000Z",
            },
          },
        },
        Artisan: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Jean Michel Michel",
            },
            specialty: {
              type: "string",
              example: "Menuisier",
            },
            rating: {
              type: "number",
              format: "float",
              example: 4.8,
            },
            city: {
              type: "string",
              example: "Lyon",
            },
            about: {
              type: "string",
              example: "Artisan reconnu pour la qualite de son accompagnement.",
            },
            email: {
              type: "string",
              format: "email",
              example: "artisan@example.com",
              nullable: true,
            },
            website: {
              type: "string",
              example: "https://artisan.example.com",
              nullable: true,
            },
            top: {
              type: "boolean",
              example: true,
            },
            categoryId: {
              type: "integer",
              example: 1,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-05-23T10:15:30.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-05-23T10:15:30.000Z",
            },
          },
        },
        ArtisanWithCategory: {
          allOf: [
            {
              $ref: "#/components/schemas/Artisan",
            },
            {
              type: "object",
              properties: {
                Category: {
                  $ref: "#/components/schemas/Category",
                },
              },
            },
          ],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Erreur lors de la récupération des artisans.",
            },
          },
        },
      },
    },
    paths: {
      "/": {
        get: {
          tags: ["Health"],
          summary: "Verifier que l'API repond",
          responses: {
            200: {
              description: "API disponible",
              content: {
                "text/plain": {
                  schema: {
                    type: "string",
                    example: "API OK",
                  },
                },
              },
            },
          },
        },
      },
      "/api/artisans": {
        get: {
          tags: ["Artisans"],
          summary: "Lister tous les artisans",
          responses: {
            200: {
              description: "Liste des artisans",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/ArtisanWithCategory",
                    },
                  },
                },
              },
            },
            500: {
              description: "Erreur serveur",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/artisans/{id}": {
        get: {
          tags: ["Artisans"],
          summary: "Recuperer un artisan par son identifiant",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Identifiant de l'artisan",
              schema: {
                type: "integer",
                example: 1,
              },
            },
          ],
          responses: {
            200: {
              description: "Artisan trouve",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ArtisanWithCategory",
                  },
                },
              },
            },
            404: {
              description: "Artisan introuvable",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            500: {
              description: "Erreur serveur",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/categories": {
        get: {
          tags: ["Categories"],
          summary: "Lister toutes les categories",
          responses: {
            200: {
              description: "Liste des categories",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Category",
                    },
                  },
                },
              },
            },
            500: {
              description: "Erreur serveur",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJSDoc(options);
