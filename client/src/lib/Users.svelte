<script lang="ts">
    import { fade } from 'svelte/transition'
    import { flip } from 'svelte/animate'
    import { cubicOut } from 'svelte/easing'
    import { users } from '@/stores'

    const animationOptions = {
        duration: 600,
        easing: cubicOut,
    }
</script>

<section>
    <h2>Users</h2>
    <ul>
        {#each $users as user (user.id)}
            <li transition:fade={animationOptions} animate:flip={animationOptions}>
                {user.name}
            </li>
        {/each}
    </ul>
</section>

<style>
    section {
        padding: 1rem;
        overflow-y: auto;
    }

    ul {
        list-style-type: none;
        padding-top: 1rem;
        color: var(--dark-font-color);
    }

    li {
        margin-block: 0.5rem;
    }
</style>
