import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';
import {
  ArrowDown, ArrowLeft, ArrowUp, ArrowUpDown, Box, ChevronLeft, ChevronRight, CircleAlert,
  ClipboardList, LayoutDashboard, LoaderCircle, Plus, Search, ShoppingBag, SlidersHorizontal,
  Users, X, Pencil, Trash2, PackageOpen, RotateCw,
} from 'lucide-react';
import {
  getGetCustomerQueryKey, getGetDashboardQueryKey, getGetOrderQueryKey, getGetProductQueryKey,
  getListCustomersQueryKey, getListOrdersQueryKey, getListProductsQueryKey, useCreateCustomer,
  useCreateOrder, useCreateProduct, useDeleteCustomer, useDeleteOrder, useDeleteProduct,
  useGetCustomer, useGetDashboard, useGetOrder, useGetProduct, useListCustomers, useListOrders,
  useListProducts, useUpdateCustomer, useUpdateOrder, useUpdateProduct,
} from '@workspace/api-client-react';
import type {
  Customer, CustomerInput, DashboardSummary, ListCustomersParams, ListOrdersParams,
  ListProductsParams, Order, OrderInput, Product, ProductInput,
} from '@workspace/api-client-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
type Entity = 'clientes' | 'produtos' | 'pedidos';
type Params = ListCustomersParams | ListProductsParams | ListOrdersParams;

const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
const date = (value: string) => value ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(value)) : '—';
const statusName = (status: string) => ({ open: 'Em aberto', paid: 'Pago', canceled: 'Cancelado' }[status] || status);
const errMessage = (error: unknown) => {
  if (error && typeof error === 'object' && 'message' in error) return String((error as { message: unknown }).message);
  return 'Não foi possível concluir. Tente novamente.';
};

function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const nav = [
    { href: '/', label: 'Visão geral', icon: LayoutDashboard },
    { href: '/clientes', label: 'Clientes', icon: Users },
    { href: '/produtos', label: 'Produtos', icon: Box },
    { href: '/pedidos', label: 'Pedidos', icon: ClipboardList },
  ];
  const section = location === '/' ? 'Operação' : location.split('/')[1];
  return <div className="app-frame">
    <aside className="sidebar">
      <Link href="/" className="brand" data-testid="link-brand"><span className="brand-mark"><ShoppingBag size={19}/></span><span>ordem<span className="brand-dot">.</span><small>GESTÃO DE COMPRAS</small></span></Link>
      <div className="workspace-label">ESPAÇO DE TRABALHO</div>
      <nav className="side-nav" aria-label="Navegação principal">
        {nav.map(({ href, label, icon: Icon }) => <Link href={href} key={href} className={`nav-item ${location === href || (href !== '/' && location.startsWith(href)) ? 'active' : ''}`} data-testid={`link-nav-${label.toLowerCase()}`}><Icon size={18}/><span>{label}</span>{href === '/pedidos' && <span className="nav-arrow">↗</span>}</Link>)}
      </nav>
      <div className="side-bottom"><div className="side-note"><span className="note-dot"/><span>API conectada<br/><small>Dados em tempo real</small></span></div><div className="side-version">ORDEM · PAINEL OPERACIONAL</div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="mobile-brand">ordem<span>.</span></div><div className="crumb">Workspace <span>/</span> <strong>{section === 'Operação' ? 'Visão geral' : section?.charAt(0).toUpperCase() + section?.slice(1)}</strong></div><div className="topbar-right"><span className="live-indicator"/> Atualizado em tempo real</div></header>
      <div className="page-content">{children}</div>
    </main>
  </div>;
}

function PageTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action && <div className="title-action">{action}</div>}</div>;
}
function Button({ children, onClick, href, variant = 'primary', disabled, type = 'button', testId }: { children: React.ReactNode; onClick?: () => void; href?: string; variant?: string; disabled?: boolean; type?: 'button'|'submit'; testId?: string }) {
  const cls = `button button-${variant}`;
  if (href) return <Link href={href} className={cls} data-testid={testId}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls} disabled={disabled} data-testid={testId}>{children}</button>;
}
function QueryState({ loading, error, retry, children }: { loading: boolean; error: unknown; retry: () => void; children: React.ReactNode }) {
  if (loading) return <div className="panel loading-panel"><div className="skeleton-line wide"/><div className="skeleton-line"/><div className="skeleton-line"/><div className="skeleton-line short"/><span className="loading-label"><LoaderCircle size={15}/> Carregando dados…</span></div>;
  if (error) return <div className="panel state-panel"><span className="state-icon error"><CircleAlert size={21}/></span><h3>Não foi possível carregar</h3><p>{errMessage(error)}</p><Button variant="secondary" onClick={retry}><RotateCw size={15}/> Tentar novamente</Button></div>;
  return <>{children}</>;
}
function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return <div className="empty-state"><span className="empty-icon"><PackageOpen size={24}/></span><h3>{title}</h3><p>{text}</p>{action}</div>;
}
function Status({ status }: { status: string }) { return <span className={`status status-${status}`}><span/>{statusName(status)}</span>; }

