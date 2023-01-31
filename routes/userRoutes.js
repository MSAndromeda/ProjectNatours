const express = require( 'express' );
const userController = require( '../controllers/userController' );
const authController = require( '../controllers/authController' );

const router = express.Router();

router.post( '/signup', authController.signup );
router.post( '/login', authController.login );
router.get( '/logout', authController.logout );
router.post( '/forgotPassword', authController.forgotPassword );
router.patch( '/resetPassword/:token', authController.resetPassword );

//Andro:H1: Protect all routes after this Middleware
router.use( authController.protect );

router.patch( '/updateMyPassword', authController.updatePassword );
router.get( '/me', userController.getMe, userController.getUser );
router.patch( '/updateMe', userController.updateMe );
router.delete( '/deleteMe', userController.deleteMe );

//Andro:H1: Restrict all Routes to Admin
router.use( authController.restrictTo( 'admin' ) );

router
    .route( '/' )
    .get( userController.getAllUsers )
    .post( userController.createUser );

router
    .route( '/:id' )
    .get( userController.getUser )
    .patch( userController.updateUser )
    .delete( userController.deleteUser );

module.exports = router;