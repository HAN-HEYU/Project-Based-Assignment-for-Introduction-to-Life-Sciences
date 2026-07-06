import { useEffect, useMemo, useRef, useState } from "react";
import { examPaper } from "../data/exam";
import type { ExamDraft, ExamQuestion as ExamQuestionType, ExamResultData, QuizAnswer, WrongAnswer } from "../types";

interface FinalExamProps {
  draft: ExamDraft | null;
  result: ExamResultData | null;
  onSaveDraft: (draft: ExamDraft | null) => void;
  onSubmitResult: (result: ExamResultData | null) => void;
  onWrongAnswers: (wrongAnswers: WrongAnswer[]) => void;
}

function sortNumbers(values: number[]) {
  return [...values].sort((a, b) => a - b);
}

function arraysEqual(left: number[], right: number[]) {
  const a = sortNumbers(left);
  const b = sortNumbers(right);
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function isAnswered(question: ExamQuestionType, answer: QuizAnswer | undefined) {
  if (answer === undefined) return false;
  if (question.type === "multiple" || question.type === "case") {
    return Array.isArray(answer) && answer.length > 0;
  }
  if (question.type === "matching") {
    const record = answer as Record<string, string>;
    return Boolean(question.matchingPairs?.every((pair) => typeof record?.[pair.prompt] === "string"));
  }
  return true;
}

function answerToText(question: ExamQuestionType, answer: QuizAnswer | undefined) {
  if (answer === undefined) return "未作答";
  if (typeof answer === "number") return question.options?.[answer] ?? "未作答";
  if (Array.isArray(answer)) {
    return answer.map((index) => question.options?.[index]).filter(Boolean).join("；") || "未作答";
  }
  if (typeof answer === "boolean") return answer ? "正确" : "错误";
  if (typeof answer === "object") {
    return Object.entries(answer).map(([key, value]) => `${key}：${value}`).join("；");
  }
  return "未作答";
}

function correctAnswerToText(question: ExamQuestionType) {
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

function scoreQuestion(question: ExamQuestionType, answer: QuizAnswer | undefined) {
  if (!isAnswered(question, answer)) return 0;
  if (question.answerIndex !== undefined) return answer === question.answerIndex ? question.points : 0;
  if (question.answerBoolean !== undefined) return answer === question.answerBoolean ? question.points : 0;
  if (question.matchingPairs) {
    const record = answer as Record<string, string>;
    return question.matchingPairs.every((pair) => record[pair.prompt] === pair.answer)
      ? question.points
      : 0;
  }
  if (question.answerIndexes && Array.isArray(answer)) {
    const selected = sortNumbers(answer);
    if (arraysEqual(selected, question.answerIndexes)) return question.points;
    const correctSelected = selected.filter((value) => question.answerIndexes?.includes(value)).length;
    const wrongSelected = selected.filter((value) => !question.answerIndexes?.includes(value)).length;
    const raw = Math.max(0, correctSelected - wrongSelected) / question.answerIndexes.length;
    return Math.round(raw * question.points * 10) / 10;
  }
  return 0;
}

function allQuestions() {
  return examPaper.sections.flatMap((section) => section.questions);
}

function getLevel(score: number) {
  if (score >= 90) return "优秀：能用证据、风险和伦理框架进行综合评价";
  if (score >= 75) return "良好：核心概念掌握较稳，建议加强案例权衡";
  if (score >= 60) return "达标：基础框架已建立，需复习错题概念";
  return "待加强：建议回到知识地图重新学习关键模块";
}

function calculateResult(answers: Record<string, QuizAnswer>) {
  const sectionScores: ExamResultData["sectionScores"] = {};
  let score = 0;
  let correctCount = 0;
  const wrongQuestionIds: string[] = [];

  examPaper.sections.forEach((section) => {
    const max = section.questions.reduce((sum, question) => sum + question.points, 0);
    const sectionScore = section.questions.reduce((sum, question) => {
      const questionScore = scoreQuestion(question, answers[question.id]);
      if (questionScore === question.points) correctCount += 1;
      if (questionScore < question.points) wrongQuestionIds.push(question.id);
      return sum + questionScore;
    }, 0);
    sectionScores[section.id] = {
      score: Math.round(sectionScore * 10) / 10,
      max,
    };
    score += sectionScore;
  });

  const finalScore = Math.round(score * 10) / 10;

  return {
    score: finalScore,
    totalPoints: examPaper.totalPoints,
    sectionScores,
    correctCount,
    questionCount: allQuestions().length,
    level: getLevel(finalScore),
    submittedAt: new Date().toISOString(),
    answers,
    wrongQuestionIds,
  };
}

function makeWrongAnswers(result: ExamResultData): WrongAnswer[] {
  return allQuestions()
    .filter((question) => result.wrongQuestionIds.includes(question.id))
    .map((question) => ({
      id: `exam-${question.id}`,
      source: "exam" as const,
      questionId: question.id,
      question: question.prompt,
      userAnswer: answerToText(question, result.answers[question.id]),
      correctAnswer: correctAnswerToText(question),
      explanation: question.explanation,
      relatedConcept: question.relatedConcept,
      createdAt: result.submittedAt,
    }));
}

export function ExamQuestion({
  question,
  answer,
  onAnswer,
}: {
  question: ExamQuestionType;
  answer: QuizAnswer | undefined;
  onAnswer: (answer: QuizAnswer) => void;
}) {
  if (question.type === "case") {
    return <CaseAnalysisQuestion question={question} answer={answer} onAnswer={onAnswer} />;
  }

  return (
    <article className="exam-question">
      <div className="exam-question-head">
        <h3>{question.prompt}</h3>
        <span>{question.points} 分</span>
      </div>
      {question.type === "single" && question.options && (
        <div className="exam-options">
          {question.options.map((option, index) => (
            <button
              key={option}
              className={answer === index ? "active" : ""}
              onClick={() => onAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {question.type === "boolean" && (
        <div className="exam-options two">
          {[true, false].map((value) => (
            <button
              key={String(value)}
              className={answer === value ? "active" : ""}
              onClick={() => onAnswer(value)}
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
                    onAnswer({
                      ...record,
                      [pair.prompt]: event.target.value,
                    })
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
    </article>
  );
}

export function CaseAnalysisQuestion({
  question,
  answer,
  onAnswer,
}: {
  question: ExamQuestionType;
  answer: QuizAnswer | undefined;
  onAnswer: (answer: QuizAnswer) => void;
}) {
  const selected = Array.isArray(answer) ? answer : [];
  const toggle = (index: number) => {
    onAnswer(selected.includes(index) ? selected.filter((item) => item !== index) : [...selected, index]);
  };

  return (
    <article className="exam-question case-question">
      <div className="exam-question-head">
        <h3>{question.prompt}</h3>
        <span>{question.points} 分</span>
      </div>
      {question.scenario && <p className="case-scenario">{question.scenario}</p>}
      <div className="exam-options">
        {question.options?.map((option, index) => (
          <button
            key={option}
            className={selected.includes(index) ? "active" : ""}
            onClick={() => toggle(index)}
          >
            {selected.includes(index) ? "☑ " : "☐ "}
            {option}
          </button>
        ))}
      </div>
      {question.rubric && (
        <div className="rubric-line">
          {question.rubric.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      )}
    </article>
  );
}

export function ExamPaper({
  answers,
  onAnswer,
  onSubmit,
}: {
  answers: Record<string, QuizAnswer>;
  onAnswer: (questionId: string, answer: QuizAnswer) => void;
  onSubmit: () => void;
}) {
  const questions = allQuestions();
  const answeredCount = questions.filter((question) => isAnswered(question, answers[question.id])).length;

  return (
    <div className="exam-paper">
      <div className="exam-progress-bar">
        <span>答题进度 {answeredCount} / {questions.length}</span>
        <strong>总分 {examPaper.totalPoints}</strong>
      </div>
      {examPaper.sections.map((section) => (
        <section key={section.id} className="exam-section">
          <div className="exam-section-title">
            <span>{section.description}</span>
            <h2>{section.title}</h2>
          </div>
          {section.questions.map((question) => (
            <ExamQuestion
              key={question.id}
              question={question}
              answer={answers[question.id]}
              onAnswer={(answer) => onAnswer(question.id, answer)}
            />
          ))}
        </section>
      ))}
      <button
        className="glow-button primary full submit-exam"
        disabled={answeredCount < questions.length}
        onClick={onSubmit}
      >
        提交试卷
      </button>
      {answeredCount < questions.length && <p className="exam-tip">请完成全部题目后提交。草稿会自动保存。</p>}
    </div>
  );
}

export function WrongAnswerReview({ result }: { result: ExamResultData }) {
  const wrongQuestions = allQuestions().filter((question) => result.wrongQuestionIds.includes(question.id));
  if (wrongQuestions.length === 0) {
    return <div className="result-box success">没有错题。你已经能较完整地使用课程评估框架。</div>;
  }
  return (
    <div className="wrong-review">
      {wrongQuestions.map((question) => (
        <article key={question.id}>
          <span>{question.relatedConcept}</span>
          <h3>{question.prompt}</h3>
          <p>你的答案：{answerToText(question, result.answers[question.id])}</p>
          <p>参考答案：{correctAnswerToText(question)}</p>
          <p>{question.explanation}</p>
        </article>
      ))}
    </div>
  );
}

export function ExamResult({
  result,
  onRetake,
}: {
  result: ExamResultData;
  onRetake: () => void;
}) {
  return (
    <div className="exam-result">
      <div className="report-card exam-score-card">
        <span>Exam Result</span>
        <h3>{result.score} / {result.totalPoints} 分</h3>
        <p>{result.level}</p>
        <div className="report-ratings">
          {Object.entries(result.sectionScores).map(([sectionId, item]) => (
            <span key={sectionId}>
              {sectionId}: {item.score} / {item.max}
            </span>
          ))}
          <span>
            正确率：{Math.round((result.correctCount / result.questionCount) * 100)}%
          </span>
        </div>
        <div className="report-actions">
          <button className="glow-button primary" onClick={() => window.print()}>
            打印试卷结果
          </button>
          <button className="glow-button" onClick={onRetake}>
            重新考试
          </button>
        </div>
      </div>
      <div className="section-title compact">
        <span>Wrong Answer Review</span>
        <h2>错题解析</h2>
      </div>
      <WrongAnswerReview result={result} />
    </div>
  );
}

export function FinalExam({
  draft,
  result,
  onSaveDraft,
  onSubmitResult,
  onWrongAnswers,
}: FinalExamProps) {
  const [started, setStarted] = useState(Boolean(draft || result));
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>(
    () => result?.answers ?? draft?.answers ?? {},
  );
  const lastSavedDraft = useRef("");

  useEffect(() => {
    if (started && !result) {
      const serialized = JSON.stringify(answers);
      if (serialized === lastSavedDraft.current) return;
      lastSavedDraft.current = serialized;
      onSaveDraft({
        answers,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [answers, onSaveDraft, result, started]);

  const answeredCount = useMemo(
    () => allQuestions().filter((question) => isAnswered(question, answers[question.id])).length,
    [answers],
  );

  const handleSubmit = () => {
    const examResult = calculateResult(answers);
    onSubmitResult(examResult);
    onWrongAnswers(makeWrongAnswers(examResult));
  };

  const handleRetake = () => {
    setAnswers({});
    onSaveDraft(null);
    onSubmitResult(null);
    setStarted(true);
  };

  if (result) {
    return (
      <section className="page-section final-exam-section">
        <ExamResult result={result} onRetake={handleRetake} />
      </section>
    );
  }

  return (
    <section className="page-section final-exam-section">
      <div className="section-title">
        <span>Final Exam</span>
        <h2>{examPaper.title}</h2>
        <p>
          总分 100 分。试卷考查基础概念、技术区别、案例权衡和伦理决策。草稿自动保存到本机浏览器。
        </p>
      </div>

      {!started ? (
        <div className="exam-start-board">
          <h3>你是基因技术评估员</h3>
          <p>
            请用证据、风险、收益、伦理、监管和社会影响的框架完成结课小测。题目不涉及真实实验参数或可复现实验流程。
          </p>
          <button className="glow-button primary" onClick={() => setStarted(true)}>
            开始考试
          </button>
        </div>
      ) : (
        <>
          <div className="exam-draft-line">
            <span>已自动保存草稿 · 已答 {answeredCount} / {allQuestions().length}</span>
            <button
              className="glow-button"
              onClick={() =>
                onSaveDraft({
                  answers,
                  updatedAt: new Date().toISOString(),
                })
              }
            >
              手动保存草稿
            </button>
          </div>
          <ExamPaper
            answers={answers}
            onAnswer={(questionId, answer) =>
              setAnswers((current) => ({
                ...current,
                [questionId]: answer,
              }))
            }
            onSubmit={handleSubmit}
          />
        </>
      )}
    </section>
  );
}
