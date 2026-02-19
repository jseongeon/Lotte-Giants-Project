/*
	Story by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Browser fixes.

	// IE: Flexbox min-height bug.
	if (browser.name == 'ie')
		(function () {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function () {

				var $x = $('.fullscreen');

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function () {

					if ($x.prop('scrollHeight') > $window.height())
						$x.css('height', 'auto');
					else
						$x.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		})();

	// Object fit workaround.
	if (!browser.canUse('object-fit'))
		(function () {

			$('.banner .image, .spotlight .image').each(function () {

				var $this = $(this),
					$img = $this.children('img'),
					positionClass = $this.parent().attr('class').match(/image-position-([a-z]+)/);

				// Set image.
				$this
					.css('background-image', 'url("' + $img.attr('src') + '")')
					.css('background-repeat', 'no-repeat')
					.css('background-size', 'cover');

				// Set position.
				switch (positionClass.length > 1 ? positionClass[1] : '') {

					case 'left':
						$this.css('background-position', 'left');
						break;

					case 'right':
						$this.css('background-position', 'right');
						break;

					default:
					case 'center':
						$this.css('background-position', 'center');
						break;

				}

				// Hide original.
				$img.css('opacity', '0');

			});

		})();

	// Smooth scroll.
	$('.smooth-scroll').scrolly();
	$('.smooth-scroll-middle').scrolly({ anchor: 'middle' });

	// 이미지 preload 및 빠른 스크롤 대응
	(function () {
		// 모든 이미지 요소 수집
		var $allImages = $('img[src]');
		var loadedImages = new Set();

		// 이미지 preload 함수
		function preloadImage(src) {
			if (loadedImages.has(src)) return;
			loadedImages.add(src);

			var img = new Image();
			img.src = src;
		}

		// Intersection Observer로 뷰포트에 들어오는 이미지 감지
		if ('IntersectionObserver' in window) {
			var imageObserver = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var $element = $(entry.target);
						var $section = $element.closest('section, .gallery, .event-layout, .image.fit');

						// 이미지 preload
						if ($element.is('img')) {
							preloadImage($element.attr('src'));
						} else {
							$element.find('img[src]').each(function () {
								preloadImage($(this).attr('src'));
							});
						}

						// 섹션이 뷰포트에 들어오면 is-inactive 제거
						if ($section.length && $section.hasClass('is-inactive')) {
							$section.removeClass('is-inactive');
						}

						// 이미지가 로드되었는지 확인하고 강제 표시
						setTimeout(function () {
							$section.find('img').each(function () {
								var $img = $(this);
								if ($img[0].complete && $img[0].naturalWidth > 0) {
									$img.closest('section, .gallery, .event-layout, .image.fit')
										.removeClass('is-inactive');
								}
							});
						}, 100);

						imageObserver.unobserve(entry.target);
					}
				});
			}, {
				rootMargin: '200px 0px', // 뷰포트 밖 200px 전에 미리 감지
				threshold: 0.01
			});

			// 모든 섹션과 이미지 관찰 시작
			$wrapper.find('section, .gallery, .event-layout, .image.fit').each(function () {
				imageObserver.observe(this);
			});
		}

		// 스크롤 이벤트로 추가 보완 (Intersection Observer가 없는 경우 대비)
		var scrollTimeout;
		$window.on('scroll', function () {
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(function () {
				var windowTop = $window.scrollTop();
				var windowBottom = windowTop + $window.height();

				$wrapper.find('section, .gallery, .event-layout, .image.fit').each(function () {
					var $this = $(this);
					var elementTop = $this.offset().top;
					var elementBottom = elementTop + $this.outerHeight();

					// 뷰포트와 겹치는 경우
					if (elementBottom >= windowTop && elementTop <= windowBottom) {
						// 이미지 preload
						$this.find('img[src]').each(function () {
							preloadImage($(this).attr('src'));
						});

						// is-inactive 제거
						if ($this.hasClass('is-inactive')) {
							$this.removeClass('is-inactive');
						}
					}
				});
			}, 50);
		});

		// 이미지 로드 완료 후 강제 표시
		$allImages.on('load', function () {
			var $img = $(this);
			var $section = $img.closest('section, .gallery, .event-layout, .image.fit');

			// 이미지가 로드되면 해당 섹션의 is-inactive 제거
			if ($section.length && $section.hasClass('is-inactive')) {
				$section.removeClass('is-inactive');
			}
		});

		// 이미 이미 로드된 이미지 처리
		$allImages.each(function () {
			var $img = $(this);
			if ($img[0].complete && $img[0].naturalWidth > 0) {
				var $section = $img.closest('section, .gallery, .event-layout, .image.fit');
				if ($section.length && $section.hasClass('is-inactive')) {
					// 뷰포트에 보이는지 확인
					var windowTop = $window.scrollTop();
					var windowBottom = windowTop + $window.height();
					var elementTop = $section.offset().top;
					var elementBottom = elementTop + $section.outerHeight();

					if (elementBottom >= windowTop && elementTop <= windowBottom) {
						$section.removeClass('is-inactive');
					}
				}
			}
		});
	})();

	// Wrapper.
	$wrapper.children()
		.scrollex({
			top: '30vh',
			bottom: '30vh',
			initialize: function () {
				$(this).addClass('is-inactive');
			},
			terminate: function () {
				$(this).removeClass('is-inactive');
			},
			enter: function () {
				$(this).removeClass('is-inactive');
			},
			leave: function () {

				var $this = $(this);

				if ($this.hasClass('onscroll-bidirectional'))
					$this.addClass('is-inactive');

			}
		});

	// Items.
	$('.items')
		.scrollex({
			top: '30vh',
			bottom: '30vh',
			delay: 50,
			initialize: function () {
				$(this).addClass('is-inactive');
			},
			terminate: function () {
				$(this).removeClass('is-inactive');
			},
			enter: function () {
				$(this).removeClass('is-inactive');
			},
			leave: function () {

				var $this = $(this);

				if ($this.hasClass('onscroll-bidirectional'))
					$this.addClass('is-inactive');

			}
		})
		.children()
		.wrapInner('<div class="inner"></div>');

	// Gallery.
	$('.gallery')
		.wrapInner('<div class="inner"></div>')
		.prepend(browser.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
		.scrollex({
			top: '30vh',
			bottom: '30vh',
			delay: 50,
			initialize: function () {
				$(this).addClass('is-inactive');
			},
			terminate: function () {
				$(this).removeClass('is-inactive');
			},
			enter: function () {
				$(this).removeClass('is-inactive');
			},
			leave: function () {

				var $this = $(this);

				if ($this.hasClass('onscroll-bidirectional'))
					$this.addClass('is-inactive');

			}
		})
		.children('.inner')
		//.css('overflow', 'hidden')
		.css('overflow-y', browser.mobile ? 'visible' : 'hidden')
		.css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
		.scrollLeft(0);

	// Style #1.
	// ...

	// Style #2.
	$('.gallery')
		.on('wheel', '.inner', function (event) {

			var $this = $(this),
				delta = (event.originalEvent.deltaX * 10);

			// Cap delta.
			if (delta > 0)
				delta = Math.min(25, delta);
			else if (delta < 0)
				delta = Math.max(-25, delta);

			// Scroll.
			$this.scrollLeft($this.scrollLeft() + delta);

		})
		.on('mouseenter', '.forward, .backward', function (event) {

			var $this = $(this),
				$inner = $this.siblings('.inner'),
				direction = ($this.hasClass('forward') ? 1 : -1);

			// Clear move interval.
			clearInterval(this._gallery_moveIntervalId);

			// Start interval.
			this._gallery_moveIntervalId = setInterval(function () {
				$inner.scrollLeft($inner.scrollLeft() + (5 * direction));
			}, 10);

		})
		.on('mouseleave', '.forward, .backward', function (event) {

			// Clear move interval.
			clearInterval(this._gallery_moveIntervalId);

		});

	// Lightbox.
	$('.gallery.lightbox')
		.on('click', 'a', function (event) {

			var $a = $(this),
				$gallery = $a.parents('.gallery'),
				$modal = $gallery.find('.modal:first'),
				$modalImg = $modal.find('img'),
				href = $a.attr('href');

			// Not an image? Bail.
			if (!href.match(/\.(jpg|gif|png|mp4)$/))
				return;

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Locked? Bail.
			if ($modal[0]._locked)
				return;

			// Lock.
			$modal[0]._locked = true;

			// Set src.
			$modalImg.attr('src', href);

			// Set visible.
			$modal.addClass('visible');

			// Focus.
			$modal.focus();

			// Delay.
			setTimeout(function () {

				// Unlock.
				$modal[0]._locked = false;

			}, 600);

		})
		.on('click', '.modal', function (event) {

			var $modal = $(this),
				$modalImg = $modal.find('img');

			// Locked? Bail.
			if ($modal[0]._locked)
				return;

			// Already hidden? Bail.
			if (!$modal.hasClass('visible'))
				return;

			// Lock.
			$modal[0]._locked = true;

			// Clear visible, loaded.
			$modal
				.removeClass('loaded')

			// Delay.
			setTimeout(function () {

				$modal
					.removeClass('visible')

				setTimeout(function () {

					// Clear src.
					$modalImg.attr('src', '');

					// Unlock.
					$modal[0]._locked = false;

					// Focus.
					$body.focus();

				}, 475);

			}, 125);

		})
		.on('keypress', '.modal', function (event) {

			var $modal = $(this);

			// Escape? Hide modal.
			if (event.keyCode == 27)
				$modal.trigger('click');

		})
		.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
		.find('img')
		.on('load', function (event) {

			var $modalImg = $(this),
				$modal = $modalImg.parents('.modal');

			setTimeout(function () {

				// No longer visible? Bail.
				if (!$modal.hasClass('visible'))
					return;

				// Set loaded.
				$modal.addClass('loaded');

			}, 275);

		});

	// ============================================
	// 스크롤 애니메이션 (Scroll Reveal)
	// ============================================
	(function () {
		// 애니메이션 대상 요소 선택자
		var animateSelectors = [
			'.spotlight .content',
			'.spotlight .image',
			'.gallery.style3',
			'.event-layout',
			'.event-content-row .pre-event-section',
			'.event-content-row .main-event-section',
			'#form > .inner',
			'#budget > .inner:first-child',
			'#expectedEffect > .inner:first-child',
			'.giantsfan-title'
		];

		// 모든 대상 요소에 scroll-animate 클래스 추가
		var elements = [];
		animateSelectors.forEach(function (selector) {
			var found = document.querySelectorAll(selector);
			found.forEach(function (el) {
				if (!el.classList.contains('scroll-animate')) {
					el.classList.add('scroll-animate');
				}
				elements.push(el);
			});
		});

		// spotlight 이미지에 from-left / from-right 적용
		document.querySelectorAll('.spotlight').forEach(function (spotlight, index) {
			var img = spotlight.querySelector('.image');
			var content = spotlight.querySelector('.content');
			if (img && img.classList.contains('scroll-animate')) {
				img.classList.add(index % 2 === 0 ? 'from-right' : 'from-left');
			}
			if (content && content.classList.contains('scroll-animate')) {
				content.classList.add(index % 2 === 0 ? 'from-left' : 'from-right');
			}
		});

		// 이벤트 박스에 순차 지연 적용
		document.querySelectorAll('.event-category').forEach(function (category) {
			var boxes = category.querySelectorAll('.event-box');
			boxes.forEach(function (box, i) {
				if (!box.classList.contains('scroll-animate')) {
					box.classList.add('scroll-animate', 'scale-in');
				}
				if (i < 4) {
					box.classList.add('scroll-delay-' + (i + 1));
				}
				elements.push(box);
			});
		});

		// IntersectionObserver로 뷰포트 진입 감지
		if ('IntersectionObserver' in window) {
			var scrollObserver = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						scrollObserver.unobserve(entry.target);
					}
				});
			}, {
				rootMargin: '0px 0px -60px 0px',
				threshold: 0.1
			});

			elements.forEach(function (el) {
				scrollObserver.observe(el);
			});
		} else {
			// IntersectionObserver 미지원 시 즉시 표시
			elements.forEach(function (el) {
				el.classList.add('is-visible');
			});
		}
	})();

})(jQuery);