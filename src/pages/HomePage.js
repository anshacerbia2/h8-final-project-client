import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../store/actions';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector(state => state.productReducer);

  useEffect(() => {
    // if (!localStorage.getItem('access_token')) navigate('/login');
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="container">
      <div className="custom-row-1">
        {
          products?.map((product, i) => {
            return (
              <div className="custom-col-1" key={'list-product-' + i}>
                <div className="custom-col-1-card">
                  <div className="custom-col-1-card-img">
                    <img src={product.mainImg} />
                  </div>
                  <h3 className="card-name">{product.name}</h3>
                  <p className="card-price">{product.price}/{product.unit}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
