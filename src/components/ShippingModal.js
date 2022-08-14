import React, { useEffect } from "react";

const ShippingModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="ModalTotalBox">
      <div className="ModalInnerTotalBox" onClick={onClose}>
        <table
          className="modalShippingTotalBox"
          onClick={(e) => e.stopPropagation()}
        >
          <thead className="modalShippingHead">
            <tr>
              <th colSpan="2">구분</th>
              <th>가능지역</th>
              <th>제외지역</th>
            </tr>
          </thead>
          <tbody className="modalShippingBody">
            <tr>
              <td colSpan="2" className="modalShippingRegion">
                서울
              </td>
              <td>제외지역 외</td>
              <td>
                역삼동, 삼각산동, 상일동, 강일동, 개화동, 과해동, 오쇠동,
                오곡동, 장지동, 현저동, 공덕동, 대방동, 충정로1가, 관철동,
                여의도동, 양평동1가, 신정3동, 휘경동, 상도1동, 구의동, 신원동,
                방화동, 잠원동, 미아동, 삼양동, 신림동, 등촌동, 우이동, 구로동,
                송파구 가락동 헬리오시티 단지, 성북구 동선동, 강북구 수유동,
                강동구 전체
              </td>
            </tr>
            <tr>
              <td className="modalShippingMetropolitan" rowSpan="9">
                수도권
              </td>
              <td className="modalShippingRegion">고양</td>
              <td>제외지역 외</td>
              <td>
                고양동, 관산동, 능곡동, 대덕동, 원신동, 창릉동, 삼송동, 행주동,
                화전동, 효자동, 홍도동, 고봉동, 풍산동, 송산동, 송포동
              </td>
            </tr>
            <tr>
              <td className="modalShippingRegion">광명</td>
              <td>제외지역 외</td>
              <td>
                소화동, 소화1동, 소화2동, 노온사동, 일직동, 가학동, 옥길동,
                학온동, 경기도 광명시 광명동
              </td>
            </tr>
            <tr>
              <td className="modalShippingRegion">부천</td>
              <td>중동, 상동, 송내동 </td>
              <td>가능지역 외</td>
            </tr>
            <tr>
              <td className="modalShippingRegion">성남</td>
              <td>
                수정구 단대동, 산성동, 양재동, 중원구 전체, 분당구 전체(금곡동,
                구미동 제외)
              </td>
              <td>가능지역 외</td>
            </tr>
            <tr>
              <td className="modalShippingRegion">안산</td>
              <td>제외지역 외</td>
              <td>
                사이동, 해양동, 반월동, 안산동, 대부동, 중앙동, 호수동, 백운동,
                신길동, 초지동, 선부1동
              </td>
            </tr>
            <tr>
              <td className="modalShippingRegion">용인</td>
              <td>마북동, 풍덕천동, 죽전동, 성복동 </td>
              <td>가능지역 외</td>
            </tr>
            <tr>
              <td className="modalShippingRegion">의정부</td>
              <td>제외지역 외</td>
              <td>민락동, 녹양동, 송산동, 자금동, 흥선동</td>
            </tr>
            <tr>
              <td className="modalShippingRegion">수원</td>
              <td>제외지역 외</td>
              <td>
                장안구(조원동, 송중동, 파장동), 권선구(호매실동, 금곡동, 구운동)
              </td>
            </tr>
            <tr>
              <td className="modalShippingRegion">인천</td>
              <td>
                구월1동, 간석4동, 청천1동, 청천2동, 삼산1동, 삼산2동, 효성1동,
                효성2동, 계산1동, 계산2동, 계산3동, 계산4동, 작전1동, 작전2동,
                검암동, 원당동, 당하동
              </td>
              <td>가능지역 외</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ShippingModal;
