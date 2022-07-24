<script>
  import TodoList from "./lib/components/TodoList.svelte";
  import Header from "./lib/UI/Header.svelte";
</script>

<div class="container">
  <Header />
  <TodoList />
</div>

<style>
  .container {
    width: 86%;
    max-width: 600px;
  }
</style>
