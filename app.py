from flask import Flask, render_template, jsonify, request
from flask import session, redirect
import os
from dotenv import load_dotenv
import mysql.connector
import random
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

load_dotenv()

def conexao_bd():
    conexao = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )
    return conexao

app = Flask(__name__)

app.config['SECRET_KEY'] = '26564014'


@app.route('/', methods = ['GET'])
def index():
    return render_template('login.html')

@app.route('/Autenticar_usuario', methods= ['POST'])
def autenticar():
    conexao = None
    cursor =None    
    try:
        dados = request.get_json()
        
        id = dados['id']
        senha = dados['senha']
        
        conexao = conexao_bd()
        cursor = conexao.cursor()
        
        query = ' SELECT * FROM usuarios WHERE usuario = %s AND senha = %s'
        cursor.execute(query, (id, senha))
        resposta = cursor.fetchone()
        
        if resposta:
            session['logado'] = True
            return jsonify({
                'msg':'Acesso autorizado'
            })
        else:
            return jsonify({
               'msg': 'Acesso negado'
            })
    except Exception as e:
        print(e)
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
            

@app.route('/menu', methods = ['GET'])
def pag_menu():
    if not session.get('logado'):
        return redirect('/')
    return render_template('menu.html')
            

@app.route('/configuracao_estoque', methods = ['GET'])
def pag_configuracao_estoque():
    if not session.get('logado'):
        return redirect('/')
    return render_template('configuracao_estoque.html')



@app.route('/Cadastrar_novo_endereco', methods = ['POST'])
def cadastrar_novo_endereco():
    
    if not session.get('logado'):
        return redirect('/')
    
    conexao = None
    cursor = None
    
    dados = request.get_json()
    
    endereco = dados['endereco']

    
    
    try:
        conexao = conexao_bd()
        cursor = conexao.cursor()
        
            
        
        query = 'SELECT * FROM enderecos WHERE endereco = %s'
        cursor.execute(query, (endereco,))
        resposta = cursor.fetchone()
            
        if resposta:
            return jsonify({
                'msg': 'Endereço já existe.'
            })

        query_cadastrar = 'INSERT INTO enderecos (endereco) VALUES (%s)'
        cursor.execute(query_cadastrar, (endereco,))
        conexao.commit()
                
        return jsonify({
            'msg': 'Endereço cadastrado com sucesso.'
        })

    except Exception as e:
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
        
        
@app.route('/excluir_endereco_pag', methods = ['GET'])
def pag_excluir_endereco():
    if not session.get('logado'):
        return redirect('/')
    return render_template('excluir_endereco.html')


@app.route('/excluir_endereco', methods = ['POST'])
def excluir_endereco():
    
    if not session.get('logado'):
        return redirect('/')
    
    conexao = None
    cursor = None
    
    dados = request.get_json()
    
    endereco = dados['endereco_excluir']
    
    
    try:
        conexao = conexao_bd()
        cursor = conexao.cursor()
        
        query_verificar = 'SELECT * FROM enderecos WHERE endereco = %s'
        cursor.execute(query_verificar, (endereco,))
        resposta = cursor.fetchone()
        
        if resposta:
            query = 'DELETE FROM enderecos WHERE endereco =%s'
            cursor.execute(query, (endereco,))
            conexao.commit()
        
            return jsonify({
                'msg': 'Endereço apagado com sucesso.'
            })
        else:
            return jsonify({
                'msg': 'Endereço não encontrado.'
            })
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
            
@app.route('/acessar_produtos', methods= ['GET'])
def acessar_produtos():
    if not session.get('logado'):
        return redirect('/')
    return render_template('produtos.html')

@app.route('/cadastrar_produto', methods= ['GET'])
def cadastrar_produtos():
    if not session.get('logado'):
        return redirect('/')
    return render_template('cadastro_produto.html')



