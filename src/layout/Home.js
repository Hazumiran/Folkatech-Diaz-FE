import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaAngleUp, FaCaretDown, FaAngleRight, FaAngleLeft, FaPlus, FaMinus } from "react-icons/fa";
import { getData } from '../api/Api';
import CardProduk from '../components/CardProduk';
import Ratting from '../assets/rate.png';
import Heart from '../assets/heart.png';
import ReactPaginate from 'react-paginate';
export default function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [detail, setDetail] = useState({});
    const [openDetail, setOpenDetail] = useState(false);
    const [countCart, setCountCart] = useState(0);
    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalData, setTotalData] = useState(0);

    const pageCount = Math.ceil(totalData / limit);
    const handlePageChange = (selectedPage) => {
        const startIndex = selectedPage * limit;
        const endIndex = startIndex + limit;
        setPage(selectedPage.selected + 1);
        actionSearch()
        // console.log("cek index", currentData);
    };

    const handleCountClick = (e, value) => {
        e.stopPropagation();
        handleCount(value);
    }

    const handleCount = (value) => {
        if (value == 'plus') {
            setCountCart(countCart + 1);
        } else {
            if (countCart > 0) {
                setCountCart(countCart - 1);
            }
        }
    }

    const actionSearch = () => {
        getData(rangeMin, rangeMax, keyword, page, limit).then((response) => {
            setProducts(response.data.data.list);
        });
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        } else {
            setOpenDetail(false);
            // setTimeout(() => {
            getData(rangeMin, rangeMax, keyword, page, limit).then((response) => {
                setTotalData(response.data.data.total);
                setProducts(response.data.data.list);
            });
            // }, 2000)
        }
    }, [rangeMin, rangeMax, keyword, page, limit]);

    const handleLimitChange = (event) => {
        setLimit(Number(event.target.value));
        setPage(1);
    };

    function controlFromSlider(fromSlider, toSlider) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, '#C6C6C6', '#eb3f36', toSlider);
        if (from > to) {
            fromSlider.value = to;
        } else {
            setRangeMin(from * 1000);
        }
    }

    function controlToSlider(fromSlider, toSlider) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, '#C6C6C6', '#eb3f36', toSlider);
        if (from <= to) {
            setRangeMax(to * 10000);
        } else {
            toSlider.value = from;
        }
    }

    function getParsed(currentFrom, currentTo) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
        const rangeDistance = to.max - to.min;
        const fromPosition = from.value - to.min;
        const toPosition = to.value - to.min;
        controlSlider.style.background = `linear-gradient(
          to right,
          ${sliderColor} 0%,
          ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
          ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
          ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
          ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
          ${sliderColor} 100%)`;
    }

    function setToggleAccessible(currentTarget) {
        const toSlider = document.querySelector('#toSlider');
        if (Number(currentTarget.value) <= 0) {
            toSlider.style.zIndex = 2;
        } else {
            toSlider.style.zIndex = 0;
        }
    }

    useEffect(() => {
        const fromSlider = document.querySelector('#fromSlider');
        const toSlider = document.querySelector('#toSlider');

        fillSlider(fromSlider, toSlider, '#C6C6C6', '#eb3f36', toSlider);
        setToggleAccessible(toSlider);

        fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider);
        toSlider.oninput = () => controlToSlider(fromSlider, toSlider);
    }, []);

    return (
        <div>
            <Navbar keyword={keyword} setKeyword={setKeyword} actionSearch={actionSearch} />
            <div className='home'>
                <div className='home-header'>
                    <h3>BELANJA</h3>
                    <FaCaretDown style={{ color: 'white', marginTop: '8px' }} size={15} />
                </div>
            </div>

            <div className="path">
                <ul class="breadcrumb">
                    {!openDetail ?
                        <>
                            <li><a href="/home">Home</a></li>
                            <li><a href="#">Produk</a></li>
                            <li><a style={{ color: '#EB3F36' }}>Roasted Bean</a></li>
                        </>
                        : <>
                            <li><a href="/home">Home</a></li>
                            <li><a style={{ color: '#EB3F36' }}>{detail && detail.name}</a></li>
                        </>}
                </ul>
            </div>
            {openDetail ? <>
                <div className="detail">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className='card-image'>
                            <img src={detail && detail.images[0]?.image_url} alt="" width={"515px"} height={"515px"} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="circle-arrow-left" >
                                <FaAngleLeft size={30} />
                            </div>
                            <div className="card-image-mini">
                                <img src={detail && detail.images[0]?.image_url} alt="" width={"145px"} height={"145px"} />
                            </div>
                            <div className="card-image-mini">
                                <img src={detail && detail.images[1]?.image_url ? detail.images[1]?.image_url : detail.images[0]?.image_url} alt="" width={"145px"} height={"145px"} />
                            </div>
                            <div className="card-image-mini">
                                <img src={detail && detail.images[2]?.image_url ? detail.images[2]?.image_url : detail.images[0]?.image_url} alt="" width={"145px"} height={"145px"} />
                            </div>
                            <div className="circle-arrow-right">
                                <FaAngleRight size={30} />
                            </div>
                        </div>
                    </div>
                    <div className='detail-content'>
                        <p>{detail && detail.name}
                            <p>{detail && detail.product_type.name}</p>
                        </p>
                        <div className="rate-detail">
                            <img src={Ratting} alt="" width={"100px"} height={"20px"} />
                            <p>Rp {detail.price}</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div className="minuscount" onClick={(e) => handleCountClick(e, 'minus')}>
                                <FaMinus />
                            </div>
                            <div className="count">
                                <p>{countCart}</p>
                            </div>
                            <div className="addcount" onClick={(e) => handleCountClick(e, 'plus')}>
                                <FaPlus />
                            </div>
                            <div className="addtocart">
                                TAMBAH KE KERANJANG
                            </div>
                            <div style={{ backgroundColor: '#F5F5F5', padding: '10px', marginLeft: '10px', lineHeight: '15px', cursor: 'pointer' }}>
                                <img src={Heart} alt="" />
                            </div>
                        </div>
                        <div className="description">
                            <p>{detail && detail.description}</p>
                        </div>
                    </div>
                </div>
                <div style={{ padding: '0px 160px 160px 160px' }}>
                    <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                        <div style={{ borderBottomStyle: 'solid', borderBottomWidth: '3px', borderColor: '#EB3F36' }}>
                            <p style={{ color: '#EB3F36', fontSize: '22px', fontWeight: '700' }}>DESKRIPSI</p>
                        </div>
                        <p style={{ fontSize: '22px', fontWeight: '700', color: '#BEBEBE', paddingLeft: '10px' }}>INFORMASI</p>
                    </div>
                    <p style={{ color: '#696969', fontWeight: '400', fontSize: '18px' }}>
                        {detail && detail.description}
                        {detail && detail.short_description}
                    </p>
                </div>
                <div style={{ display: 'flex', padding: '10px 160px 20px 160px', justifyContent: 'center' }}>
                    <div style={{ borderBottomStyle: 'solid', borderBottomWidth: '3px', borderColor: '#EB3F36' }}>
                        <p style={{ color: '#696969', fontSize: '22px', fontWeight: '700' }}>REKOMENDASI UNTUK ANDA</p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {products.length < 3 ?
                        <CardProduk product={products && products[0]} setDetail={setDetail} setOpenDetail={setOpenDetail} />
                        :
                        <>
                            <CardProduk product={products && products[0]} setDetail={setDetail} setOpenDetail={setOpenDetail} />
                            <CardProduk product={products && products[1]} setDetail={setDetail} setOpenDetail={setOpenDetail} />
                            <CardProduk product={products && products[2]} setDetail={setDetail} setOpenDetail={setOpenDetail} />
                        </>
                    }

                </div>
            </> :
                <div className="row">
                    <div className="col-sm-3" style={{ paddingLeft: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ fontWeight: '700', fontSize: '18px', color: '#696969' }}>URUTKAN BERDASARKAN</p>
                            <div >
                                <FaAngleUp />
                            </div>
                        </div>
                        <p style={{ fontWeight: '700', fontSize: '18px', color: '#696969' }}>Harga</p>
                        <div className="range_container">
                            <div className="sliders_control">
                                <input id="fromSlider" type="range" value="10" min="0" max="100" />
                                <input id="toSlider" type="range" value="40" min="0" max="100" />
                            </div>
                        </div>
                        <div className='custom-range'>
                            <p style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 10px 0px 10px' }}>
                                Rp <p style={{ backgroundColor: '#F2F2F2', padding: '1px' }}>{rangeMin}</p>
                            </p>
                            <p>-</p>
                            <p style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 10px 0px 10px' }}>
                                Rp <p style={{ backgroundColor: '#F2F2F2', padding: '1px' }}>{rangeMax}</p>
                            </p>
                        </div>
                        {/* Origin */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F5F5F5BF' }}>
                            <p style={{ marginTop: '10px', fontWeight: '700', fontSize: '18px', color: '#696969' }}>Origin</p>
                            <div style={{ marginTop: '10px' }}>
                                <FaAngleUp />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Aceh
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(9)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Semarang
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(2)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Bandung
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(7)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Jawa
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(5)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Amerika Selatan
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(6)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Lain - lain
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(8)</p>
                        </div>
                        {/* Species */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F5F5F5BF' }}>
                            <p style={{ marginTop: '10px', fontWeight: '700', fontSize: '18px', color: '#696969' }}>Species</p>
                            <div style={{ marginTop: '10px' }}>
                                <FaAngleUp />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Arabika
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(128)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Robusta
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(23)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Blend
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(9)</p>
                        </div>
                        {/* Roast Level */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F5F5F5BF' }}>
                            <p style={{ marginTop: '10px', fontWeight: '700', fontSize: '18px', color: '#696969' }}>Roast Level</p>
                            <div style={{ marginTop: '10px' }}>
                                <FaAngleUp />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Light Roast
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(8)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Medium Roast
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(2)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Dark Roast
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(7)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Light to Medium Roast
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(5)</p>
                        </div>
                        {/* Tasted */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F5F5F5BF' }}>
                            <p style={{ marginTop: '10px', fontWeight: '700', fontSize: '18px', color: '#696969' }}>Tasted</p>
                            <div style={{ marginTop: '10px' }}>
                                <FaAngleUp />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Sweet
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(18)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Floral
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(21)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Fruity
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(7)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Nutty
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(5)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Cocoa
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(21)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Spices
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(18)</p>
                        </div>
                        {/* Processing */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F5F5F5BF' }}>
                            <p style={{ marginTop: '10px', fontWeight: '700', fontSize: '18px', color: '#696969' }}>Processing</p>
                            <div style={{ marginTop: '10px' }}>
                                <FaAngleUp />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Honey White
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(8)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Natural
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(2)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Honey Gold
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(7)</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="vehicle1"
                                    name="vehicle1"
                                    value="Aceh"
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor="vehicle1">
                                    Honey Yellow
                                </label>
                            </form>
                            <p style={{ marginLeft: 'auto' }}>(5)</p>
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                    <div className="col-sm-9" >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex' }}>
                                <p style={{ fontWeight: '700', fontSize: '16px', color: '#696969' }}>Menampilkan</p>
                                <select name="cars" id="cars" className="select-show" value={limit} onChange={handleLimitChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <p style={{ fontWeight: '700', fontSize: '16px', color: '#696969' }}>dari</p>
                                <p style={{ fontWeight: '700', fontSize: '16px', color: '#696969' }}> {totalData}</p>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ fontWeight: '700', fontSize: '16px', color: '#696969' }}>Urutkan</p>
                                <select name="cars" id="cars" className='select-product'>
                                    <option value="1">Nama Produk 1</option>
                                    <option value="2">Nama Produk 2</option>
                                    <option value="3">Nama Produk 3</option>
                                    <option value="4">Nama Produk 4</option>
                                    <option value="5">Nama Produk 5</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {products.map(product => (
                                <CardProduk key={product.id} product={product} setDetail={setDetail} setOpenDetail={setOpenDetail} />
                            ))}
                        </div>
                        <div style={{ justifyContent: 'center', display: 'flex', marginTop: '20px' }}>
                            <ReactPaginate
                                pageCount={pageCount}
                                pageRangeDisplayed={limit}
                                onPageChange={handlePageChange}
                                containerClassName="pagination"
                                activeClassName="active"
                                disabledClassName="disabled"
                                nextLabel="next >"
                                breakLabel="..."
                                previousLabel="< previous"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </div>}
        </div>
    )
}
