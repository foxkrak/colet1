let listaBranca = {
lista: [{nome: 'foxkrak', senha: '1993'},{nome: 'winx', senha: 'winx3301'},{nome: 'staff', senha: 'staffwinx22'}]
}
validar(login,senha)
function validar(nome,senha){
    for (const i of listaBranca.lista) {
        if(i.nome == nome){
            if(i.senha == senha){
                console.log('Logado')
                return 'https://foxkrak.github.io/foxkrakScripts/autoup.js'
            }
        }
    }
}
