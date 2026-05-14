(function(){
  const firebaseConfig = {
    apiKey: "AIzaSyC5aYsmT1qUJd5D8GVh5WlIlLeiT35t8WQ",
    authDomain: "hrpro-f80e7.firebaseapp.com",
    databaseURL: "https://hrpro-f80e7-default-rtdb.firebaseio.com",
    projectId: "hrpro-f80e7",
    storageBucket: "hrpro-f80e7.firebasestorage.app",
    messagingSenderId: "999134303706",
    appId: "1:999134303706:web:a9f0b7bacb6ba796f55ce3",
    measurementId: "G-JFC4SPKXDK"
  };

  let databasePromise = null;

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const existing = document.querySelector(`script[src="${src}"]`);
      if(existing){
        if(existing.dataset.loaded === 'true' || window.firebase?.database){
          resolve();
          return;
        }
        existing.addEventListener('load', resolve, {once:true});
        existing.addEventListener('error', reject, {once:true});
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = ()=>{
        script.dataset.loaded = 'true';
        resolve();
      };
      script.onerror = ()=>reject(new Error(`تعذر تحميل ${src}`));
      document.head.appendChild(script);
    });
  }

  async function getDatabase(){
    if(!databasePromise){
      databasePromise = Promise.resolve()
        .then(()=>loadScript('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js'))
        .then(()=>loadScript('https://www.gstatic.com/firebasejs/10.12.5/firebase-database-compat.js'))
        .then(()=>{
          const app = window.firebase.apps?.length ? window.firebase.app() : window.firebase.initializeApp(firebaseConfig);
          return app.database();
        });
    }
    return databasePromise;
  }

  window.publishHrmsApprovedSchedule = async function(payload){
    const db = await getDatabase();
    const publishedAt = new Date().toISOString();
    const dayKey = payload?.dayKey || '';
    const schedule = payload?.schedule || {};
    await db.ref('hrData').update({
      employees:payload?.employees || {},
      employers:payload?.employers || {},
      fingerprintCodes:payload?.fingerprintCodes || {},
      updatedAt:publishedAt,
      lastApprovedSchedule:{
        dayKey,
        approvedAt:schedule.approvedAt || '',
        publishedAt
      }
    });
    if(dayKey) await db.ref(`hrData/schedules/${dayKey}`).set(schedule);
    return publishedAt;
  };
})();
