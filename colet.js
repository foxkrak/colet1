var antes = Date.now();
let teste = true;
let hora;
let intervalo = true;
let RecursosColetados;
let timerRodando;
let format2;
var total = 0;
let ss = 0;
let confbtn = false;
let intervalo2;
let start;
twcheese1();
ss = JSON.parse(localStorage.getItem('TimerRodando'))
total = JSON.parse(localStorage.getItem('TotalRecursoColetado'));
format2 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(total));
let totalDiv3 = Math.round(total / 3);
let format3 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(totalDiv3));

function resetar(){
    total = JSON.parse(localStorage.getItem('TotalRecursoColetado'));
}

function twcheese1(){
    javascript: (window.TwCheese && TwCheese.tryUseTool('ASS')) || $.ajax('https://cheesasaurus.github.io/twcheese/launch/ASS.js?' +~~((new Date())/3e5),{cache:1,dataType:"script"});void 0;
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
        document.querySelector('.StatusLab').innerHTML = '<h5>RODANDO</h5>';
        document.querySelector('.StatusLab').style.cssText += 'color: green;'
    },1000)
}

//*************************** CRIANDO OS ELEMENTOS CONFIGURANDO E DANDO FUNÇÃO ***************************
function html(){
    let html = `<td class="opcoestd content-border border-frame-gold-red" style="margin-top: 200px; position: absolute;">
      <table class="vis">
            <tbody><tr class="border-frame-gold-red">
              <td style="text-align: center; padding-top: 5px; padding-bottom: 2px; width: 290px" class="avisos" colspan="6"><h3 class="premium_account_hint">[Auto Coleta]</h3></td>
            </tr>
            <tr>
              <td style="text-align: center; width: 5px;"><span class="icon header time"></span></td>
              <td class="tempoD" colspan="2" style="text-align: center"><h5>${timer1(ss)}</h5></td>
              <td style="text-align: center; width: 5px;"><span class="icon header ressources"></span></td>
              <td class="totalD" colspan="2" style="text-align: center"><h5>${format2}</h5></td>
            </tr>
            <tr>
              <td style="text-align: center;"><span class="icon header wood"> </span></td>
              <td class="madeira" style="text-align: center; width: 60px;">${format3}</td>
              <td style="text-align: center; width: 5px;"><span class="icon header stone"> </span></td>
              <td class="argila" style="text-align: center; width: 60px;">${format3}</td>
              <td style="text-align: center; width: 5px;"><span class="icon header iron"> </span></td>
              <td class="ferro" style="text-align: center; width: 60px;">${format3}</td>
            </tr>
            <tr>
              <td colspan="6" style="text-align: center; padding: 10px; width: 270px"><label class="StatusLab"><h5>PARADO</h5></label></td>
            </tr>
            <tr>
              <td colspan="6" style="text-align: center; padding-bottom: 5px"><label class="statusLab">...</label></td>
            </tr>
            <tr>
              <td style="text-align: center; padding: 10px;" colspan="6">
    <button class="iniciarBtn btn" style="margin-right: 10px;">Iniciar</button>
    <button class="pausarBtn btn" style="margin-right: 10px;">Pausar</button>
    <button class="zerarBtn btn" style="margin-right: 10px;">Zerar</button>
    <button class="confBtn btn">Igual</button>
</td>
            </tr>
          </tbody></table>
        </td>`
    return html;
    }
document.querySelector('.shadedBG').appendChild(createEle('td',undefined,'opcoestd content-border border-frame-gold-red'))
document.querySelector('.opcoestd').innerHTML = html();
document.querySelector('.opcoestd').style.cssText = 'margin-top: 200px;'+'position: absolute;'

