const Transaction = require('../models/transaction.model')

const getStatistics = async (monthNumber) => {
    const matchStage = {
        $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        }
    };
    const groupStage = {
        $group: {
        _id: null,
        totalSaleAmount: { $sum: "$price" },
        totalItems: { $sum: 1 },
        totalSoldItems : {$sum:{$cond:["$sold",1,0]}},
        totalNotSoldItems: { $sum: { $cond: ["$sold", 0, 1] } } 
        }
    };
    try {
        const statistics = await Transaction.aggregate([matchStage, groupStage]);
        return statistics[0];
    } catch (error) {
        return { message: error.message };
    }
}

const getBarChartData = async (monthNumber) => {
    const priceRanges = [
        { $lt: 101 }, { $gte: 101, $lt: 201 }, { $gte: 201, $lt: 301 },
        { $gte: 301, $lt: 401 }, { $gte: 401, $lt: 501 }, { $gte: 501, $lt: 601 },
        { $gte: 601, $lt: 701 }, { $gte: 701, $lt: 801 }, { $gte: 801, $lt: 901 },
        { $gte: 901 }
    ];
    const matchStage = {
        $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        }
    };
    const groupStages = priceRanges.map((range, index) => ({
        $group: {
        _id: index + 1,
        count: { $sum: { $cond: [{ $and: [{ $gte: ["$price", range.$gte || 0] }, { $lt: ["$price", range.$lt || Infinity] }] }, 1, 0] } }
        }
    }));
    try {
        const barChartData = [];
        for (const groupStage of groupStages) {
        const data = await Transaction.aggregate([matchStage, groupStage]);
        barChartData.push(...data);
        }
        return barChartData;
    } catch (error) {
        return { message: error.message };
    }
}

const getPieChartData = async (monthNumber) => {
    const matchStage = {
        $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        }
    };
    const groupStage = {
        $group: {
        _id: "$category",
        count: { $sum: 1 }
        }
    };
    try {
        const categoriesData = await Transaction.aggregate([matchStage, groupStage]);
        return categoriesData;
    } catch (error) {
        return { message: error.message };
    }
}

module.exports.statistics = async(req,res)=>{
    const monthNumber = new Date(Date.parse(req.query.month + " 1, 2024")).getMonth() + 1;
    const statistics = await getStatistics(monthNumber);
    res.json(statistics);
};

module.exports.barChart = async(req,res)=>{
    const monthNumber = new Date(Date.parse(req.query.month + " 1, 2021")).getMonth() + 1;
    const barChartData = await getBarChartData(monthNumber);
    res.json(barChartData);
};

module.exports.pieChart = async (req,res)=>{
    const monthNumber = new Date(Date.parse(req.query.month + " 1, 2021")).getMonth() + 1;
    const pieChartData = await getPieChartData(monthNumber);
    res.json(pieChartData);
};

module.exports.combinedChart = async (req,res)=>{
    const monthNumber = new Date(Date.parse(req.query.month + " 1, 2021")).getMonth() + 1;
    try{
        const [statisticsData,barChartData,pieChartData] = await Promise.all([
            getStatistics(monthNumber),
            getBarChartData(monthNumber),
            getPieChartData(monthNumber)
        ])

        const combinedResponse = {
            statisticsData,
            barChartData,
            pieChartData
        };

        res.json(combinedResponse)
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}