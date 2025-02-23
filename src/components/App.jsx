import { useState } from "react";
import "./App.css";
import AfterSubmit from "./AfterSubmit/AfterSubmit.jsx";
const initData = [
  {
    id: 1,
    question: "Java là ngôn ngữ lập trình gì?",
    answers: [
      "Thông dịch",
      "Biên dịch",
      "Vừa biên dịch vừa thông dịch",
      "Không phải ngôn ngữ lập trình",
    ],
    rightAnswer: 1,
  },
  {
    id: 2,
    question: "Từ khóa nào được sử dụng để kế thừa trong Java?",
    answers: ["extends", "implements", "inherit", "super"],
    rightAnswer: 0,
  },
  {
    id: 3,
    question: "Kiểu dữ liệu nào trong Java có kích thước lớn nhất?",
    answers: ["int", "double", "float", "long"],
    rightAnswer: 1,
  },
  {
    id: 4,
    question:
      "Phương thức nào của lớp Object được gọi khi đối tượng bị thu gom rác?",
    answers: ["finalize()", "garbageCollect()", "destroy()", "dispose()"],
    rightAnswer: 2,
  },
  {
    id: 5,
    question: "Câu lệnh nào dùng để tạo một đối tượng trong Java?",
    answers: ["new", "create", "instance", "init"],
    rightAnswer: 0,
  },
];

function Bar({ onSetPrevious, onSetNext, onSetSubmit }) {
  return (
    <div className="bar">
      <button className="nav-button" onClick={onSetPrevious}>
        quay lại
      </button>
      <button className="nav-button" onClick={onSetNext}>
        tiếp theo
      </button>
      <button className="nav-button" onClick={onSetSubmit}>
        nộp bài
      </button>
    </div>
  );
}

const App = () => {
  const [index, setIndex] = useState(0);
  const [marker, setMarker] = useState(new Map());
  // marker lưu thông tin id và selectedAnswer
  const { id, question, answers } = initData[index];
  const [isSubmit, setIsSubmit] = useState(false);
  const [correctIdList, setCorrectIdList] = useState(new Set());
  // correctIdList lưu id của những câu chọn đúng
  function handleAnswer(e) {
    setMarker(new Map(marker).set(id, e.target.innerText));
  }
  function handlePrevious() {
    if (index >= 1) {
      setIndex(index - 1);
    }
  }
  function handleNext() {
    if (index < initData.length - 1) {
      setIndex(index + 1);
    }
  }
  function handleSubmit() {
    console.log(marker);
    initData.forEach((data) => {
      // th chọn đúng
      if (data.answers[data.rightAnswer] == marker.get(data.id)) {
        setCorrectIdList((correctIdList) =>
          new Set(correctIdList).add(data.id)
        );
      }
    });
    setIsSubmit(true);
  }
  return isSubmit ? (
    <>
      <p className="container">
        số câu đúng:{" "}
        <span className="highlight">{`${correctIdList.size}/${initData.length}`}</span>
      </p>
      <AfterSubmit questionList={initData} correctIdList={correctIdList} />
    </>
  ) : (
    <>
      <h2 className="question">{question}</h2>
      <ul className="answer-list">
        {answers.map((value, index) => (
          <li
            style={
              marker.get(id) !== undefined && value == marker.get(id)
                ? { backgroundColor: "#218838" }
                : null
            }
            className="answer-item"
            key={index}
            onClick={(e) => handleAnswer(e)}
          >
            {value}
          </li>
        ))}
      </ul>
      <p className="container">
        Đã tích:{" "}
        <span className="highlight">{`${marker.size}/${initData.length}`}</span>
      </p>
      <Bar
        onSetPrevious={handlePrevious}
        onSetNext={handleNext}
        onSetSubmit={handleSubmit}
      />
    </>
  );
};
export default App;
