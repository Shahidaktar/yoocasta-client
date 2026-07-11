import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTalentFilterOptions, searchTalents } from '../../api/talent.api';

const DEFAULT_FILTERS = { sort: 'newest' };

const BrowseTalents = () => {
  const [options, setOptions] = useState<any>(null);
  const [talents, setTalents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });

  const [draftFilters, setDraftFilters] = useState<any>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<any>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  useEffect(() => {
    getTalentFilterOptions().then(res => setOptions(res.data.data));
  }, []);

  useEffect(() => {
    const fetchTalents = async () => {
      setLoading(true);
      try {
        const res = await searchTalents({ ...appliedFilters, page: pagination.page, limit: 12 });
        setTalents(res.data.data.data);
        setPagination(res.data.data.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTalents();
  }, [appliedFilters, pagination.page]);

  const handleFilterChange = (key: string, value: any) => {
    setDraftFilters((prev: any) => ({ ...prev, [key]: value || undefined }));
  };

  const handleMultiChange = (key: string, id: string) => {
    setDraftFilters((prev: any) => {
      const current = prev[key] || [];
      return { ...prev, [key]: current.includes(id) ? current.filter((x: string) => x !== id) : [...current, id] };
    });
  };

  const applyFilters = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    setAppliedFilters(draftFilters);
  };

  const resetFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setPagination({ total: 0, page: 1, totalPages: 1 });
  };

  return (
    <div style={{ background: '#f4f4f6', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
      
      {/* TOP FULL-WIDTH DARK FILTERS PANEL */}
      <div style={{ background: '#111115', color: '#fff', padding: '24px 40px', borderBottom: '1px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em' }}>
            Browse Talents {pagination.total > 0 && <span style={{ color: '#C6007E', fontSize: '14px', marginLeft: '8px' }}>({pagination.total} found)</span>}
          </h2>
          <button onClick={resetFilters} style={{ fontSize: '12px', color: '#C6007E', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Reset All
          </button>
        </div>

        {options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Primary Core Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Search name or bio..." 
                value={draftFilters.search || ''} 
                onChange={e => handleFilterChange('search', e.target.value)} 
                style={{ background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', outline: 'none' }} 
              />

              <select value={draftFilters.sort} onChange={e => handleFilterChange('sort', e.target.value)} style={{ background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                <option value="newest">Newest Members</option>
                <option value="most_viewed">Most Viewed</option>
                <option value="a-z">Name (A-Z)</option>
                <option value="z-a">Name (Z-A)</option>
              </select>

              <select value={draftFilters.gender || ''} onChange={e => handleFilterChange('gender', e.target.value)} style={{ background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <select value={draftFilters.countryId || ''} onChange={e => { handleFilterChange('countryId', e.target.value); handleFilterChange('cityId', null); }} style={{ background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                <option value="">All Countries</option>
                {options.countries.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <select value={draftFilters.cityId || ''} onChange={e => handleFilterChange('cityId', e.target.value)} style={{ background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                <option value="">All Cities</option>
                {options.cities.filter((c: any) => !draftFilters.countryId || c.countryId === draftFilters.countryId).map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <button 
                onClick={applyFilters}
                style={{ background: '#3835A4', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#C6007E'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#3835A4'}
              >
                Apply Filters
              </button>
            </div>

            {/* Toggle Show Advanced Matrices Row */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowFilters(!showFilters)} style={{ background: 'transparent', color: '#aaa', border: '1px solid #333', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                {showFilters ? 'Hide Advanced Filters ▲' : 'Show Advanced Attributes, Metadata & Professional EAV Filters ▼'}
              </button>
            </div>

            {/* Expanded Advanced Sub-Filters Array Panel Container */}
            {showFilters && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', padding: '24px', background: '#16161f', borderRadius: '12px', border: '1px solid #262630' }}>
                
                {/* 1. AGE CONFIGURATION DROPDOWNS */}
                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>AGE PARAMETERS</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select value={draftFilters.ageFrom || ''} onChange={e => handleFilterChange('ageFrom', e.target.value ? parseInt(e.target.value) : null)} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '8px', borderRadius: '6px', fontSize: '12px' }}>
                      <option value="">Min Age</option>
                      {Array.from({ length: 101 }, (_, i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <select value={draftFilters.ageTo || ''} onChange={e => handleFilterChange('ageTo', e.target.value ? parseInt(e.target.value) : null)} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '8px', borderRadius: '6px', fontSize: '12px' }}>
                      <option value="">Max Age</option>
                      {Array.from({ length: 101 }, (_, i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>

                {/* 2. PHYSICAL ATTRIBUTES DROPDOWNS */}
                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>PHYSICAL SPECIFICATIONS</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <select value={draftFilters.physical?.height || ''} onChange={e => setDraftFilters((p: any) => ({ ...p, physical: { ...p.physical, height: e.target.value } }))} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '6px', borderRadius: '6px', fontSize: '12px' }}>
                      <option value="">All Heights</option>
                      <option value="160">160 cm</option>
                      <option value="170">170 cm</option>
                      <option value="180">180 cm</option>
                    </select>
                    <select value={draftFilters.physical?.bodyStructure || ''} onChange={e => setDraftFilters((p: any) => ({ ...p, physical: { ...p.physical, bodyStructure: e.target.value } }))} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '6px', borderRadius: '6px', fontSize: '12px' }}>
                      <option value="">All Body Structures</option>
                      <option value="slim">Slim</option>
                      <option value="athletic">Athletic</option>
                      <option value="average">Average</option>
                    </select>
                    <select value={draftFilters.physical?.hairColor || ''} onChange={e => setDraftFilters((p: any) => ({ ...p, physical: { ...p.physical, hairColor: e.target.value } }))} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '6px', borderRadius: '6px', fontSize: '12px' }}>
                      <option value="">All Hair Colors</option>
                      <option value="black">Black</option>
                      <option value="brown">Brown</option>
                      <option value="blonde">Blonde</option>
                    </select>
                  </div>
                </div>

                {/* 3. CATEGORIES LIST SELECTION */}
                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>CATEGORIES</span>
                  <div style={{ maxHeight: '90px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
                    {options.categories.map((c: any) => (
                      <label key={c.id} style={{ fontSize: '12px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={(draftFilters.categories || []).includes(c.id)} onChange={() => handleMultiChange('categories', c.id)} /> {c.name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. ETHNICITY SELECTION LIST */}
                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>ETHNICITY</span>
                  <div style={{ maxHeight: '90px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
                    {options.ethnicities.map((e: any) => (
                      <label key={e.id} style={{ fontSize: '12px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={(draftFilters.ethnicities || []).includes(e.id)} onChange={() => handleMultiChange('ethnicities', e.id)} /> {e.name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 5. NATIONALITY SELECTION LIST */}
                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>NATIONALITY</span>
                  <div style={{ maxHeight: '90px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
                    {options.nationalities.map((n: any) => (
                      <label key={n.id} style={{ fontSize: '12px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={(draftFilters.nationalities || []).includes(n.id)} onChange={() => handleMultiChange('nationalities', n.id)} /> {n.name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 6. LANGUAGES SELECTION LIST */}
                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>LANGUAGES</span>
                  <div style={{ maxHeight: '90px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
                    {options.languages.map((l: any) => (
                      <label key={l.id} style={{ fontSize: '12px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={(draftFilters.languages || []).includes(l.id)} onChange={() => handleMultiChange('languages', l.id)} /> {l.name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 7. DIALECTS SELECTION LIST */}
                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>DIALECTS</span>
                  <div style={{ maxHeight: '90px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
                    {options.dialects.map((d: any) => (
                      <label key={d.id} style={{ fontSize: '12px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={(draftFilters.dialects || []).includes(d.id)} onChange={() => handleMultiChange('dialects', d.id)} /> {d.name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 8. PROFESSIONAL FILTERS (EAV KEY-VALUE INTERACTION SEGMENT) */}
                {options.attributes && options.attributes.length > 0 && (
                  <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #262630', paddingTop: '20px', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '10px', letterSpacing: '0.5px' }}>PROFESSIONAL PARAMETERS (EAV KEY-VALUE MATRIX MATCH)</span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                      {options.attributes.map((attr: any) => {
                        const currentEavObj = (draftFilters.professional || []).find((p: any) => p.key === attr);
                        return (
                          <div key={attr}>
                            <label style={{ fontSize: '11px', color: '#aaa', display: 'block', textTransform: 'capitalize', marginBottom: '4px' }}>{attr.replace(/_/g, ' ')}</label>
                            <input 
                              type="text" 
                              placeholder="Value..." 
                              value={currentEavObj ? currentEavObj.value : ''}
                              onChange={e => {
                                const val = e.target.value;
                                setDraftFilters((prev: any) => {
                                  let pro = prev.professional ? [...prev.professional.filter((p: any) => p.key !== attr)] : [];
                                  if (val) pro.push({ key: attr, value: val });
                                  return { ...prev, professional: pro };
                                });
                              }}
                              style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        )}
      </div>

      {/* GRID DISCOVERY WORKSPACE HUB */}
      <div style={{ padding: '40px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#666', fontWeight: 'bold' }}>Loading assets...</p>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '30px' }}>
              {talents.length === 0 ? (
                <p style={{ color: '#666' }}>No talents found matching your criteria.</p>
              ) : (
                talents.map(talent => {
                  const isHovered = hoveredCardId === talent.id;
                  const themeColor = talent.gender === 'female' ? '#C6007E' : '#3835A4';

                  return (
                    <Link 
                      to={`/talent/${talent.username}`} 
                      key={talent.id} 
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onMouseEnter={() => setHoveredCardId(talent.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                    >
                      <div style={{ 
                        position: 'relative',
                        height: '440px',
                        borderRadius: '24px', 
                        overflow: 'hidden', 
                        background: '#111', 
                        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
                        transform: isHovered ? 'translateY(-4px)' : 'none',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        border: isHovered ? `1.5px solid ${themeColor}` : '1.5px solid transparent'
                      }}>
                        
                        {/* Real Photo Element Layer */}
                        <img 
                          src={talent.image || 'https://via.placeholder.com/400x500?text=No+Photo'} 
                          alt={talent.firstName} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isHovered ? 0.65 : 0.85, transition: 'opacity 0.3s' }} 
                        />

                        {/* Top Utility Plan Badges Overlay */}
                        <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                          <div>
                            {talent.plan === 'premium' && (
                              <span style={{ background: 'linear-gradient(90deg, #C6007E 0%, #3835A4 100%)', color: '#fff', fontSize: '9px', fontWeight: 'black', padding: '6px 12px', borderRadius: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                ★ PREMIUM
                              </span>
                            )}
                          </div>
                          {talent.physical?.height && (
                            <span style={{ background: 'rgba(17, 17, 21, 0.75)', color: '#fff', fontSize: '10px', fontFamily: 'monospace', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)' }}>
                              📏 {talent.physical.height} CM
                            </span>
                          )}
                        </div>

                        {/* Shadow Gradient Vignette Cover */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', background: 'linear-gradient(to top, rgba(11,11,13,0.95) 0%, rgba(11,11,13,0.6) 40%, transparent 100%)', zIndex: 1 }} />

                        {/* Dynamic Context Fields Container */}
                        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', zIndex: 2 }}>
                          
                          {/* Top Tag Classifications Mapping */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                            {talent.categories?.slice(0, 2).map((cat: string) => (
                              <span key={cat} style={{ fontSize: '9px', fontWeight: 'black', background: themeColor, color: '#fff', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {cat}
                              </span>
                            ))}
                          </div>

                          <h3 style={{ margin: 0, color: '#fff', fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {talent.firstName} {talent.lastName} {talent.isVerified && <span style={{ fontSize: '14px' }}>✅</span>}
                          </h3>

                          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#bbb' }}>
                            📍 {talent.city}{talent.country ? `, ${talent.country}` : ''} {talent.age && `• ${talent.age} yrs`}
                          </p>

                          {/* Dynamic Attribute Metrics Grid Revealed On Hover State */}
                          <div style={{ 
                            maxHeight: isHovered ? '85px' : '0px', 
                            opacity: isHovered ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                            marginTop: isHovered ? '16px' : '0px',
                            borderTop: isHovered ? '1px solid rgba(255,255,255,0.1)' : 'none',
                            paddingTop: isHovered ? '12px' : '0px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '8px'
                          }}>
                            <div>
                              <span style={{ display: 'block', fontSize: '8px', color: '#777', fontWeight: 'bold' }}>SHOE SIZE</span>
                              <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>{talent.physical?.shoeSize || '—'}</span>
                            </div>
                            <div>
                              <span style={{ display: 'block', fontSize: '8px', color: '#777', fontWeight: 'bold' }}>HAIR COLOR</span>
                              <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold', textTransform: 'capitalize' }}>{talent.physical?.hairColor || '—'}</span>
                            </div>
                            <div>
                              <span style={{ display: 'block', fontSize: '8px', color: '#777', fontWeight: 'bold' }}>WAISTLINE</span>
                              <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>{talent.physical?.waistline ? `${talent.physical.waistline} CM` : '—'}</span>
                            </div>
                          </div>

                          {/* Float Action Node */}
                          <div style={{ 
                            position: 'absolute', 
                            right: '0px', 
                            bottom: '0px', 
                            background: themeColor, 
                            width: '42px', 
                            height: '42px', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.2s'
                          }}>
                            <span style={{ color: '#fff', fontSize: '14px' }}>👁</span>
                          </div>

                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            {/* CONTROL BAR PAGINATION SECTION */}
            {pagination.totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
                <button 
                  disabled={pagination.page === 1} 
                  onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))} 
                  style={{ padding: '10px 20px', background: '#fff', border: '1px solid #ddd', borderRadius: '10px', cursor: pagination.page === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold', color: '#3835A4' }}
                >
                  Previous
                </button>
                <span style={{ padding: '10px', color: '#666', fontSize: '14px' }}>Page {pagination.page} of {pagination.totalPages}</span>
                <button 
                  disabled={pagination.page === pagination.totalPages} 
                  onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))} 
                  style={{ padding: '10px 20px', background: '#fff', border: '1px solid #ddd', borderRadius: '10px', cursor: pagination.page === pagination.totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold', color: '#3835A4' }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseTalents;