import { useState, useMemo, useCallback, useRef } from "react";
const G="#D4A853",Gd="#8B7335",Gf="#5A4D2E",BG="#0D0C0A",SF="#141210",BD="#252117";
const CS=["Forgiveness","Deen & Sincerity","Protection","Speech & Confidence","Character & Discipline","Career & Building","Wealth & Provision","Marriage & Family","Health & Fitness","Dream Life & Legacy","Ummah & Justice","Worldview & Consciousness","Akhirah"];
const HT=[
{t:"The Core Tension",q:"Where am I still split between dunya and akhirah?",c:"You do not want a shallow life. You want dunya — but not empty dunya. You want success, money, beauty, strong work, a good home, meaningful projects, a family, and a respected life — but you want all of it to be clean, halal, sincere, and worth something in front of Allah. You carry a constant tension between wanting to build and win in the world, and fearing becoming distracted, ego-driven, numb, performative, or spiritually hollow. This is not a weakness. This tension is your compass. The day you stop feeling it is the day you should worry."},
{t:"Sincerity in Worship",q:"Is my worship changing me, or just checking a box?",c:"You want the real thing — closeness to Allah, obedience, consistency, humility, and acceptance. You fear your salah becoming robotic, your deen becoming identity without substance, and your worship becoming performance. You don't want to be someone who posts Islamic quotes but doesn't pray on time. You don't want to look religious without being transformed by religion. You want worship that rewires your character — that makes you more patient in traffic, more honest in business, more gentle with your wife, more humble in success."},
{t:"Fear of Wasted Potential",q:"Am I becoming who I was supposed to become?",c:"You fear dying while attached to dunya. You fear arriving on the Day of Judgment with a life that looked productive but lacked depth. You fear being capable of more but failing to act — paralyzed by overthinking, scattered by distractions, delayed by comfort. You fear being swallowed by modern habits and noise — endless scrolling, passive consumption, dopamine loops. You fear leaving behind potential instead of impact. You fear that the gap between who you are and who you could be will be the thing you regret most when it's too late to close it."},
{t:"Building with Purpose",q:"Does my work serve something greater than my bank account?",c:"A huge part of you wants to build — not just have a job. Build. You want work that is independent, scalable, ethical, intelligent, creative, useful, respected, and financially meaningful. You hate sketchy practices. You want to make money in a way that feels principled — halal in source, barakah in outcome. You want Sahara Delights, Hibachi Blue, Ek Cup Chai, MazayKaMatcha to be more than businesses. You want them to be contributions. Products that nourish, experiences that elevate, brands that carry meaning. You want to look at your work and know it reflects something true about you."},
{t:"Confidence & Speech",q:"When was the last time I said exactly what I meant?",c:"You struggle with confidence, especially when speaking and expressing your thoughts. You fear being disliked, fear sounding argumentative, shut down when intimidated, soften your words too much, use filler words, circle around the point instead of landing on it. But inside you, there is a person with clear, sharp, grounded thoughts — someone who knows exactly what he thinks. The gap between your inner clarity and your outer expression is where the frustration lives. You want speech that is firm but gracious, confident but humble, precise but warm. You want to be someone whose words carry weight."},
{t:"The Ideal Life",q:"What would it look like if everything aligned?",c:"A life of beauty, peace, barakah, control, dignity, and meaningful work. A thoughtfully designed home — calm, ordered, elegant, filled with warmth and personality. Physical spaces with natural light, good materials, and intentional objects. Enough wealth to feel free and generous — to give without counting, to support your parents, to invest without anxiety. Strong family life. Good health and energy. Creative work that is respected and aligned with your values. Less dependence on broken systems. The freedom to choose your life, not just react to it. Not random luxury — thoughtful luxury. Beauty with meaning. Comfort with restraint. Elegance with soul."},
{t:"Marriage & Legacy",q:"What kind of home am I building — not the structure, but the spirit?",c:"You want love with mercy, softness, and emotional safety. You want a marriage that is not transactional or functional but deeply connected — where vulnerability is safe, where growth is mutual, where both of you are becoming better versions of yourselves together. You want a peaceful home rooted in deen and warmth. Righteous children who love Allah without being forced. Leading without harshness. Providing well. Being emotionally present, not just physically there. You want to take care of your parents — honoring the sacrifices they made, making them proud. You want to build a lineage that is better, stronger, and more conscious than what came before."},
{t:"Justice & the Ummah",q:"What am I doing with my comfort while others have none?",c:"Grief over Palestine sits heavy in your heart. Concern for the oppressed in Sudan, Congo, and every forgotten corner where Muslims bleed without headlines. You feel the frustration of watching systems of power operate unchecked — propaganda twisting truth, media erasing victims, the world scrolling past genocide and returning to entertainment. You want your success to serve more than just yourself. You want your money, your platform, your voice to mean something for the Ummah. You don't want to be comfortable while your brothers and sisters have no comfort at all. You don't want to become numb. Numbness is the real danger."},
{t:"Discipline & Character",q:"What would my life look like if I actually executed what I already know?",c:"You care deeply about discipline but feel frustrated with scattered attention, inconsistency, delay, overthinking, and the painful gap between what you know and what you execute. You know what to do — you just don't always do it. You want honorable presence without arrogance. Patience in relationships, in business, in personal growth, in waiting on Allah's timing. You want to be the kind of man who follows through — who says he'll do something and does it, who starts something and finishes it, who shows up the same way on day 100 as day 1. You want your character to match your ambition."},
{t:"The Deepest Hope",q:"If Allah granted everything in your heart right now — what would it look like?",c:"Allah is pleased with you. Your life has barakah — not just money, but meaning in every corner. Your work benefits people and is counted as good. Your home is peaceful and full of mercy. Your marriage deepens in love, respect, and tranquility with every passing year. Your children are righteous and beautiful in character — they love their deen, they honor their parents, they make the world better. You become more disciplined, focused, and clear. Your speech becomes strong and sincere. Your wealth is halal, expansive, and generous. You build something real and lasting. You live with integrity. You die in a state that Allah loves. You enter Jannatul Firdaus by His mercy — with your family beside you, forever."},
];
const D=[
[0,"Allah","God","Akhirah","The greatest Name encompassing all attributes — the one and only deity worthy of worship.","Ya Allah, I ask You by every Name You have named Yourself to make the end of my life the best of it, and the best of my days the day I meet You. Let me not be someone who built in this world but arrived bankrupt in the next. Let my final breath be one of iman, my grave a garden, and my destination Jannatul Firdaus — not because I earned it, but because Your mercy carried me."],
[1,"Ar-Rahman","The All-Compassionate","Marriage & Family","His mercy is vast and universal — extending to every creature. The womb (rahim) derives from the same root.","Ya Rahman, cover my marriage with compassion. Let mercy be our foundation — not ego, not scorekeeping. Make me a husband whose compassion mirrors Your standard: patient when she is tired, gentle when she is emotional, steady when things are hard. And bless my parents with comfort and joy."],
[2,"Ar-Raheem","The Most Merciful","Marriage & Family","His special, intimate mercy reserved for believers — guiding back when you stray, softening hearts.","Ya Raheem, be merciful in how my marriage grows — through growing pains, misunderstandings, seasons where we're both stretched thin. And when we have children, let them be born into mercy — raised with softness and strength, connected to their deen."],
[3,"Al-Malik","The King","Dream Life & Legacy","The absolute ruler whose sovereignty is total and eternal. Everything you possess belongs to Him.","Ya Malik, grant me a life that feels intentional rather than chaotic. A life of dignity, freedom, and barakah. I don't want a flashy life — I want beauty with meaning, comfort with restraint, elegance with soul."],
[4,"Al-Quddus","The Most Holy","Deen & Sincerity","Absolutely pure — free from every flaw. Only the Pure can purify.","Ya Quddus, purify my worship. I don't want robotic salah. I want salah that changes me. Purify my intentions in everything. Remove the parts of my worship that are for show and leave only what is for You."],
[5,"As-Salam","The Source of Peace","Protection","The origin of all peace and security. Peace is found in proximity to Him.","Ya Salam, grant me real peace — not the fake peace of numbing myself with content. Peace in my home, my marriage, my mind when it races at night. Protect me from inner chaos and restlessness."],
[6,"Al-Mu'min","The Inspirer of Faith","Deen & Sincerity","He grants security, confirms truth, and inspires faith.","Ya Mu'min, strengthen my iman when it dips. Protect me from numbness. Let my faith not be seasonal but steady and rooted. When the world normalizes haram — keep my iman unshaken."],
[7,"Al-Muhaymin","The Guardian","Protection","He watches over all things with complete authority. Nothing escapes His care.","Ya Muhaymin, guard my heart from attachment to status or revenue milestones. Guard my family from unseen harm. Guard my businesses from the evil eye. Guard my marriage from the erosion of stress. Be the Guardian over everything I love."],
[8,"Al-Aziz","The Almighty","Ummah & Justice","All might paired with wisdom. Every empire that oppressed crumbled before Him.","Ya Aziz, grant victory to the people of Palestine. Strengthen the Muslims of Sudan, Congo, and every land where our brothers and sisters suffer. Show Your might. Break the systems that profit from their suffering. Do not let me become numb."],
[9,"Al-Jabbar","The Restorer","Ummah & Justice","He compels creation to His will and mends what is broken. 'Jabr' means to set a broken bone.","Ya Jabbar, restore Palestine. Restore the homes destroyed, families torn apart, childhoods stolen. And restore my own heart from cynicism. Compel the oppressors to face Your justice."],
[10,"Al-Mutakabbir","The Supreme","Character & Discipline","All greatness belongs exclusively to Him. Pride is His garment alone.","Ya Mutakabbir, strip away any arrogance I haven't caught yet. I want to be confident, not cocky. When my businesses succeed — don't let it go to my head. Humble me gently before You humble me publicly."],
[11,"Al-Khaliq","The Creator","Career & Building","He brought everything from nothing. Your ability to create is borrowed light.","Ya Khaliq, You gave me the mind to build Sahara Delights, envision Hibachi Blue, dream up Ek Cup Chai and MazayKaMatcha. Let my creations carry Your barakah. Never let me forget my ability to create is borrowed from You."],
[12,"Al-Bari'","The Originator","Career & Building","He creates all beings with distinct form, free from prior model.","Ya Bari', give me the courage to originate. Let Sahara Delights reflect something no other brand does — the story of Jericho, the craft, the intention. Let my work be unmistakably mine and unmistakably blessed."],
[13,"Al-Musawwir","The Fashioner","Career & Building","The divine Designer. Your eye for beauty traces back to Him.","Ya Musawwir, I care about aesthetics — in packaging, menus, product presentation. Let my sense of design come from You, not trends. Let form and function meet in everything I make."],
[14,"Al-Ghaffar","The Repeatedly Forgiving","Forgiveness","He forgives again and again with no limit. The door is never locked.","Ya Ghaffar, I keep falling short and You keep the door open. Forgive me again for sins committed knowingly and in ignorance. Do not let my familiarity with Your mercy make me careless with Your boundaries."],
[15,"Al-Qahhar","The Subduer","Ummah & Justice","He prevails with irresistible power. Every tyrant is subdued before Him.","Ya Qahhar, subdue every tyrant who bombs children and profits from starvation. Subdue the propaganda that twists truth. And subdue the part of my nafs that wants to look away. Keep me disturbed, and let that disturbance move me."],
[16,"Al-Wahhab","The Bestower","Wealth & Provision","He gives abundantly, freely, without expecting return.","Ya Wahhab, bestow wealth that is clean — halal in how I earn it, barakah in how I spend it. I don't want scammy money. Bestow the kind that lets me take care of my parents, support my wife, and sleep peacefully."],
[17,"Ar-Razzaq","The Provider","Wealth & Provision","The ultimate Provider. He provides before you ask, through doors you didn't knock on.","Ya Razzaq, provide for me in ways I haven't imagined. Open doors of rizq I didn't knock on. Bring customers to my products. And sustain my iman, energy, and hope when the numbers are slow."],
[18,"Al-Fattah","The Opener","Speech & Confidence","He opens what is closed — doors of mercy, provision, tongues.","Ya Fattah, open my tongue. I struggle to say what I mean with force and clarity. Open the doors of eloquence for me. Open my ability to communicate vision. And open my mouth in Your remembrance."],
[19,"Al-'Aleem","The All-Knowing","Worldview & Consciousness","His knowledge encompasses everything. Every human ideology is partial before Him.","Ya 'Aleem, give me knowledge that cuts through propaganda and noise. Give me knowledge rooted in revelation, tested by experience. Let me not absorb norms without questioning them."],
[20,"Al-Qabid","The Restrainer","Worldview & Consciousness","He constricts by wisdom. Sometimes tightness is a divine redirect.","Ya Qabid, restrain me from consuming what is not good for me — content that wastes time, habits that dull my sensitivity to You. Restrain my appetite for dopamine and scrolling."],
[21,"Al-Basit","The Expander","Speech & Confidence","He expands provision, hearts, and confidence. Your capacity for expression is not fixed.","Ya Basit, expand my confidence. I shrink in rooms where I should stand tall. Expand my chest, ease my anxiety. Expand my capacity to be seen and heard — because the work I do deserves a matching voice."],
[22,"Al-Khafid","The Humbler","Character & Discipline","He lowers whoever He wills. Ask to be humbled gently in private.","Ya Khafid, humble me in private so You don't have to publicly. Ego is my biggest threat — it shows up subtly. I would rather be humbled by my own reflection than by a fall."],
[23,"Ar-Rafi'","The Exalter","Character & Discipline","He raises in rank and honor. True elevation comes from Him alone.","Ya Rafi', elevate me in the ways that matter. Not just revenue — but in Your sight. Raise my character, patience, discipline. Let me never be raised in dunya while sinking in akhirah."],
[24,"Al-Mu'izz","The Giver of Honor","Character & Discipline","True honor comes from Allah alone.","Ya Mu'izz, I have chased validation from clients, social media, family expectations — and it never satisfies. Grant me the honor that comes from obeying You when it's hard, speaking truth when it's unpopular."],
[25,"Al-Mudhill","Giver of Disgrace","Character & Discipline","He strips honor from whoever persists in arrogance or hypocrisy.","Ya Mudhill, I seek refuge from disgrace — being exposed for hypocrisy, being successful in public and empty in private. If I am heading toward disgrace, stop me. Break my ego before You break my reputation."],
[26,"As-Samee'","The All-Hearing","Speech & Confidence","He hears every whispered du'a, every cry, every unspoken thought.","Ya Samee', You hear every word I say and swallow. Help me speak with precision. When I speak truth others don't want to hear, give me courage — knowing You heard me."],
[27,"Al-Baseer","The All-Seeing","Worldview & Consciousness","He sees everything — the tears you cry alone, the sincerity behind the struggle.","Ya Baseer, open my eyes to what matters and close them to what distracts. Let me see clearly enough to build with purpose and live without delusion."],
[28,"Al-Hakam","The Judge","Ummah & Justice","The ultimate Judge whose verdict is final.","Ya Hakam, on Judgment Day every oppressor will stand before You with no army, no propaganda. Judge them with Your justice. And judge me — for my silence when I should have spoken."],
[29,"Al-'Adl","The Just","Ummah & Justice","Perfect justice. He does not wrong anyone by an atom's weight.","Ya 'Adl, I believe in Your justice even when the world's courts fail. Grant justice to Palestine, Sudan, Congo. Make me an instrument of justice through my money, voice, and refusal to be silent."],
[30,"Al-Lateef","The Subtle","Marriage & Family","His kindness reaches you through invisible pathways.","Ya Lateef, place hidden blessings in my marriage — small moments that prevent bigger cracks. Place subtle protection around my family. You arrange things behind the scenes with a gentleness we only notice when we look back."],
[31,"Al-Khabeer","The All-Aware","Worldview & Consciousness","He knows the inner reality of everything — every hidden motive.","Ya Khabeer, make me aware of traps I don't see — cultural assimilation eroding Islamic identity, productivity culture making rest sinful, hustle content glorifying burnout. Keep me thinking."],
[32,"Al-Haleem","The Forbearing","Forgiveness","He does not rush to punish. Supreme power restrained by supreme mercy.","Ya Haleem, You gave me time when I wasted time. Keep being forbearing with me while I try to become better. Don't give up on me the way I sometimes give up on myself."],
[33,"Al-'Adheem","The Magnificent","Character & Discipline","Incomprehensible greatness. When you feel His greatness, human opinions become very small.","Ya 'Adheem, make me someone in awe of Your greatness so deeply that people's opinions become small. Let my primary audience be You."],
[34,"Al-Ghafoor","The All-Forgiving","Forgiveness","He covers sins completely. Your past does not define your future.","Ya Ghafoor, don't just forgive — cover them. Conceal the shameful moments. I carry regret over wasted potential and prayers I rushed. Erase it all because You are Al-Ghafoor."],
[35,"Ash-Shakoor","The Appreciative","Deen & Sincerity","He multiplies the smallest good deeds. Nothing is too small.","Ya Shakoor, appreciate the small things I do for Your sake. Don't let me belittle the little I do, and don't let me be satisfied with it either."],
[36,"Al-'Aliyy","The Most High","Dream Life & Legacy","Above all creation. Stop placing money or opinions on pedestals.","Ya 'Aliyy, elevate my life in a way that reflects Your favor. Let my standard of living rise because my standard of worship rose first."],
[37,"Al-Kabeer","The Most Great","Dream Life & Legacy","He didn't give you ambition just to live on autopilot.","Ya Kabeer, don't let me settle for a small life. You did not wire me for mediocrity. Give me the courage to live at the scale of the potential You placed inside me."],
[38,"Al-Hafeez","The Preserver","Protection","He is holding it all in place when everything feels fragile.","Ya Hafeez, preserve my iman, my marriage, my health, Sahara Delights. Preserve the good in me — the sensitivity, the depth. Preserve my sincerity most of all."],
[39,"Al-Muqeet","The Nourisher","Wealth & Provision","He nourishes the seed underground before it breaks soil.","Ya Muqeet, nourish my businesses the way You nourish every living thing. And nourish me — the founder behind it all — with energy, clarity, and barakah."],
[40,"Al-Haseeb","The Reckoner","Worldview & Consciousness","Both accountability and sufficiency.","Ya Haseeb, I fear a life full of activity but empty of purpose. Let the reckoning push me to be more intentional today — not tomorrow."],
[41,"Al-Jaleel","The Majestic","Speech & Confidence","Presence that commands awe without a word.","Ya Jaleel, give me presence that commands respect without arrogance. Not loudness — presence. Not dominance — gravity. Let my composure reflect someone who knows Whose he is."],
[42,"Al-Kareem","The Most Generous","Wealth & Provision","He gives before you ask, more than you deserve. He cannot not give.","Ya Kareem, be generous with me in provision, opportunity, and barakah. Be generous in granting financial freedom so I can think about legacy instead of scarcity. And make me generous too."],
[43,"Ar-Raqeeb","The Watchful","Protection","He watches for accountability through ihsan, not punishment.","Ya Raqeeb, You see when I waste time, delay prayer. Let the awareness of Your watching make me more honest — not anxious, but accountable."],
[44,"Al-Mujeeb","The Responsive","Marriage & Family","He answers every call — sometimes differently than expected.","Ya Mujeeb, respond to my silent du'as — for a beautiful home, righteous children, a deepening marriage, parents who live to see the fruit of what they planted in me."],
[45,"Al-Wasi'","The Vast","Wealth & Provision","His provision has no ceiling. What He set aside for you cannot be taken.","Ya Wasi', remove the scarcity mindset from my heart. Expand my belief. Let me build with confidence that Your rizq has no ceiling."],
[46,"Al-Hakeem","The All-Wise","Character & Discipline","Everything with perfect wisdom. Every delay has a purpose.","Ya Hakeem, give me wisdom to match my ambition — to know when to speak, when to wait, when to invest, when to surrender to Your plan."],
[47,"Al-Wadud","The Most Loving","Deen & Sincerity","He loves deeply, actively, personally.","Ya Wadud, I want You to love me. Not just tolerate me — love me. Make me someone You love by making me someone who loves what You love — truth, justice, sincerity, and worship that is alive."],
[48,"Al-Majeed","The All-Glorious","Speech & Confidence","Supreme glory with supreme generosity. The right thing at the right time.","Ya Majeed, let my words carry weight. When I pitch my businesses, let people listen because what I say is worth hearing. Remove the hedging. Replace it with firmness and grace."],
[49,"Al-Ba'ith","The Resurrector","Akhirah","He will raise every soul. What will you be raised with?","Ya Ba'ith, You will raise me with everything exposed. Let me rise among the righteous. Let my resurrection be eternal relief, not eternal regret."],
[50,"Ash-Shaheed","The Witness","Akhirah","He witnesses all things. For the one who feels unseen — nothing was wasted.","Ya Shaheed, You witnessed every moment I chose You and every moment I chose my nafs. Be my witness that I tried — imperfectly — but I tried to turn back to You."],
[51,"Al-Haqq","The Truth","Akhirah","The absolute Truth. Build on truth and it stands forever.","Ya Haqq, when everything false falls away on Judgment Day, let what remains of me be true. Make me true in worship, work, speech, and love for You."],
[52,"Al-Wakeel","The Trustee","Career & Building","The spreadsheet is yours. The outcome is His.","Ya Wakeel, I hand my businesses over to You. I've done the work. But the outcome is Yours. When things fail — handle what I cannot. I trust You with the results."],
[53,"Al-Qawiyy","The All-Strong","Health & Fitness","Absolute strength that never diminishes.","Ya Qawiyy, grant me physical strength for my ambitions. Make me strong — not for vanity, but function. Remove the sluggishness. Replace it with energy and capability."],
[54,"Al-Mateen","The Steadfast","Health & Fitness","Firm, unwavering. Consistency is a gift from the eternally consistent.","Ya Mateen, make my health firm and steadfast. I want sustained energy, not bursts then burnout. My body is an amanah — help me treat it like one."],
[55,"Al-Waliyy","The Protecting Friend","Protection","The close ally of believers. More invested in your success than you are.","Ya Waliyy, be my ally when the world feels isolating. Protect me from bad company. Surround me with people who sharpen my deen and my drive."],
[56,"Al-Hameed","The All-Praiseworthy","Speech & Confidence","The most powerful thing you can say is praise of Him.","Ya Hameed, make my speech praise You naturally — from genuine gratitude. When people ask about my success, let my first instinct be to credit You."],
[57,"Al-Muhsi","The Accounter","Health & Fitness","He counts everything. Your effort matters. Every rep counts.","Ya Muhsi, help me be intentional about what I put into my body. Am I using it for worship and productivity — or wasting it drained by screens?"],
[58,"Al-Mubdi'","The Originator","Career & Building","He creates from nothing. If the idea is in your heart, originate it.","Ya Mubdi', bless me with original ideas. Let me originate things that make people say, 'This is different.' Let originality flow because You inspired it."],
[59,"Al-Mu'id","The Restorer","Career & Building","Nothing is permanently lost. The dream that died can be resurrected.","Ya Mu'id, restore the time I wasted, the confidence I lost, the momentum that slowed. Restore what deserves to be revived, or replace it with something better."],
[60,"Al-Muhyi","The Giver of Life","Marriage & Family","He makes dead things live again.","Ya Muhyi, bless my marriage with children — righteous, healthy, connected to You from their first breath. And give life to the love between us — let it keep growing deeper."],
[61,"Al-Mumit","The Bringer of Death","Worldview & Consciousness","Death strips illusions of permanence. Live with urgency.","Ya Mumit, death won't ask about my Shopify revenue. It will ask about my salah, sincerity, and heart. Let the awareness of death make me more urgent in obedience."],
[62,"Al-Hayy","The Ever-Living","Akhirah","He will never die. You will. Build with purpose, not attachment.","Ya Hayy, remind me daily I will leave everything behind. Let my work be sadaqah jariyah. When my life ends, let it end in a state You love."],
[63,"Al-Qayyum","The Self-Subsisting","Character & Discipline","You are not the sustainer. He is.","Ya Qayyum, I try to sustain everything myself and burn out. Remind me I am the servant, not the sustainer. You are carrying it — I am just doing my part."],
[64,"Al-Wajid","The Finder","Wealth & Provision","He finds the solution before you see the problem.","Ya Wajid, help me find what I need — the right suppliers, markets, partners, kitchen, opportunities for Sahara Delights to scale. Lead me to what I'm searching for."],
[65,"Al-Majid","The Illustrious","Dream Life & Legacy","An illustrious life is measured in sincerity, not followers.","Ya Majid, let my life tell a story of substance. When my children look back, let them see someone who built with integrity and worshipped with sincerity."],
[66,"Al-Wahid","The Unique","Marriage & Family","Let my family reflect something rare and intentional.","Ya Wahid, let our family be unique — a household that worships You together and produces human beings who make the world better."],
[67,"Al-Ahad","The Indivisible","Deen & Sincerity","Stop serving multiple gods. Serve the One.","Ya Ahad, I feel divided. Unify my purpose. Let everything I do serve one Master. Remove the division in my heart."],
[68,"As-Samad","The Self-Sufficient","Deen & Sincerity","Everything depends on Him. Turn to Him first.","Ya Samad, teach me to turn to You before strategies, mentors, or Google. Make me someone who relies on You as the first and only resort."],
[69,"Al-Qadir","The All-Powerful","Health & Fitness","He created galaxies. Don't limit your du'a.","Ya Qadir, if You can create galaxies, You can strengthen my frame, clear my skin, sharpen my mind. Give me a body that reflects self-discipline."],
[70,"Al-Muqtadir","The All-Determiner","Career & Building","The Determiner is not the algorithm.","Ya Muqtadir, You determine what converts and what stalls. Let my effort be excellent and my trust in You total."],
[71,"Al-Muqaddim","The Expediter","Speech & Confidence","He puts the right words in your mouth at the right moment.","Ya Muqaddim, in negotiations and difficult talks — put the right words in my mouth at the right moment. Close the gap between my ideas and my articulation."],
[72,"Al-Mu'akhkhir","The Delayer","Health & Fitness","Sometimes reflecting your own procrastination back at you.","Ya Mu'akhkhir, delay illness approaching my family. And if I have been delaying my own health — break that cycle. Let me prioritize health now."],
[73,"Al-Awwal","The First","Health & Fitness","If health is the foundation, it must come first.","Ya Awwal, let me put health first, before it becomes a crisis. Make health the first thing I invest in each morning."],
[74,"Al-Akhir","The Last","Akhirah","The only thing that matters is how you arrive at the endpoint.","Ya Akhir, when I feel pressure to rush, remind me You are the endpoint. Calm my anxiety about timelines. I just need to be heading toward You."],
[75,"Adh-Dhahir","The Manifest","Career & Building","What is hidden will become manifest when He decides.","Ya Dhahir, make the work I do manifest in results. Let the quiet years of grinding become visible in revenue, recognition, and impact."],
[76,"Al-Batin","The Hidden","Protection","He sees the hidden things inside you.","Ya Batin, purify what is hidden in me. Remove heart diseases I don't know exist. Let my inner world be as clean as the image I present."],
[77,"Al-Wali","The Patron","Protection","For the one juggling everything alone — He manages what you cannot.","Ya Wali, govern my affairs when they become too complex. Be my patron. Direct my decisions. Manage what I cannot manage."],
[78,"Al-Muta'ali","Supremely Exalted","Dream Life & Legacy","Live above the things that pull you down.","Ya Muta'ali, lift me above the noise, trends, algorithms, comparison. I want a life exalted in quality, intention, and consciousness."],
[79,"Al-Barr","Source of Goodness","Forgiveness","When you want to be good — not just successful — you reflect Al-Barr.","Ya Barr, I want to be genuinely good — not just successful. Good in a way my family feels, my children inherit. Make goodness easy for me."],
[80,"At-Tawwab","Acceptor of Repentance","Forgiveness","He turns toward you before you turn toward Him.","Ya Tawwab, I turn to You again with the same flaws. Accept my repentance. Every time I turn, turn toward me faster. Let my tawbah actually change me."],
[81,"Al-Muntaqim","The Avenger","Ummah & Justice","He avenges with perfect justice. His courtroom cannot be vetoed.","Ya Muntaqim, avenge the children of Gaza, the mothers who lost everything. Let Your justice reach them in ways no human court ever could."],
[82,"Al-'Afuww","The Pardoner","Forgiveness","He doesn't just forgive — He erases. He loves to pardon.","Ya 'Afuww, don't just forgive — erase. Wipe the record. You love to pardon, so pardon me."],
[83,"Ar-Ra'uf","The Most Kind","Forgiveness","Extreme gentleness. Active, relentless kindness.","Ya Ra'uf, be kind to me in ways I don't know to ask for. Be kind in the tests I haven't faced, the consequences I haven't realized. Be kind in what You place on my shoulders."],
[84,"Malik ul-Mulk","Owner of Sovereignty","Dream Life & Legacy","He gives kingdom and takes it. The sovereignty is always borrowed.","Ya Malik ul-Mulk, if You give me influence and a platform — I accept with responsibility. Use me. Let my success benefit the Ummah. If You withhold it, I accept that too."],
[85,"Dhul Jalali wal Ikram","Lord of Majesty & Generosity","Marriage & Family","Both majesty and generosity. Commands respect and offers warmth.","Ya Dhul Jalali wal Ikram, bless my home with both majesty and generosity. Thoughtful luxury. Beauty with meaning. Comfort with restraint."],
[86,"Al-Muqsit","The Equitable","Ummah & Justice","On Judgment Day, every atom of injustice will be corrected.","Ya Muqsit, let that promise comfort the oppressed and warn the oppressors. And remind me I too will be asked about what I did with my comfort while others suffered."],
[87,"Al-Jami'","The Gatherer","Marriage & Family","He gathers hearts and families.","Ya Jami', gather my family in goodness in this life and in Jannatul Firdaus. Gather our hearts so we are not fragmented by distractions."],
[88,"Al-Ghaniyy","The Self-Sufficient","Wealth & Provision","Completely free of need yet He provides.","Ya Ghaniyy, make me financially self-sufficient — not to hoard, but to be free. Free from debt and anxiety. Let my businesses sustain my family with surplus to give."],
[89,"Al-Mughni","The Enricher","Wealth & Provision","He enriches in every dimension. True wealth is halal income plus inner contentment.","Ya Mughni, enrich me — not just in money but contentment. Enrich my home with warmth, marriage with depth, heart with closeness to You. And yes — my bank account too."],
[90,"Al-Mani'","The Preventer","Protection","Sometimes His prevention is His greatest mercy.","Ya Mani', if there is wealth that would corrupt me — prevent it. If there is success that would distance me from You — delay it. I trust that when You prevent, You protect."],
[91,"Ad-Darr","The Afflictor","Ummah & Justice","He creates hardship with wisdom. The Ummah's suffering is not in vain.","Ya Darr, let the Ummah's suffering not be in vain. Afflict the hearts of the heedless — including mine — with enough discomfort to wake up."],
[92,"An-Nafi'","The Source of Good","Wealth & Provision","Every good thing that reaches you came from Him.","Ya Nafi', let the dates I sell nourish bodies. Let the chai bring joy. Let my businesses create jobs and contribute something real."],
[93,"An-Nur","The Light","Deen & Sincerity","He illuminates hearts, paths, and destinies.","Ya Nur, illuminate my path. Show me which venture to double down on and which to release. Put light in my heart to distinguish truth from trend, sincerity from ego."],
[94,"Al-Hadi","The Guide","Deen & Sincerity","He guides through revelation, signs, and hearts.","Ya Hadi, guide my hands when I design, my words when I pitch, my decisions at every crossroads. I don't want to follow the crowd — I want to follow You."],
[95,"Al-Badi'","The Incomparable","Career & Building","He creates without precedent.","Ya Badi', I don't want my brands to be 'just another' anything. Bless me with creative vision to make things that are incomparable — built with purpose and precision."],
[96,"Al-Baqi","The Everlasting","Akhirah","Everything you build will vanish. Only what was done for His sake will last.","Ya Baqi, let the everlasting thing about my life be my deeds, not my brand."],
[97,"Al-Warith","The Inheritor","Akhirah","You are a steward, not an owner.","Ya Warith, let me not cling to what was never mine. Let me hold with open hands. When You take them back, let me not forget the Giver."],
[98,"Ar-Rasheed","The Right Guide","Protection","There is a right path. Walk it.","Ya Rasheed, keep me on the straight path. Guide me right when I'm tempted to take shortcuts or water down principles. I want to succeed — not at the cost of my soul."],
[99,"As-Sabur","The Most Patient","Character & Discipline","The One who created time is never in a rush. Why are you?","Ya Sabur, teach me patience — with business growth, marriage, body, deen. Let me not rush or abandon something good just because it's taking longer than I planned."],
];
export default function App(){
const[tab,sT]=useState("duas");
const[srch,sS]=useState("");
const[ss,sSS]=useState(false);
const[fv,sFv]=useState(new Set());
const[fo,sFo]=useState(false);
const[md,sMd]=useState(null);
const[rm,sRm]=useState(null);
const[fc,sFc]=useState(null);
const[eh,sEh]=useState(null);
const[col,sCol]=useState(new Set());
const[fcIdx,sFcIdx]=useState(0);
const[fcFlip,sFcFlip]=useState(false);
const rfs=useRef({});
const mk=useCallback((i)=>({id:D[i][0],n:D[i][1],m:D[i][2],cat:D[i][3],ex:D[i][4],du:D[i][5]}),[]);
const all=useMemo(()=>D.map((_,i)=>mk(i)),[mk]);
const tf=useCallback((id,e)=>{e.stopPropagation();sFv(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});},[]);
const fl=useMemo(()=>{let d=all;if(srch){const q=srch.toLowerCase();d=d.filter(x=>x.n.toLowerCase().includes(q)||x.m.toLowerCase().includes(q)||x.du.toLowerCase().includes(q)||x.cat.toLowerCase().includes(q));}if(fo)d=d.filter(x=>fv.has(x.id));return d;},[srch,fo,fv,all]);
const gp=useMemo(()=>{const m={};CS.forEach(c=>{m[c]=[];});fl.forEach(d=>{if(m[d.cat])m[d.cat].push(d);});return m;},[fl]);
const scr=useCallback((c)=>{rfs.current[c]?.scrollIntoView({behavior:"smooth",block:"start"});},[]);
const rnd=useCallback(()=>all[Math.floor(Math.random()*all.length)],[all]);
const togCol=useCallback((c)=>{sCol(p=>{const n=new Set(p);n.has(c)?n.delete(c):n.add(c);return n;});},[]);
const HI=({f})=>(<svg width="16" height="16" viewBox="0 0 24 24" fill={f?G:"none"} stroke={G} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>);
const XI=()=>(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>);
const bs={fontFamily:"Georgia,serif",background:BG,color:"#E8E2D6",minHeight:"100vh"};

