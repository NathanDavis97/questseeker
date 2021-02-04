<template>
  <div class="container-fluid">
    <div class="row">
      <!-- FIXME adjust the positioning. -->
      <div class="col home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <!-- Button trigger modal -->
        <button class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center btn btn-outline" data-toggle="modal" data-target="#CreateTitleModal">
          Create Quest
        </button>

        <!-- Modal -->
        <div class="modal fade"
             id="CreateTitleModal"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Title the Quest
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form type="submit" @submit.prevent="createQuest">
                  <div class="form-group">
                    <label for=""></label>
                    <input type="text"
                           class="form-control"
                           name=""
                           id=""
                           v-model="state.newQuest.title"
                           aria-describedby="helpId"
                           placeholder=""
                    >
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Title it!
                  </button>
                </form>
              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <!-- Button trigger modal -->
        <button class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center btn btn-outline" data-toggle="modal" data-target="#JoinQuestModal">
          Join Quest
        </button>
        <!-- Modal -->
        <div class="modal fade"
             id="JoinQuestModal"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Join a Quest
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form type="submit" @submit.prevent="joinQuest">
                  <div class="form-group">
                    <label for=""></label>
                    <input type="text"
                           class="form-control"
                           name=""
                           id=""
                           v-model="state.codeInput.accessCode"
                           aria-describedby="helpId"
                           placeholder="Quest Code"
                    >
                  </div>
                  <button type="button" class="btn btn-primary">
                    +
                  </button>
                </form>
              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { questService } from '../services/QuestService'
import $ from 'jquery'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newQuest: {},
      codeInput: {}
    })
    return {
      state,
      async createQuest() {
        try {
          await questService.createQuest(state.newQuest)
          $('#CreateTitleModal').modal('hide')
        } catch (error) {
          logger.error(error)
        }
      },
      async joinQuest() {
        try {
          await questService.joinQuest(state.codeInput)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