function createEle(ele,texto = '',clas){
    let EleCriado = document.createElement(ele);
    EleCriado.innerText = texto;
    if(clas !== undefined) EleCriado.classList = clas;
    return EleCriado;
}
function html2(){
    document.querySelector('.tempoD').querySelector('h5').innerHTML = `${timer1(ss)}`
    document.querySelector('.totalD').querySelector('h5').innerHTML = `${format2}`
    document.querySelector('.madeira').innerHTML = `${format3}`
    document.querySelector('.argila').innerHTML = `${format3}`
    document.querySelector('.ferro').innerHTML = `${format3}`
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
    document.querySelector('.StatusLab').innerHTML = '<h5>ZERADO</h5>';
    document.querySelector('.StatusLab').style.cssText += 'color: red;'
    resetar();
    format2 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(total));
    html2();
    })
document.querySelector('.confBtn').addEventListener('click',function(){
    verificaconfbtn();
})
let status = JSON.parse(localStorage.getItem('Status'))
if(status === 1){
    document.querySelector('.confBtn').innerText = 'Igual';
    let stringJSON = JSON.stringify({"props":{"ASS":{"troopsAssigner":{"mode":"addict","allowedOptionIds":[1,2,3,4],"targetDurationSeconds":7200,"troops":{"spear":{"maySend":true,"reserved":0},"sword":{"maySend":true,"reserved":0},"axe":{"maySend":true,"reserved":0},"archer":{"maySend":true,"reserved":0},"light":{"maySend":true,"reserved":0},"marcher":{"maySend":true,"reserved":0},"heavy":{"maySend":true,"reserved":0},"knight":{"maySend":true,"reserved":0}},"troopOrder":[["axe","light","marcher"],["spear","sword","archer"],["heavy"],["knight"]]}}}});
    localStorage.setItem('twcheese.userConfig', stringJSON)
    document.querySelector('.confBtn').title = 'Mesmo Tempo de coleta em todos';
    confbtn = true;
}else if(status === 0){
    document.querySelector('.confBtn').innerText = 'Maximo';
    let stringJSON = JSON.stringify({"props":{"ASS":{"troopsAssigner":{"mode":"sane_person","allowedOptionIds":[1,2,3,4],"targetDurationSeconds":7200,"troops":{"spear":{"maySend":true,"reserved":0},"sword":{"maySend":true,"reserved":0},"axe":{"maySend":true,"reserved":0},"archer":{"maySend":true,"reserved":0},"light":{"maySend":true,"reserved":0},"marcher":{"maySend":true,"reserved":0},"heavy":{"maySend":true,"reserved":0},"knight":{"maySend":true,"reserved":0}},"troopOrder":[["axe","light","marcher"],["spear","sword","archer"],["heavy"],["knight"]]}}}});
    localStorage.setItem('twcheese.userConfig', stringJSON)
    document.querySelector('.confBtn').title = 'Coletar o Maximo possivel na melhor coleta';
    confbtn = false;
}
if(status === null || status === undefined){
    let stringJSON = JSON.stringify(1);
    localStorage.setItem('Status', stringJSON)
    confbtn = true;
    document.querySelector('.confBtn').innerText = 'Igual';
}
function verificaconfbtn(){
    status = JSON.parse(localStorage.getItem('Status'))
    if(status === 0){
        document.querySelector('.confBtn').innerText = 'Igual';
        let stringJSON = JSON.stringify({"props":{"ASS":{"troopsAssigner":{"mode":"addict","allowedOptionIds":[1,2,3,4],"targetDurationSeconds":7200,"troops":{"spear":{"maySend":true,"reserved":0},"sword":{"maySend":true,"reserved":0},"axe":{"maySend":true,"reserved":0},"archer":{"maySend":true,"reserved":0},"light":{"maySend":true,"reserved":0},"marcher":{"maySend":true,"reserved":0},"heavy":{"maySend":true,"reserved":0},"knight":{"maySend":true,"reserved":0}},"troopOrder":[["axe","light","marcher"],["spear","sword","archer"],["heavy"],["knight"]]}}}});
        localStorage.setItem('twcheese.userConfig', stringJSON)
        let strJSON = JSON.stringify(1);
        localStorage.setItem('Status', strJSON)
        document.querySelector('.confBtn').title = 'Mesmo Tempo de coleta em todos';
        confbtn = true;
        console.log('Entrou no Status ',status)
        location.reload();
    }else if(status === 1){
        document.querySelector('.confBtn').innerText = 'Maximo';
        let stringJSON = JSON.stringify({"props":{"ASS":{"troopsAssigner":{"mode":"sane_person","allowedOptionIds":[1,2,3,4],"targetDurationSeconds":7200,"troops":{"spear":{"maySend":true,"reserved":0},"sword":{"maySend":true,"reserved":0},"axe":{"maySend":true,"reserved":0},"archer":{"maySend":true,"reserved":0},"light":{"maySend":true,"reserved":0},"marcher":{"maySend":true,"reserved":0},"heavy":{"maySend":true,"reserved":0},"knight":{"maySend":true,"reserved":0}},"troopOrder":[["axe","light","marcher"],["spear","sword","archer"],["heavy"],["knight"]]}}}});
        localStorage.setItem('twcheese.userConfig', stringJSON)
        let strJSON = JSON.stringify(0);
        localStorage.setItem('Status', strJSON)
        document.querySelector('.confBtn').title = 'Coletar o Maximo possivel na melhor coleta';
        confbtn = false;
        console.log('Entrou no Status ',status)
        location.reload();
    }
}

