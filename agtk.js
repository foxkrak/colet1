//#### - Consfiguracoes

let IniciarAtk = 15*1000; // vai para pagina de ataque antes do horario marcado padrao(30 segundos)
let ms = 25; // ms de delay entre seu pc e o server!

//#### - Variaveis Globais

let infoaldeia = [];
let tables;
let tables2;
let villageID = game_data.village.id;
let world = game_data.world;
let tempodistancia;
let total;
let horaz;
let horadefined;
let dec;
let sec30;
const timer = ms => new Promise(res => setTimeout(res, ms))
let i = 0;
let jafoi = false;
let intervalo;

//#### - Buscar info na memoria do navegador!
if(JSON.parse(localStorage.getItem(`infoaldeia`)) != null){
    infoaldeia = JSON.parse(localStorage.getItem(`infoaldeia`));
}
if(JSON.parse(localStorage.getItem(`sec30`)) != null){
    sec30 = JSON.parse(localStorage.getItem(`sec30`));
}

//#### - HTMLS

let html = `<td class="opcoestd2 content-border border-frame-gold-red" style="margin-top: 200px; position: absolute;">
      <table style="width: 100%">
            <tbody class="tbodyy">
            <tr>
              <h4>Lista de Agendados:</h4>
            </tr>
            <tr>
            <td colspan="4" style="padding: 5px">
            <label>Encaminha quando faltar: ${IniciarAtk/1000} segundos</label>
            </td>
            </tr>
          </tbody>
          </table>
        </td>`

let htmls = `
<h4>Agendar Ataque:</h4>
<table style="width: 100%">
  <tbody>
    <tr>
      <td class="avisos">Adicione Data e hora.</td>
    </tr>
    <tr>
        <td class="decres">enviando em 0 dias e 00:00:00:000</td>
    </tr>
    <tr>
      <td><input type="datetime-local" class="dataCommand" step="1" style="width: auto; height: 18px; font-size: 15px;"></td>
    </tr>
    <tr>
      <td><button class="send btn" style="float: left;">Salvar</button><button class="cancel btn" style="float: left;">Cancelar</button></td>
    </tr>
  </tbody>
<table>
`

//#### - Functions

function regressivo(datair,ms){
    var dead = new Date(datair).getTime();
    var now = Timing.getCurrentServerTime();
    var t = dead - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    var mile = Math.floor(t%((1000*60)/60)/1)
    if(hours < 10){
        hours = '0'+hours
    }
    if(minutes < 10){
        minutes = '0'+minutes
    }
    if(seconds < 10){
        seconds = '0'+seconds
    }
    if(mile < 100 && mile > 10){
        mile = '0'+mile
    }else if(mile < 10){
        mile = '00'+mile
    }
    let decre;
    if(ms == false){
        decre = `${days} dias e ${hours}:${minutes}:${seconds}`
    }else{
        decre = `${days} dias e ${hours}:${minutes}:${seconds}:${mile}`
    }
    return decre;
}

function createEle(ele,texto = '',clas,id){
    let EleCriado = document.createElement(ele);
    EleCriado.innerHTML = texto;
    if(clas !== undefined) EleCriado.classList = clas;
    if(id !== undefined) EleCriado.id = id;
    return EleCriado;
}

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

function buscarInfo(arry){
    let verificarmenor;
    let menortempo;
    //#### - Verifica o menor tempo de ataque Globalmente.
    for(let atks of arry){
        if(verificarmenor == undefined){
            verificarmenor = atks.horaz;
            menortempo = atks
        }else if(atks.horaz < verificarmenor){
            verificarmenor = atks.horaz;
            menortempo = atks
        }
    }
    return menortempo;
}

