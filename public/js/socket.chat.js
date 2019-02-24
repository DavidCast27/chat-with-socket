var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre')) {
    window.location = 'index.html'
    throw new Error('El nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre')
}
socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        console.log(resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

socket.on('crearMensaje', function(resp) {
    console.log(resp);
});

socket.on('listarPersonas', function(resp) {
    console.log(resp);
});

socket.on('crearMensajePrivado', (mensaje) => {
    console.log(mensaje);
})