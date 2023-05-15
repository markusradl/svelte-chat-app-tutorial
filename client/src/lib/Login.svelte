<script>
    import { name } from '@/stores'

    let name_input = ''
    function handle_login() {
        $name = name_input
    }
</script>

<section aria-label="login">
    <form on:submit|preventDefault={handle_login}>
        <label for="login_name">Choose a name</label>
        <input type="text" id="login_name" bind:value={name_input} required />
        <button>Start chat</button>
    </form>
</section>

<style lang="scss">
    @use '../scss/breakpoints' as *; // Alles aus einer partial scss Datei importieren "_breakpoints.scss". _ am Anfang des Dateinamens ist wichtig, damit die Datei nicht kompiliert wird.
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        @media (min-width: $md) {
            flex-direction: row;
        }
    }

    label {
        white-space: nowrap;
    }
</style>
