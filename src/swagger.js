import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management API",
      version: "1.0.0",
      description: "API documentation for Student and Course Management System",
      contact: {
        name: "API Support",
        email: "support@example.com"
      }
    },
    servers: [
      {
        url: process.env.API_URL,
        description: "Development server"
      }
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["name", "email"],
          properties: {
            id: {
              type: "integer",
              description: "User ID (auto-generated)",
              example: 1
            },
            name: {
              type: "string",
              description: "User name",
              example: "John Doe"
            },
            email: {
              type: "string",
              format: "email",
              description: "User email (must be unique)",
              example: "john.doe@example.com"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when user was created",
              example: "2025-12-23T10:00:00.000Z"
            },
            courses: {
              type: "array",
              description: "List of courses the user is enrolled in",
              items: {
                $ref: "#/components/schemas/Course"
              }
            }
          }
        },
        Course: {
          type: "object",
          required: ["title", "code"],
          properties: {
            id: {
              type: "integer",
              description: "Course ID (auto-generated)",
              example: 1
            },
            title: {
              type: "string",
              description: "Course title",
              example: "Introduction to Computer Science"
            },
            code: {
              type: "string",
              description: "Course code (must be unique)",
              example: "CS101"
            },
            description: {
              type: "string",
              description: "Course description (optional)",
              example: "An introductory course covering fundamental concepts in computer science"
            }
          }
        },
        UserInput: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: {
              type: "string",
              description: "User name",
              example: "John Doe"
            },
            email: {
              type: "string",
              format: "email",
              description: "User email",
              example: "john.doe@example.com"
            }
          }
        },
        CourseInput: {
          type: "object",
          required: ["title", "code"],
          properties: {
            title: {
              type: "string",
              description: "Course title",
              example: "Introduction to Computer Science"
            },
            code: {
              type: "string",
              description: "Course code",
              example: "CS101"
            },
            description: {
              type: "string",
              description: "Course description",
              example: "An introductory course covering fundamental concepts"
            }
          }
        },
        EnrollmentInput: {
          type: "object",
          required: ["userId", "courseId"],
          properties: {
            userId: {
              type: "integer",
              description: "User ID to enroll",
              example: 1
            },
            courseId: {
              type: "integer",
              description: "Course ID to enroll in",
              example: 1
            }
          }
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
              example: "An error occurred"
            }
          }
        },
        ValidationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                    example: "Name is required"
                  },
                  param: {
                    type: "string",
                    example: "name"
                  },
                  location: {
                    type: "string",
                    example: "body"
                  }
                }
              }
            }
          }
        },
        SuccessMessage: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Operation completed successfully"
            }
          }
        },
        DeleteUserResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "User deleted successfully"
            },
            deletedUser: {
              $ref: "#/components/schemas/User"
            }
          }
        },
        EnrollmentResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Enrolled successfully"
            },
            student: {
              $ref: "#/components/schemas/User"
            }
          }
        }
      }
    },
    tags: [
      {
        name: "Users",
        description: "User management endpoints"
      },
      {
        name: "Students",
        description: "Student management endpoints"
      },
      {
        name: "Courses",
        description: "Course management endpoints"
      },
      {
        name: "Enrollment",
        description: "Course enrollment endpoints"
      }
    ]
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};