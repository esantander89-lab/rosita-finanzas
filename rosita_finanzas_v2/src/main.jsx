import React, {useEffect, useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {createClient} from '@supabase/supabase-js';
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid} from 'recharts';
import {LayoutDashboard, Receipt, Users, Scissors, Wallet, Package, BookOpen, LogOut, Plus, Trash2, Pencil, Download} from 'lucide-react';
import * as XLSX from 'xlsx';
import './style.css';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qpkcsjxnxbzoomvqzzrr.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_CkOpCtsgAFrJjkGnEct0Qw_Q3C2zDOH';
const supabase = createClient(supabaseUrl, supabaseKey);
const money = n => new Intl.NumberFormat('es-CL', {style:'currency', currency:'CLP', maximumFractionDigits:0}).format(Number(n||0));
const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0,10);
};
const ym = d => (d||today()).slice(0,7);
function calcIVA(total){ const neto = Math.round(Number(total||0)/1.19); return {neto, iva: Math.round(Number(total||0)-neto)}; }

function App(){
  const [session,setSession]=useState(null); const [tab,setTab]=useState('dashboard');
  useEffect(()=>{supabase.auth.getSession().then(({data})=>setSession(data.session)); const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>setSession(s)); return()=>subscription.unsubscribe();},[]);
  if(!session) return <Login/>;
  return <Shell tab={tab} setTab={setTab} session={session}/>;
}
function Login(){
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState('');
 async function signin(){ setMsg(''); const {error}=await supabase.auth.signInWithPassword({email,password}); if(error)setMsg(error.message);}
 async function signup(){ setMsg(''); const {error}=await supabase.auth.signUp({email,password}); setMsg(error?'Error: '+error.message:'Usuario creado. Revisa si Supabase pide confirmar correo.');}
 return <div className="login"><div className="login-card"><img src="/rosita.jpg"/><h1>Rosita Finanzas</h1><p>Rosita Cortes Studio · Libro financiero inteligente</p><input placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)}/><input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><button onClick={signin}>Ingresar</button><button className="ghost" onClick={signup}>Crear usuario</button><small>{msg}</small></div></div>
}
function Shell({tab,setTab,session}){
 const items=[['dashboard','Dashboard',LayoutDashboard],['ventas','Ventas',Receipt],['clientes','Clientes',Users],['servicios','Servicios',Scissors],['gastos','Gastos',Wallet],['inventario','Inventario',Package],['finanzas','Libro financiero',BookOpen]];
 return <div className="app"><aside><div className="brand"><img src="/rosita.jpg"/><div><h2>Rosita Finanzas</h2><span>v2.0 · React + Supabase</span></div></div>{items.map(([id,label,Icon])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}><Icon size={18}/>{label}</button>)}<button onClick={()=>supabase.auth.signOut()}><LogOut size={18}/>Salir</button></aside><main><header><div><h1>{items.find(i=>i[0]===tab)?.[1]}</h1><p>Rosita Cortes Studio · sistema financiero y operacional</p></div><b>{session.user.email}</b></header>{tab==='dashboard'&&<Dashboard/>}{tab==='ventas'&&<Ventas/>}{tab==='clientes'&&<Clientes/>}{tab==='servicios'&&<Servicios/>}{tab==='gastos'&&<Gastos/>}{tab==='inventario'&&<Inventario/>}{tab==='finanzas'&&<Finanzas/>}</main></div>
}
function useData(){ const [data,setData]=useState({ventas:[],gastos:[],clientes:[],servicios:[]}); const [loading,setLoading]=useState(true); async function load(){setLoading(true); const [v,g,c,s]=await Promise.all([supabase.from('ventas').select('*, clientes(nombre), servicios(nombre)').order('fecha',{ascending:false}),supabase.from('gastos').select('*').order('fecha',{ascending:false}),supabase.from('clientes').select('*').order('nombre'),supabase.from('servicios').select('*').order('nombre')]); setData({ventas:v.data||[],gastos:g.data||[],clientes:c.data||[],servicios:s.data||[]}); setLoading(false);} useEffect(()=>{load()},[]); return {...data,loading,load};}
function Dashboard(){
 const d=useData();
 const currentMonth=ym(today());
 const [mes,setMes]=useState(currentMonth);

 const mesesAnio=[
  ['2026-01','Enero'],['2026-02','Febrero'],['2026-03','Marzo'],['2026-04','Abril'],
  ['2026-05','Mayo'],['2026-06','Junio'],['2026-07','Julio'],['2026-08','Agosto'],
  ['2026-09','Septiembre'],['2026-10','Octubre'],['2026-11','Noviembre'],['2026-12','Diciembre']
 ];

 const ventasMes=d.ventas.filter(v=>ym(v.fecha)===mes);
 const gastosMes=d.gastos.filter(g=>ym(g.fecha)===mes);

 const ventasBrutas=ventasMes.reduce((a,v)=>a+Number(v.total||0),0);
 const comisionPeluqueria=Math.round(ventasBrutas*0.5);
 const ingresoRosita=Math.round(ventasBrutas*0.5);
 const netoRosita=Math.round(ingresoRosita/1.19);
 const ivaRosita=ingresoRosita-netoRosita;
 const totalGastos=gastosMes.reduce((a,g)=>a+Number(g.monto||0),0);
 const cashDisponible=ingresoRosita-ivaRosita-totalGastos;

 const pagos=Object.values(ventasMes.reduce((o,v)=>{
   const k=(v.forma_pago||'Sin pago').replace('Mercado Pago','MP');
   o[k]=o[k]||{name:k,monto:0,cantidad:0};
   o[k].monto+=Number(v.total||0);
   o[k].cantidad+=1;
   return o;
 },{}));

 const mesesGrafico=mesesAnio.map(([key,label])=>({
   mes:label.slice(0,3),
   ventas:d.ventas.filter(x=>ym(x.fecha)===key).reduce((a,x)=>a+Number(x.total||0),0),
   rosita:Math.round(d.ventas.filter(x=>ym(x.fecha)===key).reduce((a,x)=>a+Number(x.total||0),0)*0.5)
 }));

 const colors=['#8d22d8','#ed43b9','#ff9f1c','#2ecc71','#3498db','#f72585'];

 return <>
  <div className="hero">
   <div>
    <h1>Libro financiero mensual</h1>
    <p>Control de ingresos de Rosita como peluquera independiente</p>
   </div>
   <select className="month-select" value={mes} onChange={e=>setMes(e.target.value)}>
    {mesesAnio.map(([key,label])=><option key={key} value={key}>{label}</option>)}
   </select>
  </div>

  <section className="cards pro">
   <Card t="Total vendido" v={money(ventasBrutas)} icon="💰" sub="Ventas brutas del mes"/>
   <Card t="50% peluquería" v={money(comisionPeluqueria)} icon="🏠" sub="Comisión del salón"/>
   <Card t="50% Rosita" v={money(ingresoRosita)} icon="💜" sub="Ingreso bruto Rosita"/>
   <Card t="IVA Rosita" v={money(ivaRosita)} icon="%" sub="IVA incluido en su 50%"/>
   <Card t="Cash disponible" v={money(cashDisponible)} icon="💵" sub="Después de IVA y gastos"/>
  </section>

  <section className="grid dashboard-grid">
   <Panel title="Ventas anuales">
    <p className="panel-sub">Total vendido vs ingreso Rosita por mes</p>
    <ResponsiveContainer width="100%" height={260}>
     <BarChart data={mesesGrafico}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f3e3fa"/>
      <XAxis dataKey="mes"/>
      <YAxis/>
      <Tooltip formatter={money}/>
      <Bar dataKey="ventas" name="Total vendido" fill="#8d22d8" radius={[10,10,0,0]}/>
      <Bar dataKey="rosita" name="50% Rosita" fill="#ed43b9" radius={[10,10,0,0]}/>
     </BarChart>
    </ResponsiveContainer>
   </Panel>

   <Panel title="Métodos de pago">
    <p className="panel-sub">Resumen del mes seleccionado</p>
    {pagos.length===0 ? <div className="empty-state compact"><div className="empty-icon">💳</div><h3>Sin pagos</h3><p>No hay ventas registradas este mes.</p></div> :
    <div className="payment-list">
     {pagos.map((p,i)=>{
      const pct=ventasBrutas?Math.round((p.monto/ventasBrutas)*100):0;
      return <div className="payment-row" key={p.name}>
       <span style={{background:colors[i%colors.length]}}></span>
       <b>{p.name}</b>
       <small>{p.cantidad} ventas</small>
       <strong>{money(p.monto)}</strong>
       <em>{pct}%</em>
      </div>
     })}
    </div>}
   </Panel>
  </section>

  <section className="grid bottom-grid">
   <Panel title="Ventas del mes">
    <Table rows={ventasMes} cols={['fecha','clientes.nombre','servicios.nombre','forma_pago','total']} del={()=>{}}/>
   </Panel>

   <Panel title="Resumen financiero">
    <div className="finance-list vertical">
     <b>Total vendido <span>{money(ventasBrutas)}</span></b>
     <b>Comisión peluquería 50% <span>{money(comisionPeluqueria)}</span></b>
     <b>Ingreso bruto Rosita 50% <span>{money(ingresoRosita)}</span></b>
     <b>Neto Rosita <span>{money(netoRosita)}</span></b>
     <b>IVA estimado <span>{money(ivaRosita)}</span></b>
     <b>Gastos del mes <span>{money(totalGastos)}</span></b>
     <b className="cash">Cash disponible <span>{money(cashDisponible)}</span></b>
    </div>
   </Panel>
  </section>
 </>
}
function Card({t,v,icon,sub}){
 return <div className="card stat-card">
   <div>
     <span>{t}</span>
     <strong>{v}</strong>
     <small>{sub}</small>
   </div>
   <em>{icon}</em>
 </div>
}
function Panel({title,children}){return <div className="panel"><h2>{title}</h2>{children}</div>}
function Ventas(){
 const {ventas,clientes,servicios,load}=useData();
 const initialVenta={
   fecha:today(),
   cliente_id:'',
   servicio_id:'',
   precio:'',
   adicional:'',
   forma_pago:'Débito (Mercado Pago)',
   estado:'Pagado',
   documento:'Boleta',
   afecta_iva:true
 };
 const [f,setF]=useState(initialVenta);
 const [editId,setEditId]=useState(null);

 async function save(){
   if(!f.cliente_id || !f.servicio_id){
     alert('Debes seleccionar cliente y servicio.');
     return;
   }

   const precio=Number(f.precio||0);
   const adicional=Number(f.adicional||0);
   const total=precio+adicional;
   const calc=f.afecta_iva ? calcIVA(total) : {neto:total,iva:0};

   const venta={
     fecha:f.fecha,
     cliente_id:f.cliente_id,
     servicio_id:f.servicio_id,
     precio,
     adicional,
     forma_pago:f.forma_pago,
     estado:f.estado,
     documento:f.documento,
     afecta_iva:f.afecta_iva,
     iva:calc.iva,
     neto:calc.neto
   };

   const result = editId
     ? await supabase.from('ventas').update(venta).eq('id',editId)
     : await supabase.from('ventas').insert(venta);

   if(result.error){
     console.error('Error guardando venta:', result.error);
     alert('Error guardando venta: '+result.error.message);
     return;
   }

   setF(initialVenta);
   setEditId(null);
   load();
 }

 function edit(row){
   setEditId(row.id);
   setF({
     fecha:row.fecha || today(),
     cliente_id:row.cliente_id || '',
     servicio_id:row.servicio_id || '',
     precio:row.precio || '',
     adicional:row.adicional || '',
     forma_pago:row.forma_pago || 'Débito (Mercado Pago)',
     estado:row.estado || 'Pagado',
     documento:row.documento || 'Boleta',
     afecta_iva:row.afecta_iva ?? true
   });
   window.scrollTo({top:0,behavior:'smooth'});
 }

 function cancelEdit(){
   setEditId(null);
   setF(initialVenta);
 }

 async function del(id){
   if(confirm('¿Eliminar venta?')){
     await supabase.from('ventas').delete().eq('id',id);
     load();
   }
 }

 function exp(){
   const ws=XLSX.utils.json_to_sheet(ventas);
   const wb=XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb,ws,'Ventas');
   XLSX.writeFile(wb,'ventas_rosita.xlsx');
 }

 return <CrudForm
   title={editId ? 'Editar venta' : 'Registrar venta'}
   onSave={save}
   extra={<>
     <button onClick={exp}><Download size={16}/>Excel</button>
     {editId && <button className="ghost" onClick={cancelEdit}>Cancelar</button>}
   </>}
 >
   <input type="date" value={f.fecha} onChange={e=>setF({...f,fecha:e.target.value})}/>

   <select value={f.cliente_id} onChange={e=>setF({...f,cliente_id:e.target.value})}>
     <option value="">Seleccionar cliente</option>
     {clientes.map(c=><option value={c.id} key={c.id}>{c.nombre}</option>)}
   </select>

   <select value={f.servicio_id} onChange={e=>{
     const servicio=servicios.find(s=>s.id===e.target.value);
     setF({...f,servicio_id:e.target.value,precio:servicio?.precio_base||f.precio});
   }}>
     <option value="">Seleccionar servicio</option>
     {servicios.map(s=><option value={s.id} key={s.id}>{s.nombre}</option>)}
   </select>

   <input placeholder="Precio" type="number" value={f.precio} onChange={e=>setF({...f,precio:e.target.value})}/>
   <input placeholder="Adicional" type="number" value={f.adicional} onChange={e=>setF({...f,adicional:e.target.value})}/>

   <select value={f.forma_pago} onChange={e=>setF({...f,forma_pago:e.target.value})}>
     <option value="Débito (Mercado Pago)">Débito (Mercado Pago)</option>
     <option value="Efectivo">Efectivo</option>
     <option value="Transferencia">Transferencia</option>
     <option value="Crédito">Crédito</option>
   </select>

   <select value={f.documento} onChange={e=>setF({...f,documento:e.target.value})}>
     <option value="Boleta">Boleta</option>
     <option value="Factura">Factura</option>
     <option value="Sin documento">Sin documento</option>
   </select>

   <Table rows={ventas} cols={['fecha','clientes.nombre','servicios.nombre','forma_pago','total']} del={del} edit={edit}/>
 </CrudForm>
}
function Clientes(){return <Simple table="clientes" fields={['nombre','telefono','instagram','observaciones']} />}
function Servicios(){return <Simple table="servicios" fields={['nombre','precio_base','duracion_minutos']} />}
function Gastos(){return <Simple table="gastos" fields={['fecha','descripcion','categoria','monto','forma_pago']} defaults={{fecha:today(),tiene_factura:false,afecta_iva:false}} compute={(f)=>{const iva=f.tiene_factura&&f.afecta_iva?calcIVA(f.monto).iva:0; const neto=iva?calcIVA(f.monto).neto:Number(f.monto||0); return {...f,iva,neto}}}/>} 
function Inventario(){return <Simple table="inventario" fields={['producto','categoria','stock','stock_minimo','costo','proveedor']} />}
function Finanzas(){return <Dashboard/>}
function Simple({table,fields,defaults={},compute}){
 const [rows,setRows]=useState([]);
 const [f,setF]=useState(defaults);
 const [editId,setEditId]=useState(null);

 async function load(){
   const {data}=await supabase.from(table).select('*').order(fields[0]);
   setRows(data||[]);
 }

 useEffect(()=>{load()},[]);

 async function save(){
   const payload=compute?compute(f):f;

   if(editId){
     await supabase.from(table).update(payload).eq('id',editId);
   }else{
     await supabase.from(table).insert(payload);
   }

   setF(defaults);
   setEditId(null);
   load();
 }

 function edit(row){
   setEditId(row.id);
   setF({...row});
   window.scrollTo({top:0,behavior:'smooth'});
 }

 function cancelEdit(){
   setEditId(null);
   setF(defaults);
 }

 async function del(id){
   if(confirm('¿Eliminar registro?')){
     await supabase.from(table).delete().eq('id',id);
     load();
   }
 }

 return <CrudForm
   title={editId ? `Editar registro: ${table}` : `Nuevo registro: ${table}`}
   onSave={save}
   saveLabel={editId ? 'Actualizar' : 'Guardar'}
   extra={editId && <button className="ghost" onClick={cancelEdit}>Cancelar</button>}
 >
   {fields.map(x=>
     <input
       key={x}
       placeholder={x}
       type={x.includes('fecha')?'date':x.includes('monto')||x.includes('precio')||x.includes('stock')||x.includes('costo')||x.includes('duracion')?'number':'text'}
       value={f[x]||''}
       onChange={e=>setF({...f,[x]:e.target.value})}
     />
   )}

   {table==='gastos'&&<>
     <label><input type="checkbox" checked={!!f.tiene_factura} onChange={e=>setF({...f,tiene_factura:e.target.checked})}/> Tiene factura</label>
     <label><input type="checkbox" checked={!!f.afecta_iva} onChange={e=>setF({...f,afecta_iva:e.target.checked})}/> Afecta IVA</label>
   </>}

   <Table rows={rows} cols={fields} del={del} edit={edit}/>
 </CrudForm>
}