function Dashboard() {
  const { data, isLoading, error, refetch } = useGetDashboard();
  return <Shell><div className="page-enter">
    <PageTitle eyebrow="SEGUNDA-FEIRA · PAINEL OPERACIONAL" title="Tudo em ordem." description="Acompanhe os números e encontre rapidamente o que precisa de atenção." action={<Button href="/pedidos/novo" testId="button-new-order"><Plus size={16}/> Novo pedido</Button>}/>
    <QueryState loading={isLoading} error={error} retry={() => { void refetch(); }}>
      {data && <DashboardContent data={data}/>}
    </QueryState>
  </div></Shell>;
}
function DashboardContent({ data }: { data: DashboardSummary }) {
  const stats = [
    { label: 'Clientes cadastrados', value: data.customerCount, icon: Users, href: '/clientes', detail: 'Base de clientes' },
    { label: 'Produtos no catálogo', value: data.productCount, icon: Box, href: '/produtos', detail: 'Itens disponíveis' },
    { label: 'Pedidos registrados', value: data.orderCount, icon: ClipboardList, href: '/pedidos', detail: `${data.openOrderCount} aguardando pagamento` },
  ];
  return <>
    <section className="stat-grid">
      {stats.map((stat, i) => <Link href={stat.href} className={`stat-card stat-card-${i}`} key={stat.label} data-testid={`card-stat-${i}`}><div className="stat-top"><span>{stat.label}</span><stat.icon size={18}/></div><strong>{stat.value.toLocaleString('pt-BR')}</strong><small>{stat.detail}</small><span className="stat-corner">↗</span></Link>)}
      <article className="stat-card revenue-card"><div className="stat-top"><span>Receita recebida</span><span className="revenue-mark">R$</span></div><strong>{money(data.paidTotal)}</strong><small><i className="status-dot"/> {data.paidOrderCount} pedidos pagos</small><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
    </section>
    <section className="dashboard-lower">
      <article className="panel recent-panel"><div className="panel-heading"><div><span className="eyebrow">ATIVIDADE RECENTE</span><h2>Últimos pedidos</h2></div><Link href="/pedidos" className="text-link">Ver todos <span>→</span></Link></div>
        {data.recentOrders?.length ? <OrderTable orders={data.recentOrders} compact/> : <EmptyState title="Nenhum pedido por aqui" text="Os pedidos mais recentes aparecerão nesta lista." action={<Button href="/pedidos/novo" variant="secondary"><Plus size={15}/> Criar pedido</Button>}/>}
      </article>
      <aside className="panel pulse-panel"><span className="eyebrow">RESUMO DO FLUXO</span><h2>Estado dos pedidos</h2><div className="pulse-total">{data.orderCount}<span> no total</span></div><div className="flow-bar"><i style={{ width: `${data.orderCount ? data.paidOrderCount / data.orderCount * 100 : 0}%` }}/><i style={{ width: `${data.orderCount ? data.openOrderCount / data.orderCount * 100 : 0}%` }}/><i style={{ width: `${data.orderCount ? data.canceledOrderCount / data.orderCount * 100 : 0}%` }}/></div><div className="flow-legend"><div><span className="legend-chip paid"/><span>Pagos</span><b>{data.paidOrderCount}</b></div><div><span className="legend-chip open"/><span>Em aberto</span><b>{data.openOrderCount}</b></div><div><span className="legend-chip canceled"/><span>Cancelados</span><b>{data.canceledOrderCount}</b></div></div><Link href="/pedidos" className="panel-foot-link">Acessar gestão de pedidos <span>↗</span></Link></aside>
    </section>
    <div className="quick-links"><span className="eyebrow">ACESSO RÁPIDO</span><Link href="/clientes/novo"><Users size={17}/> Cadastrar cliente <span>↗</span></Link><Link href="/produtos/novo"><Box size={17}/> Adicionar produto <span>↗</span></Link><Link href="/pedidos/novo"><ClipboardList size={17}/> Abrir pedido <span>↗</span></Link></div>
  </>;
}

