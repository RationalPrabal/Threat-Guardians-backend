const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question: String,
  questionType: String,
  questionPic: String,
  answerSelectionType: String,
  answers: [String], // Embed the QuestionOption schema
  correctAnswer:  {type: mongoose.Schema.Types.Mixed, // Allow different data types
  required: true},
  messageForCorrectAnswer: String,
  messageForIncorrectAnswer: String,
  explanation: String,
  point:String
});

const Question = mongoose.model('Question', questionSchema);

const quizSchema = new mongoose.Schema({
  quizTitle: String,
  quizSynopsis: String,
  nrOfQuestions:String,
  questions: [Question.schema] // Embed the Question schema
});

const quizModel = mongoose.model('Quiz', quizSchema);

module.exports = {quizModel}
