<template>
  <div class="dytt">
    <div v-for="item in movieInfo">
      <h1>标题：{{item.index}}</h1>
      <ul>
        <li v-for="itemTwo in item.content">
          <p>电影名称:{{itemTwo.title}}</p>
          <p>电影连接:<a :href="itemTwo.href">{{itemTwo.href}}</a>></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from "vuex";
  export default {
    name: 'dytt',
    computed: {
      ...mapState(["movieInfo"])
    },
    mounted(){
      this.giveData();
    },
    methods: {
      ...mapActions(["getDatas"]),
      giveData(){
        this.getDatas("http://localhost:8080/api/giveData").then(() =>{

        });
      }
    }
  }
</script>
