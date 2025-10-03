// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initBookingForm();
    initNavbarScroll();
    initLanguageSwitcher();
    initThemeSwitcher();
});

// 移动端菜单切换
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击菜单项后关闭移动端菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// 平滑滚动
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // 考虑固定导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.guide-card, .attraction-card, .route-card').forEach(card => {
        card.classList.add('loading');
        observer.observe(card);
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        lastScrollTop = scrollTop;
    });
}

// 预订表单处理
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(bookingForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                route: formData.get('route'),
                date: formData.get('date'),
                message: formData.get('message')
            };

            // 验证表单
            if (validateForm(data)) {
                // 显示提交成功消息
                showSuccessMessage();
                // 重置表单
                bookingForm.reset();
            }
        });
    }
}

// 表单验证
function validateForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('请输入有效的姓名');
    }

    if (!data.phone || !/^1[3-9]\d{9}$/.test(data.phone)) {
        errors.push('请输入有效的手机号码');
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('请输入有效的邮箱地址');
    }

    if (!data.route) {
        errors.push('请选择旅游线路');
    }

    if (!data.date) {
        errors.push('请选择出行日期');
    }

    if (errors.length > 0) {
        showErrorMessage(errors.join('<br>'));
        return false;
    }

    return true;
}

// 显示成功消息
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <h3>预订成功！</h3>
            <p>感谢您的预订，我们会在24小时内联系您确认详细信息。</p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">确定</button>
        </div>
    `;
    
    // 添加样式
    message.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const messageContent = message.querySelector('.message-content');
    messageContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;
    
    messageContent.querySelector('i').style.cssText = `
        font-size: 3rem;
        color: #4caf50;
        margin-bottom: 1rem;
    `;
    
    messageContent.querySelector('h3').style.cssText = `
        color: #333;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    `;
    
    messageContent.querySelector('p').style.cssText = `
        color: #666;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    `;
    
    document.body.appendChild(message);
    
    // 3秒后自动关闭
    setTimeout(() => {
        if (message.parentElement) {
            message.remove();
        }
    }, 5000);
}

// 显示错误消息
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-exclamation-circle"></i>
            <h3>请检查以下信息：</h3>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">确定</button>
        </div>
    `;
    
    // 添加样式
    errorDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const messageContent = errorDiv.querySelector('.message-content');
    messageContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;
    
    messageContent.querySelector('i').style.cssText = `
        font-size: 3rem;
        color: #f44336;
        margin-bottom: 1rem;
    `;
    
    messageContent.querySelector('h3').style.cssText = `
        color: #333;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    `;
    
    messageContent.querySelector('p').style.cssText = `
        color: #666;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    `;
    
    document.body.appendChild(errorDiv);
    
    // 5秒后自动关闭
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// 导游卡片点击效果
document.addEventListener('click', function(e) {
    if (e.target.closest('.guide-card')) {
        const card = e.target.closest('.guide-card');
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
});

// 景点卡片点击效果
document.addEventListener('click', function(e) {
    if (e.target.closest('.attraction-card')) {
        const card = e.target.closest('.attraction-card');
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
});

// 线路卡片点击效果
document.addEventListener('click', function(e) {
    if (e.target.closest('.route-card')) {
        const card = e.target.closest('.route-card');
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
});

// 页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 为所有卡片添加延迟动画
    const cards = document.querySelectorAll('.guide-card, .attraction-card, .route-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// 返回顶部按钮
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #d4af37;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(button);
}

// 初始化返回顶部按钮
createBackToTopButton();

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭模态框
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.success-message, .error-message');
        modals.forEach(modal => modal.remove());
    }
});

// 添加触摸设备支持
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(function() {
    // 滚动相关的优化处理
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// 多语言切换功能
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'zh';
    
    // 设置初始语言
    setLanguage(currentLang);
    
    // 绑定语言切换事件
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });
}

// 设置语言
function setLanguage(lang) {
    // 更新body的lang属性
    document.body.setAttribute('lang', lang);
    
    // 更新页面标题
    const title = document.querySelector('title');
    if (title) {
        title.textContent = title.getAttribute(`data-${lang}`);
    }
    
    // 更新所有带有data-zh和data-en属性的元素
    const elements = document.querySelectorAll('[data-zh][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // 更新placeholder属性
    const inputs = document.querySelectorAll('input[data-placeholder-zh], textarea[data-placeholder-zh]');
    inputs.forEach(input => {
        const placeholder = input.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
    
    // 更新语言按钮状态
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        }
    });
    
    // 更新表单选项
    updateFormOptions(lang);
}

// 更新表单选项
function updateFormOptions(lang) {
    const options = document.querySelectorAll('option[data-zh][data-en]');
    options.forEach(option => {
        const text = option.getAttribute(`data-${lang}`);
        if (text) {
            option.textContent = text;
        }
    });
}

// 检测浏览器语言偏好
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
        return 'en';
    }
    return 'zh';
}

// 如果没有保存的语言偏好，使用浏览器语言
if (!localStorage.getItem('language')) {
    const detectedLang = detectBrowserLanguage();
    localStorage.setItem('language', detectedLang);
}

// 明暗模式切换功能
function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // 设置初始主题
    setTheme(currentTheme);
    
    // 绑定主题切换事件
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// 设置主题
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const themeIcon = document.getElementById('themeIcon');
    
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
            themeIcon.parentElement.title = '切换到明亮模式';
        } else {
            themeIcon.className = 'fas fa-sun';
            themeIcon.parentElement.title = '切换到暗色模式';
        }
    }
    
    // 更新meta主题色
    updateMetaThemeColor(theme);
}

// 更新meta主题色
function updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    if (theme === 'dark') {
        metaThemeColor.content = '#1a1a1a';
    } else {
        metaThemeColor.content = '#2E8B57';
    }
}

// 检测系统主题偏好
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// 如果没有保存的主题偏好，使用系统主题
if (!localStorage.getItem('theme')) {
    const detectedTheme = detectSystemTheme();
    localStorage.setItem('theme', detectedTheme);
}

// 监听系统主题变化
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        }
    });
}
