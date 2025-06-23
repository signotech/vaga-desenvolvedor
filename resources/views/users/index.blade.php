<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Usuários') }}
        </h2>
    </x-slot>
      
        <div class="py-12">
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mb-4">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

              <form method="get" action="{{ route('users.index') }}" class="flex flex-row items-center justify-start justify-between bg-white border rounded-md p-3 mb-3" id="form">
                <div class="w-5/12">
                  <x-input-label for="search" :value="__('Pesquisar')" />
                  <x-text-input id="search" name="search" type="text" class="mt-1 mb-4 block w-3/4" value="{{ request('search') }}" autofocus />
                </div>
                
                @php
                  $roles = ['admin', 'moderator', 'user'];
                @endphp
                  
                  <div class="flex flex-col content-center space-y-2">
                    <div class="flex flex-row space-x-3">
                      @foreach ($roles as $role)
                      <x-checkbox name="role[]" :value="$role" :chececk="in_array($role, (array) request('role'))" :label="$role" />
                      @endforeach
                    </div>
                  </div>

                  @php
                      $options = [
                        'name_asc' => 'Nome crescente',
                        'name_desc' => 'Nome decrescente',
                      ]
                  @endphp

                  <div class="flex flex-row space-x-4 items-center ">
                    <x-order :options="$options" name="order" label="Ordenar por" id="order-user"/>
  
                    <x-primary-button class="bg-green-600 hover:bg-green-700 text-white h-1/2">{{ __('Pesquisar') }}</x-primary-button>
                  </div>

                </form>

              @foreach ($users as $user)
                <div class="border rounded-md p-3 mb-2">
                  <h3 class="font-semibold">{{$user->title}}</h3>
                  <div class="flex flex-row mb-2 italic space-x-4">
                    <p class="font-semibold">Nome:</p>
                    <p class="">{{$user->name}}</p>
                  </div>              
                  <div class="flex flex-row mb-2 italic space-x-4">
                    <p class="font-semibold">E-mail:</p>
                    <p>{{$user->email}}</p>
                  </div>
                  <div class="flex flex-row mb-2 italic space-x-4">
                    <p class="font-semibold">Acesso:</p>
                    <p>{{$user->role}}</p>
                  </div>
                </div>
              @endforeach
              {{ $users->links() }}
            </div>
          </div>
        </div>      
</x-app-layout>



