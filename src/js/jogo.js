var acertos = 0;
var perdidos = 0;
var errados = 0;
var intervalo = 5000;
var janela = 2000;

var timer = null;

onload = function(){
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('idGramado').addEventListener('mousedown', marteloBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', marteloCima);
    document.getElementById('buraco0').addEventListener('click', martelada)
    document.getElementById('buraco1').addEventListener('click', martelada)
    document.getElementById('buraco2').addEventListener('click', martelada)
    document.getElementById('buraco3').addEventListener('click', martelada)
    document.getElementById('buraco4').addEventListener('click', martelada)
}

function start(){
    var botao = document.getElementById('start');
    botao.removeEventListener('click', start)
    botao.disabled = true;
    sobeToupeira();
}

function sobeToupeira(){
    var buraco = Math.floor(Math.random() * 5);
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = '../../imagens/hole-mole.png';
    timer = setTimeout(tiraToupeira, intervalo);
    setTimeout(sobeToupeira, intervalo);
}

function tiraToupeira(buraco){
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = '../../imagens/hole.png';
    perdidos++;
    atualizarPontuacao();
}

function atualizarPontuacao() {
    mostraPontuacao('acertos', acertos);
    mostraPontuacao('perdidos', perdidos);
    mostraPontuacao('errados', errados);
    mostraPontuacao('saldo', Math.max(acertos - perdidos - errados, 0));
}

function mostraPontuacao(display, valor) {
    //pega a imagem
    let objCentena = document.getElementById(display).firstChild;
    let objDezena = objCentena.nextSibling;
    let objUnidade = objDezena.nextSibling;

    //calcula o valor de cada algarismo
    let centena = parseInt(valor / 100);
    let dezena = parseInt((valor/10) % 10);
    let unidade = valor % 10;

    //muda a imagem e o valor do atributo para o ledor de tela
    objCentena.src = '../../imagens/caractere_' + centena + '.gif';
    objCentena.alt = centena;
    objDezena.src = '../../imagens/caractere_' + dezena + '.gif';
    objDezena.alt = dezena;
    objUnidade.src = '../../imagens/caractere_' + unidade + '.gif';
    objUnidade.alt = unidade;
}

function marteloBaixo(){
    document.getElementById('idGramado').style.cursor = 'url(../../imagens/hammer-down.png), default';
}

function marteloCima(){
    document.getElementById('idGramado').style.cursor = 'url(../../imagens/hammer.png), default';
}

function martelada(evento){
    if (evento.target.src.includes('hole-mole')){
        acertos++
        evento.target.src = '../../imagens/hole.png';
        clearTimeout(timer);
    }
    else{
        errados++;
    }
    atualizarPontuacao();
}