if(fc){return(
<div style={{...bs,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center"}}>
<button onClick={()=>sFc(null)} style={{position:"fixed",top:16,right:16,background:"none",border:"none",color:Gd,cursor:"pointer",zIndex:10,padding:8}}><XI/></button>
<div style={{maxWidth:480,width:"100%"}}>
<div style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:Gd,fontFamily:"Helvetica Neue,sans-serif",marginBottom:16}}>{fc.cat}</div>
<div style={{fontSize:22,color:G,marginTop:12}}>{"Yā "+fc.n}</div>
<div style={{fontSize:13,color:Gd,fontStyle:"italic",marginBottom:32,fontFamily:"Helvetica Neue,sans-serif",marginTop:4}}>{fc.m}</div>
<div style={{fontSize:17,lineHeight:2,color:"#C8C0B4",fontStyle:"italic",textAlign:"left"}}>{fc.du}</div>
</div>
<button onClick={()=>sFc(rnd())} style={{marginTop:40,background:"none",border:"1px solid "+BD,color:Gd,padding:"10px 24px",borderRadius:6,cursor:"pointer",fontSize:12,letterSpacing:2,fontFamily:"Helvetica Neue,sans-serif",textTransform:"uppercase"}}>Next</button>
</div>);}

const mcont=md||rm;
const mclose=()=>{sMd(null);sRm(null);};
return(
<div style={{...bs,position:"relative"}}>
<div style={{position:"fixed",inset:0,opacity:0.03,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 40px,"+G+" 40px,"+G+" 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,"+G+" 40px,"+G+" 41px)",pointerEvents:"none",zIndex:0}}/>
<div style={{position:"sticky",top:0,zIndex:50,background:"linear-gradient(180deg,"+BG+" 80%,transparent)",padding:"12px 16px 16px"}}>
<div style={{display:"flex",borderRadius:8,overflow:"hidden",border:"1px solid "+BD}}>
{["duas","names","heart"].map(t=>(<button key={t} onClick={()=>sT(t)} style={{flex:1,padding:"10px 0",background:tab===t?SF:"transparent",color:tab===t?G:Gd,border:"none",cursor:"pointer",fontSize:10,letterSpacing:2,fontFamily:"Helvetica Neue,sans-serif",textTransform:"uppercase",borderBottom:tab===t?"2px solid "+G:"2px solid transparent"}}>{t==="duas"?"Du'as":t==="names"?"99 Names":"My Heart"}</button>))}
</div>
{tab==="duas"&&ss&&(<div style={{display:"flex",alignItems:"center",gap:8,background:SF,borderRadius:8,padding:"8px 12px",border:"1px solid "+BD,marginTop:10}}>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
<input autoFocus value={srch} onChange={e=>sS(e.target.value)} placeholder="Search..." style={{flex:1,background:"none",border:"none",color:"#E8E2D6",outline:"none",fontSize:14,fontFamily:"Helvetica Neue,sans-serif"}}/>
<button onClick={()=>{sS("");sSS(false);}} style={{background:"none",border:"none",color:Gd,cursor:"pointer",fontSize:18,padding:0}}>{"×"}</button>
</div>)}
</div>

{tab==="duas"&&(<div style={{position:"relative",zIndex:1}}>
{!srch&&!fo&&(<div style={{textAlign:"center",padding:"32px 24px 50px"}}>
<div style={{fontSize:14,color:Gd,fontStyle:"italic",letterSpacing:1,marginBottom:16}}>{"Bismillāhi r-Rahmāni r-Rahīm"}</div>
<div style={{fontSize:40,color:G}}>{"اللَّهُمَّ"}</div>
<div style={{fontSize:20,color:"#E8E2D6",letterSpacing:6,textTransform:"uppercase",fontFamily:"Helvetica Neue,sans-serif",fontWeight:300,marginTop:20}}>MY DU'AS</div>
<div style={{fontSize:11,color:Gd,letterSpacing:3,textTransform:"uppercase",fontFamily:"Helvetica Neue,sans-serif",marginTop:8,lineHeight:1.8}}>{"Through the 99 Names of Allah"}</div>
<div style={{width:60,height:1,background:G,margin:"24px auto",opacity:0.4}}/>
<div style={{fontSize:15,color:"#7A7368",fontStyle:"italic",lineHeight:1.8,maxWidth:360,margin:"0 auto"}}>{"These are not recitations from a book. These are the words of a soul that is trying — building, stumbling, asking, rising. Ameen."}</div>
</div>)}
<div style={{display:"flex",justifyContent:"center",gap:12,padding:"0 16px 20px"}}>
<button onClick={()=>sSS(!ss)} style={{background:"none",border:"1px solid "+BD,color:Gd,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:10,letterSpacing:2,fontFamily:"Helvetica Neue,sans-serif",textTransform:"uppercase"}}>Search</button>
<button onClick={()=>sFo(!fo)} style={{background:fo?SF:"none",border:"1px solid "+(fo?G:BD),color:fo?G:Gd,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:10,letterSpacing:2,fontFamily:"Helvetica Neue,sans-serif",textTransform:"uppercase"}}>Favorites</button>
</div>
{!srch&&!fo&&(<div style={{padding:"0 20px 24px"}}>{CS.map((c,i)=>(<div key={c} onClick={()=>scr(c)} style={{display:"flex",alignItems:"baseline",gap:8,padding:"7px 0",borderBottom:"1px solid "+BD,cursor:"pointer"}}><span style={{fontSize:11,color:Gd,fontFamily:"Helvetica Neue,sans-serif",minWidth:28}}>{String(i+1).padStart(2,"0")+"."}</span><span style={{fontSize:13,color:Gd,fontFamily:"Helvetica Neue,sans-serif"}}>{c}</span></div>))}</div>)}
<div style={{padding:"0 16px 120px"}}>{CS.map((cat,ci)=>{const items=gp[cat];if(!items||!items.length)return null;const isCol=col.has(cat);return(
<div key={cat} ref={el=>{rfs.current[cat]=el;}} style={{marginBottom:isCol?12:40,scrollMarginTop:80}}>
<div onClick={()=>togCol(cat)} style={{position:"sticky",top:68,zIndex:40,background:BG,borderLeft:"3px solid "+G,paddingLeft:16,paddingTop:12,paddingBottom:12,marginBottom:isCol?0:16,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",paddingRight:8}}>
<div><div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:Gd,fontFamily:"Helvetica Neue,sans-serif",marginBottom:2}}>{"Category "+String(ci+1).padStart(2,"0")}</div>
<div style={{fontSize:20,color:"#E8E2D6"}}>{cat}</div></div>
<div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:11,color:Gd,fontFamily:"Helvetica Neue,sans-serif"}}>{items.length}</span><span style={{color:Gd,fontSize:14,transition:"transform 0.2s",transform:isCol?"rotate(0deg)":"rotate(180deg)"}}>{"▲"}</span></div>
</div>
{!isCol&&items.map(d=>(<div key={d.id} style={{borderLeft:"3px solid "+Gf,marginBottom:16,padding:"14px 14px 14px 18px",background:SF,borderRadius:"0 8px 8px 0"}}>
<div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:8}}>
<div><span style={{fontSize:11,color:Gd,fontFamily:"Helvetica Neue,sans-serif",marginRight:8,letterSpacing:1}}>{String(d.id).padStart(3,"0")}</span><span style={{fontSize:17,color:G,cursor:"pointer",textDecoration:"underline",textDecorationColor:Gf,textUnderlineOffset:3}} onClick={()=>sMd(d)}>{"Yā "+d.n}</span><div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:Gd,fontFamily:"Helvetica Neue,sans-serif",marginTop:3}}>{d.m}</div></div>
<button onClick={e=>tf(d.id,e)} style={{background:"none",border:"none",cursor:"pointer",padding:4,flexShrink:0}}><HI f={fv.has(d.id)}/></button></div>
<div style={{fontSize:15,lineHeight:1.95,color:"#B5AEA0",fontStyle:"italic"}}>{d.du}</div>
</div>))}
</div>);})}
{fl.length===0&&(<div style={{textAlign:"center",padding:40,color:Gd,fontStyle:"italic"}}>{fo?"No favorites yet":"No du'as match"}</div>)}
{!srch&&!fo&&fl.length>0&&(<div style={{textAlign:"center",padding:"40px 20px",background:SF,borderRadius:12,border:"1px solid "+BD}}>
<div style={{fontSize:28,color:G,marginBottom:20}}>{"اللَّهُمَّ آمِين"}</div>
<div style={{fontSize:14,color:Gd,fontStyle:"italic",lineHeight:2,maxWidth:360,margin:"0 auto"}}>{"These du'as were made with 99 names and one intention:"}<br/><br/><span style={{color:G}}>{"To return to You. Over and over again."}</span><br/><br/><em>{"Ameen."}</em></div>
</div>)}
</div></div>)}

