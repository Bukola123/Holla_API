const Channel = require('../../model/Channel');

exports.deleteChannel = async (req, res) => {
    const { channelId } = req.params;
    const {admin} = req.query;
    const {user} = req.user.id;
    
    if(!admin == user){
        res.json('Only an admin is allow to delete a channel ')
    }


    try {
        await Channel.findByIdAndDelete(channelId);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Channel not found' }] });
        }
        return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }

    return res.status(200).json({ msg: 'Channel deleted' });
};
