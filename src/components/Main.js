import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import { GoMarkGithub, GoChevronUp } from "react-icons/go";
import useIntersectionAnimation from "../hooks/useIntersectionAnimation";
function Main() {
  const navigate = useNavigate();
  const [scrollPx, setScrollPx] = useState(0);
  const onGoToInfinity = () => {
    navigate(routes.infinity);
  };
  const onGoToPagination = () => {
    navigate(routes.pagination);
  };
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7,
  };
  const options1 = {
    root: null,
    rootMargin: "0px",
  };
  useIntersectionAnimation("animation", options, "scrollAnimation");
  useIntersectionAnimation("animation1", options1, "scrollAnimation1");
  useIntersectionAnimation("animationAbout", options1, "aboutLeft");
  useIntersectionAnimation("animationAbout", options1, "aboutRight");
  const imageScrollHandeler = () => {
    setScrollPx(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", imageScrollHandeler);
    return () => {
      window.removeEventListener("scroll", imageScrollHandeler);
    };
  });
  const handleScrollToTheTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  const handleScrollToContact = () =>
    window.scrollTo({
      top: isResponsive ? 6112 : 6437,
      behavior: "smooth",
    });
  const handleScrollToTheWork = () =>
    window.scrollTo({
      top: isResponsive ? 886 : 900,
      behavior: "smooth",
    });
  const handleScrollToTheAbout = () =>
    window.scrollTo({
      top: isResponsive ? 4753 : 5123,
      behavior: "smooth",
    });
  const isResponsive = window.visualViewport.width <= 430;
  return (
    <>
      {/* START NAV */}
      <div className="flex-center">
        <div className="flex-center startNav">
          <div
            className="cursorPointer startNavLeft"
            onClick={handleScrollToTheTop}
          >
            SEONGKYU
          </div>
          <div className="flex-vertical-center startThree">
            <div
              className="startTreeText cursorPointer"
              onClick={handleScrollToTheWork}
            >
              Work
            </div>
            <div
              className="startTreeText cursorPointer"
              onClick={handleScrollToTheAbout}
            >
              About
            </div>
            <div
              className="startTreeText cursorPointer"
              onClick={handleScrollToContact}
            >
              Contact
            </div>
          </div>
        </div>
      </div>
      {/* START */}
      <div id="start" className="positionR flex-center">
        <img
          alt="startImg"
          src="쏘쓰/book-main.jpeg"
          className="startMainImg"
        />
        <div
          className="positionA startBigTextA"
          style={{ opacity: isResponsive ? 1 : 40 / scrollPx }}
        >
          HONG's
        </div>
        <div
          className="positionA startBigTextB"
          style={{ opacity: isResponsive ? 1 : 70 / scrollPx }}
        >
          BOOK SEARCH!
        </div>
        <div
          className="positionA startBigTextC"
          style={{ opacity: isResponsive ? 1 : 80 / scrollPx }}
        >
          (With Kakao Api)
        </div>
      </div>
      {/* INFINITY */}
      <div id="infinite" className="positionR">
        <img
          className="infiniteImg scrollAnimation positionA "
          alt="infinite"
          src="쏘쓰/infi1.png"
        />
        <img
          className="infiniteImg1 scrollAnimation positionA "
          alt="infinite"
          src="쏘쓰/infi2.png"
        />
        <div className="positionA infiniteTextBox">
          <div className="infiniteText">
            <span className="hoverRainbow">Infinity Scroll</span>을 이용한
          </div>
          <div className="infiniteText"> 도서 검색을</div>

          <div className="infiniteText">이용해보세요! </div>
        </div>
        <div className="flex-center infiniteBtnBox positionA">
          <button
            className="cursorPointer infiniteBtnStyle"
            onClick={onGoToInfinity}
          >
            INFINITY
          </button>
        </div>
      </div>
      {/* PAGINATION */}
      <div id="pagination" className="positionR">
        <img
          alt="pagination"
          src="쏘쓰/pagi1.png"
          className="paginationImg scrollAnimation1 positionA"
        />
        <img
          alt="pagination"
          src="쏘쓰/pagi2.png"
          className="paginationImg1 scrollAnimation1 positionA"
        />
        <div className="positionA pagiTextBox">
          <div className="pagiText">
            <span className="hoverRainbow">Pagination</span>
          </div>
          <div className="pagiText">방식의 </div>

          <div className="pagiText">책 검색을 만나보세요 ! </div>
        </div>
        <div className="flex-center pagiBtnBox positionA">
          <button
            className="cursorPointer pagiBtnStyle"
            onClick={onGoToPagination}
          >
            PAGINATION
          </button>
        </div>
      </div>
      {/* SHOPPING */}
      <div id="shopping">
        <img
          alt="shopping"
          src="쏘쓰/shop1.png"
          className="shoppingImg1 scrollAnimation positionA"
        />
        <img
          alt="shopping"
          src="쏘쓰/스크린샷 2022-09-02 오후 1.22.46.png"
          className="shoppingImgCard scrollAnimation positionA"
        />
        <img
          alt="shopping"
          src="쏘쓰/shop3.png"
          className="shoppingImg scrollAnimation1 positionA"
        />
        <div className="positionA mainShoppingTextBox">
          <div className="mainShoppingText">
            <span className="hoverRainbow">장바구니</span>에
          </div>
          <div className="mainShoppingText">상품을 이동시키고 </div>
        </div>
        <div className="positionA mainShoppingTextBox2">
          <div className="mainShoppingText">장바구니에서 </div>
          <div className="mainShoppingText">카드를 등록해보세요! </div>
        </div>
        <div className="positionA mainShoppingTextBox1">
          <div className="mainShoppingText1">그리고 </div>

          <div className="mainShoppingText1">
            <span className="hoverRainbow">장바구니</span>에서
          </div>
          <div className="mainShoppingText1">구매를 </div>

          <div className="mainShoppingText1">완료해보세요!</div>
        </div>
      </div>
      {/* ABOUT */}
      <div id="about" className="flex-center">
        <div className="aboutContainer flex-center">
          <div className="aboutHead"> ABOUT ME</div>
          <div className="aboutMain flex-vertical-center">
            <img
              alt="html"
              src="쏘쓰/KakaoTalk_Photo_2022-08-29-18-02-23-removebg-preview.png"
              className="aboutLogo aboutLeft"
            />
            <div className="aboutText aboutRight">
              HTML5에 대하여 이해하고 있습니다.
            </div>
          </div>
          <div className="aboutMain flex-vertical-center">
            <div className="aboutText aboutLeft">
              CSS와 SCSS를 사용 할 수 있습니다.
              <br />
            </div>
            <img
              alt="html"
              src="쏘쓰/css-3-logo-023C1A7171-seeklogo.com.png"
              className="aboutLogo aboutRight"
            />
          </div>
          <div className="aboutMain flex-vertical-center">
            <img
              alt="html"
              src="쏘쓰/JavaScript_logo_2.svg.png"
              className="aboutLogo aboutLeft"
            />
            <div className="aboutText aboutRight">
              JAVASCRIPT의 동작 원리와 ES6 문법을 이해하고 사용할 수 있습니다.
              <br />
              Algorithm 공부를 통하여 자바스크립트를 심도있게 공부하고 있습니다.
            </div>
          </div>
          <div className="aboutMain flex-vertical-center">
            <div className="aboutText aboutLeft">
              JAVASCRIPT의 프레임워크인 REACT를 사용할 수 있습니다.
              <br /> 함수형 컴포넌트를 통한 JSX 사용과 Hooks를 사용할 수
              있습니다.
            </div>
            <img
              alt="html"
              src="쏘쓰/logo512.png"
              className="aboutLogo aboutRight"
            />
          </div>
          <div className="aboutMain flex-vertical-center">
            <img
              alt="html"
              src="쏘쓰/redux_logo.png"
              className="aboutLogo aboutLeft"
            />
            <div className="aboutText aboutRight">
              State Management를 위하여 Redux-toolkit을 사용 가능합니다.
              <br /> slice와 store를 만들어 상태를 관리하고, <br />
              action을 dispatch 할 수 있습니다.
            </div>
          </div>
        </div>
      </div>
      {/* CONTACT */}
      <div id="contact" className="positionR">
        <div
          style={{
            fontSize: isResponsive ? 28 : scrollPx > 6400 ? 65 : scrollPx / 100,
          }}
          className="contactText positionA"
        >
          If you're interested
          <br />
          in working with me
          <br />
          please contact me.
        </div>
        <div className="contactTextEmail positionA">
          tjdrb4230@naver.com
          <br />
          010-2475-9551
        </div>
      </div>
      <div id="github" className="positionR">
        <div className="flex-vertical-center ">
          <GoChevronUp
            className="githubUpIcon positionA cursorPointer"
            onClick={handleScrollToTheTop}
          />
        </div>
        <div className="flex-vertical-center">
          <a className="mainAtag" href="https://github.com/ddeongkyu">
            <GoMarkGithub className="githubIcon positionA cursorPointer" />
          </a>
        </div>
        <div className="positionA flex-vertical-center contactSns">
          <div className="contactSnsText cursorPointer">
            <a
              className="mainAtag"
              href="https://www.instagram.com/kkkkkkoolllll/"
            >
              INSTAGRAM
            </a>
          </div>
          <div className="contactSnsText cursorPointer">
            <a className="mainAtag" href="https://www.facebook.com/ddeongkyu/">
              FACEBOOK
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
