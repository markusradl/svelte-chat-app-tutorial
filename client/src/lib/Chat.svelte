<script lang="ts">
    import { io, Socket } from 'socket.io-client'
    import Messages from '@/lib/Messages.svelte'
    import SendForm from '@/lib/SendForm.svelte'
    import { reload_page } from '@/utils'
    import { name } from '@/stores'
    import { onMount } from 'svelte'

    let my_message_text = ''
    let messages: message[] = []

    const socket: Socket<server_to_client_events, client_to_server_events> = io()

    onMount(() => {
        socket.emit('login', $name)
    })

    socket.on('message', (msg) => {
        messages = [...messages, msg]
    })

    socket.on('disconnect', reload_page)

    function send_message() {
        socket.emit('message', { user_name: $name, text: my_message_text, bot: false })
        my_message_text = ''
    }
</script>

<h1>CHAT</h1>

<Messages {messages} />

<SendForm bind:my_message_text {send_message} />
