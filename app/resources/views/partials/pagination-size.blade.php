<form method="GET" class="right" style="display:flex;gap:8px;align-items:center">
@foreach(request()->except('per_page','page') as $key=>$value)<input type="hidden" name="{{ $key }}" value="{{ $value }}">@endforeach
<label>Por página</label><select name="per_page" onchange="this.form.submit()" style="display:block;width:90px"><option value="10" @selected(request('per_page')==10)>10</option><option value="20" @selected(request('per_page',20)==20)>20</option><option value="50" @selected(request('per_page')==50)>50</option><option value="100" @selected(request('per_page')==100)>100</option></select>
</form>
