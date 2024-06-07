import React from "react";
import { ButtonPrimary, Product } from "../../components/";
import styles from "../ProductsList/styles.module.scss";
import { store } from "../../store";
import { useSelector } from "react-redux";
import { instance } from "../../api";
import { useParams, useNavigate } from "react-router-dom";

export const ProductsList = () => {
  const [modal, setModal] = React.useState(false);
  const [open, setOpen] = React.useState({
    best: false,
    category: false,
    price: false,
  });
  const handleModal = () => {
    setModal(!modal);
  };
  const handleAccordion = (e) => {
    const {
      dataset: { name },
    } = e.target;

    setOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  const [products, setProducts] = React.useState([]);
  const [url, setUrl] = React.useState();
  const cat = useSelector((state) => state.category.value);
  const input = useSelector((state) => state.input.value);
  const { categoryUrl, inputUrl } = useParams();
  const [priceFilter, setPriceFilter] = React.useState({
    minPrice: "",
    maxPrice: "",
  });

  React.useEffect(() => {
    async function getInitialProducts() {
      if (input) {
        const {
          data: { data },
        } = await instance.get(
          `products?filters[name][$contains]=${input}&populate=*`
        );
        setProducts(data);
        setUrl(`products?filters[name][$contains]=${input}&populate=*`);
      } else if (cat) {
        const {
          data: { data },
        } = await instance.get(
          `products?filters[categories][name][$eq]=${cat}&populate=*`
        );
        setProducts(data);
        setUrl(`products?filters[categories][name][$eq]=${cat}&populate=*`);
      } else if (input == false && cat == false) {
        if (categoryUrl) {
          const {
            data: { data },
          } = await instance.get(
            `products?filters[categories][name][$eq]=${categoryUrl}&populate=*`
          );
          setUrl(
            `products?filters[categories][name][$eq]=${categoryUrl}&populate=*`
          );
          setProducts(data);
        } else {
          const {
            data: { data },
          } = await instance.get(
            `products?filters[name][$containsi]=${inputUrl}&populate=*`
          );
          setUrl(`products?filters[name][$containsi]=${inputUrl}&populate=*`);
          setProducts(data);
        }
      }
    }

    getInitialProducts();
  }, []);

  React.useEffect(() => {
    async function changeUrl() {
      const {
        data: { data },
      } = await instance.get(url);
      setProducts(data);
    }
    changeUrl();
  }, [url,input]);

  const handleChange = (e, filterOption) => {
    const { checked } = e?.target;
    checked
      ? setUrl(url + filterOption)
      : setUrl(url.replace(filterOption, ""));
  };

  const handleSorting = (e) => {
    const { value } = e.target;

    if (url.includes("&sort=")) {
      // Replace the existing sort value with the new one
      setUrl(url.replace(/&sort=[^&]*/, `&sort=${value}`));
    } else {
      setUrl(url + `&sort=${value}`);
    }
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    setPriceFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.nav}>
        <p style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Home
        </p>
        <span className="material-symbols-outlined">chevron_right</span>
        {categoryUrl ? (
          <p
            onClick={() => {
              navigate(`/productslist/${categoryUrl}`);
            }}
          >
            {categoryUrl}
          </p>
        ) : (
          <h4>{inputUrl}</h4>
        )}
      </div>
      <section className={styles.productsList}>
        <div className={styles.showResults}>
          <div className={styles.heading}>
            {inputUrl ? <h1>Showing product for “{inputUrl}”</h1> : ""}
            <p>Showing {products.length} Products</p>
          </div>
          <div className={styles.sorting}>
            <form id="sorting">
              <select
                onChange={handleSorting}
                id="sort"
                name="sortlist"
                form="sorting"
              >
                <option value="Sort by">Sort by</option>
                <option value="price:asc">Price(least to the highest)</option>
                <option value="price:desc">Price(highest to the least)</option>
                <option value="rating:asc">Review(least to the highest)</option>
                <option value="rating:desc">
                  Review(highest to the least)
                </option>
              </select>
            </form>
            <div className={styles.filterIcon} onClick={handleModal}>
              <img src="/assets/images/Search Box.png" />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.productContainer}>
        <aside className={modal ? styles.showModal : ""}>
          <div className={styles.modalClose}>
            <h1 className={styles.mainFilter}>Filter products</h1>
            <span onClick={handleModal} className="material-symbols-outlined">
              close
            </span>
          </div>
          <hr />

          <div className={styles.bestFilters}>
            <div className={styles.filterHeading}>
              <h1>Best filters</h1>
              <span
                onClick={(e) => handleAccordion(e)}
                data-name="best"
                className="material-symbols-outlined"
              >
                {!open.best ? "expand_less" : "expand_more"}
              </span>
            </div>

            <ul className={open.best ? styles.closeFilter : ""}>
              <li>
                <input
                  id="4ormore"
                  type="checkbox"
                  onChange={(e) => handleChange(e, "&filters[rating][$gt]=4")}
                />
                <label htmlFor="4ormore">4 stars of upper</label>
              </li>
              <li>
                <input
                  id="delivery"
                  type="checkbox"
                  onChange={(e) =>
                    handleChange(e, "&filters[sameDayDelivery][$eq]=true")
                  }
                />
                <label htmlFor="delivery">Same day delivery</label>
              </li>
              <li>
                <input
                  id="discount"
                  type="checkbox"
                  onChange={(e) =>
                    handleChange(e, "&filters[hasDiscount][$eq]=true")
                  }
                />
                <label htmlFor="discount">Discount</label>
              </li>
            </ul>
          </div>

          <div className={styles.categoryFilters}>
            <div className={styles.filterHeading}>
              <h1>Category</h1>
              <span
                className="material-symbols-outlined"
                data-name="category"
                onClick={(e) => handleAccordion(e)}
              >
                {!open.category ? "expand_less" : "expand_more"}
              </span>
            </div>

            <ul className={open.category ? styles.closeFilter : ""}>
              <li>
                <input
                  id="Electronics"
                  type="checkbox"
                  onChange={(e) =>
                    handleChange(
                      e,
                      "&filters[categories][name][$eq]=Electronics"
                    )
                  }
                />
                <label htmlFor="Electronics"> Electronics</label>
              </li>
              <li>
                <input
                  id="Fashion"
                  type="checkbox"
                  onChange={(e) =>
                    handleChange(e, "&filters[categories][name][$eq]=Fashion")
                  }
                />
                <label htmlFor="">Fashion</label>
              </li>
              <li>
                <input
                  id="action"
                  type="checkbox"
                  onChange={(e) =>
                    handleChange(e, "&filters[categories][name][$eq]=Action")
                  }
                />
                <label htmlFor="action">Action</label>
              </li>
              <li>
                <input
                  id="books"
                  type="checkbox"
                  onChange={(e) =>
                    handleChange(e, "&filters[categories][name][$eq]=Books")
                  }
                />
                <label htmlFor="books">Books</label>
              </li>
              <li>
                <input
                  id="gaming"
                  type="checkbox"
                  onChange={(e) =>
                    handleChange(e, "&filters[categories][name][$eq]=Gaming")
                  }
                />
                <label htmlFor="gaming">Gaming</label>
              </li>
            </ul>
          </div>

          <div className={styles.priceFilters}>
            <div className={styles.filterHeading}>
              <h1>Pricing</h1>
              <span
                className="material-symbols-outlined"
                data-name="price"
                onClick={(e) => handleAccordion(e)}
              >
                {!open.price ? "expand_less" : "expand_more"}
              </span>
            </div>

            <div
              className={
                open.price
                  ? `${styles.prices} ${styles.closeFilter}`
                  : styles.prices
              }
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  setUrl(
                    url +
                      `&filters[price][$gte]=${priceFilter.minPrice}&filters[price][$lte]=${priceFilter.maxPrice}`
                  );
                }}
              >
                <input
                  type="number"
                  min={0}
                  value={priceFilter.minPrice}
                  name="minPrice"
                  placeholder="min price usd"
                  onChange={handlePriceChange}
                />
                <input
                  onChange={handlePriceChange}
                  type="number"
                  min={0}
                  name="maxPrice"
                  value={priceFilter.maxPrice}
                  placeholder="max price usd"
                />
                <ButtonPrimary sinif={styles.btn} text={"submit"} />
              </form>

              <div
                onClick={() => {
                  setUrl(
                    url + `&filters[price][$gte]=0&filters[price][$lte]=200`
                  );
                }}
                className={styles.priceSingle}
              >
                <p>$0 - $200</p>
              </div>
              <div
                onClick={() => {
                  setUrl(
                    url + `&filters[price][$gte]=200&filters[price][$lte]=500`
                  );
                }}
                className={styles.priceSingle}
              >
                <p>$200 - $500</p>
              </div>
              <div
                onClick={() => {
                  setUrl(
                    url + `&filters[price][$gte]=500&filters[price][$lte]=1500`
                  );
                }}
                className={styles.priceSingle}
              >
                <p>$500 - $1500</p>
              </div>
            </div>
          </div>
        </aside>

        <div className={styles.products}>
          {products.map((product) => {
            let result;

            if (product.attributes.name.length > 40) {
              result = product.attributes.name.slice(0, 40) + "...";
            } else {
              result = product.attributes.name;
            }
            return (
              <>
                <Product
                  id={product.id}
                  sinif={styles.productWidth}
                  img={`${import.meta.env.VITE_API_UPLOAD_IMG}${
                    product.attributes.images.data[0].attributes.url
                  }`}
                  heading={result}
                  price={`${product.attributes.price}`}
                  marka={`${product.attributes.marka}`}
                  rating={`${product.attributes.rating}`}
                  sales={`${product.attributes.quantitySold}`}
                />
                ;
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
