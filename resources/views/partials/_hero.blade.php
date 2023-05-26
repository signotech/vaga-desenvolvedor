<section class="relative h-72 bg-laravel flex flex-col justify-center align-center text-center space-y-4 mb-4">
    <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-no-repeat bg-center"
        style="background-image: url('images/laravel-logo.png')"></div>

    <div class="z-10">
        <h1 class="text-6xl font-bold uppercase text-white">
            Busca Empregos</span>
        </h1>
        <p class="text-2xl text-gray-200 font-bold my-4">
            Cadastre-se nas oportunidades de emprego
        </p>
        <div>
            @auth
            @else
                <a href="/register"
                    class="inline-block border-2 border-white text-white py-2 px-4 rounded-xl uppercase mt-2 hover:text-black hover:border-black">Logar
                    para procurar vagas</a>
            @endauth
        </div>
    </div>
</section>