function OrderTable({ orders, compact = false }: { orders: Order[]; compact?: boolean }) {
  return <div className="table-wrap"><table><thead><tr><th>Pedido</th><th>Cliente</th><th>Data</th><th>Status</th><th className="align-right">Total</th></tr></thead><tbody>{orders.map(order => <tr key={order.id} data-testid={`row-order-${order.id}`}><td><Link className="id-link mono" href={`/pedidos/${order.id}`}>#{String(order.id).padStart(4, '0')}</Link></td><td><Link className="row-link" href={`/clientes/${order.customerId}`}>{order.customerName}</Link></td><td>{date(order.orderDate)}</td><td><Status status={order.status}/></td><td className="align-right money">{money(order.total)}</td></tr>)}</tbody></table></div>;
}

const entityMeta = {
  clientes: { title: 'Clientes', singular: 'cliente', desc: 'Uma visão clara de quem compra com você.', fields: [{key:'id', label:'Código'}, {key:'name',label:'Nome'}, {key:'cpf',label:'CPF'}, {key:'email',label:'E-mail'}, {key:'phone',label:'Telefone'}, {key:'createdAt',label:'Criado em'}] },
  produtos: { title: 'Produtos', singular: 'produto', desc: 'Catálogo, preços e disponibilidade em um só lugar.', fields: [{key:'id',label:'Código'}, {key:'sku',label:'SKU'}, {key:'title',label:'Produto'}, {key:'price',label:'Preço'}, {key:'stock',label:'Estoque'}, {key:'createdAt',label:'Criado em'}] },
  pedidos: { title: 'Pedidos', singular: 'pedido', desc: 'Cada transação, com seus itens e contexto.', fields: [{key:'id',label:'Pedido'}, {key:'customerName',label:'Cliente'}, {key:'orderDate',label:'Data'}, {key:'status',label:'Status'}, {key:'itemCount',label:'Itens'}, {key:'total',label:'Total'}] },
} as const;

function useListControls() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc'|'desc'>('asc');
  const applySearch = () => { setSearch(searchText.trim()); setPage(1); };
  const resetFilter = () => { setFilterField(''); setFilterValue(''); setPage(1); };
  const sort = (field: string) => { if (sortBy === field) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); else { setSortBy(field); setSortDirection('asc'); } setPage(1); };
  return { page, setPage, pageSize, setPageSize: (n:number) => { setPageSize(n); setPage(1); }, searchText, setSearchText, search, applySearch, filterField, setFilterField: (v:string) => {setFilterField(v); setPage(1);}, filterValue, setFilterValue: (v:string) => {setFilterValue(v);setPage(1);}, resetFilter, sortBy, sortDirection, sort, params: { page, pageSize, ...(search ? {search} : {}), ...(filterField && filterValue ? {filterField, filterValue} : {}), ...(sortBy ? {sortBy, sortDirection} : {}) } };
}

