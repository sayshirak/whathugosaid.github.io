
document.addEventListener('DOMContentLoaded', () => {
    ---
        ---
    // 修正JSON路径：使用相对路径，不包含仓库名
    const jsonPath = '{{ "/assets/data/articles.json" | relative_url }}';

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                console.warn('JSON加载失败，状态码:', response.status);
                showFallbackContent();
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0) {
                showJsonContent(data);
            } else {
                console.log('JSON数据为空，使用备用内容');
                showFallbackContent();
            }
        })
        .catch(error => {
            console.error('JSON加载错误:', error);
            showFallbackContent();
        });

    function showJsonContent(data) {
        const jsonContainer = document.getElementById('json-articles');
        const loadingPlaceholder = document.querySelector('.loading-placeholder');

        // 隐藏加载动画
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }

        // 显示JSON内容
        if (jsonContainer) {
            jsonContainer.style.display = 'block';
            jsonContainer.innerHTML = ''; // 清空容器

            data.forEach(article => {
                const articleElement = document.createElement('article');
                articleElement.id = `article${article.id}`;

                // 解析Markdown格式
                let contentHtml = article.content
                    // 一级标题
                    .replace(/^# (.*$)/gm, '<h4 style="color: #16a085; margin: 25px 0 15px 0; font-size: 1.4em; border-bottom: 2px solid #16a085; padding-bottom: 8px;">$1</h4>')
                    // 二级标题
                    .replace(/^## (.*$)/gm, '<h5 style="color: #2980b9; margin: 20px 0 12px 0; font-size: 1.2em; font-style: italic;">$1</h5>')
                    // 加粗
                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #e74c3c; font-weight: bold;">$1</strong>')
                    // 下划线
                    .replace(/__(.*?)__/g, '<u style="color: #2980b9; text-decoration: underline; font-weight: 500;">$1</u>')
                    // 段落换行
                    .replace(/\n\n/g, '</p><p style="margin: 20px 0; line-height: 1.7;">')
                    .replace(/\n/g, '<br>');

                // 包装段落
                contentHtml = '<p style="margin: 15px 0; line-height: 1.7; color: #555;">' + contentHtml + '</p>';

                articleElement.innerHTML = `
                    <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #007bff; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                        <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 1.6em; border-bottom: 3px solid #007bff; padding-bottom: 12px; font-family: 'Georgia', serif;">${article.title}</h3>
                        <div style="color: #555; line-height: 1.8; font-size: 16px;">${contentHtml}</div>
                    </div>
                `;

                jsonContainer.appendChild(articleElement);
            });

            console.log('✅ JSON文章加载成功，共', data.length, '篇文章');
        }

        // 添加锚点跳转
        setupAnchorLinks();
    }

    function showFallbackContent() {
        const jsonContainer = document.getElementById('json-articles');
        const loadingPlaceholder = document.querySelector('.loading-placeholder');

        if (loadingPlaceholder) {
            loadingPlaceholder.innerHTML = `
                <div style="text-align: center; padding: 50px 20px;">
                    <h3 style="color: #856404; margin-bottom: 15px;">⚠️ 动态内容提示</h3>
                    <p style="color: #856404; margin-bottom: 10px;">JSON文章加载需要完整环境</p>
                    <p style="color: #6c757d; font-size: 14px;">当前Jekyll文章已正常显示，点击左侧导航查看更多内容</p>
                </div>
            `;
            loadingPlaceholder.style.display = 'block';
        }

        if (jsonContainer) {
            jsonContainer.style.display = 'none';
        }

        console.log('ℹ️ JSON加载失败，使用Jekyll文章');
    }

    function setupAnchorLinks() {
        // 锚点跳转功能
        document.querySelectorAll('.article-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // 高亮目标文章
                    target.style.border = '2px solid #007bff';
                    setTimeout(() => {
                        target.style.border = '';
                    }, 2000);
                }
            });
        });
    }
});
