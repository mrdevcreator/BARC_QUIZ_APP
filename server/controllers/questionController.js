const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions." });
  }
};

module.exports = { getQuestions };
