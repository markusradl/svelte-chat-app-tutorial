type user_message = {
    user_name: string
    text: string
    bot: false
}

type bot_message = {
    text: string
    bot: true
}

type user = {
    id: string
    name: string
}

type message = user_message | bot_message

type client_to_server_events = { message: (m: message) => void; login: (name: string) => void }

type server_to_client_events = { message: (m: message) => void; users: (x: user[]) => void }

type inter_server_events = {}

type socket_data = {
    name: string
}
