
  document.addEventListener('DOMContentLoaded', () => {
    const startAudioButton = document.getElementById('start-audio');
    const ambientAudio = document.querySelector('audio[data-id="main-ambient"]');

    const audioElements = {
      'pest-focus': document.querySelector('audio[data-id="pest-focus"]'),
      'pest-hover': document.querySelector('audio[data-id="pest-hover"]'),
      'pest-click': document.querySelector('audio[data-id="pest-click"]'),
      'pest-release': document.querySelector('audio[data-id="pest-release"]'),
      'bios-focus': document.querySelector('audio[data-id="bios-focus"]'),
      'bios-hover': document.querySelector('audio[data-id="bios-hover"]'),
      'bios-click': document.querySelector('audio[data-id="bios-click"]'),
      'bios-release': document.querySelector('audio[data-id="bios-release"]'),
      'necro-focus': document.querySelector('audio[data-id="necro-focus"]'),
      'necro-hover': document.querySelector('audio[data-id="necro-hover"]'),
      'necro-click': document.querySelector('audio[data-id="necro-click"]'),
      'necro-release': document.querySelector('audio[data-id="necro-release"]'),
      'about-focus': document.querySelector('audio[data-id="about-focus"]'),
      'about-hover': document.querySelector('audio[data-id="about-hover"]'),
      'about-click': document.querySelector('audio[data-id="about-click"]'),
      'about-release': document.querySelector('audio[data-id="about-release"]'),
      'terminal-focus': document.querySelector('audio[data-id="terminal-focus"]'),
      'terminal-hover': document.querySelector('audio[data-id="terminal-hover"]'),
      'terminal-click': document.querySelector('audio[data-id="terminal-click"]'),
      'terminal-release': document.querySelector('audio[data-id="terminal-release"]'),
      'footer-facebook-focus': document.querySelector('audio[data-id="footer-facebook-focus"]'),
      'footer-facebook-hover': document.querySelector('audio[data-id="footer-facebook-hover"]'),
      'footer-facebook-click': document.querySelector('audio[data-id="footer-facebook-click"]'),
      'footer-facebook-release': document.querySelector('audio[data-id="footer-facebook-release"]'),
      'main-ambient': document.querySelector('audio[data-id="main-ambient"]'),
      'back-focus': document.querySelector('audio[data-id="back-focus"]'),
      'back-hover': document.querySelector('audio[data-id="back-hover"]'),
      'back-click': document.querySelector('audio[data-id="back-click"]'),
      'back-release': document.querySelector('audio[data-id="back-release"]'),
      'terminal-welcome': document.getElementById('terminal-welcome'),
      'terminal-error': document.getElementById('terminal-error'),
      'terminal-success': document.getElementById('terminal-success')
    };

    // Reanudar el audio ambiental si ya estaba activo
    const resumeAmbientAudio = () => {
      if (ambientAudio && localStorage.getItem('audioEnabled') === 'true') {
        ambientAudio.loop = true;
        ambientAudio.play().catch(() => {
          // Error handling silenciado
        });
      }
    };

    // Función para desbloquear el audio al hacer clic
    const unlockAudio = () => {
      if (ambientAudio) {
        ambientAudio.loop = true;
        ambientAudio.play().catch(() => {
          // Error handling silenciado
        });
        localStorage.setItem('audioEnabled', 'true');
      }
      if (startAudioButton) {
        startAudioButton.classList.add('hidden'); // Ocultar el botón después de desbloquear el audio
      }
      document.removeEventListener('click', unlockAudio); // Limpiar el listener
    };

    // Función para reproducir el audio según el ID del elemento y la acción
    const playAudio = (element, action) => {
      const audio = audioElements[`${element.id}-${action}`];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {
          // Error handling silenciado
        });
      }
    };

    // Función para manejar el "Game of Life"
    function GameOfLife(config) {
      this.canvas = config.canvas;
      this.unitSize = config.unitSize;
      this.columns = config.columns;
      this.lines = config.lines;
      this.drawRate = config.drawRate;
      this.gridSize = config.gridSize;

      this.width = this.canvas.width = this.unitSize * this.columns;
      this.height = this.canvas.height = this.unitSize * this.lines;

      this.ctx = this.canvas.getContext('2d');
      this.infoPanel = config.infoPanel;
      this.infoGeneration = config.infoGeneration;
      this.infoLifeCell = config.infoLifeCell;

      this.oldState = [];
      this.newState = [];
      this.useState = [];

      this.gameOn = false;
      this.counter = 0;
      this.lifeCell = 0;

      this.gameBox = config.gameBox;
      this.gameBoxSize = { w: this.gameBox.clientWidth, h: this.gameBox.clientHeight };
    }

    GameOfLife.prototype.init = function() {
      for (var i = 0; i < this.columns; i++) {
        this.oldState[i] = [];
        this.newState[i] = [];
        this.useState[i] = [];

        for (var j = 0; j < this.lines; j++) {
          this.newState[i][j] = false;
          this.oldState[i][j] = false;
          this.useState[i][j] = false;
        }
      }
    };

    GameOfLife.prototype.randomDraft = function() {
      for (var i = 0; i < this.columns; i++) {
        this.oldState[i] = [];
        this.newState[i] = [];
        this.useState[i] = [];

        for (var j = 0; j < this.lines; j++) {
          var result = Math.random() < 0.075;

          this.newState[i][j] = result;
          this.oldState[i][j] = result;
          this.useState[i][j] = false;
        }
      }

      this.update();
      this.counter = 0;
    };

    GameOfLife.prototype.update = function() {
      for (var i = 0; i < this.columns; i++) {
        for (var j = 0; j < this.lines; j++) {
          this.newState[i][j] = this.updateState(i, j);
        }
      }

      for (var i = 0; i < this.newState.length; i++) {
        for (var j = 0; j < this.newState[i].length; j++) {
          this.oldState[i][j] = this.newState[i][j] ? true : false;
        }
      }

      this.counter++;
    };

    GameOfLife.prototype.updateState = function(i, j) {
      var adyacentAlive = 0,
        iMinus = i - 1 >= 0,
        iPlus = i + 1 < this.columns,
        jMinus = j - 1 >= 0,
        jPlus = j + 1 < this.lines;

      if (iMinus && jMinus && this.oldState[i - 1][j - 1]) { adyacentAlive++; }
      if (iMinus && this.oldState[i - 1][j]) { adyacentAlive++; }
      if (iMinus && jPlus && this.oldState[i - 1][j + 1]) { adyacentAlive++; }
      if (iPlus && jMinus && this.oldState[i + 1][j - 1]) { adyacentAlive++; }

      if (iPlus && this.oldState[i + 1][j]) { adyacentAlive++; }
      if (iPlus && jPlus && this.oldState[i + 1][j + 1]) { adyacentAlive++; }
      if (jMinus && this.oldState[i][j - 1]) { adyacentAlive++; }
      if (jPlus && this.oldState[i][j + 1]) { adyacentAlive++; }

      return (this.oldState[i][j] && adyacentAlive === 2) || 
             (this.oldState[i][j] && adyacentAlive === 3) || 
             (!this.oldState[i][j] && adyacentAlive === 3);
    };

    GameOfLife.prototype.draw = function() {
      this.lifeCell = 0;
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.drawGrid();

      for (var i = 0; i < this.columns; i++) {
        for (var j = 0; j < this.lines; j++) {
          if (this.useState[i][j]) {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(0,0,0,.15)';
            this.ctx.fillRect(i * this.unitSize, j * this.unitSize, this.unitSize, this.unitSize);
            this.ctx.closePath();
          }
        }
      }

      for (var i = 0; i < this.columns; i++) {
        for (var j = 0; j < this.lines; j++) {
          if (this.newState[i][j]) {
            this.lifeCell++;
            this.useState[i][j] = true;

            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(0,0,0,.5)';
            this.ctx.fillRect(i * this.unitSize, j * this.unitSize, this.unitSize, this.unitSize);
            this.ctx.closePath();
          }
        }
      }
    };

    GameOfLife.prototype.addUnit = function(x, y) {
      var i = Math.floor(x / this.unitSize);
      var j = Math.floor(y / this.unitSize);

      this.newState[i][j] = !this.newState[i][j];
      this.oldState[i][j] = !this.oldState[i][j];
    };

    GameOfLife.prototype.gg = function() {
      this.gameOn = !this.gameOn;
    };

    GameOfLife.prototype.start = function() {
      this.init();
      this.draw();

      setInterval(this.tick.bind(this), this.drawRate);
    };

    GameOfLife.prototype.tick = function() {
      if (this.gameOn) this.update();

      this.infoGeneration.innerHTML = this.getGeneration();
      this.infoLifeCell.innerHTML = this.getLifeCell();

      this.draw();
    };

    GameOfLife.prototype.getWorldSize = function() {
      return {
        w: this.width,
        h: this.height
      };
    };

    GameOfLife.prototype.getGeneration = function() {
      return this.counter;
    };

    GameOfLife.prototype.getLifeCell = function() {
      return this.lifeCell;
    };

    GameOfLife.prototype.drawGrid = function() {
      var hLines = this.height / this.unitSize / this.gridSize;
      var wLines = this.width / this.unitSize / this.gridSize;

      for (var i = 0; i < hLines; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, i * this.gridSize * this.unitSize - 0.5);
        this.ctx.lineTo(this.width, i * this.gridSize * this.unitSize - 0.5);

        if (i % 5) {
          this.ctx.strokeStyle = 'rgba(0,0,0,.1)';
        } else {
          this.ctx.strokeStyle = 'rgba(0,0,0,.3)';
        }

        this.ctx.stroke();
        this.ctx.closePath();
      }

      for (var i = 0; i < wLines; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(i * this.gridSize * this.unitSize - 0.5, 0);
        this.ctx.lineTo(i * this.gridSize * this.unitSize - 0.5, this.height);

        if (i % 5) {
          this.ctx.strokeStyle = 'rgba(0,0,0,.1)';
        } else {
          this.ctx.strokeStyle = 'rgba(0,0,0,.3)';
        }

        this.ctx.stroke();
        this.ctx.closePath();
      }
    };

    GameOfLife.prototype.reset = function() {
      this.init();
      this.gameOn = false;
      this.counter = 0;
      this.lifeCell = 0;
    };

    // Initialization for Game of Life
    var c = document.getElementById('game__world');
    var startButton = document.getElementById('game__panel-button-1');
    var resetWorld = document.getElementById('game__panel-button-2');
    var infoPanel = document.getElementsByClassName('game__info')[0];
    var infoGeneration = document.getElementById('info-generation');
    var infoLifeCell = document.getElementById('info-life-cell');
    var gameBox = document.getElementById('game');

    var gameOfLife = new GameOfLife({
      canvas: c,
      unitSize: 10,
      columns: 200,
      lines: 120,
      drawRate: 1000 / 10,
      gridSize: 3,
      infoPanel: infoPanel,
      infoGeneration: infoGeneration,
      infoLifeCell: infoLifeCell,
      gameBox: gameBox
    });

    gameOfLife.start();
    gameOfLife.randomDraft();
    gameOfLife.gg();

    c.addEventListener('click', function(e) {
      gameOfLife.addUnit(e.offsetX, e.offsetY);
    });

    startButton.addEventListener('click', unlockAudio);

    // Agregar eventos a los elementos con data-id
    document.querySelectorAll('a').forEach(element => {
      const id = element.getAttribute('id');
      element.addEventListener('mouseover', () => playAudio(element, 'hover'));
      element.addEventListener('mousedown', () => playAudio(element, 'click'));
      element.addEventListener('mouseup', () => playAudio(element, 'release'));
      element.addEventListener('focus', () => playAudio(element, 'focus'));
    });

    // Desbloquear el audio con un clic en cualquier parte del documento
    document.addEventListener('click', unlockAudio);

    // Reanudar el audio ambiental si ya estaba habilitado
    resumeAmbientAudio();
  });