function CrudForm({title,onSave,children,extra,saveLabel='Guardar'}){
 </CrudForm>
   
function CrudForm({title,onSave,children,extra,saveLabel='Guardar'}){
 return <div className="panel">
   <div className="panel-head">
     <h2>{title}</h2>
     <div>{extra}<button onClick={onSave}><Plus size={16}/>{saveLabel}</button></div>
   </div>
   <div className="form">{children}</div>
 </div>
}
function get(obj,path){return path.split('.').reduce((o,k)=>o?.[k],obj)}
function Table({rows,cols,del,edit}){
 return <table>
   <thead>
     <tr>{cols.map(c=><th key={c}>{c}</th>)}<th>acciones</th></tr>
   </thead>
   <tbody>
     {rows.map(r=><tr key={r.id}>
       {cols.map(c=><td key={c}>{c.includes('total')||c.includes('monto')||c.includes('precio')||c.includes('costo')?money(get(r,c)):String(get(r,c)??'')}</td>)}
       <td className="actions">
         {edit && <button className="edit" onClick={()=>edit(r)}><Pencil size={15}/></button>}
         <button className="danger" onClick={()=>del(r.id)}><Trash2 size={15}/></button>
       </td>
     </tr>)}
   </tbody>
 </table>
}
createRoot(document.getElementById('root')).render(<App/>); 
