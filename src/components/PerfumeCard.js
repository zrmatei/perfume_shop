function PerfumeCard({brand, name, price, image}) {
    return(
        <div className="perfumeCard">
            <img src={image}/>
            <p>{brand}</p>
            <h4>{name}</h4>
            <p>{price} lei</p>
            <button>Add to cart</button>
        </div>
    );
}

export default PerfumeCard;