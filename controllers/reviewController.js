const Review = require( '../models/reviewModel' );
// const catchAsync = require( '../utils/catchAsync' );
const factory = require( './handlersFactory' );

exports.setTourUserIds = ( req, res, next ) =>
{
  //Andro:H2: Allwo Nested Routes
  if ( !req.body.tour ) req.body.tour = req.params.tourid;
  if ( !req.body.user ) req.body.user = req.user.id;
  next();
};

exports.getAllReviws = factory.getAll( Review );
exports.getReview = factory.getOne( Review );
exports.createNewReviws = factory.createOne( Review );
exports.updateReview = factory.updateOne( Review );
exports.deleteReview = factory.deleteOne( Review );

