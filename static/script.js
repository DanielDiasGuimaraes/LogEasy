let API_URL = 'http://127.0.0.1:5000'


function Acessar(){
    const id = document.getElementById('id').value
    const senha = document.getElementById('senha').value

    if(id === '' || senha === ''){
        const id_ = document.getElementById('id')
        const senha_ = document.getElementById('senha')
        const resp = document.getElementById('resp')
        id_.style.border = "2px solid red";
        senha_.style.border = "2px solid red";
        resp.innerHTML = `<h4>Preencha todos os campos para login.</h4>`

        setTimeout(() => {
            id_.style.border = "none";
            senha_.style.border = "none";
            resp.innerHTML = ''
        }, 2000);

    }else{
        fetch(`${API_URL}/Autenticar_usuario`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                'id':id,   
                'senha': senha
            })
        })
        .then(Response => Response.json())
        .then(dados => {
            if(dados.msg === 'Acesso autorizado'){
                window.location.href = '/menu'
            }
            else{
                const id_ = document.getElementById('id')
                const senha_ = document.getElementById('senha')
                const resp = document.getElementById('resp')
                id_.style.border = "2px solid red";
                senha_.style.border = "2px solid red";
                resp.innerHTML = `<h4>ID ou Senha incorretos.</h4>`

                setTimeout(() => {
                    id_.style.border = "none";
                    senha_.style.border = "none";
                    resp.innerHTML = ''
                    id_.value = ''
                    senha_.value = ''
                }, 2000);

            }
        })
    }
}


function Configuracao_estoque(){
     window.location.href = '/configuracao_estoque'
}


function logout(){

    // remove o token da sessão
    sessionStorage.removeItem('token');

    // redireciona para login
    window.location.href = '/';
}


function Cadastrar_endereco_novo(){

    const inputEndereco = document.getElementById('input_endereco');
    const endereco = inputEndereco.value.trim();

    if(endereco === ""){

        inputEndereco.style.borderColor = "red";

        mostrarMensagem("❌ Informe um endereço.","erro");

        inputEndereco.focus();

        setTimeout(() => {

            inputEndereco.style.borderColor = "#d1d5db";

        },1500);

        return;
    }

    fetch(`${API_URL}/Cadastrar_novo_endereco`,{

        method:'POST',

        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify({

            endereco:endereco

        })

    })

    .then(response=>response.json())

    .then(dados=>{

        // Se o backend retornar erro
        if(
            dados.msg.toLowerCase().includes("erro") ||
            dados.msg.toLowerCase().includes("já") ||
            dados.msg.toLowerCase().includes("existe") ||
            dados.msg.toLowerCase().includes("não")
        ){

            mostrarMensagem("❌ " + dados.msg,"erro");

            inputEndereco.focus();

            return;
        }

        // Sucesso
        mostrarMensagem("✅ " + dados.msg,"sucesso");

        inputEndereco.value = "";

        inputEndereco.focus();

        // Atualiza a lista automaticamente
        Listar_endereco();

    })

    .catch(error=>{

        console.log(error);

        mostrarMensagem("❌ Erro ao cadastrar o endereço.","erro");

    });

}


function Excluir_end(){

    const inputEndereco = document.getElementById('input_endereco');
    const endereco = inputEndereco.value.trim();


    if(endereco === ""){

        inputEndereco.style.borderColor = "red";

        mostrarMensagem("❌ Informe um endereço.","erro");

        inputEndereco.focus();

        setTimeout(() => {

            inputEndereco.style.borderColor = "#d1d5db";

        },1500);

        return;
    }


    fetch(`${API_URL}/excluir_endereco`,{

        method:'POST',

        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify({

            endereco_excluir:endereco

        })

    })

    .then(response=>response.json())

    .then(dados=>{


        // Se o backend retornar erro

        if(
            dados.msg.toLowerCase().includes("erro") ||
            dados.msg.toLowerCase().includes("não") ||
            dados.msg.toLowerCase().includes("nao") ||
            dados.msg.toLowerCase().includes("existe")
        ){

            mostrarMensagem("❌ " + dados.msg,"erro");

            inputEndereco.focus();

            return;
        }


        // Sucesso

        mostrarMensagem("✅ " + dados.msg,"sucesso");

        inputEndereco.value = "";

        inputEndereco.focus();


        // Atualiza a lista de endereços

        Listar_endereco();


    })

    .catch(error=>{

        console.log(error);

        mostrarMensagem("❌ Erro ao excluir o endereço.","erro");

    });

}