function time(menortempo){
    intervalo = setInterval(()=>{
        let timerS = (Timing.getCurrentServerTime())
        let data = new Date(timerS);
        if(menortempo.horaz != undefined){
            let dataIr = new Date(menortempo.horaz+ms);
            dec = new Date(dataIr.getTime() - data.getTime())
            //let decre = `${formatdat()} dias e ${dec.toLocaleTimeString('pt-BR', { hour12: false, timeZone: 'UTC' })} :${formatms()}`;
            if(menortempo.horaz > timerS){
                document.querySelector('.decres').innerText = `enviando em ${regressivo(menortempo.horaz,true)}`
                document.querySelector('.avisos').innerText = 'Aguardando.'
            }
            if(data.getDate() === dataIr.getDate() && data.getMonth() === dataIr.getMonth()
               && data.getFullYear() === dataIr.getFullYear() && data.getHours() === dataIr.getHours()
               && data.getMinutes() === dataIr.getMinutes() && data.getSeconds() === dataIr.getSeconds()
               && data.getMilliseconds() > dataIr.getMilliseconds()){
                if(jafoi == false){
                    console.log('Enviando.')
                    document.querySelector('.avisos').innerText = 'Enviando.'
                    chamarir2()
                    infoaldeia = infoaldeia.filter(infoaldeia => infoaldeia.id != menortempo.id)
                    let stringJSON = JSON.stringify(infoaldeia);
                    localStorage.setItem(`infoaldeia`, stringJSON)
                }
            }
            function ir2(){
                return new Promise(resolve =>{
                    document.querySelector('#troop_confirm_submit').click();
                    jafoi = true;
                })
            }
            async function chamarir2(){
                await ir2();
            }
        }
    },1)
}

function createTable(info,timer){
    if(i < infoaldeia.length){
        let dataregress = new Date((info.horaz) - timer)
        let aldeia = `<center><a href="https://${world}.tribalwars.com.br/game.php?village=${info.idaldeia}&screen=place&target=${info.alvo}">${info.idaldeia}</a></center>`
        let cancel = `<center><button class="cancelx_${info.idaldeia}-${info.id} btn">X</button></center>`
        document.querySelector('.tbodyy').appendChild(createEle('tr','','lol',`${info.idaldeia}-${info.id}`))
        $(`#${info.idaldeia}-${info.id}`)[0].appendChild(createEle('td','<center><b>Aldeia:</b></center>'))
        $(`#${info.idaldeia}-${info.id}`)[0].appendChild(createEle('td',aldeia))
        $(`#${info.idaldeia}-${info.id}`)[0].appendChild(createEle('td',regressivo(info.horaz,false),`${info.idaldeia}-${info.id}`))
        $(`#${info.idaldeia}-${info.id}`)[0].appendChild(createEle('td',cancel))
        console.log('criou' + i)
        document.querySelector(`.cancelx_${info.idaldeia}-${info.id}`).addEventListener('click',function(){
            event.preventDefault()
            infoaldeia = infoaldeia.filter(infoaldeia => infoaldeia.id != `${info.id}`)
            let stringJSON = JSON.stringify(infoaldeia);
            localStorage.setItem(`infoaldeia`, stringJSON)
            window.location.reload()
        })
        i++
    }
}

