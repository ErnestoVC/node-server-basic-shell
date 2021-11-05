const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../db/config.db');
const fileUpload = require('express-fileupload');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

       this.path = { 
        usuarios:   '/api/usuarios',
        buscar:     '/api/buscar',
        auth:       '/api/auth',
        categorias: '/api/categorias',
        productos:  '/api/productos',
        uploads:    '/api/uploads'
    }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares de la aplicación
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y Parseo del Body
        this.app.use(express.json());

        //Directorio Público
        this.app.use(express.static('public'));

        //File Upload - Cargar Archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/temp',
            createParentPath: true
        }));
    }

    routes (){
        this.app.use(this.path.auth,        require('../routes/auth'))
        this.app.use(this.path.buscar,      require('../routes/buscar'))
        this.app.use(this.path.usuarios,    require('../routes/usuarios'))
        this.app.use(this.path.categorias,  require('../routes/categorias'))
        this.app.use(this.path.productos,   require('../routes/productos'))
        this.app.use(this.path.uploads,     require('../routes/uploads'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en ', this.port)
        });
    }
}

module.exports = Server;