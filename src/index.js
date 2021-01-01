const express = require('express');
const constant = require('./utils/constant');
const bodyParser = require('body-parser');
const cors = require('cors');
//Setting Server
const app = express();
const db = require('./db.js');
const router = express.Router();

//swagger integration
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router);

app.use(bodyParser.json({ limit: '50mb', extended: false }));
app.use(cors());

// console.log('hello index');
// app.use((req,res,next)=>{
//     console.log('middleware req body---',req.body);
//     next();
// })
//Routes to Controller
app.use('/auth', require('./controller/auth-controller'));
app.use('/users', require('./controller/user-controller'));
app.use('/trades', require('./controller/trade-controller'));
app.use('/files', require('./controller/file-controller'));

app.use('/', (req,res)=>{
    res.send({data:"Server is Uppp..."})
})


process.on('uncaughtException', function(err) {
    console.log('Fatal Error', err);
    console.log('Caught exception:', err.stack);
});

app.listen(constant.PORT, () => {
    console.log(`Listening to the port ${constant.PORT}`);
})
