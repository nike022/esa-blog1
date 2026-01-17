<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-info">
        <p class="copyright">© 2026 我的博客. All rights reserved.</p>
        <p class="powered-by">Powered by Vue 3 + Vite | Deployed on Alibaba Cloud ESA Pages</p>
      </div>
      <div class="footer-links">
        <a href="https://github.com/nike022/esa-blog" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span class="separator">|</span>
        <a href="#" @click.prevent>关于</a>
        <span class="separator">|</span>
        <a href="#" @click.prevent>联系</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: 40px 20px;
  margin-top: 80px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-info {
  text-align: center;
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

.footer-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-links a {
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--primary);
}

.separator {
  color: var(--border);
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer {
    padding: 30px 20px;
    margin-top: 60px;
  }

  .footer-content {
    gap: 16px;
  }

  .copyright {
    font-size: 13px;
  }

  .powered-by {
    font-size: 12px;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
