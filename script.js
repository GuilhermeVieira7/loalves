/* Lô Alves · Harmonização Facial & Corporal */
(() => {
  /* ================= CONFIGURAÇÃO ================= */
  // WhatsApp com DDI+DDD (ex.: "5594999999999"). Vazio: usa o link da bio e copia a mensagem.
  const WA_NUMERO = "";
  const WA_LINK_BIO = "https://bit.ly/LoAlves";

  // Cidades. endereco: texto (ou null). mapa: link do Google Maps (ou null → gera pela busca do endereço).
  const CIDADES = [
    { nome: "Parauapebas", nota: "Atendimento com hora marcada", endereco: null, mapa: null },
    { nome: "Canaã dos Carajás", nota: "Atendimento com hora marcada", endereco: null, mapa: null },
    { nome: "Marabá", nota: "Atendimento com hora marcada", endereco: null, mapa: null },
  ];

  // Antes e depois (imagens em assets/)
  const RESULTADOS = [
    { id: "lipo", nome: "Lipo enzimática", antes: "assets/lipo-antes.webp", depois: "assets/lipo-depois.webp", texto: "Abdômen mais definido, sem cirurgia." },
    { id: "crio", nome: "Criolipólise", antes: "assets/crio-antes.webp", depois: "assets/crio-depois.webp", texto: "Redução da gordura localizada na barriga e nos flancos." },
    { id: "laser", nome: "Laser · axila", antes: "assets/laser-axila-antes.webp", depois: "assets/laser-axila-depois.webp", texto: "Pele lisinha, sem cera e sem lâmina." },
    { id: "laser2", nome: "Laser · rosto", antes: "assets/laser-queixo-antes.webp", depois: "assets/laser-queixo-depois.webp", texto: "Menos pelos no rosto, sessão após sessão." },
    { id: "botox", nome: "Botox", antes: "assets/botox-antes.webp", depois: "assets/botox-depois.webp", texto: "Linhas de expressão suavizadas, com naturalidade." },
  ];

  // Procedimentos — leitura rápida: até 3 itens por lista.
  const PROCEDIMENTOS = [
    { nome: "Glúteos", tag: "Corporal", resumo: "Contorno que valoriza o seu corpo.", img: "assets/proc-gluteos.webp",
      indicado: "Quem quer melhorar contorno e projeção dos glúteos, sem cirurgia.",
      beneficios: ["Contorno mais harmônico", "Resultado natural, proporcional ao seu corpo", "Procedimento em consultório"],
      regioes: ["Glúteos", "Transição quadril–glúteo"],
      info: "Mais volume nem sempre é mais bonito: a técnica e a quantidade são definidas na avaliação, pra cada corpo." },
    { nome: "Botox", tag: "Facial", resumo: "Suaviza rugas e linhas de expressão.", img: "assets/botox-depois.webp",
      indicado: "Quem quer suavizar rugas e linhas de expressão do rosto.",
      beneficios: ["Expressão mais leve e descansada", "Aplicação rápida", "Volta à rotina no mesmo dia"],
      regioes: ["Testa", "Entre as sobrancelhas", "Ao redor dos olhos"],
      info: "O efeito é temporário e pede retoques. Não é indicado para todas as pessoas — por isso a avaliação vem antes." },
    { nome: "Preenchimento labial", tag: "Facial", resumo: "Lábios definidos e harmônicos.", img: "assets/proc-labial.webp",
      indicado: "Quem deseja mais contorno, volume ou simetria nos lábios.",
      beneficios: ["Contorno definido", "Volume natural", "Lábios hidratados"],
      regioes: ["Lábios", "Contorno labial"],
      info: "O resultado respeita as proporções do seu rosto — a ideia é realçar, não transformar em outro." },
    { nome: "Lipo enzimática", tag: "Corporal", resumo: "Para a gordurinha que não sai com dieta.", img: "assets/lipo-depois.webp",
      indicado: "Quem tem gordura localizada resistente a dieta e exercício.",
      beneficios: ["Sem cirurgia", "Ajuda a reduzir medidas", "Corpo elimina a gordura naturalmente"],
      regioes: ["Abdômen", "Flancos", "Outras áreas avaliadas"],
      info: "Os resultados variam de pessoa para pessoa e podem exigir mais de uma sessão." },
    { nome: "Criolipólise", tag: "Corporal", resumo: "Congela a gordura localizada.", img: "assets/crio-depois.webp",
      indicado: "Quem quer reduzir gordura localizada de forma não invasiva.",
      beneficios: ["Sem cirurgia e sem anestesia", "Sem tempo de recuperação", "Não deixa cicatrizes"],
      regioes: ["Barriga", "Flancos", "Coxas"],
      info: "O resultado aparece ao longo de algumas semanas, conforme o corpo elimina as células de gordura." },
    { nome: "Depilação a laser", tag: "Corporal e facial", resumo: "Liberdade de pele lisinha.", img: "assets/laser-axila-depois.webp",
      indicado: "Quem cansou de cera e lâmina e quer reduzir os pelos de vez.",
      beneficios: ["Praticamente sem dor, comparado à cera", "Economia a longo prazo", "Menos pelos encravados"],
      regioes: ["Axilas", "Rosto", "Outras áreas do corpo"],
      info: "São necessárias algumas sessões para atingir o resultado." },
    { nome: "Emagrecimento", tag: "Protocolo", resumo: "Protocolos que cabem na sua rotina.", img: "assets/ig-poltrona.webp",
      indicado: "Quem quer emagrecer com acompanhamento e tem pouco tempo.",
      beneficios: ["Plano combinado e personalizado", "Sessões que cabem na rotina", "Acompanhamento próximo"],
      regioes: ["Corpo todo, conforme a avaliação"],
      info: "O protocolo é montado depois da avaliação, de acordo com o seu objetivo e a sua saúde." },
  ];

  // Depoimentos REAIS. Nome e foto só aparecem com autorizado: true.
  // Ex.: { texto: "…", nome: "Ana Paula", foto: "assets/dep-ana.webp", proc: "Glúteos", cidade: "Parauapebas", autorizado: true }
  const DEPOIMENTOS = [];

  /* ================================================= */
  const num = WA_NUMERO.replace(/\D/g, "");
  const temNumero = num.length >= 12;
  const waHref = (m) => (temNumero ? `https://wa.me/${num}?text=${encodeURIComponent(m)}` : WA_LINK_BIO);
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const toast = $("toast"); let tT;
  const avisar = (t) => { toast.textContent = t; toast.classList.add("show"); clearTimeout(tT); tT = setTimeout(() => toast.classList.remove("show"), 4000); };
  const copiar = (t) => (navigator.clipboard ? navigator.clipboard.writeText(t).then(() => true, () => false) : Promise.resolve(false));
  function aoAbrirWa(msg) { if (!temNumero) copiar(msg).then((ok) => ok && avisar("Mensagem copiada! É só colar na conversa do WhatsApp.")); }
  const ligar = (root = document) => root.querySelectorAll("[data-wa]:not([data-on])").forEach((a) => {
    a.dataset.on = 1; a.href = waHref(a.dataset.wa);
    a.addEventListener("click", () => aoAbrirWa(a.dataset.wa));
  });
  const lista = (arr) => `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

  // ---------- procedimentos ----------
  $("procs").innerHTML = PROCEDIMENTOS.map((p, i) => `
    <button class="proc reveal" data-i="${i}" aria-haspopup="dialog">
      <span class="proc__img"><img src="${p.img}" alt="" loading="lazy" decoding="async"></span>
      <span class="proc__body">
        <span class="proc__n">${String(i + 1).padStart(2, "0")} · ${esc(p.tag)}</span>
        <span class="proc__name">${esc(p.nome)}</span>
        <span class="proc__sum">${esc(p.resumo)}</span>
        <span class="proc__more">Ver indicações <span aria-hidden="true">→</span></span>
      </span>
    </button>`).join("");

  const sheet = $("sheet");
  function abrirSheet(i) {
    const p = PROCEDIMENTOS[i];
    $("sheetBody").innerHTML = `
      <div class="sheet__media"><img src="${p.img}" alt=""></div>
      <div class="sheet__content">
        <p class="kicker">${esc(p.tag)}</p>
        <h2 class="sheet__t" id="sheetTitle">${esc(p.nome)}</h2>
        <p class="sheet__sum">${esc(p.resumo)}</p>
        <div class="sheet__grid">
          <section><h3>Para quem é indicado</h3><p>${esc(p.indicado)}</p></section>
          <section><h3>Principais benefícios</h3>${lista(p.beneficios)}</section>
          <section><h3>Regiões tratadas</h3><p class="sheet__tags">${p.regioes.map((r) => `<span>${esc(r)}</span>`).join("")}</p></section>
          <section class="sheet__info"><h3>Importante</h3><p>${esc(p.info)}</p></section>
        </div>
        <a class="btn btn--xl btn--block" data-wa="Olá, Lô! Vi ${esc(p.nome)} no site e quero agendar uma avaliação." href="#" target="_blank" rel="noopener"><svg><use href="#wa"/></svg> Agendar avaliação</a>
      </div>`;
    ligar($("sheetBody"));
    sheet.showModal();
    document.body.classList.add("lock");
  }
  const fecharSheet = () => sheet.open && sheet.close();
  sheet.addEventListener("close", () => document.body.classList.remove("lock"));
  $("procs").addEventListener("click", (e) => { const b = e.target.closest(".proc"); if (b) abrirSheet(+b.dataset.i); });
  $("sheetClose").addEventListener("click", fecharSheet);
  sheet.addEventListener("click", (e) => { if (e.target === sheet) fecharSheet(); });

  // ---------- antes e depois ----------
  const cmp = $("compare"), range = $("cmpRange");
  const setPos = (v) => cmp.style.setProperty("--pos", v + "%");
  range.addEventListener("input", () => setPos(range.value));
  function mostrar(id) {
    const r = RESULTADOS.find((x) => x.id === id);
    $("cmpBefore").src = r.antes; $("cmpBefore").alt = `${r.nome}: antes`;
    $("cmpAfter").src = r.depois; $("cmpAfter").alt = `${r.nome}: depois`;
    $("rinfo").innerHTML = `<h3>${esc(r.nome)}</h3><p>${esc(r.texto)}</p><a class="btn btn--light" data-wa="Olá, Lô! Vi o resultado de ${esc(r.nome)} no site e quero agendar uma avaliação." href="#" target="_blank" rel="noopener"><svg><use href="#wa"/></svg> Quero esse resultado</a>`;
    ligar($("rinfo"));
    $("rtabs").querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b.dataset.id === id));
    range.value = 50; setPos(50);
  }
  $("rtabs").innerHTML = RESULTADOS.map((r) => `<button role="tab" data-id="${r.id}" aria-selected="false"><img src="${r.depois}" alt="" loading="lazy"><span>${esc(r.nome)}</span></button>`).join("");
  $("rtabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) mostrar(b.dataset.id); });
  mostrar("lipo");

  // ---------- depoimentos ----------
  const autorizados = DEPOIMENTOS.filter((d) => d.texto);
  if (autorizados.length) {
    $("quotes").innerHTML = autorizados.map((d) => {
      const nome = d.autorizado && d.nome ? esc(d.nome) : "Paciente Lô Alves";
      const foto = d.autorizado && d.foto ? `<img src="${d.foto}" alt="" width="48" height="48" loading="lazy">` : `<span class="q__ini" aria-hidden="true">${d.autorizado && d.nome ? esc(d.nome[0]) : "♡"}</span>`;
      return `<figure class="q reveal"><span class="q__stars" aria-label="5 estrelas">★★★★★</span><blockquote>“${esc(d.texto)}”</blockquote><figcaption>${foto}<span><b>${nome}</b>${[d.proc, d.cidade].filter(Boolean).map(esc).join(" · ")}</span></figcaption></figure>`;
    }).join("");
  } else {
    $("quotes").innerHTML = `
      <a class="q q--ig reveal" href="https://www.instagram.com/loalvesestetica/" target="_blank" rel="noopener">
        <img src="assets/hl-depoimentos.webp" alt="" width="96" height="96" loading="lazy">
        <span class="q__ig-t">Depoimentos em vídeo</span>
        <span class="q__ig-s">As pacientes contam a experiência com a Lô no destaque <b>Depoimentos</b> do Instagram.</span>
        <span class="q__ig-cta"><svg><use href="#ig"/></svg> Assistir no Instagram</span>
      </a>`;
  }

  // ---------- cidades ----------
  $("cities").innerHTML = CIDADES.map((c, i) => {
    const mapa = c.mapa || (c.endereco ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.endereco + ", " + c.nome + " - PA")}` : null);
    return `<article class="city reveal">
      <span class="city__n">${String(i + 1).padStart(2, "0")}</span>
      <h3 class="city__name">${esc(c.nome)}</h3>
      <p class="city__addr"><svg><use href="#pin"/></svg><span>${c.endereco ? esc(c.endereco) : "Endereço informado no agendamento"}</span></p>
      <p class="city__note">${esc(c.nota)}</p>
      <div class="city__ctas">
        <a class="btn btn--sm" data-wa="Olá, Lô! Quero agendar uma avaliação em ${esc(c.nome)}." href="#" target="_blank" rel="noopener"><svg><use href="#wa"/></svg> Agendar em ${esc(c.nome.split(" ")[0])}</a>
        ${mapa ? `<a class="btn btn--sm btn--line" href="${mapa}" target="_blank" rel="noopener"><svg><use href="#pin"/></svg> Ver no mapa</a>` : ""}
      </div>
    </article>`;
  }).join("");

  // ---------- formulário ----------
  $("bookCities").innerHTML = CIDADES.map((c, i) => `<label><input type="radio" name="cidade" value="${esc(c.nome)}" ${i ? "" : "checked"}><span>${esc(c.nome)}</span></label>`).join("");
  $("bookProc").innerHTML = `<option value="">Ainda não sei</option>` + PROCEDIMENTOS.map((p) => `<option>${esc(p.nome)}</option>`).join("");
  const form = $("bookForm"), done = $("done");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const nome = (f.get("nome") || "").trim();
    if (!nome) { form.nome.focus(); form.nome.classList.add("err"); avisar("Me conta seu nome pra eu te chamar direitinho 💜"); return; }
    const proc = f.get("proc");
    const msg = `Olá, Lô! Sou ${nome} e vim pelo site.\nQuero agendar uma avaliação em ${f.get("cidade")}.\n${proc ? `Tenho interesse em: ${proc}.` : "Ainda não sei qual procedimento — quero orientação."}`;
    const href = waHref(msg);
    window.open(href, "_blank", "noopener");
    aoAbrirWa(msg);
    $("doneName").textContent = nome.split(" ")[0];
    $("doneWa").href = href;
    $("doneWa").onclick = () => aoAbrirWa(msg);
    form.hidden = true; done.hidden = false; done.focus();
  });
  form.nome.addEventListener("input", () => form.nome.classList.remove("err"));
  $("doneBack").addEventListener("click", () => { done.hidden = true; form.hidden = false; form.reset(); });

  // ---------- vídeo com som opcional ----------
  const vid = $("clipVideo"), sb = $("soundBtn");
  new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { vid.preload = "auto"; vid.play().catch(() => {}); } else vid.pause();
  }, { threshold: 0.25 }).observe(vid);
  sb.addEventListener("click", () => {
    vid.muted = !vid.muted;
    if (!vid.muted) { vid.currentTime = 0; vid.play(); }
    sb.setAttribute("aria-pressed", !vid.muted);
    sb.innerHTML = `<svg><use href="#${vid.muted ? "mute" : "sound"}"/></svg><span>${vid.muted ? "Ouvir a Lô" : "Som ligado"}</span>`;
  });

  // ---------- nav ----------
  const nav = document.querySelector(".nav");
  const onScroll = () => { nav.classList.toggle("scrolled", scrollY > 30); document.body.classList.toggle("past-hero", scrollY > innerHeight * 0.6); };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const burger = document.querySelector(".nav__burger");
  const fecharNav = () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); document.body.classList.remove("lock"); };
  burger.addEventListener("click", () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); document.body.classList.toggle("lock", o); });
  document.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", fecharNav));

  // ---------- reveal (com leve escalonamento) ----------
  ligar();
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => {
    const sib = [...el.parentElement.children].filter((x) => x.classList.contains("reveal"));
    el.style.transitionDelay = `${Math.min(sib.indexOf(el), 5) * 70}ms`;
    io.observe(el);
  });
  $("ano").textContent = new Date().getFullYear();
})();
