import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFile = ["../routes/api.ts"];

const doc = {
  info: {
    version: "0.0.1",
    title: "Acara API Documentation",
    description: "Acara API Documentation",
  },
  servers: [
    { url: "http://localhost:3000/api", description: "Local-Server" },
    {
      url: "https://back-end-acara-ryn.vercel.app/api",
      description: "Deployment-Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      RegisterRequest: {
        fullName: "kocheng oren",
        username: "kochengoren",
        email: "kochengoren@yopmail.com",
        password: "Kocheng123",
        confirmPassword: "Kocheng123",
      },
      LoginRequest: {
        identifier: "kochengoren",
        password: "Kocheng123",
      },
      ActivationRequest: {
        code: "abcdefghijklmnopqrstuvwxyz",
      },
      CreateCategory: {
        name: "category 1",
        description: "category description 1",
        icon: "category.png",
      },
      RemoveMedia: {
        fileURL: "",
      },
      CreateEvent: {
        name: "acara 2 - coba coba",
        startDate: "2025-08-28 15:37:00",
        endDate: "2003-02-16 15:37:00",
        description: "deskripsi acara 1 cobacoba",
        banner:
          "http://res.cloudinary.com/durftt5go/image/upload/v1746890865/kte27mkurpeqg6vkyq8x.jpg",
        isFeatured: true,
        isOnline: true,
        isPublish: "false",
        category: "681f716a31dcf382829608bc",
        CreatedBy: "681866eb63146c797fd57c83",
        location: {
          region: 31,
          coordinates: [-6.131353, 106.841888],
        },
      },
    },
  },
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFile, doc);
