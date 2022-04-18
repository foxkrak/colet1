//################ Variaveis ################

let wood;
let stone;
let iron;
let mercadores;
let recursoTotal;
let quantidade;
let resultado = 0;
let woodx;
let stonex;
let ironx;
let premiumpp;
let inputx;
let taxa;
let acima;
let play;
let btn;
let entrada;

//###########################################
premiumpp = JSON.parse(localStorage.getItem('PP'));
play = JSON.parse(localStorage.getItem('Play'));
if(play === true){
    btn = 'Parar';
    start();
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
            <td title="Valor maximo em que os recursos podem ser vendidos." style="text-align: center;">Taxa: </td>
            <td title="" style="text-align: center; width: 5px;"><input class="inputC" style="width: 50px;"></input></td>
            <td title="Esperar até que os recursos cheguem no valor de Taxa + Valor indicado." style="text-align: center;">Recurso: </td>
            <td title="" style="text-align: center; width: 5px;"><input class="inputD" style="width: 50px;"></input></td>
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

inputx = JSON.parse(localStorage.getItem('inputV'));

if(inputx === null || inputx === undefined){
    let stringJSONip = JSON.stringify(600);
    localStorage.setItem('inputV', stringJSONip);
    inputx = JSON.parse(localStorage.getItem('inputV'))
    document.querySelector('.inputC').value = inputx;
    taxa = inputx;
}else{
    document.querySelector('.inputC').value = inputx;
    taxa = inputx;
}

acima = JSON.parse(localStorage.getItem('Acima'));

if(acima === null || acima === undefined){
    let stringJSONip = JSON.stringify(900);
    localStorage.setItem('Acima', stringJSONip);
    acima = JSON.parse(localStorage.getItem('Acima'))
    document.querySelector('.inputD').value = acima;
}else{
    document.querySelector('.inputD').value = acima;
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
}else{
    document.querySelector('.StatusLab').querySelector('h5').innerText = "PARADO";
    document.querySelector('.StatusLab').style.cssText += 'color: red;'
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
    }

})

document.querySelector('.salvarBtn').addEventListener('click',function(){
    if(parseInt(document.querySelector('.inputC').value) !== 0 && parseInt(document.querySelector('.inputC').value) > Math.max(wood,stone,iron)){
        let stringJSONip = JSON.stringify(parseInt(document.querySelector('.inputC').value));
        localStorage.setItem('inputV', stringJSONip);
        document.querySelector('.statusLab').innerText = 'Salvo.';
    }else{
        document.querySelector('.statusLab').innerText = `Taxa igual a 0 ou menor que ${Math.max(wood,stone,iron)}.`;
        return;
    }
    if(parseInt(document.querySelector('.inputD').value) !== 0 && parseInt(document.querySelector('.inputD').value) > Math.max(wood,stone,iron)){
        let stringJSONip = JSON.stringify(parseInt(document.querySelector('.inputD').value));
        localStorage.setItem('Acima', stringJSONip);
        document.querySelector('.statusLab').innerText = 'Salvo.';
    }else{
        document.querySelector('.statusLab').innerText = `Recurso igual a 0 ou menor que ${Math.max(wood,stone,iron)}.`;
    }

})

document.querySelector('.zerarBtn').addEventListener('click',function(){
    let stringJSONpp = JSON.stringify(parseInt(document.querySelector('#premium_points').innerText));
    localStorage.setItem('PP', stringJSONpp);
})

//################# Funções #################

