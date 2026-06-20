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
const HRMS_LEGACY_STORAGE_KEY = 'hrmsData';
const HRMS_SETTINGS_STORAGE_KEY = 'hrmsSettings';

function parseStoredJson(key, fallback={}){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    return JSON.parse(raw);
  } catch(err){
    console.warn(`تعذر قراءة ${key} من تخزين المتصفح`, err);
    return fallback;
  }
}

function getPersistableSettings(settings={}){
  const keys = [
    'theme',
    'saveFolderName',
    'folderSelectedAt',
    'freshFolderStartedAt',
    'lastFileSyncAt',
    'importedAt',
    'firebaseLoadedAt'
  ];
  return keys.reduce((acc,key)=>{
    if(settings[key] !== undefined && settings[key] !== null && settings[key] !== '') acc[key] = settings[key];
    return acc;
  },{});
}

function persistBrowserSettings(settings={}){
  try{
    localStorage.removeItem(HRMS_LEGACY_STORAGE_KEY);
    localStorage.setItem(HRMS_SETTINGS_STORAGE_KEY, JSON.stringify(getPersistableSettings(settings)));
  } catch(err){
    console.warn('تعذر حفظ إعدادات المتصفح الخفيفة', err);
  }
}

function loadInitialAppData(){
  const legacyData = parseStoredJson(HRMS_LEGACY_STORAGE_KEY, {});
  const storedSettings = parseStoredJson(HRMS_SETTINGS_STORAGE_KEY, {});
  const initialData = legacyData && typeof legacyData === 'object' && !Array.isArray(legacyData)
    ? legacyData
    : {};
  initialData.settings = {
    ...(initialData.settings || {}),
    ...(storedSettings || {})
  };
  persistBrowserSettings(initialData.settings);
  return initialData;
}

let appData = loadInitialAppData();
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
let photoCropState = null;
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
let folderAutoImportRunning = false;
let firebasePublisherScriptPromise = null;
let fingerprintPlaceSessionId = null;
let fingerprintPlaceSessionUnsubscribe = null;
let fingerprintPlacesUnsubscribe = null;
let pendingFingerprintPlaceDevice = null;
let fingerprintPlacesCache = {};
let fingerprintBarcodeMap = null;
let fingerprintBarcodeMarker = null;
let fingerprintBarcodeCircle = null;
let fingerprintBarcodeMapBound = false;
let fingerprintBarcodeCoordinateTimer = null;
let editingFingerprintBarcodeId = null;
let quickEmployeeFillFile = null;
const FINGERPRINT_MAP_DEFAULT_CENTER = {lat:29.342263, lng:48.018131};

function saveData(options={}){
  ensureAppDataShape();
  persistBrowserSettings(appData.settings);
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

function hasReadableHrDataShape(data){
  if(!data || typeof data !== 'object' || Array.isArray(data)) return false;
  return [
    'employees',
    'employers',
    'schedules',
    'settings',
    'reminders',
    'fingerprintCodes',
    'fingerprintPunches',
    'fingerprintPlaces',
    'books',
    'decisions',
    'schedulePdfHistory'
  ].some(key=>Object.prototype.hasOwnProperty.call(data,key));
}

function canStartFreshInSelectedFolder(){
  const settings = appData.settings || {};
  const selectedAt = Date.parse(settings.folderSelectedAt || settings.freshFolderStartedAt || '');
  const syncedAt = Date.parse(settings.lastFileSyncAt || '');
  return !hasMeaningfulHrData() && Number.isFinite(selectedAt) && (!Number.isFinite(syncedAt) || selectedAt >= syncedAt);
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

function formatArabicDateTime(value){
  const date = new Date(value);
  if(Number.isNaN(date.getTime())) return String(value || '');
  return date.toLocaleString('ar-KW',{
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit'
  });
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
      photoData:getUsableImageSource(emp.photoData, emp.documents?.photo?.fileData) || '',
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

function getFirebaseFingerprintPlacesPayload(){
  const source = fingerprintPlacesCache && Object.keys(fingerprintPlacesCache).length
    ? fingerprintPlacesCache
    : (appData.fingerprintPlaces || {});
  if(Array.isArray(source)){
    return source.reduce((payload, place)=>{
      if(place?.id) payload[place.id] = cloneForFirebase(place);
      return payload;
    },{});
  }
  return cloneForFirebase(source || {});
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
  const needsDataPublisher = options.requireDataPublisher === true;
  const hasRequiredApi = !needsFresh
    && window.publishHrmsApprovedSchedule
    && window.hrmsFirebase
    && (!needsSessionWatcher || typeof window.hrmsFirebase.watchFingerprintPlaceSessions === 'function')
    && (!needsDataPublisher || typeof window.hrmsFirebase.publishHrmsData === 'function');
  if(hasRequiredApi) return;
  if(!firebasePublisherScriptPromise || needsSessionWatcher || needsFresh || needsDataPublisher){
    const cacheKey = (needsSessionWatcher || needsFresh || needsDataPublisher) ? `?v=${Date.now()}` : '';
    firebasePublisherScriptPromise = loadExternalScript(`firebase-publisher.js${cacheKey}`);
  }
  await firebasePublisherScriptPromise;
}

function cloneForFirebase(data){
  return JSON.parse(JSON.stringify(data ?? null));
}

async function publishHrmsCoreDataToFirebase(){
  await loadFirebasePublisher({requireDataPublisher:true});
  const publisher = window.hrmsFirebase?.publishHrmsData || window.publishHrmsData;
  if(typeof publisher !== 'function') throw new Error('ناشر بيانات Firebase غير جاهز');
  return publisher({
    employees:getFirebaseEmployeesPayload(),
    employers:getFirebaseEmployersPayload(),
    fingerprintCodes:cloneForFirebase(appData.fingerprintCodes || {}),
    fingerprintPlaces:getFirebaseFingerprintPlacesPayload()
  });
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
    await setupFingerprintPlacesPage({freshLink:true});
  } catch(err){
    console.error(err);
    showToast('تعذر فتح أماكن البصمة','error');
  } finally {
    hideLoading();
  }
}

async function setupFingerprintPlacesPage(options={}){
  renderFingerprintBarcodeBranchChoices();
  setupFingerprintBarcodeMap();
  renderFingerprintPlacesList();
  await loadFirebasePublisher({fresh:true});
  if(fingerprintPlaceSessionUnsubscribe) fingerprintPlaceSessionUnsubscribe();
  if(fingerprintPlacesUnsubscribe) fingerprintPlacesUnsubscribe();
  fingerprintPlaceSessionUnsubscribe = null;
  if(typeof window.hrmsFirebase.watchFingerprintPlaces !== 'function') throw new Error('ملف Firebase قديم. ارفع firebase-publisher.js ثم حدث الصفحة.');
  fingerprintPlacesUnsubscribe = await window.hrmsFirebase.watchFingerprintPlaces(data=>{
    fingerprintPlacesCache = data || {};
    renderFingerprintPlacesList();
  });
}

function renderFingerprintBarcodeBranchChoices(){
  const select = document.getElementById('fingerprintBarcodeBranch');
  if(!select) return;
  select.innerHTML = scheduleBranchOptions.map(branch=>`
    <option value="${branch.key}">${branch.label}</option>
  `).join('');
}

function getFingerprintQrLib(){
  if(window.QRCodeLib) return window.QRCodeLib;
  if(window.QRCode?.toCanvas){
    window.QRCodeLib = window.QRCode;
    return window.QRCodeLib;
  }
  if(typeof window.require === 'function'){
    try{
      window.QRCodeLib = window.require('QRCode');
      return window.QRCodeLib;
    } catch(_err){}
  }
  return null;
}

async function ensureFingerprintQrLib(){
  const current = getFingerprintQrLib();
  if(current?.toCanvas) return current;
  if(typeof window.loadHrmsQrFallback === 'function'){
    try{
      await window.loadHrmsQrFallback();
      return getFingerprintQrLib();
    } catch(err){
      console.error(err);
    }
  }
  return null;
}

function generateFingerprintBarcodeToken(){
  const random = Math.random().toString(36).slice(2,10);
  return `bq-${Date.now()}-${random}`;
}

function getFingerprintBarcodeValue(token){
  return `HRMS-BASMA:${token}`;
}

function getFingerprintPlaceBranch(branchKey){
  return scheduleBranchOptions.find(branch=>branch.key === branchKey) || scheduleBranchOptions[0];
}

function parseFingerprintBarcodeCoordinates(value){
  const normalized = normalizeDigits(String(value || ''))
    .replace(/[()]/g,'')
    .replace(/،/g,',')
    .trim();
  const parts = normalized.split(',').map(part=>Number(part.trim()));
  if(parts.length < 2 || !Number.isFinite(parts[0]) || !Number.isFinite(parts[1])) return null;
  const [lat,lng] = parts;
  if(Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return {lat,lng};
}

function formatFingerprintBarcodeCoordinates(coords){
  return `${Number(coords.lat).toFixed(7)}, ${Number(coords.lng).toFixed(7)}`;
}

function getFingerprintBarcodeRadius(){
  const input = document.getElementById('fingerprintBarcodeRadius');
  const radius = Number(normalizeDigits(input?.value || ''));
  return Number.isFinite(radius) && radius > 0 ? radius : 20;
}

function syncFingerprintRadiusControls(radius=getFingerprintBarcodeRadius()){
  const input = document.getElementById('fingerprintBarcodeRadius');
  const slider = document.getElementById('fingerprintBarcodeRadiusSlider');
  const label = document.getElementById('fingerprintBarcodeRadiusValue');
  const cleanRadius = Math.max(1, Math.round(Number(radius) || 20));
  if(input && input.value !== String(cleanRadius)) input.value = String(cleanRadius);
  if(slider){
    if(cleanRadius > Number(slider.max || 200)) slider.max = String(cleanRadius);
    if(slider.value !== String(cleanRadius)) slider.value = String(cleanRadius);
  }
  if(label) label.textContent = `${cleanRadius} متر`;
  if(fingerprintBarcodeCircle) fingerprintBarcodeCircle.setRadius(cleanRadius);
  return cleanRadius;
}

function setFingerprintBarcodeMapPoint(coords, options={}){
  if(!fingerprintBarcodeMap || !window.L || !coords) return;
  const radius = syncFingerprintRadiusControls();
  const latLng = [coords.lat, coords.lng];
  if(!fingerprintBarcodeMarker){
    fingerprintBarcodeMarker = window.L.marker(latLng,{draggable:true}).addTo(fingerprintBarcodeMap);
    fingerprintBarcodeMarker.on('dragend', ()=>{
      const point = fingerprintBarcodeMarker.getLatLng();
      setFingerprintBarcodeMapPoint({lat:point.lat,lng:point.lng},{writeInput:true,center:false});
    });
  } else {
    fingerprintBarcodeMarker.setLatLng(latLng);
  }
  if(!fingerprintBarcodeCircle){
    fingerprintBarcodeCircle = window.L.circle(latLng,{
      radius,
      color:'#2563eb',
      weight:2,
      fillColor:'#2563eb',
      fillOpacity:0.14
    }).addTo(fingerprintBarcodeMap);
  } else {
    fingerprintBarcodeCircle.setLatLng(latLng);
    fingerprintBarcodeCircle.setRadius(radius);
  }
  if(options.writeInput){
    const input = document.getElementById('fingerprintBarcodeCoordinates');
    if(input) input.value = formatFingerprintBarcodeCoordinates(coords);
  }
  if(options.center !== false){
    const bounds = fingerprintBarcodeCircle.getBounds();
    fingerprintBarcodeMap.fitBounds(bounds,{padding:[36,36],maxZoom:19,animate:false});
  }
}

function updateFingerprintBarcodeMapFromFields(options={}){
  const input = document.getElementById('fingerprintBarcodeCoordinates');
  const coords = parseFingerprintBarcodeCoordinates(input?.value || '');
  syncFingerprintRadiusControls();
  if(coords) setFingerprintBarcodeMapPoint(coords,options);
}

function setupFingerprintBarcodeMap(){
  const mapEl = document.getElementById('fingerprintBarcodeMap');
  if(!mapEl) return;
  const coordinatesInput = document.getElementById('fingerprintBarcodeCoordinates');
  const radiusInput = document.getElementById('fingerprintBarcodeRadius');
  const radiusSlider = document.getElementById('fingerprintBarcodeRadiusSlider');
  if(!window.L){
    mapEl.innerHTML = '<div class="fingerprint-map-empty">تعذر تحميل الخريطة. تأكد من اتصال الإنترنت ثم حدث الصفحة.</div>';
    syncFingerprintRadiusControls();
    return;
  }
  if(!fingerprintBarcodeMap){
    fingerprintBarcodeMap = window.L.map(mapEl,{
      zoomControl:true,
      attributionControl:true
    }).setView([FINGERPRINT_MAP_DEFAULT_CENTER.lat,FINGERPRINT_MAP_DEFAULT_CENTER.lng],17);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom:22,
      attribution:'&copy; OpenStreetMap'
    }).addTo(fingerprintBarcodeMap);
    fingerprintBarcodeMap.on('click', event=>{
      setFingerprintBarcodeMapPoint(
        {lat:event.latlng.lat,lng:event.latlng.lng},
        {writeInput:true,center:false}
      );
    });
  }
  if(!fingerprintBarcodeMapBound){
    coordinatesInput?.addEventListener('input', ()=>{
      clearTimeout(fingerprintBarcodeCoordinateTimer);
      fingerprintBarcodeCoordinateTimer = setTimeout(()=>{
        updateFingerprintBarcodeMapFromFields({center:true});
      },250);
    });
    radiusInput?.addEventListener('input', ()=>{
      const radius = syncFingerprintRadiusControls();
      if(radiusSlider && radius > Number(radiusSlider.max || 200)) radiusSlider.max = String(radius);
    });
    radiusSlider?.addEventListener('input', ()=>{
      const radiusInput = document.getElementById('fingerprintBarcodeRadius');
      if(radiusInput) radiusInput.value = radiusSlider.value;
      syncFingerprintRadiusControls(Number(radiusSlider.value));
    });
    fingerprintBarcodeMapBound = true;
  }
  setTimeout(()=>{
    fingerprintBarcodeMap.invalidateSize();
    updateFingerprintBarcodeMapFromFields({center:true});
  },80);
}

function getFingerprintBarcodeFormData(existingPlace=null){
  const branchKey = document.getElementById('fingerprintBarcodeBranch')?.value || 'surra';
  const branch = getFingerprintPlaceBranch(branchKey);
  const titleInput = document.getElementById('fingerprintBarcodeTitle');
  const coordinatesInput = document.getElementById('fingerprintBarcodeCoordinates');
  const radiusInput = document.getElementById('fingerprintBarcodeRadius');
  const title = titleInput?.value.trim() || `باركود ${branch.label}`;
  const coordinates = parseFingerprintBarcodeCoordinates(coordinatesInput?.value || '');
  const radius = Number(normalizeDigits(radiusInput?.value || ''));
  if(!coordinates){
    showToast('أدخل إحداثيات مكان العمل بشكل صحيح','error');
    return null;
  }
  if(!Number.isFinite(radius) || radius <= 0){
    showToast('أدخل حدود السماح بالمتر','error');
    return null;
  }
  const token = existingPlace?.barcodeToken || generateFingerprintBarcodeToken();
  return {
    ...(existingPlace || {}),
    id:existingPlace?.id,
    mode:'barcode',
    title,
    branchKey:branch.key,
    branchName:branch.label,
    barcodeToken:token,
    barcodeValue:existingPlace?.barcodeValue || getFingerprintBarcodeValue(token),
    location:{
      lat:coordinates.lat,
      lng:coordinates.lng
    },
    radiusMeters:radius,
    createdAt:existingPlace?.createdAt || new Date().toISOString()
  };
}

function setFingerprintBarcodeFormMode(place=null){
  const titleEl = document.getElementById('fingerprintBarcodeFormTitle');
  const subEl = document.getElementById('fingerprintBarcodeFormSub');
  const submitBtn = document.getElementById('fingerprintBarcodeSubmitBtn');
  const cancelBtn = document.getElementById('fingerprintBarcodeCancelBtn');
  const titleInput = document.getElementById('fingerprintBarcodeTitle');
  const branchSelect = document.getElementById('fingerprintBarcodeBranch');
  const coordinatesInput = document.getElementById('fingerprintBarcodeCoordinates');
  const radiusInput = document.getElementById('fingerprintBarcodeRadius');
  if(place){
    editingFingerprintBarcodeId = place.id;
    if(titleEl) titleEl.textContent = 'تعديل باركود مكان البصمة';
    if(subEl) subEl.textContent = 'عدّل الفرع أو الاسم أو الإحداثيات أو حدود الزون، ثم احفظ التعديل. نفس الباركود يبقى صالحاً بعد التعديل.';
    if(submitBtn) submitBtn.textContent = 'حفظ التعديل';
    if(cancelBtn) cancelBtn.style.display = 'inline-flex';
    if(titleInput) titleInput.value = place.title || '';
    if(branchSelect) branchSelect.value = place.branchKey || 'surra';
    const lat = Number(place.location?.lat);
    const lng = Number(place.location?.lng);
    if(coordinatesInput && Number.isFinite(lat) && Number.isFinite(lng)) coordinatesInput.value = formatFingerprintBarcodeCoordinates({lat,lng});
    if(radiusInput) radiusInput.value = String(Math.max(1, Math.round(Number(place.radiusMeters) || 20)));
    updateFingerprintBarcodeMapFromFields({center:true});
    return;
  }
  editingFingerprintBarcodeId = null;
  if(titleEl) titleEl.textContent = 'إنشاء باركود مكان البصمة';
  if(subEl) subEl.textContent = 'اختر الفرع وحدد إحداثيات مكان العمل وحدوده، ثم أنشئ باركود. التطبيق لا يقبل البصمة إلا بعد مسح الباركود الصحيح من داخل مكان العمل.';
  if(submitBtn) submitBtn.textContent = 'إنشاء باركود';
  if(cancelBtn) cancelBtn.style.display = 'none';
}

function cancelFingerprintBarcodeEdit(){
  const titleInput = document.getElementById('fingerprintBarcodeTitle');
  if(titleInput) titleInput.value = '';
  setFingerprintBarcodeFormMode(null);
  showToast('تم إلغاء التعديل');
}

function editFingerprintBarcodePlace(id){
  const place = fingerprintPlacesCache?.[id];
  if(!place){
    showToast('تعذر العثور على الباركود','error');
    return;
  }
  setFingerprintBarcodeFormMode(place);
  document.getElementById('page-fingerprintPlaces')?.scrollIntoView({behavior:'smooth',block:'start'});
}

async function saveFingerprintBarcodePlaceFromForm(){
  const wasEditing = Boolean(editingFingerprintBarcodeId);
  const existingPlace = wasEditing ? fingerprintPlacesCache?.[editingFingerprintBarcodeId] : null;
  const payload = getFingerprintBarcodeFormData(existingPlace);
  if(!payload) return;
  const titleInput = document.getElementById('fingerprintBarcodeTitle');
  showLoading(wasEditing ? 'جاري حفظ التعديل...' : 'جاري إنشاء الباركود...');
  try{
    await loadFirebasePublisher();
    await window.hrmsFirebase.saveFingerprintPlace(payload);
    if(titleInput) titleInput.value = '';
    setFingerprintBarcodeFormMode(null);
    showToast(wasEditing ? 'تم حفظ تعديل الباركود' : 'تم إنشاء باركود مكان البصمة');
  } catch(err){
    console.error(err);
    showToast(wasEditing ? 'تعذر حفظ تعديل الباركود' : 'تعذر إنشاء الباركود','error');
  } finally {
    hideLoading();
  }
}

async function createFingerprintBarcodePlace(){
  return saveFingerprintBarcodePlaceFromForm();
}

async function renderFingerprintBarcodeCanvas(canvasId, value, size=156){
  const canvas = document.getElementById(canvasId);
  if(!canvas || !value) return;
  const qr = await ensureFingerprintQrLib();
  if(!qr?.toCanvas){
    const fallback = canvas.nextElementSibling;
    if(fallback) fallback.textContent = 'تعذر تحميل مولد الباركود';
    return;
  }
  qr.toCanvas(canvas, value, {
    width:size,
    margin:1,
    errorCorrectionLevel:'M',
    color:{dark:'#0f172a', light:'#ffffff'}
  }).catch(err=>{
    console.error(err);
    const fallback = canvas.nextElementSibling;
    if(fallback) fallback.textContent = 'تعذر رسم الباركود';
  });
}

function renderFingerprintBarcodeCanvases(){
  Object.values(fingerprintPlacesCache || {}).forEach(place=>{
    if(place?.barcodeValue) renderFingerprintBarcodeCanvas(`barcodeCanvas-${place.id}`, place.barcodeValue);
  });
}

function downloadFingerprintBarcode(id){
  const place = fingerprintPlacesCache?.[id];
  const canvas = document.getElementById(`barcodeCanvas-${id}`);
  if(!place || !canvas) return;
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `${safeFileName(place.title || place.branchName || 'باركود البصمة')}.png`;
  link.click();
}

function pickFingerprintPlaceSession(sessionsMap={}, sessionId=getFingerprintPlaceSessionId()){
  const session = sessionsMap?.[sessionId];
  return session?.location ? session : null;
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

async function refreshFingerprintPlaceLink(){
  showLoading('جاري إنشاء رابط جديد...');
  try{
    resetFingerprintPlaceSessionId();
    pendingFingerprintPlaceDevice = null;
    await setupFingerprintPlacesPage();
    showToast('تم إنشاء رابط جديد');
  } catch(err){
    console.error(err);
    showToast('تعذر إنشاء رابط جديد','error');
  } finally {
    hideLoading();
  }
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
    title.textContent = 'بانتظار اتصال الهاتف';
    details.textContent = 'افتح الرابط أعلاه من الهاتف الموجود داخل مكان البصمة.';
    panel.style.display = 'none';
    return;
  }
  card.className = 'fingerprint-device-card connected';
  title.textContent = 'تم اتصال الهاتف من رابط مكان البصمة';
  details.innerHTML = formatFingerprintDeviceDetails(data);
  panel.style.display = 'block';
}

function formatFingerprintDeviceDetails(data){
  const loc = data.location || {};
  const device = data.device || {};
  const lat = Number(loc.lat);
  const lng = Number(loc.lng);
  const mapUrl = Number.isFinite(lat) && Number.isFinite(lng)
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : '';
  const rows = [
    `خط العرض: ${Number.isFinite(lat) ? lat.toFixed(7) : 'غير متاح'}`,
    `خط الطول: ${Number.isFinite(lng) ? lng.toFixed(7) : 'غير متاح'}`,
    `دقة الموقع: ${Math.round(Number(loc.accuracy) || 0)} متر`,
    loc.qualityMessage ? `حالة الدقة: ${escapeHtml(loc.qualityMessage)}` : '',
    loc.sampleCount ? `عدد قراءات GPS: ${loc.sampleCount}` : '',
    loc.bestAccuracy ? `أفضل دقة: ${Math.round(Number(loc.bestAccuracy))} متر` : '',
    loc.altitude != null ? `الارتفاع: ${Math.round(Number(loc.altitude))} متر` : 'الارتفاع: غير متاح من المتصفح',
    loc.altitudeAccuracy != null ? `دقة الارتفاع: ${Math.round(Number(loc.altitudeAccuracy))} متر` : '',
    loc.heading != null ? `اتجاه الحركة: ${Math.round(Number(loc.heading))} درجة` : '',
    loc.speed != null ? `السرعة: ${Number(loc.speed).toFixed(1)} م/ث` : '',
    loc.capturedAt ? `وقت قراءة الموقع: ${escapeHtml(formatArabicDateTime(loc.capturedAt))}` : '',
    data.updatedAt ? `آخر تحديث: ${escapeHtml(formatArabicDateTime(data.updatedAt))}` : '',
    `النظام: ${escapeHtml(device.platform || 'غير معروف')}`,
    `اللغة: ${escapeHtml(device.language || '')}`,
    Array.isArray(device.languages) && device.languages.length ? `لغات الجهاز: ${escapeHtml(device.languages.join(', '))}` : '',
    `المنطقة الزمنية: ${escapeHtml(device.timeZone || '')}`,
    `الشاشة: ${escapeHtml(device.screen || '')}`,
    device.connection?.effectiveType ? `نوع الاتصال: ${escapeHtml(device.connection.effectiveType)}` : '',
    device.connection?.rtt ? `زمن الاستجابة: ${escapeHtml(String(device.connection.rtt))}ms` : '',
    device.online != null ? `حالة الإنترنت: ${device.online ? 'متصل' : 'غير متصل'}` : '',
    `المتصفح: ${escapeHtml(device.userAgent || '')}`
  ].filter(Boolean);
  if(mapUrl) rows.push(`<a href="${mapUrl}" target="_blank" rel="noopener">فتح الموقع على الخريطة</a>`);
  return `<div class="fingerprint-place-meta" dir="rtl">${rows.join('<br>')}</div>`;
}

function renderFingerprintPlacesList(){
  const list = document.getElementById('fingerprintPlacesList');
  if(!list) return;
  const places = Object.values(fingerprintPlacesCache || {}).filter(place=>place?.mode === 'barcode' || place?.barcodeToken || place?.barcodeValue);
  if(!places.length){
    list.innerHTML = '<div class="empty-state"><p>لا توجد باركودات بصمة محفوظة بعد</p></div>';
    return;
  }
  list.innerHTML = places.map(place=>{
    const branchName = normalizeBranchDisplayName(place.branchName || getBranchLabel(place.branchKey));
    const lat = Number(place.location?.lat);
    const lng = Number(place.location?.lng);
    const coordinates = Number.isFinite(lat) && Number.isFinite(lng) ? `${lat.toFixed(7)}, ${lng.toFixed(7)}` : '';
    const meta = [
      `الفرع: ${escapeHtml(branchName || 'غير محدد')}`,
      coordinates ? `الإحداثيات: ${escapeHtml(coordinates)}` : 'الإحداثيات: غير محددة',
      `الحدود: ${escapeHtml(String(place.radiusMeters || 0))} متر`,
      place.createdAt ? `تاريخ الإنشاء: ${escapeHtml(formatArabicDateTime(place.createdAt))}` : '',
      `رمز الباركود: ${escapeHtml(place.barcodeToken || '')}`
    ].filter(Boolean).join('<br>');
    return `
      <div class="fingerprint-place-item barcode-place-item">
        <div class="barcode-preview">
          <canvas id="barcodeCanvas-${place.id}" width="156" height="156"></canvas>
          <div class="setting-sub"></div>
        </div>
        <div>
          <div class="setting-label">${escapeHtml(place.title || `باركود ${branchName}`)}</div>
          <div class="fingerprint-place-meta">${meta}</div>
        </div>
        <div class="barcode-place-actions">
          <button class="btn btn-secondary btn-sm" onclick="editFingerprintBarcodePlace('${place.id}')">تعديل</button>
          <button class="btn btn-secondary btn-sm" onclick="downloadFingerprintBarcode('${place.id}')">تحميل</button>
          <button class="btn btn-danger btn-sm" onclick="deleteFingerprintPlace('${place.id}')">حذف</button>
        </div>
      </div>
    `;
  }).join('');
  setTimeout(renderFingerprintBarcodeCanvases,0);
}

async function saveFingerprintPlace(){
  if(!pendingFingerprintPlaceDevice?.location){
    showToast('افتح الرابط من الهاتف أولاً','error');
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
        quality:location.quality || '',
        qualityMessage:location.qualityMessage || '',
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
    if(editingFingerprintBarcodeId === id) cancelFingerprintBarcodeEdit();
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

function markRegistrationLocationQuality(location){
  if(!location) return null;
  const accuracy = getRegistrationAccuracyMeters(location.accuracy);
  return {
    ...location,
    quality:accuracy && accuracy <= PLACE_GPS_TARGET_ACCURACY ? 'high' : 'weak',
    qualityMessage:accuracy && accuracy <= PLACE_GPS_TARGET_ACCURACY
      ? `دقة جيدة داخل ${PLACE_GPS_TARGET_ACCURACY} متر`
      : `دقة ضعيفة: ${Math.round(accuracy || 0)} متر`
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
      finish(resolve, markRegistrationLocationQuality(combined));
    },PLACE_GPS_SAMPLE_TIMEOUT_MS);
    watchId = navigator.geolocation.watchPosition(pos=>{
      samples.push(normalizeRegistrationGeoPosition(pos));
      const combined = combineRegistrationLocationSamples(samples);
      if(combined && samples.length >= PLACE_GPS_MIN_SAMPLES && combined.accuracy <= PLACE_GPS_TARGET_ACCURACY){
        finish(resolve, markRegistrationLocationQuality(combined));
      }
    },()=>{
      if(samples.length){
        const combined = combineRegistrationLocationSamples(samples);
        if(combined) finish(resolve, markRegistrationLocationQuality(combined));
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
        <div class="setting-sub" id="placeClientText">اسمح للمتصفح بالوصول إلى موقع هذا الهاتف.</div>
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
    document.getElementById('placeClientText').textContent = 'جاري إرسال موقع الهاتف إلى النظام...';
    await window.hrmsFirebase.publishFingerprintPlaceSession(sessionId,{
      status:'connected',
      location,
      device:{...getRegistrationDeviceInfo(), kind:'phone'},
      pageUrl:window.location.href
    });
    document.getElementById('placeClientTitle').textContent = 'تم إرسال موقع الهاتف';
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
  persistBrowserSettings(appData.settings);
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
    if(hasReadableHrDataShape(data)){
      if(hasMeaningfulHrData(data)) await hydrateImportedEmployeeFiles(rootHandle,data);
      return {data, source:fullDb.path, found:true, readable:true, empty:!hasMeaningfulHrData(data)};
    }
    if(hasMeaningfulHrData(data)){
      await hydrateImportedEmployeeFiles(rootHandle,data);
      return {data, source:fullDb.path, found:true, readable:true, empty:false};
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
  const hasStructuredFiles = Boolean(
    employees ||
    schedules ||
    employers ||
    reminders ||
    settings ||
    fingerprintPunches ||
    fingerprintCodes ||
    individualEmployees.items.length ||
    individualSchedules.items.length
  );
  if(hasMeaningfulHrData(reconstructed)){
    await hydrateImportedEmployeeFiles(rootHandle,reconstructed);
    const sources = [employees?.path, schedules?.path, employers?.path, individualEmployees.source, individualSchedules.source].filter(Boolean).join(' + ');
    return {data:reconstructed, source:sources || 'ملفات قاعدة البيانات المنفصلة', found:true, readable:true, empty:false};
  }
  if(hasStructuredFiles && hasReadableHrDataShape(reconstructed)){
    const sources = [employees?.path, schedules?.path, employers?.path, reminders?.path, settings?.path, fingerprintPunches?.path, fingerprintCodes?.path, individualEmployees.source, individualSchedules.source].filter(Boolean).join(' + ');
    return {data:reconstructed, source:sources || 'ملفات قاعدة البيانات الفارغة', found:true, readable:true, empty:true};
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
      `&nbsp;&nbsp;${i===days.length-1?'&nbsp;':'│'}&nbsp;&nbsp;└─ ملف PDF موحد: عربي + English`).join('<br>');
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
      ? 'إعدادات محلية فقط + قراءة البيانات من مجلد الجهاز'
      : 'إعدادات محلية فقط + اختر مجلد قاعدة البيانات للقراءة والحفظ';
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
    persistBrowserSettings(appData.settings);
    renderFolderSettings();
    const hasPermission = await ensureDirectoryPermission(handle,false);
    if(hasPermission){
      if(!hasMeaningfulHrData()){
        const imported = await tryImportDataFromFolder({silent:true, overwrite:false});
        if(imported.imported){
          setFolderStatus(imported.empty
            ? 'تم تحميل قاعدة بيانات فارغة من المجلد. جاهزة للبدء بالإضافة والمزامنة.'
            : `تم تحميل بيانات المجلد تلقائياً: ${appData.employees.length} موظف، ${Object.keys(appData.schedules || {}).length} جدول.`, 'success');
          return;
        }
        if(imported.found && !imported.readable){
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

function pageUsesFolderData(page){
  return [
    'employees',
    'addEmployee',
    'schedule',
    'fingerprint',
    'fingerprintCodes',
    'fingerprintPlaces',
    'reminders',
    'notifications',
    'bookGeneral',
    'bookDeduct',
    'bookWarn',
    'bookNotice',
    'decisions',
    'employers',
    'addEmployer',
    'profile'
  ].includes(page);
}

async function ensureFolderDataForPage(page){
  if(!pageUsesFolderData(page) || hasMeaningfulHrData() || !selectedSaveDirectoryHandle || folderAutoImportRunning) return;
  folderAutoImportRunning = true;
  try{
    const imported = await tryImportDataFromFolder({silent:true, overwrite:true});
    if(imported.imported){
      setFolderStatus(imported.empty
        ? 'تم تحميل قاعدة بيانات فارغة من المجلد. جاهزة للإضافة والحفظ.'
        : `تم قراءة البيانات من المجلد: ${appData.employees.length} موظف، ${Object.keys(appData.schedules || {}).length} جدول.`, 'success');
    }
  } finally {
    folderAutoImportRunning = false;
  }
}

const scheduleBranchNames = {
  surra:'فرع حولي',
  abulhasania:'فرع أبو الحصانية',
  yarmouk:'فرع اليرموك'
};

const scheduleBranchOptions = [
  {key:'surra', label:'حولي', aliases:['حولي','hawally','hawalli','السرة','surra']},
  {key:'abulhasania', label:'أبو الحصانية', aliases:['أبو الحصانية','ابو الحصانية','abulhasania','hasania']},
  {key:'yarmouk', label:'اليرموك', aliases:['اليرموك','yarmouk']}
];

const scheduleBranchNamesEn = {
  surra:'Hawally Branch',
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
  'الأرشيف':'Archive',
  'تصميم':'Design',
  'مصمم':'Designer',
  'مصممة':'Designer',
  'عامل تنظيف':'Cleaning worker',
  'عامل نظافة':'Cleaner',
  'عامل تنظيف/أدوات مطبخ':'Cleaning worker / kitchen tools',
  'عامل تنظيف/ادوات مطبخ':'Cleaning worker / kitchen tools',
  'أدوات مطبخ':'Kitchen tools',
  'ادوات مطبخ':'Kitchen tools',
  'صانع معجنات وفطائر':'Pastry and pies maker',
  'صانع معجنات':'Pastry maker',
  'صانع فطائر':'Pie maker',
  'سائق سيارة خصوصي':'Private driver',
  'بادل طعام':'Food server',
  'طباخ':'Cook',
  'مساعد طباخ':'Assistant cook',
  'عامل مطبخ':'Kitchen worker',
  'مدير مبيعات':'Sales manager',
  'مندوب مبيعات':'Sales representative',
  'محاسب':'Accountant',
  'مدخل بيانات':'Data entry clerk',
  'مراقب جودة':'Quality controller',
  'مطعم التين الطبيعي':'Figs and Olives Restaurant',
  'فرع حولي':'Hawally Branch',
  'حولي':'Hawally',
  'فرع أبو الحصانية':'Abu Al Hasaniya Branch',
  'فرع ابو الحصانية':'Abu Al Hasaniya Branch',
  'أبو الحصانية':'Abu Al Hasaniya',
  'ابو الحصانية':'Abu Al Hasaniya',
  'فرع اليرموك':'Yarmouk Branch',
  'اليرموك':'Yarmouk',
  'فرع السرة':'Hawally Branch',
  'السرة':'Hawally'
};

const taskWordTranslations = {
  'استقبال':'reception','العملاء':'customers','عملاء':'customers','خدمة':'service','الرد':'answering','متابعة':'follow-up','تجهيز':'preparation',
  'الطلبات':'orders','طلبات':'orders','ادخال':'entry','إدخال':'entry','بيانات':'data','البيانات':'data','محاسبة':'accounting','المحاسبة':'accounting',
  'كاشير':'cashier','مبيعات':'sales','المبيعات':'sales','تنظيف':'cleaning','ترتيب':'arrangement','فتح':'opening','اغلاق':'closing','إغلاق':'closing',
  'فرع':'branch','الفرع':'branch','جرد':'inventory','الجرد':'inventory','مخزون':'stock','المخزون':'stock','ادارة':'management','إدارة':'management',
  'موظفين':'staff','الموظفين':'staff','موظف':'employee','استلام':'receiving','تسليم':'handover','توصيل':'delivery','مشتريات':'purchasing',
  'ارشيف':'archive','أرشيف':'archive','الأرشيف':'archive','مهمة':'task','مهام':'tasks','عمل':'work'
  ,'تصميم':'design','مصمم':'designer','مصممة':'designer','عامل':'worker','عاملة':'worker','نظافة':'cleaning','مطبخ':'kitchen','ادوات':'tools','أدوات':'tools'
  ,'طباخ':'cook','معجنات':'pastry','فطائر':'pies','صانع':'maker','سائق':'driver','سيارة':'car','خصوصي':'private','بادل':'server','طعام':'food'
  ,'محاسب':'accountant','مدير':'manager','مندوب':'representative','مراقب':'controller','جودة':'quality','مطعم':'restaurant','التين':'figs','الطبيعي':'olives'
  ,'حولي':'Hawally','السرة':'Hawally','اليرموك':'Yarmouk','الحصانية':'Hasaniya','أبو':'Abu','ابو':'Abu'
};

const schedulePhraseTranslations = {
  ...taskPhraseTranslations,
  'ملاحظة':'Note',
  'ملاحظات':'Notes',
  'لا يوجد موظفون في هذا الفرع':'No employees in this branch',
  'بدون مهام محددة':'No tasks specified',
  'تصميم':'Design',
  'مصمم':'Designer',
  'ادارة حسابات التواصل':'Social media account management',
  'إدارة حسابات التواصل':'Social media account management',
  'التصوير':'Photography',
  'تصوير':'Photography',
  'مونتاج':'Video editing',
  'تسويق':'Marketing',
  'التسويق':'Marketing',
  'خدمة زبائن':'Customer service',
  'خدمة العملاء':'Customer service',
  'عامل نظافة':'Cleaner',
  'عامل تنظيف':'Cleaner',
  'عامل تنظيف/أدوات مطبخ':'Cleaning worker / kitchen tools',
  'عامل تنظيف/ادوات مطبخ':'Cleaning worker / kitchen tools',
  'أدوات مطبخ':'Kitchen tools',
  'ادوات مطبخ':'Kitchen tools',
  'صانع معجنات وفطائر':'Pastry and pies maker',
  'صانع معجنات':'Pastry maker',
  'صانع فطائر':'Pie maker',
  'سائق سيارة خصوصي':'Private driver',
  'بادل طعام':'Food server',
  'عامل مطبخ':'Kitchen worker',
  'طباخ':'Cook',
  'مساعد طباخ':'Assistant cook',
  'مدير مبيعات':'Sales manager',
  'مندوب مبيعات':'Sales representative',
  'محاسب':'Accountant',
  'مطعم التين الطبيعي':'Figs and Olives Restaurant',
  'فرع حولي':'Hawally Branch',
  'حولي':'Hawally',
  'فرع أبو الحصانية':'Abu Al Hasaniya Branch',
  'فرع ابو الحصانية':'Abu Al Hasaniya Branch',
  'أبو الحصانية':'Abu Al Hasaniya',
  'ابو الحصانية':'Abu Al Hasaniya',
  'فرع اليرموك':'Yarmouk Branch',
  'اليرموك':'Yarmouk',
  'فرع السرة':'Hawally Branch',
  'السرة':'Hawally',
  'تحضير':'Preparation',
  'تحضير الطلبات':'Order preparation',
  'مراقبة الجودة':'Quality control',
  'مدير فرع':'Branch manager',
  'مساعد مدير':'Assistant manager',
  'بصمة دخول':'Check-in punch',
  'بصمة خروج':'Check-out punch',
  'تأخير':'Late arrival',
  'مغادرة مبكرة':'Early departure',
  'إذن خروج':'Exit permission',
  'اذن خروج':'Exit permission'
};

const scheduleWordTranslations = {
  ...taskWordTranslations,
  'ملاحظة':'note','ملاحظات':'notes','بدون':'without','محدد':'specified','محددة':'specified',
  'تصميم':'design','مصمم':'designer','مصممة':'designer','تصوير':'photography','التصوير':'photography','مونتاج':'editing',
  'تسويق':'marketing','التسويق':'marketing','اداري':'administrative','إداري':'administrative','ادارية':'administrative','إدارية':'administrative',
  'مشرف':'supervisor','مشرفة':'supervisor','مدير':'manager','مديرة':'manager','مساعد':'assistant','مساعدة':'assistant',
  'عامل':'worker','عاملة':'worker','تنظيف':'cleaning','نظافة':'cleaning','مطبخ':'kitchen','ادوات':'tools','أدوات':'tools',
  'طباخ':'cook','معجنات':'pastry','فطائر':'pies','صانع':'maker','سائق':'driver','سيارة':'car','خصوصي':'private','بادل':'server','طعام':'food',
  'محاسب':'accountant','مندوب':'representative','مطعم':'restaurant','التين':'figs','الطبيعي':'olives','حولي':'Hawally','السرة':'Hawally',
  'اليرموك':'Yarmouk','الحصانية':'Hasaniya','أبو':'Abu','ابو':'Abu',
  'جودة':'quality','الجودة':'quality','مراقبة':'monitoring','حسابات':'accounts','التواصل':'communication','اجتماعي':'social','اجتماعيه':'social',
  'دقائق':'minutes','دقيقة':'minute','ساعة':'hour','ساعات':'hours','دخول':'check-in','خروج':'check-out','تأخير':'late','مغادرة':'leaving','مبكرة':'early',
  'اذن':'permission','إذن':'permission'
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

function getEmployeeFirstName(name){
  return String(name || '').trim().split(/\s+/).filter(Boolean)[0] || '';
}

function getEmployeeScheduleName(value){
  const name = typeof value === 'object' ? (value?.name || '') : String(value || '');
  if(name.includes('احمد رزق') || name.includes('شوشه') || name.includes('شوشة')) return 'احمد شوشة';
  if(name.includes('احمد محمد')) return 'احمد محمد';
  return getEmployeeFirstName(name) || name || 'موظف';
}

function getEmployeeDisplayPhoto(emp){
  return getUsableImageSource(emp?.photoData, emp?.documents?.photo?.fileData);
}

function employeeNameForPdf(name, lang='ar'){
  const firstName = getEmployeeScheduleName(name);
  return lang === 'en' ? transliterateArabicToEnglish(firstName) : firstName;
}

function translateTaskToEnglish(task){
  return translateScheduleTextToEnglish(task);
}

function normalizeTranslationKey(value){
  return stripArabicDiacritics(value)
    .replace(/[إأآ]/g,'ا')
    .replace(/ى/g,'ي')
    .replace(/[ة]/g,'ه')
    .replace(/[^\u0600-\u06FFA-Za-z0-9]+/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

function findTranslation(value, dictionary){
  const direct = dictionary[value];
  if(direct) return direct;
  const normalized = normalizeTranslationKey(value);
  const key = Object.keys(dictionary).find(item=>normalizeTranslationKey(item) === normalized);
  return key ? dictionary[key] : '';
}

function replaceRemainingArabicWithTranslatedWords(text){
  return String(text || '').split(/([,+\/-])/).map(segment=>{
    if(!/[\u0600-\u06FF]/.test(segment)) return segment;
    const words = segment.split(/\s+/).map(word=>{
      const clean = word.replace(/[^\u0600-\u06FF]/g,'');
      if(!clean) return '';
      return findTranslation(clean,scheduleWordTranslations);
    }).filter(Boolean);
    return words.length ? titleCase(words.join(' ')) : 'Work task';
  }).join('').replace(/\s*([,+\/-])\s*/g,' $1 ').replace(/\s+/g,' ').trim();
}

function translateScheduleTextToEnglish(text){
  const normalized = stripArabicDiacritics(text)
    .replace(/[،؛]/g, ',')
    .replace(/\s+/g,' ')
    .trim();
  if(!normalized) return '';
  if(!/[\u0600-\u06FF]/.test(normalized)) return titleCase(normalized);
  const exact = findTranslation(normalized,schedulePhraseTranslations);
  if(exact) return exact;
  let replaced = normalized;
  Object.keys(schedulePhraseTranslations)
    .sort((a,b)=>b.length-a.length)
    .forEach(phrase=>{
      if(replaced.includes(phrase)) replaced = replaced.replaceAll(phrase, schedulePhraseTranslations[phrase]);
    });
  if(!/[\u0600-\u06FF]/.test(replaced)) return replaced;
  const wordTranslated = replaced.split(/(\s+|,|\+|\/|-)/).map(part=>{
    if(!part.trim() || /^[,\+\/-]$/.test(part)) return part;
    const clean = part.replace(/[^\u0600-\u06FFA-Za-z0-9]/g,'');
    const translatedWord = findTranslation(clean,scheduleWordTranslations);
    if(translatedWord) return part.replace(clean,translatedWord);
    return part;
  }).join('').replace(/\s+/g,' ').trim();
  return replaceRemainingArabicWithTranslatedWords(wordTranslated);
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

function getScheduleEmployeesForNotes(schedule=scheduleState){
  const fromSchedule = Object.values(schedule?.zones || {})
    .flat()
    .filter(Boolean)
    .map(item=>({
      id:item.empId || item.empName,
      name:item.empName || 'موظف',
      color:getScheduleItemColor(item)
    }));
  const map = new Map();
  fromSchedule.forEach(emp=>{
    if(emp.id && !map.has(emp.id)) map.set(emp.id,emp);
  });
  appData.employees.forEach(emp=>{
    if(!map.has(emp.id)){
      map.set(emp.id,{id:emp.id,name:emp.name || 'موظف',color:getScheduleEmployeeColor(emp.id)});
    }
  });
  return [...map.values()];
}

function normalizeScheduleNotes(notes=[], schedule=scheduleState){
  if(!Array.isArray(notes)) return [];
  const employees = getScheduleEmployeesForNotes(schedule);
  return notes
    .map(note=>{
      const text = String(note?.text || '').trim();
      if(!text) return null;
      const empId = note.empId || note.employeeId || '';
      const linkedToEmployee = note.linkedToEmployee !== false && Boolean(empId || note.empName);
      const employee = employees.find(emp=>emp.id === empId) || employees.find(emp=>emp.name === note.empName) || null;
      const color = linkedToEmployee ? (note.color || employee?.color || getScheduleEmployeeColor(empId || note.empName || text)) : '#64748b';
      return {
        id:note.id || generateId(),
        empId:linkedToEmployee ? (empId || employee?.id || '') : '',
        empName:linkedToEmployee ? (note.empName || employee?.name || 'موظف') : '',
        linkedToEmployee,
        text,
        color,
        createdAt:note.createdAt || new Date().toISOString()
      };
    })
    .filter(Boolean);
}

function scheduleNoteTextForPdf(note, lang='ar'){
  return lang === 'en' ? translateScheduleTextToEnglish(note?.text || '') : (note?.text || '');
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
    const combinedName = record.fileNames.pdf || record.fileName || record.fileNames.ar || getSchedulePdfFileName(dayKey,new Date(record.createdAt || approvalDate),'ar');
    record.fileNames.pdf = combinedName;
    record.fileNames.ar = combinedName;
    record.fileNames.en = combinedName;
    record.fileName = combinedName;
    record.englishFileName = combinedName;
    const idx = history.files.findIndex(file=>file.fileName === current.fileName);
    if(idx >= 0) history.files[idx] = record;
  } else {
    const fileName = getSchedulePdfFileName(dayKey,approvalDate,'ar');
    record = {
      fileName,
      englishFileName:fileName,
      fileNames:{
        pdf:fileName,
        ar:fileName,
        en:fileName
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
  const notes = normalizeScheduleNotes(schedule?.notes || [], schedule);
  const maxCardsPerRow = 3;
  const cardH = 174;
  let height = 230;
  zones.forEach(zone=>{
    const count = Math.max(1,(schedule.zones?.[zone] || []).length);
    height += 92 + Math.ceil(count/maxCardsPerRow) * (cardH + 18) + 30;
  });
  if(notes.length) height += 100 + (notes.length * 88);
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
        ctx.font = '900 30px Arial, sans-serif';
        ctx.textAlign = isEn ? 'left' : 'right';
        drawTextLines(ctx,employeeNameForPdf(item.empName,lang),isEn ? cardX+18 : cardX+cardW-18,cardY+16,cardW-36,36,2);
        ctx.font = '900 24px Arial, sans-serif';
        ctx.fillText(formatTimeRangeLocalized(item.from,item.to,lang),isEn ? cardX+18 : cardX+cardW-18,cardY+88);
        ctx.font = '800 23px Arial, sans-serif';
        drawTextLines(ctx,tasksForPdf(item.tasks,lang),isEn ? cardX+18 : cardX+cardW-18,cardY+124,cardW-36,29,2);
      });
    }
    y += sectionH + 28;
  });

  if(notes.length){
    const sectionH = 72 + (notes.length * 84) + 22;
    drawRoundRect(ctx,64,y,width-128,sectionH,18);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#dbe4ef';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 32px Arial, sans-serif';
    ctx.textAlign = isEn ? 'left' : 'right';
    ctx.fillText(isEn ? 'Notes' : 'ملاحظات',isEn ? 92 : width-92,y+22);

    let noteY = y + 72;
    notes.forEach(note=>{
      const color = note.color || getScheduleEmployeeColor(note.empId || note.empName);
      const hasEmployeeLink = note.linkedToEmployee !== false && Boolean(note.empName);
      drawRoundRect(ctx,92,noteY,width-184,66,12);
      ctx.fillStyle = hexToRgba(color,.10);
      ctx.fill();
      ctx.strokeStyle = hexToRgba(color,.35);
      ctx.lineWidth = 2;
      ctx.stroke();
      drawRoundRect(ctx,isEn ? 108 : width-118,noteY+10,10,46,5);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.textAlign = isEn ? 'left' : 'right';
      if(hasEmployeeLink){
        ctx.fillStyle = color;
        ctx.font = '900 20px Arial, sans-serif';
        ctx.fillText(employeeNameForPdf(note.empName,lang),isEn ? 132 : width-132,noteY+10);
      }
      ctx.fillStyle = '#334155';
      ctx.font = '700 18px Arial, sans-serif';
      drawTextLines(ctx,scheduleNoteTextForPdf(note,lang),isEn ? 132 : width-132,hasEmployeeLink ? noteY+36 : noteY+20,width-288,24,2);
      noteY += 84;
    });
  }

  return {
    dataUrl:canvas.toDataURL('image/jpeg',0.92),
    width,
    height
  };
}

function getPdfImagePlacement(imageWidth, imageHeight, pageW=842, pageH=595){
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
  return {drawW,drawH,x,y};
}

function buildPdfFromJpegPages(pages){
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
  const pageItems = pages.map((page,index)=>{
    const pageObj = 3 + (index * 3);
    const imageObj = pageObj + 1;
    const contentObj = pageObj + 2;
    const {drawW,drawH,x,y} = getPdfImagePlacement(page.width,page.height,pageW,pageH);
    const imageName = `Im${index}`;
    const content = `q\n${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/${imageName} Do\nQ`;
    return {...page,pageObj,imageObj,contentObj,imageName,content};
  });
  const totalObjects = 2 + (pageItems.length * 3);
  pushString('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  beginObj(1); pushString('<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  beginObj(2); pushString(`<< /Type /Pages /Kids [${pageItems.map(page=>`${page.pageObj} 0 R`).join(' ')}] /Count ${pageItems.length} >>\nendobj\n`);
  pageItems.forEach(page=>{
    beginObj(page.pageObj);
    pushString(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /${page.imageName} ${page.imageObj} 0 R >> >> /Contents ${page.contentObj} 0 R >>\nendobj\n`);
    beginObj(page.imageObj);
    pushString(`<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.jpegBytes.length} >>\nstream\n`);
    pushBytes(page.jpegBytes);
    pushString('\nendstream\nendobj\n');
    beginObj(page.contentObj);
    pushString(`<< /Length ${encoder.encode(page.content).length} >>\nstream\n${page.content}\nendstream\nendobj\n`);
  });
  const xrefOffset = length;
  pushString(`xref\n0 ${totalObjects + 1}\n0000000000 65535 f \n`);
  for(let i=1;i<=totalObjects;i++) pushString(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);
  pushString(`trailer\n<< /Size ${totalObjects + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  const out = new Uint8Array(length);
  let offset = 0;
  chunks.forEach(chunk=>{
    out.set(chunk,offset);
    offset += chunk.length;
  });
  return new Blob([out], {type:'application/pdf'});
}

function buildPdfFromJpeg(jpegBytes, imageWidth, imageHeight){
  return buildPdfFromJpegPages([{jpegBytes,width:imageWidth,height:imageHeight}]);
}

async function createSchedulePdfBlob(dayKey, schedule, title, lang='ar', approvalDate=new Date()){
  const rendered = drawScheduleCanvasToJpegDataUrl(dayKey,schedule,title,lang,approvalDate);
  const jpegBytes = dataUrlToBytes(rendered.dataUrl);
  return buildPdfFromJpeg(jpegBytes,rendered.width,rendered.height);
}

async function createScheduleCombinedPdfBlob(dayKey, schedule, approvalDate=new Date()){
  const titleDate = schedule?.scheduleDate ? parseDateInput(schedule.scheduleDate) : approvalDate;
  const pages = ['ar','en'].map(lang=>{
    const title = getScheduleTitle(dayKey,titleDate,lang);
    const rendered = drawScheduleCanvasToJpegDataUrl(dayKey,schedule,title,lang,approvalDate);
    return {
      jpegBytes:dataUrlToBytes(rendered.dataUrl),
      width:rendered.width,
      height:rendered.height
    };
  });
  return buildPdfFromJpegPages(pages);
}

async function writeSchedulePdf(rootHandle, dayKey, schedule, record, lang='ar'){
  const schedulesRoot = await getOrCreateDirectory(rootHandle,['جدول الدوامات']);
  const dayDir = await getOrCreateDirectory(schedulesRoot,[getSelectedDayName(dayKey)]);
  const approvalDate = new Date(record.updatedAt || record.createdAt || Date.now());
  const titleDate = schedule?.scheduleDate ? parseDateInput(schedule.scheduleDate) : approvalDate;
  const title = getScheduleTitle(dayKey,titleDate,lang);
  if(!record.fileNames) record.fileNames = {};
  const requestedName = record.fileNames[lang] || (lang === 'en' ? record.englishFileName : record.fileName) || getSchedulePdfFileName(dayKey,approvalDate,lang);
  const pdfBlob = await createSchedulePdfBlob(dayKey,schedule,title,lang,approvalDate);
  const safeName = await writeFile(dayDir,requestedName,pdfBlob);
  record.fileNames[lang] = safeName;
  if(lang === 'ar') record.fileName = safeName;
  if(lang === 'en') record.englishFileName = safeName;
  return safeName;
}

async function writeSchedulePdfPair(rootHandle, dayKey, schedule, record){
  const schedulesRoot = await getOrCreateDirectory(rootHandle,['جدول الدوامات']);
  const dayDir = await getOrCreateDirectory(schedulesRoot,[getSelectedDayName(dayKey)]);
  const approvalDate = new Date(record.updatedAt || record.createdAt || Date.now());
  if(!record.fileNames) record.fileNames = {};
  const requestedName = record.fileNames.pdf || record.fileName || getSchedulePdfFileName(dayKey,approvalDate,'ar');
  const pdfBlob = await createScheduleCombinedPdfBlob(dayKey,schedule,approvalDate);
  const safeName = await writeFile(dayDir,requestedName,pdfBlob);
  record.fileName = safeName;
  record.englishFileName = safeName;
  record.fileNames = {
    ...(record.fileNames || {}),
    pdf:safeName,
    ar:safeName,
    en:safeName
  };
  return {pdf:safeName, ar:safeName, en:safeName};
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
    await getOrCreateDirectory(visibleSchedulesRoot,[dayName]);
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
    pdfCount += 1;
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
    if(loaded.data && hasReadableHrDataShape(loaded.data) && !hasMeaningfulHrData(loaded.data)){
      if(!overwrite && hasMeaningfulHrData(appData)) return {imported:false, found:true, readable:true, empty:true, reason:'local-has-data'};
      applyImportedHrData(loaded.data,'folder');
      appData.settings.saveFolderName = selectedSaveDirectoryHandle.name;
      appData.settings.importedAt = new Date().toISOString();
      persistBrowserSettings(appData.settings);
      renderFolderSettings();
      setFolderStatus(`تم تجهيز قاعدة بيانات فارغة من ${loaded.source || 'المجلد المختار'}. يمكنك الآن البدء بالإضافة والمزامنة.`, 'success');
      if(!silent) showToast('تم تجهيز قاعدة بيانات جديدة');
      return {imported:true, found:true, readable:true, empty:true, reason:'empty-db', source:loaded.source};
    }
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
      return {imported:false, found:loaded.found, readable:false, reason:loaded.found ? 'unreadable' : 'empty'};
    }
    if(!overwrite && hasMeaningfulHrData(appData)) return {imported:false, found:true, reason:'local-has-data'};
    applyImportedHrData(loaded.data,'folder');
    appData.settings.saveFolderName = selectedSaveDirectoryHandle.name;
    appData.settings.importedAt = new Date().toISOString();
    persistBrowserSettings(appData.settings);
    renderFolderSettings();
    setFolderStatus(`تم استيراد البيانات من ${loaded.source}: ${appData.employees.length} موظف، ${Object.keys(appData.schedules || {}).length} جدول.`, 'success');
    if(!silent) showToast('تم استيراد البيانات من المجلد');
    return {imported:true, found:true, readable:true, empty:false, reason:'imported', source:loaded.source};
  } catch(err){
    if(err?.name === 'NotFoundError'){
      if(!silent) setFolderStatus('المجلد لا يحتوي على قاعدة بيانات سابقة. سيتم البدء كقاعدة جديدة.', 'success');
      return {imported:false, found:false, readable:false, reason:'empty'};
    }
    console.error(err);
    if(!silent){
      setFolderStatus('تعذر استيراد البيانات. تأكد أن المجلد يحتوي على قاعدة البيانات/قاعدة البيانات الكاملة.json', 'error');
      showToast('فشل استيراد البيانات','error');
    }
    return {imported:false, found:true, readable:false, reason:'error', error:err};
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
      if(imported.empty){
        setFolderStatus('قاعدة البيانات في المجلد فارغة وجاهزة. جاري تثبيت ملفات البداية...', 'warn');
      } else {
        setFolderStatus(`تم تحميل بيانات المجلد تلقائياً: ${appData.employees.length} موظف، ${Object.keys(appData.schedules || {}).length} جدول.`, 'success');
        showToast('تم تحميل البيانات من المجلد');
        return;
      }
    }
    if(imported.found && !imported.readable){
      if(canStartFreshInSelectedFolder()){
        resetToFreshFolderDatabase(selectedSaveDirectoryHandle.name);
        setFolderStatus('تم اعتبار هذا المجلد بداية جديدة. جاري إنشاء ملفات قاعدة البيانات...', 'warn');
      } else {
        setFolderStatus('المجلد يحتوي على ملفات قاعدة بيانات، لكن لم أستطع قراءة بيانات منها. تم إيقاف المزامنة حتى لا تُكتب أصفار فوق بياناتك.', 'error');
        showToast('تم إيقاف المزامنة لحماية البيانات','error');
        return;
      }
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
    persistBrowserSettings(appData.settings);
    const result = await writeHrmsFilesToDirectory(selectedSaveDirectoryHandle,syncedAt);
    persistBrowserSettings(appData.settings);
    renderFolderSettings();
    const localSyncMessage = `تمت المزامنة: ${result.employees} موظف، ${result.documents} مستند، ${result.schedules} جدول، ${result.pdfs || 0} PDF.`;
    if(userTriggered){
      try{
        await publishHrmsCoreDataToFirebase();
        setFolderStatus(`${localSyncMessage} وتم نشر رموز تطبيق البصمة.`, 'success');
        showToast('تم حفظ الملفات ونشر رموز البصمة');
      } catch(firebaseErr){
        console.error(firebaseErr);
        setFolderStatus(`${localSyncMessage} لكن تعذر نشر رموز تطبيق البصمة.`, 'warn');
        showToast('تم حفظ الملفات، لكن تعذر نشر رموز البصمة','error');
      }
    } else {
      setFolderStatus(localSyncMessage, 'success');
    }
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
    try{ localStorage.setItem('hrmsLoggedIn','true'); }catch(err){}
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
  try{ localStorage.removeItem('hrmsLoggedIn'); }catch(err){}
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
  ensureFolderDataForPage(page);

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

function normalizeDecimalString(value){
  const normalized = normalizeDigits(value)
    .replace(/[٫،,]/g,'.')
    .replace(/[^0-9.]/g,'');
  const [whole, ...fractions] = normalized.split('.');
  if(!fractions.length) return whole;
  return `${whole || '0'}.${fractions.join('')}`;
}

function toEnglishDecimal(el){
  el.value = normalizeDecimalString(el.value);
}

function parseHoursValue(value){
  const parsed = parseFloat(normalizeDecimalString(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatHoursValue(value){
  const rounded = Math.round((Number(value) || 0) * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(/\.?0+$/,'');
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

function openPhotoCropForEmployee(empId){
  const emp = appData.employees.find(e=>e.id === empId);
  if(!emp) return;
  const src = getEmployeeDisplayPhoto(emp);
  if(src){
    openPhotoCropModal(empId,src);
  } else {
    openDocModal('photo',empId);
  }
}

function getPhotoCropImageBounds(){
  const stage = document.getElementById('photoCropStage');
  const img = document.getElementById('photoCropImage');
  if(!stage || !img) return null;
  const stageRect = stage.getBoundingClientRect();
  const imgRect = img.getBoundingClientRect();
  return {
    left:imgRect.left - stageRect.left,
    top:imgRect.top - stageRect.top,
    width:imgRect.width,
    height:imgRect.height
  };
}

function renderPhotoCropBox(){
  const box = document.getElementById('photoCropBox');
  if(!box || !photoCropState?.box) return;
  const {x,y,w,h} = photoCropState.box;
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
  box.style.width = `${w}px`;
  box.style.height = `${h}px`;
}

function resetPhotoCropBox(){
  const bounds = getPhotoCropImageBounds();
  if(!bounds || !bounds.width || !bounds.height || !photoCropState) return;
  const size = Math.max(88, Math.min(bounds.width,bounds.height) * .72);
  photoCropState.box = {
    x:bounds.left + ((bounds.width - size) / 2),
    y:bounds.top + ((bounds.height - size) / 2),
    w:size,
    h:size
  };
  renderPhotoCropBox();
}

function openPhotoCropModal(empId, source, pendingDocument=null){
  const img = document.getElementById('photoCropImage');
  if(!img) return;
  photoCropState = {empId, source, pendingDocument, box:null, action:null, start:null};
  img.onload = ()=>requestAnimationFrame(resetPhotoCropBox);
  img.src = source;
  openModal('photoCropModal');
}

function closePhotoCropModal(){
  stopPhotoCropDrag();
  photoCropState = null;
  const img = document.getElementById('photoCropImage');
  if(img){
    img.onload = null;
    img.removeAttribute('src');
  }
  closeModal('photoCropModal');
}

function startPhotoCropDrag(event, action='move'){
  if(!photoCropState?.box) return;
  event.preventDefault();
  event.stopPropagation();
  photoCropState.action = action;
  photoCropState.start = {
    x:event.clientX,
    y:event.clientY,
    box:{...photoCropState.box}
  };
  document.addEventListener('pointermove', onPhotoCropPointerMove);
  document.addEventListener('pointerup', stopPhotoCropDrag, {once:true});
}

function clampNumber(value,min,max){
  return Math.max(min,Math.min(max,value));
}

function onPhotoCropPointerMove(event){
  if(!photoCropState?.start) return;
  const bounds = getPhotoCropImageBounds();
  if(!bounds) return;
  const minSize = Math.min(96,bounds.width,bounds.height);
  const start = photoCropState.start;
  const dx = event.clientX - start.x;
  const dy = event.clientY - start.y;
  let {x,y,w,h} = start.box;
  if(photoCropState.action === 'move'){
    x = clampNumber(x + dx,bounds.left,bounds.left + bounds.width - w);
    y = clampNumber(y + dy,bounds.top,bounds.top + bounds.height - h);
  } else {
    const right = x + w;
    const bottom = y + h;
    let size = w;
    if(photoCropState.action === 'se') size = w + Math.max(dx,dy);
    if(photoCropState.action === 'nw') size = w - Math.min(dx,dy);
    if(photoCropState.action === 'ne') size = w + Math.max(dx,-dy);
    if(photoCropState.action === 'sw') size = w + Math.max(-dx,dy);
    const maxByCorner = {
      se:Math.min(bounds.left + bounds.width - x,bounds.top + bounds.height - y),
      nw:Math.min(right - bounds.left,bottom - bounds.top),
      ne:Math.min(bounds.left + bounds.width - x,bottom - bounds.top),
      sw:Math.min(right - bounds.left,bounds.top + bounds.height - y)
    }[photoCropState.action] || Math.min(bounds.width,bounds.height);
    size = clampNumber(size,minSize,maxByCorner);
    if(photoCropState.action === 'nw'){
      x = right - size;
      y = bottom - size;
    } else if(photoCropState.action === 'ne'){
      y = bottom - size;
    } else if(photoCropState.action === 'sw'){
      x = right - size;
    }
    w = h = size;
  }
  photoCropState.box = {x,y,w,h};
  renderPhotoCropBox();
}

function stopPhotoCropDrag(){
  document.removeEventListener('pointermove', onPhotoCropPointerMove);
  if(photoCropState){
    photoCropState.action = null;
    photoCropState.start = null;
  }
}

function applyPhotoCrop(){
  if(!photoCropState?.box) return;
  const emp = appData.employees.find(e=>e.id === photoCropState.empId);
  const img = document.getElementById('photoCropImage');
  const bounds = getPhotoCropImageBounds();
  if(!emp || !img || !bounds) return;
  try{
    const scaleX = img.naturalWidth / bounds.width;
    const scaleY = img.naturalHeight / bounds.height;
    const {x,y,w,h} = photoCropState.box;
    const sx = clampNumber((x - bounds.left) * scaleX,0,img.naturalWidth);
    const sy = clampNumber((y - bounds.top) * scaleY,0,img.naturalHeight);
    const sw = clampNumber(w * scaleX,1,img.naturalWidth - sx);
    const sh = clampNumber(h * scaleY,1,img.naturalHeight - sy);
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,sx,sy,sw,sh,0,0,canvas.width,canvas.height);
    const cropped = canvas.toDataURL('image/jpeg',.9);
    if(!emp.documents) emp.documents = {};
    const existing = emp.documents.photo || {};
    const pending = photoCropState.pendingDocument || {};
    emp.photoData = cropped;
    emp.documents.photo = {
      ...existing,
      ...pending,
      fileData:cropped,
      fileName:pending.fileName || existing.fileName || 'الصورة الشخصية.jpg',
      uploadedAt:pending.uploadedAt || existing.uploadedAt || new Date().toISOString()
    };
    saveData();
    showToast('تم اعتماد إطار الصورة');
    closePhotoCropModal();
    openProfile(emp.id);
    if(selectedDay) renderStaffSidebar();
  } catch(err){
    console.error(err);
    showToast('تعذر قص الصورة. ارفع الصورة من الجهاز مباشرة ثم جرّب مرة أخرى.','error');
  }
}

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
  const totalH = parseHoursValue(document.getElementById('empHours').value);
  const bar = document.getElementById('empHoursBar');
  const usedH = empSegments.reduce((s,seg)=>s+seg.hours,0);
  const remaining = Math.max(0, totalH - usedH);
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
    rem.textContent = totalH>0 ? `${formatHoursValue(remaining)} ساعة متبقية` : 'أدخل عدد ساعات العمل أولاً';
    bar.appendChild(rem);
  }
}

function openAddSegmentModal(){
  const totalH = parseHoursValue(document.getElementById('empHours').value);
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
  const totalH = parseHoursValue(document.getElementById('empHours').value);
  const usedH = empSegments.reduce((s,seg)=>s+seg.hours,0);
  if(hours > (totalH - usedH) + 0.001){ showToast('تجاوز الحد الأقصى لساعات العمل','error'); return; }
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

function openQuickEmployeeFillModal(){
  quickEmployeeFillFile = null;
  document.getElementById('quickFillImage').value = '';
  document.getElementById('quickFillPreview').innerHTML = '';
  document.getElementById('quickFillPreview').classList.remove('show');
  document.getElementById('quickFillUploadPanel').style.display = 'block';
  document.getElementById('quickFillAnalysisPanel').classList.remove('show');
  setQuickFillProgress(0,'جاري تجهيز محرك القراءة');
  openModal('quickFillModal');
}

function closeQuickEmployeeFillModal(){
  quickEmployeeFillFile = null;
  closeModal('quickFillModal');
}

function handleQuickFillImageChange(input){
  const file = input.files?.[0];
  quickEmployeeFillFile = file || null;
  const preview = document.getElementById('quickFillPreview');
  preview.innerHTML = '';
  preview.classList.remove('show');
  if(!file) return;
  const url = URL.createObjectURL(file);
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'معاينة البطاقة';
  img.onload = ()=>URL.revokeObjectURL(url);
  preview.appendChild(img);
  preview.classList.add('show');
}

function setQuickFillProgress(percent=0, text=''){
  const bar = document.getElementById('quickFillProgressBar');
  const label = document.getElementById('quickFillAnalysisText');
  if(bar) bar.style.width = `${Math.max(0,Math.min(100,percent))}%`;
  if(label && text) label.textContent = text;
}

function loadTesseractOcr(){
  if(window.Tesseract?.recognize) return Promise.resolve(window.Tesseract);
  if(window.__hrmsTesseractPromise) return window.__hrmsTesseractPromise;
  window.__hrmsTesseractPromise = new Promise((resolve,reject)=>{
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
    script.onload = ()=>window.Tesseract?.recognize ? resolve(window.Tesseract) : reject(new Error('لم يتم تحميل محرك القراءة'));
    script.onerror = ()=>reject(new Error('تعذر تحميل محرك قراءة البطاقة'));
    document.head.appendChild(script);
  });
  return window.__hrmsTesseractPromise;
}

function normalizeOcrLine(line){
  return normalizeDigits(line)
    .replace(/[|]/g,' ')
    .replace(/[ـ]+/g,'')
    .replace(/\s+/g,' ')
    .trim();
}

function cleanExtractedField(value){
  return normalizeOcrLine(value)
    .replace(/^[\s:：\-–—]+|[\s:：\-–—]+$/g,'')
    .replace(/(?:Name|Civil ID No|Passport No|Nationality|Sex|Birth Date|Expiry Date|الاسم|الإسم|الرقم\s*المدني|رقم\s*الجواز|الجنسية|الجنس|تاريخ\s*الميلاد|تاريخ\s*الانتهاء|المهن[ةه])\s*[:：-]?\s*/gi,'')
    .replace(/\s*[:：-]\s*(?:Name|Civil ID No|Passport No|Nationality|Sex|Birth Date|Expiry Date|الاسم|الإسم|الرقم\s*المدني|رقم\s*الجواز|الجنسية|الجنس|تاريخ\s*الميلاد|تاريخ\s*الانتهاء|المهن[ةه])/gi,'')
    .trim();
}

function titleCaseLatinName(value){
  return String(value || '')
    .toLowerCase()
    .replace(/\b[a-z]/g, ch=>ch.toUpperCase())
    .replace(/\s+/g,' ')
    .trim();
}

function extractCivilIdFromText(text){
  const normalized = normalizeDigits(text);
  const labeled = normalized.match(/(?:Civil\s*ID\s*No|الرقم\s*المدني)\D*(\d{12})/i);
  if(labeled) return labeled[1];
  const any = normalized.match(/\b\d{12}\b/);
  return any ? any[0] : '';
}

function getArabicTextOnly(value){
  const stopWords = new Set([
    'دولة','الكويت','البطاقة','المدنية','المدني','الرقم','الاسم','الإسم','الجنسية','الجنس',
    'تاريخ','الميلاد','الانتهاء','الجواز','المهنة','المهنه','العنوان','الوحدة','قطعة','قطعه',
    'القطعة','القطعه','شارع','المبنى','الدور','المسلسل','فصيلة','الدم','ذكر','انثى','أنثى'
  ]);
  return normalizeOcrLine(value)
    .replace(/[A-Za-z0-9<>.,;:()[\]{}'"“”‘’؟!@#$%^&*_+=|\\/~-]/g,' ')
    .replace(/[^\u0600-\u06FF\s]/g,' ')
    .replace(/\s+/g,' ')
    .trim()
    .split(/\s+/)
    .filter(word=>word && !stopWords.has(word))
    .join(' ');
}

function hasCivilIdLabelNoise(value){
  return /(الرقم|المدني|الاسم|الإسم|الجنسية|الجنس|تاريخ|الجواز|المهن[ةه]|العنوان|الوحدة|قطعة|قطعه|شارع|المبنى|الدور|المسلسل|Civil|Name|Passport|Nationality|Birth|Expiry|Sex)/i.test(normalizeOcrLine(value));
}

function hasSuspiciousArabicNameNoise(value){
  return /(مشاركة|مساركة|مصراكة|افاكيو|أفاكيو|اكيوه|أكيوه|رمز|باركود|تحقق|شاشة|هويتي|بطاقة|مدنية|خدمة|مباشر|محادثة|جوجل|Gemini|Live)/i.test(normalizeOcrLine(value));
}

function isLikelyArabicPersonName(value, options={}){
  const text = getArabicTextOnly(value);
  if(!text) return false;
  const words = text.split(/\s+/).filter(Boolean);
  const minWords = Number(options.minWords || 2);
  if(words.length < minWords || words.length > 6) return false;
  if(hasSuspiciousArabicNameNoise(text)) return false;
  if(/(مطعم|شركة|مؤسسة|فرع|محل|مدرسة|مكتب|مركز|وزارة|عامل|سائق|مندوب|مطبخ|تنظيف|أدوات|ادوات|العنوان|عنوان|الوحدة|قطعة|قطعه|القطعة|القطعه|القطه|شارع|المبنى|الدور|السالمية|السالميه|سالمية|سالميه|الساحلية|الساحليه|الرقم|المدني|الاسم|الجنسية)/.test(text)) return false;
  return words.every(word=>word.length >= 2);
}

function cleanArabicNameCandidate(line){
  return getArabicTextOnly(line)
    .replace(/\s+/g,' ')
    .trim();
}

function getArabicNameCandidateFromLine(line){
  return cleanArabicNameCandidate(
    cleanExtractedField(line)
      .replace(/\b\d{12}\b/g,' ')
      .replace(/(?:Civil\s*ID\s*No|Name|Passport\s*No|Nationality|Sex|Birth\s*Date|Expiry\s*Date)\s*[:：-]?\s*/ig,' ')
      .replace(/(?:الرقم\s*المدني|المدني|الاسم|الإسم)\s*[:：-]?\s*/ig,' ')
  );
}

function pickBestArabicNameCandidate(lines, anchorIndex=-1){
  let best = '';
  let bestScore = 0;
  lines.forEach((line,index)=>{
    const candidate = getArabicNameCandidateFromLine(line);
    if(!isLikelyArabicPersonName(candidate,{minWords:3})) return;
    const wordsCount = candidate.split(/\s+/).filter(Boolean).length;
    let score = wordsCount >= 3 ? 6 : 4;
    const normalized = normalizeOcrLine(line);
    if(/الاسم|الإسم/i.test(normalized)) score += 4;
    if(/\b\d{12}\b|Civil\s*ID/i.test(normalized)) score += 2;
    if(anchorIndex >= 0){
      const distance = Math.abs(index - anchorIndex);
      score += Math.max(0, 4 - distance);
      if(index > anchorIndex) score += 1;
    }
    if(/[A-Za-z]{4,}/.test(normalized)) score -= 1;
    if(score > bestScore){
      best = candidate;
      bestScore = score;
    }
  });
  return best;
}

function extractArabicNameFromCivilIdLines(lines, allowLoose=false){
  const civilIndex = lines.findIndex(line=>/(Civil\s*ID|\b\d{12}\b)/i.test(line));
  if(civilIndex >= 0){
    const nearCivilStart = Math.max(0,civilIndex - 2);
    const nearCivilLines = lines.slice(nearCivilStart, Math.min(lines.length, civilIndex + 7));
    const nearCivilName = pickBestArabicNameCandidate(nearCivilLines, civilIndex - nearCivilStart);
    if(nearCivilName) return nearCivilName;

    const civilLineParts = normalizeOcrLine(lines[civilIndex]).split(/\d{12}/);
    const sameLineCandidate = getArabicNameCandidateFromLine(civilLineParts.slice(1).join(' '));
    if(sameLineCandidate && !hasCivilIdLabelNoise(sameLineCandidate) && isLikelyArabicPersonName(sameLineCandidate,{minWords:3})) return sameLineCandidate;

    for(let i=civilIndex + 1; i<Math.min(lines.length, civilIndex + 5); i++){
      if(/\bName\b|Passport|Nationality|Sex|Birth|Expiry/i.test(lines[i])) break;
      const candidate = getArabicNameCandidateFromLine(lines[i]);
      if(isLikelyArabicPersonName(candidate,{minWords:3})) return candidate;
      if(hasCivilIdLabelNoise(lines[i])) continue;
    }
  }

  const labelIndex = lines.findIndex(line=>/الاسم/.test(line));
  if(labelIndex >= 0){
    const scanIndexes = [labelIndex, labelIndex - 1, labelIndex + 1, labelIndex - 2, labelIndex + 2]
      .filter(i=>i >= 0 && i < lines.length);
    const labelWindowName = pickBestArabicNameCandidate(scanIndexes.map(i=>lines[i]), scanIndexes.indexOf(labelIndex));
    if(labelWindowName) return labelWindowName;
    for(const i of scanIndexes){
      const rawLine = i === labelIndex ? cleanExtractedField(lines[i]) : lines[i];
      if(i !== labelIndex && hasCivilIdLabelNoise(rawLine) && i !== labelIndex + 1 && i !== labelIndex - 1) continue;
      const candidate = getArabicNameCandidateFromLine(rawLine);
      if(isLikelyArabicPersonName(candidate,{minWords:3})) return candidate;
    }
  }

  if(!allowLoose) return '';
  for(const line of lines){
    const candidate = getArabicNameCandidateFromLine(line);
    if(isLikelyArabicPersonName(candidate,{minWords:3})) return candidate;
    if(hasCivilIdLabelNoise(line)) continue;
  }
  return '';
}

function extractNameFromCivilIdText(text, lines, options={}){
  const arabicName = extractArabicNameFromCivilIdLines(lines, Boolean(options.allowLooseArabicName));
  if(arabicName) return arabicName;

  const nameLineIndex = lines.findIndex(line=>/^Name\b/i.test(line));
  if(nameLineIndex >= 0){
    const sameLine = cleanExtractedField(lines[nameLineIndex].replace(/^Name\b/i,''));
    const candidate = sameLine || cleanExtractedField(lines[nameLineIndex + 1] || '');
    const latin = candidate.match(/[A-Z][A-Z\s.'-]{4,}/i);
    if(latin) return titleCaseLatinName(latin[0]);
  }
  const inlineName = text.match(/\bName\s+([A-Z][A-Z\s.'-]{4,})(?=\s+(?:Passport|Nationality|Sex|Birth|Expiry|Civil|$))/i);
  if(inlineName) return titleCaseLatinName(inlineName[1]);
  const mrzLine = lines.find(line=>/[A-Z<]{10,}/.test(line) && line.includes('<<') && !line.startsWith('ID'));
  if(mrzLine){
    const parts = mrzLine.replace(/[^A-Z<]/g,'').split('<<').filter(Boolean);
    if(parts.length >= 2){
      const surname = parts[0].replace(/</g,' ').trim();
      const given = parts[1].replace(/</g,' ').trim();
      return titleCaseLatinName(`${given} ${surname}`);
    }
  }
  return '';
}

function extractNationalityFromCivilIdText(text, lines){
  const codeMap = {
    KWT:'KW', KW:'KW', PHL:'PH', PH:'PH', IND:'IN', IN:'IN', BGD:'BD', BD:'BD',
    PAK:'PK', PK:'PK', LKA:'LK', LK:'LK', NPL:'NP', NP:'NP', EGY:'EG', EG:'EG',
    JOR:'JO', JO:'JO', SYR:'SY', LB:'LB', LBN:'LB', IRQ:'IQ', IRN:'IR', YEM:'YE',
    SAU:'SA', UAE:'AE', ARE:'AE', BHR:'BH', QAT:'QA', OMN:'OM', SDN:'SD',
    ETH:'ET', KEN:'KE', NGA:'NG', UGA:'UG', MAR:'MA', TUN:'TN', DZA:'DZ', TUR:'TR'
  };
  const wordMap = [
    [/فلب/i,'PH'], [/هند/i,'IN'], [/بنغل/i,'BD'], [/باك/i,'PK'], [/سريلان/i,'LK'],
    [/نيبال/i,'NP'], [/كويت/i,'KW'], [/مصر/i,'EG'], [/اردن|أردن/i,'JO'],
    [/سور/i,'SY'], [/لبنان/i,'LB'], [/عراق/i,'IQ'], [/ايران|إيران/i,'IR'],
    [/يمن/i,'YE'], [/سعود/i,'SA'], [/امارات|إمارات/i,'AE'], [/بحرين/i,'BH'],
    [/قطر/i,'QA'], [/عمان|عُمان/i,'OM']
  ];
  const nationalityLine = lines.find(line=>/(Nationality|الجنسية)/i.test(line)) || '';
  const codeCandidates = (nationalityLine.match(/\b[A-Z]{2,3}\b/g) || []).concat(text.match(/\b[A-Z]{3}\b/g) || []);
  for(const code of codeCandidates){
    if(codeMap[code] && countries.some(country=>country.code === codeMap[code])) return codeMap[code];
  }
  for(const [pattern,code] of wordMap){
    if(pattern.test(nationalityLine) || pattern.test(text)) return code;
  }
  return '';
}

function isLikelyEmployerLine(line){
  const text = cleanJobOrEmployerLine(line);
  if(!text || text.length < 3) return false;
  if(/(العنوان|الوحدة|قطعة|قطعه|القطعة|القطعه|شارع|المبنى|الدور|المسلسل|Serial|IDKWT|Civil|Passport|Nationality|Sex|Birth|Expiry|Name|الرقم|الجنسية|الجنس|تاريخ|الجواز|فصيلة|الدم|المهن[ةه]|عامل|مندوب|سائق|محاسب|مدير|مطبخ|تنظيف|طباخ|كاشير|بائع|مشرف)/i.test(text)) return false;
  if(/^\d+$/.test(text)) return false;
  return /[\u0600-\u06FF]/.test(text) && text.split(/\s+/).length >= 2;
}

function extractValueFromOcrLabelLine(line, labelPattern){
  const normalized = normalizeOcrLine(line);
  labelPattern.lastIndex = 0;
  if(!labelPattern.test(normalized)) return '';
  labelPattern.lastIndex = 0;
  return cleanExtractedField(normalized.replace(labelPattern,' '));
}

function findKnownEmployerInText(text){
  const normalizedText = normalizeCompareText(text);
  const employers = appData?.employers || [];
  const found = employers.find(employer=>{
    const name = normalizeCompareText(employer.name);
    return name && (normalizedText.includes(name) || name.includes(normalizedText));
  });
  return found?.name || '';
}

function cleanJobOrEmployerLine(line){
  return cleanExtractedField(line)
    .replace(/\b\d{6,}\b/g,' ')
    .replace(/(?:المهن[ةه]|Profession|Occupation)\s*[:：-]?\s*/ig,' ')
    .replace(/(?:الرقم\s*المدني|Civil\s*ID\s*No)\s*[:：-]?\s*/ig,' ')
    .replace(/^[^\u0600-\u06FFA-Za-z]+/,'')
    .replace(/\s+/g,' ')
    .trim();
}

function isLikelyJobPositionLine(line){
  const text = cleanJobOrEmployerLine(line);
  if(!text || text.length < 3) return false;
  if(/(العنوان|الوحدة|قطعة|شارع|المبنى|الدور|المسلسل|الرقم|الجنسية|الجنس|تاريخ|الجواز|مطعم|شركة|مؤسسة|مكتب|محل|فرع|مدرسة|مركز|وزارة)/.test(text)) return false;
  return /(عامل|مندوب|سائق|محاسب|مدير|مطبخ|تنظيف|طباخ|كاشير|بائع|مشرف|حارس|فني|مساعد|نادل|موظف|مبيعات|أدوات|ادوات)/.test(text);
}

function extractJobPhraseFromText(text){
  const normalized = cleanJobOrEmployerLine(text).replace(/[،,]+/g,' ');
  const match = normalized.match(/((?:عامل|مندوب|سائق|محاسب|مدير|مساعد|مشرف|حارس|فني|نادل|طباخ|كاشير|بائع|موظف)[\u0600-\u06FF\s/]+?)(?=\s*(?:مطعم|شركة|مؤسسة|مكتب|محل|فرع|مدرسة|مركز|وزارة|العنوان|الوحدة|قطعة|قطعه|القطعة|القطعه|شارع|المبنى|الدور|المسلسل|\d{2,}|$))/);
  return match ? cleanJobOrEmployerLine(match[1]) : '';
}

function cleanJobPositionValue(value){
  const phrase = extractJobPhraseFromText(value);
  if(phrase) return phrase;
  return cleanJobOrEmployerLine(value)
    .replace(/[©®™|]+/g,' ')
    .replace(/\b\d{1,3}\b.*$/,'')
    .replace(/[A-Za-z]+.*$/,'')
    .replace(/\s+/g,' ')
    .trim();
}

function extractEmployerPhraseFromText(text){
  const normalized = cleanJobOrEmployerLine(text).replace(/[،,]+/g,' ');
  const match = normalized.match(/((?:مطعم|شركة|مؤسسة|مكتب|محل|فرع|مدرسة|مركز|وزارة)[\u0600-\u06FF\s]+?)(?=\s*(?:العنوان|الوحدة|قطعة|قطعه|القطعة|القطعه|شارع|المبنى|الدور|المسلسل|Serial|الرقم|الجنسية|الجنس|تاريخ|$))/);
  const candidate = match ? cleanJobOrEmployerLine(match[1]) : '';
  return isLikelyEmployerLine(candidate) ? candidate : '';
}

function isUsableExtractedEmployerName(value){
  const text = cleanJobOrEmployerLine(value);
  if(!text || text.length < 3) return false;
  if(/(العنوان|الوحدة|قطعة|قطعه|القطعة|القطعه|شارع|المبنى|الدور|المسلسل|الرقم|الجنسية|الجنس|تاريخ|الجواز|فصيلة|الدم)/.test(text)) return false;
  return /(مطعم|شركة|مؤسسة|مكتب|محل|فرع|مدرسة|مركز|وزارة)/.test(text) || isLikelyEmployerLine(text);
}

function extractPositionAndEmployerFromCombinedText(text){
  const result = {position:'', employer:''};
  const normalized = String(text || '')
    .split(/\r?\n/)
    .map(normalizeOcrLine)
    .filter(Boolean)
    .join('\n');
  result.position = extractJobPhraseFromText(normalized);
  result.employer = extractEmployerPhraseFromText(normalized);
  const match = normalized.match(/(?:المهن[ةه]|Profession|Occupation)\s*[:：\-]?\s*([^\n\r]+)(?:\n+([^\n\r]+))?/i);
  if(!match) return result;
  let position = cleanExtractedField(match[1] || '');
  let employer = cleanExtractedField(match[2] || '');
  const inlineEmployer = position.match(/^(.*?)(\b(?:مطعم|شركة|مؤسسة|مكتب|محل|فرع|مدرسة|مركز|وزارة)\b.+)$/);
  if(inlineEmployer && inlineEmployer[1].trim().length >= 3){
    position = inlineEmployer[1].trim();
    employer = inlineEmployer[2].trim();
  }
  employer = employer.replace(/\s*(?:العنوان|الوحدة|قطعة|شارع|المبنى|الدور).*$/,'').trim();
  result.position = cleanJobPositionValue(position) || result.position;
  result.employer = extractEmployerPhraseFromText(employer) || employer || result.employer;
  return result;
}

function extractPositionAndEmployerFromCivilIdText(lines){
  const result = {position:'', employer:''};
  const jobIndex = lines.findIndex(line=>/(المهن[ةه]|Profession|Occupation)/i.test(line));
  const guessedJobIndex = jobIndex >= 0 ? jobIndex : lines.findIndex(isLikelyJobPositionLine);
  if(guessedJobIndex < 0) return result;
  const jobLine = lines[guessedJobIndex];
  let position = jobIndex >= 0 ? extractValueFromOcrLabelLine(jobLine, /المهن[ةه]|Profession|Occupation/ig) : cleanJobOrEmployerLine(jobLine);
  if(!position || position.length < 3) position = cleanJobOrEmployerLine(lines[guessedJobIndex + 1] || '');
  position = position
    .replace(/^\s*[:：-]+|[:：-]+\s*$/g,'')
    .replace(/\s+/g,' ')
    .trim();
  const combinedEmployer = position.match(/^(.*?)(\b(?:مطعم|شركة|مؤسسة|مكتب|محل|فرع|مدرسة|مركز|وزارة)\b.+)$/);
  if(combinedEmployer && combinedEmployer[1].trim().length >= 3){
    position = combinedEmployer[1].trim();
    result.employer = combinedEmployer[2].trim();
  }
  result.position = cleanJobPositionValue(position);
  for(let i=guessedJobIndex + 1; i<Math.min(lines.length, guessedJobIndex + 6); i++){
    const candidate = cleanJobOrEmployerLine(lines[i]);
    if(candidate === result.position) continue;
    if(isLikelyEmployerLine(candidate)){
      result.employer = candidate;
      break;
    }
  }
  return result;
}

function parseCivilIdCardText(text, options={}){
  const lines = String(text || '')
    .split(/\r?\n/)
    .map(normalizeOcrLine)
    .filter(Boolean);
  const combinedJob = extractPositionAndEmployerFromCombinedText(text);
  const lineJob = extractPositionAndEmployerFromCivilIdText(lines);
  const data = {
    name:options.skipName ? '' : extractNameFromCivilIdText(text,lines,options),
    civilId:extractCivilIdFromText(text),
    nationality:extractNationalityFromCivilIdText(text,lines),
    position:lineJob.position || combinedJob.position,
    employer:lineJob.employer || combinedJob.employer || findKnownEmployerInText(text)
  };
  if(options.only === 'name') return {name:data.name,civilId:'',nationality:'',position:'',employer:''};
  if(options.only === 'job') return {name:'',civilId:'',nationality:'',position:data.position,employer:data.employer};
  return data;
}

function normalizeCompareText(value){
  return normalizeOcrLine(value).replace(/\s+/g,'').toLowerCase();
}

function setEmployeeEmployerFromQuickFill(employerName){
  const name = cleanExtractedField(employerName);
  if(!name) return;
  const select = document.getElementById('empEmployer');
  const normalizedName = normalizeCompareText(name);
  const found = appData.employers.find(employer=>{
    const employerName = normalizeCompareText(employer.name);
    return employerName === normalizedName || employerName.includes(normalizedName) || normalizedName.includes(employerName);
  });
  if(found){
    select.value = found.name;
    return;
  }
  let option = [...select.options].find(opt=>normalizeCompareText(opt.value) === normalizeCompareText(name));
  if(!option){
    option = document.createElement('option');
    option.value = name;
    option.textContent = `${name} (من البطاقة)`;
    select.appendChild(option);
  }
  select.value = name;
}

function fillEmployeeFormFromQuickData(data){
  ['empName','empCivilId','empPosition','empEmployer','empNationality'].forEach(id=>{
    const input = document.getElementById(id);
    if(input) input.value = '';
  });
  if(data.name && isLikelyArabicPersonName(data.name,{minWords:3})) document.getElementById('empName').value = data.name;
  if(data.civilId) document.getElementById('empCivilId').value = data.civilId;
  if(data.nationality) document.getElementById('empNationality').value = data.nationality;
  if(data.position && isLikelyJobPositionLine(data.position)) document.getElementById('empPosition').value = cleanJobPositionValue(data.position);
  if(data.employer && isUsableExtractedEmployerName(data.employer)) setEmployeeEmployerFromQuickFill(data.employer);
}

function isUsableExtractedEmployeeName(value){
  const text = normalizeOcrLine(value);
  if(!text || /^(?:الرقم|الرقم المدني|المدني|الاسم|الإسم|الجنسية|المهن[ةه])$/i.test(text)) return false;
  if(/[\u0600-\u06FF]/.test(text)) return isLikelyArabicPersonName(text,{minWords:3});
  return /^[A-Za-z][A-Za-z\s.'-]{4,}$/.test(text) && text.trim().split(/\s+/).length >= 2;
}

function mergeQuickFillParsedData(parsedItems){
  const merged = {name:'', civilId:'', nationality:'', position:'', employer:''};
  parsedItems.filter(Boolean).forEach(item=>{
    const itemNameIsArabic = isLikelyArabicPersonName(item.name,{minWords:3});
    const mergedNameIsArabic = isLikelyArabicPersonName(merged.name,{minWords:3});
    if(item.name && isUsableExtractedEmployeeName(item.name) && (!merged.name || (itemNameIsArabic && !mergedNameIsArabic))){
      merged.name = item.name;
    }
    if(!merged.civilId && item.civilId) merged.civilId = item.civilId;
    if(!merged.nationality && item.nationality) merged.nationality = item.nationality;
    if(!merged.position && item.position && isLikelyJobPositionLine(item.position)) merged.position = cleanJobPositionValue(item.position);
    if(!merged.employer && item.employer && isUsableExtractedEmployerName(item.employer)) merged.employer = cleanJobOrEmployerLine(item.employer);
  });
  if(!isLikelyArabicPersonName(merged.name,{minWords:3})) merged.name = '';
  return merged;
}

function quickFillNeedsExtraReading(parsed){
  return !parsed.position || !parsed.employer || !isUsableExtractedEmployeeName(parsed.name);
}

function loadImageElementFromFile(file){
  return new Promise((resolve,reject)=>{
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = ()=>{
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = ()=>{
      URL.revokeObjectURL(url);
      reject(new Error('تعذر تجهيز الصورة للقراءة'));
    };
    img.src = url;
  });
}

function createQuickFillOcrCanvas(img, region, scale=2.5){
  const sourceWidth = Math.max(1, Math.round(region.width));
  const sourceHeight = Math.max(1, Math.round(region.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(sourceWidth * scale);
  canvas.height = Math.round(sourceHeight * scale);
  const ctx = canvas.getContext('2d', {willReadFrequently:true});
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, region.x, region.y, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  const data = imageData.data;
  for(let i=0;i<data.length;i+=4){
    let gray = data[i]*0.299 + data[i+1]*0.587 + data[i+2]*0.114;
    gray = Math.max(0, Math.min(255, (gray - 128) * 1.45 + 128));
    data[i] = data[i+1] = data[i+2] = gray;
  }
  ctx.putImageData(imageData,0,0);
  return canvas;
}

async function buildQuickFillExtraOcrTargets(file){
  const img = await loadImageElementFromFile(file);
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  const makeRegion = (label, x, y, w, h, scale, field='all', ocr={})=>({
    label,
    field,
    ...ocr,
    source:createQuickFillOcrCanvas(img,{
      x:Math.max(0, Math.round(width * x)),
      y:Math.max(0, Math.round(height * y)),
      width:Math.min(width - Math.round(width * x), Math.round(width * w)),
      height:Math.min(height - Math.round(height * y), Math.round(height * h))
    }, scale)
  });
  return [
    makeRegion('قراءة سطر الاسم العربي المركز', .32, .245, .58, .065, 7.0, 'name', {lang:'ara', psm:'7'}),
    makeRegion('قراءة الاسم العربي فقط', .25, .20, .66, .16, 5.2, 'name', {lang:'ara', psm:'6'}),
    makeRegion('قراءة منطقة الرقم والاسم', .18, .15, .78, .26, 4.2, 'name', {lang:'ara+eng', psm:'6'}),
    makeRegion('قراءة منتصف واجهة البطاقة', .28, .23, .67, .20, 4.8, 'name', {lang:'ara', psm:'6'}),
    makeRegion('قراءة بيانات واجهة البطاقة', .02, .17, .96, .31, 3.2, 'front'),
    makeRegion('قراءة المهنة وجهة العمل فقط', .44, .49, .55, .17, 4.8, 'job'),
    makeRegion('قراءة ظهر البطاقة', .02, .48, .96, .35, 3.4, 'job')
  ];
}

async function recognizeQuickFillTarget(Tesseract, source, label, fromPercent, toPercent, options={}){
  setQuickFillProgress(fromPercent, label);
  const result = await Tesseract.recognize(source, options.lang || 'ara+eng', {
    ...(options.psm ? {tessedit_pageseg_mode:String(options.psm)} : {}),
    logger: message=>{
      const status = message?.status || '';
      const progress = Math.round((message?.progress || 0) * 100);
      if(status.includes('recognizing')){
        const next = fromPercent + ((toPercent - fromPercent) * (progress / 100));
        setQuickFillProgress(next, `${label} ${progress}%`);
      }
    }
  });
  return result?.data?.text || '';
}

async function startQuickEmployeeFill(){
  if(!quickEmployeeFillFile){
    showToast('ارفق صورة البطاقة أولاً','error');
    return;
  }
  const startBtn = document.getElementById('quickFillStartBtn');
  startBtn.disabled = true;
  document.getElementById('quickFillUploadPanel').style.display = 'none';
  document.getElementById('quickFillAnalysisPanel').classList.add('show');
  try{
    setQuickFillProgress(8,'تحميل محرك قراءة البطاقة');
    const Tesseract = await loadTesseractOcr();
    const texts = [];
    const parsedItems = [];
    setQuickFillProgress(16,'بدء تحليل الصورة');
    const fullText = await recognizeQuickFillTarget(Tesseract, quickEmployeeFillFile, 'قراءة البطاقة كاملة', 18, 58);
    texts.push(fullText);
    parsedItems.push(parseCivilIdCardText(fullText));

    let parsed = mergeQuickFillParsedData(parsedItems);
    if(quickFillNeedsExtraReading(parsed)){
      const targets = await buildQuickFillExtraOcrTargets(quickEmployeeFillFile);
      for(let i=0; i<targets.length; i++){
        const start = 58 + (i * 8);
        const targetText = await recognizeQuickFillTarget(Tesseract, targets[i].source, targets[i].label, start, start + 8, targets[i]);
        texts.push(targetText);
        const field = targets[i].field;
        const parseOptions = field === 'name'
          ? {only:'name', allowLooseArabicName:true}
          : field === 'job'
            ? {only:'job', skipName:true}
            : {};
        parsedItems.push(parseCivilIdCardText(targetText, parseOptions));
        parsed = mergeQuickFillParsedData(parsedItems);
        if(parsed.position && parsed.employer && isLikelyArabicPersonName(parsed.name,{minWords:3})) break;
      }
    }
    setQuickFillProgress(94,'استخراج الحقول المطلوبة');
    parsed = mergeQuickFillParsedData([parseCivilIdCardText(texts.join('\n'), {skipName:true}), ...parsedItems]);
    console.info('HRMS quick fill OCR', {parsed, text:texts.join('\n---\n')});
    fillEmployeeFormFromQuickData(parsed);
    setQuickFillProgress(100,'تمت التعبئة');
    setTimeout(()=>{
      closeQuickEmployeeFillModal();
      const count = Object.values(parsed).filter(Boolean).length;
      showToast(count ? `تمت تعبئة ${count} حقول من البطاقة` : 'انتهى التحليل، لم يتم العثور على بيانات واضحة');
    },450);
  } catch(err){
    console.error(err);
    document.getElementById('quickFillUploadPanel').style.display = 'block';
    document.getElementById('quickFillAnalysisPanel').classList.remove('show');
    showToast('تعذر قراءة البطاقة. جرّب صورة أوضح أو أقرب','error');
  } finally {
    startBtn.disabled = false;
  }
}

function saveEmployee(){
  const name = document.getElementById('empName').value.trim();
  const civilId = document.getElementById('empCivilId').value.trim();
  const nat = document.getElementById('empNationality').value;
  const pos = document.getElementById('empPosition').value.trim();
  const emp = document.getElementById('empEmployer').value;
  const kwPhone = document.getElementById('empKwPhone').value.trim();
  const intlPhone = document.getElementById('empIntlPhone').value.trim();
  const hours = normalizeDecimalString(document.getElementById('empHours').value.trim());
  const hoursValue = parseHoursValue(hours);
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
        appData.employees[idx] = {...appData.employees[idx],name,civilId,nationality:nat,position:pos,employer:emp,employerId:employerRecord?.id || '',kwPhone,intlPhone,hours:hoursValue||8,schedType,segments:normalizedSegments};
      }
      editingEmpId = null;
      showToast(`تم تعديل بيانات الموظف ${name} بنجاح`);
    } else {
      const newEmp = {id:generateId(),name,civilId,nationality:nat,position:pos,employer:emp,employerId:employerRecord?.id || '',kwPhone,intlPhone,hours:hoursValue||8,schedType,segments:[...normalizedSegments],documents:{},createdAt:new Date().toISOString()};
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
  document.getElementById('empCivilId').value='';
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
      <button type="button" class="profile-avatar profile-avatar-button" style="border-color:${getAvatarColor(emp.id)}55" onclick="openPhotoCropForEmployee('${emp.id}')" title="تحديد إطار الصورة الشخصية">
        ${avatarHtml}
        <span class="profile-avatar-hint">${photoSrc?'تعديل الإطار':'رفع صورة'}</span>
      </button>
      <div>
        <div class="profile-name">${emp.name}</div>
        <div class="profile-position">${emp.position||'—'}</div>
        <div class="profile-meta">
          <span>${c.flag} ${c.name}</span>
          <span>🏢 ${emp.employer||'—'}</span>
          ${emp.civilId?`<span>🪪 ${emp.civilId}</span>`:''}
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
    document.getElementById('empCivilId').value = emp.civilId||'';
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
  document.getElementById('docFile').accept = docType === 'photo' ? 'image/*' : 'image/*,.pdf';
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
    if(currentDocType === 'photo'){
      closeModal('docModal');
      openPhotoCropModal(currentProfileId,e.target.result,{
        renewDate,
        expireDate,
        fileName:file.name,
        uploadedAt:new Date().toISOString()
      });
      return;
    }
    emp.documents[currentDocType] = {fileData:e.target.result,renewDate,expireDate,fileName:file.name,uploadedAt:new Date().toISOString()};
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

function normalizeBranchDisplayName(value){
  const text = String(value || '').trim();
  if(!text) return '';
  if(/فرع\s*السرة|Surra Branch/i.test(text)) return 'فرع حولي';
  if(/السرة|surra/i.test(text)) return 'حولي';
  return text;
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

async function saveFingerprintCodes(){
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
  try{
    await publishHrmsCoreDataToFirebase();
    showToast('تم حفظ رموز دخول البصمة ونشرها للتطبيق');
  } catch(err){
    console.error(err);
    showToast('تم حفظ الرموز محلياً، لكن تعذر نشرها للتطبيق','error');
  }
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
  scheduleState.zones = {
    surra:scheduleState.zones?.surra || [],
    abulhasania:scheduleState.zones?.abulhasania || [],
    yarmouk:scheduleState.zones?.yarmouk || []
  };
  scheduleState.notes = normalizeScheduleNotes(scheduleState.notes || [], scheduleState);
  scheduleState.scheduleDate = scheduleState.scheduleDate || formatDateInput(scheduleDate);
  scheduleState.dayName = days[idx];
  renderScheduleBranchEmployerSelectors();
  renderScheduleZones();
  renderScheduleNotes();
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
      const emp = appData.employees.find(employee=>employee.id === item.empId) || {};
      const displayName = getEmployeeScheduleName(item.empName || emp.name);
      return `
      <div class="schedule-card-item" draggable="true" 
        style="background:${hexToRgba(color,.13)};border-color:${hexToRgba(color,.45)};color:${color}"
        ondragstart="dragFromZone(event,'${zone}',${i})"
        title="اضغط لإضافة ساعات">
        <div style="padding-left:18px">
          <strong style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(displayName)}</strong>
          <div style="font-size:11px;color:${color};font-weight:800">${formatTimeRange(item.from,item.to)}</div>
          <div style="font-size:10px;color:#334155;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(item.tasks?.join(' + ')||'')}</div>
        </div>
        <button onclick="removeFromZone('${zone}',${i})" style="position:absolute;top:4px;left:4px;background:none;border:none;color:${color};cursor:pointer;font-size:14px;line-height:1">×</button>
      </div>`;
    }).join('') : '<div style="padding:12px;font-size:12px;color:#94a3b8;text-align:center">اسحب موظفاً هنا</div>';
  });
}

function renderScheduleNotes(){
  const list = document.getElementById('scheduleNotesList');
  if(!list) return;
  scheduleState.notes = normalizeScheduleNotes(scheduleState.notes || [], scheduleState);
  if(!scheduleState.notes.length){
    list.innerHTML = '<div class="schedule-notes-empty">لا توجد ملاحظات لهذا الجدول</div>';
    return;
  }
  list.innerHTML = scheduleState.notes.map((note,i)=>`
    <div class="schedule-note-item">
      <span class="schedule-note-color" style="background:${note.color}"></span>
      <div class="schedule-note-body">
        ${note.linkedToEmployee === false ? '' : `<div class="schedule-note-employee" style="color:${note.color}">${escapeHtml(note.empName)}</div>`}
        <div class="schedule-note-text">${escapeHtml(note.text)}</div>
      </div>
      <button class="schedule-note-delete" onclick="removeScheduleNote(${i})">×</button>
    </div>
  `).join('');
}

function toggleScheduleNoteEmployeeLink(){
  const checkbox = document.getElementById('scheduleNoteLinkEmp');
  const select = document.getElementById('scheduleNoteEmp');
  const enabled = checkbox?.checked !== false;
  if(select){
    select.disabled = !enabled;
    select.style.display = enabled ? '' : 'none';
  }
}

function openScheduleNoteModal(){
  if(!selectedDay){
    showToast('اختر اليوم أولاً','error');
    return;
  }
  const select = document.getElementById('scheduleNoteEmp');
  const checkbox = document.getElementById('scheduleNoteLinkEmp');
  const employees = getScheduleEmployeesForNotes(scheduleState);
  select.innerHTML = employees.length
    ? employees.map(emp=>`<option value="${escapeHtml(emp.id)}">${escapeHtml(emp.name)}</option>`).join('')
    : '<option value="">لا يوجد موظفون</option>';
  if(checkbox) checkbox.checked = true;
  toggleScheduleNoteEmployeeLink();
  document.getElementById('scheduleNoteText').value = '';
  openModal('scheduleNoteModal');
}

function saveScheduleNote(){
  const select = document.getElementById('scheduleNoteEmp');
  const linkEnabled = document.getElementById('scheduleNoteLinkEmp')?.checked !== false;
  const text = document.getElementById('scheduleNoteText').value.trim();
  if(!text){
    showToast('اكتب الملاحظة أولاً','error');
    return;
  }
  const employee = linkEnabled ? getScheduleEmployeesForNotes(scheduleState).find(emp=>emp.id === select.value) : null;
  if(linkEnabled && !employee){
    showToast('اختر الموظف المرتبط بالملاحظة','error');
    return;
  }
  if(!Array.isArray(scheduleState.notes)) scheduleState.notes = [];
  scheduleState.notes.push({
    id:generateId(),
    empId:linkEnabled ? employee.id : '',
    empName:linkEnabled ? employee.name : '',
    linkedToEmployee:linkEnabled,
    text,
    color:linkEnabled ? employee.color : '#64748b',
    createdAt:new Date().toISOString()
  });
  markScheduleModified();
  renderScheduleNotes();
  closeModal('scheduleNoteModal');
}

function removeScheduleNote(index){
  if(!Array.isArray(scheduleState.notes)) return;
  scheduleState.notes.splice(index,1);
  markScheduleModified();
  renderScheduleNotes();
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
    const totalH = parseHoursValue(emp.hours)||8;
    const used = usedHours[emp.id]||0;
    const remaining = Math.max(0, totalH - used);
    const depleted = remaining<=0;
    const photoSrc = getEmployeeDisplayPhoto(emp);
    const displayName = getEmployeeScheduleName(emp);
    const avatarHtml = photoSrc
      ? `<img src="${photoSrc}" alt="" style="width:32px;height:32px;border-radius:8px;object-fit:cover;flex-shrink:0">`
      : `<div style="width:32px;height:32px;border-radius:8px;background:${getAvatarColor(emp.id)}33;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${getAvatarColor(emp.id)};flex-shrink:0">${getInitials(emp.name)}</div>`;
    return `<div class="staff-card ${depleted?'depleted':''}" draggable="${depleted?'false':'true'}"
      ondragstart="dragStart(event,'${emp.id}')" id="staffCard-${emp.id}">
      ${avatarHtml}
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:700;color:${depleted?'var(--text3)':'var(--heading)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(displayName)}</div>
      </div>
      <div class="staff-hours-badge" style="background:${depleted?'rgba(16,185,129,.2)':'rgba(37,99,235,.2)'};color:${depleted?'var(--green)':'var(--accent2)'}">
        ${depleted?'✓ 0':'⏱ '+formatHoursValue(remaining)}h
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
    document.getElementById('schedModalTitle').textContent = `${emp?.name} - ${zone==='surra'?'حولي':zone==='abulhasania'?'أبو الحصانية':'اليرموك'}`;
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
  const totalH = parseHoursValue(emp.hours)||8;
  if(hours > (totalH-usedH) + 0.001){ showToast(`تجاوزت ساعات الموظف (متبقي ${formatHoursValue(Math.max(0,totalH-usedH))}h)`,'error'); return; }
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
        persistBrowserSettings(appData.settings);
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
    if(imported.found && !imported.readable && canStartFreshInSelectedFolder()){
      resetToFreshFolderDatabase(handle.name);
      setFolderStatus('المجلد لا يحتوي على قاعدة بيانات قابلة للقراءة. تم بدء قاعدة جديدة من الصفر.', 'success');
      showToast('تم بدء قاعدة جديدة لهذا المجلد');
      await syncDataToFolder(false);
      return;
    }
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
  let isLoggedIn = false;
  try{ isLoggedIn = localStorage.getItem('hrmsLoggedIn') === 'true'; }catch(err){}
  if(isLoggedIn){
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    if(loginScreen) {
      loginScreen.classList.add('hidden');
      loginScreen.style.display = 'none';
    }
    if(mainApp) {
      mainApp.style.display = 'flex';
      mainApp.classList.add('show');
    }
    initApp();
  }
});
