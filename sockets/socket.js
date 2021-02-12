const { io } = require('../index');
const Band = require('../public/models/band');
const Bands = require('../public/models/bands');

const bands = new Bands();
console.log('Init Server');

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Guaco'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Michael Jackson'));
bands.addBand(new Band('Metalica'));


io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands())

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    })

    client.on('emitir-mensaje', (payload) => {
        console.log(`mensaje recibido: ${JSON.stringify(payload)}`);

        io.emit('emitir-mensaje', payload);
    });

    client.on('vote-band', (payload) => {
        console.log(`Votado banda: ${JSON.stringify(payload)}`);

        bands.voteBand(payload.id);

        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        console.log(`agregando banda: ${JSON.stringify(payload)}`);

        bands.addBand(new Band(payload.name));

        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        console.log(`eliminando banda: ${JSON.stringify(payload)}`);

        bands.deleteBand(payload.id);

        io.emit('active-bands', bands.getBands());
    });



});