const { response } = require("express");
const Evento = require("../models/Evento");


const getEventos = async( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate("user", "name");


    res.json({
        ok: true,
        eventos
    })

}

const crearEvento = async( req, res = response ) => {

    // verificar que tengo el evento
    const evento = new Evento( req.body );

    try {

        evento.user = req.uid; // traigo el uid

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuardado
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }


}

const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe con ese ID"
            });
        };

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene el privilegio de editar este evento"
            });
        };

        const nuevoEvento = {
            ...req.body,
            user : uid //en la peticion del usuario no viene el user asi que aca lo coloco
        };

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } )
        //? recibe el id del evento que quiere actualizar y por que actualizad (nuevoEvento), el tercer argumento son algunas opciones, nosotros ocupamos el new:true

        res.json({
            ok: true,
            evento: eventoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }


    res.json({
        ok: true,
        eventoId
    })

}

const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
           return res.status(404).json({
                ok: false,
                msg: "Evento no existe con ese ID"
            });
        };

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene el privilegio de editar este evento"
            });
        };


        const eventoEliminado = await Evento.findByIdAndDelete( eventoId );
  

        res.json({
            ok: true,
            evento: eventoEliminado,
            msg: "El evento fue eliminado correctamente"
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }


}




module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}



