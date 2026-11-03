/* Lô Alves · Harmonização Facial & Corporal */
(() => {
  /* ================= CONFIGURAÇÃO ================= */
  // WhatsApp com DDI+DDD (ex.: "5594999999999"). Vazio: usa o link da bio e copia a mensagem.
  const WA_NUMERO = "";
  const WA_LINK_BIO = "https://bit.ly/LoAlves";

  // Antes e depois (imagens em assets/)
  const RESULTADOS = [
    { id: "lipo", nome: "Lipo enzimática", antes: "assets/lipo-antes.webp", depois: "assets/lipo-depois.webp", texto: "Enzimas que ajudam a “quebrar” as células de gordura, para o corpo eliminá-las naturalmente." },
    { id: "crio", nome: "Criolipólise", antes: "assets/crio-antes.webp", depois: "assets/crio-depois.webp", texto: "Resfriamento controlado da gordura localizada, sem cirurgia e sem tempo de recuperação." },
    { id: "laser", nome: "Laser · axila", antes: "assets/laser-axila-antes.webp", depois: "assets/laser-axila-depois.webp", texto: "Luz direcionada à raiz do pelo, praticamente sem dor se comparada aos métodos tradicionais." },
    { id: "laser2", nome: "Laser · rosto", antes: "assets/laser-queixo-antes.webp", depois: "assets/laser-queixo-depois.webp", texto: "Adeus à lâmina e à cera: menos pelos, sessão após sessão." },
    { id: "botox", nome: "Botox", antes: "assets/botox-antes.webp", depois: "assets/botox-depois.webp", texto: "Relaxa a musculatura e suaviza rugas e linhas de expressão." },
  ];

  // Procedimentos (texto curto + "Lô explica"). preco: null = valor na avaliação
  const PROCEDIMENTOS = [
    { nome: "Glúteos", tag: "contorno", resumo: "Contorno que valoriza o seu corpo.", explica: "Volume nem sempre é o objetivo: o que importa é o contorno certo para o seu corpo. Cada mulher tem um resultado diferente — por isso tudo começa na avaliação.", img: null },
    { nome: "Botox", tag: "facial", resumo: "Suaviza rugas e linhas de expressão.", explica: "Age relaxando os músculos do rosto e deixa a expressão mais leve. Não é permanente — pede retoques — e não é indicado para todo mundo, por isso a avaliação vem antes.", img: "assets/botox-depois.webp" },
    { nome: "Preenchimento labial", tag: "facial", resumo: "Lábios mais definidos e harmônicos.", explica: "Contorno e hidratação para lábios com resultado natural e proporcional ao seu rosto.", img: null },
    { nome: "Lipo enzimática", tag: "corporal", resumo: "Para a gordurinha que não sai com dieta.", explica: "Usa enzimas para “quebrar” as células de gordura, que o corpo elimina naturalmente. Os resultados variam e podem exigir mais de uma sessão.", img: "assets/lipo-depois.webp" },
    { nome: "Criolipólise", tag: "corporal", resumo: "Congela a gordura localizada.", explica: "O frio controlado atinge as células de gordura da barriga, flancos ou coxas, e o corpo se livra delas ao longo das semanas. Sem cirurgia, sem anestesia, sem tempo de recuperação.", img: "assets/crio-depois.webp" },
    { nome: "Depilação a laser", tag: "corporal", resumo: "Liberdade de pele lisinha.", explica: "A luz vai direto à raiz do pelo e impede o crescimento. Praticamente sem dor se comparada à cera e à lâmina, e econômica a longo prazo.", img: "assets/laser-axila-depois.webp" },
    { nome: "Emagrecimento", tag: "protocolo", resumo: "Protocolos para a sua rotina.", explica: "Planos combinados e acompanhados, pensados para caber na rotina de quem tem pouco tempo.", img: null },
  ];

  // Depoimentos REAIS (com autorização). Vazio: mostra só o botão do Instagram.
  // Ex.: { texto: "…", nome: "Ana P.", proc: "Glúteos" }
  const DEPOIMENTOS = [];

  /* ================================================= */
  const num = WA_NUMERO.replace(/\D/g, "");
  const temNumero = num.length >= 12;
  const waHref = (m) => (temNumero ? `https://wa.me/${num}?text=${encodeURIComponent(m)}` : WA_LINK_BIO);
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const toast = $("toast"); let tT;
  const avisar = (t) => { toast.textContent = t; toast.classList.add("show"); clearTimeout(tT); tT = setTimeout(() => toast.classList.remove("show"), 3800); };
  const copiar = async (t) => { try { await navigator.clipboard.writeText(t); return true; } catch (e) { return false; } };
  async function abrirWa(msg) {
    if (!temNumero && (await copiar(msg))) avisar("Mensagem copiada! É só colar na conversa do WhatsApp.");
  }
  const ligar = (root = document) => root.querySelectorAll("[data-wa]:not([data-on])").forEach((a) => {
    a.dataset.on = 1; a.href = waHref(a.dataset.wa);
    a.addEventListener("click", () => abrirWa(a.dataset.wa));
  });

  // ---------- antes e depois ----------
  const cmp = $("compare"), range = $("cmpRange");
  const setPos = (v) => cmp.style.setProperty("--pos", v + "%");
  range.addEventListener("input", () => setPos(range.value));
  function mostrar(id) {
    const r = RESULTADOS.find((x) => x.id === id);
    $("cmpBefore").src = r.antes; $("cmpBefore").alt = `${r.nome}: antes`;
    $("cmpAfter").src = r.depois; $("cmpAfter").alt = `${r.nome}: depois`;
    $("rinfo").innerHTML = `<h3>${esc(r.nome)}</h3><p>${esc(r.texto)}</p><a class="btn btn--light btn--sm" data-wa="Olá, Lô! Vi o resultado de ${esc(r.nome)} no site e quero agendar uma avaliação." href="#" target="_blank" rel="noopener"><svg><use href="#wa"/></svg> Quero esse resultado</a>`;
    ligar($("rinfo"));
    $("rtabs").querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b.dataset.id === id));
    range.value = 50; setPos(50);
    cmp.classList.remove("hint"); void cmp.offsetWidth; cmp.classList.add("hint");
  }
  $("rtabs").innerHTML = RESULTADOS.map((r) => `<button role="tab" data-id="${r.id}" aria-selected="false">${esc(r.nome)}</button>`).join("");
  $("rtabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) mostrar(b.dataset.id); });
  mostrar("lipo");

  // ---------- procedimentos ----------
  $("procs").innerHTML = PROCEDIMENTOS.map((p, i) => `
    <article class="proc reveal ${p.img ? "proc--img" : ""}">
      ${p.img ? `<img src="${p.img}" alt="" loading="lazy" decoding="async">` : ""}
      <div class="proc__body">
        <span class="proc__n">${String(i + 1).padStart(2, "0")} · ${esc(p.tag)}</span>
        <h3>${esc(p.nome)}</h3>
        <p class="proc__sum">${esc(p.resumo)}</p>
        <details><summary>Lô explica</summary><p>${esc(p.explica)}</p></details>
        <a class="proc__cta" data-wa="Olá, Lô! Quero agendar uma avaliação para ${esc(p.nome)}." href="#" target="_blank" rel="noopener">Agendar avaliação →</a>
      </div>
    </article>`).join("");

  // ---------- depoimentos ----------
  if (DEPOIMENTOS.length) {
    $("depoTrack").innerHTML = DEPOIMENTOS.map((d) => `<figure class="dq"><blockquote>“${esc(d.texto)}”</blockquote><figcaption><b>${esc(d.nome)}</b>${d.proc ? ` · ${esc(d.proc)}` : ""}</figcaption></figure>`).join("");
  } else $("depoTrack").remove();

  // ---------- agendamento ----------
  $("bookProcs").innerHTML = PROCEDIMENTOS.map((p) => `<label><input type="checkbox" name="proc" value="${esc(p.nome)}"><span>${esc(p.nome)}</span></label>`).join("") + `<label><input type="checkbox" name="proc" value="ainda não sei"><span>Ainda não sei</span></label>`;
  $("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const procs = f.getAll("proc");
    let m = `Olá, Lô! ${f.get("nome") ? `Sou ${f.get("nome")} e ` : ""}vim pelo site.\nQuero agendar uma avaliação em ${f.get("cidade")}.`;
    if (procs.length) m += `\nTenho interesse em: ${procs.join(", ")}.`;
    await abrirWa(m);
    window.open(waHref(m), "_blank", "noopener");
  });

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

  // ---------- nav, reveal ----------
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const burger = document.querySelector(".nav__burger");
  burger.addEventListener("click", () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : ""; });
  document.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); document.body.style.overflow = ""; }));
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  ligar();
  $("ano").textContent = new Date().getFullYear();
})();
