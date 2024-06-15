const express = require('express');
const app = express();
const helmet = require('helmet');
const dotenv = require('dotenv');
const authMiddleware = require('./middlewares/authMiddleware');
const indexRouter = require('./routes/index');


dotenv.config();
app.use(helmet());
app.use(express.json());
app.use(authMiddleware);
app.use('/', indexRouter);

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}`));

