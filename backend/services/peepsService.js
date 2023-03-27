import Peep from "../models/Peep.js";
import User from "../models/User.js";

const getAllPeeps = async () => {
  return await Peep.find()
    .populate("user", "name username")
    .sort({ createdAt: -1 });
};

const createPeep = async (content, userId) => {
  const newPeep = new Peep({
    content,
    user: userId,
  });

  await newPeep.save();
  return newPeep;
};

const createComment = async (body, userId) => {
  // Find the peep by its ID

  const peep = await Peep.findById(body.peepId);

  if (!peep) {
    throw new Error("Peep not found");
  }
  // Find the user by its ID

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  //fill in the new comment object
  const newComment = {
    content: body.content,
    user: userId,
    username: user.username,
  };

  // push new comment into comments array
  peep.comments.push(newComment);

  await peep.save();

  return newComment;
};

export default { getAllPeeps, createPeep, createComment };
