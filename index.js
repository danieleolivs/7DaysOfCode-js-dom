let nome = document.getElementById('name')
let data = document.getElementById('birth-date')
let nomeNovo = document.getElementById('name-novo')
let dataNovo = document.getElementById('birth-date-novo')
let button = document.getElementById('salvar')
let $form = document.querySelector('.form')
let $edit = document.querySelector('.edit')
const $popup = document.querySelector('.edita')  
const $excluir = document.querySelector('.excluir-div')  

let pessoas = {
    datas:[
        {
            id:Date.now(),
            nome:'Daniele',
            aniversario:'11-04-2002'
        },
    ],

    lerData(){
        pessoas.datas.forEach(({id, nome, aniversario}) => {
            pessoas.adicionaDados({id, nome:nome, aniversario:aniversario}, true)

        })
    },

    adicionaDados(dados, htmlOnly = false){
        let idInterno = Date.now()

        if(!htmlOnly){
            pessoas.datas.push({
                id: dados.id || idInterno,
                nome:dados.nome,
                aniversario: dados.aniversario
            })
        }
    
        const $aniversarios = document.querySelector('.aniversarios')

        $aniversarios.insertAdjacentHTML('beforeend', `<li class="${idInterno}" data-id="${idInterno}">
            <button class="edit">Editar</button> 
            <button class="excluir">Excluir</button> 
            <span class='nome-result'> Nome: </span> <span class='result'> ${dados.nome} </span> <span> Data: </span> <span class='result'>${dados.aniversario}</span>
        </li>`)
    },

    popEditaDados(id){
        let $edita = document.querySelector('#alterar')
        let $fechar = document.querySelector('#fechar')

        
        if($edita){
            $edita.addEventListener('click', function dados(infosDoEvento) {
                infosDoEvento.preventDefault()
                pessoas.editaDados({nome:nomeNovo.value, aniversario:dataNovo.value, id})
            })
        }

        if($fechar){
            $fechar.addEventListener('click', function dados(infosDoEvento) {
                infosDoEvento.preventDefault()
                $popup.classList.add('remove')
            })
            
        }
        
    },

    editaDados(dados){
        const atualizado = pessoas.datas.find((dia) => {
            return dia.id == Number(dados.id)
        })

        atualizado.nome = dados.nome || nome.value
        atualizado.aniversario = dados.aniversario
        atualizado.id = Number(dados.id) + 1
        $popup.classList.add('remove')
        
        let id = dados.id
        let classe = document.querySelector(`li[class='${id}']`)
        classe.classList.add('remover')

        pessoas.adicionaDados({nome:atualizado.nome, aniversario:atualizado.aniversario, id:atualizado.id})


    },

    removeData(dados){
        const novaLista = pessoas.datas.filter((listaAtual) => {
            return listaAtual.id !== Number(dados)
        })

        let id = dados

        pessoas.datas = novaLista
       
        let classe = document.querySelector(`li[class='${id}']`)
        classe.classList.add('remover')
    },

}

pessoas.lerData()


$form.addEventListener('submit', function dados(infosDoEvento) {
    infosDoEvento.preventDefault()

    pessoas.adicionaDados({nome:nome.value, aniversario:data.value})
    
})

document.querySelector(".aniversarios").addEventListener('click', function(infosDoEvento) {
    let pessoa = infosDoEvento.target
    let dados = pessoa.classList.contains('edit');
    
    if(dados){
        let informacoes = pessoa.parentNode.getAttribute('data-id')
        pessoas.popEditaDados(informacoes)
        $popup.classList.remove('remove')
    }

})

document.querySelector('.aniversarios').addEventListener('click', function(infosDoEvento) {
    let pessoa = infosDoEvento.target
    let dados = pessoa.classList.contains('excluir')

    if(dados){
    
        let informacoes = pessoa.parentNode.getAttribute('data-id')

        $excluir.classList.remove('remove-excluir')

        document.querySelector('.excluir-div').addEventListener('click', function(infosDoEvento){
            let dado = infosDoEvento.target;
            let sim = dado.classList.contains('sim')
            let nao = dado.classList.contains('nao')
            console.log(sim, nao)

            if(sim){
                pessoas.removeData(informacoes)
                $excluir.classList.add('remove-excluir')
            }
            else if(nao){
                $excluir.classList.add('remove-excluir')
            }
            else{
                alert('Operação Inválida!')
            }
        })

    }
})