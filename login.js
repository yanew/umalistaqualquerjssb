let form = document.querySelector("form");
let inputLogin = document.querySelector("#login");
let inputSenha = document.querySelector("#senha");

const uri = "http://localhost:8080/usuario";

const conferirUsuario = async () => {
    
    const res = await fetch(uri);
    const usuarios = await res.json();

    let usu = {
        id:"",
        login: "",
        senha: "",
        nome: ""
    };

    usuarios.content.forEach(usuario =>{
        if((usuario.login==form.login.value)&&(usuario.senha==form.senha.value)){
            usu = {
                id: usuario.id,
                login: usuario.login,
                senha: usuario.senha,
                nome: usuario.nome
            }
        }
    });

    if(form.login.value===usu.login&&form.senha.value===usu.senha){
        guardarIdUsuarioSessionStorage(usu.id);
        location.href = "http://127.0.0.1:5500/index.html";
    }else{
        alert('tente de novo');
    }


    return valido;
}

const guardarIdUsuarioSessionStorage = (idUsuario) => {
    sessionStorage.idUsu = idUsuario;
}

const logar = async () =>{
   await conferirUsuario();
}