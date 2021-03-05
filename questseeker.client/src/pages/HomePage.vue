<template>
  <div class="container-fluid background">
    <div class="row ">
      <!-- FIXME adjust the positioning. -->
      <div class="col home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <!-- Button trigger modal -->
        <button class="customBtn text-light p-3 rounded d-flex align-items-center btn btn-outline" data-toggle="modal" data-target="#CreateTitleModal">
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
                <h5 class="modal-title text-dark" id="exampleModalLongTitle">
                  Forge a Quest
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form type="submit" class="justify-content-center" @submit.prevent="createQuest">
                  <div class="form-group d-flex">
                    <label for=""></label>
                    <input type="text"
                           class="form-control"
                           name=""
                           id=""
                           v-model="state.newQuest.title"
                           aria-describedby="helpId"
                           placeholder="Quest Title"
                    >
                  </div>
                  <div class="row justify-content-center">
                    <button type="submit" class="btn forge rounded">
                      Forge!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <!-- Button trigger modal -->
        <button class=" customBtn text-light p-3 rounded d-flex align-items-center btn btn-outline" data-toggle="modal" data-target="#JoinQuestModal">
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
                <h5 class="modal-title text-dark" id="exampleModalLongTitle">
                  Join a Quest
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form type="submit" @submit.prevent="joinQuest">
                  <div class="form-group d-flex">
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
                  <div class="row justify-content-center">
                    <button type="submit" class="btn join rounded">
                      Join!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { questService } from '../services/QuestService'
import { reactive, computed } from 'vue'
import { logger } from '../utils/Logger'
import router from '../router'
import $ from 'jquery'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      newQuest: {},
      codeInput: { accountId: AppState.account.id }
    })
    // onMounted(async() => {
    // REVIEW Need to access the current account for the join quest to work on page refresh. I think that it is not in the AppState until
    // there has been some form of interaction from the user to set the AppState.account.id. Because it works when you create a quest and then join it.
    // try {
    //   await questService.getQuests()
    // } catch (error) {
    //   logger.error(error)
    // }
    // })
    return {
      state,
      async createQuest() {
        try {
          const _id = await questService.createQuest(state.newQuest)
          $('#CreateTitleModal').modal('hide')
          router.push({ name: 'AddLocationPage', params: { questid: _id } })
        } catch (error) {
          logger.error(error)
        }
      },
      async joinQuest() {
        try {
          AppState.account.id = state.user.id
          await questService.joinQuest(state.codeInput)
          $('#JoinQuestModal').modal('hide')
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.home{
      .customBtn {
        margin-top: 12rem;
            cursor: pointer;
            border: 2px solid #cdd7dd;
            background-color: transparent;
            height: 50px;
            width: 200px;
            font-size: 1.5em;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
            justify-content: center;
            font-family: 'Montserrat Alternates', sans-serif
        }
}
        .background {
  width: 100wh;
height: 90vh;
color: #fff;
background: linear-gradient(-45deg, #E73C7E, #23A6D5, #23D5AB);
background-size: 200% 200%;

}
.join{
  border: 2px solid #0A0732;
  background-color: rgba(184, 183, 183, 0.183);
  color: #0A0732;
  font-family: 'Montserrat Alternates', sans-serif
}
.forge{
  border: 2px solid #0A0732;
  background-color: rgba(184, 183, 183, 0.183);
  color: #0A0732;
  font-family: 'Montserrat Alternates', sans-serif
}

</style>
