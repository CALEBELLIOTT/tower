import{_ as l,e as u,E as v,A as c}from"./index.fcd37509.js";import{C as f,c as a,a as n,o,b as s,e as r,d as t,F as m,i as E,p as g,k as h}from"./vendor.fc65a91a.js";const x={name:"Account",setup(){return f(async()=>{await u.getEventsByAccount()}),{account:a(()=>c.account),tickets:a(()=>c.accountEvents)}},components:{EventCard:v}},w=e=>(g("data-v-ff7c6cb2"),e=e(),h(),e),A={class:"container-fluid"},k=w(()=>t("div",{class:"row"},[t("div",{class:"col-12 d-flex"},[t("p",{class:"text-success"},"Your Events")])],-1)),C={class:"row"},S={class:"col-3"};function y(e,B,I,d,P,b){const _=n("logo"),i=n("ProfileEventCard");return o(),s("div",A,[r(_),k,t("div",C,[(o(!0),s(m,null,E(d.tickets,p=>(o(),s("div",S,[r(i,{towerEvent:p},null,8,["towerEvent"])]))),256))])])}var F=l(x,[["render",y],["__scopeId","data-v-ff7c6cb2"]]);export{F as default};
