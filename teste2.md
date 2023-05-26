# Instruções para o projeto

- O Sistema foi criado usando-se o banco de dados MySQL, Docker e Testes automatizados e autenticação com 3 'roles' (admin, employer e candidate)
- Views foram criadas com o TailwindCSS
- Para iniciar o sistema pode-se usar o Laravel Sail usando o comando `sail up -d`
- Para iniciar as migrations com os seeds `sail php artisan migrate:fresh --seed'
- O login para admin é (admin@mail.com:123456), empregador (empregador@mail.com:123456) e candidato (candidato@mail.com:123456)
- Apenas o admin pode gerenciar os candidatos
- Apenas o empregador pode gerenciar vagas e postar novas vagas ou pausar uma vaga
- Apenas o candidato pode se candidatar a vagas
- Para rodar os testes: `sail php artisan test`
- Para pausar uma vaga, deve-se logar como empregador, selecionar uma vaga e clicar em editar, no formulário haverá um 'checkbox' para pausar a vaga.