import '../css/dashboard.css';
import avatar from '../avatar.jpg'
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import '../css/dashboard.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import FormModalNew from './FormModalNew'
import FormModalEdit from './FormModalEdit'
import Button from 'react-bootstrap/Button';
import { fetchProduct, deleteProduct, fetchSubCategories, fetchUserProducts } from '../store/actions';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Toast, swalWithBootstrapButtons, formatDate } from "../helpers";

export default function DashboardProducts(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.globalReducer);
  const { userProducts, product } = useSelector(state => state.productReducer);
  const { subCategories } = useSelector(state => state.subCategoriesReducer);
  const [modalNewShow, setModalNewShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProducts());
  }, []);

  const openModalEdit = (e, id) => {
    e.stopPropagation();
    dispatch(fetchProduct(id));
    dispatch(fetchSubCategories());
    setModalEditShow(true);
  }

  const handleDelete = async (e, id) => {
    try {
      e.stopPropagation()
      const result = await swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, do it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        const response = await dispatch(deleteProduct(id));
        if (response.status === 200) {
          dispatch(fetchUserProducts());
          Toast.fire({ icon: 'success', title: 'Product has been deleted successfully..' });
        } else {
          const responseJSON = await response.json();
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
  }

  const truncateString = (str) => {
    return str.slice(0, 200) + '...';
  }

  const toIDR = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  }

  const detailProduct = (id) => {
    navigate(`/product/${id}`);
  }

  return (
    <>
      <FormModalNew
        show={modalNewShow}
        subcategories={subCategories}
        onHide={() => setModalNewShow(false)}
      />
      <FormModalEdit
        product={product}
        subcategories={subCategories}
        show={modalEditShow}
        load={isLoading ? 'true' : ''}
        onHide={() => setModalEditShow(false)}
      />
      <div style={{ width: 100, marginLeft: 'auto', marginBottom: 12 }}>
        <button className="btn custom-btn-1" onClick={() => setModalNewShow(true)}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, marginRight: 2 }}>
            add
          </span>
          Product
        </button>
      </div>
      <div className="product-item-list">
        {
          userProducts.sort((a, b) => b.id - a.id).map((product, key) => {
            return (
              <div className="product-item" key={'product-item-' + key} onClick={() => detailProduct(product.id)}>
                {
                  isLoading ?
                    <Skeleton style={{ height: '100px', width: '100px' }} />
                    :
                    <img width={100} height={100} src={product.mainImg} />
                }
                <div className="product-item-detail">
                  <div className="product-item-header">
                    <span className="product-item-name">
                      {
                        isLoading ?
                          <Skeleton />
                          :
                          <>
                            {product.name}
                          </>
                      }
                    </span>
                    {
                      isLoading ?
                        <Skeleton width={100} height={22} style={{ lineHeight: '22px' }} />
                        :
                        <>
                          <button className="btn" onClick={(e) => handleDelete(e, product.id)}>
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                          <button className="btn" onClick={(e) => openModalEdit(e, product.id)}>
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                        </>
                    }
                  </div>
                  <span className="product-item-category">
                    {
                      isLoading ?
                        <Skeleton height={13} inline={true} />
                        :
                        <>
                          {product.SubCategory.Category.name} <span style={{ color: '#aaa', margin: '0 6px' }}>•</span> {product.SubCategory.name}
                        </>
                    }
                  </span>
                  <p className="product-item-price">
                    {
                      isLoading ?
                        <Skeleton height={15} />
                        :
                        <>
                          {toIDR(product.price)}
                        </>
                    }
                  </p>
                  <p className="product-item-stock" style={{ marginTop: 12 }}>
                    {
                      isLoading ?
                        <Skeleton height={17} width={250} />
                        :
                        <>
                          <span>Stock :</span> &nbsp;{product.stock}, &nbsp;&nbsp;<span>Unit :</span> &nbsp;{product.unit}
                        </>
                    }
                  </p>
                  <p className="product-item-stock" style={{ marginBottom: 12 }}>
                    {
                      isLoading ?
                        <Skeleton height={17} width={250} />
                        :
                        <>
                          <span>Tanggal Panen :</span> &nbsp;{formatDate(product.harvestDate)}
                        </>
                    }
                  </p>
                  <p className="product-item-description" title={product.description}>
                    {
                      isLoading ?
                        <Skeleton height={12} count={4} />
                        :
                        <>
                          {truncateString(product.description)}
                        </>
                    }
                  </p>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
