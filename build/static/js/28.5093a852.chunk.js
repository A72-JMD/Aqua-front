(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[28],{1409:function(e,t,a){"use strict";a.r(t);var n=a(4),o=a.n(n),c=a(63),i=(a(915),a(918));t.default=function(e){const[t,a]=Object(n.useState)(!1),[r,l]=Object(n.useState)([]),[s,u]=Object(n.useState)();return Object(n.useEffect)(()=>{(async()=>{var e="Bearer ".concat((await c.b.currentSession()).getIdToken().getJwtToken());u(e)})();var t="test";(async n=>{try{let e="Fiji-Dev",a="/compliancefiles",i={headers:{thirdparty:n,Authorization:"Bearer ".concat((await c.b.currentSession()).getIdToken().getJwtToken())}};console.log("==========INIT with token=============="),Array.isArray(i.headers),t=i.headers.Authorization,console.log("========================");var o=await c.a.get(e,a,i);console.log(o),l(o)}catch(i){"Request failed with status code 502"===i.message?a(!0):(alert(JSON.stringify(i)),e.onLogout())}})("Miami"),console.log(t)},[]),o.a.createElement("div",null,Array.isArray(r.Files)&&r.Files.map(e=>o.a.createElement("div",null,e.Miami.map((function(e){return o.a.createElement("div",null,o.a.createElement("div",{class:"d-none d-sm-inline-block col-sm-6"},o.a.createElement("button",{onClick:()=>async function(e){i.a.httpRequest("https://ww8jinvodc.execute-api.ap-southeast-2.amazonaws.com/V1/fiji-web-files/Compliance%2FShared_Files%2FZurich%2F"+e,"get",s).then(e=>e.blob()).then(t=>{const a=window.URL.createObjectURL(new Blob([t])),n=document.createElement("a");n.href=a,n.setAttribute("download",e),document.body.appendChild(n),n.click(),n.parentNode.removeChild(n)})}(e.File),class:"float-right btn btn-primary"},o.a.createElement("i",{class:"icon-cloud-download"})),o.a.createElement("div",{"aria-label":"Toolbar with button groups",role:"toolbar",class:"float-right btn-toolbar"},o.a.createElement("div",{"aria-label":"First group",role:"group",class:"mr-3 btn-group"},o.a.createElement("button",{type:"button",class:"btn btn-outline-secondary"},e.Object),o.a.createElement("button",{type:"button",class:"btn btn-outline-secondary active"},e.File),o.a.createElement("button",{type:"button",class:"btn btn-outline-secondary"},"Status")))))})))))}},915:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(4),o=a.n(n),c=a(917),i=a(1032);a(916);function r(e){let{isLoading:t,className:a="",disabled:n=!1,...r}=e;return o.a.createElement(c.a,Object.assign({className:"LoaderButton ".concat(a),disabled:n||t},r),t&&o.a.createElement(i.a,{size:"sm",color:"light"}),r.children)}},916:function(e,t,a){},917:function(e,t,a){"use strict";var n=a(908),o=a(909),c=a(913),i=a(911),r=a(4),l=a.n(r),s=a(108),u=a.n(s),b=a(906),d=a.n(b),p=a(907),h=["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"],m={active:u.a.bool,"aria-label":u.a.string,block:u.a.bool,color:u.a.string,disabled:u.a.bool,outline:u.a.bool,tag:p.n,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),onClick:u.a.func,size:u.a.string,children:u.a.node,className:u.a.string,cssModule:u.a.object,close:u.a.bool},f=function(e){function t(t){var a;return(a=e.call(this,t)||this).onClick=a.onClick.bind(Object(c.a)(a)),a}Object(i.a)(t,e);var a=t.prototype;return a.onClick=function(e){if(!this.props.disabled)return this.props.onClick?this.props.onClick(e):void 0;e.preventDefault()},a.render=function(){var e=this.props,t=e.active,a=e["aria-label"],c=e.block,i=e.className,r=e.close,s=e.cssModule,u=e.color,b=e.outline,m=e.size,f=e.tag,g=e.innerRef,y=Object(o.a)(e,h);r&&"undefined"===typeof y.children&&(y.children=l.a.createElement("span",{"aria-hidden":!0},"\xd7"));var v="btn"+(b?"-outline":"")+"-"+u,k=Object(p.j)(d()(i,{close:r},r||"btn",r||v,!!m&&"btn-"+m,!!c&&"btn-block",{active:t,disabled:this.props.disabled}),s);y.href&&"button"===f&&(f="a");var j=r?"Close":null;return l.a.createElement(f,Object(n.a)({type:"button"===f&&y.onClick?"button":void 0},y,{className:k,ref:g,onClick:this.onClick,"aria-label":a||j}))},t}(l.a.Component);f.propTypes=m,f.defaultProps={color:"secondary",tag:"button"},t.a=f},918:function(e,t,a){"use strict";const n={httpRequest:(e,t,a,n,o)=>{const c={method:t,headers:{"Content-Type":"application/json",authorization:a}};return"post"===t.toLowerCase()&&n&&n.length>0&&(c.body=JSON.stringify(n)),o&&"object"===typeof o&&Object.keys(o).length>0&&(c.headers=o),fetch(e,c).then(e=>{if(e.ok){let t=e;return console.log("check data"),console.log(t),t}return Promise.reject(e)})}};t.a=n}}]);
//# sourceMappingURL=28.5093a852.chunk.js.map