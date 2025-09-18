document.addEventListener('DOMContentLoaded', () => {
    // 加载JSON动态内容
    const jsonPath = '/yubookwords.github.io/assets/data/articles.json'; // 修正路径
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                console.warn('JSON文件加载失败，使用备用内容:', response.status);
                showFallbackContent();
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                showJsonContent(data);
            } else {
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
        
        // 隐藏加载占位符
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }
        
        // 显示容器
        if (jsonContainer) {
            jsonContainer.style.display = 'block';
            jsonContainer.innerHTML = ''; // 清空
            
            data.forEach(article => {
                const articleElement = document.createElement('article');
                articleElement.id = `article${article.id}`;
                
                // 解析Markdown标记
                let contentHtml = article.content
                    .replace(/# (.*)/g, '<h4 style="color: #16a085; margin: 20px 0 10px 0; font-size: 1.3em;">$1</h4>')
                    .replace(/## (.*)/g, '<h5 style="color: #2980b9; margin: 15px 0 8px 0; font-size: 1.1em;">$1</h5>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #e74c3c; font-weight: bold;">$1</strong>')
                    .replace(/__(.*?)__/g, '<u style="color: #2980b9; text-decoration: underline;">$1</u>')
                    .replace(/\n/g, '<br><br>'); // 段落换行
                
                articleElement.innerHTML = `
                    <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 5px solid #007bff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 1.4em; border-bottom: 2px solid #007bff; padding-bottom: 8px;">${article.title}</h3>
                        <div style="color: #555; line-height: 1.7; font-size: 15px;">${contentHtml}</div>
                    </div>
                `;
                
                jsonContainer.appendChild(articleElement);
            });
        }
        
        // 添加锚点跳转功能
        document.querySelectorAll('.article-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                }
            });
        });
        
        console.log('✅ JSON内容加载成功:', data);
    }

    function showFallbackContent() {
        const jsonContainer = document.getElementById('json-articles');
        const loadingPlaceholder = document.querySelector('.loading-placeholder');
        
        if (loadingPlaceholder) {
            loadingPlaceholder.innerHTML = `
                <div style="color: #856404; text-align: center; padding: 40px;">
                    <h4 style="color: #856404; margin-bottom: 15px;">⚠️ 动态内容加载提示</h4>
                    <p style="margin-bottom: 10px;">JSON文章需要完整的GitHub Pages环境才能正常加载</p>
                    <p style="font-size: 14px; opacity: 0.8;">当前构建成功！Jekyll文章已正常显示，点击左侧查看</p>
                </div>
            `;
            loadingPlaceholder.style.display = 'block';
        }
        
        if (jsonContainer) {
            jsonContainer.style.display = 'none';
        }
        
        console.log('ℹ️ 使用备用内容（JSON加载失败）');
    }
});