@props(['candidate'])

<x-card>
    <div class="flex">
        <div>
            <h3 class="text-2xl">
                <a href="/candidates/{{ $candidate->id }}">
                    <div class="text-xl font-bold mb-4">{{ $candidate->email }}</div>
                </a>
            </h3>

        </div>
    </div>
</x-card>
