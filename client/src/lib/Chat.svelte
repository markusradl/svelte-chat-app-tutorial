<script lang="ts">
    import { io, Socket } from 'socket.io-client'
    import Messages from '@/lib/Messages.svelte'
    import SendForm from '@/lib/SendForm.svelte'
    import { name } from '@/stores'

    let my_message_text = ''
    let messages: message[] = []

    const socket: Socket<server_to_client_events, client_to_server_events> = io()

    socket.on('message', (msg) => {
        messages = [...messages, msg]
    })

    function send_message() {
        socket.emit('message', { user_name: $name, text: my_message_text, bot: false })
        my_message_text = ''
    }
</script>

<h1>CHAT</h1>

<Messages {messages} />

<SendForm bind:my_message_text {send_message} />
