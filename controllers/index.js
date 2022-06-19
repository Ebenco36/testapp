const connection = require("../services/db");
const {
    binarySearchNumbers,
    binarySearchStrings,
    sorter,
    seperateList
} = require("../helpers/helper");

const { validationResult } = require('express-validator');


exports.getSavedSearch = (req, res, next) => {
    connection.query("SELECT * FROM searches", function (err, data) {
        if (err) return next(new AppError(err))
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

const addSearch = (key, result) => {
    const today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const values = [key, JSON.stringify(result), date, date];
    connection.query(
        "INSERT INTO searches (`key`, `result`, `createdAt`, `updatedAt`) VALUES(?)",
        [values]);
};



exports.deleteSearch = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    connection.query(
        "DELETE FROM searches WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "search deleted!",
            });
        }
    );
}


exports.computation = (req, res, next) => {
    // validationResult function checks whether
    // any occurs or not and return an object
    const errors = validationResult(req);

    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
        res.status(400).json(errors)
        return false
    }

    request_data = req.body

    let search_REC = request_data.data
    let key = request_data.key


    // check if record can be found
    // let checkIfExist = findItem(key);
    connection.query("SELECT * FROM searches WHERE `key`=?", key, function (err, checkIfExist) {
        if (err) throw err;
        start = new Date().getTime();
        result = {}
        console.log(!checkIfExist[0])
        if (!checkIfExist[0]) {
            // sort mixed list using javascript predefined function
            // let sorted = search_REC.sort(new Intl.Collator('en', { numeric: true, sensitivity: 'accent' }).compare)
            // Custom sort
            sort_start = new Date().getTime();
            let sorted = [...search_REC].sort(sorter)
            sort_end = new Date().getTime();
            /**
             * Split numbers from strings
             */

            search_start = new Date().getTime();
            let numbersInList = seperateList(sorted)
            // set element to be removed
            const toRemove = new Set(numbersInList);
            // String list
            let stringInList = sorted.filter(x => !toRemove.has(x));
            let locationUsingSortedList = -1;
            if (typeof key === "number") {
                locationUsingSortedList = binarySearchNumbers(numbersInList, key)
            } else {
                locationUsingSortedList = binarySearchStrings(stringInList, key)
                locationUsingSortedList += numbersInList.length
            }
            search_end = new Date().getTime();

            // Location without being sorted
            // get index using javascript function
            let indexSearch = search_REC.indexOf(key);

            end = new Date().getTime();
            result = {
                "overall_time": end - start,
                "time_taken_to_sort": sort_end - sort_start,
                "time_taken_to_search": search_end - search_start,
                "index_from_sorted_list": locationUsingSortedList,
                "index_without_sorting": indexSearch,
            }
            console.log("Condition: " + (indexSearch != -1 && locationUsingSortedList))
            if (indexSearch != -1 && locationUsingSortedList) {
                addSearch(key, result)
            }
        } else {
            start = new Date().getTime();
            retrieved = JSON.parse(checkIfExist[0]?.result)
            end = new Date().getTime();
            result = {
                "overall_time": end - start,
                "index_from_sorted_list": retrieved?.index_from_sorted_list,
                "index_without_sorting": retrieved?.index_without_sorting,
            }
        }

        res.status(200).json({ data: result });
    })
    // console.log(result)
}