<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Perfil') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mb-4">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <h3 class="font-bold text-2xl mb-3">Informações pessoais</h3>
                <div class="max-w-xl">
                   <div class="flex flex-row">
                       <p class="font-bold mr-3">Nome:</p> 
                       <p>{{$user->name}}</p>
                   </div>
                   <div class="flex flex-row">
                       <p class="font-bold mr-3">E-mail:</p> 
                       <p>{{$user->email}}</p>
                   </div>
                </div>
            </div>

        </div>

                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <h3 class="font-bold text-2xl mb-3">Informações profissionais</h3>
                <div class="max-w-xl">
                   <p>{{$user->name}}</p>
                   <p>{{$user->email}}</p>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
