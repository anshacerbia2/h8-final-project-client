import { createElement, useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import io from "socket.io-client"
import axios from 'axios'
const clientUrl = `http://localhost:3001`
const serverUrl = `http://localhost:4000` //url chat server
const socket = io(serverUrl) //url chat server

export default function ChatPage() {
    // const messageComponents = []
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
    const navigate = useNavigate()
    const { id: targetUserId } = useParams()
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
        socket.emit("send-chat", chat, currentName, currentId)
    }
    function appendMessage(name, message, mongoId, senderId, senderName) {
        // setChatHistory
        // const element =
        //     < div className="card mb-3" >
        //         <div className="card-header d-flex justify-content-between p-3">
        //             <p className="fw-bold mb-0">You</p>
        //             <p className="text-muted small mb-0"><i className="far fa-clock"></i> </p>
        //         </div>
        //         <div className="card-body">
        //             <p className="mb-0">
        //                 {message}
        //             </p>
        //         </div>
        //     </div >

        // messageContainer.appendChild(element)
        // const messageElement = document.createElement('li')
        // messageElement.classList.add("white")
        // messageElement.innerText = message
        // messageContainer.append(
        //  < div className = "card mb-3" >
        //      <div className="card-header d-flex justify-content-between p-3">
        //          <p className="fw-bold mb-0">You</p>
        //          <p className="text-muted small mb-0"><i className="far fa-clock"></i> </p>
        //      </div>
        //      <div className="card-body">
        //          <p className="mb-0">
        //              {message}
        //          </p>
        //      </div>
        //     </div >
        // )
        // messageComponents.push(
        //     <div className="card mb-3">
        //         <div className="card-header d-flex justify-content-between p-3">
        //             <p className="fw-bold mb-0">You</p>
        //             <p className="text-muted small mb-0"><i className="far fa-clock"></i> </p>
        //         </div>
        //         <div className="card-body">
        //             <p className="mb-0">
        //                 {message}
        //             </p>
        //         </div>
        //     </div>
        // )
        setChatHistory([
            ...chatHistory,
            {
                message,
                name: senderName,
                roomId: roomId,
                userId: senderId,
                "_id": mongoId
            }
        ])
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
            console.log(currentId, targetId, "get room async ufunction")
            let { data } = await axios.get(`${serverUrl}/room/${currentId}/${targetId}`)
            setRoom(data)
            socket.emit("join-room", data)
            // socket.join(data.roomName)
            // console.log(data, "get room")

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
            setChatHistory(data)
            return data
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        //dari localStorage ntar harusny
        setCurrentId(+localStorage.getItem("id"))
        setTarget(targetUserId)
        setCurrentName(localStorage.getItem("user"))
        socket.on("send-chat", (payload) => {
            console.log(payload, "useeffect polos")
            appendMessage(payload.name, payload.message, payload["_id"], payload.userId, payload.name)
            setChat("")
        })
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
    }, [targetUserId])
    useEffect(() => {
        if (currentId) {
            getAllRooms(currentId)
        }
    }, [currentId])
    useEffect(() => {
        if (target && currentId) {
            socket.emit("send-id", +target, currentId)
            getRoom(currentId, target)
        }
    }, [target, currentId])
    useEffect(() => {
        if (room) {
            setRoomId(room["_id"])
        }
    }, [room])
    useEffect(() => {
        if (roomId) {
            getChats(roomId)
        }
    }, [roomId])
    useEffect(() => {
        if (chatHistory.length) {
            console.log("terpanggil")
            console.log(chatHistory)
            socket.on("send-chat", (payload) => {
                console.log(payload, "useeffect chat history")
                appendMessage(payload.name, payload.message, payload["_id"], payload.userId, payload.name)
                setChat("")
            })
        }
    }, [chatHistory])
    return (
        <div>
            {
                rooms.length ?
                    rooms.map((el, idx) => {
                        return (
                            el.users.map((elem) => {
                                if (currentId !== elem.userId) {
                                    console.log(elem)
                                    return (
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            navigate(`/chat/${elem.userId}`)
                                        }} >{elem.name}</button>
                                    )
                                }
                            })
                        )
                    }) : console.log("kosong rooms")
            }

            <div className="d-flex justify-content-center" style={{ paddingLeft: 20, paddingTop: 20, marginBottom: 100 }}>
                <div className="col-md-6 col-lg-7 col-xl-8">
                    {target &&
                        <div>
                            <ul className="list-unstyled" id="message-container">
                                {
                                    chatHistory.length ?
                                        chatHistory.map((el, idx) => {
                                            if (el.userId == currentId) {
                                                return (
                                                    // <p style={{ color: "red" }} key={idx}>You: {el.message}</p>
                                                    <div className="card mb-3" key={idx}>
                                                        <div className="card-header d-flex justify-content-between p-3">
                                                            <p className="fw-bold mb-0">You</p>
                                                            <p className="text-muted small mb-0"><i className="far fa-clock"></i> </p>
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="mb-0">
                                                                {el.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                                // messageComponents.push(
                                                //     <div className="card mb-3" key={idx}>
                                                //         <div className="card-header d-flex justify-content-between p-3">
                                                //             <p className="fw-bold mb-0">You</p>
                                                //             <p className="text-muted small mb-0"><i className="far fa-clock"></i> </p>
                                                //         </div>
                                                //         <div className="card-body">
                                                //             <p className="mb-0">
                                                //                 {el.message}
                                                //             </p>
                                                //         </div>
                                                //     </div>
                                                // )
                                            } else if (el.userId !== currentId) {
                                                return (
                                                    // <p style={{ color: "blue" }} key={idx} >{el.name}: {el.message}</p>
                                                    <div className="card w-100 mb-3" key={idx}>
                                                        <div className="card-header d-flex justify-content-end p-3">
                                                            <p className="fw-bold mb-0">{el.name}</p>
                                                            <p className="text-muted small mb-0"><i className="far fa-clock"></i></p>
                                                        </div>
                                                        <div className="card-body d-flex justify-content-end">
                                                            <p className="mb-0">
                                                                {el.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                                // messageComponents.push(
                                                //     <div className="card w-100 mb-3" key={idx}>
                                                //         <div className="card-header d-flex justify-content-end p-3">
                                                //             <p className="fw-bold mb-0">{el.name}</p>
                                                //             <p className="text-muted small mb-0"><i className="far fa-clock"></i></p>
                                                //         </div>
                                                //         <div className="card-body d-flex justify-content-end">
                                                //             <p className="mb-0">
                                                //                 {el.message}
                                                //             </p>
                                                //         </div>
                                                //     </div>
                                                // )
                                            }
                                        }) : <p>kosong</p>
                                }
                                {/* {
                                messageComponents.length ?
                                    messageComponents :
                                    console.log("empty")
                            } */}
                            </ul>
                            <div className="bg-white">
                                <form onSubmit={handleChat}>
                                    <div className="form-outline">
                                        <input type="text" name="chat" value={chat} onChange={onChangeHandler} autoComplete="off" className="form-control" id="textAreaExample2" rows="4" />
                                        <label className="form-label" htmlFor="textAreaExample2">Message</label>
                                    </div>
                                    <button type="submit" className="btn btn-info btn-rounded float-end">Send</button>
                                </form>
                            </div>
                        </div>
                    }
                </div>
                {!target &&
                    <div>
                        <p>Select A user to begin chatting</p>
                    </div>
                }
            </div>
        </div>
    )
}