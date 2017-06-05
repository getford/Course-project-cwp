const siege = require('siege');
siege()
    .on(3000)
    .for(10).times
    .get('/api/auth/accinfo')
    .attack();

/*
 * node index.js
 * node test
 * +
 * pm2 start index.js
 * node test
 * pm2 stop index.js
 * */