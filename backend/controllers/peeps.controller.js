import peepsService from "../services/peepsService.js";

export const getPeeps = async (req, res) => {
  try {
    const peeps = await peepsService.getAllPeeps();
    res.status(200).json(peeps);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createPeep = async (req, res) => {
  try {
    const newPeep = await peepsService.createPeep(req.body.content, req.userId);
    res.status(201).json({ message: "Peep created", peep: newPeep });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createComment = async (req, res) => {
  try {
    const newComment = await peepsService.createComment(
      req.body,
      //this is the id of the user making the comment that comes from auth
      req.userId
    );
    res.status(201).json({ message: "Comment created", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

