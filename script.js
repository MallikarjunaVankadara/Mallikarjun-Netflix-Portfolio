// ============ DATA (from reference) ============
const TAGLINES = [
  "FEATURE FILM // FULL-STACK ARCHITECT",
  "ORIGINAL SERIES // AI & ML SPECIALIST",
  "BLOCKBUSTER // DISTRIBUTED SYSTEMS",
  "ACCLAIMED // ALGORITHMIC PROBLEM SOLVER"
];
const STACK_TAGS = ["PRODUCT THINKING","CUSTOMER INSIGHTS","STAKEHOLDER ALIGNMENT","CROSS-FUNCTIONAL DELIVERY","PROBLEM DISCOVERY","AI & AZURE","DEPENDENCY MANAGEMENT"];
const EXPERTISE = [
  {number:"01",title:"Enterprise Systems & Troubleshooting",text:"Solving complex technical problems across enterprise applications, infrastructure, integrations, and AI-enabled products, with a focus on reliability and customer impact.",tag:"TECHNICAL ENGINEERING",grad:"linear-gradient(145deg,#1f0a0c,#121212 60%,#0a0a0a)"},
  {number:"02",title:"Product Thinking & Customer Insights",text:"Translating customer problems and technical signals into clear requirements, product opportunities, and practical improvements while balancing user needs, technical feasibility, and business impact.",tag:"PRODUCT & CUSTOMER",grad:"linear-gradient(145deg,#1a0809,#111111 60%,#090909)"},
  {number:"03",title:"AI-Enabled Product Solutions",text:"Exploring how AI, automation and product capabilities can simplify workflows, improve customer experiences and turn recurring operational problems into scalable solutions..",tag:"AI & PRODUCT INNOVATION",grad:"linear-gradient(145deg,#220a0d,#131313 60%,#0a0a0a)"},
  {number:"04",title:"Coordinating engineering teams, partners, vendors and stakeholders to drive complex technical initiatives through planning, dependency management, risk resolution and delivery.",grad:"linear-gradient(145deg,#1d090b,#101010 60%,#080808)"}
];
const SKILLS = [
  {title:"Frontend Engineering",desc:"Crafting responsive and interactive user interfaces using React, JavaScript, HTML5, CSS3, and Tailwind CSS.",tag:"UI / INTERACTION",skills:["React","JavaScript","Tailwind CSS","HTML5","CSS3"]},
  {title:"Backend & Databases",desc:"Building secure REST APIs, authentication flows, server-side applications, and high-performance database architectures.",tag:"ARCHITECTURE",skills:["Node.js","Express","PostgreSQL","MongoDB","DQL"]},
  {title:"AI & Machine Learning",desc:"Developing intelligent applications leveraging NLP, generative AI workflows, computer vision, and LLM systems.",tag:"INTELLIGENCE",skills:["NLP","Generative AI","Computer Vision","LLMs","AWS AI"]},
  {title:"Cloud & DevOps",desc:"Deploying and scaling production-grade applications using Docker containers, GitHub Actions, and CI/CD pipelines.",tag:"INFRASTRUCTURE",skills:["Docker","GitHub","CI/CD Pipelines","Render","Docker Hub"]},
  {title:"Algorithmic Problem Solving",desc:"Optimizing data structures and solving complex algorithmic challenges across competitive programming platforms.",tag:"COMPETITIVE",skills:["Data Structures","Algorithms","LeetCode","CodeChef","GFG"]},
  {title:"Tools & Ecosystem",desc:"Equipped with industry-grade instruments for version control, productivity extensions, and workflow management.",tag:"PRODUCTIVITY",skills:["Git","Chrome APIs","Adobe Express","Google Cloud","VS Code"]}
];
const PROJECTS = [
  {title:"Notice Hub",category:"Full-Stack Architecture",description:"Consolidates university announcements and streamlines real-time student communication with high uptime.",tags:["React","Node.js","Express","MongoDB"],match:"99%",episode:"S01 E01"},
  {title:"Multi-Tenant SaaS Platform",category:"Cloud & Distributed Systems",description:"Containerized enterprise SaaS featuring strict database isolation and granular role-based access control.",tags:["Docker","PostgreSQL","Node.js","Express"],match:"98%",episode:"S01 E02"},
  {title:"Payment Gateway System",category:"Fintech Architecture",description:"Simulates complex transaction state management, webhook verification, and multi-method processing.",tags:["JavaScript","PostgreSQL","REST APIs","Docker"],match:"97%",episode:"S01 E03"},
  {title:"Productivity Suite Extension",category:"Client-Side Engineering",description:"Custom Chrome extension built with Chrome APIs and advanced JavaScript for task automation and management.",tags:["JavaScript","Chrome APIs","Tailwind CSS","HTML5"],match:"99%",episode:"S01 E04"},
  {title:"AI & ML Diagnostic Engine",category:"Artificial Intelligence",description:"Intelligent data processing pipeline leveraging machine learning models and NLP workflows.",tags:["Python","Machine Learning","NLP","AWS"],match:"96%",episode:"S01 E05"},
  {title:"Algorithmic Problem Solver",category:"Competitive Programming",description:"Optimized data structure solutions across LeetCode, CodeChef, and GeeksforGeeks platforms.",tags:["Data Structures","Algorithms","C++","JavaScript"],match:"99%",episode:"S01 E06"},
  {title:"Portfolio Cinematics v2.6",category:"UI/UX & Animation",description:"Award-winning dark studio interactive portfolio featuring GSAP physics and responsive layouts.",tags:["React","GSAP","Tailwind CSS","Framer Motion"],match:"100%",episode:"S01 E07"},
  {title:"Cloud CI/CD Pipeline",category:"DevOps & Infrastructure",description:"Automated deployment workflows using GitHub Actions and containerized Docker environments.",tags:["Docker","GitHub Actions","CI/CD","Render"],match:"98%",episode:"S01 E08"}
];

