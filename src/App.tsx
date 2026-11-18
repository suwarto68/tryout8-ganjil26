import React, { useCallback, useEffect, useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Play,
  Volume2,
  VolumeX,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react';
import {
  AdaptiveTier,
  ClassName,
  GradedAnswer,
  Question,
  TOPIC_LABELS,
  TopicId,
} from './types/quiz';
import {
  ALL_QUESTIONS,
  computeSummaryMetrics,
  selectNextAdaptiveQuestion,
} from './data/questions';
import { db, handleFirestoreError, OperationType } from './firebase';
import { audioEngine } from './utils/audioEngine';
import { ErrorBoundary } from './components/ErrorBoundary';
import { QuizWorkspace } from './components/QuizWorkspace';
import { StudentResultView } from './components/StudentResultView';
import { TeacherDashboard } from './components/TeacherDashboard';

type AppView = 'home' | 'quiz' | 'result' | 'teacher';

interface StoredSession {
  view: 'quiz' | 'result';
  studentName: string;
  className: ClassName;
  absentNumber: string;
  askedIds: string[];
  gradedMap: Record<string, GradedAnswer>;
  adaptiveTier: AdaptiveTier;
  streak: number;
  startedAtMs: number;
  durationSeconds: number;
  submissionId: string;
  syncedToCloud: boolean;
}

const STORAGE_KEY = 'smpn1_wanaraya_tryout_sas_v1';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState<ClassName>('8A');
  const [absentNumber, setAbsentNumber] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  // Active quiz state
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [gradedMap, setGradedMap] = useState<Record<string, GradedAnswer>>({});
  const [adaptiveTier, setAdaptiveTier] = useState<AdaptiveTier>('Dasar');
  const [streak, setStreak] = useState(0);
  const [startedAtMs, setStartedAtMs] = useState<number>(Date.now());
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [submissionId, setSubmissionId] = useState('');

  // Cloud sync status for student result
  const [syncStatus, setSyncStatus] = useState<'saving' | 'saved' | 'error'>('saving');
  const [syncError, setSyncError] = useState<string | null>(null);

  // Restore saved session if student reloads page
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as StoredSession;
      if (!saved || !saved.studentName || !Array.isArray(saved.askedIds) || saved.askedIds.length === 0) {
        return;
      }
      setStudentName(saved.studentName);
      setClassName(saved.className);
      setAbsentNumber(saved.absentNumber || '');
      setAskedIds(saved.askedIds);
      setGradedMap(saved.gradedMap || {});
      setAdaptiveTier(saved.adaptiveTier || 'Dasar');
      setStreak(saved.streak || 0);
      setStartedAtMs(saved.startedAtMs || Date.now());
      setDurationSeconds(saved.durationSeconds || 0);
      setSubmissionId(saved.submissionId || '');
      setSyncStatus(saved.syncedToCloud ? 'saved' : 'saving');
      setView(saved.view);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    audioEngine.setEnabled(audioEnabled);
  }, [audioEnabled]);

  const persistSession = useCallback((session: StoredSession) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // ignore storage quota errors
    }
  }, []);

  const uploadSubmission = useCallback(
    async (
      subId: string,
      name: string,
      cls: ClassName,
      absent: string,
      map: Record<string, GradedAnswer>,
      tier: AdaptiveTier,
      durSec: number,
      asked: string[],
      started: number,
      currentStreak: number
    ) => {
      setSyncStatus('saving');
      setSyncError(null);
      const metrics = computeSummaryMetrics(map);
      const safeName = name.trim().slice(0, 80);
      const safeAbsent = absent.trim().slice(0, 10);
      const clampedDur = Math.max(1, Math.min(14400, Math.round(durSec)));

      try {
        await setDoc(doc(db, 'quiz_submissions', subId), {
          studentName: safeName,
          className: cls,
          absentNumber: safeAbsent,
          score: metrics.score,
          correctCount: metrics.correctCount,
          totalQuestions: 35,
          adaptiveTier: tier,
          durationSeconds: clampedDur,
          topicScores: metrics.topicScores,
          competencyScores: metrics.competencyScores,
          typeScores: metrics.typeScores,
          submittedAt: serverTimestamp(),
        });
        setSyncStatus('saved');
        persistSession({
          view: 'result',
          studentName: safeName,
          className: cls,
          absentNumber: safeAbsent,
          askedIds: asked,
          gradedMap: map,
          adaptiveTier: tier,
          streak: currentStreak,
          startedAtMs: started,
          durationSeconds: clampedDur,
          submissionId: subId,
          syncedToCloud: true,
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setSyncStatus('error');
        setSyncError(msg);
        try {
          handleFirestoreError(err, OperationType.WRITE, `quiz_submissions/${subId}`);
        } catch {
          // Keep user on ResultView with retry button instead of crashing UI
        }
      }
    },
    [persistSession]
  );

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedName = studentName.trim();
    if (cleanedName.length < 2) {
      setFormError('Mohon masukkan nama lengkap minimal 2 karakter.');
      return;
    }
    setFormError(null);
    audioEngine.playClick();

    const { nextQuestion, nextTier } = selectNextAdaptiveQuestion(
      ALL_QUESTIONS,
      'Dasar',
      0,
      null,
      className
    );
    const now = Date.now();
    const newSubId = `sub_${now}_${Math.random().toString(36).slice(2, 8)}`;

    setAskedIds([nextQuestion.id]);
    setGradedMap({});
    setAdaptiveTier(nextTier);
    setStreak(0);
    setStartedAtMs(now);
    setDurationSeconds(0);
    setSubmissionId(newSubId);
    setView('quiz');

    persistSession({
      view: 'quiz',
      studentName: cleanedName,
      className,
      absentNumber: absentNumber.trim(),
      askedIds: [nextQuestion.id],
      gradedMap: {},
      adaptiveTier: nextTier,
      streak: 0,
      startedAtMs: now,
      durationSeconds: 0,
      submissionId: newSubId,
      syncedToCloud: false,
    });
  };

  const currentQuestion: Question | undefined =
    ALL_QUESTIONS.find((q) => q.id === askedIds[askedIds.length - 1]);

  const handleAnswerSubmitted = (graded: GradedAnswer) => {
    const nextMap = { ...gradedMap, [graded.questionId]: graded };
    const nextStreak = graded.isFullCorrect ? streak + 1 : 0;
    setGradedMap(nextMap);
    setStreak(nextStreak);

    persistSession({
      view: 'quiz',
      studentName: studentName.trim(),
      className,
      absentNumber: absentNumber.trim(),
      askedIds,
      gradedMap: nextMap,
      adaptiveTier,
      streak: nextStreak,
      startedAtMs,
      durationSeconds,
      submissionId,
      syncedToCloud: false,
    });
  };

  const handleNextQuestion = () => {
    const askedSet = new Set(askedIds);
    const remaining = ALL_QUESTIONS.filter((q) => !askedSet.has(q.id));

    if (remaining.length === 0) {
      const totalDur = Math.max(1, Math.round((Date.now() - startedAtMs) / 1000));
      setDurationSeconds(totalDur);
      setView('result');
      audioEngine.stopSpeech();
      audioEngine.playFinishFanfare();
      void confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });

      const subId =
        submissionId || `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      setSubmissionId(subId);

      persistSession({
        view: 'result',
        studentName: studentName.trim(),
        className,
        absentNumber: absentNumber.trim(),
        askedIds,
        gradedMap,
        adaptiveTier,
        streak,
        startedAtMs,
        durationSeconds: totalDur,
        submissionId: subId,
        syncedToCloud: false,
      });

      void uploadSubmission(
        subId,
        studentName,
        className,
        absentNumber,
        gradedMap,
        adaptiveTier,
        totalDur,
        askedIds,
        startedAtMs,
        streak
      );
      return;
    }

    const lastQId = askedIds[askedIds.length - 1];
    const lastGraded = gradedMap[lastQId];
    const { nextQuestion, nextTier } = selectNextAdaptiveQuestion(
      remaining,
      adaptiveTier,
      streak,
      lastGraded ? lastGraded.isFullCorrect : null,
      className
    );

    const nextAsked = [...askedIds, nextQuestion.id];
    setAskedIds(nextAsked);
    setAdaptiveTier(nextTier);

    persistSession({
      view: 'quiz',
      studentName: studentName.trim(),
      className,
      absentNumber: absentNumber.trim(),
      askedIds: nextAsked,
      gradedMap,
      adaptiveTier: nextTier,
      streak,
      startedAtMs,
      durationSeconds,
      submissionId,
      syncedToCloud: false,
    });
  };

  const handleRestartQuiz = () => {
    audioEngine.stopSpeech();
    localStorage.removeItem(STORAGE_KEY);
    setAskedIds([]);
    setGradedMap({});
    setAdaptiveTier('Dasar');
    setStreak(0);
    setStudentName('');
    setAbsentNumber('');
    setSubmissionId('');
    setView('home');
  };

  const resultMetrics = computeSummaryMetrics(gradedMap);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
            {/* Zone 1: Single-line Brand Wordmark */}
            <button
              type="button"
              onClick={() => {
                audioEngine.stopSpeech();
                setView('home');
              }}
              className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer font-display"
            >
              SMPN 1 Wanaraya
            </button>

            {/* Zone 2: Concise single-line nav links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <button
                type="button"
                onClick={() => {
                  audioEngine.stopSpeech();
                  setView(askedIds.length > 0 && view !== 'teacher' ? view : 'home');
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  view !== 'teacher' ? 'text-sky-700 font-semibold' : ''
                }`}
              >
                Kuis Siswa
              </button>
              <a
                href="#materi"
                onClick={() => setView('home')}
                className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              >
                Materi SAS
              </a>
              <a
                href="#kompetensi"
                onClick={() => setView('home')}
                className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              >
                Kompetensi
              </a>
              <button
                type="button"
                onClick={() => {
                  audioEngine.stopSpeech();
                  setView('teacher');
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  view === 'teacher' ? 'text-sky-700 font-semibold' : ''
                }`}
              >
                Dasbor Guru
              </button>
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="flex items-center shrink-0">
              {view === 'teacher' ? (
                <button
                  type="button"
                  onClick={() => setView(askedIds.length > 0 ? 'quiz' : 'home')}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
                >
                  Halaman Siswa
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.stopSpeech();
                    setView('teacher');
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
                >
                  Dasbor Guru
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1">
          {view === 'home' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
              {/* Two-Column Hero Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column: Title + Identity Form */}
                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-sky-700">
                      Try Out Persiapan SAS Matematika · Kelas 8A & 8B
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                      Asesmen Adaptif Matematika Berbasis Konteks Wanaraya
                    </h1>
                    <p className="text-[15px] text-slate-600 leading-relaxed">
                      Tingkat kesulitan soal menyesuaikan progres belajarmu secara otomatis, dilengkapi wacana literasi sekitar Wanaraya, grafik data, serta fitur suara narasi interaktif.
                    </p>
                  </div>

                  {askedIds.length > 0 && askedIds.length < 35 ? (
                    <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 space-y-3">
                      <p className="text-sm text-sky-950 font-medium">
                        Sesi Try Out atas nama <span className="font-bold">{studentName}</span> (Kelas {className}) masih berlangsung pada soal ke-{askedIds.length} dari 35.
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        <button
                          type="button"
                          onClick={() => setView('quiz')}
                          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl cursor-pointer min-h-[44px]"
                        >
                          Lanjutkan Kuis
                        </button>
                        <button
                          type="button"
                          onClick={handleRestartQuiz}
                          className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl cursor-pointer min-h-[44px]"
                        >
                          Ganti Peserta
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleStartQuiz} className="space-y-4">
                      <div>
                        <label
                          htmlFor="student-name"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Nama Lengkap Siswa
                        </label>
                        <input
                          id="student-name"
                          type="text"
                          required
                          maxLength={80}
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="Contoh: Muhammad Rizky Pratama"
                          className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Pilih Kelas
                          </span>
                          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                            {(['8A', '8B'] as ClassName[]).map((cls) => (
                              <button
                                key={cls}
                                type="button"
                                onClick={() => {
                                  audioEngine.playClick();
                                  setClassName(cls);
                                }}
                                className={`py-2.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer min-h-[42px] ${
                                  className === cls
                                    ? 'bg-white text-sky-700 shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                Kelas {cls}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="absent-number"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            No. Absen (Opsional)
                          </label>
                          <input
                            id="absent-number"
                            type="text"
                            maxLength={10}
                            value={absentNumber}
                            onChange={(e) => setAbsentNumber(e.target.value)}
                            placeholder="Misal: 14"
                            className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[48px]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setAudioEnabled((v) => !v)}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer min-h-[42px] ${
                            audioEnabled
                              ? 'bg-sky-50 border-sky-200 text-sky-800'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          {audioEnabled ? (
                            <Volume2 className="w-4 h-4 text-sky-600" />
                          ) : (
                            <VolumeX className="w-4 h-4 text-slate-500" />
                          )}
                          <span>Efek Suara & Narasi: {audioEnabled ? 'ON' : 'OFF'}</span>
                        </button>

                        <button
                          type="submit"
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer min-h-[48px]"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>Mulai Try Out (35 Soal)</span>
                        </button>
                      </div>

                      {formError && (
                        <p className="text-xs font-medium text-rose-600">{formError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Right Column: Editorial Hero Illustration */}
                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
                  {!heroImgFailed ? (
                    <img
                      src="/src/assets/images/wanaraya_hero_banner_1794867846370.jpg"
                      alt="Siswa SMPN 1 Wanaraya belajar matematika di lingkungan desa Wanaraya"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgFailed(true)}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 lg:h-full bg-gradient-to-br from-sky-50 to-emerald-50 flex flex-col items-center justify-center p-8 text-center">
                      <GraduationCap className="w-12 h-12 text-sky-600 mb-3" />
                      <p className="text-sm font-semibold text-slate-800">
                        Try Out SAS Matematika SMPN 1 Wanaraya
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 4-Column KPI Blueprint Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="text-xs font-semibold text-sky-700">Komposisi Soal</div>
                  <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                    35 Soal Terpadu
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    17 Pilihan Ganda · 8 MCMA (4 pernyataan) · 10 Benar/Salah (3 pernyataan)
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="text-xs font-semibold text-emerald-700">Cakupan Materi</div>
                  <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                    5 Bab Kelas VIII
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Berpangkat · Bentuk Akar · Bentuk Baku · Pythagoras · PLSV & PtLSV
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="text-xs font-semibold text-amber-700">Proporsi Kompetensi</div>
                  <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                    20% · 50% · 30%
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Memahami (7) · Mengaplikasikan (18) · Menalar (10)
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="text-xs font-semibold text-indigo-700">Stimulus & Fitur</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">
                    Wanaraya & Audio
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Teks bacaan ~100 kata, grafik, infografis, narasi suara, dan ekspor guru
                  </p>
                </div>
              </div>

              {/* Materi & Kompetensi Overview */}
              <div id="materi" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    <span>Kisi-Kisi Materi Try Out SAS Matematika Kelas 8</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {(Object.keys(TOPIC_LABELS) as TopicId[]).map((key, idx) => (
                      <div key={key} className="py-3 flex items-center justify-between gap-4">
                        <div className="text-sm font-semibold text-slate-800">
                          0{idx + 1}. {TOPIC_LABELS[key]}
                        </div>
                        <div className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                          7 soal terintegrasi
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  id="kompetensi"
                  className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Sistem Penyesuaian Adaptif & Umpan Balik</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Saat siswa menjawab benar beruntun, mesin adaptif mengarahkan tantangan menuju soal Mengaplikasikan dan Menalar. Bila keliru, sistem memberi penguatan konsep dasar serta alasan makna kalimat soal secara ramah.
                  </p>
                  <div className="space-y-2 pt-1 text-xs text-slate-700">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span>Tingkat Memahami (Dasar)</span>
                      <span className="font-mono font-semibold tabular-nums">20% (7 soal)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span>Tingkat Mengaplikasikan (Menengah)</span>
                      <span className="font-mono font-semibold tabular-nums">50% (18 soal)</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span>Tingkat Menalar (Mahir / HOTS)</span>
                      <span className="font-mono font-semibold tabular-nums">30% (10 soal)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === 'quiz' && currentQuestion && (
            <QuizWorkspace
              studentName={studentName}
              className={className}
              question={currentQuestion}
              questionIndex={askedIds.length - 1}
              totalQuestions={ALL_QUESTIONS.length}
              adaptiveTier={adaptiveTier}
              streak={streak}
              audioEnabled={audioEnabled}
              onToggleAudio={() => setAudioEnabled((v) => !v)}
              onAnswerSubmitted={handleAnswerSubmitted}
              onNextQuestion={handleNextQuestion}
            />
          )}

          {view === 'result' && (
            <StudentResultView
              studentName={studentName}
              className={className}
              absentNumber={absentNumber}
              score={resultMetrics.score}
              correctCount={resultMetrics.correctCount}
              totalQuestions={ALL_QUESTIONS.length}
              adaptiveTier={adaptiveTier}
              durationSeconds={durationSeconds}
              topicScores={resultMetrics.topicScores}
              competencyScores={resultMetrics.competencyScores}
              typeScores={resultMetrics.typeScores}
              syncStatus={syncStatus}
              syncError={syncError}
              onRetrySync={() => {
                const subId =
                  submissionId ||
                  `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
                setSubmissionId(subId);
                void uploadSubmission(
                  subId,
                  studentName,
                  className,
                  absentNumber,
                  gradedMap,
                  adaptiveTier,
                  durationSeconds,
                  askedIds,
                  startedAtMs,
                  streak
                );
              }}
              onRestartQuiz={handleRestartQuiz}
            />
          )}

          {view === 'teacher' && <TeacherDashboard />}
        </main>

        <footer className="bg-white border-t border-slate-200 py-5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Asesmen Persiapan SAS Matematika Kelas 8 (8A & 8B) · SMPN 1 Wanaraya
            </span>
            <button
              type="button"
              onClick={() => {
                audioEngine.stopSpeech();
                setView(view === 'teacher' ? 'home' : 'teacher');
              }}
              className="text-sky-700 hover:underline font-medium cursor-pointer"
            >
              {view === 'teacher' ? 'Kembali ke Halaman Siswa' : 'Buka Dasbor Rekap Guru'}
            </button>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
