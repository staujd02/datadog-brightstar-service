## Brightstar Service

Server that will injest message from a Datadog webhook and echo those messages to a web socket client.

## Test The Emitting

1. Install deps `yarn install`
2. Start up the app `yarn start:dev`
3. Start up Postman
4. Create a new Socket.io connection to `localhost:8080`
    1. Create a new socket collection
    2. Choose `Socket.io` as the connection type
    3. Enter `localhost:8080` in the server address
    4. Click connect => Should say you are now connected
5. Subscribe to `log` messages
    1. Click on the `Listeners` drop-down in the messages pane
    2. Add `log` to the event listeners list
6. Create a standard `POST` request and post a message to `localhost:8080/injest` with a JSON body
7. Confirm in the running socket window that the POST message was emitted back to you