async function verifica(){
    if(localStorage.getItem('AutoColeta') === '1'){
        inicarTimer();
        document.querySelector('.StatusLab').innerHTML = '<h5>RODANDO</h5>';
        document.querySelector('.StatusLab').style.cssText += 'color: green;'
        //total = JSON.parse(localStorage.getItem('TotalRecursoColetado'))
        teste = false;
        intervalo = true;
        while(true){
            await delayS(300);
            if(document.readyState === 'complete'){
                StartS();
                break;
            }
        }
    }else if(localStorage.getItem('AutoColeta') === '0'){
        document.querySelector('.StatusLab').innerHTML = '<h5>PAUSADO</h5>';
        document.querySelector('.StatusLab').style.cssText += 'color: red;'
        clearInterval(hora);
        clearInterval(intervalo2);
        clearInterval(start)
        intervalo = false;
    }
}
function loading() {
    return new Promise(async resolve => {
        let teste = true;
        while(teste){
            if(document.querySelector('#loading_content').style.display === 'inline'){
                console.log('Loading..')
            }else{
                resolve(teste = false);
            }
            await delayS(200);
        }
    });
}
verifica();

function delayS(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}
function inputTrop(){
    let tropas = 0;
    for(let itens of document.querySelectorAll('.unitsInput')){
        if(itens.value !== ''){
            tropas += parseInt(itens.value);
        }
        if(tropas>= 10){
            return true;
        }
    }
    return false;
}
function trops(){
    for(let itens of document.querySelectorAll('.units-entry-all')){
        if(parseInt(itens.innerText.replace(/[^0-9]/g,''))>= 10){
            return true;
        }
    }
    return false;
}
async function ClicaColeta(valor){
    let teste = true;
    return new Promise(async resolve => {
        while(teste){
            if(document.querySelectorAll('.free_send_button')[valor] !== null){
                document.querySelectorAll('.free_send_button')[valor].click();
                await loading();
            }
            if(document.querySelectorAll('.return-countdown')[valor] !== null){
                total += parseInt(document.querySelectorAll('.wood-value')[valor].innerText) + parseInt(document.querySelectorAll('.stone-value')[valor].innerText) + parseInt(document.querySelectorAll('.iron-value')[valor].innerText);
                RecursosColetados = JSON.stringify(total);
                localStorage.setItem('TotalRecursoColetado', RecursosColetados);
                resolve(teste = false);
            }
            await delayS(200);
        }
        });
}

