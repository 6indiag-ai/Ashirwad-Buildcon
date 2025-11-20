
// Basic interactive behaviors: demo AI generation, contact form, download button and PWA install prompt
const scriptInput = document.getElementById('scriptInput');
const scriptOutput = document.getElementById('scriptOutput');
document.getElementById('generateScript').addEventListener('click', ()=>{
  const topic = scriptInput.value.trim() || "New Product";
  scriptOutput.textContent = `Demo AI Script for "${topic}"\n\n1) Hook (0-10s): Start with a strong question.\n2) Problem (10-30s): Explain pain points.\n3) Solution (30-60s): Show Ashirwad Buildcon solution.\n4) CTA: Contact on WhatsApp 7004344611.\n\n(Ye sirf demo text hai — real AI backend se generate hota hai.)`;
});

// Contact form (frontend only)
document.getElementById('contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  alert('Thank you! This is a frontend demo. Contact details are recorded locally only.');
});

// Download App button behavior: triggers a direct download (placeholder apk)
document.getElementById('downloadAppBtn').addEventListener('click', ()=>{
  const proceed = confirm('Download Ashirwad Buildcon app (demo placeholder file). Use at your own discretion.');
  if(!proceed) return;
  // start download
  const a = document.createElement('a');
  a.href = 'assets/app-release.apk';
  a.download = 'AshirwadBuildcon_app.apk';
  document.body.appendChild(a);
  a.click();
  a.remove();
});

// PWA install prompt handling (basic)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('downloadAppBtn');
  btn.style.display = 'inline-block';
  btn.textContent = 'Install App';
  btn.addEventListener('click', async () => {
    if(deferredPrompt){
      deferredPrompt.prompt();
      const {outcome} = await deferredPrompt.userChoice;
      deferredPrompt = null;
    }
  });
});

// Register service worker (for PWA)
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js').catch(()=>console.log('SW registration failed'));
}
