// ==UserScript==
// @name         Farm de Pontos
// @namespace    TribalWars
// @copyright    Foxkrak 2023
// @version      0.1
// @description  Um script com visual para farm de pontos que pode controlar a taxa maximo que podem ser vendidos os recursos!
// @author       Foxkrak
// @include      https://br*.tribalwars.com.br/game.php?village=*&screen=market&mode=exchange
// @updateURL    https://github.com/foxkrak/foxkrakScripts/raw/main/pp.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tribalwars.com.br
// @grant        none
// ==/UserScript==

//################ Variaveis ################

//Vende recursos por pontos premiun
var altAldTempo = aleatorio(10000, 100000);
var qtdDisponivelTransporte;

//recursos disponiveis na aldeia
var qtdMadeiraAldeia;
var qtdArgilaAldeia;
var qtdFerroAldeia;

//capacidade maxima de cada recurso
var capacidadeMadeira;
var capacidadeArgila;
var capacidadeFerro;

//quantidade estocada de cada recurso
var estoqueMandeira;
var estoqueArgila;
var estoqueFerro;

//campos para serem preenchidos
var inputVenderMadeira;
var inputVenderArgila;
var inputVenderFerro;

//LocalStorage var
var premiumpp;
var play;
var btn;
var entrada;
var Go;
var taxasalva;
var htm;


//###########################################
premiumpp = JSON.parse(localStorage.getItem('PP'));
play = JSON.parse(localStorage.getItem('Play'));
taxasalva = JSON.parse(localStorage.getItem('inputV'));
if(play === true){
    btn = 'Parar';
}else{
    btn = 'Iniciar';
}
if(document.querySelector('#market_status_bar').querySelectorAll('th')[2] === null || document.querySelector('#market_status_bar').querySelectorAll('th')[2] === undefined){
    entrada = 0;
}else{
   entrada = parseInt(document.querySelector('#market_status_bar').querySelectorAll('th')[2].innerText.replace('Entrada: ',''));
}
//################# HTML ####################

function html(){
    let html = `<td class="opcoestd content-border border-frame-gold-red" style="margin-top: 200px; position: absolute;">
      <table class="vis">
            <tbody><tr class="border-frame-gold-red">
              <td style="text-align: center; padding-top: 5px; padding-bottom: 2px; width: 290px" class="avisos" colspan="6"><h3>[Auto Pp]</h3></td>
            </tr>
            <tr>
              <td style="text-align: center; width: 5px;"><span class="icon header premium" title="Pontos entrando."></span></td>
              <td class="resultado" style="text-align: center"><h5>${entrada}</h5></td>
              <td style="text-align: center; width: 5px;"><span class="icon header premium" title="Pontos ganhos até agora."></span></td>
              <td class="totalD" style="text-align: center"><h5>${parseInt(document.querySelector('#premium_points').innerText) - premiumpp}</h5></td>
            </tr>
            <tr>
            <td title="Valor maximo em que os recursos podem ser vendidos." colspan="2" style="text-align: center; width: 50px;">Taxa: </td>
            <td title="" colspan="2" style="text-align: center; width: 5px;"><input class="inputC" style="width: 50px;" value="${taxasalva}"></input></td>
            </tr>
            <tr>
              <td colspan="6" style="text-align: center; padding: 10px; width: 270px"><label class="StatusLab"><h5>PARADO</h5></label></td>
            </tr>
            <tr>
              <td colspan="6" style="text-align: center; padding-bottom: 5px"><label class="statusLab">...</label></td>
            </tr>
            <tr>
              <td style="text-align: center; padding: 10px;" colspan="6">
    <button class="playBtn btn" style="margin-right: 10px;">${btn}</button>
    <button class="zerarBtn btn" style="margin-right: 10px;">Zerar</button>
    <button class="salvarBtn btn">Salvar</button>
</td>
            </tr>
          </tbody></table>
        </td>`
    return html;
}
document.querySelector('.shadedBG').appendChild(createEle('td',undefined,'opcoestd content-border border-frame-gold-red'))
document.querySelector('.opcoestd').innerHTML = html();
document.querySelector('.opcoestd').style.cssText = 'margin-top: 200px;'+'position: absolute;'

