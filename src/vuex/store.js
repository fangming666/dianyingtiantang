/**
 * Created by DELL on 2018/3/2.
 */
import vue from "vue";
import vueX from "vuex";
import axios from "axios";
import * as actions from "./action";

vue.use(vueX);

const state = {
  movieInfo: ""
};

const mutations = {
  REQUIRE_INFO(state, resultArr){
    state.movieInfo = resultArr
  }
};


export default new vueX.Store({
  state,
  mutations,
  actions
})
