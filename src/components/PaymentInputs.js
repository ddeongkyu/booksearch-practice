import React, { useState } from "react";
import { useCreditCardValidator, images } from "react-creditcard-validator";
import Cards from "react-credit-cards";
import { setCreditCards } from "../slices/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-credit-cards/lib/styles.scss";
export default function PaymentInputs() {
  const dispatch = useDispatch();
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    meta: { erroredInputs },
  } = useCreditCardValidator();
  const [card, setCard] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const [errorConfig, setErrorConfig] = useState({
    cardNumber: "error",
    expiry: "error",
    name: "error",
    cvc: "error",
  });
  const { creditCards } = useSelector((state) => {
    return state.book;
  });
  const numberCheck = /^[0-9]+$/;
  const expiryCheck = /[0-1]{1}[0-9]/;
  const textCheck = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  const handleInputFocus = (e) => {
    setCard({ ...card, focus: e.target.name });
  };
  const handleCardNumberInputChange = (e) => {
    const { value } = e.target;
    if (!value) {
      setErrorConfig({ ...errorConfig, cardNumber: "error" });
    } else {
      if (!numberCheck.test(value)) {
        setErrorConfig({ ...errorConfig, cardNumber: "error" });
      } else {
        setErrorConfig({ ...errorConfig, cardNumber: "" });
        setCard({ ...card, number: value });
      }
    }
  };
  const handleCvcInputChange = (e) => {
    const { value } = e.target;
    if (!value) {
      setErrorConfig({ ...errorConfig, cvc: "error" });
    } else {
      if (!numberCheck.test(value)) {
        setErrorConfig({ ...errorConfig, cvc: "error" });
      } else {
        setErrorConfig({ ...errorConfig, cvc: "" });
        setCard({ ...card, cvc: value });
      }
    }
  };
  const handleExpiryInputChange = (e) => {
    const { value } = e.target;
    if (!value) {
      setErrorConfig({ ...errorConfig, expiry: "error" });
    } else {
      if (!expiryCheck.test(value)) {
        setErrorConfig({ ...errorConfig, expiry: "error" });
      } else {
        setErrorConfig({ ...errorConfig, expiry: "" });
        setCard({ ...card, expiry: value });
      }
    }
  };
  const handleNameInputChange = (e) => {
    const { value } = e.target;
    if (!value) {
      setErrorConfig({ ...errorConfig, name: "error" });
    } else {
      if (textCheck.test(value)) {
        setErrorConfig({ ...errorConfig, name: "error" });
      } else {
        setErrorConfig({ ...errorConfig, name: "" });
        setCard({ ...card, name: value });
      }
    }
  };
  const onCardSubmit = () => {
    const { cvc, cardNumber, name, expiry } = errorConfig;
    if (!cvc && !cardNumber && !name && !expiry) {
      const cards = creditCards.concat(card);
      dispatch(setCreditCards(cards));
      setCard({
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
      });
      setErrorConfig({
        cardNumber: "error",
        expiry: "error",
        name: "error",
        cvc: "error",
      });
    } else {
      alert("카드 유효성 오류");
    }
  };
  return (
    <div className="paymentBox flex-center">
      <Cards
        cvc={card.cvc}
        expiry={card.expiry}
        focused={card.focus}
        name={card.name}
        number={card.number}
      />
      <div className="ddd">
        <input
          {...getCardNumberProps()}
          type="number"
          name="number"
          placeholder="Card Number"
          onChange={handleCardNumberInputChange}
          onFocus={handleInputFocus}
          maxLength="16"
        />
        <small>{erroredInputs.cardNumber && erroredInputs.cardNumber}</small>

        <input
          {...getExpiryDateProps()}
          type="number"
          name="expiry"
          placeholder="Valid thru"
          onChange={handleExpiryInputChange}
          onFocus={handleInputFocus}
          maxLength="4"
        />
        <small>{erroredInputs.expiryDate && erroredInputs.expiryDate}</small>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleNameInputChange}
          onFocus={handleInputFocus}
        />
        <small>{erroredInputs.cvc && erroredInputs.cvc}</small>
        <input
          {...getCVCProps()}
          type="number"
          name="cvc"
          placeholder="cvc"
          onChange={handleCvcInputChange}
          onFocus={handleInputFocus}
          maxLength="3"
        />
        <svg
          className="cursorPointer"
          {...getCardImageProps({ images })}
          onClick={onCardSubmit}
        />
      </div>
    </div>
  );
}
