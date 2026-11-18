import React, { useEffect, useMemo, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import {
  Copy,
  Check,
  FileSpreadsheet,
  FileText,
  FileType,
  LogIn,
  LogOut,
  Search,
  Trash2,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
} from 'lucide-react';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import { QuizSubmission, TOPIC_LABELS, TopicId } from '../types/quiz';
import { exportToExcel, exportToPDF, exportToWord } from '../utils/exportReports';

export const TeacherDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [classFilter, setClassFilter] = useState<'ALL' | '8A' | '8B'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<QuizSubmission | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authReady || !user) {
      setSubmissions([]);
      return;
    }

    setLoadingData(true);
    setAuthError(null);

    const q = query(
      collection(db, 'quiz_submissions'),
      orderBy('submittedAt', 'desc')
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: QuizSubmission[] = snap.docs.map((d) => {
          const data = d.data();
          const ts = data.submittedAt;
          return {
            id: d.id,
            studentName: data.studentName || '',
            className: data.className || '8A',
            absentNumber: data.absentNumber || '',
            score: Number(data.score ?? 0),
            correctCount: Number(data.correctCount ?? 0),
            totalQuestions: Number(data.totalQuestions ?? 35),
            adaptiveTier: data.adaptiveTier || 'Dasar',
            durationSeconds: Number(data.durationSeconds ?? 0),
            topicScores: data.topicScores || {
              pangkat: 0,
              akar: 0,
              baku: 0,
              pythagoras: 0,
              plsv: 0,
            },
            competencyScores: data.competencyScores || {
              memahami: 0,
              mengaplikasikan: 0,
              menalar: 0,
            },
            typeScores: data.typeScores || { pg: 0, mcma: 0, bs: 0 },
            submittedAt: ts && typeof ts.toDate === 'function' ? ts.toDate() : null,
          };
        });
        setSubmissions(list);
        setLoadingData(false);
      },
      (err) => {
        setLoadingData(false);
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('permission') || msg.includes('PERMISSION_DENIED')) {
          setAuthError(
            `Akun ${user.email} belum terdaftar sebagai Guru Administrator (gunakan akun ujiansmpn1wnry@gmail.com).`
          );
        } else {
          handleFirestoreError(err, OperationType.LIST, 'quiz_submissions');
        }
      }
    );

    return () => unsub();
  }, [authReady, user]);

  const handleLogin = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : 'Gagal masuk dengan akun Google.'
      );
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // ignore clipboard fallback
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete?.id) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'quiz_submissions', pendingDelete.id));
      setPendingDelete(null);
    } catch (err) {
      handleFirestoreError(
        err,
        OperationType.DELETE,
        `quiz_submissions/${pendingDelete.id}`
      );
    } finally {
      setDeleting(false);
    }
  };

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (classFilter !== 'ALL' && s.className !== classFilter) return false;
      if (
        searchTerm.trim() &&
        !s.studentName.toLowerCase().includes(searchTerm.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [submissions, classFilter, searchTerm]);

  const stats = useMemo(() => {
    if (filtered.length === 0) {
      return { total: 0, avg: 0, passed: 0, highest: 0 };
    }
    const sum = filtered.reduce((acc, s) => acc + s.score, 0);
    const passed = filtered.filter((s) => s.score >= 76).length;
    const highest = Math.max(...filtered.map((s) => s.score));
    return {
      total: filtered.length,
      avg: Math.round(sum / filtered.length),
      passed,
      highest,
    };
  }, [filtered]);

  const topicAverages = useMemo(() => {
    const keys: TopicId[] = ['pangkat', 'akar', 'baku', 'pythagoras', 'plsv'];
    return keys.map((k) => {
      const avg =
        filtered.length === 0
          ? 0
          : Math.round(
              filtered.reduce((acc, s) => acc + (s.topicScores[k] || 0), 0) /
                filtered.length
            );
      return { key: k, label: TOPIC_LABELS[k], avg };
    });
  }, [filtered]);

  if (!authReady) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center text-sm text-slate-600">
        Memeriksa sesi autentikasi guru...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-5">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Dasbor Rekap Nilai Guru Real-Time
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Masuk menggunakan akun Google Guru (
              <span className="font-mono text-slate-800">ujiansmpn1wnry@gmail.com</span>
              ) untuk memantau hasil siswa Kelas 8A dan 8B secara langsung serta mengunduh laporan Excel, PDF, dan Word.
            </p>
          </div>
          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              {authError}
            </div>
          )}
          <button
            type="button"
            onClick={handleLogin}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-colors cursor-pointer min-h-[44px]"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk dengan Google Guru</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Control Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-700">
            Sinkronisasi Cloud Real-Time · SMPN 1 Wanaraya
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Dasbor Guru Matematika Kelas 8A & 8B
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Login sebagai: {user.email}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyShareLink}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[40px]"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Tautan Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Salin Link Kuis Siswa</span>
              </>
            )}
          </button>

          <button
            type="button"
            disabled={filtered.length === 0}
            onClick={() => exportToExcel(filtered, classFilter)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed min-h-[40px]"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel (.xlsx)</span>
          </button>

          <button
            type="button"
            disabled={filtered.length === 0}
            onClick={() => exportToPDF(filtered, classFilter)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed min-h-[40px]"
          >
            <FileText className="w-4 h-4" />
            <span>PDF (.pdf)</span>
          </button>

          <button
            type="button"
            disabled={filtered.length === 0}
            onClick={() => void exportToWord(filtered, classFilter)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed min-h-[40px]"
          >
            <FileType className="w-4 h-4" />
            <span>Word (.docx)</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[40px]"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {authError && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-sm text-rose-800">
          {authError}
        </div>
      )}

      {/* 4 KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Total Peserta</div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {stats.total}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Rata-Rata Nilai</div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {stats.avg}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Tuntas (≥ 76)</div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {stats.passed}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Nilai Tertinggi</div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {stats.highest}
            </div>
          </div>
        </div>
      </div>

      {/* Topic Mastery Summary + Filter Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            Rata-Rata Penguasaan 5 Materi Pokok
          </h3>
          <div className="space-y-3">
            {topicAverages.map((t) => (
              <div key={t.key} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">{t.label}</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {t.avg}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-600 rounded-full transition-all"
                    style={{ width: `${t.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit">
              {(['ALL', '8A', '8B'] as const).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setClassFilter(cls)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    classFilter === cls
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cls === 'ALL' ? 'Semua Kelas' : `Kelas ${cls}`}
                </button>
              ))}
            </div>

            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama siswa..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {loadingData ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Menghubungkan ke data nilai cloud real-time...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500 border border-dashed border-slate-200 rounded-xl">
              Belum ada data hasil Try Out siswa pada filter ini. Bagikan tautan kuis ke siswa Kelas 8A dan 8B untuk mulai merekap nilai secara otomatis.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                    <th className="py-2.5 pr-3">Nama Siswa</th>
                    <th className="py-2.5 px-2">Kelas</th>
                    <th className="py-2.5 px-2 text-right">Nilai</th>
                    <th className="py-2.5 px-2 text-right">Benar</th>
                    <th className="py-2.5 px-2">Level</th>
                    <th className="py-2.5 pl-2 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80">
                      <td className="py-3 pr-3">
                        <div className="font-semibold text-slate-900">
                          {item.studentName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.absentNumber ? `Absen ${item.absentNumber} · ` : ''}
                          {item.submittedAt
                            ? item.submittedAt.toLocaleString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'Baru saja'}
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono text-xs font-semibold text-slate-700">
                        {item.className}
                      </td>
                      <td className="py-3 px-2 text-right font-mono font-bold tabular-nums">
                        <span
                          className={
                            item.score >= 76 ? 'text-emerald-700' : 'text-amber-700'
                          }
                        >
                          {item.score}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right font-mono text-xs text-slate-600 tabular-nums">
                        {item.correctCount}/35
                      </td>
                      <td className="py-3 px-2 text-xs text-slate-700">
                        {item.adaptiveTier}
                      </td>
                      <td className="py-3 pl-2 text-right">
                        <button
                          type="button"
                          onClick={() => setPendingDelete(item)}
                          aria-label={`Hapus data ${item.studentName}`}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Custom Confirmation Modal (no window.confirm) */}
      {pendingDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900">
              Hapus Data Hasil Siswa?
            </h3>
            <p className="text-sm text-slate-600">
              Rekap nilai milik <span className="font-semibold text-slate-900">{pendingDelete.studentName}</span> (Kelas {pendingDelete.className}) akan dihapus permanen dari Cloud Database.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setPendingDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => void confirmDelete()}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl cursor-pointer"
              >
                {deleting ? 'Menghapus...' : 'Ya, Hapus Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
