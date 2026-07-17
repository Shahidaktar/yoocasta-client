import { useState, useEffect, useRef, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { getJobOptions, getPublicJobs } from '../../api/job.api';
import { useAuthStore } from '../../store/authStore';
import ApplicationPopup from '../../components/ApplicationPopup';

const CATEGORY_IMAGES: Record<string, string> = {
  'Actors & Extras': 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/images/category/actors_image.jpg',
  'Dancers': 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/images/category/category.jpg',
  'Models': 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/images/category/WhatsApp_Image_2024-10-11_at_3_22_56_PM.jpeg',
  'Photographers': 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/images/category/2892613_8705625.jpg',
  'Makeup & Hairstylists': 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/images/category/makeup.jpg',
  'Singers': 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/images/category/singers.jpg',
  'Directors': 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/images/category/Directors.jpg',
  'Cinematographers / Videographers': 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/images/category/Videographers.jpg',
};

const DEFAULT_CATEGORY_IMAGE = 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/images/category/pexels-bertellifotografia-2608515.jpg';
const getCategoryImage = (name: string | undefined) => CATEGORY_IMAGES[name || ''] || DEFAULT_CATEGORY_IMAGE;

const stripHtml = (str: string) => str.replace(new RegExp('<[^>]*>', 'g'), '');

const MultiSelectDropdown = ({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { id: string; name: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const summary = selected.length === 0 ? `All ${label}` : `${selected.length} selected`;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>
        {label.toUpperCase()}
      </span>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: '#1c1c24', color: selected.length ? '#fff' : '#888',
          border: '1px solid #333', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        {summary}
        <span style={{ fontSize: '10px', color: '#666' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 20,
          background: '#1c1c24', border: '1px solid #333', borderRadius: '8px',
          maxHeight: '220px', overflowY: 'auto', padding: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}>
          {options.map(opt => (
            <label key={opt.id} style={{ fontSize: '12px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '6px 4px' }}>
              <input type="checkbox" checked={selected.includes(opt.id)} onChange={() => onToggle(opt.id)} />
              {opt.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const DEFAULT_FILTERS = {
  status: 'all',
  sort: 'latest',
};

const daysUntil = (dateStr: string) => {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const truncate = (str: string, len: number) =>
  str && str.length > len ? str.slice(0, len) + '...' : str;

const shimmerStyle: CSSProperties = {
  background: 'linear-gradient(90deg, #1c1c24 25%, #2a2a35 50%, #1c1c24 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.4s ease-in-out infinite',
  borderRadius: '8px',
};

const SkeletonBlock = ({ width = '100%', height = '40px' }: { width?: string; height?: string } & { [key: string]: any }) => (
  <div style={{ ...shimmerStyle, width, height }} />
);

const JobCardSkeleton = () => (
  <div style={{
    borderRadius: '24px', overflow: 'hidden', background: '#111',
    border: '1.5px solid transparent', height: '320px',
  }}>
    <div style={{ ...shimmerStyle, width: '100%', height: '100%', borderRadius: 0 }} />
  </div>
);

const BrowseJobs = () => {
  const { user } = useAuthStore();
  const [options, setOptions] = useState<any>(null);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [draftFilters, setDraftFilters] = useState<any>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<any>(DEFAULT_FILTERS);
  const [quickJob, setQuickJob] = useState<any>(null);
  const [applyRole, setApplyRole] = useState<any>(null);
  const draftRef = useRef(draftFilters);
  draftRef.current = draftFilters;

  useEffect(() => {
    setOptionsLoading(true);
    getJobOptions()
      .then(res => setOptions(res.data.data))
      .finally(() => setOptionsLoading(false));
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getPublicJobs({ ...appliedFilters, page: pagination.page, limit: 12 });
        setJobs(res.data.data.data);
        setPagination(res.data.data.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [appliedFilters, pagination.page]);

  const applyFilters = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    setAppliedFilters(draftRef.current);
  };

  const handleFilterChange = (key: string, value: any) => {
    setDraftFilters((prev: any) => ({ ...prev, [key]: value || undefined }));
  };

  const handleMultiChange = (key: string, id: string) => {
    setDraftFilters((prev: any) => {
      const current = prev[key] || [];
      return { ...prev, [key]: current.includes(id) ? current.filter((x: string) => x !== id) : [...current, id] };
    });
  };

  const handleAutoFilterChange = (key: string, value: any) => {
    const next = { ...draftRef.current, [key]: value || undefined };
    setDraftFilters(next);
    setPagination(prev => ({ ...prev, page: 1 }));
    setAppliedFilters(next);
  };

  const resetFilters = () => {
    const defaults = { ...DEFAULT_FILTERS };
    setDraftFilters(defaults);
    setAppliedFilters(defaults);
    draftRef.current = defaults;
    setPagination({ total: 0, page: 1, totalPages: 1 });
  };

  return (
    <div style={{ background: '#f4f4f6', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', margin: 0 }}>

      {/* TOP DARK FILTERS PANEL */}
      <div style={{ position: 'relative', background: '#111115', color: '#fff', padding: '24px 40px', borderBottom: '1px solid #222' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Browse Jobs
            </h2>
            <button onClick={resetFilters} style={{ fontSize: '12px', color: '#C6007E', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Reset All
            </button>
          </div>

          {optionsLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
                {Array.from({ length: 8 }).map((_, i) => <SkeletonBlock key={i} height="60px" />)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                {Array.from({ length: 6 }).map((_, i) => <SkeletonBlock key={i} height="40px" />)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '20px', background: '#16161f', borderRadius: '12px', border: '1px solid #262630' }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}><SkeletonBlock height="12px" width="60%" /><div style={{ marginTop: '8px' }}><SkeletonBlock height="40px" /></div></div>
                ))}
              </div>
            </div>
          ) : options && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Primary Core Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>CATEGORY</span>
                  <select value={draftFilters.categoryIds || ''} onChange={e => handleFilterChange('categoryIds', e.target.value)} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                    <option value="">All Categories</option>
                    {options.categories?.filter((c: any) => c.name !== 'Additional Category').map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>GENDER</span>
                  <select value={draftFilters.gender || ''} onChange={e => handleFilterChange('gender', e.target.value)} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                    <option value="">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>PAYMENT</span>
                  <select value={draftFilters.paymentType || ''} onChange={e => handleFilterChange('paymentType', e.target.value)} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                    <option value="">All Payment</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>PROJECT TYPE</span>
                  <select value={draftFilters.projectTypeId || ''} onChange={e => handleFilterChange('projectTypeId', e.target.value)} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                    <option value="">All Project Types</option>
                    {options.projectTypes?.map((pt: any) => <option key={pt.id} value={pt.id}>{pt.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Age + Multi-select Filters */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '20px', background: '#16161f', borderRadius: '12px', border: '1px solid #262630' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>AGE PARAMETERS</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select value={draftFilters.ageFrom || ''} onChange={e => handleFilterChange('ageFrom', e.target.value)} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '12px', borderRadius: '6px', fontSize: '12px' }}>
                      <option value="">Min Age</option>
                      {Array.from({ length: 101 }, (_, i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <select value={draftFilters.ageTo || ''} onChange={e => handleFilterChange('ageTo', e.target.value)} style={{ width: '100%', background: '#1c1c24', color: '#fff', border: '1px solid #333', padding: '8px', borderRadius: '6px', fontSize: '12px' }}>
                      <option value="">Max Age</option>
                      {Array.from({ length: 101 }, (_, i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>

                <MultiSelectDropdown label="Country" options={options.countries || []} selected={draftFilters.countryIds || []} onToggle={(id) => handleMultiChange('countryIds', id)} />
                <MultiSelectDropdown label="Language" options={options.languages || []} selected={draftFilters.languageIds || []} onToggle={(id) => handleMultiChange('languageIds', id)} />
                <MultiSelectDropdown label="Nationality" options={options.nationalities || []} selected={draftFilters.nationalityIds || []} onToggle={(id) => handleMultiChange('nationalityIds', id)} />
              </div>

              <button
                onClick={applyFilters}
                style={{ background: '#3835A4', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', alignSelf: 'flex-start' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#C6007E'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#3835A4'}
              >
                Apply Filters
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Count + Status Filter + Sort Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px 0', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', color: '#111' }}>
          {pagination.total > 0 && <span style={{ color: '#C6007E', marginRight: '3px' }}>{pagination.total}</span>} Matching Jobs Found
        </h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={draftFilters.status}
            onChange={e => handleAutoFilterChange('status', e.target.value)}
            style={{ background: '#fff', color: '#111', border: '1px solid #ddd', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}
          >
            <option value="all">All Jobs</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={draftFilters.sort}
            onChange={e => handleAutoFilterChange('sort', e.target.value)}
            style={{ background: '#fff', color: '#111', border: '1px solid #ddd', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="expiring_soon">Expiring Soon</option>
            <option value="most_viewed">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div style={{ padding: '40px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {jobs.length === 0 ? (
                <p style={{ color: '#666' }}>No jobs found matching your criteria.</p>
              ) : (
                  jobs.map(job => {
                  const firstRole = job.roles?.[0];
                  const daysLeft = job.lastDateToApply ? daysUntil(job.lastDateToApply) : null;
                  const isExpired = daysLeft !== null && daysLeft < 0;

                  return (
                    <div
                      key={job.id}
                      style={{
                        background: '#fff', borderRadius: '20px', overflow: 'hidden',
                        border: '1.5px solid #eaeaea', height: '100%',
                        display: 'flex', flexDirection: 'column',
                        transition: 'all 0.25s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#3835A4'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#eaeaea'; }}
                    >
                        {/* Top Accent Bar */}
                        <div style={{
                          height: '4px',
                          background: isExpired ? '#bbb' : 'linear-gradient(90deg, #C6007E 0%, #3835A4 100%)',
                        }} />

                        {/* Category Background Image */}
                        {(() => {
                          const img = getCategoryImage(job.category?.name);
                          return img ? (
                            <div style={{
                              height: '120px',
                              backgroundImage: `url(${img})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              position: 'relative',
                            }}>
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.9) 100%)',
                              }} />
                            </div>
                          ) : null;
                        })()}

                        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* Company + Category Row */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            {job.company?.user?.image ? (
                              <img src={job.company.user.image} alt="" style={{ width: '28px', height: '28px', borderRadius: '8px', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#3835A4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'black' }}>
                                {job.company?.companyName?.[0] || 'C'}
                              </div>
                            )}
                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#888' }}>{job.company?.companyName || 'Company'}</span>
                            {job.company?.user?.isVerified && (
                              <span style={{ background: '#C6007E', color: '#fff', fontSize: '7px', fontWeight: 'black', padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.5px' }}>✓</span>
                            )}
                            <div style={{ marginLeft: 'auto' }}>
                              <span style={{ background: '#f0f0f5', color: '#3835A4', fontSize: '10px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '6px' }}>
                                {job.category?.name || 'General'}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h3 style={{ margin: '0 0 8px', fontSize: '17px', fontWeight: 900, color: '#111', lineHeight: 1.2 }}>
                              {job.title || 'Untitled'}
                            </h3>
                          </Link>

                          {/* Description */}
                          {job.description && (
                            <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#888', lineHeight: 1.5, flex: 1 }}>
                              {truncate(stripHtml(job.description), 120)}
                            </p>
                          )}

                          {/* Meta Tags Row */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                            {job.castingCity && (
                              <span style={{ background: '#f5f5ff', color: '#3835A4', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px' }}>
                                📍 {job.castingCity.name}{job.castingCity.country ? `, ${job.castingCity.country.name}` : ''}
                              </span>
                            )}
                            {firstRole?.paymentType && (
                              <span style={{ background: '#fff0f7', color: '#C6007E', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px' }}>
                                💰 {firstRole.paymentType.replace(new RegExp('_', 'g'), ' ')}
                              </span>
                            )}
                            {job.paymentInfo && (
                              <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px' }}>
                                {job.paymentInfo === 'paid' ? 'Paid' : 'Unpaid'}
                              </span>
                            )}
                            {job._count?.roles > 0 && (
                              <span style={{ background: '#f0f0f5', color: '#666', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px' }}>
                                🎭 {job._count.roles} role{job._count.roles > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>

                          {/* Bottom: Expiry + Apply */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: '14px', marginTop: 'auto' }}>
                            <div>
                              {job.lastDateToApply ? (
                                <span style={{ fontSize: '11px', fontWeight: 'bold', color: isExpired ? '#ef4444' : '#f59e0b' }}>
                                  {isExpired ? 'Expired' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
                                </span>
                              ) : (
                                <span style={{ fontSize: '11px', color: '#aaa' }}>No deadline</span>
                              )}
                              <span style={{ fontSize: '10px', color: '#bbb', marginLeft: '8px' }}>
                                Ends {job.lastDateToApply ? new Date(job.lastDateToApply).toLocaleDateString() : '—'}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isExpired) {
                                  if (!user) { alert('Please login to apply'); return; }
                                  setQuickJob(job);
                                }
                              }}
                              style={{
                                background: isExpired ? '#e5e5e5' : '#C6007E', color: isExpired ? '#999' : '#fff',
                                fontSize: '10px', fontWeight: 'black', padding: '7px 16px', borderRadius: '8px',
                                letterSpacing: '0.5px', textTransform: 'uppercase', border: 'none',
                                cursor: isExpired ? 'not-allowed' : 'pointer',
                              }}
                            >
                              {isExpired ? 'Closed' : 'Quick Apply'}
                            </button>
                          </div>
                        </div>
                      </div>
                  );
                })
              )}
            </div>

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

      {/* Quick Apply Popup */}
      {quickJob && !applyRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={(e) => { if (e.target === e.currentTarget) setQuickJob(null); }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white z-10 border-b border-stone-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <div>
                <h2 className="text-lg font-black tracking-tight text-[#3835A4]">{quickJob.title || 'Untitled'}</h2>
                <p className="text-xs text-stone-500 font-medium mt-0.5">{quickJob.company?.companyName || ''}</p>
              </div>
              <button onClick={() => setQuickJob(null)} className="text-stone-400 hover:text-stone-600 text-xl leading-none">&times;</button>
            </div>
            <div className="px-6 py-5 space-y-5">
              {quickJob.description && (
                <div>
                  <p className="text-[10px] font-extrabold tracking-widest text-stone-400 uppercase mb-2">Description</p>
                  <p className="text-sm text-stone-700 leading-relaxed">{stripHtml(quickJob.description).slice(0, 300)}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] font-extrabold tracking-widest text-stone-400 uppercase mb-3">
                  Roles ({quickJob.roles?.length || 0})
                </p>
                <div className="space-y-2">
                  {(quickJob.roles || []).map((role: any) => (
                    <div key={role.id} className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3 border border-stone-100">
                      <div>
                        <p className="text-sm font-bold text-[#3835A4]">{role.title || 'Untitled Role'}</p>
                        <p className="text-[10px] text-stone-500">
                          {role.gender && `${role.gender} · `}{role.ageMin && `${role.ageMin}${role.ageMax ? `-${role.ageMax}` : '+'} yrs`}
                          {role.noOfCast && ` · ${role.noOfCast} talent${role.noOfCast > 1 ? 's' : ''}`}
                        </p>
                      </div>
                      <button
                        onClick={() => setApplyRole(role)}
                        className="bg-[#C6007E] text-white px-4 py-2 rounded-lg font-black uppercase tracking-widest text-[10px] hover:bg-[#a10065] transition-all whitespace-nowrap ml-3"
                      >
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Application Popup */}
      {applyRole && (
        <ApplicationPopup
          jobId={quickJob?.id}
          role={applyRole}
          isExpired={false}
          onClose={() => setApplyRole(null)}
          onApplied={() => { setApplyRole(null); setQuickJob(null); }}
        />
      )}
    </div>
  );
};

export default BrowseJobs;