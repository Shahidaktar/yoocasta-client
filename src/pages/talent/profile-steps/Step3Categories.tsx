import { useState } from 'react';
import { FormOptions } from '../ProfileSetup';

interface Props {
  options: FormOptions;
  onSubmit: (data: any) => void;
  onBack: () => void;
  loading: boolean;
  existingProfile: any;
  isFirstTime: boolean;
}

// Category-specific attribute fields
const CATEGORY_ATTRIBUTES: Record<string, { key: string; label: string; type: 'text' | 'select'; options?: string[] }[]> = {
  'Singers': [
    { key: 'singing_language', label: 'Singing Language', type: 'text' },
    { key: 'style_of_songs', label: 'Style of Songs', type: 'text' },
    { key: 'singer_individual_or_band', label: 'Individual or Band', type: 'select', options: ['Individual', 'Band'] },
  ],
  'Dancers': [
    { key: 'style_of_dance', label: 'Style of Dance', type: 'text' },
    { key: 'dancer_individual_or_band', label: 'Individual or Band', type: 'select', options: ['Individual', 'Band'] },
  ],
  'Photographers': [
    { key: 'camera_worked_on', label: 'Cameras Worked On', type: 'text' },
    { key: 'photography_types', label: 'Photography Types', type: 'text' },
  ],
  'Directors': [
    { key: 'director_types_of_project', label: 'Types of Projects', type: 'text' },
    { key: 'director_assistant_level', label: 'Role Level', type: 'select', options: ['Lead', '1st Assistant', '2nd Assistant'] },
  ],
  'Cinematographers': [
    { key: 'cinematographer_cameras', label: 'Cameras Worked On', type: 'text' },
    { key: 'cinematographer_project_types', label: 'Types of Projects', type: 'text' },
  ],
  'Makeup Artists': [
    { key: 'makeup_project_types', label: 'Types of Projects', type: 'text' },
    { key: 'makeup_or_hairstylist', label: 'Specialization', type: 'select', options: ['Makeup', 'Hairstylist', 'Both'] },
  ],
  'Voice Over Artists': [
    { key: 'voiceover_project_types', label: 'Types of Projects', type: 'text' },
    { key: 'voiceover_role_type', label: 'Role Type', type: 'select', options: ['MC', 'MV', 'Voiceover', 'VJ'] },
  ],
};

const Step3Categories = ({ options, onSubmit, onBack, loading, existingProfile, isFirstTime }: Props) => {
    const tp = existingProfile?.talentProfile;

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    tp?.categories?.map((c: any) => c.categoryId) || []
  );

  const [attributes, setAttributes] = useState<Record<string, Record<string, string>>>(() => {
    const existing: Record<string, Record<string, string>> = {};
    tp?.attributes?.forEach((attr: any) => {
      if (!existing[attr.categoryId]) existing[attr.categoryId] = {};
      existing[attr.categoryId][attr.key] = attr.value;
    });
    return existing;
  });

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAttributeChange = (categoryId: string, key: string, value: string) => {
    setAttributes(prev => ({
      ...prev,
      [categoryId]: { ...(prev[categoryId] || {}), [key]: value }
    }));
  };

  const handleSubmit = () => {
    // Build attributes array
    const attributesArray: any[] = [];
    Object.entries(attributes).forEach(([categoryId, attrs]) => {
      Object.entries(attrs).forEach(([key, value]) => {
        if (value) attributesArray.push({ categoryId, key, value });
      });
    });

    onSubmit({ categoryIds: selectedCategories, attributes: attributesArray });
  };

  return (
    <div>
      <h2>Step 3 — Categories & Skills</h2>

      <div>
        <label>Select Your Categories</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '10px 0' }}>
          {options.categories.map((cat: any) => (
            <div
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              style={{
                padding: '8px 16px',
                border: '2px solid',
                borderColor: selectedCategories.includes(cat.id) ? '#333' : '#ddd',
                borderRadius: '20px',
                cursor: 'pointer',
                background: selectedCategories.includes(cat.id) ? '#333' : 'white',
                color: selectedCategories.includes(cat.id) ? 'white' : '#333',
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* Category-specific fields */}
      {selectedCategories.map(categoryId => {
        const category = options.categories.find((c: any) => c.id === categoryId);
        const fields = CATEGORY_ATTRIBUTES[category?.name] || [];
        if (fields.length === 0) return null;

        return (
          <div key={categoryId} style={{ border: '1px solid #ddd', padding: '15px', marginTop: '15px', borderRadius: '8px' }}>
            <h4>{category?.name} — Specific Details</h4>
            {fields.map(field => (
              <div key={field.key}>
                <label>{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    value={attributes[categoryId]?.[field.key] || ''}
                    onChange={(e) => handleAttributeChange(categoryId, field.key, e.target.value)}
                  >
                    <option value="">Select</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={attributes[categoryId]?.[field.key] || ''}
                    onChange={(e) => handleAttributeChange(categoryId, field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        );
      })}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="button" onClick={onBack}>← Back</button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || selectedCategories.length === 0}
        >
          {loading ? 'Saving...' : isFirstTime ? 'Save & Next →' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default Step3Categories;