@app.route('/cadastrar_produto', methods = ['POST'])
def cadastrar_produto_bd():
    
    if not session.get('logado'):
        return redirect('/')
    
    conexao = None
    cursor = None
    while True:
        try:
            
            dados = request.get_json()
            
            produto = dados['produto']
            descricao = dados['descricao']
            modelo = dados['modelo']
            fabricante = dados['fabricante']
            preco_custo = dados['preco_custo']
            preco_venda = dados['preco_venda']
            ean = dados['ean']
            codigo = random.randint(1, 999999)
            
            conexao = conexao_bd()
            cursor = conexao.cursor()
            
            query_verificar_ean = 'SELECT * FROM produtos WHERE ean = %s'
            cursor.execute(query_verificar_ean, (ean,))
            resposta = cursor.fetchone()
            
            if resposta:
                return jsonify({
                    'msg': 'Produto já cadastrado.'
                })
            else:
                
                query_verificar_codigo_interno = 'SELECT * FROM produtos WHERE codigo = %s'
                cursor.execute(query_verificar_codigo_interno, (codigo,))
                resposta_da_veri = cursor.fetchone()
                
                if resposta_da_veri:
                    continue
                else:
                    query_cadastrar = 'INSERT INTO produtos (produto,descricao,modelo,fabricante,preco_custo,preco_venda,ean,codigo) VALUES (%s, %s, %s, %s, %s, %s,%s, %s)'
                    cursor.execute(query_cadastrar, (produto,descricao,modelo,fabricante,preco_custo,preco_venda,ean,codigo))
                    conexao.commit()
                    mensagem = f' Produto cadastrado com scesso! Codigo :{codigo}'
                    return jsonify({
                        'msg': mensagem
                    })
        except Exception as e:
            return jsonify({
                'msg': str(e)
            })
        finally:
            if cursor:
                cursor.close()
            if conexao:
                conexao.close()        
        
        
    
@app.route('/listar_endereco', methods= ['GET'])
def isatr_endereco():
    
    if not session.get('logado'):
        return redirect('/')
    
    try:
        conexao = conexao_bd()
        cursor = conexao.cursor()
        
        query_listar = 'SELECT * FROM enderecos'
        cursor.execute(query_listar)
        resposta = cursor.fetchall()
        
        if resposta:
            return jsonify({
                'msg': resposta
            })
        else:
            return jsonify({
                'msg': 'Não há endereços no sistema.'
            })
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()





@app.route('/listar_produto', methods= ['GET'])
def isatr_produto():
    
    if not session.get('logado'):
        return redirect('/')
    
    try:
        conexao = conexao_bd()
        cursor = conexao.cursor()
        
        query_listar = 'SELECT * FROM produtos'
        cursor.execute(query_listar)
        resposta = cursor.fetchall()
        
        if resposta:
            return jsonify({
                'msg': resposta
            })
        else:
            return jsonify({
                'msg': 'Não há endereços no sistema.'
            })
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
            
            
            
            


@app.route('/Excluir_produto', methods = ['POST'])
def Excluir_produtos():
    
    conexao = None
    cursor = None
    
    if not session.get('logado'):
        return redirect('/')
    
    try:
        dados = request.get_json()
        
        codigo = dados['codigo']
        
        conexao = conexao_bd()
        cursor =conexao.cursor()
        
        query_verificar = 'SELECT * FROM produtos WHERE codigo = %s'
        cursor.execute(query_verificar, (codigo,))
        resposta = cursor.fetchone()
        
        if resposta:
        
            query = 'DELETE FROM produtos WHERE codigo = %s'
            cursor.execute(query, (codigo,))
            conexao.commit()
            
            mensagem = f'Produto {codigo} deletado com sucesso.'
            
            return jsonify({
                'msg': mensagem
            })
        else:
            return jsonify({
                'msg': 'Produto não encontrado.'
            })
    except Exception as e:
        print(e)
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
        
@app.route('/acessar_cadastro_produto', methods = ['GET'])
def acessar_pag_cadastro():
    if not session.get('logado'):
        return redirect('/')
    
    return render_template('alterar_cadastro_produto.html')

    
