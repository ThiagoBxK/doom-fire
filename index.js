const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let firePixels = [];
const fireWidth = 50; // Colunas
const fireHeight = 50; // Linhas
const fireFPS = 24;
let fireIntensity = 3;
const firePallet = ['7,7,7', '31,7,7', '47,15,7', '71,15,7', '87,23,7', '103,31,7', '119,31,7', '143,39,7', '159,47,7', '175,63,7', '191,71,7', '199,71,7', '223,79,7', '223,87,7', '223,87,7', '215,95,7', '215,95,7', '215,103,15', '207,111,15', '207,119,15', '207,127,15', '207,135,23', '199,135,23', '199,143,23', '199,151,31', '191,159,31', '191,159,31', '191,167,39', '191,167,39', '191,175,47', '183,175,47', '183,183,47', '183,183,55', '207,207,111', '223,223,159', '239,239,199', '255,255,255'];

// Renderiza o fogo na tela usando as informações da estrutura de dados
function renderFire() {
  const pixelWidth = canvas.width / fireWidth;
  const pixelHeight = canvas.height / fireHeight;
  
  const createCell = (columnIndex, rowIndex, cellIndex) => {
    context.fillStyle = `rgb(${firePallet[firePixels[cellIndex]]})`;
    context.fillRect(
      columnIndex * pixelWidth, rowIndex * pixelHeight, 
      pixelWidth, pixelHeight
    );
    
    // Index
    /*
    context.fillStyle = 'black';
    context.font = '12px Arial';
    context.fillText(cellIndex, 19 + (columnIndex * pixelWidth), 25 + (rowIndex * pixelWidth));
    
    //Intensidade do fogo
    context.fillStyle = 'green';
    context.font = '10px Arial';
    context.fillText(firePixels[cellIndex], 35 + (columnIndex * pixelWidth), 25 + (rowIndex * pixelWidth));*/
  }

  // Passa por todas as colunas e linhas
  Array.from({ length: fireWidth }, (_, columnIndex) => {
    Array.from({ length: fireHeight }, (_, rowIndex) => {
      const cellIndex = rowIndex + (columnIndex * fireWidth);
      
      createCell(columnIndex, rowIndex, cellIndex);
    });
  });
}

// Mudar a intensidade do pixel de cima
function updateFireIntensity(currentPixel) {
  const belowPixelIndex = currentPixel + 1;

  const decay = Math.floor(Math.random() * fireIntensity);
  const belowPixelIntensity = firePixels[belowPixelIndex];
  
  const newInensity = belowPixelIntensity - decay >= 0 ? belowPixelIntensity - decay : 0;
  
  firePixels[currentPixel] = newInensity;
}

// Estrutura de dados para representar o fogo
function createFireStructure() {
  firePixels = Array(fireWidth * fireHeight).fill(0);
}

// Propagação do foog para o pixel de cima
function firePropagation() {
  Array.from({ length: fireWidth - 1 }, (_, columnIndex) => {
    Array.from({ length: fireHeight }, (_, rowIndex) => {
      const pixelIndex = columnIndex + (fireWidth * rowIndex);

      updateFireIntensity(pixelIndex);
    });
  });
}

// Inicializa a fonte de fogo e configurações iniciais
function createFireSource() {
  Array.from({ length: fireWidth }, (_, columnIndex) => {
    Array.from({ length: fireHeight }, (_, rowIndex) => {
      // Pega o ultimo de cada coluna
      const sourceIndex = fireHeight + (columnIndex * fireHeight) - 1;
      
      // 36 intensidade máxima 
      firePixels[sourceIndex] = 36;
    });
  });
}

function start() {
  createFireStructure();
  createFireSource();

  setInterval(() => {
    firePropagation();
    renderFire();
  }, 1000 / fireFPS)
}

start();