/* ScholarHub Main JS */
(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const storage = {
    get(key, fallback=null){
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
    },
    set(key, value){ localStorage.setItem(key, JSON.stringify(value)); },
    remove(key){ localStorage.removeItem(key); }
  };

  // Seed sample articles if none exist
  const seedArticles = () => {
    if (storage.get('sh_articles')) return;
    const nowYear = new Date().getFullYear();
    const cats = ['Computer Science','Biology','Physics','Mathematics','Psychology'];
    const sample = Array.from({length:12}).map((_,i)=>({
      id: 'A'+(1000+i),
      title: ['Neural Approaches to Reasoning','CRISPR Gene Editing Advances','Quantum Materials at Room Temp','Topology in Data Analysis','Cognitive Bias in AI'][i%5] + ' #' + (i+1),
      authors: ['A. Smith','B. Chen','C. Lopez','D. Kumar','E. Novak'].slice(0,(i%3)+2).join(', '),
      abstract: 'This study explores contemporary methods and presents empirical findings across multiple datasets.',
      category: cats[i%cats.length],
      year: nowYear - (i%4),
      tags: ['open-access','peer-reviewed','dataset'].slice(0,(i%3)+1),
    }));
    storage.set('sh_articles', sample);
  };

  // Auth helpers
  const auth = {
    current(){ return storage.get('sh_session'); },
    users(){ return storage.get('sh_users', []); },
    saveUsers(list){ storage.set('sh_users', list); },
    login(email, password){
      const u = this.users().find(x=>x.email.toLowerCase()===email.toLowerCase());
      if(!u) throw new Error('No account found for this email.');
      if(u.password !== password) throw new Error('Incorrect password.');
      storage.set('sh_session', {name:u.name,email:u.email,affiliation:u.affiliation,role:u.role});
      return true;
    },
    logout(){ storage.remove('sh_session'); },
    register({name,email,affiliation,password,confirm,role}){
      if(password !== confirm) throw new Error('Passwords do not match.');
      const list = this.users();
      if(list.some(x=>x.email.toLowerCase()===email.toLowerCase())) throw new Error('Email already registered.');
      const user = {name,email,affiliation,password,role};
      list.push(user);
      this.saveUsers(list);
      storage.set('sh_session', {name,email,affiliation,role});
      return true;
    }
  };

  // UI: Navbar auth state
  const updateAuthUI = () => {
    const user = auth.current();
    const loginBtn = $('#loginBtn');
    const registerBtn = $('#registerBtn');
    const userMenu = $('#userMenu');
    const userName = $('#userName');
    if(!loginBtn || !registerBtn || !userMenu || !userName) return;
    if(user){
      loginBtn.style.display = 'none';
      registerBtn.style.display = 'none';
      userMenu.style.display = 'flex';
      userName.textContent = user.name;
    } else {
      loginBtn.style.display = '';
      registerBtn.style.display = '';
      userMenu.style.display = 'none';
    }
  };

  // Navbar mobile toggle
  const navToggle = $('#nav-toggle');
  const navMenu = $('#nav-menu');
  if(navToggle && navMenu){
    navToggle.addEventListener('click', ()=> navMenu.classList.toggle('open'));
  }

  // Modals
  const loginModal = $('#loginModal');
  const registerModal = $('#registerModal');
  const openModal = (m)=>{ if(m){ m.style.display='flex'; } };
  const closeModal = (m)=>{ if(m){ m.style.display='none'; } };

  const loginBtn = $('#loginBtn');
  const registerBtn = $('#registerBtn');
  const closeLogin = $('#closeLogin');
  const closeRegister = $('#closeRegister');
  const switchToRegister = $('#switchToRegister');
  const switchToLogin = $('#switchToLogin');

  loginBtn && loginBtn.addEventListener('click', (e)=>{ e.preventDefault(); openModal(loginModal); });
  registerBtn && registerBtn.addEventListener('click', (e)=>{ e.preventDefault(); openModal(registerModal); });
  closeLogin && closeLogin.addEventListener('click', ()=> closeModal(loginModal));
  closeRegister && closeRegister.addEventListener('click', ()=> closeModal(registerModal));
  switchToRegister && switchToRegister.addEventListener('click', (e)=>{ e.preventDefault(); closeModal(loginModal); openModal(registerModal); });
  switchToLogin && switchToLogin.addEventListener('click', (e)=>{ e.preventDefault(); closeModal(registerModal); openModal(loginModal); });
  window.addEventListener('click', (e)=>{
    if(e.target===loginModal) closeModal(loginModal);
    if(e.target===registerModal) closeModal(registerModal);
  });

  // Auth forms
  const loginForm = $('#loginForm');
  const registerForm = $('#registerForm');
  const logoutBtn = $('#logoutBtn');
  loginForm && loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = $('#loginEmail').value.trim();
    const pwd = $('#loginPassword').value;
    try{
      auth.login(email,pwd);
      updateAuthUI();
      closeModal(loginModal);
    }catch(err){
      alert(err.message);
    }
  });
  registerForm && registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const payload = {
      name: $('#registerName').value.trim(),
      email: $('#registerEmail').value.trim(),
      affiliation: $('#registerAffiliation').value.trim(),
      password: $('#registerPassword').value,
      confirm: $('#confirmPassword').value,
      role: $('#registerRole') ? $('#registerRole').value : 'author'
    };
    try{
      auth.register(payload);
      updateAuthUI();
      closeModal(registerModal);
    }catch(err){
      alert(err.message);
    }
  });
  logoutBtn && logoutBtn.addEventListener('click', (e)=>{ e.preventDefault(); auth.logout(); updateAuthUI(); });

  // Newsletter
  const newsletterForm = $('#newsletterForm');
  newsletterForm && newsletterForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = $('input[type="email"]', newsletterForm).value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email.');
    alert('Subscribed!');
    newsletterForm.reset();
  });

  // Home slider
  const slides = $$('.slide');
  if(slides.length){
    let idx = 0;
    setInterval(()=>{
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 4000);
  }

  // Home: recent articles
  const recentContainer = $('#recentArticles');
  const renderRecent = () => {
    const list = storage.get('sh_articles', []).slice(0,6);
    if(!recentContainer) return;
    recentContainer.innerHTML = list.map(a=>`<article class="article-card">
      <div class="meta">${a.year} • <span class="tag">${a.category}</span></div>
      <h3>${a.title}</h3>
      <p>${a.abstract}</p>
      <div class="meta">Authors: ${a.authors}</div>
    </article>`).join('');
  };

  // Browse page
  const browseList = $('#browseList');
  const searchInput = $('#searchInput');
  const categoryFilter = $('#categoryFilter');
  const yearFilter = $('#yearFilter');
  const applyBrowse = () => {
    if(!browseList) return;
    const q = (searchInput?.value || '').toLowerCase();
    const cat = categoryFilter?.value || '';
    const yr = yearFilter?.value || '';
    const all = storage.get('sh_articles', []);
    const filtered = all.filter(a=>{
      const passQ = !q || [a.title,a.abstract,a.authors,(a.tags||[]).join(' ')].join(' ').toLowerCase().includes(q);
      const passC = !cat || a.category===cat;
      const passY = !yr || String(a.year)===yr;
      return passQ && passC && passY;
    });
    browseList.innerHTML = filtered.map(a=>`<article class="article-card">
      <div class="meta">${a.year} • <span class="tag">${a.category}</span></div>
      <h3>${a.title}</h3>
      <p>${a.abstract}</p>
      <div class="meta">Authors: ${a.authors}</div>
      <div>${(a.tags||[]).map(t=>`<span class='tag'>${t}</span>`).join('')}</div>
    </article>`).join('');
  };
  window.applyBrowse = applyBrowse;

  // Submit page
  const submitForm = $('#submitForm');
  const requireAuth = (role) => {
    const u = auth.current();
    if(!u){ alert('Please login to continue.'); openModal(loginModal); throw new Error('Auth required'); }
    if(role && u.role !== role){ alert('This action requires role: '+role); throw new Error('Role required'); }
    return u;
  }
  submitForm && submitForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    try { var user = requireAuth(); } catch { return; }
    const form = submitForm;
    const data = {
      id: 'S'+Date.now(),
      title: $('#subTitle').value.trim(),
      abstract: $('#subAbstract').value.trim(),
      authors: $('#subAuthors').value.trim(),
      category: $('#subCategory').value,
      keywords: $('#subKeywords').value.split(',').map(s=>s.trim()).filter(Boolean),
      status: 'pending',
      createdBy: user.email,
      reviews: []
    };
    if(!data.title || !data.abstract || !data.authors) return alert('Please fill all required fields.');
    const list = storage.get('sh_submissions', []);
    list.unshift(data); storage.set('sh_submissions', list);
    alert('Submission received! You can track it under Review page.');
    form.reset();
  });

  // Review page
  const reviewTableBody = $('#reviewTableBody');
  const renderReviewTable = () => {
    if(!reviewTableBody) return;
    const u = auth.current();
    const all = storage.get('sh_submissions', []);
    const rows = all.map(s=>`<tr>
      <td>${s.title}</td>
      <td><span class="badge ${s.status==='pending'?'status-pending':s.status==='accepted'?'status-accepted':'status-rejected'}">${s.status}</span></td>
      <td>${s.category}</td>
      <td>${s.createdBy}</td>
      <td><button class="btn btn-secondary" data-id="${s.id}">Review</button></td>
    </tr>`).join('');
    reviewTableBody.innerHTML = rows || '<tr><td colspan="5">No submissions yet.</td></tr>';
    // attach listeners
    $$('#reviewTableBody button').forEach(btn=>{
      btn.addEventListener('click', ()=> openReviewDialog(btn.getAttribute('data-id')) );
    });
  };

  // Review dialog (simple prompt workflow)
  function openReviewDialog(id){
    try { requireAuth(); } catch { return; }
    const list = storage.get('sh_submissions', []);
    const item = list.find(x=>x.id===id);
    if(!item) return alert('Not found');
    const decision = prompt('Decision: accept / reject / pending', item.status);
    if(!decision) return;
    const note = prompt('Optional comments for the author', 'Looks good.');
    item.status = ['accept','accepted'].includes(decision.toLowerCase()) ? 'accepted' : ['reject','rejected'].includes(decision.toLowerCase()) ? 'rejected' : 'pending';
    item.reviews.push({by: auth.current().email, note, at: new Date().toISOString(), status: item.status});
    storage.set('sh_submissions', list);
    renderReviewTable();
  }

  // Contact form
  const contactForm = $('#contactForm');
  contactForm && contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = $('#ctName').value.trim();
    const email = $('#ctEmail').value.trim();
    const msg = $('#ctMessage').value.trim();
    if(!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || msg.length<10){
      return alert('Please provide a valid name, email, and a message of at least 10 characters.');
    }
    alert('Thanks for contacting us, '+name+'! We will get back soon.');
    contactForm.reset();
  });

  // About page counters (simple pulse)
  const counters = $$('.stat-item h3');
  counters.forEach(el=>{
    const target = parseInt(el.textContent.replace(/[^0-9]/g,'')) || 100;
    let val = 0; const step = Math.max(1, Math.floor(target/60));
    const int = setInterval(()=>{ val+=step; if(val>=target){ val=target; clearInterval(int);} el.textContent = new Intl.NumberFormat().format(val); }, 20);
  });

  // Initialize
  seedArticles();
  updateAuthUI();
  renderRecent();
  applyBrowse();
  renderReviewTable();
})();
