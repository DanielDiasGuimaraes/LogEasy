import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = int(os.getenv('DB_PORT', '3306'))
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')
DB_NAME = os.getenv('DB_NAME', 'logeasy')


def criar_tabelas():
    conexao = mysql.connector.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD
    )

    cursor = conexao.cursor()

    cursor.execute(
        f"CREATE DATABASE IF NOT EXISTS `{DB_NAME}` "
        "CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci"
    )
    cursor.execute(f"USE `{DB_NAME}`")

    tabelas = {
        'armazenagem': '''
            CREATE TABLE IF NOT EXISTS armazenagem (
                produto VARCHAR(100) NOT NULL,
                descricao VARCHAR(100) NOT NULL,
                modelo VARCHAR(100) NOT NULL,
                fabricante VARCHAR(100) NOT NULL,
                codigo INT NOT NULL,
                quantidade INT NOT NULL,
                pacote VARCHAR(100) NOT NULL
            )
        ''',
        'enderecos': '''
            CREATE TABLE IF NOT EXISTS enderecos (
                endereco VARCHAR(100) NOT NULL
            )
        ''',
        'estoque': '''
            CREATE TABLE IF NOT EXISTS estoque (
                produto VARCHAR(100) NOT NULL,
                descricao VARCHAR(200) NOT NULL,
                modelo VARCHAR(100) NOT NULL,
                fabricante VARCHAR(80) NOT NULL,
                codigo INT NOT NULL,
                preco_venda FLOAT NOT NULL,
                ean VARCHAR(100) NOT NULL,
                quantidade INT NOT NULL,
                endereco VARCHAR(100) NOT NULL
            )
        ''',
        'produtos': '''
            CREATE TABLE IF NOT EXISTS produtos (
                produto VARCHAR(50) NOT NULL,
                descricao VARCHAR(200) NOT NULL,
                modelo VARCHAR(80) NOT NULL,
                fabricante VARCHAR(80) NOT NULL,
                preco_custo FLOAT NOT NULL,
                preco_venda FLOAT NOT NULL,
                ean VARCHAR(50) NOT NULL,
                codigo INT NOT NULL
            )
        ''',
        'recebimento': '''
            CREATE TABLE IF NOT EXISTS recebimento (
                produto VARCHAR(80) NOT NULL,
                descricao VARCHAR(200) NOT NULL,
                modelo VARCHAR(100) NOT NULL,
                fabricante VARCHAR(100) NOT NULL,
                codigo VARCHAR(10) NOT NULL,
                quantidade_recebida INT NOT NULL,
                data_hora VARCHAR(20) NOT NULL,
                remetente VARCHAR(50) NOT NULL,
                recebimento VARCHAR(50) NOT NULL,
                pacote INT NOT NULL,
                status VARCHAR(80) NOT NULL
            )
        ''',
        'usuarios': '''
            CREATE TABLE IF NOT EXISTS usuarios (
                usuario VARCHAR(20) NOT NULL,
                senha VARCHAR(100) NOT NULL
            )
        '''
    }

    for nome, sql in tabelas.items():
        cursor.execute(sql)
        print(f'[OK] Tabela {nome} criada/verificada.')

    conexao.commit()
    cursor.close()
    conexao.close()

    print('\nBanco LOGEASY e tabelas criados com sucesso!')


if __name__ == '__main__':
    try:
        criar_tabelas()
    except mysql.connector.Error as erro:
        print(f'\nERRO MySQL: {erro}')
