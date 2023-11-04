const catchAsync = require('./../util/catchError');
const AppError = require('./../util/appError');
const APIFeatures = require('./APIfeature');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No tour found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const tour = await Model.findByIdAndUpdate(req.params.id, req.body);
    if (!tour) {
      return next(new AppError('No tour found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  });
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    // const newTour = new Tour({})
    // newTour.save()
    const newTour = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const tour = await query; /* .populate({
      path: 'guides',
      select: '-__v -passwordChangedAt'
    }); */
    if (!tour) {
      return next(new AppError('No tour found', 404));
    }
    res.status(200).json({
      status: 'success',
      /*     requestedAt: req.requestTime
          results: tours.length, */
      data: {
        tour
      }
    });
  });

exports.getAllTours = Model =>
  catchAsync(async (req, res) => {
    //for reviews specific tour
    let filter = {};
    if (req.params.tourID) filter = { tour: req.params.tourID };
    /*   console.log(req.params);
    const id = req.params.id * 1; */

    //filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    //advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // console.log(req.body);
    /*   const newId = tours[tours.length - 1].id + 1; */
    /*   const newTour = Object.assign({ id: newId }, req.body); */
    /*  tours.push(newTour); */
    /*   fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
          res.status(201).json({
            status: 'success',
            data: {
              tour: newTour
            }
          });
        }
      ); */
    /*     const newTour = await Tours.find({
        duration: 5,
        difficulty: 'easy'
      }); */
    /* const newTour = await Tours.find()
        .where('duration')
        .equals(5)
        .where('difficulty')
        .equals('easy'); */

    let query = Model.find(JSON.parse(queryStr));

    if (req.query.sort) {
      //sort=price,averageRating
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.fields) {
      //filed=ddsd,ssds
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
    /*     const query8 = Tours.find(queryObj); */
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 1;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Model.countDocuments();
      if (skip > numTours) throw new Error('this tours does not exist');
    }
    const feature = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sorting()
      .limitField()
      .paginate();
    const newTour = await feature.query;
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
/* exports.deleteReview = catchAsync(async (req, res, next) => {
  const reviews = await review.findByIdAndDelete();
  if (!review) {
    return next(new AppError('No tour found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: {
      reviews
    }
  });
});
 */
