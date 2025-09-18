<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }} - Home</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: #f4f6f8;
        }
        .container {
            margin-top: 100px;
        }
        .card {
            border-radius: 12px;
            box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }
        .card h1 {
            font-weight: 700;
            color: #333;
        }
        .btn-custom {
            background-color: #4a90e2;
            color: white;
        }
        .btn-custom:hover {
            background-color: #357ab7;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container text-center">
        <div class="card p-5">
            <h1>Bem-vindo!</h1>
            <p class="mb-4">Gerencie suas vagas e candidatos de forma simples e rápida.</p>
            <a href="{{ route('vagas.index') }}" class="btn btn-custom me-2">Ver Vagas</a><br>
            <a href="{{ route('candidatos.index') }}" class="btn btn-custom">Ver Candidatos</a>
        </div>
    </div>
</body>
</html>
