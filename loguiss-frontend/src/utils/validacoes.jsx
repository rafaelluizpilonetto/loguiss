export function validarEmail(email) {

    if (email.trim() === "") {
        return "O email é obrigatório";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Formato de email inválido";
    }

    return "";
}

export function validarSenha(senha) {

    if (senha.trim() === "") {
        return "A senha é obrigatória";
    }

    if (senha.length < 6) {
        return "A senha deve conter no mínimo 6 caracteres";
    }

    return "";
}

