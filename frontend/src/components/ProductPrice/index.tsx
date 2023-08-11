import "./styles.css";

import * as formatters from "../../utils/formatters";

type Props = {
  price: number;
};

export default function ProductPrice({ price }: Props) {
  return (
    <div className="d-flex">
      <span className="currency-symbol">R$</span>
      <h3 className="price text-primary">{formatters.formatPrice(price)}</h3>
    </div>
  );
}
