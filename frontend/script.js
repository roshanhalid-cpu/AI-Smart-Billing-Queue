// Calculate waiting time
function calculateWaitingTime(customers) {
    const timePerCustomer = 2;
    return customers * timePerCustomer;
}

// Determine queue status
function getQueueStatus(customers) {
    if (customers <= 3) {
        return "LOW";
    }

    if (customers <= 6) {
        return "MEDIUM";
    }

    return "HIGH";
}

// Counter data
const counters = [
    { number: 1, customers: 8 },
    { number: 2, customers: 3 },
    { number: 3, customers: 6 }
];

// Update each counter
counters.forEach(counter => {
    const waitingTime = calculateWaitingTime(counter.customers);
    const status = getQueueStatus(counter.customers);

    document.getElementById(
        `counter${counter.number}Customers`
    ).textContent = counter.customers;

    document.getElementById(
        `counter${counter.number}Time`
    ).textContent = waitingTime + " min";

    const statusElement =
        document.getElementById(
            `counter${counter.number}Status`
        );

    statusElement.textContent = status;

    statusElement.classList.remove(
        "high",
        "medium",
        "low"
    );

    statusElement.classList.add(
        status.toLowerCase()
    );
});

// AI Recommendation
const highestQueue = Math.max(
    ...counters.map(counter => counter.customers)
);

const crowdedCounter = counters.find(
    counter => counter.customers === highestQueue
);

const recommendation =
    `Counter ${crowdedCounter.number} has the highest queue with ${highestQueue} customers. Consider opening an additional counter to reduce waiting time.`;

document.getElementById("aiRecommendation").textContent =
    recommendation;
    // Add customer to a counter
function addCustomer(counterNumber) {
    const counter = counters.find(
        counter => counter.number === counterNumber
    );

    counter.customers++;

    const waitingTime = calculateWaitingTime(counter.customers);
    const status = getQueueStatus(counter.customers);

    document.getElementById(
        `counter${counterNumber}Customers`
    ).textContent = counter.customers;

    document.getElementById(
        `counter${counterNumber}Time`
    ).textContent = waitingTime + " min";

    const statusElement =
        document.getElementById(
            `counter${counterNumber}Status`
        );

    statusElement.textContent = status;

    statusElement.classList.remove(
        "high",
        "medium",
        "low"
    );

    statusElement.classList.add(
        status.toLowerCase()
    );

    updateAIRecommendation();
    updateQueueSummary();
}

// Update AI Recommendation
function updateAIRecommendation() {
    const highestQueue = Math.max(
        ...counters.map(counter => counter.customers)
    );

    const crowdedCounter = counters.find(
        counter => counter.customers === highestQueue
    );

    const recommendation =
        `Counter ${crowdedCounter.number} has the highest queue with ${highestQueue} customers. Consider opening an additional counter to reduce waiting time.`;

    document.getElementById("aiRecommendation").textContent =
        recommendation;
}
// Open Additional Counter
function openAdditionalCounter() {
    alert("Additional billing counter should be opened to reduce the queue.");
}
// Serve customer from a counter
function serveCustomer(counterNumber) {
    const counter = counters.find(
        counter => counter.number === counterNumber
    );

    if (counter.customers > 0) {
        counter.customers--;
    }

    const waitingTime = calculateWaitingTime(counter.customers);
    const status = getQueueStatus(counter.customers);

    document.getElementById(
        `counter${counterNumber}Customers`
    ).textContent = counter.customers;

    document.getElementById(
        `counter${counterNumber}Time`
    ).textContent = waitingTime + " min";

    const statusElement =
        document.getElementById(
            `counter${counterNumber}Status`
        );

    statusElement.textContent = status;

    statusElement.classList.remove(
        "high",
        "medium",
        "low"
    );

    statusElement.classList.add(
        status.toLowerCase()
    );

    updateAIRecommendation();
    updateQueueSummary();
}
function updateQueueSummary() {
    const totalCustomers = counters.reduce(
        (total, counter) => total + counter.customers,
        0
    );

    const totalWaitingTime = counters.reduce(
        (total, counter) =>
            total + calculateWaitingTime(counter.customers),
        0
    );

    const averageWaitingTime =
        totalWaitingTime / counters.length;

    const highQueues = counters.filter(
        counter => getQueueStatus(counter.customers) === "HIGH"
    ).length;

    const availableCounters = counters.filter(
        counter => counter.customers <= 3
    ).length;

    document.getElementById("totalCustomers").textContent =
        totalCustomers;

    document.getElementById("averageWaitingTime").textContent =
        averageWaitingTime.toFixed(1) + " min";

    document.getElementById("highQueues").textContent =
        highQueues;

    document.getElementById("availableCounters").textContent =
        availableCounters;
}

updateQueueSummary();
