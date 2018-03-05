<template>
  <div class="dytt">
    <p>{{movieInfo}}</p>
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
//      this.giveData();
    },
    methods: {
      ...mapActions(["getDatas"]),
//      giveData(){
//        this.getDatas("./nodeServer/find.js").then(() =>{
//            console.log(this.movieInfo)
//        });
//      }
    }
  }
</script>
