<template>
  <div id="app">
    <header class="header">
      <h1>我的博客</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: #2c3e50;
  color: white;
  padding: 2rem;
  text-align: center;
}

main {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
