<template>
  <div class="app">
    <nav class="navbar navbar-expand-lg">
      <div class="mx-auto d-sm-flex d-block flex-sm-nowrap">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/">Todos List</RouterLink> |
            </li>
            <li class="nav-item">
              <RouterLink to="/newTodo">New Todo</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <RouterView />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app {
  margin: 15px 0px;
  align-items: center;

  .navbar {
    height: 60px;
    background-color: #e3f2fd;
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
