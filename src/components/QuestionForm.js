import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData({ ...formData, answers: newAnswers });
    } else {
      setFormData({
        ...formData,
        [name]: name === "correctIndex" ? parseInt(value) : value,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(onAddQuestion);
  }

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt:</label>
        <input
          id="prompt"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />

        {formData.answers.map((answer, index) => (
          <div key={index}>
            <label htmlFor={`answer${index}`}>Answer {index + 1}:</label>
            <input
              id={`answer${index}`}
              name={`answer${index}`}
              value={answer}
              onChange={handleChange}
            />
          </div>
        ))}

        <label htmlFor="correctIndex">Correct Answer:</label>
        <select
          id="correctIndex"
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          {formData.answers.map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default QuestionForm;