@app.route('/alterar_cadastro_produto', methods=['POST'])
def alterar_cadastro():

    if not session.get('logado'):
        return redirect('/')

    conexao = None
    cursor = None

    try:
        dados = request.get_json()

        codigo_produto = dados['codigo_produto']
        coluna_selecionada = dados['coluna_selecionada']
        dados_novos = dados['dados_novos']

        # colunas permitidas (SEGURANÇA)
        colunas_permitidas = [
            "produto",
            "descricao",
            "modelo",
            "fabricante",
            "preco_custo",
            "preco_venda",
            "codigo"
        ]

        if coluna_selecionada not in colunas_permitidas:
            return jsonify({
                'msg': '⛔ Coluna inválida'
            }), 400

        conexao = conexao_bd()
        cursor = conexao.cursor()

        # verifica se o produto existe
        query_verificar = 'SELECT * FROM produtos WHERE codigo = %s'
        cursor.execute(query_verificar, (codigo_produto,))
        resposta = cursor.fetchone()

        if not resposta:
            return jsonify({
                'msg': '⛔ Produto não encontrado'
            }), 404

        # UPDATE correto (coluna dinâmica + valor seguro)
        query = f"""
            UPDATE produtos
            SET {coluna_selecionada} = %s
            WHERE codigo = %s
        """

        cursor.execute(query, (dados_novos, codigo_produto))
        conexao.commit()

        return jsonify({
            'msg': f'✅ Produto {codigo_produto} alterado com sucesso.'
        })

    except Exception as e:
        return jsonify({
            'msg': str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
    
    
    
@app.route('/consultar_produto', methods= ['POST'])
def consultar_prod():
    if not session.get('logado'):
        return redirect('/')
    
    try:
        dados = request.get_json()
        
        codigo_produto = dados['codigo_produto']
        
        conexao = None
        Cursor = None
        
        conexao = conexao_bd()
        Cursor = conexao.cursor()
        
        query_consultar = 'SELECT * FROM produtos WHERE codigo = %s'
        Cursor.execute(query_consultar, (codigo_produto,))
        resposta = Cursor.fetchone()
        
        if resposta:
            return jsonify({
                'msg': resposta
            })
        else:
            return jsonify({
                'msg': 'Produto não encontrado.'
            })
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })        
    finally:
        if Cursor:
            Cursor.close()
        if conexao:
            conexao.close()


@app.route('/estoque', methods =['GET'])
def acessar_pag_estoque():
    if not session.get('logado'):
        return redirect('/')
    return render_template('estoque.html')






@app.route('/consultar_estoque_*', methods= ['GET'])
def consultar_estoque():
    
    if not session.get('logado'):
        return redirect('/')
    
    try:
        conexao = conexao_bd()
        cursor = conexao.cursor()
        
        query_listar = 'SELECT * FROM estoque'
        cursor.execute(query_listar)
        resposta = cursor.fetchall()
        
        if resposta:
            return jsonify({
                'msg': resposta
            })
        else:
            return jsonify({
                'msg': 'Não há produtos no estoque.'
            })
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
            
            





@app.route('/consultar_produto_estoque', methods= ['POST'])
def consultar_prod_estoque():
    if not session.get('logado'):
        return redirect('/')
    
    try:
        dados = request.get_json()
        
        codigo_produto = dados['codigo_produto']
        
        conexao = None
        Cursor = None
        
        conexao = conexao_bd()
        Cursor = conexao.cursor()
        
        query_consultar = 'SELECT * FROM estoque WHERE codigo = %s'
        Cursor.execute(query_consultar, (codigo_produto,))
        resposta = Cursor.fetchone()
        
        if resposta:
            return jsonify({
                'msg': resposta
            })
        else:
            return jsonify({
                'msg': 'Produto não encontrado.'
            })
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })        
    finally:
        if Cursor:
            Cursor.close()
        if conexao:
            conexao.close()


            

@app.route('/recebimento', methods = ['GET'])
def acess_pag_recebimento():
    if not session.get('logado'):
        return redirect('/')
    return render_template('recebimento.html')

@app.route('/receber_produto', methods = ['GET'])
def acess_pag_receber_produto():
    if not session.get('logado'):
        return redirect('/')
    return render_template('receber_produto.html')