async function start(){
    if(infoaldeia != '' && infoaldeia != undefined){
        let aldeia = buscarInfo(infoaldeia)
        //console.log(aldeia)
        if(window.location.search == `?village=${aldeia.idaldeia}&screen=place&target=${aldeia.alvo}` && aldeia.sec30 == true){
            setTimeout(()=>{
                document.querySelector('#unit_input_spear').value = aldeia.tropas.lan
                document.querySelector('#unit_input_sword').value = aldeia.tropas.esp
                document.querySelector('#unit_input_axe').value = aldeia.tropas.bb
                document.querySelector('#unit_input_spy').value = aldeia.tropas.spy
                document.querySelector('#unit_input_light').value = aldeia.tropas.cl
                document.querySelector('#unit_input_heavy').value = aldeia.tropas.cp
                document.querySelector('#unit_input_ram').value = aldeia.tropas.ari
                document.querySelector('#unit_input_catapult').value = aldeia.tropas.cat
                document.querySelector('#unit_input_knight').value = aldeia.tropas.pala
                document.querySelector('#unit_input_snob').value = aldeia.tropas.nobre
                if(aldeia.apoio){
                    window.onload = document.querySelector('#target_support').click()
                    console.log('Apoio')
                }else{
                    window.onload = document.querySelector('#target_attack').click()
                    console.log('Ataque')
                }
            },1000)
        }
        if(window.location.search == `?village=${aldeia.idaldeia}&screen=place&try=confirm` && aldeia.sec30 == true){
            if(aldeia.NumAtk > 1){
                let numatk = aldeia.NumAtk;
                while(numatk > 1){
                    await timer(500)
                    document.querySelector('#troop_confirm_train').click()
                    numatk -= 1;
                }
                for(let i = 2; i < aldeia.NumAtk+1; i++){
                    document.querySelector(`[name="train[${i}][spear]"]`).value = aldeia.tropas.lan
                    document.querySelector(`[name="train[${i}][sword]"]`).value = aldeia.tropas.esp
                    document.querySelector(`[name="train[${i}][axe]"]`).value = aldeia.tropas.bb
                    document.querySelector(`[name="train[${i}][spy]"]`).value = aldeia.tropas.spy
                    document.querySelector(`[name="train[${i}][light]"]`).value = aldeia.tropas.cl
                    document.querySelector(`[name="train[${i}][heavy]"]`).value = aldeia.tropas.cp
                    document.querySelector(`[name="train[${i}][ram]"]`).value = aldeia.tropas.ari
                    document.querySelector(`[name="train[${i}][catapult]"]`).value = aldeia.tropas.cat
                    document.querySelector(`[name="train[${i}][snob]"]`).value = aldeia.tropas.nobre
                }
                $('#troop_confirm_submit').prop('disabled',false);
            }
        }
        if(window.location.search != `?village=${villageID}&screen=place&try=confirm` && window.location.search != `?village=${villageID}&screen=overview_villages&mode=incomings&type=unignored&subtype=attacks`){
            document.querySelector('.shadedBG').appendChild(createEle('div',undefined,'opcoestd2 vis content-border'))
            document.querySelector('.opcoestd2').innerHTML = html;
            document.querySelector('.opcoestd2').style.cssText = 'margin-top: 200px;'+'position: absolute; display: block'
            let info_menor = infoaldeia
            setInterval(()=>{
                let timerS = Timing.getCurrentServerTime()
                for(let i = 0; i < infoaldeia.length; i++){
                    let result = buscarInfo(info_menor)
                    createTable(result,timerS)
                    info_menor = info_menor.filter(info_menor => info_menor.id != result.id)
                }
                for(let atks of infoaldeia){
                    $(`.${atks.idaldeia}-${atks.id}`)[0].innerText = regressivo(atks.horaz,false);
                    $(`.${atks.idaldeia}-${atks.id}`)[0].style="text-align:center"
                }
                let menortempo = buscarInfo(infoaldeia);
                if(menortempo != undefined){
                    let data = new Date(timerS);
                    let dataReload = new Date(menortempo.horaz-IniciarAtk);
                    //console.log(dataReload,data)
                    $(`.${menortempo.idaldeia}-${menortempo.id}`)[0].style="text-align:center; color: green; font-weight: bold"
                    if(data.getDate() === dataReload.getDate() && data.getMonth() === dataReload.getMonth()
                       && data.getFullYear() === dataReload.getFullYear() && data.getHours() === dataReload.getHours()
                       && data.getMinutes() === dataReload.getMinutes() && data.getSeconds() >= dataReload.getSeconds()
                       && data.getMilliseconds() >= dataReload.getMilliseconds()){
                        console.log('entrou')
                        if(jafoi == false && window.location.href != `https://${world}.tribalwars.com.br/game.php?village=${menortempo.idaldeia}&screen=place&target=${menortempo.alvo}`){
                            chamarir();
                            jafoi = true;
                        }
                    }
                    function ir(){
                        return new Promise(resolve =>{
                            window.location.href = `https://${world}.tribalwars.com.br/game.php?village=${menortempo.idaldeia}&screen=place&target=${menortempo.alvo}`
                            menortempo.sec30 = true;
                            let stringJSON = JSON.stringify(infoaldeia);
                            localStorage.setItem(`infoaldeia`, stringJSON)
                            Notification.requestPermission(/* opcional: callback */);

                            let notification = new Notification("Auto Ataque", {
                                icon: 'https://b.thumbs.redditmedia.com/1l0qG91U_lSzE-4gEGrE2cNeXMVTBeFQ0Hvjes3VYsE.png',
                                body: `Falta ${IniciarAtk/1000} segundos para enviar ataque.`
                            });
                        })
                        //jafoi = true;
                        //clearInterval(tnt_show_mss);
                    }
                    async function chamarir(){
                        await ir();
                    }
                }
            },1)

        }

    }
    let menortempo = buscarInfo(infoaldeia)
    if(window.location.search == `?village=${villageID}&screen=place&try=confirm`){
        //#### - Verifica onde esta o tempo de viajem
        if(game_data.village.buildings.church_f != undefined && game_data.village.buildings.church_f > 0){
            tables = 9
            tables2 = 8
            //igreja = true;
        }else{
            tables = 7
            tables2 = 6
        }
        if(document.querySelector('.vis').querySelectorAll('tr').length < tables && document.querySelector('.vis').querySelectorAll('tr').length >= tables2){
            let tempo = document.querySelector('.vis').querySelectorAll('tr')[2].querySelectorAll('td')[1].innerText.replace('hoje às ','').split(':');
            total = ((Number(tempo[0])*60+Number(tempo[1]))*60+Number(tempo[2]))*1000;
        }else{
            let tempo = document.querySelector('.vis').querySelectorAll('tr')[3].querySelectorAll('td')[1].innerText.replace('hoje às ','').split(':');
            total = ((Number(tempo[0])*60+Number(tempo[1]))*60+Number(tempo[2]))*1000;
        }

        //#### - Cria os Elementos
        document.querySelector('#content_value').prepend(createEle('div',htmls,'target-select clearfix vis float_left','agatk'))
        document.querySelector('#agatk').style.cssText = 'position: absolute; margin-left: 550px; margin-top:-1px'
        if(menortempo != undefined ? menortempo.idaldeia == villageID && menortempo.sec30 == true : false){
            document.querySelector('.dataCommand').valueAsNumber = (menortempo.horaz+total)-10800000
            $('.dataCommand').prop('disabled',true);
            $('.send').prop("disabled",true);
            time(menortempo);
        }else{
            document.querySelector('.dataCommand').valueAsNumber = (new Date().getTime()-10800000)+total
            $('.cancel').prop("disabled",true);
        }

        //#### - Escuta os botoes
        document.querySelector('.dataCommand').addEventListener("keypress", function(event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                document.querySelector('.send').click();
            }
        });
        document.querySelector('.send').addEventListener('click',function(){
            let timerS = Timing.getCurrentServerTime()
            event.preventDefault()
            let horax = document.querySelector('.dataCommand').valueAsNumber
            let horaz = (horax+10800000)-total
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
                $('.dataCommand').prop('disabled',true);
                $('.send').prop("disabled",true);
                $('.cancel').prop("disabled",false);
                document.querySelector('.send').innerText = 'Salvo'
                let setapoio = false;
                if(document.querySelector('#command-data-form').children[0].innerText.includes('apoio')){
                    setapoio = true;
                }
                let id = 0;
                if(infoaldeia.length > 0){
                   id = infoaldeia[infoaldeia.length-1].id
                   id++
                }
                infoaldeia.push(
                    {
                        id: id,
                        horaz: horaz,
                        idaldeia: villageID,
                        alvo: Number(document.querySelector('.village_anchor').dataset.id),
                        tropas: {
                            lan: Number($('.units-row').find('.unit-item-spear')[0].innerText),
                            esp: Number($('.units-row').find('.unit-item-sword')[0].innerText),
                            bb: Number($('.units-row').find('.unit-item-axe')[0].innerText),
                            spy: Number($('.units-row').find('.unit-item-spy')[0].innerText),
                            cl: Number($('.units-row').find('.unit-item-light')[0].innerText),
                            cp: Number($('.units-row').find('.unit-item-heavy')[0].innerText),
                            ari: Number($('.units-row').find('.unit-item-ram')[0].innerText),
                            cat: Number($('.units-row').find('.unit-item-catapult')[0].innerText),
                            pala: Number($('.units-row').find('.unit-item-knight')[0].innerText),
                            nobre: Number($('.units-row').find('.unit-item-snob')[0].innerText)},
                        apoio: setapoio,
                        NumAtk: Number(document.querySelectorAll('.units-row').length),
                        sec30: false
                    }
                )
                let stringJSON = JSON.stringify(infoaldeia);
                localStorage.setItem(`infoaldeia`, stringJSON)
                time(infoaldeia[infoaldeia.length-1])
            }
        })
        document.querySelector('.cancel').addEventListener('click',function(){
            event.preventDefault()
            infoaldeia.pop()
            clearInterval(intervalo)
            let stringJSON = JSON.stringify(infoaldeia);
            localStorage.setItem(`infoaldeia`, stringJSON)
            $('.dataCommand').prop('disabled',false);
            $('.send').prop("disabled",false);
            $('.cancel').prop("disabled",true);
            document.querySelector('.avisos').innerText = 'Adicione Data e hora.'
            document.querySelector('.send').innerText = 'Salvar'
        })
        document.querySelector('.dataCommand').addEventListener('mouseover',function(){
            if(document.querySelector('.send').attributes[2] == undefined){
                $('.dataCommand').prop('disabled',false);
            }
        })
    }
}
let teste;
setInterval(()=>{
    teste = Timing.getCurrentServerTime()
    //console.log(teste)
},1)
setTimeout(()=>{console.log(new Date(teste))},500)


window.onload = start();
