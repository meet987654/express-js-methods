const express = require("express");
const app = express();
const port = 3000;

const users = [{
    name1: "John",
    kidneys: [{
        "healthy": false,
    }]
}];

app.use(express.json());

app.get("/", (req, res) => {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;

    // Count healthy kidneys
    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }

    // Calculate the number of unhealthy kidneys
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;

    // Check if the isHealthy property exists in the request body
    if (typeof isHealthy === "boolean") {
        users[0].kidneys.push({
            healthy: isHealthy
        });
        res.json({
            msg: "Kidney status added successfully",
        });
    } else {
        res.status(400).json({
            msg: "Invalid input: 'isHealthy' field is required and must be a boolean.",
        });
    }
});

app.put("/", (req, res) => {
    // Update all kidneys to healthy
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg: "All kidneys updated to healthy",
    });
});

app.delete("/",(req,res)=>{
       // Remove all unhealthy kidneys
    let newKidneys=[];
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys.healthy){
            newKidneys.push({
                healthy:true
            })
        }
    }
    users[0].kidneys=newKidneys;
    res.json({
        msd:"done",
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
