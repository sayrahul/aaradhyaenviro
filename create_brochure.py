import os

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aaradhya Enviro - Company Brochure</title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
    <!-- Tailwind CSS (CDN for standalone file) -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Tailwind Configuration -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            light: '#ccfbf1',
                            DEFAULT: '#0f766e',
                            dark: '#042f2e',
                        },
                        accent: {
                            DEFAULT: '#fbbf24',
                        }
                    }
                }
            }
        }
    </script>

    <style>
        body {
            background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
            background-attachment: fixed;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            overflow-x: hidden;
        }

        /* Ambient Background Orbs */
        .ambient-orb {
            position: fixed;
            border-radius: 50%;
            filter: blur(100px);
            z-index: -1;
            opacity: 0.5;
            animation: float 20s infinite ease-in-out;
        }
        .orb-1 { top: -10%; left: -10%; width: 500px; height: 500px; background: #99f6e4; }
        .orb-2 { bottom: -10%; right: -10%; width: 600px; height: 600px; background: #5eead4; animation-delay: -10s; }

        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(50px, 50px); }
        }

        /* A4 Page Styling */
        .a4-page {
            width: 210mm;
            min-height: 297mm;
            margin: 4rem auto;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(15, 118, 110, 0.05);
            position: relative;
            overflow: hidden;
            padding: 20mm;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease;
        }

        .cover-page {
            background: linear-gradient(135deg, rgba(15, 118, 110, 0.95) 0%, rgba(4, 47, 46, 0.95) 100%);
            color: white;
            justify-content: center;
            border: none;
        }

        .cover-page::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
            z-index: 1;
        }
        
        .cover-content { z-index: 10; position: relative; }

        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 150px;
            font-weight: 800;
            color: rgba(15, 118, 110, 0.03);
            z-index: 0;
            pointer-events: none;
            white-space: nowrap;
        }

        .page-content { z-index: 10; position: relative; flex-grow: 1; }

        .page-footer {
            margin-top: auto;
            border-top: 2px solid rgba(15, 118, 110, 0.2);
            padding-top: 15px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 1px;
            color: #64748b;
            display: flex;
            justify-content: space-between;
            z-index: 10;
        }

        /* Accent Elements */
        .accent-bar {
            width: 60px;
            height: 5px;
            background: linear-gradient(90deg, #10b981, #3b82f6);
            margin: 20px 0;
            border-radius: 5px;
        }

        /* Typography */
        p { font-size: 1rem; line-height: 1.7; margin-bottom: 1.2rem; color: #475569; text-align: justify; }
        ul { list-style-type: none; padding-left: 0; margin-bottom: 1rem; }
        ul.check-list li { position: relative; padding-left: 1.75rem; margin-bottom: 0.75rem; font-size: 0.95rem; color: #475569; }
        ul.check-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
            font-size: 1.1em;
        }

        /* Interactive Hover Effects */
        .glass-card {
            background: rgba(255, 255, 255, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(5px);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .glass-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(15, 118, 110, 0.1), 0 10px 10px -5px rgba(15, 118, 110, 0.04);
            background: rgba(255, 255, 255, 0.95);
        }

        /* Print Specific CSS */
        @media print {
            body { background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; }
            .ambient-orb { display: none !important; }
            .a4-page {
                margin: 0;
                box-shadow: none;
                border: none;
                border-radius: 0;
                width: 100%;
                height: 100vh;
                page-break-after: always;
                padding: 15mm;
                background: white !important;
                backdrop-filter: none;
                transform: none !important;
                transition: none !important;
            }
            .cover-page {
                background: linear-gradient(135deg, #0f766e 0%, #042f2e 100%) !important;
            }
            .no-print { display: none !important; }
            
            /* Disable animations for print */
            [data-aos] {
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
            }
        }

        /* Floating action buttons */
        .fab-container {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            z-index: 50;
        }
    </style>
</head>
<body class="antialiased">

    <!-- Ambient Background -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>

    <!-- Floating Action Buttons -->
    <div class="fab-container no-print" data-aos="fade-up" data-aos-delay="1000">
        <button onclick="window.print()" class="bg-brand hover:bg-brand-dark text-white font-bold py-3 px-6 rounded-2xl shadow-[0_10px_25px_-5px_rgba(15,118,110,0.4)] transition-all transform hover:scale-105 flex items-center gap-3 backdrop-blur-md">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Download PDF
        </button>
        <a href="contact.html" class="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-2xl shadow-xl transition-all transform hover:scale-105 flex items-center gap-3 text-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Site
        </a>
    </div>

    <!-- PAGE 1: COVER -->
    <div class="a4-page cover-page" data-aos="zoom-in" data-aos-duration="1000">
        <div class="cover-content text-center">
            <div class="bg-white/10 backdrop-blur-md p-6 rounded-3xl inline-block mb-12 shadow-2xl border border-white/20 transform transition-transform hover:scale-110 duration-500">
                <img src="assets/aaradhya-logo-img.png" alt="Aaradhya Enviro Logo" class="h-28 filter brightness-0 invert">
            </div>
            
            <h1 class="text-white text-6xl font-black mb-6 tracking-tight drop-shadow-2xl" data-aos="fade-up" data-aos-delay="200">AARADHYA ENVIRO</h1>
            <h2 class="text-brand-light text-3xl font-semibold mb-12 max-w-2xl mx-auto drop-shadow-lg leading-tight" data-aos="fade-up" data-aos-delay="400">Comprehensive Environmental Consultancy & Turnkey Solutions</h2>
            
            <div class="w-32 h-1.5 bg-gradient-to-r from-accent to-yellow-200 mx-auto mb-12 rounded-full" data-aos="scale-x" data-aos-delay="600"></div>

            <p class="text-2xl text-white/90 font-light italic mb-16 tracking-wide" data-aos="fade-up" data-aos-delay="800">"Your Trusted Partner for a Cleaner, Safer, and Compliant Future"</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm bg-black/20 p-8 rounded-3xl backdrop-blur-md border border-white/10 mx-12 shadow-2xl" data-aos="fade-up" data-aos-delay="1000">
                <div class="flex flex-col items-center border-r border-white/20">
                    <div class="bg-white/10 p-3 rounded-full mb-3">
                        <svg class="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/></svg>
                    </div>
                    <span class="font-bold text-lg text-white">15+ Years Experience</span>
                    <span class="text-brand-light mt-1 text-base">500+ Projects</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="bg-white/10 p-3 rounded-full mb-3">
                        <svg class="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/></svg>
                    </div>
                    <span class="font-bold text-lg text-white">Serving PAN India</span>
                    <span class="text-brand-light mt-1 text-base">From Sambhajinagar</span>
                </div>
            </div>
        </div>
    </div>

    <!-- PAGE 2: TABLE OF CONTENTS & ABOUT -->
    <div class="a4-page" data-aos="fade-up">
        <div class="watermark">AARADHYA</div>
        <div class="page-content">
            <div class="grid grid-cols-2 gap-12 h-full">
                <!-- Left Column: TOC -->
                <div class="glass-card p-10 rounded-3xl" data-aos="fade-right" data-aos-delay="200">
                    <h2 class="mt-0 text-3xl font-bold text-brand-dark flex items-center gap-3">
                        <svg class="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                        Contents
                    </h2>
                    <div class="w-16 h-1 bg-brand my-6 rounded-full"></div>
                    <ul class="space-y-5">
                        <li class="font-semibold text-gray-800 text-lg hover:text-brand transition-colors cursor-default"><span class="text-brand/50 font-black mr-3">01</span> About Aaradhya Enviro</li>
                        <li class="font-semibold text-gray-800 text-lg hover:text-brand transition-colors cursor-default"><span class="text-brand/50 font-black mr-3">02</span> Our Mission & Vision</li>
                        <li class="font-semibold text-gray-800 text-lg hover:text-brand transition-colors cursor-default"><span class="text-brand/50 font-black mr-3">03</span> Why Choose Us</li>
                        <li class="font-semibold text-gray-800 text-lg hover:text-brand transition-colors cursor-default"><span class="text-brand/50 font-black mr-3">04</span> Compliance & Consultancy</li>
                        <li class="font-semibold text-gray-800 text-lg hover:text-brand transition-colors cursor-default"><span class="text-brand/50 font-black mr-3">05</span> Turnkey Projects</li>
                        <li class="font-semibold text-gray-800 text-lg hover:text-brand transition-colors cursor-default"><span class="text-brand/50 font-black mr-3">06</span> Testing & Monitoring</li>
                        <li class="font-semibold text-gray-800 text-lg hover:text-brand transition-colors cursor-default"><span class="text-brand/50 font-black mr-3">07</span> Products & Clients</li>
                    </ul>

                    <div class="mt-16 bg-gradient-to-br from-brand-dark to-brand text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden group">
                        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full transform group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 class="text-white mt-0 text-xl font-bold flex items-center gap-2 relative z-10">
                            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Emergency Support
                        </h3>
                        <p class="text-brand-light text-sm mt-4 relative z-10 opacity-90 leading-relaxed">Available 24/7 for critical environmental assistance.</p>
                        <p class="text-3xl font-black mt-4 text-accent relative z-10">99759 29212</p>
                    </div>
                </div>

                <!-- Right Column: About -->
                <div data-aos="fade-left" data-aos-delay="400">
                    <h1 class="text-5xl text-brand-dark font-black tracking-tight">1. About Us</h1>
                    <div class="accent-bar"></div>
                    <p class="first-letter:text-6xl first-letter:font-black first-letter:text-brand first-letter:mr-2 first-letter:float-left first-letter:leading-none mt-6">
                        Environmental pollution is one of the most pressing challenges facing industries today — threatening the quality of the air we breathe, the water we drink, and the food we grow. As regulations tighten and public awareness grows, industries across Maharashtra and India face increasing pressure to operate responsibly while still remaining profitable and efficient.
                    </p>
                    <p>
                        <strong>Aaradhya Enviro</strong> was founded to solve exactly this problem. We are a premier environmental consultancy organization based in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, dedicated to helping industries strike the right balance between operational efficiency and environmental responsibility.
                    </p>
                    <p>
                        Over the last 15+ years, we have grown from a local compliance consultancy into a full-spectrum environmental solutions provider, now serving clients PAN India. Our team has successfully delivered 500+ projects for clients ranging from small manufacturing units to large industrial groups, sugar factories, construction companies, and multinational corporations.
                    </p>
                    <div class="p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border-l-4 border-brand rounded-r-2xl shadow-sm my-6 transform hover:scale-[1.02] transition-transform">
                        <p class="font-semibold text-brand-dark text-lg italic mb-0 leading-relaxed">
                            "What sets us apart is that we don't just help you get paperwork approved — we design, install, operate, and maintain the actual physical systems that keep your facility compliant every single day."
                        </p>
                    </div>
                    <p>
                        This means you get one single, accountable partner for everything related to environment, health, and safety (EHS) — instead of juggling multiple vendors, consultants, and contractors.
                    </p>
                </div>
            </div>
        </div>
        <div class="page-footer">
            <span>AARADHYA ENVIRO BROCHURE</span>
            <span>01</span>
        </div>
    </div>

    <!-- PAGE 3: MISSION, VISION & WHY CHOOSE US -->
    <div class="a4-page" data-aos="fade-up">
        <div class="watermark">AARADHYA</div>
        <div class="page-content">
            <h1 class="text-4xl text-brand-dark font-black">2. Mission & Vision</h1>
            <div class="accent-bar mb-10"></div>
            
            <div class="grid grid-cols-2 gap-8 mb-12">
                <div class="bg-gradient-to-br from-brand to-brand-dark text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl" data-aos="fade-right" data-aos-delay="200">
                    <div class="absolute -bottom-6 -right-6 w-40 h-40 bg-white opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <svg class="w-12 h-12 text-accent mb-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <h3 class="text-white mt-0 text-2xl font-bold mb-4 relative z-10">Our Mission</h3>
                    <p class="text-brand-light relative z-10 text-lg leading-relaxed">To make environmental compliance simple, transparent, and achievable for every industry we work with — protecting the environment while helping our clients reduce risk and operational costs.</p>
                </div>
                <div class="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl" data-aos="fade-left" data-aos-delay="400">
                    <div class="absolute -bottom-6 -right-6 w-40 h-40 bg-white opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <svg class="w-12 h-12 text-accent mb-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    <h3 class="text-white mt-0 text-2xl font-bold mb-4 relative z-10">Our Vision</h3>
                    <p class="text-emerald-50 relative z-10 text-lg leading-relaxed">To be India's most trusted name in environmental consultancy and turnkey pollution control solutions, recognized for reliability, technical expertise, and genuine care for the environment.</p>
                </div>
            </div>

            <h2 class="text-3xl font-bold text-brand-dark mt-8 mb-8" data-aos="fade-up">Core Values</h2>
            <div class="grid grid-cols-2 gap-x-10 gap-y-8 mb-12">
                <div class="glass-card p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="100">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                        </div>
                        <h3 class="mt-0 text-xl font-bold text-brand-dark mb-0">Environment First</h3>
                    </div>
                    <p class="text-sm mb-0">Protecting the environment is our top priority. Every solution we design meets the highest EHS standards — not just the minimum legal requirement.</p>
                </div>
                <div class="glass-card p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="200">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <h3 class="mt-0 text-xl font-bold text-brand-dark mb-0">Client-Centric Support</h3>
                    </div>
                    <p class="text-sm mb-0">We provide timely, best-in-class service across every stage — from the first site visit to years of ongoing operation and maintenance.</p>
                </div>
                <div class="glass-card p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="300">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                        </div>
                        <h3 class="mt-0 text-xl font-bold text-brand-dark mb-0">Quality Assured</h3>
                    </div>
                    <p class="text-sm mb-0">We hold ourselves to recognized standards of engineering excellence, delivering robust solutions that stand the test of time.</p>
                </div>
                <div class="glass-card p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="400">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <h3 class="mt-0 text-xl font-bold text-brand-dark mb-0">Trust & Reliability</h3>
                    </div>
                    <p class="text-sm mb-0">With a proven track record of successful installations, our clients know they can depend on us even for urgent compliance needs.</p>
                </div>
            </div>

            <h1 class="text-4xl text-brand-dark font-black pt-6 border-t border-gray-200" data-aos="fade-up">3. Why Choose Us</h1>
            <div class="accent-bar mb-8" data-aos="scale-x"></div>
            
            <div class="grid grid-cols-2 gap-x-12 gap-y-8 mt-6">
                <div data-aos="fade-right" data-aos-delay="100">
                    <h3 class="mt-0 text-xl font-bold text-brand">Local & National Expertise</h3>
                    <p class="text-sm">Headquartered in Chhatrapati Sambhajinagar with a PAN India presence, combining deep, on-ground knowledge of MPCB regulations with the scale to serve clients nationwide.</p>
                </div>
                <div data-aos="fade-left" data-aos-delay="200">
                    <h3 class="mt-0 text-xl font-bold text-brand">Dedicated Professionals</h3>
                    <p class="text-sm">Our team is highly trained across environmental engineering, regulatory compliance, and industrial safety to handle complex projects flawlessly.</p>
                </div>
                <div data-aos="fade-right" data-aos-delay="300">
                    <h3 class="mt-0 text-xl font-bold text-brand">Comprehensive Solutions</h3>
                    <p class="text-sm">From legal compliances to complete turnkey installation of ETP, STP, and RO systems, we manage the entire journey under one roof.</p>
                </div>
                <div class="bg-brand/5 p-4 rounded-xl border border-brand/10" data-aos="fade-left" data-aos-delay="400">
                    <h3 class="mt-0 text-xl font-bold text-brand">One Partner, Every Stage</h3>
                    <p class="text-sm font-bold text-brand-dark mb-2">Design → Approval → Installation → Operation → Renewal</p>
                    <p class="text-sm mb-0">We stay with you through the entire lifecycle.</p>
                </div>
            </div>

        </div>
        <div class="page-footer">
            <span>AARADHYA ENVIRO BROCHURE</span>
            <span>02</span>
        </div>
    </div>

    <!-- PAGE 4: SERVICES 1 -->
    <div class="a4-page" data-aos="fade-up">
        <div class="watermark">AARADHYA</div>
        <div class="page-content">
            
            <div class="flex items-end justify-between mb-8 border-b-4 border-brand pb-4">
                <div>
                    <h1 class="text-5xl text-brand-dark font-black mb-2">4. Compliance & Consultancy</h1>
                    <p class="text-brand font-semibold text-lg uppercase tracking-widest mb-0">Our Core Services</p>
                </div>
                <svg class="w-16 h-16 text-brand/20 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            </div>

            <div class="space-y-8">
                <!-- Service 1 -->
                <div class="glass-card p-8 rounded-3xl" data-aos="fade-up" data-aos-delay="100">
                    <h2 class="mt-0 text-3xl font-bold text-brand-dark flex items-center gap-4">
                        <div class="bg-gradient-to-br from-brand to-brand-dark text-white w-12 h-12 flex items-center justify-center rounded-2xl text-xl shadow-lg font-black">1</div>
                        Legal Compliances (MPCB)
                    </h2>
                    <div class="grid grid-cols-3 gap-8 mt-6">
                        <div class="col-span-2">
                            <p class="text-base mb-3"><strong class="text-brand-dark font-bold">What It Is:</strong> Mandated consents and authorizations (CTE, CTO) from the Maharashtra Pollution Control Board.</p>
                            <p class="text-base mb-4"><strong class="text-brand-dark font-bold">Why It Matters:</strong> Operating without valid consent can result in production shutdown notices, heavy penalties, and legal action.</p>
                            <p class="text-base mb-2"><strong class="text-brand-dark font-bold">What We Do:</strong></p>
                            <ul class="check-list mt-2 grid grid-cols-2 gap-x-4">
                                <li>Assess industry category</li>
                                <li>Prepare CTE & CTO applications</li>
                                <li>Liaise with MPCB officers</li>
                                <li>Handle renewals proactively</li>
                            </ul>
                        </div>
                        <div class="bg-gradient-to-b from-brand/5 to-transparent p-5 rounded-2xl border border-brand/10 flex flex-col justify-center">
                            <h3 class="mt-0 text-lg font-bold text-brand-dark mb-3 text-center">Who Needs This?</h3>
                            <p class="text-sm text-center mb-0">Any manufacturing unit, processing plant, hospital, hotel, or commercial establishment generating emissions, effluent, or waste.</p>
                        </div>
                    </div>
                </div>

                <!-- Service 2 -->
                <div class="glass-card p-8 rounded-3xl" data-aos="fade-up" data-aos-delay="200">
                    <h2 class="mt-0 text-3xl font-bold text-brand-dark flex items-center gap-4">
                        <div class="bg-gradient-to-br from-brand to-brand-dark text-white w-12 h-12 flex items-center justify-center rounded-2xl text-xl shadow-lg font-black">2</div>
                        Environmental Clearances (EC)
                    </h2>
                    <div class="grid grid-cols-3 gap-8 mt-6">
                        <div class="col-span-2">
                            <p class="text-base mb-3"><strong class="text-brand-dark font-bold">What It Is:</strong> Clearance from SEIAA or MoEFCC required for specific industrial projects before construction.</p>
                            <p class="text-base mb-4"><strong class="text-brand-dark font-bold">Why It Matters:</strong> Beginning construction without it can lead to shutdowns and significant financial loss.</p>
                            <p class="text-base mb-2"><strong class="text-brand-dark font-bold">What We Do:</strong></p>
                            <ul class="check-list mt-2 grid grid-cols-2 gap-x-4">
                                <li>Determine Category (A or B)</li>
                                <li>Prepare EIA reports</li>
                                <li>Coordinate public hearings</li>
                                <li>Track application process</li>
                            </ul>
                        </div>
                        <div class="bg-gradient-to-b from-brand/5 to-transparent p-5 rounded-2xl border border-brand/10 flex flex-col justify-center">
                            <h3 class="mt-0 text-lg font-bold text-brand-dark mb-3 text-center">Who Needs This?</h3>
                            <p class="text-sm text-center mb-0">New industrial projects, expansions, mining operations, and infrastructure projects.</p>
                        </div>
                    </div>
                </div>

                <!-- Service 3 & 4 Grid -->
                <div class="grid grid-cols-2 gap-8">
                    <div class="glass-card p-8 rounded-3xl" data-aos="fade-right" data-aos-delay="300">
                        <h2 class="mt-0 text-2xl font-bold text-brand-dark mb-4">3. Audit & Reporting</h2>
                        <p class="text-sm mb-4"><strong class="text-brand-dark font-bold">What It Is:</strong> Periodic environmental reporting (Form IV, Form V).</p>
                        <ul class="check-list text-sm mt-2">
                            <li>Submit Form IV and Form V</li>
                            <li>Conduct internal audits</li>
                            <li>Prepare feasibility reports</li>
                        </ul>
                    </div>
                    
                    <div class="glass-card p-8 rounded-3xl" data-aos="fade-left" data-aos-delay="400">
                        <h2 class="mt-0 text-2xl font-bold text-brand-dark mb-4">4. CGWA & Bio-Medical</h2>
                        <p class="text-sm mb-4"><strong class="text-brand-dark font-bold">What It Is:</strong> NOCs for groundwater extraction and bio-medical waste.</p>
                        <ul class="check-list text-sm mt-2">
                            <li>Prepare CGWA NOC apps</li>
                            <li>Obtain Bio-Medical Auth.</li>
                            <li>Design waste systems</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
        <div class="page-footer">
            <span>AARADHYA ENVIRO BROCHURE</span>
            <span>03</span>
        </div>
    </div>

    <!-- PAGE 5: TURNKEY -->
    <div class="a4-page" data-aos="fade-up">
        <div class="watermark">AARADHYA</div>
        <div class="page-content">
            
            <div class="flex items-end justify-between mb-8 border-b-4 border-blue-600 pb-4">
                <div>
                    <h1 class="text-5xl text-blue-900 font-black mb-2">5. Turnkey Projects</h1>
                    <p class="text-blue-600 font-semibold text-lg uppercase tracking-widest mb-0">Engineering Excellence</p>
                </div>
                <svg class="w-16 h-16 text-blue-900/20 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>
            </div>

            <div class="bg-blue-50/50 p-6 rounded-2xl border-l-4 border-blue-500 mb-10 shadow-sm" data-aos="fade-right">
                <p class="text-xl text-blue-900 font-medium mb-0 italic">"We handle design, fabrication, installation, and commissioning under one roof, avoiding the common problems of multi-vendor coordination."</p>
            </div>

            <div class="grid grid-cols-2 gap-8">
                
                <!-- Box 1 -->
                <div class="glass-card group p-8 rounded-3xl border-t-8 border-t-blue-500 hover:border-t-blue-600" data-aos="fade-up" data-aos-delay="100">
                    <div class="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    </div>
                    <h2 class="mt-0 text-2xl font-bold text-blue-900 mb-3">ETP & STP Installation</h2>
                    <p class="text-sm text-gray-600 mb-6">Treat industrial wastewater (ETP) and domestic sewage (STP) before discharge, ensuring strict MPCB standards are met.</p>
                    <ul class="check-list text-sm space-y-2 mb-0 border-t border-gray-100 pt-4">
                        <li><strong>Design:</strong> Engineered for your flow</li>
                        <li><strong>Fabrication:</strong> Strict quality checks</li>
                        <li><strong>Erection:</strong> On-site construction</li>
                        <li><strong>Commissioning:</strong> Final calibration</li>
                    </ul>
                </div>

                <!-- Box 2 -->
                <div class="glass-card group p-8 rounded-3xl border-t-8 border-t-teal-500 hover:border-t-teal-600" data-aos="fade-up" data-aos-delay="200">
                    <div class="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 text-teal-600 group-hover:scale-110 transition-transform">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    </div>
                    <h2 class="mt-0 text-2xl font-bold text-teal-900 mb-3">ZLD & RO Systems</h2>
                    <p class="text-sm text-gray-600 mb-6">Zero Liquid Discharge (ZLD) and Reverse Osmosis (RO) systems to recycle all effluent, leaving no liquid waste.</p>
                    <ul class="check-list text-sm space-y-2 mb-0 border-t border-gray-100 pt-4">
                        <li>Complete ZLD system design</li>
                        <li>Industrial/commercial RO plants</li>
                        <li>Integration with ETP/STP</li>
                        <li>Evaporation & crystallization</li>
                    </ul>
                </div>

                <!-- Box 3 -->
                <div class="glass-card group p-8 rounded-3xl border-t-8 border-t-emerald-500 hover:border-t-emerald-600" data-aos="fade-up" data-aos-delay="300">
                    <div class="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                    </div>
                    <h2 class="mt-0 text-2xl font-bold text-emerald-900 mb-3">Air Pollution Control</h2>
                    <p class="text-sm text-gray-600 mb-6">Capture and treat emissions (dust, gases, odour) before release to meet air quality standards.</p>
                    <ul class="check-list text-sm space-y-2 mb-0 border-t border-gray-100 pt-4">
                        <li>Scrubbers and Bag Filters</li>
                        <li>Cyclone Separators</li>
                        <li>Electrostatic Precipitators</li>
                        <li>Odour control systems</li>
                    </ul>
                </div>

                <!-- Box 4 -->
                <div class="glass-card group p-8 rounded-3xl border-t-8 border-t-indigo-500 hover:border-t-indigo-600" data-aos="fade-up" data-aos-delay="400">
                    <div class="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h2 class="mt-0 text-2xl font-bold text-indigo-900 mb-3">Plant Up-gradation</h2>
                    <p class="text-sm text-gray-600 mb-6">Assess, redesign, and upgrade existing environmental infrastructure to meet current regulations.</p>
                    <ul class="check-list text-sm space-y-2 mb-0 border-t border-gray-100 pt-4">
                        <li>Technical system audits</li>
                        <li>Capacity shortfall analysis</li>
                        <li>Additional treatment stages</li>
                        <li>Minimal downtime execution</li>
                    </ul>
                </div>

            </div>
            
        </div>
        <div class="page-footer">
            <span>AARADHYA ENVIRO BROCHURE</span>
            <span>04</span>
        </div>
    </div>

    <!-- PAGE 6: TESTING & MANAGEMENT -->
    <div class="a4-page" data-aos="fade-up">
        <div class="watermark">AARADHYA</div>
        <div class="page-content">
            
            <div class="flex items-end justify-between mb-10 border-b-4 border-emerald-500 pb-4">
                <div>
                    <h1 class="text-5xl text-brand-dark font-black mb-2">6. Testing & Management</h1>
                    <p class="text-emerald-600 font-semibold text-lg uppercase tracking-widest mb-0">Analytics & Operations</p>
                </div>
                <svg class="w-16 h-16 text-brand/20 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v-2h2V7c0-1.1.9-2 2-2h2v5h2v2zm4 4h-2v-2h-2v2h-2v-5h2v-2h2v2h2v5z"/></svg>
            </div>

            <div class="grid grid-cols-2 gap-x-10 gap-y-12">
                
                <!-- Section 1 -->
                <div data-aos="fade-right" data-aos-delay="100" class="group">
                    <h2 class="mt-0 text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <div class="w-2 h-8 bg-brand rounded-full group-hover:bg-accent transition-colors"></div>
                        Air, Water & Soil Testing
                    </h2>
                    <p class="text-sm text-gray-600 mt-2 mb-4">Regular laboratory testing provides documented proof of compliance and catches issues early.</p>
                    <ul class="check-list text-sm bg-white/50 p-5 rounded-2xl shadow-sm border border-brand/5">
                        <li>Stack emission testing</li>
                        <li>Effluent/water quality testing</li>
                        <li>Soil contamination assessment</li>
                        <li>Fully documented regulatory reports</li>
                    </ul>
                </div>

                <!-- Section 2 -->
                <div data-aos="fade-left" data-aos-delay="200" class="group">
                    <h2 class="mt-0 text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <div class="w-2 h-8 bg-brand rounded-full group-hover:bg-accent transition-colors"></div>
                        Online Monitoring Systems
                    </h2>
                    <p class="text-sm text-gray-600 mt-2 mb-4">Automated digital systems (CEMS/CEQMS) that continuously track emissions.</p>
                    <ul class="check-list text-sm bg-white/50 p-5 rounded-2xl shadow-sm border border-brand/5">
                        <li>Supply, install, and calibrate CEMS</li>
                        <li>Digital display boards</li>
                        <li>Integration with MPCB servers</li>
                        <li>Ongoing calibration and maintenance</li>
                    </ul>
                </div>

                <!-- Section 3 -->
                <div data-aos="fade-right" data-aos-delay="300" class="group">
                    <h2 class="mt-0 text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <div class="w-2 h-8 bg-brand rounded-full group-hover:bg-accent transition-colors"></div>
                        Treatability & Noise
                    </h2>
                    <p class="text-sm text-gray-600 mt-2 mb-4">Analyze specific wastewater characteristics (Treatability) and monitor industrial noise levels.</p>
                    <ul class="check-list text-sm bg-white/50 p-5 rounded-2xl shadow-sm border border-brand/5">
                        <li>Laboratory and pilot-scale trials</li>
                        <li>Process efficiency identification</li>
                        <li>On-site noise level measurements</li>
                        <li>Acoustic control recommendations</li>
                    </ul>
                </div>

                <!-- Section 4 -->
                <div data-aos="fade-left" data-aos-delay="400" class="group">
                    <h2 class="mt-0 text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <div class="w-2 h-8 bg-brand rounded-full group-hover:bg-accent transition-colors"></div>
                        Hazardous & Plastic EPR
                    </h2>
                    <p class="text-sm text-gray-600 mt-2 mb-4">Specialized handling for hazardous waste and Extended Producer Responsibility (EPR).</p>
                    <ul class="check-list text-sm bg-white/50 p-5 rounded-2xl shadow-sm border border-brand/5">
                        <li>Sludge analysis and storage design</li>
                        <li>Disposal through authorized recyclers</li>
                        <li>EPR registration on CPCB portal</li>
                        <li>Annual EPR returns filing</li>
                    </ul>
                </div>

            </div>

            <!-- O&M and Training -->
            <div class="mt-12 bg-gradient-to-r from-brand-dark to-brand text-white p-10 rounded-[2rem] shadow-2xl relative overflow-hidden" data-aos="zoom-in" data-aos-delay="500">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
                <h2 class="mt-0 text-3xl font-black text-accent mb-8 relative z-10">Operations & Training</h2>
                <div class="grid grid-cols-2 gap-10 relative z-10">
                    <div>
                        <h3 class="text-white mt-0 text-xl font-bold flex items-center gap-2 mb-4">
                            <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            O&M Services
                        </h3>
                        <p class="text-base text-brand-light leading-relaxed">Trained operators for daily running of ETP/STP, scheduled preventive maintenance, real-time adjustments, and Annual Maintenance Contracts (AMC).</p>
                    </div>
                    <div>
                        <h3 class="text-white mt-0 text-xl font-bold flex items-center gap-2 mb-4">
                            <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            Compliance Training
                        </h3>
                        <p class="text-base text-brand-light leading-relaxed">Equip internal teams with knowledge of MPCB regulations, correct equipment operation, and audit-readiness through customized programs.</p>
                    </div>
                </div>
            </div>

        </div>
        <div class="page-footer">
            <span>AARADHYA ENVIRO BROCHURE</span>
            <span>05</span>
        </div>
    </div>

    <!-- PAGE 7: PRODUCTS & CONTACT -->
    <div class="a4-page" data-aos="fade-up">
        <div class="watermark">AARADHYA</div>
        <div class="page-content flex flex-col h-full">
            
            <div class="mb-12">
                <h1 class="text-4xl text-brand-dark font-black mt-0 mb-4" data-aos="fade-right">Our Products</h1>
                <div class="accent-bar mb-8" data-aos="scale-x"></div>
                <div class="grid grid-cols-2 gap-6">
                    <div class="glass-card p-6 rounded-2xl group" data-aos="fade-up" data-aos-delay="100">
                        <h3 class="mt-0 text-xl font-bold text-brand-dark mb-1 group-hover:text-brand transition-colors">ETP Systems</h3>
                        <p class="text-sm mb-0">Complete industrial wastewater treatment units designed for varied effluents.</p>
                    </div>
                    <div class="glass-card p-6 rounded-2xl group" data-aos="fade-up" data-aos-delay="200">
                        <h3 class="mt-0 text-xl font-bold text-brand-dark mb-1 group-hover:text-brand transition-colors">STP Systems</h3>
                        <p class="text-sm mb-0">Efficient domestic and commercial sewage treatment plants.</p>
                    </div>
                    <div class="glass-card p-6 rounded-2xl group" data-aos="fade-up" data-aos-delay="300">
                        <h3 class="mt-0 text-xl font-bold text-brand-dark mb-1 group-hover:text-brand transition-colors">ZLD Systems</h3>
                        <p class="text-sm mb-0">Advanced systems ensuring zero liquid discharge and water recovery.</p>
                    </div>
                    <div class="glass-card p-6 rounded-2xl group" data-aos="fade-up" data-aos-delay="400">
                        <h3 class="mt-0 text-xl font-bold text-brand-dark mb-1 group-hover:text-brand transition-colors">RO Plants</h3>
                        <p class="text-sm mb-0">Industrial scale reverse osmosis for ultimate water purification.</p>
                    </div>
                </div>
            </div>

            <!-- Clients & Service Areas -->
            <div class="bg-gray-900 text-white p-10 rounded-[2.5rem] mb-12 shadow-2xl flex-grow flex flex-col justify-center relative overflow-hidden" data-aos="zoom-in">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark/50"></div>
                
                <h2 class="text-3xl font-black text-accent mt-0 text-center mb-10 relative z-10">Trusted by 500+ Clients PAN India</h2>
                <div class="grid grid-cols-3 gap-4 text-center mb-10 relative z-10">
                    <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-sm font-bold border border-white/5 hover:bg-white/20 transition-colors">Bai-Kakaji Group</div>
                    <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-sm font-bold border border-white/5 hover:bg-white/20 transition-colors">S J Contracts Pvt. Ltd.</div>
                    <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-sm font-bold border border-white/5 hover:bg-white/20 transition-colors">Renuka Sugar Renapur</div>
                    <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-sm font-bold border border-white/5 hover:bg-white/20 transition-colors">Atul</div>
                    <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-sm font-bold border border-white/5 hover:bg-white/20 transition-colors">Rohan Builders</div>
                    <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-sm font-bold border border-white/5 hover:bg-white/20 transition-colors">Shimizu Corporation</div>
                </div>
                
                <div class="text-center border-t border-white/10 pt-8 relative z-10">
                    <p class="text-white/50 text-sm uppercase tracking-[0.2em] font-black mb-4">Areas We Serve</p>
                    <p class="text-emerald-400 text-base font-medium leading-loose">
                        Chhatrapati Sambhajinagar &nbsp;•&nbsp; Pune &nbsp;•&nbsp; Mumbai &nbsp;•&nbsp; Nashik &nbsp;•&nbsp; Nagpur<br>
                        Ahmednagar &nbsp;•&nbsp; Jalna &nbsp;•&nbsp; Beed &nbsp;•&nbsp; Latur &nbsp;•&nbsp; Osmanabad &nbsp;•&nbsp; Nanded
                    </p>
                </div>
            </div>

            <!-- Contact Box -->
            <div class="bg-gradient-to-r from-brand-light to-white border-2 border-brand/20 p-8 rounded-3xl flex items-center justify-between shadow-lg" data-aos="fade-up">
                <div>
                    <h2 class="text-2xl font-black text-brand-dark mt-0 mb-2">Ready to Ensure Compliance?</h2>
                    <p class="text-base text-brand font-medium mb-0">Contact our experts today for a site assessment.</p>
                </div>
                <div class="text-right">
                    <p class="text-4xl font-black text-brand-dark mb-1">99759 29212</p>
                    <p class="text-sm font-bold text-brand mb-0 uppercase tracking-widest">info@aaradhyaenviro.com</p>
                </div>
            </div>

        </div>
        <div class="page-footer border-t-2 border-brand/20">
            <span class="text-brand-dark font-bold">10, Wadgaon Kolhati, MIDC Waluj Area, Chhatrapati Sambhajinagar - 431136</span>
            <span>06</span>
        </div>
    </div>

    <!-- AOS Script Initialization -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    </script>
</body>
</html>
"""

with open('brochure.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Created beautifully redesigned brochure.html without certifications")
