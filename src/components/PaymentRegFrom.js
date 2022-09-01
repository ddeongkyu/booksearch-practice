import React, { useState, useEffect } from "react";
import { useCreditCardValidator, images } from "react-creditcard-validator";
import Cards from "react-credit-cards";
import { setCreditCards } from "../slices/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-credit-cards/lib/styles.scss";
import { error, fulfilled } from "../constants";
export default function PaymentRegFrom({ onClose, setCardOpen }) {
  const dispatch = useDispatch();
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    meta: { erroredInputs },
  } = useCreditCardValidator();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [card, setCard] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const [errorConfig, setErrorConfig] = useState({
    cardNumber: "",
    expiry: "",
    name: "",
    cvc: "",
  });
  const [cardNumberInput, setCardNumberInput] = useState("");
  const [expiryinput, setExpiryinput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [cvcInput, setCvcInput] = useState("");
  const { creditCards } = useSelector((state) => {
    return state.book;
  });
  const numberCheck = /^[0-9]{15,16}$/;
  const cvcCheck = /[0-9]{3}/;
  const expiryCheck = /[0-1]{1}[0-9]/;
  const textCheck = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  const handleInputFocus = (e) => {
    setCard({ ...card, focus: e.target.name });
  };
  const handleCardNumberInputChange = (e) => {
    const { value } = e.target;
    setCardNumberInput(value);
    setCard({ ...card, number: value });
  };
  const handleCvcInputChange = (e) => {
    const { value } = e.target;
    setCard({ ...card, cvc: value });
    setCvcInput(value);
  };
  const handleExpiryInputChange = (e) => {
    const { value } = e.target;
    setExpiryinput(value);
    setCard({ ...card, expiry: value });
  };
  const handleNameInputChange = (e) => {
    const { value } = e.target;
    setCard({ ...card, name: value });
    setNameInput(value);
  };
  const onCardSubmit = () => {
    const { cvc, cardNumber, name, expiry } = errorConfig;
    if (!expiryCheck.test(expiryinput)) {
      setErrorConfig((prev) => {
        return { ...prev, expiry: error };
      });
    } else {
      setErrorConfig((prev) => {
        return { ...prev, expiry: fulfilled };
      });
    }
    if (!nameInput || textCheck.test(nameInput)) {
      setErrorConfig((prev) => {
        return { ...prev, name: error };
      });
    } else {
      setErrorConfig((prev) => {
        return { ...prev, name: fulfilled };
      });
    }
    if (!numberCheck.test(cardNumberInput)) {
      setErrorConfig((prev) => {
        return { ...prev, cardNumber: error };
      });
    } else {
      setErrorConfig((prev) => {
        return { ...prev, cardNumber: fulfilled };
      });
    }
    if (!cvcCheck.test(cvcInput)) {
      setErrorConfig((prev) => {
        return { ...prev, cvc: error };
      });
    } else {
      setErrorConfig((prev) => {
        return { ...prev, cvc: fulfilled };
      });
    }
    if (
      cvc === fulfilled &&
      cardNumber === fulfilled &&
      name === fulfilled &&
      expiry === fulfilled
    ) {
      console.log("success!");
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
        cardNumber: "",
        expiry: "",
        name: "",
        cvc: "",
      });
      setCardNumberInput("");
      setExpiryinput("");
      setNameInput("");
      setCvcInput("");
      alert("카드가 등록되었습니다!");
      setCardOpen(false);
    }
  };
  console.log(errorConfig);
  console.log(card, "card");
  return (
    <div className="paymentBox flex-center" onClick={onClose}>
      <div className="paymentInnerBox" onClick={(e) => e.stopPropagation()}>
        <div className="paymentCards flex-center">
          <Cards
            cvc={card.cvc}
            expiry={card.expiry}
            focused={card.focus}
            name={card.name}
            number={card.number}
          />
        </div>
        <div className="ddd">
          <div className="positionR">
            <input
              {...getCardNumberProps()}
              type="text"
              name="number"
              value={cardNumberInput}
              placeholder="카드 번호('-' 없이 숫자만 입력해 주세요.)"
              onChange={handleCardNumberInputChange}
              onFocus={handleInputFocus}
              pattern="\d*"
              maxLength="16"
              className={`paymentInput${errorConfig.cardNumber}`}
            />
            <span className="focus-border"></span>
          </div>
          {errorConfig.cardNumber === error && (
            <span className="paymentErrorMsg">카드번호를 확인해주세요!</span>
          )}
          <div className="positionR">
            <input
              {...getExpiryDateProps()}
              type="text"
              name="expiry"
              value={expiryinput}
              placeholder="유효기간"
              onChange={handleExpiryInputChange}
              onFocus={handleInputFocus}
              pattern="\d*"
              maxLength="4"
              className={`paymentInput${errorConfig.expiry}`}
            />
            <span className="focus-border"></span>
          </div>
          {errorConfig.expiry === error && (
            <span className="paymentErrorMsg">유효기간을 확인해주세요!</span>
          )}
          <div className="positionR">
            <input
              type="text"
              name="name"
              value={nameInput}
              placeholder="성함"
              onChange={handleNameInputChange}
              onFocus={handleInputFocus}
              className={`paymentInput${errorConfig.name}`}
            />
            <span className="focus-border"></span>
          </div>
          {errorConfig.name === error && (
            <span className="paymentErrorMsg">이름을 확인해주세요!</span>
          )}
          <div className="positionR">
            <input
              {...getCVCProps()}
              type="text"
              name="cvc"
              value={cvcInput}
              placeholder="CVC 번호"
              onChange={handleCvcInputChange}
              onFocus={handleInputFocus}
              maxLength="3"
              pattern="\d*"
              className={`paymentInput${errorConfig.cvc}`}
            />
            <span className="focus-border"></span>
          </div>
          {errorConfig.cvc === error && (
            <span className="paymentErrorMsg">CVC번호를 확인해주세요!</span>
          )}
          <div className="flex-center">
            <button className="paymentAddCardBtn" onClick={onCardSubmit}>
              Add Card
            </button>
            {/* <svg
              className="cursorPointer"
              {...getCardImageProps({ images })}
              onClick={onCardSubmit}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