function pag_produtos(){
    window.location.href = '/acessar_produtos'
}

function Cadastrar_novo_produto(){
    window.location.href = '/cadastrar_produto'
}

function cadastrar_produto(){

    const inputProduto = document.getElementById('nome_produto');
    const inputDescricao = document.getElementById('descricao_produto');
    const inputModelo = document.getElementById('modelo_produto');
    const inputFabricante = document.getElementById('fabricante_produto');
    const inputPrecoCusto = document.getElementById('preco_custo_produto');
    const inputPrecoVenda = document.getElementById('preco_venda_produto');
    const inputEAN = document.getElementById('ean');

    const produto = inputProduto.value.trim();
    const descricao = inputDescricao.value.trim();
    const modelo = inputModelo.value.trim();
    const fabricante = inputFabricante.value.trim();
    const preco_custo = inputPrecoCusto.value.trim();
    const preco_venda = inputPrecoVenda.value.trim();
    const ean = inputEAN.value.trim();

    // Remove a borda vermelha de todos
    const inputs = [
        inputProduto,
        inputDescricao,
        inputModelo,
        inputFabricante,
        inputPrecoCusto,
        inputPrecoVenda,
        inputEAN
    ];

    inputs.forEach(input=>{
        input.style.borderColor="#d1d5db";
    });

    // Validação

    if(produto === ""){

        inputProduto.style.borderColor="red";
        inputProduto.focus();

        mostrarMensagem("❌ Informe o nome do produto.","erro");
        return;

    }

    if(descricao === ""){

        inputDescricao.style.borderColor="red";
        inputDescricao.focus();

        mostrarMensagem("❌ Informe a descrição do produto.","erro");
        return;

    }

    if(modelo === ""){

        inputModelo.style.borderColor="red";
        inputModelo.focus();

        mostrarMensagem("❌ Informe o modelo.","erro");
        return;

    }

    if(fabricante === ""){

        inputFabricante.style.borderColor="red";
        inputFabricante.focus();

        mostrarMensagem("❌ Informe o fabricante.","erro");
        return;

    }

    if(preco_custo === ""){

        inputPrecoCusto.style.borderColor="red";
        inputPrecoCusto.focus();

        mostrarMensagem("❌ Informe o preço de custo.","erro");
        return;

    }

    if(preco_venda === ""){

        inputPrecoVenda.style.borderColor="red";
        inputPrecoVenda.focus();

        mostrarMensagem("❌ Informe o preço de venda.","erro");
        return;

    }

    if(ean === ""){

        inputEAN.style.borderColor="red";
        inputEAN.focus();

        mostrarMensagem("❌ Informe o código EAN.","erro");
        return;

    }

    fetch(`${API_URL}/cadastrar_produto`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            produto:produto,
            descricao:descricao,
            modelo:modelo,
            fabricante:fabricante,
            preco_custo:preco_custo,
            preco_venda:preco_venda,
            ean:ean

        })

    })

    .then(response=>response.json())

    .then(dados=>{

        mostrarMensagem("✅ "+dados.msg,"sucesso");

        // Limpa os campos
        inputs.forEach(input=>{
            input.value="";
            input.style.borderColor="#d1d5db";
        });

        inputProduto.focus();

    })

    .catch(error=>{

        console.log(error);

        mostrarMensagem("❌ Erro ao cadastrar o produto.","erro");

    });

}



function Listar_endereco(){

    const token = sessionStorage.getItem('token');


    fetch(`${API_URL}/listar_endereco`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
        }
    })
    .then(Response => Response.json())
    .then(dados => {

    let tabela = `
        <table border="1">
            <thead>
                <tr>
                    <th>Endereços</th>
                </tr>
            </thead>
            <tbody>
    `;

    dados.msg.forEach(endereco => {

        tabela += `
            <tr>
                <td>${endereco[0]}</td>
            </tr>
        `;

    });

    tabela += `
            </tbody>
        </table>
    `;

    document.getElementById("div_listar_enderecos").innerHTML = tabela;

});
}


