"use client";

import { useContextElement } from "@/context/Context";
import { sizeOptions } from "@/data/singleProductOptions";
import { generateUrl } from "@/utils/generateUrl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function QuickView() {
  const {
    quickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  const [currentSize, setCurrentSize] = useState(sizeOptions[0]);

  const openModalSizeChoice = async () => {
    const bootstrap = (await import("bootstrap")).default;
    const modalElement = document.getElementById("find_size");
    if (modalElement) {
      const myModal = new bootstrap.Modal(modalElement, {
        keyboard: false,
      });
      myModal.show();
      modalElement.addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });

      const backdrops = document.querySelectorAll(".modal-backdrop");
      if (backdrops.length > 1) {
        const lastBackdrop = backdrops[backdrops.length - 1];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        lastBackdrop.style.zIndex = "1057";
      }
    }
  };

  if (!quickViewItem) return null;

  return (
    <div className="modal fade modalDemo" id="quick_view">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-product-media-wrap">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: ".snbqvp",
                  nextEl: ".snbqvn",
                }}
                className="swiper tf-single-slide"
              >
                {[
                  quickViewItem.imgSrc,
                  quickViewItem.imgHoverSrc || quickViewItem.imgSrc,
                ].map((product, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="item">
                      <Image
                        alt=""
                        src={product}
                        width={720}
                        height={1045}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </SwiperSlide>
                ))}

                <div className="swiper-button-next button-style-arrow single-slide-prev snbqvp" />
                <div className="swiper-button-prev button-style-arrow single-slide-next snbqvn" />
              </Swiper>
            </div>
            <div className="tf-product-info-wrap position-relative">
              <div className="tf-product-info-list">
                <div className="tf-product-info-title">
                  <h5>
                    <Link
                      className="link"
                      href={`/product-detail/${generateUrl(quickViewItem.title, quickViewItem.id)}`}
                    >
                      {quickViewItem.title}
                    </Link>
                  </h5>
                </div>
                <div className="tf-product-info-badges">
                  <div className="badges text-uppercase">Best seller</div>
                  <div className="product-status-content">
                    <i className="icon-lightning" />
                    <p className="fw-6">Selling fast!</p>
                  </div>
                </div>
                <div className="tf-product-info-price">
                  <div className="price">${quickViewItem.price.toFixed(2)}</div>
                </div>
                <div className="tf-product-description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<p>${quickViewItem.description}</p>`,
                    }}
                  ></div>
                </div>

                {/* <div className="tf-product-info-variant-picker">
                  <div className="variant-picker-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="variant-picker-label">
                        Size:{" "}
                        <span className="fw-6 variant-picker-label-value">
                          {currentSize.value}
                        </span>
                      </div>
                      <div
                        className="find-size btn-choose-size fw-6"
                        onClick={openModalSizeChoice}
                      >
                        Find your size
                      </div>
                    </div>
                    <form className="variant-picker-values">
                      {sizeOptions.map((size) => (
                        <React.Fragment key={size.id}>
                          <input
                            type="radio"
                            name="size1"
                            id={size.id}
                            readOnly
                            checked={currentSize === size}
                          />
                          <label
                            onClick={() => setCurrentSize(size)}
                            className="style-text"
                            htmlFor={size.id}
                            data-value={size.value}
                          >
                            <p>{size.value}</p>
                          </label>
                        </React.Fragment>
                      ))}
                    </form>
                  </div>
                </div> */}

                <div className="tf-product-info-buy-button">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <a
                      href="#"
                      className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                      onClick={() => addProductToCart(quickViewItem.id)}
                    >
                      <span>
                        {isAddedToCartProducts(quickViewItem.id)
                          ? "Already Added - "
                          : "Add to cart - "}
                      </span>
                      <span className="tf-qty-price">
                        ${quickViewItem.price.toFixed(2)}
                      </span>
                    </a>
                    <a
                      onClick={() => addToWishlist(quickViewItem.id)}
                      className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action"
                    >
                      <span
                        className={`icon icon-heart ${isAddedtoWishlist(quickViewItem.id) ? "added" : ""}`}
                      />
                      <span className="tooltip">
                        {isAddedtoWishlist(quickViewItem.id)
                          ? "Already Wishlisted"
                          : "Add to Wishlist"}
                      </span>
                      <span className="icon icon-delete" />
                    </a>

                    {/* <a
                      href="#compare"
                      data-bs-toggle="offcanvas"
                      aria-controls="offcanvasLeft"
                      onClick={() => addToCompareItem(quickViewItem.id)}
                      className="tf-product-btn-wishlist hover-tooltip box-icon bg_white compare btn-icon-action"
                    >
                      <span
                        className={`icon icon-compare ${isAddedtoCompareItem(quickViewItem.id) ? "added" : ""}`}
                      />
                      <span className="tooltip">
                        {isAddedtoCompareItem(quickViewItem.id)
                          ? "Already Compared"
                          : "Add to Compare"}
                      </span>
                      <span className="icon icon-check" />
                    </a> */}

                    <div className="w-100">
                      <a href="#" className="btns-full">
                        Buy with
                        <Image
                          alt=""
                          src="/images/payments/paypal.png"
                          width={64}
                          height={18}
                        />
                      </a>
                      <a href="#" className="payment-more-option">
                        More payment options
                      </a>
                    </div>
                  </form>
                </div>

                <div>
                  <Link
                    href={`/product-detail/${generateUrl(quickViewItem.title, quickViewItem.id)}`}
                    className="tf-btn fw-6 btn-line"
                  >
                    View full details{" "}
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
