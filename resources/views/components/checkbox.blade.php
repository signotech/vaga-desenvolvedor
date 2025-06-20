@props(['checked' => false, 'label'])

<label class="inline-flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
    <input 
        type="checkbox"
        {{ $attributes->merge(['class' => 'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500']) }}
        @checked($checked)
    >
    <span>{{ $label }}</span>
</label>