{tab==="names"&&(<div style={{position:"relative",zIndex:1,padding:"16px 16px 120px"}}>
<div style={{textAlign:"center",marginBottom:24}}>
<div style={{fontSize:20,color:G,marginBottom:6}}>{"The 99 Names of Allah"}</div>
<div style={{fontSize:12,color:Gd,fontStyle:"italic"}}>{"Tap any name to learn more. Use flashcards to memorize."}</div>
<button onClick={()=>{sFcIdx(Math.floor(Math.random()*100));sFcFlip(false);sT("flash");}} style={{marginTop:12,background:"none",border:"1px solid "+G,color:G,padding:"8px 20px",borderRadius:6,cursor:"pointer",fontSize:11,letterSpacing:2,fontFamily:"Helvetica Neue,sans-serif",textTransform:"uppercase"}}>Flashcards</button>
</div>
{all.map(d=>(<div key={d.id} onClick={()=>sMd(d)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderBottom:"1px solid "+BD,cursor:"pointer"}}>
<span style={{fontSize:11,color:Gd,fontFamily:"Helvetica Neue,sans-serif",minWidth:28}}>{String(d.id).padStart(3,"0")}</span>
<div style={{flex:1}}><div style={{fontSize:16,color:G}}>{"Yā "+d.n}</div><div style={{fontSize:11,color:Gd,letterSpacing:1,textTransform:"uppercase",fontFamily:"Helvetica Neue,sans-serif",marginTop:2}}>{d.m}</div></div>
<span style={{color:Gf,fontSize:12}}>{"›"}</span>
</div>))}
</div>)}

