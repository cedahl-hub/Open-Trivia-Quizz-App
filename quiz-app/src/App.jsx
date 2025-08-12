import { useState } from "react";
import Container from "react-bootstrap/Container";
import HomePageForm from "./components/HomePageForm";
import QuestionForm from "./components/QuestionForm";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    category: "",
    difficulty: "",
  });
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (dataFromApi) => {
    setQuestionData({
      username: formData.username,
      ...dataFromApi,
    });
    setSubmitted(true);
  };

  const restartQuiz = () => {
    setFormData({ username: "", category: "", difficulty: "" });
    setQuestionData(null);
    setSubmitted(false);
  };

  return (
    <Container>
      {!submitted ? (
        <HomePageForm
          formData={formData}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          setError={setError}
          error={error}
        />
      ) : (
        <QuestionForm questionData={questionData} onRestart={restartQuiz} />
      )}
    </Container>
  );
}

export default App;
