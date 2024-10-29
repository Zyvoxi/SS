import{r as s,b as T,j as e,C as U,w as D,B as r,T as b,H as y,J as j,t as C,v as S,K as F,O as B,g as G,d as w,D as A,s as E,n as N,Q as z}from"./vendor-DWPR60qk.js";import{l as J}from"./SSLogoIcon-BQTe5smu.js";import{G as K,c as i,s as c}from"./Skills-DWyMbeDh.js";import{l as x}from"./index-CK6Jg2Vy.js";const I=E("span")(({theme:t})=>({borderRadius:3,width:16,height:16,boxShadow:"inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",backgroundColor:"#f5f8fa",backgroundImage:"linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",".Mui-focusVisible &":{outline:"2px auto rgba(19,124,189,.6)",outlineOffset:2},"input:hover ~ &":{backgroundColor:"#ebf1f5",...t.applyStyles("dark",{backgroundColor:"#30404d"})},"input:disabled ~ &":{boxShadow:"none",background:"rgba(206,217,224,.5)",...t.applyStyles("dark",{background:"rgba(57,75,89,.5)"})},...t.applyStyles("dark",{boxShadow:"0 0 0 1px rgb(16 22 26 / 40%)",backgroundColor:"#394b59",backgroundImage:"linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"})})),H=E(I)({backgroundColor:"#137cbd",backgroundImage:"linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))","&::before":{display:"block",width:16,height:16,backgroundImage:`url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E")`,content:"''"},"input:hover ~ &":{backgroundColor:"#106ba3"}}),V=N({components:{MuiButton:{styleOverrides:{root:{transition:"500ms ease !important",backgroundImage:"linear-gradient(to bottom, #666, #000)","&:hover":{background:"linear-gradient(to bottom, #666, #222)"},"&:focus":{outline:"none !important"}}}}}}),_=t=>{const d=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,l=/^[a-zA-Z0-9._ -]{3,}$/;return d.test(t)||l.test(t)};function X(){const[t,d]=s.useState(""),[l,P]=s.useState(""),[k,g]=s.useState(""),[v,u]=s.useState(""),h=T();s.useEffect(()=>(document.body.style.background="radial-gradient(circle, #f0f8fb, #f6fbff, #ffffff)",()=>{document.body.style.background=""}),[]);const O=a=>{const o=a.credential;x.debug("TOKEN: ",o);try{const n=z(o),m=crypto.randomUUID(),p=i.companies[Math.floor(Math.random()*i.companies.length)],f=c.skills[Math.floor(Math.random()*c.skills.length)],R={id:m,name:n.name,picture:n.picture,dob:n.birthday||"27/07/1997",location:"Extrema - MG",company:p,skill:f};localStorage.setItem("userProfile",JSON.stringify(R)),h("/SS")}catch(n){console.error("Erro ao decodificar o token:",n)}},M=()=>{x.debug("login via google"),google&&google.accounts?google.accounts.id.prompt():console.error("google.accounts não está disponível")};s.useEffect(()=>((()=>{const o=document.createElement("script");o.src="https://accounts.google.com/gsi/client",o.async=!0,o.defer=!0,o.onload=()=>{window.google&&google.accounts.id.initialize({client_id:"763143041695-60bjan0591o8rbm3juj9bk004cr9ng8e.apps.googleusercontent.com",callback:O})},document.body.appendChild(o)})(),()=>{window.google&&google.accounts&&google.accounts.id.cancel()}));const W=()=>{let o=!0;if(t?_(t)?g(""):(g("Por favor, insira um nome de usuário ou e-mail válido."),o=!1):(g("O campo é obrigatório."),o=!1),l?l.length<6?(u("A senha deve ter pelo menos 6 caracteres."),o=!1):u(""):(u("O campo de senha é obrigatório."),o=!1),o){const n=crypto.randomUUID(),m=i.companies[Math.floor(Math.random()*i.companies.length)],p=c.skills[Math.floor(Math.random()*c.skills.length)],f={id:n,name:t,dob:"27/07/1997",location:"Extrema - MG",company:m,skill:p};localStorage.setItem("userProfile",JSON.stringify(f)),h("/SS")}},L=()=>{x.debug("Redirecionar para recuperação de senha (função não implementada)")};return e.jsx(U,{maxWidth:"xs",sx:{display:"flex",justifyContent:"center",alignItems:"center",alignSelf:"center"},children:e.jsxs(D,{elevation:15,sx:{padding:4,width:"100%",position:"relative"},children:[e.jsxs(r,{sx:{position:"absolute",top:16,left:16,display:"flex",alignItems:"center"},children:[e.jsx("img",{src:J,alt:"logo",className:"rotating-logo",style:{width:"20px",height:"20px",marginRight:"5px"}}),e.jsx(b,{variant:"h6",sx:{background:"linear-gradient(90deg, #00c6ff, #0072ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"monospace",fontWeight:700,letterSpacing:".2rem",fontSize:"14px"},children:"STOPSKILL"})]}),e.jsx(r,{mt:5,mb:3,children:e.jsx(b,{variant:"h4",align:"left",fontWeight:550,children:"Entrar"})}),e.jsx(r,{mb:1,children:e.jsxs(y,{fullWidth:!0,sx:{textAlign:"left"},children:[e.jsx(j,{htmlFor:"username",children:"Usuário"}),e.jsx(C,{fullWidth:!0,variant:"outlined",placeholder:"John Doe",type:"text",value:t,onChange:a=>d(a.target.value),error:!!k,helperText:k,slotProps:{input:{sx:{height:"40px",borderRadius:"8px"}}}})]})}),e.jsx(r,{mb:2,children:e.jsxs(y,{fullWidth:!0,sx:{textAlign:"left"},children:[e.jsxs(r,{display:"flex",justifyContent:"space-between",mt:1,children:[e.jsx(j,{htmlFor:"password",children:"Senha"}),e.jsx(S,{component:"button",type:"button",onClick:L,variant:"body2",underline:"none",sx:{alignSelf:"baseline",color:"black",position:"relative",overflow:"hidden","&::after":{content:"''",position:"absolute",bottom:0,left:0,width:"100%",height:"0.1em",backgroundColor:"#aaa",opacity:1,transform:"translate3d(0, 0, 0)",transition:"ease-out 400ms"},"&:hover::after, &:focus::after":{transform:"translate3d(-100%, 0, 0)"}},children:"Esqueceu a Senha?"})]}),e.jsx(C,{fullWidth:!0,variant:"outlined",placeholder:"••••••",type:"password",value:l,onChange:a=>P(a.target.value),error:!!v,helperText:v,slotProps:{input:{sx:{height:"40px",borderRadius:"8px"}}}})]})}),e.jsx(r,{mb:2,sx:{display:"flex",justifyContent:"start"},children:e.jsx(F,{control:e.jsx(B,{value:"remember",sx:{"&:hover":{bgcolor:"transparent"}},disableRipple:!0,color:"default",checkedIcon:e.jsx(H,{}),icon:e.jsx(I,{}),inputProps:{"aria-label":"Checkbox demo"}}),label:"Lembre-me"})}),e.jsxs(r,{mb:2,children:[e.jsx(G,{theme:V,children:e.jsx(w,{fullWidth:!0,variant:"contained",onClick:W,children:"Entrar"})}),e.jsxs(b,{sx:{textAlign:"center"},mt:2,children:["Não possui uma conta?"," ",e.jsx(S,{component:"button",type:"button",onClick:()=>{h("/SS/signup")},underline:"none",sx:{color:"black",fontSize:"inherit",lineHeight:"inherit",position:"relative",overflow:"hidden","&::after":{content:"''",position:"absolute",bottom:0,left:0,width:"100%",height:"0.1em",backgroundColor:"#aaa",opacity:1,transform:"translate3d(0, 0, 0)",transition:"ease-out 400ms"},"&:hover::after, &:focus::after":{transform:"translate3d(-100%, 0, 0)"}},children:"Registre-se"})]})]}),e.jsx(r,{mb:2,width:"100%",children:e.jsx(A,{children:"ou"})}),e.jsx(r,{width:"100%",children:e.jsx(w,{fullWidth:!0,variant:"outlined",startIcon:e.jsx(K,{}),onClick:M,sx:{color:"black",backgroundColor:"transparent",borderColor:"black","&:hover":{borderColor:"#666"}},children:"Entrar com Google"})})]})})}export{X as default};
