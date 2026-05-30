const CORRECT_PIN = '5466';
let pinValue = '';

// Countries data
const countries = [
  {name:'الكويت',code:'KW',dial:'+965',flag:'🇰🇼'},
  {name:'السعودية',code:'SA',dial:'+966',flag:'🇸🇦'},
  {name:'الإمارات',code:'AE',dial:'+971',flag:'🇦🇪'},
  {name:'البحرين',code:'BH',dial:'+973',flag:'🇧🇭'},
  {name:'قطر',code:'QA',dial:'+974',flag:'🇶🇦'},
  {name:'عُمان',code:'OM',dial:'+968',flag:'🇴🇲'},
  {name:'اليمن',code:'YE',dial:'+967',flag:'🇾🇪'},
  {name:'العراق',code:'IQ',dial:'+964',flag:'🇮🇶'},
  {name:'سوريا',code:'SY',dial:'+963',flag:'🇸🇾'},
  {name:'لبنان',code:'LB',dial:'+961',flag:'🇱🇧'},
  {name:'الأردن',code:'JO',dial:'+962',flag:'🇯🇴'},
  {name:'فلسطين',code:'PS',dial:'+970',flag:'🇵🇸'},
  {name:'مصر',code:'EG',dial:'+20',flag:'🇪🇬'},
  {name:'السودان',code:'SD',dial:'+249',flag:'🇸🇩'},
  {name:'ليبيا',code:'LY',dial:'+218',flag:'🇱🇾'},
  {name:'تونس',code:'TN',dial:'+216',flag:'🇹🇳'},
  {name:'الجزائر',code:'DZ',dial:'+213',flag:'🇩🇿'},
  {name:'المغرب',code:'MA',dial:'+212',flag:'🇲🇦'},
  {name:'موريتانيا',code:'MR',dial:'+222',flag:'🇲🇷'},
  {name:'الصومال',code:'SO',dial:'+252',flag:'🇸🇴'},
  {name:'باكستان',code:'PK',dial:'+92',flag:'🇵🇰'},
  {name:'الهند',code:'IN',dial:'+91',flag:'🇮🇳'},
  {name:'بنغلاديش',code:'BD',dial:'+880',flag:'🇧🇩'},
  {name:'إندونيسيا',code:'ID',dial:'+62',flag:'🇮🇩'},
  {name:'الفلبين',code:'PH',dial:'+63',flag:'🇵🇭'},
  {name:'سريلانكا',code:'LK',dial:'+94',flag:'🇱🇰'},
  {name:'نيبال',code:'NP',dial:'+977',flag:'🇳🇵'},
  {name:'الولايات المتحدة',code:'US',dial:'+1',flag:'🇺🇸'},
  {name:'المملكة المتحدة',code:'GB',dial:'+44',flag:'🇬🇧'},
  {name:'فرنسا',code:'FR',dial:'+33',flag:'🇫🇷'},
  {name:'ألمانيا',code:'DE',dial:'+49',flag:'🇩🇪'},
  {name:'تركيا',code:'TR',dial:'+90',flag:'🇹🇷'},
  {name:'إيران',code:'IR',dial:'+98',flag:'🇮🇷'},
  {name:'إثيوبيا',code:'ET',dial:'+251',flag:'🇪🇹'},
  {name:'كينيا',code:'KE',dial:'+254',flag:'🇰🇪'},
  {name:'نيجيريا',code:'NG',dial:'+234',flag:'🇳🇬'},
  {name:'أوغندا',code:'UG',dial:'+256',flag:'🇺🇬'},
];

// App State
let appData = JSON.parse(localStorage.getItem('hrmsData') || '{}');
function ensureAppDataShape(){
  if(!appData || typeof appData !== 'object') appData = {};
  if(!appData.employees) appData.employees = [];
  if(!appData.employers) appData.employers = [];
  if(!appData.schedules) appData.schedules = {};
  if(!appData.settings) appData.settings = {};
  if(!appData.reminders) appData.reminders = [];
  if(!appData.fingerprintCodes) appData.fingerprintCodes = {};
  if(!appData.fingerprintPunches) appData.fingerprintPunches = [];
  if(!appData.fingerprintPlaces) appData.fingerprintPlaces = {};
}
ensureAppDataShape();

let currentPage = 'employees';
let prevPage = null;
let editingEmpId = null;
let currentProfileId = null;
let currentDocType = null;
let editingEmployerId = null;
let empSegments = [];
let selectedDay = null;
let scheduleState = {};
let dragEmpId = null;
let dragSourceZone = null;
let pendingSchedEmpId = null;
let pendingSchedZone = null;
let scheduleModified = false;
let intlSelectedCountry = null;
let selectedSaveDirectoryHandle = null;
let folderSyncTimer = null;
let folderSyncRunning = false;
let folderSyncPending = false;
let firebasePublisherScriptPromise = null;
let fingerprintPlaceSessionId = null;
let fingerprintPlaceSessionUnsubscribe = null;
let fingerprintPlacesUnsubscribe = null;
let pendingFingerprintPlaceDevice = null;
let fingerprintPlacesCache = {};

function saveData(options={}){
  ensureAppDataShape();
  localStorage.setItem('hrmsData',JSON.stringify(appData));
  if(options.sync !== false) queueFolderSync();
}

function collectionCount(value){
  if(Array.isArray(value)) return value.length;
  if(value && typeof value === 'object') return Object.keys(value).length;
  return 0;
}

function hasMeaningfulHrData(data=appData){
  return collectionCount(data.employees) > 0 || collectionCount(data.employers) > 0 || collectionCount(data.schedules) > 0;
}

function buildEmptyHrData(settings={}){
  return {
    employees:[],
    employers:[],
    schedules:{},
    settings,
    reminders:[],
    fingerprintCodes:{},
    fingerprintPunches:[],
    fingerprintPlaces:{},
    books:{general:[], deduct:[], warn:[], notice:[]},
    decisions:[],
    schedulePdfHistory:{}
  };
}

function resetToFreshFolderDatabase(folderName){
  const currentSettings = {...(appData.settings || {})};
  const selectedAt = new Date().toISOString();
  appData = buildEmptyHrData({
    theme:currentSettings.theme || 'light',
    saveFolderName:folderName || currentSettings.saveFolderName || '',
    folderSelectedAt:selectedAt,
    freshFolderStartedAt:selectedAt
  });
  editingEmpId = null;
  currentProfileId = null;
  selectedDay = null;
  scheduleState = {};
  scheduleModified = false;
  empSegments = [];
  refreshAppAfterDataLoad();
}

function normalizeDigits(value){
  return String(value ?? '')
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
}

function normalizeNumericInput(el){
  el.value = normalizeDigits(el.value).replace(/[^0-9]/g,'');
}

