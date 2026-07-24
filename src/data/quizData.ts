import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which principles or protocols does a Stack Data Structure strictly follow?',
    options: ['FIFO (First In, First Out)', 'LIFO (Last In, First Out)', 'LILO (Last In, Last Out)', 'Priority-based Scheduling'],
    correctAnswer: 1,
    explanation: 'A Stack follows Last In, First Out (LIFO). The last element added to the stack is always the first element to be removed.',
    difficulty: 'Easy'
  },
  {
    id: 2,
    question: 'What happens when a student calls PUSH on a stack that has reached its MAX_SIZE capacity limit?',
    options: ['Stack Underflow', 'Stack Overflow', 'Memory Garbage Collection', 'Null Pointer Exception'],
    correctAnswer: 1,
    explanation: 'Pushing an item into a completely filled fixed-size stack results in a "Stack Overflow" condition.',
    difficulty: 'Easy'
  },
  {
    id: 3,
    question: 'What is the Time Complexity for PEEK (Top) operation in a Stack?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'PEEK inspects the top element directly using the top pointer or array index, taking O(1) constant time.',
    difficulty: 'Easy'
  },
  {
    id: 4,
    question: 'Calling POP on an empty stack triggers which exception state?',
    options: ['Stack Overflow', 'Stack Underflow', 'Segmentation Fault', 'Stack Rebalancing'],
    correctAnswer: 1,
    explanation: 'Attempting to pop or remove an element from an empty stack triggers "Stack Underflow".',
    difficulty: 'Easy'
  },
  {
    id: 5,
    question: 'Which of the following real-world scenarios is NOT typically implemented using a Stack?',
    options: ['Browser Back/Forward navigation buttons', 'Call stack in recursive function execution', 'Printer print queue for multiple computers', 'Undo/Redo history in text editors'],
    correctAnswer: 2,
    explanation: 'A printer print queue processes documents in First In, First Out (FIFO) order, which is a Queue data structure, not a Stack.',
    difficulty: 'Medium'
  },
  {
    id: 6,
    question: 'Consider an empty stack. If we perform: Push(10), Push(20), Push(30), Pop(), Push(40), Peek(). What value is returned by Peek()?',
    options: ['10', '20', '30', '40'],
    correctAnswer: 3,
    explanation: 'Sequence: [10] -> [10, 20] -> [10, 20, 30] -> Pop removes 30 -> [10, 20] -> Push 40 -> [10, 20, 40]. Peek returns top element 40.',
    difficulty: 'Medium'
  },
  {
    id: 7,
    question: 'How is balanced parentheses checking e.g., `{[()]}` performed using a stack?',
    options: [
      'Push closing brackets, pop when opening bracket matches.',
      'Push opening brackets onto stack; pop when matching closing bracket appears.',
      'Sort all brackets alphabetically.',
      'Count total brackets and divide by 2.'
    ],
    correctAnswer: 1,
    explanation: 'Opening brackets `{, [, (` are pushed onto stack. When closing brackets `}, ], )` appear, we pop the top bracket and verify if they pair up.',
    difficulty: 'Medium'
  },
  {
    id: 8,
    question: 'What is the Worst-Case Time Complexity to search for a specific value inside a Stack of N elements?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctAnswer: 2,
    explanation: 'Because Stacks do not support direct indexing to middle items, in the worst case we must pop/inspect all N items, resulting in O(N) time.',
    difficulty: 'Hard'
  },
  {
    id: 9,
    question: 'Which data structure can be used to convert an Infix mathematical expression e.g. `A + B * C` to Postfix `A B C * +`?',
    options: ['Queue', 'Stack', 'Binary Search Tree', 'Hash Map'],
    correctAnswer: 1,
    explanation: 'A Stack is used to store operators and parenthesized expressions during Shunting-Yard expression parsing.',
    difficulty: 'Hard'
  }
];
