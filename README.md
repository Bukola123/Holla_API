Holla API

Holla is a social media platform that enables users to communicate with each other in different chat rooms. Typically, a user will create an account and can join and create channels (groups) in which they can chat with others. Admin privileges are automatically assigned to the creator of a channel and any other user that is designated an admin by the creator of a channel. An admin can add and remove users from a channel and can delete the channel.

Sketch 
User register - email otp - confirm otp - login - create a channel/search for and join a channel - chat with others

Core
Logging
Tests
Cache
Concurrency

Entities
User: Profile
Channel: Members

Schema

User {
id: pk
email : string
password: string
isActive: boolean : default :false
otp: number
channels : [Channels]
profile: Profile (key)
createdAt: Date: default : date.now }

Profile {}
id: pk
name: string
Bio: string
avatar: url
phone: string
createdAt: date: date.now
updatedAt: date }


Channel {
id: pk
name: string :unique
description: string
members : [User] 
messages : [Message]
createdAt : date : date.now
updatedAt : date
Admin : [User] }

Message {
id :pk
author : User
channel : Channel
createdAt : date : date.now
content : string


Architecture

Stack: JavaScript, Node.js, Express.js, MongoDB, Web Sockets


Plan Routes
Auth (http)
    Register
    Verify email
    Login
    Forgot password
    Reset password
    Change password
User
    Get user
    Update profile
Channel
    Create channel
    Delete channel
Chat (web sockets)
    Joins a channel
Leaves a channel
Sends a message

    
