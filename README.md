# BookSearch-Practice

본 프로젝트에서는 KaKao Api를 이용하여
Infinity Scroll 과 Pagination 방식의 도서 검색 UI를 구현하였습니다.

또한 검색한 도서를 장바구니에 담을 수 있으며 장바구니의 UI도 구현되어 있습니다.

State Management를 위하여 Redux-toolkit을 사용합니다.

본 프로젝트는 크롬, 사파리에 최적화 되어 있으며 확대/축소 80%의 배율로 보시는걸 권장드립니다.

## Available Scripts

이 프로젝트를 실행하기 위해서는 :

### `npm start`

를 입력 해 주세요 !

## Detail

해당 프로젝트는 Main, Infinity Scroll, Pagination 그리고 Shopping Cart 컴포넌트로 이루어져 있습니다.

### `Main`

Main 컴포넌트 에서는 다른 컴포넌트에 대한 간단한 설명,

해당 프로젝트 제작자와 Contact에 대하여 소개합니다.

컴포넌트에 대한 설명을 애니메이션을 사용하여 나타냈습니다.

### `Infinity Scroll`

Infinity Scroll 컴포넌트 에서는 Intersection Observer API를 사용하여 무한 스크롤을 구현하였습니다.

Input에 검색어를 입력 후 Enter 혹은 돋보기 버튼 클릭 시 검색이 가능합니다.

스크롤을 계속 밑으로 내려 무한 스크롤을 사용할 수 있습니다.

책 옆의 쇼핑카트 아이콘을 클릭 시 해당 책을 장바구니로 이동시킬 수 있습니다.

사용법이 익숙하지 않은 유저를 위하여 오토 파일럿 기능을 구현하였습니다.

우측 상단에 위치하며, 클릭 시 10초간 자동으로 검색하는 방법을 안내합니다.

### `Pagination`

Pagination 컴포넌트 에서는 익숙한 방식의 책 검색 UI를 제공합니다.

Input에 검색어를 입력 후 Enter 혹은 돋보기 버튼 클릭 시 검색이 가능합니다.

스크롤 밑에 Select 태그를 클릭하여 10/20/30/40 묶음으로 도서를 한 페이지에 표시할 수 있습니다. (기본값은 10입니다.)

Input 밑에 최근 검색한 항목이 있다면 최근 검색어 목록이 보여집니다.

최근 본 책이 있다면, 컴포넌트의 우측에 최근 본 책들에 대한 사진이 보여집니다.

검색된 책들에 대하여 정확도 / 출간일 / 상품명 / 낮은가격 / 높은가격 / 할인율로 필터할 수 있습니다.

### `Shopping Cart`

Shopping Cart 컴포넌트에서는 Pagination 컴포넌트나 Infinity Scroll 컴포넌트에서 장바구니로 이동시킨 책들이 표시됩니다.

이동시킨 책의 상품명, 정가, 판매가, 수량, 합계, 상태 등을 보여 줍니다.

총 이동시킨 상품의 합계, 수량 등도 보여 줍니다.

하단의 신용카드 등록 버튼을 누르면 신용카드를 등록할 수 있습니다.

신용카드 등록 구현을 위하여 react-creditcard-validator Library를 사용하였습니다.

신용카드 등록 Form에서도 Infiniti Scroll 컴포넌트와 마찬가지로 오토 파일럿 기능을 제공합니다.
