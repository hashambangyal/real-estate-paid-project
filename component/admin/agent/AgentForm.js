import React, { useState, useRef } from "react";
import { ArrowLeft, Camera, Upload, X } from "lucide-react";

export default function AgentForm({
  mode = "new", // 'new' | 'edit'
  initialData = null,
  onSave,
  onCancel,
  isSubmitting = false,
}) {
  const isEdit = mode === "edit";
  const fileInputRef = useRef(null);


  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    facebook: initialData?.facebook || "",
    instagram: initialData?.instagram || "",
    bio: initialData?.bio || "",
    role: initialData?.role || "Real Estate Agent",
    status: initialData?.status || "Active",
    propertiesCount: initialData?.propertiesCount || 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.avatarUrl || '');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

 const handleImageUpload = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }
    setImageFile(file); // actual File — ye upload ke liye jayega

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // ye sirf preview ke liye
    };
    reader.readAsDataURL(file);
  }
};

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;

  const payload = new FormData();
  payload.append('name', formData.name);
  payload.append('email', formData.email);
  payload.append('phone', formData.phone);
  payload.append('facebook', formData.facebook || '');
  payload.append('instagram', formData.instagram || '');
  payload.append('bio', formData.bio || '');

  if (imageFile) {
    payload.append('image', imageFile);
  }

  onSave(payload);
};

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto font-sans space-y-6">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Agents</span>
        </button>
      </div>

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl lg:text-[28px] font-bold text-[#1A1D20] tracking-tight">
          {isEdit ? "Update Agent" : "Add New Agent"}
        </h1>
        <p className="text-xs sm:text-sm text-[#718096] mt-0.5">
          {isEdit
            ? "Edit the agent information."
            : "Fill in the details to create a new agent."}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Profile Picture Upload / Change */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageUpload}
                className="hidden"
              />

              {isEdit && imagePreview ? (
                /* Edit Mode: Circular avatar with Change Photo button */
                <div className="flex flex-col items-center space-y-3 py-4">
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt={formData.name || "Agent"}
                      className="w-28 h-28 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                    >
                      <Camera className="w-6 h-6" />
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-[#0B5A46] hover:underline cursor-pointer"
                    >
                      Change Photo
                    </button>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      JPG, PNG (Max 5MB)
                    </p>
                  </div>
                </div>
              ) : (
                /* New Mode (or no photo): Upload Box */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-square max-w-[240px] rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#0B5A46] bg-gray-50/60 hover:bg-gray-50 transition-all flex flex-col items-center justify-center p-6 cursor-pointer group"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover mb-2 border border-gray-200"
                      />
                      <span className="text-xs font-medium text-[#0B5A46]">
                        Replace photo
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-white shadow-2xs flex items-center justify-center text-gray-400 group-hover:text-[#0B5A46] mb-3 transition-colors">
                        <Camera className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 block mb-1">
                        Upload Profile Picture
                      </span>
                      <span className="text-[11px] text-gray-400">
                        JPG, PNG (Max 5MB)
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Input Fields */}
            <div className="md:col-span-8 space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter agent name"
                  className={`w-full h-10 px-3.5 bg-white border rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-[#0B5A46] focus:ring-[#0B5A46]"
                  }`}
                />
                {errors.name && (
                  <span className="text-[11px] text-red-500">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="agent@example.com"
                    className={`w-full h-10 px-3.5 bg-white border rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-[#0B5A46] focus:ring-[#0B5A46]"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-500">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                    className={`w-full h-10 px-3.5 bg-white border rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-[#0B5A46] focus:ring-[#0B5A46]"
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-red-500">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Facebook and Instagram */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700">
                    Facebook
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    placeholder="https://facebook.com/username"
                    className="w-full h-10 px-3.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0B5A46] focus:ring-1 focus:ring-[#0B5A46] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700">
                    Instagram
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/username"
                    className="w-full h-10 px-3.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0B5A46] focus:ring-1 focus:ring-[#0B5A46] transition-all"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about the agent..."
                  className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0B5A46] focus:ring-1 focus:ring-[#0B5A46] transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Form Actions (Cancel / Submit) */}
          <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#0B5A46] hover:bg-[#084A39] text-white rounded-xl text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{isEdit ? "Updating..." : "Adding..."}</span>
                </>
              ) : (
                <span>{isEdit ? "Update Agent" : "Create Agent"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
