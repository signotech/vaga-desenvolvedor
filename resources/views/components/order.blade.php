@props([
    'options' => [],
    'name' => 'order',
    'selected' => request('order'),
    'label' => 'Ordenar por'
])

<div class="mb-4">
    <label for="{{ $name }}" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {{ $label }}
    </label>
    <select
        name="{{ $name }}"
        id="{{ $name }}"
        class="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring focus:ring-indigo-200"
    >
        @foreach ($options as $value => $text)
            <option value="{{ $value }}" @selected($selected == $value)>{{ $text }}</option>
        @endforeach
    </select>
</div>
