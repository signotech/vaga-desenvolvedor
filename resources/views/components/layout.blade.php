<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="images/favicon.ico" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="//unpkg.com/alpinejs" defer></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        laravel: '#ef3b2d',
                    },
                },
            },
        }
    </script>
    <title>Busca Empregos</title>
</head>

<body class="mb-48">
    <nav class="flex justify-between items-center mb-4">
        <a href="/"><img class="w-24" src="{{ asset('images/logo.png') }}" alt="" class="logo" /></a>
        <ul class="flex space-x-6 mr-6 text-lg">

            @auth
                <li>
                    <span class="font-bold uppercase">
                        Bem Vindo {{ auth()->user()->name }}
                        ({{ (auth()->user()->role == 'employer' ? 'Empregador' : auth()->user()->role == 'candidate') ? 'Candidato' : 'Admin' }})
                    </span>
                </li>
                @if (auth()->user()->role == 'employer')
                    <li>

                        <a href="/listings/manage" class="hover:text-laravel"><i class="fa-solid fa-gear"></i>
                            Gerenciar minhas ofertas
                        </a>
                    </li>
                @endif
                <li>
                    <form class="inline" method="POST" action="/logout">
                        @csrf
                        <button type="submit">
                            <i class="fa-solid fa-door-closed"></i> Logout
                        </button>
                    </form>
                </li>
                @if (auth()->user()->role == 'admin')
                    <li>
                        <a href="/candidates" class="hover:text-laravel"><i class="fa-solid fa-users"></i>
                            Gerenciar Candidatos</a>
                    </li>
                @endif
            @else
                <li>
                    <a href="/register" class="hover:text-laravel"><i class="fa-solid fa-user-plus"></i> Registrar</a>
                </li>
                <li>
                    <a href="/login" class="hover:text-laravel"><i class="fa-solid fa-arrow-right-to-bracket"></i>
                        Entrar</a>
                </li>
            @endauth

        </ul>
    </nav>

    <main>
        {{ $slot }}
    </main>
    <footer
        class="fixed bottom-0 left-0 w-full flex items-center justify-start font-bold bg-laravel text-white h-24 mt-24 opacity-90 md:justify-center">
        <p class="ml-2">Copyright &copy; 2023. Elton Doehnert</p>

        @auth
            @if (auth()->user()->role == 'employer')
                <a href="/listings/create" class="absolute top-1/3 right-10 bg-black text-white py-2 px-5">Criar nova
                    Vaga</a>
            @endif

        @endauth
    </footer>

    <x-flash-message />
</body>

</html>
