import React, { useState } from "react";
import { format } from 'date-fns';

export default function Edit() {
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);
  const [showSaveSuccessPopup, setShowSaveSuccessPopup] = useState(false);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  // State for Personal Information fields and their errors
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');

  // State for Professional Information fields and their errors
  const [professionArea, setProfessionArea] = useState('');
  const [professionAreaError, setProfessionAreaError] = useState('');
  const [professionSpecialization, setProfessionSpecialization] = useState('');
  const [professionSpecializationError, setProfessionSpecializationError] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [workExperienceError, setWorkExperienceError] = useState('');
  const [activityArea, setActivityArea] = useState('');
  const [activityAreaError, setActivityAreaError] = useState('');

  // State for Education and Skills fields and their errors
  const [educationLevel, setEducationLevel] = useState('');
  const [educationLevelError, setEducationLevelError] = useState('');
  const [educationSpecialization, setEducationSpecialization] = useState('');
  const [educationSpecializationError, setEducationSpecializationError] = useState('');
  const [languageSkills, setLanguageSkills] = useState([]);
  const [languageSkillsError, setLanguageSkillsError] = useState('');

  const registrationDate = new Date("2025-08-11");
  const formattedRegistrationDate = format(registrationDate, 'dd MMMM');

  // Utility function to check for Azerbaijani characters
  const isAzerbaijaniLetter = (char) => {
    return /^[a-zA-ZçÇəƏğĞıİöÖşŞüÜ]+$/.test(char);
  };

  // --- Validation Functions ---

  const validateFirstName = (name) => {
    if (!name.trim()) {
      setFirstNameError("Zəhmət olmasa, məlumatları daxil edin.");
      return false;
    }
    if (!/^[a-zA-ZçÇəƏğĞıİöÖşŞüÜ\s]*$/.test(name)) {
      setFirstNameError("Yalnız Azərbaycan hərfləri ilə yazılmalıdır.");
      return false;
    }
    if (name.length > 20) {
      setFirstNameError("Maksimum 20 simvol.");
      return false;
    }
    setFirstNameError('');
    return true;
  };

  const validateLastName = (surname) => {
    if (!surname.trim()) {
      setLastNameError("Zəhmət olmasa, məlumatları daxil edin.");
      return false;
    }
    if (!/^[a-zA-ZçÇəƏğĞıİöÖşŞüÜ\s]*$/.test(surname)) {
      setLastNameError("Yalnız Azərbaycan hərfləri ilə yazılmalıdır.");
      return false;
    }
    if (surname.length > 20) {
      setLastNameError("Maksimum 20 simvol.");
      return false;
    }
    setLastNameError('');
    return true;
  };

  const validateBirthDate = (date) => {
    if (!date) {
      setBirthDateError("Zəhmət olmasa, məlumatları daxil edin.");
      return false;
    }
    setBirthDateError('');
    return true;
  };

  const validateMobileNumber = (number) => {
    if (!number.trim()) {
      setMobileNumberError("Zəhmət olmasa, məlumatları daxil edin.");
      return false;
    }
    const cleanedNumber = number.replace(/[^0-9]/g, '');
    if (!/^\d{9}$/.test(cleanedNumber)) {
      setMobileNumberError("Mobil nömrə düzgün daxil edilməyib. 50 123 45 67 formatında daxil edin.");
      return false;
    }
    setMobileNumberError('');
    return true;
  };

  const validatePassword = (pwd) => {
    if (!pwd.trim()) {
      setPasswordError("Zəhmət olmasa, məlumatları daxil edin.");
      return false;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#\-_+])[A-Za-z\d!@#\-_+]{8,15}$/;
    if (!passwordRegex.test(pwd)) {
      setPasswordError("Şifrəniz 8-15 simvol aralığından ibarət olmalı, özündə minimum bir böyük hərf, rəqəm və xüsusi simvol (məsələn: !, @, #, -, _) ehtiva etməlidir.");
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateGender = (selectedGender) => {
    if (!selectedGender) {
      setGenderError("Zəhmət olmasa, seçim edin.");
      return false;
    }
    setGenderError('');
    return true;
  };

  const validateProfessionArea = (area) => {
    if (!area) {
      setProfessionAreaError("Zəhmət olmasa, peşə sahəsini seçin.");
      return false;
    }
    setProfessionAreaError('');
    return true;
  };

  const validateProfessionSpecialization = (specialization) => {
    if (!specialization) {
      setProfessionSpecializationError("Zəhmət olmasa, peşə ixtisasını seçin.");
      return false;
    }
    setProfessionSpecializationError('');
    return true;
  };

  const validateWorkExperience = (experience) => {
    if (!experience || experience <= 0) {
      setWorkExperienceError("Zəhmət olmasa, iş təcrübəsini daxil edin.");
      return false;
    }
    setWorkExperienceError('');
    return true;
  };

  const validateActivityArea = (area) => {
    if (!area) {
      setActivityAreaError("Zəhmət olmasa, fəaliyyət göstərdiyi ərazini seçin.");
      return false;
    }
    setActivityAreaError('');
    return true;
  };

  const validateEducationLevel = (level) => {
    if (!level) {
      setEducationLevelError("Zəhmət olmasa, təhsil səviyyəsini seçin.");
      return false;
    }
    setEducationLevelError('');
    return true;
  };

  const validateEducationSpecialization = (specialization) => {
    if (!specialization.trim()) {
      setEducationSpecializationError("Zəhmət olmasa, təhsil ixtisasını daxil edin.");
      return false;
    }
    setEducationSpecializationError('');
    return true;
  };

  const validateLanguageSkills = (skills) => {
    if (skills.length === 0) {
      setLanguageSkillsError("Zəhmət olmasa, dil biliklərinizi seçin.");
      return false;
    }
    setLanguageSkillsError('');
    return true;
  };

  // --- Handlers for input changes and blur events ---

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError('');
  };

  const handleFirstNameBlur = () => {
    validateFirstName(firstName);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError('');
  };

  const handleLastNameBlur = () => {
    validateLastName(lastName);
  };

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
    setBirthDateError('');
  };

  const handleBirthDateBlur = () => {
    validateBirthDate(birthDate);
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === '') {
      setMobileNumber(value);
      setMobileNumberError('');
    }
  };

  const handleMobileNumberBlur = () => {
    validateMobileNumber(mobileNumber);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setGenderError('');
  };

  const handleGenderBlur = () => {
    validateGender(gender);
  };

  const handleProfessionAreaChange = (e) => {
    setProfessionArea(e.target.value);
    setProfessionAreaError('');
  };

  const handleProfessionAreaBlur = () => {
    validateProfessionArea(professionArea);
  };

  const handleProfessionSpecializationChange = (e) => {
    setProfessionSpecialization(e.target.value);
    setProfessionSpecializationError('');
  };

  const handleProfessionSpecializationBlur = () => {
    validateProfessionSpecialization(professionSpecialization);
  };

  const handleWorkExperienceChange = (e) => {
    setWorkExperience(e.target.value);
    setWorkExperienceError('');
  };

  const handleWorkExperienceBlur = () => {
    validateWorkExperience(workExperience);
  };

  const handleActivityAreaChange = (e) => {
    setActivityArea(e.target.value);
    setActivityAreaError('');
  };

  const handleActivityAreaBlur = () => {
    validateActivityArea(activityArea);
  };

  const handleEducationLevelChange = (e) => {
    setEducationLevel(e.target.value);
    setEducationLevelError('');
  };

  const handleEducationLevelBlur = () => {
    validateEducationLevel(educationLevel);
  };

  const handleEducationSpecializationChange = (e) => {
    setEducationSpecialization(e.target.value);
    setEducationSpecializationError('');
  };

  const handleEducationSpecializationBlur = () => {
    validateEducationSpecialization(educationSpecialization);
  };

  const handleLanguageSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLanguageSkills(prev => [...prev, value]);
    } else {
      setLanguageSkills(prev => prev.filter(skill => skill !== value));
    }
    setLanguageSkillsError(''); // Clear error on change
  };

  const handleLanguageSkillsBlur = () => {
    validateLanguageSkills(languageSkills);
  };


  // --- Form submission handler ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields and store their validation status
    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isBirthDateValid = validateBirthDate(birthDate);
    const isMobileNumberValid = validateMobileNumber(mobileNumber);
    const isPasswordValid = validatePassword(password);
    const isGenderValid = validateGender(gender);
    const isProfessionAreaValid = validateProfessionArea(professionArea);
    const isProfessionSpecializationValid = validateProfessionSpecialization(professionSpecialization);
    const isWorkExperienceValid = validateWorkExperience(workExperience);
    const isActivityAreaValid = validateActivityArea(activityArea);
    const isEducationLevelValid = validateEducationLevel(educationLevel);
    const isEducationSpecializationValid = validateEducationSpecialization(educationSpecialization);
    const isLanguageSkillsValid = validateLanguageSkills(languageSkills);


    // If all fields are valid, proceed with form submission logic
    if (
      isFirstNameValid && isLastNameValid && isBirthDateValid && isMobileNumberValid && isPasswordValid && isGenderValid &&
      isProfessionAreaValid && isProfessionSpecializationValid && isWorkExperienceValid && isActivityAreaValid &&
      isEducationLevelValid && isEducationSpecializationValid && isLanguageSkillsValid
    ) {
      console.log('Form data:', {
        firstName, lastName, birthDate, mobileNumber, password, gender,
        professionArea, professionSpecialization, workExperience, activityArea,
        educationLevel, educationSpecialization, languageSkills
      });
      setShowSaveSuccessPopup(true);
    } else {
      console.log('Form has errors. Please correct them.');
      // Re-run validations to ensure errors are displayed for empty fields
      validateFirstName(firstName);
      validateLastName(lastName);
      validateBirthDate(birthDate);
      validateMobileNumber(mobileNumber);
      validatePassword(password);
      validateGender(gender);
      validateProfessionArea(professionArea);
      validateProfessionSpecialization(professionSpecialization);
      validateWorkExperience(workExperience);
      validateActivityArea(activityArea);
      validateEducationLevel(educationLevel);
      validateEducationSpecialization(educationSpecialization);
      validateLanguageSkills(languageSkills);
    }
  };


  // Existing handlers
  const handleToggleProfileVisibility = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const handleEditProfilePicture = () => {
    setShowPhotoPopup(true);
  };

  const handleClosePhotoPopup = () => {
    setShowPhotoPopup(false);
  };

  const handleSaveChanges = () => {
    handleSubmit(new Event('submit')); // Manually trigger form submission
  };

  const handleSaveSuccessOk = () => {
    setShowSaveSuccessPopup(false);
  };

  const handleDeleteAccountClick = () => {
    setShowDeleteConfirmPopup(true);
  };

  const handleDeleteAccountConfirm = () => {
    alert("User profile deactivated.");
    setShowDeleteConfirmPopup(false);
  };

  const handleDeleteAccountCancel = () => {
    setShowDeleteConfirmPopup(false);
  };

  const handleChangeVisible = () => {
    setVisible(!visible);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (uploadedImages.length + files.length > 10) {
      alert("You can only upload a maximum of 10 images.");
      return;
    }
    const newImages = files.map(file => URL.createObjectURL(file));
    setUploadedImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setUploadedImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  };


  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[306px] bg-blue-300 min-h-screen">
        <ul>
          <li className="p-4 text-white text-lg font-semibold cursor-pointer hover:bg-blue-400">Ana sehife</li>
          <li className="p-4 text-white text-lg font-semibold cursor-pointer bg-blue-500">Tenzimlemeler</li>
          <li className="p-4 text-white text-lg font-semibold cursor-pointer hover:bg-blue-400">Cixis</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-[63.4rem] bg-[#F9FAFB] flex-grow">
        <div className="w-[66.4rem] m-auto flex justify-between items-start pt-5">
          <div className="flex gap-[1.4rem] items-center">
            <div className="relative">
              <img
                src="/profil.jpg"
                alt="profil-image"
                className="w-[120px] h-[120px] object-cover object-[80%_20%] rounded-full"
              />
              <img
                src="/add.svg"
                alt="add-image"
                className="h-[2rem] w-[2rem] absolute bottom-2 left-[93px] cursor-pointer"
                onClick={handleEditProfilePicture}
              />
            </div>
            <div className="p-">
              <h1 className="text-[32px] text-[#1A4862] font-bold">Tənzimləmələr</h1>
              <p className="text-[16px] text-[#656F83]">Profil məlumatlarınızı yeniləyin.</p>
              <p className="text-[14px] text-[#1A4862] font-semibold">
                Qeydiyyat tarixi: {formattedRegistrationDate}
              </p>
            </div>
          </div>
          <div className="flex gap-[1.4rem] items-center">
            <div>
              <p className="text-[1rem] text-[#1A4862] font-medium">Profilim ana səhifədə görünsün.</p>
            </div>
            <div
              className={`
                relative w-[3rem] h-[1.5rem] cursor-pointer rounded-full flex items-center transition-colors duration-300
                ${isProfileVisible ? 'bg-[#CDE4F2] justify-end' : 'bg-gray-300 justify-start'}
              `}
              onClick={handleToggleProfileVisibility}
            >
              <div
                className={`
                  w-[1.2rem] h-[1.2rem] rounded-full shadow-md transition-transform duration-300
                  ${isProfileVisible ? 'bg-[#3187B8] transform translate-x-0' : 'bg-white transform translate-x-0'}
                `}
              ></div>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="w-100% bg-white mt-7">
          <div className="w-[66.4rem] m-auto py-5">
            <div className="flex items-center gap-3">
              <img src="/log.svg" alt="log-image" className="w-[1.3rem] h-[1.3rem]" />
              <p className="text-[#1A4862] text-[1.2rem] font-bold">Şəxsi Məlumatlar</p>
            </div>
            <form action="" className="mt-5 flex justify-between flex-wrap gap-7" onSubmit={handleSubmit}>
              {/* First Name Field */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/user.svg" alt="user-image" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Ad</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-[27.5rem] h-[3rem] border border-[#C3C8D1] rounded-lg outline-none p-2 text-[#1A4862] font-semibold"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    onBlur={handleFirstNameBlur}
                  />
                  {firstNameError && <p className="text-[#EF4444] text-[.8rem] mt-1">{firstNameError}</p>}
                </div>
              </div>
              {/* Last Name Field */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/user.svg" alt="user-image" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Soyad</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-[27.5rem] h-[3rem] border border-[#C3C8D1] rounded-lg outline-none p-2 text-[#1A4862] font-semibold"
                    value={lastName}
                    onChange={handleLastNameChange}
                    onBlur={handleLastNameBlur}
                  />
                  {lastNameError && <p className="text-[#EF4444] text-[.8rem] mt-1">{lastNameError}</p>}
                </div>
              </div>
              {/* Birth Date Field */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/calendar.svg" alt="user-image" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Doğum tarixi</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div>
                  <input
                    type="date"
                    className="w-[27.5rem] h-[3rem] border border-[#C3C8D1] rounded-lg outline-none p-2 text-[#1A4862] font-semibold"
                    value={birthDate}
                    onChange={handleBirthDateChange}
                    onBlur={handleBirthDateBlur}
                  />
                  {birthDateError && <p className="text-[#EF4444] text-[.8rem] mt-1">{birthDateError}</p>}
                </div>
              </div>
              {/* Mobile Number Field */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/call.svg" alt="user-image" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Mobil nömrə</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div>
                  <div className="flex items-center border border-[#C3C8D1] rounded-lg w-[27.5rem] h-[3rem] overflow-hidden">
                    <span className=" text-[#1A4862] font-semibold px-3">+994</span>
                    <input
                      type="tel"
                      className="flex-1 h-full p-2 outline-none text-[#1A4862] font-semibold"
                      placeholder="50 123 45 67"
                      value={mobileNumber}
                      onChange={handleMobileNumberChange}
                      onBlur={handleMobileNumberBlur}
                    />
                  </div>
                  {mobileNumberError && <p className="text-[#EF4444] text-[.8rem] mt-1">{mobileNumberError}</p>}
                </div>
              </div>
              {/* Password Field */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/lock.svg" alt="user-image" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Şifrə</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div>
                  <div className="relative w-[27.5rem]">
                    <input
                      type={`${visible ? 'text' : 'password'}`}
                      className="w-full h-[3rem] border border-[#C3C8D1] rounded-lg outline-none p-2 pr-10 text-[#1A4862] font-semibold"
                      value={password}
                      onChange={handlePasswordChange}
                      onBlur={handlePasswordBlur}
                    />
                    <img
                      onClick={handleChangeVisible}
                      src={`${visible ? '/visible.svg' : '/invisible.svg'}`}
                      alt="eye-icon"
                      className="w-6 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  </div>
                  {passwordError && <p className="text-[#EF4444] text-[.8rem] mt-1">{passwordError}</p>}
                </div>
              </div>
              {/* Gender Selection */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/cins.svg" alt="user-image" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Cins</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div className="w-[27.5rem] h-[3rem] rounded-lg p-2 flex items-center gap-4 text-[#1A4862]">
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="Kişi"
                      checked={gender === 'Kişi'}
                      onChange={handleGenderChange}
                      onBlur={handleGenderBlur}
                    />
                    <label htmlFor="male">Kişi</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="Qadın"
                      checked={gender === 'Qadın'}
                      onChange={handleGenderChange}
                      onBlur={handleGenderBlur}
                    />
                    <label htmlFor="female">Qadın</label>
                  </div>
                </div>
                {genderError && <p className="text-[#EF4444] text-[.8rem] mt-1">{genderError}</p>}
              </div>
            </form>
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="w-100% bg-white mt-7">
          <div className="w-[66.4rem] m-auto py-5">
            <div className="flex items-center gap-3">
              <img src="/data.svg" alt="log-image" className="w-[1.3rem] h-[1.3rem]" />
              <p className="text-[#1A4862] text-[1.2rem] font-bold">Peşə Məlumatları</p>
            </div>
            <form action="" className="mt-5 flex justify-between flex-wrap gap-7">
              {/* Peşə sahəsi */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/work.svg" alt="work-image" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Peşə sahəsi</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div>
                  <select
                    className="w-[27.5rem] h-[3rem] border border-[#C3C8D1] rounded-lg outline-none pl-3 p-2 text-[#1A4862] font-semibold"
                    value={professionArea}
                    onChange={handleProfessionAreaChange}
                    onBlur={handleProfessionAreaBlur}
                  >
                    <option value="">Seçin</option>
                    <option value="Tikinti">Tikinti</option>
                    <option value="Təmir">Təmir</option>
                    <option value="Avtomobil">Avtomobil</option>
                    <option value="IT">IT</option>
                  </select>
                  {professionAreaError && <p className="text-[#EF4444] text-[.8rem] mt-1">{professionAreaError}</p>}
                </div>
              </div>
              {/* Peşə ixtisası */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/place.svg" alt="place-image" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Peşə ixtisası</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div>
                  <select
                    className="w-[27.5rem] h-[3rem] border border-[#C3C8D1] rounded-lg outline-none pl-3 p-2 text-[#1A4862] font-semibold"
                    value={professionSpecialization}
                    onChange={handleProfessionSpecializationChange}
                    onBlur={handleProfessionSpecializationBlur}
                  >
                    <option value="">Seçin</option>
                    <option value="Dülgər">Dülgər</option>
                    <option value="Elektrik">Elektrik</option>
                    <option value="Santexnik">Santexnik</option>
                    <option value="Proqramçı">Proqramçı</option>
                  </select>
                  {professionSpecializationError && <p className="text-[#EF4444] text-[.8rem] mt-1">{professionSpecializationError}</p>}
                </div>
              </div>
              {/* İş təcrübəsi */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/practice.svg" alt="practice-image" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">İş təcrübəsi (il)</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div className="w-[27.4rem] h-[3rem] rounded-lg flex items-center gap-4 text-[#1A4862]">
                  <input
                    type="number"
                    min="0"
                    className="w-[27.4rem] h-[3rem] border border-[#C3C8D1] rounded-lg outline-none p-2 text-[#1A4862] font-semibold"
                    value={workExperience}
                    onChange={handleWorkExperienceChange}
                    onBlur={handleWorkExperienceBlur}
                  />
                </div>
                {workExperienceError && <p className="text-[#EF4444] text-[.8rem] mt-1">{workExperienceError}</p>}
              </div>
              {/* Fəaliyyət göstərdiyi ərazi */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/location.svg" alt="location-image" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Fəaliyyət göstərdiyi ərazi</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div>
                  <select
                    className="w-[27.5rem] h-[3rem] border border-[#C3C8D1] rounded-lg outline-none pl-3 p-2 text-[#1A4862] font-semibold"
                    value={activityArea}
                    onChange={handleActivityAreaChange}
                    onBlur={handleActivityAreaBlur}
                  >
                    <option value="">Seçin</option>
                    <option value="Bakı">Bakı</option>
                    <option value="Gəncə">Gəncə</option>
                    <option value="Sumqayıt">Sumqayıt</option>
                    <option value="Digər">Digər</option>
                  </select>
                  {activityAreaError && <p className="text-[#EF4444] text-[.8rem] mt-1">{activityAreaError}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Education and Skills Section */}
        <div className="w-100% bg-white mt-7">
          <div className="w-[66.4rem] m-auto py-5">
            <div className="flex items-center gap-3">
              <img src="/teacher.svg" alt="education-icon" className="w-[1.3rem] h-[1.3rem]" />
              <p className="text-[#1A4862] text-[1.2rem] font-bold">Təhsil və Bacarıqlar</p>
            </div>

            <form action="" className="mt-5 flex justify-between flex-wrap gap-7">
              {/* Təhsil */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/school.svg" alt="university-icon" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Təhsil</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div className="w-[27.5rem] rounded-lg p-2 flex flex-col gap-3 text-[#1A4862] mt-2">
                  <div className="flex gap-4">
                    <div className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="education"
                        id="tamAli"
                        value="Tam ali"
                        checked={educationLevel === 'Tam ali'}
                        onChange={handleEducationLevelChange}
                        onBlur={handleEducationLevelBlur}
                      />
                      <label htmlFor="tamAli">Tam ali</label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="education"
                        id="natamamAli"
                        value="Natamam ali"
                        checked={educationLevel === 'Natamam ali'}
                        onChange={handleEducationLevelChange}
                        onBlur={handleEducationLevelBlur}
                      />
                      <label htmlFor="natamamAli">Natamam ali</label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="education"
                        id="orta"
                        value="Orta"
                        checked={educationLevel === 'Orta'}
                        onChange={handleEducationLevelChange}
                        onBlur={handleEducationLevelBlur}
                      />
                      <label htmlFor="orta">Orta</label>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="education"
                        id="pesheTehsili"
                        value="Peşə təhsili"
                        checked={educationLevel === 'Peşə təhsili'}
                        onChange={handleEducationLevelChange}
                        onBlur={handleEducationLevelBlur}
                      />
                      <label htmlFor="pesheTehsili">Peşə təhsili</label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="education"
                        id="ortaIxtisasTehsili"
                        value="Orta ixtisas təhsili"
                        checked={educationLevel === 'Orta ixtisas təhsili'}
                        onChange={handleEducationLevelChange}
                        onBlur={handleEducationLevelBlur}
                      />
                      <label htmlFor="ortaIxtisasTehsili">Orta ixtisas təhsili</label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="education"
                        id="yoxdur"
                        value="Yoxdur"
                        checked={educationLevel === 'Yoxdur'}
                        onChange={handleEducationLevelChange}
                        onBlur={handleEducationLevelBlur}
                      />
                      <label htmlFor="yoxdur">Yoxdur</label>
                    </div>
                  </div>
                </div>
                {educationLevelError && <p className="text-[#EF4444] text-[.8rem] mt-1">{educationLevelError}</p>}
              </div>
              {/* Təhsil ixtisası */}
              <div>
                <div className="flex gap-[4px]">
                  <img src="/education.svg" alt="education-icon" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Təhsil ixtisası</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div>
                  <input
                    placeholder="Dülgərlik"
                    className="w-[27.5rem] h-[3rem] border border-[#C3C8D1] rounded-lg outline-none p-2 text-[#1A4862] font-semibold"
                    value={educationSpecialization}
                    onChange={handleEducationSpecializationChange}
                    onBlur={handleEducationSpecializationBlur}
                  />
                  {educationSpecializationError && <p className="text-[#EF4444] text-[.8rem] mt-1">{educationSpecializationError}</p>}
                </div>
              </div>
              {/* Dil bilikləri */}
              <div className="w-full">
                <div className="flex gap-[4px]">
                  <img src="/language.svg" alt="language-icon" className="w-[1.2rem] h-[1.2rem]" />
                  <p className="text-[#656F83] text-[.8rem]">Dil bilikləri</p>
                  <p className="text-[#EF4444] text-[1rem]">*</p>
                </div>
                <div className="w-[27.5rem] h-[3rem] rounded-lg p-2 flex items-center gap-4 text-[#1A4862]">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      name="language"
                      id="azerbaijan"
                      value="Azərbaycan"
                      checked={languageSkills.includes('Azərbaycan')}
                      onChange={handleLanguageSkillChange}
                      onBlur={handleLanguageSkillsBlur}
                    />
                    <label htmlFor="azerbaijan">Azərbaycan</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      name="language"
                      id="english"
                      value="İngilis"
                      checked={languageSkills.includes('İngilis')}
                      onChange={handleLanguageSkillChange}
                      onBlur={handleLanguageSkillsBlur}
                    />
                    <label htmlFor="english">İngilis</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      name="language"
                      id="russian"
                      value="Rus"
                      checked={languageSkills.includes('Rus')}
                      onChange={handleLanguageSkillChange}
                      onBlur={handleLanguageSkillsBlur}
                    />
                    <label htmlFor="russian">Rus</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      name="language"
                      id="turkish"
                      value="Türk"
                      checked={languageSkills.includes('Türk')}
                      onChange={handleLanguageSkillChange}
                      onBlur={handleLanguageSkillsBlur}
                    />
                    <label htmlFor="turkish">Türk</label>
                  </div>
                </div>
                {languageSkillsError && <p className="text-[#EF4444] text-[.8rem] mt-1">{languageSkillsError}</p>}
              </div>
            </form>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="w-100% bg-white mt-7">
          <div className="w-[66.4rem] m-auto py-5">
            <div className="flex items-center gap-3">
              <img src="/date.svg" alt="log-image" className="w-[1.3rem] h-[1.3rem]" />
              <p className="text-[#1A4862] text-[1.2rem] font-bold">Əlavə məlumatlar</p>
            </div>

            <div className="mt-5">
              <p className="text-[#1A4862] text-[1rem] font-bold">Gördüyünüz işlər <span className="text-[#656F83] text-[.9rem] font-semibold">(Max 10 ədəd şəkil yüklənilə bilər.)</span></p>
              <div className="flex gap-4 mt-3 flex-wrap">
                <div className="relative w-[7.5rem] h-[7.5rem] border border-dashed border-[#C3C8D1] rounded-lg flex flex-col items-center justify-center text-[#656F83] cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg, image/png"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <img src="/src/assets/upload.svg" alt="upload-icon" className="w-6 h-6" />
                  <p className="text-[.8rem] mt-1">JPG/PNG</p>
                </div>
                {/* Dynamically rendered uploaded images */}
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative w-[7.5rem] h-[7.5rem] rounded-lg overflow-hidden">
                    <img src={image} alt={`work-image-${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      className="absolute -top-2 -right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-md cursor-pointer"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <img src="/src/assets/close.svg" alt="close-image" className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {/* Placeholder for existing image from provided design (if still needed) */}
                <div className="relative w-[7.5rem] h-[7.5rem] rounded-lg overflow-hidden">
                  <button
                    className="absolute -top-2 -right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center shado-md cursor-pointer"
                    onClick={() => { }}
                  >
                  </button>
                </div>
              </div>
              <p className="text-[#656F83] text-[.8rem] mt-2">Şəkillərin sırasını dəyişmək üçün sürükləyin.</p>
            </div>

            <div className="mt-10">
              <p className="text-[#1A4862] text-[1.2rem] font-bold">Sosial şəbəkə linkləri</p>
              <p className="text-[#656F83] text-[.8rem] mt-1">Peşənizlə əlaqədar sosial şəbəkə səhifəsinin (olduqda) linkini əlavə edə bilərsiniz.</p>

              <div className="flex items-center border border-[#C3C8D1] rounded-lg h-[3rem] mt-3 p-3 gap-3">
                <img src="/facebook.svg" alt="facebook-icon" className="w-5 h-5" />
                <a href="https://www.facebook.com/creative.elchin" className="w-full outline-none text-[#1A4862] font-semibold">https://www.facebook.com/creative.elchin</a>
              </div>
              <div className="flex items-center border border-[#C3C8D1] rounded-lg h-[3rem] mt-3 p-3 gap-3">
                <img src="/instagram.svg" alt="instagram-icon" className="w-5 h-5" />
                <a href="https://www.instagram.com/elchin.creative/" className="w-full outline-none text-[#1A4862] font-semibold">https://www.instagram.com/elchin.creative/</a>
              </div>
              <div className="flex items-center border border-[#C3C8D1] rounded-lg h-[3rem] mt-3 p-3 gap-3">
                <img src="/tiktok.svg" alt="tiktok-icon" className="w-5 h-5" />
                <a href="https://www.tiktok.com/@uxelchin" className="w-full outline-none text-[#1A4862] font-semibold">https://www.tiktok.com/@uxelchin</a>
              </div>
              <div className="flex items-center border border-[#C3C8D1] rounded-lg h-[3rem] mt-3 p-3 gap-3">
                <img src="/linkedin.svg" alt="linkedin-icon" className="w-5 h-5" />
                <a href="https://www.linkedin.com/in/elchin-design-12345/" className="w-full outline-none text-[#1A4862] font-semibold" >https://www.linkedin.com/in/elchin-design-12345/</a>
              </div>
            </div>
          </div>
        </div>

        {/* About You and Action Buttons Section */}
        <div className="w-100% bg-white mt-7 mb-7">
          <div className="w-[66.4rem] m-auto py-5">
            <div className="flex items-center gap-3">
              <img src="/note.svg" alt="log-image" className="w-[1.3rem] h-[1.3rem]" />
              <p className="text-[#1A4862] text-[1.2rem] font-bold">Haqqınızda</p>
            </div>

            <div className="mt-5">
              <textarea
                className="w-full h-[12rem] border border-[#C3C8D1] rounded-lg outline-none p-4 text-[#1A4862] text-[.9rem] font-medium resize-none"
                defaultValue="Mən 2 ildir dülgərlik sahəsində çalışıram. Taxta ilə bağlı müxtəlif kiçik və orta səviyyəli işlər görürəm. Hər işi düzgün və tamiz şəkildə yerinə yetirməyə çalışıram. Müştəri məmnuniyyəti mənim üçün vacibdir. İşimi sevirəm və daha da təkmilləşmək istəyirəm."
              ></textarea>
            </div>

            <div className="flex justify-between mt-8">
              <button
                className="cursor-pointer flex items-center gap-2 text-[#EF4444] text-[.9rem] font-semibold px-4 py-2 rounded-lg hover:bg-red-50"
                onClick={handleDeleteAccountClick}
              >
                <img src="/trash.svg" alt="trash-icon" className="w-5 h-5" />
                Hesabı sil
              </button>
              <button
                type="submit"
                className="cursor-pointer flex items-center gap-2 bg-[#1A4862] text-white text-[.9rem] font-semibold px-4 py-2 rounded-lg hover:bg-[#255C80]"
                onClick={handleSaveChanges}
              >
                <img src="/save.svg" alt="trash-icon" className="w-5 h-5" />
                Dəyişiklikləri yadda saxla
              </button>
            </div>
          </div>
        </div>

        {/* Photo Upload Popup */}
        {showPhotoPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem]">
              <h2 className="text-xl font-bold text-[#1A4862] mb-4">Profil şəklinizi yükləyin</h2>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  onClick={handleClosePhotoPopup}
                >
                  Ləğv et
                </button>
                <button
                  className="px-4 py-2 bg-[#1A4862] text-white rounded-lg hover:bg-[#255C80]"
                  onClick={() => {
                    // Logic to handle photo upload
                    handleClosePhotoPopup();
                  }}
                >
                  Yüklə
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Success Popup */}
        {showSaveSuccessPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[25rem] text-center">
              <h2 className="text-xl font-bold text-[#1A4862] mb-2">Məlumatlar yadda saxlanıldı!</h2>
              <p className="text-gray-600 mb-4">Dəyişikliklər uğurla qeydə alındı.</p>
              <button
                className="cursor-pointer px-6 py-2 bg-[#1A4862] text-white rounded-lg hover:bg-[#255C80]"
                onClick={handleSaveSuccessOk}
              >
               Bağla
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {showDeleteConfirmPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[25rem] text-center">
              <h2 className="text-xl font-bold text-[#EF4444] mb-2">Hesabı silmək</h2>
              <p className="text-gray-600 mb-4">Hesabınızı silmək istədiyinizə əminsiniz?</p>
              <div className="flex justify-center gap-3">
                <button
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-white bg-[#1A4862]  "
                  onClick={handleDeleteAccountCancel}
                >
                  Xeyr
                </button>
                <button
                  className="cursor-pointer px-4 py-2 bg-[#C3C8D1] text-white rounded-lg"
                  onClick={handleDeleteAccountConfirm}
                >
                  Bəli
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}