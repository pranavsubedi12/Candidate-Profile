import React, { useState } from 'react';

interface BasicInformation{
  formData :{
  Name: string,
  Email: string,
  Phone: string,
  City: string

};
onInputChange: (field: string, value: string) => void;
onNext: () => void;
}


export default function BasicInformation({ formData, onInputChange, onNext }: BasicInformation) {
  const [errors, setErrors] = useState({
    Name: '',
    Email: '',
    Phone: '',
    City: ''
  });

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      Name: '',
      Email: '',
      Phone: '',
      City: ''
    };

    //Basic Validation
    if(!formData.Name.trim()){
      newErrors.Name = "Please enter your name";
    }
    if(!formData.Email.trim() || !formData.Email.includes("@")){
      newErrors.Email = "Please enter a valid email";
    }
    if(!formData.Phone.trim()){
      newErrors.Phone = "Please enter your phone number";
    } else if(formData.Phone.replace(/\D/g, '').length !== 10){
      newErrors.Phone = "Phone number must be exactly 10 digits";
    }
    if(!formData.City.trim()){
      newErrors.City = "Please enter your city";
    }

    setErrors(newErrors);

    // If no errors, proceed to next step
    if(!newErrors.Name && !newErrors.Email && !newErrors.Phone && !newErrors.City){
      onNext();
    }
  };

  return(
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 border-b border-gray-200">Basic Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Name <span className="text-red-600">*</span></label>
          <input
            type="text"
            value={formData.Name}
            onChange={(e) => onInputChange("Name", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter your full name"
          />
          {errors.Name && <p className="text-red-600 text-sm mt-1.5">{errors.Name}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-600">*</span></label>
          <input
            type="email"
            value={formData.Email}
            onChange={(e) => onInputChange("Email", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="your.email@example.com"
          />
          {errors.Email && <p className="text-red-600 text-sm mt-1.5">{errors.Email}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone <span className="text-red-600">*</span></label>
          <input
            type="tel"
            value={formData.Phone}
            onChange={(e) => onInputChange("Phone", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="+977-9855335687"
          />
          {errors.Phone && <p className="text-red-600 text-sm mt-1.5">{errors.Phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">City <span className="text-red-600">*</span></label>
          <input
            type="text"
            value={formData.City}
            onChange={(e) => onInputChange("City", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter your city"
          />
          {errors.City && <p className="text-red-600 text-sm mt-1.5">{errors.City}</p>}
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-3.5 px-4 rounded-lg mt-6 shadow-md hover:shadow-lg transition active:scale-95"
        >
          Next
        </button>
      </form>
    </div>
  )

}