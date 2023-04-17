if(window.history.replaceState){
    window.history.replaceState(null, null)
}

const form1 = document.querySelector('#CADASTRAR');
const nameInput = document.querySelector("#nome");
const cpfInput = document.querySelector("#CPF");
const emailInput = document.querySelector("#email");

const createStyle = document.getElementById("CREATE").style;
const nameStyle = document.getElementById("nome").style;
const emailStyle = document.getElementById("email").style;
const cpfStyle = document.getElementById("CPF").style;

const inputs = document.querySelectorAll("input");

// botao adicionar

const btnAdd = document.getElementById('icon-add');

function addPP(){
    if(createStyle.display != 'block'){
        createStyle.display = 'block';
    }else{
        createStyle.display = 'none';
    };
};

btnAdd.addEventListener('click', (event) => {
    addPP();
});

// validar inputs

function validarNome(){
    let nameRegex = /^(?!\s)[a-zA-Z\s]{1,20}$/g;
    let resultsName = nameRegex.test(nameInput.value);

    let msg = document.getElementById("name-error");

    if(nameInput.value === ""){
        msg.style.display = "block";
        msg.innerHTML = "Campo obrigatório*";
        nameStyle.borderColor = "red";
        return false;
    }else if(resultsName === false){
        msg.style.display = "block";
        msg.innerHTML = "Tem certeza que esse é seu nome?!";
        nameStyle.borderColor = "red";
        return false;
    }else{
        msg.style.display = "none";
        msg.innerHTML = "";
        nameStyle.borderColor = "green";
        return true; 
    };
};

function validarCPF(){
    let cpfRegex = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/g;
    let resultsCpf = cpfRegex.test(cpfInput.value);

    let msg = document.getElementById("cpf-error");

    if(cpfInput.value == ""){
        msg.style.display = "block";
        msg.innerHTML = "Campo obrigatório*";
        cpfStyle.style.borderColor = "red";
        return false;
    }else if(resultsCpf === false){
        msg.style.display = "block";
        msg.innerHTML = "CPF é invalido!*";
        cpfStyle.borderColor = "red";
        return false;
    }else{
        msg.style.display = "none";
        msg.innerHTML = "";
        cpfStyle.borderColor = "green";
        return true;
    };
};

function validarEmail(){

    let emailRegex = /^(?!\.)([a-z0-9\.\-\_]{2,20})@([a-z0-9]{1,61})\.([a-z0-9\-\_]{2,61})([a-z0-9\-\.\_]{1,61})?(?<=[a-z]$)$/gi;
    let resultsEmail = emailRegex.test(emailInput.value);

    let msg = document.getElementById("email-error");

    if(emailInput.value == ""){
        msg.style.display = "block";
        msg.innerHTML = "E-mail é obrigatório*";
        emailStyle.borderColor = "red";
        return false;
    };
    if(resultsEmail === false){
        msg.style.display = "block";
        msg.innerHTML = "E-mail é invalido!*";
        emailStyle.borderColor = "red";
        return false;
    }else{
        msg.style.display = "none";
        msg.innerHTML = "";
        emailStyle.borderColor = "green";
        return true;
    };

};



inputs[2].addEventListener("input", (event) =>{
    validarNome();
});

inputs[3].addEventListener("input", (event) =>{
    validarCPF();
});

inputs[4].addEventListener("input", (event) =>{
    validarEmail();
});


form1.addEventListener("submit", (event) => {
    event.preventDefault();

    if(validarNome() && validarEmail() && validarCPF()){
        form1.submit();
    };

    nameInput.value = '';
    cpfInput.value = '';
    emailInput.value = '';

});