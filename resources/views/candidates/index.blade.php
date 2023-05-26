<x-layout>
    @include('partials._user-search')

    <div class="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4">

        @unless (count($candidates) == 0)

            @foreach ($candidates as $candidate)
                <x-candidate :candidate="$candidate" />
            @endforeach
        @else
            <p>Nenhum candidato encontrado</p>
        @endunless

    </div>

    <div class="mt-6 p-4">
        {{ $candidates->links() }}
    </div>
</x-layout>
