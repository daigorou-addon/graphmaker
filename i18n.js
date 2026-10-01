/* ===================================================================
   グラフメーカー (GraphMaker) — 多言語対応（i18n）
   対応言語: 日本語 / English / 한국어 / 简体中文 / 繁體中文 / Español
=================================================================== */

const I18N = {

ja: {
  clear_data_btn: "クリア",
  page_title: "グラフメーカー",
  brand_name: "グラフメーカー",
  local_badge: "local-only",
  back_to_top: "← Daigorou-Tools",
  load_data_btn: "データを読み込む",
  save_data_btn: "データを保存",
  download_btn: "画像を保存",
  theme_toggle_title: "表示テーマを切り替え（ライト/ダーク）",
  input_heading: "設定",
  output_heading: "グラフ表示",
  chart_type_label: "グラフ種類",
  type_line: "折れ線グラフ",
  type_bar: "棒グラフ",
  toggle_grid: "グリッド表示",
  toggle_labels: "ラベル表示",
  toggle_legend: "凡例表示",
  presets_heading: "サンプルデータ",
  preset_daily: "日別",
  preset_monthly: "月別",
  preset_score: "スコア",
  preset_count: "回数",
  series_heading: "系列",
  add_series_btn: "＋ 系列を追加",
  series_delete_btn: "削除",
  legend_hint: "系列名はそのままグラフの凡例に表示されます。ここで自由に書き換えできます。",
  data_heading: "データ",
  add_row_btn: "＋ 行を追加",
  table_label_head: "ラベル",
  label_placeholder: "例: 1月",
  empty_chart_message: "ラベルと数値を入力するとグラフが表示されます",
  default_series_a: "今年",
  default_series_b: "前年",
  generic_value: "値",
  label_month_n: "{n}月",
  label_week_n: "{n}週目",
  label_round_n: "第{n}回",
  label_day_n: "{n}日目",
  new_series_name: "系列{n}",
  footer_privacy_note: "すべての処理はこの端末内で行われます。ファイルはどこにも送信されません。",
},

en: {
  clear_data_btn: "Clear",
  page_title: "graphmaker",
  brand_name: "graphmaker",
  local_badge: "local-only",
  back_to_top: "← Daigorou-Tools",
  load_data_btn: "Load Data",
  save_data_btn: "Save Data",
  download_btn: "Save Image",
  theme_toggle_title: "Toggle light / dark theme",
  input_heading: "Settings",
  output_heading: "Chart",
  chart_type_label: "Chart Type",
  type_line: "Line Chart",
  type_bar: "Bar Chart",
  toggle_grid: "Show Grid",
  toggle_labels: "Show Labels",
  toggle_legend: "Show Legend",
  presets_heading: "Sample Data",
  preset_daily: "Daily",
  preset_monthly: "Monthly",
  preset_score: "Score",
  preset_count: "Count",
  series_heading: "Series",
  add_series_btn: "+ Add Series",
  series_delete_btn: "Delete",
  legend_hint: "The series name appears as-is in the chart legend — feel free to edit it here.",
  data_heading: "Data",
  add_row_btn: "+ Add Row",
  table_label_head: "Label",
  label_placeholder: "e.g. Jan",
  empty_chart_message: "Enter labels and values to see the chart",
  default_series_a: "This Year",
  default_series_b: "Last Year",
  generic_value: "Value",
  label_month_n: "Month {n}",
  label_week_n: "Week {n}",
  label_round_n: "Round {n}",
  label_day_n: "Day {n}",
  new_series_name: "Series {n}",
  footer_privacy_note: "All processing happens on this device. Files are never uploaded anywhere.",
},

ko: {
  clear_data_btn: "지우기",
  page_title: "graphmaker",
  brand_name: "graphmaker",
  local_badge: "local-only",
  back_to_top: "← Daigorou-Tools",
  load_data_btn: "데이터 불러오기",
  save_data_btn: "데이터 저장",
  download_btn: "이미지 저장",
  theme_toggle_title: "라이트/다크 테마 전환",
  input_heading: "설정",
  output_heading: "그래프",
  chart_type_label: "그래프 종류",
  type_line: "꺾은선 그래프",
  type_bar: "막대 그래프",
  toggle_grid: "격자 표시",
  toggle_labels: "라벨 표시",
  toggle_legend: "범례 표시",
  presets_heading: "샘플 데이터",
  preset_daily: "일별",
  preset_monthly: "월별",
  preset_score: "점수",
  preset_count: "횟수",
  series_heading: "시리즈",
  add_series_btn: "＋ 시리즈 추가",
  series_delete_btn: "삭제",
  legend_hint: "시리즈 이름이 그대로 범례에 표시됩니다. 여기서 자유롭게 수정할 수 있습니다.",
  data_heading: "데이터",
  add_row_btn: "＋ 행 추가",
  table_label_head: "라벨",
  label_placeholder: "예: 1월",
  empty_chart_message: "라벨과 값을 입력하면 그래프가 표시됩니다",
  default_series_a: "올해",
  default_series_b: "작년",
  generic_value: "값",
  label_month_n: "{n}월",
  label_week_n: "{n}주차",
  label_round_n: "{n}회차",
  label_day_n: "{n}일차",
  new_series_name: "시리즈{n}",
  footer_privacy_note: "모든 처리는 이 기기 안에서 이루어지며 파일은 어디에도 전송되지 않습니다.",
},

"zh-CN": {
  clear_data_btn: "清除",
  page_title: "graphmaker",
  brand_name: "graphmaker",
  local_badge: "local-only",
  back_to_top: "← Daigorou-Tools",
  load_data_btn: "载入数据",
  save_data_btn: "保存数据",
  download_btn: "保存图片",
  theme_toggle_title: "切换浅色/深色主题",
  input_heading: "设置",
  output_heading: "图表",
  chart_type_label: "图表类型",
  type_line: "折线图",
  type_bar: "柱状图",
  toggle_grid: "显示网格",
  toggle_labels: "显示标签",
  toggle_legend: "显示图例",
  presets_heading: "示例数据",
  preset_daily: "按天",
  preset_monthly: "按月",
  preset_score: "分数",
  preset_count: "次数",
  series_heading: "系列",
  add_series_btn: "＋ 添加系列",
  series_delete_btn: "删除",
  legend_hint: "系列名称会直接显示在图表图例中，可在此自由修改。",
  data_heading: "数据",
  add_row_btn: "＋ 添加行",
  table_label_head: "标签",
  label_placeholder: "例如：1月",
  empty_chart_message: "输入标签和数值后将显示图表",
  default_series_a: "今年",
  default_series_b: "去年",
  generic_value: "数值",
  label_month_n: "{n}月",
  label_week_n: "第{n}周",
  label_round_n: "第{n}次",
  label_day_n: "第{n}天",
  new_series_name: "系列{n}",
  footer_privacy_note: "所有处理均在本机完成，文件不会上传到任何地方。",
},

"zh-TW": {
  clear_data_btn: "清除",
  page_title: "graphmaker",
  brand_name: "graphmaker",
  local_badge: "local-only",
  back_to_top: "← Daigorou-Tools",
  load_data_btn: "載入資料",
  save_data_btn: "儲存資料",
  download_btn: "儲存圖片",
  theme_toggle_title: "切換淺色/深色主題",
  input_heading: "設定",
  output_heading: "圖表",
  chart_type_label: "圖表類型",
  type_line: "折線圖",
  type_bar: "長條圖",
  toggle_grid: "顯示格線",
  toggle_labels: "顯示標籤",
  toggle_legend: "顯示圖例",
  presets_heading: "範例資料",
  preset_daily: "每日",
  preset_monthly: "每月",
  preset_score: "分數",
  preset_count: "次數",
  series_heading: "系列",
  add_series_btn: "＋ 新增系列",
  series_delete_btn: "刪除",
  legend_hint: "系列名稱會直接顯示在圖表圖例中，可在此自由修改。",
  data_heading: "資料",
  add_row_btn: "＋ 新增列",
  table_label_head: "標籤",
  label_placeholder: "例如：1月",
  empty_chart_message: "輸入標籤與數值後會顯示圖表",
  default_series_a: "今年",
  default_series_b: "去年",
  generic_value: "數值",
  label_month_n: "{n}月",
  label_week_n: "第{n}週",
  label_round_n: "第{n}次",
  label_day_n: "第{n}天",
  new_series_name: "系列{n}",
  footer_privacy_note: "所有處理皆在本機完成，檔案不會上傳到任何地方。",
},

es: {
  clear_data_btn: "Limpiar",
  page_title: "graphmaker",
  brand_name: "graphmaker",
  local_badge: "local-only",
  back_to_top: "← Daigorou-Tools",
  load_data_btn: "Cargar Datos",
  save_data_btn: "Guardar Datos",
  download_btn: "Guardar Imagen",
  theme_toggle_title: "Cambiar tema claro/oscuro",
  input_heading: "Ajustes",
  output_heading: "Gráfico",
  chart_type_label: "Tipo de Gráfico",
  type_line: "Gráfico de Líneas",
  type_bar: "Gráfico de Barras",
  toggle_grid: "Mostrar Cuadrícula",
  toggle_labels: "Mostrar Etiquetas",
  toggle_legend: "Mostrar Leyenda",
  presets_heading: "Datos de Ejemplo",
  preset_daily: "Diario",
  preset_monthly: "Mensual",
  preset_score: "Puntuación",
  preset_count: "Cantidad",
  series_heading: "Series",
  add_series_btn: "+ Añadir Serie",
  series_delete_btn: "Eliminar",
  legend_hint: "El nombre de la serie aparece tal cual en la leyenda del gráfico; puedes editarlo aquí.",
  data_heading: "Datos",
  add_row_btn: "+ Añadir Fila",
  table_label_head: "Etiqueta",
  label_placeholder: "ej. Ene",
  empty_chart_message: "Introduce etiquetas y valores para ver el gráfico",
  default_series_a: "Este Año",
  default_series_b: "Año Pasado",
  generic_value: "Valor",
  label_month_n: "Mes {n}",
  label_week_n: "Semana {n}",
  label_round_n: "Ronda {n}",
  label_day_n: "Día {n}",
  new_series_name: "Serie {n}",
  footer_privacy_note: "Todo el procesamiento ocurre en este dispositivo. Los archivos nunca se suben a ningún lugar.",
},

};

