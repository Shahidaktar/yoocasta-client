import { useState } from 'react';
import { 
  addCareerHistory, updateCareerHistory, deleteCareerHistory, 
  addCourse, updateCourse, deleteCourse 
} from '../../../api/profile.api';

interface Props {
  existingProfile: any;
}

const CareerCourseTab = ({ existingProfile }: Props) => {
  const tp = existingProfile?.talentProfile;
  
  const [careers, setCareers] = useState<any[]>(tp?.careerHistory || []);
  const [courses, setCourses] = useState<any[]>(tp?.courses || []);
  
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  
  const [newCareer, setNewCareer] = useState({ title: '', description: '', startDate: '', endDate: '' });
  const [newCourse, setNewCourse] = useState({ title: '', institution: '', year: '' });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForms = () => {
    setNewCareer({ title: '', description: '', startDate: '', endDate: '' });
    setNewCourse({ title: '', institution: '', year: '' });
    setEditingCareerId(null);
    setEditingCourseId(null);
  };

  const handleAddCareer = async () => {
    if (!newCareer.title) return setError('Career title is required');
    try {
      setError('');
      await addCareerHistory(newCareer);
      setCareers(prev => [...prev, { id: 'temp-' + Date.now(), ...newCareer, startDate: newCareer.startDate || null, endDate: newCareer.endDate || null }]);
      setSuccess('Career added!');
      resetForms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add career');
    }
  };

  const handleUpdateCareer = async (historyId: string) => {
    try {
      setError('');
      await updateCareerHistory(historyId, newCareer);
      setCareers(prev => prev.map(c => c.id === historyId ? { ...c, ...newCareer } : c));
      setSuccess('Career updated!');
      setEditingCareerId(null);
      resetForms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update career');
    }
  };

  const handleDeleteCareer = async (historyId: string) => {
    if (!confirm('Delete this career history?')) return;
    try {
      await deleteCareerHistory(historyId);
      setCareers(prev => prev.filter(c => c.id !== historyId));
      setSuccess('Career deleted!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Failed to delete career');
    }
  };

  const handleAddCourse = async () => {
    if (!newCourse.title) return setError('Course title is required');
    try {
      setError('');
      await addCourse({ ...newCourse, year: newCourse.year ? parseInt(newCourse.year) : undefined });
      setCourses(prev => [...prev, { id: 'temp-' + Date.now(), ...newCourse }]);
      setSuccess('Course added!');
      resetForms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add course');
    }
  };

  const handleUpdateCourse = async (courseId: string) => {
    try {
      setError('');
      await updateCourse(courseId, newCourse);
      setCourses(prev => prev.map(c => c.id === courseId ? { ...c, ...newCourse } : c));
      setSuccess('Course updated!');
      setEditingCourseId(null);
      resetForms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update course');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Delete this course?')) return;
    try {
      await deleteCourse(courseId);
      setCourses(prev => prev.filter(c => c.id !== courseId));
      setSuccess('Course deleted!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Failed to delete course');
    }
  };

  return (
    <div>
      <h2>Career History & Courses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>✅ {success}</p>}

      {/* CAREER HISTORY */}
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h3>Career History ({careers.length})</h3>
          <button 
            onClick={() => { resetForms(); setEditingCareerId('new'); }} 
            style={{ background: '#28a745', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
          >
            + Add Career
          </button>
        </div>

        {/* Add/Edit Career Form */}
        {(editingCareerId === 'new' || editingCareerId) && (
          <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            <h4>{editingCareerId === 'new' ? 'Add Career' : 'Edit Career'}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                placeholder="Job Title *" 
                value={newCareer.title} 
                onChange={(e) => setNewCareer({ ...newCareer, title: e.target.value })} 
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <textarea 
                placeholder="Description (Optional)" 
                value={newCareer.description}
                onChange={(e) => setNewCareer({ ...newCareer, description: e.target.value })}
                rows={3}
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px' }}>Start Date (Optional)</label>
                  <input 
                    type="date" 
                    value={newCareer.startDate} 
                    onChange={(e) => setNewCareer({ ...newCareer, startDate: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px' }}>End Date (Optional)</label>
                  <input 
                    type="date" 
                    value={newCareer.endDate} 
                    onChange={(e) => setNewCareer({ ...newCareer, endDate: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => editingCareerId === 'new' ? handleAddCareer() : handleUpdateCareer(editingCareerId!)} 
                  style={{ flex: 1, background: '#28a745', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {editingCareerId === 'new' ? 'Save Career' : 'Update Career'}
                </button>
                <button 
                  onClick={() => { resetForms(); }} 
                  style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Career List */}
        {careers.map((career) => {
          const isTemp = editingCareerId !== career.id && career.id?.startsWith?.('temp-');
          return (
            <div key={career.id} style={{ 
              border: '1px solid #e0e0e0', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '10px',
              background: isTemp ? '#eaf5e9' : 'white' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0 }}>{career.title}</h4>
                  {(career.startDate || career.endDate) && (
                    <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '14px' }}>
                      {career.startDate && `From: ${new Date(career.startDate).toLocaleDateString()}`}
                      {career.endDate && ` To: ${new Date(career.endDate).toLocaleDateString()}`}
                    </p>
                  )}
                  {career.description && <p style={{ color: '#666', fontSize: '14px', margin: '5px 0 0 0' }}>{career.description}</p>}
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!isTemp && (
                    <button 
                      onClick={() => { 
                        setEditingCareerId(career.id); 
                        setNewCareer({ 
                          title: career.title, 
                          description: career.description || '', 
                          startDate: career.startDate?.split('T')[0] || '', 
                          endDate: career.endDate?.split('T')[0] || '' 
                        }); 
                      }} 
                      style={{ fontSize: '12px', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteCareer(career.id)} 
                    style={{ fontSize: '12px', color: '#dc3545', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* COURSES */}
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h3>Courses ({courses.length})</h3>
          <button 
            onClick={() => { resetForms(); setEditingCourseId('new'); }} 
            style={{ background: '#28a745', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
          >
            + Add Course
          </button>
        </div>

        {/* Add/Edit Course Form */}
        {(editingCourseId === 'new' || editingCourseId) && (
          <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            <h4>{editingCourseId === 'new' ? 'Add Course' : 'Edit Course'}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                placeholder="Course/Institution Name *" 
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} 
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input 
                placeholder="Institution (Optional)" 
                value={newCourse.institution}
                onChange={(e) => setNewCourse({ ...newCourse, institution: e.target.value })} 
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input 
                placeholder="Completion Year (e.g. 2020) *" 
                type="number"
                value={newCourse.year}
                onChange={(e) => setNewCourse({ ...newCourse, year: e.target.value })} 
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  onClick={() => editingCourseId === 'new' ? handleAddCourse() : handleUpdateCourse(editingCourseId!)} 
                  style={{ flex: 1, background: '#28a745', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {editingCourseId === 'new' ? 'Save Course' : 'Update Course'}
                </button>
                <button 
                  onClick={() => { resetForms(); }} 
                  style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Course List */}
        {courses.map((course) => (
          <div key={course.id} style={{ 
            border: '1px solid #e0e0e0', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '10px',
            background: editingCourseId === course.id ? '#fff3cd' : 'white' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0' }}>{course.title}</h4>
                {course.institution && <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '14px' }}>{course.institution}</p>}
                {course.year && <p style={{ color: '#666', fontSize: '14px', margin: '5px 0 0 0' }}>Year: {course.year}</p>}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => { setEditingCourseId(course.id); setNewCourse({ title: course.title, institution: course.institution || '', year: course.year || '' }); }} 
                  style={{ fontSize: '12px', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course.id)} 
                  style={{ fontSize: '12px', color: '#dc3545', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerCourseTab;