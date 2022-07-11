<template>
  <div class='init_account'>
    <h1 style="font-weight:700" >안녕하세요?</h1>
    <h1 class=name_lavel>당신의 이름은</h1>
    <div class=name_input>
      <input id="nickName" type="text" placeholder="미라클모닝">
    </div>
    <h1 class=name_lavel_2> 입니다.</h1>
    <v-btn depressed class=next_btn @click="movePage('InitSetUp')">
      <v-icon class=arrow-btn>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  mounted () {
  },
  methods: {
    movePage (name) {
      const NickName = document.getElementById('nickName').value
      if (NickName === '') alert('이름을 입력해주세요')
      else if (name !== this.$route.name) {
        this.$router.push({ name: name, params: { initName: NickName } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_color.scss';
.init_account{
  margin-top:20vh;
  padding:10%;
}
.name_lavel{
  margin:2%;
  position: absolute;
  font-weight : 500;
  padding-left: 4vw;
  width : 100vw;
}
.name_lavel_2{
  position: absolute;
  font-weight : 500;
  padding-left: 30vw;
  margin : 3%;
}
.name_input{
  margin-top:8vh;
  padding : 4%;
  width:50%;
  padding-left:15vw;
}
.next_btn{
  margin-left : 68vw;
  margin-top : 2.2vh;
}
.theme--light.v-btn {
    color: gray;
}
.theme--light.v-btn.v-btn--has-bg
{
  background-color:$key-color-blue !important;
}
.name_input>input {
    height: 6vh;
    border: 3px solid $key-color-blue;
    text-align: center;
    border-radius: 10px;
}
</style>
