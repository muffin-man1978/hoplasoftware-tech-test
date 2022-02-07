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
                return;
            }
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
            mongooseError(res, e);
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
            mongooseError(res, e);
        }
        
    } else if (invitationResponse.status === 200) {
        res.status(400).json({
            error: true,
            message: 'User already invited to this shop'
        });
    }
    res.status(200).json(invitationResponse);
};