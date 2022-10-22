$(function () {
    var operacao = "Adicionar"
    var indiceSelecionado = -1
    var tbUsuario = localStorage.getItem('tbUsuario')
    tbUsuario = JSON.parse(tbUsuario)

    if (tbUsuario == null) {
        tbUsuario = []
    }


    function adicionar() {

        var usuario = JSON.stringify({
            nome: $('#nome').val(),
            email: $('#email').val(),
            telefone: $('#telefone').val()
        })

        tbUsuario.push(usuario)
        localStorage.setItem('tbUsuario', JSON.stringify(tbUsuario))
        alert("Usuario cadastrado com sucesso")

        return true
    }


    function exibir() {
        for (i in tbUsuario) {
            var user = JSON.parse(tbUsuario[i])
            $("#tblResultado tbody").append("<tr>" +
                "<td>" + i + "</td>" +
                "<td>" + user.nome + "</td>" +
                "<td>" + user.email + "</td>" +
                "<td>" + user.telefone + "</td>" +
                "<td>" + '<i class="fa fa-pencil btnEditar" linha="' + i + '"></i>' + '<i class="fa fa-trash btnExcluir" linha="' + i + '" ></i>' + "</td>" +
                "</tr>"
            )

        }
    }
    exibir()

    function editar() {
        tbUsuario[indiceSelecionado] = JSON.stringify({
            nome: $('#nome').val(),
            email: $('#email').val(),
            telefone: $('#telefone').val()
        })
        localStorage.setItem('tbUsuario', JSON.stringify(tbUsuario))
        alert("Usuario alterado com sucesso!")
    }

    $('#btnAdicionar').bind('click', validarDados)

    function validarDados() {
        if (!$('#nome').val()) {
            alert('Informe seu nome')
            $('#txtCodigo').focus()
            return false
        }
        if (!$('#email').val()) {
            alert('Informe seu email')
            $('#txtDescricao').focus()
            return false
        }
        if (!$('#telefone').val()) {
            alert('Informe seu telefone')
            $('#txtQuantidade').focus()
            return false
        }
    }


    $('.formCadastro').bind('submit', function () {
        if (operacao == "Adicionar") {
            return adicionar()
        } else {
            return editar()
        }
    })

    $("#btnLimpar").bind('click', function () {
        let apagar = prompt('Você tem certeza que deseja apagar toda a lista?')
        if(apagar[0] == 'S' || apagar[0] == 's'){
            localStorage.clear()
            location.reload()
        }else {
            return false
        }
    })

    $('.btnEditar').bind('click', function () {
        indiceSelecionado = $(this).attr('linha')
        var user = JSON.parse(tbUsuario[indiceSelecionado])
        $("#nome").val(user.nome)
        $("#email").val(user.email)
        $("#telefone").val(user.telefone)
        operacao = "Editar"
    })

    $('.btnExcluir').bind('click', function () {
        indiceSelecionado = $(this).attr('linha')

        tbUsuario.splice(indiceSelecionado, 1)
        console.log(tbUsuario)
        localStorage.setItem('tbUsuario', JSON.stringify(tbUsuario))
        alert("Usuário excluido com sucesso!")
        location.reload()
    })

})

