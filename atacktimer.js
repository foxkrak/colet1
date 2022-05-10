let tempo;
let data;
let datax;
let horax;
let hora = $('#serverTime').text();
let dat = $('#serverDate').text().split('/');
if(document.querySelector('.vis').querySelectorAll('tr').length < 7){
    tempo = document.querySelector('.vis').querySelectorAll('tr')[2].querySelectorAll('td')[1].innerText.split(':');
}else{
    tempo = document.querySelector('.vis').querySelectorAll('tr')[3].querySelectorAll('td')[1].innerText.split(':');
}
function calcH(horaxs){
    let h = horaxs.split(':');
    console.log(h,horaxs);
    let horaz = parseInt(h[0])-parseInt(tempo[0]);
    console.log(horaz);
    let minut = parseInt(h[1]-tempo[1]);
    let seg = parseInt(h[2]-tempo[2]);
    if(seg<0){
        minut -= 1
        seg += 60
    }
    if(minut<0){
        horaz -= 1;
        minut += 60;
    }
    if(horaz<0){
        horaz += 24
    }
    if(seg===0){seg = '00'}
    if(minut===0){minut = '00'}
    if(horaz===0){horaz = '00'}
    let conta = `${horaz}:${minut}:${seg}`
    console.log(conta);
    return conta;
}
(function() {
    setInterval(async () =>{
        hora = $('#serverTime').text()
        dat = $('#serverDate').text().split('/');
        data = new Date(dat[2],dat[1]-1,dat[0],hora[0],hora[1],hora[2])
        if(datax === `${dat[2]}-${dat[1]}-${dat[0]}`){
            if(horax !== undefined && tempo !== undefined || tempo !== null){
                let horacalc = calcH(horax).split(':');
                let horad = hora.split(':');
                if(horad[0] > horacalc[0]){
                    return;
                }else if(horad[0] === horacalc[0]){
                    if(horad[1] > horacalc[1]){
                        return;
                    }else if(horad[1] === horacalc[1]){
                        if(horad[2] > horacalc[2]){
                            return;
                        }else{
                            if(hora === calcH(horax)){
                                document.querySelector('.avisos').innerText = 'Enviando.'
                                window.onload = document.querySelector('#troop_confirm_submit').click();
                            }
                        }
                    }
                }
            }
        }
    },100)
})();

function html(){
    let html = `<br><td class="opcoestd content-border border-frame-gold-red" style="margin-top: 200px; position: absolute;">
      <table class="vis">
            <tbody>
            <tr>
              <td style="text-align: center; padding-top: 5px; padding-bottom: 2px; width: 290px" class="avisos1" colspan="6"><h3>[Ataque Timer]</h3></td>
            </tr>
            <tr>
              <td style="text-align: center; padding-top: 5px; padding-bottom: 2px; width: 290px" class="avisos" colspan="6"></td>
            </tr>
            <tr>
              <td style="text-align: center; width: 5px;"><span class="icon header time"></span></td>
              <td class="tempoD" colspan="2" style="text-align: center"><h5>Data:</h5></td>
              <td style="text-align: center; width: 5px;"><h5><input type="date" class="data" style="width: 90px"></input></h5></td>
            </tr>
            <tr>
              <td style="text-align: center;"><span class="icon header time"> </span></td>
              <td class="madeira" colspan="2" style="text-align: center; width: 60px;"><h5>Horario:</h5></td>
              <td style="text-align: center; width: 5px;"><input class="timex" type="time" step="1" style="width: 90px"></td>
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
document.querySelector('.data').value = `${dat[2]}-${dat[1]}-${dat[0]}`;

document.querySelector('.send').addEventListener('click',function(){
    horax = document.querySelector('.timex').value
    if(horax === ''){
        document.querySelector('.avisos').innerText = 'Precisa por um horario de Chegada';
        return;
    }
    let horacalc = calcH(horax).split(':');
    let horad = hora.split(':');
    if(horacalc[0] === '00'){horacalc[0] = '24'}
    if(horad[0] > horacalc[0]){
        document.querySelector('.avisos').innerText = 'A hora de chegada tem que ser maior que o tempo de viagem das tropas!'
        console.log('A hora de chegada tem que ser maior que o tempo de viagem das tropas!');
    }else if(horad[0] === horacalc[0]){
        if(horad[1] > horacalc[1]){
            document.querySelector('.avisos').innerText = 'A hora de chegada tem que ser maior que o tempo de viagem das tropas!'
            console.log('A hora de chegada tem que ser maior que o tempo de viagem das tropas!');
        }else if(horad[1] === horacalc[1]){
            if(horad[2] > horacalc[2]){
                document.querySelector('.avisos').innerText = 'A hora de chegada tem que ser maior que o tempo de viagem das tropas!'
                console.log('A hora de chegada tem que ser maior que o tempo de viagem das tropas!');
            }
        }
    }else{
        datax = document.querySelector('.data').value
        if(datax >= `${dat[2]}-${dat[1]}-${dat[0]}`){
            document.querySelector('.avisos').innerText = 'Aguardando'
            document.querySelector('.send').innerText = 'Salvo'
            $('.send').prop("disabled",true);
        }else{
            document.querySelector('.avisos').innerText = 'Data ja passou!'
            console.log('Data ja passou!')
        }

    }
})

function createEle(ele,clas){
    let EleCriado = document.createElement(ele);
    if(clas !== undefined) EleCriado.classList = clas;
    return EleCriado;
}
