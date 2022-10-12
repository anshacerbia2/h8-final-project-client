import Modal from 'react-bootstrap/Modal';
import bni from '../bni.png';
import bri from '../bri.png';
import bca from '../bca.png';
import { postCharge } from '../store/actions';
import { useEffect, useState } from 'react';
import { fetchSubCategories, fetchCategories, fetchUserProducts, postProduct } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Toast, swalWithBootstrapButtons } from "../helpers";

export default function PaymentModal(props) {
  const dispatch = useDispatch();
  const [link, setLink] = useState('');
  const [chargeResp, setChargeResp] = useState({
    bank: '',
    va: '',
    amount: 0,
  })

  useEffect(() => {
    if (props.show)
      setChargeResp({
        bank: '',
        va: '',
        amount: 0,
      });
    setLink('')
  }, [props.show])

  const handleCharge = async (e, bank) => {
    try {
      e.preventDefault();
      const response = await dispatch(postCharge({ bank }));
      if (response.status === 201) {
        const responseJSON = await response.json();
        let str = ''
        if (responseJSON.va_numbers[0].bank === 'bri') str = 'https://simulator.sandbox.midtrans.com/bri/va/index';
        if (responseJSON.va_numbers[0].bank === 'bca') str = 'https://simulator.sandbox.midtrans.com/bca/va/index';
        if (responseJSON.va_numbers[0].bank === 'bni') str = 'https://simulator.sandbox.midtrans.com/bni/va/index';
        console.log(str);
        setChargeResp({ bank: responseJSON.va_numbers[0].bank, va: responseJSON.va_numbers[0].va_number, amount: responseJSON.gross_amount });
        setLink(str);
        // swalImg.fire({
        //   title: "Berhasil Ditambahkan",
        //   text: responseJSON.message,
        //   imageWidth: 300,
        //   imageHeight: 300,  
        //   timer: 3000,
        // });
        // }
        // props.onHdide();
        console.log(responseJSON);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="custom-modal-title">
          Choose Payment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          !link ? (
            <div class="bank-list" >
              <button class="btn bank" onClick={(e) => handleCharge(e, 'bni')}>
                <img src={bni} alt="" />
                {/* <span>BNI</span> */}
              </button>
              <button class="btn bank" onClick={(e) => handleCharge(e, 'bri')}>
                <img src={bri} alt="" />
                {/* <span>BRI</span> */}
              </button>
              <button class="btn bank" onClick={(e) => handleCharge(e, 'bca')}>
                <img src={bca} alt="" />
                {/* <span>BCA</span> */}
              </button>
            </div>

          ) :
            <div style={{ fontFamily: 'Lato', fontSize: 14, }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>Virtual Account :</span>
                <span style={{ fontWeight: '700', fontSize: 20, marginBottom: 10 }}>{chargeResp.va}</span>
                <span>Amount :</span>
                <span style={{ fontWeight: '700', fontSize: 20, marginBottom: 10 }}>{chargeResp.amount}</span>
              </div>
              <a target="_blank" className="btn custom-btn-1" href={link}>Finish payment now</a>
            </div>
        }
      </Modal.Body>
    </Modal>
  );
}