function toArabicDigits(value){
  return String(value ?? '').replace(/\d/g, d=>'٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

function formatDateInput(date=new Date()){
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function parseDateInput(value){
  if(!value) return new Date();
  const [y,m,d] = String(value).split('-').map(Number);
  return new Date(y,m-1,d);
}

function openFingerprintApp(){
  window.location.href = encodeURI('تطبيق البصمة/index.html');
}

function openFingerprintReport(){
  window.location.href = 'basma.html';
}

function getFirebaseEmployeesPayload(){
  const payload = {};
  appData.employees.forEach(emp=>{
    const employer = appData.employers.find(item=>item.id === emp.employerId || item.name === emp.employer);
    payload[emp.id] = {
      id:emp.id,
      name:emp.name || '',
      position:emp.position || '',
      employer:emp.employer || '',
      employerId:employer?.id || emp.employerId || '',
      hours:emp.hours || 8,
      schedType:emp.schedType || 'fixed',
      segments:(emp.segments || []).map(seg=>({
        from:seg.from,
        to:seg.to,
        hours:seg.hours,
        tasks:seg.tasks || [],
        employerId:seg.employerId || employer?.id || emp.employerId || '',
        employerName:seg.employerName || employer?.name || emp.employer || ''
      }))
    };
  });
  return payload;
}

function getFirebaseEmployersPayload(){
  const payload = {};
  appData.employers.forEach(employer=>{
    payload[employer.id] = {
      id:employer.id,
      name:employer.name || '',
      branches:normalizeEmployerBranches(employer),
      createdAt:employer.createdAt || '',
      updatedAt:employer.updatedAt || ''
    };
  });
  return payload;
}

function loadExternalScript(src){
  return new Promise((resolve,reject)=>{
    const existing = document.querySelector(`script[src="${src}"]`);
    if(existing){
      existing.addEventListener('load', resolve, {once:true});
      existing.addEventListener('error', reject, {once:true});
      if(existing.dataset.loaded === 'true') resolve();
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

async function loadFirebasePublisher(options={}){
  const needsSessionWatcher = options.requireSessionWatcher === true;
  const needsFresh = options.fresh === true;
  const hasRequiredApi = !needsFresh && window.publishHrmsApprovedSchedule && window.hrmsFirebase && (!needsSessionWatcher || typeof window.hrmsFirebase.watchFingerprintPlaceSessions === 'function');
  if(hasRequiredApi) return;
  if(!firebasePublisherScriptPromise || needsSessionWatcher || needsFresh){
    const cacheKey = (needsSessionWatcher || needsFresh) ? `?v=${Date.now()}` : '';
    firebasePublisherScriptPromise = loadExternalScript(`firebase-publisher.js${cacheKey}`);
  }
  await firebasePublisherScriptPromise;
}

function cloneForFirebase(data){
  return JSON.parse(JSON.stringify(data ?? null));
}

async function publishApprovedScheduleToFirebase(dayKey, schedule){
  await loadFirebasePublisher();
  if(!window.publishHrmsApprovedSchedule) throw new Error('ناشر Firebase غير جاهز');
  return window.publishHrmsApprovedSchedule({
    dayKey,
    schedule:cloneForFirebase(schedule),
    employees:getFirebaseEmployeesPayload(),
    employers:getFirebaseEmployersPayload(),
    fingerprintCodes:appData.fingerprintCodes || {}
  });
}

function getFingerprintPlaceSessionId(){
  if(!fingerprintPlaceSessionId){
    fingerprintPlaceSessionId = localStorage.getItem('hrmsFingerprintPlaceSessionId') || `fp-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    localStorage.setItem('hrmsFingerprintPlaceSessionId', fingerprintPlaceSessionId);
  }
  return fingerprintPlaceSessionId;
}

function resetFingerprintPlaceSessionId(){
  localStorage.removeItem('hrmsFingerprintPlaceSessionId');
  fingerprintPlaceSessionId = null;
}

function getFingerprintPlaceLink(){
  return `https://figsandolives.github.io/HRMS/index.html?fingerprintPlaceSession=${encodeURIComponent(getFingerprintPlaceSessionId())}`;
}

async function openFingerprintPlacesPage(){
  showLoading('جاري فتح أماكن البصمة...');
  navTo('fingerprintPlaces');
  try{
    await setupFingerprintPlacesPage();
  } catch(err){
    console.error(err);
    showToast('تعذر فتح أماكن البصمة','error');
  } finally {
    hideLoading();
  }
}

async function setupFingerprintPlacesPage(){
  const linkInput = document.getElementById('fingerprintPlaceLink');
  if(linkInput) linkInput.value = getFingerprintPlaceLink();
  renderFingerprintPlaceEmployerChoices();
  renderFingerprintPlacesList();
  await loadFirebasePublisher({requireSessionWatcher:true});
  if(fingerprintPlaceSessionUnsubscribe) fingerprintPlaceSessionUnsubscribe();
  if(fingerprintPlacesUnsubscribe) fingerprintPlacesUnsubscribe();
  if(typeof window.hrmsFirebase.watchFingerprintPlaceSessions === 'function'){
    fingerprintPlaceSessionUnsubscribe = await window.hrmsFirebase.watchFingerprintPlaceSessions(data=>{
      const session = pickFingerprintPlaceSession(data);
      pendingFingerprintPlaceDevice = session || null;
      renderFingerprintPlaceDevice(session);
    });
  } else if(typeof window.hrmsFirebase.watchFingerprintPlaceSession === 'function'){
    fingerprintPlaceSessionUnsubscribe = await window.hrmsFirebase.watchFingerprintPlaceSession(getFingerprintPlaceSessionId(), data=>{
      pendingFingerprintPlaceDevice = data || null;
      renderFingerprintPlaceDevice(data);
    });
  } else {
    throw new Error('ملف Firebase قديم. ارفع firebase-publisher.js ثم حدث الصفحة.');
  }
  fingerprintPlacesUnsubscribe = await window.hrmsFirebase.watchFingerprintPlaces(data=>{
    fingerprintPlacesCache = data || {};
    renderFingerprintPlacesList();
  });
}

function pickFingerprintPlaceSession(sessionsMap={}){
  const currentId = getFingerprintPlaceSessionId();
  const sessions = Object.values(sessionsMap || {})
    .filter(session=>session?.location)
    .sort((a,b)=>getFingerprintSessionTime(b)-getFingerprintSessionTime(a));
  if(!sessions.length) return null;
  return sessions.find(session=>session.sessionId === currentId) || sessions[0];
}

function getFingerprintSessionTime(session){
  if(typeof session?.connectedAt === 'number') return session.connectedAt;
  const parsed = Date.parse(session?.updatedAt || session?.location?.capturedAt || '');
  return Number.isFinite(parsed) ? parsed : 0;
}

function copyFingerprintPlaceLink(){
  const link = getFingerprintPlaceLink();
  navigator.clipboard?.writeText(link).then(()=>{
    showToast('تم نسخ رابط مكان البصمة');
  }).catch(()=>{
    const input = document.getElementById('fingerprintPlaceLink');
    input?.select();
    showToast('انسخ الرابط من الخانة');
  });
}

function renderFingerprintPlaceEmployerChoices(){
  const container = document.getElementById('fingerprintPlaceEmployerChoices');
  if(!container) return;
  if(!appData.employers.length){
    container.innerHTML = '<div class="setting-sub">أضف جهة عمل أولاً.</div>';
    return;
  }
  container.innerHTML = appData.employers.map(employer=>`
    <label class="branch-choice">
      <input type="checkbox" value="${employer.id}">
      <span>
        ${escapeHtml(employer.name)}
        <small>${normalizeEmployerBranches(employer).map(getBranchLabel).join('، ') || 'بدون فرع محدد'}</small>
      </span>
    </label>
  `).join('');
}

function getSelectedFingerprintPlaceEmployers(){
  const ids = [...document.querySelectorAll('#fingerprintPlaceEmployerChoices input:checked')].map(input=>input.value);
  return ids.map(id=>getEmployerByIdOrName(id)).filter(Boolean);
}

function renderFingerprintPlaceDevice(data){
  const card = document.getElementById('fingerprintPlaceDeviceCard');
  const title = document.getElementById('fingerprintDeviceTitle');
  const details = document.getElementById('fingerprintDeviceDetails');
  const panel = document.getElementById('fingerprintBindPanel');
  if(!card || !title || !details || !panel) return;
  if(!data?.location){
    card.className = 'fingerprint-device-card waiting';
    title.textContent = 'بانتظار اتصال جهاز كمبيوتر';
    details.textContent = 'افتح الرابط أعلاه من الجهاز الموجود في مكان البصمة.';
    panel.style.display = 'none';
    return;
  }
  card.className = 'fingerprint-device-card connected';
  title.textContent = 'تم اتصال جهاز كمبيوتر من رابط مكان البصمة';
  details.innerHTML = formatFingerprintDeviceDetails(data);
  panel.style.display = 'block';
}

function formatFingerprintDeviceDetails(data){
  const loc = data.location || {};
  const device = data.device || {};
  const rows = [
    `خط العرض: ${Number(loc.lat).toFixed(7)}`,
    `خط الطول: ${Number(loc.lng).toFixed(7)}`,
    `دقة الموقع: ${Math.round(Number(loc.accuracy) || 0)} متر`,
    loc.sampleCount ? `عدد قراءات GPS: ${loc.sampleCount}` : '',
    loc.bestAccuracy ? `أفضل دقة: ${Math.round(Number(loc.bestAccuracy))} متر` : '',
    loc.altitude != null ? `الارتفاع: ${Math.round(Number(loc.altitude))} متر` : 'الارتفاع: غير متاح من المتصفح',
    loc.altitudeAccuracy != null ? `دقة الارتفاع: ${Math.round(Number(loc.altitudeAccuracy))} متر` : '',
    `النظام: ${escapeHtml(device.platform || 'غير معروف')}`,
    `اللغة: ${escapeHtml(device.language || '')}`,
    `المنطقة الزمنية: ${escapeHtml(device.timeZone || '')}`,
    `الشاشة: ${escapeHtml(device.screen || '')}`,
    `المتصفح: ${escapeHtml(device.userAgent || '')}`
  ].filter(Boolean);
  return `<div class="fingerprint-place-meta">${rows.join('<br>')}</div>`;
}

function renderFingerprintPlacesList(){
  const list = document.getElementById('fingerprintPlacesList');
  if(!list) return;
  const places = Object.values(fingerprintPlacesCache || {});
  if(!places.length){
    list.innerHTML = '<div class="empty-state"><p>لا توجد أماكن بصمة محفوظة بعد</p></div>';
    return;
  }
  list.innerHTML = places.map(place=>{
    const loc = place.location || {};
    const employerNames = Array.isArray(place.employerNames) ? place.employerNames.join('، ') : '';
    const meta = [
      `جهة العمل: ${escapeHtml(employerNames || 'غير محددة')}`,
      `الحدود: ${Number(place.radiusMeters) || 0} متر`,
      Number.isFinite(Number(loc.lat)) && Number.isFinite(Number(loc.lng)) ? `الإحداثيات: ${Number(loc.lat).toFixed(7)}, ${Number(loc.lng).toFixed(7)}` : '',
      loc.altitude != null ? `الارتفاع: ${Math.round(Number(loc.altitude))} متر` : '',
      loc.accuracy != null ? `الدقة: ${Math.round(Number(loc.accuracy))} متر` : ''
    ].filter(Boolean).join('<br>');
    return `
      <div class="fingerprint-place-item">
        <div>
          <div class="setting-label">مكان بصمة محفوظ</div>
          <div class="fingerprint-place-meta">${meta}</div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteFingerprintPlace('${place.id}')">حذف</button>
      </div>
    `;
  }).join('');
}

async function saveFingerprintPlace(){
  if(!pendingFingerprintPlaceDevice?.location){
    showToast('افتح الرابط من جهاز الكمبيوتر أولاً','error');
    return;
  }
  const radius = Number(normalizeDigits(document.getElementById('fingerprintPlaceRadius')?.value || ''));
  const employers = getSelectedFingerprintPlaceEmployers();
  if(!Number.isFinite(radius) || radius <= 0){
    showToast('أدخل حدود البصمة بالمتر','error');
    return;
  }
  if(!employers.length){
    showToast('اختر جهة عمل واحدة على الأقل','error');
    return;
  }
  showLoading('جاري حفظ مكان البصمة...');
  try{
    await loadFirebasePublisher();
    const location = pendingFingerprintPlaceDevice.location || {};
    await window.hrmsFirebase.saveFingerprintPlace({
      location:{
        lat:Number(location.lat),
        lng:Number(location.lng),
        accuracy:Number(location.accuracy) || null,
        altitude:location.altitude ?? null,
        altitudeAccuracy:location.altitudeAccuracy ?? null,
        sampleCount:location.sampleCount || null,
        bestAccuracy:location.bestAccuracy || null,
        capturedAt:pendingFingerprintPlaceDevice.updatedAt || new Date().toISOString()
      },
      radiusMeters:radius,
      employerIds:employers.map(employer=>employer.id),
      employerNames:employers.map(employer=>employer.name),
      createdAt:new Date().toISOString()
    }, pendingFingerprintPlaceDevice.sessionId || getFingerprintPlaceSessionId());
    pendingFingerprintPlaceDevice = null;
    resetFingerprintPlaceSessionId();
    document.getElementById('fingerprintPlaceRadius').value = '20';
    showToast('تم حفظ مكان البصمة بنجاح');
    await setupFingerprintPlacesPage();
  } catch(err){
    console.error(err);
    showToast('تعذر حفظ مكان البصمة','error');
  } finally {
    hideLoading();
  }
}

async function deleteFingerprintPlace(id){
  if(!confirm('حذف مكان البصمة؟')) return;
  showLoading('جاري حذف مكان البصمة...');
  try{
    await loadFirebasePublisher();
    await window.hrmsFirebase.deleteFingerprintPlace(id);
    showToast('تم حذف مكان البصمة');
  } catch(err){
    console.error(err);
    showToast('تعذر حذف مكان البصمة','error');
  } finally {
    hideLoading();
  }
}

function getRegistrationDeviceInfo(){
  const screenInfo = window.screen ? `${window.screen.width}x${window.screen.height} / ${window.devicePixelRatio || 1}x` : '';
  return {
    userAgent:navigator.userAgent || '',
    platform:navigator.platform || '',
    language:navigator.language || '',
    languages:Array.from(navigator.languages || []),
    timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    screen:screenInfo,
    online:navigator.onLine,
    connection:navigator.connection ? {
      effectiveType:navigator.connection.effectiveType || '',
      downlink:navigator.connection.downlink || null,
      rtt:navigator.connection.rtt || null
    } : null
  };
}

const PLACE_GPS_TARGET_ACCURACY = 15;
const PLACE_GPS_SAMPLE_TIMEOUT_MS = 12000;
const PLACE_GPS_MIN_SAMPLES = 4;

function getRegistrationAccuracyMeters(value){
  const accuracy = Number(value);
  return Number.isFinite(accuracy) && accuracy > 0 ? accuracy : 0;
}

function normalizeRegistrationGeoPosition(pos){
  return {
    lat:pos.coords.latitude,
    lng:pos.coords.longitude,
    accuracy:pos.coords.accuracy,
    altitude:pos.coords.altitude,
    altitudeAccuracy:pos.coords.altitudeAccuracy,
    heading:pos.coords.heading,
    speed:pos.coords.speed,
    capturedAt:new Date(pos.timestamp || Date.now()).toISOString()
  };
}

function combineRegistrationLocationSamples(samples){
  const usable = samples
    .filter(sample=>Number.isFinite(Number(sample.lat)) && Number.isFinite(Number(sample.lng)))
    .sort((a,b)=>getRegistrationAccuracyMeters(a.accuracy)-getRegistrationAccuracyMeters(b.accuracy))
    .slice(0,6);
  if(!usable.length) return null;
  const weightFor = sample=>1 / Math.max(1, getRegistrationAccuracyMeters(sample.accuracy)) ** 2;
  const totalWeight = usable.reduce((sum,sample)=>sum+weightFor(sample),0);
  const weighted = usable.reduce((acc,sample)=>{
    const weight = weightFor(sample);
    acc.lat += sample.lat * weight;
    acc.lng += sample.lng * weight;
    if(sample.altitude != null && Number.isFinite(Number(sample.altitude))){
      acc.altitude += Number(sample.altitude) * weight;
      acc.altitudeWeight += weight;
    }
    return acc;
  },{lat:0,lng:0,altitude:0,altitudeWeight:0});
  const best = usable[0];
  return {
    lat:weighted.lat / totalWeight,
    lng:weighted.lng / totalWeight,
    accuracy:getRegistrationAccuracyMeters(best.accuracy),
    altitude:weighted.altitudeWeight ? weighted.altitude / weighted.altitudeWeight : best.altitude,
    altitudeAccuracy:best.altitudeAccuracy,
    heading:best.heading,
    speed:best.speed,
    sampleCount:samples.length,
    bestAccuracy:getRegistrationAccuracyMeters(best.accuracy),
    capturedAt:new Date().toISOString()
  };
}

function getDetailedDeviceLocation(){
  return new Promise((resolve,reject)=>{
    if(!navigator.geolocation){
      reject(new Error('الموقع غير مدعوم في هذا الجهاز'));
      return;
    }
    const samples = [];
    let settled = false;
    let watchId = null;
    const finish = (callback,value)=>{
      if(settled) return;
      settled = true;
      if(watchId !== null) navigator.geolocation.clearWatch(watchId);
      clearTimeout(timer);
      callback(value);
    };
    const timer = setTimeout(()=>{
      const combined = combineRegistrationLocationSamples(samples);
      if(!combined){
        finish(reject, new Error('تعذر التقاط موقع دقيق'));
        return;
      }
      if(combined.accuracy > PLACE_GPS_TARGET_ACCURACY){
        finish(reject, new Error(`دقة GPS ضعيفة (${Math.round(combined.accuracy)} متر). حاول من مكان أقرب للنافذة ثم أعد المحاولة`));
        return;
      }
      finish(resolve, combined);
    },PLACE_GPS_SAMPLE_TIMEOUT_MS);
    watchId = navigator.geolocation.watchPosition(pos=>{
      samples.push(normalizeRegistrationGeoPosition(pos));
      const combined = combineRegistrationLocationSamples(samples);
      if(combined && samples.length >= PLACE_GPS_MIN_SAMPLES && combined.accuracy <= PLACE_GPS_TARGET_ACCURACY){
        finish(resolve, combined);
      }
    },()=>{
      if(samples.length){
        const combined = combineRegistrationLocationSamples(samples);
        if(combined && combined.accuracy <= PLACE_GPS_TARGET_ACCURACY) finish(resolve, combined);
        else finish(reject, new Error('دقة GPS ضعيفة أو لم يتم السماح بالموقع'));
      } else {
        finish(reject, new Error('اسمح للمتصفح بالوصول إلى الموقع'));
      }
    },{
      enableHighAccuracy:true,
      timeout:PLACE_GPS_SAMPLE_TIMEOUT_MS,
      maximumAge:0
    });
  });
}

async function initFingerprintPlaceClient(sessionId){
  applyTheme(appData.settings?.theme || 'light');
  document.body.innerHTML = `
    <section class="screen" style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:22px;background:var(--bg);direction:rtl">
      <div class="card" style="max-width:520px;width:100%;text-align:center">
        <div class="spinner" style="margin:0 auto 18px"></div>
        <div class="section-title" id="placeClientTitle" style="margin:0 0 8px">جاري ربط مكان البصمة</div>
        <div class="setting-sub" id="placeClientText">اسمح للمتصفح بالوصول إلى الموقع من هذا الكمبيوتر.</div>
      </div>
    </section>
  `;
  try{
    await loadFirebasePublisher({fresh:true});
    if(!window.hrmsFirebase?.publishFingerprintPlaceSession){
      throw new Error('ملف Firebase قديم. ارفع firebase-publisher.js ثم حدث الصفحة.');
    }
    document.getElementById('placeClientText').textContent = 'جاري التقاط عدة قراءات GPS دقيقة...';
    const location = await getDetailedDeviceLocation();
    document.getElementById('placeClientText').textContent = 'جاري إرسال موقع الجهاز إلى النظام...';
    await window.hrmsFirebase.publishFingerprintPlaceSession(sessionId,{
      status:'connected',
      location,
      device:getRegistrationDeviceInfo(),
      pageUrl:window.location.href
    });
    document.getElementById('placeClientTitle').textContent = 'تم إرسال موقع الجهاز';
    document.getElementById('placeClientText').textContent = 'ارجع إلى صفحة أماكن البصمة في النظام لاختيار جهة العمل وحدود البصمة ثم الحفظ.';
  } catch(err){
    console.error(err);
    document.getElementById('placeClientTitle').textContent = 'تعذر ربط مكان البصمة';
    const message = err?.code === 'PERMISSION_DENIED'
      ? 'Firebase رفض الحفظ. تأكد من رفع firebase-publisher.js وتعديل قواعد Firebase للسماح بالكتابة داخل hrData.'
      : (err.message || 'تحقق من اتصال الإنترنت والسماح بالموقع.');
    document.getElementById('placeClientText').textContent = message;
  }
}

function normalizeImportedHrData(source){
  const data = source?.data || source || {};
  const normalized = {...data};
  normalized.employees = Array.isArray(data.employees) ? data.employees : Object.values(data.employees || {});
  normalized.employers = Array.isArray(data.employers) ? data.employers : Object.values(data.employers || {});
  normalized.schedules = data.schedules || {};
  normalized.settings = data.settings || {};
  normalized.reminders = Array.isArray(data.reminders) ? data.reminders : Object.values(data.reminders || {});
  normalized.fingerprintCodes = data.fingerprintCodes || {};
  normalized.fingerprintPunches = Array.isArray(data.fingerprintPunches) ? data.fingerprintPunches : Object.entries(data.fingerprintPunches || {}).map(([id,punch])=>({id,...punch}));
  normalized.fingerprintPlaces = data.fingerprintPlaces || {};
  return normalized;
}

function refreshAppAfterDataLoad(){
  ensureAppDataShape();
  localStorage.setItem('hrmsData',JSON.stringify(appData));
  applyTheme(appData.settings?.theme || 'light');
  renderFolderSettings();
  renderEmployees();
  renderEmployersList();
  renderEmployersInForm();
  renderReminders();
  renderScheduleDays();
  updateReminderBadge();
}

function applyImportedHrData(source, origin='folder'){
  const currentSettings = {...(appData.settings || {})};
  const imported = normalizeImportedHrData(source);
  appData = imported;
  ensureAppDataShape();
  appData.settings = {
    ...(appData.settings || {}),
    theme:currentSettings.theme || appData.settings.theme || 'light',
    saveFolderName:currentSettings.saveFolderName || appData.settings.saveFolderName || '',
    folderSelectedAt:currentSettings.folderSelectedAt || appData.settings.folderSelectedAt || ''
  };
  if(origin === 'firebase') appData.settings.firebaseLoadedAt = new Date().toISOString();
  refreshAppAfterDataLoad();
}

function formatTimeValue(time){
  if(!time) return '';
  const [hourPart, minutePart='0'] = String(time).split(':');
  const hour = parseInt(hourPart,10);
  const minute = parseInt(minutePart,10);
  if(Number.isNaN(hour)||Number.isNaN(minute)) return time;
  const suffix = hour < 12 ? 'ص' : 'م';
  const displayHour = hour % 12 || 12;
  return minute ? `${displayHour}:${String(minute).padStart(2,'0')}${suffix}` : `${displayHour}${suffix}`;
}

function formatTimeRange(from,to){
  return `من ${formatTimeValue(from)} الى ${formatTimeValue(to)}`;
}

function formatTimeValueEn(time){
  if(!time) return '';
  const [hourPart, minutePart='0'] = String(time).split(':');
  const hour = parseInt(hourPart,10);
  const minute = parseInt(minutePart,10);
  if(Number.isNaN(hour)||Number.isNaN(minute)) return time;
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 || 12;
  return minute ? `${displayHour}:${String(minute).padStart(2,'0')} ${period}` : `${displayHour} ${period}`;
}

function formatTimeRangeLocalized(from,to,lang='ar'){
  return lang === 'en' ? `from ${formatTimeValueEn(from)} to ${formatTimeValueEn(to)}` : formatTimeRange(from,to);
}

let activeTimePicker = null;
let activeTimeDraft = null;

function timeValueToParts(value){
  if(!value) return {hour:'01', minute:'00', period:'AM'};
  const [hourPart, minutePart='00'] = String(value).split(':');
  const hour24 = parseInt(hourPart,10);
  const minute = parseInt(minutePart,10);
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 || 12;
  return {
    hour:String(Number.isNaN(hour12) ? 1 : hour12).padStart(2,'0'),
    minute:String(Number.isNaN(minute) ? 0 : minute).padStart(2,'0'),
    period
  };
}

function timePartsToValue(parts){
  let hour = parseInt(parts.hour,10);
  const minute = parseInt(parts.minute,10);
  if(parts.period === 'PM' && hour < 12) hour += 12;
  if(parts.period === 'AM' && hour === 12) hour = 0;
  return `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
}

function setTimePickerValue(inputId, value){
  const input = document.getElementById(inputId);
  if(input) input.value = value || '';
  const picker = document.querySelector(`[data-time-picker][data-input="${inputId}"]`);
  if(!picker) return;
  const display = picker.querySelector('.time-picker-display');
  picker.classList.toggle('empty', !value);
  if(display){
    const parts = timeValueToParts(value);
    display.textContent = value ? `${parts.hour}:${parts.minute} ${parts.period}` : '--:-- --';
  }
}

function getTimePickerPopover(){
  let popover = document.getElementById('timePickerPopover');
  if(popover) return popover;
  popover = document.createElement('div');
  popover.id = 'timePickerPopover';
  popover.className = 'time-picker-popover hidden';
  document.body.appendChild(popover);
  return popover;
}

function buildTimePickerColumn(type, values){
  return `<div class="time-picker-column" data-time-column="${type}">`+
    values.map(value=>`<button type="button" class="time-picker-option" data-time-part="${type}" data-time-value="${value}">${value}</button>`).join('')+
    `</div>`;
}

function renderTimePickerPopover(){
  const popover = getTimePickerPopover();
  const hours = Array.from({length:12},(_,i)=>String(i+1).padStart(2,'0'));
  const minutes = Array.from({length:60},(_,i)=>String(i).padStart(2,'0'));
  popover.innerHTML = buildTimePickerColumn('hour',hours)+buildTimePickerColumn('minute',minutes)+buildTimePickerColumn('period',['PM','AM']);
  if(!popover.dataset.bound){
    popover.dataset.bound = '1';
    popover.addEventListener('click', e=>{
      const option = e.target.closest('.time-picker-option');
      if(!option || !activeTimePicker || !activeTimeDraft) return;
      const part = option.dataset.timePart;
      activeTimeDraft[part] = option.dataset.timeValue;
      const value = timePartsToValue(activeTimeDraft);
      setTimePickerValue(activeTimePicker.dataset.input,value);
      updateTimePickerSelection();
    });
  }
  return popover;
}

function positionTimePickerPopover(){
  if(!activeTimePicker) return;
  const popover = getTimePickerPopover();
  const rect = activeTimePicker.getBoundingClientRect();
  const width = Math.min(344, window.innerWidth - 24);
  const left = Math.max(12, Math.min(rect.right - width, window.innerWidth - width - 12));
  const top = Math.min(rect.bottom + 8, window.innerHeight - 280);
  popover.style.width = `${width}px`;
  popover.style.left = `${left}px`;
  popover.style.top = `${Math.max(12,top)}px`;
}

function updateTimePickerSelection(){
  const popover = getTimePickerPopover();
  popover.querySelectorAll('.time-picker-option').forEach(option=>{
    const part = option.dataset.timePart;
    option.classList.toggle('selected', activeTimeDraft && activeTimeDraft[part] === option.dataset.timeValue);
  });
  ['hour','minute','period'].forEach(part=>{
    const selected = popover.querySelector(`.time-picker-option.selected[data-time-part="${part}"]`);
    if(selected) selected.scrollIntoView({block:'nearest'});
  });
}

function openTimePicker(picker){
  if(activeTimePicker === picker){
    closeTimePicker();
    return;
  }
  closeTimePicker();
  activeTimePicker = picker;
  activeTimeDraft = timeValueToParts(document.getElementById(picker.dataset.input)?.value || '');
  const popover = renderTimePickerPopover();
  picker.classList.add('open');
  popover.classList.remove('hidden');
  positionTimePickerPopover();
  updateTimePickerSelection();
}

function closeTimePicker(){
  if(activeTimePicker) activeTimePicker.classList.remove('open');
  activeTimePicker = null;
  activeTimeDraft = null;
  const popover = document.getElementById('timePickerPopover');
  if(popover) popover.classList.add('hidden');
}

function setupTimePickers(){
  document.querySelectorAll('[data-time-picker]').forEach(picker=>{
    if(picker.dataset.ready) return;
    picker.dataset.ready = '1';
    picker.classList.add('empty');
    setTimePickerValue(picker.dataset.input, document.getElementById(picker.dataset.input)?.value || '');
    picker.addEventListener('click', ()=>openTimePicker(picker));
    picker.addEventListener('keydown', e=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openTimePicker(picker);
      }
      if(e.key === 'Escape') closeTimePicker();
    });
  });
}

document.addEventListener('click', e=>{
  if(!activeTimePicker) return;
  if(e.target.closest('[data-time-picker]') || e.target.closest('#timePickerPopover')) return;
  closeTimePicker();
});
window.addEventListener('resize', positionTimePickerPopover);
window.addEventListener('scroll', positionTimePickerPopover, true);

const DOC_TYPE_LABELS = {
  photo:'الصورة الشخصية',
  civil:'البطاقة المدنية',
  passport:'جواز السفر',
  health:'كرت الصحة',
  degree:'الشهادة الجامعية'
};

function escapeHtml(value){
  return String(value??'').replace(/[&<>"']/g, ch=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[ch]));
}

function safeFileName(name, fallback='ملف'){
  const cleaned = String(name||fallback)
    .normalize('NFKC')
    .trim()
    .replace(/[\u0000-\u001f\u007f-\u009f\u200e\u200f\u202a-\u202e\u2066-\u2069]/g,'')
    .replace(/[\\/:*?"<>|⁄∕／]/g,'-')
    .replace(/\s+/g,' ')
    .replace(/^\.+$/,'')
    .replace(/^[.\s]+|[.\s]+$/g,'')
    .slice(0,120)
    .trim();
  return cleaned || fallback;
}

function prettyJson(data){
  return JSON.stringify(data,null,2);
}

function isDataUrl(value){
  return /^data:[^,]+,/.test(String(value || '').trim());
}

function isImageDataUrl(value){
  return /^data:image\//.test(String(value || '').trim());
}

function isExternalFileMarker(value){
  return /^\[محفوظ كملف مستقل\b/.test(String(value || '').trim());
}

function hasStoredDocumentFile(value){
  return isDataUrl(value) || isExternalFileMarker(value);
}

function getUsableImageSource(...values){
  return values.find(value=>{
    const src = String(value || '').trim();
    return isImageDataUrl(src) || src.startsWith('blob:') || /^https?:\/\//.test(src);
  }) || '';
}

function cloneWithoutAttachmentPayload(data){
  return JSON.parse(JSON.stringify(data,(key,value)=>{
    if((key==='fileData'||key==='photoData') && typeof value==='string'){
      if(isDataUrl(value)) return `[محفوظ كملف مستقل - ${Math.round(value.length/1024)} كيلوبايت]`;
      if(isExternalFileMarker(value)) return value;
    }
    return value;
  }));
}

function getMimeFromDataUrl(dataUrl){
  const match = String(dataUrl||'').match(/^data:([^;,]+)[;,]/);
  return match ? match[1] : 'application/octet-stream';
}

function extensionFromMime(mime){
  const map = {
    'image/jpeg':'jpg',
    'image/jpg':'jpg',
    'image/png':'png',
    'image/webp':'webp',
    'image/gif':'gif',
    'application/pdf':'pdf',
    'text/plain':'txt'
  };
  return map[mime] || 'bin';
}

function extensionFromName(name){
  const match = String(name||'').match(/\.([a-zA-Z0-9]{1,8})$/);
  return match ? match[1].toLowerCase() : '';
}

function dataUrlToBlob(dataUrl){
  const value = String(dataUrl||'');
  const commaIndex = value.indexOf(',');
  if(commaIndex === -1) return new Blob([], {type:'application/octet-stream'});
  const header = value.slice(0,commaIndex);
  const payload = value.slice(commaIndex+1);
  const mime = getMimeFromDataUrl(value);
  if(header.includes(';base64')){
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], {type:mime});
  }
  return new Blob([decodeURIComponent(payload)], {type:mime});
}

function buildDocumentFileName(docType, doc){
  const label = DOC_TYPE_LABELS[docType] || docType || 'مستند';
  const mime = getMimeFromDataUrl(doc?.fileData);
  const ext = extensionFromName(doc?.fileName) || extensionFromMime(mime);
  return safeFileName(`${label}.${ext}`);
}

async function getOrCreateDirectory(parentHandle, parts){
  let dir = parentHandle;
  for(const part of parts){
    dir = await dir.getDirectoryHandle(safeFileName(part,'مجلد'), {create:true});
  }
  return dir;
}

async function removeDirectoryIfExists(parentHandle, name){
  try{
    await parentHandle.removeEntry(safeFileName(name,'مجلد'), {recursive:true});
  } catch(err){
    if(err?.name !== 'NotFoundError') console.warn('تعذر حذف مجلد قديم:', name, err);
  }
}

async function writeFile(directoryHandle, fileName, content){
  const safeName = safeFileName(fileName,'ملف');
  const fileHandle = await directoryHandle.getFileHandle(safeName, {create:true});
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
  return safeName;
}

async function writeJsonFile(directoryHandle, fileName, data){
  await writeFile(directoryHandle, fileName, new Blob([prettyJson(data)], {type:'application/json;charset=utf-8'}));
}

async function getDirectoryIfExists(parentHandle, parts){
  let dir = parentHandle;
  for(const part of parts){
    dir = await dir.getDirectoryHandle(safeFileName(part,'مجلد'), {create:false});
  }
  return dir;
}

async function readJsonFile(directoryHandle, fileName){
  const fileHandle = await directoryHandle.getFileHandle(safeFileName(fileName,'ملف'), {create:false});
  return readJsonFileHandle(fileHandle);
}

async function readJsonFileHandle(fileHandle){
  const file = await fileHandle.getFile();
  const text = await file.text();
  if(!text.trim()) return {};
  return JSON.parse(text.replace(/^\uFEFF/,''));
}

async function readJsonFileByPath(rootHandle, parts){
  const dir = await getDirectoryIfExists(rootHandle, parts.slice(0,-1));
  return readJsonFile(dir, parts[parts.length-1]);
}

async function readFirstJsonPath(rootHandle, candidates){
  for(const parts of candidates){
    try{
      return {data:await readJsonFileByPath(rootHandle,parts), path:parts.join('/')};
    } catch(err){
      if(err?.name !== 'NotFoundError') throw err;
    }
  }
  return null;
}

async function getFirstDirectoryByPaths(rootHandle, candidates){
  for(const parts of candidates){
    try{
      return {dir:await getDirectoryIfExists(rootHandle,parts), path:parts.join('/')};
    } catch(err){
      if(err?.name !== 'NotFoundError') throw err;
    }
  }
  return null;
}

async function readJsonFilesFromDirectory(rootHandle, candidates, filter=()=>true){
  const found = await getFirstDirectoryByPaths(rootHandle,candidates);
  if(!found?.dir?.entries) return {items:[], source:''};
  const items = [];
  for await (const [name,handle] of found.dir.entries()){
    if(handle.kind !== 'file' || !name.endsWith('.json') || !filter(name)) continue;
    try{
      items.push({name,data:await readJsonFileHandle(handle)});
    } catch(err){
      console.warn('تعذر قراءة ملف JSON:', name, err);
    }
  }
  return {items, source:found.path};
}

function fileToDataUrl(file){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload = e=>resolve(e.target.result);
    reader.onerror = ()=>reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function readFileHandleAsDataUrl(fileHandle){
  const file = await fileHandle.getFile();
  return fileToDataUrl(file);
}

function fileNameBase(name){
  return safeFileName(String(name || '').replace(/\.[^.]+$/,''), '');
}

async function findEmployeeDocumentsDirectory(employeesRoot, emp){
  const preferredName = safeFileName(emp.name || `موظف ${emp.id}`, 'موظف');
  const candidates = new Set([preferredName]);
  try{
    const empDir = await employeesRoot.getDirectoryHandle(preferredName, {create:false});
    return await empDir.getDirectoryHandle('المستندات', {create:false});
  } catch(err){
    if(err?.name !== 'NotFoundError') throw err;
  }
  for await (const [name,handle] of employeesRoot.entries()){
    if(handle.kind !== 'directory' || !candidates.has(safeFileName(name,'مجلد'))) continue;
    try{
      return await handle.getDirectoryHandle('المستندات', {create:false});
    } catch(err){
      if(err?.name !== 'NotFoundError') throw err;
    }
  }
  return null;
}

async function findDocumentFileDataUrl(documentsDir, docType, doc={}){
  if(!documentsDir?.entries) return '';
  const label = DOC_TYPE_LABELS[docType] || docType || '';
  const candidateNames = new Set([
    safeFileName(doc.fileName || '', ''),
    safeFileName(label, '')
  ].filter(Boolean));
  const candidateBases = new Set([
    fileNameBase(doc.fileName),
    fileNameBase(label)
  ].filter(Boolean));
  for await (const [name,handle] of documentsDir.entries()){
    if(handle.kind !== 'file') continue;
    const safeName = safeFileName(name, '');
    const base = fileNameBase(name);
    if(candidateNames.has(safeName) || candidateBases.has(base)){
      return readFileHandleAsDataUrl(handle);
    }
  }
  return '';
}

async function hydrateImportedEmployeeFiles(rootHandle, data){
  if(!data?.employees?.length) return data;
  let employeesRoot = null;
  try{
    employeesRoot = await rootHandle.getDirectoryHandle('الموظفين', {create:false});
  } catch(err){
    return data;
  }
  for(const emp of data.employees){
    try{
      const documentsDir = await findEmployeeDocumentsDirectory(employeesRoot, emp);
      if(!documentsDir) continue;
      if(!emp.documents) emp.documents = {};
      for(const docType of Object.keys(DOC_TYPE_LABELS)){
        const doc = emp.documents[docType] || {};
        const needsDocumentPayload = !isDataUrl(doc.fileData);
        const needsProfilePhoto = docType === 'photo' && !getUsableImageSource(emp.photoData, doc.fileData);
        if(!needsDocumentPayload && !needsProfilePhoto) continue;
        const fileData = await findDocumentFileDataUrl(documentsDir, docType, doc);
        if(!fileData) continue;
        const ext = extensionFromMime(getMimeFromDataUrl(fileData));
        emp.documents[docType] = {
          ...doc,
          fileData,
          fileName:doc.fileName || `${DOC_TYPE_LABELS[docType] || docType}.${ext}`
        };
        if(docType === 'photo') emp.photoData = fileData;
      }
    } catch(err){
      console.warn('تعذر تحميل مرفقات الموظف من المجلد:', emp?.name, err);
    }
  }
  return data;
}

async function folderHasEntries(directoryHandle){
  if(!directoryHandle?.values) return false;
  for await (const _entry of directoryHandle.values()) return true;
  return false;
}

async function folderLooksLikeDatabase(rootHandle){
  if(rootHandle.name === 'قاعدة البيانات') return folderHasEntries(rootHandle);
  try{
    const dbDir = await rootHandle.getDirectoryHandle('قاعدة البيانات', {create:false});
    return folderHasEntries(dbDir);
  } catch(err){
    return false;
  }
}

async function loadHrDataFromFolder(rootHandle){
  const fullDb = await readFirstJsonPath(rootHandle,[
    ['قاعدة البيانات','قاعدة البيانات الكاملة.json'],
    ['قاعدة البيانات الكاملة.json'],
    ['قاعدة البيانات','قاعدة بيانات بدون المرفقات.json'],
    ['قاعدة بيانات بدون المرفقات.json']
  ]);
  if(fullDb){
    const data = fullDb.data?.data || fullDb.data;
    if(hasMeaningfulHrData(data)){
      await hydrateImportedEmployeeFiles(rootHandle,data);
      return {data, source:fullDb.path, found:true};
    }
  }

  const employees = await readFirstJsonPath(rootHandle,[
    ['قاعدة البيانات','الموظفين','كل الموظفين.json'],
    ['الموظفين','كل الموظفين.json'],
    ['كل الموظفين.json']
  ]);
  const schedules = await readFirstJsonPath(rootHandle,[
    ['قاعدة البيانات','جداول الدوامات','كل جداول الدوامات.json'],
    ['جداول الدوامات','كل جداول الدوامات.json'],
    ['كل جداول الدوامات.json']
  ]);
  const employers = await readFirstJsonPath(rootHandle,[
    ['قاعدة البيانات','جهات العمل.json'],
    ['جهات العمل.json']
  ]);
  const reminders = await readFirstJsonPath(rootHandle,[
    ['قاعدة البيانات','التذكيرات.json'],
    ['التذكيرات.json']
  ]);
  const settings = await readFirstJsonPath(rootHandle,[
    ['قاعدة البيانات','الإعدادات.json'],
    ['الإعدادات.json']
  ]);
  const fingerprintPunches = await readFirstJsonPath(rootHandle,[
    ['قاعدة البيانات','تقرير البصمة.json'],
    ['تقرير البصمة.json']
  ]);
  const fingerprintCodes = await readFirstJsonPath(rootHandle,[
    ['قاعدة البيانات','رموز دخول البصمة.json'],
    ['رموز دخول البصمة.json']
  ]);

  const individualEmployees = await readJsonFilesFromDirectory(rootHandle,[
    ['قاعدة البيانات','الموظفين'],
    ['الموظفين']
  ], name=>!['كل الموظفين.json','فهرس المستندات.json'].includes(name));

  const dayNameToKey = {
    'السبت':'sat',
    'الأحد':'sun',
    'الاحد':'sun',
    'الاثنين':'mon',
    'الثلاثاء':'tue',
    'الأربعاء':'wed',
    'الاربعاء':'wed',
    'الخميس':'thu',
    'الجمعة':'fri'
  };
  const individualSchedules = await readJsonFilesFromDirectory(rootHandle,[
    ['قاعدة البيانات','جداول الدوامات'],
    ['جداول الدوامات']
  ], name=>!['كل جداول الدوامات.json','سجل ملفات PDF.json'].includes(name));

  const employeesData = employees?.data || [];
  const scheduleData = schedules?.data || {};
  const rebuiltEmployees = Array.isArray(employeesData) && employeesData.length
    ? employeesData
    : individualEmployees.items
      .map(item=>item.data)
      .filter(emp=>emp && typeof emp === 'object' && emp.id && emp.name);
  const rebuiltSchedules = scheduleData && Object.keys(scheduleData).length
    ? scheduleData
    : individualSchedules.items.reduce((acc,item)=>{
      const dayName = item.name.replace(/^جدول\s+/,'').replace(/\.json$/,'').trim();
      const key = dayNameToKey[dayName] || dayName;
      if(item.data && typeof item.data === 'object' && item.data.zones) acc[key] = item.data;
      return acc;
    },{});
  const employersData = employers?.data || [];
  const rebuiltEmployers = Array.isArray(employersData) && employersData.length
    ? employersData
    : Object.values([
      ...rebuiltEmployees.map(emp=>({id:emp.employerId || emp.employer || emp.name, name:emp.employer || ''})),
      ...Object.values(rebuiltSchedules).flatMap(schedule=>Object.values(schedule.zones || {}).flat()).map(item=>({id:item.employerId || item.employerName || item.empId, name:item.employerName || ''}))
    ].reduce((acc,employer)=>{
      if(!employer.name) return acc;
      acc[employer.id || employer.name] = {id:employer.id || employer.name, name:employer.name};
      return acc;
    },{}));

  const reconstructed = {
    employees:rebuiltEmployees,
    schedules:rebuiltSchedules,
    employers:rebuiltEmployers,
    reminders:reminders?.data || [],
    settings:settings?.data || {},
    fingerprintPunches:fingerprintPunches?.data || [],
    fingerprintCodes:fingerprintCodes?.data || {}
  };
  if(hasMeaningfulHrData(reconstructed)){
    await hydrateImportedEmployeeFiles(rootHandle,reconstructed);
    const sources = [employees?.path, schedules?.path, employers?.path, individualEmployees.source, individualSchedules.source].filter(Boolean).join(' + ');
    return {data:reconstructed, source:sources || 'ملفات قاعدة البيانات المنفصلة', found:true};
  }
  return {data:null, source:fullDb?.path || '', found:Boolean(fullDb || employees || schedules || employers || individualEmployees.items.length || individualSchedules.items.length || await folderLooksLikeDatabase(rootHandle))};
}

async function writeDataUrlFile(directoryHandle, fileName, dataUrl){
  const blob = dataUrlToBlob(dataUrl);
  const safeName = await writeFile(directoryHandle, fileName, blob);
  return {fileName:safeName, mime:blob.type || 'application/octet-stream', size:blob.size};
}

function getFolderTreeHtml(folderName='مجلد الحفظ'){
  const root = escapeHtml(folderName);
  return `${root}/<br>`+
    `├─ قاعدة البيانات/ <span style="color:var(--text3)">ملفات النظام</span><br>`+
    `├─ الموظفين/<br>`+
    `│  └─ اسم الموظف/<br>`+
    `│     ├─ المستندات/<br>`+
    `│     └─ الكتب الرسمية/<br>`+
    `│        ├─ كتاب تنبيه/<br>`+
    `│        ├─ كتاب خصم/<br>`+
    `│        └─ لفت نظر/<br>`+
    `├─ الكتب العامة/<br>`+
    `├─ القرارات والتعميمات/<br>`+
    `└─ جدول الدوامات/<br>`+
    days.map((day,i)=>`&nbsp;&nbsp;${i===days.length-1?'└':'├'}─ ${day}/<br>`+
      `&nbsp;&nbsp;${i===days.length-1?'&nbsp;':'│'}&nbsp;&nbsp;├─ عربي/<br>`+
      `&nbsp;&nbsp;${i===days.length-1?'&nbsp;':'│'}&nbsp;&nbsp;└─ الانجليزي/`).join('<br>');
}

function setFolderStatus(message, type=''){
  const status = document.getElementById('folderSaveStatus');
  if(status){
    status.textContent = message;
    status.className = `folder-status ${type}`.trim();
  }
  const tag = document.getElementById('databaseStorageTag');
  if(tag){
    tag.className = `tag ${type==='success'?'tag-green':type==='error'?'tag-red':'tag-amber'}`;
    tag.textContent = type==='success' ? 'متزامن' : type==='error' ? 'يحتاج صلاحية' : 'بانتظار المجلد';
  }
  const sub = document.getElementById('databaseStorageSub');
  if(sub){
    sub.textContent = selectedSaveDirectoryHandle
      ? 'تخزين محلي + ملفات منظمة داخل مجلد الجهاز'
      : 'تخزين محلي + مزامنة ملفات عند اختيار مجلد';
  }
}

function renderFolderSettings(){
  const folderName = appData.settings?.saveFolderName || '';
  const input = document.getElementById('savePathInput');
  const tree = document.getElementById('folderTree');
  const structure = document.getElementById('folderStructure');
  if(input) input.value = folderName ? `مجلد الحفظ: ${folderName}` : '';
  if(tree) tree.innerHTML = getFolderTreeHtml(folderName || 'مجلد الحفظ المختار');
  if(structure) structure.style.display = folderName ? 'block' : 'none';
}

function getActiveTheme(){
  return appData.settings?.theme === 'dark' ? 'dark' : 'light';
}

function updateThemeToggle(){
  const themeSwitch = document.getElementById('themeSwitch');
  if(!themeSwitch) return;
  const isDark = getActiveTheme() === 'dark';
  themeSwitch.classList.toggle('active', isDark);
  themeSwitch.setAttribute('aria-checked', String(isDark));
}

function applyTheme(theme){
  if(!appData.settings) appData.settings = {};
  const activeTheme = theme === 'dark' ? 'dark' : 'light';
  appData.settings.theme = activeTheme;
  document.body.classList.toggle('dark-mode', activeTheme === 'dark');
  updateThemeToggle();
}

function toggleTheme(){
  const nextTheme = getActiveTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  saveData();
  showToast(nextTheme === 'dark' ? 'تم تفعيل الوضع الداكن' : 'تم تفعيل الوضع العادي','success');
}

function openFolderHandleDb(){
  return new Promise((resolve,reject)=>{
    if(!('indexedDB' in window)){ reject(new Error('IndexedDB غير مدعوم')); return; }
    const request = indexedDB.open('hrmsFolderStorage',1);
    request.onupgradeneeded = ()=>{
      request.result.createObjectStore('handles');
    };
    request.onsuccess = ()=>resolve(request.result);
    request.onerror = ()=>reject(request.error);
  });
}

async function saveStoredDirectoryHandle(handle){
  const db = await openFolderHandleDb();
  await new Promise((resolve,reject)=>{
    const tx = db.transaction('handles','readwrite');
    tx.objectStore('handles').put(handle,'saveDirectory');
    tx.oncomplete = resolve;
    tx.onerror = ()=>reject(tx.error);
  });
  db.close();
}

async function loadStoredDirectoryHandle(){
  const db = await openFolderHandleDb();
  const handle = await new Promise((resolve,reject)=>{
    const tx = db.transaction('handles','readonly');
    const request = tx.objectStore('handles').get('saveDirectory');
    request.onsuccess = ()=>resolve(request.result || null);
    request.onerror = ()=>reject(request.error);
  });
  db.close();
  return handle;
}

async function ensureDirectoryPermission(handle, requestPermission=false){
  const options = {mode:'readwrite'};
  if((await handle.queryPermission(options)) === 'granted') return true;
  if(requestPermission && (await handle.requestPermission(options)) === 'granted') return true;
  return false;
}

async function restoreSavedDirectoryHandle(){
  renderFolderSettings();
  if(!appData.settings?.saveFolderName){
    setFolderStatus('اختر مجلدًا ليتم حفظ قاعدة البيانات والملفات داخله تلقائيًا.');
    return;
  }
  try{
    const handle = await loadStoredDirectoryHandle();
    if(!handle){
      setFolderStatus('تم حفظ اسم المجلد سابقًا، لكن المتصفح يحتاج اختيار المجلد مرة أخرى.', 'warn');
      return;
    }
    selectedSaveDirectoryHandle = handle;
    appData.settings.saveFolderName = handle.name;
    localStorage.setItem('hrmsData',JSON.stringify(appData));
    renderFolderSettings();
    const hasPermission = await ensureDirectoryPermission(handle,false);
    if(hasPermission){
      if(!hasMeaningfulHrData()){
        const imported = await tryImportDataFromFolder({silent:true, overwrite:false});
        if(imported.imported){
          setFolderStatus(`تم تحميل بيانات المجلد تلقائياً: ${appData.employees.length} موظف، ${Object.keys(appData.schedules || {}).length} جدول.`, 'success');
          return;
        }
        if(imported.found){
          setFolderStatus('المجلد يحتوي على ملفات قاعدة بيانات، لكن لم أستطع قراءة بيانات منها. لن تتم المزامنة حتى لا تُكتب أصفار فوق بياناتك.', 'error');
          return;
        }
      }
      setFolderStatus(appData.settings.lastFileSyncAt ? `آخر مزامنة: ${new Date(appData.settings.lastFileSyncAt).toLocaleString('ar-KW')}` : 'المجلد جاهز للمزامنة.', 'success');
    } else {
      setFolderStatus('المجلد محفوظ، لكن يحتاج إعادة السماح من زر مزامنة الآن أو اختيار مجلد.', 'warn');
    }
  } catch(err){
    console.error(err);
    setFolderStatus('تعذر استرجاع صلاحية مجلد الحفظ. اختر المجلد مرة أخرى.', 'error');
  }
}

function queueFolderSync(){
  if(!selectedSaveDirectoryHandle) return;
  clearTimeout(folderSyncTimer);
  folderSyncTimer = setTimeout(()=>syncDataToFolder(false),500);
}

const scheduleBranchNames = {
  surra:'فرع السرة',
  abulhasania:'فرع أبو الحصانية',
  yarmouk:'فرع اليرموك'
};

const scheduleBranchOptions = [
  {key:'surra', label:'السرة', aliases:['السرة','surra']},
  {key:'abulhasania', label:'أبو الحصانية', aliases:['أبو الحصانية','ابو الحصانية','abulhasania','hasania']},
  {key:'yarmouk', label:'اليرموك', aliases:['اليرموك','yarmouk']}
];

const scheduleBranchNamesEn = {
  surra:'Surra Branch',
  abulhasania:'Abu Al Hasaniya Branch',
  yarmouk:'Yarmouk Branch'
};

const daysEn = {
  sat:'Saturday',
  sun:'Sunday',
  mon:'Monday',
  tue:'Tuesday',
  wed:'Wednesday',
  thu:'Thursday',
  fri:'Friday'
};

const commonNameTranslations = {
  'محمد':'Mohammed','احمد':'Ahmed','أحمد':'Ahmed','محمود':'Mahmoud','مصطفى':'Mustafa','علي':'Ali','حسن':'Hassan','حسين':'Hussein',
  'عبدالله':'Abdullah','عبد الله':'Abdullah','عبدالرحمن':'Abdulrahman','عبد الرحمن':'Abdulrahman','عبدالعزيز':'Abdulaziz','عبد العزيز':'Abdulaziz',
  'خالد':'Khaled','وليد':'Waleed','فهد':'Fahad','ناصر':'Nasser','سعود':'Saud','يوسف':'Yousef','يعقوب':'Yaqoub','ابراهيم':'Ibrahim','إبراهيم':'Ibrahim',
  'عمر':'Omar','عثمان':'Othman','سلمان':'Salman','سلطان':'Sultan','طارق':'Tariq','بدر':'Bader','جاسم':'Jassem','راشد':'Rashed','مشاري':'Meshari',
  'فيصل':'Faisal','نواف':'Nawaf','سعد':'Saad','صالح':'Saleh','عامر':'Amer','ماجد':'Majed','حمد':'Hamad','حمدي':'Hamdy','ايمن':'Ayman','أيمن':'Ayman',
  'مريم':'Maryam','فاطمة':'Fatima','عائشة':'Aisha','سارة':'Sarah','نورة':'Noura','نورا':'Nora','هند':'Hind','دلال':'Dalal','لطيفة':'Latifa','منى':'Mona'
};

const arabicCharMap = {
  'ا':'a','أ':'a','إ':'i','آ':'a','ب':'b','ت':'t','ث':'th','ج':'j','ح':'h','خ':'kh','د':'d','ذ':'dh','ر':'r','ز':'z',
  'س':'s','ش':'sh','ص':'s','ض':'d','ط':'t','ظ':'z','ع':'a','غ':'gh','ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n',
  'ه':'h','ة':'a','و':'w','ؤ':'w','ي':'y','ى':'a','ئ':'y','ء':'','لا':'la',' ':' '
};

const taskPhraseTranslations = {
  'استقبال العملاء':'Customer reception',
  'خدمة العملاء':'Customer service',
  'الرد على العملاء':'Answering customers',
  'متابعة العملاء':'Customer follow-up',
  'متابعة الطلبات':'Order follow-up',
  'تجهيز الطلبات':'Order preparation',
  'ادخال البيانات':'Data entry',
  'إدخال البيانات':'Data entry',
  'المحاسبة':'Accounting',
  'الكاشير':'Cashier',
  'كاشير':'Cashier',
  'المبيعات':'Sales',
  'تنظيف الفرع':'Branch cleaning',
  'ترتيب الفرع':'Branch arrangement',
  'فتح الفرع':'Opening the branch',
  'اغلاق الفرع':'Closing the branch',
  'إغلاق الفرع':'Closing the branch',
  'الجرد':'Inventory',
  'متابعة المخزون':'Inventory follow-up',
  'ادارة الفرع':'Branch management',
  'إدارة الفرع':'Branch management',
  'متابعة الموظفين':'Staff follow-up',
  'المتابعة':'Follow-up',
  'التنظيف':'Cleaning',
  'تنظيف':'Cleaning',
  'ترتيب':'Arrangement',
  'استلام':'Receiving',
  'تسليم':'Handover',
  'مشتريات':'Purchasing',
  'توصيل':'Delivery',
  'الارشيف':'Archive',
  'الأرشيف':'Archive'
};

const taskWordTranslations = {
  'استقبال':'reception','العملاء':'customers','عملاء':'customers','خدمة':'service','الرد':'answering','متابعة':'follow-up','تجهيز':'preparation',
  'الطلبات':'orders','طلبات':'orders','ادخال':'entry','إدخال':'entry','بيانات':'data','البيانات':'data','محاسبة':'accounting','المحاسبة':'accounting',
  'كاشير':'cashier','مبيعات':'sales','المبيعات':'sales','تنظيف':'cleaning','ترتيب':'arrangement','فتح':'opening','اغلاق':'closing','إغلاق':'closing',
  'فرع':'branch','الفرع':'branch','جرد':'inventory','الجرد':'inventory','مخزون':'stock','المخزون':'stock','ادارة':'management','إدارة':'management',
  'موظفين':'staff','الموظفين':'staff','موظف':'employee','استلام':'receiving','تسليم':'handover','توصيل':'delivery','مشتريات':'purchasing',
  'ارشيف':'archive','أرشيف':'archive','الأرشيف':'archive','مهمة':'task','مهام':'tasks','عمل':'work'
};

function stripArabicDiacritics(text){
  return String(text||'').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[ـ]/g,'').trim();
}

function titleCase(value){
  return String(value||'').split(/\s+/).filter(Boolean).map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ');
}

function transliterateArabicToEnglish(text){
  const normalized = stripArabicDiacritics(text);
  if(!/[\u0600-\u06FF]/.test(normalized)) return titleCase(normalized);
  const words = normalized.split(/\s+/).filter(Boolean);
  const converted = words.map(word=>{
    if(commonNameTranslations[word]) return commonNameTranslations[word];
    let out = '';
    for(let i=0;i<word.length;i++){
      const pair = word.slice(i,i+2);
      if(arabicCharMap[pair]){
        out += arabicCharMap[pair];
        i++;
      } else {
        out += arabicCharMap[word[i]] ?? word[i];
      }
    }
    return out.charAt(0).toUpperCase()+out.slice(1);
  }).join(' ');
  return converted.replace(/\s+/g,' ').trim() || 'Employee';
}

function employeeNameForPdf(name, lang='ar'){
  return lang === 'en' ? transliterateArabicToEnglish(name) : (name || '');
}

function translateTaskToEnglish(task){
  const normalized = stripArabicDiacritics(task);
  if(!normalized) return '';
  if(!/[\u0600-\u06FF]/.test(normalized)) return normalized;
  if(taskPhraseTranslations[normalized]) return taskPhraseTranslations[normalized];
  let replaced = normalized;
  Object.keys(taskPhraseTranslations)
    .sort((a,b)=>b.length-a.length)
    .forEach(phrase=>{
      if(replaced.includes(phrase)) replaced = replaced.replaceAll(phrase, taskPhraseTranslations[phrase]);
    });
  if(!/[\u0600-\u06FF]/.test(replaced)) return replaced;
  return replaced.split(/\s+/).filter(Boolean).map(word=>taskWordTranslations[word] || transliterateArabicToEnglish(word).toLowerCase()).join(' ');
}

function tasksForPdf(tasks, lang='ar'){
  const values = (tasks || []).filter(Boolean);
  if(lang === 'en') return values.map(translateTaskToEnglish).filter(Boolean).join(' + ') || 'No tasks specified';
  return values.join(' + ') || 'بدون مهام محددة';
}

const scheduleColorPalette = ['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#0ea5e9','#84cc16','#f97316','#14b8a6','#a855f7','#e11d48'];

function hashString(value){
  return String(value||'').split('').reduce((hash,ch)=>((hash<<5)-hash)+ch.charCodeAt(0),0);
}

function hslToHex(h, s, l){
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return '#'+[f(0),f(8),f(4)].map(x=>Math.round(255*x).toString(16).padStart(2,'0')).join('');
}

function getScheduleEmployeeColor(empId){
  const hash = Math.abs(hashString(empId));
  if(!empId) return scheduleColorPalette[hash % scheduleColorPalette.length];
  return hslToHex(hash % 360,72,42);
}

function getScheduleItemColor(item){
  return item?.color || getScheduleEmployeeColor(item?.empId || item?.empName);
}

function hexToRgba(hex, alpha){
  const clean = String(hex||'#2563eb').replace('#','');
  const int = parseInt(clean.length===3 ? clean.split('').map(x=>x+x).join('') : clean,16);
  const r = (int>>16)&255, g = (int>>8)&255, b = int&255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function getSelectedDayName(dayKey=selectedDay, lang='ar'){
  if(lang === 'en') return daysEn[dayKey] || dayKey || 'Day';
  const idx = dayKeys.indexOf(dayKey);
  return idx >= 0 ? days[idx] : (dayKey || 'اليوم');
}

function formatFileDate(date=new Date(), includeTime=false){
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  if(!includeTime) return `${y}-${m}-${d}`;
  const hh = String(date.getHours()).padStart(2,'0');
  const mm = String(date.getMinutes()).padStart(2,'0');
  return `${y}-${m}-${d} ${hh}-${mm}`;
}

function getScheduleTitle(dayKey=selectedDay, date=new Date(), lang='ar'){
  if(lang === 'en') return `Branch Work Schedule ${getSelectedDayName(dayKey,'en')} ${date.toLocaleDateString('en-US')}`;
  return `جدول دوام الأفرع ${getSelectedDayName(dayKey,'ar')} ${date.toLocaleDateString('ar-KW')}`;
}

function getSchedulePdfFileName(dayKey, date=new Date(), lang='ar'){
  if(lang === 'en') return safeFileName(`Branch Work Schedule ${getSelectedDayName(dayKey,'en')} - ${formatFileDate(date)}.pdf`);
  return safeFileName(`جدول دوام الأفرع ${getSelectedDayName(dayKey,'ar')} - ${formatFileDate(date)}.pdf`);
}

function getPdfHistory(dayKey){
  if(!appData.schedulePdfHistory) appData.schedulePdfHistory = {};
  if(!appData.schedulePdfHistory[dayKey]) appData.schedulePdfHistory[dayKey] = {files:[],current:null};
  return appData.schedulePdfHistory[dayKey];
}

function resolveSchedulePdfRecord(dayKey, approvalDate=new Date()){
  const history = getPdfHistory(dayKey);
  const current = history.current;
  const twoDaysMs = 2*24*60*60*1000;
  let record;
  if(current?.createdAt && approvalDate - new Date(current.createdAt) < twoDaysMs){
    record = {...current, updatedAt:approvalDate.toISOString()};
    if(!record.fileNames) record.fileNames = {};
    if(!record.fileNames.ar) record.fileNames.ar = record.fileName || getSchedulePdfFileName(dayKey,new Date(record.createdAt || approvalDate),'ar');
    if(!record.fileNames.en) record.fileNames.en = record.englishFileName || getSchedulePdfFileName(dayKey,new Date(record.createdAt || approvalDate),'en');
    record.fileName = record.fileNames.ar;
    record.englishFileName = record.fileNames.en;
    const idx = history.files.findIndex(file=>file.fileName === current.fileName);
    if(idx >= 0) history.files[idx] = record;
  } else {
    record = {
      fileName:getSchedulePdfFileName(dayKey,approvalDate,'ar'),
      englishFileName:getSchedulePdfFileName(dayKey,approvalDate,'en'),
      fileNames:{
        ar:getSchedulePdfFileName(dayKey,approvalDate,'ar'),
        en:getSchedulePdfFileName(dayKey,approvalDate,'en')
      },
      createdAt:approvalDate.toISOString(),
      updatedAt:approvalDate.toISOString()
    };
    history.files.push(record);
  }
  history.current = record;
  return record;
}

function base64ToUint8Array(base64){
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function dataUrlToBytes(dataUrl){
  return base64ToUint8Array(String(dataUrl).split(',')[1] || '');
}

function drawRoundRect(ctx, x, y, w, h, r){
  const radius = Math.min(r,w/2,h/2);
  ctx.beginPath();
  ctx.moveTo(x+radius,y);
  ctx.lineTo(x+w-radius,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+radius);
  ctx.lineTo(x+w,y+h-radius);
  ctx.quadraticCurveTo(x+w,y+h,x+w-radius,y+h);
  ctx.lineTo(x+radius,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-radius);
  ctx.lineTo(x,y+radius);
  ctx.quadraticCurveTo(x,y,x+radius,y);
  ctx.closePath();
}

function drawTextLines(ctx, text, x, y, maxWidth, lineHeight, maxLines=2){
  const words = String(text||'').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach(word=>{
    const test = line ? `${line} ${word}` : word;
    if(ctx.measureText(test).width > maxWidth && line){
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if(line) lines.push(line);
  const clipped = lines.slice(0,maxLines);
  if(lines.length > maxLines && clipped.length){
    clipped[clipped.length-1] = clipped[clipped.length-1].replace(/\s+\S*$/,'') + '...';
  }
  clipped.forEach((value,i)=>ctx.fillText(value,x,y+(i*lineHeight)));
  return clipped.length * lineHeight;
}

function drawScheduleCanvasToJpegDataUrl(dayKey, schedule, title, lang='ar', approvalDate=new Date()){
  const isEn = lang === 'en';
  const width = 1600;
  const zones = ['surra','abulhasania','yarmouk'];
  const maxCardsPerRow = 3;
  const cardH = 150;
  let height = 230;
  zones.forEach(zone=>{
    const count = Math.max(1,(schedule.zones?.[zone] || []).length);
    height += 92 + Math.ceil(count/maxCardsPerRow) * (cardH + 18) + 30;
  });
  height = Math.max(1120,height);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.direction = isEn ? 'ltr' : 'rtl';
  ctx.textAlign = isEn ? 'left' : 'right';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0,0,width,height);

  ctx.fillStyle = '#0f172a';
  ctx.font = '900 48px Arial, sans-serif';
  drawTextLines(ctx,title,isEn ? 64 : width-64,58,width-320,58,2);
  ctx.fillStyle = '#475569';
  ctx.font = '700 22px Arial, sans-serif';
  ctx.fillText(isEn ? `Approved on ${approvalDate.toLocaleString('en-US')}` : `تم الاعتماد بتاريخ ${approvalDate.toLocaleString('ar-KW')}`,isEn ? 64 : width-64,168);
  drawRoundRect(ctx,isEn ? width-224 : 64,56,160,54,27);
  ctx.fillStyle = '#dcfce7';
  ctx.fill();
  ctx.strokeStyle = '#86efac';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#15803d';
  ctx.font = '900 24px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(isEn ? 'Approved' : 'معتمد',isEn ? width-144 : 144,71);
  ctx.textAlign = isEn ? 'left' : 'right';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(64,210);
  ctx.lineTo(width-64,210);
  ctx.stroke();

  let y = 246;
  zones.forEach(zone=>{
    const items = schedule.zones?.[zone] || [];
    const rows = Math.ceil(Math.max(1,items.length)/maxCardsPerRow);
    const sectionH = 76 + rows * (cardH + 18) + 26;
    drawRoundRect(ctx,64,y,width-128,sectionH,18);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#dbe4ef';
    ctx.lineWidth = 3;
    ctx.stroke();

    drawRoundRect(ctx,64,y,width-128,66,18);
    ctx.fillStyle = '#e8f1ff';
    ctx.fill();
    ctx.fillStyle = '#1d4ed8';
    ctx.font = '900 30px Arial, sans-serif';
    ctx.fillText(isEn ? scheduleBranchNamesEn[zone] : scheduleBranchNames[zone],isEn ? 92 : width-92,y+17);

    if(!items.length){
      ctx.fillStyle = '#64748b';
      ctx.font = '700 22px Arial, sans-serif';
      ctx.fillText(isEn ? 'No employees in this branch' : 'لا يوجد موظفون في هذا الفرع',isEn ? 92 : width-92,y+98);
    } else {
      const gap = 18;
      const cardW = (width - 184 - (gap * 2)) / 3;
      items.forEach((item,i)=>{
        const row = Math.floor(i/maxCardsPerRow);
        const col = i % maxCardsPerRow;
        const cardX = isEn ? 92 + (col * (cardW + gap)) : width - 92 - cardW - (col * (cardW + gap));
        const cardY = y + 90 + (row * (cardH + gap));
        const color = getScheduleItemColor(item);
        drawRoundRect(ctx,cardX,cardY,cardW,cardH,16);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 28px Arial, sans-serif';
        ctx.textAlign = isEn ? 'left' : 'right';
        drawTextLines(ctx,employeeNameForPdf(item.empName,lang),isEn ? cardX+18 : cardX+cardW-18,cardY+18,cardW-36,34,2);
        ctx.font = '900 21px Arial, sans-serif';
        ctx.fillText(formatTimeRangeLocalized(item.from,item.to,lang),isEn ? cardX+18 : cardX+cardW-18,cardY+82);
        ctx.font = '700 16px Arial, sans-serif';
        drawTextLines(ctx,tasksForPdf(item.tasks,lang),isEn ? cardX+18 : cardX+cardW-18,cardY+112,cardW-36,22,1);
      });
    }
    y += sectionH + 28;
  });

  return {
    dataUrl:canvas.toDataURL('image/jpeg',0.92),
    width,
    height
  };
}

function buildPdfFromJpeg(jpegBytes, imageWidth, imageHeight){
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let length = 0;
  const pushString = text=>{
    const bytes = encoder.encode(text);
    chunks.push(bytes);
    length += bytes.length;
  };
  const pushBytes = bytes=>{
    chunks.push(bytes);
    length += bytes.length;
  };
  const beginObj = n=>{
    offsets[n] = length;
    pushString(`${n} 0 obj\n`);
  };
  const pageW = 842;
  const pageH = 595;
  const imgRatio = imageWidth / imageHeight;
  const pageRatio = pageW / pageH;
  let drawW = pageW;
  let drawH = pageH;
  let x = 0;
  let y = 0;
  if(imgRatio > pageRatio){
    drawH = pageW / imgRatio;
    y = (pageH - drawH) / 2;
  } else {
    drawW = pageH * imgRatio;
    x = (pageW - drawW) / 2;
  }
  const content = `q\n${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/Im0 Do\nQ`;
  pushString('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  beginObj(1); pushString('<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  beginObj(2); pushString('<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  beginObj(3); pushString(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`);
  beginObj(4);
  pushString(`<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
  pushBytes(jpegBytes);
  pushString('\nendstream\nendobj\n');
  beginObj(5); pushString(`<< /Length ${encoder.encode(content).length} >>\nstream\n${content}\nendstream\nendobj\n`);
  const xrefOffset = length;
  pushString('xref\n0 6\n0000000000 65535 f \n');
  for(let i=1;i<=5;i++) pushString(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);
  pushString(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  const out = new Uint8Array(length);
  let offset = 0;
  chunks.forEach(chunk=>{
    out.set(chunk,offset);
    offset += chunk.length;
  });
  return new Blob([out], {type:'application/pdf'});
}

async function createSchedulePdfBlob(dayKey, schedule, title, lang='ar', approvalDate=new Date()){
  const rendered = drawScheduleCanvasToJpegDataUrl(dayKey,schedule,title,lang,approvalDate);
  const jpegBytes = dataUrlToBytes(rendered.dataUrl);
  return buildPdfFromJpeg(jpegBytes,rendered.width,rendered.height);
}

async function writeSchedulePdf(rootHandle, dayKey, schedule, record, lang='ar'){
  const schedulesRoot = await getOrCreateDirectory(rootHandle,['جدول الدوامات']);
  const dayDir = await getOrCreateDirectory(schedulesRoot,[getSelectedDayName(dayKey)]);
  const langDir = await getOrCreateDirectory(dayDir,[lang === 'en' ? 'الانجليزي' : 'عربي']);
  const approvalDate = new Date(record.updatedAt || record.createdAt || Date.now());
  const titleDate = schedule?.scheduleDate ? parseDateInput(schedule.scheduleDate) : approvalDate;
  const title = getScheduleTitle(dayKey,titleDate,lang);
  if(!record.fileNames) record.fileNames = {};
  const requestedName = record.fileNames[lang] || (lang === 'en' ? record.englishFileName : record.fileName) || getSchedulePdfFileName(dayKey,approvalDate,lang);
  const pdfBlob = await createSchedulePdfBlob(dayKey,schedule,title,lang,approvalDate);
  const safeName = await writeFile(langDir,requestedName,pdfBlob);
  record.fileNames[lang] = safeName;
  if(lang === 'ar') record.fileName = safeName;
  if(lang === 'en') record.englishFileName = safeName;
  return safeName;
}

async function writeSchedulePdfPair(rootHandle, dayKey, schedule, record){
  const ar = await writeSchedulePdf(rootHandle,dayKey,schedule,record,'ar');
  const en = await writeSchedulePdf(rootHandle,dayKey,schedule,record,'en');
  return {ar,en};
}

async function writeHrmsFilesToDirectory(rootHandle, syncedAt){
  const dbDir = await getOrCreateDirectory(rootHandle,['قاعدة البيانات']);
  const dbEmployeesDir = await getOrCreateDirectory(dbDir,['الموظفين']);
  const dbSchedulesDir = await getOrCreateDirectory(dbDir,['جداول الدوامات']);
  const dbOfficialDir = await getOrCreateDirectory(dbDir,['الكتب والقرارات']);
  const employeesRoot = await getOrCreateDirectory(rootHandle,['الموظفين']);
  await removeDirectoryIfExists(employeesRoot,'الكتب العامة');
  await removeDirectoryIfExists(employeesRoot,'القرارات والتعميمات');
  await removeDirectoryIfExists(employeesRoot,'جدول الدوامات');
  await getOrCreateDirectory(rootHandle,['الكتب العامة']);
  await getOrCreateDirectory(rootHandle,['القرارات والتعميمات']);
  const visibleSchedulesRoot = await getOrCreateDirectory(rootHandle,['جدول الدوامات']);
  for(const dayName of days){
    const dayDir = await getOrCreateDirectory(visibleSchedulesRoot,[dayName]);
    await getOrCreateDirectory(dayDir,['عربي']);
    await getOrCreateDirectory(dayDir,['الانجليزي']);
  }

  const exportData = {
    exportedAt:syncedAt,
    version:'HRMS v2.0',
    data:appData
  };
  await writeJsonFile(dbDir,'قاعدة البيانات الكاملة.json',exportData);
  await writeJsonFile(dbDir,'قاعدة بيانات بدون المرفقات.json',cloneWithoutAttachmentPayload(exportData));
  await writeJsonFile(dbEmployeesDir,'كل الموظفين.json',cloneWithoutAttachmentPayload(appData.employees));

  const docsIndex = [];
  for(const emp of appData.employees){
    const empFolder = safeFileName(emp.name || `موظف ${emp.id}`);
    const empDir = await getOrCreateDirectory(employeesRoot,[empFolder]);
    const empDocsDir = await getOrCreateDirectory(empDir,['المستندات']);
    const empBooksDir = await getOrCreateDirectory(empDir,['الكتب الرسمية']);
    await getOrCreateDirectory(empBooksDir,['كتاب تنبيه']);
    await getOrCreateDirectory(empBooksDir,['كتاب خصم']);
    await getOrCreateDirectory(empBooksDir,['لفت نظر']);
    await writeJsonFile(dbEmployeesDir,safeFileName(`${emp.name || 'موظف'} - ${emp.id}.json`),cloneWithoutAttachmentPayload(emp));
    const docs = emp.documents || {};
    for(const [docType,doc] of Object.entries(docs)){
      if(!isDataUrl(doc?.fileData)) continue;
      const fileName = buildDocumentFileName(docType,doc);
      const saved = await writeDataUrlFile(empDocsDir,fileName,doc.fileData);
      docsIndex.push({
        employeeId:emp.id,
        employeeName:emp.name,
        documentType:docType,
        documentName:DOC_TYPE_LABELS[docType] || docType,
        fileName:saved.fileName,
        originalFileName:doc.fileName || '',
        renewDate:doc.renewDate || '',
        expireDate:doc.expireDate || '',
        uploadedAt:doc.uploadedAt || '',
        mime:saved.mime,
        size:saved.size
      });
    }
    if(isDataUrl(emp.photoData) && !isDataUrl(docs.photo?.fileData)){
      const saved = await writeDataUrlFile(empDocsDir,'الصورة الشخصية.png',emp.photoData);
      docsIndex.push({
        employeeId:emp.id,
        employeeName:emp.name,
        documentType:'photoData',
        documentName:'الصورة الشخصية',
        fileName:saved.fileName,
        originalFileName:'',
        renewDate:'',
        expireDate:'',
        uploadedAt:'',
        mime:saved.mime,
        size:saved.size
      });
    }
  }
  await writeJsonFile(dbEmployeesDir,'فهرس المستندات.json',docsIndex);

  await writeJsonFile(dbSchedulesDir,'كل جداول الدوامات.json',appData.schedules);
  for(const [key,schedule] of Object.entries(appData.schedules || {})){
    const dayIndex = typeof dayKeys !== 'undefined' ? dayKeys.indexOf(key) : -1;
    const dayName = dayIndex >= 0 ? days[dayIndex] : key;
    await writeJsonFile(dbSchedulesDir,safeFileName(`جدول ${dayName}.json`),schedule);
  }

  await writeJsonFile(dbDir,'جهات العمل.json',appData.employers);
  await writeJsonFile(dbDir,'التذكيرات.json',appData.reminders);
  await writeJsonFile(dbDir,'الإعدادات.json',appData.settings);
  await writeJsonFile(dbDir,'فهرس الحفظ.json',{
    syncedAt,
    folderName:rootHandle.name,
    counts:{
      employees:appData.employees.length,
      employers:appData.employers.length,
      schedules:Object.keys(appData.schedules || {}).length,
      reminders:appData.reminders.length,
      documents:docsIndex.length
    }
  });
  await writeJsonFile(dbOfficialDir,'الكتب العامة.json',appData.books?.general || []);
  await writeJsonFile(dbOfficialDir,'كتب الخصم.json',appData.books?.deduct || []);
  await writeJsonFile(dbOfficialDir,'كتب التنبيه.json',appData.books?.warn || []);
  await writeJsonFile(dbOfficialDir,'كتب لفت النظر.json',appData.books?.notice || []);
  await writeJsonFile(dbOfficialDir,'القرارات والتعميمات.json',appData.decisions || []);
  await writeJsonFile(dbDir,'تقرير البصمة.json',appData.fingerprintPunches || []);
  await writeJsonFile(dbDir,'رموز دخول البصمة.json',appData.fingerprintCodes || {});

  let pdfCount = 0;
  for(const [key,schedule] of Object.entries(appData.schedules || {})){
    if(!schedule?.approved) continue;
    const history = getPdfHistory(key);
    const record = history.current || resolveSchedulePdfRecord(key,new Date(schedule.approvedAt || syncedAt));
    await writeSchedulePdfPair(rootHandle,key,schedule,record);
    pdfCount += 2;
  }
  await writeJsonFile(dbSchedulesDir,'سجل ملفات PDF.json',appData.schedulePdfHistory || {});

  return {
    employees:appData.employees.length,
    documents:docsIndex.length,
    schedules:Object.keys(appData.schedules || {}).length,
    pdfs:pdfCount
  };
}

async function tryImportDataFromFolder({silent=false, overwrite=true}={}){
  if(!selectedSaveDirectoryHandle){
    if(!silent){
      setFolderStatus('اختر مجلد الحفظ أولاً ثم اضغط استيراد البيانات.', 'warn');
      showToast('اختر مجلد الحفظ أولاً','error');
    }
    return {imported:false, found:false, reason:'no-folder'};
  }
  if(!silent) setFolderStatus('جاري استيراد البيانات من المجلد...', 'warn');
  try{
    const hasPermission = await ensureDirectoryPermission(selectedSaveDirectoryHandle,true);
    if(!hasPermission){
      if(!silent){
        setFolderStatus('لا توجد صلاحية قراءة من المجلد.', 'error');
        showToast('لم يتم منح صلاحية الوصول','error');
      }
      return {imported:false, found:false, reason:'permission'};
    }
    const loaded = await loadHrDataFromFolder(selectedSaveDirectoryHandle);
    if(!loaded.data || !hasMeaningfulHrData(loaded.data)){
      if(!silent){
        if(loaded.found){
          setFolderStatus('وجدت ملفات قاعدة بيانات، لكنها لا تحتوي على بيانات قابلة للقراءة. لم تتم المزامنة حتى لا تُستبدل بياناتك.', 'error');
          showToast('تعذر قراءة بيانات المجلد','error');
        } else {
          setFolderStatus('المجلد لا يحتوي على بيانات سابقة. سيتم البدء كقاعدة جديدة.', 'success');
          showToast('المجلد جديد وجاهز للحفظ');
        }
      }
      return {imported:false, found:loaded.found, reason:loaded.found ? 'unreadable' : 'empty'};
    }
    if(!overwrite && hasMeaningfulHrData(appData)) return {imported:false, found:true, reason:'local-has-data'};
    applyImportedHrData(loaded.data,'folder');
    appData.settings.saveFolderName = selectedSaveDirectoryHandle.name;
    appData.settings.importedAt = new Date().toISOString();
    localStorage.setItem('hrmsData',JSON.stringify(appData));
    renderFolderSettings();
    setFolderStatus(`تم استيراد البيانات من ${loaded.source}: ${appData.employees.length} موظف، ${Object.keys(appData.schedules || {}).length} جدول.`, 'success');
    if(!silent) showToast('تم استيراد البيانات من المجلد');
    return {imported:true, found:true, reason:'imported', source:loaded.source};
  } catch(err){
    if(err?.name === 'NotFoundError'){
      if(!silent) setFolderStatus('المجلد لا يحتوي على قاعدة بيانات سابقة. سيتم البدء كقاعدة جديدة.', 'success');
      return {imported:false, found:false, reason:'empty'};
    }
    console.error(err);
    if(!silent){
      setFolderStatus('تعذر استيراد البيانات. تأكد أن المجلد يحتوي على قاعدة البيانات/قاعدة البيانات الكاملة.json', 'error');
      showToast('فشل استيراد البيانات','error');
    }
    return {imported:false, found:true, reason:'error', error:err};
  }
}

async function importDataFromFolder(){
  await tryImportDataFromFolder({silent:false, overwrite:true});
}

async function syncDataToFolder(userTriggered=false){
  if(!selectedSaveDirectoryHandle){
    setFolderStatus('اختر مجلد الحفظ أولاً من زر اختيار مجلد.', 'warn');
    if(userTriggered) showToast('اختر مجلد الحفظ أولاً','error');
    return;
  }
  if(userTriggered && !hasMeaningfulHrData()){
    const imported = await tryImportDataFromFolder({silent:true, overwrite:false});
    if(imported.imported){
      setFolderStatus(`تم تحميل بيانات المجلد تلقائياً: ${appData.employees.length} موظف، ${Object.keys(appData.schedules || {}).length} جدول.`, 'success');
      showToast('تم تحميل البيانات من المجلد');
      return;
    }
    if(imported.found){
      setFolderStatus('المجلد يحتوي على ملفات قاعدة بيانات، لكن لم أستطع قراءة بيانات منها. تم إيقاف المزامنة حتى لا تُكتب أصفار فوق بياناتك.', 'error');
      showToast('تم إيقاف المزامنة لحماية البيانات','error');
      return;
    }
  }
  if(folderSyncRunning){
    folderSyncPending = true;
    return;
  }
  folderSyncRunning = true;
  setFolderStatus('جاري مزامنة قاعدة البيانات والملفات...', 'warn');
  try{
    const hasPermission = await ensureDirectoryPermission(selectedSaveDirectoryHandle,userTriggered);
    if(!hasPermission){
      setFolderStatus('لا توجد صلاحية كتابة على المجلد. اضغط مزامنة الآن واسمح بالوصول.', 'error');
      if(userTriggered) showToast('لم يتم منح صلاحية الكتابة','error');
      return;
    }
    const syncedAt = new Date().toISOString();
    appData.settings.saveFolderName = selectedSaveDirectoryHandle.name;
    appData.settings.lastFileSyncAt = syncedAt;
    localStorage.setItem('hrmsData',JSON.stringify(appData));
    const result = await writeHrmsFilesToDirectory(selectedSaveDirectoryHandle,syncedAt);
    localStorage.setItem('hrmsData',JSON.stringify(appData));
    renderFolderSettings();
    setFolderStatus(`تمت المزامنة: ${result.employees} موظف، ${result.documents} مستند، ${result.schedules} جدول، ${result.pdfs || 0} PDF.`, 'success');
    if(userTriggered) showToast('تم حفظ الملفات داخل المجلد');
  } catch(err){
    console.error(err);
    setFolderStatus('حدث خطأ أثناء حفظ الملفات داخل المجلد.', 'error');
    if(userTriggered) showToast('فشل حفظ الملفات في المجلد','error');
  } finally {
    folderSyncRunning = false;
    if(folderSyncPending){
      folderSyncPending = false;
      queueFolderSync();
    }
  }
}

// ===== LOGIN =====
document.addEventListener('keydown', e => {
  const ls = document.getElementById('loginScreen');
  if(!ls || ls.classList.contains('hidden')) return;
  if(e.key >= '0' && e.key <= '9' && pinValue.length < 4){
    pinValue += e.key; updatePinDisplay();
  } else if(e.key === 'Backspace'){
    pinValue = pinValue.slice(0,-1); updatePinDisplay();
  } else if(e.key === 'Enter'){
    tryLogin();
  }
});

function updatePinDisplay(){
  for(let i=0;i<4;i++){
    const d = document.getElementById('dot'+i);
    d.classList.toggle('filled', i < pinValue.length);
    d.textContent = i < pinValue.length ? '●' : '●';
  }
}

function tryLogin(){
  if(pinValue === CORRECT_PIN){
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainApp').style.display = 'flex';
    document.getElementById('mainApp').classList.add('show');
    initApp();
    setTimeout(()=>document.getElementById('loginScreen').style.display='none',700);
  } else {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach(d=>d.classList.add('error'));
    document.getElementById('errorMsg').textContent = 'رمز الدخول غير صحيح';
    setTimeout(()=>{
      dots.forEach(d=>d.classList.remove('error'));
      document.getElementById('errorMsg').textContent='';
      pinValue=''; updatePinDisplay();
    },1000);
  }
}

function logout(){
  document.getElementById('mainApp').style.display='none';
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('loginScreen').style.display='flex';
  pinValue=''; updatePinDisplay();
}

// ===== INIT =====
function initApp(){
  populateNationalitySelect();
  populateIntlCountries();
  renderEmployees();
  renderEmployersList();
  renderEmployersInForm();
  renderReminders();
  renderScheduleDays();
  updateReminderBadge();
}

function populateNationalitySelect(){
  const sel = document.getElementById('empNationality');
  countries.forEach(c=>{
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = c.flag+' '+c.name;
    sel.appendChild(opt);
  });
}

function populateIntlCountries(){
  const list = document.getElementById('intlCountryList');
  renderCountryList(list, countries);
}

function renderCountryList(container, list){
  container.innerHTML = '';
  list.forEach(c=>{
    const div = document.createElement('div');
    div.className = 'country-option';
    div.innerHTML = `<span style="font-size:20px">${c.flag}</span><span>${c.name}</span><span style="margin-right:auto;color:var(--text3);font-size:12px">${c.dial}</span>`;
    div.onclick = ()=>{
      intlSelectedCountry = c;
      document.getElementById('intlFlagBtn').textContent = c.flag+' '+c.dial;
      document.getElementById('intlDropdown').classList.remove('show');
    };
    container.appendChild(div);
  });
}

function filterCountries(dropId, q){
  const filtered = countries.filter(c=>c.name.includes(q)||c.dial.includes(q));
  const container = document.getElementById('intlCountryList');
  renderCountryList(container, filtered);
}

function toggleCountryDropdown(id){
  const dd = document.getElementById(id);
  dd.classList.toggle('show');
}

document.addEventListener('click', e=>{
  if(!e.target.closest('.phone-wrapper')) document.querySelectorAll('.country-dropdown').forEach(d=>d.classList.remove('show'));
  if(!e.target.closest('.menu-3dots') && !e.target.closest('.dropdown-menu')) document.querySelectorAll('.dropdown-menu').forEach(m=>m.classList.remove('show'));
});

// ===== NAVIGATION =====
function navTo(page, el){
  if(currentPage !== page){
    prevPage = currentPage;
  }
  currentPage = page;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const pg = document.getElementById('page-'+page);
  if(pg) pg.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'));
  if(el) el.classList.add('active');
  else {
    const navEl = document.querySelector(`.nav-item[data-page="${page}"]`);
    if(navEl) navEl.classList.add('active');
  }
  const titles = {
    employees:'الموظفون',addEmployee:'إدراج موظف',schedule:'جدول الدوامات',
    fingerprint:'تقرير البصمة',reminders:'التذكيرات',notifications:'الإشعارات',
    bookGeneral:'الكتاب العام',bookDeduct:'كتاب الخصم',bookWarn:'كتاب التنبيه',
    bookNotice:'كتاب لفت النظر',decisions:'القرارات والتعميمات',employers:'جهات العمل',addEmployer:'إضافة جهة عمل',
    settings:'الإعدادات',fingerprintCodes:'رموز دخول البصمة',fingerprintPlaces:'أماكن البصمة',profile:'ملف الموظف'
  };
  document.getElementById('topbarTitle').textContent = titles[page]||'';
  document.getElementById('topbarBack').style.display = (page==='profile') ? 'flex' : 'none';
  document.getElementById('topbarActions').innerHTML = '';

  if(page==='addEmployee'){
    if(!editingEmpId) resetAddForm();
  }
  if(page==='settings') updateThemeToggle();
  if(page==='fingerprintCodes') renderFingerprintCodes();
  if(page==='addEmployer') renderEmployerBranchChoices([]);
  if(page==='employers') renderEmployersList();
  if(page==='reminders') renderReminders();
}

function goBack(){
  navTo(prevPage||'employees');
}

// ===== HELPERS =====
function toEnglishDigits(el){
  el.value = el.value.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[^0-9]/g,'');
}

function showLoading(msg='جاري الحفظ...'){
  document.getElementById('loadingText').textContent = msg;
  document.getElementById('loadingScreen').classList.add('show');
}

function hideLoading(){
  document.getElementById('loadingScreen').classList.remove('show');
}

function showToast(msg, type='success'){
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  document.getElementById('toastIcon').textContent = type==='success' ? '✓' : '✕';
  t.className = `toast show ${type}`;
  setTimeout(()=>t.classList.remove('show'),3000);
}

function openModal(id){ document.getElementById(id).classList.add('show');}
function closeModal(id){
  closeTimePicker();
  document.getElementById(id).classList.remove('show');
}

function generateId(){ return Date.now().toString(36)+Math.random().toString(36).slice(2);}

function getInitials(name){
  const parts = name.trim().split(' ');
  if(parts.length>=2) return parts[0][0]+parts[1][0];
  return name.slice(0,2);
}

function getCountryByCode(code){
  return countries.find(c=>c.code===code)||{name:code,flag:'🌍',dial:''};
}

const avatarColors = ['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4'];
function getAvatarColor(id){ return avatarColors[id.charCodeAt(0)%avatarColors.length];}

// ===== EMPLOYEES =====
function renderEmployees(){
  const grid = document.getElementById('employeesGrid');
  const emps = appData.employees;
  document.getElementById('empCount').textContent = emps.length;
  if(!emps.length){
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><p>لا يوجد موظفون. ابدأ بإضافة موظف جديد</p></div>`;
    return;
  }
  grid.innerHTML = emps.map(emp=>{
    const c = getCountryByCode(emp.nationality||'');
    const photoSrc = getUsableImageSource(emp.photoData, emp.documents?.photo?.fileData);
    const avatarHtml = photoSrc
      ? `<div class="emp-avatar"><img src="${escapeHtml(photoSrc)}" alt=""></div>`
      : `<div class="emp-avatar" style="background:${getAvatarColor(emp.id)}22;color:${getAvatarColor(emp.id)}">${getInitials(emp.name)}</div>`;
    return `<div class="emp-card" onclick="openProfile('${emp.id}')">
      ${avatarHtml}
      <div class="emp-info">
        <h3>${emp.name}</h3>
        <p>${emp.position||'—'}</p>
        <p style="font-size:12px;color:var(--text3)">${c.flag} ${c.name}</p>
        <span class="emp-badge">${emp.employer||'—'}</span>
      </div>
    </div>`;
  }).join('');
}

function filterEmployees(q){
  const emps = appData.employees.filter(e=>e.name.includes(q)||e.position?.includes(q));
  const grid = document.getElementById('employeesGrid');
  if(!emps.length){ grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><p>لا توجد نتائج</p></div>`; return; }
  grid.innerHTML = emps.map(emp=>{
    const c = getCountryByCode(emp.nationality||'');
    const photoSrc = getUsableImageSource(emp.photoData, emp.documents?.photo?.fileData);
    const avatarHtml = photoSrc ? `<div class="emp-avatar"><img src="${escapeHtml(photoSrc)}" alt=""></div>` : `<div class="emp-avatar" style="background:${getAvatarColor(emp.id)}22;color:${getAvatarColor(emp.id)}">${getInitials(emp.name)}</div>`;
    return `<div class="emp-card" onclick="openProfile('${emp.id}')">${avatarHtml}<div class="emp-info"><h3>${emp.name}</h3><p>${emp.position||'—'}</p><p style="font-size:12px;color:var(--text3)">${c.flag} ${c.name}</p><span class="emp-badge">${emp.employer||'—'}</span></div></div>`;
  }).join('');
}

// ===== ADD EMPLOYEE =====
function onScheduleTypeChange(type){
  document.getElementById('radioFixed').classList.toggle('selected',type==='fixed');
  document.getElementById('radioVariable').classList.toggle('selected',type==='variable');
  document.getElementById('fixedHoursSection').style.display = type==='fixed'?'block':'none';
  document.getElementById('variableHoursSection').style.display = type==='variable'?'block':'none';
}

function updateHoursBar(){
  const totalH = parseInt(document.getElementById('empHours').value)||0;
  const bar = document.getElementById('empHoursBar');
  const usedH = empSegments.reduce((s,seg)=>s+seg.hours,0);
  const remaining = totalH - usedH;
  bar.innerHTML = '';
  const colors = ['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899'];
  empSegments.forEach((seg,i)=>{
    const pct = totalH>0 ? (seg.hours/totalH)*100 : 0;
    const div = document.createElement('div');
    div.className = 'hours-bar-segment';
    div.style.cssText = `width:${pct}%;background:${colors[i%colors.length]}`;
    div.innerHTML = `<span style="font-size:10px">${formatTimeRange(seg.from,seg.to)}</span><span style="font-size:9px;opacity:.8">${seg.tasks.slice(0,2).join('+')||''}</span>`;
    bar.appendChild(div);
  });
  if(remaining>0||totalH===0){
    const rem = document.createElement('div');
    rem.className = 'hours-bar-remaining';
    rem.textContent = totalH>0 ? `${remaining} ساعة متبقية` : 'أدخل عدد ساعات العمل أولاً';
    bar.appendChild(rem);
  }
}

function openAddSegmentModal(){
  const totalH = parseInt(document.getElementById('empHours').value)||0;
  if(!totalH){ showToast('أدخل عدد ساعات العمل أولاً','error'); return; }
  const selectedEmployer = appData.employers.find(employer=>employer.name === document.getElementById('empEmployer').value);
  fillEmployerSelect(document.getElementById('segEmployer'), selectedEmployer?.id || '', 'اختر جهة عمل الدوام...');
  setupTimePickers();
  setTimePickerValue('segFrom','');
  setTimePickerValue('segTo','');
  document.getElementById('tasksList').innerHTML=`<div class="task-input-row" style="display:flex;gap:8px;margin-bottom:8px"><input class="form-control" placeholder="أدخل المهمة" style="flex:1"></div>`;
  openModal('segmentModal');
}

function addTaskInput(){
  const list = document.getElementById('tasksList');
  const row = document.createElement('div');
  row.className='task-input-row';
  row.style.cssText='display:flex;gap:8px;margin-bottom:8px';
  row.innerHTML=`<input class="form-control" placeholder="أدخل المهمة" style="flex:1"><button type="button" onclick="this.parentElement.remove()" style="background:rgba(239,68,68,0.2);border:none;color:var(--red);border-radius:6px;padding:0 10px;cursor:pointer;font-size:18px">×</button>`;
  list.appendChild(row);
}

function saveSegment(){
  const from = document.getElementById('segFrom').value;
  const to = document.getElementById('segTo').value;
  const employerId = document.getElementById('segEmployer').value;
  const employer = getEmployerByIdOrName(employerId);
  if(!from||!to){ showToast('حدد الساعة بداية ونهاية','error'); return; }
  if(!employer){ showToast('حدد جهة عمل الدوام','error'); return; }
  const tasks = [...document.querySelectorAll('#tasksList input')].map(i=>i.value).filter(Boolean);
  const fromMin = timeToMin(from), toMin = timeToMin(to);
  if(toMin <= fromMin){ showToast('وقت الانتهاء يجب أن يكون بعد وقت البداية','error'); return; }
  const hours = (toMin - fromMin)/60;
  const totalH = parseInt(document.getElementById('empHours').value)||0;
  const usedH = empSegments.reduce((s,seg)=>s+seg.hours,0);
  if(hours > totalH - usedH){ showToast('تجاوز الحد الأقصى لساعات العمل','error'); return; }
  empSegments.push({from,to,hours,tasks,employerId:employer.id,employerName:employer.name});
  updateHoursBar();
  renderSegmentsList();
  closeModal('segmentModal');
}

function timeToMin(t){ const [h,m]=t.split(':').map(Number); return h*60+m; }

function renderSegmentsList(){
  const c = document.getElementById('segmentsList');
  const colors=['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899'];
  c.innerHTML = empSegments.map((seg,i)=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;background:${colors[i%colors.length]}22;border:1px solid ${colors[i%colors.length]}44;margin-bottom:6px">
      <div style="width:12px;height:12px;border-radius:3px;background:${colors[i%colors.length]};flex-shrink:0"></div>
      <span style="font-size:14px;font-weight:600;color:var(--heading)">${formatTimeRange(seg.from,seg.to)}</span>
      <span class="tag tag-blue" style="font-size:10px">${escapeHtml(seg.employerName || 'جهة غير محددة')}</span>
      <span style="font-size:12px;color:var(--text2)">${seg.tasks.join(' + ')||'—'}</span>
      <button onclick="removeSegment(${i})" style="margin-right:auto;background:none;border:none;color:var(--red);cursor:pointer;font-size:16px">×</button>
    </div>`).join('');
}

function removeSegment(i){ empSegments.splice(i,1); updateHoursBar(); renderSegmentsList(); }

function saveEmployee(){
  const name = document.getElementById('empName').value.trim();
  const nat = document.getElementById('empNationality').value;
  const pos = document.getElementById('empPosition').value.trim();
  const emp = document.getElementById('empEmployer').value;
  const kwPhone = document.getElementById('empKwPhone').value.trim();
  const intlPhone = document.getElementById('empIntlPhone').value.trim();
  const hours = document.getElementById('empHours').value.trim();
  const schedType = document.querySelector('input[name="schedType"]:checked')?.value||'fixed';

  if(!name||!nat||!pos||!emp){ showToast('يرجى ملء الحقول المطلوبة','error'); return; }
  const employerRecord = appData.employers.find(item=>item.name === emp);
  const normalizedSegments = empSegments.map(seg=>({
    ...seg,
    employerId:seg.employerId || employerRecord?.id || '',
    employerName:seg.employerName || employerRecord?.name || emp
  }));

  showLoading('جاري إدراج الموظف...');
  setTimeout(()=>{
    hideLoading();
    if(editingEmpId){
      const idx = appData.employees.findIndex(e=>e.id===editingEmpId);
      if(idx>=0){
        appData.employees[idx] = {...appData.employees[idx],name,nationality:nat,position:pos,employer:emp,employerId:employerRecord?.id || '',kwPhone,intlPhone,hours,schedType,segments:normalizedSegments};
      }
      editingEmpId = null;
      showToast(`تم تعديل بيانات الموظف ${name} بنجاح`);
    } else {
      const newEmp = {id:generateId(),name,nationality:nat,position:pos,employer:emp,employerId:employerRecord?.id || '',kwPhone,intlPhone,hours:parseInt(hours)||8,schedType,segments:[...normalizedSegments],documents:{},createdAt:new Date().toISOString()};
      appData.employees.push(newEmp);
      showToast(`تم إدراج الموظف ${name} بنجاح ✓`);
    }
    saveData();
    renderEmployees();
    renderEmployersInForm();
    empSegments=[];
    navTo('employees');
  },1800);
}

function resetAddForm(){
  editingEmpId = null;
  document.getElementById('empName').value='';
  document.getElementById('empNationality').value='';
  document.getElementById('empPosition').value='';
  document.getElementById('empEmployer').value='';
  document.getElementById('empKwPhone').value='';
  document.getElementById('empIntlPhone').value='';
  document.getElementById('empHours').value='';
  empSegments=[];
  updateHoursBar();
  renderSegmentsList();
  onScheduleTypeChange('fixed');
}

// ===== PROFILE =====
function openProfile(id){
  currentProfileId = id;
  const emp = appData.employees.find(e=>e.id===id);
  if(!emp) return;
  const c = getCountryByCode(emp.nationality||'');
  const photoSrc = getUsableImageSource(emp.photoData, emp.documents?.photo?.fileData);
  const avatarHtml = photoSrc ? `<img src="${escapeHtml(photoSrc)}" alt="" style="width:100%;height:100%;object-fit:cover">` : `<span style="font-size:32px;font-weight:700;color:${getAvatarColor(emp.id)}">${getInitials(emp.name)}</span>`;
  
  const docTypes = [
    {key:'photo',name:'الصورة الشخصية',icon:'📷'},
    {key:'civil',name:'البطاقة المدنية',icon:'🪪'},
    {key:'passport',name:'جواز السفر',icon:'📕'},
    {key:'health',name:'كرت الصحة',icon:'🏥'},
    {key:'degree',name:'الشهادة الجامعية',icon:'🎓'},
  ];

  const docsHtml = docTypes.map(dt=>{
    const doc = emp.documents?.[dt.key];
    const hasDoc = doc && hasStoredDocumentFile(doc.fileData);
    return `<div class="doc-upload-card ${hasDoc?'has-doc':''}" onclick="openDocModal('${dt.key}','${emp.id}')">
      <div style="font-size:28px">${dt.icon}</div>
      <div class="doc-name">${dt.name}</div>
      ${hasDoc?`<span class="tag tag-green" style="font-size:11px">✓ مرفق</span>${doc.expireDate?`<div class="doc-date">انتهاء: ${doc.expireDate}</div>`:''}` : `<div style="font-size:12px;color:var(--text3)">اضغط للرفع</div>`}
    </div>`;
  }).join('');

  const profileHtml = `
    <div class="profile-header">
      <div class="profile-avatar" style="border-color:${getAvatarColor(emp.id)}55">${avatarHtml}</div>
      <div>
        <div class="profile-name">${emp.name}</div>
        <div class="profile-position">${emp.position||'—'}</div>
        <div class="profile-meta">
          <span>${c.flag} ${c.name}</span>
          <span>🏢 ${emp.employer||'—'}</span>
          ${emp.kwPhone?`<span>📞 +965 ${emp.kwPhone}</span>`:''}
          <span>⏱ ${emp.hours||'—'} ساعة/يوم</span>
        </div>
      </div>
      <div class="menu-3dots" onclick="toggleProfileMenu()">⋯</div>
      <div class="dropdown-menu" id="profileDropdown">
        <div class="dropdown-item" onclick="editEmployee('${emp.id}')">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          تعديل البيانات
        </div>
        <div class="dropdown-item danger" onclick="deleteEmployee('${emp.id}')">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          حذف الموظف
        </div>
      </div>
    </div>
    <div class="section-title">المستندات الرسمية</div>
    <div class="docs-grid">${docsHtml}</div>
  `;
  document.getElementById('profileContent').innerHTML = profileHtml;
  navTo('profile');
}

function toggleProfileMenu(){
  document.getElementById('profileDropdown').classList.toggle('show');
}

function editEmployee(id){
  const emp = appData.employees.find(e=>e.id===id);
  if(!emp) return;
  editingEmpId = id;
  navTo('addEmployee');
  document.getElementById('topbarTitle').textContent = 'تعديل بيانات الموظف';
  setTimeout(()=>{
    document.getElementById('empName').value = emp.name||'';
    document.getElementById('empNationality').value = emp.nationality||'';
    document.getElementById('empPosition').value = emp.position||'';
    document.getElementById('empEmployer').value = emp.employer||'';
    document.getElementById('empKwPhone').value = emp.kwPhone||'';
    document.getElementById('empIntlPhone').value = emp.intlPhone||'';
    document.getElementById('empHours').value = emp.hours||'';
    empSegments = emp.segments ? [...emp.segments] : [];
    updateHoursBar();
    renderSegmentsList();
  },50);
}

function deleteEmployee(id){
  if(!confirm('هل أنت متأكد من حذف هذا الموظف؟')) return;
  appData.employees = appData.employees.filter(e=>e.id!==id);
  saveData();
  renderEmployees();
  showToast('تم حذف الموظف');
  navTo('employees');
}

// ===== DOCUMENTS =====
function openDocModal(docType, empId){
  currentDocType = docType;
  currentProfileId = empId;
  document.getElementById('docModalTitle').textContent = {photo:'الصورة الشخصية',civil:'البطاقة المدنية',passport:'جواز السفر',health:'كرت الصحة',degree:'الشهادة الجامعية'}[docType];
  document.getElementById('docFile').value='';
  document.getElementById('docRenewDate').value='';
  document.getElementById('docExpireDate').value='';
  document.getElementById('docDatesSection').style.display = docType==='photo'?'none':'block';
  openModal('docModal');
}

function saveDocument(){
  const file = document.getElementById('docFile').files[0];
  const renewDate = document.getElementById('docRenewDate').value;
  const expireDate = document.getElementById('docExpireDate').value;
  if(!file){ showToast('يرجى اختيار ملف','error'); return; }
  if(currentDocType!=='photo' && (!renewDate||!expireDate)){ showToast('يرجى إدخال التواريخ','error'); return; }
  const reader = new FileReader();
  reader.onload = e=>{
    const emp = appData.employees.find(x=>x.id===currentProfileId);
    if(!emp){ closeModal('docModal'); return; }
    if(!emp.documents) emp.documents={};
    emp.documents[currentDocType] = {fileData:e.target.result,renewDate,expireDate,fileName:file.name,uploadedAt:new Date().toISOString()};
    if(currentDocType==='photo') emp.photoData = e.target.result;
    if(expireDate){
      const reminderDate = new Date(expireDate);
      reminderDate.setMonth(reminderDate.getMonth()-1);
      appData.reminders = appData.reminders.filter(r=>!(r.empId===currentProfileId&&r.docType===currentDocType));
      appData.reminders.push({id:generateId(),empId:currentProfileId,empName:emp.name,docType:currentDocType,docName:document.getElementById('docModalTitle').textContent,expireDate,reminderDate:reminderDate.toISOString().split('T')[0]});
    }
    saveData();
    showToast('تم رفع المستند بنجاح');
    closeModal('docModal');
    openProfile(currentProfileId);
    updateReminderBadge();
  };
  reader.readAsDataURL(file);
}

// ===== REMINDERS =====
function renderReminders(){
  const list = document.getElementById('remindersList');
  const today = new Date();
  const reminders = appData.reminders.sort((a,b)=>new Date(a.reminderDate)-new Date(b.reminderDate));
  if(!reminders.length){
    list.innerHTML='<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg><p>لا توجد تذكيرات حالياً</p></div>';
    return;
  }
  list.innerHTML = `<div class="section-title" style="margin-bottom:16px">تذكيرات تجديد المستندات</div>` +
  reminders.map(r=>{
    const remDate = new Date(r.reminderDate);
    const expDate = new Date(r.expireDate);
    const daysLeft = Math.ceil((expDate-today)/(1000*60*60*24));
    let color=var_green, status='قادم', statusClass='tag-green';
    if(daysLeft<0){color='var(--red)';status='منتهي';statusClass='tag-red';}
    else if(daysLeft<=30){color='var(--gold)';status='قريب';statusClass='tag-amber';}
    return `<div class="reminder-item">
      <div class="reminder-dot" style="background:${color}"></div>
      <div class="reminder-info">
        <div class="reminder-title">${r.empName} – ${r.docName}</div>
        <div class="reminder-sub">تاريخ الانتهاء: ${r.expireDate} | التذكير: ${r.reminderDate}</div>
      </div>
      <span class="tag ${statusClass}">${daysLeft<0?'منتهي':daysLeft===0?'اليوم':daysLeft+' يوم'}</span>
    </div>`;
  }).join('');
}

function updateReminderBadge(){
  const today = new Date();
  const urgent = appData.reminders.filter(r=>{
    const d = new Date(r.expireDate);
    return Math.ceil((d-today)/(1000*60*60*24)) <= 30;
  }).length;
  const badge = document.getElementById('reminderBadge');
  badge.textContent = urgent;
  badge.style.display = urgent>0 ? 'inline' : 'none';
}

const var_green = 'var(--green)';

// ===== EMPLOYERS =====
function getBranchLabel(branchKey){
  return scheduleBranchOptions.find(branch=>branch.key === branchKey)?.label || branchKey;
}

function normalizeEmployerBranches(employer){
  if(Array.isArray(employer?.branches) && employer.branches.length) return employer.branches;
  const name = String(employer?.name || '').toLowerCase();
  const matches = scheduleBranchOptions.filter(branch=>{
    const aliases = branch.aliases || [branch.label, branch.key];
    return aliases.some(alias=>name.includes(String(alias).toLowerCase()));
  }).map(branch=>branch.key);
  return matches;
}

function renderEmployerBranchChoices(selected=[]){
  const container = document.getElementById('employerBranchChoices');
  if(!container) return;
  const selectedSet = new Set(selected);
  container.innerHTML = scheduleBranchOptions.map(branch=>`
    <label class="branch-choice">
      <input type="checkbox" value="${branch.key}" ${selectedSet.has(branch.key) ? 'checked' : ''}>
      <span>${branch.label}</span>
    </label>
  `).join('');
}

function getSelectedEmployerBranches(){
  return [...document.querySelectorAll('#employerBranchChoices input:checked')].map(input=>input.value);
}

function renderEmployersList(){
  const list = document.getElementById('employersList');
  const count = document.getElementById('employerCount');
  count.textContent = appData.employers.length;
  if(!appData.employers.length){
    list.innerHTML='<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg><p>لم تضف أي جهة عمل بعد</p></div>';
    return;
  }
  list.innerHTML = appData.employers.map(emp=>`
    <div class="setting-row">
      <div>
        <div class="setting-label">${emp.name}</div>
        <div class="setting-sub">الفروع: ${(normalizeEmployerBranches(emp).map(getBranchLabel).join('، ') || 'غير محدد')} | أضيفت في ${new Date(emp.createdAt).toLocaleDateString('ar')}</div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-secondary btn-sm" onclick="openAddEmployerModal('${emp.id}')">تعديل</button>
        <button class="btn btn-danger btn-sm" onclick="deleteEmployer('${emp.id}')">حذف</button>
      </div>
    </div>`).join('');
}

function renderEmployersInForm(){
  const sel = document.getElementById('empEmployer');
  const cur = sel.value;
  sel.innerHTML = '<option value="">اختر جهة العمل...</option>';
  appData.employers.forEach(e=>{
    const opt = document.createElement('option');
    opt.value = e.name; opt.textContent = e.name;
    sel.appendChild(opt);
  });
  if(cur) sel.value = cur;
  renderScheduleBranchEmployerSelectors();
}

function fillEmployerSelect(select, selectedValue='', placeholder='اختر جهة العمل...'){
  if(!select) return;
  const current = selectedValue || select.value;
  select.innerHTML = `<option value="">${placeholder}</option>`;
  appData.employers.forEach(employer=>{
    const opt = document.createElement('option');
    opt.value = employer.id;
    opt.textContent = employer.name;
    select.appendChild(opt);
  });
  if(current) select.value = current;
}

function getEmployerByIdOrName(value){
  return appData.employers.find(employer=>employer.id === value || employer.name === value) || null;
}

function openAddEmployerModal(id=null){
  editingEmployerId = id;
  const employer = appData.employers.find(item=>item.id === id);
  navTo('addEmployer');
  setTimeout(()=>{
    document.getElementById('topbarTitle').textContent = employer ? 'تعديل جهة عمل' : 'إضافة جهة عمل';
    document.getElementById('employerPageName').value = employer?.name || '';
    renderEmployerBranchChoices(normalizeEmployerBranches(employer));
  },50);
}

function saveEmployer(){
  const name = document.getElementById('employerPageName').value.trim();
  const branches = getSelectedEmployerBranches();
  if(!name){ showToast('أدخل اسم جهة العمل','error'); return; }
  if(!branches.length){ showToast('اختر فرعاً واحداً على الأقل','error'); return; }
  if(editingEmployerId){
    const idx = appData.employers.findIndex(item=>item.id === editingEmployerId);
    if(idx >= 0){
      const oldName = appData.employers[idx].name;
      const {location,zoneRadius,...cleanEmployer} = appData.employers[idx];
      appData.employers[idx] = {...cleanEmployer,name,branches,updatedAt:new Date().toISOString()};
      appData.employees.forEach(emp=>{
        if(emp.employer === oldName){
          emp.employer = name;
          emp.employerId = editingEmployerId;
        }
      });
    }
  } else {
    appData.employers.push({id:generateId(),name,branches,createdAt:new Date().toISOString()});
  }
  saveData();
  renderEmployersList();
  renderEmployersInForm();
  showToast('تم حفظ جهة العمل');
  navTo('employers');
}

function deleteEmployer(id){
  if(!confirm('حذف جهة العمل؟')) return;
  appData.employers = appData.employers.filter(e=>e.id!==id);
  saveData();
  renderEmployersList();
  renderEmployersInForm();
}

// ===== FINGERPRINT =====
function renderFingerprintCodes(){
  const list = document.getElementById('fingerprintCodesList');
  if(!list) return;
  if(!appData.employees.length){
    list.innerHTML = '<div class="fingerprint-empty">لا يوجد موظفون لإضافة رموز لهم</div>';
    return;
  }
  list.innerHTML = appData.employees.map(emp=>`
    <div class="fingerprint-code-row">
      <div>
        <div class="fingerprint-code-name">${escapeHtml(emp.name)}</div>
        <div class="fingerprint-code-position">${escapeHtml(emp.position || emp.employer || '')}</div>
      </div>
      <input class="form-control fingerprint-code-input" inputmode="numeric" data-emp-id="${emp.id}" value="${escapeHtml(appData.fingerprintCodes?.[emp.id] || '')}" oninput="normalizeNumericInput(this)" placeholder="رمز الدخول">
    </div>
  `).join('');
}

function saveFingerprintCodes(){
  const inputs = [...document.querySelectorAll('.fingerprint-code-input')];
  const nextCodes = {};
  const used = new Map();
  for(const input of inputs){
    const code = normalizeDigits(input.value).replace(/[^0-9]/g,'');
    input.value = code;
    if(!code) continue;
    if(used.has(code)){
      showToast('لا يمكن تكرار نفس الرمز لأكثر من موظف','error');
      input.focus();
      return;
    }
    used.set(code,input.dataset.empId);
    nextCodes[input.dataset.empId] = code;
  }
  appData.fingerprintCodes = nextCodes;
  saveData();
  showToast('تم حفظ رموز دخول البصمة');
}

// ===== SCHEDULE =====
const days = ['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
const dayKeys = ['sat','sun','mon','tue','wed','thu','fri'];

function getScheduleWeekStart(baseDate=new Date()){
  const date = new Date(baseDate);
  date.setHours(0,0,0,0);
  const daysSinceSaturday = (date.getDay() + 1) % 7;
  date.setDate(date.getDate() - daysSinceSaturday);
  return date;
}

function getScheduleDateForDayKey(dayKey, baseDate=new Date()){
  const start = getScheduleWeekStart(baseDate);
  const idx = Math.max(0,dayKeys.indexOf(dayKey));
  start.setDate(start.getDate() + idx);
  return start;
}

function formatScheduleCardDate(date){
  return `${toArabicDigits(date.getDate())} / ${toArabicDigits(date.getMonth()+1)}`;
}

function renderScheduleBranchEmployerSelectors(){}

function renderScheduleDays(){
  const container = document.getElementById('dayButtons');
  container.innerHTML = dayKeys.map((key,i)=>{
    const scheduleDate = getScheduleDateForDayKey(key);
    return `
    <div class="card" style="cursor:pointer;padding:14px 20px;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all .2s;border:2px solid var(--border)" 
      onclick="openScheduleDay('${key}',${i})" id="dayCard-${key}">
      <div style="font-size:16px;font-weight:700;color:var(--heading)">${days[i]}</div>
      <div class="schedule-day-date">${formatScheduleCardDate(scheduleDate)}</div>
      <div style="font-size:11px;color:var(--text3)">${appData.schedules[key]?.approved?'✓ معتمد':appData.schedules[key]?.saved?'◉ محفوظ':'جديد'}</div>
    </div>`;
  }).join('');
}

function openScheduleDay(key, idx){
  if(scheduleModified && selectedDay && selectedDay !== key){
    if(!confirm('لديك تعديلات غير محفوظة. هل تريد المغادرة؟')) return;
    scheduleModified = false;
  }
  selectedDay = key;
  const scheduleDate = getScheduleDateForDayKey(key);
  document.getElementById('a4Title').textContent = `جدول دوام الأفرع ${days[idx]} ${scheduleDate.toLocaleDateString('ar-KW')}`;
  document.getElementById('scheduleEmpty').style.display='none';
  document.getElementById('scheduleDayContent').style.display='block';
  scheduleState = JSON.parse(JSON.stringify(appData.schedules[key]||{zones:{surra:[],abulhasania:[],yarmouk:[]},approved:false,saved:false}));
  scheduleState.scheduleDate = scheduleState.scheduleDate || formatDateInput(scheduleDate);
  scheduleState.dayName = days[idx];
  renderScheduleBranchEmployerSelectors();
  renderScheduleZones();
  renderStaffSidebar();
  updateScheduleButtons();
  scheduleModified = false;
  document.getElementById('scheduleUnsavedWarning').style.display='none';
}

function renderScheduleZones(){
  ['surra','abulhasania','yarmouk'].forEach(zone=>{
    const el = document.getElementById('zone-'+zone);
    if(!el) return;
    const items = scheduleState.zones?.[zone]||[];
    el.innerHTML = items.length ? items.map((item,i)=>{
      const color = getScheduleItemColor(item);
      return `
      <div class="schedule-card-item" draggable="true" 
        style="background:${hexToRgba(color,.13)};border-color:${hexToRgba(color,.45)};color:${color}"
        ondragstart="dragFromZone(event,'${zone}',${i})"
        title="اضغط لإضافة ساعات">
        <strong>${item.empName}</strong>
        <div style="font-size:10px;font-weight:700;color:${color}">${escapeHtml(item.employerName || scheduleBranchNames[zone] || '')}</div>
        <div style="font-size:11px">${formatTimeRange(item.from,item.to)}</div>
        <div style="font-size:10px;color:#334155">${item.tasks?.join(' + ')||''}</div>
        <button onclick="removeFromZone('${zone}',${i})" style="position:absolute;top:4px;left:4px;background:none;border:none;color:${color};cursor:pointer;font-size:14px;line-height:1">×</button>
      </div>`;
    }).join('') : '<div style="padding:12px;font-size:12px;color:#94a3b8;text-align:center">اسحب موظفاً هنا</div>';
  });
}

function renderStaffSidebar(){
  const sidebar = document.getElementById('staffSidebar');
  const usedHours = {};
  ['surra','abulhasania','yarmouk'].forEach(zone=>{
    (scheduleState.zones?.[zone]||[]).forEach(item=>{
      usedHours[item.empId] = (usedHours[item.empId]||0) + item.hours;
    });
  });
  const varEmps = appData.employees.filter(e=>e.schedType==='variable'||e.schedType==='fixed');
  sidebar.innerHTML = varEmps.length ? varEmps.map(emp=>{
    const totalH = parseInt(emp.hours)||8;
    const used = usedHours[emp.id]||0;
    const remaining = totalH - used;
    const depleted = remaining<=0;
    return `<div class="staff-card ${depleted?'depleted':''}" draggable="${depleted?'false':'true'}"
      ondragstart="dragStart(event,'${emp.id}')" id="staffCard-${emp.id}">
      <div style="width:32px;height:32px;border-radius:8px;background:${getAvatarColor(emp.id)}33;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${getAvatarColor(emp.id)};flex-shrink:0">${getInitials(emp.name)}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:700;color:${depleted?'var(--text3)':'var(--heading)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${emp.name}</div>
        <div style="font-size:11px;color:var(--text3)">${emp.position||''}</div>
      </div>
      <div class="staff-hours-badge" style="background:${depleted?'rgba(16,185,129,.2)':'rgba(37,99,235,.2)'};color:${depleted?'var(--green)':'var(--accent2)'}">
        ${depleted?'✓ 0':'⏱ '+remaining}h
      </div>
    </div>`;
  }).join('') : '<div style="color:var(--text3);font-size:13px;text-align:center;padding:20px">لا يوجد موظفون</div>';
}

function dragStart(e, empId){
  dragEmpId = empId;
  dragSourceZone = null;
  e.dataTransfer.setData('text','emp:'+empId);
}

function dragFromZone(e, zone, idx){
  dragSourceZone = {zone,idx};
  e.dataTransfer.setData('text','zone:'+zone+':'+idx);
}

function allowDrop(e){ e.preventDefault(); e.currentTarget.classList.add('drag-over'); }
function leaveDrop(e){ e.currentTarget.classList.remove('drag-over'); }

function dropToZone(e, zone){
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const data = e.dataTransfer.getData('text');
  if(data.startsWith('emp:')){
    const empId = data.replace('emp:','');
    pendingSchedEmpId = empId;
    pendingSchedZone = zone;
    const emp = appData.employees.find(x=>x.id===empId);
    document.getElementById('schedModalTitle').textContent = `${emp?.name} - ${zone==='surra'?'السرة':zone==='abulhasania'?'أبو الحصانية':'اليرموك'}`;
    setupTimePickers();
    setTimePickerValue('schedSegFrom','');
    setTimePickerValue('schedSegTo','');
    document.getElementById('schedTasksList').innerHTML=`<div class="task-input-row" style="display:flex;gap:8px;margin-bottom:8px"><input class="form-control" placeholder="أدخل المهمة" style="flex:1"></div>`;
    openModal('scheduleSegModal');
  } else if(data.startsWith('zone:') && dragSourceZone){
    const parts = data.split(':');
    const srcZone = parts[1], srcIdx = parseInt(parts[2]);
    const item = scheduleState.zones[srcZone].splice(srcIdx,1)[0];
    if(item){
      scheduleState.zones[zone].push({...item,zone});
      markScheduleModified();
      renderScheduleZones();
      renderStaffSidebar();
    }
  }
}

function addSchedTaskInput(){
  const list = document.getElementById('schedTasksList');
  const row = document.createElement('div');
  row.style.cssText='display:flex;gap:8px;margin-bottom:8px';
  row.innerHTML=`<input class="form-control" placeholder="أدخل المهمة" style="flex:1"><button type="button" onclick="this.parentElement.remove()" style="background:rgba(239,68,68,0.2);border:none;color:var(--red);border-radius:6px;padding:0 10px;cursor:pointer;font-size:18px">×</button>`;
  list.appendChild(row);
}

function saveScheduleSegment(){
  const from = document.getElementById('schedSegFrom').value;
  const to = document.getElementById('schedSegTo').value;
  if(!from||!to){ showToast('حدد وقت البداية والنهاية','error'); return; }
  const tasks = [...document.querySelectorAll('#schedTasksList input')].map(i=>i.value).filter(Boolean);
  const emp = appData.employees.find(x=>x.id===pendingSchedEmpId);
  if(!emp){ closeModal('scheduleSegModal'); return; }
  const empEmployer = getEmployerByIdOrName(emp.employerId || emp.employer);
  const fromMin = timeToMin(from), toMin = timeToMin(to);
  if(toMin<=fromMin){ showToast('وقت غير صحيح','error'); return; }
  const hours = (toMin-fromMin)/60;
  const usedH = Object.values(scheduleState.zones).flat().filter(x=>x.empId===pendingSchedEmpId).reduce((s,x)=>s+x.hours,0);
  const totalH = parseInt(emp.hours)||8;
  if(hours > totalH-usedH){ showToast(`تجاوزت ساعات الموظف (متبقي ${(totalH-usedH).toFixed(1)}h)`,'error'); return; }
  if(!scheduleState.zones) scheduleState.zones={surra:[],abulhasania:[],yarmouk:[]};
  scheduleState.zones[pendingSchedZone].push({
    empId:emp.id,
    empName:emp.name,
    from,
    to,
    hours,
    tasks,
    zone:pendingSchedZone,
    employerId:empEmployer?.id || emp.employerId || '',
    employerName:empEmployer?.name || emp.employer || '',
    color:getScheduleEmployeeColor(emp.id)
  });
  markScheduleModified();
  renderScheduleZones();
  renderStaffSidebar();
  closeModal('scheduleSegModal');
}

function removeFromZone(zone, idx){
  scheduleState.zones[zone].splice(idx,1);
  markScheduleModified();
  renderScheduleZones();
  renderStaffSidebar();
}

function markScheduleModified(){
  scheduleModified = true;
  scheduleState.saved = false;
  scheduleState.approved = false;
  document.getElementById('scheduleUnsavedWarning').style.display='block';
  updateScheduleButtons();
}

function saveScheduleDay(){
  scheduleState.saved = true;
  appData.schedules[selectedDay] = JSON.parse(JSON.stringify(scheduleState));
  saveData();
  scheduleModified = false;
  document.getElementById('scheduleUnsavedWarning').style.display='none';
  updateScheduleButtons();
  renderScheduleDays();
  showToast('تم الحفظ');
}

async function approveScheduleDay(){
  if(!selectedDay){ showToast('اختر اليوم أولاً','error'); return; }
  const approvedAt = new Date();
  const pdfRecord = resolveSchedulePdfRecord(selectedDay,approvedAt);
  scheduleState.approved = true;
  scheduleState.saved = true;
  scheduleState.approvedAt = approvedAt.toISOString();
  scheduleState.pdfFileName = pdfRecord.fileName;
  scheduleState.pdfEnglishFileName = pdfRecord.englishFileName;
  scheduleState.pdfFileNames = {...(pdfRecord.fileNames || {})};
  scheduleState.pdfUpdatedAt = approvedAt.toISOString();
  appData.schedules[selectedDay] = JSON.parse(JSON.stringify(scheduleState));
  saveData({sync:false});
  scheduleModified = false;
  document.getElementById('scheduleUnsavedWarning').style.display='none';
  updateScheduleButtons();
  renderScheduleDays();
  let firebasePublished = false;
  try{
    setFolderStatus('جاري نشر الدوام المعتمد لتطبيق البصمة...', 'warn');
    await publishApprovedScheduleToFirebase(selectedDay,scheduleState);
    firebasePublished = true;
  } catch(err){
    console.error(err);
    showToast('تم الاعتماد، لكن تعذر نشر الدوام لتطبيق البصمة','error');
  }
  if(selectedSaveDirectoryHandle){
    try{
      setFolderStatus('جاري حفظ PDF جدول الدوام...', 'warn');
      const hasPermission = await ensureDirectoryPermission(selectedSaveDirectoryHandle,true);
      if(hasPermission){
        const savedPdfNames = await writeSchedulePdfPair(selectedSaveDirectoryHandle,selectedDay,scheduleState,pdfRecord);
        scheduleState.pdfFileName = savedPdfNames.ar;
        scheduleState.pdfEnglishFileName = savedPdfNames.en;
        scheduleState.pdfFileNames = savedPdfNames;
        appData.schedules[selectedDay] = JSON.parse(JSON.stringify(scheduleState));
        localStorage.setItem('hrmsData',JSON.stringify(appData));
        await syncDataToFolder(false);
        showToast(firebasePublished ? 'تم اعتماد التوزيع وحفظ PDF ونشره لتطبيق البصمة ✓' : 'تم اعتماد التوزيع وحفظ PDF، لكن تعذر نشره لتطبيق البصمة', firebasePublished ? 'success' : 'error');
      } else {
        saveData();
        showToast(firebasePublished ? 'تم الاعتماد ونشره لتطبيق البصمة، لكن لم يتم حفظ PDF لعدم وجود صلاحية' : 'تم الاعتماد، لكن لم يتم حفظ PDF أو نشره','error');
      }
    } catch(err){
      console.error(err);
      saveData();
      setFolderStatus('تم الاعتماد، لكن تعذر حفظ ملف PDF.', 'error');
      showToast(firebasePublished ? 'تم الاعتماد ونشره لتطبيق البصمة، لكن فشل حفظ PDF' : 'تم الاعتماد، لكن فشل حفظ PDF ونشر الدوام','error');
    }
  } else {
    saveData();
    showToast(firebasePublished ? 'تم الاعتماد ونشره لتطبيق البصمة. اختر مجلد الحفظ لإنشاء PDF' : 'تم الاعتماد، لكن اختر مجلد الحفظ ولم يتم نشر الدوام','error');
  }
}

function updateScheduleButtons(){
  const saveBtn = document.getElementById('saveDayBtn');
  const approveBtn = document.getElementById('approveDayBtn');
  const saveCheck = document.getElementById('saveDayCheck');
  const approveCheck = document.getElementById('approveDayCheck');
  if(scheduleState.saved&&!scheduleModified){
    saveBtn.style.opacity='.5'; saveBtn.style.cursor='default';
    saveCheck.style.display='inline';
  } else {
    saveBtn.style.opacity='1'; saveBtn.style.cursor='pointer';
    saveCheck.style.display='none';
  }
  if(scheduleState.approved&&!scheduleModified){
    approveBtn.style.opacity='.5'; approveBtn.style.cursor='default';
    approveCheck.style.display='inline';
    approveBtn.style.background='var(--bg4)';
  } else {
    approveBtn.style.opacity='1'; approveBtn.style.cursor='pointer';
    approveCheck.style.display='none';
    approveBtn.style.background='var(--accent)';
  }
}

// Warn before leaving schedule with unsaved changes
window.addEventListener('beforeunload', e=>{
  if(scheduleModified){ e.preventDefault(); e.returnValue=''; }
});

// ===== SETTINGS =====
async function chooseFolder(){
  if(!('showDirectoryPicker' in window)){
    setFolderStatus('المتصفح الحالي لا يدعم اختيار مجلد والكتابة داخله. استخدم Chrome أو Edge.', 'error');
    showToast('المتصفح لا يدعم حفظ الملفات في مجلد','error');
    return;
  }
  try{
    const handle = await window.showDirectoryPicker({
      id:'hrms-save-folder',
      mode:'readwrite',
      startIn:'documents'
    });
    const hasPermission = await ensureDirectoryPermission(handle,true);
    if(!hasPermission){
      setFolderStatus('لم يتم منح صلاحية الكتابة على المجلد.', 'error');
      showToast('لم يتم منح صلاحية الكتابة','error');
      return;
    }
    clearTimeout(folderSyncTimer);
    folderSyncPending = false;
    selectedSaveDirectoryHandle = handle;
    await saveStoredDirectoryHandle(handle);
    appData.settings.saveFolderName = handle.name;
    delete appData.settings.savePath;
    appData.settings.folderSelectedAt = new Date().toISOString();
    saveData({sync:false,firebase:false});
    renderFolderSettings();
    const imported = await tryImportDataFromFolder({silent:false, overwrite:true});
    if(imported.imported || imported.found) return;
    resetToFreshFolderDatabase(handle.name);
    setFolderStatus('المجلد الجديد فارغ. تم بدء قاعدة بيانات جديدة من الصفر.', 'success');
    showToast('تم بدء قاعدة جديدة لهذا المجلد');
    await syncDataToFolder(false);
  } catch(err){
    if(err?.name === 'AbortError') return;
    console.error(err);
    setFolderStatus('تعذر اختيار مجلد الحفظ.', 'error');
    showToast('تعذر اختيار مجلد الحفظ','error');
  }
}

// ===== INIT ON LOAD =====
window.addEventListener('DOMContentLoaded', ()=>{
  applyTheme(appData.settings?.theme || 'light');
  const fingerprintPlaceSession = new URLSearchParams(window.location.search).get('fingerprintPlaceSession');
  if(fingerprintPlaceSession){
    initFingerprintPlaceClient(fingerprintPlaceSession);
    return;
  }
  setupTimePickers();
  restoreSavedDirectoryHandle();
  updatePinDisplay();
});
