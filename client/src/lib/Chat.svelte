<script lang="ts">
    import { io, Socket } from 'socket.io-client'
    import Messages from '@/lib/Messages.svelte'
    import SendForm from '@/lib/SendForm.svelte'
    import { reload_page, scroll_to_bottom } from '@/utils'
    import { name, users, show_users } from '@/stores'
    import { onMount, tick } from 'svelte'
    import Users from '@/lib/Users.svelte'
    import Menu from '@/lib/Menu.svelte'

    let my_message_text = ''
    let messages: message[] = []
    let message_element: HTMLElement

    const socket: Socket<server_to_client_events, client_to_server_events> = io()

    onMount(() => {
        socket.emit('login', $name)
    })

    socket.on('message', async (msg) => {
        messages = [...messages, msg]
        await tick() // wait for DOM update
        scroll_to_bottom(message_element)
    })

    socket.on('users', (_users) => {
        $users = _users
    })

    socket.on('disconnect', reload_page)

    function send_message() {
        socket.emit('message', { user_name: $name, text: my_message_text, bot: false })
        my_message_text = ''
    }
</script>

<Menu />

{#if $show_users}
    <Users />
{:else}
    <Messages {messages} bind:message_element />

    <SendForm bind:my_message_text {send_message} />
{/if}