function Listar_produtos(){

    const token = sessionStorage.getItem('token');


    fetch(`${API_URL}/listar_produto`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
        }
    })
    .then(Response => Response.json())
    .then(dados => {

        if (dados.msg.length > 0) {

            let html = `
                <table border="1">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Modelo</th>
                            <th>Fabricante</th>
                            <th>Custo</th>
                            <th>Venda</th>
                            <th>Ean</th>
                            <th>Código</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            dados.msg.forEach(produto => {

                html += `
                    <tr>
                        <td>${produto[0]}</td>
                        <td>${produto[1]}</td>
                        <td>${produto[2]}</td>
                        <td>${produto[3]}</td>
                        <td>R$ ${produto[4]}</td>
                        <td>R$ ${produto[5]}</td>
                        <td>${produto[6]}</td>
                        <td>${produto[7]}</td>
                    </tr>
                `;

            });

            html += `
                    </tbody>
                </table>
            `;

            document.getElementById('div_listar_produtos').innerHTML = html;

        } else {
            window.alert(dados.msg);
        }

    });
}


function Excluir_produto(){
    const codigo = document.getElementById('Codigo_produto').value

    if(codigo === ''){
        window.alert('Por Favor preencha com o codigo do produto que deseja exclurir.')
        return
    }

    fetch(`${API_URL}/Excluir_produto`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            'codigo': codigo
        })
    })
    .then(Response => Response.json())
    .then(dados => {
        window.alert(dados.msg)
        codigo.innerHTML.value = '';
    })
}


function Acess_pag_alterar_produto(){
    window.location.href = '/acessar_cadastro_produto';
}


function alterar_prouto(){

    const inputCodigo = document.getElementById('input_codigo_produto_alterar');
    const inputNovoValor = document.getElementById('dados_novos');

    const Codigo_produto = inputCodigo.value.trim();
    const coluna_selecionada = document.getElementById('dados_alterados').value;
    const dados_novos = inputNovoValor.value.trim();

    let valor_correto_atualizar = dados_novos;

    if(Codigo_produto === "" || dados_novos === ""){

        inputCodigo.style.borderColor = "red";
        inputNovoValor.style.borderColor = "red";

        mostrarMensagem("❌ Preencha todos os campos.","erro");

        setTimeout(()=>{

            inputCodigo.style.borderColor="#d1d5db";
            inputNovoValor.style.borderColor="#d1d5db";

        },1500);

        inputCodigo.focus();

        return;

    }

    if(coluna_selecionada=="preco_custo" || coluna_selecionada=="preco_venda"){

        valor_correto_atualizar=parseFloat(dados_novos);

        if(isNaN(valor_correto_atualizar)){

            mostrarMensagem("❌ Digite um valor numérico válido.","erro");

            inputNovoValor.focus();

            return;

        }

    }

    fetch(`${API_URL}/alterar_cadastro_produto`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            codigo_produto:Codigo_produto,
            coluna_selecionada:coluna_selecionada,
            dados_novos:valor_correto_atualizar

        })

    })

    .then(response=>response.json())

    .then(dados=>{

        if(dados.msg){

            mostrarMensagem("✅ "+dados.msg,"sucesso");

            inputCodigo.value="";
            inputNovoValor.value="";

            inputCodigo.focus();

        }else{

            mostrarMensagem("❌ Ocorreu um erro.","erro");

        }

    })

    .catch(error=>{

        console.log(error);

        mostrarMensagem("❌ Erro ao comunicar com o servidor.","erro");

    });

}

function mostrarMensagem(texto,tipo){

    const notificacao = document.getElementById("notificacao");

    notificacao.className = "notificacao";

    notificacao.classList.add(tipo);

    notificacao.innerHTML = `
        <span>${texto}</span>
        <div class="barra"></div>
    `;

    notificacao.classList.add("mostrar");

    setTimeout(()=>{

        notificacao.classList.remove("mostrar");

    },3000);

}

function consultar_produto(){

    const produto = document.getElementById('codigo_produto').value


    fetch(`${API_URL}/consultar_produto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'codigo_produto': produto
        })
    })
    .then(response => response.json())
    .then(dados => {
         const produto = dados.msg;

let html = `
<table border="1">
    <thead>
        <tr>
            <th>Produto</th>
            <th>Descrição</th>
            <th>Modelo</th>
            <th>Fabricante</th>
            <th>Custo</th>
            <th>Venda</th>
            <th>Ean</th>
            <th>Código</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>${produto[0]}</td>
            <td>${produto[1]}</td>
            <td>${produto[2]}</td>
            <td>${produto[3]}</td>
            <td>R$ ${produto[4]}</td>
            <td>R$ ${produto[5]}</td>
            <td>${produto[6]}</td>
            <td>${produto[7]}</td>
        </tr>
    </tbody>
</table>
`;

document.getElementById("div_listar_produtos").innerHTML = html;
    });
}   


function estoque(){
    window.location.href = '/estoque'
}


function recebimento(){
    window.location.href ='/recebimento'
}

function receber(){
    window.location.href = '/receber_produto'
}




