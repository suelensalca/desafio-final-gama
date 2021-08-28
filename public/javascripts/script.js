// @ts-nocheck

let cpf = document.getElementById('cpf')
let nome = document.getElementById('nome')
let cargo = document.getElementById('cargo')
let data_nascimento = document.getElementById('data_nascimento')
let estado_civil = document.getElementById('estado_civil')
let sexo = document.getElementById('sexo')
let cep = document.getElementById('cep')
let endereco = document.getElementById('endereco')
let bairro = document.getElementById('bairro')
let cidade = document.getElementById('cidade')
let estado = document.getElementById('estado')
let telefone_fixo = document.getElementById('telefone_fixo')
let celular = document.getElementById('celular')
let email = document.getElementById('email')
let identidade = document.getElementById('identidade')
let possui_veiculo = document.getElementById('possui_veiculo')
let possui_habilitacao = document.getElementById('possui_habilitacao')
let submit = document.getElementById('submit')
let formulario = document.getElementById('formulario')

const limparFormulario = () => {
    endereco.value = '';
    bairro.value = '';
    cidade.value = '';
    estado.value = '';
}

const preencherFormulario = (enderecoJson) => {
    endereco.value = enderecoJson.logradouro;
    bairro.value = enderecoJson.bairro;
    cidade.value = enderecoJson.localidade;
    estado.value = enderecoJson.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cepValue) => cepValue.length == 8 && eNumero(cepValue);

const pesquisarCep = async() => {
    limparFormulario();
    
    const cepValue = cep.value;
    const url = `http://viacep.com.br/ws/${cepValue}/json/`;
    
    if (cepValido(cepValue)) {
        const dados = await axios.get(url);
        const enderecoJson = await dados.data;
        
        if (enderecoJson.hasOwnProperty('erro')){
            endereco.value = 'CEP não encontrado!';
        }else {
            preencherFormulario(enderecoJson);
        }
    } else {
        endereco.value = 'CEP incorreto!';
    }
}

const validarCPF = () => {

    let cpfValue = cpf.value;
    let result = true;

    if(cpfValue.length != 11) {
        result = false
    } else {
        var numeros = cpfValue.substring(0, 9)
        var digitos = cpfValue.substring(9)
        
        var soma = 0
        for(var i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i
        }

        var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

        // validação do primeiro dígito
        if(resultado != digitos.charAt(0)) {
            result = false
        }

        soma = 0
        numeros = cpfValue.substring(0, 10)

        for (var k = 11; k > 1; k--) {
            soma += numeros.charAt(11 - k) * k
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

        // validação do segundo dígito
        if(resultado != digitos.charAt(1)) {
            result = false
        }

        if(result == false){
            alert('CPF inválido');
            cpf.value = ''
        }

        return result;
    }
}

const enviarDados = async(event) => {
    event.preventDefault();

    const url = "./api/inserir-candidato";
    const data = {
       'cpf': cpf.value, 
       'nome': nome.value, 
       'cargo': cargo.value, 
       'data_nascimento': data_nascimento.value, 
       'estado_civil': estado_civil.value, 
       'sexo': sexo.value, 
       'cep': cep.value, 
       'endereco': endereco.value, 
       'bairro': bairro.value, 
       'cidade': cidade.value, 
       'estado': estado.value, 
       'telefone_fixo': telefone_fixo.value, 
       'celular': celular.value, 
       'email': email.value, 
       'identidade': identidade.value, 
       'possui_veiculo': possui_veiculo.value, 
       'possui_habilitacao': possui_habilitacao.value, 
    }

    axios.post(url, data)
    .then(response => {
        console.log(response);
        formulario.reset();
        alert(`Candidato cadastrado com sucesso!`);

    })
    .catch(error => {
        let details = ""
        if( error.response ){
            details = error.response.data.data.detail;
            console.log(error.response.data);
        }
        alert(`Houve um erro ao cadastrar\n${details}`);
    });
}

formulario.addEventListener('submit', enviarDados);
cep.addEventListener('focusout', pesquisarCep);
cpf.addEventListener('focusout', validarCPF);
