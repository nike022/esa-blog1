<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- 网站地图 -->
      <div class="sitemap">
        <div class="sitemap-section">
          <h4>导航</h4>
          <router-link to="/">首页</router-link>
          <router-link to="/archive">归档</router-link>
          <router-link to="/categories">分类</router-link>
          <router-link to="/tags">标签</router-link>
          <router-link to="/about">关于</router-link>
        </div>
        <div class="sitemap-section">
          <h4>资源</h4>
          <a href="https://github.com/nike022/esa-blog1" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="/sitemap.xml" target="_blank">网站地图</a>
          <a href="/robots.txt" target="_blank">Robots</a>
        </div>
        <div class="sitemap-section">
          <h4>联系</h4>
          <a href="mailto:contact@example.com">邮箱</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="footer-info">
        <p class="copyright">© 2026 我的博客. All rights reserved.</p>
        <p class="powered-by">Powered by Vue 3 + Vite | Deployed on Alibaba Cloud ESA Pages</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: 60px 20px 40px;
  margin-top: 80px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.sitemap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
}

.sitemap-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px 0;
}

.sitemap-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sitemap-section a {
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.sitemap-section a:hover {
  color: var(--primary);
}

.footer-info {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid var(--border);
}

.copyright {
  font-size: 14px;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  font-weight: 500;
}

.powered-by {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px 30px;
    margin-top: 60px;
  }

  .sitemap {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .footer-content {
    gap: 30px;
  }

  .copyright {
    font-size: 13px;
  }

  .powered-by {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .sitemap {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