function Acionar_entrada(){

    const inputCodigo = document.getElementById('codigo_produto');
    const inputQuantidade = document.getElementById('quantidade_recebida');
    const inputData = document.getElementById('data_time');
    const inputRemetente = document.getElementById('remetente');
    const inputRecebimento = document.getElementById('recebimento');

    const codigo_produto = inputCodigo.value.trim();
    const quantidade_recebida = inputQuantidade.value.trim();
    const data_hora = inputData.value;
    const remetente = inputRemetente.value.trim();
    const recebimento = inputRecebimento.value.trim();

    // Remove a borda vermelha de todos
    const inputs = [
        inputCodigo,
        inputQuantidade,
        inputData,
        inputRemetente,
        inputRecebimento
    ];

    inputs.forEach(input=>{
        input.style.borderColor="#d1d5db";
    });

    // Validação

    if(codigo_produto === ""){

        inputCodigo.style.borderColor="red";
        inputCodigo.focus();

        mostrarMensagem("❌ Informe o código do produto.","erro");

        return;
    }

    if(quantidade_recebida === ""){

        inputQuantidade.style.borderColor="red";
        inputQuantidade.focus();

        mostrarMensagem("❌ Informe a quantidade recebida.","erro");

        return;
    }

    if(data_hora === ""){

        inputData.style.borderColor="red";
        inputData.focus();

        mostrarMensagem("❌ Informe a data e hora.","erro");

        return;
    }

    if(remetente === ""){

        inputRemetente.style.borderColor="red";
        inputRemetente.focus();

        mostrarMensagem("❌ Informe o remetente.","erro");

        return;
    }

    if(recebimento === ""){

        inputRecebimento.style.borderColor="red";
        inputRecebimento.focus();

        mostrarMensagem("❌ Informe quem recebeu o produto.","erro");

        return;
    }

    fetch(`${API_URL}/registrar_entrada_recebimento`,{

        method:'POST',

        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify({

            codigo_produto:codigo_produto,
            quantidade:parseInt(quantidade_recebida),
            data_hora:data_hora,
            remetente:remetente,
            recebimento:recebimento

        })

    })

    .then(response=>response.json())

    .then(dados=>{

        if(dados.msg){

            // Se o backend retornar alguma mensagem de erro
            if(
                dados.msg.toLowerCase().includes("não") ||
                dados.msg.toLowerCase().includes("erro") ||
                dados.msg.toLowerCase().includes("inexistente")
            ){

                mostrarMensagem("❌ " + dados.msg,"erro");
                inputCodigo.focus();
                return;
            }

            // Sucesso
            mostrarMensagem("✅ " + dados.msg,"sucesso");

            inputs.forEach(input=>{

                input.value="";
                input.style.borderColor="#d1d5db";

            });

            inputCodigo.focus();

        }

    })

    .catch(error=>{

        console.log(error);

        mostrarMensagem("❌ Erro ao registrar o recebimento.","erro");

    });

}


