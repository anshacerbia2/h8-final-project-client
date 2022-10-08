import React from 'react'

export default function DashboardCart() {
  return (
    <div id="DashboardCart">
      <div className="custom-row-1">
        <div
          style={{
            width: 'calc(100% - 240px)',
            margin: '0 10px'
          }}
        >
          <div className="dc-cart-content">
          </div>
        </div>
        <div
          style={{
            minWidth: 200,
            width: 200,
            margin: '0 10px'
          }}
        >

          <button className="btn custom-btn-1 dc-btn">Upload Image</button>
        </div>
      </div>
    </div>
  )
}
