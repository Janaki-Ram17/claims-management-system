require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const policyRoutes = require('./routes/policyRoutes');
const claimRoutes = require('./routes/claimRoutes');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')


const app = express();

const options ={
  definition: {
    openapi : '3.0.0',
    info : {
      title: 'Node JS API Claims Management',
      version: '1.0.0'
    },
    servers:[
      {
        url: 'http://localhost:5000/'
      }
    ]
  },
  apis: ['./routes/userRoutes.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/claims', claimRoutes);


mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URL}`);
    app.listen(PORT, () => {
      console.log(`API is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });