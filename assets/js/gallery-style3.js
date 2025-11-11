// Gallery Style3 슬라이드 기능
(function() {
	function initGallery() {
		var galleries = document.querySelectorAll('.gallery.style3');
		
		if (galleries.length === 0) {
			console.log('No gallery.style3 found');
			return;
		}
		
		galleries.forEach(function(gallery) {
			console.log('Processing gallery:', gallery);
			
			var inner = gallery.querySelector('.gallery-inner') || gallery.querySelector('.inner');
			console.log('Inner element:', inner);
			
			var articles;
			if (!inner) {
				console.log('Inner not found, trying direct query...');
				// 직접 article 찾기 시도
				articles = Array.from(gallery.querySelectorAll('article'));
				console.log('Found articles directly:', articles.length);
			} else {
				articles = Array.from(inner.querySelectorAll('article'));
				console.log('Found articles in inner:', articles.length);
			}
			
			var forwardBtn = gallery.querySelector('.forward');
			var backwardBtn = gallery.querySelector('.backward');
			var currentIndex = 0;
			
			if (!articles || articles.length === 0) {
				console.log('No articles found in gallery');
				console.log('Gallery HTML:', gallery.innerHTML.substring(0, 500));
				return;
			}
			
			console.log('Gallery initialized:', articles.length, 'articles');
			
			// 컨테이너 높이를 가장 큰 article에 맞추기
			function updateContainerHeight() {
				var maxHeight = 0;
				articles.forEach(function(article) {
					article.style.position = 'relative';
					article.style.visibility = 'visible';
					article.style.opacity = '1';
					var height = article.offsetHeight;
					if (height > maxHeight) {
						maxHeight = height;
					}
					article.style.position = '';
					article.style.visibility = '';
					article.style.opacity = '';
				});
				if (inner && maxHeight > 0) {
					inner.style.minHeight = maxHeight + 'px';
				}
			}
			
			// 모든 article에서 active 제거
			articles.forEach(function(article) {
				article.classList.remove('active');
			});
			
			// 첫 번째 article에 active 클래스 추가
			articles[0].classList.add('active');
			currentIndex = 0;
			
			// 컨테이너 높이 업데이트
			setTimeout(updateContainerHeight, 100);
		
			// 다음 이미지로 이동
			var nextSlide = function() {
				console.log('Next slide called, current:', currentIndex);
				if (articles[currentIndex]) {
					articles[currentIndex].classList.remove('active');
				}
				currentIndex = (currentIndex + 1) % articles.length;
				console.log('Switching to index:', currentIndex);
				if (articles[currentIndex]) {
					articles[currentIndex].classList.add('active');
					console.log('Active class added to article', currentIndex);
				}
			};
			
			// 이전 이미지로 이동
			var prevSlide = function() {
				console.log('Prev slide called, current:', currentIndex);
				if (articles[currentIndex]) {
					articles[currentIndex].classList.remove('active');
				}
				currentIndex = (currentIndex - 1 + articles.length) % articles.length;
				console.log('Switching to index:', currentIndex);
				if (articles[currentIndex]) {
					articles[currentIndex].classList.add('active');
					console.log('Active class added to article', currentIndex);
				}
			};
			
			// jQuery를 사용하여 이벤트 바인딩
			if (typeof jQuery !== 'undefined') {
				jQuery(gallery).off('click', '.forward').on('click', '.forward', function(e) {
					e.preventDefault();
					e.stopPropagation();
					console.log('Forward button clicked (jQuery)!');
					nextSlide();
					return false;
				});
				
				jQuery(gallery).off('click', '.backward').on('click', '.backward', function(e) {
					e.preventDefault();
					e.stopPropagation();
					console.log('Backward button clicked (jQuery)!');
					prevSlide();
					return false;
				});
			} else {
				// 순수 JavaScript
				if (forwardBtn) {
					forwardBtn.onclick = function(e) {
						e.preventDefault();
						e.stopPropagation();
						console.log('Forward button clicked!');
						nextSlide();
						return false;
					};
					forwardBtn.style.pointerEvents = 'auto';
					forwardBtn.style.cursor = 'pointer';
				} else {
					console.log('Forward button not found!');
				}
				
				if (backwardBtn) {
					backwardBtn.onclick = function(e) {
						e.preventDefault();
						e.stopPropagation();
						console.log('Backward button clicked!');
						prevSlide();
						return false;
					};
					backwardBtn.style.pointerEvents = 'auto';
					backwardBtn.style.cursor = 'pointer';
				} else {
					console.log('Backward button not found!');
				}
			}
			
			// Detail 버튼 클릭 시 lightbox 열기
			articles.forEach(function(article) {
				var detailBtn = article.querySelector('.caption .button');
				var imageLink = article.querySelector('.image a');
				
				if (detailBtn && imageLink) {
					detailBtn.addEventListener('click', function(e) {
						e.preventDefault();
						imageLink.click();
					});
				}
			});
		});
	}
	
	// jQuery가 로드된 후 실행
	if (typeof jQuery !== 'undefined') {
		jQuery(document).ready(function() {
			setTimeout(initGallery, 200);
		});
	} else {
		// 순수 JavaScript
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', function() {
				setTimeout(initGallery, 200);
			});
		} else {
			setTimeout(initGallery, 200);
		}
	}
})();

