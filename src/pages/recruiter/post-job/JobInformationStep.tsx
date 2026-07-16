import React, { useState } from 'react';

export default function JobInformationStep({ data, updateData, options, onNext }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleAddDate = (field: 'castingDates' | 'shootingDates', value: string) => {
    if (!value) return;
    updateData({ [field]: [...data[field], value] });
  };

  const handleRemoveDate = (field: 'castingDates' | 'shootingDates', index: number) => {
    const newDates = [...data[field]];
    newDates.splice(index, 1);
    updateData({ [field]: newDates });
  };

  if (data.castingService === 'manual') {
    return (
      <div className="space-y-6 text-center py-10">
        <select 
          name="castingService" 
          value={data.castingService} 
          onChange={handleChange}
          className="bg-transparent border-b-2 border-[#3835A4]/20 py-2 mx-auto block outline-none font-bold text-[#3835A4]"
        >
          <option value="portal">Portal Casting</option>
          <option value="manual">Manual Casting</option>
        </select>
        <div className="bg-[#3835A4]/5 p-6 rounded-xl border border-[#3835A4]/10 max-w-lg mx-auto">
          <h2 className="text-xl font-black mb-2 text-[#C6007E]">Manual Casting Selected</h2>
          <p className="font-medium text-[#3835A4]/80">
            Thank You for selecting Manual Casting. Please send an email to <a href="mailto:casting@yoocasta.com" className="underline font-bold">casting@yoocasta.com</a> with your requirements.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="border-b border-[#3835A4]/10 pb-4 mb-6">
        <h2 className="text-xl font-black uppercase text-[#C6007E]">Step 1: Job Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Casting Service *</label>
          <select name="castingService" value={data.castingService} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm font-bold outline-none cursor-pointer">
            <option value="portal">Portal</option>
            <option value="manual">Manual</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Job Title *</label>
          <input name="title" value={data.title} onChange={handleChange} required className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none focus:border-[#3835A4]" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Job Sub Title *</label>
          <input name="subTitle" value={data.subTitle} onChange={handleChange} required className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none focus:border-[#3835A4]" />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Description *</label>
          <textarea name="description" value={data.description} onChange={handleChange} required rows={4} className="w-full bg-[#3835A4]/5 border border-[#3835A4]/10 rounded-xl p-4 text-sm outline-none focus:border-[#3835A4] resize-none" />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Usage *</label>
          <input name="usage" value={data.usage} onChange={handleChange} required className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none focus:border-[#3835A4]" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Category *</label>
          <select name="categoryId" value={data.categoryId} onChange={handleChange} required className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
            <option value="">Select Category...</option>
            {options?.categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Project Type *</label>
          <select name="projectTypeId" value={data.projectTypeId} onChange={handleChange} required className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
            <option value="">Select Project Type...</option>
            {options?.projectTypes?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Payment Info *</label>
          <select name="paymentInfo" value={data.paymentInfo} onChange={handleChange} required className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
            <option value="">Select...</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Last Date To Apply *</label>
          <input type="date" name="lastDateToApply" value={data.lastDateToApply} onChange={handleChange} required className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none focus:border-[#3835A4]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#3835A4]/10 pt-8 mt-8">
        {/* Casting Location */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#3835A4]">Casting Location & Dates</h3>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Country</label>
            <select name="castingCountryId" value={data.castingCountryId} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
              <option value="">Select...</option>
              {options?.countries?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">City</label>
            <select name="castingCityId" value={data.castingCityId} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
              <option value="">Select...</option>
              {options?.cities?.filter((c: any) => !data.castingCountryId || c.countryId === data.castingCountryId).map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Casting Dates (Multiple)</label>
            <div className="flex gap-2">
              <input type="date" id="newCastingDate" className="flex-1 bg-transparent border-b-2 border-[#3835A4]/20 py-2 text-sm outline-none focus:border-[#3835A4]" />
              <button type="button" onClick={() => { const input = document.getElementById('newCastingDate') as HTMLInputElement; handleAddDate('castingDates', input.value); input.value = ''; }} className="bg-[#3835A4] text-white px-4 text-xs font-bold rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.castingDates.map((date: string, i: number) => (
                <span key={i} className="bg-[#3835A4]/10 text-[#3835A4] px-2 py-1 rounded text-xs flex items-center gap-2">
                  {date} <button type="button" onClick={() => handleRemoveDate('castingDates', i)} className="text-red-500 font-bold">&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Shoot Location */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#3835A4]">Shoot / Project Location</h3>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Country</label>
            <select name="shootingCountryId" value={data.shootingCountryId} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
              <option value="">Select...</option>
              {options?.countries?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">City</label>
            <select name="shootingCityId" value={data.shootingCityId} onChange={handleChange} className="w-full bg-transparent border-b-2 border-[#3835A4]/20 py-3 text-sm outline-none cursor-pointer">
              <option value="">Select...</option>
              {options?.cities?.filter((c: any) => !data.shootingCountryId || c.countryId === data.shootingCountryId).map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-extrabold tracking-widest text-[#3835A4]/50 uppercase">Shoot Dates (Multiple)</label>
            <div className="flex gap-2">
              <input type="date" id="newShootingDate" className="flex-1 bg-transparent border-b-2 border-[#3835A4]/20 py-2 text-sm outline-none focus:border-[#3835A4]" />
              <button type="button" onClick={() => { const input = document.getElementById('newShootingDate') as HTMLInputElement; handleAddDate('shootingDates', input.value); input.value = ''; }} className="bg-[#3835A4] text-white px-4 text-xs font-bold rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.shootingDates.map((date: string, i: number) => (
                <span key={i} className="bg-[#3835A4]/10 text-[#3835A4] px-2 py-1 rounded text-xs flex items-center gap-2">
                  {date} <button type="button" onClick={() => handleRemoveDate('shootingDates', i)} className="text-red-500 font-bold">&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button 
          type="button" 
          onClick={onNext}
          className="bg-[#C6007E] text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest hover:bg-[#a10065] transition-colors"
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
}
