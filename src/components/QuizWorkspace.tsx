import React, { useEffect, useMemo, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Headphones,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Square,
} from 'lucide-react';
import {
  AdaptiveTier,
  ClassName,
  GradedAnswer,
  Question,
  StudentAnswer,
} from '../types/quiz';
import { gradeQuestion } from '../data/questions';
import { audioEngine } from '../utils/audioEngine';
import { StimulusVisualRenderer } from './StimulusVisualRenderer';
import { MathText } from './MathText';

interface Props {
  studentName: string;
  className: ClassName;
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  adaptiveTier: AdaptiveTier;
  streak: number;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onAnswerSubmitted: (graded: GradedAnswer) => void;
  onNextQuestion: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const QuizWorkspace: React.FC<Props> = ({
  studentName,
  className,
  question,
  questionIndex,
  totalQuestions,
  adaptiveTier,
  streak,
  audioEnabled,
  onToggleAudio,
  onAnswerSubmitted,
  onNextQuestion,
}) => {
  const [pgChoice, setPgChoice] = useState<number | null>(null);
  const [mcmaChoices, setMcmaChoices] = useState<number[]>([]);
  const [bsChoices, setBsChoices] = useState<(boolean | null)[]>([null, null, null]);
  const [submittedGrade, setSubmittedGrade] = useState<GradedAnswer | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    audioEngine.subscribeSpeaking(setIsSpeaking);
  }, []);

  // Reset local selection when question changes
  useEffect(() => {
    setPgChoice(null);
    setMcmaChoices([]);
    setBsChoices([null, null, null]);
    setSubmittedGrade(null);
    audioEngine.stopSpeech();

    if (audioEnabled && question.isListeningFocus) {
      const timer = window.setTimeout(() => {
        audioEngine.speakText(
          `Soal nomor ${questionIndex + 1}, mode dengarkan lalu jawab. ${question.stimulusTitle}. ${question.readingPassage}. Pertanyaannya: ${question.prompt}`
        );
      }, 250);
      return () => window.clearTimeout(timer);
    }
  }, [question.id, audioEnabled, question.isListeningFocus, question.stimulusTitle, question.readingPassage, question.prompt, questionIndex]);

  const canSubmit = useMemo(() => {
    if (submittedGrade) return false;
    if (question.type === 'PG') return pgChoice !== null;
    if (question.type === 'MCMA') return mcmaChoices.length > 0;
    if (question.type === 'BS') return bsChoices.every((v) => v !== null);
    return false;
  }, [submittedGrade, question.type, pgChoice, mcmaChoices, bsChoices]);

  const handleSpeakQuestion = () => {
    if (!audioEnabled) return;
    if (isSpeaking) {
      audioEngine.stopSpeech();
      return;
    }
    let extra = '';
    if (question.type === 'PG') {
      extra = question.options
        .map((opt, idx) => `Pilihan ${OPTION_LETTERS[idx]}: ${opt}`)
        .join('. ');
    } else if (question.type === 'MCMA') {
      extra = question.statements
        .map((st, idx) => `Pernyataan ${idx + 1}: ${st}`)
        .join('. ');
    } else {
      extra = question.statements
        .map((st, idx) => `Pernyataan ${idx + 1}: ${st}`)
        .join('. ');
    }

    audioEngine.speakText(
      `Soal nomor ${questionIndex + 1}. Materi ${question.topicLabel}. ${question.stimulusTitle}. ${question.readingPassage}. Pertanyaan: ${question.prompt}. ${extra}`
    );
  };

  const handleToggleMcma = (idx: number) => {
    if (submittedGrade) return;
    audioEngine.playClick();
    setMcmaChoices((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  const handleSelectBs = (idx: number, value: boolean) => {
    if (submittedGrade) return;
    audioEngine.playClick();
    setBsChoices((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    audioEngine.stopSpeech();

    let answer: StudentAnswer;
    if (question.type === 'PG') {
      answer = { type: 'PG', selectedIndex: pgChoice! };
    } else if (question.type === 'MCMA') {
      answer = { type: 'MCMA', selectedIndices: [...mcmaChoices].sort() };
    } else {
      answer = { type: 'BS', selectedBooleans: bsChoices };
    }

    const graded = gradeQuestion(question, answer);
    setSubmittedGrade(graded);
    onAnswerSubmitted(graded);

    if (graded.isFullCorrect) {
      audioEngine.playCorrect();
    } else if (graded.earnedFraction > 0) {
      audioEngine.playPartial();
    } else {
      audioEngine.playIncorrect();
    }
  };

  const progressPct = Math.round(((questionIndex + (submittedGrade ? 1 : 0)) / totalQuestions) * 100);
  const typeLabel =
    question.type === 'PG'
      ? 'Pilihan Ganda'
      : question.type === 'MCMA'
      ? 'Pilihan Ganda Kompleks (MCMA)'
      : 'Benar / Salah (3 Pernyataan)';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      {/* Workspace Toolbar (below header, obeying Top Bar Contract) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-slate-600">
            <span className="font-semibold text-slate-900">
              {studentName} (Kelas {className})
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-semibold text-sky-700">
              Soal {questionIndex + 1} dari {totalQuestions}
            </span>
            <span aria-hidden="true">·</span>
            <span>Level Adaptif: {adaptiveTier}</span>
            {streak >= 2 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">
                  {streak} Benar Beruntun
                </span>
              </>
            )}
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleAudio}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap min-h-[40px] ${
              audioEnabled
                ? 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-sky-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
            <span>Suara & Narasi: {audioEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {audioEnabled && (
            <button
              type="button"
              onClick={handleSpeakQuestion}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[40px] ${
                isSpeaking
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isSpeaking ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Hentikan Narasi</span>
                </>
              ) : (
                <>
                  <Headphones className="w-4 h-4" />
                  <span>Bacakan Bacaan & Soal</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Two-Zone Sandbox Layout: Stimulus (Left 58%) + Interactive Question Deck (Right 42%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Stimulus Bacaan ~100 kata + Grafik/Infografis */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="space-y-1.5 border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-sky-700 font-semibold">{question.topicLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Kompetensi: {question.competency}</span>
              <span aria-hidden="true">·</span>
              <span>{typeLabel}</span>
              {question.isListeningFocus && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-700 font-semibold inline-flex items-center gap-1">
                    <Headphones className="w-3.5 h-3.5" />
                    Dengarkan Lalu Jawab
                  </span>
                </>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {question.stimulusTitle}
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-2">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Wacana Kontekstual Sekitar Wanaraya</span>
            </div>
            <p className="text-[15px] leading-[1.7] text-slate-800">
              <MathText text={question.readingPassage} />
            </p>
          </div>

          <StimulusVisualRenderer
            visual={question.visual}
            imagePath={question.imagePath}
            stimulusTitle={question.stimulusTitle}
          />
        </section>

        {/* Right Zone: Question Prompt, Answers & Educational Feedback */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 lg:sticky lg:top-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-500">
              Pertanyaan Nomor {questionIndex + 1}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              <MathText text={question.prompt} />
            </h3>
          </div>

          {/* PG Options */}
          {question.type === 'PG' && (
            <div className="space-y-2.5">
              {question.options.map((opt, idx) => {
                const isSelected = pgChoice === idx;
                const isCorrectOpt = idx === question.correctIndex;
                let styleClass =
                  'bg-white border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/40';

                if (submittedGrade) {
                  if (isCorrectOpt) {
                    styleClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                  } else if (isSelected && !isCorrectOpt) {
                    styleClass = 'bg-rose-50 border-rose-400 text-rose-950';
                  } else {
                    styleClass = 'bg-slate-50 border-slate-200 text-slate-500';
                  }
                } else if (isSelected) {
                  styleClass = 'bg-sky-50 border-sky-600 text-sky-950 font-semibold ring-2 ring-sky-100';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!!submittedGrade}
                    onClick={() => {
                      audioEngine.playClick();
                      setPgChoice(idx);
                    }}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-3 min-h-[48px] cursor-pointer disabled:cursor-default ${styleClass}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                        isSelected && !submittedGrade
                          ? 'bg-sky-600 text-white'
                          : submittedGrade && isCorrectOpt
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>
                    <span className="text-sm sm:text-[15px] leading-snug flex-1">
                      <MathText text={opt} />
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* MCMA Options (4 statements, multi-select) */}
          {question.type === 'MCMA' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-500">
                Centang semua pernyataan yang bernilai benar (boleh lebih dari satu).
              </p>
              {question.statements.map((stmt, idx) => {
                const isSelected = mcmaChoices.includes(idx);
                const isTrueStmt = question.correctIndices.includes(idx);
                let styleClass =
                  'bg-white border-slate-200 text-slate-800 hover:border-sky-400';

                if (submittedGrade) {
                  if (isTrueStmt) {
                    styleClass = 'bg-emerald-50 border-emerald-500 text-emerald-950';
                  } else if (isSelected && !isTrueStmt) {
                    styleClass = 'bg-rose-50 border-rose-400 text-rose-950';
                  } else {
                    styleClass = 'bg-slate-50 border-slate-200 text-slate-500';
                  }
                } else if (isSelected) {
                  styleClass = 'bg-sky-50 border-sky-600 text-sky-950 ring-2 ring-sky-100';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!!submittedGrade}
                    onClick={() => handleToggleMcma(idx)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-start gap-3 min-h-[48px] cursor-pointer disabled:cursor-default ${styleClass}`}
                  >
                    <span
                      className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSelected
                          ? 'bg-sky-600 border-sky-600 text-white'
                          : 'bg-white border-slate-300 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <div className="flex-1 text-sm leading-relaxed">
                      <MathText text={stmt} />
                      {submittedGrade && (
                        <div className="mt-1 text-xs font-semibold">
                          {isTrueStmt ? (
                            <span className="text-emerald-700">✓ Pernyataan Benar</span>
                          ) : (
                            <span className="text-slate-500">✕ Pernyataan Kurang Tepat</span>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* BS Options (3 statements, each Benar / Salah) */}
          {question.type === 'BS' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Tentukan Benar atau Salah untuk masing-masing dari 3 pernyataan berikut.
              </p>
              {question.statements.map((stmt, idx) => {
                const chosen = bsChoices[idx];
                const actual = question.correctBooleans[idx];
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5"
                  >
                    <p className="text-sm text-slate-800 leading-relaxed">
                      <span className="font-mono font-semibold text-slate-500 mr-1.5">
                        {idx + 1}.
                      </span>
                      <MathText text={stmt} />
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[true, false].map((val) => {
                        const isChosen = chosen === val;
                        let btnClass =
                          'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                        if (submittedGrade) {
                          if (actual === val) {
                            btnClass =
                              'bg-emerald-600 border-emerald-600 text-white font-semibold';
                          } else if (isChosen && actual !== val) {
                            btnClass =
                              'bg-rose-600 border-rose-600 text-white font-semibold';
                          } else {
                            btnClass = 'bg-white border-slate-200 text-slate-400';
                          }
                        } else if (isChosen) {
                          btnClass =
                            'bg-sky-600 border-sky-600 text-white font-semibold';
                        }

                        return (
                          <button
                            key={String(val)}
                            type="button"
                            disabled={!!submittedGrade}
                            onClick={() => handleSelectBs(idx, val)}
                            className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer disabled:cursor-default min-h-[40px] ${btnClass}`}
                          >
                            {val ? 'Benar' : 'Salah'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action or Educational Feedback */}
          {!submittedGrade ? (
            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="w-full py-3.5 px-5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed min-h-[48px]"
            >
              Periksa Jawaban
            </button>
          ) : (
            <div className="space-y-4">
              <div
                className={`rounded-xl border p-4 space-y-2 ${
                  submittedGrade.isFullCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {submittedGrade.isFullCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Apresiasi: Jawaban Kamu Benar!</span>
                    </>
                  ) : submittedGrade.earnedFraction > 0 ? (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>Bagus! Sebagian Pernyataan Sudah Tepat</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-amber-700 shrink-0" />
                      <span>Koreksi Membangun & Makna Konsep</span>
                    </>
                  )}
                </div>
                <p className="text-sm leading-relaxed">
                  <MathText
                    text={
                      submittedGrade.isFullCorrect
                        ? question.feedbackCorrect
                        : question.feedbackIncorrect
                    }
                  />
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  audioEngine.playClick();
                  onNextQuestion();
                }}
                className="w-full py-3.5 px-5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <span>
                  {questionIndex + 1 === totalQuestions
                    ? 'Selesaikan & Lihat Nilai Akhir'
                    : 'Lanjut ke Soal Berikutnya'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
