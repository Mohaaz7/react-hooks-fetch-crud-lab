import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deletedId) {
    setQuestions(questions.filter((q) => q.id !== deletedId));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
  }

  return (
    <section>
      <h1>Quiz Admin Panel</h1>
      <button onClick={() => setShowForm(false)}>View Questions</button>
      <button onClick={() => setShowForm(true)}>New Question</button>
      {showForm ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdate={handleUpdateQuestion}
        />
      )}
    </section>
  );
}

export default App;
