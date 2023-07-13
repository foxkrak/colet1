let listaBranca = {
lista: [{nome: 'foxkrak', senha: 123},{nome: 'lol', senha: 321}]
}
function validar(nome,senha){
    for (const i of listaBranca.lista) {
        if(i.nome == nome){
            if(i.senha == senha){
                console.log('Logado')
            }
        }
    }
}
