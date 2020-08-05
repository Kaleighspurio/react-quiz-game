import axios from 'axios';

export default {
    getQuestionsAnyCategory: function() {
        return axios.get('https://opentdb.com/api.php?amount=15&type=multiple&encode=base64');
    },

    getPossibleCategories: function() {
        return axios.get('https://opentdb.com/api_category.php');
    },

    getQuestionsByCategory: function(categoryId) {
        return axios.get(`https://opentdb.com/api.php?amount=15&type=multiple&category=${categoryId}&encode=base64`);
    }
}