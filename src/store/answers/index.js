export default {
  namespaced: true,
  state() {
    return {
      answers: [],
    };
  },
  mutations: {
    setAnswers(state, payload) {
      state.answers = payload;
    },
  },
  getters: {
    answers(state) {
      return state.answers;
    },
    hasAnswers(getters) {
      return getters.answers && getters.answers.length > 0;
    },
  },
  actions: {
    async fetchAnswers(context, payload) {
      const token = context.rootGetters.token;

      const response = await fetch(
        `https://ikfram-prikkr-webapp-default-rtdb.europe-west1.firebasedatabase.app/answers/${payload.creatorId}/${payload.prikkrId}.json?auth=` +
          token
      );

      const responseData = await response.json();
      const answers = [];

      for (const key in responseData) {
        const answer = {
          id: key,
          name: responseData[key].name,
          firstDate: responseData[key].firstDate,
          secondDate: responseData[key].secondDate,
          thirdDate: responseData[key].thirdDate,
          cantDate: responseData[key].cantDate,
        };
        answers.push(answer);
      }
      context.commit("setAnswers", answers);
    },
  },
};
