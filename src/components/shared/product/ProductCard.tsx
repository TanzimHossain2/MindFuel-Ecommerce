"use client";
import { useContextElement } from "@/context/Context";
import { IProduct } from "@/types/product";
import { generateUrl } from "@/utils/generateUrl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProductCard {
  product: IProduct;
}

export const ProductCard = ({ product }: IProductCard) => {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);

  const { setQuickViewItem } = useContextElement();
  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.imgSrc);
  }, [product]);

  return (
    <div className="card-product fl-item" key={product.id}>
      <div className="card-product-wrapper">
        <Link
          href={`/product-detail/${generateUrl(product.title, product.id)}`}
          className="product-img"
        >
          <Image
            className="lazyload img-product"
            data-src={product.imgSrc}
            src={currentImage}
            alt="image-product"
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            data-src={
              product.imgHoverSrc ? product.imgHoverSrc : product.imgSrc
            }
            src={product.imgHoverSrc ? product.imgHoverSrc : product.imgSrc}
            alt="image-product"
            width={720}
            height={1005}
          />
        </Link>

        <div className="list-product-btn">
          <a
            href="#quick_add"
            onClick={() => setQuickAddItem(product.id)}
            data-bs-toggle="modal"
            className="box-icon bg_white quick-add tf-btn-loading"
          >
            <span className="icon icon-bag" />
            <span className="tooltip">Quick Add</span>
          </a>

          <a
            onClick={() => addToWishlist(product.id)}
            className="box-icon bg_white wishlist btn-icon-action"
          >
            <span
              className={`icon icon-heart ${
                isAddedtoWishlist(product.id) ? "added" : ""
              }`}
            />
            <span className="tooltip">
              {isAddedtoWishlist(product.id)
                ? "Already Wishlisted"
                : "Add to Wishlist"}
            </span>
            <span className="icon icon-delete" />
          </a>

          {/* <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="offcanvasLeft"
            onClick={() => addToCompareItem(product.id)}
            className="box-icon bg_white compare btn-icon-action"
          >
            <span
              className={`icon icon-compare ${
                isAddedtoCompareItem(product.id) ? "added" : ""
              }`}
            />
            <span className="tooltip">
              {" "}
              {isAddedtoCompareItem(product.id)
                ? "Already Compared"
                : "Add to Compare"}
            </span>
            <span className="icon icon-check" />
          </a> */}

          <a
            href="#quick_view"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon bg_white quickview tf-btn-loading"
          >
            <span className="icon icon-view" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>

        {product.countdown && (
          <div className="countdown-box">
            <div className="js-countdown">{/* <CountdownComponent /> */}</div>
          </div>
        )}
      </div>

      <div className="card-product-info">
        <Link
          href={`/product-detail/${generateUrl(product.title, product.id)}`}
          className="title link"
        >
          {product.title}
        </Link>
        <span className="price">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};