const gsap = window.gsap;
const ST = window.ScrollTrigger;
if (gsap && ST) gsap.registerPlugin(ST);
// Prevent the browser from restoring scroll mid-page before ScrollTrigger
// measures — a restored/hash scroll makes pinned sections fail to engage.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

// ============ POPULATE STATIC ============
const marquee = document.querySelector("[data-marquee]");
[...TAGLINES, ...TAGLINES].forEach(t => {
  const s = document.createElement("span");
  s.textContent = t + " •";
  marquee.appendChild(s);
});
const stackWrap = document.querySelector("[data-stack]");
STACK_TAGS.forEach(t => { const s = document.createElement("span"); s.textContent = t; stackWrap.appendChild(s); });

// Expertise stacking cards
const expWrap = document.querySelector("[data-exp]");
EXPERTISE.forEach(e => {
  const c = document.createElement("article");
  c.className = "ecard";
  c.style.background = e.grad;
  c.innerHTML = `
    <div class="ehead"><span class="etag">${e.tag}</span><span class="en">${e.number}</span></div>
    <div><h3>${e.title}</h3><p>${e.text}</p></div>`;
  expWrap.appendChild(c);
});

// Skills fan cards
const fanWrap = document.querySelector("[data-fan]");
SKILLS.forEach((s, i) => {
  const c = document.createElement("div");
  c.className = "fcard";
  c.innerHTML = `
    <div class="fc-top"><span class="fc-tag">${s.tag}</span><span class="fc-idx">[ 0${i+1} / 0${SKILLS.length} ]</span></div>
    <div class="fc-mid"><h3>${s.title}</h3><p>${s.desc}</p></div>
    <div class="fc-skills">${s.skills.map(k=>`<span>${k}</span>`).join("")}</div>`;
  fanWrap.appendChild(c);
});
const fanCards = [...fanWrap.children];

