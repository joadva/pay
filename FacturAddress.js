/**
 * DomicilioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    //Obtener todas la direccion
    get: async(req, res) => {
        console.log(req.user);
        let dataDomicilio = await Domicilio.find({})
            .then((dataDomicilio) => {
                res.status(200).send({
                    success: true,
                    data: dataDomicilio

                });
            })
            .catch((err) => {
                res.status(400).json({
                    err
                });
            });
    },
    //Obtener una direcciop por el identifier
    getByid: async(req, res) => {
        let id = req.params.id;
            
        let findOneDomicilio = await Domiciliof.findOne({id});
        if(findOneDomicilio) {
            res.send({
                message: 'Domicilio encontrado',
                data: findOneDomicilio

            });
        }
        return res.status(400).send({
            err: {
                message: 'El identifier proporcionando no existe'
            }
        });
    },
    //Agregar una dirccion
    post: async(req, res) => {
        let body = req.body;

        let domiicilio = await Domicilio.create({
            Doomicilio: body.Doomicilio,
            Nombre: body.Nombre,
            Apellido:body.Apellido,
            rfc: body.rfc,
            CodigoPostal: body.CodigoPostal,
            Ciudad: body.Ciudad,
            Pais: body.Pais,
            Telefono: body.Telefono
        }).fetch();
        if(domiicilio) {
        return res.status(200).send({
                message: 'se creo correctamente el domicilio',
                data: domiicilio
            })
        }
        return res.status(400).send({
            err: {
                message: 'No se pudo crear la direccion'
            }
        });
        
    },
    //Actualizar una direccion por identifier
    put: async(req, res) => {
        let body = req.body;

        let findDomicilio = await Domicilio.update({identifier: body.identifier}, {
            domicilio: body.Doomicilio,
            nombre: body.Nombre,
            CP: body.CodigoPostal,
            ciudad: body.Ciudad,
            pais: body.Pais,
            telefono: body.Telefono
        }).fetch();
            if(findDomicilio) {
            return res.status(200).send({
                    message: 'Los datos actualizados correctamente',
                    data: findDomicilio
                });
            }
            return res.status(400).send({
                err: {
                    message: 'El identifier proporcionado no existe...'
                }
            });
    },
    //Eliminar una direccion por el identifier
    delete: async(req, res) => {
        let body = req.body;

        let deleteDomicilio = await Domicilio.destroy({identifier: body.identifier});
        if(!deleteDomicilio) {
            return res.status(400).send({
                message: 'La Direccion se elimino corractamente'
            });
        }
    }
};

