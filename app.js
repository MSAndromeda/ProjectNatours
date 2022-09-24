const express = require( 'express' );
const morgan = require( 'morgan' );
const rateLimit = require( 'express-rate-limit' );
const helmet = require( 'helmet' );
const mongoSanitize = require( 'express-mongo-sanitize' );
const xss = require( 'xss-clean' );
const hpp = require( 'hpp' );

const AppError = require( './utils/appError' );
const globalErrorHandler = require( './controllers/errorControler' );

const tourRouter = require( `./routes/tourRoutes` );
const userRouter = require( `./routes/userRoutes` );

const app = express();

//Andro:H1: !. GLOBAL MIDDLEWARES

//Andro:H2: Set Security HTTP Headers
app.use( helmet() );

//Andro:H2: Development Logging
if ( process.env.NODE_ENV === 'development' )
{
    app.use( morgan( 'dev' ) );
}

//Andro:H2: Limit Request from the Same Api
const limiter = rateLimit( {
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, Please try again in an Hour!'
} );
app.use( '/api', limiter );

//Andro:H2: Body Parser, reading data from the body into req.body
app.use( express.json( { limit: '10kb' } ) );

//Andro:H2: Data Senitization against NoSQL query injection
app.use( mongoSanitize() );

//Andro:H2: Data sanitization against XSS
app.use( xss() );

//Andro:H2: Prevent Parameter Pollution
app.use( hpp( {
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
} ) );

//Andro:H2: Serving static files
app.use( express.static( `${ __dirname }/public` ) );

//Andro:H2: Test middleware
app.use( ( req, res, next ) =>
{
    req.requestTime = new Date().toISOString();
    next();
} );

//Andro:H1: 2. ROUTES

app.use( '/api/v1/tours', tourRouter );
app.use( '/api/v1/users', userRouter );

app.all( '*', ( req, res, next ) =>
{
    // const err = new Error( `Can't find ${ req.originalUrl }` );
    // err.status = 'fail';
    // err.statusCode = 404;

    next( new AppError( `Can't find ${ req.originalUrl }`, 404 ) );
} );

app.use( globalErrorHandler );

module.exports = app;