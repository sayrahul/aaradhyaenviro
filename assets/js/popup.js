document.addEventListener('DOMContentLoaded', () => {
    // Only show once per session
    if (sessionStorage.getItem('consultationPopupDismissed')) {
        return;
    }

    // Delay popup by 2 seconds so it doesn't interrupt immediate load
    setTimeout(initPopup, 2000);

    function initPopup() {
        const popupHTML = `
            <div id="freeConsultationPopup" class="fixed inset-0 z-[100] flex items-center justify-center p-4 opacity-0 transition-opacity duration-500 ease-out">
                <!-- Backdrop with blur -->
                <div id="popupBackdrop" class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm cursor-pointer"></div>
                
                <!-- Popup Content -->
                <div id="popupModal" class="relative w-full max-w-lg bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 transform scale-95 transition-all duration-500 ease-out overflow-hidden flex flex-col md:flex-row">
                    
                    <!-- Left Accent / Image side (hidden on small mobile) -->
                    <div class="hidden md:flex md:w-2/5 bg-gradient-to-br from-teal-600 to-teal-800 p-6 flex-col justify-between text-white relative overflow-hidden">
                        <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuNCI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
                        <div class="relative z-10">
                            <h3 class="text-2xl font-bold mb-2">Free Consultation</h3>
                            <p class="text-teal-100 text-sm">Talk to our environmental experts today. No obligations.</p>
                        </div>
                        <div class="relative z-10 mt-8">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-yellow-400 text-4xl mb-2" xmlns="http://www.w3.org/2000/svg"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
                        </div>
                    </div>

                    <!-- Right Form Side -->
                    <div class="w-full md:w-3/5 p-6 md:p-8 relative">
                        <button id="closePopupBtn" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 bg-gray-100 hover:bg-gray-200 rounded-full" aria-label="Close popup">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <div class="md:hidden mb-6 text-center">
                            <h3 class="text-2xl font-bold text-gray-800">Free Consultation</h3>
                            <p class="text-gray-500 text-sm mt-1">Talk to our environmental experts today.</p>
                        </div>

                        <form id="consultationForm" class="space-y-4">
                            <div>
                                <label for="popupName" class="sr-only">Full Name</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                    <input type="text" id="popupName" name="name" required placeholder="Your Name" class="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none">
                                </div>
                            </div>
                            
                            <div>
                                <label for="popupPhone" class="sr-only">Contact Number</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <input type="tel" id="popupPhone" name="phone" required placeholder="Phone Number" class="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none">
                                </div>
                            </div>

                            <div>
                                <label for="popupEmail" class="sr-only">Email Address</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <input type="email" id="popupEmail" name="email" required placeholder="Email Address" class="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none">
                                </div>
                            </div>

                            <button type="submit" id="popupSubmitBtn" class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center space-x-2 mt-2">
                                <span>Request Call Back</span>
                            </button>
                        </form>

                        <!-- Success Message (Hidden initially) -->
                        <div id="popupSuccessMsg" class="hidden absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center transform scale-95 opacity-0 transition-all duration-300">
                            <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce mb-4">
                                <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h4 class="font-bold text-xl text-gray-800 mb-2">Request Sent!</h4>
                            <p class="text-gray-600 text-sm">Thank you. Our experts will contact you very soon.</p>
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
            modal.classList.remove('scale-95');
            modal.classList.add('scale-100');
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
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
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
                
                // Small delay to let browser render block before animating opacity
                requestAnimationFrame(() => {
                    successMsg.classList.remove('scale-95', 'opacity-0');
                    successMsg.classList.add('scale-100', 'opacity-100');
                });

                // Auto close after 3 seconds
                setTimeout(closePopup, 3000);
                
            } catch (error) {
                // In case of a major network error (offline, etc)
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Error. Try Again';
                submitBtn.classList.replace('bg-teal-600', 'bg-red-600');
                submitBtn.classList.replace('hover:bg-teal-700', 'hover:bg-red-700');
                setTimeout(() => {
                    submitBtn.innerHTML = 'Request Call Back';
                    submitBtn.classList.replace('bg-red-600', 'bg-teal-600');
                    submitBtn.classList.replace('hover:bg-red-700', 'hover:bg-teal-700');
                }, 3000);
            }
        });
    }
});