@app.route('/registrar_entrada_recebimento', methods= ['POST'])
def registrar_entrada_recebimento():
    
    if not session.get('logado'):
        return redirect('/')

    conexao = None
    cursor = None
        
    try:
        dados = request.get_json()
        
        codigo_produto = dados['codigo_produto']
        quantidade = dados['quantidade']
        data_hora = dados['data_hora']
        remetente = dados['remetente']
        recebimento = dados['recebimento']
        status = 'Em recebimento/Aguardando conferência.'
        
        
        #conexao
        conexao =conexao_bd()
        cursor = conexao.cursor()
        
            
        #Query para verificar se o produto esta cadastrado.
        query_verificar = 'SELECT * FROM produtos WHERE codigo = %s'
        cursor.execute(query_verificar, (codigo_produto,))
        resposta = cursor.fetchone()
        
        #condiçoes
        if resposta:
            
            produto = resposta[0]
            descricao = resposta[1]
            modelo = resposta[2]
            fabricante = resposta[3]
            while True:
                pacote = random.randint(10000,99999)
                
                #Verificar se o pacote já existe.
                query_verificar_pacote = 'SELECT * FROM recebimento WHERE pacote = %s'
                cursor.execute(query_verificar_pacote, (pacote,))
                resposta_pacote = cursor.fetchone()
                
                if resposta_pacote:
                    continue
                
                #query para inserir na tabela recebimento:
                
                query = 'INSERT INTO recebimento (produto, descricao, modelo, fabricante, codigo, quantidade_recebida, data_hora, remetente, recebimento, pacote, status) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
                cursor.execute(query, (produto, descricao, modelo, fabricante, codigo_produto, quantidade, data_hora, remetente, recebimento,pacote,status))
                conexao.commit()
                
                #retorno para o front
                return jsonify({
                    'msg': f'Registro de entrada do produto {codigo_produto} registrado com sucesso.'
                })    
        else:
            return jsonify({
                'msg': 'Produto não cadastrado.'
            })
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
    

@app.route('/consultar_recebimento', methods= ['GET'])
def consultar_recebimento():
    
    if not session.get('logado'):
        return redirect('/')
    
    try:
        conexao = conexao_bd()
        cursor = conexao.cursor()
        
        query_listar = 'SELECT * FROM recebimento'
        cursor.execute(query_listar)
        resposta = cursor.fetchall()
        
        if resposta:
            return jsonify({
                'msg': resposta
            })
        else:
            return jsonify({
                'msg': 'Não há produtos no recebimento'
            })
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
    
    
@app.route('/excluir_pacote', methods = ['POST'])
def excluir_pacote():
    cursor = None
    conexao = None
    
    try:
        dados = request.get_json()
        pacote = dados['pacote']
        
        conexao = conexao_bd()
        cursor = conexao.cursor()
        
        query_verificar = 'SELECT * FROM recebimento WHERE pacote = %s'
        cursor.execute(query_verificar, (pacote,))
        resposta = cursor.fetchone()
        
        if resposta:
            
            query_deletar = 'DELETE FROM recebimento WHERE pacote = %s'
            cursor.execute(query_deletar, (pacote,))
            conexao.commit()
            
            return jsonify({
                'msg': f'Pacote {pacote} deletado com sucesso.'
            })
        else:
            return jsonify({
                'msg': 'Pacote não existe.'
            })
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
            
            
@app.route('/conferencia_recebimento', methods = ['GET'])
def pag_conferencia():
    return render_template('conferencia.html')


@app.route('/selecionar_pacote', methods = ['POST'])
def selecionar_pacote():
     
    conexao = None
    cursor = None
    
    try:
        conexao = conexao_bd()
        cursor = conexao.cursor()
        
        dados = request.get_json()
        pacote = dados['pacote']
        
        query = 'SELECT * FROM recebimento WHERE pacote =%s'
        cursor.execute(query, (pacote,))
        resposta = cursor.fetchone()
        
        if resposta:
            
            produto = resposta[0]
            codigo = resposta[4]
            quantidade = resposta[5]
            
            
            return jsonify({
                'produto': produto,
                'codigo': codigo,
                'quantidade': quantidade
            })
        else:
            return jsonify({
                'msg': 'Pacote não existe.'
            })    
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
            
            
            
            

