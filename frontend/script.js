"use strict";

// ============================================================
//  SUPERSTORE DASHBOARD – Complete JavaScript
//  (सभी functions, charts, filters, और logic एक ही जगह)
// ============================================================

// --------------------------
// 1. DOM References
// --------------------------
const $ = (id) => document.getElementById(id);

const kpiSales = $("kpiSales");
const kpiProfit = $("kpiProfit");
const kpiMargin = $("kpiMargin");
const kpiOrders = $("kpiOrders");

const regionSelect = $("regionSelect");
const categorySelect = $("categorySelect");
const segmentSelect = $("segmentSelect");

const resetBtn = $("resetFilters");
const rowCount = $("rowCount");

const loading = $("loading");
const content = $("dashboardContent");

const fileInput = $("fileInput");
const fileStatus = $("fileStatus");

const themeBtn = $("themeToggle");
const themeIcon = $("themeIcon");
const themeLabel = $("themeLabel");

// --------------------------
// 2. State
// --------------------------
let allData = [];
let filteredData = [];
let charts = {};
let dark = false;

// --------------------------
// 3. Theme Toggle
// --------------------------
themeBtn.addEventListener("click", () => {
    dark = !dark;
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    themeIcon.textContent = dark ? "☀️" : "🌙";
    themeLabel.textContent = dark ? "Light" : "Dark";
});

// --------------------------
// 4. CSV Parsing
// --------------------------
function parseCSV(csvText) {
    const results = Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
    });

    if (results.errors.length) {
        console.warn("CSV Parse Errors:", results.errors);
    }

    allData = results.data.map((row) => ({
        ...row,
        Sales: parseFloat(row.Sales) || 0,
        Profit: parseFloat(row.Profit) || 0,
        Quantity: parseInt(row.Quantity) || 0,
        Discount: parseFloat(row.Discount) || 0,
    }));

    if (allData.length === 0) {
        loading.innerHTML = "❌ No data found in CSV.";
        return;
    }

    initFilters();
    applyFilters();

    loading.classList.add("hidden");
    content.classList.remove("hidden");

    fileStatus.textContent = `✅ Loaded ${allData.length} rows`;
}

// --------------------------
// 5. Load from File (Upload)
// --------------------------
function loadFromFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => parseCSV(e.target.result);
    reader.onerror = () => (fileStatus.textContent = "❌ Error reading file");
    reader.readAsText(file);
}

// --------------------------
// 6. Auto Load (Fetch from Server)
// --------------------------
function loadDefaultCSV() {
    fetch("SampleSuperstore.csv")
        .then((res) => {
            if (!res.ok) throw new Error("CSV not found");
            return res.text();
        })
        .then((csv) => parseCSV(csv))
        .catch(() => {
            loading.innerHTML = `
                <div style="font-size:2rem;">📂</div>
                <p>Could not load CSV automatically.</p>
                <p style="font-size:0.9rem; color:var(--text-muted);">
                    Please upload the file using the "Load CSV" button.
                </p>
            `;
            loading.classList.remove("hidden");
            content.classList.add("hidden");
        });
}

// --------------------------
// 7. Filter Helpers
// --------------------------
function populateSelect(select, values) {
    select.innerHTML = "";
    values.forEach((v) => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = v;
        select.appendChild(opt);
    });
}

function selectAll(select) {
    for (let opt of select.options) opt.selected = true;
}

function getSelected(select) {
    return Array.from(select.selectedOptions).map((o) => o.value);
}

function initFilters() {
    populateSelect(
        regionSelect,
        [...new Set(allData.map((d) => d.Region))].sort()
    );
    populateSelect(
        categorySelect,
        [...new Set(allData.map((d) => d.Category))].sort()
    );
    populateSelect(
        segmentSelect,
        [...new Set(allData.map((d) => d.Segment))].sort()
    );

    selectAll(regionSelect);
    selectAll(categorySelect);
    selectAll(segmentSelect);
}

// --------------------------
// 8. Apply Filters & Update
// --------------------------
function applyFilters() {
    const selectedRegions = getSelected(regionSelect);
    const selectedCategories = getSelected(categorySelect);
    const selectedSegments = getSelected(segmentSelect);

    filteredData = allData.filter(
        (d) =>
            selectedRegions.includes(d.Region) &&
            selectedCategories.includes(d.Category) &&
            selectedSegments.includes(d.Segment)
    );

    rowCount.textContent = filteredData.length;
    updateKPIs();
    updateCharts();
}

// --------------------------
// 9. Update KPIs
// --------------------------
function updateKPIs() {
    const totalSales = filteredData.reduce((sum, d) => sum + d.Sales, 0);
    const totalProfit = filteredData.reduce((sum, d) => sum + d.Profit, 0);
    const margin = totalSales === 0 ? 0 : (totalProfit / totalSales) * 100;

    kpiSales.textContent = "$" + totalSales.toFixed(0);
    kpiProfit.textContent = "$" + totalProfit.toFixed(0);
    kpiMargin.textContent = margin.toFixed(2) + "%";
    kpiOrders.textContent = filteredData.length;
}

