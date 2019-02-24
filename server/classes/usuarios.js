class Usuarios {
    constructor() {
        this.personas = []
    }

    addPersona(id, nombre) {
        let persona = { id, nombre }
        this.personas.push(persona);
        return this.personas;
    }

    getPersonaPorId(id) {
        //TODO: revisar si funciona
        return this.personas.filter(persona => persona.id === id)[0];
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        //TODO: faltan las salas
    }

    removePersonaPorId(id) {
        let personaBorrada = this.getPersonaPorId(id);
        this.personas = this.personas.filter(personas => personas.id !== id);
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}