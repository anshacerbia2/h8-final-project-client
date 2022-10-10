import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import io from "socket.io-client"
import axios from 'axios'
const socket = io("http://localhost:4000") //url chat server
const serverUrl = `http://localhost:4000` //url chat server

export default function ChatPage() {
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
    // const { id: targetUserId } = useParams()
    const [currentId, setCurrentId] = useState(null)
    const [currentName, setCurrentName] = useState("")
    const [target, setTarget] = useState(null)
    const [chat, setChat] = useState("")
    const [chatHistory, setChatHistory] = useState([])
    const [room, setRoom] = useState(null)
    const [rooms, setRooms] = useState([])
    const [roomId, setRoomId] = useState("")
    function onChangeHandler(e) {
        setChat(e.target.value)
    }
    function handleChat(e) {
        e.preventDefault()
        socket.emit("send-chat", chat, currentName)
        appendMessage(`You: ${chat}`)
        socket.on("send-chat", (payload) => {
            console.log(payload)
            appendMessage(`${payload.name}: ${payload.message}`)
        })
    }
    function appendMessage(message) {
        const messageContainer = document.getElementById("message-container")
        const messageElement = document.createElement('div')
        messageElement.classList.add("white")
        messageElement.innerText = message
        messageContainer.append(messageElement)
        document.getElementById("chat-placeholder").remove();
    }
    async function getAllRooms(id) {
        try {
            let { data } = await axios.get(`${serverUrl}/rooms/${id}`)
            setRooms(data)
            return data
        } catch (err) {
            console.log(err)
        }
    }
    async function getRoom(currentId, targetId) {
        try {
            let { data } = await axios.get(`${serverUrl}/room/${currentId}/${targetId}`)
            setRoom(data)
            socket.join(data.roomName)
            socket.emit("join-room", data)
            console.log(data, "get room")

            return data
        } catch (err) {
            console.log(err)
        }
    }

    // async function getUser(id) {
    //     try {
    //         // let userData = await axios.get("user url/targetUserId")
    //         // return targetUserData
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    async function getChats(roomId) {
        try {
            let { data } = await axios.get(`${serverUrl}/chats/${roomId}`)
            console.log(data)
            setChatHistory(data)
            return data
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        //dari localStorage ntar harusny
        setCurrentId(1)
        // axios nge get data user berdasarkan id
        // getUser(targetUserId)
        //     .then((targetUserData) => {
        //         socket.on("render-chat", () => {
        //             // let currentUserId = localStorage.getItem("id")
        //             // let currentUserData = {
        //             //     firstName: localStorage.getItem("firstName"),
        //             //     lastName: localStorage.getItem("lastName"),
        //             //     profpic: localStorage.getItem("profpic")
        //             // }

        //             let currentUserData = {
        //                 firstName: "Ajat",
        //                 lastName: "",
        //                 profpic: "http://asnoddoasoda.webp"
        //             }
        //             let currentUserId = 1
        //             // let currentUserData = {
        //             //     firstName: "Micky",
        //             //     lastName: "",
        //             //     profpic: "http://asnoddoasoda.webp"
        //             // }
        //             // let currentUserId = 2
        //             socket.emit("send-id", targetUserId, targetUserData, currentUserId, currentUserData)
        //         })
        //     })

        // socket.emit("send-id", targetUserId, currentId)
    }, [])
    useEffect(() => {
        if (currentId) {
            getAllRooms(currentId)
        }
    }, [currentId])
    useEffect(() => {
        if (target && currentId) {
            socket.emit("send-id", target, currentId)
            getRoom(currentId, target)
        }
    }, [target, currentId])
    useEffect(() => {
        if (room) {
            console.log(room)
            setRoomId(room["_id"])
        }
    }, [room])
    useEffect(() => {
        if (roomId) {
            getChats(roomId)
        }
    }, [roomId])
    return (
        <div style={{ paddingLeft: 20, paddingTop: 20 }}>
            {rooms.length &&
                <div className="chat-dynamic-list">
                    {
                        rooms.map((el) => {
                            let targetName = ""
                            let targetProfpic = ""
                            el.users.map((user) => {
                                if (user.userId !== +currentId) {
                                    targetName = user.name
                                    targetProfpic = user.profpic
                                }
                            })
                            return (
                                <button onClick={() => {
                                    el.users.forEach((user) => {
                                        if (user.userId !== currentId) {
                                            setTarget(user.userId)
                                        } if (user.userId === +currentId) {
                                            setCurrentName(user.name)
                                        }
                                    })
                                }} key={el.roomName}>
                                    <div>
                                        <img src={targetProfpic} width={80} height={80} />
                                        {targetName}
                                    </div>
                                </button>
                            )
                        })
                    }
                </div>
            }
            {target &&
                <div>
                    <div id="message-container">
                        {
                            chatHistory.length ?
                                chatHistory.map((el, idx) => {
                                    if (el.userId == currentId) {
                                        return (
                                            <p style={{ color: "red" }} key={idx}>You: {el.message}</p>
                                        )
                                    } else {
                                        return (
                                            <p style={{ color: "blue" }} key={idx} >{el.name}: {el.message}</p>
                                        )
                                    }
                                })
                                : <p id="chat-placeholder">No Chat Available</p>
                        }
                    </div>
                    <form onSubmit={handleChat}>
                        <input type="text" name="chat" onChange={onChangeHandler} autoComplete="off" />
                        <button type="submit">Chat</button>
                    </form>
                </div>
            }
            {!target &&
                <div>
                    <p>Select A user to begin chatting</p>
                </div>
            }
        </div>
    )
}