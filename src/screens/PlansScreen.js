//Has Public Key in this page....!!!!

import React, { useState, useEffect } from "react";
import "./PlansScreen.css";
import db from "../firebase";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null); //To show an active subscription

  //For Subscription status
  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  //For Subscription purchase
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  //console.log(products);
  console.log(subscription);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        //Show an error on user end and inspect on error stripe console
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51MM2cGJA1nsHO3cPF1eja3he0MTITCuQa1U7kxYmmNk7K3QLPwmK5fqcbuoneFWf7O9bnzgksGS8XeAcXBT51Df000BndbqyND"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      <br />
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "planScreen__plan--disabled"
            } plansScreen__plan`}
          >
            <div className="lansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
