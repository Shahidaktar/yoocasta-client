import React, { useState } from 'react';

const INITIAL_ROLE = {
  title: '',
  description: '',
  usage: '',
  experience: [] as string[],
  ethnicityId: '',
  nationalityId: '',
  noOfCast: '',
  gender: '',
  ageMin: '',
  ageMax: '',
  languageIds: [] as string[],
  dialectIds: [] as string[],
  locationCityId: '',
  locationCountryId: '',
  question1: '',
  question2: '',
  question3: '',
  requiredProfileVideo: false,
  requiredCastingVideo: false,
  paymentType: '',
  paymentDetails: {} as any
};

const EXP_OPTIONS = ['Any', 'Amature', 'Intermediate', 'Experienced', 'Professional'];

export default function RolesStep({ roles, setRoles, jobPaymentInfo, options, onBack, onSubmit, submitting }: any) {
  const [form, setForm] = useState({ ...INITIAL_ROLE });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(roles.length === 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      paymentDetails: { ...form.paymentDetails, [e.target.name]: e.target.value }
    });
  };

  const handleMultiSelect = (field: string, value: string) => {
    const current = [...(form as any)[field]];
    if (current.includes(value)) {
      setForm({ ...form, [field]: current.filter(v => v !== value) });
    } else {
      setForm({ ...form, [field]: [...current, value] });
    }
  };

  const handleSaveRole = () => {
    if (!form.title) return alert('Role Title is required');
    if (editingIndex !== null) {
      const updated = [...roles];
      updated[editingIndex] = form;
      setRoles(updated);
      setEditingIndex(null);
    } else {
      setRoles([...roles, form]);
    }
    setForm({ ...INITIAL_ROLE });
    setShowForm(false);
  };

  const editRole = (index: number) => {
    setForm(roles[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const removeRole = (index: number) => {
    const updated = [...roles];
    updated.splice(index, 1);
    setRoles(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="border-b border-[#3835A4]/10 pb-4 flex justify-between items-center">
        <h2 className="text-xl font-black uppercase text-[#C6007E]">Step 2: Roles Configuration</h2>
        <button type="button" onClick={onBack} className="text-[#3835A4] text-sm font-bold">&larr; Back to Job Info</button>
      </div>

      {/* Role List */}
      {roles.length > 0 && (
        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-[#3835A4]">Added Roles</h3>
          {roles.map((r: any, i: number) => (
            <div key={i} className="bg-[#3835A4]/5 p-4 rounded-xl border border-[#3835A4]/20 flex justify-between items-center">
              <div>
                <h4 className="font-black text-[#C6007E] uppercase">{r.title}</h4>
                <p className="text-xs text-[#3835A4]/70">{r.noOfCast} Casts • Gender: {r.gender} • Ages: {r.ageMin}-{r.ageMax}</p>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => editRole(i)} className="text-sm font-bold text-[#3835A4] hover:underline">Edit</button>
                <button type="button" onClick={() => removeRole(i)} className="text-sm font-bold text-red-500 hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Role Form */}
      {showForm ? (
        <div className="bg-white border-2 border-[#3835A4]/10 p-6 rounded-2xl shadow-sm space-y-6">
          <h3 className="font-black text-[#3835A4]">{editingIndex !== null ? 'Edit Role' : 'Add New Role'}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Role Title *</label>
              <input name="title" value={form.title} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none focus:border-[#3835A4]" />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full bg-[#3835A4]/5 border border-[#3835A4]/10 rounded-xl p-4 text-sm outline-none focus:border-[#3835A4] resize-none" />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Role Usage *</label>
              <input name="usage" value={form.usage} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none focus:border-[#3835A4]" />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Experience *</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {EXP_OPTIONS.map(exp => (
                  <label key={exp} className="flex items-center gap-2 text-sm text-[#3835A4]">
                    <input type="checkbox" checked={form.experience.includes(exp)} onChange={() => handleMultiSelect('experience', exp)} className="accent-[#C6007E]" />
                    {exp}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Ethnicity *</label>
              <select name="ethnicityId" value={form.ethnicityId} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
                <option value="">Select...</option>
                {options?.ethnicities?.map((e: any) => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Nationality *</label>
              <select name="nationalityId" value={form.nationalityId} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
                <option value="">Select...</option>
                {options?.nationalities?.map((n: any) => <option key={n.id} value={n.id}>{n.name}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">No of Casts *</label>
              <input type="number" name="noOfCast" value={form.noOfCast} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none focus:border-[#3835A4]" />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Gender *</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="male and female">Male and Female</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Age From *</label>
              <input type="number" name="ageMin" value={form.ageMin} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none focus:border-[#3835A4]" />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Age To *</label>
              <input type="number" name="ageMax" value={form.ageMax} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none focus:border-[#3835A4]" />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Location from where talent can Apply *</label>
              <div className="flex gap-4">
                <select name="locationCountryId" value={form.locationCountryId} onChange={handleChange} className="flex-1 bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
                  <option value="">Country</option>
                  {options?.countries?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <select name="locationCityId" value={form.locationCityId} onChange={handleChange} className="flex-1 bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
                  <option value="">City</option>
                  {options?.cities?.filter((c: any) => !form.locationCountryId || c.countryId === form.locationCountryId).map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            
            <div className="space-y-4 md:col-span-2 border-t border-[#3835A4]/10 pt-6">
               <h4 className="font-bold text-[#3835A4]">Post Questions</h4>
               <input name="question1" value={form.question1} onChange={handleChange} placeholder="Question 1" className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-2 text-sm outline-none focus:border-[#3835A4]" />
               <input name="question2" value={form.question2} onChange={handleChange} placeholder="Question 2" className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-2 text-sm outline-none focus:border-[#3835A4]" />
               <input name="question3" value={form.question3} onChange={handleChange} placeholder="Question 3" className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-2 text-sm outline-none focus:border-[#3835A4]" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm text-[#3835A4]">
                <input type="checkbox" name="requiredActingVideo" checked={form.requiredActingVideo} onChange={handleChange} className="accent-[#C6007E]" />
                Required to Upload Acting Video
              </label>
              <label className="flex items-center gap-2 text-sm text-[#3835A4]">
                <input type="checkbox" name="requiredCastingVideo" checked={form.requiredCastingVideo} onChange={handleChange} className="accent-[#C6007E]" />
                Required to Upload Casting Video
              </label>
            </div>

            {/* Payment Section - Only if Paid */}
            {jobPaymentInfo === 'paid' && (
              <div className="space-y-4 md:col-span-2 border-t border-[#3835A4]/10 pt-6 bg-green-50/50 -mx-6 px-6 pb-6 rounded-b-2xl">
                <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase mt-6">Payment Type *</label>
                <select name="paymentType" value={form.paymentType} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
                  <option value="">Select Payment Type...</option>
                  <option value="per_hour">Per Hour</option>
                  <option value="per_day">Per Day</option>
                  <option value="per_week">Per Week</option>
                  <option value="per_month">Per Month</option>
                  <option value="package">Package</option>
                </select>

                {form.paymentType === 'per_hour' && (
                  <div className="grid grid-cols-3 gap-4">
                    <input type="number" name="hoursPerDay" placeholder="No of Hours/Day" onChange={handlePaymentChange} className="border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                    <input type="number" name="budgetPerHour" placeholder="Budget/Hour (AED)" onChange={handlePaymentChange} className="border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                    <input type="number" name="noOfDays" placeholder="No of Days" onChange={handlePaymentChange} className="border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                  </div>
                )}

                {form.paymentType === 'per_day' && (
                  <div className="space-y-4">
                    <p className="text-xs text-[#C6007E] font-bold">The talent budget will be the total of half day and full day budget. Enter accordingly!</p>
                    <div className="grid grid-cols-2 gap-4 border-l-2 border-[#3835A4]/20 pl-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#3835A4]">No of Days</label>
                        <input type="number" name="fullDay" placeholder="Full Day" onChange={handlePaymentChange} className="w-full border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                        <input type="number" name="halfDay" placeholder="Half Day" onChange={handlePaymentChange} className="w-full border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#3835A4]">Budget (AED)</label>
                        <input type="number" name="budgetFullDay" placeholder="Full Day Budget" onChange={handlePaymentChange} className="w-full border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                        <input type="number" name="budgetHalfDay" placeholder="Half Day Budget" onChange={handlePaymentChange} className="w-full border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                {form.paymentType === 'per_week' && (
                  <div className="grid grid-cols-3 gap-4">
                    <input type="number" name="noOfWeek" placeholder="No of Week" onChange={handlePaymentChange} className="border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                    <input type="number" name="daysPerWeek" placeholder="No of Day/Week" onChange={handlePaymentChange} className="border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                    <input type="number" name="budgetPerWeek" placeholder="Budget/Week (AED)" onChange={handlePaymentChange} className="border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                  </div>
                )}

                {form.paymentType === 'per_month' && (
                  <div className="grid grid-cols-3 gap-4">
                    <input type="number" name="noOfMonth" placeholder="No of Months" onChange={handlePaymentChange} className="border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                    <input type="number" name="daysPerMonth" placeholder="No of Days/Month" onChange={handlePaymentChange} className="border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                    <input type="number" name="budgetPerMonth" placeholder="Budget/Month (AED)" onChange={handlePaymentChange} className="border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                  </div>
                )}

                {form.paymentType === 'package' && (
                  <div className="grid grid-cols-2 gap-4 border-l-2 border-[#3835A4]/20 pl-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#3835A4]">Total no of days</label>
                      <input type="number" name="fullDay" placeholder="Full Day" onChange={handlePaymentChange} className="w-full border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                      <input type="number" name="halfDay" placeholder="Half Day" onChange={handlePaymentChange} className="w-full border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#3835A4]">Talent Total Budget (AED)</label>
                      <input type="number" name="totalBudget" placeholder="Total Budget" onChange={handlePaymentChange} className="w-full border-b-2 border-[#3835A4]/20 py-2 text-sm bg-transparent outline-none" />
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>

          <div className="flex justify-end pt-4">
            <button type="button" onClick={handleSaveRole} className="bg-[#3835A4] text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#2a2780]">
              Save Role
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setShowForm(true)} className="w-full py-4 border-2 border-dashed border-[#3835A4]/30 rounded-xl text-[#3835A4] font-bold hover:bg-[#3835A4]/5 transition-colors">
          + Add Another Role
        </button>
      )}

      {/* Final Submit */}
      <div className="flex justify-between pt-8 border-t border-[#3835A4]/10">
        <div className="text-xs text-[#3835A4]/50 italic">Jobs require admin approval after posting.</div>
        <button 
          type="button" 
          onClick={onSubmit}
          disabled={submitting || roles.length === 0}
          className="bg-[#C6007E] disabled:bg-[#C6007E]/50 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#a10065] transition-colors"
        >
          {submitting ? 'Posting...' : 'Finish & Post Job'}
        </button>
      </div>
    </div>
  );
}
