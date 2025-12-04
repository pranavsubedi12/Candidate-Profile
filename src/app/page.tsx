'use client';

import {useState} from 'react';
import BasicInformation from './components/BasicInformation';
import Skills, { Skill } from './components/Skills';
import PreviewCard from './components/PreviewCard';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    City: ''
  });

  const [skills, setSkills] = useState<Skill[]>([]);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleAddSkill = (skill: Skill) => {
    setSkills((prevSkills) => [...prevSkills, skill]);
  };

  const handleEditSkill = (updatedSkill: Skill) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill))
    );
  };

  const handleDeleteSkill = (skillId: number) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
  };
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    setShowPreview(true);
  };

  const handleEdit = () => {
    setShowPreview(false);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-10 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Candidate Profile Form
          </h1>
          <p className="text-gray-600">
            {showPreview ? 'Review your profile' : 'Fill in your details'}
          </p>
        </div>

        {/* Progress Indicator */}
        {!showPreview && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                    currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white opacity-60'
                  }`}>
                  1
                </div>
                <span className={`text-xs sm:text-sm ${currentStep === 1 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>Basic Info</span>
              </div>
              
              <div className="w-12 sm:w-16 h-1 bg-gray-300 rounded-full overflow-hidden">
                <div className={`h-full bg-blue-600 transition-all duration-500 ${currentStep >= 2 ? 'w-full' : 'w-0'}`}></div>
              </div>
              
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                    currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                  2
                </div>
                <span className={`text-xs sm:text-sm ${currentStep === 2 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>Skills</span>
              </div>
            </div>
          </div>
        )}

        {/* Form Content */}
        {!showPreview ? (
          <>
            {currentStep === 1 && (
              <BasicInformation
                formData={formData}
                onInputChange={handleInputChange}
                onNext={handleNext}
              />
            )}  
            {currentStep === 2 && (
              <Skills
                skills={skills}
                onAddSkill={handleAddSkill}
                onDeleteSkill={handleDeleteSkill}
                onBack={handleBack}
                onSubmit={handleSubmit}
              />
            )}
          </>
        ) : (
          <PreviewCard
            formData={formData}
            skills={skills}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
} 