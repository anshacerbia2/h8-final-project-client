const baseUrl = "http://localhost:3000";

export function userLogin(...resArgs) {
  const body = resArgs[0];
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/login`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatch({ type: "login" })
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function courierCost(args) {
  console.log(args);
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/courier-cost`, {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "Content-Type": "application/json"
      },
    }).then((resp) => {
      console.log(resp);
      return resp;
    });
  };
}

export function fetchUser() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  console.log(user, "ni user")
  const { id } = user;
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/users/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "user/userSuccess",
          payload: data,
        });
      });
  };
}

export function fetchHistory() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/orders`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "histories/fetchSuccess",
          payload: data,
        });
      });
  };
}

export function fetchProducts() {
  return (dispatch, getState) => {
    dispatch({ type: "loading/true" });

    fetch(`${baseUrl}/products`, {
      method: 'get', // *GET, POST, PUT, DELETE, etc.
      headers: {
        // 'Content-Type': 'application/json',
        'access_token': localStorage.getItem("access_token"),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        // console.log(response)
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "products/fetchSuccess",
          payload: data,
        });
        return data
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loading/false" });
        }, 1000);
      });
  };
}

export function fetchProductByTitle(title) {
  // console.log(title);
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/products/search`, {
      method: "POST",
      body: JSON.stringify({ "search": title }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: "products/searchByTitle",
          payload: data
        })
        return data;
      })
  }
}

export function fetchUserProducts() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    fetch(`${baseUrl}/products/user`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "userProducts/fetchSuccess",
          payload: data,
        });
      });
  };
}

export function userRegister(...resArgs) {
  const body = resArgs[0];
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/register`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function fetchCategories() {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/categories`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "categories/fetchSuccess",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function fetchSubCategories() {
  return (dispatch, getState) => {
    dispatch({ type: "loading/true" });
    return fetch(`${baseUrl}/sub-categories`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "subCategories/fetchSuccess",
          payload: data,
        });
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loading/false" });
        }, 500);
      });
  };
}

export function fetchSubCategory(id) {
  return (dispatch, getState) => {
    dispatch({ type: "loading/true" });
    fetch(`${baseUrl}/sub-categories/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "subCategory/fetchSuccess",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loading/false" });
        }, 500);
      });
  };
}



export function fetchCarts() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "carts/fetchSuccess",
          payload: data,
        });
      });
  };
}

export function fetchAuctionCarts() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/auctions/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "auctionCarts/fetchSuccess",
          payload: data,
        });
      });
  };
}

export function fetchAuctions() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/auctions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "auctions/fetchSuccess",
          payload: data,
        });
      });
  };
}

export function postCart(args) {
  return (dispatch, getState) => {
    const access_token = localStorage.getItem("access_token");
    return fetch(`${baseUrl}/cart`, {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    }).then((resp) => {
      return resp;
    });
  };
}

export function incCart(id) {
  return (dispatch, getState) => {
    const access_token = localStorage.getItem("access_token");
    return fetch(`${baseUrl}/cart/${id}/inc`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((resp) => {
        return resp;
      })
  };
}

export function decCart(id) {
  console.log(id);
  return (dispatch, getState) => {
    const access_token = localStorage.getItem("access_token");
    return fetch(`${baseUrl}/cart/${id}/dec`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((resp) => {
        return resp;
      })
  };
}

// export function fetchProducts() {
//   return (dispatch, getState) => {
//     dispatch({ type: 'loading/true' });
//     fetch(`${baseUrl}/products`)
//       .then((response) => {
//         console.log(response);
//         return response.json()
//       })
//       .then((data) => {
//         dispatch({
//           type: 'products/fetchSuccess',
//           payload: data
//         })
//       })
//       .catch(err => {
//         console.log(err);
//       })
//       .finally(() => {
//         setTimeout(() => {
//           dispatch({ type: 'loading/false' });
//         }, 500);
//       });
//   }
// }

export function fetchProduct(id) {
  return (dispatch, getState) => {
    dispatch({ type: "loading/true" });
    fetch(`${baseUrl}/products/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data, '<<<<<<<<<<<<<<');
        dispatch({
          type: "product/fetchSuccess",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loading/false" });
        }, 500);
      });
  };
}

export function postSubCategory(...resArgs) {
  const body = resArgs[0];
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/sub-categories`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function postProduct(...resArgs) {
  const body = resArgs[0];
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/products`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function putSubCategory(...resArgs) {
  const access_token = localStorage.getItem("access_token");
  const body = resArgs[0];
  const id = resArgs[1].id;
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/sub-categories/${id}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function putProduct(...resArgs) {
  const access_token = localStorage.getItem("access_token");
  const body = resArgs[0];
  const { id } = body;
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/products/${id}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function deleteProduct(id) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/products/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  };
}

export function deleteCart(id) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/cart/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  };
}

export function fetchProvinces() {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/provinces`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        dispatch({
          type: "provinces/fetchSuccess",
          payload: data,
        });
      });
  };
}

export function fetchCities(provinceId) {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/cities/${provinceId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "cities/fetchSuccess",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function postAddress(...resArgs) {
  const body = resArgs[0];
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/users/address`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        console.log(response, "<<<<<<<<<<<<<");
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}



export function postCharge(bank) {
  console.log(bank);
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch({ type: "loadingSubmit/true" });
    return fetch(`${baseUrl}/charge`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(bank),
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({ type: "loadingSubmit/false" });
        }, 250);
      });
  };
}

export function fetchLatestProducts(subCatId) {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/products/latest`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        dispatch({
          type: 'productsLatest/fetchSuccess',
          payload: data
        })
      })
  }
}