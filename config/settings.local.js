module.exports = {
    database   : {
        user     : "root",
        password : "mysql"
    },
    compass:      {
        project: [__dirname, '..', 'app'].join('/'),
        sass:    'styles/sass',
        css:     'styles/compiled',
        config_file: 'styles/sass/config.rb',
        logging: true
    }
};