// Projects deck cards — injected into a zero-size 3D origin at stage center
const deckWrap = document.querySelector("[data-deck]");
const deckOrigin = document.createElement("div");
deckOrigin.className = "deck-origin";
const archiveSlot = document.createElement("div");
archiveSlot.className = "archive-slot";
archiveSlot.innerHTML = `<span class="slot-tab"></span><span class="slot-label">ARCHIVE_SLOTS</span><span class="slot-lid" data-lid></span>`;
deckOrigin.appendChild(archiveSlot);
PROJECTS.forEach(p => {
  const c = document.createElement("div");
  c.className = "dcard";
  c.innerHTML = `
    <div class="dcard-in">
      <div class="dc-top"><span class="dc-ep">${p.episode}</span><span class="dc-match">${p.match} MATCH</span></div>
      <div class="dc-body">
        <div class="dc-cat">${p.category}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="dc-tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
      </div>
    </div>`;
  deckOrigin.appendChild(c);
});
deckWrap.appendChild(deckOrigin);
const deckCards = [...deckOrigin.querySelectorAll(".dcard")];

// ============ CURSOR ============
const dot = document.querySelector("[data-dot]");
const ring = document.querySelector("[data-ring]");
const glow = document.querySelector("[data-glow]");
if (gsap) {
  gsap.set([dot, ring], { xPercent:-50, yPercent:-50 });
  const dx = gsap.quickTo(dot,"x",{duration:.05,ease:"power2.out"});
  const dy = gsap.quickTo(dot,"y",{duration:.05,ease:"power2.out"});
  const rx = gsap.quickTo(ring,"x",{duration:.18,ease:"power3.out"});
  const ry = gsap.quickTo(ring,"y",{duration:.18,ease:"power3.out"});
  addEventListener("mousemove", e => {
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    glow.style.transform = `translate3d(${e.clientX-350}px,${e.clientY-350}px,0)`;
    glow.style.opacity = "1";
  });
  addEventListener("mousedown", () => gsap.to(ring,{scale:.7,duration:.2}));
  addEventListener("mouseup", () => gsap.to(ring,{scale:1,duration:.2}));
  document.querySelectorAll("a,button,input,textarea,label,[data-tilt]").forEach(el => {
    el.addEventListener("mouseenter", () => gsap.to(ring,{scale:1.4,borderColor:"rgba(229,9,20,1)",duration:.25}));
    el.addEventListener("mouseleave", () => gsap.to(ring,{scale:1,borderColor:"rgba(229,9,20,.6)",duration:.25}));
  });
}

// hero spotlight + tilt
const hero = document.querySelector("[data-hero]");
const heroSpot = document.querySelector("[data-hero-spot]");
const pcard = document.querySelector("[data-tilt]");
hero.addEventListener("mousemove", e => {
  const r = hero.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  heroSpot.style.transform = `translate3d(${x-300}px,${y-300}px,0)`;
  heroSpot.style.opacity = "1";
  if (pcard && gsap) {
    const pr = pcard.getBoundingClientRect();
    const px = (e.clientX - (pr.left+pr.width/2)) / (pr.width/2);
    const py = (e.clientY - (pr.top+pr.height/2)) / (pr.height/2);
    gsap.to(pcard, { rotationY:px*16, rotationX:-py*16, duration:.4, ease:"power3.out", transformPerspective:1000 });
  }
});
hero.addEventListener("mouseleave", () => { heroSpot.style.opacity="0"; if(pcard&&gsap) gsap.to(pcard,{rotationY:0,rotationX:0,duration:.5}); });

// spotlight cards (about)
document.querySelectorAll("[data-spot]").forEach(el => {
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (e.clientX-r.left)+"px");
    el.style.setProperty("--my", (e.clientY-r.top)+"px");
  });
});

