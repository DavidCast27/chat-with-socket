const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    console.log('Usuario conectado');
    client.on('entrarChat', (data, callback) => {
        if (!data.nombre) {
            return callback({
                err: true,
                mensaje: "El nombre es necesario",
                personas: null
            });
        }
        let personas = usuarios.addPersona(client.id, data.nombre);
        client.broadcast.emit('crearMensaje', { usario: 'Administrador', mensaje: `${data.nombre} se conecto el chat` })
        client.broadcast.emit('listarPersonas', usuarios.getPersonas());

        return callback({
            err: false,
            mensaje: "Bienvenido al chat",
            personas
        })
    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.removePersonaPorId(client.id);

        client.broadcast.emit('crearMensaje', { usario: 'Administrador', mensaje: `${personaBorrada.nombre} abandono el chat` })
        client.broadcast.emit('listarPersonas', usuarios.getPersonas());

    })
});