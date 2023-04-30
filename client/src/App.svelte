<script lang="ts">
    import Login from '@/lib/Login.svelte'
    import Header from '@/lib/Header.svelte'
    import { name } from '@/stores'
    import Chat from '@/lib/Chat.svelte'
</script>

<Header />
{#if $name}
    <Chat />
{:else}
    <Login />
{/if}
