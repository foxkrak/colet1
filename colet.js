let teste = true;
let hora;
let intervalo = true;
let RecursosColetados;
let timerRodando;
let format2;
var total = 0;
let ss = 0;
let confbtn = false;

ss = JSON.parse(localStorage.getItem('TimerRodando'))
total = JSON.parse(localStorage.getItem('TotalRecursoColetado'));
format2 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(total));
let totalDiv3 = Math.round(total / 3);
let format3 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(totalDiv3));
document.querySelector('#content_value').querySelector('h2').style.cssText = 'text-align: center'
document.querySelector('#content_value').querySelector('img').style.display = 'none'
document.querySelector('#content_value').querySelector('td').style.display = 'none'
$('#content_value').find('h2').html('[Auto Coleta] Criado por Foxkrak</br></br>Tempo:' + ' ' + timer1(ss) + '⁣⁣      ' + 'Total de Recurso Coletado: ' + format2 + '</br></br>' + 'Madeira: ' + format3 + '&nbsp;&nbsp;&nbsp;Argila: ' + format3+ '&nbsp;&nbsp;&nbsp;Ferro: ' + format3)

function resetar(){
    total = JSON.parse(localStorage.getItem('TotalRecursoColetado'));
}

twcheese1();
function twcheese1(){
    javascript: (window.TwCheese && TwCheese.tryUseTool('ASS')) || $.ajax('https://cheesasaurus.github.io/twcheese/launch/ASS.js?' +~~((new Date())/3e5),{cache:1,dataType:"script"});void 0;
    setTimeout(function(){document.querySelector('#content_value').querySelector('span').style.cssText = 'display: none;'},400)

}

function timer1(segundos){
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', { hour12: false, timeZone: 'UTC' })
}
function inicarTimer(){
    hora = setInterval(function(){
        ss++
        timerRodando = JSON.stringify(ss);
        localStorage.setItem('TimerRodando', timerRodando);
    },1000)
}

//*************************** CRIANDO OS ELEMENTOS CONFIGURANDO E DANDO FUNÇÃO ***************************//

td.classList = 'opcoestd';
document.querySelector('.shadedBG').appendChild(createEle('td',undefined,'opcoestd'))
document.querySelector('.opcoestd').appendChild(createEle('tr'))
document.querySelector('.opcoestd').children[0].appendChild(createEle('td'))
document.querySelector('.opcoestd').children[0].children[0].appendChild(createEle('label','PARADO','StatusLab'))
document.querySelector('.opcoestd').appendChild(createEle('tr'))
document.querySelector('.opcoestd').children[1].appendChild(createEle('td'))
document.querySelector('.opcoestd').children[1].children[0].appendChild(createEle('button','Iniciar','iniciarBtn'))
document.querySelector('.opcoestd').children[1].children[0].appendChild(createEle('button','Pausar','pausarBtn'))
document.querySelector('.opcoestd').children[1].children[0].appendChild(createEle('button','Zerar','zerarBtn'))
document.querySelector('.opcoestd').children[1].children[0].appendChild(createEle('button','NaN','confBtn'))

//*************************** Stilizando ***************************//

document.querySelector('.StatusLab').style.cssText = 'margin: 35%;' + 'font-weight: bold;'
document.querySelector('.pausarBtn').style.cssText = 'margin: 2px;'
document.querySelector('.iniciarBtn').style.cssText = 'margin: 2px;'
document.querySelector('.zerarBtn').style.cssText = 'margin: 2px;'
document.querySelector('.confBtn').style.cssText = 'margin: 2px;'
document.querySelector('.opcoestd').children[0].children[0].colSpan = '2';
document.querySelector('.opcoestd').children[0].children[0].style.cssText = 'padding-top: 18px;' + 'padding-bottom: 10px;'
document.querySelector('.opcoestd').style.cssText = 'padding-top: 200px;'+'position: absolute;'
document.querySelector('.opcoestd').children[0].style.cssText = 'background-color: white;'
document.querySelector('.opcoestd').children[1].style.cssText = 'background-color: white;'

function createEle(ele,texto = '',clas){
    let EleCriado = document.createElement(ele);
    EleCriado.innerText = texto;
    if(clas !== undefined) EleCriado.classList = clas;
    return EleCriado;
}