function delayS(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

async function prosseguir(valor,ide){
    document.querySelectorAll('.premium-exchange-input')[ide].value = valor;
    document.querySelector('.resultado').querySelector('h5').innerHTML = `${valor}`;
    document.querySelector('.btn-premium-exchange-buy').click();
    await delayS(500)
    document.querySelector('.btn-confirm-yes').click();
    return;
}

function createEle(ele,texto = '',clas){
    let EleCriado = document.createElement(ele);
    EleCriado.innerText = texto;
    if(clas !== undefined) EleCriado.classList = clas;
    return EleCriado;
}

//###########################################
//################# Loopins #################

setInterval(function(){
    wood = parseInt(document.querySelector('#premium_exchange_rate_wood').querySelector('div').innerText)
    stone = parseInt(document.querySelector('#premium_exchange_rate_stone').querySelector('div').innerText)
    iron = parseInt(document.querySelector('#premium_exchange_rate_iron').querySelector('div').innerText)
    mercadores = parseInt(document.querySelector('#market_merchant_available_count').innerText);
    woodx = parseInt(document.querySelector('#wood').innerText);
    stonex = parseInt(document.querySelector('#stone').innerText);
    ironx = parseInt(document.querySelector('#iron').innerText);
    premiumpp = JSON.parse(localStorage.getItem('PP'));
    if(taxa < Math.max(wood,stone,iron)){document.querySelector('.statusLab').innerText = 'Aguardando taxa descer abaixo do valor indicado.';}
    if(document.querySelector('#market_status_bar').querySelectorAll('th')[2] === null || document.querySelector('#market_status_bar').querySelectorAll('th')[2] === undefined){
        entrada = 0;
    }else{document.querySelector('.resultado').querySelector('h5').innerText = `${parseInt(document.querySelector('#market_status_bar').querySelectorAll('th')[2].innerText.replace('Entrada: ',''))}`}
    document.querySelector('.totalD').querySelector('h5').innerText = `${parseInt(document.querySelector('#premium_points').innerText) - premiumpp}`
},1000)

async function start(){
    while(play){
        if(parseInt(document.querySelector('#market_merchant_available_count').innerText) === 0){document.querySelector('.statusLab').innerText = 'Aguardando mercadores ficarem disponiveis.';}
        if(woodx < wood+acima){document.querySelector('.statusLab').innerText = 'Aguardando recursos suficientes.';}
        if(woodx >= stonex && woodx >= ironx){
            if(wood <= taxa && woodx > wood+acima && parseInt(document.querySelector('#market_merchant_available_count').innerText) > 0){
                recursoTotal = mercadores * 1000;
                quantidade = Math.floor((recursoTotal / wood));
                resultado = wood * quantidade;
                if(parseInt(document.querySelector('#wood').innerText)< parseInt(document.querySelector('#market_merchant_available_count').innerText) * 1000){
                    quantidade = parseInt(document.querySelector('#wood').innerText) / wood;
                    if(quantidade-0.5 > parseInt(quantidade)){
                        resultado = wood * parseInt(quantidade);
                        document.querySelector('.statusLab').innerText = 'Vendendo Madeira.';
                        await prosseguir(resultado,3);
                    }else{
                        resultado = wood * (parseInt(quantidade)-1);
                        document.querySelector('.statusLab').innerText = 'Vendendo Madeira.';
                        await prosseguir(resultado,3);
                    }
                }else{
                    document.querySelector('.statusLab').innerText = 'Vendendo Madeira.';
                    await prosseguir(resultado,3);
                }
            }
        }else if(stonex >= woodx && stonex >= ironx){
            if(stone <= taxa && stonex > stone+acima && parseInt(document.querySelector('#market_merchant_available_count').innerText) > 0){
                recursoTotal = mercadores * 1000;
                quantidade = Math.floor((recursoTotal / stone));
                resultado = stone * quantidade;
                if(parseInt(document.querySelector('#stone').innerText)< parseInt(document.querySelector('#market_merchant_available_count').innerText) * 1000){
                    quantidade = parseInt(document.querySelector('#stone').innerText) / stone;
                    if(quantidade-0.5 > parseInt(quantidade)){
                        resultado = stone * parseInt(quantidade);
                        document.querySelector('.statusLab').innerText = 'Vendendo Argila.';
                        await prosseguir(resultado,4);
                    }else{
                        resultado = stone * (parseInt(quantidade)-1);
                        document.querySelector('.statusLab').innerText = 'Vendendo Argila.';
                        await prosseguir(resultado,4);
                    }
                }else{
                    document.querySelector('.statusLab').innerText = 'Vendendo Argila.';
                    await prosseguir(resultado,4);
                }
            }
        }else{
            if(iron <= taxa && ironx > iron+acima && parseInt(document.querySelector('#market_merchant_available_count').innerText) > 0){
                recursoTotal = mercadores * 1000;
                quantidade = Math.floor((recursoTotal / iron));
                resultado = iron * quantidade;
                if(parseInt(document.querySelector('#iron').innerText)< parseInt(document.querySelector('#market_merchant_available_count').innerText) * 1000){
                    quantidade = parseInt(document.querySelector('#iron').innerText) / iron;
                    if(quantidade-0.5 > parseInt(quantidade)){
                        resultado = iron * parseInt(quantidade);
                        document.querySelector('.statusLab').innerText = 'Vendendo Ferro.';
                        await prosseguir(resultado,5);
                    }else{
                        resultado = iron * (parseInt(quantidade)-1);
                        document.querySelector('.statusLab').innerText = 'Vendendo Ferro.';
                        await prosseguir(resultado,5);
                    }
                }else{
                    document.querySelector('.statusLab').innerText = 'Vendendo Ferro.';
                    await prosseguir(resultado,5);
                }
            }
        }
        await delayS(5000)
    }
}
//###########################################
