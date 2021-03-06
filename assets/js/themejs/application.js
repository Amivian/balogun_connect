$(document).ready(function(){
	
/* ---------------------------------------------------
	Magnific Popup
-------------------------------------------------- */
    $('.image-popup').magnificPopup({
	  type: 'image',
	  closeOnContentClick: true,
	  image: {
		verticalFit: false
	  }
	});
	$('.blog-listitem').magnificPopup({
	  delegate: '.popup-gallery',
	  type: 'image',
	  tLoading: 'Loading image #%curr%...',
	  mainClass: 'mfp-img-mobile',
	  gallery: {
		enabled: true,
		navigateByImgClick: true,
		preload: [0,1] // Will preload 0 - before current, and 1 after the current image
	  },
	  image: {
		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		titleSrc: function(item) {
		  return item.el.attr('title') ;
		}
	  }
	});
	
	
/* ---------------------------------------------------
	Quick View
-------------------------------------------------- */
	
	$('.iframe-link').magnificPopup({
		type:'iframe',
	    fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
		closeOnContentClick: true,
        preloader: true,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
		//gallery: {  enabled: true }
    });
	
	
/* ---------------------------------------------------
	Social Widgets Accounts
-------------------------------------------------- */

jQuery(function ($) {
    "use strict";
    var socialItems = $('.social-widgets .items .item');
    var counter = 0;
    socialItems.each(function () {
        counter++;
        var itemclass = "item-0" + counter;
        $(this).addClass(itemclass)
    });
});

jQuery(function ($) {
    "use strict";
    $(".social-widgets .item").each(function () {
        var $this = $(this),
            timer;
        $this.on("mouseenter", function () {
            var $this = $(this);
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $this.addClass("active")
            }, 200)
        }).on("mouseleave", function () {
            var $this = $(this);
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $this.removeClass("active")
            }, 100)
        }).on("click", function (e) {
            e.preventDefault()
        })
    })
});

jQuery(function ($) {
    "use strict";
    var loadmap = $(".social-widgets .item a");
    loadmap.click(function (e) {
        e.preventDefault()
    });
    loadmap.hover(function (e) {
		
        if (!$(this).parent().hasClass("load")) {
            var loadcontainer = $(this).parent().find(".loading");
            $.ajax({
                url: $(this).attr("href"),
                cache: false,
                success: function (data) {
					
                    setTimeout(function () {
                        loadcontainer.html(data)
                    }, 1000)
                }
			
            });
            $(this).parent().addClass("load")
        }
    })
});

				
/* ---------------------------------------------------
	Range slider && Filter  Reset
-------------------------------------------------- */
if($('#slider').length){
	window.startRangeValues = [28.00, 562.00];
	$('#slider').slider({

		range : true,
		min : 10.00,
		max : 580.00,
		values : window.startRangeValues,
		step : 0.01,

		slide : function(event, ui){

			var min = ui.values[0].toFixed(2),
				max = ui.values[1].toFixed(2),
				range = $(this).siblings('.range');


			range.children('.min_value').val(min).next().val(max);

			range.children('.min_val').text('$' + min).next().text('$' + max);

		},

		create : function(event, ui){

			var $this = $(this),
				min = $this.slider("values", 0).toFixed(2),
				max = $this.slider("values", 1).toFixed(2),
				range = $this.siblings('.range');

			range.children('.min_value').val(min).next().val(max);

			range.children('.min_val').text('$' + min).next().text('$' + max);
			
		}

	});

}

	if(!window.startRangeValues) return;
		var startValues = window.startRangeValues,
			min = startValues[0].toFixed(2),
			max = startValues[1].toFixed(2);
		$('.filter_reset').on('click', function(){

			var form = $(this).closest('form'),
				range = form.find('.range');

				console.log(startValues);

			// form.find('#slider').slider('option','values', startValues);

			form.find('#slider').slider('values', 0, min);
			form.find('#slider').slider('values', 1, max);

			form.find('.options_list').children().eq(0).children().trigger('click');

			range.children('.min_value').val(min).next().val(max);

			range.children('.min_val').text('$' + min).next().text('$' + max);

		});

	

});


