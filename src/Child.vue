<template>
    <div>
        <p>child组件</p>
        <p>{{this.$store.state.count}}</p>
    </div>

</template>

<script>
export default {
  name: 'ChildIndex'
}
</script>

<style>
</style>
