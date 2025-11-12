$(function() {
    
    "use strict";
    
    // 브라우저의 스크롤 복원 기능 비활성화
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    //===== Force close mobile menu on page load
    function closeMobileMenu() {
        if ($(window).width() < 992) {
            var $menu = $('#navbarSupportedContent');
            var menuEl = $menu[0];
            
            // 메뉴 요소가 존재하는지 확인
            if (!menuEl) {
                return;
            }
            
            // show 클래스 제거
            $menu.removeClass('show');
            
            // 모든 인라인 스타일을 강제로 설정
            menuEl.style.setProperty('display', 'none', 'important');
            menuEl.style.setProperty('visibility', 'hidden', 'important');
            menuEl.style.setProperty('opacity', '0', 'important');
            menuEl.style.setProperty('height', '0', 'important');
            menuEl.style.setProperty('max-height', '0', 'important');
            menuEl.style.setProperty('overflow', 'hidden', 'important');
            menuEl.style.setProperty('padding', '0', 'important');
            menuEl.style.setProperty('background-color', 'transparent', 'important');
            
            // 햄버거 버튼의 active 클래스도 제거
            $('.navbar-toggler').removeClass('active');
        }
    }
    
    //===== Open mobile menu
    function openMobileMenu() {
        if ($(window).width() < 992) {
            var $menu = $('#navbarSupportedContent');
            var menuEl = $menu[0];
            
            if (menuEl) {
                $menu.addClass('show');
                // Use setProperty with important flag
                menuEl.style.setProperty('display', 'block', 'important');
                menuEl.style.setProperty('visibility', 'visible', 'important');
                menuEl.style.setProperty('opacity', '1', 'important');
                menuEl.style.setProperty('height', 'auto', 'important');
                menuEl.style.setProperty('max-height', 'none', 'important');
                menuEl.style.setProperty('overflow', 'visible', 'important');
                menuEl.style.setProperty('background-color', '#fff', 'important');
                menuEl.style.setProperty('padding', '15px 12px', 'important');
            }
        }
    }
    
    // 헤더가 로드될 때까지 대기하는 함수
    function waitForMenuAndClose() {
        var $menu = $('#navbarSupportedContent');
        if ($menu.length > 0 && $menu[0]) {
            // 메뉴가 로드되었으면 닫기
            closeMobileMenu();
        } else {
            // 아직 로드되지 않았으면 다시 시도
            setTimeout(waitForMenuAndClose, 50);
        }
    }
    
    // Close menu on DOM ready
    $(document).ready(function() {
        waitForMenuAndClose();
    });
    
    //===== Prealoder
    
    $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut(500);
        // Ensure menu is closed after page load
        waitForMenuAndClose();
    });
    
    // Close menu after a short delay to override Bootstrap
    setTimeout(function() {
        waitForMenuAndClose();
    }, 200);
    
    setTimeout(function() {
        waitForMenuAndClose();
    }, 600);
    
    // Override Bootstrap's collapse toggle for mobile
    // 이벤트 위임을 사용하여 동적으로 로드된 요소에도 작동하도록 함
    $(document).on('click', '.navbar-toggler', function(e) {
        if ($(window).width() < 992) {
            var $target = $('#navbarSupportedContent');
            var $toggler = $(this);
            
            // 메뉴 요소가 존재하는지 확인
            if ($target.length === 0 || !$target[0]) {
                return;
            }
            
            // Prevent Bootstrap's default behavior
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            // 현재 메뉴 상태 확인
            var isOpen = $target.hasClass('show') || $target[0].style.display === 'block';
            
            if (isOpen) {
                // Menu is open, close it
                closeMobileMenu();
                $toggler.removeClass('active');
            } else {
                // Menu is closed, open it
                openMobileMenu();
                $toggler.addClass('active');
            }
            
            return false;
        }
    });
    
    // Bootstrap collapse 이벤트 차단 (모바일에서만)
    $(document).on('show.bs.collapse', '#navbarSupportedContent', function(e) {
        if ($(window).width() < 992) {
            // 우리가 직접 제어하므로 Bootstrap의 기본 동작은 막지 않음
            // 단, 이미 열려있으면 막음
            var $target = $(this);
            if ($target.hasClass('show')) {
                e.preventDefault();
                return false;
            }
        }
    });
    
    $(document).on('hide.bs.collapse', '#navbarSupportedContent', function(e) {
        if ($(window).width() < 992) {
            // 우리가 직접 제어하므로 Bootstrap의 기본 동작은 막지 않음
        }
    });
    
    // 메뉴 외부 클릭 시 메뉴 닫기
    $(document).on('click', function(e) {
        if ($(window).width() < 992) {
            var $target = $('#navbarSupportedContent');
            var $toggler = $('.navbar-toggler');
            
            // 메뉴나 토글 버튼 외부를 클릭한 경우
            if ($target.length > 0) {
                var isOpen = $target.hasClass('show') || $target[0].style.display === 'block';
                if (isOpen) {
                    if (!$(e.target).closest('#navbarSupportedContent').length && 
                        !$(e.target).closest('.navbar-toggler').length) {
                        closeMobileMenu();
                        $toggler.removeClass('active');
                    }
                }
            }
        }
    });
    
    
    //===== Sticky

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        var $navbar = $(".header_navbar");
        var $logo = $(".navbar-brand img");
        
        // 로고 요소가 존재하는지 확인
        if ($logo.length === 0 || !$logo.attr('src')) {
            return;
        }
        
        var currentSrc = $logo.attr('src');
        
        if (scroll < 20) {
            $navbar.removeClass("sticky");
            // 최상단일 때 logo3 사용
            var logo3Path = 'assets/images/logo3.png';
            if (currentSrc !== logo3Path && !currentSrc.includes('logo3')) {
                $logo.attr('src', logo3Path);
            }
        } else {
            $navbar.addClass("sticky");
            // 스크롤 내렸을 때 logo.png 사용
            var logoPath = 'assets/images/logo.png';
            if (currentSrc !== logoPath && !currentSrc.includes('logo.png')) {
                $logo.attr('src', logoPath);
            }
        }
    });
    
    // 페이지 로드 시 스크롤을 최상단으로 이동
    $(window).on('load', function() {
        window.scrollTo(0, 0);
        $('html, body').scrollTop(0);
    });
    
    // 모든 링크 클릭 시 스크롤을 최상단으로 이동 (페이지 간 이동 링크만)
    $(document).on('click', 'a[href]', function(e) {
        var href = $(this).attr('href');
        // 같은 페이지 내 앵커 링크(#로 시작)는 제외
        if (href && href.indexOf('#') === 0) {
            return; // 앵커 링크는 그대로 동작
        }
        // JavaScript 링크나 빈 링크는 제외
        if (href && href !== '#' && href !== 'javascript:void(0)' && href.indexOf('javascript:') !== 0) {
            // 페이지 간 이동 링크인 경우
            if (href.indexOf('http') !== 0 || href.indexOf(window.location.origin) === 0) {
                // 링크 이동 전에 스크롤을 최상단으로 저장
                // 실제 이동은 브라우저가 처리하므로, 새 페이지 로드 시 스크롤이 최상단이 되도록 함
                sessionStorage.setItem('scrollToTop', 'true');
            }
        }
    });
    
    // 페이지 로드 시 초기 로고 설정
    $(document).ready(function() {
        // 스크롤을 최상단으로 이동
        window.scrollTo(0, 0);
        $('html, body').scrollTop(0);
        
        // sessionStorage에서 스크롤 최상단 플래그 확인
        if (sessionStorage.getItem('scrollToTop') === 'true') {
            window.scrollTo(0, 0);
            $('html, body').scrollTop(0);
            sessionStorage.removeItem('scrollToTop');
        }
        
        var scroll = $(window).scrollTop();
        var $logo = $(".navbar-brand img");
        
        // 로고 요소가 존재하는지 확인
        if ($logo.length === 0) {
            return;
        }
        
        if (scroll < 20) {
            $logo.attr('src', 'assets/images/logo3.png');
        } else {
            $logo.attr('src', 'assets/images/logo.png');
        }
    });
    
    
    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset().top - 73;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });
    
    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });
    
    
    //===== Counter Up
    
    $('.counter').counterUp({
        delay: 10,
        time: 3000
    });
    
    
    
    //===== Back to top
    
    // Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('.back-to-top').fadeIn(200)
        } else{
            $('.back-to-top').fadeOut(200)
        }
    });
    
    
    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    
    
    //===== Nice Select
    
    $('select').niceSelect();
    
    
    //=====  WOW active
    
    var wow = new WOW({
        boxClass: 'wow', //
        mobile: false, // 
    })
    wow.init();
    
    
    
    
    
    
    
    
    
    
    
});