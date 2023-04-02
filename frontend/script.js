console.log("sandeep");

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

const getData = async () => {
  try {
    const data = await fetch("http://127.0.0.1:4000/api");
    const response = await data.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

getData();

const addRow = async () => {
  const tbody = document.querySelector("tbody");

  let response;
  try {
    response = await getData();
  } catch (e) {
    console.log(e);
  }

  for (let i = 0; i < 10; i++) {
    const name = response[i].name;
    const last = parseFloat(response[i].last);
    const buy = parseFloat(response[i].buy);
    const sell = parseFloat(response[i].sell);
    const volume = parseFloat(response[i].volume);
    const base_unit = response[i].base_unit;

    console.log(response);

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    let nLast = formatter.format(last);
    let nBuy = formatter.format(buy);
    let nSell = formatter.format(sell);
    let nVolume = formatter.format(volume);

    nLast = nLast.replaceAt(0, "₹");
    nBuy = nBuy.replaceAt(0, "₹");
    nSell = nSell.replaceAt(0, "₹");
    nVolume = nVolume.replaceAt(0, "₹");

    tbody.innerHTML += `
    <tr class="table_data">
              <th>${i + 1}</th>
              <td>${name}</td>
              <td>${nLast}</td>
              <td>${nBuy + " / " + nSell}</td>
              <td>${nVolume}</td>
              <td>${base_unit}</td> 
            </tr>
  `;

    const capital = base_unit.toUpperCase();
    const content = document.querySelector(".btc-content");
    content.innerHTML += `
    <a href="#">${capital}</a>
  `;
  }
};

addRow();
