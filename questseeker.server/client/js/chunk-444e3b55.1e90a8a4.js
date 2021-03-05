(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-444e3b55"],{"0746":function(t,e,a){"use strict";a.d(e,"a",(function(){return u}));var s=a("83fc");const{logger:c}=a("8a4e"),i=function(t){let e="";const a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=a.length;for(let c=0;c<t;c++)e+=a.charAt(Math.floor(Math.random()*s));return c.log(e),e};var o=a("41cb"),n=a("8a4e"),r=a("2b20");class l{async getQuests(){const t=await r["a"].get("api/quests/");s["a"].quests=t.data}async createQuest(t){t.accessCode=i(5);const e=await r["a"].post("api/quests/",t);return this.getQuests(),s["a"].quests.push(e.data),s["a"].activeQuest=e.data,n["logger"].log(e.data,s["a"].activeQuest,"setting active quest"),e.data.id}async questJoinable(t,e){const a={isJoinable:e},s=await r["a"].put("api/quests/"+t,a);n["logger"].log(s.data,a)}async questActive(t,e){const a={isActive:e},s=await r["a"].put("api/quests/"+t,a);n["logger"].log(s.data,a)}async joinQuest(t){await this.getQuests();const e=s["a"].quests.filter(e=>e.accessCode===t.accessCode);if(n["logger"].log(e),!0!==e[0].isJoinable)return window.alert("This Quest is not Joinable");{const a={questId:e[0].id,accountId:t.accountId};n["logger"].log(e),await r["a"].post("api/userquests",a);const c=await r["a"].get("api/quests/"+e[0].id+"/objectives");s["a"].markers=c.data,n["logger"].log("quest to pull obj",c.data),s["a"].activeQuest=e[0],o["a"].push({name:"MapPage",params:{questid:e[0].id}}),this.formatMarkerInfo()}}formatMarkerInfo(){return s["a"].markers.forEach(t=>{const e={};e.lat=t.location.lat,e.lng=t.location.lng,e.address=t.location.address,e.title=t.title,e.objectiveId=t.id,s["a"].markerInfo.push(e),n["logger"].log("this is the formatted",s["a"].markerInfo)}),s["a"].markerInfo}}const u=new l},"2f77":function(t,e,a){"use strict";a("e55a")},"55a7":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));var s=a("83fc"),c=a("41cb"),i=a("8a4e"),o=a("2b20");class n{async getAllObjectives(t){try{const e=await o["a"].get("api/quests/"+t+"/objectives");s["a"].objectives=e.data}catch(e){i["logger"].error(e)}}async getObjective(t){const e=await o["a"].get("api/objectives/"+t.id);s["a"].activeObjective=e.data}async submitAnswer(t,e){const a=await o["a"].get("api/objectives/"+t.objectiveId+"/answers"),s=a.data,n=s.filter(t=>t.creatorId===e._id);n.length<1?(await o["a"].post("api/answers",t),c["a"].push({name:"MapPage",params:t.questId}),i["logger"].log(t)):(window.alert("You have already submitted an answer"),c["a"].push({name:"MapPage",params:t.questId}))}async getAnswers(t){const e=await o["a"].get("api/objectives/"+t.id+"/answers"),a=e.data,c=a.filter(t=>t.creatorId===s["a"].account);i["logger"].log("this should be the account id we check",s["a"].account),c.length>0?s["a"].status=!0:s["a"].status=!1}async getMarkers(t){const e=await o["a"].get("api/quests/"+t+"/objectives");i["logger"].log("this is the objectives/markers",e.data),s["a"].markers=e.data,this.formatMarkerInfo()}formatMarkerInfo(){return s["a"].markers.forEach(t=>{const e={};e.lat=t.location.lat,e.lng=t.location.lng,e.address=t.location.address,e.title=t.title,e.objectiveId=t.id,s["a"].markerInfo.push(e),i["logger"].log("this is the formatted",s["a"].markerInfo)}),s["a"].markerInfo}}const r=new n},"8ed2":function(t,e,a){"use strict";a.r(e);var s=a("7a23");const c=Object(s["I"])("data-v-51688f9f");Object(s["u"])("data-v-51688f9f");const i={class:"ObjectiveReviewPage container-fluid font"},o={class:"row justify-content-around mt-3"},n=Object(s["h"])("small",null," Give the Code",-1),r=Object(s["h"])("small",null," Allow Friends",-1),l=Object(s["h"])("small",null," Quest ACTIVE",-1),u=Object(s["h"])("small",null," Activate Quest",-1),b={key:0,class:"row"},d={class:"col text-center"},v=Object(s["h"])("p",{class:"m-2"}," Access Code: ",-1),g={class:"card bottom-c ac-code shadow"},j={class:"row justify-content-center"},O={class:"col m-4 text-center"},f={key:0,class:"btn btn-outline-primary ca shadow"},h=Object(s["h"])("div",null," Current Answers ",-1);Object(s["s"])();const p=c((t,e,a,p,m,w)=>{const q=Object(s["y"])("ObjectiveComponent"),k=Object(s["y"])("router-link");return Object(s["r"])(),Object(s["e"])("div",i,[(Object(s["r"])(!0),Object(s["e"])(s["a"],null,Object(s["x"])(p.state.objectives,t=>(Object(s["r"])(),Object(s["e"])(q,{key:t.id,"objective-prop":t},null,8,["objective-prop"]))),128)),Object(s["h"])("div",null,[Object(s["h"])("div",o,[!0===p.state.activeQuest.isJoinable?(Object(s["r"])(),Object(s["e"])("button",{key:0,class:"btn activ m-1",onClick:e[1]||(e[1]=(...t)=>p.questJoinable&&p.questJoinable(...t))},[n])):Object(s["f"])("",!0),!1===p.state.activeQuest.isJoinable?(Object(s["r"])(),Object(s["e"])("button",{key:1,class:"btn not-active m-1",onClick:e[2]||(e[2]=(...t)=>p.questJoinable&&p.questJoinable(...t))},[r])):Object(s["f"])("",!0),!0===p.state.activeQuest.isActive?(Object(s["r"])(),Object(s["e"])("button",{key:2,class:"btn activ m-1",onClick:e[3]||(e[3]=(...t)=>p.questActive&&p.questActive(...t))},[l])):Object(s["f"])("",!0),!1===p.state.activeQuest.isActive?(Object(s["r"])(),Object(s["e"])("button",{key:3,class:"btn not-active m-1",onClick:e[4]||(e[4]=(...t)=>p.questActive&&p.questActive(...t))},[u])):Object(s["f"])("",!0)]),!0===p.state.activeQuest.isJoinable?(Object(s["r"])(),Object(s["e"])("div",b,[Object(s["h"])("div",d,[v,Object(s["h"])("div",g,[Object(s["h"])("h1",null,Object(s["B"])(p.state.activeQuest.accessCode),1)])])])):Object(s["f"])("",!0),Object(s["h"])("div",j,[Object(s["h"])("div",O,[!0===p.state.activeQuest.isJoinable&&!0===p.state.activeQuest.isActive?(Object(s["r"])(),Object(s["e"])("button",f,[Object(s["h"])(k,{class:"current-answers text-white",to:{name:"TeamsPage",params:{questid:p.state.questId}}},{default:c(()=>[h]),_:1},8,["to"])])):Object(s["f"])("",!0)])])])])});var m=a("55a7"),w=a("83fc"),q=a("8a4e"),k=a("0746"),Q=a("6c02"),y={name:"ObjectiveReviewPage",setup(){const t=Object(Q["c"])(),e=Object(s["v"])({activeQuest:Object(s["c"])(()=>w["a"].activeQuest),objectives:Object(s["c"])(()=>w["a"].objectives),questId:t.params.questid});return Object(s["p"])(async()=>{try{q["logger"].log(e.activeQuest,"getting activequest"),await m["a"].getAllObjectives(e.activeQuest.id)}catch(t){q["logger"].error(t)}}),{state:e,async questJoinable(){try{e.activeQuest.isJoinable=!e.activeQuest.isJoinable;const t=e.activeQuest.isJoinable;await k["a"].questJoinable(e.activeQuest.id,t)}catch(t){q["logger"].error(t)}},async questActive(){try{e.activeQuest.isActive=!e.activeQuest.isActive;const t=e.activeQuest.isActive;await k["a"].questActive(e.activeQuest.id,t)}catch(t){q["logger"].error(t)}}}},components:{}};a("2f77");y.render=p,y.__scopeId="data-v-51688f9f";e["default"]=y},e55a:function(t,e,a){}}]);