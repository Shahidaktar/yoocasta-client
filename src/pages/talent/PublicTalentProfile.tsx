import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicProfile } from '../../api/talent.api';

const PublicTalentProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Photos');

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!username) return;
    if (hasFetched.current) return;
    hasFetched.current = true;

    getPublicProfile(username)
      .then(res => setProfile(res.data.data))
      .catch(() => setError('Profile not found or invalid username'))
      .finally(() => setLoading(false));
  }, [username]);

  const calculateAge = (dob: string) => {
    if (!dob) return '—';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const formatTalentId = (id: any) => {
    if (!id) return '—';
    const strId = String(id);
    const lastEight = strId.slice(-8);
    return `YC${lastEight}`;
  };

  const filterPortfolio = (type: string) => {
    if (!profile?.talentProfile?.media) return [];
    return profile.talentProfile.media.filter((m: any) => {
      if (type === 'Photos') return m.type === 'IMAGE';
      if (type === 'Videos') return m.type === 'ACTING_VIDEO' || m.type === 'VIDEO_LINK' || m.type === 'VIDEO';
      if (type === 'Casting') return m.type === 'CASTING_VIDEO';
      if (type === 'Audio') return m.type === 'AUDIO';
      return false;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfbf7]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#3835A4] border-t-[#C6007E] rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black font-mono text-[#3835A4]">GO</div>
        </div>
        <span className="mt-4 text-[9px] font-black tracking-[0.3em] text-[#3835A4]/60 uppercase font-mono animate-pulse">
          Rendering Creative Ecosystem...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] p-4">
        <div className="bg-white border-4 border-[#3835A4] p-8 rotate-1 max-w-md text-center space-y-4 shadow-[8px_8px_0px_0px_#C6007E]">
          <span className="text-4xl block animate-bounce">⚡</span>
          <p className="text-sm font-black text-[#3835A4] tracking-wider uppercase font-mono bg-red-100 px-2 py-1 inline-block">
            {error}
          </p>
          <Link to="/browse-talents" className="block text-[10px] font-black tracking-widest uppercase bg-[#3835A4] text-white px-6 py-3 transition-transform active:scale-95 hover:-translate-y-0.5">
            ← Return to Hub
          </Link>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const tp = profile.talentProfile;
  const planName = profile.subscription?.plan?.name || 'Basic';

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-900 selection:bg-[#C6007E]/30 selection:text-stone-900 pb-32 relative overflow-hidden font-sans">
      
      {/* ABSTRACT AVANT-GARDE GRAPHIC LAYERS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#3835A4]/10 to-[#C6007E]/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#C6007E]/10 to-cyan-200/40 blur-[100px] pointer-events-none -z-10" />
      
      {/* BACKGROUND GRID PATTERN TO EMULATE A DESIGNER'S CANVAS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3835a405_1px,transparent_1px),linear-gradient(to_bottom,#3835a405_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 space-y-16 relative z-10">
        
        {/* ASYMMETRICAL EDITORIAL HERO CANVAS */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* STICKY LUXURY AVATAR WRAPPER */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start lg:sticky lg:top-8">
            <div className="relative group w-full max-w-[340px]">
              {/* Brutalist Shadow Offset */}
              <div className="absolute inset-0 bg-[#3835A4] rounded-[32px] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4 duration-300" />
              
              <div className="relative bg-white border-2 border-[#3835A4] rounded-[32px] p-3 shadow-sm overflow-hidden z-10">
                {profile.image ? (
                  <img 
                    src={profile.image} 
                    alt={profile.firstName} 
                    className="w-full aspect-[4/5] object-cover rounded-[24px] transition-all duration-700 ease-out" 
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-stone-100 text-stone-400 flex items-center justify-center font-black text-7xl font-mono rounded-[24px]">
                    {profile.firstName?.[0]}
                  </div>
                )}
                
                {/* Float Badge */}
                {profile.isVerified && (
                  <div className="absolute bottom-6 right-6 bg-[#C6007E] text-white font-mono text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full border-2 border-[#3835A4] shadow-md transform rotate-3">
                    VERIFIED NODE ✓
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* HIGH-END TYPOGRAPHY & IDENTITY CORE */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className="font-mono text-[10px] font-black tracking-[0.25em] text-[#C6007E] uppercase bg-[#C6007E]/5 px-3 py-1 rounded-md border border-[#C6007E]/20">
                  {planName} Tier
                </span>
                <span className="font-mono text-[10px] font-bold text-stone-400">//@{profile.username}</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-[0.95] font-mono text-stone-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3835A4] via-[#C6007E] to-amber-500">
                  {profile.firstName}
                </span>
              </h1>
            </div>

            {/* QUICK STATS AS A KINETIC GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white border-2 border-[#3835A4] p-4 rounded-2xl shadow-[4px_4px_0px_0px_#3835A4] flex flex-col justify-between h-24 text-left transform -rotate-1">
                <span className="text-[8px] font-black tracking-widest text-stone-400 uppercase font-mono">Profile ID</span>
                <span className="text-sm font-black font-mono text-[#3835A4]">{formatTalentId(profile.id)}</span>
              </div>
              <div className="bg-[#C6007E]/10 border-2 border-[#3835A4] p-4 rounded-2xl shadow-[4px_4px_0px_0px_#3835A4] flex flex-col justify-between h-24 text-left transform rotate-1">
                <span className="text-[8px] font-black tracking-widest text-[#C6007E] uppercase font-mono">Profile Views</span>
                <span className="text-xl font-black font-mono text-[#3835A4]">👁 {tp?.views ?? 0}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white border-2 border-[#3835A4] p-4 rounded-2xl shadow-[4px_4px_0px_0px_#3835A4] flex flex-col justify-between h-24 text-left transform -rotate-1">
                <span className="text-[8px] font-black tracking-widest text-stone-400 uppercase font-mono">Location</span>
                <span className="text-xs font-bold text-stone-900 truncate block">
                  {tp?.city?.name ? `${tp.city.name}, ${tp.city.country?.name || ''}` : 'Global Hub'}
                </span>
              </div>
            </div>

            {/* CATEGORIES DISPLAYED AS HIGH-CONTRAST CHIPS */}
            <div className="space-y-2 text-left">
              <span className="block text-[9px] font-black tracking-[0.2em] text-stone-400 uppercase font-mono">Categories</span>
              <div className="flex flex-wrap gap-2">
                {tp?.categories?.map((c: any) => (
                  <span key={c.category.id} className="px-4 py-2 bg-[#3835A4] text-white rounded-xl text-[10px] font-black tracking-widest uppercase border border-[#3835A4] hover:bg-transparent hover:text-[#3835A4] transition-all duration-200">
                    ✦ {c.category.name}
                  </span>
                )) || <span className="text-xs italic font-mono text-stone-400">Uncategorized Vector</span>}
              </div>
            </div>

            {/* NARRATIVE STATEMENT BLOCK */}
            {tp?.bioDescription && (
              <div className="text-left relative border-l-4 border-[#C6007E] pl-6 space-y-2">
                <span className="text-[9px] font-black tracking-[0.2em] text-stone-400 uppercase font-mono block">About</span>
                <p className="text-sm text-stone-600 font-medium leading-relaxed whitespace-pre-line max-w-2xl">
                  {tp.bioDescription}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* BRUTALIST GRID BLOCK: BIOMETRICS & SPECS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* IDENTITY MATRIX GRID */}
          <div className="lg:col-span-7 bg-white border-2 border-[#3835A4] rounded-[32px] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#3835A4] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#3835A4] pb-4">
              <h3 className="text-xs font-black tracking-[0.25em] text-[#3835A4] uppercase font-mono">Identity Blueprint</h3>
              {/* <span className="text-stone-300 font-mono text-[10px]">LOG_01 // CODES</span> */}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Calculated Age', val: calculateAge(tp?.dob) },
                { label: 'Gender Matrix', val: tp?.gender },
                { label: 'Ethnicity Index', val: tp?.ethnicity?.name },
                { label: 'Sovereign Nationality', val: profile.nationality?.name },
                { label: 'Linguistic Tracks', val: tp?.languages?.map((l: any) => l.language.name).join(', ') },
                { label: 'Dialect Grid', val: tp?.dialects?.map((d: any) => d.dialect.name).join(', ') }
              ].map((item, idx) => (
                <div key={idx} className="border-b border-stone-200 pb-2">
                  <span className="block text-[8px] font-black uppercase text-stone-400 font-mono tracking-wider">{item.label}</span>
                  <span className="text-xs font-black text-stone-900 mt-0.5 block">{item.val || '—'}</span>
                </div>
              ))}
            </div>

            {/* TECHNICAL EXECUTION DESCRIPTION FOOTER */}
            {tp?.skillDescription && (
              <div className="bg-amber-50 border-2 border-dashed border-amber-400/80 p-4 rounded-2xl mt-4">
                <span className="block text-[8px] font-black uppercase text-amber-600 font-mono tracking-wider mb-1">Capabilities & Special Skills</span>
                <p className="text-xs font-medium text-amber-900 leading-relaxed">{tp.skillDescription}</p>
              </div>
            )}
          </div>

          {/* PHYSICAL ARCHITECTURE FRAMEWORK */}
          <div className="lg:col-span-5 bg-[#3835A4] text-stone-100 rounded-[32px] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#C6007E] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-[#3835A4]/30 pb-4">
              <h3 className="text-xs font-black tracking-[0.25em] text-[#FFF] uppercase font-mono">Physcial Metrics</h3>
              {/* <span className="text-white/40 font-mono text-[10px]">SPEC_02</span> */}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {[
                { label: 'Stature (Height)', val: tp?.height ? `${tp.height} cm` : null },
                { label: 'Mass (Weight)', val: tp?.weight ? `${tp.weight} kg` : null },
                { label: 'Chest Spectrum', val: tp?.chest ? `${tp.chest} cm` : null },
                { label: 'Waist Spectrum', val: tp?.waist ? `${tp.waist} cm` : null },
                { label: 'Ocular Palette', val: tp?.eyeColor },
                { label: 'Shoe Metric', val: tp?.shoeSize },
                { label: 'Hair Attribute', val: tp?.hairColor ? `${tp.hairColor} (${tp.hairLength || 'Short'})` : null },
                { label: 'Skeletal Build', val: tp?.bodyStructure }
              ].map((item, idx) => (
                <div key={idx} className="border-b border-white/10 pb-2">
                  <span className="block text-[8px] font-black uppercase text-white/40 font-mono tracking-wider">{item.label}</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{item.val || '—'}</span>
                </div>
              ))}
            </div>

            {tp?.tattoo && (
              <div className="pt-2 text-left">
                <span className="block text-[8px] font-black uppercase text-white/40 font-mono tracking-wider">Dermal Alterations</span>
                <p className="text-xs text-[#C6007E] font-mono mt-0.5 bg-white px-2 py-0.5 rounded inline-block">{tp.tattoo}</p>
              </div>
            )}
          </div>
        </div>

        {/* HIGH-END SPECTRUM PORTFOLIO FRAMEWORK */}
        <div className="bg-white border-2 border-[#3835A4] rounded-[40px] p-6 sm:p-10 shadow-[12px_12px_0px_0px_#C6007E] space-y-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-[#3835A4] pb-6 gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-black tracking-tight uppercase font-mono text-stone-900">Curated Media Showcase</h3>
              <p className="text-[10px] font-mono text-stone-400">SELECT STATE CAPTURED ASSETS</p>
            </div>
            
            {/* Neo-Brutalist Segment Controller */}
            <div className="flex flex-wrap bg-stone-100 p-1.5 rounded-2xl border-2 border-[#3835A4] w-full md:w-auto">
              {['Photos', 'Videos', 'Casting', 'Audio'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-6 py-2.5 text-[10px] font-black tracking-widest uppercase rounded-xl transition-all font-mono ${
                    activeTab === tab
                      ? 'bg-[#3835A4] text-white shadow-md'
                      : 'text-stone-400 hover:text-[#3835A4]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          {/* Dynamic Asset Stream Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filterPortfolio(activeTab).length === 0 ? (
              <div className="py-16 col-span-full text-center bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
                <span className="text-2xl block mb-2">🪐</span>
                <p className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                  No vectors integrated into current registry layer [{activeTab}].
                </p>
              </div>
            ) : (
              filterPortfolio(activeTab).map((item: any) => (
                <div key={item.id} className="group relative aspect-[3/4] bg-stone-50 border-2 border-[#3835A4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  
                  {item.type === 'IMAGE' && (
                    <img 
                      src={item.url} 
                      alt="" 
                      className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                  )}
                  
                  {(item.type === 'ACTING_VIDEO' || item.type === 'VIDEO') && (
                    <video 
                      src={item.url} 
                      controls 
                      className="w-full h-full object-cover bg-stone-950" 
                    />
                  )}
                  
                  {item.type === 'VIDEO_LINK' && (
                    <div className="w-full h-full flex flex-col justify-between p-6 bg-[#3835A4] text-white font-mono">
                      <span className="text-3xl">💎</span>
                      <div className="space-y-3">
                        <p className="text-[10px] font-bold tracking-tight line-clamp-3 text-white/70 uppercase leading-snug">{item.caption || 'External Link Vector'}</p>
                        <a 
                          href={item.videoLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-block text-[9px] font-black tracking-widest bg-[#C6007E] text-white px-3 py-2 rounded-lg border border-[#3835A4] uppercase shadow-[2px_2px_0px_0px_#3835A4]"
                        >
                          Execute Stream ↗
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {item.type === 'CASTING_VIDEO' && (
                    <div className="w-full h-full relative bg-stone-950">
                      <video src={item.url} controls className="w-full h-full object-cover" />
                      <span className="absolute top-4 left-4 bg-[#C6007E] text-white text-[8px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md border border-[#3835A4] shadow-md">
                        Casting Core Node
                      </span>
                    </div>
                  )}
                  
                  {item.type === 'AUDIO' && (
                    <div className="w-full h-full flex flex-col justify-between p-5 bg-amber-50 border-2 border-[#3835A4] rounded-xl">
                      <div className="flex justify-between items-start">
                        <span className="text-3xl">🔊</span>
                        <span className="text-[8px] font-black tracking-widest text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded uppercase font-mono">Acoustic Core</span>
                      </div>
                      <div className="space-y-3 w-full">
                        <p className="text-[10px] font-black text-stone-800 font-mono truncate">{item.caption || item.title || 'Untitled Track Seg'}</p>
                        <audio src={item.url} controls className="w-full scale-95 origin-bottom" />
                      </div>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        </div>

        {/* CHRONOLOGICAL HISTORICAL LOGMAP */}
        {tp?.careerHistory && tp.careerHistory.length > 0 && (
          <div className="bg-white border-2 border-[#3835A4] rounded-[32px] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#3835A4] space-y-8">
            <div className="flex items-center justify-between border-b-2 border-[#3835A4] pb-4">
              <h3 className="text-xs font-black tracking-[0.25em] text-[#3835A4] uppercase font-mono">Historical Placement Grid</h3>
              <span className="text-stone-300 font-mono text-[10px]">CHRONO_TRACK</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {tp.careerHistory.map((ch: any) => (
                <div key={ch.id} className="bg-[#fdfbf7] border-2 border-[#3835A4] p-6 rounded-2xl relative space-y-2 group transition-transform hover:-translate-y-0.5 hover:bg-white shadow-[4px_4px_0px_0px_#3835A4]">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-sm font-black tracking-tight text-stone-900 uppercase font-mono">{ch.title}</h4>
                    <span className="text-[8px] font-mono font-black text-[#C6007E] bg-[#C6007E]/5 border border-[#C6007E]/20 px-2 py-0.5 rounded whitespace-nowrap">
                      {ch.startDate ? new Date(ch.startDate).toLocaleDateString(undefined, { year: 'numeric' }) : ''} 
                      {ch.endDate ? ` — ${new Date(ch.endDate).toLocaleDateString(undefined, { year: 'numeric' })}` : ' — Pres'}
                    </span>
                  </div>
                  {ch.description && (
                    <p className="text-xs text-stone-500 font-medium leading-relaxed pt-1 border-t border-dashed border-stone-200">{ch.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMBINED SUB-METRICS FOOTER BLOCKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Courses Framework Block */}
          {tp?.courses && tp.courses.length > 0 && (
            <div className="bg-white border-2 border-[#3835A4] rounded-[32px] p-6 sm:p-8 space-y-4 shadow-[6px_6px_0px_0px_#3835A4]">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <span className="text-xl">🎓</span>
                <h3 className="text-xs font-black tracking-[0.2em] text-stone-400 uppercase font-mono">Academic Matrix & Training</h3>
              </div>
              <div className="space-y-3">
                {tp.courses.map((c: any) => (
                  <div key={c.id} className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex justify-between items-center gap-4 hover:border-[#3835A4] transition-colors">
                    <div className="space-y-0.5">
                      <strong className="block text-xs font-black text-stone-900 font-mono uppercase tracking-wide">{c.title}</strong>
                      {c.institution && <span className="block text-[10px] font-mono font-bold text-stone-400">{c.institution}</span>}
                    </div>
                    {c.year && <span className="text-xs font-mono font-black bg-[#3835A4] text-white px-2.5 py-1 rounded-md">{c.year}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Spec Attributes Framework Block */}
          {tp?.attributes && tp.attributes.length > 0 && (
            <div className="bg-white border-2 border-[#3835A4] rounded-[32px] p-6 sm:p-8 space-y-4 shadow-[6px_6px_0px_0px_#C6007E]">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <span className="text-xl">📋</span>
                <h3 className="text-xs font-black tracking-[0.2em] text-stone-400 uppercase font-mono">Attributes</h3>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 divide-y divide-stone-200/60 space-y-2.5">
                {tp.attributes.map((attr: any) => (
                  <div key={attr.id} className="text-xs flex items-center justify-between pt-2.5 first:pt-0">
                    <span className="font-black tracking-widest text-stone-400 uppercase text-[9px] font-mono">
                      {attr.key.replace(/_/g, ' ')}
                    </span>
                    <span className="font-black font-mono text-[#3835A4] tracking-tight bg-white px-2 py-0.5 border border-stone-200 rounded">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default PublicTalentProfile;