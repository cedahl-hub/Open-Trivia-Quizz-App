import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function HomePageForm({
  formData,
  handleChange,
  onSubmit,
  setError,
  error,
}) {
  const categoryMap = {
    Mythology: 20,
    Art: 25,
    Animals: 27,
    "Entertainment: Film": 11,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `https://opentdb.com/api.php?amount=1&category=${
        categoryMap[formData.category]
      }&difficulty=${formData.difficulty.toLowerCase()}&type=multiple`;

      const response = await axios.get(apiUrl);

      if (response.data.response_code !== 0) {
        throw new Error("No questions found for your selection.");
      }

      onSubmit({ question: response.data.results[0] });
      setError(null);
    } catch (err) {
      setError(`Error getting the question: ${err.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
      <h1 className="mb-3 text-center">Quiz Application</h1>
      <p className="mb-4 text-center text-muted">
        Please enter your name. Then, select your desired question category and
        difficulty level from the menus. When you're ready, select "Submit" to
        generate your question.
      </p>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formUsername">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required>
              <option hidden value="">
                Choose...
              </option>
              <option>Mythology</option>
              <option>Art</option>
              <option>Animals</option>
              <option>Entertainment: Film</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formDifficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required>
              <option hidden value="">
                Choose...
              </option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {error && <p className="text-danger fw-bold">{error}</p>}
      <div className="text-center">
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </div>
    </Form>
  );
}
