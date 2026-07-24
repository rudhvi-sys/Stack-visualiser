// Standalone Vanilla JS Stack Data Structure Visualizer Engine

class StackVisualizer {
  constructor() {
    this.stack = [];
    this.capacity = 8;
    this.soundEnabled = true;

    this.initDOM();
    this.bindEvents();
    this.render();
  }

  initDOM() {
    this.input = document.getElementById('stackInput');
    this.pushBtn = document.getElementById('pushBtn');
    this.popBtn = document.getElementById('popBtn');
    this.peekBtn = document.getElementById('peekBtn');
    this.clearBtn = document.getElementById('clearBtn');
    this.capacityInput = document.getElementById('capacityInput');
    this.soundToggle = document.getElementById('soundToggle');
    this.container = document.getElementById('stackContainer');
    this.emptyState = document.getElementById('emptyState');
    this.info = document.getElementById('stackInfo');
    this.logList = document.getElementById('logList');

    // Audio Context Setup
    this.audioCtx = null;
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  playSound(type) {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'push') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'pop') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'warn') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  }

  bindEvents() {
    this.pushBtn.addEventListener('click', () => this.push());
    this.popBtn.addEventListener('click', () => this.pop());
    this.peekBtn.addEventListener('click', () => this.peek());
    this.clearBtn.addEventListener('click', () => this.clear());

    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.push();
    });

    this.capacityInput.addEventListener('change', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val >= 3 && val <= 15) {
        this.capacity = val;
        this.addLog(`Updated capacity to ${this.capacity}.`, 'info');
        this.render();
      }
    });

    this.soundToggle.addEventListener('change', (e) => {
      this.soundEnabled = e.target.checked;
    });
  }

  push() {
    const value = this.input.value.trim() || `Item-${Math.floor(Math.random() * 90 + 10)}`;
    if (this.stack.length >= this.capacity) {
      this.playSound('warn');
      this.addLog(`[OVERFLOW] Cannot push "${value}". Stack is full (${this.capacity}/${this.capacity}).`, 'warn');
      return;
    }

    this.stack.push(value);
    this.playSound('push');
    this.addLog(`[PUSH] Pushed "${value}" onto top of stack (Index ${this.stack.length - 1}).`, 'push');
    this.input.value = '';
    this.render();
  }

  pop() {
    if (this.stack.length === 0) {
      this.playSound('warn');
      this.addLog(`[UNDERFLOW] Cannot pop. Stack is empty.`, 'warn');
      return;
    }

    const popped = this.stack.pop();
    this.playSound('pop');
    this.addLog(`[POP] Popped top element "${popped}".`, 'pop');
    this.render();
  }

  peek() {
    if (this.stack.length === 0) {
      this.addLog(`[PEEK] Stack is empty. Top pointer is NULL.`, 'warn');
      return;
    }
    const topValue = this.stack[this.stack.length - 1];
    this.playSound('push');
    this.addLog(`[PEEK] Top element is "${topValue}" (Index ${this.stack.length - 1}).`, 'info');
  }

  clear() {
    if (this.stack.length === 0) return;
    this.stack = [];
    this.addLog(`[CLEAR] Stack reset to empty state.`, 'info');
    this.render();
  }

  addLog(message, type = 'info') {
    const li = document.createElement('li');
    li.className = `log-item ${type}`;
    const time = new Date().toLocaleTimeString();
    li.textContent = `[${time}] ${message}`;
    this.logList.prepend(li);
  }

  render() {
    this.container.innerHTML = '';
    if (this.stack.length === 0) {
      this.container.appendChild(this.emptyState);
    } else {
      this.stack.forEach((val, idx) => {
        const isTop = idx === this.stack.length - 1;
        const item = document.createElement('div');
        item.className = `stack-item ${isTop ? 'top-item' : ''}`;
        
        const text = document.createElement('span');
        text.textContent = val;
        item.appendChild(text);

        if (isTop) {
          const tag = document.createElement('span');
          tag.className = 'top-tag';
          tag.textContent = 'TOP';
          item.appendChild(tag);
        }

        this.container.appendChild(item);
      });
    }

    this.info.textContent = `Size: ${this.stack.length} / ${this.capacity}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.visualizer = new StackVisualizer();
});
