
document.addEventListener('DOMContentLoaded', () => {
  const campos = {
    nome: {
      value: document.getElementById('nomecad'),
      validar: valor => valor.value.trim().length < 3,
      mensagem: "Nome deve ter pelo menos 3 caracteres!"
    },

    cpf: {
      value: document.getElementById('cpfcad'),
      validar: valor => valor.value.trim() === "" || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor.value),
      mensagem: "Por favor, digite um CPF válido. 000.000.000-00"
    },

    email: {
      value: document.getElementById('emailcad'),
      validar: valor => valor.value.trim() === "" || !valor.value.includes('@'),
      mensagem: "Digite um email válido!"
    },

    telefone: {
      value: document.getElementById('telefonecad'),
      validar: valor => valor.value.trim() === "" || valor.value.replace(/\D/g, '').length !== 11,
      mensagem: "Digite um número válido"
    },

    endereco: {
      value: document.getElementById('enderecocad'),

      validar: valor => valor.value.trim().length < 7,
      mensagem: "É necessario informar o endereço!"
    },
    cep: {
      value: document.getElementById('cepcad'),

      validar: valor => valor.value.trim() === "" || !/^\d{5}-\d{3}$/.test(valor.value),
      mensagem: "É necessário informar o CEP! Formato: 00000-000"
    },
    cidade: {
      value: document.getElementById('cidadecad'),
      validar: valor => valor.value.trim().length < 4,
      mensagem: "Informe o nome da sua cidade"
    },

    estado: {
      value: document.getElementById('estadocad'),
      validar: valor => valor.value.trim().length < 2,
      mensagem: "Informe seu estado!"
    }
  }


  const form = document.getElementById('form-cadastro');
  const mensagemError = document.getElementById('mensagem');
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      mensagemError.innerHTML = "";

      for (let i in campos) {
        const campo = campos[i];

        // Como estamos no DOMContentLoaded, campo.value não deve ser null. 
        // Se for, é um erro grave de ID no HTML.
        if (!campo.value) {
          console.error(`Erro crítico o elemento ${i} não se faz presento no HTML/null`);
          mensagemError.innerHTML = "Desculpa, acabei tendo um erro interno!!"
          mensagemError.style.color = "red";
          return;
        }

        // Chama a função de validação
        if (campo.validar(campo.value)) {
          mensagemError.innerHTML = campo.mensagem;
          mensagemError.style.color = "red";
          campo.value.focus(); 
          return;
        }
      }


      mensagemError.innerHTML = "Formulário válido! Enviado com sucesso!";
      mensagemError.style.color = "green";


      form.reset();


      form.submit();

    });
  }
});