// ============ INTRO LOADER ============
const loader = document.querySelector("[data-loader]");
const loaderInner = document.querySelector("[data-loader-inner]");
const app = document.querySelector("[data-app]");
function startApp() {
  if (!gsap) { loader.classList.add("gone"); app.style.opacity=1; heroIntro(); return; }
  const tl = gsap.timeline({ onComplete(){ loader.classList.add("gone"); heroIntro(); if (ST) ST.refresh(); } });
  tl.fromTo(loaderInner,{scale:.95,opacity:0,filter:"blur(8px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:.8,ease:"power3.out"})
    .to(loaderInner,{scale:1.05,opacity:0,filter:"blur(10px)",duration:.4,ease:"power2.in",delay:.5})
    .to(loader,{opacity:0,duration:.5,ease:"power2.inOut"},"-=0.1")
    .to(app,{opacity:1,duration:.5},"-=0.3");
}
function heroIntro() {
  if (!gsap) return;
  gsap.timeline({defaults:{ease:"power4.out"}})
    .fromTo(".nav",{y:-60,opacity:0},{y:0,opacity:1,duration:1})
    .fromTo(".hero-anim-item",{y:50,opacity:0,filter:"blur(10px)"},{y:0,opacity:1,filter:"blur(0px)",duration:1.1,stagger:.12},"-=0.7")
    .fromTo(".pcard",{scale:.75,opacity:0,rotationY:35,rotationX:-15},{scale:1,opacity:1,rotationY:0,rotationX:0,duration:1.4,ease:"back.out(1.2)"},"-=0.9");
}
startApp();

// ============ SCROLL REVEAL ============
const io = new IntersectionObserver(es => {
  es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold:.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ============ EXPERTISE STICKY STACK (Apple-style) ============
if (gsap && ST) {
  const cards = [...expWrap.children];
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    gsap.to(card, {
      scale: 0.92, opacity: 0.5, filter: "brightness(0.6)",
      transformOrigin: "top center", ease: "none",
      scrollTrigger: { trigger: cards[i + 1], start: "top 30%", end: "top 7rem", scrub: true }
    });
  });
}

// ============ SKILLS FAN REEL (spinning wheel) — sticky-pinned, scrub-driven ============
// PERMANENT FIX: pinning is done by CSS position:sticky (.skills-sticky), NOT a GSAP
// pin. ScrollTrigger only scrubs progress that drives the fan math, so it can never
// "fail to engage" the way pin:true did. See REEL-LOCK.md.
if (gsap && ST) {
  const section = document.querySelector("[data-skills]");
  const N = fanCards.length;
  const place = (progress) => {
    fanCards.forEach((card, n) => {
      const r = n - progress;
      const radius = 1800;
      const a = r * 18;
      const o = a * Math.PI / 180;
      const x = Math.sin(o) * radius;
      const y = radius - Math.cos(o) * radius;
      const z = -Math.abs(r) * 50;
      const scale = Math.max(.4, 1 - Math.abs(r) * .15);
      const opacity = Math.max(.1, 1 - Math.abs(r) * .3);
      const zi = Math.round(100 - Math.abs(r) * 10);
      gsap.set(card, { xPercent:-50, yPercent:-50, x, y, z, rotationZ:a, scale, opacity, zIndex:zi });
    });
  };
  const mm = gsap.matchMedia();
  mm.add("(min-width:769px)", () => {
    gsap.set(fanWrap, { opacity: 1 });
    place(0);
    const spin = () => window.innerHeight * 3.2;               // scroll distance for a full spin
    const sizeSection = () => { section.style.height = (window.innerHeight + spin()) + "px"; };
    sizeSection();
    ST.create({
      trigger: section, start: "top top", end: () => "+=" + spin(),
      scrub: 1, invalidateOnRefresh: true,
      snap: { snapTo: 1/(N-1), duration:{min:.1,max:.35}, ease:"power1.inOut" },
      onRefresh: self => { sizeSection(); place(self.progress * (N - 1)); },
      onUpdate: self => place(self.progress * (N - 1))
    });
  });
  mm.add("(max-width:768px)", () => {
    section.style.height = "auto";
    gsap.set(fanWrap, { opacity: 1 });
    const sticky = document.querySelector(".skills-sticky");
    if (sticky) { sticky.style.position = "relative"; sticky.style.height = "auto"; sticky.style.overflow = "visible"; }
    fanCards.forEach(c => gsap.set(c, { position:"relative", left:0, top:0, xPercent:0, yPercent:0, x:0, y:0, z:0, rotationZ:0, scale:1, opacity:1, margin:"0 auto 1.5rem" }));
    const stage = document.querySelector(".fan-stage");
    if (stage) { stage.style.position = "relative"; stage.style.flexDirection = "column"; stage.style.padding = "8rem 1rem 4rem"; stage.style.perspective = "none"; stage.style.inset = "auto"; }
  });
} else {
  fanCards.forEach(c => c.style.opacity = 1);
}

// ============ PROJECTS: ARCHIVE_SLOTS DEAL (faithful reference port) ============
if (gsap && ST) {
  const lid = document.querySelector("[data-lid]");
  const slotEl = document.querySelector(".archive-slot");
  // index -> {row,col} on a 3x3 grid, centre cell (1,1) reserved for the slot
  const cell = (e) => {
    if (e < 3) return { row: 0, col: e };
    if (e === 3) return { row: 1, col: 0 };
    if (e === 4) return { row: 1, col: 2 };
    return { row: 2, col: e - 5 };
  };
  gsap.set(lid, { transformOrigin: "bottom center" });

  const mm3 = gsap.matchMedia();
  mm3.add("(min-width:769px)", () => {
    // all cards stacked, hidden, inside the drawer
    deckCards.forEach(card => {
      gsap.set(card, { xPercent: -50, yPercent: -50, x: 0, y: 0, rotation: gsap.utils.random(-6, 6), scale: .85, opacity: 0 });
    });
    let idle;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-projects]", start: "top 50%", end: "bottom 50%",
        toggleActions: "play reverse play reverse",
        onEnter: () => idle && idle.kill(), onEnterBack: () => idle && idle.kill(),
        onLeave: () => idle && idle.kill(), onLeaveBack: () => idle && idle.kill()
      },
      onComplete: () => {
        idle = gsap.to(deckCards, {
          y: "+=12", rotation: "+=1", duration: 3.5, yoyo: true, repeat: -1,
          ease: "sine.inOut", stagger: { amount: 1.5, from: "random" }
        });
      }
    });
    // 1) drawer lid flips open
    tl.to(lid, { rotationX: -130, duration: 1.2, ease: "power3.inOut" });
    // 2) cards pop up out of the slot
    tl.to(deckCards, { y: -140, scale: .9, opacity: 1, zIndex: 70, duration: .6, stagger: .04, ease: "back.out(1.2)" }, "-=0.6");
    // 3) cards fly out to the 3x3 grid (centre stays empty)
    tl.to(deckCards, {
      x: (i, t) => { const w = Math.max(...deckCards.map(c => c.offsetWidth || 0)) || 360; return (cell(i).col - 1) * (w + 40); },
      y: (i, t) => { const h = Math.max(...deckCards.map(c => c.offsetHeight || 0)) || 240; return (cell(i).row - 1) * (h + 40); },
      rotation: () => gsap.utils.random(-3, 3), scale: 1, duration: 1.4,
      stagger: { amount: .4, from: "center" }, ease: "expo.out"
    }, "-=0.2");
  });
  mm3.add("(max-width:768px)", () => {
    gsap.set([slotEl, lid], { clearProps: "all" });
    deckCards.forEach(c => { gsap.set(c, { clearProps: "all" }); c.style.opacity = 1; });
  });
} else {
  deckCards.forEach(c => c.style.opacity = 1);
}