document.querySelector('.iniciarBtn').addEventListener('click',function(){
    let stringJSON = JSON.stringify(1);
    localStorage.setItem('AutoColeta', stringJSON);
    if(teste){
        verifica();
    }
})
document.querySelector('.pausarBtn').addEventListener('click',function(){
    let stringJSON = JSON.stringify(0);
    localStorage.setItem('AutoColeta', stringJSON);
    verifica();
    teste = true;
})
document.querySelector('.zerarBtn').addEventListener('click',function(){
    RecursosColetados = JSON.stringify(0);
    localStorage.setItem('TotalRecursoColetado', RecursosColetados);
    ss = 0;
    timerRodando = JSON.stringify(ss);
    localStorage.setItem('TimerRodando', timerRodando);
    document.querySelector('.StatusLab').innerText = 'ZERADO';
    document.querySelector('.StatusLab').style.cssText += 'color: red;'
    resetar();
    format2 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(total));
    $('#content_value').find('h2').html('[Auto Coleta] Criado por Foxkrak</br></br>Tempo:' + ' ' + timer1(ss) + '⁣⁣      ' + 'Total de Recurso Coletado: ' + format2 + '</br></br>' + 'Madeira: ' + format3 + '&nbsp;&nbsp;&nbsp;Argila: ' + format3+ '&nbsp;&nbsp;&nbsp;Ferro: ' + format3)
})
document.querySelector('.confBtn').addEventListener('click',function(){
    verificaconfbtn();
})
let status = JSON.parse(localStorage.getItem('Status'))
if(status === 1){
    document.querySelector('.confBtn').innerText = 'Ligado';
    let stringJSON = JSON.stringify({"props":{"ASS":{"troopsAssigner":{"mode":"addict","allowedOptionIds":[1,2,3,4],"targetDurationSeconds":7200,"troops":{"spear":{"maySend":true,"reserved":0},"sword":{"maySend":true,"reserved":0},"axe":{"maySend":true,"reserved":0},"archer":{"maySend":true,"reserved":0},"light":{"maySend":true,"reserved":0},"marcher":{"maySend":true,"reserved":0},"heavy":{"maySend":true,"reserved":0},"knight":{"maySend":true,"reserved":0}},"troopOrder":[["axe","light","marcher"],["spear","sword","archer"],["heavy"],["knight"]]}}}});
    localStorage.setItem('twcheese.userConfig', stringJSON)
    document.querySelector('.confBtn').title = 'Mesmo Tempo de coleta em todos';
    confbtn = true;
}else if(status === 0){
    document.querySelector('.confBtn').innerText = 'Desligado';
    let stringJSON = JSON.stringify({"props":{"ASS":{"troopsAssigner":{"mode":"sane_person","allowedOptionIds":[1,2,3,4],"targetDurationSeconds":7200,"troops":{"spear":{"maySend":true,"reserved":0},"sword":{"maySend":true,"reserved":0},"axe":{"maySend":true,"reserved":0},"archer":{"maySend":true,"reserved":0},"light":{"maySend":true,"reserved":0},"marcher":{"maySend":true,"reserved":0},"heavy":{"maySend":true,"reserved":0},"knight":{"maySend":true,"reserved":0}},"troopOrder":[["axe","light","marcher"],["spear","sword","archer"],["heavy"],["knight"]]}}}});
    localStorage.setItem('twcheese.userConfig', stringJSON)
    document.querySelector('.confBtn').title = 'Coletar o Maximo possivel na melhor coleta';
    confbtn = false;
}

function verificaconfbtn(){
    let status = JSON.parse(localStorage.getItem('Status'))
    if(status === null || status === undefined){
        let stringJSON = JSON.stringify(1);
        localStorage.setItem('Status', stringJSON)
        confbtn = true;
    }else if(status === 0){
        document.querySelector('.confBtn').innerText = 'Ligado';
        let stringJSON = JSON.stringify({"props":{"ASS":{"troopsAssigner":{"mode":"addict","allowedOptionIds":[1,2,3,4],"targetDurationSeconds":7200,"troops":{"spear":{"maySend":true,"reserved":0},"sword":{"maySend":true,"reserved":0},"axe":{"maySend":true,"reserved":0},"archer":{"maySend":true,"reserved":0},"light":{"maySend":true,"reserved":0},"marcher":{"maySend":true,"reserved":0},"heavy":{"maySend":true,"reserved":0},"knight":{"maySend":true,"reserved":0}},"troopOrder":[["axe","light","marcher"],["spear","sword","archer"],["heavy"],["knight"]]}}}});
        localStorage.setItem('twcheese.userConfig', stringJSON)
        let strJSON = JSON.stringify(1);
        localStorage.setItem('Status', strJSON)
        document.querySelector('.confBtn').title = 'Mesmo Tempo de coleta em todos';
        confbtn = true;
    }else if(status === 1){
        document.querySelector('.confBtn').innerText = 'Desligado';
        let stringJSON = JSON.stringify({"props":{"ASS":{"troopsAssigner":{"mode":"sane_person","allowedOptionIds":[1,2,3,4],"targetDurationSeconds":7200,"troops":{"spear":{"maySend":true,"reserved":0},"sword":{"maySend":true,"reserved":0},"axe":{"maySend":true,"reserved":0},"archer":{"maySend":true,"reserved":0},"light":{"maySend":true,"reserved":0},"marcher":{"maySend":true,"reserved":0},"heavy":{"maySend":true,"reserved":0},"knight":{"maySend":true,"reserved":0}},"troopOrder":[["axe","light","marcher"],["spear","sword","archer"],["heavy"],["knight"]]}}}});
        localStorage.setItem('twcheese.userConfig', stringJSON)
        let strJSON = JSON.stringify(0);
        localStorage.setItem('Status', strJSON)
        document.querySelector('.confBtn').title = 'Coletar o Maximo possivel na melhor coleta';
        confbtn = false;
    }
}

