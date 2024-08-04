import prisma from "../lib/prisma.js";

export const bookPost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    // console.log(postId);
    // console.log(tokenUserId);
  
    try {
        const bookedPost = await prisma.bookedPost.findUnique({
            where: {
                postId: postId,
            },
        });
  
      if (bookedPost) {
        res.status(404).json({ message: "Post is already Booked" });
      } else {
        await prisma.bookedPost.create({
          data: {
            userId: tokenUserId,
            postId,
          },
        });
        res.status(200).json({ message: "Post booked" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to book post!" });
    }
  };

  export const deleteBookedPost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    // console.log(postId);
    // console.log(tokenUserId);
  
    try {
        const bookedPost = await prisma.bookedPost.findUnique({
            where: {
                postId: postId,
            },
        });
  
      if (bookedPost) {
        res.status(404).json({ message: "Post is already Booked" });
      } else {
        await prisma.bookedPost.create({
          data: {
            userId: tokenUserId,
            postId,
          },
        });
        res.status(200).json({ message: "Post booked" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to book post!" });
    }
  };