//###########################################

if(premiumpp === null || premiumpp === undefined){
    let stringJSONpp = JSON.stringify(parseInt(document.querySelector('#premium_points').innerText));
    localStorage.setItem('PP', stringJSONpp);
}

if(play === null || play === undefined){
    let stringJSONip = JSON.stringify(false);
    localStorage.setItem('Play', stringJSONip);
    play = JSON.parse(localStorage.getItem('Play'))
    document.querySelector('.StatusLab').querySelector('h5').innerText = "PARADO";
    document.querySelector('.StatusLab').style.cssText += 'color: red;'
}
if(play === true){
    document.querySelector('.StatusLab').querySelector('h5').innerText = "RODANDO";
    document.querySelector('.StatusLab').style.cssText += 'color: green;'
    start();
}else{
    document.querySelector('.StatusLab').querySelector('h5').innerText = "PARADO";
    document.querySelector('.StatusLab').style.cssText += 'color: red;'
    clearInterval(Go);
}
//################# Clicks ##################

document.querySelector('.playBtn').addEventListener('click',function(){
    if(play === false){
        play = true;
        document.querySelector('.playBtn').innerText = 'Parar';
        let plays = JSON.stringify(play);
        localStorage.setItem('Play', plays);
        document.querySelector('.StatusLab').querySelector('h5').innerText = "RODANDO";
        document.querySelector('.StatusLab').style.cssText += 'color: green;'
        start();
    }else{
        play = false;
        document.querySelector('.playBtn').innerText = 'Iniciar';
        let plays = JSON.stringify(play);
        localStorage.setItem('Play', plays);
        document.querySelector('.StatusLab').querySelector('h5').innerText = "PARADO";
        document.querySelector('.StatusLab').style.cssText += 'color: red;'
        document.querySelector('.statusLab').innerText = '...';
        clearInterval(Go);
        clearInterval(htm);
    }

})

document.querySelector('.salvarBtn').addEventListener('click',function(){
    if(parseInt(document.querySelector('.inputC').value) !== 0){
        let stringJSONip = JSON.stringify(parseInt(document.querySelector('.inputC').value));
        localStorage.setItem('inputV', stringJSONip);
        document.querySelector('.statusLab').innerText = 'Salvo.';
    }else{
        document.querySelector('.statusLab').innerText = `Taxa igual a 0.`;
        return;
    }

})

document.querySelector('.zerarBtn').addEventListener('click',function(){
    let stringJSONpp = JSON.stringify(parseInt(document.querySelector('#premium_points').innerText));
    localStorage.setItem('PP', stringJSONpp);
})

//################# Funções #################

function createEle(ele,texto = '',clas){
    let EleCriado = document.createElement(ele);
    EleCriado.innerText = texto;
    if(clas !== undefined) EleCriado.classList = clas;
    return EleCriado;
}
html()

//INICIO----

function start(){
    Go = setInterval(function(){go()},10000)
    htm = setInterval(()=>{html()},500)
}

