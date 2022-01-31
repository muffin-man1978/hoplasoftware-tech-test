// This takes me back
// before ES6
// to the 'dark ages' of jQuery and callback hell...
exports.inviteUser = function (req, res) {
    // const is much better than var for data that is unmutable (it's written once and read many times)
    // let is better as a variable
    // var is the old way of declaring variables
    // but they are scope-global
    // and you could rewrite some important variable for a library    
    var invitationBody = req.body;
    var shopId = req.params.shopId;
    var authUrl = "https://url.to.auth.system.com/invitation";

    superagent
        .post(authUrl)
        .send(invitationBody)
        // Callbacks are nice. I learned them in C.
        // In Javascript, we have Promises and async / await. 
        // It's more readable and you can isolate async operations this way
        // I used to code like this (there was no other way) and moving the scroll bar to the left and right 
        // was not quite that fun
        .end(function (err, invitationResponse) {
            if (invitationResponse.status === 201) {
                User.findOneAndUpdate({
                    authId: invitationResponse.body.authId
                }, {
                    authId: invitationResponse.body.authId,
                    email: invitationBody.email
                }, {
                    upsert: true,
                    new: true
                }, function (err, createdUser) {
                    // try / catch is a better way to control errors.
                    // You can nicely
                    // res.status(500).send({ mongoose_error: true, error: e })
                    // with e in the catch(e)
                    // It's nice too because you can eventually type return codes
                    // for the library: mongoose_error, superagent_error, etc..
                    Shop.findById(shopId).exec(function (err, shop) {
                        if (err || !shop) {
                            // Ah, but this return here is going to make the function
                            // return. And i mean the exports.inviteUser = function()
                            // that we are defining. This is a NO-NO in what seems to be
                            // server-side code. If not seen in time, this little return
                            // can make someone go quite insane.

                            // In express (i assume res is Express Response object)
                            // we never return, because we would BREAK THE CHAIN OF CALLS TO FUNCTIONS
                            // Express is nice. But this is BAD, it's syntactically correct, would 
                            // compile in TS, but would fail at runtime.
                            // And it would be hard to trace
                            return res.status(500).send(err || { message: 'No shop found' });
                        }
                        if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
                            shop.invitations.push(invitationResponse.body.invitationId);
                        }
                        if (shop.users.indexOf(createdUser._id) === -1) {
                            shop.users.push(createdUser);
                        }

                        // So, no callback?
                        // It's a 0ms timed operation, now is it?
                        // What if, for whatever reason, this fails or takes too long?
                        // It would be nice to provide some error-handling here, just in case
                        shop.save();
                    });
                });
            } else if (invitationResponse.status === 200) {
                res.status(400).json({
                    error: true,
                    message: 'User already invited to this shop'
                });

                // Someone must really like their code to break at runtime
                // and later debug until they go insane                                
                return;
            }

            // If some of the NO-NO returns had been executed,
            // this code would be unreachable, since the function has already returned
            // and the express chain of calls to functions has been broken

            // Also, if shop.save() does not complete by the time this line is executed...
            // Do you like memory leaks?
            // Remember, node.js run ALL in the same thread.
            // Whatever memory had been assigned to the shop.save() operation
            // would not be freed if this is executed before that is finished.

            // Well yeah, it would, eventually... by stopping the service and restarting it
            // Just add a line to the /etc/crontab to restart each 100 invitations and you are good to go
            // :-D
            res.json(invitationResponse);
        });
};




// REFACTOR async / await
// More readable and sane
// I added this little helper
function mongooseError(res, e) {
    res.status(500).send({ mongoose_error: true, error: e });
}

exports.inviteUser = async function (req, res) {
    const invitationBody = req.body;
    const shopId = req.params.shopId;
    const authUrl = "https://url.to.auth.system.com/invitation";
    const invitationResponse = await superagent.post(authUrl).send(invitationBody);

    if (invitationResponse.status === 201) {
        const filter = { authId: invitationResponse.body.authId };
        const upsert_data = { authId: invitationResponse.body.authId, email: invitationBody.email };

        try {
            const createdUser = await User.findOneAndUpdate(filter, upsert_data, {
                upsert: true,
                new: true
            });
        } catch (e) {
            mongooseError(e);
        }

        try {
            const shopToAddUser = await Shop.findById(shopId);
            if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
                shop.invitations.push(invitationResponse.body.invitationId);
            }
            if (shop.users.indexOf(createdUser._id) === -1) {
                shop.users.push(createdUser);
            }            
            await shop.save();
        } catch (e) {
            mongooseError(e);
        }
        
    } else if (invitationResponse.status === 200) {
        res.status(400).json({
            error: true,
            message: 'User already invited to this shop'
        });
    }
    res.json(invitationResponse);
};