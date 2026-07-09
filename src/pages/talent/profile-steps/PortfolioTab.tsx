import { useState, useRef, useEffect } from 'react';
import { 
  uploadPortfolioMedia, 
  deletePortfolioMedia, 
  getPortfolioMedia, 
  addPortfolioLink, 
} from '../../../api/profile.api';

interface Props {
  existingProfile: any;
}

const MEDIA_TABS = ['All', 'Images', 'Videos', 'Audio'];
const MEDIA_TYPES = ['VIDEO', 'VIDEO_LINK', 'CASTING_VIDEO', 'ACTING_VIDEO'];

const PortfolioTab = ({ existingProfile }: Props) => {
  const [media, setMedia] = useState<any[]>(existingProfile?.talentProfile?.media || []);
  const [activeFilter, setActiveFilter] = useState('All');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Refs for hidden file inputs
  const imageRef = useRef<HTMLInputElement>(null);
  const actingVideoRef = useRef<HTMLInputElement>(null);
  const castingVideoRef = useRef<HTMLInputElement>(null);
  
  // State for Multiple Video Links
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [pendingLinks, setPendingLinks] = useState<{url: string, title: string, type: string}[]>([]);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkType, setLinkType] = useState('VIDEO_LINK');

  // State for Multiple Audio Files (with names)
  const [showAudioForm, setShowAudioForm] = useState(false);
  const [pendingAudios, setPendingAudios] = useState<{file: File, title: string}[]>([]);
  const [audioTitle, setAudioTitle] = useState('');

  useEffect(() => {
    getPortfolioMedia()
      .then(res => setMedia(res.data?.data || res.data || []))
      .catch(console.error);
  }, []);

  const filteredMedia = media.filter(m => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Images') return m.type === 'IMAGE';
    if (activeFilter === 'Videos') return MEDIA_TYPES.includes(m.type);
    if (activeFilter === 'Audio') return m.type === 'AUDIO';
    return true;
  });

  const getFilterCount = (tab: string) => {
    if (tab === 'All') return media.length;
    if (tab === 'Images') return media.filter(m => m.type === 'IMAGE').length;
    if (tab === 'Videos') return media.filter(m => MEDIA_TYPES.includes(m.type)).length;
    if (tab === 'Audio') return media.filter(m => m.type === 'AUDIO').length;
    return 0;
  };

  // --- HANDLERS FOR MULTIPLE FILE UPLOADS ---
  // Note: This loops through files and uploads one by one. 
  // This works with your CURRENT .single() backend. If you update backend to .array(), this can be optimized.
  const handleMultipleFileUpload = async (files: FileList | null, type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'ACTING_VIDEO' | 'CASTING_VIDEO') => {
    if (!files || files.length === 0) return;
    try {
      setUploading(true); setError(''); setSuccess('');
      
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        formData.append('type', type);
        const res = await uploadPortfolioMedia(formData);
        setMedia(prev => [...prev, res.data?.data || res.data]);
      }
      
      setSuccess(`${files.length} file(s) uploaded!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally { 
      setUploading(false); 
    }
  };

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Delete this file?')) return;
    try {
      await deletePortfolioMedia(mediaId);
      setMedia(prev => prev.filter(m => m.id !== mediaId));
      setSuccess('Deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Failed to delete');
    }
  };

  // --- HANDLERS FOR MULTIPLE VIDEO LINKS ---
   const addLinkToList = () => {
    setError(''); // Clear any previous error messages immediately
    if (!linkUrl.trim()) return setError('Video link is required');
    setPendingLinks(prev => [...prev, { url: linkUrl, title: linkTitle, type: linkType }]);
    setLinkUrl(''); setLinkTitle(''); // Reset inputs for next link
  };

  const removeLinkFromList = (index: number) => {
    setPendingLinks(prev => prev.filter((_, i) => i !== index));
  };

    const handleUploadAllLinks = async () => {
    if (pendingLinks.length === 0) return;
    try {
      setUploading(true); setError('');
      for (const link of pendingLinks) {
        // Map 'url' to 'videoLink' to match what the backend expects
        const res = await addPortfolioLink({ 
          videoLink: link.url, 
          title: link.title, 
          type: link.type 
        });
        setMedia(prev => [...prev, res.data?.data || res.data]);
      }
      setSuccess(`${pendingLinks.length} link(s) added!`);
      setPendingLinks([]);
      setShowLinkForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      // Check if the error message contains "Missing URL"
      const msg = err.response?.data?.message || err.message || '';
      
      if (msg.includes('Missing URL')) {
        setError('URL is missing. Please ensure you are entering the full link.');
      } else {
        setError(msg || 'Failed to add links');
      }
    } finally { setUploading(false); }
  };

  // --- HANDLERS FOR MULTIPLE AUDIOS (WITH NAMES) ---
  const handleAddAudioToList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingAudios(prev => [...prev, { file, title: audioTitle || file.name }]);
    setAudioTitle(''); // Reset name input
    e.target.value = ''; // Reset file input so same file can be selected again
  };

  const removeAudioFromList = (index: number) => {
    setPendingAudios(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadAllAudios = async () => {
    if (pendingAudios.length === 0) return;
    try {
      setUploading(true); setError('');
      for (const item of pendingAudios) {
        const formData = new FormData();
        formData.append('file', item.file);
        formData.append('type', 'AUDIO');
        // Note: If you want to pass the custom title to backend, 
        // you need to add a 'title' field in your backend multer/service. 
        // Currently, it just uploads the file.
        const res = await uploadPortfolioMedia(formData);
        setMedia(prev => [...prev, res.data?.data || res.data]);
      }
      setSuccess(`${pendingAudios.length} audio(s) uploaded!`);
      setPendingAudios([]);
      setShowAudioForm(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload audios');
    } finally { setUploading(false); }
  };

  return (
    <div>
      <h2>Portfolio</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>✅ {success}</p>}

      {/* Hidden File Inputs */}
      <input type="file" ref={imageRef} accept="image/*" multiple style={{ display: 'none' }} onChange={(e) => handleMultipleFileUpload(e.target.files, 'IMAGE')} />
      <input type="file" ref={actingVideoRef} accept="video/*" multiple style={{ display: 'none' }} onChange={(e) => handleMultipleFileUpload(e.target.files, 'ACTING_VIDEO')} />
      <input type="file" ref={castingVideoRef} accept="video/*" multiple style={{ display: 'none' }} onChange={(e) => handleMultipleFileUpload(e.target.files, 'CASTING_VIDEO')} />

      {/* Upload Action Row */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => imageRef.current?.click()} disabled={uploading}>📷 Upload Images</button>
        <button onClick={() => actingVideoRef.current?.click()} disabled={uploading}>🎬 Upload Acting Videos</button>
        <button onClick={() => castingVideoRef.current?.click()} disabled={uploading}>🎥 Upload Casting Videos</button>
        <button onClick={() => { setShowAudioForm(!showAudioForm); setShowLinkForm(false); }} disabled={uploading}>🎵 Upload Audios</button>
        <button onClick={() => { setShowLinkForm(!showLinkForm); setShowAudioForm(false); }} disabled={uploading}>🔗 Add Video Links</button>
        {uploading && <span>Processing...</span>}
      </div>

      {/* MULTI-LINK OVERLAY FORM */}
      {showLinkForm && (
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px', background: '#fafafa' }}>
          <h4>Add Multiple Video Links</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input 
              type="text" 
              placeholder="https://youtube.com/..." 
              value={linkUrl} 
              onChange={(e) => setLinkUrl(e.target.value)} 
              onKeyDown={(e) => { 
                if (e.key === 'Enter') { 
                  e.preventDefault(); // Prevents page refresh
                  addLinkToList(); 
                } 
              }}
              style={{ flex: 1, padding: '8px' }} 
            />
            <input type="text" placeholder="Title (opt)" value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} style={{ width: '150px', padding: '8px' }} />
            <select value={linkType} onChange={(e) => setLinkType(e.target.value)} style={{ padding: '8px' }}>
              <option value="VIDEO_LINK">Generic</option>
              <option value="ACTING_VIDEO">Acting</option>
              <option value="CASTING_VIDEO">Casting</option>
            </select>
            <button onClick={addLinkToList} style={{ background: '#ccc', border: 'none', padding: '8px 12px' }}>+ Add to List</button>
          </div>

          {/* Pending Links List */}
          {pendingLinks.length > 0 && (
            <div style={{ marginBottom: '10px' }}>
              {pendingLinks.map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '5px 10px', marginBottom: '5px', border: '1px solid #eee', borderRadius: '4px' }}>
                  <span style={{ fontSize: '14px' }}><strong>{l.type}:</strong> {l.title || l.url}</span>
                  <button onClick={() => removeLinkFromList(i)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
                </div>
              ))}
              <button onClick={handleUploadAllLinks} disabled={uploading} style={{ background: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}>
                Save All Links ({pendingLinks.length})
              </button>
            </div>
          )}
          <button onClick={() => setShowLinkForm(false)} style={{ color: '#dc3545', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
        </div>
      )}

      {/* MULTI-AUDIO OVERLAY FORM */}
      {showAudioForm && (
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px', background: '#fafafa' }}>
          <h4>Upload Multiple Audios</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input type="text" placeholder="Audio Name/Title" value={audioTitle} onChange={(e) => setAudioTitle(e.target.value)} style={{ flex: 1, padding: '8px' }} />
            <label style={{ padding: '8px 16px', background: '#007bff', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
              Choose Audio File
              <input type="file" accept="audio/*" style={{ display: 'none' }} onChange={handleAddAudioToList} />
            </label>
          </div>

          {/* Pending Audios List */}
          {pendingAudios.length > 0 && (
            <div style={{ marginBottom: '10px' }}>
              {pendingAudios.map((a, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '5px 10px', marginBottom: '5px', border: '1px solid #eee', borderRadius: '4px' }}>
                  <span style={{ fontSize: '14px' }}>🎵 {a.title}</span>
                  <button onClick={() => removeAudioFromList(i)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
                </div>
              ))}
              <button onClick={handleUploadAllAudios} disabled={uploading} style={{ background: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}>
                Upload All Audios ({pendingAudios.length})
              </button>
            </div>
          )}
          <button onClick={() => setShowAudioForm(false)} style={{ color: '#dc3545', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
        </div>
      )}

      {/* Media Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        {MEDIA_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            style={{
              padding: '6px 14px',
              background: activeFilter === tab ? '#333' : '#eee',
              color: activeFilter === tab ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {tab} ({getFilterCount(tab)})
          </button>
        ))}
      </div>

      {/* Standard Grid Layout (NO DRAG AND DROP) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
        {filteredMedia.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
            No {activeFilter.toLowerCase()} yet — upload some above
          </p>
        ) : (
          filteredMedia.map((item: any) => (
            <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', position: 'relative', background: '#fff' }}>
              
              {item.type === 'IMAGE' && (
                <img src={item.url} alt={item.caption || ''} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              )}
              {(item.type === 'VIDEO' || item.type === 'ACTING_VIDEO' || item.type === 'CASTING_VIDEO') && (
                <div style={{ position: 'relative', height: '160px', background: '#000' }}>
                  <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} controls />
                  {item.type !== 'VIDEO' && (
                    <div style={{ position: 'absolute', top: '5px', left: '5px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>
                      {item.type}
                    </div>
                  )}
                </div>
              )}
              {item.type === 'VIDEO_LINK' && (
                <div style={{ height: '160px', background: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '15px', textAlign: 'center' }}>
                  <span style={{ fontSize: '30px' }}>🔗</span>
                  <p style={{ fontSize: '12px', margin: '5px 0', wordBreak: 'break-all' }}>{item.caption || 'Video Link'}</p>
                  <a href={item.videoLink} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: '#007bff' }}>Open in new tab ↗</a>
                </div>
              )}
              {item.type === 'AUDIO' && (
                <div style={{ height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', padding: '10px' }}>
                  <span style={{ fontSize: '30px' }}>🎵</span>
                  <p style={{ fontSize: '12px', textAlign: 'center', margin: '5px 0' }}>{item.caption || item.title || 'Audio file'}</p>
                  <audio src={item.url} controls style={{ width: '100%' }} />
                </div>
              )}
              
              <div style={{ padding: '8px' }}>
                <p style={{ fontSize: '12px', margin: 0, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.caption || item.title || item.type}
                </p>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ marginTop: '5px', background: '#dc3545', color: 'white', border: 'none', padding: '3px 8px', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PortfolioTab;