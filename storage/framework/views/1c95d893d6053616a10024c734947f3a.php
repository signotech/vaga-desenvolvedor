

<?php $__env->startSection('title', 'Clientes'); ?>

<?php $__env->startSection('content'); ?>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Sarala&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
}

.cabecalho {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: rgb(18, 7, 13, 0.50);
}

.cabecalho-imagem {
    width: 80px;
    height: 80px;
}

.cabecalho-menu {
    display: flex;
    gap: 32px;
}

.cabecalho-menu-item {
    font-family: 'Sarala', sans-serif;
    color: #D4C5C5;
    font-weight: 400;
    font-size: 15px;
}

.cabecalho-menu-item:hover {
    color: hsl(355, 58%, 37%);
    font-size: 15.5px;
}

.conteudo {
    border-top: 0.4px solid #D4C5C5;
    margin-bottom: 48px;
}

.conteudo-principal {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 40px;
}

.conteudo-principal-escrito {
    display: flex;
    gap: 32px;
    flex-direction: column
}

.conteudo-principal-escrito-titulo {
    font-family: 'Righteous', sans-serif;
    font-weight: 400;
    font-size: 64px;
    color: #D4C5C5;
}

.conteudo-principal-escrito-subtitulo {
    font-family: 'Sarala', sans-serif;
    color: #D4C5C5;
    font-weight: 400;
    font-size: 24px;
}

.conteudo-principal-escrito-botao {
    background-color: #D4C5C5;
    width: 180px;
    height: 60px;
    border: none;
    box-shadow: 4px 5px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    font-family: 'Sarala', sans-serif;
    color: #7d2129;
    font-weight: 400;
    font-size: 20px;
}

.conteudo-principal-escrito-botao:hover{
    background-color: rgb(125, 33, 41, 0.50);
    color: #D4C5C5;


}

.conteudo-principal-imagem {
    height: 430px;
}

.conteudo-secundario {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin-top: 48px;
}

.conteudo-secundario-titulo {
    border-top: 0.4px solid #d4c5c58f;
    padding-top: 48px;
    font-family: 'Righteous', sans-serif;
    font-weight: 400;
    font-size: 24px;
    color: #D4C5C5;
    margin-bottom: 16px;
    text-shadow:
    -1px -1px 0 #000, 
    1px -1px 0 #000, 
    -1px 1px 0 #000, 
    1px 1px 0 #000; 
}

.conteudo-secundario-paragrafo {
    font-family: 'Sarala', sans-serif;
    color: #D4C5C5;
    font-weight: 300;
    font-size: 18px;
    text-shadow:
    -1px -1px 0 #000, 
    1px -1px 0 #000, 
    -1px 1px 0 #000, 
    1px 1px 0 #000; 
    
}

.rodape {
    padding: 32px;
    border-top: 0.4px solid #D4C5C5;
    background-color: rgb(18, 7, 13, 0.50);
}

.rodape-paragrafo {
    font-family: 'Sarala', sans-serif;
    color: #D4C5C5;
    font-size: 12px;
    text-align: center;
}

</style>
    <main class="conteudo">
        <section class="conteudo-principal">
            <div class="conteudo-principal-escrito">
                <h1 class="conteudo-principal-escrito-titulo">Ei!</h1>
                <h2 class="conteudo-principal-escrito-subtitulo">Me considere pra essa vaga :D</h2>
                <button  onclick="alert('Você está sendo redirecionado')" class="conteudo-principal-escrito-botao"><a target="blank" href="https://www.linkedin.com/in/wagner-bucoski-865313226/">Entre em contato</a></button>
            </div>

            <img class="conteudo-principal-imagem" src="<?php echo e(url('image-removedbg-png.png')); ?>" alt="Imagem Section 1 Main">
        </section>

        <section class="conteudo-secundario">
            <h3 class="conteudo-secundario-titulo">No que você está investindo me dando esse estágio?</h3>
            <p class="conteudo-secundario-paragrafo">1. Em um funcionário com sede de conhecimento.</p>
            <p class="conteudo-secundario-paragrafo">2. Em alguém criativo.</p>
            <p class="conteudo-secundario-paragrafo">3. Numa terceira coisa que eu não consegui pensar ainda ().</p>
        </section>
    </main>
    <footer class="rodape">
        <p class="rodape-paragrafo">© 2023 - Made by <a style="color: #3d8daf;" target="_blank" href="https://www.linkedin.com/in/wagner-bucoski-865313226/">Wagner Bucoski</a>. Todos os direitos reservados :D</p>
    </footer>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layout\app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH B:\xampp\htdocs\teste1\signo\resources\views/welcome.blade.php ENDPATH**/ ?>