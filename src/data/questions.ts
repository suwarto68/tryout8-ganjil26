import {
  AdaptiveTier,
  ClassName,
  CompetencyScores,
  GradedAnswer,
  Question,
  StudentAnswer,
  TopicScores,
  TypeScores,
} from '../types/quiz';
import { QUESTIONS_PART_1 } from './questionsPart1';
import { QUESTIONS_PART_2 } from './questionsPart2';

export const ALL_QUESTIONS: Question[] = [...QUESTIONS_PART_1, ...QUESTIONS_PART_2];

/**
 * Menilai jawaban siswa (PG, MCMA, BS) dengan skor proporsional untuk tipe majemuk.
 */
export function gradeQuestion(question: Question, answer: StudentAnswer): GradedAnswer {
  if (question.type === 'PG' && answer.type === 'PG') {
    const isFullCorrect = answer.selectedIndex === question.correctIndex;
    return {
      questionId: question.id,
      earnedFraction: isFullCorrect ? 1 : 0,
      isFullCorrect,
      answer,
    };
  }

  if (question.type === 'MCMA' && answer.type === 'MCMA') {
    const selected = new Set(answer.selectedIndices);
    const correctSet = new Set(question.correctIndices);
    let matches = 0;
    for (let i = 0; i < 4; i++) {
      if (selected.has(i) === correctSet.has(i)) {
        matches++;
      }
    }
    const isFullCorrect = matches === 4;
    // Jika seluruhnya benar = 1; selain itu beri kredit parsial proporsional jika ada yang tepat
    const earnedFraction = isFullCorrect ? 1 : Math.max(0, (matches - 1) / 3) * 0.75;
    return {
      questionId: question.id,
      earnedFraction,
      isFullCorrect,
      answer,
    };
  }

  if (question.type === 'BS' && answer.type === 'BS') {
    let matches = 0;
    for (let i = 0; i < 3; i++) {
      if (answer.selectedBooleans[i] === question.correctBooleans[i]) {
        matches++;
      }
    }
    const isFullCorrect = matches === 3;
    const earnedFraction = matches / 3;
    return {
      questionId: question.id,
      earnedFraction,
      isFullCorrect,
      answer,
    };
  }

  return {
    questionId: question.id,
    earnedFraction: 0,
    isFullCorrect: false,
    answer,
  };
}

/**
 * Mesin Adaptif Pemilihan Soal Berikutnya:
 * Menyesuaikan tingkat kesulitan berikutnya (1=Dasar/Memahami, 2=Mengaplikasikan, 3=Menalar)
 * berdasarkan kelas (8A / 8B) dan performa beruntun siswa tanpa mengurangi total 35 soal wajib.
 */
export function selectNextAdaptiveQuestion(
  remainingPool: Question[],
  currentTier: AdaptiveTier,
  streak: number,
  lastCorrect: boolean | null,
  className: ClassName
): { nextQuestion: Question; nextTier: AdaptiveTier } {
  let targetWeight: 1 | 2 | 3 = 2;
  let nextTier: AdaptiveTier = currentTier;

  if (lastCorrect === null) {
    // Awal kuis: mulai adaptif dari level Memahami (1) atau Menengah (2) sesuai jenjang kelas
    targetWeight = className === '8A' ? 1 : 1;
    nextTier = 'Dasar';
  } else if (lastCorrect) {
    if (streak >= 2) {
      targetWeight = 3;
      nextTier = 'Mahir';
    } else {
      targetWeight = 2;
      nextTier = 'Menengah';
    }
  } else {
    // Jika jawaban sebelumnya salah, turunkan satu tingkat sebagai scaffolding
    if (currentTier === 'Mahir') {
      targetWeight = 2;
      nextTier = 'Menengah';
    } else {
      targetWeight = 1;
      nextTier = 'Dasar';
    }
  }

  // Cari soal dengan difficultyWeight terdekat dengan targetWeight, tetap menjaga variasi topik
  const sorted = [...remainingPool].sort((a, b) => {
    const diffA = Math.abs(a.difficultyWeight - targetWeight);
    const diffB = Math.abs(b.difficultyWeight - targetWeight);
    if (diffA !== diffB) return diffA - diffB;
    return a.number - b.number;
  });

  return {
    nextQuestion: sorted[0],
    nextTier,
  };
}

export function computeSummaryMetrics(
  gradedMap: Record<string, GradedAnswer>
): {
  score: number;
  correctCount: number;
  topicScores: TopicScores;
  competencyScores: CompetencyScores;
  typeScores: TypeScores;
} {
  let totalEarned = 0;
  let correctCount = 0;

  const topicTotals: Record<string, { earned: number; count: number }> = {
    pangkat: { earned: 0, count: 0 },
    akar: { earned: 0, count: 0 },
    baku: { earned: 0, count: 0 },
    pythagoras: { earned: 0, count: 0 },
    plsv: { earned: 0, count: 0 },
  };

  const compTotals: Record<string, { earned: number; count: number }> = {
    Memahami: { earned: 0, count: 0 },
    Mengaplikasikan: { earned: 0, count: 0 },
    Menalar: { earned: 0, count: 0 },
  };

  const typeTotals: TypeScores = { pg: 0, mcma: 0, bs: 0 };

  for (const q of ALL_QUESTIONS) {
    const g = gradedMap[q.id];
    const earned = g ? g.earnedFraction : 0;
    totalEarned += earned;
    if (g?.isFullCorrect) {
      correctCount++;
      if (q.type === 'PG') typeTotals.pg++;
      if (q.type === 'MCMA') typeTotals.mcma++;
      if (q.type === 'BS') typeTotals.bs++;
    }

    topicTotals[q.topic].earned += earned;
    topicTotals[q.topic].count += 1;

    compTotals[q.competency].earned += earned;
    compTotals[q.competency].count += 1;
  }

  const pct = (earned: number, count: number) =>
    count === 0 ? 0 : Math.round((earned / count) * 100);

  return {
    score: Math.round((totalEarned / ALL_QUESTIONS.length) * 100),
    correctCount,
    topicScores: {
      pangkat: pct(topicTotals.pangkat.earned, topicTotals.pangkat.count),
      akar: pct(topicTotals.akar.earned, topicTotals.akar.count),
      baku: pct(topicTotals.baku.earned, topicTotals.baku.count),
      pythagoras: pct(topicTotals.pythagoras.earned, topicTotals.pythagoras.count),
      plsv: pct(topicTotals.plsv.earned, topicTotals.plsv.count),
    },
    competencyScores: {
      memahami: pct(compTotals.Memahami.earned, compTotals.Memahami.count),
      mengaplikasikan: pct(compTotals.Mengaplikasikan.earned, compTotals.Mengaplikasikan.count),
      menalar: pct(compTotals.Menalar.earned, compTotals.Menalar.count),
    },
    typeScores: typeTotals,
  };
}
