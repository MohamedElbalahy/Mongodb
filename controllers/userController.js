import { Users } from "../Models/users.js";

export async function getUser(req, res, next) {
  try {
    let { page, pageSize } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;

    const users = await Users.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.send(users);
  } catch (e) {
    next(e);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await Users.findOne({ _id: req.params.id });
    return res.send(user);
  } catch (e) {
    next(e);
  }
}

export async function createUser(req, res, next) {
  try {
    const newUser = await Users.create(req.body);
    return res.send(newUser);
  } catch (e) {
    next(e);
  }
}

export async function updateUser(req, res, next) {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    return res.send(updatedUser);
  } catch (e) {
    next(e);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const deletedUser = await Users.findOneAndDelete({ _id: req.params.id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.send(deletedUser);
  } catch (e) {
    next(e);
  }
}
