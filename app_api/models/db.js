var mongoose = require('mongoose')
//var dbURI = 'mongodb://localhost:27017/mekan32';
var dbURI = 'mongodb+srv://mekan32:1235@mekan32.7tfzs.mongodb.net/mekan32?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true}); 

mongoose.connection.on('connected', function() {
	console.log('Mongoose ' + dbURI+' adresindeki veritabanina baglandi\n');
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose baglanti hatasi\n: ' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose baglanti kesildi\n:');
});
kapat = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose kapatıldı\n ' + msg);
        callback();
    });
};// nodemon kullanıyorsanız ayrı bir kapatma işlemi gerekir.
process.once('SIGUSR2', function() {
    kapat('nodemon kapatıldı\n', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});// Uygulama kapandığında kapat.
process.on('SIGINT', function() {
    kapat('Uygulama kapatıldı\n', function() {
        process.exit(0);
    });
});// Herokudan kapatma işlemi gerçekleşirse
process.on('SIGTERM', function() {
    kapat('heroku kapatıldı\n', function() {
        process.exit(0);
    });
});
require('./mekansema'); 