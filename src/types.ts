export type NavigationTab = 'home' | 'simulator' | 'theory' | 'applications' | 'quiz' | 'challenges';

export type Language = 'cpp' | 'python' | 'javascript';

export interface StackElement {
  id: string;
  value: string | number;
  color: string;
  timestamp: number;
  isHighlighted?: boolean;
}

export interface OperationLog {
  id: string;
  type: 'PUSH' | 'POP' | 'PEEK' | 'ISEMPTY' | 'ISFULL' | 'CLEAR' | 'ERROR';
  value?: string | number;
  message: string;
  timestamp: string;
  success: boolean;
}

export interface CodeSnippet {
  push: string[];
  pop: string[];
  peek: string[];
  isEmpty: string[];
  isFull: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  initialStack: (string | number)[];
  targetStack: (string | number)[];
  capacity: number;
  maxMoves?: number;
  hint: string;
  instructions: string;
}

export interface ComplexityItem {
  operation: string;
  average: string;
  worst: string;
  space: string;
  description: string;
}
