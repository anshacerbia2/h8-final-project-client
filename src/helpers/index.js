import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
});

const swalImg = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
});

// const swalDanger = Swal.fire({
//   title: 'Error!',
//   text: 'Do you want to continue',
//   icon: 'error',
//   confirmButtonText: 'Cool'
// });

// const swallLoginFirst = () => {
//   Swal.fire({
//     title: "هل تريد الاستمرار؟",
//     icon: "question",
//     iconHtml: "؟",
//     confirmButtonText: "نعم",
//     cancelButtonText: "لا",
//     showCancelButton: true,
//     showCloseButton: true,
//   });
// };

const toIDR = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

const formatDate = (date) => {
  return date.slice(0, 10);
}

export { Toast, swalWithBootstrapButtons, swalImg, toIDR, formatDate }