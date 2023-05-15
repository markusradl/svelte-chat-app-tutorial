<script lang="ts">
    import Message from '@/lib//Message.svelte'
    export let message_element: HTMLElement
    export let messages: message[] = []
</script>

<section aria-label="messages" bind:this={message_element}>
    <ol>
        {#each messages as message}
            <Message {message} />
        {/each}
    </ol>
</section>

<style>
    ol {
        list-style: none;
    }
    section {
        padding: 0.5rem;
        overflow-y: scroll;
    }
</style>