@app.route('/conferir_pacote', methods=['POST'])
def conferir_pacote():

    cursor = None
    conexao = None

    try:

        dados = request.get_json()
        codigo = dados['codigo']
        pacote = dados['pacote']

        conexao = conexao_bd()
        cursor = conexao.cursor()

        # Procura o produto em recebimento
        query_verificar = """
            SELECT *
            FROM recebimento
            WHERE codigo = %s AND pacote = %s
        """

        cursor.execute(query_verificar, (codigo,pacote))
        print('1')
        resposta_rec = cursor.fetchone()

        if not resposta_rec:
            
            print('Produto nao encontrado')

            return jsonify({
                'msg': 'Produto não encontrado.'
            })
            
            

        produto = resposta_rec[0]
        descricao = resposta_rec[1]
        modelo = resposta_rec[2]
        fabricante = resposta_rec[3]
        codigo_produto = resposta_rec[4]
        quantidade_recebimento = resposta_rec[5]
        pacote =  resposta_rec[9]

        # Diminui uma unidade do recebimento
        quantidade_recebimento -= 1

        query_update = """
            UPDATE recebimento
            SET quantidade_recebida = %s
            WHERE codigo = %s AND pacote = %s
        """

        cursor.execute(query_update, (quantidade_recebimento, codigo_produto, pacote))
        conexao.commit()
        print('2')

        # Procura na armazenagem
        query_arm = """
            SELECT *
            FROM armazenagem
            WHERE codigo = %s
        """

        cursor.execute(query_arm, (codigo_produto,))
        print('3')
        resposta_arm = cursor.fetchone()

        if resposta_arm:

            quantidade_arm = resposta_arm[5]
            quantidade_total = quantidade_arm + 1

            query_update_arm = """
                UPDATE armazenagem
                SET quantidade = %s
                WHERE codigo = %s AND pacote = %s
            """

            cursor.execute(query_update_arm, (quantidade_total, codigo_produto, pacote))
            conexao.commit()
            print(4)

        else:

            query_insert = """
                INSERT INTO armazenagem
                (
                    produto,
                    descricao,
                    modelo,
                    fabricante,
                    codigo,
                    quantidade,
                    pacote
                )
                VALUES (%s,%s,%s,%s,%s,%s,%s)
            """

            cursor.execute(
                query_insert,
                (
                    produto,
                    descricao,
                    modelo,
                    fabricante,
                    codigo_produto,
                    1,
                    pacote
                )
            )
            conexao.commit()
            print(5)

        # Remove do recebimento quando acabar
        if quantidade_recebimento <= 0:

            query_delete = """
                DELETE
                FROM recebimento
                WHERE codigo = %s
            """

            cursor.execute(query_delete, (codigo_produto,))
            conexao.commit()
            
            return jsonify({
                'msg_concluida': 'Conferido com sucesso.'
            })

        return jsonify({
            'status': 'true',
            'msg': '1x Conferido',
            'qtd': quantidade_recebimento
        })

    except Exception as e:

        if conexao:
            conexao.rollback()

        print(e)       
        
        return jsonify({
            'msg': str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conexao:
            conexao.close()
            
            
            
            
            
            
    
@app.route('/armazenagem', methods = ['GET'])   
def pag_armazenagem():
    return render_template('armazenar.html')


@app.route('/listar_armazenagem', methods = ['GET'])
def listar_armazenar():
    
    conexao = None
    cursor = None
    
    #Usando tratamento de erros.
    try:
        #Buscando conexao
        conexao = conexao_bd()
        cursor = conexao.cursor()

        query = 'SELECT * FROM armazenagem'
        cursor.execute(query)
        resposta = cursor.fetchall()
        
        if resposta:
            return jsonify({
                'msg': resposta
            })
        else:
            return jsonify({
                'msg': 'Não há produtos para armazenar.'
            })
    except Exception as e:
        print(e)
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()
        
        
        
        

@app.route(
    '/armazenar_produto_em_estoque',
    methods=['POST']
)
def armazenar_produto_em_estoque():

    conexao = None
    cursor = None


    try:

        # ==========================================
        # PEGAR JSON
        # ==========================================

        dados = request.get_json()


        if not dados:

            return jsonify({

                'sucesso': 'false',

                'msg':
                    'Nenhum dado foi recebido.'

            }), 400



        # ==========================================
        # PEGAR DADOS
        # ==========================================

        pacote = dados.get('pacote')
        endereco = dados.get('endereco')



        # ==========================================
        # VALIDAR PACOTE
        # ==========================================

        if not pacote:

            return jsonify({

                'sucesso': 'false',

                'msg':
                    'Pacote não informado.'

            }), 400



        # ==========================================
        # VALIDAR ENDEREÇO
        # ==========================================

        if not endereco:

            return jsonify({

                'sucesso': 'false',

                'msg':
                    'Endereço não informado.'

            }), 400



        # ==========================================
        # CONEXÃO
        # ==========================================

        conexao = conexao_bd()


        cursor = conexao.cursor()



        # ==========================================
        # 1. PROCURAR PACOTE
        # ==========================================

        query_pacote = '''

            SELECT * FROM armazenagem WHERE pacote = %s

        '''


        cursor.execute(
            query_pacote,
            (pacote,)
        )


        resposta = cursor.fetchone()



        # ==========================================
        # PACOTE NÃO ENCONTRADO
        # ==========================================

        if not resposta:

            return jsonify({

                'sucesso': 'false',

                'msg':
                    'Pacote não encontrado na armazenagem.'

            })



        # ==========================================
        # DADOS DO PACOTE
        # ==========================================

        produto = resposta[0]
        descricao =resposta[1]
        modelo = resposta[2]
        fabricante = resposta[3]
        codigo = resposta[4]
        quantidade =resposta[5]
        pacote_banco = resposta[6]
        
        
        quey_pegar_preco = 'SELECT * FROM produtos WHERE codigo = %s'
        cursor.execute(quey_pegar_preco, (codigo,))
        resposta_preco = cursor.fetchone()
                
        if resposta_preco:
            preco_venda = resposta_preco[5]
            ean = resposta_preco[6]
        



        print(
            'PACOTE:',
            pacote_banco
        )


        print(
            'PRODUTO:',
            produto
        )


        print(
            'CÓDIGO:',
            codigo
        )


        print(
            'QUANTIDADE:',
            quantidade
        )


        print(
            'ENDEREÇO:',
            endereco
        )
        
        print(
            'P.Venda:',
            preco_venda
            )

        print(
            'Ean:',
            ean
            )


        # ==========================================
        # 2. VERIFICAR ENDEREÇO
        # ==========================================

        query_endereco = '''

            SELECT * FROM enderecos WHERE endereco = %s

        '''


        cursor.execute(
            query_endereco,
            (endereco,)
        )


        resposta_endereco = cursor.fetchone()



        # ==========================================
        # ENDEREÇO NÃO EXISTE
        # ==========================================

        if not resposta_endereco:

            return jsonify({

                'sucesso': 'false',

                'msg':
                    'Esse endereço não existe na tabela enderecos.'

            })



        print(
            'ENDEREÇO EXISTE:',
            endereco
        )



        # ==========================================
        # 3. VERIFICAR SE ENDEREÇO ESTÁ OCUPADO
        # ==========================================

        query_estoque = '''

            SELECT * FROM estoque WHERE endereco = %s

        '''


        cursor.execute(
            query_estoque,
            (endereco,)
        )


        resposta_estoque = cursor.fetchone()



        # ==================================================
        # ENDEREÇO JÁ ESTÁ SENDO USADO
        # ==================================================

        if resposta_estoque:


            print(
                'ENDEREÇO JÁ ESTÁ OCUPADO. VERIFICANDO SE É O MESMO PRODUTO.'
            )

            # ======================================
            # VERIFICAR SE ESSE PRODUTO É O MESMO QUE QUERO ARMAZENAR
            # ======================================
            
            #Pegar codigo do produto armazenado.
            codigo_do_produto_armazenado = resposta_estoque[4]
            
            if codigo_do_produto_armazenado == codigo:
                
            


                # ======================================
                # QUANTIDADE ATUAL
                # ======================================

                quantidade_atual = resposta_estoque[5]



                print(
                    'QUANTIDADE ATUAL:',
                    quantidade_atual
                )
                
                
                
                # ======================================
                # SOMAR
                # ======================================

                quantidade_atualizada = (

                    quantidade_atual
                    +
                    quantidade

                )



                print(
                    'NOVA QUANTIDADE:',
                    quantidade_atualizada
                )



                # ======================================
                # ATUALIZAR
                # ======================================

                query_update = '''

                    UPDATE estoque

                    SET quantidade = %s

                    WHERE endereco = %s

                '''


                cursor.execute(

                    query_update,

                    (
                        quantidade_atualizada,
                        endereco
                    )

                )


                print(
                    'ESTOQUE ATUALIZADO.'
                )         
            else:
                return jsonify({
                    'msg': 'Endereço ocupado.'
                })
            


        # ==================================================
        # ENDEREÇO LIVRE
        # ==================================================

        else:


            print(
                'ENDEREÇO ESTÁ LIVRE.'
            )
            
            query_verificar_produto_em_estoque ='SELECT * FROM estoque WHERE codigo =%s'
            cursor.execute(query_verificar_produto_em_estoque, (codigo,))
            resposta__ = cursor.fetchone()
            
            if resposta__:
                
                endereco = resposta__[6]
                
                menssagem = f'Produto já tem endereço: {endereco}'
                
                return jsonify({
                    'msg_cod': 'ja tem endereco',
                    'msg' : str(menssagem),
                    'endereco': endereco
                })



            # ======================================
            # INSERIR NOVO PRODUTO
            # ======================================

            query_insert = '''

                INSERT INTO estoque
                (
                    produto,
                    descricao,
                    modelo,
                    fabricante,
                    codigo,
                    preco_venda,
                    ean,
                    quantidade,
                    endereco
                )

                VALUES
                (
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s
                )

            '''


            cursor.execute(

                query_insert,

                (
                    produto,
                    descricao,
                    modelo,
                    fabricante,
                    codigo,
                    preco_venda,
                    ean,
                    quantidade,
                    endereco
                )

            )


            print(
                'NOVO PRODUTO INSERIDO.'
            )



        # ==========================================
        # 4. REMOVER PACOTE DA ARMAZENAGEM
        # ==========================================

        query_delete = '''

            DELETE FROM armazenagem

            WHERE pacote = %s

        '''


        cursor.execute(

            query_delete,

            (pacote_banco,)

        )


        print(
            'PACOTE REMOVIDO DA ARMAZENAGEM.'
        )



        # ==========================================
        # 5. COMMIT
        # ==========================================

        conexao.commit()



        print(
            'TRANSAÇÃO CONCLUÍDA.'
        )



        # ==========================================
        # RESPOSTA
        # ==========================================

        return jsonify({

            'sucesso': 'true',

            'msg':
                'Produto armazenado com sucesso!',

            'pacote':
                pacote_banco,

            'endereco':
                endereco,

            'quantidade':
                quantidade

        })



    # ==============================================
    # ERRO
    # ==============================================

    except Exception as e:


        print(
            'ERRO AO ARMAZENAR:',
            str(e)
        )



        if conexao:

            conexao.rollback()



        return jsonify({

            'sucesso': 'false',

            'msg':
                str(e)

        }), 500



    # ==============================================
    # FINALIZAR
    # ==============================================

    finally:


        if cursor:

            cursor.close()


        if conexao:

            conexao.close()
    
    
@app.route('/pag_mover_produto', methods = ['GET'])
def pag_mover_pro():
    return render_template('movimentar_produto.html')



@app.route('/mover_produto', methods = ['POST'])
def mover_produto():
    
    #PEGANDO DADOS DO REQUEST
    dados = request.get_json()
    
    codigo = dados['codigo']
    endereco_novo = dados['endereco']
    
    print('Dados resgatados = ', codigo, endereco_novo)
    
    conexao = None
    cursor = None
    
    #CRIANDO CONEXAO
    try:
        
        print('REALIZANDO CONEXÃO')
        
        conexao = conexao_bd()
        cursor = conexao.cursor()
        
        #VERIFICAR SE ESTA EM ESTOQUE PARA SER MOVIMENTADO
        print('Verificando e esse produto está em estoque.')
        
        query_verificar_se_tem_estoque = 'SELECT * FROM estoque WHERE codigo = %s'
        cursor.execute(query_verificar_se_tem_estoque, (codigo,))
        resposta = cursor.fetchone()
        
        #CODIÇÕES
        if resposta:
            
            #verificar se esse endereço existe.
            query_verificar_end = 'SELECT * FROM enderecos WHERE endereco = %s'
            cursor.execute(query_verificar_end, (endereco_novo,))
            resposta__ = cursor.fetchone()
            
            if resposta__:
                
                
                query_verificar_endereco_estoque = '''
                    SELECT *
                    FROM estoque
                    WHERE endereco = %s
                '''

                cursor.execute(
                    query_verificar_endereco_estoque,
                    (endereco_novo,)
                )

                endereco_ocupado = cursor.fetchone()
                
                if endereco_ocupado:

                    return jsonify({
                        'msg': 'O novo endereço já está ocupado.'
                    })
            
                #FAZENDO UPDATE
                print('Fazendo update')
                
                query_update = '''
                    UPDATE estoque
                    SET endereco = %s
                    WHERE codigo = %s
                '''
                
                cursor.execute(query_update, (endereco_novo, codigo))
                conexao.commit()
                
                
                
                return jsonify({
                    'msg': 'Endereço alterado com sucesso.'
                })
            else:
                return jsonify({
                    'msg': 'Endereço não encontrado.'
                })
        else:
            return jsonify({
                'msg': 'Produto não está em estoque.'
            })
    except Exception as e:
        return jsonify({
            'msg': str(e)
        })
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()        
    
            
        
        
        
        
            
            
            
            
            
            
            
if __name__ == '__main__':
    app.run(debug=True)
    