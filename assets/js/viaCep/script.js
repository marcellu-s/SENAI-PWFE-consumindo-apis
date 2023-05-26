// Seleção de elementos
const form = document.querySelector('.via-cep-area form');
const cepInput = document.querySelector('.via-cep-area #cep');

const inputLogradouro = document.querySelector('#logradouro');
const inputBairro = document.querySelector('#bairro');
const inputCidade = document.querySelector('#cidade');
const inputUF = document.querySelector('#uf');

async function getAddressData(cep) {
    /**
     * Realiza a requisição para a API ViaCEP
     * @param cep CEP a ser consultado
     * @return Dados retornados da API com base no CEP
     */

    // Resposta da requisição
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    // Convertendo em JSON
    try {

        var data = await response.json();

    } catch (error) {

        window.alert('ERRO na requisição da API ViaCEP!');
        return false;
    }

    // Retornando os dados
    return data;
}

async function showAddressData(cep) {
    /**
     * Aplica os dados obtidos no Front-end
     * @param cep CEP a ser consultado
     */

    // Fazendo a requisição para a função de consulta e recebendo os dados 
    const data = await getAddressData(cep);

    if (data === false) {
        return;
    }

    // Aplicando os dados ao Front-end

    inputLogradouro.value = data.logradouro;
    inputBairro.value = data.bairro;
    inputCidade.value = data.localidade;
    inputUF.value = data.uf;
}

form.addEventListener('submit', (event) => {
    /**
     * Evento para previnir o envio do formulário e captar o valor do input CEP
     * @param event Evento de submit do formuãrio
     */

    // Previnir o disparo do evento
    event.preventDefault();


    // Validação do CEP

    if (cepInput.value == '') {

        window.alert('Informe um CEP!');
        return;
    }

    const cep = cepInput.value.replace(/[^0-9]/gm, '');

    if (cep == '' || cep.length < 8) {

        window.alert('Informe um CEP válido!');
        return;
    }

    // Realizar consulta

    showAddressData(cep);
})