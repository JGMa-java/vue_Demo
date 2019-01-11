import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    isShow:false
  },
  mutation:{
    setIsShow(state,msg){
      console.log(state,msg);
      state.isShow=msg;
    }
  }
});

export default store;
