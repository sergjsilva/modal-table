async function LoadData() {
  const stopsUrl =
    "https://sergjsilva.github.io/mino-timetable/JSON/stops-ferrol-to-coruna.JSON";
  const routeUrl =
    "https://sergjsilva.github.io/mino-timetable/JSON/bus-laborDay-ferrol-to-coruna.JSON";

  try {
    const cities = await fetch(stopsUrl).then((data) => data.json());
    const routes = await fetch(routeUrl).then((data) => data.json());

    // Get the elements
    const tHeader = document.querySelector("#thead-content tr");
    const tBody = document.querySelector("#tbody-content");

    if (!tHeader || !tBody) {
      console.error("Table header or body element not found");
      return;
    }

    let tHeaderContent = `<th>City</th>`;
    routes.forEach((data) => {
      tHeaderContent += `<th>${data.route}</th>`;
    });

    document.querySelector("#modal-table thead tr").innerHTML = tHeaderContent;

    let tBodyContent = "";
    cities.forEach((city, index) => {
      tBodyContent += `<tr${
        city === "Miño" ? ' class="table-info"' : ""
      }><td>${city}</td>`;
      routes.forEach((route) => {
        tBodyContent += `<td>${route.stops[index]}</td>`;
      });
      tBodyContent += `</tr>`;
    });

    tBody.innerHTML = tBodyContent;
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function initializeTable() {
  let table = $("#modal-table");

  // Initialize the table only if it hasn't been initialized
  if (!table.data("bootstrap.table")) {
    table.bootstrapTable({
      stickyHeader: true, // Enables sticky header
      height: 400, // Sets the height of the table
    });
  } else {
    // resetView
    table.bootstrapTable("resetView");
  }
}

function createModalTable() {
  const modalContainer = document.querySelector("#myModalTable");
  modalContainer.addEventListener("show.bs.modal", () => {
    // Initialize  table
    initializeTable();
  });
}

// On Load
document.addEventListener("DOMContentLoaded", () => {
  LoadData();
  createModalTable();
});