function exibir_recebimento() {

    fetch(`${API_URL}/consultar_recebimento`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(dados => {

        const dados_recebim = dados.msg;

        if (dados_recebim.length === 0) {
            document.getElementById('tela_rec').innerHTML =
            "<p>Nenhum recebimento encontrado.</p>";
            return;
}

        let html = `
        <table border="1">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Descrição</th>
                    <th>Modelo</th>
                    <th>Fabricante</th>
                    <th>Código</th>
                    <th>Quantidade recebida</th>
                    <th>Data/Hora</th>
                    <th>Remetente</th>
                    <th>Recebimento</th>
                    <th>Pacote</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
        `;

        dados_recebim.forEach(recebimento => {
            html += `
                <tr>
                    <td>${recebimento[0]}</td>
                    <td>${recebimento[1]}</td>
                    <td>${recebimento[2]}</td>
                    <td>${recebimento[3]}</td>
                    <td>${recebimento[4]}</td>
                    <td>${recebimento[5]}</td>
                    <td>${recebimento[6]}</td>
                    <td>${recebimento[7]}</td>
                    <td>${recebimento[8]}</td>
                    <td>${recebimento[9]}</td>
                    <td>${recebimento[10]}🔴</td>
                </tr>
            `;
        });

        html += `
            </tbody>
        </table>
        `;

        document.getElementById('tela_rec').innerHTML = html;
    })
    .catch(erro => {
        console.error(erro);
    });
}



function excluir_pacote(){

    const inputPacote = document.getElementById('input_pacote');
    const pacote = inputPacote.value.trim();

    if(pacote === ""){

        inputPacote.style.borderColor = "red";

        mostrarMensagem("❌ Informe o número do pacote.","erro");

        inputPacote.focus();

        setTimeout(() => {

            inputPacote.style.borderColor = "#d1d5db";

        },1500);

        return;
    }

    fetch(`${API_URL}/excluir_pacote`,{

        method:'POST',

        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify({

            pacote:parseInt(pacote)

        })

    })

    .then(response=>response.json())

    .then(data=>{

        if(data.msg){

            // Caso a mensagem indique sucesso
            if(data.msg.toLowerCase().includes("sucesso") ||
               data.msg.toLowerCase().includes("excluído")){

                mostrarMensagem("✅ " + data.msg,"sucesso");

                inputPacote.value = "";

                inputPacote.focus();

                // Atualiza a lista automaticamente
                exibir_recebimento();

            }else{

                mostrarMensagem("❌ " + data.msg,"erro");

                inputPacote.focus();

            }

        }

    })

    .catch(error=>{

        console.log(error);

        mostrarMensagem("❌ Erro ao excluir o pacote.","erro");

    });

}


function conferencia_recebimento(){
    window.location.href = '/conferencia_recebimento'
}



function selecionar_pacote(){
    const pacote = document.getElementById('pacote').value

    if(pacote === ''){
        document.getElementById('pacote').style.border = '2px solid red';
        
        setTimeout(() => {
            document.getElementById('pacote').style.border = 'none';
        }, 2000);
        return
    }

    fetch(`${API_URL}/selecionar_pacote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'pacote': pacote
        })
    })
    .then(response => response.json())
    .then(dados => {
        
        if(dados.msg === 'Pacote não existe.'){
            window.alert(dados.msg)
            return
        }else{
            
            document.getElementById('conferir').style.display = 'block'

            const div_produto = document.getElementById('produto_div')
            const div_codigo = document.getElementById('codigo_div')
            const div_quantidade = document.getElementById('quantidade_div')

            const produto = dados.produto;
            const codigo = dados.codigo;
            const quantidade = dados.quantidade;

            div_produto.innerHTML = `<p>${produto}</p>`;
            div_codigo.innerHTML = `<p>${codigo}</p>`;
            div_quantidade.innerHTML = `<p>${quantidade}</p>`;
        }

    })
}



function conferir_produto() {

    const inputCodigo = document.getElementById('input_codigo_conf');
    const codigo = parseInt(inputCodigo.value);
    const pacote = document.getElementById('pacote').value

    if (isNaN(codigo)) {
        inputCodigo.focus();
        return;
    }

    fetch(`${API_URL}/conferir_pacote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'pacote': pacote,
            'codigo': codigo
        })
    })
    .then(response => response.json())

    .then(dados => {

        console.log(dados)

        const divRes = document.getElementById('div_res');
        const divQtd = document.getElementById('quantidade_div');


        if(dados.msg === 'Produto não encontrado.'){
            console.log('condição ok')
            const div_neg = document.getElementById('div_res');
            const somerror = new Audio('/static/audio/negativo.wav')
            somerror.play();
            div_neg.innerHTML = "❌ Produto não encontrado";
            div_neg.style.backgroundColor = "#dc2626";
            div_neg.style.color = "#fff";

            inputCodigo.value = "";
            inputCodigo.focus();

            setTimeout(() => {

                div_neg.innerHTML = "";
                div_neg.style.backgroundColor = "#f0f8ff";
                div_neg.style.color = "#000";

            }, 2000);

            return
        }


        // Pacote finalizado
        if (dados.msg_concluida) {

            divRes.innerHTML = "✅ Pacote conferido com sucesso!";
            divRes.style.backgroundColor = "#16a34a";
            divRes.style.color = "#fff";

            document.getElementById('produto_div').innerHTML = "";
            document.getElementById('codigo_div').innerHTML = "";
            document.getElementById('quantidade_div').innerHTML = "";

            inputCodigo.value = "";

            setTimeout(() => {

                document.getElementById('conferir').style.display = "none";

                document.getElementById('pacote').value = "";
                document.getElementById('pacote').focus();

                divRes.innerHTML = "";
                divRes.style.backgroundColor = "#f0f8ff";
                divRes.style.color = "#000";

            }, 2000);

            return;
        }

        // Produto conferido
        divQtd.innerHTML = `<p>${dados.qtd}</p>`;
        const somSucesso = new Audio('/static/audio/positivo.wav')
        somSucesso.play();
        divRes.innerHTML = "✔ Produto conferido";
        divRes.style.backgroundColor = "#16a34a";
        divRes.style.color = "#fff";

        inputCodigo.value = "";
        inputCodigo.focus();

        setTimeout(() => {

            divRes.innerHTML = "";
            divRes.style.backgroundColor = "#f0f8ff";
            divRes.style.color = "#000";

        }, 1500);

    })

    .catch(() => {
       console.log(dados.msg) 
    });

}


