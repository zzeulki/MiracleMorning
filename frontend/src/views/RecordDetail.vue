<template>
  <div class="all-layout p-a-vw-10">
    <!-- 사진, 코멘트 기록 확인 화면(ji) -->
    <div class="contents-box">
      <div class="datetime-box align-a-center m-b-vw-10">2022년 5월 21일 07:59 AM</div>
      <div class="img-box m-y-vw-10 align-a-center">사진</div>
      <div class="comment-box align-a-center">
        <v-textarea
          v-model="coment"
          outlined
          rows="6"
          no-resize
          placeholder="내용을 입력하세요."
          counter
          :rules="rules.maxLength"
        ></v-textarea>
      </div>
    </div>
    <div class="completion-btn-box p-x-vw-10">
      <v-btn
        class="completion-btn"
        dark
        depressed
        @click="saveRecord()"
      >완료</v-btn>
    </div>
    <v-dialog
      v-model="isRecordDialog"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <div class="align-a-center dialog-header-box p-a-0">2022년 5월 21일 07:59 AM</div>
        <v-divider></v-divider>
        <div class="dialog-content-box">
          <div class="img-box m-b-vw-10 align-a-center">사진</div>
          <div class="comment-box align-a-center">
            <v-textarea
              v-model="coment"
              outlined
              rows="6"
              no-resize
              readonly
              hide-details
            ></v-textarea>
          </div>
          <div class="align-a-center">
          <v-btn
            class="dialog-close-btn"
            dark
            depressed
            @click="isRecordDialog = false"
          >닫기</v-btn>
        </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      coment: '',
      rules: {
        maxLength: [value => value.length <= 200 || '200자까지 입력 가능합니다.']
      },
      isRecordDialog: false
    }
  },
  methods: {
    saveRecord () {
      this.isRecordDialog = true
      // alert('사진, 코멘트 저장!')
    }
  }
}
</script>

<style lang="scss" scoped>
.all-layout {
  width: 100%;
  max-height: fit-content;

  .datetime-box {
    height: 12vw;
    font-size: 4.5vw;
  }

  .comment-box {
    height: fit-content;
    margin-bottom: calc(15.55vw + 2.77vw + 14vw);
  }

  .completion-btn-box {
    width: 100%;
    position: fixed;
    bottom: calc(15.55vw + 2.77vw);
    right: 0;
    .completion-btn {
      width: 100%;
      height: 14vw;
      min-height: 30px;
      background-color:dodgerblue;
      border-radius: 10px;
      font-size: 5vw;
      font-weight: 600;
    }
  }
}

.v-card__actions {
  padding: 0 !important;
}

.img-box {
  height: 70vw !important;
  border: 1px solid black;
  background-color: black;
  color: white;
}

.dialog-content-box {
  padding: 2.77vw !important;
}

.dialog-header-box {
  height: 15.55vw;
  font-size: 4.5vw;
}
</style>
