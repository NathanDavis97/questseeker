(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c5200"],{"3e80":function(e,t,c){"use strict";c.r(t);var a=c("7a23");const s=Object(a["I"])("data-v-f8033042");Object(a["u"])("data-v-f8033042");const n={class:"TeamsPage container-fluid"};Object(a["s"])();const o=s((e,t,c,s,o,b)=>{const r=Object(a["y"])("TeamComponent");return Object(a["r"])(),Object(a["e"])("div",n,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(s.state.teams,e=>(Object(a["r"])(),Object(a["e"])(r,{key:e.id,"team-prop":e},null,8,["team-prop"]))),128))])});var b=c("83fc"),r=c("8a4e"),u=c("f0e2"),j={name:"TeamsPage",setup(){const e=Object(a["v"])({account:Object(a["c"])(()=>b["a"].account),activeQuest:Object(a["c"])(()=>b["a"].activeQuest),teams:Object(a["c"])(()=>b["a"].teams)});return Object(a["p"])(async()=>{try{await u["a"].getAllMembers(e.activeQuest.id)}catch(t){r["logger"].log(t)}}),{state:e}}};j.render=o,j.__scopeId="data-v-f8033042";t["default"]=j}}]);