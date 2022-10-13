import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toIDR } from "../helpers";
import axios from 'axios'
import io from "socket.io-client"
import Countdown from 'react-countdown'
const serverUrl = `http://localhost:3000` //url server app
const mongoServerUrl = `http://localhost:4001` //url mongo auction server
const socket = io(mongoServerUrl)

const Auction = () => {
  const { id: AuctionProductId } = useParams();
  const [bidPrice, setBidPrice] = useState(0);
  const [openPrice, setOpenPrice] = useState(11500);
  const [product, setProduct] = useState(null); //di tempel di page buat tampilan
  const [roomId, setRoomId] = useState("");
  const [bidHistory, setBidHistory] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0)

  const bidHandler = (e) => {
    e.preventDefault();
    if (bidPrice <= openPrice) {
      console.log('Ga boleh bid harga dibawah atau sama dengan terakhir harga terakhir');
      return;
    } else {
      console.log('bid berhasil')
      setOpenPrice(bidPrice);
      setBidPrice(bidPrice);
      socket.emit("send-bid", roomId, currentUserId, bidPrice)
    }
  };
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    setCurrentUserId(user.id)
    axios.get(`${serverUrl}/auctions/${AuctionProductId}`, {
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .then(({ data: productData }) => {
        console.log(new Date(productData.AuctionDateEnd).getTime())
        console.log(new Date(productData.AuctionDateEnd).getTime() - new Date().getTime())
        setProduct(productData)
        setTimeLeft(new Date(productData.AuctionDateEnd).getTime() - new Date().getTime())
      })
    axios.get(`${mongoServerUrl}/room/${AuctionProductId}`)
      .then(({ data }) => {
        console.log(data)
        socket.emit("join-room", data)
        setRoomId(data["_id"])
      })
    socket.on("send-bid", (payload) => {
      console.log(payload, "socket on send bid")
      setBidPrice(payload.price)
      setOpenPrice(payload.price)
      axios.patch(`${serverUrl}/auctions/${AuctionProductId}/bid`, {
        lastBidPrice: payload.price
      }, { headers: { access_token: localStorage.getItem("access_token") } })
    })
  }, [])
  useEffect(() => {
    if (product) {
      if (!product.lastBidPrice) {
        setBidPrice(product.initPrice)
        setOpenPrice(product.initPrice)
      } else if (product.lastBidPrice) {
        setBidPrice(product.lastBidPrice)
        setOpenPrice(product.lastBidPrice)
      }
    }
  }, [product])
  useEffect(() => {
    if (roomId) {
      axios.get(`${mongoServerUrl}/history/${roomId}`)
        .then(({ data }) => {
          setBidHistory(data)
        })
    }
  }, [roomId])
  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => {
        let winner = {
          userId: null,
          price: null
        }
        if (bidHistory.length) {
          winner = bidHistory[bidHistory.length - 1]
        }
        axios.put(`${serverUrl}/auctions/${AuctionProductId}`,
          {
            AuctionProductId,
            SellerId: product.UserId,
            auctionName: product.name,
            bidderId: winner.userId,
            finalPrice: winner.price
          })
      }, timeLeft);
    }
  }, [timeLeft])
  if (product) {
    return (
      <>
        <div className="container my-4">
          <div className="row">
            <h3>Lelang saat ini</h3>
            <p>Berakhir pada:
              {
                product.status !== "Unapproved" ?
                  <Countdown date={timeLeft}>
                    <p>Lelang telah selesai</p>
                  </Countdown>
                  : <p>Lelang belum dibuka</p>
              }
            </p>
          </div>
          <div className="row my-3">
            <div className="col-8">
              <div className="row">
                <div className="col">
                  <img
                    className="img-thumbnail"
                    src={product.imgUrl}
                    alt={product.name}
                  />
                </div>
                <div className="col">
                  <h5>
                    <strong>{product.name}</strong>
                  </h5>
                  <p>Seller: {product.User.fName}</p>
                  <p>Status: {product.status}</p>
                  <p>
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-4"
              style={{ fontSize: "0.875rem", fontFamily: "Lato" }}
            >
              <div className="col">
                <h5>
                  <strong>Harga lelang saat ini: </strong>
                </h5>
                {/* {
                  product.lastBidPrice ? */}
                <p className="text-reset">{toIDR(openPrice)}</p>
                {/* : <p className="text-reset">{toIDR(openPrice)}</p>
                } */}
              </div>
              {
                timeLeft > 0 &&
                <div className="col">
                  <p>
                    <strong> Masukkan harga bid kamu</strong>
                  </p>
                  <form className="input-group mb-3" onSubmit={bidHandler}>
                    <input
                      type="number"
                      className="form-control"
                      placeholder=""
                      aria-label="Bid lelang"
                      aria-describedby="bid"
                      min="0"
                      value={bidPrice}
                      onChange={(e) => setBidPrice(e.target.value)}
                      step={500}
                    />
                    <button
                      type="submit"
                      className="btn btn-outline-secondary"
                      id="bid_btn"
                    >
                      Bid
                    </button>
                  </form>
                </div>
              }
              <div class="overflow-scroll" style={{ height: "150px", overFlowY: "scroll" }}>
                <ul>
                  <li>Seseorang menawar dengan harga Rp.1.000.000,00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Auction;