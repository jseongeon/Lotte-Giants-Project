# 롯데자이언츠 3000만 관중 기념 포트폴리오 프로젝트

2024년 롯데자이언츠 3000만 관중 기념 이벤트 기획 프로젝트 포트폴리오 웹사이트입니다.

## 📋 프로젝트 개요

롯데자이언츠 3000만 관중 달성을 기념하여 진행한 이벤트 기획 프로젝트로, PPT·기획팀으로서 팀원 의견을 반영하여 전략을 수립하고 데이터 분석을 토대로 전략을 제안하여 성공적으로 프로젝트를 리딩했습니다.

**수상 내역**: 우수상

## 🎯 주요 기능

- **반응형 웹 디자인**: 모든 디바이스에서 최적화된 레이아웃
- **인터랙티브 갤러리**: 
  - 데이터 및 현황 분석 섹션의 슬라이드 갤러리
  - 이벤트 이미지 lightbox 확대 기능
- **스크롤 애니메이션**: 부드러운 스크롤 및 페이드인 효과
- **이벤트 카드 인터랙션**: 
  - Items 섹션의 카드 클릭 시 해당 이미지 lightbox로 표시
  - Hover 효과 및 전환 애니메이션
- **Contact Form**: 연락처 정보 및 폼 기능

## 📁 프로젝트 구조

```
portfolio_lotte/
├── index.html              # 메인 HTML 파일
├── assets/
│   ├── css/                # 스타일시트
│   │   ├── main.css        # 메인 CSS
│   │   └── noscript.css    # NoScript 대체 CSS
│   ├── js/                 # JavaScript 파일
│   │   ├── main.js         # 메인 JavaScript
│   │   ├── gallery-style3.js    # 갤러리 슬라이드 기능
│   │   └── event-box-lightbox.js # 이벤트 카드 lightbox 기능
│   └── sass/               # SCSS 소스 파일
└── images/                 # 이미지 리소스
    ├── gallery/            # 데이터 분석 이미지
    ├── preEvent/           # 사전 이벤트 이미지
    ├── main_1/             # 본 이벤트 (출항) 이미지
    ├── main_2/             # 본 이벤트 (항해일지) 이미지
    ├── main_3/             # 본 이벤트 (바람) 이미지
    └── plusEvent/          # 추가 이벤트 이미지
```

## 🚀 시작하기

### 로컬에서 실행하기

1. 저장소 클론
```bash
git clone https://github.com/jseongeon/portfolio_lotte.git
cd portfolio_lotte
```

2. 웹 서버 실행
   - Live Server (VS Code 확장 프로그램) 사용
   - 또는 Python: `python -m http.server 8000`
   - 또는 Node.js: `npx http-server`

3. 브라우저에서 열기
   - `http://localhost:8000/index.html` (또는 사용 중인 포트)

## 🎨 주요 섹션

1. **배너**: 프로젝트 소개 및 시작
2. **구단 요청사항**: 프로젝트 배경
3. **데이터 및 현황 분석**: 슬라이드 갤러리로 데이터 시각화
4. **구단 피드백**: 긍정적/부정적 피드백
5. **이벤트 레이아웃**: Giantsfan-ship 이벤트 구조
6. **사전 이벤트**: 사전 이벤트 상세
7. **본 이벤트**: 출항, 항해일지, 바람 테마별 이벤트
8. **추가 이벤트**: 추가 이닝 이벤트
9. **예산 가편성**: 예산 분석
10. **기대 효과**: 기대 효과 및 ROES 분석
11. **Contact**: 연락처 정보

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 반응형 디자인, 애니메이션
- **JavaScript (jQuery)**: 인터랙티브 기능
- **SCSS**: CSS 전처리기
- **Font Awesome**: 아이콘

## 📝 주요 기능 설명

### 갤러리 슬라이드 (Style3)
- 좌우 화살표 버튼으로 이미지 전환
- 부드러운 페이드 전환 효과
- 자동 높이 조정

### 이벤트 카드 Lightbox
- Items 섹션의 카드를 클릭하면 해당 이미지가 lightbox로 표시
- ESC 키 또는 배경 클릭으로 닫기

### Contact Form 아이콘
- Hover 시 아이콘이 텍스트로 전환
- 아이콘 확대 효과

## 📄 라이선스

이 프로젝트는 HTML5 UP의 Story 템플릿을 기반으로 제작되었습니다.
- 템플릿 라이선스: CCA 3.0 (html5up.net/license)

## 👤 작성자

**정성언 (Jeong SeongEon)**
- 이메일: tjddjs1507@gmail.com
- 전화: 010-8300-1507
- GitHub: [@jseongeon](https://github.com/jseongeon)
- Notion: [포트폴리오](https://lily-honeydew-416.notion.site/2a14c52da783805bab73c163e466070d)

## 🙏 크레딧

- **템플릿**: Story by HTML5 UP (html5up.net)
- **아이콘**: Font Awesome (fontawesome.io)
- **라이브러리**: 
  - jQuery (jquery.com)
  - Scrollex (github.com/ajlkn/jquery.scrollex)
  - Responsive Tools (github.com/ajlkn/responsive-tools)

