import React from 'react';
import {
  Award,
  CheckCircle2,
  CloudCheck,
  CloudOff,
  RotateCcw,
  RefreshCw,
} from 'lucide-react';
import {
  AdaptiveTier,
  ClassName,
  CompetencyScores,
  TOPIC_LABELS,
  TopicId,
  TopicScores,
  TypeScores,
} from '../types/quiz';

interface Props {
  studentName: string;
  className: ClassName;
  absentNumber: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  adaptiveTier: AdaptiveTier;
  durationSeconds: number;
  topicScores: TopicScores;
  competencyScores: CompetencyScores;
  typeScores: TypeScores;
  syncStatus: 'saving' | 'saved' | 'error';
  syncError: string | null;
  onRetrySync: () => void;
  onRestartQuiz: () => void;
}

export const StudentResultView: React.FC<Props> = ({
  studentName,
  className,
  absentNumber,
  score,
  correctCount,
  totalQuestions,
  adaptiveTier,
  durationSeconds,
  topicScores,
  competencyScores,
  typeScores,
  syncStatus,
  syncError,
  onRetrySync,
  onRestartQuiz,
}) => {
  const mins = Math.floor(durationSeconds / 60);
  const secs = durationSeconds % 60;
  const passed = score >= 76;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Main Result Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-sky-700">
              Try Out Persiapan SAS Matematika · SMPN 1 Wanaraya
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {studentName}
            </h2>
            <p className="text-sm text-slate-600">
              Kelas {className}
              {absentNumber ? ` · No. Absen ${absentNumber}` : ''} · Level Akhir:{' '}
              <span className="font-semibold text-slate-900">{adaptiveTier}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 shrink-0">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                passed ? 'bg-emerald-600 text-white' : 'bg-sky-600 text-white'
              }`}
            >
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Nilai Akhir SAS</div>
              <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
                {score}
              </div>
              <div
                className={`text-xs font-semibold ${
                  passed ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {passed ? 'Tuntas (≥ 76)' : 'Perlu Penguatan Materi'}
              </div>
            </div>
          </div>
        </div>

        {/* Cloud Sync Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2.5 text-sm">
            {syncStatus === 'saved' && (
              <>
                <CloudCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-slate-800 font-medium">
                  Nilai berhasil tersinkronisasi ke Cloud Database Dasbor Guru.
                </span>
              </>
            )}
            {syncStatus === 'saving' && (
              <>
                <RefreshCw className="w-5 h-5 text-sky-600 animate-spin shrink-0" />
                <span className="text-slate-700">
                  Menyimpan hasil Try Out ke Cloud Database...
                </span>
              </>
            )}
            {syncStatus === 'error' && (
              <>
                <CloudOff className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="text-rose-800 text-xs sm:text-sm">
                  Gagal menyinkronkan ke cloud ({syncError || 'koneksi terputus'}).
                </span>
              </>
            )}
          </div>

          {syncStatus === 'error' && (
            <button
              type="button"
              onClick={onRetrySync}
              className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 cursor-pointer shrink-0"
            >
              Kirim Ulang ke Guru
            </button>
          )}
        </div>

        {/* 4 Summary KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="text-xs text-slate-500">Benar Penuh</div>
            <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-1">
              {correctCount} / {totalQuestions}
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="text-xs text-slate-500">Durasi Kerja</div>
            <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-1">
              {mins}m {secs}d
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="text-xs text-slate-500">PG / MCMA / B-S</div>
            <div className="text-sm font-bold font-mono text-slate-900 tabular-nums mt-2">
              {typeScores.pg}/17 · {typeScores.mcma}/8 · {typeScores.bs}/10
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="text-xs text-slate-500">Motivasi</div>
            <div className="text-sm font-semibold text-emerald-700 mt-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{passed ? 'Siap Hadapi SAS!' : 'Terus Berlatih!'}</span>
            </div>
          </div>
        </div>

        {/* Breakdown: 5 Materi & 3 Kompetensi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Capaian Per Materi Pokok (Kelas 8)
            </h3>
            {(Object.keys(TOPIC_LABELS) as TopicId[]).map((key) => {
              const val = topicScores[key];
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700">{TOPIC_LABELS[key]}</span>
                    <span className="font-mono font-semibold text-slate-900 tabular-nums">
                      {val}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-600 rounded-full"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Capaian Tingkat Kompetensi (20% / 50% / 30%)
            </h3>
            {[
              { label: 'Memahami (20% Soal)', value: competencyScores.memahami, color: 'bg-emerald-600' },
              {
                label: 'Mengaplikasikan (50% Soal)',
                value: competencyScores.mengaplikasikan,
                color: 'bg-sky-600',
              },
              { label: 'Menalar (30% Soal)', value: competencyScores.menalar, color: 'bg-amber-600' },
            ].map((c) => (
              <div key={c.label} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">{c.label}</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {c.value}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${c.color} rounded-full`}
                    style={{ width: `${c.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Data hasil ujian kamu tetap aman tersimpan saat halaman dimuat ulang.
          </p>
          <button
            type="button"
            onClick={onRestartQuiz}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Sesi Baru / Siswa Lain</span>
          </button>
        </div>
      </div>
    </div>
  );
};