/* ---------------------------------------------------
	Quantity minus and plus
-------------------------------------------------- */
$(function ($) {
    "use strict";
	//Quantity plus minus 
    $.initQuantity = function ($control) {
        $control.each(function () {
            var $this = $(this),
                data = $this.data("inited-control"),
                $plus = $(".input-group-addon:last", $this),
                $minus = $(".input-group-addon:first", $this),
                $value = $(".form-control", $this);
            if (!data) {
                $control.attr("unselectable", "on").css({
                    "-moz-user-select": "none",
                    "-o-user-select": "none",
                    "-khtml-user-select": "none",
                    "-webkit-user-select": "none",
                    "-ms-user-select": "none",
                    "user-select": "none"
                }).bind("selectstart", function () {
                    return false
                });
                $plus.click(function () {
                    var val =
                        parseInt($value.val()) + 1;
                    $value.val(val);
                    return false
                });
                $minus.click(function () {
                    var val = parseInt($value.val()) - 1;
                    $value.val(val > 0 ? val : 1);
                    return false
                });
                $value.blur(function () {
                    var val = parseInt($value.val());
                    $value.val(val > 0 ? val : 1)
                })
            }
        })
    };
    $.initQuantity($(".quantity-control"));
    $.initSelect = function ($select) {
        $select.each(function () {
            var $this = $(this),
                data = $this.data("inited-select"),
                $value = $(".value", $this),
                $hidden = $(".input-hidden", $this),
                $items = $(".dropdown-menu li > a", $this);
            if (!data) {
                $items.click(function (e) {
                    if ($(this).closest(".sort-isotope").length >
                        0) e.preventDefault();
                    var data = $(this).attr("data-value"),
                        dataHTML = $(this).html();
                    $this.trigger("change", {
                        value: data,
                        html: dataHTML
                    });
                    $value.html(dataHTML);
                    if ($hidden.length) $hidden.val(data)
                });
                $this.data("inited-select", true)
            }
        })
    };
    $.initSelect($(".btn-select"));
	
	if(!window.startRangeValues) return;
	var startValues = window.startRangeValues,
		min = startValues[0].toFixed(2),
		max = startValues[1].toFixed(2);

	$('.filter_reset').on('click', function(){

		var form = $(this).closest('form'),
			range = form.find('.range');

			console.log(startValues);

		// form.find('#slider').slider('option','values', startValues);

		form.find('#slider').slider('values', 0, min);
		form.find('#slider').slider('values', 1, max);

		form.find('.options_list').children().eq(0).children().trigger('click');

		range.children('.min_value').val(min).next().val(max);

		range.children('.min_val').text('$' + min).next().text('$' + max);

	});
	
	
});

