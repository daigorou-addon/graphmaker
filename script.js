document.addEventListener('DOMContentLoaded', function(){
  'use strict';

  const PALETTE = ['#29e0c4','#ff5a5f','#ffb020','#4fb3ff','#a78bfa','#ff8a3d'];

  const PRESET_DEFS = [
    { id:'daily',   labelKey:'preset_daily',
      makeLabels: () => [1,2,3,4,5,6,7].map(n => t('label_day_n').replace('{n}', n)),
      makeSeries: () => [ { name:t('generic_value'), values:[12,18,9,25,20,30,22] } ] },
    { id:'monthly', labelKey:'preset_monthly',
      makeLabels: () => [1,2,3,4,5,6].map(n => t('label_month_n').replace('{n}', n)),
      makeSeries: () => [
        { name:t('default_series_a'), values:[21,34,29,47,52,60] },
        { name:t('default_series_b'), values:[19,28,33,38,44,50] },
      ] },
    { id:'score',   labelKey:'preset_score',
      makeLabels: () => [1,2,3,4,5].map(n => t('label_round_n').replace('{n}', n)),
      makeSeries: () => [ { name:t('preset_score'), values:[55,63,59,70,66] } ] },
    { id:'count',   labelKey:'preset_count',
      makeLabels: () => [1,2,3,4,5].map(n => t('label_day_n').replace('{n}', n)),
      makeSeries: () => [ { name:t('preset_count'), values:[3,5,2,6,4] } ] },
  ];

  let idCounter = 0;
  let chartType = 'line';
  let showGrid = true, showLabels = true, showLegend = true;
  let seriesList = [];
  let rows = [];

  const typeBtns = document.querySelectorAll('.type-btn');
  const toggleGrid = document.getElementById('toggleGrid');
  const toggleLabels = document.getElementById('toggleLabels');
  const toggleLegend = document.getElementById('toggleLegend');
  const presetTree = document.getElementById('presetTree');
  const seriesListEl = document.getElementById('seriesList');
  const addSeriesBtn = document.getElementById('addSeriesBtn');
  const dataTableHead = document.getElementById('dataTableHead');
  const dataTableBody = document.getElementById('dataTableBody');
  const addRowBtn = document.getElementById('addRowBtn');
  const clearDataBtn = document.getElementById('clearDataBtn');
  const tableScroll = document.querySelector('.table-scroll');
  const downloadBtn = document.getElementById('downloadBtn');
  const saveDataBtn = document.getElementById('saveDataBtn');
  const loadDataBtn = document.getElementById('loadDataBtn');
  const loadDataInput = document.getElementById('loadDataInput');
  const canvas = document.getElementById('chartCanvas');
  const ctx = canvas.getContext('2d');

  function loadPresetById(id){
    const preset = PRESET_DEFS.find(p => p.id === id);
    if(!preset) return;
    const labels = preset.makeLabels();
    const presetSeries = preset.makeSeries();
    seriesList = presetSeries.map((s,i) => ({ id:'s'+(idCounter++), name:s.name, color:PALETTE[i % PALETTE.length] }));
    rows = labels.map((label,i) => {
      const values = {};
      presetSeries.forEach((s,si) => { values[seriesList[si].id] = s.values[i]; });
      return { id:'r'+(idCounter++), label, values };
    });
    renderSeriesList();
    renderTable();
    draw();
  }

  function renderPresetTree(){
    presetTree.innerHTML = '';
    PRESET_DEFS.forEach(p => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = 'tree-item';
      btn.textContent = t(p.labelKey);
      btn.addEventListener('click', () => loadPresetById(p.id));
      li.appendChild(btn);
      presetTree.appendChild(li);
    });
  }

  function addSeries(){
    const s = { id:'s'+(idCounter++), name:t('new_series_name').replace('{n}', seriesList.length+1), color:PALETTE[seriesList.length % PALETTE.length] };
    seriesList.push(s);
    rows.forEach(r => { r.values[s.id] = ''; });
    renderSeriesList();
    renderTable(s.id);
    draw();
    if(tableScroll) tableScroll.scrollLeft = tableScroll.scrollWidth;
  }

  function removeSeries(id){
    if(seriesList.length <= 1) return;
    seriesList = seriesList.filter(s => s.id !== id);
    rows.forEach(r => { delete r.values[id]; });
    renderSeriesList();
    renderTable();
    draw();
  }

  function renderSeriesList(){
    seriesListEl.innerHTML = '';
    seriesList.forEach(s => {
      const item = document.createElement('div');
      item.className = 'series-item';

      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.className = 'series-color';
      colorInput.value = s.color;
      colorInput.addEventListener('input', () => { s.color = colorInput.value; draw(); });
      item.appendChild(colorInput);

      const nameInput = document.createElement('input');
      nameInput.className = 'text-input';
      nameInput.value = s.name;
      nameInput.addEventListener('input', () => { s.name = nameInput.value; renderTable(); draw(); });
      item.appendChild(nameInput);

      const delBtn = document.createElement('button');
      delBtn.className = 'series-del';
      delBtn.textContent = t('series_delete_btn');
      delBtn.disabled = seriesList.length <= 1;
      delBtn.addEventListener('click', () => removeSeries(s.id));
      item.appendChild(delBtn);

      seriesListEl.appendChild(item);
    });
  }

  function addRow(){
    const values = {};
    seriesList.forEach(s => { values[s.id] = ''; });
    rows.push({ id:'r'+(idCounter++), label:'', values });
    renderTable();
    draw();
  }

  function removeRow(id){
    rows = rows.filter(r => r.id !== id);
    renderTable();
    draw();
  }

  function clearData(){
    rows.forEach(r => {
      r.label = '';
      seriesList.forEach(s => { r.values[s.id] = ''; });
    });
    renderTable();
    draw();
  }

  function renderTable(highlightSeriesId){
    dataTableHead.innerHTML = '';
    const thLabel = document.createElement('th');
    thLabel.textContent = t('table_label_head');
    thLabel.style.minWidth = '90px';
    dataTableHead.appendChild(thLabel);
    seriesList.forEach(s => {
      const th = document.createElement('th');
      th.textContent = s.name || '—';
      th.style.minWidth = '100px';
      if(s.id === highlightSeriesId) th.classList.add('col-new-flash');
      dataTableHead.appendChild(th);
    });
    const thDel = document.createElement('th');
    thDel.style.width = '32px';
    dataTableHead.appendChild(thDel);

    dataTableBody.innerHTML = '';
    rows.forEach(row => {
      const tr = document.createElement('tr');
      const tdLabel = document.createElement('td');
      const labelInput = document.createElement('input');
      labelInput.className = 'cell-input';
      labelInput.value = row.label;
      labelInput.placeholder = t('label_placeholder');
      labelInput.addEventListener('input', () => { row.label = labelInput.value; draw(); });
      tdLabel.appendChild(labelInput);
      tr.appendChild(tdLabel);

      seriesList.forEach(s => {
        const td = document.createElement('td');
        const valInput = document.createElement('input');
        valInput.type = 'number';
        valInput.step = 'any';
        valInput.className = 'cell-input';
        valInput.value = row.values[s.id] != null ? row.values[s.id] : '';
        valInput.addEventListener('input', () => { row.values[s.id] = valInput.value; draw(); });
        td.appendChild(valInput);
        tr.appendChild(td);
      });

      const tdDel = document.createElement('td');
      tdDel.className = 'row-del-cell';
      const delBtn = document.createElement('button');
      delBtn.className = 'row-del';
      delBtn.textContent = '×';
      delBtn.addEventListener('click', () => removeRow(row.id));
      tdDel.appendChild(delBtn);
      tr.appendChild(tdDel);

      dataTableBody.appendChild(tr);
    });
  }

  // グラフの目盛りをキリの良い数値（1, 2, 5, 10のような区切り）に丸めるための計算
  function niceNum(range, round){
    if(range === 0) return 0;
    const exponent = Math.floor(Math.log10(range));
    const fraction = range / Math.pow(10, exponent);
    let niceFraction;
    if(round){
      if(fraction < 1.5) niceFraction = 1;
      else if(fraction < 3) niceFraction = 2;
      else if(fraction < 7) niceFraction = 5;
      else niceFraction = 10;
    } else {
      if(fraction <= 1) niceFraction = 1;
      else if(fraction <= 2) niceFraction = 2;
      else if(fraction <= 5) niceFraction = 5;
      else niceFraction = 10;
    }
    return niceFraction * Math.pow(10, exponent);
  }

  function niceScale(minV, maxV, maxTicks){
    if(minV === maxV){ minV -= 1; maxV += 1; }
    const range = niceNum(maxV - minV, false);
    const step = niceNum(range / (maxTicks - 1), true) || 1;
    const niceMin = Math.floor(minV / step) * step;
    const niceMax = Math.ceil(maxV / step) * step;
    return { min: niceMin, max: niceMax, step };
  }

  function draw(){
    const rw = 1200, rh = 720;
    canvas.width = rw; canvas.height = rh;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const bg = isLight ? '#f6f8f9' : '#0e1319';
    const gridColor = isLight ? '#d7dde1' : '#232b34';
    const textColor = isLight ? '#4c5866' : '#7c8894';
    const zeroLineColor = isLight ? '#aab3ba' : '#3a4552';
    const emptyColor = isLight ? '#9aa6b0' : '#5c6773';
    const legendTextColor = isLight ? '#222a33' : '#c7d0d8';

    ctx.fillStyle = bg;
    ctx.fillRect(0,0,rw,rh);

    const pad = { top: rh*0.11, right: rw*0.05, bottom: rh*0.13, left: rw*0.08 };
    const plotW = rw - pad.left - pad.right;
    const plotH = rh - pad.top - pad.bottom;

    const validRows = rows.filter(r => r.label);
    const series = seriesList.map((s) => {
      const values = validRows.map(r => {
        const v = parseFloat(r.values[s.id]);
        return isNaN(v) ? null : v;
      });
      const hasAny = values.some(v => v != null);
      return { s, color: s.color, values, hasAny };
    });
    const anyData = series.some(sr => sr.hasAny);

    if(!anyData || validRows.length === 0){
      ctx.fillStyle = emptyColor;
      ctx.font = `500 20px "Zen Kaku Gothic New",sans-serif`;
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillText(t('empty_chart_message'), pad.left, pad.top + plotH/2);
      return;
    }

    let allVals = [];
    series.forEach(sr => sr.values.forEach(v => { if(v != null) allVals.push(v); }));
    const rawMin = Math.min(0, ...allVals);
    const rawMax = Math.max(0, ...allVals);
    const scale = niceScale(rawMin, rawMax, 5);
    const minV = scale.min, maxV = scale.max;
    const vRange = maxV - minV;
    const yFor = v => pad.top + plotH - ((v - minV) / vRange) * plotH;
    const n = validRows.length;
    // 棒グラフは各カテゴリに均等な余白を持たせて中央に配置（両端のグループが枠からはみ出さないように）。
    // 折れ線グラフは従来通り両端の点が軸の端に来るように配置。
    const xFor = chartType === 'bar'
      ? (i => pad.left + ((i + 0.5) / n) * plotW)
      : (i => n === 1 ? pad.left + plotW/2 : pad.left + (i/(n-1)) * plotW);

    if(showGrid){
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.font = `400 15px "Zen Kaku Gothic New",sans-serif`;
      ctx.fillStyle = textColor;
      const tickCount = Math.round(vRange / scale.step);
      for(let i=0;i<=tickCount;i++){
        const v = minV + scale.step * i;
        const y = yFor(v);
        ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(pad.left+plotW,y); ctx.stroke();
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText(Math.round(v).toLocaleString(), pad.left-10, y);
      }
      if(minV < 0 && maxV > 0){
        ctx.strokeStyle = zeroLineColor; ctx.lineWidth = 1.5;
        const y0 = yFor(0);
        ctx.beginPath(); ctx.moveTo(pad.left,y0); ctx.lineTo(pad.left+plotW,y0); ctx.stroke();
      }
    } else {
      ctx.strokeStyle = zeroLineColor; ctx.lineWidth = 1.5;
      const y0 = yFor(Math.max(minV,0));
      ctx.beginPath(); ctx.moveTo(pad.left,y0); ctx.lineTo(pad.left+plotW,y0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad.left,pad.top); ctx.lineTo(pad.left,pad.top+plotH); ctx.stroke();
    }

    if(chartType === 'bar'){
      const groupW = plotW / n * 0.7;
      const bw = groupW / series.length;
      series.forEach((sr, si) => {
        sr.values.forEach((v,i) => {
          if(v == null) return;
          const x = xFor(i) - groupW/2 + bw*si + bw/2;
          const y = yFor(v), y0 = yFor(0);
          ctx.fillStyle = sr.color;
          ctx.fillRect(x - bw*0.4, Math.min(y,y0), bw*0.8, Math.abs(y-y0));
        });
      });
    } else {
      series.forEach(sr => {
        ctx.strokeStyle = sr.color;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        let started = false;
        sr.values.forEach((v,i) => {
          if(v == null){ started = false; return; }
          const x = xFor(i), y = yFor(v);
          if(!started){ ctx.moveTo(x,y); started = true; } else { ctx.lineTo(x,y); }
        });
        ctx.stroke();
        sr.values.forEach((v,i) => {
          if(v == null) return;
          const x = xFor(i), y = yFor(v);
          ctx.fillStyle = sr.color;
          ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2); ctx.fill();
        });
      });
    }

    if(showLabels){
      ctx.fillStyle = textColor;
      ctx.font = `400 15px "Zen Kaku Gothic New",sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      const maxLabels = Math.max(3, Math.floor(plotW / 80));
      const step = Math.max(1, Math.ceil(n / maxLabels));
      validRows.forEach((r,i) => {
        if(i % step !== 0 && i !== n-1) return;
        ctx.fillText(r.label, xFor(i), pad.top+plotH+10);
      });
    }

    if(showLegend){
      ctx.font = `600 15px "Zen Kaku Gothic New",sans-serif`;
      let ly = pad.top*0.15;
      series.forEach(sr => {
        ctx.fillStyle = sr.color;
        ctx.fillRect(pad.left, ly, 12, 12);
        ctx.fillStyle = legendTextColor;
        ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillText(sr.s.name || '—', pad.left+18, ly-1);
        ly += 22;
      });
    }
  }

  function serializeState(){
    return {
      chartType, showGrid, showLabels, showLegend,
      series: seriesList.map(s => ({ name:s.name, color:s.color })),
      rows: rows.map(r => ({ label:r.label, values: seriesList.map(s => r.values[s.id]) })),
    };
  }

  function loadState(data){
    if(!data || !Array.isArray(data.series) || !Array.isArray(data.rows)) return;
    chartType = data.chartType === 'bar' ? 'bar' : 'line';
    typeBtns.forEach(b => b.classList.toggle('active', b.dataset.type === chartType));
    showGrid = data.showGrid !== false; toggleGrid.checked = showGrid;
    showLabels = data.showLabels !== false; toggleLabels.checked = showLabels;
    showLegend = data.showLegend !== false; toggleLegend.checked = showLegend;
    seriesList = data.series.map((s,i) => ({ id:'s'+(idCounter++), name:s.name||'', color:s.color||PALETTE[i%PALETTE.length] }));
    rows = data.rows.map(r => {
      const values = {};
      (r.values||[]).forEach((v,i) => { if(seriesList[i]) values[seriesList[i].id] = v; });
      return { id:'r'+(idCounter++), label:r.label||'', values };
    });
    renderSeriesList();
    renderTable();
    draw();
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chartType = btn.dataset.type;
      typeBtns.forEach(b => b.classList.toggle('active', b === btn));
      draw();
    });
  });

  toggleGrid.addEventListener('change', () => { showGrid = toggleGrid.checked; draw(); });
  toggleLabels.addEventListener('change', () => { showLabels = toggleLabels.checked; draw(); });
  toggleLegend.addEventListener('change', () => { showLegend = toggleLegend.checked; draw(); });

  addSeriesBtn.addEventListener('click', addSeries);
  addRowBtn.addEventListener('click', addRow);
  clearDataBtn.addEventListener('click', clearData);

  downloadBtn.addEventListener('click', () => {
    const a = document.createElement('a');
    a.download = 'graph.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });

  saveDataBtn.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(serializeState(), null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'graphmaker-data.json';
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  });

  loadDataBtn.addEventListener('click', () => loadDataInput.click());
  loadDataInput.addEventListener('change', () => {
    const file = loadDataInput.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        loadState(JSON.parse(reader.result));
      }catch(e){
        // 不正なファイルは無視
      }
      loadDataInput.value = '';
    };
    reader.readAsText(file);
  });

  window.graphmakerOnLangChange = function(){
    renderPresetTree();
    renderSeriesList();
    renderTable();
    draw();
  };
  window.graphmakerOnThemeChange = function(){ draw(); };

  renderPresetTree();
  loadPresetById('monthly');
});
