<template>
  <div class="search-bar">
    <input type="text" placeholder="Search"  @keypress.enter="onInput" class="pl-4"/>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    onInput(event){
      // Emit 1. Props 에게 custom event를 쏜다
      this.$emit('input-change', event.target.value) // 첫번째 인자 custom event 명, 두번째 인자부터 data
    }
  }
}
</script>

<style>
div.search-bar{
  text-align : center;
  margin: 20px;
}

div.search-bar > input {
  width: 60%;
}

</style>