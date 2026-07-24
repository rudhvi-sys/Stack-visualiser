import { Challenge } from '../types';

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'First Stack Operation',
    description: 'Learn basic Push and Pop mechanics to construct a target stack.',
    difficulty: 'Beginner',
    initialStack: [10, 20],
    targetStack: [10, 20, 30, 40],
    capacity: 6,
    maxMoves: 4,
    hint: 'Push 30 first, and then Push 40 to complete the top of the stack.',
    instructions: 'Starting with [10, 20], perform the necessary Push operations to build the stack [10, 20, 30, 40].'
  },
  {
    id: 2,
    title: 'Stack Inversion & Cleaning',
    description: 'Pop unwanted top items and insert the target values.',
    difficulty: 'Beginner',
    initialStack: [100, 200, 999, 888],
    targetStack: [100, 200, 300],
    capacity: 5,
    maxMoves: 4,
    hint: 'First POP the wrong elements 888 and 999 from the top. Then PUSH 300.',
    instructions: 'Stack currently contains [100, 200, 999, 888]. Remove the top two incorrect items (888 and 999), then Push 300 to match [100, 200, 300].'
  },
  {
    id: 3,
    title: 'Stack Reversal Puzzle',
    description: 'Reverse a sequence of elements using push/pop operations.',
    difficulty: 'Intermediate',
    initialStack: ['A', 'B'],
    targetStack: ['B', 'A'],
    capacity: 4,
    maxMoves: 6,
    hint: 'You will need to POP items into memory/input and PUSH them back in reverse order.',
    instructions: 'Starting with [A, B] (where B is at the top), turn it into [B, A] (where A is at the top).'
  },
  {
    id: 4,
    title: 'Capacity Management & Overflow Prevention',
    description: 'Manage a tight stack capacity limit without hitting Overflow errors.',
    difficulty: 'Intermediate',
    initialStack: [5, 10, 15, 20],
    targetStack: [5, 10, 25, 30],
    capacity: 4,
    maxMoves: 5,
    hint: 'The stack has MAX CAPACITY 4! Pop 20 and 15 first to make room for 25 and 30.',
    instructions: 'The stack is currently full with 4 items: [5, 10, 15, 20]. Transform it into [5, 10, 25, 30] without hitting Overflow.'
  },
  {
    id: 5,
    title: 'Master Stack Architect',
    description: 'Build a specific mathematical stack state under strict step constraints.',
    difficulty: 'Advanced',
    initialStack: [1, 2, 3, 4, 5],
    targetStack: [1, 2, 7, 8, 9],
    capacity: 6,
    maxMoves: 7,
    hint: 'Pop 5, 4, 3 first. Then push 7, 8, 9 in order.',
    instructions: 'Transform [1, 2, 3, 4, 5] into [1, 2, 7, 8, 9] in 7 moves or fewer.'
  }
];