/* ---------------------------------------------------
	Page About Us
-------------------------------------------------- */
$(document).ready(function() {
	$('#ytcs579bfc965e489183711469840534').each(function() {
		var slider = $(this),
			data = slider.data();
		// Remove unwanted br's
		slider.children(':not(.yt-content-slide)').remove();
		// Apply Owl Carousel
		slider.owlCarousel2({
			mouseDrag: true,
			video: true,
			lazyLoad: (data.lazyload == 'yes') ? true : false,
			autoplay: (data.autoplay == 'yes') ? true : false,
			autoHeight: (data.autoheight == 'yes') ? true : false,
			autoplayTimeout: data.delay * 1000,
			smartSpeed: data.speed * 1000,
			autoplayHoverPause: (data.hoverpause == 'yes') ? true : false,
			center: (data.center == 'yes') ? true : false,
			loop: (data.loop == 'yes') ? true : false,
			dots: (data.pagination == 'yes') ? true : false,
			nav: (data.arrows == 'yes') ? true : false,
			margin: data.margin,
			navText: ['next', 'prev'],
			responsive: {
				0: {
					items: data.item_xs
				},
				768: {
					items: data.item_sm
				},
				992: {
					items: data.item_lg
				}
			},
		});

	});
	$('#ytcs579bfc965e78d103041469840534').each(function() {
		var slider = $(this),
			panels = slider.children('div'),
			data = slider.data();

		// Remove unwanted br's
		slider.children(':not(.yt-content-slide)').remove();
		// Apply Owl Carousel
		slider.owlCarousel2({
			
			mouseDrag: true,
			video: true,
			lazyLoad: (data.lazyload == 'yes') ? true : false,
			autoplay: (data.autoplay == 'yes') ? true : false,
			autoHeight: (data.autoheight == 'yes') ? true : false,
			autoplayTimeout: data.delay * 1000,
			smartSpeed: data.speed * 1000,
			autoplayHoverPause: (data.hoverpause == 'yes') ? true : false,
			center: (data.center == 'yes') ? true : false,
			loop: (data.loop == 'yes') ? true : false,
			dots: (data.pagination == 'yes') ? true : false,
			nav: (data.arrows == 'yes') ? true : false,
			margin: data.margin,
			navText: ['next', 'prev'],
			responsive: {
				0: {
					items: data.item_xs
				},
				768: {
					items: data.item_sm
				},
				992: {
					items: data.item_lg
				}
			},
		});

	});
	$('#ytcs579c07146430563341469843220').each(function() {
		var slider = $(this),
			panels = slider.children('div'),
			data = slider.data();

		// Remove unwanted br's
		slider.children(':not(.yt-content-slide)').remove();
		// Apply Owl Carousel
		slider.owlCarousel2({

			mouseDrag: true,
			video: true,
			lazyLoad: (data.lazyload == 'yes') ? true : false,
			autoplay: (data.autoplay == 'yes') ? true : false,
			autoHeight: (data.autoheight == 'yes') ? true : false,
			autoplayTimeout: data.delay * 1000,
			smartSpeed: data.speed * 1000,
			autoplayHoverPause: (data.hoverpause == 'yes') ? true : false,
			center: (data.center == 'yes') ? true : false,
			loop: (data.loop == 'yes') ? true : false,
			dots: (data.pagination == 'yes') ? true : false,
			nav: (data.arrows == 'yes') ? true : false,
			margin: data.margin,
			navText: ['next', 'prev'],
			responsive: {
				0: {
					items: data.item_xs
				},
				768: {
					items: data.item_sm
				},
				992: {
					items: data.item_lg
				}
			},
		});

	});
	
	$('#ytcs579c07146456674551469843220').each(function() {
		var slider = $(this),
			panels = slider.children('div'),
			data = slider.data();

		// Remove unwanted br's
		slider.children(':not(.yt-content-slide)').remove();
		// Apply Owl Carousel
		slider.owlCarousel2({

			mouseDrag: true,
			video: true,
			lazyLoad: (data.lazyload == 'yes') ? true : false,
			autoplay: (data.autoplay == 'yes') ? true : false,
			autoHeight: (data.autoheight == 'yes') ? true : false,
			autoplayTimeout: data.delay * 1000,
			smartSpeed: data.speed * 1000,
			autoplayHoverPause: (data.hoverpause == 'yes') ? true : false,
			center: (data.center == 'yes') ? true : false,
			loop: (data.loop == 'yes') ? true : false,
			dots: (data.pagination == 'yes') ? true : false,
			nav: (data.arrows == 'yes') ? true : false,
			margin: data.margin,
			navText: ['next', 'prev'],
			responsive: {
				0: {
					items: data.item_xs
				},
				768: {
					items: data.item_sm
				},
				992: {
					items: data.item_lg
				}
			},
		});

	});
	$('#ytcs579c0714641b9213691469843220').each(function() {
		var slider = $(this),
			panels = slider.children('div'),
			data = slider.data();

		// Remove unwanted br's
		slider.children(':not(.yt-content-slide)').remove();
		// Apply Owl Carousel
		slider.owlCarousel2({

			mouseDrag: true,
			video: true,
			lazyLoad: (data.lazyload == 'yes') ? true : false,
			autoplay: (data.autoplay == 'yes') ? true : false,
			autoHeight: (data.autoheight == 'yes') ? true : false,
			autoplayTimeout: data.delay * 1000,
			smartSpeed: data.speed * 1000,
			autoplayHoverPause: (data.hoverpause == 'yes') ? true : false,
			center: (data.center == 'yes') ? true : false,
			loop: (data.loop == 'yes') ? true : false,
			dots: (data.pagination == 'yes') ? true : false,
			nav: (data.arrows == 'yes') ? true : false,
			margin: data.margin,
			navText: ['next', 'prev'],
			responsive: {
				0: {
					items: data.item_xs
				},
				768: {
					items: data.item_sm
				},
				992: {
					items: data.item_lg
				}
			},
		});

	});
});


function display(view) {
		$('.products-list').removeClass('list grid').addClass(view);
		$('.list-view .btn').removeClass('active');
		if(view == 'list') {
			$('.products-list .product-layout').addClass('col-lg-12');
			$('.products-list .product-layout .left-block').addClass('col-md-4');
			$('.products-list .product-layout .right-block').addClass('col-md-8');
			$('.products-list .product-layout .item-desc').removeClass('hidden')
			$('.list-view .' + view).addClass('active');
			$.cookie('display', 'list'); 
		}else{
			$('.products-list .product-layout').removeClass('col-lg-12');
			$('.products-list .product-layout .left-block').removeClass('col-md-4');
			$('.products-list .product-layout .right-block').removeClass('col-md-8');
			$('.products-list .product-layout .item-desc').addClass('hidden');
			$('.list-view .' + view).addClass('active');
			$.cookie('display', 'grid');
		}
	}
	
	// $(document).ready(function () {
	// 	// Check if Cookie exists
	// 	if($.cookie('display')){
	// 		view = $.cookie('display');
	// 	}else{
	// 		view = 'grid' ;
	// 	}
	// 	if(view) display(view);
		
	// 	// Click Button
	// 	$('.list-view .btn').each(function() {
	// 		var ua = navigator.userAgent,
	// 		event = (ua.match(/iPad/i)) ? 'touchstart' : 'click';
	// 		$(this).bind(event, function() {
	// 			$(this).addClass(function() {
	// 				if($(this).hasClass('active')) return ''; 
	// 				return 'active';
	// 			});
	// 			$(this).siblings('.btn').removeClass('active');
	// 			$catalog_mode = $(this).data('view');
	// 			display($catalog_mode);
	// 		});
			
	// 	});
	// });