function detectarEnterCodigo(event){
    if(event.key === "Enter"){
        conferir_produto();
    }
}


function Armazenar(){
    window.location.href = '/armazenagem'
}





function listar_armazenagem(){

    fetch(`${API_URL}/listar_armazenagem`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(dados => {

        const dados_recebim = dados.msg;

        if (dados_recebim.length === 0) {
            document.getElementById('tabela_armazenagem').innerHTML =
            "<p>Nenhum recebimento encontrado.</p>";
            return;
}

        let html = `
        <table border="1">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Descrição</th>
                    <th>Modelo</th>
                    <th>Fabricante</th>
                    <th>Código</th>
                    <th>Quantidade recebida</th>
                    <th>Pacote</th>
                </tr>
            </thead>
            <tbody>
        `;

        dados_recebim.forEach(recebimento => {
            html += `
                <tr>
                    <td>${recebimento[0]}</td>
                    <td>${recebimento[1]}</td>
                    <td>${recebimento[2]}</td>
                    <td>${recebimento[3]}</td>
                    <td>${recebimento[4]}</td>
                    <td>${recebimento[5]}</td>
                    <td>${recebimento[6]}</td>
                </tr>
            `;
        });

        html += `
            </tbody>
        </table>
        `;

        document.getElementById('tabela_armazenagem').innerHTML = html;
    })
    .catch(erro => {
        console.error(erro);
    });
}




/* =====================================================
   FUNÇÃO PARA ARMAZENAR PRODUTO
===================================================== */

function armazenar_produto_em_estoque() {


    console.log(
        "ENTROU EM armazenar_produto_em_estoque()"
    );


    // ==========================================
    // PEGAR ELEMENTOS
    // ==========================================

    const campoPacote =
        document.getElementById(
            'pacote_produto'
        );


    const campoEndereco =
        document.getElementById(
            'endereco_produto'
        );


    // ==========================================
    // VERIFICAR SE OS ELEMENTOS EXISTEM
    // ==========================================

    if (!campoPacote) {

        console.error(
            "Elemento #pacote_produto não encontrado."
        );

        return;
    }


    if (!campoEndereco) {

        console.error(
            "Elemento #endereco_produto não encontrado."
        );

        return;
    }



    // ==========================================
    // PEGAR VALORES
    // ==========================================

    const pacote =
        campoPacote.value.trim();


    const endereco =
        campoEndereco.value.trim();



    console.log(
        "Pacote:",
        pacote
    );


    console.log(
        "Endereço:",
        endereco
    );



    // ==========================================
    // VALIDAR CAMPOS
    // ==========================================

    if (
        pacote === '' ||
        endereco === ''
    ) {

        window.alert(
            'Preencha todos os campos.'
        );

        return;
    }



    // ==========================================
    // DESABILITAR BOTÃO
    // ==========================================

    const botao =
        document.getElementById(
            'btn_armazenar'
        );


    botao.disabled = true;

    botao.innerText =
        '⏳ Armazenando...';



    // ==========================================
    // ENVIAR PARA O FLASK
    // ==========================================

    fetch(
        `${API_URL}/armazenar_produto_em_estoque`,
        {

            method: 'POST',

            headers: {

                'Content-Type':
                    'application/json'

            },

            body: JSON.stringify({

                pacote: pacote,

                endereco: endereco

            })

        }
    )


    // ==========================================
    // RESPOSTA HTTP
    // ==========================================

    .then(response => {


        console.log(
            "Status HTTP:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                `Erro HTTP: ${response.status}`
            );

        }


        return response.json();

    })


    // ==========================================
    // DADOS DO FLASK
    // ==========================================

    .then(dados => {


        console.log(
            "Resposta do Flask:",
            dados
        );


        // ======================================
        // MOSTRAR MENSAGEM
        // ======================================

        window.alert(
            dados.msg
        );

        if(dados.msg_cod === 'ja tem endereco'){
              campoEndereco.value = dados.endereco;
        }

        // ======================================
        // SE DEU CERTO
        // ======================================

        if (
            dados.sucesso === 'true'
        ) {

            campoPacote.value = '';

            campoEndereco.value = '';

        }

    })


    // ==========================================
    // ERRO
    // ==========================================

    .catch(error => {


        console.error(
            "Erro ao armazenar produto:",
            error
        );


        window.alert(
            "Erro ao comunicar com o servidor."
        );

    })


    // ==========================================
    // LIBERAR BOTÃO NOVAMENTE
    // ==========================================

    .finally(() => {


        botao.disabled = false;


        botao.innerText =
            '📦 Armazenar Produto';

    });

}



/* =====================================================
   DOM CARREGADO
===================================================== */

document.addEventListener(
    'DOMContentLoaded',
    () => {


        console.log(
            "DOM da armazenagem carregado."
        );


        // ======================================
        // PEGAR BOTÃO
        // ======================================

        const botao =
            document.getElementById(
                'btn_armazenar'
            );


        // ======================================
        // VERIFICAR BOTÃO
        // ======================================

        if (!botao) {

            console.error(
                "Botão #btn_armazenar não encontrado."
            );

            return;
        }


        console.log(
            "Botão de armazenagem encontrado."
        );



        // ======================================
        // EVENTO DE CLIQUE
        // ======================================

        botao.addEventListener(
            'click',
            () => {


                console.log(
                    "BOTÃO ARMAZENAR CLICADO!"
                );


                armazenar_produto_em_estoque();

            }
        );

    }
);




function mostrar_alerta(mensagem, tipo = 'azul', icone = 'ℹ️') {

    const alerta = document.getElementById('alerta_estoque');

    const iconeElemento =
        document.getElementById('alerta_icone');

    const mensagemElemento =
        document.getElementById('alerta_mensagem');


    if (!alerta) {
        return;
    }


    alerta.className = `alerta ${tipo}`;

    iconeElemento.textContent = icone;

    mensagemElemento.textContent = mensagem;

    alerta.style.display = 'flex';

}


/* ==================================================
   CONSULTAR ESTOQUE
================================================== */

function consultar_estoque(){

    fetch(`${API_URL}/consultar_estoque_*`, {

        method: 'GET',

        headers: {
            'Content-Type': 'application/json'
        }

    })

    .then(response => response.json())

    .then(dados => {

        console.log(dados.msg);


        /* ==============================
           ESTOQUE VAZIO
        ============================== */

        if (
            dados.msg ===
            'Não há produtos no estoque.'
        ) {

            mostrar_alerta(
                'Não há produtos cadastrados no estoque.',
                'amarelo',
                '⚠️'
            );


            document.getElementById(
                'tela_estoque'
            ).innerHTML = `

                <div class="tabela_vazia">

                    Nenhum produto cadastrado no estoque.

                </div>

            `;

            return;

        }


        /* ==============================
           MONTAR TABELA
        ============================== */

        let html = `

            <table>

                <thead>

                    <tr>

                        <th>Produto</th>

                        <th>Descrição</th>

                        <th>Modelo</th>

                        <th>Fabricante</th>

                        <th>Código</th>

                        <th>Preço de venda</th>

                        <th>EAN</th>

                        <th>Quantidade</th>

                        <th>Endereço</th>

                    </tr>

                </thead>

                <tbody>

        `;


        dados.msg.forEach(produto => {

            html += `

                <tr>

                    <td>
                        ${produto[0]}
                    </td>

                    <td>
                        ${produto[1]}
                    </td>

                    <td>
                        ${produto[2]}
                    </td>

                    <td>
                        ${produto[3]}
                    </td>

                    <td>
                        ${produto[4]}
                    </td>

                    <td>
                        R$ ${produto[5]}
                    </td>

                    <td>
                        ${produto[6]}
                    </td>

                    <td>
                        ${produto[7]} un
                    </td>

                    <td>
                        ${produto[8]}
                    </td>

                </tr>

            `;

        });


        html += `

                </tbody>

            </table>

        `;


        document.getElementById(
            'tela_estoque'
        ).innerHTML = html;


        mostrar_alerta(
            'Estoque carregado com sucesso.',
            'verde',
            '✅'
        );

    })

    .catch(erro => {

        console.error(
            'Erro ao consultar estoque:',
            erro
        );


        mostrar_alerta(
            'Erro ao consultar o estoque.',
            'vermelho',
            '❌'
        );

    });

}


/* ==================================================
   CONSULTAR PRODUTO
================================================== */