function ListToolbar({ c, fields }: { c: ReturnType<typeof useListControls>; fields: readonly {key:string;label:string}[] }) {
  return <div className="list-toolbar"><form className="search-box" onSubmit={e => {e.preventDefault(); c.applySearch();}}><Search size={17}/><input aria-label="Buscar" placeholder="Buscar por nome, código…" value={c.searchText} onChange={e=>c.setSearchText(e.target.value)} data-testid="input-search"/>{c.searchText && <button type="button" onClick={()=>{c.setSearchText('');c.applySearch();}} aria-label="Limpar busca"><X size={14}/></button>}</form><div className="filter-controls"><SlidersHorizontal size={15}/><select aria-label="Campo para filtrar" value={c.filterField} onChange={e=>c.setFilterField(e.target.value)} data-testid="select-filter-field"><option value="">Filtrar por campo</option>{fields.map(f=><option value={f.key} key={f.key}>{f.label}</option>)}</select><input aria-label="Valor do filtro" placeholder="Valor do filtro" value={c.filterValue} onChange={e=>c.setFilterValue(e.target.value)} disabled={!c.filterField} data-testid="input-filter-value"/>{c.filterField && <button className="clear-filter" type="button" onClick={c.resetFilter}>Limpar</button>}</div></div>;
}
function SortHead({ field, label, c, right = false }: {field:string;label:string;c:ReturnType<typeof useListControls>;right?:boolean}) {
  const Icon = c.sortBy !== field ? ArrowUpDown : c.sortDirection === 'asc' ? ArrowUp : ArrowDown;
  return <th className={right?'align-right':''}><button className="sort-head" onClick={()=>c.sort(field)}>{label}<Icon size={13}/></button></th>;
}
function Pager({ pagination, c }: { pagination?: {totalCount:number;currentPage:number;pageSize:number;totalPages:number}; c:ReturnType<typeof useListControls> }) {
  const pages = pagination?.totalPages || 0, current = pagination?.currentPage || c.page;
  return <div className="pagination"><div>{pagination?.totalCount ?? 0} registros <span>·</span> <label>Linhas <select aria-label="Tamanho da página" value={c.pageSize} onChange={e=>c.setPageSize(Number(e.target.value))} data-testid="select-page-size"><option>20</option><option>50</option><option>100</option></select></label></div><div className="page-controls"><span>Página {current} de {Math.max(pages,1)}</span><button aria-label="Página anterior" disabled={current<=1} onClick={()=>c.setPage(Math.max(1,current-1))}><ChevronLeft size={17}/></button><button aria-label="Próxima página" disabled={current>=pages} onClick={()=>c.setPage(current+1)}><ChevronRight size={17}/></button></div></div>;
}
function ListPage({ entity }: { entity: Entity }) {
  const c = useListControls();
  if (entity === 'clientes') return <CustomerList c={c}/>;
  if (entity === 'produtos') return <ProductList c={c}/>;
  return <OrderList c={c}/>;
}
function CustomerList({c}:{c:ReturnType<typeof useListControls>}) {
  const result=useListCustomers(c.params as ListCustomersParams), del=useDeleteCustomer(), qc=useQueryClient();
  const remove=(item:Customer)=>{if(window.confirm(`Excluir o cliente ${item.name}? Esta ação não pode ser desfeita.`))del.mutate({id:item.id},{onSuccess:()=>{void qc.invalidateQueries({queryKey:getListCustomersQueryKey()});void qc.invalidateQueries({queryKey:getGetDashboardQueryKey()});},onError:e=>window.alert(errMessage(e))});};
  return <Shell><div className="page-enter"><PageTitle eyebrow="RELACIONAMENTO" title="Clientes" description="Uma base confiável começa com bons registros." action={<Button href="/clientes/novo"><Plus size={16}/> Novo cliente</Button>}/><ListToolbar c={c} fields={entityMeta.clientes.fields}/>
    <QueryState loading={result.isLoading} error={result.error} retry={()=>{void result.refetch();}}><div className="panel table-panel">{result.data?.items.length ? <><div className="table-wrap"><table><thead><tr><SortHead field="id" label="Código" c={c}/><SortHead field="name" label="Nome" c={c}/><SortHead field="cpf" label="CPF" c={c}/><SortHead field="email" label="E-mail" c={c}/><SortHead field="phone" label="Telefone" c={c}/><th className="align-right">Ações</th></tr></thead><tbody>{result.data.items.map(x=><tr key={x.id} data-testid={`row-customer-${x.id}`}><td className="mono subtle">C-{String(x.id).padStart(4,'0')}</td><td><Link href={`/clientes/${x.id}`} className="row-link">{x.name}</Link></td><td className="mono">{x.cpf}</td><td>{x.email}</td><td>{x.phone||'—'}</td><td className="align-right row-actions"><Link href={`/clientes/${x.id}/editar`} aria-label="Editar cliente"><Pencil size={15}/></Link><button aria-label="Excluir cliente" onClick={()=>remove(x)} disabled={del.isPending}><Trash2 size={15}/></button></td></tr>)}</tbody></table></div><Pager pagination={result.data.pagination} c={c}/></> : <EmptyState title={c.search?'Nenhum resultado para esta busca':'Ainda não há clientes'} text={c.search?'Tente outro termo ou remova os filtros.':'Cadastre o primeiro cliente para começar a registrar pedidos.'} action={!c.search&&<Button href="/clientes/novo"><Plus size={15}/> Cadastrar cliente</Button>}/>}</div></QueryState>
  </div></Shell>;
}
function ProductList({c}:{c:ReturnType<typeof useListControls>}) {
  const result=useListProducts(c.params as ListProductsParams), del=useDeleteProduct(), qc=useQueryClient();
  const remove=(item:Product)=>{if(window.confirm(`Excluir o produto ${item.title}? Esta ação não pode ser desfeita.`))del.mutate({id:item.id},{onSuccess:()=>{void qc.invalidateQueries({queryKey:getListProductsQueryKey()});void qc.invalidateQueries({queryKey:getGetDashboardQueryKey()});},onError:e=>window.alert(errMessage(e))});};
  return <Shell><div className="page-enter"><PageTitle eyebrow="CATÁLOGO" title="Produtos" description="Preços e disponibilidade sem perder o fio da operação." action={<Button href="/produtos/novo"><Plus size={16}/> Novo produto</Button>}/><ListToolbar c={c} fields={entityMeta.produtos.fields}/>
    <QueryState loading={result.isLoading} error={result.error} retry={()=>{void result.refetch();}}><div className="panel table-panel">{result.data?.items.length ? <><div className="table-wrap"><table><thead><tr><SortHead field="sku" label="SKU" c={c}/><SortHead field="title" label="Produto" c={c}/><SortHead field="price" label="Preço" c={c} right/><SortHead field="stock" label="Estoque" c={c} right/><th className="align-right">Ações</th></tr></thead><tbody>{result.data.items.map(x=><tr key={x.id} data-testid={`row-product-${x.id}`}><td className="mono subtle">{x.sku}</td><td><Link href={`/produtos/${x.id}`} className="row-link">{x.title}</Link></td><td className="align-right money">{money(x.price)}</td><td className="align-right"><span className={`stock-count ${x.stock<5?'low-stock':''}`}>{x.stock}</span></td><td className="align-right row-actions"><Link href={`/produtos/${x.id}/editar`} aria-label="Editar produto"><Pencil size={15}/></Link><button aria-label="Excluir produto" onClick={()=>remove(x)} disabled={del.isPending}><Trash2 size={15}/></button></td></tr>)}</tbody></table></div><Pager pagination={result.data.pagination} c={c}/></> : <EmptyState title={c.search?'Nenhum resultado para esta busca':'Catálogo vazio'} text={c.search?'Tente outro termo ou remova os filtros.':'Adicione produtos para incluí-los nos pedidos.'} action={!c.search&&<Button href="/produtos/novo"><Plus size={15}/> Adicionar produto</Button>}/>}</div></QueryState>
  </div></Shell>;
}
function OrderList({c}:{c:ReturnType<typeof useListControls>}) {
  const result=useListOrders(c.params as ListOrdersParams), del=useDeleteOrder(), qc=useQueryClient();
  const remove=(item:Order)=>{if(window.confirm(`Excluir o pedido #${item.id}? Esta ação não pode ser desfeita.`))del.mutate({id:item.id},{onSuccess:()=>{void qc.invalidateQueries({queryKey:getListOrdersQueryKey()});void qc.invalidateQueries({queryKey:getGetDashboardQueryKey()});},onError:e=>window.alert(errMessage(e))});};
  return <Shell><div className="page-enter"><PageTitle eyebrow="TRANSAÇÕES" title="Pedidos" description="Acompanhe cada pedido do registro ao pagamento." action={<Button href="/pedidos/novo"><Plus size={16}/> Novo pedido</Button>}/><ListToolbar c={c} fields={entityMeta.pedidos.fields}/>
    <QueryState loading={result.isLoading} error={result.error} retry={()=>{void result.refetch();}}><div className="panel table-panel">{result.data?.items.length ? <><div className="table-wrap"><table><thead><tr><SortHead field="id" label="Pedido" c={c}/><SortHead field="customerName" label="Cliente" c={c}/><SortHead field="orderDate" label="Data" c={c}/><SortHead field="status" label="Status" c={c}/><SortHead field="itemCount" label="Itens" c={c} right/><SortHead field="total" label="Total" c={c} right/><th className="align-right">Ações</th></tr></thead><tbody>{result.data.items.map(x=><tr key={x.id} data-testid={`row-order-${x.id}`}><td><Link className="id-link mono" href={`/pedidos/${x.id}`}>#{String(x.id).padStart(4,'0')}</Link></td><td><Link href={`/clientes/${x.customerId}`} className="row-link">{x.customerName}</Link></td><td>{date(x.orderDate)}</td><td><Status status={x.status}/></td><td className="align-right">{x.itemCount}</td><td className="align-right money">{money(x.total)}</td><td className="align-right row-actions"><Link href={`/pedidos/${x.id}/editar`} aria-label="Editar pedido"><Pencil size={15}/></Link><button aria-label="Excluir pedido" onClick={()=>remove(x)} disabled={del.isPending}><Trash2 size={15}/></button></td></tr>)}</tbody></table></div><Pager pagination={result.data.pagination} c={c}/></> : <EmptyState title={c.search?'Nenhum pedido encontrado':'Ainda não há pedidos'} text={c.search?'Tente outro termo ou remova os filtros.':'Crie um pedido e acompanhe todos os itens em um único lugar.'} action={!c.search&&<Button href="/pedidos/novo"><Plus size={15}/> Criar pedido</Button>}/>}</div></QueryState>
  </div></Shell>;
}

function Field({ label, name, type='text', value, onChange, required=false, placeholder, min, step, error }: {label:string;name:string;type?:string;value:string|number;onChange:(value:string)=>void;required?:boolean;placeholder?:string;min?:string;step?:string;error?:string}) {
  return <label className="form-field"><span>{label}{required&&<b> *</b>}</span><input name={name} type={type} value={value} onChange={e=>onChange(e.target.value)} required={required} placeholder={placeholder} min={min} step={step} data-testid={`input-${name}`}/>{error&&<small className="field-error">{error}</small>}</label>;
}
function FormPage({kind, id}:{kind:'cliente'|'produto'|'pedido';id?:number}) {
  const editing=!!id, [location,setLocation]=useLocation();
  const qc=useQueryClient();
  const customerQuery=useGetCustomer(id || 0,{query:{enabled:kind==='cliente'&&editing,queryKey:getGetCustomerQueryKey(id||0)}});
  const productQuery=useGetProduct(id || 0,{query:{enabled:kind==='produto'&&editing,queryKey:getGetProductQueryKey(id||0)}});
  const orderQuery=useGetOrder(id || 0,{query:{enabled:kind==='pedido'&&editing,queryKey:getGetOrderQueryKey(id||0)}});
  const createCustomer=useCreateCustomer(), updateCustomer=useUpdateCustomer(), createProduct=useCreateProduct(), updateProduct=useUpdateProduct(), createOrder=useCreateOrder(), updateOrder=useUpdateOrder();
  const customers=useListCustomers({page:1,pageSize:100}), products=useListProducts({page:1,pageSize:100});
  const [name,setName]=useState(''),[cpf,setCpf]=useState(''),[email,setEmail]=useState(''),[phone,setPhone]=useState('');
  const [sku,setSku]=useState(''),[title,setTitle]=useState(''),[price,setPrice]=useState(''),[stock,setStock]=useState('');
  const [customerId,setCustomerId]=useState(''),[orderDate,setOrderDate]=useState(new Date().toISOString().slice(0,10)),[status,setStatus]=useState<'open'|'paid'|'canceled'>('open'),[items,setItems]=useState([{productId:'',quantity:'1'}]);
  const [error,setError]=useState('');
  const [initialized,setInitialized]=useState(false);
  const record = kind==='cliente'?customerQuery.data:kind==='produto'?productQuery.data:orderQuery.data;
  if (editing && record && !initialized) {
    setInitialized(true);
    if (kind==='cliente') {const x=record as Customer;setName(x.name);setCpf(x.cpf);setEmail(x.email);setPhone(x.phone||'');}
    if (kind==='produto') {const x=record as Product;setSku(x.sku);setTitle(x.title);setPrice(String(x.price));setStock(String(x.stock));}
    if (kind==='pedido') {const x=record as Order & {items:{productId:number;quantity:number}[]};setCustomerId(String(x.customerId));setOrderDate(x.orderDate.slice(0,10));setStatus(x.status);setItems(x.items.map(i=>({productId:String(i.productId),quantity:String(i.quantity)})));}
  }
  const loading=editing&&(kind==='cliente'?customerQuery.isLoading:kind==='produto'?productQuery.isLoading:orderQuery.isLoading);
  const queryError=editing&&(kind==='cliente'?customerQuery.error:kind==='produto'?productQuery.error:orderQuery.error);
  const pending=createCustomer.isPending||updateCustomer.isPending||createProduct.isPending||updateProduct.isPending||createOrder.isPending||updateOrder.isPending;
  const goBack=()=>setLocation(kind==='cliente'?'/clientes':kind==='produto'?'/produtos':'/pedidos');
  const mutationSuccess=async(type:Entity)=>{const keys=[qc.invalidateQueries({queryKey:type==='clientes'?getListCustomersQueryKey():type==='produtos'?getListProductsQueryKey():getListOrdersQueryKey()}),qc.invalidateQueries({queryKey:getGetDashboardQueryKey()})];if(id){keys.push(qc.invalidateQueries({queryKey:type==='clientes'?getGetCustomerQueryKey(id):type==='produtos'?getGetProductQueryKey(id):getGetOrderQueryKey(id)}));}await Promise.all(keys);goBack();};
  const submit=(event:React.FormEvent)=>{event.preventDefault();setError('');
    if(kind==='cliente') {
      const data:CustomerInput={name:name.trim(),cpf:cpf.trim(),email:email.trim(),phone:phone.trim()||null};
      if(data.name.length<2||data.cpf.length<11||!data.email.includes('@')){setError('Confira nome, CPF e e-mail antes de continuar.');return;}
      if(editing)updateCustomer.mutate({id:id!,data},{onSuccess:()=>void mutationSuccess('clientes'),onError:e=>setError(errMessage(e))});
      else createCustomer.mutate({data},{onSuccess:()=>void mutationSuccess('clientes'),onError:e=>setError(errMessage(e))});
    } else if(kind==='produto') {
      const data:ProductInput={sku:sku.trim(),title:title.trim(),price:Number(price),stock:Number(stock)};
      if(!data.sku||!data.title||!Number.isFinite(data.price)||data.price<0||!Number.isInteger(data.stock)||data.stock<0){setError('Preencha os campos corretamente. Preço e estoque não podem ser negativos.');return;}
      if(editing)updateProduct.mutate({id:id!,data},{onSuccess:()=>void mutationSuccess('produtos'),onError:e=>setError(errMessage(e))});
      else createProduct.mutate({data},{onSuccess:()=>void mutationSuccess('produtos'),onError:e=>setError(errMessage(e))});
    } else {
      const orderItems=items.filter(x=>x.productId).map(x=>({productId:Number(x.productId),quantity:Number(x.quantity)}));
      if(!Number(customerId)||!orderDate||!orderItems.length||orderItems.some(i=>!Number.isInteger(i.quantity)||i.quantity<1)){setError('Selecione um cliente, uma data e ao menos um produto com quantidade válida.');return;}
      const data:OrderInput={customerId:Number(customerId),orderDate,status,items:orderItems};
      if(editing)updateOrder.mutate({id:id!,data},{onSuccess:()=>void mutationSuccess('pedidos'),onError:e=>setError(errMessage(e))});
      else createOrder.mutate({data},{onSuccess:()=>void mutationSuccess('pedidos'),onError:e=>setError(errMessage(e))});
    }
  };
  const label=kind==='cliente'?'cliente':kind==='produto'?'produto':'pedido';
  return <Shell><div className="page-enter">
    <button className="back-link" onClick={goBack}><ArrowLeft size={15}/> Voltar para {kind==='cliente'?'clientes':kind==='produto'?'produtos':'pedidos'}</button>
    <PageTitle eyebrow={editing?'ATUALIZAÇÃO DE REGISTRO':'NOVO REGISTRO'} title={`${editing?'Editar':'Cadastrar'} ${label}`} description={editing?'Atualize os dados e mantenha o histórico consistente.':'Preencha os dados para incluir na operação.'}/>
    <QueryState loading={!!loading} error={queryError} retry={()=>{if(kind==='cliente')void customerQuery.refetch();else if(kind==='produto')void productQuery.refetch();else void orderQuery.refetch();}}>
      <form className="panel form-panel" onSubmit={submit} noValidate>
        {kind==='cliente'&&<div className="form-grid"><Field label="Nome completo" name="name" value={name} onChange={setName} required placeholder="Nome do cliente"/><Field label="CPF" name="cpf" value={cpf} onChange={setCpf} required placeholder="000.000.000-00"/><Field label="E-mail" name="email" type="email" value={email} onChange={setEmail} required placeholder="nome@empresa.com"/><Field label="Telefone" name="phone" value={phone} onChange={setPhone} placeholder="(00) 00000-0000"/></div>}
        {kind==='produto'&&<div className="form-grid"><Field label="SKU" name="sku" value={sku} onChange={setSku} required placeholder="Ex.: CX-014"/><Field label="Nome do produto" name="title" value={title} onChange={setTitle} required placeholder="Descrição do produto"/><Field label="Preço unitário" name="price" type="number" value={price} onChange={setPrice} required min="0" step="0.01" placeholder="0,00"/><Field label="Estoque disponível" name="stock" type="number" value={stock} onChange={setStock} required min="0" step="1" placeholder="0"/></div>}
        {kind==='pedido'&&<div className="order-form-fields"><div className="form-grid"><label className="form-field"><span>Cliente <b>*</b></span><select value={customerId} onChange={e=>setCustomerId(e.target.value)} required data-testid="select-order-customer"><option value="">Selecione um cliente</option>{customers.data?.items.map(x=><option key={x.id} value={x.id}>{x.name} · {x.cpf}</option>)}</select></label><Field label="Data do pedido" name="orderDate" type="date" value={orderDate} onChange={setOrderDate} required/><label className="form-field"><span>Status</span><select value={status} onChange={e=>setStatus(e.target.value as typeof status)} data-testid="select-order-status"><option value="open">Em aberto</option><option value="paid">Pago</option><option value="canceled">Cancelado</option></select></label></div>
          <div className="form-section-title"><div><b>Itens do pedido</b><small>Selecione produtos e informe as quantidades.</small></div><button type="button" className="text-button" onClick={()=>setItems([...items,{productId:'',quantity:'1'}])}><Plus size={15}/> Adicionar item</button></div>
          {items.map((item,index)=><div className="item-editor" key={index}><label className="form-field"><span>Produto {index+1}</span><select value={item.productId} onChange={e=>setItems(items.map((x,i)=>i===index?{...x,productId:e.target.value}:x))} required><option value="">Selecione um produto</option>{products.data?.items.map(x=><option key={x.id} value={x.id}>{x.sku} · {x.title} — {money(x.price)}</option>)}</select></label><Field label="Quantidade" name={`quantity-${index}`} type="number" value={item.quantity} onChange={v=>setItems(items.map((x,i)=>i===index?{...x,quantity:v}:x))} min="1" step="1" required/><button type="button" aria-label="Remover item" className="remove-item" disabled={items.length===1} onClick={()=>setItems(items.filter((_,i)=>i!==index))}><X size={16}/></button></div>)}
        </div>}
        {error&&<div className="form-error" role="alert"><CircleAlert size={16}/>{error}</div>}
        <div className="form-actions"><Button variant="secondary" onClick={goBack}>Cancelar</Button><Button type="submit" disabled={pending} testId="button-save">{pending&&<LoaderCircle size={15} className="spin"/>}{pending?'Salvando…':editing?'Salvar alterações':`Cadastrar ${label}`}</Button></div>
      </form>
    </QueryState>
  </div></Shell>;
}

function DetailPage({kind}:{kind:'cliente'|'produto'|'pedido'}) {
  const params=useParams<{id:string}>(), id=Number(params.id)||0;
  const customer=useGetCustomer(id), product=useGetProduct(id), order=useGetOrder(id);
  const data=kind==='cliente'?customer.data:kind==='produto'?product.data:order.data;
  const query=kind==='cliente'?customer:kind==='produto'?product:order;
  const [location,setLocation]=useLocation(), qc=useQueryClient();
  const removeCustomer=useDeleteCustomer(),removeProduct=useDeleteProduct(),removeOrder=useDeleteOrder();
  const route=kind==='cliente'?'/clientes':kind==='produto'?'/produtos':'/pedidos';
  const remove=()=>{
    if(!window.confirm(`Excluir este ${kind}? Esta ação não pode ser desfeita.`))return;
    const config={onSuccess:async()=>{await qc.invalidateQueries({queryKey:kind==='cliente'?getListCustomersQueryKey():kind==='produto'?getListProductsQueryKey():getListOrdersQueryKey()});await qc.invalidateQueries({queryKey:getGetDashboardQueryKey()});setLocation(route);},onError:(e:unknown)=>window.alert(errMessage(e))};
    if(kind==='cliente')removeCustomer.mutate({id},config);else if(kind==='produto')removeProduct.mutate({id},config);else removeOrder.mutate({id},config);
  };
  const title=kind==='cliente'?(data as Customer|undefined)?.name:kind==='produto'?(data as Product|undefined)?.title:`Pedido #${String(id).padStart(4,'0')}`;
  return <Shell><div className="page-enter"><button className="back-link" onClick={()=>setLocation(route)}><ArrowLeft size={15}/> Voltar para {kind==='cliente'?'clientes':kind==='produto'?'produtos':'pedidos'}</button>
    <QueryState loading={query.isLoading} error={query.error} retry={()=>{void query.refetch();}}>{data&&<>
      <PageTitle eyebrow={kind==='cliente'?'PERFIL DO CLIENTE':kind==='produto'?'DETALHES DO CATÁLOGO':'DETALHE DA TRANSAÇÃO'} title={title||'Registro'} description={kind==='pedido'?'Itens, valores e vínculo com o cliente.':'Registro completo e histórico de atualização.'} action={<div className="detail-actions"><Button href={`${route}/${id}/editar`} variant="secondary"><Pencil size={15}/> Editar</Button><Button variant="danger" onClick={remove}><Trash2 size={15}/> Excluir</Button></div>}/>
      {kind==='cliente'&&<CustomerDetail item={data as Customer}/>}
      {kind==='produto'&&<ProductDetail item={data as Product}/>}
      {kind==='pedido'&&<OrderDetail item={data as Order & {items:{id:number;productId:number;sku:string;productTitle:string;quantity:number;unitPrice:number;lineTotal:number}[]}}/>}
    </>}</QueryState>
  </div></Shell>;
}
function DetailField({label,children}:{label:string;children:React.ReactNode}) {return <div className="detail-field"><span>{label}</span><strong>{children}</strong></div>}
function CustomerDetail({item}:{item:Customer}) {return <div className="detail-layout"><section className="panel detail-card"><div className="detail-card-top"><div className="avatar">{item.name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase()}</div><div><span className="eyebrow">CLIENTE C-{String(item.id).padStart(4,'0')}</span><h2>{item.name}</h2><p>Cadastro ativo na base de clientes</p></div></div><div className="detail-fields"><DetailField label="CPF">{item.cpf}</DetailField><DetailField label="E-mail"><a href={`mailto:${item.email}`}>{item.email}</a></DetailField><DetailField label="Telefone">{item.phone||'Não informado'}</DetailField><DetailField label="Criado em">{date(item.createdAt)}</DetailField><DetailField label="Última atualização">{date(item.updatedAt)}</DetailField></div></section><section className="detail-aside"><div className="aside-index">01 <span>REGISTRO</span></div><p>Os dados de identificação são usados para vincular cada pedido ao cliente correto.</p></section></div>}
function ProductDetail({item}:{item:Product}) {return <div className="detail-layout"><section className="panel detail-card"><div className="detail-card-top"><div className="product-emblem"><Box size={24}/></div><div><span className="eyebrow">SKU · {item.sku}</span><h2>{item.title}</h2><p>Item de catálogo #{item.id}</p></div></div><div className="product-highlight"><div><span>Preço unitário</span><strong>{money(item.price)}</strong></div><div><span>Disponibilidade</span><strong>{item.stock} <small>unidades</small></strong></div></div><div className="detail-fields"><DetailField label="SKU">{item.sku}</DetailField><DetailField label="Criado em">{date(item.createdAt)}</DetailField><DetailField label="Última atualização">{date(item.updatedAt)}</DetailField></div></section><section className="detail-aside"><div className="aside-index">02 <span>CATÁLOGO</span></div><p>O preço e o estoque cadastrados ficam disponíveis para novas linhas de pedido.</p></section></div>}
function OrderDetail({item}:{item:Order & {items:{id:number;productId:number;sku:string;productTitle:string;quantity:number;unitPrice:number;lineTotal:number}[]}}) {return <div className="order-detail-wrap"><section className="panel order-summary"><div className="order-summary-head"><div><span className="eyebrow">RESUMO DO PEDIDO</span><h2>#{String(item.id).padStart(4,'0')}</h2></div><Status status={item.status}/></div><div className="order-meta"><DetailField label="Cliente"><Link href={`/clientes/${item.customerId}`} className="text-link">{item.customerName} ↗</Link></DetailField><DetailField label="Data do pedido">{date(item.orderDate)}</DetailField><DetailField label="Criado em">{date(item.createdAt)}</DetailField></div><div className="order-lines"><div className="line-heading"><span>Produto</span><span>Qtd.</span><span>Preço unit.</span><span className="align-right">Total</span></div>{item.items.map(line=><div className="order-line" key={line.id}><div><Link href={`/produtos/${line.productId}`} className="row-link">{line.productTitle}</Link><small className="mono">{line.sku}</small></div><span>{line.quantity}</span><span>{money(line.unitPrice)}</span><strong className="align-right">{money(line.lineTotal)}</strong></div>)}</div><div className="order-total"><span>{item.itemCount} itens</span><div>Total do pedido<strong>{money(item.total)}</strong></div></div></section></div>}

function AppRouter() {
  const [location]=useLocation();
  return <ErrorBoundary resetKey={location}><Switch>
    <Route path="/" component={Dashboard}/>
    <Route path="/clientes/novo">{()=><FormPage kind="cliente"/>}</Route><Route path="/clientes/:id/editar">{()=><EditCustomerRoute/>}</Route><Route path="/clientes/:id">{()=><DetailPage kind="cliente"/>}</Route><Route path="/clientes">{()=><ListPage entity="clientes"/>}</Route>
    <Route path="/produtos/novo">{()=><FormPage kind="produto"/>}</Route><Route path="/produtos/:id/editar">{()=><EditProductRoute/>}</Route><Route path="/produtos/:id">{()=><DetailPage kind="produto"/>}</Route><Route path="/produtos">{()=><ListPage entity="produtos"/>}</Route>
    <Route path="/pedidos/novo">{()=><FormPage kind="pedido"/>}</Route><Route path="/pedidos/:id/editar">{()=><EditOrderRoute/>}</Route><Route path="/pedidos/:id">{()=><DetailPage kind="pedido"/>}</Route><Route path="/pedidos">{()=><ListPage entity="pedidos"/>}</Route>
    <Route component={NotFound}/>
  </Switch></ErrorBoundary>;
}
function EditCustomerRoute(){const p=useParams<{id:string}>();return <FormPage kind="cliente" id={Number(p.id)||0}/>;}
function EditProductRoute(){const p=useParams<{id:string}>();return <FormPage kind="produto" id={Number(p.id)||0}/>;}
function EditOrderRoute(){const p=useParams<{id:string}>();return <FormPage kind="pedido" id={Number(p.id)||0}/>;}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><AppRouter/></WouterRouter><Toaster/></TooltipProvider></QueryClientProvider>;
}
export default App;
