document.addEventListener('DOMContentLoaded', () => {
  const campos = {
    nome: {
      value: document.getElementById('nomecad'),
      // A validação usa '||' (OU) para verificar se o valor é null (só para extrema segurança, mas não deve acontecer aqui) OU se o comprimento é insuficiente.
      validar: valor => !valor || valor.value.trim().length < 3,
      mensagem: "Nome deve ter pelo menos 3 caracteres.!"
    },

    cpf: {
      value: document.getElementById('cpfcad'),
      // Se o campo estiver vazio, !/regex/.test("") será TRUE, então a validação de vazio já funciona aqui.
      validar: valor => valor || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor.value),
      mensagem: "Por favor, digite um CPF válido. 000.000.000-00"
    },

    email: {
      value: document.getElementById('emailcad'),
      // Se o campo estiver vazio, !valor.value.includes('@') será TRUE.
      validar: valor => !valor || !valor.value.includes('@'),
      mensagem: "digite um email válido!"
    },

    telefone: {
      value: document.getElementById('telefonecad'),
      // Se o campo estiver vazio, length será 0. 0 !== 11 é TRUE.
      validar: valor => !valor || valor.value.replace(/\D/g, '').length !== 11,
      mensagem: "Digite um número válido"
    },

    endereco: {
      value: document.getElementById('enderecocad'),
      validar: valor => !valor || valor.value.trim().length < 7,
      mensagem: "É necessario informar o endereço!"
    },
    cep: {
      value: document.getElementById('cepcad'),
      // Se o campo estiver vazio, !/regex/.test("") será TRUE.
      validar: valor => !valor || !/^\d{5}-\d{3}$/.test(valor.value),
      mensagem: "É necessário informar o CEP! Formato: 00000-000"
    },

    cidade: {
      value: document.getElementById('cidadecad'),
      validar: valor => !valor || valor.value.trim().length < 4,
      mensagem: "Informe o nome da sua cidade"
    },

    estado: {
      value: document.getElementById('estadocad'),
      validar: valor => !valor || valor.value.trim().length < 2,
      mensagem: "Informe seu estado!"
    }
  }

  const form = document.getElementById('form-cadastro');
  const mensagemError = document.getElementById('mensagem');

  // Verifica se a referência ao formulário existe antes de adicionar o listener
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // impede envio automático

      if (!mensagemError) {
        console.error("Erro: Elemento com ID 'mensagem' não encontrado!");
        return;
      }

      mensagemError.innerHTML = ""; // Limpa a mensagem anterior

      for (let i in campos) {
        const campo = campos[i];

        // Como estamos no DOMContentLoaded, campo.value não deve ser null. 
        // Se for, é um erro grave de ID no HTML.
        if (!campo.value) {
          console.error(`ERRO CRÍTICO: Elemento HTML com ID para o campo '${i}' não existe no HTML!`);
          mensagemError.innerHTML = `Erro interno: campo ${i} ausente. Verifique o console.`;
          mensagemError.style.color = "red";
          return; // Interrompe para evitar mais erros
        }

        // Chama a função de validação
        if (campo.validar(campo.value)) {
          mensagemError.innerHTML = campo.mensagem;
          mensagemError.style.color = "red";
          campo.value.focus(); // coloca o cursor no campo com erro
          return; // interrompe a validação ao encontrar o primeiro erro
        }
      }

      // Todos os campos passaram na validação
      mensagemError.innerHTML = "Formulário válido! Enviado com sucesso!";
      mensagemError.style.color = "green";

      // Limpa todos os campos
      form.reset();

      /*
      // Se você precisa enviar o formulário para um servidor, use:
      // form.submit();
      */
    });
  }
});