{tab==="flash"&&(<div style={{position:"relative",zIndex:1,padding:"20px 16px 120px",display:"flex",flexDirection:"column",alignItems:"center"}}>
<button onClick={()=>sT("names")} style={{alignSelf:"flex-start",background:"none",border:"none",color:Gd,cursor:"pointer",fontSize:12,fontFamily:"Helvetica Neue,sans-serif",marginBottom:16,padding:0}}>{"← Back to Names"}</button>
<div style={{fontSize:11,color:Gd,letterSpacing:2,fontFamily:"Helvetica Neue,sans-serif",textTransform:"uppercase",marginBottom:16}}>{(fcIdx+1)+" / 100"}</div>
<div onClick={()=>sFcFlip(!fcFlip)} style={{width:"100%",maxWidth:360,minHeight:280,background:SF,borderRadius:16,border:"1px solid "+(fcFlip?G:BD),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,cursor:"pointer",transition:"border 0.3s"}}>
{!fcFlip?(<><div style={{fontSize:24,color:G,marginBottom:8}}>{"Yā "+all[fcIdx].n}</div><div style={{fontSize:12,color:Gd,fontStyle:"italic",marginTop:8}}>{"Tap to reveal meaning"}</div></>):(<><div style={{fontSize:18,color:G,marginBottom:8}}>{"Yā "+all[fcIdx].n}</div><div style={{fontSize:14,color:Gd,fontStyle:"italic",marginBottom:16}}>{all[fcIdx].m}</div><div style={{fontSize:14,lineHeight:1.8,color:"#B0A898",fontStyle:"italic",textAlign:"center"}}>{all[fcIdx].ex}</div></>)}
</div>
<div style={{display:"flex",gap:12,marginTop:20}}>
<button onClick={()=>{sFcIdx(p=>(p-1+100)%100);sFcFlip(false);}} style={{background:"none",border:"1px solid "+BD,color:Gd,padding:"10px 24px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:"Helvetica Neue,sans-serif"}}>{"Previous"}</button>
<button onClick={()=>{sFcIdx(Math.floor(Math.random()*100));sFcFlip(false);}} style={{background:"none",border:"1px solid "+BD,color:Gd,padding:"10px 24px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:"Helvetica Neue,sans-serif"}}>{"Shuffle"}</button>
<button onClick={()=>{sFcIdx(p=>(p+1)%100);sFcFlip(false);}} style={{background:"none",border:"1px solid "+BD,color:Gd,padding:"10px 24px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:"Helvetica Neue,sans-serif"}}>{"Next"}</button>
</div>
</div>)}

{tab==="heart"&&(<div style={{position:"relative",zIndex:1,padding:"20px 16px 100px"}}>
<div style={{textAlign:"center",marginBottom:32,padding:"0 8px"}}>
<div style={{fontSize:22,color:G,marginBottom:12}}>{"What Lives in My Heart"}</div>
<div style={{width:40,height:1,background:G,margin:"0 auto 16px",opacity:0.4}}/>
<div style={{fontSize:14,color:"#8A8070",fontStyle:"italic",lineHeight:1.9,maxWidth:360,margin:"0 auto"}}>{"Before you read a single du'a, remember why you're reading it. These are the tensions, fears, desires, and hopes that live beneath every word. Return here to recenter your intention before you ask."}</div>
</div>
{HT.map((h,i)=>{const o=eh===i;return(
<div key={i} onClick={()=>sEh(o?null:i)} style={{borderLeft:"3px solid "+(o?G:Gf),background:o?SF:"transparent",borderRadius:"0 8px 8px 0",marginBottom:10,cursor:"pointer"}}>
<div style={{padding:"14px 16px 14px 20px",display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
<div><span style={{fontSize:17,color:o?G:"#C8C0B4",display:"block"}}>{h.t}</span>{!o&&(<span style={{fontSize:12,color:Gf,fontStyle:"italic",marginTop:4,display:"block"}}>{h.q}</span>)}</div>
<span style={{color:Gd,fontSize:14,marginTop:4,transition:"transform 0.2s",transform:o?"rotate(45deg)":"none",flexShrink:0}}>{"+"}</span></div>
{o&&(<div style={{padding:"0 16px 18px 20px"}}>
<div style={{fontSize:13,color:G,fontStyle:"italic",marginBottom:12,fontFamily:"Helvetica Neue,sans-serif",letterSpacing:1}}>{h.q}</div>
<div style={{fontSize:15,lineHeight:1.95,color:"#A09888",fontStyle:"italic"}}>{h.c}</div>
</div>)}
</div>);})}
<div style={{textAlign:"center",marginTop:32,padding:"24px 16px",background:SF,borderRadius:12,border:"1px solid "+BD}}>
<div style={{fontSize:14,color:Gd,fontStyle:"italic",lineHeight:1.9,maxWidth:340,margin:"0 auto"}}>{"You want a life of depth, beauty, obedience, strength, truth, barakah, family, meaningful work, disciplined character, clear speech, halal wealth, protection from corruption, and nearness to Allah."}<br/><br/><span style={{color:G}}>{"That is the emotional backbone of every du'a in this collection."}</span></div>
</div>
</div>)}

<button onClick={()=>sRm(rnd())} style={{position:"fixed",bottom:24,right:20,width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#1A1610,#252015)",border:"1.5px solid "+G,color:G,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,boxShadow:"0 4px 20px rgba(0,0,0,0.6),0 0 15px rgba(212,168,83,0.15)"}}>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
</button>

{mcont&&(<div onClick={mclose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
<div onClick={e=>e.stopPropagation()} style={{background:"#141210",borderRadius:14,padding:"28px 22px",maxWidth:440,width:"100%",maxHeight:"82vh",overflowY:"auto",border:"1px solid "+BD,position:"relative"}}>
<button onClick={mclose} style={{position:"absolute",top:12,right:12,background:"none",border:"none",color:Gd,cursor:"pointer"}}><XI/></button>
{rm?(<><div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:Gd,fontFamily:"Helvetica Neue,sans-serif",marginBottom:12}}>{mcont.cat}</div>
<div style={{fontSize:20,color:G}}>{"Yā "+mcont.n}</div>
<div style={{fontSize:12,color:Gd,marginTop:4,fontStyle:"italic"}}>{mcont.m}</div>
<div style={{width:40,height:1,background:Gd,margin:"16px 0",opacity:0.5}}/>
<div style={{fontSize:15,lineHeight:1.95,color:"#C8C0B4",fontStyle:"italic"}}>{mcont.du}</div>
<div style={{display:"flex",gap:8,marginTop:20}}>
<button onClick={()=>sRm(rnd())} style={{flex:1,background:"none",border:"1px solid "+BD,color:G,padding:"10px 0",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:"Helvetica Neue,sans-serif"}}>Another</button>
</div></>):(<><div style={{textAlign:"center",marginBottom:16}}>
<div style={{fontSize:20,color:G}}>{"Yā "+mcont.n}</div>
<div style={{fontSize:12,color:Gd,marginTop:4,fontStyle:"italic"}}>{mcont.m}</div>
<div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:Gf,marginTop:8,fontFamily:"Helvetica Neue,sans-serif"}}>{mcont.cat}</div></div>
<div style={{width:40,height:1,background:Gd,margin:"0 auto 16px",opacity:0.5}}/>
<div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:Gd,marginBottom:10,fontFamily:"Helvetica Neue,sans-serif"}}>{"Understanding This Name"}</div>
<div style={{fontSize:15,lineHeight:1.9,color:"#B0A898",fontStyle:"italic"}}>{mcont.ex}</div>
</>)}
</div></div>)}
</div>);
}
