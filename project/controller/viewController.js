const product = require("../model/product");
const user = require("../model/user");
const catchAsync = require("../util/catchError");
const AppError = require("../util/appError");

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await product.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});
exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection

  const tour = await product.findOne({
    name: req.params.name,
  });

  console.log(tour);

  if (!tour) {
    return next(new AppError("there is no tour with this name", 404));
  }

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render("tour", {
    title: "All Tours",
    tour,
  });
});
exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
});
exports.getRegisterForm = catchAsync(async (req, res, next) => {
  res.status(200).render("register", {
    title: "Register",
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your Account",
  });
};
exports.updateUserData = catchAsync(async (req, res, next) => {
  // console.log('%%%@@@@@@@@/->>>>>>>>>>>>>>>>>>>>>>>>>>.', req.user);
  // console.log('%%%@@@@@@@@/->>>>>>>>>>>>>>>>>>>>>>>>>>.', req.body);
  /*   res.status(200).render('account', {
    title: 'Your Account'
  }); */
  const updateUser = await user.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render("account", {
    title: "your Account",
    user: updateUser,
  });
});
