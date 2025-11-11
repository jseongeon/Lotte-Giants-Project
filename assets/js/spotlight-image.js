// 이미지 높이에 맞춰 컨테이너 높이 조정
(function() {
	var spotlightImage = document.querySelector('.spotlight.style1 .image img[src="images/request.png"]');
	var spotlightImageContainer = spotlightImage ? spotlightImage.closest('.spotlight.style1 .image') : null;
	
	if (!spotlightImage || !spotlightImageContainer) return;
	
	function adjustContainerHeight() {
		// 이미지가 로드되었는지 확인
		if (!spotlightImage.complete || spotlightImage.naturalHeight === 0) {
			// 이미지가 아직 로드되지 않았으면 로드 이벤트 대기
			spotlightImage.addEventListener('load', adjustContainerHeight, { once: true });
			return;
		}
		
		// 컨테이너의 현재 너비 가져오기
		var containerWidth = spotlightImageContainer.offsetWidth;
		
		// 이미지의 원본 비율 계산
		var imageAspectRatio = spotlightImage.naturalWidth / spotlightImage.naturalHeight;
		
		// contain 모드에서 이미지가 표시될 때의 실제 높이 계산
		// 컨테이너 너비에 맞춰 이미지가 표시될 때의 높이
		var displayHeight = containerWidth / imageAspectRatio;
		
		// 컨테이너의 max-height 제한 확인
		var maxHeight = spotlightImageContainer.parentElement.offsetHeight || window.innerHeight;
		
		// 최종 높이 결정 (max-height를 넘지 않도록)
		var finalHeight = Math.min(displayHeight, maxHeight);
		
		// 컨테이너 높이 설정
		spotlightImageContainer.style.setProperty('height', finalHeight + 'px', 'important');
	}
	
	// 초기 실행
	adjustContainerHeight();
	
	// 리사이즈 이벤트 감지
	var resizeTimer;
	window.addEventListener('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(adjustContainerHeight, 100);
	});
	
	// 이미지 로드 이벤트
	spotlightImage.addEventListener('load', adjustContainerHeight);
})();

