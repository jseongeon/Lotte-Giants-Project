// Event Box Lightbox 기능
(function() {
	function initEventBoxLightbox() {
		// jQuery가 로드되었는지 확인
		if (typeof jQuery === 'undefined') {
			setTimeout(initEventBoxLightbox, 100);
			return;
		}
		
		var eventBoxes = document.querySelectorAll('.event-box[data-image]');
		
		if (eventBoxes.length === 0) {
			console.log('No event boxes found');
			return;
		}
		
		// items 섹션의 lightbox gallery 찾기
		var itemsSection = document.querySelector('#items');
		if (!itemsSection) {
			console.log('Items section not found');
			return;
		}
		
		var lightboxGallery = itemsSection.querySelector('.gallery.lightbox');
		if (!lightboxGallery) {
			console.log('Lightbox gallery not found');
			return;
		}
		
		var $gallery = jQuery(lightboxGallery);
		var $modal = $gallery.children('.modal');
		
		// modal이 없으면 직접 생성
		if ($modal.length === 0) {
			console.log('Creating modal manually...');
			$gallery.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>');
			$modal = $gallery.children('.modal');
			
			// main.js의 이벤트 핸들러를 수동으로 바인딩
			$gallery
				.on('click', '.modal', function(event) {
					var $modal = jQuery(this);
					var $modalImg = $modal.find('img');
					
					// Locked? Bail.
					if ($modal[0]._locked) {
						return;
					}
					
					// Already hidden? Bail.
					if (!$modal.hasClass('visible')) {
						return;
					}
					
					// Lock.
					$modal[0]._locked = true;
					
					// Clear visible, loaded.
					$modal.removeClass('loaded');
					
					// Delay.
					setTimeout(function() {
						$modal.removeClass('visible');
						
						setTimeout(function() {
							// Clear src.
							$modalImg.attr('src', '');
							
							// Unlock.
							$modal[0]._locked = false;
							
							// Focus.
							jQuery('body').focus();
						}, 475);
					}, 125);
				})
				.on('keypress', '.modal', function(event) {
					var $modal = jQuery(this);
					
					// Escape? Hide modal.
					if (event.keyCode == 27) {
						$modal.trigger('click');
					}
				})
				.find('img')
				.on('load', function(event) {
					var $modalImg = jQuery(this);
					var $modal = $modalImg.parents('.modal');
					
					// Locked? Bail.
					if ($modal[0]._locked) {
						return;
					}
					
					// Mark as loaded.
					$modal.addClass('loaded');
					
					// Unlock.
					setTimeout(function() {
						$modal[0]._locked = false;
					}, 275);
				});
		}
		
		console.log('Event box lightbox initialized');
		
		// 각 event-box에 클릭 이벤트 추가
		eventBoxes.forEach(function(box) {
			box.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				var imagePath = box.getAttribute('data-image');
				if (!imagePath) {
					console.log('No image path');
					return;
				}
				
				// 이미지 경로가 유효한지 확인
				if (!imagePath.match(/\.(jpg|gif|png|mp4)$/)) {
					console.log('Invalid image path:', imagePath);
					return;
				}
				
				console.log('Opening image:', imagePath);
				
				// main.js의 lightbox 로직 직접 사용
				var $modalImg = $modal.find('img');
				
				// Locked 상태면 강제로 unlock
				if ($modal[0]._locked) {
					console.log('Modal was locked, forcing unlock');
					$modal[0]._locked = false;
				}
				
				// Lock.
				$modal[0]._locked = true;
				
				// gallery를 보이게 만들기 (display: none이면 modal이 안 보임)
				// 하지만 gallery 자체는 보이지 않게 하고 modal만 보이게
				$gallery.css({
					'display': 'block',
					'position': 'static',
					'background': 'transparent',
					'width': '0',
					'height': '0',
					'overflow': 'visible'
				});
				
				// Set src.
				$modalImg.attr('src', imagePath);
				
				// Set visible.
				$modal.addClass('visible');
				
				console.log('Modal classes:', $modal.attr('class'));
				console.log('Modal visible:', $modal.hasClass('visible'));
				console.log('Modal computed style:', window.getComputedStyle($modal[0]).display);
				console.log('Modal z-index:', window.getComputedStyle($modal[0]).zIndex);
				
				// Focus.
				$modal.focus();
				
				// 이미지 로드 완료 처리
				var imageLoadedHandler = function() {
					$modal.addClass('loaded');
					// 즉시 unlock
					$modal[0]._locked = false;
				};
				
				// modalImg의 load 이벤트 처리
				$modalImg.off('load.eventbox').on('load.eventbox', imageLoadedHandler);
				
				// 이미지가 이미 로드되어 있으면 즉시 처리
				if ($modalImg[0].complete && $modalImg[0].naturalWidth > 0) {
					imageLoadedHandler();
				}
				
				// 안전장치: 짧은 시간 후 무조건 unlock (이미지 로드와 관계없이)
				setTimeout(function() {
					$modal[0]._locked = false;
					if (!$modal.hasClass('loaded')) {
						$modal.addClass('loaded');
					}
				}, 300);
			});
		});
	}
	
	// 모든 스크립트가 로드된 후 실행
	if (typeof jQuery !== 'undefined') {
		// window.onload를 사용하여 모든 리소스가 로드된 후 실행
		jQuery(window).on('load', function() {
			setTimeout(initEventBoxLightbox, 500);
		});
		
		// document.ready도 시도 (더 빠른 초기화)
		jQuery(document).ready(function() {
			setTimeout(initEventBoxLightbox, 1500);
		});
	} else {
		// 순수 JavaScript
		window.addEventListener('load', function() {
			setTimeout(initEventBoxLightbox, 500);
		});
		
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', function() {
				setTimeout(initEventBoxLightbox, 1500);
			});
		} else {
			setTimeout(initEventBoxLightbox, 1500);
		}
	}
})();

