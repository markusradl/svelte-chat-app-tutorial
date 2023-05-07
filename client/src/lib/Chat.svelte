<script lang="ts">
    import { io, Socket } from 'socket.io-client'
    import Messages from '@/lib/Messages.svelte'
    import SendForm from '@/lib/SendForm.svelte'
    import { reload_page } from '@/utils'
    import { name } from '@/stores'
    import { onMount } from 'svelte'
    import Users from '@/lib/Users.svelte'
    import Menu from '@/lib/Menu.svelte'

    let my_message_text = ''
    let messages: message[] = []
    let users: user[] = []
    let show_users: boolean = false

    const socket: Socket<server_to_client_events, client_to_server_events> = io()

    onMount(() => {
        socket.emit('login', $name)
    })

    socket.on('message', (msg) => {
        messages = [...messages, msg]
    })

    socket.on('users', (_users) => {
        users = _users
    })

    socket.on('disconnect', reload_page)

    function send_message() {
        socket.emit('message', { user_name: $name, text: my_message_text, bot: false })
        my_message_text = ''
    }
</script>

<Menu bind:show_users />

{#if show_users}
    <Users {users} />
{:else}
    <Messages {messages} />

    <SendForm bind:my_message_text {send_message} />
{/if}
