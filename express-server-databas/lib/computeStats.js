// wrapper function to compute the stats and return a object with the updated stats
function computeStats (visitorData) {
  return {
    pages: computePageCounts(visitorData),
    referrers: computeRefererCounts(visitorData),
    activeUsers: getActiveUsers(visitorData)
  }
}

// get the total number of users on each page of our site
function computePageCounts (visitorData) {
  let visitorsData = visitorData
  // sample data in pageCounts object:
  // { "/": 13, "/about": 5 }
  let pageCounts = {}
  for (let key in visitorsData) {
    let page = visitorsData[key].page
    if (page in pageCounts) {
      pageCounts[page]++
    } else {
      pageCounts[page] = 1
    }
  }
  return pageCounts
}

// get the total number of users per referring site
function computeRefererCounts (visitorData) {
  let visitorsData = visitorData
  // sample data in referrerCounts object:
  // { "http://twitter.com/": 3, "http://stackoverflow.com/": 6 }
  let referrerCounts = {}
  for (let key in visitorsData) {
    let referringSite = visitorsData[key].referringSite || '(direct)'
    if (referringSite in referrerCounts) {
      referrerCounts[referringSite]++
    } else {
      referrerCounts[referringSite] = 1
    }
  }
  return referrerCounts
}

// get the total active users on our site
function getActiveUsers (visitorData) {
  let visitorsData = visitorData
  return Object.keys(visitorsData).length
}

module.exports = computeStats
