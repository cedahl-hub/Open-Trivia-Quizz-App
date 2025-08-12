import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function decodeHtmlEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

export default function QuestionForm({ questionData, onRestart }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const { username, question } = questionData;

  const [allAnswers] = useState(() =>
    [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5
    )
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAnswer) {
      setError("Please select an answer.");
      return;
    }
    setError("");
    setShowResult(true);
  };

  return (
    <>
      {!showResult ? (
        <Form
          onSubmit={handleSubmit}
          className="p-4 bg-light rounded shadow-sm">
          <h2 className="mb-4">{decodeHtmlEntities(question.question)}</h2>
          {allAnswers.map((answer, idx) => (
            <Form.Check
              className="mb-2"
              key={idx}
              type="radio"
              label={decodeHtmlEntities(answer)}
              name="quizAnswer"
              value={answer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
          ))}

          {error && <p className="text-danger fw-bold">{error}</p>}

          <Button type="submit" className="mt-3">
            Submit Answer
          </Button>
        </Form>
      ) : (
        <div className="p-4 bg-light rounded shadow-sm">
          {selectedAnswer === question.correct_answer ? (
            <p className="text-success fw-bold">
              Nice work, {username}! 🎉 You got it right.
            </p>
          ) : (
            <p className="text-danger fw-bold">
              Sorry, {username}. The correct answer was: {""}
              {decodeHtmlEntities(question.correct_answer)}
            </p>
          )}
          <Button onClick={onRestart} className="mt-3">
            Try Another
          </Button>
        </div>
      )}
    </>
  );
}