function go(){

    qtdDisponivelTransporte = $("#market_merchant_max_transport").text();

    capacidadeMadeira = $("#premium_exchange_capacity_wood").text();
    capacidadeArgila = $("#premium_exchange_capacity_stone").text();
    capacidadeFerro = $("#premium_exchange_capacity_iron").text();

    estoqueMandeira = $("#premium_exchange_stock_wood").text();
    estoqueArgila = $("#premium_exchange_stock_stone").text();
    estoqueFerro = $("#premium_exchange_stock_iron").text();

    inputVenderMadeira = $("input[name='sell_wood']");
    inputVenderArgila = $("input[name='sell_stone']");
    inputVenderFerro = $("input[name='sell_iron']");

    qtdMadeiraAldeia = $("#wood").text();
    qtdArgilaAldeia = $("#stone").text();
    qtdFerroAldeia = $("#iron").text();

    var custoMadeira = calcularCusto("wood");
    var custoArgila = calcularCusto("stone");
    var custoFerro = calcularCusto("iron");


    var qtdTotalRecursos;
    var qtdVenderMadeira = calcularQuantidadeVender(capacidadeMadeira, estoqueMandeira, qtdMadeiraAldeia, custoMadeira);
    var qtdVenderArgila = calcularQuantidadeVender(capacidadeArgila, estoqueArgila, qtdArgilaAldeia, custoArgila);
    var qtdVenderFerro = calcularQuantidadeVender(capacidadeFerro, estoqueFerro, qtdFerroAldeia, custoFerro);


    if (qtdVenderMadeira > qtdDisponivelTransporte) {
        qtdVenderMadeira = qtdDisponivelTransporte - 1000;
    }
    if (qtdVenderArgila > qtdDisponivelTransporte) {
        qtdVenderMadeira = qtdDisponivelTransporte - 1000;
    }
    if (qtdVenderFerro > qtdDisponivelTransporte) {
        qtdVenderMadeira = qtdDisponivelTransporte - 1000;
    }

    var algoPraVender = false;
    taxasalva = JSON.parse(localStorage.getItem('inputV'));
    if(taxasalva === 0 || taxasalva === null || taxasalva === undefined || taxasalva === NaN){
        taxasalva = Math.max(custoFerro,custoMadeira,custoArgila);
        let stringJSONip = JSON.stringify(parseInt(taxasalva));
        localStorage.setItem('inputV', stringJSONip);
        document.querySelector('.inputC').value = taxasalva;
    }else{
        document.querySelector('.inputC').value = taxasalva;
    }

    if (qtdVenderFerro > 0 && qtdVenderFerro <= qtdDisponivelTransporte && custoFerro <= taxasalva) {
        inputVenderFerro.val(qtdVenderFerro);
        algoPraVender = true;
    } else if (qtdVenderArgila > 0 && qtdVenderArgila <= qtdDisponivelTransporte && custoArgila <= taxasalva) {
        inputVenderArgila.val(qtdVenderArgila);
        algoPraVender = true;
    } else if (qtdVenderMadeira > 0 && qtdVenderMadeira <= qtdDisponivelTransporte && custoMadeira <= taxasalva) {
        inputVenderMadeira.val(qtdVenderMadeira);
        algoPraVender = true;
    } else {
        //console.log("Nada para vender hoje");
        document.querySelector('.statusLab').innerText = "Nada para vender hoje.";
    }

    if (algoPraVender) {
        setTimeout(calcularMelhorOferta, 2000);
    }
    //MODIFICAR SISTEMA..
    setInterval(altAldeia, altAldTempo);
};

function calcularMelhorOferta() {
    $(".btn-premium-exchange-buy").click();

    setTimeout(confirmarVenda, 1000);
}

function confirmarVenda() {
    $(".btn-confirm-yes").click();
}

function calcularQuantidadeVender(capacidade, estoque, qtdDisponivel, custo) {
    var quantidadeVender = 0;
    var capacidadeDisponivel = capacidade - estoque;
    if (capacidadeDisponivel > 0) {
        if (qtdDisponivel >= custo) {
            if(capacidadeDisponivel >= custo){
                quantidadeVender = (Math.ceil(qtdDisponivel / custo) - 1)*custo;
            }else{
                quantidadeVender = capacidadeDisponivel
            }
        }
    }

    return quantidadeVender;
}

function calcularCusto(tipoRecurso) {
    var capacidade = PremiumExchange.data.capacity[tipoRecurso];
    var stock = PremiumExchange.data.stock[tipoRecurso];

    var fator = (PremiumExchange.data.tax.buy, PremiumExchange.calculateMarginalPrice(stock, capacidade));
    var resultado = Math.floor(1 / fator);

    return resultado;
}

function altAldeia() {
    //$('.arrowRight').click();
    //$('.groupRight').click();
    //location.reload(true);
}

function aleatorio(superior, inferior) {
    var numPosibilidades = superior - inferior;
    var aleat = Math.random() * numPosibilidades;
    return Math.round(parseInt(inferior) + aleat);
}

//###########################################
