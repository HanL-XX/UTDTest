function findOptimalContracts(neededContainer, listings) 
{
    // Lọc danh sách hợp lệ và sắp xếp
    let validListings = listings.filter(item => item.container > 0 && item.totalCost >= 0);
    validListings = validListings.sort((a, b) => a.container - b.container);

    const n = validListings.length;

    // Kiểm tra nếu không có danh sách hợp lệ
    if (validListings.length === 0) 
    {
        return { minTotalCost: null, selectedListings: [] };
    }

    // Tạo mảng QHD
    const dp = new Array(n + 1).fill(null).map(() => new Array(neededContainer + 1).fill(Infinity));
    dp[0][0] = 0;

    // QHD
    for (let i = 1; i <= n; i++) 
    {
        for (let j = 0; j <= neededContainer; j++) 
        {
            dp[i][j] = dp[i - 1][j];
            if (validListings[i - 1].container <= j) 
            {
                dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - validListings[i - 1].container] + validListings[i - 1].totalCost);
            }
        }
    }

    // Tìm giá trị lớn nhất và cost nhỏ nhất
    let maxContainers = 0;
    let maxContainersIndex = 0;

    for (let j = 0; j <= neededContainer; j++) 
    {
        if (dp[n][j] > 0 && dp[n][j] !== Infinity) 
        {
            maxContainers = dp[n][j];
            maxContainersIndex = j;
        }
    }

    // Tìm danh sách đối tác được chọn
    const selectedListings = [];
    let i = n;
    let j = maxContainersIndex;

    while (i > 0 && j > 0) 
    {
        if (dp[i][j] !== dp[i - 1][j]) 
        {
            selectedListings.unshift(validListings[i - 1]);
            j -= validListings[i - 1].container;
        }
        i--;
    }

    return { selectedListings, maxContainers, maxContainersIndex, neededContainer };
}

function printResults(selectedListings, maxContainers, maxContainersIndex, neededContainer) 
{
    // Kiểm tra danh sách đầu vào
    if (selectedListings.length === 0) 
    {
        console.log("Not enough containers");
        return;
    }
    // In danh sách đối tác
    selectedListings.forEach(contract => console.log(`[Contract with] ${contract.name} ${contract.container} container, price: ${contract.totalCost}`));

    // Kiểm tra điều kiện và in kết quả
    if (maxContainersIndex === 0 || maxContainersIndex < neededContainer) 
    {
        console.log("Not enough containers");
    }

    console.log("[Summary] total cost", maxContainers);
}

function processOptimalContracts(neededContainer, listings) {
    const result = findOptimalContracts(neededContainer, listings);
    printResults(result.selectedListings, result.maxContainers, result.maxContainersIndex, neededContainer);
}

// Case:
const neededContainer = 10;
const listings = [
    {
        name: "Container renter A",
        container: 5,
        totalCost: 5,
    },
    {
        name: "Container renter B",
        container: 2,
        totalCost: 10,
    },
    {
        name: "Container renter C",
        container: 10,
        totalCost: 3,
    },
];

processOptimalContracts(neededContainer, listings);