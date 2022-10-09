import Modal from 'react-bootstrap/Modal';
import { useState, useParams, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, fetchSubCategories, fetchProducts, putProduct, fetchProvinces, fetchCities, postAddress, fetchUser } from '../store/actions';
import { Toast, swalWithBootstrapButtons } from "../helpers";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../css/add-address.css';

export default function FormAddAddress(props) {
  const dispatch = useDispatch();
  const { provinces, cities } = useSelector(state => state.globalReducer);
  const [inputVal, setInputVal] = useState({
    name: '',
    street: '',
    province: '',
    provinceId: '',
    city: '',
    cityId: ''
  });
  const [disabled, setDisabled] = useState(true);
  const [errorName, setErrorName] = useState('');
  const [errorStreet, setErrorStreet] = useState('');
  const [errorProvince, setErrorProvince] = useState('');
  const [errorCity, setErrorCity] = useState('');

  useEffect(() => {
    dispatch(fetchProvinces());
  }, []);

  const handleChange = async (event) => {
    try {
      let name = event.currentTarget.name;
      let value = event.currentTarget.value;
      if (name === 'province') {
        if (value) {
          const province = provinces.find(v => v.name == value);
          const { id } = province;
          await dispatch(fetchCities(id));
          setInputVal({ ...inputVal, provinceId: id, [name]: value });
          setDisabled(false);
        } else {
          setDisabled(true);
          setInputVal({ ...inputVal, provinceId: '', [name]: value, city: '', cityId: '' });
        }
      } else if (name === 'city') {
        const city = cities.find(v => v.name == value);
        const { id } = city;
        setInputVal({ ...inputVal, cityId: id, [name]: value });
      } else {
        setInputVal({ ...inputVal, [name]: value });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const clearError = () => {
    setErrorName('');
    setErrorStreet('');
    setErrorProvince('');
    setErrorCity('');
  };

  const submitAddress = async (e) => {
    try {
      e.preventDefault();
      const response = await dispatch(postAddress(inputVal));
      const responseJSON = await response.json();
      if (response.status === 201) {
        await dispatch(fetchUser());
        props.onHide();
        Toast.fire({ icon: 'success', title: responseJSON.message });
      } else {
        if (responseJSON.errors) {
          responseJSON.errors.forEach(v => {
            if (v.path === 'street' && errorStreet === '') setErrorStreet(v.message);
            if (v.path === 'province' && errorProvince === '') setErrorProvince(v.message);
            if (v.path === 'city' && errorCity === '') setErrorCity(v.message);
          });
        }

        if (response.status === 403) {
          swalWithBootstrapButtons.fire({
            title: responseJSON.message,
            icon: 'error',
            timer: 2000
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="custom-modal-title">
          Tambah Alamat
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitAddress} id="formAddress">
          <div className="form-floating">
            <input
              type="text"
              name="name"
              id="floatingAddressName"
              className="form-control"
              placeholder="Rumah Alaq"
              value={inputVal.name}
              onChange={handleChange}
            />
            <label htmlFor="floatingAddressName">Judul Alamat</label>
          </div>
          {errorName && (
            <div className="invalid-validation">{errorName}</div>
          )}
          <div className="form-floating">
            <input
              type="text"
              name="street"
              id="floatingAddress"
              className="form-control"
              placeholder="example@mail.com"
              value={inputVal.street}
              onChange={handleChange}
            />
            <label htmlFor="floatingAddress">Nama Jalan</label>
          </div>
          {errorStreet && (
            <div className="invalid-validation">{errorStreet}</div>
          )}
          {
            provinces.length !== 0 && (
              <div className="group-input mt-3 mb-3">
                <select
                  name="province"
                  className="form-select"
                  aria-label="Default select example"
                  value={inputVal.province ? inputVal.province : ''}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Pilih Provinsi</option>
                  {
                    provinces.map(province => {
                      return (
                        <option key={province.name} value={province.name}>{province.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            )
          }
          {errorProvince && (
            <div className="invalid-validation">{errorProvince}</div>
          )}

          <div className="group-input mt-3 mb-3">
            <select
              name="city"
              className="form-select"
              aria-label="Default select example"
              value={inputVal.city}
              onChange={(e) => handleChange(e)}
              disabled={disabled}
            >
              <option value="">Pilih Kota</option>
              {
                cities.length !== 0 && cities.map(city => {
                  return (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  )
                })
              }
            </select>
          </div>

          {errorCity && (
            <div className="invalid-validation">{errorCity}</div>
          )}
          <button type="submit" onClick={() => clearError()} className="btn custom-btn-1">Submit</button>
        </form>
      </Modal.Body>
    </Modal >
  );
}

