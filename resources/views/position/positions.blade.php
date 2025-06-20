<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Vagas') }}
        </h2>
    </x-slot>
      
        <div class="py-12">
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mb-4">
            <div class="p-4 sm:p-8 bg-gray-100 dark:bg-gray-800 shadow sm:rounded-lg">
              
              <form method="get" action="{{ route('positions.index') }}" class="flex flex-row items-center justify-start justify-between bg-white border rounded-md p-3 mb-3" id="form">
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
                        'created_at_desc' => 'Mais recentes',
                        'created_at_asc' => 'Mais antigas',
                        'title_asc' => 'Título A-Z',
                        'title_desc' => 'Título Z-A',
                      ]
                  @endphp

                  <div class="flex flex-row space-x-4 items-center">
                    <x-order :options="$options" name="order" label="Ordenar por" id="order"/>
  
                    <x-primary-button class="bg-green-600 hover:bg-green-700 text-white h-1/2">{{ __('Pesquisar') }}</x-primary-button>
                  </div>

                </form>

              @foreach ($positions as $position)
                <div class="bg-white border rounded-md p-3 mb-2">
                  <h3 class="font-semibold">{{$position->title}}</h3>
                  <div class="flex flex-row mb-2 italic">
                    <p class="mr-2">{{$position->contract}}</p>
                    <p>{{$position->type}}</p>
                  </div>
                  <div class="flex flex-col mb-2">
                    <p class="font-semibold">Descrição</p>
                    <p>{{$position->description}}</p>
                  </div>
                  <div class="flex flex-col mb-5">
                    <p class="font-semibold">Requisitos</p>
                    <p>{{$position->requirements}}</p>
                  </div>                
    
                  @auth
                    @if (Auth::user()->role === 'admin' || Auth::user()->role === 'moderator')
                      <a href="{{ route('positions.edit', ['position' => $position->id]) }}">
                        {{__('Editar')}}
                      </a>
                    @elseif (Auth::user()->role === 'user')
                      <form method="post" action="{{ route('position.apply') }}" class="mt-6 space-y-6">
                        @csrf
                        <input type="hidden" name="position_id" value="{{ $position->id }}">

                        <div class="flex items-center gap-4">
                          <x-primary-button class="bg-green-600 hover:bg-green-700 text-white">{{ __('Candidatar-se') }}</x-primary-button>
      
                          @if (session('status') === 'application-sent')
                            <p
                                x-data="{ show: true }"
                                x-show="show"
                                x-transition
                                x-init="setTimeout(() => show = false, 2000)"
                                class="text-sm text-gray-600 dark:text-gray-400"
                            >{{ __('Candidatura enviada.') }}</p>
                          @endif
                        </div>
                      </form>
                    @endif
                  @else 
                    <a class="inline-flex items-center px-4 py-2 bg-green-600 dark:bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-green-500 dark:hover:bg-green-500  transition ease-in-out duration-150"
                      href="{{ route('login') }}"
                    >
                      Candidatar-se
                    </a>
                  @endauth
                </div>
              @endforeach
              {{ $positions->links() }}
            </div>
          </div>
        </div>      
</x-app-layout>
