// Gallery Style3 슬라이드 기능 — 도트 인디케이터, 스와이프, 자동 재생 포함
(function () {
	'use strict';

	function initGallery() {
		var galleries = document.querySelectorAll('.gallery.style3');

		if (galleries.length === 0) {
			return;
		}

		// ── 스타일 주입 (버튼 잔상 제거 강화 및 스타일 개선) ──
		var styleId = 'gallery-style3-custom-css';
		var style = document.getElementById(styleId);
		if (!style) {
			style = document.createElement('style');
			style.id = styleId;
			document.head.appendChild(style);
		}

		// CSS 내용 업데이트
		style.textContent = `
			/* 슬라이드 버튼 (데스크톱) */
			@media screen and (min-width: 981px) {
				.gallery.style3 .forward,
				.gallery.style3 .backward {
					width: 60px !important;
					height: 60px !important;
					top: 50% !important;
					transform: translateY(-50%) !important;
					margin: 0 !important;
					opacity: 1 !important;
					transition: all 0.2s ease !important;
					display: block !important;
					
					/* 버튼 가시성 확보 */
					background-color: rgba(0, 0, 0, 0.05) !important; 
					border-radius: 50% !important;
					
					border: none !important;
					box-shadow: none !important;
					
					/* 텍스트 및 가상 요소 잔상 완벽 제거 */
					font-size: 0 !important;
					line-height: 0 !important;
					color: transparent !important;
					text-indent: -9999px !important;
					overflow: hidden !important;
					text-shadow: none !important;
					
					z-index: 100 !important;
					cursor: pointer !important;
				}

				/* SVG 아이콘 배경 (색상 진한 회색 #333) */
				.gallery.style3 .forward {
					right: -70px !important;
					left: auto !important; 
					background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpolyline points='30,15 65,50 30,85' fill='none' stroke='%23333333' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E") !important;
					background-size: contain !important;
					background-repeat: no-repeat !important;
					background-position: center !important;
				}

				.gallery.style3 .backward {
					left: -70px !important;
					right: auto !important;
					background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpolyline points='70,15 35,50 70,85' fill='none' stroke='%23333333' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E") !important;
					background-size: contain !important;
					background-repeat: no-repeat !important;
					background-position: center !important;
				}

				/* 호버 효과 */
				.gallery.style3 .forward:hover {
					background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpolyline points='30,15 65,50 30,85' fill='none' stroke='%23000000' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E") !important;
					transform: translateY(-50%) scale(1.15) !important;
					background-color: rgba(0, 0, 0, 0.1) !important;
					filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)) !important;
				}

				.gallery.style3 .backward:hover {
					background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpolyline points='70,15 35,50 70,85' fill='none' stroke='%23000000' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E") !important;
					transform: translateY(-50%) scale(1.15) !important;
					background-color: rgba(0, 0, 0, 0.1) !important;
					filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)) !important;
				}

				/* 기존 가상 요소 완벽 제거 */
				.gallery.style3 .forward:before,
				.gallery.style3 .backward:before,
				.gallery.style3 .forward:after,
				.gallery.style3 .backward:after,
				.gallery.style3:before,
				.gallery.style3:after {
					content: none !important;
					display: none !important;
					width: 0 !important;
					height: 0 !important;
				}
				
				.gallery.style3,
				.gallery.style3 .gallery-inner,
				.gallery.style3 .inner {
					overflow: visible !important;
				}
			}

			@media screen and (max-width: 980px) {
				.gallery.style3 .forward,
				.gallery.style3 .backward {
					display: none !important;
				}
				.gallery.style3 {
					overflow: hidden !important;
				}
			}
		`;

		galleries.forEach(function (gallery) {
			var inner = gallery.querySelector('.gallery-inner') || gallery.querySelector('.inner');
			var articles;

			if (!inner) {
				articles = Array.from(gallery.querySelectorAll('article'));
			} else {
				articles = Array.from(inner.querySelectorAll('article'));
			}

			// ── [버튼 중복 제거 중요 로직] ──
			// main.js나 HTML에 의해 생성된 기존 버튼들을 모두 찾아 제거
			var oldForwards = gallery.querySelectorAll('.forward');
			var oldBackwards = gallery.querySelectorAll('.backward');
			oldForwards.forEach(function (btn) { btn.remove(); });
			oldBackwards.forEach(function (btn) { btn.remove(); });

			// ── [버튼 새로 생성] ──
			// 내가 제어할 깨끗한 버튼을 새로 생성하여 추가
			var forwardBtn = document.createElement('div');
			forwardBtn.className = 'forward';
			var backwardBtn = document.createElement('div');
			backwardBtn.className = 'backward';

			// 갤러리에 추가
			gallery.appendChild(forwardBtn);
			gallery.appendChild(backwardBtn);

			// ── [잔상 텍스트 노드 제거] ──
			// 갤러리 직계 텍스트 노드 중 <, > 포함된 것 제거 (혹시 모를 잔여물)
			Array.from(gallery.childNodes).forEach(function (node) {
				if (node.nodeType === 3) { // Text node
					var txt = node.nodeValue.trim();
					if (txt.includes('<') || txt.includes('>')) {
						node.nodeValue = '';
					}
				}
			});

			var currentIndex = 0;
			if (!articles || articles.length === 0) return;

			// ── 초기 상태 설정 ──
			articles.forEach(function (article) { article.classList.remove('active'); });
			articles[0].classList.add('active');
			currentIndex = 0;

			// ── 컨테이너 높이 맞추기 ──
			function updateContainerHeight() {
				var activeArticle = articles[currentIndex] || gallery.querySelector('article.active') || articles[0];
				if (!activeArticle) return;
				var h = activeArticle.offsetHeight;
				if (h > 0) {
					if (inner) {
						inner.style.minHeight = h + 'px';
						inner.style.height = h + 'px';
					}
					var mainInner = gallery.querySelector(':scope > .inner');
					if (mainInner && mainInner !== inner) {
						mainInner.style.minHeight = h + 'px';
						mainInner.style.height = h + 'px';
						mainInner.style.overflow = 'visible';
					}
					gallery.style.height = 'auto';
					gallery.style.minHeight = '0';
				}
			}

			setTimeout(updateContainerHeight, 100);
			var images = gallery.querySelectorAll('img');
			images.forEach(function (img) {
				if (img.complete) return;
				img.addEventListener('load', function () { setTimeout(updateContainerHeight, 50); });
			});
			window.addEventListener('resize', function () { setTimeout(updateContainerHeight, 100); });
			window.addEventListener('orientationchange', function () { setTimeout(updateContainerHeight, 300); });

			var isAnimating = false;
			var TRANSITION_DURATION = 400;

			// ── 도트 인디케이터 생성 ──
			var dotsContainer = document.createElement('div');
			dotsContainer.className = 'gallery-dots';
			dotsContainer.style.cssText = 'display:flex !important; justify-content:center !important; align-items:center !important; gap:10px !important; padding:4px 0 8px !important; margin:6px 0 0 0 !important; position:relative !important; z-index:100 !important; width:100% !important; min-height:20px !important; visibility:visible !important; opacity:1 !important;';
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

			if (gallery.parentNode) {
				gallery.parentNode.insertBefore(dotsContainer, gallery.nextSibling);
			}

			gallery.style.setProperty('margin-bottom', '0', 'important');
			gallery.style.setProperty('margin', '0', 'important');
			gallery.style.setProperty('padding-bottom', '0', 'important');
			var sectionEl = gallery.closest('section');
			if (sectionEl) {
				var sectionInner = sectionEl.querySelector(':scope > .inner');
				if (sectionInner) {
					sectionInner.style.setProperty('padding-bottom', '0', 'important');
				}
			}
			var galleryInner = gallery.querySelector('.gallery-inner');
			if (galleryInner) {
				galleryInner.style.setProperty('padding-bottom', '0', 'important');
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

			var nextSlide = function () {
				if (isAnimating) return;
				var next = (currentIndex + 1) % articles.length;
				goToSlide(next);
			};

			var prevSlide = function () {
				if (isAnimating) return;
				var prev = (currentIndex - 1 + articles.length) % articles.length;
				goToSlide(prev);
			};

			// ── 자동 재생 ──
			var AUTOPLAY_INTERVAL = 5000;
			var autoplayTimer = null;
			var isInView = true;
			var isHovering = false;
			var isModalOpen = false;

			function startAutoplay() {
				stopAutoplay();
				if (!isInView || isHovering || isModalOpen) return;

				autoplayTimer = setInterval(function () {
					if (isInView && !isAnimating && !isHovering && !isModalOpen) {
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

			gallery.addEventListener('mouseenter', function () {
				isHovering = true;
				stopAutoplay();
			});

			gallery.addEventListener('mouseleave', function () {
				isHovering = false;
				startAutoplay();
			});

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

			// ── 모바일 터치 ──
			var touchStartX = 0;
			var touchStartY = 0;
			var touchMoved = false;

			gallery.addEventListener('touchstart', function (e) {
				touchStartX = e.changedTouches[0].clientX;
				touchStartY = e.changedTouches[0].clientY;
				touchMoved = false;
				isHovering = true;
				stopAutoplay();
			}, { passive: true });

			gallery.addEventListener('touchmove', function (e) {
				touchMoved = true;
			}, { passive: true });

			gallery.addEventListener('touchend', function (e) {
				isHovering = false;
				startAutoplay();

				if (!touchMoved) return;
				var touchEndX = e.changedTouches[0].clientX;
				var touchEndY = e.changedTouches[0].clientY;
				var diffX = touchEndX - touchStartX;
				var diffY = touchEndY - touchStartY;

				if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
					if (diffX < 0) {
						nextSlide();
					} else {
						prevSlide();
					}
				}
			}, { passive: true });

			// ── 버튼 이벤트 바인딩 (새로 만든 버튼에 직접 연결) ──
			forwardBtn.onclick = function (e) {
				e.preventDefault();
				e.stopPropagation();
				nextSlide();
				return false;
			};
			forwardBtn.style.pointerEvents = 'auto';
			forwardBtn.style.cursor = 'pointer';

			backwardBtn.onclick = function (e) {
				e.preventDefault();
				e.stopPropagation();
				prevSlide();
				return false;
			};
			backwardBtn.style.pointerEvents = 'auto';
			backwardBtn.style.cursor = 'pointer';

			// ── 호버 오버레이 (자세히보기) ──
			articles.forEach(function (article) {
				var imageContainer = article.querySelector('a.image');
				if (!imageContainer) {
					imageContainer = article.querySelector('.image');
				}
				if (!imageContainer) return;

				var oldCaption = article.querySelector('.caption');
				var captionContent = '';
				if (oldCaption) {
					captionContent = oldCaption.innerHTML;
					oldCaption.style.display = 'none';
				}

				var oldOverlay = imageContainer.querySelector('.gallery-hover-overlay');
				if (oldOverlay) oldOverlay.remove();

				imageContainer.style.setProperty('position', 'relative', 'important');
				imageContainer.style.setProperty('display', 'block', 'important');
				imageContainer.style.setProperty('overflow', 'hidden', 'important');
				imageContainer.style.setProperty('margin', '0', 'important');
				imageContainer.style.setProperty('padding', '0', 'important');
				imageContainer.style.setProperty('transform', 'none', 'important');

				var overlay = document.createElement('div');
				overlay.className = 'gallery-hover-overlay';
				overlay.innerHTML = '<div class="overlay-content">' +
					'<div class="overlay-icon">🔍</div>' +
					'<div class="overlay-click-text">click</div>' +
					'<div class="overlay-detail-text">자세히보기</div>' +
					'</div>';

				overlay.style.setProperty('position', 'absolute', 'important');
				overlay.style.setProperty('top', '0', 'important');
				overlay.style.setProperty('left', '0', 'important');
				overlay.style.setProperty('width', '100%', 'important');
				overlay.style.setProperty('height', '100%', 'important');
				overlay.style.setProperty('z-index', '100', 'important');
				overlay.style.setProperty('display', 'flex', 'important');
				overlay.style.setProperty('align-items', 'center', 'important');
				overlay.style.setProperty('justify-content', 'center', 'important');
				overlay.style.setProperty('cursor', 'pointer', 'important');
				overlay.style.setProperty('background', 'rgba(0, 0, 0, 0.65)', 'important');

				imageContainer.appendChild(overlay);

				overlay.addEventListener('click', function (e) {
					e.preventDefault();
					e.stopPropagation();

					isModalOpen = true;
					stopAutoplay();

					var href = imageContainer.getAttribute('href') || imageContainer.querySelector('img').getAttribute('src');
					if (!href) return;

					if (typeof jQuery !== 'undefined') {
						var $gallery = jQuery(gallery);
						var $modal = $gallery.find('.modal:first');
						if ($modal.length > 0) {
							var $modalImg = $modal.find('img');
							if ($modal[0]._locked) return;
							$modal[0]._locked = true;
							$modalImg.attr('src', href);
							$modal.addClass('visible');
							$modal.focus();
							setTimeout(function () { $modal[0]._locked = false; }, 600);

							var closeModalHandler = function () {
								isModalOpen = false;
								startAutoplay();
								$modal.off('click', closeModalHandler);
								jQuery('body').off('keypress', keypressHandler);
							};

							var keypressHandler = function (event) {
								if (event.keyCode == 27) { // ESC
									closeModalHandler();
								}
							};

							$modal.on('click', closeModalHandler);
							jQuery('body').on('keypress', keypressHandler);


							setTimeout(function () {
								$modal.find('.modal-caption').remove();

								if (captionContent) {
									var $captionDiv = jQuery('<div class="modal-caption"></div>');
									$captionDiv.html(captionContent);

									$captionDiv.css({
										'position': 'absolute',
										'top': '0',
										'left': '0',
										'width': '100%',
										'height': '100%',
										'padding': '2rem',
										'color': '#ffffff',
										'background': 'rgba(0, 0, 0, 0.65)',
										'z-index': '10002',
										'box-sizing': 'border-box',
										'display': 'flex',
										'flex-direction': 'column',
										'align-items': 'center',
										'justify-content': 'center',
										'text-align': 'center'
									});

									$captionDiv.find('h3').css({
										'color': '#ffffff',
										'margin-bottom': '1rem',
										'font-size': '2em',
										'font-weight': 'bold',
										'text-shadow': '0 2px 4px rgba(0,0,0,0.8)'
									});
									$captionDiv.find('p').css({
										'color': '#f0f0f0',
										'margin-bottom': '1rem',
										'font-size': '1.1em',
										'line-height': '1.6',
										'text-shadow': '0 1px 2px rgba(0,0,0,0.8)',
										'max-width': '800px'
									});

									$captionDiv.find('.button').css({
										'display': 'none'
									});

									$modal.append($captionDiv);
								}
							}, 100);
						}
					}
				});
			});
		});
	}

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
})();
