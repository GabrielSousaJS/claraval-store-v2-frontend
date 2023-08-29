import "./styles.css";

import { ContextCartCount } from "../../utils/context-cart";
import { useContext } from "react";
import cartIcon from "../../assets/icons/cartIcon.svg";

export default function CartIcon() {
  const { contextCartCount } = useContext(ContextCartCount);

  return (
    <>
      <img src={cartIcon} alt="Carrinho de compras" />
      {contextCartCount > 0 && (
        <div className="cart-count text-dark bg-secondary">
          {contextCartCount}
        </div>
      )}
    </>
  );
}