function verifica(){
    if(localStorage.getItem('AutoColeta') === '1'){
        inicarTimer();
        document.querySelector('.StatusLab').innerText = 'RODANDO';
        document.querySelector('.StatusLab').style.cssText += 'color: green;'
        //total = JSON.parse(localStorage.getItem('TotalRecursoColetado'))
        teste = false;
        intervalo = true;
        StartS();
    }else if(localStorage.getItem('AutoColeta') === '0'){
        document.querySelector('.StatusLab').innerText = 'PAUSADO';
        document.querySelector('.StatusLab').style.cssText += 'color: red;'
        clearInterval(hora);
        intervalo = false;
    }
}
async function loading() {
    while(document.querySelector('#loading_content').style.display === 'inline'){
        console.log('Loading..')
        await delayS(100);
    }
    console.log('TESTE')
    return;
}
verifica();

function delayS(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

async function StartS(){
    while(intervalo){
        totalDiv3 = Math.round(total / 3);
        format3 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(totalDiv3));
        format2 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(total));
        $('#content_value').find('h2').html('[Auto Coleta] Criado por Foxkrak</br></br>Tempo:' + ' ' + timer1(ss) + '⁣⁣      ' + 'Total de Recurso Coletado: ' + format2 + '</br></br>' + 'Madeira: ' + format3 + '&nbsp;&nbsp;&nbsp;Argila: ' + format3+ '&nbsp;&nbsp;&nbsp;Ferro: ' + format3)
        var recaptcha = document.getElementsByClassName('recaptcha-checkbox-checkmark');
        if (recaptcha.length != 0){
            document.documentElement.getElementsByClassName('recaptcha-checkbox-checkmark')[0].click();
        }
        let i = document.querySelectorAll('.free_send_button').length;
        let l = i-1
        if(confbtn){
            if(document.querySelector('#loading_content').style.display === 'none' && document.querySelectorAll('.return-countdown').length === 0){
                for(let itens of document.querySelectorAll('.units-entry-all')){
                    if(parseInt(itens.innerText.replace(/[^0-9]/g,'')) >= 10){
                        twcheese1();
                    }
                }
                for(let k = document.querySelectorAll('.free_send_button').length-1; k >= 0; k--) {
                    if(document.querySelectorAll('.free_send_button').length > 0 && document.querySelectorAll('.wood-value')[k].innerText !== '0'){
                        twcheese1();
                        await delayS(500);
                        document.querySelectorAll('.free_send_button')[k].click();
                        await loading();
                        total += parseInt(document.querySelectorAll('.wood-value')[k].innerText) + parseInt(document.querySelectorAll('.stone-value')[k].innerText) + parseInt(document.querySelectorAll('.iron-value')[k].innerText);
                        RecursosColetados = JSON.stringify(total);
                        localStorage.setItem('TotalRecursoColetado', RecursosColetados);
                        console.log('Clicando em '+ k)
                    }
                }
            }
        }else{
            if(document.querySelector('#loading_content').style.display === 'none' && document.querySelectorAll('.return-countdown').length !== 0 && document.querySelectorAll('.return-countdown').length <= 4){
                for(let itens of document.querySelectorAll('.units-entry-all')){
                    if(parseInt(itens.innerText.replace(/[^0-9]/g,'')) >= 10){
                        twcheese1();
                    }
                }
                for(let k = document.querySelectorAll('.free_send_button').length-1; k >= 0; k--) {
                    if(document.querySelectorAll('.free_send_button').length > 0 && document.querySelectorAll('.wood-value')[k].innerText !== '0'){
                        twcheese1();
                        await delayS(500);
                        document.querySelectorAll('.free_send_button')[k].click();
                        await loading();
                        total += parseInt(document.querySelectorAll('.wood-value')[k].innerText) + parseInt(document.querySelectorAll('.stone-value')[k].innerText) + parseInt(document.querySelectorAll('.iron-value')[k].innerText);
                        RecursosColetados = JSON.stringify(total);
                        localStorage.setItem('TotalRecursoColetado', RecursosColetados);
                        console.log('Clicando em '+ k)
                    }
                }
            }
        }
        await delayS(1000);
    }
}
