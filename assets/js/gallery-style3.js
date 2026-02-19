// Gallery Style3 슬라이드 기능 — 도트 인디케이터, 스와이프, 자동 재생 포함
(function () {
	function initGallery() {
		var galleries = document.querySelectorAll('.gallery.style3');

		if (galleries.length === 0) {
			console.log('No gallery.style3 found');
			return;
		}

		galleries.forEach(function (gallery) {
			var inner = gallery.querySelector('.gallery-inner') || gallery.querySelector('.inner');
			var articles;

			if (!inner) {
				articles = Array.from(gallery.querySelectorAll('article'));
			} else {
				articles = Array.from(inner.querySelectorAll('article'));
			}

			var forwardBtn = gallery.querySelector('.forward');
			var backwardBtn = gallery.querySelector('.backward');
			var currentIndex = 0;

			if (!articles || articles.length === 0) {
				return;
			}

			console.log('Gallery initialized:', articles.length, 'articles');

			// ── 컨테이너 높이 맞추기 ──
			function updateContainerHeight() {
				var maxHeight = 0;
				articles.forEach(function (article) {
					article.style.position = 'relative';
					article.style.visibility = 'visible';
					article.style.opacity = '1';
					var height = article.offsetHeight;
					if (height > maxHeight) maxHeight = height;
					article.style.position = '';
					article.style.visibility = '';
					article.style.opacity = '';
				});
				if (inner && maxHeight > 0) {
					inner.style.minHeight = maxHeight + 'px';
				}
			}

			// ── 초기 상태 설정 ──
			articles.forEach(function (article) {
				article.classList.remove('active');
			});
			articles[0].classList.add('active');
			currentIndex = 0;
			setTimeout(updateContainerHeight, 100);

			var isAnimating = false;
			var TRANSITION_DURATION = 400;

			// ── 도트 인디케이터 생성 ──
			var dotsContainer = document.createElement('div');
			dotsContainer.className = 'gallery-dots';
			dotsContainer.style.cssText = 'display:flex !important; justify-content:center !important; align-items:center !important; gap:10px !important; padding:16px 0 8px !important; position:relative !important; z-index:100 !important; width:100% !important; min-height:30px !important; visibility:visible !important; opacity:1 !important;';
			var dots = [];

			articles.forEach(function (_, i) {
				var dot = document.createElement('span');
				dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
				dot.setAttribute('role', 'button');
				dot.setAttribute('tabindex', '0');
				dot.setAttribute('aria-label', '슬라이드 ' + (i + 1));
				var isActive = (i === 0);
				dot.style.cssText = 'display:inline-block !important; width:14px !important; height:14px !important; min-width:14px !important; min-height:14px !important; border-radius:50% !important; background:' + (isActive ? '#47D3E5' : '#999') + ' !important; border:none !important; padding:0 !important; margin:0 !important; cursor:pointer !important; transition:all 0.3s ease !important; outline:none !important; box-sizing:border-box !important; visibility:visible !important; opacity:1 !important; -webkit-appearance:none !important; appearance:none !important;';
				if (isActive) {
					dot.style.setProperty('transform', 'scale(1.3)', 'important');
					dot.style.setProperty('box-shadow', '0 0 6px rgba(71,211,229,0.5)', 'important');
				}
				dot.addEventListener('click', function (e) {
					e.preventDefault();
					e.stopPropagation();
					goToSlide(i);
				});
				dotsContainer.appendChild(dot);
				dots.push(dot);
			});

			// 도트를 갤러리 바로 다음 형제로 삽입 (일반 document flow)
			if (gallery.parentNode) {
				gallery.parentNode.insertBefore(dotsContainer, gallery.nextSibling);
			}

			function updateDots() {
				dots.forEach(function (dot, i) {
					if (i === currentIndex) {
						dot.classList.add('active');
						dot.style.setProperty('background', '#47D3E5', 'important');
						dot.style.setProperty('transform', 'scale(1.3)', 'important');
						dot.style.setProperty('box-shadow', '0 0 6px rgba(71,211,229,0.5)', 'important');
					} else {
						dot.classList.remove('active');
						dot.style.setProperty('background', '#999', 'important');
						dot.style.setProperty('transform', 'scale(1)', 'important');
						dot.style.setProperty('box-shadow', 'none', 'important');
					}
				});
			}
		});
	}

	// ── 특정 슬라이드로 이동 ──
	function goToSlide(targetIndex) {
		if (isAnimating || targetIndex === currentIndex) return;
		isAnimating = true;
		resetAutoplay();

		var prevIndex = currentIndex;
		currentIndex = targetIndex;

		if (articles[prevIndex]) {
			articles[prevIndex].style.opacity = '0';
		}

		setTimeout(function () {
			if (articles[prevIndex]) {
				articles[prevIndex].classList.remove('active');
				articles[prevIndex].style.opacity = '';
			}
			if (articles[currentIndex]) {
				articles[currentIndex].style.opacity = '0';
				articles[currentIndex].classList.add('active');
				void articles[currentIndex].offsetHeight;
				articles[currentIndex].style.opacity = '1';
			}
			updateDots();
			updateContainerHeight();
			setTimeout(function () { isAnimating = false; }, TRANSITION_DURATION);
		}, TRANSITION_DURATION);
	}

	// ── 다음 슬라이드 ──
	var nextSlide = function () {
		if (isAnimating) return;
		var next = (currentIndex + 1) % articles.length;
		goToSlide(next);
	};

	// ── 이전 슬라이드 ──
	var prevSlide = function () {
		if (isAnimating) return;
		var prev = (currentIndex - 1 + articles.length) % articles.length;
		goToSlide(prev);
	};

	// ── 자동 재생 ──
	var AUTOPLAY_INTERVAL = 5000;
	var autoplayTimer = null;
	var isInView = true;

	function startAutoplay() {
		stopAutoplay();
		if (!isInView) return;
		autoplayTimer = setInterval(function () {
			if (isInView && !isAnimating) {
				nextSlide();
			}
		}, AUTOPLAY_INTERVAL);
	}

	function stopAutoplay() {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	function resetAutoplay() {
		stopAutoplay();
		startAutoplay();
	}

	// 뷰포트 가시성 감지 — 화면 밖에서는 자동 재생 중지
	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				isInView = entry.isIntersecting;
				if (isInView) {
					startAutoplay();
				} else {
					stopAutoplay();
				}
			});
		}, { threshold: 0.3 });
		observer.observe(gallery);
	}

	startAutoplay();

	// ── 스와이프 제스처 (모바일) ──
	var touchStartX = 0;
	var touchStartY = 0;
	var touchMoved = false;

	gallery.addEventListener('touchstart', function (e) {
		touchStartX = e.changedTouches[0].clientX;
		touchStartY = e.changedTouches[0].clientY;
		touchMoved = false;
	}, { passive: true });

	gallery.addEventListener('touchmove', function (e) {
		touchMoved = true;
	}, { passive: true });

	gallery.addEventListener('touchend', function (e) {
		if (!touchMoved) return;
		var touchEndX = e.changedTouches[0].clientX;
		var touchEndY = e.changedTouches[0].clientY;
		var diffX = touchEndX - touchStartX;
		var diffY = touchEndY - touchStartY;

		// 가로 이동이 세로보다 클 때만 스와이프로 판단 (세로 스크롤 충돌 방지)
		if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
			if (diffX < 0) {
				nextSlide();
			} else {
				prevSlide();
			}
		}
	}, { passive: true });

	// ── 버튼 이벤트 바인딩 ──
	if (typeof jQuery !== 'undefined') {
		jQuery(gallery).off('click', '.forward').on('click', '.forward', function (e) {
			e.preventDefault();
			e.stopPropagation();
			nextSlide();
			return false;
		});

		jQuery(gallery).off('click', '.backward').on('click', '.backward', function (e) {
			e.preventDefault();
			e.stopPropagation();
			prevSlide();
			return false;
		});
	} else {
		if (forwardBtn) {
			forwardBtn.onclick = function (e) {
				e.preventDefault();
				e.stopPropagation();
				nextSlide();
				return false;
			};
			forwardBtn.style.pointerEvents = 'auto';
			forwardBtn.style.cursor = 'pointer';
		}

		if (backwardBtn) {
			backwardBtn.onclick = function (e) {
				e.preventDefault();
				e.stopPropagation();
				prevSlide();
				return false;
			};
			backwardBtn.style.pointerEvents = 'auto';
			backwardBtn.style.cursor = 'pointer';
		}
	}

	// Detail 버튼 클릭 시 lightbox 열기
	articles.forEach(function (article) {
		var detailBtn = article.querySelector('.caption .button');
		var imageLink = article.querySelector('.image a');

		if (detailBtn && imageLink) {
			detailBtn.addEventListener('click', function (e) {
				e.preventDefault();
				imageLink.click();
			});
		}
	});
});

// jQuery가 로드된 후 실행
if (typeof jQuery !== 'undefined') {
	jQuery(document).ready(function () {
		setTimeout(initGallery, 200);
	});
} else {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () {
			setTimeout(initGallery, 200);
		});
	} else {
		setTimeout(initGallery, 200);
	}
}
}) ();
