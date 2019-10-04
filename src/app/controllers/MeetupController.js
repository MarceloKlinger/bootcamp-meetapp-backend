import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const meetups = await User.findAll({
      where: { meetup: true },
    });

    return res.json(meetups);
  }
}

export default new MeetupController();
