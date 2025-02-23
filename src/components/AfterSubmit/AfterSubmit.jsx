import styles from "./AfterSubmit.module.css";

export default function AfterSubmit({ questionList, correctIdList }) {
  function checkAnswer(selectedAnswer, rightAnswerIndex, answers) {
    return selectedAnswer === answers[rightAnswerIndex];
  }

  return (
    <div className={styles.container}>
      <ol type="1">
        {questionList.map((q) => (
          <li key={q.id}>
            <p className={styles.question}>{`${q.question} ${
              correctIdList.has(q.id) ? "✅" : "❌"
            }`}</p>
            <ul className={styles.answerlist}>
              {q.answers.map((answer) => (
                <li
                  key={answer}
                  className={`${styles.answeritem} ${
                    checkAnswer(answer, q.rightAnswer, q.answers)
                      ? styles.correct
                      : styles.wrong
                  }`}
                >
                  {answer}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
