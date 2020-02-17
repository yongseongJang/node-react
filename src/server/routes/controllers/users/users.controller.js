const async = require('async');
const asyncHandler = require('../../../utils/asyncHandler');
const UserService = require('../../../services/user.service');

exports.readUserInfoByUserEmail = asyncHandler(async (req, res, next) => {
  const email = req.user.email;

  const result = await UserService.readUserInfoByUserEmail(email);

  res.status(200).send(result);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const result = await UserService.login(email, password);

  res.status(200).send(result);
});

exports.registerUserInfo = asyncHandler(async (req, res, next) => {
  const userInfo = req.body.userInfo;

  await UserService.registerUserInfo(userInfo);

  res.status(201).send();
});

exports.deleteUserInfoByUserEmail = asyncHandler(async (req, res, next) => {
  const email = req.user.email;

  await UserService.deleteUserInfoByUserEmail(email);

  res.status(204).send();
});

exports.updateUserInfoByUserEmail = asyncHandler(async (req, res, next) => {
  const email = req.user.email;
  const userInfo = req.body.userInfo;

  await UserService.updateUserInfoByUserEmail(email, userInfo);

  res.status(204).send();
});
