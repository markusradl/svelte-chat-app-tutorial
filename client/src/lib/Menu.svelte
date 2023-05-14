<script lang="ts">
    import { reload_page } from '@/utils'
    import { show_users } from '@/stores'
</script>

<menu>
    <button on:click={() => ($show_users = !$show_users)}>
        {#if $show_users}
            Show Chat
        {:else}
            Show Users
        {/if}
    </button>

    <button on:click={reload_page}> Logout </button>
</menu>

<style>
    menu {
        padding: 0.75rem;
        gap: 0.5rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        border-bottom: 0.1rem solid var(--separator-color);
    }
</style>
