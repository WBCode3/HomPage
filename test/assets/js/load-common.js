/**
 * Load common header and footer
 */
(function() {
    'use strict';
    
    // Get current page name from URL
    function getCurrentPage() {
        var path = window.location.pathname;
        var page = path.split("/").pop() || 'index.html';
        page = page.replace('.html', '');
        return page === '' || page === 'index' ? 'index' : page;
    }
    
    // Set active menu item
    function setActiveMenu() {
        var currentPage = getCurrentPage();
        var navItems = document.querySelectorAll('#nav .nav-item');
        navItems.forEach(function(item) {
            var dataPage = item.getAttribute('data-page');
            if (dataPage === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Get base path from current page location
    function getBasePath() {
        var path = window.location.pathname;
        var pathParts = path.split('/');
        // Remove filename and get directory
        pathParts.pop();
        var basePath = pathParts.join('/');
        // If empty, it's root
        return basePath || '';
    }
    
    // Load header
    function loadHeader() {
        var headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            var basePath = getBasePath();
            var headerPath = basePath + (basePath ? '/' : '') + 'common/header.html';
            fetch(headerPath)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(function(html) {
                    headerPlaceholder.innerHTML = html;
                    setActiveMenu();
                    // Re-initialize Bootstrap collapse if needed
                    if (typeof $ !== 'undefined' && $.fn.collapse) {
                        $('#navbarSupportedContent').collapse();
                    }
                })
                .catch(function(error) {
                    console.error('Error loading header:', error);
                });
        }
    }
    
    // Load footer
    function loadFooter() {
        var footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            var basePath = getBasePath();
            var footerPath = basePath + (basePath ? '/' : '') + 'common/footer.html';
            fetch(footerPath)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(function(html) {
                    footerPlaceholder.innerHTML = html;
                })
                .catch(function(error) {
                    console.error('Error loading footer:', error);
                });
        }
    }
    
    // Load common parts when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadHeader();
            loadFooter();
        });
    } else {
        loadHeader();
        loadFooter();
    }
})();

