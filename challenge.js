//--------------------------
// Sample data (leave as-is)
//--------------------------
const data = [
    {
        "id": "3cc51cfd-6e3c-41eb-9604-362da3a6fb64",
        "symbol": "MSFT",
        "companyName": "Microsoft",
        "price": 310.98,
        "quantity": 2000,
        "currency": "USD"
    },
    {
        "id": "0572be22-d790-460e-bf03-8ee1b3b19dad",
        "symbol": "MSFT",
        "companyName": "Microsoft",
        "price": 310.9,
        "quantity": 1500,
        "currency": "USD"
    },
    {
        "id": "8f356500-de35-4378-b7a3-5c587da54cd5",
        "symbol": "AAPL",
        "companyName": "Apple",
        "price": 174.78,
        "quantity": 500,
        "currency": "USD"
    },
    {
        "id": "5f92c4c3-b6b9-4538-9e80-d587217e8410",
        "symbol": "VOD",
        "price": 130.02,
        "quantity": 3290,
        "currency": "GBP"
    },
    {
        "id": "00000000-0000-0000-0000-000000000000",
        "symbol": "XXX",
        "price": 99.99,
        "quantity": 100,
        "currency": "GBP"
    },
    {
        "id": "155ac33b-05c4-42f7-a446-0b7ffacf2504",
        "symbol": "VOD",
        "price": 128.91,
        "quantity": 8500,
        "currency": "GBP"
    }
];


//----------------------
// The method to improve.
// Submit a revised version of this function below, making any changes
// you believe improve the code while satisfying the requirements above.
//----------------------
function doProcesstrades(tradeData) {
    const tradeSummary = {tradeCount: 0};
    const validTrades = [];
    const invalidTrades = []; 
    const symbols = new Set();

    for (let trade of tradeData) {
        
        // Check for valid trade. If not valid adds it to invalidTrades and
        // skips to the next trade
        if (trade.id === '00000000-0000-0000-0000-000000000000'){
            invalidTrades.push(trade);
            continue;
        }

        // keeps count of valid trades
        tradeSummary.tradeCount++;

        // Updates list of symbols traded. Uniquness is ensured by Set
        symbols.add(trade.symbol)

        // add up prices
        const aggrCost = "aggrCostIn" + trade.currency;
        if (!tradeSummary[aggrCost]) {
            tradeSummary[aggrCost] = (trade.price * trade.quantity)
        } else {
            tradeSummary[aggrCost] += (trade.price * trade.quantity)
        }

        // Adds a trade to valid trades list, while checking and correcting 
        // presence of company name. Also ensures that initial input data is not
        // modified
        validTrades.push({
            id: trade.id,
            symbol: trade.symbol,
            companyName: (!trade.companyName ? trade.symbol : trade.companyName),
            price: trade.price,
            quantity: trade.quantity,
            currency: trade.currency
        })
    }

    // Adding symbols in form of Array and list of valid trades to output object
    tradeSummary.symbols = Array.from(symbols);
    tradeSummary.trades = validTrades;


    // In case of invalide trades - outputs a list of invalid trades to console
    if(invalidTrades.length){
        console.log('\n!!! --- Invalid Trades --- !!!')
        console.log(invalidTrades)
        console.log('!!! --- Invalid Trades --- !!!\n')
    }

    return tradeSummary;
}



console.log(doProcesstrades(data));
