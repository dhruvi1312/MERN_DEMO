const server = require('./index');
require('./db/config')
const port = process.env.PORT || 3001;


server.listen(port, () => {
    console.log(`Server is running on port : ${port} `);
  });