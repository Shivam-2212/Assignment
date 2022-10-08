let leagueData = [];
let lmapping = [];
const IPL = document.querySelector('#ipl');

function getleagueData() {
  res =  fetch("https://blkjkw1sr2.execute-api.ap-south-1.amazonaws.com/stock-microservice/league")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const leagueData = [{id:8, name: "IPL"}, {id:3, name:"T20"}]
      console.log(leagueData);
      return leagueData;
    })
    playerData.sort()
    leagueData.map(createleagueList)
    console.log(lmapping);
}

getleagueData()
const leagueLists = document.querySelector('#league-list')
function createleagueList (e)
{
  lmapping [e.id] = e.name
  const lList = document.createElement('div')
  lList.classList.add("league-list")
  leagueLists.appendChild(lList)
  
  const lOption = document.createElement('option')
  lOption.classList.add("league")
  lOption.innerHTML = lmapping[e.name]
  lOption.value = lmapping[e.id]
  lList.appendChild(lOption)
}