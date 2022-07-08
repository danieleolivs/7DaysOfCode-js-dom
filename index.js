let nome = document.getElementById('name')
let data = document.getElementById('birth-date')
let button = document.getElementById('salvar')

button.addEventListener('click', () => setTimeout(dados(), 5000))

function dados(){
    console.log(nome.value)
    console.log(data.value)
}