async function StartS(){
    var recaptcha = document.getElementsByClassName('recaptcha-checkbox-checkmark');
    if (recaptcha.length != 0){
        //document.documentElement.getElementsByClassName('recaptcha-checkbox-checkmark')[0].click();
        document.querySelector('.statusLab').innerText = 'Capctha...';
        let stringJSON = JSON.stringify(0);
        localStorage.setItem('AutoColeta', stringJSON);
        verifica();
        teste = true;
    }
    intervalo2 = setInterval(function(){
        totalDiv3 = Math.round(total / 3);
        format3 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(totalDiv3));
        format2 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(total));
        html2();
    },500)
    while(intervalo){
        if(document.querySelector('#loading_content').style.display === 'inline' && $('.return-countdown').find('a').length !== 0){
            location.reload();
        }
        let unlock = 4 - document.querySelectorAll('.unlock-button').length
        if(confbtn){
            if(document.querySelectorAll('.return-countdown').length !== 0){document.querySelector('.statusLab').innerText = 'Esperando todas as coletas terminarem.';}
            if(document.readyState === 'complete' && document.querySelectorAll('.return-countdown').length === 0 && document.querySelectorAll('.free_send_button').length === unlock){
                twcheese1();
                while(document.querySelectorAll('.free_send_button').length > 0){
                let k = document.querySelectorAll('.free_send_button').length-1
                console.log(k)
                    if(inputTrop()){
                        switch(k){
                            case 3:
                                console.log('Clicando em Extrema Coleta.')
                                document.querySelector('.statusLab').innerText = 'Clicando em Extrema Coleta.';
                                await ClicaColeta(k);
                                break;
                            case 2:
                                console.log('Clicando em Grande Coleta.')
                                document.querySelector('.statusLab').innerText = 'Clicando em Grande Coleta.';
                                await ClicaColeta(k);
                                break;
                            case 1:
                                console.log('Clicando em Média Coleta.')
                                document.querySelector('.statusLab').innerText = 'Clicando em Média Coleta.';
                                await ClicaColeta(k);
                                break;
                            case 0:
                                console.log('Clicando em Pequena Coleta.')
                                document.querySelector('.statusLab').innerText = 'Clicando em Pequena Coleta.';
                                await ClicaColeta(k);
                                break;
                        }
                    }else{
                        document.querySelector('.statusLab').innerText = 'Total de tropas menor que 10, não posso prosseguir.';
                    }
                    await delayS(100)
                }
            }
        }else{
            if(document.querySelectorAll('.return-countdown').length !== 0){document.querySelector('.statusLab').innerText = 'Esperando qualquer coleta terminar.';}
            if(document.querySelectorAll('.return-countdown').length <= 4 && document.querySelectorAll('.free_send_button').length !== 0){
                let k = document.querySelectorAll('.free_send_button').length-1
                twcheese1();
                switch(k){
                    case 3:
                        if(inputTrop()){
                            console.log('Clicando em Extrema Coleta.')
                            document.querySelector('.statusLab').innerText = 'Clicando em Extrema Coleta.';
                            await ClicaColeta(k);
                        }
                        break;
                    case 2:
                        if(inputTrop()){
                            console.log('Clicando em Grande Coleta.')
                            document.querySelector('.statusLab').innerText = 'Clicando em Grande Coleta.';
                            await ClicaColeta(k);
                        }
                        break;
                    case 1:
                        if(inputTrop()){
                            console.log('Clicando em Média Coleta.')
                            document.querySelector('.statusLab').innerText = 'Clicando em Média Coleta.';
                            await ClicaColeta(k);
                        }
                        break;
                    case 0:
                        if(inputTrop()){
                            console.log('Clicando em Pequena Coleta.')
                            document.querySelector('.statusLab').innerText = 'Clicando em Pequena Coleta.';
                            await ClicaColeta(k);
                        }
                        break;
                }
            }
        }
        await delayS(100);
    }
}
var duracao = Date.now() - antes;
console.log('Terminou em ' + duracao + 'ms');
