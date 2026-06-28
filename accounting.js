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

const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const serverTime = firebase.database.ServerValue.TIMESTAMP;

const state = {
  deviceId: null,
  user: null,
  role: null,
  cache: {},
  pendingDataRefresh: false,
  importInProgress: false,
  currentSection: 'reports',
  reports: {
    view: 'dashboard',
    period: 'day',
    date: '',
    compareEnabled: false,
    compareValues: {
      day: '',
      week: '',
      month: ''
    },
    branchId: 'all',
    metricDetails: {
      metricKey: 'orders',
      branchId: 'all',
      cashierId: 'all',
      customerId: 'all',
      query: ''
    },
    salesFilters: {
      fromDate: '',
      toDate: '',
      query: '',
      categoryId: 'all',
      categoryPickerPath: [],
      selectedRowKeys: [],
      autoSelectAll: true,
      productIds: [],
      mainCategoryId: 'all',
      subCategoryId: 'all',
      branchId: 'all'
    },
    cashierSalesFilters: {
      fromDate: '',
      toDate: '',
      branchId: 'all'
    },
    returnsFilters: {
      fromDate: '',
      toDate: '',
      branchId: 'all',
      query: '',
      sort: 'desc'
    },
    topProductsFilters: {
      fromDate: '',
      toDate: '',
      query: '',
      sortKey: 'total',
      sortDir: 'desc',
      mode: 'top',
      limit: 10,
      dashboardRunRequested: false
    },
    orderSalesFilters: {
      fromDate: '',
      toDate: '',
      branchId: 'all',
      query: ''
    },
    details: {
      productId: null,
      branchId: 'all'
    },
    cashierDetails: {
      cashierId: null
    },
    topProductDetails: {
      productId: null,
      branchId: 'all',
      fromDate: '',
      toDate: '',
      cashierId: 'all',
      query: ''
    }
  },
  orderFilters: {
    branchId: 'all',
    cashierId: 'all',
    zoneIds: [],
    orderTypeId: 'all',
    dateFrom: '',
    dateTo: '',
    query: '',
    currentPage: 1,
    pageSize: 10
  },
  customerFilters: {
    zoneId: 'all',
    zoneIds: [],
    level: 'all',
    blockedOnly: false,
    query: '',
    dateFrom: '',
    dateTo: '',
    ordersSort: 'desc',
    detailsCustomerId: null,
    favoriteProductId: null,
    showAddForm: false,
    currentPage: 1,
    pageSize: 10
  },
  customerEditDraft: null,
  dismissedNoticeKeys: {},
  tablesFilters: {
    fromDate: '',
    toDate: '',
    branchId: 'all',
    tableQuery: '',
    sortOrders: 'desc',
    sortRevenue: 'desc',
    detailsKey: '',
    detailsCashierId: 'all',
    detailsQuery: '',
    currentPage: 1,
    pageSize: 10
  },
  tablePagination: {},
  editingTableId: null,
  productFilters: {
    branchId: 'all',
    categoryId: 'all',
    storageLocationId: 'all',
    countryOriginId: 'all',
    sortBy: 'default',
    query: '',
    currentPage: 1,
    pageSize: 10
  },
  productInfoFilters: {
    query: '',
    currentPage: 1,
    pageSize: 20
  },
  productInfoPicker: {
    query: '',
    selectedIds: new Set()
  },
  materialFilters: {
    branchId: 'all',
    categoryId: 'all',
    storageLocationId: 'all',
    countryOriginId: 'all',
    query: '',
    currentPage: 1,
    pageSize: 10
  },
  selectedProducts: new Set(),
  selectedStockMaterials: new Set(),
  selectedOrders: new Set(),
  selectedCustomers: new Set(),
  selectedCountryOriginItems: new Set(),
  editingOrder: null,
  editingUnitId: null,
  categoryPath: [],
  activeCategoryId: null,
  materialCategoryPath: [],
  activeMaterialCategoryId: null,
  activeStorageLocationId: null,
  issueDraft: null,
  productionDraft: null,
  inventoryDraft: null,
  receivingDraft: null,
  transferDraft: null,
  cashierTransferDraft: null,
  stockReturnDraft: null,
  scrapReturnDraft: null,
  supplierDraft: null,
  supplierDetailId: null,
  supplierPickSelection: new Set(),
  purchaseDraft: null,
  purchaseReceiveDraft: null,
  purchaseFilters: {
    query: '',
    fromDate: '',
    toDate: '',
    supplierId: 'all',
    status: 'all'
  },
  supplierReturnDraft: null,
  countryOriginView: {
    activeOriginId: null,
    assignMode: false,
    search: '',
    editingId: null,
    formNameAr: '',
    formNameEn: ''
  },
  productionFilters: {
    query: '',
    fromDate: '',
    toDate: '',
    branchId: 'all',
    staffId: 'all'
  },
  productionFollowUpFilters: {
    fromDate: '',
    toDate: '',
    branchId: 'all',
    staffId: 'all',
    query: '',
    productId: null
  },
  itemCard: {
    item: null,
    classificationType: '',
    classificationId: '',
    classificationLabel: '',
    classificationPickerType: '',
    classificationPickerCategoryMain: '',
    classificationPickerCategorySub: '',
    classificationPickerCategorySub2: '',
    classificationPickerTargetId: '',
    classificationPickerQuery: '',
    branchId: '',
    fromDate: '',
    toDate: '',
    movementTypes: null,
    movements: []
  },
  issueFilter: 'all',
  productionFilter: 'all',
  qtyModal: {
    value: '',
    mode: 'add',
    item: null,
    available: null,
    onConfirm: null
  },
  importedProducts: [],
  productImportStatusText: '',
  productImportCounterText: '',
  customerImportStatusText: '',
  importedStockMaterials: [],
  materialImportStatusText: '',
  materialImportCounterText: '',
  discountReport: {
    view: 'list',
    discountId: null,
    fromDate: '',
    toDate: '',
    invoiceId: null
  }
};

function getLocalizedName(item) {
  if (!item) return '-';
  const lang = window.i18n.getLanguage();
  if (lang === 'en') {
    return item.nameEn || item.name || item.nameAr || '-';
  }
  return item.nameAr || item.name || item.nameEn || '-';
}

function getStaffLabel(staff, fallbackId = '-') {
  if (!staff) return fallbackId;
  const localized = getLocalizedName(staff);
  if (localized && localized !== '-') return localized;
  return staff.name || staff.code || fallbackId;
}

function getUnitName(unitId) {
  if (!unitId) return '';
  const unit = state.cache.units?.[unitId];
  const name = getLocalizedName(unit);
  return name && name !== '-' ? name : '';
}

function getResolvedItemUnitName(item) {
  if (!item) return '';
  const directName = String(item.unitName || item.unitLabel || item.unit || '').trim();
  if (directName) return directName;
  return getUnitName(getResolvedItemUnitId(item));
}

function getQtyModalUnitMeta(item) {
  return {
    unitId: getResolvedItemUnitId(item),
    unitName: getResolvedItemUnitName(item)
  };
}

function formatUnitWithDefinition(unitId, definitionQty, definitionUnitId) {
  const baseName = getUnitName(unitId);
  if (!baseName) return '-';
  const qty = String(definitionQty || '').trim();
  const defUnitName = getUnitName(definitionUnitId);
  if (!qty || !defUnitName) return baseName;
  return `${baseName} (${qty} ${defUnitName})`;
}

function formatItemNameWithUnit(name, unitId, unitName = '') {
  const baseName = name || '-';
  const resolvedUnitName = unitId && typeof unitId === 'object'
    ? getResolvedItemUnitName(unitId)
    : String(unitName || getUnitName(unitId) || '').trim();
  return resolvedUnitName ? `${baseName} (${resolvedUnitName})` : baseName;
}

function formatQuantityWithUnit(qty, unitId, unitName = '') {
  const qtyText = formatNumber(qty);
  if (qtyText === '-') return qtyText;
  const resolvedUnitName = unitId && typeof unitId === 'object'
    ? getResolvedItemUnitName(unitId)
    : String(unitName || getUnitName(unitId) || '').trim();
  return resolvedUnitName ? `${qtyText} ${resolvedUnitName}` : qtyText;
}

function getResolvedItemUnitId(item) {
  if (!item) return null;
  if (item.unitId) return item.unitId;
  const itemType = normalizeItemType(item);
  const itemId = item.itemId || item.id;
  return getItemDataByType(itemType, itemId)?.unitId || null;
}

function normalizeEntrySearchTypes(types) {
  const allowed = ['product', 'material'];
  if (!Array.isArray(types)) return [];
  return Array.from(new Set(types.filter((type) => allowed.includes(type))));
}

function filterEntriesBySearchTypes(entries, selectedTypes) {
  const normalized = normalizeEntrySearchTypes(selectedTypes);
  if (!normalized.length) return entries;
  const selectedSet = new Set(normalized);
  return entries.filter((entry) => selectedSet.has(entry.type));
}

function buildEntrySearchTypeFilterHtml(prefix) {
  return `
    <div style="margin-top: 12px;">
      <label class="tag">${window.i18n.t('searching_for')}</label>
      <div class="row" style="gap: 14px; margin-top: 6px; flex-wrap: wrap;">
        <label class="row" style="gap: 6px;">
          <input id="${prefix}SearchTypeProduct" type="checkbox" />
          <span>${window.i18n.t('products')}</span>
        </label>
        <label class="row" style="gap: 6px;">
          <input id="${prefix}SearchTypeMaterial" type="checkbox" />
          <span>${window.i18n.t('stock_materials')}</span>
        </label>
      </div>
    </div>
  `;
}

function renderEntrySearchTypeFilter(prefix, selectedTypes) {
  const selected = new Set(normalizeEntrySearchTypes(selectedTypes));
  const productCheckbox = document.getElementById(`${prefix}SearchTypeProduct`);
  const materialCheckbox = document.getElementById(`${prefix}SearchTypeMaterial`);
  if (productCheckbox) productCheckbox.checked = selected.has('product');
  if (materialCheckbox) materialCheckbox.checked = selected.has('material');
}

function bindEntrySearchTypeFilter(prefix, onChange) {
  const productCheckbox = document.getElementById(`${prefix}SearchTypeProduct`);
  const materialCheckbox = document.getElementById(`${prefix}SearchTypeMaterial`);
  [productCheckbox, materialCheckbox].forEach((checkbox) => {
    if (!checkbox) return;
    checkbox.addEventListener('change', () => {
      if (prefix === 'production' && checkbox.checked) {
        if (checkbox === productCheckbox && materialCheckbox) materialCheckbox.checked = false;
        if (checkbox === materialCheckbox && productCheckbox) productCheckbox.checked = false;
      }
      const selectedTypes = [];
      if (productCheckbox?.checked) selectedTypes.push('product');
      if (materialCheckbox?.checked) selectedTypes.push('material');
      onChange(normalizeEntrySearchTypes(selectedTypes));
    });
  });
}

function getBranchRouteLabel(fromBranchId, toBranchId) {
  const fromLabel = getBranchLabel(fromBranchId);
  const toLabel = getBranchLabel(toBranchId);
  if (window.i18n.getLanguage() === 'ar') {
    return `من فرع ${fromLabel} إلى فرع ${toLabel}`;
  }
  return `From branch ${fromLabel} to branch ${toLabel}`;
}

function getItemDataByType(itemType, itemId) {
  if (!itemId) return null;
  return itemType === 'product'
    ? state.cache.products?.[itemId]
    : state.cache.stockMaterials?.[itemId];
}

function normalizeItemType(item) {
  return item?.itemType || item?.type || 'product';
}

function getItemSupplierIds(item) {
  if (!item) return [];
  const rawIds = [];
  if (item.supplierId) rawIds.push(item.supplierId);
  if (Array.isArray(item.supplierIds)) {
    rawIds.push(...item.supplierIds);
  } else if (item.supplierIds && typeof item.supplierIds === 'object') {
    rawIds.push(...Object.values(item.supplierIds));
  } else if (typeof item.supplierIds === 'string') {
    rawIds.push(item.supplierIds);
  }
  return Array.from(new Set(rawIds.map((id) => String(id || '').trim()).filter(Boolean)));
}

function itemHasSupplier(item, supplierId) {
  const targetId = String(supplierId || '').trim();
  if (!targetId) return false;
  return getItemSupplierIds(item).includes(targetId);
}

function buildItemSupplierUpdates(basePath, item, supplierIds) {
  const nextSupplierIds = Array.from(new Set((supplierIds || []).map((id) => String(id || '').trim()).filter(Boolean)));
  return {
    [`${basePath}/supplierId`]: nextSupplierIds[0] || null,
    [`${basePath}/supplierIds`]: nextSupplierIds.length ? nextSupplierIds : null
  };
}

function getItemKey(item) {
  const itemType = normalizeItemType(item);
  const itemId = item?.itemId || item?.id;
  return `${itemType}:${itemId}`;
}

function buildItemMap(items) {
  const map = {};
  normalizeItems(items).forEach((item) => {
    const key = getItemKey(item);
    if (!key.includes('undefined')) {
      map[key] = {
        itemType: normalizeItemType(item),
        itemId: item.itemId || item.id,
        qty: Number(item.qty || 0),
        unitId: item.unitId || null,
        name: item.name || item.itemName || item.itemId || '-'
      };
    }
  });
  return map;
}

function diffItems(oldItems, newItems) {
  const oldMap = buildItemMap(oldItems);
  const newMap = buildItemMap(newItems);
  const keys = new Set([...Object.keys(oldMap), ...Object.keys(newMap)]);
  const diffs = [];
  keys.forEach((key) => {
    const oldItem = oldMap[key];
    const newItem = newMap[key];
    const oldQty = oldItem ? Number(oldItem.qty || 0) : 0;
    const newQty = newItem ? Number(newItem.qty || 0) : 0;
    const qtyDiff = newQty - oldQty;
    if (qtyDiff !== 0) {
      diffs.push({
        itemType: newItem?.itemType || oldItem?.itemType,
        itemId: newItem?.itemId || oldItem?.itemId,
        qtyDiff,
        unitId: newItem?.unitId || oldItem?.unitId,
        name: newItem?.name || oldItem?.name
      });
    }
  });
  return diffs;
}

function getBooleanLabel(value) {
  return value ? window.i18n.t('yes') : window.i18n.t('no');
}

function normalizeDigits(value) {
  return String(value || '')
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)));
}

function normalizeArabicSearchText(value) {
  return String(value || '')
    .replace(/[\u0640]/g, '')
    .replace(/[\u064B-\u0652\u0670]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي');
}

function normalizeSearchValue(value) {
  return normalizeArabicSearchText(normalizeDigits(value))
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function debounce(fn, wait = 280) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

function bindDebouncedQueryInput(input, handler, wait = 280) {
  if (!input || typeof handler !== 'function') return;
  const run = debounce(() => handler(input.value || ''), wait);
  input.addEventListener('input', run);
  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    handler(input.value || '');
  });
}

function normalizeNumericInputValue(value) {
  let text = normalizeDigits(value);
  text = text.replace(/[٫٬،]/g, '.').replace(/,/g, '.').replace(/[−]/g, '-');
  text = text.replace(/[^0-9.\-]/g, '');
  text = text.replace(/(?!^)-/g, '');
  const firstDot = text.indexOf('.');
  if (firstDot !== -1) {
    text = text.slice(0, firstDot + 1) + text.slice(firstDot + 1).replace(/\./g, '');
  }
  return text;
}

function normalizeInputDigitsInPlace(input) {
  if (!input || typeof input.value !== 'string') return;
  if (input.type === 'number') {
    const normalized = normalizeNumericInputValue(input.value);
    if (normalized !== input.value) input.value = normalized;
    return;
  }
  const normalized = normalizeDigits(input.value);
  if (normalized !== input.value) input.value = normalized;
}

function prepareNumericInput(input) {
  if (!input || input.dataset.numericReady === '1') return;
  input.dataset.numericReady = '1';
  if (input.type === 'number') {
    input.step = 'any';
    input.setAttribute('inputmode', 'decimal');
  }
  input.addEventListener('input', () => normalizeInputDigitsInPlace(input));
  input.addEventListener('change', () => normalizeInputDigitsInPlace(input));
  normalizeInputDigitsInPlace(input);
}

function initNumericInputEnhancer() {
  const applyOnRoot = (root) => {
    if (!root || !(root instanceof Element || root instanceof Document)) return;
    root.querySelectorAll?.('input, textarea').forEach((input) => prepareNumericInput(input));
  };

  applyOnRoot(document);
  if (!document.body || document.body.dataset.numericObserverReady === '1') return;
  document.body.dataset.numericObserverReady = '1';
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches('input, textarea')) prepareNumericInput(node);
        applyOnRoot(node);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

const scanState = {
  buffer: '',
  lastTime: 0,
  timer: null
};

function isEditableTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

function handleGlobalScan(event) {
  if (isEditableTarget(event.target)) return;
  const key = event.key;
  if (key === 'Enter' || key === 'Tab') {
    if (scanState.buffer) {
      const value = scanState.buffer;
      scanState.buffer = '';
      routeScanValue(value);
    }
    return;
  }
  if (key.length !== 1) return;
  const now = Date.now();
  if (now - scanState.lastTime > 80) {
    scanState.buffer = '';
  }
  scanState.buffer += key;
  scanState.lastTime = now;
  clearTimeout(scanState.timer);
  scanState.timer = setTimeout(() => {
    if (scanState.buffer.length >= 4) {
      const value = scanState.buffer;
      scanState.buffer = '';
      routeScanValue(value);
    } else {
      scanState.buffer = '';
    }
  }, 120);
}

function getCustomerLevelLabel(level) {
  if (level === 'vip') return window.i18n.t('level_vip');
  if (level === 'vvip') return window.i18n.t('level_vvip');
  return window.i18n.t('level_regular');
}

function countCustomersByZone(zoneId) {
  const customers = state.cache.customers || {};
  return Object.values(customers).filter((cust) => cust.zoneId === zoneId).length;
}

function renderCustomerZoneFilter(select) {
  const zones = state.cache.deliveryZones || {};
  const current = state.customerFilters.zoneId || 'all';
  select.innerHTML = '';
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = window.i18n.t('all_zones');
  select.appendChild(allOption);
  Object.entries(zones).forEach(([id, zone]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(zone);
    select.appendChild(option);
  });
  select.value = current;
}

function ensurePaginationFields(filters, defaults = {}) {
  if (!filters) return filters;
  if (!Object.prototype.hasOwnProperty.call(filters, 'currentPage')) {
    filters.currentPage = Number(defaults.currentPage || 1);
  }
  if (!Object.prototype.hasOwnProperty.call(filters, 'pageSize')) {
    filters.pageSize = Number(defaults.pageSize || 10);
  }
  filters.currentPage = Math.max(1, Number(filters.currentPage || defaults.currentPage || 1));
  filters.pageSize = Math.max(1, Number(filters.pageSize || defaults.pageSize || 10));
  return filters;
}

function ensureTablePaginationState(key, defaults = {}) {
  if (!state.tablePagination || typeof state.tablePagination !== 'object') {
    state.tablePagination = {};
  }
  const current = state.tablePagination[key] || {};
  state.tablePagination[key] = ensurePaginationFields(current, defaults) || { currentPage: 1, pageSize: 10 };
  return state.tablePagination[key];
}

function resetPaginationPage(filters) {
  if (!filters) return;
  filters.currentPage = 1;
}

function buildPageSizeControlHtml(selectId) {
  return `
    <div class="row" style="gap: 8px; align-items: center;">
      <span class="helper">${window.i18n.t('items_per_page')}</span>
      <select id="${selectId}" class="input" style="max-width: 110px;">
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  `;
}

function buildPaginationBarHtml(infoId, containerId, marginTop = 12) {
  return `
    <div class="row pagination-bar" data-pagination-managed="true" style="margin-top: ${marginTop}px;">
      <span id="${infoId}" class="helper"></span>
      <div id="${containerId}" class="row pagination-actions"></div>
    </div>
  `;
}

function syncPageSizeSelect(selectId, filters) {
  const select = document.getElementById(selectId);
  if (select) {
    select.value = String(Math.max(1, Number(filters?.pageSize || 10)));
  }
}

function buildAutoPaginationKey(sectionId, table, index) {
  const tbodyId = table.tBodies?.[0]?.id || '';
  const tableId = table.id || '';
  const suffix = tableId || tbodyId || `table-${index + 1}`;
  return `auto:${sectionId}:${suffix}`;
}

function getAutoPaginationDomIds(sectionId, table, index) {
  const raw = buildAutoPaginationKey(sectionId, table, index).replace(/[^a-zA-Z0-9_-]/g, '-');
  return {
    wrapperId: `${raw}-wrap`,
    selectId: `${raw}-size`,
    infoId: `${raw}-info`,
    paginationId: `${raw}-pagination`
  };
}

function isAutoPaginatedDataRow(row) {
  return !(row.children.length === 1 && row.children[0]?.hasAttribute('colspan'));
}

function applyAutomaticSectionTablePagination(sectionId = state.currentSection) {
  if (!sectionId) return;
  const section = document.getElementById(`section-${sectionId}`);
  if (!section) return;

  const tables = Array.from(section.querySelectorAll('table.table'));
  tables.forEach((table, index) => {
    const card = table.closest('.card');
    if (!card || card.querySelector('[data-pagination-managed="true"]:not([data-auto-pagination="true"])')) return;
    const tbody = table.tBodies?.[0];
    if (!tbody) return;

    const ids = getAutoPaginationDomIds(sectionId, table, index);
    let wrapper = document.getElementById(ids.wrapperId);
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = ids.wrapperId;
      wrapper.className = 'row pagination-bar';
      wrapper.style.marginTop = '12px';
      wrapper.dataset.paginationManaged = 'true';
      wrapper.dataset.autoPagination = 'true';
      wrapper.innerHTML = `
        ${buildPageSizeControlHtml(ids.selectId)}
        <span id="${ids.infoId}" class="helper"></span>
        <div id="${ids.paginationId}" class="row pagination-actions"></div>
      `;
      table.insertAdjacentElement('afterend', wrapper);
      const select = wrapper.querySelector(`#${ids.selectId}`);
      const paginationState = ensureTablePaginationState(buildAutoPaginationKey(sectionId, table, index));
      if (select) {
        select.value = String(paginationState.pageSize || 10);
        select.addEventListener('change', (e) => {
          paginationState.pageSize = Number(e.target.value || 10);
          paginationState.currentPage = 1;
          applyAutomaticSectionTablePagination(sectionId);
        });
      }
    }

    const rows = Array.from(tbody.querySelectorAll(':scope > tr'));
    const dataRows = rows.filter(isAutoPaginatedDataRow);
    const paginationState = ensureTablePaginationState(buildAutoPaginationKey(sectionId, table, index));
    const pagination = paginateEntries(dataRows, paginationState);
    syncPageSizeSelect(ids.selectId, paginationState);
    updatePaginationControls({
      infoId: ids.infoId,
      containerId: ids.paginationId,
      filters: paginationState,
      totalItems: dataRows.length,
      onPageChange: (page) => {
        paginationState.currentPage = page;
        applyAutomaticSectionTablePagination(sectionId);
      }
    });

    const visibleRows = new Set(pagination.items);
    rows.forEach((row) => {
      if (!isAutoPaginatedDataRow(row)) {
        row.style.display = '';
        return;
      }
      row.style.display = visibleRows.has(row) ? '' : 'none';
    });
  });
}

const listConfigs = [
  {
    sectionId: 'warehouseStaff',
    path: 'warehouseStaff',
    titleKey: 'warehouse_staff',
    fields: [
      { key: 'name', labelKey: 'name', type: 'text', required: true },
      { key: 'phone', labelKey: 'phone', type: 'text' },
      { key: 'note', labelKey: 'note', type: 'text' }
    ],
    columns: ['name', 'phone', 'note']
  },
  {
    sectionId: 'productionStaff',
    path: 'productionStaff',
    titleKey: 'production_staff',
    fields: [
      { key: 'nameAr', labelKey: 'name_ar', type: 'text', required: true },
      { key: 'nameEn', labelKey: 'name_en', type: 'text', required: true }
    ],
    columns: [
      { key: 'nameAr', labelKey: 'name', type: 'localizedName' }
    ]
  },
  {
    sectionId: 'branches',
    path: 'branches',
    titleKey: 'branches',
    fields: [
      { key: 'nameAr', labelKey: 'name_ar', type: 'text', required: true },
      { key: 'nameEn', labelKey: 'name_en', type: 'text', required: true },
      { key: 'address', labelKey: 'address', type: 'text' },
      { key: 'isMain', labelKey: 'main_branch', type: 'checkbox' }
    ],
    columns: [
      { key: 'nameAr', labelKey: 'name', type: 'localizedName' },
      { key: 'address', labelKey: 'address' },
      { key: 'isMain', labelKey: 'main_branch', type: 'boolean' }
    ]
  },
  {
    sectionId: 'deliveryZones',
    path: 'deliveryZones',
    titleKey: 'delivery_zones',
    fields: [
      { key: 'nameAr', labelKey: 'name_ar', type: 'text', required: true },
      { key: 'nameEn', labelKey: 'name_en', type: 'text', required: true }
    ],
    columns: [
      { key: 'nameAr', labelKey: 'name', type: 'localizedName' },
      { key: 'customerCount', labelKey: 'customers_count', type: 'customerCount' }
    ]
  },
  {
    sectionId: 'deliveryPrices',
    path: 'deliveryPrices',
    titleKey: 'delivery_prices',
    fields: [
      { key: 'price', labelKey: 'delivery_price', type: 'number', required: true },
      { key: 'zoneIds', labelKey: 'delivery_zones', type: 'multi-select', optionsPath: 'deliveryZones', required: true }
    ],
    columns: [
      { key: 'price', labelKey: 'delivery_price', type: 'number' },
      { key: 'zoneIds', labelKey: 'delivery_zones', type: 'multi-select', optionsPath: 'deliveryZones' }
    ]
  },
  {
    sectionId: 'orderTypes',
    path: 'orderTypes',
    titleKey: 'order_types',
    fields: [
      { key: 'nameAr', labelKey: 'name_ar', type: 'text', required: true },
      { key: 'nameEn', labelKey: 'name_en', type: 'text', required: true }
    ],
    columns: [
      { key: 'nameAr', labelKey: 'name', type: 'localizedName' },
      { key: 'nameEn', labelKey: 'name_en' }
    ]
  },
  {
    sectionId: 'paymentMethods',
    path: 'paymentMethods',
    titleKey: 'payment_methods',
    fields: [
      { key: 'nameAr', labelKey: 'name_ar', type: 'text', required: true },
      { key: 'nameEn', labelKey: 'name_en', type: 'text', required: true }
    ],
    columns: [
      { key: 'nameAr', labelKey: 'name', type: 'localizedName' }
    ]
  }
];

let currentDiscountType = 'code';
const MANAGER_DISCOUNT_ID = 'managerDiscount';
const DEFAULT_MANAGER_USER_ID = 'manager';
const DEFAULT_MANAGER_USER = {
  name: 'غير معرف',
  role: 'manager',
  code: '123456',
  active: true
};

const sectionGroups = {
  itemCards: 'inventory',
  countryOrigins: 'inventory',
  stockMaterials: 'inventory',
  materialCategories: 'inventory',
  storageLocations: 'inventory',
  productionFollowUp: 'inventory',
  issue: 'inventory',
  production: 'inventory',
  productionStaff: 'inventory',
  inventoryCount: 'inventory',
  receiving: 'inventory',
  transfers: 'inventory',
  cashierTransferRequests: 'inventory',
  stockReturn: 'inventory',
  scrapReturn: 'inventory',
  suppliers: 'suppliers',
  purchase: 'suppliers',
  supplierReturn: 'suppliers',
  pendingStockMoves: 'administration',
  devicesCashiers: 'administration',
  users: 'administration',
  tables: 'administration',
  warehouseStaff: 'administration',
  branches: 'administration',
  deliveryZones: 'administration',
  deliveryPrices: 'administration',
  discounts: 'administration',
  orderTypes: 'administration',
  paymentMethods: 'administration'
};

const navItems = Array.from(document.querySelectorAll('.nav-item')).filter((item) => item.dataset.section);
const navGroups = Array.from(document.querySelectorAll('.nav-group'));

const els = {
  userName: document.getElementById('userName'),
  userRole: document.getElementById('userRole'),
  logoutBtn: document.getElementById('logoutBtn'),
  loginOverlay: document.getElementById('loginOverlay'),
  loginCode: document.getElementById('loginCode'),
  loginBtn: document.getElementById('loginBtn'),
  loginError: document.getElementById('loginError'),
  detailOverlay: document.getElementById('detailOverlay'),
  detailBody: document.getElementById('detailBody'),
  detailClose: document.getElementById('detailClose'),
  discountOverlay: document.getElementById('discountOverlay'),
  discountBody: document.getElementById('discountBody'),
  discountClose: document.getElementById('discountClose'),
  productModal: document.getElementById('productModal'),
  productForm: document.getElementById('productForm'),
  productCancel: document.getElementById('productCancel'),
  productError: document.getElementById('productError'),
  categoryModal: document.getElementById('categoryModal'),
  categoryForm: document.getElementById('categoryForm'),
  categoryCancel: document.getElementById('categoryCancel'),
  categoryError: document.getElementById('categoryError'),
  categoryProductsModal: document.getElementById('categoryProductsModal'),
  categoryProductsSave: document.getElementById('categoryProductsSave'),
  categoryProductsCancel: document.getElementById('categoryProductsCancel'),
  categoryProductSearch: document.getElementById('categoryProductSearch'),
  categoryProductList: document.getElementById('categoryProductList'),
  materialModal: document.getElementById('materialModal'),
  materialForm: document.getElementById('materialForm'),
  materialCancel: document.getElementById('materialCancel'),
  materialError: document.getElementById('materialError'),
  materialCategoryModal: document.getElementById('materialCategoryModal'),
  materialCategoryForm: document.getElementById('materialCategoryForm'),
  materialCategoryCancel: document.getElementById('materialCategoryCancel'),
  materialCategoryError: document.getElementById('materialCategoryError'),
  materialCategoryProductsModal: document.getElementById('materialCategoryProductsModal'),
  materialCategoryProductsSave: document.getElementById('materialCategoryProductsSave'),
  materialCategoryProductsCancel: document.getElementById('materialCategoryProductsCancel'),
  materialCategoryProductSearch: document.getElementById('materialCategoryProductSearch'),
  materialCategoryProductList: document.getElementById('materialCategoryProductList'),
  storageLocationModal: document.getElementById('storageLocationModal'),
  storageLocationForm: document.getElementById('storageLocationForm'),
  storageLocationCancel: document.getElementById('storageLocationCancel'),
  storageLocationError: document.getElementById('storageLocationError'),
  storageItemsModal: document.getElementById('storageItemsModal'),
  storageItemsSave: document.getElementById('storageItemsSave'),
  storageItemsCancel: document.getElementById('storageItemsCancel'),
  storageItemsSearch: document.getElementById('storageItemsSearch'),
  storageItemsList: document.getElementById('storageItemsList'),
  qtyModal: document.getElementById('qtyModal'),
  qtyModalTitle: document.getElementById('qtyModalTitle'),
  qtyModalUnit: document.getElementById('qtyModalUnit'),
  qtyModalStock: document.getElementById('qtyModalStock'),
  qtyModalDisplay: document.getElementById('qtyModalDisplay'),
  qtyModalConfirm: document.getElementById('qtyModalConfirm'),
  qtyModalCancel: document.getElementById('qtyModalCancel'),
  qtyModalError: document.getElementById('qtyModalError'),
  productionDateModal: document.getElementById('productionDateModal'),
  productionDateInput: document.getElementById('productionDateInput'),
  expiryDateInput: document.getElementById('expiryDateInput'),
  productionDateNext: document.getElementById('productionDateNext'),
  productionDateCancel: document.getElementById('productionDateCancel'),
  productionDateError: document.getElementById('productionDateError'),
  productionLinkModal: document.getElementById('productionLinkModal'),
  productionIssueList: document.getElementById('productionIssueList'),
  productionLinkConfirm: document.getElementById('productionLinkConfirm'),
  productionLinkSkip: document.getElementById('productionLinkSkip'),
  productionLinkCancel: document.getElementById('productionLinkCancel'),
  issueDetailOverlay: document.getElementById('issueDetailOverlay'),
  issueDetailBody: document.getElementById('issueDetailBody'),
  issueDetailClose: document.getElementById('issueDetailClose'),
  importProgressOverlay: document.getElementById('importProgressOverlay'),
  importProgressTitle: document.getElementById('importProgressTitle'),
  importProgressSubtitle: document.getElementById('importProgressSubtitle'),
  importProgressFill: document.getElementById('importProgressFill'),
  importProgressCount: document.getElementById('importProgressCount'),
  importProgressPercent: document.getElementById('importProgressPercent'),
  importProgressErrors: document.getElementById('importProgressErrors'),
  reorderNotice: document.getElementById('reorderNotice'),
  orderEditOverlay: document.getElementById('orderEditOverlay'),
  orderEditForm: document.getElementById('orderEditForm'),
  orderEditCancel: document.getElementById('orderEditCancel'),
  orderDeleteBtn: document.getElementById('orderDeleteBtn'),
  orderEditError: document.getElementById('orderEditError'),
  orderItemsList: document.getElementById('orderItemsList'),
  orderAddProduct: document.getElementById('orderAddProduct'),
  orderAddQty: document.getElementById('orderAddQty'),
  orderAddBtn: document.getElementById('orderAddBtn'),
  customerOrdersOverlay: document.getElementById('customerOrdersOverlay'),
  customerOrdersList: document.getElementById('customerOrdersList'),
  customerOrdersClose: document.getElementById('customerOrdersClose'),
  unitModal: document.getElementById('unitModal'),
  unitForm: document.getElementById('unitForm'),
  unitCancel: document.getElementById('unitCancel'),
  unitError: document.getElementById('unitError')
};

function init() {
  state.deviceId = getDeviceId();
  initPresence('accounting');
  bindLanguageButtons();
  bindLogin();
  bindOrderEditForm();
  bindUnitForm();
  bindNavigation();
  bindQtyModal();
  bindProductionDateModal();
  bindProductionLinkModal();
  ensureSeedData();
  document.addEventListener('keydown', handleGlobalScan);
  initSections();
  initNumericInputEnhancer();
  watchData();
  document.addEventListener('focusout', () => setTimeout(flushPendingDataRefresh, 0));
  document.addEventListener('click', () => setTimeout(flushPendingDataRefresh, 0));
  window.addEventListener('focus', () => flushPendingDataRefresh());

  document.addEventListener('languageChanged', () => {
    rebuildSections();
  });
}

function getDeviceId() {
  let id = localStorage.getItem('deviceId');
  if (!id) {
    id = `dev-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36).slice(-4)}`;
    localStorage.setItem('deviceId', id);
  }
  return id;
}

function initPresence(page) {
  const deviceRef = db.ref(`devices/${state.deviceId}`);
  const statusRef = db.ref(`status/${state.deviceId}`);
  const label = localStorage.getItem('deviceLabel') || `ADM-${state.deviceId.slice(-4)}`;

  deviceRef.update({
    label,
    lastSeen: serverTime,
    page,
    deviceId: state.deviceId
  });

  db.ref('.info/connected').on('value', (snap) => {
    if (snap.val() === true) {
      statusRef.onDisconnect().set({ online: false, lastSeen: serverTime, page });
      statusRef.set({ online: true, lastSeen: serverTime, page });
    }
  });

  setInterval(() => {
    deviceRef.update({ lastSeen: serverTime, page });
  }, 60000);
}

function ensureSeedData() {
  const usersRef = db.ref('users');
  usersRef.child(DEFAULT_MANAGER_USER_ID).once('value').then((snap) => {
    if (!snap.exists()) {
      usersRef.child(DEFAULT_MANAGER_USER_ID).set({ ...DEFAULT_MANAGER_USER });
      return;
    }
    const current = snap.val() || {};
    const updates = {};
    if (current.role !== 'manager') updates.role = 'manager';
    if (current.active !== true) updates.active = true;
    if (!String(current.name || '').trim()) updates.name = DEFAULT_MANAGER_USER.name;
    if (!String(current.code || '').trim()) updates.code = DEFAULT_MANAGER_USER.code;
    if (Object.keys(updates).length) {
      usersRef.child(DEFAULT_MANAGER_USER_ID).update(updates);
    }
  }).catch(() => {});
}

function bindLanguageButtons() {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => window.i18n.setLanguage(btn.dataset.lang));
  });
}

function bindLogin() {
  els.loginBtn.addEventListener('click', () => handleLogin());
  els.loginCode.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
  if (els.logoutBtn) {
    els.logoutBtn.addEventListener('click', () => handleLogout());
  }
}

function bindOrderEditForm() {
  if (els.orderEditForm) {
    els.orderEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveOrderEdits();
    });
  }

  if (els.orderAddBtn) {
    els.orderAddBtn.addEventListener('click', () => {
      if (!state.editingOrder) return;
      const productId = els.orderAddProduct.value;
      const qty = Number(els.orderAddQty.value || 1);
      const product = state.cache.products?.[productId];
      if (!product) return;
      const existing = state.editingOrder.items.find((item) => item.productId === productId);
      if (existing) {
        existing.qty += qty;
      } else {
        state.editingOrder.items.push({
          productId,
          name: getLocalizedName(product),
          price: Number(product.price || 0),
          qty: qty > 0 ? qty : 1
        });
      }
      els.orderAddQty.value = 1;
      renderOrderItemsEditor();
    });
  }

  if (els.orderDeleteBtn) {
    els.orderDeleteBtn.addEventListener('click', () => deleteOrder());
  }
}

function bindUnitForm() {
  if (els.unitForm) {
    els.unitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveUnit();
    });
  }
}

function findUserByCode(code) {
  const codeStr = String(code).trim();
  if (!codeStr) return Promise.resolve(null);
  const queries = [
    db.ref('users').orderByChild('code').equalTo(codeStr).once('value')
  ];
  const codeNum = Number(codeStr);
  if (!Number.isNaN(codeNum)) {
    queries.push(db.ref('users').orderByChild('code').equalTo(codeNum).once('value'));
  }

  return Promise.all(queries).then((snaps) => {
    for (const snap of snaps) {
      if (snap.exists()) {
        const userId = Object.keys(snap.val())[0];
        return { id: userId, ...snap.val()[userId] };
      }
    }
    return null;
  });
}

function handleLogin() {
  const code = normalizeDigits(els.loginCode.value).trim();
  if (!code) return;

  findUserByCode(code)
    .then((user) => {
      if (!user) {
        els.loginError.textContent = window.i18n.t('invalid_code');
        return;
      }
      state.user = user;
      state.role = user.role;
      state.dismissedNoticeKeys = {};
      updateUserBadge();
      applyRoleAccess();
      updateReorderNotice();
      els.loginOverlay.classList.add('hidden');
      els.loginError.textContent = '';
      selectSection(state.currentSection);
    })
    .catch(() => {
      els.loginError.textContent = window.i18n.t('error');
    });
}

function handleLogout() {
  if (!confirm(window.i18n.t('confirm_logout'))) return;
  state.user = null;
  state.role = null;
  updateUserBadge();
  applyRoleAccess();
  if (els.loginCode) els.loginCode.value = '';
  if (els.loginError) els.loginError.textContent = '';
  if (els.loginOverlay) els.loginOverlay.classList.remove('hidden');
  window.location.href = 'index.html';
}

function updateUserBadge() {
  els.userName.textContent = state.user?.name || '-';
  if (!state.role) {
    els.userRole.textContent = '-';
    return;
  }
  const roleKey = state.role === 'manager' ? 'role_manager' : state.role === 'cashier' ? 'role_cashier' : 'role_storekeeper';
  els.userRole.textContent = window.i18n.t(roleKey);
}

function applyRoleAccess() {
  const hideGroups = [];
  if (state.role === 'cashier') {
    hideGroups.push('inventory', 'suppliers');
  }
  if (state.role === 'storekeeper') {
    hideGroups.push('administration');
  }

  navItems.forEach((item) => {
    const group = item.dataset.group || sectionGroups[item.dataset.section];
    if (group && hideGroups.includes(group)) {
      item.classList.add('hidden');
    } else {
      item.classList.remove('hidden');
    }
  });

  navGroups.forEach((groupEl) => {
    const groupName = groupEl.dataset.group;
    if (hideGroups.includes(groupName)) {
      groupEl.classList.add('hidden');
    } else {
      groupEl.classList.remove('hidden');
    }
  });

  Object.entries(sectionGroups).forEach(([sectionId, group]) => {
    const section = document.getElementById(`section-${sectionId}`);
    if (!section) return;
    if (hideGroups.includes(group)) {
      section.classList.add('hidden');
    } else {
      section.classList.remove('hidden');
    }
  });

  const allowed = navItems.find((item) => !item.classList.contains('hidden'));
  if (allowed && document.getElementById(`section-${state.currentSection}`)?.classList.contains('hidden')) {
    state.currentSection = allowed.dataset.section;
  }
}

function syncNavigationGroups() {
  navGroups.forEach((groupEl) => {
    const toggle = groupEl.querySelector('.group-toggle');
    const hasActiveChild = Boolean(groupEl.querySelector('.nav-item.active'));
    groupEl.classList.toggle('has-active', hasActiveChild);
    if (hasActiveChild) {
      groupEl.classList.add('open');
    }
    if (toggle) {
      toggle.setAttribute('aria-expanded', groupEl.classList.contains('open') ? 'true' : 'false');
    }
  });
}

function bindNavigation() {
  navItems.forEach((item) => {
    item.addEventListener('click', () => selectSection(item.dataset.section));
  });

  navGroups.forEach((groupEl) => {
    const toggle = groupEl.querySelector('.group-toggle');
    toggle.addEventListener('click', () => {
      groupEl.classList.toggle('open');
      toggle.setAttribute('aria-expanded', groupEl.classList.contains('open') ? 'true' : 'false');
    });
  });

  syncNavigationGroups();

  els.detailClose.addEventListener('click', () => {
    els.detailOverlay.classList.add('hidden');
  });

  if (els.discountClose) {
    els.discountClose.addEventListener('click', () => {
      els.discountOverlay.classList.add('hidden');
    });
  }

  if (els.productCancel) {
    els.productCancel.addEventListener('click', () => {
      closeProductModal();
    });
  }

  if (els.categoryCancel) {
    els.categoryCancel.addEventListener('click', () => {
      closeCategoryModal();
    });
  }

  if (els.categoryProductsCancel) {
    els.categoryProductsCancel.addEventListener('click', () => {
      closeCategoryProductsModal();
    });
  }

  if (els.materialCancel) {
    els.materialCancel.addEventListener('click', () => {
      closeMaterialModal();
    });
  }

  if (els.materialCategoryCancel) {
    els.materialCategoryCancel.addEventListener('click', () => {
      closeMaterialCategoryModal();
    });
  }

  if (els.materialCategoryProductsCancel) {
    els.materialCategoryProductsCancel.addEventListener('click', () => {
      closeMaterialCategoryProductsModal();
    });
  }

  if (els.storageLocationCancel) {
    els.storageLocationCancel.addEventListener('click', () => {
      closeStorageLocationModal();
    });
  }

  if (els.storageItemsCancel) {
    els.storageItemsCancel.addEventListener('click', () => {
      closeStorageItemsModal();
    });
  }

  if (els.qtyModalCancel) {
    els.qtyModalCancel.addEventListener('click', () => closeQtyModal());
  }

  if (els.productionDateCancel) {
    els.productionDateCancel.addEventListener('click', () => {
      closeProductionDateModal();
      if (state.productionDraft?.item && !state.productionDraft.productionDate && !state.productionDraft.expiryDate) {
        clearProductionItem();
        renderProductionDraft();
        renderProductionSearchResults();
      }
    });
  }

  if (els.productionLinkCancel) {
    els.productionLinkCancel.addEventListener('click', () => closeProductionLinkModal());
  }

  if (els.issueDetailClose) {
    els.issueDetailClose.addEventListener('click', () => {
      els.issueDetailOverlay.classList.add('hidden');
    });
  }

  if (els.orderEditCancel) {
    els.orderEditCancel.addEventListener('click', () => {
      closeOrderEditModal();
    });
  }

  if (els.customerOrdersClose) {
    els.customerOrdersClose.addEventListener('click', () => {
      els.customerOrdersOverlay.classList.add('hidden');
    });
  }

  if (els.unitCancel) {
    els.unitCancel.addEventListener('click', () => {
      closeUnitModal();
    });
  }
}

function routeScanValue(value) {
  const applyTo = (inputId, handler) => {
    const input = document.getElementById(inputId);
    if (!input) return false;
    input.value = value;
    if (typeof handler === 'function') handler();
    return true;
  };

  const isOpen = (id) => {
    const el = document.getElementById(id);
    return el && !el.classList.contains('hidden');
  };

  if (isOpen('issueVoucherModal')) {
    return applyTo('issueSearchInput', handleIssueBarcodeScan);
  }
  if (isOpen('productionVoucherModal')) {
    return applyTo('productionSearchInput', handleProductionBarcodeScan);
  }
  if (isOpen('inventoryCountModal')) {
    return applyTo('inventorySearchInput', handleInventoryBarcodeScan);
  }
  if (isOpen('transferVoucherModal')) {
    return applyTo('transferSearchInput', handleTransferBarcodeScan);
  }
  if (isOpen('stockReturnModal')) {
    return applyTo('stockReturnSearchInput', handleStockReturnBarcodeScan);
  }
  if (isOpen('scrapReturnModal')) {
    return applyTo('scrapReturnSearchInput', handleScrapReturnBarcodeScan);
  }
  if (isOpen('purchaseModal')) {
    return applyTo('purchaseSearchInput', handlePurchaseBarcodeScan);
  }
  if (isOpen('supplierReturnModal')) {
    return applyTo('supplierReturnSearchInput', handleSupplierReturnBarcodeScan);
  }
  if (isOpen('itemCardPicker')) {
    return applyTo('itemCardSearchInput', handleItemCardBarcodeScan);
  }

  if (state.currentSection === 'products') {
    const input = document.getElementById('productSearch');
    if (input) {
      input.value = value;
      state.productFilters.query = value.trim();
      state.productFilters.currentPage = 1;
      renderProductsSection();
      return true;
    }
  }

  if (state.currentSection === 'stockMaterials') {
    const input = document.getElementById('materialSearch');
    if (input) {
      input.value = value;
      state.materialFilters.query = value.trim();
      state.materialFilters.currentPage = 1;
      renderStockMaterialsSection();
      return true;
    }
  }

  return false;
}
function selectSection(sectionId) {
  if (!state.user) return;
  navItems.forEach((item) => item.classList.remove('active'));
  navItems.find((item) => item.dataset.section === sectionId)?.classList.add('active');
  syncNavigationGroups();

  document.querySelectorAll('.section').forEach((section) => {
    section.classList.remove('active');
  });

  const target = document.getElementById(`section-${sectionId}`);
  if (target) {
    target.classList.add('active');
    state.currentSection = sectionId;
    applyAutomaticSectionTablePagination(sectionId);
  }
}

function initSections() {
  setupReportsSection();
  setupOrdersSection();
  setupPendingStockMovesSection();
  setupDevicesCashiersSection();
  setupDiscountsSection();
  setupUsersSection();
  setupTablesSection();
  setupProductsSection();
  setupProductInfoSection();
  setupProductCategoriesSection();
  setupItemCardSection();
  setupCountryOriginsSection();
  setupProductionFollowUpSection();
  setupStockMaterialsSection();
  setupMaterialCategoriesSection();
  setupStorageLocationsSection();
  setupIssueSection();
  setupProductionSection();
  setupInventoryCountSection();
  setupReceivingSection();
  setupTransfersSection();
  setupCashierTransferRequestsSection();
  setupStockReturnSection();
  setupScrapReturnSection();
  setupSuppliersSection();
  setupPurchasesSection();
  setupSupplierReturnSection();
  setupCustomersSection();
  setupUnitsSection();
  initListSections();
  selectSection(state.currentSection);
}

function rebuildSections() {
  setupReportsSection();
  setupOrdersSection();
  setupPendingStockMovesSection();
  setupDevicesCashiersSection();
  setupDiscountsSection();
  setupUsersSection();
  setupTablesSection();
  setupProductsSection();
  setupProductInfoSection();
  setupProductCategoriesSection();
  setupItemCardSection();
  setupCountryOriginsSection();
  setupProductionFollowUpSection();
  setupStockMaterialsSection();
  setupMaterialCategoriesSection();
  setupStorageLocationsSection();
  setupIssueSection();
  setupProductionSection();
  setupInventoryCountSection();
  setupReceivingSection();
  setupTransfersSection();
  setupCashierTransferRequestsSection();
  setupStockReturnSection();
  setupScrapReturnSection();
  setupSuppliersSection();
  setupPurchasesSection();
  setupSupplierReturnSection();
  setupCustomersSection();
  setupUnitsSection();
  initListSections();
  applyRoleAccess();
  selectSection(state.currentSection);
}

function initListSections() {
  listConfigs.forEach((config) => {
    buildListSection(config);
  });
}

function buildListSection(config) {
  const section = document.getElementById(`section-${config.sectionId}`);
  if (!section) return;
  const paginationState = ensureTablePaginationState(config.sectionId);

  const fieldHtml = config.fields
    .map((field) => {
      const inputId = `${config.sectionId}-${field.key}`;
      const label = window.i18n.t(field.labelKey);
      if (config.sectionId === 'deliveryPrices' && field.key === 'zoneIds') {
        return `
          <div>
            <label class="tag">${label}</label>
            <details id="deliveryPricesZonePicker" class="multi-select-filter">
              <summary id="deliveryPricesZoneSummary" class="input">${window.i18n.t('select')}</summary>
              <div class="multi-select-panel">
                <input id="deliveryPricesZoneSearch" class="input" placeholder="${window.i18n.t('search_zone')}" />
                <div class="row" style="justify-content: space-between; margin-top: 8px;">
                  <button type="button" id="deliveryPricesZoneSelectAll" class="btn ghost small">${window.i18n.t('select_all')}</button>
                  <button type="button" id="deliveryPricesZoneClear" class="btn ghost small">${window.i18n.t('cancel')}</button>
                </div>
                <div id="deliveryPricesZoneOptions" class="multi-select-options" style="margin-top: 8px;"></div>
              </div>
            </details>
            <select id="${inputId}" name="${field.key}" class="input hidden" multiple></select>
          </div>
        `;
      }
      if (field.type === 'select' || field.type === 'multi-select') {
        const multipleAttr = field.type === 'multi-select' ? 'multiple' : '';
        return `
          <div>
            <label class="tag" for="${inputId}">${label}</label>
            <select id="${inputId}" name="${field.key}" class="input" ${multipleAttr}></select>
          </div>
        `;
      }
      if (field.type === 'checkbox') {
        return `
          <div class="row">
            <input id="${inputId}" name="${field.key}" type="checkbox" />
            <label class="tag" for="${inputId}">${label}</label>
          </div>
        `;
      }
      return `
        <div>
          <label class="tag" for="${inputId}">${label}</label>
          <input id="${inputId}" class="input" name="${field.key}" type="${field.type}" />
        </div>
      `;
    })
    .join('');

  const headerHtml = config.columns
    .map((col) => {
      const key = typeof col === 'string' ? col : col.labelKey || col.key;
      return `<th>${window.i18n.t(key)}</th>`;
    })
    .join('');

  const filterHtml = config.sectionId === 'customers'
    ? `
      <div class="row" style="margin-bottom: 12px;">
        <label class="tag">${window.i18n.t('delivery_zones')}</label>
        <select id="customerZoneFilter"></select>
      </div>
    `
    : '';

  const bulkZonesHtml = config.sectionId === 'deliveryZones'
    ? `
      <div class="row" style="justify-content: flex-end; gap: 8px; margin-bottom: 12px;">
        <button type="button" id="zonesTemplateBtn" class="btn ghost small">${window.i18n.t('download_template')}</button>
        <button type="button" id="zonesBulkBtn" class="btn primary">${window.i18n.t('add_zones_bulk')}</button>
        <input type="file" id="zonesBulkInput" class="hidden" accept=".xlsx,.xls" />
      </div>
      <p id="zonesBulkStatus" class="helper"></p>
    `
    : '';

  section.innerHTML = `
    <div class="card">
      <h2>${window.i18n.t(config.titleKey)}</h2>
      ${bulkZonesHtml}
      <form class="grid two" data-section="${config.sectionId}">
        ${fieldHtml}
        <div class="row">
          <button type="submit" class="btn primary" data-action="submit">${window.i18n.t('add')}</button>
          <button type="button" class="btn ghost hidden" data-action="cancel">${window.i18n.t('cancel')}</button>
        </div>
        <p class="helper form-error"></p>
      </form>
    </div>
    <div class="card">
      ${filterHtml}
      <div class="row" style="justify-content: flex-end; margin-bottom: 12px;">
        ${buildPageSizeControlHtml(`${config.sectionId}PageSize`)}
      </div>
      <table class="table">
        <thead>
          <tr>
            ${headerHtml}
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      ${buildPaginationBarHtml(`${config.sectionId}PageInfo`, `${config.sectionId}Pagination`)}
    </div>
  `;

  const form = section.querySelector('form');
  const cancelBtn = section.querySelector('[data-action="cancel"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleListSubmit(config, form, cancelBtn);
  });

  cancelBtn.addEventListener('click', () => resetListForm(form, cancelBtn));

  if (config.sectionId === 'deliveryZones') {
    const bulkBtn = section.querySelector('#zonesBulkBtn');
    const templateBtn = section.querySelector('#zonesTemplateBtn');
    const fileInput = section.querySelector('#zonesBulkInput');
    if (bulkBtn && fileInput) {
      bulkBtn.addEventListener('click', () => fileInput.click());
    }
    if (templateBtn) {
      templateBtn.addEventListener('click', () => downloadDeliveryZoneTemplate());
    }
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        handleBulkImportZonesFile(file);
        e.target.value = '';
      });
    }
  }

  if (config.sectionId === 'customers') {
    const filterSelect = section.querySelector('#customerZoneFilter');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        state.customerFilters.zoneId = e.target.value;
        renderListSection(config);
      });
      renderCustomerZoneFilter(filterSelect);
    }
  }

  if (config.sectionId === 'deliveryPrices') {
    bindDeliveryPricesZonePicker(section);
  }

  const pageSizeSelect = section.querySelector(`#${config.sectionId}PageSize`);
  if (pageSizeSelect) {
    pageSizeSelect.value = String(paginationState.pageSize || 10);
    pageSizeSelect.addEventListener('change', (e) => {
      paginationState.pageSize = Number(e.target.value || 10);
      paginationState.currentPage = 1;
      renderListSection(config);
    });
  }

  renderListSection(config);
}

function handleListSubmit(config, form, cancelBtn) {
  const data = getFormData(config, form);
  const errorEl = form.querySelector('.form-error');
  if (!data) {
    errorEl.textContent = window.i18n.t('error');
    return;
  }

  errorEl.textContent = '';
  const editId = form.dataset.editId;
  const finalize = () => {
    if (editId) {
      db.ref(`${config.path}/${editId}`).update(data).then(() => {
        resetListForm(form, cancelBtn);
      });
    } else {
      db.ref(config.path).push(data).then(() => {
        resetListForm(form, cancelBtn);
      });
    }
  };

  if (config.sectionId === 'products' && !editId) {
    const branches = state.cache.branches || {};
    const mainBranchEntry = Object.entries(branches).find(([, branch]) => branch.isMain);
    if (mainBranchEntry) {
      const [mainBranchId] = mainBranchEntry;
      data.mainBranchId = mainBranchId;
      data.stockByBranch = { [mainBranchId]: 0 };
    }
  }

  if (config.sectionId === 'branches' && data.isMain) {
    const updates = {};
    const branches = state.cache.branches || {};
    Object.keys(branches).forEach((branchId) => {
      if (!editId || branchId !== editId) {
        updates[`branches/${branchId}/isMain`] = false;
      }
    });
    db.ref().update(updates).then(finalize);
    return;
  }

  finalize();
}

function getFormData(config, form) {
  const payload = {};
  for (const field of config.fields) {
    const input = form.querySelector(`[name="${field.key}"]`);
    if (!input) continue;
    let value = '';
    if (field.type === 'checkbox') {
      value = input.checked;
    } else if (field.type === 'multi-select') {
      value = Array.from(input.selectedOptions)
        .map((opt) => opt.value)
        .filter((val) => val !== '');
    } else {
      value = input.value.trim();
      if (field.type === 'number') {
        value = value === '' ? '' : Number(value);
      }
    }
    if (field.required && (value === '' || value === null || value === undefined || (Array.isArray(value) && value.length === 0))) {
      return null;
    }
    payload[field.key] = value;
  }
  return payload;
}

function resetListForm(form, cancelBtn) {
  form.reset();
  if (form.dataset.section === 'deliveryPrices') {
    const hiddenSelect = form.querySelector('[name="zoneIds"]');
    if (hiddenSelect) {
      Array.from(hiddenSelect.options).forEach((opt) => { opt.selected = false; });
    }
    const section = form.closest('section');
    if (section) renderDeliveryPricesZonePicker(section);
  }
  delete form.dataset.editId;
  const submitBtn = form.querySelector('[data-action="submit"]');
  submitBtn.textContent = window.i18n.t('add');
  cancelBtn.classList.add('hidden');
}

function renderListSection(config) {
  const section = document.getElementById(`section-${config.sectionId}`);
  if (!section) return;
  const form = section.querySelector('form');
  const tbody = section.querySelector('tbody');
  const cancelBtn = section.querySelector('[data-action="cancel"]');
  const paginationState = ensureTablePaginationState(config.sectionId);

  if (config.sectionId === 'customers') {
    const filterSelect = section.querySelector('#customerZoneFilter');
    if (filterSelect) {
      renderCustomerZoneFilter(filterSelect);
    }
  }

  config.fields.forEach((field) => {
    if (field.type === 'select' || field.type === 'multi-select') {
      const select = form.querySelector(`[name="${field.key}"]`);
      if (select) {
        const current = field.type === 'multi-select'
          ? Array.from(select.selectedOptions).map((opt) => opt.value)
          : select.value;
        renderSelectOptions(select, field);
        if (field.type === 'multi-select') {
          Array.from(select.options).forEach((opt) => {
            opt.selected = current.includes(opt.value);
          });
        } else {
          select.value = current;
        }
      }
    }
  });
  if (config.sectionId === 'deliveryPrices') {
    renderDeliveryPricesZonePicker(section);
  }

  const data = state.cache[config.path] || {};
  tbody.innerHTML = '';

  let entries = Object.entries(data);
  if (config.sectionId === 'customers' && state.customerFilters.zoneId !== 'all') {
    entries = entries.filter(([, item]) => item.zoneId === state.customerFilters.zoneId);
  }
  const pagination = paginateEntries(entries, paginationState);
  const pagedEntries = pagination.items;
  updatePaginationControls({
    infoId: `${config.sectionId}PageInfo`,
    containerId: `${config.sectionId}Pagination`,
    filters: paginationState,
    totalItems: entries.length,
    onPageChange: (page) => {
      paginationState.currentPage = page;
      renderListSection(config);
    }
  });
  syncPageSizeSelect(`${config.sectionId}PageSize`, paginationState);
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="${config.columns.length + 1}">${window.i18n.t('no_data')}</td>`;
    tbody.appendChild(row);
    return;
  }

  pagedEntries.forEach(([id, item]) => {
    const row = document.createElement('tr');
    const cells = config.columns
      .map((col) => {
        if (typeof col === 'string') {
          return `<td>${item[col] || '-'}</td>`;
        }
        if (col.type === 'select') {
          const label = getOptionLabel(col.optionsPath, item[col.key]);
          return `<td>${label}</td>`;
        }
        if (col.type === 'multi-select') {
          const label = getOptionLabels(col.optionsPath, item[col.key]);
          return `<td>${label}</td>`;
        }
        if (col.type === 'localizedName') {
          return `<td>${getLocalizedName(item)}</td>`;
        }
        if (col.type === 'customerLevel') {
          return `<td>${getCustomerLevelLabel(item[col.key])}</td>`;
        }
        if (col.type === 'boolean') {
          return `<td>${getBooleanLabel(!!item[col.key])}</td>`;
        }
        if (col.type === 'date') {
          return `<td>${item[col.key] || '-'}</td>`;
        }
        if (col.type === 'customerCount') {
          const count = countCustomersByZone(id);
          return `<td>${count}</td>`;
        }
        if (col.type === 'number') {
          const raw = item[col.key];
          const keyLower = String(col.key || '').toLowerCase();
          const isMoneyField = ['price', 'cost', 'amount', 'value', 'fee'].some((token) => keyLower.includes(token));
          return `<td>${isMoneyField ? formatMoney(raw) : (raw ?? '-')}</td>`;
        }
        return `<td>${item[col.key] || '-'}</td>`;
      })
      .join('');

    const extraAction = config.sectionId === 'deliveryZones'
      ? `<button class="btn ghost small" data-action="view-customers">${window.i18n.t('view_customers')}</button>`
      : '';
    row.innerHTML = `
      ${cells}
      <td>
        ${extraAction}
        <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
        <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
      </td>
    `;

    row.querySelector('[data-action="edit"]').addEventListener('click', () => {
      form.dataset.editId = id;
      config.fields.forEach((field) => {
        const input = form.querySelector(`[name="${field.key}"]`);
        if (input) {
          if (field.type === 'checkbox') {
            input.checked = !!item[field.key];
          } else if (field.type === 'multi-select') {
            const values = Array.isArray(item[field.key]) ? item[field.key] : [];
            Array.from(input.options).forEach((opt) => {
              opt.selected = values.includes(opt.value);
            });
          } else {
            input.value = item[field.key] ?? '';
          }
        }
      });
      const submitBtn = form.querySelector('[data-action="submit"]');
      submitBtn.textContent = window.i18n.t('update');
      cancelBtn.classList.remove('hidden');
      if (config.sectionId === 'deliveryPrices') {
        renderDeliveryPricesZonePicker(section);
      }
    });

    row.querySelector('[data-action="delete"]').addEventListener('click', () => {
      if (confirm(window.i18n.t('confirm_delete'))) {
        db.ref(`${config.path}/${id}`).remove();
      }
    });

    if (config.sectionId === 'deliveryZones') {
      row.querySelector('[data-action="view-customers"]').addEventListener('click', () => {
        state.customerFilters.zoneId = id;
        state.customerFilters.zoneIds = [id];
        state.customerFilters.detailsCustomerId = null;
        selectSection('customers');
        renderCustomersSection();
      });
    }

    tbody.appendChild(row);
  });
}

function getDeliveryPricesZoneSelectedIds(section) {
  const select = section?.querySelector('form [name="zoneIds"]');
  if (!select) return [];
  return Array.from(select.selectedOptions).map((opt) => opt.value).filter(Boolean);
}

function setDeliveryPricesZoneSelectedIds(section, ids) {
  const select = section?.querySelector('form [name="zoneIds"]');
  if (!select) return;
  const selected = new Set(ids || []);
  Array.from(select.options).forEach((opt) => {
    opt.selected = selected.has(opt.value);
  });
}

function getDeliveryPricesZoneSummaryText(selectedIds) {
  const zones = state.cache.deliveryZones || {};
  if (!selectedIds.length) return window.i18n.t('select');
  if (selectedIds.length === 1) {
    return getLocalizedName(zones[selectedIds[0]]) || window.i18n.t('select');
  }
  return `${window.i18n.t('delivery_zones')} (${selectedIds.length})`;
}

function bindDeliveryPricesZonePicker(section) {
  const searchInput = section.querySelector('#deliveryPricesZoneSearch');
  const selectAllBtn = section.querySelector('#deliveryPricesZoneSelectAll');
  const clearBtn = section.querySelector('#deliveryPricesZoneClear');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderDeliveryPricesZonePicker(section));
  }
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', () => {
      setDeliveryPricesZoneSelectedIds(section, Object.keys(state.cache.deliveryZones || {}));
      renderDeliveryPricesZonePicker(section);
      const details = section.querySelector('#deliveryPricesZonePicker');
      if (details) details.open = true;
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      setDeliveryPricesZoneSelectedIds(section, []);
      renderDeliveryPricesZonePicker(section);
      const details = section.querySelector('#deliveryPricesZonePicker');
      if (details) details.open = true;
    });
  }
}

function renderDeliveryPricesZonePicker(section) {
  const summary = section.querySelector('#deliveryPricesZoneSummary');
  const searchInput = section.querySelector('#deliveryPricesZoneSearch');
  const optionsWrap = section.querySelector('#deliveryPricesZoneOptions');
  if (!summary || !optionsWrap) return;
  const selectedIds = getDeliveryPricesZoneSelectedIds(section);
  summary.textContent = getDeliveryPricesZoneSummaryText(selectedIds);
  const selectedSet = new Set(selectedIds);
  const query = normalizeSearchValue(searchInput?.value || '');
  const entries = Object.entries(state.cache.deliveryZones || {})
    .map(([id, zone]) => ({ id, name: getLocalizedName(zone) || '-' }))
    .filter((entry) => !query || normalizeSearchValue(entry.name).includes(query))
    .sort((a, b) => a.name.localeCompare(b.name));
  optionsWrap.innerHTML = '';
  if (!entries.length) {
    optionsWrap.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  entries.forEach((entry) => {
    const label = document.createElement('label');
    label.className = 'multi-select-option';
    label.innerHTML = `
      <input type="checkbox" value="${entry.id}" ${selectedSet.has(entry.id) ? 'checked' : ''} />
      <span>${entry.name}</span>
    `;
    const checkbox = label.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      const next = new Set(getDeliveryPricesZoneSelectedIds(section));
      if (checkbox.checked) next.add(entry.id);
      else next.delete(entry.id);
      setDeliveryPricesZoneSelectedIds(section, Array.from(next));
      renderDeliveryPricesZonePicker(section);
      const details = section.querySelector('#deliveryPricesZonePicker');
      if (details) details.open = true;
    });
    optionsWrap.appendChild(label);
  });
}

function renderSelectOptions(select, field) {
  const optionsPath = field.optionsPath;
  const staticOptions = field.staticOptions;
  const isMulti = field.type === 'multi-select';
  select.innerHTML = '';

  if (!isMulti) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = window.i18n.t('select');
    select.appendChild(placeholder);
  }

  if (staticOptions && staticOptions.length) {
    staticOptions.forEach((opt) => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = window.i18n.t(opt.labelKey);
      select.appendChild(option);
    });
    return;
  }

  const data = state.cache[optionsPath] || {};
  Object.entries(data).forEach(([id, item]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(item);
    select.appendChild(option);
  });
}

function getOptionLabel(optionsPath, id) {
  if (!id) return '-';
  const data = state.cache[optionsPath] || {};
  return getLocalizedName(data[id]) || id;
}

function getOptionLabels(optionsPath, ids) {
  if (!Array.isArray(ids) || ids.length === 0) return '-';
  return ids.map((id) => getOptionLabel(optionsPath, id)).join(', ');
}

function getTodayIsoDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function ensureReportsState() {
  if (!state.reports) {
    state.reports = {
      view: 'dashboard',
      period: 'day',
      date: getTodayIsoDate(),
      compareEnabled: false,
      compareValues: {
        day: '',
        week: '',
        month: ''
      },
      branchId: 'all',
      metricDetails: {
        metricKey: 'orders',
        branchId: 'all',
        cashierId: 'all',
        customerId: 'all',
        query: ''
      },
      salesFilters: {
        fromDate: '',
        toDate: '',
        query: '',
        categoryId: 'all',
        categoryPickerPath: [],
        selectedRowKeys: [],
        autoSelectAll: true,
        productIds: [],
        mainCategoryId: 'all',
        subCategoryId: 'all',
        branchId: 'all'
      },
      cashierSalesFilters: {
        fromDate: '',
        toDate: '',
        branchId: 'all'
      },
      returnsFilters: {
        fromDate: '',
        toDate: '',
        branchId: 'all',
        query: '',
        sort: 'desc'
      },
      topProductsFilters: {
        fromDate: '',
        toDate: '',
        query: '',
        sortKey: 'total',
        sortDir: 'desc',
        mode: 'top',
        limit: 10,
        dashboardRunRequested: false
      },
      orderSalesFilters: {
        fromDate: '',
        toDate: '',
        branchId: 'all',
        query: ''
      },
      details: {
        productId: null,
        branchId: 'all'
      },
      cashierDetails: {
        cashierId: null
      },
      topProductDetails: {
        productId: null,
        branchId: 'all',
        fromDate: '',
        toDate: '',
        cashierId: 'all',
        query: ''
      }
    };
  }
  if (!state.reports.date) state.reports.date = getTodayIsoDate();
  if (!state.reports.period) state.reports.period = 'day';
  if (!state.reports.view) state.reports.view = 'dashboard';
  if (!state.reports.compareValues) {
    state.reports.compareValues = { day: '', week: '', month: '' };
  }
  if (!state.reports.metricDetails) {
    state.reports.metricDetails = {
      metricKey: 'orders',
      branchId: 'all',
      cashierId: 'all',
      customerId: 'all',
      query: ''
    };
  }
  if (!state.reports.salesFilters) {
    state.reports.salesFilters = {
      fromDate: '',
      toDate: '',
      query: '',
      categoryId: 'all',
      categoryPickerPath: [],
      selectedRowKeys: [],
      autoSelectAll: true,
      productIds: [],
      mainCategoryId: 'all',
      subCategoryId: 'all',
      branchId: 'all'
    };
  }
  if (state.reports.salesFilters.fromDate === undefined) state.reports.salesFilters.fromDate = '';
  if (state.reports.salesFilters.toDate === undefined) state.reports.salesFilters.toDate = '';
  if (!state.reports.salesFilters.categoryId) state.reports.salesFilters.categoryId = 'all';
  if (!Array.isArray(state.reports.salesFilters.categoryPickerPath)) state.reports.salesFilters.categoryPickerPath = [];
  if (!Array.isArray(state.reports.salesFilters.selectedRowKeys)) state.reports.salesFilters.selectedRowKeys = [];
  if (state.reports.salesFilters.autoSelectAll === undefined) state.reports.salesFilters.autoSelectAll = true;
  if (!state.reports.cashierSalesFilters) {
    state.reports.cashierSalesFilters = {
      fromDate: '',
      toDate: '',
      branchId: 'all'
    };
  }
  if (!state.reports.returnsFilters) {
    state.reports.returnsFilters = {
      fromDate: '',
      toDate: '',
      branchId: 'all',
      query: '',
      sort: 'desc'
    };
  }
  if (!state.reports.topProductsFilters) {
    state.reports.topProductsFilters = {
      fromDate: '',
      toDate: '',
      query: '',
      sortKey: 'total',
      sortDir: 'desc',
      mode: 'top',
      limit: 10,
      dashboardRunRequested: false
    };
  }
  if (!['top', 'bottom'].includes(state.reports.topProductsFilters.mode)) state.reports.topProductsFilters.mode = 'top';
  if (![10, 50, 100].includes(Number(state.reports.topProductsFilters.limit))) state.reports.topProductsFilters.limit = 10;
  if (state.reports.topProductsFilters.dashboardRunRequested === undefined) {
    state.reports.topProductsFilters.dashboardRunRequested = false;
  }
  if (!state.reports.orderSalesFilters) {
    state.reports.orderSalesFilters = {
      fromDate: '',
      toDate: '',
      branchId: 'all',
      query: ''
    };
  }
  if (state.reports.orderSalesFilters.fromDate === undefined) state.reports.orderSalesFilters.fromDate = '';
  if (state.reports.orderSalesFilters.toDate === undefined) state.reports.orderSalesFilters.toDate = '';
  if (!state.reports.orderSalesFilters.branchId) state.reports.orderSalesFilters.branchId = 'all';
  if (state.reports.orderSalesFilters.query === undefined) state.reports.orderSalesFilters.query = '';
  if (!Array.isArray(state.reports.salesFilters.productIds)) {
    state.reports.salesFilters.productIds = [];
  }
  if (!state.reports.details) {
    state.reports.details = { productId: null, branchId: 'all' };
  }
  if (!state.reports.cashierDetails) {
    state.reports.cashierDetails = { cashierId: null };
  }
  if (!state.reports.topProductDetails) {
    state.reports.topProductDetails = {
      productId: null,
      branchId: 'all',
      fromDate: '',
      toDate: '',
      cashierId: 'all',
      query: ''
    };
  }
}

function setupReportsSection() {
  ensureReportsState();
  renderReportsSection();
}

function renderReportsSection() {
  const section = document.getElementById('section-reports');
  if (!section) return;
  ensureReportsState();
  if (state.reports.view === 'sales') {
    renderSalesReportView(section);
    return;
  }
  if (state.reports.view === 'productDetails') {
    renderSalesProductDetailsView(section);
    return;
  }
  if (state.reports.view === 'metricDetails') {
    renderMetricDetailsView(section);
    return;
  }
  if (state.reports.view === 'cashierSales') {
    renderCashierSalesReportView(section);
    return;
  }
  if (state.reports.view === 'cashierSalesDetails') {
    renderCashierSalesDetailsView(section);
    return;
  }
  if (state.reports.view === 'returns') {
    renderReturnsReportView(section);
    return;
  }
  if (state.reports.view === 'orderSales') {
    renderOrderSalesReportView(section);
    return;
  }
  if (state.reports.view === 'topProducts') {
    renderTopProductsReportView(section);
    return;
  }
  if (state.reports.view === 'topProductDetails') {
    renderTopProductDetailsView(section);
    return;
  }
  renderReportsDashboardView(section);
}

function parseReportAnchorDate(value) {
  if (!value) return new Date();
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function buildReportRange(period, dateValue) {
  const dayMs = 24 * 60 * 60 * 1000;
  const hourMs = 60 * 60 * 1000;
  const anchor = parseReportAnchorDate(dateValue);
  let start;
  let end;
  let step;
  let count;

  if (period === 'week') {
    const anchorDay = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate());
    start = anchorDay.getTime() - (6 * dayMs);
    step = dayMs;
    count = 7;
    end = start + (count * step) - 1;
  } else if (period === 'month') {
    const firstDay = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const daysInMonth = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0).getDate();
    start = firstDay.getTime();
    step = dayMs;
    count = daysInMonth;
    end = start + (count * step) - 1;
  } else {
    const dayStart = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate()).getTime();
    start = dayStart;
    step = hourMs;
    count = 24;
    end = start + (count * step) - 1;
  }

  const compareStart = start - (count * step);
  const compareEnd = start - 1;
  return { period, start, end, step, count, compareStart, compareEnd };
}

function getIsoWeekValue(dateInput) {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return '';
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
  return `${utcDate.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

function parseIsoWeekValue(value) {
  const match = String(value || '').match(/^(\d{4})-W(\d{2})$/);
  if (!match) return null;
  const year = Number(match[1]);
  const week = Number(match[2]);
  if (!year || !week) return null;
  const simple = new Date(Date.UTC(year, 0, 1 + ((week - 1) * 7)));
  const day = simple.getUTCDay();
  const monday = new Date(simple);
  if (day <= 4) {
    monday.setUTCDate(simple.getUTCDate() - day + 1);
  } else {
    monday.setUTCDate(simple.getUTCDate() + 8 - day);
  }
  return new Date(monday.getUTCFullYear(), monday.getUTCMonth(), monday.getUTCDate());
}

function getMonthValue(dateInput) {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function parseMonthValue(value) {
  const match = String(value || '').match(/^(\d{4})-(\d{2})$/);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    if (!year || !month || month < 1 || month > 12) return null;
    return new Date(year, month - 1, 1);
  }
  const fullDate = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (fullDate) {
    const year = Number(fullDate[1]);
    const month = Number(fullDate[2]);
    if (!year || !month || month < 1 || month > 12) return null;
    return new Date(year, month - 1, 1);
  }
  return null;
}

function getDefaultCompareValue(period, currentDateValue) {
  const anchor = parseReportAnchorDate(currentDateValue);
  if (period === 'month') {
    const prevMonth = new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1);
    return getTodayIsoDateFromDate(prevMonth);
  }
  if (period === 'week') {
    const prevWeek = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - 7);
    return getTodayIsoDateFromDate(prevWeek);
  }
  const prevDay = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - 1);
  return getTodayIsoDateFromDate(prevDay);
}

function getTodayIsoDateFromDate(dateInput) {
  const date = new Date(dateInput);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getCompareInputType(period) {
  if (period === 'month') return 'month';
  if (period === 'week') return 'week';
  return 'date';
}

function getPrimaryPeriodValue(period, anchorDateValue) {
  if (period === 'month') return getMonthValue(anchorDateValue);
  if (period === 'week') return getIsoWeekValue(anchorDateValue);
  return anchorDateValue || getTodayIsoDate();
}

function resolvePrimaryDate(period, inputValue, fallbackDateValue) {
  if (period === 'month') {
    const parsed = parseMonthValue(inputValue);
    if (parsed) return getTodayIsoDateFromDate(parsed);
    const rawDate = parseReportAnchorDate(inputValue);
    if (!Number.isNaN(rawDate.getTime())) {
      return getTodayIsoDateFromDate(new Date(rawDate.getFullYear(), rawDate.getMonth(), 1));
    }
    return fallbackDateValue;
  }
  if (period === 'week') {
    const parsed = parseIsoWeekValue(inputValue);
    if (parsed) return getTodayIsoDateFromDate(parsed);
    const rawDate = parseReportAnchorDate(inputValue);
    if (!Number.isNaN(rawDate.getTime())) return getTodayIsoDateFromDate(rawDate);
    return fallbackDateValue;
  }
  return inputValue || fallbackDateValue;
}

function buildCompareRange(currentRange, compareValue, currentDateValue) {
  const period = currentRange.period;
  const fallbackStart = currentRange.compareStart;
  const fallback = {
    period,
    start: fallbackStart,
    end: currentRange.compareEnd,
    step: currentRange.step,
    count: currentRange.count
  };

  if (!compareValue) return fallback;

  if (period === 'day') {
    const parsed = parseReportAnchorDate(compareValue);
    if (Number.isNaN(parsed.getTime())) return fallback;
    const dayStart = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()).getTime();
    return {
      period,
      start: dayStart,
      end: dayStart + (currentRange.count * currentRange.step) - 1,
      step: currentRange.step,
      count: currentRange.count
    };
  }

  if (period === 'week') {
    let weekStart = parseIsoWeekValue(compareValue);
    if (!weekStart) {
      const parsedDate = parseReportAnchorDate(compareValue);
      if (Number.isNaN(parsedDate.getTime())) return fallback;
      weekStart = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
    }
    const start = weekStart.getTime();
    const step = currentRange.step;
    const count = currentRange.count;
    return {
      period,
      start,
      end: start + (count * step) - 1,
      step,
      count
    };
  }

  if (period === 'month') {
    const monthStart = parseMonthValue(compareValue);
    if (!monthStart) return fallback;
    const step = currentRange.step;
    const start = monthStart.getTime();
    return {
      period,
      start,
      end: start + (currentRange.count * step) - 1,
      step,
      count: currentRange.count
    };
  }

  return fallback;
}

function formatAxisLabel(timestamp, period) {
  const lang = window.i18n.getLanguage();
  const locale = lang === 'ar' ? 'ar' : 'en';
  const date = new Date(timestamp);
  if (period === 'day') {
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
  if (period === 'week') {
    return date.toLocaleDateString(locale, {
      weekday: 'short',
      month: 'short',
      day: '2-digit'
    });
  }
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: '2-digit'
  });
}

function getAxisLabelIndexes(count) {
  if (count <= 0) return [];
  const maxLabels = count <= 8 ? count : 8;
  const step = Math.ceil(count / maxLabels);
  const indexes = [];
  for (let index = 0; index < count; index += step) {
    indexes.push(index);
  }
  if (!indexes.includes(count - 1)) indexes.push(count - 1);
  return indexes;
}

function buildChartAxis(range) {
  const indexes = getAxisLabelIndexes(range.count);
  const labels = indexes.map((index) => {
    const ts = range.start + (index * range.step);
    const label = formatAxisLabel(ts, range.period);
    const left = range.count <= 1 ? 0 : (index / (range.count - 1)) * 100;
    return `<span style="left:${left.toFixed(2)}%">${label}</span>`;
  }).join('');
  return `<div class="report-axis-labels">${labels}</div>`;
}

function getReportBucketIndex(timestamp, range) {
  const value = Number(timestamp || 0);
  if (value < range.start || value > range.end) return -1;
  const index = Math.floor((value - range.start) / range.step);
  if (index < 0 || index >= range.count) return -1;
  return index;
}

function getOrdersInRange(start, end, branchId = 'all') {
  const orders = state.cache.orders || {};
  return Object.entries(orders)
    .map(([id, order]) => ({ id, ...order }))
    .filter((order) => {
      const createdAt = Number(order.createdAt || 0);
      if (!createdAt || createdAt < start || createdAt > end) return false;
      if (branchId !== 'all' && order.branchId !== branchId) return false;
      return true;
    });
}

function getOrderItemCost(item) {
  const products = state.cache.products || {};
  const productId = item.productId || item.itemId || item.id;
  const product = products[productId];
  return Number(product?.cost || 0);
}

function calcOrderItemsCost(order) {
  return normalizeItems(order.items).reduce((sum, item) => {
    const qty = Number(item.qty || 0);
    const cost = getOrderItemCost(item);
    return sum + (qty * cost);
  }, 0);
}

function buildDashboardMetrics(range, compareRange, branchId) {
  const series = {
    orders: Array(range.count).fill(0),
    revenue: Array(range.count).fill(0),
    netRevenue: Array(range.count).fill(0)
  };
  const compareSeries = {
    orders: Array(compareRange.count).fill(0),
    revenue: Array(compareRange.count).fill(0),
    netRevenue: Array(compareRange.count).fill(0)
  };
  const totals = { orders: 0, revenue: 0, netRevenue: 0 };
  const compareTotals = { orders: 0, revenue: 0, netRevenue: 0 };

  const currentOrders = getOrdersInRange(range.start, range.end, branchId);
  currentOrders.forEach((order) => {
    const idx = getReportBucketIndex(order.createdAt, range);
    if (idx < 0) return;
    const revenue = Number(order.total || 0);
    const delivery = Number(order.deliveryFee || 0);
    const cost = calcOrderItemsCost(order);
    const netRevenue = revenue - delivery - cost;
    series.orders[idx] += 1;
    series.revenue[idx] += revenue;
    series.netRevenue[idx] += netRevenue;
    totals.orders += 1;
    totals.revenue += revenue;
    totals.netRevenue += netRevenue;
  });

  const previousOrders = getOrdersInRange(compareRange.start, compareRange.end, branchId);
  previousOrders.forEach((order) => {
    const idx = getReportBucketIndex(order.createdAt, compareRange);
    if (idx < 0) return;
    const revenue = Number(order.total || 0);
    const delivery = Number(order.deliveryFee || 0);
    const cost = calcOrderItemsCost(order);
    const netRevenue = revenue - delivery - cost;
    compareSeries.orders[idx] += 1;
    compareSeries.revenue[idx] += revenue;
    compareSeries.netRevenue[idx] += netRevenue;
    compareTotals.orders += 1;
    compareTotals.revenue += revenue;
    compareTotals.netRevenue += netRevenue;
  });

  return { series, compareSeries, totals, compareTotals };
}

function alignSeriesToLength(values, targetLength) {
  const list = Array.isArray(values) ? values : [];
  if (targetLength <= 0) return [];
  const output = [];
  for (let i = 0; i < targetLength; i += 1) {
    output.push(Number(list[i] ?? 0));
  }
  return output;
}

function buildSparkline(metricKey, points, comparePoints, range, compareRange, isCount, compareEnabled) {
  const width = 340;
  const height = 130;
  const pad = 10;
  const current = alignSeriesToLength(points, range.count);
  const previous = alignSeriesToLength(comparePoints, range.count);
  const merged = [...current, ...previous, 0];
  const min = Math.min(...merged);
  const max = Math.max(...merged);
  const span = max - min || 1;
  const stepX = current.length > 1 ? (width - (pad * 2)) / (current.length - 1) : width - (pad * 2);

  const pointToXY = (value, index) => {
    const x = pad + (index * stepX);
    const y = height - pad - (((Number(value || 0) - min) / span) * (height - (pad * 2)));
    return { x, y };
  };

  const toPolyline = (values) => values.map((value, index) => {
    const point = pointToXY(value, index);
    return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
  }).join(' ');

  const currentPolyline = toPolyline(current);
  const comparePolyline = compareEnabled ? toPolyline(previous) : '';

  const currentDots = current.map((value, index) => {
    const point = pointToXY(value, index);
    return `<circle class="report-point report-point-current" data-index="${index}" data-series="current" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="3.5"></circle>`;
  }).join('');

  const compareDots = compareEnabled
    ? previous.map((value, index) => {
      const point = pointToXY(value, index);
      return `<circle class="report-point report-point-compare" data-index="${index}" data-series="compare" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="3"></circle>`;
    }).join('')
    : '';

  return `
    <div class="report-sparkline-host"
      data-metric="${metricKey}"
      data-is-count="${isCount ? '1' : '0'}"
      data-period="${range.period}"
      data-start="${range.start}"
      data-step="${range.step}"
      data-compare-start="${compareRange?.start ?? ''}"
      data-compare-step="${compareRange?.step ?? ''}"
      data-current="${current.join(',')}"
      data-compare="${previous.join(',')}"
      data-compare-enabled="${compareEnabled ? '1' : '0'}">
      <svg class="report-sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="rgba(30,25,20,0.15)" stroke-width="1"></line>
        ${compareEnabled ? `<polyline points="${comparePolyline}" fill="none" stroke="#6ea2f6" stroke-width="2" stroke-dasharray="5 4"></polyline>` : ''}
        <polyline points="${currentPolyline}" fill="none" stroke="#6f45d6" stroke-width="2.5"></polyline>
        ${compareDots}
        ${currentDots}
      </svg>
      <div class="report-point-tooltip"></div>
    </div>
  `;
}

function parseSeriesCsv(value) {
  return String(value || '')
    .split(',')
    .filter((item) => item !== '')
    .map((item) => Number(item || 0));
}

function formatMetricPointValue(value, isCount) {
  if (isCount) return String(Math.round(Number(value || 0)));
  return formatMoney(value);
}

function getPointDiff(currentValue, baseValue) {
  const current = Number(currentValue || 0);
  const base = Number(baseValue || 0);
  const delta = current - base;
  if (base === 0 && current === 0) return { delta, percent: 0 };
  if (base === 0) return { delta, percent: null };
  return { delta, percent: (delta / base) * 100 };
}

function formatPointDiff(diff, isCount) {
  const deltaValue = isCount ? Math.round(diff.delta) : Number(formatNumber(diff.delta));
  const deltaText = `${deltaValue >= 0 ? '+' : ''}${isCount ? String(deltaValue) : formatNumber(deltaValue)}`;
  if (diff.percent === null) {
    return `${deltaText} (${window.i18n.t('new_value')})`;
  }
  return `${deltaText} (${diff.percent >= 0 ? '+' : ''}${diff.percent.toFixed(1)}%)`;
}

function formatPointDiffPercent(diff) {
  if (diff.percent === null) return '(+100.0%)';
  return `(${diff.percent >= 0 ? '+' : ''}${diff.percent.toFixed(1)}%)`;
}

function getDiffClassName(diff) {
  if (diff.percent === null) return 'positive';
  if (diff.percent > 0) return 'positive';
  if (diff.percent < 0) return 'negative';
  return 'neutral';
}

function bindSparklineInteractions(section) {
  const hosts = Array.from(section.querySelectorAll('.report-sparkline-host'));
  hosts.forEach((host) => {
    const tooltip = host.querySelector('.report-point-tooltip');
    if (!tooltip) return;
    const isCount = host.dataset.isCount === '1';
    const period = host.dataset.period || 'day';
    const start = Number(host.dataset.start || 0);
    const step = Number(host.dataset.step || 0);
    const compareStart = Number(host.dataset.compareStart || 0);
    const compareStep = Number(host.dataset.compareStep || 0);
    const compareEnabled = host.dataset.compareEnabled === '1';
    const metricKey = host.dataset.metric || 'orders';
    const metricLabel = getMetricPointLabel(metricKey);
    const currentSeries = parseSeriesCsv(host.dataset.current);
    const compareSeries = parseSeriesCsv(host.dataset.compare);

    const showTooltip = (pointEl, index) => {
      const currentValue = Number(currentSeries[index] || 0);
      const currentTs = start + (index * step);
      const currentLabel = formatAxisLabel(currentTs, period);
      let html = `<div class="tt-title">${currentLabel}</div>`;

      if (!compareEnabled) {
        const previousValue = index > 0 ? Number(currentSeries[index - 1] || 0) : null;
        if (previousValue === null) {
          html += `<div class="tt-line">${metricLabel}: <strong>${formatMetricPointValue(currentValue, isCount)}</strong> <span class="tt-percent positive">(+0.0%)</span></div>`;
        } else {
          const diff = getPointDiff(currentValue, previousValue);
          const diffClass = getDiffClassName(diff);
          html += `<div class="tt-line">${metricLabel}: <strong>${formatMetricPointValue(currentValue, isCount)}</strong> <span class="tt-percent ${diffClass}">${formatPointDiffPercent(diff)}</span></div>`;
        }
      } else {
        const compareValue = Number(compareSeries[index] || 0);
        const compareTs = compareStart + (index * compareStep);
        const compareLabel = compareTs ? formatAxisLabel(compareTs, period) : '-';
        const diff = getPointDiff(currentValue, compareValue);
        const diffClass = getDiffClassName(diff);
        html += `<div class="tt-line">${window.i18n.t('reports_current')} ${metricLabel}: <strong>${formatMetricPointValue(currentValue, isCount)}</strong></div>`;
        html += `<div class="tt-line">${window.i18n.t('reports_compare')} (${compareLabel}) ${metricLabel}: <strong>${formatMetricPointValue(compareValue, isCount)}</strong></div>`;
        html += `<div class="tt-line"><span class="tt-percent ${diffClass}">${formatPointDiffPercent(diff)}</span></div>`;
      }

      tooltip.innerHTML = html;
      tooltip.classList.add('show');

      const hostRect = host.getBoundingClientRect();
      const pointRect = pointEl.getBoundingClientRect();
      const tooltipWidth = tooltip.offsetWidth || 180;
      const tooltipHeight = tooltip.offsetHeight || 90;
      const pointX = (pointRect.left - hostRect.left) + (pointRect.width / 2);
      const pointY = (pointRect.top - hostRect.top) + pointRect.height;
      let left = pointX - (tooltipWidth / 2);
      if (left < 4) left = 4;
      if (left + tooltipWidth > hostRect.width - 4) left = hostRect.width - tooltipWidth - 4;
      let top = pointY + 8;
      if (top + tooltipHeight > hostRect.height - 4) {
        top = pointY - tooltipHeight - 8;
      }
      if (top < 4) top = 4;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    };

    const hideTooltip = () => {
      tooltip.classList.remove('show');
    };

    host.querySelectorAll('.report-point').forEach((pointEl) => {
      const index = Number(pointEl.dataset.index || 0);
      pointEl.addEventListener('mouseenter', () => showTooltip(pointEl, index));
      pointEl.addEventListener('mousemove', () => showTooltip(pointEl, index));
      pointEl.addEventListener('mouseleave', hideTooltip);
      pointEl.addEventListener('focus', () => showTooltip(pointEl, index));
      pointEl.addEventListener('blur', hideTooltip);
      pointEl.setAttribute('tabindex', '0');
    });
  });
}

function getMetricDiff(current, previous) {
  const diffValue = Number(current || 0) - Number(previous || 0);
  if (!previous) {
    return { value: diffValue, percent: null };
  }
  return { value: diffValue, percent: (diffValue / Number(previous)) * 100 };
}

function formatDiffText(diff, isCount = false) {
  if (diff.percent === null) return window.i18n.t('new_value');
  const percent = `${diff.percent >= 0 ? '+' : ''}${diff.percent.toFixed(1)}%`;
  const valueText = isCount
    ? `${diff.value >= 0 ? '+' : ''}${Math.round(diff.value)}`
    : `${diff.value >= 0 ? '+' : '-'}${formatMoney(Math.abs(diff.value))}`;
  return `${percent} | ${valueText}`;
}

function getReportMetricCard(metricKey, title, value, compareValue, series, compareSeries, isCount, range, compareRange) {
  const diff = getMetricDiff(value, compareValue);
  const diffClass = diff.value > 0 ? 'positive' : diff.value < 0 ? 'negative' : '';
  return `
    <div class="card report-metric-card">
      <div class="row" style="justify-content: space-between;">
        <strong>${title}</strong>
        <button class="btn ghost small report-view-btn" data-metric="${metricKey}">${window.i18n.t('view')}</button>
      </div>
      <div class="report-metric-value">${isCount ? Math.round(value) : formatMoney(value)}</div>
      ${state.reports.compareEnabled ? `<div class="report-metric-diff ${diffClass}">${formatDiffText(diff, isCount)}</div>` : ''}
      <div class="report-chart-wrap">
        ${buildSparkline(metricKey, series, state.reports.compareEnabled ? compareSeries : [], range, compareRange, isCount, state.reports.compareEnabled)}
      </div>
      ${buildChartAxis(range)}
    </div>
  `;
}

function getMonthDisplayName(year, monthIndex) {
  const lang = window.i18n.getLanguage();
  const locale = lang === 'ar' ? 'ar' : 'en';
  return new Date(year, monthIndex, 1).toLocaleDateString(locale, { month: 'long' });
}

function buildYearOptions(baseYear) {
  const years = [];
  for (let year = baseYear - 2; year <= baseYear + 2; year += 1) {
    years.push(year);
  }
  return years;
}

function getFirstMondayOfMonth(year, monthIndex) {
  const date = new Date(year, monthIndex, 1);
  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1);
    if (date.getMonth() !== monthIndex) break;
  }
  return date;
}

function getWeeksByMonth(year, monthIndex) {
  const weeks = [];
  const firstMonday = getFirstMondayOfMonth(year, monthIndex);
  if (firstMonday.getMonth() !== monthIndex) return weeks;
  const cursor = new Date(firstMonday);
  while (cursor.getMonth() === monthIndex) {
    const start = new Date(cursor);
    const end = new Date(cursor);
    end.setDate(end.getDate() + 6);
    weeks.push({
      value: getTodayIsoDateFromDate(start),
      start,
      end,
      label: `${formatAxisLabel(start.getTime(), 'week')} - ${formatAxisLabel(end.getTime(), 'week')}`
    });
    cursor.setDate(cursor.getDate() + 7);
  }
  return weeks;
}

function applySelectOptions(selectEl, items, selectedValue) {
  if (!selectEl) return;
  selectEl.innerHTML = '';
  items.forEach((item) => {
    const option = document.createElement('option');
    option.value = String(item.value);
    option.textContent = item.label;
    selectEl.appendChild(option);
  });
  selectEl.value = String(selectedValue ?? '');
}

function mountPeriodControls(containerId, period, valueDate, onValueChange, helperText) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const baseDate = parseReportAnchorDate(valueDate);
  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth();
  const baseIso = getTodayIsoDateFromDate(baseDate);

  if (period === 'day') {
    container.innerHTML = `
      <input id="${containerId}_day" class="input" type="date" value="${baseIso}" style="max-width: 220px;" />
      <div class="helper">${helperText}</div>
    `;
    const input = document.getElementById(`${containerId}_day`);
    if (input) {
      input.addEventListener('change', () => {
        onValueChange(input.value || baseIso);
      });
    }
    return;
  }

  if (period === 'month') {
    container.innerHTML = `
      <div class="row report-period-selects">
        <select id="${containerId}_year" class="input" style="max-width: 120px;"></select>
        <select id="${containerId}_month" class="input" style="max-width: 180px;"></select>
      </div>
      <div class="helper">${helperText}</div>
    `;
    const yearSelect = document.getElementById(`${containerId}_year`);
    const monthSelect = document.getElementById(`${containerId}_month`);
    applySelectOptions(yearSelect, buildYearOptions(baseYear).map((year) => ({ value: year, label: String(year) })), baseYear);
    applySelectOptions(monthSelect, Array.from({ length: 12 }, (_, month) => ({
      value: month,
      label: getMonthDisplayName(baseYear, month)
    })), baseMonth);

    const emitValue = () => {
      const year = Number(yearSelect.value || baseYear);
      const month = Number(monthSelect.value || 0);
      onValueChange(getTodayIsoDateFromDate(new Date(year, month, 1)));
    };
    if (yearSelect) {
      yearSelect.addEventListener('change', () => {
        const year = Number(yearSelect.value || baseYear);
        applySelectOptions(monthSelect, Array.from({ length: 12 }, (_, month) => ({
          value: month,
          label: getMonthDisplayName(year, month)
        })), Number(monthSelect.value || 0));
        emitValue();
      });
    }
    if (monthSelect) {
      monthSelect.addEventListener('change', emitValue);
    }
    return;
  }

  container.innerHTML = `
    <div class="row report-period-selects">
      <select id="${containerId}_year" class="input" style="max-width: 120px;"></select>
      <select id="${containerId}_month" class="input" style="max-width: 180px;"></select>
      <select id="${containerId}_week" class="input" style="max-width: 260px;"></select>
    </div>
    <div class="helper">${helperText}</div>
  `;
  const yearSelect = document.getElementById(`${containerId}_year`);
  const monthSelect = document.getElementById(`${containerId}_month`);
  const weekSelect = document.getElementById(`${containerId}_week`);
  applySelectOptions(yearSelect, buildYearOptions(baseYear).map((year) => ({ value: year, label: String(year) })), baseYear);
  applySelectOptions(monthSelect, Array.from({ length: 12 }, (_, month) => ({
    value: month,
    label: getMonthDisplayName(baseYear, month)
  })), baseMonth);

  const refreshWeeks = () => {
    const year = Number(yearSelect.value || baseYear);
    const month = Number(monthSelect.value || baseMonth);
    const weeks = getWeeksByMonth(year, month);
    applySelectOptions(weekSelect, weeks.map((entry) => ({ value: entry.value, label: entry.label })), baseIso);
    if ((!weekSelect.value || !weeks.find((item) => item.value === weekSelect.value)) && weeks.length) {
      weekSelect.value = weeks[0].value;
    }
  };

  if (yearSelect) {
    yearSelect.addEventListener('change', () => {
      const year = Number(yearSelect.value || baseYear);
      applySelectOptions(monthSelect, Array.from({ length: 12 }, (_, month) => ({
        value: month,
        label: getMonthDisplayName(year, month)
      })), Number(monthSelect.value || 0));
      refreshWeeks();
    });
  }
  if (monthSelect) monthSelect.addEventListener('change', refreshWeeks);
  if (weekSelect) weekSelect.addEventListener('change', () => onValueChange(weekSelect.value || baseIso));
  refreshWeeks();
}

function renderReportsDashboardView(section) {
  const branches = state.cache.branches || {};
  const range = buildReportRange(state.reports.period, state.reports.date);
  const period = state.reports.period;
  let compareValue = state.reports.compareValues?.[period] || getDefaultCompareValue(period, state.reports.date);
  if (period === 'week' && String(compareValue || '').includes('W')) {
    const weekDate = parseIsoWeekValue(compareValue);
    if (weekDate) compareValue = getTodayIsoDateFromDate(weekDate);
  }
  if (period === 'month' && /^\d{4}-\d{2}$/.test(String(compareValue || ''))) {
    compareValue = `${compareValue}-01`;
  }
  const compareRange = buildCompareRange(range, compareValue, state.reports.date);
  const metrics = buildDashboardMetrics(range, compareRange, state.reports.branchId);
  const topProductsFilters = state.reports.topProductsFilters || {};
  const topProductsMode = topProductsFilters.mode === 'bottom' ? 'bottom' : 'top';
  const topProductsLimit = [10, 50, 100].includes(Number(topProductsFilters.limit))
    ? Number(topProductsFilters.limit)
    : 10;
  const topProductsResult = buildTopProductsReportRows({
    ...topProductsFilters,
    mode: topProductsMode,
    limit: topProductsLimit
  });
  const topProductsRows = topProductsResult.rows || [];
  const topProductsBranchColumns = topProductsResult.branchColumns || [];
  const topProductsChartMarkup = renderTopProductsCreativeChart(topProductsRows, topProductsBranchColumns);

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('reports')}</h2>
        <div class="row report-toolbar">
          <select id="reportDashboardBranch" class="input" style="max-width: 220px;"></select>
          <div id="reportPrimaryControls" class="report-period-input-wrap"></div>
          <label class="report-switch report-compare-box">
            <input id="reportCompareToggle" type="checkbox" ${state.reports.compareEnabled ? 'checked' : ''} />
            <span>${window.i18n.t('comparison')}</span>
          </label>
          ${state.reports.compareEnabled ? `
            <div id="reportCompareControls" class="report-period-input-wrap"></div>
          ` : ''}
          <div class="report-period-switch">
            <button class="btn ghost small ${state.reports.period === 'day' ? 'active' : ''}" data-period="day">${window.i18n.t('day')}</button>
            <button class="btn ghost small ${state.reports.period === 'week' ? 'active' : ''}" data-period="week">${window.i18n.t('week')}</button>
            <button class="btn ghost small ${state.reports.period === 'month' ? 'active' : ''}" data-period="month">${window.i18n.t('month')}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="grid two">
      ${getReportMetricCard('orders', window.i18n.t('orders'), metrics.totals.orders, metrics.compareTotals.orders, metrics.series.orders, metrics.compareSeries.orders, true, range, compareRange)}
      ${getReportMetricCard('revenue', window.i18n.t('reports_revenue'), metrics.totals.revenue, metrics.compareTotals.revenue, metrics.series.revenue, metrics.compareSeries.revenue, false, range, compareRange)}
    </div>
    <div class="card">
      <h3>${window.i18n.t('reports_available')}</h3>
      <div class="row" style="margin-top: 14px;">
        <button id="openSalesReportBtn" class="btn primary">${window.i18n.t('sales')}</button>
        <button id="openCashierSalesReportBtn" class="btn ghost">${window.i18n.t('reports_cashier_sales')}</button>
        <button id="openReturnsReportBtn" class="btn ghost">${window.i18n.t('reports_returns')}</button>
        <button id="openOrderSalesReportBtn" class="btn ghost">${window.i18n.t('reports_orders_sales')}</button>
      </div>
    </div>
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('reports_top_products_chart_title')}</h3>
        <div class="row" style="gap: 8px; flex-wrap: wrap;">
          <select id="dashboardTopProductsMode" class="input" style="max-width: 220px;">
            <option value="top" ${topProductsMode === 'top' ? 'selected' : ''}>${window.i18n.t('reports_top_products_mode_top')}</option>
            <option value="bottom" ${topProductsMode === 'bottom' ? 'selected' : ''}>${window.i18n.t('reports_top_products_mode_bottom')}</option>
          </select>
          <select id="dashboardTopProductsLimit" class="input" style="max-width: 140px;">
            <option value="10" ${topProductsLimit === 10 ? 'selected' : ''}>10</option>
            <option value="50" ${topProductsLimit === 50 ? 'selected' : ''}>50</option>
            <option value="100" ${topProductsLimit === 100 ? 'selected' : ''}>100</option>
          </select>
          <button id="openTopProductsReportBtn" class="btn primary">${window.i18n.t('show_report')}</button>
        </div>
      </div>
      <div class="top-products-chart-card" style="margin-top: 12px;">
        ${topProductsChartMarkup}
      </div>
    </div>
  `;

  const branchSelect = document.getElementById('reportDashboardBranch');
  if (branchSelect) {
    branchSelect.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = window.i18n.t('all_branches');
    branchSelect.appendChild(allOption);
    Object.entries(branches).forEach(([id, branch]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(branch);
      branchSelect.appendChild(option);
    });
    branchSelect.value = state.reports.branchId || 'all';
    branchSelect.addEventListener('change', () => {
      state.reports.branchId = branchSelect.value;
      renderReportsSection();
    });
  }

  mountPeriodControls(
    'reportPrimaryControls',
    period,
    state.reports.date,
    (nextValue) => {
      state.reports.date = resolvePrimaryDate(period, nextValue, state.reports.date || getTodayIsoDate());
      renderReportsSection();
    },
    getRangeLabel(range)
  );

  const compareToggle = document.getElementById('reportCompareToggle');
  if (compareToggle) {
    compareToggle.addEventListener('change', () => {
      state.reports.compareEnabled = !!compareToggle.checked;
      if (state.reports.compareEnabled && !state.reports.compareValues[state.reports.period]) {
        state.reports.compareValues[state.reports.period] = getDefaultCompareValue(state.reports.period, state.reports.date);
      }
      renderReportsSection();
    });
  }

  if (state.reports.compareEnabled) {
    mountPeriodControls(
      'reportCompareControls',
      period,
      compareValue,
      (nextValue) => {
        state.reports.compareValues[state.reports.period] = nextValue || '';
        renderReportsSection();
      },
      getRangeLabel(compareRange)
    );
  }

  section.querySelectorAll('[data-period]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.reports.period = btn.dataset.period;
      state.reports.date = resolvePrimaryDate(
        state.reports.period,
        getPrimaryPeriodValue(state.reports.period, state.reports.date),
        state.reports.date
      );
      if (!state.reports.compareValues[state.reports.period]) {
        state.reports.compareValues[state.reports.period] = getDefaultCompareValue(state.reports.period, state.reports.date);
      }
      renderReportsSection();
    });
  });

  section.querySelectorAll('.report-view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.reports.metricDetails.metricKey = btn.dataset.metric || 'orders';
      state.reports.metricDetails.branchId = state.reports.branchId || 'all';
      state.reports.metricDetails.cashierId = 'all';
      state.reports.metricDetails.customerId = 'all';
      state.reports.metricDetails.query = '';
      state.reports.view = 'metricDetails';
      renderReportsSection();
    });
  });

  const openSalesBtn = document.getElementById('openSalesReportBtn');
  if (openSalesBtn) {
    openSalesBtn.addEventListener('click', () => {
      state.reports.view = 'sales';
      renderReportsSection();
    });
  }

  const openCashierSalesBtn = document.getElementById('openCashierSalesReportBtn');
  if (openCashierSalesBtn) {
    openCashierSalesBtn.addEventListener('click', () => {
      state.reports.view = 'cashierSales';
      state.reports.cashierDetails.cashierId = null;
      renderReportsSection();
    });
  }

  const openReturnsReportBtn = document.getElementById('openReturnsReportBtn');
  if (openReturnsReportBtn) {
    openReturnsReportBtn.addEventListener('click', () => {
      state.reports.view = 'returns';
      renderReportsSection();
    });
  }

  const openOrderSalesReportBtn = document.getElementById('openOrderSalesReportBtn');
  if (openOrderSalesReportBtn) {
    openOrderSalesReportBtn.addEventListener('click', () => {
      state.reports.view = 'orderSales';
      renderReportsSection();
    });
  }

  const openTopProductsReportBtn = document.getElementById('openTopProductsReportBtn');
  if (openTopProductsReportBtn) {
    openTopProductsReportBtn.addEventListener('click', () => {
      state.reports.view = 'topProducts';
      renderReportsSection();
    });
  }

  const dashboardTopProductsMode = document.getElementById('dashboardTopProductsMode');
  if (dashboardTopProductsMode) {
    dashboardTopProductsMode.addEventListener('change', () => {
      state.reports.topProductsFilters.mode = dashboardTopProductsMode.value === 'bottom' ? 'bottom' : 'top';
      renderReportsSection();
    });
  }

  const dashboardTopProductsLimit = document.getElementById('dashboardTopProductsLimit');
  if (dashboardTopProductsLimit) {
    dashboardTopProductsLimit.addEventListener('change', () => {
      const nextLimit = Number(dashboardTopProductsLimit.value || 10);
      state.reports.topProductsFilters.limit = [10, 50, 100].includes(nextLimit) ? nextLimit : 10;
      renderReportsSection();
    });
  }

  bindSparklineInteractions(section);
}

function getMetricTitle(metricKey) {
  if (metricKey === 'revenue') return window.i18n.t('reports_revenue');
  if (metricKey === 'netRevenue') return window.i18n.t('reports_net_revenue');
  return window.i18n.t('orders');
}

function getMetricPointLabel(metricKey) {
  if (metricKey === 'revenue') return window.i18n.t('reports_revenue_amount_label');
  if (metricKey === 'netRevenue') return window.i18n.t('reports_net_revenue_amount_label');
  return window.i18n.t('reports_orders_count_label');
}

function getRangeLabel(range) {
  const lang = window.i18n.getLanguage();
  const locale = lang === 'ar' ? 'ar' : 'en';
  const start = new Date(range.start).toLocaleDateString(locale);
  const end = new Date(range.end).toLocaleDateString(locale);
  return `${start} - ${end}`;
}

function getMetricDetailsRows(range, filters) {
  const branches = state.cache.branches || {};
  const customers = state.cache.customers || {};
  const cashiers = state.cache.cashiers || {};
  const query = normalizeSearchValue(filters.query || '');
  const rows = [];

  getOrdersInRange(range.start, range.end, 'all').forEach((order) => {
    const invoiceNumber = order.orderNumber || order.invoiceNumber || order.id || '-';
    const customer = customers[order.customerId] || null;
    const branchName = getLocalizedName(branches[order.branchId]) || order.branchName || '-';
    const cashierName = order.cashierName || cashiers[order.cashierId]?.name || '-';
    const customerName = order.customerName || getLocalizedName(customer) || '-';
    const customerPhone = order.customerPhone || customer?.phone || '-';
    const productsAmount = Number(order.netTotal ?? (Number(order.total || 0) - Number(order.deliveryFee || 0)));
    const deliveryAmount = Number(order.deliveryFee || 0);
    const totalAmount = Number(order.total || 0);
    const costAmount = calcOrderItemsCost(order);
    const netRevenue = totalAmount - deliveryAmount - costAmount;

    if (filters.branchId !== 'all' && order.branchId !== filters.branchId) return;
    if (filters.cashierId !== 'all' && String(order.cashierId || '') !== String(filters.cashierId || '')) return;
    if (filters.customerId !== 'all' && String(order.customerId || '') !== String(filters.customerId || '')) return;

    if (query) {
      const searchBlob = normalizeSearchValue(`${invoiceNumber} ${customerName} ${customerPhone}`);
      if (!searchBlob.includes(query)) return;
    }

    rows.push({
      invoiceNumber,
      customerName,
      customerPhone,
      branchName,
      cashierName,
      productsAmount,
      deliveryAmount,
      totalAmount,
      netRevenue,
      createdAt: Number(order.createdAt || 0)
    });
  });

  rows.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const totals = rows.reduce((acc, row) => {
    acc.invoices += 1;
    acc.products += Number(row.productsAmount || 0);
    acc.delivery += Number(row.deliveryAmount || 0);
    acc.total += Number(row.totalAmount || 0);
    acc.netRevenue += Number(row.netRevenue || 0);
    return acc;
  }, { invoices: 0, products: 0, delivery: 0, total: 0, netRevenue: 0 });

  return { rows, totals };
}

function getMetricFilterOptions(range) {
  const branches = state.cache.branches || {};
  const cashiers = state.cache.cashiers || {};
  const customers = state.cache.customers || {};
  const branchSet = new Set();
  const cashierSet = new Set();
  const customerSet = new Set();

  getOrdersInRange(range.start, range.end, 'all').forEach((order) => {
    if (order.branchId) branchSet.add(order.branchId);
    if (order.cashierId) cashierSet.add(order.cashierId);
    if (order.customerId) customerSet.add(order.customerId);
  });

  const branchOptions = Array.from(branchSet).map((id) => ({
    id,
    label: getLocalizedName(branches[id]) || branches[id]?.name || id
  })).sort((a, b) => a.label.localeCompare(b.label));

  const cashierOptions = Array.from(cashierSet).map((id) => ({
    id,
    label: cashiers[id]?.name || id
  })).sort((a, b) => a.label.localeCompare(b.label));

  const customerOptions = Array.from(customerSet).map((id) => ({
    id,
    label: getLocalizedName(customers[id]) || customers[id]?.name || id
  })).sort((a, b) => a.label.localeCompare(b.label));

  return { branchOptions, cashierOptions, customerOptions };
}

function fillSelectWithOptions(select, options, selectedValue, allLabel) {
  if (!select) return;
  select.innerHTML = '';
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = allLabel;
  select.appendChild(allOption);
  options.forEach((entry) => {
    const option = document.createElement('option');
    option.value = entry.id;
    option.textContent = entry.label;
    select.appendChild(option);
  });
  select.value = selectedValue || 'all';
}

function renderMetricDetailsView(section) {
  ensureReportsState();
  const metricKey = state.reports.metricDetails.metricKey || 'orders';
  const title = getMetricTitle(metricKey);
  const range = buildReportRange(state.reports.period, state.reports.date);
  const { branchOptions, cashierOptions, customerOptions } = getMetricFilterOptions(range);
  const details = getMetricDetailsRows(range, state.reports.metricDetails);

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="metricDetailsBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${title}</h2>
        </div>
        <div class="row">
          <button id="metricDetailsExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="metricDetailsPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="helper" style="margin-top: 8px;">${window.i18n.t('period')}: ${getRangeLabel(range)}</div>
      <div class="grid three" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('reports_total_invoices')}</strong><div class="report-total-value">${details.totals.invoices}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_total_products_amount')}</strong><div class="report-total-value">${formatMoney(details.totals.products)}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_total_delivery_amount')}</strong><div class="report-total-value">${formatMoney(details.totals.delivery)}</div></div>
        <div class="card light"><strong>${window.i18n.t('total_sales')}</strong><div class="report-total-value">${formatMoney(details.totals.total)}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_total_net_revenue')}</strong><div class="report-total-value">${formatMoney(details.totals.netRevenue)}</div></div>
      </div>
      <div class="grid three" style="margin-top: 12px;">
        <div>
          <label class="tag">${window.i18n.t('branch')}</label>
          <select id="metricDetailsBranch" class="input"></select>
        </div>
        <div>
          <label class="tag">${window.i18n.t('cashier')}</label>
          <select id="metricDetailsCashier" class="input"></select>
        </div>
        <div>
          <label class="tag">${window.i18n.t('customer')}</label>
          <select id="metricDetailsCustomer" class="input"></select>
        </div>
      </div>
      <div style="margin-top: 12px;">
        <label class="tag">${window.i18n.t('search')}</label>
        <input id="metricDetailsQuery" class="input" value="${state.reports.metricDetails.query || ''}" placeholder="${window.i18n.t('reports_search_placeholder')}" />
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('row_number')}</th>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('customer_name')}</th>
            <th>${window.i18n.t('customer_phone')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('cashier')}</th>
            <th>${window.i18n.t('reports_products_amount')}</th>
            <th>${window.i18n.t('delivery_fee')}</th>
            <th>${window.i18n.t('grand_total')}</th>
          </tr>
        </thead>
        <tbody id="metricDetailsTableBody"></tbody>
      </table>
    </div>
  `;

  fillSelectWithOptions(
    document.getElementById('metricDetailsBranch'),
    branchOptions,
    state.reports.metricDetails.branchId,
    window.i18n.t('all_branches')
  );
  fillSelectWithOptions(
    document.getElementById('metricDetailsCashier'),
    cashierOptions,
    state.reports.metricDetails.cashierId,
    window.i18n.t('all')
  );
  fillSelectWithOptions(
    document.getElementById('metricDetailsCustomer'),
    customerOptions,
    state.reports.metricDetails.customerId,
    window.i18n.t('all')
  );

  const tableBody = document.getElementById('metricDetailsTableBody');
  if (tableBody) {
    tableBody.innerHTML = '';
    if (!details.rows.length) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="9">${window.i18n.t('no_data')}</td>`;
      tableBody.appendChild(row);
    } else {
      details.rows.forEach((rowData, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${rowData.invoiceNumber || '-'}</td>
          <td>${rowData.customerName || '-'}</td>
          <td>${rowData.customerPhone || '-'}</td>
          <td>${rowData.branchName || '-'}</td>
          <td>${rowData.cashierName || '-'}</td>
          <td>${formatMoney(rowData.productsAmount)}</td>
          <td>${formatMoney(rowData.deliveryAmount)}</td>
          <td>${formatMoney(rowData.totalAmount)}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  }

  const backBtn = document.getElementById('metricDetailsBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.reports.view = 'dashboard';
      renderReportsSection();
    });
  }

  const branchSelect = document.getElementById('metricDetailsBranch');
  if (branchSelect) {
    branchSelect.addEventListener('change', () => {
      state.reports.metricDetails.branchId = branchSelect.value;
      renderReportsSection();
    });
  }

  const cashierSelect = document.getElementById('metricDetailsCashier');
  if (cashierSelect) {
    cashierSelect.addEventListener('change', () => {
      state.reports.metricDetails.cashierId = cashierSelect.value;
      renderReportsSection();
    });
  }

  const customerSelect = document.getElementById('metricDetailsCustomer');
  if (customerSelect) {
    customerSelect.addEventListener('change', () => {
      state.reports.metricDetails.customerId = customerSelect.value;
      renderReportsSection();
    });
  }

  const queryInput = document.getElementById('metricDetailsQuery');
  if (queryInput) {
    bindDebouncedQueryInput(queryInput, (value) => {
      state.reports.metricDetails.query = String(value || '').trim();
      renderReportsSection();
    });
  }

  const exportBtn = document.getElementById('metricDetailsExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!details.rows.length) return;
      const rows = details.rows.map((row, index) => ({
        [window.i18n.t('row_number')]: index + 1,
        [window.i18n.t('invoice_number')]: row.invoiceNumber || '-',
        [window.i18n.t('customer_name')]: row.customerName || '-',
        [window.i18n.t('customer_phone')]: row.customerPhone || '-',
        [window.i18n.t('branch')]: row.branchName || '-',
        [window.i18n.t('cashier')]: row.cashierName || '-',
        [window.i18n.t('reports_products_amount')]: formatMoney(row.productsAmount),
        [window.i18n.t('delivery_fee')]: formatMoney(row.deliveryAmount),
        [window.i18n.t('grand_total')]: formatMoney(row.totalAmount)
      }));
      exportToExcel(rows, 'dashboard-metric-report.xlsx');
    });
  }

  const printBtn = document.getElementById('metricDetailsPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      printMetricDetailsReport(title, details.rows, details.totals, range);
    });
  }
}

function printMetricDetailsReport(title, rows, totals, range) {
  const lang = window.i18n.getLanguage();
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const logoUrl = new URL('logo.png', window.location.href).href;
  const tableRows = rows.map((row, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${row.invoiceNumber || '-'}</td>
      <td>${row.customerName || '-'}</td>
      <td>${row.customerPhone || '-'}</td>
      <td>${row.branchName || '-'}</td>
      <td>${row.cashierName || '-'}</td>
      <td>${formatMoney(row.productsAmount)}</td>
      <td>${formatMoney(row.deliveryAmount)}</td>
      <td>${formatMoney(row.totalAmount)}</td>
    </tr>
  `).join('');

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${dir}">
      <head>
        <title>${title}</title>
        <style>
          body { font-family: 'Cairo', sans-serif; direction: ${dir}; padding: 20px; color: #1e1b16; }
          .head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
          .head img { width: 70px; height: 70px; object-fit: contain; }
          .meta { margin-bottom: 10px; font-size: 12px; }
          .summary { display: grid; grid-template-columns: repeat(5, minmax(120px, 1fr)); gap: 8px; margin: 10px 0 12px; }
          .box { border: 1px solid #ddd; border-radius: 8px; padding: 8px; font-size: 12px; }
          .box strong { display: block; margin-top: 6px; font-size: 14px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 6px; text-align: start; font-size: 11px; }
          thead th { background: #f2eee8; }
          @page { size: A4; margin: 12mm; }
        </style>
      </head>
      <body>
        <div class="head">
          <img src="${logoUrl}" alt="logo" />
          <h2>${title}</h2>
        </div>
        <div class="meta">${window.i18n.t('period')}: ${getRangeLabel(range)}</div>
        <div class="summary">
          <div class="box">${window.i18n.t('reports_total_invoices')}<strong>${totals.invoices}</strong></div>
          <div class="box">${window.i18n.t('reports_total_products_amount')}<strong>${formatMoney(totals.products)}</strong></div>
          <div class="box">${window.i18n.t('reports_total_delivery_amount')}<strong>${formatMoney(totals.delivery)}</strong></div>
          <div class="box">${window.i18n.t('grand_total')}<strong>${formatMoney(totals.total)}</strong></div>
          <div class="box">${window.i18n.t('reports_total_net_revenue')}<strong>${formatMoney(totals.netRevenue)}</strong></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>${window.i18n.t('row_number')}</th>
              <th>${window.i18n.t('invoice_number')}</th>
              <th>${window.i18n.t('customer_name')}</th>
              <th>${window.i18n.t('customer_phone')}</th>
              <th>${window.i18n.t('branch')}</th>
              <th>${window.i18n.t('cashier')}</th>
              <th>${window.i18n.t('reports_products_amount')}</th>
              <th>${window.i18n.t('delivery_fee')}</th>
              <th>${window.i18n.t('grand_total')}</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows || `<tr><td colspan="9">${window.i18n.t('no_data')}</td></tr>`}
          </tbody>
        </table>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

function getDescendantCategoryIds(rootId, categories) {
  if (!rootId || !categories[rootId]) return new Set();
  const result = new Set([rootId]);
  const queue = [rootId];
  while (queue.length) {
    const current = queue.shift();
    Object.entries(categories).forEach(([id, category]) => {
      if ((category.parentId || null) === current && !result.has(id)) {
        result.add(id);
        queue.push(id);
      }
    });
  }
  return result;
}

function isProductInCategoryFilter(product, categories, mainCategoryId, subCategoryId) {
  if (!product) {
    return (!mainCategoryId || mainCategoryId === 'all') && (!subCategoryId || subCategoryId === 'all');
  }
  const categoryId = product.categoryId;
  if (!mainCategoryId || mainCategoryId === 'all') {
    if (!subCategoryId || subCategoryId === 'all') return true;
    const subSet = getDescendantCategoryIds(subCategoryId, categories);
    return subSet.has(categoryId);
  }
  const mainSet = getDescendantCategoryIds(mainCategoryId, categories);
  if (!mainSet.has(categoryId)) return false;
  if (!subCategoryId || subCategoryId === 'all') return true;
  const subSet = getDescendantCategoryIds(subCategoryId, categories);
  return subSet.has(categoryId);
}

function getCategoryBreadcrumb(categoryId, categories) {
  if (!categoryId || !categories?.[categoryId]) return '-';
  const path = buildCategoryPathById(categoryId, categories)
    .map((id) => getLocalizedName(categories[id]))
    .filter((name) => name && name !== '-');
  return path.length ? path.join(' / ') : '-';
}

function buildSalesReportRows(filters) {
  const products = state.cache.products || {};
  const categories = state.cache.productCategories || {};
  const branches = state.cache.branches || {};
  const query = normalizeSearchValue(filters.query || '');
  const categoryId = filters.categoryId || 'all';
  const categorySet = categoryId && categoryId !== 'all'
    ? getDescendantCategoryIds(categoryId, categories)
    : null;
  const rowsMap = {};
  let totalRevenue = 0;

  const orders = getOrdersForCashierReport(filters.fromDate, filters.toDate, 'all');
  orders.forEach((order) => {
    const branchId = order.branchId || 'unknown';
    const branchName = getLocalizedName(branches[branchId]) || order.branchName || '-';
    normalizeItems(order.items).forEach((item) => {
      const productId = item.productId || item.itemId || item.id;
      if (!productId) return;
      const product = products[productId];
      if (categorySet && !categorySet.has(product?.categoryId || '')) return;

      const nameAr = product?.nameAr || item.name || '-';
      const nameEn = product?.nameEn || item.name || '-';
      const categoryName = getCategoryBreadcrumb(product?.categoryId, categories);
      const searchable = normalizeSearchValue(`${nameAr} ${nameEn} ${product?.code || ''} ${productId}`);
      if (query && !searchable.includes(query)) return;

      const qty = Number(item.qty || 0);
      const lineRevenue = qty * Number(item.price || 0);
      const key = `${productId}:${branchId}`;
      if (!rowsMap[key]) {
        rowsMap[key] = {
          rowKey: key,
          productId: String(productId),
          productCode: product?.code || '-',
          nameAr,
          nameEn,
          categoryName,
          branchId,
          branchName,
          qty: 0,
          revenue: 0
        };
      }
      rowsMap[key].qty += qty;
      rowsMap[key].revenue += lineRevenue;
      totalRevenue += lineRevenue;
    });
  });

  Object.entries(products).forEach(([productId, product]) => {
    if (categorySet && !categorySet.has(product?.categoryId || '')) return;
    const nameAr = product?.nameAr || '-';
    const nameEn = product?.nameEn || '-';
    const searchable = normalizeSearchValue(`${nameAr} ${nameEn} ${product?.code || ''} ${productId}`);
    if (query && !searchable.includes(query)) return;
    const hasRows = Object.keys(rowsMap).some((key) => key.startsWith(`${productId}:`));
    if (hasRows) return;
    const key = `${productId}:all`;
    rowsMap[key] = {
      rowKey: key,
      productId: String(productId),
      productCode: product?.code || '-',
      nameAr,
      nameEn,
      categoryName: getCategoryBreadcrumb(product?.categoryId, categories),
      branchId: 'all',
      branchName: window.i18n.t('all_branches'),
      qty: 0,
      revenue: 0
    };
  });

  const rows = Object.values(rowsMap).sort((a, b) => b.revenue - a.revenue);
  return { rows, totalRevenue };
}

function buildProductSalesDetails(fromDate, toDate, productId, branchId) {
  const rows = [];
  let totalRevenue = 0;
  const orders = getOrdersForCashierReport(fromDate, toDate, branchId || 'all');
  orders.forEach((order) => {
    let qty = 0;
    let revenue = 0;
    normalizeItems(order.items).forEach((item) => {
      const currentProductId = String(item.productId || item.itemId || item.id || '');
      if (currentProductId !== String(productId || '')) return;
      const lineQty = Number(item.qty || 0);
      const lineRevenue = lineQty * Number(item.price || 0);
      qty += lineQty;
      revenue += lineRevenue;
    });
    if (!qty) return;
    rows.push({
      invoiceNumber: order.orderNumber || order.invoiceNumber || order.id || '-',
      customerName: order.customerName || '-',
      cashierName: order.cashierName || '-',
      qty,
      revenue,
      createdAt: order.createdAt || 0
    });
    totalRevenue += revenue;
  });
  rows.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  return { rows, totalRevenue };
}

function fillReportBranchSelect(select, selectedValue) {
  const branches = state.cache.branches || {};
  select.innerHTML = '';
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = window.i18n.t('all_branches');
  select.appendChild(allOption);
  Object.entries(branches).forEach(([id, branch]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(branch);
    select.appendChild(option);
  });
  select.value = selectedValue || 'all';
}

function getCategoryMainOptions() {
  const categories = state.cache.productCategories || {};
  return Object.entries(categories)
    .filter(([, cat]) => !cat.parentId)
    .map(([id, cat]) => ({ id, name: getLocalizedName(cat) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getCategorySubOptions(mainCategoryId) {
  const categories = state.cache.productCategories || {};
  return Object.entries(categories)
    .filter(([, cat]) => (cat.parentId || null) === (mainCategoryId || null))
    .map(([id, cat]) => ({ id, name: getLocalizedName(cat) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getSalesProductOptions(filters) {
  const products = state.cache.products || {};
  const categories = state.cache.productCategories || {};
  const query = normalizeSearchValue(filters.query || '');
  return Object.entries(products)
    .filter(([, product]) => isProductInCategoryFilter(product, categories, filters.mainCategoryId, filters.subCategoryId))
    .filter(([, product]) => {
      if (!query) return true;
      const text = normalizeSearchValue(`${product.nameAr || ''} ${product.nameEn || ''} ${product.code || ''}`);
      return text.includes(query);
    })
    .map(([id, product]) => ({
      id: String(id),
      label: `${product.nameAr || '-'} / ${product.nameEn || '-'}`
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function renderSalesReportView(section) {
  const filters = state.reports.salesFilters;
  const current = buildSalesReportRows(filters);
  const categoryName = filters.categoryId && filters.categoryId !== 'all'
    ? (getLocalizedName(state.cache.productCategories?.[filters.categoryId]) || window.i18n.t('select_category'))
    : window.i18n.t('all_categories');
  const availableKeys = new Set(current.rows.map((row) => row.rowKey));
  let selectedSet = new Set((filters.selectedRowKeys || []).filter((key) => availableKeys.has(key)));
  if (filters.autoSelectAll && current.rows.length) {
    selectedSet = new Set(current.rows.map((row) => row.rowKey));
    state.reports.salesFilters.selectedRowKeys = Array.from(selectedSet);
    state.reports.salesFilters.autoSelectAll = false;
  }
  const selectedRows = current.rows.filter((row) => selectedSet.has(row.rowKey));
  const selectedRevenue = selectedRows.reduce((sum, row) => sum + Number(row.revenue || 0), 0);
  const allSelected = current.rows.length > 0 && current.rows.every((row) => selectedSet.has(row.rowKey));

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="salesReportBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('sales')}</h2>
        </div>
        <div class="row">
          <button id="salesReportExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="salesReportPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="salesReportDateFrom" class="input" type="date" style="max-width: 180px;" value="${filters.fromDate || ''}" />
        <input id="salesReportDateTo" class="input" type="date" style="max-width: 180px;" value="${filters.toDate || ''}" />
        <input id="salesReportQuery" class="input" style="max-width: 320px;" value="${filters.query || ''}" placeholder="${window.i18n.t('search_products')}" />
        <button id="salesReportCategoryBtn" class="btn ghost">${categoryName}</button>
      </div>
      <div class="report-summary-row">
        <span>${window.i18n.t('reports_total_revenue')}: <strong>${formatMoney(current.totalRevenue)}</strong></span>
        <span>${window.i18n.t('selected')}: <strong>${selectedRows.length}</strong></span>
        <span>${window.i18n.t('reports_total_revenue')} (${window.i18n.t('selected')}): <strong>${formatMoney(selectedRevenue)}</strong></span>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th><input id="salesReportSelectAll" type="checkbox" ${allSelected ? 'checked' : ''} /></th>
            <th>${window.i18n.t('row_number')}</th>
            <th>${window.i18n.t('product_code')}</th>
            <th>${window.i18n.t('item_name_ar')}</th>
            <th>${window.i18n.t('item_name_en')}</th>
            <th>${window.i18n.t('categories')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('reports_sold_qty')}</th>
            <th>${window.i18n.t('reports_product_revenue')}</th>
          </tr>
        </thead>
        <tbody id="salesReportTableBody"></tbody>
      </table>
    </div>
    <div id="salesCategoryPicker" class="overlay hidden">
      <div class="modal card" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 560px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('select_category')}</h3>
          <button id="salesCategoryCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="row" style="justify-content: space-between; align-items: center; margin-top: 8px;">
          <button id="salesCategoryBackBtn" class="btn ghost small">${window.i18n.t('back')}</button>
          <button id="salesCategorySelectCurrentBtn" class="btn ghost small">${window.i18n.t('apply')}</button>
        </div>
        <p id="salesCategoryPath" class="helper" style="margin-top: 8px;"></p>
        <div id="salesCategoryList" class="grid two" style="margin-top: 10px;"></div>
        <div class="row" style="justify-content: flex-end; margin-top: 12px;">
          <button id="salesCategoryAllBtn" class="btn ghost">${window.i18n.t('all_categories')}</button>
        </div>
      </div>
    </div>
  `;

  const fromInput = document.getElementById('salesReportDateFrom');
  if (fromInput) {
    fromInput.addEventListener('change', () => {
      state.reports.salesFilters.fromDate = fromInput.value || '';
      state.reports.salesFilters.selectedRowKeys = [];
      state.reports.salesFilters.autoSelectAll = true;
      renderReportsSection();
    });
  }
  const toInput = document.getElementById('salesReportDateTo');
  if (toInput) {
    toInput.addEventListener('change', () => {
      state.reports.salesFilters.toDate = toInput.value || '';
      state.reports.salesFilters.selectedRowKeys = [];
      state.reports.salesFilters.autoSelectAll = true;
      renderReportsSection();
    });
  }

  const queryInput = document.getElementById('salesReportQuery');
  if (queryInput) {
    bindDebouncedQueryInput(queryInput, (value) => {
      state.reports.salesFilters.query = String(value || '').trim();
      state.reports.salesFilters.selectedRowKeys = [];
      state.reports.salesFilters.autoSelectAll = true;
      renderReportsSection();
    });
  }

  const categoryBtn = document.getElementById('salesReportCategoryBtn');
  if (categoryBtn) categoryBtn.addEventListener('click', () => openSalesCategoryPicker());

  const tableBody = document.getElementById('salesReportTableBody');
  if (tableBody) {
    tableBody.innerHTML = '';
    if (!current.rows.length) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="9">${window.i18n.t('no_data')}</td>`;
      tableBody.appendChild(row);
    } else {
      current.rows.forEach((rowData, index) => {
        const row = document.createElement('tr');
        row.classList.add('report-clickable-row');
        row.innerHTML = `
          <td><input type="checkbox" data-action="select-row" data-key="${rowData.rowKey}" ${selectedSet.has(rowData.rowKey) ? 'checked' : ''} /></td>
          <td>${index + 1}</td>
          <td>${rowData.productCode || '-'}</td>
          <td>${rowData.nameAr || '-'}</td>
          <td>${rowData.nameEn || '-'}</td>
          <td>${rowData.categoryName || '-'}</td>
          <td>${rowData.branchName || '-'}</td>
          <td>${formatNumber(rowData.qty)}</td>
          <td>${formatMoney(rowData.revenue)}</td>
        `;
        row.addEventListener('click', () => {
          state.reports.details.productId = rowData.productId;
          state.reports.details.branchId = rowData.branchId;
          state.reports.view = 'productDetails';
          renderReportsSection();
        });
        const check = row.querySelector('[data-action="select-row"]');
        if (check) {
          check.addEventListener('click', (event) => event.stopPropagation());
          check.addEventListener('change', () => {
            const next = new Set(state.reports.salesFilters.selectedRowKeys || []);
            if (check.checked) next.add(rowData.rowKey);
            else next.delete(rowData.rowKey);
            state.reports.salesFilters.selectedRowKeys = Array.from(next);
            state.reports.salesFilters.autoSelectAll = false;
            renderReportsSection();
          });
        }
        tableBody.appendChild(row);
      });
    }
  }
  const selectAllBox = document.getElementById('salesReportSelectAll');
  if (selectAllBox) {
    selectAllBox.addEventListener('change', () => {
      state.reports.salesFilters.selectedRowKeys = selectAllBox.checked
        ? current.rows.map((row) => row.rowKey)
        : [];
      state.reports.salesFilters.autoSelectAll = false;
      renderReportsSection();
    });
  }

  const backBtn = document.getElementById('salesReportBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.reports.view = 'dashboard';
      renderReportsSection();
    });
  }

  const exportBtn = document.getElementById('salesReportExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const exportRowsData = selectedRows;
      if (!exportRowsData.length) return;
      const rows = exportRowsData.map((row, index) => ({
        [window.i18n.t('row_number')]: index + 1,
        [window.i18n.t('product_code')]: row.productCode || '-',
        [window.i18n.t('item_name_ar')]: row.nameAr || '-',
        [window.i18n.t('item_name_en')]: row.nameEn || '-',
        [window.i18n.t('categories')]: row.categoryName || '-',
        [window.i18n.t('branch')]: row.branchName || '-',
        [window.i18n.t('reports_sold_qty')]: formatNumber(row.qty),
        [window.i18n.t('reports_product_revenue')]: formatMoney(row.revenue)
      }));
      exportToExcel(rows, 'sales-report.xlsx');
    });
  }

  const printBtn = document.getElementById('salesReportPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const printRows = selectedRows;
      if (!printRows.length) return;
      const total = printRows.reduce((sum, row) => sum + Number(row.revenue || 0), 0);
      printSalesReport(printRows, total);
    });
  }

  renderSalesCategoryPicker();
}

function openSalesCategoryPicker() {
  const overlay = document.getElementById('salesCategoryPicker');
  if (!overlay) return;
  const categories = state.cache.productCategories || {};
  const selectedCategoryId = state.reports.salesFilters.categoryId;
  state.reports.salesFilters.categoryPickerPath = selectedCategoryId && selectedCategoryId !== 'all'
    ? buildCategoryPathById(selectedCategoryId, categories)
    : [];
  renderSalesCategoryPicker();
  overlay.classList.remove('hidden');
}

function closeSalesCategoryPicker() {
  const overlay = document.getElementById('salesCategoryPicker');
  if (overlay) overlay.classList.add('hidden');
}

function renderSalesCategoryPicker() {
  const overlay = document.getElementById('salesCategoryPicker');
  const list = document.getElementById('salesCategoryList');
  const pathEl = document.getElementById('salesCategoryPath');
  const backBtn = document.getElementById('salesCategoryBackBtn');
  const closeBtn = document.getElementById('salesCategoryCloseBtn');
  const selectCurrentBtn = document.getElementById('salesCategorySelectCurrentBtn');
  const allBtn = document.getElementById('salesCategoryAllBtn');
  if (!overlay || !list || !pathEl || !backBtn || !closeBtn || !selectCurrentBtn || !allBtn) return;

  const categories = state.cache.productCategories || {};
  const path = Array.isArray(state.reports.salesFilters.categoryPickerPath)
    ? state.reports.salesFilters.categoryPickerPath
    : [];
  const currentParentId = path.length ? path[path.length - 1] : null;
  const children = getCategoriesByParent(categories, currentParentId);
  const pathNames = path.map((id) => getLocalizedName(categories[id]) || '-');
  pathEl.textContent = pathNames.length ? pathNames.join(' / ') : window.i18n.t('all_categories');
  backBtn.disabled = !path.length;
  selectCurrentBtn.disabled = !path.length;

  list.innerHTML = '';
  if (!children.length) {
    list.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
  } else {
    children.forEach((entry) => {
      const hasChildren = getCategoriesByParent(categories, entry.id).length > 0;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn ghost';
      button.style.textAlign = 'start';
      button.textContent = hasChildren
        ? `${getLocalizedName(entry.category) || '-'} ›`
        : (getLocalizedName(entry.category) || '-');
      button.addEventListener('click', () => {
        if (hasChildren) {
          state.reports.salesFilters.categoryPickerPath = [...path, entry.id];
          renderSalesCategoryPicker();
          return;
        }
        state.reports.salesFilters.categoryId = entry.id;
        state.reports.salesFilters.selectedRowKeys = [];
        state.reports.salesFilters.autoSelectAll = true;
        closeSalesCategoryPicker();
        renderReportsSection();
      });
      list.appendChild(button);
    });
  }

  closeBtn.onclick = () => closeSalesCategoryPicker();
  backBtn.onclick = () => {
    if (!path.length) return;
    state.reports.salesFilters.categoryPickerPath = path.slice(0, -1);
    renderSalesCategoryPicker();
  };
  selectCurrentBtn.onclick = () => {
    if (!path.length) return;
    state.reports.salesFilters.categoryId = path[path.length - 1];
    state.reports.salesFilters.selectedRowKeys = [];
    state.reports.salesFilters.autoSelectAll = true;
    closeSalesCategoryPicker();
    renderReportsSection();
  };
  allBtn.onclick = () => {
    state.reports.salesFilters.categoryId = 'all';
    state.reports.salesFilters.categoryPickerPath = [];
    state.reports.salesFilters.selectedRowKeys = [];
    state.reports.salesFilters.autoSelectAll = true;
    closeSalesCategoryPicker();
    renderReportsSection();
  };
}

function renderSalesProductDetailsView(section) {
  const productId = state.reports.details.productId;
  const product = state.cache.products?.[productId];
  if (!productId || !product) {
    state.reports.view = 'sales';
    renderReportsSection();
    return;
  }

  const salesFilters = state.reports.salesFilters || {};
  const current = buildProductSalesDetails(
    salesFilters.fromDate || '',
    salesFilters.toDate || '',
    productId,
    state.reports.details.branchId
  );

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="salesDetailsBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('reports_product_details')}</h2>
        </div>
        <div class="row">
          <button id="salesDetailsExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="salesDetailsPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px; justify-content: space-between;">
        <div>
          <strong>${product.nameAr || '-'}</strong>
          <div class="helper">${product.nameEn || '-'}</div>
        </div>
        <div class="row">
          <label class="tag">${window.i18n.t('branch')}</label>
          <select id="salesDetailsBranch" class="input" style="min-width: 200px;"></select>
        </div>
      </div>
      <div class="report-summary-row">
        <span>${window.i18n.t('reports_total_revenue')}: <strong>${formatMoney(current.totalRevenue)}</strong></span>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('row_number')}</th>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('customer_name')}</th>
            <th>${window.i18n.t('cashier')}</th>
            <th>${window.i18n.t('reports_invoice_qty')}</th>
            <th>${window.i18n.t('reports_invoice_revenue')}</th>
            <th>${window.i18n.t('date_time')}</th>
          </tr>
        </thead>
        <tbody id="salesDetailsTableBody"></tbody>
      </table>
    </div>
  `;

  const branchSelect = document.getElementById('salesDetailsBranch');
  if (branchSelect) {
    fillReportBranchSelect(branchSelect, state.reports.details.branchId);
    branchSelect.addEventListener('change', () => {
      state.reports.details.branchId = branchSelect.value;
      renderReportsSection();
    });
  }

  const tableBody = document.getElementById('salesDetailsTableBody');
  if (tableBody) {
    tableBody.innerHTML = '';
    if (!current.rows.length) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="7">${window.i18n.t('no_data')}</td>`;
      tableBody.appendChild(row);
    } else {
      current.rows.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.invoiceNumber || '-'}</td>
          <td>${item.customerName || '-'}</td>
          <td>${item.cashierName || '-'}</td>
          <td>${formatNumber(item.qty)}</td>
          <td>${formatMoney(item.revenue)}</td>
          <td>${formatDate(item.createdAt)}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  }

  const backBtn = document.getElementById('salesDetailsBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.reports.view = 'sales';
      renderReportsSection();
    });
  }

  const exportBtn = document.getElementById('salesDetailsExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!current.rows.length) return;
      const rows = current.rows.map((item, index) => ({
        [window.i18n.t('row_number')]: index + 1,
        [window.i18n.t('invoice_number')]: item.invoiceNumber || '-',
        [window.i18n.t('customer_name')]: item.customerName || '-',
        [window.i18n.t('cashier')]: item.cashierName || '-',
        [window.i18n.t('reports_invoice_qty')]: formatNumber(item.qty),
        [window.i18n.t('reports_invoice_revenue')]: formatMoney(item.revenue),
        [window.i18n.t('date_time')]: formatDate(item.createdAt)
      }));
      exportToExcel(rows, 'product-sales-details.xlsx');
    });
  }

  const printBtn = document.getElementById('salesDetailsPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      printSalesProductDetailsReport(product, current.rows, current.totalRevenue);
    });
  }
}

function getReportRangeFromDates(fromDate, toDate) {
  const start = fromDate ? new Date(`${fromDate}T00:00:00`).getTime() : null;
  const end = toDate ? new Date(`${toDate}T23:59:59`).getTime() : null;
  return { start, end };
}

function getOrdersForCashierReport(fromDate, toDate, branchId = 'all') {
  const { start, end } = getReportRangeFromDates(fromDate, toDate);
  return Object.entries(state.cache.orders || {})
    .map(([id, order]) => ({ id, ...order }))
    .filter((order) => {
      const createdAt = Number(order.createdAt || 0);
      if (!createdAt) return false;
      if (start !== null && createdAt < start) return false;
      if (end !== null && createdAt > end) return false;
      if (branchId !== 'all' && (order.branchId || '') !== branchId) return false;
      return true;
    })
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

function buildCashierSalesRows(orders) {
  const cashiers = state.cache.cashiers || {};
  const rowsMap = {};
  orders.forEach((order) => {
    const cashierId = order.cashierId || 'unknown';
    const cashierName = order.cashierName || cashiers[cashierId]?.name || cashierId || '-';
    const revenue = Number(order.total || 0);
    const delivery = Number(order.deliveryFee || 0);
    const netRevenue = revenue - delivery - calcOrderItemsCost(order);
    if (!rowsMap[cashierId]) {
      rowsMap[cashierId] = {
        cashierId,
        cashierName,
        ordersCount: 0,
        revenue: 0,
        netRevenue: 0
      };
    }
    rowsMap[cashierId].ordersCount += 1;
    rowsMap[cashierId].revenue += revenue;
    rowsMap[cashierId].netRevenue += netRevenue;
  });
  return Object.values(rowsMap).sort((a, b) => b.revenue - a.revenue);
}

function buildCashierInvoiceRows(orders, cashierId) {
  return orders
    .filter((order) => String(order.cashierId || 'unknown') === String(cashierId || 'unknown'))
    .map((order) => ({
      invoiceNumber: order.orderNumber || '-',
      customerName: order.customerName || '-',
      customerPhone: order.customerPhone || '-',
      branchName: getLocalizedName(state.cache.branches?.[order.branchId]) || order.branchName || '-',
      cashierName: order.cashierName || '-',
      productsAmount: Number(order.subtotal ?? order.netTotal ?? ((order.total || 0) - (order.deliveryFee || 0))),
      deliveryFee: Number(order.deliveryFee || 0),
      total: Number(order.total || 0),
      createdAt: order.createdAt || 0
    }));
}

function renderCashierSalesReportView(section) {
  const filters = state.reports.cashierSalesFilters || { fromDate: '', toDate: '', branchId: 'all' };
  const orders = getOrdersForCashierReport(filters.fromDate, filters.toDate, filters.branchId || 'all');
  const rows = buildCashierSalesRows(orders);
  const totals = rows.reduce((acc, row) => {
    acc.ordersCount += row.ordersCount;
    acc.revenue += row.revenue;
    acc.netRevenue += row.netRevenue;
    return acc;
  }, { ordersCount: 0, revenue: 0, netRevenue: 0 });

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="cashierSalesBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('reports_cashier_sales')}</h2>
        </div>
        <div class="row">
          <button id="cashierSalesExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="cashierSalesPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px;">
        <input id="cashierSalesDateFrom" class="input" type="date" style="max-width: 180px;" value="${filters.fromDate || ''}" />
        <input id="cashierSalesDateTo" class="input" type="date" style="max-width: 180px;" value="${filters.toDate || ''}" />
        <select id="cashierSalesBranch" class="input" style="max-width: 220px;"></select>
      </div>
      <div class="grid three" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('reports_orders_count_label')}</strong><div class="report-total-value">${totals.ordersCount}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_revenue_amount_label')}</strong><div class="report-total-value">${formatMoney(totals.revenue)}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_net_revenue_amount_label')}</strong><div class="report-total-value">${formatMoney(totals.netRevenue)}</div></div>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('cashier')}</th>
            <th>${window.i18n.t('reports_orders_count_label')}</th>
            <th>${window.i18n.t('reports_revenue_amount_label')}</th>
            <th>${window.i18n.t('reports_net_revenue_amount_label')}</th>
          </tr>
        </thead>
        <tbody id="cashierSalesTableBody"></tbody>
      </table>
    </div>
  `;

  const branchSelect = document.getElementById('cashierSalesBranch');
  if (branchSelect) {
    fillReportBranchSelect(branchSelect, filters.branchId || 'all');
    branchSelect.addEventListener('change', () => {
      state.reports.cashierSalesFilters.branchId = branchSelect.value;
      renderReportsSection();
    });
  }

  const dateFrom = document.getElementById('cashierSalesDateFrom');
  const dateTo = document.getElementById('cashierSalesDateTo');
  if (dateFrom) {
    dateFrom.addEventListener('change', () => {
      state.reports.cashierSalesFilters.fromDate = dateFrom.value || '';
      renderReportsSection();
    });
  }
  if (dateTo) {
    dateTo.addEventListener('change', () => {
      state.reports.cashierSalesFilters.toDate = dateTo.value || '';
      renderReportsSection();
    });
  }

  const tableBody = document.getElementById('cashierSalesTableBody');
  if (tableBody) {
    if (!rows.length) {
      tableBody.innerHTML = `<tr><td colspan="4">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      tableBody.innerHTML = rows.map((row) => `
        <tr class="report-clickable-row" data-id="${row.cashierId}">
          <td>${row.cashierName || '-'}</td>
          <td>${row.ordersCount}</td>
          <td>${formatMoney(row.revenue)}</td>
          <td>${formatMoney(row.netRevenue)}</td>
        </tr>
      `).join('');
      tableBody.querySelectorAll('tr[data-id]').forEach((tr) => {
        tr.addEventListener('click', () => {
          state.reports.cashierDetails.cashierId = tr.dataset.id;
          state.reports.view = 'cashierSalesDetails';
          renderReportsSection();
        });
      });
    }
  }

  const backBtn = document.getElementById('cashierSalesBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.reports.view = 'dashboard';
      renderReportsSection();
    });
  }

  const exportBtn = document.getElementById('cashierSalesExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const exportRows = rows.map((row) => ({
        [window.i18n.t('cashier')]: row.cashierName || '-',
        [window.i18n.t('reports_orders_count_label')]: row.ordersCount,
        [window.i18n.t('reports_revenue_amount_label')]: formatMoney(row.revenue),
        [window.i18n.t('reports_net_revenue_amount_label')]: formatMoney(row.netRevenue)
      }));
      exportToExcel(exportRows, 'cashier-sales-report.xlsx');
    });
  }

  const printBtn = document.getElementById('cashierSalesPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const headers = [
        window.i18n.t('cashier'),
        window.i18n.t('reports_orders_count_label'),
        window.i18n.t('reports_revenue_amount_label'),
        window.i18n.t('reports_net_revenue_amount_label')
      ];
      const bodyRows = rows.map((row) => [
        row.cashierName || '-',
        row.ordersCount,
        formatMoney(row.revenue),
        formatMoney(row.netRevenue)
      ]);
      printA4Report(
        window.i18n.t('reports_cashier_sales'),
        [
          { label: window.i18n.t('filter_from'), value: filters.fromDate || '-' },
          { label: window.i18n.t('filter_to'), value: filters.toDate || '-' }
        ],
        headers,
        bodyRows,
        [
          { label: window.i18n.t('reports_orders_count_label'), value: totals.ordersCount },
          { label: window.i18n.t('reports_revenue_amount_label'), value: formatMoney(totals.revenue) },
          { label: window.i18n.t('reports_net_revenue_amount_label'), value: formatMoney(totals.netRevenue) }
        ]
      );
    });
  }
}

function renderCashierSalesDetailsView(section) {
  const filters = state.reports.cashierSalesFilters || { fromDate: '', toDate: '', branchId: 'all' };
  const cashierId = state.reports.cashierDetails?.cashierId;
  if (!cashierId) {
    state.reports.view = 'cashierSales';
    renderReportsSection();
    return;
  }

  const orders = getOrdersForCashierReport(filters.fromDate, filters.toDate, filters.branchId || 'all');
  const rows = buildCashierInvoiceRows(orders, cashierId);
  const cashierName = rows[0]?.cashierName || state.cache.cashiers?.[cashierId]?.name || '-';
  const totals = rows.reduce((acc, row) => {
    acc.products += row.productsAmount;
    acc.delivery += row.deliveryFee;
    acc.total += row.total;
    return acc;
  }, { products: 0, delivery: 0, total: 0 });

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="cashierSalesDetailsBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('reports_cashier_sales')}</h2>
        </div>
        <div class="row">
          <button id="cashierSalesDetailsExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="cashierSalesDetailsPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <strong>${window.i18n.t('cashier')}: ${cashierName}</strong>
      </div>
      <div class="grid three" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('reports_total_products_amount')}</strong><div class="report-total-value">${formatMoney(totals.products)}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_total_delivery_amount')}</strong><div class="report-total-value">${formatMoney(totals.delivery)}</div></div>
        <div class="card light"><strong>${window.i18n.t('total_sales')}</strong><div class="report-total-value">${formatMoney(totals.total)}</div></div>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('customer_name')}</th>
            <th>${window.i18n.t('customer_phone')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('cashier')}</th>
            <th>${window.i18n.t('reports_products_amount')}</th>
            <th>${window.i18n.t('delivery_fee')}</th>
            <th>${window.i18n.t('grand_total')}</th>
            <th>${window.i18n.t('date_time')}</th>
          </tr>
        </thead>
        <tbody id="cashierSalesDetailsTableBody"></tbody>
      </table>
    </div>
  `;

  const tableBody = document.getElementById('cashierSalesDetailsTableBody');
  if (tableBody) {
    if (!rows.length) {
      tableBody.innerHTML = `<tr><td colspan="9">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      tableBody.innerHTML = rows.map((row) => `
        <tr>
          <td>${row.invoiceNumber}</td>
          <td>${row.customerName}</td>
          <td>${row.customerPhone}</td>
          <td>${row.branchName}</td>
          <td>${row.cashierName}</td>
          <td>${formatMoney(row.productsAmount)}</td>
          <td>${formatMoney(row.deliveryFee)}</td>
          <td>${formatMoney(row.total)}</td>
          <td>${formatDate(row.createdAt)}</td>
        </tr>
      `).join('');
    }
  }

  const backBtn = document.getElementById('cashierSalesDetailsBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.reports.view = 'cashierSales';
      renderReportsSection();
    });
  }

  const exportBtn = document.getElementById('cashierSalesDetailsExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const exportRows = rows.map((row) => ({
        [window.i18n.t('invoice_number')]: row.invoiceNumber,
        [window.i18n.t('customer_name')]: row.customerName,
        [window.i18n.t('customer_phone')]: row.customerPhone,
        [window.i18n.t('branch')]: row.branchName,
        [window.i18n.t('cashier')]: row.cashierName,
        [window.i18n.t('reports_products_amount')]: formatMoney(row.productsAmount),
        [window.i18n.t('delivery_fee')]: formatMoney(row.deliveryFee),
        [window.i18n.t('grand_total')]: formatMoney(row.total),
        [window.i18n.t('date_time')]: formatDate(row.createdAt)
      }));
      exportToExcel(exportRows, `cashier-${cashierId}-orders.xlsx`);
    });
  }

  const printBtn = document.getElementById('cashierSalesDetailsPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const headers = [
        window.i18n.t('invoice_number'),
        window.i18n.t('customer_name'),
        window.i18n.t('customer_phone'),
        window.i18n.t('branch'),
        window.i18n.t('cashier'),
        window.i18n.t('reports_products_amount'),
        window.i18n.t('delivery_fee'),
        window.i18n.t('grand_total'),
        window.i18n.t('date_time')
      ];
      const bodyRows = rows.map((row) => [
        row.invoiceNumber,
        row.customerName,
        row.customerPhone,
        row.branchName,
        row.cashierName,
        formatMoney(row.productsAmount),
        formatMoney(row.deliveryFee),
        formatMoney(row.total),
        formatDate(row.createdAt)
      ]);
      printA4Report(
        window.i18n.t('reports_cashier_sales'),
        [
          { label: window.i18n.t('cashier'), value: cashierName },
          { label: window.i18n.t('filter_from'), value: filters.fromDate || '-' },
          { label: window.i18n.t('filter_to'), value: filters.toDate || '-' }
        ],
        headers,
        bodyRows,
        [
          { label: window.i18n.t('reports_total_products_amount'), value: formatMoney(totals.products) },
          { label: window.i18n.t('reports_total_delivery_amount'), value: formatMoney(totals.delivery) },
          { label: window.i18n.t('grand_total'), value: formatMoney(totals.total) }
        ]
      );
    });
  }
}

function isTimestampInOptionalRange(timestamp, fromDate, toDate) {
  const value = Number(timestamp || 0);
  if (!value) return false;
  if (fromDate) {
    const start = new Date(`${fromDate}T00:00:00`).getTime();
    if (value < start) return false;
  }
  if (toDate) {
    const end = new Date(`${toDate}T23:59:59`).getTime();
    if (value > end) return false;
  }
  return true;
}

function buildReturnsReportRows(filters) {
  const rowsMap = {};
  const mainBranchId = getMainBranchId();

  const applyRecordItems = (record, returnType, sourceBranchId) => {
    if (!record || !isTimestampInOptionalRange(record.createdAt, filters.fromDate, filters.toDate)) return;
    if (filters.branchId !== 'all' && String(sourceBranchId || '') !== String(filters.branchId || '')) return;
    const storekeeperName = record.storekeeperName || '-';
    normalizeItems(record.items).forEach((item) => {
      const itemId = String(item?.itemId || item?.id || '');
      if (!itemId) return;
      const itemType = normalizeItemType(item);
      const itemData = getItemDataByType(itemType, itemId);
      const code = itemData?.code || item?.code || itemId;
      const name = getLocalizedName(itemData) || item?.name || '-';
      const key = `${itemType}:${itemId}:${sourceBranchId || 'none'}:${storekeeperName}`;
      if (!rowsMap[key]) {
        rowsMap[key] = {
          itemType,
          itemId,
          code,
          name,
          fromBranchId: sourceBranchId || null,
          fromBranchName: getBranchLabel(sourceBranchId),
          storekeeperName,
          stockCount: 0,
          scrapCount: 0,
          supplierCount: 0,
          totalCount: 0
        };
      }
      const qty = Number(item?.qty || 0);
      const safeQty = Number.isFinite(qty) ? qty : 0;
      if (returnType === 'stock') rowsMap[key].stockCount += safeQty;
      if (returnType === 'scrap') rowsMap[key].scrapCount += safeQty;
      if (returnType === 'supplier') rowsMap[key].supplierCount += safeQty;
      rowsMap[key].totalCount += safeQty;
    });
  };

  Object.values(state.cache.stockReturn || {}).forEach((record) => {
    applyRecordItems(record, 'stock', record.fromBranchId || null);
  });
  Object.values(state.cache.scrapReturn || {}).forEach((record) => {
    applyRecordItems(record, 'scrap', record.branchId || null);
  });
  Object.values(state.cache.supplierReturns || {}).forEach((record) => {
    applyRecordItems(record, 'supplier', mainBranchId);
  });

  const query = normalizeSearchValue(filters.query || '');
  let rows = Object.values(rowsMap);
  if (query) {
    rows = rows.filter((row) => {
      const text = normalizeSearchValue(`${row.code} ${row.name} ${row.storekeeperName}`);
      return text.includes(query);
    });
  }
  rows.sort((a, b) => {
    const value = Number(a.totalCount || 0) - Number(b.totalCount || 0);
    if (filters.sort === 'asc') return value;
    return -value;
  });
  return rows;
}

function renderReturnsReportView(section) {
  const filters = state.reports.returnsFilters || {
    fromDate: '',
    toDate: '',
    branchId: 'all',
    query: '',
    sort: 'desc'
  };
  const rows = buildReturnsReportRows(filters);
  const totals = rows.reduce((acc, row) => {
    acc.stock += Number(row.stockCount || 0);
    acc.scrap += Number(row.scrapCount || 0);
    acc.supplier += Number(row.supplierCount || 0);
    acc.total += Number(row.totalCount || 0);
    return acc;
  }, { stock: 0, scrap: 0, supplier: 0, total: 0 });

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="returnsBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('reports_returns')}</h2>
        </div>
        <div class="row">
          <button id="returnsExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="returnsPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="returnsDateFrom" class="input" type="date" style="max-width: 180px;" value="${filters.fromDate || ''}" />
        <input id="returnsDateTo" class="input" type="date" style="max-width: 180px;" value="${filters.toDate || ''}" />
        <select id="returnsBranchFilter" class="input" style="max-width: 220px;"></select>
        <input id="returnsQuery" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('reports_search_returns_placeholder')}" value="${filters.query || ''}" />
        <select id="returnsSort" class="input" style="max-width: 220px;">
          <option value="desc">${window.i18n.t('sort_returns_desc')}</option>
          <option value="asc">${window.i18n.t('sort_returns_asc')}</option>
        </select>
      </div>
      <div class="grid four" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('returns_stock')}</strong><div class="report-total-value">${formatNumber(totals.stock)}</div></div>
        <div class="card light"><strong>${window.i18n.t('returns_scrap')}</strong><div class="report-total-value">${formatNumber(totals.scrap)}</div></div>
        <div class="card light"><strong>${window.i18n.t('returns_supplier')}</strong><div class="report-total-value">${formatNumber(totals.supplier)}</div></div>
        <div class="card light"><strong>${window.i18n.t('returns_total')}</strong><div class="report-total-value">${formatNumber(totals.total)}</div></div>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('product_code')}</th>
            <th>${window.i18n.t('name')}</th>
            <th>${window.i18n.t('returned_from_branch')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('return_times')}</th>
          </tr>
        </thead>
        <tbody id="returnsTableBody"></tbody>
      </table>
    </div>
  `;

  const branchSelect = document.getElementById('returnsBranchFilter');
  if (branchSelect) {
    fillReportBranchSelect(branchSelect, filters.branchId || 'all');
    branchSelect.addEventListener('change', () => {
      state.reports.returnsFilters.branchId = branchSelect.value;
      renderReportsSection();
    });
  }

  const fromInput = document.getElementById('returnsDateFrom');
  if (fromInput) {
    fromInput.addEventListener('change', () => {
      state.reports.returnsFilters.fromDate = fromInput.value || '';
      renderReportsSection();
    });
  }

  const toInput = document.getElementById('returnsDateTo');
  if (toInput) {
    toInput.addEventListener('change', () => {
      state.reports.returnsFilters.toDate = toInput.value || '';
      renderReportsSection();
    });
  }

  const queryInput = document.getElementById('returnsQuery');
  if (queryInput) {
    bindDebouncedQueryInput(queryInput, (value) => {
      state.reports.returnsFilters.query = String(value || '').trim();
      renderReportsSection();
    });
  }

  const sortSelect = document.getElementById('returnsSort');
  if (sortSelect) {
    sortSelect.value = filters.sort || 'desc';
    sortSelect.addEventListener('change', () => {
      state.reports.returnsFilters.sort = sortSelect.value || 'desc';
      renderReportsSection();
    });
  }

  const tbody = document.getElementById('returnsTableBody');
  if (tbody) {
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="5">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      tbody.innerHTML = rows.map((row) => `
        <tr>
          <td>${row.code || '-'}</td>
          <td>${row.name || '-'}</td>
          <td>${row.fromBranchName || '-'}</td>
          <td>${row.storekeeperName || '-'}</td>
          <td>
            <div>${window.i18n.t('returns_stock')}: ${formatNumber(row.stockCount)}</div>
            <div>${window.i18n.t('returns_scrap')}: ${formatNumber(row.scrapCount)}</div>
            <div>${window.i18n.t('returns_supplier')}: ${formatNumber(row.supplierCount)}</div>
          </td>
        </tr>
      `).join('');
    }
  }

  const backBtn = document.getElementById('returnsBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.reports.view = 'dashboard';
      renderReportsSection();
    });
  }

  const exportBtn = document.getElementById('returnsExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const exportRows = rows.map((row) => ({
        [window.i18n.t('product_code')]: row.code || '-',
        [window.i18n.t('name')]: row.name || '-',
        [window.i18n.t('returned_from_branch')]: row.fromBranchName || '-',
        [window.i18n.t('storekeeper_name')]: row.storekeeperName || '-',
        [window.i18n.t('returns_stock')]: formatNumber(row.stockCount),
        [window.i18n.t('returns_scrap')]: formatNumber(row.scrapCount),
        [window.i18n.t('returns_supplier')]: formatNumber(row.supplierCount),
        [window.i18n.t('return_times')]: formatNumber(row.totalCount)
      }));
      exportToExcel(exportRows, 'returns-report.xlsx');
    });
  }

  const printBtn = document.getElementById('returnsPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const headers = [
        window.i18n.t('product_code'),
        window.i18n.t('name'),
        window.i18n.t('returned_from_branch'),
        window.i18n.t('storekeeper_name'),
        window.i18n.t('returns_stock'),
        window.i18n.t('returns_scrap'),
        window.i18n.t('returns_supplier'),
        window.i18n.t('return_times')
      ];
      const bodyRows = rows.map((row) => [
        row.code || '-',
        row.name || '-',
        row.fromBranchName || '-',
        row.storekeeperName || '-',
        formatNumber(row.stockCount),
        formatNumber(row.scrapCount),
        formatNumber(row.supplierCount),
        formatNumber(row.totalCount)
      ]);
      printA4Report(
        window.i18n.t('reports_returns'),
        [
          { label: window.i18n.t('filter_from'), value: filters.fromDate || '-' },
          { label: window.i18n.t('filter_to'), value: filters.toDate || '-' },
          { label: window.i18n.t('branch'), value: filters.branchId === 'all' ? window.i18n.t('all_branches') : getBranchLabel(filters.branchId) }
        ],
        headers,
        bodyRows,
        [
          { label: window.i18n.t('returns_stock'), value: formatNumber(totals.stock) },
          { label: window.i18n.t('returns_scrap'), value: formatNumber(totals.scrap) },
          { label: window.i18n.t('returns_supplier'), value: formatNumber(totals.supplier) },
          { label: window.i18n.t('returns_total'), value: formatNumber(totals.total) }
        ]
      );
    });
  }
}

function getTopProductsBranchColumns() {
  const branches = state.cache.branches || {};
  const entries = Object.entries(branches).map(([id, branch]) => ({
    id,
    name: getLocalizedName(branch) || '-',
    isMain: !!branch?.isMain,
    search: normalizeSearchValue(`${branch?.nameAr || ''} ${branch?.nameEn || ''} ${branch?.name || ''}`)
  }));
  const used = new Set();
  const pick = (predicate) => {
    const found = entries.find((entry) => !used.has(entry.id) && predicate(entry));
    if (!found) return null;
    used.add(found.id);
    return found;
  };
  const hasAnyKeyword = (entry, keywords) => keywords.some((keyword) => entry.search.includes(normalizeSearchValue(keyword)));

  const mainEntry = pick((entry) => entry.isMain) || pick((entry) => hasAnyKeyword(entry, ['الفرع الرئيسي', 'رئيسي', 'main', 'head']));
  const yarmoukEntry = pick((entry) => hasAnyKeyword(entry, ['اليرموك', 'يرموك', 'yarmouk']));
  const abuHasaniyaEntry = pick((entry) => hasAnyKeyword(entry, ['ابو الحصانيه', 'ابو الحصانية', 'الحصانيه', 'abuhasaniya', 'abu hasaniya']));

  return [
    {
      key: 'main',
      id: mainEntry?.id || '',
      label: window.i18n.t('reports_main_branch_sales'),
      branchName: mainEntry?.name || window.i18n.t('main_branch')
    },
    {
      key: 'yarmouk',
      id: yarmoukEntry?.id || '',
      label: window.i18n.t('reports_yarmouk_branch_sales'),
      branchName: yarmoukEntry?.name || 'اليرموك'
    },
    {
      key: 'abuHasaniya',
      id: abuHasaniyaEntry?.id || '',
      label: window.i18n.t('reports_abu_hasaniya_branch_sales'),
      branchName: abuHasaniyaEntry?.name || 'أبو الحصانية'
    }
  ];
}

function renderTopProductsCreativeChart(rows, branchColumns) {
  if (!rows.length) {
    return `<div class="top-products-chart-empty">${window.i18n.t('no_data')}</div>`;
  }
  const maxTotal = Math.max(...rows.map((row) => Number(row.totalSales || 0)), 1);
  const legend = branchColumns.map((column, index) => `
    <span class="top-products-legend-item">
      <span class="top-products-legend-dot tone-${index + 1}"></span>
      ${column.label}
    </span>
  `).join('');

  const rowsHtml = rows.map((row, index) => {
    const totalValue = Number(row.totalSales || 0);
    const totalPercent = maxTotal > 0 ? Math.min(100, (totalValue / maxTotal) * 100) : 0;
    const visiblePercent = totalValue > 0 ? Math.max(totalPercent, 4) : 0;
    const segments = branchColumns.map((column, colorIndex) => {
      const branchValue = column.id ? Number(row.branchSales?.[column.id] || 0) : 0;
      const width = totalValue > 0 ? Math.max(0, Math.min(100, (branchValue / totalValue) * 100)) : 0;
      return `<span class="top-products-segment tone-${colorIndex + 1}" style="width:${width.toFixed(2)}%"></span>`;
    }).join('');
    const showNameEn = row.nameEn && normalizeSearchValue(row.nameEn) !== normalizeSearchValue(row.nameAr || '');
    return `
      <div class="top-products-chart-row">
        <div class="top-products-rank">${index + 1}</div>
        <div class="top-products-product-name">
          <div class="name-ar">${row.nameAr || '-'}</div>
          <div class="name-en">${showNameEn ? row.nameEn : '-'}</div>
        </div>
        <div class="top-products-bar-wrap">
          <div class="top-products-bar-track">
            <div class="top-products-bar-total" style="width:${visiblePercent.toFixed(2)}%"></div>
            <div class="top-products-bar-branches" style="width:${visiblePercent.toFixed(2)}%">${segments}</div>
          </div>
        </div>
        <div class="top-products-bar-value">${formatMoney(totalValue)}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="top-products-chart-head">
      <h3>${window.i18n.t('reports_top_products_chart_title')}</h3>
      <div class="top-products-legend">${legend}</div>
    </div>
    <div class="top-products-chart-list">${rowsHtml}</div>
  `;
}

function buildTopProductsReportRows(filters) {
  const products = state.cache.products || {};
  const orders = getOrdersForCashierReport(filters.fromDate, filters.toDate, 'all');
  const rowsMap = {};
  const query = normalizeSearchValue(filters.query || '');
  const branchColumns = getTopProductsBranchColumns();
  const mode = filters.mode === 'bottom' ? 'bottom' : 'top';
  const limit = [10, 50, 100].includes(Number(filters.limit)) ? Number(filters.limit) : 10;

  orders.forEach((order) => {
    const branchId = order.branchId || 'unknown';
    normalizeItems(order.items).forEach((item) => {
      const productId = String(item.productId || item.itemId || item.id || '');
      if (!productId) return;
      const product = products[productId] || {};
      const lineRevenue = Number(item.qty || 0) * Number(item.price || 0);
      if (!rowsMap[productId]) {
        rowsMap[productId] = {
          productId,
          code: product.code || '-',
          nameAr: product.nameAr || item.productName || item.name || '-',
          nameEn: product.nameEn || item.productNameEn || '',
          branchSales: {},
          totalSales: 0
        };
      }
      rowsMap[productId].branchSales[branchId] = Number(rowsMap[productId].branchSales[branchId] || 0) + lineRevenue;
      rowsMap[productId].totalSales += lineRevenue;
    });
  });

  let rows = Object.values(rowsMap);
  if (query) {
    rows = rows.filter((row) => normalizeSearchValue(`${row.code} ${row.nameAr} ${row.nameEn}`).includes(query));
  }
  rows.sort((a, b) => (
    mode === 'bottom'
      ? Number(a.totalSales || 0) - Number(b.totalSales || 0)
      : Number(b.totalSales || 0) - Number(a.totalSales || 0)
  ));
  const limitedRows = rows.slice(0, limit);
  const totalTopSales = limitedRows.reduce((sum, row) => sum + Number(row.totalSales || 0), 0);
  return { rows: limitedRows, branchColumns, totalTopSales, mode, limit };
}

function renderTopProductsReportView(section) {
  const filters = state.reports.topProductsFilters || {
    fromDate: '',
    toDate: '',
    query: '',
    mode: 'top',
    limit: 10
  };
  const mode = filters.mode === 'bottom' ? 'bottom' : 'top';
  const limit = [10, 50, 100].includes(Number(filters.limit)) ? Number(filters.limit) : 10;
  const { rows, branchColumns, totalTopSales } = buildTopProductsReportRows({
    ...filters,
    mode,
    limit
  });
  const chartMarkup = renderTopProductsCreativeChart(rows, branchColumns);
  const branchHeaders = branchColumns.map((column) => `<th>${column.label}</th>`).join('');

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="topProductsBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('reports_top_products')}</h2>
        </div>
        <div class="row">
          <button id="topProductsExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="topProductsPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="topProductsDateFrom" class="input" type="date" style="max-width: 180px;" value="${filters.fromDate || ''}" />
        <input id="topProductsDateTo" class="input" type="date" style="max-width: 180px;" value="${filters.toDate || ''}" />
        <input id="topProductsQuery" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('reports_search_product_placeholder')}" value="${filters.query || ''}" />
        <select id="topProductsMode" class="input" style="max-width: 220px;">
          <option value="top" ${mode === 'top' ? 'selected' : ''}>${window.i18n.t('reports_top_products_mode_top')}</option>
          <option value="bottom" ${mode === 'bottom' ? 'selected' : ''}>${window.i18n.t('reports_top_products_mode_bottom')}</option>
        </select>
        <select id="topProductsLimit" class="input" style="max-width: 140px;">
          <option value="10" ${limit === 10 ? 'selected' : ''}>10</option>
          <option value="50" ${limit === 50 ? 'selected' : ''}>50</option>
          <option value="100" ${limit === 100 ? 'selected' : ''}>100</option>
        </select>
      </div>
      <div class="grid two" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('reports_products_count_label')}</strong><div class="report-total-value">${rows.length}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_products_sales_total_label')}</strong><div class="report-total-value">${formatMoney(totalTopSales)}</div></div>
      </div>
    </div>
    <div class="card top-products-chart-card">
      ${chartMarkup}
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('item_name_ar')}</th>
            <th>${window.i18n.t('item_name_en')}</th>
            ${branchHeaders}
          </tr>
        </thead>
        <tbody id="topProductsTableBody"></tbody>
      </table>
    </div>
  `;

  const fromInput = document.getElementById('topProductsDateFrom');
  if (fromInput) {
    fromInput.addEventListener('change', () => {
      state.reports.topProductsFilters.fromDate = fromInput.value || '';
      renderReportsSection();
    });
  }

  const toInput = document.getElementById('topProductsDateTo');
  if (toInput) {
    toInput.addEventListener('change', () => {
      state.reports.topProductsFilters.toDate = toInput.value || '';
      renderReportsSection();
    });
  }

  const queryInput = document.getElementById('topProductsQuery');
  if (queryInput) {
    bindDebouncedQueryInput(queryInput, (value) => {
      state.reports.topProductsFilters.query = String(value || '').trim();
      renderReportsSection();
    });
  }

  const modeSelect = document.getElementById('topProductsMode');
  if (modeSelect) {
    modeSelect.addEventListener('change', () => {
      state.reports.topProductsFilters.mode = modeSelect.value === 'bottom' ? 'bottom' : 'top';
      renderReportsSection();
    });
  }

  const limitSelect = document.getElementById('topProductsLimit');
  if (limitSelect) {
    limitSelect.addEventListener('change', () => {
      const nextLimit = Number(limitSelect.value || 10);
      state.reports.topProductsFilters.limit = [10, 50, 100].includes(nextLimit) ? nextLimit : 10;
      renderReportsSection();
    });
  }

  const tbody = document.getElementById('topProductsTableBody');
  if (tbody) {
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="${branchColumns.length + 2}">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      tbody.innerHTML = rows.map((row) => {
        const branchCells = branchColumns.map((column) => {
          const value = column.id ? Number(row.branchSales?.[column.id] || 0) : 0;
          if (!value || !column.id) return `<td>${formatMoney(0)}</td>`;
          return `<td><button class="btn ghost small" data-action="open-top-product-details" data-product-id="${row.productId}" data-branch-id="${column.id}">${formatMoney(value)}</button></td>`;
        }).join('');
        return `
          <tr>
            <td>${row.nameAr || '-'}</td>
            <td>${row.nameEn || '-'}</td>
            ${branchCells}
          </tr>
        `;
      }).join('');

      tbody.querySelectorAll('[data-action="open-top-product-details"]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.reports.topProductDetails = {
            productId: btn.dataset.productId,
            branchId: btn.dataset.branchId || 'all',
            fromDate: state.reports.topProductsFilters.fromDate || '',
            toDate: state.reports.topProductsFilters.toDate || '',
            cashierId: 'all',
            query: ''
          };
          state.reports.view = 'topProductDetails';
          renderReportsSection();
        });
      });
    }
  }

  const backBtn = document.getElementById('topProductsBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.reports.view = 'dashboard';
      renderReportsSection();
    });
  }

  const exportBtn = document.getElementById('topProductsExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const exportRows = rows.map((row) => {
        const payload = {
          [window.i18n.t('item_name_ar')]: row.nameAr || '-',
          [window.i18n.t('item_name_en')]: row.nameEn || '-'
        };
        branchColumns.forEach((column) => {
          payload[column.label] = formatMoney(column.id ? Number(row.branchSales?.[column.id] || 0) : 0);
        });
        return payload;
      });
      exportToExcel(exportRows, 'top-10-products-report.xlsx');
    });
  }

  const printBtn = document.getElementById('topProductsPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const headers = [
        window.i18n.t('item_name_ar'),
        window.i18n.t('item_name_en'),
        ...branchColumns.map((column) => column.label)
      ];
      const bodyRows = rows.map((row) => ([
        row.nameAr || '-',
        row.nameEn || '-',
        ...branchColumns.map((column) => formatMoney(column.id ? Number(row.branchSales?.[column.id] || 0) : 0))
      ]));
      printA4Report(
        window.i18n.t('reports_top_products'),
        [
          { label: window.i18n.t('filter_from'), value: filters.fromDate || '-' },
          { label: window.i18n.t('filter_to'), value: filters.toDate || '-' }
        ],
        headers,
        bodyRows,
        [{ label: window.i18n.t('reports_products_sales_total_label'), value: formatMoney(totalTopSales) }]
      );
    });
  }
}

function buildTopProductDetailsRows(filters) {
  const productId = String(filters.productId || '');
  if (!productId) return { rows: [], totals: { products: 0, delivery: 0, total: 0 }, cashierOptions: [] };
  const orders = getOrdersForCashierReport(filters.fromDate, filters.toDate, 'all');
  const cashiers = state.cache.cashiers || {};
  const orderTypes = state.cache.orderTypes || {};
  const rows = [];
  const query = normalizeSearchValue(filters.query || '');

  orders.forEach((order) => {
    if (filters.branchId !== 'all' && String(order.branchId || '') !== String(filters.branchId || '')) return;
    if (filters.cashierId !== 'all' && String(order.cashierId || '') !== String(filters.cashierId || '')) return;
    let productValue = 0;
    normalizeItems(order.items).forEach((item) => {
      const itemProductId = String(item.productId || item.itemId || item.id || '');
      if (itemProductId !== productId) return;
      productValue += Number(item.qty || 0) * Number(item.price || 0);
    });
    if (!productValue) return;
    const row = {
      invoiceNumber: order.orderNumber || order.invoiceNumber || order.id || '-',
      branchName: getLocalizedName(state.cache.branches?.[order.branchId]) || order.branchName || '-',
      cashierId: order.cashierId || '',
      cashierName: order.cashierName || cashiers[order.cashierId]?.name || '-',
      customerAddress: getOrderDeliveryAddressLabel(order),
      productsAmount: productValue,
      orderType: getLocalizedName(orderTypes[order.orderTypeId]) || order.orderTypeName || '-',
      deliveryFee: Number(order.deliveryFee || 0),
      total: Number(order.total || 0),
      createdAt: Number(order.createdAt || 0)
    };
    if (query) {
      const blob = normalizeSearchValue(`${row.invoiceNumber} ${row.branchName} ${row.cashierName} ${row.orderType} ${row.customerAddress}`);
      if (!blob.includes(query)) return;
    }
    rows.push(row);
  });

  rows.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const totals = rows.reduce((acc, row) => {
    acc.products += Number(row.productsAmount || 0);
    acc.delivery += Number(row.deliveryFee || 0);
    acc.total += Number(row.total || 0);
    return acc;
  }, { products: 0, delivery: 0, total: 0 });

  const cashierMap = {};
  rows.forEach((row) => {
    const id = String(row.cashierId || '');
    if (!id) return;
    cashierMap[id] = row.cashierName || '-';
  });
  const cashierOptions = Object.entries(cashierMap)
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { rows, totals, cashierOptions };
}

function renderTopProductDetailsView(section) {
  const filters = state.reports.topProductDetails || {
    productId: null,
    branchId: 'all',
    fromDate: '',
    toDate: '',
    cashierId: 'all',
    query: ''
  };
  if (!filters.productId) {
    state.reports.view = 'topProducts';
    renderReportsSection();
    return;
  }

  const product = state.cache.products?.[filters.productId] || null;
  const { rows, totals, cashierOptions } = buildTopProductDetailsRows(filters);

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="topProductDetailsBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('reports_top_products_details')}</h2>
        </div>
        <div class="row">
          <button id="topProductDetailsExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="topProductDetailsPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <strong>${window.i18n.t('name')}: ${getLocalizedName(product) || '-'}</strong>
        <span class="helper">${window.i18n.t('product_code')}: ${product?.code || '-'}</span>
        <span class="helper">${window.i18n.t('branch')}: ${getBranchLabel(filters.branchId)}</span>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="topProductDetailsDateFrom" class="input" type="date" style="max-width: 180px;" value="${filters.fromDate || ''}" />
        <input id="topProductDetailsDateTo" class="input" type="date" style="max-width: 180px;" value="${filters.toDate || ''}" />
        <select id="topProductDetailsCashier" class="input" style="max-width: 220px;"></select>
        <input id="topProductDetailsQuery" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('reports_search_top_product_details_placeholder')}" value="${filters.query || ''}" />
      </div>
      <div class="grid three" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('reports_products_amount')}</strong><div class="report-total-value">${formatMoney(totals.products)}</div></div>
        <div class="card light"><strong>${window.i18n.t('delivery_fee')}</strong><div class="report-total-value">${formatMoney(totals.delivery)}</div></div>
        <div class="card light"><strong>${window.i18n.t('total_sales')}</strong><div class="report-total-value">${formatMoney(totals.total)}</div></div>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('cashier')}</th>
            <th>${window.i18n.t('order_type')}</th>
            <th>${window.i18n.t('customer_address')}</th>
            <th>${window.i18n.t('reports_products_amount')}</th>
            <th>${window.i18n.t('delivery_fee')}</th>
            <th>${window.i18n.t('grand_total')}</th>
            <th>${window.i18n.t('date_time')}</th>
          </tr>
        </thead>
        <tbody id="topProductDetailsTableBody"></tbody>
      </table>
    </div>
  `;

  fillSelectWithOptions(
    document.getElementById('topProductDetailsCashier'),
    cashierOptions.map((entry) => ({ id: entry.id, label: entry.name })),
    filters.cashierId || 'all',
    window.i18n.t('all')
  );

  const backBtn = document.getElementById('topProductDetailsBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.reports.view = 'topProducts';
      renderReportsSection();
    });
  }

  const fromInput = document.getElementById('topProductDetailsDateFrom');
  if (fromInput) {
    fromInput.addEventListener('change', () => {
      state.reports.topProductDetails.fromDate = fromInput.value || '';
      renderReportsSection();
    });
  }
  const toInput = document.getElementById('topProductDetailsDateTo');
  if (toInput) {
    toInput.addEventListener('change', () => {
      state.reports.topProductDetails.toDate = toInput.value || '';
      renderReportsSection();
    });
  }
  const cashierSelect = document.getElementById('topProductDetailsCashier');
  if (cashierSelect) {
    cashierSelect.addEventListener('change', () => {
      state.reports.topProductDetails.cashierId = cashierSelect.value || 'all';
      renderReportsSection();
    });
  }
  const queryInput = document.getElementById('topProductDetailsQuery');
  if (queryInput) {
    bindDebouncedQueryInput(queryInput, (value) => {
      state.reports.topProductDetails.query = String(value || '').trim();
      renderReportsSection();
    });
  }

  const tbody = document.getElementById('topProductDetailsTableBody');
  if (tbody) {
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="9">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      tbody.innerHTML = rows.map((row) => `
        <tr>
          <td>${row.invoiceNumber}</td>
          <td>${row.branchName}</td>
          <td>${row.cashierName}</td>
          <td>${row.orderType}</td>
          <td>${row.customerAddress}</td>
          <td>${formatMoney(row.productsAmount)}</td>
          <td>${formatMoney(row.deliveryFee)}</td>
          <td>${formatMoney(row.total)}</td>
          <td>${formatDate(row.createdAt)}</td>
        </tr>
      `).join('');
    }
  }

  const exportBtn = document.getElementById('topProductDetailsExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const exportRows = rows.map((row) => ({
        [window.i18n.t('invoice_number')]: row.invoiceNumber,
        [window.i18n.t('branch')]: row.branchName,
        [window.i18n.t('cashier')]: row.cashierName,
        [window.i18n.t('order_type')]: row.orderType,
        [window.i18n.t('customer_address')]: row.customerAddress,
        [window.i18n.t('reports_products_amount')]: formatMoney(row.productsAmount),
        [window.i18n.t('delivery_fee')]: formatMoney(row.deliveryFee),
        [window.i18n.t('grand_total')]: formatMoney(row.total),
        [window.i18n.t('date_time')]: formatDate(row.createdAt)
      }));
      exportToExcel(exportRows, 'top-product-branch-details.xlsx');
    });
  }

  const printBtn = document.getElementById('topProductDetailsPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const headers = [
        window.i18n.t('invoice_number'),
        window.i18n.t('branch'),
        window.i18n.t('cashier'),
        window.i18n.t('order_type'),
        window.i18n.t('customer_address'),
        window.i18n.t('reports_products_amount'),
        window.i18n.t('delivery_fee'),
        window.i18n.t('grand_total'),
        window.i18n.t('date_time')
      ];
      const bodyRows = rows.map((row) => [
        row.invoiceNumber,
        row.branchName,
        row.cashierName,
        row.orderType,
        row.customerAddress,
        formatMoney(row.productsAmount),
        formatMoney(row.deliveryFee),
        formatMoney(row.total),
        formatDate(row.createdAt)
      ]);
      printA4Report(
        window.i18n.t('reports_top_products_details'),
        [
          { label: window.i18n.t('name'), value: getLocalizedName(product) || '-' },
          { label: window.i18n.t('branch'), value: getBranchLabel(filters.branchId) },
          { label: window.i18n.t('filter_from'), value: filters.fromDate || '-' },
          { label: window.i18n.t('filter_to'), value: filters.toDate || '-' }
        ],
        headers,
        bodyRows,
        [
          { label: window.i18n.t('reports_products_amount'), value: formatMoney(totals.products) },
          { label: window.i18n.t('delivery_fee'), value: formatMoney(totals.delivery) },
          { label: window.i18n.t('grand_total'), value: formatMoney(totals.total) }
        ]
      );
    });
  }
}

function buildOrderSalesReportRows(filters) {
  const fromDate = filters.fromDate || '';
  const toDate = filters.toDate || '';
  const branchId = filters.branchId || 'all';
  const query = normalizeSearchValue(filters.query || '');
  if (!fromDate || !toDate) {
    return {
      rows: [],
      totals: { products: 0, delivery: 0, total: 0, runningBalance: 0 },
      missingPeriod: true
    };
  }
  const customers = state.cache.customers || {};
  const orders = getOrdersForCashierReport(fromDate, toDate, branchId)
    .slice()
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  const rows = [];
  let runningBalance = 0;
  orders.forEach((order) => {
    const customer = customers[order.customerId];
    const invoiceNumber = order.orderNumber || order.invoiceNumber || order.id || '-';
    const customerName = order.customerName || getLocalizedName(customer) || '-';
    const customerPhone = order.customerPhone || customer?.phone || '-';
    if (query) {
      const blob = normalizeSearchValue(`${invoiceNumber} ${customerName} ${customerPhone}`);
      if (!blob.includes(query)) return;
    }
    const productsAmount = Number(order.subtotal ?? order.netTotal ?? ((order.total || 0) - (order.deliveryFee || 0)));
    const deliveryFee = Number(order.deliveryFee || 0);
    const total = Number(order.total || 0);
    runningBalance += total;
    rows.push({
      id: order.id,
      invoiceNumber,
      customerName,
      customerPhone,
      productsAmount,
      deliveryFee,
      total,
      createdAt: Number(order.createdAt || 0),
      runningBalance
    });
  });
  const totals = rows.reduce((acc, row) => {
    acc.products += Number(row.productsAmount || 0);
    acc.delivery += Number(row.deliveryFee || 0);
    acc.total += Number(row.total || 0);
    return acc;
  }, { products: 0, delivery: 0, total: 0 });
  totals.runningBalance = rows.length ? Number(rows[rows.length - 1].runningBalance || 0) : 0;
  return { rows, totals, missingPeriod: false };
}

function renderOrderSalesReportView(section) {
  const filters = state.reports.orderSalesFilters || {
    fromDate: '',
    toDate: '',
    branchId: 'all',
    query: ''
  };
  const { rows, totals, missingPeriod } = buildOrderSalesReportRows(filters);

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="orderSalesBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('reports_orders_sales')}</h2>
        </div>
        <div class="row">
          <button id="orderSalesExportBtn" class="btn ghost">${window.i18n.t('download_report_excel')}</button>
          <button id="orderSalesPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="orderSalesDateFrom" class="input" type="date" style="max-width: 180px;" value="${filters.fromDate || ''}" />
        <input id="orderSalesDateTo" class="input" type="date" style="max-width: 180px;" value="${filters.toDate || ''}" />
        <select id="orderSalesBranch" class="input" style="max-width: 240px;"></select>
        <input id="orderSalesQuery" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('reports_search_placeholder')}" value="${filters.query || ''}" />
      </div>
      ${missingPeriod ? `<p class="helper form-error" style="margin-top: 8px;">${window.i18n.t('select_period_prompt')}</p>` : ''}
      <div class="grid three" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('reports_products_amount')}</strong><div class="report-total-value">${formatMoney(totals.products)}</div></div>
        <div class="card light"><strong>${window.i18n.t('delivery_price')}</strong><div class="report-total-value">${formatMoney(totals.delivery)}</div></div>
        <div class="card light"><strong>${window.i18n.t('total_sales')}</strong><div class="report-total-value">${formatMoney(totals.total)}</div></div>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('row_number')}</th>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('customer_name')}</th>
            <th>${window.i18n.t('customer_phone')}</th>
            <th>${window.i18n.t('reports_products_amount')}</th>
            <th>${window.i18n.t('delivery_price')}</th>
            <th>${window.i18n.t('grand_total')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('running_balance')}</th>
          </tr>
        </thead>
        <tbody id="orderSalesTableBody"></tbody>
      </table>
    </div>
  `;

  const branchSelect = document.getElementById('orderSalesBranch');
  if (branchSelect) {
    fillReportBranchSelect(branchSelect, filters.branchId || 'all');
    branchSelect.addEventListener('change', () => {
      state.reports.orderSalesFilters.branchId = branchSelect.value || 'all';
      renderReportsSection();
    });
  }

  const fromInput = document.getElementById('orderSalesDateFrom');
  if (fromInput) {
    fromInput.addEventListener('change', () => {
      state.reports.orderSalesFilters.fromDate = fromInput.value || '';
      renderReportsSection();
    });
  }

  const toInput = document.getElementById('orderSalesDateTo');
  if (toInput) {
    toInput.addEventListener('change', () => {
      state.reports.orderSalesFilters.toDate = toInput.value || '';
      renderReportsSection();
    });
  }

  const queryInput = document.getElementById('orderSalesQuery');
  if (queryInput) {
    bindDebouncedQueryInput(queryInput, (value) => {
      state.reports.orderSalesFilters.query = String(value || '').trim();
      renderReportsSection();
    });
  }

  const tbody = document.getElementById('orderSalesTableBody');
  if (tbody) {
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="9">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      const rowsHtml = rows.map((row, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${row.invoiceNumber || '-'}</td>
          <td>${row.customerName || '-'}</td>
          <td>${row.customerPhone || '-'}</td>
          <td>${formatMoney(row.productsAmount)}</td>
          <td>${formatMoney(row.deliveryFee)}</td>
          <td>${formatMoney(row.total)}</td>
          <td>${formatDate(row.createdAt)}</td>
          <td>${formatMoney(row.runningBalance)}</td>
        </tr>
      `).join('');
      const totalRow = `
        <tr>
          <td colspan="4"><strong>${window.i18n.t('total')}</strong></td>
          <td><strong>${formatMoney(totals.products)}</strong></td>
          <td><strong>${formatMoney(totals.delivery)}</strong></td>
          <td><strong>${formatMoney(totals.total)}</strong></td>
          <td>-</td>
          <td><strong>${formatMoney(totals.runningBalance)}</strong></td>
        </tr>
      `;
      tbody.innerHTML = `${rowsHtml}${totalRow}`;
    }
  }

  const backBtn = document.getElementById('orderSalesBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.reports.view = 'dashboard';
      renderReportsSection();
    });
  }

  const exportBtn = document.getElementById('orderSalesExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const exportRows = rows.map((row, index) => ({
        [window.i18n.t('row_number')]: index + 1,
        [window.i18n.t('invoice_number')]: row.invoiceNumber || '-',
        [window.i18n.t('customer_name')]: row.customerName || '-',
        [window.i18n.t('customer_phone')]: row.customerPhone || '-',
        [window.i18n.t('reports_products_amount')]: formatMoney(row.productsAmount),
        [window.i18n.t('delivery_price')]: formatMoney(row.deliveryFee),
        [window.i18n.t('grand_total')]: formatMoney(row.total),
        [window.i18n.t('date_time')]: formatDate(row.createdAt),
        [window.i18n.t('running_balance')]: formatMoney(row.runningBalance)
      }));
      exportRows.push({
        [window.i18n.t('row_number')]: '',
        [window.i18n.t('invoice_number')]: window.i18n.t('total'),
        [window.i18n.t('customer_name')]: '',
        [window.i18n.t('customer_phone')]: '',
        [window.i18n.t('reports_products_amount')]: formatMoney(totals.products),
        [window.i18n.t('delivery_price')]: formatMoney(totals.delivery),
        [window.i18n.t('grand_total')]: formatMoney(totals.total),
        [window.i18n.t('date_time')]: '',
        [window.i18n.t('running_balance')]: formatMoney(totals.runningBalance)
      });
      exportToExcel(exportRows, 'orders-sales-report.xlsx');
    });
  }

  const printBtn = document.getElementById('orderSalesPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const headers = [
        window.i18n.t('row_number'),
        window.i18n.t('invoice_number'),
        window.i18n.t('customer_name'),
        window.i18n.t('customer_phone'),
        window.i18n.t('reports_products_amount'),
        window.i18n.t('delivery_price'),
        window.i18n.t('grand_total'),
        window.i18n.t('date_time'),
        window.i18n.t('running_balance')
      ];
      const bodyRows = rows.map((row, index) => ([
        index + 1,
        row.invoiceNumber || '-',
        row.customerName || '-',
        row.customerPhone || '-',
        formatMoney(row.productsAmount),
        formatMoney(row.deliveryFee),
        formatMoney(row.total),
        formatDate(row.createdAt),
        formatMoney(row.runningBalance)
      ]));
      printA4Report(
        window.i18n.t('reports_orders_sales'),
        [
          { label: window.i18n.t('filter_from'), value: filters.fromDate || '-' },
          { label: window.i18n.t('filter_to'), value: filters.toDate || '-' },
          { label: window.i18n.t('branch'), value: filters.branchId === 'all' ? window.i18n.t('all_branches') : getBranchLabel(filters.branchId) }
        ],
        headers,
        bodyRows,
        [
          { label: window.i18n.t('reports_products_amount'), value: formatMoney(totals.products) },
          { label: window.i18n.t('delivery_price'), value: formatMoney(totals.delivery) },
          { label: window.i18n.t('grand_total'), value: formatMoney(totals.total) },
          { label: window.i18n.t('running_balance'), value: formatMoney(totals.runningBalance) }
        ]
      );
    });
  }
}

function printA4Report(title, metadataRows, headers, rows, summaryRows = []) {
  const lang = window.i18n.getLanguage();
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const headerCells = (headers || []).map((item) => `<th>${item}</th>`).join('');
  const rowHtml = (rows || []).map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('');
  const metaHtml = (metadataRows || []).map((item) => `<p><strong>${item.label}:</strong> ${item.value}</p>`).join('');
  const summaryHtml = (summaryRows || []).map((item) => `
    <div class="summary-item">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join('');
  const html = `
    <!DOCTYPE html>
    <html lang="${lang}" dir="${dir}">
      <head>
        <title>${title}</title>
        <style>
          @page { size: A4; margin: 12mm; }
          body { font-family: 'Cairo', sans-serif; direction: ${dir}; color: #1e1b16; font-size: 12px; }
          .report-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 12px; }
          .logo { width: 64px; height: 64px; object-fit: contain; }
          h2 { margin: 0; font-size: 20px; }
          p { margin: 4px 0; font-size: 12px; }
          .meta { border: 1px solid #ddd; border-radius: 10px; padding: 8px 10px; margin-bottom: 10px; }
          .summary { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
          .summary-item { border: 1px solid #ddd; border-radius: 10px; padding: 6px 10px; min-width: 140px; display: flex; flex-direction: column; gap: 4px; }
          .summary-item strong { font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border: 1px solid #ddd; padding: 6px; text-align: start; font-size: 11px; }
          thead th { background: #f2eee8; }
        </style>
      </head>
      <body>
        <div class="report-head">
          <div>
            <h2>${title}</h2>
            <p>${window.i18n.t('date_time')}: ${formatDate(Date.now())}</p>
          </div>
          <img class="logo" src="logo.png" alt="logo" />
        </div>
        ${metaHtml ? `<div class="meta">${metaHtml}</div>` : ''}
        ${summaryHtml ? `<div class="summary">${summaryHtml}</div>` : ''}
        <table>
          <thead>
            <tr>${headerCells}</tr>
          </thead>
          <tbody>
            ${rowHtml || `<tr><td colspan="${headers.length}">${window.i18n.t('no_data')}</td></tr>`}
          </tbody>
        </table>
      </body>
    </html>
  `;
  if (window.figsDesktop?.isDesktopApp) {
    window.figsDesktop.printHtml({ html, type: 'a4', silent: true }).catch((error) => {
      console.error('Desktop A4 print failed:', error);
      alert('تعذرت الطباعة على طابعة A4. تأكد من اختيار الطابعة في إعدادات الطابعات.');
    });
    return;
  }
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

function printReportTable(title, metadataRows, headers, rows, totalLabel, totalValue) {
  printA4Report(
    title,
    metadataRows,
    headers,
    rows,
    totalLabel ? [{ label: totalLabel, value: totalValue }] : []
  );
}

function printSalesReport(rows, totalRevenue) {
  const salesFilters = state.reports.salesFilters || {};
  const metadata = [
    { label: window.i18n.t('filter_from'), value: salesFilters.fromDate || '-' },
    { label: window.i18n.t('filter_to'), value: salesFilters.toDate || '-' }
  ];
  const headers = [
    window.i18n.t('row_number'),
    window.i18n.t('product_code'),
    window.i18n.t('item_name_ar'),
    window.i18n.t('item_name_en'),
    window.i18n.t('categories'),
    window.i18n.t('branch'),
    window.i18n.t('reports_sold_qty'),
    window.i18n.t('reports_product_revenue')
  ];
  const bodyRows = rows.map((row, index) => ([
    index + 1,
    row.productCode || '-',
    row.nameAr || '-',
    row.nameEn || '-',
    row.categoryName || '-',
    row.branchName || '-',
    formatNumber(row.qty),
    formatMoney(row.revenue)
  ]));
  printReportTable(
    window.i18n.t('sales'),
    metadata,
    headers,
    bodyRows,
    window.i18n.t('reports_total_revenue'),
    formatMoney(totalRevenue)
  );
}

function printSalesProductDetailsReport(product, rows, totalRevenue) {
  const salesFilters = state.reports.salesFilters || {};
  const metadata = [
    { label: window.i18n.t('selected_item'), value: `${product.nameAr || '-'} / ${product.nameEn || '-'}` },
    { label: window.i18n.t('filter_from'), value: salesFilters.fromDate || '-' },
    { label: window.i18n.t('filter_to'), value: salesFilters.toDate || '-' }
  ];
  const headers = [
    window.i18n.t('row_number'),
    window.i18n.t('invoice_number'),
    window.i18n.t('customer_name'),
    window.i18n.t('cashier'),
    window.i18n.t('reports_invoice_qty'),
    window.i18n.t('reports_invoice_revenue'),
    window.i18n.t('date_time')
  ];
  const bodyRows = rows.map((row, index) => ([
    index + 1,
    row.invoiceNumber || '-',
    row.customerName || '-',
    row.cashierName || '-',
    formatNumber(row.qty),
    formatMoney(row.revenue),
    formatDate(row.createdAt)
  ]));
  printReportTable(
    window.i18n.t('reports_product_details'),
    metadata,
    headers,
    bodyRows,
    window.i18n.t('reports_total_revenue'),
    formatMoney(totalRevenue)
  );
}

function setupOrdersSection() {
  const section = document.getElementById('section-orders');
  if (!section) return;
  ensurePaginationFields(state.orderFilters);
  if (!Array.isArray(state.orderFilters.zoneIds)) {
    if (state.orderFilters.zoneId && state.orderFilters.zoneId !== 'all') {
      state.orderFilters.zoneIds = [state.orderFilters.zoneId];
    } else {
      state.orderFilters.zoneIds = [];
    }
  }
  if (!state.orderFilters.orderTypeId) {
    state.orderFilters.orderTypeId = 'all';
  }
  section.innerHTML = `
    <div class="card">
      <h2>${window.i18n.t('orders')}</h2>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="orderDateFrom" class="input" type="date" style="max-width: 180px;" placeholder="${window.i18n.t('filter_from')}" />
        <input id="orderDateTo" class="input" type="date" style="max-width: 180px;" placeholder="${window.i18n.t('filter_to')}" />
        <select id="orderBranchFilter" class="input" style="max-width: 180px;"></select>
        <select id="orderCashierFilter" class="input" style="max-width: 180px;"></select>
        <select id="orderTypeFilter" class="input" style="max-width: 180px;"></select>
        <details id="orderZoneFilter" class="multi-select-filter" style="min-width: 240px; max-width: 280px;">
          <summary id="orderZoneFilterSummary" class="input">${window.i18n.t('all_zones')}</summary>
          <div class="multi-select-panel">
            <input id="orderZoneSearch" class="input" placeholder="${window.i18n.t('search_zone')}" />
            <div class="row" style="justify-content: space-between; margin-top: 8px;">
              <button type="button" id="orderZoneSelectAll" class="btn ghost small">${window.i18n.t('select_all')}</button>
              <button type="button" id="orderZoneClear" class="btn ghost small">${window.i18n.t('cancel')}</button>
            </div>
            <div id="orderZoneFilterOptions" class="multi-select-options" style="margin-top: 8px;"></div>
          </div>
        </details>
        <input id="orderSearch" class="input" style="max-width: 240px;" placeholder="${window.i18n.t('search_orders')}" />
        <button id="ordersDownloadBtn" class="btn ghost small">${window.i18n.t('orders_download')}</button>
        <button id="ordersPrintBtn" class="btn ghost small">${window.i18n.t('print_report')}</button>
      </div>
    </div>
    <div class="card">
      <div class="row" style="justify-content: flex-end; margin-bottom: 12px;">
        ${buildPageSizeControlHtml('ordersPageSize')}
      </div>
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox" id="selectAllOrders" /></th>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('customer_name')}</th>
            <th>${window.i18n.t('delivery_zone')}</th>
            <th>${window.i18n.t('customer_phone')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('cashier')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('order_type')}</th>
            <th>${window.i18n.t('net_total')}</th>
            <th>${window.i18n.t('delivery_fee')}</th>
            <th>${window.i18n.t('grand_total')}</th>
            <th>${window.i18n.t('payment_method')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="ordersTable"></tbody>
      </table>
      ${buildPaginationBarHtml('ordersPageInfo', 'ordersPagination')}
    </div>
  `;

  section.querySelector('#orderBranchFilter').addEventListener('change', (e) => {
    state.orderFilters.branchId = e.target.value;
    resetPaginationPage(state.orderFilters);
    renderOrders();
  });
  section.querySelector('#orderCashierFilter').addEventListener('change', (e) => {
    state.orderFilters.cashierId = e.target.value;
    resetPaginationPage(state.orderFilters);
    renderOrders();
  });
  section.querySelector('#orderTypeFilter').addEventListener('change', (e) => {
    state.orderFilters.orderTypeId = e.target.value;
    resetPaginationPage(state.orderFilters);
    renderOrders();
  });
  section.querySelector('#orderDateFrom').addEventListener('change', (e) => {
    state.orderFilters.dateFrom = e.target.value;
    resetPaginationPage(state.orderFilters);
    renderOrders();
  });
  section.querySelector('#orderDateTo').addEventListener('change', (e) => {
    state.orderFilters.dateTo = e.target.value;
    resetPaginationPage(state.orderFilters);
    renderOrders();
  });

  section.querySelector('#orderSearch').addEventListener('input', (e) => {
    state.orderFilters.query = e.target.value.trim().toLowerCase();
    resetPaginationPage(state.orderFilters);
    renderOrders();
  });

  section.querySelector('#ordersPageSize').addEventListener('change', (e) => {
    state.orderFilters.pageSize = Number(e.target.value || 10);
    resetPaginationPage(state.orderFilters);
    renderOrders();
  });

  section.querySelector('#orderDateFrom').value = state.orderFilters.dateFrom || '';
  section.querySelector('#orderDateTo').value = state.orderFilters.dateTo || '';
  section.querySelector('#orderSearch').value = state.orderFilters.query || '';

  const zoneSearch = section.querySelector('#orderZoneSearch');
  if (zoneSearch) {
    zoneSearch.value = '';
    zoneSearch.addEventListener('input', () => {
      renderOrderZoneFilterOptions();
    });
  }

  const zoneSelectAll = section.querySelector('#orderZoneSelectAll');
  if (zoneSelectAll) {
    zoneSelectAll.addEventListener('click', () => {
      const zones = state.cache.deliveryZones || {};
      state.orderFilters.zoneIds = Object.keys(zones);
      resetPaginationPage(state.orderFilters);
      renderOrders();
      const details = section.querySelector('#orderZoneFilter');
      if (details) details.open = true;
    });
  }

  const zoneClear = section.querySelector('#orderZoneClear');
  if (zoneClear) {
    zoneClear.addEventListener('click', () => {
      state.orderFilters.zoneIds = [];
      if (zoneSearch) zoneSearch.value = '';
      resetPaginationPage(state.orderFilters);
      renderOrders();
      const details = section.querySelector('#orderZoneFilter');
      if (details) details.open = true;
    });
  }

  section.querySelector('#ordersDownloadBtn').addEventListener('click', () => exportOrders());
  section.querySelector('#ordersPrintBtn').addEventListener('click', () => printOrders());
  section.querySelector('#selectAllOrders').addEventListener('change', (e) => {
    toggleSelectAllOrders(e.target.checked);
  });

  renderOrders();
}

function getOrderZoneFilterLabel() {
  const zones = state.cache.deliveryZones || {};
  const selectedIds = Array.isArray(state.orderFilters.zoneIds) ? state.orderFilters.zoneIds : [];
  if (!selectedIds.length) return window.i18n.t('all_zones');
  if (selectedIds.length === 1) {
    return getLocalizedName(zones[selectedIds[0]]) || window.i18n.t('all_zones');
  }
  return `${window.i18n.t('delivery_zones')} (${selectedIds.length})`;
}

function renderOrderZoneFilterOptions() {
  const optionsWrap = document.getElementById('orderZoneFilterOptions');
  const searchInput = document.getElementById('orderZoneSearch');
  const summary = document.getElementById('orderZoneFilterSummary');
  if (summary) summary.textContent = getOrderZoneFilterLabel();
  if (!optionsWrap) return;

  const zones = state.cache.deliveryZones || {};
  const query = normalizeSearchValue(searchInput?.value || '');
  const selectedSet = new Set(Array.isArray(state.orderFilters.zoneIds) ? state.orderFilters.zoneIds : []);
  const entries = Object.entries(zones)
    .map(([id, zone]) => ({ id, name: getLocalizedName(zone) || '-' }))
    .filter((entry) => !query || normalizeSearchValue(entry.name).includes(query))
    .sort((a, b) => a.name.localeCompare(b.name));

  optionsWrap.innerHTML = '';
  if (!entries.length) {
    optionsWrap.innerHTML = `<div class="helper">${window.i18n.t('no_data')}</div>`;
    return;
  }

  entries.forEach((entry) => {
    const label = document.createElement('label');
    label.className = 'multi-select-option';
    label.innerHTML = `
      <input type="checkbox" value="${entry.id}" ${selectedSet.has(entry.id) ? 'checked' : ''} />
      <span>${entry.name}</span>
    `;
    const checkbox = label.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      const zoneIds = new Set(Array.isArray(state.orderFilters.zoneIds) ? state.orderFilters.zoneIds : []);
      if (checkbox.checked) {
        zoneIds.add(entry.id);
      } else {
        zoneIds.delete(entry.id);
      }
      state.orderFilters.zoneIds = Array.from(zoneIds);
      resetPaginationPage(state.orderFilters);
      renderOrders();
      const details = document.getElementById('orderZoneFilter');
      if (details) details.open = true;
    });
    optionsWrap.appendChild(label);
  });
}

function setupCustomersSection() {
  const section = document.getElementById('section-customers');
  if (!section) return;
  renderCustomersSection();
}

function setupUnitsSection() {
  const section = document.getElementById('section-units');
  if (!section) return;
  const paginationState = ensureTablePaginationState('units');
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('units')}</h2>
        <button id="newUnitBtn" class="btn primary small">${window.i18n.t('new_unit')}</button>
      </div>
    </div>
    <div class="card">
      <div class="row" style="justify-content: flex-end; margin-bottom: 12px;">
        ${buildPageSizeControlHtml('unitsPageSize')}
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('name_ar')}</th>
            <th>${window.i18n.t('name_en')}</th>
            <th>${window.i18n.t('products_count')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="unitsTable"></tbody>
      </table>
      ${buildPaginationBarHtml('unitsPageInfo', 'unitsPagination')}
    </div>
  `;

  section.querySelector('#newUnitBtn').addEventListener('click', () => openUnitModal());
  section.querySelector('#unitsPageSize').addEventListener('change', (e) => {
    paginationState.pageSize = Number(e.target.value || 10);
    paginationState.currentPage = 1;
    renderUnitsSection();
  });
  renderUnitsSection();
}

function setupItemCardSection() {
  const section = document.getElementById('section-itemCards');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h2>${window.i18n.t('item_cards')}</h2>
      </div>
      <div class="grid two" style="margin-top: 12px;">
        <div>
          <label class="tag">${window.i18n.t('selected_item')}</label>
          <div class="row" style="gap: 8px;">
            <input id="itemCardItemName" class="input" readonly />
            <button id="itemCardSelectBtn" class="btn ghost small">${window.i18n.t('select_item')}</button>
          </div>
        </div>
        <div>
          <label class="tag">${window.i18n.t('select_category')}</label>
          <div class="row" style="gap: 8px;">
            <input id="itemCardClassificationName" class="input" readonly />
            <button id="itemCardSelectClassificationBtn" class="btn ghost small">${window.i18n.t('select_category')}</button>
          </div>
        </div>
        <div>
          <label class="tag">${window.i18n.t('branch')}</label>
          <select id="itemCardBranch" class="input"></select>
        </div>
        <div>
          <label class="tag">${window.i18n.t('filter_from')}</label>
          <input id="itemCardFrom" class="input" type="date" />
        </div>
        <div>
          <label class="tag">${window.i18n.t('filter_to')}</label>
          <input id="itemCardTo" class="input" type="date" />
        </div>
      </div>
      <div style="margin-top: 12px;">
        <label class="tag">${window.i18n.t('movement_type')}</label>
        <details id="itemCardMovementFilter" class="multi-select-filter">
          <summary id="itemCardMovementSummary" class="input">${window.i18n.t('all_types')}</summary>
          <div class="multi-select-panel">
            <input id="itemCardMovementSearch" class="input" placeholder="${window.i18n.t('search')}" />
            <div id="itemCardMovementOptions" class="multi-select-options" style="margin-top: 8px;"></div>
          </div>
        </details>
      </div>
      <div class="row" style="justify-content: flex-end; margin-top: 12px; gap: 8px;">
        <button id="itemCardExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
        <button id="itemCardPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        <button id="itemCardRunBtn" class="btn primary">${window.i18n.t('show_movements')}</button>
      </div>
      <p id="itemCardSummary" class="helper" style="margin-top: 8px;"></p>
      <p id="itemCardError" class="helper form-error"></p>
    </div>
    <div class="card">
      <table class="table">
        <thead id="itemCardMovementsHead"></thead>
        <tbody id="itemCardMovementsTable"></tbody>
      </table>
    </div>
    <div id="itemCardPicker" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('select_item')}</h3>
          <button id="itemCardPickerClose" class="btn ghost small">×</button>
        </div>
        <div class="row" style="margin-top: 12px;">
          <input id="itemCardSearchInput" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('search_items')}" />
          <button id="itemCardPickerSearchBtn" class="btn ghost small">${window.i18n.t('search')}</button>
        </div>
        <div id="itemCardSearchResults" class="grid two" style="margin-top: 12px;"></div>
      </div>
    </div>
    <div id="itemCardClassificationPicker" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 760px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('select_category')}</h3>
          <button id="itemCardClassificationClose" class="btn ghost small">×</button>
        </div>
        <div class="grid three" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('type')}</label>
            <select id="itemCardClassificationType" class="input"></select>
          </div>
          <div id="itemCardClassificationTargetWrap">
            <label class="tag">${window.i18n.t('select')}</label>
            <select id="itemCardClassificationTarget" class="input"></select>
          </div>
        </div>
        <div id="itemCardClassificationCategoryWrap" class="grid three" style="margin-top: 12px; display: none;">
          <div>
            <label class="tag">${window.i18n.t('reports_main_category')}</label>
            <select id="itemCardClassificationMain" class="input"></select>
          </div>
          <div>
            <label class="tag">${window.i18n.t('reports_sub_category')}</label>
            <select id="itemCardClassificationSub" class="input"></select>
          </div>
          <div>
            <label class="tag">${window.i18n.t('sub_category_level_2')}</label>
            <select id="itemCardClassificationSub2" class="input"></select>
          </div>
        </div>
        <div id="itemCardClassificationSearchWrap" style="margin-top: 12px; display: none;">
          <input id="itemCardClassificationSearch" class="input" placeholder="${window.i18n.t('search')}" />
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 14px;">
          <button id="itemCardClassificationCancel" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="itemCardClassificationApply" class="btn primary">${window.i18n.t('apply')}</button>
        </div>
      </div>
    </div>
  `;

  bindItemCardSection();
  renderItemCardSection();
}

function bindItemCardSection() {
  const selectBtn = document.getElementById('itemCardSelectBtn');
  const selectClassificationBtn = document.getElementById('itemCardSelectClassificationBtn');
  const searchBtn = document.getElementById('itemCardRunBtn');
  const exportBtn = document.getElementById('itemCardExportBtn');
  const printBtn = document.getElementById('itemCardPrintBtn');
  const branchSelect = document.getElementById('itemCardBranch');
  const fromInput = document.getElementById('itemCardFrom');
  const toInput = document.getElementById('itemCardTo');
  const pickerClose = document.getElementById('itemCardPickerClose');
  const pickerSearchInput = document.getElementById('itemCardSearchInput');
  const pickerSearchBtn = document.getElementById('itemCardPickerSearchBtn');
  const movementSearchInput = document.getElementById('itemCardMovementSearch');
  const classificationClose = document.getElementById('itemCardClassificationClose');
  const classificationCancel = document.getElementById('itemCardClassificationCancel');
  const classificationApply = document.getElementById('itemCardClassificationApply');
  const classificationType = document.getElementById('itemCardClassificationType');
  const classificationMain = document.getElementById('itemCardClassificationMain');
  const classificationSub = document.getElementById('itemCardClassificationSub');
  const classificationSub2 = document.getElementById('itemCardClassificationSub2');
  const classificationTarget = document.getElementById('itemCardClassificationTarget');
  const classificationSearch = document.getElementById('itemCardClassificationSearch');

  if (selectBtn) selectBtn.addEventListener('click', () => openItemCardPicker());
  if (selectClassificationBtn) selectClassificationBtn.addEventListener('click', () => openItemCardClassificationPicker());
  if (searchBtn) searchBtn.addEventListener('click', () => handleItemCardSearch());
  if (exportBtn) exportBtn.addEventListener('click', () => exportItemCardMovements());
  if (printBtn) printBtn.addEventListener('click', () => printItemCardMovements());
  if (branchSelect) {
    branchSelect.addEventListener('change', () => {
      state.itemCard.branchId = branchSelect.value;
    });
  }
  if (fromInput) {
    fromInput.addEventListener('change', () => {
      state.itemCard.fromDate = fromInput.value;
    });
  }
  if (toInput) {
    toInput.addEventListener('change', () => {
      state.itemCard.toDate = toInput.value;
    });
  }
  if (pickerClose) pickerClose.addEventListener('click', () => closeItemCardPicker());
  if (pickerSearchInput) {
    pickerSearchInput.addEventListener('input', () => renderItemCardSearchResults());
    pickerSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleItemCardBarcodeScan();
      }
    });
  }
  if (pickerSearchBtn) pickerSearchBtn.addEventListener('click', () => renderItemCardSearchResults());
  if (movementSearchInput) movementSearchInput.addEventListener('input', () => renderItemCardMovementFilterOptions());
  if (classificationClose) classificationClose.addEventListener('click', () => closeItemCardClassificationPicker());
  if (classificationCancel) classificationCancel.addEventListener('click', () => closeItemCardClassificationPicker());
  if (classificationApply) classificationApply.addEventListener('click', () => applyItemCardClassificationSelection());
  if (classificationType) {
    classificationType.addEventListener('change', () => {
      state.itemCard.classificationPickerType = classificationType.value || '';
      state.itemCard.classificationPickerCategoryMain = '';
      state.itemCard.classificationPickerCategorySub = '';
      state.itemCard.classificationPickerCategorySub2 = '';
      state.itemCard.classificationPickerTargetId = '';
      state.itemCard.classificationPickerQuery = '';
      renderItemCardClassificationPicker();
    });
  }
  if (classificationMain) {
    classificationMain.addEventListener('change', () => {
      state.itemCard.classificationPickerCategoryMain = classificationMain.value || '';
      state.itemCard.classificationPickerCategorySub = '';
      state.itemCard.classificationPickerCategorySub2 = '';
      renderItemCardClassificationPicker();
    });
  }
  if (classificationSub) {
    classificationSub.addEventListener('change', () => {
      state.itemCard.classificationPickerCategorySub = classificationSub.value || '';
      state.itemCard.classificationPickerCategorySub2 = '';
      renderItemCardClassificationPicker();
    });
  }
  if (classificationSub2) {
    classificationSub2.addEventListener('change', () => {
      state.itemCard.classificationPickerCategorySub2 = classificationSub2.value || '';
    });
  }
  if (classificationTarget) {
    classificationTarget.addEventListener('change', () => {
      state.itemCard.classificationPickerTargetId = classificationTarget.value || '';
    });
  }
  if (classificationSearch) {
    classificationSearch.addEventListener('input', () => {
      state.itemCard.classificationPickerQuery = classificationSearch.value || '';
      renderItemCardClassificationPicker();
    });
  }
}

function getItemCardMovementTypeOptions() {
  return [
    { value: 'issue', label: window.i18n.t('issue_voucher') },
    { value: 'order', label: window.i18n.t('sales_invoice') },
    { value: 'transfer', label: window.i18n.t('transfer_voucher') },
    { value: 'cashierTransfer', label: window.i18n.t('transfer_voucher') },
    { value: 'stockReturn', label: window.i18n.t('stock_return_voucher') },
    { value: 'scrapReturn', label: window.i18n.t('scrap_return_voucher') },
    { value: 'supplierReturn', label: window.i18n.t('supplier_return_voucher') },
    { value: 'production', label: window.i18n.t('production_voucher') },
    { value: 'inventory', label: window.i18n.t('inventory_voucher') },
    { value: 'purchaseReceipt', label: window.i18n.t('receive_purchases') }
  ];
}

function getItemCardSelectedMovementTypes() {
  const all = getItemCardMovementTypeOptions().map((option) => option.value);
  const selected = Array.isArray(state.itemCard?.movementTypes) ? state.itemCard.movementTypes : all;
  return Array.from(new Set(selected.filter((type) => all.includes(type))));
}

function getFilteredItemCardMovements() {
  const movements = Array.isArray(state.itemCard?.movements) ? state.itemCard.movements : [];
  const selected = getItemCardSelectedMovementTypes();
  const selectedSet = new Set(selected);
  return movements.filter((move) => move.isOpening || selectedSet.has(move.docType));
}

function shouldShowItemCardProductionColumns() {
  const selected = getItemCardSelectedMovementTypes();
  return selected.length === 1 && selected[0] === 'production';
}

function shouldShowItemCardFinancialColumns() {
  return !shouldShowItemCardProductionColumns();
}

function formatItemCardMovementQty(move) {
  if (!move || move.qtyChange === null || move.qtyChange === undefined || move.qtyChange === '') return '-';
  const unitName = String(move.unitName || getUnitName(move.unitId) || '').trim();
  const qtyText = formatNumber(move.qtyChange);
  return unitName ? `${qtyText} ${unitName}` : qtyText;
}

function getItemCardMovementColumns() {
  const columns = [
    { key: 'date', label: window.i18n.t('date_time') },
    { key: 'itemCode', label: window.i18n.t('product_code') },
    { key: 'itemName', label: window.i18n.t('name') },
    { key: 'typeLabel', label: window.i18n.t('movement_type') },
    { key: 'docNumber', label: window.i18n.t('document_number') },
    { key: 'qtyChange', label: window.i18n.t('movement_qty') }
  ];
  if (shouldShowItemCardFinancialColumns()) {
    columns.push(
      { key: 'purchaseInvoiceNumber', label: window.i18n.t('purchase_invoice_number') },
      { key: 'invoiceValue', label: window.i18n.t('invoice_value') }
    );
  }
  if (shouldShowItemCardProductionColumns()) {
    columns.push(
      { key: 'storekeeperName', label: window.i18n.t('storekeeper_name') },
      { key: 'productionStaffName', label: window.i18n.t('production_staff_single') }
    );
  }
  columns.push(
    { key: 'price', label: window.i18n.t('price_unit') },
    { key: 'balance', label: window.i18n.t('stock_balance') }
  );
  return columns;
}

function renderItemCardMovementsHead() {
  const head = document.getElementById('itemCardMovementsHead');
  if (!head) return;
  head.innerHTML = `
    <tr>
      ${getItemCardMovementColumns().map((column) => `<th>${column.label}</th>`).join('')}
    </tr>
  `;
}

function renderItemCardMovementFilterOptions() {
  const summary = document.getElementById('itemCardMovementSummary');
  const optionsWrap = document.getElementById('itemCardMovementOptions');
  const searchInput = document.getElementById('itemCardMovementSearch');
  if (!summary || !optionsWrap) return;

  const allOptions = getItemCardMovementTypeOptions();
  const allTypes = allOptions.map((option) => option.value);
  const selected = getItemCardSelectedMovementTypes();
  const selectedSet = new Set(selected);
  const isAllSelected = selected.length === allTypes.length && allTypes.every((type) => selectedSet.has(type));
  const query = normalizeSearchValue(searchInput?.value || '');
  const filteredOptions = query
    ? allOptions.filter((option) => normalizeSearchValue(option.label).includes(query))
    : allOptions;

  if (isAllSelected) {
    summary.textContent = window.i18n.t('all_types');
  } else if (!selected.length) {
    summary.textContent = window.i18n.t('none_selected');
  } else {
    const selectedLabels = allOptions
      .filter((option) => selectedSet.has(option.value))
      .map((option) => option.label);
    summary.textContent = selectedLabels.slice(0, 2).join('، ') + (selectedLabels.length > 2 ? ` (+${selectedLabels.length - 2})` : '');
  }

  optionsWrap.innerHTML = '';
  const allLabel = document.createElement('label');
  allLabel.className = 'multi-select-option';
  allLabel.innerHTML = `
    <input type="checkbox" value="__all__" ${isAllSelected ? 'checked' : ''} />
    <span>${window.i18n.t('all')}</span>
  `;
  const allCheckbox = allLabel.querySelector('input[type="checkbox"]');
  allCheckbox.addEventListener('change', () => {
    state.itemCard.movementTypes = allCheckbox.checked ? [...allTypes] : [];
    renderItemCardMovementFilterOptions();
    renderItemCardMovements();
    const details = document.getElementById('itemCardMovementFilter');
    if (details) details.open = true;
  });
  optionsWrap.appendChild(allLabel);

  if (!filteredOptions.length) {
    const empty = document.createElement('div');
    empty.className = 'helper';
    empty.textContent = window.i18n.t('no_data');
    optionsWrap.appendChild(empty);
    return;
  }

  filteredOptions.forEach((option) => {
    const label = document.createElement('label');
    label.className = 'multi-select-option';
    label.innerHTML = `
      <input type="checkbox" value="${option.value}" ${selectedSet.has(option.value) ? 'checked' : ''} />
      <span>${option.label}</span>
    `;
    const checkbox = label.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      const nextSet = new Set(getItemCardSelectedMovementTypes());
      if (checkbox.checked) {
        nextSet.add(option.value);
      } else {
        nextSet.delete(option.value);
      }
      state.itemCard.movementTypes = Array.from(nextSet);
      renderItemCardMovementFilterOptions();
      renderItemCardMovements();
      const details = document.getElementById('itemCardMovementFilter');
      if (details) details.open = true;
    });
    optionsWrap.appendChild(label);
  });
}

function renderItemCardSection() {
  const defaultMovementTypes = getItemCardMovementTypeOptions().map((option) => option.value);
  if (!state.itemCard) {
    state.itemCard = {
      item: null,
      classificationType: '',
      classificationId: '',
      classificationLabel: '',
      classificationPickerType: '',
      classificationPickerCategoryMain: '',
      classificationPickerCategorySub: '',
      classificationPickerCategorySub2: '',
      classificationPickerTargetId: '',
      classificationPickerQuery: '',
      branchId: '',
      fromDate: '',
      toDate: '',
      movementTypes: [...defaultMovementTypes],
      movements: []
    };
  }
  if (!Array.isArray(state.itemCard.movementTypes)) state.itemCard.movementTypes = [...defaultMovementTypes];
  const nameInput = document.getElementById('itemCardItemName');
  const classificationInput = document.getElementById('itemCardClassificationName');
  const branchSelect = document.getElementById('itemCardBranch');
  const fromInput = document.getElementById('itemCardFrom');
  const toInput = document.getElementById('itemCardTo');

  if (branchSelect) {
    renderBranchOptions(branchSelect);
    if (!state.itemCard.branchId) {
      const mainBranchId = getMainBranchId();
      if (mainBranchId) {
        state.itemCard.branchId = mainBranchId;
      }
    }
    branchSelect.value = state.itemCard.branchId || '';
  }

  if (nameInput) {
    const entry = state.itemCard.item;
    if (entry) {
      const typeLabel = entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials');
      nameInput.value = `${getLocalizedName(entry.item)} (${typeLabel})`;
    } else {
      nameInput.value = '';
    }
  }
  if (classificationInput) {
    classificationInput.value = state.itemCard.classificationLabel || '';
  }

  if (fromInput) fromInput.value = state.itemCard.fromDate || '';
  if (toInput) toInput.value = state.itemCard.toDate || '';

  renderItemCardMovementFilterOptions();
  renderItemCardMovementsHead();
  renderItemCardMovements();
  renderItemCardClassificationPicker();
}

function openItemCardPicker() {
  const overlay = document.getElementById('itemCardPicker');
  if (!overlay) return;
  const searchInput = document.getElementById('itemCardSearchInput');
  if (searchInput) searchInput.value = '';
  renderItemCardSearchResults();
  overlay.classList.remove('hidden');
}

function closeItemCardPicker() {
  const overlay = document.getElementById('itemCardPicker');
  if (overlay) overlay.classList.add('hidden');
}

function getItemCardClassificationTypeOptions() {
  return [
    { value: 'products', label: window.i18n.t('products') },
    { value: 'stock_materials', label: window.i18n.t('stock_materials') },
    { value: 'suppliers', label: window.i18n.t('suppliers') },
    { value: 'storage_locations', label: window.i18n.t('storage_locations') }
  ];
}

function openItemCardClassificationPicker() {
  const overlay = document.getElementById('itemCardClassificationPicker');
  if (!overlay) return;
  const currentType = state.itemCard.classificationType || state.itemCard.classificationPickerType || 'products';
  state.itemCard.classificationPickerType = currentType;
  state.itemCard.classificationPickerTargetId = '';
  state.itemCard.classificationPickerCategoryMain = '';
  state.itemCard.classificationPickerCategorySub = '';
  state.itemCard.classificationPickerCategorySub2 = '';
  if (state.itemCard.classificationId && currentType === state.itemCard.classificationType) {
    if (currentType === 'products' || currentType === 'stock_materials') {
      const map = currentType === 'products'
        ? (state.cache.productCategories || {})
        : (state.cache.materialCategories || {});
      const path = buildCategoryPathById(state.itemCard.classificationId, map);
      state.itemCard.classificationPickerCategoryMain = path[0] || '';
      state.itemCard.classificationPickerCategorySub = path[1] || '';
      state.itemCard.classificationPickerCategorySub2 = path[2] || '';
    } else {
      state.itemCard.classificationPickerTargetId = state.itemCard.classificationId;
    }
  }
  state.itemCard.classificationPickerQuery = '';
  renderItemCardClassificationPicker();
  overlay.classList.remove('hidden');
}

function closeItemCardClassificationPicker() {
  const overlay = document.getElementById('itemCardClassificationPicker');
  if (overlay) overlay.classList.add('hidden');
}

function getCategoriesByParent(categories, parentId = null) {
  return Object.entries(categories || {})
    .filter(([, category]) => (category.parentId || null) === (parentId || null))
    .map(([id, category]) => ({ id, category }))
    .sort((a, b) => (getLocalizedName(a.category) || '').localeCompare(getLocalizedName(b.category) || ''));
}

function buildCategoryPathById(categoryId, categories) {
  const path = [];
  let current = categoryId || '';
  while (current && categories?.[current]) {
    path.unshift(current);
    current = categories[current].parentId || '';
  }
  return path;
}

function renderItemCardClassificationPicker() {
  const typeSelect = document.getElementById('itemCardClassificationType');
  const targetWrap = document.getElementById('itemCardClassificationTargetWrap');
  const targetLabel = targetWrap?.querySelector('label');
  const targetSelect = document.getElementById('itemCardClassificationTarget');
  const searchWrap = document.getElementById('itemCardClassificationSearchWrap');
  const searchInput = document.getElementById('itemCardClassificationSearch');
  const categoryWrap = document.getElementById('itemCardClassificationCategoryWrap');
  const mainSelect = document.getElementById('itemCardClassificationMain');
  const subSelect = document.getElementById('itemCardClassificationSub');
  const sub2Select = document.getElementById('itemCardClassificationSub2');
  if (!typeSelect) return;

  const options = getItemCardClassificationTypeOptions();
  if (!typeSelect.dataset.ready) {
    typeSelect.innerHTML = '';
    options.forEach((entry) => {
      const option = document.createElement('option');
      option.value = entry.value;
      option.textContent = entry.label;
      typeSelect.appendChild(option);
    });
    typeSelect.dataset.ready = '1';
  }
  const type = state.itemCard.classificationPickerType || state.itemCard.classificationType || options[0].value;
  state.itemCard.classificationPickerType = type;
  typeSelect.value = type;
  const isCategoryType = type === 'products' || type === 'stock_materials';

  if (categoryWrap) categoryWrap.style.display = isCategoryType ? 'grid' : 'none';
  if (targetWrap) targetWrap.style.display = isCategoryType ? 'none' : 'block';
  if (searchWrap) searchWrap.style.display = isCategoryType ? 'none' : 'block';

  if (isCategoryType) {
    const categories = type === 'products'
      ? (state.cache.productCategories || {})
      : (state.cache.materialCategories || {});
    const mainCategories = getCategoriesByParent(categories, null);
    const selectedMain = state.itemCard.classificationPickerCategoryMain || '';
    if (mainSelect) {
      mainSelect.innerHTML = `<option value="">${window.i18n.t('select')}</option>`;
      mainCategories.forEach((entry) => {
        const option = document.createElement('option');
        option.value = entry.id;
        option.textContent = getLocalizedName(entry.category) || '-';
        mainSelect.appendChild(option);
      });
      mainSelect.value = selectedMain;
    }

    const subCategories = selectedMain ? getCategoriesByParent(categories, selectedMain) : [];
    const selectedSub = state.itemCard.classificationPickerCategorySub || '';
    if (subSelect) {
      subSelect.innerHTML = `<option value="">${window.i18n.t('select')}</option>`;
      subCategories.forEach((entry) => {
        const option = document.createElement('option');
        option.value = entry.id;
        option.textContent = getLocalizedName(entry.category) || '-';
        subSelect.appendChild(option);
      });
      subSelect.value = selectedSub;
      subSelect.disabled = !selectedMain;
    }

    const sub2Categories = selectedSub ? getCategoriesByParent(categories, selectedSub) : [];
    const selectedSub2 = state.itemCard.classificationPickerCategorySub2 || '';
    if (sub2Select) {
      sub2Select.innerHTML = `<option value="">${window.i18n.t('select')}</option>`;
      sub2Categories.forEach((entry) => {
        const option = document.createElement('option');
        option.value = entry.id;
        option.textContent = getLocalizedName(entry.category) || '-';
        sub2Select.appendChild(option);
      });
      sub2Select.value = selectedSub2;
      sub2Select.disabled = !selectedSub;
    }
    return;
  }

  if (searchInput) searchInput.value = state.itemCard.classificationPickerQuery || '';
  if (!targetSelect) return;
  targetSelect.innerHTML = `<option value="">${window.i18n.t('select')}</option>`;
  const query = normalizeSearchValue(state.itemCard.classificationPickerQuery || '');
  if (type === 'suppliers') {
    if (targetLabel) targetLabel.textContent = window.i18n.t('select_supplier');
    const suppliers = Object.entries(state.cache.suppliers || {})
      .map(([id, supplier]) => ({ id, supplier }))
      .filter(({ supplier }) => {
        if (!query) return true;
        const text = normalizeSearchValue(`${supplier.nameAr || ''} ${supplier.nameEn || ''} ${supplier.phone || ''}`);
        return text.includes(query);
      })
      .sort((a, b) => (getLocalizedName(a.supplier) || '').localeCompare(getLocalizedName(b.supplier) || ''));
    suppliers.forEach(({ id, supplier }) => {
      const option = document.createElement('option');
      option.value = id;
      const phone = String(supplier.phone || '').trim();
      option.textContent = phone
        ? `${getLocalizedName(supplier)} (${phone})`
        : getLocalizedName(supplier);
      targetSelect.appendChild(option);
    });
  } else {
    if (targetLabel) targetLabel.textContent = window.i18n.t('storage_location');
    const locations = Object.entries(state.cache.storageLocations || {})
      .map(([id, location]) => ({ id, location }))
      .filter(({ location }) => {
        if (!query) return true;
        const text = normalizeSearchValue(`${location.nameAr || ''} ${location.nameEn || ''}`);
        return text.includes(query);
      })
      .sort((a, b) => (getLocalizedName(a.location) || '').localeCompare(getLocalizedName(b.location) || ''));
    locations.forEach(({ id, location }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(location) || '-';
      targetSelect.appendChild(option);
    });
  }
  targetSelect.value = state.itemCard.classificationPickerTargetId || '';
}

function getItemCardClassificationEntries() {
  const type = state.itemCard.classificationType || '';
  const id = state.itemCard.classificationId || '';
  if (!type || !id) return [];
  if (type === 'suppliers') {
    return getSupplierItems(id);
  }
  if (type === 'storage_locations') {
    const products = Object.entries(state.cache.products || {})
      .filter(([, item]) => (item.storageLocationId || '') === id)
      .map(([itemId, item]) => ({ id: itemId, type: 'product', item }));
    const materials = Object.entries(state.cache.stockMaterials || {})
      .filter(([, item]) => (item.storageLocationId || '') === id)
      .map(([itemId, item]) => ({ id: itemId, type: 'material', item }));
    return [...products, ...materials];
  }
  if (type === 'products') {
    const categories = state.cache.productCategories || {};
    const allowed = getDescendantCategoryIds(id, categories);
    return Object.entries(state.cache.products || {})
      .filter(([, item]) => allowed.has(item.categoryId))
      .map(([itemId, item]) => ({ id: itemId, type: 'product', item }));
  }
  if (type === 'stock_materials') {
    const categories = state.cache.materialCategories || {};
    const allowed = getDescendantCategoryIds(id, categories);
    return Object.entries(state.cache.stockMaterials || {})
      .filter(([, item]) => allowed.has(item.categoryId))
      .map(([itemId, item]) => ({ id: itemId, type: 'material', item }));
  }
  return [];
}

function getItemCardTargetEntries() {
  if (state.itemCard?.item) return [state.itemCard.item];
  return getItemCardClassificationEntries();
}

function applyItemCardClassificationSelection() {
  const errorEl = document.getElementById('itemCardError');
  if (errorEl) errorEl.textContent = '';
  const type = state.itemCard.classificationPickerType || '';
  if (!type) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  let id = '';
  let label = '';
  if (type === 'products' || type === 'stock_materials') {
    id = state.itemCard.classificationPickerCategorySub2
      || state.itemCard.classificationPickerCategorySub
      || state.itemCard.classificationPickerCategoryMain
      || '';
    if (!id) {
      if (errorEl) errorEl.textContent = window.i18n.t('select_category');
      return;
    }
    const categoryMap = type === 'products' ? state.cache.productCategories : state.cache.materialCategories;
    const categoryName = getLocalizedName(categoryMap?.[id]) || '-';
    const typeLabel = type === 'products' ? window.i18n.t('products') : window.i18n.t('stock_materials');
    label = `${typeLabel}: ${categoryName}`;
  } else if (type === 'suppliers') {
    id = state.itemCard.classificationPickerTargetId || '';
    if (!id) {
      if (errorEl) errorEl.textContent = window.i18n.t('select_supplier');
      return;
    }
    const supplier = state.cache.suppliers?.[id];
    const phone = String(supplier?.phone || '').trim();
    label = phone
      ? `${window.i18n.t('supplier')}: ${getLocalizedName(supplier)} (${phone})`
      : `${window.i18n.t('supplier')}: ${getLocalizedName(supplier)}`;
  } else {
    id = state.itemCard.classificationPickerTargetId || '';
    if (!id) {
      if (errorEl) errorEl.textContent = window.i18n.t('storage_location');
      return;
    }
    const location = state.cache.storageLocations?.[id];
    label = `${window.i18n.t('storage_location')}: ${getLocalizedName(location)}`;
  }

  state.itemCard.item = null;
  state.itemCard.classificationType = type;
  state.itemCard.classificationId = id;
  state.itemCard.classificationLabel = label;
  state.itemCard.movements = [];
  closeItemCardClassificationPicker();
  renderItemCardSection();
}

function getItemCardEntries() {
  return getAllItems();
}

function handleItemCardBarcodeScan() {
  const searchInput = document.getElementById('itemCardSearchInput');
  if (!searchInput) return;
  const query = searchInput.value.trim();
  if (!query) return;
  const entries = getItemCardEntries();
  const match = findExactItemMatch(entries, query);
  if (match) {
    selectItemCardEntry(match);
    searchInput.value = '';
    renderItemCardSearchResults();
  }
}

function renderItemCardSearchResults() {
  const searchInput = document.getElementById('itemCardSearchInput');
  const results = document.getElementById('itemCardSearchResults');
  if (!searchInput || !results) return;
  const query = searchInput.value.trim();
  if (!query) {
    results.innerHTML = `<p class="helper">${window.i18n.t('search_to_show')}</p>`;
    return;
  }
  const entries = filterItemEntries(getItemCardEntries(), query);
  const exact = findExactItemMatch(entries, query);
  if (exact) {
    selectItemCardEntry(exact);
    searchInput.value = '';
    results.innerHTML = '';
    return;
  }
  renderItemSearchResults(results, entries, (entry) => selectItemCardEntry(entry));
}

function selectItemCardEntry(entry) {
  state.itemCard.item = entry;
  state.itemCard.classificationType = '';
  state.itemCard.classificationId = '';
  state.itemCard.classificationLabel = '';
  renderItemCardSection();
  closeItemCardPicker();
}

function handleItemCardSearch() {
  const errorEl = document.getElementById('itemCardError');
  if (errorEl) errorEl.textContent = '';
  const entries = getItemCardTargetEntries();
  if (!entries.length) {
    if (errorEl) {
      errorEl.textContent = (state.itemCard?.classificationType && state.itemCard?.classificationId)
        ? window.i18n.t('no_data')
        : window.i18n.t('select_item_prompt');
    }
    return;
  }
  if (!state.itemCard.branchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('select_branch_prompt');
    return;
  }
  if (!state.itemCard.fromDate || !state.itemCard.toDate) {
    if (errorEl) errorEl.textContent = window.i18n.t('select_period_prompt');
    return;
  }
  const movements = entries
    .flatMap((entry) => buildItemCardMovements(
      entry,
      state.itemCard.branchId,
      state.itemCard.fromDate,
      state.itemCard.toDate
    ));
  state.itemCard.movements = movements;
  renderItemCardMovements();
}

function buildItemCardMovements(entry, branchId, fromDate, toDate) {
  if (!entry || !branchId) return [];
  const itemId = entry.id;
  const itemType = entry.type;
  const itemName = getLocalizedName(entry.item);
  const itemCode = entry.item?.code || '-';
  const mainBranchId = getMainBranchId();
  const moves = [];
  const itemData = entry.item || getItemDataByType(itemType, itemId);
  const defaultPrice = itemData
    ? (itemType === 'product' ? Number(itemData.price || 0) : Number(itemData.cost || 0))
    : null;
  const orders = state.cache.orders || {};
  const ordersByNumber = {};
  Object.entries(orders).forEach(([id, order]) => {
    const key = normalizeDigits(String(order.orderNumber ?? order.invoiceNumber ?? id)).trim();
    if (!key) return;
    if (!ordersByNumber[key]) ordersByNumber[key] = { id, ...order };
  });

  const addMove = (record, docType, qtyChange, docNumber, typeLabel, date, price, affectsBalance = true, extra = {}) => {
    const unitId = extra.unitId === undefined ? (itemData?.unitId || null) : extra.unitId;
    moves.push({
      record,
      docType,
      itemType,
      itemName,
      itemCode,
      qtyChange: Number(qtyChange || 0),
      docNumber: docNumber || '-',
      typeLabel: typeLabel || '-',
      date: Number(date || 0),
      price: price ?? defaultPrice,
      affectsBalance,
      unitId,
      unitName: getUnitName(unitId) || '',
      purchaseInvoiceNumber: extra.purchaseInvoiceNumber || '-',
      invoiceValue: extra.invoiceValue === undefined || extra.invoiceValue === null || extra.invoiceValue === ''
        ? null
        : Number(extra.invoiceValue),
      storekeeperName: extra.storekeeperName || '-',
      productionStaffName: extra.productionStaffName || '-',
      balance: null
    });
  };

  const isSameItem = (item) => {
    const currentType = normalizeItemType(item);
    const currentId = item?.itemId || item?.id;
    return currentType === itemType && currentId === itemId;
  };

  const issues = state.cache.stockIssue || {};
  Object.entries(issues).forEach(([id, issue]) => {
    const issueBranch = issue.branchId || mainBranchId;
    if (issueBranch !== branchId) return;
    normalizeItems(issue.items).forEach((item) => {
      if (!isSameItem(item)) return;
      const record = { id, ...issue };
      const typeLabel = issue.issueType === 'production'
        ? window.i18n.t('issue_production')
        : window.i18n.t('issue_order');
      const invoiceNumber = issue.issueType === 'order' ? issue.invoiceNumber || issue.issueNumber : issue.issueNumber;
      const orderKey = issue.issueType === 'order' ? normalizeDigits(String(issue.invoiceNumber || '')).trim() : '';
      const order = orderKey ? ordersByNumber[orderKey] : null;
      let price = null;
      if (order) {
        const orderItem = normalizeItems(order.items).find((orderLine) => {
          const lineId = orderLine.productId || orderLine.itemId || orderLine.id;
          return itemType === 'product' && String(lineId) === String(itemId);
        });
        price = orderItem ? Number(orderItem.price || 0) : null;
      }
      addMove(
        record,
        'issue',
        -Number(item.qty || 0),
        invoiceNumber,
        typeLabel,
        issue.createdAt,
        price,
        issue.issueType === 'production'
      );
    });
  });

  Object.entries(orders).forEach(([id, order]) => {
    if (order.branchId !== branchId) return;
    const orderNumber = order.orderNumber || order.invoiceNumber || id;
    const invoiceKey = normalizeDigits(String(orderNumber)).trim();
    normalizeItems(order.items).forEach((item) => {
      const lineId = item.productId || item.itemId || item.id;
      if (itemType !== 'product' || String(lineId) !== String(itemId)) return;
      const record = { id, ...order };
      addMove(record, 'order', -Number(item.qty || 0), orderNumber, window.i18n.t('sales_invoice'), order.createdAt || 0, item.price);
    });
  });

  const transfers = state.cache.transfers || {};
  Object.entries(transfers).forEach(([id, transfer]) => {
    const isFrom = transfer.fromBranchId === branchId;
    const isTo = transfer.toBranchId === branchId;
    if (!isFrom && !isTo) return;
    const direction = isTo ? 1 : -1;
    normalizeItems(transfer.items).forEach((item) => {
      if (!isSameItem(item)) return;
      const record = { id, ...transfer };
      addMove(record, 'transfer', direction * Number(item.qty || 0), transfer.transferNumber, window.i18n.t('transfer_action'), transfer.createdAt);
    });
  });

  const cashierTransfers = state.cache.cashierTransfers || {};
  Object.entries(cashierTransfers).forEach(([id, transfer]) => {
    const isFrom = transfer.fromBranchId === branchId;
    const isTo = transfer.toBranchId === branchId;
    if (!isFrom && !isTo) return;
    normalizeItems(transfer.items).forEach((item) => {
      if (!isSameItem(item)) return;
      const record = { id, ...transfer };
      if (isFrom) {
        const netQty = ['received', 'partial_received'].includes(transfer.status)
          ? Number(item.receivedQty ?? item.qty ?? 0)
          : Number(item.qty || 0);
        addMove(record, 'cashierTransfer', -Number(netQty || 0), transfer.transferNumber, window.i18n.t('transfer_action'), transfer.createdAt);
      }
      if (isTo && ['received', 'partial_received'].includes(transfer.status)) {
        const receivedQty = Number(item.receivedQty ?? item.qty ?? 0);
        addMove(record, 'cashierTransfer', receivedQty, transfer.transferNumber, window.i18n.t('receive_action'), transfer.receivedAt || transfer.createdAt);
      }
    });
  });

  const stockReturns = state.cache.stockReturn || {};
  Object.entries(stockReturns).forEach(([id, ret]) => {
    const isFrom = ret.fromBranchId === branchId;
    const isTo = ret.toBranchId === branchId;
    if (!isFrom && !isTo) return;
    const direction = isTo ? 1 : -1;
    normalizeItems(ret.items).forEach((item) => {
      if (!isSameItem(item)) return;
      const record = { id, ...ret };
      addMove(record, 'stockReturn', direction * Number(item.qty || 0), ret.stockReturnNumber, window.i18n.t('stock_return_voucher'), ret.createdAt);
    });
  });

  const scrapReturns = state.cache.scrapReturn || {};
  Object.entries(scrapReturns).forEach(([id, ret]) => {
    if (ret.branchId !== branchId) return;
    normalizeItems(ret.items).forEach((item) => {
      if (!isSameItem(item)) return;
      const record = { id, ...ret };
      addMove(record, 'scrapReturn', -Number(item.qty || 0), ret.scrapReturnNumber, window.i18n.t('scrap_return_voucher'), ret.createdAt);
    });
  });

  const supplierReturns = state.cache.supplierReturns || {};
  Object.entries(supplierReturns).forEach(([id, ret]) => {
    if (branchId !== mainBranchId) return;
    normalizeItems(ret.items).forEach((item) => {
      if (!isSameItem(item)) return;
      const record = { id, ...ret };
      addMove(record, 'supplierReturn', -Number(item.qty || 0), ret.returnNumber, window.i18n.t('supplier_return'), ret.createdAt);
    });
  });

  const productions = state.cache.production || {};
  Object.entries(productions).forEach(([id, prod]) => {
    if (prod.branchId !== branchId) return;
    if (prod.itemId !== itemId || normalizeItemType(prod) !== itemType) return;
    const record = { id, ...prod };
    const productionStaffName = prod.productionStaffName
      || getStaffLabel(state.cache.productionStaff?.[prod.productionStaffId], '-')
      || '-';
    addMove(
      record,
      'production',
      Number(prod.qty || 0),
      prod.productionNumber,
      window.i18n.t('production_voucher'),
      prod.createdAt,
      null,
      true,
      {
        unitId: prod.unitId || itemData?.unitId || null,
        storekeeperName: prod.storekeeperName || '-',
        productionStaffName
      }
    );
  });

  const inventories = state.cache.inventoryCount || {};
  Object.entries(inventories).forEach(([id, inv]) => {
    if (inv.branchId !== branchId) return;
    normalizeItems(inv.items).forEach((item) => {
      if (!isSameItem(item)) return;
      const previousQty = item.previousQty;
      const qtyChange = previousQty === undefined || previousQty === null
        ? 0
        : Number(item.qty || 0) - Number(previousQty || 0);
      const record = { id, ...inv };
      addMove(record, 'inventory', qtyChange, inv.countNumber, window.i18n.t('inventory_count'), inv.createdAt);
    });
  });

  const purchases = state.cache.purchases || {};
  Object.entries(purchases).forEach(([id, purchase]) => {
    if (branchId !== mainBranchId) return;
    const purchaseNumber = purchase.purchaseNumber || id;
    normalizeItems(purchase.items).forEach((item) => {
      if (!isSameItem(item)) return;
      const record = { id, ...purchase };
      const unitPrice = Number(item.unitPrice ?? item.cost ?? item.price ?? 0);
      const qty = Number(item.qty || 0);
      addMove(
        record,
        'purchaseRequest',
        qty,
        purchaseNumber,
        window.i18n.t('purchase_request'),
        purchase.createdAt,
        unitPrice || null,
        false,
        {
          purchaseInvoiceNumber: purchase.purchaseInvoiceNumber || '-',
          invoiceValue: qty * unitPrice
        }
      );
    });
  });

  const receipts = state.cache.purchaseReceipts || {};
  Object.entries(receipts).forEach(([id, receipt]) => {
    if (branchId !== mainBranchId) return;
    const purchase = state.cache.purchases?.[receipt.purchaseId];
    const purchaseNumber = purchase?.purchaseNumber || receipt.purchaseNumber || receipt.purchaseId || id;
    normalizeItems(receipt.items).forEach((item) => {
      if (!isSameItem(item)) return;
      const record = { id, ...receipt, purchaseNumber, receiptNumber: receipt.receiptNumber || purchaseNumber };
      const price = item.cost ?? item.price ?? null;
      const qty = Number(item.qty || 0);
      const purchaseInvoiceNumber = receipt.purchaseInvoiceNumber || purchase?.purchaseInvoiceNumber || '-';
      addMove(
        record,
        'purchaseReceipt',
        qty,
        purchaseNumber,
        window.i18n.t('receive_purchases'),
        receipt.createdAt,
        price,
        true,
        {
          purchaseInvoiceNumber,
          invoiceValue: qty * Number(price || 0)
        }
      );
    });
  });

  let running = itemData ? getItemStock(itemData, branchId) : 0;
  moves.sort((a, b) => (b.date || 0) - (a.date || 0));
  moves.forEach((move) => {
    move.balance = running;
    if (move.affectsBalance !== false) {
      running -= move.qtyChange;
    }
  });

  const start = fromDate ? new Date(fromDate) : null;
  const end = toDate ? new Date(toDate) : null;
  if (start) start.setHours(0, 0, 0, 0);
  if (end) end.setHours(23, 59, 59, 999);
  const startTime = start ? start.getTime() : null;
  const endTime = end ? end.getTime() : null;

  let openingBalance = itemData ? getItemStock(itemData, branchId) : 0;
  if (itemType === 'product') {
    const productMainBranchId = itemData?.mainBranchId || mainBranchId;
    const isMainBranch = !branchId || branchId === productMainBranchId;
    openingBalance = isMainBranch ? Number(itemData?.openingQty || 0) : 0;
  } else if (startTime !== null) {
    moves.forEach((move) => {
      if (move.date >= startTime && move.affectsBalance !== false) {
        openingBalance -= Number(move.qtyChange || 0);
      }
    });
  }

  const filtered = moves.filter((move) => {
    if (startTime === null || endTime === null) return true;
    return move.date >= startTime && move.date <= endTime;
  });
  const chronological = filtered.reverse();
  const openingMove = {
    record: null,
    docType: 'opening',
    itemType,
    itemName,
    itemCode,
    qtyChange: null,
    docNumber: '-',
    typeLabel: window.i18n.t('opening_qty'),
    date: itemType === 'product'
      ? Number(itemData?.createdAt || 0) || (startTime || (chronological[0]?.date || Date.now()))
      : (startTime || (chronological[0]?.date || Date.now())),
    price: null,
    affectsBalance: false,
    unitId: itemData?.unitId || null,
    unitName: getUnitName(itemData?.unitId || null) || '',
    purchaseInvoiceNumber: '-',
    invoiceValue: null,
    storekeeperName: '-',
    productionStaffName: '-',
    balance: openingBalance,
    isOpening: true
  };
  return [openingMove, ...chronological];
}

function renderItemCardMovements() {
  const table = document.getElementById('itemCardMovementsTable');
  const summaryEl = document.getElementById('itemCardSummary');
  if (!table) return;
  renderItemCardMovementsHead();
  const movements = getFilteredItemCardMovements();
  const invoiceTotal = movements.reduce((sum, move) => sum + Number(move.invoiceValue || 0), 0);
  if (summaryEl) {
    summaryEl.textContent = shouldShowItemCardFinancialColumns()
      ? `${window.i18n.t('invoice_value')}: ${formatMoney(invoiceTotal)}`
      : '';
  }
  const columns = getItemCardMovementColumns();
  const showProductionColumns = shouldShowItemCardProductionColumns();
  const showFinancialColumns = shouldShowItemCardFinancialColumns();
  table.innerHTML = '';
  if (!movements.length) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="${columns.length}">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  movements.forEach((move, index) => {
    const row = document.createElement('tr');
    const docButton = move.docNumber && move.docNumber !== '-'
      ? `<button class="btn ghost small" data-action="open" data-index="${index}">${move.docNumber}</button>`
      : '-';
    row.innerHTML = `
      <td>${formatDate(move.date)}</td>
      <td>${move.itemCode || '-'}</td>
      <td>${move.itemName || '-'}</td>
      <td>${move.typeLabel || '-'}</td>
      <td>${docButton}</td>
      <td>${formatItemCardMovementQty(move)}</td>
      ${showFinancialColumns ? `<td>${move.purchaseInvoiceNumber || '-'}</td><td>${formatMoney(move.invoiceValue)}</td>` : ''}
      ${showProductionColumns ? `<td>${move.storekeeperName || '-'}</td><td>${move.productionStaffName || '-'}</td>` : ''}
      <td>${formatMoney(move.price)}</td>
      <td>${formatNumber(move.balance)}</td>
    `;
    row.addEventListener('click', () => openItemCardDocument(move));
    const openBtn = row.querySelector('[data-action="open"]');
    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openItemCardDocument(move);
      });
    }
    table.appendChild(row);
  });
}

function getItemCardReportContext() {
  const entry = state.itemCard?.item;
  const hasClassification = Boolean(state.itemCard?.classificationType && state.itemCard?.classificationId);
  if (!entry && !hasClassification) return null;
  const typeLabel = entry
    ? (entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials'))
    : window.i18n.t('select_category');
  const itemName = entry ? getLocalizedName(entry.item) : (state.itemCard?.classificationLabel || '-');
  const branchId = state.itemCard?.branchId;
  const branch = state.cache.branches?.[branchId];
  const branchName = getLocalizedName(branch) || branch?.name || branchId || '-';
  const fromDate = state.itemCard?.fromDate || '-';
  const toDate = state.itemCard?.toDate || '-';
  const period = `${fromDate} - ${toDate}`;
  return { itemName, typeLabel, branchName, period };
}

function exportItemCardMovements() {
  const errorEl = document.getElementById('itemCardError');
  if (errorEl) errorEl.textContent = '';
  const entries = getItemCardTargetEntries();
  if (!entries.length) {
    if (errorEl) errorEl.textContent = window.i18n.t('select_item_prompt');
    return;
  }
  if (!state.itemCard?.branchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('select_branch_prompt');
    return;
  }
  if (!state.itemCard?.fromDate || !state.itemCard?.toDate) {
    if (errorEl) errorEl.textContent = window.i18n.t('select_period_prompt');
    return;
  }
  const movements = getFilteredItemCardMovements();
  if (!movements.length) {
    if (errorEl) errorEl.textContent = window.i18n.t('no_data');
    return;
  }
  const rows = movements.map((move) => {
    const row = {
      [window.i18n.t('date_time')]: formatDate(move.date),
      [window.i18n.t('product_code')]: move.itemCode || '-',
      [window.i18n.t('name')]: move.itemName || '-',
      [window.i18n.t('movement_type')]: move.typeLabel || '-',
      [window.i18n.t('document_number')]: move.docNumber || '-',
      [window.i18n.t('movement_qty')]: formatItemCardMovementQty(move)
    };
    if (shouldShowItemCardFinancialColumns()) {
      row[window.i18n.t('purchase_invoice_number')] = move.purchaseInvoiceNumber || '-';
      row[window.i18n.t('invoice_value')] = formatMoney(move.invoiceValue);
    }
    if (shouldShowItemCardProductionColumns()) {
      row[window.i18n.t('storekeeper_name')] = move.storekeeperName || '-';
      row[window.i18n.t('production_staff_single')] = move.productionStaffName || '-';
    }
    row[window.i18n.t('price_unit')] = formatMoney(move.price);
    row[window.i18n.t('stock_balance')] = formatNumber(move.balance);
    return row;
  });
  exportToExcel(rows, 'item-card-report.xlsx');
}

function printItemCardMovements() {
  const errorEl = document.getElementById('itemCardError');
  if (errorEl) errorEl.textContent = '';
  const entries = getItemCardTargetEntries();
  if (!entries.length) {
    if (errorEl) errorEl.textContent = window.i18n.t('select_item_prompt');
    return;
  }
  if (!state.itemCard?.branchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('select_branch_prompt');
    return;
  }
  if (!state.itemCard?.fromDate || !state.itemCard?.toDate) {
    if (errorEl) errorEl.textContent = window.i18n.t('select_period_prompt');
    return;
  }
  const movements = getFilteredItemCardMovements();
  if (!movements.length) {
    if (errorEl) errorEl.textContent = window.i18n.t('no_data');
    return;
  }

  const context = getItemCardReportContext();
  const targetLabel = context
    ? (context.typeLabel === window.i18n.t('select_category')
      ? (context.itemName || '-')
      : `${context.itemName || '-'} (${context.typeLabel || '-'})`)
    : '-';
  const lang = window.i18n.getLanguage();
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const showProductionColumns = shouldShowItemCardProductionColumns();
  const showFinancialColumns = shouldShowItemCardFinancialColumns();
  const headersHtml = getItemCardMovementColumns().map((column) => `<th>${column.label}</th>`).join('');
  const rowsHtml = movements.map((move) => `
    <tr>
      <td>${formatDate(move.date)}</td>
      <td>${move.itemCode || '-'}</td>
      <td>${move.itemName || '-'}</td>
      <td>${move.typeLabel || '-'}</td>
      <td>${move.docNumber || '-'}</td>
      <td>${formatItemCardMovementQty(move)}</td>
      ${showFinancialColumns ? `<td>${move.purchaseInvoiceNumber || '-'}</td><td>${formatMoney(move.invoiceValue)}</td>` : ''}
      ${showProductionColumns ? `<td>${move.storekeeperName || '-'}</td><td>${move.productionStaffName || '-'}</td>` : ''}
      <td>${formatMoney(move.price)}</td>
      <td>${formatNumber(move.balance)}</td>
    </tr>
  `).join('');

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${dir}">
      <head>
        <title>${window.i18n.t('item_cards')}</title>
        <style>
          body { font-family: 'Cairo', sans-serif; direction: ${dir}; padding: 24px; color: #1e1b16; }
          h2 { margin: 0 0 12px; }
          .meta { margin-bottom: 16px; }
          .meta p { margin: 4px 0; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border: 1px solid #ddd; padding: 6px; text-align: start; font-size: 12px; }
          thead th { background: #f7f5f2; }
        </style>
      </head>
      <body>
        <h2>${window.i18n.t('item_cards')}</h2>
        <div class="meta">
          <p><strong>${window.i18n.t('selected_item')}:</strong> ${targetLabel}</p>
          <p><strong>${window.i18n.t('branch')}:</strong> ${context?.branchName || '-'}</p>
          <p><strong>${window.i18n.t('filter_from')}:</strong> ${state.itemCard?.fromDate || '-'} &nbsp;&nbsp; <strong>${window.i18n.t('filter_to')}:</strong> ${state.itemCard?.toDate || '-'}</p>
        </div>
        <table>
          <thead>
            <tr>${headersHtml}</tr>
          </thead>
          <tbody>
            ${rowsHtml || `<tr><td colspan="${getItemCardMovementColumns().length}">${window.i18n.t('no_data')}</td></tr>`}
          </tbody>
        </table>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

function openItemCardDocument(move) {
  if (!move?.record) return;
  const record = move.record;
  switch (move.docType) {
    case 'issue':
      printIssueReport(record);
      break;
    case 'transfer':
      printTransferReport(record);
      break;
    case 'cashierTransfer':
      printTransferReport(record);
      break;
    case 'stockReturn':
      printStockReturnReport(record);
      break;
    case 'scrapReturn':
      printScrapReturnReport(record);
      break;
    case 'supplierReturn':
      printSupplierReturnReport(record);
      break;
    case 'inventory':
      printInventoryReport(record);
      break;
    case 'production':
      printProductionReport(record);
      break;
    case 'purchaseRequest':
      printPurchaseRequestReport(record);
      break;
    case 'purchaseReceipt':
      printPurchaseReceiptReport(record);
      break;
    case 'order':
      openOrderDetail(record);
      break;
    default:
      break;
  }
}

function setupPendingStockMovesSection() {
  const section = document.getElementById('section-pendingStockMoves');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <h2>${window.i18n.t('pending_stock_moves')}</h2>
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('name')}</th>
            <th>${window.i18n.t('note')}</th>
            <th>${window.i18n.t('date')}</th>
            <th>${window.i18n.t('status')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('latest_cost')}</th>
            <th>${window.i18n.t('invoice_value')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="pendingMovesTable"></tbody>
      </table>
    </div>
  `;

  renderPendingStockMoves();
}

function renderPendingStockMoves() {
  const table = document.getElementById('pendingMovesTable');
  if (!table) return;
  const moves = state.cache.pendingStockMoves || {};
  const entries = Object.entries(moves)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="8">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }

  entries.forEach((move) => {
    const status = move.status || 'pending';
    const statusLabel = status === 'approved'
      ? window.i18n.t('approved')
      : status === 'rejected'
        ? window.i18n.t('rejected')
        : window.i18n.t('pending');
    const linkedPurchase = move.type === 'purchase' ? state.cache.purchases?.[move.purchaseId] : null;
    const storekeeperName = linkedPurchase?.storekeeperName || '-';
    const expectedTotal = linkedPurchase ? formatMoney(calculatePurchaseExpectedTotal(linkedPurchase)) : '-';
    let latestPriceText = '-';
    if (linkedPurchase) {
      const latestLines = normalizeItems(linkedPurchase.items)
        .slice(0, 3)
        .map((item) => {
          const itemType = normalizeItemType(item);
          const itemId = item.itemId || item.id;
          const latest = getLatestPurchaseUnitPrice(itemType, itemId);
          const latestPrice = latest ? formatMoney(latest.price) : '-';
          const itemName = formatItemNameWithUnit(item.name || '-', item.unitId);
          return `${itemName}: ${latestPrice}`;
        });
      if (latestLines.length) {
        const extra = normalizeItems(linkedPurchase.items).length - latestLines.length;
        latestPriceText = `${latestLines.join('<br>')}${extra > 0 ? `<br><span class="helper">+${extra}</span>` : ''}`;
      }
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${move.name || '-'}</td>
      <td>${move.note || '-'}</td>
      <td>${formatDate(move.createdAt)}</td>
      <td>${statusLabel}</td>
      <td>${storekeeperName}</td>
      <td style="min-width: 200px;">${latestPriceText}</td>
      <td>${expectedTotal}</td>
      <td></td>
    `;

    const actionsCell = row.children[7];
    if (linkedPurchase) {
      const viewBtn = document.createElement('button');
      viewBtn.className = 'btn ghost small';
      viewBtn.textContent = window.i18n.t('view');
      viewBtn.addEventListener('click', () => openPurchaseDetailsModal({ id: move.purchaseId, ...linkedPurchase }));
      const printBtn = document.createElement('button');
      printBtn.className = 'btn ghost small';
      printBtn.textContent = window.i18n.t('print_report');
      printBtn.addEventListener('click', () => printPurchaseRequestReport({ id: move.purchaseId, ...linkedPurchase }));
      actionsCell.appendChild(viewBtn);
      actionsCell.appendChild(printBtn);
    }
    if (status === 'pending') {
      const approveBtn = document.createElement('button');
      approveBtn.className = 'btn ghost small';
      approveBtn.textContent = window.i18n.t('approve');
      approveBtn.addEventListener('click', () => handlePendingStockMoveDecision(move, 'approved'));
      const rejectBtn = document.createElement('button');
      rejectBtn.className = 'btn danger small';
      rejectBtn.textContent = window.i18n.t('reject');
      rejectBtn.addEventListener('click', () => handlePendingStockMoveDecision(move, 'rejected'));
      actionsCell.appendChild(approveBtn);
      actionsCell.appendChild(rejectBtn);
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn danger small';
    deleteBtn.textContent = window.i18n.t('delete');
    deleteBtn.addEventListener('click', () => deletePendingStockMove(move));
    actionsCell.appendChild(deleteBtn);

    if (!actionsCell.children.length) {
      actionsCell.textContent = '-';
    }

    table.appendChild(row);
  });
}

function deletePendingStockMove(move) {
  if (!move?.id) return;
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const updates = {};
  updates[`pendingStockMoves/${move.id}`] = null;
  if (move.type === 'purchase' && move.purchaseId) {
    updates[`purchases/${move.purchaseId}/pendingMoveId`] = null;
  }
  db.ref().update(updates);
}

function handlePendingStockMoveDecision(move, status) {
  if (!move?.id) return;
  db.ref(`pendingStockMoves/${move.id}`).update({ status, decidedAt: serverTime }).then(() => {
    if (move.type === 'purchase' && move.purchaseId) {
      const purchaseStatus = status === 'approved' ? 'approved' : 'rejected';
      db.ref(`purchases/${move.purchaseId}`).update({ status: purchaseStatus, decidedAt: serverTime });
    }
  });
}

function ensureManagerDiscountEntry() {
  if (!Object.prototype.hasOwnProperty.call(state.cache, 'discounts')) return;
  const managerEntry = state.cache.discounts?.[MANAGER_DISCOUNT_ID];
  if (managerEntry) return;
  db.ref(`discounts/${MANAGER_DISCOUNT_ID}`).set({
    type: 'manager',
    label: 'manager_discount',
    active: true,
    locked: true,
    createdAt: serverTime
  }).catch(() => {});
}

function setupDiscountsSection() {
  ensureManagerDiscountEntry();
  state.discountReport.view = state.discountReport.view || 'list';
  renderDiscounts();
}

function setupProductsSection() {
  const section = document.getElementById('section-products');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('products')}</h2>
        <div class="row">
          <button id="newProductBtn" class="btn primary">${window.i18n.t('new_product')}</button>
          <button id="downloadProductsBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="bulkImportBtn" class="btn ghost">${window.i18n.t('bulk_import')}</button>
          <button id="downloadBarcodesBtn" class="btn ghost">${window.i18n.t('download_barcodes')}</button>
          <input id="bulkImportInput" type="file" accept=".xlsx,.xls" class="hidden" />
        </div>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <select id="productBranchFilter" class="input" style="max-width: 180px;"></select>
        <select id="productCategoryFilter" class="input" style="max-width: 180px;"></select>
        <select id="productStorageFilter" class="input" style="max-width: 180px;"></select>
        <select id="productCountryFilter" class="input" style="max-width: 180px;"></select>
        <select id="productSort" class="input" style="max-width: 200px;">
          <option value="default">${window.i18n.t('sort_default')}</option>
          <option value="salesDesc">${window.i18n.t('sort_sales_desc')}</option>
          <option value="salesAsc">${window.i18n.t('sort_sales_asc')}</option>
          <option value="incompleteInfo">${window.i18n.t('sort_incomplete_info')}</option>
        </select>
        <input id="productSearch" class="input" style="max-width: 220px;" placeholder="${window.i18n.t('search')}" />
        <div class="row" style="gap: 8px;">
          <span class="helper">${window.i18n.t('items_per_page')}</span>
          <select id="productsPageSize" class="input" style="max-width: 110px;">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <div id="importStatus" class="helper" style="margin-top: 8px;"></div>
      <div class="row" style="margin-top: 8px;">
        <button id="downloadTemplateBtn" class="btn ghost small">${window.i18n.t('download_template')}</button>
        <button id="importConfirmBtn" class="btn ghost small hidden">${window.i18n.t('import_products')}</button>
        <span id="importCounter" class="helper"></span>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox" id="selectAllProducts" /></th>
            <th>${window.i18n.t('product_code')}</th>
            <th>${window.i18n.t('name')}</th>
            <th>${window.i18n.t('price')}</th>
            <th>${window.i18n.t('cost')}</th>
            <th>${window.i18n.t('units')}</th>
            <th>${window.i18n.t('stock_balance')}</th>
            <th>${window.i18n.t('product_categories')}</th>
            <th>${window.i18n.t('storage_locations')}</th>
            <th>${window.i18n.t('country_origin')}</th>
            <th>${window.i18n.t('min_stock')}</th>
            <th>${window.i18n.t('reorder_point')}</th>
            <th>${window.i18n.t('max_stock')}</th>
            <th>${window.i18n.t('barcode')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="productsTable"></tbody>
      </table>
      ${buildPaginationBarHtml('productsPageInfo', 'productsPagination')}
    </div>
  `;

  bindProductsSection();
  renderProductsSection();
}

function bindProductsSection() {
  const newBtn = document.getElementById('newProductBtn');
  const downloadBtn = document.getElementById('downloadProductsBtn');
  const bulkBtn = document.getElementById('bulkImportBtn');
  const bulkInput = document.getElementById('bulkImportInput');
  const downloadTemplateBtn = document.getElementById('downloadTemplateBtn');
  const importConfirmBtn = document.getElementById('importConfirmBtn');
  const selectAll = document.getElementById('selectAllProducts');
  const downloadBarcodesBtn = document.getElementById('downloadBarcodesBtn');

  newBtn.addEventListener('click', () => openProductModal());

  downloadBtn.addEventListener('click', () => exportSelectedProducts());

  bulkBtn.addEventListener('click', () => bulkInput.click());

  bulkInput.addEventListener('change', (e) => handleBulkImportFile(e.target.files[0]));

  downloadTemplateBtn.addEventListener('click', () => downloadProductTemplate());

  importConfirmBtn.addEventListener('click', () => importBulkProducts());

  downloadBarcodesBtn.addEventListener('click', () => downloadBarcodesZip());

  selectAll.addEventListener('change', (e) => toggleSelectAllProducts(e.target.checked));
  syncImportUi('products');

  document.getElementById('productBranchFilter').addEventListener('change', (e) => {
    state.productFilters.branchId = e.target.value;
    state.productFilters.currentPage = 1;
    renderProductsSection();
  });
  document.getElementById('productCategoryFilter').addEventListener('change', (e) => {
    state.productFilters.categoryId = e.target.value;
    state.productFilters.currentPage = 1;
    renderProductsSection();
  });
  document.getElementById('productStorageFilter').addEventListener('change', (e) => {
    state.productFilters.storageLocationId = e.target.value;
    state.productFilters.currentPage = 1;
    renderProductsSection();
  });
  document.getElementById('productCountryFilter').addEventListener('change', (e) => {
    state.productFilters.countryOriginId = e.target.value;
    state.productFilters.currentPage = 1;
    renderProductsSection();
  });
  document.getElementById('productSort').addEventListener('change', (e) => {
    state.productFilters.sortBy = e.target.value;
    state.productFilters.currentPage = 1;
    renderProductsSection();
  });
  document.getElementById('productSearch').addEventListener('input', (e) => {
    state.productFilters.query = e.target.value.trim();
    state.productFilters.currentPage = 1;
    renderProductsSection();
  });
  document.getElementById('productsPageSize').addEventListener('change', (e) => {
    state.productFilters.pageSize = Number(e.target.value || 10);
    state.productFilters.currentPage = 1;
    renderProductsSection();
  });
}

function paginateEntries(entries, filters) {
  const totalItems = entries.length;
  const pageSize = Math.max(1, Number(filters.pageSize || 10));
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, Number(filters.currentPage || 1)), totalPages);
  filters.currentPage = currentPage;
  filters.pageSize = pageSize;
  const startIndex = (currentPage - 1) * pageSize;
  return {
    items: entries.slice(startIndex, startIndex + pageSize),
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    startIndex
  };
}

function buildVisiblePageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage - 2, currentPage + 1, currentPage + 2]);
  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

function updatePaginationControls({ infoId, containerId, filters, totalItems, onPageChange }) {
  const infoEl = document.getElementById(infoId);
  const container = document.getElementById(containerId);
  if (!infoEl || !container) return;

  const pageSize = Math.max(1, Number(filters.pageSize || 10));
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, Number(filters.currentPage || 1)), totalPages);
  const start = totalItems === 0 ? 0 : ((currentPage - 1) * pageSize) + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  infoEl.textContent = totalItems > 0
    ? `${window.i18n.t('items_per_page')}: ${pageSize} | ${start}-${end} / ${totalItems} | ${window.i18n.t('page')} ${currentPage} / ${totalPages}`
    : `${window.i18n.t('items_per_page')}: ${pageSize}`;

  container.innerHTML = '';
  if (totalItems === 0) return;

  const previousBtn = document.createElement('button');
  previousBtn.className = 'btn ghost small';
  previousBtn.textContent = window.i18n.t('previous');
  previousBtn.disabled = currentPage <= 1;
  previousBtn.addEventListener('click', () => onPageChange(currentPage - 1));
  container.appendChild(previousBtn);

  const visiblePages = buildVisiblePageNumbers(currentPage, totalPages);
  let lastPage = 0;
  visiblePages.forEach((page) => {
    if (lastPage && page - lastPage > 1) {
      const gap = document.createElement('span');
      gap.className = 'helper';
      gap.textContent = '...';
      container.appendChild(gap);
    }
    const pageBtn = document.createElement('button');
    pageBtn.className = `btn ghost small${page === currentPage ? ' active' : ''}`;
    pageBtn.textContent = String(page);
    pageBtn.addEventListener('click', () => onPageChange(page));
    container.appendChild(pageBtn);
    lastPage = page;
  });

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn ghost small';
  nextBtn.textContent = window.i18n.t('next');
  nextBtn.disabled = currentPage >= totalPages;
  nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
  container.appendChild(nextBtn);
}

function renderProductsSection() {
  const table = document.getElementById('productsTable');
  if (!table) return;

  renderProductFilters();
  const products = state.cache.products || {};
  const categories = state.cache.productCategories || {};
  const storageLocations = state.cache.storageLocations || {};
  const origins = state.cache.countryOrigins || {};
  const branchId = state.productFilters.branchId;
  const salesMap = getSalesMap();

  let entries = Object.entries(products).map(([id, product]) => ({ id, ...product }));
  if (state.productFilters.categoryId !== 'all') {
    entries = entries.filter((item) => item.categoryId === state.productFilters.categoryId);
  }
  if (state.productFilters.storageLocationId !== 'all') {
    entries = entries.filter((item) => item.storageLocationId === state.productFilters.storageLocationId);
  }
  if (state.productFilters.countryOriginId !== 'all') {
    entries = entries.filter((item) => item.countryOriginId === state.productFilters.countryOriginId);
  }
  if (state.productFilters.query) {
    entries = entries.filter((item) => {
      const name = `${item.nameAr || ''} ${item.nameEn || ''} ${item.name || ''}`.toLowerCase();
      const code = normalizeSearchValue(item.code || '');
      const barcode = normalizeSearchValue(item.barcode || '');
      const queryRaw = state.productFilters.query;
      const query = normalizeSearchValue(queryRaw);
      return name.includes(String(queryRaw || '').toLowerCase()) || code.includes(query) || barcode.includes(query);
    });
  }

  if (state.productFilters.sortBy === 'salesDesc') {
    entries.sort((a, b) => (salesMap[b.id] || 0) - (salesMap[a.id] || 0));
  } else if (state.productFilters.sortBy === 'salesAsc') {
    entries.sort((a, b) => (salesMap[a.id] || 0) - (salesMap[b.id] || 0));
  } else if (state.productFilters.sortBy === 'incompleteInfo') {
    entries = entries.filter((item) => item.incompleteInfo || item.missingInfo);
  }

  const pagination = paginateEntries(entries, state.productFilters);
  const pagedEntries = pagination.items;
  updatePaginationControls({
    infoId: 'productsPageInfo',
    containerId: 'productsPagination',
    filters: state.productFilters,
    totalItems: entries.length,
    onPageChange: (page) => {
      state.productFilters.currentPage = page;
      renderProductsSection();
    }
  });
  const pageSizeSelect = document.getElementById('productsPageSize');
  if (pageSizeSelect) pageSizeSelect.value = String(state.productFilters.pageSize || 10);

  table.innerHTML = '';
  if (entries.length === 0) {
    const selectAll = document.getElementById('selectAllProducts');
    if (selectAll) selectAll.checked = false;
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="15">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }

  pagedEntries.forEach((product) => {
    const stock = getProductStock(product, branchId);
    const reorderPoint = Number(product.reorderPoint || 0);
    const warningClass = getReorderClass(stock, reorderPoint);
    const row = document.createElement('tr');
    row.className = warningClass;
    row.innerHTML = `
      <td><input type="checkbox" data-id="${product.id}" ${state.selectedProducts.has(product.id) ? 'checked' : ''} /></td>
      <td>${product.code || '-'}</td>
      <td>${getLocalizedName(product)}</td>
      <td>${formatMoney(product.price)}</td>
      <td>${formatMoney(product.cost)}</td>
      <td>${formatUnitWithDefinition(product.unitId, product.unitDefinitionQty, product.unitDefinitionUnitId)}</td>
      <td>${formatNumber(stock)}</td>
      <td>${getLocalizedName(categories[product.categoryId]) || '-'}</td>
      <td>${getLocalizedName(storageLocations[product.storageLocationId]) || '-'}</td>
      <td>${getLocalizedName(origins[product.countryOriginId]) || '-'}</td>
      <td>${formatNumber(product.minStock)}</td>
      <td>${formatNumber(product.reorderPoint)}</td>
      <td>${formatNumber(product.maxStock)}</td>
      <td>
        <div class="row">
          <canvas class="barcode-canvas" data-barcode="${product.barcode || ''}" height="40" title="${product.barcode || ''}" style="cursor: pointer;"></canvas>
          <button class="btn ghost small" data-action="download-barcode">${window.i18n.t('download')}</button>
        </div>
      </td>
      <td>
        <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
        <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
      </td>
    `;

    row.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
      if (e.target.checked) {
        state.selectedProducts.add(product.id);
      } else {
        state.selectedProducts.delete(product.id);
      }
    });

    row.querySelector('[data-action="edit"]').addEventListener('click', () => openProductModal(product));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => {
      if (confirm(window.i18n.t('confirm_delete'))) {
        db.ref(`products/${product.id}`).remove();
      }
    });

    const barcodeCanvas = row.querySelector('.barcode-canvas');
    if (barcodeCanvas && product.barcode && typeof JsBarcode !== 'undefined') {
      JsBarcode(barcodeCanvas, product.barcode, { format: 'CODE128', displayValue: false, height: 30, width: 1.2 });
    }
    if (barcodeCanvas) {
      barcodeCanvas.addEventListener('click', () => copyTextToClipboard(product.barcode || ''));
    }

    row.querySelector('[data-action="download-barcode"]').addEventListener('click', () => {
      if (typeof JsBarcode === 'undefined') return;
      const value = product.barcode || '';
      if (!value) return;
      const canvas = document.createElement('canvas');
      JsBarcode(canvas, value, { format: 'CODE128', displayValue: true, height: 60 });
      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${product.nameAr || product.nameEn || product.code || value}.png`;
        link.click();
        URL.revokeObjectURL(link.href);
      });
    });

    table.appendChild(row);
  });

  const selectAll = document.getElementById('selectAllProducts');
  if (selectAll) {
    const allSelected = pagedEntries.every((product) => state.selectedProducts.has(product.id));
    selectAll.checked = allSelected && pagedEntries.length > 0;
  }
}

function renderProductFilters() {
  const branchSelect = document.getElementById('productBranchFilter');
  const categorySelect = document.getElementById('productCategoryFilter');
  const storageSelect = document.getElementById('productStorageFilter');
  const countrySelect = document.getElementById('productCountryFilter');
  if (!branchSelect || !categorySelect || !storageSelect || !countrySelect) return;

  const branches = state.cache.branches || {};
  const categories = state.cache.productCategories || {};
  const storageLocations = state.cache.storageLocations || {};
  const origins = state.cache.countryOrigins || {};

  branchSelect.innerHTML = '';
  const branchAll = document.createElement('option');
  branchAll.value = 'all';
  branchAll.textContent = window.i18n.t('all_branches');
  branchSelect.appendChild(branchAll);
  Object.entries(branches).forEach(([id, branch]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(branch);
    branchSelect.appendChild(option);
  });
  branchSelect.value = state.productFilters.branchId;

  categorySelect.innerHTML = '';
  const categoryAll = document.createElement('option');
  categoryAll.value = 'all';
  categoryAll.textContent = window.i18n.t('all_categories');
  categorySelect.appendChild(categoryAll);
  Object.entries(categories).forEach(([id, category]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(category);
    categorySelect.appendChild(option);
  });
  categorySelect.value = state.productFilters.categoryId;

  storageSelect.innerHTML = '';
  const storageAll = document.createElement('option');
  storageAll.value = 'all';
  storageAll.textContent = window.i18n.t('all_storage_locations');
  storageSelect.appendChild(storageAll);
  Object.entries(storageLocations).forEach(([id, location]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(location);
    storageSelect.appendChild(option);
  });
  storageSelect.value = state.productFilters.storageLocationId;

  countrySelect.innerHTML = '';
  const originAll = document.createElement('option');
  originAll.value = 'all';
  originAll.textContent = window.i18n.t('all_country_origins');
  countrySelect.appendChild(originAll);
  Object.entries(origins).forEach(([id, origin]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(origin);
    countrySelect.appendChild(option);
  });
  countrySelect.value = state.productFilters.countryOriginId || 'all';
}

function setupStockMaterialsSection() {
  const section = document.getElementById('section-stockMaterials');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('stock_materials')}</h2>
        <div class="row">
          <button id="newMaterialBtn" class="btn primary">${window.i18n.t('new_product')}</button>
          <button id="downloadMaterialsBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="bulkImportMaterialsBtn" class="btn ghost">${window.i18n.t('bulk_import')}</button>
          <button id="downloadMaterialBarcodesBtn" class="btn ghost">${window.i18n.t('download_barcodes')}</button>
          <input id="materialBulkInput" type="file" accept=".xlsx,.xls" class="hidden" />
        </div>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <select id="materialBranchFilter" class="input" style="max-width: 180px;"></select>
        <select id="materialCategoryFilter" class="input" style="max-width: 200px;"></select>
        <select id="materialStorageFilter" class="input" style="max-width: 200px;"></select>
        <select id="materialCountryFilter" class="input" style="max-width: 200px;"></select>
        <input id="materialSearch" class="input" style="max-width: 220px;" placeholder="${window.i18n.t('search')}" />
        <div class="row" style="gap: 8px;">
          <span class="helper">${window.i18n.t('items_per_page')}</span>
          <select id="materialsPageSize" class="input" style="max-width: 110px;">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <div id="materialImportStatus" class="helper" style="margin-top: 8px;"></div>
      <div class="row" style="margin-top: 8px;">
        <button id="materialDownloadTemplateBtn" class="btn ghost small">${window.i18n.t('download_template')}</button>
        <button id="materialImportConfirmBtn" class="btn ghost small hidden">${window.i18n.t('import_products')}</button>
        <span id="materialImportCounter" class="helper"></span>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox" id="selectAllMaterials" /></th>
            <th>${window.i18n.t('product_code')}</th>
            <th>${window.i18n.t('name')}</th>
            <th>${window.i18n.t('cost')}</th>
            <th>${window.i18n.t('units')}</th>
            <th>${window.i18n.t('stock_balance')}</th>
            <th>${window.i18n.t('material_categories')}</th>
            <th>${window.i18n.t('storage_locations')}</th>
            <th>${window.i18n.t('country_origin')}</th>
            <th>${window.i18n.t('min_stock')}</th>
            <th>${window.i18n.t('reorder_point')}</th>
            <th>${window.i18n.t('max_stock')}</th>
            <th>${window.i18n.t('barcode')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="stockMaterialsTable"></tbody>
      </table>
      ${buildPaginationBarHtml('materialsPageInfo', 'materialsPagination')}
    </div>
  `;

  bindStockMaterialsSection();
  renderStockMaterialsSection();
}

function bindStockMaterialsSection() {
  const newBtn = document.getElementById('newMaterialBtn');
  const downloadBtn = document.getElementById('downloadMaterialsBtn');
  const bulkBtn = document.getElementById('bulkImportMaterialsBtn');
  const bulkInput = document.getElementById('materialBulkInput');
  const downloadTemplateBtn = document.getElementById('materialDownloadTemplateBtn');
  const importConfirmBtn = document.getElementById('materialImportConfirmBtn');
  const selectAll = document.getElementById('selectAllMaterials');
  const downloadBarcodesBtn = document.getElementById('downloadMaterialBarcodesBtn');

  newBtn.addEventListener('click', () => openMaterialModal());
  downloadBtn.addEventListener('click', () => exportSelectedStockMaterials());
  bulkBtn.addEventListener('click', () => bulkInput.click());
  bulkInput.addEventListener('change', (e) => handleBulkImportMaterialsFile(e.target.files[0]));
  downloadTemplateBtn.addEventListener('click', () => downloadMaterialTemplate());
  importConfirmBtn.addEventListener('click', () => importBulkStockMaterials());
  downloadBarcodesBtn.addEventListener('click', () => downloadMaterialBarcodesZip());
  selectAll.addEventListener('change', (e) => toggleSelectAllStockMaterials(e.target.checked));
  syncImportUi('stockMaterials');

  document.getElementById('materialBranchFilter').addEventListener('change', (e) => {
    state.materialFilters.branchId = e.target.value;
    state.materialFilters.currentPage = 1;
    renderStockMaterialsSection();
  });
  document.getElementById('materialCategoryFilter').addEventListener('change', (e) => {
    state.materialFilters.categoryId = e.target.value;
    state.materialFilters.currentPage = 1;
    renderStockMaterialsSection();
  });
  document.getElementById('materialStorageFilter').addEventListener('change', (e) => {
    state.materialFilters.storageLocationId = e.target.value;
    state.materialFilters.currentPage = 1;
    renderStockMaterialsSection();
  });
  document.getElementById('materialCountryFilter').addEventListener('change', (e) => {
    state.materialFilters.countryOriginId = e.target.value;
    state.materialFilters.currentPage = 1;
    renderStockMaterialsSection();
  });
  document.getElementById('materialSearch').addEventListener('input', (e) => {
    state.materialFilters.query = e.target.value.trim();
    state.materialFilters.currentPage = 1;
    renderStockMaterialsSection();
  });
  document.getElementById('materialsPageSize').addEventListener('change', (e) => {
    state.materialFilters.pageSize = Number(e.target.value || 10);
    state.materialFilters.currentPage = 1;
    renderStockMaterialsSection();
  });
}

function renderStockMaterialsSection() {
  const table = document.getElementById('stockMaterialsTable');
  if (!table) return;

  renderMaterialFilters();
  const materials = state.cache.stockMaterials || {};
  const categories = state.cache.materialCategories || {};
  const storageLocations = state.cache.storageLocations || {};
  const origins = state.cache.countryOrigins || {};
  const branchId = state.materialFilters.branchId;

  let entries = Object.entries(materials).map(([id, material]) => ({ id, ...material }));
  if (state.materialFilters.categoryId !== 'all') {
    entries = entries.filter((item) => item.categoryId === state.materialFilters.categoryId);
  }
  if (state.materialFilters.storageLocationId !== 'all') {
    entries = entries.filter((item) => item.storageLocationId === state.materialFilters.storageLocationId);
  }
  if (state.materialFilters.countryOriginId !== 'all') {
    entries = entries.filter((item) => item.countryOriginId === state.materialFilters.countryOriginId);
  }
  if (state.materialFilters.query) {
    entries = entries.filter((item) => {
      const name = `${item.nameAr || ''} ${item.nameEn || ''} ${item.name || ''}`.toLowerCase();
      const code = normalizeSearchValue(item.code || '');
      const barcode = normalizeSearchValue(item.barcode || '');
      const queryRaw = state.materialFilters.query;
      const query = normalizeSearchValue(queryRaw);
      return name.includes(String(queryRaw || '').toLowerCase()) || code.includes(query) || barcode.includes(query);
    });
  }

  const pagination = paginateEntries(entries, state.materialFilters);
  const pagedEntries = pagination.items;
  updatePaginationControls({
    infoId: 'materialsPageInfo',
    containerId: 'materialsPagination',
    filters: state.materialFilters,
    totalItems: entries.length,
    onPageChange: (page) => {
      state.materialFilters.currentPage = page;
      renderStockMaterialsSection();
    }
  });
  const pageSizeSelect = document.getElementById('materialsPageSize');
  if (pageSizeSelect) pageSizeSelect.value = String(state.materialFilters.pageSize || 10);

  table.innerHTML = '';
  if (entries.length === 0) {
    const selectAll = document.getElementById('selectAllMaterials');
    if (selectAll) selectAll.checked = false;
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="14">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }

  pagedEntries.forEach((material) => {
    const stock = getItemStock(material, branchId);
    const reorderPoint = Number(material.reorderPoint || 0);
    const warningClass = getReorderClass(stock, reorderPoint);
    const row = document.createElement('tr');
    row.className = warningClass;
    row.innerHTML = `
      <td><input type="checkbox" data-id="${material.id}" ${state.selectedStockMaterials.has(material.id) ? 'checked' : ''} /></td>
      <td>${material.code || '-'}</td>
      <td>${getLocalizedName(material)}</td>
      <td>${formatMoney(material.cost)}</td>
      <td>${formatUnitWithDefinition(material.unitId, material.unitDefinitionQty, material.unitDefinitionUnitId)}</td>
      <td>${formatNumber(stock)}</td>
      <td>${getLocalizedName(categories[material.categoryId]) || '-'}</td>
      <td>${getLocalizedName(storageLocations[material.storageLocationId]) || '-'}</td>
      <td>${getLocalizedName(origins[material.countryOriginId]) || '-'}</td>
      <td>${formatNumber(material.minStock)}</td>
      <td>${formatNumber(material.reorderPoint)}</td>
      <td>${formatNumber(material.maxStock)}</td>
      <td>
        <div class="row">
          <canvas class="barcode-canvas" data-barcode="${material.barcode || ''}" height="40"></canvas>
          <button class="btn ghost small" data-action="download-barcode">${window.i18n.t('download')}</button>
        </div>
      </td>
      <td>
        <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
        <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
      </td>
    `;

    row.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
      if (e.target.checked) {
        state.selectedStockMaterials.add(material.id);
      } else {
        state.selectedStockMaterials.delete(material.id);
      }
    });

    row.querySelector('[data-action="edit"]').addEventListener('click', () => openMaterialModal(material));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => {
      if (confirm(window.i18n.t('confirm_delete'))) {
        db.ref(`stockMaterials/${material.id}`).remove();
      }
    });

    const barcodeCanvas = row.querySelector('.barcode-canvas');
    if (barcodeCanvas && material.barcode && typeof JsBarcode !== 'undefined') {
      JsBarcode(barcodeCanvas, material.barcode, { format: 'CODE128', displayValue: false, height: 30, width: 1.2 });
    }

    row.querySelector('[data-action="download-barcode"]').addEventListener('click', () => {
      if (typeof JsBarcode === 'undefined') return;
      const value = material.barcode || '';
      if (!value) return;
      const canvas = document.createElement('canvas');
      JsBarcode(canvas, value, { format: 'CODE128', displayValue: true, height: 60 });
      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${material.nameAr || material.nameEn || material.code || value}.png`;
        link.click();
        URL.revokeObjectURL(link.href);
      });
    });

    table.appendChild(row);
  });

  const selectAll = document.getElementById('selectAllMaterials');
  if (selectAll) {
    const allSelected = pagedEntries.every((material) => state.selectedStockMaterials.has(material.id));
    selectAll.checked = allSelected && pagedEntries.length > 0;
  }
}

function renderMaterialFilters() {
  const branchSelect = document.getElementById('materialBranchFilter');
  const categorySelect = document.getElementById('materialCategoryFilter');
  const storageSelect = document.getElementById('materialStorageFilter');
  const countrySelect = document.getElementById('materialCountryFilter');
  if (!branchSelect || !categorySelect || !storageSelect || !countrySelect) return;

  const branches = state.cache.branches || {};
  const categories = state.cache.materialCategories || {};
  const storageLocations = state.cache.storageLocations || {};
  const origins = state.cache.countryOrigins || {};

  branchSelect.innerHTML = '';
  const branchAll = document.createElement('option');
  branchAll.value = 'all';
  branchAll.textContent = window.i18n.t('all_branches');
  branchSelect.appendChild(branchAll);
  Object.entries(branches).forEach(([id, branch]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(branch);
    branchSelect.appendChild(option);
  });
  branchSelect.value = state.materialFilters.branchId;

  categorySelect.innerHTML = '';
  const categoryAll = document.createElement('option');
  categoryAll.value = 'all';
  categoryAll.textContent = window.i18n.t('all_categories');
  categorySelect.appendChild(categoryAll);
  Object.entries(categories).forEach(([id, category]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(category);
    categorySelect.appendChild(option);
  });
  categorySelect.value = state.materialFilters.categoryId;

  storageSelect.innerHTML = '';
  const storageAll = document.createElement('option');
  storageAll.value = 'all';
  storageAll.textContent = window.i18n.t('all_storage_locations');
  storageSelect.appendChild(storageAll);
  Object.entries(storageLocations).forEach(([id, location]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(location);
    storageSelect.appendChild(option);
  });
  storageSelect.value = state.materialFilters.storageLocationId;

  countrySelect.innerHTML = '';
  const originAll = document.createElement('option');
  originAll.value = 'all';
  originAll.textContent = window.i18n.t('all_country_origins');
  countrySelect.appendChild(originAll);
  Object.entries(origins).forEach(([id, origin]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(origin);
    countrySelect.appendChild(option);
  });
  countrySelect.value = state.materialFilters.countryOriginId || 'all';
}

function openMaterialModal(material = null) {
  if (!els.materialModal) return;
  const form = els.materialForm;
  form.reset();
  delete form.dataset.editId;
  els.materialError.textContent = '';

  const codeInput = document.getElementById('materialCode');
  const barcodeInput = document.getElementById('materialBarcode');
  const unitSelect = document.getElementById('materialUnit');
  const countrySelect = document.getElementById('materialCountryOrigin');

  renderSelectOptions(unitSelect, { type: 'select', optionsPath: 'units' });
  renderSelectOptions(countrySelect, { type: 'select', optionsPath: 'countryOrigins' });

  if (material) {
    form.dataset.editId = material.id;
    codeInput.value = material.code || '';
    barcodeInput.value = material.barcode || '';
    document.getElementById('materialNameAr').value = material.nameAr || material.name || '';
    document.getElementById('materialNameEn').value = material.nameEn || '';
    document.getElementById('materialCost').value = material.cost ?? '';
    unitSelect.value = material.unitId || '';
    countrySelect.value = material.countryOriginId || '';
    document.getElementById('materialOpeningQty').value = material.openingQty ?? '';
    document.getElementById('materialMinStock').value = material.minStock ?? '';
    document.getElementById('materialReorderPoint').value = material.reorderPoint ?? '';
    document.getElementById('materialMaxStock').value = material.maxStock ?? '';
  } else {
    codeInput.value = generateMaterialCode();
    barcodeInput.value = generateBarcodeValue();
  }

  setupUnitDefinitionControls('material', material);

  renderMaterialBarcodePreview();
  els.materialModal.classList.remove('hidden');

  document.getElementById('generateMaterialBarcode').onclick = () => {
    barcodeInput.value = generateBarcodeValue();
    renderMaterialBarcodePreview();
  };

  barcodeInput.oninput = () => renderMaterialBarcodePreview();

  document.getElementById('downloadMaterialBarcode').onclick = () => downloadMaterialBarcodeImage(barcodeInput.value, codeInput.value);

  form.onsubmit = (e) => {
    e.preventDefault();
    saveMaterial();
  };
}

function closeMaterialModal() {
  if (els.materialModal) {
    els.materialModal.classList.add('hidden');
  }
}

function saveMaterial() {
  const form = els.materialForm;
  const editId = form.dataset.editId;
  const rawCode = document.getElementById('materialCode').value.trim();
  const barcode = document.getElementById('materialBarcode').value.trim();
  const nameAr = document.getElementById('materialNameAr').value.trim();
  const nameEn = document.getElementById('materialNameEn').value.trim();
  const cost = Number(document.getElementById('materialCost').value || 0);
  const unitId = document.getElementById('materialUnit').value;
  const countryOriginId = document.getElementById('materialCountryOrigin')?.value || null;
  const unitDefinitionQtyRaw = document.getElementById('materialUnitDefinitionQty')?.value.trim() || '';
  const unitDefinitionUnitId = document.getElementById('materialUnitDefinitionUnit')?.value || '';
  const openingQty = Number(document.getElementById('materialOpeningQty').value || 0);
  const minStock = Number(document.getElementById('materialMinStock').value || 0);
  const reorderPoint = Number(document.getElementById('materialReorderPoint').value || 0);
  const maxStock = Number(document.getElementById('materialMaxStock').value || 0);

  if (!nameAr || !nameEn || !unitId) {
    els.materialError.textContent = window.i18n.t('error');
    return;
  }
  if ((unitDefinitionQtyRaw && !unitDefinitionUnitId) || (!unitDefinitionQtyRaw && unitDefinitionUnitId)) {
    els.materialError.textContent = window.i18n.t('error');
    return;
  }
  const unitDefinitionQty = unitDefinitionQtyRaw && unitDefinitionUnitId ? unitDefinitionQtyRaw : null;
  const unitDefinitionUnitIdFinal = unitDefinitionQtyRaw && unitDefinitionUnitId ? unitDefinitionUnitId : null;

  const payload = {
    code: editId ? rawCode : normalizeCode(rawCode, 'SK'),
    barcode,
    nameAr,
    nameEn,
    cost,
    unitId,
    countryOriginId: countryOriginId || null,
    unitDefinitionQty,
    unitDefinitionUnitId: unitDefinitionUnitIdFinal,
    openingQty,
    minStock,
    reorderPoint,
    maxStock
  };

  if (editId) {
    db.ref(`stockMaterials/${editId}`).update(payload).then(() => {
      closeMaterialModal();
    });
  } else {
    const mainBranchId = getMainBranchId();
    payload.mainBranchId = mainBranchId;
    payload.stockByBranch = mainBranchId ? { [mainBranchId]: openingQty } : {};
    db.ref('stockMaterials').push(payload).then(() => {
      closeMaterialModal();
    });
  }
}

function renderMaterialBarcodePreview() {
  const value = document.getElementById('materialBarcode').value.trim();
  const canvas = document.getElementById('materialBarcodePreview');
  if (!canvas || !value || typeof JsBarcode === 'undefined') return;
  JsBarcode(canvas, value, { format: 'CODE128', displayValue: true, height: 60 });
}

function downloadMaterialBarcodeImage(value, code) {
  const canvas = document.getElementById('materialBarcodePreview');
  if (!canvas) return;
  canvas.toBlob((blob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${code || value}.png`;
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

function toggleSelectAllStockMaterials(checked) {
  const table = document.getElementById('stockMaterialsTable');
  if (!table) return;
  table.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = checked;
    const id = checkbox.dataset.id;
    if (checked) {
      state.selectedStockMaterials.add(id);
    } else {
      state.selectedStockMaterials.delete(id);
    }
  });
}

function exportSelectedStockMaterials() {
  const materials = state.cache.stockMaterials || {};
  const selected = Array.from(state.selectedStockMaterials).map((id) => materials[id]).filter(Boolean);
  if (selected.length === 0) return;
  if (typeof XLSX === 'undefined') return;

  const data = selected.map((material) => ({
    code: material.code,
    nameAr: material.nameAr,
    nameEn: material.nameEn,
    cost: material.cost,
    unitId: material.unitId,
    openingQty: material.openingQty,
    minStock: material.minStock,
    reorderPoint: material.reorderPoint,
    maxStock: material.maxStock,
    barcode: material.barcode,
    categoryId: material.categoryId || '',
    storageLocationId: material.storageLocationId || '',
    countryOriginId: material.countryOriginId || ''
  }));
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'StockMaterials');
  XLSX.writeFile(workbook, 'stock-materials.xlsx');
}

const productImportMap = {
  'الاسم بالعربي': 'nameAr',
  'الاسم بالانجليزي': 'nameEn',
  'التكلفة': 'cost',
  'سعر البيع': 'price',
  'الوحدة': 'unitId',
  'الرصيد الافتتاحي': 'openingQty',
  'الحد الادنى للطلب': 'minStock',
  'نقطة اعادة الطلب': 'reorderPoint',
  'الحد الأعلى للطلب': 'maxStock',
  'الباركود': 'barcode',
  'رمز المنتج': 'code',
  'بلد المنشأ': 'countryOriginId'
};

const materialImportMap = {
  'الاسم بالعربي': 'nameAr',
  'الاسم بالانجليزي': 'nameEn',
  'التكلفة': 'cost',
  'الوحدة': 'unitId',
  'الرصيد الافتتاحي': 'openingQty',
  'الحد الادنى للطلب': 'minStock',
  'نقطة اعادة الطلب': 'reorderPoint',
  'الحد الأعلى للطلب': 'maxStock',
  'الباركود': 'barcode',
  'معرف التصنيف': 'categoryId',
  'التصنيف': 'categoryId',
  'بلد المنشأ': 'countryOriginId'
};

const deliveryZoneImportMap = {
  'الاسم بالعربي': 'nameAr',
  'الاسم بالانجليزي': 'nameEn'
};

const cashierImportMap = {
  'الاسم': 'name',
  'اسم الكاشير': 'name',
  'الكود': 'code',
  'رمز الكاشير': 'code',
  name: 'name',
  code: 'code'
};

const customerImportMap = {
  'اسم الزبون': 'name',
  'اسم العميل': 'name',
  'الاسم': 'name',
  'رقم الهاتف': 'phone',
  'الهاتف': 'phone',
  'العنوان': 'address',
  name: 'name',
  phone: 'phone',
  address: 'address'
};

function mapImportRow(row, mapping) {
  const mapped = {};
  let usedMapping = false;
  Object.entries(mapping).forEach(([label, key]) => {
    if (Object.prototype.hasOwnProperty.call(row, label)) {
      mapped[key] = row[label];
      usedMapping = true;
    }
  });
  if (!usedMapping) return row;
  Object.entries(row).forEach(([key, value]) => {
    if (!mapping[key]) {
      mapped[key] = value;
    }
  });
  return mapped;
}

const IMPORT_BATCH_SIZE = 25;

function isImportRowEmpty(row) {
  return !Object.values(row || {}).some((value) => String(value ?? '').trim() !== '');
}

function normalizeImportIdentity(value) {
  return normalizeSearchValue(String(value ?? '').trim());
}

function getImportProductIdentity(row) {
  const nameArKey = normalizeImportIdentity(row?.nameAr || row?.name || '');
  const nameEnKey = normalizeImportIdentity(row?.nameEn || '');
  return {
    codeKey: row?.code ? normalizeImportIdentity(row.code) : '',
    barcodeKey: row?.barcode ? normalizeImportIdentity(row.barcode) : '',
    nameArKey,
    nameEnKey,
    combinedNameKey: [nameArKey, nameEnKey].filter(Boolean).join('|')
  };
}

function createProductIdentitySets() {
  return {
    code: new Set(),
    barcode: new Set(),
    nameAr: new Set(),
    nameEn: new Set(),
    combined: new Set()
  };
}

function rememberProductIdentity(sets, identity) {
  if (!sets || !identity) return;
  if (identity.codeKey) sets.code.add(identity.codeKey);
  if (identity.barcodeKey) sets.barcode.add(identity.barcodeKey);
  if (identity.nameArKey) sets.nameAr.add(identity.nameArKey);
  if (identity.nameEnKey) sets.nameEn.add(identity.nameEnKey);
  if (identity.combinedNameKey) sets.combined.add(identity.combinedNameKey);
}

function matchesProductIdentity(sets, identity) {
  if (!sets || !identity) return false;
  if (identity.codeKey && sets.code.has(identity.codeKey)) return true;
  if (identity.barcodeKey && sets.barcode.has(identity.barcodeKey)) return true;
  if (identity.combinedNameKey && sets.combined.has(identity.combinedNameKey)) return true;
  if (identity.nameArKey && sets.nameAr.has(identity.nameArKey)) return true;
  if (identity.nameEnKey && sets.nameEn.has(identity.nameEnKey)) return true;
  return false;
}

function buildExistingProductIdentitySets() {
  const sets = createProductIdentitySets();
  Object.values(state.cache.products || {}).forEach((product) => {
    rememberProductIdentity(sets, getImportProductIdentity(product));
  });
  return sets;
}

function prepareImportedProducts(rows) {
  const accepted = [];
  const fileSets = createProductIdentitySets();
  const existingSets = buildExistingProductIdentitySets();
  let duplicateInFileCount = 0;
  let existingCount = 0;

  (rows || []).forEach((row) => {
    const identity = getImportProductIdentity(row);
    if (matchesProductIdentity(fileSets, identity)) {
      duplicateInFileCount += 1;
      return;
    }
    if (matchesProductIdentity(existingSets, identity)) {
      existingCount += 1;
      return;
    }
    accepted.push(row);
    rememberProductIdentity(fileSets, identity);
  });

  return {
    rows: accepted,
    duplicateInFileCount,
    existingCount
  };
}

function waitForImportUiFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      setTimeout(resolve, 0);
    });
  });
}

function waitForImportDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getImportUiConfig(type) {
  if (type === 'stockMaterials') {
    return {
      rowsKey: 'importedStockMaterials',
      statusKey: 'materialImportStatusText',
      counterKey: 'materialImportCounterText',
      statusId: 'materialImportStatus',
      counterId: 'materialImportCounter',
      confirmId: 'materialImportConfirmBtn',
      inputId: 'materialBulkInput'
    };
  }
  return {
    rowsKey: 'importedProducts',
    statusKey: 'productImportStatusText',
    counterKey: 'productImportCounterText',
    statusId: 'importStatus',
    counterId: 'importCounter',
    confirmId: 'importConfirmBtn',
    inputId: 'bulkImportInput'
  };
}

function syncImportUi(type) {
  const config = getImportUiConfig(type);
  const statusEl = document.getElementById(config.statusId);
  const counterEl = document.getElementById(config.counterId);
  const confirmBtn = document.getElementById(config.confirmId);
  if (statusEl) statusEl.textContent = state[config.statusKey] || '';
  if (counterEl) counterEl.textContent = state[config.counterKey] || '';
  if (confirmBtn) {
    const hasRows = Array.isArray(state[config.rowsKey]) && state[config.rowsKey].length > 0;
    confirmBtn.classList.toggle('hidden', !hasRows);
    confirmBtn.disabled = state.importInProgress;
  }
}

function setImportUiState(type, { statusText, counterText } = {}) {
  const config = getImportUiConfig(type);
  if (statusText !== undefined) state[config.statusKey] = statusText;
  if (counterText !== undefined) state[config.counterKey] = counterText;
  syncImportUi(type);
}

function setImportMode(active) {
  state.importInProgress = Boolean(active);
  syncImportUi('products');
  syncImportUi('stockMaterials');
  if (!state.importInProgress) {
    flushPendingDataRefresh();
  }
}

function updateImportProgressOverlay({ visible = true, title = '', subtitle = '', processed = 0, total = 0, failed = 0 } = {}) {
  if (!els.importProgressOverlay) return;
  if (!visible) {
    els.importProgressOverlay.classList.add('hidden');
    return;
  }
  const safeProcessed = Math.max(0, Number(processed || 0));
  const safeTotal = Math.max(0, Number(total || 0));
  const percent = safeTotal > 0 ? Math.min(100, Math.round((safeProcessed / safeTotal) * 100)) : 0;
  els.importProgressOverlay.classList.remove('hidden');
  if (els.importProgressTitle) els.importProgressTitle.textContent = title || window.i18n.t('importing');
  if (els.importProgressSubtitle) els.importProgressSubtitle.textContent = subtitle || window.i18n.t('importing_to_system');
  if (els.importProgressFill) els.importProgressFill.style.width = `${percent}%`;
  if (els.importProgressPercent) els.importProgressPercent.textContent = `${percent}%`;
  if (els.importProgressCount) {
    els.importProgressCount.textContent = `${window.i18n.t('processed_items')} ${safeProcessed} / ${safeTotal}`;
  }
  if (els.importProgressErrors) {
    els.importProgressErrors.textContent = failed > 0 ? `${window.i18n.t('failed_items')}: ${failed}` : '';
  }
}

function buildImportedProductPayload(row, mainBranchId) {
  return {
    code: normalizeCode(row.code, 'FG'),
    barcode: row.barcode || generateBarcodeValue(),
    nameAr: row.nameAr || '',
    nameEn: row.nameEn || '',
    cost: Number(row.cost || 0),
    price: Number(row.price || 0),
    unitId: row.unitId || '',
    openingQty: Number(row.openingQty || 0),
    minStock: Number(row.minStock || 0),
    reorderPoint: Number(row.reorderPoint || 0),
    maxStock: Number(row.maxStock || 0),
    countryOriginId: row.countryOriginId || null,
    mainBranchId,
    stockByBranch: mainBranchId ? { [mainBranchId]: Number(row.openingQty || 0) } : {}
  };
}

function buildImportedStockMaterialPayload(row, mainBranchId) {
  return {
    code: normalizeCode(row.code, 'SK'),
    barcode: row.barcode || generateBarcodeValue(),
    nameAr: row.nameAr || '',
    nameEn: row.nameEn || '',
    cost: Number(row.cost || 0),
    unitId: row.unitId || '',
    openingQty: Number(row.openingQty || 0),
    minStock: Number(row.minStock || 0),
    reorderPoint: Number(row.reorderPoint || 0),
    maxStock: Number(row.maxStock || 0),
    categoryId: row.categoryId || null,
    countryOriginId: row.countryOriginId || null,
    mainBranchId,
    stockByBranch: mainBranchId ? { [mainBranchId]: Number(row.openingQty || 0) } : {}
  };
}

async function importRowsWithProgress({ type, path, rows, buildPayload, title }) {
  if (!rows || rows.length === 0) return;
  const config = getImportUiConfig(type);
  const total = rows.length;
  let imported = 0;
  let failed = 0;
  const failedRows = [];

  setImportMode(true);
  setImportUiState(type, {
    statusText: `${window.i18n.t('loading')}...`,
    counterText: `0 / ${total}`
  });
  updateImportProgressOverlay({
    visible: true,
    title,
    subtitle: window.i18n.t('importing_to_system'),
    processed: 0,
    total,
    failed: 0
  });

  await waitForImportUiFrame();

  try {
    for (let start = 0; start < total; start += IMPORT_BATCH_SIZE) {
      const chunk = rows.slice(start, start + IMPORT_BATCH_SIZE);
      const entries = chunk.map((row) => {
        const key = db.ref(path).push().key;
        return {
          key,
          row,
          payload: buildPayload(row)
        };
      });
      const updates = {};
      entries.forEach((entry) => {
        updates[`${path}/${entry.key}`] = entry.payload;
      });

      try {
        await db.ref().update(updates);
        imported += entries.length;
        const processed = imported + failed;
        setImportUiState(type, { counterText: `${processed} / ${total}` });
        updateImportProgressOverlay({
          visible: true,
          title,
          subtitle: window.i18n.t('importing_to_system'),
          processed,
          total,
          failed
        });
        await waitForImportUiFrame();
      } catch (_chunkError) {
        for (const entry of entries) {
          try {
            await db.ref(`${path}/${entry.key}`).set(entry.payload);
            imported += 1;
          } catch (_rowError) {
            failed += 1;
            failedRows.push(entry.row);
          }
          const processed = imported + failed;
          setImportUiState(type, { counterText: `${processed} / ${total}` });
          updateImportProgressOverlay({
            visible: true,
            title,
            subtitle: window.i18n.t('importing_to_system'),
            processed,
            total,
            failed
          });
          if (processed % 5 === 0 || processed === total) {
            await waitForImportUiFrame();
          }
        }
      }
    }

    state[config.rowsKey] = failedRows;
    if (failedRows.length > 0) {
      setImportUiState(type, {
        statusText: `${window.i18n.t('completed_with_errors')} (${window.i18n.t('failed_items')}: ${failedRows.length})`,
        counterText: `${imported} / ${total}`
      });
      updateImportProgressOverlay({
        visible: true,
        title,
        subtitle: `${window.i18n.t('completed_with_errors')} (${failedRows.length})`,
        processed: total,
        total,
        failed
      });
    } else {
      state[config.rowsKey] = [];
      setImportUiState(type, {
        statusText: `${window.i18n.t('success')} (${imported}/${total})`,
        counterText: ''
      });
      const fileInput = document.getElementById(config.inputId);
      if (fileInput) fileInput.value = '';
      updateImportProgressOverlay({
        visible: true,
        title,
        subtitle: `${window.i18n.t('success')} (${imported}/${total})`,
        processed: total,
        total,
        failed: 0
      });
    }
    await waitForImportDelay(500);
  } catch (_error) {
    setImportUiState(type, {
      statusText: window.i18n.t('error'),
      counterText: `${imported + failed} / ${total}`
    });
    updateImportProgressOverlay({
      visible: true,
      title,
      subtitle: window.i18n.t('error'),
      processed: imported + failed,
      total,
      failed
    });
    await waitForImportDelay(700);
  } finally {
    updateImportProgressOverlay({ visible: false });
    setImportMode(false);
  }
}

function downloadDeliveryZoneTemplate() {
  if (typeof XLSX === 'undefined') return;
  const useArabic = window.i18n.getLanguage() === 'ar';
  const template = [
    {
      [useArabic ? 'الاسم بالعربي' : 'nameAr']: '',
      [useArabic ? 'الاسم بالانجليزي' : 'nameEn']: ''
    }
  ];
  const worksheet = XLSX.utils.json_to_sheet(template);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
  XLSX.writeFile(workbook, 'delivery-zones-template.xlsx');
}

function handleBulkImportZonesFile(file) {
  const statusEl = document.getElementById('zonesBulkStatus');
  if (statusEl) statusEl.textContent = '';
  if (!file || typeof XLSX === 'undefined') return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    const mapped = rows.map((row) => mapImportRow(row, deliveryZoneImportMap));
    const filtered = mapped.filter((row) => row.nameAr || row.nameEn);
    if (statusEl) statusEl.textContent = `${window.i18n.t('import_loaded')} ${filtered.length}`;
    importBulkDeliveryZones(filtered).then(() => {
      if (statusEl) statusEl.textContent = window.i18n.t('success');
    });
  };
  reader.readAsArrayBuffer(file);
}

function importBulkDeliveryZones(rows) {
  if (!rows || rows.length === 0) return Promise.resolve();
  const tasks = rows.map((row) => {
    const nameAr = String(row.nameAr || '').trim();
    const nameEn = String(row.nameEn || '').trim();
    if (!nameAr && !nameEn) return Promise.resolve();
    return db.ref('deliveryZones').push({ nameAr, nameEn });
  });
  return Promise.all(tasks);
}

function downloadCashierTemplate() {
  if (typeof XLSX === 'undefined') return;
  const useArabic = window.i18n.getLanguage() === 'ar';
  const template = [
    {
      [useArabic ? 'الاسم' : 'name']: '',
      [useArabic ? 'الكود' : 'code']: ''
    }
  ];
  const worksheet = XLSX.utils.json_to_sheet(template);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Cashiers');
  XLSX.writeFile(workbook, 'cashiers-template.xlsx');
}

function prepareImportedCashiers(rows) {
  const existingCodes = new Set(
    Object.values(state.cache.cashiers || {})
      .map((cashier) => normalizeImportIdentity(cashier?.code || ''))
      .filter(Boolean)
  );
  const fileCodes = new Set();
  const accepted = [];
  let duplicateInFileCount = 0;
  let existingCount = 0;
  let invalidCount = 0;

  (rows || []).forEach((row) => {
    const mapped = mapImportRow(row, cashierImportMap);
    const name = String(mapped?.name || '').trim();
    const code = String(mapped?.code || '').trim();
    const codeKey = normalizeImportIdentity(code);
    if (!name || !codeKey) {
      invalidCount += 1;
      return;
    }
    if (fileCodes.has(codeKey)) {
      duplicateInFileCount += 1;
      return;
    }
    if (existingCodes.has(codeKey)) {
      existingCount += 1;
      return;
    }
    fileCodes.add(codeKey);
    accepted.push({ name, code: String(code), active: true });
  });

  return { rows: accepted, duplicateInFileCount, existingCount, invalidCount };
}

async function importBulkCashiers(rows) {
  if (!rows?.length) return { imported: 0 };
  const tasks = rows.map((row) => db.ref('cashiers').push({
    name: row.name,
    code: String(row.code),
    active: true
  }));
  await Promise.all(tasks);
  return { imported: rows.length };
}

function handleBulkImportCashiersFile(file) {
  const statusEl = document.getElementById('cashiersBulkStatus');
  if (statusEl) statusEl.textContent = '';
  if (!file || typeof XLSX === 'undefined') return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const sourceRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    const prepared = prepareImportedCashiers(sourceRows.filter((row) => !isImportRowEmpty(row)));
    const parts = [];
    parts.push(`${window.i18n.t('import_loaded')} ${prepared.rows.length}`);
    if (prepared.duplicateInFileCount > 0) {
      parts.push(`${window.i18n.t('duplicates_in_file')}: ${prepared.duplicateInFileCount}`);
    }
    if (prepared.existingCount > 0) {
      parts.push(`${window.i18n.t('existing_cashiers_skipped')}: ${prepared.existingCount}`);
    }
    if (prepared.invalidCount > 0) {
      parts.push(`${window.i18n.t('invalid_rows_skipped')}: ${prepared.invalidCount}`);
    }
    if (statusEl) statusEl.textContent = parts.join(' | ');
    if (!prepared.rows.length) return;
    try {
      const result = await importBulkCashiers(prepared.rows);
      if (statusEl) {
        statusEl.textContent = `${parts.join(' | ')} | ${window.i18n.t('success')} (${result.imported})`;
      }
    } catch (_error) {
      if (statusEl) statusEl.textContent = window.i18n.t('error');
    }
  };
  reader.readAsArrayBuffer(file);
}

function downloadCustomerTemplate() {
  if (typeof XLSX === 'undefined') return;
  const useArabic = window.i18n.getLanguage() === 'ar';
  const template = [
    {
      [useArabic ? 'اسم الزبون' : 'name']: '',
      [useArabic ? 'رقم الهاتف' : 'phone']: '',
      [useArabic ? 'العنوان' : 'address']: ''
    }
  ];
  const worksheet = XLSX.utils.json_to_sheet(template);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
  XLSX.writeFile(workbook, 'customers-template.xlsx');
}

function getCustomerImportPhoneKey(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits || normalizeImportIdentity(value);
}

function normalizeCustomerImportZoneKey(value) {
  return normalizeImportIdentity(String(value || '')
    .replace(/^منطقة\s+/u, '')
    .replace(/^محافظة\s+/u, '')
    .replace(/\s+/g, ' '));
}

function splitCustomerImportAddress(value) {
  return String(value || '')
    .replace(/\r?\n+/g, ' ')
    .split(/\s*[-/\\|،]+\s*/u)
    .map((part) => part.trim())
    .filter(Boolean);
}

function findCustomerImportZoneMatch(zoneToken, zones = state.cache.deliveryZones || {}) {
  const targetKey = normalizeCustomerImportZoneKey(zoneToken);
  if (!targetKey) return null;

  const entries = Object.entries(zones).map(([id, zone]) => ({
    id,
    zone,
    keys: [zone?.nameAr, zone?.nameEn, zone?.name]
      .map((name) => normalizeCustomerImportZoneKey(name))
      .filter(Boolean)
  }));

  let match = entries.find((entry) => entry.keys.includes(targetKey));
  if (match) return match;

  match = entries.find((entry) => entry.keys.some((key) => key.includes(targetKey) || targetKey.includes(key)));
  return match || null;
}

function parseImportedCustomerAddress(value, zones = state.cache.deliveryZones || {}) {
  const parts = splitCustomerImportAddress(value);
  const zoneToken = parts.shift() || '';
  const zoneMatch = findCustomerImportZoneMatch(zoneToken, zones);
  return {
    zoneId: zoneMatch?.id || '',
    zoneToken,
    details: parts.join(' - ').trim()
  };
}

function prepareImportedCustomers(rows) {
  const zones = state.cache.deliveryZones || {};
  const existingPhones = new Set(
    Object.values(state.cache.customers || {})
      .map((customer) => getCustomerImportPhoneKey(customer?.phone || ''))
      .filter(Boolean)
  );
  const filePhones = new Set();
  const accepted = [];
  let duplicateInFileCount = 0;
  let existingCount = 0;
  let invalidCount = 0;
  let unmatchedZoneCount = 0;

  (rows || []).forEach((row, index) => {
    const mapped = mapImportRow(row, customerImportMap);
    const name = String(mapped?.name || '').trim();
    const phone = String(mapped?.phone || '').trim();
    const addressText = String(mapped?.address || '').trim();
    const phoneKey = getCustomerImportPhoneKey(phone);
    if (!name || !phoneKey || !addressText) {
      invalidCount += 1;
      return;
    }
    if (filePhones.has(phoneKey)) {
      duplicateInFileCount += 1;
      return;
    }
    if (existingPhones.has(phoneKey)) {
      existingCount += 1;
      return;
    }

    const parsedAddress = parseImportedCustomerAddress(addressText, zones);
    if (!parsedAddress.zoneId) {
      unmatchedZoneCount += 1;
      return;
    }

    filePhones.add(phoneKey);
    accepted.push({
      nameAr: name,
      nameEn: name,
      phone,
      addresses: [{
        id: `addr-import-${Date.now()}-${index}`,
        zoneId: parsedAddress.zoneId,
        details: parsedAddress.details || null
      }],
      zoneId: parsedAddress.zoneId,
      address: parsedAddress.details || null,
      createdAt: serverTime
    });
  });

  return { rows: accepted, duplicateInFileCount, existingCount, invalidCount, unmatchedZoneCount };
}

async function importBulkCustomers(rows) {
  if (!rows?.length) return { imported: 0 };
  const updates = {};
  rows.forEach((row) => {
    const key = db.ref('customers').push().key;
    updates[`customers/${key}`] = row;
  });
  await db.ref().update(updates);
  return { imported: rows.length };
}

function setCustomerImportStatus(text) {
  state.customerImportStatusText = text || '';
  const statusEl = document.getElementById('customersBulkStatus');
  if (statusEl) statusEl.textContent = state.customerImportStatusText;
}

function handleBulkImportCustomersFile(file) {
  setCustomerImportStatus('');
  if (!file || typeof XLSX === 'undefined') return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const sourceRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    const prepared = prepareImportedCustomers(sourceRows.filter((row) => !isImportRowEmpty(row)));
    const parts = [`${window.i18n.t('import_loaded')} ${prepared.rows.length}`];
    if (prepared.duplicateInFileCount > 0) {
      parts.push(`${window.i18n.t('duplicates_in_file')}: ${prepared.duplicateInFileCount}`);
    }
    if (prepared.existingCount > 0) {
      parts.push(`${window.i18n.t('existing_customers_skipped')}: ${prepared.existingCount}`);
    }
    if (prepared.invalidCount > 0) {
      parts.push(`${window.i18n.t('invalid_rows_skipped')}: ${prepared.invalidCount}`);
    }
    if (prepared.unmatchedZoneCount > 0) {
      parts.push(`${window.i18n.t('unmatched_delivery_zones_skipped')}: ${prepared.unmatchedZoneCount}`);
    }
    setCustomerImportStatus(parts.join(' | '));
    if (!prepared.rows.length) return;
    try {
      const result = await importBulkCustomers(prepared.rows);
      setCustomerImportStatus(`${parts.join(' | ')} | ${window.i18n.t('success')} (${result.imported})`);
    } catch (_error) {
      setCustomerImportStatus(window.i18n.t('error'));
    }
  };
  reader.readAsArrayBuffer(file);
}

function downloadMaterialTemplate() {
  if (typeof XLSX === 'undefined') return;
  const useArabic = window.i18n.getLanguage() === 'ar';
  const template = [
    {
      [useArabic ? 'الاسم بالعربي' : 'nameAr']: '',
      [useArabic ? 'الاسم بالانجليزي' : 'nameEn']: '',
      [useArabic ? 'التكلفة' : 'cost']: '',
      [useArabic ? 'الوحدة' : 'unitId']: '',
      [useArabic ? 'الرصيد الافتتاحي' : 'openingQty']: '',
      [useArabic ? 'الحد الادنى للطلب' : 'minStock']: '',
      [useArabic ? 'نقطة اعادة الطلب' : 'reorderPoint']: '',
      [useArabic ? 'الحد الأعلى للطلب' : 'maxStock']: '',
      [useArabic ? 'الباركود' : 'barcode']: '',
      [useArabic ? 'معرف التصنيف' : 'categoryId']: '',
      [useArabic ? 'بلد المنشأ' : 'countryOriginId']: ''
    }
  ];
  const worksheet = XLSX.utils.json_to_sheet(template);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
  XLSX.writeFile(workbook, 'stock-materials-template.xlsx');
}

function handleBulkImportMaterialsFile(file) {
  if (!file || typeof XLSX === 'undefined') return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    state.importedStockMaterials = rows
      .filter((row) => !isImportRowEmpty(row))
      .map((row) => mapImportRow(row, materialImportMap));
    setImportUiState('stockMaterials', {
      statusText: `${window.i18n.t('import_loaded')} ${state.importedStockMaterials.length}`,
      counterText: ''
    });
  };
  reader.readAsArrayBuffer(file);
}

function importBulkStockMaterials() {
  const rows = state.importedStockMaterials;
  if (!rows || rows.length === 0) return;
  const mainBranchId = getMainBranchId();
  importRowsWithProgress({
    type: 'stockMaterials',
    path: 'stockMaterials',
    rows,
    buildPayload: (row) => buildImportedStockMaterialPayload(row, mainBranchId),
    title: `${window.i18n.t('importing')} ${window.i18n.t('stock_materials')}`
  });
}

async function downloadMaterialBarcodesZip() {
  if (typeof JSZip === 'undefined' || typeof JsBarcode === 'undefined') return;
  const materials = state.cache.stockMaterials || {};
  const selected = Array.from(state.selectedStockMaterials).map((id) => materials[id]).filter(Boolean);
  if (selected.length === 0) return;

  const zip = new JSZip();
  for (const material of selected) {
    const value = material.barcode || generateBarcodeValue();
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, value, { format: 'CODE128', displayValue: true, height: 60 });
    const blob = await new Promise((resolve) => canvas.toBlob(resolve));
    const name = (material.nameAr || material.nameEn || material.code || value).replace(/[\\/:*?\"<>|]/g, '-');
    zip.file(`${name}.png`, blob);
  }
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(zipBlob);
  link.download = 'material-barcodes.zip';
  link.click();
  URL.revokeObjectURL(link.href);
}

function setupUnitDefinitionControls(prefix, item) {
  const unitSelect = document.getElementById(`${prefix}Unit`);
  const wrap = document.getElementById(`${prefix}UnitDefinitionWrap`);
  const toggle = document.getElementById(`${prefix}UnitDefinitionToggle`);
  const fields = document.getElementById(`${prefix}UnitDefinitionFields`);
  const qtyInput = document.getElementById(`${prefix}UnitDefinitionQty`);
  const unitSelectDef = document.getElementById(`${prefix}UnitDefinitionUnit`);
  if (!unitSelect || !wrap || !toggle || !fields || !qtyInput || !unitSelectDef) return;

  renderSelectOptions(unitSelectDef, { type: 'select', optionsPath: 'units' });

  const definitionQty = item?.unitDefinitionQty ?? '';
  const definitionUnitId = item?.unitDefinitionUnitId ?? '';

  qtyInput.value = definitionQty || '';
  unitSelectDef.value = definitionUnitId || '';

  if (unitSelect.value) {
    wrap.classList.remove('hidden');
  } else {
    wrap.classList.add('hidden');
  }

  if (definitionQty || definitionUnitId) {
    fields.classList.remove('hidden');
  } else {
    fields.classList.add('hidden');
  }

  unitSelect.onchange = () => {
    if (!unitSelect.value) {
      wrap.classList.add('hidden');
      fields.classList.add('hidden');
      qtyInput.value = '';
      unitSelectDef.value = '';
      return;
    }
    wrap.classList.remove('hidden');
  };

  toggle.onclick = () => {
    const isHidden = fields.classList.contains('hidden');
    if (isHidden) {
      fields.classList.remove('hidden');
      qtyInput.focus();
    } else {
      fields.classList.add('hidden');
      qtyInput.value = '';
      unitSelectDef.value = '';
    }
  };
}

function openProductModal(product = null) {
  if (!els.productModal) return;
  const form = els.productForm;
  form.reset();
  delete form.dataset.editId;
  els.productError.textContent = '';

  const codeInput = document.getElementById('productCode');
  const barcodeInput = document.getElementById('productBarcode');
  const unitSelect = document.getElementById('productUnit');
  const countrySelect = document.getElementById('productCountryOrigin');
  const openingQtyInput = document.getElementById('productOpeningQty');
  const fixedExpiryToggle = document.getElementById('productFixedExpiryEnabled');
  const fixedExpiryFields = document.getElementById('productFixedExpiryFields');
  const fixedProductionDateInput = document.getElementById('productFixedProductionDate');
  const fixedExpiryDateInput = document.getElementById('productFixedExpiryDate');

  renderSelectOptions(unitSelect, { type: 'select', optionsPath: 'units' });
  renderSelectOptions(countrySelect, { type: 'select', optionsPath: 'countryOrigins' });
  const syncFixedExpiryFields = () => {
    if (!fixedExpiryFields || !fixedExpiryToggle) return;
    fixedExpiryFields.classList.toggle('hidden', !fixedExpiryToggle.checked);
  };

  if (product) {
    form.dataset.editId = product.id;
    codeInput.value = product.code || '';
    barcodeInput.value = product.barcode || '';
    document.getElementById('productNameAr').value = product.nameAr || '';
    document.getElementById('productNameEn').value = product.nameEn || '';
    document.getElementById('productCost').value = product.cost ?? '';
    document.getElementById('productPrice').value = product.price ?? '';
    unitSelect.value = product.unitId || '';
    countrySelect.value = product.countryOriginId || '';
    const fallbackOpeningQty = product.mainBranchId
      ? product.stockByBranch?.[product.mainBranchId]
      : undefined;
    if (openingQtyInput) {
      openingQtyInput.value = product.openingQty ?? fallbackOpeningQty ?? '';
      openingQtyInput.readOnly = true;
    }
    document.getElementById('productMinStock').value = product.minStock ?? '';
    document.getElementById('productReorderPoint').value = product.reorderPoint ?? '';
    document.getElementById('productMaxStock').value = product.maxStock ?? '';
    if (fixedExpiryToggle) fixedExpiryToggle.checked = Boolean(product.fixedExpiryEnabled);
    if (fixedProductionDateInput) fixedProductionDateInput.value = product.fixedProductionDate || '';
    if (fixedExpiryDateInput) fixedExpiryDateInput.value = product.fixedExpiryDate || '';
  } else {
    codeInput.value = generateProductCode();
    barcodeInput.value = generateBarcodeValue();
    if (openingQtyInput) openingQtyInput.readOnly = false;
    if (fixedExpiryToggle) fixedExpiryToggle.checked = false;
    if (fixedProductionDateInput) fixedProductionDateInput.value = '';
    if (fixedExpiryDateInput) fixedExpiryDateInput.value = '';
  }
  syncFixedExpiryFields();
  if (fixedExpiryToggle) fixedExpiryToggle.onchange = syncFixedExpiryFields;

  setupUnitDefinitionControls('product', product);

  renderBarcodePreview();
  els.productModal.classList.remove('hidden');

  document.getElementById('generateBarcode').onclick = () => {
    barcodeInput.value = generateBarcodeValue();
    renderBarcodePreview();
  };

  barcodeInput.oninput = () => renderBarcodePreview();

  document.getElementById('downloadBarcode').onclick = () => downloadBarcodeImage(barcodeInput.value, codeInput.value);

  form.onsubmit = (e) => {
    e.preventDefault();
    saveProduct();
  };
}

function closeProductModal() {
  if (els.productModal) {
    els.productModal.classList.add('hidden');
  }
}

function saveProduct() {
  const form = els.productForm;
  const editId = form.dataset.editId;
  const existingProduct = editId ? state.cache.products?.[editId] || null : null;
  const rawCode = document.getElementById('productCode').value.trim();
  const barcode = document.getElementById('productBarcode').value.trim();
  const nameAr = document.getElementById('productNameAr').value.trim();
  const nameEn = document.getElementById('productNameEn').value.trim();
  const cost = Number(document.getElementById('productCost').value || 0);
  const price = Number(document.getElementById('productPrice').value || 0);
  const unitId = document.getElementById('productUnit').value;
  const countryOriginId = document.getElementById('productCountryOrigin')?.value || null;
  const fixedExpiryEnabled = Boolean(document.getElementById('productFixedExpiryEnabled')?.checked);
  const fixedProductionDate = document.getElementById('productFixedProductionDate')?.value || '';
  const fixedExpiryDate = document.getElementById('productFixedExpiryDate')?.value || '';
  const unitDefinitionQtyRaw = document.getElementById('productUnitDefinitionQty')?.value.trim() || '';
  const unitDefinitionUnitId = document.getElementById('productUnitDefinitionUnit')?.value || '';
  const openingQtyInput = Number(document.getElementById('productOpeningQty').value || 0);
  const existingMainBranchId = existingProduct?.mainBranchId;
  const existingFallbackOpeningQty = existingMainBranchId
    ? existingProduct?.stockByBranch?.[existingMainBranchId]
    : undefined;
  const openingQty = editId
    ? Number(existingProduct?.openingQty ?? existingFallbackOpeningQty ?? openingQtyInput)
    : openingQtyInput;
  const minStock = Number(document.getElementById('productMinStock').value || 0);
  const reorderPoint = Number(document.getElementById('productReorderPoint').value || 0);
  const maxStock = Number(document.getElementById('productMaxStock').value || 0);

  if (!nameAr || !nameEn || !unitId) {
    els.productError.textContent = window.i18n.t('error');
    return;
  }
  if ((unitDefinitionQtyRaw && !unitDefinitionUnitId) || (!unitDefinitionQtyRaw && unitDefinitionUnitId)) {
    els.productError.textContent = window.i18n.t('error');
    return;
  }
  if (fixedExpiryEnabled && (!fixedProductionDate || !fixedExpiryDate)) {
    els.productError.textContent = 'اختر تاريخ الإنتاج وتاريخ الانتهاء';
    return;
  }
  const unitDefinitionQty = unitDefinitionQtyRaw && unitDefinitionUnitId ? unitDefinitionQtyRaw : null;
  const unitDefinitionUnitIdFinal = unitDefinitionQtyRaw && unitDefinitionUnitId ? unitDefinitionUnitId : null;

  const payload = {
    code: editId ? rawCode : normalizeCode(rawCode, 'FG'),
    barcode,
    nameAr,
    nameEn,
    cost,
    price,
    unitId,
    countryOriginId: countryOriginId || null,
    fixedExpiryEnabled,
    fixedProductionDate: fixedExpiryEnabled ? fixedProductionDate : null,
    fixedExpiryDate: fixedExpiryEnabled ? fixedExpiryDate : null,
    unitDefinitionQty,
    unitDefinitionUnitId: unitDefinitionUnitIdFinal,
    openingQty,
    minStock,
    reorderPoint,
    maxStock
  };

  if (editId) {
    db.ref(`products/${editId}`).update(payload).then(() => {
      closeProductModal();
    });
  } else {
    const mainBranchId = getMainBranchId();
    payload.mainBranchId = mainBranchId;
    payload.stockByBranch = mainBranchId ? { [mainBranchId]: openingQty } : {};
    db.ref('products').push(payload).then(() => {
      closeProductModal();
    });
  }
}

function generateFixedCode(prefix) {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${digits}`;
}

function normalizeCode(value, prefix) {
  const text = String(value || '').trim().toUpperCase();
  if (text && text.startsWith(`${prefix}-`) && /\d{4}$/.test(text)) {
    return text;
  }
  if (text && text.startsWith(prefix)) {
    const digits = text.replace(/\D/g, '').slice(-4);
    if (digits) {
      return `${prefix}-${digits.padStart(4, '0')}`;
    }
  }
  return generateFixedCode(prefix);
}

function generateProductCode() {
  return generateFixedCode('FG');
}

function generateMaterialCode() {
  return generateFixedCode('SK');
}

function generateBarcodeValue() {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

function renderBarcodePreview() {
  const value = document.getElementById('productBarcode').value.trim();
  const canvas = document.getElementById('barcodePreview');
  if (!canvas || !value || typeof JsBarcode === 'undefined') return;
  JsBarcode(canvas, value, { format: 'CODE128', displayValue: true, height: 60 });
}

function downloadBarcodeImage(value, code) {
  const canvas = document.getElementById('barcodePreview');
  if (!canvas) return;
  canvas.toBlob((blob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${code || value}.png`;
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

async function downloadBarcodesZip() {
  if (typeof JSZip === 'undefined' || typeof JsBarcode === 'undefined') return;
  const products = state.cache.products || {};
  const selected = Array.from(state.selectedProducts).map((id) => products[id]).filter(Boolean);
  if (selected.length === 0) return;

  const zip = new JSZip();
  for (const product of selected) {
    const value = product.barcode || generateBarcodeValue();
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, value, { format: 'CODE128', displayValue: true, height: 60 });
    const blob = await new Promise((resolve) => canvas.toBlob(resolve));
    const name = (product.nameAr || product.nameEn || product.code || value).replace(/[\\/:*?\"<>|]/g, '-');
    zip.file(`${name}.png`, blob);
  }
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(zipBlob);
  link.download = 'barcodes.zip';
  link.click();
  URL.revokeObjectURL(link.href);
}

function toggleSelectAllProducts(checked) {
  const table = document.getElementById('productsTable');
  if (!table) return;
  table.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = checked;
    const id = checkbox.dataset.id;
    if (checked) {
      state.selectedProducts.add(id);
    } else {
      state.selectedProducts.delete(id);
    }
  });
}

function exportSelectedProducts() {
  const products = state.cache.products || {};
  const selected = Array.from(state.selectedProducts).map((id) => products[id]).filter(Boolean);
  if (selected.length === 0) return;
  if (typeof XLSX === 'undefined') return;

  const data = selected.map((product) => ({
    code: product.code,
    nameAr: product.nameAr,
    nameEn: product.nameEn,
    cost: product.cost,
    price: product.price,
    unitId: product.unitId,
    openingQty: product.openingQty,
    minStock: product.minStock,
    reorderPoint: product.reorderPoint,
    maxStock: product.maxStock,
    barcode: product.barcode,
    countryOriginId: product.countryOriginId || ''
  }));
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
  XLSX.writeFile(workbook, 'products.xlsx');
}

function downloadProductTemplate() {
  if (typeof XLSX === 'undefined') return;
  const useArabic = window.i18n.getLanguage() === 'ar';
  const template = [
    {
      [useArabic ? 'الاسم بالعربي' : 'nameAr']: '',
      [useArabic ? 'الاسم بالانجليزي' : 'nameEn']: '',
      [useArabic ? 'التكلفة' : 'cost']: '',
      [useArabic ? 'سعر البيع' : 'price']: '',
      [useArabic ? 'الوحدة' : 'unitId']: '',
      [useArabic ? 'الرصيد الافتتاحي' : 'openingQty']: '',
      [useArabic ? 'الحد الادنى للطلب' : 'minStock']: '',
      [useArabic ? 'نقطة اعادة الطلب' : 'reorderPoint']: '',
      [useArabic ? 'الحد الأعلى للطلب' : 'maxStock']: '',
      [useArabic ? 'الباركود' : 'barcode']: '',
      [useArabic ? 'بلد المنشأ' : 'countryOriginId']: ''
    }
  ];
  const worksheet = XLSX.utils.json_to_sheet(template);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
  XLSX.writeFile(workbook, 'product-template.xlsx');
}

function handleBulkImportFile(file) {
  if (!file || typeof XLSX === 'undefined') return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const sourceRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    const prepared = prepareImportedProducts(sourceRows
      .filter((row) => !isImportRowEmpty(row))
      .map((row) => mapImportRow(row, productImportMap)));
    state.importedProducts = prepared.rows;
    const statusParts = [`${window.i18n.t('import_loaded')} ${prepared.rows.length}`];
    if (prepared.duplicateInFileCount > 0) {
      statusParts.push(`${window.i18n.t('duplicates_in_file')}: ${prepared.duplicateInFileCount}`);
    }
    if (prepared.existingCount > 0) {
      statusParts.push(`${window.i18n.t('existing_products_skipped')}: ${prepared.existingCount}`);
    }
    setImportUiState('products', {
      statusText: statusParts.join(' | '),
      counterText: state.importedProducts.length > 0 ? `${window.i18n.t('ready_to_import')}: ${state.importedProducts.length}` : ''
    });
  };
  reader.readAsArrayBuffer(file);
}

function importBulkProducts() {
  const rows = state.importedProducts;
  if (!rows || rows.length === 0) return;
  const mainBranchId = getMainBranchId();
  importRowsWithProgress({
    type: 'products',
    path: 'products',
    rows,
    buildPayload: (row) => buildImportedProductPayload(row, mainBranchId),
    title: `${window.i18n.t('importing')} ${window.i18n.t('products')}`
  });
}

function getMainBranchId() {
  const branches = state.cache.branches || {};
  const entry = Object.entries(branches).find(([, branch]) => branch.isMain);
  return entry ? entry[0] : null;
}

function getItemStock(item, branchId) {
  const stockByBranch = item.stockByBranch || {};
  if (!branchId || branchId === 'all') {
    const value = stockByBranch[item.mainBranchId] ?? item.openingQty ?? item.stock ?? 0;
    return Number(value || 0);
  }
  return Number(stockByBranch[branchId] || 0);
}

function getProductStock(product, branchId) {
  return getItemStock(product, branchId);
}

function getSalesMap() {
  const orders = state.cache.orders || {};
  const map = {};
  Object.values(orders).forEach((order) => {
    if (!order.items) return;
    order.items.forEach((item) => {
      map[item.productId] = (map[item.productId] || 0) + Number(item.qty || 0);
    });
  });
  return map;
}

function getReorderClass(stock, reorderPoint) {
  if (!reorderPoint || reorderPoint <= 0) return '';
  if (stock <= reorderPoint) return 'reorder-critical';
  if (stock <= reorderPoint * 1.2) return 'reorder-warning';
  return '';
}

function updateReorderNotice() {
  if (!els.reorderNotice) return;
  const role = state.role;
  if (role !== 'storekeeper' && role !== 'manager') {
    els.reorderNotice.classList.add('hidden');
    els.reorderNotice.classList.remove('notice-alert');
    return;
  }
  const pendingMovesCount = Object.values(state.cache.pendingStockMoves || {}).filter((move) => (move.status || 'pending') === 'pending').length;
  const entries = [];

  if (role === 'manager' && pendingMovesCount > 0) {
    entries.push({
      key: 'pending_moves',
      text: `${window.i18n.t('pending_stock_moves')}: ${pendingMovesCount}`,
      action: { section: 'pendingStockMoves', label: window.i18n.t('view') }
    });
  }

  if (role === 'storekeeper') {
    const products = state.cache.products || {};
    const materials = state.cache.stockMaterials || {};
    const mainBranchId = getMainBranchId();
    const productNeeds = Object.values(products).filter((product) => {
      const stock = getProductStock(product, mainBranchId);
      const reorderPoint = Number(product.reorderPoint || 0);
      return reorderPoint > 0 && stock <= reorderPoint;
    });
    const materialNeeds = Object.values(materials).filter((material) => {
      const stock = getItemStock(material, mainBranchId);
      const reorderPoint = Number(material.reorderPoint || 0);
      return reorderPoint > 0 && stock <= reorderPoint;
    });
    const needsCount = productNeeds.length + materialNeeds.length;
    const nearExpiryProducts = new Set();
    Object.values(state.cache.production || {}).forEach((rec) => {
      if ((rec.itemType || 'product') !== 'product') return;
      if (!rec.itemId) return;
      if (isNearExpiryDate(rec.expiryDate, 7)) {
        nearExpiryProducts.add(rec.itemId);
      }
    });
    const nearExpiryCount = nearExpiryProducts.size;
    const reorderText = needsCount > 0
      ? `${needsCount} ${window.i18n.t('products')} ${window.i18n.t('needs_reorder')}.`
      : '';
    const nearExpiryText = nearExpiryCount > 0
      ? `${nearExpiryCount} ${window.i18n.t('near_expiry_products_notice')}.`
      : '';
    if (reorderText) {
      entries.push({
        key: 'reorder',
        text: reorderText,
        action: {
          section: productNeeds.length > 0 ? 'products' : 'stockMaterials',
          label: window.i18n.t('view')
        }
      });
    }
    if (nearExpiryText) {
      entries.push({
        key: 'near_expiry',
        text: nearExpiryText,
        action: { section: 'productionFollowUp', label: window.i18n.t('production_followup') }
      });
    }
  }

  const visibleEntries = entries.filter((entry) => !state.dismissedNoticeKeys?.[entry.key]);
  if (!visibleEntries.length) {
    els.reorderNotice.classList.add('hidden');
    els.reorderNotice.classList.remove('notice-alert');
    return;
  }

  els.reorderNotice.classList.remove('hidden');
  els.reorderNotice.classList.add('notice-alert');
  els.reorderNotice.innerHTML = visibleEntries.map((entry, index) => `
    <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: ${index === visibleEntries.length - 1 ? '0' : '6px'};">
      <span>${entry.text}</span>
      ${entry.action ? `<button class="btn ghost small" data-notice-key="${entry.key}" data-section="${entry.action.section}">${entry.action.label}</button>` : ''}
    </div>
  `).join('');

  els.reorderNotice.querySelectorAll('[data-notice-key]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-notice-key') || '';
      const section = button.getAttribute('data-section') || '';
      if (!state.dismissedNoticeKeys) state.dismissedNoticeKeys = {};
      state.dismissedNoticeKeys[key] = true;
      updateReorderNotice();
      if (section) selectSection(section);
    });
  });
}

function setupProductInfoSection() {
  const section = document.getElementById('section-productInfo');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h2>معلومات المنتجات</h2>
        <button id="addProductInfoBtn" class="btn primary">إضافة منتجات</button>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="productInfoSearch" class="input" style="max-width: 320px;" placeholder="بحث باسم المنتج أو الباركود" />
        <div class="row" style="gap: 8px;">
          <span class="helper">عدد العناصر</span>
          <select id="productInfoPageSize" class="input" style="max-width: 110px;">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>اسم المنتج</th>
            <th>المكونات</th>
            <th>بلد المنشأ</th>
            <th>الباركود</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody id="productInfoTable"></tbody>
      </table>
      ${buildPaginationBarHtml('productInfoPageInfo', 'productInfoPagination')}
    </div>
    <div id="productInfoPickerOverlay" class="overlay hidden">
      <div class="modal lg" style="max-width: 980px; width: 100%; text-align: start;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>إضافة منتجات</h3>
          <button id="productInfoPickerClose" class="btn ghost small">×</button>
        </div>
        <input id="productInfoPickerSearch" class="input" style="margin-top: 12px;" placeholder="بحث باسم المنتج أو الباركود" />
        <div class="notice" style="margin-top: 12px;">
          <span id="productInfoPickerSelectedCount">0 منتج محدد</span>
        </div>
        <div id="productInfoPickerResults" class="grid two" style="margin-top: 12px; max-height: 420px; overflow: auto;"></div>
        <div class="row" style="justify-content: flex-end; margin-top: 14px;">
          <button id="productInfoPickerCancel" class="btn ghost">إلغاء</button>
          <button id="productInfoPickerAdd" class="btn primary">إضافة</button>
        </div>
      </div>
    </div>
  `;

  const search = document.getElementById('productInfoSearch');
  const pageSize = document.getElementById('productInfoPageSize');
  const addBtn = document.getElementById('addProductInfoBtn');
  if (search) {
    search.value = state.productInfoFilters.query || '';
    search.addEventListener('input', () => {
      state.productInfoFilters.query = search.value || '';
      state.productInfoFilters.currentPage = 1;
      renderProductInfoSection();
    });
  }
  if (pageSize) {
    pageSize.value = String(state.productInfoFilters.pageSize || 20);
    pageSize.addEventListener('change', () => {
      state.productInfoFilters.pageSize = Number(pageSize.value || 20);
      state.productInfoFilters.currentPage = 1;
      renderProductInfoSection();
    });
  }
  if (addBtn) addBtn.addEventListener('click', () => openProductInfoPicker());

  document.getElementById('productInfoPickerClose')?.addEventListener('click', closeProductInfoPicker);
  document.getElementById('productInfoPickerCancel')?.addEventListener('click', closeProductInfoPicker);
  document.getElementById('productInfoPickerAdd')?.addEventListener('click', addSelectedProductInfos);
  document.getElementById('productInfoPickerSearch')?.addEventListener('input', (event) => {
    state.productInfoPicker.query = event.target.value || '';
    renderProductInfoPickerResults();
  });

  renderProductInfoSection();
}

function getProductInfoByProductId(productId) {
  if (!productId) return null;
  const infos = state.cache.productInfos || {};
  return infos[productId] || Object.values(infos).find((info) => (info.productId || info.id) === productId) || null;
}

function getProductInfoEntryId(productId, info) {
  if (!productId && !info) return '';
  const infos = state.cache.productInfos || {};
  if (productId && infos[productId]) return productId;
  const found = Object.entries(infos).find(([, item]) => (item.productId || item.id) === productId || item === info);
  return found?.[0] || productId || '';
}

function getProductInfoRows() {
  const products = state.cache.products || {};
  const infos = state.cache.productInfos || {};
  const query = normalizeSearchValue(state.productInfoFilters.query || '');
  return Object.entries(infos)
    .map(([id, info]) => {
      const productId = info.productId || id;
      const product = products[productId] || {};
      return { id, productId, info: { id, ...info }, product };
    })
    .filter((row) => {
      if (!query) return true;
      const text = normalizeSearchValue([
        row.product.nameAr,
        row.product.nameEn,
        row.product.name,
        row.info.productName,
        row.info.ingredients,
        row.info.origin,
        row.info.barcode,
        row.product.barcode
      ].join(' '));
      return text.includes(query);
    })
    .sort((a, b) => (getLocalizedName(a.product) || a.info.productName || '').localeCompare(getLocalizedName(b.product) || b.info.productName || '', 'ar'));
}

function renderProductInfoSection() {
  const table = document.getElementById('productInfoTable');
  if (!table) return;
  const search = document.getElementById('productInfoSearch');
  const pageSize = document.getElementById('productInfoPageSize');
  if (search && search.value !== (state.productInfoFilters.query || '')) search.value = state.productInfoFilters.query || '';
  if (pageSize) pageSize.value = String(state.productInfoFilters.pageSize || 20);

  const rows = getProductInfoRows();
  const pagination = paginateEntries(rows, state.productInfoFilters);
  updatePaginationControls({
    infoId: 'productInfoPageInfo',
    containerId: 'productInfoPagination',
    filters: state.productInfoFilters,
    totalItems: rows.length,
    onPageChange: (page) => {
      state.productInfoFilters.currentPage = page;
      renderProductInfoSection();
    }
  });

  table.innerHTML = '';
  if (!rows.length) {
    table.innerHTML = '<tr><td colspan="5">لا توجد معلومات منتجات</td></tr>';
    return;
  }

  pagination.items.forEach((row) => {
    const productName = getLocalizedName(row.product) !== '-' ? getLocalizedName(row.product) : (row.info.productName || '-');
    const productNameEn = row.product.nameEn || '';
    const barcode = row.info.barcode || row.product.barcode || '';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <strong>${escapeHtml(productName)}</strong>
        ${productNameEn ? `<div class="helper">${escapeHtml(productNameEn)}</div>` : ''}
      </td>
      <td>
        <textarea class="input" rows="2" data-field="ingredients" data-id="${row.id}">${escapeHtml(row.info.ingredients || '')}</textarea>
      </td>
      <td>
        <input class="input" data-field="origin" data-id="${row.id}" value="${escapeHtml(row.info.origin || '')}" />
      </td>
      <td>
        <input class="input" dir="ltr" data-field="barcode" data-id="${row.id}" value="${escapeHtml(barcode)}" />
      </td>
      <td>
        <button class="btn danger small" data-action="delete" data-id="${row.id}">حذف</button>
      </td>
    `;
    table.appendChild(tr);
  });

  table.querySelectorAll('[data-field]').forEach((input) => {
    input.addEventListener('change', () => {
      const field = input.dataset.field;
      const value = field === 'barcode'
        ? normalizeDigits(input.value || '').trim()
        : String(input.value || '').trim();
      if (field === 'barcode') input.value = value;
      updateProductInfoField(input.dataset.id, field, value);
    });
  });
  table.querySelectorAll('[data-action="delete"]').forEach((button) => {
    button.addEventListener('click', () => deleteProductInfo(button.dataset.id));
  });
}

function updateProductInfoField(infoId, field, value) {
  if (!infoId || !field) return;
  db.ref(`productInfos/${infoId}/${field}`).set(value).then(() => {
    showCopyNotice('تم الحفظ');
  }).catch((error) => {
    console.error('Product info save failed:', error);
    alert('تعذر حفظ معلومات المنتج');
  });
}

function deleteProductInfo(infoId) {
  if (!infoId) return;
  if (!confirm('هل تريد حذف معلومات هذا المنتج؟')) return;
  db.ref(`productInfos/${infoId}`).remove().catch((error) => {
    console.error('Product info delete failed:', error);
    alert('تعذر حذف معلومات المنتج');
  });
}

function openProductInfoPicker() {
  state.productInfoPicker.query = '';
  state.productInfoPicker.selectedIds = new Set();
  const overlay = document.getElementById('productInfoPickerOverlay');
  const search = document.getElementById('productInfoPickerSearch');
  if (search) search.value = '';
  renderProductInfoPickerResults();
  overlay?.classList.remove('hidden');
  setTimeout(() => search?.focus(), 50);
}

function closeProductInfoPicker() {
  document.getElementById('productInfoPickerOverlay')?.classList.add('hidden');
}

function getProductInfoPickerRows() {
  const query = normalizeSearchValue(state.productInfoPicker.query || '');
  const existing = new Set(Object.entries(state.cache.productInfos || {}).map(([id, info]) => info.productId || id));
  if (!query) return [];
  return Object.entries(state.cache.products || {})
    .map(([id, product]) => ({ id, product }))
    .filter((row) => !existing.has(row.id))
    .filter((row) => normalizeSearchValue([row.product.nameAr, row.product.nameEn, row.product.name, row.product.barcode, row.product.code].join(' ')).includes(query))
    .sort((a, b) => (getLocalizedName(a.product) || '').localeCompare(getLocalizedName(b.product) || '', 'ar'))
    .slice(0, 80);
}

function renderProductInfoPickerResults() {
  const container = document.getElementById('productInfoPickerResults');
  const counter = document.getElementById('productInfoPickerSelectedCount');
  const addBtn = document.getElementById('productInfoPickerAdd');
  if (!container) return;
  const selected = state.productInfoPicker.selectedIds || new Set();
  if (counter) counter.textContent = `${selected.size} منتج محدد`;
  if (addBtn) addBtn.disabled = selected.size === 0;
  const rows = getProductInfoPickerRows();
  if (!state.productInfoPicker.query) {
    container.innerHTML = '<p class="helper">اكتب في البحث لعرض المنتجات بدون تحميل القائمة كاملة.</p>';
    return;
  }
  if (!rows.length) {
    container.innerHTML = '<p class="helper">لا توجد منتجات مطابقة أو كل النتائج مضافة مسبقاً.</p>';
    return;
  }
  container.innerHTML = '';
  rows.forEach(({ id, product }) => {
    const card = document.createElement('label');
    card.className = 'notice row';
    card.style.justifyContent = 'space-between';
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <span>
        <strong>${escapeHtml(getLocalizedName(product))}</strong>
        ${product.nameEn ? `<div class="helper">${escapeHtml(product.nameEn)}</div>` : ''}
        <div class="helper">${escapeHtml(product.barcode || product.code || 'بدون باركود')}</div>
      </span>
      <input type="checkbox" value="${id}" ${selected.has(id) ? 'checked' : ''} />
    `;
    const checkbox = card.querySelector('input');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) selected.add(id);
      else selected.delete(id);
      renderProductInfoPickerResults();
    });
    container.appendChild(card);
  });
}

function addSelectedProductInfos() {
  const selected = Array.from(state.productInfoPicker.selectedIds || []);
  if (!selected.length) return;
  const updates = {};
  selected.forEach((productId) => {
    const product = state.cache.products?.[productId];
    if (!product) return;
    updates[productId] = {
      id: productId,
      productId,
      productName: getLocalizedName(product),
      ingredients: '',
      origin: '',
      barcode: product.barcode || '',
      createdAt: Date.now()
    };
  });
  if (!Object.keys(updates).length) return;
  db.ref('productInfos').update(updates).then(() => {
    closeProductInfoPicker();
    showCopyNotice('تمت إضافة المنتجات');
  }).catch((error) => {
    console.error('Add product infos failed:', error);
    alert('تعذر إضافة المنتجات');
  });
}

function setupProductCategoriesSection() {
  const section = document.getElementById('section-productCategories');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('product_categories')}</h2>
        <div class="row">
          <button id="addCategoryBtn" class="btn primary">${window.i18n.t('add')}</button>
          <button id="addSubCategoryBtn" class="btn ghost">${window.i18n.t('add_subcategory')}</button>
          <button id="assignProductsBtn" class="btn ghost">${window.i18n.t('add_product_to_category')}</button>
          <button id="categoryBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px;">
        <input id="categorySearch" class="input" placeholder="${window.i18n.t('search')}" />
      </div>
      <div id="categoryBreadcrumb" class="helper" style="margin-top: 8px;"></div>
      <div id="categoryList" class="grid two" style="margin-top: 12px;"></div>
      <div id="categoryProductsArea" style="margin-top: 16px;">
        <h4>${window.i18n.t('products')}</h4>
        <div id="categoryProductsList" class="grid two"></div>
      </div>
    </div>
  `;

  bindCategorySection();
  renderProductCategoriesSection();
}

function bindCategorySection() {
  document.getElementById('addCategoryBtn').addEventListener('click', () => openCategoryModal());
  document.getElementById('addSubCategoryBtn').addEventListener('click', () => openCategoryModal(state.activeCategoryId));
  document.getElementById('assignProductsBtn').addEventListener('click', () => openCategoryProductsModal());
  document.getElementById('categoryBackBtn').addEventListener('click', () => goCategoryBack());
  bindDebouncedQueryInput(document.getElementById('categorySearch'), () => renderProductCategoriesSection());

  els.categoryForm.onsubmit = (e) => {
    e.preventDefault();
    saveCategory();
  };

  if (els.categoryProductsSave) {
    els.categoryProductsSave.addEventListener('click', () => saveCategoryProducts());
  }
}

function renderProductCategoriesSection() {
  const list = document.getElementById('categoryList');
  if (!list) return;
  const categories = state.cache.productCategories || {};
  const search = document.getElementById('categorySearch')?.value.trim().toLowerCase() || '';
  const parentId = state.activeCategoryId || null;
  const addSubBtn = document.getElementById('addSubCategoryBtn');
  const assignBtn = document.getElementById('assignProductsBtn');
  const backBtn = document.getElementById('categoryBackBtn');
  if (addSubBtn) addSubBtn.disabled = !parentId;
  if (assignBtn) assignBtn.disabled = !parentId;
  if (backBtn) backBtn.disabled = !parentId;

  const entries = Object.entries(categories)
    .filter(([, cat]) => (cat.parentId || null) === parentId)
    .filter(([, cat]) => {
      if (!search) return true;
      const name = `${cat.nameAr || ''} ${cat.nameEn || ''} ${cat.name || ''}`.toLowerCase();
      return name.includes(search);
    });

  list.innerHTML = '';
  if (entries.length === 0) {
    list.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
  }

  entries.forEach(([id, cat]) => {
    const productCount = countProductsByCategory(id);
    const childCategoryCount = countChildCategories(id);
    const countText = childCategoryCount > 0 && productCount === 0
      ? `${childCategoryCount} ${window.i18n.t('subcategories')}`
      : `${productCount} ${window.i18n.t('products')}`;
    const card = document.createElement('div');
    card.className = 'card light';
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${getLocalizedName(cat)}</strong>
          <div class="helper">${countText}</div>
        </div>
        <div class="row">
          <button class="btn ghost small" data-action="open">${window.i18n.t('view')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="open"]').addEventListener('click', () => {
      state.categoryPath.push(id);
      state.activeCategoryId = id;
      renderProductCategoriesSection();
    });
    card.querySelector('[data-action="edit"]').addEventListener('click', () => {
      openCategoryModal(cat.parentId || null, id);
    });
    card.querySelector('[data-action="delete"]').addEventListener('click', () => deleteCategory(id));
    list.appendChild(card);
  });

  renderCategoryBreadcrumb();
  renderCategoryProductsList();
}

function renderCategoryBreadcrumb() {
  const breadcrumb = document.getElementById('categoryBreadcrumb');
  if (!breadcrumb) return;
  const categories = state.cache.productCategories || {};
  if (!state.activeCategoryId) {
    breadcrumb.textContent = window.i18n.t('main');
    return;
  }
  const names = state.categoryPath.map((id) => getLocalizedName(categories[id]));
  breadcrumb.textContent = names.join(' / ');
}

function renderCategoryProductsList() {
  const container = document.getElementById('categoryProductsList');
  if (!container) return;
  const products = state.cache.products || {};
  const currentCategoryId = state.activeCategoryId;
  const entries = Object.entries(products).filter(([, product]) => product.categoryId === currentCategoryId);
  container.innerHTML = '';
  if (!currentCategoryId) {
    container.innerHTML = `<p class="helper">${window.i18n.t('select')}</p>`;
    return;
  }
  if (entries.length === 0) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  entries.forEach(([id, product]) => {
    const item = document.createElement('div');
    item.className = 'notice';
    item.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <span>${getLocalizedName(product)}</span>
        <button class="btn danger small" data-action="remove">${window.i18n.t('delete')}</button>
      </div>
    `;
    item.querySelector('[data-action="remove"]').addEventListener('click', () => {
      db.ref(`products/${id}/categoryId`).set(null);
    });
    container.appendChild(item);
  });
}

function openCategoryModal(parentId = null, editId = null) {
  if (!els.categoryModal) return;
  els.categoryForm.reset();
  els.categoryError.textContent = '';
  els.categoryForm.dataset.parentId = parentId || '';
  if (editId) {
    const category = state.cache.productCategories?.[editId];
    els.categoryForm.dataset.editId = editId;
    document.getElementById('categoryNameAr').value = category?.nameAr || '';
    document.getElementById('categoryNameEn').value = category?.nameEn || '';
  } else {
    delete els.categoryForm.dataset.editId;
  }
  els.categoryModal.classList.remove('hidden');
}

function closeCategoryModal() {
  if (els.categoryModal) {
    els.categoryModal.classList.add('hidden');
  }
}

function saveCategory() {
  const nameAr = document.getElementById('categoryNameAr').value.trim();
  const nameEn = document.getElementById('categoryNameEn').value.trim();
  if (!nameAr || !nameEn) {
    els.categoryError.textContent = window.i18n.t('error');
    return;
  }
  const parentId = els.categoryForm.dataset.parentId || null;
  const editId = els.categoryForm.dataset.editId;
  const payload = { nameAr, nameEn, parentId };
  if (editId) {
    db.ref(`productCategories/${editId}`).update(payload).then(() => closeCategoryModal());
  } else {
    db.ref('productCategories').push(payload).then(() => closeCategoryModal());
  }
}

function goCategoryBack() {
  state.categoryPath.pop();
  state.activeCategoryId = state.categoryPath[state.categoryPath.length - 1] || null;
  renderProductCategoriesSection();
}

function deleteCategory(categoryId) {
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const categories = state.cache.productCategories || {};
  const products = state.cache.products || {};
  const toDelete = collectCategoryTree(categoryId, categories);
  const updates = {};
  Object.keys(products).forEach((productId) => {
    if (toDelete.includes(products[productId].categoryId)) {
      updates[`products/${productId}/categoryId`] = null;
    }
  });
  toDelete.forEach((id) => {
    updates[`productCategories/${id}`] = null;
  });
  db.ref().update(updates);
}

function collectCategoryTree(rootId, categories) {
  const ids = [rootId];
  Object.entries(categories).forEach(([id, cat]) => {
    if (cat.parentId === rootId) {
      ids.push(...collectCategoryTree(id, categories));
    }
  });
  return ids;
}

function countProductsByCategory(categoryId) {
  const products = state.cache.products || {};
  return Object.values(products).filter((product) => product.categoryId === categoryId).length;
}

function countChildCategories(categoryId) {
  const categories = state.cache.productCategories || {};
  return Object.values(categories).filter((category) => (category.parentId || null) === categoryId).length;
}

function openCategoryProductsModal() {
  if (!state.activeCategoryId) return;
  if (!els.categoryProductsModal) return;
  renderCategoryProductList();
  els.categoryProductsModal.classList.remove('hidden');
}

function closeCategoryProductsModal() {
  if (els.categoryProductsModal) {
    els.categoryProductsModal.classList.add('hidden');
  }
}

function renderCategoryProductList() {
  const list = els.categoryProductList;
  const search = (els.categoryProductSearch?.value || '').trim().toLowerCase();
  if (!list) return;
  list.innerHTML = '';
  const products = state.cache.products || {};
  const entries = Object.entries(products).filter(([, product]) => !product.categoryId || product.categoryId === state.activeCategoryId);
  entries
    .filter(([, product]) => {
      if (!search) return true;
      const name = `${product.nameAr || ''} ${product.nameEn || ''}`.toLowerCase();
      return name.includes(search);
    })
    .forEach(([id, product]) => {
      const item = document.createElement('div');
      item.className = 'notice';
      item.innerHTML = `
        <label class="row" style="justify-content: space-between; width: 100%;">
          <span>${getLocalizedName(product)}</span>
          <input type="checkbox" data-id="${id}" />
        </label>
      `;
      list.appendChild(item);
    });

  els.categoryProductSearch.oninput = () => renderCategoryProductList();
}

function saveCategoryProducts() {
  const checkboxes = els.categoryProductList.querySelectorAll('input[type="checkbox"]:checked');
  const updates = {};
  checkboxes.forEach((checkbox) => {
    updates[`products/${checkbox.dataset.id}/categoryId`] = state.activeCategoryId;
  });
  db.ref().update(updates).then(() => {
    closeCategoryProductsModal();
  });
}

function setupMaterialCategoriesSection() {
  const section = document.getElementById('section-materialCategories');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('material_categories')}</h2>
        <div class="row">
          <button id="addMaterialCategoryBtn" class="btn primary">${window.i18n.t('add')}</button>
          <button id="addMaterialSubCategoryBtn" class="btn ghost">${window.i18n.t('add_subcategory')}</button>
          <button id="assignMaterialBtn" class="btn ghost">${window.i18n.t('add_product_to_category')}</button>
          <button id="materialCategoryBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px;">
        <input id="materialCategorySearch" class="input" placeholder="${window.i18n.t('search')}" />
      </div>
      <div id="materialCategoryBreadcrumb" class="helper" style="margin-top: 8px;"></div>
      <div id="materialCategoryList" class="grid two" style="margin-top: 12px;"></div>
      <div id="materialCategoryProductsArea" style="margin-top: 16px;">
        <h4>${window.i18n.t('stock_materials')}</h4>
        <div id="materialCategoryProductsList" class="grid two"></div>
      </div>
    </div>
  `;

  bindMaterialCategorySection();
  renderMaterialCategoriesSection();
}

function bindMaterialCategorySection() {
  document.getElementById('addMaterialCategoryBtn').addEventListener('click', () => openMaterialCategoryModal());
  document.getElementById('addMaterialSubCategoryBtn').addEventListener('click', () => openMaterialCategoryModal(state.activeMaterialCategoryId));
  document.getElementById('assignMaterialBtn').addEventListener('click', () => openMaterialCategoryProductsModal());
  document.getElementById('materialCategoryBackBtn').addEventListener('click', () => goMaterialCategoryBack());
  bindDebouncedQueryInput(document.getElementById('materialCategorySearch'), () => renderMaterialCategoriesSection());

  if (els.materialCategoryForm) {
    els.materialCategoryForm.onsubmit = (e) => {
      e.preventDefault();
      saveMaterialCategory();
    };
  }

  if (els.materialCategoryProductsSave) {
    els.materialCategoryProductsSave.addEventListener('click', () => saveMaterialCategoryProducts());
  }
}

function renderMaterialCategoriesSection() {
  const list = document.getElementById('materialCategoryList');
  if (!list) return;
  const categories = state.cache.materialCategories || {};
  const search = document.getElementById('materialCategorySearch')?.value.trim().toLowerCase() || '';
  const parentId = state.activeMaterialCategoryId || null;
  const addSubBtn = document.getElementById('addMaterialSubCategoryBtn');
  const assignBtn = document.getElementById('assignMaterialBtn');
  const backBtn = document.getElementById('materialCategoryBackBtn');
  if (addSubBtn) addSubBtn.disabled = !parentId;
  if (assignBtn) assignBtn.disabled = !parentId;
  if (backBtn) backBtn.disabled = !parentId;

  const entries = Object.entries(categories)
    .filter(([, cat]) => (cat.parentId || null) === parentId)
    .filter(([, cat]) => {
      if (!search) return true;
      const name = `${cat.nameAr || ''} ${cat.nameEn || ''}`.toLowerCase();
      return name.includes(search);
    });

  list.innerHTML = '';
  if (entries.length === 0) {
    list.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
  }

  entries.forEach(([id, cat]) => {
    const count = countMaterialsByCategory(id);
    const card = document.createElement('div');
    card.className = 'card light';
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${getLocalizedName(cat)}</strong>
          <div class="helper">${count} ${window.i18n.t('stock_materials')}</div>
        </div>
        <div class="row">
          <button class="btn ghost small" data-action="open">${window.i18n.t('view')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="open"]').addEventListener('click', () => {
      state.materialCategoryPath.push(id);
      state.activeMaterialCategoryId = id;
      renderMaterialCategoriesSection();
    });
    card.querySelector('[data-action="edit"]').addEventListener('click', () => {
      openMaterialCategoryModal(cat.parentId || null, id);
    });
    card.querySelector('[data-action="delete"]').addEventListener('click', () => deleteMaterialCategory(id));
    list.appendChild(card);
  });

  renderMaterialCategoryBreadcrumb();
  renderMaterialCategoryProductsList();
}

function renderMaterialCategoryBreadcrumb() {
  const breadcrumb = document.getElementById('materialCategoryBreadcrumb');
  if (!breadcrumb) return;
  const categories = state.cache.materialCategories || {};
  if (!state.activeMaterialCategoryId) {
    breadcrumb.textContent = window.i18n.t('main');
    return;
  }
  const names = state.materialCategoryPath.map((id) => getLocalizedName(categories[id]));
  breadcrumb.textContent = names.join(' / ');
}

function renderMaterialCategoryProductsList() {
  const container = document.getElementById('materialCategoryProductsList');
  if (!container) return;
  const materials = state.cache.stockMaterials || {};
  const currentCategoryId = state.activeMaterialCategoryId;
  const entries = Object.entries(materials).filter(([, material]) => material.categoryId === currentCategoryId);
  container.innerHTML = '';
  if (!currentCategoryId) {
    container.innerHTML = `<p class="helper">${window.i18n.t('select')}</p>`;
    return;
  }
  if (entries.length === 0) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  entries.forEach(([id, material]) => {
    const item = document.createElement('div');
    item.className = 'notice';
    item.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <span>${getLocalizedName(material)}</span>
        <button class="btn danger small" data-action="remove">${window.i18n.t('delete')}</button>
      </div>
    `;
    item.querySelector('[data-action="remove"]').addEventListener('click', () => {
      db.ref(`stockMaterials/${id}/categoryId`).set(null);
    });
    container.appendChild(item);
  });
}

function openMaterialCategoryModal(parentId = null, editId = null) {
  if (!els.materialCategoryModal) return;
  els.materialCategoryForm.reset();
  els.materialCategoryError.textContent = '';
  els.materialCategoryForm.dataset.parentId = parentId || '';
  if (editId) {
    const category = state.cache.materialCategories?.[editId];
    els.materialCategoryForm.dataset.editId = editId;
    document.getElementById('materialCategoryNameAr').value = category?.nameAr || category?.name || '';
    document.getElementById('materialCategoryNameEn').value = category?.nameEn || '';
  } else {
    delete els.materialCategoryForm.dataset.editId;
  }
  els.materialCategoryModal.classList.remove('hidden');
}

function closeMaterialCategoryModal() {
  if (els.materialCategoryModal) {
    els.materialCategoryModal.classList.add('hidden');
  }
}

function saveMaterialCategory() {
  const nameAr = document.getElementById('materialCategoryNameAr').value.trim();
  const nameEn = document.getElementById('materialCategoryNameEn').value.trim();
  if (!nameAr || !nameEn) {
    els.materialCategoryError.textContent = window.i18n.t('error');
    return;
  }
  const parentId = els.materialCategoryForm.dataset.parentId || null;
  const editId = els.materialCategoryForm.dataset.editId;
  const payload = { nameAr, nameEn, parentId };
  if (editId) {
    db.ref(`materialCategories/${editId}`).update(payload).then(() => closeMaterialCategoryModal());
  } else {
    db.ref('materialCategories').push(payload).then(() => closeMaterialCategoryModal());
  }
}

function goMaterialCategoryBack() {
  state.materialCategoryPath.pop();
  state.activeMaterialCategoryId = state.materialCategoryPath[state.materialCategoryPath.length - 1] || null;
  renderMaterialCategoriesSection();
}

function deleteMaterialCategory(categoryId) {
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const categories = state.cache.materialCategories || {};
  const materials = state.cache.stockMaterials || {};
  const toDelete = collectMaterialCategoryTree(categoryId, categories);
  const updates = {};
  Object.keys(materials).forEach((materialId) => {
    if (toDelete.includes(materials[materialId].categoryId)) {
      updates[`stockMaterials/${materialId}/categoryId`] = null;
    }
  });
  toDelete.forEach((id) => {
    updates[`materialCategories/${id}`] = null;
  });
  db.ref().update(updates);
}

function collectMaterialCategoryTree(rootId, categories) {
  const ids = [rootId];
  Object.entries(categories).forEach(([id, cat]) => {
    if (cat.parentId === rootId) {
      ids.push(...collectMaterialCategoryTree(id, categories));
    }
  });
  return ids;
}

function countMaterialsByCategory(categoryId) {
  const materials = state.cache.stockMaterials || {};
  return Object.values(materials).filter((material) => material.categoryId === categoryId).length;
}

function openMaterialCategoryProductsModal() {
  if (!state.activeMaterialCategoryId) return;
  if (!els.materialCategoryProductsModal) return;
  renderMaterialCategoryProductList();
  els.materialCategoryProductsModal.classList.remove('hidden');
}

function closeMaterialCategoryProductsModal() {
  if (els.materialCategoryProductsModal) {
    els.materialCategoryProductsModal.classList.add('hidden');
  }
}

function renderMaterialCategoryProductList() {
  const list = els.materialCategoryProductList;
  const search = (els.materialCategoryProductSearch?.value || '').trim().toLowerCase();
  if (!list) return;
  list.innerHTML = '';
  const materials = state.cache.stockMaterials || {};
  const entries = Object.entries(materials).filter(([, material]) => !material.categoryId || material.categoryId === state.activeMaterialCategoryId);
  const filtered = entries.filter(([, material]) => {
    if (!search) return true;
    const name = `${material.nameAr || ''} ${material.nameEn || ''} ${material.name || ''}`.toLowerCase();
    return name.includes(search);
  });

  if (filtered.length === 0) {
    list.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
  }

  filtered.forEach(([id, material]) => {
      const item = document.createElement('div');
      item.className = 'notice';
      item.innerHTML = `
        <label class="row" style="justify-content: space-between; width: 100%;">
          <span>${getLocalizedName(material)}</span>
          <input type="checkbox" data-id="${id}" />
        </label>
      `;
      list.appendChild(item);
    });

  if (els.materialCategoryProductSearch) {
    els.materialCategoryProductSearch.oninput = () => renderMaterialCategoryProductList();
  }
}

function saveMaterialCategoryProducts() {
  const checkboxes = els.materialCategoryProductList.querySelectorAll('input[type="checkbox"]:checked');
  const updates = {};
  checkboxes.forEach((checkbox) => {
    updates[`stockMaterials/${checkbox.dataset.id}/categoryId`] = state.activeMaterialCategoryId;
  });
  db.ref().update(updates).then(() => {
    closeMaterialCategoryProductsModal();
  });
}

function setupStorageLocationsSection() {
  const section = document.getElementById('section-storageLocations');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('storage_locations')}</h2>
        <div class="row">
          <button id="addStorageLocationBtn" class="btn primary">${window.i18n.t('add')}</button>
          <button id="assignStorageItemsBtn" class="btn ghost">${window.i18n.t('add_product_to_category')}</button>
          <button id="storageLocationBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px;">
        <input id="storageLocationSearch" class="input" placeholder="${window.i18n.t('search')}" />
      </div>
      <div id="storageLocationBreadcrumb" class="helper" style="margin-top: 8px;"></div>
      <div id="storageLocationList" class="grid two" style="margin-top: 12px;"></div>
      <div id="storageItemsArea" style="margin-top: 16px;">
        <h4>${window.i18n.t('items')}</h4>
        <div id="storageLocationItemsList" class="grid two"></div>
      </div>
    </div>
  `;

  bindStorageLocationsSection();
  renderStorageLocationsSection();
}

function bindStorageLocationsSection() {
  document.getElementById('addStorageLocationBtn').addEventListener('click', () => openStorageLocationModal());
  document.getElementById('assignStorageItemsBtn').addEventListener('click', () => openStorageItemsModal());
  document.getElementById('storageLocationBackBtn').addEventListener('click', () => goStorageLocationBack());
  bindDebouncedQueryInput(document.getElementById('storageLocationSearch'), () => renderStorageLocationsSection());

  if (els.storageLocationForm) {
    els.storageLocationForm.onsubmit = (e) => {
      e.preventDefault();
      saveStorageLocation();
    };
  }

  if (els.storageItemsSave) {
    els.storageItemsSave.addEventListener('click', () => saveStorageItems());
  }
}

function renderStorageLocationsSection() {
  const list = document.getElementById('storageLocationList');
  if (!list) return;
  const locations = state.cache.storageLocations || {};
  if (state.activeStorageLocationId && !locations[state.activeStorageLocationId]) {
    state.activeStorageLocationId = null;
  }
  const search = document.getElementById('storageLocationSearch')?.value.trim().toLowerCase() || '';
  const assignBtn = document.getElementById('assignStorageItemsBtn');
  const backBtn = document.getElementById('storageLocationBackBtn');
  if (assignBtn) assignBtn.disabled = !state.activeStorageLocationId;
  if (backBtn) backBtn.disabled = !state.activeStorageLocationId;

  const entries = Object.entries(locations)
    .filter(([, loc]) => {
      if (!search) return true;
      const name = `${loc.nameAr || ''} ${loc.nameEn || ''} ${loc.name || ''}`.toLowerCase();
      return name.includes(search);
    });

  list.innerHTML = '';
  if (entries.length === 0) {
    list.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
  }

  entries.forEach(([id, loc]) => {
    const count = countItemsByStorageLocation(id);
    const card = document.createElement('div');
    card.className = 'card light';
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${getLocalizedName(loc)}</strong>
          <div class="helper">${count} ${window.i18n.t('items')}</div>
        </div>
        <div class="row">
          <button class="btn ghost small" data-action="open">${window.i18n.t('view')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="open"]').addEventListener('click', () => {
      state.activeStorageLocationId = id;
      renderStorageLocationsSection();
    });
    card.querySelector('[data-action="edit"]').addEventListener('click', () => {
      openStorageLocationModal(id);
    });
    card.querySelector('[data-action="delete"]').addEventListener('click', () => deleteStorageLocation(id));
    list.appendChild(card);
  });

  renderStorageLocationBreadcrumb();
  renderStorageItemsList();
}

function renderStorageLocationBreadcrumb() {
  const breadcrumb = document.getElementById('storageLocationBreadcrumb');
  if (!breadcrumb) return;
  if (!state.activeStorageLocationId) {
    breadcrumb.textContent = window.i18n.t('main');
    return;
  }
  const location = state.cache.storageLocations?.[state.activeStorageLocationId];
  breadcrumb.textContent = getLocalizedName(location);
}

function renderStorageItemsList() {
  const container = document.getElementById('storageLocationItemsList');
  if (!container) return;
  const currentId = state.activeStorageLocationId;
  container.innerHTML = '';
  if (!currentId) {
    container.innerHTML = `<p class="helper">${window.i18n.t('select')}</p>`;
    return;
  }

  const products = state.cache.products || {};
  const materials = state.cache.stockMaterials || {};
  const entries = [];
  Object.entries(products).forEach(([id, product]) => {
    if (product.storageLocationId === currentId) {
      entries.push({ id, type: 'product', item: product });
    }
  });
  Object.entries(materials).forEach(([id, material]) => {
    if (material.storageLocationId === currentId) {
      entries.push({ id, type: 'material', item: material });
    }
  });

  if (entries.length === 0) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }

  entries.forEach((entry) => {
    const item = document.createElement('div');
    const typeLabel = entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials');
    item.className = 'notice';
    item.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div class="row" style="gap: 8px;">
          <span>${getLocalizedName(entry.item)}</span>
          <span class="tag">${typeLabel}</span>
        </div>
        <button class="btn danger small" data-action="remove">${window.i18n.t('delete')}</button>
      </div>
    `;
    item.querySelector('[data-action="remove"]').addEventListener('click', () => {
      const path = entry.type === 'product' ? `products/${entry.id}/storageLocationId` : `stockMaterials/${entry.id}/storageLocationId`;
      db.ref(path).set(null);
    });
    container.appendChild(item);
  });
}

function openStorageLocationModal(editId = null) {
  if (!els.storageLocationModal) return;
  els.storageLocationForm.reset();
  els.storageLocationError.textContent = '';
  if (editId) {
    const location = state.cache.storageLocations?.[editId];
    els.storageLocationForm.dataset.editId = editId;
    document.getElementById('storageLocationNameAr').value = location?.nameAr || location?.name || '';
    document.getElementById('storageLocationNameEn').value = location?.nameEn || '';
  } else {
    delete els.storageLocationForm.dataset.editId;
  }
  els.storageLocationModal.classList.remove('hidden');
}

function closeStorageLocationModal() {
  if (els.storageLocationModal) {
    els.storageLocationModal.classList.add('hidden');
  }
}

function saveStorageLocation() {
  const nameAr = document.getElementById('storageLocationNameAr').value.trim();
  const nameEn = document.getElementById('storageLocationNameEn').value.trim();
  if (!nameAr || !nameEn) {
    els.storageLocationError.textContent = window.i18n.t('error');
    return;
  }
  const editId = els.storageLocationForm.dataset.editId;
  const payload = { nameAr, nameEn };
  if (editId) {
    db.ref(`storageLocations/${editId}`).update(payload).then(() => closeStorageLocationModal());
  } else {
    db.ref('storageLocations').push(payload).then(() => closeStorageLocationModal());
  }
}

function deleteStorageLocation(locationId) {
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const products = state.cache.products || {};
  const materials = state.cache.stockMaterials || {};
  const updates = {};
  Object.entries(products).forEach(([id, product]) => {
    if (product.storageLocationId === locationId) {
      updates[`products/${id}/storageLocationId`] = null;
    }
  });
  Object.entries(materials).forEach(([id, material]) => {
    if (material.storageLocationId === locationId) {
      updates[`stockMaterials/${id}/storageLocationId`] = null;
    }
  });
  updates[`storageLocations/${locationId}`] = null;
  db.ref().update(updates).then(() => {
    if (state.activeStorageLocationId === locationId) {
      state.activeStorageLocationId = null;
      renderStorageLocationsSection();
    }
  });
}

function countItemsByStorageLocation(locationId) {
  const products = state.cache.products || {};
  const materials = state.cache.stockMaterials || {};
  const productCount = Object.values(products).filter((product) => product.storageLocationId === locationId).length;
  const materialCount = Object.values(materials).filter((material) => material.storageLocationId === locationId).length;
  return productCount + materialCount;
}

function goStorageLocationBack() {
  state.activeStorageLocationId = null;
  renderStorageLocationsSection();
}

function openStorageItemsModal() {
  if (!state.activeStorageLocationId) return;
  if (!els.storageItemsModal) return;
  renderStorageItemsPickerList();
  els.storageItemsModal.classList.remove('hidden');
}

function closeStorageItemsModal() {
  if (els.storageItemsModal) {
    els.storageItemsModal.classList.add('hidden');
  }
}

function renderStorageItemsPickerList() {
  const list = els.storageItemsList;
  const search = (els.storageItemsSearch?.value || '').trim().toLowerCase();
  if (!list) return;
  list.innerHTML = '';
  const currentId = state.activeStorageLocationId;
  const products = state.cache.products || {};
  const materials = state.cache.stockMaterials || {};

  const entries = [];
  Object.entries(products).forEach(([id, product]) => {
    if (!product.storageLocationId || product.storageLocationId === currentId) {
      entries.push({ id, type: 'product', item: product });
    }
  });
  Object.entries(materials).forEach(([id, material]) => {
    if (!material.storageLocationId || material.storageLocationId === currentId) {
      entries.push({ id, type: 'material', item: material });
    }
  });

  const filtered = entries
    .filter((entry) => {
      if (!search) return true;
      const name = `${entry.item.nameAr || ''} ${entry.item.nameEn || ''} ${entry.item.name || ''}`.toLowerCase();
      return name.includes(search);
    });

  if (filtered.length === 0) {
    list.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }

  filtered.forEach((entry) => {
      const item = document.createElement('div');
      const typeLabel = entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials');
      item.className = 'notice';
      item.innerHTML = `
        <label class="row" style="justify-content: space-between; width: 100%;">
          <span>${getLocalizedName(entry.item)} <span class="tag">${typeLabel}</span></span>
          <input type="checkbox" data-id="${entry.id}" data-type="${entry.type}" />
        </label>
      `;
      list.appendChild(item);
    });

  if (els.storageItemsSearch) {
    els.storageItemsSearch.oninput = () => renderStorageItemsPickerList();
  }
}

function saveStorageItems() {
  const checkboxes = els.storageItemsList.querySelectorAll('input[type="checkbox"]:checked');
  const updates = {};
  checkboxes.forEach((checkbox) => {
    const id = checkbox.dataset.id;
    const type = checkbox.dataset.type;
    const path = type === 'product' ? `products/${id}/storageLocationId` : `stockMaterials/${id}/storageLocationId`;
    updates[path] = state.activeStorageLocationId;
  });
  db.ref().update(updates).then(() => {
    closeStorageItemsModal();
  });
}

function resetCountryOriginForm() {
  state.countryOriginView.editingId = null;
  state.countryOriginView.formNameAr = '';
  state.countryOriginView.formNameEn = '';
}

function getCountryOriginAssignedEntries(originId, query = '') {
  const qRaw = String(query || '').trim().toLowerCase();
  const qNorm = normalizeSearchValue(query || '');
  const entries = [];
  Object.entries(state.cache.products || {}).forEach(([id, item]) => {
    if ((item.countryOriginId || '') !== originId) return;
    entries.push({ id, type: 'product', item });
  });
  Object.entries(state.cache.stockMaterials || {}).forEach(([id, item]) => {
    if ((item.countryOriginId || '') !== originId) return;
    entries.push({ id, type: 'material', item });
  });
  return entries.filter((entry) => {
    if (!qRaw && !qNorm) return true;
    const name = `${entry.item.nameAr || ''} ${entry.item.nameEn || ''} ${entry.item.name || ''}`.toLowerCase();
    const code = normalizeSearchValue(entry.item.code || '');
    return name.includes(qRaw) || code.includes(qNorm);
  }).sort((a, b) => String(a.item.code || '').localeCompare(String(b.item.code || '')));
}

function setupCountryOriginsSection() {
  const section = document.getElementById('section-countryOrigins');
  if (!section) return;
  const origins = state.cache.countryOrigins || {};
  if (state.countryOriginView.activeOriginId && !origins[state.countryOriginView.activeOriginId]) {
    state.countryOriginView.activeOriginId = null;
    state.countryOriginView.assignMode = false;
  }
  if (!state.countryOriginView.formNameAr && !state.countryOriginView.formNameEn) {
    resetCountryOriginForm();
  }
  renderCountryOriginsSection();
}

function renderCountryOriginsSection() {
  const section = document.getElementById('section-countryOrigins');
  if (!section) return;

  const origins = state.cache.countryOrigins || {};
  const activeId = state.countryOriginView.activeOriginId;
  const assignMode = !!state.countryOriginView.assignMode;

  if (activeId && origins[activeId] && assignMode) {
    renderCountryOriginAssignView(section, activeId, origins[activeId]);
    return;
  }
  if (activeId && origins[activeId]) {
    renderCountryOriginDetailsView(section, activeId, origins[activeId]);
    return;
  }
  renderCountryOriginsListView(section);
}

function renderCountryOriginsListView(section) {
  const origins = state.cache.countryOrigins || {};
  const query = state.countryOriginView.search || '';
  const q = String(query).trim().toLowerCase();
  const entries = Object.entries(origins)
    .map(([id, origin]) => ({ id, ...origin }))
    .filter((origin) => {
      if (!q) return true;
      const name = `${origin.nameAr || ''} ${origin.nameEn || ''}`.toLowerCase();
      return name.includes(q);
    })
    .sort((a, b) => String(getLocalizedName(a)).localeCompare(String(getLocalizedName(b))));

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h2>${window.i18n.t('country_origins')}</h2>
      </div>
      <div class="grid two" style="margin-top: 12px;">
        <div>
          <label class="tag">${window.i18n.t('name_ar')}</label>
          <input id="originNameArInput" class="input" value="${state.countryOriginView.formNameAr || ''}" />
        </div>
        <div>
          <label class="tag">${window.i18n.t('name_en')}</label>
          <input id="originNameEnInput" class="input" value="${state.countryOriginView.formNameEn || ''}" />
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <button id="originSaveBtn" class="btn primary">${state.countryOriginView.editingId ? window.i18n.t('update') : window.i18n.t('add_country_origin')}</button>
        <button id="originCancelBtn" class="btn ghost ${state.countryOriginView.editingId ? '' : 'hidden'}">${window.i18n.t('cancel')}</button>
      </div>
      <div class="row" style="margin-top: 12px;">
        <input id="originSearchInput" class="input" placeholder="${window.i18n.t('search')}" value="${query}" />
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('name_ar')}</th>
            <th>${window.i18n.t('name_en')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="countryOriginsTableBody"></tbody>
      </table>
    </div>
  `;

  const searchInput = document.getElementById('originSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.countryOriginView.search = searchInput.value || '';
      renderCountryOriginsSection();
    });
  }

  const saveBtn = document.getElementById('originSaveBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const nameAr = String(document.getElementById('originNameArInput')?.value || '').trim();
      const nameEn = String(document.getElementById('originNameEnInput')?.value || '').trim();
      if (!nameAr || !nameEn) return;
      const payload = { nameAr, nameEn };
      const editingId = state.countryOriginView.editingId;
      const target = editingId ? db.ref(`countryOrigins/${editingId}`).update(payload) : db.ref('countryOrigins').push(payload);
      target.then(() => {
        resetCountryOriginForm();
        renderCountryOriginsSection();
      });
    });
  }

  const cancelBtn = document.getElementById('originCancelBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      resetCountryOriginForm();
      renderCountryOriginsSection();
    });
  }

  const table = document.getElementById('countryOriginsTableBody');
  if (!table) return;
  if (!entries.length) {
    table.innerHTML = `<tr><td colspan="4">${window.i18n.t('no_data')}</td></tr>`;
    return;
  }
  table.innerHTML = entries.map((origin) => `
    <tr>
      <td>${origin.nameAr || '-'}</td>
      <td>${origin.nameEn || '-'}</td>
      <td>${getCountryOriginAssignedEntries(origin.id).length}</td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="open" data-id="${origin.id}">${window.i18n.t('view')}</button>
          <button class="btn ghost small" data-action="edit" data-id="${origin.id}">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete" data-id="${origin.id}">${window.i18n.t('delete')}</button>
        </div>
      </td>
    </tr>
  `).join('');

  table.querySelectorAll('[data-action="open"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.countryOriginView.activeOriginId = btn.dataset.id;
      state.countryOriginView.assignMode = false;
      state.countryOriginView.search = '';
      renderCountryOriginsSection();
    });
  });
  table.querySelectorAll('[data-action="edit"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const origin = origins[btn.dataset.id];
      if (!origin) return;
      state.countryOriginView.editingId = btn.dataset.id;
      state.countryOriginView.formNameAr = origin.nameAr || '';
      state.countryOriginView.formNameEn = origin.nameEn || '';
      renderCountryOriginsSection();
    });
  });
  table.querySelectorAll('[data-action="delete"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const originId = btn.dataset.id;
      if (!originId || !confirm(window.i18n.t('confirm_delete'))) return;
      const updates = {};
      Object.entries(state.cache.products || {}).forEach(([id, product]) => {
        if ((product.countryOriginId || '') === originId) {
          updates[`products/${id}/countryOriginId`] = null;
        }
      });
      Object.entries(state.cache.stockMaterials || {}).forEach(([id, material]) => {
        if ((material.countryOriginId || '') === originId) {
          updates[`stockMaterials/${id}/countryOriginId`] = null;
        }
      });
      updates[`countryOrigins/${originId}`] = null;
      db.ref().update(updates).then(() => {
        if (state.countryOriginView.activeOriginId === originId) {
          state.countryOriginView.activeOriginId = null;
          state.countryOriginView.assignMode = false;
        }
        resetCountryOriginForm();
        renderCountryOriginsSection();
      });
    });
  });
}

function renderCountryOriginDetailsView(section, originId, origin) {
  const query = state.countryOriginView.search || '';
  const rows = getCountryOriginAssignedEntries(originId, query);
  const title = getLocalizedName(origin) || '-';

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="countryOriginBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${title}</h2>
        </div>
        <div class="row">
          <button id="countryOriginAddProductsBtn" class="btn primary">${window.i18n.t('add_products')}</button>
          <button id="countryOriginExportBtn" class="btn ghost">${window.i18n.t('download_report_excel')}</button>
          <button id="countryOriginPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px;">
        <input id="countryOriginItemsSearch" class="input" placeholder="${window.i18n.t('search_products')}" value="${query}" />
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('product_code')}</th>
            <th>${window.i18n.t('item_name_ar')}</th>
            <th>${window.i18n.t('item_name_en')}</th>
            <th>${window.i18n.t('type')}</th>
          </tr>
        </thead>
        <tbody id="countryOriginItemsTableBody"></tbody>
      </table>
    </div>
  `;

  const backBtn = document.getElementById('countryOriginBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.countryOriginView.activeOriginId = null;
      state.countryOriginView.assignMode = false;
      state.countryOriginView.search = '';
      renderCountryOriginsSection();
    });
  }

  const addBtn = document.getElementById('countryOriginAddProductsBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      state.countryOriginView.assignMode = true;
      state.selectedCountryOriginItems = new Set(
        getCountryOriginAssignedEntries(originId).map((entry) => `${entry.type}:${entry.id}`)
      );
      state.countryOriginView.search = '';
      renderCountryOriginsSection();
    });
  }

  const searchInput = document.getElementById('countryOriginItemsSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.countryOriginView.search = searchInput.value || '';
      renderCountryOriginsSection();
    });
  }

  const exportBtn = document.getElementById('countryOriginExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const excelRows = rows.map((entry) => ({
        [window.i18n.t('product_code')]: entry.item.code || '-',
        [window.i18n.t('item_name_ar')]: entry.item.nameAr || entry.item.name || '-',
        [window.i18n.t('item_name_en')]: entry.item.nameEn || entry.item.name || '-',
        [window.i18n.t('type')]: entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials')
      }));
      exportToExcel(excelRows, `country-origin-${originId}.xlsx`);
    });
  }

  const printBtn = document.getElementById('countryOriginPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const headers = [
        window.i18n.t('product_code'),
        window.i18n.t('item_name_ar'),
        window.i18n.t('item_name_en'),
        window.i18n.t('type')
      ];
      const body = rows.map((entry) => ([
        entry.item.code || '-',
        entry.item.nameAr || entry.item.name || '-',
        entry.item.nameEn || entry.item.name || '-',
        entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials')
      ]));
      printA4Report(
        window.i18n.t('country_origins'),
        [{ label: window.i18n.t('country_origin'), value: title }],
        headers,
        body,
        [{ label: window.i18n.t('items'), value: rows.length }]
      );
    });
  }

  const tbody = document.getElementById('countryOriginItemsTableBody');
  if (!tbody) return;
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="4">${window.i18n.t('no_data')}</td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map((entry) => `
    <tr>
      <td>${entry.item.code || '-'}</td>
      <td>${entry.item.nameAr || entry.item.name || '-'}</td>
      <td>${entry.item.nameEn || entry.item.name || '-'}</td>
      <td>${entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials')}</td>
    </tr>
  `).join('');
}

function renderCountryOriginAssignView(section, originId, origin) {
  const query = state.countryOriginView.search || '';
  const entries = getAllItems()
    .filter((entry) => {
      const qRaw = String(query || '').trim().toLowerCase();
      const qNorm = normalizeSearchValue(query || '');
      if (!qRaw && !qNorm) return true;
      const name = `${entry.item.nameAr || ''} ${entry.item.nameEn || ''} ${entry.item.name || ''}`.toLowerCase();
      const code = normalizeSearchValue(entry.item.code || '');
      return name.includes(qRaw) || code.includes(qNorm);
    })
    .sort((a, b) => String(a.item.code || '').localeCompare(String(b.item.code || '')));

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="countryOriginAssignBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('add_products')} - ${getLocalizedName(origin) || '-'}</h2>
        </div>
        <button id="countryOriginAssignSaveBtn" class="btn primary">${window.i18n.t('save')}</button>
      </div>
      <div class="row" style="margin-top: 12px;">
        <input id="countryOriginAssignSearch" class="input" placeholder="${window.i18n.t('search_products')}" value="${query}" />
      </div>
    </div>
    <div class="card">
      <div id="countryOriginAssignList" class="grid two"></div>
    </div>
  `;

  const backBtn = document.getElementById('countryOriginAssignBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.countryOriginView.assignMode = false;
      state.countryOriginView.search = '';
      renderCountryOriginsSection();
    });
  }

  const searchInput = document.getElementById('countryOriginAssignSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.countryOriginView.search = searchInput.value || '';
      renderCountryOriginsSection();
    });
  }

  const list = document.getElementById('countryOriginAssignList');
  if (list) {
    if (!entries.length) {
      list.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    } else {
      list.innerHTML = entries.map((entry) => {
        const key = `${entry.type}:${entry.id}`;
        const checked = state.selectedCountryOriginItems.has(key);
        return `
          <label class="notice row" style="justify-content: space-between; width: 100%;">
            <span>${entry.item.code || '-'} - ${getLocalizedName(entry.item)} <span class="tag">${entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials')}</span></span>
            <input type="checkbox" data-key="${key}" ${checked ? 'checked' : ''} />
          </label>
        `;
      }).join('');
      list.querySelectorAll('input[type="checkbox"]').forEach((input) => {
        input.addEventListener('change', () => {
          const key = input.dataset.key;
          if (!key) return;
          if (input.checked) state.selectedCountryOriginItems.add(key);
          else state.selectedCountryOriginItems.delete(key);
        });
      });
    }
  }

  const saveBtn = document.getElementById('countryOriginAssignSaveBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const updates = {};
      getAllItems().forEach((entry) => {
        const key = `${entry.type}:${entry.id}`;
        const path = entry.type === 'product' ? `products/${entry.id}/countryOriginId` : `stockMaterials/${entry.id}/countryOriginId`;
        if (state.selectedCountryOriginItems.has(key)) {
          updates[path] = originId;
        } else if ((entry.item.countryOriginId || '') === originId) {
          updates[path] = null;
        }
      });
      db.ref().update(updates).then(() => {
        state.countryOriginView.assignMode = false;
        state.countryOriginView.search = '';
        renderCountryOriginsSection();
      });
    });
  }
}

function bindQtyModal() {
  if (!els.qtyModal) return;
  const buttons = els.qtyModal.querySelectorAll('[data-key]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => handleQtyKey(btn.dataset.key));
  });
  if (els.qtyModalConfirm) {
    els.qtyModalConfirm.addEventListener('click', () => handleQtyConfirm());
  }
}

function handleQtyKey(key) {
  let value = state.qtyModal.value || '';
  if (key === 'back') {
    value = value.slice(0, -1);
  } else if (key === '.' || key === ',') {
    if (!value.includes('.')) {
      value = value ? `${value}.` : '0.';
    }
  } else {
    value = `${value}${key}`;
  }
  state.qtyModal.value = value;
  updateQtyDisplay();
}

function updateQtyDisplay() {
  if (!els.qtyModalDisplay) return;
  els.qtyModalDisplay.textContent = state.qtyModal.value || '0';
}

function openQtyModal({ title, available, onConfirm, mode = 'add', confirmLabel, unitId = null, unitName = '' }) {
  if (!els.qtyModal) return;
  state.qtyModal.value = '';
  state.qtyModal.mode = mode;
  state.qtyModal.available = available;
  state.qtyModal.onConfirm = onConfirm;
  els.qtyModalTitle.textContent = title || '';
  const resolvedUnitName = String(unitName || getUnitName(unitId) || '').trim();
  if (els.qtyModalUnit) {
    els.qtyModalUnit.textContent = resolvedUnitName
      ? `${window.i18n.t('item_unit')}: ${resolvedUnitName}`
      : '';
    els.qtyModalUnit.style.display = resolvedUnitName ? 'block' : 'none';
    els.qtyModalUnit.style.textAlign = 'center';
  }
  const helperLines = [];
  if (available !== null && available !== undefined) {
    helperLines.push(`${window.i18n.t('available_stock')}: ${formatNumber(available)}`);
  }
  els.qtyModalStock.textContent = helperLines.join('\n');
  els.qtyModalStock.style.whiteSpace = 'pre-line';
  if (confirmLabel && els.qtyModalConfirm) {
    els.qtyModalConfirm.textContent = confirmLabel;
  } else if (els.qtyModalConfirm) {
    els.qtyModalConfirm.textContent = window.i18n.t('add');
  }
  if (els.qtyModalError) {
    els.qtyModalError.textContent = '';
  }
  updateQtyDisplay();
  els.qtyModal.classList.remove('hidden');
}

function closeQtyModal() {
  if (els.qtyModal) {
    els.qtyModal.classList.add('hidden');
  }
}

function handleQtyConfirm() {
  const value = String(state.qtyModal.value || '').replace(',', '.');
  const qty = Number(value || 0);
  if (!qty || Number.isNaN(qty)) {
    if (els.qtyModalError) {
      els.qtyModalError.textContent = window.i18n.t('error');
    }
    return;
  }
  if (state.qtyModal.mode === 'deduct' && state.qtyModal.available !== null && state.qtyModal.available !== undefined) {
    if (qty > Number(state.qtyModal.available || 0)) {
      if (els.qtyModalError) {
        els.qtyModalError.textContent = window.i18n.t('insufficient_stock');
      }
      return;
    }
  }
  const cb = state.qtyModal.onConfirm;
  closeQtyModal();
  if (typeof cb === 'function') {
    cb(qty);
  }
}

function bindProductionDateModal() {
  if (els.productionDateNext) {
    els.productionDateNext.addEventListener('click', () => {
      const productionDate = els.productionDateInput.value;
      const expiryDate = els.expiryDateInput.value;
      if (!productionDate || !expiryDate) {
        if (els.productionDateError) {
          els.productionDateError.textContent = window.i18n.t('error');
        }
        return;
      }
      if (els.productionDateError) {
        els.productionDateError.textContent = '';
      }
      closeProductionDateModal();
      if (state.productionDraft) {
        state.productionDraft.productionDate = productionDate;
        state.productionDraft.expiryDate = expiryDate;
      }
      if (state.productionDraft && state.productionDraft.onDatesSelected) {
        state.productionDraft.onDatesSelected();
      }
    });
  }
}

function openProductionDateModal() {
  if (!els.productionDateModal) return;
  applyFixedExpiryToProductionDraft();
  if (els.productionDateError) {
    els.productionDateError.textContent = '';
  }
  if (els.productionDateInput) {
    els.productionDateInput.value = state.productionDraft?.productionDate || new Date().toISOString().slice(0, 10);
  }
  if (els.expiryDateInput) {
    els.expiryDateInput.value = state.productionDraft?.expiryDate || '';
  }
  els.productionDateModal.classList.remove('hidden');
}

function closeProductionDateModal() {
  if (els.productionDateModal) {
    els.productionDateModal.classList.add('hidden');
  }
}

function bindProductionLinkModal() {
  if (els.productionLinkConfirm) {
    els.productionLinkConfirm.addEventListener('click', () => {
      const selected = els.productionIssueList?.querySelector('input[type="radio"]:checked');
      if (!selected) return;
      if (state.productionDraft) {
        state.productionDraft.issueId = selected.value;
        state.productionDraft.issueSkipped = false;
      }
      closeProductionLinkModal();
      renderProductionDraft();
      openProductionLabelCountModal();
    });
  }
  if (els.productionLinkSkip) {
    els.productionLinkSkip.addEventListener('click', () => {
      if (state.productionDraft) {
        state.productionDraft.issueId = null;
        state.productionDraft.issueSkipped = true;
      }
      closeProductionLinkModal();
      renderProductionDraft();
      openProductionLabelCountModal();
    });
  }
}

function openProductionLinkModal() {
  if (!els.productionLinkModal) return;
  renderProductionIssueList();
  if (els.productionLinkConfirm) {
    els.productionLinkConfirm.textContent = window.i18n?.t?.('print_label') || 'طباعة الملصق';
  }
  els.productionLinkModal.classList.remove('hidden');
}

function closeProductionLinkModal() {
  if (els.productionLinkModal) {
    els.productionLinkModal.classList.add('hidden');
  }
}

function openProductionLabelCountModal() {
  const oldOverlay = document.getElementById('productionLabelCountOverlay');
  if (oldOverlay) oldOverlay.remove();
  const overlay = document.createElement('div');
  overlay.id = 'productionLabelCountOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;padding:20px;';
  overlay.innerHTML = `
    <div class="modal" style="width:min(420px, 100%);background:#fff;border-radius:14px;padding:22px;text-align:right;box-shadow:0 20px 60px rgba(0,0,0,.25);">
      <h3 style="margin:0 0 14px;font-size:22px;font-weight:900;">اكتب العدد المطلوب</h3>
      <input
        id="productionLabelCountInput"
        class="input"
        inputmode="numeric"
        autocomplete="off"
        placeholder="اكتب العدد المطلوب"
        style="width:100%;font-size:22px;text-align:center;font-weight:900;margin-bottom:10px;"
      />
      <p id="productionLabelCountError" class="helper form-error" style="min-height:20px;"></p>
      <div class="row" style="justify-content:flex-end;gap:10px;margin-top:10px;">
        <button id="productionLabelCountCancel" class="btn ghost">${window.i18n?.t?.('cancel') || 'إلغاء'}</button>
        <button id="productionLabelCountPrint" class="btn primary">${window.i18n?.t?.('print_label') || 'طباعة الملصق'}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  const input = document.getElementById('productionLabelCountInput');
  const errorEl = document.getElementById('productionLabelCountError');
  const close = () => overlay.remove();
  const normalizeCountInput = () => {
    input.value = normalizeDigits(input.value || '').replace(/[^\d]/g, '');
  };
  input.addEventListener('input', normalizeCountInput);
  input.addEventListener('keydown', (event) => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('productionLabelCountPrint')?.click();
    }
  }, true);
  document.getElementById('productionLabelCountCancel')?.addEventListener('click', close);
  document.getElementById('productionLabelCountPrint')?.addEventListener('click', () => {
    normalizeCountInput();
    const count = Math.floor(Number(input.value || 0));
    if (!Number.isFinite(count) || count <= 0) {
      if (errorEl) errorEl.textContent = 'اكتب عدد صحيح أكبر من صفر';
      input.focus();
      return;
    }
    if (state.productionDraft) {
      state.productionDraft.qty = count;
      state.productionDraft.labelCopies = count;
    }
    close();
    submitProductionVoucher();
  });
  setTimeout(() => input?.focus(), 50);
}

function getAllItems() {
  const products = state.cache.products || {};
  const materials = state.cache.stockMaterials || {};
  const entries = [];
  Object.entries(products).forEach(([id, item]) => {
    entries.push({ id, type: 'product', item });
  });
  Object.entries(materials).forEach(([id, item]) => {
    entries.push({ id, type: 'material', item });
  });
  return entries;
}

function getProductEntries() {
  const products = state.cache.products || {};
  return Object.entries(products).map(([id, item]) => ({ id, type: 'product', item }));
}

function getBranchLabel(branchId) {
  if (!branchId) return '-';
  const branch = state.cache.branches?.[branchId];
  const localized = getLocalizedName(branch);
  if (localized && localized !== '-') return localized;
  if (branchId === 'main') return 'الفرع الرئيسي';
  if (branchId === 'yarmouk') return 'اليرموك';
  if (branchId === 'abu_hasaniya') return 'أبو الحصانية';
  if (branchId === 'main_warehouse') return 'المخزن الرئيسي';
  return branchId || '-';
}

function renderBranchOptions(select, { excludeMain = false } = {}) {
  if (!select) return;
  const branches = state.cache.branches || {};
  const mainBranchId = getMainBranchId();
  select.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = window.i18n.t('select_branch');
  select.appendChild(placeholder);
  Object.entries(branches).forEach(([id, branch]) => {
    if (excludeMain && mainBranchId && id === mainBranchId) return;
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(branch);
    select.appendChild(option);
  });
}

function renderStorageLocationOptions(select) {
  if (!select) return;
  const locations = state.cache.storageLocations || {};
  select.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = window.i18n.t('select');
  select.appendChild(placeholder);
  Object.entries(locations).forEach(([id, location]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(location);
    select.appendChild(option);
  });
}

function getSupplierItems(supplierId) {
  const products = state.cache.products || {};
  const materials = state.cache.stockMaterials || {};
  const entries = [];
  Object.entries(products).forEach(([id, item]) => {
    if (itemHasSupplier(item, supplierId)) entries.push({ id, type: 'product', item });
  });
  Object.entries(materials).forEach(([id, item]) => {
    if (itemHasSupplier(item, supplierId)) entries.push({ id, type: 'material', item });
  });
  return entries;
}

function getLatestPurchaseUnitPrice(itemType, itemId) {
  if (!itemId) return null;
  const receipts = state.cache.purchaseReceipts || {};
  let latest = null;
  Object.values(receipts).forEach((receipt) => {
    const createdAt = Number(receipt.createdAt || 0);
    normalizeItems(receipt.items).forEach((item) => {
      const currentType = normalizeItemType(item);
      const currentId = item.itemId || item.id;
      if (currentType !== itemType || String(currentId) !== String(itemId)) return;
      const price = Number(item.cost ?? item.unitPrice ?? item.price ?? 0);
      if (!latest || createdAt > latest.createdAt) {
        latest = {
          price,
          createdAt,
          unitId: item.unitId || null
        };
      }
    });
  });
  return latest;
}

function getDefaultPurchaseUnitPrice(itemType, itemId) {
  const latest = getLatestPurchaseUnitPrice(itemType, itemId);
  if (latest) return Number(latest.price || 0);
  const itemData = getItemDataByType(itemType, itemId);
  return Number(itemData?.cost || 0);
}

function getUnassignedSupplierItems(currentSupplierId = '') {
  const products = state.cache.products || {};
  const materials = state.cache.stockMaterials || {};
  const entries = [];
  Object.entries(products).forEach(([id, item]) => {
    if (!itemHasSupplier(item, currentSupplierId)) entries.push({ id, type: 'product', item });
  });
  Object.entries(materials).forEach(([id, item]) => {
    if (!itemHasSupplier(item, currentSupplierId)) entries.push({ id, type: 'material', item });
  });
  return entries;
}

function filterItemEntries(entries, query) {
  const q = normalizeSearchValue(query);
  const nameQuery = String(query || '').toLowerCase();
  return entries.filter((entry) => {
    const name = `${entry.item.nameAr || ''} ${entry.item.nameEn || ''} ${entry.item.name || ''}`.toLowerCase();
    const code = normalizeSearchValue(entry.item.code || '');
    const barcode = normalizeSearchValue(entry.item.barcode || '');
    return name.includes(nameQuery) || code.includes(q) || barcode.includes(q);
  });
}

function findExactItemMatch(entries, query) {
  const q = normalizeSearchValue(query);
  const exact = entries.filter((entry) => {
    const code = normalizeSearchValue(entry.item.code || '');
    const barcode = normalizeSearchValue(entry.item.barcode || '');
    return (code && code === q) || (barcode && barcode === q);
  });
  if (exact.length === 1) return exact[0];
  const productionMatch = findProductionBatchByBarcode(query);
  if (!productionMatch) return null;
  const entry = entries.find((item) => item.type === 'product' && String(item.id) === String(productionMatch.itemId || ''));
  if (!entry) return null;
  return attachProductionRecordToEntry(entry, productionMatch);
}

function findProductionBatchByBarcode(value) {
  const q = normalizeSearchValue(value);
  if (!q) return null;
  const matches = Object.entries(state.cache.production || {})
    .map(([id, record]) => ({ id, ...record }))
    .filter((record) => normalizeSearchValue(record.productionBarcode || '') === q);
  if (matches.length !== 1) return null;
  return matches[0];
}

function isProductionRecordActive(record) {
  if (!record) return false;
  if ((record.itemType || 'product') !== 'product') return false;
  if (!record.expiryDate) return true;
  const expiry = new Date(`${record.expiryDate}T23:59:59`);
  if (Number.isNaN(expiry.getTime())) return true;
  return expiry.getTime() >= Date.now();
}

function getActiveProductionBatchesForProduct(productId) {
  return Object.entries(state.cache.production || {})
    .map(([id, record]) => ({ id, ...record }))
    .filter((record) => String(record.itemId || '') === String(productId || ''))
    .filter((record) => isProductionRecordActive(record))
    .sort((a, b) => {
      const ad = new Date(`${a.productionDate || '1970-01-01'}T00:00:00`).getTime() || Number(a.createdAt || 0);
      const bd = new Date(`${b.productionDate || '1970-01-01'}T00:00:00`).getTime() || Number(b.createdAt || 0);
      return bd - ad;
    });
}

function attachProductionRecordToEntry(entry, record) {
  if (!entry) return null;
  if (!record) {
    const next = { ...entry };
    delete next.productionRecord;
    return next;
  }
  return {
    ...entry,
    productionRecord: {
      id: record.id,
      productionNumber: record.productionNumber || null,
      productionDate: record.productionDate || null,
      expiryDate: record.expiryDate || null,
      productionBarcode: record.productionBarcode || null
    }
  };
}

function chooseProductionBatchForEntry(entry, records) {
  return new Promise((resolve) => {
    const existing = document.getElementById('entryProductionPickerOverlay');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'entryProductionPickerOverlay';
    overlay.innerHTML = `
      <div class="modal card" style="max-width: 560px; text-align: start;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('production_dates')}</h3>
          <button class="btn ghost small" data-action="close">×</button>
        </div>
        <div class="helper">${window.i18n.t('product_single')}: ${getLocalizedName(entry.item)}</div>
        <div style="display:grid; gap:8px; max-height: 340px; overflow:auto; margin-top: 10px;">
          ${records.map((record) => `
            <button class="btn ghost" data-batch-id="${record.id}" style="justify-content: space-between; text-align: start;">
              <span>${window.i18n.t('production_date')}: ${record.productionDate || '-'}</span>
              <span class="helper">${record.productionNumber || '-'}</span>
            </button>
          `).join('')}
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 10px;">
          <button class="btn ghost" data-action="cancel">${window.i18n.t('cancel')}</button>
        </div>
      </div>
    `;
    const finish = (value) => {
      overlay.remove();
      resolve(value || null);
    };
    overlay.querySelector('[data-action="cancel"]')?.addEventListener('click', () => finish(null));
    overlay.querySelector('[data-action="close"]')?.addEventListener('click', () => finish(null));
    overlay.querySelectorAll('[data-batch-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-batch-id') || '';
        const selected = records.find((record) => String(record.id) === String(id));
        finish(selected || null);
      });
    });
    document.body.appendChild(overlay);
  });
}

function resolveEntryWithProductionSelection(entry) {
  if (!entry) return Promise.resolve(null);
  if (entry.type !== 'product') return Promise.resolve(entry);
  if (entry.productionRecord?.id) return Promise.resolve(attachProductionRecordToEntry(entry, entry.productionRecord));
  const batches = getActiveProductionBatchesForProduct(entry.id);
  if (!batches.length) return Promise.resolve(attachProductionRecordToEntry(entry, null));
  if (batches.length === 1) return Promise.resolve(attachProductionRecordToEntry(entry, batches[0]));
  return chooseProductionBatchForEntry(entry, batches).then((selected) => {
    return selected ? attachProductionRecordToEntry(entry, selected) : null;
  });
}

function renderItemSearchResults(container, entries, onSelect) {
  if (!container) return;
  container.innerHTML = '';
  if (entries.length === 0) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  entries.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'notice';
    card.style.cursor = 'pointer';
    const typeLabel = entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials');
    const code = entry.item.code || '-';
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <span>${getLocalizedName(entry.item)}</span>
        <span class="tag">${typeLabel}</span>
      </div>
      <div class="helper">${window.i18n.t('product_code')}: ${code}</div>
    `;
    card.addEventListener('click', () => onSelect(entry));
    container.appendChild(card);
  });
}

function normalizeItems(list) {
  if (!list) return [];
  return Array.isArray(list) ? list : Object.values(list);
}

function generateCounter(path) {
  const counterRef = db.ref(path);
  return counterRef.transaction((current) => (current || 0) + 1).then((result) => result.snapshot.val());
}

function updateItemStock(itemType, itemId, branchId, delta, mode = 'delta') {
  const basePath = itemType === 'product' ? 'products' : 'stockMaterials';
  const stockRef = db.ref(`${basePath}/${itemId}/stockByBranch/${branchId}`);
  if (mode === 'set') {
    return stockRef.set(delta);
  }
  return stockRef.transaction((current) => (Number(current || 0) + Number(delta || 0)));
}

function setupIssueSection() {
  const section = document.getElementById('section-issue');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('issue')}</h3>
        <div class="row" style="gap: 8px;">
          <button id="openIssueModalBtn" class="btn primary">${window.i18n.t('new_issue')}</button>
          <select id="issueFilterType" class="input" style="max-width: 200px;">
            <option value="all">${window.i18n.t('all_types')}</option>
            <option value="order">${window.i18n.t('issue_order')}</option>
            <option value="production">${window.i18n.t('issue_production')}</option>
          </select>
        </div>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('issue_number')}</th>
            <th>${window.i18n.t('issue_type')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('cashiers')}</th>
            <th>${window.i18n.t('production_staff')}</th>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="issueTable"></tbody>
      </table>
    </div>
    <div id="issueVoucherModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('new_issue')}</h3>
          <button id="issueModalCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid three" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="issueStorekeeper" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('issue_type')}</label>
            <select id="issueType" class="input">
              <option value="order">${window.i18n.t('issue_order')}</option>
              <option value="production">${window.i18n.t('issue_production')}</option>
            </select>
          </div>
        </div>
        <div id="issueOrderFields" class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('cashiers')}</label>
            <select id="issueCashier" class="input"></select>
          </div>
          <div>
            <label class="tag">${window.i18n.t('invoice_number')}</label>
            <input id="issueInvoice" class="input" />
          </div>
        </div>
        <div id="issueProductionFields" class="grid two hidden" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('production_staff')}</label>
            <select id="issueProductionStaff" class="input"></select>
          </div>
        </div>
        ${buildEntrySearchTypeFilterHtml('issue')}
        <div class="row" style="margin-top: 12px;">
          <input id="issueSearchInput" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('search_items')}" />
          <button id="issueSearchBtn" class="btn ghost small">${window.i18n.t('search')}</button>
        </div>
        <div id="issueSearchResults" class="grid two" style="margin-top: 12px;"></div>
        <div style="margin-top: 16px;">
          <h4>${window.i18n.t('items')}</h4>
          <div id="issueItemsList" class="grid two"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="issueCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="issueSubmitBtn" class="btn primary">${window.i18n.t('issue')}</button>
        </div>
        <p id="issueError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
  `;

  resetIssueDraft();
  bindIssueSection();
  renderIssueSection();
}

function resetIssueDraft() {
  state.issueDraft = {
    type: 'order',
    cashierId: '',
    invoiceNumber: '',
    productionStaffId: '',
    searchTypes: [],
    items: [],
    editingId: null,
    originalItems: []
  };
}

function bindIssueSection() {
  const openBtn = document.getElementById('openIssueModalBtn');
  const closeBtn = document.getElementById('issueModalCloseBtn');
  const cancelBtn = document.getElementById('issueCancelBtn');
  const typeSelect = document.getElementById('issueType');
  const orderFields = document.getElementById('issueOrderFields');
  const productionFields = document.getElementById('issueProductionFields');
  const cashierSelect = document.getElementById('issueCashier');
  const invoiceInput = document.getElementById('issueInvoice');
  const productionStaffSelect = document.getElementById('issueProductionStaff');
  const searchInput = document.getElementById('issueSearchInput');
  const searchBtn = document.getElementById('issueSearchBtn');
  const submitBtn = document.getElementById('issueSubmitBtn');
  const filterSelect = document.getElementById('issueFilterType');

  if (openBtn) {
    openBtn.addEventListener('click', () => openIssueModal());
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeIssueModal());
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => closeIssueModal());
  }

  if (typeSelect) {
    typeSelect.addEventListener('change', () => {
      state.issueDraft.type = typeSelect.value;
      orderFields.classList.toggle('hidden', state.issueDraft.type !== 'order');
      productionFields.classList.toggle('hidden', state.issueDraft.type !== 'production');
    });
  }

  if (cashierSelect) {
    cashierSelect.addEventListener('change', () => {
      state.issueDraft.cashierId = cashierSelect.value;
    });
  }

  if (invoiceInput) {
    invoiceInput.addEventListener('input', () => {
      state.issueDraft.invoiceNumber = invoiceInput.value.trim();
    });
  }

  if (productionStaffSelect) {
    productionStaffSelect.addEventListener('change', () => {
      state.issueDraft.productionStaffId = productionStaffSelect.value;
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => renderIssueSearchResults());
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleIssueBarcodeScan();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => renderIssueSearchResults());
  }

  bindEntrySearchTypeFilter('issue', (selectedTypes) => {
    state.issueDraft.searchTypes = selectedTypes;
    renderIssueSearchResults();
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => submitIssueVoucher());
  }

  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      state.issueFilter = filterSelect.value;
      renderIssueTable();
    });
  }
}

function openIssueModal() {
  const overlay = document.getElementById('issueVoucherModal');
  if (!overlay) return;
  resetIssueDraft();
  renderIssueSection();
  const errorEl = document.getElementById('issueError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('issueSearchInput');
  if (searchInput) searchInput.value = '';
  renderIssueSearchResults();
  overlay.classList.remove('hidden');
}

function openIssueEditModal(issue) {
  const overlay = document.getElementById('issueVoucherModal');
  if (!overlay || !issue) return;
  resetIssueDraft();
  state.issueDraft.editingId = issue.id || null;
  state.issueDraft.type = issue.issueType || 'order';
  state.issueDraft.cashierId = issue.cashierId || '';
  state.issueDraft.invoiceNumber = issue.invoiceNumber || '';
  state.issueDraft.productionStaffId = issue.productionStaffId || '';
  state.issueDraft.items = normalizeItems(issue.items).map((item) => ({ ...item }));
  state.issueDraft.originalItems = normalizeItems(issue.items).map((item) => ({ ...item }));
  renderIssueSection();
  const errorEl = document.getElementById('issueError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('issueSearchInput');
  if (searchInput) searchInput.value = '';
  renderIssueSearchResults();
  overlay.classList.remove('hidden');
}

function closeIssueModal() {
  const overlay = document.getElementById('issueVoucherModal');
  if (!overlay) return;
  overlay.classList.add('hidden');
}

function renderIssueSection() {
  if (!state.issueDraft) {
    resetIssueDraft();
  }
  const storekeeperInput = document.getElementById('issueStorekeeper');
  const typeSelect = document.getElementById('issueType');
  const orderFields = document.getElementById('issueOrderFields');
  const productionFields = document.getElementById('issueProductionFields');
  if (storekeeperInput) {
    storekeeperInput.value = state.user?.name || '-';
  }
  if (typeSelect) {
    typeSelect.value = state.issueDraft.type || 'order';
  }
  if (orderFields && productionFields) {
    orderFields.classList.toggle('hidden', state.issueDraft.type !== 'order');
    productionFields.classList.toggle('hidden', state.issueDraft.type !== 'production');
  }
  renderEntrySearchTypeFilter('issue', state.issueDraft.searchTypes);
  renderIssueSelects();
  renderIssueSearchResults();
  renderIssueDraftItems();
  const filterSelect = document.getElementById('issueFilterType');
  if (filterSelect) {
    filterSelect.value = state.issueFilter || 'all';
  }
  renderIssueTable();
}

function renderIssueSelects() {
  const cashierSelect = document.getElementById('issueCashier');
  const productionStaffSelect = document.getElementById('issueProductionStaff');
  const cashiers = state.cache.cashiers || {};
  const productionStaff = state.cache.productionStaff || {};

  if (cashierSelect) {
    cashierSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = window.i18n.t('select');
    cashierSelect.appendChild(placeholder);
    Object.entries(cashiers).forEach(([id, cashier]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = cashier.name || cashier.code || id;
      cashierSelect.appendChild(option);
    });
    cashierSelect.value = state.issueDraft.cashierId || '';
  }

  if (productionStaffSelect) {
    productionStaffSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = window.i18n.t('select');
    productionStaffSelect.appendChild(placeholder);
    Object.entries(productionStaff).forEach(([id, staff]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getStaffLabel(staff, id);
      productionStaffSelect.appendChild(option);
    });
    productionStaffSelect.value = state.issueDraft.productionStaffId || '';
  }
}

function getIssueSearchEntries() {
  return filterEntriesBySearchTypes(getAllItems(), state.issueDraft?.searchTypes);
}

function handleIssueBarcodeScan() {
  const searchInput = document.getElementById('issueSearchInput');
  if (!searchInput) return;
  const query = searchInput.value.trim();
  if (!query) return;
  const entries = getIssueSearchEntries();
  const match = findExactItemMatch(entries, query);
  if (match) {
    openIssueQtyModal(match);
    searchInput.value = '';
    renderIssueSearchResults();
  }
}

function renderIssueSearchResults() {
  const searchInput = document.getElementById('issueSearchInput');
  const results = document.getElementById('issueSearchResults');
  if (!searchInput || !results) return;
  const query = searchInput.value.trim();
  if (!query) {
    results.innerHTML = '';
    return;
  }
  const entries = filterItemEntries(getIssueSearchEntries(), query);
  const exact = findExactItemMatch(entries, query);
  if (exact) {
    openIssueQtyModal(exact);
    searchInput.value = '';
    results.innerHTML = '';
    return;
  }
  renderItemSearchResults(results, entries, (entry) => openIssueQtyModal(entry));
}

function openIssueQtyModal(entry) {
  resolveEntryWithProductionSelection(entry).then((selectedEntry) => {
    if (!selectedEntry) return;
    const mainBranchId = getMainBranchId();
    const available = getItemStock(selectedEntry.item, mainBranchId);
    openQtyModal({
      title: getLocalizedName(selectedEntry.item),
      available,
      ...getQtyModalUnitMeta(selectedEntry.item),
      mode: 'deduct',
      onConfirm: (qty) => {
        addIssueItem(selectedEntry, qty);
      }
    });
  });
}

function addIssueItem(entry, qty) {
  const productionId = entry.productionRecord?.id || null;
  const existing = state.issueDraft.items.find((item) => (
    item.itemId === entry.id
    && item.itemType === entry.type
    && (entry.type !== 'product' || String(item.productionId || '') === String(productionId || ''))
  ));
  if (existing) {
    existing.qty += qty;
  } else {
    state.issueDraft.items.push({
      itemId: entry.id,
      itemType: entry.type,
      name: getLocalizedName(entry.item),
      qty,
      unitId: entry.item.unitId || null,
      unitName: getResolvedItemUnitName(entry.item),
      productionId,
      productionDate: entry.productionRecord?.productionDate || null,
      productionNumber: entry.productionRecord?.productionNumber || null
    });
  }
  renderIssueDraftItems();
}

function renderIssueDraftItems() {
  const container = document.getElementById('issueItemsList');
  if (!container) return;
  container.innerHTML = '';
  if (!state.issueDraft.items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  state.issueDraft.items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'notice';
    const typeLabel = item.itemType === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials');
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${item.name}</strong>
          <div class="helper">${typeLabel} - ${window.i18n.t('quantity')}: ${formatQuantityWithUnit(item.qty, item, item.unitName)}</div>
          ${item.productionDate ? `<div class="helper">${window.i18n.t('production_date')}: ${item.productionDate}</div>` : ''}
        </div>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="edit" data-index="${index}">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete" data-index="${index}">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="edit"]').addEventListener('click', () => editIssueItemQty(index));
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      state.issueDraft.items.splice(index, 1);
      renderIssueDraftItems();
    });
    container.appendChild(card);
  });
}

function editIssueItemQty(index) {
  const item = state.issueDraft.items[index];
  if (!item) return;
  const branchId = getMainBranchId();
  const itemData = getItemDataByType(item.itemType, item.itemId);
  const availableBase = itemData ? getItemStock(itemData, branchId) : 0;
  const available = Number(availableBase || 0) + Number(item.qty || 0);
  openQtyModal({
    title: item.name || getLocalizedName(itemData),
    available,
    ...getQtyModalUnitMeta(item),
    mode: 'deduct',
    onConfirm: (qty) => {
      state.issueDraft.items[index].qty = qty;
      renderIssueDraftItems();
    }
  });
}

function submitIssueVoucher() {
  const errorEl = document.getElementById('issueError');
  if (errorEl) errorEl.textContent = '';
  if (!state.issueDraft.items.length) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  if (state.issueDraft.type === 'order') {
    if (!state.issueDraft.cashierId || !state.issueDraft.invoiceNumber) {
      if (errorEl) errorEl.textContent = window.i18n.t('error');
      return;
    }
  }
  if (state.issueDraft.type === 'production') {
    if (!state.issueDraft.productionStaffId) {
      if (errorEl) errorEl.textContent = window.i18n.t('error');
      return;
    }
  }

  const cashiers = state.cache.cashiers || {};
  const productionStaff = state.cache.productionStaff || {};
  const cashier = cashiers[state.issueDraft.cashierId] || null;
  const staff = productionStaff[state.issueDraft.productionStaffId] || null;
  const productionStaffName = getStaffLabel(staff, null);
  const mainBranchId = getMainBranchId();
  if (!mainBranchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const issueType = state.issueDraft.type;

  if (state.issueDraft.editingId) {
    const editingId = state.issueDraft.editingId;
    const existing = state.cache.stockIssue?.[editingId];
    const branchId = existing?.branchId || mainBranchId;
    const payload = {
      issueType,
      cashierId: issueType === 'order' ? state.issueDraft.cashierId : null,
      cashierName: issueType === 'order' ? (cashier?.name || cashier?.code || null) : null,
      invoiceNumber: issueType === 'order' ? state.issueDraft.invoiceNumber : null,
      productionStaffId: issueType === 'production' ? state.issueDraft.productionStaffId : null,
      productionStaffName: issueType === 'production' ? productionStaffName : null,
      items: state.issueDraft.items
    };
    db.ref(`stockIssue/${editingId}`).update(payload).then(() => {
      const updates = [];
      if (existing?.issueType === 'production') {
        normalizeItems(state.issueDraft.originalItems).forEach((item) => {
          updates.push(updateItemStock(item.itemType, item.itemId, branchId, Number(item.qty || 0)));
        });
      }
      if (issueType === 'production') {
        normalizeItems(state.issueDraft.items).forEach((item) => {
          updates.push(updateItemStock(item.itemType, item.itemId, branchId, -Number(item.qty || 0)));
        });
      }
      Promise.all(updates).then(() => {
        resetIssueDraft();
        renderIssueSection();
        closeIssueModal();
      });
    });
    return;
  }

  generateCounter('meta/issueCounter').then((issueNumber) => {
    const payload = {
      issueNumber,
      createdAt: serverTime,
      storekeeperId: state.user?.id || null,
      storekeeperName: state.user?.name || null,
      issueType,
      cashierId: issueType === 'order' ? state.issueDraft.cashierId : null,
      cashierName: issueType === 'order' ? (cashier?.name || cashier?.code || null) : null,
      invoiceNumber: issueType === 'order' ? state.issueDraft.invoiceNumber : null,
      productionStaffId: issueType === 'production' ? state.issueDraft.productionStaffId : null,
      productionStaffName: issueType === 'production' ? productionStaffName : null,
      items: state.issueDraft.items,
      branchId: mainBranchId
    };
    const issueRef = db.ref('stockIssue').push();
    issueRef.set(payload).then(() => {
      const updates = issueType === 'production'
        ? state.issueDraft.items.map((item) => updateItemStock(item.itemType, item.itemId, mainBranchId, -Number(item.qty || 0)))
        : [];
      Promise.all(updates).then(() => {
        resetIssueDraft();
        renderIssueSection();
        closeIssueModal();
      });
    });
  });
}

function renderIssueTable() {
  const table = document.getElementById('issueTable');
  if (!table) return;
  const issues = state.cache.stockIssue || {};
  let entries = Object.entries(issues).map(([id, issue]) => ({ id, ...issue }));
  if (state.issueFilter !== 'all') {
    entries = entries.filter((issue) => issue.issueType === state.issueFilter);
  }
  entries.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="9">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((issue) => {
    const items = normalizeItems(issue.items);
    const row = document.createElement('tr');
    const staffLabel = issue.productionStaffName || getStaffLabel(state.cache.productionStaff?.[issue.productionStaffId], '-') || '-';
    row.innerHTML = `
      <td>${issue.issueNumber || '-'}</td>
      <td>${issue.issueType === 'production' ? window.i18n.t('issue_production') : window.i18n.t('issue_order')}</td>
      <td>${formatDate(issue.createdAt)}</td>
      <td>${issue.storekeeperName || '-'}</td>
      <td>${issue.cashierName || '-'}</td>
      <td>${staffLabel}</td>
      <td>${issue.invoiceNumber || '-'}</td>
      <td>${items.length}</td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="view">${window.i18n.t('view')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn ghost small" data-action="print">${window.i18n.t('print_report')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </td>
    `;
    row.querySelector('[data-action="view"]').addEventListener('click', () => openIssueDetails(issue));
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openIssueEditModal(issue));
    row.querySelector('[data-action="print"]').addEventListener('click', () => printIssueReport(issue));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteIssue(issue));
    table.appendChild(row);
  });
}

function isIssueLinked(issueId) {
  if (!issueId) return false;
  const productions = state.cache.production || {};
  return Object.values(productions).some((prod) => prod.issueId === issueId);
}

function deleteIssue(issue) {
  if (!issue?.id) return;
  if (isIssueLinked(issue.id)) {
    alert(window.i18n.t('cannot_delete_linked_issue'));
    return;
  }
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const branchId = issue.branchId || getMainBranchId();
  const items = normalizeItems(issue.items);
  const updates = issue.issueType === 'production'
    ? items.map((item) => updateItemStock(item.itemType, item.itemId, branchId, Number(item.qty || 0)))
    : [];
  Promise.all(updates).then(() => {
    db.ref(`stockIssue/${issue.id}`).remove();
  });
}

function openIssueDetails(issue) {
  if (!els.issueDetailOverlay || !els.issueDetailBody) return;
  const items = normalizeItems(issue.items);
  const itemsHtml = items.map((item) => {
    const typeLabel = item.itemType === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials');
    return `<div class="row" style="justify-content: space-between;">
      <span>${item.name}</span>
      <span>${typeLabel} - ${window.i18n.t('quantity')}: ${formatNumber(item.qty)}</span>
    </div>`;
  }).join('');
  els.issueDetailBody.innerHTML = `
    <div class="notice" style="margin-bottom: 12px;">
      <div>${window.i18n.t('issue_number')}: ${issue.issueNumber || '-'}</div>
      <div>${window.i18n.t('issue_type')}: ${issue.issueType === 'production' ? window.i18n.t('issue_production') : window.i18n.t('issue_order')}</div>
      <div>${window.i18n.t('date_time')}: ${formatDate(issue.createdAt)}</div>
      <div>${window.i18n.t('storekeeper_name')}: ${issue.storekeeperName || '-'}</div>
      <div>${window.i18n.t('invoice_number')}: ${issue.invoiceNumber || '-'}</div>
    </div>
    <div class="stack">${itemsHtml || window.i18n.t('no_data')}</div>
  `;
  els.issueDetailOverlay.classList.remove('hidden');
}

function setupProductionSection() {
  const section = document.getElementById('section-production');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('production')}</h3>
        <div class="row" style="gap: 8px;">
          <button id="productionExportBtn" class="btn ghost">${window.i18n.t('download_report_excel')}</button>
          <button id="productionPrintReportBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
          <button id="openProductionModalBtn" class="btn primary">${window.i18n.t('new_production')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="productionSearchFilter" class="input" style="max-width: 260px;" placeholder="${window.i18n.t('search_production_placeholder')}" />
        <input id="productionDateFromFilter" class="input" type="date" style="max-width: 180px;" />
        <input id="productionDateToFilter" class="input" type="date" style="max-width: 180px;" />
        <select id="productionBranchFilter" class="input" style="max-width: 200px;"></select>
        <select id="productionStaffFilter" class="input" style="max-width: 200px;"></select>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('production_voucher')}</th>
            <th>${window.i18n.t('product_single')}</th>
            <th>${window.i18n.t('quantity')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('production_date')}</th>
            <th>${window.i18n.t('expiry_date')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('production_staff_single')}</th>
            <th>${window.i18n.t('issue_voucher_number')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="productionTable"></tbody>
      </table>
    </div>
    <div id="productionVoucherModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('new_production')}</h3>
          <button id="productionModalCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="productionStorekeeper" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('production_staff')}</label>
            <select id="productionStaffSelect" class="input"></select>
          </div>
          <div>
            <label class="tag">${window.i18n.t('branch')}</label>
            <select id="productionBranchSelect" class="input"></select>
          </div>
        </div>
        ${buildEntrySearchTypeFilterHtml('production')}
        <div class="row" style="margin-top: 12px;">
          <input id="productionSearchInput" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('search_items')}" />
          <button id="productionSearchBtn" class="btn ghost small">${window.i18n.t('search')}</button>
        </div>
        <div id="productionSearchResults" class="grid two" style="margin-top: 12px;"></div>
        <div id="productionDraftSummary" style="margin-top: 16px;"></div>
        <div class="row" style="justify-content: flex-end; margin-top: 12px;">
          <button id="productionCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="productionLinkBtn" class="btn ghost">${window.i18n.t('next')}</button>
          <button id="productionPrintBtn" class="btn primary">${window.i18n.t('print_label')}</button>
        </div>
        <p id="productionError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
  `;

  resetProductionDraft();
  bindProductionSection();
  renderProductionSection();
}

function resetProductionDraft() {
  state.productionDraft = {
    item: null,
    itemType: null,
    searchTypes: ['product'],
    qty: null,
    productionDate: '',
    expiryDate: '',
    productInfoConfirmed: false,
    productInfoDraft: {
      ingredients: '',
      origin: ''
    },
    issueId: null,
    issueSkipped: false,
    productionStaffId: '',
    branchId: '',
    editingId: null,
    originalRecord: null
  };
}

function bindProductionSection() {
  const openBtn = document.getElementById('openProductionModalBtn');
  const exportBtn = document.getElementById('productionExportBtn');
  const printReportBtn = document.getElementById('productionPrintReportBtn');
  const closeBtn = document.getElementById('productionModalCloseBtn');
  const cancelBtn = document.getElementById('productionCancelBtn');
  const staffSelect = document.getElementById('productionStaffSelect');
  const branchSelect = document.getElementById('productionBranchSelect');
  const searchInput = document.getElementById('productionSearchInput');
  const searchBtn = document.getElementById('productionSearchBtn');
  const linkBtn = document.getElementById('productionLinkBtn');
  const printBtn = document.getElementById('productionPrintBtn');
  const queryFilter = document.getElementById('productionSearchFilter');
  const fromFilter = document.getElementById('productionDateFromFilter');
  const toFilter = document.getElementById('productionDateToFilter');
  const branchFilter = document.getElementById('productionBranchFilter');
  const staffFilter = document.getElementById('productionStaffFilter');

  if (openBtn) {
    openBtn.addEventListener('click', () => openProductionModal());
  }
  if (exportBtn) {
    exportBtn.addEventListener('click', () => exportProductionReport());
  }
  if (printReportBtn) {
    printReportBtn.addEventListener('click', () => printProductionTableReport());
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeProductionModal());
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => closeProductionModal());
  }

  if (staffSelect) {
    staffSelect.addEventListener('change', () => {
      state.productionDraft.productionStaffId = staffSelect.value;
    });
  }

  if (branchSelect) {
    branchSelect.addEventListener('change', () => {
      state.productionDraft.branchId = branchSelect.value;
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => e.stopPropagation(), true);
    searchInput.addEventListener('keyup', (e) => e.stopPropagation(), true);
    searchInput.addEventListener('input', (e) => {
      e.stopPropagation();
      renderProductionSearchResults();
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleProductionBarcodeScan();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => renderProductionSearchResults());
  }

  bindEntrySearchTypeFilter('production', (selectedTypes) => {
    state.productionDraft.searchTypes = selectedTypes;
    renderProductionSearchResults();
  });

  if (linkBtn) {
    linkBtn.addEventListener('click', () => openProductionLinkModal());
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => submitProductionVoucher());
  }

  if (queryFilter) {
    queryFilter.value = state.productionFilters.query || '';
    queryFilter.addEventListener('input', () => {
      state.productionFilters.query = queryFilter.value || '';
      renderProductionTable();
    });
  }
  if (fromFilter) {
    fromFilter.value = state.productionFilters.fromDate || '';
    fromFilter.addEventListener('change', () => {
      state.productionFilters.fromDate = fromFilter.value || '';
      renderProductionTable();
    });
  }
  if (toFilter) {
    toFilter.value = state.productionFilters.toDate || '';
    toFilter.addEventListener('change', () => {
      state.productionFilters.toDate = toFilter.value || '';
      renderProductionTable();
    });
  }
  if (branchFilter) {
    branchFilter.addEventListener('change', () => {
      state.productionFilters.branchId = branchFilter.value || 'all';
      renderProductionTable();
    });
  }
  if (staffFilter) {
    staffFilter.addEventListener('change', () => {
      state.productionFilters.staffId = staffFilter.value || 'all';
      renderProductionTable();
    });
  }
}

function openProductionModal() {
  const overlay = document.getElementById('productionVoucherModal');
  if (!overlay) return;
  resetProductionDraft();
  state.productionDraft.branchId = getMainBranchId() || '';
  renderProductionSection();
  const errorEl = document.getElementById('productionError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('productionSearchInput');
  if (searchInput) {
    searchInput.value = '';
    searchInput.disabled = false;
    searchInput.readOnly = false;
    setTimeout(() => searchInput.focus(), 80);
  }
  renderProductionSearchResults();
  overlay.classList.remove('hidden');
}

function openProductionEditModal(record) {
  const overlay = document.getElementById('productionVoucherModal');
  if (!overlay || !record) return;
  resetProductionDraft();
  const itemData = record.itemType === 'product'
    ? state.cache.products?.[record.itemId]
    : state.cache.stockMaterials?.[record.itemId];
  if (itemData) {
    state.productionDraft.item = { id: record.itemId, type: record.itemType || 'product', item: itemData };
    state.productionDraft.itemType = record.itemType || 'product';
  }
  state.productionDraft.qty = record.qty || null;
  state.productionDraft.productionDate = record.productionDate || '';
  state.productionDraft.expiryDate = record.expiryDate || '';
  state.productionDraft.productInfoConfirmed = true;
  state.productionDraft.productInfoDraft = {
    ingredients: record.ingredients || '',
    origin: record.origin || ''
  };
  state.productionDraft.issueId = record.issueId || null;
  state.productionDraft.issueSkipped = !record.issueId;
  state.productionDraft.productionStaffId = record.productionStaffId || '';
  state.productionDraft.branchId = record.branchId || getMainBranchId() || '';
  state.productionDraft.editingId = record.id || null;
  state.productionDraft.originalRecord = { ...record };
  renderProductionSection();
  const errorEl = document.getElementById('productionError');
  if (errorEl) errorEl.textContent = '';
  overlay.classList.remove('hidden');
}

function closeProductionModal() {
  const overlay = document.getElementById('productionVoucherModal');
  if (!overlay) return;
  overlay.classList.add('hidden');
}

function renderProductionSection() {
  if (!state.productionDraft) {
    resetProductionDraft();
  }
  const queryFilter = document.getElementById('productionSearchFilter');
  const fromFilter = document.getElementById('productionDateFromFilter');
  const toFilter = document.getElementById('productionDateToFilter');
  if (queryFilter) queryFilter.value = state.productionFilters.query || '';
  if (fromFilter) fromFilter.value = state.productionFilters.fromDate || '';
  if (toFilter) toFilter.value = state.productionFilters.toDate || '';
  const storekeeperInput = document.getElementById('productionStorekeeper');
  if (storekeeperInput) {
    storekeeperInput.value = state.user?.name || '-';
  }
  renderEntrySearchTypeFilter('production', state.productionDraft.searchTypes);
  renderProductionStaffSelect();
  renderProductionSearchResults();
  renderProductionDraft();
  renderProductionTable();
}

function renderProductionStaffSelect() {
  const staffSelect = document.getElementById('productionStaffSelect');
  const staffFilter = document.getElementById('productionStaffFilter');
  const branchSelect = document.getElementById('productionBranchSelect');
  const branchFilter = document.getElementById('productionBranchFilter');
  const staff = state.cache.productionStaff || {};
  if (staffSelect) {
    staffSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = window.i18n.t('select');
    staffSelect.appendChild(placeholder);
    Object.entries(staff).forEach(([id, person]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getStaffLabel(person, id);
      staffSelect.appendChild(option);
    });
    staffSelect.value = state.productionDraft.productionStaffId || '';
  }
  if (staffFilter) {
    staffFilter.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = window.i18n.t('all');
    staffFilter.appendChild(allOption);
    Object.entries(staff).forEach(([id, person]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getStaffLabel(person, id);
      staffFilter.appendChild(option);
    });
    staffFilter.value = state.productionFilters.staffId || 'all';
  }
  if (branchSelect) {
    renderBranchOptions(branchSelect, { excludeMain: false });
    branchSelect.value = state.productionDraft.branchId || '';
  }
  if (branchFilter) {
    branchFilter.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = window.i18n.t('all_branches');
    branchFilter.appendChild(allOption);
    Object.entries(state.cache.branches || {}).forEach(([id, branch]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(branch);
      branchFilter.appendChild(option);
    });
    branchFilter.value = state.productionFilters.branchId || 'all';
  }
}

function getProductionSearchEntries() {
  return filterEntriesBySearchTypes(getAllItems(), state.productionDraft?.searchTypes);
}

function handleProductionBarcodeScan() {
  const searchInput = document.getElementById('productionSearchInput');
  if (!searchInput) return;
  const query = searchInput.value.trim();
  if (!query) return;
  const entries = getProductionSearchEntries();
  const match = findExactItemMatch(entries, query);
  if (match) {
    if (openProductionItem(match)) {
      searchInput.value = '';
      renderProductionSearchResults();
    }
  }
}

function renderProductionSearchResults() {
  const searchInput = document.getElementById('productionSearchInput');
  const results = document.getElementById('productionSearchResults');
  if (!searchInput || !results) return;
  if (state.productionDraft?.item) {
    results.innerHTML = '';
    return;
  }
  searchInput.disabled = false;
  searchInput.readOnly = false;
  let selectedTypes = normalizeEntrySearchTypes(state.productionDraft?.searchTypes);
  if (!selectedTypes.length) {
    state.productionDraft.searchTypes = ['product'];
    selectedTypes = ['product'];
    renderEntrySearchTypeFilter('production', selectedTypes);
  }
  if (selectedTypes.length !== 1) {
    results.innerHTML = `<p class="helper">اختر نوع واحد فقط: المنتجات أو مواد المخزون</p>`;
    return;
  }
  const query = searchInput.value.trim();
  if (!query) {
    results.innerHTML = '';
    return;
  }
  const entries = filterItemEntries(getProductionSearchEntries(), query);
  const exact = findExactItemMatch(entries, query);
  if (exact) {
    if (openProductionItem(exact)) {
      searchInput.value = '';
      results.innerHTML = '';
    }
    return;
  }
  renderItemSearchResults(results, entries, (entry) => openProductionItem(entry));
}

function setProductionError(message) {
  const errorEl = document.getElementById('productionError');
  if (errorEl) errorEl.textContent = message || '';
}

function getProductionInfoDefaults(entry) {
  if (!entry) return { ingredients: '', origin: '' };
  if (entry.type !== 'product') {
    return {
      ingredients: entry.item?.ingredients || '',
      origin: entry.item?.origin || ''
    };
  }
  const product = state.cache.products?.[entry.id] || entry.item || {};
  const info = getProductInfoByProductId(entry.id);
  const originFromSelect = product.countryOriginId ? getLocalizedName(state.cache.countryOrigins?.[product.countryOriginId]) : '';
  return {
    ingredients: info?.ingredients || product.ingredients || '',
    origin: info?.origin || product.origin || originFromSelect || ''
  };
}

function applyFixedExpiryToProductionDraft() {
  const draft = state.productionDraft;
  if (!draft?.item || draft.itemType !== 'product') return;
  const product = state.cache.products?.[draft.item.id] || draft.item.item || {};
  if (!product.fixedExpiryEnabled) return;
  draft.productionDate = product.fixedProductionDate || draft.productionDate || '';
  draft.expiryDate = product.fixedExpiryDate || draft.expiryDate || '';
}

function canSelectProductionItem(entry) {
  if (!state.productionDraft?.productionStaffId) {
    setProductionError('اختر موظف الإنتاج أولاً');
    return false;
  }
  const selectedTypes = normalizeEntrySearchTypes(state.productionDraft.searchTypes);
  if (selectedTypes.length !== 1) {
    setProductionError('اختر نوع واحد فقط: المنتجات أو مواد المخزون');
    return false;
  }
  if (!entry || !selectedTypes.includes(entry.type)) {
    setProductionError('المنتج المختار لا يطابق نوع البحث المحدد');
    return false;
  }
  return true;
}

function openProductionItem(entry) {
  const errorEl = document.getElementById('productionError');
  if (!canSelectProductionItem(entry)) return false;
  if (state.productionDraft.item) {
    if (state.productionDraft.item.id !== entry.id) {
      if (errorEl) errorEl.textContent = window.i18n.t('single_product_only');
    }
    return false;
  }
  if (errorEl) errorEl.textContent = '';
  state.productionDraft.item = entry;
  state.productionDraft.itemType = entry.type;
  state.productionDraft.qty = null;
  state.productionDraft.productionDate = '';
  state.productionDraft.expiryDate = '';
  state.productionDraft.productInfoConfirmed = false;
  state.productionDraft.productInfoDraft = getProductionInfoDefaults(entry);
  applyFixedExpiryToProductionDraft();
  state.productionDraft.issueId = null;
  state.productionDraft.issueSkipped = false;
  state.productionDraft.onDatesSelected = () => {
    renderProductionDraft();
    openProductionLinkModal();
  };
  const searchInput = document.getElementById('productionSearchInput');
  const results = document.getElementById('productionSearchResults');
  if (searchInput) searchInput.value = '';
  if (results) results.innerHTML = '';
  renderProductionDraft();
  return true;
}

function clearProductionItem() {
  state.productionDraft.item = null;
  state.productionDraft.itemType = null;
  state.productionDraft.qty = null;
  state.productionDraft.productionDate = '';
  state.productionDraft.expiryDate = '';
  state.productionDraft.productInfoConfirmed = false;
  state.productionDraft.productInfoDraft = {
    ingredients: '',
    origin: ''
  };
  state.productionDraft.issueId = null;
  state.productionDraft.issueSkipped = false;
  const errorEl = document.getElementById('productionError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('productionSearchInput');
  if (searchInput) searchInput.value = '';
}

function saveProductionDraftProductInfo() {
  const draft = state.productionDraft;
  if (!draft?.item) return Promise.resolve();
  const ingredients = String(draft.productInfoDraft?.ingredients || '').trim();
  const origin = String(draft.productInfoDraft?.origin || '').trim();
  if (draft.itemType !== 'product') {
    draft.productInfoConfirmed = true;
    return Promise.resolve();
  }
  const productId = draft.item.id;
  const product = state.cache.products?.[productId] || draft.item.item || {};
  const info = getProductInfoByProductId(productId);
  const infoId = getProductInfoEntryId(productId, info) || productId;
  const payload = {
    id: infoId,
    productId,
    productName: getLocalizedName(product),
    ingredients,
    origin,
    barcode: info?.barcode || product.barcode || '',
    updatedAt: Date.now()
  };
  if (!info?.createdAt) payload.createdAt = Date.now();
  return db.ref(`productInfos/${infoId}`).update(payload).then(() => {
    draft.productInfoConfirmed = true;
  });
}

function continueProductionAfterInfo() {
  const ingredientsInput = document.getElementById('productionIngredientsInput');
  const originInput = document.getElementById('productionOriginInput');
  if (ingredientsInput) state.productionDraft.productInfoDraft.ingredients = ingredientsInput.value || '';
  if (originInput) state.productionDraft.productInfoDraft.origin = originInput.value || '';
  saveProductionDraftProductInfo().then(() => {
    renderProductionDraft();
    openProductionDateModal();
  }).catch((error) => {
    console.error('Production product info save failed:', error);
    setProductionError('تعذر حفظ معلومات المنتج');
  });
}

function renderProductionDraft() {
  const container = document.getElementById('productionDraftSummary');
  const linkBtn = document.getElementById('productionLinkBtn');
  const printBtn = document.getElementById('productionPrintBtn');
  const searchInput = document.getElementById('productionSearchInput');
  const searchBtn = document.getElementById('productionSearchBtn');
  if (!container) return;
  if (printBtn) {
    printBtn.style.display = 'none';
  }
  if (linkBtn) {
    linkBtn.textContent = 'اختيار سند الصرف / طباعة الملصق';
  }
  if (!state.productionDraft.item) {
    container.innerHTML = `<p class="helper">${window.i18n.t('select')}</p>`;
    if (linkBtn) linkBtn.disabled = true;
    if (printBtn) printBtn.disabled = true;
    if (searchInput) searchInput.disabled = false;
    if (searchBtn) searchBtn.disabled = false;
    return;
  }
  const item = state.productionDraft.item;
  if (!state.productionDraft.productInfoConfirmed) {
    const infoDraft = state.productionDraft.productInfoDraft || { ingredients: '', origin: '' };
    container.innerHTML = `
      <div class="notice">
        <div><strong>${escapeHtml(getLocalizedName(item.item))}</strong></div>
        <div class="grid two" style="margin-top: 10px;">
          <div>
            <label class="tag" for="productionIngredientsInput">المكونات</label>
            <textarea id="productionIngredientsInput" class="input" rows="4" placeholder="المكونات">${escapeHtml(infoDraft.ingredients || '')}</textarea>
          </div>
          <div>
            <label class="tag" for="productionOriginInput">بلد المنشأ</label>
            <textarea id="productionOriginInput" class="input" rows="4" placeholder="بلد المنشأ">${escapeHtml(infoDraft.origin || '')}</textarea>
          </div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 10px;">
          <button id="productionInfoContinueBtn" class="btn primary">حفظ والمتابعة</button>
          <button id="productionChangeItem" class="btn ghost small">${window.i18n.t('change_product')}</button>
        </div>
      </div>
    `;
    if (searchInput) searchInput.disabled = true;
    if (searchBtn) searchBtn.disabled = true;
    if (linkBtn) linkBtn.disabled = true;
    if (printBtn) printBtn.disabled = true;
    document.getElementById('productionIngredientsInput')?.addEventListener('input', (event) => {
      state.productionDraft.productInfoDraft.ingredients = event.target.value || '';
    });
    document.getElementById('productionOriginInput')?.addEventListener('input', (event) => {
      state.productionDraft.productInfoDraft.origin = event.target.value || '';
    });
    document.getElementById('productionInfoContinueBtn')?.addEventListener('click', () => continueProductionAfterInfo());
    document.getElementById('productionChangeItem')?.addEventListener('click', () => {
      clearProductionItem();
      renderProductionDraft();
      renderProductionSearchResults();
    });
    return;
  }
  const issue = state.cache.stockIssue?.[state.productionDraft.issueId];
  const issueLabel = state.productionDraft.issueSkipped ? 'تم التخطي' : (issue?.issueNumber || '-');
  container.innerHTML = `
    <div class="notice">
      <div><strong>${getLocalizedName(item.item)}</strong></div>
      <div class="helper">${window.i18n.t('production_date')}: ${state.productionDraft.productionDate || '-'}</div>
      <div class="helper">${window.i18n.t('expiry_date')}: ${state.productionDraft.expiryDate || '-'}</div>
      <div class="helper">${window.i18n.t('branch')}: ${getBranchLabel(state.productionDraft.branchId)}</div>
      <div class="helper">${window.i18n.t('issue_number')}: ${issueLabel}</div>
      <button id="productionChangeItem" class="btn ghost small" style="margin-top: 8px;">${window.i18n.t('change_product')}</button>
    </div>
  `;
  if (searchInput) searchInput.disabled = true;
  if (searchBtn) searchBtn.disabled = true;
  const changeBtn = document.getElementById('productionChangeItem');
  if (changeBtn) {
    changeBtn.addEventListener('click', () => {
      clearProductionItem();
      renderProductionDraft();
      renderProductionSearchResults();
    });
  }
  const readyForLink = Boolean(state.productionDraft.productInfoConfirmed && state.productionDraft.productionDate && state.productionDraft.expiryDate);
  if (linkBtn) linkBtn.disabled = !readyForLink;
  const readyForPrint = readyForLink && (Boolean(state.productionDraft.issueId) || Boolean(state.productionDraft.issueSkipped));
  if (printBtn) printBtn.disabled = !readyForPrint;
}

function renderProductionIssueList() {
  if (!els.productionIssueList) return;
  const issues = state.cache.stockIssue || {};
  const entries = Object.entries(issues)
    .map(([id, issue]) => ({ id, ...issue }))
    .filter((issue) => issue.issueType === 'production')
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  els.productionIssueList.innerHTML = '';
  if (entries.length === 0) {
    els.productionIssueList.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  entries.forEach((issue) => {
    const card = document.createElement('div');
    card.className = 'notice';
    card.innerHTML = `
      <label class="row" style="justify-content: space-between; width: 100%;">
        <span>${window.i18n.t('issue_number')}: ${issue.issueNumber || '-'}</span>
        <input type="radio" name="productionIssue" value="${issue.id}" ${state.productionDraft.issueId === issue.id ? 'checked' : ''} />
      </label>
    `;
    els.productionIssueList.appendChild(card);
  });
}

function submitProductionVoucher() {
  const errorEl = document.getElementById('productionError');
  if (errorEl) errorEl.textContent = '';
  const rawLabelCopies = Math.floor(Number(state.productionDraft.labelCopies || state.productionDraft.qty || 0));
  if (!state.productionDraft.item || !rawLabelCopies || !state.productionDraft.productionDate || !state.productionDraft.expiryDate) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const labelCopies = Math.max(1, rawLabelCopies);
  if (!state.productionDraft.issueId && !state.productionDraft.issueSkipped) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  if (!state.productionDraft.branchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const staff = state.productionDraft.productionStaffId
    ? state.cache.productionStaff?.[state.productionDraft.productionStaffId]
    : null;
  const productionStaffName = state.productionDraft.productionStaffId
    ? getStaffLabel(staff, null)
    : (state.user?.name || null);
  const issue = state.productionDraft.issueId ? state.cache.stockIssue?.[state.productionDraft.issueId] : null;
  const branchId = state.productionDraft.branchId;

  if (state.productionDraft.editingId) {
    const editingId = state.productionDraft.editingId;
    const original = state.productionDraft.originalRecord || {};
    const itemData = state.productionDraft.item?.item || {};
    const payload = {
      productionStaffId: state.productionDraft.productionStaffId,
      productionStaffName: productionStaffName,
      issueId: state.productionDraft.issueId || null,
      issueNumber: issue?.issueNumber || null,
      itemId: state.productionDraft.item?.id || original.itemId,
      itemType: state.productionDraft.itemType || original.itemType,
      itemName: getLocalizedName(itemData) || original.itemName || '-',
      itemNameAr: itemData.nameAr || itemData.name || original.itemNameAr || null,
      itemNameEn: itemData.nameEn || itemData.name || original.itemNameEn || null,
      unitId: itemData.unitId || original.unitId || null,
      unitName: getResolvedItemUnitName(itemData) || original.unitName || null,
      qty: labelCopies,
      productionDate: state.productionDraft.productionDate,
      expiryDate: state.productionDraft.expiryDate,
      ingredients: state.productionDraft.productInfoDraft?.ingredients || original.ingredients || null,
      origin: state.productionDraft.productInfoDraft?.origin || original.origin || null,
      branchId
    };
    db.ref(`production/${editingId}`).update(payload).then(() => {
      const oldBranchId = original.branchId || branchId;
      const newBranchId = branchId;
      const oldItemType = original.itemType;
      const oldItemId = original.itemId;
      const oldQty = Number(original.qty || 0);
      const newItemType = state.productionDraft.itemType || oldItemType;
      const newItemId = state.productionDraft.item?.id || oldItemId;
      const newQty = Number(labelCopies || 0);
      const updates = [];
      if (oldItemType === newItemType && oldItemId === newItemId && oldBranchId === newBranchId) {
        const diff = newQty - oldQty;
        if (diff !== 0) updates.push(updateItemStock(newItemType, newItemId, newBranchId, diff));
      } else {
        updates.push(updateItemStock(oldItemType, oldItemId, oldBranchId, -oldQty));
        updates.push(updateItemStock(newItemType, newItemId, newBranchId, newQty));
      }
      Promise.all(updates).then(() => {
        resetProductionDraft();
        renderProductionSection();
        closeProductionModal();
      });
    });
    return;
  }

  generateCounter('meta/productionCounter').then((productionNumber) => {
    const productionBarcode = generateBarcodeValue();
    const itemData = state.productionDraft.item?.item || {};
    const payload = {
      productionNumber,
      productionBarcode,
      createdAt: serverTime,
      storekeeperId: state.user?.id || null,
      storekeeperName: state.user?.name || null,
      productionStaffId: state.productionDraft.productionStaffId,
      productionStaffName: productionStaffName,
      issueId: state.productionDraft.issueId || null,
      issueNumber: issue?.issueNumber || null,
      itemId: state.productionDraft.item.id,
      itemType: state.productionDraft.itemType,
      itemName: getLocalizedName(itemData),
      itemNameAr: itemData.nameAr || itemData.name || null,
      itemNameEn: itemData.nameEn || itemData.name || null,
      unitId: itemData.unitId || null,
      unitName: getResolvedItemUnitName(itemData) || null,
      qty: labelCopies,
      labelCopies,
      productionDate: state.productionDraft.productionDate,
      expiryDate: state.productionDraft.expiryDate,
      ingredients: state.productionDraft.productInfoDraft?.ingredients || null,
      origin: state.productionDraft.productInfoDraft?.origin || null,
      branchId
    };
    const productionRef = db.ref('production').push();
    productionRef.set(payload).then(() => {
      updateItemStock(state.productionDraft.itemType, state.productionDraft.item.id, branchId, Number(labelCopies || 0)).then(() => {
        printProductionLabel(payload, labelCopies);
        resetProductionDraft();
        renderProductionSection();
        closeProductionModal();
      });
    });
  });
}

function renderProductionTable() {
  const table = document.getElementById('productionTable');
  if (!table) return;
  const entries = getProductionTableEntries();
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="11">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((rec) => {
    const row = document.createElement('tr');
    const staffLabel = rec.productionStaffName || getStaffLabel(state.cache.productionStaff?.[rec.productionStaffId], '-') || '-';
    const qtyText = formatQuantityWithUnit(rec.qty, rec, getResolvedItemUnitName(rec));
    row.innerHTML = `
      <td>${rec.productionNumber || '-'}</td>
      <td>${rec.itemName || '-'}</td>
      <td>${qtyText}</td>
      <td>${formatDate(rec.createdAt)}</td>
      <td>${rec.productionDate || '-'}</td>
      <td>${rec.expiryDate || '-'}</td>
	      <td>${getBranchLabel(rec.branchId) || rec.branch || rec.branchName || '-'}</td>
      <td>${rec.storekeeperName || '-'}</td>
      <td>${staffLabel}</td>
      <td><button class="btn ghost small" data-action="issue">${rec.issueNumber || '-'}</button></td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="report">${window.i18n.t('print_report')}</button>
          <button class="btn ghost small" data-action="print">${window.i18n.t('print_label')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </td>
    `;
    row.querySelector('[data-action="print"]').addEventListener('click', () => printProductionLabel(rec));
    row.querySelector('[data-action="report"]').addEventListener('click', () => printProductionReport(rec));
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openProductionEditModal(rec));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteProduction(rec));
    row.querySelector('[data-action="issue"]').addEventListener('click', () => {
      const issue = state.cache.stockIssue?.[rec.issueId];
      if (issue) openIssueDetails(issue);
    });
    table.appendChild(row);
  });
}

function getProductionTableEntries() {
  const records = state.cache.production || {};
  const filters = state.productionFilters || { query: '', fromDate: '', toDate: '', branchId: 'all', staffId: 'all' };
  const queryRaw = String(filters.query || '').trim();
  const queryNorm = normalizeSearchValue(queryRaw);
  return Object.entries(records)
    .map(([id, rec]) => ({ id, ...rec }))
    .filter((rec) => {
      if (filters.branchId !== 'all' && (rec.branchId || '') !== filters.branchId) return false;
      if (filters.staffId !== 'all' && (rec.productionStaffId || '') !== filters.staffId) return false;
      if ((filters.fromDate || filters.toDate) && !isTimestampInDateRange(rec.createdAt, filters.fromDate, filters.toDate)) return false;
      if (!queryRaw) return true;
      const staffLabel = rec.productionStaffName || getStaffLabel(state.cache.productionStaff?.[rec.productionStaffId], '-') || '-';
      const targetText = `${rec.itemName || ''} ${rec.productionNumber || ''} ${rec.issueNumber || ''} ${staffLabel}`.toLowerCase();
      const targetCode = normalizeSearchValue(`${rec.productionNumber || ''} ${rec.issueNumber || ''}`);
      return targetText.includes(queryRaw.toLowerCase()) || targetCode.includes(queryNorm);
    })
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

function exportProductionReport() {
  const entries = getProductionTableEntries();
  if (!entries.length) return;
  const rows = entries.map((rec, index) => ({
    [window.i18n.t('row_number')]: index + 1,
    [window.i18n.t('production_voucher')]: rec.productionNumber || '-',
    [window.i18n.t('product_single')]: rec.itemName || '-',
    [window.i18n.t('quantity')]: formatQuantityWithUnit(rec.qty, rec, getResolvedItemUnitName(rec)),
    [window.i18n.t('date_time')]: formatDate(rec.createdAt),
    [window.i18n.t('production_date')]: rec.productionDate || '-',
    [window.i18n.t('expiry_date')]: rec.expiryDate || '-',
    [window.i18n.t('branch')]: getBranchLabel(rec.branchId),
    [window.i18n.t('storekeeper_name')]: rec.storekeeperName || '-',
    [window.i18n.t('production_staff_single')]: rec.productionStaffName || getStaffLabel(state.cache.productionStaff?.[rec.productionStaffId], '-') || '-',
    [window.i18n.t('issue_voucher_number')]: rec.issueNumber || '-'
  }));
  exportToExcel(rows, 'production-report.xlsx');
}

function printProductionTableReport() {
  const entries = getProductionTableEntries();
  if (!entries.length) return;
  const filters = state.productionFilters || {};
  const headers = [
    window.i18n.t('row_number'),
    window.i18n.t('production_voucher'),
    window.i18n.t('product_single'),
    window.i18n.t('quantity'),
    window.i18n.t('date_time'),
    window.i18n.t('production_date'),
    window.i18n.t('expiry_date'),
    window.i18n.t('branch'),
    window.i18n.t('storekeeper_name'),
    window.i18n.t('production_staff_single'),
    window.i18n.t('issue_voucher_number')
  ];
  const rows = entries.map((rec, index) => ([
    index + 1,
    rec.productionNumber || '-',
    rec.itemName || '-',
    formatQuantityWithUnit(rec.qty, rec, getResolvedItemUnitName(rec)),
    formatDate(rec.createdAt),
    rec.productionDate || '-',
    rec.expiryDate || '-',
    getBranchLabel(rec.branchId),
    rec.storekeeperName || '-',
    rec.productionStaffName || getStaffLabel(state.cache.productionStaff?.[rec.productionStaffId], '-') || '-',
    rec.issueNumber || '-'
  ]));
  const totalQty = entries.reduce((sum, rec) => sum + Number(rec.qty || 0), 0);
  printA4Report(
    window.i18n.t('production'),
    [
      { label: window.i18n.t('filter_from'), value: filters.fromDate || '-' },
      { label: window.i18n.t('filter_to'), value: filters.toDate || '-' },
      { label: window.i18n.t('branch'), value: filters.branchId === 'all' ? window.i18n.t('all_branches') : getBranchLabel(filters.branchId) },
      {
        label: window.i18n.t('production_staff_single'),
        value: filters.staffId === 'all'
          ? window.i18n.t('all')
          : (getStaffLabel(state.cache.productionStaff?.[filters.staffId], '-') || '-')
      }
    ],
    headers,
    rows,
    [
      { label: window.i18n.t('quantity'), value: formatNumber(totalQty) }
    ]
  );
}

function deleteProduction(record) {
  if (!record?.id) return;
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const branchId = record.branchId || getMainBranchId();
  updateItemStock(record.itemType, record.itemId, branchId, -Number(record.qty || 0)).then(() => {
    db.ref(`production/${record.id}`).remove();
  });
}

function isNearExpiryDate(dateText, days = 7) {
  if (!dateText) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(expiry.getTime())) return false;
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= days;
}

function getProductionFollowUpItemKey(itemOrType, itemId) {
  if (typeof itemOrType === 'object' && itemOrType) {
    return `${normalizeItemType(itemOrType)}:${itemOrType.itemId || itemOrType.id || ''}`;
  }
  return `${itemOrType || 'product'}:${itemId || ''}`;
}

function parseProductionFollowUpItemKey(value) {
  const raw = String(value || '').trim();
  if (!raw) return { itemType: '', itemId: '' };
  if (!raw.includes(':')) {
    return { itemType: 'product', itemId: raw };
  }
  const [itemType, ...rest] = raw.split(':');
  return {
    itemType: itemType || 'product',
    itemId: rest.join(':') || ''
  };
}

function getProductionFollowUpItemData(itemType, itemId) {
  return getItemDataByType(itemType || 'product', itemId || '');
}

function getFilteredProductionRecords(filters = state.productionFollowUpFilters || {}) {
  const queryRaw = String(filters.query || '').trim().toLowerCase();
  const queryNorm = normalizeSearchValue(filters.query || '');
  const selectedItem = parseProductionFollowUpItemKey(filters.productId);
  return Object.entries(state.cache.production || {})
    .map(([id, rec]) => ({ id, ...rec }))
    .filter((rec) => {
      if (selectedItem.itemId) {
        const recordItemType = normalizeItemType(rec);
        if ((rec.itemId || '') !== selectedItem.itemId || recordItemType !== selectedItem.itemType) return false;
      }
      if (filters.branchId && filters.branchId !== 'all' && (rec.branchId || '') !== filters.branchId) return false;
      if (filters.staffId && filters.staffId !== 'all' && (rec.productionStaffId || '') !== filters.staffId) return false;
      if ((filters.fromDate || filters.toDate) && !isTimestampInDateRange(rec.createdAt, filters.fromDate, filters.toDate)) return false;
      if (!queryRaw && !queryNorm) return true;
      const text = `${rec.itemName || ''} ${rec.itemNameAr || ''} ${rec.itemNameEn || ''} ${rec.productionNumber || ''}`.toLowerCase();
      const code = normalizeSearchValue(`${rec.productionNumber || ''}`);
      const itemCode = normalizeSearchValue(getProductionFollowUpItemData(normalizeItemType(rec), rec.itemId)?.code || '');
      return text.includes(queryRaw) || code.includes(queryNorm) || itemCode.includes(queryNorm);
    })
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

function setupProductionFollowUpSection() {
  renderProductionFollowUpSection();
}

function renderProductionFollowUpSection() {
  const section = document.getElementById('section-productionFollowUp');
  if (!section) return;
  const filters = state.productionFollowUpFilters || {};
  if (filters.productId) {
    renderProductionFollowUpDetailsView(section, filters);
    return;
  }
  renderProductionFollowUpListView(section, filters);
}

function renderProductionFollowUpFilters(container, filters, { includeSearch = false } = {}) {
  const branches = state.cache.branches || {};
  const staff = state.cache.productionStaff || {};
  const searchHtml = includeSearch
    ? `<input id="followUpSearchInput" class="input" style="max-width: 240px;" placeholder="${window.i18n.t('search_products')}" value="${filters.query || ''}" />`
    : '';
  container.innerHTML = `
    <input id="followUpFromDate" class="input" type="date" style="max-width: 180px;" value="${filters.fromDate || ''}" />
    <input id="followUpToDate" class="input" type="date" style="max-width: 180px;" value="${filters.toDate || ''}" />
    <select id="followUpBranchFilter" class="input" style="max-width: 200px;">
      <option value="all">${window.i18n.t('all_branches')}</option>
      ${Object.entries(branches).map(([id, branch]) => `<option value="${id}" ${filters.branchId === id ? 'selected' : ''}>${getLocalizedName(branch)}</option>`).join('')}
    </select>
    <select id="followUpStaffFilter" class="input" style="max-width: 200px;">
      <option value="all">${window.i18n.t('all')}</option>
      ${Object.entries(staff).map(([id, person]) => `<option value="${id}" ${filters.staffId === id ? 'selected' : ''}>${getStaffLabel(person, id)}</option>`).join('')}
    </select>
    ${searchHtml}
  `;
  const fromInput = container.querySelector('#followUpFromDate');
  const toInput = container.querySelector('#followUpToDate');
  const branchInput = container.querySelector('#followUpBranchFilter');
  const staffInput = container.querySelector('#followUpStaffFilter');
  const searchInput = container.querySelector('#followUpSearchInput');
  if (fromInput) fromInput.addEventListener('change', () => {
    state.productionFollowUpFilters.fromDate = fromInput.value || '';
    renderProductionFollowUpSection();
  });
  if (toInput) toInput.addEventListener('change', () => {
    state.productionFollowUpFilters.toDate = toInput.value || '';
    renderProductionFollowUpSection();
  });
  if (branchInput) branchInput.addEventListener('change', () => {
    state.productionFollowUpFilters.branchId = branchInput.value || 'all';
    renderProductionFollowUpSection();
  });
  if (staffInput) staffInput.addEventListener('change', () => {
    state.productionFollowUpFilters.staffId = staffInput.value || 'all';
    renderProductionFollowUpSection();
  });
  if (searchInput) searchInput.addEventListener('input', () => {
    state.productionFollowUpFilters.query = searchInput.value || '';
    renderProductionFollowUpSection();
  });
}

function renderProductionFollowUpListView(section, filters) {
  const records = getFilteredProductionRecords(filters);
  const map = {};
  records.forEach((rec) => {
    const itemType = normalizeItemType(rec);
    const itemId = rec.itemId || '';
    const itemKey = getProductionFollowUpItemKey(itemType, itemId);
    if (!itemId) return;
    if (!map[itemKey]) {
      const itemData = getProductionFollowUpItemData(itemType, itemId) || {};
      map[itemKey] = {
        productId: itemKey,
        itemType,
        itemId,
        code: itemData.code || '-',
        nameAr: itemData.nameAr || itemData.name || rec.itemNameAr || rec.itemName || '-',
        nameEn: itemData.nameEn || itemData.name || rec.itemNameEn || rec.itemName || '-',
        vouchersCount: 0,
        nearExpiry: 0
      };
    }
    map[itemKey].vouchersCount += 1;
    if (isNearExpiryDate(rec.expiryDate, 7)) {
      map[itemKey].nearExpiry += 1;
    }
  });
  const rows = Object.values(map).sort((a, b) => b.vouchersCount - a.vouchersCount);

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('production_followup')}</h2>
      </div>
      <div id="productionFollowUpFilters" class="row" style="margin-top: 12px; flex-wrap: wrap;"></div>
      ${rows.some((row) => row.nearExpiry > 0) && state.role === 'storekeeper'
        ? `<div class="notice" style="margin-top: 10px; border-color: #c43f2f; color: #c43f2f;">${window.i18n.t('near_expiry_notice')}</div>`
        : ''}
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('product_code')}</th>
            <th>${window.i18n.t('item_name_ar')}</th>
            <th>${window.i18n.t('item_name_en')}</th>
            <th>${window.i18n.t('production_vouchers_count')}</th>
            <th>${window.i18n.t('near_expiry_label')}</th>
          </tr>
        </thead>
        <tbody id="productionFollowUpTableBody"></tbody>
      </table>
    </div>
  `;

  const filtersWrap = document.getElementById('productionFollowUpFilters');
  if (filtersWrap) renderProductionFollowUpFilters(filtersWrap, filters, { includeSearch: true });

  const tbody = document.getElementById('productionFollowUpTableBody');
  if (!tbody) return;
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="5">${window.i18n.t('no_data')}</td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map((row) => `
    <tr class="report-clickable-row" data-id="${row.productId}">
      <td>${row.code}</td>
      <td>${row.nameAr}</td>
      <td>${row.nameEn}</td>
      <td>${row.vouchersCount}</td>
      <td style="${row.nearExpiry > 0 ? 'color:#c43f2f;font-weight:700;' : ''}">${row.nearExpiry}</td>
    </tr>
  `).join('');
  tbody.querySelectorAll('tr[data-id]').forEach((tr) => {
    tr.addEventListener('click', () => {
      state.productionFollowUpFilters.productId = tr.dataset.id;
      renderProductionFollowUpSection();
    });
  });
}

function renderProductionFollowUpDetailsView(section, filters) {
  const selectedItem = parseProductionFollowUpItemKey(filters.productId);
  const item = getProductionFollowUpItemData(selectedItem.itemType, selectedItem.itemId);
  const rows = getFilteredProductionRecords(filters).filter((rec) => (
    getProductionFollowUpItemKey(rec) === getProductionFollowUpItemKey(selectedItem.itemType, selectedItem.itemId)
  ));
  if (!selectedItem.itemId || !rows.length) {
    state.productionFollowUpFilters.productId = null;
    renderProductionFollowUpSection();
    return;
  }
  const title = getLocalizedName(item) !== '-' ? getLocalizedName(item) : (rows[0]?.itemName || '-');
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="productionFollowUpBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${title}</h2>
        </div>
      </div>
      <div id="productionFollowUpFilters" class="row" style="margin-top: 12px; flex-wrap: wrap;"></div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('production_voucher')}</th>
            <th>${window.i18n.t('product_single')}</th>
            <th>${window.i18n.t('quantity')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('production_date')}</th>
            <th>${window.i18n.t('expiry_date')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('production_staff_single')}</th>
            <th>${window.i18n.t('issue_voucher_number')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="productionFollowUpDetailsBody"></tbody>
      </table>
    </div>
  `;
  const backBtn = document.getElementById('productionFollowUpBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.productionFollowUpFilters.productId = null;
      renderProductionFollowUpSection();
    });
  }
  const filtersWrap = document.getElementById('productionFollowUpFilters');
  if (filtersWrap) renderProductionFollowUpFilters(filtersWrap, filters, { includeSearch: false });

  const tbody = document.getElementById('productionFollowUpDetailsBody');
  if (!tbody) return;
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="11">${window.i18n.t('no_data')}</td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map((rec) => {
    const staffLabel = rec.productionStaffName || getStaffLabel(state.cache.productionStaff?.[rec.productionStaffId], '-') || '-';
    return `
      <tr>
        <td>${rec.productionNumber || '-'}</td>
        <td>${rec.itemName || '-'}</td>
        <td>${formatQuantityWithUnit(rec.qty, rec, getResolvedItemUnitName(rec))}</td>
        <td>${formatDate(rec.createdAt)}</td>
        <td>${rec.productionDate || '-'}</td>
        <td>${rec.expiryDate || '-'}</td>
        <td>${getBranchLabel(rec.branchId)}</td>
        <td>${rec.storekeeperName || '-'}</td>
        <td>${staffLabel}</td>
        <td>${rec.issueNumber || '-'}</td>
        <td>
          <div class="row" style="gap: 6px;">
            <button class="btn ghost small" data-action="report" data-id="${rec.id}">${window.i18n.t('print_report')}</button>
            <button class="btn ghost small" data-action="label" data-id="${rec.id}">${window.i18n.t('print_label')}</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
  tbody.querySelectorAll('[data-action="report"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const rec = rows.find((item) => item.id === btn.dataset.id);
      if (rec) printProductionReport(rec);
    });
  });
  tbody.querySelectorAll('[data-action="label"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const rec = rows.find((item) => item.id === btn.dataset.id);
      if (rec) printProductionLabel(rec);
    });
  });
}

function getProductionLabelNames(record) {
  if (!record) return { nameAr: '', nameEn: '' };
  const nameAr = record.itemNameAr || record.itemName || '';
  const nameEn = record.itemNameEn || '';
  if (nameAr && nameEn) return { nameAr, nameEn };
  const cache = record.itemType === 'product' ? state.cache.products : state.cache.stockMaterials;
  const item = cache?.[record.itemId];
  if (!item) return { nameAr, nameEn };
  return {
    nameAr: nameAr || item.nameAr || item.name || record.itemName || '',
    nameEn: nameEn || item.nameEn || item.name || record.itemName || ''
  };
}

function getProductionLabelInfo(record) {
  if (!record) return {};
  const product = record.itemType === 'product' ? state.cache.products?.[record.itemId] : null;
  const info = record.itemType === 'product' ? getProductInfoByProductId(record.itemId) : null;
  const originFromSelect = product?.countryOriginId ? getLocalizedName(state.cache.countryOrigins?.[product.countryOriginId]) : '';
  return {
    ingredients: info?.ingredients || record.ingredients || '',
    origin: info?.origin || record.origin || originFromSelect || '',
    barcode: info?.barcode || product?.barcode || record.productionBarcode || ''
  };
}

const labelPrintSettings = {
  widthMm: 57,
  heightMm: 38,
  rotateDeg: 0,
  offsetXmm: 0,
  offsetYmm: 0,
  contentShiftXmm: 0,
  contentShiftYmm: 0,
  paddingXmm: 1.4,
  paddingYmm: 1,
  barcodeHeight: 24,
  barcodeWidth: 1,
  barcodeFontSize: 5,
  barcodeTextMargin: 1
};

const ZEBRA_DPI = 203;

function mmToDots(mm) {
  return Math.round((Number(mm) || 0) * ZEBRA_DPI / 25.4);
}

function buildBarcodeSvg(value) {
  if (!value || typeof JsBarcode === 'undefined') return '<svg></svg>';
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  JsBarcode(svg, value, {
    format: 'CODE128',
    displayValue: false,
    height: labelPrintSettings.barcodeHeight,
    width: labelPrintSettings.barcodeWidth,
    margin: 0,
    fontSize: labelPrintSettings.barcodeFontSize,
    textMargin: labelPrintSettings.barcodeTextMargin
  });
  return svg.outerHTML;
}

function fitTextToWidth(ctx, text, maxWidth, font) {
  const value = String(text || '').trim();
  if (!value) return '';
  ctx.font = font;
  return value;
}

function getFittedFontSize(ctx, text, maxWidth, maxSize, minSize, weight = 'bold', family = 'Arial, Tahoma, sans-serif') {
  const value = String(text || '').trim();
  for (let size = maxSize; size >= minSize; size -= 1) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (!value || ctx.measureText(value).width <= maxWidth) return size;
  }
  return minSize;
}

function drawFittedLine(ctx, text, x, y, maxWidth, options = {}) {
  const value = String(text || '').trim();
  if (!value) return;
  const {
    maxSize = 24,
    minSize = 12,
    weight = 'bold',
    family = 'Arial, Tahoma, sans-serif',
    align = 'center',
    direction = 'rtl'
  } = options;
  const size = getFittedFontSize(ctx, value, maxWidth, maxSize, minSize, weight, family);
  ctx.save();
  ctx.font = `${weight} ${size}px ${family}`;
  ctx.fillStyle = '#000';
  ctx.textAlign = align;
  ctx.direction = direction;
  ctx.textBaseline = 'top';
  const measured = ctx.measureText(value).width;
  const scaleX = measured > maxWidth ? Math.max(0.76, maxWidth / measured) : 1;
  if (scaleX < 1) {
    ctx.translate(x, y);
    ctx.scale(scaleX, 1);
    ctx.fillText(value, 0, 0);
  } else {
    ctx.fillText(value, x, y);
  }
  ctx.restore();
}

function wrapTextLines(ctx, text, maxWidth) {
  const words = String(text || '').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth || !line) {
      line = next;
    } else {
      lines.push(line);
      line = word;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function drawWrappedFittedText(ctx, text, x, y, maxWidth, maxLines, options = {}) {
  const value = String(text || '').replace(/\s+/g, ' ').trim();
  if (!value) return;
  const {
    maxSize = 18,
    minSize = 11,
    weight = 'bold',
    family = 'Arial, Tahoma, sans-serif',
    align = 'right',
    direction = 'rtl',
    lineGap = 3
  } = options;
  let selectedSize = minSize;
  let selectedLines = [];
  for (let size = maxSize; size >= minSize; size -= 1) {
    ctx.font = `${weight} ${size}px ${family}`;
    const lines = wrapTextLines(ctx, value, maxWidth);
    if (lines.length <= maxLines) {
      selectedSize = size;
      selectedLines = lines;
      break;
    }
    if (size === minSize) {
      selectedLines = lines.slice(0, maxLines);
    }
  }
  ctx.save();
  ctx.font = `${weight} ${selectedSize}px ${family}`;
  ctx.fillStyle = '#000';
  ctx.textAlign = align;
  ctx.direction = direction;
  ctx.textBaseline = 'top';
  const lineHeight = selectedSize + lineGap;
  selectedLines.slice(0, maxLines).forEach((line, index) => {
    const measured = ctx.measureText(line).width;
    const scaleX = measured > maxWidth ? Math.max(0.76, maxWidth / measured) : 1;
    if (scaleX < 1) {
      ctx.save();
      ctx.translate(x, y + (index * lineHeight));
      ctx.scale(scaleX, 1);
      ctx.fillText(line, 0, 0);
      ctx.restore();
    } else {
      ctx.fillText(line, x, y + (index * lineHeight));
    }
  });
  ctx.restore();
}

function wrapText(ctx, text, maxWidth, maxLines = 2) {
  const words = String(text || '').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth || !line) {
      line = next;
    } else {
      lines.push(line);
      line = word;
    }
  });
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[kept.length - 1] || '';
    while (last.length > 1 && ctx.measureText(`${last}...`).width > maxWidth) {
      last = last.slice(0, -1);
    }
    kept[kept.length - 1] = `${last}...`;
    return kept;
  }
  return lines;
}

function drawLabelBarcode(ctx, barcodeValue, x, y, maxWidth, height) {
  if (!barcodeValue || typeof JsBarcode === 'undefined') return;
  const barcodeCanvas = document.createElement('canvas');
  let moduleWidth = 1.35;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    JsBarcode(barcodeCanvas, barcodeValue, {
      format: 'CODE128',
      displayValue: false,
      height,
      width: moduleWidth,
      margin: 0
    });
    if (barcodeCanvas.width <= maxWidth || moduleWidth <= 0.62) break;
    moduleWidth -= 0.18;
  }
  const drawWidth = Math.min(barcodeCanvas.width, maxWidth);
  const drawX = x + Math.max(0, Math.floor((maxWidth - drawWidth) / 2));
  ctx.drawImage(barcodeCanvas, 0, 0, barcodeCanvas.width, barcodeCanvas.height, drawX, y, drawWidth, height);
}

function drawVerticalLabelBarcode(ctx, barcodeValue, x, y, maxWidth, maxHeight) {
  if (!barcodeValue || typeof JsBarcode === 'undefined') return;
  const barcodeCanvas = document.createElement('canvas');
  let moduleWidth = 2;
  JsBarcode(barcodeCanvas, barcodeValue, {
    format: 'CODE128',
    displayValue: false,
    height: maxWidth,
    width: moduleWidth,
    margin: 0
  });
  if (barcodeCanvas.width > maxHeight) {
    moduleWidth = 1;
    JsBarcode(barcodeCanvas, barcodeValue, {
      format: 'CODE128',
      displayValue: false,
      height: maxWidth,
      width: moduleWidth,
      margin: 0
    });
  }
  const drawHeight = Math.min(barcodeCanvas.width, maxHeight);
  const drawWidth = Math.min(barcodeCanvas.height, maxWidth);
  const drawY = y + Math.max(0, Math.floor((maxHeight - drawHeight) / 2));
  const drawX = x + Math.max(0, Math.floor((maxWidth - drawWidth) / 2));
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.translate(drawX, drawY + drawHeight);
  ctx.rotate(-Math.PI / 2);
  ctx.drawImage(barcodeCanvas, 0, 0, barcodeCanvas.width, barcodeCanvas.height, 0, 0, drawHeight, drawWidth);
  ctx.restore();
}

function canvasToMonoGfa(canvas) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const { width, height } = canvas;
  const image = ctx.getImageData(0, 0, width, height).data;
  const rowBytes = Math.ceil(width / 8);
  let hex = '';
  for (let y = 0; y < height; y += 1) {
    for (let byteX = 0; byteX < rowBytes; byteX += 1) {
      let byte = 0;
      for (let bit = 0; bit < 8; bit += 1) {
        const x = byteX * 8 + bit;
        if (x >= width) continue;
        const idx = (y * width + x) * 4;
        const alpha = image[idx + 3];
        const luminance = (image[idx] * 0.299) + (image[idx + 1] * 0.587) + (image[idx + 2] * 0.114);
        if (alpha > 32 && luminance < 160) {
          byte |= (0x80 >> bit);
        }
      }
      hex += byte.toString(16).padStart(2, '0').toUpperCase();
    }
  }
  const totalBytes = rowBytes * height;
  return { hex, totalBytes, rowBytes };
}

async function buildProductionLabelBitmapZpl(record, copies = 1) {
  const names = getProductionLabelNames(record);
  const info = getProductionLabelInfo(record);
  const barcodeValue = info.barcode || record.productionBarcode || generateBarcodeValue();
  const canvas = document.createElement('canvas');
  canvas.width = mmToDots(labelPrintSettings.widthMm);
  canvas.height = mmToDots(labelPrintSettings.heightMm);
  const ctx = canvas.getContext('2d');

  if (document.fonts?.ready) {
    try { await document.fonts.ready; } catch (_) {}
  }

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

  const nameAr = names.nameAr || record.itemName || '';
  const nameEn = names.nameEn || record.itemName || '';
  const ingredients = info.ingredients || '-';
  const origin = info.origin || '-';
  const productionDate = record.productionDate || '-';
  const expiryDate = record.expiryDate || '-';

  ctx.fillStyle = '#000';
  ctx.textBaseline = 'top';

  const barcodeBox = {
    x: 16,
    y: 28,
    width: 96,
    height: canvas.height - 56
  };
  drawVerticalLabelBarcode(ctx, barcodeValue, barcodeBox.x, barcodeBox.y, barcodeBox.width, barcodeBox.height);

  const contentLeft = barcodeBox.x + barcodeBox.width + 12;
  const contentRight = canvas.width - 18;
  const contentWidth = contentRight - contentLeft;
  const centerX = contentLeft + (contentWidth / 2);

  drawFittedLine(ctx, nameAr, centerX, 22, contentWidth, {
    maxSize: 31,
    minSize: 17,
    align: 'center',
    direction: 'rtl'
  });
  drawFittedLine(ctx, nameEn, centerX, 57, contentWidth, {
    maxSize: 24,
    minSize: 13,
    align: 'center',
    direction: 'ltr',
    family: 'Arial, sans-serif'
  });
  drawWrappedFittedText(ctx, `المكونات: ${ingredients}`, contentRight, 93, contentWidth, 3, {
    maxSize: 18,
    minSize: 11,
    align: 'right',
    direction: 'rtl',
    lineGap: 3
  });

  const metaTop = 212;
  const columns = [
    { label: 'إنتاج', value: productionDate, x: contentRight - 48, width: 96, direction: 'ltr' },
    { label: 'انتهاء', value: expiryDate, x: contentRight - 150, width: 96, direction: 'ltr' },
    { label: 'بلد المنشأ', value: origin, x: contentLeft + 42, width: 100, direction: 'rtl' }
  ];
  columns.forEach((item) => {
    drawFittedLine(ctx, item.label, item.x, metaTop, item.width, {
      maxSize: 20,
      minSize: 14,
      align: 'center',
      direction: 'rtl'
    });
    drawFittedLine(ctx, item.value, item.x, metaTop + 30, item.width, {
      maxSize: 21,
      minSize: 13,
      align: 'center',
      direction: item.direction,
      family: 'Arial, Tahoma, sans-serif'
    });
  });

  const { hex, totalBytes, rowBytes } = canvasToMonoGfa(canvas);
  const copiesCount = Math.max(1, Math.floor(Number(copies || 1)));
  return [
    '^XA',
    `^PW${canvas.width}`,
    `^LL${canvas.height}`,
    '^LH0,0',
    '^PR4',
    '^MD24',
    `^FO0,0^GFA,${totalBytes},${totalBytes},${rowBytes},${hex}^FS`,
    `^PQ${copiesCount}`,
    '^XZ'
  ].join('\n');
}

function buildProductionLabelHtml(record, copies = 1) {
  const names = getProductionLabelNames(record);
  const info = getProductionLabelInfo(record);
  const barcodeValue = info.barcode || record.productionBarcode || generateBarcodeValue();
  const barcodeSvg = buildBarcodeSvg(barcodeValue);
  const title = names.nameAr || names.nameEn || record.itemName || '';
  const nameAr = escapeHtml(names.nameAr || record.itemName || '');
  const nameEn = escapeHtml(names.nameEn || record.itemName || '');
  const ingredients = escapeHtml(info.ingredients || '-');
  const origin = escapeHtml(info.origin || '-');
  const productionDate = escapeHtml(record.productionDate || '-');
  const expiryDate = escapeHtml(record.expiryDate || '-');
  const {
    widthMm,
    heightMm,
    rotateDeg,
    offsetXmm,
    offsetYmm,
    contentShiftXmm,
    contentShiftYmm,
    paddingXmm,
    paddingYmm
  } = labelPrintSettings;
  const isRotated = Math.abs(rotateDeg) === 90;
  const rotatorWidthMm = isRotated ? heightMm : widthMm;
  const rotatorHeightMm = isRotated ? widthMm : heightMm;
  const rotateShiftXmm = rotateDeg === 90 ? rotatorHeightMm : rotateDeg === 180 ? rotatorWidthMm : 0;
  const rotateShiftYmm = rotateDeg === -90 ? rotatorWidthMm : rotateDeg === 180 ? rotatorHeightMm : 0;
  const copiesCount = Math.max(1, Math.floor(Number(copies || 1)));
  const labelSheet = `
        <div class="sheet">
          <div class="label">
            <div class="label-rotator">
              <div class="label-content">
                <div class="title">${nameAr}</div>
                <div class="title en">${nameEn}</div>
                <div class="ingredients">المكونات: ${ingredients}</div>
                <div class="meta-row">
                  <div class="meta-card origin">
                    <span class="meta-label">بلد المنشأ</span>
                    <span class="meta-value">${origin}</span>
                  </div>
                  <div class="meta-card production">
                    <span class="meta-label">إنتاج</span>
                    <span class="meta-value">${productionDate}</span>
                  </div>
                  <div class="meta-card expiry">
                    <span class="meta-label">انتهاء</span>
                    <span class="meta-value">${expiryDate}</span>
                  </div>
                </div>
                <div class="barcode">${barcodeSvg}</div>
              </div>
            </div>
          </div>
        </div>
  `;

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <style>
          @page { size: ${widthMm}mm ${heightMm}mm; margin: 0; }
          html, body {
            width: ${widthMm}mm;
            height: ${heightMm}mm;
            margin: 0;
            padding: 0;
            background: #fff;
            color: #000;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          body { font-family: Arial, Tahoma, sans-serif; overflow: hidden; }
          .sheet { width: ${widthMm}mm; height: ${heightMm}mm; overflow: hidden; background: #fff; color: #000; page-break-after: always; break-after: page; }
          .sheet:last-child { page-break-after: auto; break-after: auto; }
          .label {
            width: ${widthMm}mm;
            height: ${heightMm}mm;
            padding: ${paddingYmm}mm ${paddingXmm}mm;
            box-sizing: border-box;
            position: relative;
            transform: translate(${offsetXmm}mm, ${offsetYmm}mm);
            background: #fff;
            color: #000;
          }
          .label-rotator {
            width: ${rotateDeg === 0 ? '100%' : `${rotatorWidthMm}mm`};
            height: ${rotateDeg === 0 ? '100%' : `${rotatorHeightMm}mm`};
            transform: translate(${rotateShiftXmm}mm, ${rotateShiftYmm}mm) rotate(${rotateDeg}deg);
            transform-origin: top left;
          }
          .label-content {
            position: relative;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            border: .35mm solid #000;
            border-radius: 1mm;
            overflow: hidden;
            transform: translate(${contentShiftXmm}mm, ${contentShiftYmm}mm);
          }
          .title {
            position: absolute;
            left: 13mm;
            right: 1mm;
            top: 1.2mm;
            font-size: 12px;
            font-weight: 900;
            text-align: center;
            line-height: 1.02;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: clip;
            color: #000;
          }
          .title.en {
            top: 6.2mm;
            font-size: 9.6px;
            font-weight: 900;
            direction: ltr;
          }
          .ingredients {
            position: absolute;
            top: 11.4mm;
            right: 1mm;
            left: 13mm;
            height: 12mm;
            font-size: 8px;
            font-weight: 900;
            text-align: right;
            direction: rtl;
            line-height: 1.12;
            overflow: hidden;
            overflow-wrap: anywhere;
            color: #000;
          }
          .meta-row {
            position: absolute;
            top: 27.2mm;
            right: 1mm;
            left: 13mm;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1mm;
            color: #000;
          }
          .meta-card {
            min-width: 0;
            text-align: center;
            overflow: hidden;
            color: #000;
          }
          .meta-label {
            display: block;
            font-size: 7.2px;
            font-weight: 900;
            line-height: 1;
            direction: rtl;
            white-space: nowrap;
          }
          .meta-value {
            display: block;
            margin-top: 1mm;
            font-size: 8px;
            font-weight: 900;
            line-height: 1;
            direction: ltr;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: clip;
          }
          .meta-card.origin .meta-value { direction: rtl; }
          .barcode {
            position: absolute;
            left: 1.2mm;
            top: 4mm;
            width: 10mm;
            height: 30mm;
            text-align: center;
            overflow: hidden;
            line-height: 0;
          }
          .barcode svg {
            position: absolute;
            width: 30mm;
            height: 10mm;
            left: 0;
            top: 30mm;
            transform: rotate(-90deg);
            transform-origin: top left;
          }
        </style>
      </head>
      <body>
        ${Array.from({ length: copiesCount }, () => labelSheet).join('')}
      </body>
    </html>
  `;
}

async function printProductionLabel(record, copies = 1) {
  if (!record) return;
  if (window.figsDesktop?.isDesktopApp) {
    try {
      const zpl = await buildProductionLabelBitmapZpl(record, copies);
      await window.figsDesktop.printZpl({ zpl });
    } catch (error) {
      console.error('Desktop label print failed:', error);
      alert(`تعذرت طباعة الستيكر: ${error?.message || error || 'تأكد من اختيار طابعة الستيكرات في إعدادات الطابعات.'}`);
    }
    return;
  }
  const html = buildProductionLabelHtml(record, copies);
  const win = window.open('', '_blank', 'width=400,height=300');
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.onload = () => {
    setTimeout(() => win.print(), 350);
  };
}

function setupInventoryCountSection() {
  const section = document.getElementById('section-inventoryCount');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('inventory_count')}</h3>
        <button id="openInventoryModalBtn" class="btn primary">${window.i18n.t('new_inventory')}</button>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('count_number')}</th>
            <th>${window.i18n.t('branches')}</th>
            <th>${window.i18n.t('storage_locations')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="inventoryTable"></tbody>
      </table>
    </div>
    <div id="inventoryVoucherModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('new_inventory')}</h3>
          <button id="inventoryModalCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="inventoryStorekeeper" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('branches')}</label>
            <select id="inventoryBranchSelect" class="input"></select>
          </div>
        </div>
        <div id="inventoryStorageWrap" class="grid two hidden" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storage_locations')}</label>
            <select id="inventoryStorageSelect" class="input"></select>
          </div>
        </div>
        <div class="row" style="margin-top: 12px;">
          <input id="inventorySearchInput" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('search_items')}" />
          <button id="inventorySearchBtn" class="btn ghost small">${window.i18n.t('search')}</button>
        </div>
        <div id="inventorySearchResults" class="grid two" style="margin-top: 12px;"></div>
        <div style="margin-top: 16px;">
          <h4>${window.i18n.t('items')}</h4>
          <div id="inventoryItemsList" class="grid two"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="inventoryCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="inventoryConfirmBtn" class="btn primary">${window.i18n.t('confirm')}</button>
        </div>
        <p id="inventoryError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
  `;

  resetInventoryDraft();
  bindInventorySection();
  renderInventorySection();
}

function resetInventoryDraft() {
  state.inventoryDraft = {
    branchId: '',
    storageLocationId: '',
    items: [],
    editingId: null,
    originalItems: []
  };
}

function bindInventorySection() {
  const openBtn = document.getElementById('openInventoryModalBtn');
  const closeBtn = document.getElementById('inventoryModalCloseBtn');
  const cancelBtn = document.getElementById('inventoryCancelBtn');
  const branchSelect = document.getElementById('inventoryBranchSelect');
  const storageSelect = document.getElementById('inventoryStorageSelect');
  const searchInput = document.getElementById('inventorySearchInput');
  const searchBtn = document.getElementById('inventorySearchBtn');
  const confirmBtn = document.getElementById('inventoryConfirmBtn');

  if (openBtn) {
    openBtn.addEventListener('click', () => openInventoryModal());
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeInventoryModal());
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => closeInventoryModal());
  }

  if (branchSelect) {
    branchSelect.addEventListener('change', () => {
      state.inventoryDraft.branchId = branchSelect.value;
      updateInventoryStorageVisibility();
      renderInventorySearchResults();
    });
  }

  if (storageSelect) {
    storageSelect.addEventListener('change', () => {
      state.inventoryDraft.storageLocationId = storageSelect.value;
      renderInventorySearchResults();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => renderInventorySearchResults());
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleInventoryBarcodeScan();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => renderInventorySearchResults());
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => submitInventoryCount());
  }
}

function openInventoryModal() {
  const overlay = document.getElementById('inventoryVoucherModal');
  if (!overlay) return;
  resetInventoryDraft();
  renderInventorySection();
  const errorEl = document.getElementById('inventoryError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('inventorySearchInput');
  if (searchInput) searchInput.value = '';
  renderInventorySearchResults();
  overlay.classList.remove('hidden');
}

function openInventoryEditModal(record) {
  const overlay = document.getElementById('inventoryVoucherModal');
  if (!overlay || !record) return;
  resetInventoryDraft();
  state.inventoryDraft.editingId = record.id || null;
  state.inventoryDraft.branchId = record.branchId || '';
  state.inventoryDraft.storageLocationId = record.storageLocationId || '';
  state.inventoryDraft.items = normalizeItems(record.items).map((item) => ({ ...item }));
  state.inventoryDraft.originalItems = normalizeItems(record.items).map((item) => ({ ...item }));
  renderInventorySection();
  const errorEl = document.getElementById('inventoryError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('inventorySearchInput');
  if (searchInput) searchInput.value = '';
  renderInventorySearchResults();
  overlay.classList.remove('hidden');
}

function closeInventoryModal() {
  const overlay = document.getElementById('inventoryVoucherModal');
  if (!overlay) return;
  overlay.classList.add('hidden');
}

function renderInventorySection() {
  if (!state.inventoryDraft) {
    resetInventoryDraft();
  }
  const storekeeperInput = document.getElementById('inventoryStorekeeper');
  if (storekeeperInput) {
    storekeeperInput.value = state.user?.name || '-';
  }
  renderInventorySelects();
  updateInventoryStorageVisibility();
  renderInventorySearchResults();
  renderInventoryItems();
  renderInventoryTable();
}

function renderInventorySelects() {
  const branchSelect = document.getElementById('inventoryBranchSelect');
  const storageSelect = document.getElementById('inventoryStorageSelect');
  const branches = state.cache.branches || {};
  const storageLocations = state.cache.storageLocations || {};

  if (branchSelect) {
    branchSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = window.i18n.t('select_branch');
    branchSelect.appendChild(placeholder);
    Object.entries(branches).forEach(([id, branch]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(branch);
      branchSelect.appendChild(option);
    });
    branchSelect.value = state.inventoryDraft.branchId || '';
  }

  if (storageSelect) {
    storageSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = window.i18n.t('select');
    storageSelect.appendChild(placeholder);
    Object.entries(storageLocations).forEach(([id, location]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(location);
      storageSelect.appendChild(option);
    });
    storageSelect.value = state.inventoryDraft.storageLocationId || '';
  }
}

function updateInventoryStorageVisibility() {
  const wrap = document.getElementById('inventoryStorageWrap');
  const branchId = state.inventoryDraft.branchId;
  const branches = state.cache.branches || {};
  const isMain = branchId && branches[branchId]?.isMain;
  if (wrap) {
    wrap.classList.toggle('hidden', !isMain);
  }
  if (!isMain) {
    state.inventoryDraft.storageLocationId = '';
    const storageSelect = document.getElementById('inventoryStorageSelect');
    if (storageSelect) storageSelect.value = '';
  }
}

function getInventorySearchEntries() {
  const entries = getAllItems();
  const branchId = state.inventoryDraft.branchId;
  const branches = state.cache.branches || {};
  const isMain = branchId && branches[branchId]?.isMain;
  const storageId = state.inventoryDraft.storageLocationId;
  if (isMain && storageId) {
    return entries.filter((entry) => entry.item.storageLocationId === storageId);
  }
  return entries;
}

function handleInventoryBarcodeScan() {
  const searchInput = document.getElementById('inventorySearchInput');
  if (!searchInput) return;
  const query = searchInput.value.trim();
  if (!query) return;
  const entries = getInventorySearchEntries();
  const match = findExactItemMatch(entries, query);
  if (match) {
    openInventoryQtyModal(match);
    searchInput.value = '';
    renderInventorySearchResults();
  }
}

function renderInventorySearchResults() {
  const searchInput = document.getElementById('inventorySearchInput');
  const results = document.getElementById('inventorySearchResults');
  if (!searchInput || !results) return;
  const query = searchInput.value.trim();
  if (!query) {
    results.innerHTML = '';
    return;
  }
  const entries = filterItemEntries(getInventorySearchEntries(), query);
  const exact = findExactItemMatch(entries, query);
  if (exact) {
    openInventoryQtyModal(exact);
    searchInput.value = '';
    results.innerHTML = '';
    return;
  }
  renderItemSearchResults(results, entries, (entry) => openInventoryQtyModal(entry));
}

function openInventoryQtyModal(entry) {
  resolveEntryWithProductionSelection(entry).then((selectedEntry) => {
    if (!selectedEntry) return;
    const branchId = state.inventoryDraft.branchId || getMainBranchId();
    const available = getItemStock(selectedEntry.item, branchId);
    openQtyModal({
      title: getLocalizedName(selectedEntry.item),
      available,
      ...getQtyModalUnitMeta(selectedEntry.item),
      mode: 'set',
      onConfirm: (qty) => {
        addInventoryItem(selectedEntry, qty);
      }
    });
  });
}

function addInventoryItem(entry, qty) {
  const productionId = entry.productionRecord?.id || null;
  const existing = state.inventoryDraft.items.find((item) => (
    item.itemId === entry.id
    && item.itemType === entry.type
    && (entry.type !== 'product' || String(item.productionId || '') === String(productionId || ''))
  ));
  if (existing) {
    existing.qty = qty;
  } else {
    state.inventoryDraft.items.push({
      itemId: entry.id,
      itemType: entry.type,
      name: getLocalizedName(entry.item),
      qty,
      unitId: entry.item.unitId || null,
      unitName: getResolvedItemUnitName(entry.item),
      productionId,
      productionDate: entry.productionRecord?.productionDate || null,
      productionNumber: entry.productionRecord?.productionNumber || null
    });
  }
  renderInventoryItems();
}

function renderInventoryItems() {
  const container = document.getElementById('inventoryItemsList');
  if (!container) return;
  container.innerHTML = '';
  if (!state.inventoryDraft.items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  state.inventoryDraft.items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'notice';
    const typeLabel = item.itemType === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials');
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${item.name}</strong>
          <div class="helper">${typeLabel} - ${window.i18n.t('quantity')}: ${formatQuantityWithUnit(item.qty, item, item.unitName)}</div>
          ${item.productionDate ? `<div class="helper">${window.i18n.t('production_date')}: ${item.productionDate}</div>` : ''}
        </div>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="edit" data-index="${index}">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete" data-index="${index}">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="edit"]').addEventListener('click', () => editInventoryItemQty(index));
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      state.inventoryDraft.items.splice(index, 1);
      renderInventoryItems();
    });
    container.appendChild(card);
  });
}

function editInventoryItemQty(index) {
  const item = state.inventoryDraft.items[index];
  if (!item) return;
  openQtyModal({
    title: item.name,
    available: null,
    ...getQtyModalUnitMeta(item),
    mode: 'set',
    onConfirm: (qty) => {
      state.inventoryDraft.items[index].qty = qty;
      renderInventoryItems();
    }
  });
}

function submitInventoryCount() {
  const errorEl = document.getElementById('inventoryError');
  if (errorEl) errorEl.textContent = '';
  if (!state.inventoryDraft.branchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  if (!state.inventoryDraft.items.length) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const branchId = state.inventoryDraft.branchId;
  const storageLocationId = state.inventoryDraft.storageLocationId || null;
  const branches = state.cache.branches || {};
  const isMain = branchId && branches[branchId]?.isMain;
  if (isMain && !storageLocationId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }

  const itemsWithPrevious = state.inventoryDraft.items.map((item) => {
    const itemData = item.itemType === 'product'
      ? state.cache.products?.[item.itemId]
      : state.cache.stockMaterials?.[item.itemId];
    const previousQty = itemData ? getItemStock(itemData, branchId) : 0;
    return { ...item, previousQty };
  });

  if (state.inventoryDraft.editingId) {
    const editingId = state.inventoryDraft.editingId;
    const existing = state.cache.inventoryCount?.[editingId];
    const payload = {
      branchId,
      storageLocationId,
      items: itemsWithPrevious
    };
    db.ref(`inventoryCount/${editingId}`).update(payload).then(() => {
      const updates = [];
      itemsWithPrevious.forEach((item) => {
        updates.push(updateItemStock(item.itemType, item.itemId, branchId, Number(item.qty || 0), 'set'));
      });
      const oldMap = buildItemMap(existing?.items || []);
      const newMap = buildItemMap(state.inventoryDraft.items);
      Object.keys(oldMap).forEach((key) => {
        if (!newMap[key]) {
          const oldItem = oldMap[key];
          const previousQty = normalizeItems(existing?.items || []).find((it) => getItemKey(it) === key)?.previousQty;
          if (previousQty !== undefined && previousQty !== null) {
            updates.push(updateItemStock(oldItem.itemType, oldItem.itemId, branchId, Number(previousQty || 0), 'set'));
          }
        }
      });
      Promise.all(updates).then(() => {
        resetInventoryDraft();
        renderInventorySection();
        closeInventoryModal();
      });
    });
    return;
  }

  generateCounter('meta/inventoryCounter').then((countNumber) => {
    const payload = {
      countNumber,
      createdAt: serverTime,
      storekeeperId: state.user?.id || null,
      storekeeperName: state.user?.name || null,
      branchId,
      storageLocationId,
      items: itemsWithPrevious
    };
    const countRef = db.ref('inventoryCount').push();
    countRef.set(payload).then(() => {
      const updates = itemsWithPrevious.map((item) => updateItemStock(item.itemType, item.itemId, branchId, Number(item.qty || 0), 'set'));
      Promise.all(updates).then(() => {
        resetInventoryDraft();
        renderInventorySection();
        closeInventoryModal();
      });
    });
  });
}

function renderInventoryTable() {
  const table = document.getElementById('inventoryTable');
  if (!table) return;
  const records = state.cache.inventoryCount || {};
  const branches = state.cache.branches || {};
  const storageLocations = state.cache.storageLocations || {};
  const entries = Object.entries(records).map(([id, rec]) => ({ id, ...rec })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="7">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((rec) => {
    const items = normalizeItems(rec.items);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${rec.countNumber || '-'}</td>
      <td>${getLocalizedName(branches[rec.branchId]) || '-'}</td>
      <td>${getLocalizedName(storageLocations[rec.storageLocationId]) || '-'}</td>
      <td>${formatDate(rec.createdAt)}</td>
      <td>${rec.storekeeperName || '-'}</td>
      <td>${items.length}</td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="print">${window.i18n.t('print_report')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </td>
    `;
    row.querySelector('[data-action="print"]').addEventListener('click', () => printInventoryReport(rec));
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openInventoryEditModal(rec));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteInventoryCount(rec));
    table.appendChild(row);
  });
}

function deleteInventoryCount(record) {
  if (!record?.id) return;
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const branchId = record.branchId;
  const items = normalizeItems(record.items);
  if (!items.length) {
    db.ref(`inventoryCount/${record.id}`).remove();
    return;
  }
  const hasMissingPrevious = items.some((item) => item.previousQty === undefined || item.previousQty === null);
  if (hasMissingPrevious) {
    alert(window.i18n.t('cannot_revert_inventory'));
    return;
  }
  const updates = items.map((item) => updateItemStock(item.itemType, item.itemId, branchId, Number(item.previousQty || 0), 'set'));
  Promise.all(updates).then(() => {
    db.ref(`inventoryCount/${record.id}`).remove();
  });
}

function setupReceivingSection() {
  const section = document.getElementById('section-receiving');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('receiving')}</h3>
        <button id="openReceivingModalBtn" class="btn primary">${window.i18n.t('new_receiving')}</button>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('receiving_number')}</th>
            <th>${window.i18n.t('source_name')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('storage_locations')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="receivingTable"></tbody>
      </table>
    </div>
    <div id="receivingVoucherModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('receiving_voucher')}</h3>
          <button id="receivingModalCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('source_name')}</label>
            <input id="receivingSourceName" class="input" />
          </div>
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="receivingStorekeeper" class="input" readonly />
          </div>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('item_name_ar')}</label>
            <input id="receivingItemNameAr" class="input" />
          </div>
          <div>
            <label class="tag">${window.i18n.t('item_name_en')}</label>
            <input id="receivingItemNameEn" class="input" />
          </div>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('quantity')}</label>
            <input id="receivingItemQty" class="input" type="number" step="0.01" />
          </div>
          <div>
            <label class="tag">${window.i18n.t('storage_location')}</label>
            <select id="receivingItemStorage" class="input"></select>
          </div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 12px;">
          <button id="receivingAddItemBtn" class="btn ghost small">${window.i18n.t('add')}</button>
        </div>
        <div style="margin-top: 12px;">
          <h4>${window.i18n.t('items')}</h4>
          <div id="receivingItemsList" class="grid two"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="receivingCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="receivingSubmitBtn" class="btn primary">${window.i18n.t('receive_action')}</button>
        </div>
        <p id="receivingError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
  `;

  resetReceivingDraft();
  bindReceivingSection();
  renderReceivingSection();
}

function resetReceivingDraft() {
  state.receivingDraft = {
    sourceName: '',
    items: [],
    editingId: null
  };
}

function bindReceivingSection() {
  const openBtn = document.getElementById('openReceivingModalBtn');
  const closeBtn = document.getElementById('receivingModalCloseBtn');
  const cancelBtn = document.getElementById('receivingCancelBtn');
  const sourceInput = document.getElementById('receivingSourceName');
  const nameArInput = document.getElementById('receivingItemNameAr');
  const nameEnInput = document.getElementById('receivingItemNameEn');
  const qtyInput = document.getElementById('receivingItemQty');
  const storageSelect = document.getElementById('receivingItemStorage');
  const addBtn = document.getElementById('receivingAddItemBtn');
  const submitBtn = document.getElementById('receivingSubmitBtn');

  if (openBtn) openBtn.addEventListener('click', () => openReceivingModal());
  if (closeBtn) closeBtn.addEventListener('click', () => closeReceivingModal());
  if (cancelBtn) cancelBtn.addEventListener('click', () => closeReceivingModal());

  if (sourceInput) {
    sourceInput.addEventListener('input', () => {
      state.receivingDraft.sourceName = sourceInput.value.trim();
      const errorEl = document.getElementById('receivingError');
      if (errorEl) errorEl.textContent = '';
    });
  }

  const handleAdd = () => {
    const errorEl = document.getElementById('receivingError');
    if (errorEl) errorEl.textContent = '';
    const nameAr = nameArInput?.value.trim() || '';
    const nameEn = nameEnInput?.value.trim() || '';
    const qtyValue = qtyInput?.value.trim() || '';
    const qty = Number(String(qtyValue).replace(',', '.'));
    const storageLocationId = storageSelect?.value || '';
    if (!nameAr || !nameEn || !qty || Number.isNaN(qty) || !storageLocationId) {
      if (errorEl) errorEl.textContent = window.i18n.t('error');
      return;
    }
    state.receivingDraft.items.push({ nameAr, nameEn, qty, storageLocationId });
    if (nameArInput) nameArInput.value = '';
    if (nameEnInput) nameEnInput.value = '';
    if (qtyInput) qtyInput.value = '';
    if (storageSelect) storageSelect.value = '';
    renderReceivingItems();
  };

  if (addBtn) addBtn.addEventListener('click', handleAdd);
  if (qtyInput) {
    qtyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAdd();
      }
    });
  }

  if (submitBtn) submitBtn.addEventListener('click', () => submitReceivingVoucher());
}

function openReceivingModal() {
  const overlay = document.getElementById('receivingVoucherModal');
  if (!overlay) return;
  resetReceivingDraft();
  renderReceivingSection();
  const errorEl = document.getElementById('receivingError');
  if (errorEl) errorEl.textContent = '';
  const nameArInput = document.getElementById('receivingItemNameAr');
  const nameEnInput = document.getElementById('receivingItemNameEn');
  const qtyInput = document.getElementById('receivingItemQty');
  if (nameArInput) nameArInput.value = '';
  if (nameEnInput) nameEnInput.value = '';
  if (qtyInput) qtyInput.value = '';
  overlay.classList.remove('hidden');
}

function openReceivingEditModal(record) {
  const overlay = document.getElementById('receivingVoucherModal');
  if (!overlay || !record) return;
  resetReceivingDraft();
  state.receivingDraft.editingId = record.id || null;
  state.receivingDraft.sourceName = record.sourceName || '';
  state.receivingDraft.items = normalizeItems(record.items).map((item) => ({ ...item }));
  renderReceivingSection();
  const errorEl = document.getElementById('receivingError');
  if (errorEl) errorEl.textContent = '';
  overlay.classList.remove('hidden');
}

function closeReceivingModal() {
  const overlay = document.getElementById('receivingVoucherModal');
  if (overlay) overlay.classList.add('hidden');
}

function renderReceivingSection() {
  if (!state.receivingDraft) resetReceivingDraft();
  const storekeeperInput = document.getElementById('receivingStorekeeper');
  const sourceInput = document.getElementById('receivingSourceName');
  const storageSelect = document.getElementById('receivingItemStorage');
  if (storekeeperInput) storekeeperInput.value = state.user?.name || '-';
  if (sourceInput) sourceInput.value = state.receivingDraft.sourceName || '';
  if (storageSelect) {
    renderStorageLocationOptions(storageSelect);
    storageSelect.value = '';
  }
  renderReceivingItems();
  renderReceivingTable();
}

function renderReceivingItems() {
  const container = document.getElementById('receivingItemsList');
  if (!container) return;
  container.innerHTML = '';
  if (!state.receivingDraft.items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  state.receivingDraft.items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'notice';
    const nameLine = `${item.nameAr || '-'} / ${item.nameEn || '-'}`;
    const locationName = getLocalizedName(state.cache.storageLocations?.[item.storageLocationId]) || '-';
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${nameLine}</strong>
          <div class="helper">${window.i18n.t('quantity')}: ${formatNumber(item.qty)} | ${window.i18n.t('storage_location')}: ${locationName}</div>
        </div>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="edit" data-index="${index}">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete" data-index="${index}">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="edit"]').addEventListener('click', () => editReceivingItem(index));
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      state.receivingDraft.items.splice(index, 1);
      renderReceivingItems();
    });
    container.appendChild(card);
  });
}

function editReceivingItem(index) {
  const item = state.receivingDraft.items[index];
  if (!item) return;
  const nameArInput = document.getElementById('receivingItemNameAr');
  const nameEnInput = document.getElementById('receivingItemNameEn');
  const qtyInput = document.getElementById('receivingItemQty');
  const storageSelect = document.getElementById('receivingItemStorage');
  if (nameArInput) nameArInput.value = item.nameAr || '';
  if (nameEnInput) nameEnInput.value = item.nameEn || '';
  if (qtyInput) qtyInput.value = item.qty || '';
  if (storageSelect) storageSelect.value = item.storageLocationId || '';
  state.receivingDraft.items.splice(index, 1);
  renderReceivingItems();
}

function submitReceivingVoucher() {
  const errorEl = document.getElementById('receivingError');
  if (errorEl) errorEl.textContent = '';
  if (!state.receivingDraft.sourceName || !state.receivingDraft.items.length) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  if (state.receivingDraft.editingId) {
    const editingId = state.receivingDraft.editingId;
    const payload = {
      sourceName: state.receivingDraft.sourceName,
      items: state.receivingDraft.items
    };
    db.ref(`receiving/${editingId}`).update(payload).then(() => {
      resetReceivingDraft();
      renderReceivingSection();
      closeReceivingModal();
    });
    return;
  }
  generateCounter('meta/receivingCounter').then((receivingNumber) => {
    const payload = {
      receivingNumber,
      createdAt: serverTime,
      sourceName: state.receivingDraft.sourceName,
      storekeeperId: state.user?.id || null,
      storekeeperName: state.user?.name || null,
      items: state.receivingDraft.items
    };
    db.ref('receiving').push(payload).then(() => {
      resetReceivingDraft();
      renderReceivingSection();
      closeReceivingModal();
    });
  });
}

function renderReceivingTable() {
  const table = document.getElementById('receivingTable');
  if (!table) return;
  const records = state.cache.receiving || {};
  const storageLocations = state.cache.storageLocations || {};
  const entries = Object.entries(records)
    .map(([id, rec]) => ({ id, ...rec }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="7">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((rec) => {
    const items = normalizeItems(rec.items);
    const row = document.createElement('tr');
    const locationNames = Array.from(new Set(items.map((item) => getLocalizedName(storageLocations[item.storageLocationId]) || '-')))
      .filter((name) => name && name !== '-');
    const locationsText = locationNames.length ? locationNames.join('، ') : '-';
    row.innerHTML = `
      <td>${rec.receivingNumber || '-'}</td>
      <td>${rec.sourceName || '-'}</td>
      <td>${rec.storekeeperName || '-'}</td>
      <td>${formatDate(rec.createdAt)}</td>
      <td>${items.length}</td>
      <td>${locationsText}</td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="print">${window.i18n.t('print_report')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </td>
    `;
    row.querySelector('[data-action="print"]').addEventListener('click', () => printReceivingReport(rec));
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openReceivingEditModal(rec));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteReceiving(rec));
    table.appendChild(row);
  });
}

function deleteReceiving(record) {
  if (!record?.id) return;
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  db.ref(`receiving/${record.id}`).remove();
}

function setupSuppliersSection() {
  const section = document.getElementById('section-suppliers');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('suppliers')}</h3>
        <button id="openSupplierModalBtn" class="btn primary">${window.i18n.t('new_supplier')}</button>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('supplier_name')}</th>
            <th>${window.i18n.t('phone')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="suppliersTable"></tbody>
      </table>
    </div>
    <div id="supplierModal" class="overlay hidden">
      <div class="modal card" style="max-width: 520px; text-align: start;">
        <h3 id="supplierModalTitle">${window.i18n.t('new_supplier')}</h3>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('name_ar')}</label>
            <input id="supplierNameAr" class="input" />
          </div>
          <div>
            <label class="tag">${window.i18n.t('name_en')}</label>
            <input id="supplierNameEn" class="input" />
          </div>
        </div>
        <div style="margin-top: 12px;">
          <label class="tag">${window.i18n.t('phone')}</label>
          <input id="supplierPhone" class="input" />
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="supplierCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="supplierSaveBtn" class="btn primary">${window.i18n.t('add')}</button>
        </div>
        <p id="supplierError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
    <div id="supplierDetailOverlay" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3 id="supplierDetailTitle"></h3>
          <div class="row" style="gap: 8px;">
            <button id="supplierAddProductBtn" class="btn primary">${window.i18n.t('add_supplier_product')}</button>
            <button id="supplierDetailBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          </div>
        </div>
        <div id="supplierDetailItems" class="grid two" style="margin-top: 12px;"></div>
      </div>
    </div>
    <div id="supplierPickerOverlay" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('select_products')}</h3>
          <button id="supplierPickerCloseBtn" class="btn ghost">×</button>
        </div>
        <div class="row" style="margin-top: 12px;">
          <input id="supplierPickerSearch" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('search_products')}" />
        </div>
        <div id="supplierPickerList" class="grid two" style="margin-top: 12px;"></div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="supplierPickerCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="supplierPickerAddBtn" class="btn primary">${window.i18n.t('add')}</button>
        </div>
      </div>
    </div>
  `;

  resetSupplierDraft();
  bindSuppliersSection();
  renderSuppliersSection();
}

function resetSupplierDraft() {
  state.supplierDraft = {
    editingId: null,
    nameAr: '',
    nameEn: '',
    phone: ''
  };
  state.supplierPickSelection = new Set();
}

function bindSuppliersSection() {
  const openBtn = document.getElementById('openSupplierModalBtn');
  const cancelBtn = document.getElementById('supplierCancelBtn');
  const saveBtn = document.getElementById('supplierSaveBtn');
  const pickerCloseBtn = document.getElementById('supplierPickerCloseBtn');
  const pickerCancelBtn = document.getElementById('supplierPickerCancelBtn');
  const pickerAddBtn = document.getElementById('supplierPickerAddBtn');
  const pickerSearch = document.getElementById('supplierPickerSearch');
  const detailBackBtn = document.getElementById('supplierDetailBackBtn');
  const addProductBtn = document.getElementById('supplierAddProductBtn');

  if (openBtn) openBtn.addEventListener('click', () => openSupplierModal());
  if (cancelBtn) cancelBtn.addEventListener('click', () => closeSupplierModal());
  if (saveBtn) saveBtn.addEventListener('click', () => saveSupplier());
  if (pickerCloseBtn) pickerCloseBtn.addEventListener('click', () => closeSupplierPicker());
  if (pickerCancelBtn) pickerCancelBtn.addEventListener('click', () => closeSupplierPicker());
  if (pickerAddBtn) pickerAddBtn.addEventListener('click', () => applySupplierPickerSelection());
  if (pickerSearch) pickerSearch.addEventListener('input', () => renderSupplierPickerList());
  if (detailBackBtn) detailBackBtn.addEventListener('click', () => closeSupplierDetail());
  if (addProductBtn) addProductBtn.addEventListener('click', () => openSupplierPicker());
}

function openSupplierModal(supplier = null) {
  const overlay = document.getElementById('supplierModal');
  if (!overlay) return;
  resetSupplierDraft();
  const title = document.getElementById('supplierModalTitle');
  const nameArInput = document.getElementById('supplierNameAr');
  const nameEnInput = document.getElementById('supplierNameEn');
  const phoneInput = document.getElementById('supplierPhone');
  const errorEl = document.getElementById('supplierError');
  if (errorEl) errorEl.textContent = '';
  if (supplier) {
    state.supplierDraft.editingId = supplier.id;
    state.supplierDraft.nameAr = supplier.nameAr || '';
    state.supplierDraft.nameEn = supplier.nameEn || '';
    state.supplierDraft.phone = supplier.phone || '';
    if (title) title.textContent = window.i18n.t('edit');
  } else {
    if (title) title.textContent = window.i18n.t('new_supplier');
  }
  if (nameArInput) nameArInput.value = state.supplierDraft.nameAr;
  if (nameEnInput) nameEnInput.value = state.supplierDraft.nameEn;
  if (phoneInput) phoneInput.value = state.supplierDraft.phone;
  overlay.classList.remove('hidden');
}

function closeSupplierModal() {
  const overlay = document.getElementById('supplierModal');
  if (overlay) overlay.classList.add('hidden');
}

function saveSupplier() {
  const nameArInput = document.getElementById('supplierNameAr');
  const nameEnInput = document.getElementById('supplierNameEn');
  const phoneInput = document.getElementById('supplierPhone');
  const errorEl = document.getElementById('supplierError');
  if (errorEl) errorEl.textContent = '';
  const nameAr = nameArInput?.value.trim() || '';
  const nameEn = nameEnInput?.value.trim() || '';
  const phone = phoneInput?.value.trim() || '';
  if (!nameAr || !nameEn) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const payload = { nameAr, nameEn, phone };
  if (state.supplierDraft.editingId) {
    db.ref(`suppliers/${state.supplierDraft.editingId}`).update(payload).then(() => {
      closeSupplierModal();
    });
    return;
  }
  db.ref('suppliers').push({ ...payload, createdAt: serverTime }).then(() => {
    closeSupplierModal();
  });
}

function renderSuppliersSection() {
  renderSuppliersTable();
  renderSupplierDetail();
}

function renderSuppliersTable() {
  const table = document.getElementById('suppliersTable');
  if (!table) return;
  const suppliers = state.cache.suppliers || {};
  const products = state.cache.products || {};
  const materials = state.cache.stockMaterials || {};
  const counts = {};
  Object.values(products).forEach((item) => {
    getItemSupplierIds(item).forEach((supplierId) => {
      counts[supplierId] = (counts[supplierId] || 0) + 1;
    });
  });
  Object.values(materials).forEach((item) => {
    getItemSupplierIds(item).forEach((supplierId) => {
      counts[supplierId] = (counts[supplierId] || 0) + 1;
    });
  });
  const entries = Object.entries(suppliers).map(([id, supplier]) => ({ id, ...supplier }));
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="4">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((supplier) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${getLocalizedName(supplier) || '-'}</td>
      <td>${supplier.phone || '-'}</td>
      <td>${counts[supplier.id] || 0}</td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="view">${window.i18n.t('view')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </td>
    `;
    row.querySelector('[data-action="view"]').addEventListener('click', () => openSupplierDetail(supplier.id));
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openSupplierModal(supplier));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteSupplier(supplier.id));
    table.appendChild(row);
  });
}

function openSupplierDetail(supplierId) {
  state.supplierDetailId = supplierId;
  renderSupplierDetail();
  const overlay = document.getElementById('supplierDetailOverlay');
  if (overlay) overlay.classList.remove('hidden');
}

function closeSupplierDetail() {
  const overlay = document.getElementById('supplierDetailOverlay');
  if (overlay) overlay.classList.add('hidden');
  state.supplierDetailId = null;
}

function renderSupplierDetail() {
  const overlay = document.getElementById('supplierDetailOverlay');
  if (!overlay) return;
  if (!state.supplierDetailId) return;
  const supplier = state.cache.suppliers?.[state.supplierDetailId];
  const title = document.getElementById('supplierDetailTitle');
  const container = document.getElementById('supplierDetailItems');
  if (title) title.textContent = getLocalizedName(supplier) || '-';
  if (!container) return;
  const items = getSupplierItems(state.supplierDetailId);
  container.innerHTML = '';
  if (!items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  items.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'notice';
    const typeLabel = entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials');
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${getLocalizedName(entry.item)}</strong>
          <div class="helper">${typeLabel}</div>
        </div>
        <button class="btn danger small" data-action="remove">${window.i18n.t('delete')}</button>
      </div>
    `;
    card.querySelector('[data-action="remove"]').addEventListener('click', () => unassignSupplierItem(entry));
    container.appendChild(card);
  });
}

function openSupplierPicker() {
  state.supplierPickSelection = new Set();
  renderSupplierPickerList();
  const overlay = document.getElementById('supplierPickerOverlay');
  if (overlay) overlay.classList.remove('hidden');
}

function closeSupplierPicker() {
  const overlay = document.getElementById('supplierPickerOverlay');
  if (overlay) overlay.classList.add('hidden');
}

function renderSupplierPickerList() {
  const container = document.getElementById('supplierPickerList');
  const searchInput = document.getElementById('supplierPickerSearch');
  if (!container) return;
  const query = (searchInput?.value || '').trim().toLowerCase();
  if (!query) {
    container.innerHTML = `<p class="helper">${window.i18n.t('search_to_show')}</p>`;
    return;
  }
  let entries = getUnassignedSupplierItems(state.supplierDetailId).filter((entry) => {
    const name = `${entry.item.nameAr || ''} ${entry.item.nameEn || ''} ${entry.item.name || ''}`.toLowerCase();
    const code = String(entry.item.code || '').toLowerCase();
    const barcode = String(entry.item.barcode || '').toLowerCase();
    return name.includes(query) || code.includes(query) || barcode.includes(query);
  });
  container.innerHTML = '';
  if (!entries.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  entries.forEach((entry) => {
    const key = `${entry.type}:${entry.id}`;
    const card = document.createElement('div');
    const isSelected = state.supplierPickSelection.has(key);
    card.className = `notice supplier-pick ${isSelected ? 'selected' : ''}`;
    const typeLabel = entry.type === 'product' ? window.i18n.t('products') : window.i18n.t('stock_materials');
    card.innerHTML = `
      <span class="pick-check ${isSelected ? 'on' : ''}">✓</span>
      <div class="row" style="justify-content: space-between;">
        <span>${getLocalizedName(entry.item)}</span>
        <span class="tag">${typeLabel}</span>
      </div>
    `;
    card.addEventListener('click', () => {
      if (state.supplierPickSelection.has(key)) {
        state.supplierPickSelection.delete(key);
      } else {
        state.supplierPickSelection.add(key);
      }
      renderSupplierPickerList();
    });
    container.appendChild(card);
  });
}

function applySupplierPickerSelection() {
  if (!state.supplierDetailId) return;
  const updates = {};
  state.supplierPickSelection.forEach((key) => {
    const [type, id] = key.split(':');
    const item = type === 'product' ? state.cache.products?.[id] : state.cache.stockMaterials?.[id];
    const path = type === 'product' ? `products/${id}` : `stockMaterials/${id}`;
    const nextSupplierIds = [...getItemSupplierIds(item), state.supplierDetailId];
    Object.assign(updates, buildItemSupplierUpdates(path, item, nextSupplierIds));
  });
  if (!Object.keys(updates).length) {
    closeSupplierPicker();
    return;
  }
  db.ref().update(updates).then(() => {
    closeSupplierPicker();
    renderSupplierDetail();
  });
}

function unassignSupplierItem(entry) {
  const path = entry.type === 'product' ? `products/${entry.id}` : `stockMaterials/${entry.id}`;
  const nextSupplierIds = getItemSupplierIds(entry.item).filter((supplierId) => supplierId !== state.supplierDetailId);
  db.ref().update(buildItemSupplierUpdates(path, entry.item, nextSupplierIds)).then(() => {
    renderSupplierDetail();
  });
}

function deleteSupplier(supplierId) {
  if (!supplierId) return;
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const updates = {};
  const products = state.cache.products || {};
  const materials = state.cache.stockMaterials || {};
  Object.entries(products).forEach(([id, item]) => {
    if (!itemHasSupplier(item, supplierId)) return;
    const nextSupplierIds = getItemSupplierIds(item).filter((currentId) => currentId !== supplierId);
    Object.assign(updates, buildItemSupplierUpdates(`products/${id}`, item, nextSupplierIds));
  });
  Object.entries(materials).forEach(([id, item]) => {
    if (!itemHasSupplier(item, supplierId)) return;
    const nextSupplierIds = getItemSupplierIds(item).filter((currentId) => currentId !== supplierId);
    Object.assign(updates, buildItemSupplierUpdates(`stockMaterials/${id}`, item, nextSupplierIds));
  });
  db.ref().update(updates).then(() => {
    db.ref(`suppliers/${supplierId}`).remove();
  });
}

function setupPurchasesSection() {
  const section = document.getElementById('section-purchase');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('purchase')}</h3>
        <button id="openPurchaseModalBtn" class="btn primary">${window.i18n.t('purchase_request')}</button>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="purchaseSearchFilter" class="input" style="max-width: 260px;" placeholder="${window.i18n.t('search_purchase_placeholder')}" />
        <input id="purchaseFromDateFilter" class="input" type="date" style="max-width: 180px;" />
        <input id="purchaseToDateFilter" class="input" type="date" style="max-width: 180px;" />
        <select id="purchaseSupplierFilter" class="input" style="max-width: 220px;"></select>
        <select id="purchaseStatusFilter" class="input" style="max-width: 220px;"></select>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('purchase_number')}</th>
            <th>${window.i18n.t('supplier')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('status')}</th>
            <th>${window.i18n.t('purchase_invoice_number')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('invoice_value')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="purchasesTable"></tbody>
      </table>
    </div>
    <div id="purchaseModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3 id="purchaseModalTitle">${window.i18n.t('purchase_request')}</h3>
          <button id="purchaseModalCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="purchaseStorekeeper" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('supplier')}</label>
            <select id="purchaseSupplierSelect" class="input"></select>
          </div>
        </div>
        <div class="row" style="margin-top: 12px;">
          <input id="purchaseSearchInput" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('search_products')}" />
          <button id="purchaseSearchBtn" class="btn ghost small">${window.i18n.t('search')}</button>
        </div>
        <div id="purchaseSearchResults" class="grid two" style="margin-top: 12px;"></div>
        <div style="margin-top: 16px;">
          <h4>${window.i18n.t('items')}</h4>
          <div id="purchaseItemsList" class="grid two"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="purchaseCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="purchaseSubmitBtn" class="btn primary">${window.i18n.t('purchase_request')}</button>
        </div>
        <p id="purchaseError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
    <div id="purchaseReceiveModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('receive_purchases')}</h3>
          <button id="purchaseReceiveCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="purchaseReceiveStorekeeper" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('supplier')}</label>
            <input id="purchaseReceiveSupplier" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('purchase_invoice_number')}</label>
            <input id="purchaseReceiveInvoiceNumber" class="input" />
          </div>
        </div>
        <div style="margin-top: 12px;">
          <h4>${window.i18n.t('items')}</h4>
          <div id="purchaseReceiveItemsEditor"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="purchaseReceiveCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="purchaseReceiveSubmitBtn" class="btn primary">${window.i18n.t('receive_action')}</button>
        </div>
        <p id="purchaseReceiveError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
  `;

  resetPurchaseDraft();
  resetPurchaseReceiveDraft();
  bindPurchasesSection();
  renderPurchasesSection();
}

function resetPurchaseDraft() {
  state.purchaseDraft = {
    supplierId: '',
    items: [],
    editingId: null,
    originalItems: [],
    originalSupplierId: null,
    pendingMoveId: null
  };
}

function resetPurchaseReceiveDraft() {
  state.purchaseReceiveDraft = {
    purchaseId: null,
    supplierId: '',
    purchaseInvoiceNumber: '',
    items: []
  };
}

function bindPurchasesSection() {
  const openBtn = document.getElementById('openPurchaseModalBtn');
  const closeBtn = document.getElementById('purchaseModalCloseBtn');
  const cancelBtn = document.getElementById('purchaseCancelBtn');
  const supplierSelect = document.getElementById('purchaseSupplierSelect');
  const searchInput = document.getElementById('purchaseSearchInput');
  const searchBtn = document.getElementById('purchaseSearchBtn');
  const submitBtn = document.getElementById('purchaseSubmitBtn');

  const receiveCloseBtn = document.getElementById('purchaseReceiveCloseBtn');
  const receiveCancelBtn = document.getElementById('purchaseReceiveCancelBtn');
  const receiveInvoiceInput = document.getElementById('purchaseReceiveInvoiceNumber');
  const receiveSubmitBtn = document.getElementById('purchaseReceiveSubmitBtn');
  const searchFilter = document.getElementById('purchaseSearchFilter');
  const fromFilter = document.getElementById('purchaseFromDateFilter');
  const toFilter = document.getElementById('purchaseToDateFilter');
  const supplierFilter = document.getElementById('purchaseSupplierFilter');
  const statusFilter = document.getElementById('purchaseStatusFilter');

  if (openBtn) openBtn.addEventListener('click', () => openPurchaseModal());
  if (closeBtn) closeBtn.addEventListener('click', () => closePurchaseModal());
  if (cancelBtn) cancelBtn.addEventListener('click', () => closePurchaseModal());
  if (supplierSelect) {
    supplierSelect.addEventListener('change', () => {
      state.purchaseDraft.supplierId = supplierSelect.value;
      renderPurchaseSearchResults();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', () => renderPurchaseSearchResults());
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handlePurchaseBarcodeScan();
      }
    });
  }
  if (searchBtn) searchBtn.addEventListener('click', () => renderPurchaseSearchResults());
  if (submitBtn) submitBtn.addEventListener('click', () => submitPurchaseOrder());

  if (receiveCloseBtn) receiveCloseBtn.addEventListener('click', () => closePurchaseReceiveModal());
  if (receiveCancelBtn) receiveCancelBtn.addEventListener('click', () => closePurchaseReceiveModal());
  if (receiveInvoiceInput) {
    receiveInvoiceInput.addEventListener('input', () => {
      state.purchaseReceiveDraft.purchaseInvoiceNumber = receiveInvoiceInput.value || '';
      const errorEl = document.getElementById('purchaseReceiveError');
      if (errorEl) errorEl.textContent = '';
    });
  }
  if (receiveSubmitBtn) receiveSubmitBtn.addEventListener('click', () => submitPurchaseReceive());

  if (searchFilter) {
    searchFilter.value = state.purchaseFilters.query || '';
    searchFilter.addEventListener('input', () => {
      state.purchaseFilters.query = searchFilter.value || '';
      renderPurchasesTable();
    });
  }
  if (fromFilter) {
    fromFilter.value = state.purchaseFilters.fromDate || '';
    fromFilter.addEventListener('change', () => {
      state.purchaseFilters.fromDate = fromFilter.value || '';
      renderPurchasesTable();
    });
  }
  if (toFilter) {
    toFilter.value = state.purchaseFilters.toDate || '';
    toFilter.addEventListener('change', () => {
      state.purchaseFilters.toDate = toFilter.value || '';
      renderPurchasesTable();
    });
  }
  if (supplierFilter) {
    supplierFilter.addEventListener('change', () => {
      state.purchaseFilters.supplierId = supplierFilter.value || 'all';
      renderPurchasesTable();
    });
  }
  if (statusFilter) {
    statusFilter.addEventListener('change', () => {
      state.purchaseFilters.status = statusFilter.value || 'all';
      renderPurchasesTable();
    });
  }
}

function openPurchaseModal(record = null) {
  const overlay = document.getElementById('purchaseModal');
  if (!overlay) return;
  resetPurchaseDraft();
  if (record) {
    state.purchaseDraft.editingId = record.id;
    state.purchaseDraft.supplierId = record.supplierId || '';
    state.purchaseDraft.originalSupplierId = record.supplierId || '';
    state.purchaseDraft.items = normalizeItems(record.items).map((item) => {
      const itemType = normalizeItemType(item);
      const itemId = item.itemId || item.id;
      const itemData = getItemDataByType(itemType, itemId);
      return {
        ...item,
        itemType,
        itemId,
        unitId: item.unitId || itemData?.unitId || null,
        unitPrice: Number(item.unitPrice ?? item.cost ?? getDefaultPurchaseUnitPrice(itemType, itemId))
      };
    });
    state.purchaseDraft.originalItems = normalizeItems(record.items).map((item) => ({ ...item }));
    state.purchaseDraft.pendingMoveId = record.pendingMoveId || null;
  }
  renderPurchasesSection();
  const errorEl = document.getElementById('purchaseError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('purchaseSearchInput');
  if (searchInput) searchInput.value = '';
  renderPurchaseSearchResults();
  overlay.classList.remove('hidden');
}

function closePurchaseModal() {
  const overlay = document.getElementById('purchaseModal');
  if (overlay) overlay.classList.add('hidden');
}

function renderPurchasesSection() {
  if (!state.purchaseDraft) resetPurchaseDraft();
  const storekeeperInput = document.getElementById('purchaseStorekeeper');
  const supplierSelect = document.getElementById('purchaseSupplierSelect');
  if (storekeeperInput) storekeeperInput.value = state.user?.name || '-';
  if (supplierSelect) {
    supplierSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = window.i18n.t('select_supplier');
    supplierSelect.appendChild(placeholder);
    Object.entries(state.cache.suppliers || {}).forEach(([id, supplier]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(supplier);
      supplierSelect.appendChild(option);
    });
    supplierSelect.value = state.purchaseDraft.supplierId || '';
  }
  renderPurchaseSearchResults();
  renderPurchaseItems();
  renderPurchaseTableFilters();
  renderPurchasesTable();
}

function getPurchaseSearchEntries() {
  const supplierId = state.purchaseDraft.supplierId;
  if (!supplierId) return [];
  return getSupplierItems(supplierId);
}

function handlePurchaseBarcodeScan() {
  const searchInput = document.getElementById('purchaseSearchInput');
  if (!searchInput) return;
  const query = searchInput.value.trim();
  if (!query) return;
  const entries = getPurchaseSearchEntries();
  const match = findExactItemMatch(entries, query);
  if (match) {
    openPurchaseQtyModal(match);
    searchInput.value = '';
    renderPurchaseSearchResults();
  }
}

function renderPurchaseSearchResults() {
  const searchInput = document.getElementById('purchaseSearchInput');
  const results = document.getElementById('purchaseSearchResults');
  if (!searchInput || !results) return;
  const query = searchInput.value.trim();
  if (!query) {
    results.innerHTML = '';
    return;
  }
  const entries = filterItemEntries(getPurchaseSearchEntries(), query);
  const exact = findExactItemMatch(entries, query);
  if (exact) {
    openPurchaseQtyModal(exact);
    searchInput.value = '';
    results.innerHTML = '';
    return;
  }
  renderItemSearchResults(results, entries, (entry) => openPurchaseQtyModal(entry));
}

function openPurchaseQtyModal(entry) {
  resolveEntryWithProductionSelection(entry).then((selectedEntry) => {
    if (!selectedEntry) return;
    const mainBranchId = getMainBranchId();
    const available = getItemStock(selectedEntry.item, mainBranchId);
    openQtyModal({
      title: getLocalizedName(selectedEntry.item),
      available,
      ...getQtyModalUnitMeta(selectedEntry.item),
      mode: 'add',
      onConfirm: (qty) => addPurchaseItem(selectedEntry, qty)
    });
  });
}

function addPurchaseItem(entry, qty) {
  const productionId = entry.productionRecord?.id || null;
  const existing = state.purchaseDraft.items.find((item) => (
    item.itemId === entry.id
    && item.itemType === entry.type
    && (entry.type !== 'product' || String(item.productionId || '') === String(productionId || ''))
  ));
  if (existing) {
    existing.qty += qty;
    if (existing.unitPrice === undefined || existing.unitPrice === null) {
      existing.unitPrice = getDefaultPurchaseUnitPrice(entry.type, entry.id);
    }
  } else {
    const unitPrice = getDefaultPurchaseUnitPrice(entry.type, entry.id);
    state.purchaseDraft.items.push({
      itemId: entry.id,
      itemType: entry.type,
      name: getLocalizedName(entry.item),
      qty,
      unitId: entry.item.unitId || null,
      unitName: getResolvedItemUnitName(entry.item),
      unitPrice,
      productionId,
      productionDate: entry.productionRecord?.productionDate || null,
      productionNumber: entry.productionRecord?.productionNumber || null
    });
  }
  renderPurchaseItems();
}

function renderPurchaseItems() {
  const container = document.getElementById('purchaseItemsList');
  if (!container) return;
  container.innerHTML = '';
  if (!state.purchaseDraft.items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  state.purchaseDraft.items.forEach((item, index) => {
    const latest = getLatestPurchaseUnitPrice(item.itemType, item.itemId);
    const unitId = item.unitId || latest?.unitId || getItemDataByType(item.itemType, item.itemId)?.unitId || null;
    const unitName = getUnitName(unitId) || '';
    const latestPrice = latest ? Number(latest.price || 0) : null;
    const currentPrice = Number(item.unitPrice ?? 0);
    const diff = latestPrice === null ? 0 : currentPrice - latestPrice;
    let diffHtml = '';
    if (latestPrice !== null && Math.abs(diff) > 0.0001) {
      const isIncrease = diff > 0;
      const sign = isIncrease ? '+' : '-';
      diffHtml = `
        <div class="helper" style="color:${isIncrease ? '#c43f2f' : '#1f8a44'};">
          ${isIncrease ? window.i18n.t('price_increase_warning') : window.i18n.t('price_decrease_warning')}
          (${sign}${formatMoney(Math.abs(diff))})
        </div>
      `;
    }
    const card = document.createElement('div');
    card.className = 'notice';
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${item.name}</strong>
          <div class="helper">${window.i18n.t('quantity')}: ${formatQuantityWithUnit(item.qty, item, item.unitName)}</div>
          ${item.productionDate ? `<div class="helper">${window.i18n.t('production_date')}: ${item.productionDate}</div>` : ''}
          <div class="helper">${window.i18n.t('previous_cost')}: ${latestPrice === null ? '-' : `${formatMoney(latestPrice)} ${unitName}`}</div>
          <div class="row" style="margin-top: 6px; gap: 8px;">
            <label class="tag">${window.i18n.t('latest_cost')}</label>
            <input class="input" type="number" min="0" step="0.01" value="${currentPrice}" data-field="unit-price" style="max-width: 140px;" />
            <span class="helper">${unitName || '-'}</span>
          </div>
          ${diffHtml}
        </div>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="edit" data-index="${index}">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete" data-index="${index}">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    const priceInput = card.querySelector('[data-field="unit-price"]');
    if (priceInput) {
      priceInput.addEventListener('input', () => {
        const value = Number(priceInput.value || 0);
        state.purchaseDraft.items[index].unitPrice = value < 0 ? 0 : value;
      });
      priceInput.addEventListener('change', () => renderPurchaseItems());
    }
    card.querySelector('[data-action="edit"]').addEventListener('click', () => editPurchaseItemQty(index));
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      state.purchaseDraft.items.splice(index, 1);
      renderPurchaseItems();
    });
    container.appendChild(card);
  });
}

function editPurchaseItemQty(index) {
  const item = state.purchaseDraft.items[index];
  if (!item) return;
  openQtyModal({
    title: item.name,
    available: null,
    ...getQtyModalUnitMeta(item),
    mode: 'add',
    onConfirm: (qty) => {
      state.purchaseDraft.items[index].qty = qty;
      renderPurchaseItems();
    }
  });
}

function submitPurchaseOrder() {
  const errorEl = document.getElementById('purchaseError');
  if (errorEl) errorEl.textContent = '';
  if (!state.purchaseDraft.supplierId || !state.purchaseDraft.items.length) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const supplier = state.cache.suppliers?.[state.purchaseDraft.supplierId];
  const supplierName = getLocalizedName(supplier) || '-';

  if (state.purchaseDraft.editingId) {
    const editingId = state.purchaseDraft.editingId;
    const payload = {
      supplierId: state.purchaseDraft.supplierId,
      supplierName,
      items: state.purchaseDraft.items,
      status: 'pending'
    };
    db.ref(`purchases/${editingId}`).update(payload).then(() => {
      if (state.purchaseDraft.pendingMoveId) {
        const moveUpdate = {
          name: `${window.i18n.t('purchase_request')} ${state.purchaseDraft.editingId}`,
          note: supplierName
        };
        db.ref(`pendingStockMoves/${state.purchaseDraft.pendingMoveId}`).update(moveUpdate);
      }
      resetPurchaseDraft();
      renderPurchasesSection();
      closePurchaseModal();
    });
    return;
  }

  generateCounter('meta/purchaseCounter').then((purchaseNumber) => {
    const purchaseRef = db.ref('purchases').push();
    const purchaseId = purchaseRef.key;
    const payload = {
      purchaseNumber,
      createdAt: serverTime,
      storekeeperId: state.user?.id || null,
      storekeeperName: state.user?.name || null,
      supplierId: state.purchaseDraft.supplierId,
      supplierName,
      status: 'pending',
      items: state.purchaseDraft.items,
      receivedItems: []
    };
    purchaseRef.set(payload).then(() => {
      const moveRef = db.ref('pendingStockMoves').push();
      const movePayload = {
        name: `${window.i18n.t('purchase_request')} ${purchaseNumber}`,
        note: supplierName,
        createdAt: serverTime,
        status: 'pending',
        type: 'purchase',
        purchaseId
      };
      moveRef.set(movePayload).then(() => {
        db.ref(`purchases/${purchaseId}`).update({ pendingMoveId: moveRef.key });
        resetPurchaseDraft();
        renderPurchasesSection();
        closePurchaseModal();
      });
    });
  });
}

function renderPurchaseTableFilters() {
  const supplierFilter = document.getElementById('purchaseSupplierFilter');
  const statusFilter = document.getElementById('purchaseStatusFilter');
  const searchFilter = document.getElementById('purchaseSearchFilter');
  const fromFilter = document.getElementById('purchaseFromDateFilter');
  const toFilter = document.getElementById('purchaseToDateFilter');
  if (!supplierFilter || !statusFilter) return;

  supplierFilter.innerHTML = '';
  const allSuppliers = document.createElement('option');
  allSuppliers.value = 'all';
  allSuppliers.textContent = window.i18n.t('all_suppliers');
  supplierFilter.appendChild(allSuppliers);
  Object.entries(state.cache.suppliers || {}).forEach(([id, supplier]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(supplier);
    supplierFilter.appendChild(option);
  });
  supplierFilter.value = state.purchaseFilters.supplierId || 'all';

  statusFilter.innerHTML = '';
  [
    { value: 'all', label: window.i18n.t('all') },
    { value: 'pending', label: window.i18n.t('pending') },
    { value: 'approved', label: window.i18n.t('approved') },
    { value: 'rejected', label: window.i18n.t('rejected') },
    { value: 'partial', label: window.i18n.t('partial_received') },
    { value: 'received', label: window.i18n.t('received') }
  ].forEach((status) => {
    const option = document.createElement('option');
    option.value = status.value;
    option.textContent = status.label;
    statusFilter.appendChild(option);
  });
  statusFilter.value = state.purchaseFilters.status || 'all';

  if (searchFilter) searchFilter.value = state.purchaseFilters.query || '';
  if (fromFilter) fromFilter.value = state.purchaseFilters.fromDate || '';
  if (toFilter) toFilter.value = state.purchaseFilters.toDate || '';
}

function calculatePurchaseExpectedTotal(record) {
  return normalizeItems(record?.items).reduce((sum, item) => {
    const qty = Number(item.qty || 0);
    const unitPrice = Number(item.unitPrice ?? item.cost ?? item.price ?? 0);
    return sum + (qty * unitPrice);
  }, 0);
}

function renderPurchasesTable() {
  const table = document.getElementById('purchasesTable');
  if (!table) return;
  const filters = state.purchaseFilters || { query: '', fromDate: '', toDate: '', supplierId: 'all', status: 'all' };
  const queryRaw = String(filters.query || '').trim().toLowerCase();
  const queryNorm = normalizeSearchValue(filters.query || '');
  const records = state.cache.purchases || {};
  const entries = Object.entries(records)
    .map(([id, rec]) => ({ id, ...rec }))
    .filter((rec) => {
      if (filters.supplierId !== 'all' && (rec.supplierId || '') !== filters.supplierId) return false;
      if (filters.status !== 'all' && (rec.status || 'pending') !== filters.status) return false;
      if ((filters.fromDate || filters.toDate) && !isTimestampInDateRange(rec.createdAt, filters.fromDate, filters.toDate)) return false;
      if (!queryRaw && !queryNorm) return true;
      const itemText = normalizeItems(rec.receivedItems || rec.items)
        .map((item) => `${item.name || ''} ${item.itemId || ''} ${item.code || ''}`)
        .join(' ')
        .toLowerCase();
      const codeText = normalizeSearchValue(`${rec.purchaseInvoiceNumber || ''} ${rec.purchaseNumber || ''}`);
      return itemText.includes(queryRaw) || codeText.includes(queryNorm);
    })
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="9">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((rec) => {
    const status = rec.status || 'pending';
    const statusLabel = status === 'approved'
      ? window.i18n.t('approved')
      : status === 'rejected'
        ? window.i18n.t('rejected')
        : status === 'received'
          ? window.i18n.t('received')
          : status === 'partial'
          ? window.i18n.t('partial_received')
            : window.i18n.t('pending');
    const displayItems = normalizeItems((rec.status === 'received' || rec.status === 'partial') ? rec.receivedItems : rec.items)
      .map((item) => `${formatItemNameWithUnit(item.name || '-', item.unitId)}: ${formatNumber(item.qty)}`)
      .join('<br>');
    const expectedTotal = calculatePurchaseExpectedTotal(rec);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${rec.purchaseNumber || '-'}</td>
      <td>${rec.supplierName || '-'}</td>
      <td>${rec.storekeeperName || '-'}</td>
      <td>${formatDate(rec.createdAt)}</td>
      <td>${statusLabel}</td>
      <td>${rec.purchaseInvoiceNumber || '-'}</td>
      <td style="min-width: 240px;">${displayItems || '-'}</td>
      <td>${formatMoney(expectedTotal)}</td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="view">${window.i18n.t('view')}</button>
          <button class="btn ghost small" data-action="print">${window.i18n.t('print_report')}</button>
          ${status === 'pending' ? `<button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>` : ''}
          ${(status === 'approved' || status === 'partial') ? `<button class="btn primary small" data-action="receive">${window.i18n.t('receive_purchases')}</button>` : ''}
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </td>
    `;
    row.querySelector('[data-action="view"]').addEventListener('click', () => openPurchaseDetailsModal(rec));
    row.querySelector('[data-action="print"]').addEventListener('click', () => {
      if (status === 'received' && rec.purchaseInvoiceNumber) {
        printPurchaseReceiptReport({
          ...rec,
          receiptNumber: rec.lastReceiptNumber || rec.receiptNumber || null,
          items: normalizeItems(rec.receivedItems || []),
          purchaseId: rec.id
        });
      } else {
        printPurchaseRequestReport(rec);
      }
    });
    const editBtn = row.querySelector('[data-action="edit"]');
    if (editBtn) editBtn.addEventListener('click', () => openPurchaseModal(rec));
    const receiveBtn = row.querySelector('[data-action="receive"]');
    if (receiveBtn) receiveBtn.addEventListener('click', () => openPurchaseReceiveModal(rec));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => deletePurchase(rec));
    table.appendChild(row);
  });
}

function openPurchaseDetailsModal(record) {
  if (!record || !els.detailOverlay || !els.detailBody) return;
  const status = record.status || 'pending';
  const statusLabel = status === 'approved'
    ? window.i18n.t('approved')
    : status === 'rejected'
      ? window.i18n.t('rejected')
      : status === 'received'
        ? window.i18n.t('received')
        : status === 'partial'
          ? window.i18n.t('partial_received')
          : window.i18n.t('pending');
  const items = normalizeItems(record.items || []);
  const expectedTotal = calculatePurchaseExpectedTotal(record);
  const rows = items.map((item) => {
    const name = formatItemNameWithUnit(item.name || '-', item.unitId);
    const ordered = Number(item.qty || 0);
    const latest = getLatestPurchaseUnitPrice(normalizeItemType(item), item.itemId || item.id);
    const latestPrice = latest ? Number(latest.price || 0) : null;
    const expectedLine = ordered * Number(item.unitPrice ?? item.cost ?? item.price ?? 0);
    return `
      <tr>
        <td>${name}</td>
        <td>${formatNumber(ordered)}</td>
        <td>${latestPrice === null ? '-' : formatMoney(latestPrice)}</td>
        <td>${formatMoney(expectedLine)}</td>
      </tr>
    `;
  }).join('');
  els.detailBody.innerHTML = `
    <div class="notice">
      <div><strong>${window.i18n.t('purchase_number')}:</strong> ${record.purchaseNumber || '-'}</div>
      <div><strong>${window.i18n.t('supplier')}:</strong> ${record.supplierName || '-'}</div>
      <div><strong>${window.i18n.t('storekeeper_name')}:</strong> ${record.storekeeperName || '-'}</div>
      <div><strong>${window.i18n.t('purchase_invoice_number')}:</strong> ${record.purchaseInvoiceNumber || '-'}</div>
      <div><strong>${window.i18n.t('date_time')}:</strong> ${formatDate(record.createdAt)}</div>
      <div><strong>${window.i18n.t('status')}:</strong> ${statusLabel}</div>
    </div>
    <div class="notice" style="margin-top: 8px;">
      <strong>${window.i18n.t('invoice_value')}:</strong> ${formatMoney(expectedTotal)}
    </div>
    <table class="table" style="margin-top: 10px;">
      <thead>
        <tr>
          <th>${window.i18n.t('name')}</th>
          <th>${window.i18n.t('quantity')}</th>
          <th>${window.i18n.t('latest_cost')}</th>
          <th>${window.i18n.t('invoice_value')}</th>
        </tr>
      </thead>
      <tbody>${rows || `<tr><td colspan="4">${window.i18n.t('no_data')}</td></tr>`}</tbody>
    </table>
  `;
  els.detailOverlay.classList.remove('hidden');
}

function deletePurchase(record) {
  if (!record?.id) return;
  if (record.status === 'received') {
    alert(window.i18n.t('cannot_delete_received'));
    return;
  }
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const updates = {};
  if (record.pendingMoveId) {
    updates[`pendingStockMoves/${record.pendingMoveId}`] = null;
  }
  updates[`purchases/${record.id}`] = null;
  db.ref().update(updates);
}

function openPurchaseReceiveModal(record) {
  const overlay = document.getElementById('purchaseReceiveModal');
  if (!overlay || !record) return;
  resetPurchaseReceiveDraft();
  state.purchaseReceiveDraft.purchaseId = record.id;
  state.purchaseReceiveDraft.supplierId = record.supplierId;
  state.purchaseReceiveDraft.purchaseInvoiceNumber = record.purchaseInvoiceNumber || '';
  const receivedMap = buildItemMap(record.receivedItems || []);
  state.purchaseReceiveDraft.items = normalizeItems(record.items).map((item) => {
    const key = getItemKey(item);
    const already = Number(receivedMap[key]?.qty || 0);
    const ordered = Number(item.qty || 0);
    const remaining = Math.max(ordered - already, 0);
    return {
      itemId: item.itemId || item.id,
      itemType: normalizeItemType(item),
      name: item.name || getLocalizedName(getItemDataByType(normalizeItemType(item), item.itemId || item.id)) || '-',
      unitId: item.unitId || null,
      orderedQty: ordered,
      receivedBefore: already,
      qty: remaining,
      unitPrice: Number(item.unitPrice ?? item.cost ?? getDefaultPurchaseUnitPrice(normalizeItemType(item), item.itemId || item.id))
    };
  });
  renderPurchaseReceiveSection();
  const errorEl = document.getElementById('purchaseReceiveError');
  if (errorEl) errorEl.textContent = '';
  overlay.classList.remove('hidden');
}

function closePurchaseReceiveModal() {
  const overlay = document.getElementById('purchaseReceiveModal');
  if (overlay) overlay.classList.add('hidden');
}

function renderPurchaseReceiveSection() {
  const storekeeperInput = document.getElementById('purchaseReceiveStorekeeper');
  const supplierInput = document.getElementById('purchaseReceiveSupplier');
  const invoiceInput = document.getElementById('purchaseReceiveInvoiceNumber');
  if (storekeeperInput) storekeeperInput.value = state.user?.name || '-';
  const supplier = state.cache.suppliers?.[state.purchaseReceiveDraft.supplierId];
  if (supplierInput) supplierInput.value = getLocalizedName(supplier) || '-';
  if (invoiceInput) invoiceInput.value = state.purchaseReceiveDraft.purchaseInvoiceNumber || '';
  renderPurchaseReceiveItemsEditor();
}

function renderPurchaseReceiveItemsEditor() {
  const container = document.getElementById('purchaseReceiveItemsEditor');
  if (!container) return;
  container.innerHTML = '';
  if (!state.purchaseReceiveDraft.items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  const rows = state.purchaseReceiveDraft.items.map((item, index) => `
    <tr>
      <td>${formatItemNameWithUnit(item.name || '-', item.unitId)}</td>
      <td>${formatNumber(item.orderedQty || 0)}</td>
      <td>${formatNumber(item.receivedBefore || 0)}</td>
      <td>${formatNumber(Math.max(Number(item.orderedQty || 0) - Number(item.receivedBefore || 0), 0))}</td>
      <td>
        <input type="number" min="0" step="0.01" class="input" data-index="${index}" value="${Number(item.qty || 0)}" style="max-width: 120px;" />
      </td>
    </tr>
  `).join('');
  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>${window.i18n.t('name')}</th>
          <th>${window.i18n.t('requested_qty')}</th>
          <th>${window.i18n.t('received_qty')}</th>
          <th>${window.i18n.t('remaining_qty')}</th>
          <th>${window.i18n.t('received_now_qty')}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
  container.querySelectorAll('input[data-index]').forEach((input) => {
    input.addEventListener('input', () => {
      const index = Number(input.dataset.index || -1);
      if (index < 0 || !state.purchaseReceiveDraft.items[index]) return;
      const item = state.purchaseReceiveDraft.items[index];
      const maxAllowed = Math.max(Number(item.orderedQty || 0) - Number(item.receivedBefore || 0), 0);
      let value = Number(input.value || 0);
      if (Number.isNaN(value) || value < 0) value = 0;
      if (value > maxAllowed) value = maxAllowed;
      state.purchaseReceiveDraft.items[index].qty = value;
      input.value = String(value);
    });
  });
}

function submitPurchaseReceive() {
  const errorEl = document.getElementById('purchaseReceiveError');
  if (errorEl) errorEl.textContent = '';
  const purchaseInvoiceNumber = String(state.purchaseReceiveDraft.purchaseInvoiceNumber || '').trim();
  if (!state.purchaseReceiveDraft.items.length || !state.purchaseReceiveDraft.purchaseId || !purchaseInvoiceNumber) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const receivedNowItems = state.purchaseReceiveDraft.items
    .filter((item) => Number(item.qty || 0) > 0)
    .map((item) => ({
      itemId: item.itemId,
      itemType: item.itemType,
      name: item.name,
      qty: Number(item.qty || 0),
      unitId: item.unitId || null,
      cost: Number(item.unitPrice ?? 0),
      unitPrice: Number(item.unitPrice ?? 0)
    }));
  if (!receivedNowItems.length) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const purchaseId = state.purchaseReceiveDraft.purchaseId;
  const purchase = state.cache.purchases?.[purchaseId];
  if (!purchase) return;
  const mainBranchId = getMainBranchId();
  const updates = [];
  receivedNowItems.forEach((item) => {
    updates.push(updateItemStock(item.itemType, item.itemId, mainBranchId, Number(item.qty || 0)));
  });
  Promise.all(updates).then(() => {
    const receivedMap = buildItemMap(purchase.receivedItems || []);
    receivedNowItems.forEach((item) => {
      const key = getItemKey(item);
      const prev = receivedMap[key]?.qty || 0;
      receivedMap[key] = {
        itemType: item.itemType,
        itemId: item.itemId,
        qty: Number(prev) + Number(item.qty || 0),
        unitId: item.unitId,
        name: item.name
      };
    });
    const receivedItems = Object.values(receivedMap);
    const newStatus = 'received';
    generateCounter('meta/purchaseReceiptCounter').then((receiptNumber) => {
      const receiptRef = db.ref('purchaseReceipts').push();
      const receiptPayload = {
        purchaseId,
        supplierId: purchase.supplierId,
        supplierName: purchase.supplierName,
        purchaseInvoiceNumber,
        receiptNumber,
        createdAt: serverTime,
        storekeeperId: state.user?.id || null,
        storekeeperName: state.user?.name || null,
        items: receivedNowItems
      };
      receiptRef.set(receiptPayload).then(() => {
        db.ref(`purchases/${purchaseId}`).update({
          receivedItems,
          status: newStatus,
          purchaseInvoiceNumber,
          lastReceiptNumber: receiptNumber,
          closedAt: serverTime
        }).then(() => {
          printPurchaseReceiptReport({ ...receiptPayload, purchaseNumber: purchase.purchaseNumber });
          resetPurchaseReceiveDraft();
          renderPurchasesSection();
          closePurchaseReceiveModal();
        });
      });
    });
  });
}

function setupSupplierReturnSection() {
  const section = document.getElementById('section-supplierReturn');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('supplier_return')}</h3>
        <button id="openSupplierReturnModalBtn" class="btn primary">${window.i18n.t('new_supplier_return')}</button>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('supplier_return_number')}</th>
            <th>${window.i18n.t('supplier')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="supplierReturnTable"></tbody>
      </table>
    </div>
    <div id="supplierReturnModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('supplier_return_voucher')}</h3>
          <button id="supplierReturnCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="supplierReturnStorekeeper" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('supplier')}</label>
            <select id="supplierReturnSupplierSelect" class="input"></select>
          </div>
        </div>
        <div class="row" style="margin-top: 12px;">
          <input id="supplierReturnSearchInput" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('search_products')}" />
          <button id="supplierReturnSearchBtn" class="btn ghost small">${window.i18n.t('search')}</button>
        </div>
        <div id="supplierReturnSearchResults" class="grid two" style="margin-top: 12px;"></div>
        <div style="margin-top: 16px;">
          <h4>${window.i18n.t('items')}</h4>
          <div id="supplierReturnItemsList" class="grid two"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="supplierReturnCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="supplierReturnSubmitBtn" class="btn primary">${window.i18n.t('add')}</button>
        </div>
        <p id="supplierReturnError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
  `;

  resetSupplierReturnDraft();
  bindSupplierReturnSection();
  renderSupplierReturnSection();
}

function resetSupplierReturnDraft() {
  state.supplierReturnDraft = {
    supplierId: '',
    items: [],
    editingId: null,
    originalItems: []
  };
}

function bindSupplierReturnSection() {
  const openBtn = document.getElementById('openSupplierReturnModalBtn');
  const closeBtn = document.getElementById('supplierReturnCloseBtn');
  const cancelBtn = document.getElementById('supplierReturnCancelBtn');
  const supplierSelect = document.getElementById('supplierReturnSupplierSelect');
  const searchInput = document.getElementById('supplierReturnSearchInput');
  const searchBtn = document.getElementById('supplierReturnSearchBtn');
  const submitBtn = document.getElementById('supplierReturnSubmitBtn');

  if (openBtn) openBtn.addEventListener('click', () => openSupplierReturnModal());
  if (closeBtn) closeBtn.addEventListener('click', () => closeSupplierReturnModal());
  if (cancelBtn) cancelBtn.addEventListener('click', () => closeSupplierReturnModal());
  if (supplierSelect) {
    supplierSelect.addEventListener('change', () => {
      state.supplierReturnDraft.supplierId = supplierSelect.value;
      renderSupplierReturnSearchResults();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', () => renderSupplierReturnSearchResults());
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSupplierReturnBarcodeScan();
      }
    });
  }
  if (searchBtn) searchBtn.addEventListener('click', () => renderSupplierReturnSearchResults());
  if (submitBtn) submitBtn.addEventListener('click', () => submitSupplierReturn());
}

function openSupplierReturnModal(record = null) {
  const overlay = document.getElementById('supplierReturnModal');
  if (!overlay) return;
  resetSupplierReturnDraft();
  if (record) {
    state.supplierReturnDraft.editingId = record.id;
    state.supplierReturnDraft.supplierId = record.supplierId;
    state.supplierReturnDraft.items = normalizeItems(record.items).map((item) => ({ ...item }));
    state.supplierReturnDraft.originalItems = normalizeItems(record.items).map((item) => ({ ...item }));
  }
  renderSupplierReturnSection();
  const errorEl = document.getElementById('supplierReturnError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('supplierReturnSearchInput');
  if (searchInput) searchInput.value = '';
  renderSupplierReturnSearchResults();
  overlay.classList.remove('hidden');
}

function closeSupplierReturnModal() {
  const overlay = document.getElementById('supplierReturnModal');
  if (overlay) overlay.classList.add('hidden');
}

function renderSupplierReturnSection() {
  if (!state.supplierReturnDraft) resetSupplierReturnDraft();
  const storekeeperInput = document.getElementById('supplierReturnStorekeeper');
  const supplierSelect = document.getElementById('supplierReturnSupplierSelect');
  if (storekeeperInput) storekeeperInput.value = state.user?.name || '-';
  if (supplierSelect) {
    supplierSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = window.i18n.t('select_supplier');
    supplierSelect.appendChild(placeholder);
    Object.entries(state.cache.suppliers || {}).forEach(([id, supplier]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(supplier);
      supplierSelect.appendChild(option);
    });
    supplierSelect.value = state.supplierReturnDraft.supplierId || '';
  }
  renderSupplierReturnSearchResults();
  renderSupplierReturnItems();
  renderSupplierReturnTable();
}

function getSupplierReturnEntries() {
  const supplierId = state.supplierReturnDraft.supplierId;
  if (!supplierId) return [];
  return getSupplierItems(supplierId);
}

function handleSupplierReturnBarcodeScan() {
  const searchInput = document.getElementById('supplierReturnSearchInput');
  if (!searchInput) return;
  const query = searchInput.value.trim();
  if (!query) return;
  const entries = getSupplierReturnEntries();
  const match = findExactItemMatch(entries, query);
  if (match) {
    openSupplierReturnQtyModal(match);
    searchInput.value = '';
    renderSupplierReturnSearchResults();
  }
}

function renderSupplierReturnSearchResults() {
  const searchInput = document.getElementById('supplierReturnSearchInput');
  const results = document.getElementById('supplierReturnSearchResults');
  if (!searchInput || !results) return;
  const query = searchInput.value.trim();
  if (!query) {
    results.innerHTML = '';
    return;
  }
  const entries = filterItemEntries(getSupplierReturnEntries(), query);
  const exact = findExactItemMatch(entries, query);
  if (exact) {
    openSupplierReturnQtyModal(exact);
    searchInput.value = '';
    results.innerHTML = '';
    return;
  }
  renderItemSearchResults(results, entries, (entry) => openSupplierReturnQtyModal(entry));
}

function openSupplierReturnQtyModal(entry) {
  resolveEntryWithProductionSelection(entry).then((selectedEntry) => {
    if (!selectedEntry) return;
    const mainBranchId = getMainBranchId();
    const available = getItemStock(selectedEntry.item, mainBranchId);
    openQtyModal({
      title: getLocalizedName(selectedEntry.item),
      available,
      ...getQtyModalUnitMeta(selectedEntry.item),
      mode: 'deduct',
      onConfirm: (qty) => addSupplierReturnItem(selectedEntry, qty)
    });
  });
}

function addSupplierReturnItem(entry, qty) {
  const productionId = entry.productionRecord?.id || null;
  const existing = state.supplierReturnDraft.items.find((item) => (
    item.itemId === entry.id
    && item.itemType === entry.type
    && (entry.type !== 'product' || String(item.productionId || '') === String(productionId || ''))
  ));
  if (existing) {
    existing.qty += qty;
  } else {
    state.supplierReturnDraft.items.push({
      itemId: entry.id,
      itemType: entry.type,
      name: getLocalizedName(entry.item),
      qty,
      unitId: entry.item.unitId || null,
      unitName: getResolvedItemUnitName(entry.item),
      productionId,
      productionDate: entry.productionRecord?.productionDate || null,
      productionNumber: entry.productionRecord?.productionNumber || null
    });
  }
  renderSupplierReturnItems();
}

function renderSupplierReturnItems() {
  const container = document.getElementById('supplierReturnItemsList');
  if (!container) return;
  container.innerHTML = '';
  if (!state.supplierReturnDraft.items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  state.supplierReturnDraft.items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'notice';
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${item.name}</strong>
          <div class="helper">${window.i18n.t('quantity')}: ${formatQuantityWithUnit(item.qty, item, item.unitName)}</div>
          ${item.productionDate ? `<div class="helper">${window.i18n.t('production_date')}: ${item.productionDate}</div>` : ''}
        </div>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="edit" data-index="${index}">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete" data-index="${index}">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="edit"]').addEventListener('click', () => editSupplierReturnItemQty(index));
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      state.supplierReturnDraft.items.splice(index, 1);
      renderSupplierReturnItems();
    });
    container.appendChild(card);
  });
}

function editSupplierReturnItemQty(index) {
  const item = state.supplierReturnDraft.items[index];
  if (!item) return;
  openQtyModal({
    title: item.name,
    available: null,
    ...getQtyModalUnitMeta(item),
    mode: 'deduct',
    onConfirm: (qty) => {
      state.supplierReturnDraft.items[index].qty = qty;
      renderSupplierReturnItems();
    }
  });
}

function submitSupplierReturn() {
  const errorEl = document.getElementById('supplierReturnError');
  if (errorEl) errorEl.textContent = '';
  if (!state.supplierReturnDraft.items.length || !state.supplierReturnDraft.supplierId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const mainBranchId = getMainBranchId();
  if (!mainBranchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }

  if (state.supplierReturnDraft.editingId) {
    const editingId = state.supplierReturnDraft.editingId;
    const diffs = diffItems(state.supplierReturnDraft.originalItems, state.supplierReturnDraft.items);
    const updates = diffs.map((diff) => updateItemStock(diff.itemType, diff.itemId, mainBranchId, -Number(diff.qtyDiff || 0)));
    db.ref(`supplierReturns/${editingId}`).update({
      supplierId: state.supplierReturnDraft.supplierId,
      items: state.supplierReturnDraft.items
    }).then(() => {
      Promise.all(updates).then(() => {
        resetSupplierReturnDraft();
        renderSupplierReturnSection();
        closeSupplierReturnModal();
      });
    });
    return;
  }

  generateCounter('meta/supplierReturnCounter').then((returnNumber) => {
    const payload = {
      returnNumber,
      createdAt: serverTime,
      storekeeperId: state.user?.id || null,
      storekeeperName: state.user?.name || null,
      supplierId: state.supplierReturnDraft.supplierId,
      supplierName: getLocalizedName(state.cache.suppliers?.[state.supplierReturnDraft.supplierId]) || '-',
      items: state.supplierReturnDraft.items
    };
    const ref = db.ref('supplierReturns').push();
    ref.set(payload).then(() => {
      const updates = state.supplierReturnDraft.items.map((item) => updateItemStock(item.itemType, item.itemId, mainBranchId, -Number(item.qty || 0)));
      Promise.all(updates).then(() => {
        printSupplierReturnReport(payload);
        resetSupplierReturnDraft();
        renderSupplierReturnSection();
        closeSupplierReturnModal();
      });
    });
  });
}

function renderSupplierReturnTable() {
  const table = document.getElementById('supplierReturnTable');
  if (!table) return;
  const records = state.cache.supplierReturns || {};
  const entries = Object.entries(records)
    .map(([id, rec]) => ({ id, ...rec }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((rec) => {
    const items = normalizeItems(rec.items);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${rec.returnNumber || '-'}</td>
      <td>${rec.supplierName || '-'}</td>
      <td>${formatDate(rec.createdAt)}</td>
      <td>${items.length}</td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="print">${window.i18n.t('print_report')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </td>
    `;
    row.querySelector('[data-action="print"]').addEventListener('click', () => printSupplierReturnReport(rec));
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openSupplierReturnModal(rec));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteSupplierReturn(rec));
    table.appendChild(row);
  });
}

function deleteSupplierReturn(record) {
  if (!record?.id) return;
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const mainBranchId = getMainBranchId();
  const items = normalizeItems(record.items);
  const updates = items.map((item) => updateItemStock(item.itemType, item.itemId, mainBranchId, Number(item.qty || 0)));
  Promise.all(updates).then(() => {
    db.ref(`supplierReturns/${record.id}`).remove();
  });
}

function setupTransfersSection() {
  const section = document.getElementById('section-transfers');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('transfers')}</h3>
        <button id="openTransferModalBtn" class="btn primary">${window.i18n.t('new_transfer')}</button>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('transfer_number')}</th>
            <th>${window.i18n.t('from_branch')}</th>
            <th>${window.i18n.t('to_branch')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="transfersTable"></tbody>
      </table>
    </div>
    <div id="transferVoucherModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('transfer_voucher')}</h3>
          <button id="transferModalCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid three" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="transferStorekeeper" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('from_branch')}</label>
            <select id="transferFromBranchSelect" class="input"></select>
          </div>
          <div>
            <label class="tag">${window.i18n.t('to_branch')}</label>
            <select id="transferBranchSelect" class="input"></select>
          </div>
        </div>
        ${buildEntrySearchTypeFilterHtml('transfer')}
        <div class="row" style="margin-top: 12px;">
          <input id="transferSearchInput" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('search_items')}" />
          <button id="transferSearchBtn" class="btn ghost small">${window.i18n.t('search')}</button>
        </div>
        <div id="transferSearchResults" class="grid two" style="margin-top: 12px;"></div>
        <div style="margin-top: 16px;">
          <h4>${window.i18n.t('items')}</h4>
          <div id="transferItemsList" class="grid two"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="transferCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="transferSubmitBtn" class="btn primary">${window.i18n.t('transfer_action')}</button>
        </div>
        <p id="transferError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
  `;

  resetTransferDraft();
  bindTransfersSection();
  renderTransfersSection();
}

function resetTransferDraft() {
  state.transferDraft = {
    fromBranchId: '',
    toBranchId: '',
    searchTypes: [],
    items: [],
    editingId: null,
    originalItems: [],
    originalFromBranchId: null,
    originalToBranchId: null
  };
}

function bindTransfersSection() {
  const openBtn = document.getElementById('openTransferModalBtn');
  const closeBtn = document.getElementById('transferModalCloseBtn');
  const cancelBtn = document.getElementById('transferCancelBtn');
  const fromBranchSelect = document.getElementById('transferFromBranchSelect');
  const branchSelect = document.getElementById('transferBranchSelect');
  const searchInput = document.getElementById('transferSearchInput');
  const searchBtn = document.getElementById('transferSearchBtn');
  const submitBtn = document.getElementById('transferSubmitBtn');

  if (openBtn) openBtn.addEventListener('click', () => openTransferModal());
  if (closeBtn) closeBtn.addEventListener('click', () => closeTransferModal());
  if (cancelBtn) cancelBtn.addEventListener('click', () => closeTransferModal());

  if (fromBranchSelect) {
    fromBranchSelect.addEventListener('change', () => {
      state.transferDraft.fromBranchId = fromBranchSelect.value;
      if (state.transferDraft.toBranchId && state.transferDraft.toBranchId === state.transferDraft.fromBranchId) {
        state.transferDraft.toBranchId = '';
        if (branchSelect) branchSelect.value = '';
      }
      const errorEl = document.getElementById('transferError');
      if (errorEl) errorEl.textContent = '';
    });
  }

  if (branchSelect) {
    branchSelect.addEventListener('change', () => {
      state.transferDraft.toBranchId = branchSelect.value;
      const errorEl = document.getElementById('transferError');
      if (errorEl) errorEl.textContent = '';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => renderTransferSearchResults());
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleTransferBarcodeScan();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => renderTransferSearchResults());
  }

  bindEntrySearchTypeFilter('transfer', (selectedTypes) => {
    state.transferDraft.searchTypes = selectedTypes;
    renderTransferSearchResults();
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => submitTransferVoucher());
  }
}

function openTransferModal() {
  const overlay = document.getElementById('transferVoucherModal');
  if (!overlay) return;
  resetTransferDraft();
  state.transferDraft.fromBranchId = getMainBranchId() || '';
  renderTransfersSection();
  const errorEl = document.getElementById('transferError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('transferSearchInput');
  if (searchInput) searchInput.value = '';
  renderTransferSearchResults();
  overlay.classList.remove('hidden');
}

function openTransferEditModal(record) {
  const overlay = document.getElementById('transferVoucherModal');
  if (!overlay || !record) return;
  const fallbackFromBranchId = record.fromBranchId || getMainBranchId() || '';
  resetTransferDraft();
  state.transferDraft.fromBranchId = fallbackFromBranchId;
  state.transferDraft.editingId = record.id || null;
  state.transferDraft.originalFromBranchId = fallbackFromBranchId;
  state.transferDraft.toBranchId = record.toBranchId || '';
  state.transferDraft.originalToBranchId = record.toBranchId || '';
  state.transferDraft.items = normalizeItems(record.items).map((item) => ({ ...item }));
  state.transferDraft.originalItems = normalizeItems(record.items).map((item) => ({ ...item }));
  renderTransfersSection();
  const errorEl = document.getElementById('transferError');
  if (errorEl) errorEl.textContent = '';
  overlay.classList.remove('hidden');
}

function closeTransferModal() {
  const overlay = document.getElementById('transferVoucherModal');
  if (overlay) overlay.classList.add('hidden');
}

function renderTransfersSection() {
  if (!state.transferDraft) resetTransferDraft();
  const storekeeperInput = document.getElementById('transferStorekeeper');
  const fromBranchSelect = document.getElementById('transferFromBranchSelect');
  const branchSelect = document.getElementById('transferBranchSelect');
  if (storekeeperInput) storekeeperInput.value = state.user?.name || '-';
  if (!state.transferDraft.fromBranchId) {
    state.transferDraft.fromBranchId = getMainBranchId() || '';
  }
  if (fromBranchSelect) {
    renderBranchOptions(fromBranchSelect);
    fromBranchSelect.value = state.transferDraft.fromBranchId || '';
  }
  if (branchSelect) {
    renderBranchOptions(branchSelect);
    branchSelect.value = state.transferDraft.toBranchId || '';
  }
  renderEntrySearchTypeFilter('transfer', state.transferDraft.searchTypes);
  renderTransferSearchResults();
  renderTransferItems();
  renderTransfersTable();
}

function getTransferSearchEntries() {
  return filterEntriesBySearchTypes(getAllItems(), state.transferDraft?.searchTypes);
}

function handleTransferBarcodeScan() {
  const searchInput = document.getElementById('transferSearchInput');
  if (!searchInput) return;
  const query = searchInput.value.trim();
  if (!query) return;
  const entries = getTransferSearchEntries();
  const match = findExactItemMatch(entries, query);
  if (match) {
    openTransferQtyModal(match);
    searchInput.value = '';
    renderTransferSearchResults();
  }
}

function renderTransferSearchResults() {
  const searchInput = document.getElementById('transferSearchInput');
  const results = document.getElementById('transferSearchResults');
  if (!searchInput || !results) return;
  const query = searchInput.value.trim();
  if (!query) {
    results.innerHTML = '';
    return;
  }
  const entries = filterItemEntries(getTransferSearchEntries(), query);
  const exact = findExactItemMatch(entries, query);
  if (exact) {
    openTransferQtyModal(exact);
    searchInput.value = '';
    results.innerHTML = '';
    return;
  }
  renderItemSearchResults(results, entries, (entry) => openTransferQtyModal(entry));
}

function openTransferQtyModal(entry) {
  resolveEntryWithProductionSelection(entry).then((selectedEntry) => {
    if (!selectedEntry) return;
    const sourceBranchId = state.transferDraft?.fromBranchId || getMainBranchId();
    const available = getItemStock(selectedEntry.item, sourceBranchId);
    openQtyModal({
      title: getLocalizedName(selectedEntry.item),
      available,
      unitId: getResolvedItemUnitId(selectedEntry.item),
      unitName: getResolvedItemUnitName(selectedEntry.item),
      mode: 'deduct',
      onConfirm: (qty) => addTransferItem(selectedEntry, qty)
    });
  });
}

function addTransferItem(entry, qty) {
  const productionId = entry.productionRecord?.id || null;
  const existing = state.transferDraft.items.find((item) => (
    item.itemId === entry.id
    && item.itemType === entry.type
    && (entry.type !== 'product' || String(item.productionId || '') === String(productionId || ''))
  ));
  if (existing) {
    existing.qty += qty;
  } else {
    state.transferDraft.items.push({
      itemId: entry.id,
      itemType: entry.type,
      name: getLocalizedName(entry.item),
      qty,
      unitId: entry.item.unitId || null,
      unitName: getResolvedItemUnitName(entry.item),
      productionId,
      productionDate: entry.productionRecord?.productionDate || null,
      productionNumber: entry.productionRecord?.productionNumber || null
    });
  }
  renderTransferItems();
}

function renderTransferItems() {
  const container = document.getElementById('transferItemsList');
  if (!container) return;
  container.innerHTML = '';
  if (!state.transferDraft.items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  state.transferDraft.items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'notice';
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${item.name}</strong>
          <div class="helper">${window.i18n.t('quantity')}: ${formatQuantityWithUnit(item.qty, item, item.unitName)}</div>
          ${item.productionDate ? `<div class="helper">${window.i18n.t('production_date')}: ${item.productionDate}</div>` : ''}
        </div>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="edit" data-index="${index}">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete" data-index="${index}">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="edit"]').addEventListener('click', () => editTransferItemQty(index));
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      state.transferDraft.items.splice(index, 1);
      renderTransferItems();
    });
    container.appendChild(card);
  });
}

function editTransferItemQty(index) {
  const item = state.transferDraft.items[index];
  if (!item) return;
  const branchId = state.transferDraft.fromBranchId || getMainBranchId();
  const itemData = getItemDataByType(item.itemType, item.itemId);
  const availableBase = itemData ? getItemStock(itemData, branchId) : 0;
  const available = Number(availableBase || 0) + Number(item.qty || 0);
  openQtyModal({
    title: item.name || getLocalizedName(itemData),
    available,
    unitId: getResolvedItemUnitId(item),
    unitName: getResolvedItemUnitName(item) || getResolvedItemUnitName(itemData),
    mode: 'deduct',
    onConfirm: (qty) => {
      state.transferDraft.items[index].qty = qty;
      renderTransferItems();
    }
  });
}

function submitTransferVoucher() {
  const errorEl = document.getElementById('transferError');
  if (errorEl) errorEl.textContent = '';
  if (!state.transferDraft.items.length || !state.transferDraft.fromBranchId || !state.transferDraft.toBranchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  if (state.transferDraft.toBranchId === state.transferDraft.fromBranchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }

  if (state.transferDraft.editingId) {
    const editingId = state.transferDraft.editingId;
    const newFromBranchId = state.transferDraft.fromBranchId;
    const newToBranchId = state.transferDraft.toBranchId;
    const oldFromBranchId = state.transferDraft.originalFromBranchId || getMainBranchId() || newFromBranchId;
    const oldToBranchId = state.transferDraft.originalToBranchId || newToBranchId;
    const payload = {
      fromBranchId: newFromBranchId,
      toBranchId: newToBranchId,
      items: state.transferDraft.items
    };
    db.ref(`transfers/${editingId}`).update(payload).then(() => {
      const updates = [];
      if (oldFromBranchId !== newFromBranchId || oldToBranchId !== newToBranchId) {
        state.transferDraft.originalItems.forEach((item) => {
          updates.push(updateItemStock(item.itemType, item.itemId, oldFromBranchId, Number(item.qty || 0)));
          updates.push(updateItemStock(item.itemType, item.itemId, oldToBranchId, -Number(item.qty || 0)));
        });
        state.transferDraft.items.forEach((item) => {
          updates.push(updateItemStock(item.itemType, item.itemId, newFromBranchId, -Number(item.qty || 0)));
          updates.push(updateItemStock(item.itemType, item.itemId, newToBranchId, Number(item.qty || 0)));
        });
      } else {
        const diffs = diffItems(state.transferDraft.originalItems, state.transferDraft.items);
        diffs.forEach((diff) => {
          updates.push(updateItemStock(diff.itemType, diff.itemId, newFromBranchId, -Number(diff.qtyDiff || 0)));
          updates.push(updateItemStock(diff.itemType, diff.itemId, newToBranchId, Number(diff.qtyDiff || 0)));
        });
      }
      Promise.all(updates).then(() => {
        resetTransferDraft();
        renderTransfersSection();
        closeTransferModal();
      });
    });
    return;
  }

  generateCounter('meta/transferCounter').then((transferNumber) => {
    const payload = {
      transferNumber,
      createdAt: serverTime,
      storekeeperId: state.user?.id || null,
      storekeeperName: state.user?.name || null,
      fromBranchId: state.transferDraft.fromBranchId,
      toBranchId: state.transferDraft.toBranchId,
      items: state.transferDraft.items
    };
    db.ref('transfers').push(payload).then(() => {
      const updates = [];
      state.transferDraft.items.forEach((item) => {
        updates.push(updateItemStock(item.itemType, item.itemId, state.transferDraft.fromBranchId, -Number(item.qty || 0)));
        updates.push(updateItemStock(item.itemType, item.itemId, state.transferDraft.toBranchId, Number(item.qty || 0)));
      });
      Promise.all(updates).then(() => {
        resetTransferDraft();
        renderTransfersSection();
        closeTransferModal();
      });
    });
  });
}

function renderTransfersTable() {
  const table = document.getElementById('transfersTable');
  if (!table) return;
  const records = state.cache.transfers || {};
  const entries = Object.entries(records)
    .map(([id, rec]) => ({ id, ...rec }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="7">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((rec) => {
    const items = normalizeItems(rec.items);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div>${rec.transferNumber || '-'}</div>
        <div class="helper">${getBranchRouteLabel(rec.fromBranchId, rec.toBranchId)}</div>
      </td>
      <td>${getBranchLabel(rec.fromBranchId)}</td>
      <td>${getBranchLabel(rec.toBranchId)}</td>
      <td>${rec.storekeeperName || '-'}</td>
      <td>${formatDate(rec.createdAt)}</td>
      <td>${items.length}</td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="print">${window.i18n.t('print_report')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </td>
    `;
    row.querySelector('[data-action="print"]').addEventListener('click', () => printTransferReport(rec));
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openTransferEditModal(rec));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteTransfer(rec));
    table.appendChild(row);
  });
}

function deleteTransfer(record) {
  if (!record?.id) return;
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const fromBranchId = record.fromBranchId || getMainBranchId();
  const toBranchId = record.toBranchId;
  const items = normalizeItems(record.items);
  const updates = [];
  items.forEach((item) => {
    updates.push(updateItemStock(item.itemType, item.itemId, fromBranchId, Number(item.qty || 0)));
    updates.push(updateItemStock(item.itemType, item.itemId, toBranchId, -Number(item.qty || 0)));
  });
  Promise.all(updates).then(() => {
    db.ref(`transfers/${record.id}`).remove();
  });
}

function setupCashierTransferRequestsSection() {
  const section = document.getElementById('section-cashierTransferRequests');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('cashier_transfer_requests')}</h3>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('transfer_request_number')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('cashier_name')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('status')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="cashierTransferRequestsTable"></tbody>
      </table>
    </div>
    <div id="cashierTransferModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3 id="cashierTransferModalTitle">${window.i18n.t('transfer_request')}</h3>
          <button id="cashierTransferCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="cashierTransferStorekeeper" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('branch')}</label>
            <input id="cashierTransferBranch" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('cashier_name')}</label>
            <input id="cashierTransferCashier" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('transfer_request_number')}</label>
            <input id="cashierTransferRequestNumber" class="input" readonly />
          </div>
        </div>
        <div style="margin-top: 16px;">
          <div class="row" style="justify-content: space-between; align-items: center;">
            <h4>${window.i18n.t('items')}</h4>
            <button id="cashierTransferPrintFullBtn" class="btn ghost small">${window.i18n.t('print_full_report')}</button>
          </div>
          <div id="cashierTransferItemsList" class="transfer-columns-grid three-cols"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="cashierTransferCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="cashierTransferSubmitBtn" class="btn primary">${window.i18n.t('transfer_action')}</button>
        </div>
        <p id="cashierTransferError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
  `;

  resetCashierTransferDraft();
  bindCashierTransferRequestsSection();
  renderCashierTransferRequestsSection();
}

function resetCashierTransferDraft() {
  state.cashierTransferDraft = {
    mode: 'transfer',
    requestId: null,
    requestNumber: '',
    branchId: '',
    cashierId: '',
    cashierName: '',
    createdAt: null,
    status: 'pending',
    items: []
  };
}

function bindCashierTransferRequestsSection() {
  const closeBtn = document.getElementById('cashierTransferCloseBtn');
  const cancelBtn = document.getElementById('cashierTransferCancelBtn');
  const submitBtn = document.getElementById('cashierTransferSubmitBtn');
  const printFullBtn = document.getElementById('cashierTransferPrintFullBtn');

  if (closeBtn) closeBtn.addEventListener('click', () => closeCashierTransferModal());
  if (cancelBtn) cancelBtn.addEventListener('click', () => closeCashierTransferModal());
  if (submitBtn) submitBtn.addEventListener('click', () => submitCashierTransfer());
  if (printFullBtn) {
    printFullBtn.addEventListener('click', () => {
      const draft = state.cashierTransferDraft;
      if (!draft?.items?.length) return;
      printCashierTransferRequestReport({
        requestNumber: draft.requestNumber,
        branchId: draft.branchId,
        cashierName: draft.cashierName,
        createdAt: draft.createdAt || Date.now(),
        status: draft.status,
        items: draft.items
      });
    });
  }
}

function openCashierTransferModal(request, mode = 'transfer') {
  if (!request) return;
  resetCashierTransferDraft();
  const mainBranchId = getMainBranchId();
  const isTransferMode = mode === 'transfer';
  state.cashierTransferDraft.mode = isTransferMode ? 'transfer' : 'view';
  state.cashierTransferDraft.requestId = request.id;
  state.cashierTransferDraft.requestNumber = request.requestNumber || '';
  state.cashierTransferDraft.branchId = request.branchId || '';
  state.cashierTransferDraft.cashierId = request.cashierId || '';
  state.cashierTransferDraft.cashierName = request.cashierName || '';
  state.cashierTransferDraft.createdAt = request.createdAt || null;
  state.cashierTransferDraft.status = request.status || 'pending';
  state.cashierTransferDraft.items = normalizeItems(request.items).map((item) => {
    const itemData = getItemDataByType(item.itemType, item.itemId);
    const available = itemData ? getItemStock(itemData, mainBranchId) : 0;
    const requestedQty = Number(item.qty || 0);
    const qty = isTransferMode
      ? Math.min(requestedQty, Number(available || 0))
      : Number(item.qty || requestedQty);
    return {
      itemId: item.itemId,
      itemType: item.itemType || 'product',
      name: item.name || getLocalizedName(itemData),
      nameAr: item.nameAr || item.name || getLocalizedName(itemData) || '-',
      nameEn: item.nameEn || '',
      unitId: item.unitId || itemData?.unitId || null,
      groupKey: normalizeCashierTransferGroupKey(item.groupKey),
      requestedQty,
      qty
    };
  });
  renderCashierTransferRequestsSection();
  const overlay = document.getElementById('cashierTransferModal');
  if (overlay) overlay.classList.remove('hidden');
}

function closeCashierTransferModal() {
  const overlay = document.getElementById('cashierTransferModal');
  if (overlay) overlay.classList.add('hidden');
}

function renderCashierTransferRequestsSection() {
  renderCashierTransferRequestsTable();
  renderCashierTransferItems();
  const isViewMode = state.cashierTransferDraft?.mode === 'view';
  const titleEl = document.getElementById('cashierTransferModalTitle');
  if (titleEl) titleEl.textContent = isViewMode ? window.i18n.t('transfer_details') : window.i18n.t('transfer_request');
  const submitBtn = document.getElementById('cashierTransferSubmitBtn');
  if (submitBtn) submitBtn.style.display = isViewMode ? 'none' : '';
  const printFullBtn = document.getElementById('cashierTransferPrintFullBtn');
  if (printFullBtn) printFullBtn.style.display = state.cashierTransferDraft?.items?.length ? '' : 'none';
  const storekeeperInput = document.getElementById('cashierTransferStorekeeper');
  if (storekeeperInput) storekeeperInput.value = state.user?.name || '-';
  const branchInput = document.getElementById('cashierTransferBranch');
  if (branchInput) branchInput.value = getBranchLabel(state.cashierTransferDraft?.branchId) || '-';
  const cashierInput = document.getElementById('cashierTransferCashier');
  if (cashierInput) cashierInput.value = state.cashierTransferDraft?.cashierName || '-';
  const numberInput = document.getElementById('cashierTransferRequestNumber');
  if (numberInput) numberInput.value = state.cashierTransferDraft?.requestNumber || '-';
  const errorEl = document.getElementById('cashierTransferError');
  if (errorEl && isViewMode) errorEl.textContent = '';
}

function renderCashierTransferRequestsTable() {
  const table = document.getElementById('cashierTransferRequestsTable');
  if (!table) return;
  const records = state.cache.transferRequests || {};
  const entries = Object.entries(records)
    .map(([id, rec]) => ({ id, ...rec }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  table.innerHTML = '';
  if (!entries.length) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="7">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((rec) => {
    const items = normalizeItems(rec.items);
    const row = document.createElement('tr');
    const statusLabel = getCashierTransferRequestStatusLabel(rec);
    row.innerHTML = `
      <td>${rec.requestNumber || '-'}</td>
      <td>${getCashierTransferBranchLabel(rec)}</td>
      <td>${rec.cashierName || '-'}</td>
      <td>${formatDate(rec.createdAt)}</td>
      <td>${items.length}</td>
      <td>${statusLabel}</td>
      <td>
        <div class="row" style="gap: 6px; flex-wrap: wrap;">
	          ${rec.status === 'pending' ? `<button class="btn primary small" data-action="accept">قبول الطلب</button>` : ''}
	          ${rec.status === 'accepted' ? `
	            <button class="btn ghost small" data-action="print">طباعة</button>
	            <button class="btn primary small" data-action="deliver">تسليم</button>
	          ` : ''}
	          ${rec.status === 'sent' || rec.status === 'received' ? `
	            <button class="btn ghost small" data-action="view">${window.i18n.t('view')}</button>
	            <button class="btn ghost small" data-action="print">تقرير PDF</button>
	          ` : ''}
	        </div>
	      </td>
	    `;
    const viewBtn = row.querySelector('[data-action="view"]');
    if (viewBtn) viewBtn.addEventListener('click', () => openCashierTransferModal(rec, 'view'));
	    const printBtn = row.querySelector('[data-action="print"]');
	    if (printBtn) printBtn.addEventListener('click', () => printCashierTransferRequestReport(rec));
	    const acceptBtn = row.querySelector('[data-action="accept"]');
	    if (acceptBtn) acceptBtn.addEventListener('click', () => acceptCashierTransferRequest(rec));
	    const deliverBtn = row.querySelector('[data-action="deliver"]');
	    if (deliverBtn) deliverBtn.addEventListener('click', () => openCashierTransferDeliveryModal(rec));
	    table.appendChild(row);
	  });
	}

function getCashierTransferRequestStatusLabel(rec) {
		  const status = rec?.status || 'pending';
		  if (status === 'accepted') return 'بانتظار التجهيز';
		  if (status === 'sent') return 'تم الارسال';
		  if (status === 'transferred') return window.i18n.t('transferred');
		  if (status === 'received') return window.i18n.t('received');
		  if (status === 'partial_received') return window.i18n.t('partial_received');
		  if (status === 'rejected') return window.i18n.t('rejected');
		  return 'بانتظار القبول';
		}

function getCashierTransferBranchLabel(rec) {
  if (!rec) return '-';
  if (rec.branchId) return getBranchLabel(rec.branchId);
  return rec.branch || rec.branchName || '-';
}

const CASHIER_TRANSFER_GROUPS = [
  { key: 'sweets', titleKey: 'transfer_group_sweets' },
  { key: 'tableware', titleKey: 'transfer_group_tableware' },
  { key: 'supplies', titleKey: 'transfer_group_supplies' },
  { key: 'other', titleKey: 'transfer_group_other' }
];

function normalizeCashierTransferGroupKey(groupKey) {
  const key = String(groupKey || '').toLowerCase().trim();
  if (key === 'sweets' || key === 'tableware' || key === 'supplies' || key === 'other') return key;
  return 'other';
}

function getCashierTransferGroupLabel(groupKey) {
  const normalized = normalizeCashierTransferGroupKey(groupKey);
  const match = CASHIER_TRANSFER_GROUPS.find((group) => group.key === normalized);
  return match ? window.i18n.t(match.titleKey) : window.i18n.t('transfer_group_other');
}

function getCashierTransferItemsByGroup(items) {
  const grouped = { sweets: [], tableware: [], supplies: [], other: [] };
  normalizeItems(items).forEach((item) => {
    const key = normalizeCashierTransferGroupKey(item.groupKey);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });
  return grouped;
}

function getCashierTransferItemTypeLabel(type) {
  return type === 'stock' || type === 'material' ? window.i18n.t('stock_materials') : window.i18n.t('products');
}

function getCashierTransferItemNames(item) {
  const itemData = getItemDataByType(item.itemType, item.itemId);
  const unitId = item.unitId || itemData?.unitId || null;
  const arBase = item.nameAr || item.name || getLocalizedName(itemData) || '-';
  const enRaw = item.nameEn || itemData?.nameEn || '';
  const enBase = normalizeSearchValue(enRaw) === normalizeSearchValue(arBase) ? '' : enRaw;
  return {
    ar: formatItemNameWithUnit(arBase, unitId),
    en: enBase ? formatItemNameWithUnit(enBase, unitId) : '-'
  };
}

function getCashierTransferItemName(item) {
  const names = getCashierTransferItemNames(item);
  return names.en && names.en !== '-' ? `${names.ar} / ${names.en}` : names.ar;
}

function buildCashierTransferPrintMeta(record) {
  return [
    { label: window.i18n.t('transfer_request_number'), value: record.requestNumber || '-' },
    { label: window.i18n.t('branch'), value: getCashierTransferBranchLabel(record) },
    { label: window.i18n.t('cashier_name'), value: record.cashierName || '-' },
    { label: window.i18n.t('date_time'), value: formatDate(record.createdAt) },
    { label: window.i18n.t('status'), value: getCashierTransferRequestStatusLabel(record) }
  ];
}

function printCashierTransferRequestGroupReport(record, groupKey) {
  if (!record) return;
  const normalizedGroup = normalizeCashierTransferGroupKey(groupKey);
  const grouped = getCashierTransferItemsByGroup(record.items);
  const rows = (grouped[normalizedGroup] || []).map((item, index) => {
    const names = getCashierTransferItemNames(item);
    return [
      index + 1,
      names.ar || '-',
      names.en || '-',
      getCashierTransferItemTypeLabel(item.itemType),
      formatNumber(Number(item.qty || item.requestedQty || 0))
    ];
  });
  printA4Report(
    window.i18n.t('cashier_transfer_requests'),
    [
      ...buildCashierTransferPrintMeta(record),
      { label: window.i18n.t('categories'), value: getCashierTransferGroupLabel(normalizedGroup) }
    ],
    [
      window.i18n.t('row_number'),
      window.i18n.t('item_name_ar'),
      window.i18n.t('item_name_en'),
      window.i18n.t('type'),
      window.i18n.t('quantity')
    ],
    rows
  );
}

function printCashierTransferRequestReport(record) {
  if (!record) return;
  const items = normalizeItems(record.items);
  const rows = items.map((item, index) => {
    const names = getCashierTransferItemNames(item);
    return [
      index + 1,
      names.ar || '-',
      names.en || '-',
      getCashierTransferGroupLabel(item.groupKey),
      getCashierTransferItemTypeLabel(item.itemType),
      formatNumber(Number(item.requestedQty || item.qty || 0)),
      formatNumber(Number(item.sentQty || 0)),
      formatNumber(Number(item.receivedQty || 0))
    ];
  });
  printA4Report(
    window.i18n.t('cashier_transfer_requests'),
    buildCashierTransferPrintMeta(record),
    [
      window.i18n.t('row_number'),
      window.i18n.t('item_name_ar'),
      window.i18n.t('item_name_en'),
      window.i18n.t('categories'),
      window.i18n.t('type'),
      'الكمية المطلوبة',
      'الكمية المرسلة',
      'الكمية المستلمة'
    ],
    rows,
    record.status === 'received'
      ? [
          { label: 'إقرار الاستلام', value: `أقر الكاشير ${record.receivedByCashier || record.cashierName || '-'} بأنه استلم الأصناف الموضحة في هذا التقرير.` },
          { label: 'وقت الاستلام', value: formatDate(record.receivedAt) }
        ]
      : []
  );
}

function renderCashierTransferItems() {
  const container = document.getElementById('cashierTransferItemsList');
  if (!container || !state.cashierTransferDraft) return;
  container.innerHTML = '';
  if (!state.cashierTransferDraft.items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  const isViewMode = state.cashierTransferDraft.mode === 'view';
  const mainBranchId = getMainBranchId();
  const grouped = { sweets: [], tableware: [], supplies: [], other: [] };
  state.cashierTransferDraft.items.forEach((entry, index) => {
    const groupKey = normalizeCashierTransferGroupKey(entry.groupKey);
    if (!grouped[groupKey]) grouped[groupKey] = [];
    grouped[groupKey].push({ item: entry, index });
  });
  CASHIER_TRANSFER_GROUPS.forEach((group) => {
    const rows = grouped[group.key] || [];
    const column = document.createElement('div');
    column.className = 'transfer-column';
    column.innerHTML = `
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h5>${window.i18n.t(group.titleKey)}</h5>
      </div>
      <div class="transfer-drop-list" data-group-items="${group.key}">
        ${rows.length ? '' : `<div class="helper">${window.i18n.t('no_data')}</div>`}
      </div>
      <button class="btn ghost small transfer-details-print-btn" data-group-print="${group.key}" ${rows.length ? '' : 'disabled'}>${window.i18n.t('print_report')}</button>
    `;
    const list = column.querySelector(`[data-group-items="${group.key}"]`);
    rows.forEach(({ item, index: itemIndex }) => {
      const itemData = getItemDataByType(item.itemType, item.itemId);
      const available = itemData ? getItemStock(itemData, mainBranchId) : 0;
      const requestedQty = Number(item.requestedQty || item.qty || 0);
      const selectedQty = Number(item.qty || requestedQty);
      const card = document.createElement('div');
      card.className = 'notice';
      card.innerHTML = `
        <div class="row" style="justify-content: space-between; align-items: flex-start;">
          <div>
            <strong>${getCashierTransferItemName(item)}</strong>
            <div class="helper">${window.i18n.t('type')}: ${getCashierTransferItemTypeLabel(item.itemType)}</div>
            <div class="helper">${window.i18n.t('requested_qty')}: ${formatNumber(requestedQty)}</div>
            ${isViewMode ? '' : `<div class="helper">${window.i18n.t('available_stock')}: ${formatNumber(available)}</div>`}
            <div class="helper">${isViewMode ? window.i18n.t('quantity') : window.i18n.t('transferred_qty')}: ${formatNumber(selectedQty)}</div>
          </div>
          ${isViewMode ? '' : `<button class="btn ghost small" data-action="edit-item">${window.i18n.t('edit')}</button>`}
        </div>
      `;
      if (!isViewMode) {
        const editBtn = card.querySelector('[data-action="edit-item"]');
        if (editBtn) editBtn.addEventListener('click', () => editCashierTransferItemQty(itemIndex));
      }
      list.appendChild(card);
    });
    const printBtn = column.querySelector('[data-group-print]');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        printCashierTransferRequestGroupReport(
          {
            requestNumber: state.cashierTransferDraft.requestNumber,
            branchId: state.cashierTransferDraft.branchId,
            cashierName: state.cashierTransferDraft.cashierName,
            createdAt: state.cashierTransferDraft.createdAt || Date.now(),
            status: state.cashierTransferDraft.status,
            items: state.cashierTransferDraft.items
          },
          group.key
        );
      });
    }
    container.appendChild(column);
  });
}

function editCashierTransferItemQty(index) {
  if (state.cashierTransferDraft?.mode === 'view') return;
  const item = state.cashierTransferDraft?.items?.[index];
  if (!item) return;
  const mainBranchId = getMainBranchId();
  const itemData = getItemDataByType(item.itemType, item.itemId);
  const availableBase = itemData ? getItemStock(itemData, mainBranchId) : 0;
  const available = Number(availableBase || 0) + Number(item.qty || 0);
  openQtyModal({
    title: item.name || getLocalizedName(itemData),
    available,
    ...getQtyModalUnitMeta(item),
    mode: 'deduct',
    onConfirm: (qty) => {
      state.cashierTransferDraft.items[index].qty = qty;
      renderCashierTransferItems();
    }
  });
}

function submitCashierTransfer() {
  if (!state.cashierTransferDraft) return;
  if (state.cashierTransferDraft.mode === 'view') return;
  const errorEl = document.getElementById('cashierTransferError');
  if (errorEl) errorEl.textContent = '';
  const mainBranchId = getMainBranchId();
  if (!mainBranchId || !state.cashierTransferDraft.branchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const items = state.cashierTransferDraft.items.filter((item) => Number(item.qty || 0) > 0);
  if (!items.length) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }

  generateCounter('meta/cashierTransferCounter').then((transferNumber) => {
    const payload = {
      transferNumber,
      createdAt: serverTime,
      storekeeperId: state.user?.id || null,
      storekeeperName: state.user?.name || null,
      fromBranchId: mainBranchId,
      toBranchId: state.cashierTransferDraft.branchId,
      cashierId: state.cashierTransferDraft.cashierId || null,
      cashierName: state.cashierTransferDraft.cashierName || null,
      requestId: state.cashierTransferDraft.requestId || null,
      requestNumber: state.cashierTransferDraft.requestNumber || null,
      status: 'in_transit',
      items: items.map((item) => ({
        itemId: item.itemId,
        itemType: item.itemType,
        name: item.name,
        nameAr: item.nameAr || item.name || '-',
        nameEn: item.nameEn || '',
        unitId: item.unitId || null,
        groupKey: item.groupKey || '',
        requestedQty: item.requestedQty,
        qty: item.qty
      }))
    };
    db.ref('cashierTransfers').push(payload).then((ref) => {
      const updates = items.map((item) => updateItemStock(item.itemType, item.itemId, mainBranchId, -Number(item.qty || 0)));
      Promise.all(updates).then(() => {
        if (state.cashierTransferDraft.requestId) {
          db.ref(`transferRequests/${state.cashierTransferDraft.requestId}`).update({
            status: 'transferred',
            transferId: ref.key,
            transferNumber,
            processedAt: serverTime,
            processedBy: state.user?.name || null
          });
        }
        closeCashierTransferModal();
        resetCashierTransferDraft();
        renderCashierTransferRequestsSection();
      });
    });
  });
}

function acceptCashierTransferRequest(record) {
  if (!record?.id) return;
  db.ref(`transferRequests/${record.id}`).update({
    status: 'accepted',
    alertAcknowledged: true,
    acceptedAt: serverTime,
    acceptedBy: state.user?.name || null
  }).then(() => {
    renderCashierTransferRequestsSection();
  });
}

function openCashierTransferDeliveryModal(record) {
  if (!record?.id) return;
  const existing = document.getElementById('cashierTransferDeliveryModal');
  if (existing) existing.remove();
  const items = normalizeItems(record.items);
  const overlay = document.createElement('div');
  overlay.id = 'cashierTransferDeliveryModal';
  overlay.className = 'overlay';
  overlay.innerHTML = `
    <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 960px; width: 100%;">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>تسليم طلب النواقص ${escapeHtml(record.requestNumber || '')}</h3>
        <button class="btn ghost small" data-close>×</button>
      </div>
      <button class="btn primary" data-fill-all style="margin-top: 12px;">تم تأمين كل النواقص</button>
      <div class="table-wrap" style="margin-top: 12px;">
        <table class="table">
          <thead>
            <tr>
              <th>اسم المنتج</th>
              <th>الكمية المطلوبة</th>
              <th>الكمية المرسلة</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item, index) => `
              <tr>
                <td>${escapeHtml(item.nameAr || item.name || getCashierTransferItemName(item))}</td>
                <td data-requested="${Number(item.requestedQty || item.qty || 0)}">${formatNumber(Number(item.requestedQty || item.qty || 0))}</td>
                <td>
                  <input class="input cashier-transfer-sent-qty" data-index="${index}" inputmode="decimal" value="${item.sentQty || ''}" />
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="row" style="justify-content: flex-end; margin-top: 16px;">
        <button class="btn ghost" data-close>${window.i18n.t('cancel')}</button>
        <button class="btn primary" data-submit>ارسال</button>
      </div>
      <p class="helper form-error" data-error style="margin-top: 8px;"></p>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelectorAll('[data-close]').forEach((button) => {
    button.addEventListener('click', () => overlay.remove());
  });
  overlay.querySelector('[data-fill-all]')?.addEventListener('click', () => {
    overlay.querySelectorAll('.cashier-transfer-sent-qty').forEach((input) => {
      const requested = input.closest('tr')?.querySelector('[data-requested]')?.dataset.requested || '0';
      input.value = requested;
    });
  });
  overlay.querySelectorAll('.cashier-transfer-sent-qty').forEach((input) => {
    input.addEventListener('input', () => {
      input.value = normalizeSearchValue(input.value).replace(/[^0-9.]/g, '');
    });
  });
  overlay.querySelector('[data-submit]')?.addEventListener('click', () => submitCashierTransferDelivery(record, overlay));
}

function submitCashierTransferDelivery(record, overlay) {
  const inputs = Array.from(overlay.querySelectorAll('.cashier-transfer-sent-qty'));
  const errorEl = overlay.querySelector('[data-error]');
  const items = normalizeItems(record.items).map((item, index) => ({
    ...item,
    requestedQty: Number(item.requestedQty || item.qty || 0),
    sentQty: Number(normalizeSearchValue(inputs[index]?.value || '0')) || 0
  }));
  if (!items.length || items.some((item) => Number(item.sentQty || 0) < 0)) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  db.ref(`transferRequests/${record.id}`).update({
    status: 'sent',
    sentAt: serverTime,
    sentBy: state.user?.name || null,
    items,
    sentItems: items
  }).then(() => {
    overlay.remove();
    renderCashierTransferRequestsSection();
  });
}

function setupStockReturnSection() {
  const section = document.getElementById('section-stockReturn');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('stock_return')}</h3>
        <button id="openStockReturnModalBtn" class="btn primary">${window.i18n.t('new_stock_return')}</button>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('stock_return_number')}</th>
            <th>${window.i18n.t('from_branch')}</th>
            <th>${window.i18n.t('to_branch')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="stockReturnTable"></tbody>
      </table>
    </div>
    <div id="stockReturnModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('stock_return_voucher')}</h3>
          <button id="stockReturnModalCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="stockReturnStorekeeper" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('from_branch')}</label>
            <select id="stockReturnBranchSelect" class="input"></select>
          </div>
        </div>
        <div style="margin-top: 12px;">
          <label class="tag">${window.i18n.t('return_reason')}</label>
          <input id="stockReturnReason" class="input" placeholder="${window.i18n.t('return_reason_placeholder')}" />
        </div>
        ${buildEntrySearchTypeFilterHtml('stockReturn')}
        <div class="row" style="margin-top: 12px;">
          <input id="stockReturnSearchInput" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('search_items')}" />
          <button id="stockReturnSearchBtn" class="btn ghost small">${window.i18n.t('search')}</button>
        </div>
        <div id="stockReturnSearchResults" class="grid two" style="margin-top: 12px;"></div>
        <div style="margin-top: 16px;">
          <h4>${window.i18n.t('items')}</h4>
          <div id="stockReturnItemsList" class="grid two"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="stockReturnCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="stockReturnSubmitBtn" class="btn primary">${window.i18n.t('add')}</button>
        </div>
        <p id="stockReturnError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
  `;

  resetStockReturnDraft();
  bindStockReturnSection();
  renderStockReturnSection();
}

function resetStockReturnDraft() {
  state.stockReturnDraft = {
    branchId: '',
    reason: '',
    searchTypes: [],
    items: [],
    editingId: null,
    originalItems: [],
    originalBranchId: null,
    originalReason: ''
  };
}

function bindStockReturnSection() {
  const openBtn = document.getElementById('openStockReturnModalBtn');
  const closeBtn = document.getElementById('stockReturnModalCloseBtn');
  const cancelBtn = document.getElementById('stockReturnCancelBtn');
  const branchSelect = document.getElementById('stockReturnBranchSelect');
  const reasonInput = document.getElementById('stockReturnReason');
  const searchInput = document.getElementById('stockReturnSearchInput');
  const searchBtn = document.getElementById('stockReturnSearchBtn');
  const submitBtn = document.getElementById('stockReturnSubmitBtn');

  if (openBtn) openBtn.addEventListener('click', () => openStockReturnModal());
  if (closeBtn) closeBtn.addEventListener('click', () => closeStockReturnModal());
  if (cancelBtn) cancelBtn.addEventListener('click', () => closeStockReturnModal());

  if (branchSelect) {
    branchSelect.addEventListener('change', () => {
      state.stockReturnDraft.branchId = branchSelect.value;
      const errorEl = document.getElementById('stockReturnError');
      if (errorEl) errorEl.textContent = '';
    });
  }

  if (reasonInput) {
    reasonInput.addEventListener('input', () => {
      state.stockReturnDraft.reason = reasonInput.value || '';
      const errorEl = document.getElementById('stockReturnError');
      if (errorEl) errorEl.textContent = '';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => renderStockReturnSearchResults());
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleStockReturnBarcodeScan();
      }
    });
  }

  if (searchBtn) searchBtn.addEventListener('click', () => renderStockReturnSearchResults());
  if (submitBtn) submitBtn.addEventListener('click', () => submitStockReturnVoucher());

  bindEntrySearchTypeFilter('stockReturn', (selectedTypes) => {
    state.stockReturnDraft.searchTypes = selectedTypes;
    renderStockReturnSearchResults();
  });
}

function openStockReturnModal() {
  const overlay = document.getElementById('stockReturnModal');
  if (!overlay) return;
  resetStockReturnDraft();
  renderStockReturnSection();
  const errorEl = document.getElementById('stockReturnError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('stockReturnSearchInput');
  if (searchInput) searchInput.value = '';
  renderStockReturnSearchResults();
  overlay.classList.remove('hidden');
}

function openStockReturnEditModal(record) {
  const overlay = document.getElementById('stockReturnModal');
  if (!overlay || !record) return;
  resetStockReturnDraft();
  state.stockReturnDraft.editingId = record.id || null;
  state.stockReturnDraft.branchId = record.fromBranchId || '';
  state.stockReturnDraft.reason = record.reason || '';
  state.stockReturnDraft.originalBranchId = record.fromBranchId || '';
  state.stockReturnDraft.originalReason = record.reason || '';
  state.stockReturnDraft.items = normalizeItems(record.items).map((item) => ({ ...item }));
  state.stockReturnDraft.originalItems = normalizeItems(record.items).map((item) => ({ ...item }));
  renderStockReturnSection();
  const errorEl = document.getElementById('stockReturnError');
  if (errorEl) errorEl.textContent = '';
  overlay.classList.remove('hidden');
}

function closeStockReturnModal() {
  const overlay = document.getElementById('stockReturnModal');
  if (overlay) overlay.classList.add('hidden');
}

function renderStockReturnSection() {
  if (!state.stockReturnDraft) resetStockReturnDraft();
  const storekeeperInput = document.getElementById('stockReturnStorekeeper');
  const branchSelect = document.getElementById('stockReturnBranchSelect');
  const reasonInput = document.getElementById('stockReturnReason');
  if (storekeeperInput) storekeeperInput.value = state.user?.name || '-';
  if (branchSelect) {
    renderBranchOptions(branchSelect, { excludeMain: true });
    branchSelect.value = state.stockReturnDraft.branchId || '';
  }
  if (reasonInput) reasonInput.value = state.stockReturnDraft.reason || '';
  renderEntrySearchTypeFilter('stockReturn', state.stockReturnDraft.searchTypes);
  renderStockReturnSearchResults();
  renderStockReturnItems();
  renderStockReturnTable();
}

function getStockReturnSearchEntries() {
  return filterEntriesBySearchTypes(getAllItems(), state.stockReturnDraft?.searchTypes);
}

function handleStockReturnBarcodeScan() {
  const searchInput = document.getElementById('stockReturnSearchInput');
  if (!searchInput) return;
  const query = searchInput.value.trim();
  if (!query) return;
  const entries = getStockReturnSearchEntries();
  const match = findExactItemMatch(entries, query);
  if (match) {
    openStockReturnQtyModal(match);
    searchInput.value = '';
    renderStockReturnSearchResults();
  }
}

function renderStockReturnSearchResults() {
  const searchInput = document.getElementById('stockReturnSearchInput');
  const results = document.getElementById('stockReturnSearchResults');
  if (!searchInput || !results) return;
  const query = searchInput.value.trim();
  if (!query) {
    results.innerHTML = '';
    return;
  }
  const entries = filterItemEntries(getStockReturnSearchEntries(), query);
  const exact = findExactItemMatch(entries, query);
  if (exact) {
    openStockReturnQtyModal(exact);
    searchInput.value = '';
    results.innerHTML = '';
    return;
  }
  renderItemSearchResults(results, entries, (entry) => openStockReturnQtyModal(entry));
}

function openStockReturnQtyModal(entry) {
  const errorEl = document.getElementById('stockReturnError');
  if (errorEl) errorEl.textContent = '';
  const branchId = state.stockReturnDraft.branchId;
  if (!branchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  resolveEntryWithProductionSelection(entry).then((selectedEntry) => {
    if (!selectedEntry) return;
    const available = getItemStock(selectedEntry.item, branchId);
    openQtyModal({
      title: getLocalizedName(selectedEntry.item),
      available,
      ...getQtyModalUnitMeta(selectedEntry.item),
      mode: 'deduct',
      onConfirm: (qty) => addStockReturnItem(selectedEntry, qty)
    });
  });
}

function addStockReturnItem(entry, qty) {
  const productionId = entry.productionRecord?.id || null;
  const existing = state.stockReturnDraft.items.find((item) => (
    item.itemId === entry.id
    && item.itemType === entry.type
    && (entry.type !== 'product' || String(item.productionId || '') === String(productionId || ''))
  ));
  if (existing) {
    existing.qty += qty;
  } else {
    state.stockReturnDraft.items.push({
      itemId: entry.id,
      itemType: entry.type,
      name: getLocalizedName(entry.item),
      qty,
      unitId: entry.item.unitId || null,
      unitName: getResolvedItemUnitName(entry.item),
      productionId,
      productionDate: entry.productionRecord?.productionDate || null,
      productionNumber: entry.productionRecord?.productionNumber || null
    });
  }
  renderStockReturnItems();
}

function renderStockReturnItems() {
  const container = document.getElementById('stockReturnItemsList');
  if (!container) return;
  container.innerHTML = '';
  if (!state.stockReturnDraft.items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  state.stockReturnDraft.items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'notice';
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${item.name}</strong>
          <div class="helper">${window.i18n.t('quantity')}: ${formatQuantityWithUnit(item.qty, item, item.unitName)}</div>
          ${item.productionDate ? `<div class="helper">${window.i18n.t('production_date')}: ${item.productionDate}</div>` : ''}
        </div>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="edit" data-index="${index}">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete" data-index="${index}">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="edit"]').addEventListener('click', () => editStockReturnItemQty(index));
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      state.stockReturnDraft.items.splice(index, 1);
      renderStockReturnItems();
    });
    container.appendChild(card);
  });
}

function editStockReturnItemQty(index) {
  const item = state.stockReturnDraft.items[index];
  if (!item) return;
  const branchId = state.stockReturnDraft.branchId;
  if (!branchId) return;
  const itemData = getItemDataByType(item.itemType, item.itemId);
  const availableBase = itemData ? getItemStock(itemData, branchId) : 0;
  const available = Number(availableBase || 0) + Number(item.qty || 0);
  openQtyModal({
    title: item.name || getLocalizedName(itemData),
    available,
    ...getQtyModalUnitMeta(item),
    mode: 'deduct',
    onConfirm: (qty) => {
      state.stockReturnDraft.items[index].qty = qty;
      renderStockReturnItems();
    }
  });
}

function submitStockReturnVoucher() {
  const errorEl = document.getElementById('stockReturnError');
  if (errorEl) errorEl.textContent = '';
  const reason = String(state.stockReturnDraft.reason || '').trim();
  if (!state.stockReturnDraft.items.length || !state.stockReturnDraft.branchId || !reason) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  const mainBranchId = getMainBranchId();
  if (!mainBranchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }

  if (state.stockReturnDraft.editingId) {
    const editingId = state.stockReturnDraft.editingId;
    const newBranchId = state.stockReturnDraft.branchId;
    const oldBranchId = state.stockReturnDraft.originalBranchId || newBranchId;
    const payload = {
      fromBranchId: newBranchId,
      toBranchId: mainBranchId,
      reason,
      items: state.stockReturnDraft.items
    };
    db.ref(`stockReturn/${editingId}`).update(payload).then(() => {
      const updates = [];
      if (oldBranchId !== newBranchId) {
        state.stockReturnDraft.originalItems.forEach((item) => {
          updates.push(updateItemStock(item.itemType, item.itemId, mainBranchId, -Number(item.qty || 0)));
          updates.push(updateItemStock(item.itemType, item.itemId, oldBranchId, Number(item.qty || 0)));
        });
        state.stockReturnDraft.items.forEach((item) => {
          updates.push(updateItemStock(item.itemType, item.itemId, mainBranchId, Number(item.qty || 0)));
          updates.push(updateItemStock(item.itemType, item.itemId, newBranchId, -Number(item.qty || 0)));
        });
      } else {
        const diffs = diffItems(state.stockReturnDraft.originalItems, state.stockReturnDraft.items);
        diffs.forEach((diff) => {
          updates.push(updateItemStock(diff.itemType, diff.itemId, mainBranchId, Number(diff.qtyDiff || 0)));
          updates.push(updateItemStock(diff.itemType, diff.itemId, newBranchId, -Number(diff.qtyDiff || 0)));
        });
      }
      Promise.all(updates).then(() => {
        resetStockReturnDraft();
        renderStockReturnSection();
        closeStockReturnModal();
      });
    });
    return;
  }

  generateCounter('meta/stockReturnCounter').then((stockReturnNumber) => {
    const payload = {
      stockReturnNumber,
      createdAt: serverTime,
      storekeeperId: state.user?.id || null,
      storekeeperName: state.user?.name || null,
      fromBranchId: state.stockReturnDraft.branchId,
      toBranchId: mainBranchId,
      reason,
      items: state.stockReturnDraft.items
    };
    db.ref('stockReturn').push(payload).then(() => {
      const updates = [];
      state.stockReturnDraft.items.forEach((item) => {
        updates.push(updateItemStock(item.itemType, item.itemId, state.stockReturnDraft.branchId, -Number(item.qty || 0)));
        updates.push(updateItemStock(item.itemType, item.itemId, mainBranchId, Number(item.qty || 0)));
      });
      Promise.all(updates).then(() => {
        resetStockReturnDraft();
        renderStockReturnSection();
        closeStockReturnModal();
      });
    });
  });
}

function renderStockReturnTable() {
  const table = document.getElementById('stockReturnTable');
  if (!table) return;
  const records = state.cache.stockReturn || {};
  const entries = Object.entries(records)
    .map(([id, rec]) => ({ id, ...rec }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="7">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((rec) => {
    const items = normalizeItems(rec.items);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${rec.stockReturnNumber || '-'}</td>
      <td>${getBranchLabel(rec.fromBranchId)}</td>
      <td>${getBranchLabel(rec.toBranchId)}</td>
      <td>${rec.storekeeperName || '-'}</td>
      <td>${formatDate(rec.createdAt)}</td>
      <td>${items.length}</td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="print">${window.i18n.t('print_report')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </td>
    `;
    row.querySelector('[data-action="print"]').addEventListener('click', () => printStockReturnReport(rec));
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openStockReturnEditModal(rec));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteStockReturn(rec));
    table.appendChild(row);
  });
}

function deleteStockReturn(record) {
  if (!record?.id) return;
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const mainBranchId = record.toBranchId || getMainBranchId();
  const fromBranchId = record.fromBranchId;
  const items = normalizeItems(record.items);
  const updates = [];
  items.forEach((item) => {
    updates.push(updateItemStock(item.itemType, item.itemId, mainBranchId, -Number(item.qty || 0)));
    updates.push(updateItemStock(item.itemType, item.itemId, fromBranchId, Number(item.qty || 0)));
  });
  Promise.all(updates).then(() => {
    db.ref(`stockReturn/${record.id}`).remove();
  });
}

function setupScrapReturnSection() {
  const section = document.getElementById('section-scrapReturn');
  if (!section) return;
  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <h3>${window.i18n.t('scrap_return')}</h3>
        <button id="openScrapReturnModalBtn" class="btn primary">${window.i18n.t('new_scrap_return')}</button>
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('scrap_return_number')}</th>
            <th>${window.i18n.t('from_branch')}</th>
            <th>${window.i18n.t('storekeeper_name')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('items')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="scrapReturnTable"></tbody>
      </table>
    </div>
    <div id="scrapReturnModal" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('scrap_return_voucher')}</h3>
          <button id="scrapReturnModalCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('storekeeper_name')}</label>
            <input id="scrapReturnStorekeeper" class="input" readonly />
          </div>
          <div>
            <label class="tag">${window.i18n.t('from_branch')}</label>
            <select id="scrapReturnBranchSelect" class="input"></select>
          </div>
        </div>
        ${buildEntrySearchTypeFilterHtml('scrapReturn')}
        <div class="row" style="margin-top: 12px;">
          <input id="scrapReturnSearchInput" class="input" style="max-width: 320px;" placeholder="${window.i18n.t('search_items')}" />
          <button id="scrapReturnSearchBtn" class="btn ghost small">${window.i18n.t('search')}</button>
        </div>
        <div id="scrapReturnSearchResults" class="grid two" style="margin-top: 12px;"></div>
        <div style="margin-top: 16px;">
          <h4>${window.i18n.t('items')}</h4>
          <div id="scrapReturnItemsList" class="grid two"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 16px;">
          <button id="scrapReturnCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="scrapReturnSubmitBtn" class="btn primary">${window.i18n.t('scrap_action')}</button>
        </div>
        <p id="scrapReturnError" class="helper form-error" style="margin-top: 8px;"></p>
      </div>
    </div>
  `;

  resetScrapReturnDraft();
  bindScrapReturnSection();
  renderScrapReturnSection();
}

function resetScrapReturnDraft() {
  state.scrapReturnDraft = {
    branchId: '',
    searchTypes: [],
    items: [],
    editingId: null,
    originalItems: [],
    originalBranchId: null
  };
}

function bindScrapReturnSection() {
  const openBtn = document.getElementById('openScrapReturnModalBtn');
  const closeBtn = document.getElementById('scrapReturnModalCloseBtn');
  const cancelBtn = document.getElementById('scrapReturnCancelBtn');
  const branchSelect = document.getElementById('scrapReturnBranchSelect');
  const searchInput = document.getElementById('scrapReturnSearchInput');
  const searchBtn = document.getElementById('scrapReturnSearchBtn');
  const submitBtn = document.getElementById('scrapReturnSubmitBtn');

  if (openBtn) openBtn.addEventListener('click', () => openScrapReturnModal());
  if (closeBtn) closeBtn.addEventListener('click', () => closeScrapReturnModal());
  if (cancelBtn) cancelBtn.addEventListener('click', () => closeScrapReturnModal());

  if (branchSelect) {
    branchSelect.addEventListener('change', () => {
      state.scrapReturnDraft.branchId = branchSelect.value;
      const errorEl = document.getElementById('scrapReturnError');
      if (errorEl) errorEl.textContent = '';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => renderScrapReturnSearchResults());
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleScrapReturnBarcodeScan();
      }
    });
  }

  if (searchBtn) searchBtn.addEventListener('click', () => renderScrapReturnSearchResults());
  if (submitBtn) submitBtn.addEventListener('click', () => submitScrapReturnVoucher());

  bindEntrySearchTypeFilter('scrapReturn', (selectedTypes) => {
    state.scrapReturnDraft.searchTypes = selectedTypes;
    renderScrapReturnSearchResults();
  });
}

function openScrapReturnModal() {
  const overlay = document.getElementById('scrapReturnModal');
  if (!overlay) return;
  resetScrapReturnDraft();
  renderScrapReturnSection();
  const errorEl = document.getElementById('scrapReturnError');
  if (errorEl) errorEl.textContent = '';
  const searchInput = document.getElementById('scrapReturnSearchInput');
  if (searchInput) searchInput.value = '';
  renderScrapReturnSearchResults();
  overlay.classList.remove('hidden');
}

function openScrapReturnEditModal(record) {
  const overlay = document.getElementById('scrapReturnModal');
  if (!overlay || !record) return;
  resetScrapReturnDraft();
  state.scrapReturnDraft.editingId = record.id || null;
  state.scrapReturnDraft.branchId = record.branchId || '';
  state.scrapReturnDraft.originalBranchId = record.branchId || '';
  state.scrapReturnDraft.items = normalizeItems(record.items).map((item) => ({ ...item }));
  state.scrapReturnDraft.originalItems = normalizeItems(record.items).map((item) => ({ ...item }));
  renderScrapReturnSection();
  const errorEl = document.getElementById('scrapReturnError');
  if (errorEl) errorEl.textContent = '';
  overlay.classList.remove('hidden');
}

function closeScrapReturnModal() {
  const overlay = document.getElementById('scrapReturnModal');
  if (overlay) overlay.classList.add('hidden');
}

function renderScrapReturnSection() {
  if (!state.scrapReturnDraft) resetScrapReturnDraft();
  const storekeeperInput = document.getElementById('scrapReturnStorekeeper');
  const branchSelect = document.getElementById('scrapReturnBranchSelect');
  if (storekeeperInput) storekeeperInput.value = state.user?.name || '-';
  if (branchSelect) {
    renderBranchOptions(branchSelect, { excludeMain: true });
    branchSelect.value = state.scrapReturnDraft.branchId || '';
  }
  renderEntrySearchTypeFilter('scrapReturn', state.scrapReturnDraft.searchTypes);
  renderScrapReturnSearchResults();
  renderScrapReturnItems();
  renderScrapReturnTable();
}

function getScrapReturnSearchEntries() {
  return filterEntriesBySearchTypes(getAllItems(), state.scrapReturnDraft?.searchTypes);
}

function handleScrapReturnBarcodeScan() {
  const searchInput = document.getElementById('scrapReturnSearchInput');
  if (!searchInput) return;
  const query = searchInput.value.trim();
  if (!query) return;
  const entries = getScrapReturnSearchEntries();
  const match = findExactItemMatch(entries, query);
  if (match) {
    openScrapReturnQtyModal(match);
    searchInput.value = '';
    renderScrapReturnSearchResults();
  }
}

function renderScrapReturnSearchResults() {
  const searchInput = document.getElementById('scrapReturnSearchInput');
  const results = document.getElementById('scrapReturnSearchResults');
  if (!searchInput || !results) return;
  const query = searchInput.value.trim();
  if (!query) {
    results.innerHTML = '';
    return;
  }
  const entries = filterItemEntries(getScrapReturnSearchEntries(), query);
  const exact = findExactItemMatch(entries, query);
  if (exact) {
    openScrapReturnQtyModal(exact);
    searchInput.value = '';
    results.innerHTML = '';
    return;
  }
  renderItemSearchResults(results, entries, (entry) => openScrapReturnQtyModal(entry));
}

function openScrapReturnQtyModal(entry) {
  const errorEl = document.getElementById('scrapReturnError');
  if (errorEl) errorEl.textContent = '';
  const branchId = state.scrapReturnDraft.branchId;
  if (!branchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }
  resolveEntryWithProductionSelection(entry).then((selectedEntry) => {
    if (!selectedEntry) return;
    const available = getItemStock(selectedEntry.item, branchId);
    openQtyModal({
      title: getLocalizedName(selectedEntry.item),
      available,
      ...getQtyModalUnitMeta(selectedEntry.item),
      mode: 'deduct',
      onConfirm: (qty) => addScrapReturnItem(selectedEntry, qty)
    });
  });
}

function addScrapReturnItem(entry, qty) {
  const productionId = entry.productionRecord?.id || null;
  const existing = state.scrapReturnDraft.items.find((item) => (
    item.itemId === entry.id
    && item.itemType === entry.type
    && (entry.type !== 'product' || String(item.productionId || '') === String(productionId || ''))
  ));
  if (existing) {
    existing.qty += qty;
  } else {
    state.scrapReturnDraft.items.push({
      itemId: entry.id,
      itemType: entry.type,
      name: getLocalizedName(entry.item),
      qty,
      unitId: entry.item.unitId || null,
      unitName: getResolvedItemUnitName(entry.item),
      productionId,
      productionDate: entry.productionRecord?.productionDate || null,
      productionNumber: entry.productionRecord?.productionNumber || null
    });
  }
  renderScrapReturnItems();
}

function renderScrapReturnItems() {
  const container = document.getElementById('scrapReturnItemsList');
  if (!container) return;
  container.innerHTML = '';
  if (!state.scrapReturnDraft.items.length) {
    container.innerHTML = `<p class="helper">${window.i18n.t('no_data')}</p>`;
    return;
  }
  state.scrapReturnDraft.items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'notice';
    card.innerHTML = `
      <div class="row" style="justify-content: space-between;">
        <div>
          <strong>${item.name}</strong>
          <div class="helper">${window.i18n.t('quantity')}: ${formatQuantityWithUnit(item.qty, item, item.unitName)}</div>
          ${item.productionDate ? `<div class="helper">${window.i18n.t('production_date')}: ${item.productionDate}</div>` : ''}
        </div>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="edit" data-index="${index}">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete" data-index="${index}">${window.i18n.t('delete')}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="edit"]').addEventListener('click', () => editScrapReturnItemQty(index));
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      state.scrapReturnDraft.items.splice(index, 1);
      renderScrapReturnItems();
    });
    container.appendChild(card);
  });
}

function editScrapReturnItemQty(index) {
  const item = state.scrapReturnDraft.items[index];
  if (!item) return;
  const branchId = state.scrapReturnDraft.branchId;
  if (!branchId) return;
  const itemData = getItemDataByType(item.itemType, item.itemId);
  const availableBase = itemData ? getItemStock(itemData, branchId) : 0;
  const available = Number(availableBase || 0) + Number(item.qty || 0);
  openQtyModal({
    title: item.name || getLocalizedName(itemData),
    available,
    ...getQtyModalUnitMeta(item),
    mode: 'deduct',
    onConfirm: (qty) => {
      state.scrapReturnDraft.items[index].qty = qty;
      renderScrapReturnItems();
    }
  });
}

function submitScrapReturnVoucher() {
  const errorEl = document.getElementById('scrapReturnError');
  if (errorEl) errorEl.textContent = '';
  if (!state.scrapReturnDraft.items.length || !state.scrapReturnDraft.branchId) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }

  if (state.scrapReturnDraft.editingId) {
    const editingId = state.scrapReturnDraft.editingId;
    const newBranchId = state.scrapReturnDraft.branchId;
    const oldBranchId = state.scrapReturnDraft.originalBranchId || newBranchId;
    const payload = {
      branchId: newBranchId,
      items: state.scrapReturnDraft.items
    };
    db.ref(`scrapReturn/${editingId}`).update(payload).then(() => {
      const updates = [];
      if (oldBranchId !== newBranchId) {
        state.scrapReturnDraft.originalItems.forEach((item) => {
          updates.push(updateItemStock(item.itemType, item.itemId, oldBranchId, Number(item.qty || 0)));
        });
        state.scrapReturnDraft.items.forEach((item) => {
          updates.push(updateItemStock(item.itemType, item.itemId, newBranchId, -Number(item.qty || 0)));
        });
      } else {
        const diffs = diffItems(state.scrapReturnDraft.originalItems, state.scrapReturnDraft.items);
        diffs.forEach((diff) => {
          updates.push(updateItemStock(diff.itemType, diff.itemId, newBranchId, -Number(diff.qtyDiff || 0)));
        });
      }
      Promise.all(updates).then(() => {
        resetScrapReturnDraft();
        renderScrapReturnSection();
        closeScrapReturnModal();
      });
    });
    return;
  }

  generateCounter('meta/scrapReturnCounter').then((scrapReturnNumber) => {
    const payload = {
      scrapReturnNumber,
      createdAt: serverTime,
      storekeeperId: state.user?.id || null,
      storekeeperName: state.user?.name || null,
      branchId: state.scrapReturnDraft.branchId,
      items: state.scrapReturnDraft.items
    };
    db.ref('scrapReturn').push(payload).then(() => {
      const updates = [];
      state.scrapReturnDraft.items.forEach((item) => {
        updates.push(updateItemStock(item.itemType, item.itemId, state.scrapReturnDraft.branchId, -Number(item.qty || 0)));
      });
      Promise.all(updates).then(() => {
        resetScrapReturnDraft();
        renderScrapReturnSection();
        closeScrapReturnModal();
      });
    });
  });
}

function renderScrapReturnTable() {
  const table = document.getElementById('scrapReturnTable');
  if (!table) return;
  const records = state.cache.scrapReturn || {};
  const entries = Object.entries(records)
    .map(([id, rec]) => ({ id, ...rec }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="6">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }
  entries.forEach((rec) => {
    const items = normalizeItems(rec.items);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${rec.scrapReturnNumber || '-'}</td>
      <td>${getBranchLabel(rec.branchId)}</td>
      <td>${rec.storekeeperName || '-'}</td>
      <td>${formatDate(rec.createdAt)}</td>
      <td>${items.length}</td>
      <td>
        <div class="row" style="gap: 6px;">
          <button class="btn ghost small" data-action="print">${window.i18n.t('print_report')}</button>
          <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
          <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
        </div>
      </td>
    `;
    row.querySelector('[data-action="print"]').addEventListener('click', () => printScrapReturnReport(rec));
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openScrapReturnEditModal(rec));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => deleteScrapReturn(rec));
    table.appendChild(row);
  });
}

function deleteScrapReturn(record) {
  if (!record?.id) return;
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  const branchId = record.branchId;
  const items = normalizeItems(record.items);
  const updates = items.map((item) => updateItemStock(item.itemType, item.itemId, branchId, Number(item.qty || 0)));
  Promise.all(updates).then(() => {
    db.ref(`scrapReturn/${record.id}`).remove();
  });
}

function buildReportHtml({ title, meta, columns, rows, footerNote, barcodeValue, docNumberLabel, docNumberValue, tableTitle, extraTableTitle, extraColumns, extraRows, showRowNumbers = true }) {
  const dir = document.documentElement.dir || 'rtl';
  const lang = document.documentElement.lang || 'ar';
  const metaHtml = meta.map((item) => `
    <div class="meta-item">
      <div class="meta-label">${item.label}</div>
      <div class="meta-value">${item.value}</div>
    </div>
  `).join('');
  const headerHtml = columns.map((label) => `<th>${label}</th>`).join('');
  const numberHeader = showRowNumbers ? `<th>${window.i18n.t('row_number')}</th>` : '';
  const rowsHtml = rows.map((row, index) => `
    <tr>
      ${showRowNumbers ? `<td>${index + 1}</td>` : ''}
      ${row.map((cell) => `<td>${cell}</td>`).join('')}
    </tr>
  `).join('');
  const tableTitleText = tableTitle || window.i18n.t('items_table');
  const extraHeaderHtml = (extraColumns || []).map((label) => `<th>${label}</th>`).join('');
  const extraRowsHtml = (extraRows || []).map((row, index) => `
    <tr>
      ${showRowNumbers ? `<td>${index + 1}</td>` : ''}
      ${row.map((cell) => `<td>${cell}</td>`).join('')}
    </tr>
  `).join('');
  const barcodeHtml = barcodeValue ? `<div class="barcode"><svg id="reportBarcode"></svg></div>` : '';
  const isDesktopPrint = Boolean(window.figsDesktop?.isDesktopApp);
  const barcodeScript = isDesktopPrint
    ? ''
    : barcodeValue
    ? `
      <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
      <script>
        window.addEventListener('load', () => {
          try { JsBarcode("#reportBarcode", "${barcodeValue}", { format: "CODE128", displayValue: true, height: 46 }); } catch (e) {}
          setTimeout(() => window.print(), 120);
        });
      </script>
    `
    : `
      <script>
        window.addEventListener('load', () => { window.print(); });
      </script>
    `;
  const appTitle = window.i18n.t('app_title');
  const brandName = 'مخبز التين والزيتون';
  const docNumberText = docNumberLabel ? `${docNumberLabel}: ${docNumberValue || '-'}` : '';
  const docNumberHtml = docNumberText ? `<div class="doc-number">${docNumberText}</div>` : '';
  return `
    <html lang="${lang}" dir="${dir}">
      <head>
        <title>${title}</title>
        <style>
          @page { size: A4; margin: 16mm; }
          * { box-sizing: border-box; }
          body { font-family: "Cairo", sans-serif; color: #1f1a14; margin: 0; }
          .report { padding: 8mm; border: 1px solid #cfc5bb; }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #3a2f26; padding-bottom: 12px; }
          .brand { display: flex; align-items: center; gap: 12px; }
          .brand img { width: 70px; height: 70px; object-fit: contain; }
          .brand-name { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.2px; }
          .brand-subtitle { font-size: 11px; color: #6b5c4f; margin-top: 2px; }
          .doc-box { min-width: 190px; text-align: end; border: 1px solid #3a2f26; padding: 8px 10px; }
          .doc-title { margin: 0 0 4px; font-size: 18px; font-weight: 700; }
          .doc-number { font-size: 12px; font-weight: 600; }
          .meta { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 12px; }
          .meta-item { border: 1px solid #d8cfc5; padding: 6px 8px; }
          .meta-label { font-size: 10px; color: #6b5c4f; margin-bottom: 3px; }
          .meta-value { font-size: 12px; font-weight: 700; color: #1f1a14; }
          .table-title { margin-top: 16px; font-size: 13px; font-weight: 700; color: #3a2f26; }
          table { width: 100%; border-collapse: collapse; margin-top: 14px; border: 1.4px solid #c3b9af; }
          th, td { border: 1.4px solid #c3b9af; padding: 7px; text-align: start; font-size: 12px; }
          th { background: #f1ece6; font-weight: 700; }
          tr { page-break-inside: avoid; }
          .footer { display: flex; justify-content: space-between; margin-top: 16px; font-size: 11px; color: #6b5c4f; }
          .barcode { margin-top: 16px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="report">
          <div class="header">
            <div class="brand">
              <img src="logo.png" alt="logo" />
              <div>
                <div class="brand-name">${brandName}</div>
                <div class="brand-subtitle">${appTitle}</div>
              </div>
            </div>
            <div class="doc-box">
              <div class="doc-title">${title}</div>
              ${docNumberHtml}
          </div>
        </div>
        <div class="meta">${metaHtml}</div>
        <div class="table-title">${tableTitleText}</div>
        <table>
          <thead>
            <tr>${numberHeader}${headerHtml}</tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
        ${extraColumns && extraColumns.length ? `
          <div class="table-title">${extraTableTitle || ''}</div>
          <table>
            <thead>
              <tr>${numberHeader}${extraHeaderHtml}</tr>
            </thead>
            <tbody>
              ${extraRowsHtml}
            </tbody>
          </table>
        ` : ''}
        ${barcodeHtml}
        ${footerNote ? `<div class="footer">${footerNote}</div>` : ''}
      </div>
        ${barcodeScript}
      </body>
    </html>
  `;
}

function openPrintWindow(html) {
  if (window.figsDesktop?.isDesktopApp) {
    window.figsDesktop.printHtml({ html, type: 'a4', silent: true }).catch((error) => {
      console.error('Desktop report print failed:', error);
      alert('تعذرت طباعة التقرير. تأكد من اختيار طابعة A4 في إعدادات الطابعات.');
    });
    return;
  }
  const win = window.open('', '_blank', 'width=900,height=700');
  if (!win) return;
  win.document.write(html);
  win.document.close();
}

function printReceivingReport(record) {
  if (!record) return;
  const items = normalizeItems(record.items);
  const meta = [
    { label: window.i18n.t('source_name'), value: record.sourceName || '-' },
    { label: window.i18n.t('date_time'), value: formatDate(record.createdAt) },
    { label: window.i18n.t('storekeeper_name'), value: record.storekeeperName || '-' },
    { label: window.i18n.t('items'), value: items.length }
  ];
  const columns = [
    window.i18n.t('name_ar'),
    window.i18n.t('name_en'),
    window.i18n.t('quantity'),
    window.i18n.t('storage_location')
  ];
  const rows = items.map((item) => [
    item.nameAr || '-',
    item.nameEn || '-',
    formatNumber(item.qty),
    getLocalizedName(state.cache.storageLocations?.[item.storageLocationId]) || '-'
  ]);
  const printedAt = `${window.i18n.t('printed_at')}: ${formatDate(Date.now())}`;
  const html = buildReportHtml({
    title: window.i18n.t('receiving_voucher'),
    meta,
    columns,
    rows,
    footerNote: printedAt,
    docNumberLabel: window.i18n.t('receiving_number'),
    docNumberValue: record.receivingNumber || '',
    tableTitle: window.i18n.t('items_table')
  });
  openPrintWindow(html);
}

function printTransferReport(record) {
  if (!record) return;
  const items = normalizeItems(record.items);
  const meta = [
    { label: window.i18n.t('branch'), value: getBranchRouteLabel(record.fromBranchId, record.toBranchId) },
    { label: window.i18n.t('date_time'), value: formatDate(record.createdAt) },
    { label: window.i18n.t('storekeeper_name'), value: record.storekeeperName || '-' },
    { label: window.i18n.t('items'), value: items.length }
  ];
  const columns = [
    window.i18n.t('name'),
    window.i18n.t('quantity')
  ];
  const rows = items.map((item) => [
    formatItemNameWithUnit(item.name || '-', item, item.unitName),
    formatQuantityWithUnit(item.qty, item, item.unitName)
  ]);
  const printedAt = `${window.i18n.t('printed_at')}: ${formatDate(Date.now())}`;
  const html = buildReportHtml({
    title: window.i18n.t('transfer_voucher'),
    meta,
    columns,
    rows,
    footerNote: printedAt,
    docNumberLabel: window.i18n.t('transfer_number'),
    docNumberValue: record.transferNumber || '',
    tableTitle: window.i18n.t('items_table')
  });
  openPrintWindow(html);
}

function printStockReturnReport(record) {
  if (!record) return;
  const items = normalizeItems(record.items);
  const meta = [
    { label: window.i18n.t('from_branch'), value: getBranchLabel(record.fromBranchId) },
    { label: window.i18n.t('to_branch'), value: getBranchLabel(record.toBranchId) },
    { label: window.i18n.t('date_time'), value: formatDate(record.createdAt) },
    { label: window.i18n.t('storekeeper_name'), value: record.storekeeperName || '-' },
    { label: window.i18n.t('items'), value: items.length }
  ];
  const columns = [
    window.i18n.t('name'),
    window.i18n.t('quantity')
  ];
  const rows = items.map((item) => [
    formatItemNameWithUnit(item.name || '-', item, item.unitName),
    formatQuantityWithUnit(item.qty, item, item.unitName)
  ]);
  const printedAt = `${window.i18n.t('printed_at')}: ${formatDate(Date.now())}`;
  const html = buildReportHtml({
    title: window.i18n.t('stock_return_voucher'),
    meta,
    columns,
    rows,
    footerNote: printedAt,
    docNumberLabel: window.i18n.t('stock_return_number'),
    docNumberValue: record.stockReturnNumber || '',
    tableTitle: window.i18n.t('items_table')
  });
  openPrintWindow(html);
}

function printScrapReturnReport(record) {
  if (!record) return;
  const items = normalizeItems(record.items);
  const meta = [
    { label: window.i18n.t('from_branch'), value: getBranchLabel(record.branchId) },
    { label: window.i18n.t('date_time'), value: formatDate(record.createdAt) },
    { label: window.i18n.t('storekeeper_name'), value: record.storekeeperName || '-' },
    { label: window.i18n.t('items'), value: items.length }
  ];
  const columns = [
    window.i18n.t('name'),
    window.i18n.t('quantity')
  ];
  const rows = items.map((item) => [
    formatItemNameWithUnit(item.name || '-', item, item.unitName),
    formatQuantityWithUnit(item.qty, item, item.unitName)
  ]);
  const printedAt = `${window.i18n.t('printed_at')}: ${formatDate(Date.now())}`;
  const html = buildReportHtml({
    title: window.i18n.t('scrap_return_voucher'),
    meta,
    columns,
    rows,
    footerNote: printedAt,
    docNumberLabel: window.i18n.t('scrap_return_number'),
    docNumberValue: record.scrapReturnNumber || '',
    tableTitle: window.i18n.t('items_table')
  });
  openPrintWindow(html);
}

function printPurchaseRequestReport(record) {
  if (!record) return;
  const items = normalizeItems(record.items);
  const supplierName = record.supplierName
    || getLocalizedName(state.cache.suppliers?.[record.supplierId])
    || '-';
  const statusKey = record.status === 'partial'
    ? 'partial_received'
    : ['pending', 'approved', 'rejected', 'received'].includes(record.status)
      ? record.status
      : null;
  const meta = [
    { label: window.i18n.t('supplier'), value: supplierName },
    { label: window.i18n.t('date_time'), value: formatDate(record.createdAt) },
    { label: window.i18n.t('storekeeper_name'), value: record.storekeeperName || '-' },
    { label: window.i18n.t('status'), value: statusKey ? window.i18n.t(statusKey) : '-' },
    { label: window.i18n.t('items'), value: items.length }
  ];
  const columns = [
    window.i18n.t('name'),
    window.i18n.t('quantity'),
    window.i18n.t('price_unit')
  ];
  const rows = items.map((item) => {
    const data = getItemDataByType(item.itemType, item.itemId);
    const name = item.name || getLocalizedName(data) || '-';
    const unitId = item.unitId || data?.unitId || null;
    const unitPrice = Number(item.unitPrice ?? item.cost ?? 0);
    return [formatItemNameWithUnit(name, unitId), formatNumber(item.qty), formatMoney(unitPrice)];
  });
  const printedAt = `${window.i18n.t('printed_at')}: ${formatDate(Date.now())}`;
  const html = buildReportHtml({
    title: window.i18n.t('purchase_request'),
    meta,
    columns,
    rows,
    footerNote: printedAt,
    docNumberLabel: window.i18n.t('purchase_number'),
    docNumberValue: record.purchaseNumber || '',
    tableTitle: window.i18n.t('items_table')
  });
  openPrintWindow(html);
}

function printPurchaseReceiptReport(record) {
  if (!record) return;
  const purchase = record.purchaseId ? state.cache.purchases?.[record.purchaseId] : null;
  const orderedItems = normalizeItems(purchase?.items);
  const receivedMap = buildItemMap((purchase?.receivedItems && normalizeItems(purchase.receivedItems).length)
    ? purchase.receivedItems
    : record.items || []);
  const sourceItems = orderedItems.length ? orderedItems : normalizeItems(record.items);
  const supplierName = record.supplierName
    || getLocalizedName(state.cache.suppliers?.[record.supplierId])
    || '-';
  const meta = [
    { label: window.i18n.t('supplier'), value: supplierName },
    { label: window.i18n.t('purchase_number'), value: record.purchaseNumber || '-' },
    { label: window.i18n.t('purchase_invoice_number'), value: record.purchaseInvoiceNumber || '-' },
    { label: window.i18n.t('date_time'), value: formatDate(record.createdAt) },
    { label: window.i18n.t('storekeeper_name'), value: record.storekeeperName || '-' },
    { label: window.i18n.t('items'), value: sourceItems.length }
  ];
  const columns = [
    window.i18n.t('name'),
    window.i18n.t('requested_qty'),
    window.i18n.t('received_qty')
  ];
  const rows = sourceItems.map((item) => {
    const data = getItemDataByType(item.itemType, item.itemId);
    const name = item.name || getLocalizedName(data) || '-';
    const unitId = item.unitId || data?.unitId || null;
    const key = getItemKey(item);
    const orderedQty = Number(item.qty || 0);
    const receivedQty = Number(receivedMap[key]?.qty || 0);
    return [formatItemNameWithUnit(name, unitId), formatNumber(orderedQty), formatNumber(receivedQty)];
  });
  const printedAt = `${window.i18n.t('printed_at')}: ${formatDate(Date.now())}`;
  const docNumber = record.receiptNumber || purchase?.lastReceiptNumber || record.purchaseNumber || purchase?.purchaseNumber || '';
  const html = buildReportHtml({
    title: window.i18n.t('receive_purchases'),
    meta,
    columns,
    rows,
    footerNote: printedAt,
    docNumberLabel: window.i18n.t('receiving_number'),
    docNumberValue: docNumber,
    tableTitle: window.i18n.t('items_table')
  });
  openPrintWindow(html);
}

function printSupplierReturnReport(record) {
  if (!record) return;
  const items = normalizeItems(record.items);
  const supplierName = record.supplierName
    || getLocalizedName(state.cache.suppliers?.[record.supplierId])
    || '-';
  const meta = [
    { label: window.i18n.t('supplier'), value: supplierName },
    { label: window.i18n.t('date_time'), value: formatDate(record.createdAt) },
    { label: window.i18n.t('storekeeper_name'), value: record.storekeeperName || '-' },
    { label: window.i18n.t('items'), value: items.length }
  ];
  const columns = [
    window.i18n.t('name'),
    window.i18n.t('quantity')
  ];
  const rows = items.map((item) => {
    const data = getItemDataByType(item.itemType, item.itemId);
    const name = item.name || getLocalizedName(data) || '-';
    const unitId = item.unitId || data?.unitId || null;
    return [formatItemNameWithUnit(name, unitId), formatNumber(item.qty)];
  });
  const printedAt = `${window.i18n.t('printed_at')}: ${formatDate(Date.now())}`;
  const html = buildReportHtml({
    title: window.i18n.t('supplier_return_voucher'),
    meta,
    columns,
    rows,
    footerNote: printedAt,
    docNumberLabel: window.i18n.t('supplier_return_number'),
    docNumberValue: record.returnNumber || '',
    tableTitle: window.i18n.t('items_table')
  });
  openPrintWindow(html);
}

function printIssueReport(issue) {
  if (!issue) return;
  const branches = state.cache.branches || {};
  const items = normalizeItems(issue.items);
  const issueTypeLabel = issue.issueType === 'production' ? window.i18n.t('issue_production') : window.i18n.t('issue_order');
  const staffLabel = issue.productionStaffName || getStaffLabel(state.cache.productionStaff?.[issue.productionStaffId], '-') || '-';
  const meta = [
    { label: window.i18n.t('issue_type'), value: issueTypeLabel },
    { label: window.i18n.t('date_time'), value: formatDate(issue.createdAt) },
    { label: window.i18n.t('branch'), value: getLocalizedName(branches[issue.branchId]) || '-' },
    { label: window.i18n.t('storekeeper_name'), value: issue.storekeeperName || '-' },
    { label: window.i18n.t('cashiers'), value: issue.cashierName || '-' },
    { label: window.i18n.t('production_staff_single'), value: staffLabel },
    { label: window.i18n.t('invoice_number'), value: issue.invoiceNumber || '-' },
    { label: window.i18n.t('items'), value: items.length }
  ];
  const columns = [
    window.i18n.t('name'),
    window.i18n.t('quantity')
  ];
  const rows = items.map((item) => {
    const nameWithUnit = formatItemNameWithUnit(item.name, item, item.unitName);
    return [nameWithUnit, formatQuantityWithUnit(item.qty, item, item.unitName)];
  });
  const printedAt = `${window.i18n.t('printed_at')}: ${formatDate(Date.now())}`;
  const html = buildReportHtml({
    title: window.i18n.t('issue_voucher'),
    meta,
    columns,
    rows,
    footerNote: printedAt,
    docNumberLabel: window.i18n.t('issue_number'),
    docNumberValue: issue.issueNumber || '',
    tableTitle: window.i18n.t('items_table')
  });
  openPrintWindow(html);
}

function printProductionReport(record) {
  if (!record) return;
  const branches = state.cache.branches || {};
  const staffLabel = record.productionStaffName || getStaffLabel(state.cache.productionStaff?.[record.productionStaffId], '-') || '-';
  const meta = [
    { label: window.i18n.t('date_time'), value: formatDate(record.createdAt) },
    { label: window.i18n.t('branch'), value: getLocalizedName(branches[record.branchId]) || '-' },
    { label: window.i18n.t('storekeeper_name'), value: record.storekeeperName || '-' },
    { label: window.i18n.t('production_staff_single'), value: staffLabel },
    { label: window.i18n.t('linked_issue_number'), value: record.issueNumber || '-' }
  ];
  const columns = [
    window.i18n.t('name'),
    window.i18n.t('quantity'),
    window.i18n.t('production_date'),
    window.i18n.t('expiry_date')
  ];
  const itemData = record.itemType === 'product'
    ? state.cache.products?.[record.itemId]
    : state.cache.stockMaterials?.[record.itemId];
  const nameWithUnit = formatItemNameWithUnit(record.itemName || '-', record, getResolvedItemUnitName(record) || getResolvedItemUnitName(itemData));
  const rows = [[nameWithUnit, formatQuantityWithUnit(record.qty, record, getResolvedItemUnitName(record) || getResolvedItemUnitName(itemData)), record.productionDate || '-', record.expiryDate || '-']];
  const printedAt = `${window.i18n.t('printed_at')}: ${formatDate(Date.now())}`;
  const issue = state.cache.stockIssue?.[record.issueId];
  const issueItems = normalizeItems(issue?.items);
  const usedRows = issueItems.length
    ? issueItems.map((item) => [
      formatItemNameWithUnit(item.name || item.itemId || '-', item, item.unitName),
      formatQuantityWithUnit(item.qty, item, item.unitName)
    ])
    : [[window.i18n.t('no_data'), '-']];
  const html = buildReportHtml({
    title: window.i18n.t('production_voucher'),
    meta,
    columns,
    rows,
    footerNote: printedAt,
    barcodeValue: record.productionBarcode || null,
    docNumberLabel: window.i18n.t('issue_voucher_number'),
    docNumberValue: record.productionNumber || '',
    tableTitle: window.i18n.t('items_table'),
    extraTableTitle: window.i18n.t('materials_used'),
    extraColumns: [window.i18n.t('name'), window.i18n.t('quantity')],
    extraRows: usedRows
  });
  openPrintWindow(html);
}

function printInventoryReport(record) {
  if (!record) return;
  const branches = state.cache.branches || {};
  const storageLocations = state.cache.storageLocations || {};
  const items = normalizeItems(record.items);
  const meta = [
    { label: window.i18n.t('date_time'), value: formatDate(record.createdAt) },
    { label: window.i18n.t('branch'), value: getLocalizedName(branches[record.branchId]) || '-' },
    { label: window.i18n.t('storage_locations'), value: getLocalizedName(storageLocations[record.storageLocationId]) || '-' },
    { label: window.i18n.t('storekeeper_name'), value: record.storekeeperName || '-' },
    { label: window.i18n.t('items'), value: items.length }
  ];
  const columns = [
    window.i18n.t('name'),
    window.i18n.t('quantity')
  ];
  const rows = items.map((item) => {
    const nameWithUnit = formatItemNameWithUnit(item.name, item.unitId);
    return [nameWithUnit, formatNumber(item.qty)];
  });
  const printedAt = `${window.i18n.t('printed_at')}: ${formatDate(Date.now())}`;
  const html = buildReportHtml({
    title: window.i18n.t('inventory_voucher'),
    meta,
    columns,
    rows,
    footerNote: printedAt,
    docNumberLabel: window.i18n.t('count_number'),
    docNumberValue: record.countNumber || '',
    tableTitle: window.i18n.t('items_table')
  });
  openPrintWindow(html);
}

function bindDiscountForm() {
  const codeBtn = document.getElementById('discountTypeCode');
  const productBtn = document.getElementById('discountTypeProduct');
  const codeFields = document.getElementById('discountCodeFields');
  const productFields = document.getElementById('discountProductFields');
  const form = document.getElementById('discountForm');
  const cancelBtn = document.getElementById('discountCancel');
  const audienceSelect = document.getElementById('discountAudience');
  const valueTypeSelect = document.getElementById('discountValueType');
  const productSelect = document.getElementById('discountProduct');
  const batchSelect = document.getElementById('discountBatch');

  if (!form) return;

  const setType = (type) => {
    currentDiscountType = type;
    codeFields.classList.toggle('hidden', type !== 'code');
    productFields.classList.toggle('hidden', type !== 'product');
    codeBtn.classList.toggle('active', type === 'code');
    productBtn.classList.toggle('active', type === 'product');
  };

  codeBtn.addEventListener('click', () => setType('code'));
  productBtn.addEventListener('click', () => setType('product'));

  audienceSelect.innerHTML = '';
  [
    { value: 'all', labelKey: 'audience_all' },
    { value: 'vip', labelKey: 'audience_vip' },
    { value: 'vvip', labelKey: 'audience_vvip' }
  ].forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = window.i18n.t(opt.labelKey);
    audienceSelect.appendChild(option);
  });

  valueTypeSelect.innerHTML = '';
  [
    { value: 'percent', labelKey: 'discount_percent' },
    { value: 'amount', labelKey: 'discount_amount' }
  ].forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = window.i18n.t(opt.labelKey);
    valueTypeSelect.appendChild(option);
  });

  productSelect.addEventListener('change', () => {
    updateBatchOptions(productSelect.value);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitDiscountForm();
  });

  cancelBtn.addEventListener('click', () => resetDiscountForm());

  setType(currentDiscountType);
  renderDiscountProductOptions();
}

function renderDiscountProductOptions() {
  const productSelect = document.getElementById('discountProduct');
  if (!productSelect) return;
  productSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = window.i18n.t('select');
  productSelect.appendChild(placeholder);
  const products = state.cache.products || {};
  Object.entries(products).forEach(([id, product]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = getLocalizedName(product);
    productSelect.appendChild(option);
  });
  updateBatchOptions(productSelect.value);
}

function updateBatchOptions(productId) {
  const batchSelect = document.getElementById('discountBatch');
  const hint = document.getElementById('discountProductHint');
  if (!batchSelect || !hint) return;
  const batches = state.cache.production || {};
  batchSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = window.i18n.t('select');
  batchSelect.appendChild(placeholder);

  const productBatches = Object.entries(batches)
    .filter(([, batch]) => batch.productId === productId && batch.expiryDate)
    .map(([id, batch]) => ({ id, ...batch }));

  if (productId && productBatches.length === 0) {
    hint.textContent = window.i18n.t('product_not_eligible');
  } else {
    hint.textContent = '';
  }

  productBatches.forEach((batch) => {
    const option = document.createElement('option');
    option.value = batch.id;
    option.textContent = `${batch.batchCode || '-'} (${batch.expiryDate || '-'})`;
    batchSelect.appendChild(option);
  });
}

function resetDiscountForm() {
  const form = document.getElementById('discountForm');
  if (!form) return;
  form.reset();
  delete form.dataset.editId;
  delete form.dataset.editType;
  const cancelBtn = document.getElementById('discountCancel');
  cancelBtn.classList.add('hidden');
  const submitBtn = form.querySelector('[data-action="submit"]');
  submitBtn.textContent = window.i18n.t('save');
}

function submitDiscountForm() {
  const form = document.getElementById('discountForm');
  const errorEl = document.getElementById('discountError');
  if (!form) return;
  const active = document.getElementById('discountActive').checked;
  let payload = { active };

  if (currentDiscountType === 'code') {
    const code = document.getElementById('discountCode').value.trim();
    const audience = document.getElementById('discountAudience').value;
    const startDate = document.getElementById('discountStart').value;
    const endDate = document.getElementById('discountEnd').value;
    const valueType = document.getElementById('discountValueType').value;
    const value = Number(document.getElementById('discountValue').value || 0);
    if (!code || !startDate || !endDate || !valueType) {
      errorEl.textContent = window.i18n.t('error');
      return;
    }
    payload = {
      ...payload,
      type: 'code',
      code,
      audience,
      startDate,
      endDate,
      valueType,
      value,
      createdAt: serverTime
    };
  } else {
    const productId = document.getElementById('discountProduct').value;
    const batchId = document.getElementById('discountBatch').value;
    const daysBeforeExpiry = Number(document.getElementById('discountDays').value || 0);
    if (!productId || !batchId || !daysBeforeExpiry) {
      errorEl.textContent = window.i18n.t('error');
      return;
    }
    payload = {
      ...payload,
      type: 'product',
      productId,
      batchId,
      daysBeforeExpiry,
      createdAt: serverTime
    };
  }

  errorEl.textContent = '';
  const editId = form.dataset.editId;
  if (editId) {
    db.ref(`discounts/${editId}`).update(payload).then(() => {
      resetDiscountForm();
    });
  } else {
    db.ref('discounts').push(payload).then(() => {
      resetDiscountForm();
    });
  }
}

function buildDiscountOrderRows(discountId, discount, fromDate = '', toDate = '') {
  const orders = Object.entries(state.cache.orders || {}).map(([id, order]) => ({ id, ...order }));
  const byDate = orders.filter((order) => isTimestampInDateRange(order.createdAt, fromDate, toDate));

  if (discountId === MANAGER_DISCOUNT_ID || discount?.type === 'manager') {
    return byDate.filter((order) => !!order.managerDiscount);
  }

  const usageEntries = state.cache.discountUsage?.[discountId] || {};
  const usageKeys = new Set(Object.keys(usageEntries));
  const usageOrderNumbers = new Set(
    Object.values(usageEntries)
      .map((item) => String(item?.orderNumber || item?.invoiceNumber || '').trim())
      .filter(Boolean)
  );
  const usageOrderIds = new Set(
    Object.values(usageEntries)
      .map((item) => String(item?.orderId || item?.id || '').trim())
      .filter(Boolean)
  );

  return byDate.filter((order) => {
    if (usageKeys.has(order.id)) return true;
    if (usageOrderIds.has(String(order.id))) return true;
    if (usageOrderNumbers.has(String(order.orderNumber || ''))) return true;
    return false;
  });
}

function getDiscountAmountForOrder(order, discountId) {
  if (discountId === MANAGER_DISCOUNT_ID || order.managerDiscount) {
    return Number(order.discount || 0);
  }
  return Number(order.discount || 0);
}

function renderDiscounts() {
  const section = document.getElementById('section-discounts');
  if (!section) return;

  ensureManagerDiscountEntry();

  if (state.discountReport.view === 'details') {
    renderDiscountDetailsView(section);
    return;
  }

  if (state.discountReport.view === 'invoice') {
    renderDiscountInvoiceDetailsView(section);
    return;
  }

  const discounts = state.cache.discounts || {};
  const products = state.cache.products || {};
  const batches = state.cache.production || {};
  const entries = Object.entries(discounts)
    .sort((a, b) => {
      if (a[0] === MANAGER_DISCOUNT_ID) return -1;
      if (b[0] === MANAGER_DISCOUNT_ID) return 1;
      return Number(b[1]?.createdAt || 0) - Number(a[1]?.createdAt || 0);
    });

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('discounts')}</h2>
        <div class="row">
          <button id="discountTypeCode" class="btn ghost small">${window.i18n.t('discount_type_code')}</button>
          <button id="discountTypeProduct" class="btn ghost small">${window.i18n.t('discount_type_product')}</button>
        </div>
      </div>
      <form id="discountForm" class="grid two" style="margin-top: 16px;">
        <div id="discountCodeFields" class="grid two" style="grid-column: 1 / -1;">
          <div>
            <label class="tag" for="discountCode">${window.i18n.t('discount_code')}</label>
            <input id="discountCode" class="input" />
          </div>
          <div>
            <label class="tag" for="discountAudience">${window.i18n.t('audience')}</label>
            <select id="discountAudience" class="input"></select>
          </div>
          <div>
            <label class="tag" for="discountStart">${window.i18n.t('start_date')}</label>
            <input id="discountStart" class="input" type="date" />
          </div>
          <div>
            <label class="tag" for="discountEnd">${window.i18n.t('end_date')}</label>
            <input id="discountEnd" class="input" type="date" />
          </div>
          <div>
            <label class="tag" for="discountValueType">${window.i18n.t('value_type')}</label>
            <select id="discountValueType" class="input"></select>
          </div>
          <div>
            <label class="tag" for="discountValue">${window.i18n.t('discount')}</label>
            <input id="discountValue" class="input" type="number" />
          </div>
        </div>

        <div id="discountProductFields" class="grid two hidden" style="grid-column: 1 / -1;">
          <div>
            <label class="tag" for="discountTargetType">${window.i18n.t('discount_target')}</label>
            <select id="discountTargetType" class="input">
              <option value="product">${window.i18n.t('discount_target_product')}</option>
              <option value="category">${window.i18n.t('discount_target_category')}</option>
            </select>
          </div>
          <div id="discountProductTargetWrap">
            <label class="tag" for="discountProductSearch">${window.i18n.t('search_products')}</label>
            <input id="discountProductSearch" class="input" placeholder="${window.i18n.t('reports_search_product_placeholder')}" />
            <select id="discountProduct" class="input" style="margin-top: 6px;"></select>
          </div>
          <div id="discountCategoryTargetWrap" class="hidden" style="grid-column: 1 / -1;">
            <div class="grid three">
              <div>
                <label class="tag" for="discountMainCategory">${window.i18n.t('reports_main_category')}</label>
                <select id="discountMainCategory" class="input"></select>
              </div>
              <div>
                <label class="tag" for="discountSubCategory">${window.i18n.t('reports_sub_category')}</label>
                <select id="discountSubCategory" class="input"></select>
              </div>
              <div>
                <label class="tag" for="discountSubSubCategory">${window.i18n.t('sub_category_level2')}</label>
                <select id="discountSubSubCategory" class="input"></select>
              </div>
            </div>
          </div>
          <div>
            <label class="tag" for="discountProductStart">${window.i18n.t('start_date')}</label>
            <input id="discountProductStart" class="input" type="date" />
          </div>
          <div>
            <label class="tag" for="discountProductEnd">${window.i18n.t('end_date')}</label>
            <input id="discountProductEnd" class="input" type="date" />
          </div>
          <div>
            <label class="tag" for="discountProductValueType">${window.i18n.t('value_type')}</label>
            <select id="discountProductValueType" class="input"></select>
          </div>
          <div>
            <label class="tag" for="discountProductValue">${window.i18n.t('discount')}</label>
            <input id="discountProductValue" class="input" type="number" />
          </div>
          <div>
            <label class="tag" for="discountApplyTiming">${window.i18n.t('discount_apply_timing')}</label>
            <select id="discountApplyTiming" class="input">
              <option value="start_date">${window.i18n.t('discount_apply_from_start')}</option>
              <option value="before_expiry">${window.i18n.t('discount_apply_before_expiry')}</option>
            </select>
          </div>
          <div id="discountDaysWrap" class="hidden">
            <label class="tag" for="discountDays">${window.i18n.t('days_before_expiry')}</label>
            <input id="discountDays" class="input" type="number" />
          </div>
          <div class="helper" id="discountProductHint"></div>
        </div>

        <div class="row" style="grid-column: 1 / -1; justify-content: space-between;">
          <div class="row">
            <input id="discountActive" type="checkbox" />
            <label class="tag" for="discountActive">${window.i18n.t('active')}</label>
          </div>
          <div class="row">
            <button type="submit" class="btn primary" data-action="submit">${window.i18n.t('save')}</button>
            <button type="button" id="discountCancel" class="btn ghost hidden">${window.i18n.t('cancel')}</button>
          </div>
        </div>
        <p class="helper form-error" id="discountError"></p>
      </form>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('discount_type')}</th>
            <th>${window.i18n.t('status')}</th>
            <th>${window.i18n.t('usage_count')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="discountsTable"></tbody>
      </table>
    </div>
  `;

  bindDiscountForm();
  renderDiscountProductOptions();

  const table = document.getElementById('discountsTable');
  if (!table) return;
  table.innerHTML = '';
  if (!entries.length) {
    table.innerHTML = `<tr><td colspan="5">${window.i18n.t('no_data')}</td></tr>`;
    return;
  }

  entries.forEach(([id, discount]) => {
    const usageCount = buildDiscountOrderRows(id, discount).length;
    const statusLabel = discount.active ? window.i18n.t('active') : window.i18n.t('inactive');
    const isManagerDiscount = id === MANAGER_DISCOUNT_ID || discount?.type === 'manager' || discount?.locked;
    let label = '';
    if (isManagerDiscount) {
      label = window.i18n.t('manager_discount');
    } else if (discount.type === 'code') {
      label = `${window.i18n.t('discount_type_code')}: ${discount.code || '-'}`;
    } else {
      if ((discount.targetType || 'product') === 'category') {
        const categoryName = getLocalizedName(state.cache.productCategories?.[discount.categoryId]) || '-';
        label = `${window.i18n.t('discount_type_product')}: ${window.i18n.t('discount_target_category')} - ${categoryName}`;
      } else {
        const productName = getLocalizedName(products[discount.productId]) || '-';
        label = `${window.i18n.t('discount_type_product')}: ${productName}`;
      }
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><button class="btn ghost small" data-action="details">${label}</button></td>
      <td>${statusLabel}</td>
      <td>${usageCount}</td>
      <td>${formatDate(discount.createdAt)}</td>
      <td>
        ${isManagerDiscount ? '' : `<button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>`}
        <button class="btn ghost small" data-action="toggle">${discount.active ? window.i18n.t('deactivate') : window.i18n.t('activate')}</button>
        ${isManagerDiscount ? '' : `<button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>`}
      </td>
    `;

    row.querySelector('[data-action="details"]').addEventListener('click', () => {
      openDiscountUsage(id);
    });

    if (!isManagerDiscount) {
      row.querySelector('[data-action="edit"]').addEventListener('click', () => {
        populateDiscountForm(id, discount);
      });
    }

    row.querySelector('[data-action="toggle"]').addEventListener('click', () => {
      db.ref(`discounts/${id}`).update({ active: !discount.active });
    });

    if (!isManagerDiscount) {
      row.querySelector('[data-action="delete"]').addEventListener('click', () => {
        if (confirm(window.i18n.t('confirm_delete'))) {
          db.ref(`discounts/${id}`).remove();
        }
      });
    }

    table.appendChild(row);
  });
}

function populateDiscountForm(id, discount) {
  if (id === MANAGER_DISCOUNT_ID || discount?.type === 'manager' || discount?.locked) return;
  const form = document.getElementById('discountForm');
  const cancelBtn = document.getElementById('discountCancel');
  if (!form) return;
  form.dataset.editId = id;
  currentDiscountType = discount.type || 'code';
  document.getElementById('discountTypeCode').classList.toggle('active', currentDiscountType === 'code');
  document.getElementById('discountTypeProduct').classList.toggle('active', currentDiscountType === 'product');
  document.getElementById('discountCodeFields').classList.toggle('hidden', currentDiscountType !== 'code');
  document.getElementById('discountProductFields').classList.toggle('hidden', currentDiscountType !== 'product');
  document.getElementById('discountActive').checked = !!discount.active;
  cancelBtn.classList.remove('hidden');
  form.querySelector('[data-action="submit"]').textContent = window.i18n.t('update');

  if (currentDiscountType === 'code') {
    document.getElementById('discountCode').value = discount.code || '';
    document.getElementById('discountAudience').value = discount.audience || 'all';
    document.getElementById('discountStart').value = discount.startDate || '';
    document.getElementById('discountEnd').value = discount.endDate || '';
    document.getElementById('discountValueType').value = discount.valueType || 'percent';
    document.getElementById('discountValue').value = discount.value || 0;
  } else {
    document.getElementById('discountProduct').value = discount.productId || '';
    updateBatchOptions(discount.productId);
    document.getElementById('discountBatch').value = discount.batchId || '';
    document.getElementById('discountDays').value = discount.daysBeforeExpiry || '';
  }
}

function renderDiscountDetailsView(section) {
  const discountId = state.discountReport.discountId;
  const discount = state.cache.discounts?.[discountId];
  if (!discountId || !discount) {
    state.discountReport.view = 'list';
    state.discountReport.discountId = null;
    renderDiscounts();
    return;
  }

  const fromDate = state.discountReport.fromDate || '';
  const toDate = state.discountReport.toDate || '';
  const orders = buildDiscountOrderRows(discountId, discount, fromDate, toDate);
  const rows = orders.map((order) => {
    const productsAmount = Number(order.subtotal ?? order.netTotal ?? ((order.total || 0) - (order.deliveryFee || 0)));
    const deliveryFee = Number(order.deliveryFee || 0);
    const total = Number(order.total || 0);
    const discountedAmount = getDiscountAmountForOrder(order, discountId);
    const netRevenue = total - deliveryFee - calcOrderItemsCost(order);
    return {
      id: order.id,
      invoiceNumber: order.orderNumber || '-',
      branchName: getLocalizedName(state.cache.branches?.[order.branchId]) || order.branchName || '-',
      cashierName: order.cashierName || '-',
      productsAmount,
      deliveryFee,
      discountedAmount,
      total,
      netRevenue,
      createdAt: order.createdAt || 0
    };
  });

  const totals = rows.reduce((acc, row) => {
    acc.products += row.productsAmount;
    acc.delivery += row.deliveryFee;
    acc.total += row.total;
    acc.netRevenue += row.netRevenue;
    return acc;
  }, { products: 0, delivery: 0, total: 0, netRevenue: 0 });

  const discountTitle = discountId === MANAGER_DISCOUNT_ID
    ? window.i18n.t('manager_discount')
    : discount.type === 'code'
      ? `${window.i18n.t('discount_type_code')}: ${discount.code || '-'}`
      : `${window.i18n.t('discount_type_product')}: ${getLocalizedName(state.cache.products?.[discount.productId]) || '-'} (${state.cache.production?.[discount.batchId]?.batchCode || '-'})`;

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="discountDetailsBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('discounts')}</h2>
        </div>
        <div class="row">
          <button id="discountDetailsExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="discountDetailsPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <strong>${discountTitle}</strong>
      </div>
      <div class="row" style="margin-top: 12px;">
        <input id="discountDetailsFromDate" class="input" type="date" style="max-width: 180px;" value="${fromDate}" />
        <input id="discountDetailsToDate" class="input" type="date" style="max-width: 180px;" value="${toDate}" />
      </div>
      <div class="grid four" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('reports_total_products_amount')}</strong><div class="report-total-value">${formatMoney(totals.products)}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_total_delivery_amount')}</strong><div class="report-total-value">${formatMoney(totals.delivery)}</div></div>
        <div class="card light"><strong>${window.i18n.t('total_sales')}</strong><div class="report-total-value">${formatMoney(totals.total)}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_total_net_revenue')}</strong><div class="report-total-value">${formatMoney(totals.netRevenue)}</div></div>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('cashier')}</th>
            <th>${window.i18n.t('reports_products_amount')}</th>
            <th>${window.i18n.t('delivery_fee')}</th>
            <th>${window.i18n.t('discount')}</th>
            <th>${window.i18n.t('grand_total')}</th>
            <th>${window.i18n.t('date_time')}</th>
          </tr>
        </thead>
        <tbody id="discountDetailsTableBody"></tbody>
      </table>
    </div>
  `;

  const tableBody = document.getElementById('discountDetailsTableBody');
  if (tableBody) {
    if (!rows.length) {
      tableBody.innerHTML = `<tr><td colspan="8">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      tableBody.innerHTML = rows.map((row) => `
        <tr class="report-clickable-row" data-id="${row.id}">
          <td>${row.invoiceNumber}</td>
          <td>${row.branchName}</td>
          <td>${row.cashierName}</td>
          <td>${formatMoney(row.productsAmount)}</td>
          <td>${formatMoney(row.deliveryFee)}</td>
          <td>${formatMoney(row.discountedAmount)}</td>
          <td>${formatMoney(row.total)}</td>
          <td>${formatDate(row.createdAt)}</td>
        </tr>
      `).join('');
      tableBody.querySelectorAll('tr[data-id]').forEach((tr) => {
        tr.addEventListener('click', () => {
          state.discountReport.invoiceId = tr.dataset.id;
          state.discountReport.view = 'invoice';
          renderDiscounts();
        });
      });
    }
  }

  const backBtn = document.getElementById('discountDetailsBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.discountReport.view = 'list';
      state.discountReport.discountId = null;
      state.discountReport.invoiceId = null;
      renderDiscounts();
    });
  }

  const fromInput = document.getElementById('discountDetailsFromDate');
  const toInput = document.getElementById('discountDetailsToDate');
  if (fromInput) {
    fromInput.addEventListener('change', () => {
      state.discountReport.fromDate = fromInput.value || '';
      renderDiscounts();
    });
  }
  if (toInput) {
    toInput.addEventListener('change', () => {
      state.discountReport.toDate = toInput.value || '';
      renderDiscounts();
    });
  }

  const exportBtn = document.getElementById('discountDetailsExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const dataRows = rows.map((row) => ({
        [window.i18n.t('invoice_number')]: row.invoiceNumber,
        [window.i18n.t('branch')]: row.branchName,
        [window.i18n.t('cashier')]: row.cashierName,
        [window.i18n.t('reports_products_amount')]: formatMoney(row.productsAmount),
        [window.i18n.t('delivery_fee')]: formatMoney(row.deliveryFee),
        [window.i18n.t('discounted_amount')]: formatMoney(row.discountedAmount),
        [window.i18n.t('grand_total')]: formatMoney(row.total),
        [window.i18n.t('date_time')]: formatDate(row.createdAt)
      }));
      exportToExcel(dataRows, `discount-${discountId}-orders.xlsx`);
    });
  }

  const printBtn = document.getElementById('discountDetailsPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const headers = [
        window.i18n.t('invoice_number'),
        window.i18n.t('branch'),
        window.i18n.t('cashier'),
        window.i18n.t('reports_products_amount'),
        window.i18n.t('delivery_fee'),
        window.i18n.t('discounted_amount'),
        window.i18n.t('grand_total'),
        window.i18n.t('date_time')
      ];
      const bodyRows = rows.map((row) => ([
        row.invoiceNumber,
        row.branchName,
        row.cashierName,
        formatMoney(row.productsAmount),
        formatMoney(row.deliveryFee),
        formatMoney(row.discountedAmount),
        formatMoney(row.total),
        formatDate(row.createdAt)
      ]));
      printA4Report(
        window.i18n.t('discounts'),
        [
          { label: window.i18n.t('discount'), value: discountTitle },
          { label: window.i18n.t('filter_from'), value: fromDate || '-' },
          { label: window.i18n.t('filter_to'), value: toDate || '-' }
        ],
        headers,
        bodyRows,
        [
          { label: window.i18n.t('reports_total_products_amount'), value: formatMoney(totals.products) },
          { label: window.i18n.t('reports_total_delivery_amount'), value: formatMoney(totals.delivery) },
          { label: window.i18n.t('grand_total'), value: formatMoney(totals.total) },
          { label: window.i18n.t('reports_total_net_revenue'), value: formatMoney(totals.netRevenue) }
        ]
      );
    });
  }
}

function renderDiscountInvoiceDetailsView(section) {
  const orderId = state.discountReport.invoiceId;
  const order = state.cache.orders?.[orderId];
  if (!orderId || !order) {
    state.discountReport.view = 'details';
    renderDiscounts();
    return;
  }

  const items = normalizeItems(order.items);
  const rows = items.map((item) => ({
    name: item.name || item.productId || item.itemId || '-',
    qty: Number(item.qty || 0),
    price: Number(item.price || 0),
    total: Number(item.qty || 0) * Number(item.price || 0)
  }));

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="discountInvoiceBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('invoice_number')} ${order.orderNumber || '-'}</h2>
        </div>
      </div>
      <div class="grid two" style="margin-top: 12px;">
        <p><strong>${window.i18n.t('customer_name')}:</strong> ${order.customerName || '-'}</p>
        <p><strong>${window.i18n.t('customer_phone')}:</strong> ${order.customerPhone || '-'}</p>
        <p><strong>${window.i18n.t('branch')}:</strong> ${getLocalizedName(state.cache.branches?.[order.branchId]) || order.branchName || '-'}</p>
        <p><strong>${window.i18n.t('cashier')}:</strong> ${order.cashierName || '-'}</p>
        <p><strong>${window.i18n.t('reports_products_amount')}:</strong> ${formatMoney(order.subtotal ?? order.netTotal ?? ((order.total || 0) - (order.deliveryFee || 0)))}</p>
        <p><strong>${window.i18n.t('delivery_fee')}:</strong> ${formatMoney(order.deliveryFee || 0)}</p>
        <p><strong>${window.i18n.t('discount')}:</strong> ${formatMoney(order.discount || 0)}</p>
        <p><strong>${window.i18n.t('grand_total')}:</strong> ${formatMoney(order.total || 0)}</p>
        <p><strong>${window.i18n.t('date_time')}:</strong> ${formatDate(order.createdAt)}</p>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('products')}</th>
            <th>${window.i18n.t('quantity')}</th>
            <th>${window.i18n.t('price')}</th>
            <th>${window.i18n.t('total')}</th>
          </tr>
        </thead>
        <tbody>
          ${rows.length ? rows.map((row) => `
            <tr>
              <td>${row.name}</td>
              <td>${formatNumber(row.qty)}</td>
              <td>${formatMoney(row.price)}</td>
              <td>${formatMoney(row.total)}</td>
            </tr>
          `).join('') : `<tr><td colspan="4">${window.i18n.t('no_data')}</td></tr>`}
        </tbody>
      </table>
    </div>
  `;

  const backBtn = document.getElementById('discountInvoiceBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.discountReport.view = 'details';
      state.discountReport.invoiceId = null;
      renderDiscounts();
    });
  }
}

function openDiscountUsage(discountId) {
  state.discountReport.discountId = discountId;
  state.discountReport.invoiceId = null;
  state.discountReport.fromDate = '';
  state.discountReport.toDate = '';
  state.discountReport.view = 'details';
  renderDiscounts();
}

function renderOrders() {
  const table = document.getElementById('ordersTable');
  if (!table) return;
  ensurePaginationFields(state.orderFilters);
  const orders = state.cache.orders || {};
  const branches = state.cache.branches || {};
  const cashiers = state.cache.cashiers || {};
  const zones = state.cache.deliveryZones || {};
  const orderTypes = state.cache.orderTypes || {};
  const paymentMethods = state.cache.paymentMethods || {};
  const customers = state.cache.customers || {};
  const filterSelect = document.getElementById('orderBranchFilter');
  const cashierSelect = document.getElementById('orderCashierFilter');
  const orderTypeSelect = document.getElementById('orderTypeFilter');

  if (filterSelect) {
    const current = filterSelect.value || 'all';
    filterSelect.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = window.i18n.t('all_branches');
    filterSelect.appendChild(allOption);
    Object.entries(branches).forEach(([id, branch]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(branch);
      filterSelect.appendChild(option);
    });
    filterSelect.value = current;
  }

  if (cashierSelect) {
    const current = cashierSelect.value || 'all';
    cashierSelect.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = window.i18n.t('cashiers');
    cashierSelect.appendChild(allOption);
    Object.entries(cashiers).forEach(([id, cashier]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = cashier.name || cashier.code || id;
      cashierSelect.appendChild(option);
    });
    cashierSelect.value = current;
  }

  if (orderTypeSelect) {
    const current = orderTypeSelect.value || state.orderFilters.orderTypeId || 'all';
    orderTypeSelect.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = window.i18n.t('order_types');
    orderTypeSelect.appendChild(allOption);
    Object.entries(orderTypes).forEach(([id, orderType]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(orderType);
      orderTypeSelect.appendChild(option);
    });
    orderTypeSelect.value = current;
  }

  if (!Array.isArray(state.orderFilters.zoneIds)) {
    if (state.orderFilters.zoneId && state.orderFilters.zoneId !== 'all') {
      state.orderFilters.zoneIds = [state.orderFilters.zoneId];
    } else {
      state.orderFilters.zoneIds = [];
    }
  }
  renderOrderZoneFilterOptions();

  const entries = Object.entries(orders)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  const filtered = entries.filter((order) => orderMatchesFilters(order, customers));
  const pagination = paginateEntries(filtered, state.orderFilters);
  const pagedOrders = pagination.items;
  updatePaginationControls({
    infoId: 'ordersPageInfo',
    containerId: 'ordersPagination',
    filters: state.orderFilters,
    totalItems: filtered.length,
    onPageChange: (page) => {
      state.orderFilters.currentPage = page;
      renderOrders();
    }
  });
  syncPageSizeSelect('ordersPageSize', state.orderFilters);

  table.innerHTML = '';

  if (filtered.length === 0) {
    const selectAll = document.getElementById('selectAllOrders');
    if (selectAll) selectAll.checked = false;
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="14">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }

  pagedOrders.forEach((order) => {
    const row = document.createElement('tr');
    const customer = customers[order.customerId];
    const customerName = order.customerName || getLocalizedName(customer);
    const zoneName = getLocalizedName(zones[order.deliveryZoneId]);
    const orderTypeName = getLocalizedName(orderTypes[order.orderTypeId]) || order.orderTypeName || '-';
    const paymentName = getLocalizedName(paymentMethods[order.paymentMethodId]) || order.paymentMethodId || '-';
    const netTotal = order.netTotal ?? (order.total ?? 0) - (order.deliveryFee || 0);
    row.innerHTML = `
      <td><input type="checkbox" data-id="${order.id}" ${state.selectedOrders.has(order.id) ? 'checked' : ''} /></td>
      <td>${order.orderNumber || '-'}</td>
      <td><button class="btn ghost small" data-action="customer">${customerName || '-'}</button></td>
      <td>${zoneName || '-'}</td>
      <td>${order.customerPhone || customer?.phone || '-'}</td>
      <td>${formatDate(order.createdAt)}</td>
      <td>${order.cashierName || cashiers[order.cashierId]?.name || '-'}</td>
      <td>${getLocalizedName(branches[order.branchId]) || order.branchName || '-'}</td>
      <td>${orderTypeName}</td>
      <td>${formatMoney(netTotal)}</td>
      <td>${formatMoney(order.deliveryFee || 0)}</td>
      <td>${formatMoney(order.total)}</td>
      <td>${paymentName}</td>
      <td><button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button></td>
    `;
    row.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
      if (e.target.checked) {
        state.selectedOrders.add(order.id);
      } else {
        state.selectedOrders.delete(order.id);
      }
    });
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openOrderEditModal(order));
    row.querySelector('[data-action="customer"]').addEventListener('click', () => openCustomerOrders(order.customerId));
    table.appendChild(row);
  });

  const selectAll = document.getElementById('selectAllOrders');
  if (selectAll) {
    selectAll.checked = pagedOrders.length > 0 && pagedOrders.every((order) => state.selectedOrders.has(order.id));
  }
}

function orderMatchesFilters(order, customers = state.cache.customers || {}) {
  if (state.orderFilters.branchId !== 'all' && order.branchId !== state.orderFilters.branchId) {
    return false;
  }
  if (state.orderFilters.cashierId !== 'all' && order.cashierId !== state.orderFilters.cashierId) {
    return false;
  }
  const selectedZoneIds = Array.isArray(state.orderFilters.zoneIds) ? state.orderFilters.zoneIds : [];
  if (selectedZoneIds.length && !selectedZoneIds.includes(order.deliveryZoneId || '')) {
    return false;
  }
  if (state.orderFilters.orderTypeId !== 'all' && (order.orderTypeId || '') !== state.orderFilters.orderTypeId) {
    return false;
  }
  if (state.orderFilters.dateFrom) {
    const start = new Date(`${state.orderFilters.dateFrom}T00:00:00`).getTime();
    if ((order.createdAt || 0) < start) return false;
  }
  if (state.orderFilters.dateTo) {
    const end = new Date(`${state.orderFilters.dateTo}T23:59:59`).getTime();
    if ((order.createdAt || 0) > end) return false;
  }
  if (state.orderFilters.query) {
    const customerName = order.customerName || customers[order.customerId]?.nameAr || '';
    const customerPhone = order.customerPhone || customers[order.customerId]?.phone || '';
    const target = `${order.orderNumber || ''} ${order.cashierName || ''} ${order.branchName || ''} ${customerName} ${customerPhone}`.toLowerCase();
    if (!target.includes(state.orderFilters.query)) {
      return false;
    }
  }
  return true;
}

function getFilteredOrders() {
  const orders = state.cache.orders || {};
  const customers = state.cache.customers || {};
  const entries = Object.entries(orders)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  return entries.filter((order) => orderMatchesFilters(order, customers));
}

function getSelectedOrders() {
  const filtered = getFilteredOrders();
  if (state.selectedOrders.size === 0) return filtered;
  return filtered.filter((order) => state.selectedOrders.has(order.id));
}

function toggleSelectAllOrders(checked) {
  ensurePaginationFields(state.orderFilters);
  const orders = paginateEntries(getFilteredOrders(), state.orderFilters).items;
  if (checked) {
    orders.forEach((order) => state.selectedOrders.add(order.id));
  } else {
    orders.forEach((order) => state.selectedOrders.delete(order.id));
  }
  renderOrders();
}

function exportOrders() {
  const orders = getSelectedOrders();
  if (orders.length === 0) return;
  const branches = state.cache.branches || {};
  const cashiers = state.cache.cashiers || {};
  const zones = state.cache.deliveryZones || {};
  const orderTypes = state.cache.orderTypes || {};
  const paymentMethods = state.cache.paymentMethods || {};
  const customers = state.cache.customers || {};

  const rows = orders.map((order) => {
    const customer = customers[order.customerId];
    const customerName = order.customerName || getLocalizedName(customer);
    const zoneName = getLocalizedName(zones[order.deliveryZoneId]);
    const orderTypeName = getLocalizedName(orderTypes[order.orderTypeId]) || order.orderTypeName || '-';
    const paymentName = getLocalizedName(paymentMethods[order.paymentMethodId]) || order.paymentMethodId || '-';
    const netTotal = order.netTotal ?? (order.total ?? 0) - (order.deliveryFee || 0);
    return {
      [window.i18n.t('invoice_number')]: order.orderNumber || '',
      [window.i18n.t('customer_name')]: customerName || '',
      [window.i18n.t('delivery_zone')]: zoneName || '',
      [window.i18n.t('customer_phone')]: order.customerPhone || customer?.phone || '',
      [window.i18n.t('date_time')]: formatDate(order.createdAt),
      [window.i18n.t('cashier')]: order.cashierName || cashiers[order.cashierId]?.name || '',
      [window.i18n.t('branch')]: getLocalizedName(branches[order.branchId]) || order.branchName || '',
      [window.i18n.t('order_type')]: orderTypeName,
      [window.i18n.t('net_total')]: formatMoney(netTotal),
      [window.i18n.t('delivery_fee')]: formatMoney(order.deliveryFee || 0),
      [window.i18n.t('grand_total')]: formatMoney(order.total || 0),
      [window.i18n.t('payment_method')]: paymentName
    };
  });

  exportToExcel(rows, 'orders-report.xlsx');
}

function printOrders() {
  const orders = getSelectedOrders();
  if (orders.length === 0) return;
  const branches = state.cache.branches || {};
  const zones = state.cache.deliveryZones || {};
  const orderTypes = state.cache.orderTypes || {};
  const cashiers = state.cache.cashiers || {};
  const customers = state.cache.customers || {};
  const paymentMethods = state.cache.paymentMethods || {};
  const totals = orders.reduce((acc, order) => {
    const netTotal = Number(order.netTotal ?? (order.total ?? 0) - (order.deliveryFee || 0));
    acc.net += netTotal;
    acc.delivery += Number(order.deliveryFee || 0);
    acc.total += Number(order.total || 0);
    return acc;
  }, { net: 0, delivery: 0, total: 0 });

  const headers = [
    window.i18n.t('invoice_number'),
    window.i18n.t('customer_name'),
    window.i18n.t('customer_phone'),
    window.i18n.t('delivery_zone'),
    window.i18n.t('branch'),
    window.i18n.t('cashier'),
    window.i18n.t('order_type'),
    window.i18n.t('net_total'),
    window.i18n.t('delivery_fee'),
    window.i18n.t('grand_total'),
    window.i18n.t('date_time')
  ];

  const rows = orders.map((order) => {
    const customer = customers[order.customerId];
    return [
      order.orderNumber || '-',
      order.customerName || getLocalizedName(customer) || '-',
      order.customerPhone || customer?.phone || '-',
      getLocalizedName(zones[order.deliveryZoneId]) || '-',
      getLocalizedName(branches[order.branchId]) || order.branchName || '-',
      order.cashierName || cashiers[order.cashierId]?.name || '-',
      getLocalizedName(orderTypes[order.orderTypeId]) || order.orderTypeName || '-',
      formatMoney(order.netTotal ?? (order.total ?? 0) - (order.deliveryFee || 0)),
      formatMoney(order.deliveryFee || 0),
      formatMoney(order.total || 0),
      formatDate(order.createdAt)
    ];
  });

  printA4Report(
    window.i18n.t('orders'),
    [
      { label: window.i18n.t('filter_from'), value: state.orderFilters.dateFrom || '-' },
      { label: window.i18n.t('filter_to'), value: state.orderFilters.dateTo || '-' }
    ],
    headers,
    rows,
    [
      { label: window.i18n.t('net_total'), value: formatMoney(totals.net) },
      { label: window.i18n.t('delivery_fee'), value: formatMoney(totals.delivery) },
      { label: window.i18n.t('grand_total'), value: formatMoney(totals.total) }
    ]
  );
}

function openOrderEditModal(order) {
  if (!els.orderEditOverlay) return;
  state.editingOrder = {
    ...order,
    items: Array.isArray(order.items) ? order.items.map((item) => ({ ...item })) : []
  };

  const customers = state.cache.customers || {};
  const zones = state.cache.deliveryZones || {};
  const paymentMethods = state.cache.paymentMethods || {};
  const branches = state.cache.branches || {};
  const products = state.cache.products || {};

  const customerSelect = document.getElementById('orderCustomer');
  const zoneSelect = document.getElementById('orderZone');
  const paymentSelect = document.getElementById('orderPayment');
  const branchSelect = document.getElementById('orderBranch');
  const addProductSelect = document.getElementById('orderAddProduct');

  if (customerSelect) {
    customerSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = window.i18n.t('select_customer');
    customerSelect.appendChild(placeholder);
    Object.entries(customers).forEach(([id, customer]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(customer);
      customerSelect.appendChild(option);
    });
    customerSelect.value = order.customerId || '';
    customerSelect.onchange = () => {
      const selected = customers[customerSelect.value];
      if (selected) {
        document.getElementById('orderCustomerPhone').value = selected.phone || '';
        if (selected.zoneId && zoneSelect) {
          zoneSelect.value = selected.zoneId;
        }
      }
    };
  }

  if (zoneSelect) {
    zoneSelect.innerHTML = '';
    Object.entries(zones).forEach(([id, zone]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(zone);
      zoneSelect.appendChild(option);
    });
    zoneSelect.value = order.deliveryZoneId || '';
  }

  if (paymentSelect) {
    paymentSelect.innerHTML = '';
    Object.entries(paymentMethods).forEach(([id, method]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(method);
      paymentSelect.appendChild(option);
    });
    paymentSelect.value = order.paymentMethodId || '';
  }

  if (branchSelect) {
    branchSelect.innerHTML = '';
    Object.entries(branches).forEach(([id, branch]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(branch);
      branchSelect.appendChild(option);
    });
    branchSelect.value = order.branchId || '';
  }

  if (addProductSelect) {
    addProductSelect.innerHTML = '';
    Object.entries(products).forEach(([id, product]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = getLocalizedName(product);
      addProductSelect.appendChild(option);
    });
  }

  document.getElementById('orderCustomerPhone').value = order.customerPhone || '';
  document.getElementById('orderDeliveryFee').value = order.deliveryFee || 0;

  renderOrderItemsEditor();
  els.orderEditError.textContent = '';
  els.orderEditOverlay.classList.remove('hidden');
}

function renderOrderItemsEditor() {
  if (!els.orderItemsList) return;
  els.orderItemsList.innerHTML = '';
  const items = state.editingOrder?.items || [];
  items.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'card light';
    wrapper.style.padding = '12px';
    wrapper.innerHTML = `
      <strong>${item.name || item.productId || '-'}</strong>
      <div class="row" style="margin-top: 6px;">
        <label class="tag">${window.i18n.t('quantity')}</label>
        <input class="input" type="number" min="1" value="${item.qty || 1}" style="max-width: 90px;" data-field="qty" />
        <label class="tag">${window.i18n.t('price')}</label>
        <input class="input" type="number" min="0" value="${item.price || 0}" style="max-width: 110px;" data-field="price" />
        <button type="button" class="btn danger small" data-action="remove">${window.i18n.t('remove_item')}</button>
      </div>
    `;
    wrapper.querySelector('[data-field="qty"]').addEventListener('input', (e) => {
      const value = Number(e.target.value || 1);
      state.editingOrder.items[index].qty = value < 1 ? 1 : value;
    });
    wrapper.querySelector('[data-field="price"]').addEventListener('input', (e) => {
      const value = Number(e.target.value || 0);
      state.editingOrder.items[index].price = value < 0 ? 0 : value;
    });
    wrapper.querySelector('[data-action="remove"]').addEventListener('click', () => {
      state.editingOrder.items.splice(index, 1);
      renderOrderItemsEditor();
    });
    els.orderItemsList.appendChild(wrapper);
  });
}

function closeOrderEditModal() {
  if (!els.orderEditOverlay) return;
  els.orderEditOverlay.classList.add('hidden');
  state.editingOrder = null;
}

function saveOrderEdits() {
  if (!state.editingOrder) return;
  const customerId = document.getElementById('orderCustomer').value || null;
  const customerPhone = document.getElementById('orderCustomerPhone').value.trim();
  const deliveryZoneId = document.getElementById('orderZone').value || null;
  const deliveryFee = Number(document.getElementById('orderDeliveryFee').value || 0);
  const paymentMethodId = document.getElementById('orderPayment').value || null;
  const branchId = document.getElementById('orderBranch').value || null;
  const customers = state.cache.customers || {};
  const branches = state.cache.branches || {};

  const items = (state.editingOrder.items || []).filter((item) => item.qty > 0);
  if (items.length === 0) {
    els.orderEditError.textContent = window.i18n.t('empty_cart');
    return;
  }

  const subtotal = items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.qty || 0)), 0);
  const discount = Number(state.editingOrder.discount || 0);
  const netTotal = Math.max(subtotal - discount, 0);
  const total = netTotal + deliveryFee;

  const selectedCustomer = customerId ? customers[customerId] : null;
  const customerName = selectedCustomer ? getLocalizedName(selectedCustomer) : state.editingOrder.customerName || null;
  const branchName = branchId ? getLocalizedName(branches[branchId]) : state.editingOrder.branchName || null;

  const updatePayload = {
    items,
    subtotal,
    discount,
    netTotal,
    deliveryFee,
    total,
    customerId,
    customerName,
    customerPhone: customerPhone || null,
    deliveryZoneId,
    paymentMethodId,
    branchId,
    branchName
  };

  db.ref(`orders/${state.editingOrder.id}`).update(updatePayload)
    .then(() => {
      closeOrderEditModal();
    })
    .catch(() => {
      els.orderEditError.textContent = window.i18n.t('error');
    });
}

function deleteOrder() {
  if (!state.editingOrder) return;
  if (!confirm(window.i18n.t('confirm_delete'))) return;
  db.ref(`orders/${state.editingOrder.id}`).remove()
    .then(() => closeOrderEditModal())
    .catch(() => {
      els.orderEditError.textContent = window.i18n.t('error');
    });
}

function openCustomerOrders(customerId) {
  if (!els.customerOrdersOverlay) return;
  const orders = Object.entries(state.cache.orders || {})
    .map(([id, data]) => ({ id, ...data }))
    .filter((order) => order.customerId === customerId)
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  const rows = orders.map((order) => `
    <tr>
      <td>${order.orderNumber || '-'}</td>
      <td>${formatDate(order.createdAt)}</td>
      <td>${formatMoney(order.total || 0)}</td>
      <td>${order.branchName || '-'}</td>
      <td>${order.cashierName || '-'}</td>
    </tr>
  `).join('');

  els.customerOrdersList.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>${window.i18n.t('invoice_number')}</th>
          <th>${window.i18n.t('date_time')}</th>
          <th>${window.i18n.t('grand_total')}</th>
          <th>${window.i18n.t('branch')}</th>
          <th>${window.i18n.t('cashier')}</th>
        </tr>
      </thead>
      <tbody>
        ${rows || `<tr><td colspan="5">${window.i18n.t('no_data')}</td></tr>`}
      </tbody>
    </table>
  `;
  els.customerOrdersOverlay.classList.remove('hidden');
}

function openOrderDetail(order) {
  const items = order.items || [];
  const itemsHtml = items
    .map((item) => `<li>${item.name} - ${item.qty} x ${formatMoney(item.price)}</li>`)
    .join('');
  els.detailBody.innerHTML = `
    <p><strong>${window.i18n.t('order_number')}:</strong> ${order.orderNumber || '-'}</p>
    <p><strong>${window.i18n.t('branch')}:</strong> ${getLocalizedName(state.cache.branches?.[order.branchId]) || order.branchName || '-'}</p>
    <p><strong>${window.i18n.t('cashier')}:</strong> ${order.cashierName || '-'}</p>
    <p><strong>${window.i18n.t('total')}:</strong> ${formatMoney(order.total)}</p>
    <p><strong>${window.i18n.t('date')}:</strong> ${formatDate(order.createdAt)}</p>
    <ul>${itemsHtml}</ul>
  `;
  els.detailOverlay.classList.remove('hidden');
}

function getCustomerAddressList(customer) {
  if (!customer) return [];
  if (Array.isArray(customer.addresses) && customer.addresses.length) return customer.addresses;
  if (customer.zoneId || customer.address) {
    return [{ id: 'default', zoneId: customer.zoneId || '', details: customer.address || '' }];
  }
  return [];
}

function getCustomerAddressDisplay(customer, zones) {
  const addresses = getCustomerAddressList(customer);
  if (!addresses.length) return '-';
  const first = addresses[0];
  const zoneName = getLocalizedName(zones[first.zoneId]) || '-';
  const details = first.details || '-';
  const extraCount = addresses.length - 1;
  const extraText = extraCount > 0 ? ` (+${extraCount})` : '';
  return `${zoneName} - ${details}${extraText}`;
}

function ensureCustomerFiltersState() {
  if (!state.customerFilters) {
    state.customerFilters = {
      zoneId: 'all',
      zoneIds: [],
      level: 'all',
      blockedOnly: false,
      query: '',
      dateFrom: '',
      dateTo: '',
      ordersSort: 'desc',
      detailsCustomerId: null,
      favoriteProductId: null,
      showAddForm: false,
      currentPage: 1,
      pageSize: 10
    };
  }
  ensurePaginationFields(state.customerFilters);
  if (!Array.isArray(state.customerFilters.zoneIds)) {
    if (state.customerFilters.zoneId && state.customerFilters.zoneId !== 'all') {
      state.customerFilters.zoneIds = [state.customerFilters.zoneId];
    } else {
      state.customerFilters.zoneIds = [];
    }
  }
  if (!state.customerFilters.ordersSort) {
    state.customerFilters.ordersSort = 'desc';
  }
}

function getCustomerZoneFilterLabel() {
  const zones = state.cache.deliveryZones || {};
  const selectedIds = Array.isArray(state.customerFilters.zoneIds) ? state.customerFilters.zoneIds : [];
  if (!selectedIds.length) return window.i18n.t('all_zones');
  if (selectedIds.length === 1) {
    return getLocalizedName(zones[selectedIds[0]]) || window.i18n.t('all_zones');
  }
  return `${window.i18n.t('delivery_zones')} (${selectedIds.length})`;
}

function renderCustomerZoneFilterOptions() {
  const optionsWrap = document.getElementById('customerZoneFilterOptions');
  const searchInput = document.getElementById('customerZoneFilterSearch');
  const summary = document.getElementById('customerZoneFilterSummary');
  if (summary) summary.textContent = getCustomerZoneFilterLabel();
  if (!optionsWrap) return;

  const zones = state.cache.deliveryZones || {};
  const query = normalizeSearchValue(searchInput?.value || '');
  const selectedSet = new Set(Array.isArray(state.customerFilters.zoneIds) ? state.customerFilters.zoneIds : []);
  const entries = Object.entries(zones)
    .map(([id, zone]) => ({ id, name: getLocalizedName(zone) || '-' }))
    .filter((entry) => !query || normalizeSearchValue(entry.name).includes(query))
    .sort((a, b) => a.name.localeCompare(b.name));

  optionsWrap.innerHTML = '';
  if (!entries.length) {
    optionsWrap.innerHTML = `<div class="helper">${window.i18n.t('no_data')}</div>`;
    return;
  }

  entries.forEach((entry) => {
    const label = document.createElement('label');
    label.className = 'multi-select-option';
    label.innerHTML = `
      <input type="checkbox" value="${entry.id}" ${selectedSet.has(entry.id) ? 'checked' : ''} />
      <span>${entry.name}</span>
    `;
    const checkbox = label.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      const zoneIds = new Set(Array.isArray(state.customerFilters.zoneIds) ? state.customerFilters.zoneIds : []);
      if (checkbox.checked) zoneIds.add(entry.id);
      else zoneIds.delete(entry.id);
      state.customerFilters.zoneIds = Array.from(zoneIds);
      state.customerFilters.zoneId = state.customerFilters.zoneIds.length ? state.customerFilters.zoneIds[0] : 'all';
      resetPaginationPage(state.customerFilters);
      renderCustomersSection();
      const details = document.getElementById('customerZoneFilter');
      if (details) details.open = true;
    });
    optionsWrap.appendChild(label);
  });
}

function renderCustomerCreateZoneOptions() {
  const optionsWrap = document.getElementById('customerCreateZoneOptions');
  const searchInput = document.getElementById('customerCreateZoneSearch');
  const hiddenInput = document.getElementById('customerCreateZone');
  const summary = document.getElementById('customerCreateZoneSummary');
  if (!optionsWrap || !hiddenInput || !summary) return;

  const selectedId = hiddenInput.value || '';
  const zones = state.cache.deliveryZones || {};
  const selectedName = getLocalizedName(zones[selectedId]);
  summary.textContent = selectedName && selectedName !== '-' ? selectedName : window.i18n.t('select_zone');

  const query = normalizeSearchValue(searchInput?.value || '');
  const entries = Object.entries(zones)
    .map(([id, zone]) => ({ id, name: getLocalizedName(zone) || '-' }))
    .filter((entry) => !query || normalizeSearchValue(entry.name).includes(query))
    .sort((a, b) => a.name.localeCompare(b.name));

  optionsWrap.innerHTML = '';
  if (!entries.length) {
    optionsWrap.innerHTML = `<div class="helper">${window.i18n.t('no_data')}</div>`;
    return;
  }

  entries.forEach((entry) => {
    const label = document.createElement('label');
    label.className = 'multi-select-option';
    label.innerHTML = `
      <input type="radio" name="customerCreateZoneChoice" value="${entry.id}" ${selectedId === entry.id ? 'checked' : ''} />
      <span>${entry.name}</span>
    `;
    const radio = label.querySelector('input[type="radio"]');
    radio.addEventListener('change', () => {
      hiddenInput.value = entry.id;
      renderCustomerCreateZoneOptions();
      const details = document.getElementById('customerCreateZonePicker');
      if (details) details.open = false;
    });
    optionsWrap.appendChild(label);
  });
}

function getCustomerZoneIds(customer) {
  const zoneIds = new Set();
  getCustomerAddressList(customer).forEach((address) => {
    if (address?.zoneId) zoneIds.add(address.zoneId);
  });
  if (customer?.zoneId) zoneIds.add(customer.zoneId);
  return Array.from(zoneIds);
}

function openCustomerEditModal(customerId) {
  if (!customerId) return;
  const customer = state.cache.customers?.[customerId];
  const overlay = document.getElementById('customerEditOverlay');
  if (!customer || !overlay) return;

  state.customerEditDraft = {
    customerId,
    name: getLocalizedName(customer) || '',
    phone: customer.phone || '',
    addresses: getCustomerAddressList(customer).map((address) => ({
      id: address.id || `addr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      zoneId: address.zoneId || '',
      details: address.details || ''
    }))
  };

  if (!state.customerEditDraft.addresses.length) {
    state.customerEditDraft.addresses = [{
      id: `addr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      zoneId: '',
      details: ''
    }];
  }

  renderCustomerEditModal();
  overlay.classList.remove('hidden');
}

function closeCustomerEditModal() {
  state.customerEditDraft = null;
  const overlay = document.getElementById('customerEditOverlay');
  if (overlay) overlay.classList.add('hidden');
}

function renderCustomerEditModal() {
  const draft = state.customerEditDraft;
  const nameInput = document.getElementById('customerEditName');
  const phoneInput = document.getElementById('customerEditPhone');
  const addressesWrap = document.getElementById('customerEditAddresses');
  if (!draft || !nameInput || !phoneInput || !addressesWrap) return;

  nameInput.value = draft.name || '';
  phoneInput.value = draft.phone || '';

  const zones = state.cache.deliveryZones || {};
  addressesWrap.innerHTML = '';
  draft.addresses.forEach((address, index) => {
    const item = document.createElement('div');
    item.className = 'notice';
    item.innerHTML = `
      <div class="grid two">
        <div>
          <label class="tag">${window.i18n.t('delivery_zone')}</label>
          <select class="input" data-field="zoneId" data-index="${index}"></select>
        </div>
        <div>
          <label class="tag">${window.i18n.t('address_details')}</label>
          <input class="input" data-field="details" data-index="${index}" value="${address.details || ''}" />
        </div>
      </div>
      <div class="row" style="justify-content: flex-end; margin-top: 8px;">
        <button class="btn danger small" data-action="remove-address" data-index="${index}">${window.i18n.t('delete')}</button>
      </div>
    `;

    const zoneSelect = item.querySelector('[data-field="zoneId"]');
    if (zoneSelect) {
      zoneSelect.innerHTML = `<option value="">${window.i18n.t('select_zone')}</option>`;
      Object.entries(zones).forEach(([id, zone]) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = getLocalizedName(zone);
        zoneSelect.appendChild(option);
      });
      zoneSelect.value = address.zoneId || '';
      zoneSelect.addEventListener('change', () => {
        state.customerEditDraft.addresses[index].zoneId = zoneSelect.value || '';
      });
    }

    const detailsInput = item.querySelector('[data-field="details"]');
    if (detailsInput) {
      detailsInput.addEventListener('input', () => {
        state.customerEditDraft.addresses[index].details = detailsInput.value || '';
      });
    }

    const removeBtn = item.querySelector('[data-action="remove-address"]');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        state.customerEditDraft.addresses.splice(index, 1);
        renderCustomerEditModal();
      });
    }
    addressesWrap.appendChild(item);
  });
}

function addCustomerEditAddress() {
  if (!state.customerEditDraft) return;
  state.customerEditDraft.addresses.push({
    id: `addr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    zoneId: '',
    details: ''
  });
  renderCustomerEditModal();
}

function saveCustomerEditModal() {
  const draft = state.customerEditDraft;
  const errorEl = document.getElementById('customerEditError');
  if (errorEl) errorEl.textContent = '';
  if (!draft?.customerId) return;

  const name = String(document.getElementById('customerEditName')?.value || '').trim();
  const phone = String(document.getElementById('customerEditPhone')?.value || '').trim();
  if (!name || !phone) {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
    return;
  }

  const addresses = (draft.addresses || [])
    .map((address) => ({
      id: address.id || `addr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      zoneId: address.zoneId || null,
      details: String(address.details || '').trim() || null
    }))
    .filter((address) => address.zoneId || address.details);

  const payload = {
    nameAr: name,
    nameEn: name,
    phone,
    addresses,
    zoneId: addresses[0]?.zoneId || null,
    address: addresses[0]?.details || null
  };

  db.ref(`customers/${draft.customerId}`).update(payload).then(() => {
    closeCustomerEditModal();
    renderCustomersSection();
  }).catch(() => {
    if (errorEl) errorEl.textContent = window.i18n.t('error');
  });
}

function isTimestampInDateRange(timestamp, fromDate, toDate) {
  const createdAt = Number(timestamp || 0);
  if (!createdAt) return false;
  if (fromDate) {
    const start = new Date(`${fromDate}T00:00:00`).getTime();
    if (createdAt < start) return false;
  }
  if (toDate) {
    const end = new Date(`${toDate}T23:59:59`).getTime();
    if (createdAt > end) return false;
  }
  return true;
}

function buildCustomerStatsMap(orderEntries) {
  const stats = {};
  orderEntries.forEach((order) => {
    if (!order.customerId) return;
    if (!stats[order.customerId]) {
      stats[order.customerId] = { total: 0, count: 0, first: null, last: null };
    }
    const entry = stats[order.customerId];
    const createdAt = Number(order.createdAt || 0);
    entry.total += Number(order.total || 0);
    entry.count += 1;
    entry.first = entry.first === null ? createdAt : Math.min(entry.first, createdAt);
    entry.last = entry.last === null ? createdAt : Math.max(entry.last, createdAt);
  });
  return stats;
}

function deriveCustomerLevel(stat) {
  if (!stat || !stat.count) return 'regular';
  const avgValue = stat.total / stat.count;
  const avgInterval = stat.count > 1 ? (stat.last - stat.first) / (stat.count - 1) / (1000 * 60 * 60 * 24) : null;
  if (avgValue >= 20 && (avgInterval !== null && avgInterval <= 2)) return 'vvip';
  if (avgValue >= 10 && (avgInterval !== null && avgInterval <= 3)) return 'vip';
  return 'regular';
}

function getCustomerOrdersForDetails(customerId, fromDate = '', toDate = '') {
  return Object.entries(state.cache.orders || {})
    .map(([id, order]) => ({ id, ...order }))
    .filter((order) => order.customerId === customerId)
    .filter((order) => isTimestampInDateRange(order.createdAt, fromDate, toDate))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

function getOrderTypeLabelForOrder(order) {
  if (!order) return '-';
  return getLocalizedName(state.cache.orderTypes?.[order.orderTypeId]) || order.orderTypeName || '-';
}

function getOrderDeliveryAddressLabel(order) {
  if (!order) return '-';
  const zoneName = getLocalizedName(state.cache.deliveryZones?.[order.deliveryZoneId]) || '';
  const details = String(order.deliveryAddress || '').trim();
  if (zoneName && details) return `${zoneName} - ${details}`;
  if (details) return details;
  if (zoneName) return zoneName;
  return '-';
}

function getCustomerFavoriteProduct(rows) {
  const counts = {};
  rows.forEach((order) => {
    normalizeItems(order.items).forEach((item) => {
      const productId = item.productId || item.itemId || item.id || '';
      const itemId = productId || item.name;
      if (!itemId) return;
      const product = state.cache.products?.[productId];
      const name = item.name || getLocalizedName(product) || '-';
      const qty = Number(item.qty || 0);
      if (!counts[itemId]) counts[itemId] = { name, count: 0, productId: productId || null };
      counts[itemId].count += qty > 0 ? qty : 1;
    });
  });
  const top = Object.values(counts).sort((a, b) => b.count - a.count)[0];
  if (!top) return { name: '-', count: 0, text: '-', productId: null };
  return { ...top, text: `${top.name} (${Math.round(top.count)})` };
}

function openCustomerDetails(customerId) {
  state.customerFilters.detailsCustomerId = customerId;
  state.customerFilters.favoriteProductId = null;
  renderCustomersSection();
}

function printCustomerDetailsReport(customer, rows, totals) {
  const headers = [
    window.i18n.t('invoice_number'),
    window.i18n.t('branch'),
    window.i18n.t('cashier'),
    window.i18n.t('order_type'),
    window.i18n.t('customer_address'),
    window.i18n.t('reports_products_amount'),
    window.i18n.t('delivery_fee'),
    window.i18n.t('total_sales'),
    window.i18n.t('date_time')
  ];
  const bodyRows = rows.map((order) => {
    const productsAmount = Number(order.subtotal ?? order.netTotal ?? ((order.total || 0) - (order.deliveryFee || 0)));
    return [
      order.orderNumber || '-',
      getLocalizedName(state.cache.branches?.[order.branchId]) || order.branchName || '-',
      order.cashierName || '-',
      getOrderTypeLabelForOrder(order),
      getOrderDeliveryAddressLabel(order),
      formatNumber(productsAmount),
      formatMoney(order.deliveryFee || 0),
      formatMoney(order.total || 0),
      formatDate(order.createdAt)
    ];
  });
  printA4Report(
    window.i18n.t('customers'),
    [
      { label: window.i18n.t('customer_name'), value: getLocalizedName(customer) || '-' },
      { label: window.i18n.t('customer_phone'), value: customer?.phone || '-' }
    ],
    headers,
    bodyRows,
    [
      { label: window.i18n.t('reports_total_products_amount'), value: formatMoney(totals.products) },
      { label: window.i18n.t('reports_total_delivery_amount'), value: formatMoney(totals.delivery) },
      { label: window.i18n.t('total_sales'), value: formatMoney(totals.total) }
    ]
  );
}

function renderCustomerDetailsView(section, customerId) {
  const customer = state.cache.customers?.[customerId];
  if (!customer) {
    state.customerFilters.detailsCustomerId = null;
    state.customerFilters.favoriteProductId = null;
    renderCustomersSection();
    return;
  }

  const fromDate = state.customerFilters.dateFrom || '';
  const toDate = state.customerFilters.dateTo || '';
  const rows = getCustomerOrdersForDetails(customerId, fromDate, toDate);
  const favoriteProduct = getCustomerFavoriteProduct(rows);
  const totals = rows.reduce((acc, order) => {
    const productsAmount = Number(order.subtotal ?? order.netTotal ?? ((order.total || 0) - (order.deliveryFee || 0)));
    acc.products += productsAmount;
    acc.delivery += Number(order.deliveryFee || 0);
    acc.total += Number(order.total || 0);
    return acc;
  }, { products: 0, delivery: 0, total: 0 });

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="customerDetailsBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('customers')}</h2>
        </div>
        <div class="row">
          <button id="customerDetailsExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="customerDetailsPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <strong>${getLocalizedName(customer)}</strong>
        <span class="helper">${customer.phone || '-'}</span>
      </div>
      <div class="row" style="margin-top: 12px;">
        <input id="customerDateFrom" class="input" type="date" style="max-width: 180px;" value="${fromDate}" />
        <input id="customerDateTo" class="input" type="date" style="max-width: 180px;" value="${toDate}" />
      </div>
      <div class="grid three" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('reports_total_products_amount')}</strong><div class="report-total-value">${formatMoney(totals.products)}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_total_delivery_amount')}</strong><div class="report-total-value">${formatMoney(totals.delivery)}</div></div>
        <div class="card light"><strong>${window.i18n.t('total_sales')}</strong><div class="report-total-value">${formatMoney(totals.total)}</div></div>
      </div>
      <div class="card light" style="margin-top: 12px;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <div>
            <strong>${window.i18n.t('customer_favorite_product')}</strong>
            <div class="report-total-value" style="margin-top: 4px;">${favoriteProduct.text}</div>
          </div>
          <button id="customerFavoriteProductBtn" class="btn ghost" ${favoriteProduct.productId ? '' : 'disabled'}>
            ${window.i18n.t('view')}
          </button>
        </div>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('cashier')}</th>
            <th>${window.i18n.t('order_type')}</th>
            <th>${window.i18n.t('customer_address')}</th>
            <th>${window.i18n.t('reports_products_amount')}</th>
            <th>${window.i18n.t('delivery_fee')}</th>
            <th>${window.i18n.t('total_sales')}</th>
            <th>${window.i18n.t('date_time')}</th>
          </tr>
        </thead>
        <tbody id="customerDetailsTableBody"></tbody>
      </table>
    </div>
  `;

  const tableBody = document.getElementById('customerDetailsTableBody');
  if (tableBody) {
    if (!rows.length) {
      tableBody.innerHTML = `<tr><td colspan="9">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      tableBody.innerHTML = rows.map((order) => {
        const productsAmount = Number(order.subtotal ?? order.netTotal ?? ((order.total || 0) - (order.deliveryFee || 0)));
        const orderTypeName = getOrderTypeLabelForOrder(order);
        const addressLabel = getOrderDeliveryAddressLabel(order);
        return `
          <tr>
            <td>${order.orderNumber || '-'}</td>
            <td>${getLocalizedName(state.cache.branches?.[order.branchId]) || order.branchName || '-'}</td>
            <td>${order.cashierName || '-'}</td>
            <td>${orderTypeName}</td>
            <td>${addressLabel}</td>
            <td>${formatNumber(productsAmount)}</td>
            <td>${formatMoney(order.deliveryFee || 0)}</td>
            <td>${formatMoney(order.total || 0)}</td>
            <td>${formatDate(order.createdAt)}</td>
          </tr>
        `;
      }).join('');
    }
  }

  const backBtn = document.getElementById('customerDetailsBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.customerFilters.detailsCustomerId = null;
      state.customerFilters.favoriteProductId = null;
      renderCustomersSection();
    });
  }

  const favoriteBtn = document.getElementById('customerFavoriteProductBtn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', () => {
      if (!favoriteProduct.productId) return;
      state.customerFilters.favoriteProductId = favoriteProduct.productId;
      renderCustomersSection();
    });
  }

  const fromInput = document.getElementById('customerDateFrom');
  const toInput = document.getElementById('customerDateTo');
  if (fromInput) {
    fromInput.addEventListener('change', () => {
      state.customerFilters.dateFrom = fromInput.value || '';
      renderCustomersSection();
    });
  }
  if (toInput) {
    toInput.addEventListener('change', () => {
      state.customerFilters.dateTo = toInput.value || '';
      renderCustomersSection();
    });
  }

  const exportBtn = document.getElementById('customerDetailsExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const dataRows = rows.map((order) => {
        const productsAmount = Number(order.subtotal ?? order.netTotal ?? ((order.total || 0) - (order.deliveryFee || 0)));
        return {
          [window.i18n.t('invoice_number')]: order.orderNumber || '-',
          [window.i18n.t('branch')]: getLocalizedName(state.cache.branches?.[order.branchId]) || order.branchName || '-',
          [window.i18n.t('cashier')]: order.cashierName || '-',
          [window.i18n.t('order_type')]: getOrderTypeLabelForOrder(order),
          [window.i18n.t('customer_address')]: getOrderDeliveryAddressLabel(order),
          [window.i18n.t('reports_products_amount')]: formatNumber(productsAmount),
          [window.i18n.t('delivery_fee')]: formatMoney(order.deliveryFee || 0),
          [window.i18n.t('total_sales')]: formatMoney(order.total || 0),
          [window.i18n.t('date_time')]: formatDate(order.createdAt)
        };
      });
      exportToExcel(dataRows, `customer-${customerId}-orders.xlsx`);
    });
  }

  const printBtn = document.getElementById('customerDetailsPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      printCustomerDetailsReport(customer, rows, totals);
    });
  }
}

function renderCustomerFavoriteProductDetailsView(section, customerId, productId) {
  const customer = state.cache.customers?.[customerId];
  const product = state.cache.products?.[productId];
  if (!customer || !productId) {
    state.customerFilters.favoriteProductId = null;
    renderCustomersSection();
    return;
  }
  const fromDate = state.customerFilters.dateFrom || '';
  const toDate = state.customerFilters.dateTo || '';
  const orders = getCustomerOrdersForDetails(customerId, fromDate, toDate).filter((order) => {
    return normalizeItems(order.items).some((item) => String(item.productId || item.itemId || item.id || '') === String(productId));
  });
  const rows = orders.map((order) => {
    const net = Number(order.netTotal ?? order.subtotal ?? ((order.total || 0) - (order.deliveryFee || 0)));
    return {
      invoiceNumber: order.orderNumber || '-',
      customerName: getLocalizedName(customer) || '-',
      zone: getLocalizedName(state.cache.deliveryZones?.[order.deliveryZoneId]) || '-',
      customerPhone: customer.phone || order.customerPhone || '-',
      createdAt: order.createdAt,
      cashierName: order.cashierName || '-',
      branchName: getLocalizedName(state.cache.branches?.[order.branchId]) || order.branchName || '-',
      orderType: getOrderTypeLabelForOrder(order),
      netAmount: net,
      deliveryFee: Number(order.deliveryFee || 0),
      total: Number(order.total || 0),
      paymentMethod: getLocalizedName(state.cache.paymentMethods?.[order.paymentMethodId]) || order.paymentMethodName || '-'
    };
  });
  const totals = rows.reduce((acc, row) => {
    acc.net += Number(row.netAmount || 0);
    acc.delivery += Number(row.deliveryFee || 0);
    acc.total += Number(row.total || 0);
    return acc;
  }, { net: 0, delivery: 0, total: 0 });

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div class="row">
          <button id="customerFavBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('customer_favorite_product')}</h2>
        </div>
        <div class="row">
          <button id="customerFavExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="customerFavPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <strong>${getLocalizedName(customer)} - ${customer.phone || '-'}</strong>
        <span class="helper">${getLocalizedName(product) || '-'}</span>
      </div>
      <div class="grid three" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('net_total')}</strong><div class="report-total-value">${formatMoney(totals.net)}</div></div>
        <div class="card light"><strong>${window.i18n.t('delivery_fee')}</strong><div class="report-total-value">${formatMoney(totals.delivery)}</div></div>
        <div class="card light"><strong>${window.i18n.t('total_sales')}</strong><div class="report-total-value">${formatMoney(totals.total)}</div></div>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('customer_name')}</th>
            <th>${window.i18n.t('delivery_zone')}</th>
            <th>${window.i18n.t('customer_phone')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('cashier')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('order_type')}</th>
            <th>${window.i18n.t('net_total')}</th>
            <th>${window.i18n.t('delivery_fee')}</th>
            <th>${window.i18n.t('grand_total')}</th>
            <th>${window.i18n.t('payment_method')}</th>
          </tr>
        </thead>
        <tbody id="customerFavTableBody"></tbody>
      </table>
    </div>
  `;

  const body = document.getElementById('customerFavTableBody');
  if (body) {
    if (!rows.length) {
      body.innerHTML = `<tr><td colspan="12">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      body.innerHTML = rows.map((row) => `
        <tr>
          <td>${row.invoiceNumber}</td>
          <td>${row.customerName}</td>
          <td>${row.zone}</td>
          <td>${row.customerPhone}</td>
          <td>${formatDate(row.createdAt)}</td>
          <td>${row.cashierName}</td>
          <td>${row.branchName}</td>
          <td>${row.orderType}</td>
          <td>${formatMoney(row.netAmount)}</td>
          <td>${formatMoney(row.deliveryFee)}</td>
          <td>${formatMoney(row.total)}</td>
          <td>${row.paymentMethod}</td>
        </tr>
      `).join('');
    }
  }

  document.getElementById('customerFavBackBtn')?.addEventListener('click', () => {
    state.customerFilters.favoriteProductId = null;
    renderCustomersSection();
  });
  document.getElementById('customerFavExportBtn')?.addEventListener('click', () => {
    if (!rows.length) return;
    const exportRows = rows.map((row) => ({
      [window.i18n.t('invoice_number')]: row.invoiceNumber,
      [window.i18n.t('customer_name')]: row.customerName,
      [window.i18n.t('delivery_zone')]: row.zone,
      [window.i18n.t('customer_phone')]: row.customerPhone,
      [window.i18n.t('date_time')]: formatDate(row.createdAt),
      [window.i18n.t('cashier')]: row.cashierName,
      [window.i18n.t('branch')]: row.branchName,
      [window.i18n.t('order_type')]: row.orderType,
      [window.i18n.t('net_total')]: formatMoney(row.netAmount),
      [window.i18n.t('delivery_fee')]: formatMoney(row.deliveryFee),
      [window.i18n.t('grand_total')]: formatMoney(row.total),
      [window.i18n.t('payment_method')]: row.paymentMethod
    }));
    exportToExcel(exportRows, `customer-${customerId}-favorite-product.xlsx`);
  });
  document.getElementById('customerFavPrintBtn')?.addEventListener('click', () => {
    const bodyRows = rows.map((row) => ([
      row.invoiceNumber,
      row.customerName,
      row.zone,
      row.customerPhone,
      formatDate(row.createdAt),
      row.cashierName,
      row.branchName,
      row.orderType,
      formatMoney(row.netAmount),
      formatMoney(row.deliveryFee),
      formatMoney(row.total),
      row.paymentMethod
    ]));
    printA4Report(
      window.i18n.t('customer_favorite_product'),
      [
        { label: window.i18n.t('customer_name'), value: getLocalizedName(customer) || '-' },
        { label: window.i18n.t('customer_phone'), value: customer.phone || '-' },
        { label: window.i18n.t('name'), value: getLocalizedName(product) || '-' },
        { label: window.i18n.t('filter_from'), value: fromDate || '-' },
        { label: window.i18n.t('filter_to'), value: toDate || '-' }
      ],
      [
        window.i18n.t('invoice_number'),
        window.i18n.t('customer_name'),
        window.i18n.t('delivery_zone'),
        window.i18n.t('customer_phone'),
        window.i18n.t('date_time'),
        window.i18n.t('cashier'),
        window.i18n.t('branch'),
        window.i18n.t('order_type'),
        window.i18n.t('net_total'),
        window.i18n.t('delivery_fee'),
        window.i18n.t('grand_total'),
        window.i18n.t('payment_method')
      ],
      bodyRows,
      [
        { label: window.i18n.t('net_total'), value: formatMoney(totals.net) },
        { label: window.i18n.t('delivery_fee'), value: formatMoney(totals.delivery) },
        { label: window.i18n.t('grand_total'), value: formatMoney(totals.total) }
      ]
    );
  });
}

function renderCustomersSection() {
  const section = document.getElementById('section-customers');
  if (!section) return;
  ensureCustomerFiltersState();

  if (state.customerFilters.detailsCustomerId) {
    if (state.customerFilters.favoriteProductId) {
      renderCustomerFavoriteProductDetailsView(
        section,
        state.customerFilters.detailsCustomerId,
        state.customerFilters.favoriteProductId
      );
      return;
    }
    renderCustomerDetailsView(section, state.customerFilters.detailsCustomerId);
    return;
  }

  const customers = state.cache.customers || {};
  const zones = state.cache.deliveryZones || {};
  const allOrders = Object.entries(state.cache.orders || {}).map(([id, data]) => ({ id, ...data }));
  const rangeOrders = allOrders.filter((order) => isTimestampInDateRange(
    order.createdAt,
    state.customerFilters.dateFrom,
    state.customerFilters.dateTo
  ));
  const allStats = buildCustomerStatsMap(allOrders);
  const rangeStats = buildCustomerStatsMap(rangeOrders);
  const useDateRange = Boolean(state.customerFilters.dateFrom || state.customerFilters.dateTo);

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('customers')}</h2>
        <div class="row">
          <button id="addCustomerInAccountingBtn" class="btn primary small">${window.i18n.t('add_customer')}</button>
          <button id="customersDownloadBtn" class="btn ghost small">${window.i18n.t('customers_download')}</button>
          <button id="customersTemplateBtn" class="btn ghost small">${window.i18n.t('download_template')}</button>
          <button id="customersBulkBtn" class="btn ghost small">${window.i18n.t('bulk_import_customers')}</button>
          <input id="customersBulkInput" type="file" accept=".xlsx,.xls" class="hidden" />
        </div>
      </div>
      <p id="customersBulkStatus" class="helper" style="margin-top: 10px;">${state.customerImportStatusText || ''}</p>
      ${state.customerFilters.showAddForm ? `
        <div id="customerCreateFormWrap" class="card light" style="margin-top: 12px;">
          <div class="grid two">
            <div>
              <label class="tag">${window.i18n.t('customer_name')}</label>
              <input id="customerCreateName" class="input" />
            </div>
            <div>
              <label class="tag">${window.i18n.t('customer_phone')}</label>
              <input id="customerCreatePhone" class="input" />
            </div>
            <div>
              <label class="tag">${window.i18n.t('delivery_zone')}</label>
              <details id="customerCreateZonePicker" class="multi-select-filter">
                <summary id="customerCreateZoneSummary" class="input">${window.i18n.t('select_zone')}</summary>
                <div class="multi-select-panel">
                  <input id="customerCreateZoneSearch" class="input" placeholder="${window.i18n.t('search_zone')}" />
                  <div id="customerCreateZoneOptions" class="multi-select-options" style="margin-top: 8px;"></div>
                </div>
              </details>
              <input id="customerCreateZone" type="hidden" />
            </div>
            <div>
              <label class="tag">${window.i18n.t('address_details')}</label>
              <input id="customerCreateAddress" class="input" />
            </div>
            <label class="row" style="grid-column: 1 / -1; gap: 8px;">
              <input type="checkbox" id="customerCreateNameOnly" />
              <span>${window.i18n.t('name_only')}</span>
            </label>
          </div>
          <div class="row" style="margin-top: 10px;">
            <button id="customerCreateSaveBtn" class="btn primary small">${window.i18n.t('save')}</button>
            <button id="customerCreateCancelBtn" class="btn ghost small">${window.i18n.t('cancel')}</button>
          </div>
          <p id="customerCreateError" class="helper form-error"></p>
        </div>
      ` : ''}
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="customerSearch" class="input" style="max-width: 240px;" placeholder="${window.i18n.t('search_customer')}" value="${state.customerFilters.query || ''}" />
        <details id="customerZoneFilter" class="multi-select-filter" style="max-width: 240px;">
          <summary id="customerZoneFilterSummary" class="input">${window.i18n.t('all_zones')}</summary>
          <div class="multi-select-panel">
            <input id="customerZoneFilterSearch" class="input" placeholder="${window.i18n.t('search_zone')}" />
            <div class="row" style="justify-content: space-between; margin-top: 8px;">
              <button type="button" id="customerZoneSelectAll" class="btn ghost small">${window.i18n.t('select_all')}</button>
              <button type="button" id="customerZoneClear" class="btn ghost small">${window.i18n.t('cancel')}</button>
            </div>
            <div id="customerZoneFilterOptions" class="multi-select-options" style="margin-top: 8px;"></div>
          </div>
        </details>
        <select id="customerLevelFilter" class="input" style="max-width: 180px;">
          <option value="all">${window.i18n.t('all')}</option>
          <option value="regular">${window.i18n.t('level_regular')}</option>
          <option value="vip">${window.i18n.t('level_vip')}</option>
          <option value="vvip">${window.i18n.t('level_vvip')}</option>
        </select>
        <select id="customerOrdersSort" class="input" style="max-width: 220px;">
          <option value="desc">${window.i18n.t('sort_orders_desc')}</option>
          <option value="asc">${window.i18n.t('sort_orders_asc')}</option>
        </select>
        <input id="customerDateFrom" class="input" type="date" style="max-width: 180px;" value="${state.customerFilters.dateFrom || ''}" />
        <input id="customerDateTo" class="input" type="date" style="max-width: 180px;" value="${state.customerFilters.dateTo || ''}" />
        <label class="row" style="gap: 6px;">
          <input type="checkbox" id="customerBlockedOnly" ${state.customerFilters.blockedOnly ? 'checked' : ''} />
          <span>${window.i18n.t('blocked_only')}</span>
        </label>
      </div>
      <div class="row" style="justify-content: flex-end; margin-top: 12px;">
        ${buildPageSizeControlHtml('customersPageSize')}
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th><input type="checkbox" id="selectAllCustomers" /></th>
            <th>${window.i18n.t('customer_name')}</th>
            <th>${window.i18n.t('customer_phone')}</th>
            <th>${window.i18n.t('delivery_zone')}</th>
            <th>${window.i18n.t('customer_address')}</th>
            <th>${window.i18n.t('last_order')}</th>
            <th>${window.i18n.t('total_orders_label')}</th>
            <th>${window.i18n.t('avg_order_value')}</th>
            <th>${window.i18n.t('avg_order_interval')}</th>
            <th>${window.i18n.t('customer_level')}</th>
            <th>${window.i18n.t('status')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="customersTable"></tbody>
      </table>
      ${buildPaginationBarHtml('customersPageInfo', 'customersPagination')}
    </div>
    <div id="customerEditOverlay" class="overlay hidden">
      <div class="modal lg" style="text-align: start; max-height: 90vh; overflow: auto; max-width: 900px; width: 100%;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <h3>${window.i18n.t('edit')}</h3>
          <button id="customerEditCloseBtn" class="btn ghost small">×</button>
        </div>
        <div class="grid two" style="margin-top: 12px;">
          <div>
            <label class="tag">${window.i18n.t('customer_name')}</label>
            <input id="customerEditName" class="input" />
          </div>
          <div>
            <label class="tag">${window.i18n.t('customer_phone')}</label>
            <input id="customerEditPhone" class="input" />
          </div>
        </div>
        <div style="margin-top: 14px;">
          <div class="row" style="justify-content: space-between; align-items: center;">
            <h4>${window.i18n.t('address')}</h4>
            <button id="customerEditAddAddressBtn" class="btn ghost small">${window.i18n.t('add_address')}</button>
          </div>
          <div id="customerEditAddresses" class="stack" style="margin-top: 8px;"></div>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 14px;">
          <button id="customerEditCancelBtn" class="btn ghost">${window.i18n.t('cancel')}</button>
          <button id="customerEditSaveBtn" class="btn primary">${window.i18n.t('save')}</button>
        </div>
        <p id="customerEditError" class="helper form-error"></p>
      </div>
    </div>
  `;

  const zoneFilterSearch = document.getElementById('customerZoneFilterSearch');
  if (zoneFilterSearch) {
    zoneFilterSearch.value = '';
    zoneFilterSearch.addEventListener('input', () => {
      renderCustomerZoneFilterOptions();
    });
  }
  const zoneSelectAll = document.getElementById('customerZoneSelectAll');
  if (zoneSelectAll) {
    zoneSelectAll.addEventListener('click', () => {
      const zonesMap = state.cache.deliveryZones || {};
      state.customerFilters.zoneIds = Object.keys(zonesMap);
      state.customerFilters.zoneId = state.customerFilters.zoneIds[0] || 'all';
      resetPaginationPage(state.customerFilters);
      renderCustomersSection();
      const details = document.getElementById('customerZoneFilter');
      if (details) details.open = true;
    });
  }
  const zoneClear = document.getElementById('customerZoneClear');
  if (zoneClear) {
    zoneClear.addEventListener('click', () => {
      state.customerFilters.zoneIds = [];
      state.customerFilters.zoneId = 'all';
      if (zoneFilterSearch) zoneFilterSearch.value = '';
      resetPaginationPage(state.customerFilters);
      renderCustomersSection();
      const details = document.getElementById('customerZoneFilter');
      if (details) details.open = true;
    });
  }
  renderCustomerZoneFilterOptions();

  const levelFilter = document.getElementById('customerLevelFilter');
  if (levelFilter) {
    levelFilter.value = state.customerFilters.level || 'all';
    levelFilter.addEventListener('change', () => {
      state.customerFilters.level = levelFilter.value;
      resetPaginationPage(state.customerFilters);
      renderCustomersSection();
    });
  }

  const ordersSort = document.getElementById('customerOrdersSort');
  if (ordersSort) {
    ordersSort.value = state.customerFilters.ordersSort || 'desc';
    ordersSort.addEventListener('change', () => {
      state.customerFilters.ordersSort = ordersSort.value || 'desc';
      resetPaginationPage(state.customerFilters);
      renderCustomersSection();
    });
  }

  const queryInput = document.getElementById('customerSearch');
  if (queryInput) {
    bindDebouncedQueryInput(queryInput, (value) => {
      state.customerFilters.query = String(value || '').trim();
      resetPaginationPage(state.customerFilters);
      renderCustomersSection();
    });
  }

  const dateFromInput = document.getElementById('customerDateFrom');
  const dateToInput = document.getElementById('customerDateTo');
  if (dateFromInput) {
    dateFromInput.addEventListener('change', () => {
      state.customerFilters.dateFrom = dateFromInput.value || '';
      resetPaginationPage(state.customerFilters);
      renderCustomersSection();
    });
  }
  if (dateToInput) {
    dateToInput.addEventListener('change', () => {
      state.customerFilters.dateTo = dateToInput.value || '';
      resetPaginationPage(state.customerFilters);
      renderCustomersSection();
    });
  }

  const blockedOnly = document.getElementById('customerBlockedOnly');
  if (blockedOnly) {
    blockedOnly.addEventListener('change', () => {
      state.customerFilters.blockedOnly = blockedOnly.checked;
      resetPaginationPage(state.customerFilters);
      renderCustomersSection();
    });
  }

  const pageSizeSelect = document.getElementById('customersPageSize');
  if (pageSizeSelect) {
    pageSizeSelect.value = String(state.customerFilters.pageSize || 10);
    pageSizeSelect.addEventListener('change', () => {
      state.customerFilters.pageSize = Number(pageSizeSelect.value || 10);
      resetPaginationPage(state.customerFilters);
      renderCustomersSection();
    });
  }

  const selectedZoneIds = Array.isArray(state.customerFilters.zoneIds) ? state.customerFilters.zoneIds : [];

  const filteredEntries = Object.entries(customers).map(([id, customer]) => {
    const stat = useDateRange ? (rangeStats[id] || { total: 0, count: 0, first: null, last: null }) : (allStats[id] || { total: 0, count: 0, first: null, last: null });
    const avgValue = stat.count ? stat.total / stat.count : 0;
    const avgInterval = stat.count > 1 ? (stat.last - stat.first) / (stat.count - 1) / (1000 * 60 * 60 * 24) : null;
    const level = customer.level || deriveCustomerLevel(allStats[id]);
    const customerZoneIds = getCustomerZoneIds(customer);
    const zoneName = getLocalizedName(zones[customerZoneIds[0] || customer.zoneId]) || '-';
    const addressText = getCustomerAddressDisplay(customer, zones);
    return {
      id,
      customer,
      zoneName,
      addressText,
      lastOrder: stat.last,
      count: stat.count,
      avgValue,
      avgInterval,
      level
    };
  }).filter((entry) => {
    const { customer, level, zoneName, addressText, count } = entry;
    const customerZoneIds = getCustomerZoneIds(customer);
    if (selectedZoneIds.length && !customerZoneIds.some((zoneId) => selectedZoneIds.includes(zoneId))) {
      return false;
    }
    if (state.customerFilters.level !== 'all' && level !== state.customerFilters.level) {
      return false;
    }
    if (state.customerFilters.blockedOnly && !customer.isBlocked) {
      return false;
    }
    if (useDateRange && count === 0) {
      return false;
    }
    if (state.customerFilters.query) {
      const query = normalizeSearchValue(state.customerFilters.query);
      const target = normalizeSearchValue(`${getLocalizedName(customer)} ${customer.phone || ''} ${zoneName} ${addressText}`);
      if (!target.includes(query)) return false;
    }
    return true;
  }).sort((a, b) => {
    const sortDirection = state.customerFilters.ordersSort === 'asc' ? 1 : -1;
    const countDiff = (Number(b.count || 0) - Number(a.count || 0)) * sortDirection;
    if (countDiff !== 0) return countDiff;
    return Number(b.lastOrder || 0) - Number(a.lastOrder || 0);
  });
  const pagination = paginateEntries(filteredEntries, state.customerFilters);
  const pagedEntries = pagination.items;
  updatePaginationControls({
    infoId: 'customersPageInfo',
    containerId: 'customersPagination',
    filters: state.customerFilters,
    totalItems: filteredEntries.length,
    onPageChange: (page) => {
      state.customerFilters.currentPage = page;
      renderCustomersSection();
    }
  });

  const table = document.getElementById('customersTable');
  if (table) {
    table.innerHTML = '';
    if (!filteredEntries.length) {
      table.innerHTML = `<tr><td colspan="12">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      pagedEntries.forEach((entry) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><input type="checkbox" data-id="${entry.id}" ${state.selectedCustomers.has(entry.id) ? 'checked' : ''} /></td>
          <td><button class="btn ghost small" data-action="details">${getLocalizedName(entry.customer)}</button></td>
          <td>${entry.customer.phone || '-'}</td>
          <td>${entry.zoneName}</td>
          <td>${entry.addressText}</td>
          <td>${entry.lastOrder ? formatDate(entry.lastOrder) : '-'}</td>
          <td>${entry.count}</td>
          <td>${formatNumber(entry.avgValue)}</td>
          <td>${entry.avgInterval === null ? '-' : entry.avgInterval.toFixed(1)}</td>
          <td>${getCustomerLevelLabel(entry.level)}</td>
          <td>${entry.customer.isBlocked ? window.i18n.t('blocked') : window.i18n.t('active')}</td>
          <td>
            <div class="row" style="gap: 6px;">
              <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
              <button class="btn ghost small" data-action="toggle">${entry.customer.isBlocked ? window.i18n.t('unblock_customer') : window.i18n.t('block_customer')}</button>
              <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
            </div>
          </td>
        `;
        row.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
          if (e.target.checked) state.selectedCustomers.add(entry.id);
          else state.selectedCustomers.delete(entry.id);
        });
        row.querySelector('[data-action="details"]').addEventListener('click', () => openCustomerDetails(entry.id));
        row.querySelector('[data-action="edit"]').addEventListener('click', () => openCustomerEditModal(entry.id));
        row.querySelector('[data-action="toggle"]').addEventListener('click', () => {
          if (entry.customer.isBlocked) {
            db.ref(`customers/${entry.id}`).update({ isBlocked: false, blockReason: '' });
          } else {
            const reason = prompt(window.i18n.t('block_reason'));
            if (!reason) return;
            db.ref(`customers/${entry.id}`).update({ isBlocked: true, blockReason: reason });
          }
        });
        row.querySelector('[data-action="delete"]').addEventListener('click', () => {
          if (!confirm(window.i18n.t('confirm_delete'))) return;
          state.selectedCustomers.delete(entry.id);
          db.ref(`customers/${entry.id}`).remove();
        });
        table.appendChild(row);
      });
    }
  }

  const selectAll = document.getElementById('selectAllCustomers');
  if (selectAll) {
    selectAll.checked = pagedEntries.length > 0 && pagedEntries.every((entry) => state.selectedCustomers.has(entry.id));
    selectAll.addEventListener('change', (e) => {
      toggleSelectAllCustomers(e.target.checked);
    });
  }

  const downloadBtn = document.getElementById('customersDownloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => exportCustomers());
  }

  const customersTemplateBtn = document.getElementById('customersTemplateBtn');
  const customersBulkBtn = document.getElementById('customersBulkBtn');
  const customersBulkInput = document.getElementById('customersBulkInput');
  if (customersTemplateBtn) {
    customersTemplateBtn.addEventListener('click', () => downloadCustomerTemplate());
  }
  if (customersBulkBtn && customersBulkInput) {
    customersBulkBtn.addEventListener('click', () => customersBulkInput.click());
    customersBulkInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      handleBulkImportCustomersFile(file);
      e.target.value = '';
    });
  }

  const addBtn = document.getElementById('addCustomerInAccountingBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      state.customerFilters.showAddForm = !state.customerFilters.showAddForm;
      renderCustomersSection();
    });
  }

  if (state.customerFilters.showAddForm) {
    const createZoneSearch = document.getElementById('customerCreateZoneSearch');
    if (createZoneSearch) {
      createZoneSearch.value = '';
      createZoneSearch.addEventListener('input', () => renderCustomerCreateZoneOptions());
    }
    renderCustomerCreateZoneOptions();

    const saveBtn = document.getElementById('customerCreateSaveBtn');
    const cancelBtn = document.getElementById('customerCreateCancelBtn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        state.customerFilters.showAddForm = false;
        renderCustomersSection();
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const name = document.getElementById('customerCreateName')?.value.trim() || '';
        const phone = document.getElementById('customerCreatePhone')?.value.trim() || '';
        const zoneId = document.getElementById('customerCreateZone')?.value || '';
        const address = document.getElementById('customerCreateAddress')?.value.trim() || '';
        const nameOnly = document.getElementById('customerCreateNameOnly')?.checked;
        const errorEl = document.getElementById('customerCreateError');
        if (!name || !phone) {
          if (errorEl) errorEl.textContent = window.i18n.t('error');
          return;
        }
        const addressItem = !nameOnly && (zoneId || address)
          ? [{ id: `addr-${Date.now()}`, zoneId: zoneId || null, details: address || null }]
          : [];
        const payload = {
          nameAr: name,
          nameEn: name,
          phone,
          addresses: addressItem,
          zoneId: addressItem[0]?.zoneId || null,
          address: addressItem[0]?.details || null,
          createdAt: serverTime
        };
        db.ref('customers').push(payload).then(() => {
          state.customerFilters.showAddForm = false;
          renderCustomersSection();
        }).catch(() => {
          if (errorEl) errorEl.textContent = window.i18n.t('error');
        });
      });
    }
  }

  const customerEditCloseBtn = document.getElementById('customerEditCloseBtn');
  const customerEditCancelBtn = document.getElementById('customerEditCancelBtn');
  const customerEditAddAddressBtn = document.getElementById('customerEditAddAddressBtn');
  const customerEditSaveBtn = document.getElementById('customerEditSaveBtn');

  if (customerEditCloseBtn) customerEditCloseBtn.addEventListener('click', () => closeCustomerEditModal());
  if (customerEditCancelBtn) customerEditCancelBtn.addEventListener('click', () => closeCustomerEditModal());
  if (customerEditAddAddressBtn) customerEditAddAddressBtn.addEventListener('click', () => addCustomerEditAddress());
  if (customerEditSaveBtn) customerEditSaveBtn.addEventListener('click', () => saveCustomerEditModal());
}

function toggleSelectAllCustomers(checked) {
  const customers = document.querySelectorAll('#customersTable input[type="checkbox"]');
  customers.forEach((input) => {
    input.checked = checked;
    const id = input.dataset.id;
    if (checked) state.selectedCustomers.add(id);
    else state.selectedCustomers.delete(id);
  });
}

function exportCustomers() {
  ensureCustomerFiltersState();
  const customers = state.cache.customers || {};
  const zones = state.cache.deliveryZones || {};
  const allOrders = Object.entries(state.cache.orders || {}).map(([id, data]) => ({ id, ...data }));
  const useDateRange = Boolean(state.customerFilters.dateFrom || state.customerFilters.dateTo);
  const filteredOrders = allOrders.filter((order) => isTimestampInDateRange(
    order.createdAt,
    state.customerFilters.dateFrom,
    state.customerFilters.dateTo
  ));
  const allStats = buildCustomerStatsMap(allOrders);
  const rangeStats = buildCustomerStatsMap(filteredOrders);
  const selectedZoneIds = Array.isArray(state.customerFilters.zoneIds) ? state.customerFilters.zoneIds : [];

  const filtered = Object.entries(customers).map(([id, customer]) => {
    const stat = useDateRange ? (rangeStats[id] || { total: 0, count: 0, first: null, last: null }) : (allStats[id] || { total: 0, count: 0, first: null, last: null });
    const avgValue = stat.count ? stat.total / stat.count : 0;
    const avgInterval = stat.count > 1 ? (stat.last - stat.first) / (stat.count - 1) / (1000 * 60 * 60 * 24) : null;
    const customerZoneIds = getCustomerZoneIds(customer);
    const zoneName = getLocalizedName(zones[customerZoneIds[0] || customer.zoneId]) || '-';
    const addressText = getCustomerAddressDisplay(customer, zones);
    const level = customer.level || deriveCustomerLevel(allStats[id]);
    return { id, customer, stat, avgValue, avgInterval, zoneName, addressText, level };
  }).filter((entry) => {
    const customerZoneIds = getCustomerZoneIds(entry.customer);
    if (selectedZoneIds.length && !customerZoneIds.some((zoneId) => selectedZoneIds.includes(zoneId))) {
      return false;
    }
    if (state.customerFilters.level !== 'all' && entry.level !== state.customerFilters.level) {
      return false;
    }
    if (state.customerFilters.blockedOnly && !entry.customer.isBlocked) {
      return false;
    }
    if (useDateRange && entry.stat.count === 0) return false;
    if (state.customerFilters.query) {
      const query = normalizeSearchValue(state.customerFilters.query);
      const target = normalizeSearchValue(`${getLocalizedName(entry.customer)} ${entry.customer.phone || ''} ${entry.zoneName} ${entry.addressText}`);
      if (!target.includes(query)) return false;
    }
    return true;
  });

  const selected = state.selectedCustomers.size
    ? filtered.filter((entry) => state.selectedCustomers.has(entry.id))
    : filtered;

  const rows = selected.map((entry) => ({
    [window.i18n.t('customer_name')]: getLocalizedName(entry.customer),
    [window.i18n.t('customer_phone')]: entry.customer.phone || '',
    [window.i18n.t('delivery_zone')]: entry.zoneName,
    [window.i18n.t('customer_address')]: entry.addressText,
    [window.i18n.t('last_order')]: entry.stat.last ? formatDate(entry.stat.last) : '',
    [window.i18n.t('total_orders_label')]: entry.stat.count || 0,
    [window.i18n.t('avg_order_value')]: formatNumber(entry.avgValue),
    [window.i18n.t('avg_order_interval')]: entry.avgInterval === null ? '' : entry.avgInterval.toFixed(1),
    [window.i18n.t('customer_level')]: getCustomerLevelLabel(entry.level),
    [window.i18n.t('status')]: entry.customer.isBlocked ? window.i18n.t('blocked') : window.i18n.t('active')
  }));

  if (!rows.length) return;
  exportToExcel(rows, 'customers-report.xlsx');
}

function renderUnitsSection() {
  const table = document.getElementById('unitsTable');
  if (!table) return;
  const paginationState = ensureTablePaginationState('units');
  const units = state.cache.units || {};
  const products = state.cache.products || {};
  const entries = Object.entries(units);
  const pagination = paginateEntries(entries, paginationState);
  const pagedEntries = pagination.items;
  updatePaginationControls({
    infoId: 'unitsPageInfo',
    containerId: 'unitsPagination',
    filters: paginationState,
    totalItems: entries.length,
    onPageChange: (page) => {
      paginationState.currentPage = page;
      renderUnitsSection();
    }
  });
  syncPageSizeSelect('unitsPageSize', paginationState);
  table.innerHTML = '';
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="4">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }

  pagedEntries.forEach(([id, unit]) => {
    const productCount = Object.values(products).filter((product) => product.unitId === id).length;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${unit.nameAr || '-'}</td>
      <td>${unit.nameEn || '-'}</td>
      <td>${productCount}</td>
      <td>
        <button class="btn ghost small" data-action="view">${window.i18n.t('view')}</button>
        <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
        <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
      </td>
    `;
    row.querySelector('[data-action="view"]').addEventListener('click', () => {
      const list = Object.entries(products)
        .filter(([, product]) => product.unitId === id)
        .map(([, product]) => `<li>${getLocalizedName(product)}</li>`)
        .join('');
      els.detailBody.innerHTML = `
        <h4>${getLocalizedName(unit)}</h4>
        <ul>${list || `<li>${window.i18n.t('no_data')}</li>`}</ul>
      `;
      els.detailOverlay.classList.remove('hidden');
    });
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openUnitModal({ id, ...unit }));
    row.querySelector('[data-action="delete"]').addEventListener('click', () => {
      if (confirm(window.i18n.t('confirm_delete'))) {
        db.ref(`units/${id}`).remove();
      }
    });
    table.appendChild(row);
  });
}

function openUnitModal(unit = null) {
  state.editingUnitId = unit ? unit.id : null;
  if (!els.unitModal) return;
  document.getElementById('unitNameAr').value = unit?.nameAr || '';
  document.getElementById('unitNameEn').value = unit?.nameEn || '';
  els.unitError.textContent = '';
  els.unitModal.classList.remove('hidden');
}

function closeUnitModal() {
  if (!els.unitModal) return;
  els.unitModal.classList.add('hidden');
  state.editingUnitId = null;
}

function saveUnit() {
  const nameAr = document.getElementById('unitNameAr').value.trim();
  const nameEn = document.getElementById('unitNameEn').value.trim();
  if (!nameAr && !nameEn) {
    els.unitError.textContent = window.i18n.t('error');
    return;
  }

  const payload = { nameAr: nameAr || null, nameEn: nameEn || null };
  const request = state.editingUnitId
    ? db.ref(`units/${state.editingUnitId}`).update(payload)
    : db.ref('units').push({ ...payload, createdAt: serverTime });

  request.then(() => {
    closeUnitModal();
  }).catch(() => {
    els.unitError.textContent = window.i18n.t('error');
  });
}

function setupDevicesCashiersSection() {
  const section = document.getElementById('section-devicesCashiers');
  if (!section) return;
  const devicesPagination = ensureTablePaginationState('devicesCashiersDevices');
  const cashiersPagination = ensureTablePaginationState('devicesCashiersCashiers');
  section.innerHTML = `
    <div class="card" id="currentDeviceCard"></div>
    <div class="card">
      <h2>${window.i18n.t('devices_open')}</h2>
      <div class="row" style="justify-content: flex-end; margin: 12px 0;">
        ${buildPageSizeControlHtml('devicesPageSize')}
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('device_id')}</th>
            <th>${window.i18n.t('device_label')}</th>
            <th>${window.i18n.t('type')}</th>
            <th>${window.i18n.t('status')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="devicesTable"></tbody>
      </table>
      ${buildPaginationBarHtml('devicesPageInfo', 'devicesPagination')}
    </div>
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('cashiers')}</h2>
        <div class="row">
          <button id="cashiersTemplateBtn" type="button" class="btn ghost small">${window.i18n.t('download_template')}</button>
          <button id="cashiersBulkBtn" type="button" class="btn ghost small">${window.i18n.t('bulk_import_cashiers')}</button>
          <input id="cashiersBulkInput" type="file" accept=".xlsx,.xls" class="hidden" />
        </div>
      </div>
      <form id="cashierForm" class="grid two">
        <div>
          <label class="tag" for="cashierName">${window.i18n.t('cashier_name')}</label>
          <input id="cashierName" class="input" />
        </div>
        <div>
          <label class="tag" for="cashierCode">${window.i18n.t('cashier_code')}</label>
          <div class="row">
            <input id="cashierCode" class="input" />
            <button id="generateCashierCode" type="button" class="btn ghost small">${window.i18n.t('generate_code')}</button>
          </div>
        </div>
        <div class="row">
          <button type="submit" class="btn primary">${window.i18n.t('add_cashier')}</button>
        </div>
      </form>
      <p id="cashiersBulkStatus" class="helper" style="margin-top: 10px;"></p>
      <div class="row" style="justify-content: flex-end; margin-top: 12px;">
        ${buildPageSizeControlHtml('cashiersPageSize')}
      </div>
      <table class="table" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>${window.i18n.t('cashier_name')}</th>
            <th>${window.i18n.t('cashier_code')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="cashiersTable"></tbody>
      </table>
      ${buildPaginationBarHtml('cashiersPageInfo', 'cashiersPagination')}
    </div>
  `;

  const cashierForm = section.querySelector('#cashierForm');
  const cashierName = section.querySelector('#cashierName');
  const cashierCode = section.querySelector('#cashierCode');
  const generateBtn = section.querySelector('#generateCashierCode');
  const cashiersTemplateBtn = section.querySelector('#cashiersTemplateBtn');
  const cashiersBulkBtn = section.querySelector('#cashiersBulkBtn');
  const cashiersBulkInput = section.querySelector('#cashiersBulkInput');

  generateBtn.addEventListener('click', () => {
    cashierCode.value = Math.floor(1000 + Math.random() * 9000).toString();
  });

  if (cashiersTemplateBtn) {
    cashiersTemplateBtn.addEventListener('click', () => downloadCashierTemplate());
  }
  if (cashiersBulkBtn && cashiersBulkInput) {
    cashiersBulkBtn.addEventListener('click', () => cashiersBulkInput.click());
    cashiersBulkInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      handleBulkImportCashiersFile(file);
      e.target.value = '';
    });
  }

  cashierForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = cashierName.value.trim();
    const code = cashierCode.value.trim();
    if (!name || !code) return;
    const editId = cashierForm.dataset.editId;
    if (editId) {
      db.ref(`cashiers/${editId}`).update({ name, code: String(code) });
      delete cashierForm.dataset.editId;
      cashierForm.querySelector('button[type="submit"]').textContent = window.i18n.t('add_cashier');
    } else {
      db.ref('cashiers').push({ name, code: String(code), active: true });
    }
    cashierName.value = '';
    cashierCode.value = '';
  });

  section.querySelector('#devicesPageSize').addEventListener('change', (e) => {
    devicesPagination.pageSize = Number(e.target.value || 10);
    devicesPagination.currentPage = 1;
    renderDevicesCashiers();
  });
  section.querySelector('#cashiersPageSize').addEventListener('change', (e) => {
    cashiersPagination.pageSize = Number(e.target.value || 10);
    cashiersPagination.currentPage = 1;
    renderDevicesCashiers();
  });

  renderDevicesCashiers();
}

function renderDevicesCashiers() {
  const devicesTable = document.getElementById('devicesTable');
  const cashiersTable = document.getElementById('cashiersTable');
  if (!devicesTable || !cashiersTable) return;
  const devicesPagination = ensureTablePaginationState('devicesCashiersDevices');
  const cashiersPagination = ensureTablePaginationState('devicesCashiersCashiers');

  const devices = state.cache.devices || {};
  const statuses = state.cache.status || {};
  const branches = state.cache.branches || {};
  renderCurrentDeviceCard(devices, statuses, branches);

  devicesTable.innerHTML = '';
  const deviceEntries = Object.entries(devices).filter(([id, device]) => {
    const status = statuses[id];
    const isOnline = Boolean(status?.online);
    if (!isOnline && !device?.branchId) return false;
    return true;
  });
  const pagedDeviceEntries = paginateEntries(deviceEntries, devicesPagination).items;
  updatePaginationControls({
    infoId: 'devicesPageInfo',
    containerId: 'devicesPagination',
    filters: devicesPagination,
    totalItems: deviceEntries.length,
    onPageChange: (page) => {
      devicesPagination.currentPage = page;
      renderDevicesCashiers();
    }
  });
  syncPageSizeSelect('devicesPageSize', devicesPagination);
  if (deviceEntries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="6">${window.i18n.t('no_data')}</td>`;
    devicesTable.appendChild(row);
  }
  pagedDeviceEntries.forEach(([id, device]) => {
    const status = statuses[id];
    const isOnline = status?.online;
    const row = document.createElement('tr');
    const branchSelect = document.createElement('select');
    renderSelectOptions(branchSelect, { type: 'select', optionsPath: 'branches' });
    branchSelect.value = device.branchId || '';
    branchSelect.addEventListener('change', () => {
      const branchId = branchSelect.value || null;
      const branchNameAr = branchId ? branches[branchId]?.nameAr || branches[branchId]?.name : null;
      const branchNameEn = branchId ? branches[branchId]?.nameEn || branches[branchId]?.name : null;
      db.ref(`devices/${id}`).update({ branchId, branchNameAr, branchNameEn });
      if (branchId) {
        db.ref(`registeredDevices/${id}`).update({
          id,
          label: device.label || '',
          branch: branchNameAr,
          branchId,
          branchNameAr,
          branchNameEn,
          updatedAt: serverTime
        });
      } else {
        db.ref(`registeredDevices/${id}`).remove();
      }
      if (id === (state.deviceId || getDeviceId())) {
        syncCurrentDeviceBranchLocal(branchId, branchNameAr);
      }
    });

    const labelInput = document.createElement('input');
    labelInput.className = 'input';
    labelInput.value = device.label || '';
    labelInput.addEventListener('change', () => {
      db.ref(`devices/${id}`).update({ label: labelInput.value });
    });

    const unassignBtn = document.createElement('button');
    unassignBtn.className = 'btn danger small';
    unassignBtn.textContent = window.i18n.t('unassign');
    unassignBtn.addEventListener('click', () => {
      db.ref(`devices/${id}`).update({ branchId: null, branchName: null, branchNameAr: null, branchNameEn: null });
      db.ref(`registeredDevices/${id}`).remove();
      if (id === (state.deviceId || getDeviceId())) {
        syncCurrentDeviceBranchLocal('', '');
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn danger small';
    deleteBtn.textContent = window.i18n.t('delete');
    deleteBtn.addEventListener('click', () => {
      if (!confirm(window.i18n.t('confirm_delete'))) return;
      db.ref(`devices/${id}`).remove();
      db.ref(`status/${id}`).remove();
    });

    const pageLabel = device.page === 'cashier'
      ? window.i18n.t('cashier')
      : device.page === 'accounting'
        ? window.i18n.t('accounting_and_inventory')
        : '-';

    row.innerHTML = `
      <td>
        <div>${id}</div>
        <div class="helper">${id.slice(-6)}</div>
      </td>
      <td></td>
      <td>${pageLabel}</td>
      <td><span class="badge ${isOnline ? 'online' : 'offline'}">${window.i18n.t(isOnline ? 'online' : 'offline')}</span></td>
      <td></td>
      <td></td>
    `;
    row.children[1].appendChild(labelInput);
    row.children[4].appendChild(branchSelect);
    const actionWrap = document.createElement('div');
    actionWrap.className = 'row';
    actionWrap.style.gap = '6px';
    actionWrap.appendChild(unassignBtn);
    actionWrap.appendChild(deleteBtn);
    row.children[5].appendChild(actionWrap);

    devicesTable.appendChild(row);
  });

  cashiersTable.innerHTML = '';
  const cashiers = state.cache.cashiers || {};
  const entries = Object.entries(cashiers);
  const pagedCashiers = paginateEntries(entries, cashiersPagination).items;
  updatePaginationControls({
    infoId: 'cashiersPageInfo',
    containerId: 'cashiersPagination',
    filters: cashiersPagination,
    totalItems: entries.length,
    onPageChange: (page) => {
      cashiersPagination.currentPage = page;
      renderDevicesCashiers();
    }
  });
  syncPageSizeSelect('cashiersPageSize', cashiersPagination);
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="3">${window.i18n.t('no_data')}</td>`;
    cashiersTable.appendChild(row);
    return;
  }

  pagedCashiers.forEach(([id, cashier]) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cashier.name || '-'}</td>
      <td>${cashier.code || '-'}</td>
      <td>
        <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
        <button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>
      </td>
    `;

    row.querySelector('[data-action="edit"]').addEventListener('click', () => {
      const nameInput = document.getElementById('cashierName');
      const codeInput = document.getElementById('cashierCode');
      nameInput.value = cashier.name || '';
      codeInput.value = cashier.code || '';
      const form = document.getElementById('cashierForm');
      form.dataset.editId = id;
      form.querySelector('button[type="submit"]').textContent = window.i18n.t('update');
    });

    row.querySelector('[data-action="delete"]').addEventListener('click', () => {
      if (confirm(window.i18n.t('confirm_delete'))) {
        db.ref(`cashiers/${id}`).remove();
      }
    });

    cashiersTable.appendChild(row);
  });
}

function getBranchNameForDevice(device, branches = state.cache.branches || {}) {
  if (!device) return '';
  const branchId = device.branchId || '';
  const branch = branchId ? branches[branchId] : null;
  return device.branchNameAr || device.branchName || getLocalizedName(branch) || branch?.name || '';
}

function buildBranchOptionsHtml(selectedBranchId = '') {
  const branches = state.cache.branches || {};
  const options = Object.entries(branches).map(([id, branch]) => {
    const name = getLocalizedName(branch) || branch?.name || id;
    return `<option value="${escapeHtml(id)}" ${id === selectedBranchId ? 'selected' : ''}>${escapeHtml(name)}</option>`;
  }).join('');
  return `<option value="">غير مرتبط</option>${options}`;
}

function syncCurrentDeviceBranchLocal(branchId, branchName) {
  if (branchId && branchName) {
    localStorage.setItem('deviceBranchId', branchId);
    localStorage.setItem('deviceBranch', branchName);
  } else {
    localStorage.removeItem('deviceBranchId');
    localStorage.removeItem('deviceBranch');
  }
}

function getDeviceBranchPayload(branchId) {
  const branches = state.cache.branches || {};
  const branch = branchId ? branches[branchId] : null;
  const branchNameAr = branch ? (branch.nameAr || branch.name || '') : null;
  const branchNameEn = branch ? (branch.nameEn || branch.name || '') : null;
  return { branchId: branchId || null, branchNameAr, branchNameEn, branchName: branchNameAr };
}

function renderCurrentDeviceCard(devices = {}, statuses = {}, branches = {}) {
  const card = document.getElementById('currentDeviceCard');
  if (!card) return;
  const deviceId = state.deviceId || getDeviceId();
  const device = devices[deviceId] || {};
  const status = statuses[deviceId] || {};
  const branchName = getBranchNameForDevice(device, branches);
  const isLinked = Boolean(device.branchId || branchName);
  const isOnline = Boolean(status.online);
  const pageLabel = device.page === 'cashier'
    ? window.i18n.t('cashier')
    : device.page === 'accounting'
      ? window.i18n.t('accounting_and_inventory')
      : '-';

  card.innerHTML = `
    <div class="row" style="justify-content: space-between; align-items: flex-start;">
      <div>
        <h2>الجهاز الحالي</h2>
        <p class="helper">استخدم هذه البطاقة لربط هذا الجهاز مباشرة بفرع حتى يفتح الكاشير بدون رسالة الجهاز غير معرف.</p>
      </div>
      <span class="badge ${isLinked ? 'online' : 'offline'}">${isLinked ? 'مرتبط' : 'غير مرتبط'}</span>
    </div>
    <div class="grid two" style="margin-top: 14px;">
      <div>
        <label class="tag">رقم الجهاز</label>
        <div class="input" style="background:#f8fafc; overflow-wrap:anywhere;">${escapeHtml(deviceId)}</div>
      </div>
      <div>
        <label class="tag">${window.i18n.t('status')}</label>
        <div class="input" style="background:#f8fafc;">
          <span class="badge ${isOnline ? 'online' : 'offline'}">${window.i18n.t(isOnline ? 'online' : 'offline')}</span>
          <span class="helper" style="margin-inline-start: 8px;">${pageLabel}</span>
        </div>
      </div>
      <div>
        <label class="tag">الفرع الحالي</label>
        <div class="input" style="background:#f8fafc;">${escapeHtml(branchName || 'غير مرتبط')}</div>
      </div>
      <div>
        <label class="tag" for="currentDeviceBranchSelect">ربط الجهاز الحالي بفرع</label>
        <select id="currentDeviceBranchSelect" class="input">${buildBranchOptionsHtml(device.branchId || localStorage.getItem('deviceBranchId') || '')}</select>
      </div>
    </div>
    <div class="row" style="margin-top: 14px;">
      <button id="saveCurrentDeviceBranchBtn" type="button" class="btn primary">حفظ ربط الجهاز الحالي</button>
      <button id="clearCurrentDeviceBranchBtn" type="button" class="btn danger">إلغاء ربط الجهاز الحالي</button>
    </div>
  `;

  card.querySelector('#saveCurrentDeviceBranchBtn')?.addEventListener('click', async () => {
    const branchId = card.querySelector('#currentDeviceBranchSelect')?.value || '';
    if (!branchId) {
      alert('اختر الفرع أولاً');
      return;
    }
    const payload = getDeviceBranchPayload(branchId);
    const label = localStorage.getItem('deviceLabel') || `ADM-${deviceId.slice(-4)}`;
    await db.ref(`devices/${deviceId}`).update({
      label,
      deviceId,
      page: 'accounting',
      lastSeen: serverTime,
      ...payload
    });
    await db.ref(`registeredDevices/${deviceId}`).update({
      id: deviceId,
      label,
      branch: payload.branchNameAr,
      branchId,
      branchNameAr: payload.branchNameAr,
      branchNameEn: payload.branchNameEn,
      updatedAt: serverTime
    });
    syncCurrentDeviceBranchLocal(branchId, payload.branchNameAr);
  });

  card.querySelector('#clearCurrentDeviceBranchBtn')?.addEventListener('click', async () => {
    syncCurrentDeviceBranchLocal('', '');
    await db.ref(`devices/${deviceId}`).update({ branchId: null, branchName: null, branchNameAr: null, branchNameEn: null });
    await db.ref(`registeredDevices/${deviceId}`).remove();
  });
}

function ensureTablesFiltersState() {
  if (!state.tablesFilters) {
    state.tablesFilters = {
      fromDate: '',
      toDate: '',
      branchId: 'all',
      tableQuery: '',
      sortOrders: 'desc',
      sortRevenue: 'desc',
      detailsKey: '',
      detailsCashierId: 'all',
      detailsQuery: '',
      currentPage: 1,
      pageSize: 10
    };
    return;
  }
  ensurePaginationFields(state.tablesFilters);
  if (!Object.prototype.hasOwnProperty.call(state.tablesFilters, 'detailsKey')) {
    state.tablesFilters.detailsKey = '';
  }
  if (!Object.prototype.hasOwnProperty.call(state.tablesFilters, 'detailsCashierId')) {
    state.tablesFilters.detailsCashierId = 'all';
  }
  if (!Object.prototype.hasOwnProperty.call(state.tablesFilters, 'detailsQuery')) {
    state.tablesFilters.detailsQuery = '';
  }
}

function getConfiguredTables() {
  const tables = state.cache.tables || {};
  const entries = Object.entries(tables)
    .map(([id, table]) => ({
      id,
      tableNumber: String(table.tableNumber || table.number || '').trim(),
      branchId: table.branchId || '',
      location: table.location || ''
    }))
    .filter((entry) => entry.tableNumber && entry.branchId);

  if (entries.length) return entries;

  const fallback = [];
  const branches = state.cache.branches || {};
  Object.entries(branches).forEach(([branchId, branch]) => {
    const configured = Number(branch.tableCount || branch.tablesCount || branch.tables || 0);
    const count = Number.isFinite(configured) && configured > 0 ? configured : 0;
    for (let index = 1; index <= count; index += 1) {
      fallback.push({
        id: `virtual-${branchId}-${index}`,
        tableNumber: String(index),
        branchId,
        location: '',
        isVirtual: true
      });
    }
  });
  return fallback;
}

function buildTableStatsMap(fromDate, toDate) {
  const map = {};
  Object.values(state.cache.orders || {}).forEach((order) => {
    const tableNumber = String(order.tableNumber || '').trim();
    const branchId = String(order.branchId || '').trim();
    if (!tableNumber || !branchId) return;
    if (!isTimestampInOptionalRange(order.createdAt, fromDate, toDate)) return;
    const key = `${branchId}:${tableNumber}`;
    if (!map[key]) {
      map[key] = { ordersCount: 0, revenue: 0 };
    }
    map[key].ordersCount += 1;
    map[key].revenue += Number(order.total || 0);
  });
  return map;
}

function getTableOrders(branchId, tableNumber, fromDate, toDate) {
  const orderTypes = state.cache.orderTypes || {};
  const paymentMethods = state.cache.paymentMethods || {};
  return Object.entries(state.cache.orders || {})
    .map(([id, order]) => ({ id, ...order }))
    .filter((order) => String(order.branchId || '') === String(branchId || ''))
    .filter((order) => String(order.tableNumber || '') === String(tableNumber || ''))
    .filter((order) => isTimestampInOptionalRange(order.createdAt, fromDate, toDate))
    .map((order) => {
      const productsAmount = Number(order.subtotal ?? order.netTotal ?? ((order.total || 0) - (order.deliveryFee || 0)));
      const deliveryFee = Number(order.deliveryFee || 0);
      const total = Number(order.total || 0);
      const openedAt = Number(order.tableOpenedAt || order.createdAt || 0);
      const closedAt = Number(order.tableClosedAt || order.createdAt || 0);
      return {
        id: order.id,
        invoiceNumber: order.orderNumber || order.invoiceNumber || order.id || '-',
        customerName: order.customerName || '-',
        customerPhone: order.customerPhone || '-',
        branchName: getBranchLabel(order.branchId || branchId),
        cashierId: order.cashierId || '',
        cashierName: order.cashierName || '-',
        productsAmount,
        orderType: getLocalizedName(orderTypes[order.orderTypeId]) || order.orderTypeName || '-',
        deliveryFee,
        total,
        paymentMethod: getLocalizedName(paymentMethods[order.paymentMethodId]) || order.paymentMethodName || '-',
        tableSession: formatTableOpenClosePeriod(openedAt, closedAt),
        createdAt: order.createdAt || 0
      };
    })
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

function formatTableOpenClosePeriod(openedAt, closedAt) {
  const start = Number(openedAt || 0);
  const end = Number(closedAt || 0);
  if (!start || !end) return '-';
  const diff = Math.max(end - start, 0);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const duration = hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
  return `${formatDate(start)} → ${formatDate(end)} (${duration})`;
}

function renderTableOrdersDetailsView(section, filters) {
  const [branchId = '', tableNumber = ''] = String(filters.detailsKey || '').split(':');
  if (!branchId || !tableNumber) {
    state.tablesFilters.detailsKey = '';
    renderTablesSection();
    return;
  }
  const allRows = getTableOrders(branchId, tableNumber, filters.fromDate, filters.toDate);
  const cashiers = new Map();
  allRows.forEach((row) => {
    if (row.cashierId) cashiers.set(row.cashierId, row.cashierName || '-');
  });
  const query = normalizeSearchValue(filters.detailsQuery || '');
  const cashierId = filters.detailsCashierId || 'all';
  const rows = allRows
    .filter((row) => (cashierId === 'all' ? true : row.cashierId === cashierId))
    .filter((row) => {
      if (!query) return true;
      const text = normalizeSearchValue(`${row.invoiceNumber} ${row.customerName} ${row.customerPhone} ${row.cashierName}`);
      return text.includes(query);
    });
  const totals = rows.reduce((acc, row) => {
    acc.products += Number(row.productsAmount || 0);
    acc.delivery += Number(row.deliveryFee || 0);
    acc.total += Number(row.total || 0);
    return acc;
  }, { products: 0, delivery: 0, total: 0 });

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <div class="row">
          <button id="tableDetailsBackBtn" class="btn ghost">${window.i18n.t('back')}</button>
          <h2>${window.i18n.t('tables')} #${tableNumber}</h2>
        </div>
        <div class="row">
          <button id="tableDetailsExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="tableDetailsPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="tableDetailsSearch" class="input" style="max-width: 360px;" placeholder="${window.i18n.t('reports_search_top_product_details_placeholder')}" value="${filters.detailsQuery || ''}" />
        <select id="tableDetailsCashierFilter" class="input" style="max-width: 220px;"></select>
      </div>
      <div class="grid three" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('reports_total_products_amount')}</strong><div class="report-total-value">${formatMoney(totals.products)}</div></div>
        <div class="card light"><strong>${window.i18n.t('reports_total_delivery_amount')}</strong><div class="report-total-value">${formatMoney(totals.delivery)}</div></div>
        <div class="card light"><strong>${window.i18n.t('total_sales')}</strong><div class="report-total-value">${formatMoney(totals.total)}</div></div>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('invoice_number')}</th>
            <th>${window.i18n.t('customer_name')}</th>
            <th>${window.i18n.t('customer_phone')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('cashier')}</th>
            <th>${window.i18n.t('reports_products_amount')}</th>
            <th>${window.i18n.t('order_type')}</th>
            <th>${window.i18n.t('delivery_fee')}</th>
            <th>${window.i18n.t('grand_total')}</th>
            <th>${window.i18n.t('payment_method')}</th>
            <th>${window.i18n.t('date_time')}</th>
            <th>${window.i18n.t('table_open_close_period')}</th>
          </tr>
        </thead>
        <tbody id="tableDetailsBody"></tbody>
      </table>
    </div>
  `;

  const backBtn = document.getElementById('tableDetailsBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.tablesFilters.detailsKey = '';
      state.tablesFilters.detailsCashierId = 'all';
      state.tablesFilters.detailsQuery = '';
      renderTablesSection();
    });
  }

  const searchInput = document.getElementById('tableDetailsSearch');
  if (searchInput) {
    bindDebouncedQueryInput(searchInput, (value) => {
      state.tablesFilters.detailsQuery = String(value || '');
      renderTablesSection();
    });
  }

  const cashierSelect = document.getElementById('tableDetailsCashierFilter');
  if (cashierSelect) {
    cashierSelect.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = window.i18n.t('all');
    cashierSelect.appendChild(allOption);
    Array.from(cashiers.entries())
      .sort((a, b) => String(a[1] || '').localeCompare(String(b[1] || '')))
      .forEach(([id, name]) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = name || '-';
        cashierSelect.appendChild(option);
      });
    cashierSelect.value = state.tablesFilters.detailsCashierId || 'all';
    cashierSelect.addEventListener('change', () => {
      state.tablesFilters.detailsCashierId = cashierSelect.value || 'all';
      renderTablesSection();
    });
  }

  const tbody = document.getElementById('tableDetailsBody');
  if (tbody) {
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="12">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      tbody.innerHTML = rows.map((row) => `
        <tr>
          <td>${row.invoiceNumber}</td>
          <td>${row.customerName}</td>
          <td>${row.customerPhone}</td>
          <td>${row.branchName}</td>
          <td>${row.cashierName}</td>
          <td>${formatMoney(row.productsAmount)}</td>
          <td>${row.orderType}</td>
          <td>${formatMoney(row.deliveryFee)}</td>
          <td>${formatMoney(row.total)}</td>
          <td>${row.paymentMethod}</td>
          <td>${formatDate(row.createdAt)}</td>
          <td>${row.tableSession}</td>
        </tr>
      `).join('');
    }
  }

  const exportBtn = document.getElementById('tableDetailsExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const exportRows = rows.map((row) => ({
        [window.i18n.t('invoice_number')]: row.invoiceNumber,
        [window.i18n.t('customer_name')]: row.customerName,
        [window.i18n.t('customer_phone')]: row.customerPhone,
        [window.i18n.t('branch')]: row.branchName,
        [window.i18n.t('cashier')]: row.cashierName,
        [window.i18n.t('reports_products_amount')]: formatMoney(row.productsAmount),
        [window.i18n.t('order_type')]: row.orderType,
        [window.i18n.t('delivery_fee')]: formatMoney(row.deliveryFee),
        [window.i18n.t('grand_total')]: formatMoney(row.total),
        [window.i18n.t('payment_method')]: row.paymentMethod,
        [window.i18n.t('date_time')]: formatDate(row.createdAt),
        [window.i18n.t('table_open_close_period')]: row.tableSession
      }));
      exportToExcel(exportRows, `table-${tableNumber}-orders.xlsx`);
    });
  }

  const printBtn = document.getElementById('tableDetailsPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const headers = [
        window.i18n.t('invoice_number'),
        window.i18n.t('customer_name'),
        window.i18n.t('customer_phone'),
        window.i18n.t('branch'),
        window.i18n.t('cashier'),
        window.i18n.t('reports_products_amount'),
        window.i18n.t('order_type'),
        window.i18n.t('delivery_fee'),
        window.i18n.t('grand_total'),
        window.i18n.t('payment_method'),
        window.i18n.t('date_time'),
        window.i18n.t('table_open_close_period')
      ];
      const bodyRows = rows.map((row) => [
        row.invoiceNumber,
        row.customerName,
        row.customerPhone,
        row.branchName,
        row.cashierName,
        formatMoney(row.productsAmount),
        row.orderType,
        formatMoney(row.deliveryFee),
        formatMoney(row.total),
        row.paymentMethod,
        formatDate(row.createdAt),
        row.tableSession
      ]);
      printA4Report(
        `${window.i18n.t('tables')} #${tableNumber}`,
        [
          { label: window.i18n.t('branch'), value: getBranchLabel(branchId) },
          { label: window.i18n.t('filter_from'), value: filters.fromDate || '-' },
          { label: window.i18n.t('filter_to'), value: filters.toDate || '-' }
        ],
        headers,
        bodyRows,
        [
          { label: window.i18n.t('reports_total_products_amount'), value: formatMoney(totals.products) },
          { label: window.i18n.t('reports_total_delivery_amount'), value: formatMoney(totals.delivery) },
          { label: window.i18n.t('grand_total'), value: formatMoney(totals.total) }
        ]
      );
    });
  }
}

function setupTablesSection() {
  const section = document.getElementById('section-tables');
  if (!section) return;
  ensureTablesFiltersState();
  renderTablesSection();
}

function renderTablesSection() {
  const section = document.getElementById('section-tables');
  if (!section) return;
  ensureTablesFiltersState();
  const filters = state.tablesFilters;
  if (filters.detailsKey) {
    renderTableOrdersDetailsView(section, filters);
    return;
  }
  const branches = state.cache.branches || {};
  const tableEntries = getConfiguredTables();
  const statsMap = buildTableStatsMap(filters.fromDate, filters.toDate);

  let rows = tableEntries.map((entry) => {
    const statKey = `${entry.branchId}:${entry.tableNumber}`;
    const stats = statsMap[statKey] || { ordersCount: 0, revenue: 0 };
    return {
      ...entry,
      branchName: getLocalizedName(branches[entry.branchId]) || '-',
      ordersCount: stats.ordersCount,
      revenue: stats.revenue
    };
  });

  if (filters.branchId !== 'all') {
    rows = rows.filter((row) => String(row.branchId || '') === String(filters.branchId || ''));
  }
  if (filters.tableQuery) {
    const query = normalizeSearchValue(filters.tableQuery);
    rows = rows.filter((row) => normalizeSearchValue(`${row.tableNumber} ${row.branchName} ${row.location || ''}`).includes(query));
  }

  rows.sort((a, b) => {
    const orderDiff = Number(a.ordersCount || 0) - Number(b.ordersCount || 0);
    if (orderDiff !== 0) return filters.sortOrders === 'asc' ? orderDiff : -orderDiff;
    const revenueDiff = Number(a.revenue || 0) - Number(b.revenue || 0);
    if (revenueDiff !== 0) return filters.sortRevenue === 'asc' ? revenueDiff : -revenueDiff;
    return String(a.tableNumber || '').localeCompare(String(b.tableNumber || ''), undefined, { numeric: true });
  });

  const totals = rows.reduce((acc, row) => {
    acc.orders += Number(row.ordersCount || 0);
    acc.revenue += Number(row.revenue || 0);
    return acc;
  }, { orders: 0, revenue: 0 });

  section.innerHTML = `
    <div class="card">
      <div class="row" style="justify-content: space-between;">
        <h2>${window.i18n.t('tables')}</h2>
        <div class="row">
          <button id="tablesExportBtn" class="btn ghost">${window.i18n.t('download')}</button>
          <button id="tablesPrintBtn" class="btn ghost">${window.i18n.t('print_report')}</button>
        </div>
      </div>
      <div class="row" style="margin-top: 12px; flex-wrap: wrap;">
        <input id="tablesDateFrom" class="input" type="date" style="max-width: 180px;" value="${filters.fromDate || ''}" />
        <input id="tablesDateTo" class="input" type="date" style="max-width: 180px;" value="${filters.toDate || ''}" />
        <select id="tablesBranchFilter" class="input" style="max-width: 220px;"></select>
        <input id="tablesNumberFilter" class="input" style="max-width: 240px;" placeholder="${window.i18n.t('table_number')}" value="${filters.tableQuery || ''}" />
        <select id="tablesSortOrders" class="input" style="max-width: 220px;">
          <option value="desc">${window.i18n.t('sort_orders_desc')}</option>
          <option value="asc">${window.i18n.t('sort_orders_asc')}</option>
        </select>
        <select id="tablesSortRevenue" class="input" style="max-width: 240px;">
          <option value="desc">${window.i18n.t('sort_revenue_desc')}</option>
          <option value="asc">${window.i18n.t('sort_revenue_asc')}</option>
        </select>
      </div>
      <div class="row" style="justify-content: flex-end; margin-top: 12px;">
        ${buildPageSizeControlHtml('tablesPageSize')}
      </div>
      <div class="grid two" style="margin-top: 12px;">
        <div class="card light"><strong>${window.i18n.t('total_orders_label')}</strong><div class="report-total-value">${totals.orders}</div></div>
        <div class="card light"><strong>${window.i18n.t('table_revenue')}</strong><div class="report-total-value">${formatMoney(totals.revenue)}</div></div>
      </div>
      <div class="card light" style="margin-top: 12px;">
        <div class="row" style="justify-content: space-between; align-items: center;">
          <strong>${state.editingTableId ? window.i18n.t('edit') : window.i18n.t('add')}</strong>
        </div>
        <div class="row" style="margin-top: 8px; flex-wrap: wrap;">
          <input id="tableNumberInput" class="input" style="max-width: 180px;" placeholder="${window.i18n.t('table_number')}" />
          <select id="tableBranchInput" class="input" style="max-width: 220px;"></select>
          <input id="tableLocationInput" class="input" style="max-width: 260px;" placeholder="${window.i18n.t('table_location')}" />
          <button id="tableSaveBtn" class="btn primary">${window.i18n.t('save')}</button>
          <button id="tableCancelEditBtn" class="btn ghost ${state.editingTableId ? '' : 'hidden'}">${window.i18n.t('cancel')}</button>
        </div>
        <p id="tableFormError" class="helper form-error"></p>
      </div>
    </div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('table_number')}</th>
            <th>${window.i18n.t('branch')}</th>
            <th>${window.i18n.t('table_location')}</th>
            <th>${window.i18n.t('total_orders_label')}</th>
            <th>${window.i18n.t('table_revenue')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="tablesTableBody"></tbody>
      </table>
      ${buildPaginationBarHtml('tablesPageInfo', 'tablesPagination')}
    </div>
  `;

  const branchFilter = document.getElementById('tablesBranchFilter');
  if (branchFilter) {
    fillReportBranchSelect(branchFilter, filters.branchId || 'all');
    branchFilter.addEventListener('change', () => {
      state.tablesFilters.branchId = branchFilter.value || 'all';
      resetPaginationPage(state.tablesFilters);
      renderTablesSection();
    });
  }

  const dateFromInput = document.getElementById('tablesDateFrom');
  if (dateFromInput) {
    dateFromInput.addEventListener('change', () => {
      state.tablesFilters.fromDate = dateFromInput.value || '';
      resetPaginationPage(state.tablesFilters);
      renderTablesSection();
    });
  }
  const dateToInput = document.getElementById('tablesDateTo');
  if (dateToInput) {
    dateToInput.addEventListener('change', () => {
      state.tablesFilters.toDate = dateToInput.value || '';
      resetPaginationPage(state.tablesFilters);
      renderTablesSection();
    });
  }
  const numberFilter = document.getElementById('tablesNumberFilter');
  if (numberFilter) {
    bindDebouncedQueryInput(numberFilter, (value) => {
      state.tablesFilters.tableQuery = String(value || '').trim();
      resetPaginationPage(state.tablesFilters);
      renderTablesSection();
    });
  }
  const sortOrders = document.getElementById('tablesSortOrders');
  if (sortOrders) {
    sortOrders.value = filters.sortOrders || 'desc';
    sortOrders.addEventListener('change', () => {
      state.tablesFilters.sortOrders = sortOrders.value || 'desc';
      resetPaginationPage(state.tablesFilters);
      renderTablesSection();
    });
  }
  const sortRevenue = document.getElementById('tablesSortRevenue');
  if (sortRevenue) {
    sortRevenue.value = filters.sortRevenue || 'desc';
    sortRevenue.addEventListener('change', () => {
      state.tablesFilters.sortRevenue = sortRevenue.value || 'desc';
      resetPaginationPage(state.tablesFilters);
      renderTablesSection();
    });
  }
  const pageSizeSelect = document.getElementById('tablesPageSize');
  if (pageSizeSelect) {
    pageSizeSelect.value = String(filters.pageSize || 10);
    pageSizeSelect.addEventListener('change', () => {
      state.tablesFilters.pageSize = Number(pageSizeSelect.value || 10);
      resetPaginationPage(state.tablesFilters);
      renderTablesSection();
    });
  }

  const tableBranchInput = document.getElementById('tableBranchInput');
  if (tableBranchInput) {
    renderBranchOptions(tableBranchInput);
  }

  const tableNumberInput = document.getElementById('tableNumberInput');
  const tableLocationInput = document.getElementById('tableLocationInput');
  if (state.editingTableId) {
    const tableEntry = state.cache.tables?.[state.editingTableId];
    if (tableNumberInput) tableNumberInput.value = tableEntry?.tableNumber || '';
    if (tableBranchInput) tableBranchInput.value = tableEntry?.branchId || '';
    if (tableLocationInput) tableLocationInput.value = tableEntry?.location || '';
  }

  const saveBtn = document.getElementById('tableSaveBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const tableNumber = String(tableNumberInput?.value || '').trim();
      const branchId = String(tableBranchInput?.value || '').trim();
      const location = String(tableLocationInput?.value || '').trim();
      const errorEl = document.getElementById('tableFormError');
      if (errorEl) errorEl.textContent = '';
      if (!tableNumber || !branchId) {
        if (errorEl) errorEl.textContent = window.i18n.t('error');
        return;
      }
      const duplicate = Object.entries(state.cache.tables || {}).find(([id, table]) => {
        if (state.editingTableId && id === state.editingTableId) return false;
        return String(table.branchId || '') === branchId && String(table.tableNumber || '') === tableNumber;
      });
      if (duplicate) {
        if (errorEl) errorEl.textContent = window.i18n.t('table_exists');
        return;
      }
      const payload = {
        tableNumber,
        branchId,
        location: location || null,
        active: true,
        updatedAt: serverTime
      };
      if (state.editingTableId) {
        db.ref(`tables/${state.editingTableId}`).update(payload).then(() => {
          state.editingTableId = null;
          renderTablesSection();
        });
      } else {
        db.ref('tables').push({ ...payload, createdAt: serverTime }).then(() => {
          renderTablesSection();
        });
      }
    });
  }

  const cancelEditBtn = document.getElementById('tableCancelEditBtn');
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      state.editingTableId = null;
      renderTablesSection();
    });
  }

  const tbody = document.getElementById('tablesTableBody');
  const pagination = paginateEntries(rows, filters);
  const pagedRows = pagination.items;
  updatePaginationControls({
    infoId: 'tablesPageInfo',
    containerId: 'tablesPagination',
    filters,
    totalItems: rows.length,
    onPageChange: (page) => {
      state.tablesFilters.currentPage = page;
      renderTablesSection();
    }
  });
  if (tbody) {
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="6">${window.i18n.t('no_data')}</td></tr>`;
    } else {
      tbody.innerHTML = pagedRows.map((row) => `
        <tr>
          <td>${row.tableNumber || '-'}</td>
          <td>${row.branchName || '-'}</td>
          <td>${row.location || '-'}</td>
          <td>${row.ordersCount}</td>
          <td>${formatMoney(row.revenue)}</td>
          <td>
            <div class="row" style="gap: 6px;">
              <button class="btn ghost small" data-action="details" data-branch-id="${row.branchId}" data-table-number="${row.tableNumber}">${window.i18n.t('view')}</button>
              ${row.isVirtual ? '' : `<button class="btn ghost small" data-action="edit" data-id="${row.id}">${window.i18n.t('edit')}</button>`}
              ${row.isVirtual ? '' : `<button class="btn danger small" data-action="delete" data-id="${row.id}">${window.i18n.t('delete')}</button>`}
            </div>
          </td>
        </tr>
      `).join('');
      tbody.querySelectorAll('[data-action="details"]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const branchId = btn.dataset.branchId || '';
          const tableNumber = btn.dataset.tableNumber || '';
          state.tablesFilters.detailsKey = `${branchId}:${tableNumber}`;
          state.tablesFilters.detailsCashierId = 'all';
          state.tablesFilters.detailsQuery = '';
          renderTablesSection();
        });
      });
      tbody.querySelectorAll('[data-action="edit"]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.editingTableId = btn.dataset.id;
          renderTablesSection();
        });
      });
      tbody.querySelectorAll('[data-action="delete"]').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (!confirm(window.i18n.t('confirm_delete'))) return;
          db.ref(`tables/${btn.dataset.id}`).remove();
          if (state.editingTableId === btn.dataset.id) {
            state.editingTableId = null;
          }
        });
      });
    }
  }

  const exportBtn = document.getElementById('tablesExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!rows.length) return;
      const exportRows = rows.map((row) => ({
        [window.i18n.t('table_number')]: row.tableNumber || '-',
        [window.i18n.t('branch')]: row.branchName || '-',
        [window.i18n.t('table_location')]: row.location || '-',
        [window.i18n.t('total_orders_label')]: row.ordersCount,
        [window.i18n.t('table_revenue')]: formatMoney(row.revenue)
      }));
      exportToExcel(exportRows, 'tables-report.xlsx');
    });
  }

  const printBtn = document.getElementById('tablesPrintBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const headers = [
        window.i18n.t('table_number'),
        window.i18n.t('branch'),
        window.i18n.t('table_location'),
        window.i18n.t('total_orders_label'),
        window.i18n.t('table_revenue')
      ];
      const bodyRows = rows.map((row) => ([
        row.tableNumber || '-',
        row.branchName || '-',
        row.location || '-',
        row.ordersCount,
        formatMoney(row.revenue)
      ]));
      printA4Report(
        window.i18n.t('tables'),
        [
          { label: window.i18n.t('filter_from'), value: filters.fromDate || '-' },
          { label: window.i18n.t('filter_to'), value: filters.toDate || '-' },
          { label: window.i18n.t('branch'), value: filters.branchId === 'all' ? window.i18n.t('all_branches') : getBranchLabel(filters.branchId) }
        ],
        headers,
        bodyRows,
        [
          { label: window.i18n.t('total_orders_label'), value: totals.orders },
          { label: window.i18n.t('table_revenue'), value: formatMoney(totals.revenue) }
        ]
      );
    });
  }
}

function setupUsersSection() {
  const section = document.getElementById('section-users');
  if (!section) return;
  const paginationState = ensureTablePaginationState('users');
  section.innerHTML = `
    <div class="card">
      <h2>${window.i18n.t('users')}</h2>
      <form id="userForm" class="grid two">
        <div>
          <label class="tag" for="userNameInput">${window.i18n.t('user_name')}</label>
          <input id="userNameInput" class="input" />
        </div>
        <div>
          <label class="tag" for="userCodeInput">${window.i18n.t('user_code')}</label>
          <input id="userCodeInput" class="input" />
        </div>
        <div>
          <label class="tag" for="userRoleInput">${window.i18n.t('role')}</label>
          <select id="userRoleInput">
            <option value="manager">${window.i18n.t('role_manager')}</option>
            <option value="cashier">${window.i18n.t('role_cashier')}</option>
            <option value="storekeeper">${window.i18n.t('role_storekeeper')}</option>
          </select>
        </div>
        <div class="row">
          <button type="submit" class="btn primary">${window.i18n.t('add_user')}</button>
        </div>
      </form>
    </div>
    <div class="card">
      <div class="row" style="justify-content: flex-end; margin-bottom: 12px;">
        ${buildPageSizeControlHtml('usersPageSize')}
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>${window.i18n.t('user_name')}</th>
            <th>${window.i18n.t('role')}</th>
            <th>${window.i18n.t('user_code')}</th>
            <th>${window.i18n.t('actions')}</th>
          </tr>
        </thead>
        <tbody id="usersTable"></tbody>
      </table>
      ${buildPaginationBarHtml('usersPageInfo', 'usersPagination')}
    </div>
  `;

  const userForm = section.querySelector('#userForm');
  const nameInput = section.querySelector('#userNameInput');
  const codeInput = section.querySelector('#userCodeInput');
  const roleInput = section.querySelector('#userRoleInput');

  userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const code = codeInput.value.trim();
    const role = roleInput.value;
    if (!name || !code) return;

    const editId = userForm.dataset.editId;
    const isEditingDefaultManager = editId === DEFAULT_MANAGER_USER_ID;
    if (editId) {
      db.ref(`users/${editId}`).update({
        name,
        code: String(code),
        role: isEditingDefaultManager ? 'manager' : role,
        active: true
      });
      delete userForm.dataset.editId;
      userForm.querySelector('button[type="submit"]').textContent = window.i18n.t('add_user');
      roleInput.disabled = false;
      roleInput.value = 'cashier';
    } else {
      db.ref('users').push({ name, code: String(code), role, active: true });
    }

    nameInput.value = '';
    codeInput.value = '';
  });

  section.querySelector('#usersPageSize').addEventListener('change', (e) => {
    paginationState.pageSize = Number(e.target.value || 10);
    paginationState.currentPage = 1;
    renderUsers();
  });

  renderUsers();
}

function renderUsers() {
  const table = document.getElementById('usersTable');
  if (!table) return;
  const paginationState = ensureTablePaginationState('users');
  table.innerHTML = '';

  const users = state.cache.users || {};
  const entries = Object.entries(users);
  const pagedEntries = paginateEntries(entries, paginationState).items;
  updatePaginationControls({
    infoId: 'usersPageInfo',
    containerId: 'usersPagination',
    filters: paginationState,
    totalItems: entries.length,
    onPageChange: (page) => {
      paginationState.currentPage = page;
      renderUsers();
    }
  });
  syncPageSizeSelect('usersPageSize', paginationState);
  if (entries.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="4">${window.i18n.t('no_data')}</td>`;
    table.appendChild(row);
    return;
  }

  pagedEntries.forEach(([id, user]) => {
    const isDefaultManager = id === DEFAULT_MANAGER_USER_ID;
    const row = document.createElement('tr');
    const roleKey = isDefaultManager
      ? 'role_manager'
      : (user.role === 'manager' ? 'role_manager' : user.role === 'cashier' ? 'role_cashier' : 'role_storekeeper');
    row.innerHTML = `
      <td>${user.name || '-'}</td>
      <td>${window.i18n.t(roleKey)}</td>
      <td>${user.code || '-'}</td>
      <td>
        <button class="btn ghost small" data-action="edit">${window.i18n.t('edit')}</button>
        ${isDefaultManager ? '' : `<button class="btn danger small" data-action="delete">${window.i18n.t('delete')}</button>`}
      </td>
    `;

    row.querySelector('[data-action="edit"]').addEventListener('click', () => {
      const form = document.getElementById('userForm');
      form.dataset.editId = id;
      document.getElementById('userNameInput').value = user.name || '';
      document.getElementById('userCodeInput').value = user.code || '';
      const roleSelect = document.getElementById('userRoleInput');
      roleSelect.value = isDefaultManager ? 'manager' : (user.role || 'cashier');
      roleSelect.disabled = isDefaultManager;
      form.querySelector('button[type="submit"]').textContent = window.i18n.t('update');
    });

    const deleteBtn = row.querySelector('[data-action="delete"]');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        if (id === DEFAULT_MANAGER_USER_ID) return;
        if (confirm(window.i18n.t('confirm_delete'))) {
          db.ref(`users/${id}`).remove();
        }
      });
    }

    table.appendChild(row);
  });
}

function watchData() {
  const paths = [
    'orders',
    'customers',
    'products',
    'productInfos',
    'countryOrigins',
    'productCategories',
    'units',
    'itemCards',
    'stockMaterials',
    'materialCategories',
    'storageLocations',
    'stockIssue',
    'production',
    'inventoryCount',
    'receiving',
    'transfers',
    'transferRequests',
    'cashierTransfers',
    'stockReturn',
    'scrapReturn',
    'suppliers',
    'purchases',
    'supplierReturns',
    'purchaseReceipts',
    'pendingStockMoves',
    'warehouseStaff',
    'productionStaff',
    'branches',
    'deliveryZones',
    'deliveryPrices',
    'orderTypes',
    'paymentMethods',
    'cashiers',
    'users',
    'tables',
    'devices',
    'status',
    'discounts',
    'discountUsage'
  ];

  paths.forEach((path) => {
    db.ref(path).on('value', (snap) => {
      state.cache[path] = snap.val() || {};
      if (state.importInProgress || isEditingDataInput()) {
        state.pendingDataRefresh = true;
        return;
      }
      refreshAllDataViews();
    });
  });
}

function isEditingDataInput() {
  const active = document.activeElement;
  if (!active) return false;
  const tag = String(active.tagName || '').toUpperCase();
  if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') return false;
  if (active.disabled || active.readOnly) return false;
  return true;
}

function refreshAllDataViews() {
  renderListSections();
  renderReportsSection();
  renderOrders();
  renderDevicesCashiers();
  renderUsers();
  renderTablesSection();
  renderPendingStockMoves();
  renderDiscounts();
  renderProductsSection();
  renderProductInfoSection();
  renderProductCategoriesSection();
  renderItemCardSection();
  renderCountryOriginsSection();
  renderStockMaterialsSection();
  renderMaterialCategoriesSection();
  renderStorageLocationsSection();
  renderIssueSection();
  renderProductionSection();
  renderProductionFollowUpSection();
  renderInventorySection();
  renderReceivingSection();
  renderTransfersSection();
  renderCashierTransferRequestsSection();
  renderStockReturnSection();
  renderScrapReturnSection();
  renderSuppliersSection();
  renderPurchasesSection();
  renderSupplierReturnSection();
  renderCustomersSection();
  renderUnitsSection();
  updateReorderNotice();
  applyAutomaticSectionTablePagination(state.currentSection);
}

function flushPendingDataRefresh() {
  if (!state.pendingDataRefresh) return;
  if (isEditingDataInput()) return;
  state.pendingDataRefresh = false;
  refreshAllDataViews();
}

function renderListSections() {
  listConfigs.forEach((config) => {
    renderListSection(config);
  });
}

function formatDate(timestamp) {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function formatNumber(value) {
  if (value === null || value === undefined || value === '') return '-';
  return Number(value).toFixed(2);
}

function getCurrencySuffix() {
  return window.i18n.getLanguage() === 'ar' ? ' د.ك' : ' KWD';
}

function formatMoney(value) {
  if (value === null || value === undefined || value === '') return '-';
  return `${formatNumber(value)}${getCurrencySuffix()}`;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showCopyNotice(message) {
  let notice = document.getElementById('copyNotice');
  if (!notice) {
    notice = document.createElement('div');
    notice.id = 'copyNotice';
    notice.style.cssText = 'position:fixed;bottom:24px;left:24px;z-index:3000;background:#1f8a44;color:#fff;padding:10px 16px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.16);font-weight:700;';
    document.body.appendChild(notice);
  }
  notice.textContent = message;
  notice.classList.remove('hidden');
  clearTimeout(showCopyNotice.timer);
  showCopyNotice.timer = setTimeout(() => {
    notice.classList.add('hidden');
  }, 1400);
}

async function copyTextToClipboard(value) {
  const text = String(value || '').trim();
  if (!text) return;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const input = document.createElement('textarea');
      input.value = text;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    showCopyNotice(`${window.i18n.t('barcode_copied')}: ${text}`);
  } catch (_error) {
    showCopyNotice(text);
  }
}

function exportToExcel(rows, filename) {
  if (!rows || rows.length === 0) return;
  if (typeof XLSX === 'undefined') return;
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  XLSX.writeFile(workbook, filename);
}

init();
