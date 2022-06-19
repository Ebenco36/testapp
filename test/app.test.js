const app = require("../index");
const request = require("supertest");
const {
    binarySearchNumbers,
    binarySearchStrings,
    sorter,
    seperateList
} = require("../helpers/helper");

jest.setTimeout(100000)

describe("Helper Test", () => {
    let data = [1, 2, 3, "josh", 6, "Ade", 1, 2, 8]
    let sortedList = [...data].sort(sorter)

    it('Get Number List', () => {
        expect(seperateList(sortedList)).toEqual([1, 1, 2, 2, 3, 6, 8])
    })

    it('Test Sort', () => {
        expect(data.sort(sorter)).toEqual([1, 1, 2, 2, 3, 6, 8, "Ade", "josh"])
    })

    it('Test Number Search', () => {
        expect(binarySearchNumbers(seperateList(sortedList), 3)).toEqual(4)
    })

    it('Test String Search', () => {
        let numbersInList = seperateList(sortedList)
        // set element to be removed
        const toRemove = new Set(numbersInList);
        // String list
        let stringInList = sortedList.filter(x => !toRemove.has(x));
        expect(binarySearchStrings(stringInList, "josh")).toEqual(1)
    })

})

describe("App Test", () => {
    it("GET /", (done) => {
        request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200)
        // More logic goes here
        done()
    });
    
    it("Full Search Test", (done) => {
        var postData = {
            "key":"josh",
            "data": [1, 2, 3, "josh", 6, "Ade", 1, 2, 8]
        };
        request(app)
            .post("/search")
            .send(postData)
            .expect(200)
            .end(function(err, res) { 
                // .end handles the response
                if (err) {
                    return done(err);
                }
                expect(res?.body?.data?.index_from_sorted_list).toEqual(8)
                expect(res?.body?.data?.index_without_sorting).toEqual(3)
                done();
            });
            
    });


});