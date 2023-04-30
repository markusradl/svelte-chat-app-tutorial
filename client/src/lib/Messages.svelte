<script lang="ts">
    import Message from '@/lib//Message.svelte'

    export let messages: message[] = []
</script>

<section>
    <ol>
        {#each messages as message}
            <Message {message} />
        {/each}
    </ol>
</section>
