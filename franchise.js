let franchiseData = [];
async function getfranchiseData() {
  res = await fetch("https://blkjkw1sr2.execute-api.ap-south-1.amazonaws.com/stock-microservice/franchise")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const franchiseData = [{ id: 1, name: "CSK" }, { id: 2, name: "MI" }]
      console.log(franchiseData);
      return franchiseData;
    })
  // franchiseData.map(createcountryList)
}

getfranchiseData()