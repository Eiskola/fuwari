// custom context menu
(function () {
    'use strict';

    // 配置项
    var MENU_ID = 'fuwari-context-menu';
    var MENU_ITEM_CLASS = 'fuwari-context-item';

    function createMenu() {
        var menu = document.createElement('div');
        menu.id = MENU_ID;
        Object.assign(menu.style, {
            position: 'fixed',
            zIndex: 99999,
            minWidth: '220px',
            background: 'var(--context-bg, linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,250,0.95)))',
            color: 'var(--context-fg, #111827)',
            borderRadius: '12px',
            boxShadow: '0 12px 40px rgba(2,6,23,0.20)',
            padding: '8px',
            display: 'none',
            fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            fontSize: '14px',
            backdropFilter: 'saturate(140%) blur(8px)',
            border: '1px solid rgba(0,0,0,0.04)',
            transition: 'transform 140ms cubic-bezier(.2,.9,.2,1), opacity 120ms ease'
        });

        var items = [
            { id: 'copy', label: '复制' , desc: '复制选中或链接' },
            { id: 'search', label: '搜索', desc: '用选中文本在新标签页搜索' },
            { id: 'share', label: '分享文章', desc: '复制文章链接并提示' },
            { id: 'open-link', label: '新标签页打开', desc: '在新标签页打开此链接', onlyLink: true },
            { id: 'copy-link', label: '复制链接地址', desc: '复制此链接到剪贴板', onlyLink: true }
        ];

        items.forEach(function (it) {
            var el = document.createElement('div');
            el.className = MENU_ITEM_CLASS;
            el.setAttribute('role', 'menuitem');
            el.setAttribute('tabindex', '0');
            el.dataset.action = it.id;
            if (it.onlyLink) el.style.display = 'none'; // 默认隐藏，仅在链接右键时显示
            Object.assign(el.style, {
                display: el.style.display || 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
            });

            // icon container (gradient background + SVG icon)
            var icon = document.createElement('div');
            icon.style.width = '18px';
            icon.style.height = '18px';
            icon.style.flex = '0 0 18px';
            icon.style.borderRadius = '6px';
            icon.style.display = 'inline-flex';
            icon.style.alignItems = 'center';
            icon.style.justifyContent = 'center';
            icon.style.background = 'linear-gradient(135deg, var(--context-icon1, #7c3aed), var(--context-icon2, #06b6d4))';
            icon.style.boxShadow = 'inset 0 -1px 0 rgba(0,0,0,0.08)';

            var labelWrap = document.createElement('div');
            var label = document.createElement('div');
            label.textContent = it.label;
            label.style.fontWeight = '600';
            var desc = document.createElement('div');
            desc.textContent = it.desc;
            desc.style.fontSize = '12px';
            desc.style.opacity = '0.7';

            labelWrap.appendChild(label);
            labelWrap.appendChild(desc);

            // set SVG by action
            var svg = '';
            switch (it.id) {
                case 'copy':
                    svg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"/></svg>';
                    break;
                case 'search':
                    svg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20l-5.99-6zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/></svg>';
                    break;
                case 'share':
                    svg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.3 3.3 0 0 0 0-1.41l7.05-4.11A2.99 2.99 0 1 0 15 5a2.99 2.99 0 0 0 .04.5L8 9.6a3 3 0 1 0 0 4.8l7.05 4.11c-.05.23-.05.47-.05.69A3 3 0 1 0 18 16.08z"/></svg>';
                    break;
                case 'open-link':
                    svg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M14 3v2h3.59L7 15.59 8.41 17 19 6.41V10h2V3h-7z"/><path fill="white" d="M5 5v14h14v-7h-2v5H7V7h5V5H5z"/></svg>';
                    break;
                default:
                    svg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="6" fill="white"/></svg>';
            }
            icon.innerHTML = svg;
            el.appendChild(icon);
            el.appendChild(labelWrap);

            el.addEventListener('mouseenter', function () { el.style.background = 'var(--context-hover, rgba(0,0,0,0.04))'; el.style.transform = 'translateY(-1px)'; });
            el.addEventListener('mouseleave', function () { el.style.background = 'transparent'; el.style.transform = 'none'; });
            menu.appendChild(el);
        });

        // a subtle separator and small footer hint
    var footer = document.createElement('div');
        footer.style.fontSize = '12px';
        footer.style.opacity = '0.65';
        footer.style.padding = '6px 12px 4px';
        footer.textContent = '右键可在文章与链接上使用高级操作';
        menu.appendChild(footer);

        document.body.appendChild(menu);
        return menu;
    }

    function getThemeVars() {
        // 读取 body 的 data-theme 或类名（项目中的主题实现可能不同），然后返回用于菜单的 CSS 变量
        var theme = document.body.dataset.theme || document.documentElement.getAttribute('data-theme') || document.body.className || '';
        theme = (''+theme).toLowerCase();

        // 默认浅色样式
        var vars = {
            '--context-bg': 'rgba(255,255,255,0.95)',
            '--context-fg': '#111827',
            '--context-hover': 'rgba(0,0,0,0.06)'
        };

        // 简单规则：如果类名或 data-theme 包含 dark，则使用深色主题
        if (theme.indexOf('dark') !== -1 || document.documentElement.classList.contains('dark') || document.body.classList.contains('dark')) {
            vars['--context-bg'] = 'rgba(15,23,42,0.95)';
            vars['--context-fg'] = '#F8FAFC';
            vars['--context-hover'] = 'rgba(255,255,255,0.06)';
        }

        return vars;
    }

    function applyTheme(menu) {
        var vars = getThemeVars();
        Object.keys(vars).forEach(function (k) { menu.style.setProperty(k, vars[k]); });
        // icon gradient and toast colors
        // 优先使用项目 CSS 变量（如 --card-bg 或 --primary 或 --hue）来设置背景与渐变
        var root = getComputedStyle(document.documentElement);
        var cardBg = root.getPropertyValue('--card-bg');
        var primary = root.getPropertyValue('--primary');
        var hue = root.getPropertyValue('--hue');

        if (cardBg && cardBg.trim()) {
            // 使用变量引用，避免把复杂的值字面化
            menu.style.setProperty('--context-bg', 'var(--card-bg)');
        } else if (primary && primary.trim()) {
            menu.style.setProperty('--context-bg', 'var(--primary)');
        } else if (hue && hue.trim()) {
            menu.style.setProperty('--context-bg', 'oklch(0.95 0.02 var(--hue))');
        }

        // icon gradient 使用 --hue（如果存在），否则回退到默认渐变
        if (hue && hue.trim()) {
            menu.style.setProperty('--context-icon1', 'oklch(0.7 0.14 var(--hue))');
            menu.style.setProperty('--context-icon2', 'oklch(0.75 0.14 var(--hue))');
        } else {
            menu.style.setProperty('--context-icon1', '#7c3aed');
            menu.style.setProperty('--context-icon2', '#06b6d4');
        }

        // toast colors
        menu.style.setProperty('--context-toast-bg', 'rgba(0,0,0,0.8)');
        menu.style.setProperty('--context-toast-fg', '#fff');

        // 计算背景的可读性，设置文字颜色为黑或白
        try {
            var comp = getComputedStyle(menu).backgroundColor;
            if (comp && comp.indexOf('rgb') === 0) {
                var nums = comp.match(/rgba?\(([^)]+)\)/)[1].split(',').map(function (s) { return parseFloat(s.trim()); });
                var r = nums[0], g = nums[1], b = nums[2];
                var lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
                if (lum < 0.5) {
                    menu.style.color = '#fff';
                    menu.style.setProperty('--context-fg', '#fff');
                } else {
                    menu.style.color = '#111827';
                    menu.style.setProperty('--context-fg', '#111827');
                }
            }
        } catch (e) { /* ignore */ }
    }

    function openMenu(menu, x, y, target) {
        // 判断是否为链接
        var isLink = target && (target.tagName === 'A' || target.closest('a'));
        // 控制“新标签页打开”和“复制链接地址”菜单项显示与可用状态
        var openLinkItem = menu.querySelector('[data-action="open-link"]');
        var copyLinkItem = menu.querySelector('[data-action="copy-link"]');
        if (openLinkItem) {
            openLinkItem.style.display = isLink ? 'flex' : 'none';
        }
        if (copyLinkItem) {
            copyLinkItem.style.display = isLink ? 'flex' : 'none';
        }
        // 先设置 display block 再计算尺寸
        menu.style.display = 'block';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';

        // 防止菜单超出视窗
        var rect = menu.getBoundingClientRect();
        var overflowX = rect.right - window.innerWidth;
        var overflowY = rect.bottom - window.innerHeight;
        if (overflowX > 0) menu.style.left = (x - overflowX) + 'px';
        if (overflowY > 0) menu.style.top = (y - overflowY) + 'px';

    // 保存触发目标
    menu._target = target || null;
    // 缓存当前选中文本（因为接下来 focus 会清空 selection）
    var selText = textSelection();
    menu._selection = selText || '';
    // 根据是否有选中文本启用/禁用复制项
    var hasSelection = !!menu._selection;
        var copyItem = menu.querySelector('[data-action="copy"]');
        if (copyItem) {
            if (hasSelection) {
                copyItem.style.opacity = '1';
                copyItem.setAttribute('aria-disabled', 'false');
                copyItem.tabIndex = 0;
            } else {
                copyItem.style.opacity = '0.45';
                copyItem.setAttribute('aria-disabled', 'true');
                copyItem.tabIndex = -1;
            }
        }
        // focus 第一个可聚焦项
        var first = menu.querySelector('[role="menuitem"]');
        if (first) first.focus();
    }

    function closeMenu(menu) {
        if (!menu) return;
        menu.style.display = 'none';
        menu._target = null;
    }
    // create a small toast bubble for feedback
    function ensureToast() {
        var id = 'fuwari-context-toast';
        var t = document.getElementById(id);
        if (t) return t;
        t = document.createElement('div');
        t.id = id;
        Object.assign(t.style, {
            position: 'fixed',
            zIndex: 100000,
            right: '18px',
            bottom: '24px',
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'var(--context-toast-bg, rgba(0,0,0,0.8))',
            color: 'var(--context-toast-fg, #fff)',
            fontSize: '13px',
            opacity: '0',
            transform: 'translateY(6px)',
            transition: 'opacity 200ms ease, transform 200ms ease'
        });
        document.body.appendChild(t);
        return t;
    }

    function showToast(text, timeout) {
        timeout = timeout || 1800;
        var t = ensureToast();
        t.textContent = text;
        requestAnimationFrame(function () { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
        clearTimeout(t._timer);
        t._timer = setTimeout(function () { t.style.opacity = '0'; t.style.transform = 'translateY(6px)'; }, timeout);
    }

    function openInNewTab(url) {
        // create a temporary anchor to ensure new tab opens cross-browser
        var a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function textSelection() {
        var sel = window.getSelection();
        if (sel && sel.toString().trim()) return sel.toString().trim();
        return '';
    }

    function onAction(menu, action) {
        var target = menu._target;
        switch (action) {
            case 'copy-link':
                var link = target && (target.tagName === 'A' ? target : target.closest('a'));
                if (link && link.href) {
                    navigator.clipboard.writeText(link.href).then(function () { showToast('链接地址已复制'); });
                } else {
                    showToast('未检测到链接');
                }
                break;
            case 'open-link':
                // 只在链接右键时触发
                var link = target && (target.tagName === 'A' ? target : target.closest('a'));
                if (link && link.href) {
                    openInNewTab(link.href);
                } else {
                    showToast('未检测到链接');
                }
                break;
            case 'copy':
                // 使用 openMenu 时缓存的选中文本（menu._selection），避免 focus 后失去 selection
                var selText = menu._selection || '';
                if (selText) {
                    navigator.clipboard.writeText(selText).then(function () { showToast('已复制选中文本'); });
                } else {
                    showToast('没有可复制的文本');
                }
                break;
            case 'search':
                // 使用选中文本作为查询词，如果没有则尝试使用页面标题
                var q = textSelection() || document.title || '';
                if (q) {
                    var searchUrl = 'https://www.bing.com/search?q=' + encodeURIComponent(q);
                    openInNewTab(searchUrl);
                } else {
                    showToast('没有可搜索的文本');
                }
                break;
            case 'share':
                // 复制当前文章链接并提示
                var shareUrl = location.href;
                navigator.clipboard.writeText(shareUrl).then(function () { showToast('文章链接已复制，可粘贴分享'); });
                break;
        }
        closeMenu(menu);
    }

    // 初始化
    var menu = null;
    function ensureMenu() { if (!menu) { menu = createMenu(); applyTheme(menu); } }

    // 事件绑定
    document.addEventListener('contextmenu', function (e) {
        // 阻止默认菜单
        e.preventDefault();
        ensureMenu();
        applyTheme(menu);
        openMenu(menu, e.clientX, e.clientY, e.target);
    });

    document.addEventListener('click', function (e) {
        if (!menu) return;
        var within = menu.contains(e.target);
        if (!within) closeMenu(menu);
    });

    document.addEventListener('keydown', function (e) {
        if (!menu || menu.style.display === 'none') return;
        if (e.key === 'Escape') { closeMenu(menu); return; }
        // 简单键盘导航: 上/下
        var focusable = Array.prototype.slice.call(menu.querySelectorAll('[role="menuitem"]'));
        var idx = focusable.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); var n = focusable[(idx+1) % focusable.length]; n && n.focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); var p = focusable[(idx-1 + focusable.length) % focusable.length]; p && p.focus(); }
        if (e.key === 'Enter') { e.preventDefault(); if (document.activeElement && document.activeElement.dataset && document.activeElement.dataset.action) onAction(menu, document.activeElement.dataset.action); }
    });

    // 点击菜单项
    document.addEventListener('click', function (e) {
        if (!menu) return;
        var el = e.target.closest('.' + MENU_ITEM_CLASS);
        if (el) {
            var action = el.dataset.action;
            onAction(menu, action);
        }
    });

    // 监听主题变化：如果项目通过 body.dataset.theme 或者 class 切换，可用下面的 observer 更新样式
    var obs = new MutationObserver(function (mutations) {
        if (!menu) return;
        mutations.forEach(function (m) {
            if (m.type === 'attributes' && (m.attributeName === 'data-theme' || m.attributeName === 'class')) {
                applyTheme(menu);
            }
        });
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ['data-theme', 'class'] });

})();