function consultar_produto_estoque(){

    const produto =
        document.getElementById(
            'codigo_produto_c_e'
        ).value.trim();


    /* ==============================
       VALIDAR CAMPO
    ============================== */

    if (produto === '') {

        mostrar_alerta(
            'Digite o código do produto.',
            'amarelo',
            '⚠️'
        );

        return;

    }


    fetch(
        `${API_URL}/consultar_produto_estoque`,
        {

            method: 'POST',

            headers: {

                'Content-Type':
                    'application/json'

            },

            body: JSON.stringify({

                codigo_produto: produto

            })

        }
    )

    .then(response => response.json())

    .then(dados => {

        const produto =
            dados.msg;


        /* ==============================
           PRODUTO NÃO ENCONTRADO
        ============================== */

        if (
            !produto ||
            !Array.isArray(produto)
        ) {

            mostrar_alerta(
                'Produto não encontrado no estoque.',
                'vermelho',
                '❌'
            );


            document.getElementById(
                'tela_estoque'
            ).innerHTML = `

                <div class="tabela_vazia">

                    Produto não encontrado.

                </div>

            `;

            return;

        }


        /* ==============================
           TABELA
        ============================== */

        let html = `

            <table>

                <thead>

                    <tr>

                        <th>Produto</th>

                        <th>Descrição</th>

                        <th>Modelo</th>

                        <th>Fabricante</th>

                        <th>Código</th>

                        <th>Quantidade</th>

                        <th>Endereço</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td>
                            ${produto[0]}
                        </td>

                        <td>
                            ${produto[1]}
                        </td>

                        <td>
                            ${produto[2]}
                        </td>

                        <td>
                            ${produto[3]}
                        </td>

                        <td>
                            ${produto[4]}
                        </td>

                        <td>
                            ${produto[5]}
                        </td>

                        <td>
                            ${produto[6]}
                        </td>

                    </tr>

                </tbody>

            </table>

        `;


        document.getElementById(
            'tela_estoque'
        ).innerHTML = html;


        mostrar_alerta(
            'Produto encontrado com sucesso.',
            'verde',
            '✅'
        );

    })

    .catch(erro => {

        console.error(
            'Erro ao consultar produto:',
            erro
        );


        mostrar_alerta(
            'Erro ao consultar o produto.',
            'vermelho',
            '❌'
        );

    });

}


/* ==================================================
   IR PARA PÁGINA DE MOVER PRODUTO
================================================== */

function pag_mover_produto(){

    window.location.href =
        '/pag_mover_produto';

}


/* ==================================================
   MOVER PRODUTO
================================================== */

function mover_produto(){

    /* ==============================
       PEGAR DADOS
    ============================== */

    const codigo =
        document.getElementById(
            'input_codigo_do_produto'
        ).value.trim();


    const endereco =
        document.getElementById(
            'input_novo_endereco'
        ).value.trim();


    /* ==============================
       VALIDAR
    ============================== */

    if (
        codigo === '' ||
        endereco === ''
    ) {

        mostrar_alerta(
            'Preencha todos os campos.',
            'amarelo',
            '⚠️'
        );

        return;

    }


    /* ==============================
       ENVIAR
    ============================== */

    fetch(
        '/mover_produto',
        {

            method: 'POST',

            headers: {

                'Content-Type':
                    'application/json'

            },

            body: JSON.stringify({

                codigo: codigo,

                endereco: endereco

            })

        }
    )

    .then(async response => {

        const dados =
            await response.json();


        return {

            status: response.status,

            dados: dados

        };

    })

    .then(resultado => {

        const dados =
            resultado.dados;


        /* ==============================
           SUCESSO
        ============================== */

        if (
            resultado.status >= 200 &&
            resultado.status < 300
        ) {

            mostrar_alerta(
                dados.msg,
                'verde',
                '✅'
            );

            return;

        }


        /* ==============================
           ENDEREÇO OCUPADO
        ============================== */

        if (
            resultado.status === 409
        ) {

            mostrar_alerta(
                dados.msg,
                'vermelho',
                '❌'
            );

            return;

        }


        /* ==============================
           OUTROS ERROS
        ============================== */

        mostrar_alerta(
            dados.msg ||
            'Não foi possível mover o produto.',
            'vermelho',
            '❌'
        );

    })

    .catch(erro => {

        console.error(
            'Erro ao mover produto:',
            erro
        );


        mostrar_alerta(
            'Erro de comunicação com o servidor.',
            'vermelho',
            '❌'
        );

    });

}

document.addEventListener('DOMContentLoaded', () => {
        exibir_recebimento();
        Listar_produtos();
        Listar_endereco();
        listar_armazenagem();
        if (document.getElementById('tela_estoque')) {

        consultar_estoque();

    }
    });



