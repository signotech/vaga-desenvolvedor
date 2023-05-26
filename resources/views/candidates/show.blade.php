<x-layout>
    <a href="/candidates" class="inline-block text-black ml-4 mb-4"><i class="fa-solid fa-arrow-left"></i> Voltar
    </a>
    <div class="mx-4">
        <x-card class="p-10">
            <div class="flex flex-col items-center justify-center text-center">

                <h3 class="text-2xl mb-2">
                    Nome do candidato: {{ $candidate->name }}
                </h3>

                <h3 class="text-2xl mb-2">
                    E-mail do candidato: {{ $candidate->email }}
                </h3>

                <div>
                    <div class="text-lg space-y-6">

                        <a href="mailto:{{ $candidate->email }}"
                            class="block bg-laravel text-white mt-6 py-2 rounded-xl hover:opacity-80 px-5"><i
                                class="fa-solid fa-envelope"></i>
                            Contate o Candidato
                        </a>

                    </div>
                </div>
            </div>

            <x-card class="mt-4 p-2 flex space-x-6">
                <a href="/candidates/{{ $candidate->id }}/edit">
                    <i class="fa-solid fa-pencil"></i> Editar
                </a>

                <form method="POST" action="/candidates/{{ $candidate->id }}">
                    @csrf
                    @method('DELETE')
                    <button class="text-red-500"><i class="fa-solid fa-trash"></i> Excluir</button>
                </form>
            </x-card>
    </div>
    </x-card>
    </div>
</x-layout>
