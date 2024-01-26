const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let fireInterval;
const fire = {
  fps: 24,
  width: 50,
  height: 50,
  intensity: 3,
  intensityPallet: [
    "7,7,7",
    "31,7,7",
    "47,15,7",
    "71,15,7",
    "87,23,7",
    "103,31,7",
    "119,31,7",
    "143,39,7",
    "159,47,7",
    "175,63,7",
    "191,71,7",
    "199,71,7",
    "223,79,7",
    "223,87,7",
    "223,87,7",
    "215,95,7",
    "215,95,7",
    "215,103,15",
    "207,111,15",
    "207,119,15",
    "207,127,15",
    "207,135,23",
    "199,135,23",
    "199,143,23",
    "199,151,31",
    "191,159,31",
    "191,159,31",
    "191,167,39",
    "191,167,39",
    "191,175,47",
    "183,175,47",
    "183,183,47",
    "183,183,55",
    "207,207,111",
    "223,223,159",
    "239,239,199",
    "255,255,255",
  ],
};

// Renderiza o fogo
function renderFire() {
  const createCell = (intensity, columnIndex, cellIndex) => {
    const pixelWidth = canvas.width / fire.width;
    const pixelHeight = canvas.height / fire.height;

    context.fillStyle = `rgb(${
      fire.intensityPallet[intensity >= 0 ? intensity : 0]
    })`;

    context.fillRect(
      columnIndex * pixelWidth,
      cellIndex * pixelHeight,
      pixelWidth,
      pixelHeight
    );
  };

  firePixels.columns.forEach((column, columnIndex) => {
    column.forEach((intensity, cellIndex) =>
      createCell(intensity, columnIndex, cellIndex)
    );
  });
}

// Propagação do fogo
function firePropagation() {
  const newFirePixels = firePixels.columns.map((column) => {
    return column.map((currentCell, index) => {
      if (index >= fire.height) return;

      const decay = Math.floor(Math.random() * fire.intensity);
      //Celula baixo da atual
      const belowCell = column[index + 1];

      // Evita a celula receber valor negativo e verificação caso a célula abaixo não exista
      currentCell =
        currentCell >= 0
          ? (belowCell !== undefined ? belowCell : 36 + decay) - decay
          : 0;

      return currentCell;
    });
  });

  firePixels.columns = newFirePixels;
}

// Inicializa a fonte de fogo
function createFireSource() {
  // Adiciona intensidade maxima 36 para todos os ultimos pixels da coluna
  firePixels.columns.map((cell) => (cell[fire.width - 1] = 36));
}

// Cria a estrutura de dados, linhas e colunas
function createFireStructure() {
  // Cria colunas e dentro suas células
  firePixels = {
    columns: Array(fire.height)
      .fill(0)
      .map(() => Array(fire.width).fill(0)),
  };

  createFireSource();
}

function start() {
  createFireStructure();

  setInterval(() => {
    firePropagation();
    renderFire();
  }, 1000 / fire.fps);
}

start();
