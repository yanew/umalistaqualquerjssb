let form = document.querySelector("form");
let container = document.querySelector("#container");
let inputItem = document.querySelector("#inputItem");
let botaoAdicionar = document.querySelector("#botaoAdicionar");
let cartaoItem = document.querySelector("#cartaoItem");
let listaItens = document.querySelector("#listaItens");

let inputItemTemp;

const renderItens = async () => {
    const uri = `http://localhost:8080/usuario/${sessionStorage.idUsu}`;
    const res = await fetch(uri);
    const usuario = await res.json();
    
    let template = '';
        usuario.listaItens.forEach(item => {
            template+= `
            <div id="div${item.id}" class="item">
                <div id="painelTexto${item.id}" class="painelTextoItem">
                    <span id="textoItem${item.id}" class="textoItem">${item.conteudo}</span>
                </div>
                <div id="painelBotoes${item.id}" class="painelBotoes">
                    <a id="linkEditar${item.id}" class="link" onClick="selecionarItemParaEdicao(event)">
                        <img id="imgEditar${item.id}" src="./edit.png" width="20" height="20"/>
                    </a>
                    <a id="linkRemover${item.id}" class="link" onClick="removerItem(event)">
                        <img id="imgRemover${item.id}" src="./lixeira.png" width="20" height="20"/>
                    </a>
                </div>
            </div> `
        })

    cartaoItem.innerHTML = template;

}

window.addEventListener('DOMContentLoaded', () => renderItens());

const atualizarUsuario = async () =>{

    const uri = `http://localhost:8080/usuario/${sessionStorage.idUsu}`;   
    const res = await fetch(uri);
    const usuario = await res.json();

    const novoItem = {conteudo: form.inItem.value}
    const listaAtualizada = {listaItens:[...usuario.listaItens, novoItem]}

    const usuarioTemp = {...usuario, ...listaAtualizada}

    await fetch(uri,{
        method: 'PUT',
        body: JSON.stringify(usuarioTemp),
        headers: {'Content-Type': 'application/json'}
    });

    window.location.replace('index.html');

}

/*const criarItem = async () =>{
    const doc = {
        conteudo: form.inItem.value,
        idUsuario: sessionStorage.idUsu
    }

    alert(JSON.stringify(doc));

    await fetch('http://localhost:8080/item',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    });
}*/

const editarItem = async (id) => {
    const doc = {
        conteudo: form.inItem.value,
        idUsuario: sessionStorage.idUsu
    }

    await fetch(`http://localhost:8080/item/${id}`,{
        method: 'PUT',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    });

    window.location.replace('index.html');
}

const deleteItem = async (id) => {
    await fetch(`http://localhost:8080/item/${id}`,{
        method: 'DELETE'
    });
}

const adicionarItem = async () => {
    await atualizarUsuario();
    await renderItens();
}

function selecionarItemParaEdicao(event){
    const targetId = event.target.id;
    const id = targetId.substr('imgEditar'.length, targetId.length-1);
    inputItemTemp = document.querySelector("#textoItem"+id);
    inputItem.value = inputItemTemp.textContent;
    let element = document.querySelector("#botaoAdicionar");
    element.textContent = "Atualizar";
    element.onclick=atualizarItem;
}

function atualizarItem(){
    const id = inputItemTemp.id.substr('textoItem'.length, inputItemTemp.id.length-1);
    editarItem(id);
    inputItemTemp.textContent = inputItem.value;
    let element = document.querySelector("#botaoAdicionar");
    element.textContent = "Adicionar";
    element.onclick=adicionarItem;
}

function removerItem(event){
    const targetId = event.target.id;
    const id = targetId.substr('imgRemover'.length, targetId.length-1);
    let itemTemp = document.querySelector("#div"+id);
    itemTemp.remove();
    deleteItem(id);
}