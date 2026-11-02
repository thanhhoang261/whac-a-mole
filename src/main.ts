import './style.css';
import { ASSETS, SkinMode } from './characters.ts';
import { sound } from './audio.ts';
import confetti from 'canvas-confetti';

type CharacterType = 'dudu' | 'bubu' | 'boba';

interface MoleHole {
  id: number;
  element: HTMLElement;
  charBox: HTMLElement;
  active: boolean;
  type: CharacterType | null;
  timer: number | null;
  isHit: boolean;
}

class BubuDuduGame {
  private holes: MoleHole[] = [];
  private score: number = 0;
  private highScore: number = 0;
  private lives: number = 3;
  private timeLeft: number = 60;
  private combo: number = 0;
  private comboTimeout: number | null = null;
  private gameInterval: number | null = null;
  private countdownInterval: number | null = null;
  private isPlaying: boolean = false;
  private skinMode: SkinMode = 'real';

  // DOM Elements
  private appEl!: HTMLElement;
  private boardEl!: HTMLElement;
  private scoreEl!: HTMLElement;
  private highScoreEl!: HTMLElement;
  private timerEl!: HTMLElement;
  private livesEl!: HTMLElement;
  private comboBadgeEl!: HTMLElement;
  private startModalEl!: HTMLElement;
  private gameoverModalEl!: HTMLElement;
  private finalScoreEl!: HTMLElement;
  private finalHighScoreEl!: HTMLElement;
  private startBtn!: HTMLButtonElement;
  private restartBtn!: HTMLButtonElement;
  private soundBtn!: HTMLButtonElement;
  private bgmBtn!: HTMLButtonElement;
  private skinBtn!: HTMLButtonElement;

  constructor() {
    this.highScore = parseInt(localStorage.getItem('bubu_dudu_highscore') || '0', 10);
    this.skinMode = (localStorage.getItem('bubu_dudu_skin') as SkinMode) || 'real';
    this.initDOM();
    this.initHoles();
    this.bindEvents();
    this.updateUI();
  }

  private initDOM() {
    this.appEl = document.getElementById('game-app')!;
    this.boardEl = document.getElementById('game-board')!;
    this.scoreEl = document.getElementById('score-val')!;
    this.highScoreEl = document.getElementById('high-score-val')!;
    this.timerEl = document.getElementById('timer-val')!;
    this.livesEl = document.getElementById('lives-box')!;
    this.comboBadgeEl = document.getElementById('combo-badge')!;
    this.startModalEl = document.getElementById('start-modal')!;
    this.gameoverModalEl = document.getElementById('gameover-modal')!;
    this.finalScoreEl = document.getElementById('final-score')!;
    this.finalHighScoreEl = document.getElementById('final-high-score')!;
    this.startBtn = document.getElementById('start-btn') as HTMLButtonElement;
    this.restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;
    this.soundBtn = document.getElementById('sound-btn') as HTMLButtonElement;
    this.bgmBtn = document.getElementById('bgm-btn') as HTMLButtonElement;
    this.skinBtn = document.getElementById('skin-btn') as HTMLButtonElement;
    this.updateSkinBtn();
  }

  private updateSkinBtn() {
    this.skinBtn.textContent = this.skinMode === 'real' ? '🐻' : '🎨';
    this.skinBtn.title = this.skinMode === 'real' ? 'Skin: Sticker Thật (Bấm để đổi sang Vector)' : 'Skin: Vector HD (Bấm để đổi sang Sticker Thật)';
  }

