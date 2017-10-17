import visibilityUpdate from './directives/visibilityUpdate.js';
import tasksListReport from './tasksListReport.js';
import dashCard from './dashCard.js';
import tasksList from './tasksList.js';
import stashList from './stashList.js';
import planList from './planList.js';
import dashboard from './dashboard.js';
import favIcon from './favIcon.js';
import githubIssues from './githubIssues.js';
import singlePr from './singlePr.js';
import focusIcon from './focusIcon.js';
import searchIcon from './searchIcon.js';
import app from './app.js';

let updateSettings;

Object.defineProperty(Vue.prototype, '$localIp', {
    value: 'http://127.0.0.1'
});
Object.defineProperty(Vue.prototype, '$localDockerIp', {
    value: 'http://192.168.64.4'
});

Vue.component('githubIssues', githubIssues);
Vue.directive('visibilityUpdate', visibilityUpdate);
Vue.component('dashCard', dashCard);
Vue.component('tasksListReport', tasksListReport);
Vue.component('tasksList', tasksList);
Vue.component('stashList', stashList);
Vue.component('planList', planList);
Vue.component('singlePr', singlePr);
Vue.component('dashboard', dashboard);
Vue.component('favIcon', favIcon);
Vue.component('focusIcon', focusIcon);
Vue.component('searchIcon', searchIcon);

const options = JSON.parse(localStorage.getItem('settings') || '{}');

const appInstance = new Vue(app);

updateSettings = function({ stashUserName }) {
    Vue.set(appInstance, 'stashUserName', stashUserName);
};

updateSettings(options);
export default null;
