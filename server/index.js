require('dotenv').config();
const server = require('./src/app.js');

//Settings

server.set('port', process.env.PORT || 3001);

//Start server

server.listen(server.get('port'), () =>
  console.log(`listening at port ${server.get('port')}`)
);
