(function () {
  'use strict';

  // Theme handling: default to system, store user choice
  const root = document.documentElement;
  const themeToggleButton = document.getElementById('themeToggle');

  function getSystemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark' || (theme === 'system' && getSystemPrefersDark());
    root.classList.toggle('dark', isDark);
    if (themeToggleButton) {
      themeToggleButton.textContent = isDark ? '🌞' : '🌙';
      themeToggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function initTheme() {
    const saved = localStorage.getItem('theme') || 'system';
    applyTheme(saved);
    if (themeToggleButton) {
      themeToggleButton.addEventListener('click', function () {
        const current = localStorage.getItem('theme') || 'system';
        const next = current === 'dark' ? 'light' : current === 'light' ? 'system' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
      });
    }
    if (window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      mql.addEventListener && mql.addEventListener('change', function () {
        const savedMode = localStorage.getItem('theme') || 'system';
        applyTheme(savedMode);
      });
    }
  }
  

  // Example content data (edit as needed)
  const publications = 
  [
    {
      title: 'Energy optimization of the smart residential electrical grid considering demand management approaches',
      authors: ['Jianrui Zhang', 'Jingqun Wu', 'Linjun Fu', 'Qiwei Wu', 'Yubo Huang', 'Wenying Qiu', 'A Majid Ali'],
      venue: 'Energy',
      year: 2024,
      type: 'journal',
      isLeadAuthor: false,
      links: {  bibtex: '#zhang2024energy' },
      bibtexFull: `@article{zhang2024energy,
  title={Energy optimization of the smart residential electrical grid considering demand management approaches},
  author={Zhang, Jianrui and Wu, Jingqun and Fu, Linjun and Wu, Qiwei and Huang, Yubo and Qiu, Wenying and Ali, A Majid},
  journal={Energy},
  volume={300},
  pages={131641},
  year={2024},
  publisher={Elsevier}
}`
    },
    {
      title: 'Rfis-fpi: Reversible face image steganography neural network for face privacy interactions',
      authors: ['Yubo Huang', 'Anran Zhu', 'Cheng Zeng', 'Cong Hu', 'Xin Lai', 'Wenhao Feng', 'Fan Chen'],
      venue: 'IEEE FG 2024',
      year: 2024,
      type: 'conference',
      isLeadAuthor: true,
      links: {  bibtex: '#huang2024rfis' },
      bibtexFull: `@inproceedings{huang2024rfis,
    title={Rfis-fpi: Reversible face image steganography neural network for face privacy interactions},
    author={Huang, Yubo and Zhu, Anran and Zeng, Cheng and Hu, Cong and Lai, Xin and Feng, Wenhao and Chen, Fan},
    booktitle={2024 IEEE 18th International Conference on Automatic Face and Gesture Recognition (FG)},
    pages={1--10},
    year={2024},
    organization={IEEE}
  }`
    },
    {
      title: 'LHQ-SVC: Lightweight and High Quality Singing Voice Conversion Modeling',
      authors: ['Yubo Huang', 'Xin Lai', 'Muyang Ye', 'Anran Zhu', 'Zixi Wang', 'Jingzehua Xu', 'Shuai Zhang', 'Zhiyuan Zhou', 'Weijie Niu'],
      venue: 'ICASSP 2025',
      year: 2025,
      type: 'conference',
      isLeadAuthor: true,
      links: {  bibtex: '#huang2025lhq' },
      bibtexFull: `@inproceedings{huang2025lhq,
    title={LHQ-SVC: Lightweight and High Quality Singing Voice Conversion Modeling},
    author={Huang, Yubo and Lai, Xin and Ye, Muyang and Zhu, Anran and Wang, Zixi and Xu, Jingzehua and Zhang, Shuai and Zhou, Zhiyuan and Niu, Weijie},
    booktitle={ICASSP 2025-2025 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)},
    pages={1--5},
    year={2025},
    organization={IEEE}
  }`
    },
    {
      title: 'Improved genetic algorithm based on greedy and simulated annealing ideas for vascular robot ordering strategy',
      authors: ['Zixi Wang', 'Yubo Huang', 'Yukai Zhang', 'Yifei Sheng', 'Xin Lai', 'Peng Lu'],
      venue: 'PLOS ONE',
      year: 2025,
      type: 'journal',
      isLeadAuthor: true,
      links: {  bibtex: '#wang2025improved' },
      bibtexFull: `@article{wang2025improved,
    title={Improved genetic algorithm based on greedy and simulated annealing ideas for vascular robot ordering strategy},
    author={Wang, Zixi and Huang, Yubo and Zhang, Yukai and Sheng, Yifei and Lai, Xin and Lu, Peng},
    journal={PloS one},
    volume={20},
    number={2},
    pages={e0306990},
    year={2025},
    publisher={Public Library of Science San Francisco, CA USA}
  }`
    },
    {
      title: 'An adaptive deep Q-learning strategy for routing schemes in SDN-based data centre networks',
      authors: ['Jian Li', 'Shuoyu Wang', 'Yubo Huang', 'Kai Liao', 'Feili Bi', 'Xia Lou'],
      venue: 'ISAIEE 2022',
      year: 2022,
      type: 'conference',
      isLeadAuthor: false,
      links: {  bibtex: '#li2022adaptive' },
      bibtexFull: `@inproceedings{li2022adaptive,
    title={An adaptive deep Q-learning strategy for routing schemes in SDN-based data centre networks},
    author={Li, Jian and Wang, Shuoyu and Huang, Yubo and Liao, Kai and Bi, Feili and Lou, Xia},
    booktitle={2022 International Symposium on Advances in Informatics, Electronics and Education (ISAIEE)},
    pages={178--186},
    year={2022},
    organization={IEEE}
  }`
    },
    {
      title: 'CausalVE: Face Video Privacy Encryption via Causal Video Prediction',
      authors: ['Yubo Huang', 'Wenhao Feng', 'Xin Lai', 'Zixi Wang', 'Jingzehua Xu', 'Shuai Zhang', 'Hongjie He', 'Fan Chen'],
      venue: 'arXiv',
      year: 2024,
      type: 'preprint',
      isLeadAuthor: true,
      links: {  bibtex: '#huang2024causalve' },
      bibtexFull: `@article{huang2024causalve,
    title={CausalVE: Face Video Privacy Encryption via Causal Video Prediction},
    author={Huang, Yubo and Feng, Wenhao and Lai, Xin and Wang, Zixi and Xu, Jingzehua and Zhang, Shuai and He, Hongjie and Chen, Fan},
    journal={arXiv preprint arXiv:2409.19306},
    year={2024}
  }`
    },
    {
      title: 'Navigating Data Imbalances in Cybersecurity: Identifying Malicious URLs with Multiple Labels and Extreme Data Imbalances with LGNet',
      authors: ['Anran Zhu', 'Yubo Huang', 'Xin Lai'],
      venue: 'ICPR 2024',
      year: 2024,
      type: 'conference',
      isLeadAuthor: true,
      links: {  bibtex: '#zhu2024navigating' },
      bibtexFull: `@inproceedings{zhu2024navigating,
    title={Navigating Data Imbalances in Cybersecurity: Identifying Malicious URLs with Multiple Labels and Extreme Data Imbalances with LGNet},
    author={Zhu, Anran and Huang, Yubo and Lai, Xin},
    booktitle={International Conference on Pattern Recognition},
    pages={87--102},
    year={2024},
    organization={Springer}
  }`
    },
    {
      title: 'RD-Crack: A Study of Concrete Crack Detection Guided by a Residual Neural Network Improved Based on Diffusion Modeling',
      authors: ['Yubo Huang', 'Xin Lai', 'Zixi Wang', 'Muyang Ye', 'Yinmian Li', 'Yi Li', 'Fang Zhang', 'Chenyang Luo'],
      venue: 'ICANN 2024',
      year: 2024,
      type: 'conference',
      isLeadAuthor: true,
      links: {  bibtex: '#huang2024rd' },
      bibtexFull: `@inproceedings{huang2024rd,
    title={RD-Crack: A Study of Concrete Crack Detection Guided by a Residual Neural Network Improved Based on Diffusion Modeling},
    author={Huang, Yubo and Lai, Xin and Wang, Zixi and Ye, Muyang and Li, Yinmian and Li, Yi and Zhang, Fang and Luo, Chenyang},
    booktitle={International Conference on Artificial Neural Networks},
    pages={340--354},
    year={2024},
    organization={Springer}
  }`
    },
    {
      title: 'Imitating from auxiliary imperfect demonstrations via Adversarial Density Weighted Regression',
      authors: ['Ziqi Zhang', 'Zifeng Zhuang', 'Jingzehua Xu', 'Yiyuan Yang', 'Yubo Huang', 'Donglin Wang', 'Shuai Zhang'],
      venue: 'arXiv',
      year: 2024,
      type: 'preprint',
      isLeadAuthor: false,
      links: {  bibtex: '#zhang2024imitating' },
      bibtexFull: `@article{zhang2024imitating,
    title={Imitating from auxiliary imperfect demonstrations via Adversarial Density Weighted Regression},
    author={Zhang, Ziqi and Zhuang, Zifeng and Xu, Jingzehua and Yang, Yiyuan and Huang, Yubo and Wang, Donglin and Zhang, Shuai},
    journal={arXiv preprint arXiv:2405.20351},
    year={2024}
  }`
    },
    {
      title: 'Geometric Inverse Estimation for the Inner Boundary of a Furnace with Thermal Contact Resistance between the Two-Layer Walls',
      authors: ['Bin Li', 'Yubo Huang', 'Xuejun Zhang'],
      venue: 'SSRN',
      year: 2023,
      type: 'preprint',
      isLeadAuthor: true,
      links: {  bibtex: '#li4490123geometric' },
      bibtexFull: `@article{li4490123geometric,
    title={Geometric Inverse Estimation for the Inner Boundary of a Furnace with Thermal Contact Resistance between the Two-Layer Walls},
    author={Li, Bin and Huang, Yubo and Zhang, Xuejun},
    journal={Available at SSRN 4490123}
  }`
    }
  ]
  
  // teaching and talks removed per request

  function byDescendingYear(a, b) { return (b.year || 0) - (a.year || 0); }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"]+/g, function (s) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[s] || s;
    });
  }

  // Highlight current author's name in publication author lists
  const currentAuthorName = 'Yubo Huang';

  function renderPublications() {
    const listEl = document.getElementById('pubList');
    const listLead = document.getElementById('pubListLead');
    const listOther = document.getElementById('pubListOther');
    const searchEl = document.getElementById('pubSearch');
    const typeEl = document.getElementById('pubType');
    const yearEl = document.getElementById('pubYear');
    if (!(listEl || listLead || listOther)) return;

    // Populate years
    const years = Array.from(new Set(publications.map(p => p.year))).filter(Boolean).sort((a, b) => b - a);
    if (yearEl && yearEl.options.length <= 1) {
      years.forEach(function (y) {
        const opt = document.createElement('option');
        opt.value = String(y);
        opt.textContent = String(y);
        yearEl.appendChild(opt);
      });
    }

    function passFilters(pub) {
      const q = (searchEl && searchEl.value || '').toLowerCase();
      const t = typeEl && typeEl.value || 'all';
      const y = yearEl && yearEl.value || 'all';
      const inSearch = !q || (
        (pub.title && pub.title.toLowerCase().includes(q)) ||
        (pub.venue && pub.venue.toLowerCase().includes(q)) ||
        (pub.authors && pub.authors.join(' ').toLowerCase().includes(q))
      );
      const typeOk = t === 'all' || pub.type === t;
      const yearOk = y === 'all' || String(pub.year) === y;
      return inSearch && typeOk && yearOk;
    }

    function renderList(targetEl, items) {
      if (!targetEl) return;
      targetEl.innerHTML = '';
      items.forEach(function (p) {
        const li = document.createElement('li');
        const authorsHtml = (p.authors || []).map(function (name) {
          const clean = String(name || '').replace(/<[^>]*>/g, '').trim();
          const isMe = clean && currentAuthorName && clean.toLowerCase() === currentAuthorName.toLowerCase();
          return isMe ? ('<strong>' + escapeHtml(clean) + '</strong>') : escapeHtml(clean);
        }).join(', ');
        li.innerHTML = [
          '<div class="pub-title">' + escapeHtml(p.title || '') + '</div>',
          '<div class="pub-meta">' + authorsHtml + ' · ' + escapeHtml(p.venue || '') + ' · ' + escapeHtml(p.year || '') + '</div>',
          '<div class="pub-tags">' +
            '<span class="tag">' + escapeHtml(p.type || '') + '</span>' +
          '</div>',
          '<div class="pub-links">' +
            (p.links && p.links.pdf ? '<a href="' + p.links.pdf + '" target="_blank" rel="noopener">PDF</a>' : '') +
            (p.links && p.links.project ? '<a href="' + p.links.project + '" target="_blank" rel="noopener">Project</a>' : '') +
            (p.links && p.links.code ? '<a href="' + p.links.code + '" target="_blank" rel="noopener">Code</a>' : '') +
            (p.bibtexFull ? '<a class="bibtex-link" href="#">BibTeX</a>' : (p.links && p.links.bibtex ? '<a href="' + p.links.bibtex + '">BibTeX</a>' : '')) +
          '</div>'
        ].join('');
        if (p.bibtexFull) {
          var link = li.querySelector('a.bibtex-link');
          if (link) {
            link.addEventListener('click', function (e) {
              e.preventDefault();
              var m = initBibtexModal();
              m.open(p.title || 'BibTeX', p.bibtexFull || '');
            });
          }
        }
        targetEl.appendChild(li);
      });
    }

    function draw() {
      const filtered = publications.slice().sort(byDescendingYear).filter(passFilters);
      if (listEl) renderList(listEl, filtered);
      if (listLead || listOther) {
        const lead = filtered.filter(function (p) { return !!p.isLeadAuthor; });
        const other = filtered.filter(function (p) { return !p.isLeadAuthor; });
        renderList(listLead, lead);
        renderList(listOther, other);
      }
    }

    searchEl && searchEl.addEventListener('input', draw);
    typeEl && typeEl.addEventListener('change', draw);
    yearEl && yearEl.addEventListener('change', draw);
    draw();
  }

  function renderTeaching() {
    const list = document.getElementById('teachingList');
    if (!list) return;
    list.innerHTML = '';
    teaching.forEach(function (t) {
      const li = document.createElement('li');
      li.innerHTML = [
        '<h3>' + escapeHtml(t.course) + '</h3>',
        '<div class="muted">' + escapeHtml(t.role) + ' · ' + escapeHtml(t.term) + '</div>',
        (t.link ? '<div style="margin-top:6px"><a href="' + t.link + '" target="_blank" rel="noopener">Course page</a></div>' : '')
      ].join('');
      list.appendChild(li);
    });
  }

  function renderTalks() {
    const list = document.getElementById('talksList');
    if (!list) return;
    list.innerHTML = '';
    talks.forEach(function (t) {
      const li = document.createElement('li');
      const date = (t.date || '').slice(0, 10);
      li.innerHTML = [
        '<h3>' + escapeHtml(t.title) + '</h3>',
        '<div class="muted">' + escapeHtml(t.event) + ' · ' + escapeHtml(t.location) + ' · ' + escapeHtml(date) + '</div>',
        '<div style="margin-top:6px; display:flex; gap:10px">' +
          (t.slides ? '<a href="' + t.slides + '" target="_blank" rel="noopener">Slides</a>' : '') +
          (t.video ? '<a href="' + t.video + '" target="_blank" rel="noopener">Video</a>' : '') +
        '</div>'
      ].join('');
      list.appendChild(li);
    });
  }

  function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  // ----- BibTeX modal (small window) -----
  var bibtexModal = null;
  function initBibtexModal() {
    if (bibtexModal) return bibtexModal;
    var backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    var modal = document.createElement('div');
    modal.className = 'modal';
    var header = document.createElement('div');
    header.className = 'modal-header';
    var title = document.createElement('div');
    title.className = 'modal-title';
    var actions = document.createElement('div');
    actions.className = 'modal-actions';
    var copyBtn = document.createElement('button');
    copyBtn.className = 'btn';
    copyBtn.textContent = 'Copy';
    var closeBtn = document.createElement('button');
    closeBtn.className = 'btn';
    closeBtn.textContent = 'Close';
    var body = document.createElement('div');
    body.className = 'modal-body';
    var pre = document.createElement('pre');
    pre.setAttribute('aria-label', 'BibTeX');
    body.appendChild(pre);
    actions.appendChild(copyBtn);
    actions.appendChild(closeBtn);
    header.appendChild(title);
    header.appendChild(actions);
    modal.appendChild(header);
    modal.appendChild(body);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    function open(t, content) {
      title.textContent = t || 'BibTeX';
      pre.textContent = content || '';
      backdrop.classList.add('active');
    }
    function close() { backdrop.classList.remove('active'); }
    function copy() {
      var text = pre.textContent || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () {});
      } else {
        try {
          var ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        } catch (e) {}
      }
    }
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) close(); });
    closeBtn.addEventListener('click', close);
    copyBtn.addEventListener('click', copy);
    document.addEventListener('keydown', function (e) { if (backdrop.classList.contains('active') && e.key === 'Escape') close(); });
    bibtexModal = { open: open, close: close };
    return bibtexModal;
  }

  // ----- Awards rendering (major/other) -----
  const awards = {
      major: [
        { date: '2024.08', text: 'China College Students Service Outsourcing Innovation & Entrepreneurship Competition (A-Class) — National Third Prize.' },
        { date: '2024.06', text: 'National BIM Graduation Design Competition (A-Class) — National Third Prize.' },
        { date: '2023.11', text: 'China Undergraduate Mathematical Contest in Modeling (CUMCM) — National First Prize.' },
        { date: '2023.05', text: 'COMAP Mathematical Contest in Modeling (MCM/ICM) — Outstanding Winner.' },
        { date: '2022.06', text: 'National College Students Mathematical Olympiad — National Second Prize.' },
        { date: '2022.05', text: 'COMAP Mathematical Contest in Modeling (MCM/ICM) — Honorable Mention.' },
        { date: '2021.12', text: 'National College Innovation English Challenge — National Second Prize.' }
      ],
      other: [
        { date: '2024.08', text: 'China College Students Service Outsourcing Innovation & Entrepreneurship Competition (A-Class) — Provincial Third Prize.' },
        { date: '2024.06', text: 'National BIM Graduation Design Competition (A-Class) — Provincial Third Prize.' },
        { date: '2024.05', text: 'National Undergraduate Market Survey and Analysis Competition (A-Class) — Provincial First Prize.' },
        { date: '2023.09', text: 'SWUFE Guanghua Entrepreneurship Competition — University Third Prize.' },
        { date: '2023.08', text: 'Statistical Modeling Competition (A-Class) — Provincial First Prize.' },
        { date: '2023.08', text: 'SWJTU Mathematical Modeling Campus Competition — University Second Prize.' },
        { date: '2023.07', text: 'Service Outsourcing Innovation & Entrepreneurship Competition (A-Class) — Provincial Third Prize.' },
        { date: '2023.06', text: 'China Collegiate Computing Competition — Network Technology Challenge (A-Class) — Provincial Third Prize.' },
        { date: '2023.06', text: 'SWJTU Civil Engineering Month Bridge Load-Bearing Contest — University Third Prize.' },
        { date: '2022.11', text: '“Higher Education Press Cup” CUMCM (A-Class) — Provincial Second Prize.' },
        { date: '2022.11', text: 'SWJTU “Rookie Cup” Mathematical Modeling Competition — University Third Prize.' },
        { date: '2022.09', text: '3rd “Huasu Cup” Mathematical Modeling Competition — National First Prize.' },
        { date: '2022.08', text: '19th May Day Mathematics Competition — Provincial First Prize.' },
        { date: '2022.07', text: 'SWJTU Mathematical Modeling Campus Competition — University First Prize.' },
        { date: '2022.07', text: 'MIIT Talent Evaluation Certificate (Mathematical Modeling) — Issued by the Talent Exchange Center of the Ministry of Industry and Information Technology.' },
        { date: '2022.06', text: 'SWJTU Extracurricular Innovation Competition — University Silver Award.' },
        { date: '2021.11', text: 'FLTRP·CUP National English Writing Contest — University Third Prize.' }
      ]
    
  };

  // ----- Projects & Patents -----
  const projects = [
    // 示例：{ date: '2024-2025', title: 'Tunnel AI Automation Platform', role: 'Lead', org: 'Pengcheng Lab', link: '#', note: 'Funding: 200,000 RMB' }
  ];

  const patents = [
    // 示例：{ year: '2024', title: 'Method and system for XYZ', authors: ['Yubo Huang', '...'], status: 'CN Pending', link: '#' }
  ];

  function renderProjects() {
    const el = document.getElementById('projectsList');
    if (!el) return;
    el.innerHTML = '';
    projects.forEach(function (p) {
      const li = document.createElement('li');
      const authors = p.authors ? ' · ' + escapeHtml((p.authors || []).join(', ')) : '';
      const role = p.role ? ' · ' + escapeHtml(p.role) : '';
      const org = p.org ? ' · ' + escapeHtml(p.org) : '';
      const note = p.note ? ' — ' + escapeHtml(p.note) : '';
      const link = p.link ? ' <a href="' + escapeHtml(p.link) + '" target="_blank" rel="noopener">link</a>' : '';
      li.innerHTML = '<time>' + escapeHtml(p.date || '') + '</time> — ' + escapeHtml(p.title || '') + role + org + authors + note + link;
      el.appendChild(li);
    });
  }

  function renderPatents() {
    const el = document.getElementById('patentsList');
    if (!el) return;
    el.innerHTML = '';
    patents.forEach(function (p) {
      const li = document.createElement('li');
      const authors = p.authors ? ' · ' + escapeHtml((p.authors || []).join(', ')) : '';
      const status = p.status ? ' · ' + escapeHtml(p.status) : '';
      const link = p.link ? ' <a href="' + escapeHtml(p.link) + '" target="_blank" rel="noopener">link</a>' : '';
      li.innerHTML = '<time>' + escapeHtml(p.year || '') + '</time> — ' + escapeHtml(p.title || '') + authors + status + link;
      el.appendChild(li);
    });
  }

  function renderAwards() {
    const majorEl = document.getElementById('awardsMajor');
    const otherEl = document.getElementById('awardsOther');
    if (!(majorEl || otherEl)) return;
    function fill(target, list) {
      if (!target) return;
      target.innerHTML = '';
      list.forEach(function (a) {
        var li = document.createElement('li');
        li.innerHTML = '<time>' + escapeHtml(a.date) + '</time> — ' + escapeHtml(a.text);
        target.appendChild(li);
      });
    }
    fill(majorEl, awards.major || []);
    fill(otherEl, awards.other || []);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    // If a publications list exists on this page, render it
    renderPublications();
    renderAwards();
    renderProjects();
    renderPatents();
    setYear();
  });
})();


