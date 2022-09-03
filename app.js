const express = require( 'express' );
const morgan = require( 'morgan' );

const tourRouter = require( `./routes/tourRoutes` );
const userRouter = require( `./routes/userRoutes` );

const app = express();

//Andro:H1: !. MIDDLEWARES
if ( process.env.NODE_ENV === 'development' )
{
    app.use( morgan( 'dev' ) );
}
app.use( express.json() );

app.use( ( req, res, next ) =>
{
    console.log( 'Hello From the middleware...' );
    next();
} );

//Andro:H1: 2. ROUTES

app.use( '/api/v1/tours', tourRouter );
app.use( '/api/v1/users', userRouter );

module.exports = app;