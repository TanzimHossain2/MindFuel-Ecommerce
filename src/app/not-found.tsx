// import Footer1 from "@/components/footers/Footer1";
// import Header1 from "@/components/headers/Header1";
import Link from "next/link";
export const metadata = {
  title: "Page Not Found",
  description: "MindFuel BD, Stay Healthy, Stay Fit",
};
export default function notFound() {
  return (
    <>
      {/* <Header1 /> */}
      <section className="page-404-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="image">
                {/* <img src="/images/item/404.svg" alt="" /> */}
                <h1>.........</h1>
              </div>
              <div className="title">Oops...That link is broken.</div>
              <p>
                Sorry for the inconvenience. Go to our homepage to check out our
                latest collections.
              </p>
              <Link
                href="/"
                className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer1 /> */}
    </>
  );
}
