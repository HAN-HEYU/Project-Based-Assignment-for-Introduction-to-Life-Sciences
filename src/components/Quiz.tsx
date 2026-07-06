import { useEffect, useMemo, useRef, useState } from "react";
import type { ModuleId, QuizAnswer, QuizQuestion, WrongAnswer } from "../types";

interface QuizProps {
  moduleId: ModuleId;
  questions: QuizQuestion[];
  alreadyComplete: boolean;
  onComplete: () => void;
  onWrongAnswer?: (wrong: WrongAnswer) => void;
}

function sortNumbers(values: number[]) {
  return [...values].sort((a, b) => a - b);
}

function arraysEqual(left: number[], right: number[]) {
  const a = sortNumbers(left);
  const b = sortNumbers(right);
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function isAnswered(question: QuizQuestion, answer: QuizAnswer | undefined) {
  if (answer === undefined) return false;
  if (question.type === "multiple" || (question.type === "case" && question.answerIndexes)) {
    return Array.isArray(answer) && answer.length > 0;
  }
  if (question.type === "matching") {
    const record = answer as Record<string, string>;
    return Boolean(
      question.matchingPairs?.every((pair) => typeof record?.[pair.prompt] === "string"),
    );
  }
  return true;
}

function isCorrect(question: QuizQuestion, answer: QuizAnswer | undefined) {
  if (!isAnswered(question, answer)) return false;
  if ((question.type === "single" || question.type === "case") && question.answerIndex !== undefined) {
    return answer === question.answerIndex;
  }
  if ((question.type === "multiple" || question.type === "case") && question.answerIndexes) {
    return Array.isArray(answer) && arraysEqual(answer, question.answerIndexes);
  }
  if (question.type === "boolean") {
    return answer === question.answerBoolean;
  }
  if (question.type === "matching") {
    const record = answer as Record<string, string>;
    return Boolean(question.matchingPairs?.every((pair) => record[pair.prompt] === pair.answer));
  }
  return false;
}

function answerToText(question: QuizQuestion, answer: QuizAnswer | undefined) {
  if (answer === undefined) return "未作答";
  if ((question.type === "single" || question.type === "case") && typeof answer === "number") {
    return question.options?.[answer] ?? "未作答";
  }
  if (Array.isArray(answer)) {
    return answer.map((index) => question.options?.[index]).filter(Boolean).join("；") || "未作答";
  }
  if (typeof answer === "boolean") {
    return answer ? "正确" : "错误";
  }
  if (typeof answer === "object") {
    return Object.entries(answer)
      .map(([key, value]) => `${key}：${value}`)
      .join("；");
  }
  return "未作答";
}

function correctAnswerToText(question: QuizQuestion) {
  if (question.answerIndex !== undefined) return question.options?.[question.answerIndex] ?? "";
  if (question.answerIndexes) {
    return question.answerIndexes.map((index) => question.options?.[index]).filter(Boolean).join("；");
  }
  if (question.answerBoolean !== undefined) return question.answerBoolean ? "正确" : "错误";
  if (question.matchingPairs) {
    return question.matchingPairs.map((pair) => `${pair.prompt}：${pair.answer}`).join("；");
  }
  return "";
}

function toggleMultiple(current: QuizAnswer | undefined, optionIndex: number) {
  const values = Array.isArray(current) ? current : [];
  return values.includes(optionIndex)
    ? values.filter((value) => value !== optionIndex)
    : [...values, optionIndex];
}

export function Quiz({
  moduleId,
  questions,
  alreadyComplete,
  onComplete,
  onWrongAnswer,
}: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});
  const completionSent = useRef(false);
  const reportedWrong = useRef<Set<string>>(new Set());

  useEffect(() => {
    setAnswers({});
    completionSent.current = alreadyComplete;
    reportedWrong.current = new Set();
  }, [moduleId, alreadyComplete]);

  const answeredCount = useMemo(
    () => questions.filter((question) => isAnswered(question, answers[question.id])).length,
    [answers, questions],
  );

  const correctCount = useMemo(
    () => questions.filter((question) => isCorrect(question, answers[question.id])).length,
    [answers, questions],
  );

  const allAnswered = answeredCount === questions.length;

  useEffect(() => {
    questions.forEach((question) => {
      const answer = answers[question.id];
      if (!isAnswered(question, answer) || isCorrect(question, answer)) return;
      if (reportedWrong.current.has(question.id)) return;
      reportedWrong.current.add(question.id);
      onWrongAnswer?.({
        id: `module-${moduleId}-${question.id}`,
        source: "module",
        moduleId,
        questionId: question.id,
        question: question.question,
        userAnswer: answerToText(question, answer),
        correctAnswer: correctAnswerToText(question),
        explanation: question.explanation,
        relatedConcept: question.relatedConcept,
        createdAt: new Date().toISOString(),
      });
    });
  }, [answers, moduleId, onWrongAnswer, questions]);

  useEffect(() => {
    if (allAnswered && !completionSent.current) {
      completionSent.current = true;
      onComplete();
    }
  }, [allAnswered, onComplete]);

  return (
    <section className="quiz-section">
      <div className="section-title compact">
        <span>Quiz</span>
        <h2>本章小测验</h2>
        <p>
          {alreadyComplete
            ? "本模块已点亮，仍可继续复习。"
            : `完成 ${questions.length} 道混合题后点亮本模块。当前正确 ${correctCount} / ${questions.length}。`}
        </p>
      </div>

      <div className="quiz-grid mixed">
        {questions.map((question, index) => {
          const answer = answers[question.id];
          const answered = isAnswered(question, answer);
          const correct = isCorrect(question, answer);
          const isMultiple =
            question.type === "multiple" || (question.type === "case" && Boolean(question.answerIndexes));

          return (
            <article key={question.id} className="quiz-card">
              <span className="quiz-number">Q{index + 1} · {question.type}</span>
              <h3>{question.question}</h3>

              {(question.type === "single" || question.type === "case" || question.type === "multiple") &&
                question.options && (
                  <div className="quiz-options">
                    {question.options.map((option, optionIndex) => {
                      const selected = isMultiple
                        ? Array.isArray(answer) && answer.includes(optionIndex)
                        : answer === optionIndex;
                      return (
                        <button
                          key={option}
                          className={selected ? (answered && correct ? "correct" : "wrong") : ""}
                          onClick={() =>
                            setAnswers((current) => ({
                              ...current,
                              [question.id]: isMultiple
                                ? toggleMultiple(current[question.id], optionIndex)
                                : optionIndex,
                            }))
                          }
                        >
                          {isMultiple ? (selected ? "☑ " : "☐ ") : ""}
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}

              {question.type === "boolean" && (
                <div className="quiz-options two">
                  {[true, false].map((value) => (
                    <button
                      key={String(value)}
                      className={answer === value ? (correct ? "correct" : "wrong") : ""}
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: value,
                        }))
                      }
                    >
                      {value ? "正确" : "错误"}
                    </button>
                  ))}
                </div>
              )}

              {question.type === "matching" && (
                <div className="matching-list">
                  {question.matchingPairs?.map((pair) => {
                    const record =
                      typeof answer === "object" && !Array.isArray(answer)
                        ? (answer as Record<string, string>)
                        : {};
                    return (
                      <label key={pair.prompt}>
                        <span>{pair.prompt}</span>
                        <select
                          value={record[pair.prompt] ?? ""}
                          onChange={(event) =>
                            setAnswers((current) => ({
                              ...current,
                              [question.id]: {
                                ...record,
                                [pair.prompt]: event.target.value,
                              },
                            }))
                          }
                        >
                          <option value="">选择解释</option>
                          {question.matchingOptions?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>
                    );
                  })}
                </div>
              )}

              {answered && (
                <div className={`quiz-feedback ${correct ? "correct" : "wrong"}`}>
                  <strong>{correct ? "回答正确" : "需要修正"}</strong>
                  <p>{correct ? question.explanation : question.hint}</p>
                  <p>正确答案：{correctAnswerToText(question)}</p>
                  <p>常见误区：{question.misconception}</p>
                  <p>关联知识点：{question.relatedConcept}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {(allAnswered || alreadyComplete) && (
        <div className="chapter-summary">
          <strong>模块总结</strong>
          <p>
            你已经完成本章小测。当前正确 {correctCount} / {questions.length}，可回看黄色提示中的误区澄清。
          </p>
        </div>
      )}
    </section>
  );
}
