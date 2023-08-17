let it = true;
let ligado = false;
let intervalo;
let entrou = false;
let arr = [{res:0,tempo:0},{res:0,tempo:0},{res:0,tempo:0},{res:0,tempo:0}];
let html = `
<h4>Auto Coletar</h4>
<table style="width: 100%">
  <tbody style="text-align: center">
    <tr>
      <td class="avisos" colspan="2" style="padding: 7px; width: 200px; font-weight: bold;">Parado</td>
    </tr>
    <tr>
    <td style="width: 90px">Média Diária:</td><td style="width: 80px"><span style="margin-right:5px; float: left;" class="total icon header ressources"></span><span class="media" style="font-weight: bold;">0</span></td>
    </tr>
    <tr>
    <td style="padding-top: 10px; padding-bottom: 10px"><button class="btn iniciar">Iniciar</button></td><td style="padding-top: 10px; padding-bottom: 10px"><button class="btn parar">Parar</button></td>
    </tr>
    <tr>
    <td colspan="2">
    <span style="float: left; font-size: xx-small; font-weight: normal; padding-top: 10px;"><a href="#" class="donate">Donate</a></span>
    </td>
    </tr>
  </tbody>
<table>
`
document.querySelector('.shadedBG').appendChild(createEle('div',html,'vis content-border','colets'))
document.querySelector('#colets').style.cssText = `margin-top: 200px; position: absolute; display: block`
$('.iniciar').prop('disabled',true);
$('.parar').prop('disabled',true);

if(JSON.parse(localStorage.getItem(`Media-${game_data.village.id}`)) != null){
    let media = JSON.parse(localStorage.getItem(`Media-${game_data.village.id}`))
    document.querySelector('.media').innerText = media.toLocaleString('pt-BR');
}

if(JSON.parse(localStorage.getItem('Ligado-Coleta')) != null){
    ligado = JSON.parse(localStorage.getItem('Ligado-Coleta'))
}else{
    let stringJSONip = JSON.stringify(ligado);
    localStorage.setItem('Ligado-Coleta', stringJSONip);
}
aviso();
function aviso(){
    if(ligado == false){
        document.querySelector('.avisos').innerText = 'Parado'
        document.querySelector('.avisos').style.cssText = "padding: 7px; width: 200px; font-weight: bold;"
    }else{
        document.querySelector('.avisos').innerText = 'Rodando'
        document.querySelector('.avisos').style.cssText = "padding: 7px; width: 200px; font-weight: bold; color: green;"
    }
}

function twcheese1(){
    javascript: (window.TwCheese && TwCheese.tryUseTool('ASS')) || $.ajax('https://cheesasaurus.github.io/twcheese/launch/ASS.js?' +~~((new Date())/3e5),{cache:1,dataType:"script"});void 0;
}
twcheese1();

function createEle(ele,texto = '',clas,id){
    let EleCriado = document.createElement(ele);
    EleCriado.innerHTML = texto;
    if(clas !== undefined) EleCriado.classList = clas;
    if(id !== undefined) EleCriado.id = id;
    return EleCriado;
}

function media(i){
    return new Promise((resolve) => {
        let arr = document.querySelectorAll('.duration')[i].innerText.split(':')
        let res = Number(document.querySelectorAll('.wood-value')[i].innerText.replace('.',''))+Number(document.querySelectorAll('.stone-value')[i].innerText.replace('.',''))+Number(document.querySelectorAll('.iron-value')[i].innerText.replace('.',''))
        let h = Number(arr[0])*60*60;
        let m = Number(arr[1])*60;
        let s = Number(arr[2]);
        let ss = h+m+s;
        let coletas = {res: res,tempo: ss}
      resolve(coletas);
    })
}
const timer = (ms) => {
    return new Promise(res => setTimeout(res, ms))
}
async function start(){
        const coletasdisponiveis = document.querySelectorAll('.scavenge-option').length - document.querySelectorAll('.lock').length
        if(document.querySelectorAll('.free_send_button').length == coletasdisponiveis){
            twcheese1();
            while(document.querySelectorAll('.free_send_button').length-1 >= 0){
                const btn = document.querySelectorAll('.free_send_button').length-1
                if(document.querySelector('#loading_content').style.display == 'none'){
                    if(document.querySelectorAll('.unitsInput')[0].value + document.querySelectorAll('.unitsInput')[1].value + document.querySelectorAll('.unitsInput')[2].value +
                       document.querySelectorAll('.unitsInput')[3].value + document.querySelectorAll('.unitsInput')[4].value + document.querySelectorAll('.unitsInput')[5].value > 10){
                        const resultado = await media(btn);
                        arr[btn].res = resultado.res
                        arr[btn].tempo = resultado.tempo
                        console.log(resultado)
                        window.onload = document.querySelectorAll('.free_send_button')[btn].click();
                    }else{
                        mediageral();
                    }
                }
                await timer(300)
            }
            mediageral();
            console.log(arr)
        }
}
function mediageral(){
    const maiortemp = Math.max(arr[0].tempo,arr[1].tempo,arr[2].tempo,arr[3].tempo);
    const qtx = Math.round(86400/maiortemp)
    const totalres = arr[0].res + arr[1].res + arr[2].res + arr[3].res
    const mediag = totalres * qtx
    const stringJSONip = JSON.stringify(mediag);
    localStorage.setItem(`Media-${game_data.village.id}`, stringJSONip);
    document.querySelector('.media').innerText = mediag.toLocaleString('pt-BR');
    clearInterval(intervalo);
}

document.querySelector('.iniciar').addEventListener('click',function(){
    event.preventDefault()
    ligado = true;
    let stringJSONip = JSON.stringify(ligado);
    localStorage.setItem('Ligado-Coleta', stringJSONip);
    $('.iniciar').prop('disabled',true);
    $('.parar').prop('disabled',false);
    aviso();
})
document.querySelector('.parar').addEventListener('click',function(){
    event.preventDefault()
    ligado = false;
    let stringJSONip = JSON.stringify(ligado);
    localStorage.setItem('Ligado-Coleta', stringJSONip);
    $('.parar').prop('disabled',true);
    $('.iniciar').prop('disabled',false);
    aviso();
})

setInterval(()=>{
    if(ligado){
        $('.iniciar').prop('disabled',true);
        $('.parar').prop('disabled',false);
        aviso();
        let coletasdisponiveis = document.querySelectorAll('.scavenge-option').length - document.querySelectorAll('.lock').length
        if(document.querySelectorAll('.free_send_button').length == coletasdisponiveis){
            //console.log('estou pronto')
            start();
        }
    }else{
        $('.iniciar').prop('disabled',false);
        $('.parar').prop('disabled',true);
        aviso();
    }
},500)
