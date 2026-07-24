import { CodeSnippet, ComplexityItem, Language } from '../types';

export const CODE_SNIPPETS: Record<Language, CodeSnippet> = {
  cpp: {
    push: [
      'void push(int value) {',
      '    if (top == MAX_SIZE - 1) {',
      '        cout << "Stack Overflow! Cannot push " << value;',
      '        return;',
      '    }',
      '    top++;',
      '    stack[top] = value;',
      '    cout << "Pushed " << value << " successfully.";',
      '}'
    ],
    pop: [
      'int pop() {',
      '    if (top == -1) {',
      '        cout << "Stack Underflow! Stack is empty.";',
      '        return -1;',
      '    }',
      '    int poppedVal = stack[top];',
      '    top--;',
      '    return poppedVal;',
      '}'
    ],
    peek: [
      'int peek() {',
      '    if (top == -1) {',
      '        cout << "Stack is empty.";',
      '        return -1;',
      '    }',
      '    return stack[top];',
      '}'
    ],
    isEmpty: [
      'bool isEmpty() {',
      '    return (top == -1);',
      '}'
    ],
    isFull: [
      'bool isFull() {',
      '    return (top == MAX_SIZE - 1);',
      '}'
    ]
  },
  python: {
    push: [
      'def push(self, value):',
      '    if len(self.stack) >= self.max_size:',
      '        print("Stack Overflow! Stack is full.")',
      '        return False',
      '    self.stack.append(value)',
      '    print(f"Pushed {value} successfully.")',
      '    return True'
    ],
    pop: [
      'def pop(self):',
      '    if len(self.stack) == 0:',
      '        print("Stack Underflow! Stack is empty.")',
      '        return None',
      '    val = self.stack.pop()',
      '    print(f"Popped {val} from top.")',
      '    return val'
    ],
    peek: [
      'def peek(self):',
      '    if not self.stack:',
      '        print("Stack is empty.")',
      '        return None',
      '    return self.stack[-1]'
    ],
    isEmpty: [
      'def is_empty(self):',
      '    return len(self.stack) == 0'
    ],
    isFull: [
      'def is_full(self):',
      '    return len(self.stack) >= self.max_size'
    ]
  },
  javascript: {
    push: [
      'push(element) {',
      '  if (this.items.length >= this.maxSize) {',
      '    console.warn("Stack Overflow!");',
      '    return false;',
      '  }',
      '  this.items.push(element);',
      '  console.log(`Pushed ${element} to stack.`);',
      '  return true;',
      '}'
    ],
    pop: [
      'pop() {',
      '  if (this.isEmpty()) {',
      '    console.warn("Stack Underflow!");',
      '    return null;',
      '  }',
      '  const element = this.items.pop();',
      '  return element;',
      '}'
    ],
    peek: [
      'peek() {',
      '  if (this.isEmpty()) return null;',
      '  return this.items[this.items.length - 1];',
      '}'
    ],
    isEmpty: [
      'isEmpty() {',
      '  return this.items.length === 0;',
      '}'
    ],
    isFull: [
      'isFull() {',
      '  return this.items.length >= this.maxSize;',
      '}'
    ]
  }
};

export const COMPLEXITY_TABLE: ComplexityItem[] = [
  {
    operation: 'Push',
    average: 'O(1)',
    worst: 'O(1)',
    space: 'O(1)',
    description: 'Inserts an element at the top of the stack. Constant time as top pointer updates immediately.'
  },
  {
    operation: 'Pop',
    average: 'O(1)',
    worst: 'O(1)',
    space: 'O(1)',
    description: 'Removes and returns the top element of the stack in constant time.'
  },
  {
    operation: 'Peek (Top)',
    average: 'O(1)',
    worst: 'O(1)',
    space: 'O(1)',
    description: 'Returns the value at top without modifying or removing it.'
  },
  {
    operation: 'isEmpty',
    average: 'O(1)',
    worst: 'O(1)',
    space: 'O(1)',
    description: 'Checks if top pointer equals -1 or size is 0.'
  },
  {
    operation: 'isFull',
    average: 'O(1)',
    worst: 'O(1)',
    space: 'O(1)',
    description: 'Checks if top pointer equals MAX_SIZE - 1.'
  },
  {
    operation: 'Search',
    average: 'O(n)',
    worst: 'O(n)',
    space: 'O(1)',
    description: 'Linear search requires popping/traversing through up to n items.'
  }
];

export const REAL_LIFE_EXAMPLES = [
  {
    title: 'Stack of Plates / Trays',
    description: 'In a cafeteria, clean plates are stacked on top of each other. You take the plate from the top (LIFO) and add new clean plates to the top.',
    icon: 'Layers'
  },
  {
    title: 'Browser Back Button',
    description: 'Every web page you visit is pushed onto the history stack. Clicking "Back" pops the current page to return to the previously visited page.',
    icon: 'Globe'
  },
  {
    title: 'Text Editor Undo / Redo',
    description: 'Every keystroke or edit action is saved on an undo stack. Pressing Ctrl+Z pops the last action and pushes it onto the redo stack.',
    icon: 'Undo'
  },
  {
    title: 'Call Stack in Compilers & Engines',
    description: 'When functions are invoked in C++, Python, or JavaScript, their execution frames and parameters are pushed onto the call stack and popped when returned.',
    icon: 'Code'
  },
  {
    title: 'Expression Parentheses Matching',
    description: 'Compilers use stacks to verify syntax like `((a + b) * c)` by pushing opening brackets and popping them when a matching closing bracket is encountered.',
    icon: 'CheckSquare'
  }
];

export const ADVANTAGES_DISADVANTAGES = {
  advantages: [
    'Simple & Fast: O(1) constant time complexity for Push, Pop, and Peek operations.',
    'Memory Efficiency: Managed sequentially in continuous memory blocks or linked nodes.',
    'Automatic Memory Management: Keeps track of nested function calls and local variables cleanly.',
    'Predictable Order: LIFO guarantees strictly deterministic order of reversal.'
  ],
  disadvantages: [
    'Restricted Access: Random access to arbitrary elements (like index 3) is NOT allowed without popping elements.',
    'Risk of Stack Overflow: Fixed-size stacks can easily overflow if allocation memory limit is exceeded.',
    'No Searching Capability: Finding a specific element takes O(n) time as elements must be unwound.',
    'Risk of Memory Leak / Stack Overflow in Recursion: Uncontrolled infinite recursion leads to Stack Overflow exceptions.'
  ]
};
