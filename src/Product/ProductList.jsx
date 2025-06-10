import React, { useContext, useState, useEffect } from "react";
import "./ProductList.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Header from "../Header/Header";
import { SearchContext } from "../Context/SearchContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCategories } from "../Context/CategoriesContext";

const ProductList = () => {
  const { searchTerm } = useContext(SearchContext);
  const { selectedCategory } = useCategories();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const products = [
    // Computers
    {
      id: 1,
      name: "Monitor",
      price: "20.00",
      description:
        "This is a great product that has many features and benefits for users. It is known for its durability and superior quality. People love this product because it provides excellent value for money and it is very reliable over time.",
      image:
        "https://i0.wp.com/www.winsoft.lk/wp-content/uploads/2023/06/monova-18.5-monitor.png?fit=486%2C486&ssl=1",
      category: "Computers",
    },
    {
      id: 2,
      name: "Laptop",
      price: "35.00",
      description:
        "Another amazing product with fantastic quality, suitable for a wide range of applications. This product stands out for its excellent craftsmanship and user-friendly design.",
      image:
        "https://i0.wp.com/www.winsoft.lk/wp-content/uploads/2023/10/ASUS-Vivobook-X1504V-Core-i5-13th-Gen-Laptop.png?fit=518%2C518&ssl=1",
      category: "Computers",
    },
    {
      id: 8,
      name: "AMD Ryzen 7",
      price: "55.00",
      description:
        "A premium choice for you with exquisite features. This product offers outstanding quality and performance, making it the perfect choice for those who value the finer things in life.",
      image: "https://www.gamestreet.lk/images/products/3785.jpg",
      category: "Computers",
    },

    // Accessories
    {
      id: 3,
      name: "Gaming Chair",
      price: "50.00",
      description:
        "High-quality product that meets all standards. It is specifically designed for people who need something that can handle heavy-duty tasks without compromising on style.",
      image: "https://www.gamestreet.lk/images/products/5958.jpg",
      category: "Accessories",
    },
    {
      id: 4,
      name: "RAM",
      price: "45.00",
      description:
        "An excellent choice for any occasion, crafted with care using the finest materials. This product is both practical and aesthetically pleasing, making it perfect for everyday use.",
      image: "https://www.gamestreet.lk/images/products/5985.jpg",
      category: "Accessories",
    },

    // Peripherals
    {
      id: 5,
      name: "Mouse",
      price: "30.00",
      description:
        "Perfect for daily use, very reliable and practical. It has received rave reviews from customers who appreciate its affordability without compromising on quality.",
      image: "https://www.gamestreet.lk/images/products/4401.jpg",
      category: "Peripherals",
    },
    {
      id: 6,
      name: "Elgato Ring Light",
      price: "25.00",
      description:
        "Reliable and durable product for everyday tasks. Whether you need it for work or leisure, this product is designed to make your life easier and more efficient.",
      image: "https://www.gamestreet.lk/images/products/3925.jpg",
      category: "Peripherals",
    },
    {
      id: 7,
      name: "Mechanical Gaming Keyboard",
      price: "40.00",
      description:
        "The best in its class, offering great value. With its unique features and superior performance, this product is a top choice for those seeking reliability and excellence.",
      image: "https://www.gamestreet.lk/images/products/5069.jpg",
      category: "Peripherals",
    },

    // New Products - Additional categories
    {
      id: 9,
      name: "Smartphone",
      price: "70.00",
      description:
        "A top-tier smartphone with the latest features, fast performance, and a sleek design. This is the go-to choice for anyone looking for cutting-edge technology.",
      image: "https://img.freepik.com/premium-vector/smartphone-mock-up-realistic-design_23-2148358424.jpg?w=826",
      category: "Electronics",
    },
    {
      id: 10,
      name: "Wireless Earbuds",
      price: "15.00",
      description:
        "High-quality wireless earbuds offering superior sound quality, comfort, and long battery life. Perfect for music lovers and busy professionals.",
      image: "https://cdn-eshop.jo.zain.com/images/thumbs/0067638_awei-t26-pro-tws-bluetooth-earphone.webp",
      category: "Accessories",
    },
    {
      id: 11,
      name: "Bluetooth Speaker",
      price: "30.00",
      description:
        "Portable Bluetooth speaker with excellent sound quality and a long battery life, designed to deliver immersive music experiences wherever you go.",
      image: "https://m.media-amazon.com/images/I/718yxonHN8L.__AC_SY300_SX300_QL70_FMwebp_.jpg",
      category: "Peripherals",
    },
    {
      id: 12,
      name: "External Hard Drive",
      price: "40.00",
      description:
        "A reliable external hard drive for storing large files and backups. With fast data transfer speeds and durable build quality, it's the ideal storage solution.",
      image: "https://mercurycomputerslimited.com/wp-content/uploads/2021/03/Transcend-StoreJet-25M3.jpg",
      category: "Accessories",
    },
  ];

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (!storedProducts) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  // Filter products by search term and category
  const filteredProducts1 = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const finalFilteredProducts = searchTerm
    ? filteredProducts1.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts1;

    const addToCart = (product) => {
      // Retrieve cart from localStorage or initialize it as an empty array
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("Stored Cart:", storedCart);
    
      // Check if the product already exists in the cart
      const existingProduct = storedCart.find((item) => item.id === product.id);
      console.log("Existing Product:", existingProduct);
    
      if (existingProduct) {
        // If the product exists, alert the user
        alert(`${product.name} is already in the cart!`);
        console.log(`${product.name} is already in the cart!`);
      } else {
        // If the product doesn't exist, add it to the cart with default quantity
        const productWithDefaultQuantity = { ...product, quantity: 1 };
        console.log("Product with Default Quantity:", productWithDefaultQuantity);
    
        // Create a new cart with the new product added
        const newCart = [...storedCart, productWithDefaultQuantity];
        console.log("New Cart:", newCart);
    
        // Update the cart state
        setCart(newCart);
        console.log("Updated Cart State:", newCart);
    
        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(newCart));
        console.log("Saved Cart to LocalStorage:", newCart);
    
        // Update the cart count and save it to localStorage
        const cartCount = newCart.length;
        localStorage.setItem("cartCount", JSON.stringify(cartCount));
        console.log("Updated Cart Count:", cartCount);
    
        // Alert the user that the product was added
        alert(`${product.name} added to cart!`);
        console.log(`${product.name} added to cart!`);
    
        // Reload the page (if needed)
        window.location.reload();
        console.log("Page reloaded");
      }
    };
    

  const addToWishlist = (product) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existingProduct = storedWishlist.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
      localStorage.setItem("wishlist", JSON.stringify(storedWishlist));
      alert(` ${product.name} is already in the wishlist`);
    } else {
      const productWithDefaultQuantity = { ...product, quantity: 1 };
      const newWishlist = [...storedWishlist, productWithDefaultQuantity];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));

      alert(`${product.name} added to wishlist!`);
      window.location.reload();
    }
  };

  return (
    <div>
      <Header />
      <section style={{ backgroundColor: "#eee" }}>
        <div className="py-5">
          <div className="row justify-content-center mb-3">
            {finalFilteredProducts.length > 0 ? (
              finalFilteredProducts.map((product) => (
                <div key={product.id} className="col-md-12 col-xl-10">
                  <div className="card shadow-0 border rounded-3 mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                          <div className="bg-image hover-zoom ripple rounded ripple-surface">
                            <img
                              src={product.image}
                              className="w-100"
                              alt={product.name}
                            />
                            <a href="#!">
                              <div className="hover-overlay">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor:
                                      "rgba(253, 253, 253, 0.15)",
                                  }}
                                ></div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6 pt-md-5 pb-5">
                          <h5
                            style={{ fontSize: "1.75rem", fontWeight: "bold" }}
                          >
                            {product.name}
                          </h5>
                          <div
                            className="mt-1 mb-0"
                            style={{ fontSize: "1.125rem", padding: "10px 0" }}
                          >
                            {product.description}
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start p-xl-5">
                          <div className="d-flex flex-row align-items-center mb-1">
                            <h2 className="mb-1 me-1">${product.price}</h2>
                            <span className="text-danger">
                              <s>$20.99</s>
                            </span>
                          </div>
                          <h6 className="text-success">Free shipping</h6>
                          <div className="d-flex flex-column mt-4 gap-md-4 custom-gap">
                            <button
                              onClick={() => addToCart(product)}
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="button-70"
                              type="button"
                            >
                              <AddShoppingCartIcon />
                              Add cart
                            </button>
                            <button
                              onClick={() => addToWishlist(product)}
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="button-70"
                              type="button"
                            >
                              <FavoriteBorderIcon />
                              Add WishList
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products match your criteria.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