const SUPPORTED_LANGS = ["ja","en","ko","zh-CN","zh-TW","es"];

function detectLang(){
  const saved = localStorage.getItem('graphmaker-lang');
  if(saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const nav = (navigator.language || 'ja');
  const exact = SUPPORTED_LANGS.find(l => l.toLowerCase() === nav.toLowerCase());
  if(exact) return exact;
  const base = nav.split('-')[0].toLowerCase();
  if(base === 'zh'){
    return /tw|hk|mo/i.test(nav) ? 'zh-TW' : 'zh-CN';
  }
  const baseMatch = SUPPORTED_LANGS.find(l => l.split('-')[0].toLowerCase() === base);
  return baseMatch || 'ja';
}

let currentLang = detectLang();

function t(key){
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.ja[key] || key;
}

function applyI18n(lang){
  currentLang = SUPPORTED_LANGS.includes(lang) ? lang : 'ja';
  localStorage.setItem('graphmaker-lang', currentLang);
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if(el.tagName === 'TITLE'){ document.title = val; }
    else { el.textContent = val; }
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });
  const sel = document.getElementById('langSelect');
  if(sel) sel.value = currentLang;
  if(typeof window.graphmakerOnLangChange === 'function') window.graphmakerOnLangChange();
}

document.addEventListener('DOMContentLoaded', () => {
  applyI18n(currentLang);
  const sel = document.getElementById('langSelect');
  if(sel){
    sel.addEventListener('change', () => applyI18n(sel.value));
  }
});

// ---- 表示テーマ(ライト/ダーク) ----
function detectTheme(){
  const saved = localStorage.getItem('graphmaker-theme');
  if(saved === 'light' || saved === 'dark') return saved;
  return 'dark';
}
let currentTheme = detectTheme();
function applyTheme(theme){
  currentTheme = (theme === 'light') ? 'light' : 'dark';
  localStorage.setItem('graphmaker-theme', currentTheme);
  document.documentElement.setAttribute('data-theme', currentTheme);
  const btn = document.getElementById('themeToggleBtn');
  if(btn){ btn.textContent = currentTheme === 'dark' ? '☾' : '☀'; }
  if(typeof window.graphmakerOnThemeChange === 'function') window.graphmakerOnThemeChange();
}
applyTheme(currentTheme);
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeToggleBtn');
  if(btn) btn.addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));
});
