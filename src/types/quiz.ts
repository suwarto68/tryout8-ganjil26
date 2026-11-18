export type ClassName = '8A' | '8B';

export type TopicId = 'pangkat' | 'akar' | 'baku' | 'pythagoras' | 'plsv';

export type CompetencyLevel = 'Memahami' | 'Mengaplikasikan' | 'Menalar';

export type QuestionType = 'PG' | 'MCMA' | 'BS';

export type AdaptiveTier = 'Dasar' | 'Menengah' | 'Mahir';

export type VisualDataPoint = {
  label: string;
  value: number;
  unit?: string;
  highlight?: boolean;
};

export type InfographicFact = {
  label: string;
  value: string;
  note?: string;
};

export type StimulusVisual =
  | {
      kind: 'bar_chart';
      title: string;
      subtitle: string;
      yAxisLabel: string;
      data: VisualDataPoint[];
    }
  | {
      kind: 'line_chart';
      title: string;
      subtitle: string;
      yAxisLabel: string;
      data: VisualDataPoint[];
    }
  | {
      kind: 'pythagoras_diagram';
      title: string;
      subtitle: string;
      sideALabel: string;
      sideBLabel: string;
      hypotenuseLabel: string;
      pointA: string;
      pointB: string;
      pointC: string;
      contextCaption: string;
    }
  | {
      kind: 'infographic_cards';
      title: string;
      subtitle: string;
      facts: InfographicFact[];
      sourceNote: string;
    }
  | {
      kind: 'scale_equation';
      title: string;
      subtitle: string;
      leftPan: string;
      rightPan: string;
      relationSymbol: '=' | '<' | '>' | '≤' | '≥';
      numberLineHint?: string;
    };

export interface BaseQuestion {
  id: string;
  number: number;
  topic: TopicId;
  topicLabel: string;
  type: QuestionType;
  competency: CompetencyLevel;
  difficultyWeight: 1 | 2 | 3;
  isListeningFocus?: boolean;
  stimulusTitle: string;
  readingPassage: string;
  visual: StimulusVisual;
  imagePath?: string;
  prompt: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface PGQuestion extends BaseQuestion {
  type: 'PG';
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
}

export interface MCMAQuestion extends BaseQuestion {
  type: 'MCMA';
  statements: [string, string, string, string];
  correctIndices: number[];
}

export interface BSQuestion extends BaseQuestion {
  type: 'BS';
  statements: [string, string, string];
  correctBooleans: [boolean, boolean, boolean];
}

export type Question = PGQuestion | MCMAQuestion | BSQuestion;

export type StudentAnswer =
  | { type: 'PG'; selectedIndex: number }
  | { type: 'MCMA'; selectedIndices: number[] }
  | { type: 'BS'; selectedBooleans: (boolean | null)[] };

export interface GradedAnswer {
  questionId: string;
  earnedFraction: number; // 0 to 1
  isFullCorrect: boolean;
  answer: StudentAnswer;
}

export interface TopicScores {
  pangkat: number;
  akar: number;
  baku: number;
  pythagoras: number;
  plsv: number;
}

export interface CompetencyScores {
  memahami: number;
  mengaplikasikan: number;
  menalar: number;
}

export interface TypeScores {
  pg: number;
  mcma: number;
  bs: number;
}

export interface QuizSubmission {
  id?: string;
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
  submittedAt: Date | null;
}

export const TOPIC_LABELS: Record<TopicId, string> = {
  pangkat: 'Bilangan Berpangkat',
  akar: 'Bilangan Akar',
  baku: 'Penulisan Bentuk Baku',
  pythagoras: 'Teorema Pythagoras',
  plsv: 'PLSV & PtLSV',
};
