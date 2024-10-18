import swaggerAutogen from 'swagger-autogen';

const swaggerAutogenInstance = swaggerAutogen();

const doc = {
  info: {
    title: 'Gym App API',
    version: '1.0.0',
    description: 'API for Gym App',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';

// Use glob pattern to match all route files
const routes = ['src/routes/*.ts'];

// Generate Swagger documentation
swaggerAutogenInstance(outputFile, routes, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
}).catch((error) => {
  console.error('Error generating Swagger documentation:', error);
});
