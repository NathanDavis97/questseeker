(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40624570"],{"55a7":function(a,e,t){"use strict";t.d(e,"a",(function(){return i}));var s=t("83fc"),r=t("41cb"),c=t("8a4e"),o=t("2b20");class n{async getAllObjectives(a){try{const e=await o["a"].get("api/quests/"+a+"/objectives");s["a"].objectives=e.data}catch(e){c["logger"].error(e)}}async getObjective(a){const e=await o["a"].get("api/objectives/"+a.id);s["a"].activeObjective=e.data}async submitAnswer(a,e){const t=await o["a"].get("api/objectives/"+a.objectiveId+"/answers"),s=t.data,n=s.filter(a=>a.creatorId===e._id);n.length<1?(await o["a"].post("api/answers",a),r["a"].push({name:"MapPage",params:a.questId}),c["logger"].log(a)):(window.alert("You have already submitted an answer"),r["a"].push({name:"MapPage",params:a.questId}))}async getAnswers(a){const e=await o["a"].get("api/objectives/"+a.id+"/answers"),t=e.data,r=t.filter(a=>a.creatorId===s["a"].account);c["logger"].log("this should be the account id we check",s["a"].account),r.length>0?s["a"].status=!0:s["a"].status=!1}async getMarkers(a){const e=await o["a"].get("api/quests/"+a+"/objectives");c["logger"].log("this is the objectives/markers",e.data),s["a"].markers=e.data,this.formatMarkerInfo()}formatMarkerInfo(){return s["a"].markers.forEach(a=>{const e={};e.lat=a.location.lat,e.lng=a.location.lng,e.address=a.location.address,e.title=a.title,e.objectiveId=a.id,s["a"].markerInfo.push(e),c["logger"].log("this is the formatted",s["a"].markerInfo)}),s["a"].markerInfo}}const i=new n},e6e1:function(a,e,t){"use strict";t.r(e);var s=t("7a23");const r=Object(s["I"])("data-v-e9bfa9b8");Object(s["u"])("data-v-e9bfa9b8");const c={class:"MapPage container-fluid"},o={class:"row"},n={class:"col"};Object(s["s"])();const i=r((a,e,t,r,i,d)=>{const l=Object(s["y"])("UserMap");return Object(s["r"])(),Object(s["e"])("div",c,[Object(s["h"])("div",o,[Object(s["h"])("div",n,[Object(s["h"])(l,{"disable-u-i":!1,zoom:15,"map-type":"roadmap",center:{lat:43.615,lng:-116.2023},markers:r.state.markers},null,8,["center","markers"])])])])});var d=t("83fc"),l=t("55a7"),b=t("8a4e"),g=t("6c02"),u={name:"MapPage",setup(){const a=Object(g["c"])(),e=Object(s["v"])({markers:Object(s["c"])(()=>d["a"].markerInfo)});return Object(s["p"])(async()=>{try{l["a"].getMarkers(a.params.questid)}catch(e){b["logger"].error(e)}}),{state:e}},components:{}};u.render=i,u.__scopeId="data-v-e9bfa9b8";e["default"]=u}}]);