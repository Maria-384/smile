// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  // Mostra o botão jogar novamente alterando a classe CSS (className)
  btnJogarNovamente.className = 'visivel';
  // Oculta o botão reiniciar alterando a classe CSS (className)
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true; // Variável jogar volta a ser verdadeira
  // Armazenamos todas as div na variável divis (getElementsByTagName)
  let divis = document.getElementsByTagName("div");
  // Percorremos todas as divs armazenadas
  for (let i = 0; i < divis.length; i++) {
    // Verificamos se são as divs com ids 0, 1, 2 ou 3
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
      // Alteramos a classe CSS das divs 0, 1, 2 e 3 (className)
      divis[i].className = "inicial";
    }
  }

  // Armazenamos a imagem do Smile na variável imagem (getElementById)
  let imagem = document.getElementById("imagem");
  // Se a imagem não for vazia (se ela existir)
  if (imagem != null) {
    // Removemos a imagem do Smile
    imagem.remove();
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  // Calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  // Escreve o placar com os valores atualizados (innerHTML)
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// Função executada quando o jogador acertou
function acertou(obj) {
  // Altera a classe CSS da <div> escolhida pelo jogador (className)
  obj.className = "acertou";
  // Criar uma constante img que armazena um novo objeto imagem com largura de 100px
  const img = new Image(100);
  img.id = "imagem";
  // Altera o atributo src (source) da imagem criada
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  // Adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
  obj.appendChild(img);
}

// Função que sorteia um número aleatório entre 0 e 3 e verifica se o jogador acertou
function verifica(obj) {
  // Se jogar é verdadeiro
  if (jogar) {
    // Jogar passa a ser falso
    jogar = false;
    // Incrementa as tentativas
    tentativas++;
    // Verifica se jogou 4 vezes
    if (tentativas == 4) {
      // Oculta o botão jogar novamente alterando a classe CSS (getElementById e className)
      btnJogarNovamente.className = 'invisivel';
      // Mostra o botão reiniciar alterando a classe CSS (getElementById e className)
      btnReiniciar.className = 'visivel';
    }
    // A variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
    let sorteado = Math.floor(Math.random() * 4); // Agora sorteia entre 0 e 3
    // Se o id da <div> escolhida pelo jogador for igual ao número sorteado
    if (obj.id == sorteado) {
      // Chama a função acertou passando a div escolhida pelo jogador
      acertou(obj);
      // Incrementa o contador de acertos
      acertos++;
    } else { // Se errou a tentativa
      // Altera a classe da <div> escolhida pelo jogador para a classe errou
      obj.className = "errou";
      // Armazena a div aonde Smile está escondido (getElementById)
      const objSorteado = document.getElementById(sorteado);
      // Chama a função acertou para mostrar a div aonde está o Smile
      acertou(objSorteado);
    }
    // Chama a função que atualiza o placar
    atualizaPlacar(acertos, tentativas);
  } else { // Se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
