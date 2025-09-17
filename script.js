document.addEventListener('DOMContentLoaded', () => {
    fetch('articles.json')
        .then(response => response.json())
        .then(data => {
            const mainElement = document.querySelector('main');
            mainElement.innerHTML = ''; // 清空现有内容
            data.forEach(article => {
                const articleElement = document.createElement('article');
                articleElement.id = `article${article.id}`;
                // 解析内容
                let contentHtml = article.content
                    .replace(/# (.*)/g, '<h4>$1</h4>') // 一级标题
                    .replace(/## (.*)/g, '<h5>$5</h5>') // 二级标题
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 加粗
                    .replace(/__(.*?)__/g, '<u>$1</u>'); // 下划线
                articleElement.innerHTML = `<h3 class="article-title">${article.title}</h3>${contentHtml}`;
                mainElement.appendChild(articleElement);
            });
            console.log('JSON数据加载成功:', data);
        })
        .catch(error => console.error('加载JSON失败:', error));
});