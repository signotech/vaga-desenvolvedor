<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Candidaturas') }}
        </h2>
    </x-slot>
      
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mb-4">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                <form method="get" action="{{ route('applications.index') }}" class="flex flex-row items-center justify-start justify-between bg-white border rounded-md p-3 mb-3" id="form">
                <div class="w-5/12">
                    <x-input-label for="search" :value="__('Pesquisar')" />
                    <x-text-input id="search" name="search" type="text" class="mt-1 mb-4 block w-3/4" value="{{ request('search') }}" autofocus />
                </div>
                
                @php
                  $contracts = ['CLT', 'PJ', 'Freelancer'];
                  $types = ['Híbrido', 'Presencial', 'Remoto']
                @endphp
                  
                  <div class="flex flex-col content-center space-y-2">
                    <div class="flex flex-row space-x-3">
                      @foreach ($contracts as $contract)
                      <x-checkbox name="contract[]" :value="$contract" :checked="in_array($contract, (array) request('contract'))" :label="$contract" />
                      @endforeach
                    </div>
                    
                    <div class="flex flex-row space-x-3">
                      @foreach ($types as $type)
                      <x-checkbox name="type[]" :value="$type" :checked="in_array($type, (array) request('type'))" :label="$type" />
                      @endforeach
                    </div>
                  </div>

                @php
                    $options = [
                        'title_asc' => 'Título crescente',
                        'title_desc' => 'Título decrescente',
                    ];
                @endphp

                <div class="flex flex-row space-x-4 items-center ">
                <x-order :options="$options" name="order" label="Ordenar por" id="order-application"/>

                <x-primary-button class="bg-green-600 hover:bg-green-700 text-white h-1/2">{{ __('Pesquisar') }}</x-primary-button>
                </div>

                </form>
            </div>
        @foreach ($positions as $position)
            <div class="bg-white dark:bg-gray-800 shadow rounded p-6 mb-6">
                <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {{ $position->title }}
                </h3>

                @if ($position->candidates->isEmpty())
                    <p class="text-sm text-gray-500">Nenhuma candidatura.</p>
                @else
                    <ul class="list-disc pl-5">
                        @foreach ($position->candidates as $user)
                            <li class="text-gray-700 dark:text-gray-300">{{ $user->name }} – {{ $user->email }}</li>
                        @endforeach
                    </ul>
                @endif
            </div>
        @endforeach
    </div>

        <div class="mt-4">
            {{ $positions->links() }}
        </div>
    </div>
</x-app-layout>



