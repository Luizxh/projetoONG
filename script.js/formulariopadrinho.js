document.addEventListener('DOMContentLoaded', () => {
    const campos = {
        nome: {
            value: document.getElementById('nome'),
            validar: v => v.value.trim().length < 3,
            mensagem: "Seu nome deve ter no minimo 3 caracteres!"
        },
        cpf: {
            value: document.getElementById('cpf'),
            validar: v => v.value.trim() === "" || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v.value),
            mensagem: "Por favor, digite um CPF válido. 000.000.000-00"
        },
        email: {
            value: document.getElementById('email'),
            validar: v => v.value.trim() === "" || !v.value.includes('@'),
            mensagem: "Digite um E-mail válido!"
        },
        telefone: {
            value: document.getElementById('telefone'),
            validar: v => v.value.trim() === "" || v.value.replace(/\D/g, '').length !== 11,
            mensagem: "Digite um número válido!"
        }
    }

    const form = document.getElementById('formulario-projeto-padrinho');
    const mensagemError = document.getElementById('mensagem2')

    if (form) {
        form.addEventListener('submit', (Event) => {
            Event.preventDefault();
            mensagemError.innerHTML = "";

            for (let i in campos) {
                const campo = campos[i];

                if (!campo.value) {
                    console.error(`Atenção elemento ${i} não foi encontrado no HTML`);
                    mensagemError.innerHTML = "Desculpe tive um problema interno, tente novamente mais tarde!";
                    mensagemError.style.color = "red";
                    return;
                }

                if (campo.validar(campo.value)) {
                    mensagemError.innerHTML = campo.mensagem
                    mensagemError.style.color = "red";
                    form.value.focus();
                    return;
                }

            }
            mensagemError.innerHTML = "Formulario enviado com sucesso!"
            mensagemError.style.color = "green";
    
            form.reset();
        })
    }
})