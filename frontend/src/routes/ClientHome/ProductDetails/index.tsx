import "./styles.css";

import subIcon from "../../../assets/icons/subIcon.svg";
import addIcon from "../../../assets/icons/addIcon.svg";
import ComeBack from "../../../components/ComeBack";
import ProductPrice from "../../../components/ProductPrice";
import { useNavigate, useParams } from "react-router-dom";
import { ProductDTO } from "../../../models/product";
import { useEffect, useState, useContext } from "react";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { UserDTO } from "../../../models/user";
import { OrderDTO } from "../../../models/order";
import { OrderItemDTO } from "../../../models/order-item";
import { ContextCartCount } from "../../../utils/context-cart";
import * as authService from "../../../services/auth-service";
import * as productService from "../../../services/product-service";
import * as factory from "../../../utils/factory";
import * as orderService from "../../../services/order-service";
import * as userService from "../../../services/user-service";
import * as orderUtils from "../../../utils/orders";

export default function ProductDetails() {
  const { contextCartCount, setContextCartCount } =
    useContext(ContextCartCount);

  const params = useParams();

  const [product, setProduct] = useState<ProductDTO>();

  const [user, setUser] = useState<UserDTO>();

  const [order, setOrder] = useState<OrderDTO>();

  const [quantity, setQuantity] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    productService
      .findByIdRequest(Number(params.productId))
      .then((response) => {
        setProduct(response.data);
      });
  }, [params.productId]);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      userService.getProfileRequest().then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      orderService.getOrdersByClientRequest().then((response) => {
        setOrder(orderUtils.hasOpenOrder(response.data));
      });
    }
  }, []);

  function handleSubtract() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleAdd() {
    if (quantity < product?.quantity!) {
      setQuantity(quantity + 1);
    }
  }

  function handleAddCartClick() {
    if (user) {
      const orderItem = factory.createOrderItemDTO(product!, quantity);

      if (order) {
        addItemToOrder(orderItem);
      } else {
        createOrderAndAddItem(orderItem);
      }
      navigate("/cart");
    } else {
      navigate("/login");
    }
  }

  function addItemToOrder(orderItem: OrderItemDTO) {
    if (order?.id) {
      orderService.addItemToOrderRequest(order.id, orderItem).then(() => {
        setContextCartCount(contextCartCount + 1);
      });
    }
  }

  function createOrderAndAddItem(orderItem: OrderItemDTO) {
    const order = factory.createOrderDTO(user!);
    order.items.push(orderItem);
    orderService.insertOrderRequest(order).then(() => {
      setContextCartCount(contextCartCount + 1);
    });
  }

  return (
    <main className="container p-4">
      <div className="ms-2">
        <ComeBack clearSearch={false} />
      </div>

      <div className="row justify-content-lg-between gap-3 pt-4 text-dark">
        <div className="d-lg-flex base-card col-lg-8">
          <div className="col-lg-6 img-details-container text-center">
            <img src={product?.imgUrl} alt={product?.name} />
          </div>

          <div className="col-lg-6 pt-4 pb-4">
            <h3 className="mb-2">{product?.name}</h3>
            <p className="fw-bold">{product?.description}</p>
          </div>
        </div>

        <div className="col-lg-3 base-card d-flex flex-column justify-content-between p-3">
          <div className="details-margin-bottom">
            <ProductPrice price={product?.price ? product?.price : 0} />
          </div>

          {product?.quantity === 0 ? (
            <h6 className="text-danger text-center">Produto não disponível</h6>
          ) : (
            <>
              <h4 className="details-margin-bottom">
                Estoque: {product?.quantity}
              </h4>
              <div className="quantity-container">
                <h6 className="mb-2">Quantidade</h6>

                <button onClick={handleSubtract}>
                  <img src={subIcon} alt="Subtrair" />
                </button>
                <span className="text-center details-margin-bottom">
                  {quantity}
                </span>
                <button onClick={handleAdd}>
                  <img src={addIcon} alt="Adicionar" />
                </button>
              </div>
              <div onClick={handleAddCartClick}>
                <ButtonPrimary text="Adicionar ao carrinho" />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