// --------------------------
// 10. Group By Helper
// --------------------------
function groupBy(array, key, valueKey = "Profit") {
    const result = {};
    array.forEach((item) => {
        const k = item[key];
        if (!result[k]) result[k] = 0;
        result[k] += item[valueKey];
    });
    return result;
}

// --------------------------
// 11. Top N Helper
// --------------------------
function topN(obj, n = 10) {
    return Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}

// --------------------------
// 12. Chart Helpers
// --------------------------
function destroyChart(id) {
    if (charts[id]) {
        charts[id].destroy();
        delete charts[id];
    }
}

function renderBar(id, labels, data, label, color, horizontal = false) {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    destroyChart(id);

    charts[id] = new Chart(canvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: color,
                    borderRadius: 6,
                    borderSkipped: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: horizontal ? "y" : "x",
            plugins: {
                legend: { display: false },
            },
            scales: {
                x: {
                    grid: { display: false },
                    ...(horizontal && { beginAtZero: true }),
                },
                y: {
                    beginAtZero: true,
                    grid: { color: "rgba(0,0,0,0.05)" },
                },
            },
        },
    });
}

function renderHorizontalBar(id, labels, data) {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    destroyChart(id);

    const colors = data.map((v) => (v >= 0 ? "#10b981" : "#ef4444"));

    charts[id] = new Chart(canvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Profit",
                    data: data,
                    backgroundColor: colors,
                    borderRadius: 6,
                    borderSkipped: false,
                },
            ],
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: "rgba(0,0,0,0.05)" },
                },
                y: {
                    grid: { display: false },
                },
            },
        },
    });
}

function renderScatter(id, data) {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    destroyChart(id);

    const scatterData = data.map((d) => ({
        x: d.Discount,
        y: d.Profit,
        label: d["Sub-Category"] || "Unknown",
    }));

    charts[id] = new Chart(canvas, {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Transactions",
                    data: scatterData,
                    backgroundColor: "#4f46e5",
                    pointRadius: 4,
                    pointHoverRadius: 7,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const d = ctx.raw;
                            return `${d.label} : Discount ${d.x.toFixed(2)}, Profit $${d.y.toFixed(2)}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    title: { display: true, text: "Discount" },
                    beginAtZero: true,
                    grid: { color: "rgba(0,0,0,0.05)" },
                },
                y: {
                    title: { display: true, text: "Profit" },
                    beginAtZero: true,
                    grid: { color: "rgba(0,0,0,0.05)" },
                },
            },
        },
    });
}

// --------------------------
// 13. Update All Charts
// --------------------------
function updateCharts() {
    // 1. Sales by Category
    const salesCat = groupBy(filteredData, "Category", "Sales");
    renderBar(
        "chartSalesCat",
        Object.keys(salesCat),
        Object.values(salesCat),
        "Sales",
        "#4f46e5"
    );

    // 2. Profit by Category
    const profitCat = groupBy(filteredData, "Category", "Profit");
    renderBar(
        "chartProfitCat",
        Object.keys(profitCat),
        Object.values(profitCat),
        "Profit",
        "#10b981"
    );

    // 3. Profit by Region
    const profitRegion = groupBy(filteredData, "Region", "Profit");
    renderBar(
        "chartProfitRegion",
        Object.keys(profitRegion),
        Object.values(profitRegion),
        "Profit",
        "#8b5cf6"
    );

    // 4. Top 10 Cities by Profit
    const cityProfit = groupBy(filteredData, "City", "Profit");
    const topCities = topN(cityProfit, 10);
    renderBar(
        "chartTopCities",
        topCities.map((e) => e[0]),
        topCities.map((e) => e[1]),
        "Profit",
        "#f59e0b",
        true
    );

    // 5. Profit by Sub‑Category (Horizontal, color-coded)
    const subProfit = groupBy(filteredData, "Sub-Category", "Profit");
    const sortedSub = Object.entries(subProfit).sort((a, b) => b[1] - a[1]);
    renderHorizontalBar(
        "chartSubProfit",
        sortedSub.map((e) => e[0]),
        sortedSub.map((e) => e[1])
    );

    // 6. Discount vs Profit (Scatter)
    renderScatter("chartDiscountScatter", filteredData);
}

// --------------------------
// 14. Event Listeners
// --------------------------
regionSelect.addEventListener("change", applyFilters);
categorySelect.addEventListener("change", applyFilters);
segmentSelect.addEventListener("change", applyFilters);

resetBtn.addEventListener("click", () => {
    selectAll(regionSelect);
    selectAll(categorySelect);
    selectAll(segmentSelect);
    applyFilters();
});

fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
        loadFromFile(e.target.files[0]);
    }
});

// --------------------------
// 15. Start the App
// --------------------------
loadDefaultCSV();