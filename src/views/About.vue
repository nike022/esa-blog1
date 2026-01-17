<template>
  <div class="about-page">
    <div class="container">
      <article class="about-content">
        <h1 class="page-title">关于我</h1>

        <section class="about-section">
          <h2>👋 你好</h2>
          <p>欢迎来到我的博客！这里是我分享技术文章、学习笔记和个人想法的地方。</p>
        </section>

        <section class="about-section">
          <h2>💻 技术栈</h2>
          <div class="tech-tags">
            <span class="tech-tag">Vue.js</span>
            <span class="tech-tag">JavaScript</span>
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Git</span>
          </div>
        </section>

        <section class="about-section">
          <h2>📫 联系方式</h2>
          <p>如果你想与我交流，可以通过以下方式联系我：</p>
          <ul>
            <li>📧 Email: your-email@example.com</li>
            <li>🐙 GitHub: github.com/yourusername</li>
          </ul>
        </section>
      </article>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background: var(--bg);
  padding: 48px 0 80px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}

.about-content {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 48px;
  border: 1px solid var(--border);
}

.page-title {
  font-size: 42px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 48px;
  text-align: center;
}

.about-section {
  margin-bottom: 40px;
}

.about-section:last-child {
  margin-bottom: 0;
}

.about-section h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.about-section p {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.about-section ul {
  list-style: none;
  padding: 0;
}

.about-section li {
  font-size: 16px;
  line-height: 2;
  color: var(--text-primary);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tech-tag {
  padding: 8px 16px;
  background: var(--primary);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .about-content {
    padding: 32px 24px;
  }

  .page-title {
    font-size: 32px;
  }
}
</style>
