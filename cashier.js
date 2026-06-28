    // Firebase Configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAZ4-dUBSKsHP3sTqRE8G9c2AjeclTlIik",
      authDomain: "fawatir-f5a13.firebaseapp.com",
      databaseURL: "https://fawatir-f5a13-default-rtdb.firebaseio.com",
      projectId: "fawatir-f5a13",
      storageBucket: "fawatir-f5a13.firebasestorage.app",
      messagingSenderId: "334207827614",
      appId: "1:334207827614:web:3c053434b04c1dd3ea858f",
      measurementId: "G-W42ECQR0LW"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    // المناطق
    const areas = [
      'السرة', 'الزهراء', 'السلام', 'حطين', 'الفيحاء', 'القادسية', 'مشرف', 'كيفان', 'الروضة', 'العديلية', 
      'الخالدية', 'النزهة', 'الدعية', 'المنصورية', 'قرطبة', 'الشامية', 'الرميثية', 'عبدالله السالم', 'الجابرية', 
      'بيان', 'الصديق', 'الشهداء', 'اليرموك', 'الفروانية', 'خيطان', 'بنيد القار', 'الدسمة', 'حولي', 'ميدان حولي', 
      'مبارك الكبير', 'القصور', 'الرابية', 'العمرية', 'الرقعي', 'غرناطة', 'القرين', 'الشويخ', 'المسيلة', 'الكويت', 
      'اشبيليا', 'السالمية', 'شرق', 'الرحاب', 'المرقاب', 'صباح السالم', 'الفردوس', 'صباح الناصر', 'المسايل', 
      'الاندلس', 'العارضية', 'سلوى', 'العدان', 'الشعب', 'هدية', 'الصليبيخات', 'الجهراء', 'الفنطاس', 'سعد العبدالله', 
      'الفنيطيس', 'الدوحة', 'العقيلة', 'جابر العلي', 'جابر الاحمد', 'عبدالله مبارك', 'المهبولة', 'المنقف', 'الاحمدي', 
      'الصليبية', 'الصباحية', 'فهد الاحمد', 'صبحان', 'ابو فطيرة', 'ابو الحصانية', 'الظهر', 'ابو حليفة', 'الفحيحيل', 
      'جليب الشيوخ', 'ام الهيمان', 'المطلاع', 'صباح الاحمد', 'الوفرة'
    ];

    // Global State
    let currentScreen = 'home';
    let currentAccountingSection = 'orders';
    let allProducts = [];
    let parsedExcelData = [];
    let allCategories = [];
    let allProductCategories = [];
    let allCustomers = [];
    let allOrders = [];
    let allCashiers = [];
    let allProductPriceChanges = [];
    let allProductInfos = [];
    let allDeliveryPrices = {};
    let selectedDeliveryPriceGroup = 'mainYarmouk';
    let allDailySessions = [];
    let allRegisteredDevices = [];
    let lastDeviceHeartbeatAt = 0;
    let currentCashier = null;
    let currentBranch = null;
    let currentDailySession = null;
    let dailyInvoiceSearchTerm = '';
    let cashierOrdersPage = 1;
    let ordersLoadedMode = 'today';
    let ordersLoadedRange = null;
    let orderSearchTerm = '';
    let orderFilterFrom = '';
    let orderFilterTo = '';
    let orderFilterCashier = '';
    let orderFilterBranch = '';
    let orderSearchLoadTimer = null;
    let barcodeScanBuffer = '';
    let barcodeScanLastTime = 0;
    let barcodeScanTimer = null;
    let currentOrder = {
      items: [],
      customer: null,
      deliveryPrice: 0,
      orderType: '',
      paymentMethod: '',
      selectedAddress: null,
      deliveryTimingType: 'within2',
      deliveryDate: '',
      deliveryTimeFrom: '',
      deliveryTimeTo: '',
      pickupBranch: '',
      cashReceived: 0,
      cashChange: 0,
      discountType: 'none',
      discountValue: 0,
      discountAmount: 0
    };
    let selectedProductsForCategory = [];
    let adminProductCategoryPath = [];
    let adminProductSearchTerm = '';
    let adminSelectedProductIds = [];
    let productInfoSearchTerm = '';
    let productInfoPage = 1;
    let selectedProductsForInfo = [];
    let productionStickerSearchTerm = '';
    let productionStickerSelectedProductId = '';
    let productionStickerFormOpen = false;
    let productionStickerCategoryPath = [];
    let priceChangeReportFromDate = '';
    let priceChangeReportToDate = '';
    let priceChangeReportType = 'all';
    let salesReportSearchTerm = '';
    let salesReportSelectedProductId = '';
    let salesReportFromDate = '';
    let salesReportToDate = '';
    let salesReportMode = 'single';
    let salesReportProductSource = 'manual';
    let salesReportMultiSearchTerm = '';
    let salesReportMultiSelectedProductIds = [];
    let salesReportMainCategoryId = '';
    let salesReportSubCategoryId = '';
    let salesReportSelectedProduct = null;
    let salesReportResults = [];
    let salesReportCurrentBranch = '';
    let salesReportBranchRows = [];
    let salesReportCurrentDetailProduct = null;
    let allInventoryCategories = [];
    let allInventoryUnits = [];
    let allIssueCashiers = [];
    let allInventoryIssues = [];
    let allInventoryTransfers = [];
    let allInventorySuppliers = [];
    let allInventoryPurchases = [];
    let allStockMaterials = [];
    let allTransferRequests = [];
    let selectedInventoryCategoryId = '';
    let selectedInventorySupplierId = '';
    let inventoryProductSearchTerm = '';
    let inventoryCategorySearchTerm = '';
    let inventoryCategoryProductsSearchTerm = '';
    let supplierSearchTerm = '';
    let supplierProductsSearchTerm = '';
    let inventoryProductsBranchFilter = 'all';
    let inventoryCategoryBranchFilter = 'all';
    let issueProductSearchTerm = '';
    let transferProductSearchTerm = '';
    let purchaseProductSearchTerm = '';
    let shortageSearchTerm = '';
    let shortageSearchMode = 'products';
    let shortageRequestsPage = 1;
    let currentShortageDraft = {
      items: []
    };
    let selectedProductsForInventory = [];
    let selectedInventoryProductsForCategory = [];
    let selectedSupplierProductsForAdd = [];
    let selectedPurchaseProductsForAdd = [];
    let currentIssueVoucherDraft = {
      warehouseKeeper: '',
      cashierId: '',
      invoiceNumber: '',
      items: []
    };
    let editingIssueVoucherId = '';
    let currentTransferVoucherDraft = {
      warehouseKeeper: '',
      targetBranchId: '',
      items: []
    };
    let currentPurchaseVoucherDraft = {
      warehouseKeeper: '',
      supplierId: '',
      targetBranchId: 'main',
      invoiceNumber: '',
      items: []
    };
    let editingTransferVoucherId = '';
    let editingPurchaseVoucherId = '';
    let isIssueVoucherModalOpen = false;
    let isTransferVoucherModalOpen = false;
    let isPurchaseVoucherModalOpen = false;
    let realtimeListenersStarted = false;

    // Units
    const units = ['كيلو', 'لتر', 'جرام', 'حبة', 'ربطة', 'كرتون', 'تنكة', 'بطل', 'ماعون'];
	    const INVENTORY_BRANCHES = [
	      { id: 'main', name: 'الفرع الرئيسي' },
	      { id: 'yarmouk', name: 'فرع اليرموك' },
	      { id: 'abu_hasaniya', name: 'فرع أبو الحصانية' },
	      { id: 'main_warehouse', name: 'المخزن الرئيسي' }
	    ];
	    const PICKUP_BRANCHES = ['الفرع الرئيسي', 'اليرموك', 'أبو الحصانية', 'المخزن الرئيسي'];

    // Helper Functions
    function generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    const APP_DATA_CACHE_KEY = 'figs_old_site_accounting_cache_v2';
    const APP_CACHE_DB_NAME = 'figs_old_site_cache';
    const APP_CACHE_STORE = 'cache';
    let dataCacheSaveTimer = null;
    let isLoadingFreshData = false;

    function renderProfessionalLoadingScreen(message = 'جاري تحميل البيانات', detail = 'يتم تجهيز الطلبات والمخازن للعمل بسرعة', progress = 8) {
      const app = document.getElementById('app');
      const safeProgress = Math.max(5, Math.min(100, Math.round(progress || 0)));
      app.innerHTML = `
        <div class="min-h-full w-full bg-gray-950 text-white flex items-center justify-center p-8" dir="rtl">
          <div class="w-full max-w-xl text-center">
            <div class="mx-auto mb-6 h-20 w-20 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shadow-2xl">
              <div class="h-11 w-11 rounded-full border-4 border-white/20 border-t-amber-300 animate-spin"></div>
            </div>
            <h1 class="text-4xl font-extrabold mb-3">جاري تحميل البيانات</h1>
            <p class="text-gray-300 text-lg mb-8">${escapeHtml(detail || message)}</p>
            <div class="bg-white/10 rounded-full h-4 overflow-hidden border border-white/10 shadow-inner">
              <div class="h-full bg-gradient-to-l from-amber-300 via-blue-400 to-emerald-400 transition-all duration-300" style="width: ${safeProgress}%"></div>
            </div>
            <div class="mt-4 flex items-center justify-between text-sm text-gray-300 font-bold">
              <span>${escapeHtml(message)}</span>
              <span>${safeProgress}%</span>
            </div>
            <div class="mt-8 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300 leading-7">
              أول مرة يتم تحميل كل البيانات وحفظها في هذا المتصفح، وبعدها يكون الدخول أسرع ويتم تحديث الجديد فقط أثناء العمل.
            </div>
          </div>
        </div>
      `;
    }

    function openAppCacheDb() {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error('IndexedDB غير مدعوم'));
          return;
        }
        const request = indexedDB.open(APP_CACHE_DB_NAME, 1);
        request.onupgradeneeded = () => {
          request.result.createObjectStore(APP_CACHE_STORE);
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error('تعذر فتح التخزين المحلي'));
      });
    }

    async function readAppDataCache() {
      try {
        const database = await openAppCacheDb();
        return await new Promise((resolve, reject) => {
          const transaction = database.transaction(APP_CACHE_STORE, 'readonly');
          const request = transaction.objectStore(APP_CACHE_STORE).get(APP_DATA_CACHE_KEY);
          request.onsuccess = () => resolve(request.result || null);
          request.onerror = () => reject(request.error);
          transaction.oncomplete = () => database.close();
        });
      } catch (error) {
        console.warn('Unable to read app cache:', error);
        return null;
      }
    }

    async function writeAppDataCache(payload) {
      try {
        const database = await openAppCacheDb();
        await new Promise((resolve, reject) => {
          const transaction = database.transaction(APP_CACHE_STORE, 'readwrite');
          transaction.objectStore(APP_CACHE_STORE).put(payload, APP_DATA_CACHE_KEY);
          transaction.oncomplete = () => {
            database.close();
            resolve();
          };
          transaction.onerror = () => reject(transaction.error);
        });
      } catch (error) {
        console.warn('Unable to write app cache:', error);
      }
    }

    function collectCurrentDataCache() {
      return {
        savedAt: Date.now(),
        allOrders,
        allCashiers,
        allProducts,
        allProductCategories,
        allProductInfos,
        allProductPriceChanges,
        allDeliveryPrices,
        allDailySessions,
        allRegisteredDevices,
        allCustomers,
        allCategories,
        allInventoryCategories,
        allInventoryUnits,
        allIssueCashiers,
        allInventoryIssues,
        allInventoryTransfers,
        allInventorySuppliers,
        allInventoryPurchases,
        allStockMaterials,
        allTransferRequests
      };
    }

    function hydrateDataFromCache(cache) {
      if (!cache) return false;
      allOrders = Array.isArray(cache.allOrders) ? cache.allOrders : [];
      allCashiers = Array.isArray(cache.allCashiers) ? cache.allCashiers : [];
      allProducts = Array.isArray(cache.allProducts) ? cache.allProducts : [];
      allProductCategories = Array.isArray(cache.allProductCategories) ? cache.allProductCategories : [];
      allProductInfos = Array.isArray(cache.allProductInfos) ? cache.allProductInfos : [];
      allProductPriceChanges = Array.isArray(cache.allProductPriceChanges) ? cache.allProductPriceChanges : [];
      allDeliveryPrices = cache.allDeliveryPrices || {};
      allDailySessions = Array.isArray(cache.allDailySessions) ? cache.allDailySessions : [];
      allRegisteredDevices = Array.isArray(cache.allRegisteredDevices) ? cache.allRegisteredDevices : [];
      allCustomers = Array.isArray(cache.allCustomers) ? cache.allCustomers : [];
      allCategories = Array.isArray(cache.allCategories) ? cache.allCategories : [];
      allInventoryCategories = Array.isArray(cache.allInventoryCategories) ? cache.allInventoryCategories : [];
      allInventoryUnits = Array.isArray(cache.allInventoryUnits) ? cache.allInventoryUnits : [];
      allIssueCashiers = Array.isArray(cache.allIssueCashiers) ? cache.allIssueCashiers : [];
      allInventoryIssues = Array.isArray(cache.allInventoryIssues) ? cache.allInventoryIssues : [];
      allInventoryTransfers = Array.isArray(cache.allInventoryTransfers) ? cache.allInventoryTransfers : [];
      allInventorySuppliers = Array.isArray(cache.allInventorySuppliers) ? cache.allInventorySuppliers : [];
      allInventoryPurchases = Array.isArray(cache.allInventoryPurchases) ? cache.allInventoryPurchases : [];
      allStockMaterials = Array.isArray(cache.allStockMaterials) ? cache.allStockMaterials : [];
      allTransferRequests = Array.isArray(cache.allTransferRequests) ? cache.allTransferRequests : [];
      return true;
    }

    function scheduleDataCacheSave() {
      clearTimeout(dataCacheSaveTimer);
      dataCacheSaveTimer = setTimeout(() => {
        writeAppDataCache(collectCurrentDataCache());
      }, 1200);
    }

    function getLocalDayRange(dateValue = new Date()) {
      const date = dateValue instanceof Date ? dateValue : new Date(`${dateValue}T00:00:00`);
      const start = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      return {
        start,
        end: start + 86400000 - 1
      };
    }

    function getTodayOrdersRange() {
      return getLocalDayRange(new Date());
    }

    function normalizeOrdersSnapshot(snapshot) {
      return snapshot.val()
        ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }))
        : [];
    }

    function setLoadedOrders(orders, mode, range = null) {
      allOrders = orders.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      ordersLoadedMode = mode;
      ordersLoadedRange = range;
    }

    function mergeLoadedOrders(orders) {
      const byId = new Map(allOrders.map(order => [order.id, order]));
      orders.forEach(order => byId.set(order.id, { ...(byId.get(order.id) || {}), ...order }));
      allOrders = Array.from(byId.values()).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }

    async function fetchOrdersForRange(start, end, { replace = true, mode = 'range' } = {}) {
      const snapshot = await db.ref('orders').orderByChild('timestamp').startAt(start).endAt(end).once('value');
      const orders = normalizeOrdersSnapshot(snapshot);
      if (replace) {
        setLoadedOrders(orders, mode, { start, end });
      } else {
        mergeLoadedOrders(orders);
      }
      return orders;
    }

    async function fetchAllOrdersForSearch() {
      const snapshot = await db.ref('orders').once('value');
      const orders = normalizeOrdersSnapshot(snapshot);
      setLoadedOrders(orders, 'all', null);
      return orders;
    }

    function pruneCachedOrdersToToday() {
      const today = getTodayOrdersRange();
      setLoadedOrders(
        allOrders.filter(order => {
          const timestamp = parseInt(order.timestamp, 10) || 0;
          return timestamp >= today.start && timestamp <= today.end;
        }),
        'today',
        today
      );
    }

    async function loadData(options = {}) {
      const onProgress = typeof options.onProgress === 'function' ? options.onProgress : null;
      const toArray = (snapshot) => snapshot.val()
        ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }))
        : [];
      const ordersMode = options.ordersMode || 'today';
      const todayRange = getTodayOrdersRange();
      const dataRefs = [
        ['orders', 'الطلبات'],
        ['cashiers', 'الكاشيرات'],
        ['products', 'المنتجات'],
        ['productCategories', 'تصنيفات منتجات الموقع الجديد'],
        ['productInfos', 'معلومات المنتجات'],
        ['productPriceChanges', 'سجل الأسعار'],
        ['deliveryPrices', 'أسعار التوصيل'],
        ['dailySessions', 'يوميات الموظفين'],
        ['registeredDevices', 'الأجهزة'],
        ['customers', 'العملاء'],
        ['categories', 'التصنيفات'],
        ['inventoryCategories', 'تصنيفات المخزون'],
        ['inventoryUnits', 'وحدات المخزون'],
        ['inventoryIssueCashiers', 'موظفي الصرف'],
        ['inventoryIssues', 'سندات الصرف'],
        ['inventoryTransfers', 'سندات التحويل'],
        ['inventorySuppliers', 'الموردين'],
        ['inventoryPurchases', 'سندات الشراء'],
        ['stockMaterials', 'مواد المخزون'],
        ['transferRequests', 'طلبات النواقص']
      ];

      try {
        isLoadingFreshData = true;
        let loadedCount = 0;
        const loadSnapshot = ([path, label]) => {
          const ref = path === 'orders' && ordersMode === 'today'
            ? db.ref('orders').orderByChild('timestamp').startAt(todayRange.start).endAt(todayRange.end)
            : db.ref(path);
          return ref.once('value').then(snapshot => {
          loadedCount++;
          if (onProgress) onProgress({
            label,
            loaded: loadedCount,
            total: dataRefs.length,
            percent: 8 + (loadedCount / dataRefs.length) * 86
          });
          return snapshot;
          });
        };

        const [
          ordersSnapshot,
          cashiersSnapshot,
          productsSnapshot,
          productCategoriesSnapshot,
          productInfosSnapshot,
          productPriceChangesSnapshot,
          deliveryPricesSnapshot,
          dailySessionsSnapshot,
          registeredDevicesSnapshot,
          customersSnapshot,
          categoriesSnapshot,
          inventoryCategoriesSnapshot,
          inventoryUnitsSnapshot,
          issueCashiersSnapshot,
          inventoryIssuesSnapshot,
          inventoryTransfersSnapshot,
          inventorySuppliersSnapshot,
          inventoryPurchasesSnapshot,
          stockMaterialsSnapshot,
          transferRequestsSnapshot
        ] = await Promise.all(dataRefs.map(loadSnapshot));

        setLoadedOrders(
          normalizeOrdersSnapshot(ordersSnapshot),
          ordersMode === 'today' ? 'today' : 'all',
          ordersMode === 'today' ? todayRange : null
        );
        allCashiers = toArray(cashiersSnapshot);
        allProducts = toArray(productsSnapshot);
        allProductCategories = toArray(productCategoriesSnapshot).map(category => ({
          ...category,
          productIds: Array.isArray(category.productIds)
            ? category.productIds
            : (category.productIds ? Object.values(category.productIds) : [])
        }));
        allProductInfos = toArray(productInfosSnapshot);
        allProductPriceChanges = toArray(productPriceChangesSnapshot).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        allDeliveryPrices = deliveryPricesSnapshot.val() || {};
        allDailySessions = toArray(dailySessionsSnapshot).sort((a, b) => (b.openedAt || 0) - (a.openedAt || 0));
        allRegisteredDevices = toArray(registeredDevicesSnapshot);
        allCustomers = toArray(customersSnapshot);
        allCategories = toArray(categoriesSnapshot);
        allInventoryCategories = toArray(inventoryCategoriesSnapshot).map(category => ({
          ...category,
          productIds: Array.isArray(category.productIds)
            ? category.productIds
            : (category.productIds ? Object.values(category.productIds) : [])
        }));
        allInventoryUnits = toArray(inventoryUnitsSnapshot);
        allIssueCashiers = toArray(issueCashiersSnapshot);
        allInventoryIssues = toArray(inventoryIssuesSnapshot).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        allInventoryTransfers = toArray(inventoryTransfersSnapshot).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        allInventorySuppliers = toArray(inventorySuppliersSnapshot);
        allInventoryPurchases = toArray(inventoryPurchasesSnapshot).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        allStockMaterials = toArray(stockMaterialsSnapshot);
        allTransferRequests = toArray(transferRequestsSnapshot).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        if (onProgress) onProgress({ label: 'حفظ البيانات في المتصفح', loaded: dataRefs.length, total: dataRefs.length, percent: 98 });
        await writeAppDataCache(collectCurrentDataCache());
        return true;
      } catch (error) {
        console.error('Error loading data:', error);
        showToast('تعذر تحميل البيانات. تحقق من الاتصال ثم حدث الصفحة', true);
        return false;
      } finally {
        isLoadingFreshData = false;
      }
    }

    async function enterAccountingWithCachedData() {
      renderProfessionalLoadingScreen('جاري فحص البيانات المحفوظة', 'نجهز شاشة المحاسبة والمخازن', 12);
      const cache = await readAppDataCache();
      if (hydrateDataFromCache(cache)) {
        pruneCachedOrdersToToday();
        currentScreen = 'accounting';
        renderAccounting('orders');
        setupRealtimeListeners();
        loadData({ ordersMode: 'today' }).then(success => {
          if (success && currentScreen === 'accounting') refreshUI();
        });
        return true;
      }

      const success = await loadData({
        ordersMode: 'today',
        onProgress: state => renderProfessionalLoadingScreen(
          `جاري تحميل ${state.label}`,
          `تم تحميل ${state.loaded} من ${state.total} ملفات بيانات`,
          state.percent
        )
      });
      if (!success) {
        currentScreen = 'home';
        renderHome();
        return false;
      }

      renderProfessionalLoadingScreen('تم تحميل البيانات', 'يتم فتح المحاسبة والمخازن الآن', 100);
      await new Promise(resolve => setTimeout(resolve, 250));
      currentScreen = 'accounting';
      renderAccounting('orders');
      setupRealtimeListeners();
      return true;
    }

    function formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString('ar-SA');
    }

    function formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('ar-SA');
    }

    function showToast(message, isError = false) {
      const toast = document.createElement('div');
      toast.className = `toast ${isError ? 'error' : ''}`;
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }

    function escapeHtml(value) {
      return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function normalizeText(value) {
      return (value || '').toString().trim().toLowerCase();
    }

    function formatNumberWithThreeDecimals(value) {
      return (parseFloat(value) || 0).toFixed(3);
    }

    function formatReportQuantity(value) {
      const num = parseFloat(value);
      if (isNaN(num)) return '0';
      return Number.isInteger(num) ? num.toString() : num.toFixed(3);
    }

    function getSalesReportPeriodText() {
      if (salesReportFromDate && salesReportToDate) {
        return `من ${salesReportFromDate} إلى ${salesReportToDate}`;
      }
      if (salesReportFromDate) {
        return `من ${salesReportFromDate}`;
      }
      if (salesReportToDate) {
        return `حتى ${salesReportToDate}`;
      }
      return 'كل الفترات';
    }

    function buildExcelHtml(headers, rows, totalRow = '') {
      return `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="utf-8">
          <style>
            table { border-collapse: collapse; width: 100%; direction: rtl; }
            th { background-color: #2563eb; color: white; font-weight: bold; padding: 10px; border: 1px solid #ddd; text-align: center; }
            td { padding: 8px; border: 1px solid #ddd; text-align: center; }
            .total-row { background-color: #fef3c7; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9fafb; }
          </style>
        </head>
        <body>
          <table dir="rtl">
            <thead>
              <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${rows}
              ${totalRow}
            </tbody>
          </table>
        </body>
        </html>
      `;
    }

    function downloadExcelHtml(html, fileName) {
      const blob = new Blob(['\ufeff', html], { type: 'application/vnd.ms-excel' });
      const link = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(objectUrl);
    }

    function openA4PrintWindow(title, contentHtml) {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        showToast('تعذر فتح نافذة الطباعة. يرجى السماح بالنوافذ المنبثقة.', true);
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <style>
            @page {
              size: A4;
              margin: 10mm;
            }
            body {
              font-family: 'Cairo', Arial, sans-serif;
              direction: rtl;
              margin: 0;
              color: #0f172a;
              background: #ffffff;
            }
            .print-report {
              border: 1px solid #dbe3ef;
              border-radius: 12px;
              padding: 16px;
            }
            .report-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              gap: 12px;
              margin-bottom: 14px;
              padding-bottom: 10px;
              border-bottom: 2px solid #e5e7eb;
            }
            .report-title {
              margin: 0;
              font-size: 24px;
              color: #1d4ed8;
              font-weight: 700;
            }
            .print-date {
              margin-top: 4px;
              color: #6b7280;
              font-size: 12px;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 8px;
              margin-bottom: 12px;
            }
            .meta-card {
              border: 1px solid #e5e7eb;
              background: #f8fafc;
              border-radius: 8px;
              padding: 8px 10px;
            }
            .meta-label {
              color: #6b7280;
              font-size: 11px;
              margin-bottom: 4px;
            }
            .meta-value {
              color: #111827;
              font-size: 13px;
              font-weight: 700;
              line-height: 1.4;
            }
            .report-table {
              width: 100%;
              border-collapse: collapse;
              table-layout: fixed;
            }
            .report-table th,
            .report-table td {
              border: 1px solid #d1d5db;
              padding: 7px 8px;
              text-align: right;
              font-size: 12px;
              word-break: break-word;
              vertical-align: top;
            }
            .report-table th {
              background: #1f2937;
              color: #ffffff;
              font-weight: 700;
            }
            .report-table tbody tr:nth-child(even) {
              background: #f8fafc;
            }
            .report-table tfoot td {
              background: #e0e7ff;
              font-weight: 700;
            }
            .summary-strip {
              margin-top: 12px;
              border: 1px solid #bfdbfe;
              border-radius: 8px;
              background: #eff6ff;
              padding: 10px;
              font-size: 13px;
              font-weight: bold;
            }
            @media print {
              .print-report {
                break-inside: auto;
              }
              .report-table thead {
                display: table-header-group;
              }
              .report-table tr,
              .report-table td,
              .report-table th {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          ${contentHtml}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          <\/script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
    
    function convertToEnglishNumbers(str) {
      str = (str === undefined || str === null) ? '' : String(str);
      const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      
      for (let i = 0; i < 10; i++) {
        str = str.replace(new RegExp(arabicNumbers[i], 'g'), englishNumbers[i]);
        str = str.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
      }
      
      return str;
    }

    function normalizeDecimalInput(value) {
      let normalized = convertToEnglishNumbers(value)
        .replace(/٫/g, '.')
        .replace(/،/g, '.')
        .replace(/,/g, '.')
        .replace(/[^0-9.]/g, '');

      const parts = normalized.split('.');
      if (parts.length > 2) {
        normalized = `${parts[0]}.${parts.slice(1).join('')}`;
      }

      return normalized;
    }



    function normalizeDiscountPercentageInput(value) {
      return normalizeDecimalInput(value);
    }

    function getOrderDeliveryFee(order) {
      return parseFloat(order?.deliveryFee ?? order?.deliveryPrice ?? 0) || 0;
    }

    function getItemGrossTotal(item) {
      const quantity = parseFloat(item?.quantity) || 0;
      const price = parseFloat(item?.price) || 0;
      const grossFromPrice = quantity * price;
      const storedGross = parseFloat(item?.grossTotal);
      if (!isNaN(storedGross) && storedGross > 0) return storedGross;
      return grossFromPrice;
    }

    function getItemDiscountAmount(item) {
      const storedDiscount = parseFloat(item?.discountAmount);
      if (!isNaN(storedDiscount) && storedDiscount > 0) return storedDiscount;

      const discountPercent = parseFloat(item?.discountPercent) || 0;
      if (discountPercent <= 0) return 0;

      return getItemGrossTotal(item) * (discountPercent / 100);
    }

    function getOrderItemsGrossTotal(order) {
      return (order?.items || []).reduce((sum, item) => sum + getItemGrossTotal(item), 0);
    }

    function getOrderDiscountTotal(order) {
      const itemsDiscountTotal = (order?.items || []).reduce((sum, item) => sum + getItemDiscountAmount(item), 0);
      if (itemsDiscountTotal > 0) return itemsDiscountTotal;

      const storedDiscount = parseFloat(order?.discountTotal);
      if (!isNaN(storedDiscount) && storedDiscount > 0) return storedDiscount;
      return 0;
    }

    function getOrderItemsNetTotal(order) {
      return (order?.items || []).reduce((sum, item) => sum + (parseFloat(item?.total) || 0), 0);
    }

    function getOrderGrandTotal(order) {
      return getOrderItemsNetTotal(order) + getOrderDeliveryFee(order);
    }

    function getDiscountDescription(discountType, discountValue) {
      const value = parseFloat(discountValue) || 0;
      if (discountType === 'percent') return `نسبة ${formatInventoryDecimal(value)}%`;
      if (discountType === 'fixed') return `قيمة ثابتة ${value.toFixed(3)} د.ك`;
      return 'بدون خصم';
    }

    function calculateOrderDiscountAmount(baseTotal, discountType, discountValue) {
      const value = parseFloat(discountValue) || 0;
      if (value <= 0 || baseTotal <= 0) return 0;

      let amount = discountType === 'percent'
        ? baseTotal * (value / 100)
        : value;
      if (amount > baseTotal) amount = baseTotal;
      return parseFloat(amount.toFixed(3));
    }

    function getInventoryBranchName(branchId) {
      if (branchId === 'all') return 'كل الفروع';
      const branch = INVENTORY_BRANCHES.find(item => item.id === branchId);
      return branch ? branch.name : '';
    }

    function getInventoryBranchOptionsHtml(selectedBranchId = 'main', includeAll = false, includeMain = true) {
      const options = [];
      if (includeAll) {
        options.push(`<option value="all" ${selectedBranchId === 'all' ? 'selected' : ''}>كل الفروع</option>`);
      }

      INVENTORY_BRANCHES.forEach(branch => {
        if (!includeMain && branch.id === 'main') return;
        options.push(`<option value="${branch.id}" ${selectedBranchId === branch.id ? 'selected' : ''}>${branch.name}</option>`);
      });

      return options.join('');
    }

    function formatInventoryDecimal(value) {
      const number = parseFloat(value);
      if (isNaN(number)) return '0';
      return Number.isInteger(number) ? String(number) : number.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
    }

    function getMainInventoryRawQuantity(product) {
      if (!product) return null;
      const branchRaw = product.inventoryBranchQuantities && product.inventoryBranchQuantities.main !== undefined
        ? product.inventoryBranchQuantities.main
        : undefined;
      if (branchRaw !== undefined && branchRaw !== null && branchRaw !== '') return branchRaw;
      if (product.inventoryQuantity !== undefined && product.inventoryQuantity !== null && product.inventoryQuantity !== '') {
        return product.inventoryQuantity;
      }
      if (product.stock !== undefined && product.stock !== null && product.stock !== '') {
        return product.stock;
      }
      return null;
    }

    function parseInventoryQuantity(product, branchId = 'main') {
      if (!product) return 0;
      if (branchId === 'all') {
        const total = INVENTORY_BRANCHES.reduce((sum, branch) => {
          return sum + parseInventoryQuantity(product, branch.id);
        }, 0);
        return parseFloat(total.toFixed(3));
      }

      let raw = null;
      if (branchId === 'main') {
        raw = getMainInventoryRawQuantity(product);
      } else {
        raw = product.inventoryBranchQuantities && product.inventoryBranchQuantities[branchId] !== undefined
          ? product.inventoryBranchQuantities[branchId]
          : null;
      }

      const value = parseFloat(raw);
      return isNaN(value) ? 0 : value;
    }

    function getInventoryQuantityText(product, branchId = 'main') {
      if (!product) return '';
      if (branchId === 'all') {
        return formatInventoryDecimal(parseInventoryQuantity(product, 'all'));
      }

      const raw = branchId === 'main'
        ? getMainInventoryRawQuantity(product)
        : (product.inventoryBranchQuantities && product.inventoryBranchQuantities[branchId] !== undefined
            ? product.inventoryBranchQuantities[branchId]
            : 0);

      if (raw === '' || raw === null || raw === undefined) {
        return branchId === 'main' ? '' : '0';
      }

      const value = parseFloat(raw);
      if (isNaN(value)) return branchId === 'main' ? '' : '0';
      return Number.isInteger(value) ? String(value) : value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
    }

    function ensureInventoryBranchQuantities(product) {
      const quantities = {};
      INVENTORY_BRANCHES.forEach(branch => {
        quantities[branch.id] = parseInventoryQuantity(product, branch.id);
      });
      return quantities;
    }

    function getInventoryQuantityByFilterText(product, branchId = 'main') {
      if (branchId === 'all') {
        const quantities = ensureInventoryBranchQuantities(product);
        const branchRows = INVENTORY_BRANCHES.map(branch => `
            <div><span class="font-bold">${branch.name}:</span> ${formatInventoryDecimal(quantities[branch.id])}</div>
        `).join('');
        return `
          <div class="text-xs leading-6">
            ${branchRows}
          </div>
        `;
      }
      return formatInventoryDecimal(parseInventoryQuantity(product, branchId));
    }

    function getInventoryUnitName(unitId) {
      if (!unitId) return '';
      const unit = allInventoryUnits.find(item => item.id === unitId);
      if (!unit) return '';
      const ar = unit.nameAr || '';
      const en = unit.nameEn || '';
      return en ? `${ar} / ${en}` : ar;
    }

    function getTrackedInventoryProducts() {
      return allProducts.filter(product => product.inventoryEnabled);
    }

    // Generate invoice number based on branch
    async function generateInvoiceNumber(branch) {
      // Get branch counter from Firebase
      const counterRef = db.ref('invoiceCounters/' + encodeURIComponent(branch));
      const snapshot = await counterRef.once('value');
      const currentCounter = (snapshot.val() || 0) + 1;
      
      // Update counter in Firebase
      await counterRef.set(currentCounter);
      
      // Format based on branch
      let prefix = '';
      let paddingLength = 0;
      
      if (branch === 'الفرع الرئيسي') {
        prefix = '0';
        paddingLength = 3; // Total 3 digits (e.g., 025)
      } else if (branch === 'اليرموك') {
        prefix = '00';
        paddingLength = 4; // Total 4 digits (e.g., 0025)
      } else if (branch === 'أبو الحصانية') {
        prefix = '000';
        paddingLength = 5; // Total 5 digits (e.g., 00025)
      } else if (branch === 'المخزن الرئيسي') {
        prefix = '0000';
        paddingLength = 6; // Total 6 digits (e.g., 000025)
      } else {
        // Default format
        prefix = '0';
        paddingLength = 3;
      }
      
      // Pad the number with zeros
      const paddedNumber = currentCounter.toString().padStart(paddingLength, '0');
      
      return paddedNumber;
    }

    // 1. نظام المراقبة اللحظية
function setupRealtimeListeners() {
  if (realtimeListenersStarted) return;
  realtimeListenersStarted = true;

  // 1. مراقبة الطلبات
  const latestOrderTimestamp = allOrders.reduce((max, order) => Math.max(max, order.timestamp || 0), 0);
  const todayRange = getTodayOrdersRange();
  const ordersRef = db.ref('orders').orderByChild('timestamp').startAt(Math.max(latestOrderTimestamp + 1, todayRange.start));

  ordersRef.on('child_added', (snapshot) => {
    const order = { id: snapshot.key, ...snapshot.val() };
    const index = allOrders.findIndex(item => item.id === order.id);
    if (index >= 0) {
      allOrders[index] = order;
    } else {
      allOrders.push(order);
    }
    refreshUI();
  });

  db.ref('orders').on('child_changed', (snapshot) => {
    const order = { id: snapshot.key, ...snapshot.val() };
    const index = allOrders.findIndex(item => item.id === order.id);
    if (index >= 0) {
      allOrders[index] = order;
    } else {
      allOrders.push(order);
    }
    refreshUI();
  });

  db.ref('orders').on('child_removed', (snapshot) => {
    allOrders = allOrders.filter(order => order.id !== snapshot.key);
    refreshUI();
  });

  // 2. مراقبة الكاشيرات (هذا هو الجزء الذي كان ينقصك)
  db.ref('cashiers').on('value', (snapshot) => {
    allCashiers = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
    refreshUI();
  });

  // 3. مراقبة المنتجات
  db.ref('products').on('value', (snapshot) => {
    allProducts = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
    refreshUI();
  });

  db.ref('productInfos').on('value', (snapshot) => {
    allProductInfos = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
    refreshUI();
  });

  // 3.1 مراقبة سجل زيادات وتخفيضات الأسعار
  db.ref('productPriceChanges').on('value', (snapshot) => {
    allProductPriceChanges = snapshot.val()
      ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }))
      : [];
    allProductPriceChanges.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    refreshUI();
  });

  db.ref('deliveryPrices').on('value', (snapshot) => {
    allDeliveryPrices = snapshot.val() || {};
    refreshUI();
  });

  db.ref('dailySessions').on('value', (snapshot) => {
    allDailySessions = snapshot.val()
      ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })).sort((a, b) => (b.openedAt || 0) - (a.openedAt || 0))
      : [];
    if (currentDailySession) {
      currentDailySession = allDailySessions.find(session => session.id === currentDailySession.id) || currentDailySession;
    }
    refreshUI();
  });

  // 4. مراقبة الأجهزة المعرفة وفروعها لاستخدامها في التعرف على أقرب فرع لنسخة الهاتف
  db.ref('registeredDevices').on('value', (snapshot) => {
    allRegisteredDevices = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
    refreshUI();
  });

  // 4. مراقبة العملاء
  db.ref('customers').on('value', (snapshot) => {
    allCustomers = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
    refreshUI();
  });

  // 5. مراقبة الأقسام (Categories)
	  db.ref('categories').on('value', (snapshot) => {
	    allCategories = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
	    refreshUI();
	  });

	  db.ref('productCategories').on('value', (snapshot) => {
	    allProductCategories = snapshot.val()
	      ? Object.entries(snapshot.val()).map(([id, data]) => ({
	          id,
	          ...data,
	          productIds: Array.isArray(data.productIds)
	            ? data.productIds
	            : (data.productIds ? Object.values(data.productIds) : [])
	        }))
	      : [];
	    refreshUI();
	  });

  // 6. مراقبة تصنيفات المخزون
  db.ref('inventoryCategories').on('value', (snapshot) => {
    allInventoryCategories = snapshot.val()
      ? Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
          productIds: Array.isArray(data.productIds)
            ? data.productIds
            : (data.productIds ? Object.values(data.productIds) : [])
        }))
      : [];
    refreshUI();
  });

  // 7. مراقبة وحدات المخزون
  db.ref('inventoryUnits').on('value', (snapshot) => {
    allInventoryUnits = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
    refreshUI();
  });

  // 8. مراقبة كاشيرات الصرف
  db.ref('inventoryIssueCashiers').on('value', (snapshot) => {
    allIssueCashiers = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
    refreshUI();
  });

  // 9. مراقبة سندات الصرف
  db.ref('inventoryIssues').on('value', (snapshot) => {
    allInventoryIssues = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
    allInventoryIssues.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    refreshUI();
  });

  // 10. مراقبة سندات التحويلات
  db.ref('inventoryTransfers').on('value', (snapshot) => {
    allInventoryTransfers = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
    allInventoryTransfers.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    refreshUI();
  });

  // 11. مراقبة الموردين
  db.ref('inventorySuppliers').on('value', (snapshot) => {
    allInventorySuppliers = snapshot.val()
      ? Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
          productIds: Array.isArray(data.productIds)
            ? data.productIds
            : (data.productIds ? Object.values(data.productIds) : [])
        }))
      : [];
    refreshUI();
  });

  // 12. مراقبة سندات الشراء
	  db.ref('inventoryPurchases').on('value', (snapshot) => {
	    allInventoryPurchases = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
	    allInventoryPurchases.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
	    refreshUI();
	  });

	  db.ref('stockMaterials').on('value', (snapshot) => {
	    allStockMaterials = snapshot.val() ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })) : [];
	    refreshUI();
	  });

	  db.ref('transferRequests').on('value', (snapshot) => {
	    allTransferRequests = snapshot.val()
	      ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
	      : [];
	    refreshUI();
	  });
	}

// 2. دالة تحديث واجهة المستخدم بدون ريفريش
function refreshUI() {
  scheduleDataCacheSave();
  if (isLoadingFreshData) return;

  // لا تقم بتحديث الشاشة إذا كان المستخدم يفتح نافذة (Modal) لكي لا يضيع ما يكتبه
  if (
    document.querySelector('.modal-overlay') ||
    document.querySelector('.issue-voucher-overlay') ||
    document.querySelector('.transfer-voucher-overlay') ||
    document.querySelector('.purchase-voucher-overlay')
  ) return;

  if (currentScreen === 'cashier') {
    renderCashier();
  } else if (currentScreen === 'accounting') {
    renderAccounting(currentAccountingSection);
  }
}

    // Save Functions
    async function saveProduct(product) {
      try {
        const id = product.id || generateId();
        await db.ref(`products/${id}`).set({ ...product, id });
        await loadData();
        return true;
      } catch (error) {
        console.error('Error saving product:', error);
        showToast('خطأ في حفظ المنتج', true);
        return false;
      }
    }

    async function deleteProduct(id) {
      try {
        await db.ref(`products/${id}`).remove();
        await loadData();
        return true;
      } catch (error) {
        console.error('Error deleting product:', error);
        showToast('خطأ في حذف المنتج', true);
        return false;
      }
    }

    async function saveCategory(category) {
      try {
        const id = category.id || generateId();
        await db.ref(`categories/${id}`).set({ ...category, id });
        await loadData();
        return true;
      } catch (error) {
        console.error('Error saving category:', error);
        showToast('خطأ في حفظ القسم', true);
        return false;
      }
    }

    async function deleteCategory(id) {
      try {
        await db.ref(`categories/${id}`).remove();
        await loadData();
        return true;
      } catch (error) {
        console.error('Error deleting category:', error);
        showToast('خطأ في حذف القسم', true);
        return false;
      }
    }

    async function saveInventoryCategory(category) {
      try {
        const id = category.id || generateId();
        await db.ref(`inventoryCategories/${id}`).set({
          ...category,
          id,
          productIds: Array.isArray(category.productIds) ? category.productIds : []
        });
        await loadData();
        return true;
      } catch (error) {
        console.error('Error saving inventory category:', error);
        showToast('خطأ في حفظ تصنيف المخزون', true);
        return false;
      }
    }

    async function saveInventoryUnit(unit) {
      try {
        const id = unit.id || generateId();
        await db.ref(`inventoryUnits/${id}`).set({ ...unit, id });
        await loadData();
        return { success: true, id };
      } catch (error) {
        console.error('Error saving inventory unit:', error);
        showToast('خطأ في حفظ الوحدة', true);
        return { success: false, id: null };
      }
    }

    async function saveIssueCashier(cashier) {
      try {
        const id = cashier.id || generateId();
        await db.ref(`inventoryIssueCashiers/${id}`).set({ ...cashier, id });
        await loadData();
        return { success: true, id };
      } catch (error) {
        console.error('Error saving issue cashier:', error);
        showToast('خطأ في حفظ اسم الكاشير', true);
        return { success: false, id: null };
      }
    }

    async function saveInventorySupplier(supplier) {
      try {
        const id = supplier.id || generateId();
        await db.ref(`inventorySuppliers/${id}`).set({
          ...supplier,
          id,
          productIds: Array.isArray(supplier.productIds) ? supplier.productIds : []
        });
        await loadData();
        return { success: true, id };
      } catch (error) {
        console.error('Error saving supplier:', error);
        showToast('خطأ في حفظ المورد', true);
        return { success: false, id: null };
      }
    }

    async function generateInventoryIssueNumber() {
      const counterRef = db.ref('inventoryIssueCounter');
      const snapshot = await counterRef.once('value');
      const currentCounter = (snapshot.val() || 0) + 1;
      await counterRef.set(currentCounter);
      return `SRF-${String(currentCounter).padStart(6, '0')}`;
    }

    async function generateInventoryTransferNumber() {
      const counterRef = db.ref('inventoryTransferCounter');
      const snapshot = await counterRef.once('value');
      const currentCounter = (snapshot.val() || 0) + 1;
      await counterRef.set(currentCounter);
      return `TRF-${String(currentCounter).padStart(6, '0')}`;
    }

    async function generateInventoryPurchaseNumber() {
      const counterRef = db.ref('inventoryPurchaseCounter');
      const snapshot = await counterRef.once('value');
      const currentCounter = (snapshot.val() || 0) + 1;
      await counterRef.set(currentCounter);
      return `SHR-${String(currentCounter).padStart(6, '0')}`;
    }

    async function saveCustomer(customer) {
      try {
        const id = customer.id || generateId();
        customer.id = id;
        await db.ref(`customers/${id}`).set({ ...customer, id });
        await loadData();
        return true;
      } catch (error) {
        console.error('Error saving customer:', error);
        showToast('خطأ في حفظ العميل', true);
        return false;
      }
    }

    async function deleteCustomer(id) {
      try {
        await db.ref(`customers/${id}`).remove();
        await loadData();
        return true;
      } catch (error) {
        console.error('Error deleting customer:', error);
        showToast('خطأ في حذف العميل', true);
        return false;
      }
    }

    async function saveCashier(cashier) {
      try {
        const id = cashier.id || generateId();
        await db.ref(`cashiers/${id}`).set({ ...cashier, id });
        await loadData();
        return true;
      } catch (error) {
        console.error('Error saving cashier:', error);
        showToast('خطأ في حفظ الكاشير', true);
        return false;
      }
    }

    async function deleteCashier(id) {
      try {
        await db.ref(`cashiers/${id}`).remove();
        await loadData();
        return true;
      } catch (error) {
        console.error('Error deleting cashier:', error);
        showToast('خطأ في حذف الكاشير', true);
        return false;
      }
    }

    async function deleteOrder(id) {
      try {
        await db.ref(`orders/${id}`).remove();
        await loadData();
        return true;
      } catch (error) {
        console.error('Error deleting order:', error);
        showToast('خطأ في حذف الطلب', true);
        return false;
      }
    }

    // Render Functions
    function renderHome() {
      const app = document.getElementById('app');
      if (app) {
        app.innerHTML = `
          <div class="h-full w-full flex items-center justify-center bg-gray-100 p-6">
            <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
              <img src="logo.png" alt="logo" class="w-28 h-28 mx-auto mb-4 object-contain" onerror="this.style.display='none';">
              <h1 class="text-2xl font-bold text-gray-800 mb-2">جاري فتح الكاشير</h1>
              <p class="text-gray-500">يتم التحقق من تعريف الجهاز...</p>
            </div>
          </div>
        `;
      }
      showCashierLogin();
    }

    function showAccountingLogin() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">أدخل كلمة المرور</h2>
          <input type="password" id="passwordInput" placeholder="كلمة المرور" onkeydown="if(event.key === 'Enter') loginAccounting()" class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
          <div class="flex gap-3">
            <button onclick="loginAccounting()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">دخول</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function normalizeCashierBranchName(name) {
      const value = String(name || '').trim();
      if (!value) return '';
      if (value.includes('يرموك')) return 'اليرموك';
      if (value.includes('الحصانية')) return 'أبو الحصانية';
      if (value.includes('المخزن')) return 'المخزن الرئيسي';
      if (value.includes('الرئيسي')) return 'الفرع الرئيسي';
      return value;
    }

    function getDeviceBranchFromRecord(deviceData) {
      return normalizeCashierBranchName(
        deviceData?.branchNameAr ||
        deviceData?.branchName ||
        deviceData?.branch ||
        deviceData?.branchNameEn ||
        ''
      );
    }

    function getBranchNameFromBranchRecord(branchData) {
      return normalizeCashierBranchName(
        branchData?.nameAr ||
        branchData?.name ||
        branchData?.nameEn ||
        ''
      );
    }

    async function resolveCurrentDeviceBranch() {
      const cachedBranch = localStorage.getItem('deviceBranch');
      const normalizedCachedBranch = normalizeCashierBranchName(cachedBranch);

      const deviceId = getDeviceId();
      const deviceSnapshot = await db.ref(`devices/${deviceId}`).once('value');
      const deviceData = deviceSnapshot.val() || null;
      let deviceBranch = getDeviceBranchFromRecord(deviceData);
      let branchId = deviceData?.branchId || '';

      if (!deviceBranch) {
        const registeredDeviceSnapshot = await db.ref(`registeredDevices/${deviceId}`).once('value');
        const registeredDeviceData = registeredDeviceSnapshot.val() || null;
        deviceBranch = getDeviceBranchFromRecord(registeredDeviceData);
        branchId = branchId || registeredDeviceData?.branchId || '';
      }

      if (!deviceBranch && branchId) {
        const branchSnapshot = await db.ref(`branches/${branchId}`).once('value');
        deviceBranch = getBranchNameFromBranchRecord(branchSnapshot.val() || null);
      }

      if (!deviceBranch && normalizedCachedBranch) {
        deviceBranch = normalizedCachedBranch;
      }

      if (deviceBranch) {
        localStorage.setItem('deviceBranch', deviceBranch);
        if (branchId) localStorage.setItem('deviceBranchId', branchId);
      }
      return deviceBranch;
    }

    function renderUnregisteredDeviceNotice() {
      const app = document.getElementById('app');
      if (!app) return;
      const deviceId = getDeviceId();
      app.innerHTML = `
        <div class="h-full w-full flex items-center justify-center bg-gray-100 p-6">
          <div class="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
            <h1 class="text-2xl font-bold text-red-600 mb-3">هذا الجهاز غير معرف</h1>
            <p class="text-gray-600 mb-5">اربط هذا الجهاز بفرع من إدارة الموقع الجديد ثم اضغط إعادة المحاولة.</p>
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5 text-right">
              <div class="text-sm text-gray-500 mb-1">رقم الجهاز الحالي</div>
              <div class="font-bold text-gray-900 break-all" dir="ltr">${escapeHtml(deviceId)}</div>
            </div>
            <button onclick="renderHome()" class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">إعادة المحاولة</button>
          </div>
        </div>
      `;
    }

    async function showCashierLogin() {
      let deviceBranch = '';
      try {
        deviceBranch = await resolveCurrentDeviceBranch();
      } catch (error) {
        console.error('Error resolving cashier device branch:', error);
      }
      
      if (!deviceBranch) {
        renderUnregisteredDeviceNotice();
        showToast('هذا الجهاز غير معرف. يرجى التواصل مع المحاسبة لتعريف الجهاز', true);
        return;
      }
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تسجيل دخول الكاشير</h2>
          <div class="bg-blue-50 p-3 rounded-lg mb-4 text-center">
            <div class="text-sm text-gray-600">الفرع</div>
            <div class="text-xl font-bold text-blue-600">${deviceBranch}</div>
          </div>
          <div class="mb-4">
            <label class="block mb-2 font-bold text-gray-700">رمز الكاشير</label>
            <input type="password" id="cashierCode" placeholder="أدخل الرمز" onkeydown="if(event.key === 'Enter') loginCashier()" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
          </div>
          <div class="flex gap-3">
            <button onclick="loginCashier()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">دخول</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      setTimeout(() => document.getElementById('cashierCode')?.focus(), 50);
    }

    async function loginAccounting() {
      const password = document.getElementById('passwordInput').value;
      
      if (password !== '5466') {
        showToast('كلمة المرور غير صحيحة', true);
        return;
      }
      
      document.querySelector('.modal-overlay')?.remove();
      await enterAccountingWithCachedData();
    }

    function isYarmoukCashierSession() {
      return currentBranch === 'اليرموك' && currentCashier;
    }

    function hasOpenDailySession() {
      return currentDailySession && currentDailySession.status === 'open';
    }

    async function loadActiveDailySession() {
      if (!isYarmoukCashierSession()) {
        currentDailySession = null;
        return null;
      }
      const snapshot = await db.ref('dailySessions').once('value');
      const sessions = snapshot.val()
        ? Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }))
        : [];
      allDailySessions = sessions.sort((a, b) => (b.openedAt || 0) - (a.openedAt || 0));
      currentDailySession = allDailySessions.find(session =>
        session.status === 'open' &&
        session.branch === currentBranch &&
        session.cashierCode === currentCashier.code
      ) || null;
      return currentDailySession;
    }

    function showOpenDailySessionModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-md text-center">
          <h2 class="text-2xl font-bold text-blue-600 mb-3">فتح اليومية</h2>
          <p class="text-gray-600 mb-6">اكتب المبلغ الموجود في الكاشير قبل بداية العمل.</p>
          <label class="block mb-2 font-bold text-gray-700 text-right">مبلغ بداية الكاش (د.ك)</label>
          <input
            type="text"
            id="dailyOpeningAmount"
            oninput="this.value = convertToEnglishNumbers(this.value)"
            class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-xl font-bold text-center mb-5"
            placeholder="0.000"
          >
          <button onclick="openDailySession()" class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">فتح اليومية</button>
          <button onclick="this.closest('.modal-overlay').remove(); confirmLogoutCashier(true)" class="w-full mt-3 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">خروج</button>
        </div>
      `;
      document.body.appendChild(modal);
      setTimeout(() => document.getElementById('dailyOpeningAmount')?.focus(), 50);
    }

    async function openDailySession() {
      const openingAmount = parseFloat(convertToEnglishNumbers(document.getElementById('dailyOpeningAmount')?.value || '0')) || 0;
      const id = generateId();
      const session = {
        id,
        branch: currentBranch,
        cashierName: currentCashier.name || '',
        cashierCode: currentCashier.code || '',
        openedAt: Date.now(),
        openingAmount,
        status: 'open',
        payments: []
      };

      try {
        await db.ref(`dailySessions/${id}`).set(session);
        currentDailySession = session;
        allDailySessions.unshift(session);
        document.querySelector('.modal-overlay')?.remove();
        renderCashier();
        showToast('تم فتح اليومية');
      } catch (error) {
        console.error('Error opening daily session:', error);
        showToast('تعذر فتح اليومية', true);
      }
    }

    async function loginCashier() {
      const code = document.getElementById('cashierCode').value;
      const deviceBranch = await resolveCurrentDeviceBranch();
      if (!deviceBranch) {
        showToast('هذا الجهاز غير معرف. يرجى ربط الجهاز بفرع من الإدارة', true);
        return;
      }
      
      await loadData({ ordersMode: 'all' });
      
      const cashier = allCashiers.find(c => c.code === code);
      
      if (!cashier) {
        showToast('رمز الكاشير غير صحيح', true);
        return;
      }
      
      currentCashier = cashier;
      currentBranch = deviceBranch;
      document.querySelector('.modal-overlay').remove();
      currentScreen = 'cashier';
      if (currentBranch === 'اليرموك') {
        await loadActiveDailySession();
      } else {
        currentDailySession = null;
      }
      renderCashier();
      setupRealtimeListeners();
	      if (currentBranch === 'اليرموك' && !hasOpenDailySession()) {
	        showOpenDailySessionModal();
	      }
    }
    
    function getDeviceId() {
      let deviceId = localStorage.getItem('deviceId');
      if (!deviceId) {
        deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('deviceId', deviceId);
      }
      return deviceId;
    }

    function initCashierPresence() {
      const deviceId = getDeviceId();
      const deviceRef = db.ref(`devices/${deviceId}`);
      const statusRef = db.ref(`status/${deviceId}`);
      const label = localStorage.getItem('deviceLabel') || `CASH-${deviceId.slice(-4)}`;

      deviceRef.update({
        label,
        page: 'cashier',
        deviceId,
        lastSeen: firebase.database.ServerValue.TIMESTAMP
      }).catch(error => console.error('Error updating cashier device presence:', error));

      db.ref('.info/connected').on('value', (snap) => {
        if (snap.val() === true) {
          statusRef.onDisconnect().set({
            online: false,
            lastSeen: firebase.database.ServerValue.TIMESTAMP,
            page: 'cashier'
          });
          statusRef.set({
            online: true,
            lastSeen: firebase.database.ServerValue.TIMESTAMP,
            page: 'cashier'
          });
        }
      });
    }

    // ==================== CASHIER INTERFACE ====================
    
    function setDailyInvoiceSearchTerm(value) {
      dailyInvoiceSearchTerm = convertToEnglishNumbers(value || '').replace(/[^\d]/g, '');
      cashierOrdersPage = 1;
      const input = document.getElementById('dailyInvoiceSearchInput');
      if (input && input.value !== dailyInvoiceSearchTerm) input.value = dailyInvoiceSearchTerm;
      renderCashier();
    }

    function changeCashierOrdersPage(direction) {
      cashierOrdersPage = Math.max(1, cashierOrdersPage + direction);
      renderCashier();
    }

    function renderCashier() {
      const app = document.getElementById('app');
      const visibleOrders = allOrders
        .filter(o => o.branch === currentBranch)
        .filter(o => !dailyInvoiceSearchTerm || (o.invoiceNumber || '').toString().includes(dailyInvoiceSearchTerm))
        .sort((a, b) => b.timestamp - a.timestamp);
      const cashierPageSize = 10;
      const cashierTotalPages = Math.max(1, Math.ceil(visibleOrders.length / cashierPageSize));
      if (cashierOrdersPage > cashierTotalPages) cashierOrdersPage = cashierTotalPages;
      const cashierPagedOrders = visibleOrders.slice((cashierOrdersPage - 1) * cashierPageSize, cashierOrdersPage * cashierPageSize);
      
      app.innerHTML = `
        <div class="flex flex-col h-full bg-gray-100">
          <!-- Header -->
          <div class="no-print bg-blue-600 text-white p-4 flex justify-between items-center">
           <div class="text-xl font-bold">${currentCashier.name} (${currentBranch})</div>
            <div class="flex gap-3">
	              ${currentBranch === 'اليرموك' && hasOpenDailySession() ? `
	                <button onclick="showDailyBalanceStart()" class="bg-amber-500 px-4 py-2 rounded-lg font-bold hover:bg-amber-600 transition">
	                  موازنة
	                </button>
	              ` : ''}
              <button onclick="logoutCashier()" class="bg-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition">
                🚪 خروج
              </button>
            </div>
          </div>
          
          <!-- Main Content -->
          <div class="flex-1 p-6 overflow-y-auto">
            <div class="max-w-6xl mx-auto">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">الطلبات</h2>
	              <button onclick="startNewInvoiceFromCashier()" class="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition">
	                ➕ فاتورة جديدة
	              </button>
	              <button onclick="showShortageRequestsPage()" class="bg-purple-800 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-purple-900 transition">
	                طلب نواقص
	              </button>
	            </div>
              ${currentBranch === 'اليرموك' && hasOpenDailySession() ? `
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5 text-blue-800 font-bold">
                  اليومية مفتوحة من ${formatTime(currentDailySession.openedAt)} | مبلغ البداية: ${formatNumberWithThreeDecimals(currentDailySession.openingAmount)} د.ك
                </div>
                <div class="bg-white rounded-xl shadow-lg p-4 mb-5">
                  <label class="block mb-2 font-bold text-gray-700">بحث برقم الفاتورة</label>
                  <div class="flex gap-3">
                    <input
                      type="text"
                      id="dailyInvoiceSearchInput"
                      value="${escapeHtml(dailyInvoiceSearchTerm)}"
                      oninput="this.value = convertToEnglishNumbers(this.value).replace(/[^\\d]/g, '')"
                      onkeydown="if(event.key === 'Enter') setDailyInvoiceSearchTerm(this.value)"
                      placeholder="اكتب رقم الفاتورة"
                      class="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                    <button onclick="setDailyInvoiceSearchTerm(document.getElementById('dailyInvoiceSearchInput')?.value || '')" class="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition">بحث</button>
                    <button onclick="setDailyInvoiceSearchTerm('')" class="bg-gray-200 text-gray-700 px-5 py-3 rounded-lg font-bold hover:bg-gray-300 transition">مسح</button>
                  </div>
                </div>
              ` : ''}
              
              <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>رقم الفاتورة</th>
                        <th>العميل</th>
                        <th>التاريخ</th>
                        <th>المجموع</th>
                        ${currentBranch === 'اليرموك' ? '<th>المندوب</th>' : ''}
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
  ${cashierPagedOrders.map(order => `
    <tr>
      <td>${order.invoiceNumber}</td>
      <td>${order.customerName}</td>
      <td>${formatDate(order.timestamp)} ${formatTime(order.timestamp)}</td>
      <td>${order.total.toFixed(3)} د.ك</td>
      ${currentBranch === 'اليرموك' ? `
        <td>
          ${order.orderType === 'delivery' && hasOpenDailySession() && order.dailySessionId === currentDailySession?.id ? `
            ${(order.courierHandoverStarted || order.courierName) ? `
              <input
                type="text"
                value="${escapeHtml(order.courierName || '')}"
                onchange="updateOrderCourierName('${order.id}', this.value)"
                placeholder="اسم المندوب"
                class="w-36 p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              >
            ` : `
              <button onclick="markOrderHandedToCourier('${order.id}')" class="bg-green-600 text-white px-3 py-2 rounded-lg font-bold hover:bg-green-700 transition">
                تم تسليمه للمندوب
              </button>
            `}
          ` : '-'}
        </td>
      ` : ''}
      <td>
        <button onclick="openCashierQuickEditOrder('${order.id}')" class="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition ml-2">
          تعديل
        </button>
        <button onclick="reprintInvoice('${order.id}')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          🖨️ طباعة
        </button>
      </td>
    </tr>
  `).join('')}
</tbody>
                  </table>
                </div>
                <div class="flex items-center justify-between mt-4">
                  <button onclick="changeCashierOrdersPage(-1)" ${cashierOrdersPage <= 1 ? 'disabled' : ''} class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed">السابق</button>
                  <div class="font-bold text-gray-700">صفحة ${cashierOrdersPage} من ${cashierTotalPages} | المعروض ${cashierPagedOrders.length} من ${visibleOrders.length}</div>
                  <button onclick="changeCashierOrdersPage(1)" ${cashierOrdersPage >= cashierTotalPages ? 'disabled' : ''} class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed">التالي</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
	    }

	    function getCurrentBranchIdForTransferRequest() {
	      const cached = localStorage.getItem('deviceBranchId') || '';
	      if (cached) return cached;
	      const branch = String(currentBranch || '').trim();
	      if (branch.includes('يرموك')) return 'yarmouk';
	      if (branch.includes('حصانية')) return 'abu_hasaniya';
	      if (branch.includes('رئيسي')) return 'main';
	      return branch || 'cashier_branch';
	    }

	    function getShortageBranchLabel(request) {
	      return request.branch || request.branchName || currentBranch || request.branchId || '-';
	    }

	    function getShortageStatusLabel(status) {
	      if (status === 'sent') return 'تم الارسال';
	      if (status === 'received') return 'تم الاستلام';
	      if (status === 'accepted') return 'قيد التنفيذ';
	      if (status === 'rejected') return 'مرفوض';
	      return 'بانتظار تنفيذ الطلب';
	    }

	    function getCashierBranchShortageRequests() {
	      const branchId = getCurrentBranchIdForTransferRequest();
	      return allTransferRequests
	        .filter(request => {
	          const sameBranchId = String(request.branchId || '') === String(branchId || '');
	          const sameBranchName = String(request.branch || request.branchName || '') === String(currentBranch || '');
	          return sameBranchId || sameBranchName;
	        })
	        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
	    }

	    function showShortageRequestsPage() {
	      const existingPage = document.getElementById('shortageRequestsPage');
	      if (existingPage) existingPage.remove();
	      currentScreen = 'cashier';
	      const requests = getCashierBranchShortageRequests();
	      const page = document.createElement('div');
	      page.className = 'invoice-page';
	      page.id = 'shortageRequestsPage';
	      page.innerHTML = `
	        <div class="h-full flex flex-col bg-gray-100">
	          <div class="no-print bg-purple-900 text-white p-4 flex justify-between items-center">
	            <h2 class="text-2xl font-bold">طلب نواقص</h2>
	            <button onclick="closeShortageRequestsPage()" class="text-3xl font-bold hover:text-red-300">✕</button>
	          </div>
	          <div class="flex-1 overflow-y-auto p-6">
	            <div class="max-w-6xl mx-auto">
	              <div class="flex justify-between items-center mb-6">
	                <h3 class="text-3xl font-bold text-gray-800">طلبات النواقص</h3>
	                <button onclick="showNewShortageRequestPage()" class="bg-purple-800 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-purple-900 transition">
	                  طلب نواقص جديد
	                </button>
	              </div>
	              <div class="bg-white rounded-xl shadow-lg p-6">
	                <div class="overflow-x-auto">
	                  <table>
	                    <thead>
	                      <tr>
	                        <th>رقم طلب التحويل</th>
	                        <th>الفرع</th>
	                        <th>اسم الكاشير</th>
	                        <th>التاريخ والوقت</th>
	                        <th>العناصر</th>
	                        <th>الحالة</th>
	                        <th>الإجراءات</th>
	                      </tr>
	                    </thead>
	                    <tbody>
	                      ${requests.length ? requests.map(request => `
	                        <tr>
	                          <td>${escapeHtml(request.requestNumber || '-')}</td>
	                          <td>${escapeHtml(getShortageBranchLabel(request))}</td>
	                          <td>${escapeHtml(request.cashierName || '-')}</td>
	                          <td>${formatDate(request.createdAt)} ${formatTime(request.createdAt)}</td>
	                          <td>${(request.items || []).length}</td>
	                          <td>${getShortageStatusLabel(request.status)}</td>
	                          <td>
	                            ${request.status === 'sent' ? `
	                              <button onclick="openCashierReceiveShortage('${request.id}')" class="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition">استلام</button>
	                            ` : ''}
	                          </td>
	                        </tr>
	                      `).join('') : '<tr><td colspan="7" class="text-center text-gray-500 py-8">لا توجد طلبات نواقص</td></tr>'}
	                    </tbody>
	                  </table>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
	      `;
	      document.body.appendChild(page);
	    }

	    function closeShortageRequestsPage() {
	      document.getElementById('shortageRequestsPage')?.remove();
	    }

	    function resetShortageDraft() {
	      currentShortageDraft = { items: [] };
	      shortageSearchTerm = '';
	      shortageSearchMode = 'products';
	    }

	    function showNewShortageRequestPage() {
	      resetShortageDraft();
	      renderShortageDraftPage();
	    }

	    function renderShortageDraftPage() {
	      const existingPage = document.getElementById('shortageDraftPage');
	      if (existingPage) existingPage.remove();
	      const page = document.createElement('div');
	      page.className = 'invoice-page shortage-draft-page';
	      page.id = 'shortageDraftPage';
	      page.innerHTML = `
	        <div class="h-full flex flex-col">
	          <div class="no-print bg-purple-900 text-white p-4 flex justify-between items-center">
	            <h2 class="text-2xl font-bold">طلب نواقص جديد</h2>
	            <button onclick="closeShortageDraftPage()" class="text-3xl font-bold hover:text-red-300">✕</button>
	          </div>
	          <div class="flex-1 flex overflow-hidden">
	            <div class="w-96 bg-white border-l-2 border-purple-200 flex flex-col">
	              <div class="p-4 border-b border-purple-200">
	                <h3 class="text-lg font-bold text-gray-800">العناصر المطلوبة</h3>
	              </div>
	              <div id="shortageItemsContainer" class="flex-1 overflow-y-auto p-4"></div>
	              <div class="p-4 border-t border-purple-200">
	                <button id="submitShortageBtn" onclick="submitShortageRequest()" class="w-full bg-purple-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-900 transition">
	                  طلب النواقص
	                </button>
	              </div>
	            </div>
	            <div class="flex-1 p-6 overflow-y-auto bg-purple-50">
	              <div class="invoice-product-toolbar" style="direction: rtl;">
	                <button onclick="setShortageSearchMode('products')" class="${shortageSearchMode === 'products' ? 'bg-purple-800 text-white' : 'bg-white text-purple-800'} px-5 py-3 rounded-lg font-bold border-2 border-purple-700">بحث منتجات</button>
	                <button onclick="setShortageSearchMode('materials')" class="${shortageSearchMode === 'materials' ? 'bg-purple-800 text-white' : 'bg-white text-purple-800'} px-5 py-3 rounded-lg font-bold border-2 border-purple-700">بحث مواد مخزون</button>
	                <input type="text" id="shortageSearchBox" value="${escapeHtml(shortageSearchTerm)}" oninput="setShortageSearchTerm(this.value)" placeholder="🔍 بحث..." class="invoice-product-search w-full p-3 border-2 border-purple-300 rounded-lg focus:border-purple-800 focus:outline-none text-lg">
	              </div>
	              <div id="shortageSearchResults">${renderShortageSearchResultsHtml()}</div>
	            </div>
	          </div>
	        </div>
	      `;
	      document.body.appendChild(page);
	      renderShortageItems();
	      setTimeout(() => document.getElementById('shortageSearchBox')?.focus(), 50);
	    }

	    function closeShortageDraftPage() {
	      document.getElementById('shortageDraftPage')?.remove();
	    }

	    function setShortageSearchMode(mode) {
	      shortageSearchMode = mode === 'materials' ? 'materials' : 'products';
	      renderShortageDraftPage();
	    }

	    function setShortageSearchTerm(value) {
	      shortageSearchTerm = value || '';
	      const results = document.getElementById('shortageSearchResults');
	      if (results) results.innerHTML = renderShortageSearchResultsHtml();
	    }

	    function getShortageSearchRows() {
	      const query = normalizeText(shortageSearchTerm);
	      const rows = shortageSearchMode === 'materials'
	        ? allStockMaterials.map(item => ({ ...item, itemType: 'material' }))
	        : allProducts.map(item => ({ ...item, itemType: 'product' }));
	      if (!query) return [];
	      return rows
	        .filter(item => normalizeText(`${item.nameAr || ''} ${item.nameEn || ''} ${item.name || ''} ${item.code || ''} ${item.barcode || ''}`).includes(query))
	        .slice(0, 80);
	    }

	    function renderShortageSearchResultsHtml() {
	      const rows = getShortageSearchRows();
	      if (!shortageSearchTerm.trim()) {
	        return renderShortageCategoryGridHtml();
	      }
	      if (!rows.length) {
	        return '<div class="bg-white rounded-xl border border-purple-100 p-8 text-center text-gray-500 font-bold">لا توجد نتائج</div>';
	      }
	      return `
	        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
	          ${rows.map(item => `
	            <div class="product-card" onclick="addItemToShortage('${item.itemType}', '${item.id}')">
	              <div class="text-4xl mb-2">${item.itemType === 'material' ? '🧱' : '📦'}</div>
	              <div class="font-bold mb-1">${escapeHtml(item.nameAr || item.name || item.nameEn || '-')}</div>
	              <div class="text-purple-700 font-bold text-sm">${item.itemType === 'material' ? 'مواد مخزون' : 'منتج'}</div>
	              <div class="text-gray-500 text-xs" dir="ltr">${escapeHtml(item.barcode || item.code || '')}</div>
	            </div>
	          `).join('')}
	        </div>
	      `;
	    }

	    function renderShortageCategoryGridHtml() {
	      if (shortageSearchMode === 'materials') {
	        const rootCategories = allInventoryCategories.filter(c => !c.parentId);
	        return `
	          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
	            ${rootCategories.length ? rootCategories.map(category => `
	              <div class="category-card" onclick="showShortageMaterialCategory('${category.id}')">
	                <div class="text-4xl mb-2">📁</div>
	                <div class="font-bold text-lg">${escapeHtml(category.nameAr || category.name || category.nameEn || '-')}</div>
	              </div>
	            `).join('') : '<div class="bg-white rounded-xl border border-purple-100 p-8 text-center text-gray-500 font-bold">لا توجد أقسام مواد مخزون</div>'}
	          </div>
	        `;
	      }
	      const rootCategories = getCashierCategoryRows().filter(c => !c.parentId);
	      return `
	        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
	          ${rootCategories.length ? rootCategories.map(category => `
	            <div class="category-card" onclick="showShortageProductCategory('${category.id}')">
	              <div class="text-4xl mb-2">📁</div>
	              <div class="font-bold text-lg">${escapeHtml(category.nameAr || category.name || category.nameEn || '-')}</div>
	            </div>
	          `).join('') : '<div class="bg-white rounded-xl border border-purple-100 p-8 text-center text-gray-500 font-bold">لا توجد أقسام منتجات</div>'}
	        </div>
	      `;
	    }

	    function showShortageProductCategory(categoryId) {
	      const categories = getCashierCategoryRows();
	      const category = categories.find(c => c.id === categoryId);
	      const subCategories = categories.filter(c => c.parentId === categoryId);
	      const products = getCashierProductsForCategory(categoryId);
	      const results = document.getElementById('shortageSearchResults');
	      if (!results) return;
	      results.innerHTML = `
	        <button onclick="setShortageSearchTerm('')" class="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition">← رجوع</button>
	        <h3 class="text-2xl font-bold text-gray-800 mb-4">${escapeHtml(category?.nameAr || category?.name || '-')}</h3>
	        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
	          ${subCategories.map(subCat => `
	            <div class="category-card" onclick="showShortageProductCategory('${subCat.id}')">
	              <div class="text-3xl mb-2">📁</div>
	              <div class="font-bold">${escapeHtml(subCat.nameAr || subCat.name || '-')}</div>
	            </div>
	          `).join('')}
	          ${products.map(prod => `
	            <div class="product-card" onclick="addItemToShortage('product', '${prod.id}')">
	              <div class="text-4xl mb-2">📦</div>
	              <div class="font-bold mb-1">${escapeHtml(prod.nameAr || prod.name || prod.nameEn || '-')}</div>
	              <div class="text-purple-700 font-bold text-sm">منتج</div>
	            </div>
	          `).join('')}
	        </div>
	      `;
	    }

	    function showShortageMaterialCategory(categoryId) {
	      const category = allInventoryCategories.find(c => c.id === categoryId);
	      const subCategories = allInventoryCategories.filter(c => c.parentId === categoryId);
	      const categoryItemIds = new Set((Array.isArray(category?.productIds) ? category.productIds : Object.values(category?.productIds || {})).map(String));
	      const materials = allStockMaterials.filter(item => (
	        String(item.categoryId || '') === String(categoryId)
	        || categoryItemIds.has(String(item.id))
	      ));
	      const results = document.getElementById('shortageSearchResults');
	      if (!results) return;
	      results.innerHTML = `
	        <button onclick="setShortageSearchTerm('')" class="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition">← رجوع</button>
	        <h3 class="text-2xl font-bold text-gray-800 mb-4">${escapeHtml(category?.nameAr || category?.name || '-')}</h3>
	        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
	          ${subCategories.map(subCat => `
	            <div class="category-card" onclick="showShortageMaterialCategory('${subCat.id}')">
	              <div class="text-3xl mb-2">📁</div>
	              <div class="font-bold">${escapeHtml(subCat.nameAr || subCat.name || '-')}</div>
	            </div>
	          `).join('')}
	          ${materials.map(item => `
	            <div class="product-card" onclick="addItemToShortage('material', '${item.id}')">
	              <div class="text-4xl mb-2">🧱</div>
	              <div class="font-bold mb-1">${escapeHtml(item.nameAr || item.name || item.nameEn || '-')}</div>
	              <div class="text-purple-700 font-bold text-sm">مواد مخزون</div>
	            </div>
	          `).join('')}
	        </div>
	      `;
	    }

	    function getShortageItemSource(itemType, itemId) {
	      return itemType === 'material'
	        ? allStockMaterials.find(item => item.id === itemId)
	        : allProducts.find(item => item.id === itemId);
	    }

	    function addItemToShortage(itemType, itemId, qty = 1) {
	      const source = getShortageItemSource(itemType, itemId);
	      if (!source) {
	        showToast('الصنف غير موجود', true);
	        return;
	      }
	      const existing = currentShortageDraft.items.find(item => item.itemType === itemType && item.itemId === itemId);
	      if (existing) {
	        existing.qty += qty;
	      } else {
	        currentShortageDraft.items.push({
	          itemId,
	          itemType,
	          name: source.nameAr || source.name || source.nameEn || '',
	          nameAr: source.nameAr || source.name || '',
	          nameEn: source.nameEn || '',
	          unitId: source.unitId || null,
	          barcode: source.barcode || '',
	          qty
	        });
	      }
	      renderShortageItems();
	      showToast('تمت إضافة الصنف');
	    }

	    function renderShortageItems() {
	      const container = document.getElementById('shortageItemsContainer');
	      const submitBtn = document.getElementById('submitShortageBtn');
	      if (!container) return;
	      if (!currentShortageDraft.items.length) {
	        container.innerHTML = '<div class="text-center text-gray-400 py-8">لا توجد عناصر</div>';
	        if (submitBtn) submitBtn.disabled = true;
	        return;
	      }
	      if (submitBtn) submitBtn.disabled = false;
	      container.innerHTML = currentShortageDraft.items.map((item, index) => `
	        <div class="bg-purple-50 border border-purple-100 p-3 rounded-lg mb-2">
	          <div class="flex justify-between items-start mb-2">
	            <div>
	              <div class="font-bold">${escapeHtml(item.nameAr || item.name || '-')}</div>
	              <div class="text-xs text-purple-700 font-bold">${item.itemType === 'material' ? 'مواد مخزون' : 'منتج'}</div>
	            </div>
	            <button onclick="removeShortageItem(${index})" class="text-red-600 hover:text-red-800 font-bold text-lg">✕</button>
	          </div>
	          <div class="flex items-center gap-2">
	            <input type="number" min="1" step="1" value="${item.qty}" onchange="updateShortageItemQty(${index}, this.value)" class="quantity-input bg-white">
	            <span class="text-sm text-gray-600">الكمية</span>
	          </div>
	        </div>
	      `).join('');
	    }

	    function updateShortageItemQty(index, value) {
	      const qty = Math.max(1, Math.floor(Number(convertToEnglishNumbers(value || '1')) || 1));
	      if (currentShortageDraft.items[index]) {
	        currentShortageDraft.items[index].qty = qty;
	        renderShortageItems();
	      }
	    }

	    function removeShortageItem(index) {
	      currentShortageDraft.items.splice(index, 1);
	      renderShortageItems();
	    }

	    function findShortageItemByBarcode(barcode, mode = 'products') {
	      const value = normalizeBarcodeValue(barcode);
	      if (!value) return null;
	      const rows = mode === 'materials' ? allStockMaterials : allProducts;
	      const match = rows.find(item => normalizeBarcodeValue(item.barcode) === value);
	      return match ? { itemType: mode === 'materials' ? 'material' : 'product', item: match } : null;
	    }

	    function handleShortageBarcodeScan(barcode) {
	      if (!document.getElementById('shortageDraftPage')) {
	        resetShortageDraft();
	        renderShortageDraftPage();
	      }
	      const match = findShortageItemByBarcode(barcode, shortageSearchMode) || findShortageItemByBarcode(barcode, 'products') || findShortageItemByBarcode(barcode, 'materials');
	      if (!match) {
	        showToast(`لم يتم العثور على صنف للباركود: ${barcode}`, true);
	        return true;
	      }
	      addItemToShortage(match.itemType, match.item.id);
	      const input = document.getElementById('shortageSearchBox');
	      if (input) input.value = '';
	      shortageSearchTerm = '';
	      const results = document.getElementById('shortageSearchResults');
	      if (results) results.innerHTML = renderShortageSearchResultsHtml();
	      return true;
	    }

	    async function submitShortageRequest() {
	      if (!currentShortageDraft.items.length) {
	        showToast('الرجاء إضافة صنف واحد على الأقل', true);
	        return;
	      }
	      const id = generateId();
	      const createdAt = Date.now();
	      const requestNumber = `TR-${new Date(createdAt).toISOString().slice(0, 10).replace(/-/g, '')}-${String(createdAt).slice(-5)}`;
	      const payload = {
	        id,
	        requestNumber,
	        branchId: getCurrentBranchIdForTransferRequest(),
	        branch: currentBranch || '',
	        branchName: currentBranch || '',
	        cashierId: currentCashier?.id || '',
	        cashierName: currentCashier?.name || '',
	        cashierCode: currentCashier?.code || '',
	        createdAt,
	        status: 'pending',
	        alertAcknowledged: false,
	        items: currentShortageDraft.items.map(item => ({
	          itemId: item.itemId,
	          itemType: item.itemType,
	          name: item.name || item.nameAr || '',
	          nameAr: item.nameAr || item.name || '',
	          nameEn: item.nameEn || '',
	          unitId: item.unitId || null,
	          barcode: item.barcode || '',
	          qty: Number(item.qty || 0),
	          requestedQty: Number(item.qty || 0)
	        }))
	      };
	      try {
	        await db.ref(`transferRequests/${id}`).set(payload);
	        closeShortageDraftPage();
	        showShortageSuccessMessage();
	      } catch (error) {
	        console.error('Error submitting shortage request:', error);
	        showToast('تعذر إرسال طلب النواقص', true);
	      }
	    }

	    function showShortageSuccessMessage() {
	      const modal = document.createElement('div');
	      modal.className = 'modal-overlay';
	      modal.innerHTML = `
	        <div class="modal-content p-8 w-full max-w-md text-center">
	          <div class="mx-auto mb-4 w-16 h-16 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-3xl font-bold">✓</div>
	          <h2 class="text-2xl font-bold text-purple-900 mb-3">تم ارسال طلب النواقص بنجاح</h2>
	          <p class="text-gray-600 mb-6">سيظهر الطلب مباشرة عند المخازن وفي شاشة التلفزيون.</p>
	          <button onclick="this.closest('.modal-overlay').remove(); showShortageRequestsPage()" class="w-full bg-purple-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-900 transition">تم</button>
	        </div>
	      `;
	      document.body.appendChild(modal);
	    }

	    function openCashierReceiveShortage(requestId) {
	      const request = allTransferRequests.find(item => item.id === requestId);
	      if (!request) return;
	      const items = request.items || [];
	      const modal = document.createElement('div');
	      modal.className = 'modal-overlay';
	      modal.id = 'cashierReceiveShortageModal';
	      modal.innerHTML = `
	        <div class="modal-content p-6 w-full max-w-4xl" style="max-height: 90vh; overflow:auto;">
	          <div class="flex justify-between items-center mb-4">
	            <h2 class="text-2xl font-bold text-purple-900">استلام طلب النواقص ${escapeHtml(request.requestNumber || '')}</h2>
	            <button onclick="this.closest('.modal-overlay').remove()" class="text-3xl font-bold text-gray-500 hover:text-red-600">×</button>
	          </div>
	          <button onclick="fillAllReceivedShortageQty()" class="bg-green-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-green-700 transition mb-4">تم استلام كل النواقص</button>
	          <div class="grid grid-cols-3 gap-3 font-bold bg-purple-100 p-3 rounded-lg mb-2">
	            <div>اسم المنتج</div>
	            <div>الكمية المرسلة</div>
	            <div>الكمية المستلمة</div>
	          </div>
	          <div id="cashierReceiveShortageRows">
	            ${items.map((item, index) => `
	              <div class="grid grid-cols-3 gap-3 items-center border-b border-gray-200 py-3">
	                <div class="font-bold">${escapeHtml(item.nameAr || item.name || '-')}</div>
	                <div class="sent-qty font-bold" data-sent="${Number(item.sentQty ?? item.qty ?? item.requestedQty ?? 0)}">${Number(item.sentQty ?? item.qty ?? item.requestedQty ?? 0)}</div>
	                <input class="received-shortage-qty p-3 border-2 border-gray-300 rounded-lg" data-index="${index}" type="text" inputmode="numeric" oninput="this.value = convertToEnglishNumbers(this.value).replace(/[^0-9.]/g, '')">
	              </div>
	            `).join('')}
	          </div>
	          <div class="flex justify-end gap-3 mt-5">
	            <button onclick="this.closest('.modal-overlay').remove()" class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold">إلغاء</button>
	            <button onclick="submitCashierShortageReceive('${request.id}')" class="bg-purple-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-900 transition">استلام</button>
	          </div>
	        </div>
	      `;
	      document.body.appendChild(modal);
	    }

	    function fillAllReceivedShortageQty() {
	      document.querySelectorAll('#cashierReceiveShortageRows .received-shortage-qty').forEach(input => {
	        const sent = input.closest('.grid')?.querySelector('.sent-qty')?.dataset.sent || '';
	        input.value = sent;
	      });
	    }

	    async function submitCashierShortageReceive(requestId) {
	      const request = allTransferRequests.find(item => item.id === requestId);
	      if (!request) return;
	      const rows = Array.from(document.querySelectorAll('#cashierReceiveShortageRows .received-shortage-qty'));
	      const receivedItems = (request.items || []).map((item, index) => ({
	        ...item,
	        receivedQty: Number(convertToEnglishNumbers(rows[index]?.value || '0')) || 0
	      }));
	      try {
	        await db.ref(`transferRequests/${requestId}`).update({
	          status: 'received',
	          receivedAt: firebase.database.ServerValue.TIMESTAMP,
	          receivedByCashier: currentCashier?.name || '',
	          receivedItems,
	          items: receivedItems
	        });
	        document.getElementById('cashierReceiveShortageModal')?.remove();
	        showToast('تم استلام طلب النواقص');
	        showShortageRequestsPage();
	      } catch (error) {
	        console.error('Error receiving shortage request:', error);
	        showToast('تعذر حفظ الاستلام', true);
	      }
	    }
	
	    function startNewInvoiceFromCashier() {
      if (currentBranch === 'اليرموك' && !hasOpenDailySession()) {
        showToast('يجب فتح اليومية أولاً', true);
        showOpenDailySessionModal();
        return;
      }
      showNewInvoicePage();
    }

    function showNewInvoicePage() {
      currentOrder = {
        items: [],
        customer: null,
        deliveryPrice: 0,
        orderType: null,
        paymentMethod: '',
        selectedAddress: null,
        deliveryTimingType: 'within2',
        deliveryDate: '',
        deliveryTimeFrom: '',
        deliveryTimeTo: '',
        pickupBranch: '',
        cashReceived: 0,
        cashChange: 0
      };

      showInvoiceCustomerSelection(true);
    }

    function showInvoiceProductsPage() {
      const existingPage = document.getElementById('invoicePage');
      if (existingPage) existingPage.remove();

      const page = document.createElement('div');
      page.className = 'invoice-page';
      page.id = 'invoicePage';
      page.innerHTML = `
        <div class="h-full flex flex-col">
          <!-- Header with close button -->
          <div class="no-print bg-blue-600 text-white p-4 flex justify-between items-center">
  <h2 class="text-2xl font-bold">فاتورة جديدة</h2>
            <button onclick="closeInvoicePage()" class="text-3xl font-bold hover:text-red-300">✕</button>
          </div>
          
          <div class="flex-1 flex overflow-hidden">
            <!-- Right side - Items list -->
            <div class="w-96 bg-white border-l-2 border-gray-300 flex flex-col">
              <div class="p-4 border-b border-gray-300">
                <h3 class="text-lg font-bold text-gray-800">المنتجات المضافة</h3>
              </div>
              
              <div id="selectedItemsContainer" class="flex-1 overflow-y-auto p-4">
                <div class="text-center text-gray-400 py-8">لا توجد منتجات</div>
              </div>
              
              <div class="p-4 border-t border-gray-300">
                <button id="nextButton" onclick="goNextFromProducts()" disabled class="w-full bg-gray-400 text-white px-6 py-3 rounded-lg font-bold cursor-not-allowed">
                  التالي
                </button>
              </div>
            </div>
            
            <!-- Left side - Products -->
            <div class="flex-1 p-6 overflow-y-auto bg-gray-50">
              <div class="invoice-product-toolbar">
                <div id="invoiceTotalBox" class="invoice-total-box" aria-live="polite">
                  <span id="invoiceTotalValue" class="invoice-total-value">0.000</span>
                  <span class="invoice-total-currency">KD</span>
                </div>
                <input type="text" id="productSearchBox" oninput="searchProductsInInvoice()" placeholder="🔍 بحث عن منتج..." class="invoice-product-search w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg">
              </div>
              
              <div id="categoriesAndProductsContainer">
                ${renderCategoriesForInvoice()}
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(page);
      updateInvoicePricingBox();
      updateSelectedItemsDisplay();
    }
    
    function closeInvoicePage() {
      const page = document.getElementById('invoicePage');
      if (page) {
        page.remove();
      }
      currentOrder = {
        items: [],
        customer: null,
        deliveryPrice: 0,
        orderType: null,
        paymentMethod: '',
        selectedAddress: null,
        deliveryTimingType: 'within2',
        deliveryDate: '',
        deliveryTimeFrom: '',
        deliveryTimeTo: '',
        pickupBranch: '',
        cashReceived: 0,
        cashChange: 0
      };
    }

    function goNextFromProducts() {
      if (currentOrder.items.length === 0) {
        showToast('الرجاء اختيار منتج واحد على الأقل', true);
        return;
      }
      if (!currentOrder.customer) {
        showInvoiceCustomerSelection(false);
        return;
      }
      showOrderTypeSelection();
    }
    
	    function getCashierCategoryRows() {
	      const rows = allProductCategories.length ? allProductCategories : allCategories;
	      return rows.map(category => ({
	        ...category,
	        nameAr: category.nameAr || category.name || '',
	        nameEn: category.nameEn || '',
	        productIds: Array.isArray(category.productIds)
	          ? category.productIds
	          : (category.productIds ? Object.values(category.productIds) : [])
	      }));
	    }

	    function getCashierProductsForCategory(categoryId) {
	      const category = getCashierCategoryRows().find(c => c.id === categoryId);
	      const categoryProductIds = new Set((category?.productIds || []).map(id => String(id)));
	      return allProducts.filter(product => (
	        String(product.categoryId || '') === String(categoryId)
	        || categoryProductIds.has(String(product.id))
	        || (Array.isArray(product.categoryIds) && product.categoryIds.map(String).includes(String(categoryId)))
	      ));
	    }

	    function renderCategoriesForInvoice() {
	      const categories = getCashierCategoryRows();
	      const rootCategories = categories.filter(c => !c.parentId);
	      
	      return `
	        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="categoriesGrid">
          ${rootCategories.map(cat => `
            <div class="category-card" onclick="showCategoryProductsInvoice('${cat.id}')">
              <div class="text-4xl mb-2">📁</div>
              <div class="font-bold text-lg">${cat.nameAr}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
    
	    function showCategoryProductsInvoice(categoryId) {
	  const categories = getCashierCategoryRows();
	  const category = categories.find(c => c.id === categoryId);
	  const subCategories = categories.filter(c => c.parentId === categoryId);
	  const products = getCashierProductsForCategory(categoryId);
  
  const container = document.getElementById('categoriesAndProductsContainer');
  container.innerHTML = `
    <button onclick="renderCategoriesForInvoice(); document.getElementById('categoriesAndProductsContainer').innerHTML = renderCategoriesForInvoice();" class="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition">
      ← رجوع
    </button>
    
    <h3 class="text-2xl font-bold text-gray-800 mb-4">${category.nameAr}</h3>
    
    <h4 class="text-lg font-bold text-gray-700 mb-3">الأقسام الفرعية والمنتجات</h4>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${subCategories.map(subCat => `
        <div class="category-card" onclick="showCategoryProductsInvoice('${subCat.id}')">
          <div class="text-3xl mb-2">📁</div>
          <div class="font-bold">${subCat.nameAr}</div>
        </div>
      `).join('')}
      
      ${products.map(prod => `
        <div class="product-card" onclick="addProductToInvoice('${prod.id}')">
          <div class="text-4xl mb-2">📦</div>
          <div class="font-bold mb-1">${prod.nameAr}</div>
          <div class="text-blue-600 font-bold text-lg">${prod.price.toFixed(3)} د.ك</div>
        </div>
      `).join('')}
    </div>
  `;
}
    
    function searchProductsInInvoice() {
      const searchTerm = document.getElementById('productSearchBox').value.toLowerCase();
      
      if (searchTerm.trim() === '') {
        document.getElementById('categoriesAndProductsContainer').innerHTML = renderCategoriesForInvoice();
        return;
      }
      
      const filteredProducts = allProducts.filter(p => 
        p.nameAr.toLowerCase().includes(searchTerm) || 
        p.nameEn.toLowerCase().includes(searchTerm)
      );
      
      document.getElementById('categoriesAndProductsContainer').innerHTML = `
        <h4 class="text-lg font-bold text-gray-700 mb-3">نتائج البحث</h4>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${filteredProducts.map(prod => `
            <div class="product-card" onclick="addProductToInvoice('${prod.id}')">
              <div class="text-4xl mb-2">📦</div>
              <div class="font-bold mb-1">${prod.nameAr}</div>
              <div class="text-blue-600 font-bold text-lg">${prod.price.toFixed(3)} د.ك</div>
              <div class="text-sm text-gray-600">${prod.unit}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    function calculateInvoiceItemsTotal() {
      return currentOrder.items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
    }

    function updateInvoicePricingBox() {
      const totalValue = document.getElementById('invoiceTotalValue');
      if (!totalValue) return;
      totalValue.textContent = calculateInvoiceItemsTotal().toFixed(3);
    }

    function setInvoicePricingBoxVisible(isVisible) {
      const totalBox = document.getElementById('invoiceTotalBox');
      if (!totalBox) return;
      totalBox.classList.toggle('hidden', !isVisible);
    }

    function getDefaultDeliveryWindow() {
      const now = new Date();
      const start = new Date(now.getTime() + 60 * 60 * 1000);
      const end = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      const pad = (value) => String(value).padStart(2, '0');
      const dateValue = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      const toTimeValue = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;
      return {
        date: dateValue,
        from: toTimeValue(start),
        to: toTimeValue(end)
      };
    }

    function formatDeliveryDisplayTime(timeValue) {
      if (!timeValue) return '-';
      const [hourPart, minutePart = '00'] = timeValue.split(':');
      const hour = parseInt(hourPart, 10);
      if (isNaN(hour)) return timeValue;
      const period = hour >= 12 ? 'مساءً' : 'صباحاً';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutePart} ${period}`;
    }

    function getDeliveryAreaFromAddress(address) {
      const cleanAddress = (address || '').toString().trim();
      if (!cleanAddress) return '';
      const firstPart = cleanAddress.split(' - ')[0].trim();
      return areas.includes(firstPart) ? firstPart : firstPart;
    }

    function getDeliveryPriceGroupForBranch(branch = currentBranch) {
      return branch === 'أبو الحصانية' ? 'abuHasaniya' : 'mainYarmouk';
    }

    function getDeliveryPriceGroupLabel(groupKey) {
      return groupKey === 'abuHasaniya' ? 'فرع أبو الحصانية' : 'الفرع الرئيسي واليرموك';
    }

    function isOrderInDeliveryPriceGroup(order, groupKey) {
      const branch = order?.branch || '';
      if (groupKey === 'abuHasaniya') return branch === 'أبو الحصانية';
      return branch !== 'أبو الحصانية';
    }

    function getInferredDeliveryPrices(groupKey = getDeliveryPriceGroupForBranch()) {
      const inferred = {};
      allOrders
        .filter(order => order && order.orderType === 'delivery' && isOrderInDeliveryPriceGroup(order, groupKey))
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
        .forEach(order => {
          const area = getDeliveryAreaFromAddress(order.address);
          const price = parseFloat(order.deliveryPrice ?? order.deliveryFee ?? 0);
          if (area && price > 0 && inferred[area] === undefined) {
            inferred[area] = price;
          }
        });
      return inferred;
    }

    function getSavedDeliveryPriceForArea(area, groupKey = getDeliveryPriceGroupForBranch()) {
      if (!area || !allDeliveryPrices) return '';
      const groupedRow = allDeliveryPrices[groupKey]?.[area];
      const legacyRow = allDeliveryPrices[area];
      const row = groupedRow !== undefined ? groupedRow : legacyRow;
      if (row === undefined || row === null) return '';
      const value = typeof row === 'object' ? row.price : row;
      return value === '' || value === undefined || value === null ? '' : parseFloat(value);
    }

    function getResolvedDeliveryPriceForArea(area, groupKey = getDeliveryPriceGroupForBranch()) {
      const saved = getSavedDeliveryPriceForArea(area, groupKey);
      if (saved !== '' && !isNaN(saved)) return saved;
      const inferred = getInferredDeliveryPrices(groupKey);
      const inferredValue = inferred[area];
      return inferredValue === undefined ? '' : inferredValue;
    }

    function applyDeliveryPriceFromSelectedAddress() {
      const area = currentOrder.selectedAddress?.area || '';
      const price = getResolvedDeliveryPriceForArea(area);
      currentOrder.deliveryPrice = price === '' || isNaN(price) ? 0 : price;
      return price;
    }

    function continueInvoiceAfterCustomerSelection() {
      document.querySelector('.modal-overlay')?.remove();
      if (currentOrder.items.length > 0) {
        showOrderTypeSelection();
      } else {
        showInvoiceProductsPage();
      }
    }
    
    function addProductToInvoice(productId) {
      const product = allProducts.find(p => p.id === productId);
      if (!product) {
        showToast('المنتج غير موجود', true);
        return;
      }
      const existingItem = currentOrder.items.find(item => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.quantity * existingItem.price;
      } else {
        currentOrder.items.push({
          productId: product.id,
          productName: product.nameAr,
          productNameEn: product.nameEn,
          price: product.price,
          quantity: 1,
          unit: product.unit || '',
          notes: '',
          total: product.price
        });
      }
      
      updateSelectedItemsDisplay();
    }

    function normalizeBarcodeValue(value) {
      return convertToEnglishNumbers(value || '').trim();
    }

    function findProductByBarcode(barcode) {
      const value = normalizeBarcodeValue(barcode);
      if (!value) return null;
      return allProducts.find(product => normalizeBarcodeValue(product.barcode) === value) || null;
    }

	    function clearProductSearchBoxAfterScan(value) {
	      const searchBox = document.getElementById('productSearchBox');
      const scanned = normalizeBarcodeValue(value);
      if (searchBox) {
        const typed = normalizeBarcodeValue(searchBox.value);
        if (!scanned || typed.includes(scanned) || scanned.includes(typed) || /^\d{4,}$/.test(typed)) {
          searchBox.value = '';
          searchProductsInInvoice();
        }
      }
	      const dailySearchBox = document.getElementById('dailyInvoiceSearchInput');
	      if (dailySearchBox) {
	        const typed = normalizeBarcodeValue(dailySearchBox.value);
	        if (!scanned || typed.includes(scanned) || scanned.includes(typed) || /^\d{4,}$/.test(typed)) {
	          dailySearchBox.value = '';
	        }
	      }
	      const shortageSearchBox = document.getElementById('shortageSearchBox');
	      if (shortageSearchBox) {
	        const typed = normalizeBarcodeValue(shortageSearchBox.value);
	        if (!scanned || typed.includes(scanned) || scanned.includes(typed) || /^\d{4,}$/.test(typed)) {
	          shortageSearchBox.value = '';
	          shortageSearchTerm = '';
	          document.getElementById('shortageSearchResults')?.replaceChildren();
	        }
	      }
	    }

    function handleBarcodeScan(value) {
      if (currentScreen !== 'cashier' || !currentCashier) return;
      const barcode = normalizeBarcodeValue(value);
	      if (!barcode || barcode.length < 4) return;
	      clearProductSearchBoxAfterScan(barcode);

	      if (document.getElementById('shortageRequestsPage') || document.getElementById('shortageDraftPage')) {
	        handleShortageBarcodeScan(barcode);
	        clearProductSearchBoxAfterScan(barcode);
	        return;
	      }

      if (currentBranch === 'اليرموك' && !hasOpenDailySession()) {
        showToast('يجب فتح اليومية أولاً', true);
        showOpenDailySessionModal();
        return;
      }

      const product = findProductByBarcode(barcode);
      if (!product) {
        showToast(`لم يتم العثور على منتج للباركود: ${barcode}`, true);
        return;
      }

      const invoicePage = document.getElementById('invoicePage');
      const selectedItemsContainer = document.getElementById('selectedItemsContainer');
      if (!invoicePage || !selectedItemsContainer) {
        document.querySelector('.modal-overlay')?.remove();
        if (!invoicePage) {
          currentOrder = {
            items: [],
            customer: null,
            deliveryPrice: 0,
            orderType: null,
            paymentMethod: '',
            selectedAddress: null,
            deliveryTimingType: 'within2',
            deliveryDate: '',
            deliveryTimeFrom: '',
            deliveryTimeTo: '',
            pickupBranch: '',
            cashReceived: 0,
            cashChange: 0
          };
        }
        showInvoiceProductsPage();
      }

      addProductToInvoice(product.id);
      clearProductSearchBoxAfterScan(barcode);
      showToast(`تمت إضافة المنتج: ${product.nameAr || product.nameEn || ''}`);
      document.getElementById('productSearchBox')?.focus();
    }

	    function handleGlobalBarcodeKeydown(event) {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      const isTypingField = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
	      const isBarcodeFriendlyInput = target?.id === 'productSearchBox' || target?.id === 'dailyInvoiceSearchInput' || target?.id === 'shortageSearchBox';
      if (isTypingField && !isBarcodeFriendlyInput) return;

      if (event.key === 'Enter') {
        if (barcodeScanBuffer) {
          event.preventDefault();
          const value = barcodeScanBuffer;
          barcodeScanBuffer = '';
          handleBarcodeScan(value);
        }
        return;
      }

      if (event.key.length !== 1) return;
      const now = Date.now();
      if (now - barcodeScanLastTime > 90) {
        barcodeScanBuffer = '';
      }
      const normalizedKey = normalizeBarcodeValue(event.key);
	      if (isBarcodeFriendlyInput && barcodeScanBuffer) {
	        event.preventDefault();
	      }
	      barcodeScanBuffer += normalizedKey || event.key;
	      barcodeScanLastTime = now;
	      if (isBarcodeFriendlyInput) {
	        setTimeout(() => {
	          if (barcodeScanBuffer && target && target.value) {
	            target.value = '';
	          }
	        }, 0);
	      }
	      clearTimeout(barcodeScanTimer);
      barcodeScanTimer = setTimeout(() => {
        if (barcodeScanBuffer.length >= 4) {
          const value = barcodeScanBuffer;
          barcodeScanBuffer = '';
          handleBarcodeScan(value);
          clearProductSearchBoxAfterScan(value);
        } else {
          barcodeScanBuffer = '';
        }
      }, 140);
    }
    
    function updateSelectedItemsDisplay() {
      const container = document.getElementById('selectedItemsContainer');
      const nextButton = document.getElementById('nextButton');
      updateInvoicePricingBox();
      
      if (currentOrder.items.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-400 py-8">لا توجد منتجات</div>';
        nextButton.disabled = true;
        nextButton.className = 'w-full bg-gray-400 text-white px-6 py-3 rounded-lg font-bold cursor-not-allowed';
      } else {
        container.innerHTML = currentOrder.items.map((item, index) => `
          <div class="bg-gray-50 p-3 rounded-lg mb-2">
            <div class="flex justify-between items-start mb-2">
              <div class="font-bold">${item.productName}</div>
              <button onclick="removeItemFromInvoice(${index})" class="text-red-600 hover:text-red-800 font-bold text-lg">✕</button>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" value="${item.quantity}" readonly onclick="showNumericKeypadForInvoice(${index}, this)" class="quantity-input bg-white cursor-pointer">
              <span class="text-sm text-gray-600">× ${item.price.toFixed(3)}</span>
              <span class="font-bold text-blue-600 mr-auto">${item.total.toFixed(3)} د.ك</span>
            </div>
            <textarea rows="2" oninput="updateItemNote(${index}, this.value)" placeholder="ملاحظة على هذا الصنف..." class="mt-2 w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:outline-none">${escapeHtml(item.notes || '')}</textarea>
          </div>
        `).join('');
        
        nextButton.disabled = false;
        nextButton.className = 'w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition';
      }
    }
    
    function updateItemQuantity(index, value) {
      value = convertToEnglishNumbers(value);
      const quantity = parseFloat(value);
      
      if (isNaN(quantity) || quantity <= 0) {
        return;
      }
      
      currentOrder.items[index].quantity = quantity;
      currentOrder.items[index].total = quantity * currentOrder.items[index].price;
      updateSelectedItemsDisplay();
    }
    
    function removeItemFromInvoice(index) {
      currentOrder.items.splice(index, 1);
      updateSelectedItemsDisplay();
    }

    function updateItemNote(index, value) {
      if (!currentOrder.items[index]) return;
      currentOrder.items[index].notes = (value || '').trim();
    }

function showNumericKeypadForInvoice(index, inputField) {
  if (document.querySelector('.numeric-keypad-overlay')) return;
  
  const overlay = document.createElement('div');
  overlay.className = 'numeric-keypad-overlay';
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;';
  
  const keypad = document.createElement('div');
  keypad.style.cssText = 'background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);';
  
  const display = document.createElement('input');
  display.type = 'text';
  display.value = inputField.value || '0';
  display.readOnly = true;
  display.style.cssText = 'width: 100%; font-size: 32px; text-align: center; padding: 15px; margin-bottom: 15px; border: 2px solid #2563eb; border-radius: 8px; font-weight: bold;';
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 300px;';
  
  const buttons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'مسح', 'موافق'];
  
  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn;
    button.style.cssText = 'padding: 20px; font-size: 24px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;';
    
    if (btn === 'موافق') {
      button.style.background = '#22c55e';
      button.style.color = 'white';
    } else if (btn === 'مسح') {
      button.style.background = '#ef4444';
      button.style.color = 'white';
    } else {
      button.style.background = '#e5e7eb';
      button.style.color = '#1f2937';
    }
    
    button.onmouseover = () => {
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    };
    
    button.onmouseout = () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = 'none';
    };
    
    button.onclick = () => {
      if (btn === 'موافق') {
        const newValue = display.value;
        updateItemQuantity(index, newValue);
        overlay.remove();
      } else if (btn === 'مسح') {
        display.value = '0';
      } else if (btn === '.') {
        if (display.value === '0') {
          display.value = '0.';
        } else if (!display.value.includes('.')) {
          display.value += '.';
        }
      } else {
        if (display.value === '0') {
          display.value = btn;
        } else {
          display.value += btn;
        }
      }
    };
    
    buttonsContainer.appendChild(button);
  });
  
  keypad.appendChild(display);
  keypad.appendChild(buttonsContainer);
  overlay.appendChild(keypad);
  
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
  
  document.body.appendChild(overlay);
}

    
     function showOrderTypeSelection() {
      if (!currentOrder.customer) {
        showInvoiceCustomerSelection(false);
        return;
      }
      if (currentOrder.items.length === 0) {
        showInvoiceProductsPage();
        return;
      }
      setInvoicePricingBoxVisible(false);
      const deliveryWindow = getDefaultDeliveryWindow();
      const scheduleDate = currentOrder.deliveryDate || deliveryWindow.date;
      const scheduleFrom = currentOrder.deliveryTimeFrom || deliveryWindow.from;
      const scheduleTo = currentOrder.deliveryTimeTo || deliveryWindow.to;
      const deliveryPriceValue = currentOrder.deliveryPrice || getResolvedDeliveryPriceForArea(currentOrder.selectedAddress?.area || '') || '';
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-2xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6 text-center">نوع الطلب</h2>

          <div class="bg-blue-50 p-4 rounded-lg mb-5">
            <div class="font-bold">${currentOrder.customer.name || ''}</div>
            <div class="text-gray-600">${currentOrder.customer.phone || ''}</div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onclick="selectOrderType('delivery')" id="deliveryBtn" class="w-full bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition">
              🚚 توصيل
            </button>
            <button onclick="selectOrderType('pickup')" id="pickupBtn" class="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-bold text-xl hover:bg-blue-700 transition">
              🛍️ استلام
            </button>
          </div>

          <div class="mt-4">
            <div id="deliveryOptionsBox" class="hidden bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <button onclick="selectDeliveryTiming('within2')" id="within2Btn" class="bg-green-600 text-white px-4 py-3 rounded-lg font-bold transition">خلال ساعتين</button>
                <button onclick="selectDeliveryTiming('specific')" id="specificTimeBtn" class="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-bold hover:bg-gray-300 transition">وقت محدد</button>
              </div>
              <div id="deliverySpecificTimeFields" class="hidden grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 text-xs font-bold text-gray-600">تاريخ التوصيل</label>
                  <input type="date" id="deliveryDateInput" value="${scheduleDate}" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none">
                </div>
                <div>
                  <label class="block mb-1 text-xs font-bold text-gray-600">من</label>
                  <input type="time" id="deliveryFromInput" value="${scheduleFrom}" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none">
                </div>
                <div>
                  <label class="block mb-1 text-xs font-bold text-gray-600">إلى</label>
                  <input type="time" id="deliveryToInput" value="${scheduleTo}" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none">
                </div>
              </div>
              <div id="deliveryScheduleText" class="text-xs text-green-800 mt-3 font-semibold"></div>
              <div class="mt-4">
                <label class="block mb-2 font-bold text-gray-700">رسوم التوصيل (د.ك)</label>
                <input type="text" id="deliveryPrice" value="${deliveryPriceValue === '' ? '' : formatNumberWithThreeDecimals(deliveryPriceValue)}" oninput="this.value = convertToEnglishNumbers(this.value); currentOrder.deliveryPrice = parseFloat(this.value) || 0" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <div class="text-xs text-gray-500 mt-2">يظهر السعر تلقائياً حسب المنطقة، ويمكن تعديله هنا وسيتم حفظه كسعر أساسي للمرات القادمة.</div>
              </div>
            </div>
          </div>

          <div id="pickupBranchBox" class="mt-4 hidden">
            <label class="block mb-2 font-bold text-gray-700">فرع الاستلام</label>
            <select id="pickupBranchSelect" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              <option value="">اختر فرع الاستلام</option>
              ${PICKUP_BRANCHES.map(branch => `<option value="${branch}" ${currentOrder.pickupBranch === branch ? 'selected' : ''}>${branch}</option>`).join('')}
            </select>
          </div>

          <button onclick="finalizeOrderTypeStep()" class="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">التالي</button>
          <button onclick="this.closest('.modal-overlay').remove(); setInvoicePricingBoxVisible(true)" class="w-full mt-4 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
        </div>
      `;
      document.body.appendChild(modal);
      currentOrder.deliveryTimingType = currentOrder.deliveryTimingType || 'within2';
      updateDeliveryScheduleText();
      ['deliveryDateInput', 'deliveryFromInput', 'deliveryToInput'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', updateDeliveryScheduleText);
      });
      if (currentOrder.orderType) selectOrderType(currentOrder.orderType);
      if (currentOrder.orderType === 'delivery') selectDeliveryTiming(currentOrder.deliveryTimingType || 'within2');
    }
    

        let selectedPaymentMethod = null;

    function getPaymentMethodLabel(method, withIcon = true) {
      if (method === 'cash') return withIcon ? '💵 كاش' : 'كاش';
      if (method === 'online') return withIcon ? '💳 أونلاين' : 'أونلاين';
      if (method === 'knet') return withIcon ? '💳 كي-نت' : 'كي-نت';
      return 'N/A';
    }
    
    function selectPaymentMethod(method) {
      selectedPaymentMethod = method;
      
      // تغيير ألوان الأزرار
      const cashBtn = document.getElementById('cashBtn');
      const onlineBtn = document.getElementById('onlineBtn');
      const knetBtn = document.getElementById('knetBtn');
      const cashPanel = document.getElementById('cashPaymentPanel');
      
      if (cashBtn) cashBtn.className = 'bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-green-500 hover:text-white transition';
      if (onlineBtn) onlineBtn.className = 'bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-500 hover:text-white transition';
      if (knetBtn) knetBtn.className = 'bg-purple-100 text-purple-800 px-6 py-3 rounded-lg font-bold hover:bg-purple-200 transition';

      if (method === 'cash') {
        if (cashBtn) cashBtn.className = 'bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition';
      } else if (method === 'online') {
        if (onlineBtn) onlineBtn.className = 'bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition';
      } else if (method === 'knet') {
        if (knetBtn) knetBtn.className = 'bg-purple-600 text-white px-6 py-3 rounded-lg font-bold shadow-md transition';
      }

      if (cashPanel) {
        const shouldShowCashPanel = method === 'cash' && currentOrder.orderType === 'pickup';
        cashPanel.classList.toggle('hidden', !shouldShowCashPanel);
        if (shouldShowCashPanel) updateCashChange();
      }
    }


        function selectOrderType(type) {
      currentOrder.orderType = type;
      const deliveryBtn = document.getElementById('deliveryBtn');
      const pickupBtn = document.getElementById('pickupBtn');
      const pickupBranchBox = document.getElementById('pickupBranchBox');
      const deliveryOptionsBox = document.getElementById('deliveryOptionsBox');

      if (deliveryBtn) deliveryBtn.className = type === 'delivery'
        ? 'w-full bg-green-700 text-white px-6 py-4 rounded-lg font-bold text-xl transition ring-4 ring-green-200'
        : 'w-full bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition';
      if (pickupBtn) pickupBtn.className = type === 'pickup'
        ? 'w-full bg-blue-700 text-white px-6 py-4 rounded-lg font-bold text-xl transition ring-4 ring-blue-200'
        : 'w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-bold text-xl hover:bg-blue-700 transition';

      if (pickupBranchBox) pickupBranchBox.classList.toggle('hidden', type !== 'pickup');
      if (deliveryOptionsBox) deliveryOptionsBox.classList.toggle('hidden', type !== 'delivery');
      if (type === 'delivery') selectDeliveryTiming(currentOrder.deliveryTimingType || 'within2');
}

    function selectDeliveryTiming(type) {
      currentOrder.deliveryTimingType = type;
      if (type === 'within2') {
        const deliveryWindow = getDefaultDeliveryWindow();
        const dateInput = document.getElementById('deliveryDateInput');
        const fromInput = document.getElementById('deliveryFromInput');
        const toInput = document.getElementById('deliveryToInput');
        if (dateInput) dateInput.value = deliveryWindow.date;
        if (fromInput) fromInput.value = deliveryWindow.from;
        if (toInput) toInput.value = deliveryWindow.to;
      }
      const withinBtn = document.getElementById('within2Btn');
      const specificBtn = document.getElementById('specificTimeBtn');
      const fields = document.getElementById('deliverySpecificTimeFields');
      if (withinBtn) withinBtn.className = type === 'within2'
        ? 'bg-green-600 text-white px-4 py-3 rounded-lg font-bold transition'
        : 'bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-bold hover:bg-gray-300 transition';
      if (specificBtn) specificBtn.className = type === 'specific'
        ? 'bg-green-600 text-white px-4 py-3 rounded-lg font-bold transition'
        : 'bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-bold hover:bg-gray-300 transition';
      if (fields) fields.classList.toggle('hidden', type !== 'specific');
      updateDeliveryScheduleText();
    }

    function formatDeliveryDateWithDay(dateValue) {
      if (!dateValue) return '';
      const date = new Date(`${dateValue}T00:00:00`);
      const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      return `${days[date.getDay()]} ${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}م`;
    }

    function updateDeliveryScheduleText() {
      const text = document.getElementById('deliveryScheduleText');
      if (!text) return;
      const date = document.getElementById('deliveryDateInput')?.value || '';
      const from = document.getElementById('deliveryFromInput')?.value || '';
      const to = document.getElementById('deliveryToInput')?.value || '';
      text.innerHTML = date && from && to
        ? `التوصيل ${formatDeliveryDateWithDay(date)}<br>بين الساعة ${formatDeliveryDisplayTime(from)} و ${formatDeliveryDisplayTime(to)}`
        : '';
    }

    async function saveEditedDeliveryPriceForSelectedArea() {
      const area = currentOrder.selectedAddress?.area || '';
      if (!area) return;
      const groupKey = getDeliveryPriceGroupForBranch(currentBranch);
      const price = parseFloat(convertToEnglishNumbers(document.getElementById('deliveryPrice')?.value || '0')) || 0;
      const payload = {
        area,
        price: parseFloat(price.toFixed(3)),
        groupKey,
        groupLabel: getDeliveryPriceGroupLabel(groupKey),
        branch: currentBranch || '',
        updatedAt: Date.now()
      };
      await db.ref(`deliveryPrices/${groupKey}/${area}`).set(payload);
      allDeliveryPrices = {
        ...(allDeliveryPrices || {}),
        [groupKey]: {
          ...(allDeliveryPrices?.[groupKey] || {}),
          [area]: payload
        }
      };
    }

    async function finalizeOrderTypeStep() {
      if (!currentOrder.orderType) {
        showToast('الرجاء اختيار توصيل أو استلام', true);
        return;
      }

      if (currentOrder.orderType === 'delivery') {
        currentOrder.selectedAddress = currentOrder.selectedAddress
          ? { area: currentOrder.selectedAddress.area || '', details: currentOrder.selectedAddress.details || '' }
          : null;
        currentOrder.deliveryPrice = parseFloat(convertToEnglishNumbers(document.getElementById('deliveryPrice')?.value || '0')) || 0;
        try {
          await saveEditedDeliveryPriceForSelectedArea();
        } catch (error) {
          console.error('Error saving delivery area price:', error);
          showToast('تعذر حفظ سعر التوصيل للمنطقة، لكن سيتم إكمال الفاتورة', true);
        }
        currentOrder.deliveryDate = document.getElementById('deliveryDateInput')?.value || '';
        currentOrder.deliveryTimeFrom = document.getElementById('deliveryFromInput')?.value || '';
        currentOrder.deliveryTimeTo = document.getElementById('deliveryToInput')?.value || '';
        currentOrder.pickupBranch = '';
      } else {
        const pickupBranch = (document.getElementById('pickupBranchSelect')?.value || '').trim();
        if (!pickupBranch) {
          showToast('اختر فرع الاستلام', true);
          return;
        }
        currentOrder.pickupBranch = pickupBranch;
        currentOrder.deliveryPrice = 0;
        currentOrder.selectedAddress = null;
        currentOrder.deliveryDate = '';
        currentOrder.deliveryTimeFrom = '';
        currentOrder.deliveryTimeTo = '';
      }

      document.querySelector('.modal-overlay')?.remove();
      showPaymentSelectionPage();
    }

    function getInvoicePaymentTotals() {
      const subtotal = calculateInvoiceItemsTotal();
      const deliveryFee = currentOrder.orderType === 'delivery' ? (parseFloat(currentOrder.deliveryPrice) || 0) : 0;
      return {
        subtotal,
        deliveryFee,
        total: subtotal + deliveryFee
      };
    }

    function showPaymentSelectionPage() {
      const totals = getInvoicePaymentTotals();
      selectedPaymentMethod = currentOrder.paymentMethod || null;
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-2xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6 text-center">طريقة الدفع</h2>

          <div class="bg-blue-50 rounded-xl p-5 mb-6 text-center">
            ${totals.deliveryFee > 0 ? `
              <div class="grid grid-cols-2 gap-3 text-gray-700 font-bold mb-3">
                <div class="bg-white rounded-lg p-3">
                  <div class="text-sm text-gray-500 mb-1">قيمة الفاتورة</div>
                  <div class="text-xl">${totals.subtotal.toFixed(3)} د.ك</div>
                </div>
                <div class="bg-white rounded-lg p-3">
                  <div class="text-sm text-gray-500 mb-1">رسوم التوصيل</div>
                  <div class="text-xl">${totals.deliveryFee.toFixed(3)} د.ك</div>
                </div>
              </div>
              <div class="text-sm font-bold text-blue-700 mb-1">الإجمالي</div>
              <div class="text-4xl font-black text-blue-700">${totals.total.toFixed(3)} د.ك</div>
            ` : `
              <div class="text-sm font-bold text-blue-700 mb-1">الإجمالي</div>
              <div class="text-4xl font-black text-blue-700">${totals.total.toFixed(3)} د.ك</div>
            `}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <button onclick="selectPaymentMethod('cash')" id="cashBtn" class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-green-500 hover:text-white transition">💵 كاش</button>
            <button onclick="selectPaymentMethod('online')" id="onlineBtn" class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-500 hover:text-white transition">💳 أونلاين</button>
            <button onclick="selectPaymentMethod('knet')" id="knetBtn" class="bg-purple-100 text-purple-800 px-6 py-3 rounded-lg font-bold hover:bg-purple-200 transition">💳 كي-نت</button>
          </div>

          <div id="cashPaymentPanel" class="hidden bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <label class="block mb-2 font-bold text-gray-700">المبلغ المستلم (د.ك)</label>
            <input type="text" id="cashReceivedInput" value="${currentOrder.cashReceived || ''}" oninput="this.value = convertToEnglishNumbers(this.value); updateCashChange()" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none text-xl font-bold">
            <div id="cashChangeText" class="mt-3 text-lg font-bold text-green-700"></div>
          </div>

          <button onclick="finalizePaymentAndPrint()" class="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ وطباعة الفاتورة</button>
          <button onclick="this.closest('.modal-overlay').remove(); showOrderTypeSelection()" class="w-full mt-3 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">رجوع</button>
        </div>
      `;
      document.body.appendChild(modal);
      if (selectedPaymentMethod) {
        selectPaymentMethod(selectedPaymentMethod);
      }
    }

    function updateCashChange() {
      const input = document.getElementById('cashReceivedInput');
      const label = document.getElementById('cashChangeText');
      if (!input || !label) return;

      const total = getInvoicePaymentTotals().total;
      const received = parseFloat(convertToEnglishNumbers(input.value || '0')) || 0;
      const change = received - total;
      currentOrder.cashReceived = received;
      currentOrder.cashChange = Math.max(change, 0);
      label.textContent = change >= 0
        ? `الباقي: ${change.toFixed(3)} د.ك`
        : `المتبقي: ${Math.abs(change).toFixed(3)} د.ك`;
      label.className = `mt-3 text-lg font-bold ${change >= 0 ? 'text-green-700' : 'text-red-600'}`;
    }

    function finalizePaymentAndPrint() {
      if (!selectedPaymentMethod) {
        showToast('الرجاء اختيار طريقة الدفع', true);
        return;
      }

      const totals = getInvoicePaymentTotals();
      currentOrder.paymentMethod = selectedPaymentMethod;
      currentOrder.notes = '';

      if (selectedPaymentMethod === 'cash' && currentOrder.orderType === 'pickup') {
        const received = parseFloat(convertToEnglishNumbers(document.getElementById('cashReceivedInput')?.value || '0')) || 0;
        if (received < totals.total) {
          showToast('المبلغ المستلم أقل من الإجمالي', true);
          return;
        }
        currentOrder.cashReceived = received;
        currentOrder.cashChange = received - totals.total;
      } else {
        currentOrder.cashReceived = 0;
        currentOrder.cashChange = 0;
      }

      document.querySelector('.modal-overlay')?.remove();
      printAndSaveInvoice();
    }
    
    function showInvoiceCustomerSelection(allowProductsFirst = false) {
      document.querySelector('.modal-overlay')?.remove();
      setInvoicePricingBoxVisible(false);
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-4xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-blue-600">اختر العميل</h2>
            <button onclick="showAddCustomerForDelivery()" class="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition">
              ➕ إضافة عميل
            </button>
          </div>

          ${allowProductsFirst ? `
            <button onclick="this.closest('.modal-overlay').remove(); showInvoiceProductsPage()" class="w-full mb-4 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition">
              اختيار المنتجات أولاً
            </button>
          ` : ''}
          
          <input type="text" id="customerSearchDelivery" oninput="filterCustomersDelivery()" placeholder="🔍 بحث عن رقم العميل..." class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
          
          <div class="max-h-96 overflow-y-auto">
            ${allCustomers.map(customer => `
              <div class="customer-delivery-item bg-gray-50 p-4 rounded-lg mb-2 cursor-pointer hover:bg-blue-50 transition" data-search="${customer.name} ${customer.phone}" onclick="selectCustomerForDelivery('${customer.id}')">
                <div class="font-bold text-lg">${customer.name}</div>
                <div class="text-gray-600">${customer.phone}</div>
              </div>
            `).join('')}
          </div>
          
          <button onclick="this.closest('.modal-overlay').remove()" class="w-full mt-4 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function showCustomerSelectionForDelivery() {
      showInvoiceCustomerSelection(false);
    }
    
    function filterCustomersDelivery() {
      const searchTerm = document.getElementById('customerSearchDelivery').value.toLowerCase();
      const items = document.querySelectorAll('.customer-delivery-item');
      
      items.forEach(item => {
        const searchData = item.getAttribute('data-search').toLowerCase();
        item.style.display = searchData.includes(searchTerm) ? '' : 'none';
      });
    }
    
    function selectCustomerForDelivery(customerId) {
      const customer = allCustomers.find(c => c.id === customerId);
      currentOrder.customer = customer;
      showSelectedCustomerAddressPage();
    }

    function showSelectedCustomerAddressPage() {
      const customer = currentOrder.customer;
      if (!customer) return;
      document.querySelector('.modal-overlay')?.remove();
      const addresses = Array.isArray(customer.addresses) ? customer.addresses : [];
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-2xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">بيانات العميل والعناوين</h2>

          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <div class="text-lg font-bold">${escapeHtml(customer.name || '')}</div>
            <div class="text-gray-600">${escapeHtml(customer.phone || '')}</div>
          </div>

          <div class="mb-4">
            <label class="block mb-2 font-bold text-gray-700">العنوان</label>
            <select id="customerAddressChoice" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              <option value="" ${addresses.length ? '' : 'selected'}>بدون عنوان حالياً</option>
              ${addresses.map((addr, idx) => `
                <option value="${idx}" ${idx === 0 ? 'selected' : ''}>${escapeHtml(addr.area || '')}${addr.details ? ` - ${escapeHtml(addr.details)}` : ''}</option>
              `).join('')}
              <option value="new">➕ إضافة عنوان جديد</option>
            </select>
          </div>

          <div id="customerNewAddressFields" class="hidden space-y-4 mb-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">المنطقة</label>
              <select id="customerNewAddressArea" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <option value="">اختر المنطقة</option>
                ${areas.map(area => `<option value="${area}">${area}</option>`).join('')}
                <option value="أخرى">أخرى (كتابة يدوية)</option>
              </select>
              <input type="text" id="customerNewAddressAreaManual" placeholder="اكتب المنطقة" class="w-full p-3 border-2 border-gray-300 rounded-lg mt-2 hidden focus:border-blue-600 focus:outline-none">
            </div>

            <div>
              <label class="block mb-2 font-bold text-gray-700">تفاصيل العنوان</label>
              <textarea id="customerNewAddressDetails" rows="3" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"></textarea>
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button onclick="confirmSelectedCustomerAddress()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">تأكيد</button>
            <button onclick="this.closest('.modal-overlay').remove(); showInvoiceCustomerSelection(false)" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">رجوع</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('customerAddressChoice').addEventListener('change', function() {
        document.getElementById('customerNewAddressFields').classList.toggle('hidden', this.value !== 'new');
      });
      document.getElementById('customerNewAddressArea').addEventListener('change', function() {
        document.getElementById('customerNewAddressAreaManual').classList.toggle('hidden', this.value !== 'أخرى');
      });
    }

    async function confirmSelectedCustomerAddress() {
      const customer = currentOrder.customer;
      if (!customer) return;
      const choice = document.getElementById('customerAddressChoice')?.value || '';

      if (choice === 'new') {
        let area = document.getElementById('customerNewAddressArea')?.value || '';
        if (area === 'أخرى') {
          area = document.getElementById('customerNewAddressAreaManual')?.value.trim() || '';
        }
        const details = document.getElementById('customerNewAddressDetails')?.value.trim() || '';

        if (area || details) {
          const nextAddress = { area, details };
          customer.addresses = Array.isArray(customer.addresses) ? customer.addresses : [];
          customer.addresses.push(nextAddress);
          currentOrder.selectedAddress = nextAddress;
          await saveCustomer(customer);
        } else {
          currentOrder.selectedAddress = null;
        }
      } else if (choice !== '') {
        const address = Array.isArray(customer.addresses) ? customer.addresses[parseInt(choice)] : null;
        currentOrder.selectedAddress = address
          ? { area: address.area || '', details: address.details || '' }
          : null;
      } else {
        currentOrder.selectedAddress = null;
      }

      applyDeliveryPriceFromSelectedAddress();
      continueInvoiceAfterCustomerSelection();
    }
    
    function showAddCustomerForDelivery() {
      const searchValue = convertToEnglishNumbers(document.getElementById('customerSearchDelivery')?.value || '').replace(/\D/g, '');
	      document.querySelector('.modal-overlay')?.remove();
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-2xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة عميل جديد</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">اسم الزبون</label>
              <input type="text" id="newCustomerNameDelivery" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            
            <div>
              <label class="block mb-2 font-bold text-gray-700">رقم الهاتف</label>
              <div class="flex gap-2">
                <input type="text" id="newCustomerPrefix" value="965" class="w-24 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <input type="text" id="newCustomerPhoneDelivery" value="${searchValue}" oninput="this.value = convertToEnglishNumbers(this.value)" class="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              </div>
            </div>
            
            <div>
              <label class="block mb-2 font-bold text-gray-700">المنطقة</label>
              <select id="newCustomerArea" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <option value="">اختر المنطقة</option>
                ${areas.map(area => `<option value="${area}">${area}</option>`).join('')}
                <option value="أخرى">أخرى (كتابة يدوية)</option>
              </select>
              <input type="text" id="newCustomerAreaManual" placeholder="اكتب المنطقة" class="w-full p-3 border-2 border-gray-300 rounded-lg mt-2 hidden focus:border-blue-600 focus:outline-none">
            </div>
            
            <div>
              <label class="block mb-2 font-bold text-gray-700">تفاصيل العنوان</label>
              <textarea id="newCustomerAddress" rows="3" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"></textarea>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button onclick="saveNewCustomerDelivery()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ</button>
            <button onclick="this.closest('.modal-overlay').remove(); showCustomerSelectionForDelivery()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      document.getElementById('newCustomerArea').addEventListener('change', function() {
        const manualInput = document.getElementById('newCustomerAreaManual');
        if (this.value === 'أخرى') {
          manualInput.classList.remove('hidden');
        } else {
          manualInput.classList.add('hidden');
        }
      });
    }
    
    async function saveNewCustomerDelivery() {
      const name = document.getElementById('newCustomerNameDelivery').value.trim();
      const prefix = document.getElementById('newCustomerPrefix').value.trim();
      const phone = document.getElementById('newCustomerPhoneDelivery').value.trim();
      let area = document.getElementById('newCustomerArea').value;
      const address = document.getElementById('newCustomerAddress').value.trim();
      
      if (!name || !phone) {
        showToast('الرجاء إدخال الاسم ورقم الهاتف', true);
        return;
      }
      
      if (area === 'أخرى') {
        area = document.getElementById('newCustomerAreaManual').value.trim();
      }
      
      const customer = {
        name,
        phone: prefix + phone,
        addresses: area || address ? [{ area, details: address }] : []
      };
      
      const success = await saveCustomer(customer);
      if (success) {
        showToast('تم إضافة العميل بنجاح');
        currentOrder.customer = customer;
        currentOrder.selectedAddress = customer.addresses[0] || null;
        applyDeliveryPriceFromSelectedAddress();
        document.querySelector('.modal-overlay').remove();
        continueInvoiceAfterCustomerSelection();
      }
    }
    
    function showDeliveryDetails() {
      const customer = currentOrder.customer;
      const hasAddresses = customer.addresses && customer.addresses.length > 0;
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-2xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تفاصيل التوصيل</h2>
          
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <div class="text-lg font-bold">${customer.name}</div>
            <div class="text-gray-600">${customer.phone}</div>
          </div>
          
          ${hasAddresses ? `
            <div class="mb-4">
              <label class="block mb-2 font-bold text-gray-700">اختر العنوان</label>
              <select id="selectedAddress" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                ${customer.addresses.map((addr, idx) => `
                  <option value="${idx}">${addr.area} - ${addr.details}</option>
                `).join('')}
                <option value="new">➕ إضافة عنوان جديد</option>
              </select>
            </div>
            
            <div id="newAddressFields" class="hidden space-y-4 mb-4">
              <div>
                <label class="block mb-2 font-bold text-gray-700">المنطقة</label>
                <select id="newAddressArea" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                  <option value="">اختر المنطقة</option>
                  ${areas.map(area => `<option value="${area}">${area}</option>`).join('')}
                  <option value="أخرى">أخرى (كتابة يدوية)</option>
                </select>
                <input type="text" id="newAddressAreaManual" placeholder="اكتب المنطقة" class="w-full p-3 border-2 border-gray-300 rounded-lg mt-2 hidden focus:border-blue-600 focus:outline-none">
              </div>
              
              <div>
                <label class="block mb-2 font-bold text-gray-700">تفاصيل العنوان</label>
                <textarea id="newAddressDetails" rows="3" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"></textarea>
              </div>
            </div>
          ` : `
            <div class="space-y-4 mb-4">
              <div>
                <label class="block mb-2 font-bold text-gray-700">المنطقة</label>
                <select id="deliveryArea" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                  <option value="">اختر المنطقة</option>
                  ${areas.map(area => `<option value="${area}">${area}</option>`).join('')}
                  <option value="أخرى">أخرى (كتابة يدوية)</option>
                </select>
                <input type="text" id="deliveryAreaManual" placeholder="اكتب المنطقة" class="w-full p-3 border-2 border-gray-300 rounded-lg mt-2 hidden focus:border-blue-600 focus:outline-none">
              </div>
              
              <div>
                <label class="block mb-2 font-bold text-gray-700">تفاصيل العنوان</label>
                <textarea id="deliveryAddressDetails" rows="3" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"></textarea>
              </div>
            </div>
          `}
          
          <div class="mb-6">
            <label class="block mb-2 font-bold text-gray-700">رسوم التوصيل (د.ك)</label>
            <input type="text" id="deliveryPrice" oninput="this.value = convertToEnglishNumbers(this.value)" value="0" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
          </div>
          
          <div class="flex gap-3">
            <button onclick="finalizeDeliveryOrder()" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">التالي</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      if (hasAddresses) {
        document.getElementById('selectedAddress').addEventListener('change', function() {
          const newFields = document.getElementById('newAddressFields');
          if (this.value === 'new') {
            newFields.classList.remove('hidden');
          } else {
            newFields.classList.add('hidden');
          }
        });
        
        document.getElementById('newAddressArea').addEventListener('change', function() {
          const manualInput = document.getElementById('newAddressAreaManual');
          if (this.value === 'أخرى') {
            manualInput.classList.remove('hidden');
          } else {
            manualInput.classList.add('hidden');
          }
        });
      } else {
        document.getElementById('deliveryArea').addEventListener('change', function() {
          const manualInput = document.getElementById('deliveryAreaManual');
          if (this.value === 'أخرى') {
            manualInput.classList.remove('hidden');
          } else {
            manualInput.classList.add('hidden');
          }
        });
      }
    }
    
    async function finalizeDeliveryOrder() {
      const customer = currentOrder.customer;
      const hasAddresses = customer.addresses && customer.addresses.length > 0;
      
      let area, addressDetails;
      
      if (hasAddresses) {
        const selectedIdx = document.getElementById('selectedAddress').value;
        
        if (selectedIdx === 'new') {
          area = document.getElementById('newAddressArea').value;
          if (area === 'أخرى') {
            area = document.getElementById('newAddressAreaManual').value.trim();
          }
          addressDetails = document.getElementById('newAddressDetails').value.trim();
          
          if (!area || !addressDetails) {
            showToast('الرجاء إدخال العنوان الجديد بالكامل', true);
            return;
          }
          
          // Add new address to customer
          customer.addresses.push({ area, details: addressDetails });
          await saveCustomer(customer);
        } else {
          const address = customer.addresses[parseInt(selectedIdx)];
          area = address.area;
          addressDetails = address.details;
        }
      } else {
        area = document.getElementById('deliveryArea').value;
        if (area === 'أخرى') {
          area = document.getElementById('deliveryAreaManual').value.trim();
        }
        addressDetails = document.getElementById('deliveryAddressDetails').value.trim();
        
        if (!area || !addressDetails) {
          showToast('الرجاء إدخال العنوان بالكامل', true);
          return;
        }
        
        // Add address to customer
        customer.addresses = [{ area, details: addressDetails }];
        await saveCustomer(customer);
      }
      
      const deliveryPrice = parseFloat(convertToEnglishNumbers(document.getElementById('deliveryPrice').value)) || 0;
      currentOrder.deliveryPrice = deliveryPrice;
      currentOrder.selectedAddress = { area, details: addressDetails };
      
      document.querySelector('.modal-overlay').remove();
      printAndSaveInvoice();
    }
    
    function showPickupCustomerInfo() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-2xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">معلومات العميل (استلام)</h2>
          
          <div class="mb-4">
            <button onclick="selectExistingCustomerPickup()" class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition mb-2">
              اختيار من العملاء المحفوظين
            </button>
            <div class="text-center text-gray-500 mb-2">أو</div>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">اسم الزبون</label>
              <input type="text" id="pickupCustomerName" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            
            <div>
              <label class="block mb-2 font-bold text-gray-700">رقم الهاتف</label>
              <div class="flex gap-2">
                <input type="text" id="pickupCustomerPrefix" value="965" class="w-24 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <input type="text" id="pickupCustomerPhone" oninput="this.value = convertToEnglishNumbers(this.value)" class="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              </div>
            </div>

            <div>
              <label class="block mb-2 font-bold text-gray-700">فرع الاستلام</label>
              <select id="pickupBranchSelect" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <option value="">اختر فرع الاستلام</option>
                ${PICKUP_BRANCHES.map(branch => `<option value="${branch}" ${currentOrder.pickupBranch === branch ? 'selected' : ''}>${branch}</option>`).join('')}
              </select>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button onclick="finalizePickupOrder()" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">طباعة الفاتورة</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    
    function selectExistingCustomerPickup() {
      document.querySelector('.modal-overlay').remove();
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-4xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">اختر العميل</h2>

          <div class="mb-4">
            <label class="block mb-2 font-bold text-gray-700">فرع الاستلام</label>
            <select id="existingPickupBranchSelect" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              <option value="">اختر فرع الاستلام</option>
              ${PICKUP_BRANCHES.map(branch => `<option value="${branch}" ${currentOrder.pickupBranch === branch ? 'selected' : ''}>${branch}</option>`).join('')}
            </select>
          </div>
          
          <input type="text" id="customerSearchPickup" oninput="filterCustomersPickup()" placeholder="🔍 بحث..." class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
          
          <div class="max-h-96 overflow-y-auto">
            ${allCustomers.map(customer => `
              <div class="customer-pickup-item bg-gray-50 p-4 rounded-lg mb-2 cursor-pointer hover:bg-blue-50 transition" data-search="${customer.name} ${customer.phone}" onclick="selectCustomerPickup('${customer.id}')">
                <div class="font-bold text-lg">${customer.name}</div>
                <div class="text-gray-600">${customer.phone}</div>
              </div>
            `).join('')}
          </div>
          
          <button onclick="this.closest('.modal-overlay').remove(); showPickupCustomerInfo()" class="w-full mt-4 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
        </div>
      `;
      document.body.appendChild(modal);
    }
    
    function filterCustomersPickup() {
      const searchTerm = document.getElementById('customerSearchPickup').value.toLowerCase();
      const items = document.querySelectorAll('.customer-pickup-item');
      
      items.forEach(item => {
        const searchData = item.getAttribute('data-search').toLowerCase();
        item.style.display = searchData.includes(searchTerm) ? '' : 'none';
      });
    }
    
    function selectCustomerPickup(customerId) {
      const pickupBranch = (document.getElementById('existingPickupBranchSelect')?.value || '').trim();
      if (!pickupBranch) {
        showToast('اختر فرع الاستلام', true);
        return;
      }
      const customer = allCustomers.find(c => c.id === customerId);
      currentOrder.customer = {
        name: customer.name,
        phone: customer.phone
      };
      currentOrder.pickupBranch = pickupBranch;
      document.querySelector('.modal-overlay').remove();
      printAndSaveInvoice();
    }
    
    function finalizePickupOrder() {
      const name = document.getElementById('pickupCustomerName').value.trim();
      const prefix = document.getElementById('pickupCustomerPrefix').value.trim();
      const phone = document.getElementById('pickupCustomerPhone').value.trim();
      const pickupBranch = (document.getElementById('pickupBranchSelect')?.value || '').trim();
      
      if (!name || !phone) {
        showToast('الرجاء إدخال الاسم ورقم الهاتف', true);
        return;
      }
      if (!pickupBranch) {
        showToast('اختر فرع الاستلام', true);
        return;
      }
      
      currentOrder.customer = {
        name,
        phone: prefix + phone
      };
      currentOrder.pickupBranch = pickupBranch;
      
      document.querySelector('.modal-overlay').remove();
      printAndSaveInvoice();
    }
    
    async function printAndSaveInvoice() {
      // Invoice numbering follows the cashier branch; pickup branch is saved separately.
      const invoiceNumber = await generateInvoiceNumber(currentBranch);
      const timestamp = Date.now();
      
      // Clean items to ensure all fields have valid values
      const cleanedItems = currentOrder.items.map(item => ({
        productId: item.productId || '',
        productName: item.productName || '',
        productNameEn: item.productNameEn || '', 
        price: item.price || 0,
        quantity: item.quantity || 0,
        total: item.total || 0,
        unit: item.unit || '',
        notes: item.notes || ''
      }));
      
      const order = {
        invoiceNumber,
        timestamp,
        cashier: currentCashier.name || '',
        cashierCode: currentCashier.code || '',
        branch: currentBranch || '',
        dailySessionId: currentBranch === 'اليرموك' && currentDailySession ? currentDailySession.id : '',
        customerName: currentOrder.customer.name || '',
        phoneNumber: currentOrder.customer.phone || '',
        orderType: currentOrder.orderType || '',
        paymentMethod: currentOrder.paymentMethod || '',
        pickupBranch: currentOrder.pickupBranch || '',
        address: currentOrder.orderType === 'delivery' && currentOrder.selectedAddress
          ? `${currentOrder.selectedAddress.area || ''}${currentOrder.selectedAddress.details ? ` - ${currentOrder.selectedAddress.details}` : ''}`.trim()
          : '',
        deliveryDate: currentOrder.deliveryDate || '',
        deliveryTimeFrom: currentOrder.deliveryTimeFrom || '',
        deliveryTimeTo: currentOrder.deliveryTimeTo || '',
        items: cleanedItems,
        deliveryPrice: currentOrder.deliveryPrice || 0,
        cashReceived: currentOrder.cashReceived || 0,
        cashChange: currentOrder.cashChange || 0,
        notes: currentOrder.notes || '',
        total: currentOrder.items.reduce((sum, item) => sum + item.total, 0) + (currentOrder.deliveryPrice || 0)
      };
      
      try {
        const orderId = generateId();
        await db.ref(`orders/${orderId}`).set({ ...order, id: orderId });
        await loadData();
        
        closeInvoicePage();
        showThermalInvoice(order);
        showToast('تم حفظ الفاتورة بنجاح');
      } catch (error) {
        console.error('Error saving order:', error);
        showToast('خطأ في حفظ الفاتورة', true);
      }
    }
    
    function showThermalInvoice(order) {
  const invoiceDeliveryFee = getOrderDeliveryFee(order);
  const invoiceItemsSubtotal = getOrderItemsGrossTotal(order);
  const invoiceDiscountTotal = getOrderDiscountTotal(order);
  const invoiceItemsNetTotal = getOrderItemsNetTotal(order);
  const invoiceGrandTotal = invoiceItemsNetTotal + invoiceDeliveryFee;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content p-0" style="background: #f3f4f6; max-height: 92vh; display: flex; flex-direction: column; overflow: hidden;">
      <div style="overflow-y: auto; padding: 16px 16px 8px; min-height: 0;">
        <div class="thermal-invoice" style="width: 72mm; margin: 0 auto; padding: 10px; background: white; border-radius: 8px;">
        <div style="text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 10px;">
          <img src="logo.png" alt="الشعار" style="width: 100px; height: 100px; margin: 0 auto 10px auto; display: block; object-fit: contain;" onerror="this.style.display='none';">
          <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">مخبز التين والزيتون</div>
          <div style="font-size: 8px; line-height: 1.4;">
            الكويت، اليرموك، ق٢ شارع ٢<br>
            22085889 | 65162277<br>
            @figsolives.kw
          </div>
          
          <div style="margin: 10px 0; border-top: 1px solid #ccc; padding: 5px 0;">
            <div style="font-size: 16px; font-weight: bold; margin-bottom: 3px;">مطعم التين الطبيعي</div>
            <div style="font-size: 8px; line-height: 1.4;">
              الكويت، أبو الحصانية، مول ٣٠<br>
              22085886 | 99176512<br>
              @natural_figs
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 8px; border-bottom: 1px dashed #ccc; padding-bottom: 5px; font-size: 11px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span>رقم الفاتورة: <strong>#${order.invoiceNumber}</strong></span>
            <span>التاريخ: ${formatDate(order.timestamp)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>الكاشير: ${order.cashier}</span>
            <span>الوقت: ${formatTime(order.timestamp)}</span>
          </div>
        </div>
        
        <div style="background: #f9f9f9; padding: 5px; border-radius: 3px; margin-bottom: 8px; font-size: 11px;">
          <div style="font-weight: bold; border-bottom: 1px solid #eee; margin-bottom: 3px;">العميل: ${order.customerName}</div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span>📞 ${order.phoneNumber.replace(/^\+?965\s?/, '')}</span>
            <span style="background: #000; color: #fff; padding: 0 5px; border-radius: 2px;">${order.orderType === 'delivery' ? 'توصيل' : 'استلام'}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>${order.address ? `📍 ${order.address}` : ''}</span>
            <span style="background: #000; color: #fff; padding: 0 5px; border-radius: 2px;">${getPaymentMethodLabel(order.paymentMethod, false)}</span>
          </div>
          ${order.orderType === 'delivery' && order.deliveryDate ? `
            <div style="font-size: 10px; color: #166534; margin-top: 4px;">
              ⏱️ التوصيل: ${formatDeliveryDateWithDay(order.deliveryDate)}<br>
              <span style="display: inline-block; margin-top: 2px;">بين الساعة ${formatDeliveryDisplayTime(order.deliveryTimeFrom)} و ${formatDeliveryDisplayTime(order.deliveryTimeTo)}</span>
            </div>
          ` : ''}
          ${order.orderType === 'pickup' && order.pickupBranch ? `
            <div style="font-size: 10px; color: #1d4ed8; margin-top: 4px;">
              🛍️ فرع الاستلام: ${order.pickupBranch}
            </div>
          ` : ''}
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
          <thead>
            <tr>
              <th style="text-align: right; border-bottom: 1px solid #000; padding: 4px 0;">الصنف</th>
              <th style="text-align: center; width: 40px; border-bottom: 1px solid #000; padding: 4px 0;">الكمية</th>
              <th style="text-align: left; width: 60px; border-bottom: 1px solid #000; padding: 4px 0;">السعر</th>
            </tr>
          </thead>
          <tbody>
              ${order.items.map(item => `
              <tr>
                <td style="padding: 4px 0; border-bottom: 1px dotted #eee;">
                  <div style="font-weight: 700;">${item.productName}</div>
                  ${item.productNameEn ? `<div style="font-size: 9px; color: #666;">${item.productNameEn}</div>` : ''}
                  ${getItemDiscountAmount(item) > 0 ? `<div style="font-size: 9px; color: #b91c1c;">خصم ${formatNumberWithThreeDecimals(item.discountPercent)}%: ${getItemDiscountAmount(item).toFixed(3)} د.ك</div>` : ''}
                  ${item.notes ? `<div style="font-size: 10px; color: #0066cc; margin-top: 2px; font-weight: 600;">📝 ${item.notes}</div>` : ''}
                </td>
                <td style="text-align: center; font-weight: bold; padding: 4px 0; border-bottom: 1px dotted #eee;">${item.quantity}</td>
                <td style="text-align: left; padding: 4px 0; border-bottom: 1px dotted #eee;">${formatNumberWithThreeDecimals(item.total)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top: 10px; border-top: 1px solid #000; padding-top: 5px; font-size: 11px;">
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 2px;">
            <span>مجموع الأصناف:</span>
            <span>${invoiceItemsSubtotal.toFixed(3)} د.ك</span>
          </div>
          ${invoiceDiscountTotal > 0 ? `
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 2px; color: #b91c1c;">
              <span>المبلغ المخصوم:</span>
              <span>-${invoiceDiscountTotal.toFixed(3)} د.ك</span>
            </div>
          ` : ''}
          ${invoiceDeliveryFee > 0 ? `
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 2px;">
              <span>رسوم التوصيل:</span>
              <span>${invoiceDeliveryFee.toFixed(3)} د.ك</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 900; margin-top: 5px; border-top: 2px double #000; padding-top: 5px;">
            <span>الإجمالي:</span>
            <span>${invoiceGrandTotal.toFixed(3)} د.ك</span>
          </div>
          ${order.paymentMethod === 'cash' && (parseFloat(order.cashReceived) || 0) > 0 ? `
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-top: 5px;">
              <span>المستلم:</span>
              <span>${(parseFloat(order.cashReceived) || 0).toFixed(3)} د.ك</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 11px;">
              <span>الباقي:</span>
              <span>${(parseFloat(order.cashChange) || 0).toFixed(3)} د.ك</span>
            </div>
          ` : ''}
        </div>

        ${order.notes ? `
<div style="background: #fffbeb; border: 1px dashed #fbbf24; border-radius: 4px; padding: 8px; margin-top: 10px; font-size: 11px;">
  <div style="font-weight: bold; margin-bottom: 3px; color: #92400e;">📝 ملاحظات:</div>
  <div style="color: #451a03; line-height: 1.4;">${order.notes}</div>
</div>
` : ''}

        <div style="text-align: center; margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px;">
          <div style="font-size: 11px; font-weight: bold;">شكراً لزيارتكم!</div>
          <div style="font-size: 9px; color: #666; margin-top: 3px;">صحتك أغلى ما تملك،، فتناول شيئاً صحياً.</div>
        </div>
        </div>
      </div>
      
      <div class="flex gap-2" style="padding: 12px 16px 16px; background: #f3f4f6; border-top: 1px solid #e5e7eb; flex-shrink: 0;">
        <button onclick="printThermalInvoice(this)" style="flex: 2; background: #2563eb; color: white; padding: 12px; border-radius: 8px; font-weight: bold; border: none; cursor: pointer;">
          🖨️ طباعة الفاتورة
        </button>
        <button onclick="this.closest('.modal-overlay').remove();" style="flex: 1; background: #e5e7eb; color: #374151; padding: 12px; border-radius: 8px; font-weight: bold; border: none; cursor: pointer;">
          إلغاء
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}


    function printThermalInvoice(button) {
  const invoiceContent = button.closest('.modal-content').querySelector('.thermal-invoice').innerHTML;
  
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>طباعة الفاتورة</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          size: 80mm auto;
          margin: 0;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          width: 80mm;
          height: auto;
        }
        
        body {
          font-family: 'Cairo', sans-serif;
          background: white;
          padding: 3mm 2mm;
          font-size: 15px;
        }
        
        .thermal-invoice {
          width: 100%;
          max-width: 69mm;
          margin: 0 auto;
          padding: 0;
        }
        
        .thermal-invoice * {
          font-size: 15px !important;
          line-height: 1.5;
          letter-spacing: 0.3px;
        }
        
        .thermal-invoice strong,
        .thermal-invoice b {
          font-size: 17px !important;
          font-weight: 700;
        }
        
        @media print {
          html, body {
            height: auto;
            overflow: visible;
          }
          
          body {
            padding: 2mm;
            font-size: 15px;
          }
          
          .thermal-invoice {
            page-break-after: avoid;
          }
          
          .thermal-invoice * {
            font-size: 15px !important;
          }
          
          .thermal-invoice strong,
          .thermal-invoice b {
            font-size: 17px !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="thermal-invoice">
        ${invoiceContent}
      </div>
      <script>
        window.print();
        window.onafterprint = function() {
          window.close();
        };
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

    async function updateOrderCourierName(orderId, courierName) {
      try {
        await db.ref(`orders/${orderId}`).update({
          courierName: (courierName || '').trim(),
          courierHandoverStarted: true,
          courierHandoverAt: Date.now()
        });
        const order = allOrders.find(item => item.id === orderId);
        if (order) {
          order.courierName = (courierName || '').trim();
          order.courierHandoverStarted = true;
          order.courierHandoverAt = Date.now();
        }
        showToast('تم حفظ اسم المندوب');
      } catch (error) {
        console.error('Error saving courier name:', error);
        showToast('تعذر حفظ اسم المندوب', true);
      }
    }

    async function markOrderHandedToCourier(orderId) {
      try {
        await db.ref(`orders/${orderId}`).update({
          courierHandoverStarted: true,
          courierHandoverAt: Date.now()
        });
        const order = allOrders.find(item => item.id === orderId);
        if (order) {
          order.courierHandoverStarted = true;
          order.courierHandoverAt = Date.now();
        }
        renderCashier();
        showToast('اكتب اسم المندوب');
      } catch (error) {
        console.error('Error marking courier handover:', error);
        showToast('تعذر تحديث حالة التسليم للمندوب', true);
      }
    }

    function getCurrentDailySessionOrders() {
      if (!currentDailySession) return [];
      return getDailySessionOrders(currentDailySession);
    }

    function getDailySessionOrders(session) {
      if (!session) return [];
      return allOrders
        .filter(order => {
          const belongsById = order.dailySessionId && order.dailySessionId === session.id;
          const belongsByTime = !order.dailySessionId &&
            order.branch === session.branch &&
            order.cashierCode === session.cashierCode &&
            (order.timestamp || 0) >= (session.openedAt || 0) &&
            (!session.closedAt || (order.timestamp || 0) <= session.closedAt);
          return belongsById || belongsByTime;
        })
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    }

    function getLocalDateValueFromTimestamp(timestamp) {
      const date = new Date(timestamp || Date.now());
      const pad = (value) => String(value).padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }

    function getDeliveryTimeRangeText(order) {
      const from = formatDeliveryDisplayTime(order.deliveryTimeFrom);
      const to = formatDeliveryDisplayTime(order.deliveryTimeTo);
      return `بين الساعة ${from} و ${to}`;
    }

    function getDeliveryDateAndTimeText(order) {
      const dateText = order.deliveryDate ? formatDeliveryDateWithDay(order.deliveryDate) : '-';
      return `${dateText} - ${getDeliveryTimeRangeText(order)}`;
    }

    function showDailyBalanceStart() {
      if (!currentDailySession) {
        showToast('لا توجد يومية مفتوحة', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-md text-center">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">موازنة اليومية</h2>
          <p class="text-gray-700 mb-6 text-lg font-bold">هل يوجد لديك مدفوعات؟</p>
          <div class="grid grid-cols-1 gap-3">
            <div class="flex gap-3">
              <button onclick="this.closest('.modal-overlay').remove(); showDailyPaymentsModal()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">نعم</button>
              <button onclick="this.closest('.modal-overlay').remove(); finalizeDailyBalance([])" class="flex-1 bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-900 transition">لا</button>
            </div>
            <button onclick="this.closest('.modal-overlay').remove()" class="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function showDailyPaymentsModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-2xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6 text-center">مدفوعات اليومية</h2>
          <div id="dailyPaymentsRows" class="space-y-3"></div>
          <button onclick="addDailyPaymentRow()" class="w-full mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">+ إضافة دفعة</button>
          <div class="flex gap-3 mt-6">
            <button onclick="finalizeDailyBalanceFromModal()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">طباعة الموازنة</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      addDailyPaymentRow();
    }

    function addDailyPaymentRow() {
      const container = document.getElementById('dailyPaymentsRows');
      if (!container) return;
      const row = document.createElement('div');
      row.className = 'grid grid-cols-1 md:grid-cols-12 gap-3 items-center';
      row.innerHTML = `
        <input type="text" placeholder="اسم الدفعة" class="daily-payment-name md:col-span-6 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
        <input type="text" placeholder="المبلغ" oninput="this.value = convertToEnglishNumbers(this.value)" class="daily-payment-amount md:col-span-5 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
        <button onclick="this.closest('.grid').remove()" class="md:col-span-1 bg-red-100 text-red-700 p-3 rounded-lg font-bold hover:bg-red-200 transition">×</button>
      `;
      container.appendChild(row);
    }

    function finalizeDailyBalanceFromModal() {
      const rows = Array.from(document.querySelectorAll('#dailyPaymentsRows .grid'));
      const payments = [];

      for (const row of rows) {
        const name = row.querySelector('.daily-payment-name')?.value.trim() || '';
        const amountValue = convertToEnglishNumbers(row.querySelector('.daily-payment-amount')?.value || '').trim();
        const amount = parseFloat(amountValue);
        if (!name && !amountValue) continue;
        if (!name || isNaN(amount)) {
          showToast('أكمل اسم الدفعة والمبلغ لكل المدفوعات', true);
          return;
        }
        payments.push({ name, amount: parseFloat(amount.toFixed(3)) });
      }

      document.querySelector('.modal-overlay')?.remove();
      finalizeDailyBalance(payments);
    }

    function getDailyBalanceSummary(payments) {
      const orders = getCurrentDailySessionOrders();
      return buildDailyBalanceSummary(currentDailySession, orders, payments);
    }

    function buildDailyBalanceSummary(session, orders, payments) {
      const totals = { cash: 0, online: 0, knet: 0 };
      orders.forEach(order => {
        const total = parseFloat(order.total) || 0;
        if (order.paymentMethod === 'cash') totals.cash += total;
        if (order.paymentMethod === 'online') totals.online += total;
        if (order.paymentMethod === 'knet') totals.knet += total;
      });
      const deliveryOrders = orders.filter(order => order.orderType === 'delivery');
      const deliveredDeliveryOrders = deliveryOrders.filter(order => (order.courierName || '').trim());
      const pendingDeliveryOrders = deliveryOrders.filter(order => !(order.courierName || '').trim());
      const sessionDate = getLocalDateValueFromTimestamp(session?.openedAt || Date.now());
      const sameDayPendingDeliveryOrders = pendingDeliveryOrders.filter(order => !order.deliveryDate || order.deliveryDate === sessionDate);
      const futurePendingDeliveryOrders = pendingDeliveryOrders.filter(order => order.deliveryDate && order.deliveryDate !== sessionDate);
      return {
        orders,
        deliveryOrders,
        deliveredDeliveryOrders,
        sameDayPendingDeliveryOrders,
        futurePendingDeliveryOrders,
        totals,
        payments,
        firstInvoice: orders[0]?.invoiceNumber || '-',
        lastInvoice: orders[orders.length - 1]?.invoiceNumber || '-'
      };
    }

    function renderDailySessionsSection() {
      const sessions = allDailySessions.slice().sort((a, b) => (b.openedAt || 0) - (a.openedAt || 0));
      return `
        <div>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-blue-600">يوميات الموظفين</h2>
            <div class="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold">عدد اليوميات: ${sessions.length}</div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>الموظف</th>
                    <th>الفرع</th>
                    <th>فتح اليومية</th>
                    <th>إغلاق اليومية</th>
                    <th>مبلغ البداية</th>
                    <th>الحالة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  ${sessions.length > 0 ? sessions.map(session => `
                    <tr>
                      <td>${escapeHtml(session.cashierName || '-')}</td>
                      <td>${escapeHtml(session.branch || '-')}</td>
                      <td>${session.openedAt ? `${formatDate(session.openedAt)} ${formatTime(session.openedAt)}` : '-'}</td>
                      <td>${session.closedAt ? `${formatDate(session.closedAt)} ${formatTime(session.closedAt)}` : '-'}</td>
                      <td>${formatNumberWithThreeDecimals(session.openingAmount)} د.ك</td>
                      <td>${session.status === 'closed' ? 'مغلقة' : 'مفتوحة'}</td>
                      <td>
                        <button onclick="reprintDailySession('${session.id}')" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition">طباعة</button>
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="7" class="text-center text-gray-500 py-8">لا توجد يوميات محفوظة</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    function reprintDailySession(sessionId) {
      const session = allDailySessions.find(item => item.id === sessionId);
      if (!session) {
        showToast('اليومية غير موجودة', true);
        return;
      }
      const orders = getDailySessionOrders(session);
      const summary = buildDailyBalanceSummary(session, orders, Array.isArray(session.payments) ? session.payments : []);
      printDailyBalanceReport(session, summary);
    }

    async function finalizeDailyBalance(payments) {
      if (!currentDailySession) {
        showToast('لا توجد يومية مفتوحة', true);
        return;
      }

      const summary = getDailyBalanceSummary(payments);

      const closedAt = Date.now();
      const balanceData = {
        status: 'closed',
        closedAt,
        payments,
        totals: summary.totals,
        firstInvoice: summary.firstInvoice,
        lastInvoice: summary.lastInvoice,
        ordersCount: summary.orders.length,
        deliveryOrdersCount: summary.deliveryOrders.length,
        pendingSameDayDeliveryOrdersCount: summary.sameDayPendingDeliveryOrders.length,
        pendingFutureDeliveryOrdersCount: summary.futurePendingDeliveryOrders.length
      };

      try {
        await db.ref(`dailySessions/${currentDailySession.id}`).update(balanceData);
        const reportSession = { ...currentDailySession, ...balanceData };
        printDailyBalanceReport(reportSession, summary);
        currentDailySession = null;
        showToast('تمت موازنة اليومية');
        renderCashier();
      } catch (error) {
        console.error('Error closing daily balance:', error);
        showToast('تعذر حفظ الموازنة', true);
      }
    }

    function printDailyBalanceReport(session, summary) {
      const paymentsTotal = summary.payments.reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0);
      const deliveryRows = summary.deliveredDeliveryOrders.map(order => `
        <tr>
          <td>${order.invoiceNumber || '-'}</td>
          <td>${getPaymentMethodLabel(order.paymentMethod, false)}</td>
          <td>${formatNumberWithThreeDecimals(order.total)}</td>
          <td>${formatNumberWithThreeDecimals(order.deliveryPrice || order.deliveryFee || 0)}</td>
          <td>${escapeHtml(order.courierName || '-')}</td>
        </tr>
      `).join('');
      const sameDayPendingRows = summary.sameDayPendingDeliveryOrders.map(order => `
        <tr>
          <td>${order.invoiceNumber || '-'}</td>
          <td>${getPaymentMethodLabel(order.paymentMethod, false)}</td>
          <td>${formatNumberWithThreeDecimals(order.total)}</td>
          <td>${formatNumberWithThreeDecimals(order.deliveryPrice || order.deliveryFee || 0)}</td>
          <td>${getDeliveryTimeRangeText(order)}</td>
        </tr>
      `).join('');
      const futurePendingRows = summary.futurePendingDeliveryOrders.map(order => `
        <tr>
          <td>${order.invoiceNumber || '-'}</td>
          <td>${getPaymentMethodLabel(order.paymentMethod, false)}</td>
          <td>${formatNumberWithThreeDecimals(order.total)}</td>
          <td>${getDeliveryDateAndTimeText(order)}</td>
        </tr>
      `).join('');

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) {
        showToast('تعذر فتح نافذة الطباعة. يرجى السماح بالنوافذ المنبثقة.', true);
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <title>يومية الموظف</title>
          <style>
            @page { size: 80mm auto; margin: 0; }
            * { box-sizing: border-box; }
            body { width: 80mm; margin: 0; padding: 4mm 7mm; font-family: Arial, sans-serif; color: #111; }
            .receipt { width: 64mm; margin: 0 auto; }
            .center { text-align: center; }
            .logo { width: 26mm; height: 26mm; object-fit: contain; margin: 0 auto 2mm; display: block; }
            h1 { font-size: 18px; margin: 2mm 0; }
            h2 { font-size: 14px; margin: 4mm 0 2mm; border-top: 1px dashed #000; padding-top: 2mm; }
            .row { display: flex; justify-content: space-between; gap: 3mm; font-size: 12px; margin: 1.5mm 0; }
            .bold { font-weight: 700; }
            table { width: 100%; border-collapse: collapse; font-size: 8px; margin-top: 2mm; table-layout: fixed; }
            th { background: #e5e7eb; border-bottom: 1px solid #000; padding: 1mm 0.5mm; }
            td { border-bottom: 1px dotted #bbb; padding: 1mm 0.5mm; text-align: center; overflow-wrap: anywhere; }
            .thanks { text-align: center; font-weight: 900; font-size: 15px; margin-top: 5mm; border-top: 1px dashed #000; padding-top: 3mm; }
          </style>
        </head>
        <body>
        <div class="receipt">
          <img src="logo.png" class="logo" onerror="this.style.display='none'">
          <h1 class="center">يومية الموظف ${escapeHtml(session.cashierName || '')}</h1>
          <div class="row"><span>فتح اليومية:</span><span class="bold">${formatDate(session.openedAt)} ${formatTime(session.openedAt)}</span></div>
          <div class="row"><span>مبلغ البداية:</span><span class="bold">${formatNumberWithThreeDecimals(session.openingAmount)} د.ك</span></div>
          <div class="row"><span>إغلاق اليومية:</span><span class="bold">${formatDate(session.closedAt)} ${formatTime(session.closedAt)}</span></div>

          <h2>الإيرادات</h2>
          <div class="row"><span>كاش</span><span class="bold">${formatNumberWithThreeDecimals(summary.totals.cash)} د.ك</span></div>
          <div class="row"><span>أونلاين</span><span class="bold">${formatNumberWithThreeDecimals(summary.totals.online)} د.ك</span></div>
          <div class="row"><span>كي نت</span><span class="bold">${formatNumberWithThreeDecimals(summary.totals.knet)} د.ك</span></div>

          <h2>مدفوعات</h2>
          ${summary.payments.length > 0 ? summary.payments.map(payment => `
            <div class="row"><span>${escapeHtml(payment.name)}</span><span class="bold">${formatNumberWithThreeDecimals(payment.amount)} د.ك</span></div>
          `).join('') : '<div class="row"><span>لا توجد مدفوعات</span><span class="bold">0.000 د.ك</span></div>'}
          <div class="row"><span>إجمالي المدفوعات</span><span class="bold">${formatNumberWithThreeDecimals(paymentsTotal)} د.ك</span></div>

          <h2>الفواتير</h2>
          <div class="row"><span>رقم أول فاتورة:</span><span class="bold">${summary.firstInvoice}</span></div>
          <div class="row"><span>رقم آخر فاتورة:</span><span class="bold">${summary.lastInvoice}</span></div>

          <h2>فواتير التوصيل المسلمة للمندوب</h2>
          <table>
            <thead>
              <tr>
                <th>الفاتورة</th>
                <th>الدفع</th>
                <th>القيمة</th>
                <th>التوصيل</th>
                <th>المندوب</th>
              </tr>
            </thead>
            <tbody>
              ${deliveryRows || '<tr><td colspan="5">لا توجد فواتير توصيل مسلمة</td></tr>'}
            </tbody>
          </table>

          ${sameDayPendingRows ? `
            <h2>فواتير توصيل سيتابعها الكاشير التالي</h2>
            <table>
              <thead>
                <tr>
                  <th>الفاتورة</th>
                  <th>الدفع</th>
                  <th>القيمة</th>
                  <th>التوصيل</th>
                  <th>موعد التوصيل</th>
                </tr>
              </thead>
              <tbody>${sameDayPendingRows}</tbody>
            </table>
          ` : ''}

          ${futurePendingRows ? `
            <h2>فواتير توصيل مؤجلة ليوم آخر</h2>
            <table>
              <thead>
                <tr>
                  <th>الفاتورة</th>
                  <th>الدفع</th>
                  <th>القيمة</th>
                  <th>موعد توصيلها</th>
                </tr>
              </thead>
              <tbody>${futurePendingRows}</tbody>
            </table>
          ` : ''}

          <div class="thanks">***شكراً***</div>
        </div>
          <script>
            window.print();
            window.onafterprint = function() { window.close(); };
          <\/script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }

    
    async function reprintInvoice(orderId) {
      try {
        const snapshot = await db.ref(`orders/${orderId}`).once('value');
        const latestOrder = snapshot.val();
        const order = latestOrder ? { id: orderId, ...latestOrder } : allOrders.find(o => o.id === orderId);

        if (!order) {
          showToast('الفاتورة غير موجودة', true);
          return;
        }

        showThermalInvoice(order);
      } catch (error) {
        console.error('Error reprinting invoice:', error);
        const order = allOrders.find(o => o.id === orderId);
        if (order) {
          showThermalInvoice(order);
          return;
        }
        showToast('تعذر تحميل الفاتورة للطباعة', true);
      }
    }

    function logoutCashier() {
      if (currentBranch === 'اليرموك' && currentDailySession && currentDailySession.status === 'open') {
        showToast('يجب عمل موازنة قبل تسجيل الخروج', true);
        showDailyBalanceStart();
        return;
      }
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-blue-600 mb-4">تأكيد الخروج</h2>
          <p class="text-gray-600 mb-6">هل أنت متأكد من الخروج؟</p>
          <div class="flex gap-3">
            <button onclick="confirmLogoutCashier()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function confirmLogoutCashier() {
      currentCashier = null;
      currentBranch = null;
      currentDailySession = null;
      currentOrder = {
        items: [],
        customer: null,
        deliveryPrice: 0,
        orderType: null,
        paymentMethod: '',
        selectedAddress: null,
        deliveryTimingType: 'within2',
        deliveryDate: '',
        deliveryTimeFrom: '',
        deliveryTimeTo: '',
        pickupBranch: '',
        cashReceived: 0,
        cashChange: 0
      };
      document.querySelector('.modal-overlay').remove();
      currentScreen = 'home';
      renderHome();
    }

    // ==================== ACCOUNTING INTERFACE ====================

    function renderAccounting(section) {
      const app = document.getElementById('app');
      
      app.innerHTML = `
        <div class="flex h-full">
          <div class="w-64 bg-gray-800 text-white p-6">
            <h2 class="text-2xl font-bold mb-8">📊 المحاسبة</h2>
            <div class="space-y-2">
              <div class="sidebar-item ${section === 'orders' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('orders')">
                📦 الطلبات
              </div>
              <div class="sidebar-item ${section === 'salesReport' || section === 'salesReportBranchDetails' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('salesReport')">
                📈 تقرير المبيعات
              </div>
              <div class="sidebar-item ${section === 'customers' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('customers')">
                👥 العملاء
              </div>
              <div class="sidebar-item ${section === 'products' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('products')">
                🛍️ المنتجات
              </div>
              <div class="sidebar-item ${section === 'priceChangeReport' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('priceChangeReport')">
                📊 تقرير الزيادة والتخفيض
              </div>
              <div class="sidebar-item ${section === 'categories' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('categories')">
                📁 الأقسام
              </div>
              <div class="sidebar-item ${section === 'devices' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('devices')">
                🖥️ الأجهزة والكاشير
              </div>
            </div>
            <button onclick="logout()" class="w-full mt-8 bg-red-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-red-700 transition">خروج</button>
          </div>
          
          <div class="flex-1 p-8 overflow-y-auto bg-gray-50">
            <div id="contentArea">
              ${renderAccountingContent(section)}
            </div>
          </div>
        </div>
      `;
    }

    function logout() {
      currentScreen = 'home';
      renderHome();
    }

    // 1. الدالة الرئيسية للمحاسبة (تقوم بحفظ القسم الحالي ورسم الهيكل)
function renderAccounting(section) {
  // حفظ القسم الحالي في المتغير العام لكي تعرف دالة التحديث اللحظي ماذا تُحدث
  currentAccountingSection = section; 
  if (section !== 'issue') {
    isIssueVoucherModalOpen = false;
    editingIssueVoucherId = '';
    issueProductSearchTerm = '';
  }
  if (section !== 'transfer') {
    isTransferVoucherModalOpen = false;
    editingTransferVoucherId = '';
    transferProductSearchTerm = '';
  }
  if (section !== 'purchase') {
    isPurchaseVoucherModalOpen = false;
    editingPurchaseVoucherId = '';
    purchaseProductSearchTerm = '';
  }
  
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="flex h-full">
      <div class="w-64 bg-gray-800 text-white p-6 no-print">
        <h2 class="text-2xl font-bold mb-8">📊 المحاسبة</h2>
        <div class="space-y-2">
          <div class="sidebar-item ${section === 'orders' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('orders')">
            📦 الطلبات
          </div>
          <div class="sidebar-item ${section === 'discountRequests' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('discountRequests')">
            🏷️ طلبات الخصومات
          </div>
          <div class="sidebar-item ${section === 'salesReport' || section === 'salesReportBranchDetails' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('salesReport')">
            📈 تقرير المبيعات
          </div>
          <div class="sidebar-item ${section === 'customers' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('customers')">
            👥 العملاء
          </div>
          <div class="sidebar-item ${section === 'products' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('products')">
            🛍️ المنتجات
          </div>
          <div class="sidebar-item ${section === 'productInfo' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('productInfo')">
            🧾 معلومات المنتجات
          </div>
          <div class="sidebar-item ${section === 'productionStickers' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('productionStickers')">
            🏷️ ستيكرات الإنتاج
          </div>
          <div class="sidebar-item ${section === 'priceChangeReport' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('priceChangeReport')">
            📊 تقرير الزيادة والتخفيض
          </div>
          <div class="sidebar-item ${section === 'categories' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('categories')">
            📁 الأقسام
          </div>
          <div class="sidebar-item ${section === 'deliveryPrices' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('deliveryPrices')">
            🚚 أسعار التوصيل
          </div>
          <div class="sidebar-item ${section === 'dailySessions' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('dailySessions')">
            🧾 يوميات الموظفين
          </div>
          <div class="sidebar-item ${['inventory', 'inventoryProducts', 'inventoryCategories', 'inventoryCategoryDetails'].includes(section) ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('inventory')">
            📦 متابعة المخزون
          </div>
          <div class="sidebar-item ${['suppliers', 'supplierDetails'].includes(section) ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('suppliers')">
            🚚 الموردين
          </div>
          <div class="sidebar-item ${section === 'issue' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('issue')">
            🧾 صرف
          </div>
          <div class="sidebar-item ${section === 'purchase' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('purchase')">
            🛒 شراء
          </div>
          <div class="sidebar-item ${section === 'transfer' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('transfer')">
            🔁 تحويلات
          </div>
          <div class="sidebar-item ${section === 'devices' ? 'active' : ''} p-3 rounded-lg" onclick="renderAccounting('devices')">
            🖥️ الأجهزة والكاشير
          </div>
        </div>
        <button onclick="logout()" class="w-full mt-8 bg-red-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-red-700 transition">خروج</button>
      </div>
      
      <div class="flex-1 p-8 overflow-y-auto bg-gray-50">
        <div id="contentArea">
          ${renderAccountingContent(section)}
        </div>
      </div>
    </div>
  `;

  if (section === 'orders') {
    setTimeout(renderAccountingOrdersRowsChunked, 0);
  }
}

// 2. الدالة المساعدة (تختار أي قسم يتم عرضه داخل منطقة المحتوى)
function renderAccountingContent(section) {
  switch(section) {
    case 'orders': 
      return renderOrdersSection();
    case 'discountRequests':
      return renderDiscountRequestsSection();
    case 'salesReport':
      return renderSalesReportSection();
    case 'salesReportBranchDetails':
      return renderSalesReportBranchDetailsSection();
    case 'customers': 
      return renderCustomersSection();
    case 'products': 
      return renderProductsSection();
    case 'productInfo':
      return renderProductInfoSection();
    case 'productionStickers':
      return renderProductionStickersSection();
    case 'priceChangeReport':
      return renderPriceChangeReportSection();
    case 'categories': 
      return renderCategoriesSection();
    case 'deliveryPrices':
      return renderDeliveryPricesSection();
    case 'dailySessions':
      return renderDailySessionsSection();
    case 'inventory':
      return renderInventorySection();
    case 'inventoryProducts':
      return renderInventoryProductsSection();
    case 'inventoryCategories':
      return renderInventoryCategoriesSection();
    case 'inventoryCategoryDetails':
      return renderInventoryCategoryDetailsSection();
    case 'suppliers':
      return renderSuppliersSection();
    case 'supplierDetails':
      return renderSupplierDetailsSection();
    case 'issue':
      return renderIssueSection();
    case 'purchase':
      return renderPurchaseSection();
    case 'transfer':
      return renderTransferSection();
    case 'devices': 
      return renderDevicesSection();
    default: 
      return '<div class="text-center py-10 text-gray-500">الرجاء اختيار قسم من القائمة</div>';
  }
}

    // Product Price Change Report
    function roundCurrencyValue(value) {
      return parseFloat((parseFloat(value) || 0).toFixed(3));
    }

    function createProductPriceChangeEntry(product, oldPrice, newPrice, source = 'manual', timestamp = Date.now()) {
      const previousPrice = roundCurrencyValue(oldPrice);
      const updatedPrice = roundCurrencyValue(newPrice);
      const difference = roundCurrencyValue(updatedPrice - previousPrice);

      if (difference === 0) return null;

      const id = generateId();
      return {
        id,
        productId: product.id || '',
        nameAr: product.nameAr || '',
        nameEn: product.nameEn || '',
        oldPrice: previousPrice,
        newPrice: updatedPrice,
        difference,
        type: difference > 0 ? 'increase' : 'decrease',
        source,
        timestamp
      };
    }

    async function recordProductPriceChange(product, oldPrice, newPrice, source = 'manual') {
      const entry = createProductPriceChangeEntry(product, oldPrice, newPrice, source);
      if (!entry) return true;

      try {
        await db.ref(`productPriceChanges/${entry.id}`).set(entry);
        return true;
      } catch (error) {
        console.error('Error recording product price change:', error);
        showToast('تم تعديل السعر لكن تعذر حفظه في تقرير الزيادة والتخفيض', true);
        return false;
      }
    }

    function getPriceChangeReportOldPrice(row) {
      return parseFloat(row.oldPrice ?? row.previousPrice ?? 0) || 0;
    }

    function getPriceChangeReportNewPrice(row) {
      return parseFloat(row.newPrice ?? row.updatedPrice ?? 0) || 0;
    }

    function getPriceChangeReportDifference(row) {
      const explicitDifference = parseFloat(row.difference);
      if (!isNaN(explicitDifference)) return explicitDifference;
      return getPriceChangeReportNewPrice(row) - getPriceChangeReportOldPrice(row);
    }

    function getPriceChangeType(row) {
      const difference = getPriceChangeReportDifference(row);
      return difference >= 0 ? 'increase' : 'decrease';
    }

    function formatSignedPriceChange(value) {
      const number = parseFloat(value) || 0;
      const sign = number >= 0 ? '+' : '-';
      return `${sign}${Math.abs(number).toFixed(3)}`;
    }

    function getPriceChangeTypeLabel(type) {
      if (type === 'increase') return 'الزيادات';
      if (type === 'decrease') return 'التخفيضات';
      return 'الكل';
    }

    function getPriceChangeReportPeriodText() {
      if (priceChangeReportFromDate && priceChangeReportToDate) {
        return `من ${priceChangeReportFromDate} إلى ${priceChangeReportToDate}`;
      }
      if (priceChangeReportFromDate) return `من ${priceChangeReportFromDate}`;
      if (priceChangeReportToDate) return `حتى ${priceChangeReportToDate}`;
      return 'كل التواريخ';
    }

    function getFilteredPriceChangeRows() {
      const fromTimestamp = priceChangeReportFromDate
        ? new Date(`${priceChangeReportFromDate}T00:00:00`).getTime()
        : null;
      const toTimestamp = priceChangeReportToDate
        ? new Date(`${priceChangeReportToDate}T23:59:59.999`).getTime()
        : null;

      return allProductPriceChanges.filter(row => {
        const timestamp = parseInt(row.timestamp || 0, 10) || 0;
        const type = getPriceChangeType(row);

        if (priceChangeReportType !== 'all' && type !== priceChangeReportType) return false;
        if (fromTimestamp && timestamp < fromTimestamp) return false;
        if (toTimestamp && timestamp > toTimestamp) return false;
        return true;
      });
    }

    function setPriceChangeReportFilter(field, value) {
      if (field === 'from') priceChangeReportFromDate = value;
      if (field === 'to') priceChangeReportToDate = value;
      if (field === 'type') priceChangeReportType = value || 'all';
      renderAccounting('priceChangeReport');
    }

    function clearPriceChangeReportFilters() {
      priceChangeReportFromDate = '';
      priceChangeReportToDate = '';
      priceChangeReportType = 'all';
      renderAccounting('priceChangeReport');
    }

    function renderPriceChangeReportSection() {
      const rows = getFilteredPriceChangeRows();
      const increaseCount = rows.filter(row => getPriceChangeType(row) === 'increase').length;
      const decreaseCount = rows.filter(row => getPriceChangeType(row) === 'decrease').length;

      return `
        <div>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-blue-600">تقرير الزيادة والتخفيض</h2>
            <div class="flex gap-3">
              <button onclick="printPriceChangeReportA4()" class="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition">🖨️ طباعة A4</button>
              <button onclick="exportPriceChangeReportExcel()" class="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">📥 تحميل Excel</button>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block mb-2 font-bold text-gray-700">من تاريخ</label>
                <input type="date" value="${priceChangeReportFromDate}" onchange="setPriceChangeReportFilter('from', this.value)" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              </div>
              <div>
                <label class="block mb-2 font-bold text-gray-700">إلى تاريخ</label>
                <input type="date" value="${priceChangeReportToDate}" onchange="setPriceChangeReportFilter('to', this.value)" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              </div>
              <div>
                <label class="block mb-2 font-bold text-gray-700">نوع التعديل</label>
                <select onchange="setPriceChangeReportFilter('type', this.value)" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                  <option value="all" ${priceChangeReportType === 'all' ? 'selected' : ''}>عرض الكل</option>
                  <option value="increase" ${priceChangeReportType === 'increase' ? 'selected' : ''}>عرض الزيادات</option>
                  <option value="decrease" ${priceChangeReportType === 'decrease' ? 'selected' : ''}>عرض التخفيضات</option>
                </select>
              </div>
              <div class="flex items-end">
                <button onclick="clearPriceChangeReportFilters()" class="w-full bg-gray-200 text-gray-700 px-5 py-3 rounded-lg font-bold hover:bg-gray-300 transition">مسح الفلاتر</button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
              <div class="text-sm text-gray-500 mb-1">عدد السجلات</div>
              <div class="text-2xl font-bold text-blue-700">${rows.length}</div>
            </div>
            <div class="bg-white border border-green-100 rounded-lg p-4 shadow-sm">
              <div class="text-sm text-gray-500 mb-1">الزيادات</div>
              <div class="text-2xl font-bold text-green-700">${increaseCount}</div>
            </div>
            <div class="bg-white border border-red-100 rounded-lg p-4 shadow-sm">
              <div class="text-sm text-gray-500 mb-1">التخفيضات</div>
              <div class="text-2xl font-bold text-red-700">${decreaseCount}</div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>التاريخ</th>
                    <th>اسم المنتج عربي</th>
                    <th>اسم المنتج إنجليزي</th>
                    <th>سعره سابقاً</th>
                    <th>سعره بعد التعديل</th>
                    <th>القيمة المضافة</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows.length > 0 ? rows.map(row => {
                    const difference = getPriceChangeReportDifference(row);
                    const differenceClass = difference >= 0 ? 'text-green-700' : 'text-red-700';
                    return `
                      <tr>
                        <td>${row.timestamp ? `${formatDate(row.timestamp)} ${formatTime(row.timestamp)}` : '-'}</td>
                        <td>${escapeHtml(row.nameAr || '')}</td>
                        <td>${escapeHtml(row.nameEn || '')}</td>
                        <td>${formatNumberWithThreeDecimals(getPriceChangeReportOldPrice(row))} د.ك</td>
                        <td>${formatNumberWithThreeDecimals(getPriceChangeReportNewPrice(row))} د.ك</td>
                        <td class="${differenceClass} font-bold" dir="ltr">${formatSignedPriceChange(difference)}</td>
                      </tr>
                    `;
                  }).join('') : `
                    <tr>
                      <td colspan="6" class="text-center text-gray-500 py-8">لا توجد تغييرات أسعار حسب الفلاتر المحددة</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    function exportPriceChangeReportExcel() {
      const rows = getFilteredPriceChangeRows();
      if (rows.length === 0) {
        showToast('لا توجد بيانات لتصديرها', true);
        return;
      }

      const htmlRows = rows.map(row => `
        <tr>
          <td>${row.timestamp ? `${formatDate(row.timestamp)} ${formatTime(row.timestamp)}` : '-'}</td>
          <td>${escapeHtml(row.nameAr || '')}</td>
          <td>${escapeHtml(row.nameEn || '')}</td>
          <td>${formatNumberWithThreeDecimals(getPriceChangeReportOldPrice(row))}</td>
          <td>${formatNumberWithThreeDecimals(getPriceChangeReportNewPrice(row))}</td>
          <td>${formatSignedPriceChange(getPriceChangeReportDifference(row))}</td>
        </tr>
      `).join('');

      const excelHtml = buildExcelHtml(
        ['التاريخ', 'اسم المنتج عربي', 'اسم المنتج إنجليزي', 'سعره سابقاً', 'سعره بعد التعديل', 'القيمة المضافة'],
        htmlRows
      );
      const today = new Date().toLocaleDateString('ar-SA').replace(/\//g, '-');
      downloadExcelHtml(excelHtml, `تقرير_الزيادة_والتخفيض_${today}.xls`);
      showToast('تم تحميل تقرير الزيادة والتخفيض (Excel)');
    }

    function printPriceChangeReportA4() {
      const rows = getFilteredPriceChangeRows();
      if (rows.length === 0) {
        showToast('لا توجد بيانات للطباعة', true);
        return;
      }

      const totalIncrease = rows
        .filter(row => getPriceChangeType(row) === 'increase')
        .reduce((sum, row) => sum + getPriceChangeReportDifference(row), 0);
      const totalDecrease = rows
        .filter(row => getPriceChangeType(row) === 'decrease')
        .reduce((sum, row) => sum + Math.abs(getPriceChangeReportDifference(row)), 0);
      const printedAt = new Date().toLocaleString('ar-SA');

      const contentHtml = `
        <div class="print-report">
          <div class="report-header">
            <div>
              <h1 class="report-title">تقرير الزيادة والتخفيض</h1>
              <div class="print-date">تاريخ الطباعة: ${printedAt}</div>
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-card">
              <div class="meta-label">الفترة</div>
              <div class="meta-value">${getPriceChangeReportPeriodText()}</div>
            </div>
            <div class="meta-card">
              <div class="meta-label">نوع العرض</div>
              <div class="meta-value">${getPriceChangeTypeLabel(priceChangeReportType)}</div>
            </div>
            <div class="meta-card">
              <div class="meta-label">عدد السجلات</div>
              <div class="meta-value">${rows.length}</div>
            </div>
          </div>

          <table class="report-table">
            <thead>
              <tr>
                <th>التاريخ</th>
                <th>اسم المنتج عربي</th>
                <th>اسم المنتج إنجليزي</th>
                <th>سعره سابقاً</th>
                <th>سعره بعد التعديل</th>
                <th>القيمة المضافة</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(row => `
                <tr>
                  <td>${row.timestamp ? `${formatDate(row.timestamp)} ${formatTime(row.timestamp)}` : '-'}</td>
                  <td>${escapeHtml(row.nameAr || '')}</td>
                  <td>${escapeHtml(row.nameEn || '')}</td>
                  <td>${formatNumberWithThreeDecimals(getPriceChangeReportOldPrice(row))} د.ك</td>
                  <td>${formatNumberWithThreeDecimals(getPriceChangeReportNewPrice(row))} د.ك</td>
                  <td dir="ltr">${formatSignedPriceChange(getPriceChangeReportDifference(row))}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="summary-strip">
            إجمالي الزيادات: +${formatNumberWithThreeDecimals(totalIncrease)} د.ك |
            إجمالي التخفيضات: -${formatNumberWithThreeDecimals(totalDecrease)} د.ك |
            الفترة: ${getPriceChangeReportPeriodText()}
          </div>
        </div>
      `;

      openA4PrintWindow('تقرير الزيادة والتخفيض', contentHtml);
    }

    function getDeliveryPriceAreas() {
      return areas.slice();
    }

    function selectDeliveryPriceGroup(groupKey) {
      selectedDeliveryPriceGroup = groupKey;
      renderAccounting('deliveryPrices');
    }

    function renderDeliveryPricesSection() {
      const groupKey = selectedDeliveryPriceGroup || 'mainYarmouk';
      const inferredPrices = getInferredDeliveryPrices(groupKey);
      const deliveryAreas = getDeliveryPriceAreas();
      const filledCount = deliveryAreas.filter(area => getResolvedDeliveryPriceForArea(area, groupKey) !== '').length;

      return `
        <div>
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-3xl font-bold text-blue-600">أسعار التوصيل</h2>
              <p class="text-gray-600 mt-1">يتم استخدام هذه الأسعار تلقائياً حسب فرع الكاشير ومنطقة العميل.</p>
            </div>
            <button onclick="saveDeliveryPrices()" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ الأسعار</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <button onclick="selectDeliveryPriceGroup('mainYarmouk')" class="${groupKey === 'mainYarmouk' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} border border-blue-200 px-6 py-4 rounded-lg font-bold shadow-sm hover:bg-blue-50 hover:text-blue-700 transition">
              الفرع الرئيسي واليرموك
            </button>
            <button onclick="selectDeliveryPriceGroup('abuHasaniya')" class="${groupKey === 'abuHasaniya' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} border border-blue-200 px-6 py-4 rounded-lg font-bold shadow-sm hover:bg-blue-50 hover:text-blue-700 transition">
              فرع أبو الحصانية
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
              <div class="text-sm text-gray-500 mb-1">القسم الحالي</div>
              <div class="text-2xl font-bold text-blue-700">${getDeliveryPriceGroupLabel(groupKey)}</div>
            </div>
            <div class="bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
              <div class="text-sm text-gray-500 mb-1">عدد المناطق</div>
              <div class="text-2xl font-bold text-blue-700">${deliveryAreas.length}</div>
            </div>
            <div class="bg-white border border-green-100 rounded-lg p-4 shadow-sm">
              <div class="text-sm text-gray-500 mb-1">أسعار معروفة</div>
              <div class="text-2xl font-bold text-green-700">${filledCount}</div>
            </div>
            <div class="bg-white border border-amber-100 rounded-lg p-4 shadow-sm">
              <div class="text-sm text-gray-500 mb-1">بدون سعر</div>
              <div class="text-2xl font-bold text-amber-700">${deliveryAreas.length - filledCount}</div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>المنطقة</th>
                    <th>سعر التوصيل (د.ك)</th>
                    <th>المصدر</th>
                  </tr>
                </thead>
                <tbody>
                  ${deliveryAreas.map((area, index) => {
                    const saved = getSavedDeliveryPriceForArea(area, groupKey);
                    const inferred = inferredPrices[area];
                    const value = saved !== '' && !isNaN(saved) ? saved : (inferred ?? '');
                    const source = saved !== '' && !isNaN(saved)
                      ? 'محفوظ'
                      : (inferred !== undefined ? 'من الفواتير السابقة' : 'غير معروف');
                    const sourceClass = source === 'محفوظ'
                      ? 'text-green-700'
                      : (source === 'من الفواتير السابقة' ? 'text-blue-700' : 'text-amber-700');
                    return `
                      <tr>
                        <td class="font-bold">${escapeHtml(area)}</td>
                        <td>
                          <input
                            type="text"
                            id="deliveryPriceArea_${index}"
                            data-area="${escapeHtml(area)}"
                            data-group="${escapeHtml(groupKey)}"
                            value="${value === '' ? '' : formatNumberWithThreeDecimals(value)}"
                            oninput="this.value = convertToEnglishNumbers(this.value)"
                            class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                            placeholder="اكتب السعر"
                          >
                        </td>
                        <td class="${sourceClass} font-bold">${source}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
            <button onclick="saveDeliveryPrices()" class="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ الأسعار</button>
          </div>
        </div>
      `;
    }

    async function saveDeliveryPrices() {
      const inputs = document.querySelectorAll('[id^="deliveryPriceArea_"]');
      const groupKey = selectedDeliveryPriceGroup || 'mainYarmouk';
      const nextGroupPrices = {};

      inputs.forEach(input => {
        const area = input.getAttribute('data-area') || '';
        const rawValue = convertToEnglishNumbers(input.value || '').trim();
        if (!area || rawValue === '') return;
        const price = parseFloat(rawValue);
        if (!isNaN(price) && price >= 0) {
          nextGroupPrices[area] = {
            area,
            price: parseFloat(price.toFixed(3)),
            groupKey,
            groupLabel: getDeliveryPriceGroupLabel(groupKey),
            updatedAt: Date.now()
          };
        }
      });

      try {
        await db.ref(`deliveryPrices/${groupKey}`).set(nextGroupPrices);
        allDeliveryPrices = {
          ...(allDeliveryPrices || {}),
          [groupKey]: nextGroupPrices
        };
        showToast('تم حفظ أسعار التوصيل');
        renderAccounting('deliveryPrices');
      } catch (error) {
        console.error('Error saving delivery prices:', error);
        showToast('تعذر حفظ أسعار التوصيل', true);
      }
    }

    // Orders Section
    let orderRowsRenderToken = 0;

    function getSortedAccountingOrders() {
      const search = normalizeText(orderSearchTerm);
      return allOrders
        .filter(order => {
          const timestamp = parseInt(order.timestamp, 10) || 0;
          if (orderFilterFrom) {
            const from = new Date(`${orderFilterFrom}T00:00:00`).getTime();
            if (timestamp < from) return false;
          }
          if (orderFilterTo) {
            const to = new Date(`${orderFilterTo}T23:59:59`).getTime();
            if (timestamp > to) return false;
          }
          if (orderFilterCashier && (order.cashierCode || '') !== orderFilterCashier) return false;
          if (orderFilterBranch && (order.branch || '') !== orderFilterBranch) return false;
          if (search) {
            const searchData = normalizeText(`${order.invoiceNumber || ''} ${order.customerName || ''} ${order.phoneNumber || ''}`);
            if (!searchData.includes(search)) return false;
          }
          return true;
        })
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }

    function buildOrderTableRow(order) {
      return `
        <tr class="order-row" data-order-id="${order.id || ''}" data-search="${escapeHtml(`${order.invoiceNumber || ''} ${order.customerName || ''} ${order.phoneNumber || ''}`)}" data-cashier="${escapeHtml(order.cashierCode || '')}" data-branch="${escapeHtml(order.branch || '')}" data-timestamp="${order.timestamp || 0}">
          <td>${order.invoiceNumber || 'N/A'}</td>
          <td>${escapeHtml(order.customerName || 'N/A')}</td>
          <td>${escapeHtml(order.phoneNumber || 'N/A')}</td>
          <td>${formatDate(order.timestamp)}</td>
          <td>${escapeHtml(order.cashier || 'N/A')}</td>
          <td>${escapeHtml(order.branch || 'N/A')}</td>
          <td>${getPaymentMethodLabel(order.paymentMethod)}</td>
          <td>${order.total ? order.total.toFixed(3) : '0.000'} د.ك</td>
          <td>
            <button onclick="viewOrder('${order.id}')" class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">عرض</button>
            <button onclick="editOrder('${order.id}')" class="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition">تعديل</button>
            <button onclick="confirmDeleteOrder('${order.id}')" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">حذف</button>
          </td>
        </tr>
      `;
    }

    function renderAccountingOrdersRowsChunked() {
      const body = document.getElementById('ordersBody');
      const progress = document.getElementById('ordersRenderProgress');
      if (!body) return;

      const token = ++orderRowsRenderToken;
      const orders = getSortedAccountingOrders();
      const chunkSize = 100;
      let index = 0;
      body.innerHTML = '';

      if (orders.length === 0) {
        body.innerHTML = '<tr><td colspan="9" class="text-center text-gray-500 py-8">لا توجد طلبات</td></tr>';
        if (progress) progress.textContent = 'لا توجد طلبات';
        return;
      }

      function renderChunk() {
        if (token !== orderRowsRenderToken) return;
        const chunk = orders.slice(index, index + chunkSize);
        body.insertAdjacentHTML('beforeend', chunk.map(buildOrderTableRow).join(''));
        index += chunkSize;

        if (progress) {
          progress.textContent = index < orders.length
            ? `جاري تجهيز الطلبات: ${Math.min(index, orders.length)} من ${orders.length}`
            : `تم عرض ${orders.length} طلب`;
        }

        if (index < orders.length) {
          setTimeout(renderChunk, 0);
        }
      }

      renderChunk();
    }

    function renderOrdersSection() {
  const sortedOrdersCount = getSortedAccountingOrders().length;
  const loadedLabel = ordersLoadedMode === 'all'
    ? 'تم تحميل كل الطلبات بسبب البحث'
    : (ordersLoadedMode === 'today' ? 'المحمّل حالياً: طلبات اليوم فقط' : 'المحمّل حالياً: نطاق التاريخ المحدد');
  return `
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-blue-600">الطلبات</h2>
        <div class="flex gap-3">
          <button onclick="printAllVisibleInvoices()" class="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition">🖨️ طباعة الفواتير</button>
          <button onclick="exportToExcel()" class="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">📥 تحميل Excel</button>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block mb-2 font-bold text-gray-700">من تاريخ</label>
            <input type="date" id="filterFrom" value="${orderFilterFrom}" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
          </div>
          <div>
            <label class="block mb-2 font-bold text-gray-700">إلى تاريخ</label>
            <input type="date" id="filterTo" value="${orderFilterTo}" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
          </div>
          <div>
            <label class="block mb-2 font-bold text-gray-700">الكاشير</label>
            <select id="filterCashier" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              <option value="">الكل</option>
              ${allCashiers.map(c => `<option value="${c.code}" ${orderFilterCashier === c.code ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block mb-2 font-bold text-gray-700">الفرع</label>
            <select id="filterBranch" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              <option value="">الكل</option>
              <option value="الفرع الرئيسي" ${orderFilterBranch === 'الفرع الرئيسي' ? 'selected' : ''}>الفرع الرئيسي</option>
              <option value="المخزن الرئيسي" ${orderFilterBranch === 'المخزن الرئيسي' ? 'selected' : ''}>المخزن الرئيسي</option>
              <option value="أبو الحصانية" ${orderFilterBranch === 'أبو الحصانية' ? 'selected' : ''}>أبو الحصانية</option>
              <option value="اليرموك" ${orderFilterBranch === 'اليرموك' ? 'selected' : ''}>اليرموك</option>
            </select>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-3 mt-4">
          <button onclick="applyFilters()" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">بحث</button>
          <button onclick="resetOrdersToToday()" class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-300 transition">طلبات اليوم</button>
          <span class="text-sm font-bold text-gray-600">${loadedLabel}</span>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <input type="text" id="orderSearch" value="${escapeHtml(orderSearchTerm)}" placeholder="بحث..." oninput="filterOrders()" class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
        <div class="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>رقم الفاتورة</th>
                <th>العميل</th>
                <th>الهاتف</th>
                <th>التاريخ</th>
                <th>الكاشير</th>
                <th>الفرع</th>
                <th>طريقة الدفع</th>
                <th>المجموع</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody id="ordersBody"></tbody>
          </table>
        </div>
        <div id="ordersRenderProgress" class="mt-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg px-4 py-3 font-bold">
          جاري تجهيز الطلبات: 0 من ${sortedOrdersCount}
        </div>
      </div>
    </div>
  `;
}

    function renderDiscountRequestsSection() {
      const discountedOrders = allOrders
        .filter(order => (parseFloat(order.discountAmount) || 0) > 0)
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

      return `
        <div>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-blue-600">طلبات الخصومات</h2>
            <div class="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold">عدد الطلبات: ${discountedOrders.length}</div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>رقم الفاتورة</th>
                    <th>التاريخ</th>
                    <th>العميل</th>
                    <th>الهاتف</th>
                    <th>الكاشير</th>
                    <th>الفرع</th>
                    <th>نوع الطلب</th>
                    <th>طريقة الدفع</th>
                    <th>العنوان</th>
                    <th>مجموع الأصناف</th>
                    <th>التوصيل</th>
                    <th>نوع الخصم</th>
                    <th>قيمة الخصم</th>
                    <th>الإجمالي بعد الخصم</th>
                  </tr>
                </thead>
                <tbody>
                  ${discountedOrders.length > 0 ? discountedOrders.map(order => {
                    const itemsSubTotal = parseFloat(order.subTotal) || (Array.isArray(order.items) ? order.items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0) : 0);
                    const deliveryPrice = parseFloat(order.deliveryPrice) || 0;
                    const discountAmount = parseFloat(order.discountAmount) || 0;
                    const finalTotal = parseFloat(order.total) || Math.max(0, itemsSubTotal + deliveryPrice - discountAmount);
                    return `
                      <tr>
                        <td>${order.invoiceNumber || '-'}</td>
                        <td>${order.timestamp ? `${formatDate(order.timestamp)} ${formatTime(order.timestamp)}` : '-'}</td>
                        <td>${order.customerName || '-'}</td>
                        <td>${order.phoneNumber || '-'}</td>
                        <td>${order.cashier || '-'}</td>
                        <td>${order.branch || '-'}</td>
                        <td>${order.orderType === 'delivery' ? 'توصيل' : order.orderType === 'pickup' ? 'استلام' : '-'}</td>
                        <td>${getPaymentMethodLabel(order.paymentMethod, false)}</td>
                        <td>${order.address || '-'}</td>
                        <td>${itemsSubTotal.toFixed(3)} د.ك</td>
                        <td>${deliveryPrice.toFixed(3)} د.ك</td>
                        <td>${getDiscountDescription(order.discountType, order.discountValue)}</td>
                        <td class="text-red-600 font-bold">${discountAmount.toFixed(3)} د.ك</td>
                        <td class="font-bold text-blue-700">${finalTotal.toFixed(3)} د.ك</td>
                      </tr>
                    `;
                  }).join('') : `
                    <tr>
                      <td colspan="14" class="text-center text-gray-500 py-8">لا توجد فواتير عليها خصم</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    async function ensureOrdersForDateFilters(fromDate, toDate) {
      if (!fromDate && !toDate) return;
      const fromRange = fromDate ? getLocalDayRange(fromDate) : null;
      const toRange = toDate ? getLocalDayRange(toDate) : null;
      const start = fromRange ? fromRange.start : 0;
      const end = toRange ? toRange.end : Date.now();
      if (ordersLoadedMode === 'range' && ordersLoadedRange && ordersLoadedRange.start <= start && ordersLoadedRange.end >= end) return;
      if (ordersLoadedMode === 'all') return;
      showToast('جاري تحميل طلبات التاريخ المحدد...');
      await fetchOrdersForRange(start, end, { replace: true, mode: 'range' });
    }

    async function resetOrdersToToday() {
      orderSearchTerm = '';
      orderFilterFrom = '';
      orderFilterTo = '';
      orderFilterCashier = '';
      orderFilterBranch = '';
      const today = getTodayOrdersRange();
      showToast('جاري تحميل طلبات اليوم...');
      await fetchOrdersForRange(today.start, today.end, { replace: true, mode: 'today' });
      renderAccounting('orders');
      setTimeout(renderAccountingOrdersRowsChunked, 0);
    }

    function applyOrdersFiltersToRenderedRows() {
      const rows = document.querySelectorAll('.order-row');
      rows.forEach(row => {
        const searchData = (row.getAttribute('data-search') || '').toLowerCase();
        const timestamp = parseInt(row.getAttribute('data-timestamp'), 10) || 0;
        const rowCashier = row.getAttribute('data-cashier') || '';
        const rowBranch = row.getAttribute('data-branch') || '';
        let show = true;

        if (orderSearchTerm && !searchData.includes(orderSearchTerm.toLowerCase())) show = false;
        if (orderFilterFrom) {
          const from = new Date(`${orderFilterFrom}T00:00:00`).getTime();
          if (timestamp < from) show = false;
        }
        if (orderFilterTo) {
          const to = new Date(`${orderFilterTo}T23:59:59`).getTime();
          if (timestamp > to) show = false;
        }
        if (orderFilterCashier && rowCashier !== orderFilterCashier) show = false;
        if (orderFilterBranch && rowBranch !== orderFilterBranch) show = false;
        row.style.display = show ? '' : 'none';
      });
    }

    function filterOrders() {
      if (document.getElementById('ordersRenderProgress')?.textContent.includes('جاري تجهيز')) {
        showToast('انتظر حتى يكتمل تجهيز الطلبات', true);
        return;
      }
      orderSearchTerm = document.getElementById('orderSearch')?.value || '';
      clearTimeout(orderSearchLoadTimer);
      orderSearchLoadTimer = setTimeout(async () => {
        if (orderSearchTerm.trim() && ordersLoadedMode !== 'all') {
          showToast('جاري تحميل الطلبات للبحث...');
          await fetchAllOrdersForSearch();
          renderAccounting('orders');
          setTimeout(renderAccountingOrdersRowsChunked, 0);
          return;
        }
        applyOrdersFiltersToRenderedRows();
      }, 450);
    }

	    async function applyFilters() {
      if (document.getElementById('ordersRenderProgress')?.textContent.includes('جاري تجهيز')) {
        showToast('انتظر حتى يكتمل تجهيز الطلبات', true);
        return;
      }
	      orderFilterFrom = document.getElementById('filterFrom')?.value || '';
	      orderFilterTo = document.getElementById('filterTo')?.value || '';
	      orderFilterCashier = document.getElementById('filterCashier')?.value || '';
      orderFilterBranch = document.getElementById('filterBranch')?.value || '';
      orderSearchTerm = document.getElementById('orderSearch')?.value || orderSearchTerm || '';

      if (orderFilterFrom && orderFilterTo && new Date(orderFilterFrom).getTime() > new Date(orderFilterTo).getTime()) {
        showToast('تاريخ البداية يجب أن يكون قبل تاريخ النهاية', true);
        return;
      }

      await ensureOrdersForDateFilters(orderFilterFrom, orderFilterTo);
      renderAccounting('orders');
      setTimeout(renderAccountingOrdersRowsChunked, 0);
	    }

	    function getOrderFromOrderRow(row) {
	      const rowOrderId = row.getAttribute('data-order-id') || '';
	      if (rowOrderId) {
	        const orderById = allOrders.find(order => String(order.id || '') === rowOrderId);
	        if (orderById) return orderById;
	      }

	      const invoiceNumber = (row.cells[0]?.textContent || '').trim().replace('#', '');
	      const branch = row.getAttribute('data-branch') || (row.cells[5]?.textContent || '').trim();
	      const timestamp = parseInt(row.getAttribute('data-timestamp') || '0', 10) || 0;

	      return allOrders.find(order =>
	        String(order.invoiceNumber || '') === invoiceNumber &&
	        (!branch || String(order.branch || '') === branch) &&
	        (!timestamp || Number(order.timestamp || 0) === timestamp)
	      ) || allOrders.find(order =>
	        String(order.invoiceNumber || '') === invoiceNumber &&
	        (!branch || String(order.branch || '') === branch)
	      ) || allOrders.find(order => String(order.invoiceNumber || '') === invoiceNumber) || null;
	    }

	        function exportToExcel() {
	  const rows = document.querySelectorAll('.order-row');
	  let totalNet = 0;
  let totalDelivery = 0;
  let totalFinal = 0;
  let data = [];
  
  rows.forEach(row => {
    if (row.style.display !== 'none') {
      const cells = row.cells;
      
	      // نستخدم id الحقيقي للطلب حتى لا نخلط بين فواتير لها نفس الرقم في فروع مختلفة.
	      const order = getOrderFromOrderRow(row);
      
      if (order) {
        // حساب الأسعار
        const deliveryFee = parseFloat(order.deliveryFee) || parseFloat(order.deliveryPrice) || 0;
        const netAmount = parseFloat(order.total) - deliveryFee;
        const finalTotal = parseFloat(order.total) || 0;
        
        totalNet += netAmount;
        totalDelivery += deliveryFee;
        totalFinal += finalTotal;
        
        // بناء الكائن بناءً على وجود عمود طريقة الدفع
        const totalCellIndex = cells.length === 9 ? 7 : 6;
        
        if (cells.length === 9) {
          // مع طريقة الدفع
          data.push({
            'رقم الفاتورة': cells[0].textContent.trim(),
            'العميل': cells[1].textContent.trim(),
            'الهاتف': cells[2].textContent.trim(),
            'التاريخ': cells[3].textContent.trim(),
            'الكاشير': cells[4].textContent.trim(),
            'الفرع': cells[5].textContent.trim(),
            'طريقة الدفع': cells[6].textContent.trim(),
            'صافي الفاتورة': netAmount.toFixed(3),
            'رسوم التوصيل': deliveryFee.toFixed(3),
            'الإجمالي': finalTotal.toFixed(3)
          });
        } else {
          // بدون طريقة الدفع
          data.push({
            'رقم الفاتورة': cells[0].textContent.trim(),
            'العميل': cells[1].textContent.trim(),
            'الهاتف': cells[2].textContent.trim(),
            'التاريخ': cells[3].textContent.trim(),
            'الكاشير': cells[4].textContent.trim(),
            'الفرع': cells[5].textContent.trim(),
            'صافي الفاتورة': netAmount.toFixed(3),
            'رسوم التوصيل': deliveryFee.toFixed(3),
            'الإجمالي': finalTotal.toFixed(3)
          });
        }
      }
    }
  });
  
  if (data.length === 0) {
    showToast('لا توجد بيانات للتصدير');
    return;
  }
  
  // إنشاء جدول HTML منسق لـ Excel
  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <style>
        table { border-collapse: collapse; width: 100%; direction: rtl; }
        th { background-color: #4472C4; color: white; font-weight: bold; padding: 12px; border: 1px solid #ddd; text-align: center; }
        td { padding: 10px; border: 1px solid #ddd; text-align: center; }
        .total-row { background-color: #FFC000; font-weight: bold; font-size: 14px; }
        tr:nth-child(even) { background-color: #F2F2F2; }
      </style>
    </head>
    <body>
      <table dir="rtl">
        <thead>
          <tr>
            ${Object.keys(data[0]).map(key => `<th>${key}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              ${Object.values(row).map(val => `<td>${val}</td>`).join('')}
            </tr>
          `).join('')}
          <tr class="total-row">
            ${Object.keys(data[0]).map((key, index) => {
              if (key === 'الفرع' || key === 'طريقة الدفع') {
                return `<td>إجمالي الإيرادات</td>`;
              } else if (key === 'صافي الفاتورة') {
                return `<td>${totalNet.toFixed(3)}</td>`;
              } else if (key === 'رسوم التوصيل') {
                return `<td>${totalDelivery.toFixed(3)}</td>`;
              } else if (key === 'الإجمالي') {
                return `<td>${totalFinal.toFixed(3)}</td>`;
              } else {
                return `<td></td>`;
              }
            }).join('')}
          </tr>
        </tbody>
      </table>
    </body>
    </html>
  `;
  
  // تحميل كملف Excel
  const blob = new Blob(['\ufeff', html], { 
    type: 'application/vnd.ms-excel' 
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `تقرير_الطلبات_${new Date().toLocaleDateString('ar-SA').replace(/\//g, '-')}.xls`;
  link.click();
  
  showToast('تم تحميل ملف Excel بنجاح');
}

    function printAllVisibleInvoices() {
  const rows = document.querySelectorAll('.order-row');
  let visibleOrders = [];
  
	  rows.forEach(row => {
	    if (row.style.display !== 'none') {
	      const order = getOrderFromOrderRow(row);
	      if (order) {
	        visibleOrders.push(order);
	      }
    }
  });
  
  if (visibleOrders.length === 0) {
    showToast('لا توجد فواتير للطباعة');
    return;
  }
  
  // إنشاء نافذة الطباعة
  const printWindow = window.open('', '_blank');
  
  let allInvoicesHtml = `
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>طباعة الفواتير</title>
      <style>
        @page {
          size: 80mm auto;
          margin: 0;
        }
        body {
          font-family: 'Tajawal', Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .invoice-page {
          width: 80mm;
          padding: 10mm;
          page-break-after: always;
          background: white;
        }
        .invoice-page:last-child {
          page-break-after: auto;
        }
        .header {
          text-align: center;
          border-bottom: 2px dashed #000;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }
        .header p {
          margin: 5px 0;
          font-size: 12px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
          font-size: 14px;
        }
        .info-row strong {
          font-weight: bold;
        }
        .items-table {
          width: 100%;
          margin: 15px 0;
          border-collapse: collapse;
        }
        .items-table th {
          background: #f0f0f0;
          padding: 8px;
          text-align: right;
          font-size: 12px;
          border-bottom: 2px solid #000;
        }
        .items-table td {
          padding: 8px;
          text-align: right;
          font-size: 12px;
          border-bottom: 1px dashed #ccc;
        }
        .totals {
          margin-top: 15px;
          padding-top: 10px;
          border-top: 2px dashed #000;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
          font-size: 14px;
        }
        .total-row.final {
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 10px;
          border-top: 2px dashed #000;
          font-size: 12px;
        }
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
  `;
  
  // إضافة كل فاتورة
  visibleOrders.forEach((order, index) => {
    const deliveryFee = parseFloat(order.deliveryFee) || parseFloat(order.deliveryPrice) || 0;
    const netAmount = parseFloat(order.total) - deliveryFee;
    
    allInvoicesHtml += `
      <div class="invoice-page">
        <div class="header">
          <h1>🍕 ${order.branch || 'المطعم'}</h1>
          <p>فاتورة رقم: <strong>#${order.invoiceNumber}</strong></p>
          <p>${new Date(order.timestamp).toLocaleString('ar-SA')}</p>
        </div>
        
        <div class="info-row">
          <span><strong>العميل:</strong> ${order.customerName}</span>
        </div>
        <div class="info-row">
          <span><strong>الهاتف:</strong> ${order.phoneNumber}</span>
        </div>
        ${order.address ? `
        <div class="info-row">
          <span><strong>العنوان:</strong> ${order.address}</span>
        </div>
        ` : ''}
        <div class="info-row">
          <span><strong>الكاشير:</strong> ${order.cashier}</span>
        </div>
        <div class="info-row">
          <span><strong>طريقة الدفع:</strong> ${getPaymentMethodLabel(order.paymentMethod)}</span>
        </div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>المنتج</th>
              <th style="text-align: center;">الكمية</th>
              <th style="text-align: left;">السعر</th>
            </tr>
          </thead>
          <tbody>
            ${(order.items || []).map(item => `
              <tr>
                <td>${item.productName}</td>
                <td style="text-align: center;">${item.quantity} ${item.unit}</td>
                <td style="text-align: left;">${(item.total || 0).toFixed(3)} د.ك</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="totals">
          <div class="total-row">
            <span>صافي الفاتورة:</span>
            <span>${netAmount.toFixed(3)} د.ك</span>
          </div>
          ${deliveryFee > 0 ? `
          <div class="total-row">
            <span>رسوم التوصيل:</span>
            <span>${deliveryFee.toFixed(3)} د.ك</span>
          </div>
          ` : ''}
          <div class="total-row final">
            <span>الإجمالي:</span>
            <span>${parseFloat(order.total).toFixed(3)} د.ك</span>
          </div>
        </div>
        
        <div class="footer">
          <p>شكراً لزيارتكم 🌟</p>
          <p>نتمنى لكم يوماً سعيداً</p>
        </div>
      </div>
    `;
  });
  
  allInvoicesHtml += `
    </body>
    </html>
  `;
  
  printWindow.document.write(allInvoicesHtml);
  printWindow.document.close();
  
  // الانتظار قليلاً ثم فتح نافذة الطباعة
  setTimeout(() => {
    printWindow.print();
  }, 500);
  
  showToast(`جاري طباعة ${visibleOrders.length} فاتورة...`);
}

    function viewOrder(orderId) {
      const order = allOrders.find(o => o.id === orderId);
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-2xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تفاصيل الطلب</h2>
          
          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <div class="grid grid-cols-2 gap-4">
              <div><strong>رقم الفاتورة:</strong> ${order.invoiceNumber}</div>
              <div><strong>التاريخ:</strong> ${formatDate(order.timestamp)}</div>
              <div><strong>العميل:</strong> ${order.customerName}</div>
              <div><strong>الهاتف:</strong> ${order.phoneNumber}</div>
              ${order.address ? `<div class="col-span-2"><strong>العنوان:</strong> ${order.address}</div>` : ''}
              <div><strong>الكاشير:</strong> ${order.cashier}</div>
              <div><strong>الفرع:</strong> ${order.branch}</div>
              <div><strong>طريقة الدفع:</strong> ${getPaymentMethodLabel(order.paymentMethod)}</div>
            </div>
          </div>
          
          <h3 class="text-xl font-bold mb-4">المنتجات</h3>
          <div class="border-2 border-gray-200 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
            ${(order.items || []).map(item => `
              <div class="flex justify-between py-2 border-b border-gray-200">
                <div>
                  <div class="font-bold">${item.productName}</div>
                  <div class="text-sm text-gray-600">${item.price ? item.price.toFixed(3) : '0.000'} × ${item.quantity} ${item.unit}</div>
                </div>
                <div class="font-bold text-blue-600">${item.total ? item.total.toFixed(3) : '0.000'}</div>
              </div>
            `).join('')}
            ${order.deliveryPrice > 0 ? `
              <div class="flex justify-between py-2 border-b border-gray-200">
                <div class="font-bold">رسوم التوصيل</div>
                <div class="font-bold text-blue-600">${order.deliveryPrice.toFixed(3)}</div>
              </div>
            ` : ''}
            <div class="flex justify-between py-4 text-lg font-bold text-blue-600">
              <div>المجموع الكلي</div>
              <div>${order.total ? order.total.toFixed(3) : '0.000'} د.ك</div>
            </div>
          </div>
          
          <button onclick="this.closest('.modal-overlay').remove()" class="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إغلاق</button>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function confirmDeleteOrder(orderId) {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد الحذف</h2>
          <p class="text-gray-600 mb-6">هل أنت متأكد من حذف هذا الطلب؟</p>
          <div class="flex gap-3">
            <button onclick="deleteOrderConfirmed('${orderId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteOrderConfirmed(orderId) {
      const success = await deleteOrder(orderId);
      if (success) {
        document.querySelector('.modal-overlay').remove();
        renderAccounting('orders');
        showToast('تم حذف الطلب بنجاح');
      }
    }

    // Sales Report Section
    function renderSalesReportSection() {
      const isMultiMode = salesReportMode === 'multi';
      const totalSalesCount = salesReportResults.reduce((sum, row) => sum + (row.salesCount || 0), 0);
      const totalRevenue = salesReportResults.reduce((sum, row) => sum + (row.revenue || 0), 0);

      const searchTerm = normalizeText(salesReportSearchTerm);
      const singleProductSuggestions = searchTerm
        ? allProducts
            .filter(product => {
              const nameAr = normalizeText(product.nameAr);
              const nameEn = normalizeText(product.nameEn);
              return nameAr.includes(searchTerm) || nameEn.includes(searchTerm);
            })
            .sort((a, b) => (a.nameAr || '').localeCompare((b.nameAr || ''), 'ar'))
            .slice(0, 25)
        : [];
      const selectedSingleProduct = allProducts.find(product => product.id === salesReportSelectedProductId) || null;

      const multiSearchTerm = normalizeText(salesReportMultiSearchTerm);
      const multiProductSuggestions = multiSearchTerm
        ? allProducts
            .filter(product => {
              const nameAr = normalizeText(product.nameAr);
              const nameEn = normalizeText(product.nameEn);
              return nameAr.includes(multiSearchTerm) || nameEn.includes(multiSearchTerm);
            })
            .sort((a, b) => (a.nameAr || '').localeCompare((b.nameAr || ''), 'ar'))
            .slice(0, 25)
        : [];
      const selectedMultiProducts = allProducts.filter(product => salesReportMultiSelectedProductIds.includes(product.id));

      const rootCategories = allCategories
        .filter(category => !category.parentId)
        .sort((a, b) => (a.nameAr || '').localeCompare((b.nameAr || ''), 'ar'));
      const subCategories = salesReportMainCategoryId
        ? allCategories
            .filter(category => category.parentId === salesReportMainCategoryId)
            .sort((a, b) => (a.nameAr || '').localeCompare((b.nameAr || ''), 'ar'))
        : [];
      const categoryProductsCount = getSalesReportCategoryProductIds().length;

      return `
        <div>
          <div class="flex flex-wrap justify-between items-center gap-3 mb-6">
            <div>
              <h2 class="text-3xl font-bold text-blue-600">تقرير المبيعات</h2>
              <p class="text-gray-600 mt-1">تقرير مبيعات حسب المنتج والفرع مع تفاصيل الفواتير</p>
            </div>
            ${salesReportResults.length > 0 ? `
              <div class="flex gap-3">
                <button onclick="printSalesReportA4()" class="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition">🖨️ طباعة A4</button>
                <button onclick="exportSalesReportExcel()" class="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">📥 تحميل Excel</button>
              </div>
            ` : ''}
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
            <div class="mb-4">
              <label class="block mb-2 font-bold text-gray-700">نوع التقرير</label>
              <div class="flex flex-wrap gap-2">
                <button onclick="setSalesReportMode('single')" class="px-4 py-2 rounded-lg font-bold transition ${salesReportMode === 'single' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">منتج واحد</button>
                <button onclick="setSalesReportMode('multi')" class="px-4 py-2 rounded-lg font-bold transition ${salesReportMode === 'multi' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">مجموعة منتجات</button>
              </div>
            </div>

            ${!isMultiMode ? `
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="md:col-span-2">
                  <label class="block mb-2 font-bold text-gray-700">بحث المنتج واختياره</label>
                  <input
                    type="text"
                    id="salesReportProductSearch"
                    value="${salesReportSearchTerm}"
                    oninput="updateSalesReportProductSearch(this.value)"
                    placeholder="اكتب اسم المنتج العربي أو الإنجليزي ثم اختر من النتائج"
                    class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  >
                  <div id="salesReportProductSuggestions" class="mt-2 border border-gray-200 rounded-lg max-h-44 overflow-y-auto bg-white">
                    ${searchTerm ? `
                      ${singleProductSuggestions.length > 0 ? singleProductSuggestions.map(product => `
                        <button
                          type="button"
                          onclick="selectSalesReportProduct('${product.id}')"
                          class="w-full text-right p-2 border-b border-gray-100 hover:bg-blue-50 transition ${salesReportSelectedProductId === product.id ? 'bg-blue-100 font-bold text-blue-700' : ''}"
                        >
                          ${product.nameAr || 'بدون اسم'} / ${product.nameEn || 'No Name'}
                        </button>
                      `).join('') : '<div class="p-3 text-sm text-gray-500">لا توجد نتائج مطابقة.</div>'}
                    ` : '<div class="p-3 text-sm text-gray-500">ابدأ بالكتابة لعرض نتائج المنتجات.</div>'}
                  </div>
                  <div id="salesReportSelectedProductLabel" class="mt-2 text-sm ${selectedSingleProduct ? 'text-green-700 font-bold' : 'text-amber-700'}">
                    ${selectedSingleProduct ? `المنتج المختار: ${selectedSingleProduct.nameAr || 'بدون اسم'} / ${selectedSingleProduct.nameEn || 'No Name'}` : 'لم يتم اختيار منتج بعد'}
                  </div>
                </div>
                <div>
                  <label class="block mb-2 font-bold text-gray-700">من تاريخ</label>
                  <input
                    type="date"
                    id="salesReportFromDate"
                    value="${salesReportFromDate}"
                    onchange="salesReportFromDate = this.value"
                    class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  >
                </div>
                <div>
                  <label class="block mb-2 font-bold text-gray-700">إلى تاريخ</label>
                  <input
                    type="date"
                    id="salesReportToDate"
                    value="${salesReportToDate}"
                    onchange="salesReportToDate = this.value"
                    class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  >
                </div>
              </div>
            ` : `
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="md:col-span-2">
                  <label class="block mb-2 font-bold text-gray-700">طريقة اختيار المنتجات</label>
                  <div class="flex flex-wrap gap-2">
                    <button onclick="setSalesReportProductSource('manual')" class="px-4 py-2 rounded-lg font-bold transition ${salesReportProductSource === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">بحث واختيار</button>
                    <button onclick="setSalesReportProductSource('category')" class="px-4 py-2 rounded-lg font-bold transition ${salesReportProductSource === 'category' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">حسب التصنيف</button>
                  </div>
                </div>
                <div>
                  <label class="block mb-2 font-bold text-gray-700">من تاريخ</label>
                  <input
                    type="date"
                    id="salesReportFromDate"
                    value="${salesReportFromDate}"
                    onchange="salesReportFromDate = this.value"
                    class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  >
                </div>
                <div>
                  <label class="block mb-2 font-bold text-gray-700">إلى تاريخ</label>
                  <input
                    type="date"
                    id="salesReportToDate"
                    value="${salesReportToDate}"
                    onchange="salesReportToDate = this.value"
                    class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  >
                </div>
              </div>

              ${salesReportProductSource === 'manual' ? `
                <div class="mt-4">
                  <label class="block mb-2 font-bold text-gray-700">بحث المنتجات واختيارها</label>
                  <input
                    type="text"
                    id="salesReportMultiSearch"
                    value="${salesReportMultiSearchTerm}"
                    oninput="updateSalesReportMultiSearchTerm(this.value)"
                    placeholder="اكتب اسم المنتج العربي أو الإنجليزي"
                    class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  >
                  <div id="salesReportMultiSuggestions" class="mt-2 border border-gray-200 rounded-lg max-h-44 overflow-y-auto bg-white">
                    ${multiSearchTerm ? `
                      ${multiProductSuggestions.length > 0 ? multiProductSuggestions.map(product => `
                        <button
                          type="button"
                          onclick="toggleSalesReportMultiProduct('${product.id}')"
                          class="w-full text-right p-2 border-b border-gray-100 hover:bg-blue-50 transition ${salesReportMultiSelectedProductIds.includes(product.id) ? 'bg-blue-100 font-bold text-blue-700' : ''}"
                        >
                          ${product.nameAr || 'بدون اسم'} / ${product.nameEn || 'No Name'}
                        </button>
                      `).join('') : '<div class="p-3 text-sm text-gray-500">لا توجد نتائج مطابقة.</div>'}
                    ` : '<div class="p-3 text-sm text-gray-500">ابدأ بالكتابة لعرض نتائج المنتجات.</div>'}
                  </div>
                  <div id="salesReportMultiSelectedCount" class="mt-2 text-sm font-bold ${selectedMultiProducts.length > 0 ? 'text-green-700' : 'text-amber-700'}">
                    عدد المنتجات المختارة: ${selectedMultiProducts.length}
                  </div>
                  <div id="salesReportMultiSelectedProducts" class="mt-2 flex flex-wrap gap-2">
                    ${selectedMultiProducts.length > 0 ? selectedMultiProducts.map(product => `
                      <div class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                        <span>${product.nameAr || 'بدون اسم'}</span>
                        <button type="button" onclick="removeSalesReportMultiProduct('${product.id}')" class="text-red-600 hover:text-red-800 transition">✕</button>
                      </div>
                    `).join('') : '<span class="text-sm text-gray-500">لا توجد منتجات مختارة.</span>'}
                  </div>
                </div>
              ` : `
                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block mb-2 font-bold text-gray-700">التصنيف الرئيسي</label>
                    <select onchange="updateSalesReportMainCategory(this.value)" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                      <option value="">اختر التصنيف الرئيسي</option>
                      ${rootCategories.map(category => `
                        <option value="${category.id}" ${salesReportMainCategoryId === category.id ? 'selected' : ''}>${category.nameAr || 'بدون اسم'} / ${category.nameEn || 'No Name'}</option>
                      `).join('')}
                    </select>
                  </div>
                  <div>
                    <label class="block mb-2 font-bold text-gray-700">التصنيف الفرعي (إن وجد)</label>
                    <select onchange="updateSalesReportSubCategory(this.value)" ${!salesReportMainCategoryId ? 'disabled' : ''} class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400">
                      <option value="">${subCategories.length > 0 ? 'كل التصنيفات الفرعية' : 'لا توجد تصنيفات فرعية'}</option>
                      ${subCategories.map(category => `
                        <option value="${category.id}" ${salesReportSubCategoryId === category.id ? 'selected' : ''}>${category.nameAr || 'بدون اسم'} / ${category.nameEn || 'No Name'}</option>
                      `).join('')}
                    </select>
                  </div>
                </div>
                <div class="mt-2 text-sm ${categoryProductsCount > 0 ? 'text-green-700 font-bold' : 'text-amber-700'}">
                  عدد المنتجات المطابقة للتصنيف: ${categoryProductsCount}
                </div>
              `}
            `}

            <button onclick="runSalesReport()" class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">إظهار</button>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            ${salesReportResults.length > 0 ? `
              <div class="mb-4 text-gray-700 font-bold">
                مرات البيع الإجمالية: ${totalSalesCount} | إجمالي الإيرادات: ${formatNumberWithThreeDecimals(totalRevenue)} د.ك
              </div>
              <div class="overflow-x-auto">
                <table>
                  <thead>
                    ${isMultiMode ? `
                      <tr>
                        <th>اسم المنتج بالعربي</th>
                        <th>اسم المنتج بالإنجليزي</th>
                        <th>اسم الفرع</th>
                        <th>مرات البيع</th>
                        <th>إيرادات المنتج</th>
                      </tr>
                    ` : `
                      <tr>
                        <th>اسم الفرع</th>
                        <th>مرات البيع</th>
                        <th>إيرادات المنتج</th>
                      </tr>
                    `}
                  </thead>
                  <tbody>
                    ${salesReportResults.map((row, index) => `
                      <tr class="cursor-pointer hover:bg-blue-50 transition" onclick="openSalesReportBranchDetails(${index})" title="اضغط لعرض التفاصيل">
                        ${isMultiMode ? `
                          <td>${row.productNameAr}</td>
                          <td>${row.productNameEn}</td>
                          <td>${row.branch}</td>
                          <td>${row.salesCount}</td>
                          <td>${formatNumberWithThreeDecimals(row.revenue)} د.ك</td>
                        ` : `
                          <td>${row.branch}</td>
                          <td>${row.salesCount}</td>
                          <td>${formatNumberWithThreeDecimals(row.revenue)} د.ك</td>
                        `}
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : `
              <div class="text-center py-10 text-gray-500">
                لا توجد نتائج حتى الآن. حدد خيارات التقرير ثم اضغط "إظهار".
              </div>
            `}
          </div>
        </div>
      `;
    }

    function setSalesReportMode(mode) {
      if (mode !== 'single' && mode !== 'multi') return;
      salesReportMode = mode;
      salesReportResults = [];
      salesReportCurrentBranch = '';
      salesReportBranchRows = [];
      salesReportCurrentDetailProduct = null;
      renderAccounting('salesReport');
    }

    function setSalesReportProductSource(source) {
      if (source !== 'manual' && source !== 'category') return;
      salesReportProductSource = source;
      salesReportResults = [];
      salesReportCurrentBranch = '';
      salesReportBranchRows = [];
      salesReportCurrentDetailProduct = null;
      renderAccounting('salesReport');
    }

    function updateSalesReportProductSearch(value) {
      salesReportSearchTerm = value;
      salesReportSelectedProductId = '';
      salesReportSelectedProduct = null;
      renderSalesReportProductPicker();
    }

    function selectSalesReportProduct(productId) {
      const product = allProducts.find(p => p.id === productId);
      if (!product) {
        showToast('تعذر اختيار المنتج', true);
        return;
      }

      salesReportSelectedProductId = productId;
      salesReportSelectedProduct = product;
      salesReportSearchTerm = product.nameAr || product.nameEn || '';
      const searchInput = document.getElementById('salesReportProductSearch');
      if (searchInput) {
        searchInput.value = salesReportSearchTerm;
      }
      renderSalesReportProductPicker();
    }

    function updateSalesReportSelectedProduct(productId) {
      selectSalesReportProduct(productId);
    }

    function renderSalesReportProductPicker() {
      const suggestionsContainer = document.getElementById('salesReportProductSuggestions');
      const selectedLabel = document.getElementById('salesReportSelectedProductLabel');
      if (!suggestionsContainer || !selectedLabel) return;

      const searchTerm = normalizeText(salesReportSearchTerm);
      const productSuggestions = searchTerm
        ? allProducts
            .filter(product => {
              const nameAr = normalizeText(product.nameAr);
              const nameEn = normalizeText(product.nameEn);
              return nameAr.includes(searchTerm) || nameEn.includes(searchTerm);
            })
            .sort((a, b) => (a.nameAr || '').localeCompare((b.nameAr || ''), 'ar'))
            .slice(0, 25)
        : [];
      const selectedProduct = allProducts.find(product => product.id === salesReportSelectedProductId) || null;

      if (searchTerm) {
        if (productSuggestions.length > 0) {
          suggestionsContainer.innerHTML = productSuggestions.map(product => `
            <button
              type="button"
              onclick="selectSalesReportProduct('${product.id}')"
              class="w-full text-right p-2 border-b border-gray-100 hover:bg-blue-50 transition ${salesReportSelectedProductId === product.id ? 'bg-blue-100 font-bold text-blue-700' : ''}"
            >
              ${product.nameAr || 'بدون اسم'} / ${product.nameEn || 'No Name'}
            </button>
          `).join('');
        } else {
          suggestionsContainer.innerHTML = '<div class="p-3 text-sm text-gray-500">لا توجد نتائج مطابقة.</div>';
        }
      } else {
        suggestionsContainer.innerHTML = '<div class="p-3 text-sm text-gray-500">ابدأ بالكتابة لعرض نتائج المنتجات.</div>';
      }

      selectedLabel.className = `mt-2 text-sm ${selectedProduct ? 'text-green-700 font-bold' : 'text-amber-700'}`;
      selectedLabel.textContent = selectedProduct
        ? `المنتج المختار: ${selectedProduct.nameAr || 'بدون اسم'} / ${selectedProduct.nameEn || 'No Name'}`
        : 'لم يتم اختيار منتج بعد';
    }

    function updateSalesReportMultiSearchTerm(value) {
      salesReportMultiSearchTerm = value;
      renderSalesReportMultiProductPicker();
    }

    function toggleSalesReportMultiProduct(productId) {
      if (!productId) return;
      if (salesReportMultiSelectedProductIds.includes(productId)) {
        salesReportMultiSelectedProductIds = salesReportMultiSelectedProductIds.filter(id => id !== productId);
      } else {
        salesReportMultiSelectedProductIds.push(productId);
      }
      renderSalesReportMultiProductPicker();
    }

    function removeSalesReportMultiProduct(productId) {
      salesReportMultiSelectedProductIds = salesReportMultiSelectedProductIds.filter(id => id !== productId);
      renderSalesReportMultiProductPicker();
    }

    function renderSalesReportMultiProductPicker() {
      const suggestionsContainer = document.getElementById('salesReportMultiSuggestions');
      const selectedContainer = document.getElementById('salesReportMultiSelectedProducts');
      const selectedCount = document.getElementById('salesReportMultiSelectedCount');
      if (!suggestionsContainer || !selectedContainer || !selectedCount) return;

      const searchTerm = normalizeText(salesReportMultiSearchTerm);
      const suggestions = searchTerm
        ? allProducts
            .filter(product => {
              const nameAr = normalizeText(product.nameAr);
              const nameEn = normalizeText(product.nameEn);
              return nameAr.includes(searchTerm) || nameEn.includes(searchTerm);
            })
            .sort((a, b) => (a.nameAr || '').localeCompare((b.nameAr || ''), 'ar'))
            .slice(0, 25)
        : [];
      const selectedProducts = allProducts.filter(product => salesReportMultiSelectedProductIds.includes(product.id));

      if (searchTerm) {
        if (suggestions.length > 0) {
          suggestionsContainer.innerHTML = suggestions.map(product => `
            <button
              type="button"
              onclick="toggleSalesReportMultiProduct('${product.id}')"
              class="w-full text-right p-2 border-b border-gray-100 hover:bg-blue-50 transition ${salesReportMultiSelectedProductIds.includes(product.id) ? 'bg-blue-100 font-bold text-blue-700' : ''}"
            >
              ${product.nameAr || 'بدون اسم'} / ${product.nameEn || 'No Name'}
            </button>
          `).join('');
        } else {
          suggestionsContainer.innerHTML = '<div class="p-3 text-sm text-gray-500">لا توجد نتائج مطابقة.</div>';
        }
      } else {
        suggestionsContainer.innerHTML = '<div class="p-3 text-sm text-gray-500">ابدأ بالكتابة لعرض نتائج المنتجات.</div>';
      }

      selectedCount.className = `mt-2 text-sm font-bold ${selectedProducts.length > 0 ? 'text-green-700' : 'text-amber-700'}`;
      selectedCount.textContent = `عدد المنتجات المختارة: ${selectedProducts.length}`;

      selectedContainer.innerHTML = selectedProducts.length > 0
        ? selectedProducts.map(product => `
            <div class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <span>${product.nameAr || 'بدون اسم'}</span>
              <button type="button" onclick="removeSalesReportMultiProduct('${product.id}')" class="text-red-600 hover:text-red-800 transition">✕</button>
            </div>
          `).join('')
        : '<span class="text-sm text-gray-500">لا توجد منتجات مختارة.</span>';
    }

    function updateSalesReportMainCategory(categoryId) {
      salesReportMainCategoryId = categoryId;
      salesReportSubCategoryId = '';
      salesReportResults = [];
      salesReportCurrentBranch = '';
      salesReportBranchRows = [];
      salesReportCurrentDetailProduct = null;
      renderAccounting('salesReport');
    }

    function updateSalesReportSubCategory(categoryId) {
      salesReportSubCategoryId = categoryId;
      salesReportResults = [];
      salesReportCurrentBranch = '';
      salesReportBranchRows = [];
      salesReportCurrentDetailProduct = null;
      renderAccounting('salesReport');
    }

    function getSalesReportCategoryDescendantIds(categoryId) {
      if (!categoryId) return [];
      const children = allCategories.filter(category => category.parentId === categoryId);
      let result = [];
      children.forEach(child => {
        result.push(child.id);
        result = result.concat(getSalesReportCategoryDescendantIds(child.id));
      });
      return result;
    }

    function getSalesReportCategoryProductIds() {
      if (!salesReportMainCategoryId) return [];

      const targetCategoryId = salesReportSubCategoryId || salesReportMainCategoryId;
      const relatedCategoryIds = [targetCategoryId, ...getSalesReportCategoryDescendantIds(targetCategoryId)];
      const relatedSet = new Set(relatedCategoryIds);

      return allProducts
        .filter(product => relatedSet.has(product.categoryId))
        .map(product => product.id);
    }

    function getSalesReportProductsForRun() {
      if (salesReportMode === 'single') {
        const selectedProduct = allProducts.find(product => product.id === salesReportSelectedProductId);
        return selectedProduct ? [selectedProduct] : [];
      }

      if (salesReportProductSource === 'manual') {
        if (salesReportMultiSelectedProductIds.length === 0) return [];
        const selectedSet = new Set(salesReportMultiSelectedProductIds);
        return allProducts.filter(product => selectedSet.has(product.id));
      }

      const categoryProductIds = getSalesReportCategoryProductIds();
      if (categoryProductIds.length === 0) return [];
      const selectedSet = new Set(categoryProductIds);
      return allProducts.filter(product => selectedSet.has(product.id));
    }

    function isMatchingSalesReportItem(item, product) {
      if (!item || !product) return false;

      const itemProductId = (item.productId || '').toString();
      const productId = (product.id || '').toString();
      if (itemProductId && productId && itemProductId === productId) {
        return true;
      }

      const itemNameAr = normalizeText(item.productName);
      const itemNameEn = normalizeText(item.productNameEn);
      const productNameAr = normalizeText(product.nameAr);
      const productNameEn = normalizeText(product.nameEn);

      return (
        (productNameAr && itemNameAr === productNameAr) ||
        (productNameEn && itemNameEn === productNameEn)
      );
    }

    async function runSalesReport() {
      const selectedProducts = getSalesReportProductsForRun();

      if (salesReportMode === 'single' && selectedProducts.length === 0) {
        showToast('يرجى اختيار منتج أولاً', true);
        return;
      }

      if (salesReportMode === 'multi') {
        if (salesReportProductSource === 'manual' && selectedProducts.length === 0) {
          showToast('يرجى اختيار منتج واحد على الأقل', true);
          return;
        }
        if (salesReportProductSource === 'category') {
          if (!salesReportMainCategoryId) {
            showToast('يرجى اختيار التصنيف الرئيسي أولاً', true);
            return;
          }
          if (selectedProducts.length === 0) {
            showToast('لا توجد منتجات ضمن التصنيف المحدد', true);
            return;
          }
        }
      }

      const fromTimestamp = salesReportFromDate ? new Date(`${salesReportFromDate}T00:00:00`).getTime() : null;
      const toTimestamp = salesReportToDate ? new Date(`${salesReportToDate}T23:59:59`).getTime() : null;

      if (fromTimestamp && toTimestamp && fromTimestamp > toTimestamp) {
        showToast('تاريخ البداية يجب أن يكون قبل تاريخ النهاية', true);
        return;
      }

      if (salesReportFromDate || salesReportToDate) {
        await ensureOrdersForDateFilters(salesReportFromDate, salesReportToDate);
      } else if (ordersLoadedMode !== 'all') {
        showToast('جاري تحميل الطلبات للتقرير...');
        await fetchAllOrdersForSearch();
      }

      const isMultiMode = salesReportMode === 'multi';
      const reportMap = {};

      allOrders.forEach(order => {
        const orderTimestamp = parseInt(order.timestamp, 10) || 0;
        if (fromTimestamp && orderTimestamp < fromTimestamp) return;
        if (toTimestamp && orderTimestamp > toTimestamp) return;

        const items = Array.isArray(order.items) ? order.items : [];
        if (items.length === 0) return;

        selectedProducts.forEach(product => {
          const matchingItems = items.filter(item => isMatchingSalesReportItem(item, product));
          if (matchingItems.length === 0) return;

          const branch = order.branch || 'غير محدد';
          const key = isMultiMode ? `${product.id || product.nameAr || product.nameEn}::${branch}` : branch;
          if (!reportMap[key]) {
            reportMap[key] = {
              productId: product.id || '',
              productNameAr: product.nameAr || 'بدون اسم',
              productNameEn: product.nameEn || 'No Name',
              branch,
              salesCount: 0,
              revenue: 0,
              detailsRows: []
            };
          }

          const totalQuantityInInvoice = matchingItems.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0);
          const totalRevenueInInvoice = matchingItems.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);

          reportMap[key].salesCount += 1;
          reportMap[key].revenue += totalRevenueInInvoice;
          reportMap[key].detailsRows.push({
            invoiceNumber: order.invoiceNumber || 'N/A',
            customerName: order.customerName || 'N/A',
            cashierName: order.cashier || 'N/A',
            quantity: totalQuantityInInvoice,
            invoiceProductTotal: totalRevenueInInvoice,
            timestamp: orderTimestamp
          });
        });
      });

      if (salesReportMode === 'single') {
        salesReportSelectedProduct = selectedProducts[0] || null;
      }

      salesReportResults = Object.values(reportMap).sort((a, b) => {
        if (b.revenue !== a.revenue) return b.revenue - a.revenue;
        if (b.salesCount !== a.salesCount) return b.salesCount - a.salesCount;
        return (a.productNameAr || '').localeCompare((b.productNameAr || ''), 'ar');
      });
      salesReportCurrentBranch = '';
      salesReportBranchRows = [];
      salesReportCurrentDetailProduct = null;

      renderAccounting('salesReport');

      if (salesReportResults.length === 0) {
        showToast('لا توجد نتائج مطابقة للفلاتر المحددة');
      }
    }

    function openSalesReportBranchDetails(index) {
      const selectedRow = salesReportResults[index];
      if (!selectedRow) {
        showToast('تعذر فتح التفاصيل', true);
        return;
      }

      salesReportCurrentBranch = selectedRow.branch;
      salesReportCurrentDetailProduct = {
        id: selectedRow.productId || '',
        nameAr: selectedRow.productNameAr || '',
        nameEn: selectedRow.productNameEn || ''
      };
      salesReportBranchRows = selectedRow.detailsRows
        .slice()
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

      renderAccounting('salesReportBranchDetails');
    }

    function renderSalesReportBranchDetailsSection() {
      if (!salesReportCurrentBranch) {
        return `
          <div class="bg-white p-6 rounded-xl shadow-lg text-center">
            <div class="text-gray-600 mb-4">لا يوجد صف محدد لعرض التفاصيل.</div>
            <button onclick="renderAccounting('salesReport')" class="bg-gray-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition">رجوع</button>
          </div>
        `;
      }

      const detailProductAr = salesReportCurrentDetailProduct?.nameAr || salesReportSelectedProduct?.nameAr || 'غير محدد';
      const detailProductEn = salesReportCurrentDetailProduct?.nameEn || salesReportSelectedProduct?.nameEn || 'Not Specified';

      return `
        <div>
          <div class="flex flex-wrap justify-between items-center gap-3 mb-6">
            <div>
              <h2 class="text-3xl font-bold text-blue-600">تفاصيل مبيعات الفرع: ${salesReportCurrentBranch}</h2>
              <p class="text-gray-600 mt-1">
                المنتج: ${detailProductAr} / ${detailProductEn} | الفترة: ${getSalesReportPeriodText()}
              </p>
            </div>
            <div class="flex gap-3">
              <button onclick="renderAccounting('salesReport')" class="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition">⬅ رجوع</button>
              <button onclick="printSalesReportDetailsA4()" class="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition">🖨️ طباعة A4</button>
              <button onclick="exportSalesReportDetailsExcel()" class="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">📥 تحميل Excel</button>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            ${salesReportBranchRows.length > 0 ? `
              <div class="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>رقم الفاتورة</th>
                      <th>اسم العميل</th>
                      <th>اسم الكاشير</th>
                      <th>كمية المنتج في الفاتورة</th>
                      <th>إجمالي قيمة المنتج في الفاتورة</th>
                      <th>تاريخ ووقت الطلب</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${salesReportBranchRows.map(row => `
                      <tr>
                        <td>${row.invoiceNumber}</td>
                        <td>${row.customerName}</td>
                        <td>${row.cashierName}</td>
                        <td>${formatReportQuantity(row.quantity)}</td>
                        <td>${formatNumberWithThreeDecimals(row.invoiceProductTotal)} د.ك</td>
                        <td>${formatDate(row.timestamp)} ${formatTime(row.timestamp)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : `
              <div class="text-center py-10 text-gray-500">لا توجد تفاصيل متاحة لهذا الصف.</div>
            `}
          </div>
        </div>
      `;
    }

    function exportSalesReportExcel() {
      if (salesReportResults.length === 0) {
        showToast('لا توجد نتائج لتصديرها', true);
        return;
      }

      const isMultiMode = salesReportMode === 'multi';
      const totalSalesCount = salesReportResults.reduce((sum, row) => sum + (row.salesCount || 0), 0);
      const totalRevenue = salesReportResults.reduce((sum, row) => sum + (row.revenue || 0), 0);

      let headers = [];
      let rowsHtml = '';
      let totalRow = '';

      if (isMultiMode) {
        headers = ['اسم المنتج بالعربي', 'اسم المنتج بالإنجليزي', 'اسم الفرع', 'مرات البيع', 'إيرادات المنتج (د.ك)'];
        rowsHtml = salesReportResults.map(row => `
          <tr>
            <td>${row.productNameAr}</td>
            <td>${row.productNameEn}</td>
            <td>${row.branch}</td>
            <td>${row.salesCount}</td>
            <td>${formatNumberWithThreeDecimals(row.revenue)}</td>
          </tr>
        `).join('');
        totalRow = `
          <tr class="total-row">
            <td>الإجمالي</td>
            <td></td>
            <td></td>
            <td>${totalSalesCount}</td>
            <td>${formatNumberWithThreeDecimals(totalRevenue)}</td>
          </tr>
        `;
      } else {
        headers = ['اسم الفرع', 'مرات البيع', 'إيرادات المنتج (د.ك)'];
        rowsHtml = salesReportResults.map(row => `
          <tr>
            <td>${row.branch}</td>
            <td>${row.salesCount}</td>
            <td>${formatNumberWithThreeDecimals(row.revenue)}</td>
          </tr>
        `).join('');
        totalRow = `
          <tr class="total-row">
            <td>الإجمالي</td>
            <td>${totalSalesCount}</td>
            <td>${formatNumberWithThreeDecimals(totalRevenue)}</td>
          </tr>
        `;
      }

      const excelHtml = buildExcelHtml(headers, rowsHtml, totalRow);
      const today = new Date().toLocaleDateString('ar-SA').replace(/\//g, '-');
      downloadExcelHtml(excelHtml, `تقرير_المبيعات_${today}.xls`);
      showToast('تم تحميل تقرير المبيعات (Excel)');
    }

    function exportSalesReportDetailsExcel() {
      if (salesReportBranchRows.length === 0) {
        showToast('لا توجد بيانات تفاصيل للتصدير', true);
        return;
      }

      const headers = ['رقم الفاتورة', 'اسم العميل', 'اسم الكاشير', 'كمية المنتج في الفاتورة', 'إجمالي قيمة المنتج في الفاتورة (د.ك)', 'تاريخ ووقت الطلب'];
      const rowsHtml = salesReportBranchRows.map(row => `
        <tr>
          <td>${row.invoiceNumber}</td>
          <td>${row.customerName}</td>
          <td>${row.cashierName}</td>
          <td>${formatReportQuantity(row.quantity)}</td>
          <td>${formatNumberWithThreeDecimals(row.invoiceProductTotal)}</td>
          <td>${formatDate(row.timestamp)} ${formatTime(row.timestamp)}</td>
        </tr>
      `).join('');

      const excelHtml = buildExcelHtml(headers, rowsHtml);
      const today = new Date().toLocaleDateString('ar-SA').replace(/\//g, '-');
      const productCode = salesReportCurrentDetailProduct?.nameAr || salesReportSelectedProduct?.nameAr || 'منتج';
      downloadExcelHtml(excelHtml, `تفاصيل_تقرير_المبيعات_${productCode}_${salesReportCurrentBranch}_${today}.xls`);
      showToast('تم تحميل تفاصيل التقرير (Excel)');
    }

    function printSalesReportA4() {
      if (salesReportResults.length === 0) {
        showToast('لا توجد نتائج للطباعة', true);
        return;
      }

      const isMultiMode = salesReportMode === 'multi';
      const isCategorySource = salesReportProductSource === 'category';
      const totalSalesCount = salesReportResults.reduce((sum, row) => sum + (row.salesCount || 0), 0);
      const totalRevenue = salesReportResults.reduce((sum, row) => sum + (row.revenue || 0), 0);
      const printedAt = new Date().toLocaleString('ar-SA');
      const mainCategory = allCategories.find(category => category.id === salesReportMainCategoryId);
      const subCategory = allCategories.find(category => category.id === salesReportSubCategoryId);
      const mainCategoryLabel = mainCategory
        ? `${mainCategory.nameAr || 'بدون اسم'} / ${mainCategory.nameEn || 'No Name'}`
        : 'غير محدد';
      const subCategoryLabel = salesReportSubCategoryId
        ? (subCategory ? `${subCategory.nameAr || 'بدون اسم'} / ${subCategory.nameEn || 'No Name'}` : 'غير محدد')
        : 'كل التصنيفات الفرعية';

      const tableRowsHtml = salesReportResults.map(row => `
        <tr>
          ${isMultiMode ? `
            <td>${row.productNameAr}</td>
            <td>${row.productNameEn}</td>
            <td>${row.branch}</td>
            <td>${row.salesCount}</td>
            <td>${formatNumberWithThreeDecimals(row.revenue)} د.ك</td>
          ` : `
            <td>${row.branch}</td>
            <td>${row.salesCount}</td>
            <td>${formatNumberWithThreeDecimals(row.revenue)} د.ك</td>
          `}
        </tr>
      `).join('');

      const totalRowHtml = isMultiMode
        ? `
          <tr>
            <td>الإجمالي</td>
            <td></td>
            <td></td>
            <td>${totalSalesCount}</td>
            <td>${formatNumberWithThreeDecimals(totalRevenue)} د.ك</td>
          </tr>
        `
        : `
          <tr>
            <td>الإجمالي</td>
            <td>${totalSalesCount}</td>
            <td>${formatNumberWithThreeDecimals(totalRevenue)} د.ك</td>
          </tr>
        `;

      const contentHtml = `
        <div class="print-report">
          <div class="report-header">
            <div>
              <h1 class="report-title">تقرير المبيعات</h1>
              <div class="print-date">تاريخ الطباعة: ${printedAt}</div>
            </div>
          </div>

          <div class="meta-grid">
            ${isMultiMode ? `
              <div class="meta-card">
                <div class="meta-label">نوع التقرير</div>
                <div class="meta-value">مجموعة منتجات</div>
              </div>
              <div class="meta-card">
                <div class="meta-label">طريقة التحديد</div>
                <div class="meta-value">${salesReportProductSource === 'manual' ? 'بحث واختيار منتجات' : 'حسب التصنيف'}</div>
              </div>
              ${isCategorySource ? `
                <div class="meta-card">
                  <div class="meta-label">التصنيف الرئيسي</div>
                  <div class="meta-value">${mainCategoryLabel}</div>
                </div>
                <div class="meta-card">
                  <div class="meta-label">التصنيف الفرعي</div>
                  <div class="meta-value">${subCategoryLabel}</div>
                </div>
              ` : `
                <div class="meta-card">
                  <div class="meta-label">عدد المنتجات المختارة</div>
                  <div class="meta-value">${salesReportMultiSelectedProductIds.length}</div>
                </div>
              `}
            ` : `
              <div class="meta-card">
                <div class="meta-label">اسم المنتج بالعربي</div>
                <div class="meta-value">${salesReportSelectedProduct?.nameAr || 'غير محدد'}</div>
              </div>
              <div class="meta-card">
                <div class="meta-label">اسم المنتج بالإنجليزي</div>
                <div class="meta-value">${salesReportSelectedProduct?.nameEn || 'Not Specified'}</div>
              </div>
            `}
            <div class="meta-card">
              <div class="meta-label">الفترة</div>
              <div class="meta-value">${getSalesReportPeriodText()}</div>
            </div>
          </div>

          <table class="report-table">
            <thead>
              ${isMultiMode ? `
                <tr>
                  <th>اسم المنتج بالعربي</th>
                  <th>اسم المنتج بالإنجليزي</th>
                  <th>اسم الفرع</th>
                  <th>مرات البيع</th>
                  <th>إيرادات المنتج</th>
                </tr>
              ` : `
                <tr>
                  <th>اسم الفرع</th>
                  <th>مرات البيع</th>
                  <th>إيرادات المنتج</th>
                </tr>
              `}
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
            <tfoot>
              ${totalRowHtml}
            </tfoot>
          </table>

          <div class="summary-strip">
            عدد الصفوف الظاهرة: ${salesReportResults.length} | مرات البيع الإجمالية: ${totalSalesCount} | إجمالي الإيرادات: ${formatNumberWithThreeDecimals(totalRevenue)} د.ك
          </div>
        </div>
      `;

      openA4PrintWindow('تقرير المبيعات', contentHtml);
    }

    function printSalesReportDetailsA4() {
      if (salesReportBranchRows.length === 0) {
        showToast('لا توجد تفاصيل للطباعة', true);
        return;
      }

      const printedAt = new Date().toLocaleString('ar-SA');
      const totalQuantity = salesReportBranchRows.reduce((sum, row) => sum + (parseFloat(row.quantity) || 0), 0);
      const totalProductValue = salesReportBranchRows.reduce((sum, row) => sum + (parseFloat(row.invoiceProductTotal) || 0), 0);
      const detailProductAr = salesReportCurrentDetailProduct?.nameAr || salesReportSelectedProduct?.nameAr || 'غير محدد';
      const detailProductEn = salesReportCurrentDetailProduct?.nameEn || salesReportSelectedProduct?.nameEn || 'Not Specified';

      const tableRowsHtml = salesReportBranchRows.map(row => `
        <tr>
          <td>${row.invoiceNumber}</td>
          <td>${row.customerName}</td>
          <td>${row.cashierName}</td>
          <td>${formatReportQuantity(row.quantity)}</td>
          <td>${formatNumberWithThreeDecimals(row.invoiceProductTotal)} د.ك</td>
          <td>${formatDate(row.timestamp)} ${formatTime(row.timestamp)}</td>
        </tr>
      `).join('');

      const contentHtml = `
        <div class="print-report">
          <div class="report-header">
            <div>
              <h1 class="report-title">تفاصيل تقرير المبيعات</h1>
              <div class="print-date">تاريخ الطباعة: ${printedAt}</div>
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-card">
              <div class="meta-label">الفرع</div>
              <div class="meta-value">${salesReportCurrentBranch}</div>
            </div>
            <div class="meta-card">
              <div class="meta-label">اسم المنتج بالعربي</div>
              <div class="meta-value">${detailProductAr}</div>
            </div>
            <div class="meta-card">
              <div class="meta-label">اسم المنتج بالإنجليزي</div>
              <div class="meta-value">${detailProductEn}</div>
            </div>
          </div>

          <div class="meta-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
            <div class="meta-card">
              <div class="meta-label">الفترة</div>
              <div class="meta-value">${getSalesReportPeriodText()}</div>
            </div>
            <div class="meta-card">
              <div class="meta-label">عدد الفواتير في التقرير</div>
              <div class="meta-value">${salesReportBranchRows.length}</div>
            </div>
          </div>

          <table class="report-table">
            <thead>
              <tr>
                <th>رقم الفاتورة</th>
                <th>اسم العميل</th>
                <th>اسم الكاشير</th>
                <th>كمية المنتج في الفاتورة</th>
                <th>إجمالي قيمة المنتج في الفاتورة</th>
                <th>تاريخ ووقت الطلب</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>

          <div class="summary-strip">
            إجمالي كمية المنتج في التفاصيل: ${formatReportQuantity(totalQuantity)} | إجمالي قيمة المنتج في التفاصيل: ${formatNumberWithThreeDecimals(totalProductValue)} د.ك
          </div>
        </div>
      `;

      openA4PrintWindow(`تفاصيل تقرير المبيعات - ${salesReportCurrentBranch}`, contentHtml);
    }

    // Customers Section
    function renderCustomersSection() {
      return `
        <div>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-blue-600">العملاء</h2>
            <button onclick="showAddCustomerModal()" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة عميل</button>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <input type="text" id="customerSearch" placeholder="بحث..." oninput="filterCustomers()" class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>الاسم</th>
                    <th>الهاتف</th>
                    <th>عدد الطلبات</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody id="customersBody">
                  ${allCustomers.map(customer => {
                    const ordersCount = allOrders.filter(o => o.phoneNumber === customer.phone).length;
                    return `
                      <tr class="customer-row" data-search="${customer.name} ${customer.phone}">
                        <td>${customer.name}</td>
                        <td>${customer.phone}</td>
                        <td>${ordersCount}</td>
                        <td>
                          <button onclick="viewCustomer('${customer.id}')" class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">عرض</button>
                          <button onclick="editCustomer('${customer.id}')" class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition">تعديل</button>
                          <button onclick="confirmDeleteCustomer('${customer.id}')" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">حذف</button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    function filterCustomers() {
      const searchTerm = document.getElementById('customerSearch').value.toLowerCase();
      const rows = document.querySelectorAll('.customer-row');
      
      rows.forEach(row => {
        const searchData = row.getAttribute('data-search').toLowerCase();
        row.style.display = searchData.includes(searchTerm) ? '' : 'none';
      });
    }

    function showAddCustomerModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة عميل جديد</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم</label>
              <input type="text" id="newCustomerName" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">رقم الهاتف</label>
              <div class="flex gap-2">
                <input type="text" id="newCustomerPrefix" value="965" class="w-20 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <input type="text" id="newCustomerPhone" class="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              </div>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="addCustomer()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">إضافة</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function addCustomer() {
      const name = document.getElementById('newCustomerName').value.trim();
      const prefix = document.getElementById('newCustomerPrefix').value.trim();
      const phone = document.getElementById('newCustomerPhone').value.trim();
      
      if (!name || !phone) {
        showToast('الرجاء إدخال الاسم ورقم الهاتف', true);
        return;
      }
      
      const customer = {
        name,
        phone: prefix + phone,
        addresses: []
      };
      
      const success = await saveCustomer(customer);
      if (success) {
        showToast('تم إضافة العميل بنجاح');
        document.querySelector('.modal-overlay').remove();
        renderAccounting('customers');
      }
    }

    function viewCustomer(customerId) {
      const customer = allCustomers.find(c => c.id === customerId);
      const customerOrders = allOrders.filter(o => o.phoneNumber === customer.phone);
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-3xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تفاصيل العميل</h2>
          
          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="text-sm text-gray-600">الاسم</div>
                <div class="text-lg font-bold">${customer.name}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">الهاتف</div>
                <div class="text-lg font-bold">${customer.phone}</div>
              </div>
            </div>
            
            ${customer.addresses && customer.addresses.length > 0 ? `
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="text-sm text-gray-600 mb-2">العناوين</div>
                ${customer.addresses.map(addr => `
                  <div class="bg-white p-3 rounded-lg mb-2">
                    <div class="font-bold">${addr.area}</div>
                    <div class="text-sm text-gray-600">${addr.details}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
          
          <h3 class="text-xl font-bold mb-4">الطلبات (${customerOrders.length})</h3>
          <div class="max-h-96 overflow-y-auto">
            <table>
              <thead>
                <tr>
                  <th>رقم الفاتورة</th>
                  <th>التاريخ</th>
                  <th>الفرع</th>
                  <th>المجموع</th>
                </tr>
              </thead>
              <tbody>
                ${customerOrders.map(order => `
                  <tr>
                    <td>${order.invoiceNumber}</td>
                    <td>${formatDate(order.timestamp)}</td>
                    <td>${order.branch}</td>
                    <td>${order.total.toFixed(3)} د.ك</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <button onclick="this.closest('.modal-overlay').remove()" class="w-full mt-6 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إغلاق</button>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function editCustomer(customerId) {
      const customer = allCustomers.find(c => c.id === customerId);
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تعديل العميل</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم</label>
              <input type="text" id="editCustomerName" value="${customer.name}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">رقم الهاتف</label>
              <input type="text" id="editCustomerPhone" value="${customer.phone}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="saveEditedCustomer('${customerId}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function saveEditedCustomer(customerId) {
      const name = document.getElementById('editCustomerName').value.trim();
      const phone = document.getElementById('editCustomerPhone').value.trim();
      
      if (!name || !phone) {
        showToast('الرجاء إدخال الاسم ورقم الهاتف', true);
        return;
      }
      
      const customer = allCustomers.find(c => c.id === customerId);
      if (!customer) {
        showToast('العميل غير موجود', true);
        return;
      }
      const oldPhone = customer.phone || '';
      customer.name = name;
      customer.phone = phone;
      
      const success = await saveCustomer(customer);
      if (success) {
        await updateOrdersForCustomer(oldPhone, {
          customerName: name,
          phoneNumber: phone
        });
        showToast('تم تعديل العميل بنجاح');
        document.querySelector('.modal-overlay').remove();
        renderAccounting('customers');
      }
    }

    async function updateOrdersForCustomer(phone, updates) {
      if (!phone) return 0;
      const matchingOrders = allOrders.filter(order => (order.phoneNumber || '') === phone);
      if (!matchingOrders.length) return 0;
      const payload = {};
      matchingOrders.forEach(order => {
        payload[`orders/${order.id}`] = {
          ...order,
          ...updates,
          updatedAt: Date.now()
        };
      });
      await db.ref().update(payload);
      matchingOrders.forEach(order => Object.assign(order, updates, { updatedAt: Date.now() }));
      return matchingOrders.length;
    }

    function confirmDeleteCustomer(customerId) {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد الحذف</h2>
          <p class="text-gray-600 mb-6">هل أنت متأكد من حذف هذا العميل؟</p>
          <div class="flex gap-3">
            <button onclick="deleteCustomerConfirmed('${customerId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteCustomerConfirmed(customerId) {
      const success = await deleteCustomer(customerId);
      if (success) {
        document.querySelector('.modal-overlay').remove();
        renderAccounting('customers');
        showToast('تم حذف العميل بنجاح');
      }
    }

    // Products Section (rest of accounting functions remain the same...)
    function getAdminProductSearchText(product) {
      return normalizeText(`${product?.nameAr || ''} ${product?.nameEn || ''}`);
    }

    function getChildCategories(parentId) {
      return allCategories
        .filter(category => {
          const categoryParentId = category.parentId || '';
          return parentId ? categoryParentId === parentId : !categoryParentId;
        })
        .sort((a, b) => (a.nameAr || '').localeCompare(b.nameAr || '', 'ar'));
    }

    function normalizeAdminProductCategoryPath() {
      const validPath = [];
      let parentId = '';

      for (const categoryId of adminProductCategoryPath) {
        const category = allCategories.find(item => {
          const itemParentId = item.parentId || '';
          return item.id === categoryId && itemParentId === parentId;
        });

        if (!category) break;

        validPath.push(categoryId);
        parentId = categoryId;
      }

      adminProductCategoryPath = validPath;
      return adminProductCategoryPath;
    }

    function getAdminProductSelectedCategoryId() {
      const path = normalizeAdminProductCategoryPath();
      return path.length > 0 ? path[path.length - 1] : '';
    }

    function getAdminProductsForSelectedCategory() {
      const selectedCategoryId = getAdminProductSelectedCategoryId();
      if (!selectedCategoryId) return allProducts;
      return allProducts.filter(product => (product.categoryId || '') === selectedCategoryId);
    }

    function doesAdminProductMatchSearch(product) {
      const searchTerm = normalizeText(adminProductSearchTerm);
      if (!searchTerm) return true;
      return getAdminProductSearchText(product).includes(searchTerm);
    }

    function getAdminVisibleProducts() {
      return getAdminProductsForSelectedCategory().filter(product => doesAdminProductMatchSearch(product));
    }

    function getAdminSelectedProducts() {
      const selectedIds = new Set(adminSelectedProductIds);
      return allProducts.filter(product => selectedIds.has(product.id));
    }

    function pruneAdminProductSelectionToExistingProducts() {
      const existingIds = new Set(allProducts.map(product => product.id));
      adminSelectedProductIds = adminSelectedProductIds.filter(productId => existingIds.has(productId));
    }

    function pruneAdminProductSelectionToCurrentCategory() {
      const selectedCategoryId = getAdminProductSelectedCategoryId();
      if (!selectedCategoryId) {
        pruneAdminProductSelectionToExistingProducts();
        return;
      }

      const categoryProductIds = new Set(getAdminProductsForSelectedCategory().map(product => product.id));
      adminSelectedProductIds = adminSelectedProductIds.filter(productId => categoryProductIds.has(productId));
    }

    function renderAdminProductCategoryFilters() {
      const path = normalizeAdminProductCategoryPath();
      const levels = [];
      let parentId = '';
      let levelIndex = 0;

      while (true) {
        const categories = getChildCategories(parentId);
        if (categories.length === 0) break;

        const selectedId = path[levelIndex] || '';
        levels.push({ categories, selectedId, levelIndex });

        if (!selectedId) break;
        parentId = selectedId;
        levelIndex++;
      }

      if (levels.length === 0) {
        return '<div class="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">لا توجد تصنيفات مضافة</div>';
      }

      return levels.map(level => `
        <select onchange="updateAdminProductCategoryFilter(${level.levelIndex}, this.value)" class="min-w-56 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
          <option value="">${level.levelIndex === 0 ? 'كل التصنيفات' : 'كل التصنيفات الفرعية'}</option>
          ${level.categories.map(category => `
            <option value="${category.id}" ${level.selectedId === category.id ? 'selected' : ''}>
              ${escapeHtml(category.nameAr || 'بدون اسم')}${category.nameEn ? ` / ${escapeHtml(category.nameEn)}` : ''}
            </option>
          `).join('')}
        </select>
      `).join('');
    }

    function updateAdminProductCategoryFilter(levelIndex, categoryId) {
      const nextPath = adminProductCategoryPath.slice(0, levelIndex);
      if (categoryId) nextPath[levelIndex] = categoryId;
      adminProductCategoryPath = nextPath;
      pruneAdminProductSelectionToCurrentCategory();
      renderAccounting('products');
    }

    function renderProductsSection() {
      normalizeAdminProductCategoryPath();
      pruneAdminProductSelectionToCurrentCategory();

      const categoryProducts = getAdminProductsForSelectedCategory();
      const visibleProducts = getAdminVisibleProducts();
      const visibleProductIds = visibleProducts.map(product => product.id).filter(Boolean);
      const allVisibleSelected = visibleProductIds.length > 0 && visibleProductIds.every(productId => adminSelectedProductIds.includes(productId));
      const selectedCount = adminSelectedProductIds.length;

      return `
        <div>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-blue-600">المنتجات</h2>
            <div class="flex gap-3">
              <button onclick="showImportExcelModal()" class="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">📥 استيراد Excel</button>
              <button onclick="showAddProductModal()" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة منتج</button>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="mb-4">
              <label class="block mb-2 font-bold text-gray-700">اختيار التصنيف</label>
              <div class="flex flex-wrap gap-3">
                ${renderAdminProductCategoryFilters()}
              </div>
            </div>

            <input type="text" id="productSearch" value="${escapeHtml(adminProductSearchTerm || '')}" placeholder="بحث..." oninput="filterProducts()" class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">

            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div class="flex flex-wrap gap-3">
                <button id="adminSelectAllProductsBtn" onclick="toggleSelectAllAdminVisibleProducts()" class="bg-gray-700 text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-800 transition">
                  ${allVisibleSelected ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
                </button>
                <button onclick="clearAdminProductSelection()" class="${selectedCount > 0 ? '' : 'hidden'} bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء التحديد</button>
              </div>
              <div class="text-sm font-bold text-gray-600">
                المعروض: <span id="adminProductsVisibleCount">${visibleProducts.length}</span> / ${categoryProducts.length}
              </div>
            </div>

            ${selectedCount > 0 ? `
              <div id="adminBulkActionsBar" class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4 flex flex-wrap items-center justify-between gap-3">
                <div class="font-bold text-blue-700">تم تحديد ${selectedCount} منتج</div>
                <div class="flex gap-3">
                  <button onclick="showBulkPriceEditModal()" class="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition">تعديل</button>
                  <button onclick="confirmBulkDeleteProducts()" class="bg-red-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-700 transition">حذف</button>
                </div>
              </div>
            ` : ''}

            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>تحديد</th>
                    <th>الاسم بالعربي</th>
                    <th>الاسم بالإنجليزي</th>
                    <th>السعر</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody id="productsBody">
                  ${categoryProducts.length > 0 ? categoryProducts.map(product => `
                    <tr class="product-row" data-product-id="${product.id || ''}" data-search="${escapeHtml(getAdminProductSearchText(product))}" style="${doesAdminProductMatchSearch(product) ? '' : 'display: none;'}">
                      <td>
                        <input type="checkbox" ${adminSelectedProductIds.includes(product.id) ? 'checked' : ''} onclick="event.stopPropagation()" onchange="toggleAdminProductSelection('${product.id}', this.checked)" class="w-5 h-5 cursor-pointer">
                      </td>
                      <td>${escapeHtml(product.nameAr || '')}</td>
                      <td>${escapeHtml(product.nameEn || '')}</td>
                      <td>${formatNumberWithThreeDecimals(product.price)} د.ك</td>
                      <td>
                        <button onclick="editProduct('${product.id}')" class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition">تعديل</button>
                        <button onclick="confirmDeleteProduct('${product.id}')" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">حذف</button>
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="5" class="text-center text-gray-500 py-8">لا توجد منتجات</td>
                    </tr>
                  `}
                  ${categoryProducts.length > 0 ? `
                    <tr id="adminProductsNoSearchResults" style="${visibleProducts.length === 0 ? '' : 'display: none;'}">
                      <td colspan="5" class="text-center text-gray-500 py-8">لا توجد نتائج مطابقة للبحث</td>
                    </tr>
                  ` : ''}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    function getProductInfoByProductId(productId) {
      return allProductInfos.find(info => (info.productId || info.id) === productId) || null;
    }

    function getProductInfoRows() {
      const searchTerm = normalizeText(productInfoSearchTerm);
      return allProductInfos
        .map(info => {
          const product = allProducts.find(item => item.id === (info.productId || info.id));
          return { info, product };
        })
        .filter(row => row.product)
        .filter(row => {
          if (!searchTerm) return true;
          const text = normalizeText(`${row.product.nameAr || ''} ${row.product.nameEn || ''} ${row.info.ingredients || ''} ${row.info.origin || ''} ${row.info.barcode || row.product.barcode || ''}`);
          return text.includes(searchTerm);
        })
        .sort((a, b) => (a.product.nameAr || '').localeCompare(b.product.nameAr || '', 'ar'));
    }

    function updateProductInfoPage(page) {
      productInfoPage = Math.max(1, Number(page) || 1);
      renderAccounting('productInfo');
    }

    function renderProductInfoPagination(totalRows, totalPages) {
      if (totalPages <= 1) return '';

      const maxButtons = 7;
      let startPage = Math.max(1, productInfoPage - Math.floor(maxButtons / 2));
      let endPage = Math.min(totalPages, startPage + maxButtons - 1);
      startPage = Math.max(1, endPage - maxButtons + 1);

      const buttons = [];
      for (let page = startPage; page <= endPage; page++) {
        buttons.push(`
          <button
            onclick="updateProductInfoPage(${page})"
            class="${page === productInfoPage ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-lg font-bold transition"
          >${page}</button>
        `);
      }

      return `
        <div class="flex flex-wrap items-center justify-between gap-3 mt-5">
          <div class="text-sm font-bold text-gray-600">صفحة ${productInfoPage} من ${totalPages} - الإجمالي ${totalRows}</div>
          <div class="flex flex-wrap gap-2">
            <button onclick="updateProductInfoPage(${productInfoPage - 1})" class="${productInfoPage <= 1 ? 'opacity-50 pointer-events-none' : ''} bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition">السابق</button>
            ${buttons.join('')}
            <button onclick="updateProductInfoPage(${productInfoPage + 1})" class="${productInfoPage >= totalPages ? 'opacity-50 pointer-events-none' : ''} bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition">التالي</button>
          </div>
        </div>
      `;
    }

    function renderProductInfoSection() {
      const allRows = getProductInfoRows();
      const pageSize = 20;
      const totalPages = Math.max(1, Math.ceil(allRows.length / pageSize));
      if (productInfoPage > totalPages) productInfoPage = totalPages;
      if (productInfoPage < 1) productInfoPage = 1;
      const startIndex = (productInfoPage - 1) * pageSize;
      const rows = allRows.slice(startIndex, startIndex + pageSize);

      return `
        <div>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-blue-600">معلومات المنتجات</h2>
            <button onclick="showAddProductInfoModal()" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة منتجات</button>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
              <input
                type="text"
                id="productInfoSearch"
                value="${escapeHtml(productInfoSearchTerm || '')}"
                placeholder="بحث..."
                oninput="productInfoSearchTerm = this.value; productInfoPage = 1; renderAccounting('productInfo')"
                class="flex-1 min-w-64 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              >
              <div class="text-sm font-bold text-gray-600">عدد المنتجات: ${allRows.length}</div>
            </div>

            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>اسم المنتج</th>
                    <th>المكونات</th>
                    <th>بلد المنشأ</th>
                    <th>الباركود</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows.length > 0 ? rows.map(({ info, product }) => `
                    <tr>
                      <td class="font-bold min-w-56">
                        ${escapeHtml(product.nameAr || '')}
                        ${product.nameEn ? `<div class="text-xs text-gray-500 mt-1">${escapeHtml(product.nameEn)}</div>` : ''}
                      </td>
                      <td class="min-w-96">
                        <textarea
                          rows="2"
                          class="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                          onchange="updateProductInfoField('${info.id}', 'ingredients', this.value)"
                        >${escapeHtml(info.ingredients || '')}</textarea>
                      </td>
                      <td class="min-w-48">
                        <input
                          type="text"
                          value="${escapeHtml(info.origin || '')}"
                          class="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                          onchange="updateProductInfoField('${info.id}', 'origin', this.value)"
                        >
                      </td>
                      <td class="min-w-44">
                        <input
                          type="text"
                          value="${escapeHtml(info.barcode || product.barcode || '')}"
                          oninput="this.value = convertToEnglishNumbers(this.value)"
                          class="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none ltr text-left"
                          onchange="updateProductInfoField('${info.id}', 'barcode', this.value)"
                        >
                      </td>
                      <td class="whitespace-nowrap">
                        <button onclick="deleteProductInfo('${info.id}')" class="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition">حذف</button>
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="5" class="text-center text-gray-500 py-8">لا توجد معلومات منتجات بعد</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>

            ${renderProductInfoPagination(allRows.length, totalPages)}
          </div>
        </div>
      `;
    }

    async function updateProductInfoField(infoId, field, value) {
      const cleanValue = field === 'barcode' ? convertToEnglishNumbers(value || '').trim() : (value || '').trim();
      try {
        await db.ref(`productInfos/${infoId}/${field}`).set(cleanValue);
        const row = allProductInfos.find(info => info.id === infoId);
        if (row) row[field] = cleanValue;
        showToast('تم الحفظ');
      } catch (error) {
        console.error('Error updating product info:', error);
        showToast('تعذر حفظ معلومات المنتج', true);
      }
    }

    async function deleteProductInfo(infoId) {
      if (!confirm('هل تريد حذف معلومات هذا المنتج؟')) return;
      try {
        await db.ref(`productInfos/${infoId}`).remove();
        allProductInfos = allProductInfos.filter(info => info.id !== infoId);
        renderAccounting('productInfo');
        showToast('تم الحذف');
      } catch (error) {
        console.error('Error deleting product info:', error);
        showToast('تعذر حذف معلومات المنتج', true);
      }
    }

    function showAddProductInfoModal() {
      selectedProductsForInfo = [];
      const existingProductIds = new Set(allProductInfos.map(info => info.productId || info.id));
      const availableProducts = allProducts
        .filter(product => product.id && !existingProductIds.has(product.id))
        .sort((a, b) => (a.nameAr || '').localeCompare(b.nameAr || '', 'ar'));

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-4xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة منتجات</h2>
          <input type="text" id="addProductInfoSearch" placeholder="🔍 بحث عن منتج..." oninput="filterAddProductInfoProducts()" class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">

          <div class="bg-blue-50 p-3 rounded-lg mb-4" id="productInfoSelectedCountBadge" style="display: none;">
            <span class="font-bold text-blue-600" id="productInfoSelectedCount">0</span> منتج محدد
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto" id="productsGridForInfo">
            ${availableProducts.length > 0 ? availableProducts.map(product => `
              <div
                class="product-card add-product-info-card border-2"
                data-search="${escapeHtml(`${product.nameAr || ''} ${product.nameEn || ''} ${product.barcode || ''}`)}"
                data-product-id="${product.id}"
                onclick="toggleProductInfoSelection('${product.id}')"
                style="border-color: #e5e7eb;"
              >
                <div class="text-3xl mb-2">📦</div>
                <div class="font-bold mb-1">${escapeHtml(product.nameAr || '')}</div>
                ${product.nameEn ? `<div class="text-xs text-gray-500 mb-1">${escapeHtml(product.nameEn)}</div>` : ''}
                <div class="text-blue-600 font-bold text-sm">${escapeHtml(product.barcode || 'بدون باركود')}</div>
              </div>
            `).join('') : '<div class="col-span-full text-center text-gray-500 py-8">كل المنتجات مضافة في معلومات المنتجات</div>'}
          </div>

          <div class="flex gap-3 mt-6">
            <button id="addSelectedProductInfoBtn" onclick="addSelectedProductsToInfo()" disabled class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">إضافة</button>
            <button onclick="this.closest('.modal-overlay').remove();" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function filterAddProductInfoProducts() {
      const searchTerm = normalizeText(document.getElementById('addProductInfoSearch')?.value || '');
      document.querySelectorAll('.add-product-info-card').forEach(card => {
        const searchData = normalizeText(card.getAttribute('data-search') || '');
        card.style.display = searchData.includes(searchTerm) ? '' : 'none';
      });
    }

    function toggleProductInfoSelection(productId) {
      const card = document.querySelector(`.add-product-info-card[data-product-id="${productId}"]`);
      if (!card) return;

      if (selectedProductsForInfo.includes(productId)) {
        selectedProductsForInfo = selectedProductsForInfo.filter(id => id !== productId);
        card.style.borderColor = '#e5e7eb';
        card.style.backgroundColor = 'white';
      } else {
        selectedProductsForInfo.push(productId);
        card.style.borderColor = '#3b82f6';
        card.style.backgroundColor = '#dbeafe';
      }

      document.getElementById('productInfoSelectedCount').textContent = selectedProductsForInfo.length;
      document.getElementById('productInfoSelectedCountBadge').style.display = selectedProductsForInfo.length > 0 ? '' : 'none';
      document.getElementById('addSelectedProductInfoBtn').disabled = selectedProductsForInfo.length === 0;
    }

    async function addSelectedProductsToInfo() {
      if (selectedProductsForInfo.length === 0) {
        showToast('الرجاء تحديد منتج واحد على الأقل', true);
        return;
      }

      const button = document.getElementById('addSelectedProductInfoBtn');
      button.disabled = true;
      button.textContent = 'جاري الإضافة...';

      const updates = {};
      selectedProductsForInfo.forEach(productId => {
        const product = allProducts.find(item => item.id === productId);
        if (!product) return;
        updates[productId] = {
          id: productId,
          productId,
          productName: product.nameAr || '',
          ingredients: '',
          origin: '',
          barcode: product.barcode || '',
          createdAt: Date.now()
        };
      });

      try {
        await db.ref('productInfos').update(updates);
        selectedProductsForInfo = [];
        document.querySelector('.modal-overlay')?.remove();
        renderAccounting('productInfo');
        showToast(`تمت إضافة ${Object.keys(updates).length} منتج`);
      } catch (error) {
        console.error('Error adding product infos:', error);
        showToast('تعذر إضافة المنتجات', true);
        button.disabled = false;
        button.textContent = 'إضافة';
      }
    }

    function getTodayDateInputValue() {
      const date = new Date();
      const pad = value => String(value).padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }

    function getDateInputValueAfterDays(days) {
      const date = new Date();
      date.setDate(date.getDate() + days);
      const pad = value => String(value).padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }

    function formatStickerDate(value) {
      if (!value) return '';
      const [year, month, day] = value.split('-');
      return `${year}/${month}/${day}`;
    }

    function normalizeProductionStickerCategoryPath() {
      const validPath = [];
      let parentId = '';

      for (const categoryId of productionStickerCategoryPath) {
        const category = allCategories.find(item => {
          const itemParentId = item.parentId || '';
          return item.id === categoryId && itemParentId === parentId;
        });

        if (!category) break;

        validPath.push(categoryId);
        parentId = categoryId;
      }

      productionStickerCategoryPath = validPath;
      return productionStickerCategoryPath;
    }

    function getProductionStickerSelectedCategoryId() {
      const path = normalizeProductionStickerCategoryPath();
      return path.length > 0 ? path[path.length - 1] : '';
    }

    function renderProductionStickerCategoryFilters() {
      const path = normalizeProductionStickerCategoryPath();
      const levels = [];
      let parentId = '';
      let levelIndex = 0;

      while (true) {
        const categories = getChildCategories(parentId);
        if (categories.length === 0) break;

        const selectedId = path[levelIndex] || '';
        levels.push({ categories, selectedId, levelIndex });

        if (!selectedId) break;
        parentId = selectedId;
        levelIndex++;
      }

      if (levels.length === 0) {
        return '<div class="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">لا توجد تصنيفات مضافة</div>';
      }

      return levels.map(level => `
        <select onchange="updateProductionStickerCategoryFilter(${level.levelIndex}, this.value)" class="min-w-56 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
          <option value="">${level.levelIndex === 0 ? 'اختر التصنيف' : 'اختر التصنيف الفرعي'}</option>
          ${level.categories.map(category => `
            <option value="${category.id}" ${level.selectedId === category.id ? 'selected' : ''}>
              ${escapeHtml(category.nameAr || 'بدون اسم')}${category.nameEn ? ` / ${escapeHtml(category.nameEn)}` : ''}
            </option>
          `).join('')}
        </select>
      `).join('');
    }

    function updateProductionStickerCategoryFilter(levelIndex, categoryId) {
      const nextPath = productionStickerCategoryPath.slice(0, levelIndex);
      if (categoryId) nextPath[levelIndex] = categoryId;
      productionStickerCategoryPath = nextPath;
      productionStickerSelectedProductId = '';
      renderAccounting('productionStickers');
    }

    function updateProductionStickerSearch(input) {
      const cursorPosition = input.selectionStart || 0;
      productionStickerSearchTerm = input.value;
      renderAccounting('productionStickers');
      setTimeout(() => {
        const searchInput = document.getElementById('productionStickerSearch');
        if (!searchInput) return;
        searchInput.focus();
        const nextPosition = Math.min(cursorPosition, searchInput.value.length);
        searchInput.setSelectionRange(nextPosition, nextPosition);
      }, 0);
    }

    function getProductionStickerProductRows() {
      const searchTerm = normalizeText(productionStickerSearchTerm);
      const selectedCategoryId = getProductionStickerSelectedCategoryId();

      if (!searchTerm && !selectedCategoryId) return [];

      return allProducts
        .filter(product => {
          if (searchTerm) {
            return normalizeText(`${product.nameAr || ''} ${product.nameEn || ''} ${product.barcode || ''}`).includes(searchTerm);
          }
          if (selectedCategoryId) return (product.categoryId || '') === selectedCategoryId;
          return false;
        })
        .sort((a, b) => (a.nameAr || '').localeCompare(b.nameAr || '', 'ar'))
        .slice(0, searchTerm ? 80 : 200);
    }

    function getProductionStickerProductStatus(product) {
      const info = getProductInfoByProductId(product.id);
      const missing = [];
      if (!product.nameAr) missing.push('الاسم العربي');
      if (!product.nameEn) missing.push('الاسم الإنجليزي');
      if (!((info?.ingredients || '').trim())) missing.push('المكونات');
      if (!((info?.origin || '').trim())) missing.push('بلد المنشأ');
      if (!((info?.barcode || product.barcode || '').trim())) missing.push('الباركود');
      return {
        info,
        isComplete: missing.length === 0,
        missing
      };
    }

    function renderProductionStickersSection() {
      const selectedProduct = allProducts.find(product => product.id === productionStickerSelectedProductId);
      const selectedStatus = selectedProduct ? getProductionStickerProductStatus(selectedProduct) : null;
      const selectedCategoryId = getProductionStickerSelectedCategoryId();
      const hasProductFilter = Boolean(normalizeText(productionStickerSearchTerm) || selectedCategoryId);
      const products = productionStickerFormOpen ? getProductionStickerProductRows() : [];

      return `
        <div>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-blue-600">ستيكرات الإنتاج</h2>
            <button onclick="startProductionStickerForm()" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">إنتاج جديد</button>
          </div>

          ${!productionStickerFormOpen ? `
            <div class="bg-white p-8 rounded-xl shadow-lg text-center">
              <div class="text-4xl mb-4">🏷️</div>
              <h3 class="text-2xl font-bold text-gray-800 mb-2">طباعة ستيكرات الإنتاج</h3>
              <p class="text-gray-600 mb-6">اختر منتجاً وحدد تاريخ الإنتاج والانتهاء والكمية للطباعة.</p>
              <button onclick="startProductionStickerForm()" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">إنتاج جديد</button>
            </div>
          ` : `
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div class="xl:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                <h3 class="text-xl font-bold text-gray-800 mb-4">اختيار المنتج</h3>

                <div class="mb-4">
                  <label class="block mb-2 font-bold text-gray-700">اختيار التصنيف</label>
                  <div class="flex flex-wrap gap-3">
                    ${renderProductionStickerCategoryFilters()}
                  </div>
                </div>

                <input
                  type="text"
                  id="productionStickerSearch"
                  value="${escapeHtml(productionStickerSearchTerm || '')}"
                  placeholder="بحث باسم المنتج أو الباركود..."
                  oninput="updateProductionStickerSearch(this)"
                  class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none"
                >

                <div class="text-sm font-bold text-gray-600 mb-3">
                  ${hasProductFilter ? `المعروض: ${products.length}${normalizeText(productionStickerSearchTerm) ? ' نتيجة كحد أقصى' : ''}` : 'اختر تصنيفاً أو ابدأ بالبحث لعرض المنتجات'}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  ${products.length > 0 ? products.map(product => {
                    const status = getProductionStickerProductStatus(product);
                    const isSelected = product.id === productionStickerSelectedProductId;
                    return `
                      <button
                        onclick="selectProductionStickerProduct('${product.id}')"
                        class="text-right p-4 rounded-lg border-2 transition ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}"
                      >
                        <div class="font-bold text-gray-900">${escapeHtml(product.nameAr || '')}</div>
                        ${product.nameEn ? `<div class="text-xs text-gray-500 mt-1">${escapeHtml(product.nameEn)}</div>` : ''}
                        <div class="mt-3 flex flex-wrap gap-2 items-center">
                          <span class="${status.isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} px-3 py-1 rounded-full text-xs font-bold">
                            ${status.isComplete ? 'معلوماته كاملة' : 'ناقص معلومات'}
                          </span>
                          ${!status.isComplete ? `<span class="text-xs text-gray-500">${escapeHtml(status.missing.join('، '))}</span>` : ''}
                        </div>
                      </button>
                    `;
                  }).join('') : `<div class="col-span-full text-center text-gray-500 py-8">${hasProductFilter ? 'لا توجد منتجات مطابقة' : 'لن يتم تحميل المنتجات كلها هنا حتى تبقى الصفحة سريعة'}</div>`}
                </div>
              </div>

              <div class="bg-white p-6 rounded-xl shadow-lg">
                <h3 class="text-xl font-bold text-gray-800 mb-4">بيانات الإنتاج</h3>
                ${selectedProduct ? `
                  <div class="mb-4 p-4 rounded-lg ${selectedStatus.isComplete ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
                    <div class="font-bold">${escapeHtml(selectedProduct.nameAr || '')}</div>
                    <div class="${selectedStatus.isComplete ? 'text-green-700' : 'text-red-700'} text-sm font-bold mt-2">
                      ${selectedStatus.isComplete ? 'معلومات المنتج كاملة وجاهزة للطباعة' : `ناقص: ${escapeHtml(selectedStatus.missing.join('، '))}`}
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div>
                      <label class="block mb-2 font-bold text-gray-700">تاريخ الإنتاج</label>
                      <input type="date" id="stickerProductionDate" value="${getTodayDateInputValue()}" oninput="updateProductionStickerPreview()" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                    </div>
                    <div>
                      <label class="block mb-2 font-bold text-gray-700">تاريخ الانتهاء</label>
                      <input type="date" id="stickerExpiryDate" value="${getDateInputValueAfterDays(7)}" oninput="updateProductionStickerPreview()" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                    </div>
                    <div>
                      <label class="block mb-2 font-bold text-gray-700">عدد الستيكرات</label>
                      <input type="text" id="stickerQuantity" value="1" oninput="this.value = convertToEnglishNumbers(this.value).replace(/\\D/g, ''); updateProductionStickerPreview();" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-center text-xl font-bold">
                    </div>
                  </div>

                  <div class="mt-6">
                    <div class="text-sm font-bold text-gray-700 mb-2">معاينة</div>
                    <div id="productionStickerPreview" class="flex justify-center bg-gray-100 border border-gray-200 rounded-lg p-4 overflow-auto"></div>
                  </div>

                  <button onclick="printProductionStickers()" class="w-full mt-5 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">طباعة الستيكرات</button>
                ` : `
                  <div class="text-center text-gray-500 py-10">اختر منتجاً أولاً</div>
                `}
              </div>
            </div>
          `}
        </div>
      `;
    }

    function startProductionStickerForm() {
      productionStickerFormOpen = true;
      productionStickerSearchTerm = '';
      productionStickerSelectedProductId = '';
      productionStickerCategoryPath = [];
      renderAccounting('productionStickers');
    }

    function selectProductionStickerProduct(productId) {
      productionStickerSelectedProductId = productId;
      renderAccounting('productionStickers');
      setTimeout(updateProductionStickerPreview, 50);
    }

    function getSelectedStickerPayload() {
      const product = allProducts.find(item => item.id === productionStickerSelectedProductId);
      if (!product) return null;
      const info = getProductInfoByProductId(product.id) || {};
      return {
        product,
        info,
        nameAr: product.nameAr || '',
        nameEn: product.nameEn || '',
        ingredients: info.ingredients || '',
        origin: info.origin || '',
        barcode: info.barcode || product.barcode || '',
        productionDate: document.getElementById('stickerProductionDate')?.value || getTodayDateInputValue(),
        expiryDate: document.getElementById('stickerExpiryDate')?.value || '',
        quantity: Math.max(1, parseInt(convertToEnglishNumbers(document.getElementById('stickerQuantity')?.value || '1'), 10) || 1)
      };
    }

    function updateProductionStickerPreview() {
      const preview = document.getElementById('productionStickerPreview');
      if (!preview) return;
      const payload = getSelectedStickerPayload();
      preview.innerHTML = payload ? buildProductionStickerHtml(payload) : '';
    }

    function escapeSvgText(value) {
      return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function buildCode39BarcodeSvg(value) {
      const patterns = {
        '0': 'nnnwwnwnn', '1': 'wnnwnnnnw', '2': 'nnwwnnnnw', '3': 'wnwwnnnnn',
        '4': 'nnnwwnnnw', '5': 'wnnwwnnnn', '6': 'nnwwwnnnn', '7': 'nnnwnnwnw',
        '8': 'wnnwnnwnn', '9': 'nnwwnnwnn', 'A': 'wnnnnwnnw', 'B': 'nnwnnwnnw',
        'C': 'wnwnnwnnn', 'D': 'nnnnwwnnw', 'E': 'wnnnwwnnn', 'F': 'nnwnwwnnn',
        'G': 'nnnnnwwnw', 'H': 'wnnnnwwnn', 'I': 'nnwnnwwnn', 'J': 'nnnnwwwnn',
        'K': 'wnnnnnnww', 'L': 'nnwnnnnww', 'M': 'wnwnnnnwn', 'N': 'nnnnwnnww',
        'O': 'wnnnwnnwn', 'P': 'nnwnwnnwn', 'Q': 'nnnnnnwww', 'R': 'wnnnnnwwn',
        'S': 'nnwnnnwwn', 'T': 'nnnnwnwwn', 'U': 'wwnnnnnnw', 'V': 'nwwnnnnnw',
        'W': 'wwwnnnnnn', 'X': 'nwnnwnnnw', 'Y': 'wwnnwnnnn', 'Z': 'nwwnwnnnn',
        '-': 'nwnnnnwnw', '.': 'wwnnnnwnn', ' ': 'nwwnnnwnn', '$': 'nwnwnwnnn',
        '/': 'nwnwnnnwn', '+': 'nwnnnwnwn', '%': 'nnnwnwnwn', '*': 'nwnnwnwnn'
      };
      const raw = String(value || '').toUpperCase().replace(/[^0-9A-Z\\-\\. \\$\\/\\+%]/g, '');
      const text = raw || '0';
      const encoded = `*${text}*`;
      const narrow = 1;
      const wide = 3;
      const gap = 1;
      let x = 0;
      let rects = '';
      for (const char of encoded) {
        const pattern = patterns[char] || patterns['0'];
        for (let i = 0; i < pattern.length; i++) {
          const width = pattern[i] === 'w' ? wide : narrow;
          if (i % 2 === 0) {
            rects += `<rect x="${x}" y="0" width="${width}" height="28" fill="#000"/>`;
          }
          x += width;
        }
        x += gap;
      }
      return `<svg class="sticker-barcode" viewBox="0 0 ${x} 28" preserveAspectRatio="none" aria-label="${escapeSvgText(text)}">${rects}</svg>`;
    }

    function buildCode39BarcodeSvgRects(value, targetX, targetY, targetWidth, targetHeight) {
      const patterns = {
        '0': 'nnnwwnwnn', '1': 'wnnwnnnnw', '2': 'nnwwnnnnw', '3': 'wnwwnnnnn',
        '4': 'nnnwwnnnw', '5': 'wnnwwnnnn', '6': 'nnwwwnnnn', '7': 'nnnwnnwnw',
        '8': 'wnnwnnwnn', '9': 'nnwwnnwnn', 'A': 'wnnnnwnnw', 'B': 'nnwnnwnnw',
        'C': 'wnwnnwnnn', 'D': 'nnnnwwnnw', 'E': 'wnnnwwnnn', 'F': 'nnwnwwnnn',
        'G': 'nnnnnwwnw', 'H': 'wnnnnwwnn', 'I': 'nnwnnwwnn', 'J': 'nnnnwwwnn',
        'K': 'wnnnnnnww', 'L': 'nnwnnnnww', 'M': 'wnwnnnnwn', 'N': 'nnnnwnnww',
        'O': 'wnnnwnnwn', 'P': 'nnwnwnnwn', 'Q': 'nnnnnnwww', 'R': 'wnnnnnwwn',
        'S': 'nnwnnnwwn', 'T': 'nnnnwnwwn', 'U': 'wwnnnnnnw', 'V': 'nwwnnnnnw',
        'W': 'wwwnnnnnn', 'X': 'nwnnwnnnw', 'Y': 'wwnnwnnnn', 'Z': 'nwwnwnnnn',
        '-': 'nwnnnnwnw', '.': 'wwnnnnwnn', ' ': 'nwwnnnwnn', '$': 'nwnwnwnnn',
        '/': 'nwnwnnnwn', '+': 'nwnnnwnwn', '%': 'nnnwnwnwn', '*': 'nwnnwnwnn'
      };
      const raw = String(value || '').toUpperCase().replace(/[^0-9A-Z\\-\\. \\$\\/\\+%]/g, '');
      const text = raw || '0';
      const encoded = `*${text}*`;
      const narrow = 1;
      const wide = 3;
      const gap = 1;
      let total = 0;

      for (const char of encoded) {
        const pattern = patterns[char] || patterns['0'];
        for (let i = 0; i < pattern.length; i++) total += pattern[i] === 'w' ? wide : narrow;
        total += gap;
      }

      const scale = targetWidth / total;
      let x = targetX;
      let rects = '';
      for (const char of encoded) {
        const pattern = patterns[char] || patterns['0'];
        for (let i = 0; i < pattern.length; i++) {
          const width = (pattern[i] === 'w' ? wide : narrow) * scale;
          if (i % 2 === 0) {
            rects += `<rect x="${x.toFixed(2)}" y="${targetY}" width="${Math.max(1, width).toFixed(2)}" height="${targetHeight}" fill="#000"/>`;
          }
          x += width;
        }
        x += gap * scale;
      }
      return rects;
    }

    function buildProductionStickerSvg(payload) {
      const barcodeRects = buildCode39BarcodeSvgRects(payload.barcode, 14, 162, 372, 24);
      const ingredients = `المكونات: ${payload.ingredients || '-'}`;
      const origin = `بلد المنشأ: ${payload.origin || '-'}`;
      const productionDate = `الإنتاج: ${formatStickerDate(payload.productionDate)}`;
      const expiryDate = `الانتهاء: ${formatStickerDate(payload.expiryDate)}`;

      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
          <rect width="400" height="200" fill="#fff"/>
          <text x="200" y="33" text-anchor="middle" direction="rtl" unicode-bidi="plaintext" font-family="Arial, Tahoma, sans-serif" font-size="27" font-weight="800">${escapeSvgText(payload.nameAr)}</text>
          <text x="200" y="53" text-anchor="middle" font-family="Arial, Tahoma, sans-serif" font-size="14" font-weight="700">${escapeSvgText(payload.nameEn || '')}</text>
          <text x="386" y="79" text-anchor="end" direction="rtl" unicode-bidi="plaintext" font-family="Arial, Tahoma, sans-serif" font-size="13" font-weight="700">${escapeSvgText(ingredients)}</text>
          <text x="386" y="107" text-anchor="end" direction="rtl" unicode-bidi="plaintext" font-family="Arial, Tahoma, sans-serif" font-size="17" font-weight="800">${escapeSvgText(origin)}</text>
          <text x="386" y="134" text-anchor="end" direction="rtl" unicode-bidi="plaintext" font-family="Arial, Tahoma, sans-serif" font-size="15" font-weight="800">${escapeSvgText(productionDate)}</text>
          <text x="14" y="154" text-anchor="start" font-family="Arial, Tahoma, sans-serif" font-size="15" font-weight="800">${escapeSvgText(expiryDate)}</text>
          ${barcodeRects}
          <text x="200" y="197" text-anchor="middle" font-family="Arial, Tahoma, sans-serif" font-size="10" font-weight="700">${escapeSvgText(payload.barcode || '')}</text>
        </svg>
      `;
    }

    function bytesToBase64(bytes) {
      let binary = '';
      const chunkSize = 0x8000;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
      }
      return btoa(binary);
    }

    function encodeProductionStickerEpl(payload) {
      return new Promise((resolve, reject) => {
        const width = 400;
        const height = 200;
        const bytesPerRow = Math.ceil(width / 8);
        const svg = buildProductionStickerSvg(payload);
        const image = new Image();
        image.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);

            const imageData = ctx.getImageData(0, 0, width, height).data;
            const bitmap = new Uint8Array(bytesPerRow * height);

            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const alpha = imageData[index + 3];
                const gray = alpha === 0 ? 255 : (imageData[index] * 0.299 + imageData[index + 1] * 0.587 + imageData[index + 2] * 0.114);
                if (gray < 170) {
                  bitmap[y * bytesPerRow + (x >> 3)] |= 0x80 >> (x & 7);
                }
              }
            }

            const header = new TextEncoder().encode(`N\nq${width}\nQ${height},24\nD10\nS2\nGW0,0,${bytesPerRow},${height},`);
            const footer = new TextEncoder().encode(`\nP${Math.max(1, payload.quantity || 1)}\n`);
            const output = new Uint8Array(header.length + bitmap.length + footer.length);
            output.set(header, 0);
            output.set(bitmap, header.length);
            output.set(footer, header.length + bitmap.length);
            resolve(bytesToBase64(output));
          } catch (error) {
            reject(error);
          }
        };
        image.onerror = () => reject(new Error('تعذر تجهيز صورة الستيكر'));
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      });
    }

    function buildProductionStickerHtml(payload) {
      const barcodeSvg = buildCode39BarcodeSvg(payload.barcode);
      return `
        <div class="production-sticker">
          <div class="sticker-names">
            <div class="sticker-name-ar">${escapeHtml(payload.nameAr)}</div>
            ${payload.nameEn ? `<div class="sticker-name-en">${escapeHtml(payload.nameEn)}</div>` : ''}
          </div>
          <div class="sticker-ingredients">المكونات: ${escapeHtml(payload.ingredients || '-')}</div>
          <div class="sticker-meta-row">
            <span>بلد المنشأ: ${escapeHtml(payload.origin || '-')}</span>
          </div>
          <div class="sticker-date-row">
            <span>الإنتاج: ${escapeHtml(formatStickerDate(payload.productionDate))}</span>
            <span>الانتهاء: ${escapeHtml(formatStickerDate(payload.expiryDate))}</span>
          </div>
          <div class="sticker-barcode-wrap">${barcodeSvg}</div>
          <div class="sticker-barcode-text">${escapeHtml(payload.barcode || '')}</div>
        </div>
      `;
    }

    function buildProductionStickerPrintStyles() {
      return `
        @page {
          size: 50mm 25mm;
          margin: 0;
        }
        html, body {
          margin: 0;
          padding: 0;
          background: white;
          direction: rtl;
          font-family: Arial, Tahoma, sans-serif;
          width: 50mm;
          height: 25mm;
          overflow: hidden;
        }
        .stickers-print-sheet {
          margin: 0;
          padding: 0;
          width: 50mm;
          height: 25mm;
          overflow: hidden;
          position: relative;
        }
        .production-sticker {
          width: 50mm;
          height: 25mm;
          box-sizing: border-box;
          padding: 0.8mm 1.2mm 0.5mm;
          overflow: hidden;
          page-break-after: always;
          break-after: page;
          background: white;
          color: #000;
          border-radius: 1.5mm;
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: flex-start;
          line-height: 1;
        }
        .production-sticker:last-child {
          page-break-after: auto;
          break-after: auto;
        }
        .sticker-names {
          text-align: center;
          line-height: 0.98;
          margin-bottom: 0.25mm;
          flex: 0 0 auto;
        }
        .sticker-name-ar {
          font-size: 7pt;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sticker-name-en {
          font-size: 4pt;
          font-weight: 700;
          direction: ltr;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sticker-ingredients {
          font-size: 3.7pt;
          font-weight: 700;
          line-height: 1.05;
          height: 4mm;
          overflow: hidden;
          text-align: right;
          flex: 0 0 auto;
        }
        .sticker-meta-row,
        .sticker-date-row {
          font-size: 3.8pt;
          font-weight: 800;
          line-height: 1;
          display: flex;
          justify-content: space-between;
          gap: 0.7mm;
          white-space: nowrap;
          flex: 0 0 auto;
        }
        .sticker-barcode-wrap {
          height: 4.6mm;
          margin-top: 0.15mm;
          direction: ltr;
          flex: 0 0 auto;
        }
        .sticker-barcode {
          display: block;
          width: 100%;
          height: 100%;
        }
        .sticker-barcode-text {
          direction: ltr;
          text-align: center;
          font-size: 3.4pt;
          font-weight: 700;
          line-height: 1;
          margin-top: 0;
          flex: 0 0 auto;
        }
        @media screen {
          body {
            padding: 12px;
            background: #f3f4f6;
          }
          .production-sticker {
            border: 1px solid #d1d5db;
            box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          }
        }
        @media print {
          html, body {
            width: 50mm !important;
            height: 25mm !important;
            overflow: hidden !important;
          }
          .stickers-print-sheet {
            width: 50mm !important;
            height: 25mm !important;
            overflow: hidden !important;
            position: relative !important;
          }
          .production-sticker {
            border: none;
            box-shadow: none;
            position: absolute !important;
            top: -6mm !important;
            left: 0 !important;
            transform: none !important;
          }
        }
      `;
    }

    async function printProductionStickers() {
      const payload = getSelectedStickerPayload();
      if (!payload) {
        showToast('اختر منتجاً أولاً', true);
        return;
      }
      if (!payload.productionDate || !payload.expiryDate) {
        showToast('يرجى تحديد تاريخ الإنتاج والانتهاء', true);
        return;
      }
      if (!payload.barcode) {
        showToast('لا يوجد باركود لهذا المنتج', true);
        return;
      }

      const status = getProductionStickerProductStatus(payload.product);
      if (!status.isComplete && !confirm(`معلومات المنتج غير مكتملة: ${status.missing.join('، ')}. هل تريد الطباعة؟`)) {
        return;
      }

      try {
        showToast('جاري تجهيز الستيكر للطابعة...');
        const dataBase64 = await encodeProductionStickerEpl(payload);
        const response = await fetch('http://127.0.0.1:17888/print', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataBase64 })
        });
        const result = await response.json();
        if (!response.ok || !result.ok) {
          throw new Error(result.error || 'تعذر إرسال الطباعة');
        }
        showToast(`تم إرسال ${payload.quantity} ستيكر للطابعة`);
      } catch (error) {
        console.error('Local Zebra print failed:', error);
        showToast('شغل برنامج الطباعة المحلي أولاً ثم حاول مرة ثانية', true);
      }
    }

    function getAdminVisibleProductRowIds() {
      return Array.from(document.querySelectorAll('.product-row'))
        .filter(row => row.style.display !== 'none')
        .map(row => row.getAttribute('data-product-id'))
        .filter(Boolean);
    }

    function updateAdminProductsSelectAllButton() {
      const button = document.getElementById('adminSelectAllProductsBtn');
      if (!button) return;

      const visibleIds = getAdminVisibleProductRowIds();
      const allVisibleSelected = visibleIds.length > 0 && visibleIds.every(productId => adminSelectedProductIds.includes(productId));
      button.textContent = allVisibleSelected ? 'إلغاء تحديد الكل' : 'تحديد الكل';
    }

    function filterProducts() {
      const searchInput = document.getElementById('productSearch');
      adminProductSearchTerm = searchInput ? searchInput.value : '';
      const searchTerm = normalizeText(adminProductSearchTerm);
      const rows = document.querySelectorAll('.product-row');
      let visibleCount = 0;
      
      rows.forEach(row => {
        const searchData = normalizeText(row.getAttribute('data-search'));
        const shouldShow = searchData.includes(searchTerm);
        row.style.display = shouldShow ? '' : 'none';
        if (shouldShow) visibleCount++;
      });

      const countElement = document.getElementById('adminProductsVisibleCount');
      if (countElement) countElement.textContent = visibleCount;

      const noResultsRow = document.getElementById('adminProductsNoSearchResults');
      if (noResultsRow) noResultsRow.style.display = visibleCount === 0 && rows.length > 0 ? '' : 'none';

      updateAdminProductsSelectAllButton();
    }

    function toggleAdminProductSelection(productId, isSelected) {
      if (isSelected) {
        if (!adminSelectedProductIds.includes(productId)) adminSelectedProductIds.push(productId);
      } else {
        adminSelectedProductIds = adminSelectedProductIds.filter(id => id !== productId);
      }

      pruneAdminProductSelectionToExistingProducts();
      renderAccounting('products');
    }

    function toggleSelectAllAdminVisibleProducts() {
      const visibleIds = getAdminVisibleProductRowIds();
      if (visibleIds.length === 0) {
        showToast('لا توجد منتجات معروضة للتحديد', true);
        return;
      }

      const allVisibleSelected = visibleIds.every(productId => adminSelectedProductIds.includes(productId));
      if (allVisibleSelected) {
        adminSelectedProductIds = adminSelectedProductIds.filter(productId => !visibleIds.includes(productId));
      } else {
        const selectedSet = new Set(adminSelectedProductIds);
        visibleIds.forEach(productId => selectedSet.add(productId));
        adminSelectedProductIds = Array.from(selectedSet);
      }

      renderAccounting('products');
    }

    function clearAdminProductSelection() {
      adminSelectedProductIds = [];
      renderAccounting('products');
    }

    function normalizeAdminNumberText(value) {
      const digitMap = {
        '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
        '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
        '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
        '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
      };

      const normalized = String(value || '')
        .replace(/[٠-٩۰-۹]/g, digit => digitMap[digit] || digit)
        .replace(/٫/g, '.')
        .replace(/٬/g, '')
        .replace(/,/g, '.')
        .replace(/[^\d.]/g, '');

      const parts = normalized.split('.');
      const integerPart = parts.shift() || '';
      return integerPart + (parts.length > 0 ? `.${parts.join('')}` : '');
    }

    function normalizeBulkPriceAmountInput(input) {
      input.value = normalizeAdminNumberText(input.value);
    }

    function parseAdminPriceAmount(value) {
      const amount = parseFloat(normalizeAdminNumberText(value));
      return isNaN(amount) ? NaN : amount;
    }

    function showBulkPriceEditModal() {
      const selectedProducts = getAdminSelectedProducts();
      if (selectedProducts.length === 0) {
        showToast('الرجاء تحديد منتج واحد على الأقل', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تعديل أسعار المنتجات المحددة</h2>
          <div class="space-y-4">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 font-bold text-blue-700">
              عدد المنتجات المحددة: ${selectedProducts.length}
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">نوع التعديل</label>
              <select id="bulkPriceAction" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <option value="increase">زيادة السعر</option>
                <option value="decrease">تخفيض السعر</option>
              </select>
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">قيمة التعديل</label>
              <input type="text" inputmode="decimal" id="bulkPriceAmount" oninput="normalizeBulkPriceAmountInput(this)" placeholder="0.500" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" dir="ltr">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="confirmBulkPriceUpdate()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">تطبيق</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function confirmBulkPriceUpdate() {
      const action = document.getElementById('bulkPriceAction').value;
      const amount = parseAdminPriceAmount(document.getElementById('bulkPriceAmount').value);
      const selectedProducts = getAdminSelectedProducts();

      if (selectedProducts.length === 0) {
        showToast('الرجاء تحديد منتج واحد على الأقل', true);
        return;
      }

      if (isNaN(amount) || amount <= 0) {
        showToast('الرجاء إدخال رقم صحيح أكبر من صفر', true);
        return;
      }

      const actionText = action === 'increase' ? 'زيادة' : 'تخفيض';
      const modal = document.querySelector('.modal-overlay');
      if (!modal) return;

      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-md text-center">
          <h2 class="text-2xl font-bold text-blue-600 mb-4">تأكيد تعديل الأسعار</h2>
          <p class="text-gray-700 mb-6">
            سيتم ${actionText} سعر ${selectedProducts.length} منتج بقيمة ${amount.toFixed(3)} د.ك.
            هل تريد المتابعة؟
          </p>
          <div class="flex gap-3">
            <button onclick="applyBulkPriceUpdate('${action}', ${amount})" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">تأكيد</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
    }

    async function applyBulkPriceUpdate(action, amount) {
      const selectedProducts = getAdminSelectedProducts();
      if (selectedProducts.length === 0) {
        showToast('الرجاء تحديد منتج واحد على الأقل', true);
        return;
      }

      const updates = {};
      const timestamp = Date.now();
      const changedPricesByProductId = {};
      let changedCount = 0;

      selectedProducts.forEach(product => {
        const currentPrice = parseFloat(product.price) || 0;
        const nextPrice = action === 'increase'
          ? currentPrice + amount
          : Math.max(0, currentPrice - amount);
        const roundedNextPrice = roundCurrencyValue(nextPrice);
        const changeEntry = createProductPriceChangeEntry(product, currentPrice, roundedNextPrice, 'bulk', timestamp);

        if (changeEntry) {
          updates[`products/${product.id}/price`] = roundedNextPrice;
          updates[`productPriceChanges/${changeEntry.id}`] = changeEntry;
          changedPricesByProductId[product.id] = roundedNextPrice;
          changedCount++;
        }
      });

      if (changedCount === 0) {
        showToast('لم تتغير الأسعار لأن القيم الحالية لا تسمح بهذا التعديل', true);
        return;
      }

      try {
        await db.ref().update(updates);
        selectedProducts.forEach(product => {
          if (changedPricesByProductId[product.id] !== undefined) {
            product.price = changedPricesByProductId[product.id];
          }
        });
        adminSelectedProductIds = [];

        const modal = document.querySelector('.modal-overlay');
        if (modal) modal.remove();

        renderAccounting('products');
        showToast(`تم ${action === 'increase' ? 'زيادة' : 'تخفيض'} أسعار ${changedCount} منتج بنجاح`);
      } catch (error) {
        console.error('Error updating bulk product prices:', error);
        showToast('حدث خطأ أثناء تعديل الأسعار', true);
      }
    }

    function confirmBulkDeleteProducts() {
      const selectedProducts = getAdminSelectedProducts();
      if (selectedProducts.length === 0) {
        showToast('الرجاء تحديد منتج واحد على الأقل', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-md text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد الحذف</h2>
          <p class="text-gray-700 mb-6">هل أنت متأكد من حذف ${selectedProducts.length} منتج؟</p>
          <div class="flex gap-3">
            <button onclick="deleteSelectedProductsConfirmed()" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteSelectedProductsConfirmed() {
      const selectedProducts = getAdminSelectedProducts();
      if (selectedProducts.length === 0) {
        showToast('الرجاء تحديد منتج واحد على الأقل', true);
        return;
      }

      const updates = {};
      selectedProducts.forEach(product => {
        updates[`products/${product.id}`] = null;
      });

      try {
        await db.ref().update(updates);
        const deletedIds = new Set(selectedProducts.map(product => product.id));
        allProducts = allProducts.filter(product => !deletedIds.has(product.id));
        adminSelectedProductIds = [];

        const modal = document.querySelector('.modal-overlay');
        if (modal) modal.remove();

        renderAccounting('products');
        showToast(`تم حذف ${selectedProducts.length} منتج بنجاح`);
      } catch (error) {
        console.error('Error deleting selected products:', error);
        showToast('حدث خطأ أثناء حذف المنتجات', true);
      }
    }

    function showImportExcelModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-2xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">📥 استيراد منتجات من Excel</h2>
          
          <div class="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
            <div class="font-bold text-blue-800 mb-2">📋 تعليمات تحضير ملف Excel:</div>
            <ol class="list-decimal list-inside text-sm text-blue-900 space-y-1">
              <li>يجب أن يحتوي الملف على 3 أعمدة فقط بنفس الترتيب</li>
              <li>العمود الأول: <strong>الاسم بالعربي</strong></li>
              <li>العمود الثاني: <strong>الاسم بالإنجليزي</strong></li>
              <li>العمود الثالث: <strong>السعر</strong> (بالدينار الكويتي)</li>
              <li>السطر الأول سيتم تجاهله (عناوين الأعمدة)</li>
              <li>يمكنك تحميل ملف نموذجي للمساعدة</li>
            </ol>
          </div>
          
          <div class="mb-6">
            <button onclick="downloadExcelTemplate()" class="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition mb-4">
              📥 تحميل ملف Excel نموذجي
            </button>
            
            <label class="block mb-2 font-bold text-gray-700">اختر ملف Excel</label>
            <input type="file" id="excelFileInput" accept=".xlsx,.xls,.csv" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
          </div>
          
          <div id="importPreview" class="hidden mb-6">
            <h3 class="font-bold text-gray-800 mb-2">معاينة المنتجات:</h3>
            <div class="max-h-64 overflow-y-auto border-2 border-gray-200 rounded-lg p-3 bg-gray-50">
              <div id="importPreviewContent"></div>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button id="importButton" onclick="processExcelImport()" disabled class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
              ✅ استيراد المنتجات
            </button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Add file change listener
      document.getElementById('excelFileInput').addEventListener('change', handleExcelFileSelect);
    }

    function downloadExcelTemplate() {
      // Create sample data
      const sampleData = [
        ['الاسم بالعربي', 'الاسم بالإنجليزي', 'السعر'],
        ['خبز تنور', 'Tanoor Bread', '0.250'],
        ['خبز صمون', 'Samoon Bread', '0.350'],
        ['كيك شوكولاتة', 'Chocolate Cake', '2.500'],
        ['معجنات زعتر', 'Zaatar Pastry', '0.500']
      ];
      
      // Convert to CSV
      let csv = '\uFEFF'; // UTF-8 BOM for Arabic support
      sampleData.forEach(row => {
        csv += row.join(',') + '\n';
      });
      
      // Download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'نموذج_استيراد_المنتجات.csv';
      link.click();
      
      showToast('تم تحميل الملف النموذجي بنجاح');
    }

    let importedProductsData = [];

    function handleExcelFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      
      reader.onload = function(e) {
        try {
          const text = e.target.result;
          const rows = text.split('\n').filter(row => row.trim() !== '');
          
          // Skip header row
          const dataRows = rows.slice(1);
          
          importedProductsData = [];
          let previewHTML = '';
          
          dataRows.forEach((row, index) => {
            // Handle both comma and tab separators
            let columns = row.split(',');
            if (columns.length < 3) {
              columns = row.split('\t');
            }
            
            if (columns.length >= 3) {
              const nameAr = columns[0].trim().replace(/^"|"$/g, '');
              const nameEn = columns[1].trim().replace(/^"|"$/g, '');
              const priceStr = columns[2].trim().replace(/^"|"$/g, '');
              const price = parseFloat(priceStr);
              
              if (nameAr && nameEn && !isNaN(price)) {
                importedProductsData.push({ nameAr, nameEn, price });
                previewHTML += `
                  <div class="flex justify-between py-2 border-b border-gray-200">
                    <div>
                      <span class="font-bold">${nameAr}</span> / 
                      <span class="text-gray-600">${nameEn}</span>
                    </div>
                    <div class="font-bold text-blue-600">${price.toFixed(3)} د.ك</div>
                  </div>
                `;
              }
            }
          });
          
          if (importedProductsData.length > 0) {
            document.getElementById('importPreview').classList.remove('hidden');
            document.getElementById('importPreviewContent').innerHTML = previewHTML;
            document.getElementById('importButton').disabled = false;
            showToast(`تم العثور على ${importedProductsData.length} منتج`);
          } else {
            showToast('لم يتم العثور على منتجات صالحة في الملف', true);
          }
          
        } catch (error) {
          console.error('Error reading file:', error);
          showToast('خطأ في قراءة الملف. تأكد من تنسيق الملف', true);
        }
      };
      
      reader.readAsText(file, 'UTF-8');
    }

    
    async function processExcelImport() {
      if (!parsedExcelData || parsedExcelData.length === 0) {
        showToast('لا يوجد بيانات للاستيراد', true);
        return;
      }
      
      try {
        // تحضير المنتجات من الأكسل
        const excelProducts = parsedExcelData.map((row, index) => ({
          id: `P${Date.now()}_${index}`,
          nameAr: row[0],
          nameEn: row[1],
          price: parseFloat(row[2]) || 0,
          unit: 'حبة'
        }));
        
        // جلب المنتجات الموجودة
        const productsRef = ref(database, `products/${currentBranch}`);
        const snapshot = await get(productsRef);
        const existingProducts = snapshot.exists() ? snapshot.val() : [];
        
        // التحقق من المنتجات المكررة
        const duplicates = [];
        const newProducts = [];
        
        excelProducts.forEach(excelProduct => {
          // التحقق من المنتج باستخدام الاسم العربي أو الإنجليزي
          const exists = existingProducts.some(p => {
            const nameArMatch = p.nameAr && excelProduct.nameAr && 
              p.nameAr.trim().toLowerCase() === excelProduct.nameAr.trim().toLowerCase();
            const nameEnMatch = p.nameEn && excelProduct.nameEn && 
              p.nameEn.trim().toLowerCase() === excelProduct.nameEn.trim().toLowerCase();
            return nameArMatch || nameEnMatch;
          });
          
          if (exists) {
            duplicates.push(excelProduct.nameAr);
          } else {
            newProducts.push(excelProduct);
          }
        });
        
        // عرض رسالة التأكيد
        if (duplicates.length > 0) {
          const duplicatesList = duplicates.slice(0, 10).join('\n');
          const moreText = duplicates.length > 10 ? `\n... و ${duplicates.length - 10} منتجات أخرى` : '';
          
          const confirmMsg = `⚠️ تنبيه: تم العثور على ${duplicates.length} منتج مكرر:\n\n${duplicatesList}${moreText}\n\n✅ سيتم إضافة ${newProducts.length} منتج جديد فقط.\n❌ سيتم تجاهل المنتجات المكررة.\n\nهل تريد المتابعة؟`;
          
          if (!confirm(confirmMsg)) {
            showToast('تم إلغاء الاستيراد', true);
            return;
          }
        } else if (newProducts.length > 0) {
          const confirmMsg = `✅ سيتم إضافة ${newProducts.length} منتج جديد.\n\nهل تريد المتابعة؟`;
          if (!confirm(confirmMsg)) {
            showToast('تم إلغاء الاستيراد', true);
            return;
          }
        }
        
        // إضافة المنتجات الجديدة فقط
        if (newProducts.length > 0) {
          await set(productsRef, [...existingProducts, ...newProducts]);
          
          allProducts = [...existingProducts, ...newProducts];
          renderProducts();
          
          document.querySelector('.modal-overlay').remove();
          
          const successMsg = duplicates.length > 0 ? 
            `✅ تم استيراد ${newProducts.length} منتج جديد\n⚠️ تم تجاهل ${duplicates.length} منتج مكرر` :
            `✅ تم استيراد ${newProducts.length} منتج بنجاح`;
          
          showToast(successMsg);
        } else {
          showToast('⚠️ لا يوجد منتجات جديدة للإضافة. جميع المنتجات موجودة بالفعل!', true);
        }
        
      } catch (error) {
        console.error('Import error:', error);
        showToast('حدث خطأ أثناء الاستيراد', true);
      }
    }

    function showAddProductModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة منتج جديد</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم بالعربي</label>
              <input type="text" id="newProductNameAr" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم بالإنجليزي</label>
              <input type="text" id="newProductNameEn" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">السعر</label>
              <input type="number" step="0.001" id="newProductPrice" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="addProduct()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">إضافة</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function addProduct() {
      const nameAr = document.getElementById('newProductNameAr').value.trim();
      const nameEn = document.getElementById('newProductNameEn').value.trim();
      const price = parseFloat(document.getElementById('newProductPrice').value);
      
      if (!nameAr || !nameEn || isNaN(price)) {
        showToast('الرجاء إدخال جميع البيانات المطلوبة', true);
        return;
      }
      
      const product = {
        nameAr,
        nameEn,
        price,
        categoryId: null
      };
      
      const success = await saveProduct(product);
      if (success) {
        showToast('تم إضافة المنتج بنجاح');
        document.querySelector('.modal-overlay').remove();
        renderAccounting('products');
      }
    }

    function editProduct(productId) {
      const product = allProducts.find(p => p.id === productId);
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تعديل المنتج</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم بالعربي</label>
              <input type="text" id="editProductNameAr" value="${product.nameAr}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم بالإنجليزي</label>
              <input type="text" id="editProductNameEn" value="${product.nameEn}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">السعر</label>
              <input type="number" step="0.001" id="editProductPrice" value="${product.price}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="saveEditedProduct('${productId}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function saveEditedProduct(productId) {
      const nameAr = document.getElementById('editProductNameAr').value.trim();
      const nameEn = document.getElementById('editProductNameEn').value.trim();
      const price = parseFloat(document.getElementById('editProductPrice').value);
      
      if (!nameAr || !nameEn || isNaN(price)) {
        showToast('الرجاء إدخال جميع البيانات المطلوبة', true);
        return;
      }
      
      const product = allProducts.find(p => p.id === productId);
      const oldPrice = parseFloat(product.price) || 0;
      product.nameAr = nameAr;
      product.nameEn = nameEn;
      product.price = price;
      
      const success = await saveProduct(product);
      if (success) {
        await recordProductPriceChange(product, oldPrice, price, 'manual');
        showToast('تم تعديل المنتج بنجاح');
        document.querySelector('.modal-overlay').remove();
        renderAccounting('products');
      }
    }

    function confirmDeleteProduct(productId) {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد الحذف</h2>
          <p class="text-gray-600 mb-6">هل أنت متأكد من حذف هذا المنتج؟</p>
          <div class="flex gap-3">
            <button onclick="deleteProductConfirmed('${productId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteProductConfirmed(productId) {
      const success = await deleteProduct(productId);
      if (success) {
        document.querySelector('.modal-overlay').remove();
        renderAccounting('products');
        showToast('تم حذف المنتج بنجاح');
      }
    }

    // Categories Section
    function renderCategoriesSection() {
      const rootCategories = allCategories.filter(c => !c.parentId);
      
      return `
        <div>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-blue-600">الأقسام</h2>
            <button onclick="showAddCategoryModal(null)" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة قسم</button>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <input type="text" id="categorySearch" placeholder="بحث..." oninput="filterCategories()" class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              ${rootCategories.map(category => {
                const productsCount = allProducts.filter(p => p.categoryId === category.id).length;
                const subCategoriesCount = allCategories.filter(c => c.parentId === category.id).length;
                return `
                  <div class="category-card category-search-card" data-search="${category.nameAr} ${category.nameEn}" onclick="viewCategory('${category.id}')">
                    <div class="text-5xl mb-4">📁</div>
                    <div class="text-xl font-bold mb-2">${category.nameAr}</div>
                    <div class="text-sm opacity-90 mb-4">${category.nameEn}</div>
                    <div class="pt-4 border-t border-white border-opacity-30">
                      <div class="text-sm">المنتجات: ${productsCount}</div>
                      <div class="text-sm">الأقسام الفرعية: ${subCategoriesCount}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }

    function filterCategories() {
      const searchTerm = document.getElementById('categorySearch').value.toLowerCase();
      const cards = document.querySelectorAll('.category-search-card');
      
      cards.forEach(card => {
        const searchData = card.getAttribute('data-search').toLowerCase();
        card.style.display = searchData.includes(searchTerm) ? '' : 'none';
      });
    }

    function viewCategory(categoryId) {
      const category = allCategories.find(c => c.id === categoryId);
if (!category) {
  showToast('الفئة غير موجودة', true);
  return;
}
      const subCategories = allCategories.filter(c => c.parentId === categoryId);
      const products = allProducts.filter(p => p.categoryId === categoryId);
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-5xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-blue-600">${category.nameAr}</h2>
            <button onclick="this.closest('.modal-overlay').remove()" class="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition">✕</button>
          </div>
          
          <div class="flex gap-3 mb-6">
            <button onclick="showAddProductToCategoryModal('${categoryId}')" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition">إضافة منتج</button>
            <button onclick="showAddCategoryModal('${categoryId}')" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition">إضافة قسم فرعي</button>
            <button onclick="editCategory('${categoryId}')" class="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition">تعديل</button>
            <button onclick="confirmDeleteCategory('${categoryId}')" class="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition">حذف</button>
          </div>
          
          ${subCategories.length > 0 ? `
            <h3 class="text-xl font-bold mb-4">الأقسام الفرعية</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              ${subCategories.map(subCat => `
                <div class="category-card cursor-pointer" onclick="this.closest('.modal-overlay').remove(); viewCategory('${subCat.id}')">
                  <div class="text-3xl mb-2">📁</div>
                  <div class="font-bold">${subCat.nameAr}</div>
                  <div class="text-sm opacity-80">${subCat.nameEn}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          <h3 class="text-xl font-bold mb-4">المنتجات</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            ${products.map(prod => `
              <div class="product-card">
                <div class="text-3xl mb-2">📦</div>
                <div class="font-bold mb-1">${prod.nameAr}</div>
                <div class="text-blue-600 font-bold">${prod.price.toFixed(3)} د.ك</div>
                <button onclick="removeProductFromCategory('${prod.id}', '${categoryId}')" class="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">إزالة</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function showAddCategoryModal(parentId) {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">${parentId ? 'إضافة قسم فرعي' : 'إضافة قسم جديد'}</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم بالعربي</label>
              <input type="text" id="newCategoryNameAr" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم بالإنجليزي</label>
              <input type="text" id="newCategoryNameEn" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="addCategory('${parentId || ''}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">إضافة</button>
            <button onclick="this.closest('.modal-overlay').remove(); ${parentId ? `viewCategory('${parentId}')` : `renderAccounting('categories')`}" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function addCategory(parentId) {
      const nameAr = document.getElementById('newCategoryNameAr').value.trim();
      const nameEn = document.getElementById('newCategoryNameEn').value.trim();
      
      if (!nameAr || !nameEn) {
        showToast('الرجاء إدخال اسم القسم بالعربي والإنجليزي', true);
        return;
      }
      
      const category = {
        nameAr,
        nameEn,
        parentId: parentId || null
      };
      
      const success = await saveCategory(category);
      if (success) {
        showToast('تم إضافة القسم بنجاح');
        document.querySelector('.modal-overlay').remove();
        if (parentId) {
          viewCategory(parentId);
        } else {
          renderAccounting('categories');
        }
      }
    }

    function editCategory(categoryId) {
      const category = allCategories.find(c => c.id === categoryId);
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تعديل القسم</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم بالعربي</label>
              <input type="text" id="editCategoryNameAr" value="${category.nameAr}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم بالإنجليزي</label>
              <input type="text" id="editCategoryNameEn" value="${category.nameEn}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="saveEditedCategory('${categoryId}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ</button>
            <button onclick="this.closest('.modal-overlay').remove(); viewCategory('${categoryId}');" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function saveEditedCategory(categoryId) {
      const nameAr = document.getElementById('editCategoryNameAr').value.trim();
      const nameEn = document.getElementById('editCategoryNameEn').value.trim();
      
      if (!nameAr || !nameEn) {
        showToast('الرجاء إدخال اسم القسم بالعربي والإنجليزي', true);
        return;
      }
      
      const category = allCategories.find(c => c.id === categoryId);
      category.nameAr = nameAr;
      category.nameEn = nameEn;
      
      const success = await saveCategory(category);
      if (success) {
        showToast('تم تعديل القسم بنجاح');
        document.querySelector('.modal-overlay').remove();
        viewCategory(categoryId);
      }
    }

    function confirmDeleteCategory(categoryId) {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد الحذف</h2>
          <p class="text-gray-600 mb-6">هل أنت متأكد من حذف هذا القسم؟</p>
          <div class="flex gap-3">
            <button onclick="deleteCategoryConfirmed('${categoryId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove(); viewCategory('${categoryId}');" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteCategoryConfirmed(categoryId) {
      const success = await deleteCategory(categoryId);
      if (success) {
        document.querySelector('.modal-overlay').remove();
        renderAccounting('categories');
        showToast('تم حذف القسم بنجاح');
      }
    }

    function showAddProductToCategoryModal(categoryId) {
  selectedProductsForCategory = [];
  const availableProducts = allProducts.filter(p => !p.categoryId || p.categoryId === null);
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content p-8 w-full max-w-4xl">
      <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة منتجات للقسم</h2>
      <input type="text" id="addProductSearch" placeholder="🔍 بحث عن منتج..." oninput="filterAddProducts()" class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
      
      <div class="bg-blue-50 p-3 rounded-lg mb-4" id="selectedCountBadge" style="display: none;">
        <span class="font-bold text-blue-600" id="selectedCount">0</span> منتج محدد
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto" id="productsGridForCategory">
        ${availableProducts.map(prod => `
          <div class="product-card add-product-card border-2" data-search="${prod.nameAr} ${prod.nameEn}" data-product-id="${prod.id}" onclick="toggleProductSelection('${prod.id}', '${categoryId}')" style="border-color: #e5e7eb;">
            <div class="text-3xl mb-2">📦</div>
            <div class="font-bold mb-1">${prod.nameAr}</div>
            <div class="text-blue-600 font-bold">${prod.price.toFixed(3)} د.ك</div>
          </div>
        `).join('')}
      </div>
      
      <div class="flex gap-3 mt-6">
        <button id="addSelectedBtn" onclick="addSelectedProductsToCategory('${categoryId}')" disabled class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">إضافة المنتجات المحددة</button>
        <button onclick="this.closest('.modal-overlay').remove(); viewCategory('${categoryId}');" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

    function filterAddProducts() {
  const searchTerm = document.getElementById('addProductSearch').value.toLowerCase();
  const cards = document.querySelectorAll('.add-product-card');
  
  cards.forEach(card => {
    const searchData = card.getAttribute('data-search').toLowerCase();
    if (searchData.includes(searchTerm)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function toggleProductSelection(productId, categoryId) {
  const card = document.querySelector(`[data-product-id="${productId}"]`);
  
  if (selectedProductsForCategory.includes(productId)) {
    // إلغاء التحديد
    selectedProductsForCategory = selectedProductsForCategory.filter(id => id !== productId);
    card.style.borderColor = '#e5e7eb';
    card.style.backgroundColor = 'white';
  } else {
    // تحديد المنتج
    selectedProductsForCategory.push(productId);
    card.style.borderColor = '#3b82f6';
    card.style.backgroundColor = '#dbeafe';
  }
  
  // تحديث عداد المنتجات المحددة
  document.getElementById('selectedCount').textContent = selectedProductsForCategory.length;
  const badge = document.getElementById('selectedCountBadge');
  const addBtn = document.getElementById('addSelectedBtn');
  
  if (selectedProductsForCategory.length > 0) {
    badge.style.display = '';
    addBtn.disabled = false;
  } else {
    badge.style.display = 'none';
    addBtn.disabled = true;
  }
}

    async function addSelectedProductsToCategory(categoryId) {
  if (selectedProductsForCategory.length === 0) {
    showToast('الرجاء تحديد منتج واحد على الأقل', true);
    return;
  }
  
  const addBtn = document.getElementById('addSelectedBtn');
  addBtn.disabled = true;
  addBtn.textContent = 'جاري الإضافة...';
  
  let successCount = 0;
  
  for (const productId of selectedProductsForCategory) {
    const product = allProducts.find(p => p.id === productId);
    product.categoryId = categoryId;
    
    const success = await saveProduct(product);
    if (success) {
      successCount++;
    }
  }
  
  showToast(`تم إضافة ${successCount} منتج للقسم بنجاح`);
  document.querySelector('.modal-overlay').remove();
  viewCategory(categoryId);
}

    async function removeProductFromCategory(productId, categoryId) {
  const product = allProducts.find(p => p.id === productId);
  product.categoryId = null;
  
  const success = await saveProduct(product);
  if (success) {
    showToast('تم إزالة المنتج من القسم');
    viewCategory(categoryId);
  }
}

    // Inventory Tracking Section
    function renderInventorySection() {
      inventoryProductsBranchFilter = 'all';
      inventoryCategoryBranchFilter = 'all';
      return `
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold text-blue-600 mb-6">متابعة المخزون</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onclick="renderAccounting('inventoryProducts')" class="bg-white border-2 border-blue-300 rounded-xl p-8 text-right shadow hover:shadow-lg transition hover:border-blue-500">
              <div class="text-3xl mb-3">📦</div>
              <div class="text-2xl font-bold text-blue-700">منتجات المخزون</div>
            </button>
            <button onclick="renderAccounting('inventoryCategories')" class="bg-white border-2 border-blue-300 rounded-xl p-8 text-right shadow hover:shadow-lg transition hover:border-blue-500">
              <div class="text-3xl mb-3">📁</div>
              <div class="text-2xl font-bold text-blue-700">تصنيفات المخزون</div>
            </button>
          </div>
        </div>
      `;
    }

    function setInventoryProductSearchTerm(value) {
      inventoryProductSearchTerm = value;
      renderAccounting('inventoryProducts');
    }

    function setInventoryProductsBranchFilter(value) {
      inventoryProductsBranchFilter = value;
      renderAccounting('inventoryProducts');
    }

    function renderInventoryProductsQuantityCell(product) {
      if (inventoryProductsBranchFilter === 'all') {
        return getInventoryQuantityByFilterText(product, 'all');
      }

      const branchId = inventoryProductsBranchFilter || 'main';
      return `
        <input
          type="text"
          value="${getInventoryQuantityText(product, branchId)}"
          placeholder="أدخل الكمية"
          oninput="this.value = normalizeDecimalInput(this.value)"
          onblur="saveInventoryProductQuantity('${product.id}', this.value, '${branchId}')"
          class="w-32 p-2 border-2 border-gray-300 rounded-lg text-center focus:border-blue-600 focus:outline-none"
        >
      `;
    }

    function renderInventoryProductsSection() {
      const trackedProducts = getTrackedInventoryProducts().filter(product => {
        const searchText = `${product.nameAr || ''} ${product.nameEn || ''}`.toLowerCase();
        return searchText.includes((inventoryProductSearchTerm || '').toLowerCase());
      });
      const branchQuantityHeader = inventoryProductsBranchFilter === 'all'
        ? 'كل الفروع'
        : getInventoryBranchName(inventoryProductsBranchFilter || 'main');

      return `
        <div>
          <div class="flex flex-wrap gap-3 justify-between items-center mb-6">
            <div class="flex gap-3">
              <button onclick="renderAccounting('inventory')" class="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg font-bold hover:bg-gray-300 transition">رجوع</button>
              <button onclick="showAddProductsToInventoryModal()" class="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة منتجات</button>
            </div>
            <h2 class="text-3xl font-bold text-blue-600">منتجات المخزون</h2>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input type="text" value="${inventoryProductSearchTerm || ''}" oninput="setInventoryProductSearchTerm(this.value)" placeholder="🔍 بحث عن منتج..." class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              <select onchange="setInventoryProductsBranchFilter(this.value)" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                ${getInventoryBranchOptionsHtml(inventoryProductsBranchFilter, true, true)}
              </select>
            </div>
            <p class="text-xs text-gray-500 mb-4">
              ${inventoryProductsBranchFilter === 'all'
                ? 'اختر فرعًا محددًا لتعديل الكميات.'
                : `الكميات المعدلة هنا تُحفظ للفرع المحدد: ${getInventoryBranchName(inventoryProductsBranchFilter)}.`}
            </p>
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>اسم المنتج بالعربي</th>
                    <th>اسم المنتج بالإنجليزي</th>
                    <th>السعر</th>
                    <th>الكمية (${branchQuantityHeader})</th>
                    <th>الوحدة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  ${trackedProducts.length > 0 ? trackedProducts.map(product => `
                    <tr>
                      <td>${product.nameAr || ''}</td>
                      <td>${product.nameEn || ''}</td>
                      <td>${(parseFloat(product.price) || 0).toFixed(3)} د.ك</td>
                      <td>${renderInventoryProductsQuantityCell(product)}</td>
                      <td>
                        <select onchange="handleInventoryUnitChange('${product.id}', this.value)" class="p-2 border-2 border-gray-300 rounded-lg w-52 focus:border-blue-600 focus:outline-none">
                          <option value="">-- اختر --</option>
                          ${allInventoryUnits.map(unit => `
                            <option value="${unit.id}" ${product.inventoryUnitId === unit.id ? 'selected' : ''}>${unit.nameAr || ''}${unit.nameEn ? ` / ${unit.nameEn}` : ''}</option>
                          `).join('')}
                          <option value="__add_new__">➕ إضافة وحدة جديدة</option>
                          <option value="__edit_selected__">✏️ تعديل الوحدة المحددة</option>
                          <option value="__delete_selected__">🗑️ حذف الوحدة المحددة</option>
                        </select>
                      </td>
                      <td>
                        <div class="flex gap-2">
                          <button onclick="editProduct('${product.id}')" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">تعديل</button>
                          <button onclick="confirmRemoveProductFromInventory('${product.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">حذف</button>
                        </div>
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="6" class="text-center text-gray-500 py-8">لا توجد منتجات في متابعة المخزون</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    async function saveInventoryProductQuantity(productId, value, branchId = 'main') {
      const product = allProducts.find(item => item.id === productId);
      if (!product) return;

      const allowedBranches = new Set(INVENTORY_BRANCHES.map(branch => branch.id));
      const targetBranchId = allowedBranches.has(branchId) ? branchId : 'main';
      const normalized = normalizeDecimalInput(value);
      const quantity = normalized === '' ? (targetBranchId === 'main' ? null : 0) : parseFloat(normalized);
      if (quantity !== null && isNaN(quantity)) return;
      const branchQuantities = ensureInventoryBranchQuantities(product);
      const nextBranchQuantities = {};
      INVENTORY_BRANCHES.forEach(branch => {
        nextBranchQuantities[branch.id] = branch.id === targetBranchId ? quantity : branchQuantities[branch.id];
      });
      product.inventoryBranchQuantities = nextBranchQuantities;

      const mainQuantityForLegacy = product.inventoryBranchQuantities.main;
      product.inventoryQuantity = mainQuantityForLegacy;
      product.stock = mainQuantityForLegacy;
      await saveProduct(product);
    }

    async function handleInventoryUnitChange(productId, unitId) {
      const product = allProducts.find(item => item.id === productId);
      if (!product) return;

      if (unitId === '__add_new__') {
        showAddInventoryUnitModal(productId);
        return;
      }
      if (unitId === '__edit_selected__') {
        if (!product.inventoryUnitId) {
          showToast('اختر وحدة أولاً ثم أعد المحاولة', true);
          renderAccounting('inventoryProducts');
          return;
        }
        showEditInventoryUnitModal(product.inventoryUnitId);
        return;
      }
      if (unitId === '__delete_selected__') {
        if (!product.inventoryUnitId) {
          showToast('اختر وحدة أولاً ثم أعد المحاولة', true);
          renderAccounting('inventoryProducts');
          return;
        }
        confirmDeleteInventoryUnit(product.inventoryUnitId);
        return;
      }

      product.inventoryUnitId = unitId || null;
      const selectedUnit = allInventoryUnits.find(unit => unit.id === unitId);
      product.unit = selectedUnit ? (selectedUnit.nameAr || selectedUnit.nameEn || '') : '';
      await saveProduct(product);
    }

    function showAddInventoryUnitModal(productId = '') {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة وحدة جديدة</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">اسم الوحدة بالعربي</label>
              <input type="text" id="newInventoryUnitAr" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">اسم الوحدة بالإنجليزي</label>
              <input type="text" id="newInventoryUnitEn" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="addInventoryUnit('${productId}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">إضافة</button>
            <button onclick="this.closest('.modal-overlay').remove(); renderAccounting(currentAccountingSection);" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function addInventoryUnit(productId = '') {
      const nameAr = document.getElementById('newInventoryUnitAr').value.trim();
      const nameEn = document.getElementById('newInventoryUnitEn').value.trim();

      if (!nameAr || !nameEn) {
        showToast('الرجاء إدخال اسم الوحدة بالعربي والإنجليزي', true);
        return;
      }

      const result = await saveInventoryUnit({ nameAr, nameEn });
      if (!result.success) return;

      if (productId) {
        const product = allProducts.find(item => item.id === productId);
        if (product) {
          product.inventoryUnitId = result.id;
          product.unit = nameAr;
          await saveProduct(product);
        }
      }

      document.querySelector('.modal-overlay')?.remove();
      showToast('تم إضافة الوحدة بنجاح');
      renderAccounting(currentAccountingSection);
    }

    function showEditInventoryUnitModal(unitId) {
      const unit = allInventoryUnits.find(item => item.id === unitId);
      if (!unit) {
        showToast('الوحدة غير موجودة', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تعديل الوحدة</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">اسم الوحدة بالعربي</label>
              <input type="text" id="editInventoryUnitAr" value="${unit.nameAr || ''}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">اسم الوحدة بالإنجليزي</label>
              <input type="text" id="editInventoryUnitEn" value="${unit.nameEn || ''}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="saveEditedInventoryUnit('${unitId}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ</button>
            <button onclick="this.closest('.modal-overlay').remove(); renderAccounting(currentAccountingSection);" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function saveEditedInventoryUnit(unitId) {
      const nameAr = document.getElementById('editInventoryUnitAr').value.trim();
      const nameEn = document.getElementById('editInventoryUnitEn').value.trim();

      if (!nameAr || !nameEn) {
        showToast('الرجاء إدخال اسم الوحدة بالعربي والإنجليزي', true);
        return;
      }

      try {
        const updates = {
          [`inventoryUnits/${unitId}/nameAr`]: nameAr,
          [`inventoryUnits/${unitId}/nameEn`]: nameEn
        };

        allProducts
          .filter(product => product.inventoryUnitId === unitId)
          .forEach(product => {
            updates[`products/${product.id}/unit`] = nameAr;
          });

        await db.ref().update(updates);
        await loadData();
        document.querySelector('.modal-overlay')?.remove();
        showToast('تم تعديل الوحدة بنجاح');
        renderAccounting(currentAccountingSection);
      } catch (error) {
        console.error('Error editing inventory unit:', error);
        showToast('خطأ في تعديل الوحدة', true);
      }
    }

    function confirmDeleteInventoryUnit(unitId) {
      const unit = allInventoryUnits.find(item => item.id === unitId);
      if (!unit) {
        showToast('الوحدة غير موجودة', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد حذف الوحدة</h2>
          <p class="text-gray-600 mb-6">هل تريد حذف الوحدة "${unit.nameAr || ''}"؟</p>
          <div class="flex gap-3">
            <button onclick="deleteInventoryUnitConfirmed('${unitId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove(); renderAccounting(currentAccountingSection);" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteInventoryUnitConfirmed(unitId) {
      try {
        const updates = {
          [`inventoryUnits/${unitId}`]: null
        };

        allProducts
          .filter(product => product.inventoryUnitId === unitId)
          .forEach(product => {
            updates[`products/${product.id}/inventoryUnitId`] = null;
            updates[`products/${product.id}/unit`] = '';
          });

        await db.ref().update(updates);
        await loadData();
        document.querySelector('.modal-overlay')?.remove();
        showToast('تم حذف الوحدة');
        renderAccounting(currentAccountingSection);
      } catch (error) {
        console.error('Error deleting inventory unit:', error);
        showToast('خطأ في حذف الوحدة', true);
      }
    }

    function confirmRemoveProductFromInventory(productId) {
      const product = allProducts.find(item => item.id === productId);
      if (!product) {
        showToast('المنتج غير موجود', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد حذف المنتج من المخزون</h2>
          <p class="text-gray-600 mb-6">سيتم إزالة "${product.nameAr || ''}" من متابعة المخزون ومن جميع التصنيفات المرتبطة.</p>
          <div class="flex gap-3">
            <button onclick="removeProductFromInventoryConfirmed('${productId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function removeProductFromInventoryConfirmed(productId) {
      const product = allProducts.find(item => item.id === productId);
      if (!product) return;

      try {
        const updates = {
          [`products/${productId}/inventoryEnabled`]: false,
          [`products/${productId}/inventoryQuantity`]: null,
          [`products/${productId}/stock`]: null,
          [`products/${productId}/inventoryBranchQuantities`]: null,
          [`products/${productId}/inventoryUnitId`]: null,
          [`products/${productId}/unit`]: ''
        };

        allInventoryCategories.forEach(category => {
          const ids = Array.isArray(category.productIds) ? category.productIds : [];
          if (ids.includes(productId)) {
            updates[`inventoryCategories/${category.id}/productIds`] = ids.filter(id => id !== productId);
          }
        });

        await db.ref().update(updates);
        await loadData();
        document.querySelector('.modal-overlay')?.remove();
        showToast('تم حذف المنتج من متابعة المخزون');
        renderAccounting('inventoryProducts');
      } catch (error) {
        console.error('Error removing product from inventory:', error);
        showToast('خطأ في حذف المنتج من متابعة المخزون', true);
      }
    }

    function showAddProductsToInventoryModal() {
      selectedProductsForInventory = [];
      const availableProducts = allProducts.filter(product => !product.inventoryEnabled);
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-4xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة منتجات للمخزون</h2>
          <input type="text" id="inventoryProductsSearch" oninput="filterAddInventoryProducts()" placeholder="🔍 بحث عن منتج..." class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
          <div id="inventoryProductsCountBadge" class="bg-blue-50 p-3 rounded-lg mb-4 hidden">
            <span id="inventoryProductsCount" class="font-bold text-blue-700">0</span> منتج محدد
          </div>
          <div id="inventoryProductsGrid" class="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            ${availableProducts.map(product => `
              <div class="product-card inventory-product-card border-2" data-product-id="${product.id}" data-search="${product.nameAr || ''} ${product.nameEn || ''}" onclick="toggleInventoryProductSelection('${product.id}')">
                <div class="text-3xl mb-2">📦</div>
                <div class="font-bold mb-1">${product.nameAr || ''}</div>
                <div class="text-blue-600 font-bold">${(parseFloat(product.price) || 0).toFixed(3)} د.ك</div>
              </div>
            `).join('')}
          </div>
          <div class="flex gap-3 mt-6">
            <button id="addInventoryProductsBtn" onclick="confirmAddProductsToInventory()" disabled class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">إضافة المنتجات المحددة</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function filterAddInventoryProducts() {
      const searchTerm = (document.getElementById('inventoryProductsSearch')?.value || '').toLowerCase();
      document.querySelectorAll('.inventory-product-card').forEach(card => {
        const data = (card.getAttribute('data-search') || '').toLowerCase();
        card.style.display = data.includes(searchTerm) ? '' : 'none';
      });
    }

    function toggleInventoryProductSelection(productId) {
      const card = document.querySelector(`.inventory-product-card[data-product-id="${productId}"]`);
      if (!card) return;

      if (selectedProductsForInventory.includes(productId)) {
        selectedProductsForInventory = selectedProductsForInventory.filter(id => id !== productId);
        card.style.borderColor = '#e5e7eb';
        card.style.backgroundColor = 'white';
      } else {
        selectedProductsForInventory.push(productId);
        card.style.borderColor = '#3b82f6';
        card.style.backgroundColor = '#dbeafe';
      }

      const countBadge = document.getElementById('inventoryProductsCountBadge');
      const countValue = document.getElementById('inventoryProductsCount');
      const addBtn = document.getElementById('addInventoryProductsBtn');
      if (countValue) countValue.textContent = String(selectedProductsForInventory.length);
      if (addBtn) addBtn.disabled = selectedProductsForInventory.length === 0;
      if (countBadge) {
        if (selectedProductsForInventory.length > 0) countBadge.classList.remove('hidden');
        else countBadge.classList.add('hidden');
      }
    }

    async function confirmAddProductsToInventory() {
      if (selectedProductsForInventory.length === 0) {
        showToast('الرجاء اختيار منتج واحد على الأقل', true);
        return;
      }

      for (const productId of selectedProductsForInventory) {
        const product = allProducts.find(item => item.id === productId);
        if (!product) continue;
        product.inventoryEnabled = true;
        product.inventoryQuantity = null;
        product.stock = null;
        const branchQuantities = {};
        INVENTORY_BRANCHES.forEach(branch => {
          branchQuantities[branch.id] = branch.id === 'main' ? null : 0;
        });
        product.inventoryBranchQuantities = branchQuantities;
        product.inventoryUnitId = null;
        product.unit = '';
        await saveProduct(product);
      }

      document.querySelector('.modal-overlay')?.remove();
      showToast('تمت إضافة المنتجات إلى متابعة المخزون');
      renderAccounting('inventoryProducts');
    }

    function setInventoryCategorySearchTerm(value) {
      inventoryCategorySearchTerm = value;
      renderAccounting('inventoryCategories');
    }

    function renderInventoryCategoriesSection() {
      const filteredCategories = allInventoryCategories.filter(category => {
        const searchText = `${category.nameAr || ''} ${category.nameEn || ''}`.toLowerCase();
        return searchText.includes((inventoryCategorySearchTerm || '').toLowerCase());
      });

      return `
        <div>
          <div class="flex flex-wrap gap-3 justify-between items-center mb-6">
            <div class="flex gap-3">
              <button onclick="renderAccounting('inventory')" class="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg font-bold hover:bg-gray-300 transition">رجوع</button>
              <button onclick="showInventoryCategoryModal()" class="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة تصنيف جديد</button>
            </div>
            <h2 class="text-3xl font-bold text-blue-600">تصنيفات المخزون</h2>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <input type="text" value="${inventoryCategorySearchTerm || ''}" oninput="setInventoryCategorySearchTerm(this.value)" placeholder="🔍 بحث عن تصنيف..." class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>اسم التصنيف</th>
                    <th>عدد المنتجات</th>
                    <th>تعديل</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  ${filteredCategories.length > 0 ? filteredCategories.map(category => {
                    const productsCount = Array.isArray(category.productIds) ? category.productIds.length : 0;
                    return `
                      <tr class="cursor-pointer" onclick="openInventoryCategory('${category.id}')">
                        <td>${category.nameAr || ''}${category.nameEn ? ` / ${category.nameEn}` : ''}</td>
                        <td>${productsCount}</td>
                        <td>
                          <button onclick="event.stopPropagation(); showInventoryCategoryModal('${category.id}')" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">تعديل</button>
                        </td>
                        <td>
                          <button onclick="event.stopPropagation(); confirmDeleteInventoryCategory('${category.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">حذف</button>
                        </td>
                      </tr>
                    `;
                  }).join('') : `
                    <tr>
                      <td colspan="4" class="text-center text-gray-500 py-8">لا توجد تصنيفات مخزون</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    function showInventoryCategoryModal(categoryId = '') {
      const category = categoryId ? allInventoryCategories.find(item => item.id === categoryId) : null;
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">${category ? 'تعديل تصنيف المخزون' : 'إضافة تصنيف مخزون'}</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">اسم التصنيف بالعربي</label>
              <input type="text" id="inventoryCategoryNameAr" value="${category?.nameAr || ''}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">اسم التصنيف بالإنجليزي</label>
              <input type="text" id="inventoryCategoryNameEn" value="${category?.nameEn || ''}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="saveInventoryCategoryFromModal('${categoryId}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">${category ? 'حفظ' : 'إضافة'}</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function saveInventoryCategoryFromModal(categoryId = '') {
      const nameAr = document.getElementById('inventoryCategoryNameAr').value.trim();
      const nameEn = document.getElementById('inventoryCategoryNameEn').value.trim();

      if (!nameAr || !nameEn) {
        showToast('الرجاء إدخال الاسم بالعربي والإنجليزي', true);
        return;
      }

      const existing = categoryId ? allInventoryCategories.find(item => item.id === categoryId) : null;
      const success = await saveInventoryCategory({
        id: categoryId || undefined,
        nameAr,
        nameEn,
        productIds: existing?.productIds || []
      });

      if (!success) return;
      document.querySelector('.modal-overlay')?.remove();
      showToast(categoryId ? 'تم تعديل التصنيف بنجاح' : 'تم إضافة التصنيف بنجاح');
      renderAccounting('inventoryCategories');
    }

    function confirmDeleteInventoryCategory(categoryId) {
      const category = allInventoryCategories.find(item => item.id === categoryId);
      if (!category) {
        showToast('التصنيف غير موجود', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد حذف التصنيف</h2>
          <p class="text-gray-600 mb-6">هل تريد حذف التصنيف "${category.nameAr || ''}"؟</p>
          <div class="flex gap-3">
            <button onclick="deleteInventoryCategoryConfirmed('${categoryId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteInventoryCategoryConfirmed(categoryId) {
      try {
        await db.ref(`inventoryCategories/${categoryId}`).remove();
        await loadData();
        document.querySelector('.modal-overlay')?.remove();
        if (selectedInventoryCategoryId === categoryId) {
          selectedInventoryCategoryId = '';
        }
        showToast('تم حذف التصنيف');
        renderAccounting('inventoryCategories');
      } catch (error) {
        console.error('Error deleting inventory category:', error);
        showToast('خطأ في حذف التصنيف', true);
      }
    }

    function openInventoryCategory(categoryId) {
      selectedInventoryCategoryId = categoryId;
      inventoryCategoryProductsSearchTerm = '';
      inventoryCategoryBranchFilter = 'all';
      renderAccounting('inventoryCategoryDetails');
    }

    function setInventoryCategoryProductsSearchTerm(value) {
      inventoryCategoryProductsSearchTerm = value;
      renderAccounting('inventoryCategoryDetails');
    }

    function setInventoryCategoryBranchFilter(value) {
      inventoryCategoryBranchFilter = value;
      renderAccounting('inventoryCategoryDetails');
    }

    function renderInventoryCategoryDetailsSection() {
      const category = allInventoryCategories.find(item => item.id === selectedInventoryCategoryId);
      if (!category) {
        return `
          <div class="text-center py-10">
            <p class="text-gray-600 mb-4">التصنيف غير موجود</p>
            <button onclick="renderAccounting('inventoryCategories')" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">رجوع</button>
          </div>
        `;
      }

      const categoryProductIds = new Set(Array.isArray(category.productIds) ? category.productIds : []);
      const products = getTrackedInventoryProducts().filter(product => categoryProductIds.has(product.id)).filter(product => {
        const searchText = `${product.nameAr || ''} ${product.nameEn || ''}`.toLowerCase();
        return searchText.includes((inventoryCategoryProductsSearchTerm || '').toLowerCase());
      });
      const branchQuantityHeader = inventoryCategoryBranchFilter === 'all'
        ? 'كل الفروع'
        : getInventoryBranchName(inventoryCategoryBranchFilter || 'main');

      return `
        <div>
          <div class="flex flex-wrap gap-3 justify-between items-center mb-6">
            <div class="flex gap-3">
              <button onclick="renderAccounting('inventoryCategories')" class="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg font-bold hover:bg-gray-300 transition">رجوع</button>
              <button onclick="showAddInventoryProductsToCategoryModal('${category.id}')" class="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة منتج</button>
            </div>
            <h2 class="text-3xl font-bold text-blue-600">${category.nameAr || ''}</h2>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input type="text" value="${inventoryCategoryProductsSearchTerm || ''}" oninput="setInventoryCategoryProductsSearchTerm(this.value)" placeholder="🔍 بحث عن منتج..." class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              <select onchange="setInventoryCategoryBranchFilter(this.value)" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                ${getInventoryBranchOptionsHtml(inventoryCategoryBranchFilter, true, true)}
              </select>
            </div>
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>اسم المنتج بالعربي</th>
                    <th>اسم المنتج بالإنجليزي</th>
                    <th>السعر</th>
                    <th>الكمية (${branchQuantityHeader})</th>
                    <th>الوحدة</th>
                    <th>إزالة من التصنيف</th>
                  </tr>
                </thead>
                <tbody>
                  ${products.length > 0 ? products.map(product => `
                    <tr>
                      <td>${product.nameAr || ''}</td>
                      <td>${product.nameEn || ''}</td>
                      <td>${(parseFloat(product.price) || 0).toFixed(3)} د.ك</td>
                      <td>${getInventoryQuantityByFilterText(product, inventoryCategoryBranchFilter)}</td>
                      <td>${getInventoryUnitName(product.inventoryUnitId) || '-'}</td>
                      <td><button onclick="removeProductFromInventoryCategory('${product.id}', '${category.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">إزالة</button></td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="6" class="text-center text-gray-500 py-8">لا توجد منتجات في هذا التصنيف</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    function showAddInventoryProductsToCategoryModal(categoryId) {
      selectedInventoryProductsForCategory = [];
      const category = allInventoryCategories.find(item => item.id === categoryId);
      if (!category) return;
      const selectedSet = new Set(Array.isArray(category.productIds) ? category.productIds : []);
      const availableProducts = getTrackedInventoryProducts().filter(product => !selectedSet.has(product.id));

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-4xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة منتج للتصنيف</h2>
          <input type="text" id="inventoryCategoryProductsSearch" oninput="filterInventoryCategoryProductsForAdd()" placeholder="🔍 بحث عن منتج..." class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
          <div id="inventoryCategoryProductsCountBadge" class="bg-blue-50 p-3 rounded-lg mb-4 hidden">
            <span id="inventoryCategoryProductsCount" class="font-bold text-blue-700">0</span> منتج محدد
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            ${availableProducts.map(product => `
              <div class="product-card add-inventory-category-product-card border-2" data-product-id="${product.id}" data-search="${product.nameAr || ''} ${product.nameEn || ''}" onclick="toggleInventoryCategoryProductSelection('${product.id}')">
                <div class="text-3xl mb-2">📦</div>
                <div class="font-bold mb-1">${product.nameAr || ''}</div>
                <div class="text-blue-600 font-bold">${(parseFloat(product.price) || 0).toFixed(3)} د.ك</div>
              </div>
            `).join('')}
          </div>
          <div class="flex gap-3 mt-6">
            <button id="saveInventoryCategoryProductsBtn" onclick="addSelectedInventoryProductsToInventoryCategory('${categoryId}')" disabled class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">إضافة المنتجات المحددة</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function filterInventoryCategoryProductsForAdd() {
      const searchTerm = (document.getElementById('inventoryCategoryProductsSearch')?.value || '').toLowerCase();
      document.querySelectorAll('.add-inventory-category-product-card').forEach(card => {
        const data = (card.getAttribute('data-search') || '').toLowerCase();
        card.style.display = data.includes(searchTerm) ? '' : 'none';
      });
    }

    function toggleInventoryCategoryProductSelection(productId) {
      const card = document.querySelector(`.add-inventory-category-product-card[data-product-id="${productId}"]`);
      if (!card) return;

      if (selectedInventoryProductsForCategory.includes(productId)) {
        selectedInventoryProductsForCategory = selectedInventoryProductsForCategory.filter(id => id !== productId);
        card.style.borderColor = '#e5e7eb';
        card.style.backgroundColor = 'white';
      } else {
        selectedInventoryProductsForCategory.push(productId);
        card.style.borderColor = '#3b82f6';
        card.style.backgroundColor = '#dbeafe';
      }

      const countBadge = document.getElementById('inventoryCategoryProductsCountBadge');
      const countValue = document.getElementById('inventoryCategoryProductsCount');
      const saveBtn = document.getElementById('saveInventoryCategoryProductsBtn');
      if (countValue) countValue.textContent = String(selectedInventoryProductsForCategory.length);
      if (saveBtn) saveBtn.disabled = selectedInventoryProductsForCategory.length === 0;
      if (countBadge) {
        if (selectedInventoryProductsForCategory.length > 0) countBadge.classList.remove('hidden');
        else countBadge.classList.add('hidden');
      }
    }

    async function addSelectedInventoryProductsToInventoryCategory(categoryId) {
      if (selectedInventoryProductsForCategory.length === 0) {
        showToast('الرجاء اختيار منتج واحد على الأقل', true);
        return;
      }

      const category = allInventoryCategories.find(item => item.id === categoryId);
      if (!category) return;
      const existing = new Set(Array.isArray(category.productIds) ? category.productIds : []);
      selectedInventoryProductsForCategory.forEach(id => existing.add(id));
      category.productIds = Array.from(existing);

      const success = await saveInventoryCategory(category);
      if (!success) return;
      document.querySelector('.modal-overlay')?.remove();
      showToast('تم إضافة المنتجات إلى التصنيف');
      openInventoryCategory(categoryId);
    }

    async function removeProductFromInventoryCategory(productId, categoryId) {
      const category = allInventoryCategories.find(item => item.id === categoryId);
      if (!category) return;

      const currentIds = Array.isArray(category.productIds) ? category.productIds : [];
      category.productIds = currentIds.filter(id => id !== productId);

      const success = await saveInventoryCategory(category);
      if (!success) return;
      showToast('تمت إزالة المنتج من التصنيف');
      openInventoryCategory(categoryId);
    }

    // Suppliers Section
    function getSupplierDisplayName(supplier) {
      if (!supplier) return '-';
      return `${supplier.nameAr || ''}${supplier.nameEn ? ` / ${supplier.nameEn}` : ''}`.trim();
    }

    function setSupplierSearchTerm(value) {
      supplierSearchTerm = value;
      renderAccounting('suppliers');
    }

    function renderSuppliersSection() {
      const searchTerm = (supplierSearchTerm || '').toLowerCase();
      const suppliers = allInventorySuppliers.filter(supplier => {
        const searchText = `${supplier.nameAr || ''} ${supplier.nameEn || ''} ${supplier.phone || ''}`.toLowerCase();
        return searchText.includes(searchTerm);
      });

      return `
        <div>
          <div class="flex flex-wrap justify-between items-center gap-3 mb-6">
            <h2 class="text-3xl font-bold text-blue-600">الموردين</h2>
            <button onclick="showSupplierModal()" class="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة مورد</button>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <input type="text" value="${supplierSearchTerm || ''}" oninput="setSupplierSearchTerm(this.value)" placeholder="🔍 بحث عن مورد..." class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>اسم المورد بالعربي</th>
                    <th>اسم المورد بالإنجليزي</th>
                    <th>رقم الهاتف</th>
                    <th>تعديل</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  ${suppliers.length > 0 ? suppliers.map(supplier => `
                    <tr class="cursor-pointer" onclick="openInventorySupplier('${supplier.id}')">
                      <td>${supplier.nameAr || ''}</td>
                      <td>${supplier.nameEn || ''}</td>
                      <td>${supplier.phone || ''}</td>
                      <td>
                        <button onclick="event.stopPropagation(); showSupplierModal('${supplier.id}')" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">تعديل</button>
                      </td>
                      <td>
                        <button onclick="event.stopPropagation(); confirmDeleteSupplier('${supplier.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">حذف</button>
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="5" class="text-center text-gray-500 py-8">لا يوجد موردين بعد</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    function showSupplierModal(supplierId = '') {
      const supplier = supplierId ? allInventorySuppliers.find(item => item.id === supplierId) : null;
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">${supplier ? 'تعديل مورد' : 'إضافة مورد'}</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">اسم المورد بالعربي</label>
              <input type="text" id="supplierNameAr" value="${supplier?.nameAr || ''}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">اسم المورد بالإنجليزي</label>
              <input type="text" id="supplierNameEn" value="${supplier?.nameEn || ''}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">رقم الهاتف</label>
              <input type="text" id="supplierPhone" value="${supplier?.phone || ''}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="saveSupplierFromModal('${supplierId}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">${supplier ? 'حفظ' : 'إضافة'}</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function saveSupplierFromModal(supplierId = '') {
      const nameAr = (document.getElementById('supplierNameAr')?.value || '').trim();
      const nameEn = (document.getElementById('supplierNameEn')?.value || '').trim();
      const phone = (document.getElementById('supplierPhone')?.value || '').trim();

      if (!nameAr || !nameEn || !phone) {
        showToast('الرجاء إدخال الاسم بالعربي والإنجليزي ورقم الهاتف', true);
        return;
      }

      const existing = supplierId ? allInventorySuppliers.find(item => item.id === supplierId) : null;
      const result = await saveInventorySupplier({
        id: supplierId || undefined,
        nameAr,
        nameEn,
        phone,
        productIds: existing?.productIds || []
      });
      if (!result.success) return;

      document.querySelector('.modal-overlay')?.remove();
      showToast(supplierId ? 'تم تعديل المورد بنجاح' : 'تمت إضافة المورد بنجاح');
      renderAccounting('suppliers');
    }

    function confirmDeleteSupplier(supplierId) {
      const supplier = allInventorySuppliers.find(item => item.id === supplierId);
      if (!supplier) {
        showToast('المورد غير موجود', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد حذف المورد</h2>
          <p class="text-gray-600 mb-6">هل تريد حذف المورد "${supplier.nameAr || ''}"؟</p>
          <div class="flex gap-3">
            <button onclick="deleteSupplierConfirmed('${supplierId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteSupplierConfirmed(supplierId) {
      try {
        await db.ref(`inventorySuppliers/${supplierId}`).remove();
        await loadData();
        if (selectedInventorySupplierId === supplierId) {
          selectedInventorySupplierId = '';
        }
        if (currentPurchaseVoucherDraft.supplierId === supplierId) {
          currentPurchaseVoucherDraft.supplierId = '';
        }
        document.querySelector('.modal-overlay')?.remove();
        showToast('تم حذف المورد');
        renderAccounting('suppliers');
      } catch (error) {
        console.error('Error deleting supplier:', error);
        showToast('خطأ في حذف المورد', true);
      }
    }

    function openInventorySupplier(supplierId) {
      selectedInventorySupplierId = supplierId;
      supplierProductsSearchTerm = '';
      renderAccounting('supplierDetails');
    }

    function setSupplierProductsSearchTerm(value) {
      supplierProductsSearchTerm = value;
      renderAccounting('supplierDetails');
    }

    function renderSupplierDetailsSection() {
      const supplier = allInventorySuppliers.find(item => item.id === selectedInventorySupplierId);
      if (!supplier) {
        return `
          <div class="text-center py-10">
            <p class="text-gray-600 mb-4">المورد غير موجود</p>
            <button onclick="renderAccounting('suppliers')" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">رجوع</button>
          </div>
        `;
      }

      const supplierProductIds = new Set(Array.isArray(supplier.productIds) ? supplier.productIds : []);
      const products = getTrackedInventoryProducts().filter(product => supplierProductIds.has(product.id)).filter(product => {
        const searchText = `${product.nameAr || ''} ${product.nameEn || ''}`.toLowerCase();
        return searchText.includes((supplierProductsSearchTerm || '').toLowerCase());
      });

      return `
        <div>
          <div class="flex flex-wrap gap-3 justify-between items-center mb-6">
            <div class="flex gap-3">
              <button onclick="renderAccounting('suppliers')" class="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg font-bold hover:bg-gray-300 transition">رجوع</button>
              <button onclick="showAddProductsToSupplierModal('${supplier.id}')" class="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة منتجات</button>
            </div>
            <h2 class="text-3xl font-bold text-blue-600">${supplier.nameAr || ''}</h2>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg mb-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><span class="font-bold">الاسم بالعربي:</span> ${supplier.nameAr || ''}</div>
              <div><span class="font-bold">الاسم بالإنجليزي:</span> ${supplier.nameEn || ''}</div>
              <div><span class="font-bold">الهاتف:</span> ${supplier.phone || ''}</div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg">
            <input type="text" value="${supplierProductsSearchTerm || ''}" oninput="setSupplierProductsSearchTerm(this.value)" placeholder="🔍 بحث عن منتج..." class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>اسم المنتج بالعربي</th>
                    <th>اسم المنتج بالإنجليزي</th>
                    <th>السعر</th>
                    <th>الكمية (كل الفروع)</th>
                    <th>الوحدة</th>
                    <th>إزالة</th>
                  </tr>
                </thead>
                <tbody>
                  ${products.length > 0 ? products.map(product => `
                    <tr>
                      <td>${product.nameAr || ''}</td>
                      <td>${product.nameEn || ''}</td>
                      <td>${(parseFloat(product.price) || 0).toFixed(3)} د.ك</td>
                      <td>${getInventoryQuantityByFilterText(product, 'all')}</td>
                      <td>${getInventoryUnitName(product.inventoryUnitId) || '-'}</td>
                      <td><button onclick="removeProductFromSupplier('${product.id}', '${supplier.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">إزالة</button></td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="6" class="text-center text-gray-500 py-8">لا توجد منتجات مرتبطة بهذا المورد</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    function showAddProductsToSupplierModal(supplierId) {
      selectedSupplierProductsForAdd = [];
      const supplier = allInventorySuppliers.find(item => item.id === supplierId);
      if (!supplier) return;
      const selectedSet = new Set(Array.isArray(supplier.productIds) ? supplier.productIds : []);
      const availableProducts = getTrackedInventoryProducts().filter(product => !selectedSet.has(product.id));

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-4xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة منتجات للمورد</h2>
          <input type="text" id="supplierProductsSearch" oninput="filterSupplierProductsForAdd()" placeholder="🔍 بحث عن منتج..." class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
          <div id="supplierProductsCountBadge" class="bg-blue-50 p-3 rounded-lg mb-4 hidden">
            <span id="supplierProductsCount" class="font-bold text-blue-700">0</span> منتج محدد
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            ${availableProducts.map(product => `
              <div class="product-card add-supplier-product-card border-2" data-product-id="${product.id}" data-search="${product.nameAr || ''} ${product.nameEn || ''}" onclick="toggleSupplierProductSelection('${product.id}')">
                <div class="text-3xl mb-2">📦</div>
                <div class="font-bold mb-1">${product.nameAr || ''}</div>
                <div class="text-blue-600 font-bold">${(parseFloat(product.price) || 0).toFixed(3)} د.ك</div>
              </div>
            `).join('')}
          </div>
          <div class="flex gap-3 mt-6">
            <button id="saveSupplierProductsBtn" onclick="addSelectedProductsToSupplier('${supplierId}')" disabled class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">إضافة المنتجات المحددة</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function filterSupplierProductsForAdd() {
      const searchTerm = (document.getElementById('supplierProductsSearch')?.value || '').toLowerCase();
      document.querySelectorAll('.add-supplier-product-card').forEach(card => {
        const data = (card.getAttribute('data-search') || '').toLowerCase();
        card.style.display = data.includes(searchTerm) ? '' : 'none';
      });
    }

    function toggleSupplierProductSelection(productId) {
      const card = document.querySelector(`.add-supplier-product-card[data-product-id="${productId}"]`);
      if (!card) return;

      if (selectedSupplierProductsForAdd.includes(productId)) {
        selectedSupplierProductsForAdd = selectedSupplierProductsForAdd.filter(id => id !== productId);
        card.style.borderColor = '#e5e7eb';
        card.style.backgroundColor = 'white';
      } else {
        selectedSupplierProductsForAdd.push(productId);
        card.style.borderColor = '#3b82f6';
        card.style.backgroundColor = '#dbeafe';
      }

      const countBadge = document.getElementById('supplierProductsCountBadge');
      const countValue = document.getElementById('supplierProductsCount');
      const saveBtn = document.getElementById('saveSupplierProductsBtn');
      if (countValue) countValue.textContent = String(selectedSupplierProductsForAdd.length);
      if (saveBtn) saveBtn.disabled = selectedSupplierProductsForAdd.length === 0;
      if (countBadge) {
        if (selectedSupplierProductsForAdd.length > 0) countBadge.classList.remove('hidden');
        else countBadge.classList.add('hidden');
      }
    }

    async function addSelectedProductsToSupplier(supplierId) {
      if (selectedSupplierProductsForAdd.length === 0) {
        showToast('الرجاء اختيار منتج واحد على الأقل', true);
        return;
      }

      const supplier = allInventorySuppliers.find(item => item.id === supplierId);
      if (!supplier) return;
      const existing = new Set(Array.isArray(supplier.productIds) ? supplier.productIds : []);
      selectedSupplierProductsForAdd.forEach(id => existing.add(id));
      supplier.productIds = Array.from(existing);

      const result = await saveInventorySupplier(supplier);
      if (!result.success) return;
      document.querySelector('.modal-overlay')?.remove();
      showToast('تمت إضافة المنتجات إلى المورد');
      openInventorySupplier(supplierId);
    }

    async function removeProductFromSupplier(productId, supplierId) {
      const supplier = allInventorySuppliers.find(item => item.id === supplierId);
      if (!supplier) return;
      const currentIds = Array.isArray(supplier.productIds) ? supplier.productIds : [];
      supplier.productIds = currentIds.filter(id => id !== productId);

      const result = await saveInventorySupplier(supplier);
      if (!result.success) return;
      showToast('تمت إزالة المنتج من المورد');
      openInventorySupplier(supplierId);
    }

    // Purchase Section
    function resetPurchaseVoucherDraft(shouldRender = true) {
      currentPurchaseVoucherDraft = {
        warehouseKeeper: '',
        supplierId: '',
        targetBranchId: 'main',
        invoiceNumber: '',
        items: []
      };
      editingPurchaseVoucherId = '';
      purchaseProductSearchTerm = '';
      if (shouldRender) renderAccounting('purchase');
    }

    function openPurchaseVoucherModal() {
      resetPurchaseVoucherDraft(false);
      isPurchaseVoucherModalOpen = true;
      renderAccounting('purchase');
    }

    function openEditPurchaseVoucher(purchaseId) {
      const purchase = allInventoryPurchases.find(item => item.id === purchaseId);
      if (!purchase) {
        showToast('سند الشراء غير موجود', true);
        return;
      }

      currentPurchaseVoucherDraft = {
        warehouseKeeper: purchase.warehouseKeeper || '',
        supplierId: purchase.supplierId || '',
        targetBranchId: purchase.targetBranchId || 'main',
        invoiceNumber: purchase.invoiceNumber || '',
        items: Array.isArray(purchase.items) ? purchase.items.map(item => ({
          productId: item.productId,
          quantity: formatInventoryDecimal(parseFloat(item.quantity) || 0)
        })) : []
      };
      editingPurchaseVoucherId = purchase.id;
      purchaseProductSearchTerm = '';
      isPurchaseVoucherModalOpen = true;
      renderAccounting('purchase');
    }

    function closePurchaseVoucherModal() {
      isPurchaseVoucherModalOpen = false;
      editingPurchaseVoucherId = '';
      purchaseProductSearchTerm = '';
      renderAccounting('purchase');
    }

    function getPurchaseSupplierCandidateProducts() {
      const selectedSupplier = allInventorySuppliers.find(item => item.id === currentPurchaseVoucherDraft.supplierId);
      const trackedProducts = getTrackedInventoryProducts();
      if (!selectedSupplier) return trackedProducts;

      const linkedIds = new Set(Array.isArray(selectedSupplier.productIds) ? selectedSupplier.productIds : []);
      if (linkedIds.size === 0) return trackedProducts;
      return trackedProducts.filter(product => linkedIds.has(product.id));
    }

    function showPurchaseProductsSelectionModal() {
      if (!currentPurchaseVoucherDraft.supplierId) {
        showToast('الرجاء اختيار المورد أولاً', true);
        return;
      }

      selectedPurchaseProductsForAdd = [];
      const existingIds = new Set((currentPurchaseVoucherDraft.items || []).map(item => item.productId));
      const availableProducts = getPurchaseSupplierCandidateProducts().filter(product => !existingIds.has(product.id));

      const modal = document.createElement('div');
      modal.id = 'purchaseProductsPickerOverlay';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-4xl">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">اختيار منتجات الشراء</h2>
          <input type="text" id="purchaseProductsSearch" oninput="filterPurchaseProductsForAdd()" placeholder="🔍 بحث عن منتج..." class="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-600 focus:outline-none">
          <div id="purchaseProductsCountBadge" class="bg-blue-50 p-3 rounded-lg mb-4 hidden">
            <span id="purchaseProductsCount" class="font-bold text-blue-700">0</span> منتج محدد
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            ${availableProducts.map(product => `
              <div class="product-card add-purchase-product-card border-2" data-product-id="${product.id}" data-search="${product.nameAr || ''} ${product.nameEn || ''}" onclick="togglePurchaseProductSelection('${product.id}')">
                <div class="text-3xl mb-2">📦</div>
                <div class="font-bold mb-1">${product.nameAr || ''}</div>
                <div class="text-blue-600 font-bold">${(parseFloat(product.price) || 0).toFixed(3)} د.ك</div>
              </div>
            `).join('')}
            ${availableProducts.length === 0 ? '<div class="text-gray-500 py-4">لا توجد منتجات متاحة للإضافة</div>' : ''}
          </div>
          <div class="flex gap-3 mt-6">
            <button id="savePurchaseProductsBtn" onclick="addSelectedProductsToPurchaseDraft()" disabled class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">إضافة المنتجات المحددة</button>
            <button onclick="document.getElementById('purchaseProductsPickerOverlay')?.remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function filterPurchaseProductsForAdd() {
      const searchTerm = (document.getElementById('purchaseProductsSearch')?.value || '').toLowerCase();
      document.querySelectorAll('.add-purchase-product-card').forEach(card => {
        const data = (card.getAttribute('data-search') || '').toLowerCase();
        card.style.display = data.includes(searchTerm) ? '' : 'none';
      });
    }

    function togglePurchaseProductSelection(productId) {
      const card = document.querySelector(`.add-purchase-product-card[data-product-id="${productId}"]`);
      if (!card) return;

      if (selectedPurchaseProductsForAdd.includes(productId)) {
        selectedPurchaseProductsForAdd = selectedPurchaseProductsForAdd.filter(id => id !== productId);
        card.style.borderColor = '#e5e7eb';
        card.style.backgroundColor = 'white';
      } else {
        selectedPurchaseProductsForAdd.push(productId);
        card.style.borderColor = '#3b82f6';
        card.style.backgroundColor = '#dbeafe';
      }

      const countBadge = document.getElementById('purchaseProductsCountBadge');
      const countValue = document.getElementById('purchaseProductsCount');
      const saveBtn = document.getElementById('savePurchaseProductsBtn');
      if (countValue) countValue.textContent = String(selectedPurchaseProductsForAdd.length);
      if (saveBtn) saveBtn.disabled = selectedPurchaseProductsForAdd.length === 0;
      if (countBadge) {
        if (selectedPurchaseProductsForAdd.length > 0) countBadge.classList.remove('hidden');
        else countBadge.classList.add('hidden');
      }
    }

    function addSelectedProductsToPurchaseDraft() {
      if (selectedPurchaseProductsForAdd.length === 0) {
        showToast('الرجاء اختيار منتج واحد على الأقل', true);
        return;
      }

      const existing = new Set((currentPurchaseVoucherDraft.items || []).map(item => item.productId));
      selectedPurchaseProductsForAdd.forEach(productId => {
        if (!existing.has(productId)) {
          currentPurchaseVoucherDraft.items.push({
            productId,
            quantity: '1'
          });
        }
      });

      document.getElementById('purchaseProductsPickerOverlay')?.remove();
      renderAccounting('purchase');
    }

    function removePurchaseProduct(productId) {
      currentPurchaseVoucherDraft.items = currentPurchaseVoucherDraft.items.filter(item => item.productId !== productId);
      renderAccounting('purchase');
    }

    function setPurchaseItemQuantity(productId, value) {
      const item = currentPurchaseVoucherDraft.items.find(entry => entry.productId === productId);
      if (!item) return;
      item.quantity = normalizeDecimalInput(value);
    }

    function renderPurchaseVoucherModal() {
      const isEditingPurchase = Boolean(editingPurchaseVoucherId);

      return `
        <div class="purchase-voucher-overlay" onclick="if(event.target === this) closePurchaseVoucherModal()" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); z-index: 900; display: flex; align-items: center; justify-content: center; padding: 20px;">
          <div class="modal-content p-6 w-full max-w-6xl max-h-[92vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-2xl font-bold text-blue-600">${isEditingPurchase ? 'تعديل سند شراء' : 'سند شراء جديد'}</h3>
              <button onclick="closePurchaseVoucherModal()" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition">✕</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label class="block mb-2 font-bold text-gray-700">اسم أمين المخزن</label>
                <input type="text" value="${currentPurchaseVoucherDraft.warehouseKeeper || ''}" oninput="currentPurchaseVoucherDraft.warehouseKeeper = this.value" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              </div>
              <div>
                <label class="block mb-2 font-bold text-gray-700">اسم المورد</label>
                <select onchange="currentPurchaseVoucherDraft.supplierId = this.value; renderAccounting('purchase')" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                  <option value="">-- اختر المورد --</option>
                  ${allInventorySuppliers.map(supplier => `
                    <option value="${supplier.id}" ${currentPurchaseVoucherDraft.supplierId === supplier.id ? 'selected' : ''}>${getSupplierDisplayName(supplier)}</option>
                  `).join('')}
                </select>
              </div>
              <div>
                <label class="block mb-2 font-bold text-gray-700">الفرع</label>
                <select onchange="currentPurchaseVoucherDraft.targetBranchId = this.value" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                  ${getInventoryBranchOptionsHtml(currentPurchaseVoucherDraft.targetBranchId || 'main', false, true)}
                </select>
              </div>
              <div>
                <label class="block mb-2 font-bold text-gray-700">رقم فاتورة الشراء</label>
                <input type="text" value="${currentPurchaseVoucherDraft.invoiceNumber || ''}" oninput="this.value = normalizeDecimalInput(this.value); currentPurchaseVoucherDraft.invoiceNumber = this.value" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div class="text-sm text-gray-600">
                ${currentPurchaseVoucherDraft.supplierId ? 'اختر المنتجات بنفس طريقة التصنيفات ثم أدخل الكمية لكل منتج.' : 'اختر المورد أولاً ثم أضف المنتجات.'}
              </div>
              <button onclick="showPurchaseProductsSelectionModal()" class="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition">➕ اختيار منتجات</button>
            </div>

            <div class="overflow-x-auto mb-4">
              <table>
                <thead>
                  <tr>
                    <th>اسم المنتج بالعربي</th>
                    <th>اسم المنتج بالإنجليزي</th>
                    <th>الكمية المشتراة</th>
                    <th>الوحدة</th>
                    <th>إزالة</th>
                  </tr>
                </thead>
                <tbody>
                  ${currentPurchaseVoucherDraft.items.length > 0 ? currentPurchaseVoucherDraft.items.map(item => {
                    const product = allProducts.find(p => p.id === item.productId);
                    return `
                      <tr>
                        <td>${product?.nameAr || ''}</td>
                        <td>${product?.nameEn || ''}</td>
                        <td>
                          <input type="text" value="${item.quantity || ''}" oninput="this.value = normalizeDecimalInput(this.value); setPurchaseItemQuantity('${item.productId}', this.value)" class="w-28 p-2 border-2 border-gray-300 rounded-lg text-center focus:border-blue-600 focus:outline-none">
                        </td>
                        <td>${getInventoryUnitName(product?.inventoryUnitId) || '-'}</td>
                        <td><button onclick="removePurchaseProduct('${item.productId}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">حذف</button></td>
                      </tr>
                    `;
                  }).join('') : `
                    <tr>
                      <td colspan="5" class="text-center text-gray-500 py-6">لا توجد منتجات مضافة في سند الشراء</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>

            <div class="flex gap-3">
              <button onclick="submitPurchaseVoucher()" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">${isEditingPurchase ? 'حفظ التعديل' : 'شراء'}</button>
              <button onclick="closePurchaseVoucherModal()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إغلاق</button>
            </div>
          </div>
        </div>
      `;
    }

    function renderPurchaseSection() {
      return `
        <div>
          <div class="flex flex-wrap justify-between items-center gap-3 mb-6">
            <h2 class="text-3xl font-bold text-blue-600">شراء</h2>
            <button onclick="openPurchaseVoucherModal()" class="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ شراء</button>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h3 class="text-2xl font-bold text-blue-600 mb-4">سندات الشراء</h3>
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>رقم السند</th>
                    <th>التاريخ</th>
                    <th>أمين المخزن</th>
                    <th>المورد</th>
                    <th>الفرع</th>
                    <th>رقم فاتورة الشراء</th>
                    <th>عدد المنتجات</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  ${allInventoryPurchases.length > 0 ? allInventoryPurchases.map(purchase => `
                    <tr>
                      <td>${purchase.voucherNumber || '-'}</td>
                      <td>${purchase.timestamp ? `${formatDate(purchase.timestamp)} ${formatTime(purchase.timestamp)}` : '-'}</td>
                      <td>${purchase.warehouseKeeper || '-'}</td>
                      <td>${purchase.supplierNameAr || purchase.supplierNameEn || '-'}</td>
                      <td>${purchase.targetBranchName || getInventoryBranchName(purchase.targetBranchId || 'main') || '-'}</td>
                      <td>${purchase.invoiceNumber || '-'}</td>
                      <td>${Array.isArray(purchase.items) ? purchase.items.length : 0}</td>
                      <td>
                        <div class="flex gap-2">
                          <button onclick="viewPurchaseVoucher('${purchase.id}')" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">عرض</button>
                          <button onclick="openEditPurchaseVoucher('${purchase.id}')" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">تعديل</button>
                          <button onclick="confirmDeletePurchaseVoucher('${purchase.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">حذف</button>
                        </div>
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="8" class="text-center text-gray-500 py-8">لا توجد سندات شراء بعد</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
          ${isPurchaseVoucherModalOpen ? renderPurchaseVoucherModal() : ''}
        </div>
      `;
    }

    function buildPurchaseVoucherInvoiceData(purchase) {
      const supplier = allInventorySuppliers.find(item => item.id === purchase.supplierId);
      const supplierNameAr = purchase.supplierNameAr || supplier?.nameAr || '';
      const supplierNameEn = purchase.supplierNameEn || supplier?.nameEn || '';
      const supplierPhone = purchase.supplierPhone || supplier?.phone || '-';
      const branchName = purchase.targetBranchName || getInventoryBranchName(purchase.targetBranchId || 'main') || '-';
      const purchaseDate = purchase.timestamp ? `${formatDate(purchase.timestamp)} ${formatTime(purchase.timestamp)}` : '-';
      const items = Array.isArray(purchase.items) ? purchase.items : [];

      const rows = items.map(item => {
        const product = allProducts.find(p => p.id === item.productId);
        const unitPrice = parseFloat(
          item.unitPrice !== undefined
            ? item.unitPrice
            : (product?.price !== undefined ? product.price : 0)
        ) || 0;
        const quantity = parseFloat(item.quantity) || 0;
        const lineTotal = parseFloat(
          item.lineTotal !== undefined
            ? item.lineTotal
            : (unitPrice * quantity)
        ) || 0;
        const unitName = item.unitName || getInventoryUnitName(item.unitId || product?.inventoryUnitId) || '-';

        return {
          nameAr: item.nameAr || product?.nameAr || '',
          nameEn: item.nameEn || product?.nameEn || '',
          unitName,
          unitPrice,
          quantity,
          lineTotal
        };
      });

      const grandTotal = rows.reduce((sum, row) => sum + (parseFloat(row.lineTotal) || 0), 0);

      return {
        supplierNameAr,
        supplierNameEn,
        supplierPhone,
        branchName,
        purchaseDate,
        rows,
        grandTotal
      };
    }

    function buildPurchaseVoucherA4Html(purchase) {
      const data = buildPurchaseVoucherInvoiceData(purchase);

      return `
        <div style="max-width: 210mm; margin: 0 auto; background: #fff; border: 1px solid #d1d5db; border-radius: 12px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 12px;">
            <div>
              <h2 style="margin: 0; color: #1d4ed8; font-size: 26px; font-weight: 800;">سند شراء</h2>
              <div style="font-size: 14px; color: #111827; font-weight: 700; margin-top: 2px;">مخبز التين والزيتون</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">رقم السند: <strong style="color: #111827;">${purchase.voucherNumber || '-'}</strong></div>
            </div>
            <div style="text-align: left;">
              <img src="logo.png" alt="شعار الشركة" style="width: 95px; height: 95px; object-fit: contain;" onerror="this.style.display='none';">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-bottom: 10px;">
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; background: #f8fafc;">
              <div style="font-size: 11px; color: #6b7280;">أمين المخزن</div>
              <div style="font-size: 13px; font-weight: 700; color: #111827;">${purchase.warehouseKeeper || '-'}</div>
            </div>
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; background: #f8fafc;">
              <div style="font-size: 11px; color: #6b7280;">المورد</div>
              <div style="font-size: 13px; font-weight: 700; color: #111827;">${data.supplierNameAr || '-'}${data.supplierNameEn ? ` / ${data.supplierNameEn}` : ''}</div>
            </div>
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; background: #f8fafc;">
              <div style="font-size: 11px; color: #6b7280;">هاتف المورد</div>
              <div style="font-size: 13px; font-weight: 700; color: #111827;">${data.supplierPhone}</div>
            </div>
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; background: #f8fafc;">
              <div style="font-size: 11px; color: #6b7280;">الفرع</div>
              <div style="font-size: 13px; font-weight: 700; color: #111827;">${data.branchName}</div>
            </div>
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; background: #f8fafc;">
              <div style="font-size: 11px; color: #6b7280;">تاريخ الشراء</div>
              <div style="font-size: 13px; font-weight: 700; color: #111827;">${data.purchaseDate}</div>
            </div>
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; background: #f8fafc;">
              <div style="font-size: 11px; color: #6b7280;">رقم فاتورة الشراء</div>
              <div style="font-size: 13px; font-weight: 700; color: #111827;">${purchase.invoiceNumber || '-'}</div>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
            <thead>
              <tr>
                <th style="border: 1px solid #d1d5db; padding: 8px; background: #1f2937; color: #fff; font-size: 12px; text-align: right;">الصنف</th>
                <th style="border: 1px solid #d1d5db; padding: 8px; background: #1f2937; color: #fff; font-size: 12px; text-align: right;">الوحدة</th>
                <th style="border: 1px solid #d1d5db; padding: 8px; background: #1f2937; color: #fff; font-size: 12px; text-align: right;">السعر</th>
                <th style="border: 1px solid #d1d5db; padding: 8px; background: #1f2937; color: #fff; font-size: 12px; text-align: right;">الكمية</th>
                <th style="border: 1px solid #d1d5db; padding: 8px; background: #1f2937; color: #fff; font-size: 12px; text-align: right;">القيمة الإجمالية</th>
              </tr>
            </thead>
            <tbody>
              ${data.rows.length > 0 ? data.rows.map((row, index) => `
                <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f8fafc'};">
                  <td style="border: 1px solid #d1d5db; padding: 8px; font-size: 12px;">
                    <div style="font-weight: 700; color: #111827;">${row.nameAr || '-'}</div>
                    ${row.nameEn ? `<div style=\"color: #6b7280; font-size: 11px;\">${row.nameEn}</div>` : ''}
                  </td>
                  <td style="border: 1px solid #d1d5db; padding: 8px; font-size: 12px;">${row.unitName}</td>
                  <td style="border: 1px solid #d1d5db; padding: 8px; font-size: 12px;">${row.unitPrice.toFixed(3)} د.ك</td>
                  <td style="border: 1px solid #d1d5db; padding: 8px; font-size: 12px;">${formatInventoryDecimal(row.quantity)}</td>
                  <td style="border: 1px solid #d1d5db; padding: 8px; font-size: 12px; font-weight: 700;">${row.lineTotal.toFixed(3)} د.ك</td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="5" style="border: 1px solid #d1d5db; padding: 12px; text-align: center; color: #6b7280;">لا توجد أصناف في السند</td>
                </tr>
              `}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" style="border: 1px solid #d1d5db; padding: 10px; font-weight: 800; background: #e0e7ff; text-align: left;">الإجمالي</td>
                <td style="border: 1px solid #d1d5db; padding: 10px; font-weight: 800; background: #e0e7ff;">${data.grandTotal.toFixed(3)} د.ك</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `;
    }

    function viewPurchaseVoucher(purchaseId) {
      const purchase = allInventoryPurchases.find(item => item.id === purchaseId);
      if (!purchase) {
        showToast('سند الشراء غير موجود', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-6 w-full max-w-6xl max-h-[94vh] overflow-y-auto">
          <div class="mb-4">
            ${buildPurchaseVoucherA4Html(purchase)}
          </div>
          <div class="flex gap-3 mt-4">
            <button onclick="printPurchaseVoucher('${purchaseId}')" class="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition">🖨️ طباعة</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إغلاق</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function printPurchaseVoucher(purchaseId) {
      const purchase = allInventoryPurchases.find(item => item.id === purchaseId);
      if (!purchase) {
        showToast('سند الشراء غير موجود', true);
        return;
      }

      const contentHtml = `
        <div class="print-report">
          ${buildPurchaseVoucherA4Html(purchase)}
        </div>
      `;
      openA4PrintWindow(`سند شراء ${purchase.voucherNumber || ''}`, contentHtml);
    }

    async function submitPurchaseVoucher() {
      const warehouseKeeper = (currentPurchaseVoucherDraft.warehouseKeeper || '').trim();
      const supplierId = currentPurchaseVoucherDraft.supplierId;
      const targetBranchId = currentPurchaseVoucherDraft.targetBranchId || 'main';
      const invoiceNumber = normalizeDecimalInput(currentPurchaseVoucherDraft.invoiceNumber || '');
      const items = Array.isArray(currentPurchaseVoucherDraft.items) ? currentPurchaseVoucherDraft.items : [];
      const isEditingPurchase = Boolean(editingPurchaseVoucherId);
      const existingPurchase = isEditingPurchase ? allInventoryPurchases.find(item => item.id === editingPurchaseVoucherId) : null;
      const supplier = allInventorySuppliers.find(item => item.id === supplierId);
      const allowedBranches = new Set(INVENTORY_BRANCHES.map(branch => branch.id));
      const normalizedTargetBranchId = allowedBranches.has(targetBranchId) ? targetBranchId : '';
      const oldTargetBranchId = isEditingPurchase
        ? (allowedBranches.has(existingPurchase?.targetBranchId) ? existingPurchase.targetBranchId : 'main')
        : normalizedTargetBranchId;

      if (!warehouseKeeper) {
        showToast('الرجاء إدخال اسم أمين المخزن', true);
        return;
      }
      if (!supplierId || !supplier) {
        showToast('الرجاء اختيار المورد', true);
        return;
      }
      if (!normalizedTargetBranchId) {
        showToast('الرجاء اختيار الفرع', true);
        return;
      }
      if (!invoiceNumber) {
        showToast('الرجاء إدخال رقم فاتورة الشراء', true);
        return;
      }
      if (items.length === 0) {
        showToast('الرجاء إضافة منتج واحد على الأقل', true);
        return;
      }
      if (isEditingPurchase && !existingPurchase) {
        showToast('تعذر العثور على سند الشراء المطلوب تعديله', true);
        return;
      }

      const oldItemsByProductId = {};
      if (existingPurchase && Array.isArray(existingPurchase.items)) {
        existingPurchase.items.forEach(item => {
          if (!item.productId) return;
          oldItemsByProductId[item.productId] = (oldItemsByProductId[item.productId] || 0) + (parseFloat(item.quantity) || 0);
        });
      }

      const newItemsByProductId = {};
      const purchaseItems = [];
      for (const item of items) {
        const product = allProducts.find(p => p.id === item.productId);
        if (!product) {
          showToast('تم العثور على منتج غير صالح في السند', true);
          return;
        }
        const quantity = parseFloat(normalizeDecimalInput(item.quantity));
        if (isNaN(quantity) || quantity <= 0) {
          showToast(`الرجاء إدخال كمية صحيحة للمنتج: ${product.nameAr || product.nameEn || ''}`, true);
          return;
        }
        newItemsByProductId[product.id] = (newItemsByProductId[product.id] || 0) + quantity;
      }

      try {
        const updates = {};
        const productIds = new Set([
          ...Object.keys(oldItemsByProductId),
          ...Object.keys(newItemsByProductId)
        ]);

        for (const productId of productIds) {
          const product = allProducts.find(p => p.id === productId);
          if (!product) continue;

          const quantities = ensureInventoryBranchQuantities(product);
          const oldQuantity = oldItemsByProductId[productId] || 0;
          const newQuantity = newItemsByProductId[productId] || 0;

          const oldTargetCurrentQuantity = quantities[oldTargetBranchId] || 0;
          const oldTargetAfterRevert = parseFloat((oldTargetCurrentQuantity - oldQuantity).toFixed(3));
          if (oldTargetAfterRevert < -0.000001) {
            showToast(`تعذر تعديل السند بسبب عدم كفاية رصيد الفرع القديم للمنتج: ${product.nameAr || product.nameEn || ''}`, true);
            return;
          }

          let finalTargetQuantity = 0;
          if (oldTargetBranchId === normalizedTargetBranchId) {
            finalTargetQuantity = parseFloat((oldTargetAfterRevert + newQuantity).toFixed(3));
            updates[`products/${product.id}/inventoryBranchQuantities/${normalizedTargetBranchId}`] = Math.max(0, finalTargetQuantity);
          } else {
            updates[`products/${product.id}/inventoryBranchQuantities/${oldTargetBranchId}`] = Math.max(0, oldTargetAfterRevert);
            const newTargetCurrentQuantity = quantities[normalizedTargetBranchId] || 0;
            finalTargetQuantity = parseFloat((newTargetCurrentQuantity + newQuantity).toFixed(3));
            updates[`products/${product.id}/inventoryBranchQuantities/${normalizedTargetBranchId}`] = Math.max(0, finalTargetQuantity);
          }

          let finalMainQuantity = quantities.main || 0;
          if (normalizedTargetBranchId === 'main') {
            finalMainQuantity = oldTargetBranchId === 'main'
              ? finalTargetQuantity
              : parseFloat(((quantities.main || 0) + newQuantity).toFixed(3));
          } else if (oldTargetBranchId === 'main') {
            finalMainQuantity = oldTargetAfterRevert;
          }

          finalMainQuantity = Math.max(0, finalMainQuantity);
          updates[`products/${product.id}/inventoryQuantity`] = Math.max(0, finalMainQuantity);
          updates[`products/${product.id}/stock`] = Math.max(0, finalMainQuantity);
        }

        for (const [productId, quantity] of Object.entries(newItemsByProductId)) {
          const product = allProducts.find(p => p.id === productId);
          if (!product) continue;
          const unitPrice = parseFloat(product.price) || 0;
          const lineTotal = parseFloat((unitPrice * (parseFloat(quantity) || 0)).toFixed(3));
          purchaseItems.push({
            productId,
            nameAr: product.nameAr || '',
            nameEn: product.nameEn || '',
            quantity: parseFloat(quantity.toFixed(3)),
            unitId: product.inventoryUnitId || null,
            unitName: getInventoryUnitName(product.inventoryUnitId) || '',
            unitPrice: parseFloat(unitPrice.toFixed(3)),
            lineTotal
          });
        }

        const purchaseId = isEditingPurchase ? editingPurchaseVoucherId : generateId();
        const voucherNumber = isEditingPurchase
          ? (existingPurchase.voucherNumber || await generateInventoryPurchaseNumber())
          : await generateInventoryPurchaseNumber();
        const timestamp = isEditingPurchase ? (existingPurchase.timestamp || Date.now()) : Date.now();
        const targetBranchName = getInventoryBranchName(normalizedTargetBranchId);

        updates[`inventoryPurchases/${purchaseId}`] = {
          id: purchaseId,
          voucherNumber,
          warehouseKeeper,
          supplierId,
          supplierNameAr: supplier.nameAr || '',
          supplierNameEn: supplier.nameEn || '',
          supplierPhone: supplier.phone || '',
          targetBranchId: normalizedTargetBranchId,
          targetBranchName,
          invoiceNumber,
          items: purchaseItems,
          timestamp,
          ...(isEditingPurchase ? { updatedAt: Date.now() } : {})
        };

        await db.ref().update(updates);
        showToast(isEditingPurchase ? `تم تعديل سند الشراء رقم: ${voucherNumber}` : `تم الشراء بنجاح. رقم السند: ${voucherNumber}`);
        isPurchaseVoucherModalOpen = false;
        resetPurchaseVoucherDraft(false);
        renderAccounting('purchase');
      } catch (error) {
        console.error('Error submitting purchase voucher:', error);
        showToast('حدث خطأ أثناء تنفيذ الشراء', true);
      }
    }

    function confirmDeletePurchaseVoucher(purchaseId) {
      const purchase = allInventoryPurchases.find(item => item.id === purchaseId);
      if (!purchase) {
        showToast('سند الشراء غير موجود', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد حذف سند الشراء</h2>
          <p class="text-gray-600 mb-6">هل تريد حذف السند رقم "${purchase.voucherNumber || '-'}"؟ سيتم التراجع عن زيادة المخزون.</p>
          <div class="flex gap-3">
            <button onclick="deletePurchaseVoucherConfirmed('${purchaseId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deletePurchaseVoucherConfirmed(purchaseId) {
      const purchase = allInventoryPurchases.find(item => item.id === purchaseId);
      if (!purchase) {
        showToast('سند الشراء غير موجود', true);
        return;
      }

      try {
        const updates = {};
        const purchaseItems = Array.isArray(purchase.items) ? purchase.items : [];
        const allowedBranches = new Set(INVENTORY_BRANCHES.map(branch => branch.id));
        const targetBranchId = allowedBranches.has(purchase.targetBranchId) ? purchase.targetBranchId : 'main';

        for (const item of purchaseItems) {
          const product = allProducts.find(p => p.id === item.productId);
          if (!product) continue;

          const quantity = parseFloat(item.quantity) || 0;
          const quantities = ensureInventoryBranchQuantities(product);
          const targetCurrentQuantity = quantities[targetBranchId] || 0;
          const finalTargetQuantity = parseFloat((targetCurrentQuantity - quantity).toFixed(3));
          if (finalTargetQuantity < -0.000001) {
            showToast(`تعذر حذف السند بسبب عدم كفاية رصيد الفرع للمنتج: ${product.nameAr || product.nameEn || ''}`, true);
            return;
          }

          updates[`products/${product.id}/inventoryBranchQuantities/${targetBranchId}`] = Math.max(0, finalTargetQuantity);
          const finalMainQuantity = targetBranchId === 'main' ? Math.max(0, finalTargetQuantity) : Math.max(0, quantities.main || 0);
          updates[`products/${product.id}/inventoryQuantity`] = Math.max(0, finalMainQuantity);
          updates[`products/${product.id}/stock`] = Math.max(0, finalMainQuantity);
        }

        updates[`inventoryPurchases/${purchaseId}`] = null;
        await db.ref().update(updates);
        document.querySelector('.modal-overlay')?.remove();
        if (editingPurchaseVoucherId === purchaseId) {
          isPurchaseVoucherModalOpen = false;
          resetPurchaseVoucherDraft(false);
        }
        showToast('تم حذف سند الشراء والتراجع عن الكميات');
        renderAccounting('purchase');
      } catch (error) {
        console.error('Error deleting purchase voucher:', error);
        showToast('حدث خطأ أثناء حذف سند الشراء', true);
      }
    }

    // Issue Section
    function resetIssueVoucherDraft(shouldRender = true) {
      currentIssueVoucherDraft = {
        warehouseKeeper: '',
        cashierId: '',
        invoiceNumber: '',
        items: []
      };
      editingIssueVoucherId = '';
      issueProductSearchTerm = '';
      if (shouldRender) renderAccounting('issue');
    }

    function openIssueVoucherModal() {
      resetIssueVoucherDraft(false);
      isIssueVoucherModalOpen = true;
      renderAccounting('issue');
    }

    function openEditIssueVoucher(issueId) {
      const issue = allInventoryIssues.find(item => item.id === issueId);
      if (!issue) {
        showToast('سند الصرف غير موجود', true);
        return;
      }

      currentIssueVoucherDraft = {
        warehouseKeeper: issue.warehouseKeeper || '',
        cashierId: issue.cashierId || '',
        invoiceNumber: issue.invoiceNumber || '',
        items: Array.isArray(issue.items) ? issue.items.map(item => ({
          productId: item.productId,
          quantity: parseFloat(item.quantity) || 0
        })) : []
      };
      editingIssueVoucherId = issue.id;
      issueProductSearchTerm = '';
      isIssueVoucherModalOpen = true;
      renderAccounting('issue');
    }

    function closeIssueVoucherModal() {
      isIssueVoucherModalOpen = false;
      editingIssueVoucherId = '';
      issueProductSearchTerm = '';
      renderAccounting('issue');
    }

    function setIssueProductSearchTerm(value) {
      issueProductSearchTerm = value;
      renderAccounting('issue');
    }

    function renderIssueVoucherModal() {
      const isEditingIssue = Boolean(editingIssueVoucherId);
      const searchTerm = (issueProductSearchTerm || '').toLowerCase();
      const products = getTrackedInventoryProducts().filter(product => {
        const searchText = `${product.nameAr || ''} ${product.nameEn || ''}`.toLowerCase();
        return searchText.includes(searchTerm);
      });

      return `
        <div class="issue-voucher-overlay" onclick="if(event.target === this) closeIssueVoucherModal()" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); z-index: 900; display: flex; align-items: center; justify-content: center; padding: 20px;">
          <div class="modal-content p-6 w-full max-w-6xl max-h-[92vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-2xl font-bold text-blue-600">${isEditingIssue ? 'تعديل سند صرف' : 'إضافة سند صرف'}</h3>
              <button onclick="closeIssueVoucherModal()" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition">✕</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label class="block mb-2 font-bold text-gray-700">اسم أمين المخزن</label>
                <input type="text" value="${currentIssueVoucherDraft.warehouseKeeper || ''}" oninput="currentIssueVoucherDraft.warehouseKeeper = this.value" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              </div>
              <div>
                <label class="block mb-2 font-bold text-gray-700">اسم الكاشير</label>
                <select onchange="handleIssueCashierSelection(this.value)" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                  <option value="">-- اختر --</option>
                  ${allIssueCashiers.map(cashier => `<option value="${cashier.id}" ${currentIssueVoucherDraft.cashierId === cashier.id ? 'selected' : ''}>${cashier.name || ''}</option>`).join('')}
                  <option value="__add_new__">➕ إضافة كاشير</option>
                  <option value="__edit_selected__">✏️ تعديل الكاشير المحدد</option>
                  <option value="__delete_selected__">🗑️ حذف الكاشير المحدد</option>
                </select>
              </div>
              <div>
                <label class="block mb-2 font-bold text-gray-700">رقم الفاتورة</label>
                <input type="text" value="${currentIssueVoucherDraft.invoiceNumber || ''}" oninput="this.value = normalizeDecimalInput(this.value); currentIssueVoucherDraft.invoiceNumber = this.value" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              </div>
            </div>

            <div class="mb-4">
              <label class="block mb-2 font-bold text-gray-700">بحث عن منتج</label>
              <div class="flex gap-2">
                <input id="issueProductSearchField" type="text" value="${issueProductSearchTerm || ''}" oninput="setIssueProductSearchTerm(this.value)" placeholder="🔍 ابحث عن منتج لإضافته إلى سند الصرف" class="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <button onclick="setIssueProductSearchTerm(document.getElementById('issueProductSearchField').value)" class="bg-blue-600 text-white px-5 rounded-lg font-bold hover:bg-blue-700 transition">بحث</button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto mb-6">
              ${products.map(product => `
                <button onclick="showIssueQuantityModal('${product.id}')" class="border-2 border-gray-200 rounded-lg p-4 text-right hover:border-blue-500 hover:bg-blue-50 transition">
                  <div class="font-bold">${product.nameAr || ''}</div>
                  <div class="text-sm text-gray-500 mb-1">${product.nameEn || ''}</div>
                  <div class="text-sm text-blue-700 font-bold">المتوفر في الفرع الرئيسي: ${getInventoryQuantityText(product, 'main') || '0'} ${getInventoryUnitName(product.inventoryUnitId) || ''}</div>
                </button>
              `).join('')}
              ${products.length === 0 ? '<div class="text-gray-500 py-4">لا توجد نتائج بحث</div>' : ''}
            </div>

            <div class="overflow-x-auto mb-4">
              <table>
                <thead>
                  <tr>
                    <th>اسم المنتج بالعربي</th>
                    <th>اسم المنتج بالإنجليزي</th>
                    <th>الكمية المصروفة</th>
                    <th>الوحدة</th>
                    <th>إزالة</th>
                  </tr>
                </thead>
                <tbody>
                  ${currentIssueVoucherDraft.items.length > 0 ? currentIssueVoucherDraft.items.map(item => {
                    const product = allProducts.find(p => p.id === item.productId);
                    return `
                      <tr>
                        <td>${product?.nameAr || ''}</td>
                        <td>${product?.nameEn || ''}</td>
                        <td>${Number(item.quantity || 0).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}</td>
                        <td>${getInventoryUnitName(product?.inventoryUnitId) || '-'}</td>
                        <td><button onclick="removeIssueProduct('${item.productId}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">حذف</button></td>
                      </tr>
                    `;
                  }).join('') : `
                    <tr>
                      <td colspan="5" class="text-center text-gray-500 py-6">لا توجد منتجات مضافة في سند الصرف</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>

            <div class="flex gap-3">
              <button onclick="submitIssueVoucher()" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">${isEditingIssue ? 'حفظ التعديل' : 'صرف'}</button>
              <button onclick="closeIssueVoucherModal()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إغلاق</button>
            </div>
          </div>
        </div>
      `;
    }

    function getEditingIssueOriginalItemQuantity(productId) {
      if (!editingIssueVoucherId) return 0;
      const issue = allInventoryIssues.find(item => item.id === editingIssueVoucherId);
      if (!issue || !Array.isArray(issue.items)) return 0;
      const item = issue.items.find(entry => entry.productId === productId);
      return item ? (parseFloat(item.quantity) || 0) : 0;
    }

    function renderIssueSection() {
      return `
        <div>
          <div class="flex flex-wrap justify-between items-center gap-3 mb-6">
            <h2 class="text-3xl font-bold text-blue-600">صرف</h2>
            <button onclick="openIssueVoucherModal()" class="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة سند صرف</button>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h3 class="text-2xl font-bold text-blue-600 mb-4">حركات المخزون</h3>
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>رقم السند</th>
                    <th>التاريخ</th>
                    <th>أمين المخزن</th>
                    <th>الكاشير</th>
                    <th>رقم الفاتورة</th>
                    <th>عدد المنتجات</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  ${allInventoryIssues.length > 0 ? allInventoryIssues.map(issue => `
                    <tr>
                      <td>${issue.voucherNumber || '-'}</td>
                      <td>${issue.timestamp ? `${formatDate(issue.timestamp)} ${formatTime(issue.timestamp)}` : '-'}</td>
                      <td>${issue.warehouseKeeper || '-'}</td>
                      <td>${issue.cashierName || '-'}</td>
                      <td>${issue.invoiceNumber || '-'}</td>
                      <td>${Array.isArray(issue.items) ? issue.items.length : 0}</td>
                      <td>
                        <div class="flex gap-2">
                          <button onclick="openEditIssueVoucher('${issue.id}')" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">تعديل</button>
                          <button onclick="confirmDeleteIssueVoucher('${issue.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">حذف</button>
                        </div>
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="7" class="text-center text-gray-500 py-8">لا توجد حركات صرف بعد</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
          ${isIssueVoucherModalOpen ? renderIssueVoucherModal() : ''}
        </div>
      `;
    }

    function handleIssueCashierSelection(value) {
      if (value === '__add_new__') {
        showAddIssueCashierModal();
        return;
      }
      if (value === '__edit_selected__') {
        if (!currentIssueVoucherDraft.cashierId) {
          showToast('اختر كاشير أولاً ثم أعد المحاولة', true);
          renderAccounting('issue');
          return;
        }
        showEditIssueCashierModal(currentIssueVoucherDraft.cashierId);
        return;
      }
      if (value === '__delete_selected__') {
        if (!currentIssueVoucherDraft.cashierId) {
          showToast('اختر كاشير أولاً ثم أعد المحاولة', true);
          renderAccounting('issue');
          return;
        }
        confirmDeleteIssueCashier(currentIssueVoucherDraft.cashierId);
        return;
      }
      currentIssueVoucherDraft.cashierId = value;
    }

    function showAddIssueCashierModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-md">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة كاشير</h2>
          <div>
            <label class="block mb-2 font-bold text-gray-700">اسم الكاشير</label>
            <input type="text" id="newIssueCashierName" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="addIssueCashierFromModal()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">إضافة</button>
            <button onclick="this.closest('.modal-overlay').remove(); renderAccounting('issue');" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function addIssueCashierFromModal() {
      const name = document.getElementById('newIssueCashierName').value.trim();
      if (!name) {
        showToast('الرجاء إدخال اسم الكاشير', true);
        return;
      }

      const result = await saveIssueCashier({ name });
      if (!result.success) return;
      currentIssueVoucherDraft.cashierId = result.id;
      document.querySelector('.modal-overlay')?.remove();
      showToast('تم إضافة الكاشير بنجاح');
      renderAccounting('issue');
    }

    function showEditIssueCashierModal(cashierId) {
      const cashier = allIssueCashiers.find(item => item.id === cashierId);
      if (!cashier) {
        showToast('الكاشير غير موجود', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-md">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تعديل اسم الكاشير</h2>
          <div>
            <label class="block mb-2 font-bold text-gray-700">اسم الكاشير</label>
            <input type="text" id="editIssueCashierName" value="${cashier.name || ''}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="saveEditedIssueCashier('${cashierId}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ</button>
            <button onclick="this.closest('.modal-overlay').remove(); renderAccounting('issue');" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function saveEditedIssueCashier(cashierId) {
      const name = document.getElementById('editIssueCashierName').value.trim();
      if (!name) {
        showToast('الرجاء إدخال اسم الكاشير', true);
        return;
      }

      try {
        await db.ref(`inventoryIssueCashiers/${cashierId}/name`).set(name);
        await loadData();
        document.querySelector('.modal-overlay')?.remove();
        showToast('تم تعديل اسم الكاشير');
        renderAccounting('issue');
      } catch (error) {
        console.error('Error editing issue cashier:', error);
        showToast('خطأ في تعديل اسم الكاشير', true);
      }
    }

    function confirmDeleteIssueCashier(cashierId) {
      const cashier = allIssueCashiers.find(item => item.id === cashierId);
      if (!cashier) {
        showToast('الكاشير غير موجود', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد حذف الكاشير</h2>
          <p class="text-gray-600 mb-6">هل تريد حذف "${cashier.name || ''}" من القائمة؟</p>
          <div class="flex gap-3">
            <button onclick="deleteIssueCashierConfirmed('${cashierId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove(); renderAccounting('issue');" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteIssueCashierConfirmed(cashierId) {
      try {
        await db.ref(`inventoryIssueCashiers/${cashierId}`).remove();
        await loadData();
        if (currentIssueVoucherDraft.cashierId === cashierId) {
          currentIssueVoucherDraft.cashierId = '';
        }
        document.querySelector('.modal-overlay')?.remove();
        showToast('تم حذف الكاشير');
        renderAccounting('issue');
      } catch (error) {
        console.error('Error deleting issue cashier:', error);
        showToast('خطأ في حذف الكاشير', true);
      }
    }

    function showIssueQuantityModal(productId) {
      const product = allProducts.find(item => item.id === productId);
      if (!product) return;
      const available = parseInventoryQuantity(product, 'main') + getEditingIssueOriginalItemQuantity(productId);
      const unitName = getInventoryUnitName(product.inventoryUnitId);

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-6 w-full max-w-md">
          <h3 class="text-xl font-bold text-blue-600 mb-2">${product.nameAr || ''}</h3>
          <p class="text-gray-700 mb-4">الكمية المتوفرة: <span class="font-bold">${Number(available).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}</span> ${unitName}</p>

          <input id="issueQuantityDisplay" type="text" value="" readonly class="w-full text-center text-3xl font-bold p-3 border-2 border-blue-300 rounded-lg mb-4">

          <div class="grid grid-cols-3 gap-2 mb-4">
            ${[
              ['٧', '7'], ['٨', '8'], ['٩', '9'],
              ['٤', '4'], ['٥', '5'], ['٦', '6'],
              ['١', '1'], ['٢', '2'], ['٣', '3'],
              ['٠', '0'], ['٫', '.'], ['⌫', 'delete']
            ].map(item => `
              <button onclick="handleIssueKeypadPress('${item[1]}')" class="bg-gray-100 hover:bg-gray-200 rounded-lg py-3 text-2xl font-bold">${item[0]}</button>
            `).join('')}
          </div>

          <div class="flex gap-3">
            <button onclick="addProductToIssue('${productId}')" class="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-700 transition">إضافة المنتج</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function handleIssueKeypadPress(value) {
      const display = document.getElementById('issueQuantityDisplay');
      if (!display) return;
      if (value === 'delete') {
        display.value = display.value.slice(0, -1);
        return;
      }
      if (value === '.') {
        if (!display.value.includes('.')) display.value += '.';
        return;
      }
      display.value += value;
    }

    function addProductToIssue(productId) {
      const display = document.getElementById('issueQuantityDisplay');
      const product = allProducts.find(item => item.id === productId);
      if (!display || !product) return;

      const normalized = normalizeDecimalInput(display.value);
      const quantity = parseFloat(normalized);
      if (isNaN(quantity) || quantity <= 0) {
        showToast('الرجاء إدخال كمية صحيحة', true);
        return;
      }

      const available = parseInventoryQuantity(product, 'main') + getEditingIssueOriginalItemQuantity(productId);
      const existingItem = currentIssueVoucherDraft.items.find(item => item.productId === productId);
      const existingQuantity = existingItem ? parseFloat(existingItem.quantity) || 0 : 0;
      if (quantity + existingQuantity > available) {
        showToast('الكمية المطلوبة أكبر من الكمية المتوفرة', true);
        return;
      }

      if (existingItem) {
        existingItem.quantity = parseFloat((existingQuantity + quantity).toFixed(3));
      } else {
        currentIssueVoucherDraft.items.push({
          productId,
          quantity: parseFloat(quantity.toFixed(3))
        });
      }

      document.querySelector('.modal-overlay')?.remove();
      issueProductSearchTerm = '';
      renderAccounting('issue');
    }

    function removeIssueProduct(productId) {
      currentIssueVoucherDraft.items = currentIssueVoucherDraft.items.filter(item => item.productId !== productId);
      renderAccounting('issue');
    }

    async function submitIssueVoucher() {
      const warehouseKeeper = (currentIssueVoucherDraft.warehouseKeeper || '').trim();
      const cashierId = currentIssueVoucherDraft.cashierId;
      const invoiceNumber = normalizeDecimalInput(currentIssueVoucherDraft.invoiceNumber || '');
      const items = Array.isArray(currentIssueVoucherDraft.items) ? currentIssueVoucherDraft.items : [];
      const isEditingIssue = Boolean(editingIssueVoucherId);
      const existingIssue = isEditingIssue ? allInventoryIssues.find(item => item.id === editingIssueVoucherId) : null;

      if (!warehouseKeeper) {
        showToast('الرجاء إدخال اسم أمين المخزن', true);
        return;
      }
      if (!cashierId) {
        showToast('الرجاء اختيار اسم الكاشير', true);
        return;
      }
      if (!invoiceNumber) {
        showToast('الرجاء إدخال رقم الفاتورة', true);
        return;
      }
      if (items.length === 0) {
        showToast('الرجاء إضافة منتج واحد على الأقل', true);
        return;
      }
      if (isEditingIssue && !existingIssue) {
        showToast('تعذر العثور على سند الصرف المطلوب تعديله', true);
        return;
      }

      const oldItemsByProductId = {};
      if (existingIssue && Array.isArray(existingIssue.items)) {
        existingIssue.items.forEach(item => {
          const productId = item.productId;
          if (!productId) return;
          oldItemsByProductId[productId] = (oldItemsByProductId[productId] || 0) + (parseFloat(item.quantity) || 0);
        });
      }

      for (const item of items) {
        const product = allProducts.find(p => p.id === item.productId);
        if (!product) {
          showToast('تم العثور على منتج غير صالح في السند', true);
          return;
        }
        const requestedQuantity = parseFloat(item.quantity) || 0;
        if (requestedQuantity <= 0) {
          showToast('الرجاء إدخال كمية صحيحة لكل منتج', true);
          return;
        }
        const availableMainQuantity = parseInventoryQuantity(product, 'main') + (oldItemsByProductId[item.productId] || 0);
        if (requestedQuantity > availableMainQuantity) {
          showToast(`الكمية غير متوفرة للمنتج: ${product.nameAr || product.nameEn || ''}`, true);
          return;
        }
      }

      try {
        const issueId = isEditingIssue ? editingIssueVoucherId : generateId();
        const voucherNumber = isEditingIssue ? (existingIssue.voucherNumber || await generateInventoryIssueNumber()) : await generateInventoryIssueNumber();
        const cashier = allIssueCashiers.find(item => item.id === cashierId);
        const timestamp = isEditingIssue ? (existingIssue.timestamp || Date.now()) : Date.now();
        const issueItems = [];
        const newItemsByProductId = {};

        const updates = {};
        items.forEach(item => {
          const product = allProducts.find(p => p.id === item.productId);
          const quantity = parseFloat(item.quantity) || 0;
          if (!product) return;

          newItemsByProductId[product.id] = (newItemsByProductId[product.id] || 0) + quantity;

          issueItems.push({
            productId: product.id,
            nameAr: product.nameAr || '',
            nameEn: product.nameEn || '',
            quantity: parseFloat(quantity.toFixed(3)),
            unitId: product.inventoryUnitId || null,
            unitName: getInventoryUnitName(product.inventoryUnitId) || ''
          });
        });

        const productIds = new Set([
          ...Object.keys(oldItemsByProductId),
          ...Object.keys(newItemsByProductId)
        ]);

        for (const productId of productIds) {
          const product = allProducts.find(p => p.id === productId);
          if (!product) continue;

          const currentMainQuantity = ensureInventoryBranchQuantities(product).main;
          const oldQuantity = oldItemsByProductId[productId] || 0;
          const newQuantity = newItemsByProductId[productId] || 0;
          const mainQuantityAfterRevert = currentMainQuantity + oldQuantity;
          const finalMainQuantity = parseFloat((mainQuantityAfterRevert - newQuantity).toFixed(3));

          if (finalMainQuantity < -0.000001) {
            showToast(`الكمية غير كافية للمنتج: ${product.nameAr || product.nameEn || ''}`, true);
            return;
          }

          updates[`products/${product.id}/inventoryBranchQuantities/main`] = Math.max(0, finalMainQuantity);
          updates[`products/${product.id}/inventoryQuantity`] = Math.max(0, finalMainQuantity);
          updates[`products/${product.id}/stock`] = Math.max(0, finalMainQuantity);
        }

        updates[`inventoryIssues/${issueId}`] = {
          id: issueId,
          voucherNumber,
          warehouseKeeper,
          cashierId,
          cashierName: cashier?.name || '',
          invoiceNumber,
          items: issueItems,
          timestamp,
          ...(isEditingIssue ? { updatedAt: Date.now() } : {})
        };

        await db.ref().update(updates);
        showToast(isEditingIssue ? `تم تعديل سند الصرف رقم: ${voucherNumber}` : `تم الصرف بنجاح. رقم السند: ${voucherNumber}`);
        isIssueVoucherModalOpen = false;
        resetIssueVoucherDraft(false);
        renderAccounting('issue');
      } catch (error) {
        console.error('Error submitting issue voucher:', error);
        showToast('حدث خطأ أثناء تنفيذ الصرف', true);
      }
    }

    function confirmDeleteIssueVoucher(issueId) {
      const issue = allInventoryIssues.find(item => item.id === issueId);
      if (!issue) {
        showToast('سند الصرف غير موجود', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد حذف سند الصرف</h2>
          <p class="text-gray-600 mb-6">هل تريد حذف السند رقم "${issue.voucherNumber || '-'}"؟ سيتم إرجاع الكميات للمخزون.</p>
          <div class="flex gap-3">
            <button onclick="deleteIssueVoucherConfirmed('${issueId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteIssueVoucherConfirmed(issueId) {
      const issue = allInventoryIssues.find(item => item.id === issueId);
      if (!issue) {
        showToast('سند الصرف غير موجود', true);
        return;
      }

      try {
        const updates = {};
        const issueItems = Array.isArray(issue.items) ? issue.items : [];

        issueItems.forEach(item => {
          const product = allProducts.find(p => p.id === item.productId);
          if (!product) return;

          const currentQuantities = ensureInventoryBranchQuantities(product);
          const restoredMainQuantity = parseFloat((currentQuantities.main + (parseFloat(item.quantity) || 0)).toFixed(3));
          updates[`products/${product.id}/inventoryBranchQuantities/main`] = restoredMainQuantity;
          updates[`products/${product.id}/inventoryQuantity`] = restoredMainQuantity;
          updates[`products/${product.id}/stock`] = restoredMainQuantity;
        });

        updates[`inventoryIssues/${issueId}`] = null;

        await db.ref().update(updates);
        document.querySelector('.modal-overlay')?.remove();
        if (editingIssueVoucherId === issueId) {
          isIssueVoucherModalOpen = false;
          resetIssueVoucherDraft(false);
        }
        showToast('تم حذف سند الصرف وإرجاع الكميات');
        renderAccounting('issue');
      } catch (error) {
        console.error('Error deleting issue voucher:', error);
        showToast('حدث خطأ أثناء حذف سند الصرف', true);
      }
    }

    // Transfer Section
    function resetTransferVoucherDraft(shouldRender = true) {
      currentTransferVoucherDraft = {
        warehouseKeeper: '',
        targetBranchId: '',
        items: []
      };
      editingTransferVoucherId = '';
      transferProductSearchTerm = '';
      if (shouldRender) renderAccounting('transfer');
    }

    function openTransferVoucherModal() {
      resetTransferVoucherDraft(false);
      isTransferVoucherModalOpen = true;
      renderAccounting('transfer');
    }

    function openEditTransferVoucher(transferId) {
      const transfer = allInventoryTransfers.find(item => item.id === transferId);
      if (!transfer) {
        showToast('سند التحويل غير موجود', true);
        return;
      }

      currentTransferVoucherDraft = {
        warehouseKeeper: transfer.warehouseKeeper || '',
        targetBranchId: transfer.targetBranchId || '',
        items: Array.isArray(transfer.items) ? transfer.items.map(item => ({
          productId: item.productId,
          quantity: parseFloat(item.quantity) || 0
        })) : []
      };
      editingTransferVoucherId = transfer.id;
      transferProductSearchTerm = '';
      isTransferVoucherModalOpen = true;
      renderAccounting('transfer');
    }

    function closeTransferVoucherModal() {
      isTransferVoucherModalOpen = false;
      editingTransferVoucherId = '';
      transferProductSearchTerm = '';
      renderAccounting('transfer');
    }

    function setTransferProductSearchTerm(value) {
      transferProductSearchTerm = value;
      renderAccounting('transfer');
    }

    function renderTransferVoucherModal() {
      const isEditingTransfer = Boolean(editingTransferVoucherId);
      const searchTerm = (transferProductSearchTerm || '').toLowerCase();
      const products = getTrackedInventoryProducts().filter(product => {
        const searchText = `${product.nameAr || ''} ${product.nameEn || ''}`.toLowerCase();
        return searchText.includes(searchTerm);
      });

      return `
        <div class="transfer-voucher-overlay" onclick="if(event.target === this) closeTransferVoucherModal()" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); z-index: 900; display: flex; align-items: center; justify-content: center; padding: 20px;">
          <div class="modal-content p-6 w-full max-w-6xl max-h-[92vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-2xl font-bold text-blue-600">${isEditingTransfer ? 'تعديل سند تحويل' : 'تحويل جديد'}</h3>
              <button onclick="closeTransferVoucherModal()" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition">✕</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block mb-2 font-bold text-gray-700">اسم أمين المخزن</label>
                <input type="text" value="${currentTransferVoucherDraft.warehouseKeeper || ''}" oninput="currentTransferVoucherDraft.warehouseKeeper = this.value" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
              </div>
              <div>
                <label class="block mb-2 font-bold text-gray-700">الفرع المحوّل إليه (من الفرع الرئيسي)</label>
                <select onchange="currentTransferVoucherDraft.targetBranchId = this.value" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                  <option value="">-- اختر الفرع --</option>
                  ${getInventoryBranchOptionsHtml(currentTransferVoucherDraft.targetBranchId, false, false)}
                </select>
              </div>
            </div>

            <div class="mb-4">
              <label class="block mb-2 font-bold text-gray-700">بحث عن منتج</label>
              <div class="flex gap-2">
                <input id="transferProductSearchField" type="text" value="${transferProductSearchTerm || ''}" oninput="setTransferProductSearchTerm(this.value)" placeholder="🔍 ابحث عن منتج لإضافته إلى سند التحويل" class="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <button onclick="setTransferProductSearchTerm(document.getElementById('transferProductSearchField').value)" class="bg-blue-600 text-white px-5 rounded-lg font-bold hover:bg-blue-700 transition">بحث</button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto mb-6">
              ${products.map(product => `
                <button onclick="showTransferQuantityModal('${product.id}')" class="border-2 border-gray-200 rounded-lg p-4 text-right hover:border-blue-500 hover:bg-blue-50 transition">
                  <div class="font-bold">${product.nameAr || ''}</div>
                  <div class="text-sm text-gray-500 mb-1">${product.nameEn || ''}</div>
                  <div class="text-sm text-blue-700 font-bold">المتوفر في الفرع الرئيسي: ${getInventoryQuantityText(product, 'main') || '0'} ${getInventoryUnitName(product.inventoryUnitId) || ''}</div>
                </button>
              `).join('')}
              ${products.length === 0 ? '<div class="text-gray-500 py-4">لا توجد نتائج بحث</div>' : ''}
            </div>

            <div class="overflow-x-auto mb-4">
              <table>
                <thead>
                  <tr>
                    <th>اسم المنتج بالعربي</th>
                    <th>اسم المنتج بالإنجليزي</th>
                    <th>الكمية المحوّلة</th>
                    <th>الوحدة</th>
                    <th>إزالة</th>
                  </tr>
                </thead>
                <tbody>
                  ${currentTransferVoucherDraft.items.length > 0 ? currentTransferVoucherDraft.items.map(item => {
                    const product = allProducts.find(p => p.id === item.productId);
                    return `
                      <tr>
                        <td>${product?.nameAr || ''}</td>
                        <td>${product?.nameEn || ''}</td>
                        <td>${formatInventoryDecimal(item.quantity || 0)}</td>
                        <td>${getInventoryUnitName(product?.inventoryUnitId) || '-'}</td>
                        <td><button onclick="removeTransferProduct('${item.productId}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">حذف</button></td>
                      </tr>
                    `;
                  }).join('') : `
                    <tr>
                      <td colspan="5" class="text-center text-gray-500 py-6">لا توجد منتجات مضافة في سند التحويل</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>

            <div class="flex gap-3">
              <button onclick="submitTransferVoucher()" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">${isEditingTransfer ? 'حفظ التعديل' : 'تحويل'}</button>
              <button onclick="closeTransferVoucherModal()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إغلاق</button>
            </div>
          </div>
        </div>
      `;
    }

    function getEditingTransferOriginalItemQuantity(productId) {
      if (!editingTransferVoucherId) return 0;
      const transfer = allInventoryTransfers.find(item => item.id === editingTransferVoucherId);
      if (!transfer || !Array.isArray(transfer.items)) return 0;
      const item = transfer.items.find(entry => entry.productId === productId);
      return item ? (parseFloat(item.quantity) || 0) : 0;
    }

    function renderTransferSection() {
      return `
        <div>
          <div class="flex flex-wrap justify-between items-center gap-3 mb-6">
            <h2 class="text-3xl font-bold text-blue-600">تحويلات</h2>
            <button onclick="openTransferVoucherModal()" class="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition">➕ تحويل جديد</button>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h3 class="text-2xl font-bold text-blue-600 mb-4">حركات التحويل</h3>
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>رقم السند</th>
                    <th>التاريخ</th>
                    <th>أمين المخزن</th>
                    <th>إلى فرع</th>
                    <th>عدد المنتجات</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  ${allInventoryTransfers.length > 0 ? allInventoryTransfers.map(transfer => `
                    <tr>
                      <td>${transfer.voucherNumber || '-'}</td>
                      <td>${transfer.timestamp ? `${formatDate(transfer.timestamp)} ${formatTime(transfer.timestamp)}` : '-'}</td>
                      <td>${transfer.warehouseKeeper || '-'}</td>
                      <td>${transfer.targetBranchName || '-'}</td>
                      <td>${Array.isArray(transfer.items) ? transfer.items.length : 0}</td>
                      <td>
                        <div class="flex gap-2">
                          <button onclick="openEditTransferVoucher('${transfer.id}')" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">تعديل</button>
                          <button onclick="confirmDeleteTransferVoucher('${transfer.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">حذف</button>
                        </div>
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="6" class="text-center text-gray-500 py-8">لا توجد حركات تحويل بعد</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
          ${isTransferVoucherModalOpen ? renderTransferVoucherModal() : ''}
        </div>
      `;
    }

    function showTransferQuantityModal(productId) {
      const product = allProducts.find(item => item.id === productId);
      if (!product) return;
      const available = parseInventoryQuantity(product, 'main') + getEditingTransferOriginalItemQuantity(productId);
      const unitName = getInventoryUnitName(product.inventoryUnitId);

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-6 w-full max-w-md">
          <h3 class="text-xl font-bold text-blue-600 mb-2">${product.nameAr || ''}</h3>
          <p class="text-gray-700 mb-4">الكمية المتوفرة في الفرع الرئيسي: <span class="font-bold">${formatInventoryDecimal(available)}</span> ${unitName}</p>

          <input id="transferQuantityDisplay" type="text" value="" readonly class="w-full text-center text-3xl font-bold p-3 border-2 border-blue-300 rounded-lg mb-4">

          <div class="grid grid-cols-3 gap-2 mb-4">
            ${[
              ['٧', '7'], ['٨', '8'], ['٩', '9'],
              ['٤', '4'], ['٥', '5'], ['٦', '6'],
              ['١', '1'], ['٢', '2'], ['٣', '3'],
              ['٠', '0'], ['٫', '.'], ['⌫', 'delete']
            ].map(item => `
              <button onclick="handleTransferKeypadPress('${item[1]}')" class="bg-gray-100 hover:bg-gray-200 rounded-lg py-3 text-2xl font-bold">${item[0]}</button>
            `).join('')}
          </div>

          <div class="flex gap-3">
            <button onclick="addProductToTransfer('${productId}')" class="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-700 transition">إضافة المنتج</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function handleTransferKeypadPress(value) {
      const display = document.getElementById('transferQuantityDisplay');
      if (!display) return;
      if (value === 'delete') {
        display.value = display.value.slice(0, -1);
        return;
      }
      if (value === '.') {
        if (!display.value.includes('.')) display.value += '.';
        return;
      }
      display.value += value;
    }

    function addProductToTransfer(productId) {
      const display = document.getElementById('transferQuantityDisplay');
      const product = allProducts.find(item => item.id === productId);
      if (!display || !product) return;

      const normalized = normalizeDecimalInput(display.value);
      const quantity = parseFloat(normalized);
      if (isNaN(quantity) || quantity <= 0) {
        showToast('الرجاء إدخال كمية صحيحة', true);
        return;
      }

      const available = parseInventoryQuantity(product, 'main') + getEditingTransferOriginalItemQuantity(productId);
      const existingItem = currentTransferVoucherDraft.items.find(item => item.productId === productId);
      const existingQuantity = existingItem ? parseFloat(existingItem.quantity) || 0 : 0;
      if (quantity + existingQuantity > available) {
        showToast('الكمية المطلوبة أكبر من الكمية المتوفرة في الفرع الرئيسي', true);
        return;
      }

      if (existingItem) {
        existingItem.quantity = parseFloat((existingQuantity + quantity).toFixed(3));
      } else {
        currentTransferVoucherDraft.items.push({
          productId,
          quantity: parseFloat(quantity.toFixed(3))
        });
      }

      document.querySelector('.modal-overlay')?.remove();
      transferProductSearchTerm = '';
      renderAccounting('transfer');
    }

    function removeTransferProduct(productId) {
      currentTransferVoucherDraft.items = currentTransferVoucherDraft.items.filter(item => item.productId !== productId);
      renderAccounting('transfer');
    }

    async function submitTransferVoucher() {
      const warehouseKeeper = (currentTransferVoucherDraft.warehouseKeeper || '').trim();
      const targetBranchId = currentTransferVoucherDraft.targetBranchId;
      const items = Array.isArray(currentTransferVoucherDraft.items) ? currentTransferVoucherDraft.items : [];
      const isEditingTransfer = Boolean(editingTransferVoucherId);
      const existingTransfer = isEditingTransfer ? allInventoryTransfers.find(item => item.id === editingTransferVoucherId) : null;
      const oldTargetBranchId = existingTransfer?.targetBranchId || '';

      if (!warehouseKeeper) {
        showToast('الرجاء إدخال اسم أمين المخزن', true);
        return;
      }
      if (!targetBranchId) {
        showToast('الرجاء اختيار الفرع المحوّل إليه', true);
        return;
      }
      if (targetBranchId === 'main') {
        showToast('التحويل يكون من الفرع الرئيسي إلى الفروع الأخرى فقط', true);
        return;
      }
      if (items.length === 0) {
        showToast('الرجاء إضافة منتج واحد على الأقل', true);
        return;
      }
      if (isEditingTransfer && !existingTransfer) {
        showToast('تعذر العثور على سند التحويل المطلوب تعديله', true);
        return;
      }

      const oldItemsByProductId = {};
      if (existingTransfer && Array.isArray(existingTransfer.items)) {
        existingTransfer.items.forEach(item => {
          const productId = item.productId;
          if (!productId) return;
          oldItemsByProductId[productId] = (oldItemsByProductId[productId] || 0) + (parseFloat(item.quantity) || 0);
        });
      }

      for (const item of items) {
        const product = allProducts.find(p => p.id === item.productId);
        if (!product) {
          showToast('تم العثور على منتج غير صالح في السند', true);
          return;
        }
        const requestedQuantity = parseFloat(item.quantity) || 0;
        if (requestedQuantity <= 0) {
          showToast('الرجاء إدخال كمية صحيحة لكل منتج', true);
          return;
        }

        const availableMainQuantity = parseInventoryQuantity(product, 'main') + (oldItemsByProductId[item.productId] || 0);
        if (requestedQuantity > availableMainQuantity) {
          showToast(`الكمية غير متوفرة للمنتج: ${product.nameAr || product.nameEn || ''}`, true);
          return;
        }
      }

      try {
        const transferId = isEditingTransfer ? editingTransferVoucherId : generateId();
        const voucherNumber = isEditingTransfer ? (existingTransfer.voucherNumber || await generateInventoryTransferNumber()) : await generateInventoryTransferNumber();
        const targetBranchName = getInventoryBranchName(targetBranchId);
        const timestamp = isEditingTransfer ? (existingTransfer.timestamp || Date.now()) : Date.now();
        const updates = {};
        const transferItems = [];
        const newItemsByProductId = {};

        items.forEach(item => {
          const product = allProducts.find(p => p.id === item.productId);
          const quantity = parseFloat(item.quantity) || 0;
          if (!product) return;
          newItemsByProductId[product.id] = (newItemsByProductId[product.id] || 0) + quantity;

          transferItems.push({
            productId: product.id,
            nameAr: product.nameAr || '',
            nameEn: product.nameEn || '',
            quantity: parseFloat(quantity.toFixed(3)),
            unitId: product.inventoryUnitId || null,
            unitName: getInventoryUnitName(product.inventoryUnitId) || ''
          });
        });

        const productIds = new Set([
          ...Object.keys(oldItemsByProductId),
          ...Object.keys(newItemsByProductId)
        ]);

        for (const productId of productIds) {
          const product = allProducts.find(p => p.id === productId);
          if (!product) continue;

          const quantities = ensureInventoryBranchQuantities(product);
          const oldQuantity = oldItemsByProductId[productId] || 0;
          const newQuantity = newItemsByProductId[productId] || 0;

          const mainAfterRevert = quantities.main + oldQuantity;
          if (newQuantity > mainAfterRevert + 0.000001) {
            showToast(`الكمية غير متوفرة للمنتج: ${product.nameAr || product.nameEn || ''}`, true);
            return;
          }

          const finalMainQuantity = parseFloat((mainAfterRevert - newQuantity).toFixed(3));
          if (finalMainQuantity < -0.000001) {
            showToast(`الكمية غير كافية للمنتج: ${product.nameAr || product.nameEn || ''}`, true);
            return;
          }

          updates[`products/${product.id}/inventoryBranchQuantities/main`] = Math.max(0, finalMainQuantity);
          updates[`products/${product.id}/inventoryQuantity`] = Math.max(0, finalMainQuantity);
          updates[`products/${product.id}/stock`] = Math.max(0, finalMainQuantity);

          if (oldTargetBranchId) {
            const oldTargetCurrentQuantity = quantities[oldTargetBranchId] || 0;
            const oldTargetAfterRevert = parseFloat((oldTargetCurrentQuantity - oldQuantity).toFixed(3));
            if (oldTargetAfterRevert < -0.000001) {
              showToast(`تعذر تعديل السند بسبب نقص رصيد الفرع القديم للمنتج: ${product.nameAr || product.nameEn || ''}`, true);
              return;
            }

            if (oldTargetBranchId === targetBranchId) {
              const finalTargetQuantity = parseFloat((oldTargetAfterRevert + newQuantity).toFixed(3));
              updates[`products/${product.id}/inventoryBranchQuantities/${targetBranchId}`] = Math.max(0, finalTargetQuantity);
            } else {
              updates[`products/${product.id}/inventoryBranchQuantities/${oldTargetBranchId}`] = Math.max(0, oldTargetAfterRevert);
              const newTargetCurrentQuantity = quantities[targetBranchId] || 0;
              const finalNewTargetQuantity = parseFloat((newTargetCurrentQuantity + newQuantity).toFixed(3));
              updates[`products/${product.id}/inventoryBranchQuantities/${targetBranchId}`] = Math.max(0, finalNewTargetQuantity);
            }
          } else {
            const newTargetCurrentQuantity = quantities[targetBranchId] || 0;
            const finalNewTargetQuantity = parseFloat((newTargetCurrentQuantity + newQuantity).toFixed(3));
            updates[`products/${product.id}/inventoryBranchQuantities/${targetBranchId}`] = Math.max(0, finalNewTargetQuantity);
          }
        }

        updates[`inventoryTransfers/${transferId}`] = {
          id: transferId,
          voucherNumber,
          warehouseKeeper,
          targetBranchId,
          targetBranchName,
          items: transferItems,
          timestamp,
          ...(isEditingTransfer ? { updatedAt: Date.now() } : {})
        };

        await db.ref().update(updates);
        showToast(isEditingTransfer ? `تم تعديل سند التحويل رقم: ${voucherNumber}` : `تم التحويل بنجاح. رقم السند: ${voucherNumber}`);
        isTransferVoucherModalOpen = false;
        resetTransferVoucherDraft(false);
        renderAccounting('transfer');
      } catch (error) {
        console.error('Error submitting transfer voucher:', error);
        showToast('حدث خطأ أثناء تنفيذ التحويل', true);
      }
    }

    function confirmDeleteTransferVoucher(transferId) {
      const transfer = allInventoryTransfers.find(item => item.id === transferId);
      if (!transfer) {
        showToast('سند التحويل غير موجود', true);
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد حذف سند التحويل</h2>
          <p class="text-gray-600 mb-6">هل تريد حذف السند رقم "${transfer.voucherNumber || '-'}"؟ سيتم التراجع عن التحويل وإرجاع الكميات.</p>
          <div class="flex gap-3">
            <button onclick="deleteTransferVoucherConfirmed('${transferId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteTransferVoucherConfirmed(transferId) {
      const transfer = allInventoryTransfers.find(item => item.id === transferId);
      if (!transfer) {
        showToast('سند التحويل غير موجود', true);
        return;
      }

      try {
        const updates = {};
        const targetBranchId = transfer.targetBranchId;
        const transferItems = Array.isArray(transfer.items) ? transfer.items : [];

        for (const item of transferItems) {
          const product = allProducts.find(p => p.id === item.productId);
          if (!product) continue;

          const quantity = parseFloat(item.quantity) || 0;
          const quantities = ensureInventoryBranchQuantities(product);
          const targetCurrentQuantity = quantities[targetBranchId] || 0;
          const restoredTargetQuantity = parseFloat((targetCurrentQuantity - quantity).toFixed(3));
          if (restoredTargetQuantity < -0.000001) {
            showToast(`تعذر حذف السند بسبب نقص رصيد الفرع للمنتج: ${product.nameAr || product.nameEn || ''}`, true);
            return;
          }

          const restoredMainQuantity = parseFloat((quantities.main + quantity).toFixed(3));
          updates[`products/${product.id}/inventoryBranchQuantities/main`] = restoredMainQuantity;
          updates[`products/${product.id}/inventoryBranchQuantities/${targetBranchId}`] = Math.max(0, restoredTargetQuantity);
          updates[`products/${product.id}/inventoryQuantity`] = restoredMainQuantity;
          updates[`products/${product.id}/stock`] = restoredMainQuantity;
        }

        updates[`inventoryTransfers/${transferId}`] = null;
        await db.ref().update(updates);
        document.querySelector('.modal-overlay')?.remove();
        if (editingTransferVoucherId === transferId) {
          isTransferVoucherModalOpen = false;
          resetTransferVoucherDraft(false);
        }
        showToast('تم حذف سند التحويل والتراجع عن الكميات');
        renderAccounting('transfer');
      } catch (error) {
        console.error('Error deleting transfer voucher:', error);
        showToast('حدث خطأ أثناء حذف سند التحويل', true);
      }
    }

    // Devices and Cashiers Section
    function renderDevicesSection() {
      // Get current device info
      const currentDeviceId = getDeviceId();
      const currentDeviceBranch = localStorage.getItem('deviceBranch');
      
      // Send heartbeat to mark device as online
      updateDeviceHeartbeat(currentDeviceId, currentDeviceBranch);
      
      return `
        <div>
          <h2 class="text-3xl font-bold text-blue-600 mb-6">الأجهزة والكاشير</h2>
          
          <!-- Current Device Section -->
          <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">🖥️ الجهاز الحالي</h3>
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="text-sm text-gray-600">معرف الجهاز</div>
                  <div class="font-bold text-gray-800">${currentDeviceId.substr(0, 20)}...</div>
                </div>
                <div>
                  <div class="text-sm text-gray-600">الفرع المحدد</div>
                  <div class="font-bold text-blue-600">${currentDeviceBranch || 'غير محدد'}</div>
                </div>
              </div>
              <div class="mt-4">
                <label class="block mb-2 font-bold text-gray-700">تحديد الفرع</label>
                <div class="flex gap-2">
                  <select id="currentDeviceBranch" class="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                    <option value="">اختر الفرع</option>
                    <option value="الفرع الرئيسي" ${currentDeviceBranch === 'الفرع الرئيسي' ? 'selected' : ''}>الفرع الرئيسي</option>
                    <option value="المخزن الرئيسي" ${currentDeviceBranch === 'المخزن الرئيسي' ? 'selected' : ''}>المخزن الرئيسي</option>
                    <option value="أبو الحصانية" ${currentDeviceBranch === 'أبو الحصانية' ? 'selected' : ''}>أبو الحصانية</option>
                    <option value="اليرموك" ${currentDeviceBranch === 'اليرموك' ? 'selected' : ''}>اليرموك</option>
                  </select>
                  <button onclick="assignCurrentDeviceBranch()" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">حفظ الفرع والموقع</button>
                </div>
                <div class="text-xs text-gray-500 mt-2">للتعرف التلقائي من الهاتف: افتح هذه الشاشة من جهاز الفرع نفسه، اختر الفرع، ثم اسمح بحفظ الموقع.</div>
              </div>
            </div>
          </div>
          
          <!-- All Devices Section -->
          <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">جميع الأجهزة</h3>
            <div id="devicesListContainer">
              ${renderDevicesList()}
            </div>
          </div>
          
          <!-- Cashiers Section -->
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800">الكاشيرات</h3>
              <button onclick="showAddCashierModal()" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">➕ إضافة كاشير</button>
            </div>
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>الاسم</th>
                    <th>الرمز</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  ${allCashiers.map(cashier => `
                    <tr>
                      <td>${cashier.name}</td>
                      <td>${cashier.code}</td>
                      <td>
                        <button onclick="editCashier('${cashier.id}')" class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition">تعديل</button>
                        <button onclick="confirmDeleteCashier('${cashier.id}')" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">حذف</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }
    
    function getKnownRegisteredDevices() {
      if (allRegisteredDevices.length > 0) return allRegisteredDevices;
      try {
        return Object.entries(JSON.parse(localStorage.getItem('allDevices') || '{}')).map(([id, data]) => ({ id, ...data }));
      } catch (error) {
        return [];
      }
    }

    function getDeviceLocationText(data) {
      const latitude = parseFloat(data.latitude);
      const longitude = parseFloat(data.longitude);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return 'الموقع غير محفوظ';
      const accuracy = parseFloat(data.accuracy);
      return `الموقع محفوظ${Number.isFinite(accuracy) ? ` - الدقة ${Math.round(accuracy)}م` : ''}`;
    }

    function getCurrentDeviceLocation() {
      return new Promise(resolve => {
        if (!navigator.geolocation) {
          resolve(null);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          position => resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            capturedAt: Date.now()
          }),
          () => resolve(null),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
      });
    }

    function renderDevicesList() {
      const devices = getKnownRegisteredDevices();
      const currentTime = Date.now();
      const onlineThreshold = 5 * 60 * 1000; // 5 minutes
      
      const devicesList = devices.map((data) => {
        const deviceId = data.id;
        const isOnline = data.lastSeen && (currentTime - data.lastSeen) < onlineThreshold;
        const isCurrent = deviceId === getDeviceId();
        
        return `
          <div class="bg-gray-50 p-4 rounded-lg mb-2 ${isCurrent ? 'border-2 border-blue-500' : ''}">
            <div class="flex justify-between items-center">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <div class="font-bold">${deviceId.substr(0, 25)}...</div>
                  ${isCurrent ? '<span class="text-xs bg-blue-600 text-white px-2 py-1 rounded">الجهاز الحالي</span>' : ''}
                  ${isOnline ? '<span class="text-xs bg-green-600 text-white px-2 py-1 rounded">متصل</span>' : '<span class="text-xs bg-gray-400 text-white px-2 py-1 rounded">غير متصل</span>'}
                </div>
                <div class="text-sm text-gray-600 mt-1">
                  الفرع: <span class="font-bold text-blue-600">${data.branch || 'غير محدد'}</span>
                </div>
                <div class="text-xs text-gray-500 mt-1">${getDeviceLocationText(data)}</div>
              </div>
              <button onclick="unassignDevice('${deviceId}')" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">إلغاء الربط</button>
            </div>
          </div>
        `;
      }).join('');
      
      return devicesList || '<div class="text-center text-gray-400 py-4">لا توجد أجهزة معرفة</div>';
    }
    
    async function assignCurrentDeviceBranch() {
      const branch = document.getElementById('currentDeviceBranch').value;
      
      if (!branch) {
        showToast('الرجاء اختيار فرع', true);
        return;
      }
      
      const deviceId = getDeviceId();
      localStorage.setItem('deviceBranch', branch);
      const location = await getCurrentDeviceLocation();
      
      // Update devices list
      const devices = JSON.parse(localStorage.getItem('allDevices') || '{}');
      devices[deviceId] = {
        id: deviceId,
        branch: branch,
        lastSeen: Date.now(),
        updatedAt: Date.now(),
        userAgent: navigator.userAgent,
        ...(location || {})
      };
      localStorage.setItem('allDevices', JSON.stringify(devices));

      await db.ref(`registeredDevices/${deviceId}`).update(devices[deviceId]);
      
      showToast(location ? 'تم تحديد الفرع وحفظ موقع الجهاز بنجاح' : 'تم تحديد الفرع، لكن لم يتم حفظ الموقع. اسمح بالموقع حتى تتعرف الهواتف على أقرب جهاز بدقة.', !location);
      renderAccounting('devices');
    }
    
    function updateDeviceHeartbeat(deviceId, branch) {
      if (!branch) return;
      const now = Date.now();
      
      const devices = JSON.parse(localStorage.getItem('allDevices') || '{}');
      devices[deviceId] = {
        ...(devices[deviceId] || {}),
        id: deviceId,
        branch: branch,
        lastSeen: now,
        userAgent: navigator.userAgent
      };
      localStorage.setItem('allDevices', JSON.stringify(devices));

      if (now - lastDeviceHeartbeatAt < 60000) return;
      lastDeviceHeartbeatAt = now;
      db.ref(`registeredDevices/${deviceId}`).update({
        id: deviceId,
        branch,
        lastSeen: now,
        userAgent: navigator.userAgent
      }).catch(error => console.warn('Device heartbeat skipped:', error));
    }
    
    function unassignDevice(deviceId) {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد إلغاء الربط</h2>
          <p class="text-gray-600 mb-6">هل أنت متأكد من إلغاء ربط هذا الجهاز؟</p>
          <div class="flex gap-3">
            <button onclick="confirmUnassignDevice('${deviceId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    
    async function confirmUnassignDevice(deviceId) {
      const isCurrentDevice = deviceId === getDeviceId();
      const devices = JSON.parse(localStorage.getItem('allDevices') || '{}');
      delete devices[deviceId];
      localStorage.setItem('allDevices', JSON.stringify(devices));
      
      if (isCurrentDevice) {
        localStorage.removeItem('deviceBranch');
        localStorage.removeItem('deviceId');
      }

      try {
        await db.ref(`registeredDevices/${deviceId}`).remove();
      } catch (error) {
        console.warn('Unable to remove registered device from Firebase:', error);
      }
      
      document.querySelector('.modal-overlay').remove();
      showToast(isCurrentDevice ? 'تم إلغاء ربط هذا الجهاز. يرجى تعريفه مرة أخرى' : 'تم إلغاء ربط الجهاز');
      renderAccounting('devices');
    }

    function showAddCashierModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">إضافة كاشير جديد</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم</label>
              <input type="text" id="newCashierName" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">الرمز</label>
              <div class="flex gap-2">
                <input type="text" id="newCashierCode" class="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                <button onclick="generateCashierCode()" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition">إنشاء</button>
              </div>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="addCashier()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">إضافة</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    function generateCashierCode() {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      document.getElementById('newCashierCode').value = code;
    }

    async function addCashier() {
      const name = document.getElementById('newCashierName').value.trim();
      const code = document.getElementById('newCashierCode').value.trim();
      
      if (!name || !code) {
        showToast('الرجاء إدخال الاسم والرمز', true);
        return;
      }
      
      const cashier = { name, code };
      
      const success = await saveCashier(cashier);
      if (success) {
        showToast('تم إضافة الكاشير بنجاح');
        document.querySelector('.modal-overlay').remove();
        renderAccounting('devices');
      }
    }

    function editCashier(cashierId) {
      const cashier = allCashiers.find(c => c.id === cashierId);
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">تعديل الكاشير</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-bold text-gray-700">الاسم</label>
              <input type="text" id="editCashierName" value="${cashier.name}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
            <div>
              <label class="block mb-2 font-bold text-gray-700">الرمز</label>
              <input type="text" id="editCashierCode" value="${cashier.code}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="saveEditedCashier('${cashierId}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function saveEditedCashier(cashierId) {
      const name = document.getElementById('editCashierName').value.trim();
      const code = document.getElementById('editCashierCode').value.trim();
      
      if (!name || !code) {
        showToast('الرجاء إدخال الاسم والرمز', true);
        return;
      }
      
      const cashier = allCashiers.find(c => c.id === cashierId);
      cashier.name = name;
      cashier.code = code;
      
      const success = await saveCashier(cashier);
      if (success) {
        showToast('تم تعديل الكاشير بنجاح');
        document.querySelector('.modal-overlay').remove();
        renderAccounting('devices');
      }
    }

    function confirmDeleteCashier(cashierId) {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content p-8 w-96 text-center">
          <h2 class="text-2xl font-bold text-red-600 mb-4">تأكيد الحذف</h2>
          <p class="text-gray-600 mb-6">هل أنت متأكد من حذف هذا الكاشير؟</p>
          <div class="flex gap-3">
            <button onclick="deleteCashierConfirmed('${cashierId}')" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">نعم</button>
            <button onclick="this.closest('.modal-overlay').remove()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">لا</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async function deleteCashierConfirmed(cashierId) {
      const success = await deleteCashier(cashierId);
      if (success) {
        document.querySelector('.modal-overlay').remove();
        renderAccounting('devices');
        showToast('تم حذف الكاشير بنجاح');
      }
    }


    function showNumericKeypad(inputField) {
  if (document.querySelector('.numeric-keypad-overlay')) return;
  
  const overlay = document.createElement('div');
  overlay.className = 'numeric-keypad-overlay';
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;';
  
  const keypad = document.createElement('div');
  keypad.style.cssText = 'background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);';
  
  const display = document.createElement('input');
  display.type = 'text';
  display.value = inputField.value || '0';
  display.readOnly = true;
  display.style.cssText = 'width: 100%; font-size: 32px; text-align: center; padding: 15px; margin-bottom: 15px; border: 2px solid #2563eb; border-radius: 8px; font-weight: bold;';
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 300px;';

  
  const buttons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'مسح', 'موافق'];

  
  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn;
    button.style.cssText = 'padding: 20px; font-size: 24px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;';
    
    if (btn === 'موافق') {
      button.style.background = '#22c55e';
      button.style.color = 'white';
    } else if (btn === 'مسح') {
      button.style.background = '#ef4444';
      button.style.color = 'white';
    } else {
      button.style.background = '#e5e7eb';
      button.style.color = '#1f2937';
    }
    
    button.onmouseover = () => {
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    };
    
    button.onmouseout = () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = 'none';
    };
    
    button.onclick = () => {
  if (btn === 'موافق') {
    inputField.value = display.value;
    overlay.remove();
  } else if (btn === 'مسح') {
    display.value = '0';
  } else if (btn === '.') {
    // إذا كان الرقم 0، يصبح 0.
    if (display.value === '0') {
      display.value = '0.';
    } 
    // إذا لم يكن هناك فاصلة بالفعل
    else if (!display.value.includes('.')) {
      display.value += '.';
    }
  } else {
    // إذا كان الرقم 0، استبدله بالرقم الجديد
    if (display.value === '0') {
      display.value = btn;
    } else {
      display.value += btn;
    }
  }
};
    
    buttonsContainer.appendChild(button);
  });
  
  keypad.appendChild(display);
  keypad.appendChild(buttonsContainer);
  overlay.appendChild(keypad);
  
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
  
  document.body.appendChild(overlay);
}



// دالة تعديل الفاتورة
async function editOrder(orderId) {
  const order = allOrders.find(o => o.id === orderId);
  if (!order) {
    showToast('الفاتورة غير موجودة');
    return;
  }
  
  currentEditingOrder = JSON.parse(JSON.stringify(order)); // نسخة للتعديل
  
  const modal = document.getElementById('editOrderModal');
  modal.style.display = 'flex';
  
  // ملء البيانات
  document.getElementById('editCustomerName').value = order.customerName || '';
  document.getElementById('editPhoneNumber').value = order.phoneNumber || '';
  document.getElementById('editAddress').value = order.address || '';
  document.getElementById('editDeliveryFee').value = parseFloat(order.deliveryFee || order.deliveryPrice || 0).toFixed(3);
  document.getElementById('editDiscountType').value = order.discountType || 'none';
  document.getElementById('editDiscountValue').value = parseFloat(order.discountValue || 0) || '';
  
  // عرض المنتجات
  renderEditProducts();
}

function getEditItemsGrossTotal() {
  return currentEditingOrder.items.reduce((sum, item) => {
    const quantity = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.price) || 0;
    return sum + (quantity * price);
  }, 0);
}

function getEditDiscountInfo() {
  const baseTotal = getEditItemsGrossTotal();
  const discountType = document.getElementById('editDiscountType')?.value || 'none';
  const discountValue = parseFloat(convertToEnglishNumbers(document.getElementById('editDiscountValue')?.value || '0')) || 0;
  const discountAmount = calculateOrderDiscountAmount(baseTotal, discountType, discountValue);
  return { baseTotal, discountType, discountValue, discountAmount };
}

function applyEditDiscountToItems() {
  const { baseTotal, discountType, discountValue, discountAmount } = getEditDiscountInfo();
  currentEditingOrder.discountType = discountType;
  currentEditingOrder.discountValue = discountValue;
  currentEditingOrder.discountAmount = discountAmount;
  currentEditingOrder.discountTotal = discountAmount;
  currentEditingOrder.itemsGrossTotal = parseFloat(baseTotal.toFixed(3));

  currentEditingOrder.items = currentEditingOrder.items.map(item => {
    const grossTotal = parseFloat(((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)).toFixed(3));
    const itemDiscount = baseTotal > 0 && discountAmount > 0
      ? parseFloat((discountAmount * (grossTotal / baseTotal)).toFixed(3))
      : 0;
    return {
      ...item,
      grossTotal,
      discountPercent: discountType === 'percent' ? discountValue : 0,
      discountAmount: itemDiscount,
      total: parseFloat(Math.max(0, grossTotal - itemDiscount).toFixed(3))
    };
  });

  currentEditingOrder.itemsNetTotal = parseFloat(currentEditingOrder.items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0).toFixed(3));
}

// عرض المنتجات للتعديل
function renderEditProducts() {
  const container = document.getElementById('editProductsList');
  
  let html = `
    <div class="space-y-3">
      ${currentEditingOrder.items.map((item, index) => `
        <div class="flex gap-2 items-center bg-gray-50 p-3 rounded-lg">
          <span class="flex-1 font-bold">${item.productName}</span>
          <input type="number" value="${item.quantity}" onchange="updateEditProduct(${index}, 'quantity', this.value)" class="w-20 p-2 border rounded-lg" step="0.001">
          <select onchange="updateEditProduct(${index}, 'unit', this.value)" class="p-2 border rounded-lg">
            <option value="حبة" ${item.unit === 'حبة' ? 'selected' : ''}>حبة</option>
            <option value="كرتون" ${item.unit === 'كرتون' ? 'selected' : ''}>كرتون</option>
            <option value="كيلو" ${item.unit === 'كيلو' ? 'selected' : ''}>كيلو</option>
          </select>
          <input type="number" value="${item.price}" onchange="updateEditProduct(${index}, 'price', this.value)" class="w-24 p-2 border rounded-lg" step="0.001">
          <span class="font-bold text-blue-600 w-24 text-center">${(item.total || 0).toFixed(3)} د.ك</span>
          <button onclick="removeEditProduct(${index})" class="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700">حذف</button>
        </div>
      `).join('')}
    </div>
    
    <div class="mt-6 p-4 bg-green-50 rounded-lg">
      <h4 class="font-bold text-lg mb-3">إضافة منتج جديد</h4>
      
      <div class="mb-3">
        <input type="text" id="searchProductInput" placeholder="ابحث عن منتج..." class="w-full p-3 border-2 border-green-600 rounded-lg" oninput="searchProducts()">
        <div id="productSearchResults" class="mt-2 max-h-48 overflow-y-auto"></div>
      </div>
      
      <div id="selectedProductInfo" class="hidden">
        <div class="bg-white p-3 rounded-lg mb-3">
          <p class="font-bold text-green-600 mb-2">المنتج المختار: <span id="selectedProductName"></span></p>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="block text-sm font-bold mb-1">الكمية</label>
              <input type="number" id="selectedProductQty" class="w-full p-2 border rounded-lg" step="0.001" value="1">
            </div>
            <div>
              <label class="block text-sm font-bold mb-1">الوحدة</label>
              <select id="selectedProductUnit" class="w-full p-2 border rounded-lg">
                <option value="حبة">حبة</option>
                <option value="كرتون">كرتون</option>
                <option value="كيلو">كيلو</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold mb-1">السعر</label>
              <input type="number" id="selectedProductPrice" class="w-full p-2 border rounded-lg" step="0.001">
            </div>
          </div>
        </div>
        <button onclick="addSelectedProduct()" class="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-bold">إضافة المنتج للفاتورة</button>
      </div>
    </div>
    
    <div class="mt-4 p-4 bg-blue-50 rounded-lg">
      ${(() => {
        const discountInfo = getEditDiscountInfo();
        const deliveryFee = parseFloat(document.getElementById('editDeliveryFee')?.value || '0') || 0;
        return `
          <div class="flex justify-between text-base font-bold mb-2">
            <span>مجموع الأصناف قبل الخصم:</span>
            <span>${discountInfo.baseTotal.toFixed(3)} د.ك</span>
          </div>
          ${discountInfo.discountAmount > 0 ? `
            <div class="flex justify-between text-base font-bold text-red-600 mb-2">
              <span>الخصم:</span>
              <span>-${discountInfo.discountAmount.toFixed(3)} د.ك</span>
            </div>
          ` : ''}
          ${deliveryFee > 0 ? `
            <div class="flex justify-between text-base font-bold mb-2">
              <span>رسوم التوصيل:</span>
              <span>${deliveryFee.toFixed(3)} د.ك</span>
            </div>
          ` : ''}
        `;
      })()}
      <div class="flex justify-between text-lg font-bold">
        <span>الإجمالي:</span>
        <span class="text-blue-600">${calculateEditTotal().toFixed(3)} د.ك</span>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}

// تحديث منتج
function updateEditProduct(index, field, value) {
  if (field === 'quantity' || field === 'price') {
    currentEditingOrder.items[index][field] = parseFloat(value) || 0;
    currentEditingOrder.items[index].grossTotal = currentEditingOrder.items[index].quantity * currentEditingOrder.items[index].price;
    currentEditingOrder.items[index].total = currentEditingOrder.items[index].grossTotal;
  } else {
    currentEditingOrder.items[index][field] = value;
  }
  applyEditDiscountToItems();
  renderEditProducts();
}

// حذف منتج
function removeEditProduct(index) {
  if (currentEditingOrder.items.length <= 1) {
    showToast('يجب أن يحتوي الطلب على منتج واحد على الأقل');
    return;
  }
  currentEditingOrder.items.splice(index, 1);
  renderEditProducts();
}

// إضافة منتج جديد
function addEditProduct() {
  const name = document.getElementById('newProductName').value.trim();
  const qty = parseFloat(document.getElementById('newProductQty').value) || 1;
  const unit = document.getElementById('newProductUnit').value;
  const price = parseFloat(document.getElementById('newProductPrice').value) || 0;
  
  if (!name) {
    showToast('أدخل اسم المنتج');
    return;
  }
  
  const newProduct = {
    productName: name,
    quantity: qty,
    unit: unit,
    price: price,
    total: qty * price
  };
  
  currentEditingOrder.items.push(newProduct);
  
  // مسح الحقول
  document.getElementById('newProductName').value = '';
  document.getElementById('newProductQty').value = '1';
  document.getElementById('newProductPrice').value = '';
  
  renderEditProducts();
}

// حساب الإجمالي
function calculateEditTotal() {
  applyEditDiscountToItems();
  const itemsTotal = currentEditingOrder.items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
  const deliveryFee = parseFloat(document.getElementById('editDeliveryFee').value) || 0;
  return itemsTotal + deliveryFee;
}

// حفظ التعديلات
// حفظ التعديلات
async function saveOrderEdit() {
  // 1. تحديث البيانات الأساسية في الكائن
  currentEditingOrder.customerName = document.getElementById('editCustomerName').value.trim();
  currentEditingOrder.phoneNumber = document.getElementById('editPhoneNumber').value.trim();
  currentEditingOrder.address = document.getElementById('editAddress').value.trim();
  currentEditingOrder.deliveryFee = parseFloat(document.getElementById('editDeliveryFee').value) || 0;
  currentEditingOrder.deliveryPrice = currentEditingOrder.deliveryFee;
  applyEditDiscountToItems();
  currentEditingOrder.total = calculateEditTotal();

  // 2. التحقق من صحة البيانات
  if (!currentEditingOrder.customerName || !currentEditingOrder.phoneNumber) {
    showToast('الرجاء إدخال اسم العميل ورقم الهاتف', true);
    return;
  }

  if (currentEditingOrder.items.length === 0) {
    showToast('يجب أن تحتوي الفاتورة على منتج واحد على الأقل', true);
    return;
  }

  try {
    // 3. الحفظ المباشر في Firebase باستخدام الكائن db المعرف في كودك
    const orderId = currentEditingOrder.id;
    await db.ref(`orders/${orderId}`).set(currentEditingOrder);

    // 4. تحديث البيانات محلياً في القائمة العامة
    await loadData(); 

    showToast('تم تحديث الفاتورة بنجاح ✅');

    // 5. إغلاق النافذة وإعادة رسم صفحة الطلبات لرؤية التغيير فوراً
    closeEditOrderModal();
    renderAccounting('orders'); 

  } catch (error) {
    console.error('Error updating order:', error);
    showToast('فشل في تحديث البيانات: ' + error.message, true);
  }
}

// إغلاق نافذة التعديل
function closeEditOrderModal() {
  document.getElementById('editOrderModal').style.display = 'none';
  currentEditingOrder = null;
}

let currentEditingOrder = null;



let selectedProduct = null;

function searchProducts() {
  const searchTerm = document.getElementById('searchProductInput').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('productSearchResults');
  
  if (!searchTerm) {
    resultsContainer.innerHTML = '';
    return;
  }
  
  if (!allProducts || allProducts.length === 0) {
    resultsContainer.innerHTML = '<p class="text-red-500 p-2 bg-white rounded">⚠️ لا توجد منتجات!</p>';
    return;
  }
  
  // البحث في nameAr و nameEn و id
  const filteredProducts = allProducts.filter(p => {
    if (!p) return false;
    
    const searchIn = [
      p.nameAr,
      p.nameEn,
      p.id
    ].filter(v => v).join(' ').toLowerCase();
    
    return searchIn.includes(searchTerm);
  });
  
  if (filteredProducts.length === 0) {
    resultsContainer.innerHTML = `<p class="text-gray-500 p-2 bg-white rounded">لا توجد نتائج للبحث عن "${searchTerm}"</p>`;
    return;
  }
  
  resultsContainer.innerHTML = filteredProducts.slice(0, 10).map(product => {
    const productData = {
      id: product.id || '',
      name: product.nameAr || product.nameEn || 'بدون اسم',
      code: product.id || 'N/A',
      unit: product.unit || 'حبة',
      sellPrice: product.price || 0,
      quantity: parseInventoryQuantity(product, 'main')
    };
    
    return `
      <div class="bg-white p-3 mb-2 rounded-lg border-2 border-gray-200 hover:border-green-600 cursor-pointer transition" onclick='selectProductFromSearch(${JSON.stringify(productData).replace(/'/g, "&apos;")})'>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-bold">${productData.name}</p>
            <p class="text-sm text-gray-600">${product.nameEn || ''}</p>
          </div>
          <div class="text-left">
            <p class="font-bold text-green-600">${productData.sellPrice.toFixed(3)} د.ك</p>
            <p class="text-xs text-gray-500">متوفر: ${productData.quantity} ${productData.unit}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function selectProductFromSearch(product) {
  selectedProduct = product;
  
  document.getElementById('selectedProductName').textContent = product.name;
  document.getElementById('selectedProductQty').value = '1';
  document.getElementById('selectedProductUnit').value = product.unit;
  document.getElementById('selectedProductPrice').value = product.sellPrice.toFixed(3);
  document.getElementById('selectedProductInfo').classList.remove('hidden');
  document.getElementById('productSearchResults').innerHTML = '';
  document.getElementById('searchProductInput').value = '';
}

function addSelectedProduct() {
  if (!selectedProduct) {
    showToast('اختر منتج أولاً');
    return;
  }
  
  const qty = parseFloat(document.getElementById('selectedProductQty').value) || 1;
  const unit = document.getElementById('selectedProductUnit').value;
  const price = parseFloat(document.getElementById('selectedProductPrice').value) || 0;
  
  const newProduct = {
    productName: selectedProduct.name,
    productCode: selectedProduct.code,
    quantity: qty,
    unit: unit,
    price: price,
    total: qty * price
  };
  
  currentEditingOrder.items.push(newProduct);
  
  selectedProduct = null;
  document.getElementById('selectedProductInfo').classList.add('hidden');
  
  renderEditProducts();
  showToast('✅ تم إضافة المنتج للفاتورة');
}

function findCustomerForOrder(order) {
  const phone = order?.phoneNumber || '';
  return allCustomers.find(customer => (customer.phone || '') === phone) || null;
}

function formatCustomerAddressText(address) {
  if (!address) return '';
  return `${address.area || ''}${address.details ? ` - ${address.details}` : ''}`.trim();
}

function getOrderAddressIndex(customer, order) {
  const addresses = Array.isArray(customer?.addresses) ? customer.addresses : [];
  const orderAddress = (order?.address || '').trim();
  return addresses.findIndex(address => formatCustomerAddressText(address) === orderAddress);
}

async function saveDeliveryPriceForBranchArea(area, price, branch = currentBranch) {
  if (!area) return;
  const groupKey = getDeliveryPriceGroupForBranch(branch);
  const payload = {
    area,
    price: parseFloat((parseFloat(price) || 0).toFixed(3)),
    groupKey,
    groupLabel: getDeliveryPriceGroupLabel(groupKey),
    branch: branch || '',
    updatedAt: Date.now()
  };
  await db.ref(`deliveryPrices/${groupKey}/${area}`).set(payload);
  allDeliveryPrices = {
    ...(allDeliveryPrices || {}),
    [groupKey]: {
      ...(allDeliveryPrices?.[groupKey] || {}),
      [area]: payload
    }
  };
}

function openCashierQuickEditOrder(orderId) {
  const order = allOrders.find(o => o.id === orderId);
  if (!order) {
    showToast('الفاتورة غير موجودة', true);
    return;
  }

  const existingModal = document.getElementById('cashierQuickEditModal');
  if (existingModal) existingModal.remove();

  const deliveryWindow = getDefaultDeliveryWindow();
  const deliveryDate = order.deliveryDate || deliveryWindow.date;
  const deliveryTimeFrom = order.deliveryTimeFrom || deliveryWindow.from;
  const deliveryTimeTo = order.deliveryTimeTo || deliveryWindow.to;
  const customer = findCustomerForOrder(order);
  const addresses = Array.isArray(customer?.addresses) ? customer.addresses : [];
  const currentAddressIndex = getOrderAddressIndex(customer, order);
  const deliveryFeeValue = parseFloat(order.deliveryPrice ?? order.deliveryFee ?? 0) || 0;

  const modal = document.createElement('div');
  modal.id = 'cashierQuickEditModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content p-8 w-full max-w-xl" style="direction: rtl;">
      <h2 class="text-2xl font-bold text-blue-600 mb-2 text-center">تعديل الفاتورة</h2>
      <div class="text-center text-gray-600 mb-6">رقم الفاتورة: <strong>#${escapeHtml(order.invoiceNumber || '')}</strong></div>

      <div class="space-y-5">
        <div>
          <label class="block mb-2 font-bold text-gray-700">اسم الزبون</label>
          <input type="text" id="cashierEditCustomerName" value="${escapeHtml(order.customerName || customer?.name || '')}" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
        </div>

        <div>
          <label class="block mb-2 font-bold text-gray-700">طريقة الدفع</label>
          <select id="cashierEditPaymentMethod" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
            <option value="cash" ${order.paymentMethod === 'cash' ? 'selected' : ''}>كاش</option>
            <option value="online" ${order.paymentMethod === 'online' ? 'selected' : ''}>أونلاين</option>
            <option value="knet" ${order.paymentMethod === 'knet' ? 'selected' : ''}>كي-نت</option>
          </select>
        </div>

        ${order.orderType === 'delivery' ? `
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 class="font-bold text-green-800 mb-3">العنوان ورسوم التوصيل</h3>
            <div class="mb-4">
              <label class="block mb-2 font-bold text-gray-700">عنوان الزبون</label>
              <select id="cashierEditAddressChoice" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none">
                ${addresses.map((addr, idx) => `
                  <option value="${idx}" ${idx === currentAddressIndex ? 'selected' : ''}>${escapeHtml(formatCustomerAddressText(addr) || 'عنوان بدون تفاصيل')}</option>
                `).join('')}
                <option value="new" ${currentAddressIndex < 0 ? 'selected' : ''}>➕ إضافة عنوان جديد</option>
              </select>
            </div>

            <div id="cashierEditNewAddressFields" class="${currentAddressIndex < 0 ? '' : 'hidden'} space-y-3 mb-4">
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600">المنطقة</label>
                <select id="cashierEditNewAddressArea" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none">
                  <option value="">اختر المنطقة</option>
                  ${areas.map(area => `<option value="${area}">${area}</option>`).join('')}
                  <option value="أخرى">أخرى (كتابة يدوية)</option>
                </select>
                <input type="text" id="cashierEditNewAddressAreaManual" placeholder="اكتب المنطقة" class="w-full p-2 border-2 border-gray-300 rounded-lg mt-2 hidden focus:border-green-600 focus:outline-none">
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600">تفاصيل العنوان</label>
                <textarea id="cashierEditNewAddressDetails" rows="2" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"></textarea>
              </div>
            </div>

            <div class="mb-4">
              <label class="block mb-2 font-bold text-gray-700">رسوم التوصيل (د.ك)</label>
              <input type="text" id="cashierEditDeliveryPrice" value="${formatNumberWithThreeDecimals(deliveryFeeValue)}" oninput="this.value = convertToEnglishNumbers(this.value)" class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none">
              <div class="text-xs text-gray-500 mt-2">أي تعديل هنا سيُحفظ كسعر أساسي لهذه المنطقة حسب فرع الكاشير.</div>
            </div>

            <h3 class="font-bold text-green-800 mb-3">وقت التوصيل</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600">تاريخ التوصيل</label>
                <input type="date" id="cashierEditDeliveryDate" value="${deliveryDate}" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none">
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600">من</label>
                <input type="time" id="cashierEditDeliveryFrom" value="${deliveryTimeFrom}" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none">
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600">إلى</label>
                <input type="time" id="cashierEditDeliveryTo" value="${deliveryTimeTo}" class="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none">
              </div>
            </div>
            <div id="cashierEditDeliveryPreview" class="text-xs text-green-800 mt-3 font-semibold"></div>
          </div>
        ` : `
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-600 font-bold">
            هذه فاتورة استلام، لذلك لا يوجد وقت توصيل للتعديل.
          </div>
        `}
      </div>

      <div class="flex gap-3 mt-7">
        <button onclick="saveCashierQuickEditOrder('${order.id}')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">حفظ</button>
        <button onclick="closeCashierQuickEditOrder()" class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">إلغاء</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.getElementById('cashierEditAddressChoice')?.addEventListener('change', function() {
    const isNew = this.value === 'new';
    document.getElementById('cashierEditNewAddressFields')?.classList.toggle('hidden', !isNew);
    if (!isNew) {
      const selectedAddress = addresses[parseInt(this.value)];
      const price = getResolvedDeliveryPriceForArea(selectedAddress?.area || '', getDeliveryPriceGroupForBranch(order.branch || currentBranch));
      const priceInput = document.getElementById('cashierEditDeliveryPrice');
      if (priceInput && price !== '' && !isNaN(price)) priceInput.value = formatNumberWithThreeDecimals(price);
    }
  });
  document.getElementById('cashierEditNewAddressArea')?.addEventListener('change', function() {
    document.getElementById('cashierEditNewAddressAreaManual')?.classList.toggle('hidden', this.value !== 'أخرى');
  });
  ['cashierEditDeliveryDate', 'cashierEditDeliveryFrom', 'cashierEditDeliveryTo'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', updateCashierQuickEditDeliveryPreview);
  });
  updateCashierQuickEditDeliveryPreview();
}

function updateCashierQuickEditDeliveryPreview() {
  const preview = document.getElementById('cashierEditDeliveryPreview');
  if (!preview) return;
  const date = document.getElementById('cashierEditDeliveryDate')?.value || '';
  const from = document.getElementById('cashierEditDeliveryFrom')?.value || '';
  const to = document.getElementById('cashierEditDeliveryTo')?.value || '';
  preview.innerHTML = date && from && to
    ? `التوصيل ${formatDeliveryDateWithDay(date)}<br>بين الساعة ${formatDeliveryDisplayTime(from)} و ${formatDeliveryDisplayTime(to)}`
    : '';
}

async function saveCashierQuickEditOrder(orderId) {
  const order = allOrders.find(o => o.id === orderId);
  if (!order) {
    showToast('الفاتورة غير موجودة', true);
    return;
  }

  const customerName = document.getElementById('cashierEditCustomerName')?.value.trim() || '';
  const paymentMethod = document.getElementById('cashierEditPaymentMethod')?.value || '';
  if (!customerName) {
    showToast('أدخل اسم الزبون', true);
    return;
  }
  if (!paymentMethod) {
    showToast('اختر طريقة الدفع', true);
    return;
  }

  let customer = findCustomerForOrder(order);
  const oldPhone = order.phoneNumber || customer?.phone || '';
  if (!customer && oldPhone) {
    customer = {
      id: generateId(),
      name: customerName,
      phone: oldPhone,
      addresses: []
    };
  }

  const updates = {
    customerName,
    paymentMethod,
    updatedAt: Date.now(),
    updatedByCashier: currentCashier?.name || ''
  };

  if (order.orderType === 'delivery') {
    const addresses = Array.isArray(customer?.addresses) ? customer.addresses : [];
    const addressChoice = document.getElementById('cashierEditAddressChoice')?.value || '';
    let selectedAddress = null;

    if (addressChoice === 'new') {
      let area = document.getElementById('cashierEditNewAddressArea')?.value || '';
      if (area === 'أخرى') {
        area = document.getElementById('cashierEditNewAddressAreaManual')?.value.trim() || '';
      }
      const details = document.getElementById('cashierEditNewAddressDetails')?.value.trim() || '';
      if (!area) {
        showToast('اختر منطقة العنوان الجديد', true);
        return;
      }
      selectedAddress = { area, details };
      if (customer) {
        customer.addresses = Array.isArray(customer.addresses) ? customer.addresses : [];
        customer.addresses.push(selectedAddress);
      }
    } else if (addressChoice !== '') {
      selectedAddress = addresses[parseInt(addressChoice)] || null;
    }

    if (!selectedAddress) {
      showToast('اختر عنوان التوصيل أو أضف عنوان جديد', true);
      return;
    }

    const deliveryPrice = parseFloat(convertToEnglishNumbers(document.getElementById('cashierEditDeliveryPrice')?.value || '0')) || 0;
    const deliveryDate = document.getElementById('cashierEditDeliveryDate')?.value || '';
    const deliveryTimeFrom = document.getElementById('cashierEditDeliveryFrom')?.value || '';
    const deliveryTimeTo = document.getElementById('cashierEditDeliveryTo')?.value || '';

    if (!deliveryDate || !deliveryTimeFrom || !deliveryTimeTo) {
      showToast('أدخل تاريخ ووقت التوصيل كامل', true);
      return;
    }

    updates.deliveryDate = deliveryDate;
    updates.deliveryTimeFrom = deliveryTimeFrom;
    updates.deliveryTimeTo = deliveryTimeTo;
    updates.deliveryTimingType = 'specific';
    updates.address = formatCustomerAddressText(selectedAddress);
    updates.deliveryPrice = deliveryPrice;
    updates.deliveryFee = deliveryPrice;
    updates.total = (parseFloat(order.total) || 0) - (parseFloat(order.deliveryPrice ?? order.deliveryFee ?? 0) || 0) + deliveryPrice;
  }

  try {
    if (customer) {
      customer.name = customerName;
      await saveCustomer(customer);
    }
    if (oldPhone) {
      await updateOrdersForCustomer(oldPhone, { customerName });
    }
    if (order.orderType === 'delivery' && updates.address) {
      const area = getDeliveryAreaFromAddress(updates.address);
      await saveDeliveryPriceForBranchArea(area, updates.deliveryPrice || 0, order.branch || currentBranch);
    }
    await db.ref(`orders/${orderId}`).update(updates);
    const localOrder = allOrders.find(item => item.id === orderId) || order;
    Object.assign(localOrder, updates);
    closeCashierQuickEditOrder();
    renderCashier();
    showToast('تم تعديل الفاتورة بنجاح');
  } catch (error) {
    console.error('Error updating cashier invoice fields:', error);
    showToast('تعذر حفظ التعديل: ' + (error.message || error), true);
  }
}

function closeCashierQuickEditOrder() {
  document.getElementById('cashierQuickEditModal')?.remove();
}




    // Initialize App
    document.addEventListener('keydown', handleGlobalBarcodeKeydown, true);
    initCashierPresence();
    renderHome();
