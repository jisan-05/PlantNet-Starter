import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./CheckoutForm.css";
import Button from "../Shared/Button/Button";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ closeModal, purchaseInfo, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const [clientSecret,setClientSecret] = useState('')

    useEffect(()=>{
      getPaymentIntent()
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[purchaseInfo])


    const getPaymentIntent = async ()=>{
        try{
          const {data} =await axiosSecure.post('/create-payment-intent',{
            quantity:purchaseInfo.quantity,
            plantId:purchaseInfo.plantId,
          })
          setClientSecret(data.clientSecret)
          console.log(clientSecret)
        }catch(err){
          console.log(err)
        }
      }

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("[error]", error);
        } else {
            console.log("[PaymentMethod]", paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <div className="flex gap-3">
                <Button
                    type="submit"
                    label={`Pay${purchaseInfo?.price} $`}
                    disabled={!stripe}
                ></Button>
                <Button outline={true} onClick={closeModal} label="Cancel" />
            </div>
        </form>
    );
};

CheckoutForm.propTypes = {
    purchaseInfo: PropTypes.object,
    closeModal: PropTypes.func.isRequired,
    refetch: PropTypes.func,
};

export default CheckoutForm;
