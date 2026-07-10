document.addEventListener('DOMContentLoaded', () => {
    // Only show once per session
    if (sessionStorage.getItem('consultationPopupDismissed')) {
        return;
    }

    // Delay popup by 3 seconds so it doesn't interrupt immediate load
    setTimeout(initPopup, 3000);

    function initPopup() {
        const popupHTML = `
            <div id="freeConsultationPopup" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 opacity-0 transition-opacity duration-700 ease-out">
                <!-- Backdrop -->
                <div id="popupBackdrop" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer transition-opacity"></div>
                
                <!-- Popup Modal -->
                <div id="popupModal" class="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform scale-95 opacity-0 transition-all duration-500 ease-out">
                    
                    <!-- Left Side (Creative Image / Branding) -->
                    <div class="hidden md:block md:w-5/12 relative">
                        <!-- High quality environmental image -->
                        <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Environment" class="absolute inset-0 w-full h-full object-cover" />
                        <!-- Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-800/80 to-teal-600/40 mix-blend-multiply"></div>
                        
                        <!-- Content over image -->
                        <div class="absolute inset-0 p-8 flex flex-col justify-end text-white">
                            <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/30">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <h3 class="text-3xl font-bold mb-3 leading-tight">Expert Environmental Consulting</h3>
                            <p class="text-teal-50 text-sm leading-relaxed opacity-90">
                                Let us help you navigate complex environmental compliances with ease. Connect with our senior experts today.
                            </p>
                        </div>
                    </div>

                    <!-- Right Side (Sleek Form) -->
                    <div class="w-full md:w-7/12 p-8 md:p-12 relative bg-white">
                        <button id="closePopupBtn" class="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-full focus:outline-none" aria-label="Close popup">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <div class="mb-8">
                            <h3 class="text-2xl font-bold text-gray-900 tracking-tight">Claim Your Free Consultation</h3>
                            <p class="text-gray-500 text-sm mt-2">Fill in your details and we'll get back to you within 24 hours.</p>
                        </div>

                        <form id="consultationForm" class="space-y-5">
                            <div class="space-y-5">
                                <!-- Name Input (Floating Label) -->
                                <div class="relative group">
                                    <input type="text" id="popupName" name="name" required placeholder=" " class="block w-full px-4 py-3.5 text-gray-900 bg-transparent border-2 border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-teal-500 peer transition-colors">
                                    <label for="popupName" class="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 cursor-text">Full Name</label>
                                </div>
                                
                                <!-- Phone Input -->
                                <div class="relative group">
                                    <input type="tel" id="popupPhone" name="phone" required placeholder=" " class="block w-full px-4 py-3.5 text-gray-900 bg-transparent border-2 border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-teal-500 peer transition-colors">
                                    <label for="popupPhone" class="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 cursor-text">Phone Number</label>
                                </div>

                                <!-- Email Input -->
                                <div class="relative group">
                                    <input type="email" id="popupEmail" name="email" required placeholder=" " class="block w-full px-4 py-3.5 text-gray-900 bg-transparent border-2 border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-teal-500 peer transition-colors">
                                    <label for="popupEmail" class="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 cursor-text">Email Address</label>
                                </div>
                            </div>

                            <button type="submit" id="popupSubmitBtn" class="relative w-full overflow-hidden bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-[0_8px_30px_rgb(13,148,136,0.2)] hover:shadow-[0_8px_30px_rgb(13,148,136,0.3)] hover:-translate-y-0.5 flex items-center justify-center space-x-2 mt-4 group">
                                <span class="relative z-10 flex items-center">
                                    Request Call Back
                                    <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </span>
                            </button>
                            <p class="text-xs text-center text-gray-400 mt-4">100% Secure & Confidential</p>
                        </form>

                        <!-- Success Message -->
                        <div id="popupSuccessMsg" class="hidden absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-8 text-center transform scale-95 opacity-0 transition-all duration-500 rounded-r-3xl">
                            <div class="relative">
                                <div class="absolute inset-0 bg-emerald-200 rounded-full animate-ping opacity-20"></div>
                                <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 relative z-10">
                                    <svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                            </div>
                            <h4 class="font-bold text-2xl text-gray-900 mb-3">Request Received!</h4>
                            <p class="text-gray-500 text-base max-w-sm">Thank you for reaching out. One of our environmental experts will contact you shortly.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const popup = document.getElementById('freeConsultationPopup');
        const modal = document.getElementById('popupModal');
        const closeBtn = document.getElementById('closePopupBtn');
        const backdrop = document.getElementById('popupBackdrop');
        const form = document.getElementById('consultationForm');
        const submitBtn = document.getElementById('popupSubmitBtn');
        const successMsg = document.getElementById('popupSuccessMsg');

        // Animate in
        requestAnimationFrame(() => {
            popup.classList.remove('opacity-0');
            popup.classList.add('opacity-100');
            modal.classList.remove('scale-95', 'opacity-0');
            modal.classList.add('scale-100', 'opacity-100');
        });

        const closePopup = () => {
            sessionStorage.setItem('consultationPopupDismissed', 'true');
            popup.classList.remove('opacity-100');
            popup.classList.add('opacity-0');
            modal.classList.remove('scale-100');
            modal.classList.add('scale-95');
            setTimeout(() => popup.remove(), 500);
        };

        closeBtn.addEventListener('click', closePopup);
        backdrop.addEventListener('click', closePopup);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwZ1wn0rP0H-SONl9myYZWVW-7OEXoB9j4H_hr-E3mRlOGvfa2YSgfVNssgZBruDeqA/exec';
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="relative z-10 flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </span>
            `;

            try {
                const formData = new FormData(form);
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                });
                
                // Show success
                sessionStorage.setItem('consultationPopupDismissed', 'true');
                successMsg.classList.remove('hidden');
                
                // Trigger reflow
                void successMsg.offsetWidth;
                
                successMsg.classList.remove('scale-95', 'opacity-0');
                successMsg.classList.add('scale-100', 'opacity-100');

                setTimeout(closePopup, 4000);
                
            } catch (error) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="relative z-10">Error. Try Again</span>';
                submitBtn.classList.replace('bg-teal-600', 'bg-red-600');
                submitBtn.classList.replace('hover:bg-teal-700', 'hover:bg-red-700');
                setTimeout(() => {
                    submitBtn.innerHTML = '<span class="relative z-10 flex items-center">Request Call Back</span>';
                    submitBtn.classList.replace('bg-red-600', 'bg-teal-600');
                    submitBtn.classList.replace('hover:bg-red-700', 'hover:bg-teal-700');
                }, 3000);
            }
        });
    }
});
