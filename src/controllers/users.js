const Users = require('../services/users');
const { getToken, decodeToken } = require('../helpers/helpers');
const Firebase = require('../services/firebase');
module.exports = {
    async GetUsers(req, res) {
        try {
            const token = req.headers.authorization;
            const { uid } = decodeToken(token.split(' ')[1]);
            let result = await Users.getUsers(uid);
            res.status(200).json({
                success:true,
                users:result
            });
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error
            });
        }
    },
    async CreateUser(req, res) {
        try {
            const newUser = await Users.createUser(req.body);
            const { _id, fullname, email } = newUser;
            const token = getToken({uid:_id, fullname, email, image:null});
            res.status(200).json({
                success:true,
                message:"Usuario creado",
                token
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:'Hubo un error al crear el usuario',
            }); 
        }
    },
    UpdateUser(req, res) {
        const token = req.headers.authorization;
        const { uid } = decodeToken(token.split(' ')[1]);
        const file = req.file??null;
        if(file) file.idImage = uid;
        Firebase.UploadToFirebase(file, async (err, urlImage) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message:'Error al actualizar el usuario',
                });
            }
            try {
                const user = {...req.body, image:urlImage}
                let newUser = await Users.updateUser(uid, user);
                res.status(200).json({
                    success:true,
                    message:'Usuario actualizado',
                    user:newUser,
                });
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message:'Error al actualizar el usuario',
                });
            }
        });
    },
    RemoveImage(req, res) {
        const imageName = req.params.image;
        Firebase.RemoveImage(imageName, (err, success) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message:'Error al eliminar el archivo',
                });
            }
            res.status(200).json({
                success:true,
                message:'Archivo eliminado exitosamente',
            });
        });
    }
}