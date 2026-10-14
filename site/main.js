'use strict';

// This site only reads publicly documented plan metadata. No accounts, analytics,
// personal VPN configurations, servers or secret tokens are accessed.
(() => {
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const priceRows = [...document.querySelectorAll('#price-body tr[data-route]')];

  function selectFilter(value) {
    for (const button of filterButtons) {
      const selected = button.dataset.filter === value;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    }
    for (const row of priceRows) {
      row.hidden = !(value === 'all' || row.dataset.route === value);
    }
  }
  for (const button of filterButtons) {
    button.addEventListener('click', () => selectFilter(button.dataset.filter));
  }

  const panels = {
    easy: document.getElementById('panel-easy'),
    manual: document.getElementById('panel-manual'),
  };
  const tabs = [...document.querySelectorAll('[data-install]')];

  function selectTab(name, focus = false) {
    for (const tab of tabs) {
      const active = tab.dataset.install === name;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    }
    Object.entries(panels).forEach(([key, panel]) => {
      panel.hidden = key !== name;
    });
  }
  for (const tab of tabs) {
    tab.addEventListener('click', () => selectTab(tab.dataset.install));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = tabs.indexOf(tab);
      const nextIndex = event.key === 'Home' ? 0
        : event.key === 'End' ? tabs.length - 1
          : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectTab(tabs[nextIndex].dataset.install, true);
    });
  }
  selectTab('easy');

  const daily = document.getElementById('daily-gb');
  const range = document.getElementById('traffic-range');
  const estimate = document.getElementById('traffic-estimate');
  const advice = document.getElementById('traffic-advice');
  const format = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 });

  function updateTraffic(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;
    const amount = Math.min(300, Math.max(0.1, parsed));
    const monthly = amount * 30 * 1.5;
    daily.value = String(amount);
    range.value = String(Math.min(Number(range.max), Math.max(Number(range.min), amount)));
    estimate.textContent = format.format(monthly) + ' GB';
    if (monthly <= 1000) {
      advice.textContent = '多数入门套餐额度看起来足够；优先确认线路实测和运营商条款。';
    } else if (monthly <= 4000) {
      advice.textContent = '需要留意月流量额度和高峰期实际速度；建议按月付套餐试用。';
    } else if (monthly <= 10000) {
      advice.textContent = '已进入高流量区间，仔细核对对应套餐的计量规则与限速政策。';
    } else {
      advice.textContent = '流量需求较高，不能只看小型 VPS；需要单独核对报价和使用条款。';
    }
  }
  daily.addEventListener('input', () => {
    if (daily.value !== '') updateTraffic(daily.value);
  });
  daily.addEventListener('change', () => updateTraffic(daily.value || '3'));
  range.addEventListener('input', () => updateTraffic(range.value));
  updateTraffic(daily.value);

  for (const button of document.querySelectorAll('.copy-code')) {
    button.addEventListener('click', async () => {
      const code = button.parentElement.querySelector('pre code')?.textContent;
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code);
        const previous = button.textContent;
        button.textContent = '已复制';
        window.setTimeout(() => { button.textContent = previous; }, 1600);
      } catch {
        button.textContent = '请手动选中复制';
      }
    });
  }
})();