/* ---------------------------------------------------
	Page Product Detail
-------------------------------------------------- */
/* ---------------------------------------------------
	Page Product Detail
-------------------------------------------------- */
$(document).ready(function($) {
	$('.related-products').owlCarousel2({
		pagination: false,
		center: false,
		nav: true,
		dots: false,
		loop: true,
		margin: 25,
		navText: [ 'prev', 'next' ],
		slideBy: 1,
		autoplay: false,
		autoplayTimeout: 2500,
		autoplayHoverPause: true,
		autoplaySpeed: 800,
		startPosition: 0, 
		responsive:{
			0:{
				items:1
			},
			480:{
				items:1
			},
			768:{
				items:2
			},
			1024:{
				items:3
			},
			1200:{
				items:4
			}
		}
	});	 

	//Client Say
	/*$('.slider-clients-say').owlCarousel2({
		pagination: false,
		center: false,
		nav: true,
		loop: false,
		margin: 25,
		navText: [ 'prev', 'next' ],
		slideBy: 1,
		autoplay: false,
		autoplayTimeout: 2500,
		autoplayHoverPause: true,
		autoplaySpeed: 800,
		startPosition: 0, 
		responsive:{
			0:{
				items:1
			},
			480:{
				items:1
			},
			768:{
				items:1
			},
			1200:{
				items:1
			}
		}
	});	 */
});

$(document).ready(function() {
	var $nav = $("#thumb-slider");
	$nav.each(function() {
		$(this).owlCarousel2({
			nav: true,
			dots: false,
			slideBy: 1,
			margin: 10,
			responsive: {
				0: {
					items: 2
				},
				600: {
					items: 3
				},
				1000: {
					items: 3
				}
			}
		});
	})
	
	var zoomCollection = '.large-image img';
	$( zoomCollection ).elevateZoom({
		zoomType    : "inner",
		lensSize    :"200",
		easing:true,
		gallery:'thumb-slider',
		cursor: 'pointer',
		loadingIcon: '../html/image/theme/lazy-loader.gif',
		galleryActiveClass: "active"
	});
	$('.large-image').magnificPopup({
		items: [
			{src: 'image/demo/shop/product/J9.jpg' },
			{src: 'image/demo/shop/product/J6.jpg' },
			{src: 'image/demo/shop/product/J5.jpg' },
			{src: 'image/demo/shop/product/J4.jpg' },
		],
		gallery: { enabled: true, preload: [0,2] },
		type: 'image',
		mainClass: 'mfp-fade',
		callbacks: {
			open: function() {
				
				var activeIndex = parseInt($('#thumb-slider .img.active').attr('data-index'));
				var magnificPopup = $.magnificPopup.instance;
				magnificPopup.goTo(activeIndex);
			}
		}
	});
	$("#thumb-slider .owl2-item").each(function() {
		$(this).find("[data-index='0']").addClass('active');
	});
	
	// $('.thumb-video').magnificPopup({
	//   type: 'iframe',
	//   iframe: {
	// 	patterns: {
	// 	   youtube: {
	// 		  index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
	// 		  id: 'v=', // String that splits URL in a two parts, second part should be %id%
	// 		  src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
	// 			},
	// 		}
	// 	}
	// });
	$('.product-options li.radio').click(function(){
		$(this).addClass(function() {
			if($(this).hasClass("active")) return "";
			return "active";
		});
		
		$(this).siblings("li").removeClass("active");
		$(this).parent().find('.selected-option').html('<span class="label label-success">'+ $(this).find('img').data('original-title') +'</span>');
	});
	// Product detial reviews button
	$(".reviews_button,.write_review_button").click(function (){
		var tabTop = $(".producttab").offset().top;
		$("html, body").animate({ scrollTop:tabTop }, 1000);
	});
	
	//Client Say
	/*$('.slider-clients-say').owlCarousel2({
		pagination: false,
		center: false,
		nav: true,
		loop: false,
		margin: 25,
		navText: [ 'prev', 'next' ],
		slideBy: 1,
		autoplay: false,
		autoplayTimeout: 2500,
		autoplayHoverPause: true,
		autoplaySpeed: 800,
		startPosition: 0, 
		responsive:{
			0:{
				items:1
			},
			480:{
				items:1
			},
			768:{
				items:1
			},
			1200:{
				items:1
			}
		}
	});	 */
});
	