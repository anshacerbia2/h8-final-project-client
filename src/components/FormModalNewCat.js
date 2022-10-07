// import Modal from 'react-bootstrap/Modal';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSubCategories, postSubCategory } from '../store/action';
// import { Toast } from "../helpers";

// export default function FormModalNewCat(props) {
//   const dispatch = useDispatch();
//   const { isLoadingSubmit } = useSelector((state) => state.globalReducer);
//   const [inputVal, setInputVal] = useState({
//     name: '',
//     CategoryId: ''
//   });
//   const [errorName, setErrorName] = useState('');
//   const [errorCategoryId, setErrorCategoryId] = useState('');

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await dispatch(postSubCategory(inputVal));
//       console.log(response);
//       if (response.status === 201) {
//         dispatch(fetchSubCategories());
//         props.onHide();

//         Toast.fire({
//           icon: 'success',
//           title: 'Category has been successfully created..'
//         });

//         setInputVal({
//           name: '',
//           CategoryId: ''
//         });
//       } else {
//         const responseJSON = await response.json();
//         if (responseJSON.errors) {
//           responseJSON.errors.forEach(v => {
//             if (v.path === 'name' && errorName === '') setErrorName(v.message);
//             if (v.path === 'CategoryId' && errorCategoryId === '') setErrorCategoryId(v.message);
//           });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const clearError = () => {
//     setErrorName('');
//     setErrorCategoryId('');
//   }

//   const handleChange = (event) => {
//     let name = event.currentTarget.name;
//     let value = event.currentTarget.value
//     setInputVal({ ...inputVal, [name]: value });
//   }

//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter" className="custom-modal-title">
//           New Category
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <form onSubmit={handleCreate}>
//           <div className="custom-row-1">
//             <div className="custom-col-1">
//               <div className="form-floating">
//                 <input
//                   type="text"
//                   name="name"
//                   id="productName"
//                   className="form-control"
//                   placeholder="Air Jordan 2 Retro J Balvin"
//                   onChange={handleChange}
//                   value={inputVal.name}
//                 />
//                 <label htmlFor="productName">Name</label>
//               </div>
//               {
//                 errorName && <div className="invalid-validation">{errorName}</div>
//               }
//             </div>
//             <div className="custom-col-1">
//               <div className="form-floating">
//                 <select
//                   className="form-select"
//                   name="CategoryId"
//                   placeholder="Product Category"
//                   id="productSex"
//                   onChange={handleChange}
//                   value={inputVal.CategoryId}
//                 >
//                   <option value="">--Select Sex--</option>
//                   {
//                     props.categories.map(sex => {
//                       return (
//                         <option value={sex.id} key={'option-' + sex.id}>
//                           {sex.name}
//                         </option>
//                       )
//                     })
//                   }
//                 </select>
//                 <label htmlFor="productSex" style={{ height: "54px" }}>Sex</label>
//               </div>
//               {
//                 errorCategoryId && <div className="invalid-validation">{errorCategoryId}</div>
//               }
//             </div>
//           </div>
//           <button onClick={clearError} type="submit" style={{ width: 'fit-content', padding: '0 20px', float: 'right', marginBottom: '0' }} className="custom-btn-1">
//             {
//               isLoadingSubmit ?
//                 <>
//                   <span className="spinner-border text-light sr-only" style={{ width: '20px', height: '20px', border: '2px solid #fff', borderRightColor: 'transparent' }}></span>
//                   <span style={{ marginLeft: '10px' }}>Loading...</span>
//                 </>
//                 :
//                 'Create'
//             }
//           </button>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// }


export default function FormModalNewCat(props) {
  return (
    <></>
  )
}