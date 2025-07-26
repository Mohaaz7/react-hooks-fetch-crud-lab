import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false); // needed for test

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
  }

  function handleUpdateQuestion(updatedQ) {
    const updated = questions.map((q) =>
      q.id === updatedQ.id ? updatedQ : q
    );
    setQuestions(updated);
  }

  return (
    <section>
      <h1>Quiz Admin Panel</h1>

      {/* Required by test */}
      <button onClick={() => setShowQuestions(true)}>View Questions</button>

      <QuestionForm onAddQuestion={handleAddQuestion} />

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
