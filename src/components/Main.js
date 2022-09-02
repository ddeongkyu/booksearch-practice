import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import { GoMarkGithub, GoChevronUp } from "react-icons/go";
import contact from "../contact.jpeg";
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
  const handleScrollToTheTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  const handleScrollToContact = () =>
    window.scrollTo({
      top: isResponsive ? 5856 : 6437,
      behavior: "smooth",
    });
  const handleScrollToTheWork = () =>
    window.scrollTo({
      top: isResponsive ? 886 : 900,
      behavior: "smooth",
    });
  const handleScrollToTheAbout = () =>
    window.scrollTo({
      top: isResponsive ? 4516 : 5123,
      behavior: "smooth",
    });
  const isResponsive = window.visualViewport.width <= 430;
  console.log("반응형이냐? 대답 : ", isResponsive);
  return (
    <>
      <div className="flex-center">
        <div className="flex-center startNav">
          <div
            className="cursorPointer startNavLeft"
            onClick={handleScrollToTheTop}
          >
            DDEONGKYU
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
      <div id="start" className="positionR flex-center">
        <img
          alt="startImg"
          src={isResponsive ? "쏘쓰/start_small.png" : "쏘쓰/start.jpeg"}
          className="startMainImg"
        />
        <div
          className="positionA startBigTextA"
          style={{ opacity: isResponsive ? 1 : 40 / scrollPx }}
        >
          홍성규의
        </div>
        <div
          className="positionA startBigTextB"
          style={{ opacity: isResponsive ? 1 : 70 / scrollPx }}
        >
          도서 검색!
        </div>
        <div
          className="positionA startBigTextC"
          style={{ opacity: isResponsive ? 1 : 80 / scrollPx }}
        >
          (With Kakao Api)
        </div>
      </div>
      <div id="infinite" className="positionR">
        <img
          className="infiniteImg positionA "
          alt="infinite"
          src="쏘쓰/infi1.png"
          style={{
            opacity: isResponsive
              ? 1
              : scrollPx < 1500
              ? scrollPx / 150
              : scrollPx / 2700,
            transform: `rotateY(${
              isResponsive && scrollPx < 380
                ? (scrollPx / 822) * 100
                : isResponsive && scrollPx > 380
                ? 45
                : scrollPx / 100
            }deg)`,
          }}
        />
        <img
          className="infiniteImg1 positionA "
          alt="infinite"
          src="쏘쓰/infi2.png"
          style={{
            opacity: isResponsive
              ? 1
              : scrollPx < 1500
              ? scrollPx / 150
              : scrollPx / 2700,
            transform: `rotateY(${
              isResponsive && scrollPx < 685
                ? -(scrollPx / 1523) * 100
                : isResponsive && scrollPx > 685
                ? -45
                : scrollPx / 100
            }deg)`,
          }}
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
      <div id="pagination" className="positionR">
        <img
          alt="pagination"
          src="쏘쓰/pagi1.png"
          className="paginationImg positionA"
          style={{
            opacity: isResponsive
              ? scrollPx / 35
              : scrollPx < 2600
              ? scrollPx / 1300
              : scrollPx < 3000
              ? 1400 / scrollPx
              : 0,

            transform: `rotateY(${
              isResponsive ? -(scrollPx / 45) : -(scrollPx / 100)
            }deg)`,
          }}
        />
        <img
          alt="pagination"
          src="쏘쓰/pagi2.png"
          className="paginationImg1 positionA"
          style={{
            opacity: scrollPx / 1300,
            transform: `rotateY(${
              isResponsive ? scrollPx / 45 : -(scrollPx / 100)
            }deg)`,
          }}
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
      <div id="shopping">
        <img
          alt="shopping"
          src="쏘쓰/shop1.png"
          className="shoppingImg1 positionA"
          style={{
            opacity: isResponsive ? scrollPx / 1500 : scrollPx / 3000,
            transform: `rotateY(${
              isResponsive ? -(15 + scrollPx / 150) : scrollPx / 180
            }deg)`,
          }}
        />
        <img
          alt="shopping"
          src="쏘쓰/스크린샷 2022-09-02 오후 1.22.46.png"
          className="shoppingImgCard positionA"
          style={{
            opacity: isResponsive ? 1 : scrollPx / 2800,
            transform: `rotateY(${
              isResponsive ? scrollPx / 70 : scrollPx / 80
            }deg)`,
          }}
        />
        <img
          alt="shopping"
          src="쏘쓰/shop3.png"
          className="shoppingImg positionA"
          style={{
            opacity: scrollPx / 4600,
            transform: `rotateY(${
              isResponsive ? -(scrollPx / 120) : -(scrollPx / 150)
            }deg)`,
          }}
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
        <div className="flex-center mainShoppingBtnBox positionA">
          <button
            className="cursorPointer mainShoppingBtnStyle"
            onClick={onGoToShoppingCart}
          >
            SHOPPING
          </button>
        </div>
      </div>
      <div id="about" className="flex-center">
        <div className="aboutContainer flex-center">
          <div className="aboutHead"> ABOUT ME</div>
          <div className="aboutMain flex-vertical-center">
            <img
              alt="html"
              src="쏘쓰/KakaoTalk_Photo_2022-08-29-18-02-23-removebg-preview.png"
              className="aboutLogo"
              style={{
                opacity: isResponsive
                  ? scrollPx < 3800
                    ? 0
                    : scrollPx < 4000
                    ? Math.abs(3800 - scrollPx) * 0.005
                    : 1
                  : scrollPx < 4400
                  ? 0
                  : !isResponsive && scrollPx < 4400
                  ? 0
                  : !isResponsive && scrollPx < 4600
                  ? Math.abs(4400 - scrollPx) * 0.005
                  : 1,

                transform: `translateX(${
                  isResponsive
                    ? scrollPx < 3800
                      ? -100
                      : scrollPx < 4000
                      ? -4000 + scrollPx
                      : 0
                    : scrollPx < 4400
                    ? -2000
                    : scrollPx < 4610
                    ? -4610 + scrollPx
                    : 0
                }px)`,
              }}
            />
            <div className="aboutText">HTML5을 자유롭게 사용이 가능합니다.</div>
          </div>
          <div className="aboutMain flex-vertical-center">
            <div className="aboutText">
              CSS와 SCSS를 사용 할 수 있습니다.
              <br />
            </div>
            <img
              alt="html"
              src="쏘쓰/css-3-logo-023C1A7171-seeklogo.com.png"
              className="aboutLogo"
              style={{
                opacity: isResponsive
                  ? scrollPx < 4015
                    ? 0
                    : scrollPx < 4215
                    ? Math.abs(4015 - scrollPx) * 0.005
                    : 1
                  : scrollPx < 4615
                  ? 0
                  : !isResponsive && scrollPx < 4615
                  ? 0
                  : !isResponsive && scrollPx < 4815
                  ? Math.abs(4615 - scrollPx) * 0.005
                  : 1,
                transform: `translateX(${
                  isResponsive
                    ? scrollPx < 4000
                      ? 100
                      : scrollPx < 4215
                      ? 4215 - scrollPx
                      : 0
                    : scrollPx < 4610
                    ? 2000
                    : scrollPx < 4820
                    ? 4820 - scrollPx
                    : 0
                }px)`,
              }}
            />
          </div>
          <div className="aboutMain flex-vertical-center">
            <img
              alt="html"
              src="쏘쓰/JavaScript_logo_2.svg.png"
              className="aboutLogo"
              style={{
                opacity: isResponsive
                  ? scrollPx < 4230
                    ? 0
                    : scrollPx < 4430
                    ? Math.abs(4230 - scrollPx) * 0.005
                    : 1
                  : scrollPx < 4830
                  ? 0
                  : !isResponsive && scrollPx < 4830
                  ? 0
                  : !isResponsive && scrollPx < 5030
                  ? Math.abs(4830 - scrollPx) * 0.005
                  : 1,
                transform: `translateX(${
                  isResponsive
                    ? scrollPx < 4215
                      ? -100
                      : scrollPx < 4430
                      ? -4430 + scrollPx
                      : 0
                    : scrollPx < 4820
                    ? -2000
                    : scrollPx < 5030
                    ? -5030 + scrollPx
                    : 0
                }px)`,
              }}
            />
            <div className="aboutText">
              JAVASCRIPT의 동작 원리와 Hoisting에 대하여 이해하였으며 <br />
              ES6 문법과 ES8 문법 등을 이해하고 사용할 수 있습니다. <br />
              프론트엔드 개발자의 기초라고 볼 수 있는 JAVASCRIPT를
              <br />
              심도있게 공부하고 있습니다.
            </div>
          </div>
          <div className="aboutMain flex-vertical-center">
            <div className="aboutText">
              JAVASCRIPT의 프레임워크인 REACT를 사용할 수 있습니다.
              <br /> 본 페이지도 REACT로 제작되었으며
              <br /> 함수형 문법을 사용하며 JSX와 데이터 바인딩이 가능합니다.
              <br /> styled-components 등의 Library 사용이 가능합니다.
            </div>
            <img
              alt="html"
              src="쏘쓰/logo512.png"
              className="aboutLogo"
              style={{
                opacity: isResponsive
                  ? scrollPx < 4445
                    ? 0
                    : scrollPx < 4645
                    ? Math.abs(4445 - scrollPx) * 0.005
                    : 1
                  : scrollPx < 5045
                  ? 0
                  : !isResponsive && scrollPx < 5045
                  ? 0
                  : !isResponsive && scrollPx < 5245
                  ? Math.abs(5045 - scrollPx) * 0.005
                  : 1,
                transform: `translateX(${
                  isResponsive
                    ? scrollPx < 4430
                      ? 100
                      : scrollPx < 4645
                      ? 4645 - scrollPx
                      : 0
                    : scrollPx < 5030
                    ? 2000
                    : scrollPx < 5240
                    ? 5240 - scrollPx
                    : 0
                }px)`,
              }}
            />
          </div>
          <div className="aboutMain flex-vertical-center">
            <img
              alt="html"
              src="쏘쓰/redux_logo.png"
              className="aboutLogo"
              style={{
                opacity: isResponsive
                  ? scrollPx < 4660
                    ? 0
                    : scrollPx < 4860
                    ? Math.abs(4660 - scrollPx) * 0.005
                    : 1
                  : scrollPx < 5260
                  ? 0
                  : !isResponsive && scrollPx < 5260
                  ? 0
                  : !isResponsive && scrollPx < 5460
                  ? Math.abs(5260 - scrollPx) * 0.005
                  : 1,
                transform: `translateX(${
                  isResponsive
                    ? scrollPx < 4645
                      ? -100
                      : scrollPx < 4860
                      ? -4860 + scrollPx
                      : 0
                    : scrollPx < 5240
                    ? -2000
                    : scrollPx < 5450
                    ? -5450 + scrollPx
                    : 0
                }px)`,
              }}
            />
            <div className="aboutText">
              State Management를 위하여 Redux-toolkit을 사용 가능합니다.
              <br /> slice와 store를 만들어 상태를 관리하고, <br />
              action을 dispatch 할 수 있습니다.
            </div>
          </div>
        </div>
      </div>
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
