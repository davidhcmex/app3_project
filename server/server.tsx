//const express = require('express');

import * as express from "express"
import * as mongoose from "mongoose"

const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

//const mongoose = require("mongoose");
const config = require("./config/database");

//const usersContacts = require("./config/userscontacts");

let users = require("./routes/users");


//mongoose.connect("mongodb://localhost/nodekb");
mongoose.connect(config.database);
let db = mongoose.connection;

db.once("open", function () {
    console.log("Connected to MongoDB by mongoose");
})

db.on("error", function (err) {
    console.log(err);
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use("/api/users", users);

app.get('/api/hello', function (req: express.Request, res: express.Response) {
    res.send({ express: 'Hello From Express' });
});

mongo.connect('mongodb://127.0.0.1/mongochat', function (err: any, db: any) {
    if (err) {
        throw err;
    }

    console.log('MongoDB connected...');

    // Connect to Socket.io
    client.on('connection', function (socket: any) {
        //let chat = db.collection('chats');
        const currentUsers = db.collection('currentUsers');

        console.log('User ' + socket.id + ' has been connected!');

        // Create function to send status
        // let sendStatus = function (s: any) {
        //     socket.emit('status', s);
        // }

        //  currently being used
        //  currently being used
        //  currently being used

        socket.on('addconversation', function (data: any) {

            // store the room name in the socket session for this client
            //socket.room = data.room_name;

            // send client to room
            socket.join(data.room_name);
            console.log("broadcasting")
     
            socket.broadcast.to(data.room_name).emit('emitbroadcast', { userName: data.user_name, roomId: data.room_name })
            
        })

        socket.on("messagetoroom", function (data: any) {

            console.log("message receive to boradcast")
            console.log(data)
            client.in(data.roomId).emit('broadcastmessage', { name: data.name, message: data.message })

        })

        //  currently being used END


        socket.on("username", function (username: any) {


            currentUsers.find().toArray(function (err: any, res: any) {
                if (err) throw err;
                socket.emit('currentusers', res);
            });

            currentUsers.insertOne({ socketID: socket.id, username: username });

            socket.broadcast.emit('logon', {
                socketID: socket.id,
                username: username
            });
        })




        //  Handle log off

        socket.on('disconnect', function () {
            console.log('User ' + socket.id + ' has been disconnected!');

            currentUsers.deleteOne({ socketID: socket.id }, function () {
                socket.broadcast.emit('logoff', socket.id);
            });
        });

        // Handle input events
        // socket.on('input', function (data: any) {
        //     let name = data.name;
        //     let message = data.message;

        //     // Check for name and message
        //     if (name == '' || message == '') {
        //         // Send error status
        //         sendStatus({ status: 'Please enter a name and message' });
        //     } else {
        //         // Insert message
        //         chat.insert({ name: name, message: message }, function () {
        //             client.emit('output', [data]);

        //             // Send status object
        //             sendStatus({
        //                 message: 'Message sent',
        //                 clear: true
        //             });
        //         });
        //     }
        // });
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));