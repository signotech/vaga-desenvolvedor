<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>@yield('title')</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="/css/styles.css">
        <link rel="stylesheet" href="css/styles.css">
        <link rel="stylesheet" href="./css/styles.css">
        <link rel="stylesheet" href=".../css/styles.css">
        <link rel="stylesheet" href="../css/styles.css">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@100&display=swap" 
        rel="stylesheet">

        <script src="/js/script.js" async defer></script>

        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    </head>
    
    
    
<body>
    <header>
    <div class="header-menu">
        <ul>
        <div class="header-logo">
            <li>
                <a href="/" id="logo">
                    <ion-icon name="battery-charging-outline" size="large"></ion-icon>
                </a>    
            </li>
        </div>

        <div class="header-item">
            <li>
                <a href="/">
                    ENTRAR
                </a>    
            </li>
        </div>

        <div class="header-item">
            <li>
                <a href="/">
                    PRODUTOS
                </a>    
            </li>
        </div>

        <div class="header-item">
            <li>
                <a href="/events/cliente">
                    CLIENTES
                </a>    
            </li>
        </div>

    
        <div class="clear"></div>
    <div>
    </header>

    <div id="flash-news">
        <div id="main text">
            <h3>
            hello
            </h3>
        </div>

    </div>


    @yield('content')


    <div class="footer">
        <footer>
            <p>Pare de perder seu tempo &copy; 2023</p>
        </footer>
    </div>
</body>
</html>