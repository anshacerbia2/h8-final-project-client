import { createElement, useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import io from "socket.io-client"
import axios from 'axios'
const appUrl = `http://localhost:3000`
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
    const [targetName, setTargetName] = useState("")
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
        axios.get(`${appUrl}/users/${targetUserId}`)
            .then(({ data }) => {
                setTargetName(data.fName)
            })
        let user = JSON.parse(localStorage.getItem("user"))
        setCurrentName(user.fName)
        setCurrentId(user.id)
        setTarget(targetUserId)
        socket.on("send-chat", (payload) => {
            appendMessage(payload.name, payload.message, payload["_id"], payload.userId, payload.name)
            setChat("")
        })
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
            socket.on("send-chat", (payload) => {
                console.log(payload, "useeffect chat history")
                appendMessage(payload.name, payload.message, payload["_id"], payload.userId, payload.name)
                setChat("")
            })
        }
    }, [chatHistory])
    return (
        <div>
            <section style={{ backgroundColor: "#eee" }}>
                <div class="container py-5">
                    <div class="row">
                        <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                            {/* <h5 class="font-weight-bold mb-3 text-center text-lg-start">
                                Member
                            </h5> */}
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled mb-0">
                                        {
                                            rooms.length ?
                                                rooms.map((el, idx) => {
                                                    return (
                                                        el.users.map((elem) => {
                                                            if (currentId !== elem.userId) {
                                                                console.log(elem)
                                                                // return (
                                                                //     <button onClick={(e) => {
                                                                //         e.preventDefault()
                                                                //         navigate(`/chat/${elem.userId}`)
                                                                //     }} ><img width="75" src={elem.profpic} /><p>{elem.name}</p></button>
                                                                // )
                                                                return (
                                                                    <li
                                                                        class="p-2 border-bottom my-2"
                                                                        style={{ backgroundColor: "#eee" }}
                                                                    >
                                                                        <a href="" class="d-flex justify-content-between" onClick={(e) => {
                                                                            e.preventDefault()
                                                                            socket.emit("leave-room", room.roomName)
                                                                            navigate(`/chat/${elem.userId}`)
                                                                        }}>
                                                                            <div class="d-flex flex-row">
                                                                                <img
                                                                                    src={elem.profpic}
                                                                                    alt="avatar"
                                                                                    class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                                                    width="60"
                                                                                />
                                                                                <div class="pt-1">
                                                                                    <p class="mb-0">{elem.name}</p>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                )
                                                            }
                                                        })
                                                    )
                                                }) : console.log("kosong rooms")
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Right */}
                        <div class="col-md-6 col-lg-7 col-xl-8">
                            <div className="mb-5">
                                <h2 className="fw-bold">
                                    {targetName}
                                </h2>
                            </div>
                            <ul class="list-unstyled">
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
                                            }
                                        }) : <div className="card w-100 mb-3">
                                            <div className="card-header d-flex justify-content-center p-3">
                                                <p className="fw-bold mb-0">System</p>
                                                <p className="text-muted small mb-0"><i className="far fa-clock"></i></p>
                                            </div>
                                            <div className="card-body d-flex justify-content-center">
                                                <p className="mb-0">
                                                    Type below to begin your conversation with {targetName}
                                                </p>
                                            </div>
                                        </div>
                                }
                                <form onSubmit={handleChat}>
                                    <li class="bg-white mb-3">
                                        <div class="form-outline">
                                            <textarea
                                                name="chat" value={chat} onChange={onChangeHandler} autoComplete="off" className="form-control" id="textAreaExample2" rows="4"
                                                placeholder="Message"
                                            ></textarea>

                                        </div>
                                    </li>
                                    <button type="submit" className="btn btn-info btn-rounded float-end">Send</button>
                                </form>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}