import Modal from 'react-bootstrap/Modal';
import { useState, useParams, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, fetchSubCategories, fetchUserProducts, putProduct } from '../store/actions';
import { Toast, swalWithBootstrapButtons, formatDate } from "../helpers";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FormModalEdit(props) {
  const dispatch = useDispatch();
  const { product, subcategories, load } = props;
  console.log(product);
  const { isLoadingSubmit } = useSelector((state) => state.globalReducer);
  const [inputVal, setInputVal] = useState({
    id: '',
    name: '',
    slug: '',
    description: '',
    price: 0,
    mainImg: '',
    harvestDate: '',
    unit: '',
    stock: 0,
    SubCategoryId: '',
    image1: {
      id: null,
      productId: null,
      imgUrl: ''
    },
    image2: {
      id: null,
      productId: null,
      imgUrl: ''
    },
    image3: {
      id: null,
      productId: null,
      imgUrl: ''
    }
  });

  const [errorName, setErrorName] = useState('');
  const [errorSlug, setErrorSlug] = useState('');
  const [errorPrice, setErrorPrice] = useState('');
  const [errorMainImg, setErrorMainImg] = useState('');
  const [errorHarvestDate, setErrorHarvestDate] = useState('');
  const [errorStock, setErrorStock] = useState('');
  const [errorUnit, setErrorUnit] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorSubCategoryId, setErrorSubCategoryId] = useState('');

  useEffect(() => {
    if (product.id) {
      const { id, name, slug, description, price, harvestDate, unit, stock, mainImg, SubCategoryId, Images } = product;

      setInputVal({
        id,
        name,
        slug,
        description,
        price,
        mainImg,
        harvestDate,
        unit,
        stock,
        SubCategoryId,
        image1: {
          id: Images[0]?.id,
          productId: Images[0]?.productId,
          imgUrl: Images[0]?.imgUrl
        },
        image2: {
          id: Images[1]?.id,
          productId: Images[1]?.productId,
          imgUrl: Images[1]?.imgUrl
        },
        image3: {
          id: Images[2]?.id,
          productId: Images[2]?.productId,
          imgUrl: Images[2]?.imgUrl
        },
      });
    }
  }, [product]);


  const updateProduct = async (event) => {
    try {
      event.preventDefault();
      const response = await dispatch(putProduct(inputVal));
      if (response.status === 200) {
        dispatch(fetchCategories());
        dispatch(fetchSubCategories());
        dispatch(fetchUserProducts());
        props.onHide();

        Toast.fire({
          icon: 'success',
          title: 'Product has been successfully updated..'
        });

        setInputVal({
          name: '',
          slug: '',
          description: '',
          price: 0,
          mainImg: '',
          harvestDate: '',
          unit: '',
          stock: 0,
          SubCategoryId: '',
          image1: {
            productId: null,
            imgUrl: ''
          },
          image2: {
            productId: null,
            imgUrl: ''
          },
          image3: {
            productId: null,
            imgUrl: ''
          }
        });
      } else {
        const responseJSON = await response.json();
        if (responseJSON.errors) {
          responseJSON.errors.forEach(v => {
            if (v.path === 'name' && errorName === '') setErrorName(v.message);
            if (v.path === 'slug' && errorSlug === '') setErrorSlug(v.message);
            if (v.path === 'price' && errorPrice === '') setErrorPrice(v.message);
            if (v.path === 'mainImg' && errorMainImg === '') setErrorMainImg(v.message);
            if (v.path === 'harvestDate' && errorHarvestDate === '') setErrorHarvestDate(v.message);
            if (v.path === 'stock' && errorStock === '') setErrorStock(v.message);
            if (v.path === 'unit' && errorUnit === '') setErrorUnit(v.message);
            if (v.path === 'description' && errorDescription === '') setErrorDescription(v.message);
            if (v.path === 'SubCategoryId' && errorSubCategoryId === '') setErrorSubCategoryId(v.message);
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
  }

  const clearError = () => {
    setErrorName('');
    setErrorSlug('');
    setErrorPrice('');
    setErrorMainImg('');
    setErrorHarvestDate('');
    setErrorStock('');
    setErrorUnit('');
    setErrorDescription('');
    setErrorSubCategoryId('');
  }

  const handleChange = (event) => {
    let name = event.currentTarget.name;
    let value = event.currentTarget.value
    if (name === 'image1' || name === 'image2' || name === 'image3') {
      setInputVal({ ...inputVal, [name]: { ...inputVal[name], imgUrl: value } });
    } else {
      setInputVal({ ...inputVal, [name]: value });
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
          Edit Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={updateProduct}>
          <div className="custom-row-1">
            <div className="custom-col-1">
              {
                load ?
                  <Skeleton height={54} />
                  :
                  <>
                    <div className="form-floating">
                      <input
                        type="text"
                        name="name"
                        id="productName"
                        className="form-control"
                        placeholder="Air Jordan 2 Retro J Balvin"
                        onChange={handleChange}
                        value={inputVal.name}
                      />
                      <label htmlFor="productName">Name</label>
                    </div>
                    {
                      errorName && <div className="invalid-validation">{errorName}</div>
                    }
                  </>
              }
            </div>
            <div className="custom-col-1">
              {
                load ?
                  <Skeleton height={54} />
                  :
                  <>
                    <div className="form-floating">
                      <input
                        type="text"
                        name="slug"
                        id="productSlug"
                        className="form-control"
                        placeholder="air-jordan-2-retro-j-balvin"
                        onChange={handleChange}
                        value={inputVal.slug}
                      />
                      <label htmlFor="productSlug">Slug</label>
                    </div>
                    {
                      errorSlug && <div className="invalid-validation">{errorSlug}</div>
                    }
                  </>
              }
            </div>
          </div>
          <div className="custom-row-1">
            <div className="custom-col-1">
              {
                load ?
                  <Skeleton height={54} />
                  :
                  <>
                    <div className="form-floating">
                      <input
                        type="number"
                        name="stock"
                        id="productStock"
                        className="form-control"
                        placeholder="100"
                        onChange={handleChange}
                        value={inputVal.stock}
                      />
                      <label htmlFor="productStock">Stock</label>
                    </div>
                    {
                      errorStock && <div className="invalid-validation">{errorStock}</div>
                    }
                  </>
              }
            </div>
            <div className="custom-col-1">
              {
                load ?
                  <Skeleton height={54} />
                  :
                  <>
                    <div className="form-floating">
                      <input
                        type="text"
                        name="unit"
                        id="productImage"
                        className="form-control"
                        placeholder="sadasd.png"
                        onChange={handleChange}
                        value={inputVal.unit}
                      />
                      <label htmlFor="productImage">Unit</label>
                    </div>
                    {
                      errorUnit && <div className="invalid-validation">{errorUnit}</div>
                    }
                  </>
              }
            </div>
          </div>
          <div className="custom-row-1">
            <div className="custom-col-1">
              {
                load ?
                  <Skeleton height={54} />
                  :
                  <>
                    <div className="form-floating">
                      <input
                        type="number"
                        name="price"
                        id="productPrice"
                        className="form-control"
                        placeholder="1000000"
                        onChange={handleChange}
                        value={inputVal.price}
                      />
                      <label htmlFor="productPrice">Price</label>
                    </div>
                    {
                      errorPrice && <div className="invalid-validation">{errorPrice}</div>
                    }
                  </>
              }
            </div>
            <div className="custom-col-1">
              {
                load ?
                  <Skeleton height={54} />
                  :
                  <>
                    <div className="form-floating">
                      <input
                        type="date"
                        name="harvestDate"
                        id="harvestDate"
                        className="form-control"
                        placeholder="sadasd.png"
                        onChange={handleChange}
                        value={formatDate(inputVal.harvestDate)}
                      />
                      <label htmlFor="harvestDate">Harvest Date</label>
                    </div>
                    {
                      errorHarvestDate && <div className="invalid-validation">{errorHarvestDate}</div>
                    }
                  </>
              }
            </div>
          </div>
          {
            load ?
              <Skeleton height={54} />
              :
              <>
                <div className="form-floating">
                  <input
                    type="text"
                    name="mainImg"
                    id="productImage"
                    className="form-control"
                    placeholder="sadasd.png"
                    onChange={handleChange}
                    value={inputVal.mainImg}
                  />
                  <label htmlFor="productImage">Main Image</label>
                </div>
                {
                  errorMainImg && <div className="invalid-validation">{errorMainImg}</div>
                }
              </>
          }
          {
            load ?
              <Skeleton height={54} />
              :
              <>
                <div className="form-floating float-textarea" style={{ paddingTop: '32px' }}>
                  <textarea
                    name="description"
                    id="productDescription"
                    className="form-control"
                    placeholder="description"
                    style={{ height: 'auto' }}
                    onChange={handleChange}
                    rows={3}
                    value={inputVal.description}
                  ></textarea>
                  <label htmlFor="productDescription" style={{ height: '54px' }}>Description</label>
                </div>
                {
                  errorDescription && <div className="invalid-validation">{errorDescription}</div>
                }
              </>
          }
          <div className="custom-row-1">
            <div className="custom-col-1">
              {
                load ?
                  <Skeleton height={54} />
                  :
                  <>
                    <div className="form-floating">
                      <select
                        className="form-select"
                        name="SubCategoryId"
                        placeholder="Product Category"
                        id="productCategory"
                        onChange={handleChange}
                        value={inputVal.SubCategoryId}
                      >
                        <option value="">--Select Category--</option>
                        {
                          subcategories.map(subcategory => {
                            return (
                              <option value={subcategory.id} key={'option-' + subcategory.id}>
                                {subcategory.Category.name + ' ~ ' + subcategory.name}
                              </option>
                            )
                          })
                        }
                      </select>
                      <label htmlFor="productCategory" style={{ height: "54px" }}>Category</label>
                    </div>
                    {
                      errorSubCategoryId && <div className="invalid-validation">{errorSubCategoryId}</div>
                    }
                  </>
              }
            </div>
            <div className="custom-col-1">
              {
                load ?
                  <Skeleton height={54} />
                  :
                  <>
                    <div className="form-floating">
                      <input
                        type="text"
                        name="image1"
                        id="productImage1"
                        className="form-control"
                        placeholder="sadasd.png"
                        onChange={handleChange}
                        value={inputVal.image1.imgUrl ? inputVal.image1.imgUrl : ''}
                      />
                      <label htmlFor="productImage1">Images</label>
                    </div>
                  </>
              }
            </div>
          </div>
          <div className="custom-row-1">
            <div className="custom-col-1">
              {
                load ?
                  <Skeleton height={54} />
                  :
                  <>
                    <div className="form-floating">
                      <input
                        type="text"
                        name="image2"
                        id="productImage2"
                        className="form-control"
                        placeholder="sadasd.png"
                        onChange={handleChange}
                        value={inputVal.image2.imgUrl ? inputVal.image2.imgUrl : ''}
                      />
                      <label htmlFor="productImage2">Images</label>
                    </div>
                  </>
              }
            </div>
            <div className="custom-col-1">
              {
                load ?
                  <Skeleton height={54} />
                  :
                  <>
                    <div className="form-floating">
                      <input
                        type="text"
                        name="image3"
                        id="productImage3"
                        className="form-control"
                        placeholder="sadasd.png"
                        onChange={handleChange}
                        value={inputVal.image3.imgUrl ? inputVal.image3.imgUrl : ''}
                      />
                      <label htmlFor="productImage3">Images</label>
                    </div>
                  </>
              }
            </div>
          </div>
          {
            load ?
              <Skeleton width={100} height={36} style={{ marginTop: '8px', float: 'right' }} />
              :
              <div style={{ position: 'sticky', bottom: 0 }}>
                <button onClick={clearError} type="submit" style={{ width: 'fit-content', padding: '0 20px', float: 'right', marginBottom: '0' }} className="custom-btn-1">
                  {
                    isLoadingSubmit ?
                      <>
                        <span className="spinner-border text-light sr-only" style={{ width: '20px', height: '20px', border: '2px solid #fff', borderRightColor: 'transparent' }}></span>
                        <span style={{ marginLeft: '10px' }}>Loading...</span>
                      </>
                      :
                      'Update'
                  }
                </button>
              </div>
          }
        </form>
      </Modal.Body>
    </Modal>
  );
}

