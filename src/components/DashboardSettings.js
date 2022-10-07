import '../css/dashboard.css';
import avatar from '../avatar.jpg'
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import '../css/dashboard.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import FormModalNew from './FormModalNew';
import FormModalEdit from './FormModalEdit';
import Button from 'react-bootstrap/Button';
import { fetchProducts, fetchProduct, deleteProduct, fetchSubCategories } from '../store/actions';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Toast, swalWithBootstrapButtons } from "../helpers";

export default function DashboardSettings(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isLoading } = useSelector((state) => state.globalReducer);
  const isLoading = false;
  // const { products, product } = useSelector((state) => state.productReducer);
  const products = [
    {
      id: 1,
      name: "Tomat Lembang",
      slug: "tomat-lembang",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est. Vivamus sodales mauris nisi. Etiam nec lacinia sem, nec dapibus eros. Cras sed turpis vitae odio posuere hendrerit viverra a sem. Phasellus neque ante, lacinia ut nibh in, pharetra accumsan ipsum. Nulla facilisi. Fusce consectetur malesuada metus, eget lobortis diam semper at. Etiam volutpat nec dui faucibus suscipit.",
      price: 20000,
      mainImg: "https://cdn.medcom.id/images/content/2020/10/08/1196942/3Rw1PQrlYn.jpeg",
      harvestDate: "2022-10-01 07:00:00+07",
      unit: "kg",
      stock: 100,
      SubCategoryId: 2,
      authorId: 1,
      SubCategory: {
        id: 2,
        name: 'Buah-buahan',
        CategoryId: 2,
        Category: {
          id: 2,
          name: 'Hortikultura',
        }
      }
    },
    {
      id: 1,
      name: "Tomat Lembang",
      slug: "tomat-lembang",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est. Vivamus sodales mauris nisi. Etiam nec lacinia sem, nec dapibus eros. Cras sed turpis vitae odio posuere hendrerit viverra a sem. Phasellus neque ante, lacinia ut nibh in, pharetra accumsan ipsum. Nulla facilisi. Fusce consectetur malesuada metus, eget lobortis diam semper at. Etiam volutpat nec dui faucibus suscipit.",
      price: 20000,
      mainImg: "https://cdn.medcom.id/images/content/2020/10/08/1196942/3Rw1PQrlYn.jpeg",
      harvestDate: "2022-10-01 07:00:00+07",
      unit: "kg",
      stock: 100,
      SubCategoryId: 2,
      authorId: 1,
      SubCategory: {
        id: 2,
        name: 'Buah-buahan',
        CategoryId: 2,
        Category: {
          id: 2,
          name: 'Hortikultura',
        }
      }
    },
    {
      id: 1,
      name: "Tomat Lembang",
      slug: "tomat-lembang",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est. Vivamus sodales mauris nisi. Etiam nec lacinia sem, nec dapibus eros. Cras sed turpis vitae odio posuere hendrerit viverra a sem. Phasellus neque ante, lacinia ut nibh in, pharetra accumsan ipsum. Nulla facilisi. Fusce consectetur malesuada metus, eget lobortis diam semper at. Etiam volutpat nec dui faucibus suscipit.",
      price: 20000,
      mainImg: "https://cdn.medcom.id/images/content/2020/10/08/1196942/3Rw1PQrlYn.jpeg",
      harvestDate: "2022-10-01 07:00:00+07",
      unit: "kg",
      stock: 100,
      SubCategoryId: 2,
      authorId: 1,
      SubCategory: {
        id: 2,
        name: 'Buah-buahan',
        CategoryId: 2,
        Category: {
          id: 2,
          name: 'Hortikultura',
        }
      }
    }
  ]
  // const { subCategories } = useSelector((state) => state.categoryReducer);
  const subCategories = [
    {
      id: 1,
      name: "Sayuran",
      CategoryId: 2,
      createdAt: "2022-8-06T00:00:00.000Z",
      updatedAt: "2022-8-06T00:00:00.000Z"
    },
    {
      id: 2,
      name: "Buah-buahan",
      CategoryId: 2,
      createdAt: "2022-8-06T00:00:00.000Z",
      updatedAt: "2022-8-06T00:00:00.000Z"
    },
    {
      id: 3,
      name: "Tanaman Obat-obatan",
      CategoryId: 2,
      createdAt: "2022-8-06T00:00:00.000Z",
      updatedAt: "2022-8-06T00:00:00.000Z"
    },
    {
      id: 4,
      name: "Tanaman Hias",
      CategoryId: 2,
      createdAt: "2022-8-06T00:00:00.000Z",
      updatedAt: "2022-8-06T00:00:00.000Z"
    }
  ]
  const [modalNewShow, setModalNewShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);

  const openModalEdit = (id) => {
    dispatch(fetchProduct(id))
    dispatch(fetchSubCategories())
    setModalEditShow(true)
  }

  const handleDelete = async (id) => {
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
        dispatch(fetchProducts());
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
  }

  const truncateString = (str) => {
    return str.slice(0, 200) + '...';
  }

  const toIDR = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  }

  return (
    <div className="product-item-list">
      {/* <h1 className='d-flex align-items-start'>Product List
                  <span style={{ flexGrow: 1 }}></span>
                  <Button className="custom-btn-1 btn-add-form" onClick={() => setModalNewShow(true)}>
                    Add Product&nbsp;<span className="material-symbols-outlined">add_circle</span>
                  </Button>
                </h1> */}
      {
        products.sort((a, b) => b.id - a.id).map((product, key) => {
          return (
            <div className="product-item" key={'product-item-' + key}>
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
                        <button className="btn" onClick={() => handleDelete(product.id)}>
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                        <button className="btn" onClick={() => openModalEdit(product.id)}>
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
  )
}
