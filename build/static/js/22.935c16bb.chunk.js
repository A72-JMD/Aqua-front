(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[22],{1399:function(e,a,t){"use strict";t.r(a);var n=t(4),o=t.n(n),l=(t(63),t(929)),c=t(931),r=t(936),s=t(919),i=t(983),u=t.n(i);a.default=function(e){const[a,t]=Object(n.useState)("Vendor Assessment"),[i,d]=Object(n.useState)([]),[m,f]=Object(n.useState)(!1),[g,p]=Object(n.useState)(!1),[h,v]=Object(n.useState)(1),y=[{label:"Domain",subtext:"Null",question_ref:"ISABCM_77",key:"domain",type:"text",validations:[{value:!0,rulename:"mandatory",errormsg:"This question is required."}],dependencies:[],value:""}];Object(n.useEffect)(()=>{b()},[]);const b=async()=>{d(y),console.log("props.match.params.id");let a=u.a.parse(e.location.search);console.log(a),console.log(!!a.jwt),console.log(e),p(!0),await E().then(e=>{f(!1),p(!0)}).catch(e=>{console.error(e)})},E=async()=>(console.log("got here"),await Object(s.a)("/test_lambda")),k=async e=>{console.log("submittedHere"),console.log(e),(async e=>{f(!0);var a=await Object(s.b)("/test_lambda",e);f(!1)})(e)};return o.a.createElement("div",{className:"animated fadeIn"},g?o.a.createElement(c.a,null,o.a.createElement(l.a,{className:"form",model:i,onSubmit:e=>{k(e)}})):o.a.createElement(r.a,null))}},915:function(e,a,t){"use strict";t.d(a,"a",(function(){return r}));var n=t(4),o=t.n(n),l=t(917),c=t(1032);t(916);function r(e){let{isLoading:a,className:t="",disabled:n=!1,...r}=e;return o.a.createElement(l.a,Object.assign({className:"LoaderButton ".concat(t),disabled:n||a},r),a&&o.a.createElement(c.a,{size:"sm",color:"light"}),r.children)}},916:function(e,a,t){},919:function(e,a,t){"use strict";t.d(a,"a",(function(){return l})),t.d(a,"b",(function(){return c}));var n=t(63),o=t(55);async function l(e){let a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];try{console.log("Test Getting");let l=o.a.apiGateway.NAME,c=e,r=a?{headers:{Authorization:"Bearer ".concat((await n.b.currentSession()).getIdToken().getJwtToken())}}:"";var t=await n.a.get(l,c,r);console.log("GET result"),console.log(t)}catch(l){if("Request failed with status code 502"===l.message);else{if("Request failed with status code 400"===l.message)return null;console.log(l)}}return t}async function c(e,a){try{delete a.isLoading;let l=o.a.apiGateway.NAME,c=e,r={headers:{Authorization:"Bearer ".concat((await n.b.currentSession()).getIdToken().getJwtToken())},body:a};var t=await n.a.post(l,c,r);console.log("POST result"),console.log(t)}catch(l){"Request failed with status code 502"===l.message||(console.log("POST ERROR"),console.log(l))}return t}},929:function(e,a,t){"use strict";t.d(a,"a",(function(){return E}));var n=t(4),o=t.n(n),l=t(973),c=t(925),r=t(974),s=t(975),i=t(976),u=t(977),d=t(932),m=t(955),f=t(937),g=t(944),p=t(956),h=t(959),v=t(917),y=t(915),b=t(919);function E(e){const[a,t]=Object(n.useState)({isLoading:!1,doneBuildingModel:!1,dependencies:{},formModel:{}}),[E,k]=Object(n.useState)(0),[O,j]=Object(n.useState)(0),[M,x]=Object(n.useState)(0),S=Object(n.useRef)(null);var w=[{}];Object(n.useEffect)(()=>{(async()=>{await N()})()},[]);const N=()=>{let n=e.model;var o={...a};console.log("JMD-"),k(e.visiblePage?e.visiblePage:0),j(e.maxPages?e.maxPages:1),o.formModel=n,o.doneBuildingModel=!0,t({...o})},C=async n=>{console.log("submitted"),n.preventDefault();let o=a.formModel,l={};o.map(e=>{e.options?l[e.key]=e.value||Object.keys(e.options)[0].toString():l[e.key]=e.value||""}),(()=>{var e=!0;try{Object.keys(a.formModel).map((function(t){console.log(w[t].required),w[t].required&&a.formModel[t].length<=0&&(e=!1),a.formModel[t].length>0&&a.formModel[t].length<w[t].length&&(e=!1)}))}catch(t){}return e})()?(t({...a,isLoading:!0}),e.onSubmit&&e.onSubmit(l),t({...a,isLoading:!1}),console.log("Validation Success")):alert("Validation Failed")},q=(e,n)=>{var o={...a},l=o.formModel.findIndex(a=>a.key===e);l>-1?o.formModel[l].value=n:console.log("Failed to find index in model"),t({...o})};function B(e){let t=a.formModel.findIndex(a=>a.key===e);return t>-1?a.formModel[t]:(console.log("findFieldByKey() failed to find index"),null)}const T=e=>{var t=e.target.name,n=e.target.value;q(t,n);var o=B(t);o.onChange&&o.onChange(e,a)},I=e=>{var t=e.target.name,n=e.target.value;q(t,n);var o=B(t);o.onChange&&o.onChange(e,a)},F=e=>{var n=e.target.name;((e,n,o)=>{var l={...a},c=l.formModel.findIndex(a=>a.key===e);if(c>-1){var r=[];""===l.formModel[c].value&&(l.formModel[c].value=r),r=l.formModel[c].value,o?r.push(n):r=r.filter(e=>e!==n),l.formModel[c].value=r}else console.log("Failed to find index in model");t({...l})})(n,e.target.value,e.target.checked);var o=B(n);o.onChange&&o.onChange(e,a)},L=async n=>{t({...a,isLoading:!0}),S.current=n.target.files[0];var o=n.target.attributes.order.value,l=S.current.name.split(".").pop(),c=n.target.id;if(S.current&&S.current.size>5e6)alert("Please pick a file smaller than ".concat(5," MB."));else{var r=await(async a=>Object(b.a)("/files/presignedurl?fileName=".concat(a,"&assessment=").concat(e.assessmentId)))("".concat(o,".").concat(l));try{await fetch(r.body,{method:"PUT",body:S.current,headers:{"Content-Type":"multipart/form-data"}}).then(e=>e.json())}catch(n){"Request failed with status code 502"===n.message||console.log(n)}var s={...a};q(c,S.current.name),t({...s}),e.onSubmit&&e.onSubmit(s),t({...a,isLoading:!1})}},_=e=>{e.preventDefault(),E+2>O?console.log("".concat(E+2," is greater than the max pages ").concat(O)):k(E+1)},P=(e,a)=>{e.preventDefault(),a+1>=M&&a+1<=O?k(a):console.log("".concat(a," is out of bounds."))},R=(e,a,t)=>!0===e?o.a.createElement(c.a,{className:"form-check-input",type:"radio",id:"".concat(a,"_").concat(t),questionId:a,name:a,value:t,parent:a,onChange:e=>{I(e)},checked:!0}):o.a.createElement(c.a,{className:"form-check-input",type:"radio",id:"".concat(a,"_").concat(t),questionId:a,name:a,value:t,parent:a,onChange:e=>{I(e)}}),A=(a,t,n)=>o.a.createElement("div",null,o.a.createElement(c.a,Object.assign({},e,{type:"select",id:t,name:t,key:"".concat(t,"input"),defaultValue:n,onChange:e=>{T(e)},required:!0,className:"form-control"}),Object.keys(a).map((e,t)=>o.a.createElement("option",{key:"".concat(t,"selectOption"),value:e,selected:a[e]===n?"selected":""},a[e])))),V=(a,t,n)=>o.a.createElement("div",null,o.a.createElement(c.a,Object.assign({},e,{type:a,id:t,name:t,key:"".concat(t,"input"),defaultValue:n,onChange:e=>{T(e)},required:!0,className:"form-control"}))),z=(a,t,n,l)=>!0===(""!==n)?(e=>o.a.createElement("p",{className:"form-control-static"},e))(n):o.a.createElement("div",null,o.a.createElement(c.a,Object.assign({},e,{type:a,id:t,name:t,key:"".concat(t,"input"),onChange:e=>{L(e)},order:l,"data-order":l,required:!0,className:"form-control"}))),D=e=>o.a.createElement(s.a,{listClassName:"justify-content-center"},o.a.createElement(i.a,{disabled:0===E},o.a.createElement(u.a,{previous:!0,onClick:e=>(e=>{e.preventDefault(),E-1<M?console.log("".concat(E-1," is less than the min pages ").concat(M)):k(E-1)})(e),href:"#"})),[...Array(e)].map((e,a)=>o.a.createElement(i.a,{active:a===E,key:a},o.a.createElement(u.a,{onClick:e=>P(e,a),href:"#"},a+1))),o.a.createElement(i.a,{disabled:E+1===e},o.a.createElement(u.a,{next:!0,onClick:e=>_(e),href:"#"}))),J=e=>{try{return o.a.createElement(o.a.Fragment,null,Object.keys(e[E]).map((t,n)=>o.a.createElement(o.a.Fragment,null,o.a.createElement("h3",null,t),o.a.createElement("p",null),o.a.createElement("div",null,e[E][t].sort((e,a)=>e.order>a.order).map(n=>{let s=n.key,i=n.type||"text",u=(n.props,n.placeholder,n.value||""),m=n.options||{},f=n.question_ref;return(async e=>{e.map((a,t)=>{var n=e[t].key;w[n]={...e[t].validation}})})(e[E][t]),(e=>{var t={...a};e.map((e,a)=>{e.dependencies.length>0&&(t.dependencies[e.key]=e.dependencies)})})(e[E][t]),o.a.createElement(l.a,{row:!0,key:"".concat(s,"label")},o.a.createElement(d.a,{md:"3"},o.a.createElement(r.a,{htmlFor:s},n.order," - ",n.label)),o.a.createElement(d.a,{xs:"12",md:"9"},(()=>{switch(i){case"select":return A(m,s,u);case"radio":return function(e,a,t){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1;return o.a.createElement("span",null,Object.keys(e).sort((e,a)=>e<a).map((t,c)=>o.a.createElement(l.a,{key:"".concat(c,"radioformgroup"),check:!0,className:"radio"},R(t===n,a,t),o.a.createElement(r.a,{check:!0,className:"form-check-label",htmlFor:"".concat(a,"_").concat(t)},e[t]))))}(m,s,f,u);case"checkbox":return function(e,t){var n=[],s=a.formModel.findIndex(e=>e.key===t);return s>-1?n=a.formModel[s].value:console.log("Failed to find index in model"),o.a.createElement("span",null,Object.keys(e).map((a,s)=>o.a.createElement(l.a,{check:!0,className:"checkbox",key:"".concat(s,"checkboxformgroup")},o.a.createElement(c.a,{className:"form-check-input",type:"checkbox",id:"".concat(t,"_").concat(a),name:t,value:a,parent:t,onChange:e=>{F(e)},checked:n.includes(a)}),o.a.createElement(r.a,{check:!0,className:"form-check-label",htmlFor:"".concat(t,"_").concat(a)},e[a]))))}(m,s,u);case"text":case"textarea":case"date":case"tel":return V(i,s,u);case"file":return z(i,s,u,n.order);default:return"renderStatic(fieldValue)"}})()))})))),D(O))}catch(t){return o.a.createElement("div",null,t.message)}};return o.a.createElement(d.a,{md:"12"},o.a.createElement(m.a,null,o.a.createElement(f.a,{className:"needs-validation",noValidate:!0,onSubmit:e=>{C(e)},method:"post"},(()=>{if(e.title)return o.a.createElement(g.a,null,o.a.createElement("strong",null,e.title))})(),o.a.createElement(p.a,null,!0===a.doneBuildingModel&&(()=>{let t=a.formModel;if(!0===e.pagination){var n=[...new Set(t.map(e=>e.category))].map(e=>{var a={};return a[e]=t.filter(a=>a.category===e),a});return J(n)}})()),o.a.createElement(h.a,null,o.a.createElement("div",null),o.a.createElement(y.a,{size:"sm",color:"primary",type:"submit",isLoading:a.isLoading,className:"mx-1"},"Save"),(()=>{if(e.cancelButton)return o.a.createElement(v.a,{size:"sm",color:"link",type:"reset",className:"mx-1",onClick:e.cancelButton},e.cancelButtonText)})()))))}}}]);
//# sourceMappingURL=22.935c16bb.chunk.js.map