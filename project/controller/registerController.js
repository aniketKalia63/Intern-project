const catchAsync = require("./../util/catchError");
const AppError = require("./../util/appError");
const handleFactory = require("./handleFactory");
const register = require("./../model/register");

/* const { error } = require('console'); */
/* const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
); */

/* exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
}; */

/* exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
}; */

exports.top_tours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary";
  next();
};

exports.createTour = handleFactory.createOne(register);
exports.getAllTours = handleFactory.getAllTours(register);
exports.updateTour = handleFactory.updateOne(register);

/* exports.getTourStats = catchAsync(async (req, res) => {
  const stats = await Tours.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: "$difficulty",
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingQuantity" },
        avgRating: { $avg: "$ratingAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        max: { $min: "$price" },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      tour: stats,
    },
  });
}); */

/* exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1;
  const plan = await Tours.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
       
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      tour: plan,
    },
  });
}); */

exports.deleteTour = handleFactory.deleteOne(register);

/* catchAsync(async (req, res, next) => {
  const tour = await Tours.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('No tour found', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
}); */
/* exports.deleteTour = handleFactory.deleteOne(
  Tours
);  */
/* 
exports.getTourWithIn = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");
  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.12;
  if (!lat || !lng) {
    return next(new AppError("provide lat lng", 400));
  }
  const tours = await Tours.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  
  res.status(200).json({
    status: "success",
    data: {
      data: tours,
    },
  });
});
exports.getDistance = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  if (!lat || !lng) {
    return next(new AppError("provide lat lng", 400));
  }
  const distance = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: "distance",
        distanceMultiplier: 0.0001,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      data: distance,
    },
  });
});
 */
