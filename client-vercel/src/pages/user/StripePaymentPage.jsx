import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PaymentForm } from "../../components";
import {
  makePaymentAsync,
  selectClientSecret,
  selectCurrentOrder,
} from "../../redux";
import "../../styles/Stripe.css";

function StripePaymentPage() {
  const stripePromise = loadStripe(
    "pk_test_51OzsYKSEvg4ni96G0o8oXWwkoOKQ4IgvrNnPF86rxihl5866nDtsS6LzY8i6HEpgvukiPOgofvzO3qUj1yW1E1Wy00BsBbS4Jo"
  );

  const clientSecret = useSelector(selectClientSecret);
  const currentOrder = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentOrder) {
      dispatch(makePaymentAsync(currentOrder));
    }
  }, [currentOrder, dispatch]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret && !currentOrder) return <Navigate to="/" replace />;

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
}

export default StripePaymentPage;
