import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import welcomeRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import agendaRoutes from "./routes/agendaRoutes.js"
import recursosRoutes from './routes/recursosRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { closeAgendasDaily } from './services/cronJobs.js';

//Extraccion de las funciones de express y dotenv
const app = express();
dotenv.config();



//configuracion del puerto en el que se va a correr el servidor
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;


//configuracion de express
app.use(cors());
app.use(express.json());


//configuracion de rutas

app.use('/api/auth', welcomeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/agendas', agendaRoutes);
app.use('/api/recursos', recursosRoutes);
app.use('/api/posts', postRoutes);

closeAgendasDaily(); // Cada día a las 20:58

app.get('/', (req, res) => {
   res.send("Bienvenido a la API de Autenticación y Usuarios! Consulte la documentación para obtener");
});




// configuracion de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

//configuracion del servidor
const start = async() =>{
    try{
        await connectDB(mongo_uri);
        console.log('Conexion a la base de datos establecida');
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    }catch(error){
       console.log(error);
    }
}

start();