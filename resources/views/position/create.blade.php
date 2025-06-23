<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Criar vaga') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="max-w-xl">
                    <form method="POST" action="{{ route('positions.store') }}">
                        @csrf

                        <div class="mt-4">
                            <x-input-label for="title" :value="__('Título')" />
                            <x-text-input id="title" name="title" type="text" class="mt-1 mb-4 block w-full" value="" required autofocus />
                            <x-input-error :messages="$errors->get('title')" class="mt-2" />

                            @php
                                $contracts = ['CLT', 'PJ', 'Freelancer'];
                                $types = ['Híbrido', 'Presencial', 'Remoto']
                            @endphp

                            <x-input-label for="constract" :value="__('Regime')" />
                            <select name="contract" id="contract" class="mt-1 mb-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                            equired autofocus>
                            <option value="{{__('Selecione o regime')}}"></option>
                                @foreach ($contracts as $contract)
                                    <option value="{{ $contract }}">{{ $contract }}</option>
                                @endforeach
                            </select>

                            <x-input-label for="type" :value="__('Tipo')" />
                            <select name="type" id="type" class="mt-1 mb-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                            equired autofocus>
                            <option value="{{__('Selecione o regime')}}"></option>
                                @foreach ($types as $type)
                                    <option value="{{ $type }}">{{ $type }}</option>
                                @endforeach
                            </select>

                            <x-input-label for="description" :value="__('Descrição')" />
                            <x-text-input id="description" name="description" type="text" class="mt-1 mb-4 block w-full" value="" required autofocus />
                            <x-input-error :messages="$errors->get('description')" class="mt-2" />

                            <x-input-label for="requirements" :value="__('Requisitos')" />
                            <x-text-input id="requirements" name="requirements" type="text" class="mt-1 mb-4 block w-full" value="" required autofocus />
                            <x-input-error :messages="$errors->get('requirements')" class="mt-2" />

                            <x-input-label for="status" :value="__('Status')" />

                            <div class="mt-2 mb-4 flex items-center gap-6">
                                <label class="flex items-center">
                                    <input type="radio" name="status" value="1"
                                        class="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Ativa</span>
                                </label>

                                <label class="flex items-center">
                                    <input type="radio" name="status" value="0"
                                        class="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Pausada</span>
                                </label>
                            </div>
                            
                        </div>

                        <div class="flex flex-row mt-4 space-x-4">
                            <x-primary-button>{{ __('Salvar') }}</x-primary-button>

                            <a href="{{ route('positions.index') }}" 
                            class="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition">
                                {{ __('Cancelar') }}
                            </a>
                        </div>
                    </form>
                </div>
</x-app-layout>
