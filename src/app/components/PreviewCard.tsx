import React from 'react';
import { Skill,SkillLevel } from './Skills';

interface PreviewCardProps {
  formData: {
    Name: string;
    Email: string;
    Phone: string;
    City: string;
  };
  skills: Skill[];
  onEdit: () => void;
}

export default function PreviewCard({ formData, skills, onEdit }: PreviewCardProps) {
  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-green-600 text-white p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-bold mb-1">Candidate Profile</h2>
        <p className="text-sm sm:text-base">Successfully submitted!</p>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-300">
              <p className="text-xs font-medium text-gray-600 mb-1">Name</p>
              <p className="text-sm sm:text-base font-medium text-gray-900 break-words">{formData.Name}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-300">
              <p className="text-xs font-medium text-gray-600 mb-1">Email</p>
              <p className="text-sm sm:text-base font-medium text-gray-900 break-all">{formData.Email}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-300">
              <p className="text-xs font-medium text-gray-600 mb-1">Phone</p>
              <p className="text-sm sm:text-base font-medium text-gray-900">{formData.Phone}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-300">
              <p className="text-xs font-medium text-gray-600 mb-1">City</p>
              <p className="text-sm sm:text-base font-medium text-gray-900 break-words">{formData.City}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3">Skills</h3>
          <div>
            {skills.length === 0 ? (
        <p className="text-gray-500 text-center py-4 sm:py-5 text-sm sm:text-base bg-gray-50 rounded-lg border border-gray-300">No skills added</p>
      ) : (
        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-gray-300 ${getLevelColor(skill.level)}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white shadow-sm">{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
      )}
          </div>
        </div>

        <button
          onClick={onEdit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition active:scale-95"
        >
          Edit Information
        </button>
      </div>
    </div>
  );
}
