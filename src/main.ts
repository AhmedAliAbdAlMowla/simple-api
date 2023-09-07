import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionBindFilter } from './global-exception-bind/global-exception-bind.filter';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger';
import helmet from "helmet";
import * as compression from "compression";
import {corsOptions} from './config/cors.config'


async function bootstrap() {

  // Create a NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Enable cors
  app.enableCors(corsOptions);
    
  // Enable compression middleware
  app.use(compression());

  // Enable helmet middleware with default security policies
  app.use(helmet());
  
  // Define the port where the server will listen
  const PORT = process.env.PORT || 3000;

  // Set a global prefix for all routes
  app.setGlobalPrefix('api/v1');

  // Use a global exception filter for handling exceptions
  app.useGlobalFilters(new GlobalExceptionBindFilter());

  // Set up Swagger documentation route
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Start the server and listen on the defined port
  await app.listen(PORT);
  console.log(`Server started on port ${PORT}..✌️✌️ 🥤`);
}

// Call the bootstrap function to start the application
bootstrap();
