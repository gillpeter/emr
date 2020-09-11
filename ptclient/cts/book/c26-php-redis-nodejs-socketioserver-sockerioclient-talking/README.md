8 steps data flow

# Server side

Step 1: php / lumen
Step 2: redis server running independently on a port
Step 3: redis client on nodejs
Step 4: socketio.server emit

==========================================================  
Step 5: Long packet route between server and users browser
==========================================================

# Client side

Step 6: socketio client receive
Step 7: vue
Step 8: component

Part 1:
https://www.youtube.com/watch?v=a2DT3B3_OzQ

Part 2:

Topics covered:

1. Message sent from redis Web UI. This is simulating php/lumen sending the publish message. The event name must be same as the function name at: emr/ptclient/cts/spi/1t-Mr1f/rem/cl/ct-act-on-socket-messages.vue
2. This message is received by nodejs socket server. Look at: emr/servers/socket/publish-events-broadcast-by-lumen-app.js
3. vue developer tools -> vuex -> entities -> reminders -> see the current rows
4. When message from socket is sent a new row gets added /emr/ptclient/cts/spi/1t-Mr1f/rem/cl/ct-act-on-socket-messages.vue
5. How is a new row added when socket message is recieved. objOrm.insert in previous file
6. As soon as new row is added the UI of grid-ct-design2 gets updated. No extra work needs to done. This is like spreadsheet cell getting updated.
7. How to start the redis web ui? redis-commander