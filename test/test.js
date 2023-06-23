const axios = require("axios");
const PRODUCTS = require("./mock-products.json");
const BASE_URL = "http://localhost:5000/api/v1";

const register = async (data) => {
  console.log(`registering... ${data.email}`);
  return axios({
    method: "post",
    url: `${BASE_URL}/auth/register`,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.error(
      err.response && err.response.data ? err.response.data : err.stack
    );
  });
};

const login = async (data) => {
  console.log(`logging in... ${data.email}`);
  return axios({
    method: "post",
    url: `${BASE_URL}/auth/login`,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return {
        tokenCookie: res.headers.get("set-cookie")[0],
        ...res,
      };
    })
    .catch((err) => {
      console.error(
        err.response && err.response.data ? err.response.data : err.stack
      );
    });
};

const reviewProduct = async (data, tokenCookie) => {
  console.log(`reviewing product... ${data.name}`);
  return axios({
    method: "post",
    url: `${BASE_URL}/reviews`,
    data,
    headers: {
      "Content-Type": "application/json",
      cookie: tokenCookie,
    },
  }).catch((err) => {
    console.error(
      err.response && err.response.data ? err.response.data : err.stack
    );
  });
};

const getRandomProducts = async (count) => {
  console.log("getting random products...");
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/products`,
    });
    const { products } = response.data;
    const randomProducts = [];
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * products.length);
      randomProducts.push(products[index]);
    }
    return randomProducts;
  } catch (err) {
    console.error(
      err.response && err.response.data ? err.response.data : err.stack
    );
  }
};

// updates fields of existing products in the DB
const updateProducts = async (data, tokenCookie) => {
  console.log(`updating products with... ${JSON.stringify(data)}`);
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/products`,
    });
    const { products } = response.data;
    for (const [index, product] of products.entries()) {
      // change this condition as needed (currently picks every other product)
      if (index % 2 === 0) {
        await axios({
          method: "patch",
          url: `${BASE_URL}/products/${product.id}`,
          data,
          headers: {
            "Content-Type": "application/json",
            cookie: tokenCookie,
          },
        });
      }
    }
  } catch (err) {
    console.error(
      err.response && err.response.data ? err.response.data : err.stack
    );
  }
};

// caution: if this triggers rate limit, copy paste JSON into Atlas
const adminCreateMockProducts = async (tokenCookie) => {
  try {
    process.stdout.write("creating mock product...");
    for (const [index, product] of PRODUCTS.entries()) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`creating mock product... ${index + 1} `);
      await axios({
        method: "post",
        url: `${BASE_URL}/products`,
        data: product,
        headers: {
          "Content-Type": "application/json",
          cookie: tokenCookie,
        },
      });
    }
    process.stdout.write("\n...mock products created\n");
  } catch (err) {
    console.error(
      err.response && err.response.data ? err.response.data : err.stack
    );
  }
};

(async () => {
  // first registered person is admin
  await register({
    name: "susan",
    email: "susan@gmail.com",
    password: "secret",
  });
  await register({
    name: "john",
    email: "john@gmail.com",
    password: "secret",
  });
  await register({
    name: "jane",
    email: "jane@gmail.com",
    password: "secret",
  });
  await register({
    name: "shawn",
    email: "shawn@gmail.com",
    password: "secret",
  });
  await register({
    name: "bob",
    email: "bob@gmail.com",
    password: "secret",
  });

  await login({
    email: "susan@gmail.com",
    password: "secret",
  })
    .then(async (data) => {
      //await adminCreateMockProducts(data.tokenCookie);
      // await updateProducts(
      //   { colors: ["#000000", "#ffffff", "#0000ff"] },
      //   data.tokenCookie
      // );
      const products = await getRandomProducts(5);
      return { products, ...data };
    })
    .then(async ({ products, tokenCookie }) => {
      for (const product of products) {
        await reviewProduct(
          {
            productId: product.id,
            name: product.name,
            comment: "test comment by susan",
            title: "excellent product!",
            rating: 5,
          },
          tokenCookie
        );
      }
    })
    .catch((err) => {
      console.error(
        err.response && err.response.data ? err.response.data : err.stack
      );
    });

  await login({
    email: "john@gmail.com",
    password: "secret",
  })
    .then(async (data) => {
      const products = await getRandomProducts(5);
      return { products, ...data };
    })
    .then(async ({ products, tokenCookie }) => {
      for (const product of products) {
        await reviewProduct(
          {
            productId: product.id,
            name: product.name,
            comment: "test comment by john",
            title: "great product!",
            rating: 4,
          },
          tokenCookie
        );
      }
    })
    .catch((err) => {
      console.error(
        err.response && err.response.data ? err.response.data : err.stack
      );
    });

  await login({
    email: "jane@gmail.com",
    password: "secret",
  })
    .then(async (data) => {
      const products = await getRandomProducts(5);
      return { products, ...data };
    })
    .then(async ({ products, tokenCookie }) => {
      for (const product of products) {
        await reviewProduct(
          {
            productId: product.id,
            name: product.name,
            comment: "test comment by jane",
            title: "average product",
            rating: 3,
          },
          tokenCookie
        );
      }
    })
    .catch((err) => {
      console.error(
        err.response && err.response.data ? err.response.data : err.stack
      );
    });

  await login({
    email: "shawn@gmail.com",
    password: "secret",
  })
    .then(async (data) => {
      const products = await getRandomProducts(5);
      return { products, ...data };
    })
    .then(async ({ products, tokenCookie }) => {
      for (const product of products) {
        await reviewProduct(
          {
            productId: product.id,
            name: product.name,
            comment: "test comment by shawn",
            title: "poor product",
            rating: 2,
          },
          tokenCookie
        );
      }
    })
    .catch((err) => {
      console.error(
        err.response && err.response.data ? err.response.data : err.stack
      );
    });

  await login({
    email: "bob@gmail.com",
    password: "secret",
  })
    .then(async (data) => {
      const products = await getRandomProducts(5);
      return { products, ...data };
    })
    .then(async ({ products, tokenCookie }) => {
      for (const product of products) {
        await reviewProduct(
          {
            productId: product.id,
            name: product.name,
            comment: "test comment by bob",
            title: "terrible product!",
            rating: 1,
          },
          tokenCookie
        );
      }
    })
    .catch((err) => {
      console.error(
        err.response && err.response.data ? err.response.data : err.stack
      );
    });
})();
