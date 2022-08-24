import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
function Main() {
  const navigate = useNavigate();
  const [scrollPx, setScrollPx] = useState(0);
  const onGoToInfinity = () => {
    navigate(routes.infinity);
  };
  const onGoToPagination = () => {
    navigate(routes.pagination);
  };
  const onGoToShoppingCart = () => {
    navigate(routes.shoppingCart);
  };
  const imageScrollHandeler = () => {
    setScrollPx(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", imageScrollHandeler);
    return () => {
      window.removeEventListener("scroll", imageScrollHandeler);
    };
  });
  console.log("current scroll 위치 : ", scrollPx);
  setTimeout(() => {
    console.log("zzz");
  }, 600);
  return (
    <>
      <div
        id="start"
        className="positionR flex-center"
        style={{ opacity: 340 / scrollPx }}
      >
        <div className="flex-vertical-center startNav">
          <div>DDEONGKYU</div>
          <div className="flex-vertical-center startThree">
            <div className="startTreeText">Work</div>
            <div className="startTreeText">About</div>
            <div className="startTreeText">Contact</div>
          </div>
        </div>
        <div
          className="positionA startBigTextA"
          style={{ opacity: 40 / scrollPx }}
        >
          DDEONG-KYU
        </div>
        <div
          className="positionA startBigTextB"
          style={{ opacity: 70 / scrollPx }}
        >
          BOOK SEARCH!
        </div>
        <div
          className="positionA startBigTextC"
          style={{ opacity: 80 / scrollPx }}
        >
          (With Kakao Api)
        </div>
      </div>
      <div id="infinite" className="positionR">
        <img
          className="infiniteImg positionA "
          alt="infinite"
          src="쏘쓰/KakaoTalk_Photo_2022-08-24-15-35-46.png"
          style={{
            opacity: scrollPx / 150,
            transform: `rotateY(${scrollPx / 100}deg)`,
          }}
        />
        <img
          className="infiniteImg1 positionA "
          alt="infinite"
          src="쏘쓰/KakaoTalk_Photo_2022-08-24-15-35-58.png"
          style={{
            opacity: scrollPx / 150,
            transform: `rotateY(${scrollPx / 100}deg)`,
          }}
        />
        <div className="positionA infiniteTextBox">
          <div className="infiniteText">
            <span className="hoverRainbow">Infinity Scroll</span>로 구현한
          </div>
          <div className="infiniteText">책 검색을 만나보세요 ! </div>
        </div>
        <div className="flex-center infiniteBtnBox positionA">
          <button
            className="cursorPointer infiniteBtnStyle"
            onClick={onGoToInfinity}
          >
            To Go
          </button>
        </div>
      </div>
      <hr style={{ width: "100vw", height: "2px", background: "red" }} />
      <div id="pagination" className="positionR">
        <img
          alt="pagination"
          src="쏘쓰/KakaoTalk_Photo_2022-08-24-15-36-12.png"
          className="paginationImg positionA"
        />
      </div>
    </>
    // <div className="flex-center mainTotalBox">
    //   <button className="cursorPointer mainBtnStyle" onClick={onGoToInfinity}>
    //     인피니티 스크롤
    //   </button>
    //   <button className="cursorPointer mainBtnStyle" onClick={onGoToPagination}>
    //     페이지네이션
    //   </button>
    //   <button
    //     className="cursorPointer mainBtnStyle"
    //     onClick={onGoToShoppingCart}
    //   >
    //     장바구니
    //   </button>
    // </div>
  );
}

export default Main;
