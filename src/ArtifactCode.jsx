import { useState, useRef, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const MATERIALS = [
  {
    id: "gfrc",
    name: "GFRC",
    full: "Glass Fiber Reinforced Concrete",
    color: "#7C9A92",
    accent: "#A8C4BC",
    icon: "⬡",
    weight: "15–20 kg/m²",
    thickness: "12–25 mm",
    fireRating: "A1",
    tags: ["Architectural", "Precast", "Sustainable"],
    desc: "High-performance concrete composite reinforced with alkali-resistant glass fibers. Ideal for complex geometries and detailed facades.",
    pros: ["Lightweight vs. standard concrete", "High design flexibility", "Excellent fire resistance", "Low maintenance"],
    cons: ["Specialized installation required", "Higher initial cost", "Curing sensitivity"],
    techniques: ["Back plate system", "Steel stud frame", "Cast-in anchor", "Revealed joint system", "Butt joint glazing"],
    standards: ["ASTM C1228", "EN 1169", "PCI MNL-128"],
  },
  {
    id: "gfrp",
    name: "GFRP",
    full: "Glass Fiber Reinforced Polymer",
    color: "#8B7355",
    accent: "#C4A882",
    icon: "◈",
    weight: "4–8 kg/m²",
    thickness: "4–10 mm",
    fireRating: "B-s2",
    tags: ["Lightweight", "Composite", "Corrosion-Free"],
    desc: "Polymer matrix composite reinforced with glass fibers. Ultra-lightweight with superior corrosion resistance for coastal and industrial environments.",
    pros: ["Ultra-lightweight", "Corrosion resistant", "High strength-to-weight ratio", "Translucent options available"],
    cons: ["UV degradation risk", "Thermal expansion management needed", "Limited fire performance"],
    techniques: ["Bonded cassette", "Mechanical clip system", "Z-profile rail", "Secret fix bracket", "Open joint rain screen"],
    standards: ["ASTM D638", "ISO 14692", "BS EN 13121"],
  },
  {
    id: "aluminum",
    name: "Aluminum",
    full: "Aluminum Composite / Solid Panel",
    color: "#5B7FA6",
    accent: "#88AACC",
    icon: "▦",
    weight: "3–12 kg/m²",
    thickness: "2–6 mm",
    fireRating: "A2 / B",
    tags: ["Precision", "Durable", "Recyclable"],
    desc: "Extruded or composite aluminum systems offering precision engineering, versatile finishes, and long-term performance in diverse climates.",
    pros: ["Excellent weathering", "Recyclable material", "Precision tolerances", "Wide finish options"],
    cons: ["Galvanic corrosion risk", "Thermal bridging", "Higher embodied energy vs. wood"],
    techniques: ["Pressure plate glazing", "Structurally silicone glazed", "Snap-on capping", "Cassette panel system", "Unitized curtain wall"],
    standards: ["EN 1090", "AAMA 2605", "AS 1734"],
  },
  {
    id: "stone",
    name: "Stone",
    full: "Natural & Engineered Stone",
    color: "#9B8B72",
    accent: "#C4B49A",
    icon: "◉",
    weight: "25–80 kg/m²",
    thickness: "20–50 mm",
    fireRating: "A1",
    tags: ["Premium", "Timeless", "Natural"],
    desc: "Natural stone (granite, limestone, travertine, marble) and engineered stone panels for prestigious facades with enduring character.",
    pros: ["Unmatched aesthetics", "Extreme longevity", "A1 fire rating", "Thermal mass benefits"],
    cons: ["Heavyweight requires robust structure", "Higher cost", "Quarry variation", "Freeze-thaw vulnerability"],
    techniques: ["Mechanical undercut anchor", "Kerf & clamp system", "Epoxy back-rod fixing", "Open joint ventilated facade", "Mortar bed traditional"],
    standards: ["EN 1469", "ASTM C615", "ANSI A137.1"],
  },
];

const SUPPLIERS = [
  { id: 1, name: "ABM Industries (ABM Group)", material: "gfrc", country: "Sharjah, UAE", specialty: "Precast GFRC Facade & Architectural Elements", rating: 4.9, certs: ["ISO 9001", "Dubai Municipality", "ESMA"], url: "https://abm-i.com/", tier: "Premium" },
  { id: 2, name: "Emirates Precast LLC", material: "gfrc", country: "Dubai, UAE", specialty: "Precast GFRC Facade Panels", rating: 4.9, certs: ["ISO 9001", "Dubai Municipality"], url: "#", tier: "Premium" },
  { id: 3, name: "Al Batha GFRC Industries", material: "gfrc", country: "Sharjah, UAE", specialty: "Custom GFRC Architectural Elements", rating: 4.8, certs: ["ISO 9001", "ESMA"], url: "#", tier: "Premium" },
  { id: 4, name: "RAK Precast", material: "gfrc", country: "Ras Al Khaimah, UAE", specialty: "Structural GFRC & GRC Systems", rating: 4.7, certs: ["ISO 9001", "CE Marked"], url: "#", tier: "Standard" },
  { id: 5, name: "ABM Industries (ABM Group)", material: "gfrp", country: "Sharjah, UAE", specialty: "GRP Facade Panels & Custom Mouldings", rating: 4.9, certs: ["ISO 9001", "Dubai Municipality", "ESMA"], url: "https://abm-i.com/", tier: "Premium" },
  { id: 6, name: "Gulf Composites LLC", material: "gfrp", country: "Dubai, UAE", specialty: "Custom GFRP Facade Mouldings", rating: 4.8, certs: ["ISO 9001", "ESMA"], url: "#", tier: "Premium" },
  { id: 7, name: "Sharjah Fiberglass Industries", material: "gfrp", country: "Sharjah, UAE", specialty: "Pultruded GFRP Profiles & Panels", rating: 4.6, certs: ["ISO 9001", "Dubai Municipality"], url: "#", tier: "Standard" },
  { id: 8, name: "Advanced Composite Materials FZ", material: "gfrp", country: "Ajman, UAE", specialty: "Structural GFRP & FRP Systems", rating: 4.7, certs: ["ISO 9001", "ESMA"], url: "#", tier: "Premium" },
  { id: 9, name: "Alubond USA Middle East", material: "aluminum", country: "Dubai, UAE", specialty: "High-Performance ACP & ACM Systems", rating: 4.9, certs: ["AAMA", "Dubai Civil Defence"], url: "#", tier: "Premium" },
  { id: 10, name: "Emirates Aluminum Factory", material: "aluminum", country: "Abu Dhabi, UAE", specialty: "Aluminum Composite & Curtain Wall", rating: 4.8, certs: ["ISO 9001", "Dubai Municipality"], url: "#", tier: "Premium" },
  { id: 11, name: "Gulf Extrusions", material: "aluminum", country: "Dubai, UAE", specialty: "Extruded Aluminum Profiles & Facades", rating: 4.7, certs: ["EN 1090", "ESMA"], url: "#", tier: "Standard" },
  { id: 12, name: "Al Shafar Interiors LLC", material: "aluminum", country: "Dubai, UAE", specialty: "Aluminum Cassette & Panel Systems", rating: 4.8, certs: ["ISO 9001", "Dubai Municipality"], url: "#", tier: "Premium" },
  { id: 13, name: "Emirates Stone Industries", material: "stone", country: "Sharjah, UAE", specialty: "Granite, Marble & Quartzite Slabs", rating: 4.9, certs: ["ISO 9001", "ESMA"], url: "#", tier: "Premium" },
  { id: 14, name: "RAK Ceramics - Stone Division", material: "stone", country: "Ras Al Khaimah, UAE", specialty: "Porcelain Stone & Natural Stone", rating: 4.7, certs: ["ISO 9001", "LEED"], url: "#", tier: "Standard" },
  { id: 15, name: "Dubai Stone Industries", material: "stone", country: "Dubai, UAE", specialty: "Premium Natural Stone & Engineered Surfaces", rating: 4.8, certs: ["ISO 9001", "Dubai Municipality"], url: "#", tier: "Premium" },
  { id: 16, name: "Al Batha Stone & Marble", material: "stone", country: "Sharjah, UAE", specialty: "Imported & Local Stone Fabrication", rating: 4.6, certs: ["ISO 9001", "ESMA"], url: "#", tier: "Standard" },
];

const TECHNIQUES_DB = {
  gfrc: [
    { name: "Steel Stud Framing + Back Plate", difficulty: "Intermediate", cost: "$$", windload: "High", description: "Panels attached to steel stud frames via cast-in anchors. Excellent for large-format panels and seismic zones.", bestFor: ["High-rise", "Complex geometry", "Seismic zones"], steps: ["Design structural steel frame", "Cast anchor plates into GFRC", "Erect steel stud grid", "Hang panels with adjustable brackets", "Seal joints with EPDM backer + sealant"] },
    { name: "Revealed Joint Open Rain Screen", difficulty: "Advanced", cost: "$$$", windload: "Very High", description: "Panels with 10–20mm open joints allowing drainage. Best practice for moisture management in wet climates.", bestFor: ["Wet climates", "Ventilated facade", "Premium finish"], steps: ["Install vapor barrier & insulation", "Fix horizontal rail system", "Clip GFRC panels with top/bottom hooks", "Maintain open joint cavity", "Install flashings at head & sill"] },
    { name: "Cast-In Anchor System", difficulty: "Intermediate", cost: "$$", windload: "Medium-High", description: "Threaded stainless inserts cast into panels during manufacture for direct bolted connection.", bestFor: ["Standard facades", "Mid-rise", "Cost-effective"], steps: ["Coordinate anchor positions with fabricator", "Install backing plate to structure", "Bolt panels via cast-in threaded rods", "Install neoprene isolators", "Seal perimeter with polyurethane"] },
  ],
  gfrp: [
    { name: "Mechanical Clip & Rail System", difficulty: "Beginner", cost: "$$", windload: "High", description: "Extruded aluminum rail on structure with spring-loaded clips accepting GFRP panel edges. Fast installation.", bestFor: ["Fast-track projects", "Residential", "Renovation"], steps: ["Fix vertical aluminum rails to structure", "Test rail plumb & alignment", "Clip GFRP panels top-to-bottom", "Install starter & finishing trim", "Apply joint sealant"] },
    { name: "Bonded Cassette System", difficulty: "Advanced", cost: "$$$", windload: "Very High", description: "GFRP folded into cassette form, mechanically fastened with concealed fixings. Premium invisible joint line.", bestFor: ["Premium commercial", "High wind zones", "Concealed fix"], steps: ["Fabricate cassette with return folds", "Install hidden horizontal bearer rails", "Engage cassette hooks into bearer", "Lock with concealed screws", "Test wind resistance per spec"] },
    { name: "Z-Profile Open Joint", difficulty: "Intermediate", cost: "$$", windload: "Medium", description: "Z-shaped aluminum subframe with open-jointed GFRP panels. Excellent rain screen performance.", bestFor: ["Coastal buildings", "Rain screen", "Mid-rise"], steps: ["Install Z-profile subframe", "Apply waterproof membrane behind", "Fix GFRP panels to Z-profiles", "Maintain 8–12mm open joints", "Verify drainage path is clear"] },
  ],
  aluminum: [
    { name: "Unitized Curtain Wall", difficulty: "Expert", cost: "$$$$", windload: "Extreme", description: "Factory-assembled floor-to-floor units. Highest precision and performance. Industry benchmark for tall buildings.", bestFor: ["Tall buildings", "Fast site program", "Premium performance"], steps: ["Fabricate complete floor-to-ceiling units in factory", "Install anchor castings at each slab", "Crane-install units from bottom up", "Secure stack-joint interlocking", "Test air/water infiltration per AAMA"] },
    { name: "Pressure Plate System", difficulty: "Intermediate", cost: "$$$", windload: "High", description: "Aluminum pressure plates mechanically clamp panels to framing. Highly adjustable and robust.", bestFor: ["Commercial", "Mid-rise", "Exposed fixings acceptable"], steps: ["Fix aluminum mullions & transoms to slab", "Set panels into frame rebates", "Install pressure plate over panel edge", "Torque fasteners to spec", "Cap with snap-on aluminum covers"] },
    { name: "Cassette Panel Rainscreen", difficulty: "Intermediate", cost: "$$", windload: "High", description: "Aluminum panels folded into cassette profile, hooked onto horizontal carrier rails. Very fast installation.", bestFor: ["Retrofit", "Education", "Healthcare"], steps: ["Survey structure & set out rail positions", "Fix horizontal extruded carrier rails", "Engage cassette hooks top-to-bottom", "Adjust alignment with slotted holes", "Install perimeter flashings"] },
  ],
  stone: [
    { name: "Mechanical Undercut Anchor (KEIL/BÜTEC)", difficulty: "Expert", cost: "$$$$", windload: "Very High", description: "Precision CNC-undercut kerf in stone panel back accepting stainless insert. Maximum strength, concealed fix.", bestFor: ["Premium landmark", "Granite/Quartzite", "High wind"], steps: ["CNC fabricate undercut kerf in stone back", "Pre-install stainless channel anchors", "Fix anchor bracket to structure", "Engage stone panel anchor into bracket", "Test pull-out per EN 13119"] },
    { name: "Open Joint Ventilated Facade", difficulty: "Advanced", cost: "$$$", windload: "High", description: "Stone panels on concealed bracket system with open 8–12mm joints. Best thermal and moisture management.", bestFor: ["Continental climate", "Travertine/Limestone", "Energy performance"], steps: ["Install insulation & breather membrane", "Fix vertical aluminum bracket rails", "Attach stone via top & bottom kerf clips", "Maintain open drainage joint", "Install bird-stop mesh at base"] },
    { name: "Epoxy Back-Rod Fixing", difficulty: "Intermediate", cost: "$$", windload: "Medium", description: "Stainless rods epoxy bonded into stone kerfs. Economic solution for moderate exposures.", bestFor: ["Low-rise", "Sheltered facades", "Budget-sensitive"], steps: ["Drill or route kerf in stone panel", "Clean kerf and prime with epoxy primer", "Inject two-part epoxy and insert rod", "Cure for min 24 hours", "Attach rod to structure via slotted plate"] },
  ],
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const AIAdvisor = ({ selectedMaterial }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Welcome to the Cladding AI Advisor. I'm trained on facade engineering best practices for **GFRC, GFRP, Aluminum, and Stone** systems.\n\nAsk me about:\n• Installation techniques & sequencing\n• Supplier selection criteria\n• Structural fixings & wind load design\n• Weatherproofing & joint detailing\n• Project-specific recommendations\n\n${selectedMaterial ? `I see you've selected **${MATERIALS.find(m => m.id === selectedMaterial)?.full}** — how can I help with your project?` : "Select a material above to get targeted advice."}`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    if (selectedMaterial && messages.length === 1) {
      const mat = MATERIALS.find(m => m.id === selectedMaterial);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `You've selected **${mat.full} (${mat.name})**. I've loaded best practices, supplier data, and technique guidance for this material. What would you like to know?`
      }]);
    }
  }, [selectedMaterial]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const matContext = selectedMaterial
      ? MATERIALS.find(m => m.id === selectedMaterial)
      : null;

    const systemPrompt = `You are an expert facade engineer and cladding consultant specializing in GFRC, GFRP, Aluminum, and Natural Stone facade systems. You have deep knowledge of:
- Installation techniques and sequences
- Structural fixing systems and wind load calculations
- Weatherproofing, joint sealing, and moisture management
- International standards (EN, ASTM, AAMA, BS, AS)
- Supplier evaluation and quality assessment
- Cost analysis and value engineering
- Building regulations and fire performance
- Sustainability and LEED/BREEAM compliance

${matContext ? `The user is currently focused on ${matContext.full} (${matContext.name}) with these properties:
- Weight: ${matContext.weight}
- Typical thickness: ${matContext.thickness}
- Fire rating: ${matContext.fireRating}
- Key techniques: ${matContext.techniques.join(', ')}
- Relevant standards: ${matContext.standards.join(', ')}` : ""}

Provide precise, professional technical guidance. Use markdown for structure. Be concise but comprehensive. Always mention relevant standards and safety considerations.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Unable to generate response.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const renderMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^#{1,3} (.*?)$/gm, '<div class="ai-heading">$1</div>')
      .replace(/^• (.*?)$/gm, '<div class="ai-bullet">▸ $1</div>')
      .replace(/^- (.*?)$/gm, '<div class="ai-bullet">▸ $1</div>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="ai-panel">
      <div className="ai-header">
        <div className="ai-badge">
          <span className="ai-pulse"></span>
          AI ADVISOR
        </div>
        <div className="ai-model">claude-sonnet</div>
      </div>
      <div className="ai-messages">
        {messages.map((m, i) => (
          <div key={i} className={`ai-msg ${m.role}`}>
            <div className="ai-msg-label">{m.role === "user" ? "YOU" : "AI ADVISOR"}</div>
            <div
              className="ai-msg-content"
              dangerouslySetInnerHTML={{ __html: renderMessage(m.content) }}
            />
          </div>
        ))}
        {loading && (
          <div className="ai-msg assistant">
            <div className="ai-msg-label">AI ADVISOR</div>
            <div className="ai-typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="ai-input-area">
        <input
          className="ai-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask about installation techniques, fixings, standards..."
        />
        <button className="ai-send" onClick={sendMessage} disabled={loading}>
          {loading ? "···" : "SEND →"}
        </button>
      </div>
      <div className="ai-suggestions">
        {["Best fixings for coastal exposure?", "Compare GFRC vs stone for high-rise", "Wind load design guidance", "Fire compliance for aluminum ACM"].map(s => (
          <button key={s} className="ai-chip" onClick={() => { setInput(s); }}>{s}</button>
        ))}
      </div>
    </div>
  );
};

const TechniqueCard = ({ tech, materialColor }) => {
  const [open, setOpen] = useState(false);
  const diffColor = { Beginner: "#7EC8A4", Intermediate: "#F0C060", Advanced: "#F08060", Expert: "#E05060" };
  const costLabel = { "$": "Economy", "$$": "Standard", "$$$": "Premium", "$$$$": "Luxury" };
  return (
    <div className={`tech-card ${open ? "open" : ""}`} style={{ "--mat-color": materialColor }}>
      <div className="tech-header" onClick={() => setOpen(!open)}>
        <div className="tech-name">{tech.name}</div>
        <div className="tech-meta">
          <span className="tech-badge" style={{ background: diffColor[tech.difficulty] + "22", color: diffColor[tech.difficulty], border: `1px solid ${diffColor[tech.difficulty]}44` }}>{tech.difficulty}</span>
          <span className="tech-badge cost">{tech.cost} · {costLabel[tech.cost]}</span>
          <span className="tech-wind">↑ {tech.windload}</span>
        </div>
        <span className="tech-chevron">{open ? "▴" : "▾"}</span>
      </div>
      {open && (
        <div className="tech-body">
          <p className="tech-desc">{tech.description}</p>
          <div className="tech-grid">
            <div>
              <div className="tech-section-label">BEST FOR</div>
              {tech.bestFor.map(b => <div key={b} className="tech-tag">✓ {b}</div>)}
            </div>
            <div>
              <div className="tech-section-label">INSTALLATION STEPS</div>
              {tech.steps.map((s, i) => (
                <div key={i} className="tech-step">
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SupplierCard = ({ supplier }) => {
  const mat = MATERIALS.find(m => m.id === supplier.material);
  const handleClick = () => {
    if (supplier.url && supplier.url !== "#") {
      window.open(supplier.url, "_blank");
    }
  };
  return (
    <div className="supplier-card">
      <div className="supplier-tier" style={{ background: supplier.tier === "Premium" ? "#C8A96E22" : "#ffffff11", color: supplier.tier === "Premium" ? "#C8A96E" : "#888" }}>
        {supplier.tier === "Premium" ? "★ PREMIUM" : "◆ STANDARD"}
      </div>
      <div className="supplier-name">{supplier.name}</div>
      <div className="supplier-country">🇦🇪 {supplier.country}</div>
      <div className="supplier-specialty">{supplier.specialty}</div>
      <div className="supplier-mat-tag" style={{ background: mat.color + "22", color: mat.accent, border: `1px solid ${mat.color}44` }}>
        {mat.name}
      </div>
      <div className="supplier-certs">
        {supplier.certs.map(c => <span key={c} className="cert-badge">{c}</span>)}
      </div>
      <div className="supplier-rating">
        {"★".repeat(Math.floor(supplier.rating))}{"☆".repeat(5 - Math.floor(supplier.rating))}
        <span> {supplier.rating}</span>
      </div>
      <button className="supplier-btn" onClick={handleClick} style={{ cursor: supplier.url !== "#" ? "pointer" : "default", opacity: supplier.url === "#" ? 0.5 : 1 }}>
        {supplier.url !== "#" ? "VISIT WEBSITE →" : "VIEW SUPPLIER →"}
      </button>
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function CladApp() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedMat, setSelectedMat] = useState(null);
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [compareList, setCompareList] = useState([]);

  const activeMat = MATERIALS.find(m => m.id === selectedMat);
  const filteredSuppliers = supplierFilter === "all"
    ? SUPPLIERS
    : SUPPLIERS.filter(s => s.material === supplierFilter);

  const toggleCompare = (id) => {
    setCompareList(prev => prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 2 ? [...prev, id] : prev);
  };

  const compareMats = compareList.map(id => MATERIALS.find(m => m.id === id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0A0C0F;
          --bg2: #0F1215;
          --bg3: #141820;
          --border: #1E2430;
          --border2: #252D3A;
          --text: #E8EAF0;
          --text2: #8090A8;
          --text3: #4A5570;
          --gold: #C8A96E;
          --gold2: #E8C88E;
          --steel: #4A7FA8;
          --green: #5A9A7A;
          --red: #C05050;
          --font-display: 'Barlow Condensed', sans-serif;
          --font-mono: 'DM Mono', monospace;
          --font-body: 'Outfit', sans-serif;
        }

        body { background: var(--bg); color: var(--text); font-family: var(--font-body); min-height: 100vh; overflow-x: hidden; }

        /* ── LAYOUT ── */
        .app-shell { display: flex; min-height: 100vh; }
        .sidebar { width: 220px; min-height: 100vh; background: var(--bg2); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 0; position: sticky; top: 0; flex-shrink: 0; }
        .main-content { flex: 1; overflow: auto; }

        /* ── SIDEBAR ── */
        .sidebar-logo { padding: 28px 20px 20px; border-bottom: 1px solid var(--border); }
        .logo-mark { font-family: var(--font-display); font-size: 26px; font-weight: 800; letter-spacing: 2px; color: var(--text); line-height: 1; }
        .logo-mark span { color: var(--gold); }
        .logo-sub { font-family: var(--font-mono); font-size: 10px; color: var(--text3); letter-spacing: 3px; margin-top: 4px; }
        .sidebar-nav { padding: 16px 0; flex: 1; }
        .nav-section-label { font-family: var(--font-mono); font-size: 9px; color: var(--text3); letter-spacing: 3px; padding: 12px 20px 6px; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 20px; cursor: pointer; transition: all 0.2s; font-size: 13px; font-weight: 500; color: var(--text2); letter-spacing: 0.5px; border-left: 2px solid transparent; }
        .nav-item:hover { background: var(--bg3); color: var(--text); }
        .nav-item.active { background: var(--bg3); color: var(--gold); border-left-color: var(--gold); }
        .nav-icon { font-size: 15px; width: 20px; text-align: center; }
        .sidebar-bottom { padding: 20px; border-top: 1px solid var(--border); }
        .version-tag { font-family: var(--font-mono); font-size: 9px; color: var(--text3); }

        /* ── TOPBAR ── */
        .topbar { display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 60px; background: var(--bg2); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 10; }
        .topbar-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; letter-spacing: 3px; color: var(--text2); }
        .topbar-actions { display: flex; gap: 12px; align-items: center; }
        .topbar-badge { font-family: var(--font-mono); font-size: 10px; background: var(--gold)22; color: var(--gold); border: 1px solid var(--gold)44; border-radius: 4px; padding: 4px 10px; letter-spacing: 2px; }

        /* ── PAGE ── */
        .page { padding: 32px; }
        .page-hero { margin-bottom: 32px; }
        .page-title { font-family: var(--font-display); font-size: 42px; font-weight: 800; letter-spacing: 4px; line-height: 1; color: var(--text); }
        .page-title span { color: var(--gold); }
        .page-subtitle { font-size: 14px; color: var(--text2); margin-top: 8px; max-width: 580px; line-height: 1.6; }

        /* ── STATS ROW ── */
        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .stat-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 20px; }
        .stat-num { font-family: var(--font-display); font-size: 36px; font-weight: 700; color: var(--gold); }
        .stat-label { font-size: 11px; color: var(--text2); letter-spacing: 2px; margin-top: 4px; font-family: var(--font-mono); }

        /* ── MATERIAL GRID ── */
        .section-label { font-family: var(--font-mono); font-size: 11px; color: var(--text3); letter-spacing: 3px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .materials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px; }
        .mat-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 24px; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; }
        .mat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--mat-color), transparent); opacity: 0; transition: opacity 0.3s; }
        .mat-card:hover { border-color: var(--border2); transform: translateY(-2px); }
        .mat-card:hover::before { opacity: 1; }
        .mat-card.selected { border-color: var(--mat-color); background: var(--bg3); }
        .mat-card.selected::before { opacity: 1; }
        .mat-icon { font-size: 36px; margin-bottom: 12px; }
        .mat-name-row { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; }
        .mat-name { font-family: var(--font-display); font-size: 28px; font-weight: 800; letter-spacing: 3px; }
        .mat-full { font-size: 11px; color: var(--text2); }
        .mat-desc { font-size: 12px; color: var(--text2); line-height: 1.6; margin: 10px 0; }
        .mat-props { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; }
        .mat-prop { background: var(--bg)88; border: 1px solid var(--border); border-radius: 6px; padding: 8px 10px; }
        .mat-prop-label { font-family: var(--font-mono); font-size: 9px; color: var(--text3); letter-spacing: 2px; }
        .mat-prop-val { font-size: 12px; font-weight: 600; margin-top: 2px; }
        .mat-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .mat-tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; padding: 4px 8px; border-radius: 4px; background: var(--mat-color)15; color: var(--mat-accent); border: 1px solid var(--mat-color)30; }
        .mat-select-btn { margin-top: 16px; width: 100%; padding: 10px; background: var(--mat-color)22; border: 1px solid var(--mat-color)44; color: var(--mat-accent); font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .mat-select-btn:hover, .mat-card.selected .mat-select-btn { background: var(--mat-color)44; }

        /* ── DASHBOARD SPLIT ── */
        .dashboard-body { display: grid; grid-template-columns: 1fr 380px; gap: 24px; }

        /* ── AI PANEL ── */
        .ai-panel { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; display: flex; flex-direction: column; height: 700px; }
        .ai-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid var(--border); }
        .ai-badge { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--green); letter-spacing: 2px; }
        .ai-pulse { width: 8px; height: 8px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        .ai-model { font-family: var(--font-mono); font-size: 10px; color: var(--text3); }
        .ai-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 14px; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
        .ai-msg { display: flex; flex-direction: column; gap: 4px; }
        .ai-msg.user { align-items: flex-end; }
        .ai-msg-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; color: var(--text3); padding: 0 6px; }
        .ai-msg-content { background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; font-size: 12.5px; line-height: 1.7; color: var(--text); max-width: 90%; }
        .ai-msg.user .ai-msg-content { background: var(--steel)22; border-color: var(--steel)44; max-width: 85%; }
        .ai-heading { font-family: var(--font-display); font-size: 14px; font-weight: 700; letter-spacing: 1px; color: var(--gold); margin: 8px 0 4px; }
        .ai-bullet { padding-left: 8px; color: var(--text2); }
        .ai-typing { display: flex; gap: 5px; padding: 8px; }
        .ai-typing span { width: 8px; height: 8px; background: var(--text3); border-radius: 50%; animation: blink 1.2s infinite; }
        .ai-typing span:nth-child(2) { animation-delay: 0.2s; }
        .ai-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%,80%,100%{opacity:0.3} 40%{opacity:1} }
        .ai-input-area { display: flex; gap: 8px; padding: 12px 16px; border-top: 1px solid var(--border); }
        .ai-input { flex: 1; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 9px 14px; font-size: 12.5px; font-family: var(--font-body); color: var(--text); outline: none; transition: border-color 0.2s; }
        .ai-input:focus { border-color: var(--steel); }
        .ai-send { background: var(--steel)22; border: 1px solid var(--steel)44; color: var(--steel); font-family: var(--font-mono); font-size: 11px; padding: 9px 16px; border-radius: 6px; cursor: pointer; transition: all 0.2s; letter-spacing: 1px; white-space: nowrap; }
        .ai-send:hover:not(:disabled) { background: var(--steel)44; }
        .ai-send:disabled { opacity: 0.5; cursor: not-allowed; }
        .ai-suggestions { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 16px 12px; }
        .ai-chip { background: var(--bg); border: 1px solid var(--border); color: var(--text3); font-size: 10px; padding: 4px 10px; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
        .ai-chip:hover { border-color: var(--border2); color: var(--text2); }

        /* ── TECHNIQUES ── */
        .technique-filter { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .filter-btn { background: var(--bg2); border: 1px solid var(--border); color: var(--text2); font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; padding: 7px 14px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .filter-btn.active, .filter-btn:hover { background: var(--bg3); border-color: var(--border2); color: var(--text); }
        .tech-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 10px; overflow: hidden; transition: border-color 0.2s; }
        .tech-card:hover, .tech-card.open { border-color: var(--mat-color, var(--border2)); }
        .tech-header { display: flex; align-items: center; gap: 12px; padding: 14px 18px; cursor: pointer; }
        .tech-name { font-family: var(--font-display); font-size: 16px; font-weight: 600; letter-spacing: 1px; flex: 1; }
        .tech-meta { display: flex; gap: 8px; align-items: center; }
        .tech-badge { font-family: var(--font-mono); font-size: 9px; letter-spacing: 1px; padding: 3px 8px; border-radius: 4px; }
        .tech-badge.cost { background: #ffffff08; color: var(--text3); border: 1px solid var(--border); }
        .tech-wind { font-family: var(--font-mono); font-size: 10px; color: var(--text3); }
        .tech-chevron { color: var(--text3); font-size: 12px; }
        .tech-body { border-top: 1px solid var(--border); padding: 18px; }
        .tech-desc { font-size: 13px; color: var(--text2); line-height: 1.7; margin-bottom: 16px; }
        .tech-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 20px; }
        .tech-section-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; color: var(--text3); margin-bottom: 10px; }
        .tech-tag { font-size: 12px; color: var(--green); padding: 4px 0; }
        .tech-step { display: flex; gap: 10px; align-items: flex-start; font-size: 12px; color: var(--text2); margin-bottom: 8px; line-height: 1.5; }
        .step-num { font-family: var(--font-mono); font-size: 10px; color: var(--gold); background: var(--gold)15; padding: 2px 6px; border-radius: 4px; flex-shrink: 0; margin-top: 1px; }

        /* ── SUPPLIERS ── */
        .suppliers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .supplier-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 20px; display: flex; flex-direction: column; gap: 8px; transition: border-color 0.2s; }
        .supplier-card:hover { border-color: var(--border2); }
        .supplier-tier { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; padding: 3px 10px; border-radius: 4px; align-self: flex-start; }
        .supplier-name { font-family: var(--font-display); font-size: 20px; font-weight: 700; letter-spacing: 1px; }
        .supplier-country { font-size: 11px; color: var(--text3); }
        .supplier-specialty { font-size: 12px; color: var(--text2); line-height: 1.5; flex: 1; }
        .supplier-mat-tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; padding: 3px 10px; border-radius: 4px; align-self: flex-start; }
        .supplier-certs { display: flex; flex-wrap: wrap; gap: 4px; }
        .cert-badge { font-family: var(--font-mono); font-size: 9px; background: #ffffff08; color: var(--text3); border: 1px solid var(--border); padding: 2px 7px; border-radius: 3px; }
        .supplier-rating { font-size: 12px; color: var(--gold); }
        .supplier-rating span { color: var(--text2); }
        .supplier-btn { margin-top: 4px; padding: 8px; background: transparent; border: 1px solid var(--border); color: var(--text3); font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .supplier-btn:hover { border-color: var(--gold); color: var(--gold); }

        /* ── COMPARE ── */
        .compare-bar { background: var(--bg2); border: 1px solid var(--gold)33; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px; display: flex; align-items: center; gap: 16px; }
        .compare-hint { font-size: 12px; color: var(--text2); flex: 1; }
        .compare-slots { display: flex; gap: 8px; }
        .compare-slot { width: 120px; height: 36px; border: 1px dashed var(--border2); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 10px; color: var(--text3); letter-spacing: 1px; }
        .compare-slot.filled { border-style: solid; border-color: var(--gold)44; color: var(--gold); background: var(--gold)11; }
        .compare-btn { background: var(--gold)22; border: 1px solid var(--gold)44; color: var(--gold); font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; padding: 9px 20px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .compare-btn:hover { background: var(--gold)44; }
        .compare-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .compare-table { display: grid; grid-template-columns: 200px repeat(2, 1fr); gap: 0; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .compare-col-header { padding: 20px; border-bottom: 1px solid var(--border); font-family: var(--font-display); font-size: 22px; font-weight: 800; letter-spacing: 2px; }
        .compare-row-label { background: var(--bg3); padding: 14px 20px; border-top: 1px solid var(--border); font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: var(--text3); display: flex; align-items: center; }
        .compare-cell { padding: 14px 20px; border-top: 1px solid var(--border); font-size: 13px; display: flex; align-items: center; }
        .compare-pros { display: flex; flex-direction: column; gap: 4px; }
        .compare-pro { font-size: 11px; color: var(--green); }
        .compare-con { font-size: 11px; color: var(--red); }
        .mat-compare-check { width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 12px; flex-shrink: 0; }
        .mat-compare-check.selected { background: var(--gold)22; border-color: var(--gold); color: var(--gold); }

        /* ── PROJECT CONFIGURATOR ── */
        .config-form { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 28px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: var(--text3); }
        .form-input, .form-select { background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 10px 14px; color: var(--text); font-family: var(--font-body); font-size: 13px; outline: none; transition: border-color 0.2s; }
        .form-input:focus, .form-select:focus { border-color: var(--steel); }
        .form-select option { background: var(--bg2); }
        .config-submit { background: var(--gold)22; border: 1px solid var(--gold)44; color: var(--gold); font-family: var(--font-mono); font-size: 12px; letter-spacing: 3px; padding: 14px 32px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .config-submit:hover { background: var(--gold)44; }
        .config-result { margin-top: 24px; background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 20px; font-size: 13px; line-height: 1.8; color: var(--text2); }
        .config-result strong { color: var(--gold); }
        .config-loading { display: flex; align-items: center; gap: 8px; color: var(--text3); font-family: var(--font-mono); font-size: 11px; }

        /* ── SCROLLBAR ── */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

        /* ── UTILITY ── */
        .section-divider { height: 1px; background: var(--border); margin: 28px 0; }
        .empty-state { text-align: center; padding: 60px; color: var(--text3); font-family: var(--font-mono); font-size: 12px; letter-spacing: 2px; }
        .highlight-row { background: linear-gradient(90deg, var(--gold)08, transparent); border-left: 2px solid var(--gold)44; padding-left: 16px; margin-bottom: 8px; border-radius: 0 6px 6px 0; }

        @media(max-width: 1100px) {
          .dashboard-body { grid-template-columns: 1fr; }
          .materials-grid { grid-template-columns: 1fr 1fr; }
          .suppliers-grid { grid-template-columns: 1fr 1fr; }
          .compare-table { grid-template-columns: 140px repeat(2, 1fr); }
        }
        @media(max-width: 768px) {
          .sidebar { width: 60px; }
          .nav-item span:not(.nav-icon) { display: none; }
          .logo-mark, .logo-sub, .nav-section-label, .sidebar-bottom { display: none; }
          .stats-row { grid-template-columns: 1fr 1fr; }
          .materials-grid { grid-template-columns: 1fr; }
          .form-grid { grid-template-columns: 1fr; }
          .suppliers-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="app-shell">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">CLAD<span>AI</span></div>
            <div className="logo-sub">FACADE INTELLIGENCE</div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section-label">WORKSPACE</div>
            {[
              { id: "dashboard", icon: "◈", label: "Dashboard" },
              { id: "materials", icon: "⬡", label: "Materials" },
              { id: "techniques", icon: "◧", label: "Techniques" },
              { id: "suppliers", icon: "◉", label: "Suppliers" },
              { id: "compare", icon: "◫", label: "Compare" },
              { id: "configure", icon: "⊞", label: "Configurator" },
              { id: "blueprints", icon: "⊟", label: "Blueprints" },
            ].map(n => (
              <div
                key={n.id}
                className={`nav-item ${activeSection === n.id ? "active" : ""}`}
                onClick={() => setActiveSection(n.id)}
              >
                <span className="nav-icon">{n.icon}</span>
                <span>{n.label}</span>
              </div>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="version-tag">v2.0 · AI ENABLED</div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main-content">
          {/* TOPBAR */}
          <div className="topbar">
            <div className="topbar-title">
              {{ dashboard: "OVERVIEW", materials: "MATERIAL LIBRARY", techniques: "INSTALLATION TECHNIQUES", suppliers: "SUPPLIER NETWORK", compare: "MATERIAL COMPARISON", configure: "PROJECT CONFIGURATOR", blueprints: "BLUEPRINTS & TECHNICAL DRAWINGS" }[activeSection]}
            </div>
            <div className="topbar-actions">
              {selectedMat && (
                <div className="topbar-badge" style={{ background: activeMat.color + "22", color: activeMat.accent, borderColor: activeMat.color + "44" }}>
                  {activeMat.name} SELECTED
                </div>
              )}
              <div className="topbar-badge">AI ONLINE</div>
            </div>
          </div>

          {/* ── DASHBOARD ── */}
          {activeSection === "dashboard" && (
            <div className="page">
              <div className="page-hero">
                <div className="page-title">FACADE <span>INTELLIGENCE</span></div>
                <div className="page-subtitle">AI-powered installation guidance for GFRC, GFRP, Aluminum & Stone cladding systems. Select a material to get targeted technique recommendations and connect with verified suppliers.</div>
              </div>
              <div className="stats-row">
                <div className="stat-card"><div className="stat-num">4</div><div className="stat-label">MATERIAL SYSTEMS</div></div>
                <div className="stat-card"><div className="stat-num">16</div><div className="stat-label">UAE SUPPLIERS</div></div>
                <div className="stat-card"><div className="stat-num">11</div><div className="stat-label">TECHNIQUES</div></div>
                <div className="stat-card"><div className="stat-num">AI</div><div className="stat-label">ADVISOR ONLINE</div></div>
              </div>
              <div className="dashboard-body">
                <div>
                  <div className="section-label">SELECT MATERIAL SYSTEM</div>
                  <div className="materials-grid">
                    {MATERIALS.map(mat => (
                      <div
                        key={mat.id}
                        className={`mat-card ${selectedMat === mat.id ? "selected" : ""}`}
                        style={{ "--mat-color": mat.color, "--mat-accent": mat.accent }}
                        onClick={() => setSelectedMat(selectedMat === mat.id ? null : mat.id)}
                      >
                        <div className="mat-icon">{mat.icon}</div>
                        <div className="mat-name-row">
                          <div className="mat-name" style={{ color: mat.accent }}>{mat.name}</div>
                        </div>
                        <div className="mat-full">{mat.full}</div>
                        <div className="mat-desc">{mat.desc}</div>
                        <div className="mat-props">
                          <div className="mat-prop"><div className="mat-prop-label">WEIGHT</div><div className="mat-prop-val">{mat.weight}</div></div>
                          <div className="mat-prop"><div className="mat-prop-label">THICKNESS</div><div className="mat-prop-val">{mat.thickness}</div></div>
                          <div className="mat-prop"><div className="mat-prop-label">FIRE RATING</div><div className="mat-prop-val">{mat.fireRating}</div></div>
                          <div className="mat-prop"><div className="mat-prop-label">STANDARDS</div><div className="mat-prop-val" style={{ fontSize: 10 }}>{mat.standards[0]}</div></div>
                        </div>
                        <div className="mat-tags">
                          {mat.tags.map(t => <span key={t} className="mat-tag">{t}</span>)}
                        </div>
                        <button className="mat-select-btn" onClick={e => { e.stopPropagation(); setSelectedMat(selectedMat === mat.id ? null : mat.id); }}>
                          {selectedMat === mat.id ? "✓ SELECTED" : "SELECT MATERIAL"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <AIAdvisor selectedMaterial={selectedMat} />
              </div>
            </div>
          )}

          {/* ── MATERIALS ── */}
          {activeSection === "materials" && (
            <div className="page">
              <div className="page-hero">
                <div className="page-title">MATERIAL <span>LIBRARY</span></div>
                <div className="page-subtitle">Technical specifications, performance data, and pros/cons for each facade material system.</div>
              </div>
              {MATERIALS.map(mat => (
                <div key={mat.id} style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 32 }}>{mat.icon}</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, letterSpacing: 3, color: mat.accent }}>{mat.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text2)" }}>{mat.full}</div>
                    </div>
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${mat.color}44, transparent)`, marginLeft: 16 }}></div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {mat.tags.map(t => (
                        <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2, padding: "3px 8px", borderRadius: 4, background: mat.color + "22", color: mat.accent, border: `1px solid ${mat.color}33` }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12, padding: 24, borderTop: `2px solid ${mat.color}` }}>
                    <div>
                      <div className="section-label" style={{ marginBottom: 10 }}>DESCRIPTION</div>
                      <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}>{mat.desc}</p>
                      <div style={{ marginTop: 16 }}>
                        <div className="section-label" style={{ marginBottom: 10 }}>INSTALLATION TECHNIQUES</div>
                        {mat.techniques.map(t => <div key={t} style={{ fontSize: 12, color: "var(--text2)", padding: "4px 0", borderBottom: "1px solid var(--border)" }}>▸ {t}</div>)}
                      </div>
                    </div>
                    <div>
                      <div className="section-label" style={{ marginBottom: 10 }}>ADVANTAGES</div>
                      {mat.pros.map(p => <div key={p} style={{ fontSize: 12, color: "var(--green)", padding: "4px 0" }}>✓ {p}</div>)}
                      <div style={{ marginTop: 16 }}>
                        <div className="section-label" style={{ marginBottom: 10 }}>LIMITATIONS</div>
                        {mat.cons.map(c => <div key={c} style={{ fontSize: 12, color: "var(--red)", padding: "4px 0" }}>✗ {c}</div>)}
                      </div>
                    </div>
                    <div>
                      <div className="section-label" style={{ marginBottom: 10 }}>SPECIFICATIONS</div>
                      {[["Weight", mat.weight], ["Thickness", mat.thickness], ["Fire Rating", mat.fireRating]].map(([k, v]) => (
                        <div key={k} style={{ marginBottom: 12 }}>
                          <div className="mat-prop-label">{k}</div>
                          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{v}</div>
                        </div>
                      ))}
                      <div style={{ marginTop: 8 }}>
                        <div className="section-label" style={{ marginBottom: 10 }}>STANDARDS</div>
                        {mat.standards.map(s => <div key={s} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", padding: "3px 0" }}>{s}</div>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TECHNIQUES ── */}
          {activeSection === "techniques" && (
            <div className="page">
              <div className="page-hero">
                <div className="page-title">INSTALLATION <span>TECHNIQUES</span></div>
                <div className="page-subtitle">Step-by-step installation guides with difficulty ratings, wind load performance, and cost indicators.</div>
              </div>
              <div className="technique-filter">
                {[{ id: "all", label: "ALL SYSTEMS" }, ...MATERIALS.map(m => ({ id: m.id, label: m.name }))].map(f => (
                  <button
                    key={f.id}
                    className={`filter-btn ${(!selectedMat && f.id === "all") || selectedMat === f.id ? "active" : ""}`}
                    onClick={() => setSelectedMat(f.id === "all" ? null : f.id)}
                  >{f.label}</button>
                ))}
              </div>
              {MATERIALS.filter(m => !selectedMat || m.id === selectedMat).map(mat => (
                <div key={mat.id} style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, letterSpacing: 3, color: mat.accent }}>{mat.name}</div>
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${mat.color}44, transparent)` }}></div>
                  </div>
                  {(TECHNIQUES_DB[mat.id] || []).map(tech => (
                    <TechniqueCard key={tech.name} tech={tech} materialColor={mat.color} />
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ── SUPPLIERS ── */}
          {activeSection === "suppliers" && (
            <div className="page">
              <div className="page-hero">
                <div className="page-title">SUPPLIER <span>NETWORK</span></div>
                <div className="page-subtitle">Verified UAE-based manufacturers and suppliers for GFRC, GFRP, Aluminum, and Stone facade systems across Dubai, Abu Dhabi, Sharjah, and the Northern Emirates.</div>
              </div>
              <div className="technique-filter">
                {[{ id: "all", label: "ALL" }, ...MATERIALS.map(m => ({ id: m.id, label: m.name }))].map(f => (
                  <button key={f.id} className={`filter-btn ${supplierFilter === f.id ? "active" : ""}`} onClick={() => setSupplierFilter(f.id)}>{f.label}</button>
                ))}
              </div>
              <div className="suppliers-grid">
                {filteredSuppliers.map(s => <SupplierCard key={s.id} supplier={s} />)}
              </div>
            </div>
          )}

          {/* ── COMPARE ── */}
          {activeSection === "compare" && (
            <div className="page">
              <div className="page-hero">
                <div className="page-title">MATERIAL <span>COMPARISON</span></div>
                <div className="page-subtitle">Select two materials to compare specifications, performance, and suitability side by side.</div>
              </div>
              <div className="compare-bar">
                <div className="compare-hint">Select up to 2 materials to compare:</div>
                <div style={{ display: "flex", gap: 12 }}>
                  {MATERIALS.map(mat => (
                    <div
                      key={mat.id}
                      onClick={() => toggleCompare(mat.id)}
                      style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 14px", borderRadius: 8, border: `1px solid ${compareList.includes(mat.id) ? mat.color : "var(--border)"}`, background: compareList.includes(mat.id) ? mat.color + "22" : "transparent", transition: "all 0.2s" }}
                    >
                      <span style={{ fontSize: 14 }}>{mat.icon}</span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: compareList.includes(mat.id) ? mat.accent : "var(--text2)" }}>{mat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              {compareList.length === 2 ? (
                <div className="compare-table">
                  <div style={{ background: "var(--bg3)", borderBottom: "1px solid var(--border)", padding: "20px" }}></div>
                  {compareMats.map(mat => (
                    <div key={mat.id} className="compare-col-header" style={{ color: mat.accent, background: mat.color + "11" }}>
                      {mat.icon} {mat.name}
                      <div style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 400, color: "var(--text2)", marginTop: 4 }}>{mat.full}</div>
                    </div>
                  ))}
                  {[
                    { label: "WEIGHT", key: "weight" },
                    { label: "THICKNESS", key: "thickness" },
                    { label: "FIRE RATING", key: "fireRating" },
                  ].map(row => (
                    <>
                      <div key={row.label} className="compare-row-label">{row.label}</div>
                      {compareMats.map(mat => (
                        <div key={mat.id} className="compare-cell" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: mat.accent }}>{mat[row.key]}</div>
                      ))}
                    </>
                  ))}
                  <div className="compare-row-label">ADVANTAGES</div>
                  {compareMats.map(mat => (
                    <div key={mat.id} className="compare-cell">
                      <div className="compare-pros">{mat.pros.map(p => <div key={p} className="compare-pro">✓ {p}</div>)}</div>
                    </div>
                  ))}
                  <div className="compare-row-label">LIMITATIONS</div>
                  {compareMats.map(mat => (
                    <div key={mat.id} className="compare-cell">
                      <div className="compare-pros">{mat.cons.map(c => <div key={c} className="compare-con">✗ {c}</div>)}</div>
                    </div>
                  ))}
                  <div className="compare-row-label">STANDARDS</div>
                  {compareMats.map(mat => (
                    <div key={mat.id} className="compare-cell">
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {mat.standards.map(s => <span key={s} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)" }}>{s}</span>)}
                      </div>
                    </div>
                  ))}
                  <div className="compare-row-label">TECHNIQUES</div>
                  {compareMats.map(mat => (
                    <div key={mat.id} className="compare-cell">
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {mat.techniques.map(t => <span key={t} style={{ fontSize: 11, color: "var(--text2)" }}>▸ {t}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">SELECT 2 MATERIALS ABOVE TO BEGIN COMPARISON</div>
              )}
            </div>
          )}

          {/* ── CONFIGURATOR ── */}
          {activeSection === "configure" && <ConfiguratorPanel />}

          {/* ── BLUEPRINTS ── */}
          {activeSection === "blueprints" && <BlueprintsPanel />}
        </div>
      </div>
    </>
  );
}

function ConfiguratorPanel() {
  const [form, setForm] = useState({ projectType: "", height: "", climate: "", material: "", application: "", priority: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    if (!form.material) return;
    setLoading(true);
    setResult(null);
    const matData = MATERIALS.find(m => m.id === form.material);
    const prompt = `As a senior facade engineer, provide a concise project-specific recommendation for:
Project Type: ${form.projectType || "Commercial Building"}
Building Height: ${form.height || "Mid-rise (10-25 floors)"}
Climate: ${form.climate || "Temperate"}
Material: ${matData?.full} (${matData?.name})
Application: ${form.application || "General cladding"}
Priority: ${form.priority || "Performance"}

Provide:
1. **Recommended System**: The specific installation technique with justification
2. **Key Fixings**: Fixing type and spacing guidance
3. **Critical Details**: Top 3 critical installation details
4. **Standards to Reference**: Applicable standards
5. **Supplier Recommendation**: Type of supplier to shortlist

Keep it concise and technical. Use bullet points for lists.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      setResult(data.content?.map(b => b.text || "").join("") || "No response.");
    } catch {
      setResult("Error generating recommendation. Please try again.");
    }
    setLoading(false);
  };

  const formatResult = (text) => text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--gold)">$1</strong>')
    .replace(/^#{1,3} (.*?)$/gm, '<div style="font-family:var(--font-display);font-size:16px;font-weight:700;letter-spacing:2px;color:var(--gold);margin:12px 0 6px">$1</div>')
    .replace(/^[•\-] (.*?)$/gm, '<div style="padding:3px 0 3px 12px;color:var(--text2)">▸ $1</div>')
    .replace(/\n/g, '<br/>');

  return (
    <div className="page">
      <div className="page-hero">
        <div className="page-title">PROJECT <span>CONFIGURATOR</span></div>
        <div className="page-subtitle">Input your project parameters and receive AI-generated, engineering-grade cladding recommendations.</div>
      </div>
      <div className="config-form">
        <div className="section-label" style={{ marginBottom: 20 }}>PROJECT PARAMETERS</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">MATERIAL SYSTEM</label>
            <select className="form-select" value={form.material} onChange={e => set("material", e.target.value)}>
              <option value="">Select material...</option>
              {MATERIALS.map(m => <option key={m.id} value={m.id}>{m.name} — {m.full}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">PROJECT TYPE</label>
            <select className="form-select" value={form.projectType} onChange={e => set("projectType", e.target.value)}>
              <option value="">Select type...</option>
              {["Commercial Office", "Residential Tower", "Cultural/Museum", "Healthcare", "Education", "Hospitality", "Industrial", "Mixed-Use"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">BUILDING HEIGHT</label>
            <select className="form-select" value={form.height} onChange={e => set("height", e.target.value)}>
              <option value="">Select height...</option>
              {["Low-rise (1-4 floors)", "Mid-rise (5-15 floors)", "High-rise (16-30 floors)", "Super-tall (30+ floors)"].map(h => <option key={h}>{h}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">CLIMATE ZONE</label>
            <select className="form-select" value={form.climate} onChange={e => set("climate", e.target.value)}>
              <option value="">Select climate...</option>
              {["Arid/Desert", "Hot & Humid", "Temperate", "Cold Continental", "Coastal/Marine", "Seismic Zone", "High Wind Zone"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">APPLICATION NOTES</label>
            <input className="form-input" placeholder="e.g. complex curved geometry, heritage retrofit..." value={form.application} onChange={e => set("application", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">DESIGN PRIORITY</label>
            <select className="form-select" value={form.priority} onChange={e => set("priority", e.target.value)}>
              <option value="">Select priority...</option>
              {["Performance", "Cost Efficiency", "Speed of Install", "Aesthetics / Premium Finish", "Sustainability / LEED", "Fire Safety", "Low Maintenance"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <button className="config-submit" onClick={generate} disabled={!form.material || loading}>
          {loading ? "GENERATING RECOMMENDATION···" : "GENERATE AI RECOMMENDATION →"}
        </button>
        {result && (
          <div className="config-result">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 3, color: "var(--text3)", marginBottom: 12 }}>AI RECOMMENDATION — {MATERIALS.find(m => m.id === form.material)?.name}</div>
            <div dangerouslySetInnerHTML={{ __html: formatResult(result) }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BLUEPRINT SVG DEFINITIONS ───────────────────────────────────────────────

const BPDefs = () => (
  <defs>
    <pattern id="bp-concrete" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="14" y2="14" stroke="#3E5E80" strokeWidth="0.7"/>
      <line x1="14" y1="0" x2="0" y2="14" stroke="#3E5E80" strokeWidth="0.7"/>
    </pattern>
    <pattern id="bp-insul" x="0" y="0" width="20" height="12" patternUnits="userSpaceOnUse">
      <path d="M0,6 Q5,0 10,6 Q15,12 20,6" fill="none" stroke="#3A7D5C" strokeWidth="1.2"/>
    </pattern>
    <pattern id="bp-gfrc" x="0" y="0" width="9" height="9" patternUnits="userSpaceOnUse">
      <line x1="0" y1="9" x2="9" y2="0" stroke="#5A9AB8" strokeWidth="0.9"/>
      <line x1="-4" y1="9" x2="5" y2="0" stroke="#5A9AB8" strokeWidth="0.5" opacity="0.4"/>
    </pattern>
    <pattern id="bp-gfrp" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <line x1="0" y1="10" x2="10" y2="0" stroke="#A07040" strokeWidth="1"/>
      <line x1="0" y1="5" x2="5" y2="0" stroke="#A07040" strokeWidth="0.4" opacity="0.5"/>
    </pattern>
    <pattern id="bp-stone" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
      <line x1="0" y1="12" x2="12" y2="0" stroke="#8A7055" strokeWidth="1.5"/>
    </pattern>
    <pattern id="bp-alu" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
      <line x1="0" y1="6" x2="6" y2="0" stroke="#3A6888" strokeWidth="0.6"/>
    </pattern>
    <marker id="bp-arr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
      <polygon points="0 0, 7 2.5, 0 5" fill="#FFD166"/>
    </marker>
    <marker id="bp-arrl" markerWidth="7" markerHeight="5" refX="0" refY="2.5" orient="auto-start-reverse">
      <polygon points="0 0, 7 2.5, 0 5" fill="#FFD166"/>
    </marker>
    <marker id="bp-dot" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
      <circle cx="2.5" cy="2.5" r="2.5" fill="#FFD166"/>
    </marker>
  </defs>
);

const DimLine = ({ x1, y1, x2, y2, label, labelX, labelY }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD166" strokeWidth="0.9" markerStart="url(#bp-arrl)" markerEnd="url(#bp-arr)"/>
    {label && <text x={labelX} y={labelY} fill="#FFD166" fontSize="8.5" textAnchor="middle" fontFamily="DM Mono, monospace">{label}</text>}
  </g>
);

const Leader = ({ x1, y1, x2, y2, label, anchor="start" }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7AAAC8" strokeWidth="0.8" strokeDasharray="5,3"/>
    <circle cx={x1} cy={y1} r="2" fill="#7AAAC8"/>
    <text x={x2 + (anchor === "end" ? -4 : 4)} y={y2 + 4} fill="#C8E4F8" fontSize="9.5" textAnchor={anchor === "end" ? "end" : "start"} fontFamily="DM Mono, monospace">{label}</text>
  </g>
);

const TitleBlock = ({ sheet, title, type, scale, material, matColor }) => (
  <g>
    <rect x="10" y="414" width="680" height="26" fill="#0F1E2E" stroke="#1E3A52" strokeWidth="0.8"/>
    <line x1="220" y1="414" x2="220" y2="440" stroke="#1E3A52" strokeWidth="0.8"/>
    <line x1="430" y1="414" x2="430" y2="440" stroke="#1E3A52" strokeWidth="0.8"/>
    <line x1="570" y1="414" x2="570" y2="440" stroke="#1E3A52" strokeWidth="0.8"/>
    <line x1="640" y1="414" x2="640" y2="440" stroke="#1E3A52" strokeWidth="0.8"/>
    <text x="115" y="431" fill={matColor || "#FFD166"} fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="DM Mono, monospace">{title}</text>
    <text x="325" y="427" fill="#8AAAC8" fontSize="8.5" textAnchor="middle" fontFamily="DM Mono, monospace">{type}</text>
    <text x="500" y="431" fill="#A8C8E8" fontSize="9" textAnchor="middle" fontFamily="DM Mono, monospace">SCALE {scale}</text>
    <text x="605" y="428" fill="#6A8AA8" fontSize="8" textAnchor="middle" fontFamily="DM Mono, monospace">CLADAI DETAIL</text>
    <text x="670" y="431" fill="#C8A060" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="DM Mono, monospace">{sheet}</text>
  </g>
);

// ─── DRAWING 1: GFRC STEEL STUD FRAME — HORIZONTAL SECTION ─────────────────
const DrawGFRCSection = () => (
  <svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block"}}>
    <BPDefs/>
    <rect width="700" height="440" fill="#0B1623"/>
    {/* subtle grid */}
    {Array.from({length:35}).map((_,i)=><line key={i} x1={i*20} y1="0" x2={i*20} y2="440" stroke="#111F2E" strokeWidth="0.4"/>)}
    {Array.from({length:22}).map((_,i)=><line key={i} x1="0" y1={i*20} x2="700" y2={i*20} stroke="#111F2E" strokeWidth="0.4"/>)}
    {/* ── INTERIOR ZONE ── */}
    <rect x="10" y="55" width="88" height="290" fill="#0D1A28" opacity="0.7"/>
    <text x="54" y="215" fill="#1E3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 54 215)" fontFamily="DM Mono, monospace" letterSpacing="2">INTERIOR</text>
    {/* ── RC CONCRETE WALL 200mm ── */}
    <rect x="98" y="55" width="108" height="290" fill="#162232" stroke="#7AAAC8" strokeWidth="1.5"/>
    <rect x="98" y="55" width="108" height="290" fill="url(#bp-concrete)" fillOpacity="0.85"/>
    {/* ── VAPOR CONTROL LAYER ── */}
    <line x1="206" y1="55" x2="206" y2="345" stroke="#5AB870" strokeWidth="1.8" strokeDasharray="6,3"/>
    {/* ── MINERAL WOOL INSULATION 100mm ── */}
    <rect x="208" y="55" width="65" height="290" fill="#0F2420"/>
    <rect x="208" y="55" width="65" height="290" fill="url(#bp-insul)" fillOpacity="0.9"/>
    <line x1="208" y1="55" x2="208" y2="345" stroke="#7AAAC8" strokeWidth="1"/>
    <line x1="273" y1="55" x2="273" y2="345" stroke="#7AAAC8" strokeWidth="1"/>
    {/* ── AIR CAVITY 80mm ── */}
    <rect x="273" y="55" width="52" height="290" fill="#0B1825" opacity="0.6"/>
    <line x1="325" y1="55" x2="325" y2="345" stroke="#7AAAC8" strokeWidth="0.7" strokeDasharray="3,3"/>
    {/* ── STEEL STUD 50×50mm ── */}
    {[100, 185, 270].map(sy => (
      <g key={sy}>
        <rect x="297" y={sy} width="28" height="30" fill="#1A3A50" stroke="#3A8AB0" strokeWidth="1.2"/>
        <rect x="297" y={sy} width="28" height="30" fill="url(#bp-alu)" fillOpacity="0.7"/>
      </g>
    ))}
    <line x1="325" y1="55" x2="325" y2="345" stroke="#3A8AB0" strokeWidth="1.2"/>
    {/* stud web lines */}
    {[100, 185, 270].map(sy => (
      <line key={sy} x1="305" y1={sy} x2="305" y2={sy+30} stroke="#6AAAD0" strokeWidth="0.8"/>
    ))}
    {/* ── SS ADJUSTABLE BRACKET ── */}
    <rect x="319" y="185" width="22" height="10" fill="#2A6898" stroke="#5AAAD8" strokeWidth="1.2"/>
    <rect x="341" y="180" width="10" height="20" fill="#2A6898" stroke="#5AAAD8" strokeWidth="1.2"/>
    <rect x="351" y="183" width="14" height="14" fill="#1E4878" stroke="#4A8AC8" strokeWidth="1"/>
    {/* rod */}
    <line x1="365" y1="190" x2="392" y2="190" stroke="#6AAAD8" strokeWidth="2.5"/>
    <line x1="386" y1="186" x2="392" y2="190" stroke="#6AAAD8" strokeWidth="1.5"/>
    <line x1="386" y1="194" x2="392" y2="190" stroke="#6AAAD8" strokeWidth="1.5"/>
    {/* ── GFRC PANEL 1 ── */}
    <rect x="392" y="55" width="36" height="290" fill="#15303A"/>
    <rect x="392" y="55" width="36" height="290" fill="url(#bp-gfrc)" fillOpacity="0.9"/>
    <line x1="392" y1="55" x2="392" y2="345" stroke="#88C0D8" strokeWidth="2"/>
    <line x1="428" y1="55" x2="428" y2="345" stroke="#88C0D8" strokeWidth="2"/>
    {/* cast-in channel in panel */}
    <rect x="414" y="183" width="14" height="14" fill="#0E2030" stroke="#4A9ABE" strokeWidth="1"/>
    {/* ── OPEN JOINT 12mm ── */}
    <rect x="428" y="55" width="18" height="290" fill="#0A1620" opacity="0.5"/>
    <line x1="428" y1="55" x2="428" y2="345" stroke="#88C0D8" strokeWidth="2"/>
    <line x1="446" y1="55" x2="446" y2="345" stroke="#88C0D8" strokeWidth="2"/>
    {/* joint backer rod */}
    <circle cx="437" cy="200" r="5" fill="none" stroke="#E08040" strokeWidth="1.5"/>
    {/* ── GFRC PANEL 2 (partial) ── */}
    <rect x="446" y="55" width="36" height="290" fill="#15303A"/>
    <rect x="446" y="55" width="36" height="290" fill="url(#bp-gfrc)" fillOpacity="0.9"/>
    <line x1="446" y1="55" x2="446" y2="345" stroke="#88C0D8" strokeWidth="2"/>
    <line x1="482" y1="55" x2="482" y2="345" stroke="#88C0D8" strokeWidth="2"/>
    {/* ── EXTERIOR ZONE ── */}
    <rect x="482" y="55" width="208" height="290" fill="#0B1420" opacity="0.5"/>
    <text x="590" y="215" fill="#1A3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 590 215)" fontFamily="DM Mono, monospace" letterSpacing="2">EXTERIOR</text>
    {/* ── SECTION CUT LINE ── */}
    <line x1="10" y1="55" x2="690" y2="55" stroke="#304860" strokeWidth="1.5" strokeDasharray="12,4,3,4"/>
    <line x1="10" y1="345" x2="690" y2="345" stroke="#304860" strokeWidth="1.5" strokeDasharray="12,4,3,4"/>
    {/* ── DIMENSION LINES ── */}
    {/* Interior span dim */}
    <line x1="10" y1="350" x2="98" y2="350" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="10" y1="360" x2="98" y2="360" label="VAR." labelX="54" labelY="375"/>
    <line x1="10" y1="350" x2="10" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="98" y1="350" x2="98" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    {/* Wall 200mm */}
    <DimLine x1="98" y1="360" x2="206" y2="360" label="200mm" labelX="152" labelY="375"/>
    <line x1="206" y1="350" x2="206" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    {/* Insulation 100mm */}
    <DimLine x1="208" y1="360" x2="273" y2="360" label="100mm" labelX="240" labelY="375"/>
    <line x1="273" y1="350" x2="273" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    {/* Air cavity */}
    <DimLine x1="273" y1="360" x2="325" y2="360" label="80mm" labelX="299" labelY="375"/>
    <line x1="325" y1="350" x2="325" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    {/* GFRC panel */}
    <DimLine x1="392" y1="360" x2="428" y2="360" label="18mm" labelX="410" labelY="375"/>
    <line x1="392" y1="350" x2="392" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="428" y1="350" x2="428" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    {/* Joint */}
    <DimLine x1="428" y1="360" x2="446" y2="360" label="12mm" labelX="437" labelY="375"/>
    <line x1="446" y1="350" x2="446" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    {/* ── LEADER ANNOTATIONS ── */}
    <Leader x1="152" y1="130" x2="152" y2="38" label="200mm REINFORCED CONCRETE" anchor="middle"/>
    <text x="152" y="48" fill="#C8E4F8" fontSize="9.5" textAnchor="middle" fontFamily="DM Mono, monospace">BACKUP WALL</text>
    <Leader x1="241" y1="100" x2="80" y2="28" label="MINERAL WOOL INSUL." anchor="start"/>
    <Leader x1="299" y1="120" x2="510" y2="30" label="VENTILATED AIR CAVITY 80mm" anchor="start"/>
    <Leader x1="311" y1="100" x2="530" y2="20" label="50×50 STEEL STUD (GALV.)" anchor="start"/>
    <Leader x1="340" y1="190" x2="560" y2="160" label="SS ADJUSTABLE BRACKET" anchor="start"/>
    <Leader x1="366" y1="190" x2="578" y2="180" label="M12 SS ANCHOR ROD" anchor="start"/>
    <Leader x1="410" y1="130" x2="598" y2="200" label="18mm GFRC PANEL" anchor="start"/>
    <Leader x1="437" y1="200" x2="568" y2="215" label="∅10 EPDM BACKER ROD" anchor="start"/>
    <Leader x1="437" y1="200" x2="560" y2="228" label="+ PU SEALANT" anchor="start"/>
    {/* vapor control */}
    <Leader x1="206" y1="160" x2="60" y2="50" label="VAPOR CONTROL LAYER" anchor="start"/>
    <line x1="60" y1="50" x2="155" y2="50" stroke="#7AAAC8" strokeWidth="0.8" strokeDasharray="5,3"/>
    {/* ── TITLE BLOCK ── */}
    <TitleBlock sheet="GF-01" title="STEEL STUD FRAME — GFRC" type="Horizontal Section Through Wall (Plan Cut)" scale="1:10" matColor="#A8C4BC"/>
  </svg>
);

// ─── DRAWING 2: GFRC ADJUSTABLE BRACKET DETAIL ──────────────────────────────
const DrawGFRCDetail = () => (
  <svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block"}}>
    <BPDefs/>
    <rect width="700" height="440" fill="#0B1623"/>
    {Array.from({length:35}).map((_,i)=><line key={i} x1={i*20} y1="0" x2={i*20} y2="440" stroke="#111F2E" strokeWidth="0.4"/>)}
    {Array.from({length:22}).map((_,i)=><line key={i} x1="0" y1={i*20} x2="700" y2={i*20} stroke="#111F2E" strokeWidth="0.4"/>)}
    {/* ── RC STRUCTURE ── */}
    <rect x="30" y="60" width="140" height="290" fill="#162232"/>
    <rect x="30" y="60" width="140" height="290" fill="url(#bp-concrete)" fillOpacity="0.85"/>
    <line x1="170" y1="60" x2="170" y2="350" stroke="#7AAAC8" strokeWidth="2"/>
    {/* ── EMBEDDED PLATE (cast into RC) ── */}
    <rect x="155" y="175" width="30" height="60" fill="#2A5878" stroke="#5AAAD8" strokeWidth="1.8"/>
    <rect x="155" y="175" width="30" height="60" fill="url(#bp-alu)" fillOpacity="0.8"/>
    {/* weld symbols */}
    <text x="185" y="200" fill="#F0A030" fontSize="11" textAnchor="middle">⌀</text>
    <text x="185" y="215" fill="#F0A030" fontSize="8" textAnchor="middle">WELD</text>
    {/* ── BACK PLATE (horizontal) ── */}
    <rect x="166" y="193" width="90" height="24" fill="#2A6898" stroke="#5AAAD8" strokeWidth="1.5"/>
    <rect x="166" y="193" width="90" height="24" fill="url(#bp-alu)" fillOpacity="0.7"/>
    {/* slot for adjustment */}
    <rect x="200" y="198" width="30" height="14" fill="#0B1825" stroke="#4A90C8" strokeWidth="1"/>
    <text x="215" y="208" fill="#4A90C8" fontSize="7.5" textAnchor="middle">SLOT</text>
    {/* ── VERTICAL SUPPORT PLATE ── */}
    <rect x="247" y="155" width="20" height="100" fill="#205880" stroke="#4A9AB8" strokeWidth="1.5"/>
    <rect x="247" y="155" width="20" height="100" fill="url(#bp-alu)" fillOpacity="0.7"/>
    {/* ── HORIZONTAL FORK ARM ── */}
    <rect x="257" y="195" width="80" height="16" fill="#1E4878" stroke="#4A8AC8" strokeWidth="1.5"/>
    {/* fork at tip */}
    <rect x="330" y="186" width="14" height="10" fill="#1A3A60" stroke="#4A8AC8" strokeWidth="1.2"/>
    <rect x="330" y="214" width="14" height="10" fill="#1A3A60" stroke="#4A8AC8" strokeWidth="1.2"/>
    {/* ── SS THREADED ROD (M12) ── */}
    <rect x="338" y="194" width="60" height="22" fill="#2A4868" stroke="#5A9ABE" strokeWidth="1.5"/>
    {/* thread marks */}
    {[342, 348, 354, 360, 366, 372, 378, 384, 390].map(x => (
      <line key={x} x1={x} y1="194" x2={x} y2="216" stroke="#8ABBD8" strokeWidth="0.6"/>
    ))}
    <line x1="344" y1="198" x2="344" y2="212" stroke="#6AAAD8" strokeWidth="1"/>
    {/* ── CAST-IN STAINLESS CHANNEL in GFRC ── */}
    <rect x="398" y="60" width="80" height="290" fill="#15303A"/>
    <rect x="398" y="60" width="80" height="290" fill="url(#bp-gfrc)" fillOpacity="0.9"/>
    <line x1="398" y1="60" x2="398" y2="350" stroke="#88C0D8" strokeWidth="2.5"/>
    <line x1="478" y1="60" x2="478" y2="350" stroke="#88C0D8" strokeWidth="2.5"/>
    {/* cast-in channel (U-channel) */}
    <rect x="398" y="187" width="22" height="36" fill="#0E2030" stroke="#4A9ABE" strokeWidth="1.5"/>
    <rect x="400" y="189" width="18" height="32" fill="#0A1820" stroke="#3A8AAE" strokeWidth="0.8"/>
    {/* ── FORK ENGAGES CHANNEL ── */}
    <rect x="330" y="192" width="70" height="26" fill="#1A3858" opacity="0.4"/>
    {/* engagement indicator */}
    <line x1="330" y1="195" x2="398" y2="195" stroke="#F0A030" strokeWidth="1" strokeDasharray="4,2"/>
    <line x1="330" y1="215" x2="398" y2="215" stroke="#F0A030" strokeWidth="1" strokeDasharray="4,2"/>
    {/* ── SEALANT BACKING ── */}
    <rect x="478" y="60" width="18" height="290" fill="#0A1620" opacity="0.6"/>
    <line x1="478" y1="60" x2="478" y2="350" stroke="#88C0D8" strokeWidth="2.5"/>
    {/* ── VERTICAL DIMENSION (panel thickness) ── */}
    <DimLine x1="490" y1="60" x2="490" y2="350" label="varies" labelX="504" labelY="205"/>
    <line x1="478" y1="60" x2="500" y2="60" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="478" y1="350" x2="500" y2="350" stroke="#FFD166" strokeWidth="0.7"/>
    {/* ── HORIZONTAL DIMENSIONS ── */}
    <DimLine x1="170" y1="388" x2="256" y2="388" label="EMBED" labelX="213" labelY="402"/>
    <line x1="170" y1="380" x2="170" y2="393" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="256" y1="380" x2="256" y2="393" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="256" y1="388" x2="398" y2="388" label="BRACKET REACH" labelX="327" labelY="402"/>
    <line x1="398" y1="380" x2="398" y2="393" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="398" y1="388" x2="478" y2="388" label="80mm" labelX="438" labelY="402"/>
    <line x1="478" y1="380" x2="478" y2="393" stroke="#FFD166" strokeWidth="0.7"/>
    {/* ── LEADERS ── */}
    <Leader x1="100" y1="190" x2="18" y2="170" label="RC STRUCTURE" anchor="start"/>
    <text x="18" y="180" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">EMBEDDED ANCHOR PLATE</text>
    <Leader x1="213" y1="205" x2="220" y2="130" label="BACK PLATE — 8mm PL." anchor="start"/>
    <Leader x1="215" y1="205" x2="221" y2="145" label="ELONGATED SLOT ±20mm ADJ." anchor="start"/>
    <Leader x1="267" y1="170" x2="270" y2="110" label="VERTICAL SUPPORT PLATE" anchor="start"/>
    <Leader x1="370" y1="198" x2="550" y2="160" label="M12 SS GRADE 316 THREADED ROD" anchor="start"/>
    <Leader x1="415" y1="190" x2="555" y2="178" label="CAST-IN SS CHANNEL (B8 CLASS)" anchor="start"/>
    <Leader x1="415" y1="210" x2="553" y2="195" label="WITH RETENTION CLIP AT BASE" anchor="start"/>
    <Leader x1="338" y1="205" x2="545" y2="210" label="FORK HEAD BOLT ENGAGEMENT" anchor="start"/>
    <TitleBlock sheet="GF-02" title="BRACKET & ANCHOR DETAIL — GFRC" type="Vertical Section — Connection Detail at Stud (1:2 enlarged)" scale="1:2" matColor="#A8C4BC"/>
  </svg>
);

// ─── DRAWING 3: GFRP Z-PROFILE SECTION ──────────────────────────────────────
const DrawGFRPSection = () => (
  <svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block"}}>
    <BPDefs/>
    <rect width="700" height="440" fill="#0B1623"/>
    {Array.from({length:35}).map((_,i)=><line key={i} x1={i*20} y1="0" x2={i*20} y2="440" stroke="#111F2E" strokeWidth="0.4"/>)}
    {Array.from({length:22}).map((_,i)=><line key={i} x1="0" y1={i*20} x2="700" y2={i*20} stroke="#111F2E" strokeWidth="0.4"/>)}
    {/* Interior */}
    <rect x="10" y="55" width="88" height="290" fill="#0D1A28" opacity="0.7"/>
    <text x="54" y="215" fill="#1E3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 54 215)" fontFamily="DM Mono, monospace" letterSpacing="2">INTERIOR</text>
    {/* RC Wall */}
    <rect x="98" y="55" width="108" height="290" fill="#162232" stroke="#7AAAC8" strokeWidth="1.5"/>
    <rect x="98" y="55" width="108" height="290" fill="url(#bp-concrete)" fillOpacity="0.85"/>
    {/* Breather membrane */}
    <line x1="206" y1="55" x2="206" y2="345" stroke="#5AB870" strokeWidth="1.8" strokeDasharray="6,3"/>
    {/* Mineral wool */}
    <rect x="208" y="55" width="60" height="290" fill="#0F2420"/>
    <rect x="208" y="55" width="60" height="290" fill="url(#bp-insul)" fillOpacity="0.9"/>
    <line x1="208" y1="55" x2="208" y2="345" stroke="#7AAAC8" strokeWidth="1"/>
    <line x1="268" y1="55" x2="268" y2="345" stroke="#7AAAC8" strokeWidth="1"/>
    {/* Air cavity */}
    <rect x="268" y="55" width="50" height="290" fill="#0B1825" opacity="0.5"/>
    {/* ── Z-PROFILE RAIL (aluminum extruded) ── */}
    {/* Z-section in plan: top flange | web | bottom flange */}
    {/* The Z-rail is vertical (running floor to ceiling), so in horizontal section it appears as cross section */}
    <rect x="312" y="55" width="12" height="290" fill="#1E4870" stroke="#4A8AB8" strokeWidth="1.2"/>
    <rect x="290" y="55" width="22" height="290" fill="#0B1825" opacity="0.3"/>
    {/* Z flanges */}
    {[75, 155, 235, 315].map(sy => (
      <g key={sy}>
        <rect x="300" y={sy} width="36" height="12" fill="#1E4870" stroke="#5A9AC8" strokeWidth="1.2"/>
        <rect x="300" y={sy} width="36" height="12" fill="url(#bp-alu)" fillOpacity="0.7"/>
        <rect x="310" y={sy+12} width="16" height="28" fill="#1A3A60" stroke="#4A8AB8" strokeWidth="1"/>
        <rect x="310" y={sy+12} width="16" height="28" fill="url(#bp-alu)" fillOpacity="0.6"/>
        <rect x="298" y={sy+40} width="36" height="10" fill="#1E4870" stroke="#5A9AC8" strokeWidth="1.2"/>
        <rect x="298" y={sy+40} width="36" height="10" fill="url(#bp-alu)" fillOpacity="0.7"/>
        {/* fixing screw through to wall */}
        <circle cx="318" cy={sy+6} r="3" fill="#2A6898" stroke="#5AAAD8" strokeWidth="1"/>
      </g>
    ))}
    {/* ── GFRP PANEL 1 ── */}
    <rect x="336" y="55" width="28" height="290" fill="#1A2818"/>
    <rect x="336" y="55" width="28" height="290" fill="url(#bp-gfrp)" fillOpacity="0.9"/>
    <line x1="336" y1="55" x2="336" y2="345" stroke="#C4A882" strokeWidth="2"/>
    <line x1="364" y1="55" x2="364" y2="345" stroke="#C4A882" strokeWidth="2"/>
    {/* ── OPEN JOINT 10mm ── */}
    <rect x="364" y="55" width="14" height="290" fill="#0A1420" opacity="0.5"/>
    <line x1="364" y1="55" x2="364" y2="345" stroke="#C4A882" strokeWidth="2"/>
    <line x1="378" y1="55" x2="378" y2="345" stroke="#C4A882" strokeWidth="2"/>
    {/* ── GFRP PANEL 2 ── */}
    <rect x="378" y="55" width="28" height="290" fill="#1A2818"/>
    <rect x="378" y="55" width="28" height="290" fill="url(#bp-gfrp)" fillOpacity="0.9"/>
    <line x1="406" y1="55" x2="406" y2="345" stroke="#C4A882" strokeWidth="2"/>
    {/* Exterior */}
    <rect x="406" y="55" width="280" height="290" fill="#0B1420" opacity="0.4"/>
    <text x="550" y="215" fill="#1A3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 550 215)" fontFamily="DM Mono, monospace" letterSpacing="2">EXTERIOR</text>
    {/* Section cuts */}
    <line x1="10" y1="55" x2="690" y2="55" stroke="#304860" strokeWidth="1.5" strokeDasharray="12,4,3,4"/>
    <line x1="10" y1="345" x2="690" y2="345" stroke="#304860" strokeWidth="1.5" strokeDasharray="12,4,3,4"/>
    {/* Dimensions */}
    <DimLine x1="98" y1="360" x2="206" y2="360" label="200mm" labelX="152" labelY="375"/>
    <line x1="98" y1="352" x2="98" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="206" y1="352" x2="206" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="208" y1="360" x2="268" y2="360" label="100mm" labelX="238" labelY="375"/>
    <line x1="268" y1="352" x2="268" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="268" y1="360" x2="318" y2="360" label="50mm" labelX="293" labelY="375"/>
    <line x1="318" y1="352" x2="318" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="336" y1="360" x2="364" y2="360" label="8mm" labelX="350" labelY="375"/>
    <line x1="336" y1="352" x2="336" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="364" y1="352" x2="364" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="364" y1="360" x2="378" y2="360" label="10mm" labelX="371" labelY="375"/>
    <line x1="378" y1="352" x2="378" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    {/* Leaders */}
    <Leader x1="152" y1="130" x2="152" y2="38" label="200mm RC BACKUP WALL"/>
    <text x="152" y="48" fill="#C8E4F8" fontSize="9" textAnchor="middle" fontFamily="DM Mono, monospace">W/ ROUGHENED SURFACE</text>
    <Leader x1="238" y1="110" x2="80" y2="30" label="MINERAL WOOL 100mm"/>
    <Leader x1="290" y1="100" x2="460" y2="28" label="VENTILATED AIR CAVITY 50mm"/>
    <Leader x1="318" y1="140" x2="478" y2="20" label="EXTRUDED ALUM. Z-PROFILE"/>
    <text x="478" y="30" fill="#C8E4F8" fontSize="9" fontFamily="DM Mono, monospace">RAIL — ANODISED AA15</text>
    <Leader x1="350" y1="130" x2="510" y2="55" label="GFRP PANEL 8mm — UV STAB."/>
    <Leader x1="371" y1="200" x2="560" y2="180" label="10mm OPEN DRAINAGE JOINT"/>
    <Leader x1="318" y1="200" x2="535" y2="200" label="M8 STAINLESS FIXING SCREW"/>
    <TitleBlock sheet="FP-01" title="Z-PROFILE RAIL SYSTEM — GFRP" type="Horizontal Section Through Wall (Plan Cut)" scale="1:10" matColor="#C4A882"/>
  </svg>
);

// ─── DRAWING 4: GFRP SPRING CLIP CONNECTION DETAIL ──────────────────────────
const DrawGFRPDetail = () => (
  <svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block"}}>
    <BPDefs/>
    <rect width="700" height="440" fill="#0B1623"/>
    {Array.from({length:35}).map((_,i)=><line key={i} x1={i*20} y1="0" x2={i*20} y2="440" stroke="#111F2E" strokeWidth="0.4"/>)}
    {Array.from({length:22}).map((_,i)=><line key={i} x1="0" y1={i*20} x2="700" y2={i*20} stroke="#111F2E" strokeWidth="0.4"/>)}
    {/* RC wall */}
    <rect x="40" y="60" width="120" height="310" fill="#162232"/>
    <rect x="40" y="60" width="120" height="310" fill="url(#bp-concrete)" fillOpacity="0.85"/>
    <line x1="160" y1="60" x2="160" y2="370" stroke="#7AAAC8" strokeWidth="2"/>
    {/* Insulation layer */}
    <rect x="160" y="60" width="55" height="310" fill="#0F2420"/>
    <rect x="160" y="60" width="55" height="310" fill="url(#bp-insul)" fillOpacity="0.9"/>
    <line x1="215" y1="60" x2="215" y2="370" stroke="#7AAAC8" strokeWidth="1"/>
    {/* Air cavity */}
    <rect x="215" y="60" width="40" height="310" fill="#0B1825" opacity="0.4"/>
    {/* ── Z-PROFILE detailed cross section ── */}
    {/* Top flange */}
    <rect x="245" y="155" width="50" height="14" fill="#1E4870" stroke="#5A9AC8" strokeWidth="1.5"/>
    <rect x="245" y="155" width="50" height="14" fill="url(#bp-alu)" fillOpacity="0.8"/>
    {/* Web */}
    <rect x="257" y="169" width="14" height="60" fill="#1A3A60" stroke="#4A8AB8" strokeWidth="1.5"/>
    <rect x="257" y="169" width="14" height="60" fill="url(#bp-alu)" fillOpacity="0.7"/>
    {/* Bottom flange (offset for Z shape) */}
    <rect x="243" y="229" width="50" height="14" fill="#1E4870" stroke="#5A9AC8" strokeWidth="1.5"/>
    <rect x="243" y="229" width="50" height="14" fill="url(#bp-alu)" fillOpacity="0.8"/>
    {/* ── SPRING CLIP ── */}
    {/* Clip body */}
    <path d="M 295 159 L 330 159 L 330 165 L 308 165 L 308 242 L 330 242 L 330 248 L 295 248" fill="none" stroke="#E0A030" strokeWidth="2.5"/>
    {/* Clip spring tab top */}
    <path d="M 308 162 Q 320 145 340 152" fill="none" stroke="#E0A030" strokeWidth="2"/>
    {/* Clip spring tab bottom */}
    <path d="M 308 245 Q 320 258 340 251" fill="none" stroke="#E0A030" strokeWidth="2"/>
    {/* ── GFRP PANEL edge ── */}
    <rect x="340" y="120" width="90" height="180" fill="#1A2818"/>
    <rect x="340" y="120" width="90" height="180" fill="url(#bp-gfrp)" fillOpacity="0.9"/>
    <line x1="340" y1="120" x2="340" y2="300" stroke="#C4A882" strokeWidth="2.5"/>
    <line x1="430" y1="120" x2="430" y2="300" stroke="#C4A882" strokeWidth="2.5"/>
    {/* panel return/rebate for clip engagement */}
    <rect x="340" y="152" width="20" height="100" fill="#0E1E0E" stroke="#A09060" strokeWidth="1"/>
    {/* ── FASTENER (M8 hex bolt through Z to wall) ── */}
    <circle cx="264" cy="162" r="6" fill="#2A6898" stroke="#5AAAD8" strokeWidth="1.5"/>
    <circle cx="264" cy="162" r="3" fill="#1A3858"/>
    <line x1="257" y1="162" x2="215" y2="162" stroke="#5AAAD8" strokeWidth="1.5" strokeDasharray="4,2"/>
    <circle cx="264" cy="236" r="6" fill="#2A6898" stroke="#5AAAD8" strokeWidth="1.5"/>
    <circle cx="264" cy="236" r="3" fill="#1A3858"/>
    <line x1="257" y1="236" x2="215" y2="236" stroke="#5AAAD8" strokeWidth="1.5" strokeDasharray="4,2"/>
    {/* ── EXTERIOR ── */}
    <rect x="430" y="60" width="260" height="310" fill="#0B1420" opacity="0.4"/>
    <text x="550" y="215" fill="#1A3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 550 215)" fontFamily="DM Mono, monospace" letterSpacing="2">EXTERIOR</text>
    {/* Dimensions */}
    <DimLine x1="245" y1="390" x2="295" y2="390" label="50mm" labelX="270" labelY="404"/>
    <line x1="245" y1="380" x2="245" y2="395" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="295" y1="380" x2="295" y2="395" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="295" y1="390" x2="340" y2="390" label="CLIP" labelX="317" labelY="404"/>
    <line x1="340" y1="380" x2="340" y2="395" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="340" y1="390" x2="430" y2="390" label="8mm PANEL" labelX="385" labelY="404"/>
    <line x1="430" y1="380" x2="430" y2="395" stroke="#FFD166" strokeWidth="0.7"/>
    {/* Leaders */}
    <Leader x1="88" y1="180" x2="30" y2="160" label="200mm RC WALL"/>
    <Leader x1="188" y1="160" x2="155" y2="100" label="MINERAL WOOL INSUL."/>
    <Leader x1="229" y1="190" x2="215" y2="100" label="AIR CAVITY"/>
    <Leader x1="264" y1="155" x2="460" y2="90" label="EXTRUDED AL. Z-PROFILE"/>
    <Leader x1="316" y1="145" x2="480" y2="110" label="STAINLESS SPRING CLIP"/>
    <text x="480" y="120" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">316 GRADE — SELF-LOCKING</text>
    <Leader x1="385" y1="180" x2="500" y2="160" label="8mm GFRP PANEL"/>
    <Leader x1="360" y1="190" x2="505" y2="190" label="REBATE FOR CLIP ENGAGEMENT"/>
    <Leader x1="264" y1="162" x2="470" y2="230" label="M8 SS MACHINE SCREW"/>
    <text x="470" y="240" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">THROUGH Z-WEB TO WALL</text>
    <TitleBlock sheet="FP-02" title="SPRING CLIP CONNECTION — GFRP" type="Detail — Panel Edge to Z-Rail (Enlarged)" scale="1:2" matColor="#C4A882"/>
  </svg>
);

// ─── DRAWING 5: ALUMINUM CASSETTE RAINSCREEN SECTION ─────────────────────────
const DrawAlumSection = () => (
  <svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block"}}>
    <BPDefs/>
    <rect width="700" height="440" fill="#0B1623"/>
    {Array.from({length:35}).map((_,i)=><line key={i} x1={i*20} y1="0" x2={i*20} y2="440" stroke="#111F2E" strokeWidth="0.4"/>)}
    {Array.from({length:22}).map((_,i)=><line key={i} x1="0" y1={i*20} x2="700" y2={i*20} stroke="#111F2E" strokeWidth="0.4"/>)}
    {/* Interior */}
    <rect x="10" y="55" width="88" height="290" fill="#0D1A28" opacity="0.7"/>
    <text x="54" y="215" fill="#1E3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 54 215)" fontFamily="DM Mono, monospace" letterSpacing="2">INTERIOR</text>
    {/* RC wall */}
    <rect x="98" y="55" width="108" height="290" fill="#162232" stroke="#7AAAC8" strokeWidth="1.5"/>
    <rect x="98" y="55" width="108" height="290" fill="url(#bp-concrete)" fillOpacity="0.85"/>
    {/* Mineral wool */}
    <rect x="206" y="55" width="60" height="290" fill="#0F2420"/>
    <rect x="206" y="55" width="60" height="290" fill="url(#bp-insul)" fillOpacity="0.9"/>
    <line x1="206" y1="55" x2="206" y2="345" stroke="#7AAAC8" strokeWidth="1.2"/>
    <line x1="266" y1="55" x2="266" y2="345" stroke="#7AAAC8" strokeWidth="1.2"/>
    {/* Air cavity */}
    <rect x="266" y="55" width="45" height="290" fill="#0B1825" opacity="0.5"/>
    {/* ── HORIZONTAL BEARER RAIL (runs horizontally across facade) ── */}
    {/* In plan section, this appears as a rectangular cross-section */}
    {[90, 175, 260].map(sy => (
      <g key={sy}>
        <rect x="295" y={sy} width="40" height="20" fill="#1E4870" stroke="#5A9AC8" strokeWidth="1.5"/>
        <rect x="295" y={sy} width="40" height="20" fill="url(#bp-alu)" fillOpacity="0.8"/>
        {/* back fixing through insul to wall */}
        <line x1="295" y1={sy+10} x2="206" y2={sy+10} stroke="#5AAAD8" strokeWidth="1.2" strokeDasharray="4,2"/>
        <circle cx="266" cy={sy+10} r="3.5" fill="#2A6898" stroke="#5AAAD8" strokeWidth="1"/>
      </g>
    ))}
    {/* rail vertical element */}
    <line x1="305" y1="55" x2="305" y2="345" stroke="#3A6888" strokeWidth="0.8" strokeDasharray="3,3"/>
    {/* ── ALUMINUM CASSETTE PANEL 1 ── */}
    {/* Cassette = flat face + two folded returns at edges */}
    {/* Face */}
    <rect x="335" y="55" width="8" height="290" fill="#1E4870" stroke="#4A8AB8" strokeWidth="2"/>
    <rect x="335" y="55" width="8" height="290" fill="url(#bp-alu)" fillOpacity="0.8"/>
    {/* Top return (shown at top of section) */}
    <rect x="310" y="55" width="25" height="8" fill="#1E4870" stroke="#4A8AB8" strokeWidth="1.5"/>
    <rect x="310" y="55" width="25" height="8" fill="url(#bp-alu)" fillOpacity="0.8"/>
    {/* Hook return engages bearer */}
    <path d="M 310 63 L 310 83 L 330 83 L 330 90 L 335 90 L 335 63" fill="#1A3858" stroke="#4A8AB8" strokeWidth="1.5"/>
    {/* Hook top engages over bearer */}
    <rect x="295" y="82" width="40" height="8" fill="#0F2040" stroke="#3A7AB0" strokeWidth="1"/>
    {/* ── OPEN JOINT ── */}
    <rect x="343" y="55" width="14" height="290" fill="#0A1420" opacity="0.5"/>
    <line x1="343" y1="55" x2="343" y2="345" stroke="#88AACC" strokeWidth="1.5"/>
    <line x1="357" y1="55" x2="357" y2="345" stroke="#88AACC" strokeWidth="1.5"/>
    {/* ── CASSETTE PANEL 2 (partial) ── */}
    <rect x="357" y="55" width="8" height="290" fill="#1E4870" stroke="#4A8AB8" strokeWidth="2"/>
    <rect x="357" y="55" width="8" height="290" fill="url(#bp-alu)" fillOpacity="0.8"/>
    <rect x="357" y="55" width="25" height="8" fill="#1E4870" stroke="#4A8AB8" strokeWidth="1.5"/>
    <path d="M 357 63 L 357 83 L 377 83 L 377 90 L 365 90 L 365 63" fill="#1A3858" stroke="#4A8AB8" strokeWidth="1.5"/>
    {/* Exterior */}
    <rect x="375" y="55" width="315" height="290" fill="#0B1420" opacity="0.4"/>
    <text x="540" y="215" fill="#1A3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 540 215)" fontFamily="DM Mono, monospace" letterSpacing="2">EXTERIOR</text>
    {/* Section cuts */}
    <line x1="10" y1="55" x2="690" y2="55" stroke="#304860" strokeWidth="1.5" strokeDasharray="12,4,3,4"/>
    <line x1="10" y1="345" x2="690" y2="345" stroke="#304860" strokeWidth="1.5" strokeDasharray="12,4,3,4"/>
    {/* Dimensions */}
    <DimLine x1="98" y1="360" x2="206" y2="360" label="200mm" labelX="152" labelY="375"/>
    <line x1="98" y1="352" x2="98" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="206" y1="352" x2="206" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="206" y1="360" x2="266" y2="360" label="80mm INSUL." labelX="236" labelY="375"/>
    <line x1="266" y1="352" x2="266" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="266" y1="360" x2="335" y2="360" label="60mm CAVITY" labelX="300" labelY="375"/>
    <line x1="335" y1="352" x2="335" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="335" y1="360" x2="343" y2="360" label="" labelX="339" labelY="375"/>
    <text x="339" y="375" fill="#FFD166" fontSize="7" textAnchor="middle" fontFamily="DM Mono, monospace">3mm</text>
    <line x1="343" y1="352" x2="343" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="343" y1="360" x2="357" y2="360" label="8mm" labelX="350" labelY="375"/>
    <line x1="357" y1="352" x2="357" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    {/* Leaders */}
    <Leader x1="152" y1="130" x2="152" y2="38" label="200mm RC BACKUP WALL"/>
    <Leader x1="236" y1="110" x2="90" y2="32" label="80mm MINERAL WOOL INSUL."/>
    <Leader x1="295" y1="105" x2="460" y2="28" label="HORIZONTAL BEARER RAIL"/>
    <text x="460" y="38" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">EXTRUDED ALUM. — HOOK PROFILE</text>
    <Leader x1="320" y1="65" x2="490" y2="50" label="FOLDED ALUM. CASSETTE PANEL"/>
    <text x="490" y="60" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">3mm PVDF COATED (ASTM B209)</text>
    <Leader x1="350" y1="200" x2="510" y2="180" label="8mm OPEN JOINT"/>
    <text x="510" y="190" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">DRAINED & BACK-VENTILATED</text>
    <Leader x1="310" y1="83" x2="480" y2="220" label="HOOK RETURN ENGAGEMENT"/>
    <text x="480" y="230" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">TOP LOAD BEARING / BTM PIN FIX</text>
    <TitleBlock sheet="AL-01" title="CASSETTE RAINSCREEN — ALUMINUM" type="Horizontal Section Through Wall (Plan Cut)" scale="1:10" matColor="#88AACC"/>
  </svg>
);

// ─── DRAWING 6: ALUMINUM UNITIZED CURTAIN WALL — MULLION SECTION ─────────────
const DrawAlumDetail = () => (
  <svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block"}}>
    <BPDefs/>
    <rect width="700" height="440" fill="#0B1623"/>
    {Array.from({length:35}).map((_,i)=><line key={i} x1={i*20} y1="0" x2={i*20} y2="440" stroke="#111F2E" strokeWidth="0.4"/>)}
    {Array.from({length:22}).map((_,i)=><line key={i} x1="0" y1={i*20} x2="700" y2={i*20} stroke="#111F2E" strokeWidth="0.4"/>)}
    {/* Interior space */}
    <rect x="10" y="55" width="100" height="310" fill="#0D1A28" opacity="0.7"/>
    <text x="60" y="225" fill="#1E3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 60 225)" fontFamily="DM Mono, monospace" letterSpacing="2">INTERIOR</text>
    {/* ── MULLION HOLLOW SECTION (6063-T6 aluminum extrusion) ── */}
    {/* Outer face */}
    <rect x="110" y="60" width="80" height="310" fill="#1A3858" stroke="#5A9AC8" strokeWidth="2"/>
    <rect x="110" y="60" width="80" height="310" fill="url(#bp-alu)" fillOpacity="0.5"/>
    {/* Hollow interior of mullion */}
    <rect x="120" y="80" width="60" height="270" fill="#0B1825"/>
    {/* Thermal break inserts */}
    <rect x="110" y="200" width="80" height="14" fill="#2A5838" stroke="#3A8858" strokeWidth="1.2"/>
    <rect x="115" y="202" width="70" height="10" fill="#1A3828"/>
    <text x="150" y="210" fill="#3A8858" fontSize="7.5" textAnchor="middle" fontFamily="DM Mono, monospace">THERMAL BREAK</text>
    {/* pressure plate */}
    <rect x="186" y="100" width="20" height="270" fill="#183050" stroke="#4A8AC8" strokeWidth="1.5"/>
    <rect x="186" y="100" width="20" height="270" fill="url(#bp-alu)" fillOpacity="0.6"/>
    {/* ── EPDM GASKET on pressure plate ── */}
    <rect x="205" y="100" width="8" height="270" fill="#0E2820" stroke="#3A7848" strokeWidth="1"/>
    {/* ── PANEL / GLAZING (or solid panel spandrel) ── */}
    {/* Left panel */}
    <rect x="213" y="60" width="100" height="155" fill="#1A2030" stroke="#5A8AB0" strokeWidth="1.5"/>
    <rect x="213" y="60" width="100" height="155" fill="url(#bp-alu)" fillOpacity="0.35"/>
    {/* left panel inner glazing (air gap) */}
    <rect x="228" y="70" width="70" height="135" fill="#0A1828"/>
    <rect x="234" y="76" width="58" height="123" fill="#0E2235" opacity="0.7"/>
    <text x="263" y="142" fill="#2A4A6A" fontSize="8" textAnchor="middle" fontFamily="DM Mono, monospace">DGU GLAZING</text>
    {/* Right panel / spandrel */}
    <rect x="213" y="215" width="100" height="155" fill="#152028" stroke="#4A7898" strokeWidth="1.5"/>
    <rect x="213" y="215" width="100" height="155" fill="url(#bp-alu)" fillOpacity="0.4"/>
    <rect x="228" y="225" width="70" height="135" fill="#0A1820"/>
    {/* ── SNAP CAP / COVER ── */}
    <rect x="206" y="60" width="12" height="310" fill="#102838" stroke="#3A6888" strokeWidth="1" strokeDasharray="5,2"/>
    {/* ── EXTERIOR FACE ── */}
    <line x1="313" y1="60" x2="313" y2="370" stroke="#88AACC" strokeWidth="2.5"/>
    {/* Exterior zone */}
    <rect x="313" y="55" width="375" height="310" fill="#0B1420" opacity="0.4"/>
    <text x="500" y="225" fill="#1A3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 500 225)" fontFamily="DM Mono, monospace" letterSpacing="2">EXTERIOR</text>
    {/* ── VERTICAL SECTION LINES ── */}
    <line x1="10" y1="55" x2="690" y2="55" stroke="#304860" strokeWidth="1.5" strokeDasharray="12,4,3,4"/>
    <line x1="10" y1="370" x2="690" y2="370" stroke="#304860" strokeWidth="1.5" strokeDasharray="12,4,3,4"/>
    {/* Dimensions */}
    <DimLine x1="110" y1="388" x2="186" y2="388" label="MULLION WIDTH" labelX="148" labelY="402"/>
    <line x1="110" y1="380" x2="110" y2="393" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="186" y1="380" x2="186" y2="393" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="186" y1="388" x2="213" y2="388" label="PP" labelX="199" labelY="402"/>
    <line x1="213" y1="380" x2="213" y2="393" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="213" y1="388" x2="313" y2="388" label="PANEL 100mm" labelX="263" labelY="402"/>
    <line x1="313" y1="380" x2="313" y2="393" stroke="#FFD166" strokeWidth="0.7"/>
    {/* Leaders */}
    <Leader x1="150" y1="150" x2="18" y2="130" label="6063-T6 AL. MULLION"/>
    <text x="18" y="140" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">HOLLOW EXTRUSION — ANODISED</text>
    <Leader x1="150" y1="207" x2="18" y2="200" label="POLYAMIDE THERMAL BREAK"/>
    <text x="18" y="210" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">34mm WIDE — POURED & DEBRIDGED</text>
    <Leader x1="197" y1="200" x2="380" y2="110" label="PRESSURE PLATE — ANODISED AL."/>
    <Leader x1="209" y1="200" x2="390" y2="130" label="EPDM STRUCTURAL GASKET"/>
    <Leader x1="263" y1="135" x2="420" y2="150" label="DGU: 6mm/16mm/6mm LOW-E"/>
    <Leader x1="263" y1="310" x2="420" y2="280" label="SOLID SPANDREL PANEL"/>
    <text x="420" y="290" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">3mm PVDF ALUM. ON INSUL. BACK</text>
    <TitleBlock sheet="AL-02" title="UNITIZED CURTAIN WALL — MULLION" type="Horizontal Section — Mullion at Panel Junction" scale="1:5" matColor="#88AACC"/>
  </svg>
);

// ─── DRAWING 7: STONE OPEN JOINT VENTILATED FACADE ───────────────────────────
const DrawStoneSection = () => (
  <svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block"}}>
    <BPDefs/>
    <rect width="700" height="440" fill="#0B1623"/>
    {Array.from({length:35}).map((_,i)=><line key={i} x1={i*20} y1="0" x2={i*20} y2="440" stroke="#111F2E" strokeWidth="0.4"/>)}
    {Array.from({length:22}).map((_,i)=><line key={i} x1="0" y1={i*20} x2="700" y2={i*20} stroke="#111F2E" strokeWidth="0.4"/>)}
    {/* Interior */}
    <rect x="10" y="55" width="78" height="290" fill="#0D1A28" opacity="0.7"/>
    <text x="49" y="215" fill="#1E3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 49 215)" fontFamily="DM Mono, monospace" letterSpacing="2">INTERIOR</text>
    {/* RC Wall */}
    <rect x="88" y="55" width="110" height="290" fill="#162232" stroke="#7AAAC8" strokeWidth="1.5"/>
    <rect x="88" y="55" width="110" height="290" fill="url(#bp-concrete)" fillOpacity="0.85"/>
    {/* Breather membrane */}
    <line x1="198" y1="55" x2="198" y2="345" stroke="#5AB870" strokeWidth="2" strokeDasharray="6,3"/>
    {/* Mineral wool */}
    <rect x="200" y="55" width="58" height="290" fill="#0F2420"/>
    <rect x="200" y="55" width="58" height="290" fill="url(#bp-insul)" fillOpacity="0.9"/>
    <line x1="200" y1="55" x2="200" y2="345" stroke="#7AAAC8" strokeWidth="1"/>
    <line x1="258" y1="55" x2="258" y2="345" stroke="#7AAAC8" strokeWidth="1"/>
    {/* Air cavity */}
    <rect x="258" y="55" width="50" height="290" fill="#0B1825" opacity="0.4"/>
    {/* ── SS ANGLE BRACKET (fixed to structure) ── */}
    {[90, 185, 280].map(sy => (
      <g key={sy}>
        <rect x="276" y={sy} width="14" height="26" fill="#2A5878" stroke="#5AAAD8" strokeWidth="1.2"/>
        <rect x="276" y={sy} width="14" height="26" fill="url(#bp-alu)" fillOpacity="0.8"/>
        <rect x="278" y={sy+26} width="32" height="12" fill="#2A5878" stroke="#5AAAD8" strokeWidth="1.2"/>
        <rect x="278" y={sy+26} width="32" height="12" fill="url(#bp-alu)" fillOpacity="0.8"/>
        {/* bolt to wall */}
        <line x1="276" y1={sy+10} x2="258" y2={sy+10} stroke="#5AAAD8" strokeWidth="1.2" strokeDasharray="3,2"/>
        <circle cx="258" cy={sy+10} r="3.5" fill="#2A6898" stroke="#5AAAD8" strokeWidth="1"/>
      </g>
    ))}
    {/* ── ALUMINUM CARRIER RAIL ── */}
    <line x1="306" y1="55" x2="306" y2="345" stroke="#3A6888" strokeWidth="1"/>
    {[90, 185, 280].map(sy => (
      <rect key={sy} x="296" y={sy+26} width="24" height="12" fill="#1E4870" stroke="#4A8AB8" strokeWidth="1.5" opacity="0.6"/>
    ))}
    {/* ── STONE PANEL 1 — 40mm granite ── */}
    <rect x="320" y="55" width="58" height="290" fill="#1E2218"/>
    <rect x="320" y="55" width="58" height="290" fill="url(#bp-stone)" fillOpacity="0.9"/>
    <line x1="320" y1="55" x2="320" y2="345" stroke="#C4B49A" strokeWidth="2.5"/>
    <line x1="378" y1="55" x2="378" y2="345" stroke="#C4B49A" strokeWidth="2.5"/>
    {/* kerf at back of stone */}
    <rect x="320" y="180" width="12" height="30" fill="#0E1808" stroke="#A09070" strokeWidth="1"/>
    {/* anchor in kerf */}
    <rect x="310" y="186" width="22" height="18" fill="#2A5878" stroke="#5AAAD8" strokeWidth="1"/>
    {/* ── OPEN JOINT 10mm ── */}
    <rect x="378" y="55" width="14" height="290" fill="#0A1420" opacity="0.5"/>
    <line x1="378" y1="55" x2="378" y2="345" stroke="#C4B49A" strokeWidth="2.5"/>
    <line x1="392" y1="55" x2="392" y2="345" stroke="#C4B49A" strokeWidth="2.5"/>
    {/* ── STONE PANEL 2 (partial) ── */}
    <rect x="392" y="55" width="58" height="290" fill="#1E2218"/>
    <rect x="392" y="55" width="58" height="290" fill="url(#bp-stone)" fillOpacity="0.9"/>
    <line x1="450" y1="55" x2="450" y2="345" stroke="#C4B49A" strokeWidth="2.5"/>
    <rect x="392" y="180" width="12" height="30" fill="#0E1808" stroke="#A09070" strokeWidth="1"/>
    <rect x="382" y="186" width="22" height="18" fill="#2A5878" stroke="#5AAAD8" strokeWidth="1"/>
    {/* Exterior */}
    <rect x="450" y="55" width="240" height="290" fill="#0B1420" opacity="0.4"/>
    <text x="580" y="215" fill="#1A3450" fontSize="9.5" textAnchor="middle" transform="rotate(-90 580 215)" fontFamily="DM Mono, monospace" letterSpacing="2">EXTERIOR</text>
    {/* Section cuts */}
    <line x1="10" y1="55" x2="690" y2="55" stroke="#304860" strokeWidth="1.5" strokeDasharray="12,4,3,4"/>
    <line x1="10" y1="345" x2="690" y2="345" stroke="#304860" strokeWidth="1.5" strokeDasharray="12,4,3,4"/>
    {/* Dimensions */}
    <DimLine x1="88" y1="360" x2="198" y2="360" label="200mm" labelX="143" labelY="375"/>
    <line x1="88" y1="352" x2="88" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="198" y1="352" x2="198" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="200" y1="360" x2="258" y2="360" label="100mm" labelX="229" labelY="375"/>
    <line x1="258" y1="352" x2="258" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="258" y1="360" x2="320" y2="360" label="60mm" labelX="289" labelY="375"/>
    <line x1="320" y1="352" x2="320" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="320" y1="360" x2="378" y2="360" label="40mm" labelX="349" labelY="375"/>
    <line x1="378" y1="352" x2="378" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="378" y1="360" x2="392" y2="360" label="10mm" labelX="385" labelY="375"/>
    <line x1="392" y1="352" x2="392" y2="365" stroke="#FFD166" strokeWidth="0.7"/>
    {/* Leaders */}
    <Leader x1="143" y1="130" x2="143" y2="38" label="200mm RC BACKUP WALL"/>
    <Leader x1="229" y1="110" x2="78" y2="30" label="100mm MINERAL WOOL INSUL."/>
    <Leader x1="270" y1="100" x2="455" y2="28" label="VENTILATED AIR CAVITY 60mm"/>
    <Leader x1="283" y1="120" x2="472" y2="18" label="SS ANGLE BRACKET — 316 GRADE"/>
    <Leader x1="316" y1="195" x2="490" y2="150" label="CONCEALED CLIP ANCHOR"/>
    <text x="490" y="160" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">SS KERF CLIP INTO STONE BACK</text>
    <Leader x1="349" y1="130" x2="508" y2="175" label="40mm GRANITE PANEL (G603)"/>
    <text x="508" y="185" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">FLAME TEXTURED FINISH</text>
    <Leader x1="385" y1="200" x2="530" y2="200" label="10mm OPEN JOINT — DRAINED"/>
    <TitleBlock sheet="ST-01" title="OPEN JOINT VENTILATED FACADE — STONE" type="Horizontal Section Through Wall (Plan Cut)" scale="1:10" matColor="#C4B49A"/>
  </svg>
);

// ─── DRAWING 8: STONE UNDERCUT ANCHOR DETAIL ─────────────────────────────────
const DrawStoneDetail = () => (
  <svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block"}}>
    <BPDefs/>
    <rect width="700" height="440" fill="#0B1623"/>
    {Array.from({length:35}).map((_,i)=><line key={i} x1={i*20} y1="0" x2={i*20} y2="440" stroke="#111F2E" strokeWidth="0.4"/>)}
    {Array.from({length:22}).map((_,i)=><line key={i} x1="0" y1={i*20} x2="700" y2={i*20} stroke="#111F2E" strokeWidth="0.4"/>)}
    {/* ── STONE PANEL — VERTICAL SECTION ── */}
    {/* Stone cross section (vertical cut) */}
    <rect x="160" y="60" width="200" height="310" fill="#1E2218"/>
    <rect x="160" y="60" width="200" height="310" fill="url(#bp-stone)" fillOpacity="0.9"/>
    <line x1="160" y1="60" x2="160" y2="370" stroke="#C4B49A" strokeWidth="3"/>
    <line x1="360" y1="60" x2="360" y2="370" stroke="#C4B49A" strokeWidth="3"/>
    {/* ── CNC UNDERCUT KERF (routed slot in back face) ── */}
    {/* The kerf is at the back of the stone, cut by CNC router */}
    {/* Shown in vertical section: at back face (x=160) a slot is cut */}
    {/* Kerf at top fixing position */}
    <rect x="160" y="110" width="42" height="28" fill="#0E1808" stroke="#E0A830" strokeWidth="1.5"/>
    {/* Undercut portion — wider at bottom */}
    <path d="M 160 138 L 202 138 L 202 131 L 172 131 L 172 110 L 160 110" fill="#1A2810" stroke="#E0A830" strokeWidth="1.5"/>
    {/* Kerf at bottom fixing position */}
    <rect x="160" y="268" width="42" height="28" fill="#0E1808" stroke="#E0A830" strokeWidth="1.5"/>
    <path d="M 160 296 L 202 296 L 202 289 L 172 289 L 172 268 L 160 268" fill="#1A2810" stroke="#E0A830" strokeWidth="1.5"/>
    {/* ── SS EXPANSION ANCHOR INSERTS ── */}
    {/* Top anchor body */}
    <rect x="158" y="113" width="38" height="22" fill="#2A5878" stroke="#5AAAD8" strokeWidth="2"/>
    <rect x="158" y="113" width="38" height="22" fill="url(#bp-alu)" fillOpacity="0.7"/>
    {/* Expansion segments */}
    {[163, 168, 173, 178, 183, 188].map(x => (
      <line key={x} x1={x} y1="113" x2={x} y2="135" stroke="#8ABBD8" strokeWidth="0.8"/>
    ))}
    {/* conical expansion tip */}
    <path d="M 160 133 L 168 124 L 180 124 L 196 133" fill="#1A3858" stroke="#5AAAD8" strokeWidth="1.2"/>
    {/* Bottom anchor */}
    <rect x="158" y="271" width="38" height="22" fill="#2A5878" stroke="#5AAAD8" strokeWidth="2"/>
    <rect x="158" y="271" width="38" height="22" fill="url(#bp-alu)" fillOpacity="0.7"/>
    {[163, 168, 173, 178, 183, 188].map(x => (
      <line key={x} x1={x} y1="271" x2={x} y2="293" stroke="#8ABBD8" strokeWidth="0.8"/>
    ))}
    <path d="M 160 291 L 168 282 L 180 282 L 196 291" fill="#1A3858" stroke="#5AAAD8" strokeWidth="1.2"/>
    {/* ── SS ANGLE BRACKET ── */}
    {/* Vertical leg */}
    <rect x="118" y="100" width="42" height="210" fill="#1A3858" stroke="#4A8AB8" strokeWidth="1.5"/>
    <rect x="118" y="100" width="42" height="210" fill="url(#bp-alu)" fillOpacity="0.6"/>
    {/* Horizontal leg with elongated slots */}
    <rect x="58" y="190" width="62" height="34" fill="#1A3858" stroke="#4A8AB8" strokeWidth="1.5"/>
    <rect x="58" y="190" width="62" height="34" fill="url(#bp-alu)" fillOpacity="0.6"/>
    {/* Elongated slot */}
    <rect x="68" y="196" width="32" height="22" fill="#0B1825" stroke="#4A90C8" strokeWidth="1"/>
    <rect x="76" y="199" width="16" height="16" fill="#0B1825"/>
    <text x="84" y="211" fill="#4A90C8" fontSize="7" textAnchor="middle" fontFamily="DM Mono, monospace">SLOT ±15mm</text>
    {/* Connector between bracket and anchor */}
    <rect x="156" y="116" width="10" height="14" fill="#183050" stroke="#3A7AB0" strokeWidth="1"/>
    <rect x="156" y="272" width="10" height="14" fill="#183050" stroke="#3A7AB0" strokeWidth="1"/>
    {/* ── STRUCTURE (RC or steel) ── */}
    <rect x="10" y="60" width="50" height="310" fill="#162232"/>
    <rect x="10" y="60" width="50" height="310" fill="url(#bp-concrete)" fillOpacity="0.85"/>
    <line x1="60" y1="60" x2="60" y2="370" stroke="#7AAAC8" strokeWidth="2"/>
    {/* bolt through structure */}
    <line x1="60" y1="207" x2="120" y2="207" stroke="#5AAAD8" strokeWidth="2" strokeDasharray="5,2"/>
    <circle cx="60" cy="207" r="5" fill="#2A6898" stroke="#5AAAD8" strokeWidth="1.5"/>
    <circle cx="118" cy="207" r="4" fill="#2A6898" stroke="#5AAAD8" strokeWidth="1.5"/>
    {/* ── DETAIL CALLOUT CIRCLE ── */}
    <circle cx="180" cy="124" r="55" fill="none" stroke="#F0C060" strokeWidth="1.5" strokeDasharray="8,4"/>
    <text x="245" y="80" fill="#F0C060" fontSize="10" fontFamily="DM Mono, monospace">DETAIL A</text>
    <line x1="235" y1="80" x2="222" y2="90" stroke="#F0C060" strokeWidth="1"/>
    {/* ── ZOOMED DETAIL INSERT (top right) ── */}
    <rect x="470" y="60" width="220" height="180" fill="#0D1A2A" stroke="#F0C060" strokeWidth="1.5"/>
    <text x="580" y="78" fill="#F0C060" fontSize="9" textAnchor="middle" fontFamily="DM Mono, monospace">DETAIL A — KERF ANCHOR (×4)</text>
    {/* Zoomed stone cross */}
    <rect x="530" y="88" width="80" height="140" fill="#1E2218"/>
    <rect x="530" y="88" width="80" height="140" fill="url(#bp-stone)" fillOpacity="0.9"/>
    <line x1="530" y1="88" x2="530" y2="228" stroke="#C4B49A" strokeWidth="2"/>
    {/* Kerf zoomed */}
    <path d="M 530 110 L 555 110 L 555 118 L 545 118 L 545 148 L 555 148 L 555 155 L 530 155" fill="#0E1808" stroke="#E0A830" strokeWidth="2"/>
    {/* Anchor zoomed */}
    <rect x="482" y="113" width="50" height="38" fill="#2A5878" stroke="#5AAAD8" strokeWidth="1.5"/>
    {[487, 494, 501, 508, 515, 522].map(x => (
      <line key={x} x1={x} y1="113" x2={x} y2="151" stroke="#8ABBD8" strokeWidth="0.9"/>
    ))}
    <path d="M 484 149 L 490 140 L 504 138 L 530 148" fill="#1A3858" stroke="#5AAAD8" strokeWidth="1.2"/>
    <text x="506" y="175" fill="#7AAAC8" fontSize="8.5" textAnchor="middle" fontFamily="DM Mono, monospace">CNC UNDERCUT</text>
    <text x="506" y="186" fill="#7AAAC8" fontSize="8.5" textAnchor="middle" fontFamily="DM Mono, monospace">KERF — 22mm DEEP</text>
    <text x="506" y="200" fill="#5AAAD8" fontSize="8" textAnchor="middle" fontFamily="DM Mono, monospace">SS316 EXPANSION ANCHOR</text>
    <text x="506" y="210" fill="#5AAAD8" fontSize="8" textAnchor="middle" fontFamily="DM Mono, monospace">Ø12 × 70mm</text>
    {/* Dimensions */}
    <DimLine x1="360" y1="110" x2="360" y2="145" label="" labelX="380" labelY="131"/>
    <text x="380" y="131" fill="#FFD166" fontSize="8" fontFamily="DM Mono, monospace">TOP FIX</text>
    <line x1="350" y1="110" x2="365" y2="110" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="350" y1="145" x2="365" y2="145" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="360" y1="268" x2="360" y2="296" label="" labelX="385" labelY="282"/>
    <text x="385" y="282" fill="#FFD166" fontSize="8" fontFamily="DM Mono, monospace">BOT FIX</text>
    <line x1="350" y1="268" x2="365" y2="268" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="350" y1="296" x2="365" y2="296" stroke="#FFD166" strokeWidth="0.7"/>
    <DimLine x1="362" y1="60" x2="362" y2="370" label="t=40mm" labelX="410" labelY="215"/>
    <line x1="355" y1="60" x2="368" y2="60" stroke="#FFD166" strokeWidth="0.7"/>
    <line x1="355" y1="370" x2="368" y2="370" stroke="#FFD166" strokeWidth="0.7"/>
    {/* Leaders */}
    <Leader x1="32" y1="200" x2="10" y2="170" label="RC STRUCTURE" anchor="start"/>
    <Leader x1="88" y1="207" x2="10" y2="250" label="M12 ANCHOR BOLT" anchor="start"/>
    <text x="10" y="260" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">W/ NEOPRENE ISOLATOR</text>
    <Leader x1="137" y1="200" x2="20" y2="290" label="SS ANGLE BRACKET 316"/>
    <text x="20" y="300" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">8mm PLATE — SLOTTED</text>
    <Leader x1="180" y1="124" x2="430" y2="340" label="UNDERCUT ANCHOR"/>
    <text x="430" y="350" fill="#C8E4F8" fontSize="8.5" fontFamily="DM Mono, monospace">Ø12mm SS316 — EN 13119 TESTED</text>
    <Leader x1="260" y1="200" x2="430" y2="360" label="40mm GRANITE SLAB"/>
    <TitleBlock sheet="ST-02" title="UNDERCUT ANCHOR DETAIL — STONE" type="Vertical Section + Detail A — Kerf Anchor Connection" scale="1:2" matColor="#C4B49A"/>
  </svg>
);

// ─── BLUEPRINTS PANEL ────────────────────────────────────────────────────────
function BlueprintsPanel() {
  const [activeSystem, setActiveSystem] = useState("gfrc");
  const [activeIdx, setActiveIdx] = useState(0);
  const [aiNote, setAiNote] = useState("");
  const [loadingNote, setLoadingNote] = useState(false);

  const systemMeta = {
    gfrc:     { color: "#7C9A92", accent: "#A8C4BC" },
    gfrp:     { color: "#8B7355", accent: "#C4A882" },
    aluminum: { color: "#5B7FA6", accent: "#88AACC" },
    stone:    { color: "#9B8B72", accent: "#C4B49A" },
  };

  const drawings = {
    gfrc: [
      { title: "STEEL STUD FRAME SYSTEM", subtitle: "Horizontal Section — Plan Cut", sheet: "GF-01", scale: "1:10", tags: ["Horizontal Section","Plan Cut","Back Plate"], component: <DrawGFRCSection/> },
      { title: "ADJUSTABLE BRACKET & ANCHOR", subtitle: "Vertical Section — Connection Detail", sheet: "GF-02", scale: "1:2", tags: ["Detail","Anchor","Cast-In Channel"], component: <DrawGFRCDetail/> },
    ],
    gfrp: [
      { title: "Z-PROFILE RAIL SYSTEM", subtitle: "Horizontal Section — Plan Cut", sheet: "FP-01", scale: "1:10", tags: ["Horizontal Section","Z-Rail","Open Joint"], component: <DrawGFRPSection/> },
      { title: "SPRING CLIP CONNECTION", subtitle: "Detail — Panel Edge to Rail", sheet: "FP-02", scale: "1:2", tags: ["Detail","Clip","Panel Edge"], component: <DrawGFRPDetail/> },
    ],
    aluminum: [
      { title: "CASSETTE RAINSCREEN SYSTEM", subtitle: "Horizontal Section — Plan Cut", sheet: "AL-01", scale: "1:10", tags: ["Horizontal Section","Cassette","Hook Bearer"], component: <DrawAlumSection/> },
      { title: "UNITIZED CURTAIN WALL — MULLION", subtitle: "Horizontal Section — Mullion Junction", sheet: "AL-02", scale: "1:5", tags: ["Section","Mullion","DGU","Thermal Break"], component: <DrawAlumDetail/> },
    ],
    stone: [
      { title: "OPEN JOINT VENTILATED FACADE", subtitle: "Horizontal Section — Plan Cut", sheet: "ST-01", scale: "1:10", tags: ["Horizontal Section","Open Joint","Kerf Clip"], component: <DrawStoneSection/> },
      { title: "UNDERCUT ANCHOR DETAIL", subtitle: "Vertical Section + Detail A", sheet: "ST-02", scale: "1:2", tags: ["Detail","Undercut","CNC","316 SS"], component: <DrawStoneDetail/> },
    ],
  };

  const currentDrawing = drawings[activeSystem][activeIdx];
  const meta = systemMeta[activeSystem];

  const generateNote = async () => {
    setLoadingNote(true);
    setAiNote("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are an expert facade engineer providing concise technical annotation notes for engineering drawings. Provide 3-4 bullet points of critical installation notes, tolerances, and inspection points for the specified drawing. Be specific with numbers. Use engineering notation.",
          messages: [{ role: "user", content: `Generate technical installation notes for drawing: ${currentDrawing.title} (${currentDrawing.subtitle}) — Scale ${currentDrawing.scale}. Material system: ${activeSystem.toUpperCase()}. Sheet: ${currentDrawing.sheet}. Tags: ${currentDrawing.tags.join(', ')}.` }],
        }),
      });
      const data = await response.json();
      setAiNote(data.content?.map(b => b.text || "").join("") || "");
    } catch { setAiNote("Unable to generate notes. Please try again."); }
    setLoadingNote(false);
  };

  return (
    <div className="page">
      <style>{`
        .bp-sys-tabs { display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap; }
        .bp-sys-tab { display:flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; cursor:pointer; border:1px solid var(--border); transition:all 0.2s; font-family:var(--font-display); font-size:15px; font-weight:700; letter-spacing:2px; color:var(--text2); }
        .bp-sys-tab:hover, .bp-sys-tab.active { border-color:var(--tab-color); background:var(--tab-bg); color:var(--tab-accent); }
        .bp-drawing-list { display:flex; gap:12px; margin-bottom:20px; }
        .bp-drawing-item { flex:1; background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:14px 16px; cursor:pointer; transition:all 0.2s; }
        .bp-drawing-item:hover, .bp-drawing-item.active { border-color:var(--dw-color); background:var(--bg3); }
        .bp-drawing-item.active .bp-dw-title { color:var(--dw-accent); }
        .bp-dw-sheet { font-family:var(--font-mono); font-size:9px; letter-spacing:3px; color:var(--text3); margin-bottom:5px; }
        .bp-dw-title { font-family:var(--font-display); font-size:15px; font-weight:700; letter-spacing:1px; color:var(--text2); margin-bottom:3px; transition:color 0.2s; }
        .bp-dw-sub { font-size:11px; color:var(--text3); }
        .bp-dw-scale { font-family:var(--font-mono); font-size:10px; color:var(--text3); margin-top:6px; }
        .bp-dw-tags { display:flex; flex-wrap:wrap; gap:4px; margin-top:8px; }
        .bp-dw-tag { font-family:var(--font-mono); font-size:8.5px; background:var(--bg); border:1px solid var(--border); color:var(--text3); padding:2px 7px; border-radius:3px; }
        .bp-viewer { background:var(--bg2); border:1px solid var(--border); border-radius:12px; overflow:hidden; }
        .bp-viewer-header { display:flex; align-items:center; justify-content:space-between; padding:14px 20px; border-bottom:1px solid var(--border); }
        .bp-viewer-title { font-family:var(--font-display); font-size:18px; font-weight:700; letter-spacing:2px; }
        .bp-viewer-meta { display:flex; gap:10px; align-items:center; }
        .bp-viewer-sheet { font-family:var(--font-mono); font-size:10px; background:var(--gold)22; color:var(--gold); border:1px solid var(--gold)44; padding:4px 10px; border-radius:4px; }
        .bp-viewer-scale { font-family:var(--font-mono); font-size:10px; color:var(--text3); }
        .bp-svg-wrap { padding:16px; background:#0A1520; }
        .bp-ai-notes { padding:16px 20px; border-top:1px solid var(--border); background:var(--bg3); }
        .bp-ai-notes-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
        .bp-ai-notes-label { font-family:var(--font-mono); font-size:10px; letter-spacing:2px; color:var(--text3); display:flex; align-items:center; gap:6px; }
        .bp-gen-btn { background:var(--bg2); border:1px solid var(--border); color:var(--text2); font-family:var(--font-mono); font-size:10px; letter-spacing:2px; padding:6px 14px; border-radius:5px; cursor:pointer; transition:all 0.2s; }
        .bp-gen-btn:hover { border-color:var(--gold); color:var(--gold); }
        .bp-notes-content { font-size:12px; color:var(--text2); line-height:1.8; }
        .bp-notes-content strong { color:var(--gold); }
        .bp-legend { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin-top:20px; background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:16px 20px; }
        .bp-legend-item { display:flex; align-items:center; gap:8px; font-size:11px; color:var(--text2); }
        .bp-legend-swatch { width:28px; height:14px; border-radius:3px; flex-shrink:0; }
      `}</style>

      <div className="page-hero">
        <div className="page-title">BLUEPRINTS & <span>TECHNICAL DRAWINGS</span></div>
        <div className="page-subtitle">Engineering-grade installation sections, fixing details, and connection drawings for all four cladding systems. AI-generated technical notes on demand.</div>
      </div>

      {/* Material system tabs */}
      <div className="bp-sys-tabs">
        {MATERIALS.map(mat => (
          <div
            key={mat.id}
            className={`bp-sys-tab ${activeSystem === mat.id ? "active" : ""}`}
            style={{ "--tab-color": mat.color, "--tab-bg": mat.color + "18", "--tab-accent": mat.accent }}
            onClick={() => { setActiveSystem(mat.id); setActiveIdx(0); setAiNote(""); }}
          >
            <span style={{fontSize:18}}>{mat.icon}</span>
            {mat.name}
          </div>
        ))}
      </div>

      {/* Drawing selector */}
      <div className="bp-drawing-list">
        {drawings[activeSystem].map((d, i) => (
          <div
            key={d.sheet}
            className={`bp-drawing-item ${activeIdx === i ? "active" : ""}`}
            style={{ "--dw-color": meta.color, "--dw-accent": meta.accent }}
            onClick={() => { setActiveIdx(i); setAiNote(""); }}
          >
            <div className="bp-dw-sheet">SHEET {d.sheet}</div>
            <div className="bp-dw-title">{d.title}</div>
            <div className="bp-dw-sub">{d.subtitle}</div>
            <div className="bp-dw-scale">SCALE {d.scale}</div>
            <div className="bp-dw-tags">
              {d.tags.map(t => <span key={t} className="bp-dw-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Drawing viewer */}
      <div className="bp-viewer">
        <div className="bp-viewer-header">
          <div className="bp-viewer-title" style={{color: meta.accent}}>{currentDrawing.title}</div>
          <div className="bp-viewer-meta">
            <span className="bp-viewer-scale">{currentDrawing.subtitle}</span>
            <span className="bp-viewer-sheet">{currentDrawing.sheet}</span>
            <span className="bp-viewer-scale">SCALE {currentDrawing.scale}</span>
          </div>
        </div>
        <div className="bp-svg-wrap">
          {currentDrawing.component}
        </div>
        {/* AI Technical Notes */}
        <div className="bp-ai-notes">
          <div className="bp-ai-notes-header">
            <div className="bp-ai-notes-label">
              <span style={{width:7,height:7,borderRadius:"50%",background:loadingNote?"#F0A030":"#5A9A7A",display:"inline-block"}}></span>
              AI TECHNICAL INSTALLATION NOTES
            </div>
            <button className="bp-gen-btn" onClick={generateNote} disabled={loadingNote}>
              {loadingNote ? "GENERATING···" : "⟳ GENERATE NOTES FOR THIS DRAWING"}
            </button>
          </div>
          {aiNote ? (
            <div className="bp-notes-content" dangerouslySetInnerHTML={{__html: aiNote
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/^[•\-] (.*?)$/gm, '<div style="padding:3px 0 3px 0;color:var(--text2)">▸ $1</div>')
              .replace(/\n/g, '<br/>')
            }}/>
          ) : (
            <div style={{color:"var(--text3)",fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:1}}>
              Click "Generate Notes" to produce AI-driven technical installation guidance, tolerances, and inspection requirements specific to this drawing.
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="bp-legend">
        {[
          { color: "#162232", hatch: true, label: "Reinforced Concrete" },
          { color: "#0F2420", label: "Mineral Wool Insulation" },
          { color: "#15303A", label: "GFRC Panel" },
          { color: "#1A2818", label: "Stone / GFRP Panel" },
          { color: "#1E4870", label: "Aluminum / Steel Section" },
          { color: "#2A5878", label: "Stainless Steel 316" },
          { color: "#0A1420", label: "Air Cavity / Joint" },
          { color: "#FFD166", label: "Dimension Lines" },
          { color: "#5AB870", label: "Vapor Control Layer" },
          { color: "#E0A030", label: "Detail Callout / Kerf" },
        ].map(item => (
          <div key={item.label} className="bp-legend-item">
            <div className="bp-legend-swatch" style={{background:item.color, border:"1px solid #2A4060"}}></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
