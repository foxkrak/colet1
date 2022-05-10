let tempo;
let timerS = Timing.getCurrentServerTime()-10800000;
let total;
let horaz;
let horax;
let dataIr;
let decre;

if(document.querySelector('.vis').querySelectorAll('tr').length < 7){
    tempo = document.querySelector('.vis').querySelectorAll('tr')[2].querySelectorAll('td')[1].innerText.split(':');
    total = ((Number(tempo[0])*60+Number(tempo[1]))*60+Number(tempo[2]))*1000;
}else{
    tempo = document.querySelector('.vis').querySelectorAll('tr')[3].querySelectorAll('td')[1].innerText.split(':');
    total = ((Number(tempo[0])*60+Number(tempo[1]))*60+Number(tempo[2]))*1000;
}

(function() {
    setInterval(() =>{
        timerS = Timing.getCurrentServerTime();
        let data = new Date(timerS);
        if(horaz !== null || horaz !== undefined){
            decre = new Date(horaz - timerS)
            document.querySelector('.decres').innerText = `${decre}`
            dataIr = new Date(horaz);
            if(data.getDate() === dataIr.getDate() && data.getMonth() === dataIr.getMonth() && data.getFullYear() === dataIr.getFullYear() && data.getHours() === dataIr.getHours() && data.getMinutes() === dataIr.getMinutes() && data.getSeconds() === dataIr.getSeconds() && data.getMilliseconds() >= dataIr.getMilliseconds()){
                document.querySelector('.avisos').innerText = 'Enviando.'
                window.onload = document.querySelector('#troop_confirm_submit').click();
            }
        }
    })
})();
decre.toLocaleTimeString('pt-BR', { hour12: false, timeZone: 'UTC' });
function html(){
    let html = `<br><td class="opcoestd content-border border-frame-gold-red" style="margin-top: 200px; position: absolute;">
      <table class="vis">
            <tbody>
            <tr>
              <td style="text-align: center; padding-top: 5px; padding-bottom: 2px; width: 290px" class="avisos1" colspan="6"><h3>[Ataque Timer]</h3></td>
            </tr>
            <tr>
              <td style="text-align: center; padding-top: 5px; padding-bottom: 2px; width: 290px" class="decres" colspan="6">`${decre}`</td>
            </tr>
            <tr>
              <td style="text-align: center; padding-top: 5px; padding-bottom: 2px; width: 290px" class="avisos" colspan="6"></td>
            </tr>
            <tr>
              <td style="text-align: center; width: 5px;"><span class="icon header time"></span></td>
              <td colspan="2" style="text-align: center; width: 5px;"><h5><input type="datetime-local" class="data" step="1" style="width: auto; height: 20px; font-size: 15px;"></input></h5></td>
            </tr>
            <tr>
              <td colspan="6" style="text-align: center; padding: 10px; width: 270px"><button class="send btn" style="margin-right: 10px;">Salvar</button></td>
              <span style="float: right; font-size: xx-small; font-weight: normal;">Updated by WFox: v1.6</span>
            </tr>
            </tbody>
      </table>
        </td>`
    return html;
}
document.querySelector('#content_value').appendChild(createEle('div','atackauto'))
document.querySelector('.atackauto').innerHTML = html();
document.querySelector('.data').valueAsNumber = timerS;

document.querySelector('.send').addEventListener('click',function(){
    horax = document.querySelector('.data').valueAsNumber+10800000
    horaz = horax-total
    console.log(new Date(horaz))
    if(horax === ''){
        document.querySelector('.avisos').innerText = 'Precisa por um horario de Chegada';
        return;
    }
    if(timerS > horaz){
        console.log('Já passou o tempo.')
        horaz = null;
        document.querySelector('.avisos').innerText = 'Ja passou do tempo.'
    }else if(timerS < horaz){
        document.querySelector('.avisos').innerText = 'Aguardando'
        document.querySelector('.send').innerText = 'Salvo'
        $('.send').prop("disabled",true);
    }
})

function createEle(ele,clas){
    let EleCriado = document.createElement(ele);
    if(clas !== undefined) EleCriado.classList = clas;
    return EleCriado;
}
