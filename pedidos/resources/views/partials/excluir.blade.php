<form method="POST" action="{{ $url }}" onsubmit="return confirm('Tem certeza que deseja excluir este registro?')">
    @csrf
    @method('DELETE')
    <button class="btn-small red darken-2">Excluir</button>
</form>
