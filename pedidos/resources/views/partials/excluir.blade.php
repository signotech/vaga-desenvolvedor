<form method="POST" action="{{ $url }}" onsubmit="return confirm('Tem certeza que deseja excluir este registro?')">
    @csrf
    @method('DELETE')
    <button class="btn peq perigo">Excluir</button>
</form>