// contact word parallax
if (gsap && ST) {
  gsap.to("[data-contact-word]", { yPercent:20, scrollTrigger:{ trigger:".contact", start:"top bottom", end:"bottom top", scrub:true } });
}

// contact form
document.querySelector("[data-form]").addEventListener("submit", e => {
  e.preventDefault();
  const perm = document.getElementById("permission");
  if (!perm.checked) { alert("Please accept the contact permission checkbox."); return; }
  const fn = document.getElementById("firstName").value.trim() || "there";
  const ln = document.getElementById("lastName").value.trim();
  const em = document.getElementById("email").value.trim();
  const msg = document.getElementById("message").value.trim();
  const subject = encodeURIComponent(`Portfolio contact from ${fn} ${ln}`.trim());
  const body = encodeURIComponent(`${msg}\n\n— ${fn} ${ln}\nReply-to: ${em}`);
  window.location.href = `mailto:vmallikarjuna6281@gmail.com?subject=${subject}&body=${body}`;
  alert(`Thanks ${fn}! Opening your mail app to send the message.`);
  e.target.reset();
});

// recalc pin positions once everything (fonts/images/layout) is ready — belt & suspenders
if (ST) {
  const refresh = () => ST.refresh();
  addEventListener("load", () => { refresh(); setTimeout(refresh, 300); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  setTimeout(refresh, 1200);
}
