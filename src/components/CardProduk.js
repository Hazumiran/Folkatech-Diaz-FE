import React from 'react'
import Ratting from '../assets/rate.png'
export default function CardProduk({ product, setDetail, setOpenDetail }) {

    const handleClick = () => {
        console.log(product);
        setDetail(product);
        setOpenDetail(true);
    };

    return (
        <div className='card-product' onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img src={product.images[0]?.image_url} alt="" width="100%" height="300px" />
            <div className="title">
                <p>{product.name}
                    <p>{product.product_type.name}</p>
                </p>
            </div>
            <div className="rate">
                <img src={Ratting} alt="" />
                <p>Rp {product.price}</p>
            </div>
        </div>

    )
}
