require body parser //??

//REFACTOR BASED ON PRIOR SOLUTION CODE TO HANDLE REQUESTS AND SET VARIABLES FOR $SCOPE

app.post('/api/login', function(req, res) {
    mongoose.model('Users').create({
        driver: req.body.driver,

    }, function(err, users) {
        if (err) {
            res.send(err);
        }
        res.send(users);
    })
})

app.get('/api/switch', function(req, res) {
    mongoose.model('Users').find(function(err, users) {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
});

app.use body parser //only after functions/routes that need it?



