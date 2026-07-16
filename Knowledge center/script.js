function searchFunction() {
  let input = document.getElementById('searchInput').value.toLowerCase();
  let cards = document.querySelectorAll('.card');

  

  cards.forEach(card => {
    let name = card.getAttribute('data-name');
    if (name && name.includes(input)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// India Time
function updateTime() {
  const now = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  const timeString = now.toLocaleTimeString('en-IN', options);
  document.getElementById('indiaTime').innerText = '🇮🇳 ' + timeString;
}

setInterval(updateTime, 1000);
updateTime();

function goToTable(event) {
  if (event.key === "Enter") {
    let value = document.getElementById("searchInput").value;
    window.location.href = "table.html?search=" + encodeURIComponent(value);
  }
}

window.onload = function () {
  let params = new URLSearchParams(window.location.search);
  let searchValue = params.get("search");

  if (searchValue) {
    document.getElementById("tableSearch").value = searchValue;
    filterTable();
  }
};

 function filterTable() {
  let input = document.getElementById("tableSearch").value.toLowerCase();
  let rows = document.querySelectorAll("table tr");
  let found = false;

  rows.forEach((row, index) => {
    if (index === 0) return;

    let text = row.innerText.toLowerCase();

    if (text.includes(input)) {
      row.style.display = "";
      row.classList.add("highlight");
      found = true;
    } else {
      row.style.display = "none";
      row.classList.remove("highlight");
    }
  });

  let message = document.getElementById("noResults");
  let tableSection = document.getElementById("tableSection");

  if (!found) {
    tableSection.style.display = "none";   // 🔥 hide table + filters
    message.style.display = "block";       // show message
  } else {
    tableSection.style.display = "block";  // show table again
    message.style.display = "none";
  }
}

function filterSeries(series) {
  let rows = document.querySelectorAll("table tr");
  let showGroup = false;

  rows.forEach(row => {

    // ✅ Always show main header
    if (row.classList.contains("main-header")) {
      row.style.display = "";
      return;
    }

    // ✅ Handle series headers
    if (row.classList.contains("series-header")) {

      let rowSeries = row.getAttribute("data-series");

      if (series === "all" || rowSeries === series) {
        showGroup = true;
        row.style.display = "";
      } else {
        showGroup = false;
        row.style.display = "none";
      }

    } else {
      // ✅ Normal rows follow group visibility
      if (showGroup || series === "all") {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }

  });
}

function openPreview(pdfUrl) {
  document.getElementById("pdfFrame").src = pdfUrl;
  document.getElementById("pdfModal").style.display = "block";
}

function closePreview() {
  document.getElementById("pdfModal").style.display = "none";
  document.getElementById("pdfFrame").src = "";
}

function toggleFAQ(el) {
  el.classList.toggle("active");
}
  

