import { useState } from "react";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Skill{
  id: number;
  name: string;
  level: SkillLevel;
}

interface SkillsProps {
  skills:Skill[];
  onAddSkill: (skill: Skill) => void;
  onDeleteSkill: (id: number) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function Skills({ skills, onAddSkill, onDeleteSkill, onBack, onSubmit }: SkillsProps) {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("Beginner");
  const [error, setError] = useState("");

  const handleAddSkill = () => {
    if(skillName.trim() === ""){
      setError("Please enter a skill name");
      return;
    }

    setError("");
    const newSkill: Skill ={
      id: Date.now(),
      name: skillName.trim(),
      level: skillLevel
    };

    onAddSkill(newSkill);
    setSkillName("");
    setSkillLevel("Beginner");
  };

  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault();

    if(skills.length ===0){
      setError("Please add at least one skill");
      return;
    }

    onSubmit();
  };
  
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

  return(
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5">Skills</h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-300">
          <h3 className="text-base font-semibold text-gray-700 mb-4">Add a Skill</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="skillName" className="block text-sm font-semibold text-gray-700 mb-2">Skill Name</label>
              <input
                type="text"
                id="skillName"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="e.g., React, Python, UI Design"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              />
            </div>
            <div>
              <label htmlFor="skillLevel" className="block text-sm font-semibold text-gray-700 mb-2">Skill Level</label>
              <select
                id="skillLevel"
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <button 
              type="button" 
              onClick={handleAddSkill}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              Add Skill
            </button>
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-700 mb-3">Your Skills ({skills.length})</h3>

        {skills.length === 0 ? (
          <p className="text-gray-500 text-center py-8 italic bg-gray-50 rounded-lg border border-gray-300">No skills added yet</p>
        ) : (
          <div className="space-y-2.5 sm:space-y-3">
            {skills.map((skill) => (
              <div key={skill.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 p-3 sm:p-4 border-2 rounded-lg ${getLevelColor(skill.level)} shadow-sm hover:shadow-md transition`}>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">{skill.name}</span>
                  <span className="text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-white shadow-sm">{skill.level}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => onDeleteSkill(skill.id)}
                  className="text-red-600 hover:text-white hover:bg-red-600 px-3 py-1.5 rounded-lg font-medium transition text-sm sm:text-base active:scale-95 self-start sm:self-auto"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 pt-4 border-t border-gray-300">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 sm:py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition active:scale-95"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition active:scale-95"
          >
            Submit
          </button>
        </div>
        
      </form>
    </div>
  );
}