  private initHoles() {
    this.boardEl.innerHTML = '';
    this.holes = [];

    for (let i = 0; i < 9; i++) {
      const holeWrapper = document.createElement('div');
      holeWrapper.className = 'hole-wrapper';

      const pit = document.createElement('div');
      pit.className = 'mole-pit';

      const charBox = document.createElement('div');
      charBox.className = 'character-box';
      charBox.dataset.index = i.toString();

      const burrowFront = document.createElement('div');
      burrowFront.className = 'burrow-front-box';
      burrowFront.innerHTML = ASSETS.burrowFront;

      pit.appendChild(charBox);
      pit.appendChild(burrowFront);
      holeWrapper.appendChild(pit);
      this.boardEl.appendChild(holeWrapper);

      const moleHole: MoleHole = {
        id: i,
        element: holeWrapper,
        charBox: charBox,
        active: false,
        type: null,
        timer: null,
        isHit: false
      };

      charBox.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.onWhack(moleHole, e);
      });

      this.holes.push(moleHole);
    }
  }

  private bindEvents() {
    this.startBtn.addEventListener('click', () => this.startGame());
    this.restartBtn.addEventListener('click', () => this.startGame());

    this.skinBtn.addEventListener('click', () => {
      this.skinMode = this.skinMode === 'real' ? 'vector' : 'real';
      localStorage.setItem('bubu_dudu_skin', this.skinMode);
      this.updateSkinBtn();
      this.refreshCurrentHolesDisplay();
    });

    this.soundBtn.addEventListener('click', () => {
      sound.enabled = !sound.enabled;
      this.soundBtn.textContent = sound.enabled ? '🔊' : '🔇';
    });

    this.bgmBtn.addEventListener('click', () => {
      const active = sound.toggleBGM();
      this.bgmBtn.textContent = active ? '🎵' : '💤';
    });

    // Hammer swinging cursor animation & visual hammer on mobile tap
    window.addEventListener('pointerdown', (e) => {
      this.appEl.classList.add('swinging');
      setTimeout(() => this.appEl.classList.remove('swinging'), 130);

      this.showTapHammer(e.clientX, e.clientY);
    });
  }

  private showTapHammer(x: number, y: number) {
    if (!x && !y) return;
    const hammer = document.createElement('div');
    hammer.className = 'tap-hammer';
    hammer.innerHTML = `<svg viewBox="0 0 80 80" width="100%" height="100%"><rect x="36" y="28" width="8" height="42" rx="4" fill="#FDCB6E" stroke="#E17055" stroke-width="2" transform="rotate(-30 40 49)"/><rect x="18" y="14" width="44" height="26" rx="10" fill="#FF7675" stroke="#B71540" stroke-width="2.5" transform="rotate(-30 40 27)"/><text x="32" y="32" font-size="14" fill="#FFEAA7" transform="rotate(-30 40 27)">⭐</text></svg>`;
    hammer.style.left = `${x}px`;
    hammer.style.top = `${y}px`;
    document.body.appendChild(hammer);
    setTimeout(() => hammer.remove(), 220);
  }

  private refreshCurrentHolesDisplay() {
    this.holes.forEach(hole => {
      if (hole.active && !hole.isHit && hole.type) {
        if (hole.type === 'dudu') {
          hole.charBox.innerHTML = ASSETS[this.skinMode].duduNormal;
        } else if (hole.type === 'bubu') {
          hole.charBox.innerHTML = ASSETS[this.skinMode].bubuNormal;
        } else {
          hole.charBox.innerHTML = ASSETS[this.skinMode].bobaItem;
        }
      }
    });
  }

  private updateUI() {
    this.scoreEl.textContent = this.score.toString();
    this.highScoreEl.textContent = this.highScore.toString();
    this.timerEl.textContent = `${this.timeLeft}s`;

    if (this.timeLeft <= 10) {
      this.timerEl.classList.add('warning');
    } else {
      this.timerEl.classList.remove('warning');
    }

    // Render hearts
    let heartsHtml = '';
    for (let i = 0; i < 3; i++) {
      if (i < this.lives) {
        heartsHtml += '<span>💖</span>';
      } else {
        heartsHtml += '<span class="heart-lost">🤍</span>';
      }
    }
    this.livesEl.innerHTML = heartsHtml;
  }

  public startGame() {
    this.score = 0;
    this.lives = 3;
    this.timeLeft = 60;
    this.combo = 0;
    this.isPlaying = true;

    this.startModalEl.classList.add('hidden');
    this.gameoverModalEl.classList.add('hidden');

    this.resetAllHoles();
    this.updateUI();

    if (sound.bgmEnabled) {
      sound.startBGM();
    }

    // Countdown 60s timer
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownInterval = window.setInterval(() => {
      this.timeLeft--;
      this.updateUI();

      if (this.timeLeft <= 0) {
        this.gameOver('Hết thời gian rồi!');
      }
    }, 1000);

    // Mole spawn loop
    this.scheduleNextSpawn();
  }

  private scheduleNextSpawn() {
    if (!this.isPlaying) return;

    // Difficulty scaling: speed increases as time runs low
    const elapsed = 60 - this.timeLeft;
    const minDelay = Math.max(380, 850 - elapsed * 8);
    const maxDelay = Math.max(700, 1400 - elapsed * 10);
    const nextDelay = Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

    this.gameInterval = window.setTimeout(() => {
      if (!this.isPlaying) return;

      // Spawn 1 or 2 moles simultaneously in late game
      const molesToSpawn = elapsed > 25 && Math.random() < 0.45 ? 2 : 1;
      for (let i = 0; i < molesToSpawn; i++) {
        this.spawnMole();
      }

      this.scheduleNextSpawn();
    }, nextDelay);
  }

  private spawnMole() {
    // Pick an inactive hole
    const available = this.holes.filter(h => !h.active);
    if (available.length === 0) return;

    const hole = available[Math.floor(Math.random() * available.length)];
    hole.active = true;
    hole.isHit = false;

    // Determine type: 65% Dudu, 25% Bubu, 10% Boba
    const rand = Math.random();
    const currentSkin = ASSETS[this.skinMode];
    if (rand < 0.65) {
      hole.type = 'dudu';
      hole.charBox.innerHTML = currentSkin.duduNormal;
    } else if (rand < 0.90) {
      hole.type = 'bubu';
      hole.charBox.innerHTML = currentSkin.bubuNormal;
    } else {
      hole.type = 'boba';
      hole.charBox.innerHTML = currentSkin.bobaItem;
    }

    hole.element.classList.add('up');
    sound.playPop();

    // Stay duration calculation
    const elapsed = 60 - this.timeLeft;
    const stayDuration = Math.max(750, 1450 - elapsed * 11);

    hole.timer = window.setTimeout(() => {
      this.hideMole(hole);
    }, stayDuration);
  }

  private hideMole(hole: MoleHole) {
    hole.element.classList.remove('up');
    hole.active = false;
    if (hole.timer) {
      clearTimeout(hole.timer);
      hole.timer = null;
    }
  }

  private resetAllHoles() {
    if (this.gameInterval) clearTimeout(this.gameInterval);
    this.holes.forEach(hole => {
      this.hideMole(hole);
      hole.charBox.innerHTML = '';
    });
  }

  private onWhack(hole: MoleHole, e: PointerEvent) {
    if (!this.isPlaying || !hole.active || hole.isHit) return;
    hole.isHit = true;

    const rect = hole.element.getBoundingClientRect();
    const clickX = e.clientX || rect.left + rect.width / 2;
    const clickY = e.clientY || rect.top + rect.height / 3;

    if (hole.timer) clearTimeout(hole.timer);

    const currentSkin = ASSETS[this.skinMode];

    if (hole.type === 'dudu') {
      // ĐẬP TRÚNG DUDU -> CỘNG ĐIỂM + COMBO
      hole.charBox.innerHTML = currentSkin.duduWhacked;
      sound.playWhackDudu();

      this.combo++;
      const multiplier = this.combo >= 8 ? 3 : this.combo >= 4 ? 2 : 1;
      const points = 10 * multiplier;
      this.score += points;

      sound.playCombo(this.combo);
      this.showFloatingText(`+${points}${multiplier > 1 ? ` (x${multiplier})` : ''}`, clickX, clickY, 'plus');
      this.triggerComboDisplay();

      setTimeout(() => this.hideMole(hole), 400);

    } else if (hole.type === 'bubu') {
      // ĐẬP NHẦM BUBU -> TRỪ ĐIỂM + MẤT 1 TIM + MẤT COMBO
      hole.charBox.innerHTML = currentSkin.bubuAngry;
      sound.playHitBubu();

      this.score = Math.max(0, this.score - 15);
      this.lives--;
      this.combo = 0;
      this.hideComboBadge();

      this.showFloatingText('💔 DẬP NHẦM BUBU RỒI! -15', clickX, clickY, 'minus');

      // Rung lắc nhẹ cả màn hình khi đập nhầm Bubu
      this.appEl.animate([
        { transform: 'translate(0, 0)' },
        { transform: 'translate(-6px, 4px)' },
        { transform: 'translate(6px, -4px)' },
        { transform: 'translate(0, 0)' }
      ], { duration: 250 });

      setTimeout(() => this.hideMole(hole), 500);

      if (this.lives <= 0) {
        this.updateUI();
        setTimeout(() => this.gameOver('Bubu khóc hết nước mắt rồi! 😭'), 300);
        return;
      }

    } else if (hole.type === 'boba') {
      // ĐẬP TRÚNG TRÀ SỮA -> BONUS CỰC KHỦNG + CỘNG GIÂY
      sound.playBoba();
      const bonusScore = 50;
      this.score += bonusScore;
      this.timeLeft = Math.min(60, this.timeLeft + 5);

      this.showFloatingText('🧋 TRÀ SỮA +50đ +5s! ✨', clickX, clickY, 'bonus');

      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x: clickX / window.innerWidth, y: clickY / window.innerHeight }
      });

      setTimeout(() => this.hideMole(hole), 250);
    }

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('bubu_dudu_highscore', this.highScore.toString());
    }

    this.updateUI();
  }

  private triggerComboDisplay() {
    if (this.combo >= 3) {
      this.comboBadgeEl.textContent = `🔥 ${this.combo} COMBO! x${this.combo >= 8 ? 3 : 2}`;
      this.comboBadgeEl.classList.add('show');

      if (this.comboTimeout) clearTimeout(this.comboTimeout);
      this.comboTimeout = window.setTimeout(() => {
        this.hideComboBadge();
      }, 1500);
    }
  }

  private hideComboBadge() {
    this.comboBadgeEl.classList.remove('show');
  }

  private showFloatingText(text: string, x: number, y: number, type: 'plus' | 'minus' | 'bonus') {
    const el = document.createElement('div');
    el.className = `float-score ${type}`;
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 850);
  }

  private gameOver(reason: string) {
    this.isPlaying = false;
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    if (this.gameInterval) clearTimeout(this.gameInterval);

    this.resetAllHoles();
    this.hideComboBadge();
    sound.playGameOver();

    // Check if new record
    const isNewRecord = this.score > 0 && this.score >= this.highScore;
    if (isNewRecord) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    const titleEl = document.getElementById('gameover-title')!;
    titleEl.innerHTML = isNewRecord ? '🎉 KỶ LỤC MỚI! 🎉' : 'HẾT GIỜ RỒI! 🏁';

    const reasonEl = document.getElementById('gameover-reason')!;
    reasonEl.textContent = reason;

    this.finalScoreEl.textContent = this.score.toString();
    this.finalHighScoreEl.textContent = this.highScore.toString();

    this.gameoverModalEl.classList.remove('hidden');
  }
}

// Khởi tạo game khi DOM sẵn sàng
window.addEventListener('DOMContentLoaded', () => {
  new BubuDuduGame();
});
