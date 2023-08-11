import "./styles.css";

import ProductPrice from "../ProductPrice";

export function ProductCard() {
  const product = {
    id: 1,
    name: "iPhone 13 Pro",
    description:
      "O mais recente smartphone topo de gama da Apple com um impressionante ecrã Super Retina XDR, chip A15 Bionic, sistema de câmara Pro, conectividade 5G e iOS 15.",
    price: 6291.3,
    quantity: 17,
    imgUrl:
      "https://images-americanas.b2w.io/produtos/01/00/img/3919423/9/3919423949_1GG.jpg",
    categories: [
      {
        id: 1,
        name: "Eletrônicos",
      },
    ],
  };

  return (
    <div className="base-card product-card">
      <div className="d-flex justify-content-center align-items-center pt-4 pb-4 border-bottom">
        <img className="w-auto" src={product.imgUrl} alt={product.name} />
      </div>

      <div className="card-bottom-container">
        <h5 className="text-dark">{product.name}</h5>
        <ProductPrice price={product.price} />
      </div>
    </div>
  );
}
