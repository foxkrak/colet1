// ==UserScript==
// @name         TimerAtaque
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  programar ataques para horarios dificeis e ainda conseguir snipar como apoio.
// @author       WFox
// @include      https://br*.tribalwars.com.br/game.php?village=*&screen=place&try=confirm
// @include      https://br*.tribalwars.com.br/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


let tropas = {
    lan: 0,
    esp: 0,
    bb: 0,
    spy: 0,
    cl: 0,
    cp: 0,
    ari: 0,
    cat: 0,
    pala: 0,
    nobre: 0,
    atks: 0,
    alvo: 0,
    apoio: false
}

let villageID = game_data.village.id
let world = game_data.world
let tropasGet = JSON.parse(localStorage.getItem(`tropas-${villageID}`));

if(tropasGet != null || tropasGet != undefined){
    tropas = tropasGet
}

if(window.location.search != `?village=${villageID}&screen=place&try=confirm` && tropasGet != null){
    if(window.location.href != `https://${world}.tribalwars.com.br/game.php?village=${villageID}&screen=place&target=${tropas.alvo}`){
        window.location.href = `https://${world}.tribalwars.com.br/game.php?village=${villageID}&screen=place&target=${tropas.alvo}`
    }
}
if(window.location.href == `https://${world}.tribalwars.com.br/game.php?village=${villageID}&screen=place&target=${tropas.alvo}`){
    setTimeout(()=>{
        console.log('entrou')
        document.querySelector('#unit_input_spear').value = tropas.lan
        document.querySelector('#unit_input_sword').value = tropas.esp
        document.querySelector('#unit_input_axe').value = tropas.bb
        document.querySelector('#unit_input_spy').value = tropas.spy
        document.querySelector('#unit_input_light').value = tropas.cl
        document.querySelector('#unit_input_heavy').value = tropas.cp
        document.querySelector('#unit_input_ram').value = tropas.ari
        document.querySelector('#unit_input_catapult').value = tropas.cat
        document.querySelector('#unit_input_knight').value = tropas.pala
        document.querySelector('#unit_input_snob').value = tropas.nobre
        if(tropas.apoio){
            window.onload = document.querySelector('#target_support').click()
            console.log('Apoio')
        }else{
            window.onload = document.querySelector('#target_attack').click()
            console.log('Ataque')
        }
    },3000)
}else{
    let tables;
    let tables2;
    let tempo;
    let timerS = Number(new Date().getTime()-10800000)
    let total;
    let horaz;
    let horax;
    let dataIr;
    let dataReload;
    let decre;
    let dec;
    let data;
    let timess = 0
    let oquee = document.querySelector('#command-data-form').children[0].innerText;
    let jafoi = false;
    let igreja = false;
    //let aldeia = document.querySelectorAll('.box-item')[3].children[0].innerText.replace(/[^0-9]/g,'');

    function settar(){
        tropas.lan = Number($('.units-row').find('.unit-item-spear')[0].innerText)
        tropas.esp = Number($('.units-row').find('.unit-item-sword')[0].innerText)
        tropas.bb = Number($('.units-row').find('.unit-item-axe')[0].innerText)
        tropas.spy = Number($('.units-row').find('.unit-item-spy')[0].innerText)
        tropas.cl = Number($('.units-row').find('.unit-item-light')[0].innerText)
        tropas.cp = Number($('.units-row').find('.unit-item-heavy')[0].innerText)
        tropas.ari = Number($('.units-row').find('.unit-item-ram')[0].innerText)
        tropas.cat = Number($('.units-row').find('.unit-item-catapult')[0].innerText)
        tropas.pala = Number($('.units-row').find('.unit-item-knight')[0].innerText)
        tropas.nobre = Number($('.units-row').find('.unit-item-snob')[0].innerText)
        tropas.alvo = Number(document.querySelector('.village_anchor').dataset.id)
        tropas.atks = document.querySelectorAll('.train-name').length
    }


    horaz = JSON.parse(localStorage.getItem(`horazz-${villageID}`));

    function formatms(){
        if(dec.getMilliseconds() < 100 && dec.getMilliseconds() > 10){
            return '0'+dec.getMilliseconds()
        }else if(dec.getMilliseconds() < 10){
            return '00'+dec.getMilliseconds()
        }else{
            return dec.getMilliseconds()
        }
    }
    function formatdat(){
        if(dec.getDate() == 31){
            return "0"
        }else{
            return dec.getDate()
        }
    }

    function time(){
        timerS = (Timing.getCurrentServerTime()-10800000)
        data = new Date(timerS);
        if(horaz != undefined){
            dataIr = new Date(horaz);
            dataReload = new Date(horaz-30000);
            dec = new Date(dataIr.getTime() - data.getTime())
            decre = `${formatdat()} dias e ${dec.toLocaleTimeString('pt-BR', { hour12: false, timeZone: 'UTC' })} :${formatms()}`;
            if(horaz > timerS){
                document.querySelector('.decres').innerText = `enviando em ${decre}`
                document.querySelector('.avisos').innerText = 'Aguardando.'
            }
            if(data.getDate() === dataIr.getDate() && data.getMonth() === dataIr.getMonth()
               && data.getFullYear() === dataIr.getFullYear() && data.getHours() === dataIr.getHours()
               && data.getMinutes() === dataIr.getMinutes() && data.getSeconds() === dataIr.getSeconds()
               && data.getMilliseconds() >= dataIr.getMilliseconds()){
                document.querySelector('.avisos').innerText = 'Enviando.'
                console.log('Enviando.')
                document.querySelector('#troop_confirm_submit').click();
                localStorage.removeItem(`horazz-${villageID}`);
                localStorage.removeItem(`tropas-${villageID}`);
            }
            if(data.getDate() === dataReload.getDate() && data.getMonth() === dataReload.getMonth()
               && data.getFullYear() === dataReload.getFullYear() && data.getHours() === dataReload.getHours()
               && data.getMinutes() === dataReload.getMinutes() && data.getSeconds() === dataReload.getSeconds()
               && data.getMilliseconds() >= dataReload.getMilliseconds()){
                if(jafoi == false){
                    window.location.href = `https://${world}.tribalwars.com.br/game.php?village=${villageID}&screen=place&target=${tropas.alvo}`
                    jafoi = true;
                }
            }
        }
        if(decre === undefined){
            document.querySelector('.decres').innerText = `enviando em 0 dias e ${decre = new Date(timess).toLocaleTimeString('pt-BR', { hour12: false, timeZone: 'UTC' })+ `:000`}`
        }
    }

    function start(){
        if(game_data.village.buildings.church_f != undefined && game_data.village.buildings.church_f > 0){
            tables = 9
            tables2 = 8
            igreja = true;
        }else{
            tables = 7
            tables2 = 6
        }
        if(document.querySelector('.vis').querySelectorAll('tr').length < tables && document.querySelector('.vis').querySelectorAll('tr').length >= tables2){
            tempo = document.querySelector('.vis').querySelectorAll('tr')[2].querySelectorAll('td')[1].innerText.replace('hoje às ','').split(':');
            total = ((Number(tempo[0])*60+Number(tempo[1]))*60+Number(tempo[2]))*1000;
        }else{
            tempo = document.querySelector('.vis').querySelectorAll('tr')[3].querySelectorAll('td')[1].innerText.replace('hoje às ','').split(':');
            total = ((Number(tempo[0])*60+Number(tempo[1]))*60+Number(tempo[2]))*1000;
        }

        if(oquee.includes('apoio')){
            $('.vis').find('tbody').find('tr')[4].after(createEle('tr','atakauto'))
            document.querySelector('.atakauto').innerHTML = '<td>Regressivo:</td><td colspan="3" class="decres"></td>'
            $('.atakauto').after(createEle('tr','datauto'))
            document.querySelector('.datauto').innerHTML = '<td>Programar:</td><td colspan="3"><input type="datetime-local" class="data" step="1" style="width: auto; height: 18px; font-size: 15px;"></input></td>'
            $('.data').prop('disabled',true);
            $('.datauto').after(createEle('tr','aviss'))
            document.querySelector('.aviss').innerHTML = '<td>Avisos:</td><td class="avisos" width="135">Adicione Data e hora.</td><td><button class="send btn" style="float: left;">Salvar</button><button class="cancel btn" style="float: right;">Cancelar</button></td>'
            document.querySelector('.data').valueAsNumber = timerS+total;
            document.querySelector('.vis').children[0].children[0].children[0].colSpan = '3'
            document.querySelector('.vis').children[0].children[1].children[1].colSpan = '3'
            document.querySelector('.vis').children[0].children[2].children[1].colSpan = '3'
            document.querySelector('.vis').children[0].children[3].children[1].colSpan = '3'
            document.querySelector('.vis').children[0].children[4].children[1].colSpan = '3'
            if(igreja){
                document.querySelector('.vis').children[0].children[8].children[0].colSpan = '3'
                document.querySelector('.vis').children[0].children[9].children[0].colSpan = '3'
                document.querySelector('.vis').children[0].children[10].children[0].colSpan = '3'
            }
            tropas.apoio = true

        }else if(oquee.includes('bárbaros') || document.querySelector('.vis').querySelectorAll('tr').length < tables){
            $('.vis').find('tbody').find('tr')[4].before(createEle('tr','atakauto'))
            document.querySelector('.atakauto').innerHTML = '<td>Regressivo:</td><td colspan="3" class="decres"></td>'
            $('.atakauto').after(createEle('tr','datauto'))
            document.querySelector('.datauto').innerHTML = '<td>Programar:</td><td colspan="3"><input type="datetime-local" class="data" step="1" style="width: auto; height: 18px; font-size: 15px;"></input></td>'
            $('.data').prop('disabled',true);
            $('.datauto').after(createEle('tr','aviss'))
            document.querySelector('.aviss').innerHTML = '<td>Avisos:</td><td class="avisos" width="135">Adicione Data e hora.</td><td><button class="send btn" style="float: left;">Salvar</button><button class="cancel btn" style="float: right;">Cancelar</button></td></td>'
            document.querySelector('.data').valueAsNumber = timerS+total;
            document.querySelector('.vis').children[0].children[0].children[0].colSpan = '3'
            document.querySelector('.vis').children[0].children[1].children[1].colSpan = '3'
            document.querySelector('.vis').children[0].children[8].children[0].colSpan = '3'
            document.querySelector('.vis').children[0].children[7].children[1].colSpan = '3'
            document.querySelector('.vis').children[0].children[4].children[1].colSpan = '3'
            document.querySelector('.vis').children[0].children[3].children[1].colSpan = '3'
            document.querySelector('.vis').children[0].children[2].children[1].colSpan = '3'
            if(igreja){
                document.querySelector('.vis').children[0].children[8].children[0].colSpan = '3'
                document.querySelector('.vis').children[0].children[9].children[0].colSpan = '3'
                document.querySelector('.vis').children[0].children[10].children[0].colSpan = '3'
            }
            tropas.apoio = false
        }else{
            $('.vis').find('tbody').find('tr')[5].before(createEle('tr','atakauto'))
            document.querySelector('.atakauto').innerHTML = '<td>Regressivo:</td><td colspan="3" class="decres"></td>'
            $('.atakauto').after(createEle('tr','datauto'))
            document.querySelector('.datauto').innerHTML = '<td>Programar:</td><td colspan="3"><input type="datetime-local" class="data" step="1" style="width: auto; height: 18px; font-size: 15px;"></input></td>'
            $('.data').prop('disabled',true);
            $('.datauto').after(createEle('tr','aviss'))
            document.querySelector('.aviss').innerHTML = '<td>Avisos:</td><td class="avisos" width="135">Adicione Data e hora.</td><td><button class="send btn" style="float: left;">Salvar</button><button class="cancel btn" style="float: right;">Cancelar</button></td></td>'
            document.querySelector('.data').valueAsNumber = timerS+total;
            document.querySelector('.vis').children[0].children[0].children[0].colSpan = '3'
            document.querySelector('.vis').children[0].children[1].children[1].colSpan = '3'
            document.querySelector('.vis').children[0].children[2].children[1].colSpan = '3'
            document.querySelector('.vis').children[0].children[3].children[1].colSpan = '3'
            document.querySelector('.vis').children[0].children[4].children[1].colSpan = '3'
            if(document.querySelector('.vis').children[0].children[8].children[1] !== undefined){
                document.querySelector('.vis').children[0].children[8].children[1].colSpan = '3'
            }else{document.querySelector('.vis').children[0].children[8].children[0].colSpan = '3'}
            document.querySelector('.vis').children[0].children[9].children[0].colSpan = '3'
            if(igreja){
                document.querySelector('.vis').children[0].children[10].children[0].colSpan = '3'
                document.querySelector('.vis').children[0].children[11].children[0].colSpan = '3'
            }
            tropas.apoio = false
        }

        document.querySelector('.send').addEventListener('click',function(){
            event.preventDefault()
            horax = document.querySelector('.data').valueAsNumber
            horaz = horax-total
            console.log(new Date(horaz))
            if(horax === ''){
                document.querySelector('.avisos').innerText = 'Precisa por um horario de Chegada';
                return;
            }
            if(timerS > horaz){
                console.log('Já passou o tempo.')
                horaz = null;
                document.querySelector('.avisos').innerHTML = 'Ja passou do tempo.'
            }else if(timerS < horaz){
                document.querySelector('.avisos').innerText = 'Aguardando.'
                $('.data').prop('disabled',true);
                $('.send').prop("disabled",true);
                settar()
                let stringJSON = JSON.stringify(horaz);
                localStorage.setItem(`horazz-${villageID}`, stringJSON)
                stringJSON = JSON.stringify(tropas);
                localStorage.setItem(`tropas-${villageID}`, stringJSON)
            }
        })
        document.querySelector('.cancel').addEventListener('click',function(){
            event.preventDefault()
            horaz = null
            localStorage.removeItem(`horazz-${villageID}`);
            localStorage.removeItem(`tropas-${villageID}`);
            //document.querySelector('.data').valueAsNumber = timerS + total
            $('.data').prop('disabled',false);
            $('.send').prop("disabled",false);
            document.querySelector('.avisos').innerText = 'Adicione Data e hora.'
            document.querySelector('.send').innerText = 'Salvar'
        })
        document.querySelector('.data').addEventListener('mouseover',function(){
            if(document.querySelector('.send').attributes[2] == undefined){
                $('.data').prop('disabled',false);
            }
        })

        function createEle(ele,clas){
            let EleCriado = document.createElement(ele);
            if(clas !== undefined) EleCriado.classList = clas;
            return EleCriado;
        }
    }
    document.onload = start();
    if(horaz != null || horaz != undefined){
        document.querySelector('.data').valueAsNumber = horaz+total
        $('.data').prop('disabled',true);
        $('.send').prop("disabled",true);
    }
    var tnt_show_ms = window.setInterval(time,1);
}
