<template>
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1>关于我</h1>
        <p>欢迎来到我的个人博客</p>
      </div>

      <div class="about-content">
        <!-- 个人简介 -->
        <section class="about-section">
          <h2>👋 你好</h2>
          <p>我是一名热爱技术的开发者，专注于前端开发和全栈技术。这个博客是我分享技术心得、记录学习历程和生活感悟的地方。</p>
          <p>在这里，你可以找到关于Web开发、编程技巧、技术思考以及个人成长的文章。我相信通过分享和交流，我们可以共同进步。</p>
        </section>

        <!-- 技术栈 -->
        <section class="about-section">
          <h2>💻 技术栈</h2>
          <div class="tech-categories">
            <div class="tech-category">
              <h3>前端开发</h3>
              <div class="tech-tags">
                <span class="tech-tag">Vue.js</span>
                <span class="tech-tag">React</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">JavaScript</span>
                <span class="tech-tag">HTML/CSS</span>
                <span class="tech-tag">Vite</span>
              </div>
            </div>
            <div class="tech-category">
              <h3>后端开发</h3>
              <div class="tech-tags">
                <span class="tech-tag">Node.js</span>
                <span class="tech-tag">Express</span>
                <span class="tech-tag">Python</span>
                <span class="tech-tag">MySQL</span>
              </div>
            </div>
            <div class="tech-category">
              <h3>工具与平台</h3>
              <div class="tech-tags">
                <span class="tech-tag">Git</span>
                <span class="tech-tag">Docker</span>
                <span class="tech-tag">Linux</span>
                <span class="tech-tag">Alibaba Cloud</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 博客信息 -->
        <section class="about-section">
          <h2>📝 关于本站</h2>
          <div class="blog-info">
            <div class="info-item">
              <span class="info-label">建站时间</span>
              <span class="info-value">2026年1月</span>
            </div>
            <div class="info-item">
              <span class="info-label">技术栈</span>
              <span class="info-value">Vue 3 + Vite</span>
            </div>
            <div class="info-item">
              <span class="info-label">部署平台</span>
              <span class="info-value">Alibaba Cloud ESA Pages</span>
            </div>
            <div class="info-item">
              <span class="info-label">开源地址</span>
              <span class="info-value">
                <a href="https://github.com/nike022/esa-blog1" target="_blank" rel="noopener noreferrer">GitHub</a>
              </span>
            </div>
          </div>
        </section>

        <!-- 联系方式 -->
        <section class="about-section">
          <h2>📫 联系方式</h2>
          <p>如果你想与我交流技术、分享想法或者有任何建议，欢迎通过以下方式联系我：</p>
          <div class="contact-links">
            <a href="https://github.com/nike022" target="_blank" rel="noopener noreferrer" class="contact-link">
              <span class="contact-icon">🔗</span>
              <span>GitHub</span>
            </a>
            <a href="mailto:contact@example.com" class="contact-link">
              <span class="contact-icon">✉️</span>
              <span>Email</span>
            </a>
          </div>
        </section>

        <!-- 兴趣爱好 -->
        <section class="about-section">
          <h2>🎯 兴趣爱好</h2>
          <ul class="interests-list">
            <li>💡 探索新技术和编程语言</li>
            <li>📚 阅读技术书籍和优质博客</li>
            <li>🎨 关注用户体验和界面设计</li>
            <li>☕ 品尝咖啡，享受生活</li>
            <li>🌍 旅行和摄影</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 80px 20px 120px;
}

.page-header {
  text-align: center;
  margin-bottom: 80px;
}

.page-header h1 {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 16px;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-header p {
  font-size: 18px;
  color: var(--text-secondary);
}

.about-content {
  display: grid;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.about-section {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid var(--border);
}

.about-section h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 20px 0;
}

.about-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 12px 0;
}

.about-section p {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
}

.about-section p:last-child {
  margin-bottom: 0;
}

.tech-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.tech-category {
  padding: 20px;
  background: var(--bg);
  border-radius: 12px;
  border: 1px solid var(--border);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-tag {
  padding: 8px 16px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.tech-tag:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.blog-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  background: var(--bg);
  border-radius: 12px;
  border: 1px solid var(--border);
}

.info-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.info-value {
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 600;
}

.info-value a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s;
}

.info-value a:hover {
  color: var(--text-primary);
}

.contact-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 15px;
  transition: all 0.2s;
}

.contact-link:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-2px);
}

.contact-icon {
  font-size: 20px;
}

.interests-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.interests-list li {
  font-size: 16px;
  color: var(--text-secondary);
  padding: 14px 18px;
  background: var(--bg);
  border-radius: 10px;
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.interests-list li:hover {
  background: var(--bg-secondary);
  border-color: var(--primary);
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .page {
    padding: 60px 20px 80px;
  }

  .page-header h1 {
    font-size: 40px;
  }

  .about-section {
    padding: 24px;
  }

  .tech-categories {
    grid-template-columns: 1fr;
  }

  .blog-info {
    grid-template-columns: 1fr;
  }

  .interests-list {
    grid-template-columns: 1fr;
  }
}
</style>
