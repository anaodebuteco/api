require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Swagger (OpenAPI)
const openapiDoc = yaml.load(fs.readFileSync('./src/docs/openapi.yaml', 'utf8'));
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(openapiDoc));

// Rotas versionadas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Healthcheck
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Trata rotas inexistentes
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

module.exports = app;
