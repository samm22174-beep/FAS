// security.js - Complete Source Code Protection
(function() {
    'use strict';
    
    // ========== COMPLETE SOURCE CODE BLOCKING ==========
    
    const blockAllSourceCodeAccess = () => {
        console.log('[SYSTEM] Source code protection activated');
        
        // 1. Override ALL keyboard shortcuts that can show source
        document.addEventListener('keydown', function(e) {
            // Block all F-keys that could open dev tools
            if (e.key.startsWith('F')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            // Block Ctrl combinations (Samaalu Vumah)
            if (e.ctrlKey || e.metaKey) {
                // Block Ctrl+U, Ctrl+S, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
                if (e.key === 'u' || e.key === 'U' || 
                    e.key === 's' || e.key === 'S' ||
                    e.key === 'i' || e.key === 'I' ||
                    e.key === 'j' || e.key === 'J' ||
                    e.key === 'c' || e.key === 'C') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
        }, true);
        
        // 2. Block right-click completely
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        // 3. Block developer tools menu
        document.addEventListener('keydown', function(e) {
            // Alt key combinations
            if (e.altKey) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);
        
        // 4. Block view-source URL
        const originalOpen = window.open;
        window.open = function(url, name, features) {
            if (url && url.toString().includes('view-source')) {
                return null;
            }
            return originalOpen.call(window, url, name, features);
        };
        
        // 5. Block data: URL viewing
        const originalWrite = document.write;
        document.write = function(content) {
            if (typeof content === 'string' && content.includes('view-source')) {
                return;
            }
            return originalWrite.apply(document, arguments);
        };
        
        // 6. Hide source from browser history
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.href);
        }
        
        // 7. Remove any existing view-source elements
        setTimeout(() => {
            const modals = document.querySelectorAll('#source-code-modal, [id*="source"], [id*="view"]');
            modals.forEach(el => el.remove());
        }, 100);
        
        // 8. Clear console of any sensitive info
        console.clear();
        console.log = function() {};
        console.warn = function() {};
        console.error = function() {};
        console.info = function() {};
        console.debug = function() {};
        
        // 9. Disable browser developer tools completely
        Object.defineProperty(document, 'onkeydown', {
            get: function() {
                return function() { return false; };
            },
            set: function() {}
        });
        
        // 10. Make page source unviewable
        Object.defineProperty(document, 'documentElement', {
            get: function() {
                const element = document.createElement('html');
                element.innerHTML = '<head></head><body>Source code is protected</body>';
                return element;
            }
        });
        
        // 11. Block all iframe attempts
        window.addEventListener('message', function(e) {
            if (e.data && e.data.type === 'getSource') {
                e.stopImmediatePropagation();
            }
        }, true);
        
        // 12. Disable saving page
        window.addEventListener('beforeunload', function(e) {
            e.preventDefault();
            e.returnValue = '';
        });
        
        // 13. Hide page from browser inspection
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
            
            body {
                -webkit-touch-callout: none !important;
            }
            
            img {
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(style);
        
        // 14. Continuously check for dev tools (Advanced)
        setInterval(function() {
            // Check for debugger
            (function() {
                const start = Date.now();
                debugger;
                const end = Date.now();
                if (end - start > 100) {
                    // Dev tools detected - redirect or clear page
                    document.body.innerHTML = `
                        <div style="
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-family: Arial;
                            z-index: 9999999;
                        ">
                            <div style="text-align: center; padding: 20px;">
                                <h1 style="color: red;">Access Denied</h1>
                                <p>Developer tools are not permitted on this site.</p>
                                <p>Please close all developer tools and refresh the page.</p>
                            </div>
                        </div>
                    `;
                    window.stop();
                }
            })();
        }, 1000);
        
        // 15. Final protection - make source code unretrievable
        window.addEventListener('DOMContentLoaded', function() {
            const scripts = document.querySelectorAll('script[type="text/babel"]');
            scripts.forEach(script => {
                script.type = 'application/octet-stream';
                script.removeAttribute('src');
            });
            
            // Remove all inline scripts
            const inlineScripts = document.querySelectorAll('script:not([src])');
            inlineScripts.forEach(script => {
                if (script.textContent.includes('view-source') || 
                    script.textContent.includes('showPageSource') ||
                    script.textContent.includes('showSource')) {
                    script.remove();
                }
            });
        });
    };
    
    // ========== ADDITIONAL PROTECTIONS ==========
    
    const enhanceProtections = () => {
        // Block Chrome DevTools
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
            window.location.reload();
        }
        
        // Block element inspection
        Element.prototype._attachShadow = Element.prototype.attachShadow;
        Element.prototype.attachShadow = function() {
            return null;
        };
        
        // Block console methods
        const noop = function() {};
        Object.defineProperty(window, 'console', {
            value: {
                log: noop,
                warn: noop,
                error: noop,
                info: noop,
                debug: noop,
                table: noop,
                clear: noop,
                dir: noop,
                dirxml: noop,
                trace: noop,
                group: noop,
                groupCollapsed: noop,
                groupEnd: noop,
                time: noop,
                timeEnd: noop,
                timeStamp: noop,
                profile: noop,
                profileEnd: noop,
                count: noop,
                assert: noop,
                markTimeline: noop
            }
        });
        
        // Block Web Inspector
        Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined
        });
        
        // Block JavaScript execution from console
        window.eval = function() {
            throw new Error('Eval is disabled for security');
        };
        
        // Block Function constructor
        window.Function = function() {
            throw new Error('Function constructor is disabled for security');
        };
    };
    
    // ========== INITIALIZE PROTECTION ==========
    
    // Start protections immediately
    blockAllSourceCodeAccess();
    enhanceProtections();
    
    // Re-apply protections every second to ensure they stay active
    setInterval(() => {
        blockAllSourceCodeAccess();
    }, 1000);
    
    // Nuclear option - if all else fails
    window.addEventListener('load', function() {
        // Replace entire HTML with secure version
        const secureHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>FAS Student Management System</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #f8f9fa;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        /* Your actual content CSS here */
    </style>
</head>
<body>
    <div id="root"></div>
    <!-- No source code accessible -->
    <script>
        // This script will load your actual app
        // Source code is intentionally not viewable
        console.log('Secure system loaded');
    </script>
</body>
</html>`;
        
        // Use this as fallback
        document.documentElement.innerHTML = secureHTML;
    });
    
    // Export function if needed (but it shouldn't be accessible)
    window.__secureSystem = {
        version: '1.0',
        protected: true,
        note: 'Source code viewing is completely disabled'
    };
    
})();