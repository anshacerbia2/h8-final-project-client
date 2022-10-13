import "../css/home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAuctions, fetchLatestProducts } from "../store/actions";
import CardAuction from "../components/CardAuction";
import CardProduct from "../components/CardProduct";
import { Link } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productsLatest } = useSelector((state) => state.productReducer);
  const { auctions } = useSelector((state) => state.globalReducer);

  useEffect(() => {
    dispatch(fetchLatestProducts())
    dispatch(fetchAuctions())
  }, []);

  return (
    <>
      <div
        // className="row"
        style={{
          color: "#fff",
          width: "100%",
          backgroudRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center 65%",
          backgroundBlendMode: "darken",
          backgroundColor: 'rgba(10, 10, 10, 0.45)',
          backgroundImage:
            "url('https://klinegroup.com/wp-content/uploads/Fruit-vegetable-blog-banner.jpg')",
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center" style={{
          height: 375
        }}>
          <h3 className="display-4" style={{ fontFamily: 'Lato', fontWeight: '900' }}>Selamat datang di Agro Shop</h3>
          <p className="text-center" style={{ padding: "0 15rem", fontFamily: 'Lato', fontWeight: '600' }}>
            Belanja semua kebutuhan pangan sayuran dan buah mu disini, langsung
            dari petani.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 40 }}>
        {/* Section Header */}
        {/* Section Lelang */}
        {/* <div className="row my-4">
          <h5>Lelang saat ini</h5>
          <CardAuction />
          <CardAuction />
          <CardAuction />
          <CardAuction />
        </div> */}
        {/* Section Why Us*/}
        <div
          className="d-flex my-5"
          style={{
            // padding: 12,
            fontSize: "0.875rem",
            color: "#fff",
            // background:
            //   "rgba(0, 0, 0, 0.6) url('https://cdn.pixabay.com/photo/2017/07/31/04/11/tomato-2556426_1280.jpg')",
            // backgroudRepeat: "no-repeat",
            // backgroundSize: "cover",
            // backgroundPosition: 'center',
            // backgroundBlendMode: "darken",
          }}
        >
          <div
            className="col d-flex flex-column justify-content-sm-evenly align-items-center text-center"
            style={{
              height: "25rem",
              padding: 20,
              background:
                "rgba(0, 0, 0, 0.3) url('https://media.istockphoto.com/photos/senior-man-with-bunch-of-freshly-harvested-carrots-picture-id1251268131?k=20&m=1251268131&s=612x612&w=0&h=Elmzhbu2RBxIIFq20km7OO3Po69YbruWyrOy5Krmps0=')",
              backgroudRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: 'center',
              backgroundBlendMode: "darken",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "5rem", color: "#94d537" }}
            >
              nest_eco_leaf
            </span>
            <h5>
              <strong> Produk segar </strong>
            </h5>
            <p>
              Beli kebutuhan rumah online produk langsung dari hasil panen petani.
            </p>
          </div>
          <div
            className="col d-flex flex-column justify-content-sm-evenly align-items-center text-center"
            style={{
              height: "25rem", background:
                "rgba(0, 0, 0, 0.3) url('https://media.istockphoto.com/photos/farmer-carrying-a-tray-of-vegetable-seedlings-to-plant-picture-id1399500064?k=20&m=1399500064&s=612x612&w=0&h=zD300KuSDl4p0DG3c_pF_Yih90zAcGlAwhaVttHcSPk=')",
              backgroudRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: 'center',
              backgroundBlendMode: "darken",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "5rem", color: "#94d537" }}
            >
              schedule
            </span>
            <h5>
              <strong> Pengiriman yang cepat</strong>
            </h5>
            <p>
              Pengiriman yang cepat menjadi priorioritas kami, jangan khawatir produkmu datang terlambat.
            </p>
          </div>
          <div
            className="col d-flex flex-column justify-content-sm-evenly align-items-center text-center"
            style={{
              height: "25rem", background:
                "rgba(0, 0, 0, 0.3) url('https://media.istockphoto.com/photos/cheerful-farmer-in-alfalfa-field-picture-id1409900493?k=20&m=1409900493&s=612x612&w=0&h=tF4jAWkGgUafELRsusTznUhZ7du6CzLTq2IXXr6NKQI=')",
              backgroudRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: 'center',
              backgroundBlendMode: "darken",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "5rem", color: "#94d537" }}
            >
              priority
            </span>
            <h5>
              <strong>Pelayanan memuaskan</strong>
            </h5>
            <p>
              Konsumen adalah raja, kami selalu berkomitmen untuk selalu meningkatkan kepuasan dan layanan pelanggan.
            </p>
          </div>
        </div>
        {/* Section Lelang */}
        <div className="row">
          <div className="col">
            <h3 style={{ fontFamily: 'Lato', fontWeight: 700, color: '#696969' }}>Produk Lelang</h3>
          </div>
        </div>
        {
          auctions.length ?
            <div className="custom-row-1 mb-5" style={{ paddingEight: 30 }}>
              <CardProduct products={auctions} auction="true" />
            </div>
            :
            <div
              className="mb-5"
              style={{
                border: '1px solid #ccc',
                fontFamily: 'Lato',
                fontSize: 18,
                padding: 140,
                textAlign: 'center',
                color: '#696969'
              }}>Tidak ada lelang yang sedang berlangsung...</div>
        }
        <div className="row">
          <div className="col">
            <h3 style={{ fontFamily: 'Lato', fontWeight: 700, color: '#696969' }}>Produk Terbaru</h3>
          </div>
          <div
            className="col d-flex justify-content-end"
            style={{ color: "rgb(3,172,14)" }}
          >
            <Link
              style={{ color: "rgb(3,172,14)", textDecoration: "none" }}
              to="/all-products"
            >
              Selengkapnya
            </Link>
            <span className="material-symbols-outlined">
              keyboard_double_arrow_right
            </span>
          </div>
        </div>
        <div className="custom-row-1">
          <CardProduct products={productsLatest} />
        </div>
      </div>
    </>
  );
}
