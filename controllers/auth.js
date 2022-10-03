// const express = require("express");
const { response } = require("express");
const Usuario = require("../models/Usuario");


const crearUsuario = async(req, res = response) => {

    // const { name, email, password } = req.body

    const usuario = new Usuario( req.body );

    await usuario.save();

    //? Validacion a mano la remplazo con express-validator
    // if ( name.length < 5 ) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: "El nombre debe contener al menos 5 letras"
    //     })
    // }

    res.status(201).json({
        ok: true,
        msg: "registro"
    })

};

const loginUsuario = (req, res = response) => { 

    const { email, password } = req.body

    res.json({
        ok: true,
        msg: "login",
        email,
        password
    })

};

const revalidarToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: "renew",
    })

};




module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}