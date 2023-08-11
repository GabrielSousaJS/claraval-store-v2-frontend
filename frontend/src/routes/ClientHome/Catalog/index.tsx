import "./styles.css";

import { ProductCard } from "../../../components/ProductCard";

export default function Catalog() {
  const product = {
    id: 1,
    name: "iPhone 13 Pro vamos aumentar o seu nome",
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

  const product1 = {
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
    <main className="container pt-4">
      <h1 className="catalog-title">Catálogo de produtos</h1>
      <div className="row pt-4 pb-4">
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product} />
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product} />
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product1} />
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product1} />
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product} />
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product} />
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product} />
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product} />
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product} />
        </div>
      </div>
    </main>
  );
}
