import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
    setShowForm(false);
    setShowQuestions(true);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(updatedQ) {
    setQuestions(
      questions.map((q) => (q.id === updatedQ.id ? updatedQ : q))
    );
  }

  return (
    <section>
      <h1>Quiz Admin Panel</h1>

      <button onClick={() => { setShowQuestions(true); setShowForm(false); }}>
        View Questions
      </button>
      <button onClick={() => { setShowForm(true); setShowQuestions(false); }}>
        New Question
      </button>

      {showForm && <QuestionForm onAddQuestion={handleAddQuestion} />}

      {showQuestions && (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </section>
  );
}

export default App;
