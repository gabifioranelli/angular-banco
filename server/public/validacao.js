$(function () {
    $("#alerta").hide();
})

function validaCampo() {
    var valido = true;

    var nome = $("#nome").val();
    var idade = $("#idade").val();;
    var turma = $("#turma").val();
    var rm = $("#ident").val();
    var pais = $("#pais").val();


    if (!validaNome(nome)){
        valido = false;
    }
    if (!validaIdade(idade)){
        valido = false;
    }
    if (!validaTurma(turma)){
        valido = false;
    }
    if (!validaRm(rm)){
        valido = false;
    }
    if (!validaPais(pais)){
        valido = false;
    }
    

    if (valido) {
        var botao = document.querySelector("#enviar");
        botao.setAttribute("type", "submit");
    } else {
        $("#alerta").show();
    }
}

function validaNome(nome) {
    if (nome == "" || !isNaN(nome)) {
        $("#nome").css({ border: "solid 2px red" });

        return false
    } else {
        $("#nome").css({ border: "solid 2px green" });
        return true;
    }
}

function validaPais(nome) {
    if (nome == "" || !isNaN(nome)) {
        $("#pais").css({ border: "solid 2px red" });

        return false
    } else {
        $("#pais").css({ border: "solid 2px green" });
        return true;
    }
}

function validaIdade(idade) {
    if (idade >= 10 && idade < 120) {
        $("#idade").css({ border: "solid 2px green" });
        return true
    } else {
        $("#idade").css({ border: "solid 2px red" });
        return false;
    }
}

function validaTurma(turma) {
    if (turma == "" || turma == null) {
        $("#turma").css({ border: "solid 2px red" });
        return false
    } else {
        $("#turma").css({ border: "solid 2px green" });
        return true;
    }

}

function validaRm(rm) {
    if (rm == "" || rm.length > 10) {
        $("#ident").css({ border: "solid 2px red" });
        if (rm.length > 10)
            alert("R.A/R.M com no máximo 10 caracteres.")
        return false
    } else {
        $("#ident").css({ border: "solid 2px green" });
        console.log(rm);
        return true;
    }
}
