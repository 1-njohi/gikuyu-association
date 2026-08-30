document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ JavaScript is loaded and running!");

    // --- 1. MOBILE HAMBURGER TOGGLE (Debug version) ---
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    console.log("🔍 Hamburger element:", hamburger);
    console.log("🔍 Mobile Nav element:", mobileNav);

    if (hamburger && mobileNav) {
        console.log("✅ Both elements found. Adding click listener...");

        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("🟢 Hamburger was CLICKED!");

            // Toggle the 'open' class
            mobileNav.classList.toggle('open');
            console.log("🔁 Mobile nav classes now:", mobileNav.classList);

            // Change the hamburger icon
            if (mobileNav.classList.contains('open')) {
                hamburger.textContent = '✕';
                console.log("📂 Menu opened");
            } else {
                hamburger.textContent = '☰';
                console.log("📁 Menu closed");
            }
        });
    } else {
        console.error("❌ ERROR: Hamburger or Mobile Nav not found in the DOM!");
        console.log("Hamburger found?", !!hamburger);
        console.log("MobileNav found?", !!mobileNav);
    }

    // --- 2. DYNAMIC YEAR IN FOOTER ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
        console.log("📅 Year set to:", yearSpan.textContent);
    }

    // --- 3. MEMBERSHIP FORM (Google Apps Script) ---
    const form = document.getElementById('membership-form');
    const messageDiv = document.getElementById('form-message');

    if (form) {
        console.log("📝 Membership form found. Adding submit listener...");
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log("📤 Form submitted!");

            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = '⏳ Submitting...';

            const payload = {
                fullName: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                regNumber: document.getElementById('regNumber').value.trim(),
                memberType: document.getElementById('memberType').value
            };

            console.log("📦 Payload:", payload);

            if (!payload.fullName || !payload.email || !payload.phone || !payload.regNumber) {
                showMessage('⚠️ Please fill in all required fields.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = '✅ Register Now';
                return;
            }

            try {
                // !!! REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT URL !!!
                const scriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
                console.log("🌐 Sending to:", scriptUrl);

                const response = await fetch(scriptUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                console.log("📨 Fetch completed (no-cors means we can't read response)");
                showMessage('🎉 Registration successful! Welcome to Nyũmba ya Mũmbi.', 'success');
                form.reset();

            } catch (error) {
                console.error("❌ Fetch error:", error);
                showMessage('⚠️ Something went wrong. Please try again or contact the association directly.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = '✅ Register Now';
            }
        });
    } else {
        console.warn("⚠️ Membership form not found on this page.");
    }

    function showMessage(text, type) {
        if (!messageDiv) return;
        messageDiv.style.display = 'block';
        messageDiv.textContent = text;
        messageDiv.style.background = type === 'success' ? '#d4edda' : '#f8d7da';
        messageDiv.style.color = type === 'success' ? '#155724' : '#721c24';
        messageDiv.style.border = '1px solid ' + (type === 'success' ? '#c3e6cb' : '#f5c6cb');
        messageDiv.style.borderRadius = '10px';
        console.log("📢 Message shown:", text);

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 7000);
    }

    // --- 4. Highlight active nav link ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log("📍 Current page:", currentPage);
    document.querySelectorAll('#mobile-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            console.log("✅ Active link set for:", link.textContent);
        }
    });
});