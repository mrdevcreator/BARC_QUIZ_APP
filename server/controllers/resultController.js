const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getResults = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!userId || !answers) {
      return res.status(400).json({ error: "Missing userId or answers" });
    }

    const questions = await prisma.question.findMany();
    let score = 0;

    questions.forEach((q) => {
      const userAnswer = answers[q.id];
      const correct = q.correctAnswer?.toString().trim().toLowerCase();
      const given = userAnswer?.toString().trim().toLowerCase();
      if (correct && given === correct) {
        score++;
      }
    });
    console.log("Score calculated:", score);

    const result = await prisma.result.create({
      data: {
        userId: parseInt(userId, 10),
        score,
        answers,
      },
    });

    res.json({ message: "Submitted", score });
  } catch (error) {
    console.error("Error in /submit:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getResults };
