const express = require('express');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const cookieParser=require('cookie-parser')


const register = require('./routers/register');
const {checkSession}=requre('./middlewares/checkAuth') 
const mainPageRouter = require('./routers/mainPageRouter');
// const registrRouter = require('./routers/registr');
// const entryRouter = require('./routers/entry');


const app = express();
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));

// const sessionConfig = {
//   store: new FileStore(),
//   key: 'sid',
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false,
//   httpOnly: true,
//   cookie: { expires: 24 * 60 * 60e3 },
// };
// app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());

app.use('/', mainPageRouter);
// app.use('/registr', registrRouter);
// app.use('/entry', entryRouter);

app.use(cookieParser)
app.use(checkSession)


app.use(cookieParser)
app.use(checkSession)

app.use('/', mainPageRouter);
// app.use('/registr', registrRouter);
// app.use('/entry', entryRouter);



const PORT = 3000;


app.use('/', registrRouter);


app.listen(PORT, () => {
  console.log('vzleteli');
});
