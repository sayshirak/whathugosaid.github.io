document.addEventListener('DOMContentLoaded', () => {
    // 加载Jekyll帖子（已由Liquid处理，无需JS）
    
    // 加载JSON动态内容
    fetch('{{ '/assets/data/articles.json' | relative_url }}')
        .then(response => {
            if (!response.ok) {
                throw new Error('JSON文件加载失败: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const jsonContainer = document.getElementById('json-articles');
            const loadingPlaceholder = document.querySelector('.loading-placeholder');
            
            if (loadingPlaceholder) {
                loadingPlaceholder.style.display = 'none';
            }
            
            jsonContainer.style.display = 'block';
            jsonContainer.innerHTML = ''; // 清空容器
            
            data.forEach(article => {
                const articleElement = document.createElement('article');
                articleElement.id = `article${article.id}`;
                // 解析Markdown标记
                let contentHtml = article.content
                    .replace(/# (.*)/g, '<h4>$1</h4>') // 一级标题
                    .replace(/## (.*)/g, '<h5>$2</h5>') // 二级标题 (修复$5为$2)
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 加粗
                    .replace(/__(.*?)__/g, '<u>$1</u>'); // 下划线
                articleElement.innerHTML = `<h3 class="article-title">${article.title}</h3>${contentHtml}`;
                jsonContainer.appendChild(articleElement);
            });
            
            // 平滑滚动到文章
            const links = document.querySelectorAll('.article-link');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
            
            console.log('JSON数据加载成功:', data);
        })
        .catch(error => {
            console.error('加载JSON失败:', error);
            const loadingPlaceholder = document.querySelector('.loading-placeholder');
            if (loadingPlaceholder) {
                loadingPlaceholder.innerHTML = '<p style="color: #dc3545;">加载失败：请检查articles.json文件</p>';
            }
        });
});