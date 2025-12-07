import React, { useState, useEffect, useCallback } from "react";
import "./Home.scss";
import {
  ProductDetails,
  OrderRequest,
  OrderReponse,
} from "../Components/Component.types";
import { D365Api } from "../Services/api/D365Api.tsx";

const Home: React.FC = () => {
  const [productsDetails, setProductsDetails] = useState<OrderReponse>();
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback(async () => {
    const productsResponse = await D365Api.GetProducts();
    setProductsDetails(productsResponse);
    if (productsResponse && productsResponse.productsData) {
      setProducts(
        productsResponse.productsData.productList.map((p) => {
          return {
            product: p.product,
            quantity: 0,
            deliveryDate: "",
            name: p.name,
          };
        })
      );
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const toggleSelection = (name: string) => {
    setSelectedProducts((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const postSelected = async () => {
    if (!productsDetails) {
      alert("Products data not loaded yet.");
      return;
    }

    if (selectedProducts.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    const productsSelected = selectedProducts.map((name) => {
      var matchingProduct = products.find((p) => p.product === name)!;
      return {
        product: matchingProduct.product,
        quantity: matchingProduct.quantity,
        deliveryDate: matchingProduct.deliveryDate,
      };
    });

    // Validation
    for (const p of productsSelected) {
      if (!p.quantity || Number(p.quantity) <= 0) {
        alert(`Please enter a valid quantity for product: ${p.product}`);
        return;
      }
      if (!p.deliveryDate || p.deliveryDate.trim() === "") {
        alert(`Please enter a delivery date for product: ${p.product}`);
        return;
      }
    }

    // Start loading
    setLoading(true);

    const payload: OrderRequest = {
      channel: productsDetails.channel,
      emailTo: productsDetails.emailTo,
      emailDate: new Date().toISOString(),
      emailSubject: productsDetails.subject,
      messageId: productsDetails.messageId,
      productExtract: {
        emailId: productsDetails?.productsData.emailId,
        legalEntity: productsDetails?.productsData.legalEntity,
        productList: productsSelected,
      },
    };

    try {
      await D365Api.ValidateAndCreateSO(payload);
      alert("Order submitted successfully!");

      setSelectedProducts([]);
      setProducts((prev) =>
        prev.map((p) => ({
          ...p,
          quantity: 0,
          deliveryDate: "",
        }))
      );
    } catch (error) {
      console.error("Error while submitting:", error);
      alert("Failed to submit the order. Check console.");
    } finally {
      setLoading(false); // stop spinner
    }
  };

  const updateProductField = (
    name: string,
    field: "quantity" | "deliveryDate",
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.product === name ? { ...p, [field]: value } : p))
    );
  };

  const toMMDDYYYY = (value: string) => {
    if (!value) return "";
    const [yyyy, mm, dd] = value.split("-");
    return `${mm}/${dd}/${yyyy}`;
  };

  const toDateInputFormat = (value: string) => {
    if (!value) return "";

    // If stored as MM/DD/YYYY → convert
    if (value.includes("/")) {
      const [mm, dd, yyyy] = value.split("/");
      return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    }

    // If already ISO
    const d = new Date(value);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  };

  return (
    <div className="home-container">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-title">Order Portal</div>
        <div className="user-icon">U</div>
      </div>

      {!productsDetails ? (
        <div className="loader-container">
          <div className="loader"></div>
          <div>Loading products...</div>
        </div>
      ) : (
        <>
          <div className="products-section">
            <h2 className="products-title">Products</h2>
            <div className="product-grid">
              {products.map((p) => {
                const isSelected = selectedProducts.includes(p.product);

                return (
                  <div
                    key={p.product}
                    className={`product-card ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleSelection(p.product)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="product-checkbox"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelection(p.product);
                      }}
                    />

                    <div className="product-title">
                      {p.product + " - " + p.name}
                    </div>

                    {/* Quantity Inline */}
                    <div className="input-row-inline">
                      <label className="input-label-inline">Quantity:</label>
                      <input
                        type="number"
                        placeholder="Qty"
                        value={p.quantity}
                        disabled={!isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          updateProductField(
                            p.product,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="product-input-inline"
                      />
                    </div>

                    {/* Delivery Date Inline */}
                    <div className="input-row-inline">
                      <label className="input-label-inline">
                        Delivery Date:
                      </label>
                      <input
                        type="date"
                        value={toDateInputFormat(p.deliveryDate)}
                        disabled={!isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          updateProductField(
                            p.product,
                            "deliveryDate",
                            toMMDDYYYY(e.target.value)
                          )
                        }
                        className="product-input-inline"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "0 2rem 2rem 2rem", textAlign: "left" }}>
              <button
                onClick={postSelected}
                disabled={loading}
                style={{
                  padding: "0.5rem 1.5rem",
                  background: loading
                    ? "gray"
                    : "linear-gradient(135deg, #a209cc, #6200ea)",
                  border: "none",
                  borderRadius: "7px",
                  color: "white",
                  fontSize: "15px",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                {loading && <div className="loader"></div>}
                {loading ? "Ordering..." : "Order"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
