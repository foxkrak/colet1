try{
    // Variaveis
    let aldeiasDisp = Number($('#plunder_list').find('tr').length)
    let tropasDisp = false;
    let arr = [];
    let id = game_data.village.id
    let tempreload = reload*60*1000

    // funções

    function encaminhar(){
        if(integrar){
            setTimeout(()=>{
                window.location.href = `/game.php?village=${id}&screen=main`
            },aleatorio(1000,2000))
        }else{
            setTimeout(()=>{
                window.location.reload();
            },aleatorio(tempreload,tempreload+(reload*60*1000)))
        }
    }

    function aleatorio(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a
    }

    function tropasdiponiveis(){
        if(Number(document.querySelector('#spy').innerText) >= spy && Number(document.querySelector('#light').innerText) >= cl){
            tropasDisp = true;
        }else{
            tropasDisp = false;
        }
    }
    function começar(){
        for(let i = 2; i < aldeiasDisp ;i++){
            if($('#plunder_list').find('tr')[i].style.display != 'none'){
                let aldeia1 = $('#plunder_list').find('tr')[i].children[5];
                let recurso = 0;
                for(let y = 0; aldeia1.children.length > y;y++){
                    recurso += Number(aldeia1.children[y].innerText.replace('.',''))
                }
                if(recurso >= recur){
                    arr.push($('#plunder_list').find('tr')[i].children[8].children[0])
                }
            }
        }
        let interv = setInterval(()=>{
            console.log(arr)
            tropasdiponiveis();
            if(tropasDisp){
                let aldeia = arr.shift();
                if(aldeia != undefined){
                    aldeia.click()
                }
            }else{
                console.log('Sem tropas')
                encaminhar()
                clearInterval(interv);
            }
            if(arr.length == 0){
                clearInterval(interv);
                encaminhar()
            }

        },aleatorio(300,500))
        }
    começar();
}
catch{
    console.log('Error')
}
