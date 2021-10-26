const { response } = require('express')

const usuariosGet = (req, res = response) =>{

    const query = req.query;

    res.json({
        msg: 'Get API - Controlador',
        query
    });
}

const usuariosPut = (req, res = response) =>{

    const id = req.params.id;

    res.json({
        msg: 'Put API - Controlador',
        id
    });
}

const usuariosPost = (req, res = response) =>{

    const body = req.body;

    res.json({
        msg: 'Post API - Controlador',
        body
    });
}

const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'Delete API - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}