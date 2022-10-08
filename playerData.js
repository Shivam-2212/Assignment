let filterStock = []
let playerData = [];
let noOfStocks = document.getElementById('stocks');
let marketWatch = document.getElementById("sort");
const searchBox = document.querySelector('#search-box');
searchBox.addEventListener("change", clickHandler)

const cList = document.querySelector('#c-list');
const lList = document.querySelector('#l-list');
const fList = document.querySelector('#f-list');

async function getplayerData() {
  // if (playerData.length == 0) {
  //   res = fetch("https://blkjkw1sr2.execute-api.ap-south-1.amazonaws.com/stock-microservice/stock/fetch-all?refresh=true")
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       playerData = data.data.map((e) => {
  //         const currPrice = (Math.random() * 15).toFixed(2)
  //         const prevPrice = (Math.random() * 15).toFixed(2)
  //         return { ...e, currPrice: currPrice, prevPrice: prevPrice }
  //       })
  //     })
  //   filterStock = playerData
  // }
  // filterStock.map(createPlayerCard)

  if (playerData.length == 0) {
    const res = await (await fetch("https://blkjkw1sr2.execute-api.ap-south-1.amazonaws.com/stock-microservice/stock/fetch-all?refresh=true")).json()
    noOfStocks = playerData.length
    playerData = res.data.map((e) => {
      const currPrice = (Math.random() * 15).toFixed(2)
      const prevPrice = (Math.random() * 15).toFixed(2)
      return { ...e, currPrice: currPrice, prevPrice: prevPrice }
    })
    // playerData = res.data
    filterStock = playerData
  }
  console.log(filterStock);
  filterStock.map(createPlayerCard)
}
getcountryData()

getplayerData()
const playerCardContainer = document.getElementsByClassName("market-place-player-container")
function createPlayerCard(e) {
  // console.error( mapping[e.country]);
  const playerCard = document.createElement("div")
  playerCard.classList.add("market-place-player-card")

  const Img = document.createElement('div')
  Img.classList.add("market-place-player-img")

  const playerCardImg = document.createElement("img")
  playerCardImg.setAttribute("src", `https://cricstox-prod-data.s3.ap-south-1.amazonaws.com/${e.avatarImage}`)
  Img.appendChild(playerCardImg)
  Img.classList.add('img')
  playerCard.appendChild(Img)
  playerCardContainer[0].appendChild(playerCard)

  const playerdetails = document.createElement('div')
  playerdetails.classList.add("market-place-player-details")

  const name = document.createElement('span')
  name.classList.add("market-place-player-name")
  name.innerHTML = e.name
  playerdetails.appendChild(name)
  playerCard.appendChild(playerdetails)
  playerCardContainer[0].appendChild(playerCard)

  const match = document.createElement('span')
  match.classList.add("market-place-player-skill")
  match.innerHTML = e.skill
  playerdetails.appendChild(match)

  const con = document.createElement('span')
  con.classList.add("market-place-player-country")
  con.innerHTML = cmapping[e.country]
  playerdetails.appendChild(con)

  const playerworth = document.createElement('div')
  playerworth.classList.add("market-place-player-worth")

  const price = document.createElement('span')
  price.classList.add("market-place-player-price")
  price.innerHTML = e.currPrice
  playerworth.appendChild(price)
  playerCard.appendChild(playerworth)
  playerCardContainer[0].appendChild(playerCard)

  const share = document.createElement('span')
  share.classList.add("market-place-player-share")
  share.innerHTML = e.prevPrice

  playerworth.appendChild(share)
  playerCard.appendChild(playerworth)
  playerCardContainer[0].appendChild(playerCard)
}

function deleteChild() {
  var child = playerCardContainer[0].lastElementChild;
  while (child) {
    playerCardContainer[0].removeChild(child);
    child = playerCardContainer[0].lastElementChild;
  }
}

function clickHandler(e) {
  console.log(searchBox.value, searchBox);
  filterStock = filterStock.filter((e) => { return e.name.search(searchBox.value) != -1 })
  console.log(filterStock);
  deleteChild()
  getplayerData()
}

cList.addEventListener('click', (e) => {
  // console.log(e.target.value, "counrty" == e.target.value);a
  console.error(e.target.value);
  deleteChild()
  if (e.target.value !== "counrty") {
    // console.log(e.target.value)
    // if (filterStock.length < playerData.length) {
    //   filterStock = playerData.filter((ele) => (ele.country === e.target.value))
    // }
    // else {
    //   filterStock = filterStock.filter((ele) => (ele.country === e.target.value))
    // }

    filterStock = playerData.filter((ele) => (ele.country === e.target.value))
    console.error(filterStock)
    // console.log(filterStock);
  }
  else {
    filterStock = playerData
  }
  getplayerData()
})
// lList.addEventListener('click', (e) => {
// })


let countryData = [];
let cmapping = [];
const cLists = document.querySelector('#c-list');
async function getcountryData() {
  res = await fetch("https://blkjkw1sr2.execute-api.ap-south-1.amazonaws.com/stock-microservice/country")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      countryData = data.data
    })
  countryData.map(createcountryList)
  console.log((cmapping));
}

const countryLists = document.getElementById('c-name')
function createcountryList(e) {
  cmapping[e.id] = e.name
  const list = document.createElement('div')
  list.classList.add("country-list")
  countryLists.appendChild(list)

  const option = document.createElement('option')
  option.classList.add("country")
  option.innerHTML = e.name
  option.value = e.id
  cLists.appendChild(option)
}

sort.addEventListener("click", (e) => {
  console.log(e.target.value, sort);
  if (e.target.value == "Trending") {
    filterStock.sort((a, b) => { return a.todaysVolume - b.todaysVolume })
  }
  else if (e.target.value == "Losers") {
    filterStock.sort((a, b) => { return a.prevPrice - b.prevPrice })
  }
  else {
    filterStock.sort((a, b) => { return b.prevPrice - a.prevPrice })
  }
  // console.log(filterStock);
  deleteChild()
  filterStock.map((e) => { console.log(e.prevPrice, e) })
  getplayerData()
})

// function clickHandlerStocks(e) {
//   console.log(noOfStocks.value, noOfStocks);
//   filterStock = filterStock.filter((e) => { return e.name.search(noOfStocks.value) != -1 })
//   console.log(filterStock);
//   getplayerData()
// }


noOfStocks.addEventListener("click", (e) => {
  if (e.target.value) {
    filterStock = filterStock.slice(0, e.target.value)
  }
  console.log(filterStock);

  deleteChild()
  getplayerData()
})